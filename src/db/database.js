/**
 * TradeSync Database Layer
 * Dexie.js wrapper around IndexedDB with auto-stamping for sync.
 */
import Dexie from 'dexie';
import { uuid, getDeviceId } from '../utils/uuid.js';
import { now as hlcNow } from '../utils/hlc.js';

const db = new Dexie('TradeSync');

db.version(1).stores({
    profiles: 'id, name, pin, createdAt',
    products: 'id, name, category, price, stock, emoji, lowStockThreshold, _hlc, _tombstone, profileId',
    sales: 'id, items, total, paymentMethod, createdAt, _hlc, _tombstone, profileId',
    credits: 'id, customerName, amount, payments, createdAt, _hlc, _tombstone, profileId',
    syncQueue: 'id, table, recordId, operation, delta, hlc, retries, status, createdAt',
    syncLog: 'id, action, table, recordId, timestamp, details'
});

const DEVICE_ID = getDeviceId();

function stampRecord(record, isNew = false) {
    const hlc = hlcNow();
    if (isNew) {
        record.id = record.id || uuid();
        record.createdAt = Date.now();
    }
    record._hlc = hlc;
    record._lastModified = Date.now();
    record._deviceId = DEVICE_ID;
    record._tombstone = record._tombstone || false;
    record._vectorClock = record._vectorClock || {};
    record._vectorClock[DEVICE_ID] = (record._vectorClock[DEVICE_ID] || 0) + 1;
    return record;
}

async function enqueueSync(table, recordId, operation, delta) {
    await db.syncQueue.add({
        id: uuid(),
        table,
        recordId,
        operation,
        delta,
        hlc: hlcNow(),
        retries: 0,
        status: 'pending',
        createdAt: Date.now()
    });
}

// ========== Profiles ==========
export async function getProfiles() {
    return db.profiles.toArray();
}

export async function getProfile(id) {
    return db.profiles.get(id);
}

export async function createProfile(name, pin) {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];
    const profile = {
        id: uuid(),
        name,
        pin,
        color: colors[Math.floor(Math.random() * colors.length)],
        createdAt: Date.now()
    };
    await db.profiles.add(profile);
    return profile;
}

export async function verifyPin(profileId, pin) {
    const profile = await db.profiles.get(profileId);
    return profile && profile.pin === pin;
}

// ========== Products ==========
export async function getProducts(profileId) {
    return db.products.where('profileId').equals(profileId).and(p => !p._tombstone).toArray();
}

export async function getProduct(id) {
    return db.products.get(id);
}

export async function addProduct(data, profileId) {
    const record = stampRecord({ ...data, profileId }, true);
    await db.products.add(record);
    await enqueueSync('products', record.id, 'CREATE', data);
    return record;
}

export async function updateProduct(id, changes) {
    const existing = await db.products.get(id);
    if (!existing) return null;
    const updated = stampRecord({ ...existing, ...changes });
    await db.products.put(updated);
    await enqueueSync('products', id, 'UPDATE', changes);
    return updated;
}

export async function deleteProduct(id) {
    const existing = await db.products.get(id);
    if (!existing) return;
    const updated = stampRecord({ ...existing, _tombstone: true });
    await db.products.put(updated);
    await enqueueSync('products', id, 'DELETE', { _tombstone: true });
}

// ========== Sales ==========
export async function getSales(profileId, limit = 50) {
    return db.sales
        .where('profileId').equals(profileId)
        .and(s => !s._tombstone)
        .reverse()
        .limit(limit)
        .toArray();
}

export async function getTodaysSales(profileId) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return db.sales
        .where('profileId').equals(profileId)
        .and(s => !s._tombstone && s.createdAt >= startOfDay.getTime())
        .toArray();
}

export async function recordSale(items, total, paymentMethod, profileId, customerCreditId = null) {
    const saleData = {
        items, // [{productId, name, quantity, price, subtotal}]
        total,
        paymentMethod, // 'cash' | 'credit'
        customerCreditId,
    };
    const record = stampRecord({ ...saleData, profileId }, true);
    await db.sales.add(record);

    // Deduct inventory
    for (const item of items) {
        const product = await db.products.get(item.productId);
        if (product) {
            await updateProduct(item.productId, {
                stock: Math.max(0, product.stock - item.quantity)
            });
        }
    }

    await enqueueSync('sales', record.id, 'CREATE', saleData);
    return record;
}

// ========== Credits (Customer Tabs) ==========
export async function getCredits(profileId) {
    return db.credits
        .where('profileId').equals(profileId)
        .and(c => !c._tombstone)
        .toArray();
}

export async function getCredit(id) {
    return db.credits.get(id);
}

export async function addCredit(customerName, amount, profileId) {
    const creditData = {
        customerName,
        amount,
        payments: [],
        trustScore: 50,
    };
    const record = stampRecord({ ...creditData, profileId }, true);
    await db.credits.add(record);
    await enqueueSync('credits', record.id, 'CREATE', creditData);
    return record;
}

export async function addPayment(creditId, amount) {
    const credit = await db.credits.get(creditId);
    if (!credit) return null;
    const payment = { id: uuid(), amount, date: Date.now() };
    const payments = [...(credit.payments || []), payment];
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const newTrust = Math.min(100, credit.trustScore + 10);
    const changes = { payments, trustScore: newTrust, amount: Math.max(0, credit.amount - amount) };
    const updated = stampRecord({ ...credit, ...changes });
    await db.credits.put(updated);
    await enqueueSync('credits', creditId, 'UPDATE', changes);
    return updated;
}

export async function updateCredit(id, changes) {
    const existing = await db.credits.get(id);
    if (!existing) return null;
    const updated = stampRecord({ ...existing, ...changes });
    await db.credits.put(updated);
    await enqueueSync('credits', id, 'UPDATE', changes);
    return updated;
}

// ========== Sync Queue ==========
export async function getPendingSync() {
    return db.syncQueue.where('status').equals('pending').toArray();
}

export async function updateSyncEntry(id, changes) {
    await db.syncQueue.update(id, changes);
}

export async function clearCompletedSync() {
    await db.syncQueue.where('status').equals('done').delete();
}

// ========== Sync Log ==========
export async function addSyncLog(action, table, recordId, details = '') {
    await db.syncLog.add({
        id: uuid(),
        action,
        table,
        recordId,
        timestamp: Date.now(),
        details
    });
}

export async function getSyncLogs(limit = 50) {
    return db.syncLog.reverse().limit(limit).toArray();
}

// ========== Utilities ==========
export async function getDashboardStats(profileId) {
    const todaySales = await getTodaysSales(profileId);
    const products = await getProducts(profileId);
    const credits = await getCredits(profileId);

    const totalRevenue = todaySales.reduce((sum, s) => sum + s.total, 0);
    const itemsSold = todaySales.reduce((sum, s) => sum + s.items.reduce((is, i) => is + i.quantity, 0), 0);
    const lowStock = products.filter(p => p.stock <= (p.lowStockThreshold || 5));
    const totalOwed = credits.reduce((sum, c) => sum + c.amount, 0);

    return {
        totalRevenue,
        itemsSold,
        salesCount: todaySales.length,
        lowStock,
        totalOwed,
        totalProducts: products.length,
        totalCredits: credits.length
    };
}

export { db };
