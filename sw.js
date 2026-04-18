const CACHE = 'utah-trip-v2';

const ASSETS = [
  './',
  './index.html',
  './plan.html',
  './images/apple-touch-icon.png',
  './images/favicon.png',
  './images/belly-of-the-dragon.webp',
  './images/bright-angel-trail.webp',
  './images/bryce-canyon-sunset-point.webp',
  './images/bryce-peekaboo-loop.webp',
  './images/bryce-rainbow-yovimpa-2.webp',
  './images/bryce-rim-drive-1.webp',
  './images/bryce-rim-drive.webp',
  './images/bryce-sunset-point.webp',
  './images/canjunctmilkyway01.webp',
  './images/canyonjunction01.webp',
  './images/canyonoverlook01.webp',
  './images/desert-view-watchtower.webp',
  './images/double-crown-2.webp',
  './images/double-crown-3.webp',
  './images/emeraldpools01.webp',
  './images/grand-canyon.webp',
  './images/hermit-road.webp',
  './images/hopi-point-sunset.webp',
  './images/kanarra-creek-k2.webp',
  './images/kanarra-falls-k1.webp',
  './images/kolobmilkyway01.webp',
  './images/marble-canyon.webp',
  './images/narrows-n2.webp',
  './images/narrows01.webp',
  './images/road-trip.webp',
  './images/smithsoniansunset01.webp',
  './images/south-rim-grand-canyon.webp',
  './images/st-george-wedding.webp',
  './images/stargazing-s2.webp',
  './images/sunrise-yavapai-point.webp',
  './images/sunset-mather-point.webp',
  './images/timbercreekoverlook06.webp',
  './images/towersofthevirgin01.webp',
  './images/vermillion-cliffs.webp',
  './images/westrim12.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
