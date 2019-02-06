const VERSION = "1.0.0";

const URLS = ['./', 'index.css', 'index.js', 'atom.png', '/pwacompat.js']

const CACHE = "Reward Points Cache " + VERSION;

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => {
            return cache.addAll(URLS)
        })
    )
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET' || (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') || event.request.url.indexOf(location.origin) === -1) {
        return;
    }
    event.respondWith(
        caches.open(CACHE).then(cache => {
            return cache.match(event.request)
                .then(function (response) {
                    if (response) {
                        return response;     // if valid response is found in cache return it
                    } else {
                        return fetch(event.request)     //fetch from internet
                            .then(function (res) {
                                return caches.open(CACHE)
                                    .then(function (cache) {
                                        cache.put(event.request.url, res.clone());    //save the response for future
                                        return res;   // return the fetched data
                                    })
                            })
                            .catch(function (err) {       // fallback mechanism
                                return new Response(err)
                            });
                    }
                })
        })
    );
});