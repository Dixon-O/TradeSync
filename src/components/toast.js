/**
 * Toast Notifications
 * Lightweight, animated toast system.
 */

let _toasts = [];
const TOAST_DURATION = 3000;

export function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓', error: '✕', warning: '⚠', info: 'ℹ'
    };

    toast.innerHTML = `
        <span style="font-size: 14px; font-weight: 800;">${icons[type] || 'ℹ'}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    _toasts.push(toast);

    // Auto-dismiss
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-8px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => {
            toast.remove();
            _toasts = _toasts.filter(t => t !== toast);
        }, 250);
    }, TOAST_DURATION);
}
