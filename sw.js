const CACHE_NAME = "ichigeki-web-v240";
const CORE_ASSETS = [
  "offline.html",
  "style.css?v=178",
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
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  const shouldBypassHttpCache =
    event.request.mode === "navigate" ||
    event.request.destination === "style" ||
    event.request.destination === "script";
  const request = shouldBypassHttpCache
    ? new Request(event.request, { cache: "reload" })
    : event.request;
  event.respondWith(
    fetch(request).then(response => {
      if (response.ok && response.type === "basic") {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      if (event.request.mode === "navigate") return caches.match("offline.html");
      return Response.error();
    })
  );
});
