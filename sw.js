const CACHE_NAME = 'aethelgard-pwa-v1';
const CORE_FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_FILES);
    // Activate immediately; the page should be reloaded once while online to warm CDN caches.
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('aethelgard-pwa-') && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Runtime-cache same-origin game files and external libraries/fonts (Three.js, Tailwind, Google Fonts).
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req, { ignoreVary: true });
    if (cached) return cached;
    try {
      const response = await fetch(req);
      // Cache successful responses and opaque no-cors CDN/font responses too.
      if (response && (response.ok || response.type === 'opaque')) {
        try { await cache.put(req, response.clone()); } catch (_) {}
      }
      return response;
    } catch (err) {
      if (req.mode === 'navigate') {
        const fallback = await cache.match('./index.html');
        if (fallback) return fallback;
      }
      throw err;
    }
  })());
});
