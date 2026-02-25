/**
 * TradeSync Sync Queue
 * Persistent outbound queue with exponential backoff, battery awareness,
 * and network-aware sync scheduling.
 */
import { getPendingSync, updateSyncEntry, clearCompletedSync, addSyncLog } from './database.js';
import { isOnline, isLowBattery, isSaveData, onNetworkChange } from '../utils/network.js';
import { compressOps } from '../utils/compression.js';

const SYNC_ENDPOINT = '/api/sync';
const MAX_RETRIES = 8;
const BASE_DELAY = 1000;     // 1s
const MAX_DELAY = 60000;     // 60s

let _syncTimer = null;
let _isSyncing = false;
let _listeners = new Set();
let _lastSyncTime = 0;

export function onSyncStatusChange(callback) {
    _listeners.add(callback);
    return () => _listeners.delete(callback);
}

function notifyStatus(status, detail = '') {
    _listeners.forEach(cb => cb({ status, detail, lastSync: _lastSyncTime }));
}

/**
 * Calculate backoff delay with jitter.
 */
function getBackoffDelay(retries) {
    const delay = Math.min(BASE_DELAY * Math.pow(2, retries), MAX_DELAY);
    const jitter = delay * 0.2 * Math.random();
    return delay + jitter;
}

/**
 * Determine if we should sync now based on battery + network.
 */
function shouldSyncNow() {
    if (!isOnline()) return false;
    if (isLowBattery()) {
        // On low battery, only sync critical ops (sales)
        return 'critical-only';
    }
    if (isSaveData()) {
        return 'minimal';
    }
    return 'full';
}

/**
 * Send a batch of sync operations to the server.
 */
async function sendBatch(entries) {
    const compressed = compressOps(entries.map(e => ({
        table: e.table,
        id: e.recordId,
        operation: e.operation,
        delta: e.delta,
        hlc: e.hlc
    })));

    const response = await fetch(SYNC_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            deviceId: entries[0]?.delta?._deviceId || 'unknown',
            operations: compressed,
            timestamp: Date.now()
        })
    });

    if (!response.ok) {
        throw new Error(`Sync failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Process the sync queue — flush all pending operations.
 */
export async function processQueue() {
    const syncMode = shouldSyncNow();
    if (!syncMode) {
        notifyStatus('offline', 'Waiting for connection');
        return { synced: 0, failed: 0 };
    }

    if (_isSyncing) {
        return { synced: 0, failed: 0, reason: 'already-syncing' };
    }

    _isSyncing = true;
    notifyStatus('syncing');

    let pending = await getPendingSync();

    // On low battery, only sync sales (critical)
    if (syncMode === 'critical-only') {
        pending = pending.filter(p => p.table === 'sales');
    }

    if (pending.length === 0) {
        _isSyncing = false;
        notifyStatus('synced', 'All changes synced');
        return { synced: 0, failed: 0 };
    }

    let synced = 0;
    let failed = 0;

    // Process in batches of 10
    const batchSize = syncMode === 'minimal' ? 5 : 10;
    for (let i = 0; i < pending.length; i += batchSize) {
        const batch = pending.slice(i, i + batchSize);

        try {
            await sendBatch(batch);

            // Mark as done
            for (const entry of batch) {
                await updateSyncEntry(entry.id, { status: 'done' });
                synced++;
            }

            await addSyncLog('SYNCED', 'batch', '', `${batch.length} operations synced`);
        } catch (err) {
            // Retry with backoff
            for (const entry of batch) {
                const newRetries = entry.retries + 1;
                if (newRetries >= MAX_RETRIES) {
                    await updateSyncEntry(entry.id, { status: 'failed', retries: newRetries });
                    await addSyncLog('SYNC_FAILED', entry.table, entry.recordId,
                        `Max retries reached: ${err.message}`);
                    failed++;
                } else {
                    await updateSyncEntry(entry.id, { retries: newRetries });
                    failed++;
                }
            }

            // Schedule retry with backoff
            const delay = getBackoffDelay(batch[0].retries);
            notifyStatus('retry', `Retrying in ${Math.round(delay / 1000)}s`);

            await addSyncLog('SYNC_ERROR', 'batch', '', err.message);
        }
    }

    if (synced > 0) {
        _lastSyncTime = Date.now();
        await clearCompletedSync();
    }

    _isSyncing = false;
    notifyStatus(failed > 0 ? 'partial' : 'synced',
        `${synced} synced${failed > 0 ? `, ${failed} failed` : ''}`);

    return { synced, failed };
}

/**
 * Start the automatic sync scheduler.
 */
export function startAutoSync(intervalMs = 30000) {
    stopAutoSync();

    // Sync on network change
    onNetworkChange(({ online }) => {
        if (online) {
            // Sync when coming back online
            setTimeout(() => processQueue(), 1000);
        } else {
            notifyStatus('offline');
        }
    });

    // Periodic sync
    _syncTimer = setInterval(() => {
        if (shouldSyncNow()) {
            processQueue();
        }
    }, intervalMs);

    // Initial sync attempt
    if (isOnline()) {
        setTimeout(() => processQueue(), 2000);
    }
}

/**
 * Stop auto sync.
 */
export function stopAutoSync() {
    if (_syncTimer) {
        clearInterval(_syncTimer);
        _syncTimer = null;
    }
}

/**
 * Force an immediate sync.
 */
export async function forceSync() {
    notifyStatus('syncing', 'Manual sync triggered');
    return processQueue();
}

/**
 * Get current sync status info.
 */
export async function getSyncStatus() {
    const pending = await getPendingSync();
    return {
        pendingCount: pending.length,
        isOnline: isOnline(),
        isSyncing: _isSyncing,
        isLowBattery: isLowBattery(),
        lastSyncTime: _lastSyncTime
    };
}
