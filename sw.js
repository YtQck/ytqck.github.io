cacheName = 'YtQckCache-v3.4';
dataCacheName = 'YtQckDataCache';
filesToCache = [
  '/',
  '/?ref=fb',
  '/?ref=twi',
  '/?ref=yt',
  '/index',
  '/index?hs=true',
  '/index?ref=fb',
  '/index?ref=twi',
  '/index?ref=yt',
  '/search',
  '/search?q=*',
  '/search?q=*&btn=*',
  '/scripts/app.js',
  '/scripts/jquery.js',
  '/scripts/jquery-ui.js',
  '/css/jquery-ui.css',
  '/assets/site/logo-64.png',
  '/assets/site/logo-114-39.png',
  '/assets/site/logo-453-154.png',
  '/assets/site/bottom-223-32.png'
];
self.addEventListener('install', function(e){
  console.log("Installed");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Installing...")
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activated');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
