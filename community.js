const COMMUNITY_LOCAL_KEY = "ichigekiCommunityPostsV1";
const COMMUNITY_HIDDEN_KEY = "ichigekiCommunityHiddenV1";
const machineMeta = {
  "slot-new": { name: "新台スロット（登録待ち）", simulator: "slot-zone-demo.html" },
  "gundam-unicorn": { name: "初代ガンダムユニコーン", simulator: "gundam-unicorn.html" },
  "lycoris-recoil-slot": { name: "スマスロ リコリス・リコイル", simulator: "lycoris-recoil-slot.html" },
  "assault-lily": { name: "e アサルトリリィ", simulator: "assault-lily.html" },
  "kanokari-slot": { name: "Lパチスロ 彼女、お借りします", simulator: "kanokari-slot.html" },
  "kabaneri2-119": { name: "e 甲鉄城のカバネリ2 輪廻の果報119ver.", simulator: "kabaneri2-119.html" },
  "aobuta-slot": { name: "L青春ブタ野郎はバニーガール先輩の夢を見ない", simulator: "aobuta-slot.html" },
  "fire-force2-99": { name: "eフィーバー炎炎ノ消防隊2 99ver.", simulator: "fire-force2-99.html" },
  "hokuto-tensei2": { name: "スマスロ 北斗の拳 転生の章2", simulator: "hokuto-tensei2.html" },
  "tokyo-ghoul-super": { name: "e 東京喰種 超デカ超一撃ver.", simulator: "tokyo-ghoul-super.html" },
  "bofuri-slot": { name: "スマスロ 防振り", simulator: "bofuri-slot.html" },
  "azur-lane-slot": { name: "L アズールレーン THE ANIMATION", simulator: "azur-lane-slot.html" },
  "sao-alicization-yozora": { name: "e ソードアート・オンライン アリシゼーション 夜空", simulator: "sao-alicization-yozora.html" },
  "gundam-seed-climax": { name: "eフィーバー機動戦士ガンダムSEED クライマックス", simulator: "gundam-seed-climax.html" },
  "tokyo-ghoul-slot": { name: "L 東京喰種", simulator: "tokyo-ghoul-slot.html" },
  "valvrave2": { name: "Lパチスロ 革命機ヴァルヴレイヴ2", simulator: "valvrave2.html" },
  "kabaneri-unato": { name: "スマスロ 甲鉄城のカバネリ 海門決戦", simulator: "kabaneri-unato.html" },
  "tokyo-ghoul-e": { name: "e 東京喰種", simulator: "tokyo-ghoul-e.html" },
  "eva17-hajimari": { name: "e 新世紀エヴァンゲリオン ～はじまりの記憶～", simulator: "eva17-hajimari.html" },
  "garo12-gokugen": { name: "e牙狼12黄金騎士極限", simulator: "garo12-gokugen.html" },
  "karakuri-circus": { name: "パチスロ からくりサーカス", simulator: "karakuri-circus.html" },
  "monkey-turn-v": { name: "スマスロ モンキーターンV", simulator: "monkey-turn-v.html" },
  "eva15": { name: "エヴァ15 未来への咆哮", simulator: "eva15.html" },
  "rezero-onigakari": { name: "Pリゼロ 鬼がかりver.", simulator: "rezero-onigakari.html" },
  "kabaneri": { name: "パチスロ甲鉄城のカバネリ", simulator: "kabaneri.html" },
  "smart-hokuto": { name: "スマスロ北斗の拳", simulator: "smart-hokuto.html" },
  "valvrave": { name: "パチスロ革命機ヴァルヴレイヴ", simulator: "valvrave.html" },
  "sengoku-otome4": { name: "L戦国乙女4", simulator: "sengoku-otome4.html" },
  "oumi5": { name: "P大海物語5", simulator: "oumi5.html" },
  "shin-hokuto-musou": { name: "CR真・北斗無双", simulator: "shin-hokuto-musou.html" },
  "tokyo-ghoul-999": { name: "東京喰種999", simulator: "tokyo-ghoul-999.html" },
  "pachinko-319": { name: "一撃319", simulator: "pachinko-319.html" }
};
const communityState = { mode: "local", client: null, posts: [], filter: "all", files: [], videoFile: null };

function text(value) { return String(value ?? ""); }
function safeUrl(value, allowDataImage = false) {
  const candidate = text(value);
  if (allowDataImage && /^data:image\/(jpeg|png|webp);base64,/i.test(candidate)) return candidate;
  try {
    const parsed = new URL(candidate);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "";
  } catch { return ""; }
}
function money(value) { return new Intl.NumberFormat("ja-JP").format(Number(value) || 0); }
function uid() { return window.crypto?.randomUUID?.() || `post-${Date.now()}-${Math.random().toString(36).slice(2)}`; }
function readLocalPosts() {
  try { return JSON.parse(localStorage.getItem(COMMUNITY_LOCAL_KEY) || "[]"); } catch { return []; }
}
function writeLocalPosts(posts) { localStorage.setItem(COMMUNITY_LOCAL_KEY, JSON.stringify(posts)); }
function hiddenIds() {
  try { return new Set(JSON.parse(localStorage.getItem(COMMUNITY_HIDDEN_KEY) || "[]")); } catch { return new Set(); }
}
function showNotice(message, tone = "info") {
  const notice = document.getElementById("communityNotice");
  notice.hidden = false; notice.dataset.tone = tone; notice.textContent = message;
}
function setStatus(mode, title, detail) {
  const status = document.getElementById("communityStatus");
  status.className = `community-status is-${mode}`;
  status.innerHTML = `<span class="status-dot"></span><strong>${title}</strong><small>${detail}</small>`;
}
function selectedMachine() { return document.getElementById("machineFilter").value; }

async function loadSupabase() {
  const config = window.ICHIGEKI_COMMUNITY_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey) return false;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.onload = resolve; script.onerror = reject; document.head.appendChild(script);
  });
  communityState.client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  const { data } = await communityState.client.auth.getSession();
  if (!data.session) {
    const { error } = await communityState.client.auth.signInAnonymously();
    if (error) throw error;
  }
  communityState.mode = "supabase";
  return true;
}

async function refreshPosts() {
  const machine = selectedMachine();
  if (communityState.mode === "supabase") {
    const { data, error } = await communityState.client.from("community_posts").select("*").eq("machine_slug", machine).eq("status", "published").order("created_at", { ascending: false }).limit(100);
    if (error) throw error;
    communityState.posts = data || [];
  } else {
    communityState.posts = readLocalPosts().filter(post => post.machine_slug === machine);
  }
  renderPosts();
}

function safeMediaUrls(post) {
  const urls = Array.isArray(post.media_urls) ? post.media_urls : [];
  return urls.map(url => safeUrl(url, true)).filter(Boolean).slice(0, 3);
}

function isUploadedVideo(url) {
  try { return /\.(mp4|webm)$/i.test(new URL(url).pathname); } catch { return false; }
}

function renderPosts() {
  const hidden = hiddenIds();
  const posts = communityState.posts.filter(post => !hidden.has(post.id) && (communityState.filter === "all" || post.post_type === communityState.filter));
  const list = document.getElementById("postList");
  const empty = document.getElementById("emptyPosts");
  list.innerHTML = "";
  empty.hidden = posts.length !== 0;
  posts.forEach(post => {
    const card = document.createElement("article");
    card.className = "community-post";
    const rating = Number(post.rating) > 0 ? `<span class="post-rating">${"★".repeat(Number(post.rating))}${"☆".repeat(5 - Number(post.rating))}</span>` : "";
    const diff = Number(post.return_amount) - Number(post.investment);
    const balance = post.post_type === "result" ? `<div class="post-balance"><span>投資 <b>${money(post.investment)}円</b></span><span>回収 <b>${money(post.return_amount)}円</b></span><span class="${diff >= 0 ? "is-plus" : "is-minus"}">収支 <b>${diff >= 0 ? "+" : ""}${money(diff)}円</b></span></div>` : "";
    const videoUrl = safeUrl(post.video_url);
    const video = !videoUrl ? "" : isUploadedVideo(videoUrl)
      ? `<video class="post-video-player" controls preload="metadata" playsinline src="${videoUrl}">動画を再生できません。</video>`
      : `<a class="post-video-link" href="${videoUrl}" target="_blank" rel="noopener noreferrer">添付動画を開く ↗</a>`;
    const media = safeMediaUrls(post);
    const mediaHtml = media.length ? `<div class="post-media">${media.map(url => `<img src="${url}" alt="投稿画像" loading="lazy">`).join("")}</div>` : "";
    card.innerHTML = `<div class="post-topline"><span class="post-type post-type-${post.post_type}">${post.post_type === "result" ? "実戦収支" : post.post_type === "simulation" ? "シミュ結果" : "口コミ"}</span>${rating}<time>${new Date(post.created_at).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</time></div><h3></h3><p class="post-author"></p><p class="post-body"></p>${balance}${mediaHtml}${video}<div class="post-actions"><button type="button" data-report-post="${post.id}">通報・非表示</button></div>`;
    card.querySelector("h3").textContent = post.title;
    card.querySelector(".post-author").textContent = `${post.nickname} さん`;
    card.querySelector(".post-body").textContent = post.body;
    list.appendChild(card);
  });
}

async function compressImage(file) {
  if (file.size > 2 * 1024 * 1024) throw new Error("画像は1枚2MB以下にしてください。");
  const dataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
  const image = await new Promise((resolve, reject) => { const item = new Image(); item.onload = () => resolve(item); item.onerror = reject; item.src = dataUrl; });
  const scale = Math.min(1, 1280 / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas"); canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale);
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.72);
}

async function uploadImages(userId) {
  if (!communityState.files.length) return [];
  if (communityState.mode === "local") return Promise.all(communityState.files.map(compressImage));
  const bucket = window.ICHIGEKI_COMMUNITY_CONFIG.storageBucket || "community-media";
  const urls = [];
  for (const file of communityState.files) {
    if (file.size > 2 * 1024 * 1024) throw new Error("画像は1枚2MB以下にしてください。");
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${userId}/${uid()}.${ext}`;
    const { error } = await communityState.client.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    const { data } = communityState.client.storage.from(bucket).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

async function uploadVideo(userId) {
  const file = communityState.videoFile;
  if (!file) return "";
  if (communityState.mode !== "supabase") throw new Error("動画ファイルは公開コミュニティ接続時だけ投稿できます。動画URLをご利用ください。");
  if (file.size > 20 * 1024 * 1024) throw new Error("動画は20MB以下にしてください。");
  if (!["video/mp4", "video/webm"].includes(file.type)) throw new Error("動画はMP4またはWebM形式にしてください。");
  const bucket = window.ICHIGEKI_COMMUNITY_CONFIG.storageBucket || "community-media";
  const ext = file.type === "video/webm" ? "webm" : "mp4";
  const path = `${userId}/videos/${uid()}.${ext}`;
  const { error } = await communityState.client.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data } = communityState.client.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

async function submitPost(event) {
  event.preventDefault();
  const isSimulation = event.currentTarget.id === "simulationPostForm";
  const button = event.submitter;
  const buttonLabel = button.textContent;
  button.disabled = true; button.textContent = "投稿中...";
  try {
    const video = isSimulation ? "" : document.getElementById("videoUrl").value.trim();
    if (video && !/^https:\/\//i.test(video)) throw new Error("動画URLはhttps://から入力してください。");
    if (video && communityState.videoFile) throw new Error("動画ファイルと動画URLはどちらか一方だけ選んでください。");
    let userId = "local";
    if (communityState.mode === "supabase") {
      const { data } = await communityState.client.auth.getUser(); userId = data.user?.id;
      if (!userId) throw new Error("投稿用セッションを取得できませんでした。");
    }
    const mediaUrls = isSimulation ? [] : await uploadImages(userId);
    const uploadedVideoUrl = isSimulation ? "" : await uploadVideo(userId);
    const post = {
      id: uid(), user_id: communityState.mode === "supabase" ? userId : null,
      machine_slug: selectedMachine(), post_type: isSimulation ? "simulation" : document.getElementById("postType").value,
      nickname: document.getElementById(isSimulation ? "simulationNickname" : "nickname").value.trim().slice(0, 16),
      rating: isSimulation ? 0 : Number(document.getElementById("rating").value),
      title: document.getElementById(isSimulation ? "simulationTitle" : "postTitle").value.trim().slice(0, 60),
      body: document.getElementById(isSimulation ? "simulationBody" : "postBody").value.trim().slice(0, 1000),
      investment: isSimulation ? 0 : Number(document.getElementById("investment").value) || 0,
      return_amount: isSimulation ? 0 : Number(document.getElementById("returnAmount").value) || 0,
      media_urls: mediaUrls, video_url: uploadedVideoUrl || video || null, status: "published", created_at: new Date().toISOString()
    };
    if (communityState.mode === "supabase") {
      const { id, ...payload } = post;
      const { error } = await communityState.client.from("community_posts").insert(payload);
      if (error) throw error;
    } else {
      const all = readLocalPosts(); all.unshift(post); writeLocalPosts(all);
    }
    event.target.reset();
    if (isSimulation) {
      document.getElementById("simulationTitle").value = "シミュレーション結果";
      updateSimulationComposer();
    } else {
      communityState.files = [];
      communityState.videoFile = null;
      updateComposer();
      document.getElementById("imagePreview").innerHTML = "";
      document.getElementById("videoPreview").innerHTML = "";
    }
    showNotice(communityState.mode === "local" ? "投稿をこの端末に保存しました。公開共有はバックエンド接続後に有効になります。" : "投稿を公開しました。", "success");
    await refreshPosts();
  } catch (error) { showNotice(error.message || "投稿を保存できませんでした。", "error"); }
  finally { button.disabled = false; button.textContent = buttonLabel; }
}

function updateComposer() {
  const type = document.getElementById("postType").value;
  document.getElementById("balanceFields").hidden = type !== "result";
  document.getElementById("bodyCount").textContent = document.getElementById("postBody").value.length;
}

function updateSimulationComposer() {
  document.getElementById("simulationBodyCount").textContent = document.getElementById("simulationBody").value.length;
}

function showComposer(target, shouldScroll = false) {
  document.querySelectorAll("[data-composer-target]").forEach(button => {
    const active = button.dataset.composerTarget === target;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-composer-panel]").forEach(panel => {
    const active = panel.dataset.composerPanel === target;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
  if (shouldScroll) document.getElementById(target === "simulation" ? "simulationComposer" : "regularComposer").scrollIntoView({ behavior: "smooth", block: "start" });
}

function applyQueryDraft() {
  const params = new URLSearchParams(location.search);
  const machine = params.get("machine"); if (machineMeta[machine]) document.getElementById("machineFilter").value = machine;
  const type = params.get("type"); if (["review", "result"].includes(type)) document.getElementById("postType").value = type;
  const composer = params.get("compose") === "simulation" || type === "simulation" ? "simulation" : "regular";
  const result = params.get("result");
  if (result) document.getElementById("simulationBody").value = result.slice(0, 1000);
  showComposer(composer);
  updateComposer();
  updateSimulationComposer();
}

document.getElementById("communityPostForm").addEventListener("submit", submitPost);
document.getElementById("simulationPostForm").addEventListener("submit", submitPost);
document.getElementById("postType").addEventListener("change", updateComposer);
document.getElementById("postBody").addEventListener("input", updateComposer);
document.getElementById("simulationBody").addEventListener("input", updateSimulationComposer);
document.querySelectorAll("[data-composer-target]").forEach(button => button.addEventListener("click", () => showComposer(button.dataset.composerTarget)));
document.getElementById("postImages").addEventListener("change", event => {
  communityState.files = [...event.target.files].slice(0, 3);
  if ([...event.target.files].length > 3) showNotice("画像は最大3枚です。最初の3枚を選択しました。", "error");
  const preview = document.getElementById("imagePreview"); preview.innerHTML = "";
  communityState.files.forEach(file => { const img = document.createElement("img"); img.src = URL.createObjectURL(file); img.alt = "投稿前の画像プレビュー"; preview.appendChild(img); });
});
document.getElementById("postVideo").addEventListener("change", event => {
  const file = event.target.files[0] || null;
  const preview = document.getElementById("videoPreview");
  preview.innerHTML = "";
  communityState.videoFile = null;
  if (!file) return;
  if (file.size > 20 * 1024 * 1024) {
    event.target.value = "";
    showNotice("動画は20MB以下にしてください。", "error");
    return;
  }
  if (!["video/mp4", "video/webm"].includes(file.type)) {
    event.target.value = "";
    showNotice("動画はMP4またはWebM形式にしてください。", "error");
    return;
  }
  communityState.videoFile = file;
  const video = document.createElement("video");
  video.src = URL.createObjectURL(file);
  video.controls = true;
  video.preload = "metadata";
  video.playsInline = true;
  preview.appendChild(video);
});
document.getElementById("machineFilter").addEventListener("change", async event => {
  const simulator = machineMeta[event.target.value].simulator;
  document.getElementById("machineSimulatorLink").href = simulator;
  document.getElementById("composerSimulatorLink").href = simulator;
  await refreshPosts();
});
document.querySelectorAll("[data-post-filter]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-post-filter]").forEach(item => item.classList.remove("is-active"));
  button.classList.add("is-active"); communityState.filter = button.dataset.postFilter; renderPosts();
}));
document.getElementById("postList").addEventListener("click", async event => {
  const button = event.target.closest("[data-report-post]"); if (!button) return;
  const id = button.dataset.reportPost; const hidden = hiddenIds(); hidden.add(id); localStorage.setItem(COMMUNITY_HIDDEN_KEY, JSON.stringify([...hidden]));
  if (communityState.mode === "supabase") {
    const { data } = await communityState.client.auth.getUser();
    await communityState.client.from("community_reports").insert({ post_id: id, reporter_id: data.user?.id, reason: "user_report" });
  }
  showNotice("この投稿を非表示にし、通報を受け付けました。", "success"); renderPosts();
});

(async function initCommunity() {
  applyQueryDraft();
  document.getElementById("machineSimulatorLink").href = machineMeta[selectedMachine()].simulator;
  document.getElementById("composerSimulatorLink").href = machineMeta[selectedMachine()].simulator;
  try {
    const connected = await loadSupabase();
    setStatus(connected ? "online" : "preview", connected ? "公開コミュニティ" : "端末内プレビュー", connected ? "投稿は全ユーザーに共有されます" : "バックエンド接続後に公開共有されます");
  } catch {
    communityState.mode = "local";
    setStatus("error", "端末内プレビュー", "接続できないため、この端末だけに保存します");
  }
  await refreshPosts();
})();
