const CACHE_NAME = "ichigeki-web-v194";
const CORE_ASSETS = [
  "index.html",
  "account.html",
  "machines.html",
  "pachinko.html",
  "slots.html",
  "rankings.html",
  "photo-credits.html",
  "probability-tool.html",
  "exchange-rate-tool.html",
  "new-machines-2026-10.html",
  "new-machines-2026-11.html",
  "articles.html",
  "average-game-guide.html",
  "juggler-8000g-guide.html",
  "continuation-rate-guide.html",
  "coin-unit-guide.html",
  "deka-heso-guide.html",
  "simulation-policy.html",
  "community.html",
  "community-admin.html",
  "community-guidelines.html",
  "ranking.html",
  "slot-zone-demo.html",
  "gundam-unicorn.html",
  "eva319-red.html",
  "sao-phantom-bullet.html",
  "toaru3-pachinko.html",
  "kamen-rider-black-light.html",
  "granbelm-319.html",
  "fever-yokai-watch.html",
  "juoh-shishi-no-ichigeki.html",
  "no-game-no-life-119.html",
  "karakuri2-maou.html",
  "shin-eva-type-rei.html",
  "sao-senko-no-kiseki.html",
  "hokuto10-pachinko.html",
  "kaguya-sama-slot.html",
  "shin-eva-slot.html",
  "dumbbell-slot.html",
  "symphogear-seigi-slot.html",
  "garo-yami-slot.html",
  "ragnador-slot.html",
  "seiya-ougon-slot.html",
  "ggo-slot.html",
  "godzilla-eva2-slot.html",
  "mahoako-slot.html",
  "uminchu-slot.html",
  "tenten-slot.html",
  "sengoku-otome5.html",
  "million-god-kiseki.html",
  "lycoris-recoil-pachinko.html",
  "okiumi6.html",
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
  "neo-im-juggler.html",
  "gogo-juggler3.html",
  "funky-juggler2.html",
  "style.css",
  "style.css?v=155",
  "main.js",
  "main.js?v=120",
  "app-shell.js",
  "app-shell.js?v=10",
  "auth.js",
  "auth.js?v=1",
  "machine-library.js",
  "machine-library.js?v=125",
  "machine-hub.js",
  "machine-hub.js?v=10",
  "machine-detail.js",
  "machine-detail.js?v=143",
  "achievements.js",
  "achievements.js?v=1",
  "my-records.js",
  "my-records.js?v=6",
  "community-config.js",
  "community-config.js?v=2",
  "community.js",
  "community.js?v=12",
  "site-insights.js",
  "site-insights.js?v=1",
  "adsense-loader.js",
  "adsense-loader.js?v=1",
  "adsense-loader.js?v=2",
  "community-admin.js",
  "community-admin.js?v=1",
  "slot-zone-demo.js",
  "slot-zone-demo.js?v=1",
  "gundam-unicorn.js",
  "gundam-unicorn.js?v=10",
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
