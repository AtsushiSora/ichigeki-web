(function () {
  "use strict";
  if (location.hostname !== "ichigeki-pachislot.com") return;
  if (document.getElementById("ichigekiAdsenseScript")) return;
  const script = document.createElement("script");
  script.id = "ichigekiAdsenseScript";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2599640417413447";
  document.head.appendChild(script);
})();
