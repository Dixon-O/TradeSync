/**
 * Sale Modal / Checkout Component v2
 * M-Pesa, Airtel Money, Cash, Credit — with STK push simulation.
 * Improved product modal with richer metadata and better emoji picker.
 */
import { recordSale, addCredit, findCreditByPhone } from '../db/database.js';
import { showToast } from './toast.js';
import { showReceipt } from './receipt.js';

export function showCheckoutModal(cart, profileId, profileName, onComplete) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');

    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>Checkout — KSh ${total.toLocaleString()}</h2>
        <div class="cart-summary-modal">
            <div class="cart-items" style="max-height: 120px; overflow-y: auto;">
                ${cart.map(item => `
                    <div class="cart-item">
                        <span style="font-size: 18px;">${item.emoji || '📦'}</span>
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

        <div class="payment-methods" id="payment-methods">
            <div class="payment-method-label">Select Payment Method</div>
            <div class="payment-grid">
                <button class="payment-btn cash" data-method="cash">
                    <span class="pm-icon">💵</span>
                    <span class="pm-label">Cash</span>
                </button>
                <button class="payment-btn mpesa" data-method="mpesa">
                    <span class="pm-icon">📱</span>
                    <span class="pm-label">M-Pesa</span>
                </button>
                <button class="payment-btn airtel" data-method="airtel">
                    <span class="pm-icon">📲</span>
                    <span class="pm-label">Airtel Money</span>
                </button>
                <button class="payment-btn credit" data-method="credit">
                    <span class="pm-icon">📝</span>
                    <span class="pm-label">Credit</span>
                </button>
            </div>
        </div>

        <div id="payment-form" class="hidden"></div>

        <div class="modal-actions">
            <button class="btn btn-ghost" id="checkout-cancel">Cancel</button>
        </div>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    const paymentForm = document.getElementById('payment-form');

    // Payment method selection
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const method = btn.dataset.method;
            document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            showPaymentForm(method, paymentForm, cart, total, profileId, profileName, onComplete);
        });
    });

    // Cancel
    document.getElementById('checkout-cancel').addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
}

function showPaymentForm(method, container, cart, total, profileId, profileName, onComplete) {
    container.classList.remove('hidden');

    switch (method) {
        case 'cash':
            container.innerHTML = `
                <div class="payment-confirm">
                    <div class="payment-confirm-icon cash-icon">💵</div>
                    <div class="payment-confirm-text">Cash Payment — KSh ${total.toLocaleString()}</div>
                    <button class="btn btn-success btn-lg btn-full" id="confirm-cash">Confirm Cash Payment</button>
                </div>
            `;
            document.getElementById('confirm-cash').addEventListener('click', async () => {
                try {
                    const items = mapCartItems(cart);
                    const sale = await recordSale(items, total, 'cash', profileId, profileName);
                    closeModal();
                    showToast(`Sale — KSh ${total.toLocaleString()} ✓`, 'success');
                    await showReceipt(sale);
                    if (onComplete) onComplete();
                } catch (err) {
                    showToast(`Error: ${err.message}`, 'error');
                    console.error('[Cash checkout]', err);
                }
            });
            break;

        case 'mpesa':
            container.innerHTML = `
                <div class="mpesa-form">
                    <div class="payment-brand mpesa-brand">
                        <span class="brand-logo">M</span>-PESA
                    </div>
                    <div class="form-group">
                        <label>Customer's Phone Number</label>
                        <input type="tel" id="mpesa-phone" placeholder="07XX XXX XXX" maxlength="12" />
                    </div>
                    <button class="btn btn-lg btn-full mpesa-btn" id="send-stk">
                        📲 Send STK Push — KSh ${total.toLocaleString()}
                    </button>
                </div>
                <div id="stk-progress" class="hidden"></div>
            `;
            document.getElementById('send-stk').addEventListener('click', () => {
                const phone = document.getElementById('mpesa-phone').value.trim();
                if (!phone || phone.length < 10) {
                    showToast('Enter a valid phone number', 'warning');
                    return;
                }
                simulateSTK('mpesa', phone, total, cart, profileId, profileName, onComplete);
            });
            break;

        case 'airtel':
            container.innerHTML = `
                <div class="airtel-form">
                    <div class="payment-brand airtel-brand">
                        <span class="brand-logo">A</span>irtel Money
                    </div>
                    <div class="form-group">
                        <label>Customer's Phone Number</label>
                        <input type="tel" id="airtel-phone" placeholder="07XX XXX XXX" maxlength="12" />
                    </div>
                    <button class="btn btn-lg btn-full airtel-btn" id="send-airtel-stk">
                        📲 Send STK Push — KSh ${total.toLocaleString()}
                    </button>
                </div>
            `;
            document.getElementById('send-airtel-stk').addEventListener('click', () => {
                const phone = document.getElementById('airtel-phone').value.trim();
                if (!phone || phone.length < 10) {
                    showToast('Enter a valid phone number', 'warning');
                    return;
                }
                simulateSTK('airtel', phone, total, cart, profileId, profileName, onComplete);
            });
            break;

        case 'credit':
            container.innerHTML = `
                <div class="credit-checkout-form">
                    <div class="form-group">
                        <label>Customer Name</label>
                        <input type="text" id="credit-cust-name" placeholder="Customer name" />
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="credit-cust-phone" placeholder="07XX XXX XXX" maxlength="12" />
                    </div>
                    <button class="btn btn-lg btn-full" id="confirm-credit" style="background: var(--accent-secondary); color: white;">
                        📝 Add to Customer Tab — KSh ${total.toLocaleString()}
                    </button>
                </div>
            `;
            document.getElementById('confirm-credit').addEventListener('click', async () => {
                const customerName = document.getElementById('credit-cust-name').value.trim();
                const phone = document.getElementById('credit-cust-phone').value.trim();
                if (!customerName) {
                    showToast('Enter customer name', 'warning');
                    return;
                }
                try {
                    const items = mapCartItems(cart);
                    const sale = await recordSale(items, total, 'credit', profileId, profileName);
                    await addCredit(customerName, phone, total, profileId);
                    closeModal();
                    showToast(`Credit — KSh ${total.toLocaleString()} on ${customerName}'s tab`, 'success');
                    await showReceipt(sale);
                    if (onComplete) onComplete();
                } catch (err) {
                    showToast(`Error: ${err.message}`, 'error');
                    console.error('[Credit checkout]', err);
                }
            });
            break;
    }
}

function simulateSTK(method, phone, total, cart, profileId, profileName, onComplete) {
    const container = document.getElementById('payment-form');
    const brandName = method === 'mpesa' ? 'M-PESA' : 'Airtel Money';
    const brandClass = method === 'mpesa' ? 'mpesa' : 'airtel';

    container.innerHTML = `
        <div class="stk-simulation">
            <div class="stk-step active" id="stk-1">
                <div class="stk-loader ${brandClass}"></div>
                <div class="stk-msg">Sending STK push to ${phone}...</div>
            </div>
            <div class="stk-step hidden" id="stk-2">
                <div class="stk-loader ${brandClass}"></div>
                <div class="stk-msg">Waiting for ${brandName} confirmation...</div>
                <div class="stk-sub">Customer should enter PIN on their phone</div>
            </div>
            <div class="stk-step hidden" id="stk-3">
                <div class="stk-success">✓</div>
                <div class="stk-msg stk-done">Payment Confirmed!</div>
                <div class="stk-sub">KSh ${total.toLocaleString()} via ${brandName}</div>
            </div>
        </div>
    `;

    // Simulate STK push flow
    setTimeout(() => {
        document.getElementById('stk-1')?.classList.add('hidden');
        document.getElementById('stk-2')?.classList.remove('hidden');
    }, 1500);

    setTimeout(async () => {
        document.getElementById('stk-2')?.classList.add('hidden');
        document.getElementById('stk-3')?.classList.remove('hidden');

        // Record the sale
        const items = mapCartItems(cart);
        const sale = await recordSale(items, total, method, profileId, profileName);

        setTimeout(async () => {
            closeModal();
            showToast(`${brandName} — KSh ${total.toLocaleString()} ✓`, 'success');
            await showReceipt(sale);
            if (onComplete) onComplete();
        }, 1200);
    }, 3500);
}

function mapCartItems(cart) {
    return cart.map(c => ({
        productId: c.productId,
        name: c.name,
        quantity: c.quantity,
        price: c.price,
        subtotal: c.subtotal
    }));
}

// ========== Product Modal (with rich metadata & better emoji picker) ==========
const EMOJI_CATEGORIES = {
    'Food': ['🍞', '🥚', '🍚', '🌽', '🫓', '🍖', '🥩', '🧈', '🫘', '🥬', '🍅', '🧅', '🥕', '🥔', '🍌', '🥭', '🍉'],
    'Drinks': ['🥛', '🥤', '🧃', '☕', '🍵', '🧊', '💧', '🍺', '🥂', '🫗'],
    'Snacks': ['🍪', '🍩', '🍿', '🧁', '🍬', '🍫', '🥜', '🌰'],
    'Household': ['🧹', '🧴', '🧼', '🧽', '🪣', '🧻', '💡', '🪥', '🧯'],
    'Electronics': ['📱', '🔋', '🔌', '💻', '🎧', '📺', '⌚', '🔦'],
    'Clothing': ['👕', '👖', '👗', '👟', '🧢', '🧣', '🧤', '👜'],
    'Other': ['📦', '🎁', '💊', '✏️', '📒', '🔑', '🪙', '🏷️', '🧲', '⚽']
};

export function showProductModal(product, onSave, onDelete) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');
    const isNew = !product;

    const p = product || {
        name: '', price: '', stock: '', category: 'General', emoji: '📦',
        lowStockThreshold: 5, description: '', unit: 'pcs', costPrice: '', sku: ''
    };

    const categories = ['General', 'Food', 'Drinks', 'Snacks', 'Household', 'Electronics', 'Clothing', 'Other'];

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>${isNew ? 'Add Product' : 'Edit Product'}</h2>

        <div class="form-group">
            <label>Product Name</label>
            <input type="text" id="prod-name" value="${p.name}" placeholder="e.g. White Bread 400g" />
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="prod-desc" placeholder="Brief description..." rows="2" style="resize:none;">${p.description || ''}</textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Selling Price (KSh)</label>
                <input type="number" id="prod-price" value="${p.price}" placeholder="0" min="0" />
            </div>
            <div class="form-group">
                <label>Cost Price (KSh)</label>
                <input type="number" id="prod-cost" value="${p.costPrice || ''}" placeholder="Optional" min="0" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Stock Qty</label>
                <input type="number" id="prod-stock" value="${p.stock}" placeholder="0" min="0" />
            </div>
            <div class="form-group">
                <label>Unit</label>
                <select id="prod-unit">
                    ${['pcs', 'kg', 'g', 'litre', 'ml', 'pack', 'box', 'tray', 'dozen', 'pair']
            .map(u => `<option value="${u}" ${u === (p.unit || 'pcs') ? 'selected' : ''}>${u}</option>`)
            .join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Category</label>
                <select id="prod-category">
                    ${categories.map(c => `<option value="${c}" ${c === p.category ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>SKU / Barcode</label>
                <input type="text" id="prod-sku" value="${p.sku || ''}" placeholder="Optional" />
            </div>
        </div>
        <div class="form-group">
            <label>Icon — Select or Search</label>
            <input type="search" id="emoji-search" placeholder="Search emojis..." class="emoji-search-input" />
            <div class="emoji-picker-grid" id="emoji-picker"></div>
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

    function renderEmojiPicker(filter = '') {
        const picker = document.getElementById('emoji-picker');
        let html = '';
        for (const [cat, emojis] of Object.entries(EMOJI_CATEGORIES)) {
            const filtered = filter
                ? emojis.filter(() => true) // Emojis don't have text names easily, show all on search
                : emojis;
            if (filtered.length === 0) continue;
            html += `<div class="emoji-cat-label">${cat}</div><div class="emoji-cat-row">`;
            for (const e of filtered) {
                html += `<button type="button" class="emoji-btn ${e === selectedEmoji ? 'active' : ''}" data-emoji="${e}">${e}</button>`;
            }
            html += '</div>';
        }
        picker.innerHTML = html;

        picker.querySelectorAll('.emoji-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedEmoji = btn.dataset.emoji;
                picker.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    renderEmojiPicker();

    // Emoji search
    document.getElementById('emoji-search').addEventListener('input', (e) => {
        renderEmojiPicker(e.target.value);
    });

    // Save
    document.getElementById('prod-save').addEventListener('click', () => {
        const name = document.getElementById('prod-name').value.trim();
        const price = parseFloat(document.getElementById('prod-price').value);
        const stock = parseInt(document.getElementById('prod-stock').value);

        if (!name) { showToast('Product name is required', 'warning'); return; }
        if (isNaN(price) || price < 0) { showToast('Enter a valid price (≥ 0)', 'warning'); return; }
        if (isNaN(stock) || stock < 0) { showToast('Enter a valid stock (≥ 0)', 'warning'); return; }

        const costPrice = document.getElementById('prod-cost').value;
        if (costPrice && (isNaN(parseFloat(costPrice)) || parseFloat(costPrice) < 0)) {
            showToast('Cost price must be ≥ 0', 'warning');
            return;
        }

        const data = {
            name,
            price,
            stock,
            category: document.getElementById('prod-category').value,
            emoji: selectedEmoji,
            lowStockThreshold: parseInt(document.getElementById('prod-threshold').value) || 5,
            description: document.getElementById('prod-desc').value.trim(),
            unit: document.getElementById('prod-unit').value,
            costPrice: costPrice ? parseFloat(costPrice) : null,
            sku: document.getElementById('prod-sku').value.trim(),
        };
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
