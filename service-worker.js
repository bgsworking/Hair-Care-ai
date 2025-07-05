self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('hair-tracker-v1').then(cache =>
      cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/chart.js',
        '/manifest.json',
        '/icon.png'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});