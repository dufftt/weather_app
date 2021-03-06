const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self =this;

// Installation
self.addEventListener("install", (event)=>{
event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) =>{
        console.log("opened cache");

        return cache.addAll(urlsToCache);
    })
)
});

// Listen to Request
self.addEventListener("fetch", (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
            .catch((err)=> caches.match('offline.html'))
        })
    )
});

// Activate serviceworker
self.addEventListener("activate", (event)=>{
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});