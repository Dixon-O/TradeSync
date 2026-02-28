/**
 * Bottom Navigation Component v2
 * RBAC-aware — hides tabs based on profile privileges.
 */
import { hasPrivilege } from '../db/database.js';

let _activePage = 'dashboard';
let _onNavigate = null;
let _currentProfile = null;

export function initNav(onNavigateCallback, profile) {
    _onNavigate = onNavigateCallback;
    _currentProfile = profile;
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

    // Update hash
    history.replaceState(null, '', `#${page}`);

    if (_onNavigate) _onNavigate(page);
}

export function updateNavForProfile(profile) {
    _currentProfile = profile;
    const nav = document.getElementById('bottom-nav');

    // Show/hide nav items based on privileges
    const sellBtn = nav.querySelector('[data-page="sales"]');
    const stockBtn = nav.querySelector('[data-page="inventory"]');
    const creditBtn = nav.querySelector('[data-page="credits"]');
    const settingsBtn = nav.querySelector('[data-page="settings"]');

    if (sellBtn) sellBtn.style.display = hasPrivilege(profile, 'canSell') ? '' : 'none';
    if (stockBtn) stockBtn.style.display = hasPrivilege(profile, 'canAddStock') ? '' : 'none';
    if (creditBtn) creditBtn.style.display = hasPrivilege(profile, 'canManageCredits') ? '' : 'none';

    // Admin gets admin tab, staff gets settings
    if (settingsBtn) {
        if (profile.role === 'admin') {
            settingsBtn.dataset.page = 'admin';
            settingsBtn.querySelector('span').textContent = 'Admin';
        } else {
            settingsBtn.dataset.page = 'settings';
            settingsBtn.querySelector('span').textContent = 'More';
        }
    }
}

export function getActivePage() {
    return _activePage;
}
