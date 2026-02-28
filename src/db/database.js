/**
 * DukaImara Database Layer v2
 * Shared inventory, RBAC, phone-based credits, debits, receipts, validation.
 */
import Dexie from 'dexie';
import { uuid, getDeviceId } from '../utils/uuid.js';
import { now as hlcNow } from '../utils/hlc.js';

const db = new Dexie('DukaImara');

db.version(2).stores({
    profiles: 'id, name, pin, role, phone, createdAt',
    products: 'id, name, category, price, stock, emoji, unit, costPrice, sku, description, lowStockThreshold, _hlc, _tombstone',
    sales: 'id, items, total, paymentMethod, profileId, profileName, saleTime, createdAt, receiptId, _hlc, _tombstone',
    credits: 'id, customerName, phone, amount, originalAmount, payments, createdAt, _hlc, _tombstone',
    debits: 'id, customerName, phone, initialDeposit, balance, transactions, createdAt, _hlc, _tombstone',
    receipts: 'id, saleId, receiptData, qrData, createdAt',
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

// ========== Validation Helpers ==========
function validatePositive(value, fieldName) {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
        throw new Error(`${fieldName} must be a non-negative number`);
    }
    return num;
}

function validatePhone(phone) {
    if (!phone) return '';
    const cleaned = phone.replace(/\s/g, '');
    if (!/^(07|01|\+254|254)\d{8,9}$/.test(cleaned)) {
        throw new Error('Invalid phone number format');
    }
    return cleaned;
}

// ========== Profiles (RBAC) ==========
export async function getProfiles() {
    return db.profiles.toArray();
}

export async function getProfile(id) {
    return db.profiles.get(id);
}

export async function isFirstProfile() {
    const count = await db.profiles.count();
    return count === 0;
}

export async function createProfile(name, pin, role = 'staff', privileges = null, creatorId = null) {
    const isFirst = await isFirstProfile();

    // First profile is always admin
    if (isFirst) {
        role = 'admin';
        privileges = { canSell: true, canAddStock: true, canManageCredits: true, canViewReports: true, canManageDebits: true };
    } else {
        // Only admin can create profiles
        if (creatorId) {
            const creator = await db.profiles.get(creatorId);
            if (!creator || creator.role !== 'admin') {
                throw new Error('Only admin can create profiles');
            }
        }
        if (!privileges) {
            privileges = { canSell: true, canAddStock: false, canManageCredits: false, canViewReports: false, canManageDebits: false };
        }
    }

    const colors = ['#0d9488', '#14b8a6', '#f97316', '#fb923c', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];
    const profile = {
        id: uuid(),
        name,
        pin,
        role,
        privileges,
        color: colors[Math.floor(Math.random() * colors.length)],
        createdAt: Date.now()
    };
    await db.profiles.add(profile);
    return profile;
}

export async function updateProfile(id, changes) {
    await db.profiles.update(id, changes);
    return db.profiles.get(id);
}

export async function deleteProfile(id) {
    const profile = await db.profiles.get(id);
    if (profile?.role === 'admin') {
        throw new Error('Cannot delete the admin profile');
    }
    await db.profiles.delete(id);
}

export async function verifyPin(profileId, pin) {
    const profile = await db.profiles.get(profileId);
    return profile && profile.pin === pin;
}

export function hasPrivilege(profile, privilege) {
    if (!profile) return false;
    if (profile.role === 'admin') return true;
    return profile.privileges?.[privilege] === true;
}

// ========== Products (SHARED — no profileId) ==========
export async function getProducts() {
    return db.products.filter(p => !p._tombstone).toArray();
}

export async function getProduct(id) {
    return db.products.get(id);
}

export async function addProduct(data) {
    validatePositive(data.price, 'Price');
    validatePositive(data.stock, 'Stock');
    if (data.costPrice !== undefined && data.costPrice !== '') {
        validatePositive(data.costPrice, 'Cost price');
    }
    const record = stampRecord({ ...data }, true);
    await db.products.add(record);
    await enqueueSync('products', record.id, 'CREATE', data);
    return record;
}

export async function updateProduct(id, changes) {
    const existing = await db.products.get(id);
    if (!existing) return null;
    if (changes.price !== undefined) validatePositive(changes.price, 'Price');
    if (changes.stock !== undefined) validatePositive(changes.stock, 'Stock');
    if (changes.costPrice !== undefined && changes.costPrice !== '') validatePositive(changes.costPrice, 'Cost price');
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
export async function getSales(limit = 50) {
    return db.sales
        .filter(s => !s._tombstone)
        .reverse()
        .limit(limit)
        .toArray();
}

export async function getSalesByProfile(profileId, limit = 50) {
    return db.sales
        .where('profileId').equals(profileId)
        .and(s => !s._tombstone)
        .reverse()
        .limit(limit)
        .toArray();
}

export async function getTodaysSales() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return db.sales
        .filter(s => !s._tombstone && s.createdAt >= startOfDay.getTime())
        .toArray();
}

export async function recordSale(items, total, paymentMethod, profileId, profileName, customerCreditId = null) {
    validatePositive(total, 'Total');
    items.forEach(item => {
        validatePositive(item.price, 'Item price');
        validatePositive(item.quantity, 'Item quantity');
    });

    const receiptId = `TS-${Date.now().toString(36).toUpperCase()}-${uuid().substr(0, 4).toUpperCase()}`;
    const saleTime = new Date().toISOString();

    const saleData = {
        items, // [{productId, name, quantity, price, subtotal}]
        total,
        paymentMethod, // 'cash' | 'credit' | 'mpesa' | 'airtel'
        customerCreditId,
        profileId,
        profileName: profileName || 'Unknown',
        saleTime,
        receiptId,
    };
    const record = stampRecord({ ...saleData }, true);
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

// ========== Credits (Phone-Based Tracking) ==========
export async function getCredits() {
    return db.credits.filter(c => !c._tombstone).toArray();
}

export async function getCredit(id) {
    return db.credits.get(id);
}

export async function searchCredits(query, minAmount = null, maxAmount = null) {
    let results = await db.credits.filter(c => !c._tombstone).toArray();
    if (query) {
        const q = query.toLowerCase();
        results = results.filter(c =>
            c.customerName.toLowerCase().includes(q) ||
            (c.phone && c.phone.includes(q))
        );
    }
    if (minAmount !== null) results = results.filter(c => c.amount >= minAmount);
    if (maxAmount !== null) results = results.filter(c => c.amount <= maxAmount);
    return results;
}

export async function findCreditByPhone(phone) {
    if (!phone) return null;
    const cleaned = phone.replace(/\s/g, '');
    const all = await db.credits.filter(c => !c._tombstone).toArray();
    return all.find(c => c.phone === cleaned) || null;
}

export async function addCredit(customerName, phone, amount, profileId) {
    validatePositive(amount, 'Credit amount');
    const cleanPhone = phone ? phone.replace(/\s/g, '') : '';

    // Check for existing customer by phone — increment if exists
    if (cleanPhone) {
        const existing = await findCreditByPhone(cleanPhone);
        if (existing) {
            const newAmount = existing.amount + amount;
            const newOriginal = (existing.originalAmount || existing.amount) + amount;
            const changes = {
                amount: newAmount,
                originalAmount: newOriginal,
                customerName: customerName || existing.customerName, // Update name if provided
            };
            const updated = stampRecord({ ...existing, ...changes });
            await db.credits.put(updated);
            await enqueueSync('credits', existing.id, 'UPDATE', changes);
            return updated;
        }
    }

    const creditData = {
        customerName,
        phone: cleanPhone,
        amount,
        originalAmount: amount,
        payments: [],
        trustScore: 50,
        profileId,
    };
    const record = stampRecord({ ...creditData }, true);
    await db.credits.add(record);
    await enqueueSync('credits', record.id, 'CREATE', creditData);
    return record;
}

export async function addPayment(creditId, amount) {
    const credit = await db.credits.get(creditId);
    if (!credit) return null;

    // Validate: must be >= 0 and <= outstanding amount
    const payAmount = parseFloat(amount);
    if (isNaN(payAmount) || payAmount <= 0) {
        throw new Error('Payment amount must be greater than 0');
    }
    if (payAmount > credit.amount) {
        throw new Error(`Payment amount (${payAmount}) cannot exceed outstanding balance (${credit.amount})`);
    }

    const payment = { id: uuid(), amount: payAmount, date: Date.now() };
    const payments = [...(credit.payments || []), payment];
    const newTrust = Math.min(100, (credit.trustScore || 50) + 10);
    const newBalance = Math.max(0, credit.amount - payAmount);
    const changes = { payments, trustScore: newTrust, amount: newBalance };
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

// ========== Debits (Deposit Accounts) ==========
export async function getDebits() {
    return db.debits.filter(d => !d._tombstone).toArray();
}

export async function getDebit(id) {
    return db.debits.get(id);
}

export async function createDebit(customerName, phone, initialDeposit) {
    validatePositive(initialDeposit, 'Initial deposit');
    const cleanPhone = phone ? phone.replace(/\s/g, '') : '';

    const debitData = {
        customerName,
        phone: cleanPhone,
        initialDeposit,
        balance: initialDeposit,
        transactions: [{
            id: uuid(),
            type: 'deposit',
            amount: initialDeposit,
            description: 'Initial deposit',
            date: Date.now()
        }],
    };
    const record = stampRecord({ ...debitData }, true);
    await db.debits.add(record);
    await enqueueSync('debits', record.id, 'CREATE', debitData);
    return record;
}

export async function debitPurchase(debitId, amount, description = 'Purchase') {
    const debit = await db.debits.get(debitId);
    if (!debit) return null;

    const purchaseAmount = validatePositive(amount, 'Purchase amount');
    if (purchaseAmount > debit.balance) {
        throw new Error(`Insufficient balance. Available: KSh ${debit.balance}, Requested: KSh ${purchaseAmount}`);
    }

    const tx = { id: uuid(), type: 'purchase', amount: purchaseAmount, description, date: Date.now() };
    const transactions = [...(debit.transactions || []), tx];
    const newBalance = debit.balance - purchaseAmount;
    const changes = { transactions, balance: newBalance };
    const updated = stampRecord({ ...debit, ...changes });
    await db.debits.put(updated);
    await enqueueSync('debits', debitId, 'UPDATE', changes);
    return updated;
}

export async function debitTopUp(debitId, amount) {
    const debit = await db.debits.get(debitId);
    if (!debit) return null;

    const topUpAmount = validatePositive(amount, 'Top-up amount');
    const tx = { id: uuid(), type: 'deposit', amount: topUpAmount, description: 'Top-up', date: Date.now() };
    const transactions = [...(debit.transactions || []), tx];
    const newBalance = debit.balance + topUpAmount;
    const changes = { transactions, balance: newBalance };
    const updated = stampRecord({ ...debit, ...changes });
    await db.debits.put(updated);
    await enqueueSync('debits', debitId, 'UPDATE', changes);
    return updated;
}

// ========== Receipts ==========
export async function saveReceipt(saleId, receiptData, qrData) {
    const receipt = {
        id: uuid(),
        saleId,
        receiptData,
        qrData,
        createdAt: Date.now()
    };
    await db.receipts.add(receipt);
    return receipt;
}

export async function getReceipt(saleId) {
    const all = await db.receipts.where('saleId').equals(saleId).toArray();
    return all[0] || null;
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

// ========== Dashboard Stats ==========
export async function getDashboardStats(profileId) {
    const todaySales = await getTodaysSales();
    const products = await getProducts(); // Shared — no profile filter
    const credits = await getCredits();

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

// ========== Sales Reports ==========
export async function getSalesReport(dateFrom = null, dateTo = null, paymentMethod = null, profileId = null) {
    let sales = await db.sales.filter(s => !s._tombstone).toArray();

    if (dateFrom) sales = sales.filter(s => s.createdAt >= dateFrom);
    if (dateTo) sales = sales.filter(s => s.createdAt <= dateTo);
    if (paymentMethod) sales = sales.filter(s => s.paymentMethod === paymentMethod);
    if (profileId) sales = sales.filter(s => s.profileId === profileId);

    sales.sort((a, b) => b.createdAt - a.createdAt);

    const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
    const totalItems = sales.reduce((sum, s) => sum + s.items.reduce((is, i) => is + i.quantity, 0), 0);
    const avgSaleSize = sales.length > 0 ? totalRevenue / sales.length : 0;

    // Top products
    const productMap = {};
    sales.forEach(s => {
        s.items.forEach(item => {
            if (!productMap[item.name]) productMap[item.name] = { name: item.name, quantity: 0, revenue: 0 };
            productMap[item.name].quantity += item.quantity;
            productMap[item.name].revenue += item.subtotal;
        });
    });
    const topProducts = Object.values(productMap).sort((a, b) => b.revenue - a.revenue).slice(0, 10);

    // Sales by payment method
    const byMethod = {};
    sales.forEach(s => {
        if (!byMethod[s.paymentMethod]) byMethod[s.paymentMethod] = { count: 0, total: 0 };
        byMethod[s.paymentMethod].count++;
        byMethod[s.paymentMethod].total += s.total;
    });

    // Sales by profile
    const byProfile = {};
    sales.forEach(s => {
        const name = s.profileName || 'Unknown';
        if (!byProfile[name]) byProfile[name] = { count: 0, total: 0 };
        byProfile[name].count++;
        byProfile[name].total += s.total;
    });

    return {
        sales,
        totalRevenue,
        totalItems,
        totalSales: sales.length,
        avgSaleSize,
        topProducts,
        byMethod,
        byProfile
    };
}

export { db };
