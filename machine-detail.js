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
  const slotRankingVersion = machine.sim.kind !== "juggler" && machine.sim.settingRates ? "v3" : "v2";
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
    return `<section class="machine-article-section"><h3>平均Gと投資目安の計算</h3><p>${initialHitLabel}初当りの目安は約1/${sim.mainRate}です。50枚あたり${sim.base50}G、1,000円46枚貸しの固定条件から、1,000円で回せるゲーム数を約${gamesPerThousand.toFixed(1)}Gとして計算します。この条件では約${yen.format(averageInvestment)}円が平均投資の目安です。</p><p>${settingModelText} コイン単価${sim.coinUnit}円は出玉の荒さを比べる指標で、現金投資額そのものではありません。換金は5.2枚交換で固定しています。</p></section>`;
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
      charts.push(ratioChartMarkup(
        "AT ENTRY",
        `${sim.triggerLabel}突破割合`,
        [["突破", sim.triggerSuccess], ["非突破", 1 - sim.triggerSuccess]],
        percent(sim.triggerSuccess),
        `${sim.triggerLabel}から${sim.mainLabel}へ進む代表割合です。`
      ));
      if (sim.upperLabel && Number(sim.upperSuccess) > 0) {
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
        note = `${sim.triggerLabel}突破と${sim.upperChallenge}成功は別々の抽選です。ゾーン・上位ルート選択率を含む全体到達率ではありません。`;
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
    const upperRoute = sim.upperLabel
      ? sim.karakuriJudgeFlow
        ? `${sim.specialLabel}を3回成功させて${sim.upperChallenge}、4回目以降の成功時は運命連鎖から${sim.upperLabel}を目指します。`
        : `${sim.specialLabel}などで獲得を伸ばし、${sim.upperChallenge}成功から${sim.upperLabel}を目指します。`
      : `${sim.specialLabel}などの出玉契機で獲得枚数を伸ばします。`;
    const judgeText = isDirectEntry
      ? `${sim.triggerLabel}を初当りとして扱い、独立したCZ突破抽選は行いません。`
      : `${sim.triggerLabel}到達後、代表突破率${percent(successRate)}で${sim.mainLabel}への当落を判定します。`;
    const missText = isDirectEntry
      ? "初当り後はそのままメイン区間へ進みます。"
      : `成功で${sim.mainLabel}、失敗時は通常時へ戻る流れです。`;
    const flow = isDirectEntry
      ? [
          ["01", "通常時", `${sim.triggerLabel}を待つ`],
          ["02", "初当り", `約1/${triggerRate}`],
          ["03", "メイン", sim.mainLabel],
          ["04", "出玉契機", sim.specialLabel]
        ]
      : [
          ["01", "通常時", `${sim.triggerLabel}を目指す`],
          ["02", "CZ・入口", `約1/${triggerRate}`],
          ["03", "突破ジャッジ", `${percent(successRate)}で成功`],
          ["04", "AT・ST", sim.mainLabel]
        ];
    const upperStep = sim.upperLabel
      ? `<div class="machine-cz-upper"><span>その先</span><strong>${sim.karakuriJudgeFlow ? "激情3回→運命の一劇 / 4回→運命連鎖" : sim.upperChallenge}</strong><i aria-hidden="true">→</i><strong>${sim.upperLabel}</strong><small>${sim.karakuriJudgeFlow ? "激情ジャッジ成功回数で上位ルートが変化" : "上位ルートはCZ突破後の別抽選"}</small></div>`
      : "";
    return `<section class="machine-cz-guide${isDirectEntry ? " is-direct" : ""}" id="cz-game" aria-labelledby="machine-cz-title"><div class="machine-cz-head"><span>${isDirectEntry ? "DIRECT ENTRY FLOW" : "CHANCE ZONE GUIDE"}</span><h3 id="machine-cz-title">${machine.shortName}の${isDirectEntry ? "初当りゲーム性" : "CZのゲーム性"}</h3><p>${isDirectEntry ? "CZを経由しない初当りから、出玉を伸ばす流れを整理します。" : `${sim.triggerLabel}の役割、突破後の行き先、上位までの流れを整理します。`}</p></div><div class="machine-cz-flow" aria-label="${escapeHtml(`${machine.shortName}のゲームフロー`)}">${flow.map(([number, label, detail], index) => `<div><span>${number}</span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(detail)}</small></div>${index < flow.length - 1 ? '<i aria-hidden="true">›</i>' : ""}`).join("")}</div>${upperStep}<div class="machine-cz-detail-grid"><article><span>ROLE</span><h4>${isDirectEntry ? "初当りの役割" : "CZの役割"}</h4><p>通常時の入口は${sim.triggerLabel}で、発生目安は約1/${triggerRate}です。${isDirectEntry ? `${sim.mainLabel}へ直接つながる代表ルートとして扱います。` : `${sim.mainLabel}へ進むための関門として扱います。`}</p></article><article><span>JUDGE</span><h4>${isDirectEntry ? "直結タイプ" : "CZ中の当落"}</h4><p>${judgeText} 実機の小役、ポイント、バトルなど複数の条件は、このサイトでは一連のジャッジへまとめています。</p></article><article><span>RESULT</span><h4>成功・失敗後</h4><p>${missText} ${sim.mainLabel}初当りの設定${slotBaselineSetting}基準は約1/${mainRate}です。</p></article><article><span>NEXT ROUTE</span><h4>AT中と上位ルート</h4><p>${upperRoute}</p></article></div><p class="machine-cz-note">表示するCZ発生率・突破率・上位到達率は、記事に収録した公表値または比較用の代表値です。実機の全小役、内部状態、モード、天井は完全再現していません。</p></section>`;
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
    } else if (sim.karakuriJudgeFlow) {
      cards = [
        ["GAME FLOW", "ゲーム性", `通常時は${sim.triggerLabel}を入口に${sim.mainLabel}を目指します。AT中は4Gの激情ジャッジをPUSHで判定し、成功回数に応じて運命の一劇・運命連鎖から${sim.upperLabel}を目指します。`],
        ["DISTRIBUTION", "獲得枚数の振り分け", `通常ATの代表獲得は${yen.format(sim.normalMin)}〜${yen.format(sim.normalMax)}枚です。激情ジャッジ成功時は100・200・300枚の簡易振り分けを行い、上位到達後は1セット${yen.format(sim.upperPayout)}枚を加算する代表モデルです。`],
        ["ENTRY RATE", "突破率", `${sim.triggerLabel}から${sim.mainLabel}への突破率は${percent(sim.triggerSuccess)}です。激情ジャッジ3回成功後の運命の一劇は${percent(sim.fateSuccess)}、4回目成功時の運命連鎖は${percent(sim.chainSuccess)}で上位ATを判定します。`],
        ["ZONE", "通常時・ゾーン", `${sim.triggerLabel}の基準は約1/${sim.triggerRate}、${sim.mainLabel}初当りは設定${slotBaselineSetting}基準で約1/${sim.mainRate}です。50枚あたり${sim.base50}Gを固定ベースにし、ゲーム数ゾーン・周期・天井の全状態は個別再現していません。`],
        ["ADD-ON", "上乗せ・上位", `激情ジャッジは成功期待度${percent(sim.karakuriJudgeSuccess)}で、成功回数を結果まで保持します。上位AT突入時は極限無双を経由し、${sim.upperLabel}は代表継続率${percent(sim.upperContinue)}として簡易抽選します。`]
      ];
      note = "激情ジャッジの成立役別抽選、内部状態、上乗せ特化ゾーンの全振り分けは簡略化しています。3回・4回成功時の上位ルートとPUSH当落を中心に体験するモデルです。";
    } else if (sim.setPushFlow) {
      const pureIncreaseText = machine.specs?.find(([label]) => /純増/.test(label))?.[1] || "";
      const pureIncrease = Math.max(1, Number(sim.atPureIncrease) || Number.parseFloat(String(pureIncreaseText).match(/[\d.]+/)?.[0] || "") || 4);
      const initialHitLabel = sim.mainRateLabel || machine.initialHitLabel || sim.mainLabel;
      const firstSetText = Array.isArray(sim.firstRushSetGames) ? "初回は基本20G、" : "";
      cards = [
        ["GAME FLOW", "ゲーム性", `通常時は${sim.triggerLabel}を入口に${initialHitLabel}を経て${sim.mainLabel}を目指します。${sim.mainLabel}はセット継続を重ね、${sim.upperChallenge}から${sim.upperLabel}へ進みます。`],
        ["DISTRIBUTION", "ゲーム数と獲得枚数", `${firstSetText}継続セットは10G・20G・50G・100Gの簡易振り分けです。獲得枚数は各セットのゲーム数×純増約${pureIncrease.toFixed(1)}枚/Gを中心に、短期的なブレを加えて計算します。`],
        ["ENTRY RATE", "突破率", `${sim.triggerLabel}から${sim.mainLabel}への簡易突破率は${percent(sim.triggerSuccess)}です。上位ルート選択率は${percent(sim.upperChance)}、${sim.upperChallenge}成功率は${percent(sim.upperSuccess)}として段階ごとに抽選します。`],
        ["ZONE", "通常時・ゾーン", `${sim.triggerLabel}の基準は約1/${sim.triggerRate}、${initialHitLabel}初当りは設定${slotBaselineSetting}基準で約1/${sim.mainRate}です。50枚あたり${sim.base50}Gを固定ベースにし、内部モード・周期・天井の全状態は個別再現していません。`],
        ["ADD-ON", "上乗せ・上位", `${sim.specialLabel}を代表的な上乗せ契機として簡易抽選します。${sim.upperLabel}到達後もセットゲーム数×純増約${pureIncrease.toFixed(1)}枚/Gで獲得を計算し、代表継続率${percent(sim.upperContinue)}で継続判定します。`]
      ];
      note = "セットのゲーム数と獲得枚数を別々には抽選せず、公表純増を基準に連動させています。実機の全小役・内部状態・有利区間は完全再現していません。";
    } else {
      const upperRouteRate = Math.max(0, Number(sim.upperChance) || 0);
      const upperSuccessRate = Math.max(0, Number(sim.upperSuccess) || 0);
      const totalUpperRate = upperRouteRate * upperSuccessRate;
      cards = [
        ["GAME FLOW", "ゲーム性", `通常時は${sim.triggerLabel}を入口に${sim.mainLabel}を目指します。AT中は${sim.specialLabel}などの出玉契機を抽選し、${sim.upperChallenge}を突破すると${sim.upperLabel}へ進みます。`],
        ["DISTRIBUTION", "獲得枚数の振り分け", `通常ATの代表獲得は${yen.format(sim.normalMin)}〜${yen.format(sim.normalMax)}枚、${sim.specialLabel}当選時は${yen.format(sim.specialMin)}〜${yen.format(sim.specialMax)}枚を抽選します。${sim.upperLabel}到達時は${yen.format(sim.upperPayout)}枚を加算する代表モデルです。`],
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
        [`${machine.shortName}の平均投資目安は？`, `設定${slotBaselineSetting}基準の${initialHitLabel}初当り約1/${sim.mainRate}と、50枚あたり${sim.base50}G・46枚貸しの固定条件から、平均${yen.format(averageInvestment)}円を目安として表示します。実際の設定や遊技状況で結果は変わります。`],
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
      <p class="machine-sim-note">投資・換金・収支は固定レートで計算します。パチンコは250玉貸し・28玉交換、スロットは46枚貸し・5.2枚交換です。${machine.sim.kind === "pachinko" ? "表記出玉と、打ち出し・オーバー入賞を簡易反映した実獲得出玉を分けて表示します。" : machine.sim.kind === "juggler" ? `Aタイプは開始時に${slotSettingLabel}を均等抽選し、BIG・REGを重ねて終了時に設定を発表します。` : `開始時に${slotSettingLabel}を均等抽選し、AT中のレア役、上乗せ、特化ゾーン、上位ATを機種別の代表値で時系列表示します。設定は最終結果で発表します。`}</p>
      <div class="machine-sim-layout">
        <div class="machine-sim-controls">${controlMarkup()}<div class="machine-average-grid" id="averageGrid"></div><div class="machine-start-anchor" id="machineStartAnchor"></div><button class="machine-start-button${machineReady ? "" : " is-preparing"}" id="machineStart" type="button"${machineReady ? "" : " disabled"}><span>${machineReady ? startLabel : "準備中"}</span><small>${machineReady ? labels.join(" → ") : availabilityLabel}</small></button><button class="machine-sticky-back" id="machineStickyBack" type="button" aria-label="前のページに戻る" hidden><span aria-hidden="true">←</span><strong>戻る</strong></button></div>
        <div class="machine-result" id="machineResult" aria-live="polite"><span>${machineReady ? "RESULT" : "COMING SOON"}</span><strong id="resultTitle">${machineReady ? "開始ボタンを押してください" : "導入後に遊べます"}</strong><p id="resultSummary">${machineReady ? "平均値と今回の結果を比較できます。" : `${availabilityLabel}です。現在は記事とスペックをご覧ください。`}</p><div class="machine-result-stats" id="resultStats"></div><div class="machine-flow" id="resultFlow"></div><p class="machine-auto-save-status" id="machineAutoSaveStatus">${machineReady ? "結果は自動でマイ記録へ保存されます。" : "シミュレーターは導入日に自動で有効になります。"}</p><div class="achievement-unlock-toast" id="machineAchievementUnlock" hidden><span>TITLE UNLOCKED</span><strong></strong><small>新しい称号を獲得しました</small></div><div class="machine-result-actions"><a class="button" href="ranking.html#achievements">称号・記録を見る</a><a class="button" id="shareMachineResult" href="community.html?machine=${slug}&compose=simulation#simulationComposer">結果を投稿</a></div><div class="machine-ranking-entry"><label class="machine-ranking-name"><span>ランキングに登録する名前</span><input id="rankingNickname" type="text" maxlength="16" autocomplete="nickname" placeholder="ニックネーム"></label><button class="button primary" id="rankMachineResult" type="button" disabled>ランキングに登録</button></div></div>
      </div>
      <section class="machine-experience" id="machineExperience" role="dialog" aria-modal="true" aria-label="${machine.shortName}のシミュレーション演出" data-profile="${experienceProfile.key}" data-machine-type="${machine.type}" data-ui="arcade" data-game-mode="${gameExperienceMode}" hidden>
        <div class="machine-experience-head"><div class="machine-experience-ident"><span id="machineExperienceStep">STEP 1 / 5</span><strong>${machine.shortName}</strong></div><div><button type="button" id="machineExperienceSound" aria-pressed="${experienceSoundEnabled}">${experienceSoundEnabled ? "音ON" : "音OFF"}</button><button type="button" id="machineExperienceSkip">スキップ</button><button type="button" id="machineExperienceClose" aria-label="ゲーム画面を閉じる">×</button></div></div>
        <div class="machine-experience-hud"><div><span>${machine.sim.kind === "pachinko" ? "回転" : "ゲーム"}</span><strong id="machineExperienceCurrent">0${machine.sim.kind === "pachinko" ? "回転" : "G"}</strong></div><div><span>投資</span><strong id="machineExperienceInvestment">0円</strong></div><div><span id="machineExperienceRewardLabel">${machine.sim.kind === "juggler" ? "差枚" : machine.type === "slot" ? "獲得" : "実獲得"}</span><strong id="machineExperienceReward">0${machine.type === "slot" ? "枚" : "玉"}</strong></div></div>
        <div class="machine-experience-screen" id="machineExperienceScreen"><div class="machine-experience-art" aria-hidden="true"><span>${machine.shortName}</span></div><span id="machineExperiencePhase">${experienceProfile.system}</span><strong id="machineExperienceTitle">抽選中</strong><b id="machineExperienceValue">0</b><p id="machineExperienceMessage">結果を抽選しています</p><div class="machine-slot-at-status" id="machineSlotAtStatus" hidden><span>AT STATUS</span><strong id="machineSlotRemaining">消化 0G</strong><b id="machineSlotAddOn">上乗せ +0枚</b><small id="machineSlotTotal">累計 0枚</small></div><div class="machine-expectation"><div><span id="machineExperienceCue">${experienceProfile.cue}</span><strong><small>演出期待度</small><b id="machineExperienceChance">抽選中</b></strong></div><div class="machine-expectation-track" role="progressbar" aria-label="演出期待度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="machineExperienceChanceBar"></i></div><small>シミュレーション上の抽選率目安</small></div></div>
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
    const triggerSuccess = Number.isFinite(publishedEntry) && publishedEntry >= 0
      ? Math.min(0.98, publishedEntry)
      : hasPublishedSettingRates && Number(publishedSetting?.main) > 0
        ? Math.min(0.98, Math.max(0.01, triggerRate / mainRate))
        : Math.min(0.98, sim.triggerSuccess + profile.entry);
    const specialChance = Number(publishedSetting?.special) >= 0
      ? Math.min(0.98, Number(publishedSetting.special))
      : hasPublishedSettingRates ? sim.specialChance : Math.min(0.98, sim.specialChance + profile.special);
    const upperChance = Number(publishedSetting?.upper) >= 0
      ? Math.min(0.98, Number(publishedSetting.upper))
      : hasPublishedSettingRates ? sim.upperChance : Math.min(0.98, sim.upperChance + profile.upper);
    const settingModelLabel = hasPublishedTriggerRate && hasPublishedMainRate
      ? "公開設定別値（CZ・初当り）"
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
    let entered = Math.random() < triggerSuccess;
    let upper = false;
    let addOnCount = 0;
    let addOnTotal = 0;
    let upperLoops = 0;
    let upperPayoutTotal = 0;
    let atGamesTotal = 0;
    let karakuriJudgeAttempts = 0;
    let karakuriJudgeSuccesses = 0;
    let karakuriUpperRoute = "";
    if (!entered) {
      flow.push(`${sim.mainLabel}非突入`);
    } else {
      let basePayout = randomInt(sim.normalMin, sim.normalMax);
      const pureIncreaseText = machine.specs?.find(([label]) => /純増/.test(label))?.[1] || "";
      const publishedPureIncrease = Number.parseFloat(String(pureIncreaseText).match(/[\d.]+/)?.[0] || "");
      const atPureIncrease = Math.max(1, Number(sim.atPureIncrease) || publishedPureIncrease || 4);
      const baseAtGames = Math.max(20, Math.min(300, Math.round(basePayout / atPureIncrease)));
      payout = basePayout;
      flow.push(`${sim.mainLabel}突入`);
      let rushSetCount = 1;
      if (sim.setPushFlow) {
        while (rushSetCount < 3 && Math.random() < (sim.mainSetContinue || 0.75)) rushSetCount += 1;
        const setGames = Array.from({ length: rushSetCount }, (_, index) => weighted(
          index === 0 && Array.isArray(sim.firstRushSetGames)
            ? sim.firstRushSetGames
            : sim.rushSetGames || [[10, 1]]
        ));
        let distributedPayout = 0;
        setGames.forEach((games, index) => {
          const award = Math.max(0, Math.min(
            slotAwardForGames(games, atPureIncrease, sim.atPayoutVariance),
            SLOT_COMPLETE_LIMIT - distributedPayout
          ));
          distributedPayout += award;
          atGamesTotal += games;
          atEvents.push({ kind: "rush-set", label: sim.mainLabel, games, award, cumulative: distributedPayout, set: index + 1, setCount: rushSetCount });
        });
        basePayout = distributedPayout;
        payout = distributedPayout;
        flow.push(`${sim.mainLabel} ${rushSetCount}セット`);
      } else {
        atGamesTotal += baseAtGames;
        atEvents.push({ kind: "at-start", label: sim.mainLabel, games: baseAtGames, award: basePayout, cumulative: payout });
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
        if (!upper && karakuriJudgeSuccesses >= 3 && payout < SLOT_COMPLETE_LIMIT) {
          const fateSuccess = Math.random() < (sim.fateSuccess || sim.upperSuccess);
          karakuriUpperRoute = "運命の一劇";
          atEvents.push({ kind: "karakuri-upper-challenge", label: sim.upperChallenge, route: "fate", games: 4, chance: (sim.fateSuccess || sim.upperSuccess) * 100, success: fateSuccess, award: 0, cumulative: payout });
          flow.push(`${sim.upperChallenge} ${fateSuccess ? "成功" : "失敗"}`);
          upper = fateSuccess;
        }
        if (upper) {
          do {
            const award = Math.max(0, Math.min(sim.upperPayout, SLOT_COMPLETE_LIMIT - payout));
            if (!award) break;
            upperLoops += 1;
            const upperGames = randomInt(24, 72);
            payout += award;
            upperPayoutTotal += award;
            atGamesTotal += upperGames;
            atEvents.push({ kind: "upper", label: sim.upperLabel, games: upperGames, award, cumulative: payout, set: upperLoops });
          } while (upperLoops < 100 && payout < SLOT_COMPLETE_LIMIT && Math.random() < sim.upperContinue);
          flow.push(`${karakuriUpperRoute}突破 → ${sim.upperLabel} ${upperLoops}セット・+${yen.format(upperPayoutTotal)}枚`);
        }
      } else {
        // Keep the published overall special-zone chance while allowing rare multi-hit runs.
        const specialChecks = Math.max(1, Math.min(3, Math.ceil(payout / 500)));
        const perCheckChance = 1 - Math.pow(1 - specialChance, 1 / specialChecks);
        for (let check = 0; check < specialChecks && payout < SLOT_COMPLETE_LIMIT; check += 1) {
          if (Math.random() >= perCheckChance) continue;
          const requestedAdd = randomInt(sim.specialMin, sim.specialMax);
          const add = Math.max(0, Math.min(requestedAdd, SLOT_COMPLETE_LIMIT - payout));
          if (!add) break;
          const gameAdd = Math.max(10, Math.min(200, Math.round(add / 100) * 10));
          const eventGames = randomInt(8, 38);
          payout += add;
          addOnCount += 1;
          addOnTotal += add;
          atGamesTotal += eventGames + gameAdd;
          atEvents.push({ kind: "special", label: sim.specialLabel, trigger: "レア役成立", games: eventGames, gameAdd, award: add, cumulative: payout, number: addOnCount });
          flow.push(`レア役 → ${sim.specialLabel} +${add}枚（+${gameAdd}G）`);
        }
        if (payout < SLOT_COMPLETE_LIMIT && Math.random() < upperChance) {
          flow.push(sim.upperChallenge);
          atEvents.push({ kind: "upper-challenge", label: sim.upperChallenge, games: randomInt(18, 48), award: 0, cumulative: payout });
          upper = Math.random() < sim.upperSuccess;
          if (upper) {
            do {
              const upperGames = Array.isArray(sim.upperSetGames) ? weighted(sim.upperSetGames) : randomInt(24, 72);
              const requestedAward = sim.setPushFlow
                ? slotAwardForGames(upperGames, atPureIncrease, sim.atPayoutVariance)
                : sim.upperPayout;
              const award = Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout));
              if (!award) break;
              upperLoops += 1;
              payout += award;
              upperPayoutTotal += award;
              atGamesTotal += upperGames;
              atEvents.push({ kind: "upper", label: sim.upperLabel, games: upperGames, award, cumulative: payout, set: upperLoops });
            } while (upperLoops < 100 && payout < SLOT_COMPLETE_LIMIT && Math.random() < sim.upperContinue);
            flow.push(`${sim.upperLabel} ${upperLoops}セット・+${yen.format(upperPayoutTotal)}枚`);
          } else flow.push(`${sim.upperChallenge}失敗`);
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
    const resultLabel = complete ? "コンプリート" : upper ? sim.upperLabel : entered ? sim.mainLabel : `${sim.triggerLabel}失敗`;
    const atGameTimeline = atEvents.map(event => Math.max(1, Number(event.games) || 1));
    const settingRateStats = [[`設定${setting}の${sim.triggerLabel}`, `約1/${triggerRate.toFixed(1)}`]];
    if (sim.mainLabel !== sim.triggerLabel || Math.abs(mainRate - triggerRate) >= 0.05) {
      const mainRateLabel = sim.mainRateLabel || (machine.initialHitLabel ? "ボーナス初当り" : sim.mainLabel);
      settingRateStats.push([`設定${setting}の${mainRateLabel}`, `約1/${mainRate.toFixed(1)}`]);
    }
    const karakuriStats = sim.karakuriJudgeFlow ? [["激情ジャッジ", `${karakuriJudgeAttempts}回中 ${karakuriJudgeSuccesses}回成功`], ["上位ジャッジ", karakuriUpperRoute || "権利未獲得"]] : [];
    const atStats = entered ? [["AT消化モデル", `${yen.format(atGamesTotal)}G相当`], ...karakuriStats, ["上乗せ結果", addOnCount ? `${addOnCount}回・+${yen.format(addOnTotal)}枚` : "上乗せなし"], ["特化ゾーン", addOnCount ? `${sim.specialLabel} ${addOnCount}回` : "非当選"], ["上位AT", upper ? `${sim.upperLabel} ${upperLoops}セット` : "非到達"]] : [];
    const stats = [["今回の設定", `設定${setting}`], ["設定差モデル", settingModelLabel], ["今回のゲーム数", `${yen.format(games)}G`], ...settingRateStats, ["現金投資目安", `${yen.format(investment)}円`], ...atStats, ["獲得枚数", `${yen.format(payout)}枚`], ["換金目安", `${yen.format(exchangeValue)}円`], ["差枚目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`], ["収支目安", `${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円`], ["利用レート", `${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換`], ["コイン単価", `${coinUnit.toFixed(1)}円・${riskLabel(coinUnit)}`], ["単価換算の台売上指標", `${yen.format(salesIndex)}円`]];
    if (complete) stats.unshift(["到達状態", "コンプリート"]);
    return { title: `設定${setting}｜${complete ? "コンプリート" : upper ? `${sim.upperLabel}到達` : entered ? `${sim.mainLabel}終了` : `${sim.triggerLabel}失敗`}`, summary: complete ? `今回の設定は設定${setting}。${games}Gで${sim.triggerLabel}、獲得枚数が${yen.format(SLOT_COMPLETE_LIMIT)}枚に到達し、コンプリートしました。` : `今回の設定は設定${setting}。${games}Gで${sim.triggerLabel}。${entered ? `${payout}枚を獲得しました。上乗せ${addOnCount}回・${upper ? `${sim.upperLabel} ${upperLoops}セット。` : "上位AT非到達。"}` : `${sim.mainLabel}には届きませんでした。`}`, stats, flow: [`設定${setting}`, ...flow], share: `${machine.shortName}｜設定${setting}｜${yen.format(games)}G｜投資${yen.format(investment)}円｜${resultLabel}｜上乗せ${addOnCount}回｜${yen.format(payout)}枚｜換金${yen.format(exchangeValue)}円｜収支${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円｜${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換｜コイン単価${coinUnit.toFixed(1)}円`, setting, score: Math.round(diff), rankScore, rankInvestment, scoreKind: "coins", balanceYen, exchangeValue, investment, payout, attempts: games, complete, settingModel: settingModelLabel, experience: { kind: "slot", setting, attempts: games, unit: "G", hitLabel: sim.triggerLabel, hitChance: 100 / triggerRate, entered, entryChance: triggerSuccess * 100, mainLabel: sim.mainLabel, mainSetContinueChance: (sim.mainSetContinue || 0) * 100, setPushFlow: Boolean(sim.setPushFlow), karakuriJudgeFlow: Boolean(sim.karakuriJudgeFlow), karakuriJudgeAttempts, karakuriJudgeSuccesses, karakuriUpperRoute, specialLabel: sim.specialLabel, specialChance: specialChance * 100, addOnCount, addOnTotal, atGamesTotal, upperRouteChance: upperChance * 100, upperSuccessChance: sim.upperSuccess * 100, upperContinueChance: sim.upperContinue * 100, upperChallenge: sim.upperChallenge || "", upper, upperLabel: sim.upperLabel || "", upperLoops, complete, payout, payoutUnit: "枚", atEvents, atGameTimeline, flow: [...flow] } };
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

  function setSlotAtStatus({ visible = false, games = 0, addOn = 0, total = 0 } = {}) {
    const status = document.getElementById("machineSlotAtStatus");
    if (!status) return;
    status.hidden = !visible;
    if (!visible) return;
    document.getElementById("machineSlotRemaining").textContent = `消化 ${yen.format(Math.max(0, Math.round(games)))}G`;
    document.getElementById("machineSlotAddOn").textContent = `上乗せ +${yen.format(Math.max(0, Math.round(addOn)))}枚`;
    document.getElementById("machineSlotTotal").textContent = `累計 ${yen.format(Math.max(0, Math.round(total)))}枚`;
  }

  function waitForExperienceAction(label, autoDelay = 4500, variant = "normal") {
    if (experienceSkipped) return Promise.resolve();
    const button = document.getElementById("machineExperiencePush");
    const experience = document.getElementById("machineExperience");
    button.innerHTML = `<span>${label}</span><small>タップ / 自動で結果表示</small>`;
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

  async function animateExperienceCounter(total, unit, phase, title, message, expectancy, cue, runId) {
    const countTo = Math.max(1, Math.round(Number(total) || 1));
    setExperienceStage(3, phase, title, `0${unit}`, message, "normal", expectancy, cue);
    for (const progress of [.08, .2, .36, .55, .73, .88, 1]) {
      if (runId !== experienceRunId || experienceSkipped) return false;
      const current = Math.max(1, Math.round(countTo * progress));
      document.getElementById("machineExperienceValue").textContent = `${yen.format(current)}${unit}`;
      document.getElementById("machineExperienceCurrent").textContent = `${yen.format(current)}${unit}`;
      document.getElementById("machineExperienceMessage").textContent = `${yen.format(current)}${unit} / ${message}`;
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
    setExperienceStage(1, "CHANCE ZONE", data.hitLabel, `${yen.format(data.attempts)}G`, `${data.mainLabel}突入をかけたジャッジへ`, "hit", 100, experienceProfile.cue);
    await waitForExperience(780);
    setExperienceStage(2, "AT JUDGE", `${data.mainLabel}突入ジャッジ`, "3", "AT当落を抽選中", "judge", data.entryChance, `${data.mainLabel}突破率`);
    for (const count of [2, 1]) {
      await waitForExperience(250);
      if (runId !== experienceRunId || experienceSkipped) break;
      document.getElementById("machineExperienceValue").textContent = String(count);
    }
    await waitForExperience(300);
    if (runId !== experienceRunId) return;
    setExperienceStage(2, "AT JUDGE", "ボタンを押せ", "PUSH", `${data.mainLabel}の当落を決めます`, "judge", data.entryChance, `${data.mainLabel}突破率`);
    await waitForExperienceAction("PUSH");
    if (runId !== experienceRunId) return;
    setExperienceStage(2, "AT JUDGE", data.entered ? `${data.mainLabel} 突入` : `${data.mainLabel} 非突入`, data.entered ? "突破成功" : "通常へ", data.entered ? "特化ゾーン・上位抽選へ" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, "AT判定結果");
    setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(data.entered ? 0 : data.payout)}枚`);
    await waitForExperience(720);
    if (data.entered) {
      const sourceEvents = Array.isArray(data.atEvents) && data.atEvents.length
        ? data.atEvents
        : [{ kind: "at-start", label: data.mainLabel, games: data.atGameTimeline?.[0] || 40, award: data.payout, cumulative: data.payout }];
      const setPushFlow = Boolean(data.setPushFlow);
      const karakuriJudgeFlow = Boolean(data.karakuriJudgeFlow);
      const normalSetCount = sourceEvents.filter(event => event.kind === "rush-set").length;
      const hadUpperChallenge = sourceEvents.some(event => event.kind === "upper-challenge");
      let route = [...sourceEvents];
      if (!setPushFlow && !karakuriJudgeFlow && route.length > 10) {
        const visibleEvents = route.slice(0, 7);
        const remainingEvents = route.slice(7);
        const previousTotal = Number(visibleEvents[visibleEvents.length - 1]?.cumulative) || 0;
        const finalTotal = Number(route[route.length - 1]?.cumulative) || data.payout;
        route = [...visibleEvents, { kind: "summary", label: `残り${remainingEvents.length}演出を高速消化`, games: remainingEvents.reduce((sum, event) => sum + (Number(event.games) || 0), 0), award: Math.max(0, finalTotal - previousTotal), cumulative: finalTotal }];
      }
      let consumedGames = 0;
      let runningAddOn = 0;
      setSlotAtStatus({ visible: true, games: 0, addOn: 0, total: 0 });
      for (let index = 0; index < route.length; index += 1) {
        if (runId !== experienceRunId || experienceSkipped) break;
        const event = route[index];
        const eventGames = Math.max(1, Number(event.games) || data.atGameTimeline?.[index] || 20);

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
          setSlotAtStatus({ visible: true, games: consumedGames, addOn: runningAddOn, total: event.cumulative });
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
          setSlotAtStatus({ visible: true, games: consumedGames, addOn: runningAddOn, total: event.cumulative });
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
          setExperienceStage(3, isChain ? "運命連鎖" : "運命の一劇", event.success ? "突破成功！" : "失敗", event.success ? "上位ATへ" : "通常AT終了", event.success ? "極限無双を経由して超からくりサーカスへ" : isChain ? "3回成功の権利があれば運命の一劇へ" : "最終結果へ進みます", event.success ? "hyper" : "end", event.success ? 100 : 0, `${event.label} 判定結果`);
          await waitForExperience(950);
          if (event.success) {
            setExperienceStage(3, "極限無双", "最上位上乗せ特化ゾーン", "平均 +850枚", `${data.upperLabel}の初期枚数を上乗せ`, "hyper", 100, "極限無双");
            await waitForExperience(1100);
          }
          continue;
        }

        if (event.kind === "upper-challenge") {
          const counterComplete = await animateExperienceCounter(eventGames, "G", "AT COUNT", `${data.mainLabel}消化中`, `${data.upperChallenge}の当落まで数字が進みます`, data.upperRouteChance, "上位ルート期待度", runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setSlotAtStatus({ visible: true, games: consumedGames, addOn: runningAddOn, total: event.cumulative });
          setExperienceStage(3, "UPPER JUDGE", `${data.upperLabel} 突入ジャッジ`, "PUSH", `${data.upperChallenge}の当落を開きます`, "judge", data.upperSuccessChance, `${data.upperLabel}突破率`);
          await waitForExperienceAction("上位PUSH");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "UPPER JUDGE", data.upper ? `${data.upperLabel} 突入` : `${data.upperChallenge} 失敗`, data.upper ? "突破成功" : "通常AT終了", data.upper ? "上位ATへ進みます" : "最終結果へ進みます", data.upper ? "hyper" : "end", data.upper ? 100 : 0, "上位AT判定結果");
          await waitForExperience(820);
          if (data.upper) {
            const upperPhase = setPushFlow ? "SUPER REVOLUTION RUSH" : "UPPER AT";
            const upperMessage = setPushFlow ? "赤・金モードでセット継続抽選へ" : "上位ATの継続抽選へ進みます";
            setExperienceStage(3, upperPhase, `${data.upperLabel} 突入！`, `${Math.round(data.upperContinueChance)}% LOOP`, upperMessage, "hyper", data.upperContinueChance, `${data.upperLabel}開始`);
            await waitForExperience(1100);
          }
          continue;
        }

        if (event.kind === "summary") {
          consumedGames = Number(data.atGamesTotal) || consumedGames + eventGames;
          runningAddOn = Number(data.addOnTotal) || runningAddOn;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, games: consumedGames, addOn: runningAddOn, total: event.cumulative });
          setExperienceStage(3, "HIGH SPEED AT", event.label, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚まで一気に表示`, data.upper ? "hyper" : "rush", 100, "高速消化結果");
          await waitForExperience(900);
          continue;
        }

        if (setPushFlow && event.kind === "upper") {
          setExperienceStage(3, "SUPER REVOLUTION SET", `${data.upperLabel} SET ${event.set}`, "PUSH", "上位継続とゲーム数振り分けを開きます", "judge", data.upperContinueChance, `${data.upperLabel} ${Math.round(data.upperContinueChance)}% LOOP`);
          await waitForExperienceAction(`超革命 SET ${event.set} PUSH`, 4500, "upper");
          if (runId !== experienceRunId) return;
          if (eventGames >= 100) {
            const bonusComplete = await animateValvrave100GameBonus({ upper: true, set: event.set }, runId);
            if (!bonusComplete) return;
          } else {
            setExperienceStage(3, "SUPER REVOLUTION RESULT", "上位継続成功！", `${yen.format(eventGames)}G`, `ゲーム数振り分けは ${yen.format(eventGames)}G`, "hyper", 100, `超革命 SET ${event.set} 振り分け結果`);
            await waitForExperience(950);
          }
        }
        const upperCounterPhase = setPushFlow ? "SUPER REVOLUTION RUSH" : karakuriJudgeFlow ? "超からくりサーカス" : "UPPER AT";
        const counterComplete = await animateExperienceCounter(eventGames, "G", event.kind === "upper" ? upperCounterPhase : "AT COUNT", event.kind === "upper" ? `${data.upperLabel} SET ${event.set}消化中` : `${data.mainLabel}消化中`, event.kind === "special" ? "レア役成立までゲーム数が進みます" : "次の出玉契機までゲーム数が進みます", event.kind === "upper" ? data.upperContinueChance : data.specialChance, event.kind === "upper" ? `${data.upperLabel}継続目安` : `${data.specialLabel || "上乗せ"}当選目安`, runId);
        if (!counterComplete) return;
        consumedGames += eventGames;

        if (event.kind === "special") {
          setExperienceStage(3, "RARE ROLE", event.trigger || "レア役成立", "PUSH", `${event.label}の上乗せ枚数を決めます`, "judge", data.specialChance, `${event.label}当選目安`);
          await waitForExperienceAction("上乗せPUSH", 4000, "gold");
          if (runId !== experienceRunId) return;
          consumedGames += Number(event.gameAdd) || 0;
          runningAddOn += Number(event.award) || 0;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, games: consumedGames, addOn: runningAddOn, total: event.cumulative });
          setExperienceStage(3, "ADD ON", event.label, `+${yen.format(event.gameAdd)}G / +${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚へ上乗せ`, "hit", 100, `${event.label} 結果`);
          await waitForExperience(1350);
          continue;
        }

        const isUpper = event.kind === "upper";
        setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
        setSlotAtStatus({ visible: true, games: consumedGames, addOn: runningAddOn, total: event.cumulative });
        const upperPhase = setPushFlow ? "SUPER REVOLUTION RUSH" : karakuriJudgeFlow ? "超からくりサーカス" : "UPPER AT";
        const upperTotalLabel = karakuriJudgeFlow ? "上位AT累計" : setPushFlow ? "超革命RUSH累計" : "上位AT累計";
        setExperienceStage(3, isUpper ? upperPhase : "AT MODE", isUpper ? `${event.label} SET ${event.set}` : `${event.label} START`, isUpper ? `${yen.format(eventGames)}G / +${yen.format(event.award)}枚` : `+${yen.format(event.award)}枚`, isUpper ? `${upperTotalLabel} ${yen.format(event.cumulative)}枚` : `基本獲得 ${yen.format(event.cumulative)}枚`, isUpper ? "hyper" : "rush", isUpper ? data.upperContinueChance : data.specialChance, isUpper ? `${data.upperLabel} ${Math.round(data.upperContinueChance)}% LOOP` : `${data.specialLabel || "上乗せ"}当選目安`);
        await waitForExperience(isUpper ? 900 : 700);
      }
      if (setPushFlow && !data.complete && data.upper) {
        const nextSet = Math.max(1, Number(data.upperLoops) + 1);
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
        setSlotAtStatus({ visible: true, games: Number(data.atGamesTotal) || consumedGames, addOn: Number(data.addOnTotal) || runningAddOn, total: data.payout });
        await waitForExperience(780);
      }
      setSlotAtStatus({ visible: true, games: Number(data.atGamesTotal) || consumedGames, addOn: Number(data.addOnTotal) || runningAddOn, total: data.payout });
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
