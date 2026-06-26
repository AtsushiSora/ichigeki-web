const yen = new Intl.NumberFormat("ja-JP");

function clampNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function appendLog(id, line) {
  const element = document.getElementById(id);
  if (!element) return;
  const current = element.textContent.trim();
  element.textContent = current ? `${line}\n${current}` : line;
}

function randomHit(rate) {
  return Math.random() < 1 / rate;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setRunningButton(action, isRunning) {
  const button = document.querySelector(`[data-action="${action}"]`);
  if (!button) return;
  if (!button.dataset.idleLabel) button.dataset.idleLabel = button.textContent;
  button.disabled = isRunning;
  button.textContent = isRunning ? "進行中..." : button.dataset.idleLabel;
}

function getSpeedValue() {
  return clampNumber(document.getElementById("animationSpeed")?.value, 3);
}

function getSpeedFactor() {
  const value = getSpeedValue();
  return { 1: 0.55, 2: 0.75, 3: 1, 4: 1.45, 5: 2.1 }[value] || 1;
}

function speedAdjustedDuration(duration) {
  return Math.max(180, Math.round(duration / getSpeedFactor()));
}

function updateSpeedLabel() {
  const label = document.getElementById("speedLabel");
  if (!label) return;
  const names = { 1: "ゆっくり", 2: "遅め", 3: "標準", 4: "速め", 5: "高速" };
  label.textContent = names[getSpeedValue()] || "標準";
}

async function animateCount(id, endValue, suffix, duration = 1200) {
  const element = document.getElementById(id);
  if (!element) return;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion) {
    element.textContent = `${yen.format(endValue)}${suffix}`;
    return;
  }
  duration = speedAdjustedDuration(duration);
  const start = performance.now();
  return new Promise(resolve => {
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(endValue * eased);
      element.textContent = `${yen.format(current)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        element.textContent = `${yen.format(endValue)}${suffix}`;
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

async function animateDecimal(id, endValue, suffix, digits = 1, duration = 1000) {
  const element = document.getElementById(id);
  if (!element) return;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion) {
    element.textContent = `${endValue.toFixed(digits)}${suffix}`;
    return;
  }
  duration = speedAdjustedDuration(duration);
  const start = performance.now();
  return new Promise(resolve => {
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${(endValue * eased).toFixed(digits)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        element.textContent = `${endValue.toFixed(digits)}${suffix}`;
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

async function animateJuggleResult(result) {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion || !result.hitEvents.length) {
    setText("resultGames", `${yen.format(result.games)}G`);
    setText("resultAfterHitGames", result.chain > 0 ? "100G抜け" : "0G");
    setText("resultChain", `${result.chain}連`);
    setText("resultBonus", `BIG ${result.big} / REG ${result.reg}`);
    return;
  }

  const duration = speedAdjustedDuration(Math.min(3200, Math.max(1400, result.games * 7)));
  const start = performance.now();
  let hitIndex = -1;
  return new Promise(resolve => {
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentGame = Math.min(result.games, Math.max(1, Math.round(result.games * eased)));

      while (hitIndex + 1 < result.hitEvents.length && result.hitEvents[hitIndex + 1].game <= currentGame) {
        hitIndex++;
        const hit = result.hitEvents[hitIndex];
        setText("resultChain", `${hit.chain}連`);
        setText("resultBonus", `BIG ${hit.big} / REG ${hit.reg}`);
        setText("log", `${hit.game}Gで${hit.type}当選 / ${hit.chain}連`);
      }

      setText("resultGames", `${yen.format(currentGame)}G`);
      if (hitIndex >= 0) {
        const lastHit = result.hitEvents[hitIndex];
        const afterHitGames = currentGame - lastHit.game;
        setText("resultAfterHitGames", afterHitGames === 0 ? "当たり" : `${Math.min(afterHitGames, 100)}G`);
      } else {
        setText("resultAfterHitGames", "初当たり待ち");
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setText("resultGames", `${yen.format(result.games)}G`);
        setText("resultAfterHitGames", result.chain > 0 ? "100G抜け" : "0G");
        setText("resultChain", `${result.chain}連`);
        setText("resultBonus", `BIG ${result.big} / REG ${result.reg}`);
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

let pachinkoRunning = false;

function simulatePachinko319() {
  const spinsPerUnit = clampNumber(document.getElementById("spinPerUnit")?.value, 17);
  const rushRate = clampNumber(document.getElementById("rushRate")?.value, 60) / 100;
  const continueRate = clampNumber(document.getElementById("continueRate")?.value, 81) / 100;
  const payout = clampNumber(document.getElementById("payout")?.value, 1500);
  const firstPayout = clampNumber(document.getElementById("firstPayout")?.value, 300);
  let spins = 0;
  while (!randomHit(319) && spins < 5000) spins++;
  spins++;
  const investment = Math.ceil(spins / spinsPerUnit) * 1000;
  let totalPayout = firstPayout;
  let chain = 1;
  const enteredRush = Math.random() < rushRate;
  if (enteredRush) {
    while (Math.random() < continueRate && chain < 200) {
      chain++;
      totalPayout += payout;
    }
  }
  const usedBalls = Math.round(investment / 4);
  const diff = totalPayout - usedBalls;
  return { spins, investment, totalPayout, chain, diff, enteredRush, firstPayout, payout };
}

async function runPachinko319() {
  if (pachinkoRunning) return;
  pachinkoRunning = true;
  setRunningButton("pachinko319", true);
  setText("resultSpins", "0回転");
  setText("resultInvestment", "0円");
  setText("resultPayout", "0玉");
  setText("resultChain", "0連");
  setText("resultDiff", "0玉");
  setText("resultRush", "抽選中");
  setText("log", "初当たり抽選中...");

  const result = simulatePachinko319();
  const { spins, investment, totalPayout, chain, diff, enteredRush, firstPayout, payout } = result;
  await animateCount("resultSpins", spins, "回転", Math.min(3000, Math.max(1200, spins * 6)));

  setText("resultRush", enteredRush ? "突入" : "非突入");
  setText("resultChain", "1連");
  setText("resultPayout", `${yen.format(firstPayout)}玉`);
  setText("log", `${spins}回転で大当たり`);
  if (enteredRush) {
    let currentPayout = firstPayout;
    for (let currentChain = 2; currentChain <= chain; currentChain++) {
      await sleep(speedAdjustedDuration(180));
      currentPayout += payout;
      setText("resultChain", `${currentChain}連`);
      setText("resultPayout", `${yen.format(currentPayout)}玉`);
      setText("log", `RUSH継続 ${currentChain}連 / ${yen.format(currentPayout)}玉`);
    }
  }
  await sleep(speedAdjustedDuration(120));
  setText("resultSpins", `${yen.format(spins)}回転`);
  setText("resultInvestment", `${yen.format(investment)}円`);
  setText("resultPayout", `${yen.format(totalPayout)}玉`);
  setText("resultChain", `${chain}連`);
  setText("resultDiff", `${diff > 0 ? "+" : ""}${yen.format(diff)}玉`);
  setText("resultRush", enteredRush ? "突入" : "非突入");
  setText("log", `${spins}回転で大当たり / ${chain}連 / 差玉 ${diff > 0 ? "+" : ""}${yen.format(diff)}玉`);
  setRunningButton("pachinko319", false);
  pachinkoRunning = false;
}

let juggleRunning = false;

function simulateJuggle() {
  const bigRate = 255;
  const regRate = 255;
  const medalsPerUnit = 46;
  const gamesPerUnit = clampNumber(document.getElementById("gamesPerUnit")?.value, 35);
  const costPerGame = medalsPerUnit / gamesPerUnit;
  let games = 0;
  let investment = 0;
  let medals = 0;
  let big = 0;
  let reg = 0;
  let chain = 0;
  let afterHit = 0;
  let started = false;
  const hitEvents = [];
  while (games < 20000) {
    if (medals < costPerGame) {
      investment += 1000;
      medals += medalsPerUnit;
    }
    medals -= costPerGame;
    games++;
    if (started) afterHit++;
    const hitRoll = Math.random();
    const combined = 1 / bigRate + 1 / regRate;
    if (hitRoll < combined) {
      started = true;
      afterHit = 0;
      chain++;
      let type;
      if (Math.random() < 0.5) {
        big++;
        medals += 252;
        type = "BIG";
      } else {
        reg++;
        medals += 96;
        type = "REG";
      }
      hitEvents.push({ game: games, type, chain, big, reg });
    }
    if (started && afterHit >= 100) break;
  }
  const finalMedals = Math.max(0, Math.round(medals));
  const investedMedals = Math.round(investment / 1000 * medalsPerUnit);
  const diff = finalMedals - investedMedals;
  return { games, investment, finalMedals, diff, big, reg, chain, hitEvents };
}

async function runJuggle() {
  if (juggleRunning) return;
  juggleRunning = true;
  setRunningButton("juggle", true);
  setText("resultChain", "0連");
  setText("resultGames", "0G");
  setText("resultAfterHitGames", "初当たり待ち");
  setText("resultInvestment", "0円");
  setText("resultMedals", "0枚");
  setText("resultDiff", "0枚");
  setText("resultBonus", "BIG 0 / REG 0");
  setText("log", "回転中...");

  const result = simulateJuggle();
  await animateJuggleResult(result);
  await sleep(speedAdjustedDuration(160));

  const { games, investment, finalMedals, diff, big, reg, chain } = result;
  setText("resultChain", `${chain}連`);
  setText("resultGames", `${yen.format(games)}G`);
  setText("resultInvestment", `${yen.format(investment)}円`);
  setText("resultMedals", `${yen.format(finalMedals)}枚`);
  setText("resultDiff", `${diff > 0 ? "+" : ""}${yen.format(diff)}枚`);
  setText("resultBonus", `BIG ${big} / REG ${reg}`);
  setText("log", `${games}G / ${chain}連 / BIG ${big} REG ${reg} / 差枚 ${diff > 0 ? "+" : ""}${yen.format(diff)}枚`);
  setRunningButton("juggle", false);
  juggleRunning = false;
}

let hamariRunning = false;

async function runHamari() {
  if (hamariRunning) return;
  hamariRunning = true;
  setRunningButton("hamari", true);
  const rate = clampNumber(document.getElementById("hitRate")?.value, 319);
  const spins = clampNumber(document.getElementById("targetSpins")?.value, 1000);
  const probability = Math.pow((rate - 1) / rate, spins) * 100;
  const hitByThen = 100 - probability;
  setText("resultHamari", "--");
  setText("resultHit", "--");
  setText("resultRate", `1/${yen.format(rate)}`);
  setText("resultSpins", "0回転");
  setText("log", "回転数をカウント中...");
  await animateCount("resultSpins", spins, "回転", Math.min(2200, Math.max(900, spins * 2)));
  await Promise.all([
    animateDecimal("resultHamari", probability, "%", 2, 900),
    animateDecimal("resultHit", hitByThen, "%", 2, 900)
  ]);
  setText("resultHamari", `${probability.toFixed(2)}%`);
  setText("resultHit", `${hitByThen.toFixed(2)}%`);
  setText("resultRate", `1/${yen.format(rate)}`);
  setText("resultSpins", `${yen.format(spins)}回転`);
  setText("log", `1/${rate}で${spins}回転ハマる確率: ${probability.toFixed(2)}%`);
  setRunningButton("hamari", false);
  hamariRunning = false;
}

let continuationRunning = false;

function simulateContinuation() {
  const rate = clampNumber(document.getElementById("continueRate")?.value, 81) / 100;
  const target = clampNumber(document.getElementById("targetChain")?.value, 10);
  const trials = clampNumber(document.getElementById("trials")?.value, 10000);
  let total = 0;
  let reached = 0;
  let best = 0;
  for (let i = 0; i < trials; i++) {
    let chain = 1;
    while (Math.random() < rate && chain < 300) chain++;
    total += chain;
    best = Math.max(best, chain);
    if (chain >= target) reached++;
  }
  return { rate, target, trials, average: total / trials, reach: reached / trials * 100, best };
}

async function runContinuation() {
  if (continuationRunning) return;
  continuationRunning = true;
  setRunningButton("continuation", true);
  setText("resultAverage", "--");
  setText("resultReach", "--");
  setText("resultBest", "--");
  setText("resultTrials", "0回");
  setText("log", "試行中...");

  const result = simulateContinuation();
  await animateCount("resultTrials", result.trials, "回", Math.min(2600, Math.max(1000, result.trials / 12)));
  await Promise.all([
    animateDecimal("resultAverage", result.average, "連", 2, 900),
    animateDecimal("resultReach", result.reach, "%", 2, 900),
    animateCount("resultBest", result.best, "連", 900)
  ]);
  setText("resultAverage", `${result.average.toFixed(2)}連`);
  setText("resultReach", `${result.reach.toFixed(2)}%`);
  setText("resultBest", `${result.best}連`);
  setText("resultTrials", `${yen.format(result.trials)}回`);
  setText("log", `継続率${Math.round(result.rate * 100)}% / 平均 ${result.average.toFixed(2)}連 / 最高 ${result.best}連`);
  setRunningButton("continuation", false);
  continuationRunning = false;
}

let rushRunning = false;

function simulateRush() {
  const rushRate = clampNumber(document.getElementById("rushRate")?.value, 60) / 100;
  const trials = clampNumber(document.getElementById("trials")?.value, 100);
  let success = 0;
  let bestFailStreak = 0;
  let currentFail = 0;
  const events = [];
  for (let i = 0; i < trials; i++) {
    if (Math.random() < rushRate) {
      success++;
      currentFail = 0;
    } else {
      currentFail++;
      bestFailStreak = Math.max(bestFailStreak, currentFail);
    }
    events.push({ trial: i + 1, success, fail: i + 1 - success, bestFailStreak });
  }
  const failed = trials - success;
  return { rushRate, trials, success, failed, bestFailStreak, events };
}

async function animateRushResult(result) {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion) return;
  const duration = speedAdjustedDuration(Math.min(2600, Math.max(1200, result.trials * 20)));
  const start = performance.now();
  let lastIndex = -1;
  return new Promise(resolve => {
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const index = Math.min(result.events.length - 1, Math.max(0, Math.round((result.events.length - 1) * eased)));
      if (index !== lastIndex) {
        lastIndex = index;
        const event = result.events[index];
        const rate = event.success / event.trial * 100;
        setText("resultSuccess", `${event.success}回`);
        setText("resultFail", `${event.fail}回`);
        setText("resultRate", `${rate.toFixed(1)}%`);
        setText("resultStreak", `${event.bestFailStreak}連続`);
        setText("log", `${event.trial}回目まで試行中 / 突破 ${event.success}回`);
      }
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

async function runRush() {
  if (rushRunning) return;
  rushRunning = true;
  setRunningButton("rush", true);
  setText("resultSuccess", "0回");
  setText("resultFail", "0回");
  setText("resultRate", "0.0%");
  setText("resultStreak", "0連続");
  setText("log", "初当たりを試行中...");

  const result = simulateRush();
  await animateRushResult(result);
  await sleep(speedAdjustedDuration(120));
  const { trials, success, failed, bestFailStreak } = result;
  setText("resultSuccess", `${success}回`);
  setText("resultFail", `${failed}回`);
  setText("resultRate", `${(success / trials * 100).toFixed(1)}%`);
  setText("resultStreak", `${bestFailStreak}連続`);
  setText("log", `${trials}回中 ${success}回突破 / 実測 ${(success / trials * 100).toFixed(1)}%`);
  setRunningButton("rush", false);
  rushRunning = false;
}

function copyShareText() {
  const text = document.getElementById("log")?.textContent.trim() || location.href;
  navigator.clipboard?.writeText(`${document.title}\n${text}\n${location.href}`).catch(() => null);
}

document.addEventListener("click", event => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "pachinko319") runPachinko319();
  if (action === "juggle") runJuggle();
  if (action === "hamari") runHamari();
  if (action === "continuation") runContinuation();
  if (action === "rush") runRush();
  if (action === "share") copyShareText();
});

document.addEventListener("input", event => {
  if (event.target?.id === "animationSpeed") updateSpeedLabel();
});

updateSpeedLabel();
