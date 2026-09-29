const adminState = { client: null, posts: [], reports: [], rankings: [], isAdmin: false };

function adminText(value) { return String(value ?? ""); }
function adminDate(value) {
  if (!value) return "--";
  return new Date(value).toLocaleString("ja-JP", { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function adminNumber(value) { return new Intl.NumberFormat("ja-JP").format(Number(value) || 0); }
function setAdminStatus(mode, title, detail) {
  const status = document.getElementById("adminStatus");
  status.className = `community-status is-${mode}`;
  status.innerHTML = '<span class="status-dot"></span><strong></strong><small></small>';
  status.querySelector("strong").textContent = title;
  status.querySelector("small").textContent = detail;
}
function showAdminNotice(message, tone = "info") {
  const notice = document.getElementById("adminNotice");
  notice.hidden = false;
  notice.dataset.tone = tone;
  notice.textContent = message;
}
function clearAdminNotice() { document.getElementById("adminNotice").hidden = true; }

async function loadAdminSupabase() {
  const config = window.ICHIGEKI_COMMUNITY_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey) throw new Error("Supabaseの接続設定がありません。");
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.onload = resolve;
    script.onerror = () => reject(new Error("認証ライブラリを読み込めませんでした。"));
    document.head.appendChild(script);
  });
  adminState.client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
}

async function verifyAdmin() {
  const { data: sessionData } = await adminState.client.auth.getSession();
  if (!sessionData.session || sessionData.session.user?.is_anonymous) return false;
  const { data, error } = await adminState.client.rpc("is_community_admin");
  if (error) throw error;
  return data === true;
}

function showLogin(message = "管理者アカウントでログインしてください。") {
  adminState.isAdmin = false;
  document.getElementById("adminLoginCard").hidden = false;
  document.getElementById("adminDashboard").hidden = true;
  setAdminStatus("preview", "ログインが必要です", message);
}

function createActionButton(label, action, id, value = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset.adminAction = action;
  button.dataset.id = id;
  if (value) button.dataset.value = value;
  if (action.startsWith("delete")) button.className = "is-danger";
  return button;
}

function createPostCard(post, reportCount = 0) {
  const card = document.createElement("article");
  card.className = "admin-item-card";
  const top = document.createElement("div");
  top.className = "admin-item-top";
  const badges = document.createElement("div");
  badges.className = "admin-badges";
  const status = document.createElement("span");
  status.className = `admin-status-badge is-${post.status}`;
  status.textContent = post.status === "published" ? "公開中" : post.status === "review" ? "審査中" : "非表示";
  badges.appendChild(status);
  if (reportCount) {
    const report = document.createElement("span");
    report.className = "admin-report-badge";
    report.textContent = `通報 ${reportCount}件`;
    badges.appendChild(report);
  }
  const date = document.createElement("time");
  date.textContent = adminDate(post.created_at);
  top.append(badges, date);

  const title = document.createElement("h3");
  title.textContent = post.title || "無題";
  const meta = document.createElement("p");
  meta.className = "admin-item-meta";
  meta.textContent = `${post.nickname || "名前なし"} さん · ${post.machine_slug || "機種不明"} · ${post.post_type || "投稿"}`;
  const body = document.createElement("p");
  body.className = "admin-item-body";
  body.textContent = post.body || "";
  const actions = document.createElement("div");
  actions.className = "admin-item-actions";
  actions.append(
    createActionButton("公開", "post-status", post.id, "published"),
    createActionButton("審査中", "post-status", post.id, "review"),
    createActionButton("非表示", "post-status", post.id, "hidden"),
    createActionButton("完全に削除", "delete-post", post.id)
  );
  card.append(top, title, meta, body, actions);
  return card;
}

function renderReports() {
  const list = document.getElementById("reportedPostList");
  list.innerHTML = "";
  const grouped = new Map();
  adminState.reports.forEach(report => {
    const current = grouped.get(report.post_id) || { post: report.community_posts, reports: [] };
    current.reports.push(report);
    if (!current.post) current.post = report.community_posts;
    grouped.set(report.post_id, current);
  });
  if (!grouped.size) {
    list.innerHTML = '<p class="admin-empty">未対応の通報はありません。</p>';
    return;
  }
  [...grouped.entries()].sort((a, b) => b[1].reports.length - a[1].reports.length).forEach(([postId, item]) => {
    if (!item.post) return;
    const card = createPostCard(item.post, item.reports.length);
    const actions = card.querySelector(".admin-item-actions");
    actions.appendChild(createActionButton("通報を対応済みにする", "clear-reports", postId));
    list.appendChild(card);
  });
}

function renderPosts() {
  const filter = document.getElementById("adminPostFilter").value;
  const list = document.getElementById("adminPostList");
  list.innerHTML = "";
  const reportCounts = adminState.reports.reduce((map, report) => map.set(report.post_id, (map.get(report.post_id) || 0) + 1), new Map());
  const posts = adminState.posts.filter(post => filter === "all" || post.status === filter);
  if (!posts.length) {
    list.innerHTML = '<p class="admin-empty">該当する投稿はありません。</p>';
    return;
  }
  posts.forEach(post => list.appendChild(createPostCard(post, reportCounts.get(post.id) || 0)));
}

function renderRankings() {
  const list = document.getElementById("adminRankingList");
  list.innerHTML = "";
  if (!adminState.rankings.length) {
    list.innerHTML = '<p class="admin-empty">ランキング記録はありません。</p>';
    return;
  }
  adminState.rankings.forEach(record => {
    const card = document.createElement("article");
    card.className = "admin-item-card admin-ranking-card";
    const title = document.createElement("h3");
    title.textContent = record.title || record.machine_slug;
    const meta = document.createElement("p");
    meta.className = "admin-item-meta";
    meta.textContent = `${record.nickname} さん · ${record.machine_slug} · ${adminDate(record.updated_at)}`;
    const score = document.createElement("strong");
    score.className = "admin-ranking-score";
    score.textContent = `${record.score >= 0 ? "+" : ""}${adminNumber(record.score)}${record.score_kind === "coins" ? "枚" : "玉"}`;
    const summary = document.createElement("p");
    summary.className = "admin-item-body";
    summary.textContent = record.summary || "";
    const actions = document.createElement("div");
    actions.className = "admin-item-actions";
    actions.appendChild(createActionButton("記録を削除", "delete-ranking", record.id));
    card.append(title, meta, score, summary, actions);
    list.appendChild(card);
  });
}

function updateStats() {
  document.getElementById("reportCount").textContent = adminState.reports.length;
  document.getElementById("reviewCount").textContent = adminState.posts.filter(post => post.status === "review").length;
  document.getElementById("publishedCount").textContent = adminState.posts.filter(post => post.status === "published").length;
  document.getElementById("rankingCount").textContent = adminState.rankings.length;
}

async function loadDashboard() {
  clearAdminNotice();
  setAdminStatus("preview", "読み込み中", "管理データを取得しています");
  const [postsResult, reportsResult, rankingsResult] = await Promise.all([
    adminState.client.from("community_posts").select("*").order("created_at", { ascending: false }).limit(100),
    adminState.client.from("community_reports").select("id,post_id,reason,created_at,community_posts(id,machine_slug,post_type,nickname,title,body,status,created_at)").order("created_at", { ascending: false }).limit(200),
    adminState.client.from("machine_rankings").select("*").order("updated_at", { ascending: false }).limit(100)
  ]);
  const failed = [postsResult, reportsResult, rankingsResult].find(result => result.error);
  if (failed) throw failed.error;
  adminState.posts = postsResult.data || [];
  adminState.reports = reportsResult.data || [];
  adminState.rankings = rankingsResult.data || [];
  updateStats();
  renderReports();
  renderPosts();
  renderRankings();
  setAdminStatus("online", "管理者モード", "投稿とランキングを管理できます");
}

async function enterDashboard() {
  adminState.isAdmin = await verifyAdmin();
  if (!adminState.isAdmin) {
    await adminState.client.auth.signOut();
    showLogin("このアカウントには管理者権限がありません。");
    return;
  }
  document.getElementById("adminLoginCard").hidden = true;
  document.getElementById("adminDashboard").hidden = false;
  await loadDashboard();
}

document.getElementById("adminLoginForm").addEventListener("submit", async event => {
  event.preventDefault();
  const button = event.submitter;
  const label = button.textContent;
  button.disabled = true;
  button.textContent = "確認中...";
  try {
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;
    const { error } = await adminState.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await enterDashboard();
    event.target.reset();
  } catch (error) {
    showLogin(error.message || "ログインできませんでした。");
  } finally {
    button.disabled = false;
    button.textContent = label;
  }
});

document.getElementById("adminLogout").addEventListener("click", async () => {
  await adminState.client.auth.signOut();
  showLogin();
});
document.getElementById("adminRefresh").addEventListener("click", async () => {
  try { await loadDashboard(); } catch (error) { showAdminNotice(error.message || "再読み込みできませんでした。", "error"); }
});
document.getElementById("adminPostFilter").addEventListener("change", renderPosts);

document.getElementById("adminDashboard").addEventListener("click", async event => {
  const button = event.target.closest("[data-admin-action]");
  if (!button || !adminState.isAdmin) return;
  const action = button.dataset.adminAction;
  const id = button.dataset.id;
  if ((action === "delete-post" || action === "delete-ranking") && !window.confirm("完全に削除しますか？この操作は元に戻せません。")) return;
  button.disabled = true;
  try {
    let result;
    if (action === "post-status") {
      result = await adminState.client.from("community_posts").update({ status: button.dataset.value }).eq("id", id);
      if (!result.error && button.dataset.value === "published") {
        const clearResult = await adminState.client.from("community_reports").delete().eq("post_id", id);
        if (clearResult.error) throw clearResult.error;
      }
    } else if (action === "delete-post") {
      result = await adminState.client.from("community_posts").delete().eq("id", id);
    } else if (action === "clear-reports") {
      result = await adminState.client.from("community_reports").delete().eq("post_id", id);
    } else if (action === "delete-ranking") {
      result = await adminState.client.from("machine_rankings").delete().eq("id", id);
    }
    if (result?.error) throw result.error;
    showAdminNotice("変更を反映しました。", "success");
    await loadDashboard();
  } catch (error) {
    button.disabled = false;
    showAdminNotice(error.message || "操作を完了できませんでした。", "error");
  }
});

(async function initAdmin() {
  try {
    await loadAdminSupabase();
    const { data } = await adminState.client.auth.getSession();
    if (data.session && !data.session.user?.is_anonymous) await enterDashboard();
    else showLogin();
  } catch (error) {
    document.getElementById("adminLoginCard").hidden = false;
    setAdminStatus("error", "接続できません", error.message || "Supabaseへ接続できませんでした");
  }
})();
