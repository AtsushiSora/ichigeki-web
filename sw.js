const CACHE_NAME = "ichigeki-web-v109";
const CORE_ASSETS = [
  "index.html",
  "juggle-simple.html",
  "tokyo-ghoul-999.html",
  "two-choice-select.html",
  "community.html",
  "community-admin.html",
  "community-guidelines.html",
  "slot-zone-demo.html",
  "gundam-unicorn.html",
  "lycoris-recoil-slot.html",
  "assault-lily.html",
  "kanokari-slot.html",
  "kabaneri2-119.html",
  "aobuta-slot.html",
  "fire-force2-99.html",
  "hokuto-tensei2.html",
  "tokyo-ghoul-super.html",
  "bofuri-slot.html",
  "azur-lane-slot.html",
  "sao-alicization-yozora.html",
  "gundam-seed-climax.html",
  "tokyo-ghoul-slot.html",
  "valvrave2.html",
  "kabaneri-unato.html",
  "tokyo-ghoul-e.html",
  "eva17-hajimari.html",
  "garo12-gokugen.html",
  "karakuri-circus.html",
  "monkey-turn-v.html",
  "eva15.html",
  "rezero-onigakari.html",
  "kabaneri.html",
  "smart-hokuto.html",
  "valvrave.html",
  "sengoku-otome4.html",
  "oumi5.html",
  "shin-hokuto-musou.html",
  "style.css",
  "style.css?v=100",
  "style.css?v=101",
  "style.css?v=103",
  "style.css?v=104",
  "style.css?v=105",
  "style.css?v=106",
  "style.css?v=107",
  "style.css?v=108",
  "style.css?v=99",
  "style.css?v=96",
  "main.js",
  "main.js?v=99",
  "main.js?v=107",
  "machine-library.js",
  "machine-library.js?v=99",
  "machine-library.js?v=103",
  "machine-library.js?v=104",
  "machine-library.js?v=105",
  "machine-detail.js",
  "machine-detail.js?v=99",
  "machine-detail.js?v=103",
  "machine-detail.js?v=104",
  "machine-detail.js?v=105",
  "machine-detail.js?v=106",
  "machine-detail.js?v=107",
  "community-config.js",
  "community.js",
  "community.js?v=3",
  "community.js?v=4",
  "community.js?v=5",
  "community.js?v=6",
  "community.js?v=7",
  "community-admin.js",
  "community-admin.js?v=1",
  "community-admin.js?v=2",
  "slot-zone-demo.js",
  "gundam-unicorn.js",
  "gundam-unicorn.js?v=2",
  "gundam-unicorn.js?v=3",
  "assets/juggle/start-button-v3.png",
  "assets/juggle/result-panel-v2.png",
  "assets/juggle/marquee-frame-v4.png",
  "assets/juggle/slot-machine-v4.png",
  "assets/juggle/rank-button-v4.png",
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
