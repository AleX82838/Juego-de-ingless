const CACHE_NAME = "flynglish-v15";
const ASSETS = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.json", "./icon.svg", "./icon.PNG", "./games/dominoes.html", "./audio/games/snakes/musicserpienteyescalera.mp3"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("flynglish-") && key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  // Prefer the newly deployed file so an old PWA cache cannot keep stale JS alive.
  const isAppFile = /\.(html|js|css|json|svg)$/.test(url.pathname) || url.pathname.endsWith("/");
  if (isAppFile) {
    event.respondWith(fetch(event.request).then(response => {
      if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request, {ignoreSearch:true}).then(cached => cached || caches.match("./index.html"))));
  } else {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response && response.ok && url.pathname.endsWith(".mp3")) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
      return response;
    })));
  }
});
