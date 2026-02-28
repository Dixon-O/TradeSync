/**
 * DukaImara — Main Entry Point v2
 * Hash-based routing, RBAC-aware navigation, session persistence.
 */
import './styles/index.css';
import './styles/components.css';
import './styles/pages.css';
import { initHLC } from './utils/hlc.js';
import { getDeviceId } from './utils/uuid.js';
import { initPinLock, lock } from './components/pin-lock.js';
import { initNav, navigateTo, updateNavForProfile } from './components/nav.js';
import { initSyncStatus } from './components/sync-status.js';
import { startAutoSync } from './db/sync-queue.js';
import { startHealthChecks } from './utils/network.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderSales, addToCart } from './pages/sales.js';
import { renderInventory } from './pages/inventory.js';
import { renderCredits } from './pages/credits.js';
import { renderSettings } from './pages/settings.js';
import { renderReports } from './pages/reports.js';
import { renderAdminPanel } from './pages/admin-panel.js';

let _currentProfile = null;
let _currentPage = 'dashboard';

// Theme initialization
function initTheme() {
    const saved = localStorage.getItem('ts_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
}

/**
 * Render the active page into the page container.
 */
async function renderPage(page) {
    _currentPage = page;

    // Update hash without triggering hashchange
    const newHash = `#${page}`;
    if (location.hash !== newHash) {
        history.replaceState(null, '', newHash);
    }

    const container = document.getElementById('page-container');
    container.innerHTML = '';

    if (!_currentProfile) return;

    const profileId = _currentProfile.id;

    switch (page) {
        case 'dashboard':
            await renderDashboard(container, profileId, _currentProfile, {
                navigateTo: (p) => navigateTo(p),
                addToCart
            });
            break;
        case 'sales':
            await renderSales(container, profileId, _currentProfile);
            break;
        case 'inventory':
            await renderInventory(container, profileId, _currentProfile);
            break;
        case 'credits':
            await renderCredits(container, profileId, _currentProfile);
            break;
        case 'reports':
            await renderReports(container, profileId, _currentProfile);
            break;
        case 'settings':
            await renderSettings(container, profileId, _currentProfile, {
                onLock: () => {
                    _currentProfile = null;
                    sessionStorage.removeItem('ts_profileId');
                    lock();
                }
            });
            break;
        case 'admin':
            await renderAdminPanel(container, _currentProfile);
            break;
    }
}

/**
 * Initialize the app.
 */
function init() {
    // Init theme
    initTheme();

    // Init HLC with device ID
    const deviceId = getDeviceId();
    initHLC(deviceId);

    // Start network health checks
    startHealthChecks(10000);

    // Init PIN lock — when unlocked, start the app
    initPinLock((profile) => {
        _currentProfile = profile;
        sessionStorage.setItem('ts_profileId', profile.id);

        // Init navigation with profile awareness
        initNav((page) => renderPage(page), profile);
        updateNavForProfile(profile);

        // Init sync status bar
        initSyncStatus();

        // Start auto sync
        startAutoSync(30000);

        // Restore page from hash or default to dashboard
        const hash = location.hash.replace('#', '') || 'dashboard';
        const validPages = ['dashboard', 'sales', 'inventory', 'credits', 'reports', 'settings', 'admin'];
        const page = validPages.includes(hash) ? hash : 'dashboard';
        renderPage(page);
    });

    // Lock button
    document.getElementById('lock-btn').addEventListener('click', () => {
        _currentProfile = null;
        sessionStorage.removeItem('ts_profileId');
        lock();
    });

    // Hash change listener for back/forward navigation
    window.addEventListener('hashchange', () => {
        if (!_currentProfile) return;
        const page = location.hash.replace('#', '') || 'dashboard';
        if (page !== _currentPage) {
            navigateTo(page);
        }
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
        // In dev mode, unregister any stale service workers first
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (const reg of registrations) {
                if (reg.active && reg.active.scriptURL.includes('sw.js')) {
                    // Re-register to pick up the latest version
                    reg.update().catch(() => { });
                }
            }
        });
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('[App] SW registered:', reg.scope))
            .catch(err => console.warn('[App] SW registration failed:', err.message));

        // Listen for sync triggers from SW
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data?.type === 'SYNC_TRIGGER') {
                import('./db/sync-queue.js').then(mod => mod.forceSync());
            }
        });
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
