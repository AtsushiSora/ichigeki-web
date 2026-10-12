(() => {
  const OLD_RANKING_CLEANUP_KEY = "ichigekiOldRankingCleanupV1";

  function removeOldRankings() {
    try {
      if (localStorage.getItem(OLD_RANKING_CLEANUP_KEY)) return;
      localStorage.removeItem("ichigekiLocalRecordsV1");
      Object.keys(localStorage).forEach(key => {
        if (/^ichigekiMachineRankingV[12]:/.test(key)) {
          localStorage.removeItem(key);
          return;
        }
        const match = key.match(/^ichigekiMachineRankingV3:(.+)--fixed-rate-v1$/);
        if (match && window.ICHIGEKI_MACHINES?.[match[1]]?.type === "slot") localStorage.removeItem(key);
      });
      localStorage.setItem(OLD_RANKING_CLEANUP_KEY, new Date().toISOString());
    } catch {}
  }

  removeOldRankings();

  const body = document.body;
  const isMachinePage = body.classList.contains("machine-library-page") || body.classList.contains("unicorn-page");
  const isCommunityPage = body.classList.contains("community-page");
  const isRecordsPage = body.classList.contains("my-records-page");

  if ((!isMachinePage && !isCommunityPage && !isRecordsPage) || document.querySelector(".mobile-app-bottom-nav")) return;

  const machineSlug = body.dataset.machine || (body.classList.contains("unicorn-page") ? "gundam-unicorn" : "");
  const currentSimulatorLink = () => {
    if (isMachinePage) return "#simulator";
    return document.getElementById("machineSimulatorLink")?.getAttribute("href") || "index.html#popularMachines";
  };

  const items = [
    { key: "home", icon: "⌂", label: "ホーム", href: "index.html#appHome" },
    { key: "search", icon: "⌕", label: "機種検索", href: "index.html#mobileMachineSearch" },
    { key: "simulator", icon: "▷", label: "シミュ", href: currentSimulatorLink() },
    {
      key: "post",
      icon: "□",
      label: "投稿",
      href: isMachinePage && machineSlug ? `community.html?machine=${encodeURIComponent(machineSlug)}#composerTitle` : "community.html#composerTitle"
    },
    { key: "records", icon: "▥", label: "マイ記録", href: "ranking.html" }
  ];

  const activeKey = isCommunityPage ? "post" : isRecordsPage ? "records" : "simulator";
  const nav = document.createElement("nav");
  nav.className = "mobile-app-bottom-nav mobile-app-bottom-nav-shared";
  nav.setAttribute("aria-label", "アプリメニュー");

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = item.href;
    link.dataset.appNav = item.key;
    if (item.key === activeKey) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }

    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = item.icon;
    const label = document.createElement("b");
    label.textContent = item.label;
    link.append(icon, label);
    nav.append(link);
  });

  body.classList.add("has-mobile-app-nav");
  body.append(nav);

  if (isCommunityPage) {
    const machineFilter = document.getElementById("machineFilter");
    const syncSimulatorLink = () => {
      const link = nav.querySelector('[data-app-nav="simulator"]');
      if (link) link.href = currentSimulatorLink();
    };
    machineFilter?.addEventListener("change", syncSimulatorLink);
    syncSimulatorLink();
  }
})();
