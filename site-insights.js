(function () {
  "use strict";

  const STORAGE_KEY = "ichigekiInsightEventsV1";
  const MAX_EVENTS = 300;
  const MAX_AGE = 90 * 24 * 60 * 60 * 1000;
  const allowedEvents = new Set([
    "machine_view",
    "home_machine_open",
    "simulation_complete",
    "ranking_register",
    "community_post"
  ]);

  function cleanValue(value) {
    if (typeof value === "boolean") return value;
    if (typeof value === "number" && Number.isFinite(value)) return value;
    return String(value ?? "").slice(0, 80);
  }

  function readEvents() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function track(name, properties = {}) {
    if (!allowedEvents.has(name)) return;
    const now = Date.now();
    const safeProperties = {};
    Object.entries(properties).slice(0, 12).forEach(([key, value]) => {
      if (/name|email|body|title|url/i.test(key)) return;
      safeProperties[String(key).slice(0, 40)] = cleanValue(value);
    });
    const event = {
      name,
      at: new Date(now).toISOString(),
      path: location.pathname.slice(0, 120),
      ...safeProperties
    };
    try {
      const events = readEvents().filter(item => Date.parse(item.at) > now - MAX_AGE);
      events.push(event);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
    } catch {}
    if (typeof window.gtag === "function") {
      window.gtag("event", name, safeProperties);
    }
  }

  window.ICHIGEKI_INSIGHTS = { track };
  const slug = document.body?.dataset?.machine;
  if (slug) track("machine_view", { machine_slug: slug });
})();
