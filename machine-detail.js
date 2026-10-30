(function () {
  const slug = document.body.dataset.machine;
  const machines = window.ICHIGEKI_MACHINES || {};
  const machine = machines[slug];
  const app = document.getElementById("machineApp");
  if (!machine || !app) return;

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
  const editorialUpdated = machine.updated || "2026-10-12";
  const [editorialYear, editorialMonth, editorialDay] = editorialUpdated.split("-").map(Number);
  const editorialUpdatedLabel = `${editorialYear}年${editorialMonth}月${editorialDay}日`;
  const ordered = Object.entries(machines).sort((a, b) => a[1].order - b[1].order);
  let latestResult = null;
  let rankingClient = null;
  let rankingMode = "local";
  let rankingUserId = null;
  let rankingOwnRecord = null;
  const defaultSlotSettingPool = [1, 2, 3, 4, 5, 6];
  const slotSettingPool = Array.isArray(machine.sim.settingPool) && machine.sim.settingPool.length
    ? machine.sim.settingPool.filter(setting => defaultSlotSettingPool.includes(Number(setting))).map(Number)
    : defaultSlotSettingPool;
  const usesAllSlotSettings = slotSettingPool.length === 6 && defaultSlotSettingPool.every(setting => slotSettingPool.includes(setting));
  const slotSettingNumberLabel = usesAllSlotSettings ? "1〜6" : slotSettingPool.join("・");
  const slotSettingLabel = `設定${slotSettingNumberLabel}`;
  const slotBaselineSetting = slotSettingPool[0] || 1;
  const slotRankingVersion = machine.sim.kind !== "juggler" && machine.sim.settingRates ? "v3" : "v2";
  const rankingMachineSlug = machine.type === "slot" ? `${slug}--random-setting-${slotRankingVersion}` : `${slug}--fixed-rate-v1`;
  const RANKING_COOLDOWN_MS = 8000;
  const SLOT_COMPLETE_LIMIT = 19000;
  const RANKING_RATE = {
    pachinko: { lendBalls: 250, exchangeBalls: 28 },
    slot: { lendCoins: 46, exchangeCoins: 5.2 }
  };
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
  let experienceReturnFocus = null;
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
  function geometric(rate) {
    const probability = 1 / rate;
    return Math.max(1, Math.ceil(Math.log(1 - Math.random()) / Math.log(1 - probability)));
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
      return `<div class="machine-fixed-rate-label"><span>RANDOM SETTING / 8,000G</span><strong>設定1〜6ランダム・8,000G固定実戦</strong></div><div class="machine-control-grid machine-rate-controls"><label class="machine-control"><span>設定抽選</span><input type="text" value="設定1〜6" disabled><small>START時に均等抽選・結果で発表</small></label><label class="machine-control"><span>総ゲーム数</span><input id="jugglerGames" type="number" value="${machine.sim.games}" disabled><small>8,000G固定</small></label><label class="machine-control"><span>1,000円の貸メダル</span><input id="lendCoins" type="number" value="46" disabled><small>46枚貸しで固定</small></label><label class="machine-control"><span>交換率（100円）</span><input id="exchangeCoins" type="number" value="5.2" disabled><small>5.2枚交換で固定</small></label><label class="machine-control"><span>50枚あたりゲーム数</span><input id="baseRate" type="number" value="${machine.sim.base50}" disabled><small>機種別ベースで固定</small></label></div>`;
    }
    return `<div class="machine-fixed-rate-label"><span>RANDOM SETTING PLAY</span><strong>${slotSettingLabel}をSTART時に均等抽選</strong></div><div class="machine-control-grid machine-rate-controls"><label class="machine-control"><span>設定抽選</span><input type="text" value="${slotSettingLabel}" disabled><small>実機搭載設定のみ・結果で発表</small></label><label class="machine-control"><span>50枚あたりゲーム数</span><input id="baseRate" type="number" value="${machine.sim.base50}" disabled><small>機種別ベースで固定</small></label><label class="machine-control"><span>1,000円の貸メダル</span><input id="lendCoins" type="number" value="46" disabled><small>46枚貸しで固定</small></label><label class="machine-control"><span>交換率（100円）</span><input id="exchangeCoins" type="number" value="5.2" disabled><small>5.2枚交換で固定</small></label><label class="machine-control"><span>コイン単価</span><input id="coinUnit" type="number" value="${machine.sim.coinUnit}" disabled><small>機種別の荒さ指標</small></label></div>`;
  }

  function simulationLabels() {
    if (machine.sim.kind === "pachinko") return [machine.sim.hitLabel, machine.sim.rushLabel, "総出玉"];
    if (machine.sim.kind === "juggler") return ["8,000G", "BIG・REG", "差枚"];
    return [...new Set([machine.sim.triggerLabel, machine.sim.mainLabel, machine.sim.upperLabel].filter(Boolean))];
  }

  function articleMarkup() {
    if (!Array.isArray(machine.articleSections) || !machine.articleSections.length) {
      const sim = machine.sim;
      const flow = sim.kind === "pachinko"
        ? `${sim.hitLabel}までの回転数、${sim.rushLabel}への突入、連チャン数と出玉を順番に抽選します。`
        : `${sim.triggerLabel}、${sim.mainLabel}、${sim.upperChallenge}、${sim.upperLabel}の順に、各段階への到達と獲得枚数を抽選します。`;
      const calculation = sim.kind === "pachinko"
        ? (() => {
            const averageInvestment = Math.round((sim.hitRate / sim.spinsPer1k * 1000) / 100) * 100;
            return `<h3>平均回転と投資目安の計算</h3><p>通常時の${sim.hitLabel}確率は約1/${sim.hitRate}です。1,000円あたり${sim.spinsPer1k}回転という機種別固定条件を使い、平均投資目安を「${sim.hitRate} ÷ ${sim.spinsPer1k} × 1,000円」で計算します。この条件では約${yen.format(averageInvestment)}円が目安です。</p><p>${sim.startType}、250玉貸し・28玉交換で固定し、${sim.rushLabel}突入率${(sim.rushEntry * 100).toFixed(1).replace(".0", "")}%と継続率${(sim.rushContinue * 100).toFixed(1).replace(".0", "")}%を簡易抽選します。</p>`;
          })()
        : (() => {
            const gamesPerThousand = sim.base50 * RANKING_RATE.slot.lendCoins / 50;
            const averageInvestment = Math.round((sim.mainRate / gamesPerThousand * 1000) / 100) * 100;
            const settingModelText = sim.settingRates
              ? `${slotSettingLabel}で公開されている初当り値を個別に使い、公開されていない特化・上位の設定差は加えません。`
              : "設定別の数値が揃わないため、設定1基準値へサイト共通の固定補正を加える体験用モデルです。";
            return `<h3>平均Gと投資目安の計算</h3><p>${sim.mainLabel}初当りの目安は約1/${sim.mainRate}です。50枚あたり${sim.base50}G、1,000円46枚貸しの固定条件から、1,000円で回せるゲーム数を約${gamesPerThousand.toFixed(1)}Gとして計算します。この条件では約${yen.format(averageInvestment)}円が平均投資の目安です。</p><p>${settingModelText} コイン単価${sim.coinUnit}円は出玉の荒さを比べる指標で、現金投資額そのものではありません。換金は5.2枚交換で固定しています。</p>`;
          })();
      return `<h3>${machine.shortName}で確認できること</h3>
        <p>${flow} 公開されている代表的な数値をもとに遊びやすく単純化し、同じ機種では全員が同じ貸出・交換条件で比較できるようにしています。</p>
        <p>実機にある全ての内部状態、設定差、演出、出玉削り、打ち方による差は再現していません。早い当りと深いハマり、通常結果と上位結果の幅を比べるための体験用モデルです。</p>
        ${calculation}
        <h3>シミュレーターで比較するポイント</h3>
        <ul><li>平均値より早い当りと深いハマりの両方を複数回確認する</li><li>${sim.kind === "pachinko" ? `${sim.rushLabel}非突入時と連チャン時の出玉・収支を比べる` : `${sim.mainLabel}終了時と${sim.upperLabel}到達時の獲得枚数・収支を比べる`}</li><li>結果は自動保存されるマイ記録と機種別ランキングで振り返る</li></ul>
        <p>平均値は長期間の理論上の目安であり、1回ごとの結果や実際の遊技収支を保証するものではありません。</p>`;
    }
    return machine.articleSections.map(section => `<section class="machine-article-section"><h3>${section.heading}</h3>${(section.paragraphs || []).map(paragraph => `<p>${paragraph}</p>`).join("")}${section.bullets?.length ? `<ul>${section.bullets.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}</section>`).join("");
  }

  const labels = simulationLabels();
  const neighbors = ordered.filter(([key]) => key !== slug).slice(0, 5);
  app.innerHTML = `
    <section class="machine-archive-hero theme-${machine.theme}">
      <div><span class="machine-kind">${machine.year.includes("2026") ? "NEW MACHINE 2026" : machine.type === "slot" ? "POPULAR SLOT ARCHIVE" : "POPULAR PACHINKO ARCHIVE"}</span><h1>${machine.name}</h1><p>${machine.catchcopy}</p></div>
      <dl><div><dt>導入</dt><dd>${machine.year}</dd></div><div><dt>メーカー</dt><dd>${machine.maker}</dd></div><div><dt>分類</dt><dd>${machine.type === "slot" ? "パチスロ" : "パチンコ"}</dd></div></dl>
    </section>

    <nav class="machine-quick-nav" aria-label="ページ内メニュー"><a class="is-primary" href="#simulator">今すぐ試す</a><button class="machine-favorite-button" id="machineFavoriteButton" type="button" aria-pressed="false"><span aria-hidden="true">☆</span> お気に入り</button><a href="#spec">スペック</a><a href="#machineRanking">ランキング</a><a href="#article">記事</a><a href="community.html?machine=${slug}">投稿</a></nav>

    <section class="machine-intro" id="spec">
      <div><span class="machine-section-label">SPEC GUIDE</span><h2>主要スペック</h2><p>${machine.intro}</p><ul>${machine.points.map(point => `<li>${point}</li>`).join("")}</ul></div>
      <div class="machine-spec-grid">${machine.specs.map(([key, value]) => `<div><span>${key}</span><strong>${value}</strong></div>`).join("")}</div>
    </section>

    <section class="machine-simulator" id="simulator">
      <div class="machine-sim-head"><div><span class="machine-section-label">SIMULATOR</span><h2>${machine.shortName} 簡易シミュレーター</h2></div><span class="machine-sim-badge">娯楽用</span></div>
      <p class="machine-sim-note">投資・換金・収支は固定レートで計算します。パチンコは250玉貸し・28玉交換、スロットは46枚貸し・5.2枚交換です。スロットはSTART時に${slotSettingLabel}を均等抽選し、最終結果で設定を発表します。</p>
      <div class="machine-sim-layout">
        <div class="machine-sim-controls">${controlMarkup()}<div class="machine-average-grid" id="averageGrid"></div><div class="machine-start-anchor" id="machineStartAnchor"></div><button class="machine-start-button" id="machineStart" type="button"><span>START</span><small>${labels.join(" → ")}</small></button></div>
        <div class="machine-result" id="machineResult" aria-live="polite"><span>RESULT</span><strong id="resultTitle">STARTを押してください</strong><p id="resultSummary">平均値と今回の結果を比較できます。</p><div class="machine-result-stats" id="resultStats"></div><div class="machine-flow" id="resultFlow"></div><p class="machine-auto-save-status" id="machineAutoSaveStatus">結果は自動でマイ記録へ保存されます。</p><div class="achievement-unlock-toast" id="machineAchievementUnlock" hidden><span>TITLE UNLOCKED</span><strong></strong><small>新しい称号を獲得しました</small></div><div class="machine-result-actions"><a class="button" href="ranking.html#achievements">称号・記録を見る</a><a class="button" id="shareMachineResult" href="community.html?machine=${slug}&compose=simulation#simulationComposer">結果を投稿</a></div><div class="machine-ranking-entry"><label class="machine-ranking-name"><span>ランキングに登録する名前</span><input id="rankingNickname" type="text" maxlength="16" autocomplete="nickname" placeholder="ニックネーム"></label><button class="button primary" id="rankMachineResult" type="button" disabled>ランキングに登録</button></div></div>
      </div>
      <section class="machine-experience" id="machineExperience" role="dialog" aria-modal="true" aria-label="${machine.shortName}のシミュレーション演出" data-profile="${experienceProfile.key}" hidden>
        <div class="machine-experience-head"><span id="machineExperienceStep">STEP 1 / 5</span><div><button type="button" id="machineExperienceSound" aria-pressed="${experienceSoundEnabled}">${experienceSoundEnabled ? "音ON" : "音OFF"}</button><button type="button" id="machineExperienceSkip">スキップ</button><button type="button" id="machineExperienceClose">× 閉じる</button></div></div>
        <div class="machine-experience-screen" id="machineExperienceScreen"><span id="machineExperiencePhase">${experienceProfile.system}</span><strong id="machineExperienceTitle">抽選中</strong><b id="machineExperienceValue">0</b><p id="machineExperienceMessage">結果を抽選しています</p><div class="machine-expectation"><div><span id="machineExperienceCue">${experienceProfile.cue}</span><strong><small>演出期待度</small><b id="machineExperienceChance">抽選中</b></strong></div><div class="machine-expectation-track" role="progressbar" aria-label="演出期待度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="machineExperienceChanceBar"></i></div><small>シミュレーション上の抽選率目安</small></div></div>
        <div class="machine-experience-progress" aria-label="演出の進行状況"><span data-machine-experience-step="0">${machine.sim.kind === "juggler" ? "実戦" : "通常"}</span><span data-machine-experience-step="1">${machine.sim.kind === "pachinko" ? "大当り" : machine.sim.kind === "juggler" ? "ペカリ" : "CZ"}</span><span data-machine-experience-step="2">${machine.sim.kind === "pachinko" ? "RUSH" : machine.sim.kind === "juggler" ? "BB/RB" : "AT"}</span><span data-machine-experience-step="3">${machine.sim.kind === "pachinko" ? "連チャン" : machine.sim.kind === "juggler" ? "8,000G" : "上位"}</span><span data-machine-experience-step="4">結果</span></div>
        <section class="machine-experience-actions" id="machineExperienceActions" aria-labelledby="machineExperienceActionsTitle" hidden><div><span>RESULT MENU</span><strong id="machineExperienceActionsTitle">この結果をどうする？</strong><small id="machineOverlaySaveStatus">マイ記録へ自動保存しました</small></div><div class="machine-experience-main-actions"><button type="button" class="button primary" id="machineOverlayRetry">もう一度試す</button><a class="button" href="ranking.html">マイ記録を見る</a><a class="button" id="machineOverlayPost" href="community.html?machine=${slug}&compose=simulation#simulationComposer">結果を投稿</a></div><div class="machine-experience-rank"><label for="machineOverlayNickname">ランキング表示名<input id="machineOverlayNickname" type="text" maxlength="16" autocomplete="nickname" placeholder="ニックネーム"></label><button type="button" class="button" id="machineOverlayRank">ランキングに登録</button></div><button type="button" class="machine-experience-return" id="machineOverlayClose">元の機種ページへ戻る</button></section>
      </section>
    </section>

    <section class="machine-ranking" id="machineRanking" aria-labelledby="machineRankingTitle">
      <div class="machine-ranking-head"><div><span class="machine-section-label">MACHINE RANKING</span><h2 id="machineRankingTitle">${machine.shortName} ランキング</h2><p>差${machine.sim.kind === "pachinko" ? "玉" : "枚"}が多い順。同点の場合は投資が少ない記録を上位にします。</p><p class="machine-ranking-rules">条件：${machine.sim.kind === "pachinko" ? "1,000円250玉貸し・28玉交換・機種別回転率" : `${slotSettingLabel}均等ランダム・1,000円46枚貸し・5.2枚交換・機種別ベース`}。ランキングにも抽選された設定を表示します。</p></div><span class="machine-ranking-mode" id="machineRankingMode">この端末の記録</span></div>
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
        ${articleMarkup()}
        <h3>関連ガイド</h3><div class="next-links"><a href="average-game-guide.html">平均G・平均回転</a><a href="continuation-rate-guide.html">継続率と平均連</a><a href="simulation-policy.html">計算・掲載方針</a></div>
        <h3>参照情報</h3><ul class="machine-sources">${machine.sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a></li>`).join("")}</ul>
      </article>
      <aside class="machine-side-list"><strong>次に試す人気機種</strong>${neighbors.map(([key, item]) => `<a href="${key}.html"><span>${item.type === "slot" ? "SLOT" : "PACHINKO"}</span>${item.shortName}</a>`).join("")}</aside>
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
      grid.innerHTML = `<div><span>設定抽選</span><strong>1〜6均等</strong></div><div><span>固定ゲーム数</span><strong>${yen.format(machine.sim.games)}G</strong></div><div><span>設定1基準 BIG</span><strong>1/${machine.sim.bigRate}</strong></div><div><span>設定1基準 REG</span><strong>1/${machine.sim.regRate}</strong></div><div><span>交換単価</span><strong>${(100 / exchangeCoins).toFixed(2)}円/枚</strong></div>`;
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
      grid.innerHTML = `<div><span>設定抽選</span><strong>${slotSettingNumberLabel}均等</strong></div><div><span>設定差モデル</span><strong>${settingModelLabel}</strong></div><div><span>設定${slotBaselineSetting}基準の平均${machine.sim.mainLabel}まで</span><strong>${machine.sim.mainRate.toFixed(1)}G</strong></div><div><span>設定${slotBaselineSetting}基準の平均投資</span><strong>${yen.format(averageInvestment)}円</strong></div><div><span>交換単価</span><strong>${(100 / exchangeCoins).toFixed(2)}円/枚</strong></div><div><span>コイン単価</span><strong>${coinUnit.toFixed(1)}円・${riskLabel(coinUnit)}</strong></div><div><span>単価換算の台売上指標</span><strong>${yen.format(salesIndex)}円</strong></div>`;
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
    let payout = rush ? sim.firstPayoutIn : sim.firstPayoutOut;
    let hits = 1;
    let upper = rush && Boolean(sim.upperLabel) && Math.random() < (sim.upperDirectChance || 0);
    if (upper && sim.upperEntryPayout) payout = sim.upperEntryPayout;
    const flow = [`${spins}回転で${sim.hitLabel}`, rush ? `${sim.rushLabel}突入` : `${sim.rushLabel}非突入`];
    if (upper) flow.push(`${sim.upperLabel}直行`);
    if (rush) {
      while (hits < 100 && Math.random() < (upper ? sim.upperContinue : sim.rushContinue)) {
        hits += 1;
        payout += weighted(sim.rushPayouts);
        if (!upper && sim.upperLabel) {
          const stagedChallenge = Boolean(sim.upperChallengeSuccess) && (hits >= (sim.upperAfterHits || Infinity) || Math.random() < (sim.upperEarlyChance || 0));
          if (stagedChallenge) {
            const challengeLabel = sim.upperChallenge || `${sim.upperLabel}突入チャレンジ`;
            flow.push(`${challengeLabel}突入`);
            if (Math.random() < sim.upperChallengeSuccess) {
              upper = true;
              flow.push(`${sim.upperLabel}突入`);
            } else {
              flow.push(`${challengeLabel}失敗`);
              if (sim.upperChallengeEndsOnFailure) break;
            }
          } else if (Math.random() < (sim.upperUpgradeChance || 0)) {
            upper = true;
            flow.push(`${sim.upperLabel}昇格`);
          }
        }
      }
      flow.push(`${hits}回当たりで終了`);
    }
    const usedBalls = investmentUnits * lendBalls;
    const diff = payout - usedBalls;
    const exchangeValue = Math.round(payout / exchangeBalls * 100);
    const balanceYen = exchangeValue - investment;
    const rankInvestmentUnits = Math.ceil(spins / sim.spinsPer1k);
    const rankInvestment = rankInvestmentUnits * 1000;
    const rankScore = Math.round(payout - rankInvestmentUnits * RANKING_RATE.pachinko.lendBalls);
    const rushResultLabel = upper ? sim.upperLabel : rush ? sim.rushLabel : "通常";
    return { title: rush ? `${rushResultLabel} ${hits}回当たり` : "通常へ", summary: `${spins}回転で初当り。${upper ? `${sim.upperLabel}まで到達しました。` : rush ? `${sim.rushLabel}に突入しました。` : "RUSHには突入しませんでした。"}`, stats: [["今回の回転数", `${yen.format(spins)}回転`], ["投資目安", `${yen.format(investment)}円`], ["総出玉", `${yen.format(payout)}玉`], ["換金目安", `${yen.format(exchangeValue)}円`], ["差玉目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}玉`], ["収支目安", `${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円`], ["利用レート", `${yen.format(lendBalls)}玉貸し・${exchangeBalls}玉交換`]], flow, share: `${machine.shortName}｜${yen.format(spins)}回転｜投資${yen.format(investment)}円｜${rushResultLabel}｜${hits}回当たり｜${yen.format(payout)}玉｜換金${yen.format(exchangeValue)}円｜収支${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円｜${yen.format(lendBalls)}玉貸し・${exchangeBalls}玉交換`, score: Math.round(diff), rankScore, rankInvestment, scoreKind: "balls", balanceYen, exchangeValue, investment, payout, attempts: spins, experience: { kind: "pachinko", attempts: spins, unit: "回転", hitLabel: sim.hitLabel, hitChance: 100 / sim.hitRate, entered: rush, entryChance: sim.rushEntry * 100, mainLabel: sim.rushLabel, continueChance: sim.rushContinue * 100, upper, upperLabel: sim.upperLabel || "", upperContinueChance: (sim.upperContinue || sim.rushContinue) * 100, hits, payout, payoutUnit: "玉" } };
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
    let payout = 0;
    let entered = Math.random() < triggerSuccess;
    let upper = false;
    if (!entered) {
      flow.push(`${sim.mainLabel}非突入`);
    } else {
      payout = randomInt(sim.normalMin, sim.normalMax);
      flow.push(`${sim.mainLabel}突入`);
      if (Math.random() < specialChance) { const add = randomInt(sim.specialMin, sim.specialMax); payout += add; flow.push(`${sim.specialLabel} +${add}枚`); }
      if (Math.random() < upperChance) {
        flow.push(sim.upperChallenge);
        upper = Math.random() < sim.upperSuccess;
        if (upper) {
          let loops = 1;
          payout += sim.upperPayout;
          while (loops < 100 && Math.random() < sim.upperContinue) { loops += 1; payout += sim.upperPayout; }
          flow.push(`${sim.upperLabel} ${loops}セット`);
        } else flow.push(`${sim.upperChallenge}失敗`);
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
    const settingRateStats = [[`設定${setting}の${sim.triggerLabel}`, `約1/${triggerRate.toFixed(1)}`]];
    if (sim.mainLabel !== sim.triggerLabel || Math.abs(mainRate - triggerRate) >= 0.05) {
      settingRateStats.push([`設定${setting}の${sim.mainLabel}`, `約1/${mainRate.toFixed(1)}`]);
    }
    const stats = [["今回の設定", `設定${setting}`], ["設定差モデル", settingModelLabel], ["今回のゲーム数", `${yen.format(games)}G`], ...settingRateStats, ["現金投資目安", `${yen.format(investment)}円`], ["獲得枚数", `${yen.format(payout)}枚`], ["換金目安", `${yen.format(exchangeValue)}円`], ["差枚目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`], ["収支目安", `${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円`], ["利用レート", `${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換`], ["コイン単価", `${coinUnit.toFixed(1)}円・${riskLabel(coinUnit)}`], ["単価換算の台売上指標", `${yen.format(salesIndex)}円`]];
    if (complete) stats.unshift(["到達状態", "コンプリート"]);
    return { title: `設定${setting}｜${complete ? "コンプリート" : upper ? `${sim.upperLabel}到達` : entered ? `${sim.mainLabel}終了` : `${sim.triggerLabel}失敗`}`, summary: complete ? `今回の設定は設定${setting}。${games}Gで${sim.triggerLabel}、獲得枚数が${yen.format(SLOT_COMPLETE_LIMIT)}枚に到達し、コンプリートしました。` : `今回の設定は設定${setting}。${games}Gで${sim.triggerLabel}。${entered ? `${payout}枚を獲得しました。` : `${sim.mainLabel}には届きませんでした。`}`, stats, flow: [`設定${setting}`, ...flow], share: `${machine.shortName}｜設定${setting}｜${yen.format(games)}G｜投資${yen.format(investment)}円｜${resultLabel}｜${yen.format(payout)}枚｜換金${yen.format(exchangeValue)}円｜収支${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円｜${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換｜コイン単価${coinUnit.toFixed(1)}円`, setting, score: Math.round(diff), rankScore, rankInvestment, scoreKind: "coins", balanceYen, exchangeValue, investment, payout, attempts: games, complete, settingModel: settingModelLabel, experience: { kind: "slot", setting, attempts: games, unit: "G", hitLabel: sim.triggerLabel, hitChance: 100 / triggerRate, entered, entryChance: triggerSuccess * 100, mainLabel: sim.mainLabel, specialChance: specialChance * 100, upperRouteChance: upperChance * 100, upperSuccessChance: sim.upperSuccess * 100, upper, upperLabel: sim.upperLabel || "", complete, payout, payoutUnit: "枚", flow: [...flow] } };
  }

  function runJuggler(setting) {
    const sim = machine.sim;
    const profile = settingProfile(setting);
    const games = sim.games;
    const lendCoins = Math.max(40, Number(document.getElementById("lendCoins").value) || RANKING_RATE.slot.lendCoins);
    const exchangeCoins = Math.max(4, Number(document.getElementById("exchangeCoins").value) || RANKING_RATE.slot.exchangeCoins);
    const base = Math.max(20, Number(document.getElementById("baseRate").value) || sim.base50);
    const bigRate = Number(sim.settingRates?.[setting]?.big) || sim.bigRate * profile.big;
    const regRate = Number(sim.settingRates?.[setting]?.reg) || sim.regRate * profile.reg;
    const payoutRate = Number(sim.settingRates?.[setting]?.payout) || sim.payoutRate + profile.payout;
    const combinedRate = 1 / (1 / bigRate + 1 / regRate);
    const bigChance = 1 / bigRate;
    const regChance = 1 / regRate;
    let big = 0;
    let reg = 0;
    for (let game = 0; game < games; game += 1) {
      const roll = Math.random();
      if (roll < bigChance) big += 1;
      else if (roll < bigChance + regChance) reg += 1;
    }
    const bonusCount = big + reg;
    const actualCombined = bonusCount ? games / bonusCount : 0;
    const totalIn = games * 3;
    const expectedBig = games / bigRate;
    const expectedReg = games / regRate;
    const bonusDeviation = Math.round((big - expectedBig) * sim.bigPayout + (reg - expectedReg) * sim.regPayout);
    const diff = Math.round(totalIn * (payoutRate - 1)) + bonusDeviation;
    const payout = Math.max(0, totalIn + diff);
    const investment = 0;
    const exchangeValue = Math.round(diff / exchangeCoins * 100);
    const balanceYen = exchangeValue;
    const resultLabel = diff >= 0 ? `プラス${yen.format(diff)}枚` : `マイナス${yen.format(Math.abs(diff))}枚`;
    const combinedLabel = actualCombined ? `1/${actualCombined.toFixed(1)}` : "当選なし";
    const flow = [`設定${setting}`, `${yen.format(games)}G消化`, `BIG ${big}回`, `REG ${reg}回`, `合算 ${combinedLabel}`, `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`];
    const stats = [["今回の設定", `設定${setting}`], ["総ゲーム数", `${yen.format(games)}G`], [`設定${setting}の抽選値`, `BIG 1/${bigRate.toFixed(1)}・REG 1/${regRate.toFixed(1)}・合算1/${combinedRate.toFixed(1)}`], ["BIG", `${big}回（実績1/${big ? (games / big).toFixed(1) : "-"}）`], ["REG", `${reg}回（実績1/${reg ? (games / reg).toFixed(1) : "-"}）`], ["ボーナス合算", `${bonusCount}回（${combinedLabel}）`], ["総投入", `${yen.format(totalIn)}枚`], ["総払出目安", `${yen.format(payout)}枚`], ["差枚目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`], ["収支目安", `${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円`], ["利用レート", `${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換`]];
    return { title: `設定${setting}｜8,000G完走・${resultLabel}`, summary: `今回の設定は設定${setting}。8,000G固定でBIG ${big}回・REG ${reg}回・合算${combinedLabel}でした。`, stats, flow, share: `${machine.shortName}｜設定${setting}｜8,000G｜BIG ${big}回｜REG ${reg}回｜合算${combinedLabel}｜差枚${diff >= 0 ? "+" : ""}${yen.format(diff)}枚｜収支${balanceYen >= 0 ? "+" : ""}${yen.format(balanceYen)}円｜${yen.format(lendCoins)}枚貸し・${exchangeCoins}枚交換`, setting, score: diff, rankScore: diff, rankInvestment: investment, scoreKind: "coins", balanceYen, exchangeValue, investment, payout, attempts: games, complete: false, experience: { kind: "juggler", setting, attempts: games, unit: "G", hitLabel: "GOGO!ランプ", hitChance: 100 / combinedRate, entered: false, upper: false, mainLabel: "BIG・REG", big, reg, combinedLabel, diff, payout, payoutUnit: "枚", finalValue: `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`, flow: [...flow] } };
  }

  function readMachineHistory() {
    try {
      const records = JSON.parse(localStorage.getItem(MACHINE_HISTORY_KEY) || "[]");
      return Array.isArray(records) ? records : [];
    } catch { return []; }
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
    resultPanel.classList.add("has-result");
    resultPanel.classList.toggle("is-complete", Boolean(result.complete));
    resultPanel.querySelector(":scope > span").textContent = result.complete ? "SLOT COMPLETE" : "RESULT";
    document.getElementById("machineAutoSaveStatus").textContent = saveInfo.count === null ? "自動保存できませんでした。ブラウザの保存設定をご確認ください。" : `マイ記録へ自動保存しました（合計${yen.format(saveInfo.count)}回）`;
    document.getElementById("machineOverlaySaveStatus").textContent = saveInfo.count === null ? "自動保存できませんでした" : saveInfo.newTitles.length ? `称号獲得！ ${saveInfo.newTitles.map(item => item.name).join("・")}` : `マイ記録へ自動保存しました（合計${yen.format(saveInfo.count)}回）`;
    const achievementToast = document.getElementById("machineAchievementUnlock");
    achievementToast.hidden = saveInfo.newTitles.length === 0;
    if (saveInfo.newTitles.length) achievementToast.querySelector("strong").textContent = saveInfo.newTitles.map(item => item.name).join("・");
    document.getElementById("rankMachineResult").disabled = false;
    document.getElementById("rankMachineResult").textContent = "ランキングに登録";
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
  const simulator = document.getElementById("simulator");
  const startAnchor = document.getElementById("machineStartAnchor");
  let simulatorVisible = false;
  let startAnchorVisible = false;
  let resultPosition = false;

  function updateStickyStart() {
    const shouldStick = simulatorVisible && !startAnchorVisible && !resultPosition;
    startButton.classList.toggle("is-sticky", shouldStick);
    document.body.classList.toggle("has-machine-sticky-start", shouldStick);
  }

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
      const patterns = {
        normal: [[220, 0, .035]],
        hit: [[440, 0, .06], [660, .09, .07], [880, .18, .10]],
        judge: [[330, 0, .07], [330, .16, .07]],
        rush: [[440, 0, .05], [660, .07, .06]],
        hyper: [[523, 0, .07], [784, .07, .08], [1046, .15, .12]],
        complete: [[523, 0, .09], [659, .08, .09], [784, .16, .09], [1046, .25, .15]],
        end: [[246, 0, .08], [196, .1, .12]]
      };
      const now = experienceAudioContext.currentTime;
      (patterns[tone] || patterns.normal).forEach(([frequency, offset, duration]) => {
        const oscillator = experienceAudioContext.createOscillator();
        const gain = experienceAudioContext.createGain();
        oscillator.type = tone === "hyper" || tone === "complete" ? "triangle" : "sine";
        oscillator.frequency.setValueAtTime(frequency, now + offset);
        gain.gain.setValueAtTime(.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(.055, now + offset + .012);
        gain.gain.exponentialRampToValueAtTime(.0001, now + offset + duration);
        oscillator.connect(gain).connect(experienceAudioContext.destination);
        oscillator.start(now + offset);
        oscillator.stop(now + offset + duration + .02);
      });
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

  function skipExperience() {
    experienceSkipped = true;
    if (experienceDelayTimer) window.clearTimeout(experienceDelayTimer);
    experienceDelayTimer = null;
    if (experienceDelayResolve) experienceDelayResolve();
    experienceDelayResolve = null;
  }

  function openExperience() {
    const experience = document.getElementById("machineExperience");
    if (!document.body.classList.contains("has-machine-experience")) experienceReturnFocus = document.activeElement;
    experience.hidden = false;
    experience.classList.add("is-fullscreen");
    document.body.classList.add("has-machine-experience");
    document.body.classList.remove("has-machine-sticky-start");
    startButton.classList.remove("is-sticky");
    document.getElementById("machineExperienceActions").hidden = true;
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
    updateStickyStart();
    if (experienceReturnFocus?.focus) experienceReturnFocus.focus({ preventScroll: true });
  }

  function showExperienceActions() {
    document.getElementById("machineOverlayRank").disabled = false;
    document.getElementById("machineOverlayRank").textContent = "ランキングに登録";
    document.getElementById("machineOverlayPost").href = document.getElementById("shareMachineResult").href;
    document.getElementById("machineOverlayNickname").value = document.getElementById("rankingNickname").value;
    document.getElementById("machineExperienceActions").hidden = false;
  }

  async function playPachinkoExperience(result, runId) {
    const data = result.experience;
    setExperienceStage(0, experienceProfile.system, "通常回転中", "0回転", `${data.hitLabel}を目指して抽選中`, "normal", data.hitChance, "1回転ごとの大当り確率");
    for (const progress of [0.05, 0.13, 0.24, 0.39, 0.56, 0.72, 0.87, 1]) {
      if (runId !== experienceRunId || experienceSkipped) break;
      document.getElementById("machineExperienceValue").textContent = `${yen.format(Math.max(1, Math.round(data.attempts * progress)))}回転`;
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
    setExperienceStage(2, "RUSH JUDGE", data.entered ? `${data.mainLabel} 突入` : `${data.mainLabel} 非突入`, data.entered ? "突入成功" : "通常へ", data.entered ? "連チャン抽選へ進みます" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, "判定結果");
    await waitForExperience(760);
    if (data.entered) {
      const animatedHits = Math.min(Math.max(1, data.hits), 10);
      for (let hit = 1; hit <= animatedHits; hit += 1) {
        if (runId !== experienceRunId || experienceSkipped) break;
        const upperReached = data.upper && hit === animatedHits;
        const estimatedPayout = Math.max(1, Math.round(data.payout * hit / data.hits));
        setExperienceStage(3, upperReached ? "UPPER RUSH" : "RUSH MODE", upperReached ? data.upperLabel : hit === data.hits ? "RUSH 終了" : "RUSH 継続！", `${hit}回 / ${yen.format(estimatedPayout)}${data.payoutUnit}`, upperReached ? "上位RUSHへ到達" : hit === data.hits ? "最終結果へ" : "次の継続抽選へ", upperReached ? "hyper" : "rush", upperReached ? data.upperContinueChance : data.continueChance, upperReached ? `${data.upperLabel}継続率` : `${data.mainLabel}継続率`);
        await waitForExperience(upperReached ? 620 : 340);
      }
      if (data.hits > animatedHits && !experienceSkipped) {
        setExperienceStage(3, "RUSH MODE", "一気に連チャン！", `${data.hits}回 / ${yen.format(data.payout)}${data.payoutUnit}`, "高速演出で最終結果へ", data.upper ? "hyper" : "rush", data.upper ? data.upperContinueChance : data.continueChance, "継続率");
        await waitForExperience(580);
      }
    } else {
      setExperienceStage(3, "NORMAL END", "通常へ", "連チャンなし", "最終結果を表示します", "end", 0, "連チャン結果");
      await waitForExperience(420);
    }
  }

  async function playSlotExperience(result, runId) {
    const data = result.experience;
    setExperienceStage(0, experienceProfile.system, "通常ゲーム中", "0G", `${data.hitLabel}を目指して抽選中`, "normal", data.hitChance, "1Gごとの契機当選率");
    for (const progress of [0.05, 0.13, 0.24, 0.39, 0.56, 0.72, 0.87, 1]) {
      if (runId !== experienceRunId || experienceSkipped) break;
      document.getElementById("machineExperienceValue").textContent = `${yen.format(Math.max(1, Math.round(data.attempts * progress)))}G`;
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
    setExperienceStage(2, "AT JUDGE", data.entered ? `${data.mainLabel} 突入` : `${data.mainLabel} 非突入`, data.entered ? "突破成功" : "通常へ", data.entered ? "特化ゾーン・上位抽選へ" : "今回の一撃はここで終了", data.entered ? "rush" : "end", data.entered ? 100 : 0, "AT判定結果");
    await waitForExperience(720);
    if (data.entered) {
      const route = data.flow.slice(1, 7);
      for (let index = 0; index < route.length; index += 1) {
        if (runId !== experienceRunId || experienceSkipped) break;
        const label = route[index];
        const isUpper = data.upper && (label.includes(data.upperLabel) || index === route.length - 1);
        setExperienceStage(3, isUpper ? "UPPER AT" : "AT MODE", label, index === route.length - 1 ? `${yen.format(data.payout)}${data.payoutUnit}` : `${index + 1} / ${route.length}`, isUpper ? "上位ATの結果を抽選中" : "獲得枚数を上乗せ中", isUpper ? "hyper" : "rush", isUpper ? data.upperSuccessChance : label.includes("+") ? data.specialChance : data.upperRouteChance, isUpper ? `${data.upperLabel}突破率` : "特化・上位ルート期待度");
        await waitForExperience(isUpper ? 600 : 360);
      }
      if (data.complete) {
        setExperienceStage(3, "SLOT COMPLETE", "コンプリート", `${yen.format(data.payout)}枚`, "獲得上限へ到達", "complete", 100, "コンプリート到達");
        await waitForExperience(780);
      }
    } else {
      setExperienceStage(3, "NORMAL END", "通常へ", "AT非突入", "最終結果を表示します", "end", 0, "AT判定結果");
      await waitForExperience(420);
    }
  }

  async function playJugglerExperience(result, runId) {
    const data = result.experience;
    setExperienceStage(0, "8,000G PLAY", "設定を決めずに実戦開始", "0G", "設定は最終結果で発表", "normal", data.hitChance, "1Gごとのボーナス合算");
    for (const progress of [0.08, 0.18, 0.30, 0.44, 0.58, 0.72, 0.86, 1]) {
      if (runId !== experienceRunId || experienceSkipped) break;
      document.getElementById("machineExperienceValue").textContent = `${yen.format(Math.round(data.attempts * progress))}G`;
      await waitForExperience(135);
    }
    if (runId !== experienceRunId) return;
    setExperienceStage(1, "GOGO! CHANCE", "ペカリを集計", `${data.big + data.reg}回`, "8,000Gの全ボーナスを集計しました", "hit", 100, "GOGO!ランプ点灯結果");
    await waitForExperience(720);
    setExperienceStage(2, "BONUS DATA", `BIG ${data.big}回 / REG ${data.reg}回`, data.combinedLabel, "設定を伏せて実績を集計", "judge", 100, "今回のボーナス合算");
    await waitForExperience(760);
    setExperienceStage(3, "8,000G COMPLETE", data.diff >= 0 ? "プラス差枚" : "マイナス差枚", `${data.diff >= 0 ? "+" : ""}${yen.format(data.diff)}枚`, "換金・収支結果を計算します", data.diff >= 0 ? "complete" : "end", 100, "今回の差枚結果");
    await waitForExperience(760);
  }

  async function runMachineExperience() {
    const runId = ++experienceRunId;
    skipExperience();
    experienceSkipped = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;
    openExperience();
    latestResult = null;
    startButton.disabled = true;
    document.getElementById("rankMachineResult").disabled = true;
    document.getElementById("machineResult").classList.remove("has-result", "is-complete");
    document.getElementById("machineExperienceSkip").hidden = false;
    const setting = machine.type === "slot" ? randomSlotSetting() : 0;
    const result = machine.sim.kind === "pachinko" ? runPachinko() : machine.sim.kind === "juggler" ? runJuggler(setting) : runSlot(setting);
    if (machine.sim.kind === "pachinko") await playPachinkoExperience(result, runId);
    else if (machine.sim.kind === "juggler") await playJugglerExperience(result, runId);
    else await playSlotExperience(result, runId);
    if (runId !== experienceRunId) return;
    setExperienceStage(4, "FINAL RESULT", result.title, result.experience.finalValue || `${yen.format(result.payout)}${result.scoreKind === "coins" ? "枚" : "玉"}`, `収支 ${result.balanceYen >= 0 ? "+" : ""}${yen.format(result.balanceYen)}円 / 差${result.scoreKind === "coins" ? "枚" : "玉"} ${result.score >= 0 ? "+" : ""}${yen.format(result.score)}`, result.complete ? "complete" : result.experience.kind === "juggler" ? (result.score >= 0 ? "rush" : "end") : result.experience.upper ? "hyper" : result.experience.entered ? "rush" : "end", 100, "今回の最終結果");
    document.getElementById("machineExperienceSkip").hidden = true;
    await waitForExperience(280);
    renderResult(result);
    showExperienceActions();
    startButton.disabled = false;
    maybeRequestAdBreak();
  }

  startButton.addEventListener("click", runMachineExperience);
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
    const fields = "user_id,nickname,score,score_kind,title,summary,investment,payout,attempts,updated_at";
    const [rankingResult, ownResult] = await Promise.all([
      rankingClient.from("machine_rankings").select(fields).eq("machine_slug", rankingMachineSlug).order("score", { ascending: false }).order("investment", { ascending: true }).limit(50),
      rankingUserId ? rankingClient.from("machine_rankings").select(fields).eq("machine_slug", rankingMachineSlug).eq("user_id", rankingUserId).maybeSingle() : Promise.resolve({ data: null, error: null })
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

  async function registerRanking(rawNickname, button) {
    if (!latestResult) return;
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
        const { data: current, error: currentError } = await rankingClient.from("machine_rankings").select("score,investment").eq("machine_slug", rankingMachineSlug).eq("user_id", rankingUserId).maybeSingle();
        if (currentError) throw currentError;
        const candidate = { score: latestResult.rankScore, investment: latestResult.rankInvestment };
        const isBetter = isBetterRanking(candidate, current);
        if (isBetter) {
          const payload = { user_id: rankingUserId, machine_slug: rankingMachineSlug, nickname, score: latestResult.rankScore, score_kind: latestResult.scoreKind, title: latestResult.title, summary: `${latestResult.setting ? `設定${latestResult.setting}・` : ""}ランキング固定レートで再計算・投資${yen.format(latestResult.rankInvestment)}円`, investment: latestResult.rankInvestment, payout: latestResult.payout, attempts: latestResult.attempts, updated_at: new Date().toISOString() };
          const { error } = await rankingClient.from("machine_rankings").upsert(payload, { onConflict: "user_id,machine_slug" });
          if (error) throw error;
        }
        await refreshPublicRanking();
        document.getElementById("machineRankingNotice").textContent = isBetter ? "自己ベストを公開ランキングへ登録しました。" : "公開中の自己ベストの方が上位です。記録は更新されませんでした。";
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
  initializeRanking();
})();
