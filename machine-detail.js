(function () {
  const slug = document.body.dataset.machine;
  const machines = window.ICHIGEKI_MACHINES || {};
  const machine = machines[slug];
  const app = document.getElementById("machineApp");
  if (!machine || !app) return;
  const availability = window.ICHIGEKI_MACHINE_AVAILABILITY || { isReady: () => true, label: () => "" };
  const machineReady = availability.isReady(machine);
  const availabilityLabel = availability.label(machine);
  document.body.classList.toggle("machine-is-preparing", !machineReady);
  const arcadePachinkoFlow = machine.sim.kind === "pachinko";
  const pachinkoModeText = [
    machine.name,
    machine.shortName,
    machine.catchcopy,
    machine.intro,
    ...(machine.points || []),
    ...(machine.specs || []).flat()
  ].join(" ");
  const isLtPachinko = machine.type === "pachinko" && (Boolean(machine.sim.upperLabel) || /LT|ラッキートリガー/i.test(pachinkoModeText));
  const gameExperienceMode = machine.sim.kind === "juggler"
    ? "atype"
    : machine.type === "slot"
      ? "slot-at"
      : isLtPachinko
        ? "pachinko-lt"
        : "pachinko-st";
  document.body.classList.add(`machine-type-${machine.type}`);

  const RECENT_MACHINES_KEY = "ichigekiRecentMachinesV1";
  const FAVORITE_MACHINES_KEY = "ichigekiFavoriteMachinesV1";
  const MACHINE_HISTORY_KEY = "ichigekiMachineHistoryV1";
  const MACHINE_HISTORY_LIMIT = 500;
  function readMachineList(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch { return []; }
  }
  function writeMachineList(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }
  const recentMachines = readMachineList(RECENT_MACHINES_KEY).filter(item => item?.slug !== slug);
  recentMachines.unshift({ slug, visitedAt: new Date().toISOString() });
  writeMachineList(RECENT_MACHINES_KEY, recentMachines.slice(0, 12));

  const yen = new Intl.NumberFormat("ja-JP");
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  const initialHitName = label => /初当り|初当たり/.test(String(label || "")) ? String(label) : `${label}初当り`;
  const contentUpdateDate = "2026-11-02";
  const editorialUpdated = machine.updated && machine.updated > contentUpdateDate ? machine.updated : contentUpdateDate;
  const [editorialYear, editorialMonth, editorialDay] = editorialUpdated.split("-").map(Number);
  const editorialUpdatedLabel = `${editorialYear}年${editorialMonth}月${editorialDay}日`;
  const ordered = Object.entries(machines).sort((a, b) => a[1].order - b[1].order);
  let latestResult = null;
  let rankingClient = null;
  let rankingMode = "local";
  let rankingUserId = null;
  let rankingOwnRecord = null;
  let rankingReadyPromise = null;
  let rankingTicketId = null;
  let rankingTicketPromise = null;
  const defaultSlotSettingPool = [1, 2, 3, 4, 5, 6];
  const slotSettingPool = Array.isArray(machine.sim.settingPool) && machine.sim.settingPool.length
    ? machine.sim.settingPool.filter(setting => defaultSlotSettingPool.includes(Number(setting))).map(Number)
    : defaultSlotSettingPool;
  const usesAllSlotSettings = slotSettingPool.length === 6 && defaultSlotSettingPool.every(setting => slotSettingPool.includes(setting));
  const slotSettingNumberLabel = usesAllSlotSettings ? "1〜6" : slotSettingPool.join("・");
  const slotSettingLabel = `設定${slotSettingNumberLabel}`;
  const slotBaselineSetting = slotSettingPool[0] || 1;
  const slotRankingVersion = machine.sim.rankingVersion || (machine.sim.kind !== "juggler" && machine.sim.settingRates ? "v3" : "v2");
  const rankingMachineSlug = machine.type === "slot" ? `${slug}--random-setting-${slotRankingVersion}` : `${slug}--fixed-rate-v2-actual-payout`;
  const RANKING_COOLDOWN_MS = 8000;
  const SLOT_COMPLETE_LIMIT = 19000;
  const RANKING_RATE = {
    pachinko: { lendBalls: 250, exchangeBalls: 28 },
    slot: { lendCoins: 46, exchangeCoins: 5.2 }
  };
  const NOVEMBER_NEW_MACHINE_SLUGS = new Set([
    "toaru3-pachinko",
    "kamen-rider-black-light",
    "granbelm-319",
    "fever-yokai-watch",
    "juoh-shishi-no-ichigeki",
    "no-game-no-life-119",
    "garo-yami-slot",
    "seiya-ougon-slot",
    "ggo-slot",
    "godzilla-eva2-slot"
  ]);
  const DECEMBER_NEW_MACHINE_SLUGS = new Set([
    "shangri-la-frontier",
    "sao-phantom-bullet"
  ]);
  const SLOT_SETTING_PROFILES = {
    1: { rate: 1, entry: 0, special: 0, upper: 0, big: 1, reg: 1, payout: 0 },
    2: { rate: 0.97, entry: 0.01, special: 0.005, upper: 0.005, big: 0.99, reg: 0.94, payout: 0.007 },
    3: { rate: 0.93, entry: 0.02, special: 0.01, upper: 0.01, big: 0.98, reg: 0.87, payout: 0.014 },
    4: { rate: 0.88, entry: 0.035, special: 0.02, upper: 0.02, big: 0.96, reg: 0.80, payout: 0.028 },
    5: { rate: 0.82, entry: 0.05, special: 0.03, upper: 0.03, big: 0.94, reg: 0.73, payout: 0.045 },
    6: { rate: 0.76, entry: 0.07, special: 0.04, upper: 0.04, big: 0.91, reg: 0.66, payout: 0.065 }
  };
  let experienceRunId = 0;
  let experienceSkipped = false;
  let experienceDelayTimer = null;
  let experienceDelayResolve = null;
  let experienceActionTimer = null;
  let experienceActionResolve = null;
  let experienceReturnFocus = null;
  let aTypeSession = null;
  let aTypeBusy = false;
  let machinePlaySession = null;
  const EXPERIENCE_SOUND_KEY = "ichigekiExperienceSoundV1";
  let experienceSoundEnabled = localStorage.getItem(EXPERIENCE_SOUND_KEY) === "on";
  let experienceAudioContext = null;
  const experienceProfiles = {
    "valvrave2": { key: "revolution", system: "REVOLUTION SYSTEM", cue: "革命警報" },
    "valvrave": { key: "revolution", system: "REVOLUTION SYSTEM", cue: "革命警報" },
    "tokyo-ghoul-slot": { key: "kagune", system: "KAGUNE SYSTEM", cue: "赫眼警報" },
    "tokyo-ghoul-e": { key: "kagune", system: "KAGUNE SYSTEM", cue: "赫眼警報" },
    "eva15": { key: "emergency", system: "MAGI SYSTEM", cue: "EMERGENCY" },
    "eva17-hajimari": { key: "emergency", system: "MAGI SYSTEM", cue: "EMERGENCY" },
    "smart-hokuto": { key: "battle", system: "BATTLE SYSTEM", cue: "強敵出現" },
    "karakuri-circus": { key: "fate", system: "FATE SYSTEM", cue: "運命の一劇" },
    "monkey-turn-v": { key: "race", system: "SG RACE SYSTEM", cue: "優出モード" },
    "kabaneri": { key: "steam", system: "STEAM SYSTEM", cue: "生駒覚醒" },
    "kabaneri-unato": { key: "steam", system: "STEAM SYSTEM", cue: "海門決戦" },
    "my-juggler6": { key: "juggler", system: "GOGO! CHANCE", cue: "GOGO!ランプ" }
  };
  const experienceProfile = experienceProfiles[slug] || { key: machine.type === "slot" ? "slot" : "pachinko", system: machine.type === "slot" ? "AT LINK SYSTEM" : "FEVER LINK SYSTEM", cue: machine.shortName };

  function randomInt(min, max) { return Math.round((min + Math.random() * (max - min)) / 10) * 10; }
  function slotAwardForGames(games, pureIncrease, variance = 0.16) {
    const playedGames = Math.max(1, Number(games) || 1);
    const netPerGame = Math.max(0.1, Number(pureIncrease) || 1);
    const spread = Math.max(0, Math.min(0.35, Number(variance) || 0));
    // Pure increase is a long-run average. Two random samples keep most results
    // near the published value while still allowing natural short-run variance.
    const centeredRandom = (Math.random() + Math.random()) - 1;
    return Math.max(0, Math.round(playedGames * netPerGame * (1 + centeredRandom * spread)));
  }
  function actualPachinkoAward(displayedAward) {
    const displayed = Math.max(0, Math.round(Number(displayedAward) || 0));
    if (!displayed) return 0;
    const equivalentRounds = Math.max(1, Math.round(displayed / 150));
    const baseActual = displayed * 14 / 15;
    const estimatedPrize = Math.max(2, Math.min(15, displayed / equivalentRounds / 10));
    const overEntryNet = Math.max(1, estimatedPrize - 1);
    const overEntryChance = 0.25;
    const wasteTrialsPerRound = 7;
    const wasteChance = Math.min(0.9, overEntryNet * overEntryChance / wasteTrialsPerRound);
    let variation = 0;
    for (let round = 0; round < equivalentRounds; round += 1) {
      for (let shot = 0; shot < wasteTrialsPerRound; shot += 1) {
        if (Math.random() < wasteChance) variation -= 1;
      }
      if (Math.random() < overEntryChance) variation += overEntryNet;
    }
    return Math.max(0, Math.round(baseActual + variation));
  }
  function pachinkoRoundLabel(displayedAward) {
    const award = Math.max(0, Math.round(Number(displayedAward) || 0));
    if (!award) return "出玉なし";
    const equivalentRounds = Math.max(1, Math.round(award / 150));
    if (award % 150 !== 0) return `約${equivalentRounds}R相当`;
    if (equivalentRounds > 10 && equivalentRounds % 10 === 0) return `10R×${equivalentRounds / 10}`;
    return `${equivalentRounds}R`;
  }
  function geometric(rate) {
    const probability = 1 / rate;
    return Math.max(1, Math.ceil(Math.log(1 - Math.random()) / Math.log(1 - probability)));
  }
  function pachinkoRushGameModel(sim) {
    const specs = Array.isArray(machine.specs) ? machine.specs : [];
    const rateSpec = specs.find(([label, value]) => /RUSH中|RUSH図柄|ST中|右打ち中/.test(label) && /1\s*\/\s*[\d.]+/.test(value));
    const rate = Number(String(rateSpec?.[1] || "").match(/1\s*\/\s*([\d.]+)/)?.[1]) || 0;
    const gameSpec = specs.find(([label]) => /ST回数|RUSH回数|電サポ/.test(label));
    const gameText = String(gameSpec?.[1] || "");
    const gameNumbers = [...gameText.matchAll(/\d+(?:\.\d+)?/g)].map(match => Number(match[0])).filter(Number.isFinite);
    let games = gameText.includes("＋") ? gameNumbers.reduce((sum, value) => sum + value, 0) : Math.max(0, ...gameNumbers);
    const continuation = Math.max(.01, Math.min(.995, Number(sim.rushContinue) || .7));
    if (!games && rate) games = Math.log(1 - continuation) / Math.log(1 - 1 / rate);
    games = Math.max(10, Math.min(200, Math.round(games || 100)));
    const derivedRate = 1 / (1 - Math.pow(1 - continuation, 1 / games));
    return { rate: Math.max(1.01, rate || derivedRate), games };
  }
  function conditionalRushGame(rate, maxGames, success) {
    if (!success) return maxGames;
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const game = geometric(rate);
      if (game <= maxGames) return game;
    }
    return Math.max(1, Math.round(maxGames * .55));
  }
  function weighted(items) {
    const roll = Math.random();
    let total = 0;
    for (const [value, weight] of items) { total += weight; if (roll <= total) return value; }
    return items[items.length - 1][0];
  }
  function rushSetGamesForSetting(sim, setting) {
    const longRate = Number(sim.rushSetLongRateBySetting?.[setting]);
    if (!Number.isFinite(longRate)) return sim.rushSetGames || [[10, 1]];
    const clampedLongRate = Math.max(0, Math.min(1, longRate));
    const hundredShare = Math.max(0, Math.min(1, Number(sim.rushSet100Share) || .25));
    const twentyShare = Math.max(0, Math.min(1, Number(sim.rushSet20Share) || .25));
    return [
      [10, (1 - clampedLongRate) * (1 - twentyShare)],
      [20, (1 - clampedLongRate) * twentyShare],
      [50, clampedLongRate * (1 - hundredShare)],
      [100, clampedLongRate * hundredShare]
    ];
  }
  function riskLabel(value) {
    if (value >= 4) return "超高波";
    if (value >= 3.5) return "高波";
    if (value >= 3) return "中波";
    return "比較的穏やか";
  }
  function randomSlotSetting() { return slotSettingPool[Math.floor(Math.random() * slotSettingPool.length)]; }
  function settingProfile(setting) { return SLOT_SETTING_PROFILES[setting] || SLOT_SETTING_PROFILES[1]; }
  function recordSetting(record) {
    const direct = Number(record?.setting);
    if (direct >= 1 && direct <= 6) return direct;
    const match = `${record?.title || ""} ${record?.summary || ""}`.match(/設定\s*([1-6])/);
    return match ? Number(match[1]) : 0;
  }

  function controlMarkup() {
    if (machine.sim.kind === "pachinko") {
      return `<div class="machine-fixed-rate-label"><span>FIXED PLAY RATE</span><strong>実店舗向け固定条件</strong></div><div class="machine-control-grid machine-rate-controls"><label class="machine-control"><span>1,000円あたり回転数</span><input id="playRate" type="number" value="${machine.sim.spinsPer1k}" disabled><small>${machine.sim.startType}の機種別固定値</small></label><label class="machine-control"><span>1,000円の貸玉数</span><input id="lendBalls" type="number" value="250" disabled><small>4円パチンコ・250玉貸し</small></label><label class="machine-control"><span>交換率（100円）</span><input id="exchangeBalls" type="number" value="28" disabled><small>28玉交換で固定</small></label></div>`;
    }
    if (machine.sim.kind === "juggler") {
      return `<div class="machine-fixed-rate-label"><span>NEXT BONUS / MAX 8,000G</span><strong>ボーナスごとに続行判断・最大8,000G</strong></div><div class="machine-control-grid machine-rate-controls"><label class="machine-control"><span>設定抽選</span><input type="text" value="設定1〜6" disabled><small>開始時に均等抽選・終了時に発表</small></label><label class="machine-control"><span>上限ゲーム数</span><input id="jugglerGames" type="number" value="${machine.sim.games}" disabled><small>8,000G到達で自動終了</small></label><label class="machine-control"><span>1,000円の貸メダル</span><input id="lendCoins" type="number" value="46" disabled><small>46枚貸しで固定</small></label><label class="machine-control"><span>交換率（100円）</span><input id="exchangeCoins" type="number" value="5.2" disabled><small>5.2枚交換で固定</small></label><label class="machine-control"><span>50枚あたりゲーム数</span><input id="baseRate" type="number" value="${machine.sim.base50}" disabled><small>機種別ベースで固定</small></label></div>`;
    }
    return `<div class="machine-fixed-rate-label"><span>RANDOM SETTING PLAY</span><strong>${slotSettingLabel}を開始時に均等抽選</strong></div><div class="machine-control-grid machine-rate-controls"><label class="machine-control"><span>設定抽選</span><input type="text" value="${slotSettingLabel}" disabled><small>実機搭載設定のみ・結果で発表</small></label><label class="machine-control"><span>50枚あたりゲーム数</span><input id="baseRate" type="number" value="${machine.sim.base50}" disabled><small>機種別ベースで固定</small></label><label class="machine-control"><span>1,000円の貸メダル</span><input id="lendCoins" type="number" value="46" disabled><small>46枚貸しで固定</small></label><label class="machine-control"><span>交換率（100円）</span><input id="exchangeCoins" type="number" value="5.2" disabled><small>5.2枚交換で固定</small></label><label class="machine-control"><span>コイン単価</span><input id="coinUnit" type="number" value="${machine.sim.coinUnit}" disabled><small>機種別の荒さ指標</small></label></div>`;
  }

  function simulationLabels() {
    if (machine.sim.kind === "pachinko") return [machine.sim.hitLabel, machine.sim.rushLabel, "総出玉"];
    if (machine.sim.kind === "juggler") return ["次のボーナス", "続ける・やめる", "最終結果"];
    return [...new Set([machine.sim.triggerLabel, machine.sim.mainLabel, machine.sim.upperLabel].filter(Boolean))];
  }

  function calculationMarkup() {
    const sim = machine.sim;
    if (sim.kind === "pachinko") {
      const averageInvestment = Math.round((sim.hitRate / sim.spinsPer1k * 1000) / 100) * 100;
      return `<section class="machine-article-section"><h3>平均回転と投資目安の計算</h3><p>通常時の${sim.hitLabel}確率は約1/${sim.hitRate}です。1,000円あたり${sim.spinsPer1k}回転という機種別固定条件を使い、平均投資目安を「${sim.hitRate} ÷ ${sim.spinsPer1k} × 1,000円」で計算します。この条件では約${yen.format(averageInvestment)}円が目安です。</p><p>${sim.startType}、250玉貸し・28玉交換で固定し、${sim.rushLabel}突入率${(sim.rushEntry * 100).toFixed(1).replace(".0", "")}%と継続率${(sim.rushContinue * 100).toFixed(1).replace(".0", "")}%を簡易抽選します。表記出玉とは別に、大当り中の打ち出しとオーバー入賞をラウンド相当数ごとに簡易計算した実獲得出玉を収支へ使用します。平均値は長期間の理論上の目安であり、1回ごとの結果や実際の遊技収支を保証しません。</p></section>`;
    }
    if (sim.kind === "juggler") return "";
    const gamesPerThousand = sim.base50 * RANKING_RATE.slot.lendCoins / 50;
    const averageInvestment = Math.round((sim.mainRate / gamesPerThousand * 1000) / 100) * 100;
    const settingModelText = sim.settingRates
      ? `${slotSettingLabel}で公開されている初当り値を個別に使い、公開されていない特化・上位の設定差は加えません。`
      : "設定別の数値が揃わないため、設定1基準値へサイト共通の固定補正を加える体験用モデルです。";
    const initialHitLabel = sim.mainRateLabel || (machine.initialHitLabel ? "ボーナス" : sim.mainLabel);
    return `<section class="machine-article-section"><h3>平均Gと投資目安の計算</h3><p>${initialHitName(initialHitLabel)}の目安は約1/${sim.mainRate}です。50枚あたり${sim.base50}G、1,000円46枚貸しの固定条件から、1,000円で回せるゲーム数を約${gamesPerThousand.toFixed(1)}Gとして計算します。この条件では約${yen.format(averageInvestment)}円が平均投資の目安です。</p><p>${settingModelText} コイン単価${sim.coinUnit}円は出玉の荒さを比べる指標で、現金投資額そのものではありません。換金は5.2枚交換で固定しています。</p></section>`;
  }

  function snapshotMarkup() {
    const sim = machine.sim;
    let items;
    let note;
    if (sim.kind === "pachinko") {
      const averageInvestment = Math.round((sim.hitRate / sim.spinsPer1k * 1000) / 100) * 100;
      items = [
        ["初当り", `約1/${sim.hitRate}`, `${sim.hitLabel}までの確率`],
        ["平均投資", `約${yen.format(averageInvestment)}円`, `${sim.spinsPer1k}回/1,000円で計算`],
        ["RUSH突入", `${(sim.rushEntry * 100).toFixed(1).replace(".0", "")}%`, sim.rushLabel],
        ["RUSH継続", `${(sim.rushContinue * 100).toFixed(1).replace(".0", "")}%`, sim.upperLabel ? `${sim.upperLabel}は別抽選` : "継続抽選の基準"]
      ];
      note = `結果では表記出玉と実獲得出玉を分け、250玉貸し・28玉交換の固定条件で差玉と収支を計算します。`;
    } else if (sim.kind === "juggler") {
      items = [
        ["遊技上限", `${yen.format(sim.games)}G`, "続行・終了を選択"],
        ["BIG", `約1/${sim.bigRate}`, "設定1の基準値"],
        ["REG", `約1/${sim.regRate}`, "設定1の基準値"],
        ["設定抽選", slotSettingLabel, "開始時に均等抽選"]
      ];
      note = `ボーナスごとに続行を選び、終了時に設定・BIG回数・REG回数・差枚・収支をまとめて確認できます。`;
    } else if (sim.uminchuFlow) {
      charts.push(ratioChartMarkup(
        "BONUS MIX",
        "設定1基準のBONUS内訳",
        [["BIG", 1 / sim.uminchuBigRate], ["REG", 1 / sim.uminchuRegRate]],
        "合算 1/113.0",
        "公開されている設定1のBIG約1/141.2・REG約1/642.5から算出した当選内訳です。"
      ));
      charts.push(ratioChartMarkup(
        "POST IREGUI",
        "IREGUIストック後の32G連",
        [["継続", sim.uminchuPostIreguiContinue], ["終了", 1 - sim.uminchuPostIreguiContinue]],
        `約${percent(sim.uminchuPostIreguiContinue)}`,
        "IREGUIのストックを使い切った後、32G以内にBONUSへ当選する公表期待度です。"
      ));
      note = "BONUS内訳は設定1の公表確率から計算し、IREGUI後の継続割合とは別に表示しています。10連到達前の自力継続率は非公表のため円グラフには含めていません。";
    } else {
      const gamesPerThousand = sim.base50 * RANKING_RATE.slot.lendCoins / 50;
      const averageInvestment = Math.round((sim.mainRate / gamesPerThousand * 1000) / 100) * 100;
      const initialHitLabel = sim.mainRateLabel || machine.initialHitLabel || sim.mainLabel;
      items = [
        ["初当り", `約1/${sim.mainRate}`, initialHitLabel],
        ["平均投資", `約${yen.format(averageInvestment)}円`, `設定${slotBaselineSetting}基準`],
        ["コイン単価", `${sim.coinUnit}円`, riskLabel(sim.coinUnit)],
        ["設定抽選", slotSettingLabel, "開始時に均等抽選"]
      ];
      note = `${sim.triggerLabel}から${initialHitLabel}${initialHitLabel !== sim.mainLabel ? `、${sim.mainLabel}` : ""}${sim.upperLabel ? `、${sim.upperLabel}` : ""}までの流れと、設定ごとの結果差を固定レートで比較できます。`;
    }
    return `<section class="machine-snapshot" aria-labelledby="machine-snapshot-title"><div class="machine-snapshot-head"><span>AT A GLANCE</span><h3 id="machine-snapshot-title">${machine.shortName}を数字で早分かり</h3></div><div class="machine-snapshot-grid">${items.map(([label, value, detail]) => `<div><span>${label}</span><strong>${value}</strong><small>${detail}</small></div>`).join("")}</div><p>${note}</p></section>`;
  }

  function percent(value) {
    const numeric = Math.max(0, Number(value) || 0) * 100;
    return `${numeric.toFixed(numeric < 10 && numeric % 1 ? 1 : 0).replace(".0", "")}%`;
  }

  const ratioChartColors = ["#7cf45b", "#65a9ff", "#ffca58", "#d77bff", "#ff728f", "#54d6c1"];

  function ratioChartMarkup(kicker, title, rawSlices, centerLabel, description) {
    const merged = new Map();
    rawSlices.forEach(([label, value]) => {
      const numeric = Math.max(0, Number(value) || 0);
      if (!numeric) return;
      merged.set(label, (merged.get(label) || 0) + numeric);
    });
    const slices = [...merged.entries()];
    const total = slices.reduce((sum, [, value]) => sum + value, 0);
    if (!total) return "";
    let cursor = 0;
    const normalized = slices.map(([label, value], index) => {
      const share = value / total;
      const start = cursor;
      cursor += share * 100;
      return { label, share, start, end: cursor, color: ratioChartColors[index % ratioChartColors.length] };
    });
    const gradient = normalized.map(item => `${item.color} ${item.start.toFixed(3)}% ${item.end.toFixed(3)}%`).join(", ");
    const ariaLabel = normalized.map(item => `${item.label} ${percent(item.share)}`).join("、");
    return `<article class="machine-ratio-card"><div class="machine-ratio-copy"><span>${kicker}</span><h4>${title}</h4><p>${description}</p></div><div class="machine-ratio-visual"><div class="machine-ratio-donut" role="img" aria-label="${escapeHtml(`${title}：${ariaLabel}`)}" style="--machine-ratio-gradient: conic-gradient(${gradient})"><div><strong>${escapeHtml(centerLabel)}</strong><small>内訳</small></div></div><ul>${normalized.map(item => `<li><i style="--machine-ratio-color:${item.color}"></i><span>${escapeHtml(item.label)}</span><strong>${percent(item.share)}</strong></li>`).join("")}</ul></div></article>`;
  }

  function specRatioMarkup() {
    const sim = machine.sim;
    const charts = [];
    let note;
    if (sim.kind === "pachinko") {
      charts.push(ratioChartMarkup(
        "ENTRY",
        `${sim.rushLabel}突入割合`,
        [["突入", sim.rushEntry], ["非突入", 1 - sim.rushEntry]],
        percent(sim.rushEntry),
        `${sim.hitLabel}後に${sim.rushLabel}へ進む割合です。`
      ));
      const payouts = Array.isArray(sim.rushPayouts) ? sim.rushPayouts : [];
      if (payouts.length) {
        charts.push(ratioChartMarkup(
          "PAYOUT",
          "右打ち中の代表出玉",
          payouts.map(([payout, weight]) => [`${yen.format(payout)}玉`, weight]),
          `${payouts.length}種類`,
          "右打ち大当り1回ごとの表記出玉を割合で比較します。"
        ));
      }
      note = "突入割合と出玉振り分けは別々の抽選です。上位移行、時短引き戻し、残保留などは機種本文の補足も合わせて確認してください。";
    } else if (sim.kind === "juggler") {
      const bigChance = 1 / Math.max(1, Number(sim.bigRate) || 1);
      const regChance = 1 / Math.max(1, Number(sim.regRate) || 1);
      charts.push(ratioChartMarkup(
        "BONUS MIX",
        "設定1基準のボーナス内訳",
        [["BIG", bigChance], ["REG", regChance]],
        `合算 1/${sim.combinedRate}`,
        "ボーナスに当選した場合のBIG・REG構成比です。"
      ));
      note = `設定1のBIG約1/${sim.bigRate}・REG約1/${sim.regRate}から算出した当選内訳です。設定が変わると構成比も変わります。`;
    } else {
      const hasEntryBonuses = Array.isArray(sim.entryBonusAwards) && sim.entryBonusAwards.length > 0;
      if (hasEntryBonuses && Number(sim.triggerSuccess) >= 0.995) {
        charts.push(ratioChartMarkup(
          "INITIAL ROUTE",
          "初当りの代表ルート",
          sim.entryBonusAwards.map(([bonus, weight]) => [bonus.label, weight]),
          `${sim.entryBonusAwards.length}ルート`,
          "初当り後に振り分ける代表ルートです。各ボーナス後のRUSH当落は別に抽選します。"
        ));
      } else {
        charts.push(ratioChartMarkup(
          "AT ENTRY",
          `${sim.triggerLabel}突破割合`,
          [["突破", sim.triggerSuccess], ["非突破", 1 - sim.triggerSuccess]],
          percent(sim.triggerSuccess),
          `${sim.triggerLabel}から${hasEntryBonuses ? (machine.initialHitLabel || "初当りBONUS") : sim.mainLabel}へ進む代表割合です。`
        ));
      }
      if (sim.upperLabel && Number(sim.upperAfterSuccesses) > 0) {
        const requiredSuccesses = Math.max(1, Number(sim.upperAfterSuccesses));
        const overallUpperChance = Math.pow(Math.max(0, Math.min(1, Number(sim.mainSetContinue) || 0)), requiredSuccesses);
        charts.push(ratioChartMarkup(
          "UPPER ROUTE",
          `${sim.upperLabel}到達割合`,
          [["3回成功", overallUpperChance], ["途中終了", 1 - overallUpperChance]],
          percent(overallUpperChance),
          `ハラキリチャレンジ約${percent(sim.mainSetContinue)}を${requiredSuccesses}回続けて成功し、4セット目から${sim.upperLabel}へ進む割合です。`
        ));
      } else if (sim.upperLabel && Number(sim.upperSuccess) > 0) {
        charts.push(ratioChartMarkup(
          "UPPER JUDGE",
          `${sim.upperChallenge}成功割合`,
          [["成功", sim.upperSuccess], ["失敗", 1 - sim.upperSuccess]],
          percent(sim.upperSuccess),
          `${sim.upperChallenge}到達後に${sim.upperLabel}へ進む割合です。`
        ));
      }
      if (sim.karakuriJudgeFlow) {
        charts.push(ratioChartMarkup(
          "CHAIN JUDGE",
          "運命連鎖成功割合",
          [["成功", sim.chainSuccess], ["失敗", 1 - sim.chainSuccess]],
          percent(sim.chainSuccess),
          "激情ジャッジ4回目以降の成功時に行う上位AT抽選です。"
        ));
        note = `${sim.triggerLabel}突破、激情ジャッジの成功回数、運命の一劇・運命連鎖は段階ごとの別抽選です。表示割合を掛け合わせた単純な上位到達率ではありません。`;
      } else {
        note = hasEntryBonuses
          ? Number(sim.upperAfterSuccesses) > 0
            ? `${sim.triggerLabel}突破、ボーナス種別ごとの${sim.mainLabel}抽選、ハラキリチャレンジの継続は段階ごとの別抽選です。3回成功後の追加抽選はなく、4セット目から${sim.upperLabel}へ移行します。`
            : `${sim.triggerLabel}突破、ボーナス種別ごとの${sim.mainLabel}抽選、${sim.upperChallenge}成功は別々の抽選です。表示割合を掛け合わせただけの全体到達率ではありません。`
          : `${sim.triggerLabel}突破と${sim.upperChallenge}成功は別々の抽選です。ゾーン・上位ルート選択率を含む全体到達率ではありません。`;
      }
    }
    const visibleCharts = charts.filter(Boolean);
    if (!visibleCharts.length) return "";
    return `<section class="machine-ratio-section" id="ratio-chart" aria-labelledby="machine-ratio-title"><div class="machine-ratio-head"><span>SPEC RATIO</span><h3 id="machine-ratio-title">${machine.shortName}の割合を円グラフで見る</h3><p>機種紹介に掲載している代表値を、スマホでも比較しやすい形にしました。</p></div><div class="machine-ratio-grid${visibleCharts.length === 1 ? " is-single" : ""}">${visibleCharts.join("")}</div><p class="machine-ratio-note">${note}</p></section>`;
  }

  function czGameMarkup() {
    const sim = machine.sim;
    if (sim.kind !== "slot") return "";
    const isDirectEntry = Number(sim.triggerSuccess) >= .995 || sim.triggerLabel === sim.mainLabel;
    const triggerRate = Number(sim.triggerRate) || Number(sim.mainRate) || 0;
    const mainRate = Number(sim.mainRate) || triggerRate;
    const successRate = Math.max(0, Math.min(1, Number(sim.triggerSuccess) || 0));
    const hasEntryBonuses = Array.isArray(sim.entryBonusAwards) && sim.entryBonusAwards.length > 0;
    const entryLabel = sim.mainRateLabel || machine.initialHitLabel || "初当りBONUS";
    const upperRoute = sim.uminchuFlow
      ? `BONUS後32G以内の連チャンを10回重ねると${sim.upperLabel}へ進み、ストック獲得後は約${percent(sim.uminchuPostIreguiContinue)}のループで連チャンを伸ばします。`
      : sim.tentenFlow
        ? `王宮舞踏会中に上位CZの権利を獲得し、終了後の10G${sim.upperChallenge}を約${percent(sim.upperSuccess)}で突破すると${sim.upperLabel}へ進みます。`
      : sim.upperLabel
      ? sim.karakuriJudgeFlow
        ? `${sim.specialLabel}を3回成功させて${sim.upperChallenge}、4回目以降の成功時は運命連鎖から${sim.upperLabel}を目指します。`
        : Number(sim.upperAfterSuccesses) > 0
          ? `${sim.specialLabel}などで獲得を伸ばし、ハラキリチャレンジを3回成功させると4セット目から${sim.upperLabel}へ移行します。`
        : `${sim.specialLabel}などで獲得を伸ばし、${sim.upperChallenge}成功から${sim.upperLabel}を目指します。`
      : `${sim.specialLabel}などの出玉契機で獲得枚数を伸ばします。`;
    const judgeText = isDirectEntry
      ? sim.uminchuFlow
        ? `${sim.triggerLabel}当選後はBIGまたはREGへ進み、BONUS消化後の32Gでストック放出または自力連チャンを判定します。`
        : `${sim.triggerLabel}を初当りとして扱い、独立したCZ突破抽選は行いません。`
      : `${sim.triggerLabel}到達後、代表突破率${percent(successRate)}で${hasEntryBonuses ? entryLabel : sim.mainLabel}への当落を判定します。`;
    const missText = isDirectEntry
      ? hasEntryBonuses
        ? `初当り後は${sim.entryBonusAwards.map(([bonus]) => bonus.label).join("・")}の代表ルートへ進み、それぞれの条件で${sim.mainLabel}を判定します。`
        : "初当り後はそのままメイン区間へ進みます。"
      : hasEntryBonuses
        ? `成功で${entryLabel}へ進み、獲得後にボーナス種別ごとの期待度で${sim.mainLabel}を抽選します。失敗時は通常時へ戻ります。`
        : `成功で${sim.mainLabel}、失敗時は通常時へ戻る流れです。`;
    const flow = isDirectEntry
      ? hasEntryBonuses
        ? [
            ["01", "通常時", `${sim.triggerLabel}を待つ`],
            ["02", "初当り", `約1/${triggerRate}`],
            ["03", "初当りルート", `${sim.entryBonusAwards.length}種類`],
            ["04", "AT", sim.mainLabel]
          ]
        : [
            ["01", "通常時", `${sim.triggerLabel}を待つ`],
            ["02", "初当り", `約1/${triggerRate}`],
            ["03", "メイン", sim.mainLabel],
            ["04", "出玉契機", sim.specialLabel]
          ]
      : [
          ["01", "通常時", `${sim.triggerLabel}を目指す`],
          ["02", "CZ・入口", `約1/${triggerRate}`],
          ["03", "突破ジャッジ", `${percent(successRate)}で成功`],
          ["04", hasEntryBonuses ? "初当りBONUS" : "AT・ST", hasEntryBonuses ? entryLabel : sim.mainLabel]
        ];
    const upperStep = sim.upperLabel
      ? `<div class="machine-cz-upper"><span>その先</span><strong>${sim.karakuriJudgeFlow ? "激情3回→運命の一劇 / 4回→運命連鎖" : sim.uminchuFlow ? "BONUS 10連" : sim.upperChallenge}</strong><i aria-hidden="true">→</i><strong>${sim.upperLabel}</strong><small>${sim.karakuriJudgeFlow ? "激情ジャッジ成功回数で上位ルートが変化" : sim.uminchuFlow ? "10連到達で8Gのストック特化ゾーンへ突入" : sim.tentenFlow ? "王宮舞踏会終了後に10G・成功期待度約50%" : "上位ルートはCZ突破後の別抽選"}</small></div>`
      : "";
    return `<section class="machine-cz-guide${isDirectEntry ? " is-direct" : ""}" id="cz-game" aria-labelledby="machine-cz-title"><div class="machine-cz-head"><span>${isDirectEntry ? "DIRECT ENTRY FLOW" : "CHANCE ZONE GUIDE"}</span><h3 id="machine-cz-title">${machine.shortName}の${isDirectEntry ? "初当りゲーム性" : "CZのゲーム性"}</h3><p>${isDirectEntry ? "CZを経由しない初当りから、出玉を伸ばす流れを整理します。" : `${sim.triggerLabel}の役割、突破後の行き先、上位までの流れを整理します。`}</p></div><div class="machine-cz-flow" aria-label="${escapeHtml(`${machine.shortName}のゲームフロー`)}">${flow.map(([number, label, detail], index) => `<div><span>${number}</span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(detail)}</small></div>${index < flow.length - 1 ? '<i aria-hidden="true">›</i>' : ""}`).join("")}</div>${upperStep}<div class="machine-cz-detail-grid"><article><span>ROLE</span><h4>${isDirectEntry ? "初当りの役割" : "CZの役割"}</h4><p>通常時の入口は${sim.triggerLabel}で、発生目安は約1/${triggerRate}です。${isDirectEntry ? hasEntryBonuses ? `${initialHitName(entryLabel)}後に複数の代表ルートへ振り分けます。` : `${sim.mainLabel}へ直接つながる代表ルートとして扱います。` : `${hasEntryBonuses ? entryLabel : sim.mainLabel}へ進むための関門として扱います。`}</p></article><article><span>JUDGE</span><h4>${isDirectEntry ? "直結タイプ" : "CZ中の当落"}</h4><p>${judgeText} 実機の小役、ポイント、バトルなど複数の条件は、このサイトでは一連のジャッジへまとめています。</p></article><article><span>RESULT</span><h4>成功・失敗後</h4><p>${missText} 設定${slotBaselineSetting}基準の${initialHitName(sim.mainLabel)}は約1/${mainRate}です。</p></article><article><span>NEXT ROUTE</span><h4>AT中と上位ルート</h4><p>${upperRoute}</p></article></div><p class="machine-cz-note">表示するCZ発生率・突破率・上位到達率は、記事に収録した公表値または比較用の代表値です。実機の全小役、内部状態、モード、天井は完全再現していません。</p></section>`;
  }

  function detailedGameGuideMarkup() {
    const sim = machine.sim;
    let cards;
    let note;
    if (sim.kind === "pachinko") {
      const payoutDistribution = (sim.rushPayouts || []).map(([payout, weight]) => `${yen.format(payout)}玉 ${percent(weight)}`).join(" / ") || "代表出玉を抽選";
      const firstPayout = sim.firstPayoutIn === sim.firstPayoutOut
        ? `初当り出玉は表記${yen.format(sim.firstPayoutIn)}玉を基準にします。`
        : `初当りは${sim.rushLabel}突入時が表記${yen.format(sim.firstPayoutIn)}玉、非突入時が表記${yen.format(sim.firstPayoutOut)}玉です。`;
      const upperRoute = sim.upperLabel
        ? `${sim.upperLabel}は${Number(sim.upperDirectChance) > 0 ? `初当り時の直行${percent(sim.upperDirectChance)}、` : ""}${Number(sim.upperUpgradeChance) > 0 ? `${sim.rushLabel}中の昇格${percent(sim.upperUpgradeChance)}` : "RUSH中の昇格抽選"}で判定します。`
        : "独立した上位RUSHは設定していません。";
      const upperContinue = sim.upperLabel ? `${sim.upperLabel}の継続率は${percent(sim.upperContinue || sim.rushContinue)}です。` : "";
      cards = [
        ["GAME FLOW", "ゲーム性", `${sim.startType}から${sim.hitLabel}を目指し、初当り後に${sim.rushLabel}突入を判定します。突入後は大当りごとに継続抽選と出玉抽選を行い${sim.upperLabel ? `、条件を満たすと${sim.upperLabel}へ進みます` : "、終了まで連チャンを重ねます"}。`],
        ["DISTRIBUTION", "出玉振り分け", `${firstPayout} 右打ち中の代表振り分けは「${payoutDistribution}」です。表記出玉から打ち出し分などを差し引いた実獲得出玉も別に表示します。`],
        ["ENTRY RATE", "突入率・突破率", `${sim.rushLabel}突入率は${percent(sim.rushEntry)}、継続率は${percent(sim.rushContinue)}です。${upperRoute} ${upperContinue}`],
        ["NORMAL MODE", "通常時・ゾーン", `通常時の${sim.hitLabel}は約1/${sim.hitRate}、固定回転率は1,000円あたり${sim.spinsPer1k}回です。パチスロのようなゲーム数ゾーンではなく、1回転ごとの抽選として扱います。`],
        ["PAYOUT / UPPER", "上乗せ・上位", `${sim.upperLabel ? `${sim.rushLabel}から${sim.upperLabel}への昇格と、上位中の継続差を確認できます。` : "大当りごとに出玉振り分けを抽選し、複数回分の出玉は連チャン結果として積み上げます。"} 3000玉以上などは「10R×2」のようにラウンド相当数も演出中に表示します。`]
      ];
      note = "出玉振り分け・突入率・継続率は、記事に収録した公表値またはサイトの代表値です。残保留、内部状態、時短回数の細分化などは機種ごとの本文で補足します。";
    } else if (sim.kind === "juggler") {
      cards = [
        ["GAME FLOW", "ゲーム性", `1GごとにBIG・REGを抽選し、ボーナス後に「続ける」「やめる」を選びます。最大${yen.format(sim.games)}Gまで遊技でき、終了時に設定、ボーナス回数、合算、差枚をまとめて表示します。`],
        ["DISTRIBUTION", "ボーナス振り分け", `設定1基準でBIG約1/${sim.bigRate}・約${yen.format(sim.bigPayout)}枚、REG約1/${sim.regRate}・約${yen.format(sim.regPayout)}枚です。実戦では設定ごとの確率でBIG・REGを別々に抽選します。`],
        ["BONUS RATE", "当選率・合算", `設定1のボーナス合算は約1/${sim.combinedRate}です。開始時に${slotSettingLabel}を均等抽選し、設定は最終結果で発表します。`],
        ["NORMAL MODE", "通常時・ゾーン", `Aタイプは特定ゲーム数のゾーンを狙う構成ではなく、毎ゲームのボーナス抽選が中心です。50枚あたり${sim.base50}Gを固定ベースとして投資を計算します。`],
        ["BONUS", "上乗せ・出玉", `ATのゲーム数上乗せや上位ATはありません。BIG・REGの獲得枚数を積み重ね、総投入枚数との差から最終差枚と収支目安を算出します。`]
      ];
      note = "BIG・REG確率と出玉率は設定別値を使用します。小役確率、単独・重複当選、技術介入による差は簡易モデルに含めません。";
    } else if (sim.kabaneriStFlow) {
      const normalUpperLabel = sim.kabaneriUpperNormalLabel || "美馬ST";
      const rareUpperLabel = sim.kabaneriUpperRareLabel || "裏美馬ST";
      const normalUpperContinue = Number(sim.kabaneriUpperNormalContinue) || 0.80;
      const rareUpperContinue = Number(sim.kabaneriUpperRareContinue) || 0.95;
      const upperGames = Math.max(1, Number(sim.kabaneriUpperGames) || 30);
      const bonusLabels = [...new Set((sim.kabaneriBonusAwards || []).map(([bonus]) => bonus.label).filter(Boolean))];
      const bonusPayouts = (sim.kabaneriBonusAwards || []).map(([bonus]) => Number(bonus.payout) || 0).filter((value) => value > 0);
      const bonusRange = bonusPayouts.length ? `${yen.format(Math.min(...bonusPayouts))}〜${yen.format(Math.max(...bonusPayouts))}枚` : "代表獲得枚数";
      cards = [
        ["GAME FLOW", "ゲーム性", `${sim.triggerLabel}後に${sim.mainLabel}へ突入すると、${sim.kabaneriStGames}G＋αのSTを開始します。ST中にボーナスへ当選すればゲーム数を再セットし、非当選なら駆け抜け終了です。`],
        ["ST LOOP", "通常ST", `通常STは${sim.kabaneriStGames}G＋α、ボーナス引き戻し期待度は約${percent(sim.kabaneriStContinue)}です。区間ごとにPUSHでカバネリBONUS・EPISODE BONUS・ST終了を表示します。`],
        ["BONUS", "ボーナス振り分け", `${bonusLabels.join("・") || "ST中ボーナス"}を${bonusRange}の代表振り分けで抽選します。当選したボーナス出玉は、その時点で総獲得枚数へ加算します。`],
        ["UPPER ST", `${normalUpperLabel}・${rareUpperLabel}`, `ST中のEPISODE BONUSの一部から${sim.upperChallenge}へ進みます。${normalUpperLabel}は${upperGames}G＋α・継続期待度約${percent(normalUpperContinue)}、${rareUpperLabel}は${upperGames}G＋α・継続期待度約${percent(rareUpperContinue)}として別々に抽選します。`],
        ["RESULT", "結果で見る項目", "初当りBONUS、通常STのボーナス回数、上位STの種類と連数、総獲得枚数を分けて表示します。ST出玉を一括抽選する方式は使用しません。"]
      ];
      note = `${sim.kabaneriStGames}G／${upperGames}GのST再セットと代表継続期待度を反映した体験モデルです。チャンス目、高確、上位分岐などの全内部抽選は代表値へ簡略化しています。`;
    } else if (sim.otomeRushFlow) {
      const otomeBonusLabel = sim.otomeBonusLabel || "出陣ボーナス";
      const otomeBattleLabel = sim.otomeBattleLabel || "オウガイバトル";
      cards = [
        ["GAME FLOW", "ゲーム性", `${sim.mainLabel}は初期${sim.otomeBaseGames}G＋αのゲーム数管理ATです。レア役上乗せ、${otomeBonusLabel}、${sim.specialLabel}を重ね、終了後は${otomeBattleLabel}で引き戻しを判定します。`],
        ["ADD-ON", "ゲーム数上乗せ", `レア役成立時は10G・20G・30G・50G・100G・200Gの代表振り分けで上乗せします。ゲーム数×純増約${Number(sim.atPureIncrease).toFixed(1)}枚/Gを獲得へ連動させ、上乗せごとにPUSHで結果を表示します。`],
        ["SPECIAL", `${otomeBonusLabel}・${sim.specialLabel}`, `${otomeBonusLabel}は10〜50Gの代表上乗せへ整理します。${sim.specialLabel}当選時は平均約${yen.format(sim.otomeAwakeningGames)}Gを上乗せする特化ゾーンとして表示します。`],
        ["LAST BATTLE", otomeBattleLabel, `AT終了後の5Gで引き戻しをPUSH判定します。勝利目安は設定1約24.9%〜設定6約31.7%で、勝利時は30G以上を上乗せして${sim.mainLabel}へ復帰します。`],
        ["UPPER", sim.upperLabel, `${sim.upperChallenge}などの上位契機で${sim.upperLabel}へ移行します。上位は初期50G＋α・純増約${Number(sim.upperPureIncrease).toFixed(1)}枚/Gとして、通常ATと区別して結果へ記録します。`]
      ];
      note = `公開されている初期ゲーム数、純増、上乗せ幅、${otomeBattleLabel}期待度を優先した体験モデルです。成立役別抽選、ボーナス全振り分け、内部高確、上位契機の全条件は簡略化しています。`;
    } else if (sim.battleBonusFlow) {
      cards = [
        ["GAME FLOW", "ゲーム性", `${sim.triggerLabel}当選後は、30G＋αの小役パートと8Gの継続バトルを1セットとして進行します。バトルごとにPUSHで継続を開き、${sim.upperChallenge}成功から${sim.upperLabel}を目指します。`],
        ["CONTINUE MODE", "継続率の振り分け", "通常バトルボーナスは66%・79%・84%・89%の4モードから開始時に代表配分で抽選します。選ばれた継続率は結果画面に表示します。"],
        ["BATTLE", "小役パートと継続バトル", "1セットは小役パート30G＋αとバトルパート8Gです。サイトでは小役パートの獲得を純増約4.1枚/Gで計算し、最後のPUSHで継続・敗北を表示します。"],
        ["UPPER", "無想転生チャンス", `${sim.upperChallenge}到達時は代表成功率${percent(sim.upperSuccess)}で判定します。成功後の${sim.upperLabel}は継続約${percent(sim.upperContinue)}として、通常BBとは別に連数を積み上げます。`],
        ["RESULT", "結果で見る項目", "通常BBの継続率モード、BB連数、無想転生到達、最終獲得枚数を別々に表示します。通常ATの獲得枚数を一括抽選する方式は使用しません。"]
      ];
      note = "継続率4モードと1セット38Gの構成を反映した体験モデルです。Vストック、成立役別の書き換え、北斗揃い、宿命バトルの全抽選までは再現していません。";
    } else if (sim.sgRaceFlow) {
      cards = [
        ["GAME FLOW", "ゲーム性", `${sim.mainLabel}は1セット40G＋αのシナリオ管理ATです。31G＋αの周回パート後、9GのSGバトルをPUSHで判定し、8セット完走でグランドスラムとなります。`],
        ["SCENARIO", "シナリオ管理", "開始時にバランス型・後半型・高継続型の代表シナリオを抽選し、セットごとの継続期待度を変えます。選ばれたシナリオ名は結果に残します。"],
        ["SPECIAL", "全速モード", `${sim.specialLabel}当選時は10G・20G・30Gのゲーム数上乗せを抽選し、純増約${Number(sim.atPureIncrease).toFixed(1)}枚/Gを基準に獲得へ加算します。`],
        ["GRAND SLAM", "グランドスラムと上位", `8セット到達後に${sim.upperChallenge}へ進み、Vストック込みの代表期待度約${percent(sim.upperSuccess)}で${sim.upperLabel}を判定します。上位中もセットごとの継続をPUSHで確認します。`],
        ["RESULT", "結果で見る項目", "SG RUSHのシナリオ、継続セット数、全速モード、グランドスラム、青島SGのセット数を分けて表示します。"]
      ];
      note = "SG RUSHの40G構成、8セットのグランドスラム、青島VS波多野の順序を反映しています。実機の全シナリオ、Vストック、艇王、エンディング経由は代表モデルへ簡略化しています。";
    } else if (sim.karakuriJudgeFlow) {
      cards = [
        ["GAME FLOW", "ゲーム性", `通常時は${sim.triggerLabel}を入口に${sim.mainLabel}を目指します。AT中は4Gの激情ジャッジをPUSHで判定し、成功回数に応じて運命の一劇・運命連鎖から${sim.upperLabel}を目指します。`],
        ["DISTRIBUTION", "獲得枚数の振り分け", `通常ATの初期枚数は${yen.format(sim.normalMin)}枚です。激情ジャッジ成功時は100・200・300枚の簡易振り分けを行い、上位到達時は極限無双の平均上乗せ約${yen.format(sim.upperPayout)}枚を起点に計算します。`],
        ["ENTRY RATE", "突破率", `${sim.triggerLabel}から${sim.mainLabel}への突破率は${percent(sim.triggerSuccess)}です。激情ジャッジ3回成功後の運命の一劇は${percent(sim.fateSuccess)}、4回目成功時の運命連鎖は${percent(sim.chainSuccess)}で上位ATを判定します。`],
        ["ZONE", "通常時・ゾーン", `${sim.triggerLabel}の基準は約1/${sim.triggerRate}、${sim.mainLabel}初当りは設定${slotBaselineSetting}基準で約1/${sim.mainRate}です。50枚あたり${sim.base50}Gを固定ベースにし、ゲーム数ゾーン・周期・天井の全状態は個別再現していません。`],
        ["ADD-ON", "上乗せ・上位", `激情ジャッジは成功期待度${percent(sim.karakuriJudgeSuccess)}で、成功回数を結果まで保持します。上位AT終了後は${sim.upperChallenge}を約${percent(sim.upperContinue)}で再抽選し、成功時は極限無双を経由して上位ATへ戻ります。`]
      ];
      note = "激情ジャッジの成立役別抽選、内部状態、上乗せ特化ゾーンの全振り分けは簡略化しています。3回・4回成功時の上位ルートとPUSH当落を中心に体験するモデルです。";
    } else if (sim.setPushFlow) {
      const pureIncreaseText = machine.specs?.find(([label]) => /純増/.test(label))?.[1] || "";
      const pureIncrease = Math.max(0.1, Number(sim.atPureIncrease) || Number.parseFloat(String(pureIncreaseText).match(/[\d.]+/)?.[0] || "") || 4);
      const initialHitLabel = sim.mainRateLabel || machine.initialHitLabel || sim.mainLabel;
      const initialHitText = initialHitName(initialHitLabel);
      const firstSetText = Array.isArray(sim.firstRushSetGames) ? "初回は基本20G、" : "";
      const entryBonusText = Array.isArray(sim.entryBonusAwards) && sim.entryBonusAwards.length
        ? `${sim.entryBonusAwards.map(([bonus, weight]) => `${bonus.label} 平均約${yen.format(bonus.payout)}枚・AT期待度${percent(bonus.atChance)}（比率${percent(weight)}）`).join(" / ")}。`
        : "";
      cards = [
        ["GAME FLOW", "ゲーム性", `${Array.isArray(sim.entryBonusAwards) && sim.entryBonusAwards.length ? `${initialHitText}後に${sim.entryBonusAwards.map(([bonus]) => bonus.label).join("・")}へ振り分け、各ルートから${sim.mainLabel}を目指します。` : `通常時は${sim.triggerLabel}を入口に${initialHitText}を経て${sim.mainLabel}を目指します。`}${sim.mainLabel}はセット継続を重ね、${sim.upperChallenge}から${sim.upperLabel}へ進みます。`],
        ["DISTRIBUTION", "ゲーム数と獲得枚数", `${entryBonusText}${firstSetText}継続セットは10G・20G・50G・100Gの簡易振り分けです。ボーナス出玉を先に加算し、RUSH中は各セットのゲーム数×純増約${pureIncrease.toFixed(1)}枚/Gを中心に、短期的なブレを加えて計算します。`],
        ["ENTRY RATE", "突破率", `${Array.isArray(sim.entryBonusAwards) && sim.entryBonusAwards.length ? `${sim.triggerLabel}からボーナスへの簡易到達率は${percent(sim.triggerSuccess)}です。ボーナス後の${sim.mainLabel}はボーナス種別ごとのAT期待度で判定します。` : `${sim.triggerLabel}から${sim.mainLabel}への簡易突破率は${percent(sim.triggerSuccess)}です。`}${Number(sim.upperAfterSuccesses) > 0 ? `ハラキリチャレンジは約${percent(sim.mainSetContinue)}で継続し、3回成功すると4セット目から${sim.upperLabel}へ移行します。` : `上位ルート選択率は${percent(sim.upperChance)}、${sim.upperChallenge}成功率は${percent(sim.upperSuccess)}として段階ごとに抽選します。`}`],
        ["ZONE", "通常時・ゾーン", `${sim.triggerLabel}の基準は約1/${sim.triggerRate}、${initialHitText}は設定${slotBaselineSetting}基準で約1/${sim.mainRate}です。50枚あたり${sim.base50}Gを固定ベースにし、内部モード・周期・天井の全状態は個別再現していません。`],
        ["ADD-ON", "上乗せ・上位", `${sim.specialLabel}を代表的な上乗せ契機として簡易抽選します。${sim.upperLabel}到達後もセットゲーム数×純増約${pureIncrease.toFixed(1)}枚/Gで獲得を計算し、代表継続率${percent(sim.upperContinue)}で継続判定します。`]
      ];
      note = `${sim.entryBonusAwardsNote ? `${sim.entryBonusAwardsNote}。` : ""}セットのゲーム数と獲得枚数を別々には抽選せず、公表純増を基準に連動させています。実機の全小役・内部状態・有利区間は完全再現していません。`;
    } else if (sim.uminchuFlow) {
      cards = [
        ["GAME FLOW", "ゲーム性", `${sim.triggerLabel}後はBIGまたはREGを消化し、必ず32G区間へ進みます。フルーツ連の自力当選とBONUSストック放出で10連を目指し、10連到達時は8Gの${sim.upperLabel}へ突入します。`],
        ["BONUS", "BIG・REG", "BIGは平均約202枚・一般中と最大3回のJACゲームで構成します。REGは平均約53枚・ベルナビ8回です。平均値を中心に毎回獲得枚数を変動させ、BIG／REG回数を結果へ分けて残します。"],
        ["32G LOOP", "フルーツ連・ストック放出", "BONUS後は32Gを最後までカウントします。ストック所持時は1〜32Gで放出し、ストックがなければフルーツ連で自力当選を抽選。最後のPUSHで継続または32G終了を開きます。"],
        ["IREGUI", "10連後の8Gストックゾーン", `${sim.upperLabel}は8G継続し、毎ゲームの擬似フルーツから最大8個のBONUSをストックします。PUSHで獲得ストック数を表示し、ストック分を1回ずつBONUSとして消化します。`],
        ["80% LOOP", "ストック後のループ", `ストックを使い切った後も32G以内のBONUSが約${percent(sim.uminchuPostIreguiContinue)}でループします。再び10連へ到達すれば${sim.upperLabel}を再セットし、最終結果に最大連・BIG・REG・${sim.upperLabel}回数を表示します。`]
      ];
      note = "設定別初当り、BONUS平均枚数、32G、IREGUIの8G・最大8ストック・終了後約80%は公開値です。10連前の自力継続率、BONUS中ストック率、連チャン中BIG比率は詳細非公表のため、公開合算値へ近づける代表値です。";
    } else if (sim.tentenFlow) {
      cards = [
        ["EPISODE BATTLE", "14GのCZ", "10GのレベルUPパートでEPレベルを上げ、4GのバトルをPUSHで決着します。勝利で約100枚の初回BONUSと王宮舞踏会へ進みます。"],
        ["PALACE PARTY", "40G＋αの王宮舞踏会", "残りゲーム数を最後まで減らし、BONUS当選または終了をPUSHで開きます。通常約1/34.1、ヒロイン高確約1/20.6、デュエット高確約1/14.4です。"],
        ["PALACE BONUS", "4種類の王宮BONUS", "白・アニス・ユフィは約150枚、デュエットは約200枚。ヒロインBONUS後は対応する15G高確へ移行し、結果に種類別回数を残します。"],
        ["STOCK", "本気チャレ・転天STOCK", "3回目のBONUS後は5Gの本気チャレを表示。転天STOCKは8G＋αをカウントし、PUSHで平均約2個のBONUSストックを開きます。"],
        ["RINNE TENTEN", "10Gの上位CZ", `獲得した権利は王宮舞踏会終了後に10Gの${sim.upperChallenge}で判定。約50%成功で期待獲得約3100枚の${sim.upperLabel}へ進みます。`]
      ];
      note = "CZゲーム数、BONUS枚数、高確ゲーム数、BONUS確率、転天STOCK平均、上位CZ期待度は公開値です。BONUS種別の細かな入口比率と上位CZ権利獲得率は非公表のため代表値です。";
    } else if (sim.mahoakoFlow) {
      cards = [
        ["GAME FLOW", "ゲーム性", `${sim.triggerLabel}は3種類CZと4種類BONUSの並行ルートです。成功後は3GのあこがれATTACKで初期ゲーム数を決め、純増約${Number(sim.atPureIncrease).toFixed(1)}枚/Gの${sim.mainLabel}で上乗せ・BONUS・特化ゾーンを重ねます。`],
        ["ENTRY", "3種類CZと4種類BONUS", "CZはトランスマジア約42%、パネルアタック約60%、ヴェナリータはAT濃厚かつ上位約42%です。BONUSはREG39.8%、まほあこ49.7%、あこがれVer.8.3%、スペシャルムービー2.3%の公開比率で表示します。"],
        ["ATTACK", "あこがれATTACK・特化ゾーン", "あこがれATTACKは3G。結果をPUSHまで伏せ、通常上乗せまたはサディスティックタイム平均約70G、ぶるぶるマッサージタイム約100G、マジアベーゼ無双約200Gを開きます。"],
        ["AT", "通常AT・無限AT", "通常ATは残りゲーム数を減らしながら、レア役上乗せ、4種類BONUS、あこがれATTACK、BAR揃い高確を抽選します。BAR揃い成功時の『出られない部屋』は通常上乗せと別の無限ATイベントとして記録します。"],
        ["UPPER", "VSロードエノルメ・引き戻し", `${sim.upperChallenge}成功後の${sim.upperLabel}は純増約${Number(sim.upperPureIncrease).toFixed(1)}枚/G。終了後はVSロードエノルメ、敗北時は10Gの『あの星を堕とせ』へ進み、2段階合算約${percent(sim.upperReturnChance)}で上位復帰を判定します。`]
      ];
      note = "BONUS4種類の割合、CZ期待度、純増、特化ゾーン平均、上位後の引き戻しは公開値を使用しています。CZ種類比率、REGのAT当選率、通常AT中の各契機出現率など未公表部分は全体初当りに近づける代表値です。";
    } else if (sim.godzillaEva2Flow) {
      const bonusText = Array.isArray(sim.entryBonusAwards)
        ? sim.entryBonusAwards.map(([bonus]) => `${bonus.label}は平均約${yen.format(bonus.payout)}枚・AT期待度約${percent(bonus.atChance)}`).join("、")
        : "2種類のBONUS後にATを判定します";
      cards = [
        ["GAME FLOW", "ゲーム性", `${sim.triggerLabel}後はエヴァBONUSまたはゴジラBONUSへ進み、専用ジャッジを経て${sim.mainLabel}を目指します。AT開始時のG覚醒アタックで50〜600Gを決め、消化中は怪獣索敵・インパクトバトル・震撃チャンスから上乗せを狙います。`],
        ["BONUS / ENTRY", "BONUSとAT突破率", `${bonusText}。BONUSはどちらもベルナビ7回・平均約73枚で、エヴァは3G＋α、ゴジラは5G＋αの専用ジャッジをPUSHで決着します。`],
        ["ADD-ON", "ゲーム数上乗せと10倍上乗せ", "AT中の上乗せはゲーム数で表示します。怪獣索敵は10G＋α、インパクトバトルは4Gで進み、ゴジラゾーンや震撃チャンス成功時は上乗せゲーム数を10倍にして結果へ加算します。"],
        ["UPPER", "決戦カイザーギドラ", `${sim.upperChallenge}は4Gで、突破目安約${percent(sim.upperSuccess)}。成功後の${sim.upperLabel}は初期100G以上・純増約${Number(sim.upperPureIncrease).toFixed(1)}枚/Gで進み、終了時は再び4Gの上位CZを判定します。`],
        ["RETURN", "50G引き戻し", `通常AT・上位AT終了後は50Gの引き戻し区間をカウントします。設定1のAT引き戻し目安約${percent(sim.upperReturnChance)}を代表値として、成功時は再びG覚醒アタックからATへ戻ります。`]
      ];
      note = "公開されているBONUS出玉・AT期待度・初期ゲーム数・純増・各上乗せ契機の期待度を優先した体験モデルです。成立役別抽選、内部状態、全振り分け、設定差が未公表の抽選は代表値へ簡略化しています。";
    } else if (sim.cycleFlow) {
      const cycle = sim.cycleFlow;
      const configuredRounds = Array.isArray(cycle.rounds) ? cycle.rounds : [];
      const roundGameValues = configuredRounds.length
        ? configuredRounds.flatMap(round => Array.isArray(round.games) ? round.games.map(([games]) => games) : [round.games]).filter(Number.isFinite)
        : [];
      const gameOptions = roundGameValues.length
        ? [...new Set(roundGameValues)].map(games => `${yen.format(games)}G`).join("・")
        : Array.isArray(cycle.games)
          ? cycle.games.map(([games]) => `${yen.format(games)}G`).join("・")
          : `${yen.format(cycle.games || 20)}G`;
      const roundRoute = cycle.routeSummary || (configuredRounds.length
        ? configuredRounds.map(round => round.title).filter(Boolean).join(" → ")
        : Array.isArray(cycle.roundLabels) && cycle.roundLabels.length
          ? cycle.roundLabels.join(" → ")
          : "");
      const rewardText = ([reward, weight]) => {
        const rewardKind = String(reward.kind || "coins").toLowerCase();
        const rewardValue = rewardKind === "games"
          ? `${Array.isArray(reward.games) ? reward.games.map(([games]) => yen.format(games)).join("・") : yen.format(reward.games || 0)}G`
          : Number(reward.payout) > 0 ? `約${yen.format(reward.payout)}枚` : "セット継続";
        return `${reward.label} ${rewardValue} ${percent(weight)}`;
      };
      const rewards = cycle.rewardSummary || (configuredRounds.length
        ? configuredRounds.map(round => `${round.title}: ${(round.rewards || cycle.rewards || []).map(rewardText).join("・")}`).join(" / ")
        : (cycle.rewards || []).map(rewardText).join(" / "));
      const roundChances = configuredRounds.map(round => Number(round.continueChance)).filter(Number.isFinite);
      const continueText = roundChances.length
        ? `${percent(Math.min(...roundChances))}〜${percent(Math.max(...roundChances))}`
        : `約${percent(cycle.continueChance)}`;
      const upperCondition = Number(cycle.upperAfterRounds) > 0
        ? `${yen.format(cycle.upperAfterRounds)}回到達で${sim.upperChallenge}へ進み${cycle.upperAfterRoundsAutoSuccess === false ? `、成功率${percent(sim.upperSuccess)}で${sim.upperLabel}を判定します。` : `、${sim.upperLabel}へ移行します。`}`
        : `${sim.upperChallenge}への移行抽選後、成功率${percent(sim.upperSuccess)}で${sim.upperLabel}へ進みます。`;
      const upperDescription = sim.upperGameManaged
        ? `${sim.upperLabel}は初期${sim.upperGameRange || "100〜300G"}・純増約${Number(sim.upperPureIncrease || 0).toFixed(1)}枚/Gのゲーム数管理型として、通常ATと分けて結果へ記録します。`
        : `${sim.upperLabel}は代表継続率${percent(sim.upperContinue)}でセットを重ね、通常ループと分けて結果へ記録します。`;
      cards = [
        ["GAME FLOW", "ゲーム性", `${sim.triggerLabel}を経て${sim.mainLabel}へ突入すると、${cycle.label || sim.mainLabel}を1区間ずつ進めます。各区間の最後にPUSHで報酬と継続結果を開き、終了まで獲得枚数を積み上げます。`],
        ["LOOP UNIT", "区間・セットの構成", `1区間は${gameOptions}の代表振り分けです。区間別の継続期待度は${continueText}、最大${yen.format(cycle.maxRounds || 10)}回まで抽選します。${roundRoute ? `進行順は「${roundRoute}」です。` : ""}`],
        ["REWARD", "報酬振り分け", rewards || `${cycle.rewardLabel || "報酬獲得"}を区間ごとに抽選します。ゲーム数上乗せとボーナスは別々に表示します。`],
        ["ENTRY / ZONE", "初当り・突破率", `${sim.triggerLabel}の基準は約1/${sim.triggerRate}、${sim.mainLabel}初当りは設定${slotBaselineSetting}基準で約1/${sim.mainRate}です。通常時の全モード・規定ゲーム数・天井は初当り確率へまとめています。`],
        ["UPPER", "上位ルート", `${upperCondition}${upperDescription}`]
      ];
      note = `${cycle.label || sim.mainLabel}の区間順序、代表報酬、継続判定を個別表示する体験モデルです。成立役別抽選、内部状態、全報酬振り分けは短時間で比較できる形へ簡略化しています。`;
    } else {
      const upperRouteRate = Math.max(0, Number(sim.upperChance) || 0);
      const upperSuccessRate = Math.max(0, Number(sim.upperSuccess) || 0);
      const totalUpperRate = upperRouteRate * upperSuccessRate;
      const normalAwardText = Array.isArray(sim.normalAwards) && sim.normalAwards.length
        ? `${sim.normalAwards.map(([award, weight]) => `${award.label || sim.mainLabel} 約${yen.format(award.payout)}枚 ${percent(weight)}`).join(" / ")}${sim.normalAwardsNote ? `。${sim.normalAwardsNote}` : ""}`
        : `通常ATの代表獲得は${yen.format(sim.normalMin)}〜${yen.format(sim.normalMax)}枚`;
      cards = [
        ["GAME FLOW", "ゲーム性", `通常時は${sim.triggerLabel}を入口に${sim.mainLabel}を目指します。AT中は${sim.specialLabel}などの出玉契機を抽選し、${sim.upperChallenge}を突破すると${sim.upperLabel}へ進みます。`],
        ["DISTRIBUTION", "獲得枚数の振り分け", `${normalAwardText}。${sim.specialLabel}当選時は${yen.format(sim.specialMin)}〜${yen.format(sim.specialMax)}枚を抽選します。ゲーム数表示と獲得枚数は公開純増を基準に連動させます。`],
        ["ENTRY RATE", "突破率", `${sim.triggerLabel}から${sim.mainLabel}への突破率は${percent(sim.triggerSuccess)}です。上位ルート選択率は${percent(upperRouteRate)}、${sim.upperChallenge}成功率は${percent(upperSuccessRate)}で、単純計算の上位到達目安は約${percent(totalUpperRate)}です。`],
        ["ZONE", "通常時・ゾーン", `${sim.triggerLabel}の基準は約1/${sim.triggerRate}、${sim.mainLabel}初当りは設定${slotBaselineSetting}基準で約1/${sim.mainRate}です。50枚あたり${sim.base50}Gを固定ベースにし、ゲーム数ゾーン・周期・天井の全状態は個別再現していません。`],
        ["ADD-ON", "上乗せ・特化ゾーン", `${sim.specialLabel}はAT中の代表的な上乗せ契機で、発生目安は${percent(sim.specialChance)}です。${sim.upperLabel}は代表継続率${percent(sim.upperContinue)}として抽選し、上乗せ枚数と上位到達の差を結果で比較できます。`]
      ];
      note = "突破率、上乗せ枚数、上位ルートは短時間でゲーム性を比較するための代表モデルです。実機の全小役、状態移行、規定ゲーム数、天井恩恵を完全再現するものではありません。";
    }
    return `<section class="machine-game-guide" id="game-guide" aria-labelledby="machine-game-guide-title"><div class="machine-game-guide-head"><span>HOW TO PLAY</span><h3 id="machine-game-guide-title">${machine.shortName}の詳しい遊び方</h3><p>ゲーム性、振り分け、突破率、ゾーン、上乗せを順番に確認できます。</p></div><div class="machine-game-guide-grid">${cards.map(([kicker, title, body]) => `<article><span>${kicker}</span><h4>${title}</h4><p>${body}</p></article>`).join("")}</div><p class="machine-game-guide-note">${note}</p></section>`;
  }

  function resultGuideMarkup() {
    const sim = machine.sim;
    const items = sim.kind === "pachinko"
      ? [["当るまで", `${sim.hitLabel}までの回転数と投資目安`], ["RUSH", `${sim.rushLabel}への突入と連チャン回数`], ["出玉", "表記出玉と、打ち出しを反映した実獲得出玉"], ["最終収支", "実獲得出玉を28玉交換で換算した収支目安"]]
      : sim.kind === "juggler"
        ? [["ボーナス", "何GでBIG・REGに当ったか"], ["続行判断", "ボーナスごとに続ける・やめるを選択"], ["実戦データ", "総G数、BIG・REG回数、合算"], ["最終収支", "差枚と5.2枚交換の収支目安"]]
        : [["当るまで", `${sim.triggerLabel}・${machine.initialHitLabel || sim.mainLabel}までのゲーム数`], ["設定", `${slotSettingLabel}から抽選された今回の設定`], ["上位到達", sim.karakuriJudgeFlow ? `激情3回の${sim.upperChallenge}・4回目の運命連鎖と${sim.upperLabel}への到達` : `${sim.upperChallenge || "上位CZ"}と${sim.upperLabel || "上位AT"}への到達`], ["最終収支", "差枚と5.2枚交換の収支目安"]];
    return `<section class="machine-article-section machine-result-guide"><h3>シミュレーション結果の見方</h3><div>${items.map(([label, detail]) => `<p><strong>${label}</strong><span>${detail}</span></p>`).join("")}</div><p class="machine-result-guide-note">結果は自動で「マイ記録」に保存され、同じ機種を何回試したか、最高収支、勝率をあとから確認できます。</p></section>`;
  }

  function machineFaqMarkup() {
    const sim = machine.sim;
    const releaseSummary = String(machine.intro || "").split("。")[0] + "。";
    let items;
    if (Array.isArray(machine.faq) && machine.faq.length) {
      items = machine.faq.map(item => [item.question, item.answer]);
    } else if (sim.kind === "pachinko") {
      const averageInvestment = Math.round((sim.hitRate / sim.spinsPer1k * 1000) / 100) * 100;
      const upperFlow = sim.upperLabel ? `、さらに${sim.upperLabel}` : "";
      items = [
        [`${machine.shortName}はどんな台？`, `${releaseSummary}${machine.points?.[0] ? ` ${machine.points[0]}が主な確認ポイントです。` : ""}`],
        [`${machine.shortName}の平均投資目安は？`, `固定条件では1,000円あたり${sim.spinsPer1k}回転として、平均${yen.format(averageInvestment)}円が目安です。実店舗の回転率や持ち玉状況で変わるため、実収支を保証する値ではありません。`],
        ["シミュレーターでは何を体験できる？", `${sim.hitLabel}までの回転数、${sim.rushLabel}への突入、連チャンと出玉${upperFlow}を固定条件で簡易抽選します。実機の全演出や内部状態を完全再現するものではありません。`],
        ["出玉と収支はどう計算する？", "スペック上の表記出玉とは別に、打ち出しロスとオーバー入賞を簡易反映した実獲得出玉を算出します。250玉貸し・28玉交換の固定条件で差玉と収支目安を表示します。"]
      ];
    } else {
      const gamesPerThousand = sim.base50 * RANKING_RATE.slot.lendCoins / 50;
      const averageInvestment = Math.round((sim.mainRate / gamesPerThousand * 1000) / 100) * 100;
      const initialHitLabel = machine.initialHitLabel || sim.mainLabel;
      items = [
        [`${machine.shortName}はどんな台？`, `${releaseSummary}${machine.points?.[0] ? ` ${machine.points[0]}が主な確認ポイントです。` : ""}`],
        [`${machine.shortName}の平均投資目安は？`, `設定${slotBaselineSetting}基準の${initialHitName(initialHitLabel)}約1/${sim.mainRate}と、50枚あたり${sim.base50}G・46枚貸しの固定条件から、平均${yen.format(averageInvestment)}円を目安として表示します。実際の設定や遊技状況で結果は変わります。`],
        ["設定とゲームの流れはどう抽選する？", sim.kind === "juggler" ? `開始時に${slotSettingLabel}から1つを均等抽選し、最大${yen.format(sim.games)}GまでBIG・REGを抽選します。設定は終了時の結果とランキングに表示します。` : `開始時に${slotSettingLabel}から1つを均等抽選し、${sim.triggerLabel}、${initialHitLabel}${initialHitLabel !== sim.mainLabel ? `、${sim.mainLabel}` : ""}、${sim.upperChallenge}、${sim.upperLabel}の順で到達を判定します。設定は最終結果とランキングに表示します。`],
        ["収支はどう計算する？", "1,000円46枚貸し・5.2枚交換の固定条件で投資、換金、収支目安を計算します。実店舗の再プレイ、持ちメダル、端数処理は含みません。"]
      ];
    }
    return `<section class="machine-article-section machine-faq" id="faq" aria-labelledby="machine-faq-title"><h3 id="machine-faq-title">${machine.shortName}のよくある質問</h3><div class="machine-faq-list">${items.map(([question, answer]) => `<div><h4>${question}</h4><p>${answer}</p></div>`).join("")}</div></section>`;
  }

  function readerGuideMarkup() {
    const guide = machine.readerGuide;
    if (!guide) return "";
    const comparisonLinks = (guide.compare || []).map(([relatedSlug, label, note]) => `<a href="${relatedSlug}.html"><strong>${label}</strong><span>${note}</span></a>`).join("");
    return `<section class="machine-reader-guide" id="reader-guide">
      <div class="machine-reader-guide-head"><span>QUICK VERDICT</span><h3>30秒で分かる${machine.shortName}</h3></div>
      <p class="machine-reader-guide-lead">${guide.verdict}</p>
      <div class="machine-reader-guide-grid">
        <div><h4>こんな遊び方に向いている</h4><ul>${guide.bestFor.map(item => `<li>${item}</li>`).join("")}</ul></div>
        <div><h4>遊ぶ前に確認したいこと</h4><ul>${guide.check.map(item => `<li>${item}</li>`).join("")}</ul></div>
      </div>
      <div class="machine-reader-related"><h4>比較候補</h4><div>${comparisonLinks}</div></div>
    </section>`;
  }

  function articleMarkup() {
    if (!Array.isArray(machine.articleSections) || !machine.articleSections.length) {
      const sim = machine.sim;
      const flow = sim.kind === "pachinko"
        ? `${sim.hitLabel}までの回転数、${sim.rushLabel}への突入、連チャン数と出玉を順番に抽選します。`
        : `${sim.triggerLabel}、${sim.mainLabel}、${sim.upperChallenge}、${sim.upperLabel}の順に、各段階への到達と獲得枚数を抽選します。`;
      return `<h3>${machine.shortName}で確認できること</h3>
        <p>${flow} 公開されている代表的な数値をもとに遊びやすく単純化し、同じ機種では全員が同じ貸出・交換条件で比較できるようにしています。</p>
        <p>${sim.kind === "pachinko" ? "実機にある全ての内部状態、演出、個別のアタッカー形状や打ち方による差は完全再現していません。実獲得出玉は、一般的な打ちっぱなしを想定した共通モデルです。" : "実機にある全ての内部状態、設定差、演出、取りこぼしや打ち方による差は完全再現していません。早い当りと深いハマり、通常結果と上位結果の幅を比べるための体験用モデルです。"}</p>
        ${calculationMarkup()}
        <h3>シミュレーターで比較するポイント</h3>
        <ul><li>平均値より早い当りと深いハマりの両方を複数回確認する</li><li>${sim.kind === "pachinko" ? `${sim.rushLabel}非突入時と連チャン時の出玉・収支を比べる` : `${sim.mainLabel}終了時と${sim.upperLabel}到達時の獲得枚数・収支を比べる`}</li><li>結果は自動保存されるマイ記録と機種別ランキングで振り返る</li></ul>
        <p>平均値は長期間の理論上の目安であり、1回ごとの結果や実際の遊技収支を保証するものではありません。</p>`;
    }
    return machine.articleSections.map(section => `<section class="machine-article-section"><h3>${section.heading}</h3>${(section.paragraphs || []).map(paragraph => `<p>${paragraph}</p>`).join("")}${section.bullets?.length ? `<ul>${section.bullets.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}</section>`).join("") + calculationMarkup();
  }

  const labels = simulationLabels();
  const startLabel = machine.sim.kind === "pachinko" ? "パチンコを始める" : machine.sim.kind === "juggler" ? "Aタイプを始める" : "レバーON";
  const isNovemberNewMachine = NOVEMBER_NEW_MACHINE_SLUGS.has(slug);
  const isDecemberNewMachine = DECEMBER_NEW_MACHINE_SLUGS.has(slug);
  const hubHref = machine.type === "slot" ? "slots.html" : "pachinko.html";
  const hubLabel = machine.type === "slot" ? "パチスロ" : "パチンコ";
  const novemberBreadcrumb = isNovemberNewMachine ? '<span>›</span><a href="new-machines-2026-11.html">11月新台</a>' : "";
  const novemberQuickLink = isNovemberNewMachine ? '<a href="new-machines-2026-11.html">11月新台比較</a>' : "";
  const decemberBreadcrumb = isDecemberNewMachine ? '<span>›</span><a href="new-machines-2026-12.html">12月新台</a>' : "";
  const decemberQuickLink = isDecemberNewMachine ? '<a href="new-machines-2026-12.html">12月新台比較</a>' : "";
  const heroImage = machine.image ? `<figure class="machine-archive-visual">
      <img src="${escapeHtml(machine.image)}" alt="${escapeHtml(machine.imageAlt || `${machine.shortName}の機種画像`)}" decoding="async">
      ${machine.imageCredit ? `<figcaption>${machine.imageSource ? `<a href="${escapeHtml(machine.imageSource)}" target="_blank" rel="noopener noreferrer">${escapeHtml(machine.imageCredit)} ↗</a>` : escapeHtml(machine.imageCredit)}</figcaption>` : ""}
    </figure>` : "";
  const comparableRate = item => Number(item.sim?.kind === "pachinko" ? item.sim.hitRate : item.sim?.mainRate || item.sim?.triggerRate) || 99999;
  const currentRate = comparableRate(machine);
  const currentYear = Number(String(machine.year || "").match(/\d{4}/)?.[0]) || 0;
  const neighbors = ordered
    .filter(([key, item]) => key !== slug && item.type === machine.type)
    .map(([key, item]) => {
      const itemRate = comparableRate(item);
      const itemYear = Number(String(item.year || "").match(/\d{4}/)?.[0]) || 0;
      let score = 0;
      if (item.theme === machine.theme) score += 5;
      if (item.sim?.kind === machine.sim.kind) score += 4;
      if (machine.type === "pachinko" && Boolean(item.sim?.upperLabel) === Boolean(machine.sim?.upperLabel)) score += 2;
      if (machine.type === "slot" && Boolean(item.sim?.settingRates) === Boolean(machine.sim?.settingRates)) score += 2;
      score += Math.max(0, 5 - Math.abs(Math.log(Math.max(itemRate, 1) / Math.max(currentRate, 1))) * 6);
      score += Math.max(0, 2 - Math.abs(itemYear - currentYear) * .5);
      score += Math.max(0, 2 - Number(item.order || 999) * .08);
      return [key, item, score];
    })
    .sort((a, b) => b[2] - a[2] || Number(a[1].order || 999) - Number(b[1].order || 999))
    .slice(0, 5);
  app.innerHTML = `
    <nav class="article-breadcrumb machine-breadcrumb" aria-label="パンくず"><a href="index.html">TOP</a><span>›</span><a href="${hubHref}">${hubLabel}</a>${novemberBreadcrumb}${decemberBreadcrumb}<span>›</span><span aria-current="page">${machine.shortName}</span></nav>
    <section class="machine-archive-hero theme-${machine.theme}${machine.image ? " has-image" : ""}">
      ${heroImage}
      <div class="machine-archive-copy"><span class="machine-kind">${machineReady ? (machine.year.includes("2026") ? "NEW MACHINE 2026" : machine.type === "slot" ? "POPULAR SLOT ARCHIVE" : "POPULAR PACHINKO ARCHIVE") : "COMING SOON・準備中"}</span><h1>${machine.name}</h1><p>${machine.catchcopy}</p>${machineReady ? "" : `<div class="machine-preparing-hero"><strong>準備中</strong><span>${availabilityLabel}</span></div>`}</div>
      <dl><div><dt>導入</dt><dd>${machine.year}</dd></div><div><dt>メーカー</dt><dd>${machine.maker}</dd></div><div><dt>分類</dt><dd>${machine.type === "slot" ? "パチスロ" : "パチンコ"}</dd></div></dl>
    </section>

    <nav class="machine-quick-nav" aria-label="ページ内メニュー"><button class="machine-favorite-button" id="machineFavoriteButton" type="button" aria-pressed="false"><span aria-hidden="true">☆</span> お気に入り</button><a href="#spec">スペック</a><a href="#ratio-chart">割合</a>${machine.sim.kind === "slot" ? '<a href="#cz-game">CZ</a>' : ""}<a href="#game-guide">遊び方</a><a href="#article">記事</a>${machineReady ? '<a href="#machineRanking">ランキング</a>' : ""}<a href="#faq">FAQ</a>${machine.readerGuide ? '<a href="#reader-guide">30秒要点</a>' : ""}${novemberQuickLink}${decemberQuickLink}<a href="community.html?machine=${slug}">投稿</a></nav>

    <section class="machine-intro" id="spec">
      <div><span class="machine-section-label">SPEC GUIDE</span><h2>主要スペック</h2><p>${machine.intro}</p><ul>${machine.points.map(point => `<li>${point}</li>`).join("")}</ul></div>
      <div class="machine-spec-grid">${machine.specs.map(([key, value]) => `<div><span>${key}</span><strong>${value}</strong></div>`).join("")}</div>
    </section>

    <section class="machine-simulator" id="simulator">
      <div class="machine-sim-head"><div><span class="machine-section-label">SIMULATOR</span><h2>${machine.shortName} 簡易シミュレーター</h2></div><span class="machine-sim-badge${machineReady ? "" : " is-preparing"}">${machineReady ? "娯楽用" : "準備中"}</span></div>
      ${machineReady ? "" : `<div class="machine-preparing-notice" role="status"><span>COMING SOON</span><strong>導入前のため、まだ遊べません</strong><p>${availabilityLabel}です。導入日を迎えると自動でスタートできるようになります。</p></div>`}
      <p class="machine-sim-note">投資・換金・収支は固定レートで計算します。パチンコは250玉貸し・28玉交換、スロットは46枚貸し・5.2枚交換です。${machine.sim.kind === "pachinko" ? "表記出玉と、打ち出し・オーバー入賞を簡易反映した実獲得出玉を分けて表示します。" : machine.sim.kind === "juggler" ? `Aタイプは開始時に${slotSettingLabel}を均等抽選し、BIG・REGを重ねて終了時に設定を発表します。` : machine.sim.uminchuFlow ? `開始時に${slotSettingLabel}を抽選し、BIG・REG、BONUS後32G、10連後のIREGUIを時系列表示します。設定は最終結果で発表します。` : machine.sim.tentenFlow ? `開始時に${slotSettingLabel}を抽選し、14G CZ、初回BONUS、40G高確、王宮BONUS、輪廻転天を時系列表示します。設定は最終結果で発表します。` : `開始時に${slotSettingLabel}を均等抽選し、AT中のレア役、上乗せ、特化ゾーン、上位ATを機種別の代表値で時系列表示します。設定は最終結果で発表します。`}</p>
      <div class="machine-sim-layout">
        <div class="machine-sim-controls">${controlMarkup()}<div class="machine-average-grid" id="averageGrid"></div><div class="machine-start-anchor" id="machineStartAnchor"></div><button class="machine-start-button${machineReady ? "" : " is-preparing"}" id="machineStart" type="button"${machineReady ? "" : " disabled"}><span>${machineReady ? startLabel : "準備中"}</span><small>${machineReady ? labels.join(" → ") : availabilityLabel}</small></button><button class="machine-sticky-back" id="machineStickyBack" type="button" aria-label="前のページに戻る" hidden><span aria-hidden="true">←</span><strong>戻る</strong></button></div>
        <div class="machine-result" id="machineResult" aria-live="polite"><span>${machineReady ? "RESULT" : "COMING SOON"}</span><strong id="resultTitle">${machineReady ? "開始ボタンを押してください" : "導入後に遊べます"}</strong><p id="resultSummary">${machineReady ? "平均値と今回の結果を比較できます。" : `${availabilityLabel}です。現在は記事とスペックをご覧ください。`}</p><div class="machine-result-stats" id="resultStats"></div><div class="machine-flow" id="resultFlow"></div><p class="machine-auto-save-status" id="machineAutoSaveStatus">${machineReady ? "結果は自動でマイ記録へ保存されます。" : "シミュレーターは導入日に自動で有効になります。"}</p><div class="achievement-unlock-toast" id="machineAchievementUnlock" hidden><span>TITLE UNLOCKED</span><strong></strong><small>新しい称号を獲得しました</small></div><div class="machine-result-actions"><a class="button" href="ranking.html#achievements">称号・記録を見る</a><a class="button" id="shareMachineResult" href="community.html?machine=${slug}&compose=simulation#simulationComposer">結果を投稿</a></div><div class="machine-ranking-entry"><label class="machine-ranking-name"><span>ランキングに登録する名前</span><input id="rankingNickname" type="text" maxlength="16" autocomplete="nickname" placeholder="ニックネーム"></label><button class="button primary" id="rankMachineResult" type="button" disabled>ランキングに登録</button></div></div>
      </div>
      <section class="machine-experience" id="machineExperience" role="dialog" aria-modal="true" aria-label="${machine.shortName}のシミュレーション演出" data-profile="${experienceProfile.key}" data-machine-type="${machine.type}" data-ui="arcade" data-game-mode="${gameExperienceMode}" hidden>
        <div class="machine-experience-head"><div class="machine-experience-ident"><span id="machineExperienceStep">STEP 1 / 5</span><strong>${machine.shortName}</strong></div><div><button type="button" id="machineExperienceSound" aria-pressed="${experienceSoundEnabled}">${experienceSoundEnabled ? "音ON" : "音OFF"}</button><button type="button" id="machineExperienceSkip">スキップ</button><button type="button" id="machineExperienceClose" aria-label="ゲーム画面を閉じる">×</button></div></div>
        <div class="machine-experience-hud"><div><span>${machine.sim.kind === "pachinko" ? "回転" : "ゲーム"}</span><strong id="machineExperienceCurrent">0${machine.sim.kind === "pachinko" ? "回転" : "G"}</strong></div><div><span>投資</span><strong id="machineExperienceInvestment">0円</strong></div><div><span id="machineExperienceRewardLabel">${machine.sim.kind === "juggler" ? "差枚" : machine.type === "slot" ? "獲得" : "実獲得"}</span><strong id="machineExperienceReward">0${machine.type === "slot" ? "枚" : "玉"}</strong></div></div>
        <div class="machine-experience-screen" id="machineExperienceScreen"><div class="machine-experience-art" aria-hidden="true"><span>${machine.shortName}</span></div><span id="machineExperiencePhase">${experienceProfile.system}</span><strong id="machineExperienceTitle">抽選中</strong><b id="machineExperienceValue">0</b><p id="machineExperienceMessage">結果を抽選しています</p><div class="machine-slot-at-status" id="machineSlotAtStatus" hidden><span>AT STATUS</span><strong id="machineSlotRemaining">残り 0G</strong><b id="machineSlotAddOn">上乗せ +0G</b><small id="machineSlotTotal">累計 0枚</small></div><div class="machine-expectation"><div><span id="machineExperienceCue">${experienceProfile.cue}</span><strong><small>演出期待度</small><b id="machineExperienceChance">抽選中</b></strong></div><div class="machine-expectation-track" role="progressbar" aria-label="演出期待度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="machineExperienceChanceBar"></i></div><small>シミュレーション上の抽選率目安</small></div></div>
        <div class="machine-atype-actions" id="machineAtypeActions" aria-label="Aタイプの続行選択" hidden><button type="button" class="machine-atype-button is-continue" id="machineAtypeContinue"><span>続ける</span><small>NEXT BONUS</small></button><button type="button" class="machine-atype-button is-stop" id="machineAtypeStop"><span>やめる</span><small>RESULT</small></button></div>
        <div class="machine-experience-finish-actions" id="machineExperienceFinishActions" aria-label="結果画面の操作" hidden><div class="machine-experience-session-total" id="machineExperienceSessionTotal" hidden><span>SESSION TOTAL</span><strong id="machineExperienceSessionBalance">合計収支 0円</strong><small id="machineExperienceSessionDetail">1回目の結果を集計します</small></div><button type="button" class="machine-experience-finish-button is-replay" id="machineExperienceReplay"><span>もう一度</span><small>REPLAY</small></button><button type="button" class="machine-experience-finish-button is-back" id="machineExperienceBack"><span>戻る</span><small>BACK</small></button></div>
        <button type="button" class="machine-experience-push" id="machineExperiencePush" hidden>PUSH</button>
        <div class="machine-experience-progress" aria-label="演出の進行状況"><span data-machine-experience-step="0">${machine.sim.kind === "juggler" ? "スタート" : "通常"}</span><span data-machine-experience-step="1">${machine.sim.kind === "pachinko" ? "大当り" : machine.sim.kind === "juggler" ? "ボーナス" : "CZ"}</span><span data-machine-experience-step="2">${machine.sim.kind === "pachinko" ? "RUSH" : machine.sim.kind === "juggler" ? "続行判断" : "AT"}</span><span data-machine-experience-step="3">${machine.sim.kind === "pachinko" ? "連チャン" : machine.sim.kind === "juggler" ? "実戦データ" : "上位"}</span><span data-machine-experience-step="4">結果</span></div>
        <section class="machine-experience-actions" id="machineExperienceActions" aria-labelledby="machineExperienceActionsTitle" hidden><div><span>RESULT</span><strong id="machineExperienceActionsTitle">今回の結果</strong><small id="machineOverlaySaveStatus">マイ記録へ自動保存しました</small></div><div class="machine-experience-result-stats" id="machineExperienceResultStats"></div><div class="machine-experience-main-actions"><button type="button" class="button primary" id="machineOverlayRetry">もう一度遊ぶ</button><a class="button" href="ranking.html">マイ記録</a><a class="button is-post" id="machineOverlayPost" href="community.html?machine=${slug}&compose=simulation#simulationComposer">結果を投稿</a></div><div class="machine-experience-rank"><label for="machineOverlayNickname">ランキング表示名<input id="machineOverlayNickname" type="text" maxlength="16" autocomplete="nickname" placeholder="ニックネーム"></label><button type="button" class="button is-rank" id="machineOverlayRank">ランキングに登録</button></div><button type="button" class="machine-experience-return" id="machineOverlayClose">機種ページへ戻る</button></section>
      </section>
    </section>

    <section class="machine-ranking" id="machineRanking" aria-labelledby="machineRankingTitle">
      <div class="machine-ranking-head"><div><span class="machine-section-label">MACHINE RANKING</span><h2 id="machineRankingTitle">${machine.shortName} ランキング</h2><p>差${machine.sim.kind === "pachinko" ? "玉" : "枚"}が多い順。同点の場合は投資が少ない記録を上位にします。</p><p class="machine-ranking-rules">条件：${machine.sim.kind === "pachinko" ? "1,000円250玉貸し・28玉交換・機種別回転率。" : machine.sim.kind === "juggler" ? `${slotSettingLabel}均等ランダム・8,000G完走・1,000円46枚貸し・5.2枚交換。途中終了はマイ記録だけに保存します。` : `${slotSettingLabel}均等ランダム・1,000円46枚貸し・5.2枚交換・機種別ベース。ランキングにも抽選された設定を表示します。`}</p></div><span class="machine-ranking-mode" id="machineRankingMode">この端末の記録</span></div>
      ${machine.type === "slot" ? `<div class="machine-setting-legend" aria-label="設定バッジの色"><span>設定色</span>${slotSettingPool.map(setting => `<b class="machine-setting-badge is-setting-${setting}">設定${setting}</b>`).join("")}</div>` : ""}
      <div class="machine-ranking-self" id="machineRankingSelf"><span>MY BEST</span><strong>まだ記録がありません</strong><small>シミュレーション後にランキングへ登録できます。</small></div>
      <ol class="machine-ranking-list" id="machineRankingList"><li class="is-empty">まだランキング記録がありません。</li></ol>
      <p class="machine-ranking-notice" id="machineRankingNotice" aria-live="polite">公開ランキングへ接続しています。</p>
    </section>

    <section class="machine-article-layout" id="article">
      <article class="machine-article">
        <span class="machine-section-label">MACHINE ARTICLE</span><h2>${machine.name}の見どころ</h2>
        <div class="machine-article-meta"><span>編集・検証：<a href="about.html">ICHIGEKI編集部</a></span><time datetime="${editorialUpdated}">更新：${editorialUpdatedLabel}</time></div>
        <p>${machine.intro}</p>
        ${snapshotMarkup()}
        ${specRatioMarkup()}
        ${czGameMarkup()}
        ${readerGuideMarkup()}
        ${detailedGameGuideMarkup()}
        ${articleMarkup()}
        ${resultGuideMarkup()}
        ${machineFaqMarkup()}
        <div class="machine-article-sim-cta"><span>SIMULATOR</span><strong>${machineReady ? "読んだ内容を固定条件で試す" : "導入前・シミュレーター準備中"}</strong><p>${machineReady ? "同じ貸出・交換条件で、初当りから最終結果までを体験できます。結果は自動でマイ記録へ保存されます。" : `${availabilityLabel}です。導入後に固定条件で遊べるようになります。`}</p>${machineReady ? `<a class="button primary" href="#simulator">${startLabel}</a>` : '<span class="button is-disabled" aria-disabled="true">準備中</span>'}</div>
        <h3>関連ガイド</h3><div class="next-links">${isNovemberNewMachine ? '<a href="new-machines-2026-11.html">11月新台10機種を比較</a>' : ""}${isDecemberNewMachine ? '<a href="new-machines-2026-12.html">12月新台の先行比較</a>' : ""}<a href="average-game-guide.html">平均G・平均回転</a><a href="continuation-rate-guide.html">継続率と平均連</a><a href="simulation-policy.html">計算・掲載方針</a></div>
        <h3>参照情報</h3><ul class="machine-sources">${machine.sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a></li>`).join("")}</ul>
      </article>
      <aside class="machine-side-list"><strong>似た条件のおすすめ</strong>${neighbors.map(([key, item]) => `<a href="${key}.html"><span>${item.type === "slot" ? `平均${Number(item.sim.mainRate || item.sim.triggerRate).toLocaleString("ja-JP")}G` : `平均${Number(item.sim.hitRate).toLocaleString("ja-JP")}回転`}</span>${item.shortName}</a>`).join("")}</aside>
    </section>`;

  const favoriteButton = document.getElementById("machineFavoriteButton");
  function updateFavoriteButton() {
    const isFavorite = readMachineList(FAVORITE_MACHINES_KEY).includes(slug);
    favoriteButton?.setAttribute("aria-pressed", String(isFavorite));
    if (favoriteButton) favoriteButton.innerHTML = `<span aria-hidden="true">${isFavorite ? "★" : "☆"}</span> ${isFavorite ? "お気に入り済み" : "お気に入り"}`;
  }
  favoriteButton?.addEventListener("click", () => {
    const favorites = readMachineList(FAVORITE_MACHINES_KEY).filter(item => machines[item]);
    const isFavorite = favorites.includes(slug);
    writeMachineList(FAVORITE_MACHINES_KEY, isFavorite ? favorites.filter(item => item !== slug) : [slug, ...favorites].slice(0, 20));
    updateFavoriteButton();
  });
  updateFavoriteButton();

  function updateAverages() {
    const grid = document.getElementById("averageGrid");
    if (machine.sim.kind === "pachinko") {
      const rate = Math.max(machine.sim.minSpins, Math.min(machine.sim.maxSpins, Number(document.getElementById("playRate").value) || machine.sim.spinsPer1k));
      const exchangeBalls = Math.max(20, Number(document.getElementById("exchangeBalls").value) || RANKING_RATE.pachinko.exchangeBalls);
      const averageInvestment = Math.round((machine.sim.hitRate / rate * 1000) / 100) * 100;
      grid.innerHTML = `<div><span>平均初当り</span><strong>${machine.sim.hitRate.toFixed(1)}回転</strong></div><div><span>平均投資目安</span><strong>${yen.format(averageInvestment)}円</strong></div><div><span>交換単価</span><strong>${(100 / exchangeBalls).toFixed(2)}円/玉</strong></div><div><span>スタート</span><strong>${machine.sim.startType}</strong></div>`;
    } else if (machine.sim.kind === "juggler") {
      const exchangeCoins = Math.max(4, Number(document.getElementById("exchangeCoins").value) || RANKING_RATE.slot.exchangeCoins);
      grid.innerHTML = `<div><span>設定抽選</span><strong>1〜6均等</strong></div><div><span>上限ゲーム数</span><strong>${yen.format(machine.sim.games)}G</strong></div><div><span>設定1基準 BIG</span><strong>1/${machine.sim.bigRate}</strong></div><div><span>設定1基準 REG</span><strong>1/${machine.sim.regRate}</strong></div><div><span>交換単価</span><strong>${(100 / exchangeCoins).toFixed(2)}円/枚</strong></div>`;
    } else {
      const base = Math.max(20, Number(document.getElementById("baseRate").value) || machine.sim.base50);
      const lendCoins = Math.max(40, Number(document.getElementById("lendCoins").value) || RANKING_RATE.slot.lendCoins);
      const exchangeCoins = Math.max(4, Number(document.getElementById("exchangeCoins").value) || RANKING_RATE.slot.exchangeCoins);
      const coinUnit = Math.max(1, Number(document.getElementById("coinUnit").value) || machine.sim.coinUnit);
      const gamesPerThousand = base * lendCoins / 50;
      const averageInvestment = Math.round((machine.sim.mainRate / gamesPerThousand * 1000) / 100) * 100;
      const averageCoinIn = machine.sim.mainRate / base * 50;
      const salesIndex = Math.round(averageCoinIn * coinUnit);
      const settingModelLabel = machine.sim.settingRates ? "公開設定別値" : "共通固定補正";
      const initialHitLabel = machine.initialHitLabel ? "ボーナス初当り" : machine.sim.mainLabel;
      grid.innerHTML = `<div><span>設定抽選</span><strong>${slotSettingNumberLabel}均等</strong></div><div><span>設定差モデル</span><strong>${settingModelLabel}</strong></div><div><span>設定${slotBaselineSetting}基準の平均${initialHitLabel}まで</span><strong>${machine.sim.mainRate.toFixed(1)}G</strong></div><div><span>設定${slotBaselineSetting}基準の平均投資</span><strong>${yen.format(averageInvestment)}円</strong></div><div><span>交換単価</span><strong>${(100 / exchangeCoins).toFixed(2)}円/枚</strong></div><div><span>コイン単価</span><strong>${coinUnit.toFixed(1)}円・${riskLabel(coinUnit)}</strong></div><div><span>単価換算の台売上指標</span><strong>${yen.format(salesIndex)}円</strong></div>`;
    }
  }

  function runPachinko() {
    const sim = machine.sim;
    const playRate = Math.max(sim.minSpins, Math.min(sim.maxSpins, Number(document.getElementById("playRate").value) || sim.spinsPer1k));
    const lendBalls = Math.max(200, Number(document.getElementById("lendBalls").value) || RANKING_RATE.pachinko.lendBalls);
    const exchangeBalls = Math.max(20, Number(document.getElementById("exchangeBalls").value) || RANKING_RATE.pachinko.exchangeBalls);
    const spins = geometric(sim.hitRate);
    const investmentUnits = Math.ceil(spins / playRate);
    const investment = investmentUnits * 1000;
    const rush = Math.random() < sim.rushEntry;
    const displayedAwards = [rush ? sim.firstPayoutIn : sim.firstPayoutOut];
    let hits = 1;
    let upper = rush && Boolean(sim.upperLabel) && Math.random() < (sim.upperDirectChance || 0);
    let upperEntryHit = upper ? 1 : 0;
    if (upper && sim.upperEntryPayout) displayedAwards[0] = sim.upperEntryPayout;
    const flow = [`${spins}回転で${sim.hitLabel}`, rush ? `${sim.rushLabel}突入` : `${sim.rushLabel}非突入`];
    if (upper) flow.push(`${sim.upperLabel}直行`);
    if (rush) {
      while (hits < 100 && Math.random() < (upper ? sim.upperContinue : sim.rushContinue)) {
        hits += 1;
        displayedAwards.push(weighted(sim.rushPayouts));
        if (!upper && sim.upperLabel) {
          const stagedChallenge = Boolean(sim.upperChallengeSuccess) && (hits >= (sim.upperAfterHits || Infinity) || Math.random() < (sim.upperEarlyChance || 0));
          if (stagedChallenge) {
            const challengeLabel = sim.upperChallenge || `${sim.upperLabel}突入チャレンジ`;
            flow.push(`${challengeLabel}突入`);
            if (Math.random() < sim.upperChallengeSuccess) {
              upper = true;
              upperEntryHit = hits;
              flow.push(`${sim.upperLabel}突入`);
            } else {
              flow.push(`${challengeLabel}失敗`);
              if (sim.upperChallengeEndsOnFailure) break;
            }
          } else if (Math.random() < (sim.upperUpgradeChance || 0)) {
            upper = true;
            upperEntryHit = hits;
            flow.push(`${sim.upperLabel}昇格`);
          }
        }
      }
      flow.push(`${hits}回当たりで終了`);
    }
    const actualAwards = displayedAwards.map(actualPachinkoAward);
    const displayedPayout = displayedAwards.reduce((total, award) => total + award, 0);
    const payout = actualAwards.reduce((total, award) => total + award, 0);
    const payoutTimeline = actualAwards.reduce((timeline, award) => {
      timeline.push((timeline[timeline.length - 1] || 0) + award);
      return timeline;
    }, []);
    const rushGameModel = pachinkoRushGameModel(sim);
    const rushGameTimeline = Array.from({ length: hits }, () => conditionalRushGame(rushGameModel.rate, rushGameModel.games, true));
    flow.push(`表記${yen.format(displayedPayout)}玉 → 実獲得${yen.format(payout)}玉`);
    const usedBalls = investmentUnits * lendBalls;
    const diff = payout - usedBalls;
    const exchangeValue = Math.round(payout / exchangeBalls * 100);
    const balanceYen = exchangeValue - investment;
    const rankInvestmentUnits = Math.ceil(spins / sim.spinsPer1k);
    const rankInvestment = rankInvestmentUnits * 1000;
    const rankScore = Math.round(payout - rankInvestmentUnits * RANKING_RATE.pachinko.lendBalls);
    const rushResultLabel = upper ? sim.upperLabel : rush ? sim.rushLabel : "通常";
    return { title: rush ? `${rushResultLabel} ${hits}回当たり` : "通常へ", summary: `${spins}回転で初当り。${upper ? `${sim.upperLabel}まで到達しました。` : rush ? `${sim.rushLabel}に突入しました。` : "RUSHには突入しませんでした。"} 表記${yen.format(displayedPayout)}玉に対して、今回の実獲得は${yen.format(payout)}玉です。`, stats: [["今回の回転数", `${yen.format(spins)}回転`], ["投資目安", `${yen.format(investment)}円`], ["表記出玉", `${yen.format(displayedPayout)}玉`], ["実獲得出玉", `${yen.format(payout)}玉`], ["換金目安", `${yen.format(exchangeValue)}円`], ["差玉目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}玉`], ["収支目安", `${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円`], ["利用レート", `${yen.format(lendBalls)}玉貸し・${exchangeBalls}玉交換`]], flow, share: `${machine.shortName}｜${yen.format(spins)}回転｜投資${yen.format(investment)}円｜${rushResultLabel}｜${hits}回当たり｜表記${yen.format(displayedPayout)}玉｜実獲得${yen.format(payout)}玉｜換金${yen.format(exchangeValue)}円｜収支${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円｜${yen.format(lendBalls)}玉貸し・${exchangeBalls}玉交換`, score: Math.round(diff), rankScore, rankInvestment, scoreKind: "balls", balanceYen, exchangeValue, investment, displayedPayout, payout, attempts: spins, experience: { kind: "pachinko", attempts: spins, unit: "回転", hitLabel: sim.hitLabel, hitChance: 100 / sim.hitRate, entered: rush, entryChance: sim.rushEntry * 100, mainLabel: sim.rushLabel, continueChance: sim.rushContinue * 100, upper, upperEntryHit, upperLabel: sim.upperLabel || "", upperContinueChance: (sim.upperContinue || sim.rushContinue) * 100, hits, displayedPayout, payout, displayedAwards: [...displayedAwards], actualAwards: [...actualAwards], payoutTimeline, rushGameTimeline, rushGameLimit: rushGameModel.games, payoutUnit: "玉" } };
  }

  function runSlot(setting) {
    const sim = machine.sim;
    const profile = settingProfile(setting);
    const publishedSetting = sim.settingRates?.[setting] || null;
    const hasPublishedTriggerRate = Number(publishedSetting?.trigger) > 0;
    const hasPublishedMainRate = Number(publishedSetting?.main) > 0;
    const hasPublishedSettingRates = hasPublishedTriggerRate || hasPublishedMainRate;
    const mainRate = hasPublishedMainRate ? Number(publishedSetting.main) : Math.max(1, sim.mainRate * profile.rate);
    const triggerRate = hasPublishedTriggerRate
      ? Number(publishedSetting.trigger)
      : hasPublishedMainRate
        ? Math.max(1, mainRate * sim.triggerRate / sim.mainRate)
        : Math.max(1, sim.triggerRate * profile.rate);
    const publishedEntry = Number(publishedSetting?.entry);
    const triggerSuccess = sim.godzillaEva2Flow || sim.mahoakoFlow || sim.uminchuFlow
      ? 1
      : Number.isFinite(publishedEntry) && publishedEntry >= 0
        ? Math.min(1, publishedEntry)
        : hasPublishedSettingRates && Number(publishedSetting?.main) > 0
          ? Math.min(1, Math.max(0.01, triggerRate / mainRate))
          : Math.min(1, sim.triggerSuccess + profile.entry);
    const specialChance = Number(publishedSetting?.special) >= 0
      ? Math.min(0.98, Number(publishedSetting.special))
      : hasPublishedSettingRates ? sim.specialChance : Math.min(0.98, sim.specialChance + profile.special);
    const upperChance = Number(publishedSetting?.upper) >= 0
      ? Math.min(0.98, Number(publishedSetting.upper))
      : hasPublishedSettingRates ? sim.upperChance : Math.min(0.98, sim.upperChance + profile.upper);
    const settingModelLabel = hasPublishedTriggerRate && hasPublishedMainRate
      ? sim.godzillaEva2Flow ? "公開設定別値（BONUS・AT初当り）" : sim.mahoakoFlow ? "公開設定別値（CZ・BONUS・AT初当り）" : sim.uminchuFlow ? "公開設定別値（BONUS初当り・合算）" : sim.tentenFlow ? "公開設定別値（CZ・BONUS初当り）" : "公開設定別値（CZ・初当り）"
      : hasPublishedMainRate
        ? "公開設定別値（初当り）＋CZ簡易換算"
        : "サイト共通補正モデル";
    const base = Math.max(20, Number(document.getElementById("baseRate").value) || sim.base50);
    const lendCoins = Math.max(40, Number(document.getElementById("lendCoins").value) || RANKING_RATE.slot.lendCoins);
    const exchangeCoins = Math.max(4, Number(document.getElementById("exchangeCoins").value) || RANKING_RATE.slot.exchangeCoins);
    const coinUnit = Math.max(1, Number(document.getElementById("coinUnit").value) || sim.coinUnit);
    const games = geometric(triggerRate);
    const gamesPerThousand = base * lendCoins / 50;
    const investmentUnits = Math.ceil(games / gamesPerThousand);
    const investment = investmentUnits * 1000;
    const usedCoins = investmentUnits * lendCoins;
    const flow = [`${games}Gで${sim.triggerLabel}`];
    const atEvents = [];
    let payout = 0;
    let triggerSucceeded = Math.random() < triggerSuccess;
    let entered = triggerSucceeded;
    let entryBonus = null;
    let upper = false;
    let addOnCount = 0;
    let addOnTotal = 0;
    let addOnGamesTotal = 0;
    let coinAddOnCount = 0;
    let coinAddOnTotal = 0;
    let bonusCount = 0;
    let bonusPayoutTotal = 0;
    let upperLoops = 0;
    let upperPayoutTotal = 0;
    let atGamesTotal = 0;
    let karakuriJudgeAttempts = 0;
    let karakuriJudgeSuccesses = 0;
    let karakuriUpperRoute = "";
    let setPushUpperResolved = false;
    let battleBonusSets = 0;
    let battleContinuationRate = 0;
    let sgRushSets = 0;
    let sgScenarioName = "";
    let kabaneriStBonuses = 0;
    let kabaneriUpperMode = "";
    let otomeAddedGames = 0;
    let otomeBonusCount = 0;
    let otomeAwakeningCount = 0;
    let otomeBattleWon = false;
    let cycleRounds = 0;
    let cycleContinues = 0;
    let uminchuBigCount = 0;
    let uminchuRegCount = 0;
    let uminchuIreguiCount = 0;
    let uminchuStockCount = 0;
    let uminchuMaxChain = 0;
    let tentenPalaceBonusCount = 0;
    let tentenDuetCount = 0;
    let tentenStockChallengeCount = 0;
    let tentenStockCount = 0;
    let tentenUpperBonusCount = 0;
    if (triggerSucceeded && Array.isArray(sim.entryBonusAwards) && sim.entryBonusAwards.length) {
      const entryBonusTemplate = weighted(sim.entryBonusAwards);
      const entryChance = Math.max(0, Math.min(1, Number(entryBonusTemplate.atChance) || 0));
      entered = Math.random() < entryChance;
      const payoutRange = entered ? entryBonusTemplate.payoutOnEntry : entryBonusTemplate.payoutOnMiss;
      const bonusPayout = Array.isArray(payoutRange) && payoutRange.length >= 2
        ? randomInt(Math.min(...payoutRange), Math.max(...payoutRange))
        : Math.max(0, Number(entryBonusTemplate.payout) || 0);
      const usesOutcomePayout = Array.isArray(entryBonusTemplate.payoutOnEntry) || Array.isArray(entryBonusTemplate.payoutOnMiss);
      const bonusGames = Math.max(1, usesOutcomePayout
        ? Math.round(bonusPayout / Math.max(0.1, Number(sim.atPureIncrease) || 4))
        : Number(entryBonusTemplate.games) || Math.round(bonusPayout / Math.max(0.1, Number(sim.atPureIncrease) || 4)));
      entryBonus = { ...entryBonusTemplate, payout: bonusPayout, games: bonusGames, averagePayout: Number(entryBonusTemplate.payout) || bonusPayout, outcome: entered ? "RUSH突破" : "RUSH非突破" };
      payout = Math.min(bonusPayout, SLOT_COMPLETE_LIMIT);
      atGamesTotal += bonusGames;
      atEvents.push({ kind: "entry-bonus", label: entryBonus.label || "初当りBONUS", games: bonusGames, award: payout, cumulative: payout, atChance: entryChance, outcome: entryBonus.outcome });
      flow.push(`${entryBonus.label || "初当りBONUS"} 約${yen.format(payout)}枚`);
    }
    if (!triggerSucceeded) {
      flow.push(`${machine.initialHitLabel || sim.mainLabel}非当選`);
    } else if (!entered) {
      flow.push(`${sim.mainLabel}非突入`);
    } else {
      const entryPayout = payout;
      const normalAward = Array.isArray(sim.normalAwards) && sim.normalAwards.length
        ? weighted(sim.normalAwards)
        : null;
      let basePayout = normalAward
        ? Math.max(0, Number(normalAward.payout) || 0)
        : randomInt(sim.normalMin, sim.normalMax);
      const pureIncreaseRows = (machine.specs || []).filter(([label]) => /純増/.test(label));
      const normalPureIncreaseText = pureIncreaseRows.find(([label]) => !/上位|青島|真強|千日|EXTRA|特化/.test(label))?.[1]
        || pureIncreaseRows[0]?.[1]
        || "";
      const upperPureIncreaseText = pureIncreaseRows.find(([label]) => /上位|青島|真強|千日|EXTRA|特化/.test(label))?.[1] || "";
      const publishedPureIncrease = Number.parseFloat(String(normalPureIncreaseText).match(/[\d.]+/)?.[0] || "");
      const publishedUpperPureIncrease = Number.parseFloat(String(upperPureIncreaseText).match(/[\d.]+/)?.[0] || "");
      const atPureIncrease = Math.max(0.1, Number(sim.atPureIncrease) || publishedPureIncrease || 4);
      const upperPureIncrease = Math.max(0.1, Number(sim.upperPureIncrease) || publishedUpperPureIncrease || atPureIncrease);
      const baseAtGames = Math.max(1, Math.min(1000, Number(normalAward?.games) || Math.round(basePayout / atPureIncrease)));
      const baseEventLabel = normalAward?.label || sim.mainLabel;
      payout = Math.min(SLOT_COMPLETE_LIMIT, entryPayout + basePayout);
      flow.push(`${sim.mainLabel}突入`);
      let rushSetCount = 1;
      if (sim.uminchuFlow) {
        payout = entryPayout;
        basePayout = 0;
        let chainCount = 0;
        let pendingStocks = 0;
        let enteredIregui = false;
        const initialBigChance = Math.max(0, Math.min(1, Number(sim.uminchuInitialBigChanceBySetting?.[setting]) || 0.50));
        const chainBigChance = Math.max(0, Math.min(1, Number(sim.uminchuChainBigChanceBySetting?.[setting]) || 0.80));
        const appendBonus = (source, isInitial = false) => {
          const isBig = Math.random() < (isInitial ? initialBigChance : chainBigChance);
          const bonusGames = isBig ? 53 : 12;
          const requestedAward = isBig
            ? Number(weighted([[170, 0.10], [185, 0.20], [202, 0.40], [218, 0.20], [235, 0.10]])) || 202
            : Number(weighted([[48, 0.20], [53, 0.60], [58, 0.20]])) || 53;
          const award = Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout));
          const stockChance = isBig ? 0.28 : 0.12;
          const stocked = payout + award < SLOT_COMPLETE_LIMIT && Math.random() < stockChance ? 1 : 0;
          chainCount += 1;
          payout += award;
          bonusCount += 1;
          bonusPayoutTotal += award;
          atGamesTotal += bonusGames;
          if (isBig) uminchuBigCount += 1;
          else uminchuRegCount += 1;
          pendingStocks += stocked;
          uminchuStockCount += stocked;
          uminchuMaxChain = Math.max(uminchuMaxChain, chainCount);
          atEvents.push({ kind: "uminchu-bonus", label: isBig ? "BIG BONUS" : "REG BONUS", bonusType: isBig ? "BIG" : "REG", games: bonusGames, award, cumulative: payout, chain: chainCount, source, stocked, jacSets: isBig ? 3 : 1 });
          flow.push(`${chainCount}連目 ${isBig ? "BIG" : "REG"} +${award}枚${stocked ? "・BONUSストック獲得" : ""}`);
        };

        appendBonus("初当り", true);
        while (chainCount < 50 && payout < SLOT_COMPLETE_LIMIT) {
          if (chainCount % 10 === 0) {
            const stocks = Math.max(0, Math.min(8, Number(weighted(sim.uminchuIreguiStocks || [[4, 1]])) || 0));
            const fruits = Array.from({ length: 8 }, () => weighted([["弱チェリー", 0.38], ["オレンジ", 0.30], ["強チェリー", 0.20], ["プラム", 0.12]]));
            enteredIregui = true;
            upper = true;
            upperLoops += 1;
            uminchuIreguiCount += 1;
            uminchuStockCount += stocks;
            pendingStocks += stocks;
            atGamesTotal += 8;
            atEvents.push({ kind: "uminchu-iregui", label: "IREGUI", games: 8, stocks, fruits, cumulative: payout, visit: uminchuIreguiCount, chain: chainCount });
            flow.push(`BONUS ${chainCount}連 → IREGUI ${stocks}個ストック`);
          }

          const stockUsed = pendingStocks > 0;
          const continueChance = stockUsed ? 1 : enteredIregui ? Number(sim.uminchuPostIreguiContinue) || 0.80 : Number(sim.uminchuPreIreguiContinue) || 0.64;
          const continued = stockUsed || Math.random() < continueChance;
          const zoneGames = continued ? randomInt(1, 32) : 32;
          if (stockUsed) pendingStocks -= 1;
          atGamesTotal += zoneGames;
          atEvents.push({ kind: "uminchu-zone", label: "BONUS後32G", games: zoneGames, award: 0, cumulative: payout, chain: chainCount, continued, stockUsed, chance: continueChance * 100, pendingStocks, source: stockUsed ? "BONUSストック放出" : "フルーツ連・自力当選" });
          if (!continued) {
            flow.push(`${chainCount}連後 32G終了`);
            break;
          }
          cycleContinues += 1;
          appendBonus(stockUsed ? "BONUSストック放出" : "フルーツ連・自力当選");
        }
        cycleRounds = chainCount;
        basePayout = payout - entryPayout;
      } else if (sim.tentenFlow) {
        payout = entryPayout;
        basePayout = 0;
        let highState = "default";
        let highGames = 40;
        let pendingStocks = 0;
        let upperTicket = false;
        const stateLabels = { default: "王宮舞踏会", anis: "withアニス", yuffie: "withユフィ", duet: "withデュエット" };
        const stateRates = sim.tentenHighRates || { default: 34.1, anis: 20.6, yuffie: 20.6, duet: 14.4 };
        const initialAward = Math.min(Number(sim.tentenInitialPayout) || 100, SLOT_COMPLETE_LIMIT - payout);
        const initialGames = Math.max(1, Math.round(initialAward / 4.5));
        payout += initialAward;
        atGamesTotal += initialGames;
        atEvents.push({ kind: "tenten-first-bonus", label: "転天BONUS", games: initialGames, award: initialAward, cumulative: payout });
        flow.push(`転天BONUS +${initialAward}枚 → 王宮舞踏会40G`);

        const choosePalaceBonus = (state, viaJudge, upperMode = false) => {
          if (upperMode || state === "duet") return { key: "duet", label: "デュエットBIG BONUS", payout: 200, nextState: "duet" };
          if (state === "anis") return weighted([[{ key: "white", label: "BIG BONUS", payout: 150, nextState: "default" }, 0.34], [{ key: "anis", label: "BIG BONUS withアニス", payout: 150, nextState: "anis" }, 0.652], [{ key: "duet", label: "デュエットBIG BONUS", payout: 200, nextState: "duet" }, 0.008]]);
          if (state === "yuffie") return weighted([[{ key: "white", label: "BIG BONUS", payout: 150, nextState: "default" }, 0.34], [{ key: "yuffie", label: "BIG BONUS withユフィ", payout: 150, nextState: "yuffie" }, 0.652], [{ key: "duet", label: "デュエットBIG BONUS", payout: 200, nextState: "duet" }, 0.008]]);
          return viaJudge
            ? weighted([[{ key: "anis", label: "BIG BONUS withアニス", payout: 150, nextState: "anis" }, 0.492], [{ key: "yuffie", label: "BIG BONUS withユフィ", payout: 150, nextState: "yuffie" }, 0.492], [{ key: "duet", label: "デュエットBIG BONUS", payout: 200, nextState: "duet" }, 0.016]])
            : { key: "white", label: "BIG BONUS", payout: 150, nextState: "default" };
        };

        const appendPalaceBonus = (bonus, source, upperMode = false) => {
          const award = Math.max(0, Math.min(Number(bonus.payout) || 150, SLOT_COMPLETE_LIMIT - payout));
          const bonusGames = Math.max(1, Math.round(award / 4.5));
          payout += award;
          atGamesTotal += bonusGames;
          bonusCount += 1;
          bonusPayoutTotal += award;
          tentenPalaceBonusCount += 1;
          if (bonus.key === "duet") tentenDuetCount += 1;
          if (upperMode) tentenUpperBonusCount += 1;
          atEvents.push({ kind: "tenten-bonus", label: bonus.label, bonusType: bonus.key, games: bonusGames, award, cumulative: payout, number: tentenPalaceBonusCount, source, upper: upperMode, nextState: bonus.nextState });
          flow.push(`${bonus.label} +${award}枚${upperMode ? "・輪廻転天" : ""}`);
        };

        while (highGames > 0 && tentenPalaceBonusCount < 15 && payout < SLOT_COMPLETE_LIMIT) {
          const rate = Math.max(1, Number(stateRates[highState]) || 34.1);
          const stockUsed = pendingStocks > 0;
          const hitChance = stockUsed ? 1 : 1 - Math.pow(1 - 1 / rate, highGames);
          const continued = stockUsed || Math.random() < hitChance;
          const eventGames = continued ? randomInt(1, highGames) : highGames;
          if (stockUsed) pendingStocks -= 1;
          highGames -= eventGames;
          atGamesTotal += eventGames;
          const viaJudge = continued && !stockUsed && Math.random() < 0.28;
          atEvents.push({ kind: "tenten-high", label: stateLabels[highState], games: eventGames, remaining: highGames, rate, chance: hitChance * 100, continued, stockUsed, viaJudge, cumulative: payout, upper: false });
          if (!continued) {
            flow.push(`${stateLabels[highState]} 残り0G・BONUS高確終了`);
            break;
          }
          const bonus = choosePalaceBonus(highState, viaJudge, false);
          appendPalaceBonus(bonus, stockUsed ? "BONUSストック放出" : viaJudge ? "革命ジャッジ成功" : "7揃い", false);
          highState = bonus.nextState;
          if (highState !== "default") highGames = Math.max(highGames, 15);

          if (tentenPalaceBonusCount === 3) {
            const added = Number(weighted([[30, 0.60], [60, 0.30], [90, 0.10]])) || 30;
            highGames += added;
            atGamesTotal += 5;
            addOnCount += 1;
            addOnGamesTotal += added;
            atEvents.push({ kind: "tenten-honki", label: "本気チャレチャンス", games: 5, gameAdd: added, remaining: highGames, cumulative: payout });
            flow.push(`本気チャレチャンス +${added}G`);
          }

          if (Math.random() < 0.05 && payout < SLOT_COMPLETE_LIMIT) {
            const stocks = Math.max(1, Number(weighted(sim.tentenStockAwards || [[2, 1]])) || 2);
            pendingStocks += stocks;
            tentenStockCount += stocks;
            tentenStockChallengeCount += 1;
            atGamesTotal += 8;
            atEvents.push({ kind: "tenten-stock", label: "転天STOCKチャレンジ", games: 8, stocks, cumulative: payout, number: tentenStockChallengeCount });
            flow.push(`転天STOCKチャレンジ ${stocks}個ストック`);
          }

          const ticketChance = tentenPalaceBonusCount >= 15 ? 1 : tentenPalaceBonusCount >= 10 ? 0.22 : tentenPalaceBonusCount >= 7 ? 0.14 : tentenPalaceBonusCount >= 5 ? 0.09 : 0.05;
          if (!upperTicket && tentenPalaceBonusCount >= 3 && Math.random() < ticketChance) upperTicket = true;
        }

        if (upperTicket && payout < SLOT_COMPLETE_LIMIT) {
          const upperSuccess = Math.random() < (Number(sim.tentenUpperSuccess) || 0.50);
          atGamesTotal += 10;
          atEvents.push({ kind: "tenten-upper-challenge", label: "輪廻転天チャレンジ", games: 10, chance: (Number(sim.tentenUpperSuccess) || 0.50) * 100, success: upperSuccess, cumulative: payout });
          flow.push(`輪廻転天チャレンジ ${upperSuccess ? "成功" : "失敗"}`);
          if (upperSuccess) {
            upper = true;
            upperLoops = 1;
            const episodeAward = Math.min(100, SLOT_COMPLETE_LIMIT - payout);
            payout += episodeAward;
            atGamesTotal += 22;
            atEvents.push({ kind: "tenten-first-bonus", label: "エピソードBONUS 輪廻転天", games: 22, award: episodeAward, cumulative: payout, upper: true });
            flow.push(`エピソードBONUS 輪廻転天 +${episodeAward}枚`);
            for (let upperRound = 1; upperRound <= 15 && payout < SLOT_COMPLETE_LIMIT; upperRound += 1) {
              const upperContinued = Math.random() < 0.94;
              const eventGames = upperContinued ? randomInt(1, 20) : 20;
              atGamesTotal += eventGames;
              atEvents.push({ kind: "tenten-high", label: "王宮舞踏会～輪廻転天～", games: eventGames, remaining: upperContinued ? 20 : 0, rate: 14.4, chance: 94, continued: upperContinued, stockUsed: false, viaJudge: false, cumulative: payout, upper: true, upperRound });
              if (!upperContinued) break;
              appendPalaceBonus(choosePalaceBonus("duet", false, true), "withデュエット超高確", true);
            }
          }
        }
        cycleRounds = tentenPalaceBonusCount;
        cycleContinues = Math.max(0, tentenPalaceBonusCount - 1);
        basePayout = payout - entryPayout;
      } else if (sim.cycleFlow) {
        payout = entryPayout;
        basePayout = 0;
        const cycle = sim.cycleFlow;
        const maxRounds = Math.max(1, Math.min(30, Number(cycle.maxRounds) || 10));
        const continueChance = Math.max(0.05, Math.min(0.98, Number(cycle.continueChance) || 0.72));
        for (let round = 1; round <= maxRounds && payout < SLOT_COMPLETE_LIMIT; round += 1) {
          const roundConfig = Array.isArray(cycle.rounds) && cycle.rounds.length
            ? cycle.rounds[Math.min(round - 1, cycle.rounds.length - 1)]
            : null;
          const roundGames = roundConfig?.games ?? cycle.games;
          const cycleGames = Array.isArray(roundGames) ? Math.max(1, Number(weighted(roundGames)) || 20) : Math.max(1, Number(roundGames) || 20);
          const roundTitle = roundConfig?.title || (Array.isArray(cycle.roundLabels) && cycle.roundLabels.length
            ? cycle.roundLabels[Math.min(round - 1, cycle.roundLabels.length - 1)]
            : `${cycle.label || sim.mainLabel} ${round}回目`);
          const roundDetail = roundConfig?.detail || "";
          const rewardTemplate = weighted(roundConfig?.rewards || cycle.rewards || [[{ label: cycle.rewardLabel || "報酬獲得", payout: 200 }, 1]]);
          const roundContinueChance = Math.max(0.05, Math.min(1, Number(roundConfig?.continueChance) || continueChance));
          const rewardKind = String(rewardTemplate.kind || "coins").toLowerCase();
          const gameAdd = rewardKind === "games"
            ? Math.max(1, Array.isArray(rewardTemplate.games) ? Number(weighted(rewardTemplate.games)) || 1 : Number(rewardTemplate.games) || 1)
            : 0;
          const bonusGames = rewardKind === "bonus"
            ? Math.max(1, Array.isArray(rewardTemplate.games) ? Number(weighted(rewardTemplate.games)) || 1 : Number(rewardTemplate.games) || Math.round((Number(rewardTemplate.payout) || 0) / atPureIncrease) || 1)
            : 0;
          const cycleBaseAward = rewardKind === "games" || rewardKind === "bonus"
            ? slotAwardForGames(cycleGames, atPureIncrease, sim.atPayoutVariance)
            : 0;
          const requestedAward = rewardKind === "bonus"
            ? Math.max(0, Number(rewardTemplate.payout) || slotAwardForGames(bonusGames, atPureIncrease, sim.atPayoutVariance))
            : gameAdd
              ? cycleBaseAward + slotAwardForGames(gameAdd, atPureIncrease, sim.atPayoutVariance)
              : cycleBaseAward + Math.max(0, Number(rewardTemplate.payout) || 0);
          const continued = round < maxRounds && payout < SLOT_COMPLETE_LIMIT && Math.random() < roundContinueChance;
          const awardAllowed = !roundConfig?.awardOnContinueOnly || continued;
          const award = awardAllowed ? Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout)) : 0;
          payout += award;
          atGamesTotal += cycleGames + (awardAllowed ? gameAdd + bonusGames : 0);
          if (awardAllowed && rewardKind === "games") {
            addOnCount += 1;
            addOnTotal += award;
            addOnGamesTotal += gameAdd;
          } else if (awardAllowed && rewardKind === "bonus") {
            bonusCount += 1;
            bonusPayoutTotal += award;
          } else if (awardAllowed) {
            addOnCount += 1;
            addOnTotal += award;
            coinAddOnCount += 1;
            coinAddOnTotal += award;
          }
          cycleRounds = round;
          if (continued) cycleContinues += 1;
          const failureGames = !continued ? Math.max(0, Number(roundConfig?.failureGames) || 0) : 0;
          if (failureGames) atGamesTotal += failureGames;
          atEvents.push({ kind: "cycle-round", label: cycle.label || sim.mainLabel, roundTitle, roundDetail, phase: cycle.phase || "AT LOOP", rewardLabel: awardAllowed ? rewardTemplate.label || cycle.rewardLabel || "報酬獲得" : roundConfig?.failureResultLabel || `${roundTitle} 敗北`, rewardKind, games: cycleGames, gameAdd: awardAllowed ? gameAdd : 0, bonusGames: awardAllowed ? bonusGames : 0, award, cumulative: payout, round, continued, completed: round === maxRounds && cycle.markFinalRoundComplete !== false, continueChance: roundContinueChance * 100, failureGames, failureLabel: roundConfig?.failureLabel || "引き戻しZONE", endLabel: cycle.endLabel || "AT終了" });
          const rewardResult = gameAdd && awardAllowed ? `+${gameAdd}G` : award ? `+${award}枚` : "敗北";
          flow.push(`${roundTitle} ${continued ? `${rewardTemplate.label || "報酬獲得"} ${rewardResult}・継続` : `${rewardResult}・終了${failureGames ? ` → ${failureGames}G引き戻し` : ""}`}`);
          if (!continued) break;
        }
        basePayout = payout - entryPayout;
        const cycleUpperReached = Number(cycle.upperAfterRounds) > 0 && cycleRounds >= Number(cycle.upperAfterRounds);
        const randomUpperRoute = cycle.upperOnlyAfterRounds ? false : Math.random() < upperChance;
        if (payout < SLOT_COMPLETE_LIMIT && (cycleUpperReached || randomUpperRoute)) {
          atEvents.push({ kind: "upper-challenge", label: sim.upperChallenge, games: Math.max(1, Number(sim.upperChallengeGames) || randomInt(8, 18)), award: 0, cumulative: payout });
          flow.push(sim.upperChallenge);
          upper = cycleUpperReached && cycle.upperAfterRoundsAutoSuccess !== false
            ? true
            : Math.random() < sim.upperSuccess;
          if (upper) {
            const upperLoopLimit = Math.max(1, Math.min(100, Number(sim.upperMaxLoops) || 100));
            let continueUpper = true;
            do {
              const upperReward = Array.isArray(sim.upperAwards) && sim.upperAwards.length ? weighted(sim.upperAwards) : null;
              const upperGames = upperReward
                ? Math.max(1, Number(upperReward.games) || Math.round((Number(upperReward.payout) || 0) / upperPureIncrease))
                : Array.isArray(sim.upperSetGames)
                  ? weighted(sim.upperSetGames)
                  : Math.max(1, Math.round((Number(sim.upperPayout) || 0) / upperPureIncrease));
              const derivesUpperAward = Number(sim.upperPureIncrease) || publishedUpperPureIncrease || Array.isArray(sim.upperSetGames);
              const requestedAward = upperReward
                ? Math.max(0, Number(upperReward.payout) || 0)
                : derivesUpperAward
                  ? slotAwardForGames(upperGames, upperPureIncrease, sim.atPayoutVariance)
                  : sim.upperPayout;
              const award = Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout));
              if (!award) break;
              const upperBonusGames = upperReward ? Math.max(0, Number(upperReward.bonusGames) || 0) : 0;
              upperLoops += 1;
              payout += award;
              upperPayoutTotal += award;
              atGamesTotal += upperGames + upperBonusGames;
              const upperContinued = payout < SLOT_COMPLETE_LIMIT && upperLoops < upperLoopLimit && Math.random() < sim.upperContinue;
              atEvents.push({ kind: "upper", label: sim.upperLabel, rewardLabel: upperReward?.label || sim.upperLabel, games: upperGames, bonusGames: upperBonusGames, award, cumulative: payout, set: upperLoops, continued: upperContinued });
              continueUpper = upperContinued;
            } while (continueUpper);
            flow.push(`${sim.upperLabel} ${upperLoops}セット・+${yen.format(upperPayoutTotal)}枚`);
          } else if (sim.upperFailureLabel) {
            const fallbackGames = Math.max(1, Number(sim.upperFailureGames) || 40);
            const failurePureIncrease = Math.max(0.1, Number(sim.upperFailurePureIncrease) || atPureIncrease);
            const fallbackRequested = Number(sim.upperFailurePayout) > 0
              ? Number(sim.upperFailurePayout)
              : slotAwardForGames(fallbackGames, failurePureIncrease, sim.atPayoutVariance);
            const fallbackAward = Math.max(0, Math.min(fallbackRequested, SLOT_COMPLETE_LIMIT - payout));
            payout += fallbackAward;
            atGamesTotal += fallbackGames;
            atEvents.push({ kind: "cycle-round", label: sim.upperFailureLabel, roundTitle: sim.upperFailureLabel, roundDetail: sim.upperFailureDetail || `${sim.upperChallenge}失敗でも${sim.upperFailureLabel}へ進みます`, phase: sim.upperFailurePhase || cycle.phase || "AT MODE", rewardLabel: sim.upperFailureRewardLabel || `${sim.upperFailureLabel}確定`, rewardKind: "coins", games: fallbackGames, gameAdd: 0, bonusGames: 0, award: fallbackAward, cumulative: payout, round: cycleRounds + 1, continued: false, continueChance: 100, endLabel: `${sim.upperFailureLabel}終了` });
            flow.push(`${sim.upperChallenge}失敗 → ${sim.upperFailureLabel}確定・+${yen.format(fallbackAward)}枚`);
          }
        }
      } else if (sim.kabaneriStFlow) {
        payout = entryPayout;
        basePayout = 0;
        const stGames = Math.max(1, Number(sim.kabaneriStGames) || 25);
        let stCycle = 0;
        let upperTriggered = false;
        while (stCycle < 30 && payout < SLOT_COMPLETE_LIMIT) {
          stCycle += 1;
          atGamesTotal += stGames;
          const continued = Math.random() < (Number(sim.kabaneriStContinue) || 0.75);
          if (!continued) {
            atEvents.push({ kind: "kabaneri-st", label: sim.mainLabel, games: stGames, award: 0, cumulative: payout, set: stCycle, continued: false, continueChance: (Number(sim.kabaneriStContinue) || 0.75) * 100 });
            flow.push(`${sim.mainLabel} ${stCycle}区間目 駆け抜け`);
            break;
          }
          const bonus = weighted(sim.kabaneriBonusAwards || [[{ label: "カバネリBONUS", payout: 200 }, 1]]);
          const award = Math.max(0, Math.min(Number(bonus.payout) || 0, SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          kabaneriStBonuses += 1;
          atEvents.push({ kind: "kabaneri-st", label: sim.mainLabel, games: stGames, award, cumulative: payout, set: stCycle, continued: true, continueChance: (Number(sim.kabaneriStContinue) || 0.75) * 100, bonusLabel: bonus.label, episode: Boolean(bonus.episode) });
          flow.push(`${sim.mainLabel} ${stCycle}区間目 ${bonus.label} +${award}枚`);
          if (bonus.episode && Math.random() < (Number(sim.kabaneriMumeiChance) || 0.10)) {
            const normalUpperLabel = sim.kabaneriUpperNormalLabel || "美馬ST";
            const rareUpperLabel = sim.kabaneriUpperRareLabel || "裏美馬ST";
            kabaneriUpperMode = Math.random() < (Number(sim.kabaneriUraChance) || 0.20) ? rareUpperLabel : normalUpperLabel;
            upper = true;
            upperTriggered = true;
            atEvents.push({ kind: "kabaneri-upper-challenge", label: sim.upperChallenge, games: 70, award: 0, cumulative: payout, success: true, mode: kabaneriUpperMode });
            atGamesTotal += 70;
            flow.push(`${sim.upperChallenge} → ${kabaneriUpperMode}`);
            break;
          }
        }
        basePayout = payout - entryPayout;
        if (upperTriggered && payout < SLOT_COMPLETE_LIMIT) {
          const upperGames = Math.max(1, Number(sim.kabaneriUpperGames) || 30);
          const rareUpperLabel = sim.kabaneriUpperRareLabel || "裏美馬ST";
          const upperContinueRate = kabaneriUpperMode === rareUpperLabel
            ? (Number(sim.kabaneriUpperRareContinue) || 0.95)
            : (Number(sim.kabaneriUpperNormalContinue) || 0.80);
          let upperActive = true;
          while (upperActive && upperLoops < 60 && payout < SLOT_COMPLETE_LIMIT) {
            const passiveAward = kabaneriUpperMode === rareUpperLabel
              ? Math.round(upperGames * (Number(sim.kabaneriUpperRarePureIncrease) || 6.0))
              : Math.round(upperGames * (Number(sim.kabaneriUpperNormalPureIncrease) || 0.3));
            atGamesTotal += upperGames;
            upperActive = Math.random() < upperContinueRate;
            const bonus = upperActive ? weighted(sim.kabaneriBonusAwards || [[{ label: "カバネリBONUS", payout: 200 }, 1]]) : null;
            const requestedAward = passiveAward + (bonus ? Number(bonus.payout) || 0 : 0);
            const award = Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout));
            payout += award;
            if (upperActive) {
              upperLoops += 1;
              kabaneriStBonuses += 1;
            }
            upperPayoutTotal += award;
            atEvents.push({ kind: "kabaneri-st", label: kabaneriUpperMode, games: upperGames, award, cumulative: payout, set: upperLoops + (upperActive ? 0 : 1), continued: upperActive, continueChance: upperContinueRate * 100, bonusLabel: bonus?.label || "ST終了", upperMode: kabaneriUpperMode });
            flow.push(`${kabaneriUpperMode} ${upperActive ? `${upperLoops}回目 ${bonus.label} +${award}枚` : `終了 +${award}枚`}`);
          }
        }
      } else if (sim.otomeRushFlow) {
        payout = entryPayout;
        basePayout = 0;
        const baseGames = Math.max(1, Number(sim.otomeBaseGames) || 50);
        const baseAward = Math.max(0, Math.min(slotAwardForGames(baseGames, atPureIncrease, 0.06), SLOT_COMPLETE_LIMIT - payout));
        payout += baseAward;
        atGamesTotal += baseGames;
        atEvents.push({ kind: "otome-base", label: sim.mainLabel, games: baseGames, award: baseAward, cumulative: payout });
        flow.push(`${sim.mainLabel} 初期${baseGames}G・+${baseAward}枚`);
        for (let check = 0; check < 3 && payout < SLOT_COMPLETE_LIMIT; check += 1) {
          if (Math.random() >= (Number(sim.otomeAddOnChance) || 0.42)) continue;
          const gameAdd = weighted(sim.otomeAddOnGames || [[10, 1]]);
          const award = Math.max(0, Math.min(slotAwardForGames(gameAdd, atPureIncrease, 0.06), SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += gameAdd;
          otomeAddedGames += gameAdd;
          addOnCount += 1;
          addOnTotal += award;
          addOnGamesTotal += gameAdd;
          atEvents.push({ kind: "otome-addon", label: "レア役上乗せ", games: Math.max(5, Math.round(gameAdd / 2)), gameAdd, award, cumulative: payout, number: addOnCount });
          flow.push(`レア役上乗せ +${gameAdd}G`);
        }
        if (Math.random() < (Number(sim.otomeBonusChance) || 0.28) && payout < SLOT_COMPLETE_LIMIT) {
          const gameAdd = weighted(sim.otomeBonusGames || [[10, 1]]);
          const award = Math.max(0, Math.min(slotAwardForGames(gameAdd, atPureIncrease, 0.06), SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += gameAdd;
          otomeAddedGames += gameAdd;
          otomeBonusCount += 1;
          bonusCount += 1;
          bonusPayoutTotal += award;
          const bonusLabel = sim.otomeBonusLabel || "出陣ボーナス";
          atEvents.push({ kind: "otome-bonus", label: bonusLabel, games: 20, gameAdd, award, cumulative: payout });
          flow.push(`${bonusLabel} +${award}枚`);
        }
        if (Math.random() < (Number(sim.specialChance) || 0.08) && payout < SLOT_COMPLETE_LIMIT) {
          const gameAdd = Math.max(10, Number(sim.otomeAwakeningGames) || 220);
          const award = Math.max(0, Math.min(slotAwardForGames(gameAdd, atPureIncrease, 0.06), SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += gameAdd;
          otomeAddedGames += gameAdd;
          addOnCount += 1;
          addOnTotal += award;
          addOnGamesTotal += gameAdd;
          otomeAwakeningCount += 1;
          atEvents.push({ kind: "otome-special", label: sim.specialLabel, games: 10, gameAdd, award, cumulative: payout });
          flow.push(`${sim.specialLabel} 平均+${gameAdd}G`);
        }
        upper = payout < SLOT_COMPLETE_LIMIT && Math.random() < upperChance;
        if (upper) {
          const upperGames = Math.max(50, Number(sim.otomeBaseGames) || 50);
          const award = Math.max(0, Math.min(slotAwardForGames(upperGames, upperPureIncrease, 0.06), SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += upperGames;
          upperLoops = 1;
          upperPayoutTotal += award;
          atEvents.push({ kind: "otome-upper", label: sim.upperLabel, games: upperGames, award, cumulative: payout, set: 1 });
          flow.push(`${sim.upperChallenge} → ${sim.upperLabel} ${upperGames}G・+${award}枚`);
        }
        if (payout < SLOT_COMPLETE_LIMIT) {
          const battleChance = Number(sim.otomeBattleChanceBySetting?.[setting]) || 0.249;
          otomeBattleWon = Math.random() < battleChance;
          const gameAdd = otomeBattleWon ? 30 : 0;
          const battlePureIncrease = upper ? upperPureIncrease : atPureIncrease;
          const award = otomeBattleWon ? Math.max(0, Math.min(slotAwardForGames(gameAdd, battlePureIncrease, 0.06), SLOT_COMPLETE_LIMIT - payout)) : 0;
          payout += award;
          atGamesTotal += 5 + gameAdd;
          if (otomeBattleWon) {
            otomeAddedGames += gameAdd;
            addOnCount += 1;
            addOnTotal += award;
            addOnGamesTotal += gameAdd;
          }
          const battleLabel = sim.otomeBattleLabel || "オウガイバトル";
          atEvents.push({ kind: "otome-battle", label: battleLabel, games: 5, gameAdd, award, cumulative: payout, success: otomeBattleWon, chance: battleChance * 100 });
          flow.push(`${battleLabel} ${otomeBattleWon ? `勝利 +${gameAdd}G` : "敗北"}`);
        }
        basePayout = payout - entryPayout;
      } else if (sim.godzillaEva2Flow) {
        payout = entryPayout;
        basePayout = 0;
        const initialGames = Math.max(50, Number(weighted(sim.godzillaInitialGames || [[50, 1]])) || 50);
        const initialCharacter = initialGames >= 200 ? "ゴジラ" : initialGames >= 100 ? "モスラ" : "エヴァンゲリオン";
        const initialAward = Math.max(0, Math.min(slotAwardForGames(initialGames, atPureIncrease, sim.atPayoutVariance), SLOT_COMPLETE_LIMIT - payout));
        payout += initialAward;
        atGamesTotal += initialGames + 2;
        atEvents.push({ kind: "godzilla-at", label: "ゴジエヴァアタック", character: initialCharacter, games: initialGames, award: initialAward, cumulative: payout });
        flow.push(`ゴジエヴァアタック ${initialCharacter}・初期${initialGames}G`);

        const addOnChecks = Math.max(1, Number(weighted([[1, 0.25], [2, 0.45], [3, 0.25], [4, 0.05]])) || 1);
        for (let check = 0; check < addOnChecks && payout < SLOT_COMPLETE_LIMIT; check += 1) {
          const route = weighted([["direct", 0.45], ["search", 0.22], ["impact", 0.18], ["shock", 0.15]]);
          const baseAdd = Math.max(10, Number(weighted([[10, 0.52], [20, 0.28], [30, 0.13], [50, 0.06], [100, 0.01]])) || 10);
          let routeLabel = "G侵食役・変異";
          let routeDetail = "レア役・変異からゲーム数上乗せを開きます";
          let routeGames = 5;
          let chance = 1;
          let success = true;
          let tenfold = Math.random() < 0.08;
          if (route === "search") {
            routeLabel = "怪獣索敵ZONE → IMPACT BATTLE";
            routeDetail = "10G＋αの索敵から約52%で4Gバトルへ、勝利期待度約44%です";
            routeGames = 14;
            chance = 0.52 * 0.44;
            success = Math.random() < chance;
            tenfold = success && Math.random() < 0.43;
          } else if (route === "impact") {
            routeLabel = "IMPACT BATTLE";
            routeDetail = "4Gの怪獣バトル。勝利期待度約44%です";
            routeGames = 4;
            chance = 0.44;
            success = Math.random() < chance;
            tenfold = success && Math.random() < 0.43;
          } else if (route === "shock") {
            routeLabel = "震撃CHANCE";
            routeDetail = "4G＋αで10倍上乗せを抽選。成功期待度約43%です";
            routeGames = 4;
            chance = 0.43;
            success = Math.random() < chance;
            tenfold = success;
          }
          const gameAdd = success ? Math.min(1000, baseAdd * (tenfold ? 10 : 1)) : 0;
          const award = gameAdd ? Math.max(0, Math.min(slotAwardForGames(gameAdd, atPureIncrease, sim.atPayoutVariance), SLOT_COMPLETE_LIMIT - payout)) : 0;
          payout += award;
          atGamesTotal += routeGames + gameAdd;
          if (gameAdd) {
            addOnCount += 1;
            addOnTotal += award;
            addOnGamesTotal += gameAdd;
          }
          atEvents.push({ kind: "godzilla-addon", label: routeLabel, route, routeDetail, games: routeGames, baseAdd, gameAdd, award, cumulative: payout, success, tenfold, chance: chance * 100, number: check + 1 });
          flow.push(`${routeLabel} ${success ? `${tenfold ? "10倍上乗せ " : ""}+${gameAdd}G` : "失敗"}`);
        }

        const appendReturnZone = (returnToUpper) => {
          if (payout >= SLOT_COMPLETE_LIMIT) return;
          const returnGames = Math.max(1, Number(sim.upperReturnGames) || 50);
          const returnChance = Math.max(0, Math.min(1, Number(sim.upperReturnChance) || 0.176));
          const returnSuccess = Math.random() < returnChance;
          const gameAdd = returnSuccess ? (returnToUpper ? 100 : 50) : 0;
          const award = gameAdd ? Math.max(0, Math.min(slotAwardForGames(gameAdd, returnToUpper ? upperPureIncrease : atPureIncrease, sim.atPayoutVariance), SLOT_COMPLETE_LIMIT - payout)) : 0;
          payout += award;
          atGamesTotal += returnGames + gameAdd;
          atEvents.push({ kind: "godzilla-return", label: "50G引き戻し区間", games: returnGames, gameAdd, award, cumulative: payout, success: returnSuccess, chance: returnChance * 100, returnToUpper });
          flow.push(`50G引き戻し ${returnSuccess ? `${returnToUpper ? sim.upperLabel : sim.mainLabel}復帰 +${gameAdd}G` : "失敗"}`);
        };

        const upperRouteStarted = payout < SLOT_COMPLETE_LIMIT && Math.random() < upperChance;
        if (upperRouteStarted) {
          upper = Math.random() < sim.upperSuccess;
          atGamesTotal += Math.max(1, Number(sim.upperChallengeGames) || 4);
          atEvents.push({ kind: "upper-challenge", label: sim.upperChallenge, games: Math.max(1, Number(sim.upperChallengeGames) || 4), award: 0, cumulative: payout, success: upper, chance: sim.upperSuccess * 100 });
          flow.push(`${sim.upperChallenge} ${upper ? "勝利" : "敗北"}`);
          if (upper) {
            let continueUpper = true;
            const upperLoopLimit = Math.max(1, Math.min(30, Number(sim.upperMaxLoops) || 12));
            do {
              const upperGames = Math.max(100, Number(weighted(sim.upperSetGames || [[100, 1]])) || 100);
              const award = Math.max(0, Math.min(slotAwardForGames(upperGames, upperPureIncrease, sim.atPayoutVariance), SLOT_COMPLETE_LIMIT - payout));
              if (!award) break;
              upperLoops += 1;
              payout += award;
              upperPayoutTotal += award;
              atGamesTotal += upperGames + Math.max(1, Number(sim.upperChallengeGames) || 4);
              const continued = payout < SLOT_COMPLETE_LIMIT && upperLoops < upperLoopLimit && Math.random() < sim.upperContinue;
              atEvents.push({ kind: "upper", label: sim.upperLabel, rewardLabel: `G覚醒アタック +${upperGames}G`, games: upperGames, award, cumulative: payout, set: upperLoops, continued });
              continueUpper = continued;
            } while (continueUpper);
            flow.push(`${sim.upperLabel} ${upperLoops}区間・+${yen.format(upperPayoutTotal)}枚`);
            appendReturnZone(true);
          } else {
            appendReturnZone(false);
          }
        } else {
          appendReturnZone(false);
        }
        basePayout = payout - entryPayout;
      } else if (sim.mahoakoFlow) {
        payout = entryPayout;
        basePayout = 0;
        const directUpperEntry = entryBonus?.routeType === "upper-cz" && Math.random() < (Number(entryBonus.upperEntryChance) || 0.42);
        const initialBaseGames = Math.max(30, Number(weighted(sim.mahoakoInitialGames || [[50, 1]])) || 50);
        const initialGetsSpecial = Math.random() < 0.36;
        const initialSpecial = initialGetsSpecial ? weighted(sim.mahoakoSpecialAwards || [[{ label: "サディスティックタイム", games: 70, zoneGames: 10 }, 1]]) : null;
        const initialGames = initialBaseGames + (Number(initialSpecial?.games) || 0);
        const initialAward = Math.max(0, Math.min(slotAwardForGames(initialGames, atPureIncrease, sim.atPayoutVariance), SLOT_COMPLETE_LIMIT - payout));
        payout += initialAward;
        atGamesTotal += 3 + initialGames;
        if (initialSpecial) {
          addOnCount += 1;
          addOnGamesTotal += Number(initialSpecial.games) || 0;
          addOnTotal += slotAwardForGames(Number(initialSpecial.games) || 0, atPureIncrease, sim.atPayoutVariance);
        }
        atEvents.push({ kind: "mahoako-at", label: "あこがれATTACK", games: initialGames, baseGames: initialBaseGames, specialLabel: initialSpecial?.label || "", specialGames: Number(initialSpecial?.games) || 0, zoneGames: Number(initialSpecial?.zoneGames) || 0, award: initialAward, cumulative: payout });
        flow.push(`あこがれATTACK 初期${initialBaseGames}G${initialSpecial ? `＋${initialSpecial.label} ${initialSpecial.games}G` : ""}`);

        const eventChecks = Math.max(1, Number(weighted([[1, 0.28], [2, 0.46], [3, 0.22], [4, 0.04]])) || 1);
        for (let check = 0; check < eventChecks && payout < SLOT_COMPLETE_LIMIT; check += 1) {
          const route = weighted([["direct", 0.38], ["attack", 0.28], ["bonus", 0.22], ["room", 0.12]]);
          let label = "レア役ゲーム数上乗せ";
          let detail = "レア役からゲーム数上乗せを抽選します";
          let routeGames = 3;
          let gameAdd = 0;
          let bonusAward = 0;
          let specialLabel = "";
          if (route === "direct") {
            gameAdd = Number(weighted([[10, 0.46], [20, 0.27], [30, 0.17], [50, 0.08], [100, 0.02]])) || 10;
          } else if (route === "attack") {
            const special = weighted(sim.mahoakoSpecialAwards || [[{ label: "サディスティックタイム", games: 70, zoneGames: 10 }, 1]]);
            label = "あこがれATTACK";
            detail = "3Gのキャラ対応役から3種類の特化ゾーンを判定します";
            routeGames = 3 + Math.max(1, Number(special.zoneGames) || 10);
            gameAdd = Math.max(10, Number(special.games) || 70);
            specialLabel = special.label;
          } else if (route === "bonus") {
            const bonus = weighted([[{ label: "レギュラーボーナス", payout: 70, games: 14 }, 0.398], [{ label: "まほあこボーナス", payout: 130, games: 26 }, 0.497], [{ label: "まほあこボーナス あこがれVer.", payout: 70, games: 14 }, 0.083], [{ label: "スペシャルムービーボーナス", payout: 70, games: 14 }, 0.022]]);
            label = bonus.label;
            detail = "全設定共通約1/249.6のBONUS。AT中は上乗せやあこがれATTACKを抽選します";
            routeGames = bonus.games;
            bonusAward = bonus.payout;
            bonusCount += 1;
            bonusPayoutTotal += bonusAward;
          } else {
            label = "マジアベーゼが満足するまで出られない部屋";
            detail = "BAR揃い高確成功から突入する無限ATを代表ゲーム数で消化します";
            routeGames = 11;
            gameAdd = Number(weighted([[80, 0.45], [120, 0.33], [200, 0.17], [300, 0.05]])) || 80;
          }
          const gameAward = gameAdd ? slotAwardForGames(gameAdd, atPureIncrease, sim.atPayoutVariance) : 0;
          const award = Math.max(0, Math.min(gameAward + bonusAward, SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += routeGames + gameAdd;
          if (gameAdd) {
            addOnCount += 1;
            addOnGamesTotal += gameAdd;
            addOnTotal += gameAward;
          }
          atEvents.push({ kind: "mahoako-addon", label, route, detail, games: routeGames, gameAdd, bonusAward, specialLabel, award, cumulative: payout, number: check + 1 });
          flow.push(`${label}${gameAdd ? ` +${gameAdd}G` : ` +${bonusAward}枚`}`);
        }

        const venaLitaRoute = entryBonus?.routeType === "upper-cz";
        const upperRouteStarted = venaLitaRoute || (payout < SLOT_COMPLETE_LIMIT && Math.random() < upperChance);
        if (upperRouteStarted) {
          upper = venaLitaRoute ? directUpperEntry : Math.random() < sim.upperSuccess;
          const challengeLabel = venaLitaRoute ? "ヴェナリータチャレンジ" : sim.upperChallenge;
          const challengeChance = venaLitaRoute ? (Number(entryBonus.upperEntryChance) || 0.42) : sim.upperSuccess;
          atGamesTotal += Math.max(1, Number(sim.upperChallengeGames) || 5);
          atEvents.push({ kind: "upper-challenge", label: challengeLabel, games: Math.max(1, Number(sim.upperChallengeGames) || 5), award: 0, cumulative: payout, success: upper, chance: challengeChance * 100, mahoako: true });
          flow.push(`${challengeLabel} ${upper ? "成功" : "失敗"}`);
          if (upper) {
            let continueUpper = true;
            const upperLoopLimit = Math.max(1, Math.min(12, Number(sim.upperMaxLoops) || 8));
            while (continueUpper && upperLoops < upperLoopLimit && payout < SLOT_COMPLETE_LIMIT) {
              const upperGames = Math.max(100, Number(weighted(sim.upperSetGames || [[100, 1]])) || 100);
              const award = Math.max(0, Math.min(slotAwardForGames(upperGames, upperPureIncrease, sim.atPayoutVariance), SLOT_COMPLETE_LIMIT - payout));
              if (!award) break;
              upperLoops += 1;
              payout += award;
              upperPayoutTotal += award;
              atGamesTotal += 3 + upperGames;
              atEvents.push({ kind: "mahoako-upper", label: sim.upperLabel, games: upperGames, award, cumulative: payout, set: upperLoops });
              const vsSuccess = payout < SLOT_COMPLETE_LIMIT && Math.random() < 0.35;
              const starSuccess = !vsSuccess && payout < SLOT_COMPLETE_LIMIT && Math.random() < (0.25 / 0.65);
              const returned = vsSuccess || starSuccess;
              atGamesTotal += 5 + (vsSuccess ? 0 : Math.max(1, Number(sim.upperReturnGames) || 10));
              atEvents.push({ kind: "mahoako-return", label: "VSロードエノルメ → あの星を堕とせ", games: vsSuccess ? 5 : 5 + Math.max(1, Number(sim.upperReturnGames) || 10), award: 0, cumulative: payout, success: returned, vsSuccess, starSuccess, chance: sim.upperReturnChance * 100, set: upperLoops });
              flow.push(`${sim.upperLabel} ${upperLoops}回目 +${award}枚 → ${returned ? "引き戻し成功" : "終了"}`);
              continueUpper = returned;
            }
          }
        }
        basePayout = payout - entryPayout;
      } else if (sim.setPushFlow) {
        while (rushSetCount < 3 && Math.random() < (sim.mainSetContinue || 0.75)) rushSetCount += 1;
        if (rushSetCount === 3 && Number(sim.upperAfterSuccesses) === 3) {
          setPushUpperResolved = true;
          upper = Math.random() < (sim.mainSetContinue || 0.75);
        }
        const setGames = Array.from({ length: rushSetCount }, (_, index) => weighted(
          index === 0 && Array.isArray(sim.firstRushSetGames)
            ? sim.firstRushSetGames
            : rushSetGamesForSetting(sim, setting)
        ));
        let distributedPayout = entryPayout;
        setGames.forEach((games, index) => {
          const award = Math.max(0, Math.min(
            slotAwardForGames(games, atPureIncrease, sim.atPayoutVariance),
            SLOT_COMPLETE_LIMIT - distributedPayout
          ));
          distributedPayout += award;
          atGamesTotal += games;
          atEvents.push({ kind: "rush-set", label: sim.mainLabel, games, award, cumulative: distributedPayout, set: index + 1, setCount: rushSetCount });
        });
        basePayout = distributedPayout - entryPayout;
        payout = distributedPayout;
        flow.push(`${sim.mainLabel} ${rushSetCount}セット`);
        if (setPushUpperResolved) {
          atEvents.push({ kind: "upper-challenge", label: "ハラキリチャレンジ 3回目", games: 3, award: 0, cumulative: payout, chance: (sim.mainSetContinue || 0.75) * 100, success: upper, valvraveThirdChallenge: true });
          flow.push(`ハラキリチャレンジ3回目 ${upper ? `成功 → 4セット目から${sim.upperLabel}` : "失敗"}`);
        }
      } else if (sim.battleBonusFlow) {
        payout = entryPayout;
        basePayout = 0;
        battleContinuationRate = Number(weighted(sim.battleContinueRates || [[0.66, 1]])) || 0.66;
        let battleActive = true;
        let upperAttempted = false;
        while (battleActive && battleBonusSets < 50 && payout < SLOT_COMPLETE_LIMIT) {
          battleBonusSets += 1;
          const setGames = Math.max(38, Number(sim.battleSetGames) || 38);
          const awardGames = Math.max(1, Number(sim.battleAwardGames) || 30);
          const award = Math.max(0, Math.min(slotAwardForGames(awardGames, atPureIncrease, 0.08), SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += setGames;
          const continued = Math.random() < battleContinuationRate;
          atEvents.push({ kind: "hokuto-set", label: sim.mainLabel, games: setGames, award, cumulative: payout, set: battleBonusSets, continued, continueChance: battleContinuationRate * 100 });
          flow.push(`${sim.mainLabel} ${battleBonusSets}連 ${continued ? "継続" : "敗北"}・+${award}枚`);
          if (continued && !upperAttempted && Math.random() < (Number(sim.battleUpperChancePerSet) || 0.035)) {
            upperAttempted = true;
            const challengeSuccess = Math.random() < (Number(sim.upperSuccess) || 0.46);
            atEvents.push({ kind: "upper-challenge", label: sim.upperChallenge, games: 15, award: 0, cumulative: payout, success: challengeSuccess, chance: (Number(sim.upperSuccess) || 0.46) * 100, hokutoChallenge: true });
            flow.push(`${sim.upperChallenge} ${challengeSuccess ? "成功" : "失敗"}`);
            upper = challengeSuccess;
            if (upper) break;
          }
          battleActive = continued;
        }
        basePayout = payout - entryPayout;
        if (upper) {
          let upperActive = true;
          while (upperActive && upperLoops < 100 && payout < SLOT_COMPLETE_LIMIT) {
            const upperGames = Math.max(38, Number(sim.battleSetGames) || 38);
            const awardGames = Math.max(1, Number(sim.battleAwardGames) || 30);
            const award = Math.max(0, Math.min(slotAwardForGames(awardGames, upperPureIncrease, 0.08), SLOT_COMPLETE_LIMIT - payout));
            if (!award) break;
            upperLoops += 1;
            payout += award;
            upperPayoutTotal += award;
            atGamesTotal += upperGames;
            upperActive = payout < SLOT_COMPLETE_LIMIT && Math.random() < sim.upperContinue;
            atEvents.push({ kind: "upper", label: sim.upperLabel, games: upperGames, award, cumulative: payout, set: upperLoops, continued: upperActive });
          }
          flow.push(`${sim.upperLabel} ${upperLoops}連・+${yen.format(upperPayoutTotal)}枚`);
        }
      } else if (sim.sgRaceFlow) {
        payout = entryPayout;
        basePayout = 0;
        const scenario = weighted(sim.sgScenarios || [[{ label: "バランス", rates: [0.65, 0.65, 0.65, 0.65, 0.65, 0.65, 0.65] }, 1]]);
        sgScenarioName = scenario.label || "バランス";
        const setGames = Math.max(40, Number(sim.sgSetGames) || 40);
        for (let set = 1; set <= 8 && payout < SLOT_COMPLETE_LIMIT; set += 1) {
          sgRushSets = set;
          const award = Math.max(0, Math.min(slotAwardForGames(setGames, atPureIncrease, 0.10), SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += setGames;
          const continued = set === 8 || Math.random() < (Number(scenario.rates?.[set - 1]) || 0.65);
          atEvents.push({ kind: "monkey-set", label: sim.mainLabel, games: setGames, award, cumulative: payout, set, continued, continueChance: set === 8 ? 100 : (Number(scenario.rates?.[set - 1]) || 0.65) * 100, scenario: sgScenarioName });
          flow.push(`${sim.mainLabel} ${set}セット目 ${set === 8 ? "グランドスラム" : continued ? "継続" : "敗退"}・+${award}枚`);
          if (Math.random() < (Number(sim.specialChance) || 0) && payout < SLOT_COMPLETE_LIMIT) {
            const gameAdd = weighted([[10, 0.55], [20, 0.30], [30, 0.15]]);
            const add = Math.max(0, Math.min(slotAwardForGames(gameAdd, atPureIncrease, 0.08), SLOT_COMPLETE_LIMIT - payout));
            payout += add;
            atGamesTotal += gameAdd;
            addOnCount += 1;
            addOnTotal += add;
            addOnGamesTotal += gameAdd;
            atEvents.push({ kind: "special", label: sim.specialLabel, trigger: "レア役成立", games: 8, gameAdd, award: add, cumulative: payout, number: addOnCount });
            flow.push(`${sim.specialLabel} +${gameAdd}G`);
          }
          if (!continued) break;
        }
        basePayout = payout - entryPayout;
        if (sgRushSets === 8 && payout < SLOT_COMPLETE_LIMIT) {
          upper = Math.random() < (Number(sim.upperSuccess) || 0.83);
          atEvents.push({ kind: "monkey-upper-challenge", label: sim.upperChallenge, games: 9, award: 0, cumulative: payout, success: upper, chance: (Number(sim.upperSuccess) || 0.83) * 100 });
          flow.push(`グランドスラム → ${sim.upperChallenge} ${upper ? "勝利" : "敗北"}`);
        }
        if (upper) {
          let upperActive = true;
          while (upperActive && upperLoops < 100 && payout < SLOT_COMPLETE_LIMIT) {
            const upperGames = setGames;
            const award = Math.max(0, Math.min(slotAwardForGames(upperGames, upperPureIncrease, 0.10), SLOT_COMPLETE_LIMIT - payout));
            if (!award) break;
            upperLoops += 1;
            payout += award;
            upperPayoutTotal += award;
            atGamesTotal += upperGames;
            upperActive = payout < SLOT_COMPLETE_LIMIT && Math.random() < sim.upperContinue;
            atEvents.push({ kind: "upper", label: sim.upperLabel, games: upperGames, award, cumulative: payout, set: upperLoops, continued: upperActive });
          }
          flow.push(`${sim.upperLabel} ${upperLoops}セット・+${yen.format(upperPayoutTotal)}枚`);
        }
      } else {
        atGamesTotal += baseAtGames;
        atEvents.push({ kind: "at-start", label: baseEventLabel, games: baseAtGames, award: basePayout, cumulative: payout });
        if (normalAward?.label) flow.push(`${normalAward.label} 約${yen.format(basePayout)}枚`);
      }

      if (sim.karakuriJudgeFlow) {
        const plannedAttempts = weighted(sim.karakuriJudgeAttempts || [[4, 1]]);
        for (let attempt = 1; attempt <= plannedAttempts && payout < SLOT_COMPLETE_LIMIT && karakuriJudgeSuccesses < 4; attempt += 1) {
          karakuriJudgeAttempts += 1;
          const success = Math.random() < (sim.karakuriJudgeSuccess || specialChance);
          const requestedAdd = success ? weighted(sim.karakuriJudgeAwards || [[100, 1]]) : 0;
          const award = Math.max(0, Math.min(requestedAdd, SLOT_COMPLETE_LIMIT - payout));
          if (success) {
            karakuriJudgeSuccesses += 1;
            payout += award;
            addOnCount += 1;
            addOnTotal += award;
          }
          atGamesTotal += 4;
          atEvents.push({ kind: "karakuri-judge", label: sim.specialLabel, games: 4, award, cumulative: payout, attempt, success, successCount: karakuriJudgeSuccesses });
          flow.push(`${sim.specialLabel} ${attempt}回目 ${success ? `成功 +${award}枚（成功${karakuriJudgeSuccesses}回）` : "失敗"}`);
          if (success && karakuriJudgeSuccesses === 4) {
            const chainSuccess = Math.random() < (sim.chainSuccess || 0.56);
            karakuriUpperRoute = "運命連鎖";
            atEvents.push({ kind: "karakuri-upper-challenge", label: "運命連鎖", route: "chain", games: 10, chance: (sim.chainSuccess || 0.56) * 100, success: chainSuccess, award: 0, cumulative: payout });
            flow.push(`運命連鎖 ${chainSuccess ? "成功" : "失敗"}`);
            upper = chainSuccess;
          }
        }
        if (!upper && karakuriJudgeSuccesses === 3 && payout < SLOT_COMPLETE_LIMIT) {
          const fateSuccess = Math.random() < (sim.fateSuccess || sim.upperSuccess);
          karakuriUpperRoute = "運命の一劇";
          atEvents.push({ kind: "karakuri-upper-challenge", label: sim.upperChallenge, route: "fate", games: 4, chance: (sim.fateSuccess || sim.upperSuccess) * 100, success: fateSuccess, award: 0, cumulative: payout });
          flow.push(`${sim.upperChallenge} ${fateSuccess ? "成功" : "失敗"}`);
          upper = fateSuccess;
        }
        if (upper) {
          let continueUpper = true;
          while (continueUpper && upperLoops < 100 && payout < SLOT_COMPLETE_LIMIT) {
            const upperGames = Array.isArray(sim.upperSetGames)
              ? weighted(sim.upperSetGames)
              : Math.max(1, Math.round((Number(sim.upperPayout) || 0) / upperPureIncrease));
            const derivesUpperAward = Boolean(Number(sim.upperPureIncrease) || publishedUpperPureIncrease || Array.isArray(sim.upperSetGames));
            const requestedAward = derivesUpperAward
              ? slotAwardForGames(upperGames, upperPureIncrease, sim.atPayoutVariance)
              : sim.upperPayout;
            const award = Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout));
            if (!award) break;
            upperLoops += 1;
            payout += award;
            upperPayoutTotal += award;
            atGamesTotal += upperGames;
            atEvents.push({ kind: "upper", label: sim.upperLabel, games: upperGames, award, cumulative: payout, set: upperLoops });
            if (payout >= SLOT_COMPLETE_LIMIT) break;
            const reentrySuccess = Math.random() < (Number(sim.upperContinue) || 0.50);
            atEvents.push({ kind: "karakuri-upper-challenge", label: "運命の一劇", route: "reentry", games: 4, chance: (Number(sim.upperContinue) || 0.50) * 100, success: reentrySuccess, award: 0, cumulative: payout });
            flow.push(`上位AT終了後 運命の一劇 ${reentrySuccess ? "成功" : "失敗"}`);
            continueUpper = reentrySuccess;
          }
          flow.push(`${karakuriUpperRoute}突破 → ${sim.upperLabel} ${upperLoops}セット・+${yen.format(upperPayoutTotal)}枚`);
        }
      } else if (!sim.battleBonusFlow && !sim.sgRaceFlow && !sim.kabaneriStFlow && !sim.otomeRushFlow && !sim.cycleFlow && !sim.godzillaEva2Flow && !sim.mahoakoFlow) {
        // Keep the published overall special-zone chance while allowing rare multi-hit runs.
        const specialChecks = Math.max(1, Math.min(3, Math.ceil(payout / 500)));
        const perCheckChance = 1 - Math.pow(1 - specialChance, 1 / specialChecks);
        for (let check = 0; check < specialChecks && payout < SLOT_COMPLETE_LIMIT; check += 1) {
          if (Math.random() >= perCheckChance) continue;
          const configuredOutcome = Array.isArray(sim.specialOutcomes) && sim.specialOutcomes.length
            ? weighted(sim.specialOutcomes)
            : null;
          const specialLabel = configuredOutcome?.label || sim.specialLabel;
          const specialDisplay = String(configuredOutcome?.kind || sim.specialDisplay || "").toLowerCase();
          const isBonusEvent = specialDisplay === "bonus" || /BONUS|ボーナス|BIG|REG|1G連|エピソード/i.test(String(specialLabel || ""));
          const isCoinAddEvent = specialDisplay === "coins";
          const configuredGameAdd = specialDisplay === "games" && Array.isArray(configuredOutcome?.games)
            ? Math.max(1, Number(weighted(configuredOutcome.games)) || 1)
            : 0;
          const configuredPayout = Array.isArray(configuredOutcome?.payouts)
            ? Math.max(0, Number(weighted(configuredOutcome.payouts)) || 0)
            : 0;
          const requestedAdd = configuredGameAdd
            ? slotAwardForGames(configuredGameAdd, atPureIncrease, sim.atPayoutVariance)
            : configuredPayout || randomInt(sim.specialMin, sim.specialMax);
          const add = Math.max(0, Math.min(requestedAdd, SLOT_COMPLETE_LIMIT - payout));
          if (!add) break;
          const gameAdd = isBonusEvent || isCoinAddEvent ? 0 : configuredGameAdd || Math.max(1, Math.min(500, Math.round(add / atPureIncrease)));
          const bonusGames = isBonusEvent && Array.isArray(configuredOutcome?.games)
            ? Math.max(1, Number(weighted(configuredOutcome.games)) || 1)
            : 0;
          const eventGames = Math.max(1, Number(configuredOutcome?.triggerGames) || randomInt(8, 38));
          payout += add;
          if (isBonusEvent) {
            bonusCount += 1;
            bonusPayoutTotal += add;
          } else if (isCoinAddEvent) {
            addOnCount += 1;
            addOnTotal += add;
            coinAddOnCount += 1;
            coinAddOnTotal += add;
          } else {
            addOnCount += 1;
            addOnTotal += add;
            addOnGamesTotal += gameAdd;
          }
          atGamesTotal += eventGames + gameAdd + bonusGames;
          atEvents.push({ kind: isBonusEvent ? "slot-bonus" : isCoinAddEvent ? "coin-add" : "special", label: specialLabel, trigger: configuredOutcome?.trigger || "レア役成立", games: eventGames, gameAdd, bonusGames, award: add, cumulative: payout, number: isBonusEvent ? bonusCount : addOnCount });
          flow.push(isBonusEvent ? `${specialLabel} +${add}枚` : isCoinAddEvent ? `${specialLabel} +${add}枚` : `${specialLabel} +${gameAdd}G`);
        }
        let upperRouteStarted = false;
        if (sim.setPushFlow) {
          upperRouteStarted = setPushUpperResolved;
        } else if (payout < SLOT_COMPLETE_LIMIT && Math.random() < upperChance) {
          upperRouteStarted = true;
          flow.push(sim.upperChallenge);
          atEvents.push({ kind: "upper-challenge", label: sim.upperChallenge, games: randomInt(18, 48), award: 0, cumulative: payout });
          upper = Math.random() < sim.upperSuccess;
        }
        if (upperRouteStarted && upper) {
          do {
            const derivesUpperAward = sim.setPushFlow || Number(sim.upperPureIncrease) || publishedUpperPureIncrease || Array.isArray(sim.upperSetGames);
            const upperGames = Array.isArray(sim.upperSetGames)
              ? weighted(sim.upperSetGames)
              : Math.max(1, Math.round((Number(sim.upperPayout) || 0) / upperPureIncrease));
            const requestedAward = derivesUpperAward
              ? slotAwardForGames(upperGames, upperPureIncrease, sim.atPayoutVariance)
              : sim.upperPayout;
            const award = Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout));
            if (!award) break;
            upperLoops += 1;
            payout += award;
            upperPayoutTotal += award;
            atGamesTotal += upperGames;
            atEvents.push({ kind: "upper", label: sim.upperLabel, games: upperGames, award, cumulative: payout, set: upperLoops, displaySet: sim.setPushFlow ? upperLoops + 3 : upperLoops });
          } while (upperLoops < 100 && payout < SLOT_COMPLETE_LIMIT && Math.random() < sim.upperContinue);
          flow.push(`${sim.upperLabel} ${upperLoops}セット・+${yen.format(upperPayoutTotal)}枚`);
        } else if (upperRouteStarted && !upper && !sim.setPushFlow) {
          flow.push(`${sim.upperChallenge}失敗`);
        }
      }
    }
    const complete = payout >= SLOT_COMPLETE_LIMIT;
    if (complete) {
      payout = SLOT_COMPLETE_LIMIT;
      flow.push(`コンプリート ${yen.format(SLOT_COMPLETE_LIMIT)}枚到達`);
    }
    const diff = payout - usedCoins;
    const exchangeValue = Math.round(payout / exchangeCoins * 100);
    const balanceYen = exchangeValue - investment;
    const rankGamesPerThousand = sim.base50 * RANKING_RATE.slot.lendCoins / 50;
    const rankInvestmentUnits = Math.ceil(games / rankGamesPerThousand);
    const rankInvestment = rankInvestmentUnits * 1000;
    const rankScore = Math.round(payout - rankInvestmentUnits * RANKING_RATE.slot.lendCoins);
    const salesIndex = Math.round(usedCoins * coinUnit);
    const upperResultLabel = kabaneriUpperMode || sim.upperLabel;
    const resultLabel = complete ? "コンプリート" : upper ? upperResultLabel : entered ? sim.mainLabel : entryBonus ? `${entryBonus.label}終了` : `${sim.triggerLabel}失敗`;
    const atGameTimeline = atEvents.map(event => Math.max(1, Number(event.games) || 1));
    const settingRateStats = [[`設定${setting}の${sim.triggerLabel}`, `約1/${triggerRate.toFixed(1)}`]];
    if (sim.mainLabel !== sim.triggerLabel || Math.abs(mainRate - triggerRate) >= 0.05) {
      const mainRateLabel = sim.mainRateLabel || (machine.initialHitLabel ? "ボーナス初当り" : sim.mainLabel);
      settingRateStats.push([`設定${setting}の${mainRateLabel}`, `約1/${mainRate.toFixed(1)}`]);
    }
    const karakuriStats = sim.karakuriJudgeFlow ? [["激情ジャッジ", `${karakuriJudgeAttempts}回中 ${karakuriJudgeSuccesses}回成功`], ["上位ジャッジ", karakuriUpperRoute || "権利未獲得"]] : [];
    const battleStats = sim.battleBonusFlow ? [["BB継続モード", `${Math.round(battleContinuationRate * 100)}%`], ["バトルボーナス", `${battleBonusSets}連`]] : [];
    const sgStats = sim.sgRaceFlow ? [["SGシナリオ", sgScenarioName], ["SG RUSH", `${sgRushSets}セット`], ["グランドスラム", sgRushSets === 8 ? "達成" : "未達"]] : [];
    const kabaneriStats = sim.kabaneriStFlow ? [["ST中ボーナス", `${kabaneriStBonuses}回`], ["上位ST", kabaneriUpperMode ? `${kabaneriUpperMode}・${upperLoops}回当選` : "非到達"]] : [];
    const otomeStats = sim.otomeRushFlow ? [["ゲーム数上乗せ", `+${yen.format(otomeAddedGames)}G`], [sim.otomeBonusLabel || "出陣ボーナス", `${otomeBonusCount}回`], [sim.specialLabel || "特化ゾーン", otomeAwakeningCount ? `${otomeAwakeningCount}回` : "非当選"], [sim.otomeBattleLabel || "オウガイバトル", otomeBattleWon ? "勝利" : "敗北"]] : [];
    const uminchuStats = sim.uminchuFlow ? [["BONUS内訳", `BIG ${uminchuBigCount}回・REG ${uminchuRegCount}回`], ["最大32G連", `${uminchuMaxChain}連`], ["IREGUI", uminchuIreguiCount ? `${uminchuIreguiCount}回` : "非到達"], ["獲得ストック", `${uminchuStockCount}個`]] : [];
    const tentenStats = sim.tentenFlow ? [["初回BONUS", entered ? "約100枚" : "非当選"], ["王宮BONUS", `${tentenPalaceBonusCount}回`], ["デュエットBIG", `${tentenDuetCount}回`], ["転天STOCK", tentenStockChallengeCount ? `${tentenStockChallengeCount}回・${tentenStockCount}個` : "非当選"], ["輪廻転天", upper ? `到達・上位BONUS ${tentenUpperBonusCount}回` : "非到達"]] : [];
    const cycleStats = sim.cycleFlow ? [[sim.cycleFlow.statLabel || "専用ループ", `${cycleRounds}回・継続${cycleContinues}回`]] : [];
    const entryBonusStats = entryBonus ? [["初当りBONUS", `${entryBonus.label}・約${yen.format(entryBonus.payout)}枚`], ["BONUS結果", entryBonus.outcome], ["BONUS中AT期待度", `${percent(Number(entryBonus.atChance) || 0)}`]] : [];
    const rushGamesTotal = Math.max(0, atGamesTotal - (Number(entryBonus?.games) || 0));
    const genericSpecialStats = sim.otomeRushFlow || sim.kabaneriStFlow || sim.uminchuFlow || sim.tentenFlow ? [] : [["特化ゾーン", addOnCount ? `${sim.specialLabel} ${addOnCount}回` : bonusCount ? `${sim.specialLabel} ${bonusCount}回` : "非当選"]];
    const gameAddOnStats = sim.karakuriJudgeFlow || coinAddOnCount
      ? [["上乗せ結果", addOnCount ? `${addOnCount}回・+${yen.format(coinAddOnTotal || addOnTotal)}枚` : "上乗せなし"]]
      : [["上乗せ結果", addOnCount ? `${addOnCount}回・+${yen.format(addOnGamesTotal || otomeAddedGames)}G` : "上乗せなし"]];
    const bonusStats = bonusCount ? [["ボーナス結果", `${bonusCount}回・+${yen.format(bonusPayoutTotal)}枚`]] : [];
    const atStats = entered ? (sim.uminchuFlow
      ? [["BONUS・32G消化", `${yen.format(rushGamesTotal)}G相当`], ...uminchuStats, ...bonusStats]
      : sim.tentenFlow
        ? [["BONUS・高確消化", `${yen.format(rushGamesTotal)}G相当`], ...tentenStats, ["王宮BONUS獲得", `${yen.format(bonusPayoutTotal)}枚`]]
      : [["RUSH消化モデル", `${yen.format(rushGamesTotal)}G相当`], ...karakuriStats, ...battleStats, ...sgStats, ...kabaneriStats, ...otomeStats, ...cycleStats, ...gameAddOnStats, ...bonusStats, ...genericSpecialStats, ["上位AT", upper ? (kabaneriUpperMode || `${sim.upperLabel} ${upperLoops}セット`) : "非到達"]]) : [];
    const stats = [["今回の設定", `設定${setting}`], ["設定差モデル", settingModelLabel], ["今回のゲーム数", `${yen.format(games)}G`], ...settingRateStats, ["現金投資目安", `${yen.format(investment)}円`], ...entryBonusStats, ...atStats, ["獲得枚数", `${yen.format(payout)}枚`], ["換金目安", `${yen.format(exchangeValue)}円`], ["差枚目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`], ["収支目安", `${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円`], ["利用レート", `${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換`], ["コイン単価", `${coinUnit.toFixed(1)}円・${riskLabel(coinUnit)}`], ["単価換算の台売上指標", `${yen.format(salesIndex)}円`]];
    if (complete) stats.unshift(["到達状態", "コンプリート"]);
    const resultTitle = complete ? "コンプリート" : upper ? `${upperResultLabel}到達` : entered ? `${sim.mainLabel}終了` : entryBonus ? `${entryBonus.label}終了` : `${sim.triggerLabel}失敗`;
    const resultSummary = complete
      ? `今回の設定は設定${setting}。${games}Gで${sim.triggerLabel}、獲得枚数が${yen.format(SLOT_COMPLETE_LIMIT)}枚に到達し、コンプリートしました。`
      : sim.uminchuFlow
        ? `今回の設定は設定${setting}。${games}GでBONUS初当り、最大${uminchuMaxChain}連・BIG ${uminchuBigCount}回・REG ${uminchuRegCount}回、${yen.format(payout)}枚を獲得しました。${uminchuIreguiCount ? `IREGUIは${uminchuIreguiCount}回です。` : "IREGUIには届きませんでした。"}`
        : sim.tentenFlow
          ? `今回の設定は設定${setting}。${games}GでEPISODE BATTLE、${entered ? `初回BONUSと王宮BONUS ${tentenPalaceBonusCount}回で${yen.format(payout)}枚を獲得しました。${upper ? `輪廻転天へ到達し、上位BONUSは${tentenUpperBonusCount}回です。` : "輪廻転天には届きませんでした。"}` : "CZは突破できませんでした。"}`
        : `今回の設定は設定${setting}。${games}Gで${sim.triggerLabel}。${entered ? `${payout}枚を獲得しました。${sim.kabaneriStFlow ? `ST中ボーナス${kabaneriStBonuses}回・${upper ? `${upperResultLabel} ${upperLoops}回当選。` : "上位ST非到達。"}` : `上乗せ${addOnCount}回・${upper ? `${upperResultLabel} ${upperLoops}セット。` : "上位AT非到達。"}`}` : entryBonus ? `${entryBonus.label}で約${yen.format(payout)}枚を獲得し、${sim.mainLabel}には届きませんでした。` : `${machine.initialHitLabel || sim.mainLabel}には届きませんでした。`}`;
    const kabaneriRareUpperLabel = sim.kabaneriUpperRareLabel || "裏美馬ST";
    const kabaneriUpperContinueChance = kabaneriUpperMode
      ? (kabaneriUpperMode === kabaneriRareUpperLabel
        ? (Number(sim.kabaneriUpperRareContinue) || 0.95)
        : (Number(sim.kabaneriUpperNormalContinue) || 0.80)) * 100
      : sim.upperContinue * 100;
    return { title: `設定${setting}｜${resultTitle}`, summary: resultSummary, stats, flow: [`設定${setting}`, ...flow], share: `${machine.shortName}｜設定${setting}｜${yen.format(games)}G｜投資${yen.format(investment)}円｜${resultLabel}｜上乗せ${addOnCount}回｜${yen.format(payout)}枚｜換金${yen.format(exchangeValue)}円｜収支${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円｜${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換｜コイン単価${coinUnit.toFixed(1)}円`, setting, score: Math.round(diff), rankScore, rankInvestment, scoreKind: "coins", balanceYen, exchangeValue, investment, payout, attempts: games, complete, settingModel: settingModelLabel, experience: { kind: "slot", setting, attempts: games, unit: "G", hitLabel: sim.triggerLabel, hitChance: 100 / triggerRate, triggerSucceeded, triggerSuccessChance: triggerSuccess * 100, entryBonusModel: Array.isArray(sim.entryBonusAwards) && sim.entryBonusAwards.length > 0, entryBonus, entered, entryChance: entryBonus ? (Number(entryBonus.atChance) || 0) * 100 : triggerSuccess * 100, mainLabel: sim.mainLabel, mainSetContinueChance: (sim.mainSetContinue || 0) * 100, setPushFlow: Boolean(sim.setPushFlow), karakuriJudgeFlow: Boolean(sim.karakuriJudgeFlow), battleBonusFlow: Boolean(sim.battleBonusFlow), garoBattleFlow: Boolean(sim.garoBattleFlow), ragnadorUpperFlow: Boolean(sim.ragnadorUpperFlow), seiyaTempleFlow: Boolean(sim.seiyaTempleFlow), ggoStFlow: Boolean(sim.ggoStFlow), godzillaEva2Flow: Boolean(sim.godzillaEva2Flow), mahoakoFlow: Boolean(sim.mahoakoFlow), tentenFlow: Boolean(sim.tentenFlow), sgRaceFlow: Boolean(sim.sgRaceFlow), kabaneriStFlow: Boolean(sim.kabaneriStFlow), otomeRushFlow: Boolean(sim.otomeRushFlow), cycleFlow: Boolean(sim.cycleFlow), cycleRounds, cycleContinues, kabaneriStBonuses, kabaneriUpperMode, otomeAddedGames, otomeBonusCount, otomeAwakeningCount, otomeBattleWon, otomeAddOnChance: (Number(sim.otomeAddOnChance) || 0) * 100, battleBonusSets, battleContinuationRate: battleContinuationRate * 100, sgRushSets, sgScenarioName, karakuriJudgeAttempts, karakuriJudgeSuccesses, karakuriUpperRoute, specialLabel: sim.specialLabel, specialChance: specialChance * 100, addOnCount, addOnTotal, addOnGamesTotal, coinAddOnCount, coinAddOnTotal, bonusCount, bonusPayoutTotal, atGamesTotal, upperRouteChance: upperChance * 100, upperSuccessChance: sim.upperSuccess * 100, upperContinueChance: kabaneriUpperContinueChance, upperChallenge: sim.upperChallenge || "", upper, upperLabel: kabaneriUpperMode || sim.upperLabel || "", upperLoops, complete, payout, payoutUnit: "枚", atEvents, atGameTimeline, flow: [...flow] } };
  }

  function createATypeSession(setting) {
    const sim = machine.sim;
    const profile = settingProfile(setting);
    const lendCoins = Math.max(40, Number(document.getElementById("lendCoins").value) || RANKING_RATE.slot.lendCoins);
    const exchangeCoins = Math.max(4, Number(document.getElementById("exchangeCoins").value) || RANKING_RATE.slot.exchangeCoins);
    const bigRate = Number(sim.settingRates?.[setting]?.big) || sim.bigRate * profile.big;
    const regRate = Number(sim.settingRates?.[setting]?.reg) || sim.regRate * profile.reg;
    const payoutRate = Number(sim.settingRates?.[setting]?.payout) || sim.payoutRate + profile.payout;
    return {
      setting,
      games: 0,
      maxGames: Number(sim.games) || 8000,
      big: 0,
      reg: 0,
      bigRate,
      regRate,
      payoutRate,
      combinedRate: 1 / (1 / bigRate + 1 / regRate),
      lendCoins,
      exchangeCoins,
      lastGap: 0,
      lastBonus: "",
      maxGap: 0,
      minDiff: 0,
      maxDiff: 0
    };
  }

  function aTypeDiff(session, games = session.games, big = session.big, reg = session.reg) {
    const expectedBig = games / session.bigRate;
    const expectedReg = games / session.regRate;
    const bonusDeviation = Math.round((big - expectedBig) * machine.sim.bigPayout + (reg - expectedReg) * machine.sim.regPayout);
    return Math.round(games * 3 * (session.payoutRate - 1)) + bonusDeviation;
  }

  function buildATypeResult(session, completed = false) {
    const { setting, games, big, reg, bigRate, regRate, combinedRate, lendCoins, exchangeCoins } = session;
    const bonusCount = big + reg;
    const actualCombined = bonusCount ? games / bonusCount : 0;
    const diff = aTypeDiff(session);
    const investmentUnits = Math.ceil(Math.max(0, -session.minDiff) / lendCoins);
    const investment = investmentUnits * 1000;
    const purchasedCoins = investmentUnits * lendCoins;
    const payout = Math.max(0, purchasedCoins + diff);
    const rankInvestmentUnits = Math.ceil(Math.max(0, -session.minDiff) / RANKING_RATE.slot.lendCoins);
    const rankInvestment = rankInvestmentUnits * 1000;
    const rankPayout = Math.max(0, rankInvestmentUnits * RANKING_RATE.slot.lendCoins + diff);
    const exchangeValue = Math.round(payout / exchangeCoins * 100);
    const balanceYen = exchangeValue - investment;
    const resultLabel = diff >= 0 ? `プラス${yen.format(diff)}枚` : `マイナス${yen.format(Math.abs(diff))}枚`;
    const combinedLabel = actualCombined ? `1/${actualCombined.toFixed(1)}` : "当選なし";
    const flow = [`設定${setting}`, `${yen.format(games)}G消化`, `BIG ${big}回`, `REG ${reg}回`, `合算 ${combinedLabel}`, `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`];
    const stats = [["今回の設定", `設定${setting}`], ["総ゲーム数", `${yen.format(games)}G`], [`設定${setting}の抽選値`, `BIG 1/${bigRate.toFixed(1)}・REG 1/${regRate.toFixed(1)}・合算1/${combinedRate.toFixed(1)}`], ["BIG", `${big}回（実績1/${big ? (games / big).toFixed(1) : "-"}）`], ["REG", `${reg}回（実績1/${reg ? (games / reg).toFixed(1) : "-"}）`], ["ボーナス合算", `${bonusCount}回（${combinedLabel}）`], ["最大ハマり", `${yen.format(session.maxGap || 0)}G`], ["現金投資目安", `${yen.format(investment)}円`], ["交換枚数目安", `${yen.format(payout)}枚`], ["換金目安", `${yen.format(exchangeValue)}円`], ["差枚目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`], ["収支目安", `${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円`], ["利用レート", `${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換`]];
    const finishLabel = completed ? "8,000G完走" : `${yen.format(games)}Gで終了`;
    return { title: `設定${setting}｜${finishLabel}・${resultLabel}`, summary: `今回の設定は設定${setting}。${yen.format(games)}GでBIG ${big}回・REG ${reg}回・合算${combinedLabel}でした。`, stats, flow, share: `${machine.shortName}｜設定${setting}｜${yen.format(games)}G｜BIG ${big}回｜REG ${reg}回｜合算${combinedLabel}｜差枚${diff >= 0 ? "+" : ""}${yen.format(diff)}枚｜収支${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円｜${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換`, setting, score: diff, rankScore: diff, rankInvestment, rankPayout, rankingEligible: completed, scoreKind: "coins", balanceYen, exchangeValue, investment, payout, attempts: games, complete: false, experience: { kind: "juggler", setting, attempts: games, unit: "G", hitLabel: "GOGO!ランプ", hitChance: 100 / combinedRate, entered: false, upper: false, mainLabel: "BIG・REG", big, reg, combinedLabel, diff, payout, payoutUnit: "枚", finalValue: `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`, flow: [...flow] } };
  }

  function readMachineHistory() {
    try {
      const records = JSON.parse(localStorage.getItem(MACHINE_HISTORY_KEY) || "[]");
      return Array.isArray(records) ? records : [];
    } catch { return []; }
  }

  function createMachinePlaySession() {
    return { runs: 0, wins: 0, investment: 0, exchangeValue: 0, balanceYen: 0, attempts: 0, payout: 0, score: 0, scoreKind: machine.type === "slot" ? "coins" : "balls" };
  }

  function resetMachinePlaySession() {
    machinePlaySession = null;
    const panel = document.getElementById("machineExperienceSessionTotal");
    if (panel) panel.hidden = true;
  }

  function addMachinePlaySessionResult(result) {
    if (!machinePlaySession) machinePlaySession = createMachinePlaySession();
    machinePlaySession.runs += 1;
    machinePlaySession.wins += Number(result.balanceYen) > 0 ? 1 : 0;
    machinePlaySession.investment += Number(result.investment) || 0;
    machinePlaySession.exchangeValue += Number(result.exchangeValue) || 0;
    machinePlaySession.balanceYen += Number(result.balanceYen) || 0;
    machinePlaySession.attempts += Number(result.attempts) || 0;
    machinePlaySession.payout += Number(result.payout) || 0;
    machinePlaySession.score += Number(result.score) || 0;
    machinePlaySession.scoreKind = result.scoreKind || machinePlaySession.scoreKind;
    const balanceSign = machinePlaySession.balanceYen >= 0 ? "+" : "";
    const scoreSign = machinePlaySession.score >= 0 ? "+" : "";
    const unit = machinePlaySession.scoreKind === "coins" ? "枚" : "玉";
    const attemptsLabel = machine.sim.kind === "pachinko" ? "通常時総回転数" : machine.sim.kind === "juggler" ? "総ゲーム数" : "通常時総G";
    const attemptsUnit = machine.sim.kind === "pachinko" ? "回転" : "G";
    document.getElementById("machineExperienceSessionBalance").innerHTML = `合計収支 ${balanceSign}${yen.format(machinePlaySession.balanceYen)}円<br>${attemptsLabel} ${yen.format(machinePlaySession.attempts)}${attemptsUnit}`;
    document.getElementById("machineExperienceSessionDetail").textContent = `${machinePlaySession.runs}回・${machinePlaySession.wins}勝 / 総投資 ${yen.format(machinePlaySession.investment)}円 / 総換金 ${yen.format(machinePlaySession.exchangeValue)}円 / 合計差${unit} ${scoreSign}${yen.format(machinePlaySession.score)}${unit}`;
    document.getElementById("machineExperienceSessionTotal").hidden = false;
    return machinePlaySession;
  }

  function saveMachineHistory(result) {
    const savedAt = new Date().toISOString();
    const rateLabel = result.stats.find(([label]) => label === "利用レート")?.[1] || "";
    const coinUnitLabel = result.stats.find(([label]) => label === "コイン単価")?.[1] || "";
    const record = {
      id: typeof window.crypto?.randomUUID === "function" ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      slug,
      machineName: machine.name,
      shortName: machine.shortName,
      type: machine.type,
      savedAt,
      title: result.title,
      summary: result.summary,
      balanceYen: Number(result.balanceYen) || 0,
      investment: Number(result.investment) || 0,
      exchangeValue: Number(result.exchangeValue) || 0,
      displayedPayout: Number(result.displayedPayout) || 0,
      payout: Number(result.payout) || 0,
      attempts: Number(result.attempts) || 0,
      score: Number(result.score) || 0,
      scoreKind: result.scoreKind,
      setting: Number(result.setting) || null,
      rateLabel,
      coinUnitLabel,
      complete: Boolean(result.complete),
      entered: Boolean(result.experience?.entered),
      upper: Boolean(result.experience?.upper),
      hits: Number(result.experience?.hits) || 0,
      flow: Array.isArray(result.flow) ? result.flow.slice(0, 12) : []
    };
    const records = readMachineHistory();
    records.unshift(record);
    try {
      const savedRecords = records.slice(0, MACHINE_HISTORY_LIMIT);
      localStorage.setItem(MACHINE_HISTORY_KEY, JSON.stringify(savedRecords));
      window.dispatchEvent(new CustomEvent("ichigeki:records-changed", { detail: { record, records: savedRecords } }));
      const achievementState = window.ICHIGEKI_ACHIEVEMENTS?.sync(savedRecords);
      return { count: Math.min(records.length, MACHINE_HISTORY_LIMIT), newTitles: achievementState?.newlyUnlocked || [] };
    } catch { return { count: null, newTitles: [] }; }
  }

  function renderResult(result) {
    latestResult = result;
    const saveInfo = saveMachineHistory(result);
    const resultPanel = document.getElementById("machineResult");
    document.getElementById("resultTitle").textContent = result.title;
    document.getElementById("resultSummary").textContent = result.summary;
    document.getElementById("resultStats").innerHTML = result.stats.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
    document.getElementById("resultFlow").innerHTML = result.flow.map(item => `<span>${item}</span>`).join("<b>›</b>");
    const overlayStats = result.stats.filter(([label]) => /設定|回転数|ゲーム数|投資|表記出玉|実獲得出玉|総出玉|獲得枚数|差玉|差枚|収支/.test(label)).slice(0, 6);
    document.getElementById("machineExperienceResultStats").innerHTML = overlayStats.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
    const experienceActions = document.getElementById("machineExperienceActions");
    experienceActions.dataset.resultTone = result.complete ? "complete" : result.balanceYen >= 0 ? "win" : "lose";
    setExperienceHud(`${yen.format(result.attempts)}${machine.sim.kind === "pachinko" ? "回転" : "G"}`, `${yen.format(result.investment)}円`, machine.sim.kind === "juggler" ? `${result.score >= 0 ? "+" : ""}${yen.format(result.score)}枚` : `${yen.format(result.payout)}${machine.type === "slot" ? "枚" : "玉"}`);
    resultPanel.classList.add("has-result");
    resultPanel.classList.toggle("is-complete", Boolean(result.complete));
    resultPanel.querySelector(":scope > span").textContent = result.complete ? "SLOT COMPLETE" : "RESULT";
    document.getElementById("machineAutoSaveStatus").textContent = saveInfo.count === null ? "自動保存できませんでした。ブラウザの保存設定をご確認ください。" : `マイ記録へ自動保存しました（合計${yen.format(saveInfo.count)}回）`;
    document.getElementById("machineOverlaySaveStatus").textContent = saveInfo.count === null ? "自動保存できませんでした" : saveInfo.newTitles.length ? `称号獲得！ ${saveInfo.newTitles.map(item => item.name).join("・")}` : `マイ記録へ自動保存しました（合計${yen.format(saveInfo.count)}回）`;
    const achievementToast = document.getElementById("machineAchievementUnlock");
    achievementToast.hidden = saveInfo.newTitles.length === 0;
    if (saveInfo.newTitles.length) achievementToast.querySelector("strong").textContent = saveInfo.newTitles.map(item => item.name).join("・");
    const rankingEligible = result.rankingEligible !== false;
    document.getElementById("rankMachineResult").disabled = !rankingEligible;
    document.getElementById("rankMachineResult").textContent = rankingEligible ? "ランキングに登録" : "8,000G完走で登録可能";
    document.getElementById("shareMachineResult").href = `community.html?machine=${slug}&compose=simulation&result=${encodeURIComponent(result.share)}#simulationComposer`;
    window.ICHIGEKI_INSIGHTS?.track("simulation_complete", {
      machine_slug: slug,
      machine_type: machine.type,
      setting: Number(result.setting) || 0,
      positive: Number(result.balanceYen) > 0,
      complete: Boolean(result.complete),
      upper: Boolean(result.experience?.upper)
    });
  }

  const startButton = document.getElementById("machineStart");
  startButton.disabled = !machineReady;
  const stickyBackButton = document.getElementById("machineStickyBack");
  const simulator = document.getElementById("simulator");
  const startAnchor = document.getElementById("machineStartAnchor");
  let simulatorVisible = false;
  let startAnchorVisible = false;
  let resultPosition = false;
  const mobileStickyStart = window.matchMedia("(max-width: 760px)");

  function updateStickyStart() {
    const shouldStick = machineReady && !startAnchorVisible && !resultPosition && (simulatorVisible || mobileStickyStart.matches);
    const soloSticky = shouldStick && !simulatorVisible;
    startButton.classList.toggle("is-sticky", shouldStick);
    startButton.classList.toggle("is-solo-sticky", soloSticky);
    stickyBackButton.hidden = !shouldStick || soloSticky;
    document.body.classList.toggle("has-machine-sticky-start", shouldStick);
  }

  if (typeof mobileStickyStart.addEventListener === "function") mobileStickyStart.addEventListener("change", updateStickyStart);
  else mobileStickyStart.addListener(updateStickyStart);

  stickyBackButton.addEventListener("click", () => {
    let canReturnWithinSite = false;
    try { canReturnWithinSite = Boolean(document.referrer) && new URL(document.referrer, window.location.href).origin === window.location.origin; } catch { /* Use the machine list fallback. */ }
    if (canReturnWithinSite) window.history.back();
    else window.location.href = machine.type === "slot" ? "slots.html" : "pachinko.html";
  });

  if ("IntersectionObserver" in window) {
    const simulatorObserver = new IntersectionObserver(entries => {
      simulatorVisible = entries[0].isIntersecting;
      updateStickyStart();
    }, { threshold: 0.05 });
    const anchorObserver = new IntersectionObserver(entries => {
      startAnchorVisible = entries[0].isIntersecting;
      updateStickyStart();
    }, { threshold: 0.8 });
    simulatorObserver.observe(simulator);
    anchorObserver.observe(startAnchor);
  }
  updateStickyStart();

  function maybeRequestAdBreak() {
    const countKey = "ichigekiAdAttemptsV1";
    const lastKey = "ichigekiAdLastShownV1";
    const attempts = (Number(localStorage.getItem(countKey)) || 0) + 1;
    localStorage.setItem(countKey, String(attempts));
    const lastShown = Number(localStorage.getItem(lastKey)) || 0;
    if (attempts < 5 || Date.now() - lastShown < 10 * 60 * 1000 || typeof window.adBreak !== "function") return;
    localStorage.setItem(countKey, "0");
    localStorage.setItem(lastKey, String(Date.now()));
    window.adBreak({ type: "next", name: "machine-result-break", beforeAd: () => {}, afterAd: () => {} });
  }

  function updateExperienceSoundButton() {
    const button = document.getElementById("machineExperienceSound");
    if (!button) return;
    button.textContent = experienceSoundEnabled ? "音ON" : "音OFF";
    button.setAttribute("aria-pressed", String(experienceSoundEnabled));
    button.classList.toggle("is-on", experienceSoundEnabled);
  }

  function playExperienceSound(tone = "normal", force = false) {
    if (!experienceSoundEnabled || (!force && experienceSkipped)) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      experienceAudioContext ||= new AudioContextClass();
      if (experienceAudioContext.state === "suspended") experienceAudioContext.resume();
      const now = experienceAudioContext.currentTime;
      const master = experienceAudioContext.createGain();
      master.gain.setValueAtTime(.34, now);
      master.connect(experienceAudioContext.destination);

      const voice = ({ frequency, endFrequency = frequency, offset = 0, duration = .12, attack = .008, volume = .12, type = "triangle", detune = 0 }) => {
        const start = now + offset;
        const oscillator = experienceAudioContext.createOscillator();
        const gain = experienceAudioContext.createGain();
        oscillator.type = type;
        oscillator.detune.setValueAtTime(detune, start);
        oscillator.frequency.setValueAtTime(Math.max(1, frequency), start);
        oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.exponentialRampToValueAtTime(Math.max(.0002, volume), start + Math.min(attack, duration * .45));
        gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
        oscillator.connect(gain).connect(master);
        oscillator.start(start);
        oscillator.stop(start + duration + .03);
      };

      const noise = ({ offset = 0, duration = .08, volume = .05, frequency = 1200 }) => {
        const start = now + offset;
        const frameCount = Math.max(1, Math.floor(experienceAudioContext.sampleRate * duration));
        const buffer = experienceAudioContext.createBuffer(1, frameCount, experienceAudioContext.sampleRate);
        const channel = buffer.getChannelData(0);
        for (let index = 0; index < frameCount; index += 1) channel[index] = Math.random() * 2 - 1;
        const source = experienceAudioContext.createBufferSource();
        const filter = experienceAudioContext.createBiquadFilter();
        const gain = experienceAudioContext.createGain();
        source.buffer = buffer;
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(frequency, start);
        filter.Q.setValueAtTime(.8, start);
        gain.gain.setValueAtTime(volume, start);
        gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
        source.connect(filter).connect(gain).connect(master);
        source.start(start);
      };

      const chord = (frequencies, gap, options = {}) => frequencies.forEach((frequency, index) => voice({ frequency, offset: index * gap, ...options }));
      const sounds = {
        normal: () => voice({ frequency: 170, endFrequency: 105, duration: .09, volume: .08, type: "triangle" }),
        push: () => {
          voice({ frequency: 118, endFrequency: 46, duration: .2, volume: .2, type: "sine" });
          voice({ frequency: 245, endFrequency: 120, offset: .008, duration: .07, volume: .08, type: "square" });
          noise({ duration: .075, volume: .045, frequency: 850 });
        },
        hit: () => {
          voice({ frequency: 130, endFrequency: 260, duration: .25, volume: .12, type: "sawtooth" });
          chord([523.25, 659.25, 783.99, 1046.5], .065, { duration: .15, volume: .11, type: "triangle" });
          noise({ offset: .18, duration: .12, volume: .035, frequency: 2600 });
        },
        judge: () => {
          voice({ frequency: 196, endFrequency: 145, duration: .11, volume: .12, type: "square" });
          voice({ frequency: 196, endFrequency: 145, offset: .18, duration: .11, volume: .12, type: "square" });
        },
        rush: () => {
          voice({ frequency: 98, endFrequency: 196, duration: .3, volume: .13, type: "sawtooth" });
          chord([392, 523.25, 659.25, 783.99], .055, { duration: .14, volume: .1, type: "triangle" });
        },
        hyper: () => {
          voice({ frequency: 110, endFrequency: 440, duration: .38, volume: .15, type: "sawtooth" });
          chord([523.25, 659.25, 783.99, 1046.5, 1318.5], .05, { duration: .16, volume: .1, type: "triangle" });
          noise({ offset: .2, duration: .15, volume: .03, frequency: 3200 });
        },
        complete: () => {
          voice({ frequency: 82, endFrequency: 328, duration: .55, volume: .16, type: "sawtooth" });
          chord([392, 523.25, 659.25, 783.99, 1046.5, 1318.5], .07, { duration: .2, volume: .11, type: "triangle" });
          chord([196, 261.63, 329.63], 0, { offset: .38, duration: .42, volume: .07, type: "sine" });
        },
        end: () => {
          voice({ frequency: 293.66, endFrequency: 196, duration: .22, volume: .1, type: "triangle" });
          voice({ frequency: 196, endFrequency: 82, offset: .15, duration: .32, volume: .12, type: "sine" });
        }
      };
      (sounds[tone] || sounds.normal)();
    } catch { /* Audio is an optional enhancement. */ }
  }

  function setExperienceExpectation(expectancy, cue) {
    const numeric = Number(expectancy);
    const hasRate = Number.isFinite(numeric);
    const rate = hasRate ? Math.max(0, Math.min(100, numeric)) : 0;
    const displayRate = rate > 0 && rate < 1 ? rate.toFixed(1) : Math.round(rate);
    document.getElementById("machineExperienceCue").textContent = cue || experienceProfile.cue;
    document.getElementById("machineExperienceChance").textContent = hasRate ? `${displayRate}%` : "抽選中";
    document.getElementById("machineExperienceChanceBar").style.width = hasRate ? `${Math.max(rate, rate > 0 ? 3 : 0)}%` : "0%";
    const track = document.querySelector(".machine-expectation-track");
    track.setAttribute("aria-valuenow", String(hasRate ? rate : 0));
    track.setAttribute("aria-valuetext", hasRate ? `${displayRate}パーセント` : "抽選中");
  }

  function setExperienceStage(index, phase, title, value, message, tone = "normal", expectancy = null, cue = "") {
    const experience = document.getElementById("machineExperience");
    experience.dataset.tone = tone;
    document.getElementById("machineExperienceStep").textContent = `STEP ${index + 1} / 5`;
    document.getElementById("machineExperiencePhase").textContent = phase;
    document.getElementById("machineExperienceTitle").textContent = title;
    document.getElementById("machineExperienceValue").textContent = value;
    document.getElementById("machineExperienceMessage").textContent = message;
    setExperienceExpectation(expectancy, cue);
    playExperienceSound(tone);
    document.querySelectorAll("[data-machine-experience-step]").forEach(item => {
      const step = Number(item.dataset.machineExperienceStep);
      item.classList.toggle("is-current", step === index);
      item.classList.toggle("is-done", step < index);
    });
  }

  function setExperienceHud(current, investment, reward) {
    document.getElementById("machineExperienceCurrent").textContent = current;
    document.getElementById("machineExperienceInvestment").textContent = investment;
    document.getElementById("machineExperienceReward").textContent = reward;
  }

  function setSlotAtStatus({ visible = false, games = 0, remaining = null, addOn = 0, addOnGames = null, total = 0 } = {}) {
    const status = document.getElementById("machineSlotAtStatus");
    if (!status) return;
    status.hidden = !visible;
    if (!visible) return;
    const hasRemaining = remaining !== null && Number.isFinite(Number(remaining));
    document.getElementById("machineSlotRemaining").textContent = hasRemaining
      ? `残り ${yen.format(Math.max(0, Math.round(Number(remaining))))}G`
      : `消化 ${yen.format(Math.max(0, Math.round(games)))}G`;
    document.getElementById("machineSlotAddOn").textContent = addOnGames !== null && Number.isFinite(Number(addOnGames))
      ? `上乗せ +${yen.format(Math.max(0, Math.round(Number(addOnGames))))}G`
      : `上乗せ +${yen.format(Math.max(0, Math.round(addOn)))}枚`;
    document.getElementById("machineSlotTotal").textContent = `累計 ${yen.format(Math.max(0, Math.round(total)))}枚`;
  }

  function waitForExperienceAction(label, autoDelay = 4500, variant = "normal") {
    if (experienceSkipped) return Promise.resolve();
    const button = document.getElementById("machineExperiencePush");
    const experience = document.getElementById("machineExperience");
    button.innerHTML = "<span>PUSH</span><small>タップ / 自動で結果表示</small>";
    button.setAttribute("aria-label", label || "PUSH");
    button.hidden = false;
    experience.dataset.pushVariant = variant;
    experience.classList.add("is-action-ready");
    return new Promise(resolve => {
      const completeAction = () => {
        if (experienceActionTimer) window.clearTimeout(experienceActionTimer);
        experienceActionTimer = null;
        button.hidden = true;
        experience.classList.remove("is-action-ready");
        delete experience.dataset.pushVariant;
        experienceActionResolve = null;
        resolve();
      };
      experienceActionResolve = completeAction;
      experienceActionTimer = window.setTimeout(completeAction, autoDelay);
      window.setTimeout(() => button.focus({ preventScroll: true }), 60);
    });
  }

  function waitForExperience(milliseconds) {
    if (experienceSkipped) return Promise.resolve();
    return new Promise(resolve => {
      experienceDelayResolve = resolve;
      experienceDelayTimer = window.setTimeout(() => {
        experienceDelayTimer = null;
        experienceDelayResolve = null;
        resolve();
      }, milliseconds);
    });
  }

  async function animateExperienceCounter(total, unit, phase, title, message, expectancy, cue, runId, options = {}) {
    const countTo = Math.max(1, Math.round(Number(total) || 1));
    const countdown = unit === "G" ? options.countdown !== false : Boolean(options.countdown);
    setExperienceStage(3, phase, title, `${countdown ? countTo : 0}${unit}`, message, "normal", expectancy, cue);
    for (const progress of [.08, .2, .36, .55, .73, .88, 1]) {
      if (runId !== experienceRunId || experienceSkipped) return false;
      const current = countdown ? Math.max(0, countTo - Math.round(countTo * progress)) : Math.max(1, Math.round(countTo * progress));
      document.getElementById("machineExperienceValue").textContent = `${yen.format(current)}${unit}`;
      document.getElementById("machineExperienceCurrent").textContent = countdown ? `残り ${yen.format(current)}${unit}` : `${yen.format(current)}${unit}`;
      document.getElementById("machineExperienceMessage").textContent = countdown ? `残り ${yen.format(current)}${unit} / ${message}` : `${yen.format(current)}${unit} / ${message}`;
      if (countdown && unit === "G") {
        const status = document.getElementById("machineSlotAtStatus");
        if (status) status.hidden = false;
        const remaining = document.getElementById("machineSlotRemaining");
        if (remaining) remaining.textContent = `残り ${yen.format(current)}G`;
      }
      await waitForExperience(72);
    }
    return runId === experienceRunId;
  }

  async function animateValvrave100GameBonus({ upper = false, set = 1 } = {}, runId) {
    setExperienceStage(3, upper ? "SUPER REVOLUTION DRIVE" : "REVOLUTION DRIVE", "ゲーム数上乗せ", "+10G", "100G到達まで数字が加速します", "judge", 100, `SET ${set} 100G振り分け`);
    for (const games of [20, 30, 50, 70, 90]) {
      if (runId !== experienceRunId || experienceSkipped) return false;
      document.getElementById("machineExperienceTitle").textContent = games >= 70 ? "まだ上がる！" : "上乗せ加速中";
      document.getElementById("machineExperienceValue").textContent = `+${games}G`;
      document.getElementById("machineExperienceMessage").textContent = `SET ${set} ゲーム数振り分け・${games}G`;
      await waitForExperience(170);
    }
    if (runId !== experienceRunId) return false;
    setExperienceStage(3, upper ? "SUPER REVOLUTION DRIVE" : "REVOLUTION DRIVE", "100G 上乗せ！", "+100G", `SET ${set} は100Gに決定`, upper ? "hyper" : "hit", 100, "PREMIUM GAME ALLOCATION");
    await waitForExperience(1050);
    return runId === experienceRunId;
  }

  async function animatePachinkoRushRunout(data, result, runId) {
    const totalGames = Math.max(10, Math.round(Number(data.rushGameLimit) || 100));
    const checkpoints = data.upper ? [.07, .15, .24, .34, .45, .56, .67, .77, .86, .93] : [.12, .28, .45, .62, .76, .88];
    const stepDelay = data.upper ? 115 : 68;
    setExperienceStage(3, data.upper ? "UPPER RUSH LAST" : "RUSH LAST", `${data.upper ? data.upperLabel : data.mainLabel} 最終区間`, `0 / ${yen.format(totalGames)}回転`, "RUSH終了まで残り回転を消化します", data.upper ? "hyper" : "normal", data.upper ? data.upperContinueChance : data.continueChance, "RUSH終了までの回転");
    let previousCurrent = 0;
    for (const progress of checkpoints) {
      if (runId !== experienceRunId || experienceSkipped) return false;
      const current = Math.max(1, Math.min(totalGames - 4, Math.round(totalGames * progress)));
      if (current <= previousCurrent) continue;
      previousCurrent = current;
      const remaining = Math.max(0, totalGames - current);
      document.getElementById("machineExperienceValue").textContent = `${yen.format(current)} / ${yen.format(totalGames)}回転`;
      document.getElementById("machineExperienceTitle").textContent = `残り${yen.format(remaining)}回転`;
      document.getElementById("machineExperienceMessage").textContent = "数字が進む…残り回転を消化中";
      setExperienceHud(`${yen.format(current)}回転`, `${yen.format(result.investment)}円`, `${yen.format(data.payout)}${data.payoutUnit}`);
      await waitForExperience(stepDelay);
    }
    for (const remaining of [3, 2, 1, 0]) {
      if (runId !== experienceRunId || experienceSkipped) return false;
      const current = totalGames - remaining;
      document.getElementById("machineExperienceValue").textContent = `${yen.format(current)} / ${yen.format(totalGames)}回転`;
      document.getElementById("machineExperienceTitle").textContent = remaining ? `残り${remaining}回転` : "LAST 0";
      document.getElementById("machineExperienceMessage").textContent = remaining ? `最終${remaining}回転・消化中` : "最終回転まで駆け抜けました";
      setExperienceHud(`${yen.format(current)}回転`, `${yen.format(result.investment)}円`, `${yen.format(data.payout)}${data.payoutUnit}`);
      await waitForExperience(500);
    }
    if (runId !== experienceRunId) return false;
    setExperienceStage(3, "RUSH END", "RUSH終了", `${yen.format(totalGames)}回転 消化`, `大当りなし・${data.hits}回当たりで終了`, "end", 0, "駆け抜け結果");
    setExperienceHud(`${yen.format(totalGames)}回転`, `${yen.format(result.investment)}円`, `${yen.format(data.payout)}${data.payoutUnit}`);
    await waitForExperience(620);
    return runId === experienceRunId;
  }

  function skipExperience() {
    experienceSkipped = true;
    if (experienceDelayTimer) window.clearTimeout(experienceDelayTimer);
    experienceDelayTimer = null;
    if (experienceDelayResolve) experienceDelayResolve();
    experienceDelayResolve = null;
    if (experienceActionResolve) experienceActionResolve();
    experienceActionResolve = null;
    if (experienceActionTimer) window.clearTimeout(experienceActionTimer);
    experienceActionTimer = null;
    const pushButton = document.getElementById("machineExperiencePush");
    if (pushButton) pushButton.hidden = true;
    const experience = document.getElementById("machineExperience");
    experience?.classList.remove("is-action-ready");
    if (experience) delete experience.dataset.pushVariant;
  }

  function openExperience() {
    const experience = document.getElementById("machineExperience");
    if (!document.body.classList.contains("has-machine-experience")) experienceReturnFocus = document.activeElement;
    experience.hidden = false;
    experience.classList.add("is-fullscreen");
    document.body.classList.add("has-machine-experience");
    document.body.classList.remove("has-machine-sticky-start");
    startButton.classList.remove("is-sticky");
    stickyBackButton.hidden = true;
    document.getElementById("machineExperienceActions").hidden = true;
    document.getElementById("machineExperienceFinishActions").hidden = true;
    document.getElementById("machineAtypeActions").hidden = true;
    document.getElementById("machineExperiencePush").hidden = true;
    setSlotAtStatus();
    setExperienceHud(`0${machine.sim.kind === "pachinko" ? "回転" : "G"}`, "0円", `0${machine.type === "slot" ? "枚" : "玉"}`);
    document.getElementById("machineOverlayNickname").value = document.getElementById("rankingNickname").value;
    updateExperienceSoundButton();
  }

  function closeExperience() {
    experienceRunId += 1;
    skipExperience();
    const experience = document.getElementById("machineExperience");
    experience.hidden = true;
    experience.classList.remove("is-fullscreen");
    document.body.classList.remove("has-machine-experience");
    startButton.disabled = false;
    document.getElementById("machineExperienceActions").hidden = true;
    document.getElementById("machineExperienceFinishActions").hidden = true;
    document.getElementById("machineAtypeActions").hidden = true;
    setSlotAtStatus();
    aTypeSession = null;
    aTypeBusy = false;
    resetMachinePlaySession();
    updateStickyStart();
    if (experienceReturnFocus?.focus) experienceReturnFocus.focus({ preventScroll: true });
  }

  function showExperienceActions() {
    const rankingEligible = latestResult?.rankingEligible !== false;
    document.getElementById("machineOverlayRank").disabled = !rankingEligible;
    document.getElementById("machineOverlayRank").textContent = rankingEligible ? "ランキングに登録" : "8,000G完走で登録可能";
    document.getElementById("machineOverlayPost").href = document.getElementById("shareMachineResult").href;
    document.getElementById("machineOverlayNickname").value = document.getElementById("rankingNickname").value;
    document.getElementById("machineExperienceActions").hidden = false;
  }

  async function playPachinkoExperience(result, runId) {
    const data = result.experience;
    setExperienceHud("0回転", "0円", "0玉");
    setExperienceStage(0, experienceProfile.system, "通常回転中", "0回転", `${data.hitLabel}を目指して抽選中`, "normal", data.hitChance, "1回転ごとの大当り確率");
    for (const progress of [0.05, 0.13, 0.24, 0.39, 0.56, 0.72, 0.87, 1]) {
      if (runId !== experienceRunId || experienceSkipped) break;
      const currentSpins = Math.max(1, Math.round(data.attempts * progress));
      document.getElementById("machineExperienceValue").textContent = `${yen.format(currentSpins)}回転`;
      setExperienceHud(`${yen.format(currentSpins)}回転`, `${yen.format(Math.ceil(result.investment * progress / 1000) * 1000)}円`, "0玉");
      await waitForExperience(115);
    }
    if (runId !== experienceRunId) return;
    setExperienceStage(1, "FEVER", `${data.hitLabel}！`, `${yen.format(data.attempts)}回転`, "RUSH突入ジャッジへ", "hit", 100, experienceProfile.cue);
    await waitForExperience(820);
    setExperienceStage(2, "RUSH JUDGE", `${data.mainLabel}突入ジャッジ`, "3", "運命の分岐を抽選中", "judge", data.entryChance, `${data.mainLabel}突入率`);
    for (const count of [2, 1]) {
      await waitForExperience(260);
      if (runId !== experienceRunId || experienceSkipped) break;
      document.getElementById("machineExperienceValue").textContent = String(count);
    }
    await waitForExperience(300);
    if (runId !== experienceRunId) return;
    setExperienceStage(2, "RUSH JUDGE", "ボタンを押せ", "PUSH", `${data.mainLabel}の当落を決めます`, "judge", data.entryChance, `${data.mainLabel}突入率`);
    await waitForExperienceAction("PUSH");
    if (runId !== experienceRunId) return;
    setExperienceStage(2, "RUSH JUDGE", data.entered ? `${data.mainLabel} 突入` : `${data.mainLabel} 非突入`, data.entered ? "突入成功" : "通常へ", data.entered ? "連チャン抽選へ進みます" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, "判定結果");
    setExperienceHud(`${yen.format(data.attempts)}回転`, `${yen.format(result.investment)}円`, `${yen.format(data.entered ? 0 : data.payout)}玉`);
    await waitForExperience(760);
    if (data.entered) {
      const animatedHits = arcadePachinkoFlow ? Math.max(1, data.hits) : Math.min(Math.max(1, data.hits), 10);
      const upperEntryHit = data.upper ? Math.max(1, Math.min(animatedHits, Math.round(Number(data.upperEntryHit) || 1))) : Number.POSITIVE_INFINITY;
      for (let hit = 1; hit <= animatedHits; hit += 1) {
        if (runId !== experienceRunId || experienceSkipped) break;
        const inUpper = data.upper && hit >= upperEntryHit;
        const upperReached = inUpper && hit === upperEntryHit;
        const isFinalHit = hit === data.hits;
        const isHotHit = arcadePachinkoFlow && !inUpper && !isFinalHit && hit > 1 && hit % 3 === 0;
        const estimatedPayout = data.payoutTimeline?.[hit - 1] ?? Math.max(1, Math.round(data.payout * hit / data.hits));
        const rushGames = data.rushGameTimeline?.[hit - 1] || data.rushGameLimit || 100;
        const counterComplete = await animateExperienceCounter(rushGames, "回転", inUpper ? "UPPER COUNT" : "RUSH COUNT", upperReached ? `${data.upperLabel}を抽選中` : inUpper ? `${data.upperLabel}消化中` : `${data.mainLabel}消化中`, "当落まで数字が進みます", inUpper ? data.upperContinueChance : data.continueChance, inUpper ? `${data.upperLabel}継続率` : `${data.mainLabel}継続率`, runId);
        if (!counterComplete) return;
        if (arcadePachinkoFlow || hit === 1 || upperReached) {
          const decisionLabel = upperReached ? `${data.upperLabel} 突入ジャッジ` : inUpper ? `${data.upperLabel} 継続ジャッジ` : isHotHit ? "高期待度ジャッジ" : `${data.mainLabel} 継続ジャッジ`;
          const decisionChance = inUpper ? data.upperContinueChance : data.continueChance;
          const decisionPhase = upperReached ? "UPPER JUDGE" : inUpper ? "UPPER RUSH" : isHotHit ? "HIGH CHANCE" : "RUSH JUDGE";
          const decisionMessage = upperReached ? "上位RUSHの当落を開きます" : inUpper ? "上位RUSHの継続当落を開きます" : isHotHit ? "期待が高まる継続ジャッジ" : "大当たり中の当落を開きます";
          const pushVariant = inUpper ? "upper" : isHotHit ? "gold" : "normal";
          const pushLabel = upperReached ? "上位PUSH" : inUpper ? "上位継続PUSH" : isHotHit ? "激熱PUSH" : "継続PUSH";
          setExperienceStage(3, decisionPhase, decisionLabel, arcadePachinkoFlow ? `${yen.format(rushGames)}回転` : "PUSH", decisionMessage, "judge", decisionChance, inUpper ? `${data.upperLabel}継続率` : `${data.mainLabel}継続率`);
          await waitForExperienceAction(pushLabel, arcadePachinkoFlow && hit > 10 ? 2200 : 4500, pushVariant);
          if (runId !== experienceRunId) return;
          if (upperReached) {
            setExperienceStage(3, "UPPER RUSH", `${data.upperLabel} 突入！`, "上位RUSH開始", "ここから上位継続抽選へ進みます", "hyper", data.upperContinueChance, `${data.upperLabel}継続率`);
            await waitForExperience(850);
            if (runId !== experienceRunId) return;
          }
        }
        const displayedAward = data.displayedAwards?.[hit - 1] ?? Math.max(0, Math.round(data.displayedPayout / data.hits));
        const previousPayout = data.payoutTimeline?.[hit - 2] || 0;
        const actualAward = data.actualAwards?.[hit - 1] ?? Math.max(0, estimatedPayout - previousPayout);
        const roundLabel = pachinkoRoundLabel(displayedAward);
        setExperienceHud(`${yen.format(data.attempts)}回転`, `${yen.format(result.investment)}円`, `${yen.format(estimatedPayout)}玉`);
        setExperienceStage(3, inUpper ? "UPPER RUSH" : "RUSH MODE", upperReached ? `${data.upperLabel} 突入` : inUpper ? `${data.upperLabel} 継続！` : hit === 1 ? "RUSH START" : "RUSH 継続！", `${roundLabel} / +${yen.format(displayedAward)}${data.payoutUnit}`, `実獲得 +${yen.format(actualAward)}${data.payoutUnit} / 累計 ${yen.format(estimatedPayout)}${data.payoutUnit}`, inUpper ? "hyper" : "rush", inUpper ? data.upperContinueChance : data.continueChance, inUpper ? `${data.upperLabel}継続率` : `${data.mainLabel}継続率`);
        await waitForExperience(1000);
      }
      if (data.hits > animatedHits && !experienceSkipped) {
        setExperienceStage(3, "RUSH MODE", "一気に連チャン！", `${data.hits}回 / ${yen.format(data.payout)}${data.payoutUnit}`, "高速演出で最終結果へ", data.upper ? "hyper" : "rush", data.upper ? data.upperContinueChance : data.continueChance, "継続率");
        await waitForExperience(580);
      }
      if (runId !== experienceRunId) return;
      await animatePachinkoRushRunout(data, result, runId);
    } else {
      setExperienceStage(3, "NORMAL END", "通常へ", "連チャンなし", "最終結果を表示します", "end", 0, "連チャン結果");
      await waitForExperience(420);
    }
  }

  async function playSlotExperience(result, runId) {
    const data = result.experience;
    const godzillaEva2Flow = Boolean(data.godzillaEva2Flow);
    const mahoakoFlow = Boolean(data.mahoakoFlow);
    const uminchuFlow = Boolean(machine.sim.uminchuFlow);
    const tentenFlow = Boolean(data.tentenFlow);
    setExperienceHud("0G", "0円", "0枚");
    setExperienceStage(0, experienceProfile.system, "通常ゲーム中", "0G", `${data.hitLabel}を目指して抽選中`, "normal", data.hitChance, "1Gごとの契機当選率");
    for (const progress of [0.05, 0.13, 0.24, 0.39, 0.56, 0.72, 0.87, 1]) {
      if (runId !== experienceRunId || experienceSkipped) break;
      const currentGames = Math.max(1, Math.round(data.attempts * progress));
      document.getElementById("machineExperienceValue").textContent = `${yen.format(currentGames)}G`;
      setExperienceHud(`${yen.format(currentGames)}G`, `${yen.format(Math.ceil(result.investment * progress / 1000) * 1000)}円`, "0枚");
      await waitForExperience(115);
    }
    if (runId !== experienceRunId) return;
    setExperienceStage(1, uminchuFlow ? "BONUS HIT" : tentenFlow ? "EPISODE BATTLE" : mahoakoFlow ? "ENTRY CHANCE" : "CHANCE ZONE", data.hitLabel, `${yen.format(data.attempts)}G`, uminchuFlow ? "告知音とともに初当りBONUSへ" : tentenFlow ? "10GのレベルUPパートと4Gのバトルへ" : data.entryBonusModel ? (mahoakoFlow ? "CZまたはBONUSの種類をPUSHで開きます" : "初当りBONUSをかけたジャッジへ") : `${data.mainLabel}突入をかけたジャッジへ`, "hit", 100, experienceProfile.cue);
    await waitForExperience(780);
    if (data.entryBonusModel) {
      setExperienceStage(2, mahoakoFlow ? "CZ / BONUS ROUTE" : "BONUS JUDGE", mahoakoFlow ? "初当りルートジャッジ" : "初当りBONUSジャッジ", "PUSH", mahoakoFlow ? "3種類CZ・4種類BONUSから今回の入口を開きます" : "BONUSの当落を開きます", "judge", data.triggerSuccessChance, mahoakoFlow ? "CZ・BONUS合算契機" : "CZ突破期待度");
      await waitForExperienceAction(mahoakoFlow ? "ルート PUSH" : "BONUS PUSH");
      if (runId !== experienceRunId) return;
      if (!data.triggerSucceeded) {
        setExperienceStage(2, "BONUS JUDGE", "BONUS非当選", "通常へ", "今回の一撃はここで終了", "end", 0, "CZ判定結果");
        setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, "0枚");
        await waitForExperience(720);
        return;
      }
      const bonus = data.entryBonus;
      const isMahoakoCz = mahoakoFlow && bonus.routeType?.includes("cz");
      setExperienceStage(2, isMahoakoCz ? "CHANCE ZONE" : "BONUS", bonus.label, isMahoakoCz ? `${yen.format(bonus.games)}G＋α` : `+${yen.format(bonus.payout)}枚`, isMahoakoCz ? `${bonus.judgeLabel || data.mainLabel}へ進みます` : `${yen.format(bonus.games)}G相当を消化・この出玉を収支へ加算`, "hit", 100, isMahoakoCz ? "CZルート決定" : "初当りBONUS結果");
      setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(bonus.payout)}枚`);
      await waitForExperience(1000);
      if (runId !== experienceRunId) return;
    }
    if (uminchuFlow) {
      setExperienceStage(2, "CHANCE!", "ピュイ♪ BONUS確定", "PUSH", "BIGかREGか、BONUS種別を開きます", "judge", 100, "初当りBONUS");
      await waitForExperience(650);
    }
    if (tentenFlow) {
      const levelComplete = await animateExperienceCounter(10, "G", "LEVEL UP PART", "EPレベルを上げろ", "ヒロイン目・レア役でEPレベルUPを抽選します", data.triggerSuccessChance, "CZ 10GレベルUP", runId);
      if (!levelComplete) return;
      const battleComplete = await animateExperienceCounter(4, "G", "BATTLE PART", "EPISODE BATTLE", "4Gのバトルを消化し、最後のPUSHで決着します", data.triggerSuccessChance, "CZ突破期待度", runId);
      if (!battleComplete) return;
      setExperienceStage(2, "EPISODE JUDGE", "EPISODE BATTLE", "PUSH", "初回BONUSの当落を開きます", "judge", data.triggerSuccessChance, "14G CZ最終結果");
      await waitForExperienceAction("EPISODE BATTLE PUSH", 5000, data.triggerSucceeded ? "gold" : "normal");
      if (runId !== experienceRunId) return;
      setExperienceStage(2, "EPISODE RESULT", data.triggerSucceeded ? "WIN・BONUS確定" : "BATTLE敗北", data.triggerSucceeded ? "転天BONUS" : "通常へ", data.triggerSucceeded ? "約100枚獲得後、王宮舞踏会40Gへ" : "今回の一撃はここで終了", data.triggerSucceeded ? "hit" : "end", data.triggerSucceeded ? 100 : 0, "EPISODE BATTLE結果");
      await waitForExperience(900);
      if (!data.triggerSucceeded) return;
    }
    if (!uminchuFlow && !tentenFlow) {
    const dedicatedEntryFlow = godzillaEva2Flow || mahoakoFlow;
    const entryJudgeLabel = dedicatedEntryFlow && data.entryBonus?.judgeLabel ? data.entryBonus.judgeLabel : `${data.mainLabel}突入ジャッジ`;
    const entryJudgeGames = dedicatedEntryFlow ? Math.max(1, Number(data.entryBonus?.judgeGames) || 3) : 3;
    if (dedicatedEntryFlow) {
      const entryCounterComplete = await animateExperienceCounter(entryJudgeGames, "G", "AT JUDGE", entryJudgeLabel, "成立役でAT当選を抽選し、最後のPUSHで結果を開きます", data.entryChance, `${data.mainLabel}期待度`, runId);
      if (!entryCounterComplete) return;
    } else {
      setExperienceStage(2, "AT JUDGE", entryJudgeLabel, "3", "AT当落を抽選中", "judge", data.entryChance, `${data.mainLabel}突破率`);
      for (const count of [2, 1]) {
        await waitForExperience(250);
        if (runId !== experienceRunId || experienceSkipped) break;
        document.getElementById("machineExperienceValue").textContent = String(count);
      }
      await waitForExperience(300);
      if (runId !== experienceRunId) return;
    }
    setExperienceStage(2, "AT JUDGE", entryJudgeLabel, "PUSH", `${data.mainLabel}の当落を決めます`, "judge", data.entryChance, `${data.mainLabel}突破率`);
    await waitForExperienceAction("PUSH");
    if (runId !== experienceRunId) return;
    setExperienceStage(2, "AT JUDGE", data.entered ? `${data.mainLabel} 突入` : `${data.mainLabel} 非突入`, data.entered ? "突破成功" : "通常へ", data.entered ? "特化ゾーン・上位抽選へ" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, "AT判定結果");
    setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(data.entryBonus?.payout || (data.entered ? 0 : data.payout))}枚`);
    await waitForExperience(720);
    }
    if (data.entered) {
      const sourceEvents = Array.isArray(data.atEvents) && data.atEvents.length
        ? data.atEvents
        : [{ kind: "at-start", label: data.mainLabel, games: data.atGameTimeline?.[0] || 40, award: data.payout, cumulative: data.payout }];
      const rushEvents = sourceEvents.filter(event => event.kind !== "entry-bonus");
      const setPushFlow = Boolean(data.setPushFlow);
      const karakuriJudgeFlow = Boolean(data.karakuriJudgeFlow);
      const battleBonusFlow = Boolean(data.battleBonusFlow);
      const garoBattleFlow = Boolean(data.garoBattleFlow);
      const ragnadorUpperFlow = Boolean(data.ragnadorUpperFlow);
      const seiyaTempleFlow = Boolean(data.seiyaTempleFlow);
      const ggoStFlow = Boolean(data.ggoStFlow);
      const sgRaceFlow = Boolean(data.sgRaceFlow);
      const kabaneriStFlow = Boolean(data.kabaneriStFlow);
      const otomeRushFlow = Boolean(data.otomeRushFlow);
      const cycleFlow = Boolean(data.cycleFlow);
      const upperGameManaged = Boolean(machine.sim.upperGameManaged);
      const normalSetCount = rushEvents.filter(event => event.kind === "rush-set").length;
      const hadUpperChallenge = rushEvents.some(event => event.kind === "upper-challenge");
      let route = [...rushEvents];
      if (!setPushFlow && !karakuriJudgeFlow && !battleBonusFlow && !godzillaEva2Flow && !mahoakoFlow && !uminchuFlow && !tentenFlow && !sgRaceFlow && !kabaneriStFlow && !otomeRushFlow && !cycleFlow && route.length > 10) {
        const visibleEvents = route.slice(0, 7);
        const remainingEvents = route.slice(7);
        const previousTotal = Number(visibleEvents[visibleEvents.length - 1]?.cumulative) || 0;
        const finalTotal = Number(route[route.length - 1]?.cumulative) || data.payout;
        route = [...visibleEvents, { kind: "summary", label: `残り${remainingEvents.length}演出を高速消化`, games: remainingEvents.reduce((sum, event) => sum + (Number(event.games) || 0), 0), award: Math.max(0, finalTotal - previousTotal), cumulative: finalTotal }];
      }
      let consumedGames = Number(data.entryBonus?.games) || 0;
      let runningAddOn = 0;
      let runningAddOnGames = 0;
      const gameAddOnFlow = godzillaEva2Flow || mahoakoFlow || otomeRushFlow || sgRaceFlow || (cycleFlow && rushEvents.some(event => event.kind === "cycle-round" && Number(event.gameAdd) > 0)) || (!karakuriJudgeFlow && !setPushFlow && !battleBonusFlow && !kabaneriStFlow && !cycleFlow && rushEvents.some(event => event.kind === "special" && Number(event.gameAdd) > 0));
      const entryBonusPayout = Number(data.entryBonus?.payout) || 0;
      setSlotAtStatus({ visible: true, remaining: 0, addOn: 0, addOnGames: gameAddOnFlow ? 0 : null, total: entryBonusPayout });
      for (let index = 0; index < route.length; index += 1) {
        if (runId !== experienceRunId || experienceSkipped) break;
        const event = route[index];
        const eventGames = Math.max(1, Number(event.games) || data.atGameTimeline?.[index] || 20);

        if (event.kind === "uminchu-bonus") {
          setExperienceStage(3, event.chain === 1 ? "FIRST BONUS" : `BONUS CHAIN ${event.chain}`, event.source || "フルーツ連", "PUSH", "BIGかREGか、今回の獲得枚数を開きます", "judge", 100, `${event.chain}連目 BONUS告知`);
          await waitForExperienceAction(`${event.chain}連目 BONUS PUSH`, 5000, event.bonusType === "BIG" ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.bonusType === "BIG" ? "BIG BONUS" : "REG BONUS", `${event.label} ${event.chain}連目`, `+${yen.format(event.award)}枚`, event.bonusType === "BIG" ? `平均約202枚・JAC ${event.jacSets}セット${event.stocked ? "・BONUSストック獲得" : ""}` : `平均約53枚・ベルナビ8回${event.stocked ? "・BONUSストック獲得" : ""}`, event.bonusType === "BIG" ? "hit" : "rush", 100, `${event.label}獲得結果`);
          await waitForExperience(1000);
          const bonusComplete = await animateExperienceCounter(eventGames, "G", event.bonusType === "BIG" ? "BIG BONUS" : "REG BONUS", event.bonusType === "BIG" ? "一般中 → JAC × 3" : "ベルナビ8回", "BONUSを最後まで消化します", 100, `${event.label}消化`, runId);
          if (!bonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, total: event.cumulative });
          continue;
        }

        if (event.kind === "uminchu-zone") {
          const zoneComplete = await animateExperienceCounter(eventGames, "G", "32G FRUIT ZONE", `${event.chain}連目 BONUS後`, event.stockUsed ? "BONUSストックの放出ゲームを待ちます" : "フルーツ成立ごとに次回BONUSを抽選します", event.chance, event.stockUsed ? "ストック放出濃厚" : `${event.chance.toFixed(0)}% 代表継続率`, runId);
          if (!zoneComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "32G JUDGE", "BONUS後32G", "PUSH", event.stockUsed ? "ストック放出タイミングを開きます" : "自力BONUS当選または32G終了を開きます", "judge", event.chance, event.stockUsed ? "BONUSストック所持" : "フルーツ連結果");
          await waitForExperienceAction(`${event.chain}連後 32G PUSH`, 5000, event.continued ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.continued ? "BONUS HIT" : "32G END", event.continued ? "ピュイ♪ BONUS確定" : "32G連終了", event.continued ? event.source : "通常へ", event.continued ? `${event.games}Gで告知・次のBONUSへ` : `${event.chain}連で終了・最終結果へ`, event.continued ? "hit" : "end", event.continued ? 100 : 0, "BONUS後32G結果");
          await waitForExperience(event.continued ? 850 : 1050);
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, total: event.cumulative });
          continue;
        }

        if (event.kind === "uminchu-iregui") {
          const ireguiComplete = await animateExperienceCounter(8, "G", "IREGUI", `IREGUI ${event.visit}回目`, "毎ゲームの擬似フルーツからBONUSストックを抽選します", 100, "8Gストックゾーン", runId);
          if (!ireguiComplete) return;
          consumedGames += 8;
          setExperienceStage(3, "IREGUI RESULT", `BONUS ${event.chain}連到達`, "PUSH", "8Gで獲得したBONUSストック数を開きます", "judge", 100, (event.fruits || []).join("・"));
          await waitForExperienceAction(`IREGUI ${event.visit}回目 PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "IREGUI STOCK", "ピュイ♪ ストック獲得", `${event.stocks}個`, `最大8個・ストックを1つずつ32G以内に放出します`, "hyper", 100, `IREGUI ${event.visit}回目結果`);
          await waitForExperience(1300);
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, total: event.cumulative });
          continue;
        }

        if (event.kind === "tenten-first-bonus") {
          setExperienceStage(3, event.upper ? "RINNE TENTEN EPISODE" : "FIRST BONUS", event.label, `+${yen.format(event.award)}枚`, event.upper ? "上位ボーナス高確へ突入します" : "消化後は王宮舞踏会40Gへ進みます", event.upper ? "hyper" : "hit", 100, "初回BONUS獲得結果");
          await waitForExperience(1000);
          const bonusComplete = await animateExperienceCounter(eventGames, "G", event.upper ? "EPISODE BONUS" : "TENTEN BONUS", event.label, "純増約4.5枚/GでBONUSを消化します", 100, "約100枚獲得", runId);
          if (!bonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.upper ? 40 : 40, total: event.cumulative });
          continue;
        }

        if (event.kind === "tenten-high") {
          const highComplete = await animateExperienceCounter(eventGames, "G", event.upper ? "RINNE TENTEN HIGH" : "ROYAL PALACE PARTY", event.label, event.stockUsed ? "BONUSストックを放出します" : event.viaJudge ? "規定G数から革命ジャッジへ" : "7揃い・ヒロイン目からBONUSを抽選します", event.chance, event.upper ? "withデュエット 約1/14.4" : `BONUS確率 約1/${event.rate}`, runId);
          if (!highComplete) return;
          consumedGames += eventGames;
          setSlotAtStatus({ visible: true, remaining: event.remaining, total: event.cumulative });
          setExperienceStage(3, event.upper ? "UPPER BONUS JUDGE" : event.viaJudge ? "革命ジャッジ" : "BONUS JUDGE", event.label, "PUSH", event.continued ? "BONUS当選と種別を開きます" : "高確終了の結果を開きます", "judge", event.chance, event.upper ? "上位BONUS高確" : "王宮舞踏会結果");
          await waitForExperienceAction(event.upper ? "輪廻転天 PUSH" : event.viaJudge ? "革命ジャッジ PUSH" : "王宮BONUS PUSH", 5000, event.upper ? "upper" : event.continued ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.continued ? "BONUS HIT" : "PARTY END", event.continued ? "王宮BONUS確定" : "王宮舞踏会終了", event.continued ? "7揃い" : "残り0G", event.continued ? "次の画面でBONUS種別を表示します" : event.upper ? "上位BONUS高確終了" : "獲得した上位CZ権利を確認します", event.continued ? "hit" : "end", event.continued ? 100 : 0, "BONUS高確結果");
          await waitForExperience(event.continued ? 700 : 1000);
          continue;
        }

        if (event.kind === "tenten-bonus") {
          setExperienceStage(3, event.upper ? "UPPER PALACE BONUS" : "PALACE BONUS", event.label, `+${yen.format(event.award)}枚`, `${event.source}・${event.nextState === "anis" ? "アニス高確15Gへ" : event.nextState === "yuffie" ? "ユフィ高確15Gへ" : event.nextState === "duet" ? "デュエット高確へ" : "残り高確Gへ"}`, event.upper || event.bonusType === "duet" ? "hyper" : "rush", 100, `${event.number}回目 王宮BONUS`);
          await waitForExperience(1000);
          const palaceBonusComplete = await animateExperienceCounter(eventGames, "G", "PALACE BONUS", event.label, "純増約4.5枚/G・高確ゲーム数上乗せも抽選します", 100, `獲得約${event.award}枚`, runId);
          if (!palaceBonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.nextState === "default" ? 0 : event.upper ? 20 : 15, total: event.cumulative });
          continue;
        }

        if (event.kind === "tenten-honki") {
          const honkiComplete = await animateExperienceCounter(5, "G", "HONKI CHALLENGE", event.label, "ヒロイン出現で上乗せし、5Gを再セットします", 100, "BONUS3回目の恩恵", runId);
          if (!honkiComplete) return;
          consumedGames += 5;
          setExperienceStage(3, "GAME ADD ON", event.label, "PUSH", "王宮舞踏会へ加算するゲーム数を開きます", "judge", 100, "5G ST結果");
          await waitForExperienceAction("本気チャレ PUSH", 5000, "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "GAME ADD ON", "ヒロイン共闘", `+${yen.format(event.gameAdd)}G`, `王宮舞踏会 残り${yen.format(event.remaining)}G`, "hit", 100, "本気チャレ結果");
          await waitForExperience(1100);
          continue;
        }

        if (event.kind === "tenten-stock") {
          const stockComplete = await animateExperienceCounter(8, "G", "TENTEN STOCK CHALLENGE", event.label, "小役・ヒロイン目からBONUSストックを抽選します", 100, "8G＋α・平均約2個", runId);
          if (!stockComplete) return;
          consumedGames += 8;
          setExperienceStage(3, "STOCK RESULT", event.label, "PUSH", "獲得したBONUSストック数を開きます", "judge", 100, `転天STOCK ${event.number}回目`);
          await waitForExperienceAction("転天STOCK PUSH", 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "BONUS STOCK", "ストック獲得", `${event.stocks}個`, "白→赤→青→デュエットの順に放出します", "hyper", 100, "転天STOCK結果");
          await waitForExperience(1200);
          continue;
        }

        if (event.kind === "tenten-upper-challenge") {
          const upperComplete = await animateExperienceCounter(10, "G", "RINNE TENTEN CHALLENGE", event.label, "成立役から上位ボーナス高確を抽選します", event.chance, "成功期待度約50%", runId);
          if (!upperComplete) return;
          consumedGames += 10;
          setExperienceStage(3, "UPPER JUDGE", event.label, "PUSH", "輪廻転天の当落を開きます", "judge", event.chance, "10G上位CZ最終結果");
          await waitForExperienceAction("輪廻転天 PUSH", 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "RINNE TENTEN" : "CHALLENGE END", event.success ? "輪廻転天 成功！" : "輪廻転天 失敗", event.success ? "上位突入" : "通常へ", event.success ? "エピソードBONUS後、上位40Gへ" : "最終結果へ進みます", event.success ? "hyper" : "end", event.success ? 100 : 0, "輪廻転天チャレンジ結果");
          await waitForExperience(event.success ? 1300 : 1000);
          continue;
        }

        if (event.kind === "godzilla-at") {
          setExperienceStage(3, "GODZILLA EVA ATTACK", "初期ゲーム数を決定", "PUSH", "登場キャラと初期ゲーム数を開きます", "judge", 100, "2G初期ゲーム数決定ゾーン");
          await waitForExperienceAction("ゴジエヴァアタック PUSH", 5000, "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "GODZILLA EVA ATTACK", event.character || "エヴァンゲリオン", `+${yen.format(eventGames)}G`, "ゴジエヴァRUSHの初期ゲーム数が決定", eventGames >= 100 ? "hyper" : "rush", 100, "初期50〜600G");
          await waitForExperience(eventGames >= 100 ? 1200 : 900);
          const initialComplete = await animateExperienceCounter(eventGames, "G", "GODZILLA EVA RUSH", `${data.mainLabel} 初期ゲーム`, "G侵食役・変異・上乗せルートを抽選します", data.specialChance, "ゲーム数上乗せ抽選", runId);
          if (!initialComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "godzilla-addon") {
          const routeComplete = await animateExperienceCounter(eventGames, "G", event.route === "search" ? "MONSTER SEARCH" : event.route === "impact" ? "IMPACT BATTLE" : event.route === "shock" ? "震撃CHANCE" : "G侵食役・変異", event.label, event.routeDetail || "上乗せ結果を抽選します", event.chance, `${event.label} 成功期待度`, runId);
          if (!routeComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, event.route === "shock" ? "震撃CHANCE" : "ADD ON JUDGE", event.label, "PUSH", event.route === "shock" ? "10倍上乗せの成否を開きます" : "ルート結果と上乗せゲーム数を開きます", "judge", event.chance, `${event.label} 結果`);
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.tenfold ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          if (!event.success) {
            setExperienceStage(3, "JUDGE END", `${event.label} 失敗`, "上乗せなし", `累計 ${yen.format(event.cumulative)}枚・ゴジエヴァRUSHへ戻ります`, "end", 0, `${event.label} 結果`);
            await waitForExperience(900);
            continue;
          }
          runningAddOn += Number(event.award) || 0;
          runningAddOnGames += Number(event.gameAdd) || 0;
          setSlotAtStatus({ visible: true, remaining: event.gameAdd, addOnGames: runningAddOnGames, total: event.cumulative });
          setExperienceStage(3, event.tenfold ? "10× ADD ON" : "GAME ADD ON", event.tenfold ? "ゴジラ咆哮・10倍上乗せ！" : event.label, `+${yen.format(event.gameAdd)}G`, event.tenfold ? `基礎${yen.format(event.baseAdd)}G × 10` : `累計上乗せ +${yen.format(runningAddOnGames)}G`, event.tenfold ? "hyper" : "hit", 100, `${event.label} 結果`);
          await waitForExperience(event.tenfold ? 1400 : 1050);
          const addOnComplete = await animateExperienceCounter(event.gameAdd, "G", "GODZILLA EVA RUSH", `${event.label} 上乗せ消化`, "上乗せゲームを最後まで消化します", 100, "上乗せゲーム消化", runId);
          if (!addOnComplete) return;
          consumedGames += Number(event.gameAdd) || 0;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "godzilla-return") {
          const returnComplete = await animateExperienceCounter(eventGames, "G", "RETURN ZONE", event.label, event.returnToUpper ? "G覚醒RUSHへの復帰を抽選します" : "ゴジエヴァRUSHへの復帰を抽選します", event.chance, `設定1引き戻し目安 約${Math.round(event.chance)}%`, runId);
          if (!returnComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "RETURN JUDGE", event.label, "PUSH", "引き戻しの当落を開きます", "judge", event.chance, "50G引き戻し結果");
          await waitForExperienceAction("引き戻し PUSH", 5000, event.returnToUpper ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          if (event.success) {
            setExperienceStage(3, "RUSH RETURN", event.returnToUpper ? `${data.upperLabel} 復帰` : `${data.mainLabel} 復帰`, `+${yen.format(event.gameAdd)}G`, `引き戻し成功・累計 ${yen.format(event.cumulative)}枚`, event.returnToUpper ? "hyper" : "rush", 100, "引き戻し成功");
            await waitForExperience(950);
            const returnAtComplete = await animateExperienceCounter(event.gameAdd, "G", event.returnToUpper ? "G AWAKENING RUSH" : "GODZILLA EVA RUSH", "引き戻しAT消化中", "復帰ゲーム数を最後まで消化します", 100, "引き戻しAT", runId);
            if (!returnAtComplete) return;
            consumedGames += Number(event.gameAdd) || 0;
          } else {
            setExperienceStage(3, "RUSH END", "引き戻し終了", "通常へ", `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, "end", 0, "50G引き戻し区間終了");
            await waitForExperience(850);
          }
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "mahoako-at") {
          setExperienceStage(3, "AKOGARE ATTACK", "3Gゲーム数決定ゾーン", "PUSH", "初期ゲーム数と特化ゾーンの有無を開きます", "judge", 100, "あこがれATTACK");
          await waitForExperienceAction("あこがれATTACK PUSH", 5000, event.specialLabel ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          const attackTitle = event.specialLabel || "初期ゲーム数決定";
          const attackMessage = event.specialLabel ? `基礎${yen.format(event.baseGames)}G＋${event.specialLabel} 平均${yen.format(event.specialGames)}G` : `${data.mainLabel}の初期ゲーム数が決定`;
          setExperienceStage(3, "AKOGARE ATTACK", attackTitle, `+${yen.format(eventGames)}G`, attackMessage, event.specialLabel ? "hyper" : "rush", 100, "3Gの最終結果");
          await waitForExperience(event.specialLabel ? 1300 : 950);
          const initialComplete = await animateExperienceCounter(eventGames, "G", "MAHOAKO RUSH", `${data.mainLabel} 初期ゲーム`, "BONUS・上乗せ・あこがれATTACKを抽選します", data.specialChance, "AT中イベント抽選", runId);
          if (!initialComplete) return;
          consumedGames += 3 + eventGames;
          runningAddOnGames += Number(event.specialGames) || 0;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "mahoako-addon") {
          const routePhase = event.route === "attack" ? "AKOGARE ATTACK" : event.route === "bonus" ? "BONUS" : event.route === "room" ? "INFINITE AT" : "RARE ROLE";
          const routeComplete = await animateExperienceCounter(eventGames, "G", routePhase, event.label, event.detail, 100, `${event.label} 発生`, runId);
          if (!routeComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, routePhase, event.label, "PUSH", event.route === "bonus" ? "BONUS獲得枚数を開きます" : event.route === "attack" ? "3種類の特化ゾーンから結果を開きます" : "ゲーム数上乗せを開きます", "judge", 100, `${event.label} 結果`);
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.route === "room" || event.specialLabel === "マジアベーゼ無双" ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          if (event.route === "bonus") {
            setExperienceStage(3, "BONUS RESULT", event.label, `+${yen.format(event.bonusAward)}枚`, `累計 ${yen.format(event.cumulative)}枚・ATへ戻ります`, "hit", 100, "BONUS獲得結果");
            await waitForExperience(1000);
          } else {
            runningAddOnGames += Number(event.gameAdd) || 0;
            setExperienceStage(3, event.route === "room" ? "INFINITE AT" : "GAME ADD ON", event.specialLabel || event.label, `+${yen.format(event.gameAdd)}G`, event.route === "room" ? "BAR揃いから無限ATへ突入" : `累計上乗せ +${yen.format(runningAddOnGames)}G`, event.route === "room" || event.specialLabel ? "hyper" : "hit", 100, `${event.label} 結果`);
            await waitForExperience(event.route === "room" || event.specialLabel ? 1250 : 950);
            const addOnComplete = await animateExperienceCounter(event.gameAdd, "G", event.route === "room" ? "MAGIA BAISER ROOM" : "MAHOAKO RUSH", `${event.specialLabel || event.label} 消化`, "残りゲーム数を最後まで消化します", 100, "上乗せゲーム消化", runId);
            if (!addOnComplete) return;
            consumedGames += Number(event.gameAdd) || 0;
          }
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "mahoako-upper") {
          setExperienceStage(3, "SUPER AKOGARE ATTACK", `上位AT ${event.set}回目`, "PUSH", "赤背景キャラを含む初期ゲーム数を開きます", "judge", 100, "上位あこがれATTACK");
          await waitForExperienceAction(`上位あこがれATTACK ${event.set} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "SUPER AKOGARE VERSION", data.upperLabel, `+${yen.format(eventGames)}G`, `純増約${Number(machine.sim.upperPureIncrease).toFixed(1)}枚/G・累計 ${yen.format(event.cumulative)}枚`, "hyper", 100, "上位AT初期ゲーム数");
          await waitForExperience(1250);
          const upperComplete = await animateExperienceCounter(eventGames, "G", "SUPER AKOGARE VERSION", `${data.upperLabel} 消化中`, "上位ゲーム数を最後まで消化します", 100, "上位ATゲーム数", runId);
          if (!upperComplete) return;
          consumedGames += 3 + eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "mahoako-return") {
          const vsComplete = await animateExperienceCounter(5, "G", "UPPER RETURN", "VSロードエノルメ", "上位AT再突入をかけたバトルを進めます", 35, "第1引き戻し区間", runId);
          if (!vsComplete) return;
          consumedGames += 5;
          setExperienceStage(3, "VS LORD ENORME", "VSロードエノルメ", "PUSH", "勝利なら上位ATへ即復帰します", "judge", 35, "上位AT復帰ジャッジ");
          await waitForExperienceAction("VSロードエノルメ PUSH", 5000, "upper");
          if (runId !== experienceRunId) return;
          if (event.vsSuccess) {
            setExperienceStage(3, "UPPER RETURN", "ロードエノルメ撃破", "上位AT復帰", "次の超あこがれVer.へ進みます", "hyper", 100, "引き戻し成功");
            await waitForExperience(1000);
          } else {
            setExperienceStage(3, "RETURN ZONE", "VSロードエノルメ敗北", "あの星を堕とせ", "10Gの最終引き戻し区間へ", "end", 0, "第2引き戻し区間へ");
            await waitForExperience(850);
            const starComplete = await animateExperienceCounter(Math.max(1, eventGames - 5), "G", "RETURN ZONE", "あの星を堕とせ", "全役で上位AT引き戻しを抽選します", 38, "合算引き戻し60%超", runId);
            if (!starComplete) return;
            consumedGames += Math.max(1, eventGames - 5);
            setExperienceStage(3, "FINAL RETURN", "あの星を堕とせ", "PUSH", "最後の引き戻し結果を開きます", "judge", 38, "上位AT復帰最終判定");
            await waitForExperienceAction("あの星を堕とせ PUSH", 5000, "upper");
            if (runId !== experienceRunId) return;
            setExperienceStage(3, event.starSuccess ? "UPPER RETURN" : "RUSH END", event.starSuccess ? "引き戻し成功" : "引き戻し終了", event.starSuccess ? "上位AT復帰" : "通常へ", event.starSuccess ? "次の超あこがれVer.へ進みます" : "最終結果へ進みます", event.starSuccess ? "hyper" : "end", event.starSuccess ? 100 : 0, "2段階引き戻し結果");
            await waitForExperience(1000);
          }
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "cycle-round") {
          const cycleRoundTitle = event.roundTitle || `${event.label} ${event.round}回目`;
          const cycleRoundDetail = event.roundDetail || "残りゲーム数を消化し、最後のPUSHで継続と報酬を開きます";
          const counterComplete = await animateExperienceCounter(eventGames, "G", event.phase || "AT LOOP", cycleRoundTitle, cycleRoundDetail, event.continueChance, `${cycleRoundTitle} 継続目安`, runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          setExperienceStage(3, event.phase || "AT LOOP", cycleRoundTitle, "PUSH", event.roundDetail || "継続結果と今回の報酬を開きます", "judge", event.continueChance, `継続期待度 約${Math.round(event.continueChance)}%`);
          await waitForExperienceAction(`${cycleRoundTitle} PUSH`, 5000, event.round >= 3 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          const cycleGameAdd = Math.max(0, Number(event.gameAdd) || 0);
          const cycleBonusGames = Math.max(0, Number(event.bonusGames) || 0);
          if (cycleGameAdd) runningAddOnGames += cycleGameAdd;
          if (event.rewardKind === "coins") runningAddOn += Number(event.award) || 0;
          setSlotAtStatus({ visible: true, remaining: cycleGameAdd || cycleBonusGames, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          const cycleAdvanced = event.continued || event.completed;
          setExperienceStage(3, cycleAdvanced ? "LOOP CONTINUE" : "LOOP END", event.rewardLabel, cycleGameAdd ? `+${yen.format(cycleGameAdd)}G` : `+${yen.format(event.award)}枚`, event.completed ? `累計 ${yen.format(event.cumulative)}枚・全ラウンド突破` : event.continued ? `累計 ${yen.format(event.cumulative)}枚・次の${event.label}へ` : `累計 ${yen.format(event.cumulative)}枚・${event.endLabel}`, cycleAdvanced ? "rush" : "end", cycleAdvanced ? 100 : 0, `${cycleRoundTitle} 結果`);
          await waitForExperience(cycleAdvanced ? 950 : 1100);
          const failureGames = Math.max(0, Number(event.failureGames) || 0);
          if (!cycleAdvanced && failureGames) {
            const failureLabel = event.failureLabel || "引き戻しZONE";
            const failureComplete = await animateExperienceCounter(failureGames, "G", failureLabel, `${failureLabel} 消化中`, "敗北した対戦相手からの再開を目指します", 100, `${failureGames}G引き戻し区間`, runId);
            if (!failureComplete) return;
            consumedGames += failureGames;
            setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          }
          if (cycleGameAdd || cycleBonusGames) {
            const extraGames = cycleGameAdd || cycleBonusGames;
            const extraLabel = cycleGameAdd ? `${event.rewardLabel} 上乗せ消化` : `${event.rewardLabel} 消化`;
            const extraComplete = await animateExperienceCounter(extraGames, "G", cycleGameAdd ? "ADD ON" : "BONUS", extraLabel, "残りゲーム数が減っていきます", 100, cycleGameAdd ? "上乗せゲーム" : "ボーナスゲーム", runId);
            if (!extraComplete) return;
            consumedGames += extraGames;
            setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
            setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          }
          continue;
        }

        if (event.kind === "kabaneri-st") {
          const upperMode = event.upperMode || "";
          const phase = upperMode ? upperMode.toUpperCase() : "KABANERI ST";
          const counterComplete = await animateExperienceCounter(eventGames, "G", phase, `${event.label} ${event.set}区間目`, "ST残りゲームを進め、最後のPUSHで結果を開きます", event.continueChance, `${event.label} ボーナス期待度`, runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, phase, `${event.label} ${event.set}区間目`, "PUSH", event.continued ? "当選ボーナスと獲得枚数を開きます" : "ボーナス当選・ST終了を判定します", "judge", event.continueChance, `継続期待度 約${Math.round(event.continueChance)}%`);
          await waitForExperienceAction(`${event.label} ${event.set} PUSH`, 5000, upperMode ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          setExperienceStage(3, event.continued ? "BONUS HIT" : "ST END", event.continued ? event.bonusLabel : `${event.label} 終了`, event.continued ? `+${yen.format(event.award)}枚` : upperMode && event.award ? `駆け抜け +${yen.format(event.award)}枚` : "駆け抜け", event.continued ? "STゲーム数を再セットします" : "最終結果へ進みます", event.continued ? (upperMode ? "hyper" : "rush") : "end", event.continued ? 100 : 0, `${event.label} ${event.set}区間目 結果`);
          await waitForExperience(event.continued ? 950 : 1100);
          continue;
        }

        if (event.kind === "kabaneri-upper-challenge") {
          const upperJudgeLabel = event.label || data.upperChallenge || "上位STジャッジ";
          const counterComplete = await animateExperienceCounter(eventGames, "G", upperJudgeLabel, "上位STへの分岐を進行中", "最後のPUSHで移行先の上位STを開きます", 100, "上位ST到達", runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, upperJudgeLabel, "上位STジャッジ", "PUSH", "移行するSTを開きます", "judge", data.upperContinueChance, "上位ST継続期待度");
          await waitForExperienceAction(`${upperJudgeLabel} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "UPPER ST", `${event.mode} 突入！`, `約${Math.round(data.upperContinueChance)}% LOOP`, "上位STを開始します", "hyper", data.upperContinueChance, `${event.mode}開始`);
          await waitForExperience(1150);
          continue;
        }

        if (event.kind === "otome-base") {
          const counterComplete = await animateExperienceCounter(eventGames, "G", event.label, `${event.label} 初期ゲーム`, "レア役上乗せ・ボーナスを抽選します", data.specialChance, "上乗せ契機", runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          setExperienceStage(3, "AT MODE", event.label, `${yen.format(eventGames)}G / +${yen.format(event.award)}枚`, "初期ゲーム消化・上乗せ抽選へ", "rush", 100, `${event.label}開始`);
          await waitForExperience(800);
          continue;
        }

        if (event.kind === "otome-addon" || event.kind === "otome-bonus" || event.kind === "otome-special") {
          const isSpecial = event.kind === "otome-special";
          const isBonus = event.kind === "otome-bonus";
          setExperienceStage(3, "CHANCE", "抽選結果", "PUSH", "上乗せかボーナスか、PUSHで結果を開きます", "judge", isSpecial || isBonus ? 100 : data.otomeAddOnChance, "抽選結果はPUSH後に発表");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, isSpecial ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          if (isBonus) {
            setExperienceStage(3, "BONUS HIT", event.label, `${yen.format(event.gameAdd)}G`, "ボーナス消化を開始します", "hit", 100, "ボーナス当選");
            await waitForExperience(850);
            const bonusCounterComplete = await animateExperienceCounter(event.gameAdd, "G", "BONUS COUNT", `${event.label} 消化中`, "残りゲーム数が減っていきます", 100, "ボーナス消化", runId);
            if (!bonusCounterComplete) return;
            consumedGames += Number(event.gameAdd) || 0;
            setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
            setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
            setExperienceStage(3, "BONUS RESULT", event.label, `+${yen.format(event.award)}枚`, `ボーナス終了・累計 ${yen.format(event.cumulative)}枚`, "hit", 100, `${event.label} 結果`);
            await waitForExperience(1050);
          } else {
            runningAddOn += Number(event.award) || 0;
            runningAddOnGames += Number(event.gameAdd) || 0;
            setSlotAtStatus({ visible: true, remaining: event.gameAdd, addOnGames: runningAddOnGames, total: event.cumulative });
            setExperienceStage(3, isSpecial ? "SPECIAL ADD ON" : "GAME ADD ON", event.label, `+${yen.format(event.gameAdd)}G`, `累計上乗せ +${yen.format(runningAddOnGames)}G`, isSpecial ? "hyper" : "hit", 100, `${event.label} 結果`);
            await waitForExperience(isSpecial ? 1400 : 1050);
            const addOnCounterComplete = await animateExperienceCounter(event.gameAdd, "G", "AT COUNT", `${event.label} 消化中`, "上乗せゲームを消化します", 100, "上乗せゲーム消化", runId);
            if (!addOnCounterComplete) return;
            consumedGames += Number(event.gameAdd) || 0;
            setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
            setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          }
          continue;
        }

        if (event.kind === "otome-upper") {
          setExperienceStage(3, "UPPER CHALLENGE", data.upperChallenge, "PUSH", `${data.upperLabel}への昇格を開きます`, "judge", 100, "上位AT当選");
          await waitForExperienceAction(`${data.upperChallenge} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          const counterComplete = await animateExperienceCounter(eventGames, "G", event.label, `${event.label} 初期ゲーム`, "上位ATを消化します", 100, `${event.label}開始`, runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          setExperienceStage(3, "UPPER AT", `${event.label} 突入`, `${yen.format(eventGames)}G / +${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚`, "hyper", 100, event.label);
          await waitForExperience(1100);
          continue;
        }

        if (event.kind === "otome-battle") {
          const counterComplete = await animateExperienceCounter(eventGames, "G", event.label, "AT終了後の5Gバトル", "最後のPUSHで引き戻しを判定します", event.chance, "初戦突破期待度", runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "LAST BATTLE", `${event.label} 最終決戦`, "PUSH", "勝利なら30G以上を上乗せしてAT復帰", "judge", event.chance, `設定${data.setting} 突破目安 ${Math.round(event.chance)}%`);
          await waitForExperienceAction(`${event.label} PUSH`, 5000, "gold");
          if (runId !== experienceRunId) return;
          if (event.success) {
            runningAddOn += Number(event.award) || 0;
            runningAddOnGames += Number(event.gameAdd) || 0;
          }
          setSlotAtStatus({ visible: true, remaining: event.success ? event.gameAdd : 0, addOnGames: runningAddOnGames, total: event.cumulative });
          setExperienceStage(3, "LAST BATTLE", event.success ? "勝利！" : "敗北", event.success ? `+${yen.format(event.gameAdd)}G` : "AT終了", event.success ? `${data.mainLabel}へ復帰` : "最終結果へ進みます", event.success ? "rush" : "end", event.success ? 100 : 0, `${event.label}結果`);
          await waitForExperience(event.success ? 1100 : 950);
          if (event.success) {
            const returnCounterComplete = await animateExperienceCounter(event.gameAdd, "G", "AT COUNT", `${data.mainLabel} 復帰`, "上乗せゲームを消化します", 100, "復帰ゲーム消化", runId);
            if (!returnCounterComplete) return;
            consumedGames += Number(event.gameAdd) || 0;
          }
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          continue;
        }

        if (event.kind === "rush-set") {
          const firstSet = Number(event.set) === 1;
          const setChance = firstSet ? 100 : data.mainSetContinueChance;
          setExperienceStage(3, "REVOLUTION SET", `${event.label} SET ${event.set}`, "PUSH", firstSet ? "開始セットのゲーム数を決定します" : "継続判定とゲーム数振り分けを開きます", "judge", setChance, firstSet ? "革命RUSH開始" : `セット継続率 ${Math.round(data.mainSetContinueChance)}%`);
          await waitForExperienceAction(`SET ${event.set} PUSH`, 4500, firstSet ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          if (eventGames >= 100) {
            const bonusComplete = await animateValvrave100GameBonus({ set: event.set }, runId);
            if (!bonusComplete) return;
          } else {
            setExperienceStage(3, "SET RESULT", firstSet ? "革命RUSH START" : "継続成功！", `${yen.format(eventGames)}G`, `ゲーム数振り分けは ${yen.format(eventGames)}G`, "rush", 100, `SET ${event.set} 振り分け結果`);
            await waitForExperience(850);
          }
          const setCounterComplete = await animateExperienceCounter(eventGames, "G", "REVOLUTION RUSH", `${event.label} SET ${event.set}消化中`, `${yen.format(eventGames)}Gを消化します`, data.mainSetContinueChance, `${event.label}継続目安`, runId);
          if (!setCounterComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          setExperienceStage(3, "REVOLUTION RUSH", `${event.label} SET ${event.set}`, `${yen.format(eventGames)}G / +${yen.format(event.award)}枚`, `セット終了・累計 ${yen.format(event.cumulative)}枚`, "rush", data.mainSetContinueChance, `SET ${event.set} / ${event.setCount}`);
          await waitForExperience(780);
          continue;
        }

        if (event.kind === "karakuri-judge") {
          setExperienceStage(3, "激情ジャッジ", `${event.attempt}回目の当落`, "PUSH", "成功なら100・200・300枚を上乗せ", "judge", data.specialChance, "激情ジャッジ成功期待度 約50%");
          await waitForExperienceAction(`激情ジャッジ ${event.attempt}回目 PUSH`, 4500, event.successCount >= 3 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          consumedGames += eventGames;
          if (event.success) runningAddOn += Number(event.award) || 0;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          const milestone = event.successCount === 4
            ? "4回目成功・運命連鎖へ"
            : event.successCount === 3
              ? "3回成功・運命の一劇の権利獲得"
              : event.success
                ? `成功 ${event.successCount}回目`
                : `成功回数 ${event.successCount}回`;
          setExperienceStage(3, "激情ジャッジ", event.success ? "成功！" : "失敗", event.success ? `+${yen.format(event.award)}枚` : "ATへ戻る", milestone, event.success ? (event.successCount >= 3 ? "hyper" : "hit") : "end", event.success ? 100 : 0, `激情ジャッジ ${event.attempt}回目`);
          await waitForExperience(event.successCount >= 3 ? 1150 : 850);
          continue;
        }

        if (event.kind === "karakuri-upper-challenge") {
          const isChain = event.route === "chain";
          const counterComplete = await animateExperienceCounter(eventGames, "G", isChain ? "運命連鎖" : "運命の一劇", isChain ? "10G＋αの上位AT抽選" : "AT終了後の上位AT抽選", "最後のPUSHで当落を開きます", event.chance, `${event.label} 成功期待度`, runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, isChain ? "運命連鎖" : "運命の一劇", `${data.upperLabel} 突入ジャッジ`, "PUSH", `${event.label}の成功・失敗を決めます`, "judge", event.chance, `${event.label} 約${Math.round(event.chance)}%`);
          await waitForExperienceAction(`${event.label} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, isChain ? "運命連鎖" : "運命の一劇", event.success ? "突破成功！" : "失敗", event.success ? "上位ATへ" : "通常AT終了", event.success ? "極限無双を経由して超からくりサーカスへ" : "最終結果へ進みます", event.success ? "hyper" : "end", event.success ? 100 : 0, `${event.label} 判定結果`);
          await waitForExperience(950);
          if (event.success) {
            setExperienceStage(3, "極限無双", "最上位上乗せ特化ゾーン", "平均 +850枚", `${data.upperLabel}の初期枚数を上乗せ`, "hyper", 100, "極限無双");
            await waitForExperience(1100);
          }
          continue;
        }

        if (event.kind === "hokuto-set") {
          const smallPartGames = Math.max(1, eventGames - 8);
          const counterComplete = await animateExperienceCounter(smallPartGames, "G", "BATTLE BONUS", `BB ${event.set}連目・小役パート`, "30G＋α消化後にラオウとのバトルへ", event.continueChance, `継続率モード ${Math.round(event.continueChance)}%`, runId);
          if (!counterComplete) return;
          consumedGames += smallPartGames;
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          setExperienceStage(3, "BATTLE PART", `BB ${event.set}連目 継続バトル`, "PUSH", "8Gの攻防結果を開きます", "judge", event.continueChance, `継続率モード ${Math.round(event.continueChance)}%`);
          await waitForExperienceAction(`BB ${event.set} BATTLE PUSH`, 5000, event.continueChance >= 84 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          consumedGames += 8;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "BATTLE RESULT", event.continued ? "ケンシロウ立つ！" : "ラオウに敗北", event.continued ? "継続" : `${event.set}連で終了`, event.continued ? "次の小役パートへ" : "バトルボーナス終了", event.continued ? "rush" : "end", event.continued ? 100 : 0, `BB ${event.set}連目 結果`);
          await waitForExperience(event.continued ? 850 : 1000);
          continue;
        }

        if (event.kind === "monkey-set") {
          const lapGames = Math.max(1, eventGames - 9);
          const counterComplete = await animateExperienceCounter(lapGames, "G", "SG RUSH", `${event.set}セット目・周回パート`, `${event.scenario} / SGバトルまで進行`, event.continueChance, `シナリオ継続期待度 ${Math.round(event.continueChance)}%`, runId);
          if (!counterComplete) return;
          consumedGames += lapGames;
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          setExperienceStage(3, "SG BATTLE", `${event.set}セット目 継続レース`, "PUSH", event.set === 8 ? "グランドスラム達成を確定します" : "9Gのレース結果を開きます", "judge", event.continueChance, `${event.scenario}`);
          await waitForExperienceAction(`SG ${event.set} RACE PUSH`, 5000, event.set === 8 ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          consumedGames += 9;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          const grandSlam = Number(event.set) === 8;
          setExperienceStage(3, grandSlam ? "GRAND SLAM" : "SG BATTLE RESULT", grandSlam ? "グランドスラム達成！" : event.continued ? "SG RUSH 継続" : "レース敗退", grandSlam ? "8 SET" : event.continued ? "継続" : `${event.set}セット`, grandSlam ? "青島VS波多野へ" : event.continued ? "次セットへ進みます" : "SG RUSH終了", grandSlam ? "hyper" : event.continued ? "rush" : "end", grandSlam || event.continued ? 100 : 0, `SG RUSH ${event.set}セット目`);
          await waitForExperience(grandSlam ? 1200 : 850);
          continue;
        }

        if (event.kind === "monkey-upper-challenge") {
          setExperienceStage(3, "AOSHIMA VS HATANO", event.label, "PUSH", "青島勝利で上位ATへ", "judge", event.chance, `勝利期待度 約${Math.round(event.chance)}%`);
          await waitForExperienceAction("青島VS波多野 PUSH", 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "RACE RESULT", event.success ? "青島 勝利！" : "波多野 勝利", event.success ? `${data.upperLabel} 突入` : "SG RUSH終了", event.success ? "上位ATの継続レースへ" : "最終結果へ進みます", event.success ? "hyper" : "end", event.success ? 100 : 0, "青島VS波多野 判定結果");
          await waitForExperience(event.success ? 1100 : 900);
          continue;
        }

        if (event.kind === "upper-challenge" && event.valvraveThirdChallenge) {
          setExperienceStage(3, "ハラキリチャレンジ", "3回目の継続ジャッジ", "PUSH", `成功なら4セット目から${data.upperLabel}`, "judge", event.chance, `継続率 ${Math.round(event.chance)}%`);
          await waitForExperienceAction("3回目 ハラキリPUSH", 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "ハラキリチャレンジ", event.success ? "3回成功！" : "継続失敗", event.success ? `${data.upperLabel} 突入` : `${data.mainLabel} 終了`, event.success ? `4セット目から${data.upperLabel}へ` : "最終結果へ進みます", event.success ? "hyper" : "end", event.success ? 100 : 0, "ハラキリチャレンジ3回目");
          await waitForExperience(event.success ? 1100 : 800);
          continue;
        }

        if (event.kind === "upper-challenge") {
          const challengePhase = seiyaTempleFlow ? "SAGA BATTLE" : ggoStFlow ? "SJ2 BOSS BATTLE" : godzillaEva2Flow ? "決戦カイザーギドラ" : mahoakoFlow ? "VS LORD ENORME" : "AT COUNT";
          const challengeTitle = seiyaTempleFlow ? "最終決戦・サガとの4Gバトル" : ggoStFlow ? "vs KKHC・5Gボスバトル" : godzillaEva2Flow ? "4G・上位AT決戦" : mahoakoFlow ? event.label : `${data.mainLabel}消化中`;
          const challengeDetail = seiyaTempleFlow ? "小役成立なら勝利。最後のPUSHで千日戦争への当落を開きます" : ggoStFlow ? "バレットライン対応役で勝利濃厚。PUSHで上位STへの当落を開きます" : godzillaEva2Flow ? "成立役で勝利を書き換え、最後のPUSHでG覚醒RUSHへの当落を開きます" : mahoakoFlow ? "成立役で上位ATを抽選し、最後のPUSHで当落を開きます" : `${data.upperChallenge}の当落まで数字が進みます`;
          const challengeChance = seiyaTempleFlow || ggoStFlow || godzillaEva2Flow || mahoakoFlow ? (Number(event.chance) || data.upperSuccessChance) : data.upperRouteChance;
          const challengeRateLabel = seiyaTempleFlow ? "SAGA BATTLE 成功期待度" : ggoStFlow ? "ボスバトル代表成功率" : godzillaEva2Flow ? "突破期待度 約66%" : mahoakoFlow ? "上位AT代表成功率" : "上位ルート期待度";
          const counterComplete = await animateExperienceCounter(eventGames, "G", challengePhase, challengeTitle, challengeDetail, challengeChance, challengeRateLabel, runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          setExperienceStage(3, "UPPER JUDGE", `${data.upperLabel} 突入ジャッジ`, "PUSH", `${mahoakoFlow ? event.label : data.upperChallenge}の当落を開きます`, "judge", mahoakoFlow ? challengeChance : data.upperSuccessChance, `${data.upperLabel}突破率`);
          await waitForExperienceAction("上位PUSH");
          if (runId !== experienceRunId) return;
          const upperSucceeded = mahoakoFlow ? Boolean(event.success) : data.upper;
          setExperienceStage(3, "UPPER JUDGE", upperSucceeded ? `${data.upperLabel} 突入` : `${event.label || data.upperChallenge} 失敗`, upperSucceeded ? "突破成功" : machine.sim.upperFailureLabel ? `${machine.sim.upperFailureLabel} 確定` : "通常AT終了", upperSucceeded ? "上位ATへ進みます" : machine.sim.upperFailureLabel ? (machine.sim.upperFailureMessage || `失敗でも${machine.sim.upperFailureLabel}へ進みます`) : "最終結果へ進みます", upperSucceeded ? "hyper" : machine.sim.upperFailureLabel ? "rush" : "end", upperSucceeded || machine.sim.upperFailureLabel ? 100 : 0, "上位AT判定結果");
          await waitForExperience(820);
          if (upperSucceeded) {
            const upperPhase = setPushFlow ? "SUPER REVOLUTION RUSH" : battleBonusFlow ? "無想転生バトル" : garoBattleFlow ? "究極魔戒RUSH" : ragnadorUpperFlow ? "真ラグナドールRUSH" : seiyaTempleFlow ? "千日戦争" : ggoStFlow ? "イカれたレン" : godzillaEva2Flow ? "G覚醒RUSH" : mahoakoFlow ? "SUPER AKOGARE VERSION" : sgRaceFlow ? "青島SG" : "UPPER AT";
            const upperMessage = setPushFlow ? "赤・金モードでセット継続抽選へ" : battleBonusFlow ? "継続率約94%のバトルへ" : garoBattleFlow ? "金色バトル勝利から陰我消滅ノ刻の報酬へ" : ragnadorUpperFlow ? "スペシャルエピソードを経由して純増約4.5枚/Gの上位ATへ" : seiyaTempleFlow ? "30G＋4/5Gバトル・継続期待度約88%の上位ATへ" : ggoStFlow ? "8G・継続率約85%のボーナス超高確率STへ" : godzillaEva2Flow ? "G覚醒アタックで100G以上を決定し、純増約5.2枚/Gの上位ATへ" : mahoakoFlow ? "3Gの上位あこがれATTACKで初期Gを決め、純増約5.0枚/Gへ" : sgRaceFlow ? "上位SGの継続レースへ" : upperGameManaged ? `純増約${Number(machine.sim.upperPureIncrease).toFixed(1)}枚/Gのゲーム数管理型ATへ` : "上位ATの継続抽選へ進みます";
            const upperIntroValue = upperGameManaged ? (machine.sim.upperGameRange || "100〜300G") : `${Math.round(data.upperContinueChance)}% LOOP`;
            setExperienceStage(3, upperPhase, `${data.upperLabel} 突入！`, upperIntroValue, upperMessage, "hyper", upperGameManaged ? 100 : data.upperContinueChance, `${data.upperLabel}開始`);
            await waitForExperience(1100);
          }
          continue;
        }

        if (event.kind === "summary") {
          consumedGames = Number(data.atGamesTotal) || consumedGames + eventGames;
          runningAddOn = Number(data.addOnTotal) || runningAddOn;
          runningAddOnGames = Number(data.addOnGamesTotal) || runningAddOnGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          setExperienceStage(3, "HIGH SPEED AT", event.label, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚まで一気に表示`, data.upper ? "hyper" : "rush", 100, "高速消化結果");
          await waitForExperience(900);
          continue;
        }

        if (setPushFlow && event.kind === "upper") {
          const displaySet = Number(event.displaySet) || Number(event.set);
          setExperienceStage(3, "SUPER REVOLUTION SET", `${data.upperLabel} SET ${displaySet}`, "PUSH", displaySet === 4 ? "4セット目・上位開始ゲーム数を開きます" : "上位継続とゲーム数振り分けを開きます", "judge", data.upperContinueChance, `${data.upperLabel} ${Math.round(data.upperContinueChance)}% LOOP`);
          await waitForExperienceAction(`超革命 SET ${displaySet} PUSH`, 4500, "upper");
          if (runId !== experienceRunId) return;
          if (eventGames >= 100) {
            const bonusComplete = await animateValvrave100GameBonus({ upper: true, set: displaySet }, runId);
            if (!bonusComplete) return;
          } else {
            setExperienceStage(3, "SUPER REVOLUTION RESULT", displaySet === 4 ? "超革命RUSH START" : "上位継続成功！", `${yen.format(eventGames)}G`, `ゲーム数振り分けは ${yen.format(eventGames)}G`, "hyper", 100, `超革命 SET ${displaySet} 振り分け結果`);
            await waitForExperience(950);
          }
        }
        if ((battleBonusFlow || sgRaceFlow) && event.kind === "upper") {
          const upperSetLabel = battleBonusFlow ? `${data.upperLabel} ${event.set}連目` : `${data.upperLabel} SET ${event.set}`;
          setExperienceStage(3, battleBonusFlow ? "無想転生バトル" : "青島SG", upperSetLabel, "PUSH", battleBonusFlow ? "継続率約94%のバトル結果を開きます" : "上位SGの継続レースを開きます", "judge", data.upperContinueChance, `${Math.round(data.upperContinueChance)}% LOOP`);
          await waitForExperienceAction(`${upperSetLabel} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
        }
        if (garoBattleFlow && event.kind === "upper") {
          const garoSetLabel = `${data.upperLabel} ${event.set}戦目`;
          setExperienceStage(3, "金色バトル", garoSetLabel, "PUSH", "ホラーとのバトル結果と獲得パネルを開きます", "judge", data.upperContinueChance, `継続期待度 約${Math.round(data.upperContinueChance)}%`);
          await waitForExperienceAction(`${garoSetLabel} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "陰我消滅ノ刻", event.rewardLabel || "獲得パネル決定", `+${yen.format(event.award)}枚`, "決定した報酬を消化します", "hyper", 100, `${event.rewardLabel || "パネル報酬"} 結果`);
          await waitForExperience(950);
        }
        if (ragnadorUpperFlow && event.kind === "upper") {
          const isHeaven = String(event.rewardLabel || "").includes("天界");
          setExperienceStage(3, "SPECIAL EPISODE", event.rewardLabel || "スペシャルエピソード", isHeaven ? "白7・天界" : "黒BAR・冥界", isHeaven ? "10連ガチャ券を獲得し、期待約2700枚の上位ATへ" : "ガチャ券を獲得し、期待約1500枚の上位ATへ", "hyper", 100, `${isHeaven ? "天界" : "冥界"}ルート`);
          await waitForExperience(1100);
        }
        if (godzillaEva2Flow && event.kind === "upper") {
          const upperSetLabel = `${data.upperLabel} ${event.set}区間目`;
          setExperienceStage(3, "G AWAKENING ATTACK", event.set === 1 ? "G覚醒アタック" : "決戦勝利報酬", "PUSH", "100G以上の上位ATゲーム数を開きます", "judge", 100, "上位初期100G以上");
          await waitForExperienceAction(`${upperSetLabel} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "G AWAKENING ATTACK", event.rewardLabel || "G覚醒アタック", `+${yen.format(eventGames)}G`, "G覚醒RUSHを開始します", "hyper", 100, "100〜300G代表振り分け");
          await waitForExperience(1100);
          const upperComplete = await animateExperienceCounter(eventGames, "G", "G AWAKENING RUSH", `${upperSetLabel} 消化中`, "上乗せ性能が強化された上位ATを消化します", 100, "純増約5.2枚/G", runId);
          if (!upperComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          const battleGames = Math.max(1, Number(machine.sim.upperChallengeGames) || 4);
          const battleComplete = await animateExperienceCounter(battleGames, "G", "決戦カイザーギドラ", `${upperSetLabel}終了・4G決戦`, "成立役で勝利を書き換え、最後のPUSHで継続を開きます", data.upperContinueChance, "突破期待度 約66%", runId);
          if (!battleComplete) return;
          consumedGames += battleGames;
          setExperienceStage(3, "FINAL BATTLE", "決戦カイザーギドラ", "PUSH", event.continued ? "勝利して次のG覚醒RUSHへ" : "勝利・敗北を開きます", "judge", data.upperContinueChance, "突破期待度 約66%");
          await waitForExperienceAction(`${upperSetLabel} 決戦PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.continued ? "BATTLE WIN" : "BATTLE LOSE", event.continued ? "カイザーギドラ撃破！" : "決戦敗北", event.continued ? "G覚醒RUSH継続" : "50G引き戻しへ", event.continued ? `累計 ${yen.format(event.cumulative)}枚・次のG覚醒アタックへ` : `累計 ${yen.format(event.cumulative)}枚`, event.continued ? "hyper" : "end", event.continued ? 100 : 0, "決戦カイザーギドラ結果");
          await waitForExperience(event.continued ? 1000 : 850);
          continue;
        }
        if (ggoStFlow && event.kind === "upper") {
          const ggoSetLabel = `${data.upperLabel} ${event.set}回目`;
          const stComplete = await animateExperienceCounter(eventGames, "G", "イカれたレン", `${ggoSetLabel}・8G ST`, "成立役でボーナスを抽選し、最後のPUSHで結果を開きます", data.upperContinueChance, `継続率 約${Math.round(data.upperContinueChance)}%`, runId);
          if (!stComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "CLIMAX BATTLE", ggoSetLabel, "PUSH", "バトル結果とガンゲイルストームの獲得枚数を開きます", "judge", data.upperContinueChance, `イカれたレン 約${Math.round(data.upperContinueChance)}% LOOP`);
          await waitForExperienceAction(`${ggoSetLabel} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "GUN GALE STORM", event.rewardLabel || "ガンゲイルストーム", `+${yen.format(event.award)}枚`, "決定した枚数でガンゲイルBONUSを開始します", "hyper", 100, "赤7揃いで枚数決定");
          await waitForExperience(950);
          const ggoBonusGames = Math.max(1, Number(event.bonusGames) || Math.round(Number(event.award) / 7.1));
          const bonusComplete = await animateExperienceCounter(ggoBonusGames, "G", "GUN GALE BONUS", `${yen.format(event.award)}枚BONUS 消化中`, "純増約7.1枚/G・終了後はSTへ戻ります", 100, "ガンゲイルBONUS", runId);
          if (!bonusComplete) return;
          consumedGames += ggoBonusGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          setExperienceStage(3, event.continued ? "ST RESET" : "ST END", event.continued ? "イカれたレン 8G再セット" : "イカれたレン終了", event.continued ? `累計 ${yen.format(event.cumulative)}枚` : `最終BONUS +${yen.format(event.award)}枚`, event.continued ? "次の8G STへ進みます" : "引き戻し状態へ移行して最終結果へ", event.continued ? "hyper" : "end", event.continued ? data.upperContinueChance : 0, event.continued ? "上位ST継続" : "上位ST終了");
          await waitForExperience(event.continued ? 850 : 1050);
          continue;
        }
        const upperCounterPhase = setPushFlow ? "SUPER REVOLUTION RUSH" : karakuriJudgeFlow ? "超からくりサーカス" : battleBonusFlow ? "無想転生バトル" : garoBattleFlow ? "究極魔戒RUSH" : ragnadorUpperFlow ? "真ラグナドールRUSH" : seiyaTempleFlow ? "千日戦争" : sgRaceFlow ? "青島SG" : "UPPER AT";
        const upperDisplaySet = Number(event.displaySet) || Number(event.set);
        const isChanceEvent = event.kind === "special" || event.kind === "slot-bonus" || event.kind === "coin-add";
        const counterComplete = await animateExperienceCounter(eventGames, "G", event.kind === "upper" ? upperCounterPhase : "AT COUNT", event.kind === "upper" ? (upperGameManaged ? `${data.upperLabel}消化中` : `${data.upperLabel} SET ${upperDisplaySet}消化中`) : `${data.mainLabel}消化中`, isChanceEvent ? "抽選契機まで残りゲーム数が減っていきます" : "次の出玉契機まで残りゲーム数が減っていきます", event.kind === "upper" ? (upperGameManaged ? 100 : data.upperContinueChance) : data.specialChance, event.kind === "upper" ? (upperGameManaged ? "上位ATゲーム消化" : `${data.upperLabel}継続目安`) : "上乗せ・ボーナス抽選", runId);
        if (!counterComplete) return;
        if (seiyaTempleFlow && event.kind === "upper") {
          const seiyaSetLabel = `${data.upperLabel} SET ${upperDisplaySet}`;
          setExperienceStage(3, "黄金聖闘士バトル", seiyaSetLabel, "PUSH", "継続バトルと星輝の加護・BONUS報酬を開きます", "judge", data.upperContinueChance, `Vストック込み継続期待度 約${Math.round(data.upperContinueChance)}%`);
          await waitForExperienceAction(`${seiyaSetLabel} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.continued ? "星輝の加護" : "千日戦争 END", event.continued ? (event.rewardLabel || "黄金聖闘士撃破") : "黄金聖闘士バトル敗北", event.continued ? `+${yen.format(event.award)}枚` : `SET獲得 +${yen.format(event.award)}枚`, event.continued ? "報酬を獲得して次セットへ進みます" : "20Gのエンディングへ進みます", event.continued ? "hyper" : "end", event.continued ? 100 : 0, `${seiyaSetLabel} 結果`);
          await waitForExperience(event.continued ? 950 : 800);
        }
        consumedGames += eventGames;
        setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
        setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });

        if (event.kind === "special") {
          setExperienceStage(3, "CHANCE", "抽選結果", "PUSH", "上乗せかボーナスか、PUSHで結果を開きます", "judge", data.specialChance, "抽選結果はPUSH後に発表");
          await waitForExperienceAction(`${event.label} PUSH`, 4000, "gold");
          if (runId !== experienceRunId) return;
          runningAddOn += Number(event.award) || 0;
          runningAddOnGames += Number(event.gameAdd) || 0;
          setSlotAtStatus({ visible: true, remaining: event.gameAdd, addOnGames: runningAddOnGames, total: event.cumulative });
          setExperienceStage(3, "ADD ON", event.label, `+${yen.format(event.gameAdd)}G`, `累計上乗せ +${yen.format(runningAddOnGames)}G`, "hit", 100, `${event.label} 結果`);
          await waitForExperience(1350);
          const addOnCounterComplete = await animateExperienceCounter(event.gameAdd, "G", "AT COUNT", `${event.label} 消化中`, "上乗せゲームを消化します", 100, "上乗せゲーム消化", runId);
          if (!addOnCounterComplete) return;
          consumedGames += Number(event.gameAdd) || 0;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "slot-bonus") {
          setExperienceStage(3, "CHANCE", "抽選結果", "PUSH", "上乗せかボーナスか、PUSHで結果を開きます", "judge", data.specialChance, "抽選結果はPUSH後に発表");
          await waitForExperienceAction(`${event.label} PUSH`, 4000, "gold");
          if (runId !== experienceRunId) return;
          const bonusGames = Math.max(0, Number(event.bonusGames) || 0);
          setExperienceStage(3, "BONUS HIT", event.label, bonusGames ? `${yen.format(bonusGames)}G` : "BONUS", bonusGames ? "ボーナス消化を開始します" : "ボーナス当選！獲得結果を発表します", "hit", 100, `${event.label} 当選`);
          await waitForExperience(850);
          if (bonusGames) {
            const bonusCounterComplete = await animateExperienceCounter(bonusGames, "G", "BONUS COUNT", `${event.label} 消化中`, "残りゲーム数が減っていきます", 100, "ボーナス消化", runId);
            if (!bonusCounterComplete) return;
            consumedGames += bonusGames;
          }
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          setExperienceStage(3, "BONUS RESULT", event.label, `+${yen.format(event.award)}枚`, `ボーナス終了・累計 ${yen.format(event.cumulative)}枚`, "hit", 100, `${event.label} 結果`);
          await waitForExperience(1100);
          continue;
        }

        if (event.kind === "coin-add") {
          setExperienceStage(3, "CHANCE", "抽選結果", "PUSH", "上乗せかボーナスか、PUSHで結果を開きます", "judge", data.specialChance, "抽選結果はPUSH後に発表");
          await waitForExperienceAction(`${event.label} PUSH`, 4000, "gold");
          if (runId !== experienceRunId) return;
          runningAddOn += Number(event.award) || 0;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, total: event.cumulative });
          setExperienceStage(3, "ADD ON", event.label, `+${yen.format(event.award)}枚`, `差枚上乗せ・累計 ${yen.format(event.cumulative)}枚`, "hit", 100, `${event.label} 結果`);
          await waitForExperience(1200);
          continue;
        }

        const isUpper = event.kind === "upper";
        setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
        setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
        const upperPhase = setPushFlow ? "SUPER REVOLUTION RUSH" : karakuriJudgeFlow ? "超からくりサーカス" : battleBonusFlow ? "無想転生バトル" : garoBattleFlow ? "究極魔戒RUSH" : ragnadorUpperFlow ? "真ラグナドールRUSH" : seiyaTempleFlow ? "千日戦争" : sgRaceFlow ? "青島SG" : "UPPER AT";
        const upperTotalLabel = karakuriJudgeFlow ? "上位AT累計" : setPushFlow ? "超革命RUSH累計" : battleBonusFlow ? "無想転生累計" : garoBattleFlow ? "究極魔戒RUSH累計" : ragnadorUpperFlow ? "真ラグナドールRUSH累計" : seiyaTempleFlow ? "千日戦争累計" : sgRaceFlow ? "青島SG累計" : "上位AT累計";
        const customUpperEnded = isUpper && (battleBonusFlow || garoBattleFlow || seiyaTempleFlow || sgRaceFlow) && event.continued === false;
        setExperienceStage(3, isUpper ? upperPhase : "AT MODE", customUpperEnded ? `${event.label} 終了` : isUpper ? (upperGameManaged ? `${event.label} RESULT` : `${event.label} SET ${upperDisplaySet}`) : `${event.label} START`, isUpper ? `${yen.format(eventGames)}G / +${yen.format(event.award)}枚` : `+${yen.format(event.award)}枚`, customUpperEnded ? `${upperTotalLabel} ${yen.format(event.cumulative)}枚・最終結果へ` : isUpper ? `${upperTotalLabel} ${yen.format(event.cumulative)}枚` : `基本獲得 ${yen.format(event.cumulative)}枚`, customUpperEnded ? "end" : isUpper ? "hyper" : "rush", customUpperEnded ? 0 : isUpper ? (upperGameManaged ? 100 : data.upperContinueChance) : data.specialChance, customUpperEnded ? `${data.upperLabel}継続終了` : isUpper ? (upperGameManaged ? `${machine.sim.upperGameRange || "100〜300G"} 消化結果` : `${data.upperLabel} ${Math.round(data.upperContinueChance)}% LOOP`) : `${data.specialLabel || "上乗せ"}当選目安`);
        await waitForExperience(isUpper ? 900 : 700);
        if (garoBattleFlow && customUpperEnded) {
          const returnGames = Math.max(1, Number(machine.sim.upperReturnGames) || 32);
          const returnComplete = await animateExperienceCounter(returnGames, "G", "RUSH終了後", `${returnGames}G引き戻しZONE`, "最後まで回して究極魔戒RUSHの引き戻しを確認します", 100, `${returnGames}G戻し区間`, runId);
          if (!returnComplete) return;
          consumedGames += returnGames;
          setExperienceStage(3, "RUSH END", "究極魔戒RUSH終了", `${yen.format(data.upperLoops)}戦`, `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, "end", 0, "32G引き戻し区間終了");
          await waitForExperience(800);
        }
        if (seiyaTempleFlow && customUpperEnded) {
          const endingGames = Math.max(1, Number(machine.sim.upperLossEpisodeGames) || 20);
          const endingComplete = await animateExperienceCounter(endingGames, "G", "ENDING EPISODE", "千日戦争・最終エピソード", "戦いの結末を最後まで消化します", 100, `${endingGames}Gエンディング`, runId);
          if (!endingComplete) return;
          consumedGames += endingGames;
          const returnGames = Math.max(1, Number(machine.sim.upperReturnGames) || 100);
          const returnComplete = await animateExperienceCounter(returnGames, "G", "RETURN ZONE", `${returnGames}G＋α 引き戻し区間`, "通常へ戻るまでの引き戻し区間を最後まで回します", 100, `${returnGames}G＋α戻し区間`, runId);
          if (!returnComplete) return;
          consumedGames += returnGames;
          setExperienceStage(3, "RUSH END", "千日戦争終了", `${yen.format(data.upperLoops)} SET`, `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, "end", 0, `${returnGames}G引き戻し区間終了`);
          await waitForExperience(800);
        }
      }
      if (setPushFlow && !data.complete && data.upper) {
        const nextSet = Math.max(4, Number(data.upperLoops) + 4);
        setExperienceStage(3, "SUPER REVOLUTION SET", `${data.upperLabel} SET ${nextSet}`, "PUSH", "最後の継続判定を開きます", "judge", data.upperContinueChance, `${data.upperLabel} ${Math.round(data.upperContinueChance)}% LOOP`);
        await waitForExperienceAction(`超革命 SET ${nextSet} PUSH`, 4500, "upper");
        if (runId !== experienceRunId) return;
        setExperienceStage(3, "RUSH END", "継続失敗", `${yen.format(data.upperLoops)} SET`, `${data.upperLabel}終了・最終結果へ`, "end", 0, "超革命RUSH終了");
        await waitForExperience(800);
      } else if (setPushFlow && !data.complete && !data.upper && !hadUpperChallenge && normalSetCount) {
        const nextSet = normalSetCount + 1;
        setExperienceStage(3, "REVOLUTION SET", `${data.mainLabel} SET ${nextSet}`, "PUSH", "最後の継続判定を開きます", "judge", data.mainSetContinueChance, `セット継続率 ${Math.round(data.mainSetContinueChance)}%`);
        await waitForExperienceAction(`SET ${nextSet} PUSH`);
        if (runId !== experienceRunId) return;
        setExperienceStage(3, "RUSH END", "継続失敗", `${normalSetCount} SET`, `${data.mainLabel}終了・最終結果へ`, "end", 0, "革命RUSH終了");
        await waitForExperience(800);
      }
      if (data.complete) {
        setExperienceStage(3, "SLOT COMPLETE", "コンプリート", `${yen.format(data.payout)}枚`, "獲得上限へ到達", "complete", 100, "コンプリート到達");
        setSlotAtStatus({ visible: true, remaining: 0, addOn: Number(data.addOnTotal) || runningAddOn, addOnGames: gameAddOnFlow ? (Number(data.addOnGamesTotal) || runningAddOnGames) : null, total: data.payout });
        await waitForExperience(780);
      }
      setSlotAtStatus({ visible: true, remaining: 0, addOn: Number(data.addOnTotal) || runningAddOn, addOnGames: gameAddOnFlow ? (Number(data.addOnGamesTotal) || runningAddOnGames) : null, total: data.payout });
    } else {
      setSlotAtStatus();
      setExperienceStage(3, "NORMAL END", "通常へ", "AT非突入", "最終結果を表示します", "end", 0, "AT判定結果");
      await waitForExperience(420);
    }
  }

  async function finishATypeExperience(completed) {
    if (!aTypeSession || aTypeBusy) return;
    aTypeBusy = true;
    document.getElementById("machineAtypeActions").hidden = true;
    const result = buildATypeResult(aTypeSession, completed);
    addMachinePlaySessionResult(result);
    setExperienceStage(4, completed ? "8,000G COMPLETE" : "FINAL RESULT", result.title, result.experience.finalValue, `今回の収支 ${result.balanceYen >= 0 ? "+" : ""}${yen.format(result.balanceYen)}円 / BIG ${aTypeSession.big}回・REG ${aTypeSession.reg}回`, result.score >= 0 ? "complete" : "end", 100, "今回の最終結果");
    setExperienceHud(`${yen.format(result.attempts)}G`, `${yen.format(result.investment)}円`, `${result.score >= 0 ? "+" : ""}${yen.format(result.score)}枚`);
    document.getElementById("machineExperienceFinishActions").hidden = false;
    renderResult(result);
    showExperienceActions();
    startButton.disabled = false;
    aTypeBusy = false;
    maybeRequestAdBreak();
  }

  async function advanceATypeExperience(runId) {
    if (!aTypeSession || aTypeBusy || runId !== experienceRunId) return;
    aTypeBusy = true;
    document.getElementById("machineAtypeActions").hidden = true;
    const session = aTypeSession;
    const startGames = session.games;
    setExperienceStage(0, "NEXT BONUS", "次のボーナスを抽選中", `${yen.format(startGames)}G`, "設定はまだ非公開です", "normal", 100 / session.combinedRate, "1Gごとのボーナス合算");
    await waitForExperience(260);
    if (runId !== experienceRunId || !aTypeSession) { aTypeBusy = false; return; }

    const bigGap = geometric(session.bigRate);
    const regGap = geometric(session.regRate);
    const gap = Math.min(bigGap, regGap);
    const nextGames = Math.min(session.maxGames, startGames + gap);
    const preBonusDiff = aTypeDiff(session, nextGames, session.big, session.reg);
    session.games = nextGames;
    session.lastGap = nextGames - startGames;
    session.maxGap = Math.max(session.maxGap, session.lastGap);
    session.minDiff = Math.min(session.minDiff, preBonusDiff);
    session.maxDiff = Math.max(session.maxDiff, preBonusDiff);

    if (startGames + gap <= session.maxGames) {
      session.lastBonus = bigGap <= regGap ? "BIG" : "REG";
      if (session.lastBonus === "BIG") session.big += 1;
      else session.reg += 1;
      const postBonusDiff = aTypeDiff(session);
      session.minDiff = Math.min(session.minDiff, postBonusDiff);
      session.maxDiff = Math.max(session.maxDiff, postBonusDiff);
      const interim = buildATypeResult(session, false);
      setExperienceHud(`${yen.format(session.games)}G`, `${yen.format(interim.investment)}円`, `${interim.score >= 0 ? "+" : ""}${yen.format(interim.score)}枚`);
      setExperienceStage(1, "BONUS HIT", `${session.lastBonus} BONUS`, `${yen.format(session.lastGap)}Gで当選`, `累計 BIG ${session.big}回・REG ${session.reg}回 / 設定は終了時に発表`, session.lastBonus === "BIG" ? "hyper" : "hit", 100, `${session.lastBonus}当選`);
      await waitForExperience(420);
    }

    aTypeBusy = false;
    if (runId !== experienceRunId || !aTypeSession) return;
    if (session.games >= session.maxGames) {
      await finishATypeExperience(true);
      return;
    }
    setExperienceStage(2, "PLAY SELECT", "続けますか？", `現在 ${yen.format(session.games)}G`, `BIG ${session.big}回・REG ${session.reg}回 / やめると設定と収支を発表`, "judge", 100, "続行判断");
    document.getElementById("machineAtypeActions").hidden = false;
    document.getElementById("machineAtypeContinue").focus({ preventScroll: true });
  }

  function startATypeExperience(setting, runId) {
    aTypeSession = createATypeSession(setting);
    aTypeBusy = false;
    document.getElementById("machineExperienceSkip").hidden = true;
    setExperienceHud("0G", "0円", "0枚");
    advanceATypeExperience(runId);
  }

  async function runMachineExperience() {
    const runId = ++experienceRunId;
    skipExperience();
    experienceSkipped = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;
    openExperience();
    latestResult = null;
    rankingTicketId = null;
    rankingTicketPromise = requestRankingTicket();
    startButton.disabled = true;
    document.getElementById("rankMachineResult").disabled = true;
    document.getElementById("machineResult").classList.remove("has-result", "is-complete");
    document.getElementById("machineExperienceSkip").hidden = false;
    const setting = machine.type === "slot" ? randomSlotSetting() : 0;
    if (machine.sim.kind === "juggler") {
      startATypeExperience(setting, runId);
      return;
    }
    const result = machine.sim.kind === "pachinko" ? runPachinko() : runSlot(setting);
    if (machine.sim.kind === "pachinko") await playPachinkoExperience(result, runId);
    else await playSlotExperience(result, runId);
    if (runId !== experienceRunId) return;
    addMachinePlaySessionResult(result);
    setExperienceStage(4, "FINAL RESULT", result.title, result.experience.finalValue || `${yen.format(result.payout)}${result.scoreKind === "coins" ? "枚" : "玉"}`, `今回の収支 ${result.balanceYen >= 0 ? "+" : ""}${yen.format(result.balanceYen)}円 / 今回の差${result.scoreKind === "coins" ? "枚" : "玉"} ${result.score >= 0 ? "+" : ""}${yen.format(result.score)}`, result.complete ? "complete" : result.experience.kind === "juggler" ? (result.score >= 0 ? "rush" : "end") : result.experience.upper ? "hyper" : result.experience.entered ? "rush" : "end", 100, "今回の最終結果");
    document.getElementById("machineExperienceSkip").hidden = true;
    document.getElementById("machineExperienceFinishActions").hidden = false;
    await waitForExperience(280);
    renderResult(result);
    showExperienceActions();
    startButton.disabled = false;
    maybeRequestAdBreak();
  }

  startButton.addEventListener("click", () => {
    if (!machineReady) return;
    resetMachinePlaySession();
    machinePlaySession = createMachinePlaySession();
    runMachineExperience();
  });
  document.getElementById("machineExperienceSound").addEventListener("click", () => {
    experienceSoundEnabled = !experienceSoundEnabled;
    localStorage.setItem(EXPERIENCE_SOUND_KEY, experienceSoundEnabled ? "on" : "off");
    updateExperienceSoundButton();
    if (experienceSoundEnabled) playExperienceSound("rush", true);
  });
  document.getElementById("machineExperienceSkip").addEventListener("click", skipExperience);
  document.getElementById("machineExperienceClose").addEventListener("click", closeExperience);
  document.getElementById("machineOverlayClose").addEventListener("click", closeExperience);
  document.getElementById("machineOverlayRetry").addEventListener("click", runMachineExperience);
  document.getElementById("machineExperienceReplay").addEventListener("click", runMachineExperience);
  document.getElementById("machineExperienceBack").addEventListener("click", closeExperience);
  document.getElementById("machineExperiencePush").addEventListener("click", () => {
    playExperienceSound("push", true);
    if (experienceActionResolve) experienceActionResolve();
  });
  document.getElementById("machineAtypeContinue").addEventListener("click", () => advanceATypeExperience(experienceRunId));
  document.getElementById("machineAtypeStop").addEventListener("click", () => finishATypeExperience(false));
  document.querySelectorAll("#playRate, #lendBalls, #exchangeBalls, #baseRate, #lendCoins, #exchangeCoins, #coinUnit").forEach(input => input.addEventListener("input", updateAverages));

  const nicknameInput = document.getElementById("rankingNickname");
  nicknameInput.value = localStorage.getItem("ichigekiRankingNicknameV1") || "";

  function rankingKey() { return `ichigekiMachineRankingV3:${rankingMachineSlug}`; }
  function rankingCooldownKey() { return `ichigekiRankingCooldownV1:${rankingMachineSlug}`; }
  function isRankingRecordValid(record) {
    if (!record || typeof record !== "object") return false;
    const score = Number(record.score);
    const investment = Number(record.investment);
    const payout = Number(record.payout);
    const attempts = Number(record.attempts);
    if (![score, investment, payout, attempts].every(Number.isFinite)) return false;
    if (investment < 0 || investment > 100000000 || payout < 0 || payout > 10000000 || attempts < 0 || attempts > 10000000) return false;
    if (machine.type === "slot") {
      if (recordSetting(record) < 1 || recordSetting(record) > 6) return false;
      if (score > SLOT_COMPLETE_LIMIT || score < -10000000) return false;
      if ((record.score_kind || record.scoreKind) !== "coins") return false;
    } else if ((record.score_kind || record.scoreKind) !== "balls") return false;
    return true;
  }
  function isBetterRanking(candidate, current) {
    return !current || Number(candidate.score) > Number(current.score) || (Number(candidate.score) === Number(current.score) && Number(candidate.investment) < Number(current.investment));
  }
  function rankingCooldownRemaining() {
    const lastRegisteredAt = Number(localStorage.getItem(rankingCooldownKey())) || 0;
    return Math.max(0, RANKING_COOLDOWN_MS - (Date.now() - lastRegisteredAt));
  }
  function cleanRankingNickname(value) {
    return String(value || "").replace(/[\u0000-\u001f\u007f]/g, "").trim().replace(/\s+/g, " ").slice(0, 16);
  }
  function readLocalRanking() {
    try {
      const records = JSON.parse(localStorage.getItem(rankingKey()) || "[]");
      return Array.isArray(records)
        ? records.filter(isRankingRecordValid).sort((a, b) => Number(b.score) - Number(a.score) || Number(a.investment) - Number(b.investment)).slice(0, 1)
        : [];
    } catch { return []; }
  }
  function scoreText(record) {
    const unit = record.score_kind === "coins" || record.scoreKind === "coins" ? "枚" : "玉";
    const score = Number(record.score) || 0;
    return `${score >= 0 ? "+" : ""}${yen.format(score)}${unit}`;
  }
  function rankingDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });
  }
  function appendSettingBadge(container, setting) {
    if (!setting) return;
    const badge = document.createElement("em");
    badge.className = `machine-setting-badge is-setting-${setting}`;
    badge.textContent = `設定${setting}`;
    container.appendChild(badge);
  }
  function renderRanking(records, isPublic = false, ownRecord = null) {
    const sorted = [...records].filter(isRankingRecordValid).sort((a, b) => Number(b.score) - Number(a.score) || Number(a.investment) - Number(b.investment)).slice(0, 10);
    const list = document.getElementById("machineRankingList");
    list.innerHTML = "";
    if (!sorted.length) {
      const empty = document.createElement("li");
      empty.className = "is-empty";
      empty.textContent = "まだランキング記録がありません。最初の記録を狙ってください。";
      list.appendChild(empty);
    } else {
      sorted.forEach((record, index) => {
        const item = document.createElement("li");
        const rank = document.createElement("b");
        const name = document.createElement("span");
        const score = document.createElement("strong");
        const meta = document.createElement("small");
        rank.textContent = String(index + 1);
        name.textContent = record.nickname || "ゲスト";
        score.textContent = scoreText(record);
        const setting = recordSetting(record);
        meta.className = "machine-ranking-meta";
        appendSettingBadge(meta, setting);
        meta.append(document.createTextNode(`投資 ${yen.format(Number(record.investment) || 0)}円・${rankingDate(record.updated_at || record.savedAt || record.created_at)}`));
        item.append(rank, name, score, meta);
        list.appendChild(item);
      });
    }
    document.getElementById("machineRankingMode").textContent = isPublic ? "みんなのTOP10" : "この端末のTOP10";
    const ownRecords = isPublic ? [ownRecord || rankingOwnRecord].filter(isRankingRecordValid) : readLocalRanking();
    const ownBest = [...ownRecords].sort((a, b) => Number(b.score) - Number(a.score) || Number(a.investment) - Number(b.investment))[0];
    const self = document.getElementById("machineRankingSelf");
    if (ownBest) {
      self.querySelector("strong").textContent = scoreText(ownBest);
      const setting = recordSetting(ownBest);
      const title = ownBest.title || "自己ベスト";
      const cleanTitle = setting ? title.replace(new RegExp(`^設定\\s*${setting}\\s*[｜・]?\\s*`), "") : title;
      const detail = self.querySelector("small");
      detail.textContent = "";
      appendSettingBadge(detail, setting);
      detail.append(document.createTextNode(`${cleanTitle}・投資 ${yen.format(Number(ownBest.investment) || 0)}円`));
    }
  }
  function saveLocalRanking(nickname) {
    const current = readLocalRanking()[0];
    const record = { ...latestResult, score: latestResult.rankScore, investment: latestResult.rankInvestment, nickname, savedAt: new Date().toISOString() };
    const updated = isBetterRanking(record, current);
    localStorage.setItem(rankingKey(), JSON.stringify(updated ? [record] : current ? [current] : []));
    renderRanking(readLocalRanking(), false);
    return updated;
  }
  function loadScript(src, id) {
    if (document.getElementById(id)) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  async function refreshPublicRanking() {
    if (!rankingClient) return;
    const fields = "user_id,nickname,score,score_kind,title,summary,investment,payout,attempts,verified,updated_at";
    const [rankingResult, ownResult] = await Promise.all([
      rankingClient.from("machine_rankings").select(fields).eq("machine_slug", rankingMachineSlug).eq("verified", true).order("score", { ascending: false }).order("investment", { ascending: true }).limit(50),
      rankingUserId ? rankingClient.from("machine_rankings").select(fields).eq("machine_slug", rankingMachineSlug).eq("user_id", rankingUserId).eq("verified", true).maybeSingle() : Promise.resolve({ data: null, error: null })
    ]);
    if (rankingResult.error) throw rankingResult.error;
    if (ownResult.error) throw ownResult.error;
    rankingOwnRecord = isRankingRecordValid(ownResult.data) ? ownResult.data : null;
    renderRanking(rankingResult.data || [], true, rankingOwnRecord);
  }
  async function initializeRanking() {
    renderRanking(readLocalRanking(), false);
    try {
      await loadScript("auth.js?v=1", "ichigeki-auth-script");
      await window.ICHIGEKI_AUTH.ready();
      rankingClient = await window.ICHIGEKI_AUTH.getClient();
      rankingUserId = window.ICHIGEKI_AUTH.getUser()?.id || null;
      await refreshPublicRanking();
      rankingMode = "public";
      const loginNote = rankingUserId ? "" : " 登録にはGoogleログインが必要です。";
      document.getElementById("machineRankingNotice").textContent = machine.type === "slot" ? `${slotSettingLabel}ランダムで遊んだみんなの最高記録です。ランキングに設定も表示します。${loginNote}` : `この機種を遊んだみんなの最高記録です。各利用者の自己ベストだけを掲載します。${loginNote}`;
    } catch {
      rankingMode = "local";
      document.getElementById("machineRankingNotice").textContent = "現在はこの端末内のランキングを表示しています。公開ランキング準備後に自動で切り替わります。";
    }
  }

  async function requestRankingTicket() {
    try {
      if (rankingReadyPromise) await rankingReadyPromise;
      if (!rankingClient || !window.ICHIGEKI_AUTH?.isSignedIn()) return null;
      rankingUserId = window.ICHIGEKI_AUTH.getUser()?.id || null;
      if (!rankingUserId) return null;
      const { data, error } = await rankingClient.rpc("start_verified_ranking_play", { p_machine_slug: rankingMachineSlug });
      if (error) throw error;
      rankingTicketId = typeof data === "string" ? data : null;
      return rankingTicketId;
    } catch (error) {
      console.warn("ICHIGEKI ranking ticket:", error.message);
      rankingTicketId = null;
      return null;
    }
  }

  async function registerRanking(rawNickname, button) {
    if (!latestResult) return;
    if (latestResult.rankingEligible === false) {
      document.getElementById("machineRankingNotice").textContent = "Aタイプのランキングは8,000G完走時だけ登録できます。途中終了の結果はマイ記録に保存済みです。";
      return false;
    }
    if (!window.ICHIGEKI_AUTH?.isSignedIn()) {
      document.getElementById("machineRankingNotice").textContent = "ランキング登録にはGoogleログインが必要です。ログイン後、もう一度結果を出して登録してください。";
      await window.ICHIGEKI_AUTH?.signInWithGoogle();
      return false;
    }
    rankingUserId = window.ICHIGEKI_AUTH.getUser()?.id || null;
    const nickname = cleanRankingNickname(rawNickname);
    if (!nickname) {
      nicknameInput.focus();
      document.getElementById("machineRankingNotice").textContent = "ランキング表示名を入力してください。";
      return false;
    }
    const cooldown = rankingCooldownRemaining();
    if (cooldown > 0) {
      document.getElementById("machineRankingNotice").textContent = `連続登録を防ぐため、あと${Math.ceil(cooldown / 1000)}秒お待ちください。`;
      button.textContent = "少し待ってください";
      return false;
    }
    nicknameInput.value = nickname;
    document.getElementById("machineOverlayNickname").value = nickname;
    localStorage.setItem("ichigekiRankingNicknameV1", nickname);
    const localUpdated = saveLocalRanking(nickname);
    localStorage.setItem(rankingCooldownKey(), String(Date.now()));
    const rankButtons = [document.getElementById("rankMachineResult"), document.getElementById("machineOverlayRank")];
    rankButtons.forEach(item => { item.disabled = true; item.textContent = "登録中..."; });
    try {
      if (rankingMode === "public" && rankingClient && rankingUserId) {
        const ticketId = rankingTicketId || await rankingTicketPromise;
        if (!ticketId) throw new Error("検証用プレイ券を確認できません。ログイン後にもう一度遊んでください。");
        const { data, error } = await rankingClient.rpc("submit_verified_machine_ranking", {
          p_ticket_id: ticketId,
          p_nickname: nickname,
          p_score: latestResult.rankScore,
          p_score_kind: latestResult.scoreKind,
          p_title: latestResult.title,
          p_investment: latestResult.rankInvestment,
          p_payout: latestResult.rankPayout ?? latestResult.payout,
          p_attempts: latestResult.attempts,
          p_setting: latestResult.setting || null
        });
        if (error) throw error;
        const isBetter = Boolean(data?.updated);
        rankingTicketId = null;
        await refreshPublicRanking();
        document.getElementById("machineRankingNotice").textContent = isBetter ? "サーバー検証済みの自己ベストを公開ランキングへ登録しました。" : "検証は完了しましたが、公開中の自己ベストの方が上位です。";
      } else {
        document.getElementById("machineRankingNotice").textContent = localUpdated ? "この端末の自己ベストを登録しました。" : "端末内の自己ベストの方が上位です。記録は更新されませんでした。";
      }
      rankButtons.forEach(item => { item.textContent = "登録済み"; });
      window.ICHIGEKI_INSIGHTS?.track("ranking_register", { machine_slug: rankingMachineSlug, public: rankingMode === "public" });
      return true;
    } catch {
      rankingMode = "local";
      renderRanking(readLocalRanking(), false);
      document.getElementById("machineRankingNotice").textContent = localUpdated ? "端末内の自己ベストへ登録しました。公開ランキングには現在接続できません。" : "端末内の自己ベストは更新されませんでした。公開ランキングには現在接続できません。";
      rankButtons.forEach(item => { item.textContent = "端末に登録済み"; });
      return true;
    }
  }

  document.getElementById("rankMachineResult").addEventListener("click", async event => {
    await registerRanking(nicknameInput.value, event.currentTarget);
  });

  document.getElementById("machineOverlayPost").addEventListener("click", () => {
    document.body.classList.remove("has-machine-experience");
  });
  document.getElementById("machineOverlayRank").addEventListener("click", async event => {
    const input = document.getElementById("machineOverlayNickname");
    const nickname = cleanRankingNickname(input.value);
    if (!nickname) {
      input.focus();
      event.currentTarget.textContent = "名前を入力してください";
      return;
    }
    const registered = await registerRanking(nickname, event.currentTarget);
    if (registered) window.setTimeout(closeExperience, 450);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !document.getElementById("machineExperience").hidden) closeExperience();
  });

  updateAverages();
  rankingReadyPromise = initializeRanking();
})();
