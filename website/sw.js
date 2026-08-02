const CACHE_NAME = 'rec-proto-v1';
const FILES = ['/', '/index.html', '/style.css', '/app.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  // Prefer cache, fall back to network, and if both fail return index.html for navigation
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        // cache same-origin HTML/CSS/JS for future offline
        if (resp && resp.status === 200 && resp.type === 'basic'){
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return resp;
      }).catch(()=>{
        // navigation fallback
        if (event.request.mode === 'navigate') return caches.match('/index.html');
        return new Response('', {status:503, statusText:'offline'});
      });
    })
  );
});
