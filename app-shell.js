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
  if (header && !header.querySelector(".mobile-header-menu, .shared-site-menu")) {
    const menu = document.createElement("details");
    menu.className = "shared-site-menu";
    menu.innerHTML = `<summary aria-label="メニューを開く"><span></span><span></span><span></span></summary>
      <nav aria-label="サイトメニュー">
        <a href="pachinko.html"><b>パチンコで遊ぶ</b><small>人気台・新台・デカヘソ・LT</small></a>
        <a href="slots.html"><b>スロットで遊ぶ</b><small>人気台・新台・スマスロ・Aタイプ</small></a>
        <a href="ranking.html"><b>マイ記録</b><small>成績・履歴・称号</small></a>
        <a href="rankings.html"><b>機種別ランキング</b><small>遊ぶ台を選んで順位を見る</small></a>
        <a href="community.html"><b>コミュニティ</b><small>口コミ・収支・画像・動画</small></a>
        <a href="guide.html"><b>使い方・ガイド</b></a>
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
