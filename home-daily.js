(() => {
  const machines = window.ICHIGEKI_MACHINES || {};
  const pools = {
    pachinko: [
      "okiumi6",
      "eva17-hajimari",
      "tokyo-ghoul-e",
      "lycoris-recoil-pachinko",
      "karakuri2-maou",
      "shin-eva-type-rei",
      "hokuto10-pachinko",
      "granbelm-319",
      "toaru3-pachinko",
      "shangri-la-frontier"
    ],
    slot: [
      "tokyo-ghoul-slot",
      "valvrave2",
      "smart-hokuto",
      "monkey-turn-v",
      "kaguya-sama-slot",
      "shin-eva-slot",
      "magia-record-slot",
      "god-eater-resurrection",
      "garo-yami-slot",
      "lycoris-recoil-slot"
    ]
  };

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);

  function japanToday() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    const year = Number(values.year);
    const month = Number(values.month);
    const day = Number(values.day);
    return {
      year,
      month,
      day,
      seed: Math.floor(Date.UTC(year, month - 1, day) / 86400000)
    };
  }

  function pickMachine(type, seed) {
    const available = pools[type].filter(slug => machines[slug]?.image && machines[slug]?.sim);
    if (!available.length) return null;
    const offset = type === "slot" ? 3 : 0;
    const multiplier = type === "slot" ? 7 : 1;
    const slug = available[(seed * multiplier + offset) % available.length];
    return { slug, ...machines[slug] };
  }

  function renderCard(type, machine) {
    const card = document.querySelector(`[data-daily-pick="${type}"]`);
    if (!card || !machine) return;
    const isSlot = type === "slot";
    const label = isSlot ? "スロット" : "パチンコ";
    const sourceUrl = machine.imageSource || "photo-credits.html";
    const sourceText = machine.imageCredit ? `画像出典：${machine.imageCredit}` : "画像について";
    card.querySelector(".home-daily-main").href = `${encodeURIComponent(machine.slug)}.html#simulator`;
    const image = card.querySelector("img");
    image.src = machine.image;
    image.alt = machine.imageAlt || `${machine.shortName}の機種画像`;
    card.querySelector(".home-daily-type").textContent = isSlot ? "SLOT" : "PACHINKO";
    card.querySelector(".home-daily-copy small").textContent = `${label}のおすすめ`;
    card.querySelector(".home-daily-copy h2").textContent = machine.shortName;
    card.querySelector(".home-daily-copy p").textContent = machine.catchcopy || "機種記事を確認して、そのままシミュレーションへ。";
    const credit = card.querySelector(".home-daily-credit");
    credit.href = sourceUrl;
    credit.innerHTML = `${escapeHtml(sourceText)} <span aria-hidden="true">↗</span>`;
    if (/^https?:/i.test(sourceUrl)) {
      credit.target = "_blank";
      credit.rel = "noopener noreferrer";
    } else {
      credit.removeAttribute("target");
      credit.removeAttribute("rel");
    }
  }

  function renderToday() {
    const today = japanToday();
    renderCard("pachinko", pickMachine("pachinko", today.seed));
    renderCard("slot", pickMachine("slot", today.seed));
    const date = document.getElementById("homeDailyDate");
    if (date) date.textContent = `${today.month}月${today.day}日のおすすめ・毎日0時更新`;
    return today;
  }

  function scheduleNextDay(today) {
    const nextMidnightInJapan = Date.UTC(today.year, today.month - 1, today.day + 1) - (9 * 60 * 60 * 1000);
    const delay = Math.max(1000, nextMidnightInJapan - Date.now() + 1000);
    window.setTimeout(() => scheduleNextDay(renderToday()), Math.min(delay, 2147483647));
  }

  scheduleNextDay(renderToday());
})();
