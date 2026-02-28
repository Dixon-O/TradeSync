/**
 * Credits / Customer Tabs Page v2
 * Phone-based tracking, searchable/filterable, input validation, debit accounts tab.
 */
import { getCredits, addCredit, addPayment, getDebits, createDebit, debitPurchase, debitTopUp, hasPrivilege, searchCredits } from '../db/database.js';
import { showToast } from '../components/toast.js';

let _activeTab = 'credits';

export async function renderCredits(container, profileId, profile) {
    const credits = await getCredits();
    const debits = await getDebits();
    const totalOwed = credits.reduce((sum, c) => sum + c.amount, 0);
    const totalDeposits = debits.reduce((sum, d) => sum + d.balance, 0);

    container.innerHTML = `
        <div class="page active" id="page-credits">
            <div class="page-header">
                <div>
                    <h2>Accounts</h2>
                    <div class="subtitle">Credits & Deposits</div>
                </div>
            </div>

            <div class="tab-bar">
                <button class="tab-btn ${_activeTab === 'credits' ? 'active' : ''}" data-tab="credits">
                    📝 Credits <span class="tab-badge">${credits.length}</span>
                </button>
                <button class="tab-btn ${_activeTab === 'debits' ? 'active' : ''}" data-tab="debits">
                    💰 Deposits <span class="tab-badge">${debits.length}</span>
                </button>
            </div>

            <div id="tab-content"></div>
        </div>
    `;

    // Tab switching
    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            _activeTab = btn.dataset.tab;
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === _activeTab));
            renderTabContent(container, profileId, profile);
        });
    });

    renderTabContent(container, profileId, profile);
}

async function renderTabContent(container, profileId, profile) {
    const tabContent = document.getElementById('tab-content');
    if (_activeTab === 'credits') {
        await renderCreditsTab(tabContent, profileId, profile, container);
    } else {
        await renderDebitsTab(tabContent, profileId, profile, container);
    }
}

async function renderCreditsTab(tabContent, profileId, profile, pageContainer) {
    const credits = await getCredits();
    const totalOwed = credits.reduce((sum, c) => sum + c.amount, 0);

    tabContent.innerHTML = `
        <div class="credit-controls">
            <div class="search-bar" style="margin-bottom: 8px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input type="search" id="credit-search" placeholder="Search by name or phone..." />
            </div>
            <div class="credit-filter-row">
                <select id="credit-amount-filter">
                    <option value="">All amounts</option>
                    <option value="0-500">KSh 0 - 500</option>
                    <option value="500-1000">KSh 500 - 1,000</option>
                    <option value="1000-5000">KSh 1,000 - 5,000</option>
                    <option value="5000+">KSh 5,000+</option>
                </select>
                <button class="btn btn-primary" id="add-credit-btn">+ Add</button>
            </div>
        </div>

        ${credits.length > 0 ? `
            <div class="stats-grid" style="margin-bottom: var(--space-md);">
                <div class="stat-card">
                    <div class="stat-label">Total Owed</div>
                    <div class="stat-value" style="color: var(--accent-secondary);">KSh ${totalOwed.toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Customers</div>
                    <div class="stat-value">${credits.length}</div>
                </div>
            </div>
        ` : ''}

        <div class="credit-list" id="credit-list"></div>
    `;

    function renderCreditList(filter = '', minAmount = null, maxAmount = null) {
        const list = document.getElementById('credit-list');
        let filtered = credits;

        if (filter) {
            const q = filter.toLowerCase();
            filtered = filtered.filter(c =>
                c.customerName.toLowerCase().includes(q) ||
                (c.phone && c.phone.includes(q))
            );
        }
        if (minAmount !== null) filtered = filtered.filter(c => c.amount >= minAmount);
        if (maxAmount !== null) filtered = filtered.filter(c => c.amount <= maxAmount);

        if (filtered.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <h3>No matching records</h3>
                    <p>Try a different search or filter</p>
                </div>
            `;
            return;
        }

        list.innerHTML = filtered.map(c => {
            const trustPct = c.trustScore || 50;
            const trustClass = trustPct >= 70 ? 'high' : trustPct >= 40 ? 'medium' : 'low';
            const colors = ['#0d9488', '#14b8a6', '#f97316', '#fb923c', '#ef4444', '#3b82f6'];
            const color = colors[c.customerName.charCodeAt(0) % colors.length];
            const overdue = c.amount > 0 && c.createdAt < Date.now() - 7 * 86400000;
            const totalPaid = (c.payments || []).reduce((sum, p) => sum + p.amount, 0);
            const totalBorrowed = c.originalAmount || c.amount + totalPaid;

            return `
                <div class="credit-item" data-id="${c.id}">
                    <div class="credit-avatar" style="background: ${color}">
                        ${c.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div class="credit-info">
                        <div class="credit-name">${c.customerName}</div>
                        <div class="credit-meta">
                            ${c.phone ? `📞 ${c.phone} · ` : ''}
                            ${c.payments?.length || 0} payment${(c.payments?.length || 0) !== 1 ? 's' : ''}
                            ${overdue ? ' · <span style="color:var(--danger)">Overdue</span>' : ''}
                        </div>
                        <div class="credit-history-mini">
                            Borrowed: KSh ${totalBorrowed.toLocaleString()} · Paid: KSh ${totalPaid.toLocaleString()}
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
        }).join('');
    }

    renderCreditList();

    // Search
    document.getElementById('credit-search')?.addEventListener('input', (e) => {
        const amountFilter = document.getElementById('credit-amount-filter').value;
        const { min, max } = parseAmountFilter(amountFilter);
        renderCreditList(e.target.value, min, max);
    });

    // Amount filter
    document.getElementById('credit-amount-filter')?.addEventListener('change', (e) => {
        const search = document.getElementById('credit-search').value;
        const { min, max } = parseAmountFilter(e.target.value);
        renderCreditList(search, min, max);
    });

    // Click credit item
    tabContent.querySelectorAll('.credit-item').forEach(el => {
        el.addEventListener('click', () => {
            const credit = credits.find(c => c.id === el.dataset.id);
            if (credit) showPaymentModal(credit, profileId, profile, pageContainer);
        });
    });

    // Re-bind after filter changes
    const bindClicks = () => {
        document.querySelectorAll('.credit-item').forEach(el => {
            el.addEventListener('click', () => {
                const credit = credits.find(c => c.id === el.dataset.id);
                if (credit) showPaymentModal(credit, profileId, profile, pageContainer);
            });
        });
    };

    document.getElementById('credit-search')?.addEventListener('input', () => setTimeout(bindClicks, 50));
    document.getElementById('credit-amount-filter')?.addEventListener('change', () => setTimeout(bindClicks, 50));

    // Add credit
    document.getElementById('add-credit-btn')?.addEventListener('click', () => {
        showAddCreditModal(profileId, profile, pageContainer);
    });
}

function parseAmountFilter(value) {
    if (!value) return { min: null, max: null };
    if (value === '0-500') return { min: 0, max: 500 };
    if (value === '500-1000') return { min: 500, max: 1000 };
    if (value === '1000-5000') return { min: 1000, max: 5000 };
    if (value === '5000+') return { min: 5000, max: null };
    return { min: null, max: null };
}

async function renderDebitsTab(tabContent, profileId, profile, pageContainer) {
    const debits = await getDebits();
    const totalBalance = debits.reduce((sum, d) => sum + d.balance, 0);

    tabContent.innerHTML = `
        <div style="display: flex; justify-content: flex-end; margin-bottom: var(--space-md);">
            <button class="btn btn-primary" id="add-debit-btn">+ New Deposit</button>
        </div>

        ${debits.length > 0 ? `
            <div class="stats-grid" style="margin-bottom: var(--space-md);">
                <div class="stat-card">
                    <div class="stat-label">Total Deposits Held</div>
                    <div class="stat-value" style="color: var(--success);">KSh ${totalBalance.toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Accounts</div>
                    <div class="stat-value">${debits.length}</div>
                </div>
            </div>
        ` : ''}

        <div class="credit-list" id="debit-list">
            ${debits.length === 0 ? `
                <div class="empty-state">
                    <h3>No deposit accounts</h3>
                    <p>Create a deposit account for customers who pre-pay</p>
                </div>
            ` : debits.map(d => {
        const pct = d.initialDeposit > 0 ? Math.round((d.balance / d.initialDeposit) * 100) : 0;
        const lowBalance = pct < 20;
        return `
                    <div class="credit-item debit-item" data-id="${d.id}">
                        <div class="credit-avatar" style="background: var(--success)">
                            ${d.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div class="credit-info">
                            <div class="credit-name">${d.customerName}</div>
                            <div class="credit-meta">
                                ${d.phone ? `📞 ${d.phone} · ` : ''}
                                ${d.transactions?.length || 0} transaction${(d.transactions?.length || 0) !== 1 ? 's' : ''}
                                · Started ${new Date(d.createdAt).toLocaleDateString()}
                            </div>
                            <div class="trust-bar">
                                <div class="trust-fill ${lowBalance ? 'low' : 'high'}" style="width: ${pct}%"></div>
                            </div>
                            ${lowBalance ? '<div style="font-size: 11px; color: var(--danger); margin-top: 2px;">⚠ Low balance</div>' : ''}
                        </div>
                        <div class="credit-amount paid">
                            <div class="amount-value">KSh ${d.balance.toLocaleString()}</div>
                            <div class="amount-label">balance</div>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;

    // Click debit item
    tabContent.querySelectorAll('.debit-item').forEach(el => {
        el.addEventListener('click', () => {
            const debit = debits.find(d => d.id === el.dataset.id);
            if (debit) showDebitModal(debit, profileId, profile, pageContainer);
        });
    });

    // Add debit
    document.getElementById('add-debit-btn')?.addEventListener('click', () => {
        showAddDebitModal(profileId, profile, pageContainer);
    });
}

function showPaymentModal(credit, profileId, profile, pageContainer) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');
    const totalPaid = (credit.payments || []).reduce((sum, p) => sum + p.amount, 0);
    const totalBorrowed = credit.originalAmount || credit.amount + totalPaid;

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>${credit.customerName}</h2>
        ${credit.phone ? `<div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 8px;">📞 ${credit.phone}</div>` : ''}
        <div style="margin-bottom: var(--space-md);">
            <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--accent-secondary);">
                KSh ${credit.amount.toLocaleString()}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted);">Outstanding balance</div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 4px;">
                Total borrowed: KSh ${totalBorrowed.toLocaleString()} · Total paid: KSh ${totalPaid.toLocaleString()}
            </div>
        </div>

        ${credit.payments && credit.payments.length > 0 ? `
            <div class="section-header"><h3>Payment History</h3></div>
            <div style="margin-bottom: var(--space-md); max-height: 150px; overflow-y: auto;">
                ${credit.payments.map(p => `
                    <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-light); font-size: var(--font-size-sm);">
                        <span style="color: var(--text-muted);">${new Date(p.date).toLocaleDateString()} ${new Date(p.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span style="color: var(--success); font-weight: 600;">KSh ${p.amount.toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
        ` : ''}

        ${credit.amount > 0 ? `
            <div class="form-group">
                <label>Record Payment (max: KSh ${credit.amount.toLocaleString()})</label>
                <input type="number" id="payment-amount" placeholder="Amount paid" min="1" max="${credit.amount}" />
            </div>
            <div class="modal-actions">
                <button class="btn btn-ghost" id="pay-cancel">Cancel</button>
                <button class="btn btn-success" id="pay-record">Record Payment</button>
            </div>
        ` : `
            <div class="modal-actions">
                <button class="btn btn-ghost" id="pay-cancel">Close</button>
            </div>
        `}
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    if (credit.amount > 0) {
        document.getElementById('pay-record').addEventListener('click', async () => {
            const amount = parseFloat(document.getElementById('payment-amount').value);
            if (!amount || amount <= 0) {
                showToast('Enter a valid amount (> 0)', 'warning');
                return;
            }
            if (amount > credit.amount) {
                showToast(`Payment cannot exceed KSh ${credit.amount.toLocaleString()}`, 'warning');
                return;
            }
            try {
                await addPayment(credit.id, amount);
                backdrop.classList.add('hidden');
                modal.classList.add('hidden');
                showToast(`Payment of KSh ${amount.toLocaleString()} recorded ✓`, 'success');
                renderCredits(pageContainer, profileId, profile);
            } catch (err) {
                showToast(err.message, 'error');
            }
        });
    }

    document.getElementById('pay-cancel').addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });

    backdrop.addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });
}

function showAddCreditModal(profileId, profile, pageContainer) {
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
            <label>Phone Number (unique identifier)</label>
            <input type="tel" id="credit-phone" placeholder="07XX XXX XXX" maxlength="12" />
        </div>
        <div class="form-group">
            <label>Amount Owed (KSh)</label>
            <input type="number" id="credit-amount" placeholder="0" min="1" />
        </div>
        <div id="existing-customer-msg" class="hidden" style="padding: 8px; background: var(--accent-primary); background: rgba(13,148,136,0.15); border-radius: 8px; font-size: 12px; color: var(--accent-primary); margin-bottom: 12px;">
            ℹ️ This phone already has a tab — amount will be added to existing balance
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="credit-cancel">Cancel</button>
            <button class="btn btn-primary" id="credit-save">Add Tab</button>
        </div>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    // Check for existing customer when phone is entered
    const phoneInput = document.getElementById('credit-phone');
    const existingMsg = document.getElementById('existing-customer-msg');
    phoneInput.addEventListener('input', async () => {
        const phone = phoneInput.value.trim();
        if (phone.length >= 10) {
            const { findCreditByPhone } = await import('../db/database.js');
            const existing = await findCreditByPhone(phone);
            if (existing) {
                existingMsg.classList.remove('hidden');
                existingMsg.textContent = `ℹ️ ${existing.customerName} already has a tab (KSh ${existing.amount}) — amount will be added`;
                document.getElementById('credit-name').value = existing.customerName;
            } else {
                existingMsg.classList.add('hidden');
            }
        } else {
            existingMsg.classList.add('hidden');
        }
    });

    document.getElementById('credit-save').addEventListener('click', async () => {
        const name = document.getElementById('credit-name').value.trim();
        const phone = document.getElementById('credit-phone').value.trim();
        const amount = parseFloat(document.getElementById('credit-amount').value);
        if (!name) { showToast('Enter customer name', 'warning'); return; }
        if (!amount || amount <= 0) { showToast('Enter a valid amount (> 0)', 'warning'); return; }
        try {
            await addCredit(name, phone, amount, profileId);
            backdrop.classList.add('hidden');
            modal.classList.add('hidden');
            showToast(`${name}'s tab updated — KSh ${amount.toLocaleString()}`, 'success');
            renderCredits(pageContainer, profileId, profile);
        } catch (err) {
            showToast(err.message, 'error');
        }
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

function showDebitModal(debit, profileId, profile, pageContainer) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');
    const pct = debit.initialDeposit > 0 ? Math.round((debit.balance / debit.initialDeposit) * 100) : 0;

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>${debit.customerName}</h2>
        ${debit.phone ? `<div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 8px;">📞 ${debit.phone}</div>` : ''}
        <div style="margin-bottom: var(--space-md);">
            <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--success);">
                KSh ${debit.balance.toLocaleString()}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
                Remaining balance (${pct}% of KSh ${debit.initialDeposit.toLocaleString()})
            </div>
        </div>

        <div class="section-header"><h3>Transaction History</h3></div>
        <div style="margin-bottom: var(--space-md); max-height: 180px; overflow-y: auto;">
            ${(debit.transactions || []).map(tx => `
                <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-light); font-size: var(--font-size-sm);">
                    <div>
                        <div style="font-weight: 500;">${tx.description}</div>
                        <div style="font-size: 11px; color: var(--text-muted);">${new Date(tx.date).toLocaleString()}</div>
                    </div>
                    <span style="color: ${tx.type === 'deposit' ? 'var(--success)' : 'var(--accent-secondary)'}; font-weight: 600;">
                        ${tx.type === 'deposit' ? '+' : '-'}KSh ${tx.amount.toLocaleString()}
                    </span>
                </div>
            `).join('')}
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>Deduct Purchase</label>
                <input type="number" id="debit-purchase" placeholder="Amount" min="1" max="${debit.balance}" />
            </div>
            <div class="form-group">
                <label>Top Up</label>
                <input type="number" id="debit-topup" placeholder="Amount" min="1" />
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" id="debit-desc" placeholder="What was purchased?" />
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="debit-cancel">Cancel</button>
            <button class="btn btn-success" id="debit-topup-btn">+ Top Up</button>
            <button class="btn btn-primary" id="debit-purchase-btn">- Deduct</button>
        </div>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    document.getElementById('debit-purchase-btn').addEventListener('click', async () => {
        const amount = parseFloat(document.getElementById('debit-purchase').value);
        const desc = document.getElementById('debit-desc').value.trim() || 'Purchase';
        if (!amount || amount <= 0) { showToast('Enter a valid amount', 'warning'); return; }
        try {
            await debitPurchase(debit.id, amount, desc);
            backdrop.classList.add('hidden');
            modal.classList.add('hidden');
            showToast(`KSh ${amount.toLocaleString()} deducted ✓`, 'success');
            renderCredits(pageContainer, profileId, profile);
        } catch (err) {
            showToast(err.message, 'error');
        }
    });

    document.getElementById('debit-topup-btn').addEventListener('click', async () => {
        const amount = parseFloat(document.getElementById('debit-topup').value);
        if (!amount || amount <= 0) { showToast('Enter a valid amount', 'warning'); return; }
        try {
            await debitTopUp(debit.id, amount);
            backdrop.classList.add('hidden');
            modal.classList.add('hidden');
            showToast(`KSh ${amount.toLocaleString()} added ✓`, 'success');
            renderCredits(pageContainer, profileId, profile);
        } catch (err) {
            showToast(err.message, 'error');
        }
    });

    document.getElementById('debit-cancel').addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });

    backdrop.addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });
}

function showAddDebitModal(profileId, profile, pageContainer) {
    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <h2>New Deposit Account</h2>
        <div class="form-group">
            <label>Customer Name</label>
            <input type="text" id="debit-name" placeholder="Customer name" />
        </div>
        <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" id="debit-phone" placeholder="07XX XXX XXX" maxlength="12" />
        </div>
        <div class="form-group">
            <label>Initial Deposit (KSh)</label>
            <input type="number" id="debit-amount" placeholder="0" min="1" />
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="debit-cancel">Cancel</button>
            <button class="btn btn-success" id="debit-save">Create Account</button>
        </div>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    document.getElementById('debit-save').addEventListener('click', async () => {
        const name = document.getElementById('debit-name').value.trim();
        const phone = document.getElementById('debit-phone').value.trim();
        const amount = parseFloat(document.getElementById('debit-amount').value);
        if (!name) { showToast('Enter customer name', 'warning'); return; }
        if (!amount || amount <= 0) { showToast('Enter a valid deposit amount', 'warning'); return; }
        try {
            await createDebit(name, phone, amount);
            backdrop.classList.add('hidden');
            modal.classList.add('hidden');
            showToast(`${name}'s deposit account — KSh ${amount.toLocaleString()} ✓`, 'success');
            _activeTab = 'debits';
            renderCredits(pageContainer, profileId, profile);
        } catch (err) {
            showToast(err.message, 'error');
        }
    });

    document.getElementById('debit-cancel').addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });

    backdrop.addEventListener('click', () => {
        backdrop.classList.add('hidden');
        modal.classList.add('hidden');
    });
}
