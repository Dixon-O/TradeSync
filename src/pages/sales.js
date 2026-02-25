/**
 * Sales / POS Page
 * Tap-to-sell interface with cart management and checkout.
 */
import { getProducts } from '../db/database.js';
import { createProductTile } from '../components/product-card.js';
import { showCheckoutModal } from '../components/sale-modal.js';
import { showToast } from '../components/toast.js';

let _cart = [];

export function getCart() { return _cart; }

export function addToCart(product) {
    const existing = _cart.find(c => c.productId === product.id);
    if (existing) {
        if (existing.quantity < product.stock) {
            existing.quantity++;
            existing.subtotal = existing.quantity * existing.price;
        } else {
            showToast('Not enough stock!', 'warning');
        }
    } else {
        _cart.push({
            productId: product.id,
            name: product.name,
            emoji: product.emoji,
            price: product.price,
            quantity: 1,
            subtotal: product.price
        });
    }
}

export async function renderSales(container, profileId) {
    const products = await getProducts(profileId);
    const categories = ['All', ...new Set(products.map(p => p.category || 'General'))];

    container.innerHTML = `
        <div class="page active" id="page-sales">
            <div class="page-header">
                <div>
                    <h2>Sell 💰</h2>
                    <div class="subtitle">Tap products to add to cart</div>
                </div>
            </div>

            <div class="search-bar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input type="search" id="sale-search" placeholder="Search products..." />
            </div>

            <div class="category-filters" id="sale-categories">
                ${categories.map((c, i) => `
                    <button class="cat-filter ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>
                `).join('')}
            </div>

            <div class="pos-products" id="product-grid"></div>

            <div class="cart-section ${_cart.length === 0 ? 'hidden' : ''}" id="cart-section">
                <div class="cart-header">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h3>Cart</h3>
                        <span class="cart-count" id="cart-count">${_cart.length}</span>
                    </div>
                    <button class="cart-clear" id="cart-clear">Clear</button>
                </div>
                <div class="cart-items" id="cart-items"></div>
                <div class="cart-total">
                    <span>Total</span>
                    <span id="cart-total">KSh 0</span>
                </div>
                <div class="checkout-btns">
                    <button class="btn btn-success btn-lg" id="checkout-btn">💵 Checkout</button>
                    <button class="btn btn-ghost" id="credit-btn">📝 Credit</button>
                </div>
            </div>
        </div>
    `;

    let activeCategory = 'All';

    function renderGrid(filter = '') {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = '';

        let filtered = products;
        if (activeCategory !== 'All') {
            filtered = filtered.filter(p => (p.category || 'General') === activeCategory);
        }
        if (filter) {
            const q = filter.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <h3>No products found</h3>
                    <p>Try a different search or category</p>
                </div>
            `;
            return;
        }

        filtered.forEach(p => {
            grid.appendChild(createProductTile(p, (product) => {
                addToCart(product);
                renderCartUI();
                showToast(`${product.name} added`, 'success');
            }));
        });
    }

    function renderCartUI() {
        const section = document.getElementById('cart-section');
        const items = document.getElementById('cart-items');
        const count = document.getElementById('cart-count');
        const total = document.getElementById('cart-total');

        if (_cart.length === 0) {
            section.classList.add('hidden');
            return;
        }

        section.classList.remove('hidden');
        count.textContent = _cart.reduce((sum, c) => sum + c.quantity, 0);

        items.innerHTML = _cart.map((item, idx) => `
            <div class="cart-item">
                <span style="font-size: 18px;">${item.emoji || '📦'}</span>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">KSh ${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-qty">
                    <button data-action="dec" data-idx="${idx}">−</button>
                    <span>${item.quantity}</span>
                    <button data-action="inc" data-idx="${idx}">+</button>
                </div>
                <div class="cart-item-total">KSh ${item.subtotal.toLocaleString()}</div>
            </div>
        `).join('');

        total.textContent = `KSh ${_cart.reduce((s, c) => s + c.subtotal, 0).toLocaleString()}`;

        // Quantity buttons
        items.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                if (btn.dataset.action === 'inc') {
                    const product = products.find(p => p.id === _cart[idx].productId);
                    if (product && _cart[idx].quantity < product.stock) {
                        _cart[idx].quantity++;
                        _cart[idx].subtotal = _cart[idx].quantity * _cart[idx].price;
                    }
                } else {
                    _cart[idx].quantity--;
                    if (_cart[idx].quantity <= 0) {
                        _cart.splice(idx, 1);
                    } else {
                        _cart[idx].subtotal = _cart[idx].quantity * _cart[idx].price;
                    }
                }
                renderCartUI();
            });
        });
    }

    // Search
    document.getElementById('sale-search').addEventListener('input', (e) => {
        renderGrid(e.target.value);
    });

    // Category filters
    document.getElementById('sale-categories').addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-filter');
        if (!btn) return;
        activeCategory = btn.dataset.cat;
        document.querySelectorAll('#sale-categories .cat-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid(document.getElementById('sale-search').value);
    });

    // Clear cart
    document.getElementById('cart-clear').addEventListener('click', () => {
        _cart = [];
        renderCartUI();
    });

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (_cart.length === 0) return;
        showCheckoutModal(_cart, profileId, () => {
            _cart = [];
            renderSales(container, profileId);
        });
    });

    // Credit checkout
    document.getElementById('credit-btn').addEventListener('click', () => {
        if (_cart.length === 0) return;
        showCheckoutModal(_cart, profileId, () => {
            _cart = [];
            renderSales(container, profileId);
        });
    });

    renderGrid();
    renderCartUI();
}
