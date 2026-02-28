/**
 * Admin Panel Page
 * Profile management, privilege assignment, system overview.
 * Only accessible by admin users.
 */
import { getProfiles, createProfile, updateProfile, deleteProfile, getProducts, getCredits, getSales, hasPrivilege } from '../db/database.js';
import { showToast } from '../components/toast.js';

export async function renderAdminPanel(container, currentProfile) {
    if (currentProfile.role !== 'admin') {
        container.innerHTML = `<div class="page active"><div class="empty-state"><h3>Access Denied</h3><p>Only admin users can access this page</p></div></div>`;
        return;
    }

    const profiles = await getProfiles();
    const products = await getProducts();
    const credits = await getCredits();
    const currentTheme = localStorage.getItem('ts_theme') || 'dark';
    const isDark = currentTheme === 'dark';

    container.innerHTML = `
        <div class="page active" id="page-admin">
            <div class="page-header">
                <div>
                    <h2>Admin Panel 👑</h2>
                    <div class="subtitle">Manage profiles & system</div>
                </div>
            </div>

            <div class="stats-grid" style="margin-bottom: var(--space-lg);">
                <div class="stat-card">
                    <div class="stat-label">Profiles</div>
                    <div class="stat-value">${profiles.length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Products</div>
                    <div class="stat-value">${products.length}</div>
                </div>
            </div>

            <div class="section-header">
                <h3>Team Members</h3>
                <button class="btn btn-primary" id="admin-add-profile">+ Add Profile</button>
            </div>

            <div class="admin-profile-list" id="admin-profiles">
                ${profiles.map(p => `
                    <div class="admin-profile-card" data-id="${p.id}">
                        <div class="admin-profile-header">
                            <div class="credit-avatar" style="background: ${p.color}">
                                ${p.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="admin-profile-info">
                                <div class="admin-profile-name">
                                    ${p.name} ${p.role === 'admin' ? '👑' : ''}
                                </div>
                                <div class="admin-profile-role">${p.role === 'admin' ? 'Administrator' : 'Staff'}</div>
                            </div>
                            ${p.role !== 'admin' ? `<button class="btn btn-ghost btn-sm admin-delete-profile" data-id="${p.id}">🗑️</button>` : ''}
                        </div>
                        ${p.role !== 'admin' ? `
                            <div class="admin-privileges">
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canSell" ${p.privileges?.canSell ? 'checked' : ''} />
                                    <span>Can Sell</span>
                                </label>
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canAddStock" ${p.privileges?.canAddStock ? 'checked' : ''} />
                                    <span>Can Manage Stock</span>
                                </label>
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canManageCredits" ${p.privileges?.canManageCredits ? 'checked' : ''} />
                                    <span>Can Manage Credits</span>
                                </label>
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canViewReports" ${p.privileges?.canViewReports ? 'checked' : ''} />
                                    <span>Can View Reports</span>
                                </label>
                                <label class="admin-priv-toggle">
                                    <input type="checkbox" data-id="${p.id}" data-priv="canManageDebits" ${p.privileges?.canManageDebits ? 'checked' : ''} />
                                    <span>Can Manage Deposits</span>
                                </label>
                            </div>
                        ` : `
                            <div class="admin-privileges">
                                <div style="font-size: var(--font-size-xs); color: var(--text-muted); padding: 8px;">
                                    Full access to all features
                                </div>
                            </div>
                        `}
                    </div>
                `).join('')}
            </div>

            <div class="settings-list" style="margin-top: var(--space-lg);">
                <div class="section-header"><h3>System</h3></div>
                <div class="settings-item" id="admin-toggle-theme">
                    <div class="settings-icon" style="background: rgba(13,148,136,0.15);">
                        ${isDark ? '🌙' : '☀️'}
                    </div>
                    <div class="settings-info">
                        <div class="settings-label">Theme</div>
                        <div class="settings-desc">${isDark ? 'Dark Mode' : 'Light Mode'}</div>
                    </div>
                    <label class="toggle">
                        <input type="checkbox" id="admin-theme-switch" ${isDark ? '' : 'checked'} />
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="settings-item" id="admin-demo-data">
                    <div class="settings-icon" style="background: rgba(249,115,22,0.15);">📦</div>
                    <div class="settings-info">
                        <div class="settings-label">Load Demo Data</div>
                        <div class="settings-desc">Add sample products</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>
                <div class="settings-item" id="admin-view-reports">
                    <div class="settings-icon" style="background: rgba(59,130,246,0.15);">📊</div>
                    <div class="settings-info">
                        <div class="settings-label">Sales Reports</div>
                        <div class="settings-desc">Detailed analytics</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>
                <div class="settings-item" id="admin-lock">
                    <div class="settings-icon" style="background: rgba(239,68,68,0.15);">🔒</div>
                    <div class="settings-info">
                        <div class="settings-label">Lock App</div>
                        <div class="settings-desc">Return to lock screen</div>
                    </div>
                    <span class="settings-arrow">›</span>
                </div>
            </div>
        </div>
    `;

    // Privilege toggles
    container.querySelectorAll('.admin-priv-toggle input').forEach(cb => {
        cb.addEventListener('change', async (e) => {
            const id = e.target.dataset.id;
            const priv = e.target.dataset.priv;
            const profile = profiles.find(p => p.id === id);
            if (profile) {
                const privileges = { ...profile.privileges, [priv]: e.target.checked };
                await updateProfile(id, { privileges });
                showToast(`${profile.name}'s permissions updated`, 'success');
            }
        });
    });

    // Delete profile
    container.querySelectorAll('.admin-delete-profile').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const profile = profiles.find(p => p.id === id);
            if (confirm(`Delete profile "${profile?.name}"? This cannot be undone.`)) {
                try {
                    await deleteProfile(id);
                    showToast(`${profile.name} deleted`, 'info');
                    renderAdminPanel(container, currentProfile);
                } catch (err) {
                    showToast(err.message, 'error');
                }
            }
        });
    });

    // Add profile
    document.getElementById('admin-add-profile').addEventListener('click', () => {
        showNewProfileModal(container, currentProfile);
    });

    // Theme toggle
    document.getElementById('admin-theme-switch')?.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'light' : 'dark';
        localStorage.setItem('ts_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        renderAdminPanel(container, currentProfile);
    });

    // Demo data
    document.getElementById('admin-demo-data')?.addEventListener('click', async () => {
        const { renderSettings } = await import('./settings.js');
        // Use the demo data function from settings
        const { db: database } = await import('../db/database.js');
        const { uuid: makeId } = await import('../utils/uuid.js');
        const { now: hlcNow } = await import('../utils/hlc.js');
        const hlc = hlcNow();
        const demoProducts = [
            { name: 'White Bread 400g', price: 60, stock: 48, category: 'Food', emoji: '🍞', unit: 'pcs', costPrice: 45, description: 'Premium white bread', lowStockThreshold: 10 },
            { name: 'Fresh Milk 500ml', price: 75, stock: 30, category: 'Drinks', emoji: '🥛', unit: 'pcs', costPrice: 55, description: 'Pasteurized fresh milk', lowStockThreshold: 8 },
            { name: 'Farm Eggs (Tray)', price: 450, stock: 15, category: 'Food', emoji: '🥚', unit: 'tray', costPrice: 380, description: 'Farm fresh eggs, 30 per tray', lowStockThreshold: 3 },
            { name: 'Maize Flour 2kg', price: 180, stock: 40, category: 'Food', emoji: '🌽', unit: 'pcs', costPrice: 150, description: 'Fine maize flour for ugali', lowStockThreshold: 8 },
            { name: 'Cooking Oil 1L', price: 320, stock: 22, category: 'Food', emoji: '🫗', unit: 'litre', costPrice: 280, description: 'Pure vegetable cooking oil', lowStockThreshold: 5 },
            { name: 'Soda 500ml', price: 80, stock: 50, category: 'Drinks', emoji: '🥤', unit: 'pcs', costPrice: 55, description: 'Assorted soft drinks', lowStockThreshold: 10 },
        ];
        for (const p of demoProducts) {
            const existing = await database.products.filter(x => x.name === p.name && !x._tombstone).first();
            if (!existing) {
                await database.products.add({ id: makeId(), ...p, _hlc: hlc, _tombstone: false, _lastModified: Date.now(), createdAt: Date.now() });
            }
        }
        showToast('Demo data loaded! 🎉', 'success');
    });

    // Reports
    document.getElementById('admin-view-reports')?.addEventListener('click', () => { location.hash = '#reports'; });

    // Lock
    document.getElementById('admin-lock')?.addEventListener('click', () => {
        sessionStorage.removeItem('ts_profileId');
        const { lock } = require('../components/pin-lock.js') || {};
        location.hash = '#dashboard';
        location.reload();
    });
}

function showNewProfileModal(container, adminProfile) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>Add Team Member</h2>
        <div class="form-group">
            <label>Name</label>
            <input type="text" id="new-staff-name" placeholder="Staff name" />
        </div>
        <div class="form-group">
            <label>4-Digit PIN</label>
            <input type="password" id="new-staff-pin" placeholder="••••" maxlength="4" inputmode="numeric" />
        </div>
        <div class="form-group">
            <label>Permissions</label>
            <div class="admin-privileges-modal">
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canSell" checked /><span>Can Sell</span></label>
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canAddStock" /><span>Can Manage Stock</span></label>
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canManageCredits" /><span>Can Manage Credits</span></label>
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canViewReports" /><span>Can View Reports</span></label>
                <label class="admin-priv-toggle"><input type="checkbox" id="np-canManageDebits" /><span>Can Manage Deposits</span></label>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="np-cancel">Cancel</button>
            <button class="btn btn-primary" id="np-save">Create Profile</button>
        </div>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    document.getElementById('np-save').addEventListener('click', async () => {
        const name = document.getElementById('new-staff-name').value.trim();
        const pin = document.getElementById('new-staff-pin').value.trim();
        if (!name) { showToast('Enter staff name', 'warning'); return; }
        if (pin.length !== 4) { showToast('PIN must be 4 digits', 'warning'); return; }

        const privileges = {
            canSell: document.getElementById('np-canSell').checked,
            canAddStock: document.getElementById('np-canAddStock').checked,
            canManageCredits: document.getElementById('np-canManageCredits').checked,
            canViewReports: document.getElementById('np-canViewReports').checked,
            canManageDebits: document.getElementById('np-canManageDebits').checked,
        };

        try {
            await createProfile(name, pin, 'staff', privileges, adminProfile.id);
            backdrop.classList.add('hidden');
            modal.classList.add('hidden');
            showToast(`${name} added to team ✓`, 'success');
            renderAdminPanel(container, adminProfile);
        } catch (err) {
            showToast(err.message, 'error');
        }
    });

    document.getElementById('np-cancel').addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });

    backdrop.addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });
}
