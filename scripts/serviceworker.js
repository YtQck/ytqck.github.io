var cacheName = 'm2';
var cacheFiles = [
  '../',
  '../index.html',
  '../css/new.css',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  'https://code.jquery.com/jquery-2.2.4.min.js',
  'youtube.js',
  'new.js',
  'analytics.js'
]

self.addEventListener('install', function(e){
  console.log("installed")

  e.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log('caching');
      return cache.addAll(cacheFiles);
    })
   )
})
self.addEventListener('activate', function(e){
  console.log("activate")

  e.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(cacheNames.map(function(thisCacheName){

        if(thisCacheName !== cacheName){
          console.log("removing");
          return caches.delete(thisCacheName);
        }

      }))
    })
  )
})
self.addEventListener('fetch', function(e){
  console.log("fetch")
})
