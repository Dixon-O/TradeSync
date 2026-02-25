/**
 * Dashboard Page
 * Daily summary with profit, items sold, alerts, and quick-sell shortcuts.
 */
import { getDashboardStats, getProducts } from '../db/database.js';
import { showToast } from '../components/toast.js';

export async function renderDashboard(container, profileId, { navigateTo, addToCart }) {
    const stats = await getDashboardStats(profileId);
    const products = await getProducts(profileId);
    const topProducts = products.slice(0, 6);

    const now = new Date();
    const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';
    const dateStr = now.toLocaleDateString('en-KE', { weekday: 'long', month: 'short', day: 'numeric' });

    container.innerHTML = `
        <div class="page active" id="page-dashboard">
            <div class="page-header">
                <div>
                    <h2>${greeting} 👋</h2>
                    <div class="subtitle">${dateStr}</div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Today's Revenue</div>
                    <div class="stat-value">KSh ${stats.totalRevenue.toLocaleString()}</div>
                    <div class="stat-sub">${stats.salesCount} sale${stats.salesCount !== 1 ? 's' : ''} · ${stats.itemsSold} items</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Products</div>
                    <div class="stat-value">${stats.totalProducts}</div>
                    <div class="stat-sub">in catalog</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Owed to You</div>
                    <div class="stat-value" style="color: var(--warning);">KSh ${stats.totalOwed.toLocaleString()}</div>
                    <div class="stat-sub">${stats.totalCredits} customer${stats.totalCredits !== 1 ? 's' : ''}</div>
                </div>
            </div>

            ${stats.lowStock.length > 0 ? `
                <div class="section-header">
                    <h3>⚠️ Low Stock Alerts</h3>
                    <button class="view-all" id="dash-view-inventory">View All</button>
                </div>
                <div class="alerts-list">
                    ${stats.lowStock.map(p => `
                        <div class="alert-item">
                            <div class="alert-icon low-stock">${p.emoji || '📦'}</div>
                            <div class="alert-info">
                                <div class="alert-title">${p.name}</div>
                                <div class="alert-desc">${p.stock} left — restock soon</div>
                            </div>
                            <span class="badge badge-warning">${p.stock}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${topProducts.length > 0 ? `
                <div class="section-header">
                    <h3>⚡ Quick Sell</h3>
                    <button class="view-all" id="dash-view-sales">Sell Page →</button>
                </div>
                <div class="quick-sell-grid">
                    ${topProducts.map(p => `
                        <div class="quick-sell-item" data-id="${p.id}">
                            <span class="qs-emoji">${p.emoji || '📦'}</span>
                            <span class="qs-name">${p.name}</span>
                            <span class="qs-price">KSh ${p.price.toLocaleString()}</span>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                    </svg>
                    <h3>No products yet</h3>
                    <p>Head to the Stock page to add your first product</p>
                </div>
            `}
        </div>
    `;

    // Quick sell click
    container.querySelectorAll('.quick-sell-item').forEach(el => {
        el.addEventListener('click', () => {
            const product = products.find(p => p.id === el.dataset.id);
            if (product && product.stock > 0) {
                addToCart(product);
                showToast(`${product.name} added to cart`, 'success');
                navigateTo('sales');
            } else {
                showToast('Out of stock!', 'warning');
            }
        });
    });

    // View all links
    container.querySelector('#dash-view-inventory')?.addEventListener('click', () => navigateTo('inventory'));
    container.querySelector('#dash-view-sales')?.addEventListener('click', () => navigateTo('sales'));
}
