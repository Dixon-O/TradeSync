/**
 * Settings Page
 * Profile info, sync config, demo mode, sync log.
 */
import { getSyncLogs } from '../db/database.js';
import { getSyncStatus, forceSync } from '../db/sync-queue.js';
import { isOnline, getBattery } from '../utils/network.js';
import { showToast } from '../components/toast.js';

export async function renderSettings(container, profileId, { onLock }) {
    const syncStatus = await getSyncStatus();
    const logs = await getSyncLogs(20);
    const battery = getBattery();

    container.innerHTML = `
        <div class="page active" id="page-settings">
            <div class="page-header">
                <div>
                    <h2>Settings ⚙️</h2>
                    <div class="subtitle">Manage your app</div>
                </div>
            </div>

            <div class="settings-list">
                <div class="settings-item" id="settings-sync-info">
                    <div class="settings-icon" style="background: rgba(99, 102, 241, 0.15);">🔄</div>
                    <div class="settings-info">
                        <div class="settings-label">Sync Status</div>
                        <div class="settings-desc">
                            ${syncStatus.isOnline ? '🟢 Online' : '🔴 Offline'}
                            · ${syncStatus.pendingCount} pending
                            ${syncStatus.lastSyncTime ? ` · Last: ${new Date(syncStatus.lastSyncTime).toLocaleTimeString()}` : ''}
                        </div>
                    </div>
                    <button class="btn btn-ghost" id="force-sync-btn" style="font-size: var(--font-size-xs);">Sync Now</button>
                </div>

                ${battery ? `
                    <div class="settings-item">
                        <div class="settings-icon" style="background: rgba(16, 185, 129, 0.15);">🔋</div>
                        <div class="settings-info">
                            <div class="settings-label">Battery</div>
                            <div class="settings-desc">
                                ${Math.round(battery.level * 100)}%${battery.charging ? ' (Charging)' : ''}
                                ${battery.level < 0.15 ? ' — Low battery mode active' : ''}
                            </div>
                        </div>
                    </div>
                ` : ''}

                <div class="settings-item">
                    <div class="settings-icon" style="background: rgba(245, 158, 11, 0.15);">📊</div>
                    <div class="settings-info">
                        <div class="settings-label">Data Saver</div>
                        <div class="settings-desc">Reduce sync frequency on slow networks</div>
                    </div>
                    <label class="toggle">
                        <input type="checkbox" id="data-saver-toggle" />
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="settings-item" id="demo-mode-item">
                    <div class="settings-icon" style="background: rgba(139, 92, 246, 0.15);">🎮</div>
                    <div class="settings-info">
                        <div class="settings-label">Demo Mode</div>
                        <div class="settings-desc">Load sample data for demonstration</div>
                    </div>
                    <button class="btn btn-ghost" id="load-demo-btn" style="font-size: var(--font-size-xs);">Load Demo</button>
                </div>

                <div class="settings-item" id="settings-switch-profile">
                    <div class="settings-icon" style="background: rgba(239, 68, 68, 0.15);">🔒</div>
                    <div class="settings-info">
                        <div class="settings-label">Switch Profile</div>
                        <div class="settings-desc">Lock and switch to another profile</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>
            </div>

            ${logs.length > 0 ? `
                <div class="section-header" style="margin-top: var(--space-lg);">
                    <h3>Sync Log</h3>
                </div>
                <div class="sync-log">
                    ${logs.map(log => `
                        <div class="sync-log-item">
                            <span class="sync-log-time">${new Date(log.timestamp).toLocaleTimeString()}</span>
                            <span class="sync-log-msg">${log.action}</span>
                            <span class="sync-log-status" style="color: ${getLogColor(log.action)};">
                                ${log.details || log.table}
                            </span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <div style="margin-top: var(--space-xl); text-align: center;">
                <p style="font-size: var(--font-size-xs); color: var(--text-muted);">
                    TradeSync v1.0 · Local-First POS · Built for hackathon
                </p>
            </div>
        </div>
    `;

    // Force sync
    document.getElementById('force-sync-btn').addEventListener('click', async () => {
        showToast('Syncing...', 'info');
        await forceSync();
        renderSettings(container, profileId, { onLock });
    });

    // Switch profile / lock
    document.getElementById('settings-switch-profile').addEventListener('click', () => {
        if (onLock) onLock();
    });

    // Demo mode
    document.getElementById('load-demo-btn').addEventListener('click', async () => {
        await loadDemoData(profileId);
        showToast('Demo data loaded! 🎉', 'success');
        renderSettings(container, profileId, { onLock });
    });
}

function getLogColor(action) {
    if (action.includes('ERROR') || action.includes('FAILED')) return 'var(--danger)';
    if (action.includes('CONFLICT')) return 'var(--warning)';
    if (action.includes('SYNCED') || action.includes('RECEIVED')) return 'var(--success)';
    return 'var(--text-secondary)';
}

async function loadDemoData(profileId) {
    const { addProduct, addCredit } = await import('../db/database.js');

    const demoProducts = [
        { name: 'White Bread', price: 65, stock: 24, emoji: '🍞', category: 'Food', lowStockThreshold: 5 },
        { name: 'Milk (500ml)', price: 55, stock: 18, emoji: '🥛', category: 'Drinks', lowStockThreshold: 5 },
        { name: 'Coca-Cola', price: 50, stock: 36, emoji: '🥤', category: 'Drinks', lowStockThreshold: 10 },
        { name: 'Eggs (Tray)', price: 450, stock: 8, emoji: '🥚', category: 'Food', lowStockThreshold: 3 },
        { name: 'Sugar (1kg)', price: 180, stock: 15, emoji: '🍬', category: 'Food', lowStockThreshold: 5 },
        { name: 'Cooking Oil (1L)', price: 320, stock: 10, emoji: '🫒', category: 'Food', lowStockThreshold: 3 },
        { name: 'Biscuits', price: 30, stock: 48, emoji: '🍪', category: 'Snacks', lowStockThreshold: 10 },
        { name: 'Airtime (100)', price: 100, stock: 50, emoji: '📱', category: 'Electronics', lowStockThreshold: 10 },
        { name: 'Soap Bar', price: 45, stock: 20, emoji: '🧴', category: 'Household', lowStockThreshold: 5 },
        { name: 'Chapati', price: 20, stock: 30, emoji: '🫓', category: 'Food', lowStockThreshold: 10 },
        { name: 'Mandazi (5pc)', price: 25, stock: 3, emoji: '🍩', category: 'Snacks', lowStockThreshold: 5 },
        { name: 'Tea Leaves', price: 150, stock: 12, emoji: '🍵', category: 'Drinks', lowStockThreshold: 3 },
    ];

    const demoCredits = [
        { name: 'Mama Njeri', amount: 650 },
        { name: 'John K.', amount: 320 },
        { name: 'Wambui', amount: 180 },
        { name: 'Peter M.', amount: 1200 },
    ];

    for (const p of demoProducts) {
        await addProduct(p, profileId);
    }

    for (const c of demoCredits) {
        await addCredit(c.name, c.amount, profileId);
    }
}
