const cashName = "v1";
const assets = [
    "./",
    "./index.html",
    "./css/bootstrap.css",
    "./css/styles.css",
    "./js/bootstrap.bundle.js",
    "./js/app.js",
    "./images/bootstrap-logo.svg",
];


self.addEventListener("install", (installEvent)=>{
    // console.log(installEvent)
    installEvent.waitUntil(
    caches.open(cashName)
    .then((cache)=>{
        cache.addAll(assets)
        .then(()=>{})
        .catch((err)=>{})
    })
    .catch((err)=>{})
    )
})

self.addEventListener("activate", (activateEvent)=>{
    // console.log(activateEvent)
    activateEvent.waitUntil(
        caches.keys()
        .then((keys)=>{
            return Promise.all(
                keys.filter((key)=> key != cashName)
                .map((key)=> caches.delete(key))
            )
        })
    )

})

self.addEventListener("fetch", (fetchEvent)=>{
    // console.log(fetchEvent)
    fetchEvent.respondWith(
        caches.match(fetchEvent.request)
        .then((res)=>{
            return res || fetch(fetchEvent.request)

            // .then((fetchRes)=>{
            //     return caches.open(cashName)
            //     .then((cache)=>{
            //         cache.put(fetchEvent.request, fetchRes.clone())
            //         return fetchRes;
            //     })
            // })

        })
    )
})