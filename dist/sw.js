/**
 * DukaImara Service Worker v2
 * Cache-first for static assets, network-first for API with offline fallback.
 * Skips Vite dev server requests (HMR, module loading) to avoid breaking dev mode.
 */

const CACHE_NAME = 'DukaImara-v2';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon.svg',
];

// Install — pre-cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Use addAll with ignoring failures for missing assets
            return Promise.allSettled(
                STATIC_ASSETS.map(url =>
                    cache.add(url).catch(err => {
                        console.warn(`[SW] Failed to cache: ${url}`, err.message);
                    })
                )
            );
        })
    );
    self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// Fetch strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // SKIP: Vite dev server requests — never cache these
    if (
        url.pathname.startsWith('/@') ||          // Vite internal (/@vite, /@fs, /@id)
        url.pathname.startsWith('/node_modules') || // Node modules served by Vite
        url.pathname.startsWith('/src/') ||         // Source files served by Vite dev
        url.pathname.includes('?') ||               // Query string requests (HMR updates)
        url.protocol === 'ws:' ||                   // WebSocket
        url.protocol === 'wss:'                     // Secure WebSocket
    ) {
        return; // Let browser handle normally
    }

    // API calls → network-first
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request)
                .then(res => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then(c => c.put(request, clone));
                    return res;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Static assets → cache-first
    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;
            return fetch(request).then(res => {
                if (res.ok && res.type === 'basic') {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then(c => c.put(request, clone));
                }
                return res;
            });
        }).catch(() => {
            if (request.destination === 'document') {
                return caches.match('/index.html');
            }
        })
    );
});

// Background sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'DukaImara-sync') {
        event.waitUntil(
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({ type: 'SYNC_TRIGGER' });
                });
            })
        );
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    const data = event.data?.json() || { title: 'DukaImara', body: 'You have a notification' };
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/icons/icon-192.png',
            badge: '/icons/icon-72.png'
        })
    );
});
