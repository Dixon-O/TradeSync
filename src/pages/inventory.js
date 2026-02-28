/**
 * Inventory Page v2
 * Shared inventory, RBAC-aware add/edit/delete.
 */
import { getProducts, addProduct, updateProduct, deleteProduct, hasPrivilege } from '../db/database.js';
import { createInventoryItem } from '../components/product-card.js';
import { showProductModal } from '../components/sale-modal.js';
import { showToast } from '../components/toast.js';

export async function renderInventory(container, profileId, profile) {
    const canAdd = hasPrivilege(profile, 'canAddStock');
    const products = await getProducts(); // Shared
    const categories = ['All', ...new Set(products.map(p => p.category || 'General'))];

    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const lowCount = products.filter(p => p.stock <= (p.lowStockThreshold || 5)).length;
    const totalCost = products.reduce((sum, p) => sum + ((p.costPrice || 0) * p.stock), 0);

    container.innerHTML = `
        <div class="page active" id="page-inventory">
            <div class="page-header">
                <div>
                    <h2>Stock</h2>
                    <div class="subtitle">${products.length} products · KSh ${totalValue.toLocaleString()} value</div>
                </div>
                ${canAdd ? `<button class="btn btn-primary" id="add-product-btn">+ Add</button>` : ''}
            </div>

            ${lowCount > 0 ? `
                <div class="low-stock-banner">
                    ⚠️ <strong>${lowCount}</strong> product${lowCount > 1 ? 's' : ''} running low
                </div>
            ` : ''}

            <div class="search-bar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input type="search" id="inv-search" placeholder="Search products..." />
            </div>

            <div class="category-filters" id="inv-categories">
                ${categories.map((c, i) => `
                    <button class="cat-filter ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>
                `).join('')}
            </div>

            <div class="inventory-list" id="inv-list"></div>
        </div>
    `;

    let activeCategory = 'All';

    function renderList(filter = '') {
        const list = document.getElementById('inv-list');
        let filtered = products;
        if (activeCategory !== 'All') {
            filtered = filtered.filter(p => (p.category || 'General') === activeCategory);
        }
        if (filter) {
            const q = filter.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(q) ||
                (p.sku && p.sku.toLowerCase().includes(q)));
        }

        if (filtered.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                    </svg>
                    <h3>No products</h3>
                    <p>Tap "+ Add" to add your first product</p>
                </div>
            `;
            return;
        }

        list.innerHTML = '';
        filtered.forEach(p => {
            list.appendChild(createInventoryItem(p, (product) => {
                if (!canAdd) {
                    showToast('You don\'t have permission to edit stock', 'warning');
                    return;
                }
                showProductModal(product, async (data, id) => {
                    await updateProduct(id, data);
                    showToast(`${data.name} updated`, 'success');
                    renderInventory(container, profileId, profile);
                }, async (id) => {
                    await deleteProduct(id);
                    showToast('Product deleted', 'info');
                    renderInventory(container, profileId, profile);
                });
            }));
        });
    }

    // Search
    document.getElementById('inv-search').addEventListener('input', (e) => {
        renderList(e.target.value);
    });

    // Category filters
    document.getElementById('inv-categories').addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-filter');
        if (!btn) return;
        activeCategory = btn.dataset.cat;
        document.querySelectorAll('#inv-categories .cat-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderList(document.getElementById('inv-search').value);
    });

    // Add product
    if (canAdd) {
        document.getElementById('add-product-btn')?.addEventListener('click', () => {
            showProductModal(null, async (data) => {
                await addProduct(data);
                showToast(`${data.name} added to inventory`, 'success');
                renderInventory(container, profileId, profile);
            });
        });
    }

    renderList();
}
