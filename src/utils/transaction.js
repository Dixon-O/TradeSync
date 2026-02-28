/**
 * DukaImara Transaction Intelligence Layer
 * Locally signed transaction payloads for offline payment intent verification.
 * Records customer's payment intent when offline, confirmed when synced later.
 */
import { uuid, getDeviceId } from './uuid.js';
import { now as hlcNow } from './hlc.js';

const DEVICE_ID = getDeviceId();

/**
 * Generate a cryptographic nonce for transaction uniqueness.
 */
function generateNonce() {
    const array = new Uint8Array(16);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(array);
    } else {
        for (let i = 0; i < 16; i++) array[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a merchant ID from device ID.
 */
function getMerchantId() {
    const stored = localStorage.getItem('ts_merchantId');
    if (stored) return stored;
    const mid = `TSM-${DEVICE_ID.substr(0, 8).toUpperCase()}`;
    localStorage.setItem('ts_merchantId', mid);
    return mid;
}

/**
 * Create a SHA-256 hash signature of the transaction payload.
 * Uses Web Crypto API when available, falls back to simple hash.
 */
async function createSignature(payload) {
    const data = JSON.stringify(payload);
    if (typeof crypto !== 'undefined' && crypto.subtle) {
        try {
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(data);
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            // Fall back to simple hash
        }
    }
    // Simple fallback hash
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * Create a signed transaction payload for offline payment verification.
 * This records the customer's payment intent locally.
 */
export async function createTransactionPayload(sale) {
    const merchantId = getMerchantId();
    const nonce = generateNonce();
    const timestamp = Date.now();
    const hlc = hlcNow();

    const payload = {
        version: '1.0',
        type: 'SALE',
        merchantId,
        deviceId: DEVICE_ID,
        transactionId: sale.receiptId || uuid(),
        nonce,
        timestamp,
        hlc,
        amount: sale.total,
        currency: 'KES',
        paymentMethod: sale.paymentMethod,
        itemCount: sale.items ? sale.items.length : 0,
        items: sale.items ? sale.items.map(i => ({
            name: i.name,
            qty: i.quantity,
            price: i.price,
            subtotal: i.subtotal
        })) : [],
        profileName: sale.profileName,
        saleTime: sale.saleTime,
        status: navigator.onLine ? 'confirmed' : 'pending_sync',
        offlineCreated: !navigator.onLine,
    };

    // Create hash signature
    const hashPayload = {
        merchantId: payload.merchantId,
        transactionId: payload.transactionId,
        nonce: payload.nonce,
        amount: payload.amount,
        timestamp: payload.timestamp,
        deviceId: payload.deviceId,
    };

    payload.signature = await createSignature(hashPayload);

    return payload;
}

/**
 * Verify a transaction payload's signature.
 */
export async function verifyTransactionPayload(payload) {
    if (!payload || !payload.signature) return false;

    const hashPayload = {
        merchantId: payload.merchantId,
        transactionId: payload.transactionId,
        nonce: payload.nonce,
        amount: payload.amount,
        timestamp: payload.timestamp,
        deviceId: payload.deviceId,
    };

    const expectedSignature = await createSignature(hashPayload);
    return expectedSignature === payload.signature;
}

/**
 * Encode transaction payload as a compact string for QR codes.
 */
export function encodeForQR(payload) {
    // Ultra-compact encoding to fit in small QR codes (aim for < 100 bytes)
    const compact = [
        payload.merchantId,
        payload.transactionId?.slice(-8) || '',
        payload.amount,
        payload.paymentMethod?.charAt(0) || 'c',
        payload.itemCount || 0,
        payload.signature?.slice(0, 8) || '',
        payload.status === 'confirmed' ? 1 : 0,
    ];
    return compact.join('|');
}

/**
 * Get the merchant ID for display.
 */
export function getDisplayMerchantId() {
    return getMerchantId();
}
