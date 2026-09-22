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
const UNICORN_RECORD_KEY = "ichigekiGundamUnicornRecordsV1";
let latestUnicornResult = null;

function formatUnicorn(value) { return new Intl.NumberFormat("ja-JP").format(value); }

function drawUntilHit(rate) {
  let spins = 1;
  while (Math.random() >= 1 / rate) spins += 1;
  return spins;
}

function runUnicornSimulation() {
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
  const investmentUnits = Math.ceil(spins / spinsPerThousandYen);
  const investment = investmentUnits * 1000;
  const usedBalls = investmentUnits * UNICORN_SPEC.ballsPerThousandYen;
  const diffBalls = totalPayout - usedBalls;
  const hyperReached = totalHits >= 3;
  const route = !rushEntered ? "通常当たり" : hyperReached ? "覚醒HYPER到達" : fever3000 ? "3000FEVER→RUSH" : "RUSH終了";
  latestUnicornResult = { spins, investment, diffBalls, totalPayout, totalHits, rushHits, rushEntered, fever3000, hyperReached, route, savedAt: new Date().toISOString() };
  renderUnicornResult(latestUnicornResult, flow);
}

function renderUnicornResult(result, flow) {
  document.getElementById("unicornResultLabel").textContent = result.hyperReached ? "AWAKENING HYPER" : result.rushEntered ? "RUSH RESULT" : "NORMAL RESULT";
  document.getElementById("unicornPayout").textContent = `${formatUnicorn(result.totalPayout)}玉`;
  document.getElementById("unicornHits").textContent = `${result.totalHits}回当たり`;
  document.getElementById("unicornSpins").textContent = `${formatUnicorn(result.spins)}回転`;
  document.getElementById("unicornInvestment").textContent = `${formatUnicorn(result.investment)}円`;
  document.getElementById("unicornDiff").textContent = `${result.diffBalls >= 0 ? "+" : ""}${formatUnicorn(result.diffBalls)}玉`;
  document.getElementById("unicornDiff").className = result.diffBalls >= 0 ? "is-plus" : "is-minus";
  document.getElementById("unicornMode").textContent = result.route;
  document.getElementById("unicornFlow").innerHTML = flow.map((item, index) => `<span${index === flow.length - 1 ? ' class="is-current"' : ""}>${item}</span>`).join("<b>›</b>");
  document.getElementById("unicornResult").classList.add("has-result");
  document.getElementById("unicornRetry").disabled = false;
  document.getElementById("unicornSave").textContent = "端末に記録";
  document.getElementById("unicornSave").disabled = false;
  const summary = `初代ユニコーン｜${formatUnicorn(result.spins)}回転｜${result.route}｜${result.totalHits}回当たり｜${formatUnicorn(result.totalPayout)}玉｜差玉${result.diffBalls >= 0 ? "+" : ""}${formatUnicorn(result.diffBalls)}玉`;
  document.getElementById("unicornCommunity").href = `community.html?machine=gundam-unicorn&compose=simulation&result=${encodeURIComponent(summary)}#simulationComposer`;
}

function readUnicornRecords() {
  try { return JSON.parse(localStorage.getItem(UNICORN_RECORD_KEY) || "[]"); } catch { return []; }
}

function updateUnicornBest() {
  const records = readUnicornRecords().sort((a, b) => b.totalPayout - a.totalPayout);
  document.getElementById("unicornBest").textContent = records.length ? `${formatUnicorn(records[0].totalPayout)}玉 / ${records[0].totalHits}回当たり` : "まだ記録なし";
}

function saveUnicornResult() {
  if (!latestUnicornResult) return;
  const records = readUnicornRecords();
  records.unshift({ ...latestUnicornResult, id: window.crypto?.randomUUID?.() || `uc-${Date.now()}` });
  localStorage.setItem(UNICORN_RECORD_KEY, JSON.stringify(records.slice(0, 100)));
  document.getElementById("unicornSave").textContent = "保存しました";
  document.getElementById("unicornSave").disabled = true;
  updateUnicornBest();
}

document.getElementById("unicornStart")?.addEventListener("click", runUnicornSimulation);
document.getElementById("unicornRetry")?.addEventListener("click", runUnicornSimulation);
document.getElementById("unicornSave")?.addEventListener("click", saveUnicornResult);
function updateUnicornAverageInvestment() {
  const rate = Math.max(10, Math.min(30, Number(document.getElementById("unicornSpinRate")?.value) || UNICORN_SPEC.spinsPerThousandYen));
  const average = Math.round((UNICORN_SPEC.hitRate / rate * 1000) / 100) * 100;
  document.getElementById("unicornAverageInvestment").textContent = `${formatUnicorn(average)}円`;
}
document.getElementById("unicornSpinRate")?.addEventListener("input", updateUnicornAverageInvestment);
updateUnicornAverageInvestment();
updateUnicornBest();
