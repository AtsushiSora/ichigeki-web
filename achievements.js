(() => {
  const UNLOCKED_KEY = "ichigekiAchievementUnlocksV1";
  const SELECTED_KEY = "ichigekiSelectedTitleV1";
  const FALLBACK_MACHINE_COUNT = 33;

  const definitions = [
    { id: "first-play", mark: "一", name: "はじめの一撃", description: "初めてシミュレーションを遊ぶ", metric: "count", target: 1 },
    { id: "rush-entry", mark: "R", name: "RUSH突入", description: "初めてRUSH・ATへ突入する", metric: "entered", target: 1 },
    { id: "upper-entry", mark: "上", name: "上位への扉", description: "初めて上位RUSH・上位ATへ到達する", metric: "upper", target: 1 },
    { id: "rookie", mark: "10", name: "駆け出しプレイヤー", description: "合計10回プレイする", metric: "count", target: 10 },
    { id: "winner", mark: "勝", name: "勝負師", description: "収支プラスを10回達成する", metric: "wins", target: 10 },
    { id: "big-win", mark: "¥", name: "大逆転", description: "1回の収支で＋5万円を達成する", metric: "bestBalance", target: 50000, unit: "円" },
    { id: "machine-master", mark: "極", name: "機種マスター", description: "同じ機種を30回プレイする", metric: "maxMachine", target: 30 },
    { id: "pachinko-master", mark: "P", name: "パチンコマスター", description: "パチンコを50回プレイする", metric: "pachinko", target: 50 },
    { id: "slot-master", mark: "S", name: "スロットマスター", description: "スロットを50回プレイする", metric: "slot", target: 50 },
    { id: "veteran", mark: "100", name: "百戦錬磨", description: "合計100回プレイする", metric: "count", target: 100 },
    { id: "complete", mark: "完", name: "限界突破", description: "スロットでコンプリートを達成する", metric: "complete", target: 1 },
    { id: "all-machines", mark: "全", name: "全機種制覇", description: "掲載中の全機種を1回以上遊ぶ", metric: "distinctMachines", target: metrics => metrics.totalMachines }
  ];

  function readArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch { return []; }
  }

  function writeArray(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function buildMetrics(records = []) {
    const safeRecords = Array.isArray(records) ? records : [];
    const machineCounts = new Map();
    safeRecords.forEach(record => {
      if (!record?.slug) return;
      machineCounts.set(record.slug, (machineCounts.get(record.slug) || 0) + 1);
    });
    const libraryCount = Object.keys(window.ICHIGEKI_MACHINES || {}).length;
    return {
      count: safeRecords.length,
      wins: safeRecords.filter(record => Number(record.balanceYen) > 0).length,
      bestBalance: Math.max(0, ...safeRecords.map(record => Number(record.balanceYen) || 0)),
      entered: safeRecords.filter(record => record.entered).length,
      upper: safeRecords.filter(record => record.upper).length,
      complete: safeRecords.filter(record => record.complete).length,
      pachinko: safeRecords.filter(record => record.type !== "slot").length,
      slot: safeRecords.filter(record => record.type === "slot").length,
      maxMachine: Math.max(0, ...machineCounts.values()),
      distinctMachines: machineCounts.size,
      totalMachines: libraryCount ? libraryCount + (window.ICHIGEKI_MACHINES["gundam-unicorn"] ? 0 : 1) : FALLBACK_MACHINE_COUNT
    };
  }

  function achievementValue(definition, metrics) {
    return Number(metrics[definition.metric]) || 0;
  }

  function achievementTarget(definition, metrics) {
    return typeof definition.target === "function" ? Number(definition.target(metrics)) : Number(definition.target);
  }

  function evaluate(records = []) {
    const metrics = buildMetrics(records);
    const persisted = new Set(readArray(UNLOCKED_KEY));
    const items = definitions.map(definition => {
      const value = achievementValue(definition, metrics);
      const target = achievementTarget(definition, metrics);
      const qualified = value >= target;
      return { ...definition, value, target, qualified, unlocked: qualified || persisted.has(definition.id), progress: Math.min(100, Math.round(value / Math.max(1, target) * 100)) };
    });
    return { metrics, items };
  }

  function sync(records = []) {
    const previous = new Set(readArray(UNLOCKED_KEY));
    const state = evaluate(records);
    const newlyUnlocked = state.items.filter(item => item.qualified && !previous.has(item.id));
    const unlockedIds = state.items.filter(item => item.unlocked).map(item => item.id);
    writeArray(UNLOCKED_KEY, unlockedIds);
    let selectedId = "";
    try { selectedId = localStorage.getItem(SELECTED_KEY) || ""; } catch {}
    if (!unlockedIds.includes(selectedId)) {
      selectedId = unlockedIds[unlockedIds.length - 1] || "";
      try {
        if (selectedId) localStorage.setItem(SELECTED_KEY, selectedId);
        else localStorage.removeItem(SELECTED_KEY);
      } catch {}
    }
    const selected = state.items.find(item => item.id === selectedId) || null;
    const next = state.items.filter(item => !item.unlocked).sort((a, b) => b.progress - a.progress || a.target - b.target)[0] || null;
    return { ...state, newlyUnlocked, selected, next };
  }

  function select(id, records = []) {
    const state = evaluate(records);
    const item = state.items.find(entry => entry.id === id && entry.unlocked);
    if (!item) return null;
    try { localStorage.setItem(SELECTED_KEY, id); } catch {}
    return item;
  }

  window.ICHIGEKI_ACHIEVEMENTS = { definitions, evaluate, sync, select };
})();
