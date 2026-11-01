(() => {
  const OLD_RANKING_CLEANUP_KEY = "ichigekiOldRankingCleanupV1";

  function removeOldRankings() {
    try {
      if (localStorage.getItem(OLD_RANKING_CLEANUP_KEY)) return;
      localStorage.removeItem("ichigekiLocalRecordsV1");
      Object.keys(localStorage).forEach(key => {
        if (/^ichigekiMachineRankingV[12]:/.test(key)) {
          localStorage.removeItem(key);
          return;
        }
        const match = key.match(/^ichigekiMachineRankingV3:(.+)--fixed-rate-v1$/);
        if (match && window.ICHIGEKI_MACHINES?.[match[1]]?.type === "slot") localStorage.removeItem(key);
      });
      localStorage.setItem(OLD_RANKING_CLEANUP_KEY, new Date().toISOString());
    } catch {}
  }

  removeOldRankings();

  const body = document.body;
  document.querySelectorAll(".mobile-app-bottom-nav").forEach(nav => nav.remove());
  body.classList.remove("has-mobile-app-nav");

  const header = document.querySelector(".site-header .header-inner");
  const pageName = window.location.pathname.split("/").filter(Boolean).pop() || "index.html";
  const isTopPage = pageName === "index.html";

  if (body.classList.contains("juggle-simple-page") && !isTopPage && !document.querySelector(".standalone-top-return")) {
    const topBar = document.createElement("div");
    topBar.className = "standalone-top-bar";
    topBar.innerHTML = `<a class="standalone-top-return" href="index.html" aria-label="TOPページへ戻る"><span aria-hidden="true">←</span><b>TOP</b></a>`;
    body.prepend(topBar);
  }

  if (header && !isTopPage && !body.classList.contains("juggle-simple-page") && !header.querySelector(".global-top-return")) {
    const topReturn = document.createElement("a");
    topReturn.className = "global-top-return";
    topReturn.href = "index.html";
    topReturn.setAttribute("aria-label", "TOPページへ戻る");
    topReturn.innerHTML = `<span aria-hidden="true">←</span><b>TOP</b>`;
    header.prepend(topReturn);
    header.querySelectorAll(":scope > .nav a[href='index.html']").forEach(link => {
      link.classList.add("nav-top-duplicate");
    });
  }

  if (header && !header.querySelector(".mobile-header-menu, .shared-site-menu")) {
    const menu = document.createElement("details");
    menu.className = "shared-site-menu";
    menu.innerHTML = `<summary aria-label="メニューを開く"><span></span><span></span><span></span></summary>
      <nav aria-label="サイトメニュー">
        <a href="pachinko.html"><b>パチンコで遊ぶ</b><small>人気台・新台・デカヘソ・LT</small></a>
        <a href="slots.html"><b>スロットで遊ぶ</b><small>人気台・新台・スマスロ・Aタイプ</small></a>
        <a href="new-machines-2026-11.html"><b>11月の新台まとめ</b><small>パチンコ5台・スマスロ4台を比較</small></a>
        <a href="ranking.html"><b>マイ記録</b><small>成績・履歴・称号</small></a>
        <a href="rankings.html"><b>機種別ランキング</b><small>遊ぶ台を選んで順位を見る</small></a>
        <a href="community.html"><b>コミュニティ</b><small>口コミ・収支・画像・動画</small></a>
        <a href="articles.html"><b>記事・ガイド</b><small>新台記事・数値解説・計算ツール</small></a>
        <a href="account.html"><b>アカウント</b></a>
      </nav>`;
    header.append(menu);
  }

  if (!document.getElementById("ichigeki-auth-script")) {
    const auth = document.createElement("script");
    auth.id = "ichigeki-auth-script";
    auth.src = "auth.js?v=1";
    document.head.appendChild(auth);
  }
})();
