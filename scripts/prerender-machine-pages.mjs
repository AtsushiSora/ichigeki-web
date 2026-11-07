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
const availability = sandbox.window.ICHIGEKI_MACHINE_AVAILABILITY || { isReady: () => true, label: () => "" };
const STATIC_START = "<!-- MACHINE_STATIC_START -->";
const STATIC_END = "<!-- MACHINE_STATIC_END -->";
const SCHEMA_START = "<!-- MACHINE_SCHEMA_START -->";
const SCHEMA_END = "<!-- MACHINE_SCHEMA_END -->";
const initialHitName = label => /初当り|初当たり/.test(String(label || "")) ? String(label) : `${label}初当り`;
const CONTENT_UPDATE_DATE = "2026-11-05";
const NEW_MACHINE_ARTICLE_SLUGS = new Set([
  "wanwan-celebration",
  "akina-forfans",
  "shin-ultraman-79",
  "takt-opus-destiny",
  "majo-to-yaju-pachinko",
  "fire-force-pachinko",
  "gundam-seed-pachinko",
  "gen-san-chou-idaten",
  "goblin-slayer-slot",
  "kinnikuman-7-slot",
  "shangri-la-frontier",
  "sao-phantom-bullet",
  "milliongod-raigeki",
  "garo13-hagane",
  "godzilla-eva-wind-burst",
  "basilisk4-slot",
  "assault-lily-slot",
  "toaru3-pachinko",
  "kamen-rider-black-light",
  "granbelm-319",
  "fever-yokai-watch",
  "juoh-shishi-no-ichigeki",
  "no-game-no-life-119",
  "garo-yami-slot",
  "seiya-ougon-slot",
  "ggo-slot",
  "godzilla-eva2-slot",
  "mahoako-slot",
  "uminchu-slot",
  "tenten-slot",
  "ragnador-slot",
  "onepunchman2-99"
]);
const NOVEMBER_NEW_MACHINE_SLUGS = new Set([
  "toaru3-pachinko",
  "kamen-rider-black-light",
  "granbelm-319",
  "fever-yokai-watch",
  "juoh-shishi-no-ichigeki",
  "no-game-no-life-119",
  "garo-yami-slot",
  "seiya-ougon-slot",
  "ggo-slot",
  "godzilla-eva2-slot",
  "ragnador-slot",
  "onepunchman2-99"
]);
const DECEMBER_NEW_MACHINE_SLUGS = new Set([
  "shangri-la-frontier",
  "sao-phantom-bullet",
  "milliongod-raigeki",
  "garo13-hagane",
  "godzilla-eva-wind-burst",
  "basilisk4-slot",
  "assault-lily-slot"
]);
const INDEXABLE_MACHINE_SLUGS = NEW_MACHINE_ARTICLE_SLUGS;
const cliArgs = process.argv.slice(2);
const indexOnly = cliArgs.includes("--index-only");
const requestedSlugs = new Set(cliArgs.filter(argument => !argument.startsWith("--")));

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

function hubPage(machine) {
  return machine.type === "slot" ? "slots.html" : "pachinko.html";
}

function breadcrumbItems(slug, machine) {
  const items = [
    { name: "TOP", url: "https://ichigeki-pachislot.com/" },
    { name: typeLabel(machine), url: `https://ichigeki-pachislot.com/${hubPage(machine)}` }
  ];
  if (NOVEMBER_NEW_MACHINE_SLUGS.has(slug)) {
    items.push({ name: "2026年11月の新台", url: "https://ichigeki-pachislot.com/new-machines-2026-11.html" });
  } else if (DECEMBER_NEW_MACHINE_SLUGS.has(slug)) {
    items.push({ name: "2026年12月の新台", url: "https://ichigeki-pachislot.com/new-machines-2026-12.html" });
  }
  items.push({ name: machine.name, url: `https://ichigeki-pachislot.com/${slug}.html` });
  return items;
}

function visibleBreadcrumb(slug, machine) {
  const novemberLink = NOVEMBER_NEW_MACHINE_SLUGS.has(slug)
    ? '<span>›</span><a href="new-machines-2026-11.html">11月新台</a>'
    : "";
  const decemberLink = DECEMBER_NEW_MACHINE_SLUGS.has(slug)
    ? '<span>›</span><a href="new-machines-2026-12.html">12月新台</a>'
    : "";
  return `<nav class="article-breadcrumb machine-breadcrumb" aria-label="パンくず"><a href="index.html">TOP</a><span>›</span><a href="${hubPage(machine)}">${escapeHtml(typeLabel(machine))}</a>${novemberLink}${decemberLink}<span>›</span><span aria-current="page">${escapeHtml(machine.shortName)}</span></nav>`;
}

function editorialDate(machine) {
  return machine.updated && machine.updated > CONTENT_UPDATE_DATE ? machine.updated : CONTENT_UPDATE_DATE;
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
        <p>${escapeHtml(sim.startType)}、250玉貸し・28玉交換で固定し、${escapeHtml(sim.rushLabel)}突入率${formatNumber(sim.rushEntry * 100)}%と継続率${formatNumber(sim.rushContinue * 100)}%を簡易抽選します。表記出玉とは別に、打ち出しとオーバー入賞を簡易反映した実獲得出玉を収支へ使用します。平均値は長期間の理論上の目安であり、1回ごとの結果や実際の遊技収支を保証するものではありません。</p>
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
  const initialHitLabel = sim.mainRateLabel || (machine.initialHitLabel ? "ボーナス" : sim.mainLabel);
  return `
      <section class="machine-article-section">
        <h3>平均Gと投資目安の計算</h3>
        <p>掲載する${escapeHtml(initialHitName(initialHitLabel))}約1/${escapeHtml(sim.mainRate)}は設定${baselineSetting}基準です。当サイトでは50枚あたり${escapeHtml(sim.base50)}G、1,000円46枚貸しの固定条件から、設定${baselineSetting}基準の平均投資目安を約${formatNumber(averageInvestment, 0)}円と計算します。</p>
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

function readerGuideMarkup(machine) {
  const guide = machine.readerGuide;
  if (!guide) return "";
  const comparisonLinks = (guide.compare || []).map(([slug, label, note]) => `
          <a href="${escapeHtml(slug)}.html"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(note)}</span></a>`).join("");
  return `
        <section class="machine-reader-guide" id="reader-guide">
          <div class="machine-reader-guide-head"><span>QUICK VERDICT</span><h3>30秒で分かる${escapeHtml(machine.shortName)}</h3></div>
          <p class="machine-reader-guide-lead">${escapeHtml(guide.verdict)}</p>
          <div class="machine-reader-guide-grid">
            <div><h4>こんな遊び方に向いている</h4><ul>${guide.bestFor.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
            <div><h4>遊ぶ前に確認したいこと</h4><ul>${guide.check.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
          </div>
          <div class="machine-reader-related"><h4>比較候補</h4><div>${comparisonLinks}</div></div>
        </section>`;
}

function snapshotMarkup(machine) {
  const sim = machine.sim;
  let items;
  let note;
  if (sim.kind === "pachinko") {
    const averageInvestment = Math.round((sim.hitRate / sim.spinsPer1k * 1000) / 100) * 100;
    items = [
      ["初当り", `約1/${sim.hitRate}`, `${sim.hitLabel}までの確率`],
      ["平均投資", `約${formatNumber(averageInvestment, 0)}円`, `${sim.spinsPer1k}回/1,000円で計算`],
      ["RUSH突入", `${formatNumber(sim.rushEntry * 100)}%`, sim.rushLabel],
      ["RUSH継続", `${formatNumber(sim.rushContinue * 100)}%`, sim.upperLabel ? `${sim.upperLabel}は別抽選` : "継続抽選の基準"]
    ];
    note = "結果では表記出玉と実獲得出玉を分け、250玉貸し・28玉交換の固定条件で差玉と収支を計算します。";
  } else if (sim.kind === "juggler") {
    const settingPool = Array.isArray(sim.settingPool) && sim.settingPool.length ? sim.settingPool : [1, 2, 3, 4, 5, 6];
    items = [
      ["遊技上限", `${formatNumber(sim.games, 0)}G`, "続行・終了を選択"],
      ["BIG", `約1/${sim.bigRate}`, "設定1の基準値"],
      ["REG", `約1/${sim.regRate}`, "設定1の基準値"],
      ["設定抽選", `設定${settingPool.join("・")}`, "開始時に均等抽選"]
    ];
    note = "ボーナスごとに続行を選び、終了時に設定・BIG回数・REG回数・差枚・収支をまとめて確認できます。";
  } else if (sim.okidokiGoldFlow) {
    const settingPool = Array.isArray(sim.settingPool) && sim.settingPool.length ? sim.settingPool : [1, 2, 3, 5, 6];
    items = [
      ["初当り", `約1/${sim.mainRate}`, "設定1のBONUS初当り"],
      ["BIG／REG", "約210／90枚", "70G／30G・純増約3.0枚/G"],
      ["天国ループ", "約75%", "BONUS後32G以内"],
      ["設定抽選", `設定${settingPool.join("・")}`, "設定4は非搭載"]
    ];
    note = "BONUSごとに32Gを数え、天国・ドキドキ・超ドキドキ・保証・金ドキの内部ルートを結果へ残します。";
  } else {
    const settingPool = Array.isArray(sim.settingPool) && sim.settingPool.length ? sim.settingPool : [1, 2, 3, 4, 5, 6];
    const gamesPerThousand = sim.base50 * 46 / 50;
    const averageInvestment = Math.round((sim.mainRate / gamesPerThousand * 1000) / 100) * 100;
    const risk = sim.coinUnit >= 4 ? "超高波" : sim.coinUnit >= 3.5 ? "高波" : sim.coinUnit >= 3 ? "中波" : "比較的穏やか";
    const initialHitLabel = sim.mainRateLabel || machine.initialHitLabel || sim.mainLabel;
    items = [
      ["初当り", `約1/${sim.mainRate}`, initialHitLabel],
      ["平均投資", `約${formatNumber(averageInvestment, 0)}円`, `設定${settingPool[0]}基準`],
      ["コイン単価", `${sim.coinUnit}円`, risk],
      ["設定抽選", `設定${settingPool.join("・")}`, "開始時に均等抽選"]
    ];
    note = `${sim.triggerLabel}から${initialHitLabel}${initialHitLabel !== sim.mainLabel ? `、${sim.mainLabel}` : ""}${sim.upperLabel ? `、${sim.upperLabel}` : ""}までの流れと、設定ごとの結果差を固定レートで比較できます。`;
  }
  return `
        <section class="machine-snapshot" aria-labelledby="machine-snapshot-title">
          <div class="machine-snapshot-head"><span>AT A GLANCE</span><h3 id="machine-snapshot-title">${escapeHtml(machine.shortName)}を数字で早分かり</h3></div>
          <div class="machine-snapshot-grid">${items.map(([label, value, detail]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(detail)}</small></div>`).join("")}</div>
          <p>${escapeHtml(note)}</p>
        </section>`;
}

function resultGuideMarkup(machine) {
  const sim = machine.sim;
  const settingPool = Array.isArray(sim.settingPool) && sim.settingPool.length ? sim.settingPool : [1, 2, 3, 4, 5, 6];
  const items = sim.kind === "pachinko"
    ? [["当るまで", `${sim.hitLabel}までの回転数と投資目安`], ["RUSH", `${sim.rushLabel}への突入と連チャン回数`], ["出玉", "表記出玉と、打ち出しを反映した実獲得出玉"], ["最終収支", "実獲得出玉を28玉交換で換算した収支目安"]]
    : sim.kind === "juggler"
      ? [["ボーナス", "何GでBIG・REGに当ったか"], ["続行判断", "ボーナスごとに続ける・やめるを選択"], ["実戦データ", "総G数、BIG・REG回数、合算"], ["最終収支", "差枚と5.2枚交換の収支目安"]]
      : sim.okidokiGoldFlow
        ? [["初当り", "ハイビスカス点灯までのゲーム数"], ["BONUS", "BIG・REGの回数と最大32G連"], ["内部モード", "天国・保証・金ドキ・ドキドキへの到達"], ["最終収支", "差枚と5.2枚交換の収支目安"]]
      : [["当るまで", `${sim.triggerLabel}・${sim.mainLabel}までのゲーム数`], ["設定", `設定${settingPool.join("・")}から抽選された今回の設定`], ["上位到達", `${sim.upperChallenge || "上位CZ"}と${sim.upperLabel || "上位AT"}への到達`], ["最終収支", "差枚と5.2枚交換の収支目安"]];
  return `
        <section class="machine-article-section machine-result-guide">
          <h3>シミュレーション結果の見方</h3>
          <div>${items.map(([label, detail]) => `<p><strong>${escapeHtml(label)}</strong><span>${escapeHtml(detail)}</span></p>`).join("")}</div>
          <p class="machine-result-guide-note">結果は自動で「マイ記録」に保存され、同じ機種を何回試したか、最高収支、勝率をあとから確認できます。</p>
        </section>`;
}

function faqItems(slug, machine) {
  if (Array.isArray(machine.faq) && machine.faq.length) return machine.faq;
  const sim = machine.sim;
  const releaseSummary = String(machine.intro || "").split("。")[0] + "。";
  if (sim.kind === "pachinko") {
    const averageInvestment = Math.round((sim.hitRate / sim.spinsPer1k * 1000) / 100) * 100;
    const upperFlow = sim.upperLabel ? `、さらに${sim.upperLabel}` : "";
    return [
      { question: `${machine.shortName}はどんな台？`, answer: `${releaseSummary}${machine.points?.[0] ? ` ${machine.points[0]}が主な確認ポイントです。` : ""}` },
      { question: `${machine.shortName}の平均投資目安は？`, answer: `当サイトの固定条件では1,000円あたり${sim.spinsPer1k}回転として、平均${formatNumber(averageInvestment, 0)}円が目安です。実店舗の回転率や持ち玉状況で変わるため、実収支を保証する値ではありません。` },
      { question: `シミュレーターでは何を体験できる？`, answer: `${sim.hitLabel}までの回転数、${sim.rushLabel}への突入、連チャンと出玉${upperFlow}を固定条件で簡易抽選します。実機の全演出や内部状態を完全再現するものではありません。` },
      { question: `出玉と収支はどう計算する？`, answer: "スペック上の表記出玉とは別に、打ち出しロスとオーバー入賞を簡易反映した実獲得出玉を算出します。250玉貸し・28玉交換の固定条件で差玉と収支目安を表示します。" }
    ];
  }

  const gamesPerThousand = sim.base50 * 46 / 50;
  const averageInvestment = Math.round((sim.mainRate / gamesPerThousand * 1000) / 100) * 100;
  const settingPool = Array.isArray(sim.settingPool) && sim.settingPool.length ? sim.settingPool : [1, 2, 3, 4, 5, 6];
  const initialHitLabel = sim.mainRateLabel || machine.initialHitLabel || sim.mainLabel;
  return [
    { question: `${machine.shortName}はどんな台？`, answer: `${releaseSummary}${machine.points?.[0] ? ` ${machine.points[0]}が主な確認ポイントです。` : ""}` },
    { question: `${machine.shortName}の平均投資目安は？`, answer: `設定${settingPool[0]}基準の${initialHitName(initialHitLabel)}約1/${sim.mainRate}と、50枚あたり${sim.base50}G・46枚貸しの固定条件から、平均${formatNumber(averageInvestment, 0)}円を目安として表示します。実際の設定や遊技状況で結果は変わります。` },
    { question: `設定とゲームの流れはどう抽選する？`, answer: sim.kind === "juggler" ? `開始時に設定${settingPool.join("・")}から1つを均等抽選し、最大${formatNumber(sim.games, 0)}GまでBIG・REGを抽選します。設定は終了時の結果とランキングに表示します。` : sim.okidokiGoldFlow ? `開始時に設定${settingPool.join("・")}から1つを均等抽選し、BONUS初当り後はBIG・REG、32G連、天国・ドキドキ・超ドキドキ・保証・金ドキを順番に判定します。設定と最高内部モードは最終結果に表示します。` : `開始時に設定${settingPool.join("・")}から1つを均等抽選し、${sim.triggerLabel}、${initialHitLabel}${initialHitLabel !== sim.mainLabel ? `、${sim.mainLabel}` : ""}、${sim.upperChallenge}、${sim.upperLabel}の順で到達を判定します。設定は最終結果とランキングに表示します。` },
    { question: `収支はどう計算する？`, answer: "1,000円46枚貸し・5.2枚交換の固定条件で投資、換金、収支目安を計算します。実店舗の再プレイ、持ちメダル、端数処理は含みません。" }
  ];
}

function faqMarkup(slug, machine) {
  const items = faqItems(slug, machine);
  if (!items.length) return "";
  return `
        <section class="machine-article-section machine-faq" id="faq" aria-labelledby="machine-faq-title">
          <h3 id="machine-faq-title">${escapeHtml(machine.shortName)}のよくある質問</h3>
          <div class="machine-faq-list">${items.map(item => `<div><h4>${escapeHtml(item.question)}</h4><p>${escapeHtml(item.answer)}</p></div>`).join("")}</div>
        </section>`;
}

function staticMarkup(slug, machine) {
  const machineReady = availability.isReady(machine);
  const availabilityLabel = availability.label(machine);
  const specs = machine.specs.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
  const points = machine.points.map(point => `<li>${escapeHtml(point)}</li>`).join("");
  const sources = machine.sources.map(([label, url]) => `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a></li>`).join("");
  const simLabel = machine.sim.kind === "pachinko"
    ? `${machine.sim.hitLabel}・${machine.sim.rushLabel}・出玉`
    : machine.sim.kind === "juggler"
      ? `8,000G・BIG・REG・差枚`
      : `${machine.sim.triggerLabel}・${machine.sim.mainLabel}・${machine.sim.upperLabel}`;
  const heroImage = machine.image ? `<figure class="machine-archive-visual">
      <img src="${escapeHtml(machine.image)}" alt="${escapeHtml(machine.imageAlt || `${machine.shortName}の機種画像`)}" decoding="async">
      ${machine.imageCredit ? `<figcaption>${machine.imageSource ? `<a href="${escapeHtml(machine.imageSource)}" target="_blank" rel="noopener noreferrer">${escapeHtml(machine.imageCredit)} ↗</a>` : escapeHtml(machine.imageCredit)}</figcaption>` : ""}
    </figure>` : "";

  return `${STATIC_START}
<main class="page machine-detail-shell" id="machineApp">
  <article class="machine-static-content">
    ${visibleBreadcrumb(slug, machine)}
    <section class="machine-archive-hero theme-${escapeHtml(machine.theme)}${machine.image ? " has-image" : ""}">
      ${heroImage}
      <div class="machine-archive-copy"><span class="machine-kind">${machineReady ? `${escapeHtml(typeLabel(machine))} 機種記事` : "COMING SOON・準備中"}</span><h1>${escapeHtml(machine.name)}</h1><p>${escapeHtml(machine.catchcopy)}</p>${machineReady ? "" : `<div class="machine-preparing-hero"><strong>準備中</strong><span>${escapeHtml(availabilityLabel)}</span></div>`}</div>
      <dl><div><dt>導入</dt><dd>${escapeHtml(machine.year)}</dd></div><div><dt>メーカー</dt><dd>${escapeHtml(machine.maker)}</dd></div><div><dt>分類</dt><dd>${escapeHtml(typeLabel(machine))}</dd></div></dl>
    </section>
    <nav class="machine-quick-nav" aria-label="ページ内メニュー"><a href="#spec">スペック</a><a href="#article">記事</a>${machineReady ? '<a href="#machineRanking">ランキング</a>' : ""}<a href="#faq">FAQ</a>${machine.readerGuide ? '<a href="#reader-guide">30秒要点</a>' : ""}${NOVEMBER_NEW_MACHINE_SLUGS.has(slug) ? '<a href="new-machines-2026-11.html">11月新台比較</a>' : ""}${DECEMBER_NEW_MACHINE_SLUGS.has(slug) ? '<a href="new-machines-2026-12.html">12月新台比較</a>' : ""}<a href="community.html?machine=${encodeURIComponent(slug)}">投稿</a></nav>
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
        ${snapshotMarkup(machine)}
        ${readerGuideMarkup(machine)}
        ${articleSections(machine)}
        ${calculationSection(machine)}
        ${resultGuideMarkup(machine)}
        <section class="machine-article-section">
          <h3>簡易シミュレーターについて</h3>
          <p>${escapeHtml(simLabel)}の流れを固定条件で体験できます。JavaScriptを有効にすると、この位置にシミュレーター、演出、マイ記録、機種別ランキングが表示されます。</p>
          <p>結果は娯楽・確率理解のための参考表示です。金銭的価値や交換価値はなく、実際の勝敗や収支を保証しません。18歳未満の方の利用はお控えください。</p>
        </section>
        ${faqMarkup(slug, machine)}
        <div class="machine-article-sim-cta"><span>SIMULATOR</span><strong>${machineReady ? "読んだ内容を固定条件で試す" : "導入前・シミュレーター準備中"}</strong><p>${machineReady ? "同じ貸出・交換条件で、初当りから最終結果までを体験できます。結果は自動でマイ記録へ保存されます。" : `${escapeHtml(availabilityLabel)}です。導入後に固定条件で遊べるようになります。`}</p>${machineReady ? '<a class="button primary" href="#simulator">シミュレーターを試す</a>' : '<span class="button is-disabled" aria-disabled="true">準備中</span>'}</div>
        <h3>関連ガイド</h3>
        <div class="next-links">${NOVEMBER_NEW_MACHINE_SLUGS.has(slug) ? '<a href="new-machines-2026-11.html">11月新台10機種を比較</a>' : ""}${DECEMBER_NEW_MACHINE_SLUGS.has(slug) ? '<a href="new-machines-2026-12.html">12月新台の先行比較</a>' : ""}<a href="average-game-guide.html">平均G・平均回転</a><a href="continuation-rate-guide.html">継続率と平均連</a><a href="simulation-policy.html">計算・掲載方針</a></div>
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
  const article = {
    "@type": "Article",
    headline: `${machine.name}｜スペック・シミュレーター`,
    description: machine.intro,
    datePublished: `${machine.published || modified}T00:00:00+09:00`,
    dateModified: `${modified}T00:00:00+09:00`,
    author: { "@type": "Organization", name: "ICHIGEKI編集部", url: "https://ichigeki-pachislot.com/about.html" },
    publisher: { "@type": "Organization", name: "ICHIGEKI" },
    mainEntityOfPage: `https://ichigeki-pachislot.com/${slug}.html`,
    inLanguage: "ja"
  };
  if (machine.image) article.image = `https://ichigeki-pachislot.com/${machine.image}`;
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems(slug, machine).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
  const faqs = faqItems(slug, machine);
  const schema = faqs.length ? {
    "@context": "https://schema.org",
    "@graph": [
      article,
      breadcrumbs,
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(item => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer }
        }))
      }
    ]
  } : { "@context": "https://schema.org", "@graph": [article, breadcrumbs] };
  return `${SCHEMA_START}<script type="application/ld+json">${JSON.stringify(schema)}</script>${SCHEMA_END}`;
}

function newMachinePage(slug, machine) {
  const title = `${escapeHtml(machine.name)} | 記事・シミュレーター | ICHIGEKI`;
  const description = escapeHtml(machine.intro);
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="google-adsense-account" content="ca-pub-2599640417413447"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#05232d"><link rel="manifest" href="manifest.json"><link rel="icon" href="icon.svg" type="image/svg+xml"><meta name="description" content="${description}"><title>${title}</title><link rel="canonical" href="https://ichigeki-pachislot.com/${slug}.html"><link rel="stylesheet" href="style.css?v=180"></head><body class="machine-library-page" data-machine="${escapeHtml(slug)}"><header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><span class="brand-name">ICHIGEKI</span><span class="brand-sub">MACHINE</span></a><nav class="nav"><a href="index.html">トップ</a><a href="#simulator">シミュレーター</a><a href="community.html?machine=${escapeHtml(slug)}">投稿</a></nav></div></header><main class="page machine-detail-shell" id="machineApp"></main><footer class="site-footer"><div class="footer-inner"><span>© ICHIGEKI</span><div class="footer-links"><a href="community.html">コミュニティ</a><a href="disclaimer.html">免責事項</a></div></div></footer><script src="machine-library.js?v=195"></script><script src="achievements.js?v=1"></script><script src="site-insights.js?v=1"></script><script src="machine-detail.js?v=215"></script><script src="app-shell.js?v=10"></script><script src="adsense-loader.js?v=2"></script></body></html>`;
}

function updateRobotsMeta(html, isIndexable) {
  if (isIndexable) return html.replace(/<meta name="robots" content="noindex,follow">/, "");
  if (html.includes('name="robots"')) return html;
  return html.replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta name="robots" content="noindex,follow">');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function updateMachineSitemap() {
  const sitemapPath = path.join(siteDirectory, "sitemap.xml");
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const [slug, machine] of Object.entries(machines)) {
    if (requestedSlugs.size && !requestedSlugs.has(slug)) continue;
    const url = `https://ichigeki-pachislot.com/${slug}.html`;
    const entry = `  <url><loc>${url}</loc><lastmod>${editorialDate(machine)}</lastmod></url>`;
    const pattern = new RegExp(`  <url><loc>${escapeRegExp(url)}</loc>(?:<lastmod>[^<]+</lastmod>)?</url>`);
    const removalPattern = new RegExp(`\\n?${pattern.source}`);
    if (!INDEXABLE_MACHINE_SLUGS.has(slug)) {
      sitemap = sitemap.replace(removalPattern, "");
      continue;
    }
    if (pattern.test(sitemap)) sitemap = sitemap.replace(pattern, entry);
    else sitemap = sitemap.replace("</urlset>", `${entry}\n</urlset>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
}

let updated = 0;
for (const [slug, machine] of Object.entries(machines)) {
  if (requestedSlugs.size && !requestedSlugs.has(slug)) continue;
  const htmlPath = path.join(siteDirectory, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) fs.writeFileSync(htmlPath, newMachinePage(slug, machine));

  let html = fs.readFileSync(htmlPath, "utf8");
  if (indexOnly) {
    html = updateRobotsMeta(html, INDEXABLE_MACHINE_SLUGS.has(slug));
    fs.writeFileSync(htmlPath, html);
    updated += 1;
    continue;
  }
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
  html = updateRobotsMeta(html, INDEXABLE_MACHINE_SLUGS.has(slug));
  if (/<link[^>]+rel="stylesheet"/.test(html)) {
    html = html.replace(/style\.css(?:\?v=\d+)?/, "style.css?v=180");
  } else {
    html = html.replace("</head>", '<link rel="stylesheet" href="style.css?v=180"></head>');
  }
  html = html.replace(/machine-detail\.js\?v=\d+/, "machine-detail.js?v=215");
  html = html.replace(/machine-library\.js\?v=\d+/, "machine-library.js?v=195");
  html = html.replace(/app-shell\.js\?v=\d+/, "app-shell.js?v=10");
  html = html.replace(/adsense-loader\.js\?v=\d+/, "adsense-loader.js?v=2");
  if (!html.includes("site-insights.js")) html = html.replace(/(<script src="machine-detail\.js\?v=129"><\/script>)/, '<script src="site-insights.js?v=1"></script>\n  $1');
  if (!html.includes("adsense-loader.js")) html = html.replace("</body>", '  <script src="adsense-loader.js?v=2"></script>\n</body>');

  fs.writeFileSync(htmlPath, html.replace(/^[\t ]+$/gm, ""));
  updated += 1;
}

updateMachineSitemap();

console.log(`Prerendered ${updated} machine pages.`);
