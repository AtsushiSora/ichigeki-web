import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteDirectory = path.resolve(scriptDirectory, "..");
const libraryPath = path.join(siteDirectory, "machine-library.js");
const sandbox = { window: {} };

vm.runInNewContext(fs.readFileSync(libraryPath, "utf8"), sandbox, {
  filename: libraryPath
});

const machines = sandbox.window.ICHIGEKI_MACHINES || {};
const STATIC_START = "<!-- MACHINE_STATIC_START -->";
const STATIC_END = "<!-- MACHINE_STATIC_END -->";
const SCHEMA_START = "<!-- MACHINE_SCHEMA_START -->";
const SCHEMA_END = "<!-- MACHINE_SCHEMA_END -->";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatNumber(value, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("ja-JP", { maximumFractionDigits }).format(value);
}

function typeLabel(machine) {
  return machine.type === "slot" ? "パチスロ" : "パチンコ";
}

function editorialDate(machine) {
  return machine.updated || "2026-10-12";
}

function editorialDateLabel(machine) {
  const [year, month, day] = editorialDate(machine).split("-").map(Number);
  return `${year}年${month}月${day}日`;
}

function calculationSection(machine) {
  const sim = machine.sim;
  if (sim.kind === "pachinko") {
    const averageInvestment = Math.round((sim.hitRate / sim.spinsPer1k * 1000) / 100) * 100;
    return `
      <section class="machine-article-section">
        <h3>平均回転と投資目安の計算</h3>
        <p>通常時の${escapeHtml(sim.hitLabel)}確率は約1/${escapeHtml(sim.hitRate)}です。当サイトでは、1,000円あたり${escapeHtml(sim.spinsPer1k)}回転という機種別の固定条件を使い、平均投資目安を「${escapeHtml(sim.hitRate)} ÷ ${escapeHtml(sim.spinsPer1k)} × 1,000円」で計算します。この条件では約${formatNumber(averageInvestment, 0)}円が平均投資の目安です。</p>
        <p>${escapeHtml(sim.startType)}、250玉貸し・28玉交換で固定し、${escapeHtml(sim.rushLabel)}突入率${formatNumber(sim.rushEntry * 100)}%と継続率${formatNumber(sim.rushContinue * 100)}%を簡易抽選します。平均値は長期間の理論上の目安であり、1回ごとの結果や実際の遊技収支を保証するものではありません。</p>
      </section>`;
  }

  if (sim.kind === "juggler") {
    return `
      <section class="machine-article-section">
        <h3>設定1〜6ランダム・8,000G固定の計算</h3>
        <p>START時に設定1〜6を均等抽選し、設定は最終結果まで伏せます。選ばれた設定のBIG・REG確率を使い、${formatNumber(sim.games, 0)}Gを1ゲームずつ抽選します。設定1の基準値はBIG約1/${escapeHtml(sim.bigRate)}、REG約1/${escapeHtml(sim.regRate)}、合算約1/${escapeHtml(sim.combinedRate)}です。</p>
        <p>抽選された設定の出玉率とボーナス理論回数を基準に差枚を計算します。46枚貸し・5.2枚交換で固定し、結果・マイ記録・ランキングに設定を表示します。</p>
        <p><a href="juggler-8000g-guide.html">ジャグラー4機種の8,000G理論回数比較</a>では、BIG・REGの期待回数と結果のブレを一覧で確認できます。</p>
      </section>`;
  }

  const gamesPerThousand = sim.base50 * 46 / 50;
  const averageInvestment = Math.round((sim.mainRate / gamesPerThousand * 1000) / 100) * 100;
  const settingPool = Array.isArray(sim.settingPool) && sim.settingPool.length ? sim.settingPool : [1, 2, 3, 4, 5, 6];
  const baselineSetting = settingPool[0] || 1;
  const usesAllSettings = settingPool.length === 6 && [1, 2, 3, 4, 5, 6].every(setting => settingPool.includes(setting));
  const settingLabel = usesAllSettings ? "設定1〜6" : `設定${settingPool.join("・")}`;
  const settingModelDescription = sim.settingRates
    ? `${settingLabel}で公開されている初当り値を個別に使います。公開されていない特化ゾーン・上位到達率の設定差は加えません。`
    : `設定別の数値が揃わない機種は、設定${baselineSetting}相当の掲載値へサイト共通の固定補正を加える体験用モデルです。非公表の実機値を推測したものではありません。`;
  return `
      <section class="machine-article-section">
        <h3>平均Gと投資目安の計算</h3>
        <p>掲載する${escapeHtml(sim.mainLabel)}初当り約1/${escapeHtml(sim.mainRate)}は設定${baselineSetting}基準です。当サイトでは50枚あたり${escapeHtml(sim.base50)}G、1,000円46枚貸しの固定条件から、設定${baselineSetting}基準の平均投資目安を約${formatNumber(averageInvestment, 0)}円と計算します。</p>
        <p>シミュレーターでは${escapeHtml(settingLabel)}を均等抽選します。${escapeHtml(settingModelDescription)} 換金は5.2枚交換で固定し、結果とランキングに設定を表示します。</p>
      </section>`;
}

function articleSections(machine) {
  if (Array.isArray(machine.articleSections) && machine.articleSections.length) {
    return machine.articleSections.map(section => `
      <section class="machine-article-section">
        <h3>${escapeHtml(section.heading)}</h3>
        ${(section.paragraphs || []).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("\n        ")}
        ${section.bullets?.length ? `<ul>${section.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      </section>`).join("");
  }

  const sim = machine.sim;
  const flow = sim.kind === "pachinko"
    ? `${sim.hitLabel}までの回転数、${sim.rushLabel}への突入、連チャン数と出玉を順番に抽選します。`
    : `${sim.triggerLabel}、${sim.mainLabel}、${sim.upperChallenge}、${sim.upperLabel}の順に、各段階の到達と獲得枚数を抽選します。`;
  return `
      <section class="machine-article-section">
        <h3>${escapeHtml(machine.shortName)}で確認できること</h3>
        <p>${escapeHtml(flow)} 公開されている代表的な数値をもとに遊びやすく単純化し、同じ機種では全員が同じ貸出・交換条件で比較できるようにしています。</p>
        <p>実機にある全ての内部状態、設定差、演出、出玉削り、打ち方による差は再現していません。スペックを読み解き、早い当りと深いハマり、通常結果と上位結果の幅を比べるための体験用モデルです。</p>
      </section>`;
}

function staticMarkup(slug, machine) {
  const specs = machine.specs.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
  const points = machine.points.map(point => `<li>${escapeHtml(point)}</li>`).join("");
  const sources = machine.sources.map(([label, url]) => `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a></li>`).join("");
  const simLabel = machine.sim.kind === "pachinko"
    ? `${machine.sim.hitLabel}・${machine.sim.rushLabel}・出玉`
    : machine.sim.kind === "juggler"
      ? `8,000G・BIG・REG・差枚`
      : `${machine.sim.triggerLabel}・${machine.sim.mainLabel}・${machine.sim.upperLabel}`;

  return `${STATIC_START}
<main class="page machine-detail-shell" id="machineApp">
  <article class="machine-static-content">
    <section class="machine-archive-hero theme-${escapeHtml(machine.theme)}">
      <div><span class="machine-kind">${escapeHtml(typeLabel(machine))} 機種記事</span><h1>${escapeHtml(machine.name)}</h1><p>${escapeHtml(machine.catchcopy)}</p></div>
      <dl><div><dt>導入</dt><dd>${escapeHtml(machine.year)}</dd></div><div><dt>メーカー</dt><dd>${escapeHtml(machine.maker)}</dd></div><div><dt>分類</dt><dd>${escapeHtml(typeLabel(machine))}</dd></div></dl>
    </section>
    <nav class="machine-quick-nav" aria-label="ページ内メニュー"><a href="#spec">スペック</a><a href="#article">解説</a><a href="community.html?machine=${encodeURIComponent(slug)}">口コミ・投稿</a></nav>
    <section class="machine-intro" id="spec">
      <div><span class="machine-section-label">SPEC GUIDE</span><h2>主要スペック</h2><p>${escapeHtml(machine.intro)}</p><ul>${points}</ul></div>
      <div class="machine-spec-grid">${specs}</div>
    </section>
    <section class="machine-article-layout" id="article">
      <div class="machine-article">
        <span class="machine-section-label">MACHINE ARTICLE</span>
        <h2>${escapeHtml(machine.name)}の見どころと計算条件</h2>
        <div class="machine-article-meta"><span>編集・検証：<a href="about.html">ICHIGEKI編集部</a></span><time datetime="${editorialDate(machine)}">更新：${editorialDateLabel(machine)}</time></div>
        <p>${escapeHtml(machine.intro)}</p>
        ${articleSections(machine)}
        ${calculationSection(machine)}
        <section class="machine-article-section">
          <h3>簡易シミュレーターについて</h3>
          <p>${escapeHtml(simLabel)}の流れを固定条件で体験できます。JavaScriptを有効にすると、この位置にシミュレーター、演出、マイ記録、機種別ランキングが表示されます。</p>
          <p>結果は娯楽・確率理解のための参考表示です。金銭的価値や交換価値はなく、実際の勝敗や収支を保証しません。18歳未満の方の利用はお控えください。</p>
        </section>
        <h3>関連ガイド</h3>
        <div class="next-links"><a href="average-game-guide.html">平均G・平均回転</a><a href="continuation-rate-guide.html">継続率と平均連</a><a href="simulation-policy.html">計算・掲載方針</a></div>
        <h3>参照情報</h3>
        <ul class="machine-sources">${sources}</ul>
      </div>
    </section>
    <noscript><p class="note">シミュレーターを動かすにはJavaScriptを有効にしてください。記事とスペックはこのまま読めます。</p></noscript>
  </article>
</main>
${STATIC_END}`;
}

function schemaMarkup(slug, machine) {
  const modified = editorialDate(machine);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${machine.name}｜スペック・シミュレーター`,
    description: machine.intro,
    dateModified: `${modified}T00:00:00+09:00`,
    author: { "@type": "Organization", name: "ICHIGEKI編集部", url: "https://ichigeki-pachislot.com/about.html" },
    publisher: { "@type": "Organization", name: "ICHIGEKI" },
    mainEntityOfPage: `https://ichigeki-pachislot.com/${slug}.html`,
    inLanguage: "ja"
  };
  return `${SCHEMA_START}<script type="application/ld+json">${JSON.stringify(schema)}</script>${SCHEMA_END}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function updateMachineSitemap() {
  const sitemapPath = path.join(siteDirectory, "sitemap.xml");
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const [slug, machine] of Object.entries(machines)) {
    const url = `https://ichigeki-pachislot.com/${slug}.html`;
    const entry = `  <url><loc>${url}</loc><lastmod>${editorialDate(machine)}</lastmod></url>`;
    const pattern = new RegExp(`  <url><loc>${escapeRegExp(url)}</loc>(?:<lastmod>[^<]+</lastmod>)?</url>`);
    if (pattern.test(sitemap)) sitemap = sitemap.replace(pattern, entry);
    else sitemap = sitemap.replace("</urlset>", `${entry}\n</urlset>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
}

let updated = 0;
for (const [slug, machine] of Object.entries(machines)) {
  const htmlPath = path.join(siteDirectory, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) throw new Error(`HTML file not found: ${htmlPath}`);

  let html = fs.readFileSync(htmlPath, "utf8");
  const content = staticMarkup(slug, machine);
  const schema = schemaMarkup(slug, machine);

  if (html.includes(STATIC_START)) {
    html = html.replace(new RegExp(`${STATIC_START}[\\s\\S]*?${STATIC_END}`), content);
  } else {
    html = html.replace(/<main class="page machine-detail-shell" id="machineApp">[\s\S]*?<\/main>/, content);
  }

  if (html.includes(SCHEMA_START)) {
    html = html.replace(new RegExp(`${SCHEMA_START}[\\s\\S]*?${SCHEMA_END}`), schema);
  } else {
    html = html.replace("</head>", `${schema}</head>`);
  }

  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(machine.intro)}">`);
  html = html.replace(/style\.css\?v=\d+/, "style.css?v=134");
  html = html.replace(/machine-detail\.js\?v=\d+/, "machine-detail.js?v=133");
  html = html.replace(/machine-library\.js\?v=\d+/, "machine-library.js?v=121");
  html = html.replace(/app-shell\.js\?v=\d+/, "app-shell.js?v=4");
  html = html.replace(/adsense-loader\.js\?v=\d+/, "adsense-loader.js?v=2");
  if (!html.includes("site-insights.js")) html = html.replace(/(<script src="machine-detail\.js\?v=129"><\/script>)/, '<script src="site-insights.js?v=1"></script>\n  $1');
  if (!html.includes("adsense-loader.js")) html = html.replace("</body>", '  <script src="adsense-loader.js?v=2"></script>\n</body>');

  fs.writeFileSync(htmlPath, html.replace(/^[\t ]+$/gm, ""));
  updated += 1;
}

updateMachineSitemap();

console.log(`Prerendered ${updated} machine pages.`);
