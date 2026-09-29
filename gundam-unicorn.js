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
let unicornRankingClient = null;
let unicornRankingMode = "local";
let unicornRankingUserId = null;

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
  maybeRequestUnicornAdBreak();
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
  document.getElementById("unicornRank").textContent = "ランキングに登録";
  document.getElementById("unicornRank").disabled = false;
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

const UNICORN_RANKING_KEY = "ichigekiMachineRankingV1:gundam-unicorn";

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
  const record = { nickname, score: latestUnicornResult.diffBalls, investment: latestUnicornResult.investment, payout: latestUnicornResult.totalPayout, attempts: latestUnicornResult.spins, title: latestUnicornResult.route, savedAt: new Date().toISOString() };
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
  const { data, error } = await unicornRankingClient.from("machine_rankings").select("user_id,nickname,score,title,investment,payout,attempts,updated_at").eq("machine_slug", "gundam-unicorn").order("score", { ascending: false }).order("investment", { ascending: true }).limit(10);
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
      const { data: current, error: currentError } = await unicornRankingClient.from("machine_rankings").select("score,investment").eq("machine_slug", "gundam-unicorn").eq("user_id", unicornRankingUserId).maybeSingle();
      if (currentError) throw currentError;
      const isBetter = !current || Number(latestUnicornResult.diffBalls) > Number(current.score) || (Number(latestUnicornResult.diffBalls) === Number(current.score) && Number(latestUnicornResult.investment) < Number(current.investment));
      if (isBetter) {
        const payload = { user_id: unicornRankingUserId, machine_slug: "gundam-unicorn", nickname, score: latestUnicornResult.diffBalls, score_kind: "balls", title: latestUnicornResult.route, summary: `初代ユニコーン ${latestUnicornResult.totalHits}回当たり`, investment: latestUnicornResult.investment, payout: latestUnicornResult.totalPayout, attempts: latestUnicornResult.spins, updated_at: new Date().toISOString() };
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
document.getElementById("unicornSave")?.addEventListener("click", saveUnicornResult);
function updateUnicornAverageInvestment() {
  const rate = Math.max(10, Math.min(30, Number(document.getElementById("unicornSpinRate")?.value) || UNICORN_SPEC.spinsPerThousandYen));
  const average = Math.round((UNICORN_SPEC.hitRate / rate * 1000) / 100) * 100;
  document.getElementById("unicornAverageInvestment").textContent = `${formatUnicorn(average)}円`;
}
document.getElementById("unicornSpinRate")?.addEventListener("input", updateUnicornAverageInvestment);
updateUnicornAverageInvestment();
updateUnicornBest();
initializeUnicornRanking();
