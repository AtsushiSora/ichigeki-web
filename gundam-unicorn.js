const UNICORN_SPEC = {
  hitRate: 319.7,
  spinsPerThousandYen: 17,
  ballsPerThousandYen: 250,
  rushEntryRate: 0.6,
  fever3000Rate: 0.2,
  rushContinueRate: 0.81,
  normalPayout: 450,
  rushPayout: 1500,
  maxRushHits: 200
};
const MACHINE_HISTORY_KEY = "ichigekiMachineHistoryV1";
const UNICORN_RANKING_SLUG = "gundam-unicorn--fixed-rate-v1";
let latestUnicornResult = null;
let unicornRankingClient = null;
let unicornRankingMode = "local";
let unicornRankingUserId = null;
let unicornExperienceRunId = 0;
let unicornExperienceSkipped = false;
let unicornExperienceDelayTimer = null;
let unicornExperienceDelayResolve = null;
let unicornExperienceReturnFocus = null;
const UNICORN_SOUND_KEY = "ichigekiExperienceSoundV1";
let unicornSoundEnabled = localStorage.getItem(UNICORN_SOUND_KEY) === "on";
let unicornAudioContext = null;

function formatUnicorn(value) { return new Intl.NumberFormat("ja-JP").format(value); }

function drawUntilHit(rate) {
  let spins = 1;
  while (Math.random() >= 1 / rate) spins += 1;
  return spins;
}

function maybeRequestUnicornAdBreak() {
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

function calculateUnicornSimulation() {
  const spins = drawUntilHit(UNICORN_SPEC.hitRate);
  const firstDraw = Math.random();
  const fever3000 = firstDraw < UNICORN_SPEC.fever3000Rate;
  const rushEntered = firstDraw < UNICORN_SPEC.rushEntryRate;
  let totalPayout = fever3000 ? 3000 : UNICORN_SPEC.normalPayout;
  let totalHits = fever3000 ? 2 : 1;
  let rushHits = 0;
  const flow = [fever3000 ? "3000FEVER" : "初当たり"];

  if (rushEntered) {
    flow.push("RUSH突入");
    while (rushHits < UNICORN_SPEC.maxRushHits && Math.random() < UNICORN_SPEC.rushContinueRate) {
      rushHits += 1;
      totalHits += 1;
      totalPayout += UNICORN_SPEC.rushPayout;
      if (totalHits === 3) flow.push("覚醒HYPER");
    }
    flow.push(rushHits === UNICORN_SPEC.maxRushHits ? "上限到達" : "RUSH終了");
  } else {
    flow.push("通常へ");
  }

  const spinsPerThousandYen = Math.max(10, Math.min(30, Number(document.getElementById("unicornSpinRate")?.value) || UNICORN_SPEC.spinsPerThousandYen));
  const lendBalls = Math.max(200, Number(document.getElementById("unicornLendBalls")?.value) || UNICORN_SPEC.ballsPerThousandYen);
  const exchangeBalls = Math.max(20, Number(document.getElementById("unicornExchangeBalls")?.value) || 28);
  const investmentUnits = Math.ceil(spins / spinsPerThousandYen);
  const investment = investmentUnits * 1000;
  const usedBalls = investmentUnits * lendBalls;
  const diffBalls = totalPayout - usedBalls;
  const exchangeValue = Math.round(totalPayout / exchangeBalls * 100);
  const balanceYen = exchangeValue - investment;
  const rankInvestmentUnits = Math.ceil(spins / UNICORN_SPEC.spinsPerThousandYen);
  const rankInvestment = rankInvestmentUnits * 1000;
  const rankScore = totalPayout - rankInvestmentUnits * UNICORN_SPEC.ballsPerThousandYen;
  const hyperReached = totalHits >= 3;
  const route = !rushEntered ? "通常当たり" : hyperReached ? "覚醒HYPER到達" : fever3000 ? "3000FEVER→RUSH" : "RUSH終了";
  return {
    result: { spins, investment, diffBalls, balanceYen, exchangeValue, lendBalls, exchangeBalls, rankScore, rankInvestment, totalPayout, totalHits, rushHits, rushEntered, fever3000, hyperReached, route, savedAt: new Date().toISOString() },
    flow
  };
}

function updateUnicornSoundButton() {
  const button = document.getElementById("unicornSound");
  if (!button) return;
  button.textContent = unicornSoundEnabled ? "音ON" : "音OFF";
  button.setAttribute("aria-pressed", String(unicornSoundEnabled));
  button.classList.toggle("is-on", unicornSoundEnabled);
}

function playUnicornSound(tone = "normal", force = false) {
  if (!unicornSoundEnabled || (!force && unicornExperienceSkipped)) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    unicornAudioContext ||= new AudioContextClass();
    if (unicornAudioContext.state === "suspended") unicornAudioContext.resume();
    const patterns = {
      normal: [[196, 0, .035]],
      hit: [[523, 0, .06], [784, .09, .07], [1046, .18, .11]],
      judge: [[349, 0, .07], [349, .16, .07]],
      rush: [[523, 0, .05], [784, .07, .07]],
      hyper: [[659, 0, .07], [988, .07, .09], [1318, .16, .13]],
      end: [[246, 0, .08], [196, .1, .12]]
    };
    const now = unicornAudioContext.currentTime;
    (patterns[tone] || patterns.normal).forEach(([frequency, offset, duration]) => {
      const oscillator = unicornAudioContext.createOscillator();
      const gain = unicornAudioContext.createGain();
      oscillator.type = tone === "hyper" ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(frequency, now + offset);
      gain.gain.setValueAtTime(.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(.055, now + offset + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, now + offset + duration);
      oscillator.connect(gain).connect(unicornAudioContext.destination);
      oscillator.start(now + offset);
      oscillator.stop(now + offset + duration + .02);
    });
  } catch { /* Audio is an optional enhancement. */ }
}

function setUnicornExpectation(expectancy, cue) {
  const numeric = Number(expectancy);
  const hasRate = Number.isFinite(numeric);
  const rate = hasRate ? Math.max(0, Math.min(100, numeric)) : 0;
  const displayRate = rate > 0 && rate < 1 ? rate.toFixed(1) : Math.round(rate);
  document.getElementById("unicornExperienceCue").textContent = cue || "NT-D SYSTEM";
  document.getElementById("unicornExperienceChance").textContent = hasRate ? `${displayRate}%` : "抽選中";
  document.getElementById("unicornExperienceChanceBar").style.width = hasRate ? `${Math.max(rate, rate > 0 ? 3 : 0)}%` : "0%";
  const track = document.querySelector(".unicorn-expectation-track");
  track.setAttribute("aria-valuenow", String(hasRate ? rate : 0));
  track.setAttribute("aria-valuetext", hasRate ? `${displayRate}パーセント` : "抽選中");
}

function setUnicornExperienceStage(index, phase, title, value, message, tone = "normal", expectancy = null, cue = "") {
  const experience = document.getElementById("unicornExperience");
  experience.hidden = false;
  experience.dataset.tone = tone;
  document.getElementById("unicornExperienceStep").textContent = `STEP ${index + 1} / 5`;
  document.getElementById("unicornExperiencePhase").textContent = phase;
  document.getElementById("unicornExperienceTitle").textContent = title;
  document.getElementById("unicornExperienceValue").textContent = value;
  document.getElementById("unicornExperienceMessage").textContent = message;
  setUnicornExpectation(expectancy, cue);
  playUnicornSound(tone);
  document.querySelectorAll("[data-experience-step]").forEach(item => {
    const step = Number(item.dataset.experienceStep);
    item.classList.toggle("is-current", step === index);
    item.classList.toggle("is-done", step < index);
  });
}

function waitForUnicornExperience(milliseconds) {
  if (unicornExperienceSkipped) return Promise.resolve();
  return new Promise(resolve => {
    unicornExperienceDelayResolve = resolve;
    unicornExperienceDelayTimer = window.setTimeout(() => {
      unicornExperienceDelayTimer = null;
      unicornExperienceDelayResolve = null;
      resolve();
    }, milliseconds);
  });
}

function skipUnicornExperience() {
  unicornExperienceSkipped = true;
  if (unicornExperienceDelayTimer) window.clearTimeout(unicornExperienceDelayTimer);
  unicornExperienceDelayTimer = null;
  if (unicornExperienceDelayResolve) unicornExperienceDelayResolve();
  unicornExperienceDelayResolve = null;
}

function openUnicornExperience() {
  const experience = document.getElementById("unicornExperience");
  if (!document.body.classList.contains("has-unicorn-experience")) unicornExperienceReturnFocus = document.activeElement;
  experience.hidden = false;
  experience.classList.add("is-fullscreen");
  document.body.classList.add("has-unicorn-experience");
  document.getElementById("unicornExperienceActions").hidden = true;
  document.getElementById("unicornOverlayNickname").value = document.getElementById("unicornRankingNickname").value;
  updateUnicornSoundButton();
}

function closeUnicornExperience() {
  unicornExperienceRunId += 1;
  skipUnicornExperience();
  const experience = document.getElementById("unicornExperience");
  experience.hidden = true;
  experience.classList.remove("is-fullscreen");
  document.body.classList.remove("has-unicorn-experience");
  document.getElementById("unicornStart").disabled = false;
  document.getElementById("unicornStart").classList.remove("is-running");
  document.getElementById("unicornExperienceActions").hidden = true;
  if (unicornExperienceReturnFocus?.focus) unicornExperienceReturnFocus.focus({ preventScroll: true });
}

function showUnicornExperienceActions() {
  const actions = document.getElementById("unicornExperienceActions");
  document.getElementById("unicornOverlayRank").disabled = false;
  document.getElementById("unicornOverlayRank").textContent = "ランキングに登録";
  document.getElementById("unicornOverlayPost").href = document.getElementById("unicornCommunity").href;
  document.getElementById("unicornOverlayNickname").value = document.getElementById("unicornRankingNickname").value;
  actions.hidden = false;
}

async function playUnicornExperience(result, runId) {
  const skipButton = document.getElementById("unicornSkip");
  skipButton.hidden = false;
  setUnicornExperienceStage(0, "NT-D SYSTEM", "通常回転中", "0回転", "大当りを目指して抽選しています", "normal", 100 / UNICORN_SPEC.hitRate, "1回転ごとの大当り確率");
  const checkpoints = [0.04, 0.11, 0.2, 0.33, 0.49, 0.65, 0.8, 0.92, 1];
  for (const checkpoint of checkpoints) {
    if (runId !== unicornExperienceRunId || unicornExperienceSkipped) break;
    const spins = Math.max(1, Math.round(result.spins * checkpoint));
    document.getElementById("unicornExperienceValue").textContent = `${formatUnicorn(spins)}回転`;
    await waitForUnicornExperience(115);
  }

  if (runId !== unicornExperienceRunId) return;
  setUnicornExperienceStage(1, "FEVER", result.fever3000 ? "3000 FEVER" : "大当り！", `${formatUnicorn(result.spins)}回転`, result.fever3000 ? "3,000玉を獲得してRUSHへ" : "RUSH突入をかけたジャッジへ", "hit", 100, result.fever3000 ? "3000 FEVER" : "可能性の獣");
  await waitForUnicornExperience(900);

  if (runId !== unicornExperienceRunId) return;
  setUnicornExperienceStage(2, "RUSH JUDGE", "RUSH突入ジャッジ", "3", "運命の分岐を抽選中", "judge", UNICORN_SPEC.rushEntryRate * 100, "RUSH突入率");
  for (const count of [2, 1]) {
    await waitForUnicornExperience(280);
    if (runId !== unicornExperienceRunId || unicornExperienceSkipped) break;
    document.getElementById("unicornExperienceValue").textContent = String(count);
  }
  await waitForUnicornExperience(320);
  if (runId !== unicornExperienceRunId) return;
  setUnicornExperienceStage(2, "RUSH JUDGE", result.rushEntered ? "RUSH 突入" : "RUSH 非突入", result.rushEntered ? "60% 突破" : "通常へ", result.rushEntered ? "ここから約81%の継続抽選" : "今回の一撃はここで終了", result.rushEntered ? "rush" : "end", result.rushEntered ? 100 : 0, "RUSH判定結果");
  await waitForUnicornExperience(850);

  if (runId !== unicornExperienceRunId) return;
  if (result.rushEntered) {
    const initialHits = result.fever3000 ? 2 : 1;
    const animatedRushHits = Math.min(result.rushHits, 10);
    setUnicornExperienceStage(3, "RUSH MODE", "連チャン演出", `${initialHits}回当たり`, "継続抽選スタート", "rush", UNICORN_SPEC.rushContinueRate * 100, "RUSH継続率");
    await waitForUnicornExperience(400);
    for (let index = 1; index <= animatedRushHits; index += 1) {
      if (runId !== unicornExperienceRunId || unicornExperienceSkipped) break;
      const currentHits = initialHits + index;
      const currentPayout = (result.fever3000 ? 3000 : UNICORN_SPEC.normalPayout) + index * UNICORN_SPEC.rushPayout;
      const reachedHyper = currentHits >= 3;
      setUnicornExperienceStage(3, reachedHyper ? "AWAKENING HYPER" : "RUSH MODE", reachedHyper ? "覚醒HYPER" : "RUSH 継続！", `${currentHits}回 / ${formatUnicorn(currentPayout)}玉`, reachedHyper ? "高速連チャンゾーンへ突入" : "次の継続抽選へ", reachedHyper ? "hyper" : "rush", UNICORN_SPEC.rushContinueRate * 100, reachedHyper ? "覚醒HYPER" : "RUSH継続率");
      await waitForUnicornExperience(reachedHyper && currentHits === 3 ? 650 : 360);
    }
    if (result.rushHits > animatedRushHits && !unicornExperienceSkipped) {
      setUnicornExperienceStage(3, "AWAKENING HYPER", "一気に連チャン！", `${result.totalHits}回 / ${formatUnicorn(result.totalPayout)}玉`, "高速演出で最終結果へ", "hyper", UNICORN_SPEC.rushContinueRate * 100, "覚醒HYPER継続率");
      await waitForUnicornExperience(650);
    }
  } else {
    setUnicornExperienceStage(3, "NORMAL END", "通常へ", "連チャンなし", "最終結果を表示します", "end", 0, "RUSH判定結果");
    await waitForUnicornExperience(450);
  }

  if (runId !== unicornExperienceRunId) return;
  setUnicornExperienceStage(4, "FINAL RESULT", result.route, `${formatUnicorn(result.totalPayout)}玉`, `収支 ${result.balanceYen >= 0 ? "+" : ""}${formatUnicorn(result.balanceYen)}円・差玉 ${result.diffBalls >= 0 ? "+" : ""}${formatUnicorn(result.diffBalls)}玉`, result.hyperReached ? "hyper" : result.rushEntered ? "rush" : "end", 100, "今回の最終結果");
  skipButton.hidden = true;
  await waitForUnicornExperience(350);
}

async function runUnicornSimulation() {
  const runId = ++unicornExperienceRunId;
  skipUnicornExperience();
  unicornExperienceSkipped = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;
  openUnicornExperience();
  latestUnicornResult = null;
  const start = document.getElementById("unicornStart");
  start.disabled = true;
  start.classList.add("is-running");
  document.getElementById("unicornRetry").disabled = true;
  document.getElementById("unicornRank").disabled = true;
  document.getElementById("unicornResult").classList.remove("has-result");
  const { result, flow } = calculateUnicornSimulation();
  await playUnicornExperience(result, runId);
  if (runId !== unicornExperienceRunId) return;
  latestUnicornResult = result;
  renderUnicornResult(result, flow);
  showUnicornExperienceActions();
  start.disabled = false;
  start.classList.remove("is-running");
  maybeRequestUnicornAdBreak();
}

function renderUnicornResult(result, flow) {
  const saveInfo = saveUnicornMachineHistory(result, flow);
  document.getElementById("unicornResultLabel").textContent = result.hyperReached ? "AWAKENING HYPER" : result.rushEntered ? "RUSH RESULT" : "NORMAL RESULT";
  document.getElementById("unicornPayout").textContent = `${formatUnicorn(result.totalPayout)}玉`;
  document.getElementById("unicornHits").textContent = `${result.totalHits}回当たり`;
  document.getElementById("unicornSpins").textContent = `${formatUnicorn(result.spins)}回転`;
  document.getElementById("unicornInvestment").textContent = `${formatUnicorn(result.investment)}円`;
  document.getElementById("unicornCashout").textContent = `${formatUnicorn(result.exchangeValue)}円`;
  document.getElementById("unicornDiff").textContent = `${result.diffBalls >= 0 ? "+" : ""}${formatUnicorn(result.diffBalls)}玉`;
  document.getElementById("unicornDiff").className = result.diffBalls >= 0 ? "is-plus" : "is-minus";
  document.getElementById("unicornBalance").textContent = `${result.balanceYen >= 0 ? "+" : ""}${formatUnicorn(result.balanceYen)}円`;
  document.getElementById("unicornBalance").className = result.balanceYen >= 0 ? "is-plus" : "is-minus";
  document.getElementById("unicornMode").textContent = result.route;
  document.getElementById("unicornFlow").innerHTML = flow.map((item, index) => `<span${index === flow.length - 1 ? ' class="is-current"' : ""}>${item}</span>`).join("<b>›</b>");
  document.getElementById("unicornResult").classList.add("has-result");
  document.getElementById("unicornRetry").disabled = false;
  document.getElementById("unicornAutoSaveStatus").textContent = saveInfo.count === null ? "自動保存できませんでした。ブラウザの保存設定をご確認ください。" : `マイ記録へ自動保存しました（合計${formatUnicorn(saveInfo.count)}回）`;
  document.getElementById("unicornOverlaySaveStatus").textContent = saveInfo.count === null ? "自動保存できませんでした" : saveInfo.newTitles.length ? `称号獲得！ ${saveInfo.newTitles.map(item => item.name).join("・")}` : `マイ記録へ自動保存しました（合計${formatUnicorn(saveInfo.count)}回）`;
  const achievementToast = document.getElementById("unicornAchievementUnlock");
  achievementToast.hidden = saveInfo.newTitles.length === 0;
  if (saveInfo.newTitles.length) achievementToast.querySelector("strong").textContent = saveInfo.newTitles.map(item => item.name).join("・");
  document.getElementById("unicornRank").textContent = "ランキングに登録";
  document.getElementById("unicornRank").disabled = false;
  const summary = `初代ユニコーン｜${formatUnicorn(result.spins)}回転｜${result.route}｜${result.totalHits}回当たり｜${formatUnicorn(result.totalPayout)}玉｜換金${formatUnicorn(result.exchangeValue)}円｜収支${result.balanceYen >= 0 ? "+" : ""}${formatUnicorn(result.balanceYen)}円｜${formatUnicorn(result.lendBalls)}玉貸し・${result.exchangeBalls}玉交換`;
  document.getElementById("unicornCommunity").href = `community.html?machine=gundam-unicorn&compose=simulation&result=${encodeURIComponent(summary)}#simulationComposer`;
}

function readMachineHistory() {
  try {
    const records = JSON.parse(localStorage.getItem(MACHINE_HISTORY_KEY) || "[]");
    return Array.isArray(records) ? records : [];
  } catch { return []; }
}

function saveUnicornMachineHistory(result, flow) {
  const records = readMachineHistory();
  records.unshift({
    id: window.crypto?.randomUUID?.() || `uc-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    slug: "gundam-unicorn",
    machineName: "Pフィーバー機動戦士ガンダムユニコーン",
    shortName: "初代ユニコーン",
    type: "pachinko",
    savedAt: new Date().toISOString(),
    title: result.route,
    summary: `${result.spins}回転で初当り。${result.totalHits}回当たり。`,
    balanceYen: result.balanceYen,
    investment: result.investment,
    exchangeValue: result.exchangeValue,
    payout: result.totalPayout,
    attempts: result.spins,
    score: result.diffBalls,
    scoreKind: "balls",
    rateLabel: `${formatUnicorn(result.lendBalls)}玉貸し・${result.exchangeBalls}玉交換`,
    complete: false,
    entered: result.rushEntered,
    upper: result.hyperReached,
    hits: result.totalHits,
    flow: flow.slice(0, 12)
  });
  try {
    const savedRecords = records.slice(0, 500);
    localStorage.setItem(MACHINE_HISTORY_KEY, JSON.stringify(savedRecords));
    const achievementState = window.ICHIGEKI_ACHIEVEMENTS?.sync(savedRecords);
    updateUnicornBest();
    return { count: Math.min(records.length, 500), newTitles: achievementState?.newlyUnlocked || [] };
  } catch { return { count: null, newTitles: [] }; }
}

function updateUnicornBest() {
  const records = readMachineHistory().filter(record => record.slug === "gundam-unicorn").sort((a, b) => Number(b.payout) - Number(a.payout));
  document.getElementById("unicornBest").textContent = records.length ? `${formatUnicorn(records[0].payout)}玉 / ${records[0].hits || 0}回当たり` : "まだ記録なし";
}

const UNICORN_RANKING_KEY = "ichigekiMachineRankingV2:gundam-unicorn:fixed-rate";

function readUnicornRanking() {
  try {
    const records = JSON.parse(localStorage.getItem(UNICORN_RANKING_KEY) || "[]");
    return Array.isArray(records) ? records : [];
  } catch { return []; }
}

function unicornScoreText(record) {
  const score = Number(record.score) || 0;
  return `${score >= 0 ? "+" : ""}${formatUnicorn(score)}玉`;
}

function unicornRankingDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });
}

function renderUnicornRanking(records, isPublic = false) {
  const sorted = [...records].sort((a, b) => Number(b.score) - Number(a.score) || Number(a.investment) - Number(b.investment)).slice(0, 10);
  const list = document.getElementById("unicornRankingList");
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
      score.textContent = unicornScoreText(record);
      meta.textContent = `投資 ${formatUnicorn(Number(record.investment) || 0)}円・${unicornRankingDate(record.updated_at || record.savedAt || record.created_at)}`;
      item.append(rank, name, score, meta);
      list.appendChild(item);
    });
  }
  document.getElementById("unicornRankingMode").textContent = isPublic ? "みんなのTOP10" : "この端末のTOP10";
  const ownRecords = unicornRankingUserId && isPublic ? sorted.filter(record => record.user_id === unicornRankingUserId) : readUnicornRanking();
  const ownBest = [...ownRecords].sort((a, b) => Number(b.score) - Number(a.score) || Number(a.investment) - Number(b.investment))[0];
  if (ownBest) {
    const self = document.getElementById("unicornRankingSelf");
    self.querySelector("strong").textContent = unicornScoreText(ownBest);
    self.querySelector("small").textContent = `${ownBest.title || ownBest.route || "自己ベスト"}・投資 ${formatUnicorn(Number(ownBest.investment) || 0)}円`;
  }
}

function saveUnicornLocalRanking(nickname) {
  const records = readUnicornRanking();
  const record = { nickname, score: latestUnicornResult.rankScore, investment: latestUnicornResult.rankInvestment, payout: latestUnicornResult.totalPayout, attempts: latestUnicornResult.spins, title: latestUnicornResult.route, savedAt: new Date().toISOString() };
  const existingIndex = records.findIndex(item => item.nickname === nickname);
  if (existingIndex < 0) records.push(record);
  else if (Number(record.score) > Number(records[existingIndex].score) || (Number(record.score) === Number(records[existingIndex].score) && Number(record.investment) < Number(records[existingIndex].investment))) records[existingIndex] = record;
  localStorage.setItem(UNICORN_RANKING_KEY, JSON.stringify(records.sort((a, b) => Number(b.score) - Number(a.score) || Number(a.investment) - Number(b.investment)).slice(0, 20)));
  renderUnicornRanking(readUnicornRanking(), false);
}

function loadUnicornScript(src, id) {
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

async function refreshUnicornPublicRanking() {
  const { data, error } = await unicornRankingClient.from("machine_rankings").select("user_id,nickname,score,title,investment,payout,attempts,updated_at").eq("machine_slug", UNICORN_RANKING_SLUG).order("score", { ascending: false }).order("investment", { ascending: true }).limit(10);
  if (error) throw error;
  renderUnicornRanking(data || [], true);
}

async function initializeUnicornRanking() {
  renderUnicornRanking(readUnicornRanking(), false);
  try {
    await loadUnicornScript("community-config.js", "ichigeki-community-config");
    const config = window.ICHIGEKI_COMMUNITY_CONFIG || {};
    if (!config.supabaseUrl || !config.supabaseAnonKey) throw new Error("公開ランキング未設定");
    await loadUnicornScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2", "ichigeki-supabase-js");
    unicornRankingClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    let { data } = await unicornRankingClient.auth.getSession();
    if (!data.session) {
      const signedIn = await unicornRankingClient.auth.signInAnonymously();
      if (signedIn.error) throw signedIn.error;
      data = { session: signedIn.data.session };
    }
    unicornRankingUserId = data.session?.user?.id || null;
    await refreshUnicornPublicRanking();
    unicornRankingMode = "public";
    document.getElementById("unicornRankingNotice").textContent = "この機種を遊んだみんなの最高記録です。各利用者の自己ベストだけを掲載します。";
  } catch {
    unicornRankingMode = "local";
    document.getElementById("unicornRankingNotice").textContent = "現在はこの端末内のランキングを表示しています。公開ランキング準備後に自動で切り替わります。";
  }
}

const unicornRankingNickname = document.getElementById("unicornRankingNickname");
unicornRankingNickname.value = localStorage.getItem("ichigekiRankingNicknameV1") || "";
document.getElementById("unicornRank")?.addEventListener("click", async event => {
  if (!latestUnicornResult) return;
  const nickname = unicornRankingNickname.value.trim().slice(0, 16);
  if (!nickname) {
    unicornRankingNickname.focus();
    document.getElementById("unicornRankingNotice").textContent = "ランキング表示名を入力してください。";
    return;
  }
  localStorage.setItem("ichigekiRankingNicknameV1", nickname);
  saveUnicornLocalRanking(nickname);
  event.currentTarget.disabled = true;
  event.currentTarget.textContent = "登録中...";
  try {
    if (unicornRankingMode === "public" && unicornRankingClient && unicornRankingUserId) {
      const { data: current, error: currentError } = await unicornRankingClient.from("machine_rankings").select("score,investment").eq("machine_slug", UNICORN_RANKING_SLUG).eq("user_id", unicornRankingUserId).maybeSingle();
      if (currentError) throw currentError;
      const isBetter = !current || Number(latestUnicornResult.rankScore) > Number(current.score) || (Number(latestUnicornResult.rankScore) === Number(current.score) && Number(latestUnicornResult.rankInvestment) < Number(current.investment));
      if (isBetter) {
        const payload = { user_id: unicornRankingUserId, machine_slug: UNICORN_RANKING_SLUG, nickname, score: latestUnicornResult.rankScore, score_kind: "balls", title: latestUnicornResult.route, summary: `初代ユニコーン ${latestUnicornResult.totalHits}回当たり（ランキング固定レート）`, investment: latestUnicornResult.rankInvestment, payout: latestUnicornResult.totalPayout, attempts: latestUnicornResult.spins, updated_at: new Date().toISOString() };
        const { error } = await unicornRankingClient.from("machine_rankings").upsert(payload, { onConflict: "user_id,machine_slug" });
        if (error) throw error;
      }
      await refreshUnicornPublicRanking();
      document.getElementById("unicornRankingNotice").textContent = isBetter ? "自己ベストを公開ランキングへ登録しました。" : "公開中の自己ベストの方が上位です。記録は更新されませんでした。";
    } else {
      document.getElementById("unicornRankingNotice").textContent = "この端末の機種別ランキングへ登録しました。";
    }
    event.currentTarget.textContent = "登録しました";
  } catch {
    unicornRankingMode = "local";
    renderUnicornRanking(readUnicornRanking(), false);
    document.getElementById("unicornRankingNotice").textContent = "端末内ランキングへ登録しました。公開ランキングには現在接続できません。";
    event.currentTarget.textContent = "端末に登録済み";
  }
});

document.getElementById("unicornStart")?.addEventListener("click", runUnicornSimulation);
document.getElementById("unicornRetry")?.addEventListener("click", runUnicornSimulation);
document.getElementById("unicornSound")?.addEventListener("click", () => {
  unicornSoundEnabled = !unicornSoundEnabled;
  localStorage.setItem(UNICORN_SOUND_KEY, unicornSoundEnabled ? "on" : "off");
  updateUnicornSoundButton();
  if (unicornSoundEnabled) playUnicornSound("rush", true);
});
document.getElementById("unicornSkip")?.addEventListener("click", skipUnicornExperience);
document.getElementById("unicornExperienceClose")?.addEventListener("click", closeUnicornExperience);
document.getElementById("unicornOverlayClose")?.addEventListener("click", closeUnicornExperience);
document.getElementById("unicornOverlayRetry")?.addEventListener("click", runUnicornSimulation);
document.getElementById("unicornOverlayPost")?.addEventListener("click", () => {
  document.body.classList.remove("has-unicorn-experience");
});
document.getElementById("unicornOverlayRank")?.addEventListener("click", event => {
  const input = document.getElementById("unicornOverlayNickname");
  const nickname = input.value.trim().slice(0, 16);
  if (!nickname) {
    input.focus();
    event.currentTarget.textContent = "名前を入力してください";
    return;
  }
  unicornRankingNickname.value = nickname;
  document.getElementById("unicornRank").click();
  event.currentTarget.textContent = "登録しました";
  event.currentTarget.disabled = true;
  window.setTimeout(closeUnicornExperience, 450);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !document.getElementById("unicornExperience").hidden) closeUnicornExperience();
});
function updateUnicornAverageInvestment() {
  const rate = Math.max(10, Math.min(30, Number(document.getElementById("unicornSpinRate")?.value) || UNICORN_SPEC.spinsPerThousandYen));
  const exchangeBalls = Math.max(20, Number(document.getElementById("unicornExchangeBalls")?.value) || 28);
  const average = Math.round((UNICORN_SPEC.hitRate / rate * 1000) / 100) * 100;
  document.getElementById("unicornAverageInvestment").textContent = `${formatUnicorn(average)}円`;
  document.getElementById("unicornExchangeValue").textContent = `${(100 / exchangeBalls).toFixed(2)}円/玉`;
}
document.querySelectorAll("#unicornSpinRate, #unicornLendBalls, #unicornExchangeBalls").forEach(input => input.addEventListener("input", updateUnicornAverageInvestment));
updateUnicornAverageInvestment();
updateUnicornSoundButton();
updateUnicornBest();
initializeUnicornRanking();
