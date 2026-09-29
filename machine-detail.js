(function () {
  const slug = document.body.dataset.machine;
  const machines = window.ICHIGEKI_MACHINES || {};
  const machine = machines[slug];
  const app = document.getElementById("machineApp");
  if (!machine || !app) return;

  const yen = new Intl.NumberFormat("ja-JP");
  const ordered = Object.entries(machines).sort((a, b) => a[1].order - b[1].order);
  let latestResult = null;

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

  function controlMarkup() {
    if (machine.sim.kind === "pachinko") {
      return `<label class="machine-control"><span>1,000円あたり回転数</span><input id="playRate" type="number" min="${machine.sim.minSpins}" max="${machine.sim.maxSpins}" step="0.1" value="${machine.sim.spinsPer1k}"><small>${machine.sim.startType}の初期値。実際の台に合わせて変更できます。</small></label>`;
    }
    return `<div class="machine-control-grid"><label class="machine-control"><span>50枚あたりゲーム数</span><input id="baseRate" type="number" min="20" max="60" step="0.1" value="${machine.sim.base50}"><small>現金投資の計算に使用</small></label><label class="machine-control"><span>コイン単価</span><input id="coinUnit" type="number" min="1" max="6" step="0.1" value="${machine.sim.coinUnit}"><small>荒さと台売上指標に使用</small></label></div>`;
  }

  function simulationLabels() {
    if (machine.sim.kind === "pachinko") return [machine.sim.hitLabel, machine.sim.rushLabel, "総出玉"];
    return [machine.sim.triggerLabel, machine.sim.mainLabel, machine.sim.upperLabel];
  }

  const labels = simulationLabels();
  const neighbors = ordered.filter(([key]) => key !== slug).slice(0, 5);
  app.innerHTML = `
    <section class="machine-archive-hero theme-${machine.theme}">
      <div><span class="machine-kind">${machine.year.includes("2026") ? "NEW MACHINE 2026" : machine.type === "slot" ? "POPULAR SLOT ARCHIVE" : "POPULAR PACHINKO ARCHIVE"}</span><h1>${machine.name}</h1><p>${machine.catchcopy}</p></div>
      <dl><div><dt>導入</dt><dd>${machine.year}</dd></div><div><dt>メーカー</dt><dd>${machine.maker}</dd></div><div><dt>分類</dt><dd>${machine.type === "slot" ? "パチスロ" : "パチンコ"}</dd></div></dl>
    </section>

    <nav class="machine-quick-nav" aria-label="ページ内メニュー"><a href="#spec">スペック</a><a href="#simulator">シミュレーター</a><a href="#article">記事</a><a href="community.html?machine=${slug}">投稿を見る</a></nav>

    <section class="machine-intro" id="spec">
      <div><span class="machine-section-label">SPEC GUIDE</span><h2>主要スペック</h2><p>${machine.intro}</p><ul>${machine.points.map(point => `<li>${point}</li>`).join("")}</ul></div>
      <div class="machine-spec-grid">${machine.specs.map(([key, value]) => `<div><span>${key}</span><strong>${value}</strong></div>`).join("")}</div>
    </section>

    <section class="machine-simulator" id="simulator">
      <div class="machine-sim-head"><div><span class="machine-section-label">SIMULATOR</span><h2>${machine.shortName} 簡易シミュレーター</h2></div><span class="machine-sim-badge">娯楽用</span></div>
      <p class="machine-sim-note">公表スペックをもとに流れを簡略化しています。実機の全抽選、設定差、釘、交換率、持ち玉比率は再現していません。</p>
      <div class="machine-sim-layout">
        <div class="machine-sim-controls">${controlMarkup()}<div class="machine-average-grid" id="averageGrid"></div><button class="machine-start-button is-sticky" id="machineStart" type="button"><span>START</span><small>${labels.join(" → ")}</small></button></div>
        <div class="machine-result" id="machineResult" aria-live="polite"><span>RESULT</span><strong id="resultTitle">STARTを押してください</strong><p id="resultSummary">平均値と今回の結果を比較できます。</p><div class="machine-result-stats" id="resultStats"></div><div class="machine-flow" id="resultFlow"></div><div class="machine-result-actions"><button class="button" id="saveMachineResult" type="button" disabled>端末に記録</button><a class="button primary" id="shareMachineResult" href="community.html?machine=${slug}&compose=simulation#simulationComposer">結果を投稿</a></div></div>
      </div>
    </section>

    <section class="machine-article-layout" id="article">
      <article class="machine-article">
        <span class="machine-section-label">MACHINE ARTICLE</span><h2>${machine.name}の見どころ</h2>
        <p>${machine.intro}</p>
        <h3>このページの投資計算</h3>
        <p>${machine.sim.kind === "pachinko" ? "パチンコは入力した1,000円あたり回転数で初当りまでの投資を計算します。デカヘソ機と通常ヘソ機は別の初期回転率を設定し、利用者が実測値へ変更できます。" : "パチスロの現金投資は50枚あたりゲーム数から計算します。コイン単価はホール売上と出玉の荒さを見る指標で、プレイヤーの現金投資額と同じ数字ではないため別表示にしています。"}</p>
        <h3>シミュレーターの楽しみ方</h3>
        <p>${machine.type === "slot" ? `${machine.sim.triggerLabel}から${machine.sim.mainLabel}、${machine.sim.upperChallenge}を経て${machine.sim.upperLabel}を目指します。` : `${machine.sim.hitLabel}までの回転数を抽選し、${machine.sim.rushLabel}への突入と継続を計算します。`} 結果は専用のシミュレーション投稿フォームへ送れます。</p>
        <h3>参照情報</h3><ul class="machine-sources">${machine.sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a></li>`).join("")}</ul>
      </article>
      <aside class="machine-side-list"><strong>次に試す人気機種</strong>${neighbors.map(([key, item]) => `<a href="${key}.html"><span>${item.type === "slot" ? "SLOT" : "PACHINKO"}</span>${item.shortName}</a>`).join("")}</aside>
    </section>`;

  function updateAverages() {
    const grid = document.getElementById("averageGrid");
    if (machine.sim.kind === "pachinko") {
      const rate = Math.max(machine.sim.minSpins, Math.min(machine.sim.maxSpins, Number(document.getElementById("playRate").value) || machine.sim.spinsPer1k));
      const averageInvestment = Math.round((machine.sim.hitRate / rate * 1000) / 100) * 100;
      grid.innerHTML = `<div><span>平均初当り</span><strong>${machine.sim.hitRate.toFixed(1)}回転</strong></div><div><span>平均投資目安</span><strong>${yen.format(averageInvestment)}円</strong></div><div><span>スタート</span><strong>${machine.sim.startType}</strong></div>`;
    } else {
      const base = Math.max(20, Number(document.getElementById("baseRate").value) || machine.sim.base50);
      const coinUnit = Math.max(1, Number(document.getElementById("coinUnit").value) || machine.sim.coinUnit);
      const averageInvestment = Math.round((machine.sim.mainRate / base * 1000) / 100) * 100;
      const averageCoinIn = machine.sim.mainRate / base * 50;
      const salesIndex = Math.round(averageCoinIn * coinUnit);
      grid.innerHTML = `<div><span>平均${machine.sim.mainLabel}まで</span><strong>${machine.sim.mainRate.toFixed(1)}G</strong></div><div><span>平均投資目安</span><strong>${yen.format(averageInvestment)}円</strong></div><div><span>コイン単価</span><strong>${coinUnit.toFixed(1)}円・${riskLabel(coinUnit)}</strong></div><div><span>単価換算の台売上指標</span><strong>${yen.format(salesIndex)}円</strong></div>`;
    }
  }

  function runPachinko() {
    const sim = machine.sim;
    const playRate = Math.max(sim.minSpins, Math.min(sim.maxSpins, Number(document.getElementById("playRate").value) || sim.spinsPer1k));
    const spins = geometric(sim.hitRate);
    const investment = Math.ceil(spins / playRate) * 1000;
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
        if (!upper && sim.upperLabel && Math.random() < (sim.upperUpgradeChance || 0)) {
          upper = true;
          flow.push(`${sim.upperLabel}昇格`);
        }
      }
      flow.push(`${hits}回当たりで終了`);
    }
    const usedBalls = investment / 4;
    const diff = payout - usedBalls;
    const rushResultLabel = upper ? sim.upperLabel : rush ? sim.rushLabel : "通常";
    return { title: rush ? `${rushResultLabel} ${hits}回当たり` : "通常へ", summary: `${spins}回転で初当り。${upper ? `${sim.upperLabel}まで到達しました。` : rush ? `${sim.rushLabel}に突入しました。` : "RUSHには突入しませんでした。"}`, stats: [["今回の回転数", `${yen.format(spins)}回転`], ["投資目安", `${yen.format(investment)}円`], ["総出玉", `${yen.format(payout)}玉`], ["差玉目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}玉`]], flow, share: `${machine.shortName}｜${yen.format(spins)}回転｜投資${yen.format(investment)}円｜${rushResultLabel}｜${hits}回当たり｜${yen.format(payout)}玉｜差玉${diff >= 0 ? "+" : ""}${yen.format(diff)}玉` };
  }

  function runSlot() {
    const sim = machine.sim;
    const base = Math.max(20, Number(document.getElementById("baseRate").value) || sim.base50);
    const coinUnit = Math.max(1, Number(document.getElementById("coinUnit").value) || sim.coinUnit);
    const games = geometric(sim.triggerRate);
    const investment = Math.ceil(games / base) * 1000;
    const usedCoins = Math.ceil(games / base) * 50;
    const flow = [`${games}Gで${sim.triggerLabel}`];
    let payout = 0;
    let entered = Math.random() < sim.triggerSuccess;
    let upper = false;
    if (!entered) {
      flow.push(`${sim.mainLabel}非突入`);
    } else {
      payout = randomInt(sim.normalMin, sim.normalMax);
      flow.push(`${sim.mainLabel}突入`);
      if (Math.random() < sim.specialChance) { const add = randomInt(sim.specialMin, sim.specialMax); payout += add; flow.push(`${sim.specialLabel} +${add}枚`); }
      if (Math.random() < sim.upperChance) {
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
    const diff = payout - usedCoins;
    const salesIndex = Math.round(usedCoins * coinUnit);
    return { title: upper ? `${sim.upperLabel}到達` : entered ? `${sim.mainLabel}終了` : `${sim.triggerLabel}失敗`, summary: `${games}Gで${sim.triggerLabel}。${entered ? `${payout}枚を獲得しました。` : `${sim.mainLabel}には届きませんでした。`}`, stats: [["今回のゲーム数", `${yen.format(games)}G`], ["現金投資目安", `${yen.format(investment)}円`], ["獲得枚数", `${yen.format(payout)}枚`], ["差枚目安", `${diff >= 0 ? "+" : ""}${yen.format(diff)}枚`], ["コイン単価", `${coinUnit.toFixed(1)}円・${riskLabel(coinUnit)}`], ["単価換算の台売上指標", `${yen.format(salesIndex)}円`]], flow, share: `${machine.shortName}｜${yen.format(games)}G｜投資${yen.format(investment)}円｜${upper ? sim.upperLabel : entered ? sim.mainLabel : sim.triggerLabel + "失敗"}｜${yen.format(payout)}枚｜差枚${diff >= 0 ? "+" : ""}${yen.format(diff)}枚｜コイン単価${coinUnit.toFixed(1)}円` };
  }

  function renderResult(result) {
    latestResult = result;
    document.getElementById("resultTitle").textContent = result.title;
    document.getElementById("resultSummary").textContent = result.summary;
    document.getElementById("resultStats").innerHTML = result.stats.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
    document.getElementById("resultFlow").innerHTML = result.flow.map(item => `<span>${item}</span>`).join("<b>›</b>");
    document.getElementById("machineResult").classList.add("has-result");
    document.getElementById("saveMachineResult").disabled = false;
    document.getElementById("shareMachineResult").href = `community.html?machine=${slug}&compose=simulation&result=${encodeURIComponent(result.share)}#simulationComposer`;
  }

  const startButton = document.getElementById("machineStart");
  document.body.classList.add("has-machine-sticky-start");
  startButton.addEventListener("click", () => {
    renderResult(machine.sim.kind === "pachinko" ? runPachinko() : runSlot());
    if (startButton.classList.contains("is-sticky")) {
      const actions = document.querySelector(".machine-result-actions");
      actions.before(startButton);
      startButton.classList.remove("is-sticky");
      startButton.classList.add("is-result-position");
      document.body.classList.remove("has-machine-sticky-start");
      document.getElementById("machineResult").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  document.querySelectorAll("#playRate, #baseRate, #coinUnit").forEach(input => input.addEventListener("input", updateAverages));
  document.getElementById("saveMachineResult").addEventListener("click", event => {
    if (!latestResult) return;
    const key = `ichigekiMachineRecords:${slug}`;
    let records = [];
    try { records = JSON.parse(localStorage.getItem(key) || "[]"); } catch { records = []; }
    records.unshift({ ...latestResult, savedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(records.slice(0, 50)));
    event.currentTarget.textContent = "保存しました";
    event.currentTarget.disabled = true;
  });
  updateAverages();
})();
