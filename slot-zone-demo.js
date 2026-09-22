const slotDemoState = { lastZone: null, resultText: "" };

function randomSuccess(rate) { return Math.random() < rate; }

function playChanceZone(label, games, rate, successLabel) {
  const log = [];
  let successAt = 0;
  for (let game = 1; game <= games; game += 1) {
    const success = randomSuccess(rate);
    log.push(`${game}G  ${success ? "チャンス役 → 成功" : "ハズレ"}`);
    if (success) { successAt = game; break; }
  }
  return successAt
    ? { title: `${successLabel} 突破！`, detail: `${label}を${successAt}G目で突破しました。`, log }
    : { title: `${label} 終了`, detail: `${games}Gで突破できませんでした。`, log };
}

function playSpecialZone() {
  const weights = [10, 10, 10, 20, 20, 30, 30, 50, 100, 300];
  const log = [];
  let total = 0;
  for (let game = 1; game <= 10; game += 1) {
    const amount = weights[Math.floor(Math.random() * weights.length)]; total += amount; log.push(`${game}G  +${amount}G`);
  }
  return { title: `TOTAL +${total}G`, detail: `10回の上乗せで合計${total}Gを獲得しました。`, log };
}

function runZone(zone) {
  const result = zone === "cz" ? playChanceZone("チャンスゾーン", 5, 0.125, "AT") : zone === "upper" ? playChanceZone("上位CZ", 4, 0.25, "上位AT") : playSpecialZone();
  slotDemoState.lastZone = zone; slotDemoState.resultText = `${result.title}｜${result.detail}`;
  document.getElementById("zoneResultTitle").textContent = result.title;
  document.getElementById("zoneResultDetail").textContent = result.detail;
  document.getElementById("zoneResultLog").innerHTML = result.log.map(line => `<span>${line}</span>`).join("");
  document.getElementById("zoneResult").classList.add("has-result");
  document.getElementById("retryZone").disabled = false;
  document.getElementById("shareZoneResult").href = `community.html?machine=slot-new&compose=simulation&result=${encodeURIComponent(slotDemoState.resultText)}#simulationComposer`;
  document.getElementById("zoneResult").scrollIntoView({ behavior: "smooth", block: "center" });
}

document.querySelectorAll("[data-zone]").forEach(button => button.addEventListener("click", () => runZone(button.dataset.zone)));
document.getElementById("retryZone")?.addEventListener("click", () => slotDemoState.lastZone && runZone(slotDemoState.lastZone));
