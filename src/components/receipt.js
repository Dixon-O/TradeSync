/**
 * DukaImara Receipt Generator
 * Offline-capable receipt generation with QR codes.
 */
import { renderQRToDataURL } from '../utils/qr-generator.js';
import { createTransactionPayload, encodeForQR, getDisplayMerchantId } from '../utils/transaction.js';

/**
 * Generate a receipt HTML for a completed sale and show it in a modal.
 */
export async function showReceipt(sale) {
    const txPayload = await createTransactionPayload(sale);
    const qrData = encodeForQR(txPayload);

    // QR generation with graceful fallback
    let qrImageUrl = '';
    try {
        qrImageUrl = renderQRToDataURL(qrData, 3, 2);
    } catch (e) {
        console.warn('[Receipt] QR generation failed, showing receipt without QR:', e.message);
    }

    const merchantId = getDisplayMerchantId();

    const saleDate = new Date(sale.saleTime || sale.createdAt);
    const dateStr = saleDate.toLocaleDateString('en-KE', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });
    const timeStr = saleDate.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' });

    const methodLabels = {
        cash: '💵 Cash',
        credit: '📝 Credit',
        mpesa: '📱 M-Pesa',
        airtel: '📱 Airtel Money'
    };

    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');

    modal.innerHTML = `
        <div class="modal-handle"></div>
        <div class="receipt-container" id="receipt-content">
            <div class="receipt-header">
                <div class="receipt-logo">DukaImara</div>
                <div class="receipt-sub">Sales Receipt</div>
                <div class="receipt-merchant">${merchantId}</div>
            </div>
            <div class="receipt-divider">─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─</div>
            <div class="receipt-info">
                <div class="receipt-row">
                    <span>Receipt #</span>
                    <span>${sale.receiptId || 'N/A'}</span>
                </div>
                <div class="receipt-row">
                    <span>Date</span>
                    <span>${dateStr}</span>
                </div>
                <div class="receipt-row">
                    <span>Time</span>
                    <span>${timeStr}</span>
                </div>
                <div class="receipt-row">
                    <span>Served by</span>
                    <span>${sale.profileName || 'Staff'}</span>
                </div>
                <div class="receipt-row">
                    <span>Payment</span>
                    <span>${methodLabels[sale.paymentMethod] || sale.paymentMethod}</span>
                </div>
            </div>
            <div class="receipt-divider">─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─</div>
            <div class="receipt-items">
                ${sale.items.map(item => `
                    <div class="receipt-item">
                        <div class="receipt-item-name">${item.name}</div>
                        <div class="receipt-item-detail">
                            <span>${item.quantity} × KSh ${item.price.toLocaleString()}</span>
                            <span>KSh ${item.subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="receipt-divider">─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─</div>
            <div class="receipt-total">
                <span>TOTAL</span>
                <span>KSh ${sale.total.toLocaleString()}</span>
            </div>
            <div class="receipt-qr">
                ${qrImageUrl
            ? `<img src="${qrImageUrl}" alt="Transaction QR" />`
            : `<div style="text-align:center;padding:8px;color:var(--text-tertiary);font-size:12px;">TX: ${txPayload.transactionId}</div>`
        }
                <div class="receipt-qr-label">Scan to verify transaction</div>
            </div>
            <div class="receipt-footer">
                <div class="receipt-status ${txPayload.status === 'confirmed' ? 'confirmed' : 'pending'}">
                    ${txPayload.status === 'confirmed' ? '✓ Verified' : '⏳ Pending Sync'}
                </div>
                <div class="receipt-sig">Sig: ${txPayload.signature.substr(0, 12)}...</div>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn btn-ghost" id="receipt-close">Close</button>
            <button class="btn btn-primary" id="receipt-download">📥 Download</button>
        </div>
    `;

    backdrop.classList.remove('hidden');
    modal.classList.remove('hidden');

    document.getElementById('receipt-close').addEventListener('click', closeReceiptModal);
    backdrop.addEventListener('click', closeReceiptModal);
    document.getElementById('receipt-download').addEventListener('click', () => downloadReceipt(sale.receiptId));
}

function closeReceiptModal() {
    document.getElementById('modal-backdrop').classList.add('hidden');
    document.getElementById('modal').classList.add('hidden');
}

/**
 * Download receipt as image using canvas.
 */
function downloadReceipt(receiptId) {
    const el = document.getElementById('receipt-content');
    if (!el) return;

    // Use canvas-based approach
    const canvas = document.createElement('canvas');
    const scale = 2;
    canvas.width = el.offsetWidth * scale;
    canvas.height = el.offsetHeight * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // Use current theme colors
    const styles = getComputedStyle(document.documentElement);
    const bgColor = styles.getPropertyValue('--bg-primary').trim() || '#f8fafc';
    const textColor = styles.getPropertyValue('--text-primary').trim() || '#0f172a';
    const accentColor = styles.getPropertyValue('--accent-primary').trim() || '#00A9E0';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Receipt #${receiptId || 'N/A'}`, canvas.width / (2 * scale), 30);

    const htmlBg = bgColor;
    const htmlText = textColor;
    const htmlAccent = accentColor;

    const html = `
        <!DOCTYPE html><html><head>
        <style>
            body { background: ${htmlBg}; color: ${htmlText}; font-family: 'Inter', sans-serif;
                   max-width: 320px; margin: 0 auto; padding: 16px; }
            .receipt-header { text-align: center; margin-bottom: 12px; }
            .receipt-logo { font-size: 20px; font-weight: 800; color: ${htmlAccent}; }
            .receipt-row { display: flex; justify-content: space-between; padding: 2px 0; font-size: 13px; }
            .receipt-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; padding: 8px 0; }
            .receipt-divider { text-align: center; color: #94a3b8; font-size: 11px; margin: 8px 0; }
            img { display: block; margin: 12px auto; }
        </style>
        </head><body>${el.innerHTML}</body></html>
    `;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receiptId || 'sale'}.html`;
    a.click();
    URL.revokeObjectURL(url);
}
