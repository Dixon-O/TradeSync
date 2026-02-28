/**
 * Sync Status Indicator Component v2
 * Reliable online/offline tracking with pending count and offline duration.
 */
import { onSyncStatusChange, getSyncStatus, forceSync } from '../db/sync-queue.js';
import { onNetworkChange, isOnline, getOfflineDurationText } from '../utils/network.js';

export function initSyncStatus() {
    const dot = document.querySelector('.sync-dot');
    const text = document.querySelector('.sync-text');
    const syncBtn = document.getElementById('sync-now-btn');
    const pendingBadge = document.getElementById('sync-pending-badge');

    function updateUI(state) {
        if (!dot || !text) return;
        dot.className = 'sync-dot';

        const online = isOnline();

        if (!online) {
            dot.classList.add('offline');
            const duration = getOfflineDurationText();
            text.textContent = duration ? `Offline — ${duration}` : 'Offline — changes queued';
        } else if (state?.status === 'syncing') {
            dot.classList.add('syncing');
            text.textContent = 'Syncing...';
            syncBtn?.classList.add('spinning');
        } else if (state?.status === 'retry') {
            dot.classList.add('syncing');
            text.textContent = state.detail || 'Retrying...';
        } else if (state?.status === 'partial') {
            dot.classList.add('syncing');
            text.textContent = state.detail || 'Partial sync';
        } else {
            dot.classList.add('online');
            syncBtn?.classList.remove('spinning');
            if (state?.lastSync) {
                const ago = getTimeAgo(state.lastSync);
                text.textContent = `Online — Synced ${ago}`;
            } else {
                text.textContent = 'Online — Synced';
            }
        }

        // Update pending badge
        if (pendingBadge && state?.pendingCount !== undefined) {
            if (state.pendingCount > 0) {
                pendingBadge.textContent = state.pendingCount;
                pendingBadge.classList.remove('hidden');
            } else {
                pendingBadge.classList.add('hidden');
            }
        }
    }

    onSyncStatusChange((state) => updateUI(state));

    onNetworkChange(({ online }) => {
        updateUI({ status: online ? 'synced' : 'offline' });
    });

    // Manual sync button
    syncBtn?.addEventListener('click', async () => {
        syncBtn.classList.add('spinning');
        await forceSync();
        setTimeout(() => syncBtn.classList.remove('spinning'), 1000);
    });

    // Initial state + periodic updates
    const doUpdate = async () => {
        const status = await getSyncStatus();
        updateUI({
            status: isOnline() ? (status.isSyncing ? 'syncing' : 'synced') : 'offline',
            lastSync: status.lastSyncTime,
            pendingCount: status.pendingCount,
        });
    };

    doUpdate();
    // Periodic refresh every 5 seconds
    setInterval(doUpdate, 5000);
}

function getTimeAgo(timestamp) {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return 'a while ago';
}
