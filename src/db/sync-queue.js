/**
 * Sync Queue & Engine v2
 * Robust retry logic, long-offline detection, status reporting.
 */
import { getPendingSync, updateSyncEntry, clearCompletedSync, addSyncLog } from './database.js';
import { isOnline, getOfflineDuration } from '../utils/network.js';


const SYNC_SERVER_URL = '/api/sync';
let _syncInterval = null;
let _isSyncing = false;
let _lastSyncTime = null;
let _statusCallbacks = [];

export function onSyncStatusChange(callback) {
    _statusCallbacks.push(callback);
    return () => { _statusCallbacks = _statusCallbacks.filter(cb => cb !== callback); };
}

function notifyStatusChange(status) {
    _statusCallbacks.forEach(cb => cb(status));
}

export async function getSyncStatus() {
    const pending = await getPendingSync();
    return {
        isSyncing: _isSyncing,
        lastSyncTime: _lastSyncTime,
        pendingCount: pending.length,
    };
}

export async function forceSync() {
    if (_isSyncing) return;
    await processQueue();
}

export function startAutoSync(intervalMs = 30000) {
    stopAutoSync();
    _syncInterval = setInterval(async () => {
        if (!_isSyncing && isOnline()) {
            await processQueue();
        }
    }, intervalMs);
}

export function stopAutoSync() {
    if (_syncInterval) {
        clearInterval(_syncInterval);
        _syncInterval = null;
    }
}

async function processQueue() {
    if (_isSyncing) return;
    _isSyncing = true;

    notifyStatusChange({ status: 'syncing', pendingCount: 0 });

    try {
        const pending = await getPendingSync();
        if (pending.length === 0) {
            _isSyncing = false;
            _lastSyncTime = Date.now();
            notifyStatusChange({ status: 'synced', lastSync: _lastSyncTime, pendingCount: 0 });
            return;
        }

        // Long offline warning
        const offlineDuration = getOfflineDuration();
        if (offlineDuration > 86400000) { // > 24 hours
            notifyStatusChange({
                status: 'syncing',
                detail: `Syncing ${pending.length} queued changes...`,
                pendingCount: pending.length
            });
        }

        // Process in batches
        const batchSize = 10;
        let processed = 0;
        let failed = 0;

        for (let i = 0; i < pending.length; i += batchSize) {
            const batch = pending.slice(i, i + batchSize);

            try {
                const operations = batch.map(op => ({
                    table: op.table,
                    id: op.recordId,
                    operation: op.operation,
                    delta: op.delta,
                    hlc: op.hlc
                }));

                const response = await fetch(SYNC_SERVER_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        deviceId: localStorage.getItem('ts_deviceId') || 'unknown',
                        operations,
                        timestamp: Date.now()
                    })
                });

                if (response.ok) {
                    // Mark all as done
                    for (const op of batch) {
                        await updateSyncEntry(op.id, { status: 'done' });
                    }
                    processed += batch.length;

                    await addSyncLog('SYNC_SUCCESS', batch[0].table, batch[0].recordId,
                        `Synced ${batch.length} operations`);
                } else {
                    // Server error — keep retrying
                    for (const op of batch) {
                        await updateSyncEntry(op.id, {
                            retries: (op.retries || 0) + 1,
                            status: 'pending',
                            lastError: `Server returned ${response.status}`
                        });
                    }
                    failed += batch.length;
                    await addSyncLog('SYNC_SERVER_ERROR', batch[0].table, batch[0].recordId,
                        `Server error: ${response.status}`);
                }
            } catch (networkErr) {
                // Network error — keep in queue for retry, don't mark as failed
                for (const op of batch) {
                    await updateSyncEntry(op.id, {
                        retries: (op.retries || 0) + 1,
                        status: 'pending' // Keep retrying
                    });
                }
                failed += batch.length;
                await addSyncLog('SYNC_NETWORK_ERROR', batch[0]?.table, batch[0]?.recordId,
                    'Network unreachable');
            }

            // Notify progress
            notifyStatusChange({
                status: 'syncing',
                detail: `${processed}/${pending.length} synced`,
                pendingCount: pending.length - processed
            });
        }

        // Clean up completed entries
        await clearCompletedSync();

        _lastSyncTime = Date.now();
        _isSyncing = false;

        if (failed > 0) {
            notifyStatusChange({
                status: 'partial',
                detail: `${processed} synced, ${failed} pending`,
                lastSync: _lastSyncTime,
                pendingCount: failed
            });
        } else {
            notifyStatusChange({
                status: 'synced',
                lastSync: _lastSyncTime,
                pendingCount: 0
            });
        }

    } catch (err) {
        _isSyncing = false;
        console.error('[Sync] Error:', err);
        await addSyncLog('SYNC_ERROR', '', '', err.message);
        notifyStatusChange({
            status: 'error',
            detail: err.message,
            pendingCount: -1
        });
    }
}
