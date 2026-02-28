/**
 * Sale Modal / Checkout Component
 * Handles the checkout flow: payment method selection and sale completion.
 */
import { recordSale, addCredit } from '../db/database.js';
import { showToast } from './toast.js';

export function showCheckoutModal(cart, profileId, onComplete) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');

    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>Checkout</h2>
        <div class="cart-summary-modal">
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <span style="font-size: 20px;">${item.emoji || '📦'}</span>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">KSh ${item.price} × ${item.quantity}</div>
                        </div>
                        <div class="cart-item-total">KSh ${item.subtotal.toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total">
                <span>Total</span>
                <span>KSh ${total.toLocaleString()}</span>
            </div>
        </div>
        <div class="form-group" style="margin-top: var(--space-md);">
            <label>Customer Name (for credit)</label>
            <input type="text" id="credit-customer-name" placeholder="Leave empty for cash sale" />
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="checkout-cancel">Cancel</button>
            <button class="btn btn-success btn-lg" id="checkout-cash" style="flex: 2;">
                💵 Cash — KSh ${total.toLocaleString()}
            </button>
        </div>
        <button class="btn btn-ghost btn-full" id="checkout-credit" style="margin-top: var(--space-sm);">
            📝 Add to Customer Tab
        </button>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    // Cash sale
    document.getElementById('checkout-cash').addEventListener('click', async () => {
        const items = cart.map(c => ({
            productId: c.productId,
            name: c.name,
            quantity: c.quantity,
            price: c.price,
            subtotal: c.subtotal
        }));
        await recordSale(items, total, 'cash', profileId);
        closeModal();
        showToast(`Sale recorded — KSh ${total.toLocaleString()}`, 'success');
        if (onComplete) onComplete();
    });

    // Credit sale
    document.getElementById('checkout-credit').addEventListener('click', async () => {
        const customerName = document.getElementById('credit-customer-name').value.trim();
        if (!customerName) {
            showToast('Enter customer name for credit sale', 'warning');
            document.getElementById('credit-customer-name').focus();
            return;
        }

        const items = cart.map(c => ({
            productId: c.productId,
            name: c.name,
            quantity: c.quantity,
            price: c.price,
            subtotal: c.subtotal
        }));

        await recordSale(items, total, 'credit', profileId);
        await addCredit(customerName, total, profileId);
        closeModal();
        showToast(`Credit sale — KSh ${total.toLocaleString()} on ${customerName}'s tab`, 'success');
        if (onComplete) onComplete();
    });

    // Cancel
    document.getElementById('checkout-cancel').addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
}

export function showProductModal(product, onSave, onDelete) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');
    const isNew = !product;

    const p = product || { name: '', price: '', stock: '', category: 'General', emoji: '📦', lowStockThreshold: 5 };

    const categories = ['General', 'Food', 'Drinks', 'Snacks', 'Household', 'Electronics', 'Clothing', 'Other'];
    const emojis = ['📦', '🍞', '🥤', '🍪', '🧹', '📱', '👕', '🎁', '💊', '🔋', '🧴', '✏️'];

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>${isNew ? 'Add Product' : 'Edit Product'}</h2>
        <div class="form-group">
            <label>Product Name</label>
            <input type="text" id="prod-name" value="${p.name}" placeholder="e.g. Bread" />
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Price (KSh)</label>
                <input type="number" id="prod-price" value="${p.price}" placeholder="0" min="0" />
            </div>
            <div class="form-group">
                <label>Stock Qty</label>
                <input type="number" id="prod-stock" value="${p.stock}" placeholder="0" min="0" />
            </div>
        </div>
        <div class="form-group">
            <label>Category</label>
            <select id="prod-category">
                ${categories.map(c => `<option value="${c}" ${c === p.category ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Icon</label>
            <div class="category-filters" id="emoji-picker">
                ${emojis.map(e => `
                    <button class="cat-filter ${e === p.emoji ? 'active' : ''}" data-emoji="${e}">${e}</button>
                `).join('')}
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Low Stock Alert</label>
                <input type="number" id="prod-threshold" value="${p.lowStockThreshold || 5}" min="1" />
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="prod-cancel">Cancel</button>
            ${!isNew ? `<button class="btn btn-danger" id="prod-delete">Delete</button>` : ''}
            <button class="btn btn-primary" id="prod-save">${isNew ? 'Add Product' : 'Save Changes'}</button>
        </div>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    let selectedEmoji = p.emoji;

    // Emoji picker
    document.getElementById('emoji-picker').addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-filter');
        if (!btn) return;
        selectedEmoji = btn.dataset.emoji;
        document.querySelectorAll('#emoji-picker .cat-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });

    // Save
    document.getElementById('prod-save').addEventListener('click', () => {
        const data = {
            name: document.getElementById('prod-name').value.trim(),
            price: parseFloat(document.getElementById('prod-price').value) || 0,
            stock: parseInt(document.getElementById('prod-stock').value) || 0,
            category: document.getElementById('prod-category').value,
            emoji: selectedEmoji,
            lowStockThreshold: parseInt(document.getElementById('prod-threshold').value) || 5,
        };
        if (!data.name) {
            showToast('Product name is required', 'warning');
            return;
        }
        closeModal();
        if (onSave) onSave(data, product?.id);
    });

    // Delete
    if (!isNew) {
        document.getElementById('prod-delete').addEventListener('click', () => {
            closeModal();
            if (onDelete) onDelete(product.id);
        });
    }

    // Cancel
    document.getElementById('prod-cancel').addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
}

function closeModal() {
    document.getElementById('modal-backdrop').classList.add('hidden');
    document.getElementById('modal').classList.add('hidden');
}
