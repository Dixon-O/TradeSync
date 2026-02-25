/**
 * Bottom Navigation Component
 */

let _activePage = 'dashboard';
let _onNavigate = null;

export function initNav(onNavigateCallback) {
    _onNavigate = onNavigateCallback;
    const nav = document.getElementById('bottom-nav');

    nav.addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-btn');
        if (!btn) return;

        const page = btn.dataset.page;
        if (page && page !== _activePage) {
            navigateTo(page);
        }
    });
}

export function navigateTo(page) {
    _activePage = page;
    const nav = document.getElementById('bottom-nav');

    // Update active button
    nav.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });

    if (_onNavigate) _onNavigate(page);
}

export function getActivePage() {
    return _activePage;
}
