(() => {
  const machines = Object.entries(window.ICHIGEKI_MACHINES || {})
    .map(([slug, machine]) => ({ slug, ...machine }))
    .filter(machine => machine.slug && machine.shortName && machine.sim)
    .sort((a, b) => Number(a.order || 999) - Number(b.order || 999) || a.shortName.localeCompare(b.shortName, "ja"));
  const mode = document.body.dataset.hubMode === "rankings" ? "rankings" : "machines";
  const grid = document.getElementById("machineHubGrid");
  const search = document.getElementById("machineHubSearch");
  const status = document.getElementById("machineHubStatus");
  let filter = "all";

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  const averageLabel = machine => machine.type === "slot"
    ? `平均${Number(machine.sim.mainRate || machine.sim.triggerRate || 0).toLocaleString("ja-JP")}G`
    : `平均${Number(machine.sim.hitRate || 0).toLocaleString("ja-JP")}回転`;
  const subLabel = machine => machine.type === "slot"
    ? `コイン単価 ${Number(machine.sim.coinUnit || 0).toFixed(1)}円`
    : String(machine.sim.startType || "通常ヘソ");

  function render() {
    const query = String(search?.value || "").trim().toLocaleLowerCase("ja");
    const output = machines.filter(machine => {
      if (filter === "slot" && machine.type !== "slot") return false;
      if (filter === "pachinko" && machine.type !== "pachinko") return false;
      if (filter === "new" && !String(machine.year || "").includes("2026")) return false;
      if (!query) return true;
      return [machine.name, machine.shortName, machine.maker, machine.catchcopy].some(value => String(value || "").toLocaleLowerCase("ja").includes(query));
    });
    grid.innerHTML = output.map((machine, index) => {
      const destination = `${encodeURIComponent(machine.slug)}.html${mode === "rankings" ? "#machineRanking" : "#simulator"}`;
      const action = mode === "rankings" ? "ランキングを見る" : "この台で遊ぶ";
      return `<a class="machine-hub-card is-${machine.type}" href="${destination}">
        <div class="machine-hub-card-visual"><span>${machine.type === "slot" ? "SLOT" : "PACHINKO"}</span><b>${String(index + 1).padStart(2, "0")}</b></div>
        <div class="machine-hub-card-body"><small>${escapeHtml(machine.year || "PICK UP")}・${escapeHtml(machine.maker || "")}</small><strong>${escapeHtml(machine.shortName)}</strong><p>${escapeHtml(machine.catchcopy || "機種情報とシミュレーション")}</p><div><b>${escapeHtml(averageLabel(machine))}</b><b>${escapeHtml(subLabel(machine))}</b></div><span>${action} ›</span></div>
      </a>`;
    }).join("");
    status.textContent = `${output.length}台を表示`;
    document.getElementById("machineHubEmpty").hidden = output.length > 0;
  }

  document.querySelectorAll("[data-machine-hub-filter]").forEach(button => {
    button.addEventListener("click", () => {
      filter = button.dataset.machineHubFilter;
      document.querySelectorAll("[data-machine-hub-filter]").forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      render();
    });
  });
  search?.addEventListener("input", render);
  render();
})();
