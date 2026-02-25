/**
 * TradeSync Mock Server — In-Memory Store
 * Simple JSON state for the sync server.
 */

const store = {
    products: new Map(),
    sales: new Map(),
    credits: new Map(),
    syncLog: []
};

export function getAll(table) {
    if (!store[table]) return [];
    return Array.from(store[table].values());
}

export function get(table, id) {
    return store[table]?.get(id) || null;
}

export function put(table, id, record) {
    if (!store[table]) store[table] = new Map();
    store[table].set(id, { ...record, _serverTimestamp: Date.now() });
}

export function remove(table, id) {
    store[table]?.delete(id);
}

export function logSync(entry) {
    store.syncLog.push({
        ...entry,
        serverTimestamp: Date.now()
    });
    // Keep last 200 entries
    if (store.syncLog.length > 200) {
        store.syncLog = store.syncLog.slice(-200);
    }
}

export function getSyncLog() {
    return store.syncLog;
}

export function clear() {
    store.products.clear();
    store.sales.clear();
    store.credits.clear();
    store.syncLog = [];
}
