/**
 * TradeSync — Main Entry Point
 * App initialization, routing, and module orchestration.
 */
import { initHLC } from './utils/hlc.js';
import { getDeviceId } from './utils/uuid.js';
import { initPinLock, lock } from './components/pin-lock.js';
import { initNav, navigateTo } from './components/nav.js';
import { initSyncStatus } from './components/sync-status.js';
import { startAutoSync } from './db/sync-queue.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderSales, addToCart } from './pages/sales.js';
import { renderInventory } from './pages/inventory.js';
import { renderCredits } from './pages/credits.js';
import { renderSettings } from './pages/settings.js';

let _currentProfile = null;
let _currentPage = 'dashboard';

/**
 * Render the active page into the page container.
 */
async function renderPage(page) {
    _currentPage = page;
    const container = document.getElementById('page-container');
    container.innerHTML = '';

    if (!_currentProfile) return;

    const profileId = _currentProfile.id;

    switch (page) {
        case 'dashboard':
            await renderDashboard(container, profileId, {
                navigateTo: (p) => navigateTo(p),
                addToCart
            });
            break;
        case 'sales':
            await renderSales(container, profileId);
            break;
        case 'inventory':
            await renderInventory(container, profileId);
            break;
        case 'credits':
            await renderCredits(container, profileId);
            break;
        case 'settings':
            await renderSettings(container, profileId, {
                onLock: () => {
                    _currentProfile = null;
                    lock();
                }
            });
            break;
    }
}

/**
 * Initialize the app.
 */
function init() {
    // Init HLC with device ID
    const deviceId = getDeviceId();
    initHLC(deviceId);

    // Init PIN lock — when unlocked, start the app
    initPinLock((profile) => {
        _currentProfile = profile;

        // Init navigation
        initNav((page) => renderPage(page));

        // Init sync status bar
        initSyncStatus();

        // Start auto sync
        startAutoSync(30000);

        // Render default page
        renderPage('dashboard');
    });

    // Lock button
    document.getElementById('lock-btn').addEventListener('click', () => {
        _currentProfile = null;
        lock();
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.log('SW registration failed:', err));
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
