importScripts('/p5_tetris/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('tetris').then(function(cache) {
     return cache.addAll([
        "/p5_tetris/index.html",
        "/p5_tetris/app.js",
        "/p5_tetris/const.js",
        "/p5_tetris/hammer.js",
        "/p5_tetris/p5.js",
        "/p5_tetris/style.css",
        "/p5_tetris/tailwind.min.css"
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