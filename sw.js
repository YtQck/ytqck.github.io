cacheName = 'YtQckCache';
filesToCache = ['search.html','scripts/app.js','assets/site/logo-114-39.png'];
self.addEventListener('install', function(e){
  e.waitUntill(
    caches.open(cacheName).then(function(cache) {
      console.log("Installed");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntill(
    caches.key().then(function(keyList){
      console.log("Activated");
      return Promise.all(keyList).map(function(key){
        if(key!==cacheName && key!==dataCacheName){
          return caches.delete(key);
        }
      })
    }))
});

self.addEventListener('fetch', function(e){
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.responseWith(
    caches.match(e.request).then(function(e){
      return response || fetch(e.request);
    })
  );
});
