(() => {
  const STORAGE_KEY = "ichigekiMachineHistoryV1";
  const PAGE_SIZE = 20;
  const number = new Intl.NumberFormat("ja-JP");
  const machines = window.ICHIGEKI_MACHINES || {};
  let records = readRecords();
  let activeFilter = "all";
  let activeSlug = "";
  let visibleCount = PAGE_SIZE;

  const $ = id => document.getElementById(id);
  const numeric = value => Number.isFinite(Number(value)) ? Number(value) : 0;
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  const signedYen = value => `${numeric(value) >= 0 ? "+" : "−"}¥${number.format(Math.abs(numeric(value)))}`;
  const payoutUnit = record => record.scoreKind === "coins" || record.type === "slot" ? "枚" : "玉";
  const attemptUnit = record => record.type === "slot" ? "G" : "回転";
  const machineTitle = record => record.shortName || machines[record.slug]?.shortName || record.machineName || "機種名なし";
  const machineType = record => record.type === "slot" ? "slot" : "pachinko";
  const timestamp = record => {
    const time = new Date(record.savedAt).getTime();
    return Number.isFinite(time) ? time : 0;
  };

  function readRecords() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter(item => item && typeof item === "object") : [];
    } catch { return []; }
  }

  function writeRecords() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 500))); } catch {}
  }

  function shortDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "日時不明";
    return date.toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  function dayDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("ja-JP", { year: "numeric", month: "numeric", day: "numeric" });
  }

  function filteredRecords() {
    let output = [...records];
    if (activeFilter === "pachinko") output = output.filter(record => machineType(record) === "pachinko");
    if (activeFilter === "slot") output = output.filter(record => machineType(record) === "slot");
    if (activeFilter === "win") output = output.filter(record => numeric(record.balanceYen) > 0);
    if (activeSlug) output = output.filter(record => record.slug === activeSlug);
    const sort = $("machineHistorySort")?.value || "recent";
    if (sort === "best") output.sort((a, b) => numeric(b.balanceYen) - numeric(a.balanceYen));
    else if (sort === "worst") output.sort((a, b) => numeric(a.balanceYen) - numeric(b.balanceYen));
    else if (sort === "payout") output.sort((a, b) => numeric(b.payout) - numeric(a.payout));
    else output.sort((a, b) => timestamp(b) - timestamp(a));
    return output;
  }

  function groupRecords(source) {
    const grouped = new Map();
    source.forEach(record => {
      const key = record.slug || "unknown";
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(record);
    });
    return [...grouped.entries()].map(([slug, items]) => {
      const best = [...items].sort((a, b) => numeric(b.balanceYen) - numeric(a.balanceYen))[0];
      return {
        slug,
        items,
        type: machineType(items[0]),
        name: machineTitle(items[0]),
        best,
        total: items.reduce((sum, item) => sum + numeric(item.balanceYen), 0),
        average: Math.round(items.reduce((sum, item) => sum + numeric(item.balanceYen), 0) / items.length),
        wins: items.filter(item => numeric(item.balanceYen) > 0).length,
        lastPlayed: Math.max(...items.map(timestamp))
      };
    }).sort((a, b) => b.items.length - a.items.length || b.lastPlayed - a.lastPlayed);
  }

  function renderSummary() {
    const count = records.length;
    const wins = records.filter(record => numeric(record.balanceYen) > 0).length;
    const total = records.reduce((sum, record) => sum + numeric(record.balanceYen), 0);
    const best = [...records].sort((a, b) => numeric(b.balanceYen) - numeric(a.balanceYen))[0];
    const maxPayout = [...records].sort((a, b) => numeric(b.payout) - numeric(a.payout))[0];
    const groups = groupRecords(records);
    const mostPlayed = groups[0];
    const dates = records.map(timestamp).filter(Boolean).sort((a, b) => a - b);

    $("recordTotalCount").textContent = `${number.format(count)}回`;
    $("recordBestBalance").textContent = best ? signedYen(best.balanceYen) : "--";
    $("recordBestMachine").textContent = best ? `${machineTitle(best)}・${shortDate(best.savedAt)}` : "最初の記録を残そう";
    $("recordWinRate").textContent = count ? `${Math.round(wins / count * 100)}%` : "--";
    $("recordWinCount").textContent = `${number.format(wins)}勝 / ${number.format(count)}回`;
    $("recordTotalBalance").textContent = count ? signedYen(total) : "--";
    $("recordAverageBalance").textContent = count ? signedYen(Math.round(total / count)) : "--";
    $("recordMaxPayout").textContent = maxPayout ? `${number.format(numeric(maxPayout.payout))}${payoutUnit(maxPayout)}` : "--";
    $("recordMaxPayoutMachine").textContent = maxPayout ? machineTitle(maxPayout) : "機種別の単位で表示";
    $("recordMostPlayed").textContent = mostPlayed?.name || "--";
    $("recordMostPlayedCount").textContent = mostPlayed ? `${number.format(mostPlayed.items.length)}回プレイ` : "0回";
    $("recordUpperCount").textContent = `${number.format(records.filter(record => record.upper).length)}回`;
    $("recordCompleteCount").textContent = `${number.format(records.filter(record => record.complete).length)}回`;
    const coinTotal = records.filter(record => machineType(record) === "slot").reduce((sum, record) => sum + numeric(record.score), 0);
    const ballTotal = records.filter(record => machineType(record) === "pachinko").reduce((sum, record) => sum + numeric(record.score), 0);
    $("recordCoinTotal").textContent = records.some(record => machineType(record) === "slot") ? `${coinTotal >= 0 ? "+" : "−"}${number.format(Math.abs(coinTotal))}枚` : "--";
    $("recordBallTotal").textContent = records.some(record => machineType(record) === "pachinko") ? `${ballTotal >= 0 ? "+" : "−"}${number.format(Math.abs(ballTotal))}玉` : "--";
    $("recordSummaryPeriod").textContent = dates.length ? `${dayDate(dates[0])} 〜 ${dayDate(dates[dates.length - 1])}` : "まだ記録がありません";
  }

  function renderPlayStyle() {
    const renderType = (type, prefix) => {
      const items = records.filter(record => machineType(record) === type);
      const wins = items.filter(record => numeric(record.balanceYen) > 0).length;
      const total = items.reduce((sum, record) => sum + numeric(record.balanceYen), 0);
      const favorite = groupRecords(items)[0];
      const entered = items.filter(record => record.entered || record.upper).length;
      $(`record${prefix}Count`).textContent = `${number.format(items.length)}回`;
      $(`record${prefix}WinRate`).textContent = items.length ? `${Math.round(wins / items.length * 100)}%` : "--";
      $(`record${prefix}Balance`).textContent = items.length ? signedYen(total) : "--";
      $(`record${prefix}Favorite`).textContent = favorite?.name || "--";
      $(`record${prefix}Upper`).textContent = `${number.format(entered)}回`;
    };

    renderType("pachinko", "Pachinko");
    renderType("slot", "Slot");

    const recent = [...records].sort((a, b) => timestamp(b) - timestamp(a)).slice(0, 5);
    const recentWins = recent.filter(record => numeric(record.balanceYen) > 0).length;
    const recentLosses = recent.filter(record => numeric(record.balanceYen) < 0).length;
    const recentTotal = recent.reduce((sum, record) => sum + numeric(record.balanceYen), 0);
    const recentForm = $("recordRecentForm");
    $("recordRecentCount").textContent = `${number.format(recent.length)}回`;
    recentForm.innerHTML = recent.length
      ? recent.map(record => {
          const balance = numeric(record.balanceYen);
          const state = balance > 0 ? "is-win" : balance < 0 ? "is-loss" : "is-draw";
          const label = balance > 0 ? "勝ち" : balance < 0 ? "負け" : "引き分け";
          return `<i class="${state}" aria-label="${label}" title="${escapeHtml(machineTitle(record))}：${signedYen(balance)}"></i>`;
        }).join("")
      : '<i class="is-empty" aria-hidden="true"></i><i class="is-empty" aria-hidden="true"></i><i class="is-empty" aria-hidden="true"></i><i class="is-empty" aria-hidden="true"></i><i class="is-empty" aria-hidden="true"></i>';

    if (!recent.length) {
      $("recordRecentTitle").textContent = "まだ記録がありません";
      $("recordRecentSummary").textContent = "遊ぶと直近の勝敗と収支を表示します。";
      recentForm.setAttribute("aria-label", "直近の記録はまだありません");
      return;
    }

    const firstSign = Math.sign(numeric(recent[0].balanceYen));
    let streak = firstSign === 0 ? 0 : 1;
    while (streak < recent.length && Math.sign(numeric(recent[streak].balanceYen)) === firstSign) streak += 1;
    $("recordRecentTitle").textContent = streak >= 2
      ? `${streak}連${firstSign > 0 ? "勝" : "敗"}中`
      : `直近${recent.length}回：${recentWins}勝${recentLosses}敗`;
    $("recordRecentSummary").textContent = `合計 ${signedYen(recentTotal)}・平均 ${signedYen(Math.round(recentTotal / recent.length))}`;
    recentForm.setAttribute("aria-label", `直近${recent.length}回は${recentWins}勝${recentLosses}敗、合計${signedYen(recentTotal)}`);
  }

  function renderTrend() {
    const chart = $("recordTrendChart");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      const next = new Date(date);
      next.setDate(date.getDate() + 1);
      const items = records.filter(record => {
        const time = timestamp(record);
        return time >= date.getTime() && time < next.getTime();
      });
      return { date, count: items.length, balance: items.reduce((sum, item) => sum + numeric(item.balanceYen), 0) };
    });
    const max = Math.max(1, ...days.map(day => Math.abs(day.balance)));
    chart.innerHTML = days.map(day => {
      const height = day.count ? Math.max(8, Math.round(Math.abs(day.balance) / max * 86)) : 4;
      const label = day.date.toLocaleDateString("ja-JP", { weekday: "short" });
      const value = day.count ? `${day.balance >= 0 ? "+" : "−"}¥${number.format(Math.abs(day.balance))}` : "--";
      return `<div class="my-records-trend-day"><div class="my-records-trend-value">${escapeHtml(value)}</div><div class="my-records-trend-bar-wrap"><i class="${day.balance >= 0 ? "is-plus" : "is-minus"}" style="height:${height}%"></i></div><strong>${escapeHtml(label)}</strong><small>${number.format(day.count)}回</small></div>`;
    }).join("");
    const weekItems = days.reduce((sum, day) => sum + day.count, 0);
    const weekBalance = days.reduce((sum, day) => sum + day.balance, 0);
    $("recordTrendSummary").textContent = weekItems ? `${weekItems}回・${signedYen(weekBalance)}` : "記録が増えるとグラフになります";
  }

  function renderAchievements() {
    const achievements = window.ICHIGEKI_ACHIEVEMENTS;
    if (!achievements) return;
    const state = achievements.sync(records);
    const unlocked = state.items.filter(item => item.unlocked);
    $("recordUnlockedCount").textContent = `${number.format(unlocked.length)} / ${number.format(state.items.length)} 獲得`;
    $("selectedAchievementMark").textContent = state.selected?.mark || "?";
    $("selectedAchievementName").textContent = state.selected?.name || "称号未獲得";
    $("selectedAchievementDescription").textContent = state.selected?.description || "最初のシミュレーションを遊んでみよう";

    const progress = $("nextAchievementBar");
    const progressWrap = progress.closest(".achievement-progress");
    if (state.next) {
      $("nextAchievementName").textContent = state.next.name;
      $("nextAchievementDescription").textContent = state.next.description;
      $("nextAchievementProgress").textContent = `${number.format(Math.min(state.next.value, state.next.target))} / ${number.format(state.next.target)}${state.next.unit || ""}`;
      progress.style.width = `${state.next.progress}%`;
      progressWrap.setAttribute("aria-valuenow", String(state.next.progress));
      progressWrap.setAttribute("aria-valuetext", `${state.next.name}まで${state.next.progress}%`);
    } else {
      $("nextAchievementName").textContent = "全称号獲得！";
      $("nextAchievementDescription").textContent = "すべての実績を達成しました";
      $("nextAchievementProgress").textContent = "COMPLETE";
      progress.style.width = "100%";
      progressWrap.setAttribute("aria-valuenow", "100");
      progressWrap.setAttribute("aria-valuetext", "すべて獲得済み");
    }

    $("achievementBadgeGrid").innerHTML = state.items.map(item => `<button type="button" class="achievement-badge${item.unlocked ? " is-unlocked" : " is-locked"}${state.selected?.id === item.id ? " is-selected" : ""}" data-achievement-id="${escapeHtml(item.id)}" ${item.unlocked ? "" : "disabled"} aria-pressed="${state.selected?.id === item.id}"><b>${escapeHtml(item.mark)}</b><span><strong>${escapeHtml(item.name)}</strong><small>${item.unlocked ? "獲得済み・タップで設定" : escapeHtml(item.description)}</small></span>${item.unlocked ? "<i>GET</i>" : `<i>${item.progress}%</i>`}</button>`).join("");
  }

  function renderMachineCards() {
    const source = records.filter(record => {
      if (activeFilter === "pachinko") return machineType(record) === "pachinko";
      if (activeFilter === "slot") return machineType(record) === "slot";
      if (activeFilter === "win") return numeric(record.balanceYen) > 0;
      return true;
    });
    const groups = groupRecords(source);
    const container = $("machineRecordSummaryList");
    if (!groups.length) {
      container.innerHTML = `<p class="my-records-filter-empty">この条件の機種記録はまだありません。</p>`;
      return;
    }
    container.innerHTML = groups.map(group => {
      const rate = Math.round(group.wins / group.items.length * 100);
      const selected = activeSlug === group.slug;
      return `<article class="my-records-machine-card${selected ? " is-selected" : ""}">
        <div class="my-records-machine-card-head"><span>${group.type === "slot" ? "SLOT" : "PACHINKO"}</span><small>${number.format(group.items.length)} PLAY</small></div>
        <h3>${escapeHtml(group.name)}</h3>
        <div class="my-records-machine-values"><div><span>最高収支</span><strong class="${numeric(group.best.balanceYen) >= 0 ? "is-plus" : "is-minus"}">${signedYen(group.best.balanceYen)}</strong></div><div><span>平均収支</span><strong>${signedYen(group.average)}</strong></div><div><span>勝率</span><strong>${rate}%</strong></div><div><span>累計</span><strong>${signedYen(group.total)}</strong></div></div>
        <div class="my-records-machine-links"><a href="${encodeURIComponent(group.slug)}.html#simulator">もう一度遊ぶ</a><button type="button" data-machine-history="${escapeHtml(group.slug)}">${selected ? "全履歴へ戻る" : "この台の履歴"}</button></div>
      </article>`;
    }).join("");
  }

  function historyMarkup(record) {
    const balance = numeric(record.balanceYen);
    const recordId = escapeHtml(record.id || `${record.slug}-${record.savedAt}`);
    const flow = Array.isArray(record.flow) ? record.flow.slice(0, 6) : [];
    const badges = [machineType(record) === "slot" && numeric(record.setting) >= 1 ? `設定${numeric(record.setting)}` : "", record.complete ? "コンプリート" : "", record.upper ? "上位到達" : "", record.entered ? (machineType(record) === "slot" ? "AT突入" : "RUSH突入") : ""].filter(Boolean);
    return `<article class="my-records-history-card">
      <div class="my-records-history-main">
        <div class="my-records-history-meta"><span>${machineType(record) === "slot" ? "SLOT" : "PACHINKO"}</span><time>${escapeHtml(shortDate(record.savedAt))}</time></div>
        <h3><a href="${encodeURIComponent(record.slug || "index")}.html#simulator">${escapeHtml(machineTitle(record))}</a></h3>
        <p>${escapeHtml(record.title || record.summary || "シミュレーション結果")}</p>
        ${badges.length ? `<div class="my-records-badges">${badges.map(label => `<b>${label}</b>`).join("")}</div>` : ""}
        ${flow.length ? `<div class="my-records-flow">${flow.map(item => `<span>${escapeHtml(item)}</span>`).join("<i>›</i>")}</div>` : ""}
      </div>
      <div class="my-records-history-score">
        <span>収支</span><strong class="${balance >= 0 ? "is-plus" : "is-minus"}">${signedYen(balance)}</strong>
        <dl><div><dt>開始</dt><dd>${number.format(numeric(record.attempts))}${attemptUnit(record)}</dd></div><div><dt>投資</dt><dd>¥${number.format(numeric(record.investment))}</dd></div><div><dt>獲得</dt><dd>${number.format(numeric(record.payout))}${payoutUnit(record)}</dd></div><div><dt>換金</dt><dd>¥${number.format(numeric(record.exchangeValue))}</dd></div></dl>
        ${record.rateLabel ? `<small>${escapeHtml(record.rateLabel)}</small>` : ""}
        <button type="button" data-delete-machine-record="${recordId}" aria-label="${escapeHtml(machineTitle(record))}のこの記録を削除">この記録を削除</button>
      </div>
    </article>`;
  }

  function renderHistory() {
    const output = filteredRecords();
    const empty = $("machineHistoryEmpty");
    empty.hidden = output.length > 0;
    $("machineHistoryList").innerHTML = output.slice(0, visibleCount).map(historyMarkup).join("");
    const loadMore = $("machineHistoryLoadMore");
    loadMore.hidden = output.length <= visibleCount;
    if (!loadMore.hidden) loadMore.textContent = `さらに表示（残り${number.format(output.length - visibleCount)}件）`;
  }

  function renderAll() {
    renderSummary();
    renderPlayStyle();
    renderTrend();
    renderAchievements();
    renderMachineCards();
    renderHistory();
    $("clearAllMachineHistory").disabled = records.length === 0;
  }

  document.querySelectorAll("[data-record-filter]").forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.recordFilter;
      activeSlug = "";
      visibleCount = PAGE_SIZE;
      document.querySelectorAll("[data-record-filter]").forEach(item => item.classList.toggle("is-active", item === button));
      renderMachineCards();
      renderHistory();
    });
  });

  $("machineRecordSummaryList").addEventListener("click", event => {
    const button = event.target.closest("[data-machine-history]");
    if (!button) return;
    activeSlug = activeSlug === button.dataset.machineHistory ? "" : button.dataset.machineHistory;
    visibleCount = PAGE_SIZE;
    renderMachineCards();
    renderHistory();
    $("recordHistoryTitle").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("achievementBadgeGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-achievement-id]");
    if (!button || button.disabled || !window.ICHIGEKI_ACHIEVEMENTS?.select(button.dataset.achievementId, records)) return;
    renderAchievements();
  });

  $("machineHistoryList").addEventListener("click", async event => {
    const button = event.target.closest("[data-delete-machine-record]");
    if (!button) return;
    const id = button.dataset.deleteMachineRecord;
    records = records.filter(record => String(record.id || `${record.slug}-${record.savedAt}`) !== id);
    writeRecords();
    renderAll();
    try { await window.ICHIGEKI_AUTH?.deleteRecord(id); } catch (error) { console.warn("ICHIGEKI record delete:", error.message); }
  });

  $("machineHistorySort").addEventListener("change", () => {
    visibleCount = PAGE_SIZE;
    renderHistory();
  });

  $("machineHistoryLoadMore").addEventListener("click", () => {
    visibleCount += PAGE_SIZE;
    renderHistory();
  });

  $("clearAllMachineHistory").addEventListener("click", async () => {
    if (!records.length || !window.confirm("この端末のマイ記録をすべて削除しますか？この操作は元に戻せません。")) return;
    records = [];
    writeRecords();
    activeSlug = "";
    renderAll();
    try { await window.ICHIGEKI_AUTH?.clearRecords(); } catch (error) { console.warn("ICHIGEKI records clear:", error.message); }
  });

  window.addEventListener("ichigeki:records-synced", event => {
    records = Array.isArray(event.detail?.records) ? event.detail.records : readRecords();
    activeSlug = "";
    visibleCount = PAGE_SIZE;
    renderAll();
  });

  renderAll();
})();
