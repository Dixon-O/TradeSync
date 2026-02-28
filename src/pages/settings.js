/**
 * Settings Page v2
 * Theme toggle, demo data, sync log, logout.
 */
import { db, getProducts, getSyncLogs } from '../db/database.js';
import { showToast } from '../components/toast.js';
import { uuid } from '../utils/uuid.js';
import { now as hlcNow } from '../utils/hlc.js';

export async function renderSettings(container, profileId, profile, { onLock }) {
    const currentTheme = localStorage.getItem('ts_theme') || 'dark';
    const isDark = currentTheme === 'dark';
    const syncLogs = await getSyncLogs(20);

    container.innerHTML = `
        <div class="page active" id="page-settings">
            <div class="page-header">
                <div>
                    <h2>Settings</h2>
                    <div class="subtitle">Preferences & Tools</div>
                </div>
            </div>

            <div class="settings-list">
                <div class="settings-item" id="toggle-theme">
                    <div class="settings-icon" style="background: var(--accent-primary); background: rgba(13,148,136,0.15);">
                        ${isDark ? '🌙' : '☀️'}
                    </div>
                    <div class="settings-info">
                        <div class="settings-label">Theme</div>
                        <div class="settings-desc">${isDark ? 'Dark Mode' : 'Light Mode'}</div>
                    </div>
                    <label class="toggle">
                        <input type="checkbox" id="theme-switch" ${isDark ? '' : 'checked'} />
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="settings-item" id="load-demo-data">
                    <div class="settings-icon" style="background: rgba(249,115,22,0.15);">📦</div>
                    <div class="settings-info">
                        <div class="settings-label">Load Demo Data</div>
                        <div class="settings-desc">Add sample products and customers</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>

                <div class="settings-item" id="view-reports">
                    <div class="settings-icon" style="background: rgba(59,130,246,0.15);">📊</div>
                    <div class="settings-info">
                        <div class="settings-label">Sales Reports</div>
                        <div class="settings-desc">Detailed sales analytics</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>

                <div class="settings-item" id="settings-lock">
                    <div class="settings-icon" style="background: rgba(239,68,68,0.15);">🔒</div>
                    <div class="settings-info">
                        <div class="settings-label">Lock App</div>
                        <div class="settings-desc">Return to lock screen</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>
            </div>

            ${syncLogs.length > 0 ? `
                <div class="section-header" style="margin-top: var(--space-lg);">
                    <h3>Sync Activity</h3>
                </div>
                <div class="sync-log">
                    ${syncLogs.map(log => `
                        <div class="sync-log-item">
                            <span class="sync-log-time">${new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span class="sync-log-msg">${log.action}</span>
                            <span class="sync-log-status">${log.details || ''}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;

    // Theme toggle
    document.getElementById('theme-switch').addEventListener('change', (e) => {
        const theme = e.target.checked ? 'light' : 'dark';
        localStorage.setItem('ts_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        // Re-render to update icon
        renderSettings(container, profileId, profile, { onLock });
    });

    // Demo data
    document.getElementById('load-demo-data').addEventListener('click', async () => {
        await loadDemoData();
        showToast('Demo data loaded! 🎉', 'success');
        renderSettings(container, profileId, profile, { onLock });
    });

    // Reports
    document.getElementById('view-reports').addEventListener('click', () => {
        location.hash = '#reports';
    });

    // Lock
    document.getElementById('settings-lock').addEventListener('click', onLock);
}

async function loadDemoData() {
    const hlc = hlcNow();
    const demoProducts = [
        { name: 'White Bread 400g', price: 60, stock: 48, category: 'Food', emoji: '🍞', unit: 'pcs', costPrice: 45, description: 'Premium white bread, soft and fresh', lowStockThreshold: 10 },
        { name: 'Fresh Milk 500ml', price: 75, stock: 30, category: 'Drinks', emoji: '🥛', unit: 'pcs', costPrice: 55, description: 'Pasteurized fresh milk', lowStockThreshold: 8 },
        { name: 'Farm Eggs (Tray)', price: 450, stock: 15, category: 'Food', emoji: '🥚', unit: 'tray', costPrice: 380, description: 'Farm fresh eggs, 30 per tray', lowStockThreshold: 3 },
        { name: 'Maize Flour 2kg', price: 180, stock: 40, category: 'Food', emoji: '🌽', unit: 'pcs', costPrice: 150, description: 'Fine maize flour for ugali', lowStockThreshold: 8 },
        { name: 'Cooking Oil 1L', price: 320, stock: 22, category: 'Food', emoji: '🫗', unit: 'litre', costPrice: 280, description: 'Pure vegetable cooking oil', lowStockThreshold: 5 },
        { name: 'Rice 2kg', price: 280, stock: 25, category: 'Food', emoji: '🍚', unit: 'pcs', costPrice: 230, description: 'Pishori long-grain rice', lowStockThreshold: 5 },
        { name: 'Sugar 1kg', price: 160, stock: 35, category: 'Food', emoji: '🧊', unit: 'kg', costPrice: 130, description: 'White refined sugar', lowStockThreshold: 8 },
        { name: 'Washing Soap', price: 45, stock: 60, category: 'Household', emoji: '🧼', unit: 'pcs', costPrice: 30, description: 'Multipurpose bar soap', lowStockThreshold: 15 },
        { name: 'Phone Charger', price: 350, stock: 10, category: 'Electronics', emoji: '🔌', unit: 'pcs', costPrice: 200, description: 'Fast charging USB cable', lowStockThreshold: 3 },
        { name: 'Soda 500ml', price: 80, stock: 50, category: 'Drinks', emoji: '🥤', unit: 'pcs', costPrice: 55, description: 'Assorted soft drinks', lowStockThreshold: 10 },
        { name: 'Bread Spread', price: 120, stock: 18, category: 'Food', emoji: '🧈', unit: 'pcs', costPrice: 90, description: 'Butter spread 250g', lowStockThreshold: 4 },
        { name: 'Tea Leaves 100g', price: 85, stock: 35, category: 'Drinks', emoji: '🍵', unit: 'pcs', costPrice: 60, description: 'Kenya highland tea', lowStockThreshold: 8 },
    ];

    for (const p of demoProducts) {
        const existing = await db.products.filter(x => x.name === p.name && !x._tombstone).first();
        if (!existing) {
            await db.products.add({
                id: uuid(),
                ...p,
                _hlc: hlc,
                _tombstone: false,
                _lastModified: Date.now(),
                createdAt: Date.now(),
            });
        }
    }
}
