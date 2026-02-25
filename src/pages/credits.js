/**
 * Credits / Customer Tabs Page
 * Track IOUs, record payments, show trust scores.
 */
import { getCredits, addCredit, addPayment, updateCredit } from '../db/database.js';
import { showToast } from '../components/toast.js';

export async function renderCredits(container, profileId) {
    const credits = await getCredits(profileId);
    const totalOwed = credits.reduce((sum, c) => sum + c.amount, 0);

    container.innerHTML = `
        <div class="page active" id="page-credits">
            <div class="page-header">
                <div>
                    <h2>Credit Book 📋</h2>
                    <div class="subtitle">KSh ${totalOwed.toLocaleString()} total outstanding</div>
                </div>
                <button class="btn btn-primary" id="add-credit-btn">+ Add</button>
            </div>

            ${credits.length > 0 ? `
                <div class="stats-grid" style="margin-bottom: var(--space-md);">
                    <div class="stat-card">
                        <div class="stat-label">Total Owed</div>
                        <div class="stat-value" style="color: var(--warning);">KSh ${totalOwed.toLocaleString()}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Customers</div>
                        <div class="stat-value">${credits.length}</div>
                    </div>
                </div>
            ` : ''}

            <div class="credit-list" id="credit-list">
                ${credits.length === 0 ? `
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                        </svg>
                        <h3>No customer tabs</h3>
                        <p>When you make a credit sale, customers appear here</p>
                    </div>
                ` : credits.map(c => {
        const trustPct = c.trustScore || 50;
        const trustClass = trustPct >= 70 ? 'high' : trustPct >= 40 ? 'medium' : 'low';
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
        const color = colors[c.customerName.charCodeAt(0) % colors.length];
        const overdue = c.amount > 0 && c.createdAt < Date.now() - 7 * 86400000;

        return `
                        <div class="credit-item" data-id="${c.id}">
                            <div class="credit-avatar" style="background: ${color}">
                                ${c.customerName.charAt(0).toUpperCase()}
                            </div>
                            <div class="credit-info">
                                <div class="credit-name">${c.customerName}</div>
                                <div class="credit-meta">
                                    ${c.payments?.length || 0} payment${(c.payments?.length || 0) !== 1 ? 's' : ''}
                                    ${overdue ? ' · <span style="color:var(--danger)">Overdue</span>' : ''}
                                </div>
                                <div class="trust-bar">
                                    <div class="trust-fill ${trustClass}" style="width: ${trustPct}%"></div>
                                </div>
                            </div>
                            <div class="credit-amount ${c.amount <= 0 ? 'paid' : ''}">
                                <div class="amount-value">KSh ${c.amount.toLocaleString()}</div>
                                <div class="amount-label">${c.amount <= 0 ? 'Paid' : 'owes'}</div>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;

    // Click on credit item to record payment
    container.querySelectorAll('.credit-item').forEach(el => {
        el.addEventListener('click', () => {
            const credit = credits.find(c => c.id === el.dataset.id);
            if (credit) showPaymentModal(credit, profileId, container);
        });
    });

    // Add credit button
    document.getElementById('add-credit-btn')?.addEventListener('click', () => {
        showAddCreditModal(profileId, container);
    });
}

function showPaymentModal(credit, profileId, container) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>${credit.customerName}</h2>
        <div style="margin-bottom: var(--space-md);">
            <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--warning);">
                KSh ${credit.amount.toLocaleString()}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted);">Outstanding balance</div>
        </div>

        ${credit.payments && credit.payments.length > 0 ? `
            <div class="section-header"><h3>Payment History</h3></div>
            <div style="margin-bottom: var(--space-md); max-height: 150px; overflow-y: auto;">
                ${credit.payments.map(p => `
                    <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-light); font-size: var(--font-size-sm);">
                        <span style="color: var(--text-muted);">${new Date(p.date).toLocaleDateString()}</span>
                        <span style="color: var(--success); font-weight: 600;">KSh ${p.amount.toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
        ` : ''}

        <div class="form-group">
            <label>Record Payment</label>
            <input type="number" id="payment-amount" placeholder="Amount paid" min="1" max="${credit.amount}" />
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="pay-cancel">Cancel</button>
            <button class="btn btn-success" id="pay-record">Record Payment</button>
        </div>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    document.getElementById('pay-record').addEventListener('click', async () => {
        const amount = parseFloat(document.getElementById('payment-amount').value);
        if (!amount || amount <= 0) {
            showToast('Enter a valid amount', 'warning');
            return;
        }
        await addPayment(credit.id, amount);
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
        showToast(`Payment of KSh ${amount.toLocaleString()} recorded`, 'success');
        renderCredits(container, profileId);
    });

    document.getElementById('pay-cancel').addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });

    backdrop.addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });
}

function showAddCreditModal(profileId, container) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>Add Customer Tab</h2>
        <div class="form-group">
            <label>Customer Name</label>
            <input type="text" id="credit-name" placeholder="Customer name" />
        </div>
        <div class="form-group">
            <label>Amount Owed (KSh)</label>
            <input type="number" id="credit-amount" placeholder="0" min="0" />
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="credit-cancel">Cancel</button>
            <button class="btn btn-primary" id="credit-save">Add Tab</button>
        </div>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    document.getElementById('credit-save').addEventListener('click', async () => {
        const name = document.getElementById('credit-name').value.trim();
        const amount = parseFloat(document.getElementById('credit-amount').value);
        if (!name) {
            showToast('Enter customer name', 'warning');
            return;
        }
        if (!amount || amount <= 0) {
            showToast('Enter a valid amount', 'warning');
            return;
        }
        await addCredit(name, amount, profileId);
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
        showToast(`${name}'s tab created — KSh ${amount.toLocaleString()}`, 'success');
        renderCredits(container, profileId);
    });

    document.getElementById('credit-cancel').addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });

    backdrop.addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });
}
