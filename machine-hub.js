(() => {
  const machines = Object.entries(window.ICHIGEKI_MACHINES || {})
    .map(([slug, machine]) => ({ slug, ...machine }))
    .filter(machine => machine.slug && machine.shortName && machine.sim);
  const machineMap = Object.fromEntries(machines.map(machine => [machine.slug, machine]));
  const mode = document.body.dataset.hubMode === "rankings" ? "rankings" : "machines";
  const fixedType = ["pachinko", "slot"].includes(document.body.dataset.machineType) ? document.body.dataset.machineType : "";
  const FAVORITES_KEY = "ichigekiFavoriteMachinesV1";
  const RECENT_KEY = "ichigekiRecentMachinesV1";
  const grid = document.getElementById("machineHubGrid");
  const search = document.getElementById("machineHubSearch");
  const status = document.getElementById("machineHubStatus");
  const tools = document.querySelector(".machine-hub-tools");
  let filter = fixedType || "all";
  let sort = "recommended";

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  function readStored(key, fallback = []) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return Array.isArray(value) ? value : fallback;
    } catch { return fallback; }
  }
  function favorites() { return readStored(FAVORITES_KEY).filter(slug => machineMap[slug]); }
  function recentSlugs() {
    return readStored(RECENT_KEY)
      .map(item => typeof item === "string" ? item : item?.slug)
      .filter((slug, index, list) => machineMap[slug] && list.indexOf(slug) === index);
  }
  function writeFavorites(value) {
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(value.slice(0, 20))); } catch {}
  }
  const averageLabel = machine => machine.type === "slot"
    ? `平均${Number(machine.sim.mainRate || machine.sim.triggerRate || 0).toLocaleString("ja-JP")}G`
    : `平均${Number(machine.sim.hitRate || 0).toLocaleString("ja-JP")}回転`;
  const subLabel = machine => machine.type === "slot"
    ? `コイン単価 ${Number(machine.sim.coinUnit || 0).toFixed(1)}円`
    : String(machine.sim.startType || "通常ヘソ");
  const isPopular = machine => Number(machine.order || 999) <= 20 || /人気|定番|全国|大型ホール/.test(`${machine.intro || ""} ${machine.catchcopy || ""}`);
  const isSmartSlot = machine => machine.type === "slot" && (/スマスロ/.test(machine.name) || /^L/.test(machine.name));
  const isJuggler = machine => machine.type === "slot" && (machine.sim.kind === "juggler" || /ジャグラー/.test(machine.name));
  const isLt = machine => machine.type === "pachinko" && (Boolean(machine.sim.upperLabel) || /LT|ラッキートリガー|上位/.test(`${machine.intro || ""} ${machine.catchcopy || ""}`));
  const isWideStart = machine => machine.type === "pachinko" && /デカ|FAIR|BIG|超.*START/i.test(String(machine.sim.startType || ""));
  const introducedAt = machine => {
    const match = String(machine.year || "").match(/(\d{4})年(?:(\d{1,2})月)?/);
    return match ? Number(match[1]) * 100 + Number(match[2] || 0) : 0;
  };
  function matchesFilter(machine) {
    if (fixedType && machine.type !== fixedType) return false;
    if (filter === "all") return true;
    if (filter === "pachinko" || filter === "slot") return machine.type === filter;
    if (filter === "favorite") return favorites().includes(machine.slug);
    if (filter === "popular") return isPopular(machine);
    if (filter === "new") return String(machine.year || "").includes("2026年");
    if (filter === "light") return machine.type === "pachinko" && Number(machine.sim.hitRate) <= 199.9;
    if (filter === "lt") return isLt(machine);
    if (filter === "wide") return isWideStart(machine);
    if (filter === "smart") return isSmartSlot(machine);
    if (filter === "juggler") return isJuggler(machine);
    if (filter === "high-coin") return machine.type === "slot" && Number(machine.sim.coinUnit) >= 4;
    return true;
  }
  function machineTags(machine) {
    const tags = [];
    if (String(machine.year || "").includes("2026年")) tags.push("新台");
    if (machine.type === "pachinko") {
      if (Number(machine.sim.hitRate) <= 199.9) tags.push("ライト");
      if (isLt(machine)) tags.push("LT");
      if (isWideStart(machine)) tags.push("デカヘソ");
    } else {
      if (isJuggler(machine)) tags.push("Aタイプ");
      else if (isSmartSlot(machine)) tags.push("スマスロ");
      if (Number(machine.sim.coinUnit) >= 4) tags.push("高コイン単価");
    }
    return tags.slice(0, 3);
  }
  function destination(machine) {
    return `${encodeURIComponent(machine.slug)}.html${mode === "rankings" ? "#machineRanking" : "#simulator"}`;
  }
  function sortedMachines(list) {
    return [...list].sort((a, b) => {
      if (sort === "newest") return introducedAt(b) - introducedAt(a) || Number(a.order || 999) - Number(b.order || 999);
      if (sort === "name") return a.shortName.localeCompare(b.shortName, "ja");
      if (sort === "light") {
        const aRate = Number(a.type === "slot" ? a.sim.mainRate || a.sim.triggerRate : a.sim.hitRate) || 99999;
        const bRate = Number(b.type === "slot" ? b.sim.mainRate || b.sim.triggerRate : b.sim.hitRate) || 99999;
        return aRate - bRate;
      }
      return Number(a.order || 999) - Number(b.order || 999) || a.shortName.localeCompare(b.shortName, "ja");
    });
  }

  const filterSets = {
    pachinko: [["all", "すべて"], ["popular", "人気"], ["new", "新台"], ["light", "ライト"], ["lt", "LT"], ["wide", "デカヘソ"], ["favorite", "お気に入り"]],
    slot: [["all", "すべて"], ["popular", "人気"], ["new", "新台"], ["smart", "スマスロ"], ["juggler", "Aタイプ"], ["high-coin", "高コイン単価"], ["favorite", "お気に入り"]],
    all: [["all", "すべて"], ["popular", "人気"], ["new", "新台"], ["pachinko", "パチンコ"], ["slot", "スロット"], ["favorite", "お気に入り"]]
  };
  const filterGroup = tools?.querySelector('[role="group"]');
  if (filterGroup) {
    filterGroup.innerHTML = filterSets[fixedType || "all"].map(([value, label], index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-machine-hub-filter="${value}" aria-pressed="${index === 0}">${label}</button>`).join("");
  }
  if (tools && !document.getElementById("machineHubSort")) {
    const sortLabel = document.createElement("label");
    sortLabel.className = "machine-hub-sort";
    sortLabel.innerHTML = `<span>並び替え</span><select id="machineHubSort"><option value="recommended">おすすめ順</option><option value="newest">導入が新しい順</option><option value="name">名前順</option><option value="light">初当りが軽い順</option></select>`;
    tools.insertBefore(sortLabel, status);
  }

  let memory = null;
  if (mode === "machines" && tools) {
    memory = document.createElement("section");
    memory.className = "machine-hub-memory";
    memory.hidden = true;
    memory.innerHTML = `<section class="machine-hub-shelf" data-machine-shelf="favorites" hidden><div><span>FAVORITES</span><h2>お気に入り</h2></div><div class="machine-hub-shelf-list"></div></section><section class="machine-hub-shelf" data-machine-shelf="recent" hidden><div><span>RECENT</span><h2>最近見た台</h2></div><div class="machine-hub-shelf-list"></div></section>`;
    tools.before(memory);
  }
  function renderShelf(kind, slugs) {
    if (!memory) return false;
    const shelf = memory.querySelector(`[data-machine-shelf="${kind}"]`);
    const list = slugs.map(slug => machineMap[slug]).filter(machine => machine && (!fixedType || machine.type === fixedType)).slice(0, 8);
    shelf.hidden = list.length === 0;
    shelf.querySelector(".machine-hub-shelf-list").innerHTML = list.map(machine => `<a href="${destination(machine)}"><span>${machine.type === "slot" ? "SLOT" : "PACHINKO"}</span><strong>${escapeHtml(machine.shortName)}</strong><small>${escapeHtml(averageLabel(machine))}</small></a>`).join("");
    return list.length > 0;
  }
  function renderMemory() {
    if (!memory) return;
    memory.hidden = !(renderShelf("favorites", favorites()) || renderShelf("recent", recentSlugs()));
  }

  function render() {
    const query = String(search?.value || "").trim().toLocaleLowerCase("ja");
    const favoriteSlugs = favorites();
    const output = sortedMachines(machines.filter(machine => {
      if (!matchesFilter(machine)) return false;
      if (!query) return true;
      return [machine.name, machine.shortName, machine.maker, machine.catchcopy, ...machineTags(machine)].some(value => String(value || "").toLocaleLowerCase("ja").includes(query));
    }));
    grid.innerHTML = output.map(machine => {
      const action = mode === "rankings" ? "ランキングを見る" : "この台で遊ぶ";
      const isFavorite = favoriteSlugs.includes(machine.slug);
      const tags = machineTags(machine);
      return `<article class="machine-hub-item">
        <a class="machine-hub-card is-${machine.type} theme-${escapeHtml(machine.theme || "aqua")}" href="${destination(machine)}">
          <div class="machine-hub-card-visual"><span>${machine.type === "slot" ? "SLOT" : "PACHINKO"}</span><em aria-hidden="true">${machine.type === "slot" ? "S" : "P"}</em><b>${escapeHtml(machine.shortName)}</b></div>
          <div class="machine-hub-card-body"><small>${escapeHtml(machine.year || "PICK UP")}・${escapeHtml(machine.maker || "")}</small><strong>${escapeHtml(machine.shortName)}</strong>${tags.length ? `<div class="machine-hub-badges">${tags.map(tag => `<i>${escapeHtml(tag)}</i>`).join("")}</div>` : ""}<p>${escapeHtml(machine.catchcopy || "機種情報とシミュレーション")}</p><div><b>${escapeHtml(averageLabel(machine))}</b><b>${escapeHtml(subLabel(machine))}</b></div><span>${action} ›</span></div>
        </a>
        <button class="machine-hub-favorite" type="button" data-favorite-slug="${escapeHtml(machine.slug)}" aria-pressed="${isFavorite}" aria-label="${escapeHtml(machine.shortName)}を${isFavorite ? "お気に入りから外す" : "お気に入りに追加"}">${isFavorite ? "★" : "☆"}</button>
      </article>`;
    }).join("");
    const sortLabels = { recommended: "おすすめ順", newest: "新しい順", name: "名前順", light: "初当り順" };
    status.textContent = `${output.length}台を表示・${sortLabels[sort]}`;
    document.getElementById("machineHubEmpty").hidden = output.length > 0;
    renderMemory();
  }

  tools?.addEventListener("click", event => {
    const button = event.target.closest("[data-machine-hub-filter]");
    if (!button) return;
    filter = button.dataset.machineHubFilter === "all" && fixedType ? fixedType : button.dataset.machineHubFilter;
    tools.querySelectorAll("[data-machine-hub-filter]").forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    render();
  });
  grid?.addEventListener("click", event => {
    const button = event.target.closest("[data-favorite-slug]");
    if (!button) return;
    const slug = button.dataset.favoriteSlug;
    const current = favorites();
    writeFavorites(current.includes(slug) ? current.filter(item => item !== slug) : [slug, ...current]);
    render();
  });
  search?.addEventListener("input", render);
  document.getElementById("machineHubSort")?.addEventListener("change", event => { sort = event.target.value; render(); });
  window.addEventListener("storage", event => { if ([FAVORITES_KEY, RECENT_KEY].includes(event.key)) render(); });
  render();
})();
