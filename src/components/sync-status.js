/**
 * Sync Status Indicator Component
 * Shows online/offline, syncing state, and pending count.
 */
import { onSyncStatusChange, getSyncStatus, forceSync } from '../db/sync-queue.js';
import { onNetworkChange, isOnline } from '../utils/network.js';

export function initSyncStatus() {
    const dot = document.querySelector('.sync-dot');
    const text = document.querySelector('.sync-text');
    const syncBtn = document.getElementById('sync-now-btn');

    function updateUI(state) {
        dot.className = 'sync-dot';

        if (!isOnline()) {
            dot.classList.add('offline');
            text.textContent = 'Offline — changes queued';
        } else if (state?.status === 'syncing') {
            dot.classList.add('syncing');
            text.textContent = 'Syncing...';
            syncBtn.classList.add('spinning');
        } else if (state?.status === 'retry') {
            dot.classList.add('syncing');
            text.textContent = state.detail || 'Retrying...';
        } else if (state?.status === 'partial') {
            dot.classList.add('syncing');
            text.textContent = state.detail || 'Partial sync';
        } else {
            dot.classList.add('online');
            syncBtn.classList.remove('spinning');
            if (state?.lastSync) {
                const ago = getTimeAgo(state.lastSync);
                text.textContent = `Online — Synced ${ago}`;
            } else {
                text.textContent = 'Online — Synced';
            }
        }
    }

    onSyncStatusChange((state) => updateUI(state));

    onNetworkChange(({ online }) => {
        updateUI({ status: online ? 'synced' : 'offline' });
    });

    // Manual sync button
    syncBtn.addEventListener('click', async () => {
        syncBtn.classList.add('spinning');
        await forceSync();
        setTimeout(() => syncBtn.classList.remove('spinning'), 1000);
    });

    // Initial state
    updateUI({ status: isOnline() ? 'synced' : 'offline' });
}

function getTimeAgo(timestamp) {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return 'a while ago';
}
