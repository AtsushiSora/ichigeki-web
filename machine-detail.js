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
    } else if (sim.okidokiGoldFlow) {
      items = [
        ["初当り", `約1/${sim.mainRate}`, "設定1のBONUS初当り"],
        ["BIG／REG", "約210／90枚", "70G／30G・純増約3.0枚/G"],
        ["天国ループ", "約75%", "BONUS後32G以内"],
        ["設定抽選", slotSettingLabel, "設定4は非搭載"]
      ];
      note = "BONUSごとに32Gを数え、天国・ドキドキ・超ドキドキ・保証・金ドキの内部ルートを結果へ残します。";
    } else if (sim.uminchuFlow) {
      items = [
        ["初当り", `約1/${sim.mainRate}`, "設定1のBONUS初当り"],
        ["BIG／REG", "約202／53枚", "BONUS種別を個別表示"],
        ["32G連", "10連でIREGUI", "8Gのストックゾーン"],
        ["設定抽選", slotSettingLabel, "設定3は非搭載"]
      ];
      note = "BONUS後32Gを毎回数え、10連後のIREGUIと獲得ストックを結果へ残します。";
    } else if (sim.darlingFranxxFlow) {
      items = [["CZ", `約1/${sim.triggerRate}`, "設定1のコネクトチャンス"], ["BONUS高確", "10G＋α", "BONUS約1/10.4"], ["比翼BEATS", "2〜4G", "継続約75〜94%"], ["高確中BONUS", "約60〜3000枚", "4種類を個別表示"]];
      note = "CZ、初当りBONUS、ボーナス高確、比翼BEATS、連れ出しを機種専用で記録します。";
    } else if (sim.toaruIndex2Flow) {
      items = [
        ["CZ", `約1/${sim.triggerRate}`, "設定1のCZ合算"],
        ["2種類のCZ", "約52%／約80%", "各10G"],
        ["幻想殺しRUSH", "初期40G以上", "純増約4.0枚/G"],
        ["上乗せ遊技", "20〜平均750G", "7段階の報酬"]
      ];
      note = "CZ、AT、バトル、キャラ別上乗せ、PLUS ACTION、フィアンマBATTLEを機種専用で記録します。";
    } else if (sim.magiaRecordFlow) {
      items = [
        ["初当りBONUS", `約1/${sim.triggerRate}`, "設定1のBONUS合算"],
        ["BIG BONUS", "AT期待度40%", "30G＋α・純増約2.6枚/G"],
        ["マギアアタック", "10G", "前半5G＋後半5G"],
        ["ストーリー", "全8種類", "コンプリートで上位濃厚"]
      ];
      note = "4種類のBONUS、マギアアタック、ストーリー、コネクト、エンブリオ・イブ覚醒を機種専用で記録します。";
    } else if (sim.azurLaneFlow) {
      items = [
        ["海戦BONUS", `約1/${sim.triggerRate}`, "設定1の初当り"],
        ["海戦ATTACK", "平均約100G", "最低50G・保障3G"],
        ["天城BATTLE", "約54%", "4陣営集結後の上位CZ"],
        ["上位AT", "約5.1枚/G", "期待枚数3500枚以上"]
      ];
      note = "海戦BONUS、海戦ATTACK、セイレーンバトル、集結BONUS、天城BATTLE、異次元性能SS RUSHを機種専用で記録します。";
    } else if (sim.bofuriFlow) {
      items = [
        ["初当りBONUS", `約1/${sim.mainRate}`, "設定1のボーナス初当り"],
        ["通常CZ", "約50%", "運営高確率"],
        ["防御状態", "約77〜94%", "初回CZ期待度88%以上"],
        ["最上位", "50G", "暴虐ZONE・期待枚数約3500枚"]
      ];
      note = "高確率ZONE、3種類のBONUS、防御状態Lv.0〜4、天使ZONE、暴虐ZONEを個別に記録します。";
    } else if (sim.aobutaFlow) {
      items = [
        ["初当りBONUS", `約1/${sim.mainRate}`, "設定2の青春BONUS"],
        ["完走型ST", "8G＋α", "1セット2G×4ヒロイン"],
        ["上位CZ", "約53%", "10G＋6G＋α"],
        ["上位ST", "約80%", "BONUS平均約640枚"]
      ];
      note = "青春BONUS、完走型STのVストック、ヒロイン別DREAM BURST、夢現JUDGEMENT、上位STを実機順に個別表示します。";
    } else if (sim.kanokariFlow) {
      items = [
        ["CZ", "約56%／約75%", "15G＋α／10G"],
        ["BONUS", "約70／150枚", "REG／かのかりBONUS"],
        ["1GレンCHANCE", "2G・約40%", "1G恋は成功濃厚"],
        ["66G引き戻し", "約25%／約58%", "通常／ユメカノモード"]
      ];
      note = "疑似BONUSでストックを集め、2Gの1GレンCHANCE、4回ごとのエピソード、66G引き戻し、DREAM TIMEまでを順番に記録します。";
    } else if (sim.lycorisFlow) {
      items = [
        ["初回RUSH", "20G＋α", "BONUS期待度約60%"],
        ["RUSH50", "50G＋ST10G", "BONUS約1/18・約1/12"],
        ["上位CZ", "約70%", "10G・全設定共通"],
        ["BONUS純増", "約8.4枚/G", "最低100枚"]
      ];
      note = "20Gから50G＋STへ昇格する流れ、4種類のBONUS、ポイント1000pt、上位CZ、リコリスラッシュWを個別に記録します。";
    } else if (sim.symphogearSeigiFlow) {
      items = [
        ["CZ突破", "約65%", "AXZバトル"],
        ["通常AT", "40G以上", "純増約2.8枚/G"],
        ["絶唱", "平均約100G", "5G＋α"],
        ["黄金AT", "約5.0枚/G", "絶唱バトル約60%"]
      ];
      note = "残りゲーム数、ギアVチャンスの装者獲得、キャラ別ギアVアタック、絶唱、上位ATと絶唱バトルを個別に記録します。";
    } else if (sim.sao2Flow) {
      items = [
        ["CZ突破", "約55%", "スコードロンバトル"],
        ["BoB", "150枚＋α", "純増約3.6枚/G"],
        ["上位CZ", "約50%", "デス・ガンバトル"],
        ["FULL DIVE", "約7.2枚/G", "上位AT純増"]
      ];
      note = "20G周期のスナイパーチャンスで最大3勝を目指し、ラストアタック、デス・ガンバトル、FULL DIVEまでを個別に記録します。";
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
    } else if (sim.okidokiGoldFlow) {
      charts.push(ratioChartMarkup(
        "BONUS MIX",
        "設定1基準のBONUS内訳",
        [["BIG", 1 / 175.3], ["REG", 1 / 368.7]],
        "BIG / REG",
        "設定1の公表BIG約1/175.3・REG約1/368.7から算出した全BONUSの構成比です。"
      ));
      charts.push(ratioChartMarkup(
        "HEAVEN LOOP",
        "天国モードの32G連",
        [["継続", sim.okidokiModeRates?.heaven], ["終了", 1 - sim.okidokiModeRates?.heaven]],
        "約75%",
        "天国モード滞在時の代表ループ率です。金ドキによる再連は別抽選です。"
      ));
      note = "BONUS内訳は設定1の公表確率から算出し、天国の継続割合とは別に表示しています。モード初回振り分けは非公表のため円グラフには含めていません。";
    } else if (sim.darlingFranxxFlow) {
      charts.push(ratioChartMarkup("CONNECT CHANCE", "コネクトチャンスの成功期待度", [["BONUS当選", 0.46], ["非当選", 0.54]], "約46%", "5GのST型CZからBONUSへ進む設定1の公表期待度です。"));
      charts.push(ratioChartMarkup("BEAT LEVEL", "比翼BEATS初回レベル", [["Lv.1", 0.784], ["Lv.2", 0.215], ["Lv.MAXX", 0.001]], "3段階", "初回比翼BEATSの公表レベル振り分けです。継続率は約75・88・94%です。"));
      note = "CZ期待度と比翼BEATSの初回レベルは別抽選です。BONUS種別など未公表部分は円グラフに含めていません。";
    } else if (sim.toaruIndex2Flow) {
      charts.push(ratioChartMarkup(
        "RAILGUN CHANCE",
        "レールガンチャンスのAT期待度",
        [["AT当選", 0.52], ["AT非当選", 0.48]],
        "約52%",
        "10Gのレールガンチャンスから幻想殺しRUSHへ進む公表期待度です。"
      ));
      charts.push(ratioChartMarkup(
        "ACCELERATOR CHANCE",
        "アクセラレータチャンスのAT期待度",
        [["AT当選", 0.80], ["AT非当選", 0.20]],
        "約80%",
        "10Gのアクセラレータチャンスから幻想殺しRUSHへ進む公表期待度です。"
      ));
      note = "2種類のCZ期待度は別々の公開値です。CZ選択率、バトル出現率・勝率、報酬選択率など未公表部分は円グラフに含めていません。";
    } else if (sim.magiaRecordFlow) {
      charts.push(ratioChartMarkup(
        "BIG BONUS",
        "BIG BONUS中のAT期待度",
        [["AT当選", 0.40], ["AT非当選", 0.60]],
        "40%",
        "30G＋αのBIG BONUSからマギアラッシュへ進む公表期待度です。"
      ));
      charts.push(ratioChartMarkup(
        "FIRST CYCLE",
        "AT初回周期の報酬内訳",
        [["ストーリー", 0.737], ["決戦神浜聖女", 0.252], ["マギアBONUS", 0.008], ["SPストーリー", 0.003]],
        "4種類",
        "AT開始後、1周期目の規定ゲーム数から報酬へ当選した場合の公表振り分けです。"
      ));
      note = "BIG BONUSのAT期待度とAT中の初回報酬振り分けは別の抽選です。BONUS種類の選択率など未公表部分は円グラフに含めていません。";
    } else if (sim.azurLaneFlow) {
      charts.push(ratioChartMarkup(
        "BLUE 7 BONUS",
        "青7 海戦BONUSのAT期待度",
        [["AT当選", 0.624], ["AT非当選", 0.376]],
        "約62.4%",
        "規定回数による当選を含む青7 海戦BONUSのAT期待度です。"
      ));
      charts.push(ratioChartMarkup(
        "AMAGI BATTLE",
        "天城BATTLE成功割合",
        [["上位AT突入", sim.azurAmagiChance], ["失敗", 1 - sim.azurAmagiChance]],
        "約54%",
        "4陣営集結後に挑戦する7Gの上位CZ成功期待度です。"
      ));
      note = "青7BONUSのAT期待度と天城BATTLE成功期待度は別の抽選です。白7BONUSや陣営参戦率など未公表の配分は円グラフに含めていません。";
    } else if (sim.bofuriFlow) {
      charts.push(ratioChartMarkup(
        "NORMAL CZ",
        "運営高確率のボーナス期待度",
        [["BONUS当選", 0.50], ["CZ終了", 0.50]],
        "約50%",
        "通常時の代表CZ『運営高確率』からボーナスへ進む割合です。"
      ));
      charts.push(ratioChartMarkup(
        "DEFENSE STATE",
        "Lv.4 極ロングのCZループ率",
        [["CZ当選", 0.94], ["防御状態終了", 0.06]],
        "約94%",
        "最高レベルLv.4滞在時のCZループ率です。Lv.0〜3は本文に約77・79・83・86%と掲載しています。"
      ));
      note = "通常CZ約50%と防御状態の約77〜94%は別の指標です。初当りボーナス後の初回CZ期待度は保障を含め88%以上です。";
    } else if (sim.aobutaFlow) {
      charts.push(ratioChartMarkup(
        "NORMAL ST",
        "青ブタJUDGE継続割合",
        [["継続", 0.60], ["終了", 0.40]],
        "約60%",
        "設定2の通常ST継続期待度です。STは4セット＋αを完走し、複数Vを取る場合があります。"
      ));
      charts.push(ratioChartMarkup(
        "MUGEN JUDGE",
        "夢現JUDGEMENT成功割合",
        [["成功", sim.aobutaUpperCzChance], ["失敗", 1 - sim.aobutaUpperCzChance]],
        "約53%",
        "10Gの前半＋6G以上の後半から上位STへ進む設定2の公表期待度です。"
      ));
      note = "通常ST約60%、上位CZ約53%、上位ST約80%は別の抽選です。V個数や翔子選択率など未公表部分は含めていません。";
    } else if (sim.kanokariFlow) {
      charts.push(ratioChartMarkup(
        "ONE GAME RENT",
        "1GレンCHANCE成功割合",
        [["BONUS当選", sim.kanokariRentChance], ["失敗", 1 - sim.kanokariRentChance]],
        "約40%",
        "1セット2Gの1GレンCHANCEから疑似BONUSへ進む公表期待度です。"
      ));
      charts.push(ratioChartMarkup(
        "YUMEKANO RETURN",
        "ユメカノモード引き戻し割合",
        [["BONUS引き戻し", sim.kanokariYumekanoChance], ["66G終了", 1 - sim.kanokariYumekanoChance]],
        "約58%",
        "BONUS終了後66Gのユメカノモードで疑似BONUSへ復帰する公表期待度です。"
      ));
      note = "1GレンCHANCE約40%とユメカノモード約58%は別々の抽選です。通常の66G引き戻しは約25%、1G恋は成功濃厚として扱います。";
    } else if (sim.lycorisFlow) {
      charts.push(ratioChartMarkup(
        "RUSH 20",
        "初回20GのBONUS当選割合",
        [["BONUS当選", 0.60], ["駆け抜け", 0.40]],
        "約60%",
        "リコリスラッシュ20からリコリスラッシュ50へ進む公表期待度です。"
      ));
      charts.push(ratioChartMarkup(
        "UPPER CZ",
        "リコイル オブ リコリス成功割合",
        [["成功", 0.70], ["失敗", 0.30]],
        "約70%",
        "1000pt獲得後の10G上位CZからリコリスラッシュWへ進む公表期待度です。"
      ));
      note = "初回RUSH約60%と上位CZ約70%は別々の抽選です。BONUS種類の詳細振り分けとポイント獲得量は非公表のため円グラフには含めていません。";
    } else if (sim.symphogearSeigiFlow) {
      charts.push(ratioChartMarkup(
        "CZ ENTRY",
        "AXZバトル突破割合",
        [["突破", 0.65], ["非突破", 0.35]],
        "約65%",
        "AXZバトルからAXZラッシュへ進む公表期待度です。"
      ));
      charts.push(ratioChartMarkup(
        "UPPER LOOP",
        "絶唱バトル勝利割合",
        [["勝利", 0.60], ["敗北", 0.40]],
        "約60%",
        "AXZラッシュ黄金終了後に絶唱を経由して上位へ復帰する公表期待度です。"
      ));
      note = "AXZバトル約65%と絶唱バトル約60%は別々の抽選です。ギアVチャンスの装者別獲得率など非公表部分は円グラフに含めていません。";
    } else if (sim.sao2Flow) {
      charts.push(ratioChartMarkup(
        "CZ ENTRY",
        "スコードロンバトル突破割合",
        [["突破", 0.55], ["非突破", 0.45]],
        "約55%",
        "CZからBullet of Bulletsへ進む公表期待度です。"
      ));
      charts.push(ratioChartMarkup(
        "UPPER JUDGE",
        "デス・ガンバトル勝利割合",
        [["勝利", sim.sao2DeathGunChance], ["敗北", 1 - sim.sao2DeathGunChance]],
        "約50%",
        "4Gのバトル＋最終1GでFULL DIVEを目指す公表期待度です。"
      ));
      note = "CZ約55%と上位CZ約50%は別々の抽選です。スナイパーチャンス相手別勝率と絶剣振り分けは非公表のため円グラフには含めていません。";
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
    if (sim.darlingFranxxFlow) {
      return `<section class="machine-cz-guide" id="cz-game" aria-labelledby="machine-cz-title"><div class="machine-cz-head"><span>CZ TO BONUS HIGH</span><h3 id="machine-cz-title">${machine.shortName}のゲーム性</h3><p>CZから疑似BONUSを取り、10G＋αのボーナス高確と比翼BEATSで連チャンを伸ばします。</p></div><div class="machine-cz-flow" aria-label="${escapeHtml(`${machine.shortName}のゲームフロー`)}"><div><span>01</span><strong>2種類のCZ</strong><small>5G約46%／10G約69%</small></div><i aria-hidden="true">›</i><div><span>02</span><strong>初当りBONUS</strong><small>REG・DIF・EP</small></div><i aria-hidden="true">›</i><div><span>03</span><strong>BONUS高確</strong><small>10G＋α・約1/10.4</small></div><i aria-hidden="true">›</i><div><span>04</span><strong>比翼BEATS</strong><small>2〜4G・約75〜94%</small></div></div><div class="machine-cz-upper"><span>強化ルート</span><strong>Beat Lv.MAXX</strong><i aria-hidden="true">→</i><strong>CLIMAXX</strong><small>高確G数30Gで上乗せをBONUSへ変換</small></div><div class="machine-cz-detail-grid"><article><span>CHANCE ZONE</span><h4>コネクト／ココロ</h4><p>5G約46%と10G約69%。最後のPUSHでBONUS当落を開きます。</p></article><article><span>INITIAL BONUS</span><h4>3種類の初当り</h4><p>REG約40枚、ダーリンBONUS約100枚、エピソード約200枚。REGは約22%で昇格します。</p></article><article><span>BONUS HIGH</span><h4>10G＋α・約1/10.4</h4><p>残りゲーム数を減らし、小役成立時に即PUSHでBONUS種類を開きます。</p></article><article><span>HIYOKU BEATS</span><h4>レベル別ST</h4><p>Lv.1は2G約75%、Lv.2は3G約88%、MAXXは4G約94%。上乗せでSTを再セットします。</p></article></div><p class="machine-cz-note">CZ選択率、BONUS種別、連れ出し発生率など未公表部分は、公開性能を崩さない体験用代表値です。</p></section>`;
    }
    if (sim.toaruIndex2Flow) {
      return `<section class="machine-cz-guide" id="cz-game" aria-labelledby="machine-cz-title"><div class="machine-cz-head"><span>CZ TO IMAGINE BREAKER RUSH</span><h3 id="machine-cz-title">${machine.shortName}のゲーム性</h3><p>2種類の10G CZからATへ進み、バトル勝利で7段階の上乗せ報酬を開きます。</p></div><div class="machine-cz-flow" aria-label="${escapeHtml(`${machine.shortName}のゲームフロー`)}"><div><span>01</span><strong>通常時</strong><small>幻想リプレイ約1/99</small></div><i aria-hidden="true">›</i><div><span>02</span><strong>2種類のCZ</strong><small>10G・約52%／約80%</small></div><i aria-hidden="true">›</i><div><span>03</span><strong>幻想殺しRUSH</strong><small>初期40G以上</small></div><i aria-hidden="true">›</i><div><span>04</span><strong>上乗せ遊技</strong><small>7段階のゲーム数報酬</small></div></div><div class="machine-cz-upper"><span>引き戻しルート</span><strong>フィアンマBATTLE</strong><i aria-hidden="true">→</i><strong>幻想殺しRUSH再突入</strong><small>成功後は上乗せ遊技を経由</small></div><div class="machine-cz-detail-grid"><article><span>CHANCE ZONE</span><h4>レールガン／アクセラレータ</h4><p>どちらも10G。AT期待度はレールガン約52%、アクセラレータ約80%。最後のPUSHで当落を開きます。</p></article><article><span>IMAGINE BREAKER RUSH</span><h4>初期40G以上・純増約4.0枚/G</h4><p>残りゲーム数を減らしながら、直乗せ、赤7ストック、指定ゲーム数のバトルを抽選します。</p></article><article><span>CHARGE GAME</span><h4>とある運命の上乗遊技</h4><p>＋20Gから五和、神裂、御坂、一方通行、竜王の顎、自動書記まで、PUSHで報酬を開きます。</p></article><article><span>PLUS ACTION</span><h4>3種類のゲーム数上乗せ</h4><p>サポーター平均約30G、ヒロインズ約60G、イマジンブレイカー約310Gを通常上乗せと分けて表示します。</p></article></div><p class="machine-cz-note">CZ選択率、バトル出現率・勝率、報酬振り分けなど未公表部分は、公開性能を崩さない体験用代表値です。</p></section>`;
    }
    if (sim.magiaRecordFlow) {
      return `<section class="machine-cz-guide" id="cz-game" aria-labelledby="machine-cz-title"><div class="machine-cz-head"><span>BONUS TO EMBRYO EVE</span><h3 id="machine-cz-title">${machine.shortName}のゲーム性</h3><p>4種類のBONUSでATを目指し、マギアアタックの初期ゲーム数、ストーリー全8種類、コネクト上乗せを重ねます。</p></div><div class="machine-cz-flow" aria-label="${escapeHtml(`${machine.shortName}のゲームフロー`)}"><div><span>01</span><strong>初当りBONUS</strong><small>BIG・みたま・EP・アリナ</small></div><i aria-hidden="true">›</i><div><span>02</span><strong>マギアアタック</strong><small>前半5G＋後半5G</small></div><i aria-hidden="true">›</i><div><span>03</span><strong>マギアラッシュ</strong><small>純増約2.6枚/G</small></div><i aria-hidden="true">›</i><div><span>04</span><strong>ストーリー</strong><small>全8種類を集める</small></div></div><div class="machine-cz-upper"><span>上位ルート</span><strong>覚醒準備32G</strong><i aria-hidden="true">→</i><strong>エンブリオ・イブ覚醒</strong><small>イブアタック10G＋αで初期G数決定</small></div><div class="machine-cz-detail-grid"><article><span>BONUS</span><h4>4種類の初当り</h4><p>BIGは30G＋α・AT期待度40%。みたまはベルナビ8回＋1G、エピソードとアリナミュージアムはAT濃厚です。</p></article><article><span>INITIAL GAMES</span><h4>マギアアタック</h4><p>前半5Gでカードを集め、後半5Gで5枚分の上乗せを決定。合計初期ゲーム数をPUSHで開きます。</p></article><article><span>STORY / CONNECT</span><h4>報酬とゲーム数上乗せ</h4><p>ストーリーは20G・カウント＋1、SPは30G・＋2。コネクト成功後はキャラ別最低ゲーム数を基準に上乗せします。</p></article><article><span>UPPER</span><h4>エンブリオ・イブ覚醒</h4><p>全8話コンプリート後にエンディング、32Gの準備、10G＋αのイブアタックへ。上位中のストーリーはコネクトチャンスが必ず発生します。</p></article></div><p class="machine-cz-note">BONUS種類、AT報酬、コネクトキャラなどの非公開配分は、公開性能を崩さない体験用代表値です。</p></section>`;
    }
    if (sim.azurLaneFlow) {
      return `<section class="machine-cz-guide" id="cz-game" aria-labelledby="machine-cz-title"><div class="machine-cz-head"><span>BONUS TO DIMENSIONAL RUSH</span><h3 id="machine-cz-title">${machine.shortName}のゲーム性</h3><p>海戦BONUSでATを勝ち取り、ゲーム数上乗せと陣営参戦を重ねて4陣営集結・上位ATを目指します。</p></div><div class="machine-cz-flow" aria-label="${escapeHtml(`${machine.shortName}のゲームフロー`)}"><div><span>01</span><strong>海戦BONUS</strong><small>ベルナビ10回＋告知10G</small></div><i aria-hidden="true">›</i><div><span>02</span><strong>海戦ATTACK</strong><small>最低50G・平均約100G</small></div><i aria-hidden="true">›</i><div><span>03</span><strong>通常AT</strong><small>純増約2.5枚/G</small></div><i aria-hidden="true">›</i><div><span>04</span><strong>4陣営集結</strong><small>天城BATTLEへ</small></div></div><div class="machine-cz-upper"><span>上位ルート</span><strong>天城BATTLE</strong><i aria-hidden="true">→</i><strong>異次元性能SS RUSH</strong><small>7G・成功期待度約54%</small></div><div class="machine-cz-detail-grid"><article><span>BONUS</span><h4>白7／青7 海戦BONUS</h4><p>平均約100枚。青7はAT期待度約62.4%。最後のPUSHでAT当落を開きます。</p></article><article><span>INITIAL GAMES</span><h4>海戦ATTACK</h4><p>3G保障で毎ゲーム10G以上を上乗せ。最低50G・平均約100Gの初期ゲーム数を決定します。</p></article><article><span>SIREN BATTLE</span><h4>5〜8Gの報酬バトル</h4><p>敵ごとの勝率でPUSH判定。勝利時はゲーム数上乗せ、集結BONUS、覚醒エンタープライズなどを獲得します。</p></article><article><span>UPPER</span><h4>4陣営から異次元ループ</h4><p>天城BATTLE突破後は純増約5.1枚/G。常に4陣営参戦し、終了後も天城BATTLEで上位復帰を狙います。</p></article></div><p class="machine-cz-note">陣営参戦率や報酬配分など未公表部分は、公開性能を崩さない体験用代表値です。</p></section>`;
    }
    if (sim.bofuriFlow) {
      return `<section class="machine-cz-guide" id="cz-game" aria-labelledby="machine-cz-title"><div class="machine-cz-head"><span>NORMAL TO BONUS LOOP</span><h3 id="machine-cz-title">${machine.shortName}の初当りゲーム性</h3><p>レア役・ヒドラ目・規定ゲーム数から高確率ZONEへ進み、BONUS後の防御状態で連チャンを目指します。</p></div><div class="machine-cz-flow" aria-label="${escapeHtml(`${machine.shortName}のゲームフロー`)}"><div><span>01</span><strong>通常時</strong><small>レア役・ヒドラ目・規定G</small></div><i aria-hidden="true">›</i><div><span>02</span><strong>高確率ZONE</strong><small>運営・機械神・極</small></div><i aria-hidden="true">›</i><div><span>03</span><strong>BONUS</strong><small>REG・BIG・EP</small></div><i aria-hidden="true">›</i><div><span>04</span><strong>防御状態</strong><small>Lv.0〜4・約77〜94%</small></div></div><div class="machine-cz-upper"><span>特化ルート</span><strong>天使ZONE</strong><i aria-hidden="true">→</i><strong>暴虐ZONE</strong><small>30G／50G</small></div><div class="machine-cz-detail-grid"><article><span>CHANCE ZONE</span><h4>3種類の高確率ZONE</h4><p>運営高確率はボーナス期待度約50%。機械神高確率と極・高確率は成功でエピソードBONUS濃厚です。</p></article><article><span>BONUS</span><h4>REG・BIG・EP</h4><p>REG約100枚、BIG約150枚または約250枚、エピソードBONUS約250枚。消化中は防御力ポイントとスキルを抽選します。</p></article><article><span>DEFENSE STATE</span><h4>初回88%以上</h4><p>ボーナス後は必ず突入。CZ出現約1/11.9、レベル別のCZループは約77・79・83・86・94%です。</p></article><article><span>SPECIAL</span><h4>天使／暴虐ZONE</h4><p>天使ZONEは30G・ボーナス期待度約70%。暴虐ZONEは50G・期待枚数約3500枚の最上位ルートです。</p></article></div><p class="machine-cz-note">CZ種類・防御レベル・エピソード分岐の非公開配分は、公開性能を壊さない体験用代表値です。</p></section>`;
    }
    if (sim.aobutaFlow) {
      return `<section class="machine-cz-guide" id="cz-game" aria-labelledby="machine-cz-title"><div class="machine-cz-head"><span>NORMAL TO ST FLOW</span><h3 id="machine-cz-title">${machine.shortName}の初当りゲーム性</h3><p>思春期ポイント・規定ゲーム数・CZなどをまとめ、公開BONUS初当りから完走型STと上位までの流れを整理します。</p></div><div class="machine-cz-flow" aria-label="${escapeHtml(`${machine.shortName}のゲームフロー`)}"><div><span>01</span><strong>通常時</strong><small>ポイント・規定G・アオハル</small></div><i aria-hidden="true">›</i><div><span>02</span><strong>CZ・直撃</strong><small>エピソードチャンスなど</small></div><i aria-hidden="true">›</i><div><span>03</span><strong>青春BONUS</strong><small>設定2 約1/${sim.mainRate}</small></div><i aria-hidden="true">›</i><div><span>04</span><strong>完走型ST</strong><small>4セット＋α</small></div></div><div class="machine-cz-upper"><span>その先</span><strong>${sim.upperChallenge}</strong><i aria-hidden="true">→</i><strong>${sim.upperLabel}</strong><small>10G＋6G＋α・成功期待度約53%</small></div><div class="machine-cz-detail-grid"><article><span>ROLE</span><h4>通常時の入口</h4><p>思春期ポイントは毎ゲーム1pt以上を獲得し、100ptごとにCZ前兆が発生。規定ゲーム数やアオハルチャンスからのBONUS直撃もあります。</p></article><article><span>CHANCE ZONE</span><h4>エピソードチャンス</h4><p>前後半の2部構成で、ヒロインごとに対応役と期待度が変化します。シミュレーターでは設定別青春BONUS初当りへ合算しています。</p></article><article><span>BONUS / ST</span><h4>初当り後は必ずST</h4><p>青春BONUS後は青ブタJUDGEへ必ず突入。1セット2G・4セット＋αを完走し、獲得したVをすべてDREAM BURSTへ進めます。</p></article><article><span>UPPER</span><h4>夢現JUDGEMENT</h4><p>翔子成功時などに10G＋6G＋αの上位CZへ。設定2で約53%成功後は300枚のエピソードBONUSと約80%の上位STへ進みます。</p></article></div><p class="machine-cz-note">通常時の全ポイント・CZキャラ・小役抽選はBONUS初当り確率へ集約し、ST以降を機種専用進行で表示します。</p></section>`;
    }
    const isDirectEntry = Number(sim.triggerSuccess) >= .995 || sim.triggerLabel === sim.mainLabel;
    const isBasiliskBc = Boolean(sim.basiliskTenzenFlow);
    const isOkidokiBonus = Boolean(sim.okidokiGoldFlow);
    const triggerRate = Number(sim.triggerRate) || Number(sim.mainRate) || 0;
    const mainRate = Number(sim.mainRate) || triggerRate;
    const successRate = Math.max(0, Math.min(1, Number(sim.triggerSuccess) || 0));
    const hasEntryBonuses = Array.isArray(sim.entryBonusAwards) && sim.entryBonusAwards.length > 0;
    const entryLabel = sim.mainRateLabel || machine.initialHitLabel || "初当りBONUS";
    const upperRoute = isOkidokiBonus
      ? `BONUS後32G以内の連チャンを天国約75%、ドキドキ約80%、超ドキドキ約90%で判定します。ドキドキ系転落後は保証、天国・保証終了後の一部は金ドキからBIG＋次回天国以上へ進みます。`
      : sim.uminchuFlow
      ? `BONUS後32G以内の連チャンを10回重ねると${sim.upperLabel}へ進み、ストック獲得後は約${percent(sim.uminchuPostIreguiContinue)}のループで連チャンを伸ばします。`
      : sim.tentenFlow
        ? `王宮舞踏会中に上位CZの権利を獲得し、終了後の10G${sim.upperChallenge}を約${percent(sim.upperSuccess)}で突破すると${sim.upperLabel}へ進みます。`
      : sim.goblinSlayerFlow
        ? `100Gでオーブを集め、5GのJUDGEMENTを突破してセット継続。3・5セット目のゴブリンロード撃破または最大8セット継続から${sim.upperLabel}を目指します。`
      : sim.assaultLilyFlow
        ? `差枚数ATの残り枚数を減らしながらボスヒュージ襲来を目指し、撃破報酬の特化ゾーンと${sim.upperChallenge}から${sim.upperLabel}を狙います。`
      : sim.kaguyaFlow
        ? `BONUS中の1G連、約100Gの引き戻し、5連目以降の約80%ループを重ね、${sim.upperChallenge}と${sim.upperLabel}を目指します。`
      : sim.dumbbellFlow
        ? `30G＋αの通常ATでゲーム数を上乗せし、3Gの${sim.upperChallenge}突破後はVストックから差枚数型の${sim.upperLabel}を伸ばします。`
      : sim.shinEvaFlow
        ? `3Gで作戦を決め、10G＋αの作戦STと3種類のBONUSをループ。三機殲滅は進行ストック、10Gの${sim.upperChallenge}成功から${sim.upperLabel}へ進みます。`
      : sim.upperLabel
      ? sim.karakuriJudgeFlow
        ? `${sim.specialLabel}を3回成功させて${sim.upperChallenge}、4回目以降の成功時は運命連鎖から${sim.upperLabel}を目指します。`
        : Number(sim.upperAfterSuccesses) > 0
          ? `${sim.specialLabel}などで獲得を伸ばし、ハラキリチャレンジを3回成功させると4セット目から${sim.upperLabel}へ移行します。`
        : `${sim.specialLabel}などで獲得を伸ばし、${sim.upperChallenge}成功から${sim.upperLabel}を目指します。`
      : `${sim.specialLabel}などの出玉契機で獲得枚数を伸ばします。`;
    const judgeText = isOkidokiBonus
      ? `${sim.triggerLabel}当選後はBIGまたはREGへ進み、終了後の32Gで滞在モードに応じた次回BONUSを判定します。`
      : isBasiliskBc
      ? `16Gまたは30Gの${sim.triggerLabel}を消化し、異色BCはBT抽選、同色BCはBT期待度50%以上、エピソードBC・プレミアムBCはBT濃厚の代表ルートとして判定します。`
      : isDirectEntry
      ? sim.uminchuFlow
        ? `${sim.triggerLabel}当選後はBIGまたはREGへ進み、BONUS消化後の32Gでストック放出または自力連チャンを判定します。`
        : `${sim.triggerLabel}を初当りとして扱い、独立したCZ突破抽選は行いません。`
      : `${sim.triggerLabel}到達後、代表突破率${percent(successRate)}で${hasEntryBonuses ? entryLabel : sim.mainLabel}への当落を判定します。`;
    const missText = isOkidokiBonus
      ? `BIGは70G・約210枚、REGは30G・約90枚。32G以内に再点灯しなければ今回の連チャンを終了します。`
      : isBasiliskBc
      ? `BT当選時は追想の刻10G＋争忍の刻平均30Gへ進み、非当選時はBCの獲得枚数を記録して通常時へ戻ります。`
      : isDirectEntry
      ? hasEntryBonuses
        ? `初当り後は${sim.entryBonusAwards.map(([bonus]) => bonus.label).join("・")}の代表ルートへ進み、それぞれの条件で${sim.mainLabel}を判定します。`
        : "初当り後はそのままメイン区間へ進みます。"
      : hasEntryBonuses
        ? `成功で${entryLabel}へ進み、獲得後にボーナス種別ごとの期待度で${sim.mainLabel}を抽選します。失敗時は通常時へ戻ります。`
        : `成功で${sim.mainLabel}、失敗時は通常時へ戻る流れです。`;
    const flow = isOkidokiBonus
      ? [
          ["01", "通常時", "ハイビスカス点灯を待つ"],
          ["02", "BONUS", `約1/${triggerRate}`],
          ["03", "32G連", "天国・ドキドキを判定"],
          ["04", "金ドキ", "BIG＋次回天国以上"]
        ]
      : isBasiliskBc
      ? [
          ["01", "通常時", `${sim.triggerLabel}を目指す`],
          ["02", "BC・入口", `約1/${triggerRate}`],
          ["03", "BT当選ジャッジ", "BC種別で期待度変化"],
          ["04", "追想＋争忍", sim.mainLabel]
        ]
      : isDirectEntry
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
      ? `<div class="machine-cz-upper"><span>その先</span><strong>${sim.karakuriJudgeFlow ? "激情3回→運命の一劇 / 4回→運命連鎖" : isOkidokiBonus ? "天国・金ドキ・ドキドキ" : sim.uminchuFlow ? "BONUS 10連" : sim.goblinSlayerFlow ? "3・5・最大8セット目" : sim.assaultLilyFlow ? "上乗せ特化の報酬" : sim.kaguyaFlow ? "1G連・約100G引き戻し" : sim.dumbbellFlow ? "通常AT中の権利獲得" : sim.shinEvaFlow ? "BONUS後の一部" : sim.upperChallenge}</strong><i aria-hidden="true">→</i><strong>${sim.upperLabel}</strong><small>${sim.karakuriJudgeFlow ? "激情ジャッジ成功回数で上位ルートが変化" : isOkidokiBonus ? "32G以内のBONUS連を約75%・80%・90%で個別判定" : sim.uminchuFlow ? "10連到達で8Gのストック特化ゾーンへ突入" : sim.tentenFlow ? "王宮舞踏会終了後に10G・成功期待度約50%" : sim.goblinSlayerFlow ? "ゴブリンロード撃破または最大8セット継続" : sim.assaultLilyFlow ? "4種類のラストバレットジャッジメント成功で上位AT" : sim.kaguyaFlow ? "5連目以降はBONUSループ期待度約80%" : sim.dumbbellFlow ? "3G・約56%突破後、平均Vストック約4個" : sim.shinEvaFlow ? "マリ獣化チャレンジ10G・成功期待度約38%" : "上位ルートはCZ突破後の別抽選"}</small></div>`
      : "";
    const guideKicker = isOkidokiBonus ? "BONUS LOOP GUIDE" : isBasiliskBc ? "BONUS ENTRY GUIDE" : isDirectEntry ? "DIRECT ENTRY FLOW" : "CHANCE ZONE GUIDE";
    const guideTitle = isOkidokiBonus ? "BONUS連のゲーム性" : isBasiliskBc ? "BCのゲーム性" : isDirectEntry ? "初当りゲーム性" : "CZのゲーム性";
    const guideLead = isOkidokiBonus ? "ハイビスカス点灯、BIG・REG、BONUS後32G、金ドキまでの流れを整理します。" : isBasiliskBc ? `${sim.triggerLabel}の種類、BT当選後の追想・争忍、宿怨チャレンジまでの流れを整理します。` : isDirectEntry ? "CZを経由しない初当りから、出玉を伸ばす流れを整理します。" : `${sim.triggerLabel}の役割、突破後の行き先、上位までの流れを整理します。`;
    const roleTitle = isOkidokiBonus ? "BONUSの役割" : isBasiliskBc ? "BCの役割" : isDirectEntry ? "初当りの役割" : "CZの役割";
    const judgeTitle = isOkidokiBonus ? "32G中の当落" : isBasiliskBc ? "BC中の当落" : isDirectEntry ? "直結タイプ" : "CZ中の当落";
    const rateKind = isOkidokiBonus ? "BONUS" : isBasiliskBc ? "BC" : "CZ";
    return `<section class="machine-cz-guide${isDirectEntry ? " is-direct" : ""}" id="cz-game" aria-labelledby="machine-cz-title"><div class="machine-cz-head"><span>${guideKicker}</span><h3 id="machine-cz-title">${machine.shortName}の${guideTitle}</h3><p>${guideLead}</p></div><div class="machine-cz-flow" aria-label="${escapeHtml(`${machine.shortName}のゲームフロー`)}">${flow.map(([number, label, detail], index) => `<div><span>${number}</span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(detail)}</small></div>${index < flow.length - 1 ? '<i aria-hidden="true">›</i>' : ""}`).join("")}</div>${upperStep}<div class="machine-cz-detail-grid"><article><span>ROLE</span><h4>${roleTitle}</h4><p>通常時の入口は${sim.triggerLabel}で、発生目安は約1/${triggerRate}です。${isOkidokiBonus ? "当選後はBIG・REGを消化し、必ず32Gの連チャン判定へ進みます。" : isBasiliskBc ? `${sim.triggerLabel}の種類によって${sim.mainLabel}期待度が変化します。` : isDirectEntry ? hasEntryBonuses ? `${initialHitName(entryLabel)}後に複数の代表ルートへ振り分けます。` : `${sim.mainLabel}へ直接つながる代表ルートとして扱います。` : `${hasEntryBonuses ? entryLabel : sim.mainLabel}へ進むための関門として扱います。`}</p></article><article><span>JUDGE</span><h4>${judgeTitle}</h4><p>${judgeText} 実機の小役、ポイント、バトルなど複数の条件は、このサイトでは一連のジャッジへまとめています。</p></article><article><span>RESULT</span><h4>成功・失敗後</h4><p>${missText} 設定${slotBaselineSetting}基準の${isOkidokiBonus ? "BONUS初当り" : initialHitName(sim.mainLabel)}は約1/${mainRate}です。</p></article><article><span>NEXT ROUTE</span><h4>AT中と上位ルート</h4><p>${upperRoute}</p></article></div><p class="machine-cz-note">表示する${rateKind}発生率・突破率・上位到達率は、記事に収録した公表値または比較用の代表値です。実機の全小役、内部状態、モード、天井は完全再現していません。</p></section>`;
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
    } else if (sim.goblinSlayerFlow) {
      cards = [
        ["THREE CZ", "3種類のCZ", "MISSIONは10G＋2Gジャッジ・約33%、CHANCEは狙えカットイン3回まで・約45%、BATTLEは最大7G・約70%。規定G数などからのAT直撃も代表ルートに含めます。"],
        ["RUSH 100G", "100Gの通常AT", `1セット100G＋α・純増約${Number(sim.atPureIncrease).toFixed(1)}枚/G。52%・62%・80%のループモードを開始時に抽選し、オーブ3個ごとに最終継続率を上げます。`],
        ["JUDGEMENT", "5Gの継続バトル", "100G消化後はホブゴブリンまたはゴブリンロードとの5Gバトルへ。残りゲームを進め、最後のPUSHで継続・敗北を表示します。"],
        ["REWARD", "報酬ジャッジ・BONUS", "勝利後は1Gの報酬ジャッジで連撃・大連撃・上位ATを開きます。ゴブリンスレイヤーBONUSは20Gを消化し、獲得枚数とAT＋10G以上を別表示します。"],
        ["ULTIMATE", "ULTIMATE LOOP", `3・5セット目のゴブリンロード撃破または最大8セット継続で${sim.upperLabel}を狙います。上位は100G・純増約${Number(sim.upperPureIncrease).toFixed(1)}枚/G・実質継続約${percent(sim.upperContinue)}です。`]
      ];
      note = "CZゲーム数・期待度、AT100G、ループモード、JUDGEMENT5G、上位100G・実質約82%は公表値です。CZ種類比率、オーブ獲得数、BONUS出現率など非公表の部分はAT初当りと平均継続へ近づける代表値です。";
    } else if (sim.assaultLilyFlow) {
      cards = [
        ["ENTRY ROUTES", "直撃・3種類CZ・BONUS", "初当りはAT直撃、10Gの梨璃CZ・夢結CZ・シュッツエンゲルCZ、25Gのブーケボーナスへ振り分けます。CZとBONUSは最後のPUSHでRUSH当落を開きます。"],
        ["DIFFERENCE COINS", "初期150枚＋αの差枚数AT", `残り枚数を減らしながら純増約${Number(sim.atPureIncrease).toFixed(1)}枚/Gで消化します。残りゲーム数型にはせず、現在の残り枚数・獲得枚数を分けて表示します。`],
        ["BOSS HUGE", "4〜5Gのボスヒュージ襲来", "規定ゲーム数からバトルへ進み、4〜5Gを最後までカウントします。最後のPUSHで勝敗を開き、勝利時だけ次の報酬画面へ進みます。"],
        ["REWARD", "5種類の上乗せ特化", "ヒュージバトル3G、チャームストライク9G、ノインヴェルト戦術1G、ルナティックトランサー10G＋α、アサルトスパイラルを専用表示し、上乗せ枚数はPUSHまで伏せます。"],
        ["LAST BULLET", "上位CZとRUSH SUPER", `メモリア・討伐・殲滅・Edel Lilieの4種類から${sim.upperChallenge}を表示。成功後の${sim.upperLabel}は初期200枚＋α・純増約${Number(sim.upperPureIncrease).toFixed(1)}枚/Gで、ボス勝率と特化ゾーン性能を強化します。`]
      ];
      note = "CZ10G・期待度、BONUS25G・約88枚・RUSH期待度約29%、AT初期枚数・純増、各特化ゾーンのゲーム数は公開値です。初当りルート比率、ボス勝率、報酬振り分け、上位CZ成功率など未公表部分は設定別RUSH初当りへ近づける代表値です。";
    } else if (sim.kaguyaFlow) {
      cards = [
        ["CHANCE ZONE", "告らせたいチャレンジ", "15G＋α・成功期待度約58%。小役や2択成功から7図柄停止を狙い、最後のPUSHでBONUS当落を開きます。"],
        ["THREE BONUS", "REG・BIG・SUPER BIG", "REG約83枚、BIG30G・約270枚、SUPER BIG54G・約490枚。BIG以上は1G連期待度約45%です。"],
        ["ONE GAME", "1G連と特化ゾーン", "1G連時はBIG以上。白銀覚醒、ガチきゅんPUSH、チカブレイク当選時は、PUSHで獲得ストック数を開きます。"],
        ["RETURN 100G", "引き戻しチャンス", "1G連非当選時は約100Gを消化。通常は約25%、5連目以降は約50%でBIG以上へ引き戻します。"],
        ["UPPER BONUS", "マリアージュ・EXTRA", `奇跡的相性マリアージュMODEは32G以内のSUPER BIG濃厚。${sim.upperLabel}は50Gまたは100Gを約80%で上乗せ決定します。`]
      ];
      note = "CZ15G＋α・約58%、BONUSゲーム数と平均獲得、BIG以上の1G連約45%、約100G引き戻し、5連目以降のループ約80%、EXTRA平均期待約3450枚は公開値です。初回BONUS比率・特化ゾーン比率など非公表部分は代表値です。";
    } else if (sim.dumbbellFlow) {
      cards = [
        ["MUSCLE ZONE", "10G＋αの二部構成CZ", "前半から後半へ進み、アームレスリング約42%、筋肉道約55%、マッスルプッシュ約85%のPUSH判定でATを目指します。"],
        ["NORMAL AT", "30G＋αのゲーム数AT", `純増約${Number(sim.atPureIncrease).toFixed(1)}枚/G。残りゲームを減らしながら、レア役チャンスのPUSHで＋20G以上を開きます。`],
        ["GOLDEN CHALLENGE", "3G・成功期待度約56%", "通常AT中の権利獲得または120G継続から挑戦。3Gを消化し、最後のPUSHでゴールデンタイム当落を開きます。"],
        ["V STOCK", "5Gのゴールデンタイム", "毎ゲームVストックを抽選し、平均約4個。1個につき100枚以上の初期差枚をPUSHで決めます。"],
        ["UPPER LOOP", "金肉BONUSと引き戻し", "差枚数型の金肉BONUSは平均約1070枚。終了後は3G・約56%のライジングアッパーチャレンジから再び特化ゾーンを狙います。"]
      ];
      note = "CZ・AT設定別確率、CZ10G＋α・約40%、通常AT30G＋α・純増約8.5枚/G、上位CZ約56%、特化5G・平均Vストック約4個、金肉BONUS平均約1070枚は公開値です。非公表振り分けは代表値です。";
    } else if (sim.shinEvaFlow) {
      cards = [
        ["EVANGELION IMPACT", "3Gの作戦決定", "初当り後は3Gで作戦を決定。パリ5段階、ヤマト4段階、US3段階、第8使徒迎撃2段階、ヤシマ1段階から今回の作戦をPUSHで開きます。"],
        ["OPERATION ST", "10G＋α・BONUS期待度約72%", "作戦目やレア役で必要段階を進め、進行時は10Gを再セット。通常ST純増は約0.1枚/Gで、最後のPUSHまで作戦成功を伏せます。"],
        ["THREE BONUS", "BIG・SUPER BIG・SPECIAL", "公開比率を使い、BIG87.1%・SUPER BIG9.8%・SPECIAL3.1%で抽選。約150枚または約300枚を収支へ加算し、進行ストックとVストックを抽選します。"],
        ["THREE EVAS / MARI", "三機殲滅とマリ獣化", "三機殲滅は8G＋αの進行ストック特化。マリ獣化チャレンジは10G・成功期待度約38%で、成功時はSUPER BIGを経て上位へ進みます。"],
        ["UPPER ST", "20G＋α・継続期待度約95%", `オップファータイプ殲滅作戦は8段階突破でSUPER BIG。純増約${Number(sim.upperPureIncrease).toFixed(1)}枚/G・継続期待度約95%でループします。`]
      ];
      note = "作戦ST10G＋α・期待度約72%、BONUS比率・獲得目安、三機殲滅8G＋α、マリ獣化10G・約38%、上位20G＋α・約95%は公開値です。作戦選択率、ストック率、マリ獣化出現率など非公表部分は代表値です。";
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
    } else if (sim.darlingFranxxFlow) {
      cards = [["TWO CHANCE ZONES", "5G約46%／10G約69%", "コネクトチャンスとココロチャンスを別表示し、最後のPUSHで初当りBONUSを開きます。"], ["INITIAL BONUS", "約40・100・200枚", "REGは約22%で昇格。ダーリンBONUSとエピソード後はボーナス高確へ進みます。"], ["BONUS HIGH", "10G＋α・BONUS約1/10.4", "残りゲーム数を0まで進め、当選時は4種類のBONUSをPUSHまで伏せます。"], ["HIYOKU BEATS", "2〜4G・継続約75〜94%", "レベル別STで高確ゲーム数を上乗せし、最大30GのCLIMAXXを目指します。"], ["TAKEOUT", "STゲーム数ホールド", "フランクスBONUS中の連れ出しは、60枚消化までST減算を止める専用イベントです。"]];
      note = "CZ・BONUS・ボーナス高確初当り、純増、主要ゲーム数、比翼BEATS性能は公開値です。未公表の選択率は体験用代表値です。";
    } else if (sim.toaruIndex2Flow) {
      cards = [
        ["TWO CHANCE ZONES", "10G・約52%／約80%", "レールガンチャンスとアクセラレータチャンスを別々に抽選し、最後のPUSHで幻想殺しRUSH当落を開きます。"],
        ["IMAGINE BREAKER RUSH", "初期40G以上・純増約4.0枚/G", "残りゲーム数を減らしながら、直乗せ、バトル、赤7ストックなどを抽選します。"],
        ["CHARGE GAME", "7段階の上乗せ報酬", "＋20G、五和、神裂火織、御坂美琴、一方通行、竜王の顎、自動書記をPUSHまで伏せます。"],
        ["PLUS ACTION", "平均約30・60・310G", "サポーター、ヒロインズ、イマジンブレイカーを通常のバトル報酬と分けて記録します。"],
        ["FIAMMA BATTLE", "AT終了時の引き戻し", "権利獲得時はフィアンマBATTLEの最後にPUSH。成功後は上乗せ遊技を経て幻想殺しRUSHへ再突入します。"]
      ];
      note = "CZ・AT初当り、CZ期待度、AT純増、主要ゲーム数、上乗せ平均は公開値です。CZ選択率、バトル出現率・勝率、報酬配分など未公表部分は体験用代表値です。";
    } else if (sim.magiaRecordFlow) {
      cards = [
        ["FOUR BONUS", "4種類のBONUSからATへ", "BIGは30G＋α・AT期待度40%。みたまはベルナビ8回＋1G、エピソードは50G、アリナミュージアムは30G間毎ゲーム上乗せです。"],
        ["MAGIA ATTACK", "前半5G＋後半5G", "前半で5枚のカードを獲得し、後半はカードと成立役を参照して初期ゲーム数を決定。最後のPUSHまで合計ゲーム数を伏せます。"],
        ["STORY", "20G・全8種類", "通常ストーリーはカウント＋1、30Gのスペシャルストーリーは＋2。全8種類コンプリートでエンディングと上位ATが濃厚です。"],
        ["CONNECT", "3Gのチャンスからキャラ別上乗せ", "成功後はやちよ10G以上、鶴乃20G以上、さな30G以上、フェリシア／黒江50G以上、ほむら／まどか100G以上をPUSHで開きます。"],
        ["EMBRYO EVE", "32G準備＋10G＋α", "ストーリーコンプリート後は覚醒準備、エンブリオ・イブアタックを経て上位ATへ。ストーリー当選時は必ずコネクトチャンスが発生します。"]
      ];
      note = "BONUS・AT初当り、純増、主要ゲーム数、BIG期待度、ストーリー・コネクト性能は公開値です。BONUS種類・報酬・キャラの非公開配分は体験用代表値です。";
    } else if (sim.azurLaneFlow) {
      cards = [
        ["SEA BATTLE BONUS", "白7・青7からATを抽選", "ベルナビ10回＋告知10G、平均約100枚。青7は規定回数込みでAT期待度約62.4%。専用画面の最後にPUSHでAT当落を開きます。"],
        ["SEA BATTLE ATTACK", "最低50G・平均約100G", "3G保障の毎ゲーム上乗せ。ボーナス経由は0%・25%・60%・90%のループ率から抽選し、PUSHまで初期ゲーム数を伏せます。"],
        ["SIREN BATTLE", "5〜8G・敵別の勝率", "ピュリファイアー約40.1%、テスター約52.4%、オブザーバー約81.3%。勝利後のPUSHで上乗せ・集結BONUSなどを開きます。"],
        ["FOUR FACTIONS", "集結BONUSで陣営参戦", "集結BONUS1回で参戦する陣営は最大1つ。陣営が増えるほどセイレーンバトルのゲーム数が伸び、4陣営集結で天城BATTLEを目指します。"],
        ["DIMENSIONAL SS RUSH", "7G・約54%から上位へ", "天城BATTLE成功後は純増約5.1枚/G・常時4陣営参戦。上位終了後も天城BATTLEへ戻る異次元ループを表示します。"]
      ];
      note = "BONUS・AT初当り、純増、主要ゲーム数、青7・敵別・天城BATTLEの期待度は公開値です。陣営参戦率、報酬比率など未公表部分は体験用代表値です。";
    } else if (sim.bofuriFlow) {
      cards = [
        ["HIGH PROBABILITY", "3種類の高確率ZONE", "運営高確率はボーナス期待度約50%。機械神高確率と極・高確率は成功でエピソードBONUS濃厚。専用画面で15Gを進め、最後のPUSHで当落を開きます。"],
        ["THREE BONUS", "REG・BIG・エピソード", "REG約100枚、BIGはシングル約150枚・ダブル約250枚、エピソードBONUS約250枚。防御状態中のBIGはダブル揃い濃厚として表示します。"],
        ["DEFENSE STATE", "Lv.0〜4・最大80G", "ボーナス後は必ず防御状態へ。CZ出現約1/11.9、初回CZ期待度88%以上、以後はレベル別に約77・79・83・86・94%でCZを抽選します。"],
        ["ANGEL ZONE", "30G・BONUS期待度約70%", "エピソードBONUSの分岐から突入。高確率ZONE出現約1/5.5の30Gを進め、最後のPUSHでBONUS獲得を開きます。"],
        ["VIOLENCE ZONE", "50G・期待枚数約3500枚", "暴虐高確率から暴虐BONUSを重ねる最上位ルートです。50Gを最後まで進め、PUSHで最終獲得枚数を表示します。"]
      ];
      note = "初当り・純増・CZ期待度・防御状態・特化ZONEは公開値です。CZ種類、防御Lv、エピソード分岐など非公開の配分は体験用代表値です。";
    } else if (sim.aobutaFlow) {
      cards = [
        ["SEISHUN BONUS", "初当り後は必ずSTへ", "青春BONUSはベルナビ5回、稀に25回。20pt到達で青ブタJUDGEを1セット（2G）追加し、消化後は必ず完走型STへ進みます。"],
        ["AO BUTA JUDGE", "1セット2G・4セット＋α", "4ヒロインの区間を最後まで消化し、Vを複数獲得する可能性があります。1回でもVを取れば次のSTへ継続します。"],
        ["DREAM BURST", "ヒロイン別の枚数決定", "V獲得数だけ青春DREAM BURSTを消化。朋絵・のどか・双葉・かえでで上乗せ方法と平均枚数が異なり、PUSHまで結果を伏せます。"],
        ["MUGEN JUDGEMENT", "10G＋6G＋α・約53%", "翔子のST成功時などに獲得。前半10Gと後半6G以上を進め、最後のPUSHで上位ST当落を開きます。"],
        ["INFINITY ST", "継続約80%・平均約640枚", "成功時は300枚のエピソードBONUS後に上位STへ。V獲得率とBONUS枚数が上がった高純増ループを専用表示します。"]
      ];
      note = "初当り、STゲーム数、通常・上位継続、上位CZ、純増、ヒロイン別平均枚数は公開値を優先しています。V当選率や翔子選択率など未公表部分は体験用代表値です。";
    } else if (sim.okidokiGoldFlow) {
      cards = [
        ["HIBISCUS", "点灯でBONUS確定", "通常時は毎ゲームBONUSを抽選。ハイビスカス点灯後のPUSHでBIGまたはREGを開き、設定別初当り確率と今回の投資を結果へ反映します。"],
        ["BIG / REG", "70G約210枚・30G約90枚", `BIG・REGとも純増約${Number(sim.atPureIncrease).toFixed(1)}枚/G。BONUSのゲーム数を最後まで進め、獲得枚数を1回ずつ収支へ加算します。`],
        ["32G LOOP", "BONUS後は毎回32G", "天国は約75%、ドキドキは約80%、超ドキドキは約90%で次回BONUSを判定。連チャン中のBIGでは1G連が告知される場合があります。"],
        ["GUARANTEE", "ドキドキ系転落後の保証", "ドキドキ・超ドキドキのループに漏れた場合も保証モードで32G以内のBONUSを1回追加し、その後に連チャン終了または金ドキを判定します。"],
        ["GOLD MODE", "BIG＋次回天国以上", "天国や保証終了後の一部で金ドキへ移行。32G以内のBIGを消化し、天国・ドキドキ・超ドキドキのいずれかへ再突入するシームレスな連チャンを表示します。"]
      ];
      note = "設定別初当り・BIG・REG・出玉率、BONUSゲーム数・平均獲得、天国・ドキドキ・超ドキドキのループ率、金ドキの基本性能は公開値です。初回モード、金ドキ移行率、1G連率など非公表部分は体験用の代表値です。";
    } else if (sim.basiliskTenzenFlow) {
      cards = [
        ["BASILISK CHANCE", "16GのBCからBTへ", "異色BC・同色BCは16G。BC当選時と消化中にBTを抽選し、同色BCはBT期待度50%以上です。EPBC・PBCは30GかつBT濃厚として別表示します。"],
        ["BASILISK TIME", "追想10G＋争忍平均30G", `BTは純増約${Number(sim.atPureIncrease).toFixed(1)}枚/G・1セット平均約40G。追想の刻でBCと絆玉を抽選し、争忍の刻の最後にPUSHで甲賀勝利を開きます。`],
        ["KIZUNA KOUKAKU", "初回は絆高確", "絆玉1個で縁・想・恋のいずれか、2個で2種類、3個で縁想恋、4個で全役対応の絆モード。対応役によるBC当選で次セット継続を狙います。"],
        ["BT SCENARIO", "全10種類・12セット管理", "設定1の公開シナリオ振り分けと12セットのA〜F配列を使用します。A〜Dの具体的な継続率は非公表のため、強弱関係を保った代表値で判定し、FはA〜Eから抽選します。"],
        ["GRUDGE LOOP", "宿怨チャレンジと天膳BT", "カットイン3回まで・成功期待度50%超。成功時は激闘シナリオ相当の天膳BT＋初回10人状態、失敗時も通常BTへ進みます。12セット完走後はエンディングを経て必ず挑戦します。"]
      ];
      note = "BC・BT設定別確率、各ゲーム数、純増、シナリオ表・設定1振り分け、宿怨チャレンジの基本性能は公開値です。継続率A〜D、絆玉・BT中BC・月下閃滅・宿怨ポイントMAXの出現率は体験用の代表値です。";
    } else if (sim.kanokariFlow) {
      cards = [
        ["CHANCE ZONE", "2種類のCZから疑似BONUSへ", "レンカノCHALLENGEは15G＋α・約56%、妄想DTチャレンジは10G・約75%。小役でチャンスを広げ、最後のPUSHでBONUS当落を開きます。"],
        ["BONUS", "REG約70枚／BIG約150枚", "REGはベルナビ10回、かのかりBONUSは30G。純増約5.0枚/Gで消化し、通常ストックと成功濃厚の1G恋ストックを別々に獲得します。"],
        ["ONE GAME RENT", "2G・成功期待度約40%", "1GレンCHANCEは2Gを進めて最後にPUSH。1G恋は成功濃厚、通常へ戻らず5連続で失敗した次の6回目は成功濃厚です。"],
        ["RETURN", "66Gの引き戻し", "ストック消化後は通常約25%、ユメカノモード約58%でBONUS復帰を判定。4回目はヒロイン、8回目はスペシャルエピソードへ進みます。"],
        ["NANAKARI DREAM", "平均約80Gの上乗せ", "金7揃いは前半のゲーム数上乗せと後半のかのかりBONUSを分けて表示。S級は平均約280Gとして専用演出で開きます。"],
        ["DREAM TIME", "15Gでストック獲得", "エンディング後は平均約2.5ストックと1G恋を獲得。S級DREAM TIMEは平均約6ストックとして、獲得数をPUSHまで伏せます。"]
      ];
      note = "CZ、BONUS、1G連、引き戻し、純増、DREAMの主要値は公開値です。BONUS種別比率や追加ストック率など未公表部分は公開平均から大きく外れない代表値です。";
    } else if (sim.lycorisFlow) {
      cards = [
        ["CHANCE ZONE", "3種類の入口からRUSHへ", "通常CZは対極のふたり・ファーストリコリスの2種類。成功後は約100枚のプロローグを経て、千束ラッシュまたはたきなラッシュを1:1で決定します。通常時の直撃ルートはアフターエピソードから始まります。"],
        ["RUSH 20", "20G・BONUS期待度約60%", "リコリスラッシュ20は20G以内のBONUS当選を目指す入口です。最後までゲーム数を進め、BONUS当選時は4種類の報酬をPUSHで開いたあと、前半50G＋後半ST10Gのリコリスラッシュ50へ進みます。"],
        ["RUSH 50", "前半50G＋後半ST10G", "前半はBONUS確率約1/18、後半は約1/12。ST中のBONUS当選で10Gを再セットします。千束はチェリー、たきなはスイカが才能Lv2となる専用ルートを結果へ残します。"],
        ["FOUR BONUS", "4種類のBONUS", "リコリスBONUS約100枚、リコリスBONUS W約200枚以上、エピソードBONUS約300枚、スプラッシュBONUS平均約385枚。獲得枚数とポイントを同時に加算し、1000pt到達で上位CZへ進みます。"],
        ["UPPER ROUTE", "真島バトルからRUSH Wへ", `${sim.upperChallenge}は10G・成功期待度約70%。成功後の${sim.upperLabel}は前半50G＋後半ST10Gで、チェリー・スイカが常に才能Lv2、BONUSはW以上。1000pt到達時はCZを挟まず上位を再セットします。`],
        ["LEGENDARY", "レジェンダリーリコリス", "上位突入時の一部で7G＋αのレジェンダリーリコリスへ。平均約1000枚の上乗せをPUSHで開き、上位RUSHのBONUS獲得と分けて記録します。"]
      ];
      note = "設定別CZ・AT初当り、各RUSHのゲーム数とBONUS確率、RUSH20の期待度、BONUS獲得枚数、上位CZ期待度などの公開値を優先しています。CZ種類比率、BONUS振り分け、ポイント振り分け、レジェンダリー当選率など未公表部分は体験用の代表値です。";
    } else if (sim.symphogearSeigiFlow) {
      cards = [
        ["AXZ BATTLE", "成功期待度約65%", "通常時はCZのAXZバトルまたは上位CZの最終決戦からATを目指します。最後のPUSHまで勝敗を伏せ、突破時は初期ゲーム数決定へ進みます。"],
        ["AXZ RUSH", "初期40G以上・純増約2.8枚/G", "『わたしは歌でぶん殴るッ！』で40G・50G・100Gまたは絶唱を決定。残りゲーム数を減らしながら、獲得枚数の節目でギアVチャンスを抽選します。"],
        ["GEAR V ATTACK", "5装者・平均約30G", "響、翼、クリス、マリア、調＆切歌の獲得結果をPUSHで開き、成功時はキャラ固有のゲーム数上乗せへ。5装者獲得時はEXへ進みます。"],
        ["ZESSHO", "5G＋α・平均約100G", "絶唱は毎ゲーム10G以上を上乗せし、獲得ゲーム数をPUSHで表示。通常ATの1000・1500・2000・2500枚到達時にも上位移行を判定します。"],
        ["GOLDEN RUSH", "純増約5.0枚/G・BONUSあり", "AXZラッシュ黄金はゲーム数上乗せとシンフォギアBONUSを別表示。終了後は5G・勝利期待度約60%の絶唱バトルをPUSHで決着し、勝利時は絶唱または黄金絶唱へ進みます。"]
      ];
      note = "AT初当り、CZ約65%、初期40G以上、純増約2.8枚/G・約5.0枚/G、絶唱平均約100G、絶唱バトル約60%、黄金絶唱平均約360Gは公開値です。装者別獲得率や上位移行率の一部は体験用代表値です。";
    } else if (sim.sao2Flow) {
      cards = [
        ["SQUADRON BATTLE", "CZ成功期待度約55%", "液晶ゲーム数、バレットカウンター、強チェリーなどからCZへ。最終PUSHでBullet of Bulletsの当落を開きます。"],
        ["BULLET OF BULLETS", "初期150枚＋α・純増約3.6枚/G", "差枚数を消化しながら液晶20Gごとのスナイパーチャンスを狙います。AT開始時は約25%で高確へ移行しますが、本サイトでは全体のSC発生結果へまとめています。"],
        ["SNIPER CHANCE", "最大3勝を目指す対戦", "ダイン、ペイルライダー、闇風、銃士X、デス・ガンから相手を抽選。PUSHまで勝敗を伏せ、3勝またはデス・ガン撃破で上位CZの権利を獲得します。"],
        ["LAST ATTACK", "5G・成功期待度約35%", "BoBの差枚を使い切ると5Gのラストアタックへ。成功時はスナイパーチャンスへ復帰し、最後の対戦結果をPUSHで開きます。"],
        ["DEATH GUN BATTLE", "4G＋最終1G・約50%", "4Gのバトルを最後まで進め、最終1GのPUSHでFULL DIVE当落を表示。上位終了後も再びデス・ガンバトルへ進みます。"],
        ["FULL DIVE / ZEKKEN", "上位純増約7.2枚/G", "FULL DIVEは3桁以上の差枚上乗せを区間ごとに表示。絶剣当選時は初期2200枚＋αを開き、アルティマ状態の上位ループへ進みます。"]
      ];
      note = "設定別CZ・AT初当り、CZ約55%、初期150枚＋α、純増約3.6枚/G・約7.2枚/G、ラストアタック約35%、デス・ガンバトル約50%は公開値です。SC相手別勝率、直乗せ、絶剣・アルティマ状態の詳細は体験用代表値です。";
    } else if (sim.tokyoGhoulFlow) {
      cards = [
        ["CHANCE ZONE", "8GのCZからATへ", "レミニセンスは8G・成功期待度約50%、大喰いの利世は8G・約75%。成功後は初期約150枚・純増約4.0枚/Gの東京喰種咬へ進みます。"],
        ["GHOUL BATTLE", "4Gの喰種対決", "ATの差枚を消化しながら喰種対決へ発展。対戦相手ごとの勝利期待度は鯱40%、霧嶋絢都47%、ヤモリ53%、特等ら76%、亜門鋼太朗86%、有馬貴将67%で、有馬は10戦目までに出現します。"],
        ["BITES", "勝利報酬をPUSHで開く", "喰種対決勝利後はBITESへ。通常BITESは小役で報酬を上げ、ハズレ時も約20%で継続します。超BITESは300〜3000枚、極BITESは2000枚または完走が濃厚です。"],
        ["SPECIAL", "百足覚醒・隻眼の梟", "特化ゾーンは通常のBITESと分けて表示します。百足覚醒は期待約300枚、隻眼の梟は期待約500枚として差枚へ加算し、東京喰種咬へ戻ります。"],
        ["UPPER ROUTE", "有馬貴将JUDGEMENTから裏ATへ", `有馬貴将に勝利するとAT終了後に5G・成功期待度約61%のJUDGEMENTへ。成功後のCCGの死神は300・500・1000・2000枚を抽選し、その一部で100G＋α・純増約${Number(sim.upperPureIncrease).toFixed(1)}枚/Gの裏ATへ進みます。`]
      ];
      note = "CZ・AT確率、CZゲーム数と期待度、AT初期差枚・純増、喰種対決の対戦相手別期待度、有馬の出現戦数、上位CZ約61%など公開値を優先しています。対戦相手選択率、BITES種別率、裏AT移行率など未公表部分は体験用の代表値です。";
    } else if (sim.cycleFlow) {
      const cycle = sim.cycleFlow;
      const titleFlow = sim.titleFlow || null;
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
        [titleFlow?.phaseLabel || "GAME FLOW", titleFlow ? "機種専用のゲーム性" : "ゲーム性", `${sim.triggerLabel}を経て${sim.mainLabel}へ突入すると、${cycle.label || sim.mainLabel}を1区間ずつ進めます。各区間の最後にPUSHで報酬と継続結果を開き、終了まで獲得枚数を積み上げます。`],
        ["LOOP UNIT", "区間・セットの構成", `1区間は${gameOptions}の代表振り分けです。区間別の継続期待度は${continueText}、最大${yen.format(cycle.maxRounds || 10)}回まで抽選します。${roundRoute ? `進行順は「${roundRoute}」です。` : ""}`],
        ["REWARD", "報酬振り分け", rewards || `${cycle.rewardLabel || "報酬獲得"}を区間ごとに抽選します。ゲーム数上乗せとボーナスは別々に表示します。`],
        ["ENTRY / ZONE", "初当り・突破率", `${sim.triggerLabel}の基準は約1/${sim.triggerRate}、${sim.mainLabel}初当りは設定${slotBaselineSetting}基準で約1/${sim.mainRate}です。通常時の全モード・規定ゲーム数・天井は初当り確率へまとめています。`],
        ["UPPER", "上位ルート", `${upperCondition}${upperDescription}`]
      ];
      if (titleFlow?.balance) {
        const profileNames = { battle: "継続バトル型", st: "ST・連続当選型", heaven: "天国・1G連型", bonus: "BONUS連鎖型", addon: "ゲーム数上乗せ型" };
        cards.splice(4, 0, ["BALANCE MODEL", "専用フローの抽選目安", `${profileNames[titleFlow.profile] || "機種専用型"}として、AT突入後は平均約${Number(titleFlow.balance.averageRounds).toFixed(1)}区間進行します。通常フローから${sim.upperLabel}へ到達する代表目安は約${percent(titleFlow.balance.upperRoute)}です。公開値と機種別の代表値から計算した比較用の目安で、実戦結果を保証するものではありません。`]);
      }
      note = `${cycle.label || sim.mainLabel}の区間順序、代表報酬、継続判定を${titleFlow ? "機種専用フローで" : "個別に"}表示する体験モデルです。成立役別抽選、内部状態、全報酬振り分けは短時間で比較できる形へ簡略化しています。`;
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
        : sim.okidokiGoldFlow
          ? [["初当り", "ハイビスカス点灯までのゲーム数"], ["BONUS", "BIG・REGの回数と最大32G連"], ["内部モード", "天国・保証・金ドキ・ドキドキへの到達"], ["最終収支", "差枚と5.2枚交換の収支目安"]]
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
      const initialHitLabel = sim.mainRateLabel || machine.initialHitLabel || sim.mainLabel;
      items = [
        [`${machine.shortName}はどんな台？`, `${releaseSummary}${machine.points?.[0] ? ` ${machine.points[0]}が主な確認ポイントです。` : ""}`],
        [`${machine.shortName}の平均投資目安は？`, `設定${slotBaselineSetting}基準の${initialHitName(initialHitLabel)}約1/${sim.mainRate}と、50枚あたり${sim.base50}G・46枚貸しの固定条件から、平均${yen.format(averageInvestment)}円を目安として表示します。実際の設定や遊技状況で結果は変わります。`],
        ["設定とゲームの流れはどう抽選する？", sim.kind === "juggler" ? `開始時に${slotSettingLabel}から1つを均等抽選し、最大${yen.format(sim.games)}GまでBIG・REGを抽選します。設定は終了時の結果とランキングに表示します。` : sim.okidokiGoldFlow ? `開始時に${slotSettingLabel}から1つを均等抽選し、BONUS初当り後はBIG・REG、32G連、天国・ドキドキ・超ドキドキ・保証・金ドキを順番に判定します。設定と最高内部モードは最終結果に表示します。` : `開始時に${slotSettingLabel}から1つを均等抽選し、${sim.triggerLabel}、${initialHitLabel}${initialHitLabel !== sim.mainLabel ? `、${sim.mainLabel}` : ""}、${sim.upperChallenge}、${sim.upperLabel}の順で到達を判定します。設定は最終結果とランキングに表示します。`],
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

    <nav class="machine-quick-nav" aria-label="ページ内メニュー"><button class="machine-favorite-button" id="machineFavoriteButton" type="button" aria-pressed="false"><span aria-hidden="true">☆</span> お気に入り</button><a href="#spec">スペック</a><a href="#ratio-chart">割合</a>${machine.sim.kind === "slot" ? `<a href="#cz-game">${machine.sim.okidokiGoldFlow ? "BONUS" : machine.sim.basiliskTenzenFlow ? "BC" : "CZ"}</a>` : ""}<a href="#game-guide">遊び方</a><a href="#article">記事</a>${machineReady ? '<a href="#machineRanking">ランキング</a>' : ""}<a href="#faq">FAQ</a>${machine.readerGuide ? '<a href="#reader-guide">30秒要点</a>' : ""}${novemberQuickLink}${decemberQuickLink}<a href="community.html?machine=${slug}">投稿</a></nav>

    <section class="machine-intro" id="spec">
      <div><span class="machine-section-label">SPEC GUIDE</span><h2>主要スペック</h2><p>${machine.intro}</p><ul>${machine.points.map(point => `<li>${point}</li>`).join("")}</ul></div>
      <div class="machine-spec-grid">${machine.specs.map(([key, value]) => `<div><span>${key}</span><strong>${value}</strong></div>`).join("")}</div>
    </section>

    <section class="machine-simulator" id="simulator">
      <div class="machine-sim-head"><div><span class="machine-section-label">SIMULATOR</span><h2>${machine.shortName} 簡易シミュレーター</h2></div><span class="machine-sim-badge${machineReady ? "" : " is-preparing"}">${machineReady ? machine.sim.dedicatedFlow ? "機種専用" : "娯楽用" : "準備中"}</span></div>
      ${machineReady ? "" : `<div class="machine-preparing-notice" role="status"><span>COMING SOON</span><strong>導入前のため、まだ遊べません</strong><p>${availabilityLabel}です。導入日を迎えると自動でスタートできるようになります。</p></div>`}
      <p class="machine-sim-note">投資・換金・収支は固定レートで計算します。パチンコは250玉貸し・28玉交換、スロットは46枚貸し・5.2枚交換です。${machine.sim.kind === "pachinko" ? "表記出玉と、打ち出し・オーバー入賞を簡易反映した実獲得出玉を分けて表示します。" : machine.sim.kind === "juggler" ? `Aタイプは開始時に${slotSettingLabel}を均等抽選し、BIG・REGを重ねて終了時に設定を発表します。` : machine.sim.okidokiGoldFlow ? `開始時に${slotSettingLabel}を抽選し、ハイビスカス点灯、BIG・REG、BONUS後32G、天国・保証・金ドキを時系列表示します。設定と内部モードは最終結果で発表します。` : machine.sim.uminchuFlow ? `開始時に${slotSettingLabel}を抽選し、BIG・REG、BONUS後32G、10連後のIREGUIを時系列表示します。設定は最終結果で発表します。` : machine.sim.tentenFlow ? `開始時に${slotSettingLabel}を抽選し、14G CZ、初回BONUS、40G高確、王宮BONUS、輪廻転天を時系列表示します。設定は最終結果で発表します。` : machine.sim.goblinSlayerFlow ? `開始時に${slotSettingLabel}を抽選し、3種類CZ、100G AT、5G JUDGEMENT、BONUS、ULTIMATE LOOPを時系列表示します。設定は最終結果で発表します。` : machine.sim.assaultLilyFlow ? `開始時に${slotSettingLabel}を抽選し、直撃・3種類CZ・BONUS、差枚数AT、ボスヒュージ襲来、特化ゾーン、RUSH SUPERを時系列表示します。設定は最終結果で発表します。` : machine.sim.kaguyaFlow ? `開始時に${slotSettingLabel}を抽選し、15G＋αCZ、3種類BONUS、1G連、約100G引き戻し、EXTRA BONUSを時系列表示します。設定は最終結果で発表します。` : machine.sim.dumbbellFlow ? `開始時に${slotSettingLabel}を抽選し、10G＋αCZ、通常ATのゲーム数上乗せ、Vストック、金肉BONUSの差枚数ループを時系列表示します。設定は最終結果で発表します。` : machine.sim.shinEvaFlow ? `開始時に${slotSettingLabel}を抽選し、3Gの作戦決定、10G＋αの作戦ST、3種類BONUS、三機殲滅、マリ獣化、上位STを時系列表示します。設定は最終結果で発表します。` : `開始時に${slotSettingLabel}を均等抽選し、AT中のレア役、上乗せ、特化ゾーン、上位ATを機種別の代表値で時系列表示します。設定は最終結果で発表します。`}</p>
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
      const hasDedicatedFlow = machine.sim.titleFlow || machine.sim.tokyoGhoulFlow || machine.sim.basiliskTenzenFlow || machine.sim.sao2Flow || machine.sim.symphogearSeigiFlow || machine.sim.lycorisFlow || machine.sim.kanokariFlow || machine.sim.aobutaFlow || machine.sim.bofuriFlow || machine.sim.azurLaneFlow || machine.sim.magiaRecordFlow || machine.sim.toaruIndex2Flow || machine.sim.darlingFranxxFlow;
      const settingModelLabel = machine.sim.settingRates
        ? hasDedicatedFlow ? "公開設定別値・機種専用進行" : "公開設定別値"
        : hasDedicatedFlow ? "共通固定補正・機種専用進行" : "共通固定補正";
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
    const triggerSuccess = sim.sao2Flow || sim.symphogearSeigiFlow || sim.lycorisFlow || sim.kanokariFlow || sim.aobutaFlow || sim.bofuriFlow || sim.magiaRecordFlow || sim.toaruIndex2Flow || sim.darlingFranxxFlow
      ? Math.max(0, Math.min(1, Number(sim.triggerSuccess) || 0.55))
      : sim.godzillaEva2Flow || sim.mahoakoFlow || sim.okidokiGoldFlow || sim.uminchuFlow || sim.shinEvaFlow
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
      ? sim.godzillaEva2Flow ? "公開設定別値（BONUS・AT初当り）" : sim.mahoakoFlow ? "公開設定別値（CZ・BONUS・AT初当り）" : sim.okidokiGoldFlow ? "公開設定別値（BONUS初当り・BIG・REG）" : sim.uminchuFlow ? "公開設定別値（BONUS初当り・合算）" : sim.tentenFlow ? "公開設定別値（CZ・BONUS初当り）" : sim.goblinSlayerFlow ? "公開設定別値（CZ合算・AT初当り）" : sim.assaultLilyFlow ? "公開設定別値（初当り・RUSH）" : sim.kaguyaFlow ? "公開設定別値（CZ換算・BONUS初当り）" : sim.dumbbellFlow ? "公開設定別値（CZ・AT初当り）" : sim.shinEvaFlow ? "公開設定別値（初当り合算）" : sim.tokyoGhoulFlow ? "公開設定別値（CZ合算・AT初当り）" : sim.basiliskTenzenFlow ? "公開設定別値（BC・BT初当り）" : sim.lycorisFlow ? "公開設定別値（CZ・AT初当り）" : sim.kanokariFlow ? "公開設定別値（CZ・BONUS初当り）" : sim.aobutaFlow ? "公開設定別値（BONUS初当り・完走型ST）" : sim.bofuriFlow ? "公開設定別値（BONUS初当り・防御状態）" : sim.azurLaneFlow ? "公開設定別値（海戦BONUS・AT初当り）" : sim.magiaRecordFlow ? "公開設定別値（BONUS・AT初当り）" : sim.toaruIndex2Flow ? "公開設定別値（CZ・AT初当り）" : sim.darlingFranxxFlow ? "公開設定別値（CZ・BONUS・高確初当り）" : sim.titleFlow ? "公開設定別値（機種専用進行）" : "公開設定別値（CZ・初当り）"
      : hasPublishedMainRate
        ? sim.bofuriFlow ? "公開設定別値（BONUS初当り）＋機種専用進行" : "公開設定別値（初当り）＋CZ簡易換算"
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
    let okidokiBigCount = 0;
    let okidokiRegCount = 0;
    let okidokiMaxChain = 0;
    let okidokiGoldCount = 0;
    let okidokiOneGameCount = 0;
    let okidokiGuaranteeCount = 0;
    let okidokiGodMode = false;
    let okidokiHighestMode = "通常";
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
    let goblinCz = null;
    let goblinLoopMode = 0;
    let goblinAtSets = 0;
    let goblinBonusCount = 0;
    let goblinMaxContinueRate = 0;
    let goblinLordBattles = 0;
    let assaultEntry = null;
    let assaultBossBattles = 0;
    let assaultBossWins = 0;
    let assaultRewardCount = 0;
    let assaultUpperCz = "";
    let assaultUpperCzAttempts = 0;
    let assaultUpperCzSuccesses = 0;
    let assaultMaxAddOn = 0;
    let kaguyaRegCount = 0;
    let kaguyaBigCount = 0;
    let kaguyaSuperCount = 0;
    let kaguyaOneGameCount = 0;
    let kaguyaReturnCount = 0;
    let kaguyaSpecialCount = 0;
    let kaguyaStockCount = 0;
    let kaguyaMarriageCount = 0;
    let kaguyaExtraGames = 0;
    let dumbbellCz = null;
    let dumbbellNormalGames = 0;
    let dumbbellGameAddCount = 0;
    let dumbbellGameAddTotal = 0;
    let dumbbellGoldenChallenges = 0;
    let dumbbellGoldenSuccesses = 0;
    let dumbbellVStockTotal = 0;
    let dumbbellCoinAddTotal = 0;
    let dumbbellRisingChallenges = 0;
    let shinEvaOperationRounds = 0;
    let shinEvaPhaseAdvances = 0;
    let shinEvaBigCount = 0;
    let shinEvaSuperCount = 0;
    let shinEvaSpecialCount = 0;
    let shinEvaProgressStocks = 0;
    let shinEvaVStocks = 0;
    let shinEvaSankiCount = 0;
    let shinEvaMariAttempts = 0;
    let shinEvaMariSuccesses = 0;
    let shinEvaUpperLoops = 0;
    let tokyoGhoulCz = null;
    let tokyoGhoulBattles = 0;
    let tokyoGhoulWins = 0;
    let tokyoGhoulBitesCount = 0;
    let tokyoGhoulSpecialCount = 0;
    let tokyoGhoulArimaBattle = 0;
    let tokyoGhoulArimaWon = false;
    let tokyoGhoulUpperAt = false;
    let tokyoGhoulCcgAward = 0;
    let basiliskBc = null;
    let basiliskScenario = null;
    let basiliskSets = 0;
    let basiliskBtBcCount = 0;
    let basiliskHighCount = 0;
    let basiliskMoonCount = 0;
    let basiliskGrudgeAttempts = 0;
    let basiliskGrudgeSuccesses = 0;
    let basiliskTenzenSets = 0;
    let sao2SniperAttempts = 0;
    let sao2SniperWins = 0;
    let sao2LastAttackAttempts = 0;
    let sao2LastAttackSuccesses = 0;
    let sao2DeathGunAttempts = 0;
    let sao2DeathGunWins = 0;
    let sao2UpperSections = 0;
    let sao2ZekkenAward = 0;
    let sao2Ultima = false;
    let symphogearInitialRoute = null;
    let symphogearGearVChances = 0;
    let symphogearGearVWins = 0;
    let symphogearGearVAttacks = 0;
    let symphogearTotalAddGames = 0;
    let symphogearExCount = 0;
    let symphogearZesshoCount = 0;
    let symphogearUpperSections = 0;
    let symphogearBonusCount = 0;
    let symphogearZesshoBattleAttempts = 0;
    let symphogearZesshoBattleWins = 0;
    let symphogearGoldenZesshoGames = 0;
    let lycorisCz = null;
    let lycorisRushRoute = null;
    let lycorisRush20Won = false;
    let lycorisNormalBonusCount = 0;
    let lycorisPoints = 0;
    let lycorisStResets = 0;
    let lycorisUpperCzAttempts = 0;
    let lycorisUpperCzWins = 0;
    let lycorisUpperSections = 0;
    let lycorisUpperBonusCount = 0;
    let lycorisLegendaryAward = 0;
    let kanokariCz = null;
    let kanokariRegCount = 0;
    let kanokariBigCount = 0;
    let kanokariDreamCount = 0;
    let kanokariEpisodeCount = 0;
    let kanokariOneGameAttempts = 0;
    let kanokariOneGameWins = 0;
    let kanokariNormalStocks = 0;
    let kanokariLoveStocks = 0;
    let kanokariReturnAttempts = 0;
    let kanokariReturnWins = 0;
    let kanokariYumekanoEntries = 0;
    let kanokariDreamTimeCount = 0;
    let kanokariSDreamTimeCount = 0;
    let kanokariAllLoveCount = 0;
    let kanokariMaxChain = 0;
    let aobutaStRounds = 0;
    let aobutaVCount = 0;
    let aobutaDreamBurstCount = 0;
    let aobutaUpperCzAttempts = 0;
    let aobutaUpperCzWins = 0;
    let aobutaUpperStLoops = 0;
    let bofuriCz = null;
    let bofuriBonusCount = 0;
    let bofuriDefenseLoops = 0;
    let bofuriMaxLevel = 0;
    let bofuriDefensePoints = 0;
    let bofuriAngelCount = 0;
    let bofuriViolenceCount = 0;
    let azurBonus = null;
    let azurFactions = 0;
    let azurBattles = 0;
    let azurWins = 0;
    let azurGameAddTotal = 0;
    let azurGatherBonuses = 0;
    let azurAmagiAttempts = 0;
    let azurAmagiWins = 0;
    let azurUpperLoops = 0;
    let magiaBonus = null;
    let magiaAttackTotal = 0;
    let magiaStoryCount = 0;
    let magiaSpecialStories = 0;
    let magiaConnectAttempts = 0;
    let magiaConnectWins = 0;
    let magiaConnectGames = 0;
    let magiaBonusRewards = 0;
    let magiaBattleRewards = 0;
    let magiaSetContinues = 0;
    let magiaUpperSections = 0;
    let toaruEntry = null;
    let toaruBattles = 0;
    let toaruBattleWins = 0;
    let toaruChargeCount = 0;
    let toaruChargeGames = 0;
    let toaruPlusActionCount = 0;
    let toaruPlusActionGames = 0;
    let toaruFiammaAttempts = 0;
    let toaruFiammaWins = 0;
    let darlingEntry = null;
    let darlingInitialBonus = null;
    let darlingHighBonuses = 0;
    let darlingFranxxBonuses = 0;
    let darlingBonusAwards = 0;
    let darlingBeatEntries = 0;
    let darlingBeatAdds = 0;
    let darlingMaxBeatLevel = 0;
    let darlingTakeouts = 0;
    let darlingClimaxx = false;
    if (sim.basiliskTenzenFlow) {
      basiliskBc = weighted(sim.basiliskBcTypes || [[{ key: "hetero", label: "異色BC", games: 16, award: 30 }, 1]]);
      triggerSucceeded = true;
      const basiliskBtChance = basiliskBc.key === "episode" || basiliskBc.key === "premium"
        ? 1
        : basiliskBc.key === "same"
          ? Math.max(0.50, triggerSuccess)
          : triggerSuccess;
      entered = Math.random() < basiliskBtChance;
      const bcAward = Math.max(0, Number(basiliskBc.award) || 0);
      payout = Math.min(bcAward, SLOT_COMPLETE_LIMIT);
      entryBonus = { ...basiliskBc, payout: bcAward, atChance: basiliskBtChance, outcome: entered ? "BT当選" : "BT非当選" };
      atGamesTotal += Number(basiliskBc.games) || 16;
      atEvents.push({ kind: "entry-bonus", label: basiliskBc.label, games: basiliskBc.games, award: payout, cumulative: payout, atChance: entryBonus.atChance, outcome: entryBonus.outcome });
      flow[0] = `${games}Gで${basiliskBc.label}`;
      flow.push(`${basiliskBc.label} ${basiliskBc.games}G・${entryBonus.outcome}`);
    }
    if (sim.goblinSlayerFlow) {
      goblinCz = weighted(sim.goblinCzRoutes || [[{ key: "mission", label: "ゴブリンスレイヤーミッション", games: 12, chance: 0.33 }, 1]]);
      triggerSucceeded = Math.random() < Math.max(0, Math.min(1, Number(goblinCz.chance) || 0));
      entered = triggerSucceeded;
      flow[0] = `${games}Gで${goblinCz.label}`;
    }
    if (sim.assaultLilyFlow) {
      assaultEntry = weighted(sim.assaultEntryRoutes || [[{ key: "direct", label: "AT直撃", games: 1, chance: 1 }, 1]]);
      entered = Math.random() < Math.max(0, Math.min(1, Number(assaultEntry.chance) || 0));
      triggerSucceeded = entered;
      flow[0] = `${games}Gで${assaultEntry.label}`;
      if (assaultEntry.key === "bouquet") {
        const bonusPayout = Math.max(0, Number(assaultEntry.payout) || 88);
        payout = Math.min(bonusPayout, SLOT_COMPLETE_LIMIT);
        entryBonus = { label: assaultEntry.label, payout: bonusPayout, games: 25, averagePayout: bonusPayout, atChance: Number(assaultEntry.chance) || 0.29, outcome: entered ? "RUSH突破" : "RUSH非突破" };
        atGamesTotal += 25;
        bonusCount += 1;
        bonusPayoutTotal += bonusPayout;
        atEvents.push({ kind: "entry-bonus", label: assaultEntry.label, games: 25, award: bonusPayout, cumulative: payout, atChance: Number(assaultEntry.chance) || 0.29, outcome: entryBonus.outcome });
        flow.push(`${assaultEntry.label} 約${yen.format(bonusPayout)}枚・${entryBonus.outcome}`);
      } else if (assaultEntry.key === "schutzengel" && !entered) {
        flow.push("シュッツエンゲルCZ失敗 → 天上ノ庭");
      }
    }
    if (sim.dumbbellFlow) {
      dumbbellCz = weighted(sim.dumbbellCzRoutes || [[{ key: "front", label: "前半パート終了", games: 10, chance: 0 }, 1]]);
      triggerSucceeded = Math.random() < Math.max(0, Math.min(1, Number(dumbbellCz.chance) || 0));
      entered = triggerSucceeded;
      flow[0] = `${games}GでMUSCLE ZONE・${dumbbellCz.label}`;
    }
    if (sim.lycorisFlow) {
      lycorisCz = weighted(sim.lycorisCzRoutes || [[{ key: "opposite", label: "オポジットバトル", games: 10, chance: 0.53 }, 1]]);
      triggerSucceeded = Math.random() < Math.max(0, Math.min(1, Number(lycorisCz.chance) || 0));
      entered = triggerSucceeded;
      flow[0] = `${games}Gで${lycorisCz.label}`;
    }
    if (sim.kanokariFlow) {
      kanokariCz = weighted(sim.kanokariCzRoutes || [[{ key: "rental", label: "レンカノCHALLENGE", games: 15, chance: 0.56 }, 1]]);
      triggerSucceeded = Math.random() < Math.max(0, Math.min(1, Number(kanokariCz.chance) || 0));
      entered = triggerSucceeded;
      flow[0] = `${games}Gで${kanokariCz.label}`;
    }
    if (sim.aobutaFlow) {
      triggerSucceeded = true;
      entered = true;
      flow[0] = `${games}Gで青春BONUS`;
    }
    if (sim.darlingFranxxFlow) {
      darlingEntry = weighted(sim.darlingEntryRoutes || [[{ key: "connect", label: "コネクトチャンス", games: 5, chance: 0.46 }, 1]]);
      triggerSucceeded = Math.random() < Math.max(0, Math.min(1, Number(darlingEntry.chance) || 0.46));
      entered = false;
      flow[0] = `${games}Gで${darlingEntry.label}`;
      atEvents.push({ kind: "darling-cz", label: darlingEntry.label, entryType: darlingEntry.key, games: Number(darlingEntry.games) || 5, chance: (Number(darlingEntry.chance) || 0.46) * 100, success: triggerSucceeded, cumulative: 0 });
      if (triggerSucceeded) {
        darlingInitialBonus = weighted(sim.darlingInitialBonuses || [[{ key: "reg", label: "レギュラーボーナス", games: 8, payout: 40, highChance: 0.22 }, 1]]);
        entered = Math.random() < Math.max(0, Math.min(1, Number(darlingInitialBonus.highChance) || 0));
        const regUpgraded = darlingInitialBonus.key === "reg" && entered;
        const initialAward = regUpgraded ? 100 : Math.max(0, Number(darlingInitialBonus.payout) || 40);
        const initialLabel = regUpgraded ? "レギュラー→ダーリン・イン・ザ・ボーナス" : darlingInitialBonus.label;
        payout = Math.min(initialAward, SLOT_COMPLETE_LIMIT);
        atGamesTotal += Number(darlingInitialBonus.games) || 8;
        bonusCount += 1;
        bonusPayoutTotal += initialAward;
        darlingBonusAwards += initialAward;
        entryBonus = { ...darlingInitialBonus, label: initialLabel, payout: initialAward, outcome: entered ? "BONUS高確突入" : "BONUS終了" };
        atEvents.push({ kind: "darling-initial-bonus", label: initialLabel, bonusType: darlingInitialBonus.key, games: regUpgraded ? 20 : Number(darlingInitialBonus.games) || 8, award: initialAward, cumulative: payout, highChance: (Number(darlingInitialBonus.highChance) || 0) * 100, entered, upgraded: regUpgraded });
        flow.push(`${initialLabel} +${initialAward}枚・${entered ? "BONUS高確へ" : "終了"}`);
      } else {
        flow.push(`${darlingEntry.label}失敗`);
      }
    }
    if (sim.toaruIndex2Flow) {
      toaruEntry = weighted(sim.toaruEntryRoutes || [[{ key: "railgun", label: "レールガンチャンス", games: 10, chance: 0.52 }, 1]]);
      triggerSucceeded = true;
      entered = Math.random() < Math.max(0, Math.min(1, Number(toaruEntry.chance) || 0.52));
      flow[0] = `${games}Gで${toaruEntry.label}`;
      atEvents.push({ kind: "toaru-cz", label: toaruEntry.label, entryType: toaruEntry.key, games: Number(toaruEntry.games) || 10, chance: (Number(toaruEntry.chance) || 0.52) * 100, success: entered, cumulative: 0 });
      flow.push(`${toaruEntry.label} ${entered ? "成功・幻想殺しRUSH" : "失敗"}`);
    }
    if (sim.magiaRecordFlow) {
      magiaBonus = weighted(sim.magiaBonusTypes || [[{ key: "big", label: "BIG BONUS", games: 30, payout: 78, atChance: 0.40 }, 1]]);
      triggerSucceeded = true;
      entered = Math.random() < Math.max(0, Math.min(1, Number(magiaBonus.atChance) || 0.40));
      const bonusAward = Math.max(0, Number(magiaBonus.payout) || 0);
      payout = Math.min(bonusAward, SLOT_COMPLETE_LIMIT);
      entryBonus = { ...magiaBonus, payout: bonusAward, outcome: entered ? "AT当選" : "AT非当選" };
      atGamesTotal += Number(magiaBonus.games) || 30;
      bonusCount += 1;
      bonusPayoutTotal += bonusAward;
      atEvents.push({ kind: "magia-bonus", label: magiaBonus.label, bonusType: magiaBonus.key, games: Number(magiaBonus.games) || 30, award: bonusAward, cumulative: payout, chance: (Number(magiaBonus.atChance) || 0.40) * 100, entered });
      flow[0] = `${games}Gで${magiaBonus.label}`;
      flow.push(`${magiaBonus.label} +${yen.format(bonusAward)}枚・${entered ? "AT当選" : "AT非当選"}`);
    }
    if (sim.azurLaneFlow) {
      azurBonus = weighted(sim.azurBonusTypes || [[{ key: "white", label: "白7 海戦BONUS", games: 20, payout: 100, atChance: 0.263 }, 1]]);
      triggerSucceeded = true;
      entered = Math.random() < Math.max(0, Math.min(1, Number(azurBonus.atChance) || 0.263));
      const bonusAward = Math.max(0, Number(azurBonus.payout) || 100);
      payout = Math.min(bonusAward, SLOT_COMPLETE_LIMIT);
      entryBonus = { ...azurBonus, award: bonusAward, outcome: entered ? "AT当選" : "AT非当選" };
      atGamesTotal += Number(azurBonus.games) || 20;
      bonusCount += 1;
      bonusPayoutTotal += bonusAward;
      atEvents.push({ kind: "azur-bonus", label: azurBonus.label, bonusType: azurBonus.key, games: Number(azurBonus.games) || 20, award: bonusAward, cumulative: payout, chance: (Number(azurBonus.atChance) || 0.263) * 100, entered });
      flow[0] = `${games}Gで${azurBonus.label}`;
      flow.push(`${azurBonus.label} 平均約${yen.format(bonusAward)}枚・${entered ? "AT当選" : "AT非当選"}`);
    }
    if (sim.bofuriFlow) {
      bofuriCz = weighted(sim.bofuriCzRoutes || [[{ key: "admin", label: "運営高確率", games: 15, chance: 0.50 }, 1]]);
      triggerSucceeded = Math.random() < Math.max(0, Math.min(1, Number(bofuriCz.chance) || 0.50));
      entered = triggerSucceeded;
      flow[0] = `${games}Gで${bofuriCz.label}`;
      atEvents.push({ kind: "bofuri-cz", label: bofuriCz.label, games: Number(bofuriCz.games) || 15, chance: (Number(bofuriCz.chance) || 0.50) * 100, success: triggerSucceeded, initial: true, cumulative: 0 });
    }
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
      if (!sim.okidokiGoldFlow) flow.push(`${sim.mainLabel}突入`);
      let rushSetCount = 1;
      if (sim.okidokiGoldFlow) {
        payout = entryPayout;
        basePayout = 0;
        let chainCount = 0;
        let lastWasBig = false;
        const modeLabels = { normal: "通常モード", heaven: "天国モード", doki: "ドキドキモード", super: "超ドキドキモード", guarantee: "保証モード", gold: "金ドキモード", god: "GODモード" };
        const modeRanks = { normal: 0, heaven: 1, guarantee: 2, gold: 3, doki: 4, super: 5, god: 6 };
        let highestRank = 0;
        const recordMode = mode => {
          const rank = modeRanks[mode] || 0;
          if (rank > highestRank) {
            highestRank = rank;
            okidokiHighestMode = modeLabels[mode] || "通常";
          }
          if (mode === "gold" || rank >= modeRanks.doki) upper = true;
        };
        const appendBonus = (source, { forceBig = false, oneGame = false, mode = "normal", initial = false } = {}) => {
          const isBig = forceBig || Math.random() < (initial ? Number(sim.okidokiInitialBigChance) || 0.55 : Number(sim.okidokiChainBigChance) || 0.72);
          const bonusGames = isBig ? 70 : 30;
          const requestedAward = isBig ? 210 : 90;
          const award = Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout));
          chainCount += 1;
          payout += award;
          bonusCount += 1;
          bonusPayoutTotal += award;
          atGamesTotal += bonusGames;
          if (isBig) okidokiBigCount += 1;
          else okidokiRegCount += 1;
          if (oneGame) okidokiOneGameCount += 1;
          okidokiMaxChain = Math.max(okidokiMaxChain, chainCount);
          lastWasBig = isBig;
          recordMode(mode);
          atEvents.push({ kind: "okidoki-bonus", label: isBig ? "BIG BONUS" : "REG BONUS", bonusType: isBig ? "BIG" : "REG", games: bonusGames, award, cumulative: payout, chain: chainCount, source, oneGame, mode: modeLabels[mode] || source });
          flow.push(`${chainCount}連目 ${isBig ? "BIG" : "REG"} +${award}枚・${source}${oneGame ? "・1G連" : ""}`);
        };
        const appendZone = ({ mode, continued, source, chance, gold = false, guarantee = false, oneGame = false }) => {
          const zoneGames = oneGame ? 1 : continued ? randomInt(1, 32) : 32;
          atGamesTotal += zoneGames;
          atEvents.push({ kind: "okidoki-zone", label: "BONUS後32G", games: zoneGames, cumulative: payout, chain: chainCount, mode: modeLabels[mode] || mode, continued, source, chance: chance * 100, gold, guarantee, oneGame });
          if (!continued) flow.push(`${chainCount}連後 32G終了`);
          return zoneGames;
        };

        okidokiGodMode = Math.random() < (Number(sim.okidokiGodChance) || 0);
        let mode = okidokiGodMode ? "god" : weighted(sim.okidokiEntryModes || [["normal", 1]]);
        appendBonus("初当り", { forceBig: okidokiGodMode, mode, initial: true });
        if (okidokiGodMode && payout < SLOT_COMPLETE_LIMIT) {
          recordMode("god");
          atEvents.push({ kind: "okidoki-god", label: "GODモード", games: 1, stocks: 4, cumulative: payout });
          flow.push("GODモード・BIG5連以上濃厚");
          for (let stock = 0; stock < 4 && payout < SLOT_COMPLETE_LIMIT; stock += 1) {
            appendZone({ mode: "god", continued: true, source: "GODストック", chance: 1, oneGame: true });
            appendBonus("GODストック", { forceBig: true, oneGame: true, mode: "god" });
          }
          mode = weighted([["heaven", 0.50], ["doki", 0.30], ["super", 0.20]]);
        }

        while (chainCount < 50 && payout < SLOT_COMPLETE_LIMIT) {
          if (mode === "normal") {
            appendZone({ mode, continued: false, source: "通常モード", chance: 0 });
            break;
          }
          if (mode === "guarantee") {
            if (Math.random() < (Number(sim.okidokiGoldChance) || 0.15)) {
              okidokiGoldCount += 1;
              recordMode("gold");
              appendZone({ mode: "gold", continued: true, source: "金ドキ移行", chance: Number(sim.okidokiGoldChance) || 0.15, gold: true });
              appendBonus("金ドキ・次回天国以上", { forceBig: true, mode: "gold" });
              mode = weighted([["heaven", 0.78], ["doki", 0.18], ["super", 0.04]]);
              continue;
            }
            appendZone({ mode, continued: false, source: "保証終了", chance: 0 });
            break;
          }

          const continueChance = Math.max(0, Math.min(1, Number(sim.okidokiModeRates?.[mode]) || 0));
          const continued = Math.random() < continueChance;
          if (continued) {
            const oneGame = lastWasBig && Math.random() < (Number(sim.okidokiOneGameChance) || 0.10);
            appendZone({ mode, continued: true, source: oneGame ? "BONUS中1G連告知" : modeLabels[mode], chance: continueChance, oneGame });
            cycleContinues += 1;
            appendBonus(oneGame ? "1G連" : modeLabels[mode], { oneGame, mode });
            continue;
          }

          if (mode === "doki" || mode === "super") {
            okidokiGuaranteeCount += 1;
            appendZone({ mode: "guarantee", continued: true, source: `${modeLabels[mode]}転落→保証`, chance: 1, guarantee: true });
            cycleContinues += 1;
            appendBonus("保証モード", { mode: "guarantee" });
            mode = "guarantee";
            continue;
          }

          if (Math.random() < (Number(sim.okidokiGoldChance) || 0.15)) {
            okidokiGoldCount += 1;
            recordMode("gold");
            appendZone({ mode: "gold", continued: true, source: "非有利区間→金ドキ", chance: Number(sim.okidokiGoldChance) || 0.15, gold: true });
            cycleContinues += 1;
            appendBonus("金ドキ・次回天国以上", { forceBig: true, mode: "gold" });
            mode = weighted([["heaven", 0.78], ["doki", 0.18], ["super", 0.04]]);
            continue;
          }

          appendZone({ mode, continued: false, source: `${modeLabels[mode]}終了`, chance: continueChance });
          break;
        }
        cycleRounds = chainCount;
        basePayout = payout - entryPayout;
      } else if (sim.uminchuFlow) {
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
      } else if (sim.goblinSlayerFlow) {
        payout = entryPayout;
        basePayout = 0;
        goblinLoopMode = Number(weighted(sim.goblinLoopModes || [[0.52, 1]])) || 0.52;
        let upperEntry = Math.random() < (Number(sim.goblinDirectUpperChance) || (1 / 70));
        if (upperEntry) {
          upper = true;
          atEvents.push({ kind: "goblin-upper-entry", label: "ULTIMATE LOOP直行", games: 1, cumulative: payout, source: "AT初当り時フリーズ" });
          flow.push("AT初当り時フリーズ → ULTIMATE LOOP直行");
        }

        while (!upper && goblinAtSets < 8 && payout < SLOT_COMPLETE_LIMIT) {
          goblinAtSets += 1;
          const variation = Number(weighted([[-10, 0.20], [0, 0.60], [10, 0.20]])) || 0;
          const continueRate = Math.max(30, Math.min(100, Math.round((goblinLoopMode * 100 + variation) / 10) * 10));
          const orbGroups = Math.max(0, Math.round((continueRate - 30) / 10));
          goblinMaxContinueRate = Math.max(goblinMaxContinueRate, continueRate);
          const setAward = Math.max(0, Math.min(slotAwardForGames(100, 2.7, 0), SLOT_COMPLETE_LIMIT - payout));
          payout += setAward;
          atGamesTotal += 100;
          atEvents.push({ kind: "goblin-set", label: sim.mainLabel, games: 100, award: setAward, cumulative: payout, set: goblinAtSets, loopMode: goblinLoopMode * 100, orbGroups, orbs: orbGroups * 3, continueRate });
          flow.push(`${sim.mainLabel} SET ${goblinAtSets}・オーブ${orbGroups * 3}個・最終${continueRate}%`);

          if (Math.random() < (Number(sim.goblinBonusChance) || 0.18) && payout < SLOT_COMPLETE_LIMIT) {
            const bonusAward = Math.max(0, Math.min(slotAwardForGames(20, 2.7, 0), SLOT_COMPLETE_LIMIT - payout));
            const addAward = Math.max(0, Math.min(slotAwardForGames(10, 2.7, 0), SLOT_COMPLETE_LIMIT - payout - bonusAward));
            payout += bonusAward + addAward;
            atGamesTotal += 30;
            goblinBonusCount += 1;
            bonusCount += 1;
            bonusPayoutTotal += bonusAward;
            addOnCount += 1;
            addOnGamesTotal += 10;
            atEvents.push({ kind: "goblin-bonus", label: "ゴブリンスレイヤーBONUS", games: 20, gameAdd: 10, bonusAward, award: bonusAward + addAward, cumulative: payout, number: goblinBonusCount });
            flow.push(`ゴブリンスレイヤーBONUS +${bonusAward}枚・AT +10G`);
          }

          const lordBattle = goblinAtSets === 8 || ((goblinAtSets === 3 || goblinAtSets === 5) && Math.random() < 0.20);
          if (lordBattle) goblinLordBattles += 1;
          const continued = goblinAtSets === 8 || Math.random() < continueRate / 100;
          let upperHit = false;
          if (continued && goblinAtSets === 8) upperHit = true;
          else if (continued && lordBattle && Math.random() < 0.50) upperHit = true;
          atGamesTotal += 5;
          atEvents.push({ kind: "goblin-judgement", label: "JUDGEMENT", enemy: lordBattle ? "ゴブリンロード" : "ホブゴブリン", games: 5, cumulative: payout, set: goblinAtSets, chance: continueRate, continued, upperHit });
          flow.push(`JUDGEMENT SET ${goblinAtSets} ${continued ? "撃破" : "敗北"}${upperHit ? "・ULTIMATE LOOP" : ""}`);
          if (!continued) break;
          cycleContinues += 1;
          if (upperHit) {
            upper = true;
            break;
          }
          const reward = goblinAtSets === 3 || goblinAtSets === 5
            ? weighted([["大連撃モード", 0.35], ["連撃モード", 0.65]])
            : weighted([["大連撃モード", 0.08], ["連撃モード", 0.92]]);
          atGamesTotal += 5;
          atEvents.push({ kind: "goblin-reward", label: "報酬ジャッジ", reward, games: 5, cumulative: payout, set: goblinAtSets });
          flow.push(`報酬ジャッジ ${reward}`);
        }

        if (upper && payout < SLOT_COMPLETE_LIMIT) {
          let upperActive = true;
          while (upperActive && upperLoops < 30 && payout < SLOT_COMPLETE_LIMIT) {
            upperLoops += 1;
            const award = Math.max(0, Math.min(slotAwardForGames(100, 5.0, 0), SLOT_COMPLETE_LIMIT - payout));
            payout += award;
            upperPayoutTotal += award;
            atGamesTotal += 100;
            let bonusAward = 0;
            if (Math.random() < 0.20 && payout < SLOT_COMPLETE_LIMIT) {
              bonusAward = Math.max(0, Math.min(slotAwardForGames(20, 5.0, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += bonusAward;
              upperPayoutTotal += bonusAward;
              atGamesTotal += 20;
              goblinBonusCount += 1;
              bonusCount += 1;
              bonusPayoutTotal += bonusAward;
            }
            atEvents.push({ kind: "goblin-upper-set", label: sim.upperLabel, games: 100, award: award + bonusAward, baseAward: award, bonusAward, cumulative: payout, set: upperLoops });
            upperActive = payout < SLOT_COMPLETE_LIMIT && Math.random() < (Number(sim.upperContinue) || 0.82);
            atGamesTotal += 5;
            atEvents.push({ kind: "goblin-upper-judge", label: "ULTIMATE JUDGEMENT", games: 5, cumulative: payout, set: upperLoops, continued: upperActive, chance: (Number(sim.upperContinue) || 0.82) * 100 });
            flow.push(`${sim.upperLabel} SET ${upperLoops}・${award + bonusAward}枚・${upperActive ? "継続" : "終了"}`);
          }
        }
        cycleRounds = goblinAtSets;
        basePayout = payout - entryPayout;
      } else if (sim.assaultLilyFlow) {
        payout = entryPayout;
        basePayout = 0;
        const rewardTables = {
          normal: [["huge", 0.42], ["charm", 0.25], ["neunwelt", 0.08], ["lunatic", 0.18], ["spiral", 0.07]],
          upper: [["huge", 0.28], ["charm", 0.24], ["neunwelt", 0.14], ["lunatic", 0.22], ["spiral", 0.12]]
        };
        const appendReward = (rewardKey, upperMode, balanceBefore) => {
          let label = "ヒュージバトル";
          let rewardGames = 3;
          let award = 0;
          let detail = "1セット3G";
          if (rewardKey === "huge") {
            const sets = Number(weighted(upperMode ? [[1, 0.35], [2, 0.30], [3, 0.22], [6, 0.13]] : [[1, 0.50], [2, 0.30], [3, 0.16], [6, 0.04]])) || 1;
            rewardGames = sets * 3;
            award = sets * (upperMode ? 80 : 60);
            detail = `${sets}セット×3G・3の倍数セットは強報酬チャンス`;
          } else if (rewardKey === "charm") {
            label = "チャームストライク";
            rewardGames = 9;
            award = Number(weighted(upperMode ? [[150, 0.40], [270, 0.38], [450, 0.22]] : [[90, 0.48], [150, 0.37], [270, 0.15]])) || 90;
            detail = "9G・小役成立で上乗せ";
          } else if (rewardKey === "neunwelt") {
            label = "ノインヴェルト戦術";
            rewardGames = 1;
            award = Number(weighted(upperMode ? [[200, 0.35], [500, 0.34], [1000, 0.23], [3000, 0.08]] : [[200, 0.60], [500, 0.27], [1000, 0.11], [3000, 0.02]])) || 200;
            detail = "1G完結・200〜3000枚";
          } else if (rewardKey === "lunatic") {
            label = "ルナティックトランサー";
            rewardGames = 10;
            award = Number(weighted(upperMode ? [[250, 0.40], [500, 0.38], [1000, 0.22]] : [[150, 0.52], [250, 0.31], [500, 0.14], [1000, 0.03]])) || 150;
            detail = "10G＋α・小役が続くほど上乗せ";
          } else if (rewardKey === "spiral") {
            label = "アサルトスパイラル";
            const rounds = Number(weighted(upperMode ? [[2, 0.30], [3, 0.35], [4, 0.22], [5, 0.13]] : [[2, 0.50], [3, 0.32], [4, 0.14], [5, 0.04]])) || 2;
            rewardGames = rounds * 3;
            award = rounds * (upperMode ? 300 : 220);
            detail = `${rounds}回の特化ゾーンループ`;
          }
          award = Math.max(0, Math.min(award, SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += rewardGames;
          assaultRewardCount += 1;
          addOnCount += 1;
          addOnTotal += award;
          coinAddOnCount += 1;
          coinAddOnTotal += award;
          assaultMaxAddOn = Math.max(assaultMaxAddOn, award);
          atEvents.push({ kind: "assault-reward", rewardKey, label, games: rewardGames, award, cumulative: payout, upper: upperMode, detail, balanceBefore, rewardNumber: assaultRewardCount });
          flow.push(`${label} +${yen.format(award)}枚`);
          return award;
        };
        const playDifferenceRush = upperMode => {
          let remainingCoins = Math.max(1, Number(upperMode ? sim.assaultUpperInitialCoins : sim.assaultInitialCoins) || (upperMode ? 200 : 150));
          const initialAward = Math.max(0, Math.min(remainingCoins, SLOT_COMPLETE_LIMIT - payout));
          payout += initialAward;
          atEvents.push({ kind: "assault-rush-start", label: upperMode ? sim.upperLabel : sim.mainLabel, games: 1, award: initialAward, cumulative: payout, remainingCoins, upper: upperMode });
          flow.push(`${upperMode ? sim.upperLabel : sim.mainLabel} 初期${yen.format(initialAward)}枚`);
          let localBosses = 0;
          const maxBosses = upperMode ? 10 : 8;
          while (remainingCoins > 0 && localBosses < maxBosses && payout < SLOT_COMPLETE_LIMIT) {
            const segmentTarget = Number(weighted([[35, 0.28], [70, 0.34], [105, 0.26], [175, 0.12]])) || 70;
            const keepForFirstBattle = localBosses === 0 && remainingCoins > 35 ? 35 : 0;
            const spentCoins = Math.max(1, Math.min(segmentTarget, Math.max(1, remainingCoins - keepForFirstBattle)));
            const segmentGames = Math.max(1, Math.round(spentCoins / 3.5));
            remainingCoins = Math.max(0, remainingCoins - spentCoins);
            atGamesTotal += segmentGames;
            atEvents.push({ kind: "assault-rush", label: upperMode ? sim.upperLabel : sim.mainLabel, games: segmentGames, spentCoins, remainingCoins, cumulative: payout, upper: upperMode, section: localBosses + 1 });
            if (remainingCoins <= 0) break;

            localBosses += 1;
            assaultBossBattles += 1;
            const battleGames = Math.random() < 0.5 ? 4 : 5;
            const bossChance = Math.max(0, Math.min(1, Number(upperMode ? sim.assaultUpperBossChance : sim.assaultBossChance) || (upperMode ? 0.72 : 0.56)));
            const won = Math.random() < bossChance;
            if (won) assaultBossWins += 1;
            atGamesTotal += battleGames;
            atEvents.push({ kind: "assault-boss", label: "ボスヒュージ襲来", games: battleGames, chance: bossChance * 100, won, cumulative: payout, remainingCoins, upper: upperMode, battle: assaultBossBattles });
            flow.push(`ボスヒュージ襲来 ${won ? "撃破" : "敗北"}`);
            if (!won) continue;

            const rewardKey = weighted(rewardTables[upperMode ? "upper" : "normal"]);
            remainingCoins += appendReward(rewardKey, upperMode, remainingCoins);
            if (upperMode) {
              upperLoops += 1;
              continue;
            }

            const upperTicketChance = Math.max(0, Math.min(1, Number(sim.assaultUpperCzChance) || 0.16)) + (rewardKey === "spiral" ? 0.16 : rewardKey === "neunwelt" ? 0.08 : 0);
            if (Math.random() >= Math.min(0.70, upperTicketChance)) continue;
            const upperCzTypes = [{ label: "メモリア", chance: 0.25 }, { label: "討伐", chance: 0.40 }, { label: "殲滅", chance: 0.60 }, { label: "Edel Lilie", chance: 1 }];
            const upperCz = upperCzTypes[Math.min(assaultUpperCzAttempts, upperCzTypes.length - 1)];
            assaultUpperCzAttempts += 1;
            assaultUpperCz = upperCz.label;
            const success = Math.random() < upperCz.chance;
            if (success) assaultUpperCzSuccesses += 1;
            atGamesTotal += 5;
            atEvents.push({ kind: "assault-upper-cz", label: sim.upperChallenge, czType: upperCz.label, games: 5, chance: upperCz.chance * 100, success, cumulative: payout, attempt: assaultUpperCzAttempts });
            flow.push(`${sim.upperChallenge} ${upperCz.label}・${success ? "成功" : "失敗"}`);
            if (success) {
              upper = true;
              break;
            }
          }
        };

        playDifferenceRush(false);
        if (upper && payout < SLOT_COMPLETE_LIMIT) playDifferenceRush(true);
        cycleRounds = assaultBossBattles;
        cycleContinues = assaultBossWins;
        basePayout = payout - entryPayout;
      } else if (sim.kaguyaFlow) {
        payout = entryPayout;
        basePayout = 0;
        let chain = 0;
        let pendingStocks = 0;
        let active = true;
        let nextSource = "CZ突破";
        let nextBonus = weighted(sim.kaguyaInitialBonuses || [[{ key: "reg", label: "REGULAR BONUS", games: 10, payout: 83, oneGameChance: 0.12 }, 1]]);
        const appendBonus = (bonus, source) => {
          chain += 1;
          const award = Math.max(0, Math.min(Number(bonus.payout) || 0, SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += Number(bonus.games) || 1;
          bonusCount += 1;
          bonusPayoutTotal += award;
          if (bonus.key === "reg") kaguyaRegCount += 1;
          else if (bonus.key === "super") kaguyaSuperCount += 1;
          else kaguyaBigCount += 1;
          atEvents.push({ kind: "kaguya-bonus", label: bonus.label, bonusType: bonus.key, games: Number(bonus.games) || 1, award, cumulative: payout, chain, source, oneGameChance: (Number(bonus.oneGameChance) || 0) * 100 });
          flow.push(`${chain}連目 ${bonus.label} +${yen.format(award)}枚`);
          return bonus;
        };

        while (active && chain < 30 && payout < SLOT_COMPLETE_LIMIT) {
          const bonus = appendBonus(nextBonus, nextSource);
          const extraChance = bonus.key === "super" ? Math.max(0.02, Number(sim.kaguyaExtraChance) || 0.015) : bonus.key === "big" ? Number(sim.kaguyaExtraChance) || 0.015 : 0;
          if (extraChance && Math.random() < extraChance && payout < SLOT_COMPLETE_LIMIT) {
            upper = true;
            let extraActive = true;
            while (extraActive && upperLoops < 12 && payout < SLOT_COMPLETE_LIMIT) {
              const extraGames = Math.random() < 0.5 ? 50 : 100;
              const extraAward = Math.max(0, Math.min(slotAwardForGames(extraGames, 9.0, 0), SLOT_COMPLETE_LIMIT - payout));
              upperLoops += 1;
              kaguyaExtraGames += extraGames;
              payout += extraAward;
              upperPayoutTotal += extraAward;
              atGamesTotal += extraGames;
              atEvents.push({ kind: "kaguya-extra", label: sim.upperLabel, games: extraGames, award: extraAward, cumulative: payout, set: upperLoops });
              flow.push(`${sim.upperLabel} ${extraGames}G・+${extraAward}枚`);
              extraActive = payout < SLOT_COMPLETE_LIMIT && Math.random() < (Number(sim.upperContinue) || 0.80);
            }
            active = false;
            break;
          }

          const oneGameChance = Math.max(0, Math.min(1, chain >= 5 && bonus.key !== "reg" ? 0.60 : Number(bonus.oneGameChance) || 0));
          let oneGameHit = pendingStocks > 0 || Math.random() < oneGameChance;
          if (pendingStocks > 0) pendingStocks -= 1;
          if (oneGameHit && bonus.key !== "reg" && Math.random() < (Number(sim.specialChance) || 0.10)) {
            const special = weighted([[{ label: "白銀覚醒", games: 8 }, 0.45], [{ label: "ガチきゅんPUSH", games: 5 }, 0.35], [{ label: "チカブレイク", games: 10 }, 0.20]]);
            const stocks = Number(weighted([[1, 0.58], [2, 0.27], [3, 0.11], [5, 0.04]])) || 1;
            pendingStocks += stocks;
            kaguyaSpecialCount += 1;
            kaguyaStockCount += stocks;
            atGamesTotal += special.games;
            atEvents.push({ kind: "kaguya-special", label: special.label, games: special.games, stocks, cumulative: payout, number: kaguyaSpecialCount });
            flow.push(`${special.label} BONUSストック${stocks}個`);
          }
          if (oneGameHit) {
            kaguyaOneGameCount += 1;
            atEvents.push({ kind: "kaguya-one-game", label: "1G連", games: 1, chance: oneGameChance * 100, success: true, cumulative: payout, chain });
            atGamesTotal += 1;
            nextBonus = weighted(sim.kaguyaChainBonuses || [[{ key: "big", label: "BIG BONUS", games: 30, payout: 270, oneGameChance: 0.45 }, 1]]);
            nextSource = pendingStocks > 0 ? "BONUSストック" : "1G連";
            continue;
          }

          const late = chain >= 5;
          const returnChance = Number(late ? sim.kaguyaLateReturnChance : sim.kaguyaReturnChance) || (late ? 0.50 : 0.25);
          const marriage = Math.random() < (Number(sim.upperChance) || 0.07);
          if (marriage) {
            kaguyaMarriageCount += 1;
            atGamesTotal += 32;
            atEvents.push({ kind: "kaguya-marriage", label: sim.upperChallenge, games: 32, chance: 100, success: true, cumulative: payout, number: kaguyaMarriageCount });
            flow.push(`${sim.upperChallenge} → SUPER BIG BONUS`);
            nextBonus = { key: "super", label: "SUPER BIG BONUS", games: 54, payout: 490, oneGameChance: 0.45 };
            nextSource = sim.upperChallenge;
            continue;
          }
          const returned = Math.random() < returnChance;
          const returnGames = returned ? randomInt(1, 100) : 100;
          atGamesTotal += returnGames;
          atEvents.push({ kind: "kaguya-return", label: "引き戻しチャンス", games: returnGames, chance: returnChance * 100, success: returned, cumulative: payout, chain, late });
          flow.push(`${chain}連後 引き戻し${returned ? `成功（${returnGames}G）` : "失敗（100G）"}`);
          if (!returned) {
            active = false;
            break;
          }
          kaguyaReturnCount += 1;
          nextBonus = weighted(sim.kaguyaChainBonuses || [[{ key: "big", label: "BIG BONUS", games: 30, payout: 270, oneGameChance: 0.45 }, 1]]);
          nextSource = `${returnGames}G引き戻し`;
        }
        cycleRounds = chain;
        cycleContinues = Math.max(0, chain - 1);
        basePayout = payout - entryPayout;
      } else if (sim.dumbbellFlow) {
        payout = entryPayout;
        basePayout = 0;
        let totalNormalGames = Math.max(30, Number(sim.dumbbellBaseGames) || 30);
        const plannedAdds = Number(weighted([[0, 0.38], [1, 0.37], [2, 0.18], [3, 0.07]])) || 0;
        atEvents.push({ kind: "dumbbell-at-start", label: sim.mainLabel, games: 30, award: 0, cumulative: payout, remaining: 30 });
        for (let index = 0; index < plannedAdds; index += 1) {
          const gameAdd = Number(weighted([[20, 0.62], [30, 0.23], [50, 0.11], [100, 0.04]])) || 20;
          totalNormalGames += gameAdd;
          dumbbellGameAddCount += 1;
          dumbbellGameAddTotal += gameAdd;
          addOnCount += 1;
          addOnGamesTotal += gameAdd;
          atEvents.push({ kind: "dumbbell-game-add", label: "レア役チャンス", games: 3, gameAdd, remaining: totalNormalGames, cumulative: payout, number: dumbbellGameAddCount });
          flow.push(`レア役チャンス +${gameAdd}G`);
        }
        dumbbellNormalGames = totalNormalGames;
        const normalAward = Math.max(0, Math.min(slotAwardForGames(totalNormalGames, 8.5, 0), SLOT_COMPLETE_LIMIT - payout));
        payout += normalAward;
        atGamesTotal += totalNormalGames + plannedAdds * 3;
        atEvents.push({ kind: "dumbbell-at-run", label: sim.mainLabel, games: totalNormalGames, award: normalAward, cumulative: payout, addedGames: dumbbellGameAddTotal });
        flow.push(`${sim.mainLabel} ${totalNormalGames}G・+${normalAward}枚`);

        let goldenTicket = totalNormalGames >= 120 || Math.random() < Math.min(0.72, Number(sim.upperChance) + plannedAdds * 0.16);
        if (goldenTicket && payout < SLOT_COMPLETE_LIMIT) {
          dumbbellGoldenChallenges += 1;
          const goldenSuccess = Math.random() < (Number(sim.dumbbellGoldenChallengeChance) || 0.56);
          atGamesTotal += 3;
          atEvents.push({ kind: "dumbbell-golden-challenge", label: sim.upperChallenge, games: 3, chance: 56, success: goldenSuccess, cumulative: payout, attempt: dumbbellGoldenChallenges });
          flow.push(`${sim.upperChallenge} ${goldenSuccess ? "成功" : "失敗"}`);
          upper = goldenSuccess;
        }

        let dumbbellUpperActive = upper;
        while (dumbbellUpperActive && upperLoops < 12 && payout < SLOT_COMPLETE_LIMIT) {
          dumbbellGoldenSuccesses += 1;
          const stocks = Math.max(1, Number(weighted(sim.dumbbellVStocks || [[4, 1]])) || 4);
          dumbbellVStockTotal += stocks;
          atGamesTotal += Number(sim.dumbbellGoldenTimeGames) || 5;
          atEvents.push({ kind: "dumbbell-golden-time", label: "ゴールデンタイム", games: 5, stocks, cumulative: payout, visit: dumbbellGoldenSuccesses });
          const stockAwards = Array.from({ length: stocks }, () => Number(weighted([[100, 0.35], [200, 0.30], [300, 0.20], [500, 0.12], [1000, 0.03]])) || 100);
          let initialCoins = stockAwards.reduce((sum, value) => sum + value, 0);
          const extraAdds = Number(weighted([[0, 0.55], [1, 0.32], [2, 0.11], [3, 0.02]])) || 0;
          const coinAdds = Array.from({ length: extraAdds }, () => Number(weighted([[100, 0.66], [200, 0.23], [300, 0.09], [500, 0.02]])) || 100);
          const requestedAward = initialCoins + coinAdds.reduce((sum, value) => sum + value, 0);
          const award = Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout));
          initialCoins = Math.min(initialCoins, award);
          const coinAdd = Math.max(0, award - initialCoins);
          payout += award;
          upperLoops += 1;
          upperPayoutTotal += award;
          dumbbellCoinAddTotal += coinAdd;
          coinAddOnCount += coinAdds.length;
          coinAddOnTotal += coinAdd;
          const upperGames = Math.max(1, Math.round(award / 8.5));
          atGamesTotal += upperGames;
          atEvents.push({ kind: "dumbbell-upper", label: sim.upperLabel, games: upperGames, award, initialCoins, coinAdd, stockAwards, coinAdds, cumulative: payout, set: upperLoops });
          flow.push(`${sim.upperLabel} ${stocks}V・+${award}枚`);
          if (payout >= SLOT_COMPLETE_LIMIT) break;
          dumbbellRisingChallenges += 1;
          const returned = Math.random() < (Number(sim.upperContinue) || 0.56);
          atGamesTotal += 3;
          atEvents.push({ kind: "dumbbell-rising", label: "ライジングアッパーチャレンジ", games: 3, chance: 56, success: returned, cumulative: payout, attempt: dumbbellRisingChallenges });
          flow.push(`ライジングアッパーチャレンジ ${returned ? "成功" : "失敗"}`);
          dumbbellUpperActive = returned;
        }
        cycleRounds = upperLoops;
        cycleContinues = dumbbellRisingChallenges ? Math.max(0, dumbbellGoldenSuccesses - 1) : 0;
        basePayout = payout - entryPayout;
      } else if (sim.shinEvaFlow) {
        payout = entryPayout;
        basePayout = 0;
        let operationActive = true;
        let pendingProgress = 0;
        let pendingV = 0;
        let sankiTicket = false;
        let operationNumber = 0;
        let operation = weighted(sim.shinEvaOperations || [[{ key: "paris", label: "パリ作戦", phases: 5 }, 1]]);
        const appendImpact = source => {
          atGamesTotal += 3;
          atEvents.push({ kind: "shin-eva-impact", label: "EVANGELION IMPACT", operation: operation.label, phases: operation.phases, games: 3, cumulative: payout, source });
          flow.push(`EVANGELION IMPACT → ${operation.label}（${operation.phases}段階）`);
        };
        appendImpact("初当り");

        while (operationActive && operationNumber < 18 && payout < SLOT_COMPLETE_LIMIT) {
          operationNumber += 1;
          shinEvaOperationRounds += 1;
          const requiredPhases = Math.max(1, Number(operation.phases) || 1);
          const stockGuaranteed = pendingV > 0 || pendingProgress >= requiredPhases;
          const success = stockGuaranteed || Math.random() < (Number(sim.shinEvaOperationContinue) || 0.72);
          if (pendingV > 0) pendingV -= 1;
          if (pendingProgress >= requiredPhases) pendingProgress -= requiredPhases;
          const reachedPhases = success ? requiredPhases : randomInt(0, Math.max(0, requiredPhases - 1));
          const phaseGames = Array.from({ length: Math.max(1, reachedPhases || 1) }, () => randomInt(2, 10));
          const operationGames = success ? phaseGames.reduce((sum, value) => sum + value, 0) : 10;
          shinEvaPhaseAdvances += reachedPhases;
          atGamesTotal += operationGames;
          atEvents.push({ kind: "shin-eva-operation", label: operation.label, games: operationGames, phases: requiredPhases, reachedPhases, success, stockGuaranteed, cumulative: payout, round: operationNumber });
          flow.push(`${operation.label} ${operationGames}G・${success ? "作戦成功" : "作戦失敗"}`);

          if (!success) {
            if (sankiTicket) {
              const stocks = Number(weighted([[2, 0.40], [3, 0.32], [4, 0.18], [5, 0.08], [6, 0.02]])) || 2;
              sankiTicket = false;
              pendingProgress += stocks;
              shinEvaProgressStocks += stocks;
              shinEvaSankiCount += 1;
              atGamesTotal += 8;
              atEvents.push({ kind: "shin-eva-sanki", label: sim.specialLabel, games: 8, stocks, cumulative: payout, number: shinEvaSankiCount });
              flow.push(`${sim.specialLabel} 進行ストック${stocks}個`);
              operation = weighted(sim.shinEvaOperations);
              appendImpact(sim.specialLabel);
              continue;
            }
            operationActive = false;
            break;
          }

          const bonus = weighted(sim.shinEvaBonuses || [[{ key: "big", label: "BIG BONUS", payout: 150, games: 30 }, 1]]);
          const award = Math.max(0, Math.min(Number(bonus.payout) || 150, SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          bonusCount += 1;
          bonusPayoutTotal += award;
          atGamesTotal += Number(bonus.games) || 30;
          if (bonus.key === "super") shinEvaSuperCount += 1;
          else if (bonus.key === "special") shinEvaSpecialCount += 1;
          else shinEvaBigCount += 1;
          const progressStocks = Number(weighted(bonus.key === "special" ? [[1, 0.45], [2, 0.35], [3, 0.15], [5, 0.05]] : [[0, 0.58], [1, 0.29], [2, 0.10], [3, 0.03]])) || 0;
          const vStocks = Math.random() < (bonus.key === "super" ? 0.18 : bonus.key === "special" ? 0.24 : 0.08) ? 1 : 0;
          pendingProgress += progressStocks;
          pendingV += vStocks;
          shinEvaProgressStocks += progressStocks;
          shinEvaVStocks += vStocks;
          atEvents.push({ kind: "shin-eva-bonus", label: bonus.label, bonusType: bonus.key, games: Number(bonus.games) || 30, award, cumulative: payout, progressStocks, vStocks, round: operationNumber });
          flow.push(`${bonus.label} +${yen.format(award)}枚${progressStocks || vStocks ? `・ストック${progressStocks + vStocks}個` : ""}`);

          if (operationNumber >= 2 && !sankiTicket && Math.random() < (Number(sim.specialChance) || 0.14)) {
            const gendoWon = Math.random() < 0.55;
            atGamesTotal += 4;
            atEvents.push({ kind: "shin-eva-gendo", label: "VSゲンドウ", games: 4, won: gendoWon, cumulative: payout, round: operationNumber });
            flow.push(`VSゲンドウ ${gendoWon ? "勝利・三機殲滅獲得" : "敗北"}`);
            if (gendoWon) sankiTicket = true;
          }

          if (Math.random() < (Number(sim.upperChance) || 0.12)) {
            shinEvaMariAttempts += 1;
            const mariSuccess = Math.random() < (Number(sim.upperSuccess) || 0.38);
            if (mariSuccess) shinEvaMariSuccesses += 1;
            atGamesTotal += 10;
            atEvents.push({ kind: "shin-eva-mari", label: sim.upperChallenge, games: 10, chance: (Number(sim.upperSuccess) || 0.38) * 100, success: mariSuccess, cumulative: payout, attempt: shinEvaMariAttempts });
            flow.push(`${sim.upperChallenge} ${mariSuccess ? "成功" : "失敗"}`);
            if (mariSuccess) {
              upper = true;
              const entryAward = Math.max(0, Math.min(300, SLOT_COMPLETE_LIMIT - payout));
              payout += entryAward;
              bonusCount += 1;
              bonusPayoutTotal += entryAward;
              shinEvaSuperCount += 1;
              atGamesTotal += 60;
              atEvents.push({ kind: "shin-eva-upper-entry-bonus", label: "SUPER BIG BONUS", games: 60, award: entryAward, cumulative: payout });
              flow.push(`SUPER BIG BONUS +${entryAward}枚 → ${sim.upperLabel}`);
              operationActive = false;
              break;
            }
          }

          operation = weighted(sim.shinEvaOperations);
          appendImpact("BONUS後");
        }

        if (upper) {
          let upperActive = true;
          const upperMaxSets = Math.max(1, Math.min(20, Number(sim.shinEvaUpperMaxSets) || 12));
          while (upperActive && shinEvaUpperLoops < upperMaxSets && payout < SLOT_COMPLETE_LIMIT) {
            shinEvaUpperLoops += 1;
            upperLoops += 1;
            const stAward = Math.max(0, Math.min(slotAwardForGames(20, Number(sim.upperPureIncrease) || 5, 0), SLOT_COMPLETE_LIMIT - payout));
            payout += stAward;
            upperPayoutTotal += stAward;
            atGamesTotal += 20;
            const continued = shinEvaUpperLoops < upperMaxSets && Math.random() < (Number(sim.upperContinue) || 0.95);
            atEvents.push({ kind: "shin-eva-upper-st", label: sim.upperLabel, games: 20, award: stAward, cumulative: payout, set: shinEvaUpperLoops, phases: 8, continued, chance: (Number(sim.upperContinue) || 0.95) * 100 });
            flow.push(`${sim.upperLabel} SET ${shinEvaUpperLoops}・${continued ? "8段階突破" : "終了"}`);
            if (!continued || payout >= SLOT_COMPLETE_LIMIT) {
              upperActive = false;
              break;
            }
            const bonusAward = Math.max(0, Math.min(300, SLOT_COMPLETE_LIMIT - payout));
            payout += bonusAward;
            bonusCount += 1;
            bonusPayoutTotal += bonusAward;
            shinEvaSuperCount += 1;
            atGamesTotal += 60;
            atEvents.push({ kind: "shin-eva-upper-bonus", label: "SUPER BIG BONUS", games: 60, award: bonusAward, cumulative: payout, set: shinEvaUpperLoops });
            flow.push(`上位 SUPER BIG BONUS +${bonusAward}枚`);
          }
        }
        cycleRounds = shinEvaOperationRounds;
        cycleContinues = bonusCount;
        basePayout = payout - entryPayout;
      } else if (sim.basiliskTenzenFlow) {
        payout = entryPayout;
        basePayout = 0;
        basiliskScenario = weighted(sim.basiliskScenarios || [[{ name: "安定", grades: "CCCCCCCCCCCC" }, 1]]);
        const gradeChances = sim.basiliskGradeChances || { A: 0.25, B: 0.40, C: 0.55, D: 0.80, E: 1 };
        atEvents.push({ kind: "basilisk-bt-start", label: sim.mainLabel, games: 1, scenario: basiliskScenario.name, grades: basiliskScenario.grades, cumulative: payout });
        flow.push(`${sim.mainLabel}・シナリオ「${basiliskScenario.name}」`);

        for (let set = 1; set <= 12 && payout < SLOT_COMPLETE_LIMIT; set += 1) {
          const rawGrade = basiliskScenario.grades?.[set - 1] || "C";
          const grade = rawGrade === "F" ? weighted([["A", 0.10], ["B", 0.20], ["C", 0.34], ["D", 0.28], ["E", 0.08]]) : rawGrade;
          const continueChance = Math.max(0, Math.min(1, Number(gradeChances[grade]) || 0.55));
          const high = set === 1 || Math.random() < (Number(sim.basiliskLaterHighChance) || 0.34);
          const bondBalls = high ? Number(weighted([[1, 0.50], [2, 0.28], [3, 0.16], [4, 0.06]])) || 1 : 0;
          const highLabel = !high ? "絆高確なし" : bondBalls >= 4 ? "絆モード" : bondBalls === 3 ? "縁・想・恋" : bondBalls === 2 ? weighted([["縁・想", 1], ["縁・恋", 1], ["想・恋", 1]]) : weighted([["縁", 1], ["想", 1], ["恋", 1]]);
          if (high) basiliskHighCount += 1;
          const btBc = Math.random() < Math.min(0.85, (Number(sim.basiliskBtBcChance) || 0.22) + (high ? 0.14 : 0));
          const btBcType = btBc ? weighted([[{ label: "異色BC", games: 16, award: 46 }, 0.66], [{ label: "同色BC", games: 16, award: 46 }, 0.27], [{ label: "エピソードBC", games: 30, award: 87 }, 0.06], [{ label: "プレミアムBC", games: 30, award: 87 }, 0.01]]) : null;
          const continued = set === 12 || btBc || Math.random() < continueChance;
          const setAward = Math.max(0, Math.min(slotAwardForGames(40, Number(sim.atPureIncrease) || 2.9, 0), SLOT_COMPLETE_LIMIT - payout));
          payout += setAward;
          atGamesTotal += 40;
          let bcAward = 0;
          if (btBcType && payout < SLOT_COMPLETE_LIMIT) {
            bcAward = Math.max(0, Math.min(Number(btBcType.award) || 46, SLOT_COMPLETE_LIMIT - payout));
            payout += bcAward;
            atGamesTotal += Number(btBcType.games) || 16;
            basiliskBtBcCount += 1;
            bonusCount += 1;
            bonusPayoutTotal += bcAward;
          }
          basiliskSets = set;
          cycleRounds = set;
          if (continued) cycleContinues += 1;
          atEvents.push({ kind: "basilisk-set", label: sim.mainLabel, games: 40, set, scenario: basiliskScenario.name, rawGrade, grade, chance: continueChance * 100, high, highLabel, bondBalls, btBc: btBcType, bcAward, award: setAward + bcAward, cumulative: payout, continued, completed: set === 12 });
          flow.push(`BT SET ${set}・${rawGrade === "F" ? `F→${grade}` : grade}・${highLabel}・${btBcType ? `${btBcType.label}当選` : continued ? "甲賀勝利" : "敗北"}`);
          if (!continued) break;
        }

        const completedScenario = basiliskSets >= 12;
        if (completedScenario && payout < SLOT_COMPLETE_LIMIT) {
          const endingAward = Math.max(0, Math.min(slotAwardForGames(40, Number(sim.atPureIncrease) || 2.9, 0), SLOT_COMPLETE_LIMIT - payout));
          payout += endingAward;
          atGamesTotal += 40;
          atEvents.push({ kind: "basilisk-ending", label: "エンディング", games: 40, award: endingAward, cumulative: payout });
          flow.push(`12セット完走・エンディング +${yen.format(endingAward)}枚`);
        }

        const grudgeReached = completedScenario || (payout < SLOT_COMPLETE_LIMIT && Math.random() < (Number(sim.basiliskGrudgeChance) || 0.18));
        if (grudgeReached && payout < SLOT_COMPLETE_LIMIT) {
          basiliskGrudgeAttempts += 1;
          const grudgeSuccess = Math.random() < (Number(sim.upperSuccess) || 0.50);
          if (grudgeSuccess) basiliskGrudgeSuccesses += 1;
          upper = grudgeSuccess;
          atGamesTotal += 3;
          atEvents.push({ kind: "basilisk-grudge", label: sim.upperChallenge, games: 3, chance: (Number(sim.upperSuccess) || 0.50) * 100, success: grudgeSuccess, mandatory: completedScenario, cumulative: payout });
          flow.push(`${sim.upperChallenge} ${grudgeSuccess ? "成功・天膳BT" : "失敗・通常BT"}`);

          if (grudgeSuccess) {
            for (let set = 1; set <= 12 && payout < SLOT_COMPLETE_LIMIT; set += 1) {
              const firstTen = set === 1;
              const moon = firstTen && Math.random() < (Number(sim.basiliskMoonChance) || 0.12);
              const baseAward = Math.max(0, Math.min(slotAwardForGames(40, Number(sim.upperPureIncrease) || 2.9, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += baseAward;
              atGamesTotal += 40;
              let moonAward = 0;
              let moonStocks = 0;
              if (moon && payout < SLOT_COMPLETE_LIMIT) {
                moonStocks = Number(weighted([[2, 0.45], [3, 0.30], [4, 0.16], [5, 0.07], [7, 0.02]])) || 2;
                moonAward = Math.max(0, Math.min(moonStocks * 116, SLOT_COMPLETE_LIMIT - payout));
                payout += moonAward;
                basiliskMoonCount += 1;
                addOnCount += 1;
                addOnTotal += moonAward;
                coinAddOnCount += 1;
                coinAddOnTotal += moonAward;
              }
              const continued = set < 12 && Math.random() < (Number(sim.upperContinue) || 0.80);
              basiliskTenzenSets = set;
              upperLoops = set;
              upperPayoutTotal += baseAward + moonAward;
              atEvents.push({ kind: "basilisk-tenzen-set", label: sim.upperLabel, games: 40, set, grade: "D", chance: (Number(sim.upperContinue) || 0.80) * 100, tenPeople: firstTen, moon, moonStocks, award: baseAward + moonAward, cumulative: payout, continued });
              flow.push(`天膳BT SET ${set}・${firstTen ? "10人状態・" : ""}${moon ? `月下閃滅 ${moonStocks}ストック` : continued ? "継続" : "終了"}`);
              if (!continued) break;
            }
          } else {
            const fallbackAward = Math.max(0, Math.min(slotAwardForGames(40, Number(sim.atPureIncrease) || 2.9, 0), SLOT_COMPLETE_LIMIT - payout));
            payout += fallbackAward;
            atGamesTotal += 40;
            atEvents.push({ kind: "basilisk-fallback", label: "通常バジリスクタイム", games: 40, award: fallbackAward, cumulative: payout });
            flow.push(`通常バジリスクタイム 1セット・+${yen.format(fallbackAward)}枚`);
          }
        }
        basePayout = payout - entryPayout;
      } else if (sim.darlingFranxxFlow) {
        basePayout = 0;
        let highGames = Math.max(10, Number(sim.darlingHighBaseGames) || 10);
        if (darlingInitialBonus?.beatLevel) {
          const initialAdd = 8;
          highGames = Math.min(Number(sim.darlingHighMaxGames) || 30, highGames + initialAdd);
          darlingBeatEntries += 1;
          darlingBeatAdds += initialAdd;
          darlingMaxBeatLevel = Math.max(darlingMaxBeatLevel, Number(darlingInitialBonus.beatLevel) || 3);
          atEvents.push({ kind: "darling-beats", label: "比翼BEATS", level: 3, levelLabel: "Beat Lv.MAXX", games: 4, chance: 94, resets: 2, addGames: initialAdd, highGames, cumulative: payout });
        }
        while (highGames > 0 && darlingHighBonuses < (Number(sim.darlingMaxBonuses) || 12) && payout < SLOT_COMPLETE_LIMIT) {
          const untilBonus = geometric(Number(sim.darlingHighBonusRate) || 10.4);
          const consumed = Math.min(highGames, untilBonus);
          highGames -= consumed;
          atGamesTotal += consumed;
          const hit = untilBonus <= consumed;
          atEvents.push({ kind: "darling-high", label: sim.mainLabel, games: consumed, remaining: highGames, hit, cumulative: payout });
          if (!hit) break;

          const bonus = weighted(sim.darlingHighBonuses || [[{ key: "franxx", label: "フランクスボーナス", games: 12, payout: 60 }, 1]]);
          const bonusAward = Array.isArray(bonus.payouts) ? Math.max(0, Number(weighted(bonus.payouts)) || 200) : Math.max(0, Number(bonus.payout) || 60);
          const actualAward = Math.max(0, Math.min(bonusAward, SLOT_COMPLETE_LIMIT - payout));
          payout += actualAward;
          atGamesTotal += Number(bonus.games) || Math.max(1, Math.round(actualAward / 5));
          darlingHighBonuses += 1;
          if (bonus.key === "franxx") darlingFranxxBonuses += 1;
          darlingBonusAwards += actualAward;
          bonusCount += 1;
          bonusPayoutTotal += actualAward;
          atEvents.push({ kind: "darling-high-bonus", label: bonus.label, bonusType: bonus.key, games: Number(bonus.games) || 12, award: actualAward, cumulative: payout });
          flow.push(`${bonus.label} +${actualAward}枚`);

          const takeout = bonus.key === "franxx" && Math.random() < (Number(sim.darlingTakeoutChance) || 0.16);
          if (takeout) {
            darlingTakeouts += 1;
            const addGames = Number(weighted([[3, 0.50], [5, 0.35], [10, 0.15]])) || 3;
            highGames = Math.min(Number(sim.darlingHighMaxGames) || 30, highGames + addGames);
            darlingBeatAdds += addGames;
            atEvents.push({ kind: "darling-takeout", label: "連れ出し", games: Number(bonus.games) || 12, addGames, highGames, cumulative: payout });
            flow.push(`連れ出し +${addGames}G・STホールド`);
          }

          if (bonus.beat || takeout) {
            const beat = bonus.beatLevel === 3 ? { level: 3, label: "Beat Lv.MAXX", stGames: 4, continue: 0.94 } : weighted(sim.darlingBeatLevels || [[{ level: 1, label: "Beat Lv.1", stGames: 2, continue: 0.75 }, 1]]);
            let resets = 0;
            let addGames = 0;
            while (resets < 6 && Math.random() < (Number(beat.continue) || 0.75)) {
              resets += 1;
              addGames += Number(weighted([[1, 0.62], [2, 0.25], [3, 0.09], [5, 0.035], [10, 0.005]])) || 1;
            }
            highGames = Math.min(Number(sim.darlingHighMaxGames) || 30, highGames + addGames);
            darlingBeatEntries += 1;
            darlingBeatAdds += addGames;
            darlingMaxBeatLevel = Math.max(darlingMaxBeatLevel, Number(beat.level) || 1);
            if (highGames >= (Number(sim.darlingHighMaxGames) || 30)) {
              darlingClimaxx = true;
              upper = true;
              upperLoops = 1;
            }
            atGamesTotal += Number(beat.stGames) || 2;
            atEvents.push({ kind: "darling-beats", label: "比翼BEATS", level: Number(beat.level) || 1, levelLabel: beat.label, games: Number(beat.stGames) || 2, chance: (Number(beat.continue) || 0.75) * 100, resets, addGames, highGames, cumulative: payout, climaxx: darlingClimaxx });
            flow.push(`${beat.label} +${addGames}G・高確残り${highGames}G`);
          }
        }
        atEvents.push({ kind: "darling-end", label: "ボーナス高確終了", games: 3, bonuses: darlingHighBonuses, cumulative: payout });
        cycleRounds = darlingHighBonuses;
        cycleContinues = darlingBeatEntries;
        basePayout = payout - entryPayout;
      } else if (sim.toaruIndex2Flow) {
        basePayout = 0;
        let remainingGames = Math.max(40, Number(sim.toaruInitialGames) || 40);
        let eventCount = 0;
        let returnLoop = 0;
        atEvents.push({ kind: "toaru-rush-start", label: sim.mainLabel, games: remainingGames, remaining: remainingGames, cumulative: payout });
        flow.push(`${sim.mainLabel} 初期${remainingGames}G・純増約${Number(sim.atPureIncrease).toFixed(1)}枚/G`);

        while (remainingGames > 0 && eventCount < (Number(sim.toaruMaxEvents) || 14) && payout < SLOT_COMPLETE_LIMIT) {
          const sectionGames = Math.min(remainingGames, randomInt(8, 14));
          remainingGames -= sectionGames;
          const sectionAward = Math.max(0, Math.min(slotAwardForGames(sectionGames, Number(sim.atPureIncrease) || 4, 0), SLOT_COMPLETE_LIMIT - payout));
          payout += sectionAward;
          atGamesTotal += sectionGames;
          atEvents.push({ kind: "toaru-rush", label: sim.mainLabel, games: sectionGames, remaining: remainingGames, award: sectionAward, cumulative: payout });

          if (remainingGames > 0 && Math.random() < (Number(sim.toaruPlusActionChance) || 0.11) && payout < SLOT_COMPLETE_LIMIT) {
            eventCount += 1;
            const action = weighted(sim.toaruPlusActions || [[{ label: "サポーター", games: 30, zoneGames: 3 }, 1]]);
            const addGames = Math.max(10, Number(action.games) || 30);
            remainingGames += addGames;
            toaruPlusActionCount += 1;
            toaruPlusActionGames += addGames;
            addOnCount += 1;
            addOnGamesTotal += addGames;
            atGamesTotal += Number(action.zoneGames) || 3;
            atEvents.push({ kind: "toaru-plus-action", label: action.label, games: Number(action.zoneGames) || 3, addGames, remaining: remainingGames, cumulative: payout });
            flow.push(`${action.label} +${addGames}G`);
            continue;
          }

          if (remainingGames > 0 && Math.random() < (Number(sim.toaruBattleChance) || 0.38) && payout < SLOT_COMPLETE_LIMIT) {
            eventCount += 1;
            const battle = weighted(sim.toaruBattleTypes || [[{ label: "神の右席BATTLE", games: 4, chance: 0.50 }, 1]]);
            const won = Math.random() < Math.max(0, Math.min(1, Number(battle.chance) || 0.50));
            toaruBattles += 1;
            if (won) toaruBattleWins += 1;
            atGamesTotal += Number(battle.games) || 4;
            atEvents.push({ kind: "toaru-battle", label: battle.label, games: Number(battle.games) || 4, chance: (Number(battle.chance) || 0.50) * 100, won, remaining: remainingGames, cumulative: payout });
            flow.push(`${battle.label} ${won ? "勝利" : "敗北"}`);

            if (won) {
              const reward = weighted(sim.toaruChargeRewards || [[{ label: "ゲーム数上乗せ", games: 20 }, 1]]);
              const addGames = Math.max(20, Number(reward.games) || 20);
              remainingGames += addGames;
              toaruChargeCount += 1;
              toaruChargeGames += addGames;
              addOnCount += 1;
              addOnGamesTotal += addGames;
              atGamesTotal += 1;
              atEvents.push({ kind: "toaru-charge", label: reward.label, games: 1, addGames, remaining: remainingGames, cumulative: payout });
              flow.push(`とある運命の上乗遊技 ${reward.label} +${addGames}G`);
            }
          }
        }

        const lastAward = Math.max(0, Math.min(slotAwardForGames(3, Number(sim.atPureIncrease) || 4, 0), SLOT_COMPLETE_LIMIT - payout));
        payout += lastAward;
        atGamesTotal += 3;
        atEvents.push({ kind: "toaru-end", label: `${sim.mainLabel}終了`, games: 3, cumulative: payout });

        if (payout < SLOT_COMPLETE_LIMIT && Math.random() < (Number(sim.toaruFiammaChance) || 0.28)) {
          toaruFiammaAttempts += 1;
          const success = Math.random() < (Number(sim.toaruFiammaSuccess) || 0.50);
          if (success) {
            toaruFiammaWins += 1;
            upper = true;
            upperLoops = 1;
          }
          atGamesTotal += 4;
          atEvents.push({ kind: "toaru-fiamma", label: sim.upperChallenge, games: 4, chance: (Number(sim.toaruFiammaSuccess) || 0.50) * 100, success, cumulative: payout });
          flow.push(`${sim.upperChallenge} ${success ? "成功・RUSH再突入" : "失敗"}`);
          if (success && payout < SLOT_COMPLETE_LIMIT) {
            const reward = weighted(sim.toaruChargeRewards || [[{ label: "ゲーム数上乗せ", games: 20 }, 1]]);
            const returnGames = Math.max(40, Number(reward.games) || 40);
            const returnAward = Math.max(0, Math.min(slotAwardForGames(returnGames, Number(sim.atPureIncrease) || 4, 0), SLOT_COMPLETE_LIMIT - payout));
            payout += returnAward;
            atGamesTotal += returnGames;
            toaruChargeCount += 1;
            toaruChargeGames += Number(reward.games) || 20;
            addOnCount += 1;
            addOnGamesTotal += Number(reward.games) || 20;
            upperPayoutTotal += returnAward;
            atEvents.push({ kind: "toaru-return", label: sim.upperLabel, games: returnGames, reward: reward.label, addGames: Number(reward.games) || 20, award: returnAward, cumulative: payout });
            flow.push(`${reward.label} +${Number(reward.games) || 20}G・${sim.upperLabel}`);
          }
        }
        cycleRounds = toaruBattles;
        cycleContinues = toaruBattleWins;
        basePayout = payout - entryPayout;
      } else if (sim.magiaRecordFlow) {
        basePayout = 0;
        const attackGames = Math.max(40, Number(weighted(sim.magiaAttackGames || [[40, 1]])) || 40) + Math.max(0, Number(magiaBonus?.extraGames) || 0);
        const attackAward = Math.max(0, Math.min(slotAwardForGames(attackGames, Number(sim.atPureIncrease) || 2.6, 0), SLOT_COMPLETE_LIMIT - payout));
        payout += attackAward;
        atGamesTotal += 10 + attackGames;
        magiaAttackTotal += attackGames;
        addOnCount += 1;
        addOnGamesTotal += attackGames;
        atEvents.push({ kind: "magia-attack", label: "マギアアタック", games: 10, attackGames, award: attackAward, cumulative: payout });
        flow.push(`マギアアタック +${attackGames}G・マギアラッシュ開始`);

        let remainingGames = attackGames;
        let eventCount = 0;
        let ended = false;
        while (!ended && eventCount < (Number(sim.magiaMaxEvents) || 14) && payout < SLOT_COMPLETE_LIMIT) {
          while (remainingGames > 0 && eventCount < (Number(sim.magiaMaxEvents) || 14) && payout < SLOT_COMPLETE_LIMIT) {
            const sectionGames = Math.min(remainingGames, randomInt(12, 20));
            remainingGames -= sectionGames;
            atEvents.push({ kind: "magia-rush", label: "マギアラッシュ", games: sectionGames, remaining: remainingGames, stories: magiaStoryCount, cumulative: payout });
            if (Math.random() >= (Number(sim.magiaRewardChance) || 0.34)) continue;

            eventCount += 1;
            const reward = weighted(sim.magiaRewardTypes || [[{ key: "story", label: "ストーリー", games: 20 }, 1]]);
            if (reward.key === "story") {
              const nextStory = magiaStoryCount + 1;
              const specialChance = nextStory === 3 || nextStory === 7 ? 0.199 : 0.025;
              const special = Math.random() < specialChance;
              const storyAdvance = special ? 2 : 1;
              const storyGames = special ? 30 : 20;
              const storyAward = Math.max(0, Math.min(slotAwardForGames(storyGames, Number(sim.atPureIncrease) || 2.6, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += storyAward;
              atGamesTotal += storyGames;
              magiaStoryCount = Math.min(Number(sim.magiaStoryTarget) || 8, magiaStoryCount + storyAdvance);
              if (special) magiaSpecialStories += 1;
              const guaranteedLevelOne = magiaStoryCount === 1 || magiaStoryCount === 5 || special;
              const connectLevel = special ? 2 : guaranteedLevelOne ? 1 : Math.random() < 0.36 ? 1 : 0;
              atEvents.push({ kind: "magia-story", label: special ? "スペシャルストーリー" : "ストーリー", games: storyGames, storyAdvance, storyCount: magiaStoryCount, special, connectLevel, award: storyAward, cumulative: payout });
              flow.push(`${special ? "スペシャルストーリー" : "ストーリー"}・${magiaStoryCount}/8話`);

              if (connectLevel > 0 && payout < SLOT_COMPLETE_LIMIT) {
                magiaConnectAttempts += 1;
                const connectChance = connectLevel >= 2 ? 1 : 0.206;
                const connected = Math.random() < connectChance;
                let character = null;
                let addGames = 0;
                let addAward = 0;
                if (connected) {
                  magiaConnectWins += 1;
                  character = weighted(sim.magiaConnectCharacters || [[{ label: "やちよ", games: [[10, 1]] }, 1]]);
                  addGames = Math.max(10, Number(weighted(character.games || [[10, 1]])) || 10);
                  addAward = Math.max(0, Math.min(slotAwardForGames(addGames, Number(sim.atPureIncrease) || 2.6, 0), SLOT_COMPLETE_LIMIT - payout));
                  payout += addAward;
                  remainingGames += addGames;
                  atGamesTotal += addGames;
                  magiaConnectGames += addGames;
                  addOnCount += 1;
                  addOnGamesTotal += addGames;
                }
                atEvents.push({ kind: "magia-connect", label: "コネクトチャンス", games: 3, level: connectLevel, chance: connectChance * 100, connected, character: character?.label || "", addGames, award: addAward, remaining: remainingGames, cumulative: payout });
                flow.push(`コネクトチャンス ${connected ? `${character.label} +${addGames}G` : "失敗"}`);
              }
            } else if (reward.key === "battle") {
              magiaBattleRewards += 1;
              const success = Math.random() < 0.55;
              const addGames = success ? Math.max(30, Number(weighted([[30, 0.58], [50, 0.30], [100, 0.12]])) || 30) : 0;
              const battleAward = Math.max(0, Math.min(slotAwardForGames((Number(reward.games) || 12) + addGames, Number(sim.atPureIncrease) || 2.6, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += battleAward;
              atGamesTotal += Number(reward.games) || 12;
              if (success) {
                remainingGames += addGames;
                atGamesTotal += addGames;
                addOnCount += 1;
                addOnGamesTotal += addGames;
              }
              atEvents.push({ kind: "magia-battle", label: "決戦神浜聖女", games: Number(reward.games) || 12, chance: 55, success, addGames, award: battleAward, remaining: remainingGames, cumulative: payout });
              flow.push(`決戦神浜聖女 ${success ? `勝利・+${addGames}G` : "敗北"}`);
            } else {
              magiaBonusRewards += 1;
              const bonusGames = Number(reward.games) || 30;
              const bonusAward = Math.max(0, Math.min(Number(reward.payout) || slotAwardForGames(bonusGames, Number(sim.atPureIncrease) || 2.6, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += bonusAward;
              atGamesTotal += bonusGames;
              bonusCount += 1;
              bonusPayoutTotal += bonusAward;
              atEvents.push({ kind: "magia-reward-bonus", label: "マギアBONUS", games: bonusGames, award: bonusAward, cumulative: payout, remaining: remainingGames });
              flow.push(`マギアBONUS +${yen.format(bonusAward)}枚`);
            }
            if (magiaStoryCount >= (Number(sim.magiaStoryTarget) || 8)) break;
          }

          if (magiaStoryCount >= (Number(sim.magiaStoryTarget) || 8)) break;
          const continued = magiaSetContinues < 3 && Math.random() < (Number(sim.magiaSetContinueChance) || 0.18);
          if (continued) {
            magiaSetContinues += 1;
            remainingGames = 40;
            atGamesTotal += 40;
            atEvents.push({ kind: "magia-set-continue", label: "セット継続", games: 40, set: magiaSetContinues + 1, cumulative: payout });
            flow.push(`セット継続・初期40G（${magiaSetContinues + 1}セット目）`);
          } else {
            ended = true;
          }
        }

        if (magiaStoryCount >= (Number(sim.magiaStoryTarget) || 8) && payout < SLOT_COMPLETE_LIMIT) {
          upper = true;
          const prepareGames = Number(sim.magiaUpperPrepareGames) || 32;
          const upperAttackGames = Number(sim.magiaUpperAttackGames) || 10;
          const upperInitialGames = Math.max(100, Number(weighted(sim.magiaUpperInitialGames || [[100, 1]])) || 100);
          const upperAward = Math.max(0, Math.min(slotAwardForGames(prepareGames + upperAttackGames + upperInitialGames, Number(sim.upperPureIncrease) || 2.6, 0), SLOT_COMPLETE_LIMIT - payout));
          payout += upperAward;
          atGamesTotal += prepareGames + upperAttackGames + upperInitialGames;
          upperLoops = 1;
          magiaUpperSections = 1;
          upperPayoutTotal += upperAward;
          atEvents.push({ kind: "magia-upper-prepare", label: "エンブリオ・イブ覚醒準備", games: prepareGames, cumulative: payout - upperAward });
          atEvents.push({ kind: "magia-upper-attack", label: "エンブリオ・イブアタック", games: upperAttackGames, attackGames: upperInitialGames, award: upperAward, cumulative: payout });
          atEvents.push({ kind: "magia-upper-rush", label: sim.upperLabel, games: upperInitialGames, stories: magiaStoryCount, award: upperAward, cumulative: payout });
          flow.push(`全8話コンプリート・エンブリオ・イブ覚醒 +${upperInitialGames}G`);
        } else {
          atEvents.push({ kind: "magia-end", label: "マギアラッシュ終了", games: 3, stories: magiaStoryCount, cumulative: payout });
          flow.push(`残り0G・マギアラッシュ終了（${magiaStoryCount}/8話）`);
        }
        cycleRounds = magiaStoryCount;
        cycleContinues = magiaConnectWins;
        basePayout = payout - entryPayout;
      } else if (sim.azurLaneFlow) {
        basePayout = 0;
        const attackGames = Math.max(50, Number(weighted(sim.azurAttackGames || [[100, 1]])) || 100);
        const attackLoop = Number(weighted(sim.azurAttackLoops || [[0, 1]])) || 0;
        const attackAward = Math.max(0, Math.min(slotAwardForGames(attackGames, Number(sim.atPureIncrease) || 2.5, 0), SLOT_COMPLETE_LIMIT - payout));
        payout += attackAward;
        atGamesTotal += 3 + attackGames;
        azurGameAddTotal += attackGames;
        addOnCount += 1;
        addOnGamesTotal += attackGames;
        atEvents.push({ kind: "azur-attack", label: "海戦ATTACK", games: 3, attackGames, loopRate: attackLoop * 100, award: attackAward, cumulative: payout });
        flow.push(`海戦ATTACK +${attackGames}G・AT開始`);

        let remainingGames = attackGames;
        while (remainingGames > 0 && azurBattles < (Number(sim.azurMaxBattles) || 10) && payout < SLOT_COMPLETE_LIMIT) {
          const sectionGames = Math.min(remainingGames, randomInt(10, 18));
          remainingGames -= sectionGames;
          atEvents.push({ kind: "azur-rush", label: "アズールレーンRUSH", games: sectionGames, remaining: remainingGames, factions: azurFactions, cumulative: payout });
          if (remainingGames <= 0 || Math.random() >= 0.68) continue;

          const enemy = weighted(sim.azurEnemies || [[{ key: "purifier", label: "ピュリファイアー", chance: 0.401 }, 1]]);
          const battleGames = Math.max(5, 5 + azurFactions);
          const won = Math.random() < Math.max(0, Math.min(1, Number(enemy.chance) || 0.401));
          azurBattles += 1;
          atGamesTotal += battleGames;
          let rewardLabel = "セイレーンバトル敗北";
          let rewardGames = 0;
          let rewardAward = 0;
          let gathered = false;
          if (won) {
            azurWins += 1;
            if (azurFactions < 4 && Math.random() < 0.58) {
              gathered = true;
              azurFactions += 1;
              azurGatherBonuses += 1;
              const bonusGames = 40;
              rewardAward = Math.max(0, Math.min(slotAwardForGames(bonusGames, Number(sim.atPureIncrease) || 2.5, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += rewardAward;
              atGamesTotal += bonusGames;
              bonusCount += 1;
              bonusPayoutTotal += rewardAward;
              rewardLabel = `集結BONUS・${azurFactions}陣営参戦`;
            } else {
              const enterprise = Math.random() < 0.10;
              rewardGames = enterprise ? 100 : Math.max(10, Number(weighted([[10, 0.40], [20, 0.30], [30, 0.17], [50, 0.10], [100, 0.03]])) || 10);
              rewardAward = Math.max(0, Math.min(slotAwardForGames(rewardGames, Number(sim.atPureIncrease) || 2.5, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += rewardAward;
              remainingGames += rewardGames;
              atGamesTotal += rewardGames;
              azurGameAddTotal += rewardGames;
              addOnCount += 1;
              addOnGamesTotal += rewardGames;
              rewardLabel = enterprise ? `覚醒エンタープライズ +${rewardGames}G` : `ゲーム数上乗せ +${rewardGames}G`;
            }
          }
          atEvents.push({ kind: "azur-siren", label: "セイレーンバトル", games: battleGames, enemy: enemy.label, chance: (Number(enemy.chance) || 0.401) * 100, won, rewardLabel, rewardGames, award: rewardAward, gathered, factions: azurFactions, remaining: remainingGames, cumulative: payout });
          flow.push(`${enemy.label} ${won ? `勝利・${rewardLabel}` : "敗北"}`);
        }

        if (azurFactions >= 4 && payout < SLOT_COMPLETE_LIMIT) {
          azurAmagiAttempts += 1;
          const amagiSuccess = Math.random() < (Number(sim.azurAmagiChance) || 0.54);
          atGamesTotal += Number(sim.azurAmagiGames) || 7;
          if (amagiSuccess) {
            azurAmagiWins += 1;
            upper = true;
          }
          atEvents.push({ kind: "azur-amagi", label: "天城BATTLE", games: Number(sim.azurAmagiGames) || 7, chance: (Number(sim.azurAmagiChance) || 0.54) * 100, success: amagiSuccess, cumulative: payout });
          flow.push(`天城BATTLE ${amagiSuccess ? "突破・異次元性能SS RUSH" : "敗北"}`);

          while (upper && azurUpperLoops < 6 && payout < SLOT_COMPLETE_LIMIT) {
            const upperGames = Math.max(100, Number(weighted([[100, 0.40], [150, 0.35], [200, 0.20], [300, 0.05]])) || 100);
            const upperAward = Math.max(0, Math.min(slotAwardForGames(upperGames, Number(sim.azurUpperPureIncrease) || 5.1, 0), SLOT_COMPLETE_LIMIT - payout));
            payout += upperAward;
            atGamesTotal += upperGames;
            azurUpperLoops += 1;
            upperLoops = azurUpperLoops;
            upperPayoutTotal += upperAward;
            const continued = azurUpperLoops < 6 && Math.random() < (Number(sim.azurAmagiChance) || 0.54);
            atEvents.push({ kind: "azur-upper", label: sim.upperLabel, games: upperGames, loop: azurUpperLoops, award: upperAward, cumulative: payout, continued, chance: (Number(sim.azurAmagiChance) || 0.54) * 100 });
            flow.push(`${sim.upperLabel} ${azurUpperLoops}区間・+${yen.format(upperAward)}枚${continued ? "・天城BATTLE継続" : "・終了"}`);
            if (!continued) break;
          }
        }
        cycleRounds = azurBattles;
        cycleContinues = azurWins;
        basePayout = payout - entryPayout;
      } else if (sim.bofuriFlow) {
        payout = 0;
        basePayout = 0;
        atGamesTotal += Number(bofuriCz?.games) || 15;
        const levels = Array.isArray(sim.bofuriDefenseLevels) ? sim.bofuriDefenseLevels : [];
        const pickLevel = points => [...levels].reverse().find(item => points >= Number(item.points || 0)) || levels[0] || { level: 0, label: "Lv.0", loop: 0.77 };
        const pickBonus = ({ episode = false, defense = false } = {}) => {
          if (episode) return { key: "episode", label: "エピソードBONUS", games: 46, payout: 250, defensePoints: 2600 };
          if (defense) return weighted([[{ key: "reg", label: "REG BONUS", games: 18, payout: 100, defensePoints: 650 }, 0.34], [{ key: "big-double", label: "BIG BONUS・ダブル", games: 46, payout: 250, defensePoints: 1900 }, 0.58], [{ key: "episode", label: "エピソードBONUS", games: 46, payout: 250, defensePoints: 2600 }, 0.08]]);
          return weighted(sim.bofuriBonuses || [[{ key: "big-single", label: "BIG BONUS・シングル", games: 28, payout: 150, defensePoints: 1200 }, 1]]);
        };
        const appendBonus = (bonus, source) => {
          const award = Math.max(0, Math.min(Number(bonus.payout) || 0, SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += Number(bonus.games) || Math.max(1, Math.ceil(award / 5.5));
          bonusCount += 1;
          bofuriBonusCount += 1;
          bonusPayoutTotal += award;
          bofuriDefensePoints = Math.min(12000, bofuriDefensePoints + (Number(bonus.defensePoints) || 0));
          const level = pickLevel(bofuriDefensePoints);
          bofuriMaxLevel = Math.max(bofuriMaxLevel, Number(level.level) || 0);
          atEvents.push({ kind: "bofuri-bonus", label: bonus.label, bonusType: bonus.key, games: Number(bonus.games) || 1, award, cumulative: payout, source, defensePoints: bofuriDefensePoints, defenseLevel: level.level, defenseLabel: level.label });
          flow.push(`${bonus.label} +${yen.format(award)}枚・防御${level.label}`);
          return bonus;
        };
        const appendAngel = () => {
          bofuriAngelCount += 1;
          const success = Math.random() < (Number(sim.bofuriAngelChance) || 0.70);
          let award = 0;
          if (success) {
            const bonusHits = Number(weighted([[1, 0.58], [2, 0.30], [3, 0.12]])) || 1;
            for (let hit = 0; hit < bonusHits && payout < SLOT_COMPLETE_LIMIT; hit += 1) {
              const bonus = pickBonus({ defense: true });
              const gain = Math.max(0, Math.min(Number(bonus.payout) || 250, SLOT_COMPLETE_LIMIT - payout));
              payout += gain;
              award += gain;
              bonusCount += 1;
              bofuriBonusCount += 1;
              bonusPayoutTotal += gain;
              bofuriDefensePoints = Math.min(12000, bofuriDefensePoints + (Number(bonus.defensePoints) || 1900));
            }
          }
          atGamesTotal += Number(sim.bofuriAngelGames) || 30;
          const level = pickLevel(bofuriDefensePoints);
          bofuriMaxLevel = Math.max(bofuriMaxLevel, Number(level.level) || 0);
          atEvents.push({ kind: "bofuri-angel", label: "天使ZONE", games: Number(sim.bofuriAngelGames) || 30, chance: (Number(sim.bofuriAngelChance) || 0.70) * 100, success, award, cumulative: payout, defenseLevel: level.level, defenseLabel: level.label });
          flow.push(`天使ZONE ${success ? `BONUS獲得 +${yen.format(award)}枚` : "終了"}`);
        };
        const appendViolence = () => {
          bofuriViolenceCount += 1;
          upper = true;
          const requested = Number(weighted([[2500, 0.25], [3500, 0.50], [4500, 0.25]])) || 3500;
          const award = Math.max(0, Math.min(requested, SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += Number(sim.bofuriViolenceGames) || 50;
          upperLoops += 1;
          upperPayoutTotal += award;
          bonusCount += Math.max(1, Math.round(award / 310));
          bofuriBonusCount += Math.max(1, Math.round(award / 310));
          bonusPayoutTotal += award;
          bofuriDefensePoints = 10000;
          bofuriMaxLevel = 4;
          atEvents.push({ kind: "bofuri-violence", label: "暴虐ZONE", games: Number(sim.bofuriViolenceGames) || 50, award, cumulative: payout, chance: 87, defenseLevel: 4, defenseLabel: "Lv.4 極ロング" });
          flow.push(`暴虐ZONE 50G・+${yen.format(award)}枚`);
        };

        let currentBonus = appendBonus(pickBonus({ episode: bofuriCz?.key === "machine" || bofuriCz?.key === "extreme" }), bofuriCz?.label || "初当り");
        if (currentBonus.key === "episode") {
          if (bofuriCz?.key === "extreme" || Math.random() < 0.28) appendViolence();
          else appendAngel();
        }

        let firstDefense = true;
        while (!upper && bofuriDefenseLoops < (Number(sim.bofuriMaxLoops) || 20) && payout < SLOT_COMPLETE_LIMIT) {
          const level = pickLevel(bofuriDefensePoints);
          bofuriMaxLevel = Math.max(bofuriMaxLevel, Number(level.level) || 0);
          const defenseChance = firstDefense ? Math.max(Number(level.loop) || 0.77, Number(sim.bofuriFirstDefenseChance) || 0.88) : Number(level.loop) || 0.77;
          const defenseGames = Math.min(80, Math.max(1, geometric(Number(sim.bofuriCzAppearance) || 11.9)));
          const infinite = defenseGames >= 80;
          const reachedCz = infinite || Math.random() < defenseChance;
          bofuriDefenseLoops += 1;
          atGamesTotal += defenseGames;
          atEvents.push({ kind: "bofuri-defense", label: "防御状態", games: defenseGames, loop: bofuriDefenseLoops, level: level.level, levelLabel: level.label, chance: defenseChance * 100, reachedCz, infinite, first: firstDefense, cumulative: payout });
          flow.push(`防御状態 ${level.label}・${defenseGames}G・${reachedCz ? infinite ? "無限CZ" : "CZ当選" : "転落"}`);
          firstDefense = false;
          if (!reachedCz) break;

          const route = infinite
            ? { key: "admin", label: "無限の運営高確率", games: 20, chance: 1 }
            : weighted(sim.bofuriCzRoutes || [[{ key: "admin", label: "運営高確率", games: 15, chance: 0.50 }, 1]]);
          const czSuccess = infinite || Math.random() < Math.max(0, Math.min(1, Number(route.chance) || 0.50));
          atGamesTotal += Number(route.games) || 15;
          atEvents.push({ kind: "bofuri-cz", label: route.label, games: Number(route.games) || 15, chance: (Number(route.chance) || 0.50) * 100, success: czSuccess, initial: false, cumulative: payout });
          flow.push(`${route.label}・${czSuccess ? "BONUS当選" : "失敗"}`);
          if (!czSuccess) break;

          currentBonus = appendBonus(pickBonus({ episode: route.key === "machine" || route.key === "extreme", defense: true }), route.label);
          if (currentBonus.key === "episode") {
            if (route.key === "extreme" || Math.random() < 0.28) appendViolence();
            else appendAngel();
          }
        }
        cycleRounds = bofuriDefenseLoops;
        cycleContinues = Math.max(0, bofuriBonusCount - 1);
        basePayout = payout;
      } else if (sim.aobutaFlow) {
        payout = 0;
        basePayout = 0;
        const initialBonus = sim.aobutaInitialBonus || { label: "青春BONUS", games: 5, payout: 75 };
        const initialAward = Math.max(0, Math.min(Number(initialBonus.payout) || 75, SLOT_COMPLETE_LIMIT - payout));
        payout += initialAward;
        atGamesTotal += Math.max(1, Number(initialBonus.games) || 5);
        bonusCount += 1;
        bonusPayoutTotal += initialAward;
        atEvents.push({ kind: "aobuta-entry-bonus", label: initialBonus.label, games: Math.max(1, Number(initialBonus.games) || 5), award: initialAward, cumulative: payout, navs: 5 });
        flow.push(`${initialBonus.label} ベルナビ5回・+${yen.format(initialAward)}枚`);

        const heroes = Array.isArray(sim.aobutaStHeroes) && sim.aobutaStHeroes.length
          ? sim.aobutaStHeroes
          : [{ key: "hero", label: "ヒロイン", awards: [[200, 1]] }];
        const chooseAward = hero => Math.max(100, Number(weighted(hero.awards || [[200, 1]])) || 200);
        let normalLoop = 0;
        let normalContinues = true;
        while (normalContinues && normalLoop < (Number(sim.aobutaMaxNormalLoops) || 10) && payout < SLOT_COMPLETE_LIMIT && !upper) {
          normalLoop += 1;
          aobutaStRounds += 1;
          const extraSet = Math.random() < (Number(sim.aobutaExtraSetChance) || 0.18);
          const roundHeroes = extraSet ? [...heroes, heroes[normalLoop % heroes.length]] : heroes;
          const wins = [];
          for (const hero of roundHeroes) {
            if (Math.random() < (Number(sim.aobutaHeroVChance) || 0.205)) wins.push(hero);
          }
          aobutaVCount += wins.length;
          const shoko = wins.length > 0 && Math.random() < (Number(sim.aobutaShokoChance) || 0.12);
          atGamesTotal += roundHeroes.length * 2;
          atEvents.push({ kind: "aobuta-st", label: "青ブタJUDGE", games: roundHeroes.length * 2, round: normalLoop, sets: roundHeroes.length, wins: wins.length, continued: wins.length > 0, shoko, cumulative: payout });
          flow.push(`青ブタJUDGE ${normalLoop}周目・${roundHeroes.length}セット・V ${wins.length}個`);

          for (let index = 0; index < wins.length && payout < SLOT_COMPLETE_LIMIT; index += 1) {
            const hero = wins[index];
            const award = Math.max(0, Math.min(chooseAward(hero), SLOT_COMPLETE_LIMIT - payout));
            payout += award;
            const bonusGames = Math.max(1, Math.ceil(award / Math.max(0.1, Number(sim.atPureIncrease) || 8)));
            atGamesTotal += bonusGames;
            bonusCount += 1;
            bonusPayoutTotal += award;
            aobutaDreamBurstCount += 1;
            atEvents.push({ kind: "aobuta-dream-burst", label: "青春DREAM BURST", hero: hero.label, games: bonusGames, award, cumulative: payout, vIndex: index + 1, vTotal: wins.length, round: normalLoop, super: award >= 500 });
            flow.push(`${hero.label} 青春DREAM BURST +${yen.format(award)}枚`);
          }

          if (shoko && payout < SLOT_COMPLETE_LIMIT) {
            aobutaUpperCzAttempts += 1;
            const success = Math.random() < (Number(sim.aobutaUpperCzChance) || 0.53);
            if (success) aobutaUpperCzWins += 1;
            atGamesTotal += Number(sim.aobutaUpperCzGames) || 16;
            atEvents.push({ kind: "aobuta-upper-cz", label: sim.upperChallenge, games: Number(sim.aobutaUpperCzGames) || 16, chance: (Number(sim.aobutaUpperCzChance) || 0.53) * 100, success, cumulative: payout });
            flow.push(`${sim.upperChallenge}・${success ? "成功" : "失敗"}`);
            if (success) {
              upper = true;
              const episodeAward = Math.max(0, Math.min(Number(sim.aobutaUpperEpisodePayout) || 300, SLOT_COMPLETE_LIMIT - payout));
              payout += episodeAward;
              atGamesTotal += Math.max(1, Math.ceil(episodeAward / 8));
              bonusCount += 1;
              bonusPayoutTotal += episodeAward;
              atEvents.push({ kind: "aobuta-upper-episode", label: "エピソードBONUS", games: Math.max(1, Math.ceil(episodeAward / 8)), award: episodeAward, cumulative: payout });
              flow.push(`エピソードBONUS +${yen.format(episodeAward)}枚`);
            }
          }
          normalContinues = wins.length > 0 && !upper && !shoko;
        }

        if (upper && payout < SLOT_COMPLETE_LIMIT) {
          let upperContinues = true;
          while (upperContinues && aobutaUpperStLoops < (Number(sim.aobutaMaxUpperLoops) || 8) && payout < SLOT_COMPLETE_LIMIT) {
            aobutaUpperStLoops += 1;
            upperLoops = aobutaUpperStLoops;
            const award = Math.max(0, Math.min(Number(weighted(sim.aobutaUpperAwards || [[640, 1]])) || 640, SLOT_COMPLETE_LIMIT - payout));
            const continued = Math.random() < (Number(sim.aobutaUpperContinue) || 0.80);
            payout += award;
            const bonusGames = Math.max(1, Math.ceil(award / 8));
            atGamesTotal += 8 + bonusGames;
            bonusCount += 1;
            bonusPayoutTotal += award;
            upperPayoutTotal += award;
            atEvents.push({ kind: "aobuta-upper-st", label: sim.upperLabel, games: 8 + bonusGames, loop: aobutaUpperStLoops, award, cumulative: payout, continued, chance: (Number(sim.aobutaUpperContinue) || 0.80) * 100 });
            flow.push(`上位ST ${aobutaUpperStLoops}周目・+${yen.format(award)}枚・${continued ? "継続" : "終了"}`);
            upperContinues = continued;
          }
        }
        cycleRounds = aobutaStRounds + aobutaUpperStLoops;
        cycleContinues = Math.max(0, aobutaStRounds - 1) + Math.max(0, aobutaUpperStLoops - 1);
        basePayout = payout;
      } else if (sim.kanokariFlow) {
        payout = 0;
        basePayout = 0;
        let normalStocks = 0;
        let loveStocks = 0;
        let failedRentChances = 0;
        let bonusChain = 0;
        let yumekanoMode = false;
        let dreamTimeTriggered = false;
        const bigTemplate = { key: "big", label: "かのかりBONUS", games: 30, payout: 150 };

        const appendKanokariBonus = (template, { source = "初当り", initial = false, specialEpisode = false } = {}) => {
          const bonus = template || bigTemplate;
          const award = Math.max(0, Math.min(Number(bonus.payout) || 0, SLOT_COMPLETE_LIMIT - payout));
          const bonusGames = Math.max(1, Number(bonus.games) || Math.round(award / 5));
          payout += award;
          atGamesTotal += bonusGames;
          bonusCount += 1;
          bonusChain += 1;
          kanokariMaxChain = Math.max(kanokariMaxChain, bonusChain);
          bonusPayoutTotal += award;
          if (bonus.key === "reg") kanokariRegCount += 1;
          else if (bonus.key === "episode" || bonus.key === "special-episode") kanokariEpisodeCount += 1;
          else kanokariBigCount += 1;

          let normalGain = 0;
          let loveGain = 0;
          if (bonus.key === "reg") {
            if (Math.random() < 0.16) loveGain = 1;
          } else if (bonus.key === "episode" || bonus.key === "special-episode") {
            normalGain = 1 + (Math.random() < 0.32 ? 1 : 0);
            loveGain = specialEpisode ? 1 : Math.random() < 0.22 ? 1 : 0;
          } else {
            normalGain = initial ? 1 : Math.random() < 0.62 ? 1 : 0;
            if (Math.random() < 0.24) normalGain += 1;
            if (Math.random() < 0.10) loveGain += 1;
          }
          normalStocks += normalGain;
          loveStocks += loveGain;
          kanokariNormalStocks += normalGain;
          kanokariLoveStocks += loveGain;
          atEvents.push({ kind: "kanokari-bonus", label: bonus.label, bonusType: bonus.key, games: bonusGames, award, cumulative: payout, source, chain: bonusChain, normalGain, loveGain, normalStocks, loveStocks, specialEpisode });
          flow.push(`${bonus.label} +${yen.format(award)}枚・ストック ${normalGain + loveGain}個`);
          return bonus;
        };

        const appendKanokariDream = ({ source = "金7揃い", sClass = false } = {}) => {
          const addGames = sClass ? 280 : 80;
          const award = Math.max(0, Math.min(addGames * 5, SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          atGamesTotal += addGames;
          addOnCount += 1;
          addOnGamesTotal += addGames;
          kanokariDreamCount += 1;
          if (sClass) upper = true;
          atEvents.push({ kind: "kanokari-dream", label: sClass ? "S級ななかりDREAM" : "ななかりDREAM", games: addGames, addGames, award, cumulative: payout, source, sClass });
          flow.push(`${sClass ? "S級" : ""}ななかりDREAM +${addGames}G・+${yen.format(award)}枚`);
          appendKanokariBonus(bigTemplate, { source: `${sClass ? "S級" : ""}ななかりDREAM後半`, initial: false });
        };

        const initialPool = kanokariCz?.key === "delusion"
          ? [[{ key: "big", label: "かのかりBONUS", games: 30, payout: 150 }, 0.90], [{ key: "dream", label: "ななかりDREAM", games: 80, payout: 400 }, 0.10]]
          : sim.kanokariInitialBonuses;
        const initialBonus = weighted(initialPool || [[bigTemplate, 1]]) || bigTemplate;
        if (initialBonus.key === "dream") {
          appendKanokariDream({ source: `${kanokariCz?.label || "初当り"} 金7揃い`, sClass: Math.random() < (Number(sim.kanokariSDreamChance) || 0.04) });
        } else {
          appendKanokariBonus(initialBonus, { source: kanokariCz?.label || "初当り", initial: true });
        }

        let safety = 0;
        while (safety < 28 && payout < SLOT_COMPLETE_LIMIT) {
          safety += 1;
          if (normalStocks >= 2 && Math.random() < (Number(sim.kanokariAllLoveChance) || 0.07)) {
            const converted = normalStocks;
            normalStocks = 0;
            loveStocks += converted;
            kanokariLoveStocks += converted;
            kanokariAllLoveCount += 1;
            atEvents.push({ kind: "kanokari-all-love", label: "ALL 1G恋変換", games: 1, converted, normalStocks, loveStocks, cumulative: payout });
            flow.push(`ALL 1G恋変換・${converted}個を成功濃厚へ`);
          }

          if (loveStocks > 0 || normalStocks > 0) {
            const love = loveStocks > 0;
            if (love) loveStocks -= 1;
            else normalStocks -= 1;
            kanokariOneGameAttempts += 1;
            const forced = love || failedRentChances >= 5;
            const chance = forced ? 1 : Number(sim.kanokariRentChance) || 0.40;
            const success = forced || Math.random() < chance;
            if (success) {
              kanokariOneGameWins += 1;
              failedRentChances = 0;
            } else {
              failedRentChances += 1;
            }
            atGamesTotal += 2;
            atEvents.push({ kind: "kanokari-one-game", label: love ? "1G恋" : "1GレンCHANCE", games: 2, chance: chance * 100, success, forced, love, attempt: kanokariOneGameAttempts, win: kanokariOneGameWins, failStreak: failedRentChances, normalStocks, loveStocks, cumulative: payout });
            flow.push(`${love ? "1G恋" : "1GレンCHANCE"} ${kanokariOneGameAttempts}回目・${success ? "BONUS当選" : "失敗"}`);
            if (!success) continue;

            const successNumber = kanokariOneGameWins;
            if (successNumber % 4 === 0) {
              const specialEpisode = successNumber % 8 === 0;
              appendKanokariBonus({ key: specialEpisode ? "special-episode" : "episode", label: specialEpisode ? "スペシャルエピソードBONUS" : "ヒロインエピソードBONUS", games: 30, payout: 150 }, { source: `1G連成功${successNumber}回目`, specialEpisode });
              if (specialEpisode) {
                yumekanoMode = true;
                kanokariYumekanoEntries += 1;
              }
            } else if (Math.random() < (Number(sim.kanokariDreamChance) || 0.08) * (love ? 1.6 : 1)) {
              appendKanokariDream({ source: `${love ? "1G恋" : "1GレンCHANCE"} レア役成功`, sClass: Math.random() < (Number(sim.kanokariSDreamChance) || 0.04) });
            } else {
              const nextBonus = Math.random() < 0.16 ? { key: "reg", label: "REGULAR BONUS", games: 14, payout: 70 } : bigTemplate;
              appendKanokariBonus(nextBonus, { source: `${love ? "1G恋" : "1GレンCHANCE"}成功` });
            }
            continue;
          }

          if (!dreamTimeTriggered && payout >= (Number(sim.kanokariDreamTimeThreshold) || 1800)) {
            dreamTimeTriggered = true;
            const sClass = Math.random() < (Number(sim.kanokariSDreamTimeChance) || 0.03);
            const stockCount = Math.max(1, Number(weighted(sClass ? sim.kanokariSDreamTimeStocks : sim.kanokariDreamTimeStocks)) || (sClass ? 6 : 3));
            loveStocks += 1;
            normalStocks += Math.max(0, stockCount - 1);
            kanokariLoveStocks += 1;
            kanokariNormalStocks += Math.max(0, stockCount - 1);
            kanokariDreamTimeCount += 1;
            if (sClass) {
              kanokariSDreamTimeCount += 1;
              upper = true;
            }
            yumekanoMode = true;
            kanokariYumekanoEntries += 1;
            atGamesTotal += 15;
            atEvents.push({ kind: "kanokari-dream-time", label: sClass ? "S級DREAM TIME" : "DREAM TIME", games: 15, stocks: stockCount, loveStocks: 1, normalStocks: stockCount - 1, cumulative: payout, sClass });
            flow.push(`${sClass ? "S級" : ""}DREAM TIME・${stockCount}ストック`);
            continue;
          }

          kanokariReturnAttempts += 1;
          const returnChance = yumekanoMode ? Number(sim.kanokariYumekanoChance) || 0.58 : Number(sim.kanokariReturnChance) || 0.25;
          const returned = Math.random() < returnChance;
          if (returned) kanokariReturnWins += 1;
          atGamesTotal += 66;
          atEvents.push({ kind: "kanokari-return", label: yumekanoMode ? "ユメカノモード" : "引き戻しゾーン", games: 66, chance: returnChance * 100, success: returned, attempt: kanokariReturnAttempts, cumulative: payout, yumekano: yumekanoMode });
          flow.push(`${yumekanoMode ? "ユメカノモード" : "引き戻しゾーン"}・${returned ? "BONUS引き戻し" : "66G終了"}`);
          if (!returned) break;
          if (yumekanoMode && Math.random() < 0.18) {
            appendKanokariDream({ source: "ユメカノモード引き戻し", sClass: Math.random() < 0.12 });
          } else {
            appendKanokariBonus(bigTemplate, { source: `${yumekanoMode ? "ユメカノモード" : "引き戻し"}成功` });
          }
        }
        cycleRounds = bonusCount;
        cycleContinues = kanokariOneGameWins + kanokariReturnWins;
        basePayout = payout;
      } else if (sim.lycorisFlow) {
        payout = 0;
        basePayout = 0;
        lycorisRushRoute = weighted(sim.lycorisRushRoutes || [[{ key: "chisato", label: "千束ラッシュ", talent: "チェリー才能Lv2" }, 1]]);
        const prologueAward = Math.max(0, Math.min(100, SLOT_COMPLETE_LIMIT - payout));
        const prologueGames = Math.max(1, Math.round(prologueAward / 8.4));
        payout += prologueAward;
        atGamesTotal += prologueGames;
        atEvents.push({ kind: "lycoris-prologue", label: lycorisCz?.key === "direct" ? "アフターエピソード" : "プロローグ", route: lycorisRushRoute.label, talent: lycorisRushRoute.talent, games: prologueGames, award: prologueAward, cumulative: payout });
        flow.push(`${lycorisCz?.key === "direct" ? "アフターエピソード" : "プロローグ"} +${prologueAward}枚 → ${lycorisRushRoute.label}`);

        const chooseLycorisValue = value => Array.isArray(value) ? Number(weighted(value)) || 0 : Number(value) || 0;
        const appendLycorisBonus = ({ upperMode = false, source = "RUSH中" } = {}) => {
          const bonus = weighted(upperMode ? sim.lycorisUpperBonusTypes : sim.lycorisBonusTypes) || { key: "single", label: "リコリスBONUS", payout: 100, points: [[100, 1]] };
          const requestedAward = Math.max(0, chooseLycorisValue(bonus.payout));
          const award = Math.max(0, Math.min(requestedAward, SLOT_COMPLETE_LIMIT - payout));
          const points = Math.max(100, chooseLycorisValue(bonus.points) || 100);
          const bonusGames = Math.max(1, Math.ceil(award / Math.max(0.1, Number(sim.atPureIncrease) || 8.4)));
          payout += award;
          lycorisPoints += points;
          atGamesTotal += bonusGames;
          bonusCount += 1;
          bonusPayoutTotal += award;
          if (upperMode) lycorisUpperBonusCount += 1;
          else lycorisNormalBonusCount += 1;
          atEvents.push({ kind: "lycoris-bonus", label: bonus.label, bonusType: bonus.key, games: bonusGames, award, points, totalPoints: lycorisPoints, cumulative: payout, upper: upperMode, source, number: bonusCount });
          flow.push(`${bonus.label} +${award}枚・+${points}pt（累計${Math.min(1000, lycorisPoints)}pt）`);
          return bonus;
        };

        const appendLycorisRun = ({ kind, label, games: runGames, remaining, upperMode = false, section = 0 }) => {
          const safeGames = Math.max(0, Number(runGames) || 0);
          if (!safeGames) return;
          atGamesTotal += safeGames;
          atEvents.push({ kind, label, games: safeGames, remaining, cumulative: payout, points: lycorisPoints, upper: upperMode, section });
        };

        lycorisRush20Won = Math.random() < (Number(sim.lycorisRush20Chance) || 0.60);
        atGamesTotal += 20;
        atEvents.push({ kind: "lycoris-rush20", label: "リコリスラッシュ20", route: lycorisRushRoute.label, talent: lycorisRushRoute.talent, games: 20, chance: (Number(sim.lycorisRush20Chance) || 0.60) * 100, success: lycorisRush20Won, cumulative: payout });
        flow.push(`リコリスラッシュ20・${lycorisRush20Won ? "BONUS当選" : "20G駆け抜け"}`);

        if (lycorisRush20Won && payout < SLOT_COMPLETE_LIMIT) {
          appendLycorisBonus({ source: "リコリスラッシュ20" });
          let frontRemaining = 50;
          let frontBonuses = 0;
          const frontRate = Math.max(1, Number(sim.lycorisFrontBonusRate) || 18);
          while (frontRemaining > 0 && frontBonuses < 5 && payout < SLOT_COMPLETE_LIMIT) {
            const gap = geometric(frontRate);
            if (gap > frontRemaining) {
              appendLycorisRun({ kind: "lycoris-front", label: "リコリスラッシュ50・前半", games: frontRemaining, remaining: 0 });
              frontRemaining = 0;
              break;
            }
            frontRemaining -= gap;
            appendLycorisRun({ kind: "lycoris-front", label: "リコリスラッシュ50・前半", games: gap, remaining: frontRemaining });
            appendLycorisBonus({ source: "前半50G" });
            frontBonuses += 1;
          }

          const normalStChance = 1 - Math.pow(1 - 1 / Math.max(1, Number(sim.lycorisStBonusRate) || 12), 10);
          for (let st = 1; st <= 8 && payout < SLOT_COMPLETE_LIMIT; st += 1) {
            const success = Math.random() < normalStChance;
            atGamesTotal += 10;
            atEvents.push({ kind: "lycoris-st", label: "リコリスラッシュ50・ST", games: 10, chance: normalStChance * 100, success, reset: st, cumulative: payout, points: lycorisPoints, upper: false });
            flow.push(`ST ${st}回目・${success ? "BONUS当選／10G再セット" : "10G駆け抜け"}`);
            if (!success) break;
            lycorisStResets += 1;
            appendLycorisBonus({ source: `ST ${st}回目` });
          }

          if (lycorisPoints >= 1000 && payout < SLOT_COMPLETE_LIMIT) {
            lycorisUpperCzAttempts += 1;
            const upperSuccess = Math.random() < (Number(sim.lycorisUpperCzChance) || 0.70);
            if (upperSuccess) lycorisUpperCzWins += 1;
            atGamesTotal += Math.max(1, Number(sim.lycorisUpperCzGames) || 10);
            atEvents.push({ kind: "lycoris-upper-cz", label: sim.upperChallenge, games: Math.max(1, Number(sim.lycorisUpperCzGames) || 10), chance: (Number(sim.lycorisUpperCzChance) || 0.70) * 100, success: upperSuccess, cumulative: payout, points: lycorisPoints });
            flow.push(`${sim.upperChallenge}・${upperSuccess ? "成功" : "失敗"}`);
            upper = upperSuccess;
          }
        }

        if (upper && payout < SLOT_COMPLETE_LIMIT) {
          lycorisPoints = 0;
          if (Math.random() < (Number(sim.lycorisLegendaryChance) || 0.08)) {
            const requested = Math.max(1, Number(weighted(sim.lycorisLegendaryAwards || [[1000, 1]])) || 1000);
            lycorisLegendaryAward = Math.max(0, Math.min(requested, SLOT_COMPLETE_LIMIT - payout));
            payout += lycorisLegendaryAward;
            atGamesTotal += 7;
            addOnCount += 1;
            addOnTotal += lycorisLegendaryAward;
            coinAddOnCount += 1;
            coinAddOnTotal += lycorisLegendaryAward;
            atEvents.push({ kind: "lycoris-legendary", label: "レジェンダリーリコリス", games: 7, award: lycorisLegendaryAward, cumulative: payout });
            flow.push(`レジェンダリーリコリス +${lycorisLegendaryAward}枚`);
          }

          let upperActive = true;
          const upperMaxSections = Math.max(1, Number(sim.lycorisUpperMaxSections) || 3);
          while (upperActive && lycorisUpperSections < upperMaxSections && payout < SLOT_COMPLETE_LIMIT) {
            lycorisUpperSections += 1;
            upperLoops = lycorisUpperSections;
            let upperFrontRemaining = 50;
            let upperFrontBonuses = 0;
            const upperFrontRate = 14;
            while (upperFrontRemaining > 0 && upperFrontBonuses < 6 && payout < SLOT_COMPLETE_LIMIT) {
              const gap = geometric(upperFrontRate);
              if (gap > upperFrontRemaining) {
                appendLycorisRun({ kind: "lycoris-upper-front", label: sim.upperLabel, games: upperFrontRemaining, remaining: 0, upperMode: true, section: lycorisUpperSections });
                upperFrontRemaining = 0;
                break;
              }
              upperFrontRemaining -= gap;
              appendLycorisRun({ kind: "lycoris-upper-front", label: sim.upperLabel, games: gap, remaining: upperFrontRemaining, upperMode: true, section: lycorisUpperSections });
              appendLycorisBonus({ upperMode: true, source: `上位前半 SET ${lycorisUpperSections}` });
              upperFrontBonuses += 1;
            }

            const upperStChance = 1 - Math.pow(1 - 1 / 9, 10);
            for (let st = 1; st <= 10 && payout < SLOT_COMPLETE_LIMIT; st += 1) {
              const success = Math.random() < upperStChance;
              atGamesTotal += 10;
              atEvents.push({ kind: "lycoris-upper-st", label: "リコリスラッシュW・ST", games: 10, chance: upperStChance * 100, success, reset: st, section: lycorisUpperSections, cumulative: payout, points: lycorisPoints });
              if (!success) break;
              appendLycorisBonus({ upperMode: true, source: `上位ST SET ${lycorisUpperSections}` });
            }
            const reset = lycorisPoints >= 1000;
            atEvents.push({ kind: "lycoris-upper-reset", label: "虹MAX・上位再セット", games: 1, success: reset, section: lycorisUpperSections, cumulative: payout, points: lycorisPoints });
            flow.push(`リコリスラッシュW SET ${lycorisUpperSections}・${reset ? "1000pt到達／再セット" : "終了"}`);
            if (!reset) upperActive = false;
            else lycorisPoints = 0;
          }
        }
        cycleRounds = lycorisNormalBonusCount + lycorisUpperBonusCount;
        cycleContinues = lycorisStResets;
        basePayout = payout;
      } else if (sim.symphogearSeigiFlow) {
        payout = entryPayout;
        basePayout = 0;
        symphogearInitialRoute = weighted(sim.symphogearInitialRoutes || [[{ key: "normal", label: "響・通常開始", games: 40 }, 1]]);
        const initialGames = Math.max(0, Number(symphogearInitialRoute.games) || 0);
        let normalRemainingGames = initialGames;
        let normalEarnedCoins = 0;
        let nextGearVCoins = Math.max(1, Number(sim.symphogearGearVIntervalCoins?.[0]) || 50);
        let thresholdIndex = 0;
        let upperTriggered = Boolean(symphogearInitialRoute.upper);
        const acquiredCharacters = new Set();
        const resolvedUpperThresholds = new Set();
        atEvents.push({ kind: "symphogear-initial", label: "わたしは歌でぶん殴るッ！", route: symphogearInitialRoute.label, games: 1, initialGames, upper: upperTriggered, cumulative: payout });
        flow.push(`${symphogearInitialRoute.label}・${upperTriggered ? "絶唱" : `初期${initialGames}G`}`);

        const appendNormalRun = segmentGames => {
          const award = Math.max(0, Math.min(slotAwardForGames(segmentGames, Number(sim.atPureIncrease) || 2.8, 0), SLOT_COMPLETE_LIMIT - payout));
          payout += award;
          normalEarnedCoins += award;
          atGamesTotal += segmentGames;
          normalRemainingGames = Math.max(0, normalRemainingGames - segmentGames);
          atEvents.push({ kind: "symphogear-at-run", label: sim.mainLabel, games: segmentGames, award, cumulative: payout, remainingGames: normalRemainingGames, earnedCoins: normalEarnedCoins, section: symphogearGearVChances + 1 });
        };

        while (!upperTriggered && normalRemainingGames > 0 && symphogearGearVChances < Math.max(1, Number(sim.symphogearGearVMaxChances) || 8) && payout < SLOT_COMPLETE_LIMIT) {
          const coinsNeeded = Math.max(1, nextGearVCoins - normalEarnedCoins);
          const gamesToThreshold = Math.max(1, Math.ceil(coinsNeeded / Math.max(0.1, Number(sim.atPureIncrease) || 2.8)));
          const segmentGames = Math.min(normalRemainingGames, gamesToThreshold);
          appendNormalRun(segmentGames);
          if (normalEarnedCoins < nextGearVCoins || normalRemainingGames <= 0) break;

          symphogearGearVChances += 1;
          const availableCharacters = (sim.symphogearGearCharacters || []).filter(([character]) => !acquiredCharacters.has(character.key));
          const character = weighted(availableCharacters.length ? availableCharacters : sim.symphogearGearCharacters || [[{ key: "hibiki", label: "響", chance: 0.58, rewards: [[30, 1]] }, 1]]);
          const won = Math.random() < Math.max(0, Math.min(1, Number(character.chance) || 0.55));
          if (won) {
            symphogearGearVWins += 1;
            acquiredCharacters.add(character.key);
          }
          atGamesTotal += 5;
          atEvents.push({ kind: "symphogear-gear-v-chance", label: "ギアVチャンス", character: character.label, characterKey: character.key, games: 5, chance: Number(character.chance) * 100, won, attempt: symphogearGearVChances, wins: symphogearGearVWins, acquired: acquiredCharacters.size, cumulative: payout, remainingGames: normalRemainingGames });
          flow.push(`ギアVチャンス ${symphogearGearVChances}回目・${character.label} ${won ? "獲得" : "非獲得"}`);
          if (won) {
            const addGames = Math.max(1, Number(weighted(character.rewards || [[30, 1]])) || 30);
            normalRemainingGames += addGames;
            symphogearGearVAttacks += 1;
            symphogearTotalAddGames += addGames;
            addOnCount += 1;
            addOnGamesTotal += addGames;
            atEvents.push({ kind: "symphogear-gear-v-attack", label: `${character.label} ギアVアタック`, character: character.label, characterKey: character.key, games: 1, addGames, attack: symphogearGearVAttacks, cumulative: payout, remainingGames: normalRemainingGames });
            flow.push(`${character.label} ギアVアタック +${addGames}G`);
          }

          if (acquiredCharacters.size >= 5 && payout < SLOT_COMPLETE_LIMIT) {
            const exGames = Math.max(1, Number(weighted(sim.symphogearExRewards || [[50, 1]])) || 50);
            normalRemainingGames += exGames;
            symphogearExCount += 1;
            symphogearTotalAddGames += exGames;
            addOnCount += 1;
            addOnGamesTotal += exGames;
            acquiredCharacters.clear();
            atEvents.push({ kind: "symphogear-ex", label: "ギアVアタック EX", games: 10, addGames: exGames, cumulative: payout, remainingGames: normalRemainingGames, number: symphogearExCount });
            flow.push(`ギアVアタック EX +${exGames}G`);
          }

          const crossedThreshold = (sim.symphogearUpperThresholds || []).find(threshold => normalEarnedCoins >= Number(threshold.coins) && !resolvedUpperThresholds.has(Number(threshold.coins)));
          if (crossedThreshold) {
            resolvedUpperThresholds.add(Number(crossedThreshold.coins));
            const promoted = Math.random() < Math.max(0, Math.min(1, Number(crossedThreshold.chance) || 0));
            atEvents.push({ kind: "symphogear-upper-promote", label: "上位移行抽選", games: 1, coins: Number(crossedThreshold.coins), chance: Number(crossedThreshold.chance) * 100, success: promoted, cumulative: payout });
            flow.push(`${crossedThreshold.coins}枚到達・上位移行${promoted ? "成功" : "非当選"}`);
            upperTriggered = promoted;
          }
          if (!upperTriggered && Math.random() < 0.02) {
            upperTriggered = true;
            atEvents.push({ kind: "symphogear-upper-promote", label: "ギアフラグ", games: 1, coins: normalEarnedCoins, chance: 2, success: true, cumulative: payout });
            flow.push("ギアフラグ成立・絶唱");
          }
          thresholdIndex += 1;
          nextGearVCoins = thresholdIndex === 1 ? 100 : thresholdIndex * 100;
        }
        if (!upperTriggered && normalRemainingGames > 0 && payout < SLOT_COMPLETE_LIMIT) appendNormalRun(normalRemainingGames);

        const appendZessho = ({ golden = false, source = "絶唱" } = {}) => {
          const rewardTable = golden ? sim.symphogearGoldenZesshoRewards : sim.symphogearZesshoRewards;
          const addGames = Math.max(1, Number(weighted(rewardTable || [[100, 1]])) || (golden ? 360 : 100));
          symphogearTotalAddGames += addGames;
          addOnCount += 1;
          addOnGamesTotal += addGames;
          if (golden) symphogearGoldenZesshoGames += addGames;
          else symphogearZesshoCount += 1;
          atGamesTotal += golden ? 10 : 5;
          atEvents.push({ kind: golden ? "symphogear-golden-zessho" : "symphogear-zessho", label: golden ? "黄金絶唱" : "絶唱", games: golden ? 10 : 5, addGames, source, cumulative: payout, number: golden ? symphogearGoldenZesshoGames : symphogearZesshoCount });
          flow.push(`${golden ? "黄金絶唱" : "絶唱"} +${addGames}G`);
          return addGames;
        };

        if (upperTriggered && payout < SLOT_COMPLETE_LIMIT) {
          upper = true;
          let upperGames = appendZessho({ source: symphogearInitialRoute.upper ? "初期ギアフラグ" : "上位移行" });
          let upperActive = true;
          while (upperActive && symphogearUpperSections < 5 && payout < SLOT_COMPLETE_LIMIT) {
            symphogearUpperSections += 1;
            upperLoops = symphogearUpperSections;
            let sectionRemaining = upperGames;
            let sectionEvents = 0;
            while (sectionRemaining > 0 && sectionEvents < 8 && payout < SLOT_COMPLETE_LIMIT) {
              const segmentGames = Math.min(sectionRemaining, 30);
              const segmentAward = Math.max(0, Math.min(slotAwardForGames(segmentGames, Number(sim.upperPureIncrease) || 5, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += segmentAward;
              upperPayoutTotal += segmentAward;
              atGamesTotal += segmentGames;
              sectionRemaining -= segmentGames;
              sectionEvents += 1;
              atEvents.push({ kind: "symphogear-upper-run", label: sim.upperLabel, games: segmentGames, award: segmentAward, cumulative: payout, remainingGames: sectionRemaining, section: symphogearUpperSections });
              if (payout >= SLOT_COMPLETE_LIMIT) break;
              if (Math.random() < (Number(sim.symphogearUpperBonusChance) || 0.18)) {
                const bonusGames = Math.max(1, Number(weighted(sim.symphogearUpperBonusGames || [[20, 1]])) || 20);
                const bonusAward = Math.max(0, Math.min(slotAwardForGames(bonusGames, Number(sim.upperPureIncrease) || 5, 0), SLOT_COMPLETE_LIMIT - payout));
                payout += bonusAward;
                upperPayoutTotal += bonusAward;
                atGamesTotal += bonusGames;
                bonusCount += 1;
                bonusPayoutTotal += bonusAward;
                symphogearBonusCount += 1;
                atEvents.push({ kind: "symphogear-bonus", label: "シンフォギアBONUS", games: bonusGames, award: bonusAward, cumulative: payout, section: symphogearUpperSections, number: symphogearBonusCount });
              } else if (Math.random() < 0.30) {
                const addGames = Math.max(1, Number(weighted(sim.symphogearUpperAdditions || [[10, 1]])) || 10);
                sectionRemaining += addGames;
                symphogearTotalAddGames += addGames;
                addOnCount += 1;
                addOnGamesTotal += addGames;
                atEvents.push({ kind: "symphogear-upper-add", label: "AXZ目上乗せ", games: 1, addGames, cumulative: payout, remainingGames: sectionRemaining, section: symphogearUpperSections });
              }
            }
            if (sectionRemaining > 0 && payout < SLOT_COMPLETE_LIMIT) {
              const finalAward = Math.max(0, Math.min(slotAwardForGames(sectionRemaining, Number(sim.upperPureIncrease) || 5, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += finalAward;
              upperPayoutTotal += finalAward;
              atGamesTotal += sectionRemaining;
              atEvents.push({ kind: "symphogear-upper-run", label: sim.upperLabel, games: sectionRemaining, award: finalAward, cumulative: payout, remainingGames: 0, section: symphogearUpperSections, summary: true });
            }
            if (payout >= SLOT_COMPLETE_LIMIT) break;
            symphogearZesshoBattleAttempts += 1;
            const won = Math.random() < (Number(sim.upperSuccess) || 0.60);
            if (won) symphogearZesshoBattleWins += 1;
            atGamesTotal += 5;
            atEvents.push({ kind: "symphogear-zessho-battle", label: sim.upperChallenge, games: 5, chance: (Number(sim.upperSuccess) || 0.60) * 100, success: won, attempt: symphogearZesshoBattleAttempts, wins: symphogearZesshoBattleWins, cumulative: payout, section: symphogearUpperSections });
            flow.push(`${sim.upperChallenge} ${symphogearUpperSections}回目・${won ? "勝利" : "敗北"}`);
            if (!won) {
              upperActive = false;
              break;
            }
            const golden = Math.random() < (Number(sim.symphogearGoldenZesshoChance) || 0.04);
            upperGames = appendZessho({ golden, source: sim.upperChallenge });
          }
        }
        cycleRounds = symphogearGearVChances;
        cycleContinues = symphogearGearVWins;
        basePayout = payout - entryPayout;
      } else if (sim.sao2Flow) {
        payout = entryPayout;
        basePayout = 0;
        const initialCoins = Math.max(1, Number(weighted(sim.sao2InitialCoins || [[150, 1]])) || 150);
        let remainingCoins = initialCoins;
        let deathGunRight = false;
        const initialAward = Math.max(0, Math.min(initialCoins, SLOT_COMPLETE_LIMIT - payout));
        payout += initialAward;
        atEvents.push({ kind: "sao2-at-start", label: sim.mainLabel, games: 1, award: initialAward, cumulative: payout, remainingCoins });
        flow.push(`${sim.mainLabel} 初期${yen.format(initialCoins)}枚`);

        const runSniperChance = source => {
          if (payout >= SLOT_COMPLETE_LIMIT) return false;
          sao2SniperAttempts += 1;
          const opponent = weighted(sim.sao2SniperOpponents || [[{ key: "dyne", label: "ダイン", chance: 0.72 }, 1]]);
          const won = Math.random() < Math.max(0, Math.min(1, Number(opponent.chance) || 0.50));
          let reward = 0;
          if (won) {
            sao2SniperWins += 1;
            reward = Math.max(0, Math.min(Number(weighted([[50, 0.55], [100, 0.32], [200, 0.10], [300, 0.03]])) || 50, SLOT_COMPLETE_LIMIT - payout));
            payout += reward;
            remainingCoins += reward;
            if (opponent.upperRight) deathGunRight = true;
          }
          atGamesTotal += 5;
          atEvents.push({ kind: "sao2-sniper", label: "スナイパーチャンス", opponent: opponent.label, games: 5, chance: Number(opponent.chance) * 100, won, reward, source, attempt: sao2SniperAttempts, wins: sao2SniperWins, upperRight: Boolean(opponent.upperRight && won), cumulative: payout, remainingCoins });
          flow.push(`SC ${sao2SniperAttempts}回目 VS ${opponent.label}・${won ? `勝利 +${reward}枚` : "敗北"}`);
          return won;
        };

        const sniperMaxWins = Math.max(1, Number(sim.sao2SniperMaxWins) || 3);
        const sniperInterval = Math.max(1, Number(sim.sao2SniperInterval) || 20);
        while (remainingCoins > 0 && sao2SniperAttempts < 12 && sao2SniperWins < sniperMaxWins && !deathGunRight && payout < SLOT_COMPLETE_LIMIT) {
          const spend = Math.min(remainingCoins, Math.round(sniperInterval * (Number(sim.atPureIncrease) || 3.6)));
          remainingCoins -= spend;
          atGamesTotal += sniperInterval;
          atEvents.push({ kind: "sao2-at-run", label: sim.mainLabel, games: sniperInterval, spentCoins: spend, remainingCoins, cumulative: payout, interval: sao2SniperAttempts + 1 });
          runSniperChance("20G周期");
        }

        if (!deathGunRight && sao2SniperWins < sniperMaxWins && payout < SLOT_COMPLETE_LIMIT) {
          sao2LastAttackAttempts += 1;
          const lastAttackSuccess = Math.random() < (Number(sim.sao2LastAttackChance) || 0.35);
          if (lastAttackSuccess) sao2LastAttackSuccesses += 1;
          atGamesTotal += Math.max(1, Number(sim.sao2LastAttackGames) || 5);
          atEvents.push({ kind: "sao2-last-attack", label: "ラストアタック", games: Math.max(1, Number(sim.sao2LastAttackGames) || 5), chance: (Number(sim.sao2LastAttackChance) || 0.35) * 100, success: lastAttackSuccess, cumulative: payout });
          flow.push(`ラストアタック ${lastAttackSuccess ? "成功" : "失敗"}`);
          if (lastAttackSuccess) runSniperChance("ラストアタック");
        }

        deathGunRight ||= sao2SniperWins >= sniperMaxWins;
        const resolveDeathGunBattle = ({ ultima = false } = {}) => {
          sao2DeathGunAttempts += 1;
          const chance = ultima ? (Number(sim.sao2UltimaDeathGunChance) || 0.72) : (Number(sim.sao2DeathGunChance) || 0.50);
          const success = Math.random() < chance;
          if (success) sao2DeathGunWins += 1;
          atGamesTotal += Math.max(1, Number(sim.sao2DeathGunGames) || 5);
          atEvents.push({ kind: "sao2-death-gun", label: sim.upperChallenge, games: Math.max(1, Number(sim.sao2DeathGunGames) || 5), chance: chance * 100, success, ultima, attempt: sao2DeathGunAttempts, cumulative: payout });
          flow.push(`${sim.upperChallenge} ${success ? "勝利" : "敗北"}${ultima ? "・アルティマ状態" : ""}`);
          return success;
        };

        let upperActive = deathGunRight && resolveDeathGunBattle();
        upper = upperActive;
        while (upperActive && sao2UpperSections < 10 && payout < SLOT_COMPLETE_LIMIT) {
          sao2UpperSections += 1;
          upperLoops = sao2UpperSections;
          const zekken = sao2UpperSections === 1 && Math.random() < (Number(sim.sao2ZekkenChance) || 0.08);
          if (zekken) {
            sao2ZekkenAward = Math.max(0, Math.min(Number(weighted(sim.sao2ZekkenAwards || [[2200, 1]])) || 2200, SLOT_COMPLETE_LIMIT - payout));
            payout += sao2ZekkenAward;
            upperPayoutTotal += sao2ZekkenAward;
            sao2Ultima = true;
            const zekkenGames = Math.max(1, Math.round(sao2ZekkenAward / (Number(sim.upperPureIncrease) || 7.2)));
            atGamesTotal += zekkenGames;
            atEvents.push({ kind: "sao2-zekken", label: "絶剣", games: zekkenGames, award: sao2ZekkenAward, cumulative: payout, section: sao2UpperSections });
            flow.push(`絶剣 +${yen.format(sao2ZekkenAward)}枚・アルティマ状態`);
          } else {
            const upperAward = Math.max(0, Math.min(Number(weighted(sim.sao2UpperAwards || [[300, 1]])) || 300, SLOT_COMPLETE_LIMIT - payout));
            payout += upperAward;
            upperPayoutTotal += upperAward;
            const upperGames = Math.max(1, Math.round(upperAward / (Number(sim.upperPureIncrease) || 7.2)));
            atGamesTotal += upperGames;
            atEvents.push({ kind: "sao2-upper", label: sim.upperLabel, games: upperGames, award: upperAward, cumulative: payout, section: sao2UpperSections, ultima: sao2Ultima });
            flow.push(`${sim.upperLabel} ${sao2UpperSections}区間目 +${yen.format(upperAward)}枚`);
            if (!sao2Ultima && Math.random() < (Number(sim.sao2UltimaChance) || 0.20)) sao2Ultima = true;
          }
          if (payout >= SLOT_COMPLETE_LIMIT) break;
          upperActive = resolveDeathGunBattle({ ultima: sao2Ultima });
        }
        cycleRounds = sao2SniperAttempts;
        cycleContinues = sao2SniperWins;
        basePayout = payout - entryPayout;
      } else if (sim.tokyoGhoulFlow) {
        payout = entryPayout;
        basePayout = 0;
        tokyoGhoulCz = weighted(sim.tokyoGhoulCzRoutes || [[{ key: "reminiscence", label: "レミニセンス", games: 8, chance: 0.50 }, 1]]);
        flow[0] = `${games}Gで${tokyoGhoulCz.label}`;
        const initialCoins = Math.max(1, Number(sim.tokyoGhoulInitialCoins) || 150);
        const initialAward = Math.max(0, Math.min(initialCoins, SLOT_COMPLETE_LIMIT - payout));
        let remainingCoins = initialAward;
        payout += initialAward;
        atEvents.push({ kind: "tokyo-ghoul-start", label: sim.mainLabel, games: 1, award: initialAward, cumulative: payout, remainingCoins, cz: tokyoGhoulCz.label });
        flow.push(`${sim.mainLabel} 初期約${initialAward}枚`);
        tokyoGhoulArimaBattle = Number(weighted(sim.tokyoGhoulArimaBattles || [[10, 1]])) || 10;

        const normalBitesRewards = [[50, 0.32], [100, 0.30], [200, 0.22], [300, 0.11], [500, 0.05]];
        const superBitesRewards = [[300, 0.34], [500, 0.30], [1000, 0.22], [2000, 0.10], [3000, 0.04]];
        const extremeBitesRewards = [[2000, 0.72], [5000, 0.28]];
        while (remainingCoins > 0 && tokyoGhoulBattles < 10 && payout < SLOT_COMPLETE_LIMIT) {
          const segmentGames = Math.max(1, Math.min(Math.floor(remainingCoins / 4) || 1, Number(weighted([[10, 0.42], [15, 0.33], [20, 0.18], [25, 0.07]])) || 10));
          const spentCoins = Math.min(remainingCoins, segmentGames * 4);
          remainingCoins -= spentCoins;
          atGamesTotal += segmentGames;
          atEvents.push({ kind: "tokyo-ghoul-segment", label: sim.mainLabel, games: segmentGames, spentCoins, remainingCoins, cumulative: payout, section: tokyoGhoulBattles + 1 });
          if (remainingCoins <= 0) {
            flow.push(`${sim.mainLabel} 残り差枚0枚・終了`);
            break;
          }

          tokyoGhoulBattles += 1;
          const isArima = tokyoGhoulBattles === tokyoGhoulArimaBattle;
          const opponent = isArima ? { label: "有馬貴将", chance: 0.67 } : weighted(sim.tokyoGhoulOpponents || [[{ label: "鯱", chance: 0.40 }, 1]]);
          const won = Math.random() < Math.max(0, Math.min(1, Number(opponent.chance) || 0.50));
          if (won) tokyoGhoulWins += 1;
          if (isArima && won) tokyoGhoulArimaWon = true;
          atGamesTotal += 4;
          atEvents.push({ kind: "tokyo-ghoul-battle", label: "喰種対決", opponent: opponent.label, games: 4, chance: Number(opponent.chance) * 100, won, arima: isArima, battle: tokyoGhoulBattles, remainingCoins, cumulative: payout });
          flow.push(`喰種対決 ${tokyoGhoulBattles}戦目 VS ${opponent.label}・${won ? "勝利" : "敗北"}`);
          if (!won) continue;

          const bitesMode = weighted(sim.tokyoGhoulBitesModes || [[{ key: "normal", label: "BITES" }, 1]]);
          const bitesReward = Number(weighted(bitesMode.key === "extreme" ? extremeBitesRewards : bitesMode.key === "super" ? superBitesRewards : normalBitesRewards)) || 50;
          const bitesAward = Math.max(0, Math.min(bitesReward, SLOT_COMPLETE_LIMIT - payout));
          const bitesGames = bitesMode.key === "extreme" ? 3 : bitesMode.key === "super" ? randomInt(2, 6) : randomInt(1, 5);
          payout += bitesAward;
          remainingCoins += bitesAward;
          atGamesTotal += bitesGames;
          tokyoGhoulBitesCount += 1;
          addOnCount += 1;
          addOnTotal += bitesAward;
          coinAddOnCount += 1;
          coinAddOnTotal += bitesAward;
          atEvents.push({ kind: "tokyo-ghoul-bites", label: bitesMode.label, mode: bitesMode.key, games: bitesGames, award: bitesAward, cumulative: payout, remainingCoins, battle: tokyoGhoulBattles });
          flow.push(`${bitesMode.label} +${yen.format(bitesAward)}枚`);

          if (payout < SLOT_COMPLETE_LIMIT && Math.random() < (Number(sim.specialChance) || 0.08)) {
            const special = weighted([[{ label: "百足覚醒", award: 300, games: 5 }, 0.65], [{ label: "隻眼の梟", award: Number(weighted([[300, 0.55], [500, 0.30], [1000, 0.12], [2000, 0.03]])) || 300, games: 1 }, 0.35]]);
            const specialAward = Math.max(0, Math.min(Number(special.award) || 300, SLOT_COMPLETE_LIMIT - payout));
            payout += specialAward;
            remainingCoins += specialAward;
            atGamesTotal += Number(special.games) || 1;
            tokyoGhoulSpecialCount += 1;
            addOnCount += 1;
            addOnTotal += specialAward;
            coinAddOnCount += 1;
            coinAddOnTotal += specialAward;
            atEvents.push({ kind: "tokyo-ghoul-special", label: special.label, games: Number(special.games) || 1, award: specialAward, cumulative: payout, remainingCoins, number: tokyoGhoulSpecialCount });
            flow.push(`${special.label} +${yen.format(specialAward)}枚`);
          }
        }

        if (tokyoGhoulArimaWon && payout < SLOT_COMPLETE_LIMIT) {
          const judgeSuccess = Math.random() < (Number(sim.upperSuccess) || 0.61);
          atGamesTotal += 5;
          atEvents.push({ kind: "tokyo-ghoul-upper-judge", label: sim.upperChallenge, games: 5, chance: (Number(sim.upperSuccess) || 0.61) * 100, success: judgeSuccess, cumulative: payout });
          flow.push(`${sim.upperChallenge} ${judgeSuccess ? "成功" : "失敗"}`);
          if (judgeSuccess) {
            upper = true;
            tokyoGhoulCcgAward = Math.max(0, Math.min(Number(weighted(sim.tokyoGhoulCcgRewards || [[300, 1]])) || 300, SLOT_COMPLETE_LIMIT - payout));
            payout += tokyoGhoulCcgAward;
            upperPayoutTotal += tokyoGhoulCcgAward;
            addOnCount += 1;
            addOnTotal += tokyoGhoulCcgAward;
            coinAddOnCount += 1;
            coinAddOnTotal += tokyoGhoulCcgAward;
            atEvents.push({ kind: "tokyo-ghoul-ccg", label: "CCGの死神", games: 1, award: tokyoGhoulCcgAward, cumulative: payout });
            flow.push(`CCGの死神 +${yen.format(tokyoGhoulCcgAward)}枚`);
            tokyoGhoulUpperAt = Math.random() < (Number(sim.tokyoGhoulUpperAtChance) || 0.55);
            if (tokyoGhoulUpperAt && payout < SLOT_COMPLETE_LIMIT) {
              const upperAward = Math.max(0, Math.min(slotAwardForGames(100, Number(sim.upperPureIncrease) || 5, 0), SLOT_COMPLETE_LIMIT - payout));
              payout += upperAward;
              upperPayoutTotal += upperAward;
              upperLoops = 1;
              atGamesTotal += 100;
              atEvents.push({ kind: "tokyo-ghoul-upper", label: "東京喰種咬 裏AT", games: 100, award: upperAward, cumulative: payout, chance: (Number(sim.tokyoGhoulUpperAtChance) || 0.55) * 100 });
              flow.push(`東京喰種咬 裏AT 100G＋α・+${yen.format(upperAward)}枚`);
            }
          }
        }
        cycleRounds = tokyoGhoulBattles;
        cycleContinues = tokyoGhoulWins;
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
          atEvents.push({ kind: "cycle-round", label: cycle.label || sim.mainLabel, roundTitle, roundDetail, phase: cycle.phase || "AT LOOP", rewardLabel: awardAllowed ? rewardTemplate.label || cycle.rewardLabel || "報酬獲得" : roundConfig?.failureResultLabel || `${roundTitle} 敗北`, rewardKind, games: cycleGames, gameAdd: awardAllowed ? gameAdd : 0, bonusGames: awardAllowed ? bonusGames : 0, award, cumulative: payout, round, continued, completed: round === maxRounds && cycle.markFinalRoundComplete !== false, continueChance: roundContinueChance * 100, failureGames, failureLabel: roundConfig?.failureLabel || "引き戻しZONE", endLabel: cycle.endLabel || "AT終了", titleFlow: sim.titleFlow || null });
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
      } else if (!sim.battleBonusFlow && !sim.sgRaceFlow && !sim.kabaneriStFlow && !sim.otomeRushFlow && !sim.cycleFlow && !sim.godzillaEva2Flow && !sim.mahoakoFlow && !sim.okidokiGoldFlow && !sim.uminchuFlow && !sim.tentenFlow && !sim.goblinSlayerFlow && !sim.assaultLilyFlow && !sim.kaguyaFlow && !sim.dumbbellFlow && !sim.shinEvaFlow && !sim.sao2Flow && !sim.symphogearSeigiFlow && !sim.lycorisFlow && !sim.kanokariFlow) {
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
    const upperResultLabel = sim.okidokiGoldFlow
      ? okidokiHighestMode
      : sim.tokyoGhoulFlow
      ? (tokyoGhoulUpperAt ? "東京喰種咬 裏AT" : "CCGの死神")
      : sim.kanokariFlow
      ? (kanokariSDreamTimeCount ? "S級DREAM TIME" : "S級ななかりDREAM")
      : sim.aobutaFlow
      ? sim.upperLabel
      : sim.bofuriFlow
      ? sim.upperLabel
      : kabaneriUpperMode || sim.upperLabel;
    const resultLabel = complete ? "コンプリート" : upper ? upperResultLabel : entered ? sim.mainLabel : entryBonus ? `${entryBonus.label}終了` : `${sim.triggerLabel}失敗`;
    const atGameTimeline = atEvents.map(event => Math.max(1, Number(event.games) || 1));
    const settingRateStats = [[`設定${setting}の${sim.triggerLabel}`, `約1/${triggerRate.toFixed(1)}`]];
    if (!sim.okidokiGoldFlow && (sim.mainLabel !== sim.triggerLabel || Math.abs(mainRate - triggerRate) >= 0.05)) {
      const mainRateLabel = sim.mainRateLabel || (machine.initialHitLabel ? "ボーナス初当り" : sim.mainLabel);
      settingRateStats.push([`設定${setting}の${mainRateLabel}`, `約1/${mainRate.toFixed(1)}`]);
    }
    const karakuriStats = sim.karakuriJudgeFlow ? [["激情ジャッジ", `${karakuriJudgeAttempts}回中 ${karakuriJudgeSuccesses}回成功`], ["上位ジャッジ", karakuriUpperRoute || "権利未獲得"]] : [];
    const battleStats = sim.battleBonusFlow ? [["BB継続モード", `${Math.round(battleContinuationRate * 100)}%`], ["バトルボーナス", `${battleBonusSets}連`]] : [];
    const sgStats = sim.sgRaceFlow ? [["SGシナリオ", sgScenarioName], ["SG RUSH", `${sgRushSets}セット`], ["グランドスラム", sgRushSets === 8 ? "達成" : "未達"]] : [];
    const kabaneriStats = sim.kabaneriStFlow ? [["ST中ボーナス", `${kabaneriStBonuses}回`], ["上位ST", kabaneriUpperMode ? `${kabaneriUpperMode}・${upperLoops}回当選` : "非到達"]] : [];
    const otomeStats = sim.otomeRushFlow ? [["ゲーム数上乗せ", `+${yen.format(otomeAddedGames)}G`], [sim.otomeBonusLabel || "出陣ボーナス", `${otomeBonusCount}回`], [sim.specialLabel || "特化ゾーン", otomeAwakeningCount ? `${otomeAwakeningCount}回` : "非当選"], [sim.otomeBattleLabel || "オウガイバトル", otomeBattleWon ? "勝利" : "敗北"]] : [];
    const okidokiStats = sim.okidokiGoldFlow ? [["BONUS内訳", `BIG ${okidokiBigCount}回・REG ${okidokiRegCount}回`], ["最大32G連", `${okidokiMaxChain}連`], ["最高内部モード", okidokiHighestMode], ["1G連", `${okidokiOneGameCount}回`], ["保証BONUS", `${okidokiGuaranteeCount}回`], ["金ドキ", okidokiGoldCount ? `${okidokiGoldCount}回` : "非到達"], ["GODモード", okidokiGodMode ? "到達" : "非到達"]] : [];
    const uminchuStats = sim.uminchuFlow ? [["BONUS内訳", `BIG ${uminchuBigCount}回・REG ${uminchuRegCount}回`], ["最大32G連", `${uminchuMaxChain}連`], ["IREGUI", uminchuIreguiCount ? `${uminchuIreguiCount}回` : "非到達"], ["獲得ストック", `${uminchuStockCount}個`]] : [];
    const tentenStats = sim.tentenFlow ? [["初回BONUS", entered ? "約100枚" : "非当選"], ["王宮BONUS", `${tentenPalaceBonusCount}回`], ["デュエットBIG", `${tentenDuetCount}回`], ["転天STOCK", tentenStockChallengeCount ? `${tentenStockChallengeCount}回・${tentenStockCount}個` : "非当選"], ["輪廻転天", upper ? `到達・上位BONUS ${tentenUpperBonusCount}回` : "非到達"]] : [];
    const goblinStats = sim.goblinSlayerFlow ? [["今回の入口", goblinCz?.label || sim.triggerLabel], ["ループモード", `${Math.round(goblinLoopMode * 100)}%モード`], ["通常AT", `${goblinAtSets}セット`], ["最大継続率", `${goblinMaxContinueRate}%`], ["ゴブリンロード", goblinLordBattles ? `${goblinLordBattles}回` : "未遭遇"], ["GS BONUS", `${goblinBonusCount}回`], ["ULTIMATE LOOP", upper ? `${upperLoops}セット` : "非到達"]] : [];
    const assaultStats = sim.assaultLilyFlow ? [["今回の入口", assaultEntry?.label || sim.triggerLabel], ["ボスヒュージ襲来", `${assaultBossBattles}回・撃破${assaultBossWins}回`], ["上乗せ特化", `${assaultRewardCount}回`], ["最大上乗せ", `+${yen.format(assaultMaxAddOn)}枚`], [sim.upperChallenge, assaultUpperCzAttempts ? `${assaultUpperCzAttempts}回・最終${assaultUpperCz}` : "未到達"], [sim.upperLabel, upper ? `到達・上位報酬${upperLoops}回` : "非到達"]] : [];
    const kaguyaStats = sim.kaguyaFlow ? [["BONUS内訳", `REG ${kaguyaRegCount}回・BIG ${kaguyaBigCount}回・SUPER BIG ${kaguyaSuperCount}回`], ["BONUS連", `${cycleRounds}連`], ["1G連", `${kaguyaOneGameCount}回`], ["引き戻し", `${kaguyaReturnCount}回`], ["特化ゾーン", kaguyaSpecialCount ? `${kaguyaSpecialCount}回・ストック${kaguyaStockCount}個` : "非当選"], [sim.upperChallenge, kaguyaMarriageCount ? `${kaguyaMarriageCount}回` : "非到達"], [sim.upperLabel, kaguyaExtraGames ? `${upperLoops}セット・${kaguyaExtraGames}G` : "非到達"]] : [];
    const dumbbellStats = sim.dumbbellFlow ? [["CZ発展先", dumbbellCz?.label || sim.triggerLabel], ["通常AT", `${dumbbellNormalGames}G`], ["ゲーム数上乗せ", dumbbellGameAddCount ? `${dumbbellGameAddCount}回・+${dumbbellGameAddTotal}G` : "上乗せなし"], [sim.upperChallenge, dumbbellGoldenChallenges ? `${dumbbellGoldenChallenges}回・成功${dumbbellGoldenSuccesses ? "あり" : "なし"}` : "未獲得"], ["Vストック", `${dumbbellVStockTotal}個`], [sim.upperLabel, upper ? `${upperLoops}回` : "非到達"], ["差枚数上乗せ", dumbbellCoinAddTotal ? `+${yen.format(dumbbellCoinAddTotal)}枚` : "上乗せなし"], ["引き戻しCZ", dumbbellRisingChallenges ? `${dumbbellRisingChallenges}回` : "未到達"]] : [];
    const shinEvaStats = sim.shinEvaFlow ? [["作戦ST", `${shinEvaOperationRounds}回・進行${shinEvaPhaseAdvances}段階`], ["BONUS内訳", `BIG ${shinEvaBigCount}回・SUPER BIG ${shinEvaSuperCount}回・SPECIAL ${shinEvaSpecialCount}回`], ["作戦進行ストック", `${shinEvaProgressStocks}個`], ["Vストック", `${shinEvaVStocks}個`], [sim.specialLabel, shinEvaSankiCount ? `${shinEvaSankiCount}回` : "非到達"], [sim.upperChallenge, shinEvaMariAttempts ? `${shinEvaMariAttempts}回・成功${shinEvaMariSuccesses}回` : "未到達"], [sim.upperLabel, upper ? `${shinEvaUpperLoops}セット` : "非到達"]] : [];
    const tokyoGhoulStats = sim.tokyoGhoulFlow ? [["今回のCZ", tokyoGhoulCz?.label || sim.triggerLabel], ["喰種対決", `${tokyoGhoulBattles}戦・勝利${tokyoGhoulWins}回`], ["BITES", `${tokyoGhoulBitesCount}回`], ["特化ゾーン", tokyoGhoulSpecialCount ? `${tokyoGhoulSpecialCount}回` : "非当選"], ["有馬貴将", tokyoGhoulArimaBattle ? `${tokyoGhoulArimaBattle}戦目・${tokyoGhoulArimaWon ? "勝利" : "敗北または未到達"}` : "未到達"], ["CCGの死神", tokyoGhoulCcgAward ? `+${yen.format(tokyoGhoulCcgAward)}枚` : "非到達"], ["裏AT", tokyoGhoulUpperAt ? "到達・100G＋α" : "非到達"]] : [];
    const basiliskStats = sim.basiliskTenzenFlow ? [["初当りBC", basiliskBc?.label || sim.triggerLabel], ["BTシナリオ", basiliskScenario?.name || "BT非突入"], ["通常BT", `${basiliskSets}セット`], ["BT中BC", `${basiliskBtBcCount}回`], ["絆高確", `${basiliskHighCount}セット`], ["月下閃滅", basiliskMoonCount ? `${basiliskMoonCount}回` : "非当選"], [sim.upperChallenge, basiliskGrudgeAttempts ? `${basiliskGrudgeAttempts}回・成功${basiliskGrudgeSuccesses}回` : "未到達"], [sim.upperLabel, basiliskTenzenSets ? `${basiliskTenzenSets}セット` : "非到達"]] : [];
    const sao2Stats = sim.sao2Flow ? [["スナイパーチャンス", `${sao2SniperAttempts}回・勝利${sao2SniperWins}回`], ["ラストアタック", sao2LastAttackAttempts ? `${sao2LastAttackAttempts}回・成功${sao2LastAttackSuccesses}回` : "未到達"], [sim.upperChallenge, sao2DeathGunAttempts ? `${sao2DeathGunAttempts}回・勝利${sao2DeathGunWins}回` : "未到達"], [sim.upperLabel, sao2UpperSections ? `${sao2UpperSections}区間` : "非到達"], ["絶剣", sao2ZekkenAward ? `+${yen.format(sao2ZekkenAward)}枚` : "非当選"], ["アルティマ状態", sao2Ultima ? "移行" : "非移行"]] : [];
    const symphogearStats = sim.symphogearSeigiFlow ? [["初期ゲーム", symphogearInitialRoute?.upper ? "ギアフラグ・絶唱" : `${symphogearInitialRoute?.label || "通常"}・${symphogearInitialRoute?.games || 0}G`], ["ギアVチャンス", `${symphogearGearVChances}回・装者獲得${symphogearGearVWins}回`], ["ギアVアタック", `${symphogearGearVAttacks}回`], ["ゲーム数上乗せ", `+${yen.format(symphogearTotalAddGames)}G`], ["ギアVアタック EX", symphogearExCount ? `${symphogearExCount}回` : "非到達"], ["絶唱", symphogearZesshoCount ? `${symphogearZesshoCount}回` : "非到達"], [sim.upperLabel, symphogearUpperSections ? `${symphogearUpperSections}区間・BONUS ${symphogearBonusCount}回` : "非到達"], [sim.upperChallenge, symphogearZesshoBattleAttempts ? `${symphogearZesshoBattleAttempts}回・勝利${symphogearZesshoBattleWins}回` : "未到達"], ["黄金絶唱", symphogearGoldenZesshoGames ? `+${yen.format(symphogearGoldenZesshoGames)}G` : "非当選"]] : [];
    const lycorisStats = sim.lycorisFlow ? [["通常時CZ", lycorisCz?.label || sim.triggerLabel], ["RUSHタイプ", lycorisRushRoute ? `${lycorisRushRoute.label}・${lycorisRushRoute.talent}` : "非突入"], ["リコリスラッシュ20", lycorisRush20Won ? "BONUS当選・RUSH50へ" : "20G駆け抜け"], ["通常RUSH BONUS", `${lycorisNormalBonusCount}回`], ["ST再セット", `${lycorisStResets}回`], ["獲得ポイント", `${yen.format(Math.min(1000, lycorisPoints))}pt`], [sim.upperChallenge, lycorisUpperCzAttempts ? `${lycorisUpperCzAttempts}回・成功${lycorisUpperCzWins}回` : "未到達"], [sim.upperLabel, lycorisUpperSections ? `${lycorisUpperSections}セット・BONUS ${lycorisUpperBonusCount}回` : "非到達"], ["レジェンダリーリコリス", lycorisLegendaryAward ? `+${yen.format(lycorisLegendaryAward)}枚` : "非当選"]] : [];
    const kanokariStats = sim.kanokariFlow ? [["通常時CZ", kanokariCz?.label || sim.triggerLabel], ["BONUS内訳", `REG ${kanokariRegCount}回・BIG ${kanokariBigCount}回・EP ${kanokariEpisodeCount}回`], ["最大BONUS連", `${kanokariMaxChain}連`], ["1GレンCHANCE／1G恋", `${kanokariOneGameAttempts}回・成功${kanokariOneGameWins}回`], ["獲得ストック", `通常${kanokariNormalStocks}個・1G恋${kanokariLoveStocks}個`], ["66G引き戻し", `${kanokariReturnAttempts}回・成功${kanokariReturnWins}回`], ["ユメカノモード", `${kanokariYumekanoEntries}回`], ["ななかりDREAM", `${kanokariDreamCount}回`], ["DREAM TIME", kanokariDreamTimeCount ? `${kanokariDreamTimeCount}回（S級${kanokariSDreamTimeCount}回）` : "非到達"], ["ALL 1G恋変換", kanokariAllLoveCount ? `${kanokariAllLoveCount}回` : "非当選"]] : [];
    const aobutaStats = sim.aobutaFlow ? [["青春BONUS", "ベルナビ5回"], ["青ブタJUDGE", `${aobutaStRounds}周・V ${aobutaVCount}個`], ["青春DREAM BURST", `${aobutaDreamBurstCount}回`], [sim.upperChallenge, aobutaUpperCzAttempts ? `${aobutaUpperCzAttempts}回・成功${aobutaUpperCzWins}回` : "未到達"], [sim.upperLabel, aobutaUpperStLoops ? `${aobutaUpperStLoops}周` : "非到達"]] : [];
    const bofuriStats = sim.bofuriFlow ? [["初回CZ", bofuriCz?.label || sim.triggerLabel], ["BONUS", `${bofuriBonusCount}回・+${yen.format(bonusPayoutTotal)}枚`], ["防御状態", `${bofuriDefenseLoops}回・最高Lv.${bofuriMaxLevel}`], ["防御力ポイント", `${yen.format(bofuriDefensePoints)}pt`], ["天使ZONE", bofuriAngelCount ? `${bofuriAngelCount}回` : "非到達"], ["暴虐ZONE", bofuriViolenceCount ? `${bofuriViolenceCount}回` : "非到達"]] : [];
    const azurStats = sim.azurLaneFlow ? [["海戦BONUS", azurBonus?.label || sim.triggerLabel], ["海戦ATTACK・上乗せ", `+${yen.format(azurGameAddTotal)}G`], ["セイレーンバトル", `${azurBattles}戦・勝利${azurWins}回`], ["集結BONUS", `${azurGatherBonuses}回・${azurFactions}/4陣営`], [sim.upperChallenge, azurAmagiAttempts ? `${azurAmagiAttempts}回・成功${azurAmagiWins}回` : "未到達"], [sim.upperLabel, azurUpperLoops ? `${azurUpperLoops}区間` : "非到達"]] : [];
    const magiaStats = sim.magiaRecordFlow ? [["初当りBONUS", magiaBonus?.label || sim.triggerLabel], ["マギアアタック", `+${yen.format(magiaAttackTotal)}G`], ["ストーリー", `${magiaStoryCount}/8話（SP ${magiaSpecialStories}回）`], ["コネクトチャンス", `${magiaConnectAttempts}回・成功${magiaConnectWins}回`], ["コネクト上乗せ", `+${yen.format(magiaConnectGames)}G`], ["決戦神浜聖女", `${magiaBattleRewards}回`], ["マギアBONUS", `${magiaBonusRewards}回`], [sim.upperLabel, magiaUpperSections ? "到達" : "非到達"]] : [];
    const toaruStats = sim.toaruIndex2Flow ? [["今回の入口", toaruEntry?.label || sim.triggerLabel], ["バトル", `${toaruBattles}戦・勝利${toaruBattleWins}回`], ["とある運命の上乗遊技", `${toaruChargeCount}回・+${yen.format(toaruChargeGames)}G`], ["PLUS ACTION", `${toaruPlusActionCount}回・+${yen.format(toaruPlusActionGames)}G`], [sim.upperChallenge, toaruFiammaAttempts ? `${toaruFiammaAttempts}回・成功${toaruFiammaWins}回` : "未到達"], [sim.upperLabel, toaruFiammaWins ? "到達" : "非到達"]] : [];
    const darlingStats = sim.darlingFranxxFlow ? [["今回の入口", darlingEntry?.label || sim.triggerLabel], ["初当りBONUS", darlingInitialBonus?.label || "非当選"], ["高確中BONUS", `${darlingHighBonuses}回（フランクス${darlingFranxxBonuses}回）`], ["BONUS獲得", `+${yen.format(darlingBonusAwards)}枚`], ["比翼BEATS", `${darlingBeatEntries}回・+${yen.format(darlingBeatAdds)}G`], ["最高Beatレベル", darlingMaxBeatLevel ? `Lv.${darlingMaxBeatLevel === 3 ? "MAXX" : darlingMaxBeatLevel}` : "非到達"], ["連れ出し", darlingTakeouts ? `${darlingTakeouts}回` : "非当選"], ["CLIMAXX", darlingClimaxx ? "到達" : "非到達"]] : [];
    const cycleStats = sim.cycleFlow ? [[sim.cycleFlow.statLabel || (sim.titleFlow ? "機種専用進行" : "専用ループ"), `${cycleRounds}回・継続${cycleContinues}回`]] : [];
    const entryBonusStats = entryBonus ? [["初当りBONUS", `${entryBonus.label}・約${yen.format(entryBonus.payout)}枚`], ["BONUS結果", entryBonus.outcome], ["BONUS中AT期待度", `${percent(Number(entryBonus.atChance) || 0)}`]] : [];
    const rushGamesTotal = Math.max(0, atGamesTotal - (Number(entryBonus?.games) || 0));
    const genericSpecialStats = sim.otomeRushFlow || sim.kabaneriStFlow || sim.okidokiGoldFlow || sim.uminchuFlow || sim.tentenFlow || sim.goblinSlayerFlow || sim.assaultLilyFlow || sim.kaguyaFlow || sim.dumbbellFlow || sim.shinEvaFlow || sim.tokyoGhoulFlow || sim.basiliskTenzenFlow || sim.sao2Flow || sim.symphogearSeigiFlow || sim.lycorisFlow || sim.kanokariFlow || sim.aobutaFlow || sim.bofuriFlow || sim.azurLaneFlow || sim.magiaRecordFlow || sim.toaruIndex2Flow || sim.darlingFranxxFlow ? [] : [["特化ゾーン", addOnCount ? `${sim.specialLabel} ${addOnCount}回` : bonusCount ? `${sim.specialLabel} ${bonusCount}回` : "非当選"]];
    const gameAddOnStats = sim.karakuriJudgeFlow || coinAddOnCount
      ? [["上乗せ結果", addOnCount ? `${addOnCount}回・+${yen.format(coinAddOnTotal || addOnTotal)}枚` : "上乗せなし"]]
      : [["上乗せ結果", addOnCount ? `${addOnCount}回・+${yen.format(addOnGamesTotal || otomeAddedGames)}G` : "上乗せなし"]];
    const bonusStats = bonusCount ? [["ボーナス結果", `${bonusCount}回・+${yen.format(bonusPayoutTotal)}枚`]] : [];
    const atStats = entered ? (sim.okidokiGoldFlow
      ? [["BONUS・32G消化", `${yen.format(rushGamesTotal)}G相当`], ...okidokiStats, ...bonusStats]
      : sim.uminchuFlow
      ? [["BONUS・32G消化", `${yen.format(rushGamesTotal)}G相当`], ...uminchuStats, ...bonusStats]
      : sim.tentenFlow
        ? [["BONUS・高確消化", `${yen.format(rushGamesTotal)}G相当`], ...tentenStats, ["王宮BONUS獲得", `${yen.format(bonusPayoutTotal)}枚`]]
      : sim.goblinSlayerFlow
        ? [["AT・JUDGEMENT消化", `${yen.format(rushGamesTotal)}G相当`], ...goblinStats, ["BONUS獲得", `${yen.format(bonusPayoutTotal)}枚`]]
      : sim.assaultLilyFlow
        ? [["AT・特化ゾーン消化", `${yen.format(rushGamesTotal)}G相当`], ...assaultStats, ["差枚上乗せ合計", `+${yen.format(coinAddOnTotal)}枚`]]
      : sim.kaguyaFlow
        ? [["BONUS・引き戻し消化", `${yen.format(rushGamesTotal)}G相当`], ...kaguyaStats, ["BONUS獲得", `${yen.format(bonusPayoutTotal + upperPayoutTotal)}枚`]]
      : sim.dumbbellFlow
        ? [["AT・上位消化", `${yen.format(rushGamesTotal)}G相当`], ...dumbbellStats]
      : sim.shinEvaFlow
        ? [["ST・BONUS消化", `${yen.format(rushGamesTotal)}G相当`], ...shinEvaStats, ["BONUS獲得", `${yen.format(bonusPayoutTotal)}枚`]]
      : sim.tokyoGhoulFlow
        ? [["AT・BITES消化", `${yen.format(rushGamesTotal)}G相当`], ...tokyoGhoulStats]
      : sim.basiliskTenzenFlow
        ? [["BC・BT消化", `${yen.format(rushGamesTotal)}G相当`], ...basiliskStats]
      : sim.sao2Flow
        ? [["BoB・上位消化", `${yen.format(rushGamesTotal)}G相当`], ...sao2Stats]
      : sim.symphogearSeigiFlow
        ? [["AT・上位消化", `${yen.format(rushGamesTotal)}G相当`], ...symphogearStats]
      : sim.lycorisFlow
        ? [["RUSH・BONUS消化", `${yen.format(rushGamesTotal)}G相当`], ...lycorisStats, ["BONUS獲得", `${yen.format(bonusPayoutTotal)}枚`]]
      : sim.kanokariFlow
        ? [["BONUS・1G連・引き戻し消化", `${yen.format(rushGamesTotal)}G相当`], ...kanokariStats, ["BONUS獲得", `${yen.format(bonusPayoutTotal)}枚`]]
      : sim.aobutaFlow
        ? [["BONUS・完走型ST消化", `${yen.format(rushGamesTotal)}G相当`], ...aobutaStats, ["BONUS獲得", `${yen.format(bonusPayoutTotal)}枚`]]
      : sim.bofuriFlow
        ? [["CZ・BONUS・防御状態", `${yen.format(rushGamesTotal)}G相当`], ...bofuriStats]
      : sim.azurLaneFlow
        ? [["BONUS・AT・上位消化", `${yen.format(rushGamesTotal)}G相当`], ...azurStats]
      : sim.magiaRecordFlow
        ? [["BONUS・AT・上位消化", `${yen.format(rushGamesTotal)}G相当`], ...magiaStats]
      : sim.toaruIndex2Flow
        ? [["CZ・AT・引き戻し消化", `${yen.format(rushGamesTotal)}G相当`], ...toaruStats]
      : sim.darlingFranxxFlow
        ? [["CZ・BONUS高確消化", `${yen.format(rushGamesTotal)}G相当`], ...darlingStats]
      : [["RUSH消化モデル", `${yen.format(rushGamesTotal)}G相当`], ...karakuriStats, ...battleStats, ...sgStats, ...kabaneriStats, ...otomeStats, ...cycleStats, ...gameAddOnStats, ...bonusStats, ...genericSpecialStats, ["上位AT", upper ? (kabaneriUpperMode || `${sim.upperLabel} ${upperLoops}セット`) : "非到達"]]) : [];
    const stats = [["今回の設定", `設定${setting}`], ["設定差モデル", settingModelLabel], ["今回のゲーム数", `${yen.format(games)}G`], ...settingRateStats, ["現金投資目安", `${yen.format(investment)}円`], ...entryBonusStats, ...atStats, ["獲得枚数", `${yen.format(payout)}枚`], ["換金目安", `${yen.format(exchangeValue)}円`], ["差枚目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`], ["収支目安", `${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円`], ["利用レート", `${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換`], ["コイン単価", `${coinUnit.toFixed(1)}円・${riskLabel(coinUnit)}`], ["単価換算の台売上指標", `${yen.format(salesIndex)}円`]];
    if (complete) stats.unshift(["到達状態", "コンプリート"]);
    const resultTitle = complete ? "コンプリート" : upper ? `${upperResultLabel}到達` : sim.okidokiGoldFlow ? (okidokiMaxChain > 1 ? `${okidokiMaxChain}連終了` : "BONUS終了") : entered ? `${sim.mainLabel}終了` : entryBonus ? `${entryBonus.label}終了` : `${sim.triggerLabel}失敗`;
    const resultSummary = complete
      ? `今回の設定は設定${setting}。${games}Gで${sim.triggerLabel}、獲得枚数が${yen.format(SLOT_COMPLETE_LIMIT)}枚に到達し、コンプリートしました。`
      : sim.azurLaneFlow
        ? `今回の設定は設定${setting}。${games}Gで${azurBonus?.label || sim.triggerLabel}、${entered ? `海戦ATTACKを経てセイレーンバトル${azurBattles}戦・勝利${azurWins}回、${azurFactions}/4陣営を集めて${yen.format(payout)}枚を獲得しました。${azurUpperLoops ? `天城BATTLEを突破し、異次元性能SS RUSHを${azurUpperLoops}区間消化しました。` : azurAmagiAttempts ? "天城BATTLEで終了しました。" : "4陣営集結には届きませんでした。"}` : `平均約${yen.format(payout)}枚の海戦BONUSで終了し、ATには届きませんでした。`}`
      : sim.magiaRecordFlow
        ? `今回の設定は設定${setting}。${games}Gで${magiaBonus?.label || sim.triggerLabel}、${entered ? `マギアアタック+${magiaAttackTotal}Gからストーリー${magiaStoryCount}/8話・コネクト${magiaConnectWins}回成功で${yen.format(payout)}枚を獲得しました。${magiaUpperSections ? "全8話をコンプリートし、エンブリオ・イブ覚醒へ到達しました。" : `マギアラッシュは残り0Gで終了しました。`}` : `${magiaBonus?.label || "初当りBONUS"}で${yen.format(payout)}枚を獲得し、マギアラッシュには届きませんでした。`}`
      : sim.toaruIndex2Flow
        ? `今回の設定は設定${setting}。${games}Gで${toaruEntry?.label || sim.triggerLabel}、${entered ? `バトル${toaruBattles}戦・勝利${toaruBattleWins}回、とある運命の上乗遊技${toaruChargeCount}回・PLUS ACTION ${toaruPlusActionCount}回で${yen.format(payout)}枚を獲得しました。${toaruFiammaWins ? "フィアンマBATTLEを突破し、幻想殺しRUSHへ再突入しました。" : "幻想殺しRUSHは残り0Gで終了しました。"}` : "CZは突破できませんでした。"}`
      : sim.darlingFranxxFlow
        ? `今回の設定は設定${setting}。${games}Gで${darlingEntry?.label || sim.triggerLabel}、${triggerSucceeded ? `${darlingInitialBonus?.label || "初当りBONUS"}から高確中BONUS ${darlingHighBonuses}回・比翼BEATS ${darlingBeatEntries}回で${yen.format(payout)}枚を獲得しました。${darlingClimaxx ? "高確ゲーム数30GのCLIMAXXへ到達しました。" : entered ? "ボーナス高確は残り0Gで終了しました。" : "初当りBONUSで終了しました。"}` : "CZは突破できませんでした。"}`
      : sim.okidokiGoldFlow
        ? `今回の設定は設定${setting}。${games}Gでハイビスカス点灯、最大${okidokiMaxChain}連・BIG ${okidokiBigCount}回・REG ${okidokiRegCount}回で${yen.format(payout)}枚を獲得しました。最高内部モードは${okidokiHighestMode}です。`
      : sim.uminchuFlow
        ? `今回の設定は設定${setting}。${games}GでBONUS初当り、最大${uminchuMaxChain}連・BIG ${uminchuBigCount}回・REG ${uminchuRegCount}回、${yen.format(payout)}枚を獲得しました。${uminchuIreguiCount ? `IREGUIは${uminchuIreguiCount}回です。` : "IREGUIには届きませんでした。"}`
        : sim.tentenFlow
          ? `今回の設定は設定${setting}。${games}GでEPISODE BATTLE、${entered ? `初回BONUSと王宮BONUS ${tentenPalaceBonusCount}回で${yen.format(payout)}枚を獲得しました。${upper ? `輪廻転天へ到達し、上位BONUSは${tentenUpperBonusCount}回です。` : "輪廻転天には届きませんでした。"}` : "CZは突破できませんでした。"}`
        : sim.goblinSlayerFlow
          ? `今回の設定は設定${setting}。${games}Gで${goblinCz?.label || sim.triggerLabel}、${entered ? `${Math.round(goblinLoopMode * 100)}%モードで通常AT ${goblinAtSets}セット、${yen.format(payout)}枚を獲得しました。${upper ? `ULTIMATE LOOPは${upperLoops}セットです。` : "ULTIMATE LOOPには届きませんでした。"}` : "ATには届きませんでした。"}`
        : sim.assaultLilyFlow
          ? `今回の設定は設定${setting}。${games}Gで${assaultEntry?.label || sim.triggerLabel}、${entered ? `ボスヒュージ襲来${assaultBossBattles}回・特化ゾーン${assaultRewardCount}回で${yen.format(payout)}枚を獲得しました。${upper ? `${sim.upperLabel}へ到達しました。` : `${sim.upperLabel}には届きませんでした。`}` : entryBonus ? `${entryBonus.label}で約${yen.format(payout)}枚を獲得し、RUSHには届きませんでした。` : "RUSHには届きませんでした。"}`
        : sim.kaguyaFlow
          ? `今回の設定は設定${setting}。${games}Gで告らせたいチャレンジ、${entered ? `BONUS ${cycleRounds}連・1G連${kaguyaOneGameCount}回・引き戻し${kaguyaReturnCount}回で${yen.format(payout)}枚を獲得しました。${kaguyaExtraGames ? `EXTRA BONUSは${kaguyaExtraGames}Gです。` : kaguyaMarriageCount ? "奇跡的相性マリアージュMODEへ到達しました。" : "上位ルートには届きませんでした。"}` : "CZは突破できませんでした。"}`
        : sim.dumbbellFlow
          ? `今回の設定は設定${setting}。${games}GでMUSCLE ZONE・${dumbbellCz?.label || "前半パート"}、${entered ? `通常AT ${dumbbellNormalGames}Gで${yen.format(payout)}枚を獲得しました。${upper ? `Vストック${dumbbellVStockTotal}個、金肉BONUS ${upperLoops}回です。` : "ゴールデンタイムには届きませんでした。"}` : "ATは非当選でした。"}`
        : sim.shinEvaFlow
          ? `今回の設定は設定${setting}。${games}Gで初当り、作戦ST ${shinEvaOperationRounds}回・BONUS ${bonusCount}回で${yen.format(payout)}枚を獲得しました。${upper ? `${sim.upperLabel}は${shinEvaUpperLoops}セットです。` : shinEvaSankiCount ? `${sim.specialLabel}は${shinEvaSankiCount}回です。` : "上位STには届きませんでした。"}`
        : sim.tokyoGhoulFlow
          ? `今回の設定は設定${setting}。${games}Gで${tokyoGhoulCz?.label || sim.triggerLabel}、喰種対決${tokyoGhoulBattles}戦・BITES ${tokyoGhoulBitesCount}回で${yen.format(payout)}枚を獲得しました。${tokyoGhoulUpperAt ? "有馬貴将JUDGEMENTを突破し、裏ATへ到達しました。" : tokyoGhoulCcgAward ? `CCGの死神で${yen.format(tokyoGhoulCcgAward)}枚を獲得しました。` : "上位ルートには届きませんでした。"}`
        : sim.basiliskTenzenFlow
          ? `今回の設定は設定${setting}。${games}Gで${basiliskBc?.label || sim.triggerLabel}、${entered ? `${basiliskScenario?.name || "通常"}シナリオのBTを${basiliskSets}セット消化し、${yen.format(payout)}枚を獲得しました。${basiliskTenzenSets ? `宿怨チャレンジ成功から天膳BTを${basiliskTenzenSets}セット消化しました。` : basiliskGrudgeAttempts ? "宿怨チャレンジ失敗後は通常BTへ進みました。" : "宿怨チャレンジには届きませんでした。"}` : `BCを${basiliskBc?.games || 16}G消化し、BTには入りませんでした。`}`
        : sim.sao2Flow
          ? `今回の設定は設定${setting}。${games}Gでスコードロンバトル、${entered ? `スナイパーチャンス${sao2SniperAttempts}回・勝利${sao2SniperWins}回で${yen.format(payout)}枚を獲得しました。${sao2ZekkenAward ? `絶剣で${yen.format(sao2ZekkenAward)}枚を獲得し、アルティマ状態へ移行しました。` : sao2UpperSections ? `デス・ガンバトルを突破し、FULL DIVEを${sao2UpperSections}区間消化しました。` : sao2DeathGunAttempts ? "デス・ガンバトルで終了しました。" : "上位CZの権利には届きませんでした。"}` : "CZは突破できませんでした。"}`
        : sim.symphogearSeigiFlow
          ? `今回の設定は設定${setting}。${games}GでAXZバトル、${entered ? `ギアVチャンス${symphogearGearVChances}回・ギアVアタック${symphogearGearVAttacks}回、上乗せ合計${symphogearTotalAddGames}Gで${yen.format(payout)}枚を獲得しました。${symphogearGoldenZesshoGames ? `黄金絶唱で${symphogearGoldenZesshoGames}Gを獲得しました。` : symphogearUpperSections ? `AXZラッシュ黄金を${symphogearUpperSections}区間消化しました。` : "絶唱・上位ATには届きませんでした。"}` : "AXZバトルは突破できませんでした。"}`
        : sim.lycorisFlow
          ? `今回の設定は設定${setting}。${games}Gで${lycorisCz?.label || sim.triggerLabel}、${entered ? `${lycorisRushRoute?.label || sim.mainLabel}でBONUS ${lycorisNormalBonusCount}回・ST再セット${lycorisStResets}回、${yen.format(payout)}枚を獲得しました。${lycorisLegendaryAward ? `レジェンダリーリコリスで${yen.format(lycorisLegendaryAward)}枚を上乗せしました。` : lycorisUpperSections ? `リコリスラッシュWを${lycorisUpperSections}セット消化しました。` : lycorisUpperCzAttempts ? "リコイル オブ リコリスで終了しました。" : lycorisRush20Won ? "1000pt・上位CZには届きませんでした。" : "リコリスラッシュ20は駆け抜けでした。"}` : "CZは突破できませんでした。"}`
        : sim.kanokariFlow
          ? `今回の設定は設定${setting}。${games}Gで${kanokariCz?.label || sim.triggerLabel}、${entered ? `REG ${kanokariRegCount}回・BIG ${kanokariBigCount}回・エピソード${kanokariEpisodeCount}回、1GレンCHANCE／1G恋は${kanokariOneGameAttempts}回中${kanokariOneGameWins}回成功し、${yen.format(payout)}枚を獲得しました。${kanokariSDreamTimeCount ? "S級DREAM TIMEへ到達しました。" : kanokariDreamTimeCount ? `DREAM TIMEを${kanokariDreamTimeCount}回消化しました。` : kanokariDreamCount ? `ななかりDREAMを${kanokariDreamCount}回獲得しました。` : `66G引き戻しは${kanokariReturnAttempts}回中${kanokariReturnWins}回成功しました。`}` : "CZは突破できませんでした。"}`
        : sim.aobutaFlow
          ? `今回の設定は設定${setting}。${games}Gで青春BONUS、青ブタJUDGEを${aobutaStRounds}周してVを${aobutaVCount}個獲得し、${yen.format(payout)}枚を獲得しました。${aobutaUpperStLoops ? `夢現JUDGEMENTを突破し、上位STを${aobutaUpperStLoops}周消化しました。` : aobutaUpperCzAttempts ? "夢現JUDGEMENTで終了しました。" : "翔子・上位ルートには届きませんでした。"}`
        : sim.bofuriFlow
          ? `今回の設定は設定${setting}。${games}Gで${bofuriCz?.label || sim.triggerLabel}、${entered ? `BONUS ${bofuriBonusCount}回・防御状態${bofuriDefenseLoops}回、最高Lv.${bofuriMaxLevel}で${yen.format(payout)}枚を獲得しました。${bofuriViolenceCount ? "暴虐ZONEへ到達しました。" : bofuriAngelCount ? "天使ZONEへ到達しました。" : "特化ZONEには届きませんでした。"}` : "高確率ZONEは突破できませんでした。"}`
        : `今回の設定は設定${setting}。${games}Gで${sim.triggerLabel}。${entered ? `${payout}枚を獲得しました。${sim.kabaneriStFlow ? `ST中ボーナス${kabaneriStBonuses}回・${upper ? `${upperResultLabel} ${upperLoops}回当選。` : "上位ST非到達。"}` : `上乗せ${addOnCount}回・${upper ? `${upperResultLabel} ${upperLoops}セット。` : "上位AT非到達。"}`}` : entryBonus ? `${entryBonus.label}で約${yen.format(payout)}枚を獲得し、${sim.mainLabel}には届きませんでした。` : `${machine.initialHitLabel || sim.mainLabel}には届きませんでした。`}`;
    const kabaneriRareUpperLabel = sim.kabaneriUpperRareLabel || "裏美馬ST";
    const kabaneriUpperContinueChance = kabaneriUpperMode
      ? (kabaneriUpperMode === kabaneriRareUpperLabel
        ? (Number(sim.kabaneriUpperRareContinue) || 0.95)
        : (Number(sim.kabaneriUpperNormalContinue) || 0.80)) * 100
      : sim.upperContinue * 100;
    return { title: `設定${setting}｜${resultTitle}`, summary: resultSummary, stats, flow: [`設定${setting}`, ...flow], share: `${machine.shortName}｜設定${setting}｜${yen.format(games)}G｜投資${yen.format(investment)}円｜${resultLabel}｜上乗せ${addOnCount}回｜${yen.format(payout)}枚｜換金${yen.format(exchangeValue)}円｜収支${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円｜${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換｜コイン単価${coinUnit.toFixed(1)}円`, setting, score: Math.round(diff), rankScore, rankInvestment, scoreKind: "coins", balanceYen, exchangeValue, investment, payout, attempts: games, complete, settingModel: settingModelLabel, experience: { kind: "slot", setting, attempts: games, unit: "G", hitLabel: sim.triggerLabel, hitChance: 100 / triggerRate, triggerSucceeded, triggerSuccessChance: sim.basiliskTenzenFlow ? 100 : sim.goblinSlayerFlow ? (Number(goblinCz?.chance) || 0) * 100 : sim.assaultLilyFlow ? (Number(assaultEntry?.chance) || 0) * 100 : sim.dumbbellFlow ? (Number(dumbbellCz?.chance) || 0) * 100 : sim.lycorisFlow ? (Number(lycorisCz?.chance) || 0) * 100 : triggerSuccess * 100, entryBonusModel: Boolean(sim.basiliskTenzenFlow) || Array.isArray(sim.entryBonusAwards) && sim.entryBonusAwards.length > 0, entryBonus, entered, entryChance: entryBonus ? (Number(entryBonus.atChance) || 0) * 100 : sim.assaultLilyFlow ? (Number(assaultEntry?.chance) || 0) * 100 : sim.dumbbellFlow ? (Number(dumbbellCz?.chance) || 0) * 100 : sim.lycorisFlow ? (Number(lycorisCz?.chance) || 0) * 100 : triggerSuccess * 100, mainLabel: sim.mainLabel, mainSetContinueChance: (sim.mainSetContinue || 0) * 100, setPushFlow: Boolean(sim.setPushFlow), karakuriJudgeFlow: Boolean(sim.karakuriJudgeFlow), battleBonusFlow: Boolean(sim.battleBonusFlow), garoBattleFlow: Boolean(sim.garoBattleFlow), ragnadorUpperFlow: Boolean(sim.ragnadorUpperFlow), seiyaTempleFlow: Boolean(sim.seiyaTempleFlow), ggoStFlow: Boolean(sim.ggoStFlow), godzillaEva2Flow: Boolean(sim.godzillaEva2Flow), mahoakoFlow: Boolean(sim.mahoakoFlow), okidokiGoldFlow: Boolean(sim.okidokiGoldFlow), okidokiBigCount, okidokiRegCount, okidokiMaxChain, okidokiGoldCount, okidokiOneGameCount, okidokiGuaranteeCount, okidokiGodMode, okidokiHighestMode, tokyoGhoulFlow: Boolean(sim.tokyoGhoulFlow), tokyoGhoulCz, tokyoGhoulBattles, tokyoGhoulWins, tokyoGhoulBitesCount, tokyoGhoulSpecialCount, tokyoGhoulArimaBattle, tokyoGhoulArimaWon, tokyoGhoulUpperAt, tokyoGhoulCcgAward, basiliskTenzenFlow: Boolean(sim.basiliskTenzenFlow), basiliskBc, basiliskScenario, basiliskSets, basiliskBtBcCount, basiliskHighCount, basiliskMoonCount, basiliskGrudgeAttempts, basiliskGrudgeSuccesses, basiliskTenzenSets, sao2Flow: Boolean(sim.sao2Flow), sao2SniperAttempts, sao2SniperWins, sao2LastAttackAttempts, sao2LastAttackSuccesses, sao2DeathGunAttempts, sao2DeathGunWins, sao2UpperSections, sao2ZekkenAward, sao2Ultima, lycorisFlow: Boolean(sim.lycorisFlow), lycorisCz, lycorisRushRoute, lycorisRush20Won, lycorisNormalBonusCount, lycorisPoints, lycorisStResets, lycorisUpperCzAttempts, lycorisUpperCzWins, lycorisUpperSections, lycorisUpperBonusCount, lycorisLegendaryAward, tentenFlow: Boolean(sim.tentenFlow), goblinSlayerFlow: Boolean(sim.goblinSlayerFlow), goblinCz, goblinLoopMode: goblinLoopMode * 100, goblinAtSets, goblinBonusCount, goblinMaxContinueRate, assaultLilyFlow: Boolean(sim.assaultLilyFlow), assaultEntry, assaultBossBattles, assaultBossWins, assaultRewardCount, assaultUpperCz, assaultUpperCzAttempts, assaultUpperCzSuccesses, assaultMaxAddOn, kaguyaFlow: Boolean(sim.kaguyaFlow), kaguyaRegCount, kaguyaBigCount, kaguyaSuperCount, kaguyaOneGameCount, kaguyaReturnCount, kaguyaSpecialCount, kaguyaStockCount, kaguyaMarriageCount, kaguyaExtraGames, dumbbellFlow: Boolean(sim.dumbbellFlow), dumbbellCz, dumbbellNormalGames, dumbbellGameAddCount, dumbbellGameAddTotal, dumbbellGoldenChallenges, dumbbellGoldenSuccesses, dumbbellVStockTotal, dumbbellCoinAddTotal, dumbbellRisingChallenges, sgRaceFlow: Boolean(sim.sgRaceFlow), kabaneriStFlow: Boolean(sim.kabaneriStFlow), otomeRushFlow: Boolean(sim.otomeRushFlow), cycleFlow: Boolean(sim.cycleFlow), cycleRounds, cycleContinues, kabaneriStBonuses, kabaneriUpperMode, otomeAddedGames, otomeBonusCount, otomeAwakeningCount, otomeBattleWon, otomeAddOnChance: (Number(sim.otomeAddOnChance) || 0) * 100, battleBonusSets, battleContinuationRate: battleContinuationRate * 100, sgRushSets, sgScenarioName, karakuriJudgeAttempts, karakuriJudgeSuccesses, karakuriUpperRoute, specialLabel: sim.specialLabel, specialChance: specialChance * 100, addOnCount, addOnTotal, addOnGamesTotal, coinAddOnCount, coinAddOnTotal, bonusCount, bonusPayoutTotal, atGamesTotal, upperRouteChance: upperChance * 100, upperSuccessChance: sim.upperSuccess * 100, upperContinueChance: kabaneriUpperContinueChance, upperChallenge: sim.upperChallenge || "", upper, upperLabel: upperResultLabel || "", upperLoops, complete, payout, payoutUnit: "枚", atEvents, atGameTimeline, flow: [...flow] } };
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
    experience.dataset.step = String(index);
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

  function setSlotAtStatus({ visible = false, games = 0, remaining = null, remainingUnit = "G", addOn = 0, addOnGames = null, total = 0 } = {}) {
    const status = document.getElementById("machineSlotAtStatus");
    if (!status) return;
    status.hidden = !visible;
    const hasRemaining = remaining !== null && Number.isFinite(Number(remaining));
    document.getElementById("machineSlotRemaining").textContent = hasRemaining
      ? `残り ${yen.format(Math.max(0, Math.round(Number(remaining))))}${remainingUnit}`
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
    const okidokiGoldFlow = Boolean(data.okidokiGoldFlow);
    const uminchuFlow = Boolean(machine.sim.uminchuFlow);
    const tentenFlow = Boolean(data.tentenFlow);
    const goblinSlayerFlow = Boolean(data.goblinSlayerFlow);
    const assaultLilyFlow = Boolean(data.assaultLilyFlow);
    const kaguyaFlow = Boolean(data.kaguyaFlow);
    const dumbbellFlow = Boolean(data.dumbbellFlow);
    const shinEvaFlow = Boolean(machine.sim.shinEvaFlow);
    const tokyoGhoulFlow = Boolean(data.tokyoGhoulFlow);
    const basiliskTenzenFlow = Boolean(data.basiliskTenzenFlow);
    const sao2Flow = Boolean(data.sao2Flow);
    const symphogearSeigiFlow = Boolean(machine.sim.symphogearSeigiFlow);
    const lycorisFlow = Boolean(data.lycorisFlow);
    const kanokariFlow = Boolean(machine.sim.kanokariFlow);
    const aobutaFlow = Boolean(machine.sim.aobutaFlow);
    const bofuriFlow = Boolean(machine.sim.bofuriFlow);
    const azurLaneFlow = Boolean(machine.sim.azurLaneFlow);
    const magiaRecordFlow = Boolean(machine.sim.magiaRecordFlow);
    const toaruIndex2Flow = Boolean(machine.sim.toaruIndex2Flow);
    const darlingFranxxFlow = Boolean(machine.sim.darlingFranxxFlow);
    setSlotAtStatus({ visible: false });
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
    setExperienceStage(1, magiaRecordFlow ? "BONUS HIT" : bofuriFlow ? "HIGH PROBABILITY ZONE" : okidokiGoldFlow ? "HIBISCUS LIGHT" : uminchuFlow ? "BONUS HIT" : basiliskTenzenFlow ? "BASILISK CHANCE" : sao2Flow ? "SQUADRON BATTLE" : symphogearSeigiFlow ? "AXZ BATTLE" : lycorisFlow ? (data.lycorisCz?.key === "direct" ? "DIRECT RUSH" : "CHANCE ZONE") : aobutaFlow ? "SEISHUN BONUS" : tentenFlow ? "EPISODE BATTLE" : goblinSlayerFlow ? (data.goblinCz?.key === "direct" ? "DIRECT AT" : "CHANCE ZONE") : assaultLilyFlow ? (data.assaultEntry?.key === "direct" ? "DIRECT AT" : data.assaultEntry?.key === "bouquet" ? "BOUQUET BONUS" : "LILY CHALLENGE") : kaguyaFlow ? "LOVE BRAIN BATTLE" : dumbbellFlow ? "MUSCLE ZONE" : shinEvaFlow ? "INITIAL HIT" : tokyoGhoulFlow ? "CHANCE ZONE" : mahoakoFlow ? "ENTRY CHANCE" : "CHANCE ZONE", basiliskTenzenFlow ? (data.basiliskBc?.label || data.hitLabel) : tokyoGhoulFlow ? (data.tokyoGhoulCz?.label || data.hitLabel) : lycorisFlow ? (data.lycorisCz?.label || data.hitLabel) : goblinSlayerFlow ? (data.goblinCz?.label || data.hitLabel) : assaultLilyFlow ? (data.assaultEntry?.label || data.hitLabel) : data.hitLabel, `${yen.format(data.attempts)}G`, magiaRecordFlow ? "初当りBONUSを消化し、最後のPUSHでマギアラッシュを判定" : bofuriFlow ? "高確率ZONEを進め、最後のPUSHでBONUSを判定" : okidokiGoldFlow ? "ハイビスカス点灯・初当りBONUS確定" : basiliskTenzenFlow ? `${data.basiliskBc?.games || 16}GのBCでバジリスクタイムを抽選` : sao2Flow ? "スコードロンバトルの最後にPUSHでBoB突入を判定" : symphogearSeigiFlow ? "AXZバトルを進め、最後のPUSHでAXZラッシュを判定" : lycorisFlow ? (data.lycorisCz?.key === "direct" ? "アフターエピソードからRUSHへ直行" : `${data.lycorisCz?.games || 10}GのCZを進め、最後のPUSHでRUSHを判定`) : aobutaFlow ? "青春BONUS後は必ず4セット＋αの完走型STへ" : tokyoGhoulFlow ? "8GのCZを進め、最後のPUSHで東京喰種咬を判定" : uminchuFlow ? "告知音とともに初当りBONUSへ" : tentenFlow ? "10GのレベルUPパートと4Gのバトルへ" : goblinSlayerFlow ? (data.goblinCz?.key === "direct" ? "規定ゲーム数からAT直撃" : "CZの専用ゲーム数を進めて最後にPUSH") : assaultLilyFlow ? (data.assaultEntry?.key === "direct" ? "規定ゲーム数・レア役などからRUSH直撃" : data.assaultEntry?.key === "bouquet" ? "25GのBONUS後にRUSHを判定" : "10Gの専用CZを進めて最後にPUSH") : kaguyaFlow ? "恋愛頭脳戦を経て15G＋αのCZへ" : dumbbellFlow ? "10Gの前半パートから後半発展を目指します" : shinEvaFlow ? "3GのEVANGELION IMPACTで作戦を決定します" : data.entryBonusModel ? (mahoakoFlow ? "CZまたはBONUSの種類をPUSHで開きます" : "初当りBONUSをかけたジャッジへ") : `${data.mainLabel}突入をかけたジャッジへ`, "hit", 100, experienceProfile.cue);
    await waitForExperience(780);
    if (darlingFranxxFlow) {
      const events = Array.isArray(data.atEvents) ? data.atEvents : [];
      for (const event of events) {
        if (runId !== experienceRunId) return;
        if (event.kind === "darling-cz") {
          const czComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 5), "G", event.entryType === "direct" ? "DIRECT BONUS" : "CHANCE ZONE", event.label, event.entryType === "direct" ? "初当りBONUSへ直行します" : "小役成立でBONUSを抽選します", Number(event.chance) || 46, event.entryType === "direct" ? "BONUS直撃" : `成功期待度 約${Math.round(Number(event.chance) || 46)}%`, runId);
          if (!czComplete) return;
          setExperienceStage(2, "CZ FINAL JUDGE", event.label, "PUSH", "初当りBONUSの当落を開きます", "judge", Number(event.chance) || 46, "CZ最終結果");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(2, "CZ RESULT", event.success ? "CZ成功" : "CZ失敗", event.success ? "BONUS確定" : "通常へ", event.success ? "次のPUSHでBONUS種類を開きます" : "今回の一撃はここで終了", event.success ? "hit" : "end", event.success ? 100 : 0, `${event.label}結果`);
          await waitForExperience(850);
          if (!event.success) return;
        } else if (event.kind === "darling-initial-bonus") {
          setExperienceStage(2, "INITIAL BONUS", "初当りBONUS", "PUSH", "BONUS種類を開きます", "judge", Number(event.highChance) || 22, "BONUS高確突入を抽選");
          await waitForExperienceAction("初当りBONUS PUSH", 5000, event.entered ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          const bonusComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 8), "G", "BONUS", event.label, "純増約5.0枚/GでBONUSを消化します", event.entered ? 100 : Number(event.highChance) || 22, event.entered ? "BONUS高確へ" : "高確突入を抽選", runId);
          if (!bonusComplete) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(2, "BONUS RESULT", event.label, `+${yen.format(event.award)}枚`, event.entered ? "ボーナス高確へ進みます" : "BONUS終了・最終結果へ", event.entered ? "rush" : "end", event.entered ? 100 : 0, event.entered ? "高確突入" : "高確非突入");
          await waitForExperience(1000);
          if (!event.entered) return;
        } else if (event.kind === "darling-high") {
          const highComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 1), "G", "BONUS HIGH PROBABILITY", "ダーリン・イン・ザ・フランキス", "残りゲーム数を減らしながらBONUSを抽選", Math.min(100, 100 / 10.4), `残り ${yen.format(event.remaining)}G`, runId);
          if (!highComplete) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          if (!event.hit) {
            setExperienceStage(3, "HIGH PROBABILITY END", "BONUS高確終了", "0G", "最終ゲームまでBONUS非当選", "end", 0, "高確終了");
            await waitForExperience(700);
          }
        } else if (event.kind === "darling-high-bonus") {
          setExperienceStage(3, "BONUS JUDGE", "BONUS当選", "PUSH", "BONUS種類と獲得枚数を開きます", "judge", 100, "BONUS約1/10.4");
          await waitForExperienceAction("BONUS PUSH", 5000, ["ex", "episode"].includes(event.bonusType) ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          const bonusComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 12), "G", "BONUS", event.label, "純増約5.0枚/GでBONUSを消化します", 100, `獲得 +${yen.format(event.award)}枚`, runId);
          if (!bonusComplete) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "BONUS RESULT", event.label, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚`, ["ex", "episode"].includes(event.bonusType) ? "hyper" : "hit", 100, "BONUS獲得");
          await waitForExperience(1000);
        } else if (event.kind === "darling-takeout") {
          const takeoutComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 12), "G", "TAKE OUT", "連れ出し", "BONUS中はSTゲーム数をホールドします", 100, "フランクス図柄停止で再セット", runId);
          if (!takeoutComplete) return;
          setExperienceStage(3, "TAKE OUT RESULT", "連れ出し成功", "PUSH", "高確ゲーム数の上乗せを開きます", "judge", 100, "STホールド");
          await waitForExperienceAction("連れ出し PUSH", 5000, Number(event.addGames) >= 10 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "TAKE OUT", "高確ゲーム数上乗せ", `+${yen.format(event.addGames)}G`, `高確残り ${yen.format(event.highGames)}G`, Number(event.addGames) >= 10 ? "hyper" : "rush", 100, "連れ出し結果");
          await waitForExperience(900);
        } else if (event.kind === "darling-beats") {
          const beatsComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 2), "G", "HIYOKU BEATS", event.levelLabel || "比翼BEATS", "上乗せまたはBONUSでSTを再セット", Number(event.chance) || 75, `継続期待度 約${Math.round(Number(event.chance) || 75)}%`, runId);
          if (!beatsComplete) return;
          setExperienceStage(3, "HIYOKU BEATS RESULT", event.levelLabel || "比翼BEATS", "PUSH", "高確ゲーム数の上乗せを開きます", "judge", Number(event.chance) || 75, `${yen.format(event.resets || 0)}回再セット`);
          await waitForExperienceAction("比翼BEATS PUSH", 5000, event.climaxx || Number(event.addGames) >= 10 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.climaxx ? "CLIMAXX" : "HIYOKU BEATS", event.climaxx ? "CLIMAXX到達" : event.levelLabel || "比翼BEATS", `+${yen.format(event.addGames)}G`, `高確残り ${yen.format(event.highGames)}G`, event.climaxx ? "hyper" : "rush", 100, "比翼BEATS結果");
          await waitForExperience(950);
        } else if (event.kind === "darling-end") {
          const endComplete = await animateExperienceCounter(3, "G", "LAST 3 GAMES", "ボーナス高確 最終ゲーム", "残りゲーム数を0まで進めます", 0, `BONUS ${yen.format(event.bonuses)}回・累計${yen.format(event.cumulative)}枚`, runId);
          if (!endComplete) return;
          setExperienceStage(4, "BONUS HIGH PROBABILITY END", "ダーリン・イン・ザ・フランキス終了", "0G", `BONUS ${yen.format(event.bonuses)}回・累計 ${yen.format(event.cumulative)}枚`, "end", 0, "高確ゲーム数消化完了");
          await waitForExperience(700);
        }
      }
      return;
    }
    if (toaruIndex2Flow) {
      const events = Array.isArray(data.atEvents) ? data.atEvents : [];
      for (const event of events) {
        if (runId !== experienceRunId) return;
        if (event.kind === "toaru-cz") {
          const czComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 10), "G", event.entryType === "direct" ? "DIRECT RUSH" : "CHANCE ZONE", event.label, event.entryType === "direct" ? "幻想殺しRUSHへ直行します" : "成立役でATを抽選します", Number(event.chance) || 52, event.entryType === "direct" ? "AT直撃" : `AT期待度 約${Number(event.chance || 52).toFixed(0)}%`, runId);
          if (!czComplete) return;
          setExperienceStage(2, "CZ FINAL JUDGE", event.label, "PUSH", "幻想殺しRUSHの当落を開きます", "judge", Number(event.chance) || 52, "CZ最終結果");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(2, "CZ RESULT", event.success ? "CZ突破" : "CZ失敗", event.success ? "幻想殺しRUSH" : "通常へ", event.success ? "初期40G以上のATを開始します" : "今回の一撃はここで終了", event.success ? "rush" : "end", event.success ? 100 : 0, `${event.label}結果`);
          await waitForExperience(850);
          if (!event.success) return;
        } else if (event.kind === "toaru-rush-start") {
          setExperienceStage(3, "IMAGINE BREAKER RUSH", "幻想殺しRUSH開始", `${yen.format(event.remaining)}G`, "純増約4.0枚/G・バトルと上乗せを抽選", "rush", 100, "初期40G以上");
          await waitForExperience(850);
        } else if (event.kind === "toaru-rush") {
          const rushComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 8), "G", "IMAGINE BREAKER RUSH", "幻想殺しRUSH消化中", "残りゲーム数を減らしながらバトルを抽選", 38, `残り ${yen.format(event.remaining)}G`, runId);
          if (!rushComplete) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
        } else if (event.kind === "toaru-plus-action") {
          const actionComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 3), "G", "PLUS ACTION", event.label, "上乗せゲーム数を決定します", 100, "PLUS ACTION", runId);
          if (!actionComplete) return;
          setExperienceStage(3, "PLUS ACTION RESULT", event.label, "PUSH", "上乗せゲーム数を開きます", "judge", 100, "上乗せ結果");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, Number(event.addGames) >= 100 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "PLUS ACTION", event.label, `+${yen.format(event.addGames)}G`, `残り${yen.format(event.remaining)}G`, Number(event.addGames) >= 100 ? "hyper" : "rush", 100, "上乗せ完了");
          await waitForExperience(850);
        } else if (event.kind === "toaru-battle") {
          const battleComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 4), "G", "BATTLE", event.label, "成立役で勝利を抽選します", Number(event.chance) || 50, "体験用代表勝率", runId);
          if (!battleComplete) return;
          setExperienceStage(3, "BATTLE FINAL JUDGE", event.label, "PUSH", "勝敗を開きます", "judge", Number(event.chance) || 50, "バトル最終結果");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.won ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "BATTLE RESULT", event.won ? "バトル勝利" : "バトル敗北", event.won ? "上乗せ遊技へ" : "RUSHへ戻る", `残り${yen.format(event.remaining)}G`, event.won ? "hit" : "end", event.won ? 100 : 0, `${event.label}結果`);
          await waitForExperience(850);
        } else if (event.kind === "toaru-charge") {
          setExperienceStage(3, "CHARGE GAME", "とある運命の上乗遊技", "PUSH", "上乗せ報酬を開きます", "judge", 100, "7段階の報酬");
          await waitForExperienceAction("上乗せ遊技 PUSH", 5000, Number(event.addGames) >= 130 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "CHARGE GAME RESULT", event.label, `+${yen.format(event.addGames)}G`, `残り${yen.format(event.remaining)}G`, Number(event.addGames) >= 130 ? "hyper" : "rush", 100, "上乗せ完了");
          await waitForExperience(900);
        } else if (event.kind === "toaru-end") {
          const endComplete = await animateExperienceCounter(3, "G", "LAST 3 GAMES", "幻想殺しRUSH最終ゲーム", "残りゲーム数を0まで進めます", 0, `累計 ${yen.format(event.cumulative)}枚`, runId);
          if (!endComplete) return;
          setExperienceStage(4, "RUSH END", "幻想殺しRUSH終了", "0G", `累計 ${yen.format(event.cumulative)}枚`, "end", 0, "残りゲーム数消化完了");
          await waitForExperience(700);
        } else if (event.kind === "toaru-fiamma") {
          const fiammaComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 4), "G", "FIAMMA BATTLE", event.label, "幻想殺しRUSH再突入を抽選します", Number(event.chance) || 50, "体験用代表勝率", runId);
          if (!fiammaComplete) return;
          setExperienceStage(4, "FIAMMA FINAL JUDGE", event.label, "PUSH", "再突入の当落を開きます", "judge", Number(event.chance) || 50, "引き戻し最終結果");
          await waitForExperienceAction("フィアンマBATTLE PUSH", 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(4, "FIAMMA RESULT", event.success ? "フィアンマ撃破" : "フィアンマBATTLE敗北", event.success ? "RUSH再突入" : "AT終了", event.success ? "上乗せ遊技を経て再開" : "最終結果へ", event.success ? "hyper" : "end", event.success ? 100 : 0, "フィアンマBATTLE結果");
          await waitForExperience(900);
        } else if (event.kind === "toaru-return") {
          setExperienceStage(4, "CHARGE GAME", "再突入報酬", "PUSH", "上乗せ報酬を開きます", "judge", 100, "フィアンマ勝利報酬");
          await waitForExperienceAction("再突入報酬 PUSH", 5000, Number(event.addGames) >= 130 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(4, "RUSH RETURN", event.reward, `+${yen.format(event.addGames)}G`, `${event.label}・累計${yen.format(event.cumulative)}枚`, "hyper", 100, "幻想殺しRUSH再突入");
          await waitForExperience(950);
        }
      }
      return;
    }
    if (magiaRecordFlow) {
      const events = Array.isArray(data.atEvents) ? data.atEvents : [];
      for (const event of events) {
        if (runId !== experienceRunId) return;
        if (event.kind === "magia-bonus") {
          const bonusComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 30), "G", "MAGIA BONUS", event.label, "成立役と高確ゲーム数でATを抽選します", Number(event.chance) || 40, `AT期待度 約${Number(event.chance || 40).toFixed(0)}%`, runId);
          if (!bonusComplete) return;
          setExperienceStage(2, "BONUS FINAL JUDGE", event.label, "PUSH", "マギアラッシュの当落を開きます", "judge", Number(event.chance) || 40, "BONUS最終結果");
          await waitForExperienceAction("BONUS PUSH", 5000, event.entered ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(2, "BONUS RESULT", event.entered ? "AT当選" : "AT非当選", event.entered ? "マギアラッシュ" : `+${yen.format(event.award)}枚`, event.entered ? "マギアアタックへ進みます" : "BONUS終了・最終結果へ", event.entered ? "hit" : "end", event.entered ? 100 : 0, `${event.label}結果`);
          await waitForExperience(850);
          if (!event.entered) return;
        } else if (event.kind === "magia-attack") {
          const attackComplete = await animateExperienceCounter(10, "G", "MAGIA ATTACK", "マギアアタック", "前半5Gでカード獲得・後半5Gでゲーム数上乗せ", 100, "初期ゲーム数決定ゾーン", runId);
          if (!attackComplete) return;
          setExperienceStage(3, "INITIAL GAME REVEAL", "初期ゲーム数", "PUSH", "5枚のカードの合計上乗せを開きます", "judge", 100, "マギアアタック結果");
          await waitForExperienceAction("マギアアタック PUSH", 5000, Number(event.attackGames) >= 100 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "MAGIA ATTACK", "初期ゲーム数決定", `+${yen.format(event.attackGames)}G`, `純増約2.6枚/G・獲得 +${yen.format(event.award)}枚`, Number(event.attackGames) >= 100 ? "hyper" : "rush", 100, "マギアラッシュ開始");
          await waitForExperience(900);
        } else if (event.kind === "magia-rush") {
          const rushComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 10), "G", "MAGIA RUSH", `ストーリー ${event.stories}/8`, "残りゲーム数を減らしながら報酬を抽選", 64, `残り ${yen.format(event.remaining)}G`, runId);
          if (!rushComplete) return;
        } else if (event.kind === "magia-story") {
          setExperienceStage(3, "STORY REWARD", `${event.storyCount}/8話`, "PUSH", "ストーリー報酬を開きます", "judge", 100, event.special ? "スペシャルストーリー濃厚" : "ストーリー当選");
          await waitForExperienceAction("ストーリー PUSH", 5000, event.special ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, event.special ? "SPECIAL STORY" : "STORY", event.label, `${event.storyAdvance === 2 ? "+2話" : "+1話"}`, `ストーリー ${event.storyCount}/8・${event.games}G`, event.special ? "hyper" : "rush", 100, event.connectLevel ? `コネクトチャンスLv.${event.connectLevel}` : "ストーリー終了");
          await waitForExperience(900);
        } else if (event.kind === "magia-connect") {
          const connectComplete = await animateExperienceCounter(3, "G", "CONNECT CHANCE", `LEVEL ${event.level}`, "紋章完成でコネクト成功", Number(event.chance) || 20.6, `成功期待度 約${Number(event.chance || 20.6).toFixed(1)}%`, runId);
          if (!connectComplete) return;
          setExperienceStage(3, "CONNECT FINAL JUDGE", "コネクトチャンス", "PUSH", "キャラと上乗せゲーム数を開きます", "judge", Number(event.chance) || 20.6, "3G 最終結果");
          await waitForExperienceAction("コネクト PUSH", 5000, event.connected ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "CONNECT RESULT", event.connected ? `${event.character} コネクト` : "コネクト失敗", event.connected ? `+${yen.format(event.addGames)}G` : "RUSHへ戻る", event.connected ? `残り${yen.format(event.remaining)}G・累計${yen.format(event.cumulative)}枚` : `残り${yen.format(event.remaining)}G`, event.connected ? "hyper" : "end", event.connected ? 100 : 0, "コネクト結果");
          await waitForExperience(900);
        } else if (event.kind === "magia-battle") {
          const battleComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 12), "G", "KAMIHAMA BATTLE", "決戦神浜聖女", "成立役で勝利を抽選します", Number(event.chance) || 55, "体験用代表勝率", runId);
          if (!battleComplete) return;
          setExperienceStage(3, "BATTLE FINAL JUDGE", "決戦神浜聖女", "PUSH", "勝敗と報酬を開きます", "judge", Number(event.chance) || 55, "バトル最終結果");
          await waitForExperienceAction("決戦神浜聖女 PUSH", 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "BATTLE RESULT", event.success ? "神浜聖女撃破" : "バトル敗北", event.success ? `+${yen.format(event.addGames)}G` : "RUSHへ戻る", `残り${yen.format(event.remaining)}G・累計${yen.format(event.cumulative)}枚`, event.success ? "hyper" : "end", event.success ? 100 : 0, "決戦神浜聖女結果");
          await waitForExperience(900);
        } else if (event.kind === "magia-reward-bonus") {
          const rewardComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 30), "G", "MAGIA BONUS", event.label, "BONUS出玉を獲得します", 100, `獲得 +${yen.format(event.award)}枚`, runId);
          if (!rewardComplete) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
        } else if (event.kind === "magia-set-continue") {
          setExperienceStage(3, "SET CONTINUE", "マギアラッシュ継続", "40G", `${event.set}セット目を開始します`, "rush", 100, "特殊セット継続");
          await waitForExperience(850);
        } else if (event.kind === "magia-upper-prepare") {
          const prepareComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 32), "G", "EMBRYO EVE PREPARE", "全8話コンプリート", "覚醒準備中に保証ゲーム数を上乗せ", 100, "エンブリオ・イブ覚醒濃厚", runId);
          if (!prepareComplete) return;
        } else if (event.kind === "magia-upper-attack") {
          const upperAttackComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 10), "G", "EMBRYO EVE ATTACK", "エンブリオ・イブアタック", "上位ATの初期ゲーム数を決定します", 100, "10G＋α", runId);
          if (!upperAttackComplete) return;
          setExperienceStage(4, "UPPER GAME REVEAL", "覚醒初期ゲーム数", "PUSH", "エンブリオ・イブ覚醒の初期ゲーム数を開きます", "judge", 100, "イブアタック結果");
          await waitForExperienceAction("イブアタック PUSH", 5000, "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(4, "EMBRYO EVE ATTACK", "初期ゲーム数決定", `+${yen.format(event.attackGames)}G`, `獲得 +${yen.format(event.award)}枚`, "hyper", 100, "エンブリオ・イブ覚醒開始");
          await waitForExperience(1000);
        } else if (event.kind === "magia-upper-rush") {
          const upperComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 100), "G", "EMBRYO EVE AWAKENING", "エンブリオ・イブ覚醒", "ストーリー当選時はコネクトチャンスが必ず発生", 100, `累計 ${yen.format(event.cumulative)}枚`, runId);
          if (!upperComplete) return;
        } else if (event.kind === "magia-end") {
          const endComplete = await animateExperienceCounter(3, "G", "LAST 3 GAMES", "マギアラッシュ最終ゲーム", "残りゲーム数を0まで進めます", 0, `ストーリー ${event.stories}/8`, runId);
          if (!endComplete) return;
          setExperienceStage(4, "RUSH END", "マギアラッシュ終了", "0G", `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, "end", 0, "残りゲーム数消化完了");
          await waitForExperience(750);
        }
      }
      return;
    }
    if (azurLaneFlow) {
      const events = Array.isArray(data.atEvents) ? data.atEvents : [];
      for (const event of events) {
        if (runId !== experienceRunId) return;
        if (event.kind === "azur-bonus") {
          const bonusComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 20), "G", "SEA BATTLE BONUS", event.label, "ベルナビ10回＋告知10GでATを抽選します", Number(event.chance) || 26.3, `AT期待度 約${Number(event.chance || 26.3).toFixed(1)}%`, runId);
          if (!bonusComplete) return;
          setExperienceStage(2, "BONUS FINAL JUDGE", event.label, "PUSH", "アズールレーンRUSHの当落を開きます", "judge", Number(event.chance) || 26.3, "海戦BONUS 最終結果");
          await waitForExperienceAction("海戦BONUS PUSH", 5000, event.entered ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(2, "BONUS RESULT", event.entered ? "AT当選" : "AT非当選", event.entered ? "RUSH確定" : `+${yen.format(event.award)}枚`, event.entered ? "海戦ATTACKへ進みます" : "海戦BONUS終了・最終結果へ", event.entered ? "hit" : "end", event.entered ? 100 : 0, `${event.label}結果`);
          await waitForExperience(850);
          if (!event.entered) return;
        } else if (event.kind === "azur-attack") {
          const attackComplete = await animateExperienceCounter(3, "G", "SEA BATTLE ATTACK", "海戦ATTACK", "毎ゲーム上乗せ・最低50Gを獲得", Math.max(0, Number(event.loopRate) || 0), "ループ率はAT当選時に決定", runId);
          if (!attackComplete) return;
          setExperienceStage(3, "INITIAL GAME REVEAL", "初期ゲーム数", "PUSH", "RUSHの初期ゲーム数を開きます", "judge", 100, "海戦ATTACK結果");
          await waitForExperienceAction("海戦ATTACK PUSH", 5000, Number(event.attackGames) >= 150 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "SEA BATTLE ATTACK", "初期ゲーム数決定", `+${yen.format(event.attackGames)}G`, `純増約2.5枚/G・獲得 +${yen.format(event.award)}枚`, Number(event.attackGames) >= 150 ? "hyper" : "rush", 100, "アズールレーンRUSH開始");
          await waitForExperience(900);
        } else if (event.kind === "azur-rush") {
          const rushComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 10), "G", "AZUR LANE RUSH", `${event.factions}陣営参戦`, "レア役で上乗せ・セイレーンバトルを抽選", 68, `残り ${yen.format(event.remaining)}G`, runId);
          if (!rushComplete) return;
        } else if (event.kind === "azur-siren") {
          const battleComplete = await animateExperienceCounter(Math.max(5, Number(event.games) || 5), "G", "SIREN BATTLE", event.enemy, "全役で勝利を抽選・レア役なら勝利濃厚", Number(event.chance) || 40.1, `勝利期待度 約${Number(event.chance || 40.1).toFixed(1)}%`, runId);
          if (!battleComplete) return;
          setExperienceStage(3, "SIREN FINAL JUDGE", event.enemy, "PUSH", "勝敗と戦功褒賞を開きます", "judge", Number(event.chance) || 40.1, `${event.factions}陣営参戦`);
          await waitForExperienceAction("セイレーンバトル PUSH", 5000, event.won ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "SIREN RESULT", event.won ? "海戦勝利" : "海戦敗北", event.won ? event.rewardLabel : "RUSHへ戻る", event.won ? `${event.factions}/4陣営・残り${yen.format(event.remaining)}G` : `残り${yen.format(event.remaining)}G`, event.gathered ? "hyper" : event.won ? "rush" : "end", event.won ? 100 : 0, `${event.enemy}結果`);
          await waitForExperience(900);
        } else if (event.kind === "azur-amagi") {
          const amagiComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 7), "G", "AMAGI BATTLE", "4陣営集結", "異次元性能SS RUSHをかけた上位CZ", Number(event.chance) || 54, "成功期待度 約54%", runId);
          if (!amagiComplete) return;
          setExperienceStage(4, "AMAGI FINAL JUDGE", "天城BATTLE", "PUSH", "上位ATの当落を開きます", "judge", Number(event.chance) || 54, "7G 上位CZ");
          await waitForExperienceAction("天城BATTLE PUSH", 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(4, "AMAGI RESULT", event.success ? "天城撃破" : "天城BATTLE敗北", event.success ? "SS RUSH突入" : "通常AT終了", event.success ? "純増約5.1枚/G・4陣営参戦" : "最終結果を表示します", event.success ? "hyper" : "end", event.success ? 100 : 0, "天城BATTLE結果");
          await waitForExperience(950);
        } else if (event.kind === "azur-upper") {
          const upperComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 100), "G", "DIMENSIONAL SS RUSH", `${event.loop}区間目・4陣営参戦`, "純増約5.1枚/Gで高速消化", Number(event.chance) || 54, `天城BATTLE継続期待度 約${Math.round(Number(event.chance) || 54)}%`, runId);
          if (!upperComplete) return;
          setExperienceStage(4, "SS RUSH RESULT", event.continued ? "異次元ループ継続" : "SS RUSH終了", `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚${event.continued ? "・天城BATTLE成功" : ""}`, event.continued ? "hyper" : "end", event.continued ? 100 : 0, `${event.loop}区間目`);
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          await waitForExperience(950);
        }
      }
      return;
    }
    if (bofuriFlow) {
      const events = Array.isArray(data.atEvents) ? data.atEvents : [];
      for (const event of events) {
        if (runId !== experienceRunId) return;
        if (event.kind === "bofuri-cz") {
          const czComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 15), "G", event.initial ? "HIGH PROBABILITY ZONE" : "DEFENSE CHANCE ZONE", event.label, "成立役でBONUSを抽選し、最後のPUSHで決着します", Number(event.chance) || 50, `BONUS期待度 約${Math.round(Number(event.chance) || 50)}%`, runId);
          if (!czComplete) return;
          setExperienceStage(2, "CZ FINAL JUDGE", event.label, "PUSH", "BONUSの当落を開きます", "judge", Number(event.chance) || 50, "高確率ZONE 最終結果");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(2, "CZ RESULT", event.success ? "BONUS当選" : "高確率ZONE終了", event.success ? "BONUS確定" : "通常へ", event.success ? "次のPUSHでBONUS種類を開きます" : "今回の一撃はここで終了", event.success ? "hit" : "end", event.success ? 100 : 0, `${event.label}結果`);
          await waitForExperience(850);
          if (!event.success) return;
        } else if (event.kind === "bofuri-bonus") {
          setExperienceStage(3, "BONUS REVEAL", "BONUS種別ジャッジ", "PUSH", "REG・BIG・エピソードの結果を開きます", "judge", 100, event.source || "BONUS当選");
          await waitForExperienceAction("BONUS種別 PUSH", 5000, event.bonusType === "episode" ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, event.bonusType === "episode" ? "EPISODE BONUS" : "BONUS", event.label, `+${yen.format(event.award)}枚`, `防御力 ${yen.format(event.defensePoints)}pt・${event.defenseLabel}`, event.bonusType === "episode" ? "hyper" : "hit", 100, `${event.games}G・純増約5.5枚/G`);
          await waitForExperience(1000);
        } else if (event.kind === "bofuri-defense") {
          const defenseComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 12), "G", "DEFENSE STATE", event.levelLabel, "全役でCZを抽選しながら転落を回避します", Number(event.chance) || 77, `${event.first ? "初回保障込み" : "CZループ"} 約${Math.round(Number(event.chance) || 77)}%`, runId);
          if (!defenseComplete) return;
          setExperienceStage(3, "DEFENSE JUDGE", event.levelLabel, "PUSH", event.infinite ? "80G到達・無限CZを開きます" : "CZ当選か防御状態転落かを開きます", "judge", Number(event.chance) || 77, `防御状態 ${event.loop}回目`);
          await waitForExperienceAction("防御状態 PUSH", 5000, event.reachedCz ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "DEFENSE RESULT", event.reachedCz ? (event.infinite ? "80G完走・無限CZ" : "高確率ZONE当選") : "防御状態転落", event.reachedCz ? "CZへ" : "連チャン終了", event.reachedCz ? "次の高確率ZONEへ進みます" : "最終結果を表示します", event.reachedCz ? "rush" : "end", event.reachedCz ? 100 : 0, `${event.levelLabel} 結果`);
          await waitForExperience(850);
        } else if (event.kind === "bofuri-angel") {
          const angelComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 30), "G", "ANGEL ZONE", "天使ZONE", "高確率ZONE約1/5.5でBONUSを狙います", Number(event.chance) || 70, "ボーナス期待度 約70%", runId);
          if (!angelComplete) return;
          setExperienceStage(3, "ANGEL FINAL", "天使ZONE 最終結果", "PUSH", "BONUS獲得結果を開きます", "judge", Number(event.chance) || 70, "30G 特化ZONE");
          await waitForExperienceAction("天使ZONE PUSH", 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "ANGEL RESULT", event.success ? "BONUS獲得" : "天使ZONE終了", event.success ? `+${yen.format(event.award)}枚` : "獲得なし", `${event.defenseLabel}で防御状態へ`, event.success ? "hyper" : "end", event.success ? 100 : 0, "天使ZONE結果");
          await waitForExperience(1000);
        } else if (event.kind === "bofuri-violence") {
          const violenceComplete = await animateExperienceCounter(Math.max(1, Number(event.games) || 50), "G", "VIOLENCE ZONE", "暴虐ZONE", "暴虐高確率から暴虐BONUSを重ねます", 87, "期待枚数 約3500枚", runId);
          if (!violenceComplete) return;
          setExperienceStage(4, "VIOLENCE FINAL", "暴虐ZONE 結果", "PUSH", "50Gの最終獲得枚数を開きます", "judge", 87, "最上位特化ZONE");
          await waitForExperienceAction("暴虐ZONE PUSH", 5000, "gold");
          if (runId !== experienceRunId) return;
          setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(4, "VIOLENCE RESULT", "暴虐ZONE 完走", `+${yen.format(event.award)}枚`, "終了後はLv.4 極ロングの防御状態へ", "hyper", 100, "暴虐ZONE 50G結果");
          await waitForExperience(1100);
        }
      }
      return;
    }
    if (basiliskTenzenFlow) {
      const bc = { ...(data.basiliskBc || {}), ...(data.entryBonus || {}) };
      const bcComplete = await animateExperienceCounter(Math.max(1, Number(bc.games) || 16), "G", "BASILISK CHANCE", bc.label, "成立役でバジリスクタイムを抽選します", data.entryChance, `BT期待度 約${Math.round(data.entryChance)}%`, runId);
      if (!bcComplete) return;
      setExperienceHud(`${yen.format(data.attempts)}G`, `${yen.format(result.investment)}円`, `${yen.format(bc.payout || bc.award || 0)}枚`);
      setExperienceStage(2, "BC FINAL JUDGE", bc.label, "PUSH", "バジリスクタイムの当落を開きます", "judge", data.entryChance, `${bc.games || 16}G BC最終結果`);
      await waitForExperienceAction(`${bc.label} BT判定 PUSH`, 5000, data.entered ? "gold" : "normal");
      if (runId !== experienceRunId) return;
      setExperienceStage(2, "BC RESULT", data.entered ? "BT当選" : "BT非当選", data.entered ? "バジリスクタイム" : "通常へ", data.entered ? "追想の刻から1セット目を開始します" : "BC獲得枚数を収支へ加えて終了します", data.entered ? "rush" : "end", data.entered ? 100 : 0, `${bc.label}結果`);
      await waitForExperience(950);
      if (!data.entered) return;
    }
    if (data.entryBonusModel && !basiliskTenzenFlow) {
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
    if (okidokiGoldFlow) {
      setExperienceStage(2, "CHANCE!", "ハイビスカス点灯", "PUSH", "BIGかREGか、BONUS種別を開きます", "judge", 100, "初当りBONUS");
      await waitForExperience(650);
    }
    if (uminchuFlow) {
      setExperienceStage(2, "CHANCE!", "ピュイ♪ BONUS確定", "PUSH", "BIGかREGか、BONUS種別を開きます", "judge", 100, "初当りBONUS");
      await waitForExperience(650);
    }
    if (sao2Flow) {
      setExperienceStage(2, "SQUADRON FINAL", "スコードロンバトル", "PUSH", "Bullet of Bulletsの当落を開きます", "judge", data.triggerSuccessChance, "CZ成功期待度 約55%");
      await waitForExperienceAction("スコードロンバトル PUSH", 5000, data.entered ? "gold" : "normal");
      if (runId !== experienceRunId) return;
      setExperienceStage(2, "CZ RESULT", data.entered ? "SQUADRON WIN" : "SQUADRON LOSE", data.entered ? "BoB突入" : "通常へ", data.entered ? "初期150枚＋αの差枚数ATを開始します" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, "スコードロンバトル結果");
      await waitForExperience(950);
      if (!data.entered) return;
    }
    if (symphogearSeigiFlow) {
      const battleComplete = await animateExperienceCounter(10, "G", "AXZ BATTLE", "装者とともに突破を目指せ", "対応役・レア役で勝利を抽選し、最後のPUSHで決着します", data.triggerSuccessChance, "成功期待度 約65%", runId);
      if (!battleComplete) return;
      setExperienceStage(2, "AXZ FINAL JUDGE", "AXZバトル 最終決戦", "PUSH", "AXZラッシュの当落を開きます", "judge", data.triggerSuccessChance, "CZ最終結果");
      await waitForExperienceAction("AXZバトル PUSH", 5000, data.entered ? "gold" : "normal");
      if (runId !== experienceRunId) return;
      setExperienceStage(2, "AXZ BATTLE RESULT", data.entered ? "AXZバトル突破" : "AXZバトル敗北", data.entered ? "AXZラッシュ" : "通常へ", data.entered ? "初期ゲーム数決定ゾーンへ進みます" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, "AXZバトル結果");
      await waitForExperience(950);
      if (!data.entered) return;
    }
    if (lycorisFlow) {
      const cz = data.lycorisCz || { key: "opposite", label: "対極のふたり", games: 10, chance: 0.53 };
      if (cz.key === "direct") {
        setExperienceStage(2, "DIRECT RUSH", cz.label, "RUSH直撃", "アフターエピソードからプロローグへ進みます", "hit", 100, "通常時直撃ルート");
        await waitForExperience(900);
      } else {
        const czComplete = await animateExperienceCounter(Math.max(1, Number(cz.games) || 10), "G", "CHANCE ZONE", cz.label, "小役・対応役でリコリスラッシュを抽選します", data.triggerSuccessChance, `成功期待度 約${Math.round(data.triggerSuccessChance)}%`, runId);
        if (!czComplete) return;
        setExperienceStage(2, "CZ FINAL JUDGE", cz.label, "PUSH", "リコリスラッシュの当落を開きます", "judge", data.triggerSuccessChance, "CZ最終結果");
        await waitForExperienceAction(`${cz.label} PUSH`, 5000, data.entered ? "gold" : "normal");
        if (runId !== experienceRunId) return;
        setExperienceStage(2, "CZ RESULT", data.entered ? "ミッション成功" : "ミッション失敗", data.entered ? "RUSH突入" : "通常へ", data.entered ? "約100枚のプロローグへ進みます" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, `${cz.label}結果`);
        await waitForExperience(950);
        if (!data.entered) return;
      }
    }
    if (kanokariFlow) {
      const firstSource = data.atEvents?.find(event => event.kind === "kanokari-bonus" || event.kind === "kanokari-dream")?.source || (Array.isArray(data.flow) ? data.flow.join(" ") : "") || "レンカノCHALLENGE";
      const cz = firstSource.includes("妄想")
        ? { key: "delusion", label: "妄想DTチャレンジ", games: 10, chance: 75 }
        : firstSource.includes("直撃")
          ? { key: "direct", label: "BONUS直撃", games: 1, chance: 100 }
          : { key: "rental", label: "レンカノCHALLENGE", games: 15, chance: 56 };
      if (cz.key === "direct") {
        setExperienceStage(2, "DIRECT BONUS", cz.label, "BONUS確定", "疑似BONUSの種類を次のPUSHで開きます", "hit", 100, "通常時直撃ルート");
        await waitForExperience(900);
      } else {
        const czComplete = await animateExperienceCounter(cz.games, "G", "CHANCE ZONE", cz.label, cz.key === "delusion" ? "小役成立ごとにBONUSを一発抽選します" : "小役でオーラを上げてBONUSを目指します", cz.chance, `成功期待度 約${cz.chance}%`, runId);
        if (!czComplete) return;
        setExperienceStage(2, "CZ FINAL JUDGE", cz.label, "PUSH", "疑似BONUSの当落を開きます", "judge", cz.chance, "CZ最終結果");
        await waitForExperienceAction(`${cz.label} PUSH`, 5000, data.entered ? "gold" : "normal");
        if (runId !== experienceRunId) return;
        setExperienceStage(2, "CZ RESULT", data.entered ? "BONUS当選" : "CZ失敗", data.entered ? "疑似BONUSへ" : "通常へ", data.entered ? "BONUS種類とストック結果を開きます" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, `${cz.label}結果`);
        await waitForExperience(950);
        if (!data.entered) return;
      }
    }
    if (aobutaFlow) {
      setExperienceStage(2, "SEISHUN BONUS", "青春BONUS", "ベルナビ5回", "消化後は青ブタJUDGEへ必ず突入します", "hit", 100, "初当りBONUS");
      await waitForExperience(950);
      if (runId !== experienceRunId) return;
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
    if (goblinSlayerFlow) {
      const cz = data.goblinCz || { key: "mission", label: "ゴブリンスレイヤーミッション", games: 12, chance: 0.33 };
      if (cz.key === "mission") {
        const missionComplete = await animateExperienceCounter(10, "G", "GOBLIN SLAYER MISSION", "ランクアップパート", "小役成立でランクアップ・RUSHを抽選します", data.triggerSuccessChance, "CZ期待度 約33%", runId);
        if (!missionComplete) return;
        const judgeComplete = await animateExperienceCounter(2, "G", "MISSION JUDGE", "ゴブリンを殲滅せよ", "2Gのジャッジパートを最後まで進めます", data.triggerSuccessChance, "CZ最終ジャッジ", runId);
        if (!judgeComplete) return;
      } else if (cz.key === "chance") {
        const chanceComplete = await animateExperienceCounter(3, "回", "GOBLIN SLAYER CHANCE", "青BARを狙え", "狙えカットイン3回までに青BAR揃いを目指します", data.triggerSuccessChance, "CZ期待度 約45%", runId);
        if (!chanceComplete) return;
      } else if (cz.key === "battle") {
        const battleComplete = await animateExperienceCounter(7, "G", "GOBLIN SLAYER BATTLE", "ゴブリンチャンピオンを討伐せよ", "小役で勝利抽選・最大7Gのバトルです", data.triggerSuccessChance, "CZ期待度 約70%", runId);
        if (!battleComplete) return;
      } else {
        setExperienceStage(2, "DIRECT AT", "規定ゲーム数到達", "AT直撃", "ゴブリンスレイヤーRUSHへ進みます", "hit", 100, "AT直撃ルート");
        await waitForExperience(900);
      }
      if (cz.key !== "direct") {
        setExperienceStage(2, "CZ FINAL JUDGE", cz.label, "PUSH", "ゴブリンスレイヤーRUSHの当落を開きます", "judge", data.triggerSuccessChance, "CZ最終結果");
        await waitForExperienceAction(`${cz.label} PUSH`, 5000, data.triggerSucceeded ? "gold" : "normal");
        if (runId !== experienceRunId) return;
        setExperienceStage(2, "CZ RESULT", data.triggerSucceeded ? "ゴブリン殲滅" : "CZ失敗", data.triggerSucceeded ? "RUSH突入" : "通常へ", data.triggerSucceeded ? "100GのゴブリンスレイヤーRUSH開始" : "今回の一撃はここで終了", data.triggerSucceeded ? "rush" : "end", data.triggerSucceeded ? 100 : 0, `${cz.label}結果`);
        await waitForExperience(900);
        if (!data.triggerSucceeded) return;
      }
    }
    if (assaultLilyFlow) {
      const route = data.assaultEntry || { key: "direct", label: "AT直撃", games: 1, chance: 1 };
      if (route.key === "direct") {
        setExperienceStage(2, "DIRECT RUSH", route.label, "RUSH直撃", "初期150枚＋αの差枚数ATへ進みます", "hit", 100, "通常時からのAT直撃");
        await waitForExperience(900);
      } else if (route.key === "bouquet") {
        const bonusComplete = await animateExperienceCounter(25, "G", "BOUQUET BONUS", route.label, "レア役・白7揃いからRUSHを抽選します", data.triggerSuccessChance, "獲得約88枚・RUSH期待度約29%", runId);
        if (!bonusComplete) return;
        setExperienceHud(`${yen.format(data.attempts + 25)}G`, `${yen.format(result.investment)}円`, `${yen.format(data.entryBonus?.payout || 88)}枚`);
        setExperienceStage(2, "BONUS FINAL JUDGE", route.label, "PUSH", "アサルトリリィRUSHの当落を開きます", "judge", data.triggerSuccessChance, "BONUS中RUSH抽選");
        await waitForExperienceAction("ブーケボーナス PUSH", 5000, data.entered ? "gold" : "normal");
        if (runId !== experienceRunId) return;
        setExperienceStage(2, "BONUS RESULT", data.entered ? "白7揃い・RUSH当選" : "BONUS終了", data.entered ? "RUSH突入" : "通常へ", data.entered ? "初期150枚＋αの差枚数AT開始" : "約88枚を獲得して今回の一撃は終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, "ブーケボーナス結果");
        await waitForExperience(950);
        if (!data.entered) return;
      } else {
        const czComplete = await animateExperienceCounter(10, "G", "LILY CHALLENGE", route.label, route.key === "schutzengel" ? "成功でRUSH濃厚・失敗時は天上ノ庭へ" : "対応役・レア役でRUSH当選を抽選します", data.triggerSuccessChance, `CZ期待度 約${Math.round(data.triggerSuccessChance)}%`, runId);
        if (!czComplete) return;
        setExperienceStage(2, "LILY FINAL JUDGE", route.label, "PUSH", "アサルトリリィRUSHの当落を開きます", "judge", data.triggerSuccessChance, "10G CZ最終結果");
        await waitForExperienceAction(`${route.label} PUSH`, 5000, data.entered ? "gold" : "normal");
        if (runId !== experienceRunId) return;
        setExperienceStage(2, "LILY RESULT", data.entered ? "チャレンジ成功" : "チャレンジ失敗", data.entered ? "RUSH突入" : route.key === "schutzengel" ? "天上ノ庭へ" : "通常へ", data.entered ? "初期150枚＋αの差枚数AT開始" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, `${route.label}結果`);
        await waitForExperience(950);
        if (!data.entered) return;
      }
    }
    if (kaguyaFlow) {
      const czComplete = await animateExperienceCounter(15, "G", "KOKURASETAI CHALLENGE", "告らせたいチャレンジ", "小役・2択成功から7図柄停止を狙います", data.triggerSuccessChance, "CZ成功期待度 約58%", runId);
      if (!czComplete) return;
      setExperienceStage(2, "CZ FINAL JUDGE", "サンド目を狙え！", "PUSH", "KAGUYA BONUSの当落を開きます", "judge", data.triggerSuccessChance, "15G＋α CZ最終結果");
      await waitForExperienceAction("告らせたいチャレンジ PUSH", 5000, data.entered ? "gold" : "normal");
      if (runId !== experienceRunId) return;
      setExperienceStage(2, "CZ RESULT", data.entered ? "7図柄停止・BONUS確定" : "告らせたいチャレンジ失敗", data.entered ? "BONUSへ" : "通常へ", data.entered ? "初回BONUSの種類を開きます" : "今回の一撃はここで終了", data.entered ? "hit" : "end", data.entered ? 100 : 0, "告らせたいチャレンジ結果");
      await waitForExperience(900);
      if (!data.entered) return;
    }
    if (dumbbellFlow) {
      const cz = data.dumbbellCz || { key: "front", label: "前半パート終了", games: 10, chance: 0 };
      const frontComplete = await animateExperienceCounter(10, "G", "MUSCLE ZONE", "前半パート", "成立役で後半発展とAT直撃を抽選します", 40, "CZトータル期待度 約40%", runId);
      if (!frontComplete) return;
      if (cz.key === "front") {
        setExperienceStage(2, "MUSCLE ZONE END", "後半発展ならず", "通常へ", "今回のトレーニングはここで終了", "end", 0, "前半パート結果");
        await waitForExperience(1000);
        return;
      }
      const routeGames = Math.max(2, Number(cz.games) - 10 || 2);
      const routeComplete = await animateExperienceCounter(routeGames, "G", "MUSCLE ZONE 後半", cz.label, "対応役・レア役でダンベルBONUSを抽選します", data.triggerSuccessChance, `成功期待度 約${Math.round(data.triggerSuccessChance)}%`, runId);
      if (!routeComplete) return;
      setExperienceStage(2, "MUSCLE FINAL JUDGE", cz.label, "PUSH", "ダンベルBONUSの当落を開きます", "judge", data.triggerSuccessChance, "CZ最終結果");
      await waitForExperienceAction(`${cz.label} PUSH`, 5000, data.entered ? "gold" : "normal");
      if (runId !== experienceRunId) return;
      setExperienceStage(2, "MUSCLE RESULT", data.entered ? "トレーニング成功！" : `${cz.label} 失敗`, data.entered ? "BONUS突入" : "通常へ", data.entered ? "30G＋αの通常ATを開始します" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, `${cz.label}結果`);
      await waitForExperience(950);
      if (!data.entered) return;
    }
    if (tokyoGhoulFlow) {
      const cz = data.tokyoGhoulCz || { label: "レミニセンス", games: 8, chance: 0.50 };
      const czComplete = await animateExperienceCounter(Math.max(1, Number(cz.games) || 8), "G", "CHANCE ZONE", cz.label, "小役・レア役で東京喰種咬を抽選します", data.triggerSuccessChance, `成功期待度 約${Math.round(data.triggerSuccessChance)}%`, runId);
      if (!czComplete) return;
      setExperienceStage(2, "CZ FINAL JUDGE", cz.label, "PUSH", "東京喰種咬の当落を開きます", "judge", data.triggerSuccessChance, "8G CZ最終結果");
      await waitForExperienceAction(`${cz.label} PUSH`, 5000, data.entered ? "gold" : "normal");
      if (runId !== experienceRunId) return;
      setExperienceStage(2, "CZ RESULT", data.entered ? "CZ突破" : "CZ失敗", data.entered ? "東京喰種咬" : "通常へ", data.entered ? "初期約150枚の差枚ATを開始します" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, `${cz.label}結果`);
      await waitForExperience(900);
      if (!data.entered) return;
    }
    if (!okidokiGoldFlow && !uminchuFlow && !tentenFlow && !goblinSlayerFlow && !assaultLilyFlow && !kaguyaFlow && !dumbbellFlow && !shinEvaFlow && !tokyoGhoulFlow && !basiliskTenzenFlow && !sao2Flow && !symphogearSeigiFlow && !lycorisFlow && !kanokariFlow && !aobutaFlow && !bofuriFlow) {
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
      if (!setPushFlow && !karakuriJudgeFlow && !battleBonusFlow && !godzillaEva2Flow && !mahoakoFlow && !okidokiGoldFlow && !uminchuFlow && !tentenFlow && !goblinSlayerFlow && !assaultLilyFlow && !kaguyaFlow && !dumbbellFlow && !shinEvaFlow && !tokyoGhoulFlow && !basiliskTenzenFlow && !symphogearSeigiFlow && !lycorisFlow && !kanokariFlow && !aobutaFlow && !bofuriFlow && !sgRaceFlow && !kabaneriStFlow && !otomeRushFlow && !cycleFlow && route.length > 10) {
        const visibleEvents = route.slice(0, 7);
        const remainingEvents = route.slice(7);
        const previousTotal = Number(visibleEvents[visibleEvents.length - 1]?.cumulative) || 0;
        const finalTotal = Number(route[route.length - 1]?.cumulative) || data.payout;
        route = [...visibleEvents, { kind: "summary", label: `残り${remainingEvents.length}演出を高速消化`, games: remainingEvents.reduce((sum, event) => sum + (Number(event.games) || 0), 0), award: Math.max(0, finalTotal - previousTotal), cumulative: finalTotal }];
      }
      let consumedGames = Number(data.entryBonus?.games) || 0;
      let runningAddOn = 0;
      let runningAddOnGames = 0;
      const gameAddOnFlow = kanokariFlow || dumbbellFlow || godzillaEva2Flow || mahoakoFlow || otomeRushFlow || sgRaceFlow || (cycleFlow && rushEvents.some(event => event.kind === "cycle-round" && Number(event.gameAdd) > 0)) || (!karakuriJudgeFlow && !setPushFlow && !battleBonusFlow && !kabaneriStFlow && !cycleFlow && rushEvents.some(event => event.kind === "special" && Number(event.gameAdd) > 0));
      const entryBonusPayout = Number(data.entryBonus?.payout) || 0;
      setSlotAtStatus({ visible: true, remaining: 0, addOn: 0, addOnGames: gameAddOnFlow ? 0 : null, total: entryBonusPayout });
      for (let index = 0; index < route.length; index += 1) {
        if (runId !== experienceRunId || experienceSkipped) break;
        const event = route[index];
        const eventGames = Math.max(1, Number(event.games) || data.atGameTimeline?.[index] || 20);

        if (event.kind === "aobuta-entry-bonus") {
          const bonusComplete = await animateExperienceCounter(eventGames, "回", "SEISHUN BONUS", event.label, "ベルナビを消化し、ST強化ポイントを抽選します", 100, `獲得 ${yen.format(event.award)}枚`, runId);
          if (!bonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 4, remainingUnit: "SET", addOn: 0, addOnGames: null, total: event.cumulative });
          setExperienceStage(3, "AO BUTA JUDGE", "完走型STへ", "4SET＋α", "1セット2Gを最後まで消化します", "rush", 100, "最低8G＋α");
          await waitForExperience(900);
          continue;
        }

        if (event.kind === "aobuta-st") {
          const stComplete = await animateExperienceCounter(event.sets * 2, "G", "AO BUTA JUDGE", `${event.round}周目・完走型ST`, "ボーナス当選後も残りゲーム数をすべて消化します", event.continued ? 100 : 0, "1SET 2G・複数V獲得あり", runId);
          if (!stComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "ST RESULT", `${event.round}周目 青ブタJUDGE`, "PUSH", "今回獲得したV個数を開きます", "judge", event.continued ? 60 : 0, `${event.sets}セット完走`);
          await waitForExperienceAction(`青ブタJUDGE ${event.round}周目 PUSH`, 5000, event.shoko ? "upper" : event.continued ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.shoko ? "SHOKO V" : event.continued ? "V STOCK" : "ST END", event.wins ? `Vストック ${event.wins}個` : "V獲得なし", event.continued ? "BONUSへ" : "RUSH終了", event.shoko ? "翔子成功・夢現JUDGEMENTの権利を獲得" : event.continued ? "獲得したVを順にDREAM BURSTへ" : "4セット＋αを駆け抜けて終了", event.shoko ? "hyper" : event.continued ? "hit" : "end", event.continued ? 100 : 0, "完走型ST結果");
          setSlotAtStatus({ visible: true, remaining: event.wins, remainingUnit: "V", total: event.cumulative });
          await waitForExperience(1000);
          continue;
        }

        if (event.kind === "aobuta-dream-burst") {
          setExperienceStage(3, event.super ? "SUPER DREAM BURST" : "DREAM BURST", `V ${event.vIndex} / ${event.vTotal}`, "PUSH", "ヒロインとボーナス枚数を開きます", "judge", 100, "枚数はPUSHまで非表示");
          await waitForExperienceAction(`青春DREAM BURST ${event.round}-${event.vIndex} PUSH`, 5000, event.super ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.super ? "超 青春DREAM BURST" : "青春DREAM BURST", event.hero, `+${yen.format(event.award)}枚`, `${eventGames}G相当・純増約8.0枚/G`, event.super ? "hyper" : "hit", 100, "ヒロイン乗せ結果");
          await waitForExperience(1000);
          const dreamComplete = await animateExperienceCounter(eventGames, "G", "BONUS", event.hero, "決定した払い出し枚数までBONUSを消化します", 100, `獲得 +${yen.format(event.award)}枚`, runId);
          if (!dreamComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: Math.max(0, event.vTotal - event.vIndex), remainingUnit: "V", total: event.cumulative });
          continue;
        }

        if (event.kind === "aobuta-upper-cz") {
          const upperCzComplete = await animateExperienceCounter(eventGames, "G", "MUGEN JUDGEMENT", event.label, "前半10G＋後半6G以上を進め、最後にPUSHします", event.chance, "成功期待度 約53%", runId);
          if (!upperCzComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "MUGEN FINAL JUDGE", event.label, "PUSH", "上位STの当落を開きます", "judge", event.chance, "10G＋6G＋α 最終結果");
          await waitForExperienceAction("夢現JUDGEMENT PUSH", 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "MUGEN SUCCESS" : "MUGEN END", event.success ? "フリーズ発生" : "夢現JUDGEMENT失敗", event.success ? "上位STへ" : "通常へ", event.success ? "エピソードBONUS 300枚を経て上位STへ" : "今回の一撃はここで終了", event.success ? "hyper" : "end", event.success ? 100 : 0, "上位CZ結果");
          await waitForExperience(1050);
          continue;
        }

        if (event.kind === "aobuta-upper-episode") {
          const episodeComplete = await animateExperienceCounter(eventGames, "G", "EPISODE BONUS", event.label, "300枚のエピソードBONUSを消化します", 100, `獲得 +${yen.format(event.award)}枚`, runId);
          if (!episodeComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "INFINITY ST", "青春ブタ野郎は∞の夢を見る", "上位ST", "約80%継続・BONUS平均約640枚", "hyper", 80, "設定2の公表値");
          await waitForExperience(1000);
          continue;
        }

        if (event.kind === "aobuta-upper-st") {
          const upperStComplete = await animateExperienceCounter(8, "G", "INFINITY ST", `上位ST ${event.loop}周目`, "ボーナス超高確率状態を最後まで消化します", event.chance, "継続期待度 約80%", runId);
          if (!upperStComplete) return;
          consumedGames += 8;
          setExperienceStage(3, "SUPER DREAM BURST", `上位ST ${event.loop}周目`, "PUSH", "上位BONUS枚数と継続結果を開きます", "judge", event.chance, "平均約640枚");
          await waitForExperienceAction(`上位ST ${event.loop}周目 PUSH`, 5000, event.continued ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.continued ? "INFINITY CONTINUE" : "INFINITY END", `+${yen.format(event.award)}枚`, event.continued ? "上位ST継続" : "上位ST終了", event.continued ? "次の8Gへ進みます" : "最後まで消化してRUSH終了", event.continued ? "hyper" : "end", event.continued ? 100 : 0, `上位ST ${event.loop}周目結果`);
          consumedGames += Math.max(0, eventGames - 8);
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.continued ? 8 : 0, remainingUnit: "G", total: event.cumulative });
          await waitForExperience(1100);
          continue;
        }

        if (event.kind === "kanokari-bonus") {
          const isEpisode = event.bonusType === "episode" || event.bonusType === "special-episode";
          const isBig = event.bonusType !== "reg";
          setExperienceStage(3, "BONUS JUDGE", `${event.chain}回目・${event.source}`, "PUSH", "疑似BONUSの種類を開きます", "judge", 100, "BONUS種別はPUSHまで非表示");
          await waitForExperienceAction(`かのかりBONUS ${event.chain}回目 PUSH`, 5000, event.specialEpisode ? "upper" : isBig ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.specialEpisode ? "SPECIAL EPISODE" : isEpisode ? "HEROINE EPISODE" : isBig ? "KANOKARI BONUS" : "REGULAR BONUS", event.label, `+${yen.format(event.award)}枚`, `${eventGames}G・純増約5.0枚/G`, event.specialEpisode ? "hyper" : "hit", 100, `${event.chain}回目 BONUS結果`);
          await waitForExperience(850);
          const bonusComplete = await animateExperienceCounter(eventGames, "G", event.label, "疑似BONUS消化", "小役・レア役で1GレンCHANCEと1G恋ストックを抽選します", 100, `獲得 ${yen.format(event.award)}枚`, runId);
          if (!bonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.normalStocks + event.loveStocks, remainingUnit: "個", addOn: event.normalGain + event.loveGain, addOnGames: null, total: event.cumulative });
          setExperienceStage(3, "STOCK RESULT", event.label, "PUSH", "BONUS中に獲得したストックを開きます", "judge", 100, `現在ストック ${event.normalStocks + event.loveStocks}個`);
          await waitForExperienceAction(`ストック結果 ${event.chain}回目 PUSH`, 5000, event.loveGain ? "upper" : event.normalGain ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "STOCK RESULT", event.loveGain ? "1G恋ストック獲得" : event.normalGain ? "1GレンCHANCE獲得" : "ストック獲得なし", `通常${event.normalGain}個・1G恋${event.loveGain}個`, `保有 通常${event.normalStocks}個／1G恋${event.loveStocks}個`, event.specialEpisode ? "ユメカノモード移行にも期待" : "保有ストックを順に消化します", event.loveGain ? "hyper" : event.normalGain ? "hit" : "end", event.loveGain || event.normalGain ? 100 : 0, "BONUS中ストック結果");
          await waitForExperience(900);
          continue;
        }

        if (event.kind === "kanokari-one-game") {
          const chanceComplete = await animateExperienceCounter(2, "G", event.love ? "ONE GAME LOVE" : "ONE GAME RENT CHANCE", `${event.label} ${event.attempt}回目`, event.love ? "1G恋はBONUS成功濃厚です" : "小役成立でBONUSを目指します", event.chance, event.forced ? "成功濃厚" : "成功期待度 約40%", runId);
          if (!chanceComplete) return;
          consumedGames += 2;
          setExperienceStage(3, "ONE GAME FINAL", event.label, "PUSH", "疑似BONUSの当落を開きます", "judge", event.chance, event.forced && !event.love ? "5連続失敗後・6回目成功濃厚" : "2G最終結果");
          await waitForExperienceAction(`${event.label} ${event.attempt}回目 PUSH`, 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "ONE GAME BONUS" : "ONE GAME END", event.success ? "BONUS当選！" : `${event.label}失敗`, event.success ? `${event.win}回目の成功` : "次のストックへ", event.success ? "次のPUSHでBONUS種類を開きます" : `保有 通常${event.normalStocks}個／1G恋${event.loveStocks}個`, event.success ? "hit" : "end", event.success ? 100 : 0, `${event.label}結果`);
          setSlotAtStatus({ visible: true, remaining: event.normalStocks + event.loveStocks, remainingUnit: "個", total: event.cumulative });
          await waitForExperience(event.success ? 850 : 1000);
          continue;
        }

        if (event.kind === "kanokari-all-love") {
          setExperienceStage(3, "STOCK CONVERSION", event.label, "PUSH", "成功濃厚へ変換するストック数を開きます", "judge", 100, "ALL 1G恋");
          await waitForExperienceAction("ALL 1G恋 PUSH", 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "ALL ONE GAME LOVE", "全ストックを1G恋へ", `${event.converted}個`, "次の1G恋から順にBONUSへつなぎます", "hyper", 100, "ストック変換結果");
          setSlotAtStatus({ visible: true, remaining: event.loveStocks, remainingUnit: "個", addOn: event.converted, total: event.cumulative });
          await waitForExperience(1000);
          continue;
        }

        if (event.kind === "kanokari-dream") {
          setExperienceStage(3, event.sClass ? "S CLASS TRIGGER" : "GOLD 7", event.source, "PUSH", "ななかりDREAMの上乗せゲーム数を開きます", "judge", 100, "ゲーム数はPUSHまで非表示");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.sClass ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.sClass ? "S NANAKARI DREAM" : "NANAKARI DREAM", event.label, `+${yen.format(event.addGames)}G`, "前半でゲーム数を上乗せ・後半はかのかりBONUSへ", event.sClass ? "hyper" : "hit", 100, "DREAM上乗せ結果");
          await waitForExperience(1050);
          const dreamComplete = await animateExperienceCounter(eventGames, "G", event.label, `+${yen.format(event.addGames)}G消化`, "純増約5.0枚/Gで獲得し、終了後にかのかりBONUSへ進みます", 100, `獲得 +${yen.format(event.award)}枚`, runId);
          if (!dreamComplete) return;
          consumedGames += eventGames;
          runningAddOnGames += event.addGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOn: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "kanokari-dream-time") {
          const dreamTimeComplete = await animateExperienceCounter(eventGames, "G", event.sClass ? "S DREAM TIME" : "DREAM TIME", event.label, "毎ゲーム1GレンCHANCEストックを抽選します", 100, "獲得数は最後のPUSHまで非表示", runId);
          if (!dreamTimeComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "DREAM TIME RESULT", event.label, "PUSH", "獲得したストック数を開きます", "judge", 100, "1G恋を1個含みます");
          await waitForExperienceAction(`${event.label} ストック PUSH`, 5000, event.sClass ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.sClass ? "S CLASS STOCK" : "DREAM STOCK", `${event.stocks}ストック獲得`, `通常${event.normalStocks}個・1G恋${event.loveStocks}個`, "ストック消化後はユメカノモードへ", event.sClass ? "hyper" : "hit", 100, "DREAM TIME結果");
          setSlotAtStatus({ visible: true, remaining: event.stocks, remainingUnit: "個", addOn: event.stocks, total: event.cumulative });
          await waitForExperience(1050);
          continue;
        }

        if (event.kind === "kanokari-return") {
          const returnComplete = await animateExperienceCounter(eventGames, "G", event.yumekano ? "YUMEKANO MODE" : "RETURN ZONE", `${event.label} ${event.attempt}回目`, "66G以内の疑似BONUS引き戻しを目指します", event.chance, `${event.yumekano ? "ユメカノ" : "通常"}期待度 約${Math.round(event.chance)}%`, runId);
          if (!returnComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "RETURN FINAL", event.label, "PUSH", "疑似BONUS引き戻しの当落を開きます", "judge", event.chance, "66G最終結果");
          await waitForExperienceAction(`${event.label} ${event.attempt}回目 PUSH`, 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "BONUS RETURN" : "BONUS LOOP END", event.success ? "引き戻し成功！" : "66G終了", event.success ? "疑似BONUSへ" : "通常へ", event.success ? "次のPUSHでBONUSまたはDREAMを開きます" : "今回のガチ恋ループは終了です", event.success ? "hit" : "end", event.success ? 100 : 0, `${event.label}結果`);
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, total: event.cumulative });
          await waitForExperience(event.success ? 900 : 1200);
          continue;
        }

        if (event.kind === "okidoki-bonus") {
          setExperienceStage(3, event.chain === 1 ? "FIRST BONUS" : `BONUS CHAIN ${event.chain}`, event.oneGame ? "1G連告知" : event.source, "PUSH", "BIGかREGか、今回のBONUSを開きます", "judge", 100, `${event.chain}連目・${event.mode}`);
          await waitForExperienceAction(`${event.chain}連目 BONUS PUSH`, 5000, event.bonusType === "BIG" ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.bonusType === "BIG" ? "BIG BONUS" : "REG BONUS", `${event.label} ${event.chain}連目`, `+${yen.format(event.award)}枚`, `${event.games}G・純増約3.0枚/G${event.oneGame ? "・1G連" : ""}`, event.bonusType === "BIG" ? "hit" : "rush", 100, `${event.source}・${event.mode}`);
          await waitForExperience(900);
          const bonusComplete = await animateExperienceCounter(eventGames, "G", event.bonusType === "BIG" ? "BIG BONUS" : "REG BONUS", `${event.chain}連目 BONUS消化`, "ハイビスカスと1G連告知に注目", 100, `獲得 ${yen.format(event.award)}枚`, runId);
          if (!bonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, total: event.cumulative });
          continue;
        }

        if (event.kind === "okidoki-zone") {
          const zoneComplete = await animateExperienceCounter(eventGames, "G", event.oneGame ? "1G REN" : "32G CHANCE", `${event.chain}連目 BONUS後`, event.gold ? "金色のハイビスカス点灯を待ちます" : event.guarantee ? "保証モードのハイビスカス点灯を待ちます" : "32G以内の再点灯を待ちます", event.chance, event.mode, runId);
          if (!zoneComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "32G FINAL JUDGE", event.mode, "PUSH", event.gold ? "金ドキBIGと次回天国以上を開きます" : event.guarantee ? "保証BONUSを開きます" : "ハイビスカス再点灯または連チャン終了を開きます", "judge", event.chance, event.source);
          await waitForExperienceAction(`${event.chain}連後 32G PUSH`, 5000, event.gold ? "upper" : event.continued ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.gold ? "GOLD MODE" : event.continued ? "HIBISCUS LIGHT" : "HEAVEN END", event.gold ? "金ドキモード" : event.continued ? "32G以内BONUS" : "32G終了", event.continued ? (event.oneGame ? "1G連" : `${eventGames}G`) : "通常へ", event.gold ? "BIG＋次回天国以上" : event.continued ? event.source : `今回の連チャンは${event.chain}連で終了`, event.gold ? "hyper" : event.continued ? "hit" : "end", event.continued ? 100 : 0, event.mode);
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          await waitForExperience(event.gold ? 1150 : 900);
          continue;
        }

        if (event.kind === "okidoki-god") {
          setExperienceStage(3, "GOD MODE", event.label, "BIG × 5", "BIG5連以上＋終了後の32G連へ", "hyper", 100, "GODテンパイ音");
          await waitForExperience(1250);
          continue;
        }

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

        if (event.kind === "assault-rush-start") {
          setExperienceStage(3, event.upper ? "ASSAULT LILY RUSH SUPER" : "ASSAULT LILY RUSH", event.label, `残り ${yen.format(event.remainingCoins)}枚`, event.upper ? "特化ゾーン性能が強化された上位ATを開始します" : "残り枚数を減らしながらボスヒュージ襲来を目指します", event.upper ? "hyper" : "rush", 100, event.upper ? "初期200枚＋α" : "初期150枚＋α");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", total: event.cumulative });
          await waitForExperience(event.upper ? 1200 : 950);
          continue;
        }

        if (event.kind === "assault-rush") {
          const rushComplete = await animateExperienceCounter(eventGames, "G", event.upper ? "RUSH SUPER" : "ASSAULT LILY RUSH", `区間 ${event.section}・残り${yen.format(event.remainingCoins + event.spentCoins)}枚`, "ターゲット役と規定ゲーム数からボスヒュージ襲来を抽選します", event.upper ? 72 : 56, `消化後 残り${yen.format(event.remainingCoins)}枚`, runId);
          if (!rushComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, event.upper ? "RUSH SUPER" : "DIFFERENCE COIN RUSH", event.label, `残り ${yen.format(event.remainingCoins)}枚`, event.remainingCoins > 0 ? "次のボスヒュージ襲来またはAT消化へ" : "残り枚数0・RUSH終了へ", event.upper ? "hyper" : event.remainingCoins > 0 ? "rush" : "end", event.remainingCoins > 0 ? 70 : 0, "差枚数管理AT");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", total: event.cumulative });
          await waitForExperience(650);
          continue;
        }

        if (event.kind === "assault-boss") {
          const bossComplete = await animateExperienceCounter(eventGames, "G", "BOSS HUGE ATTACK", event.label, "成立役で大型ヒュージ撃破を抽選し、最後にPUSHします", event.chance, event.upper ? "RUSH SUPER 強化バトル" : "4〜5GのAT中CZ", runId);
          if (!bossComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", total: event.cumulative });
          setExperienceStage(3, "BOSS HUGE JUDGE", `ボスヒュージ ${event.battle}戦目`, "PUSH", event.won ? "撃破報酬を開きます" : "勝利またはAT復帰を開きます", "judge", event.chance, `残り${yen.format(event.remainingCoins)}枚`);
          await waitForExperienceAction(`ボスヒュージ ${event.battle}戦目 PUSH`, 5000, event.won ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.won ? "BOSS HUGE DEFEATED" : "BATTLE END", event.won ? "大型ヒュージ撃破" : "ヒュージバトル敗北", event.won ? "報酬獲得" : "RUSHへ戻る", event.won ? "次のPUSHで上乗せ特化ゾーンを開きます" : `残り${yen.format(event.remainingCoins)}枚からATを再開`, event.won ? "hit" : "end", event.won ? 100 : 0, "ボスヒュージ襲来結果");
          await waitForExperience(event.won ? 850 : 700);
          continue;
        }

        if (event.kind === "assault-reward") {
          setExperienceStage(3, "REWARD JUDGE", `撃破報酬 ${event.rewardNumber}回目`, "PUSH", "上乗せ特化ゾーンと獲得枚数を開きます", "judge", 100, "報酬はPUSHまで非表示");
          await waitForExperienceAction(`撃破報酬 ${event.rewardNumber}回目 PUSH`, 5000, event.award >= 500 ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.rewardKey === "spiral" ? "ASSAULT SPIRAL" : event.rewardKey === "neunwelt" ? "NEUNWELT TACTICS" : "ADD-ON REWARD", event.label, `+${yen.format(event.award)}枚`, `${event.detail}・残り枚数へ加算`, event.award >= 500 ? "hyper" : "hit", 100, "上乗せ特化ゾーン結果");
          await waitForExperience(1000);
          const rewardComplete = await animateExperienceCounter(eventGames, "G", event.label, `+${yen.format(event.award)}枚`, event.detail, 100, `累計${yen.format(event.cumulative)}枚`, runId);
          if (!rewardComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.balanceBefore + event.award, remainingUnit: "枚", addOn: event.award, total: event.cumulative });
          continue;
        }

        if (event.kind === "assault-upper-cz") {
          const upperCzComplete = await animateExperienceCounter(eventGames, "G", "LAST BULLET JUDGEMENT", `${event.czType}・${event.attempt}回目`, "成立役でアサルトリリィRUSH SUPERを抽選します", event.chance, `${event.czType} 代表成功期待度`, runId);
          if (!upperCzComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "LAST BULLET JUDGE", event.czType, "PUSH", "RUSH SUPERの当落を開きます", "judge", event.chance, `${event.label} ${event.attempt}回目`);
          await waitForExperienceAction(`ラストバレット ${event.attempt}回目 PUSH`, 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "RUSH SUPER ENTRY" : "JUDGEMENT END", event.success ? "Edel Lilie・上位当選" : `${event.czType} 失敗`, event.success ? "初期200枚＋α" : "RUSHへ戻る", event.success ? "特化ゾーン性能を強化して上位AT開始" : "再獲得時は上位CZの種類昇格を抽選", event.success ? "hyper" : "end", event.success ? 100 : 0, "ラストバレットジャッジメント結果");
          await waitForExperience(event.success ? 1300 : 850);
          continue;
        }

        if (event.kind === "shin-eva-impact") {
          const impactComplete = await animateExperienceCounter(eventGames, "G", "EVANGELION IMPACT", event.source || "作戦決定", "3Gで今回の作戦を決定します", 100, "作戦はPUSHまで非表示", runId);
          if (!impactComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "OPERATION SELECT", "作戦を開け", "PUSH", "作戦名と必要進行段階を開きます", "judge", 100, "EVANGELION IMPACT結果");
          await waitForExperienceAction(`EVANGELION IMPACT ${event.operation} PUSH`, 5000, event.phases <= 2 ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "OPERATION ST", event.operation, `${event.phases}段階`, "10G＋α・作戦目やレア役で段階を進めます", event.phases <= 2 ? "hyper" : "rush", 72, "BONUS期待度 約72%");
          await waitForExperience(900);
          continue;
        }

        if (event.kind === "shin-eva-operation") {
          const operationComplete = await animateExperienceCounter(eventGames, "G", "OPERATION ST", `${event.label}・${event.phases}段階`, "進行するたびに10Gを再セットし、規定段階到達を目指します", 72, `${event.reachedPhases}/${event.phases}段階進行`, runId);
          if (!operationComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "OPERATION FINAL", event.label, "PUSH", "作戦成功・失敗を開きます", "judge", 72, `${event.phases}段階到達ジャッジ`);
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "OPERATION COMPLETE" : "OPERATION FAILED", event.success ? "作戦成功・BONUS確定" : "作戦失敗", event.success ? "BONUS" : "ST終了", event.success ? "BONUS種類を次のPUSHで開きます" : "三機殲滅ストックがあれば復帰します", event.success ? "hit" : "end", event.success ? 100 : 0, `${event.label}結果`);
          await waitForExperience(event.success ? 850 : 1050);
          continue;
        }

        if (event.kind === "shin-eva-bonus") {
          setExperienceStage(3, "BONUS JUDGE", `作戦成功 ${event.round}回目`, "PUSH", "BIG・SUPER BIG・SPECIALの種類を開きます", "judge", 100, "BONUS種別はPUSHまで非表示");
          await waitForExperienceAction(`シン・エヴァBONUS ${event.round}回目 PUSH`, 5000, event.bonusType === "special" ? "upper" : event.bonusType === "super" ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.bonusType === "special" ? "SPECIAL BONUS" : event.bonusType === "super" ? "SUPER BIG BONUS" : "BIG BONUS", event.label, `+${yen.format(event.award)}枚`, `${eventGames}G・純増約5.0枚/G`, event.bonusType === "special" ? "hyper" : "hit", 100, "BONUS結果");
          await waitForExperience(900);
          const bonusComplete = await animateExperienceCounter(eventGames, "G", event.label, "BONUS消化", "作戦進行ストック・Vストックを抽選します", 100, `進行${event.progressStocks}個・V${event.vStocks}個`, runId);
          if (!bonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, total: event.cumulative });
          if (event.progressStocks || event.vStocks) {
            setExperienceStage(3, "STOCK RESULT", event.label, `${event.progressStocks + event.vStocks}個`, `作戦進行${event.progressStocks}個・Vストック${event.vStocks}個`, "hit", 100, "BONUS中ストック結果");
            await waitForExperience(850);
          }
          continue;
        }

        if (event.kind === "shin-eva-gendo") {
          const gendoComplete = await animateExperienceCounter(eventGames, "G", "VS GENDO", event.label, "勝利で三機殲滅の権利を獲得します", 55, "4Gバトル", runId);
          if (!gendoComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "VS GENDO FINAL", event.label, "PUSH", "三機殲滅ストックの当落を開きます", "judge", 55, "バトル最終結果");
          await waitForExperienceAction("VSゲンドウ PUSH", 5000, event.won ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.won ? "THREE EVAS STOCK" : "VS GENDO END", event.won ? "ゲンドウ撃破" : "ゲンドウに敗北", event.won ? "三機殲滅" : "作戦STへ", event.won ? "作戦失敗時の進行ストック特化を獲得" : "BONUS後の作戦へ戻ります", event.won ? "hyper" : "end", event.won ? 100 : 0, "VSゲンドウ結果");
          await waitForExperience(950);
          continue;
        }

        if (event.kind === "shin-eva-sanki") {
          const sankiComplete = await animateExperienceCounter(eventGames, "G", "THREE EVAS", event.label, "毎ゲーム作戦進行ストックを抽選します", 100, "8G＋α 特化ゾーン", runId);
          if (!sankiComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "PROGRESS STOCK", event.label, "PUSH", "獲得した進行ストック数を開きます", "judge", 100, "ストック数はPUSHまで非表示");
          await waitForExperienceAction(`三機殲滅 ${event.number}回目 PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "THREE EVAS RESULT", "作戦進行ストック獲得", `${event.stocks}個`, "EVANGELION IMPACTから作戦STへ復帰します", "hyper", 100, "三機殲滅結果");
          await waitForExperience(1050);
          continue;
        }

        if (event.kind === "shin-eva-mari") {
          const mariComplete = await animateExperienceCounter(eventGames, "G", "MARI BEAST CHALLENGE", `${event.label} ${event.attempt}回目`, "10G以内にマリ獣化成功を目指します", event.chance, "成功期待度 約38%", runId);
          if (!mariComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "MARI FINAL JUDGE", event.label, "PUSH", "上位ST突入の当落を開きます", "judge", event.chance, "10G最終結果");
          await waitForExperienceAction(`マリ獣化 ${event.attempt}回目 PUSH`, 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "BEAST MODE" : "MARI CHALLENGE END", event.success ? "マリ獣化成功！" : "チャレンジ失敗", event.success ? "SUPER BIG" : "作戦STへ", event.success ? "SUPER BIG BONUS後、上位STへ進みます" : "通常の作戦ループへ戻ります", event.success ? "hyper" : "end", event.success ? 100 : 0, "マリ獣化結果");
          await waitForExperience(event.success ? 1200 : 950);
          continue;
        }

        if (event.kind === "shin-eva-upper-entry-bonus" || event.kind === "shin-eva-upper-bonus") {
          setExperienceStage(3, "SUPER BIG BONUS", event.kind === "shin-eva-upper-entry-bonus" ? "上位突入BONUS" : `上位 SET ${event.set} 報酬`, `+${yen.format(event.award)}枚`, "60G・純増約5.0枚/G", "hyper", 100, "上位BONUS");
          await waitForExperience(900);
          const upperBonusComplete = await animateExperienceCounter(eventGames, "G", "SUPER BIG BONUS", "上位BONUS消化", "終了後は20G＋αの上位STへ", 100, `累計${yen.format(event.cumulative)}枚`, runId);
          if (!upperBonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          continue;
        }

        if (event.kind === "shin-eva-upper-st") {
          const upperStComplete = await animateExperienceCounter(eventGames, "G", "OPFER TYPE ANNIHILATION", `${event.label} SET ${event.set}`, "20G＋αで8段階突破を目指します", event.chance, "継続期待度 約95%", runId);
          if (!upperStComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setExperienceStage(3, "UPPER ST FINAL", `SET ${event.set}・8段階ジャッジ`, "PUSH", "SUPER BIG当選・上位ST終了を開きます", "judge", event.chance, "上位ST最終結果");
          await waitForExperienceAction(`オップファー SET ${event.set} PUSH`, 5000, event.continued ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.continued ? "EIGHT PHASES COMPLETE" : "UPPER ST END", event.continued ? "8段階突破・SUPER BIG" : "20G＋α 消化終了", event.continued ? "BONUS" : "通常へ", event.continued ? "SUPER BIG BONUS後、次セットへ" : `${event.set}セットで上位ST終了`, event.continued ? "hyper" : "end", event.continued ? 100 : 0, "上位ST結果");
          await waitForExperience(event.continued ? 1050 : 1250);
          continue;
        }

        if (event.kind === "kaguya-bonus") {
          setExperienceStage(3, "BONUS JUDGE", `${event.chain}連目・${event.source}`, "PUSH", "REG・BIG・SUPER BIGの種類を開きます", "judge", 100, "BONUS種別はPUSHまで非表示");
          await waitForExperienceAction(`かぐやBONUS ${event.chain}回目 PUSH`, 5000, event.bonusType === "super" ? "upper" : event.bonusType === "big" ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.bonusType === "super" ? "SUPER BIG BONUS" : event.bonusType === "big" ? "BIG BONUS" : "REGULAR BONUS", event.label, `+${yen.format(event.award)}枚`, `${yen.format(event.games)}G・純増約9.0枚/G`, event.bonusType === "super" ? "hyper" : "hit", 100, `${event.chain}連目 BONUS結果`);
          await waitForExperience(900);
          const bonusComplete = await animateExperienceCounter(eventGames, "G", event.label, `${event.chain}連目 BONUS消化`, event.bonusType === "reg" ? "ベルナビ7回まで・1G連と引き戻しを抽選" : "成立役から1G連ストックを抽選します", event.oneGameChance, event.bonusType === "reg" ? "REGの1G連＋引き戻し目安" : "1G連期待度 約45%", runId);
          if (!bonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, total: event.cumulative });
          continue;
        }

        if (event.kind === "kaguya-special") {
          const specialComplete = await animateExperienceCounter(eventGames, "G", "ONE GAME STOCK ZONE", event.label, "成立役で次回BONUSストックを獲得します", 100, `特化ゾーン ${event.number}回目`, runId);
          if (!specialComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "STOCK RESULT", event.label, "PUSH", "獲得した1G連ストック数を開きます", "judge", 100, "ストック数はPUSHまで非表示");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.stocks >= 3 ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "BONUS STOCK", event.label, `${event.stocks}個`, "次のBONUS後から順に放出します", event.stocks >= 3 ? "hyper" : "hit", 100, "1G連ストック結果");
          await waitForExperience(950);
          continue;
        }

        if (event.kind === "kaguya-one-game") {
          setExperienceStage(3, "ONE GAME JUDGE", `${event.chain}連目 BONUS終了`, "PUSH", "1G連ストックの有無を開きます", "judge", event.chance, "BIG以上の1G連ジャッジ");
          await waitForExperienceAction(`1G連 ${event.chain}連目 PUSH`, 5000, "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "ONE GAME BONUS", "1G連 成功！", "NEXT BONUS", "次回はBIG以上が濃厚です", "hit", 100, "1G連結果");
          consumedGames += 1;
          await waitForExperience(850);
          continue;
        }

        if (event.kind === "kaguya-return") {
          const returnComplete = await animateExperienceCounter(eventGames, "G", "RETURN CHANCE", `${event.chain}連後・引き戻しチャンス`, "約100GでBIG以上の引き戻しを狙います", event.chance, event.late ? "5連目以降・期待度約50%" : "引き戻し期待度約25%", runId);
          if (!returnComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, total: event.cumulative });
          setExperienceStage(3, "RETURN FINAL JUDGE", "引き戻し最終結果", "PUSH", event.success ? "次回BONUSを開きます" : "引き戻し成功・終了を開きます", "judge", event.chance, `${eventGames}G消化`);
          await waitForExperienceAction(`引き戻し ${event.chain}連目 PUSH`, 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "BONUS RETURN" : "BONUS LOOP END", event.success ? "引き戻し成功！" : "100G 引き戻し終了", event.success ? "BIG以上" : "通常へ", event.success ? "次のBONUSへ進みます" : `${event.chain}連でBONUSループ終了`, event.success ? "hit" : "end", event.success ? 100 : 0, "引き戻し結果");
          await waitForExperience(event.success ? 900 : 1100);
          continue;
        }

        if (event.kind === "kaguya-marriage") {
          const marriageComplete = await animateExperienceCounter(32, "G", "MARRIAGE MODE", event.label, "32G以内のSUPER BIG BONUSを待ちます", 100, "SUPER BIG濃厚ゾーン", runId);
          if (!marriageComplete) return;
          consumedGames += 32;
          setExperienceStage(3, "MARRIAGE RESULT", "奇跡的相性 成立", "SUPER BIG", "終了後は約80%のBONUSループに期待", "hyper", 100, "マリアージュMODE結果");
          await waitForExperience(1200);
          continue;
        }

        if (event.kind === "kaguya-extra") {
          setExperienceStage(3, "EXTRA BONUS", `EXTRA SET ${event.set}`, "PUSH", "50Gまたは100Gの上乗せ結果を開きます", "judge", 100, "約80%ループで初期G数決定");
          await waitForExperienceAction(`EXTRA BONUS ${event.set}回目 PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "EXTRA GAME ADD", event.label, `+${yen.format(eventGames)}G`, `純増約9.0枚/G・+${yen.format(event.award)}枚`, "hyper", 100, `EXTRA SET ${event.set} 結果`);
          await waitForExperience(1050);
          const extraComplete = await animateExperienceCounter(eventGames, "G", "EXTRA BONUS", `EXTRA SET ${event.set} 消化`, "高純増BONUSを最後まで消化します", 80, `累計${yen.format(event.cumulative)}枚`, runId);
          if (!extraComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          continue;
        }

        if (event.kind === "dumbbell-at-start") {
          setExperienceStage(3, "DUMBBELL BONUS", event.label, `${yen.format(eventGames)}G＋α`, "純増約8.5枚/G・レア役チャンスからゲーム数上乗せを狙います", "rush", 100, "通常AT 初期30G");
          setSlotAtStatus({ visible: true, remaining: eventGames, addOnGames: runningAddOnGames, total: event.cumulative });
          await waitForExperience(950);
          continue;
        }

        if (event.kind === "dumbbell-game-add") {
          const rareComplete = await animateExperienceCounter(eventGames, "G", "RARE ROLE CHANCE", `レア役チャンス ${event.number}回目`, "2択成功・レア役から上乗せゲーム数を決定します", 100, "上乗せはPUSHまで非表示", runId);
          if (!rareComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "GAME ADD JUDGE", "レア役チャンス成功", "PUSH", "通常ATの上乗せゲーム数を開きます", "judge", 100, "20G以上の上乗せ");
          await waitForExperienceAction(`ゲーム数上乗せ ${event.number}回目 PUSH`, 5000, event.gameAdd >= 100 ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          runningAddOnGames += Number(event.gameAdd) || 0;
          setExperienceStage(3, "GAME ADD RESULT", "ゲーム数上乗せ！", `+${yen.format(event.gameAdd)}G`, `通常ATは合計${yen.format(event.remaining)}Gへ`, event.gameAdd >= 100 ? "hyper" : "hit", 100, `上乗せ ${event.number}回目`);
          setSlotAtStatus({ visible: true, remaining: event.remaining, addOnGames: runningAddOnGames, total: event.cumulative });
          await waitForExperience(event.gameAdd >= 100 ? 1200 : 900);
          continue;
        }

        if (event.kind === "dumbbell-at-run") {
          const atComplete = await animateExperienceCounter(eventGames, "G", "DUMBBELL BONUS", `${event.label} 消化`, "残りゲーム数を減らしながら上位CZの権利獲得を目指します", data.specialChance, "通常AT・純増約8.5枚/G", runId);
          if (!atComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: runningAddOnGames, total: event.cumulative });
          setExperienceStage(3, "DUMBBELL BONUS END", "通常AT終了", `+${yen.format(event.award)}枚`, `${yen.format(eventGames)}G消化・ゴールデンチャレンジ権利を確認します`, "rush", 100, "通常AT獲得結果");
          await waitForExperience(1000);
          continue;
        }

        if (event.kind === "dumbbell-golden-challenge") {
          const goldenComplete = await animateExperienceCounter(eventGames, "G", "GOLDEN CHALLENGE", `${event.label} ${event.attempt}回目`, "3G間の成立役でゴールデンタイムを抽選します", event.chance, "成功期待度 約56%", runId);
          if (!goldenComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "GOLDEN FINAL JUDGE", event.label, "PUSH", "ゴールデンタイムの当落を開きます", "judge", event.chance, "3G 最終結果");
          await waitForExperienceAction(`ゴールデンチャレンジ ${event.attempt}回目 PUSH`, 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "GOLDEN TIME ENTRY" : "GOLDEN CHALLENGE END", event.success ? "チャレンジ成功！" : "チャレンジ失敗", event.success ? "GOLDEN TIME" : "通常へ", event.success ? "5GのVストック特化ゾーンへ進みます" : "通常ATの獲得枚数で終了します", event.success ? "hyper" : "end", event.success ? 100 : 0, "ゴールデンチャレンジ結果");
          await waitForExperience(event.success ? 1100 : 1000);
          continue;
        }

        if (event.kind === "dumbbell-golden-time") {
          const goldenTimeComplete = await animateExperienceCounter(eventGames, "G", "GOLDEN TIME", `ゴールデンタイム ${event.visit}回目`, "毎ゲームVストック獲得を抽選します", 100, "平均Vストック 約4個", runId);
          if (!goldenTimeComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "V STOCK JUDGE", "ゴールデンタイム終了", "PUSH", "獲得したVストック数を開きます", "judge", 100, "ストック数はPUSHまで非表示");
          await waitForExperienceAction(`ゴールデンタイム ${event.visit}回目 PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "V STOCK RESULT", "Vストック獲得！", `${event.stocks}個`, "1個につき100枚以上・金肉BONUSへ", "hyper", 100, `ゴールデンタイム ${event.visit}回目結果`);
          await waitForExperience(1100);
          continue;
        }

        if (event.kind === "dumbbell-upper") {
          const stockDetail = Array.isArray(event.stockAwards) ? event.stockAwards.map(value => `${yen.format(value)}枚`).join("・") : `${yen.format(event.initialCoins)}枚`;
          setExperienceStage(3, "KINNIKU BONUS", `${event.label} SET ${event.set}`, "PUSH", "Vストックの差枚数と上乗せ結果を開きます", "judge", 100, "差枚数はPUSHまで非表示");
          await waitForExperienceAction(`金肉BONUS SET ${event.set} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "V STOCK OPEN", `${event.stockAwards?.length || 0}個のVストック`, `+${yen.format(event.initialCoins)}枚`, `${stockDetail}${event.coinAdd ? `・消化中上乗せ +${yen.format(event.coinAdd)}枚` : ""}`, "hyper", 100, "Vストック差枚数結果");
          await waitForExperience(1250);
          const upperComplete = await animateExperienceCounter(event.award, "枚", "KINNIKU BONUS", `SET ${event.set} 差枚数消化`, "純増約8.5枚/G・残り差枚数を消化します", 100, `約${yen.format(eventGames)}G相当`, runId, { countdown: true });
          if (!upperComplete) return;
          consumedGames += eventGames;
          runningAddOn += Number(event.coinAdd) || 0;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, remainingUnit: "枚", addOn: runningAddOn, addOnGames: null, total: event.cumulative });
          setExperienceStage(3, "KINNIKU BONUS END", `${event.label} SET ${event.set} 終了`, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚・引き戻しCZへ`, "hyper", 100, "金肉BONUS獲得結果");
          await waitForExperience(1100);
          continue;
        }

        if (event.kind === "dumbbell-rising") {
          const risingComplete = await animateExperienceCounter(eventGames, "G", "RISING UPPER CHALLENGE", `${event.label} ${event.attempt}回目`, "3G間の成立役でゴールデンタイム復帰を抽選します", event.chance, "成功期待度 約56%", runId);
          if (!risingComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "RISING FINAL JUDGE", event.label, "PUSH", "上位ループ継続の当落を開きます", "judge", event.chance, "3G 最終結果");
          await waitForExperienceAction(`ライジングアッパー ${event.attempt}回目 PUSH`, 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "GOLDEN TIME RETURN" : "KINNIKU BONUS END", event.success ? "引き戻し成功！" : "引き戻し失敗", event.success ? "GOLDEN TIME" : "通常へ", event.success ? "Vストック獲得から金肉BONUSをもう一度" : "金肉BONUSのループ終了", event.success ? "hyper" : "end", event.success ? 100 : 0, "ライジングアッパー結果");
          await waitForExperience(event.success ? 1050 : 1200);
          continue;
        }

        if (event.kind === "goblin-upper-entry") {
          setExperienceStage(3, "FREEZE", event.source || "AT初当り時", "ULTIMATE", "100G・純増約5.0枚/Gの上位ATへ直行します", "hyper", 100, "AT初当り時 約1/70");
          await waitForExperience(1300);
          continue;
        }

        if (event.kind === "goblin-set") {
          setExperienceStage(3, "GOBLIN SLAYER RUSH", `SET ${event.set}・${Math.round(event.loopMode)}%モード`, `${event.orbs} ORBS`, `オーブ3個×${event.orbGroups}回で最終継続率${event.continueRate}%`, "rush", event.continueRate, "100G＋α セットAT");
          await waitForExperience(800);
          const setComplete = await animateExperienceCounter(100, "G", "GOBLIN SLAYER RUSH", `SET ${event.set}・オーブを集めろ`, `ベル連・レア役・BAR狙いからオーブ${event.orbs}個を獲得`, event.continueRate, `最終継続率 ${event.continueRate}%`, runId);
          if (!setComplete) return;
          consumedGames += 100;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOnGames: event.orbGroups * 10, total: event.cumulative });
          continue;
        }

        if (event.kind === "goblin-bonus") {
          setExperienceStage(3, "BONUS JUDGE", "青BAR揃い", "PUSH", "ゴブリンスレイヤーBONUSとAT上乗せを開きます", "judge", 100, `BONUS ${event.number}回目`);
          await waitForExperienceAction(`ゴブリンスレイヤーBONUS ${event.number}回目 PUSH`, 5000, "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "GOBLIN SLAYER BONUS", event.label, `+${yen.format(event.bonusAward)}枚`, `20G消化後、ATゲーム数を+${event.gameAdd}G`, "hit", 100, "BONUS結果");
          await waitForExperience(1000);
          const bonusComplete = await animateExperienceCounter(20, "G", "GOBLIN SLAYER BONUS", "セットストックを狙え", `純増約2.7枚/G・終了後AT +${event.gameAdd}G`, 100, `BONUS獲得 約${event.bonusAward}枚`, runId);
          if (!bonusComplete) return;
          consumedGames += 20 + event.gameAdd;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.gameAdd, addOnGames: event.gameAdd, total: event.cumulative });
          continue;
        }

        if (event.kind === "goblin-judgement") {
          const judgeComplete = await animateExperienceCounter(5, "G", "JUDGEMENT", `${event.enemy}・SET ${event.set}`, "5Gの継続バトルを最後まで進めます", event.chance, `最終継続率 ${event.chance}%`, runId);
          if (!judgeComplete) return;
          consumedGames += 5;
          setExperienceStage(3, "JUDGEMENT", event.enemy, "PUSH", event.upperHit ? "撃破とULTIMATE LOOP当選を開きます" : "セット継続・敗北を開きます", "judge", event.chance, `SET ${event.set} 継続ジャッジ`);
          await waitForExperienceAction(`JUDGEMENT SET ${event.set} PUSH`, 5000, event.upperHit ? "upper" : event.continued ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.upperHit ? "ULTIMATE LOOP" : event.continued ? "GOBLIN SLAIN" : "RUSH END", event.upperHit ? "ゴブリンロード撃破" : event.continued ? `${event.enemy}撃破` : `${event.enemy}に敗北`, event.upperHit ? "上位突入" : event.continued ? "次セットへ" : "通常へ", event.upperHit ? "100G・実質約82%のULTIMATE LOOP開始" : event.continued ? "報酬ジャッジへ進みます" : `${event.set}セットでRUSH終了`, event.upperHit ? "hyper" : event.continued ? "hit" : "end", event.upperHit || event.continued ? 100 : 0, "JUDGEMENT結果");
          await waitForExperience(event.upperHit ? 1300 : 1000);
          continue;
        }

        if (event.kind === "goblin-reward") {
          setExperienceStage(3, "REWARD JUDGE", `SET ${event.set} 継続報酬`, "PUSH", "次セットへ持ち越す報酬を開きます", "judge", 100, "1G報酬ジャッジ");
          await waitForExperienceAction(`報酬ジャッジ SET ${event.set} PUSH`, 5000, event.reward === "大連撃モード" ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "RUSH REWARD", event.reward, "継続率UP", event.reward === "大連撃モード" ? "ベル・レア役で10%以上の継続率上乗せ" : "5G＋αで継続率を上乗せ", event.reward === "大連撃モード" ? "hyper" : "rush", 100, "報酬ジャッジ結果");
          await waitForExperience(950);
          continue;
        }

        if (event.kind === "goblin-upper-set") {
          const upperComplete = await animateExperienceCounter(100, "G", "ULTIMATE LOOP", `UPPER SET ${event.set}`, "純増約5.0枚/G・オーブなしの100G上位AT", 82, event.bonusAward ? `GS BONUS +${event.bonusAward}枚を含む` : "100G上位セット", runId);
          if (!upperComplete) return;
          consumedGames += 100 + (event.bonusAward ? 20 : 0);
          setExperienceStage(3, "ULTIMATE PAYOUT", `${event.label} SET ${event.set}`, `+${yen.format(event.award)}枚`, event.bonusAward ? `AT約${event.baseAward}枚＋BONUS約${event.bonusAward}枚` : "100Gを純増約5.0枚/Gで消化", "hyper", 100, "上位セット獲得結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, total: event.cumulative });
          await waitForExperience(1100);
          continue;
        }

        if (event.kind === "goblin-upper-judge") {
          const upperJudgeComplete = await animateExperienceCounter(5, "G", "ULTIMATE JUDGEMENT", `UPPER SET ${event.set}`, "実質約82%のセット継続を判定します", event.chance, "ULTIMATE LOOP 実質継続率", runId);
          if (!upperJudgeComplete) return;
          consumedGames += 5;
          setExperienceStage(3, "ULTIMATE JUDGEMENT", `UPPER SET ${event.set}`, "PUSH", "次の100GまたはRUSH終了を開きます", "judge", event.chance, "上位継続ジャッジ");
          await waitForExperienceAction(`ULTIMATE SET ${event.set} PUSH`, 5000, event.continued ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.continued ? "ULTIMATE CONTINUE" : "ULTIMATE END", event.continued ? "極限ループ継続" : "ULTIMATE LOOP終了", event.continued ? "NEXT 100G" : "通常へ", event.continued ? "次の上位セットへ進みます" : `${event.set}セットで上位AT終了`, event.continued ? "hyper" : "end", event.continued ? 100 : 0, "上位JUDGEMENT結果");
          await waitForExperience(event.continued ? 1000 : 1200);
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

        if (event.kind === "basilisk-bt-start") {
          setExperienceStage(3, "BASILISK TIME", `${event.label} 開始`, event.scenario, `12セットの継続シナリオ「${event.scenario}」を選択`, "rush", 100, event.grades);
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 12, remainingUnit: "SET", total: event.cumulative });
          await waitForExperience(950);
          continue;
        }

        if (event.kind === "basilisk-set") {
          const reminiscenceComplete = await animateExperienceCounter(10, "G", "TSUISOU NO TOKI", `追想の刻・SET ${event.set}`, event.high ? `絆玉${event.bondBalls}個・${event.highLabel}を準備` : "BCと絆玉を抽選します", event.high ? 100 : 34, event.high ? event.highLabel : "絆高確抽選", runId);
          if (!reminiscenceComplete) return;
          const battleComplete = await animateExperienceCounter(30, "G", event.high ? "KIZUNA KOUKAKU" : "SOUNIN NO TOKI", `争忍の刻・SET ${event.set}`, event.high ? `${event.highLabel}中・対応役でBCを狙います` : "甲賀十人と伊賀十人の争忍を進めます", event.chance, `${event.scenario}・継続ランク${event.rawGrade === "F" ? `F→${event.grade}` : event.grade}`, runId);
          if (!battleComplete) return;
          consumedGames += 40;
          setExperienceStage(3, "SOUNIN FINAL JUDGE", `SET ${event.set}・ランク${event.rawGrade === "F" ? `F→${event.grade}` : event.grade}`, "PUSH", event.btBc ? `${event.btBc.label}と次セット継続を開きます` : "甲賀勝利と次セット継続を開きます", "judge", event.chance, event.high ? event.highLabel : "争忍の刻 最終結果");
          await waitForExperienceAction(`争忍の刻 SET ${event.set} PUSH`, 5000, event.completed ? "upper" : event.continued ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          const resultValue = event.btBc ? `${event.btBc.label} +${yen.format(event.bcAward)}枚` : event.completed ? "12セット完走" : event.continued ? "甲賀勝利" : "伊賀勝利";
          setExperienceStage(3, event.completed ? "SCENARIO COMPLETE" : event.continued ? "KOGA WIN" : "IGA WIN", event.completed ? "シナリオ完走" : event.continued ? `SET ${event.set} 継続` : `SET ${event.set} 終了`, resultValue, event.completed ? "エンディングへ進みます" : event.continued ? `次の追想の刻へ・累計 ${yen.format(event.cumulative)}枚` : `BT終了・累計 ${yen.format(event.cumulative)}枚`, event.completed ? "hyper" : event.continued ? "hit" : "end", event.continued ? 100 : 0, "争忍の刻 結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: Math.max(0, 12 - event.set), remainingUnit: "SET", total: event.cumulative });
          await waitForExperience(event.completed ? 1250 : 950);
          continue;
        }

        if (event.kind === "basilisk-ending") {
          const endingComplete = await animateExperienceCounter(eventGames, "G", "ENDING", "来世邂逅", "12セット完走後のエンディングを消化します", 100, "終了後は宿怨チャレンジ確定", runId);
          if (!endingComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "ENDING COMPLETE", "エンディング完走", `+${yen.format(event.award)}枚`, "駿府城を経て宿怨チャレンジへ", "hyper", 100, "宿怨LOOP入口");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          await waitForExperience(1100);
          continue;
        }

        if (event.kind === "basilisk-grudge") {
          const grudgeComplete = await animateExperienceCounter(3, "回", "SHUKUEN CHALLENGE", event.label, "紫図柄を狙うカットイン3回で成功を目指します", event.chance, event.mandatory ? "エンディング後・BT確定" : "宿怨ポイントMAX", runId);
          if (!grudgeComplete) return;
          consumedGames += 3;
          setExperienceStage(3, "SHUKUEN FINAL JUDGE", event.label, "PUSH", "天膳BTまたは通常BTを開きます", "judge", event.chance, "失敗してもBT確定");
          await waitForExperienceAction("宿怨チャレンジ PUSH", 5000, event.success ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "SHUKUEN SUCCESS" : "SHUKUEN FAILED", event.success ? "紫図柄揃い" : "チャレンジ失敗", event.success ? "天膳BT" : "通常BT", event.success ? "激闘シナリオ・初回10人状態で開始" : "失敗時の恩恵で通常バジリスクタイムへ", event.success ? "hyper" : "rush", 100, "宿怨チャレンジ結果");
          await waitForExperience(1150);
          continue;
        }

        if (event.kind === "basilisk-tenzen-set") {
          const tenzenReminiscence = await animateExperienceCounter(10, "G", "TENZEN BT", `追想の刻・上位SET ${event.set}`, event.tenPeople ? "初回10人状態・完全勝利で月下閃滅" : "激闘シナリオの追想を進めます", event.chance, "継続ランクD代表80%", runId);
          if (!tenzenReminiscence) return;
          const tenzenBattle = await animateExperienceCounter(30, "G", event.tenPeople ? "10 PEOPLE BATTLE" : "TENZEN SOUNIN", `争忍の刻・上位SET ${event.set}`, event.tenPeople ? "10人状態を維持して完全勝利を狙います" : "天膳BTの争忍を最後まで進めます", event.chance, event.moon ? "月下閃滅チャンス" : "激闘シナリオ", runId);
          if (!tenzenBattle) return;
          consumedGames += 40;
          setExperienceStage(3, "TENZEN FINAL JUDGE", `天膳BT SET ${event.set}`, "PUSH", event.moon ? "完全勝利と月下閃滅のストック数を開きます" : "次セットへの継続を開きます", "judge", event.chance, event.tenPeople ? "初回10人状態" : "天膳BT継続判定");
          await waitForExperienceAction(`天膳BT SET ${event.set} PUSH`, 5000, event.moon ? "upper" : event.continued ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          const tenzenValue = event.moon ? `月下閃滅 ${event.moonStocks}ストック` : event.continued ? "BT継続" : "BT終了";
          setExperienceStage(3, event.moon ? "GEKKA SENMETSU" : event.continued ? "TENZEN CONTINUE" : "TENZEN END", event.moon ? "10人完全勝利" : `天膳BT SET ${event.set}`, tenzenValue, event.moon ? `ストック分を含め累計 ${yen.format(event.cumulative)}枚` : event.continued ? "次の上位セットへ進みます" : `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, event.moon ? "hyper" : event.continued ? "rush" : "end", event.continued || event.moon ? 100 : 0, "天膳BT結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.continued ? 1 : 0, remainingUnit: "SET", total: event.cumulative });
          await waitForExperience(event.moon ? 1400 : 1050);
          continue;
        }

        if (event.kind === "basilisk-fallback") {
          const fallbackComplete = await animateExperienceCounter(eventGames, "G", "BASILISK TIME", event.label, "宿怨失敗の恩恵で通常BTを1セット消化します", 100, "宿怨チャレンジ失敗時もBT確定", runId);
          if (!fallbackComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "BASILISK TIME END", event.label, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, "rush", 100, "通常BT獲得結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          await waitForExperience(1000);
          continue;
        }

        if (event.kind === "lycoris-prologue") {
          const prologueComplete = await animateExperienceCounter(eventGames, "G", "PROLOGUE", event.label, "約100枚を獲得しながら今回のRUSHタイプを決定します", 100, `${event.route}・${event.talent}`, runId);
          if (!prologueComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "RUSH ROUTE", event.route, `+${yen.format(event.award)}枚`, `${event.talent}・リコリスラッシュ20へ`, "rush", 100, "RUSHタイプ 1:1");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 20, remainingUnit: "G", total: event.cumulative });
          await waitForExperience(1000);
          continue;
        }

        if (event.kind === "lycoris-rush20") {
          const rush20Complete = await animateExperienceCounter(20, "G", "LYCORIS RUSH 20", event.route, "20G以内のBONUS当選を目指します", event.chance, `${event.talent}・BONUS期待度約60%`, runId);
          if (!rush20Complete) return;
          consumedGames += 20;
          setSlotAtStatus({ visible: true, remaining: 0, remainingUnit: "G", total: event.cumulative });
          setExperienceStage(3, "RUSH 20 FINAL", event.label, "PUSH", "BONUS当選とRUSH50突入の結果を開きます", "judge", event.chance, "20G最終結果");
          await waitForExperienceAction("リコリスラッシュ20 PUSH", 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "BONUS HIT" : "RUSH 20 END", event.success ? "BONUS当選" : "20G駆け抜け", event.success ? "RUSH50へ" : "通常へ", event.success ? "次のPUSHでBONUSの種類を開きます" : `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, event.success ? "hit" : "end", event.success ? 100 : 0, "リコリスラッシュ20結果");
          await waitForExperience(event.success ? 900 : 1150);
          continue;
        }

        if (event.kind === "lycoris-front" || event.kind === "lycoris-upper-front") {
          const upperMode = event.kind === "lycoris-upper-front";
          const frontComplete = await animateExperienceCounter(eventGames, "G", upperMode ? "LYCORIS RUSH W" : "LYCORIS RUSH 50", upperMode ? `上位 SET ${event.section}・前半` : "前半50G", upperMode ? "チェリー・スイカ才能Lv2でW以上のBONUSを狙います" : "BONUS確率約1/18・残りゲーム数を減らします", 100, `残り ${yen.format(event.remaining)}G`, runId);
          if (!frontComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remaining, remainingUnit: "G", total: event.cumulative });
          continue;
        }

        if (event.kind === "lycoris-bonus") {
          setExperienceStage(3, event.upper ? "UPPER BONUS JUDGE" : "BONUS JUDGE", `${event.number}回目・${event.source}`, "PUSH", "4種類からBONUSと獲得ポイントを開きます", "judge", 100, "BONUS種別はPUSHまで非表示");
          await waitForExperienceAction(`リコリスBONUS ${event.number} PUSH`, 5000, event.upper || event.award >= 300 ? "upper" : event.award >= 200 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.upper ? "LYCORIS BONUS W+" : "LYCORIS BONUS", event.label, `+${yen.format(event.award)}枚`, `+${yen.format(event.points)}pt・累計${yen.format(Math.min(1000, event.totalPoints))}pt`, event.upper || event.award >= 300 ? "hyper" : "hit", 100, `${event.source} BONUS結果`);
          await waitForExperience(1000);
          const bonusComplete = await animateExperienceCounter(eventGames, "G", event.label, `${event.number}回目 BONUS消化`, "純増約8.4枚/Gで獲得枚数を加算します", 100, `獲得 ${yen.format(event.award)}枚`, runId);
          if (!bonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, remainingUnit: "G", addOn: event.points, total: event.cumulative });
          continue;
        }

        if (event.kind === "lycoris-st" || event.kind === "lycoris-upper-st") {
          const upperMode = event.kind === "lycoris-upper-st";
          const stComplete = await animateExperienceCounter(10, "G", upperMode ? "LYCORIS RUSH W ST" : "LYCORIS RUSH 50 ST", upperMode ? `上位 SET ${event.section}・ST ${event.reset}` : `ST ${event.reset}回目`, upperMode ? "BONUS確率約1/9・当選で10G再セット" : "BONUS確率約1/12・当選で10G再セット", event.chance, "残り0Gで最終PUSH", runId);
          if (!stComplete) return;
          consumedGames += 10;
          setExperienceStage(3, "ST FINAL JUDGE", upperMode ? `上位ST ${event.reset}回目` : `ST ${event.reset}回目`, "PUSH", "BONUS当選またはRUSH終了を開きます", "judge", event.chance, "10G ST最終結果");
          await waitForExperienceAction(`${upperMode ? "上位" : "通常"}ST ${event.reset} PUSH`, 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "ST RESET" : "RUSH END", event.success ? "BONUS当選" : "10G駆け抜け", event.success ? "10G再セット" : "RUSH終了", event.success ? "BONUS消化後、STを10Gに戻します" : `累計 ${yen.format(event.cumulative)}枚`, event.success ? "hit" : "end", event.success ? 100 : 0, `${upperMode ? "上位" : "通常"}ST結果`);
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.success ? 10 : 0, remainingUnit: "G", total: event.cumulative });
          await waitForExperience(event.success ? 900 : 1100);
          continue;
        }

        if (event.kind === "lycoris-upper-cz") {
          const upperCzComplete = await animateExperienceCounter(eventGames, "G", "MAJIMA BATTLE", event.label, "1000pt到達後の上位CZを最後まで進めます", event.chance, "成功期待度 約70%", runId);
          if (!upperCzComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "UPPER CZ FINAL", event.label, "PUSH", "リコリスラッシュWの当落を開きます", "judge", event.chance, "10G 上位CZ最終結果");
          await waitForExperienceAction("真島バトル PUSH", 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "RUSH W ENTRY" : "MAJIMA BATTLE END", event.success ? "真島撃破" : "真島バトル敗北", event.success ? "上位RUSH" : "通常へ", event.success ? "前半50G＋後半ST10Gの上位へ進みます" : `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, event.success ? "hyper" : "end", event.success ? 100 : 0, "真島バトル結果");
          await waitForExperience(event.success ? 1300 : 1050);
          continue;
        }

        if (event.kind === "lycoris-legendary") {
          const legendaryComplete = await animateExperienceCounter(eventGames, "G", "LEGENDARY LYCORIS", event.label, "7G＋αの特化ゾーンを進めます", 100, "平均上乗せ約1000枚", runId);
          if (!legendaryComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "LEGENDARY RESULT", event.label, "PUSH", "上乗せ枚数を開きます", "judge", 100, "レジェンダリーリコリス結果");
          await waitForExperienceAction("レジェンダリーリコリス PUSH", 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "LEGENDARY LYCORIS", event.label, `+${yen.format(event.award)}枚`, "リコリスラッシュWへ進みます", "hyper", 100, "特化ゾーン上乗せ結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 50, remainingUnit: "G", addOn: event.award, total: event.cumulative });
          await waitForExperience(1400);
          continue;
        }

        if (event.kind === "lycoris-upper-reset") {
          setExperienceStage(3, "RAINBOW POINT JUDGE", `上位 SET ${event.section} 終了`, "PUSH", "1000pt再到達による上位再セットを開きます", "judge", event.success ? 100 : 0, `獲得 ${yen.format(event.points)}pt`);
          await waitForExperienceAction(`上位 SET ${event.section} 再セット PUSH`, 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "RUSH W RESET" : "RUSH W END", event.success ? "虹MAX・上位再セット" : "上位RUSH終了", event.success ? "NEXT SET" : "通常へ", event.success ? "CZを挟まず前半50Gへ戻ります" : `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, event.success ? "hyper" : "end", event.success ? 100 : 0, "上位ポイント結果");
          setSlotAtStatus({ visible: true, remaining: event.success ? 50 : 0, remainingUnit: "G", total: event.cumulative });
          await waitForExperience(event.success ? 1250 : 1100);
          continue;
        }

        if (event.kind === "symphogear-initial") {
          setExperienceStage(3, "INITIAL GAME JUDGE", event.label, "PUSH", event.upper ? "ギアフラグと絶唱を開きます" : "初期ゲーム数を開きます", "judge", 100, "1G 初期ゲーム数決定");
          await waitForExperienceAction("初期ゲーム数 PUSH", 5000, event.upper || event.initialGames >= 100 ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.upper ? "GEAR FLAG" : "AXZ RUSH START", event.route, event.upper ? "絶唱" : `${yen.format(event.initialGames)}G`, event.upper ? "5G＋αの絶唱へ進みます" : "純増約2.8枚/GのAXZラッシュ開始", event.upper ? "hyper" : "rush", 100, "わたしは歌でぶん殴るッ！結果");
          setSlotAtStatus({ visible: true, remaining: event.initialGames, remainingUnit: "G", addOnGames: runningAddOnGames, total: event.cumulative });
          await waitForExperience(event.upper ? 1250 : 950);
          continue;
        }

        if (event.kind === "symphogear-at-run") {
          const runComplete = await animateExperienceCounter(eventGames, "G", "AXZ RUSH", `${event.section}区間目・残り${yen.format(event.remainingGames + eventGames)}G`, "残りゲーム数を減らし、規定獲得枚数のギアVチャンスを狙います", 100, `獲得 ${yen.format(event.earnedCoins)}枚`, runId);
          if (!runComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingGames, remainingUnit: "G", addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "symphogear-gear-v-chance") {
          const chanceComplete = await animateExperienceCounter(eventGames, "G", "GEAR V CHANCE", `${event.character}を獲得せよ`, "5Gの装者獲得ゾーンを進め、最後のPUSHで結果を開きます", event.chance, `${event.attempt}回目・獲得${event.acquired}/5`, runId);
          if (!chanceComplete) return;
          consumedGames += eventGames;
          setSlotAtStatus({ visible: true, remaining: event.remainingGames, remainingUnit: "G", addOnGames: runningAddOnGames, total: event.cumulative });
          setExperienceStage(3, "GEAR V FINAL JUDGE", `${event.character} ジャッジ`, "PUSH", "装者獲得の当落を開きます", "judge", event.chance, `ギアVチャンス ${event.attempt}回目`);
          await waitForExperienceAction(`ギアVチャンス ${event.attempt} PUSH`, 5000, event.won ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.won ? "GEAR GET" : "GEAR MISS", event.won ? `${event.character} 獲得` : `${event.character} 非獲得`, event.won ? "ギアVアタック" : "AXZラッシュへ", event.won ? "キャラ固有の上乗せ結果を次のPUSHで開きます" : `獲得装者 ${event.acquired}/5`, event.won ? "hit" : "end", event.won ? 100 : 0, "装者獲得結果");
          await waitForExperience(900);
          continue;
        }

        if (event.kind === "symphogear-gear-v-attack") {
          setExperienceStage(3, "GEAR V ATTACK", event.label, "PUSH", "キャラ固有のゲーム数上乗せを開きます", "judge", 100, `ギアVアタック ${event.attack}回目`);
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.addGames >= 100 ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          runningAddOnGames += Number(event.addGames) || 0;
          setExperienceStage(3, "GEAR V ATTACK RESULT", event.character, `+${yen.format(event.addGames)}G`, `残り${yen.format(event.remainingGames)}G・上乗せ累計${yen.format(runningAddOnGames)}G`, event.addGames >= 100 ? "hyper" : "hit", 100, "上乗せゲーム数結果");
          setSlotAtStatus({ visible: true, remaining: event.remainingGames, remainingUnit: "G", addOnGames: runningAddOnGames, total: event.cumulative });
          await waitForExperience(event.addGames >= 100 ? 1300 : 1000);
          continue;
        }

        if (event.kind === "symphogear-ex") {
          const exComplete = await animateExperienceCounter(eventGames, "G", "GEAR V ATTACK EX", "5装者集結・激唱ギアVチャンス", "10GのEX区間を進め、最後のPUSHで上乗せを開きます", 100, "全5装者獲得報酬", runId);
          if (!exComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "EX FINAL JUDGE", event.label, "PUSH", "EX上乗せゲーム数を開きます", "judge", 100, "ギアVアタック EX");
          await waitForExperienceAction("ギアVアタック EX PUSH", 5000, "upper");
          if (runId !== experienceRunId) return;
          runningAddOnGames += Number(event.addGames) || 0;
          setExperienceStage(3, "EXTRA GEAR RESULT", "激唱ギアVチャンス", `+${yen.format(event.addGames)}G`, `残り${yen.format(event.remainingGames)}G・上乗せ累計${yen.format(runningAddOnGames)}G`, "hyper", 100, "EX上乗せ結果");
          setSlotAtStatus({ visible: true, remaining: event.remainingGames, remainingUnit: "G", addOnGames: runningAddOnGames, total: event.cumulative });
          await waitForExperience(1350);
          continue;
        }

        if (event.kind === "symphogear-upper-promote") {
          setExperienceStage(3, "UPPER ROUTE JUDGE", event.label, "PUSH", event.coins >= 2500 ? "2500枚到達・上位移行を確定します" : "絶唱・上位ATへの移行結果を開きます", "judge", event.chance, event.label === "ギアフラグ" ? "ギアフラグ成立" : `${yen.format(event.coins)}枚到達時抽選`);
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "UPPER ROUTE HIT" : "UPPER ROUTE MISS", event.success ? "絶唱突入" : "上位移行非当選", event.success ? "AXZラッシュ 黄金へ" : "AXZラッシュ継続", event.success ? "5G＋αの絶唱で初期ゲーム数を決めます" : "通常ATの残りゲーム数へ戻ります", event.success ? "hyper" : "end", event.success ? 100 : 0, "上位移行抽選結果");
          await waitForExperience(event.success ? 1200 : 850);
          continue;
        }

        if (event.kind === "symphogear-zessho" || event.kind === "symphogear-golden-zessho") {
          const golden = event.kind === "symphogear-golden-zessho";
          const zesshoComplete = await animateExperienceCounter(eventGames, "G", golden ? "GOLDEN ZESSHO" : "ZESSHO", event.label, golden ? "平均約360Gの黄金絶唱を進めます" : "毎ゲーム10G以上・平均約100Gの上乗せを進めます", 100, event.source, runId);
          if (!zesshoComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, golden ? "GOLDEN ZESSHO RESULT" : "ZESSHO RESULT", event.label, "PUSH", "上乗せゲーム数を開きます", "judge", 100, golden ? "平均約360G" : "平均約100G");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          runningAddOnGames += Number(event.addGames) || 0;
          setExperienceStage(3, golden ? "GOLDEN ZESSHO" : "ZESSHO", event.label, `+${yen.format(event.addGames)}G`, "AXZラッシュ黄金を開始します", "hyper", 100, `${event.label} 上乗せ結果`);
          setSlotAtStatus({ visible: true, remaining: event.addGames, remainingUnit: "G", addOnGames: runningAddOnGames, total: event.cumulative });
          await waitForExperience(golden ? 1450 : 1250);
          continue;
        }

        if (event.kind === "symphogear-upper-run") {
          const upperComplete = await animateExperienceCounter(eventGames, "G", "AXZ RUSH GOLDEN", `黄金AT ${event.section}区間目`, "純増約5.0枚/G・AXZ目から上乗せとBONUSを狙います", 100, `残り${yen.format(event.remainingGames)}G`, runId);
          if (!upperComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingGames, remainingUnit: "G", addOnGames: runningAddOnGames, total: event.cumulative });
          continue;
        }

        if (event.kind === "symphogear-upper-add") {
          setExperienceStage(3, "AXZ MARK", event.label, "PUSH", "黄金ATのゲーム数上乗せを開きます", "judge", 100, `黄金AT ${event.section}区間目`);
          await waitForExperienceAction("AXZ目 上乗せPUSH", 5000, event.addGames >= 100 ? "upper" : "gold");
          if (runId !== experienceRunId) return;
          runningAddOnGames += Number(event.addGames) || 0;
          setExperienceStage(3, "GOLDEN ADD ON", event.label, `+${yen.format(event.addGames)}G`, `黄金AT残り${yen.format(event.remainingGames)}G`, event.addGames >= 100 ? "hyper" : "hit", 100, "黄金AT上乗せ結果");
          setSlotAtStatus({ visible: true, remaining: event.remainingGames, remainingUnit: "G", addOnGames: runningAddOnGames, total: event.cumulative });
          await waitForExperience(event.addGames >= 100 ? 1250 : 950);
          continue;
        }

        if (event.kind === "symphogear-bonus") {
          setExperienceStage(3, "SYMPHOGEAR BONUS", `${event.number}回目 BONUS`, "PUSH", "BONUSゲーム数と獲得枚数を開きます", "judge", 100, `黄金AT ${event.section}区間目`);
          await waitForExperienceAction(`シンフォギアBONUS ${event.number} PUSH`, 5000, "gold");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "BONUS RESULT", event.label, `${yen.format(event.games)}G / +${yen.format(event.award)}枚`, "消化後はAXZラッシュ黄金へ戻ります", "hit", 100, "シンフォギアBONUS結果");
          await waitForExperience(950);
          const bonusComplete = await animateExperienceCounter(eventGames, "G", "SYMPHOGEAR BONUS", `${event.number}回目 BONUS消化`, "純増約5.0枚/GでBONUSを消化します", 100, `獲得 ${yen.format(event.award)}枚`, runId);
          if (!bonusComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          continue;
        }

        if (event.kind === "symphogear-zessho-battle") {
          const battleComplete = await animateExperienceCounter(eventGames, "G", "ZESSHO BATTLE", `${event.attempt}回目 絶唱バトル`, "5Gのバトルを最後まで進め、PUSHで勝敗を開きます", event.chance, "勝利期待度 約60%", runId);
          if (!battleComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "ZESSHO FINAL JUDGE", `${event.attempt}回目 最終決戦`, "PUSH", "絶唱・黄金AT復帰の当落を開きます", "judge", event.chance, `現在${event.wins}勝`);
          await waitForExperienceAction(`絶唱バトル ${event.attempt} PUSH`, 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "ZESSHO BATTLE WIN" : "GOLDEN RUSH END", event.success ? "絶唱バトル勝利" : "絶唱バトル敗北", event.success ? "絶唱へ" : "RUSH終了", event.success ? "絶唱または黄金絶唱で上位ATへ復帰します" : `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, event.success ? "hyper" : "end", event.success ? 100 : 0, "絶唱バトル結果");
          await waitForExperience(event.success ? 1200 : 1100);
          continue;
        }

        if (event.kind === "sao2-at-start") {
          setExperienceStage(3, "BULLET OF BULLETS", event.label, `初期 ${yen.format(event.award)}枚`, "20G周期でスナイパーチャンスを狙います", "rush", 100, "純増約3.6枚/G");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", total: event.cumulative });
          await waitForExperience(950);
          continue;
        }

        if (event.kind === "sao2-at-run") {
          const atComplete = await animateExperienceCounter(eventGames, "G", "BULLET OF BULLETS", `${event.interval}回目の20G周期`, "液晶ゲーム数を進め、スナイパーチャンスを目指します", 100, `残り差枚 ${yen.format(event.remainingCoins)}枚`, runId);
          if (!atComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", total: event.cumulative });
          continue;
        }

        if (event.kind === "sao2-sniper") {
          const sniperComplete = await animateExperienceCounter(eventGames, "G", "SNIPER CHANCE", `VS ${event.opponent}`, "バトルを最後まで進め、PUSHで勝敗を開きます", event.chance, `勝利期待度 約${Math.round(event.chance)}%`, runId);
          if (!sniperComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "SNIPER FINAL JUDGE", `VS ${event.opponent}`, "PUSH", event.upperRight ? "勝利すればデス・ガンバトル権利獲得" : "スナイパーチャンスの勝敗を開きます", "judge", event.chance, `${event.attempt}回目・現在${event.wins}勝`);
          await waitForExperienceAction(`スナイパーチャンス ${event.attempt} PUSH`, 5000, event.upperRight ? "upper" : event.won ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.won ? "SNIPER WIN" : "SNIPER LOSE", event.won ? `${event.opponent}撃破` : `${event.opponent}に敗北`, event.won ? `+${yen.format(event.reward)}枚` : "上乗せなし", event.upperRight ? "デス・ガンバトル権利獲得" : event.won ? `通算${event.wins}勝・BoBへ戻ります` : "BoBへ戻ります", event.won ? "hit" : "end", event.won ? 100 : 0, "スナイパーチャンス結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", total: event.cumulative });
          await waitForExperience(1050);
          continue;
        }

        if (event.kind === "sao2-last-attack") {
          const lastComplete = await animateExperienceCounter(eventGames, "G", "LAST ATTACK", event.label, "5Gでスナイパーチャンス復帰を目指します", event.chance, `成功期待度 約${Math.round(event.chance)}%`, runId);
          if (!lastComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "LAST ATTACK FINAL", event.label, "PUSH", "スナイパーチャンス復帰の当落を開きます", "judge", event.chance, "5G 最終結果");
          await waitForExperienceAction("ラストアタック PUSH", 5000, event.success ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "LAST ATTACK SUCCESS" : "LAST ATTACK FAILED", event.success ? "復帰成功" : "BoB終了", event.success ? "スナイパーチャンス" : "通常へ", event.success ? "最後の対戦相手を開きます" : `累計 ${yen.format(event.cumulative)}枚`, event.success ? "hit" : "end", event.success ? 100 : 0, "ラストアタック結果");
          await waitForExperience(1000);
          continue;
        }

        if (event.kind === "sao2-death-gun") {
          const battleComplete = await animateExperienceCounter(Math.max(1, eventGames - 1), "G", "DEATH GUN BATTLE", event.ultima ? "アルティマ状態・VS デス・ガン" : "VS デス・ガン", "4Gのバトルを進め、最終1GのPUSHで決着します", event.chance, `勝利期待度 約${Math.round(event.chance)}%`, runId);
          if (!battleComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "DEATH GUN FINAL", "最終1G・決着", "PUSH", "FULL DIVEの当落を開きます", "judge", event.chance, `${event.attempt}回目 デス・ガンバトル`);
          await waitForExperienceAction(`デス・ガンバトル ${event.attempt} PUSH`, 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "DEATH GUN DEFEATED" : "BATTLE LOST", event.success ? "デス・ガン撃破" : "デス・ガンに敗北", event.success ? "FULL DIVE" : "RUSH終了", event.success ? "純増約7.2枚/Gの上位ATへ" : `累計 ${yen.format(event.cumulative)}枚`, event.success ? "hyper" : "end", event.success ? 100 : 0, "デス・ガンバトル結果");
          await waitForExperience(1150);
          continue;
        }

        if (event.kind === "sao2-zekken") {
          setExperienceStage(3, "ZEKKEN JUDGE", "絶剣", "PUSH", "1G完結の獲得差枚を開きます", "judge", 100, "上位突入時のプレミアム報酬");
          await waitForExperienceAction("絶剣 PUSH", 5000, "upper");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, "MOTHER'S ROSARIO", "絶剣", `+${yen.format(event.award)}枚`, "アルティマ状態でFULL DIVEへ", "hyper", 100, "初期2200枚＋α");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          await waitForExperience(1400);
          continue;
        }

        if (event.kind === "sao2-upper") {
          const upperComplete = await animateExperienceCounter(eventGames, "G", "FULL DIVE", `${event.section}区間目・${yen.format(event.award)}枚`, "純増約7.2枚/Gで上位差枚を消化します", 100, event.ultima ? "アルティマ状態" : "上位AT", runId);
          if (!upperComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "FULL DIVE RESULT", event.label, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚・次のデス・ガンバトルへ`, "hyper", 100, `${event.section}区間目 獲得結果`);
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          await waitForExperience(1100);
          continue;
        }

        if (event.kind === "tokyo-ghoul-start") {
          setExperienceStage(3, "TOKYO GHOUL KOU", event.label, `初期 ${yen.format(event.award)}枚`, `${event.cz}突破・差枚数AT開始`, "rush", 100, "純増約4.0枚/G");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", total: event.cumulative });
          await waitForExperience(900);
          continue;
        }

        if (event.kind === "tokyo-ghoul-segment") {
          const segmentComplete = await animateExperienceCounter(eventGames, "G", "TOKYO GHOUL KOU", `${event.section}区間目・差枚AT消化`, "喰種対決の発展契機を待ちます", 50, `残り差枚 ${yen.format(event.remainingCoins)}枚`, runId);
          if (!segmentComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", total: event.cumulative });
          continue;
        }

        if (event.kind === "tokyo-ghoul-battle") {
          const battleComplete = await animateExperienceCounter(4, "G", event.arima ? "ARIMA BATTLE" : "GHOUL BATTLE", `VS ${event.opponent}・${event.battle}戦目`, "4Gの対決を最後まで進めます", event.chance, `勝利期待度 約${Math.round(event.chance)}%`, runId);
          if (!battleComplete) return;
          consumedGames += 4;
          setExperienceStage(3, event.arima ? "ARIMA FINAL JUDGE" : "BATTLE FINAL JUDGE", `VS ${event.opponent}`, "PUSH", "喰種対決の勝敗を開きます", "judge", event.chance, `${event.battle}戦目 最終結果`);
          await waitForExperienceAction(`喰種対決 ${event.battle}戦目 PUSH`, 5000, event.arima ? "upper" : event.won ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.won ? "GHOUL BATTLE WIN" : "GHOUL BATTLE LOSE", event.won ? `${event.opponent}撃破` : `${event.opponent}に敗北`, event.won ? "BITESへ" : "ATへ戻る", event.won ? "勝利報酬の段階アップを抽選します" : `残り差枚 ${yen.format(event.remainingCoins)}枚`, event.won ? "hit" : "end", event.won ? 100 : 0, "喰種対決結果");
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", total: event.cumulative });
          await waitForExperience(850);
          continue;
        }

        if (event.kind === "tokyo-ghoul-bites") {
          const bitesComplete = await animateExperienceCounter(eventGames, "G", event.mode === "extreme" ? "EXTREME BITES" : event.mode === "super" ? "SUPER BITES" : "BITES", event.label, "小役成立で報酬ランクアップを狙います", 100, `${event.battle}戦目 勝利報酬`, runId);
          if (!bitesComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "BITES REWARD", event.label, "PUSH", "今回の上乗せ差枚を開きます", "judge", 100, "BITES最終報酬");
          await waitForExperienceAction(`${event.label} PUSH`, 5000, event.mode === "extreme" ? "upper" : event.mode === "super" ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          runningAddOn += Number(event.award) || 0;
          setExperienceStage(3, event.mode === "extreme" ? "EXTREME BITES" : event.mode === "super" ? "SUPER BITES" : "BITES", event.label, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚・残り差枚 ${yen.format(event.remainingCoins)}枚`, event.mode === "extreme" ? "hyper" : "hit", 100, "BITES獲得結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", addOn: runningAddOn, total: event.cumulative });
          await waitForExperience(event.mode === "extreme" ? 1300 : 1000);
          continue;
        }

        if (event.kind === "tokyo-ghoul-special") {
          setExperienceStage(3, "SPECIAL JUDGE", `${event.label} 突入`, "PUSH", "特化ゾーンの獲得差枚を開きます", "judge", 100, `${event.number}回目 特化ゾーン`);
          await waitForExperienceAction(`${event.label} PUSH`, 5000, "upper");
          if (runId !== experienceRunId) return;
          runningAddOn += Number(event.award) || 0;
          setExperienceStage(3, "SPECIAL ADD ON", event.label, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚・東京喰種咬へ戻ります`, "hyper", 100, "特化ゾーン獲得結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: event.remainingCoins, remainingUnit: "枚", addOn: runningAddOn, total: event.cumulative });
          await waitForExperience(1200);
          continue;
        }

        if (event.kind === "tokyo-ghoul-upper-judge") {
          const judgeComplete = await animateExperienceCounter(5, "G", "ARIMA JUDGEMENT", event.label, "全役でCCGの死神突入を抽選します", event.chance, `成功期待度 約${Math.round(event.chance)}%`, runId);
          if (!judgeComplete) return;
          consumedGames += 5;
          setExperienceStage(3, "ARIMA FINAL JUDGE", event.label, "PUSH", "CCGの死神の当落を開きます", "judge", event.chance, "5G 最終結果");
          await waitForExperienceAction("有馬貴将JUDGEMENT PUSH", 5000, event.success ? "upper" : "normal");
          if (runId !== experienceRunId) return;
          setExperienceStage(3, event.success ? "JUDGEMENT SUCCESS" : "JUDGEMENT FAILED", event.success ? "有馬貴将撃破" : "JUDGEMENT失敗", event.success ? "CCGの死神へ" : "通常へ", event.success ? "1G完結の報酬ジャッジへ進みます" : "最終結果へ進みます", event.success ? "hyper" : "end", event.success ? 100 : 0, "有馬貴将JUDGEMENT結果");
          await waitForExperience(1000);
          continue;
        }

        if (event.kind === "tokyo-ghoul-ccg") {
          setExperienceStage(3, "CCG NO SHINIGAMI", event.label, "PUSH", "300・500・1000・2000枚から報酬を開きます", "judge", 100, "1G完結・平均約500枚");
          await waitForExperienceAction("CCGの死神 PUSH", 5000, "upper");
          if (runId !== experienceRunId) return;
          runningAddOn += Number(event.award) || 0;
          setExperienceStage(3, "CCG REWARD", event.label, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚`, "hyper", 100, "CCGの死神獲得結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, remainingUnit: "枚", addOn: runningAddOn, total: event.cumulative });
          await waitForExperience(1200);
          continue;
        }

        if (event.kind === "tokyo-ghoul-upper") {
          setExperienceStage(3, "URA AT", event.label, "100G＋α", "純増約5.0枚/Gの上位ATを開始します", "hyper", 100, "東京喰種咬 裏AT");
          await waitForExperience(900);
          const upperComplete = await animateExperienceCounter(eventGames, "G", "URA TOKYO GHOUL KOU", `${event.label} 消化中`, "100Gの上位区間を最後まで消化します", 100, "純増約5.0枚/G", runId);
          if (!upperComplete) return;
          consumedGames += eventGames;
          setExperienceStage(3, "URA AT RESULT", event.label, `+${yen.format(event.award)}枚`, `累計 ${yen.format(event.cumulative)}枚・最終結果へ`, "hyper", 100, "裏AT獲得結果");
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, remainingUnit: "枚", addOn: runningAddOn, total: event.cumulative });
          await waitForExperience(1200);
          continue;
        }

        if (event.kind === "cycle-round") {
          const titleFlow = event.titleFlow || null;
          const cycleRoundTitle = event.roundTitle || `${event.label} ${event.round}回目`;
          const cycleRoundDetail = event.roundDetail || "残りゲーム数を消化し、最後のPUSHで継続と報酬を開きます";
          const counterComplete = await animateExperienceCounter(eventGames, "G", event.phase || "AT LOOP", cycleRoundTitle, cycleRoundDetail, event.continueChance, `${cycleRoundTitle} 継続目安`, runId);
          if (!counterComplete) return;
          consumedGames += eventGames;
          setExperienceHud(`${yen.format(consumedGames)}G`, `${yen.format(result.investment)}円`, `${yen.format(event.cumulative)}枚`);
          setSlotAtStatus({ visible: true, remaining: 0, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          setExperienceStage(3, event.phase || titleFlow?.phaseLabel || "AT LOOP", cycleRoundTitle, "PUSH", titleFlow?.pushDetail || event.roundDetail || "継続結果と今回の報酬を開きます", "judge", event.continueChance, `継続期待度 約${Math.round(event.continueChance)}%`);
          await waitForExperienceAction(`${cycleRoundTitle} PUSH`, 5000, event.round >= 3 ? "gold" : "normal");
          if (runId !== experienceRunId) return;
          const cycleGameAdd = Math.max(0, Number(event.gameAdd) || 0);
          const cycleBonusGames = Math.max(0, Number(event.bonusGames) || 0);
          if (cycleGameAdd) runningAddOnGames += cycleGameAdd;
          if (event.rewardKind === "coins") runningAddOn += Number(event.award) || 0;
          setSlotAtStatus({ visible: true, remaining: cycleGameAdd || cycleBonusGames, addOn: runningAddOn, addOnGames: gameAddOnFlow ? runningAddOnGames : null, total: event.cumulative });
          const cycleAdvanced = event.continued || event.completed;
          const cycleRewardValue = cycleGameAdd
            ? `+${yen.format(cycleGameAdd)}G`
            : event.award
              ? `${event.rewardKind === "bonus" ? "BONUS " : ""}+${yen.format(event.award)}枚`
              : "終了";
          setExperienceStage(3, cycleAdvanced ? titleFlow?.resultContinue || "LOOP CONTINUE" : titleFlow?.resultEnd || "LOOP END", event.rewardLabel, cycleRewardValue, event.completed ? `累計 ${yen.format(event.cumulative)}枚・全ラウンド突破` : event.continued ? `累計 ${yen.format(event.cumulative)}枚・次の${event.label}へ` : `累計 ${yen.format(event.cumulative)}枚・${event.endLabel}`, cycleAdvanced ? "rush" : "end", cycleAdvanced ? 100 : 0, `${cycleRoundTitle} 結果`);
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
    if (result.experience.assaultLilyFlow && result.experience.entered) {
      setSlotAtStatus({ visible: true, remaining: 0, remainingUnit: "枚", addOn: result.experience.coinAddOnTotal, total: result.payout });
    }
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
