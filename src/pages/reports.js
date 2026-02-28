/**
 * Sales Reports Page
 * Who, What, When, How Much, How Many — with filtering and CSV export.
 */
import { getSalesReport, getProfiles, hasPrivilege } from '../db/database.js';

export async function renderReports(container, profileId, profile) {
    const profiles = await getProfiles();

    const now = new Date();
    const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay()); weekStart.setHours(0, 0, 0, 0);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let dateFrom = todayStart.getTime();
    let dateTo = null;
    let paymentFilter = '';
    let profileFilter = '';

    async function renderReport() {
        const report = await getSalesReport(dateFrom, dateTo, paymentFilter || null, profileFilter || null);

        const methodLabels = { cash: '💵 Cash', credit: '📝 Credit', mpesa: '📱 M-Pesa', airtel: '📲 Airtel' };

        container.innerHTML = `
            <div class="page active" id="page-reports">
                <div class="page-header">
                    <div>
                        <h2>Sales Report</h2>
                        <div class="subtitle">${report.totalSales} sales · KSh ${report.totalRevenue.toLocaleString()}</div>
                    </div>
                    <button class="btn btn-ghost" id="export-csv">📥 Export</button>
                </div>

                <div class="report-filters">
                    <select id="rpt-date-range">
                        <option value="today" selected>Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="all">All Time</option>
                    </select>
                    <select id="rpt-method">
                        <option value="">All Methods</option>
                        <option value="cash">Cash</option>
                        <option value="mpesa">M-Pesa</option>
                        <option value="airtel">Airtel</option>
                        <option value="credit">Credit</option>
                    </select>
                    <select id="rpt-profile">
                        <option value="">All Staff</option>
                        ${profiles.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                    </select>
                </div>

                <div class="stats-grid" style="margin-bottom: var(--space-md);">
                    <div class="stat-card revenue-card">
                        <div class="stat-label">Revenue</div>
                        <div class="stat-value">KSh ${report.totalRevenue.toLocaleString()}</div>
                        <div class="stat-sub">${report.totalSales} sales · ${report.totalItems} items</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Avg Sale</div>
                        <div class="stat-value">KSh ${Math.round(report.avgSaleSize).toLocaleString()}</div>
                    </div>
                </div>

                ${Object.keys(report.byMethod).length > 0 ? `
                    <div class="section-header"><h3>By Payment Method</h3></div>
                    <div class="report-method-grid">
                        ${Object.entries(report.byMethod).map(([method, data]) => `
                            <div class="report-method-card">
                                <div class="report-method-icon">${methodLabels[method]?.split(' ')[0] || '💰'}</div>
                                <div class="report-method-info">
                                    <div class="report-method-name">${methodLabels[method] || method}</div>
                                    <div class="report-method-value">KSh ${data.total.toLocaleString()} · ${data.count} sales</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${report.topProducts.length > 0 ? `
                    <div class="section-header" style="margin-top: var(--space-md);"><h3>Top Products</h3></div>
                    <div class="report-top-products">
                        ${report.topProducts.slice(0, 5).map((p, i) => `
                            <div class="report-product-row">
                                <span class="report-rank">#${i + 1}</span>
                                <div class="report-product-info">
                                    <div class="report-product-name">${p.name}</div>
                                    <div class="report-product-meta">${p.quantity} sold</div>
                                </div>
                                <span class="report-product-revenue">KSh ${p.revenue.toLocaleString()}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <div class="section-header" style="margin-top: var(--space-md);"><h3>Sales Detail</h3></div>
                <div class="report-table-wrapper">
                    <div class="report-table">
                        ${report.sales.length === 0 ? `
                            <div class="empty-state"><h3>No sales in this period</h3></div>
                        ` : report.sales.map(s => `
                            <div class="report-sale-row">
                                <div class="report-sale-main">
                                    <div class="report-sale-who">${s.profileName || 'Unknown'}</div>
                                    <div class="report-sale-what">${s.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}</div>
                                    <div class="report-sale-when">${new Date(s.saleTime || s.createdAt).toLocaleString('en-KE', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        })}</div>
                                </div>
                                <div class="report-sale-right">
                                    <div class="report-sale-amount">KSh ${s.total.toLocaleString()}</div>
                                    <div class="report-sale-items">${s.items.reduce((sum, i) => sum + i.quantity, 0)} items</div>
                                    <div class="report-sale-method">${methodLabels[s.paymentMethod] || s.paymentMethod}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Filter listeners
        document.getElementById('rpt-date-range').addEventListener('change', (e) => {
            switch (e.target.value) {
                case 'today': dateFrom = todayStart.getTime(); dateTo = null; break;
                case 'week': dateFrom = weekStart.getTime(); dateTo = null; break;
                case 'month': dateFrom = monthStart.getTime(); dateTo = null; break;
                case 'all': dateFrom = null; dateTo = null; break;
            }
            renderReport();
        });

        document.getElementById('rpt-method').addEventListener('change', (e) => {
            paymentFilter = e.target.value;
            renderReport();
        });

        document.getElementById('rpt-profile').addEventListener('change', (e) => {
            profileFilter = e.target.value;
            renderReport();
        });

        // Export CSV
        document.getElementById('export-csv').addEventListener('click', () => {
            exportCSV(report);
        });
    }

    renderReport();
}

function exportCSV(report) {
    const headers = ['Receipt #', 'Date', 'Time', 'Staff', 'Items', 'Qty', 'Amount', 'Payment Method'];
    const rows = report.sales.map(s => {
        const dt = new Date(s.saleTime || s.createdAt);
        return [
            s.receiptId || '',
            dt.toLocaleDateString(),
            dt.toLocaleTimeString(),
            s.profileName || '',
            s.items.map(i => i.name).join('; '),
            s.items.reduce((sum, i) => sum + i.quantity, 0),
            s.total,
            s.paymentMethod
        ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DukaImara-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}
