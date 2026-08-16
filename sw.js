const CACHE_NAME = "ichigeki-web-v71";
const CORE_ASSETS = [
  "index.html",
  "juggle-simple.html",
  "tokyo-ghoul-999.html",
  "two-choice-select.html",
  "style.css",
  "style.css?v=71",
  "main.js",
  "main.js?v=71",
  "assets/juggle/start-frame.png",
  "assets/juggle/start-frame-v2.png",
  "assets/juggle/start-button-v3.png",
  "assets/juggle/result-panel-v2.png",
  "offline.html",
  "manifest.json",
  "icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const shouldBypassHttpCache =
    event.request.mode === "navigate" ||
    event.request.destination === "style" ||
    event.request.destination === "script";
  const request = shouldBypassHttpCache
    ? new Request(event.request, { cache: "reload" })
    : event.request;
  event.respondWith(
    fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      if (event.request.mode === "navigate") return caches.match("offline.html");
      return Response.error();
    })
  );
});
