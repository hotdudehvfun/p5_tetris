importScripts('cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('tetris').then(function(cache) {
     return cache.addAll([
        "index.html",
        "app.js",
        "const.js",
        "hammer.js",
        "p5.js",
        "style.css",
        "tailwind.min.css"
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
   });