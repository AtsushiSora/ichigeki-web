(() => {
  const RECORDS_KEY = "ichigekiMachineHistoryV1";
  const NICKNAME_KEY = "ichigekiRankingNicknameV1";
  const RETURN_KEY = "ichigekiAuthReturnToV1";
  const CLIENT_KEY = "ICHIGEKI_SUPABASE_CLIENT";
  const state = { client: null, user: null, profile: null, ready: false, syncing: false };

  const loadScript = (src, id) => {
    if (document.getElementById(id)) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`${src}を読み込めませんでした。`));
      document.head.appendChild(script);
    });
  };

  const ensureConfig = async () => {
    if (!window.ICHIGEKI_COMMUNITY_CONFIG) await loadScript("community-config.js?v=2", "ichigeki-community-config");
    return window.ICHIGEKI_COMMUNITY_CONFIG || {};
  };

  const createClient = async () => {
    if (state.client) return state.client;
    const config = await ensureConfig();
    if (!config.supabaseUrl || !config.supabaseAnonKey) throw new Error("ログイン設定を読み込めませんでした。");
    await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2", "ichigeki-supabase-js");
    state.client = window[CLIENT_KEY] || window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
    window[CLIENT_KEY] = state.client;
    return state.client;
  };

  const isGoogleUser = user => Boolean(user && (
    user.app_metadata?.provider === "google" ||
    user.identities?.some(identity => identity.provider === "google")
  ));

  const fallbackName = user => {
    const metadata = user?.user_metadata || {};
    return String(metadata.full_name || metadata.name || metadata.preferred_username || "ICHIGEKIユーザー").trim().slice(0, 16);
  };

  const displayName = () => state.profile?.nickname || fallbackName(state.user);
  const avatarUrl = () => String(state.user?.user_metadata?.avatar_url || state.user?.user_metadata?.picture || "");

  const emit = (name, detail = {}) => window.dispatchEvent(new CustomEvent(name, { detail }));

  const accountMarkup = () => {
    if (!state.user) return '<span class="site-account-google" aria-hidden="true">G</span><b>ログイン</b>';
    const avatar = avatarUrl();
    const visual = avatar
      ? `<img src="${avatar.replace(/["<>]/g, "")}" alt="" referrerpolicy="no-referrer">`
      : `<span aria-hidden="true">${displayName().slice(0, 1)}</span>`;
    return `${visual}<b>${displayName().replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character])}</b>`;
  };

  const ensureHeaderAccount = () => {
    const header = document.querySelector(".site-header .header-inner");
    if (!header) return;
    let link = header.querySelector(".site-account-link");
    if (!link) {
      link = document.createElement("a");
      link.className = "site-account-link";
      link.href = "account.html";
      link.setAttribute("aria-label", "アカウント");
      const mobileMenu = header.querySelector(".mobile-header-menu, .shared-site-menu");
      header.insertBefore(link, mobileMenu || null);
    }
    link.classList.toggle("is-signed-in", Boolean(state.user));
    link.innerHTML = accountMarkup();
  };

  const setAccountNotice = (message, tone = "") => {
    const notice = document.getElementById("accountNotice");
    if (!notice) return;
    notice.hidden = !message;
    notice.textContent = message;
    notice.dataset.tone = tone;
  };

  const renderAccountPage = () => {
    document.querySelectorAll('[data-auth-state="signed-out"]').forEach(element => { element.hidden = Boolean(state.user); });
    document.querySelectorAll('[data-auth-state="signed-in"]').forEach(element => { element.hidden = !state.user; });
    document.querySelectorAll("[data-auth-name]").forEach(element => { element.textContent = state.user ? displayName() : "ゲスト"; });
    const signedOut = document.getElementById("accountSignedOut");
    const signedIn = document.getElementById("accountSignedIn");
    if (!signedOut && !signedIn) return;
    if (signedOut) signedOut.hidden = Boolean(state.user);
    if (signedIn) signedIn.hidden = !state.user;
    if (!state.user) return;
    const name = displayName();
    const email = String(state.user.email || "");
    const avatar = avatarUrl();
    const nameNode = document.getElementById("accountDisplayName");
    const emailNode = document.getElementById("accountEmail");
    const input = document.getElementById("accountNickname");
    const avatarNode = document.getElementById("accountAvatar");
    if (nameNode) nameNode.textContent = name;
    if (emailNode) emailNode.textContent = email;
    if (input && document.activeElement !== input) input.value = name;
    if (avatarNode) {
      avatarNode.innerHTML = avatar ? `<img src="${avatar.replace(/["<>]/g, "")}" alt="" referrerpolicy="no-referrer">` : `<span>${name.slice(0, 1)}</span>`;
    }
    const sync = document.getElementById("accountSyncStatus");
    if (sync) sync.textContent = state.syncing ? "記録を同期中…" : "このGoogleアカウントと自動同期";
  };

  const loadProfile = async () => {
    if (!state.user || !state.client) return null;
    const { data, error } = await state.client.from("profiles").select("nickname,avatar_url,updated_at").eq("user_id", state.user.id).maybeSingle();
    if (!error && data) state.profile = data;
    else state.profile = { nickname: localStorage.getItem(NICKNAME_KEY) || fallbackName(state.user), avatar_url: avatarUrl() };
    localStorage.setItem(NICKNAME_KEY, state.profile.nickname || fallbackName(state.user));
    return state.profile;
  };

  const saveProfile = async nickname => {
    if (!state.user) throw new Error("Googleでログインしてください。");
    const clean = String(nickname || "").trim().slice(0, 16);
    if (!clean) throw new Error("ニックネームを入力してください。");
    const payload = { user_id: state.user.id, nickname: clean, avatar_url: avatarUrl() || null, updated_at: new Date().toISOString() };
    const { error } = await state.client.from("profiles").upsert(payload, { onConflict: "user_id" });
    if (error) throw error;
    state.profile = payload;
    localStorage.setItem(NICKNAME_KEY, clean);
    ensureHeaderAccount();
    renderAccountPage();
    emit("ichigeki:profile-changed", { user: state.user, profile: state.profile });
  };

  const readLocalRecords = () => {
    try {
      const records = JSON.parse(localStorage.getItem(RECORDS_KEY) || "[]");
      return Array.isArray(records) ? records.filter(record => record && typeof record === "object") : [];
    } catch { return []; }
  };

  const recordId = record => String(record.id || `${record.slug || "record"}-${record.savedAt || "unknown"}`);
  const recordTime = record => new Date(record.updatedAt || record.savedAt || 0).getTime() || 0;

  const syncRecords = async () => {
    if (!state.user || !state.client || state.syncing) return;
    state.syncing = true;
    renderAccountPage();
    try {
      const local = readLocalRecords().slice(0, 500);
      const { data, error } = await state.client.from("simulation_records").select("record_id,record_data,updated_at").eq("user_id", state.user.id).order("updated_at", { ascending: false }).limit(500);
      if (error) throw error;
      const merged = new Map();
      (data || []).forEach(row => {
        const item = row.record_data && typeof row.record_data === "object" ? { ...row.record_data, id: row.record_id } : null;
        if (item) merged.set(row.record_id, item);
      });
      local.forEach(item => {
        const id = recordId(item);
        const current = merged.get(id);
        if (!current || recordTime(item) >= recordTime(current)) merged.set(id, { ...item, id });
      });
      const records = [...merged.values()].sort((a, b) => recordTime(b) - recordTime(a)).slice(0, 500);
      localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
      const rows = records.map(item => ({
        user_id: state.user.id,
        record_id: recordId(item),
        record_data: item,
        saved_at: item.savedAt || new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      for (let index = 0; index < rows.length; index += 100) {
        const { error: upsertError } = await state.client.from("simulation_records").upsert(rows.slice(index, index + 100), { onConflict: "user_id,record_id" });
        if (upsertError) throw upsertError;
      }
      emit("ichigeki:records-synced", { records });
      setAccountNotice("マイ記録をGoogleアカウントと同期しました。", "success");
    } catch (error) {
      console.warn("ICHIGEKI record sync:", error.message);
      setAccountNotice("端末の記録は利用できます。クラウド同期の初期設定はまだ完了していません。", "warning");
    } finally {
      state.syncing = false;
      renderAccountPage();
    }
  };

  const deleteRecord = async id => {
    if (!state.user || !state.client) return;
    const { error } = await state.client.from("simulation_records").delete().eq("user_id", state.user.id).eq("record_id", String(id));
    if (error) throw error;
  };

  const clearRecords = async () => {
    if (!state.user || !state.client) return;
    const { error } = await state.client.from("simulation_records").delete().eq("user_id", state.user.id);
    if (error) throw error;
  };

  const safeReturnUrl = () => {
    const url = new URL(location.href);
    url.hash = "";
    ["code", "error", "error_code", "error_description"].forEach(key => url.searchParams.delete(key));
    return url.href;
  };

  const signInWithGoogle = async () => {
    const client = await createClient();
    sessionStorage.setItem(RETURN_KEY, safeReturnUrl());
    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: safeReturnUrl(), queryParams: { prompt: "select_account" } }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (!state.client) return;
    await state.client.auth.signOut();
    state.user = null;
    state.profile = null;
    ensureHeaderAccount();
    renderAccountPage();
    location.href = "index.html";
  };

  const deleteAccount = async () => {
    if (!state.user || !state.client) return;
    const { error } = await state.client.rpc("delete_my_account");
    if (error) throw error;
    localStorage.removeItem(RECORDS_KEY);
    localStorage.removeItem(NICKNAME_KEY);
    await state.client.auth.signOut();
    location.href = "index.html";
  };

  const applySession = async session => {
    state.user = isGoogleUser(session?.user) ? session.user : null;
    state.profile = null;
    if (state.user) await loadProfile();
    ensureHeaderAccount();
    renderAccountPage();
    emit("ichigeki:auth-changed", { user: state.user, profile: state.profile });
    if (state.user) await syncRecords();
  };

  const init = async () => {
    try {
      const client = await createClient();
      const { data } = await client.auth.getSession();
      await applySession(data.session);
      client.auth.onAuthStateChange((event, session) => {
        if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) setTimeout(() => applySession(session), 0);
      });
    } catch (error) {
      console.warn("ICHIGEKI auth:", error.message);
      ensureHeaderAccount();
      setAccountNotice("現在ログイン機能へ接続できません。時間をおいてお試しください。", "error");
    } finally {
      state.ready = true;
      renderAccountPage();
      emit("ichigeki:auth-ready", { user: state.user, profile: state.profile });
    }
    return state;
  };

  document.addEventListener("click", async event => {
    const login = event.target.closest("[data-google-login]");
    if (login) {
      event.preventDefault();
      login.disabled = true;
      try { await signInWithGoogle(); }
      catch (error) { login.disabled = false; setAccountNotice(error.message || "Googleログインを開始できませんでした。", "error"); }
      return;
    }
    const logout = event.target.closest("[data-auth-logout]");
    if (logout) {
      event.preventDefault();
      logout.disabled = true;
      await signOut();
      return;
    }
    const remove = event.target.closest("[data-auth-delete]");
    if (remove) {
      event.preventDefault();
      if (!confirm("アカウントと同期済みの記録・投稿を削除しますか？この操作は元に戻せません。")) return;
      remove.disabled = true;
      try { await deleteAccount(); }
      catch (error) { remove.disabled = false; setAccountNotice(error.message || "アカウントを削除できませんでした。", "error"); }
    }
  });

  document.addEventListener("submit", async event => {
    if (event.target.id !== "accountProfileForm") return;
    event.preventDefault();
    const button = event.submitter;
    if (button) button.disabled = true;
    try {
      await saveProfile(document.getElementById("accountNickname")?.value);
      setAccountNotice("ニックネームを保存しました。", "success");
    } catch (error) { setAccountNotice(error.message || "保存できませんでした。", "error"); }
    finally { if (button) button.disabled = false; }
  });

  window.addEventListener("ichigeki:records-changed", () => syncRecords());

  const readyPromise = init();
  window.ICHIGEKI_AUTH = {
    ready: () => readyPromise,
    getClient: () => createClient(),
    getUser: () => state.user,
    getProfile: () => state.profile,
    getDisplayName: displayName,
    isSignedIn: () => Boolean(state.user),
    signInWithGoogle,
    signOut,
    syncRecords,
    deleteRecord,
    clearRecords
  };
})();
