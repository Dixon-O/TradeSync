/**
 * TradeSync Service Worker
 * Cache-first for app assets, network-first for API with offline fallback.
 */

const CACHE_NAME = 'tradesync-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/src/styles/index.css',
    '/src/styles/components.css',
    '/src/styles/pages.css',
    '/manifest.json',
    '/icons/icon.svg',
];

// Install — pre-cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW] Pre-caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch — smart caching strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // API calls — network first, fallback to cache
    if (url.pathname.startsWith('/api')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Static assets — cache first, fallback to network
    event.respondWith(cacheFirst(request));
});

// Cache-first strategy
async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        // Return offline page or empty response
        return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
}

// Network-first strategy
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        const cached = await caches.match(request);
        if (cached) return cached;
        return new Response(JSON.stringify({ error: 'offline', queued: true }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Background sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'tradesync-queue') {
        event.waitUntil(
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({ type: 'SYNC_TRIGGERED' });
                });
            })
        );
    }
});
