window.ICHIGEKI_MACHINES = {
  "shangri-la-frontier": {
    order: 0.08, type: "pachinko", theme: "emerald", year: "2026年12月", maker: "Sammy", updated: "2026-11-01",
    name: "e シャングリラ・フロンティア", shortName: "eシャンフロ",
    catchcopy: "約1/399.9から、1500個 or 4500個＋αの神ゲーRUSHへ。",
    intro: "2026年12月7日導入予定のスマパチLT機。図柄揃い約1/399.9、RUSH突入約54%、ST134回・継続約75%の流れと、右打ち中1500個・4500個中心の出玉を固定条件で簡易体験できます。",
    points: ["図柄揃い約1/399.9・RUSH突入約54%", "ST134回・RUSH継続約75%", "RUSH中は1500個または4500個以上が中心"],
    specs: [["図柄揃い", "約1/399.9"], ["RUSH中", "約1/98.5"], ["RUSH突入", "約54%"], ["ST回数", "134回"], ["RUSH継続", "約75%"], ["右打ち出玉", "1500・4500個＋α"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 19.0, minSpins: 10, maxSpins: 30, rushLabel: "神ゲー SHANGRI-LA FRONTIER", rushEntry: 0.54, rushContinue: 0.75, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.50], [4500, 0.48], [7500, 0.02]] },
    articleSections: [
      { heading: "約1/399.9からRUSH突入約54%", paragraphs: ["通常時の図柄揃いは約1/399.9です。初当りの約53%は1500個獲得後にRUSHへ、約1%は300個獲得後にRUSHへ進み、合計突入率は約54%です。", "サイトでは初回300個の約1%を独立表示せず、初当り出玉を1500個の代表値へまとめています。RUSH非突入時も1500個として計算します。"] },
      { heading: "ST134回・継続約75%", paragraphs: ["RUSH中は約1/98.5を134回転で抽選し、継続率は約75%です。シミュレーターではST中の各回転を個別表示せず、1回ごとに約75%の継続抽選へまとめます。", "平均連チャン回数は長期間の理論上の目安です。1回の結果は単発終了から複数回継続まで大きく変わります。"] },
      { heading: "1500個・4500個と超神ゲーBOOST", paragraphs: ["右打ち中は1500個が約50%、4500個が約48%、4500個＋超神ゲーBOOSTが約2%です。BOOSTでは1500個・3000個・4500個の上乗せを狙います。", "BOOSTの上乗せループは公開されている代表振り分けを完全再現せず、サイトでは4500個＋BOOSTの一部を7500個の代表出玉へ簡易化します。実機の上限や期待出玉を保証するものではありません。"] },
      { heading: "固定回転率と収支の条件", bullets: ["19.0回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約21,000円", "19.0回は比較用の参考値で実店舗の回転率を保証しない", "結果は自動でマイ記録へ保存し、同じ条件でランキング集計"] }
    ],
    faq: [
      { question: "e シャングリラ・フロンティアはいつ導入される？", answer: "2026年12月7日から全国のホールへ順次導入予定です。地域や店舗によって導入日が異なる場合があります。" },
      { question: "RUSH突入率と継続率は？", answer: "RUSH突入率は約54%、RUSH中は約1/98.5を134回転で抽選し、継続率は約75%です。" },
      { question: "右打ち中の出玉は？", answer: "1500個が約50%、4500個が約48%、4500個＋超神ゲーBOOSTが約2%です。出玉は払い出し個数です。" },
      { question: "平均投資目安はいくら？", answer: "図柄揃い約1/399.9と固定回転率19.0回/1,000円から、約21,000円を目安として表示します。実店舗の回転率や持ち玉状況で変わるため、実収支を保証する値ではありません。" },
      { question: "超神ゲーBOOSTは完全再現している？", answer: "完全再現ではありません。4500個＋BOOSTの一部を7500個の代表出玉へまとめ、結果の幅を体験するための固定モデルにしています。" }
    ],
    sources: [["Sammy 公式発売発表", "https://www.sammy.co.jp/japanese/news/detail/?id=308"], ["Sammy 公式機種サイト", "https://www.sammy.co.jp/japanese/product/pachinko/e_sha_fr/"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4831/1/1"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10571"]]
  },
  "sao-phantom-bullet": {
    order: 0.09, type: "pachinko", theme: "aqua", year: "2026年12月", maker: "KYORAKU", updated: "2026-11-01",
    name: "e ソードアート・オンライン ファントム・バレット", shortName: "e SAO ファントム・バレット",
    catchcopy: "FAIR STARTからBoBを勝ち抜き、FINALSへ。",
    intro: "2026年12月21日導入予定の設定付きスマパチ。実機の設定1を基準に、BONUS約1/229.9、BoB突入約50%、BoB FINALS継続約80%の流れを固定条件で簡易体験できます。",
    points: ["実機は設定1・2・4・5・6を搭載", "設定1のBONUSは約1/229.9・LT突入約50%", "BoB継続約70%・BoB FINALS継続約80%"],
    specs: [["BONUS（設定1）", "約1/229.9"], ["BONUS（設定6）", "約1/189.8"], ["LT突入（設定1）", "約50.0%"], ["BoB継続", "約70%"], ["FINALS継続", "約80%"], ["スタート", "FAIR START"]],
    sim: { kind: "pachinko", hitRate: 229.9, hitLabel: "BONUS", startType: "FAIR START", spinsPer1k: 19.2, minSpins: 10, maxSpins: 35, rushLabel: "BoB予選", rushEntry: 0.50, rushContinue: 0.70, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 0.60], [300, 0.40]], upperLabel: "BoB FINALS", upperDirectChance: 0.01, upperUpgradeChance: 0.30, upperContinue: 0.80 },
    articleSections: [
      { heading: "実機は5段階設定、シミュレーターは設定1固定", paragraphs: ["実機は設定1・2・4・5・6の5段階を搭載し、BONUS合算は設定1の約1/229.9、設定2の約1/225.2、設定4の約1/219.1、設定5の約1/208.0、設定6の約1/189.8です。LT突入率も設定1の約50.0%から設定6の約57.5%まで変わります。", "パチンコ機種同士を同じ条件で比べやすくするため、サイトでは設定1の約1/229.9・LT突入約50.0%に固定します。スロットのようなランダム設定抽選は行わず、結果・マイ記録・ランキングも設定1条件で統一します。"] },
      { heading: "BoB予選からFINALSへ", paragraphs: ["BoB予選は3回のワンショット型抽選で、最初の2回は約1/2.5、最後の1回は約1/6.0。トータル継続率は約70%です。", "上位LTのBoB FINALSは最初の2回が約1/1.9、最後の1回が約1/6.0で、トータル継続率は約80%です。シミュレーターは各区間を70%・80%の継続抽選へまとめます。"] },
      { heading: "出玉とファントムモード", paragraphs: ["大当り出玉は300個・450個・1500個。BoB中は1500個比率60%で、その一部からBoB FINALSへの昇格を目指します。", "ファントムモードはRUSH非突入後やRUSH終了後の一部などから移行し、滞在中のファントムBONUSがBoB FINALSへの入口になります。サイトではこの流れを初当り時の直行抽選へ簡易化し、450個振り分けや内部モードの全移行は個別再現しません。"] },
      { heading: "固定レートと収支の条件", bullets: ["19.2回/1,000円・1,000円250玉貸し・28玉交換で固定", "設定1基準の平均初当り投資目安は約12,000円", "結果は自動でマイ記録へ保存", "機種別ランキングは同じ固定条件で集計"] }
    ],
    faq: [
      { question: "e SAO ファントム・バレットはいつ導入される？", answer: "2026年12月21日から全国のホールへ順次導入予定です。地域や店舗によって導入日が異なる場合があります。" },
      { question: "設定はいくつある？", answer: "実機は設定1・2・4・5・6の5段階です。BONUS合算は約1/229.9〜約1/189.8、LT突入率は約50.0%〜約57.5%です。" },
      { question: "ICHIGEKIでは設定をランダム抽選する？", answer: "しません。パチンコ機種同士を同じ条件で比較するため、シミュレーター・マイ記録・ランキングはすべて設定1に固定します。" },
      { question: "平均投資目安はいくら？", answer: "設定1のBONUS約1/229.9と固定回転率19.2回/1,000円から、約12,000円を目安として表示します。実店舗の回転率や持ち玉状況で変わるため、実収支を保証する値ではありません。" },
      { question: "シミュレーターでは何を体験できる？", answer: "BONUSまでの回転数、BoB予選への突入、約70%の継続、BoB FINALS昇格後の約80%継続と出玉を固定条件で簡易抽選します。" }
    ],
    sources: [["KYORAKU 公式発表", "https://www.kyoraku.co.jp/news/detail/900"], ["遊技通信web 機種発表", "https://www.yugitsushin.jp/news/%E6%80%A7%E8%83%BD%E7%89%B9%E5%8C%96%E3%81%AE%E8%B6%85%E7%81%AB%E5%8A%9B%E3%83%A9%E3%82%A4%E3%83%88%E3%83%9F%E3%83%89%E3%83%ABx%E3%83%95%E3%82%A7%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%88/"], ["Re.design スペック情報", "https://aaa.redesign777.tokyo/Spec/PachinkoView?flag=True&id=P2026092913480401"], ["パチヨミ！ ボーダー情報", "https://pachiyomi.com/pachinko/e-sao-phantom-bullet"]]
  },
  "toaru3-pachinko": {
    order: 0.1, type: "pachinko", theme: "violet", year: "2026年11月", maker: "オレンジ", updated: "2026-11-01",
    name: "eとある魔術の禁書目録3", shortName: "eとある3",
    catchcopy: "約1/348.6から、3段階STと最大出玉ループへ。",
    intro: "2026年11月2日導入予定のスマパチLT機。初当り約1/348.6、ST突入約50%、3段階STのTOTAL継続約75%を固定条件で簡易体験できます。",
    points: ["通常時の図柄揃い約1/348.6", "ST突入約50%・TOTAL継続約75%", "STは前半30回＋後半100回＋最終1回"],
    specs: [["図柄揃い", "約1/348.6"], ["ST突入", "約50%"], ["ST回数", "30＋100＋1回"], ["TOTAL継続", "約75%"], ["大当り出玉", "1500〜7500個以上"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 348.6, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "とある魔術の最強激突", rushEntry: 0.50, rushContinue: 0.75, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.40], [3000, 0.40], [4500, 0.12], [6000, 0.06], [7500, 0.02]] },
    articleSections: [
      { heading: "3段階STをひとつの流れで体験", paragraphs: ["STは前半30回のLIMIT BREAK CHANCE、後半100回のとある魔術の最強激突、最終1回のLAST CHANCEで構成されます。", "サイトではTOTAL継続約75%を使い、3段階の見せ方を一連の演出へまとめます。"] },
      { heading: "出玉と簡易化の範囲", paragraphs: ["大当り出玉は1500個から7500個以上。前半・後半・最終回転で振り分けが異なります。", "簡易シミュレーターでは代表的な出玉分布へまとめ、実機の全振り分けを完全再現するものではありません。"] },
      { heading: "固定レートと計算条件", bullets: ["250玉貸し・28玉交換で固定", "通常回転率は17.0回/1,000円で固定", "平均初当り投資目安は約20,500円", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["藤商事 公式機種情報", "https://www.fujimarukun.co.jp/products/e_toaru3/"], ["パチマガスロマガFREE 機種情報", "https://pachimaga.com/free/mach/maker-p/orange/e_toaru3.php"], ["ハズセ 機種情報", "https://hazuse.com/machine/pachinko/PX0388/"]]
  },
  "kamen-rider-black-light": {
    order: 0.11, type: "pachinko", theme: "emerald", year: "2026年11月", maker: "KYORAKU", updated: "2026-11-01",
    name: "e 仮面ライダーBLACK デカヘソ Light Version", shortName: "ライダーBLACK Light",
    catchcopy: "デカヘソ×約1/129.9から、宿命BATTLEへ。",
    intro: "2026年11月2日導入予定のデカヘソ搭載スマパチ。約1/129.9の初当り、JUSTICE RUSH、1G連特化ゾーン『宿命BATTLE』までを簡易体験できます。",
    points: ["通常時約1/129.9・デカヘソ搭載", "JUSTICE RUSH突入60%・継続約72%", "RUSH中大当りの25%で宿命BATTLE"],
    specs: [["通常時", "約1/129.9"], ["RUSH中", "約1/96.0"], ["RUSH突入", "60%"], ["RUSH継続", "約72%"], ["宿命BATTLE", "勝率約65%"], ["スタート", "デカヘソ"]],
    sim: { kind: "pachinko", hitRate: 129.9, hitLabel: "初当り", startType: "デカヘソ", spinsPer1k: 31.0, minSpins: 20, maxSpins: 45, rushLabel: "JUSTICE RUSH", rushEntry: 0.60, rushContinue: 0.72, firstPayoutIn: 240, firstPayoutOut: 240, rushPayouts: [[400, 1]], upperLabel: "宿命BATTLE", upperDirectChance: 0, upperUpgradeChance: 0.25, upperContinue: 0.65 },
    articleSections: [
      { heading: "デカヘソの回転率を投資へ反映", paragraphs: ["通常時は約1/129.9。デカヘソとダイレクトスタートを搭載したライトスペックです。", "シミュレーターは28玉交換の参考ボーダーをもとに31.0回/1,000円で固定し、通常ヘソ機より平均投資が軽くなるよう計算します。実店舗の回転率を保証する値ではありません。"] },
      { heading: "JUSTICE RUSHは120回転", paragraphs: ["初当りの60%でJUSTICE RUSHへ突入します。RUSH中は約1/96.0を120回転で抽選し、継続率は約72%です。", "初当り出玉は約240個、RUSH中は約400個の払い出しを使用します。"] },
      { heading: "宿命BATTLEとEXTREME", paragraphs: ["RUSH中大当りの25%で1G連特化ゾーン『宿命BATTLE』へ進みます。初回は勝利濃厚、2連目以降の勝率は約65%です。", "EXTREME滞在時は勝率約90%ですが、昇格率が公表されていないため独立抽選にはせず、記事内の参考情報として扱います。"] },
      { heading: "固定レートと収支の条件", bullets: ["31.0回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約4,200円", "デカヘソ表記を結果とランキング条件に表示", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["KYORAKU 公式発表", "https://www.kyoraku.co.jp/news/detail/895"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4847/1/1"], ["パチンコスペック解析 ボーダー", "https://pachinko-spec.info/spec/173543/"]]
  },
  "granbelm-319": {
    order: 0.112, type: "pachinko", theme: "violet", year: "2026年11月", maker: "サンスリー", updated: "2026-11-01",
    name: "eグランベルム 319ver.", shortName: "eグランベルム 319",
    catchcopy: "約51%で直LTへ。RESTARTと超アドレナリンBOOSTを体験。",
    intro: "2026年11月2日導入予定のスマパチLT機。初当り約1/319.6、グランベルムRUSH突入約51%、トータル継続約77%を固定条件で簡易体験できます。",
    points: ["通常時の大当り約1/319.6", "グランベルムRUSH突入約51%", "RUSH継続はRESTART込み約77%"],
    specs: [["大当り", "約1/319.6"], ["RUSH突入", "約51%"], ["RUSH回数", "130回"], ["トータル継続", "約77%"], ["右打ち出玉", "1500〜4500個＋α"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.5, minSpins: 10, maxSpins: 30, rushLabel: "グランベルムRUSH", rushEntry: 0.51, rushContinue: 0.77, firstPayoutIn: 1050, firstPayoutOut: 1050, rushPayouts: [[1500, 0.50], [3000, 0.375], [4500, 0.125]] },
    articleSections: [
      { heading: "約51%でグランベルムRUSHへ直行", paragraphs: ["通常時の大当りは約1/319.6。初当りの約51%で130回のグランベルムRUSHへ進む直LTタイプです。", "シミュレーターでは初当り後に約51%の突入抽選を行い、非突入時は初回出玉で終了します。"] },
      { heading: "RESTART込み約77%を簡易抽選", paragraphs: ["RUSH中は1500個・3000個・4500個の出玉当りに加え、出玉を伴わずST回数を戻すRESTARTがあります。公表されるトータル継続率は約77%です。", "サイトではRESTARTを独立表示せず、約77%の継続抽選に含めます。出玉振り分けは出玉当りだけを代表比率へ整えています。"] },
      { heading: "超アドレナリンBOOSTは記事で補足", paragraphs: ["3000個・4500個当りの一部では1500個以上の上乗せを狙う超アドレナリンBOOSTが発生します。", "上乗せ発生率の全条件が揃っていないため、シミュレーターでは最大出玉の可能性を4500個振り分けへまとめ、実機の上乗せループを完全再現しません。"] },
      { heading: "固定レートと収支の条件", bullets: ["17.5回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約18,300円", "RESTART込み継続率として抽選", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["SANYO 公式更新情報", "https://www.sanyobussan.co.jp/information/information.html"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4807/1/2"], ["P-WORLD 新台予定", "https://www.p-world.co.jp/database/machine/introduce_calendar.cgi?type=Pachi"]]
  },
  "fever-yokai-watch": {
    order: 0.114, type: "pachinko", theme: "gold", year: "2026年11月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバー妖怪ウォッチ", shortName: "eF妖怪ウォッチ",
    catchcopy: "コマチャレンジ込み約61%から、トータル約80%の怪闘へ。",
    intro: "2026年11月2日導入予定のスマパチ。大当り約1/319.7、時短引き戻し込みのRUSH突入約61%、トータル継続約80%を簡易体験できます。",
    points: ["通常時の大当り約1/319.7", "コマチャレンジ込みRUSH突入約61%", "トータル継続約80%・1500個以上中心"],
    specs: [["大当り", "約1/319.7"], ["RUSH図柄揃い", "約1/41.9"], ["トータル突入", "約61%"], ["トータル継続", "約80%"], ["時短", "100回"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.2, minSpins: 10, maxSpins: 30, rushLabel: "ヨーデルSONIC怪闘", rushEntry: 0.61, rushContinue: 0.80, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 0.72], [3000, 0.22], [4500, 0.06]] },
    articleSections: [
      { heading: "コマチャレンジ込みで突入約61%", paragraphs: ["初当りからのRUSH直行は約50%。非突入時は時短100回のコマチャレンジへ進み、引き戻しを含むトータルRUSH突入率は約61%です。", "サイトでは直行と時短引き戻しを1回の約61%抽選へまとめ、結果画面を分かりやすくしています。"] },
      { heading: "RUSHと時短を合わせて約80%", paragraphs: ["ヨーデルSONIC怪闘の継続と、終了後のコマチャレンジ引き戻しを合わせたトータル継続率は約80%です。", "実機の転落・普電ロング開放・最終決戦は個別再現せず、1回ごとの継続抽選へまとめます。"] },
      { heading: "1500個から上乗せルートへ", paragraphs: ["右打ち中は1500個を基本に、3000個やウバウネ決戦の上乗せルートがあります。", "シミュレーターでは代表的な1500個・3000個・4500個へ整理します。6000個以上の連続上乗せは、複数回の継続結果として表現される場合があります。"] },
      { heading: "固定レートと収支の条件", bullets: ["17.2回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約18,600円", "時短込みの突入率・継続率を使用", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/ppj/spec/"], ["パチ＆スロ必勝本 大当り振り分け", "https://p.hisshobon.jp/machine/4794/1/3"], ["P-WORLD 新台予定", "https://www.p-world.co.jp/database/machine/introduce_calendar.cgi?type=Pachi"]]
  },
  "juoh-shishi-no-ichigeki": {
    order: 0.116, type: "pachinko", theme: "ember", year: "2026年11月", maker: "Sammy", updated: "2026-11-01",
    name: "e 獣王 獅子の一撃", shortName: "e獣王 獅子の一撃",
    catchcopy: "ドデカSTRAIGHTから、平均約9800個のサバンナチャンスへ。",
    intro: "2026年11月2日導入予定のドデカSTRAIGHT搭載スマパチ。初当り約1/319.7、獣王RUSH突入50%、右打ち中約50%のサバンナチャンスを簡易体験できます。",
    points: ["通常時の大当り約1/319.7", "獣王RUSH突入50%・継続約50%", "RUSH中約50%で平均約9800個のサバンナチャンス"],
    specs: [["大当り", "約1/319.7"], ["RUSH中", "約1/144.7"], ["RUSH突入", "50%"], ["RUSH継続", "約50%"], ["サバンナチャンス", "平均約9800個"], ["スタート", "ドデカSTRAIGHT"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "ドデカSTRAIGHT", spinsPer1k: 18.0, minSpins: 10, maxSpins: 32, rushLabel: "獣王RUSH", rushEntry: 0.50, rushContinue: 0.50, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 0.33], [3000, 0.17], [9800, 0.50]] },
    articleSections: [
      { heading: "ドデカSTRAIGHTを固定回転率へ反映", paragraphs: ["通常時約1/319.7で、玉がスタート方向へ向かいやすい新ゲージのドデカSTRAIGHTを搭載しています。", "シミュレーターは比較用に18.0回/1,000円へ固定します。実店舗の釘調整や実測回転率を保証する値ではありません。"] },
      { heading: "獣王RUSHは突入・継続とも約50%", paragraphs: ["初当りは約300個で、その50%が100回転の獣王RUSHへ進みます。RUSH中確率は約1/144.7で、継続率は約50%です。", "短い継続率の代わりに、右打ち中当りの出玉振り分けが大きい設計です。"] },
      { heading: "約50%でサバンナチャンス", paragraphs: ["RUSH中大当りの約50%は、最低4500個＋上乗せループのサバンナチャンス。公表される平均出玉は約9800個です。", "サイトでは上乗せ回数を個別抽選せず、代表値9800個を1つの出玉結果として扱います。3000個は1500個×2回としてまとめています。"] },
      { heading: "固定レートと収支の条件", bullets: ["18.0回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約17,800円", "サバンナチャンスは平均9800個で簡易化", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["Sammy 公式製品情報", "https://www.sammy.co.jp/japanese/product/pachinko/e_jyu_oh_sh/"], ["Sammy 発売案内", "https://www.sammy.co.jp/japanese/news/detail/?id=309"], ["パチセブン 基本スペック", "https://pachiseven.jp/articles/detail/26454"]]
  },
  "no-game-no-life-119": {
    order: 0.118, type: "pachinko", theme: "aqua", year: "2026年11月", maker: "高尾", updated: "2026-11-01",
    name: "e ノーゲーム・ノーライフ 119Ver.", shortName: "eノゲノラ 119",
    catchcopy: "ALL1000個の初当りから、約80%のHYPERへ。",
    intro: "2026年11月2日導入予定のライトスマパチ。初当り約1/119.8、ノゲノラッシュ突入50%、突破後のHYPER継続約80%を簡易体験できます。",
    points: ["通常時約1/119.8・初当りALL1000個", "ノゲノラッシュ突入50%・突破約51%", "ノゲノラッシュHYPER継続約80%"],
    specs: [["大当り", "約1/119.8"], ["右打ち中", "約1/23.1"], ["RUSH突入", "50%"], ["初回RUSH継続", "約51%"], ["HYPER継続", "約80%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 119.8, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.5, minSpins: 10, maxSpins: 30, rushLabel: "ノゲノラッシュ", rushEntry: 0.50, rushContinue: 0.51, firstPayoutIn: 1000, firstPayoutOut: 1000, rushPayouts: [[300, 0.50], [1000, 0.50]], upperLabel: "ノゲノラッシュHYPER", upperDirectChance: 0, upperUpgradeChance: 1, upperContinue: 0.80 },
    articleSections: [
      { heading: "約1/119.8の初当りはALL1000個", paragraphs: ["通常時の大当りは約1/119.8で、初当りはすべて10R・約1000個です。その50%でノゲノラッシュへ進みます。", "ライト帯でも初回出玉がまとまっているため、早い初当りでは交換後収支が残りやすい構成です。"] },
      { heading: "初回RUSH突破でHYPERへ", paragraphs: ["ノゲノラッシュは12回＋残保留4個で継続約51%。ここで当れば上位のノゲノラッシュHYPERへ移行します。", "シミュレーターでは初回約51%を突破した時点でHYPERへ昇格し、その後は約80%で継続します。"] },
      { heading: "右打ちは300個・1000個が各50%", paragraphs: ["右打ち中の大当りは3R約300個と10R約1000個が各50%です。残保留当りもHYPERへ進む実機仕様を、同じ上位継続抽選へまとめています。", "保留の消化順、V入賞、小当りの細かな挙動は再現しません。"] },
      { heading: "固定レートと収支の条件", bullets: ["17.5回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約6,800円", "初回突破後はHYPER継続率を使用", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["P-WORLD 新台予定", "https://www.p-world.co.jp/database/machine/introduce_calendar.cgi?type=Pachi"], ["パチマガスロマガFREE スペック", "https://pachimaga.com/free/mach/maker-p/takao/e_nogamenolife119.php"], ["パチンコ・パチスロ.com スペック", "https://pachinkopachisro.com/archives/pachinko/e-no-game-no-life-119/"]]
  },
  "karakuri2-maou": {
    order: 0.119, type: "pachinko", theme: "violet", year: "2024年11月", maker: "SANKYO", updated: "2026-10-31",
    name: "eフィーバーからくりサーカス2 魔王ver.", shortName: "からくり2 魔王",
    catchcopy: "運命の一劇を突破し、最大7500個の超悪魔RUSHへ。",
    intro: "図柄揃い約1/399.9、LT突入約52%、超悪魔RUSH継続約80%のスマパチLT機を固定条件で簡易体験できます。",
    points: ["図柄揃い約1/399.9", "LT突入約52%・継続約80%", "右打ち最大7500個"],
    specs: [["図柄揃い", "約1/399.9"], ["LT突入", "約52%"], ["ST回数", "135回"], ["LT継続", "約80%"], ["右打ち出玉", "1500〜7500個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "超悪魔RUSH", rushEntry: 0.52, rushContinue: 0.80, firstPayoutIn: 1200, firstPayoutOut: 1200, rushPayouts: [[1500, 0.40], [3000, 0.33], [4500, 0.17], [6000, 0.07], [7500, 0.03]] },
    articleSections: [
      { heading: "約52%で超悪魔RUSHへ", paragraphs: ["図柄揃いは約1/399.9。1200個大当りと300個LT突入大当りを合わせたトータルLT突入率は約52%です。", "シミュレーターでは入口を1回の突入抽選へまとめます。"] },
      { heading: "運命の一劇と最大7500個", paragraphs: ["LTは135回のSTでトータル継続約80%。右打ち中は1500個を軸に、3000個から最大7500個までの大当りがあります。", "STリセットは継続率へ含め、独立した出玉としては扱いません。"] },
      { heading: "固定レートと収支の条件", bullets: ["17.0回/1,000円・250玉貸し・28玉交換で固定", "平均図柄揃い投資目安は約23,500円", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/prw/spec/"], ["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/968/"]]
  },
  "shin-eva-type-rei": {
    order: 0.1192, type: "pachinko", theme: "ice", year: "2023年12月", maker: "ビスティ", updated: "2026-10-31",
    name: "ぱちんこ シン・エヴァンゲリオン Type レイ", shortName: "シンエヴァ Type レイ",
    catchcopy: "時短込み約73%から、163回のシン・IMPACT RUSHへ。",
    intro: "大当り約1/319.7、時短引き戻し込みのRUSH突入約73%、トータル継続約81%の王道V-STを簡易体験できます。",
    points: ["大当り約1/319.7", "RUSH突入約73%・継続約81%", "右打ちALL1500個"],
    specs: [["大当り", "約1/319.7"], ["RUSH突入", "約73%"], ["ST回数", "163回"], ["RUSH継続", "約81%"], ["右打ち出玉", "ALL1500個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.5, minSpins: 10, maxSpins: 30, rushLabel: "シン・IMPACT RUSH", rushEntry: 0.73, rushContinue: 0.81, firstPayoutIn: 1500, firstPayoutOut: 450, rushPayouts: [[1500, 1]] },
    articleSections: [
      { heading: "時短込み約73%でRUSHへ", paragraphs: ["初当りからのST突入に、時短100回と残保留の引き戻しを加えたトータル突入率は約73%です。", "サイトでは直行と時短引き戻しを1回の抽選へまとめます。"] },
      { heading: "163回のロングST", paragraphs: ["シン・IMPACT RUSHは163回で、残保留を含む継続率は約81%。右打ち中の大当りはすべて1500個です。", "結果画面では連チャン数と総出玉を同じ固定条件で比較できます。"] },
      { heading: "固定レートと収支の条件", bullets: ["17.5回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約18,300円", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/952/"], ["フィールズ 製品一覧", "https://www.fields.biz/products/ps/machine_list2023.html"]]
  },
  "sao-senko-no-kiseki": {
    order: 0.1194, type: "pachinko", theme: "aqua", year: "2024年12月", maker: "KYORAKU", updated: "2026-10-31",
    name: "e ソードアート・オンライン 閃光の軌跡", shortName: "SAO 閃光の軌跡",
    catchcopy: "70%でSWORD RUSHへ。LIGHTNING RUSHは約90%継続。",
    intro: "大当り約1/199.9、SWORD RUSH突入70%、上位LIGHTNING RUSH継続約90%のライトミドルLT機を簡易体験できます。",
    points: ["大当り約1/199.9", "SWORD RUSH突入70%", "LIGHTNING RUSH継続約90%"],
    specs: [["大当り", "約1/199.9"], ["RUSH突入", "70%"], ["SWORD RUSH継続", "約60%"], ["上位RUSH継続", "約90%"], ["上位中1500個", "約70%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 199.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.0, minSpins: 10, maxSpins: 32, rushLabel: "SWORD RUSH", rushEntry: 0.70, rushContinue: 0.60, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[300, 0.30], [1500, 0.70]], upperLabel: "LIGHTNING RUSH", upperDirectChance: 0, upperUpgradeChance: 0.40, upperContinue: 0.90 },
    articleSections: [
      { heading: "70%でSWORD RUSHへ", paragraphs: ["通常時は約1/199.9の大当りを目指し、初当りの70%でSWORD RUSHへ進みます。", "シミュレーターは初当り後に突入抽選を行い、RUSH中の1500個大当りから上位を目指します。"] },
      { heading: "LIGHTNING RUSHは約90%継続", paragraphs: ["LAST ATTACK CHANCE成功で上位のLIGHTNING RUSHへ。継続率は約90%、右打ち中大当りの70%が1500個です。", "細かなC時短や保留の抽選順は代表的な継続抽選へ簡易化します。"] },
      { heading: "固定レートと収支の条件", bullets: ["18.0回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約11,100円", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["KYORAKU 公式スペック", "https://www.kyoraku.co.jp/product_site/2024/sao_lt/view/spec/"], ["KYORAKU 導入案内", "https://www.kyoraku.co.jp/news/detail/798"]]
  },
  "hokuto10-pachinko": {
    order: 0.1196, type: "pachinko", theme: "flame", year: "2024年8月", maker: "Sammy", updated: "2026-10-31",
    name: "e北斗の拳10", shortName: "e北斗の拳10",
    catchcopy: "約80%のBATTLE MODEから、約89%のHYPERへ。",
    intro: "大当り約1/348.6、BATTLE MODE突入・継続とも約80%、上位HYPER継続約89%のバトルスペックを簡易体験できます。",
    points: ["大当り約1/348.6", "BATTLE MODE突入・継続約80%", "HYPER継続約89%"],
    specs: [["大当り", "約1/348.6"], ["BATTLE MODE突入", "約80%"], ["下位継続", "約80%"], ["HYPER継続", "約89%"], ["右打ち", "300〜1500個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 348.6, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "BATTLE MODE", rushEntry: 0.80, rushContinue: 0.80, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[300, 0.15], [450, 0.15], [1500, 0.70]], upperLabel: "HYPER BATTLE MODE", upperDirectChance: 0.01, upperUpgradeChance: 0.05, upperContinue: 0.89 },
    articleSections: [
      { heading: "突入・継続とも約80%", paragraphs: ["図柄揃いは約1/348.6。初当りの約80%でBATTLE MODEへ進み、下位状態も約80%で継続します。", "転落抽選は1回ごとの継続判定へまとめています。"] },
      { heading: "無想転生チャンスからHYPERへ", paragraphs: ["右打ち中大当りの一部で無想転生チャンスへ進み、成功すると継続約89%のHYPER BATTLE MODEへ昇格します。", "シミュレーターでは代表的な昇格抽選として簡易化します。"] },
      { heading: "固定レートと収支の条件", bullets: ["17.0回/1,000円・250玉貸し・28玉交換で固定", "平均図柄揃い投資目安は約20,500円", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["Sammy 公式適合案内", "https://www.sammy.co.jp/japanese/news/detail/?id=123"], ["P-WORLD 基本スペック", "https://opt.p-world.co.jp/machine/database/10054"]]
  },
  "kaguya-sama-slot": {
    order: 0.1198, type: "slot", theme: "magenta", year: "2024年9月", maker: "SANKYO", updated: "2026-10-31",
    name: "Lパチスロ かぐや様は告らせたい", shortName: "スマスロ かぐや様",
    catchcopy: "告らせたいチャレンジを突破し、BONUSループへ。",
    intro: "設定別BONUS初当りを使い、告らせたいチャレンジ、1G連、チカブレイク、EXTRA BONUSまでを簡易体験できます。",
    points: ["BONUS設定1約1/362〜設定6約1/335", "CZ成功期待度約58%", "BONUSループ最大約80%"],
    specs: [["BONUS（設定1）", "約1/362"], ["BONUS（設定6）", "約1/335"], ["CZ期待度", "約58%"], ["BONUS純増", "約9.0枚/G"], ["ベース", "約31G/50枚"], ["ループ率", "最大約80%"]],
    sim: { kind: "slot", triggerLabel: "告らせたいチャレンジ", triggerRate: 210, triggerSuccess: 0.58, mainLabel: "KAGUYA BONUS", mainRate: 362, base50: 31.0, coinUnit: 4.2, normalMin: 180, normalMax: 1000, specialLabel: "チカブレイク", specialChance: 0.35, specialMin: 250, specialMax: 1200, upperChallenge: "奇跡的相性MODE", upperChance: 0.20, upperSuccess: 0.55, upperLabel: "EXTRA BONUS", upperContinue: 0.80, upperPayout: 700, settingRates: { 1: { trigger: 210, main: 362, payout: 0.977 }, 2: { trigger: 208, main: 360, payout: 0.988 }, 3: { trigger: 205, main: 357, payout: 1.012 }, 4: { trigger: 200, main: 349, payout: 1.058 }, 5: { trigger: 196, main: 343, payout: 1.108 }, 6: { trigger: 192, main: 335, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別BONUS初当りを反映", paragraphs: ["BONUS初当りは設定1約1/362から設定6約1/335。START時に設定1〜6を均等抽選し、結果とランキングに設定を表示します。", "CZ確率の詳細は公開値が限られるため、代表値で簡易化します。"] },
      { heading: "1G連と引き戻しでループ", paragraphs: ["CZ告らせたいチャレンジの成功期待度は約58%。BONUSは純増約9.0枚/Gで、1G連と引き戻しを合わせたループ率は最大約80%です。", "チカブレイクとEXTRA BONUSは特化・上位演出としてまとめます。"] },
      { heading: "固定レートと収支の条件", bullets: ["約31G/50枚・1,000円46枚貸し・5.2枚交換で固定", "コイン単価は設定1参考値約4.2円", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/products/machine_list/sri/"], ["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/965/"]]
  },
  "shin-eva-slot": {
    order: 0.11982, type: "slot", theme: "ice", year: "2025年1月", maker: "ビスティ", updated: "2026-10-31",
    name: "Lパチスロ シン・エヴァンゲリオン", shortName: "スマスロ シンエヴァ",
    catchcopy: "作戦STを突破し、オップファータイプ殲滅作戦へ。",
    intro: "設定別初当りを使い、疑似ボーナス、作戦ST、三機殲滅、上位ATまでを簡易体験できます。",
    points: ["初当り設定1約1/291.1〜設定6約1/212.5", "STと疑似BONUSのループ", "上位CZから上位ATへ"],
    specs: [["初当り（設定1）", "約1/291.1"], ["初当り（設定6）", "約1/212.5"], ["タイプ", "ST＋疑似BONUS"], ["上位CZ", "マリ獣化チャレンジ"], ["上位AT", "オップファータイプ殲滅作戦"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "作戦ST", triggerRate: 291.1, triggerSuccess: 0.55, mainLabel: "シン・エヴァBONUS", mainRate: 291.1, base50: 32.0, coinUnit: 3.3, normalMin: 200, normalMax: 1000, specialLabel: "三機殲滅", specialChance: 0.34, specialMin: 200, specialMax: 950, upperChallenge: "マリ獣化チャレンジ", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "オップファータイプ殲滅作戦", upperContinue: 0.78, upperPayout: 620, settingRates: { 1: { trigger: 291.1, main: 291.1, payout: 0.977 }, 2: { trigger: 283.5, main: 283.5, payout: 0.988 }, 3: { trigger: 264.5, main: 264.5, payout: 1.012 }, 4: { trigger: 236.6, main: 236.6, payout: 1.057 }, 5: { trigger: 224.8, main: 224.8, payout: 1.103 }, 6: { trigger: 212.5, main: 212.5, payout: 1.149 } } },
    articleSections: [
      { heading: "初当りは設定1約1/291.1から", paragraphs: ["初当りは設定1約1/291.1から設定6約1/212.5。開始時に設定1〜6を均等抽選し、選ばれた初当り確率を使用します。", "設定は最終結果と機種別ランキングへ表示します。"] },
      { heading: "作戦STと上位AT", paragraphs: ["通常時はボーナスやSTを目指し、作戦中の進行ストックでBONUSループを伸ばします。", "上位CZマリ獣化チャレンジと上位ATはサイト共通の簡易抽選で表現します。"] },
      { heading: "固定レートと収支の条件", bullets: ["約32G/50枚・1,000円46枚貸し・5.2枚交換で固定", "コイン単価は設定1参考値約3.3円", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/973/?r=portal_info"]]
  },
  "dumbbell-slot": {
    order: 0.11984, type: "slot", theme: "gold", year: "2024年12月", maker: "SANKYO", updated: "2026-10-31",
    name: "Lパチスロ ダンベル何キロ持てる？", shortName: "スマスロ ダンベル",
    catchcopy: "MUSCLE ZONEを突破し、ゴールデンタイムへ。",
    intro: "設定別CZ・AT確率を使い、MUSCLE ZONE、ダンベルBONUS、ゴールデンチャレンジ、上位ループまでを簡易体験できます。",
    points: ["CZ設定1約1/247〜設定6約1/239", "AT設定1約1/591〜設定6約1/504", "AT純増約8.5枚/G"],
    specs: [["CZ（設定1）", "約1/247"], ["CZ（設定6）", "約1/239"], ["AT（設定1）", "約1/591"], ["AT（設定6）", "約1/504"], ["CZ期待度", "約40%"], ["AT純増", "約8.5枚/G"]],
    sim: { kind: "slot", triggerLabel: "MUSCLE ZONE", triggerRate: 247, triggerSuccess: 0.40, mainLabel: "ダンベルBONUS", mainRate: 591, base50: 31.5, coinUnit: 3.6, normalMin: 250, normalMax: 1200, specialLabel: "ゴールデンタイム", specialChance: 0.34, specialMin: 300, specialMax: 1200, upperChallenge: "ゴールデンチャレンジ", upperChance: 0.18, upperSuccess: 0.56, upperLabel: "金肉BONUS", upperContinue: 0.56, upperPayout: 650, settingRates: { 1: { trigger: 247, main: 591, payout: 0.977 }, 2: { trigger: 245, main: 576, payout: 0.988 }, 3: { trigger: 244, main: 546, payout: 1.012 }, 4: { trigger: 242, main: 532, payout: 1.057 }, 5: { trigger: 240, main: 512, payout: 1.105 }, 6: { trigger: 239, main: 504, payout: 1.149 } } },
    articleSections: [
      { heading: "CZ・ATを設定別に抽選", paragraphs: ["CZは設定1約1/247から設定6約1/239、ATは設定1約1/591から設定6約1/504です。", "START時に設定1〜6を均等抽選し、今回の設定を最終結果で発表します。"] },
      { heading: "ゴールデンチャレンジから上位へ", paragraphs: ["MUSCLE ZONEは成功期待度約40%。ATは純増約8.5枚/Gです。", "ゴールデンチャレンジ成功期待度約56%と平均Vストック約4個の流れを、特化ゾーンと上位抽選へまとめます。"] },
      { heading: "固定レートと収支の条件", bullets: ["約31.5G/50枚・1,000円46枚貸し・5.2枚交換で固定", "コイン単価は設定1参考値約3.6円", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/slq/spec/"], ["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/971/"]]
  },
  "symphogear-seigi-slot": {
    order: 0.11986, type: "slot", theme: "crimson", year: "2024年7月", maker: "SANKYO", updated: "2026-10-31",
    name: "Lパチスロ 戦姫絶唱シンフォギア 正義の歌", shortName: "スマスロ シンフォギア",
    catchcopy: "AXZ BATTLEを突破し、絶唱から黄金ATへ。",
    intro: "設定別AT確率を使い、AXZ BATTLE、AXZラッシュ、ギアVアタック、黄金ATまでを簡易体験できます。",
    points: ["AT設定1約1/295〜設定6約1/199", "AXZ BATTLE期待度約65%", "上位AT純増約5.0枚/G"],
    specs: [["AT（設定1）", "約1/295"], ["AT（設定6）", "約1/199"], ["CZ期待度", "約65%"], ["通常AT純増", "約2.8枚/G"], ["上位AT純増", "約5.0枚/G"], ["絶唱BATTLE", "期待度約60%"]],
    sim: { kind: "slot", triggerLabel: "AXZ BATTLE", triggerRate: 210, triggerSuccess: 0.65, mainLabel: "AXZラッシュ", mainRate: 295, base50: 32.0, coinUnit: 3.5, normalMin: 220, normalMax: 1100, specialLabel: "ギアVアタック", specialChance: 0.36, specialMin: 200, specialMax: 1050, upperChallenge: "絶唱BATTLE", upperChance: 0.20, upperSuccess: 0.60, upperLabel: "AXZラッシュ 黄金", upperContinue: 0.72, upperPayout: 600, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 210, main: 295, payout: 0.978 }, 2: { trigger: 205, main: 285, payout: 0.988 }, 4: { trigger: 185, main: 250, payout: 1.054 }, 5: { trigger: 170, main: 227, payout: 1.105 }, 6: { trigger: 155, main: 199, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別AT確率を反映", paragraphs: ["ATは設定1約1/295から設定6約1/199。実機と同じく設定3を除く1・2・4・5・6からランダム抽選します。", "選ばれた設定は結果と機種別ランキングへ表示します。"] },
      { heading: "AXZラッシュから黄金へ", paragraphs: ["AXZ BATTLEの成功期待度は約65%。通常ATは純増約2.8枚/Gで、ギアVアタックを重ねて上位を目指します。", "絶唱BATTLE成功期待度約60%と上位AT純増約5.0枚/Gを代表的な上位抽選へまとめます。"] },
      { heading: "固定レートと収支の条件", bullets: ["約32G/50枚・1,000円46枚貸し・5.2枚交換で固定", "コイン単価は設定1参考値約3.5円", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/sqe/spec/"], ["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/962/"]]
  },
  "garo-yami-slot": {
    order: 0.12, type: "slot", theme: "gold", year: "2026年11月", maker: "サンセイR&D", updated: "2026-11-01",
    name: "L牙狼 闇を照らす者", shortName: "スマスロ 牙狼",
    catchcopy: "金色になれ！を突破し、究極魔戒RUSHへ。",
    intro: "2026年11月2日導入予定のスマスロ。設定別CZ・BONUS確率を使い、疑似ボーナス、SUPER GARO BONUS、金色になれ！、究極魔戒RUSHまでを簡易体験できます。",
    points: ["CZは設定1約1/156.6〜設定6約1/141.1", "BONUSは設定1約1/291.1〜設定6約1/256.5", "純増約9.1枚/G・究極魔戒RUSH継続約82.6%"],
    specs: [["CZ（設定1）", "約1/156.6"], ["CZ（設定6）", "約1/141.1"], ["BONUS（設定1）", "約1/291.1"], ["BONUS（設定6）", "約1/256.5"], ["ベース", "約33G/50枚"], ["究極魔戒RUSH", "継続約82.6%"]],
    sim: { kind: "slot", triggerLabel: "牙狼モード", triggerRate: 156.6, triggerSuccess: 0.51, mainLabel: "GARO BONUS", mainRate: 291.1, base50: 33.0, coinUnit: 3.6, normalMin: 180, normalMax: 950, specialLabel: "SUPER GARO BONUS", specialChance: 0.32, specialMin: 800, specialMax: 1300, upperChallenge: "金色になれ！", upperChance: 0.22, upperSuccess: 0.50, upperLabel: "究極魔戒RUSH", upperContinue: 0.826, upperPayout: 740, settingRates: { 1: { trigger: 156.6, main: 291.1, payout: 0.975 }, 2: { trigger: 154.6, main: 283.7, payout: 0.988 }, 3: { trigger: 151.4, main: 276.1, payout: 1.012 }, 4: { trigger: 148.7, main: 265.8, payout: 1.046 }, 5: { trigger: 144.2, main: 259.4, payout: 1.105 }, 6: { trigger: 141.1, main: 256.5, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別CZ・BONUS確率を反映", paragraphs: ["CZは設定1約1/156.6から設定6約1/141.1、BONUSは設定1約1/291.1から設定6約1/256.5です。", "START時に設定1〜6を均等抽選し、選ばれた設定のCZ・BONUS確率・出玉率を使用します。結果と機種別ランキングにも設定を表示します。"] },
      { heading: "2種類のCZと疑似ボーナス", paragraphs: ["CZは牙狼モードと魔界の2種類。BONUSは20G、純増約9.1枚/Gで、BIG BONUS中はSUPER GARO BONUSを抽選します。", "サイトではCZを牙狼モードへまとめ、魔界やBIGの細かな振り分けは個別再現しません。"] },
      { heading: "金色になれ！から究極魔戒RUSHへ", paragraphs: ["SUPER GARO BONUSは約1000枚獲得後、3戦突破を目指すCZ『金色になれ！』へ進みます。", "究極魔戒RUSHは平均約740枚のボーナスが約82.6%でループする最上位状態です。未公表の到達率はサイト共通の固定抽選で簡易化します。"] },
      { heading: "固定レートと収支の条件", bullets: ["約33G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均BONUS投資目安は約9,600円", "コイン単価は設定1の参考値約3.6円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["サンセイR&D 公式製品情報", "https://www.sansei-rd.com/"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/vpage/2817/1"], ["天井・設定差まとめ", "https://tennabi.jp/garo-yami-wo-terasu-mono/"]]
  },
  "ragnador-slot": {
    order: 0.14, type: "slot", theme: "violet", year: "2026年11月", maker: "ミズホ", updated: "2026-10-31",
    name: "スマスロ ラグナドール", shortName: "スマスロ ラグナドール",
    catchcopy: "爽怪Chainをつなぎ、真ラグナドールRUSHへ。",
    intro: "2026年11月2日導入予定のスマスロ。設定別CZ・AT初当りを使い、ラグナドールバトル、チェインアタック、スペシャルジャッジ、上位ATまでを簡易体験できます。",
    points: ["CZは設定1約1/172.8〜設定6約1/142.4", "ATは設定1約1/326.4〜設定6約1/258.3", "通常AT純増約2.5枚/G・上位AT約4.5枚/G"],
    specs: [["CZ（設定1）", "約1/172.8"], ["CZ（設定6）", "約1/142.4"], ["AT（設定1）", "約1/326.4"], ["AT（設定6）", "約1/258.3"], ["ベース", "約31.0G/50枚"], ["スペシャルジャッジ", "成功期待度約70%"]],
    sim: { kind: "slot", triggerLabel: "ラグナドールバトル", triggerRate: 172.8, triggerSuccess: 0.50, mainLabel: "ラグナドールRUSH", mainRate: 326.4, base50: 31.0, coinUnit: 3.6, normalMin: 250, normalMax: 1050, specialLabel: "チェインアタック", specialChance: 0.34, specialMin: 180, specialMax: 950, upperChallenge: "スペシャルジャッジ", upperChance: 0.20, upperSuccess: 0.70, upperLabel: "真ラグナドールRUSH", upperContinue: 0.75, upperPayout: 600, settingRates: { 1: { trigger: 172.8, main: 326.4, payout: 0.976 }, 2: { trigger: 167.2, main: 317.2, payout: 0.988 }, 3: { trigger: 161.8, main: 307.7, payout: 1.003 }, 4: { trigger: 145.0, main: 271.2, payout: 1.057 }, 5: { trigger: 143.0, main: 260.8, payout: 1.105 }, 6: { trigger: 142.4, main: 258.3, payout: 1.145 } } },
    articleSections: [
      { heading: "設定別CZ・AT初当りを反映", paragraphs: ["CZは設定1約1/172.8から設定6約1/142.4、AT初当りは設定1約1/326.4から設定6約1/258.3です。", "START時に設定1〜6を均等抽選し、選ばれた設定のCZ・AT初当り・出玉率を使用します。結果とランキングにも設定を表示します。"] },
      { heading: "ラグナドールバトルからATへ", paragraphs: ["通常時は小役の連続やラグナ目からCZを目指します。CZ『ラグナドールバトル』の勝利期待度は約50%です。", "通常AT『ラグナドールRUSH』は40G＋α、純増約2.5枚/G。サイトではチェインやガチャ報酬を追加枚数抽選へまとめます。"] },
      { heading: "スペシャルジャッジと上位AT", paragraphs: ["スペシャルジャッジは16G＋αで、白7またはBAR揃いによる成功期待度は約70%です。", "成功後は純増約4.5枚/Gの『真ラグナドールRUSH』へ。白7・BARの期待獲得枚数差は記事で紹介し、非公表の上位継続率は固定の簡易抽選で表現します。"] },
      { heading: "固定レートと収支の条件", bullets: ["約31.0G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均AT投資目安は約11,400円", "コイン単価は設定1の参考値約3.6円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ユニバーサル 公式製品情報", "https://www.universal-777.com/"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/vpage/2807/1"], ["パチマガスロマガFREE 機種情報", "https://pachimaga.com/free/mach/maker-s/mizuho/l_ragnador.php"]]
  },
  "seiya-ougon-slot": {
    order: 0.15, type: "slot", theme: "gold", year: "2026年11月", maker: "サンスリー", updated: "2026-11-01",
    name: "L聖闘士星矢 黄金十二宮", shortName: "スマスロ 聖闘士星矢",
    catchcopy: "十二宮を突破し、SAGA BATTLEと千日戦争へ。",
    intro: "2026年11月2日導入予定のスマスロ。設定別CZ・AT初当りを使い、Battle of ZODIACの継続バトルから上位AT『千日戦争』までを簡易体験できます。",
    points: ["CZは設定1約1/214.4〜設定6約1/200.3", "ATは設定1約1/364.2〜設定6約1/310.5", "通常AT純増約4.0枚/G・千日戦争約6.6枚/G"],
    specs: [["CZ（設定1）", "約1/214.4"], ["CZ（設定6）", "約1/200.3"], ["AT（設定1）", "約1/364.2"], ["AT（設定6）", "約1/310.5"], ["ベース", "約31.3G/50枚"], ["千日戦争", "継続期待度約88%"]],
    sim: { kind: "slot", triggerLabel: "WHO ARE YOU？", triggerRate: 214.4, triggerSuccess: 0.50, mainLabel: "Battle of ZODIAC", mainRate: 364.2, base50: 31.3, coinUnit: 3.8, normalMin: 250, normalMax: 1100, specialLabel: "金牛激震", specialChance: 0.34, specialMin: 200, specialMax: 900, upperChallenge: "SAGA BATTLE", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "千日戦争", upperContinue: 0.88, upperPayout: 660, settingRates: { 1: { trigger: 214.4, main: 364.2, payout: 0.975 }, 2: { trigger: 214.1, main: 356.1, payout: 0.985 }, 3: { trigger: 211.7, main: 345.6, payout: 1.005 }, 4: { trigger: 202.5, main: 322.3, payout: 1.052 }, 5: { trigger: 197.2, main: 313.7, payout: 1.100 }, 6: { trigger: 200.3, main: 310.5, payout: 1.149 } } },
    articleSections: [
      { heading: "CZ・AT初当りを設定別に反映", paragraphs: ["CZ合算は設定1約1/214.4から設定6約1/200.3、AT初当りは設定1約1/364.2から設定6約1/310.5です。設定6のCZが設定5よりわずかに重い点も公開値どおり反映します。", "START時に設定1〜6を均等抽選し、結果とランキングに今回の設定を表示します。"] },
      { heading: "2種類のCZを代表演出へまとめる", paragraphs: ["実機には『WHO ARE YOU？』と『影ノ襲来』の2種類のCZがあります。小宇宙ポイントや周期からCZを目指し、突破できればATへ進みます。", "サイトでは2種類をWHO ARE YOU？へまとめ、CZ合算確率を使います。周期天井や各CZの細かな振り分けは個別再現しません。"] },
      { heading: "Battle of ZODIACと継続バトル", paragraphs: ["通常ATは純増約4.0枚/G、1セット30G＋α。ATパート後の継続バトルを勝ち進み、十二宮突破を目指します。バトル勝率の目安は約76%です。", "金牛宮のアルデバラン撃破時に期待できる金牛激震などは、追加枚数抽選へまとめます。"] },
      { heading: "SAGA BATTLEから千日戦争へ", paragraphs: ["十二宮突破後のSAGA BATTLEに勝利すると、上位AT『千日戦争』へ進みます。千日戦争は純増約6.6枚/G、継続期待度約88%です。", "上位への到達率はサイト共通の固定抽選で簡易化し、公開されている上位性能とは分けて扱います。"] },
      { heading: "固定レートと収支の条件", bullets: ["約31.3G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均AT投資目安は約12,600円", "コイン単価は設定1の参考値約3.8円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["パチマガスロマガ 機種概要", "https://psmaga.com/e/pachi/pla/s_conq/santhree_slot/09/kh01.php"], ["一撃 2026年11月新台情報", "https://1geki.jp/newmachinecalender/202611/"], ["設定・天井まとめ", "https://tennabi.jp/seiya-ougon-junikyu/"]]
  },
  "ggo-slot": {
    order: 0.2, type: "slot", theme: "magenta", year: "2026年11月", maker: "京楽／オッケー.", updated: "2026-11-01",
    name: "Lソードアート・オンライン オルタナティブ ガンゲイル・オンライン", shortName: "スマスロ GGO",
    catchcopy: "BONUSを重ね、SQUAD JAMと上位STへ。",
    intro: "2026年11月2日導入予定のスマスロ。設定別の初当り・SQUAD JAM確率を使い、BONUS、ST、GGOストーム、上位ST『イカれたレン』までを簡易体験できます。",
    points: ["初当りは設定1約1/192.0〜設定6約1/153.9", "SQUAD JAMは設定1約1/521.7〜設定6約1/392.6", "BONUS純増約3.4枚/G・上乗せBONUS約7.1枚/G"],
    specs: [["初当り（設定1）", "約1/192.0"], ["初当り（設定6）", "約1/153.9"], ["SJ（設定1）", "約1/521.7"], ["SJ（設定6）", "約1/392.6"], ["ベース", "約31G/50枚"], ["コイン単価", "約3.5円"]],
    sim: { kind: "slot", triggerLabel: "初当りBONUS", triggerRate: 192.0, triggerSuccess: 0.50, mainLabel: "SQUAD JAM", mainRate: 521.7, base50: 31.0, coinUnit: 3.5, normalMin: 180, normalMax: 1100, specialLabel: "GGO BONUS", specialChance: 0.36, specialMin: 180, specialMax: 900, upperChallenge: "GGOストーム", upperChance: 0.20, upperSuccess: 0.55, upperLabel: "イカれたレン", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { trigger: 192.0, main: 521.7, payout: 0.979 }, 2: { trigger: 189.2, main: 510.4, payout: 0.988 }, 3: { trigger: 180.9, main: 486.6, payout: 1.009 }, 4: { trigger: 168.6, main: 445.3, payout: 1.044 }, 5: { trigger: 155.4, main: 405.0, payout: 1.097 }, 6: { trigger: 153.9, main: 392.6, payout: 1.145 } } },
    articleSections: [
      { heading: "初当りとSQUAD JAMの設定差", paragraphs: ["初当り合算は設定1約1/192.0から設定6約1/153.9、ST『SQUAD JAM』は設定1約1/521.7から設定6約1/392.6です。", "START時に設定1〜6を均等抽選し、選ばれた設定の初当り・SQUAD JAM・出玉率を使用します。結果と機種別ランキングにも設定を表示します。"] },
      { heading: "CZイエスマムとBONUS", paragraphs: ["CZ『イエスマム』は10G＋αで、成功期待度は約50%です。BONUSはREGが20G・約70枚、BIGが40G・約130枚で、純増は約3.4枚/Gです。", "サイトでは通常時の直撃やCZを初当りBONUSへまとめます。CZの特訓回数、モード、スルー回数は個別再現しません。"] },
      { heading: "SQUAD JAMと上乗せBONUS", paragraphs: ["SQUAD JAMはバトル勝利で上乗せを目指すSTです。上乗せ分を払い出すガンゲイルBONUSは純増約7.1枚/Gです。", "シミュレーターではバトルと上乗せを追加枚数抽選へまとめ、1回の流れを短時間で確認できる構成にしています。"] },
      { heading: "GGOストームから上位STへ", paragraphs: ["エンディング後などの有利区間リセット時はGGOストームを経由し、上位ST『イカれたレン』を目指します。", "上位到達率や継続率の全詳細は公開値が揃っていないため、サイト共通の固定抽選で簡易化し、実機値と区別します。"] },
      { heading: "固定レートと収支の条件", bullets: ["約31G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均SQUAD JAM投資目安は約18,300円", "コイン単価は設定1の参考値約3.5円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["P-WORLD 新台スケジュール", "https://www.p-world.co.jp/database/machine.html"], ["一撃 2026年11月新台情報", "https://1geki.jp/newmachinecalender/202611/"], ["設定・天井まとめ", "https://tennabi.jp/gun-gale-online/"]]
  },
  "godzilla-eva2-slot": {
    order: 0.25, type: "slot", theme: "ember", year: "2026年11月", maker: "ビスティ", updated: "2026-11-01",
    name: "Lパチスロ ゴジラ対エヴァンゲリオン 2", shortName: "スマスロ ゴジエヴァ2",
    catchcopy: "2種類のBONUSを越え、G覚醒RUSHへ。",
    intro: "2026年11月2日導入予定のスマスロ。設定別BONUS・AT初当りを使い、集結バトル、ゴジエヴァRUSH、決戦カイザーギドラ、G覚醒RUSHまでを簡易体験できます。",
    points: ["BONUSは設定1約1/234.2〜設定6約1/195.0", "ATは設定1約1/460.5〜設定6約1/355.5", "純増約5.2枚/G・上位AT期待獲得約3600枚"],
    specs: [["BONUS（設定1）", "約1/234.2"], ["BONUS（設定6）", "約1/195.0"], ["AT（設定1）", "約1/460.5"], ["AT（設定6）", "約1/355.5"], ["ベース", "約30G/50枚"], ["AT純増", "約5.2枚/G"]],
    sim: { kind: "slot", triggerLabel: "集結バトル", triggerRate: 234.2, triggerSuccess: 0.50, mainLabel: "ゴジエヴァRUSH", mainRate: 460.5, base50: 30.0, coinUnit: 3.7, normalMin: 250, normalMax: 1300, specialLabel: "震撃チャンス", specialChance: 0.36, specialMin: 200, specialMax: 1100, upperChallenge: "決戦カイザーギドラ", upperChance: 0.20, upperSuccess: 0.50, upperLabel: "G覚醒RUSH", upperContinue: 0.80, upperPayout: 750, settingRates: { 1: { trigger: 234.2, main: 460.5, payout: 0.977 }, 2: { trigger: 229.0, main: 446.5, payout: 0.989 }, 3: { trigger: 221.8, main: 425.5, payout: 1.012 }, 4: { trigger: 207.0, main: 390.4, payout: 1.058 }, 5: { trigger: 201.5, main: 374.2, payout: 1.106 }, 6: { trigger: 195.0, main: 355.5, payout: 1.149 } } },
    articleSections: [
      { heading: "BONUSとAT初当りの設定差", paragraphs: ["疑似BONUSは設定1約1/234.2から設定6約1/195.0、AT『ゴジエヴァRUSH』は設定1約1/460.5から設定6約1/355.5です。", "START時に設定1〜6を均等抽選し、選ばれた設定のBONUS・AT初当り・出玉率を使用します。設定は最終結果と機種別ランキングに表示します。"] },
      { heading: "2種類のBONUSからATを目指す", paragraphs: ["エヴァンゲリオンBONUS後は『初号機vs魏怒羅零号機』、ゴジラBONUS後は『ゴジラチャレンジ』でATを目指します。公開されているAT期待度の目安はそれぞれ約41%と約64%です。", "シミュレーターでは2種類の入口を集結バトルとBONUS後ジャッジへまとめ、代表値50%の簡易抽選として進行します。"] },
      { heading: "ゴジエヴァRUSHと震撃チャンス", paragraphs: ["AT『ゴジエヴァRUSH』は純増約5.2枚/Gで、初期ゲーム数は50G以上です。上乗せ時はゲーム数10倍をかけた震撃チャンスが見どころです。", "サイトでは上乗せを追加枚数抽選にまとめます。実機の小役、G侵食役、内部状態、上乗せゲーム数の全振り分けは個別再現しません。"] },
      { heading: "決戦カイザーギドラからG覚醒RUSHへ", paragraphs: ["特定条件を満たしたAT終了後は決戦カイザーギドラへ進み、勝利すると上位AT『G覚醒RUSH』へ突入します。上位AT突入時の期待獲得枚数は約3600枚と案内されています。", "上位到達率とループ抽選はサイト共通の固定値で簡易化し、公開値と区別して表示します。"] },
      { heading: "固定レートと収支の条件", bullets: ["約30G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均AT投資目安は約16,700円", "コイン単価は設定1の参考値約3.7円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["フィールズ公式 新製品情報", "https://www.fields.biz/?lang=ja"], ["エヴァンゲリオン系 開発こぼれ話", "https://blog.eva-project.jp/category/l_godzilla_vs_eva2/"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/vpage/2825/1"]]
  },
  "mahoako-slot": {
    order: 0.75, type: "slot", theme: "magenta", year: "2026年10月", maker: "ニューギン", updated: "2026-10-31",
    name: "L魔法少女にあこがれて", shortName: "スマスロ まほあこ",
    catchcopy: "3種類のCZを突破し、超あこがれver.へ。",
    intro: "2026年10月19日導入の疑似ボーナス＋AT機。全設定共通約1/249.6のBONUS、設定差のあるCZ・AT初当り、上乗せ特化ゾーンから上位ATまでを簡易体験できます。",
    points: ["CZは設定1約1/357.0〜設定6約1/235.4", "BONUSは全設定共通約1/249.6", "通常AT約2.5枚/G・上位AT約5.0枚/G"],
    specs: [["CZ（設定1）", "約1/357.0"], ["CZ（設定6）", "約1/235.4"], ["BONUS", "約1/249.6（全設定共通）"], ["AT（設定1）", "約1/436.3"], ["AT（設定6）", "約1/305.7"], ["ベース", "約31.4G/50枚"]],
    sim: { kind: "slot", triggerLabel: "トランスマジア", triggerRate: 357.0, triggerSuccess: 0.42, mainLabel: "まほあこラッシュ", mainRate: 436.3, base50: 31.4, coinUnit: 3.2, normalMin: 200, normalMax: 1050, specialLabel: "あこがれATTACK", specialChance: 0.34, specialMin: 180, specialMax: 900, upperChallenge: "VSロードエノルメ", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "まほあこラッシュ 超あこがれver.", upperContinue: 0.60, upperPayout: 520, settingRates: { 1: { trigger: 357.0, main: 436.3, payout: 0.976 }, 2: { trigger: 333.8, main: 422.7, payout: 0.988 }, 3: { trigger: 310.7, main: 401.4, payout: 1.005 }, 4: { trigger: 273.3, main: 352.4, payout: 1.050 }, 5: { trigger: 243.0, main: 316.1, payout: 1.102 }, 6: { trigger: 235.4, main: 305.7, payout: 1.120 } } },
    articleSections: [
      { heading: "BONUSと設定差の見方", paragraphs: ["BONUS確率は全設定共通で約1/249.6です。一方、CZとAT初当りには設定差があり、設定1のAT約1/436.3から設定6の約1/305.7まで段階的に軽くなります。", "シミュレーターはSTART時に設定1〜6を均等抽選し、選ばれた設定のCZ・AT初当り・出玉率を使用します。結果と機種別ランキングにも今回の設定を表示します。"] },
      { heading: "3種類のCZをひとつの流れへ簡略化", paragraphs: ["実機にはトランスマジア、マジアマゼンタ決戦、マジアサルファ決戦の3種類のCZがあります。トランスマジアの成功期待度は約42%です。", "サイトでは演出を長くしすぎないため、3種類の入口を代表CZ『トランスマジア』へまとめています。実機のCZ振り分けや内部状態を完全再現するものではありません。"] },
      { heading: "通常AT・特化ゾーン・上位AT", paragraphs: ["通常AT『まほあこラッシュ』は純増約2.5枚/G。サディスティックタイム、ぶるぶるマッサージタイム、マジアベーゼ無双などの上乗せ要素があります。", "上位AT『まほあこラッシュ 超あこがれver.』は純増約5.0枚/Gです。シミュレーターでは特化ゾーンを追加枚数抽選へまとめ、上位CZと上位ATはサイト共通の固定確率で簡易表現します。"] },
      { heading: "設定1〜6の公開値を反映", bullets: ["設定1：CZ約1/357.0・AT約1/436.3・出玉率97.6%", "設定4：CZ約1/273.3・AT約1/352.4・出玉率105.0%", "設定6：CZ約1/235.4・AT約1/305.7・出玉率112.0%", "非公表の特化ゾーン・上位到達率には設定差を加えない"] },
      { heading: "固定レートと収支の条件", bullets: ["約31.4G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均AT投資目安は約15,100円", "コイン単価は設定1の参考値約3.2円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ニューギン公式 機種サイト", "https://www.newgin.co.jp/products/lmahoako/"], ["ニューギン開発者Q&A", "https://www.newgin.co.jp/devfaq/faq_category/lmahoako/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10563"], ["パチ＆スロ必勝本 機種情報", "https://p.hisshobon.jp/vpage/2818/1"]]
  },
  "uminchu-slot": {
    order: 0.9, type: "slot", theme: "aqua", year: "2026年10月", maker: "岡崎産業", updated: "2026-10-31",
    name: "L海人", shortName: "スマスロ 海人",
    catchcopy: "フルーツ連を重ね、10連の先のIREGUIへ。",
    intro: "2026年10月19日導入のスマスロ。Aタイプの分かりやすさとAT機の連チャン性を組み合わせ、フルーツ連状態からボーナスを重ねてIREGUIを目指す流れを簡易体験できます。",
    points: ["設定は1・2・4・5・6（設定3非搭載）", "初当りは設定1約1/247.7〜設定6約1/207.6", "ボーナス10連後のIREGUIは平均22連OVER"],
    specs: [["初当り（設定1）", "約1/247.7"], ["初当り（設定6）", "約1/207.6"], ["BIG平均", "約202枚"], ["REG平均", "約53枚"], ["ベース", "約29.9G/50枚"], ["IREGUI", "平均22連OVER"]],
    sim: { kind: "slot", triggerLabel: "フルーツ連状態", triggerRate: 247.7, triggerSuccess: 0.55, mainLabel: "海人BONUS", mainRate: 247.7, base50: 29.9, coinUnit: 4.0, normalMin: 180, normalMax: 900, specialLabel: "ボーナスストック", specialChance: 0.38, specialMin: 100, specialMax: 700, upperChallenge: "ボーナス10連チャレンジ", upperChance: 0.16, upperSuccess: 0.45, upperLabel: "IREGUI", upperContinue: 0.82, upperPayout: 450, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 247.7, main: 247.7, payout: 0.977 }, 2: { trigger: 243.3, main: 243.3, payout: 0.986 }, 4: { trigger: 219.8, main: 219.8, payout: 1.033 }, 5: { trigger: 211.0, main: 211.0, payout: 1.062 }, 6: { trigger: 207.6, main: 207.6, payout: 1.120 } } },
    articleSections: [
      { heading: "設定3を含めない実機どおりの抽選", paragraphs: ["通常遊技に使う設定は1・2・4・5・6の5段階です。設定3は搭載されておらず、設定Lも遊技用ではないため、シミュレーターのランダム設定から除外します。", "START時に5段階から均等抽選し、選ばれた設定の初当り確率と出玉率を使用します。設定は最終結果と機種別ランキングに表示します。"] },
      { heading: "フルーツ連からボーナスを目指す", paragraphs: ["フルーツ連状態ではフルーツが揃うたびにボーナスを抽選します。ボーナス中はストック抽選が行われ、終了後もフルーツ連状態へ移行して次の当りを狙います。", "サイトでは複数の内部状態を『フルーツ連状態』へまとめ、ボーナスストックを追加枚数抽選として表現します。実機の全モードやゾロ目抽選は個別再現しません。"] },
      { heading: "10連の先にあるIREGUI", paragraphs: ["32G以内のボーナスを10回獲得すると、ボーナスストック特化状態『IREGUI』へ進みます。公開情報では設定1でも平均22連OVERとされています。", "簡易シミュレーターでは10連到達を上位チャレンジとして短縮し、IREGUI中の連チャンをサイト共通の固定抽選で表示します。実機の平均連を保証するものではありません。"] },
      { heading: "設定別の初当りと出玉率", bullets: ["設定1：約1/247.7・出玉率97.7%", "設定2：約1/243.3・出玉率98.6%", "設定4：約1/219.8・出玉率103.3%", "設定5：約1/211.0・出玉率106.2%", "設定6：約1/207.6・出玉率112.0%"] },
      { heading: "固定レートと収支の条件", bullets: ["約29.9G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均初当り投資目安は約9,000円", "コイン単価は設定1の参考値約4.0円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10579"], ["パチマガスロマガFREE 機種情報", "https://pachimaga.com/free/mach/maker-s/okazaki/l_uminchu.php"], ["パチ7 新台試打・基本情報", "https://pachiseven.jp/articles/detail/26377"]]
  },
  "tenten-slot": {
    order: 0.95, type: "slot", theme: "violet", year: "2026年10月", maker: "オリンピアエステート", updated: "2026-10-31",
    name: "L転生王女と天才令嬢の魔法革命", shortName: "スマスロ 転天",
    catchcopy: "EPISODE BATTLEを越え、ボーナス高確を重ねる。",
    intro: "2026年10月5日導入の疑似ボーナスAT機。設定別CZ・転天BONUS初当りを使い、ボーナス後40Gの高確と輪廻転天チャレンジまでを簡易体験できます。",
    points: ["CZは設定1約1/171.5〜設定6約1/136.0", "転天BONUSは設定1約1/320.0〜設定6約1/246.4", "純増約4.5枚/G・ボーナス後は40Gの高確"],
    specs: [["CZ（設定1）", "約1/171.5"], ["CZ（設定6）", "約1/136.0"], ["BONUS（設定1）", "約1/320.0"], ["BONUS（設定6）", "約1/246.4"], ["ベース", "約32.4G/50枚"], ["純増", "約4.5枚/G"]],
    sim: { kind: "slot", triggerLabel: "EPISODE BATTLE", triggerRate: 171.5, triggerSuccess: 0.503, mainLabel: "転天BONUS", mainRate: 320.0, base50: 32.4, coinUnit: 3.3, normalMin: 200, normalMax: 1000, specialLabel: "転天STOCKチャレンジ", specialChance: 0.34, specialMin: 160, specialMax: 800, upperChallenge: "輪廻転天チャレンジ", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "上位ボーナス高確", upperContinue: 0.80, upperPayout: 520, settingRates: { 1: { trigger: 171.5, main: 320.0, payout: 0.979 }, 2: { trigger: 168.3, main: 314.7, payout: 0.989 }, 3: { trigger: 154.9, main: 294.2, payout: 1.010 }, 4: { trigger: 147.0, main: 276.9, payout: 1.036 }, 5: { trigger: 140.4, main: 260.0, payout: 1.076 }, 6: { trigger: 136.0, main: 246.4, payout: 1.103 } } },
    articleSections: [
      { heading: "CZとBONUSの両方に設定差を反映", paragraphs: ["CZ『EPISODE BATTLE』は設定1約1/171.5から設定6約1/136.0、転天BONUS初当りは設定1約1/320.0から設定6約1/246.4です。", "START時に設定1〜6を均等抽選し、選ばれた設定のCZ・BONUS初当り・出玉率を使用します。CZ成功期待度も公開値を参考に設定別確率へ反映します。"] },
      { heading: "ボーナス後40Gが連チャンの入口", paragraphs: ["転天BONUS後は40Gのボーナス高確へ移行し、次の王宮BONUSを狙います。ボーナス中の純増は約4.5枚/Gです。", "シミュレーターではボーナス高確中の細かな状態差を継続抽選へまとめ、転天STOCKチャレンジを追加枚数抽選として表示します。"] },
      { heading: "輪廻転天チャレンジと上位高確", paragraphs: ["ボーナスを重ねた先には上位CZ『輪廻転天チャレンジ』があり、成功で上位ボーナス高確へ進みます。", "上位到達率や上位中の全振り分けはサイト共通の固定抽選で簡易化しています。実機の全モード・ポイント・規定ゲーム数を完全再現するものではありません。"] },
      { heading: "設定別の公開値", bullets: ["設定1：CZ約1/171.5・BONUS約1/320.0・出玉率97.9%", "設定3：CZ約1/154.9・BONUS約1/294.2・出玉率101.0%", "設定4：CZ約1/147.0・BONUS約1/276.9・出玉率103.6%", "設定6：CZ約1/136.0・BONUS約1/246.4・出玉率110.3%"] },
      { heading: "固定レートと収支の条件", bullets: ["約32.4G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均BONUS投資目安は約10,700円", "コイン単価は設定1の参考値約3.3円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["平和 公式製品情報", "https://www.heiwanet.co.jp/products/1000/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10550"], ["パチマガスロマガFREE 機種情報", "https://pachimaga.com/free/mach/maker-s/olympiaestate/l_tenten.php"]]
  },
  "eva319-red": {
    order: 0.5, type: "pachinko", theme: "crimson", year: "2026年10月", maker: "ビスティ", updated: "2026-10-31",
    name: "P 新世紀エヴァンゲリオン -319 RED-", shortName: "エヴァ319 RED",
    catchcopy: "約1/319.7から、161回転のIMPACT MODEへ。",
    intro: "2026年10月19日導入のV-ST機。通常時約1/319.7、ST直行約65%と時短引き戻しを含む突入約75%、右打ちALL1500個の流れを固定条件で確認できます。",
    points: ["通常時約1/319.7、ST中約1/98.9", "ST直行約65%、時短・残保留込み突入約75%", "ST161回・継続約81%、右打ちALL1500個"],
    specs: [["通常時", "約1/319.7"], ["ST中", "約1/98.9"], ["ST直行", "約65%"], ["ST突入", "約75%"], ["ST回数／継続", "161回／約81%"], ["右打ち", "ALL 1500個"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.3, minSpins: 10, maxSpins: 30, rushLabel: "IMPACT MODE", rushEntry: 0.75, rushContinue: 0.81, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 1]] },
    articleSections: [
      { heading: "319 REDを見分けるポイント", paragraphs: ["本機は2026年10月19日導入のP機・V-STタイプです。通常時約1/319.7、ST161回、右打ち中の大当りは1500個という構成で、図柄揃い約1/399.9・ST157回のスマパチ『はじまりの記憶』とは別スペックです。", "同じ約1/319帯の『未来への咆哮』ともST回数が異なります。記事とシミュレーターでは機種名、通常確率、ST161回の3点を揃えて扱います。"] },
      { heading: "ST直行65%と突入75%の違い", paragraphs: ["初当りの約65%はST161回へ直行し、残る約35%は時短100回へ進みます。時短100回と残保留での引き戻しを含めたトータルST突入率が約75%です。", "シミュレーターは複数の入口を約75%の突入抽選へまとめます。時短だけを独立した100回転演出としては再現しないため、結果では『直行65%』ではなく『引き戻し込み75%』を使用します。"] },
      { heading: "ST161回とALL1500個", paragraphs: ["ST中は約1/98.9、161回と残保留を含む継続率は約81%です。電チュー入賞時の大当りは1500個払い出し＋ST161回で、簡易モデルも右打ち出玉を1500個に固定しています。", "初当り時の約1%にある1500個振り分け、保留連示唆、電サポ中の増減、オーバー入賞は簡易結果へ個別反映しません。初回出玉は代表値の300個として計算します。"] },
      { heading: "初当りまでの確率目安", paragraphs: ["約1/319.7を毎回同じ確率で抽選すると仮定した単純計算では、100回転以内に1回以上当たる確率は約26.9%、200回転以内は約46.6%、320回転以内は約63.3%、500回転以内は約79.1%です。", "平均319.7回転は『319回転までに必ず当たる』という意味ではありません。1回の結果ではなく、複数回の早い当りと深いハマりを比べて確率の幅を確認してください。"] },
      { heading: "固定レートと収支の見方", bullets: ["17.3回/1,000円・250玉貸し・28玉交換で固定", "平均投資目安は約18,500円", "持ち玉比率・再プレイ・端玉・電サポ中の玉増減は含めない", "実機の当選・収支・遊技結果を保証しない娯楽用モデル"] }
    ],
    sources: [["フィールズ公式 機種サイト", "https://www.eva-project.jp/hajimarinokioku/index_319.html"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10583"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4797/1/1"]]
  },
  "lycoris-recoil-slot": {
    order: 1, type: "slot", theme: "crimson", year: "2026年9月", maker: "サミー",
    name: "スマスロ リコリス・リコイル", shortName: "スマスロ リコリコ",
    catchcopy: "CZを突破し、リコリスラッシュWを目指す。",
    intro: "2026年9月7日導入のスマスロ。CZから高純増ATへ進み、上位CZ『リコイル オブ リコリス』成功で上位ATを目指す流れを簡易体験できます。",
    points: ["CZは設定1約1/198.7〜設定6約1/169.4", "AT初当りは設定1約1/328.8〜設定6約1/256.7", "約31.8G/50枚・コイン単価約3.2円（設定1）"],
    specs: [["CZ（設定1）", "約1/198.7"], ["CZ（設定6）", "約1/169.4"], ["AT初当り（設定1）", "約1/328.8"], ["AT初当り（設定6）", "約1/256.7"], ["ベース", "約31.8G/50枚"], ["AT純増", "約8.4枚/G"]],
    sim: { kind: "slot", triggerLabel: "オポジットバトル", triggerRate: 198.7, triggerSuccess: 0.53, mainLabel: "リコリスラッシュ", mainRate: 328.8, base50: 31.8, coinUnit: 3.2, normalMin: 250, normalMax: 950, specialLabel: "リコリスBONUS W", specialChance: 0.32, specialMin: 200, specialMax: 700, upperChallenge: "リコイル オブ リコリス", upperChance: 0.20, upperSuccess: 0.70, upperLabel: "リコリスラッシュW", upperContinue: 0.80, upperPayout: 520, settingRates: { 1: { trigger: 198.7, main: 328.8, payout: 0.979 }, 2: { trigger: 196.9, main: 323.4, payout: 0.989 }, 3: { trigger: 191.3, main: 312.1, payout: 1.013 }, 4: { trigger: 183.3, main: 288.3, payout: 1.061 }, 5: { trigger: 175.9, main: 271.6, payout: 1.104 }, 6: { trigger: 169.4, main: 256.7, payout: 1.146 } } },
    articleSections: [
      { heading: "設定1〜6のCZ・AT初当りを反映", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定のCZ確率・AT初当り・出玉率を使用します。設定は結果とランキングに表示します。", "上位CZや特化ゾーンの設定差は公表値が確認できないため、全設定で共通の簡易条件です。"] },
      { heading: "公開値を使う設定シミュレーション", bullets: ["設定1はCZ約1/198.7・AT約1/328.8", "設定6はCZ約1/169.4・AT約1/256.7", "46枚貸し・5.2枚交換で収支を表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10503"], ["パチマガスロマガFREE 機種情報", "https://pachimaga.com/free/mach/maker-s/sammy/l_lycoreco.php"]]
  },
  "assault-lily": {
    order: 2, type: "pachinko", theme: "sakura", year: "2026年9月", maker: "ビスティ",
    name: "e アサルトリリィ", shortName: "eアサルトリリィ",
    catchcopy: "軽い初当りから、ASSAULT RUSHへ。",
    intro: "約1/164.4のライトミドルと最大4500個の振り分けを組み合わせたLT機。回転率を変えながら初当り投資とRUSH結果を試せます。",
    points: ["通常時大当り約1/164.4", "ASSAULT RUSH突入約25.3%、継続約80%", "RUSH中は約1500～約4500個"],
    specs: [["大当り確率", "約1/164.4"], ["RUSH中", "約1/65.5"], ["RUSH突入", "約25.3%"], ["ST回数", "100回"], ["RUSH継続", "約80%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 164.4, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.1, minSpins: 10, maxSpins: 30, rushLabel: "ASSAULT RUSH", rushEntry: 0.253, rushContinue: 0.80, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 0.50], [3000, 0.40], [4500, 0.10]] },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10554"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4816/1/1"]]
  },
  "kanokari-slot": {
    order: 3, type: "slot", theme: "magenta", year: "2026年9月", maker: "SANKYO",
    name: "Lパチスロ 彼女、お借りします", shortName: "スマスロ かのかり",
    catchcopy: "レンカノCHALLENGEから、1G連とS級の夢へ。",
    intro: "CZと疑似ボーナス、1G連抽選を軸にしたスマスロ。通常CZと上位CZを分け、ボーナス連からS級DREAM TIMEを目指す流れを簡易化しています。",
    points: ["CZは設定1約1/172〜設定6約1/149", "ボーナス初当りは設定1約1/269〜設定6約1/226", "約31.0G/50枚・コイン単価約3.6円（設定1）"],
    specs: [["CZ（設定1）", "約1/172"], ["CZ（設定6）", "約1/149"], ["ボーナス初当り（設定1）", "約1/269"], ["ボーナス初当り（設定6）", "約1/226"], ["ベース", "約31.0G/50枚"], ["AT純増", "約5.0枚/G"]],
    sim: { kind: "slot", triggerLabel: "レンカノCHALLENGE", triggerRate: 172, triggerSuccess: 0.56, mainLabel: "かのかりBONUS", mainRate: 269, base50: 31, coinUnit: 3.6, normalMin: 150, normalMax: 850, specialLabel: "1G恋ストック", specialChance: 0.36, specialMin: 150, specialMax: 750, upperChallenge: "妄想DTチャレンジ", upperChance: 0.18, upperSuccess: 0.75, upperLabel: "S級DREAM TIME", upperContinue: 0.80, upperPayout: 480, settingRates: { 1: { trigger: 172, main: 269, payout: 0.977 }, 2: { trigger: 169, main: 263, payout: 0.987 }, 3: { trigger: 164, main: 254, payout: 1.010 }, 4: { trigger: 154, main: 235, payout: 1.055 }, 5: { trigger: 151, main: 231, payout: 1.104 }, 6: { trigger: 149, main: 226, payout: 1.149 } } },
    articleSections: [
      { heading: "設定1〜6の公開値を個別反映", paragraphs: ["設定ごとのCZ合算・ボーナス初当り・出玉率を反映し、START時に設定1〜6を均等抽選します。", "妄想DTチャレンジやS級DREAM TIMEの設定差は公表値が確認できないため、サイト共通条件です。"] },
      { heading: "設定差を見るポイント", bullets: ["設定1はCZ約1/172・初当り約1/269", "設定6はCZ約1/149・初当り約1/226", "結果と機種別ランキングに設定を表示", "46枚貸し・5.2枚交換で収支を比較"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/products/machine_list/szf/?r=portal"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10543"]]
  },
  "kabaneri2-119": {
    order: 4, type: "pachinko", theme: "ember", year: "2026年9月", maker: "サミー",
    name: "e 甲鉄城のカバネリ2 輪廻の果報119ver.", shortName: "カバネリ2 119",
    catchcopy: "約1/119.8から、海門決戦と超輪廻ループへ。",
    intro: "遊びやすい初当り確率と、RUSH中の1500個以上を組み合わせたLT機。通常回転率から平均投資を計算できます。",
    points: ["通常時大当り約1/119.8", "RUSH突入約25.5%、ST134回", "RUSH継続約78%、大当り時1500個以上"],
    specs: [["大当り確率", "約1/119.8"], ["RUSH中", "約1/89.7"], ["RUSH突入", "約25.5%"], ["ST回数", "134回"], ["RUSH継続", "約78%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 119.8, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.3, minSpins: 10, maxSpins: 30, rushLabel: "海門決戦", rushEntry: 0.255, rushContinue: 0.78, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 0.70], [4500, 0.20], [6400, 0.10]] },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10504"], ["一撃 オンライン遊技説明", "https://1geki.jp/pachinko/e_kabaneri2_rinne/39/"]]
  },
  "aobuta-slot": {
    order: 5, type: "slot", theme: "violet", year: "2026年9月", maker: "オリンピア",
    name: "L青春ブタ野郎はバニーガール先輩の夢を見ない", shortName: "スマスロ 青ブタ",
    catchcopy: "完走型STを重ね、夢現JUDGEMENTを突破する。",
    intro: "疑似ボーナス後も残りゲーム数を消化できる完走型STが特徴。上位CZ『夢現JUDGEMENT』から上位STを目指す流れを簡易体験できます。",
    points: ["実機の抽選対象は設定2〜6（設定1非搭載）", "ボーナス初当りは設定2約1/350.8〜設定6約1/207.8", "約31.5G/50枚・コイン単価約4.1円（設定2）"],
    specs: [["設定", "2・3・4・5・6"], ["初当り（設定2）", "約1/350.8"], ["初当り（設定6）", "約1/207.8"], ["ベース", "約31.5G/50枚"], ["AT純増", "約8.0枚/G"], ["上位ST継続", "約80%"]],
    sim: { kind: "slot", triggerLabel: "初当りボーナス", triggerRate: 350.8, triggerSuccess: 1, mainLabel: "青ブタJUDGE", mainRate: 350.8, base50: 31.5, coinUnit: 4.1, normalMin: 250, normalMax: 1100, specialLabel: "青春DREAM BURST", specialChance: 0.34, specialMin: 200, specialMax: 950, upperChallenge: "夢現JUDGEMENT", upperChance: 0.20, upperSuccess: 0.53, upperLabel: "青春ブタ野郎は∞の夢を見る", upperContinue: 0.80, upperPayout: 700, settingPool: [2, 3, 4, 5, 6], settingRates: { 2: { trigger: 350.8, main: 350.8, payout: 0.981 }, 3: { trigger: 336.5, main: 336.5, payout: 0.993 }, 4: { trigger: 295.1, main: 295.1, payout: 1.053 }, 5: { trigger: 274.6, main: 274.6, payout: 1.084 }, 6: { trigger: 207.8, main: 207.8, payout: 1.103 } } },
    articleSections: [
      { heading: "設定2〜6を実機どおり抽選", paragraphs: ["設定1は搭載されていないため、START時は設定2・3・4・5・6から均等に抽選します。設定Lは遊技用ではないため対象外です。", "設定別の青春BONUS初当りと出玉率を使い、結果とランキングに今回の設定を表示します。"] },
      { heading: "公開値と簡易演出", bullets: ["設定2は初当り約1/350.8", "設定6は初当り約1/207.8", "夢現JUDGEMENT以降は共通の簡易抽選", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10527"], ["パチ＆スロ必勝本 通常時解説", "https://hisshobon.com/machineinfo/142469/"]]
  },
  "fire-force2-99": {
    order: 6, type: "pachinko", theme: "flame", year: "2026年9月", maker: "SANKYO",
    name: "eフィーバー炎炎ノ消防隊2 99ver.", shortName: "炎炎ノ消防隊2 99",
    catchcopy: "甘デジから炎上RUSH、そしてアドラバーストへ。",
    intro: "約1/99.9の初当りからRUSHとLTを目指す甘デジ。入力した回転率に応じて平均投資を表示し、炎上RUSHの継続を簡易抽選します。",
    points: ["通常時図柄揃い約1/99.9", "トータルRUSH突入約60%、炎上RUSH継続約77%", "LT『アドラバースト』は継続約95%"],
    specs: [["図柄揃い確率", "約1/99.9"], ["右打ち中", "約1/23.8"], ["RUSH突入", "約60%"], ["炎上RUSH", "約77%継続"], ["アドラバースト", "約95%継続"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "炎上RUSH", rushEntry: 0.60, rushContinue: 0.77, firstPayoutIn: 400, firstPayoutOut: 400, rushPayouts: [[400, 0.55], [900, 0.45]], upperLabel: "アドラバースト", upperDirectChance: 0.01, upperUpgradeChance: 0.01, upperContinue: 0.95 },
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/pxj/spec/?rf=m_top"], ["一撃 機種情報", "https://1geki.jp/pachinko/e_enen2_99/"]]
  },
  "hokuto-tensei2": {
    order: 7, type: "slot", theme: "gold", year: "2026年1月", maker: "サミー",
    name: "スマスロ 北斗の拳 転生の章2", shortName: "北斗転生2",
    catchcopy: "あべしを貯め、闘神演舞と神拳勝舞を突破する。",
    intro: "全国5,000店舗以上に設置され、投稿も活発な人気スマスロ。規定あべしからAT『闘神演舞』へ進み、勝舞魂を使う神拳勝舞と特化ゾーンを簡易体験できます。",
    points: ["AT初当りは設定1約1/366.0〜設定6約1/273.1", "約31.5G/50枚・コイン単価約3.5円", "AT純増約4.0枚/G、神拳勝舞とSPバトルを搭載"],
    specs: [["AT初当り（設定1）", "約1/366.0"], ["AT初当り（設定6）", "約1/273.1"], ["ベース", "約31.5G/50枚"], ["コイン単価", "約3.5円"], ["AT純増", "約4.0枚/G"], ["AT1セット", "30G"]],
    sim: { kind: "slot", triggerLabel: "闘神演舞", triggerRate: 366, triggerSuccess: 1, mainLabel: "闘神演舞", mainRate: 366, base50: 31.5, coinUnit: 3.5, normalMin: 250, normalMax: 1150, specialLabel: "拳王強襲", specialChance: 0.27, specialMin: 180, specialMax: 900, upperChallenge: "神拳勝舞", upperChance: 0.46, upperSuccess: 0.52, upperLabel: "SPバトル", upperContinue: 0.80, upperPayout: 420, settingRates: { 1: { trigger: 366.0, main: 366.0, payout: 0.976 }, 2: { trigger: 357.0, main: 357.0, payout: 0.984 }, 3: { trigger: 336.3, main: 336.3, payout: 1.007 }, 4: { trigger: 298.7, main: 298.7, payout: 1.062 }, 5: { trigger: 283.2, main: 283.2, payout: 1.111 }, 6: { trigger: 273.1, main: 273.1, payout: 1.149 } } },
    articleSections: [
      { heading: "設定1〜6のAT初当りを個別反映", paragraphs: ["START時に設定1〜6を均等抽選し、設定1約1/366.0、設定2約1/357.0、設定3約1/336.3、設定4約1/298.7、設定5約1/283.2、設定6約1/273.1のAT初当りを使用します。", "抽選された設定は結果とランキングに表示します。公開されていない拳王強襲・神拳勝舞・SPバトルの設定差は独自に加えません。"] },
      { heading: "あべしから神拳勝舞までを簡略化", paragraphs: ["実機は規定あべし到達から闘神演舞へ進み、勝舞魂を使う神拳勝舞でセット継続を目指します。シミュレーターでは初当りG、特化ゾーン、神拳勝舞、SPバトルを一連の演出にまとめています。", "31.5G/50枚、46枚貸し・5.2枚交換を固定し、設定1基準の平均投資と今回の収支を同じ条件で比較できます。"] },
      { heading: "遊び方のポイント", bullets: ["抽選設定ごとの初当りGを比較する", "拳王強襲の上乗せ結果を見る", "神拳勝舞からSPバトル到達を狙う", "19,000枚到達時はコンプリート表示で打ち切る"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10370"], ["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/1059/"]]
  },
  "tokyo-ghoul-super": {
    order: 8, type: "pachinko", theme: "crimson", year: "2026年6月", maker: "ビスティ",
    name: "e 東京喰種 超デカ超一撃ver.", shortName: "東京喰種 超デカ超一撃",
    catchcopy: "超デカSTARTから、7500個と喰MAXループへ。",
    intro: "高スタート設計と大きな初当り出玉を組み合わせた人気LT機。実質大当り約1/349.9から、7500個スタートと3000個ループを簡易抽選します。",
    points: ["実質大当り確率約1/349.9、図柄揃い約1/999", "RUSH突入約50%、突入時7500個", "超デカSTART・RUSH中は3000個以上"],
    specs: [["実質大当り", "約1/349.9"], ["図柄揃い", "約1/999"], ["RUSH中", "約1/7.7"], ["RUSH突入", "約50%"], ["RUSH継続", "約50%"], ["スタート", "超デカSTART"]],
    sim: { kind: "pachinko", hitRate: 349.9, hitLabel: "実質初当り", startType: "超デカSTART", spinsPer1k: 30.3, minSpins: 15, maxSpins: 45, rushLabel: "HYPER喰種RUSH", rushEntry: 0.50, rushContinue: 0.50, firstPayoutIn: 7500, firstPayoutOut: 3000, rushPayouts: [[3000, 0.75], [6000, 0.25]] },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10500"], ["一撃 機種解析", "https://1geki.jp/pachinko/e_tokyoghoul_tyo1geki/"]]
  },
  "bofuri-slot": {
    order: 9, type: "slot", theme: "aqua", year: "2024年6月", maker: "サミー",
    name: "スマスロ痛いのは嫌なので防御力に極振りしたいと思います。", shortName: "スマスロ 防振り",
    catchcopy: "高確率ZONEを突破し、防御状態をループさせる。",
    intro: "CZと防御状態のループが支持される人気スマスロ。通常CZからボーナス、上位CZ『極・高確率』と高継続状態を目指す流れを簡易化しています。",
    points: ["初当りは設定1約1/319.0〜設定6約1/229.7", "約33G/50枚・コイン単価約3.3円", "防御状態ループ約77～94%、上位CZ期待度約55%"],
    specs: [["初当り（設定1）", "約1/319.0"], ["初当り（設定6）", "約1/229.7"], ["設定1出玉率", "97.9%"], ["設定6出玉率", "113.0%"], ["ベース", "約33G/50枚"], ["純増", "約5.5枚/G"]],
    sim: { kind: "slot", triggerLabel: "運営高確率", triggerRate: 159.5, triggerSuccess: 0.50, mainLabel: "防振りBONUS", mainRate: 319, base50: 33, coinUnit: 3.3, normalMin: 180, normalMax: 850, specialLabel: "暴虐ZONE", specialChance: 0.31, specialMin: 150, specialMax: 850, upperChallenge: "極・高確率", upperChance: 0.22, upperSuccess: 0.55, upperLabel: "防御状態Lv.4", upperContinue: 0.94, upperPayout: 310, settingRates: { 1: { main: 319.0, payout: 0.979 }, 2: { main: 309.8, payout: 0.988 }, 3: { main: 307.3, payout: 1.005 }, 4: { main: 266.8, payout: 1.059 }, 5: { main: 257.1, payout: 1.095 }, 6: { main: 229.7, payout: 1.130 } } },
    articleSections: [
      { heading: "設定1〜6のボーナス初当りを反映", paragraphs: ["設定1約1/319.0から設定6約1/229.7まで、公開されているボーナス初当りと出玉率を使用します。", "CZ出現率の全設定値は公開されていないため、運営高確率の発生は初当り確率と従来の50%突破条件から簡易換算します。"] },
      { heading: "結果の見方", bullets: ["今回の設定を結果とランキングに表示", "上位CZ・防御状態の設定差は追加しない", "46枚貸し・5.2枚交換で収支を表示", "コンプリート到達時は19,000枚で打ち切る"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10036"], ["サミー 公式機種情報", "https://www.sammy.co.jp/japanese/product/pachislot/bou_fu/"]]
  },
  "azur-lane-slot": {
    order: 10, type: "slot", theme: "ocean", year: "2025年8月", maker: "京楽",
    name: "L アズールレーン THE ANIMATION", shortName: "スマスロ アズールレーン",
    catchcopy: "4陣営を集結し、天城バトルから異次元性能へ。",
    intro: "ボーナスとATを重ねて上位ATを目指す人気スマスロ。4陣営集結から天城バトルを突破し、異次元性能SS RUSHへ進む流れを簡易体験できます。",
    points: ["ボーナスは設定1約1/167.4〜設定6約1/156.0", "ATは設定1約1/598.9〜設定6約1/467.5", "約25.8G/50枚・コイン単価約3.6円"],
    specs: [["ボーナス（設定1）", "約1/167.4"], ["ボーナス（設定6）", "約1/156.0"], ["AT初当り（設定1）", "約1/598.9"], ["AT初当り（設定6）", "約1/467.5"], ["AT純増", "約2.5枚/G"], ["上位AT純増", "約5.1枚/G"]],
    sim: { kind: "slot", triggerLabel: "海戦BONUS", triggerRate: 167.4, triggerSuccess: 0.28, mainLabel: "アズールレーンRUSH", mainRate: 598.9, base50: 25.8, coinUnit: 3.6, normalMin: 350, normalMax: 1500, specialLabel: "4陣営集結", specialChance: 0.34, specialMin: 220, specialMax: 850, upperChallenge: "天城バトル", upperChance: 0.28, upperSuccess: 0.54, upperLabel: "異次元性能SS RUSH", upperContinue: 0.72, upperPayout: 720, settingRates: { 1: { trigger: 167.4, main: 598.9, payout: 0.979 }, 2: { trigger: 166.5, main: 589.5, payout: 0.986 }, 3: { trigger: 164.3, main: 564.2, payout: 1.007 }, 4: { trigger: 161.3, main: 527.1, payout: 1.053 }, 5: { trigger: 158.9, main: 496.4, payout: 1.106 }, 6: { trigger: 156.0, main: 467.5, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別ボーナス・AT初当りを反映", paragraphs: ["設定1〜6を均等抽選し、設定ごとの海戦BONUS・アズールレーンRUSH初当り・出玉率を使用します。", "設定5のAT初当りは約1/496.4として反映し、設定は結果画面と機種別ランキングに残ります。"] },
      { heading: "上位ルートは共通条件", bullets: ["設定1はBONUS約1/167.4・AT約1/598.9", "設定6はBONUS約1/156.0・AT約1/467.5", "4陣営集結と天城バトルは簡易抽選", "46枚貸し・5.2枚交換で収支を表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10312"], ["一撃 オンライン遊技説明", "https://1geki.jp/slot/l_azurlane/39/"]]
  },
  "sao-alicization-yozora": {
    order: 11, type: "pachinko", theme: "violet", year: "2026年8月", maker: "京楽",
    name: "e ソードアート・オンライン アリシゼーション 夜空", shortName: "SAO アリシゼーション 夜空",
    catchcopy: "SWORD RUSHから決意の刃、War of Underworldへ。",
    intro: "遊びやすいライトミドルと上位LTを組み合わせた人気機。FAIR STARTの回転率を調整し、下位STから決意の刃を突破する流れを試せます。",
    points: ["通常時大当り約1/199.9", "RUSH突入約50%、下位ST継続約65%", "決意の刃突破でLT、上位ST継続約75%"],
    specs: [["大当り確率", "約1/199.9"], ["右打ち中", "約1/51.6"], ["RUSH突入", "約50%"], ["SWORD RUSH", "約65%継続"], ["上位LT", "約75%継続"], ["スタート", "FAIR START"]],
    sim: { kind: "pachinko", hitRate: 199.9, hitLabel: "初当り", startType: "FAIR START", spinsPer1k: 18.0, minSpins: 10, maxSpins: 30, rushLabel: "SWORD RUSH", rushEntry: 0.50, rushContinue: 0.65, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[300, 0.20], [1500, 0.60], [3000, 0.20]], upperLabel: "War of Underworld", upperDirectChance: 0.015, upperUpgradeChance: 0.22, upperContinue: 0.75 },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10492"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4757/1/115703"]]
  },
  "gundam-seed-climax": {
    order: 12, type: "pachinko", theme: "ice", year: "2026年8月", maker: "SANKYO",
    name: "eフィーバー機動戦士ガンダムSEED クライマックス", shortName: "ガンダムSEED クライマックス",
    catchcopy: "FULLBURST RUSH CLIMAXで4500個ループを狙う。",
    intro: "約1/399.9の初当りと大出玉LTを組み合わせた人気スマパチ。図柄揃いからCLIMAXへ突入し、4500個ループを狙う流れを簡易抽選します。",
    points: ["通常時図柄揃い約1/399.9", "図柄揃い時RUSH突入約52%", "ST130回・継続約75%、CLIMAX中は約51%で4500個"],
    specs: [["図柄揃い", "約1/399.9"], ["RUSH突入", "約52%"], ["ST回数", "130回"], ["RUSH継続", "約75%"], ["CLIMAX当り", "3000個or4500個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "FULLBURST RUSH CLIMAX", rushEntry: 0.52, rushContinue: 0.75, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[4500, 0.51], [3000, 0.49]] },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10506"], ["ぱち7 機種解析", "https://pachiseven.jp/articles/detail/26157"]]
  },
  "tokyo-ghoul-slot": {
    order: 13, type: "slot", theme: "crimson", year: "2025年2月", maker: "スパイキー",
    name: "L 東京喰種", shortName: "スマスロ 東京喰種",
    catchcopy: "レミニセンスを突破し、有馬貴将JUDGEMENTへ。",
    intro: "全国の大型ホールで主力設置される人気スマスロ。CZからAT『東京喰種咬』、BITESや特化ゾーンを経て上位CZを目指す流れを簡易体験できます。",
    points: ["設定1のCZ約1/262.6、AT初当り約1/394.4", "約31G/50枚・コイン単価約4.1円", "上位CZ『有馬貴将JUDGEMENT』成功期待度約61%"],
    specs: [["CZ（設定1）", "約1/262.6"], ["AT初当り（設定1）", "約1/394.4"], ["ベース", "約31G/50枚"], ["コイン単価", "約4.1円"], ["AT純増", "約4.0枚/G"], ["上位CZ期待度", "約61%"]],
    sim: { kind: "slot", triggerLabel: "レミニセンス", triggerRate: 262.6, triggerSuccess: 0.666, mainLabel: "東京喰種咬", mainRate: 394.4, base50: 31, coinUnit: 4.1, normalMin: 180, normalMax: 1000, specialLabel: "BITES", specialChance: 0.36, specialMin: 200, specialMax: 1200, upperChallenge: "有馬貴将JUDGEMENT", upperChance: 0.22, upperSuccess: 0.61, upperLabel: "CCGの死神", upperContinue: 0.76, upperPayout: 520, settingRates: { 1: { trigger: 262.6, main: 394.4, payout: 0.975 }, 2: { trigger: 255.6, main: 380.5, payout: 0.990 }, 3: { trigger: 246.5, main: 357.0, payout: 1.016 }, 4: { trigger: 233.1, main: 325.9, payout: 1.056 }, 5: { trigger: 216.4, main: 291.2, payout: 1.103 }, 6: { trigger: 203.7, main: 261.3, payout: 1.149 } } },
    articleSections: [
      { heading: "CZ・AT・上位CZを段階で見る", paragraphs: ["通常時からCZ、AT『東京喰種咬』、特化ゾーン、上位CZへ進む段階型のゲームフローです。ICHIGEKIでは、その中からレミニセンス、BITES、有馬貴将JUDGEMENT、CCGの死神を一つの結果にまとめています。", "公式サイトが示す全ての内部状態や演出を再現するものではなく、上位到達までの難しさと獲得枚数の振れ幅を体験する簡易モデルです。"] },
      { heading: "設定1〜6の公開値と平均G", paragraphs: ["設定1〜6で公開されているCZ・AT初当りを個別に登録しています。START時に抽選された設定の数値を使い、設定1ならCZ約1/262.6・AT約1/394.4、設定6ならCZ約1/203.7・AT約1/261.3として計算します。", "機種別固定値31G/50枚から平均投資を計算します。コイン単価4.1円は現金投資額そのものではなく、吸い込みと出玉の振れやすさを見る別の指標です。"] },
      { heading: "シミュレーターで見るポイント", bullets: ["平均Gより早い当りと深いハマりの両方を複数回確認する", "BITESの上乗せと上位CZ成功時の伸びを通常結果と比べる", "19,000枚へ達した結果はコンプリートとして打ち切り表示する", "結果投稿と口コミ・収支投稿を分けて記録する"] }
    ],
    sources: [["L 東京喰種 公式サイト", "https://www.slot-l-tokyoghoul.jp/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10207"], ["パチンコビレッジ 機種概要", "https://cs62.cs-plaza.com/g/pachi/pla/s_conq/nanashow_slot/16/kh01.php"]]
  },
  "valvrave2": {
    order: 14, type: "slot", theme: "magenta", year: "2025年11月", maker: "SANKYO",
    name: "Lパチスロ 革命機ヴァルヴレイヴ2", shortName: "スマスロ ヴヴヴ2",
    catchcopy: "ハラキリチャレンジを3連し、超革命RUSHへ。",
    intro: "高純増ATと高継続の上位ATを搭載した大型ホールの主力機。CZ・ボーナスから革命RUSHへ進み、3セット継続で超革命RUSHを目指します。",
    points: ["CZは全設定約1/324、初当り合算は約1/476〜1/456", "実機設定は1・2・4・5・6の5段階", "革命RUSH約75%、超革命RUSH最大約90%継続"],
    specs: [["CZ（全設定）", "約1/324"], ["初当り合算", "約1/476〜1/456"], ["ベース", "約32.7G/50枚"], ["コイン単価", "約4.2円"], ["AT純増", "約9.0枚/G"], ["超革命RUSH", "最大約90%継続"]],
    sim: { kind: "slot", triggerLabel: "共闘Vチャレンジ", triggerRate: 324, triggerSuccess: 0.681, mainLabel: "革命RUSH", mainRate: 476, base50: 32.7, coinUnit: 4.2, normalMin: 300, normalMax: 1350, specialLabel: "革命の剣", specialChance: 0.31, specialMin: 180, specialMax: 1000, upperChallenge: "ハラキリチャレンジ3連", upperChance: 0.42, upperSuccess: 1, upperLabel: "超革命RUSH", upperContinue: 0.90, upperPayout: 650, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 324, main: 476, payout: 0.977 }, 2: { trigger: 324, main: 473, payout: 0.993 }, 4: { trigger: 324, main: 464, payout: 1.047 }, 5: { trigger: 324, main: 459, payout: 1.108 }, 6: { trigger: 324, main: 456, payout: 1.149 } } },
    articleSections: [
      { heading: "実機どおり設定1・2・4・5・6を抽選", paragraphs: ["設定3を除く5段階から均等抽選します。CZは全設定約1/324、初当り合算は設定1約1/476、設定2約1/473、設定4約1/464、設定5約1/459、設定6約1/456です。", "設定別の初当り差は小さい一方、出玉率は97.7%〜114.9%と大きく異なります。結果とランキングには抽選設定を表示します。"] },
      { heading: "CZから超革命RUSHまで", paragraphs: ["共闘Vチャレンジを入口に、革命RUSH、革命の剣、ハラキリチャレンジ3連、超革命RUSHの流れへ簡略化しています。", "公開されていない上位到達率の設定差は加えず、32.7G/50枚・46枚貸し・5.2枚交換の固定条件で投資と収支を計算します。"] },
      { heading: "遊び方のポイント", bullets: ["設定別の初当りGと収支を比較する", "革命の剣の上乗せ幅を見る", "3連突破から超革命RUSHを狙う", "実機と同じ5段階設定だけがランキングに残る"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/ssp/spec/"], ["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/10352"], ["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/1040/31856/"]]
  },
  "kabaneri-unato": {
    order: 15, type: "slot", theme: "ember", year: "2026年3月", maker: "サミー",
    name: "スマスロ 甲鉄城のカバネリ 海門決戦", shortName: "カバネリ 海門決戦",
    catchcopy: "ボーナスからST、海門回想の先に裏・景之ST。",
    intro: "全国5,000店舗以上に設置されるカバネリのスマスロ後継機。初当りボーナスからSTを目指し、カバネリアタックと上位ルートを簡易抽選します。",
    points: ["設定1のボーナス初当り約1/254.2、ST約1/422.5", "約31.4G/50枚・コイン単価約3.1円", "AT純増約6.0枚/G、ST継続約76%"],
    specs: [["ボーナス初当り（設定1）", "約1/254.2"], ["ST初当り（設定1）", "約1/422.5"], ["ベース", "約31.4G/50枚"], ["コイン単価", "約3.1円"], ["AT純増", "約6.0枚/G"], ["ST継続", "約76%"]],
    sim: { kind: "slot", triggerLabel: "初当りボーナス", triggerRate: 254.2, triggerSuccess: 0.602, mainLabel: "カバネリST", mainRate: 422.5, base50: 31.4, coinUnit: 3.1, normalMin: 250, normalMax: 1100, specialLabel: "カバネリアタック", specialChance: 0.38, specialMin: 180, specialMax: 900, upperChallenge: "海門回想", upperChance: 0.20, upperSuccess: 0.50, upperLabel: "裏・景之ST", upperContinue: 0.88, upperPayout: 520, settingRates: { 1: { trigger: 254.2, main: 422.5, payout: 0.975 }, 2: { trigger: 242.3, main: 405.9, payout: 0.985 }, 3: { trigger: 239.6, main: 398.7, payout: 1.008 }, 4: { trigger: 214.0, main: 357.2, payout: 1.060 }, 5: { trigger: 203.2, main: 332.6, payout: 1.110 }, 6: { trigger: 195.1, main: 318.5, payout: 1.149 } } },
    articleSections: [
      { heading: "ボーナス・STの設定別公開値を反映", paragraphs: ["設定1〜6を均等抽選し、初当りボーナスとSTの両方へ公開設定別値を使用します。設定1は約1/254.2・ST約1/422.5、設定6は約1/195.1・ST約1/318.5です。", "2つの公開値からボーナス後のST到達割合を設定ごとに計算し、抽選設定を結果とランキングへ表示します。"] },
      { heading: "海門決戦の上位ルート", paragraphs: ["初当りボーナスからカバネリSTへ進み、カバネリアタック、海門回想、裏・景之STまでを短い演出にまとめています。", "上位ルートに公表されていない設定差は加えません。31.4G/50枚、46枚貸し・5.2枚交換の固定条件で収支を比較します。"] },
      { heading: "遊び方のポイント", bullets: ["設定別のボーナス・ST確率を結果で確認する", "ST非突入と突入後の収支差を見る", "海門回想から裏・景之STを狙う", "19,000枚到達時はコンプリート表示で打ち切る"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/10399"], ["ちょんぼりすた 機種解析", "https://chonborista.com/slot/sammy-slot/248689/"], ["フリック7 基本情報", "https://flick7.net/slot/kabaneri_unato/tenjo/"]]
  },
  "tokyo-ghoul-e": {
    order: 16, type: "pachinko", theme: "crimson", year: "2025年4月", maker: "ビスティ",
    name: "e 東京喰種", shortName: "e東京喰種",
    catchcopy: "図柄揃いから、ALL3000個以上のHYPER喰種RUSHへ。",
    intro: "全国設置上位で大型ホールにも多台数導入される人気スマパチ。図柄揃いまでの投資と、3000個以上のRUSH連チャンを簡易抽選します。",
    points: ["図柄揃い約1/399.9、チャージ込み大当り約1/199.9", "トータルRUSH突入約51%、ST130回", "RUSH継続約75%、右打ち3000個or6000個以上"],
    specs: [["図柄揃い", "約1/399.9"], ["チャージ込み", "約1/199.9"], ["RUSH中", "約1/95.3"], ["RUSH突入", "約51%"], ["RUSH継続", "約75%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 16.7, minSpins: 10, maxSpins: 30, rushLabel: "HYPER喰種RUSH", rushEntry: 0.51, rushContinue: 0.75, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[3000, 0.97], [6000, 0.03]] },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10249"], ["e東京喰種 公式サイト", "https://pachi-e-tokyoghoul.jp/"]]
  },
  "eva17-hajimari": {
    order: 17, type: "pachinko", theme: "violet", year: "2025年12月", maker: "ビスティ",
    name: "e 新世紀エヴァンゲリオン ～はじまりの記憶～", shortName: "エヴァ17 はじまりの記憶",
    catchcopy: "時短100回を備えたロングST、ALL2400個＋α。",
    intro: "大型ホールで多台数設置されるエヴァ20周年記念スマパチ。図柄揃いからSTまたは時短へ進み、約80%継続のRUSHを簡易体験できます。",
    points: ["図柄揃い約1/399.9、チャージ込み約1/349.9", "時短引き戻し込みST突入約61.4%", "ST157回・継続約80%、右打ちALL2400個＋α"],
    specs: [["図柄揃い", "約1/399.9"], ["チャージ込み", "約1/349.9"], ["ST中", "約1/99.6"], ["ST突入", "約61.4%"], ["ST継続", "約80%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "IMPACT MODE", rushEntry: 0.614, rushContinue: 0.80, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[2400, 0.995], [4800, 0.005]] },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10353"], ["SANKYOオンライン博物館", "https://www.sankyo-fever.jp/collection/989/"]]
  },
  "garo12-gokugen": {
    order: 18, type: "pachinko", theme: "gold", year: "2025年8月", maker: "サンセイR&D",
    name: "e牙狼12黄金騎士極限", shortName: "牙狼12 黄金騎士極限",
    catchcopy: "極限7500バトルを制し、魔戒CHANCE LTへ。",
    intro: "大出玉ルートに特化し、大型ホールで主力設置されるスマパチ。液晶図柄揃い、極限7500バトル、上位LTの二段階突破を簡易再現します。",
    points: ["大当り約1/349.9、液晶図柄揃い約1/437.4", "図柄揃いの約50%で極限7500バトル", "バトル突破約50%、魔戒CHANCE LT継続約76%"],
    specs: [["大当り確率", "約1/349.9"], ["液晶図柄揃い", "約1/437.4"], ["極限7500バトル", "突入約50%"], ["LT突入", "バトルの約50%"], ["LT継続", "約76%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 437.4, hitLabel: "液晶図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.2, minSpins: 10, maxSpins: 30, rushLabel: "極限7500バトル", rushEntry: 0.50, rushContinue: 0, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.75], [7500, 0.25]], upperLabel: "魔戒CHANCE LT", upperDirectChance: 0.50, upperUpgradeChance: 0, upperContinue: 0.76, upperEntryPayout: 7500 },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10305"], ["牙狼公式アーカイブ", "https://www.sansei-rd.com/p_garo_archive/archive/p_garo12_ok.html"]]
  },
  "karakuri-circus": {
    order: 19, type: "slot", theme: "crimson", year: "2023年7月", maker: "SANKYO",
    name: "パチスロ からくりサーカス", shortName: "からくりサーカス",
    catchcopy: "運命の一劇を越え、超からくりサーカスへ。",
    intro: "CZから基本ATへ進み、激情ジャッジと運命の一劇を経て上位ATを目指す人気スマスロ。段階ごとの突破と獲得枚数の振れ幅を簡易体験できます。",
    points: ["CZ『機械仕掛けの神』期待度約55%", "上位AT昇格チャレンジ『運命の一劇』期待度約50%", "上位AT『超からくりサーカス』は純増約7.6枚/G"],
    specs: [["CZ初当り（設定1）", "約1/333"], ["AT初当り（設定1）", "約1/564"], ["ベース", "約32.9G/50枚"], ["コイン単価", "約4.1円"], ["AT純増", "約2.8枚/G"], ["上位AT純増", "約7.6枚/G"]],
    sim: { kind: "slot", triggerLabel: "機械仕掛けの神", triggerRate: 333, triggerSuccess: 0.55, mainLabel: "からくりサーカス", mainRate: 564, base50: 32.9, coinUnit: 4.1, normalMin: 300, normalMax: 1200, specialLabel: "激情ジャッジ", specialChance: 0.50, specialMin: 200, specialMax: 900, upperChallenge: "運命の一劇", upperChance: 0.28, upperSuccess: 0.50, upperLabel: "超からくりサーカス", upperContinue: 0.74, upperPayout: 900, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 333, main: 564, payout: 0.975 }, 2: { trigger: 320, main: 543, payout: 0.987 }, 4: { trigger: 292, main: 469, payout: 1.030 }, 5: { trigger: 277, main: 451, payout: 1.081 }, 6: { trigger: 275, main: 447, payout: 1.149 } } },
    articleSections: [
      { heading: "基本ATから上位ATまでの流れ", paragraphs: ["通常時はレア役や規定ゲーム数などからCZ・ATを目指し、基本AT『からくりサーカス』では激情ジャッジ成功を重ねて上位ルートへ進みます。", "激情ジャッジを3回以上成功した状態でATが終了すると『運命の一劇』へ進み、成功すれば極限無双を経由して『超からくりサーカス』へ突入します。"] },
      { heading: "実機の設定1・2・4・5・6で抽選", paragraphs: ["実機に搭載される通常設定は1・2・4・5・6です。シミュレーターもこの5段階から均等抽選し、設定3は抽選しません。公開されているCZ・AT初当りを設定ごとに使用します。", "設定1はCZ約1/333・AT約1/564、設定6はCZ約1/275・AT約1/447です。50枚ベース32.9Gから投資目安を計算します。"] },
      { heading: "上位ATとコンプリート表示", paragraphs: ["基本ATは純増約2.8枚/G、上位ATは純増約7.6枚/Gという速度差が見どころです。簡易シミュレーションでは上位到達後のセット継続を獲得枚数へ置き換えて表現します。"], bullets: ["運命の一劇は約50%の突破として抽選", "上位AT終了後の実機の全ての引き戻し抽選は再現しない", "獲得19,000枚へ達した場合はコンプリートとして結果を打ち切る"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/9843"], ["SANKYOオンライン博物館", "https://www.sankyo-fever.jp/collection/946/"], ["SANKYO 基本情報PDF", "https://www.sankyo-fever.jp/products/assets/pdf/spx/spx_mp.pdf"], ["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4360"]]
  },
  "monkey-turn-v": {
    order: 20, type: "slot", theme: "aqua", year: "2023", maker: "山佐",
    name: "スマスロ モンキーターンV", shortName: "モンキーターンV",
    catchcopy: "SG RUSHからグランドスラム、その先の青島SGへ。",
    intro: "周期・CZ・シナリオ管理ATを組み合わせたロングヒット機。比較的マイルドなコイン単価と、上位到達時の伸びを両方体験できます。",
    points: ["設定1のAT初当りは約1/299.8", "CZ『超抜チャレンジ』を搭載", "上位AT『青島SG』はループ率約83%（Vストック込み）"],
    specs: [["AT初当り（設定1）", "約1/299.8"], ["ベース", "約32.0G/50枚"], ["コイン単価", "約3.1円"], ["SG RUSH純増", "約2.5枚/G"], ["青島SG純増", "約4.0枚/G"], ["青島SGループ", "約83%"]],
    sim: { kind: "slot", triggerLabel: "SG RUSH", triggerRate: 299.8, triggerSuccess: 1, mainLabel: "SG RUSH", mainRate: 299.8, base50: 32, coinUnit: 3.1, normalMin: 280, normalMax: 1050, specialLabel: "全速モード", specialChance: 0.36, specialMin: 150, specialMax: 700, upperChallenge: "青島VS波多野", upperChance: 0.19, upperSuccess: 0.50, upperLabel: "青島SG", upperContinue: 0.83, upperPayout: 520, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 299.8, main: 299.8, payout: 0.979 }, 2: { trigger: 295.5, main: 295.5, payout: 0.989 }, 4: { trigger: 258.8, main: 258.8, payout: 1.045 }, 5: { trigger: 235.7, main: 235.7, payout: 1.102 }, 6: { trigger: 222.9, main: 222.9, payout: 1.149 } } },
    articleSections: [
      { heading: "実機の設定1・2・4・5・6を使用", paragraphs: ["モンキーターンVの通常設定は1・2・4・5・6です。START時はこの5段階から均等抽選し、公開されているAT初当りをそのまま使います。設定3と設定Lは抽選対象にしません。", "AT初当りは設定1約1/299.8、設定2約1/295.5、設定4約1/258.8、設定5約1/235.7、設定6約1/222.9です。"] },
      { heading: "SG RUSHから青島SGまで", paragraphs: ["通常時の周期・CZを一つのAT初当り抽選へまとめ、SG RUSH、全速モード、青島VS波多野、青島SGの流れを体験用に簡略化しています。", "上位到達率や特化ゾーンは設定別の非公表値を推測せず、全設定で同じ固定条件を使います。"] }
    ],
    sources: [["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4450"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9923"]]
  },
  "eva15": {
    order: 21, type: "pachinko", theme: "violet", year: "2021", maker: "ビスティ",
    name: "新世紀エヴァンゲリオン～未来への咆哮～", shortName: "エヴァ15",
    catchcopy: "王道V-ST。163回転のIMPACT MODEを駆け抜ける。",
    intro: "長期稼働を続ける1/319.7のV-ST機。機種別の固定回転率で、初当りまでの平均投資とSTの連チャンを確認できます。",
    points: ["通常時大当り約1/319.7", "時短引き戻し込みST突入約70%", "ST継続約81%、右打ち大当りは約1500個"],
    specs: [["大当り確率", "約1/319.7"], ["ST中確率", "約1/99.4"], ["ST回数", "163回"], ["ST突入", "約70%"], ["ST継続", "約81%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.1, minSpins: 10, maxSpins: 30, rushLabel: "IMPACT MODE", rushEntry: 0.70, rushContinue: 0.81, firstPayoutIn: 450, firstPayoutOut: 450, rushPayouts: [[1500, 1]] },
    articleSections: [
      { heading: "1/319.7の初当りとST突入を分けて見る", paragraphs: ["通常時の大当り確率は約1/319.7です。奇数図柄揃いなどはST163回のIMPACT MODEへ、通常大当り後は時短100回のチャンスタイムへ進む構成です。", "サイト上のST突入約70%は、STへの直接突入だけでなく時短・残保留からの引き戻しを含むトータルの目安です。シミュレーターでは複数ルートを一つの突入抽選へ簡略化しています。"] },
      { heading: "継続約81%でも単発は起こる", paragraphs: ["ST163回と残保留を含む継続率は約81%です。単純な81%継続モデルでは平均約5.26連ですが、初回の継続抽選で終了する確率も19%あります。", "1回の結果だけで平均を判断せず、複数回試して単発・平均付近・大連チャンの幅を確認してください。"] },
      { heading: "回転率で変わる投資目安", paragraphs: ["初期値は1,000円あたり17.1回転です。実際の回転率を入力すると、今回の初当り回転と平均319.7回転の両方について投資目安を更新します。", "換金・収支は初期値の250玉貸し・28玉交換、または入力した実店舗レートで計算します。持ち玉、電サポ中の増減、オーバー入賞などは含みません。"] }
    ],
    sources: [["SANKYOオンライン博物館", "https://www.sankyo-fever.jp/collection/925/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9509"]]
  },
  "rezero-onigakari": {
    order: 22, type: "pachinko", theme: "ice", year: "2022", maker: "大都技研",
    name: "P Re:ゼロから始める異世界生活 鬼がかりver.", shortName: "リゼロ鬼がかり",
    catchcopy: "初当り3000個から始まる、鬼がかりRUSH。",
    intro: "3000発スタートと高速STで支持された人気機。通常回転率に応じた平均投資と、144回転RUSHの結果を試せます。",
    points: ["通常時大当り約1/319.6", "RUSH突入約55%", "ST144回、継続約77%"],
    specs: [["大当り確率", "約1/319.6"], ["RUSH中", "約1/99.9"], ["ST回数", "144回"], ["RUSH突入", "約55%"], ["RUSH継続", "約77%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "鬼がかりRUSH", rushEntry: 0.55, rushContinue: 0.77, firstPayoutIn: 3000, firstPayoutOut: 1500, rushPayouts: [[1500, 0.75], [3000, 0.25]] },
    sources: [["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4046"], ["アタリ7 スペック", "https://www.atari7.com/pachinko/onirezero.php"]]
  },
  "kabaneri": {
    order: 23, type: "slot", theme: "ember", year: "2022", maker: "サミー",
    name: "パチスロ甲鉄城のカバネリ", shortName: "甲鉄城のカバネリ",
    catchcopy: "3つのチャンス目からCZ、そしてカバネリオブジアイアンフォートレスへ。",
    intro: "6.5号機を代表するSTタイプ。ボーナスからST、無名回想を経由した上位STまでの流れを簡易抽選します。",
    points: ["3種類のチャンス目対応CZ", "ST初当り（設定1）約1/407.9", "上位ST『（裏）美馬ST』を搭載"],
    specs: [["ボーナス合算（設定1）", "約1/157.1"], ["ST初当り（設定1）", "約1/407.9"], ["ベース", "約33.0G/50枚"], ["コイン単価", "約2.8円"], ["ST純増", "約2.8枚/G"], ["上位ST継続", "80%超"]],
    sim: { kind: "slot", triggerLabel: "初当りボーナス", triggerRate: 237.0, triggerSuccess: 0.581, mainLabel: "カバネリST", mainRate: 407.9, base50: 33, coinUnit: 2.8, normalMin: 250, normalMax: 900, specialLabel: "無名回想", specialChance: 0.24, specialMin: 150, specialMax: 550, upperChallenge: "美馬決戦", upperChance: 0.18, upperSuccess: 0.46, upperLabel: "裏美馬ST", upperContinue: 0.82, upperPayout: 430, settingRates: { 1: { trigger: 237.0, main: 407.9, payout: 0.978 }, 2: { trigger: 230.7, main: 393.2, payout: 0.988 }, 3: { trigger: 214.0, main: 372.4, payout: 1.007 }, 4: { trigger: 186.5, main: 327.2, payout: 1.059 }, 5: { trigger: 171.3, main: 307.3, payout: 1.084 }, 6: { trigger: 151.3, main: 290.6, payout: 1.100 } } },
    articleSections: [
      { heading: "ボーナス初当りとST初当りを分けて見る", paragraphs: ["ボーナス合算約1/157.1は複数の当選を含む合算値です。シミュレーターの最初の契機には、設定1のボーナス初当り約1/237.0を使用し、ST初当り約1/407.9とは分けて抽選します。", "設定1〜6で公開されているボーナス初当り・ST初当りを個別に登録し、START時にランダム抽選された設定の数値を使います。"] },
      { heading: "固定レートと結果の見方", paragraphs: ["50枚あたり33.0G、1,000円46枚貸し、5.2枚交換を固定条件として投資・収支目安を計算します。", "無名回想、美馬決戦、裏美馬STは体験用に簡略化した固定抽選です。公開されていない設定差を推測して上乗せすることはありません。"] }
    ],
    sources: [["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4160"], ["パチナビ 設定別初当り", "https://pachinavi.net/machines/rev-kabaneri/"], ["セガサミー決算資料", "https://www.segasammy.co.jp/cms/wp-content/uploads/pdf/ja/ir/20242029_q3_presentation_j-1.pdf"]]
  },
  "smart-hokuto": {
    order: 24, type: "slot", theme: "gold", year: "2023", maker: "サミー",
    name: "スマスロ北斗の拳", shortName: "スマスロ北斗の拳",
    catchcopy: "バトルボーナスを継続し、無想転生バトルへ。",
    intro: "初代のゲーム性をスマスロで再構築した定番機。ATまでの平均ゲーム数と投資、無想転生チャンス突破を体験できます。",
    points: ["AT初当り（設定1）約1/383.4", "バトルボーナスは継続率管理", "無想転生バトルは継続率約94%"],
    specs: [["AT初当り（設定1）", "約1/383.4"], ["ベース", "約34.7G/50枚"], ["コイン単価", "約3.3円"], ["AT純増", "約4.1枚/G"], ["通常AT", "継続率管理"], ["無想転生", "継続約94%"]],
    sim: { kind: "slot", triggerLabel: "バトルボーナス", triggerRate: 383.4, triggerSuccess: 1, mainLabel: "バトルボーナス", mainRate: 383.4, base50: 34.7, coinUnit: 3.3, normalMin: 220, normalMax: 1100, specialLabel: "トキ共闘", specialChance: 0.28, specialMin: 180, specialMax: 700, upperChallenge: "無想転生チャンス", upperChance: 0.14, upperSuccess: 0.46, upperLabel: "無想転生バトル", upperContinue: 0.94, upperPayout: 310, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 383.4, main: 383.4, payout: 0.980 }, 2: { trigger: 370.5, main: 370.5, payout: 0.989 }, 4: { trigger: 297.8, main: 297.8, payout: 1.057 }, 5: { trigger: 258.7, main: 258.7, payout: 1.100 }, 6: { trigger: 235.1, main: 235.1, payout: 1.130 } } },
    articleSections: [
      { heading: "バトルボーナスを軸にしたゲーム性", paragraphs: ["設定1のAT初当りは約1/383.4。初代北斗を意識した継続率管理のバトルボーナスを重ね、無想転生チャンスから上位状態を目指します。", "ICHIGEKIでは通常時の全モード、天井、内部状態、レア役抽選を省略し、初当りG、通常ATの獲得枚数、無想転生チャンス、上位継続を一つの結果にまとめます。"] },
      { heading: "設定1・2・4・5・6の公開値", paragraphs: ["実機に搭載される通常設定は1・2・4・5・6です。設定3と設定Lは抽選対象にせず、この5段階から均等に選びます。BB初当りは設定1約1/383.4から設定6約1/235.1まで、公開設定別値を使います。", "50枚ベース34.7Gから投資目安を計算します。コイン単価3.3円は投資計算に使わず、結果の荒さを見る補助指標として表示します。"] },
      { heading: "無想転生とコンプリート", paragraphs: ["上位状態は継続約94%として簡易抽選します。94%でも終了抽選は毎セット発生するため、短く終わる結果と大きく伸びる結果の両方があります。"], bullets: ["上位到達前と到達後の獲得枚数を抽選履歴で確認", "複数回試して継続率のばらつきを比較", "獲得19,000枚へ達した場合はコンプリートとして打ち切り表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9786"], ["サミー 機種情報", "https://www.sammy.co.jp/japanese/product/pachislot/sp_hok_ke/EN.html"]]
  },
  "valvrave": {
    order: 25, type: "slot", theme: "magenta", year: "2022", maker: "SANKYO",
    name: "パチスロ 革命機ヴァルヴレイヴ", shortName: "革命機ヴァルヴレイヴ",
    catchcopy: "革命RUSHを突破し、超革命RUSHへ。",
    intro: "スマスロ初期を代表する高コイン単価機。通常RUSHから超革命RUSH、ハラキリDRIVEまでの荒さを簡易再現します。",
    points: ["設定1のCZ約1/277、ボーナス初当り約1/519", "コイン単価約4.5円の高波機", "超革命RUSHは継続約90%"],
    specs: [["CZ（設定1）", "約1/277"], ["ボーナス初当り（設定1）", "約1/519"], ["ベース", "約31.0G/50枚"], ["コイン単価", "約4.5円"], ["AT純増", "約7.2枚/G"], ["超革命RUSH継続", "約90%"]],
    sim: { kind: "slot", triggerLabel: "CZ", triggerRate: 277, triggerSuccess: 0.534, mainLabel: "決戦ボーナス／革命RUSH", mainRate: 519, base50: 31, coinUnit: 4.5, normalMin: 300, normalMax: 1500, specialLabel: "ハラキリDRIVE", specialChance: 0.31, specialMin: 360, specialMax: 1800, upperChallenge: "革命RUSH 3連突破", upperChance: 0.46, upperSuccess: 0.46, upperLabel: "超革命RUSH", upperContinue: 0.90, upperPayout: 540, settingRates: { 1: { trigger: 277, main: 519 }, 2: { trigger: 275, main: 516 }, 3: { trigger: 274, main: 514 }, 4: { trigger: 269, main: 507 }, 5: { trigger: 264, main: 499 }, 6: { trigger: 258, main: 490 } } },
    articleSections: [
      { heading: "設定別のCZ・初当りを使用", paragraphs: ["設定1〜6で公開されているCZとボーナス初当りを個別に登録しています。START時に抽選された設定のCZ確率を初当りGへ、CZとボーナス初当りの比率を突破抽選へ使用します。", "設定1はCZ約1/277・ボーナス初当り約1/519、設定6はCZ約1/258・ボーナス初当り約1/490です。"] },
      { heading: "上位到達は体験用の簡易モデル", paragraphs: ["ハラキリDRIVE、革命RUSH3連突破、超革命RUSHの流れは、公開されている代表値をもとに体験用へ簡略化しています。全小役、内部モード、有利区間の詳細は再現しません。", "50枚あたり31.0G、46枚貸し・5.2枚交換の固定条件で投資・収支目安を計算します。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9725"], ["SANKYOオンライン博物館", "https://www.sankyo-fever.jp/collection/936/"], ["SANKYO IR資料", "https://www.sankyo-fever.co.jp/corporate/modify/IR/Library_Briefing/files/explanation_20240807_ja.pdf"]]
  },
  "sengoku-otome4": {
    order: 26, type: "slot", theme: "sakura", year: "2023", maker: "オリンピアエステート",
    name: "L戦国乙女4 戦乱に閃く炯眼の軍師", shortName: "戦国乙女4",
    catchcopy: "乙女アタックから強カワRUSH、真強カワRUSHへ。",
    intro: "ボーナス・CZ・AT・上位ATの段階が分かりやすい人気スマスロ。乙女アタックとオウガイバトルを簡易抽選します。",
    points: ["ボーナス＋直撃AT初当り（設定1）約1/272.7", "AT初当り（設定1）約1/429.2", "上位AT『真強カワRUSH』は純増約5.0枚/G"],
    specs: [["初当り（設定1）", "約1/272.7"], ["AT初当り（設定1）", "約1/429.2"], ["ベース", "約31.7G/50枚"], ["コイン単価", "約3.4円"], ["AT純増", "約2.5枚/G"], ["上位AT純増", "約5.0枚/G"]],
    sim: { kind: "slot", triggerLabel: "ボーナス／直撃AT", triggerRate: 272.7, triggerSuccess: 0.635, mainLabel: "強カワRUSH", mainRate: 429.2, base50: 31.7, coinUnit: 3.4, normalMin: 260, normalMax: 1050, specialLabel: "神謀覚醒", specialChance: 0.25, specialMin: 180, specialMax: 1000, upperChallenge: "オウガイバトル", upperChance: 0.24, upperSuccess: 0.45, upperLabel: "真強カワRUSH", upperContinue: 0.70, upperPayout: 650, settingRates: { 1: { trigger: 272.7, main: 429.2, payout: 0.982 }, 2: { trigger: 267.3, main: 417.8, payout: 0.990 }, 3: { trigger: 255.3, main: 393.6, payout: 1.012 }, 4: { trigger: 238.2, main: 361.3, payout: 1.052 }, 5: { trigger: 223.2, main: 334.1, payout: 1.102 }, 6: { trigger: 217.1, main: 319.2, payout: 1.130 } } },
    articleSections: [
      { heading: "設定1〜6の公開初当りを反映", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定のボーナス＋直撃AT合算とAT初当りを使用します。設定1は初当り約1/272.7・AT約1/429.2、設定6は初当り約1/217.1・AT約1/319.2です。", "初当りからATへ進む割合も設定ごとの2つの公開値から計算します。公開されていない神謀覚醒や上位到達率の設定差は加えません。"] },
      { heading: "強カワRUSHと上位ATの流れ", paragraphs: ["通常時は巫女カウンターや規定ゲーム数からボーナス・CZ・直撃ATを目指し、AT中は出陣ボーナスやゲーム数上乗せで継続を狙います。", "シミュレーターでは複雑な内部状態を、ボーナス／直撃AT、強カワRUSH、神謀覚醒、オウガイバトル、真強カワRUSHの順へ簡略化しています。"] },
      { heading: "固定レートと平均投資", paragraphs: ["50枚あたり31.7G、1,000円46枚貸し、5.2枚交換で投資・換金・収支目安を計算します。コイン単価3.4円は荒さを見る指標として分けて表示します。", "獲得19,000枚へ達した結果はコンプリートとして打ち切り、マイ記録とランキングにも到達状態を残します。"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/9868"], ["一撃 機種解析", "https://1geki.jp/slot/l_otome_keigan/"], ["HEIWA 機種情報", "https://www.heiwanet.co.jp/products/pachislot/l-sg5/"]]
  },
  "oumi5": {
    order: 27, type: "pachinko", theme: "ocean", year: "2023", maker: "三洋物産",
    name: "P大海物語5", shortName: "大海物語5",
    catchcopy: "すべて1500個。王道の60%確変ループ。",
    intro: "幅広い層に支持される確変ループ機。通常回転率から平均投資を計算し、確変と時短引き戻しを含めた連チャンを試せます。",
    points: ["通常時大当り約1/319.6", "確変突入・継続60%", "すべての大当りが約1500個、通常後は時短100回"],
    specs: [["大当り確率", "約1/319.6"], ["確変中", "約1/31.9"], ["確変割合", "60%"], ["時短", "100回"], ["大当り出玉", "約1500個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 16.7, minSpins: 10, maxSpins: 30, rushLabel: "確変ループ", rushEntry: 0.708, rushContinue: 0.708, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 1]] },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9768"], ["三洋物産 機種情報", "https://www.sanyobussan.co.jp/products/pk_bigsea5/"]]
  },
  "sengoku-otome5": {
    order: 29, type: "slot", theme: "sakura", year: "2026年6月", maker: "オリンピア",
    name: "L戦国乙女5 業火を穿つ宿焔の双刃", shortName: "戦国乙女5",
    catchcopy: "カシンバトルを越え、剣聖CHANCEから真強カワRUSHへ。",
    intro: "周期抽選と巫女ポイントを軸に、CZ・AT・特化ゾーン・上位CZへ進む人気スマスロ。通常時から強カワRUSH、剣聖CHANCE、真強カワRUSHまでを簡易体験できます。",
    points: ["AT初当りは設定1約1/359.5〜設定6約1/262.9", "約31.0G/50枚・コイン単価は初期値3.5円", "剣聖CHANCEは10G＋α、通常初当り時の成功期待度約51%"],
    specs: [["AT初当り（設定1）", "約1/359.5"], ["AT初当り（設定6）", "約1/262.9"], ["ベース", "約31.0G/50枚"], ["コイン単価初期値", "3.5円"], ["AT純増", "約2.7枚/G"], ["上位CZ期待度", "約51%"]],
    sim: { kind: "slot", triggerLabel: "強カワRUSH", triggerRate: 359.5, triggerSuccess: 1, mainLabel: "強カワRUSH", mainRate: 359.5, base50: 31.0, coinUnit: 3.5, normalMin: 250, normalMax: 1100, specialLabel: "夢幻の如くなり", specialChance: 0.28, specialMin: 235, specialMax: 1100, upperChallenge: "剣聖CHANCE", upperChance: 0.051, upperSuccess: 0.51, upperLabel: "真強カワRUSH", upperContinue: 0.76, upperPayout: 620, settingRates: { 1: { trigger: 359.5, main: 359.5, payout: 0.979 }, 2: { trigger: 350.8, main: 350.8, payout: 0.989 }, 3: { trigger: 332.5, main: 332.5, payout: 1.010 }, 4: { trigger: 302.8, main: 302.8, payout: 1.062 }, 5: { trigger: 281.0, main: 281.0, payout: 1.111 }, 6: { trigger: 262.9, main: 262.9, payout: 1.149 } } },
    articleSections: [
      { heading: "設定1〜6の公開AT初当りを反映", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定のAT初当りを使用します。設定1は約1/359.5、設定2は約1/350.8、設定3は約1/332.5、設定4は約1/302.8、設定5は約1/281.0、設定6は約1/262.9です。", "周期やCZを含む複雑な通常時はAT初当りへまとめ、設定差が公開されていない抽選を独自に補正しません。抽選された設定は最終結果とランキングに表示します。"] },
      { heading: "周期・CZ・上位CZを一つの流れで体験", paragraphs: ["実機は規定ゲーム数と巫女ポイントからCZやATを目指し、上位CZ『剣聖CHANCE』成功で真強カワRUSHへ進みます。シミュレーターでは複雑な内部状態を、強カワRUSH初当りから特化ゾーン・上位CZへ進む流れに整理しています。", "剣聖CHANCEの発生率は通常初当り時の目安を使い、成功期待度約51%で抽選します。実機の全契機やモードは再現していません。"] },
      { heading: "平均359.5Gと投資目安", paragraphs: ["設定1のAT初当り約1/359.5と、機種別固定値31.0G/50枚を基準に平均投資を表示します。46枚貸し・5.2枚交換の共通条件で収支目安を比較できます。", "コイン単価3.5円はこの機種の固定指標です。投資額の計算には50枚ベースと貸出枚数を使い、コイン単価は荒さを見る補助指標として分けて表示します。"] },
      { heading: "遊び方のポイント", bullets: ["カシンバトル突破から強カワRUSH突入までを見る", "夢幻の如くなりの上乗せ幅を通常結果と比べる", "剣聖CHANCE成功後の真強カワRUSHを狙う", "19,000枚到達時はコンプリート表示で打ち切る"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10473"], ["一撃 設定差・設定判別", "https://1geki.jp/slot/l_otome5/0/"], ["なな徹 設定別スペック", "https://nana-press.com/kaiseki/machine/1160/36410/"]]
  },
  "million-god-kiseki": {
    order: 30, type: "slot", theme: "gold", year: "2026年4月", maker: "ミズホ",
    name: "スマスロ ミリオンゴッド‐神々の軌跡‐", shortName: "ミリオンゴッド 神々の軌跡",
    catchcopy: "G-STOPを突破し、Z-GAMEとSGGで神の連鎖へ。",
    intro: "王道のGOD GAMEを高純増ATで楽しむスマスロ。G-STOP、GOD GAME、Z-GAME、SGGの流れをシミュレーション用に整理しました。",
    points: ["GG初当りは設定1約1/532.8〜設定6約1/294.8", "偶数設定ほど初当りが軽い独自の設定差", "GOD GAMEは純増約7.0枚/G、1セット50G"],
    specs: [["GG初当り（設定1）", "約1/532.8"], ["GG初当り（設定6）", "約1/294.8"], ["ベース", "約30.8G/50枚"], ["コイン単価初期値", "4.0円"], ["AT純増", "約7.0枚/G"], ["GOD GAME", "1セット50G"]],
    sim: { kind: "slot", triggerLabel: "GOD GAME", triggerRate: 532.8, triggerSuccess: 1, mainLabel: "GOD GAME", mainRate: 532.8, base50: 30.8, coinUnit: 4.0, normalMin: 350, normalMax: 1400, specialLabel: "Z-GAME", specialChance: 0.30, specialMin: 350, specialMax: 1400, upperChallenge: "SGG", upperChance: 0.22, upperSuccess: 0.55, upperLabel: "SUPER GOD GAME", upperContinue: 0.80, upperPayout: 700, settingRates: { 1: { trigger: 532.8, main: 532.8, payout: 0.972 }, 2: { trigger: 420.4, main: 420.4, payout: 0.991 }, 3: { trigger: 495.9, main: 495.9, payout: 1.021 }, 4: { trigger: 338.4, main: 338.4, payout: 1.069 }, 5: { trigger: 455.4, main: 455.4, payout: 1.117 }, 6: { trigger: 294.8, main: 294.8, payout: 1.146 } } },
    articleSections: [
      { heading: "設定1〜6のGG初当りを個別反映", paragraphs: ["設定1約1/532.8、設定2約1/420.4、設定3約1/495.9、設定4約1/338.4、設定5約1/455.4、設定6約1/294.8をそのまま使用します。偶数設定の初当りが軽い非単調な設定差も変更していません。", "START時に設定を均等抽選し、最終結果とランキングへ表示します。出玉率は設定1の97.2%から設定6の114.6%です。"] },
      { heading: "王道GOD GAMEと上乗せ連鎖", paragraphs: ["液晶の奇数揃いから高純増AT『GOD GAME』へ進み、Z-GAMEやSGGでセット上乗せを狙う構成です。シミュレーターはGOD GAME初当りから上乗せゾーンへ進む短い体験にまとめています。", "G-STOP出現率や各上乗せ率に公開されていない設定差は加えず、演出の流れを楽しむための固定抽選として扱います。"] },
      { heading: "平均532.8Gと46枚貸し", paragraphs: ["設定1のAT初当り約1/532.8と機種別固定値30.8G/50枚から平均投資を計算します。条件は1,000円46枚貸し・5.2枚交換で統一しています。", "コイン単価は4.0円の固定体験用指標です。公式公表値としてではなく、荒さを比較する目安として扱っています。"] },
      { heading: "遊び方のポイント", bullets: ["深い初当りと早い当りの振れ幅を複数回見る", "Z-GAMEの上乗せ結果を通常GGと比べる", "SGG成功後のSUPER GOD GAMEを狙う", "ランキングは固定レートで公平に比較する"] }
    ],
    sources: [["ユニバーサル公式機種情報", "https://www.universal-777.com/product/slot/milliongod_kiseki/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10424"], ["スロベース 設定別スペック", "https://slobase.jp/machines/million-god"]]
  },
  "lycoris-recoil-pachinko": {
    order: 31, type: "pachinko", theme: "crimson", year: "2026年4月", maker: "ニューギン",
    name: "eリコリス・リコイル", shortName: "eリコリス・リコイル",
    catchcopy: "約1/259.7から、SPECIAL LycoReco RUSHへ。",
    intro: "ライトミドルの初当りと、大出玉モードを備えたLT機。回転率と交換率を変えながら、初当り・RUSH当落・ULTIMATE DRIVEを簡易体験できます。",
    points: ["通常時大当り約1/259.7", "RUSH突入50%、132回転・継続約75%", "RUSH中は750個・3000個・6000個、ULTIMATE DRIVE継続50%"],
    specs: [["大当り確率", "約1/259.7"], ["RUSH中", "約1/97.1"], ["RUSH突入", "50%"], ["RUSH回数", "132回"], ["RUSH継続", "約75%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 259.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 16.6, minSpins: 10, maxSpins: 30, rushLabel: "SPECIAL LycoReco RUSH", rushEntry: 0.50, rushContinue: 0.75, firstPayoutIn: 600, firstPayoutOut: 600, rushPayouts: [[750, 0.50], [3000, 0.25], [6000, 0.25]], upperLabel: "ULTIMATE DRIVE", upperDirectChance: 0, upperUpgradeChance: 0.18, upperContinue: 0.50 },
    articleSections: [
      { heading: "初当りからLTへ進む流れ", paragraphs: ["通常時は約1/259.7で初当りを抽選し、50%でSPECIAL LycoReco RUSH HYPER DELUXEへ進みます。132回転のRUSH継続率は約75%です。", "RUSH中のモード移行とULTIMATE DRIVEは簡略化しています。出玉の振り分けと上位到達は、実機の雰囲気を試す娯楽用モデルとして抽選します。"] },
      { heading: "固定条件で収支を比較", paragraphs: ["回転率は等価ボーダー目安の16.6回/1,000円で固定しています。同じ条件を使うため、シミュレーション結果を比べやすくしています。", "貸出は1,000円250玉、交換率は28玉/100円で固定し、ランキングも同じ条件で計算します。"] },
      { heading: "遊び方のポイント", bullets: ["初当りまでの回転数と投資目安を確認する", "RUSH非突入と突入後の差を比べる", "3000個・6000個振り分けとULTIMATE DRIVEを狙う", "結果投稿と口コミ・実戦収支を分けて共有する"] }
    ],
    sources: [["ニューギン公式機種情報", "https://www.newgin.co.jp/pub/machine/elycorisrecoil/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10463"]]
  },
  "okiumi6": {
    order: 32, type: "pachinko", theme: "ocean", year: "2025年10月", maker: "三洋物産",
    name: "Pスーパー海物語IN沖縄6", shortName: "沖海6",
    catchcopy: "王道60%確変ループに、ジンベェタイムをプラス。",
    intro: "大当り約1/319.6、確変60%の王道ミドル。通常時の回転率と交換率を変えながら、確変・時短引き戻し・ジンベェタイムを含む連チャンを簡易体験できます。",
    points: ["通常時大当り約1/319.6、確変中約1/31.9", "確変割合60%、通常大当り後は時短100回", "ジンベェタイムは時短200回または次回大当りまで"],
    specs: [["大当り確率", "約1/319.6"], ["確変中", "約1/31.9"], ["確変割合", "60%"], ["時短", "100回・200回"], ["10R出玉", "約1500個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.6, minSpins: 10, maxSpins: 30, rushLabel: "沖海確変ループ", rushEntry: 0.708, rushContinue: 0.708, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.867], [60, 0.133]], upperLabel: "ジンベェタイム", upperDirectChance: 0.08, upperUpgradeChance: 0.08, upperContinue: 0.79 },
    articleSections: [
      { heading: "60%確変と時短引き戻し", paragraphs: ["ヘソ大当りは10R確変40%、2R確変20%、10R通常40%。通常大当り後には時短100回が付きます。シミュレーターの突入・継続約70.8%は、60%確変と時短100回の引き戻しを合わせた簡易値です。", "ジンベェタイムは実機では当選状態により時短200回または次回まで継続します。ここでは到達後の継続率目安約79%として簡略化しています。"] },
      { heading: "固定回転率と平均投資", paragraphs: ["回転率は17.6回/1,000円で固定しています。約1/319.6の平均初当りまでに必要な投資目安を、全員同じ条件で比較できます。", "貸出は250玉、交換率は28玉/100円で固定し、換金目安と収支を表示します。端玉、持ち玉比率、再プレイは含みません。"] },
      { heading: "遊び方のポイント", bullets: ["初当り後の確変・時短引き戻しをまとめて体験する", "2R確変を含む出玉の振れ幅を見る", "ジンベェタイム到達後の連チャンを狙う", "大海5との確変ループ結果を比べる"] }
    ],
    sources: [["SANYO 公式発表", "https://www.sanyobussan.co.jp/information/pdf/sanyo_press_release_20250711_2.pdf"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10321"]]
  },
  "shin-hokuto-musou": {
    order: 28, type: "pachinko", theme: "flame", year: "2016", maker: "サミー",
    name: "ぱちんこCR真・北斗無双", shortName: "CR真・北斗無双",
    catchcopy: "80%×2400。長期稼働を築いたレジェンド。",
    intro: "高継続STと最大2400個で長期稼働した名機。時短引き戻し込みのST突入と、右打ちのラウンド振り分けを簡易再現します。",
    points: ["通常時大当り約1/319.7", "ST130回、継続約80%", "右打ち大当りの50%が約2400個"],
    specs: [["大当り確率", "約1/319.7"], ["ST中", "約1/81.2"], ["ST回数", "130回"], ["実質ST突入", "約64%"], ["ST継続", "約80%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "幻闘RUSH", rushEntry: 0.64, rushContinue: 0.80, firstPayoutIn: 900, firstPayoutOut: 900, rushPayouts: [[2400, 0.50], [1500, 0.14], [600, 0.36]] },
    sources: [["サミー 公式スペック", "https://www.sammy.co.jp/japanese/product/pachinko/2015/cr_shin_hokuto_muso/spec/"], ["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/2402"]]
  },
  "juoh-slot": {
    order: 33, type: "slot", theme: "gold", year: "2026年10月", maker: "サミー",
    name: "スマスロ 獣王", shortName: "スマスロ 獣王",
    catchcopy: "SC高確をつかみ、サバ連と4大トリガーへ。",
    intro: "2026年10月5日導入のストック放出型スマスロ。SC高確からサバンナチャンスへ進み、サバ連、超サバ、キリンサバチャンを目指す流れを簡易体験できます。",
    points: ["設定1・2・4・5・6からランダム抽選", "AT初当りは設定1約1/326.5〜設定6約1/279.7", "約31.8G/50枚・コイン単価約4.0円"],
    specs: [["設定", "1・2・4・5・6"], ["AT初当り（設定1）", "約1/326.5"], ["AT初当り（設定6）", "約1/279.7"], ["設定1出玉率", "97.8%"], ["設定6出玉率", "114.3%"], ["AT純増", "約8.0枚/G"]],
    sim: { kind: "slot", triggerLabel: "SC高確", triggerRate: 163.3, triggerSuccess: 0.50, mainLabel: "サバンナチャンス", mainRate: 326.5, base50: 31.8, coinUnit: 4.0, normalMin: 160, normalMax: 900, specialLabel: "サバ連", specialChance: 0.50, specialMin: 160, specialMax: 1200, upperChallenge: "4大サバンナトリガー", upperChance: 0.20, upperSuccess: 0.45, upperLabel: "キリンサバチャン", upperContinue: 0.85, upperPayout: 350, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { main: 326.5, payout: 0.978 }, 2: { main: 321.6, payout: 0.987 }, 4: { main: 295.8, payout: 1.056 }, 5: { main: 287.6, payout: 1.086 }, 6: { main: 279.7, payout: 1.143 } } },
    articleSections: [
      { heading: "SC高確からサバ連へ", paragraphs: ["通常時は小役や規定ゲーム数からSC高確へ進み、滞在中は全役でサバンナチャンスを抽選します。SC高確中のAT当選期待度は約50%です。", "サバンナチャンス終了後は最大29Gの潜伏区間へ移り、ストックがあれば再びSCが放出されます。シミュレーターでは、この連続を『サバ連』として獲得枚数へ加算します。"] },
      { heading: "4大トリガーとキリンサバチャン", paragraphs: ["超サバ獲得後は、キリンサバチャン、100ナビフリーズ、サバチャンEX、REGULAR BONUSといった出玉トリガーに期待できる構成です。", "KSCの継続率は約80%または約90%です。簡易モデルでは中間の85%を上位継続率として使い、実機のストック個数や全契機は再現していません。"] },
      { heading: "設定1・2・4・5・6を実機どおり抽選", paragraphs: ["設定3と設定Lは抽選対象に含めず、設定1・2・4・5・6を均等抽選します。設定別のSC初当りと出玉率を結果へ反映します。", "SC高確の設定別出現率は未公表のため、SC初当りから従来の50%突破条件で簡易換算します。"] },
      { heading: "固定条件とコンプリート", bullets: ["設定1のSC初当り約326.5Gから設定6約279.7G", "46枚貸し・5.2枚交換・31.8G/50枚で投資を計算", "コイン単価4.0円を高波区分として表示", "獲得19,000枚へ達した場合はコンプリートで打ち切る"] }
    ],
    sources: [["サミー 公式機種情報", "https://www.sammy.co.jp/japanese/product/pachislot/sp_jyu_oh/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10521"], ["P-WORLD 新機種ニュース", "https://news.p-world.co.jp/articles/33913/yugitsushin"]]
  },
  "monster-hunter-sunbreak": {
    order: 34, type: "slot", theme: "ember", year: "2026年10月", maker: "アデリオン",
    name: "スマスロ モンスターハンターライズ：サンブレイク", shortName: "モンハン サンブレイク",
    catchcopy: "CZを突破し、盟勇クエストとサンブレイクRUSH Gへ。",
    intro: "2026年10月5日導入のゲーム数上乗せ型スマスロ。BREAK ZONEとアイルー福引からATへ進み、盟勇クエスト、剥ぎ取りRUSH、上位ATを目指す流れを簡易化しています。",
    points: ["AT初当りは設定1約1/349.9〜設定6約1/242.3", "約31.9G/50枚・コイン単価約3.2円", "ATは40G＋α・純増約2.7枚/G、CZ期待度は約37%または約60%"],
    specs: [["AT初当り（設定1）", "約1/349.9"], ["AT初当り（設定6）", "約1/242.3"], ["設定1出玉率", "97.5%"], ["設定6出玉率", "112.4%"], ["BREAK ZONE", "期待度約37%"], ["アイルー福引", "期待度約60%"]],
    sim: { kind: "slot", triggerLabel: "CZ（BREAK ZONE／アイルー福引）", triggerRate: 170, triggerSuccess: 0.486, mainLabel: "サンブレイクRUSH", mainRate: 349.9, base50: 31.9, coinUnit: 3.2, normalMin: 260, normalMax: 1050, specialLabel: "剥ぎ取りRUSH", specialChance: 0.30, specialMin: 180, specialMax: 950, upperChallenge: "キュリアチャンス", upperChance: 0.16, upperSuccess: 0.45, upperLabel: "サンブレイクRUSH G", upperContinue: 0.70, upperPayout: 600, settingRates: { 1: { main: 349.9, payout: 0.975 }, 2: { main: 337.0, payout: 0.988 }, 3: { main: 319.8, payout: 1.008 }, 4: { main: 283.6, payout: 1.052 }, 5: { main: 264.0, payout: 1.084 }, 6: { main: 242.3, payout: 1.124 } } },
    articleSections: [
      { heading: "2種類のCZからATを目指す", paragraphs: ["BREAK ZONEは1セット5Gで成功期待度約37%、アイルー福引は10G＋αで成功期待度約60%です。実機はレア小役や規定リプレイ回数からCZを抽選します。", "シミュレーターでは2種類のCZを一つの入口にまとめ、公開期待度の中間を参考にAT当落を抽選します。CZ出現率や内部状態は体験用の簡易条件です。"] },
      { heading: "盟勇クエストと特化ゾーン", paragraphs: ["サンブレイクRUSHは40G＋α、純増約2.7枚/G。盟勇クエストでモンスターを討伐するとゲーム数を上乗せし、ATを伸ばします。", "剥ぎ取りRUSH、キュリアチャンス、サンブレイクボーナスを獲得枚数の上乗せとして整理し、上位AT『サンブレイクRUSH G』到達までを一つの結果画面で表示します。"] },
      { heading: "設定1〜6のAT初当りを反映", paragraphs: ["設定1約1/349.9から設定6約1/242.3まで、設定ごとのAT初当りと出玉率を反映します。", "2種類のCZの設定別出現率は未公表のため、CZ部分はAT初当りと従来の突破条件から簡易換算します。"] },
      { heading: "固定条件で見るポイント", bullets: ["設定1〜6を均等ランダム抽選", "46枚貸し・5.2枚交換・31.9G/50枚で投資を計算", "コイン単価3.2円は荒さの比較指標として表示", "実機の全モンスター・内部状態・設定示唆は再現しない"] }
    ],
    sources: [["エンターライズ 公式機種情報", "https://www.enterrise.co.jp/slot/mhrsb/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10570"]]
  },
  "rezero-onigakari2": {
    order: 35, type: "pachinko", theme: "ice", year: "2026年10月", maker: "大都技研",
    name: "e Re:ゼロから始める異世界生活 鬼がかり2", shortName: "eリゼロ 鬼がかり2",
    catchcopy: "約1/349.9から、6000個を搭載した鬼がかりRUSHへ。",
    intro: "2026年10月5日導入のSTタイプ。初当りの55%で144回転のRUSHへ進み、右打ち中25%の6000個振り分けとSTリセットを含む出玉を簡易抽選します。",
    points: ["通常時大当り約1/349.9", "RUSH突入55%、144回転・継続約77%", "RUSH中は25%で6000個、14%でSTリセット"],
    specs: [["大当り確率", "約1/349.9"], ["RUSH中", "約1/99.9"], ["RUSH突入", "55%"], ["ST回数", "144回"], ["RUSH継続", "約77%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 349.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.8, minSpins: 10, maxSpins: 30, rushLabel: "鬼がかりRUSH", rushEntry: 0.55, rushContinue: 0.765, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[6000, 0.25], [1500, 0.55], [300, 0.06], [0, 0.14]] },
    articleSections: [
      { heading: "初当りとRUSH突入", paragraphs: ["通常時の大当り確率は約1/349.9。初当りの10%は3000個＋RUSH、45%は1500個＋RUSH、残り45%は1500個で通常へ戻ります。", "シミュレーターでは初回出玉を1500個に統一し、RUSH突入率55%と継続率約76.5%を中心に結果の振れ幅を確認します。"] },
      { heading: "6000個とSTリセット", paragraphs: ["RUSH中は25%が6000個、55%が1500個、6%が300個、14%が出玉なしのRe:Startです。Re:StartでもST144回転が再セットされます。", "簡易モデルではRe:Startを0個の継続当りとして扱います。実機の演出モードや消化速度、出玉削りは再現していません。"] },
      { heading: "固定条件と投資計算", bullets: ["回転率は28玉交換のボーダー目安17.8回/1,000円で固定", "貸出は1,000円250玉、交換は100円28玉で固定", "平均349.9回転までの投資目安を表示", "RUSH非突入と6000個を含む連チャン結果を比較"] }
    ],
    sources: [["大都技研 公式製品情報", "https://www.daitogiken.com/products/pachinko/?year=14"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10557"]]
  },
  "baki-129": {
    order: 36, type: "pachinko", theme: "flame", year: "2026年10月", maker: "アムテックス",
    name: "e範馬刃牙 129ver.", shortName: "e範馬刃牙 129",
    catchcopy: "約1/129.7から3連勝し、史上最強バトルMODE90へ。",
    intro: "2026年10月5日導入のライトミドルLT機。初当りの約53%でバトルMODEへ進み、3連勝または一部の直行ルートから親子喧嘩を突破して、継続約90%の上位モードを目指します。",
    points: ["通常時大当り約1/129.7", "バトルMODE突入約53%・継続約65%", "LTジャッジ成功約65%、上位継続約90%・右打ちALL1000個"],
    specs: [["大当り確率", "約1/129.7"], ["右打ち中", "約1/1.54"], ["バトルMODE突入", "約53%"], ["バトル継続", "約65%"], ["上位継続", "約90%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 129.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 16.6, minSpins: 10, maxSpins: 30, rushLabel: "バトルMODE", rushEntry: 0.53, rushContinue: 0.65, firstPayoutIn: 500, firstPayoutOut: 500, rushPayouts: [[1000, 1]], upperChallenge: "地上最強の親子喧嘩", upperLabel: "史上最強バトルMODE90", upperDirectChance: 0, upperEarlyChance: 0.05, upperAfterHits: 4, upperChallengeSuccess: 0.65, upperChallengeEndsOnFailure: true, upperContinue: 0.90 },
    articleSections: [
      { heading: "初当りからバトルMODEへ", paragraphs: ["通常時は約1/129.7で大当りを抽選し、約53%でバトルMODEへ突入します。初回は5R・500個、右打ち中の大当りは10R・1000個です。", "シミュレーターでは約53%の突入と約65%の継続を固定値にし、バトルの連勝数を一つの結果画面で確認できます。"] },
      { heading: "3連勝から親子喧嘩、上位へ", paragraphs: ["バトルMODEは3連勝するとLT突入ジャッジ『地上最強の親子喧嘩』へ進みます。1・2回目の右打ち大当りにも約5%の直行振り分けがあります。", "親子喧嘩の成功率は約65%。成功後の史上最強バトルMODE90は約90%継続です。簡易モデルでは直行抽選、3連勝、ジャッジ成否を順に再現します。左打ち時の1000BONUS直行など細かな振り分けは省略しています。"] },
      { heading: "固定条件と投資計算", bullets: ["回転率は16.6回/1,000円のサイト固定値", "貸出は1,000円250玉、交換は100円28玉で固定", "平均129.7回転までの投資目安を表示", "実機の演出・保留・出玉削りは再現しない"] }
    ],
    sources: [["平和 公式製品ガイド", "https://www.heiwanet.co.jp/assets/images/products/guide/p-bk2.pdf"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10547"], ["ハズセ 機種情報", "https://hazuse.com/machine/pachinko/PX0379/"]]
  },
  "godzilla7-choshinkan": {
    order: 37, type: "pachinko", theme: "ember", year: "2026年10月", maker: "ニューギン",
    name: "デカスタeGODZILLA7 超震撼ver.", shortName: "デカスタGODZILLA7",
    catchcopy: "約1/59の震撼ジャッジメントから、最大7500個のUG-RUSHへ。",
    intro: "2026年10月5日導入の役物チャレンジ型LT機。震撼ジャッジメントの発生と成功、図柄揃い後のUG-RUSH、アルティメットチャージを公開値に沿って簡易体験できます。",
    points: ["震撼ジャッジメント出現約1/59・成功約42%", "図柄揃い時のLT突入約82.6%", "UG-RUSH継続約76.2%、大当りの1/2でアルティメットチャージ"],
    specs: [["役物チャレンジ", "約1/59"], ["役物成功率", "約42%"], ["実質大当り", "約1/229.95"], ["LT突入", "約82.6%"], ["RUSH継続", "約76.2%"], ["スタート", "デカスタ"]],
    sim: { kind: "pachinko", hitRate: 229.95, hitLabel: "実質大当り", startType: "デカスタ", spinsPer1k: 30.0, minSpins: 10, maxSpins: 40, rushLabel: "UG-RUSH", rushEntry: 0.826, rushContinue: 0.762, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.53125], [3000, 0.125], [4500, 0.1875], [6000, 0.125], [7500, 0.03125]] },
    articleSections: [
      { heading: "約1/59の役物チャレンジ", paragraphs: ["通常時はデカスタから震撼ジャッジメントが約1/59で発生し、役物チャレンジの成功率は約42%です。成功後は約1/9.9の高確率で図柄揃いを目指します。別ルートのG-CHARGEは約1/275です。", "シミュレーターは役物の物理的な動きを再現できないため、震撼ジャッジメント経由とG-CHARGEを合わせた実質大当り約1/229.95を初当り抽選に使用します。役物発生率と成功率は記事内の固定仕様として表示します。"] },
      { heading: "UG-RUSHとアルティメットチャージ", paragraphs: ["図柄揃い時のLT突入率は、初回約76.5%と時短120回の引き戻しを合わせて約82.6%。UG-RUSHは120回転、継続率は約76.2%です。", "RUSH中の大当りは50%でアルティメットチャージ。チャージ中は1500個から7500個までの振り分けがあるため、非突入の1500個と合算した出玉分布で抽選します。"] },
      { heading: "デカスタの固定条件", bullets: ["回転率は30.0回/1,000円のサイト固定体験値", "貸出は1,000円250玉、交換は100円28玉で固定", "特殊スタートのため実際の役物入賞や店舗調整とは一致しない", "平均投資は実質大当り約1/229.95を基準に表示"] }
    ],
    sources: [["ニューギン 公式スペック", "https://www.newgin.co.jp/pub/machine/egodzilla7_dekasuta/spec.html"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10562"]]
  },
  "smart-pachinko-gantz": {
    order: 38, type: "pachinko", theme: "gold", year: "2026年10月", maker: "オッケー.",
    name: "SMART-PACHINKO GANTZ", shortName: "SMART-PACHINKO GANTZ",
    catchcopy: "約1/319から、右打ちすべてがつながる超行って下ちいBONUSへ。",
    intro: "2026年10月5日導入のミドルLT機。初当りから行って下ちいチャレンジまたは直行ルートを経て、右打ち全体が一つのBONUSとして続く新しい出玉体験を簡易化しています。",
    points: ["通常時大当り約1/319", "右打ち突入率約66.7%", "超行って下ちいBONUSの平均期待出玉は約11,300個"],
    specs: [["大当り確率", "約1/319"], ["右打ち突入", "約66.7%"], ["直行振り分け", "約15%"], ["チャレンジ", "約51.7%"], ["BONUS終了", "約1/73.1"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.5, minSpins: 10, maxSpins: 30, rushLabel: "超行って下ちいBONUS", rushEntry: 0.667, rushContinue: 0.935, firstPayoutIn: 1500, firstPayoutOut: 300, rushPayouts: [[150, 0.65], [1500, 0.25], [3000, 0.10]] },
    articleSections: [
      { heading: "約1/319から右打ちへ", paragraphs: ["通常時の大当りは約1/319。初当りの約15%は超行って下ちいBONUS3000へ直行し、約51.7%は行って下ちいチャレンジへ進みます。右打ちへの合算突入率は約66.7%です。", "シミュレーターでは複数の入口を約66.7%の右打ち突入抽選へまとめ、非突入時は300個、突入時は初回1500個から開始します。初回3000個などの細かな振り分けはBONUS中の出玉抽選へまとめています。"] },
      { heading: "一つにつながるBONUS", paragraphs: ["右打ち中は150個の『行って下ちいBONUS』を重ね、∞ZONEや超行って下ちい3000を獲得しながら、終了抽選まで一つのBONUSとして出玉を伸ばします。公式掲載のBONUS終了確率は約1/73.1です。", "従来のST継続率へ単純変換できないため、簡易モデルでは平均期待出玉約11,300個へ近づくよう、継続と150個・1500個・3000個の振り分けをサイト固定値にしています。実機の小当り、V入賞、各特化ゾーン出現率は完全再現しません。"] },
      { heading: "固定条件と投資計算", bullets: ["回転率は17.5回/1,000円のサイト固定値", "貸出は1,000円250玉、交換は100円28玉で固定", "平均319回転までの投資目安を表示", "ランキングも全員同じ簡易BONUS条件で計算"] }
    ],
    sources: [["フィールズ 公式製品情報", "https://www.fields.biz/products/ps/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10580"]]
  },
  "paripi-koumei-slot": {
    order: 39, type: "slot", theme: "violet", year: "2026年10月", maker: "山佐ネクスト",
    name: "スマスロ パリピ孔明", shortName: "スマスロ パリピ孔明",
    catchcopy: "士気高揚ゾーンからParty Time、兵法書と上位STへ。",
    intro: "2026年10月5日導入のボーナス＋STタイプ。CZからボーナス、継続約73%のParty Time、兵法書獲得特化ゾーン、上位STまでを一つの流れに整理しました。",
    points: ["ボーナス初当りは設定1約1/309.9〜設定6約1/228.8", "CZは設定1約1/213.6〜設定6約1/171.7", "Party Time継続約73%、超Party Timeは約81%"],
    specs: [["初当り（設定1）", "約1/309.9"], ["初当り（設定6）", "約1/228.8"], ["CZ（設定1）", "約1/213.6"], ["CZ（設定6）", "約1/171.7"], ["ST継続", "約73%"], ["上位ST継続", "約81%"]],
    sim: { kind: "slot", triggerLabel: "士気高揚ゾーン", triggerRate: 213.6, triggerSuccess: 0.69, mainLabel: "Party Time", mainRate: 309.9, base50: 31.0, coinUnit: 3.3, normalMin: 180, normalMax: 980, specialLabel: "兵法書獲得特化ゾーン", specialChance: 0.35, specialMin: 120, specialMax: 720, upperChallenge: "臥龍転生", upperChance: 0.14, upperSuccess: 0.50, upperLabel: "超Party Time", upperContinue: 0.81, upperPayout: 420, settingRates: { 1: { trigger: 213.6, main: 309.9, payout: 0.976 }, 2: { trigger: 207.3, main: 299.6, payout: 0.989 }, 3: { trigger: 199.2, main: 280.0, payout: 1.014 }, 4: { trigger: 188.8, main: 262.0, payout: 1.045 }, 5: { trigger: 179.4, main: 243.9, payout: 1.090 }, 6: { trigger: 171.7, main: 228.8, payout: 1.136 } } },
    articleSections: [
      { heading: "CZからボーナス＋STへ", paragraphs: ["設定1のCZは約1/213.6、ボーナス初当りは約1/309.9。ボーナス当選後は15G＋αのST『Party Time』へ進み、継続率は約73%です。", "シミュレーターではCZと直撃を一つの入口へ整理し、CZ発生後のST突入率を公開されている初当り確率から求めた約69%の簡易値で抽選します。"] },
      { heading: "兵法書と上位ST", paragraphs: ["ST中は9種類の兵法書で性能を強化し、特化ゾーンや渋谷決戦BONUSを経て出玉を伸ばします。上位ST『超Party Time』は継続約81%、プレミアムST『究極孔明』は約91%です。", "簡易モデルは兵法書獲得を追加枚数、臥龍転生を上位チャレンジとして表現します。各特化ゾーンの発生率と成功率は、演出の順番を体験するためのサイト固定値です。"] },
      { heading: "設定1〜6のCZ・初当りを反映", paragraphs: ["設定1〜6を均等抽選し、設定別のCZ合算・ボーナス初当り・出玉率を使用します。設定は結果とランキングに表示します。", "兵法書や臥龍転生、上位STの設定差は公表値が確認できないため全設定共通です。"] },
      { heading: "固定条件とコンプリート", bullets: ["設定1はCZ約1/213.6・初当り約1/309.9", "設定6はCZ約1/171.7・初当り約1/228.8", "46枚貸し・5.2枚交換・31G/50枚で投資を計算", "獲得19,000枚へ達した場合はコンプリート表示"] }
    ],
    sources: [["山佐ネクスト 公式機種サイト", "https://yamasa-next.co.jp/slot/prskkm/"], ["スロプラNEXT 公式ページ", "https://www.yamasa-next.co.jp/slp/model/06"], ["パチマガスロマガFREE 機種情報", "https://pachimaga.com/free/mach/maker-s/yamasa/l_paripikoumei.php"]]
  },
  "my-juggler6": {
    order: 40, type: "slot", theme: "violet", year: "2026年10月", maker: "北電子",
    name: "マイジャグラーVI", shortName: "マイジャグラーVI",
    catchcopy: "次のBIG・REGまで進み、ボーナスごとに続行を判断。",
    intro: "2026年10月5日導入のノーマルタイプ。設定1〜6を均等抽選し、次のBIG・REGまで進めながら、ボーナスごとに続行か終了を選べます。上限は8,000Gです。",
    points: ["ボーナスごとに続ける・やめるを選択", "設定ごとの公式BIG・REG・出玉率を反映", "8,000G完走時だけランキングへ登録"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/273.1"], ["設定1 REG", "約1/409.6"], ["設定1合算", "約1/163.8"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 273.1, regRate: 409.6, combinedRate: 163.8, bigPayout: 240, regPayout: 96, payoutRate: 0.97, settingRates: { 1: { big: 273.1, reg: 409.6, payout: 0.970 }, 2: { big: 270.8, reg: 385.5, payout: 0.980 }, 3: { big: 266.4, reg: 336.1, payout: 0.999 }, 4: { big: 254.0, reg: 290.0, payout: 1.028 }, 5: { big: 240.1, reg: 268.6, payout: 1.053 }, 6: { big: 229.1, reg: 229.1, payout: 1.094 } }, base50: 42.0, coinUnit: 2.0, mainRate: 163.8, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "ボーナスごとに続行を判断", paragraphs: ["START時に設定1〜6を均等抽選し、次のBIG・REG当選までのゲーム数を表示します。設定は遊技中に伏せ、やめた時か8,000G到達時に発表します。", "途中終了はマイ記録へ保存し、8,000Gを完走した結果だけ機種別ランキングへ登録できます。"] },
      { heading: "差枚と収支の計算", paragraphs: ["差枚は抽選された設定の公式出玉率を基準に、今回のBIG・REG回数がその設定の理論回数からどれだけ上下したかを加えて計算します。BIGは約240枚、REGは約96枚として扱います。", "収支目安は差枚を5.2枚交換で円換算します。現金投資と持ちメダル再遊技の割合は人によって異なるため、AT機のような現金投資額は表示しません。"] },
      { heading: "設定別の見方", paragraphs: ["公式の合算確率は設定1の約1/163.8から設定6の約1/114.6まで変化します。特にREGは設定1の約1/409.6から設定6の約1/229.1まで差があります。", "このシミュレーターは設定判別や勝利を保証するものではありません。ぶどう確率、チェリー重複、打ち方、取りこぼし、店舗状況は再現していません。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/myjuggler6/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10513"], ["ハズセ 機種情報", "https://hazuse.com/machine/pachislot/5S0437/"]]
  },
  "neo-im-juggler": {
    order: 41, type: "slot", theme: "gold", year: "2025年9月", maker: "北電子",
    name: "ネオアイムジャグラーEX", shortName: "ネオアイムジャグラーEX",
    catchcopy: "王道ジャグラーを設定1〜6ランダム・8,000Gで比較。",
    intro: "ネオアイムジャグラーEXの公式設定別確率を使い、START時に設定1〜6を均等抽選してボーナスごとに続行を選びながら最大8,000Gまで抽選します。設定・BIG・REG・実績合算・差枚を最後に表示します。",
    points: ["設定1〜6を均等ランダム・最大8,000G", "設定ごとの公式BIG・REG・出玉率を反映", "46枚貸し・5.2枚交換、結果とランキングに設定を表示"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/273.1"], ["設定1 REG", "約1/439.8"], ["設定1合算", "約1/168.5"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 273.1, regRate: 439.8, combinedRate: 168.5, bigPayout: 252, regPayout: 96, payoutRate: 0.97, settingRates: { 1: { big: 273.1, reg: 439.8, payout: 0.970 }, 2: { big: 269.7, reg: 399.6, payout: 0.980 }, 3: { big: 269.7, reg: 331.0, payout: 0.995 }, 4: { big: 259.0, reg: 315.1, payout: 1.011 }, 5: { big: 259.0, reg: 255.0, payout: 1.033 }, 6: { big: 255.0, reg: 255.0, payout: 1.055 } }, base50: 40.0, coinUnit: 2.0, mainRate: 168.5, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "設定1〜6ランダム・最大8,000G実戦", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定の公式BIG・REG確率で8,000Gを抽選します。設定は最終結果まで表示しません。", "設定ごとのボーナス回数と実績合算の違いを、同じ8,000G条件で比較できます。"] },
      { heading: "差枚と収支の見方", paragraphs: ["抽選された設定の公式出玉率を基準に、今回のBIG・REG回数が理論回数からどれだけ上下したかを差枚へ反映します。", "収支目安は46枚貸し・5.2枚交換で円換算します。実店舗の再プレイ条件、持ちメダル比率、取りこぼしは再現しません。"] },
      { heading: "設定差を見るポイント", paragraphs: ["公式値では設定1の合算約1/168.5に対し、設定6は約1/127.5です。REGは設定1約1/439.8、設定6約1/255.0と差があります。", "1回の8,000Gだけで設定を断定するものではなく、確率のぶれを体験するための簡易モデルです。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/neoimjugglerex/"]]
  },
  "gogo-juggler3": {
    order: 42, type: "slot", theme: "aqua", year: "2023年7月", maker: "北電子",
    name: "ゴーゴージャグラー3", shortName: "ゴージャグ3",
    catchcopy: "設定1〜6をランダム抽選。8,000Gで当りの違いを見る。",
    intro: "ゴーゴージャグラー3の公式設定別確率を使い、設定1〜6を均等抽選する最大8,000Gシミュレーターです。BIG・REG・実績合算・差枚と設定を最後に表示します。",
    points: ["設定1〜6を均等ランダム・最大8,000G", "設定ごとの公式BIG・REG・出玉率を反映", "46枚貸し・5.2枚交換、結果とランキングに設定を表示"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/259.0"], ["設定1 REG", "約1/354.2"], ["設定1合算", "約1/149.6"], ["設定1出玉率", "97.2%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 259.0, regRate: 354.2, combinedRate: 149.6, bigPayout: 240, regPayout: 96, payoutRate: 0.972, settingRates: { 1: { big: 259.0, reg: 354.2, payout: 0.972 }, 2: { big: 258.0, reg: 332.7, payout: 0.982 }, 3: { big: 257.0, reg: 306.2, payout: 0.994 }, 4: { big: 254.0, reg: 268.6, payout: 1.016 }, 5: { big: 247.3, reg: 247.3, payout: 1.038 }, 6: { big: 234.9, reg: 234.9, payout: 1.065 } }, base50: 40.0, coinUnit: 2.0, mainRate: 149.6, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "設定1でも合算約1/149.6", paragraphs: ["設定1のBIGは約1/259.0、REGは約1/354.2、合算は約1/149.6です。8,000Gでは理論上約53.5回のボーナスが目安になります。", "シミュレーターは1ゲームずつ抽選するため、理論回数に近い場合も、大きく上下する場合もあります。"] },
      { heading: "BIG・REGの偏りを比較", paragraphs: ["合算が良くてもBIGへ偏る場合、REGへ偏る場合で差枚は変わります。結果画面ではそれぞれの実績確率を別々に表示します。", "差枚は抽選された設定の公式出玉率と、その設定におけるボーナス理論回数との差を組み合わせて算出します。"] },
      { heading: "設定別の公式値", paragraphs: ["公式合算は設定1約1/149.6から設定6約1/117.4まで変化します。設定6ではBIG・REGがともに約1/234.9です。", "ぶどう、小役重複、告知タイミング、取りこぼしは簡易モデルの対象外です。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/gogojuggler3/"]]
  },
  "funky-juggler2": {
    order: 43, type: "slot", theme: "crimson", year: "2021年10月", maker: "北電子",
    name: "ファンキージャグラー2", shortName: "ファンキー2",
    catchcopy: "設定1〜6をランダム抽選。8,000Gの結果で設定を発表。",
    intro: "ファンキージャグラー2の公式設定別確率を使い、設定1〜6を均等抽選してボーナスごとに続行を選びながら最大8,000Gまで抽選します。BIG・REG・合算・差枚と設定を最後に表示します。",
    points: ["設定1〜6を均等ランダム・最大8,000G", "設定ごとの公式BIG・REG・出玉率を反映", "46枚貸し・5.2枚交換、結果とランキングに設定を表示"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/266.4"], ["設定1 REG", "約1/439.8"], ["設定1合算", "約1/165.9"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 266.4, regRate: 439.8, combinedRate: 165.9, bigPayout: 240, regPayout: 96, payoutRate: 0.97, settingRates: { 1: { big: 266.4, reg: 439.8, payout: 0.970 }, 2: { big: 259.0, reg: 407.1, payout: 0.985 }, 3: { big: 256.0, reg: 366.1, payout: 0.998 }, 4: { big: 249.2, reg: 322.8, payout: 1.020 }, 5: { big: 240.1, reg: 299.3, payout: 1.043 }, 6: { big: 219.9, reg: 262.1, payout: 1.090 } }, base50: 40.0, coinUnit: 2.0, mainRate: 165.9, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "設定1〜6ランダム・最大8,000G", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定の公式BIG・REG確率で8,000Gを抽選します。設定は結果画面で発表します。", "設定1ならBIG約30.0回・REG約18.2回が理論目安ですが、設定と確率のぶれで毎回の結果が変わります。"] },
      { heading: "ファンキー2の差枚計算", paragraphs: ["抽選された設定の公式出玉率を基準に、BIG約240枚・REG約96枚としてボーナス回数の上下を差枚へ反映します。", "表示する収支は5.2枚交換で差枚を換算した比較値です。実店舗の現金投資額を示すものではありません。"] },
      { heading: "高設定域との違い", paragraphs: ["公式合算は設定1約1/165.9から設定6約1/119.6まで変化し、設定6の出玉率は109.0%です。", "シミュレーターは設定1〜6を均等抽選します。設定判別や勝利を保証せず、確率の幅を比較する用途に限定しています。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/funkyjuggler2/"]]
  },
  "oumi5-agnes": {
    order: 8.3, type: "pachinko", theme: "ocean", year: "2023年7月", maker: "三洋物産", updated: "2026-11-01",
    name: "PA大海物語5 Withアグネス・ラム", shortName: "大海5 アグネス",
    catchcopy: "ST10回＋時短から、約80.5%のハピネスチャンスへ。",
    intro: "全国設置上位の甘海。約1/99.9の初当り、ST10回と時短25・50・120回、10R後のハピネスチャンスを代表値で簡易体験できます。",
    points: ["大当り約1/99.9・ST突入100%", "電サポ25・50・120回", "10R後のハピネスチャンス継続約80.5%"],
    specs: [["大当り", "約1/99.9"], ["ST中", "約1/19.5"], ["ST突入", "100%"], ["ST回数", "10回"], ["電サポ", "25・50・120回"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.5, minSpins: 10, maxSpins: 35, rushLabel: "ST＋時短", rushEntry: 1, rushContinue: 0.583, firstPayoutIn: 432, firstPayoutOut: 432, rushPayouts: [[432, 0.36], [648, 0.60], [1080, 0.04]], upperLabel: "ハピネスチャンス", upperDirectChance: 0, upperUpgradeChance: 0.04, upperContinue: 0.805 },
    articleSections: [
      { heading: "甘海の王道にハピネスチャンス", paragraphs: ["全ての大当り後にST10回へ入り、その後は振り分けに応じて時短15・40・110回が付きます。", "10R後は電サポ120回のハピネスチャンスへ進み、継続期待度は約80.5%です。"] },
      { heading: "代表継続率で簡易化", paragraphs: ["通常の電サポ25回は継続約49%、50回は約61%、120回は約80.5%です。サイトでは初回振り分けを加重した約58.3%を通常継続の代表値にしています。", "遊タイム、保留、内部状態は個別再現せず、初当りと連チャンの幅を比べる固定モデルです。"] }
    ],
    sources: [["SANYO 公式発表", "https://www.sanyobussan.co.jp/information/pdf/sanyo_press_release_20230414_3.pdf"], ["SANYO 公式サイト", "https://www.sanyobussan.co.jp/"]]
  },
  "oumi5-special": {
    order: 8.4, type: "pachinko", theme: "ocean", year: "2024年11月", maker: "三洋物産", updated: "2026-11-01",
    name: "P大海物語5スペシャル", shortName: "大海5スペシャル",
    catchcopy: "ALL1500個。54%確変と時短100・200回の王道ループ。",
    intro: "全国設置上位の王道ミドル。約1/319.6、確変54%、通常後の時短100回とBIGアシスト時短200回を代表継続率で簡易体験できます。",
    points: ["大当り約1/319.6・確変54%", "全大当り約1500個", "通常後は時短100回、時短中通常後は200回"],
    specs: [["大当り", "約1/319.6"], ["確変中", "約1/31.9"], ["確変割合", "54%"], ["時短", "100・200回"], ["出玉", "ALL約1500個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.2, minSpins: 10, maxSpins: 30, rushLabel: "確変＋時短", rushEntry: 0.664, rushContinue: 0.664, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 1]] },
    articleSections: [
      { heading: "確変54%と時短引き戻し", paragraphs: ["大当りは全て約1500個。54%なら次回までの確変、46%なら時短100回へ進みます。", "確変と時短100回の引き戻しを合わせた初回継続期待を約66.4%の代表値として抽選します。"] },
      { heading: "BIGアシストと遊タイム", paragraphs: ["時短中・遊タイム中の通常大当り後は時短200回となるBIGアシストを搭載しています。", "遊タイム350回と時短状態の遷移は記事で補足し、シミュレーターでは王道ループの比較へ簡略化します。"] }
    ],
    sources: [["SANYO 公式機種情報", "https://www.sanyobussan.co.jp/products/pk_bigsea5_special/"], ["SANYO 公式ガイドブック", "https://www.sanyobussan.co.jp/products/pk_bigsea5_special/p_bigsea5_special_guidebook.pdf"]]
  },
  "hokuto11-boukyousei": {
    order: 8.1, type: "pachinko", theme: "flame", year: "2025年12月", maker: "サミー", updated: "2026-11-01",
    name: "e 北斗の拳11 暴凶星", shortName: "北斗11 暴凶星",
    catchcopy: "約61%でRUSHへ。右打ちの約半分が4500個以上。",
    intro: "全国設置上位のスマパチLT。図柄揃い等約1/399.8、RUSH突入約61%、継続約75%と1500〜6000個の出玉振り分けを簡易体験できます。",
    points: ["図柄揃い等約1/399.8", "RUSH突入約61%・継続約75%", "RUSH中の約50%が4500個以上"],
    specs: [["図柄揃い等", "約1/399.8"], ["RUSH中", "約1/10.7"], ["RUSH突入", "約61%"], ["RUSH継続", "約75%"], ["ST", "10回＋残保留4"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 399.8, hitLabel: "図柄揃い等", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "拳王／救世主RUSH", rushEntry: 0.61, rushContinue: 0.75, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.375], [4500, 0.50], [6000, 0.125]] },
    articleSections: [
      { heading: "短いSTに大出玉を集約", paragraphs: ["初当りの約61%でST10回＋残保留4個のRUSHへ進み、C時短を含む継続率は約75%です。", "右打ち中は1500個・4500個・6000個とSTリセットがあり、出玉当りの約半分が4500個以上です。"] },
      { heading: "STリセットを継続率へ統合", paragraphs: ["出玉を伴わないSTリセット約20%は約75%の継続率に含め、出玉振り分けは出玉当りだけで再配分しています。", "極闘による最大12000個の詳細ループは完全再現せず、通常RUSHの結果比較へ絞ります。"] }
    ],
    sources: [["Sammy 公式製品情報", "https://www.sammy.co.jp/japanese/product/pachinko/hok_ke11/"], ["Sammy 公式発表", "https://new.sammy.co.jp/japanese/news/detail/?id=238"]]
  },
  "fever-kinnikuman": {
    order: 8.2, type: "pachinko", theme: "gold", year: "2026年4月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバーキン肉マン", shortName: "eFキン肉マン",
    catchcopy: "約51%で超人バトルへ。1500〜7500個のラウンドバトル。",
    intro: "全国設置上位のスマパチLT。図柄揃い約1/399.9、RUSH突入約51%、継続約77%と1500〜7500個の出玉差を簡易体験できます。",
    points: ["図柄揃い約1/399.9", "RUSH突入約51%・継続約77%", "右打ちは1500〜7500個"],
    specs: [["図柄揃い", "約1/399.9"], ["大当り", "約1/349.9"], ["RUSH突入", "約51%"], ["RUSH継続", "約77%"], ["ST", "145回"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "超人バトルRUSH", rushEntry: 0.51, rushContinue: 0.77, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.45], [3000, 0.25], [4500, 0.16], [6000, 0.09], [7500, 0.05]] },
    articleSections: [
      { heading: "超人バトルスペック", paragraphs: ["図柄揃い約1/399.9からトータル約51%でRUSHへ進みます。RUSHはST145回で、C時短を含む継続率は約77%です。", "RUSH中はラウンドバトルで1500〜7500個の出玉が決まります。"] },
      { heading: "代表出玉分布で簡易抽選", paragraphs: ["公式に案内される出玉範囲を5段階へまとめ、継続抽選と別に出玉を抽選します。", "出玉を伴わないSTリセットや各モードの演出差は、約77%のトータル継続へまとめています。"] }
    ],
    sources: [["SANKYOオンライン博物館", "https://www.sankyo-fever.jp/collection/993/"], ["SANKYO 公式発表", "https://www.sankyo-fever.co.jp/corporate/modify/IR/Timely/files/press_20260114.pdf"]]
  },
  "happy-juggler-v3": {
    order: 8.5, type: "slot", theme: "gold", year: "2022年10月", maker: "北電子", updated: "2026-11-01",
    name: "ハッピージャグラーV III", shortName: "ハッピーV III",
    catchcopy: "設定1〜6ランダム。全国設置上位ジャグラーを最大8,000G実戦。",
    intro: "全国設置上位のジャグラー。START時に設定1〜6を均等抽選し、ボーナスごとに続行を選びながら最大8,000Gまで抽選してBIG・REG・合算・差枚・設定を最後に表示します。",
    points: ["設定1〜6均等ランダム", "最大8,000G", "公式BIG・REG・出玉率を設定別に反映"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/273.1"], ["設定1 REG", "約1/397.2"], ["設定1合算", "約1/161.8"], ["設定1出玉率", "97.6%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 273.1, regRate: 397.2, combinedRate: 161.8, bigPayout: 240, regPayout: 96, payoutRate: 0.976, settingRates: { 1: { big: 273.1, reg: 397.2, payout: 0.976 }, 2: { big: 270.8, reg: 362.1, payout: 0.987 }, 3: { big: 263.2, reg: 332.7, payout: 1.005 }, 4: { big: 254.0, reg: 300.6, payout: 1.035 }, 5: { big: 239.2, reg: 273.1, payout: 1.065 }, 6: { big: 226.0, reg: 256.0, payout: 1.091 } }, base50: 40.0, coinUnit: 2.0, mainRate: 161.8, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [{ heading: "設定1〜6を8,000Gで比較", paragraphs: ["公式BIG・REG確率と出玉率を設定ごとに使用し、設定は最終結果まで伏せます。", "設定1の合算約1/161.8から設定6の約1/120.0まで、同じ8,000G条件で結果の幅を比較できます。"] }],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/products/2022/hjv3/index.html"]]
  },
  "magia-record-slot": {
    order: 8.6, type: "slot", theme: "sakura", year: "2025年4月", maker: "ミズホ", updated: "2026-11-01",
    name: "スマスロ マギアレコード 魔法少女まどか☆マギカ外伝", shortName: "スマスロ マギレコ",
    catchcopy: "ボーナスからマギアラッシュ、マギアアタックの上乗せへ。",
    intro: "全国設置上位のスマスロ。ボーナス初当り、AT『マギアラッシュ』、マギアアタック、エンブリオ・イブ覚醒の流れを簡易体験できます。",
    points: ["設定1ボーナス約1/240.6・AT約1/654.6", "約32.6G/50枚・純増約2.6枚/G", "設定1〜6ランダム"],
    specs: [["ボーナス（設定1）", "約1/240.6"], ["AT（設定1）", "約1/654.6"], ["ベース", "約32.6G/50枚"], ["コイン単価", "約3.2円"], ["AT純増", "約2.6枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "マギアボーナス", triggerRate: 240.6, triggerSuccess: 0.368, mainLabel: "マギアラッシュ", mainRate: 654.6, base50: 32.6, coinUnit: 3.2, normalMin: 260, normalMax: 1100, specialLabel: "マギアアタック", specialChance: 0.38, specialMin: 150, specialMax: 900, upperChallenge: "エンブリオ・イブ覚醒", upperChance: 0.16, upperSuccess: 0.50, upperLabel: "裏マギアアタック", upperContinue: 0.80, upperPayout: 520, settingRates: { 1: { trigger: 240.6, main: 654.6, payout: 0.976 }, 2: { trigger: 236.1, main: 633.4, payout: 0.989 }, 3: { trigger: 222.8, main: 571.8, payout: 1.020 }, 4: { trigger: 208.5, main: 516.6, payout: 1.060 }, 5: { trigger: 195.1, main: 456.5, payout: 1.104 }, 6: { trigger: 184.3, main: 416.7, payout: 1.149 } } },
    articleSections: [{ heading: "ボーナスとATの設定差を反映", paragraphs: ["設定1〜6を均等抽選し、公開されているボーナス・AT初当りを設定別に使用します。", "特化ゾーンの非公表設定差は加えず、32.6G/50枚・46枚貸し・5.2枚交換で固定します。"] }],
    sources: [["ユニバーサル公式製品情報", "https://www.universal-777.com/product/slot/magireco/"], ["ユニバーサル公式サイト", "https://www.universal-777.com/"]]
  },
  "god-eater-resurrection": {
    order: 8.7, type: "slot", theme: "crimson", year: "2024年7月", maker: "セブンリーグ", updated: "2026-11-01",
    name: "スマスロ ゴッドイーター リザレクション", shortName: "スマスロ ゴッドイーター",
    catchcopy: "アラガミ交戦を勝ち抜き、純増約9枚の報酬を重ねる。",
    intro: "全国設置上位の高純増スマスロ。AT『アラガミバースト』、アラガミ交戦、神堕の出玉ルートを固定条件で簡易体験できます。",
    points: ["設定1 AT初当り約1/351.9", "約31G/50枚・純増約9.0枚/G", "設定1〜6ランダム"],
    specs: [["AT（設定1）", "約1/351.9"], ["AT（設定6）", "約1/290.3"], ["ベース", "約31G/50枚"], ["コイン単価", "約3.4円"], ["AT純増", "約9.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "アラガミ交戦", triggerRate: 351.9, triggerSuccess: 1, mainLabel: "アラガミバースト", mainRate: 351.9, base50: 31.0, coinUnit: 3.4, normalMin: 300, normalMax: 1200, specialLabel: "リザレクションゲート", specialChance: 0.34, specialMin: 180, specialMax: 1000, upperChallenge: "神堕チャレンジ", upperChance: 0.13, upperSuccess: 0.50, upperLabel: "神堕", upperContinue: 0.90, upperPayout: 510, settingRates: { 1: { trigger: 351.9, main: 351.9, payout: 0.979 }, 2: { trigger: 344.5, main: 344.5, payout: 0.989 }, 3: { trigger: 330.1, main: 330.1, payout: 1.011 }, 4: { trigger: 317.0, main: 317.0, payout: 1.056 }, 5: { trigger: 302.2, main: 302.2, payout: 1.100 }, 6: { trigger: 290.3, main: 290.3, payout: 1.149 } } },
    articleSections: [{ heading: "高純増ATとST型バトル", paragraphs: ["ATはストーリーパート、25G＋αのアラガミ交戦、報酬パートを繰り返します。", "設定1〜6のAT初当りを反映し、神堕などの上位契機は全設定共通のサイト固定値で簡易化します。"] }],
    sources: [["山佐ネクスト／セブンリーグ 公式機種サイト", "https://www1.yamasa.co.jp/rsgdet/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10086"]]
  },
  "okidoki-black": {
    order: 8.8, type: "slot", theme: "violet", year: "2024年7月", maker: "ミズホ", updated: "2026-11-01",
    name: "沖ドキ！BLACK", shortName: "沖ドキ！BLACK",
    catchcopy: "ハイビスカス点灯から、32G以内の天国ループへ。",
    intro: "全国設置上位の沖スロ。ボーナス初当り、BIG・REG、天国、ドキドキ・超ドキドキモードの連チャンを簡易体験できます。",
    points: ["設定1初当り約1/288.7", "約32G/50枚・純増約3.5枚/G", "実機どおり設定1・2・3・5・6から抽選"],
    specs: [["初当り（設定1）", "約1/288.7"], ["初当り（設定6）", "約1/243.1"], ["ベース", "約32G/50枚"], ["コイン単価", "約3.3円"], ["純増", "約3.5枚/G"], ["BIG／REG", "約210／90枚"]],
    sim: { kind: "slot", triggerLabel: "ボーナス初当り", triggerRate: 288.7, triggerSuccess: 1, mainLabel: "天国モード", mainRate: 288.7, base50: 32.0, coinUnit: 3.3, normalMin: 90, normalMax: 700, specialLabel: "1G連", specialChance: 0.28, specialMin: 90, specialMax: 630, upperChallenge: "ドキドキモード", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "超ドキドキモード", upperContinue: 0.90, upperPayout: 300, settingPool: [1, 2, 3, 5, 6], settingRates: { 1: { trigger: 288.7, main: 288.7, payout: 0.972 }, 2: { trigger: 277.9, main: 277.9, payout: 0.987 }, 3: { trigger: 265.8, main: 265.8, payout: 1.019 }, 5: { trigger: 254.1, main: 254.1, payout: 1.048 }, 6: { trigger: 243.1, main: 243.1, payout: 1.086 } } },
    articleSections: [{ heading: "実機の5段階設定を使用", paragraphs: ["設定1・2・3・5・6から均等抽選し、設定別のボーナス初当りと出玉率を反映します。", "天国以上の移行率は公開値を完全再現せず、ボーナス後32G以内の連チャンを体験する固定モデルです。"] }],
    sources: [["ユニバーサル公式製品情報", "https://www.universal-777.com/product/slot/okidoki_black/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10051"]]
  },
  "oumi5-black": {
    order: 8.9, type: "pachinko", theme: "ocean", year: "2023年12月", maker: "三洋物産", updated: "2026-11-01",
    name: "P大海物語5 ブラック", shortName: "大海5 ブラック",
    catchcopy: "約1/199.8、ST突入100%。GOLDパールRUSHで約87.3%継続へ。",
    intro: "全国設置上位の大海ブラック。全初当りからSTへ入り、通常ST約71.1%とGOLDパールRUSH約87.3%の二段階を簡易体験できます。",
    points: ["大当り約1/199.8・ST突入100%", "通常ST継続約71.1%", "GOLDパールRUSH継続約87.3%"],
    specs: [["大当り", "約1/199.8"], ["右打ち", "約1/44.0"], ["ST突入", "100%"], ["トータル継続", "約74%"], ["出玉", "約450・1500個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 199.8, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.3, minSpins: 10, maxSpins: 30, rushLabel: "ブラックパールRUSH", rushEntry: 1, rushContinue: 0.711, firstPayoutIn: 450, firstPayoutOut: 450, rushPayouts: [[450, 0.50], [1500, 0.50]], upperLabel: "GOLDパールRUSH", upperDirectChance: 0, upperUpgradeChance: 0.04, upperContinue: 0.873 },
    articleSections: [
      { heading: "100%STから上位RUSHを目指す", paragraphs: ["初当り後は必ずSTへ入り、50回＋残保留4個のブラックパールRUSHへ進みます。", "RUSH中の大当りの一部で86回＋残保留4個、継続約87.3%のGOLDパールRUSHへ移行します。"] },
      { heading: "二段階STを代表値で体験", paragraphs: ["通常STは継続約71.1%、上位STは約87.3%として別々に抽選します。", "保留、遊技中の玉減り、細かな移行契機は再現せず、固定17.3回/1,000円で結果を比較します。"] }
    ],
    sources: [["SANYO 公式ガイドブック", "https://www.sanyobussan.co.jp/products/pk_bigsea5_black/pk_bigsea5_black_guidebook_PC.pdf"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9916"]]
  },
  "sea-story-3r3": {
    order: 9.0, type: "pachinko", theme: "aqua", year: "2025年6月", maker: "三洋物産", updated: "2026-11-01",
    name: "PA海物語3R3", shortName: "海物語3R3",
    catchcopy: "約1/99.9。確変51%と時短40回で、遊びやすい海のループタイプ。",
    intro: "約1/99.9の甘デジ海物語。51%の次回確変と通常大当り後の時短40回を、合算継続約68.5%の代表値で簡易体験できます。",
    points: ["大当り約1/99.9", "確変割合51%・次回まで", "通常後は時短40回"],
    specs: [["大当り", "約1/99.9"], ["確変中", "約1/16.9"], ["確変割合", "51%"], ["時短", "40回"], ["出玉", "約500・1000個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.0, minSpins: 10, maxSpins: 35, rushLabel: "確変＋時短", rushEntry: 0.685, rushContinue: 0.685, firstPayoutIn: 500, firstPayoutOut: 500, rushPayouts: [[500, 0.95], [1000, 0.05]] },
    articleSections: [
      { heading: "51%確変と時短40回", paragraphs: ["大当りの51%は次回までの確変、通常大当り後は時短40回へ進みます。", "確変と時短引き戻しを合わせ、連チャン期待を約68.5%の代表値へまとめています。"] },
      { heading: "甘デジ海を固定条件で比較", paragraphs: ["出玉は5R約500個と10R約1000個を振り分け、18.0回/1,000円で投資を計算します。", "電サポ中の玉増減や保留は再現しない娯楽用の簡易モデルです。"] }
    ],
    sources: [["SANYO 公式ガイドブック", "https://www.sanyobussan.co.jp/products/pk_sea_3R3/pk_sea_3R3_guidebook_PC.pdf"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10257"]]
  },
  "shinumi-story": {
    order: 9.1, type: "pachinko", theme: "ocean", year: "2022年10月", maker: "三洋物産", updated: "2026-11-01",
    name: "PA新海物語", shortName: "PA新海物語",
    catchcopy: "約1/99.9・ST突入100%。サポートタイムで当りをつなぐ甘海。",
    intro: "約1/99.9の初当り後は全てST5回へ。時短25・50・683回と10R約1000個を代表振り分けで簡易体験できます。",
    points: ["大当り約1/99.9・ST突入100%", "ST5回＋時短", "10Rは約1000個"],
    specs: [["大当り", "約1/99.9"], ["ST中", "約1/9.9"], ["ST突入", "100%"], ["ST", "5回"], ["電サポ", "25・50・683回"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.0, minSpins: 10, maxSpins: 35, rushLabel: "ST＋時短", rushEntry: 1, rushContinue: 0.63, firstPayoutIn: 500, firstPayoutOut: 500, rushPayouts: [[500, 0.96], [1000, 0.04]] },
    articleSections: [
      { heading: "ST5回とサポートタイム", paragraphs: ["全大当り後にST5回へ入り、その後は振り分けに応じた時短が付きます。", "大当りとC時短を含む遊技の流れを、平均連チャン約2.7回から継続約63%の代表値へ簡略化しています。"] },
      { heading: "新海の遊びやすさを比較", paragraphs: ["出玉は5R約500個を中心に、10R約1000個を約4%で抽選します。", "C時短の個別抽選、遊タイム、保留は記事で補足し、シミュレーターでは連チャン結果へまとめます。"] }
    ],
    sources: [["SANYO 公式製品情報", "https://www.sanyobussan.co.jp/products/pk_shinumi/"], ["SANYO 公式発表", "https://www.sanyobussan.co.jp/information/pdf/sanyo_press_release_20220603.pdf"]]
  },
  "bakemonogatari-oni99": {
    order: 9.2, type: "pachinko", theme: "violet", year: "2026年6月", maker: "サミー", updated: "2026-11-01",
    name: "e 化物語 鬼99ver.", shortName: "化物語 鬼99ver.",
    catchcopy: "約1/99.9から突破を重ね、約79%継続・右打ち1500個へ。",
    intro: "甘デジ帯から上位RUSHを目指すスマパチ。約50%の血闘ノ刻、突破約26%、上位継続約79%と右打ち1500個を簡易体験できます。",
    points: ["大当り約1/99.9", "血闘ノ刻突入約50%・突破約26%", "上位RUSH継続約79%"],
    specs: [["大当り", "約1/99.9"], ["右打ち", "約1/17.3"], ["血闘ノ刻", "約50%"], ["突破期待", "約26%"], ["上位継続", "約79%"], ["右打ち出玉", "約1500個以上"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.2, minSpins: 10, maxSpins: 35, rushLabel: "血闘ノ刻", rushEntry: 0.501, rushContinue: 0.26, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 1]], upperLabel: "特別ノ刻", upperDirectChance: 0.001, upperUpgradeChance: 1, upperContinue: 0.79 },
    articleSections: [
      { heading: "甘デジから上位RUSHへ", paragraphs: ["初当り後は約50%で血闘ノ刻へ入り、右打ち中の大当りを引けば特別ノ刻へ進みます。", "特別ノ刻は22回＋残保留4個、トータル継続約79%として抽選します。"] },
      { heading: "右打ち1500個を簡易表現", paragraphs: ["右打ち大当りは約1500個を基本とし、上乗せループの詳細は個別に再現していません。", "18.2回/1,000円の固定条件で、初当り・突破・上位継続の三段階を比較するモデルです。"] }
    ],
    sources: [["Sammy 公式発表", "https://new.sammy.co.jp/japanese/news/detail/?id=271"], ["Sammy 公式サイト", "https://www.sammy.co.jp/"]]
  },
  "im-juggler-ex": {
    order: 9.3, type: "slot", theme: "gold", year: "2020年12月", maker: "北電子", updated: "2026-11-01",
    name: "アイムジャグラーEX", shortName: "アイムジャグラーEX",
    catchcopy: "王道アイムを設定1〜6ランダム・最大8,000Gで比較。",
    intro: "長期設置の定番ジャグラー。START時に設定1〜6を均等抽選し、公式BIG・REG確率でボーナスごとに続行を選びながら最大8,000Gまで抽選します。",
    points: ["設定1〜6均等ランダム", "最大8,000G", "公式BIG・REG・出玉率を設定別に反映"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/273.1"], ["設定1 REG", "約1/439.8"], ["設定1合算", "約1/168.5"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 273.1, regRate: 439.8, combinedRate: 168.5, bigPayout: 252, regPayout: 96, payoutRate: 0.970, settingRates: { 1: { big: 273.1, reg: 439.8, payout: 0.970 }, 2: { big: 269.7, reg: 399.6, payout: 0.980 }, 3: { big: 269.7, reg: 331.0, payout: 0.995 }, 4: { big: 259.0, reg: 315.1, payout: 1.011 }, 5: { big: 259.0, reg: 255.0, payout: 1.033 }, 6: { big: 255.0, reg: 255.0, payout: 1.055 } }, base50: 40.0, coinUnit: 2.0, mainRate: 168.5, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "王道アイムを最大8,000G実戦", paragraphs: ["設定1〜6を均等抽選し、公式BIG・REG確率で1ゲームずつ8,000Gを抽選します。", "設定は最後に発表し、BIG・REG・実績合算・差枚と一緒に記録とランキングへ残します。"] },
      { heading: "ネオアイムとは別機種で記録", paragraphs: ["設定別数値は同系統でも、2025年登場のネオアイムとは別ページ・別ランキングです。", "ぶどう、小役重複、取りこぼしは再現しない確率比較用モデルです。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/imjugglerex2020/"]]
  },
  "juggler-girls-ss": {
    order: 9.4, type: "slot", theme: "sakura", year: "2024年4月", maker: "北電子", updated: "2026-11-01",
    name: "ジャグラーガールズSS", shortName: "ジャグラーガールズSS",
    catchcopy: "最大8,000Gで、設定1〜6のBIG・REGと差枚を比較。",
    intro: "ジャグラーガールズSSの公式設定別確率を使い、設定1〜6を均等抽選する最大8,000Gシミュレーターです。",
    points: ["設定1〜6均等ランダム", "最大8,000G", "設定6合算約1/119.2"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/273.1"], ["設定1 REG", "約1/381.0"], ["設定1合算", "約1/159.1"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 273.1, regRate: 381.0, combinedRate: 159.1, bigPayout: 240, regPayout: 96, payoutRate: 0.970, settingRates: { 1: { big: 273.1, reg: 381.0, payout: 0.970 }, 2: { big: 270.8, reg: 350.5, payout: 0.979 }, 3: { big: 260.1, reg: 316.6, payout: 0.999 }, 4: { big: 250.1, reg: 281.3, payout: 1.021 }, 5: { big: 243.6, reg: 270.8, payout: 1.040 }, 6: { big: 226.0, reg: 252.1, payout: 1.075 } }, base50: 40.0, coinUnit: 2.0, mainRate: 159.1, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "BIG・REGの設定差を比較", paragraphs: ["設定1の合算約1/159.1から設定6の約1/119.2まで、同じ8,000G条件で比較します。", "結果では抽選設定とボーナス回数を発表し、機種専用ランキングへ登録できます。"] },
      { heading: "固定レートの差枚モデル", paragraphs: ["BIG約240枚・REG約96枚と公式出玉率を使い、46枚貸し・5.2枚交換で収支目安を表示します。", "実店舗の持ちメダル、再プレイ、取りこぼしは対象外です。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/jugglergirlsss/"]]
  },
  "fire-force2-slot": {
    order: 9.5, type: "slot", theme: "flame", year: "2026年2月", maker: "SANKYO", updated: "2026-11-01",
    name: "Lパチスロ 炎炎ノ消防隊2", shortName: "スマスロ 炎炎2",
    catchcopy: "BONUSから炎炎激闘、森羅万象、アドラバーストへ。",
    intro: "全国設置上位のスマスロ。BONUS初当り、炎炎激闘、灰焔騎士団、森羅万象からアドラバーストへ進む流れを簡易体験できます。",
    points: ["設定1初当り約1/272", "約33G/50枚・純増約5.8枚/G", "設定1〜6ランダム"],
    specs: [["初当り（設定1）", "約1/272"], ["初当り（設定6）", "約1/227"], ["ベース", "約33G/50枚"], ["コイン単価", "約3.6円"], ["AT純増", "約5.8枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "炎炎BONUS", triggerRate: 272.0, triggerSuccess: 0.58, mainLabel: "炎炎激闘", mainRate: 272.0, base50: 33.0, coinUnit: 3.6, normalMin: 220, normalMax: 1000, specialLabel: "灰焔騎士団", specialChance: 0.36, specialMin: 160, specialMax: 900, upperChallenge: "森羅万象", upperChance: 0.16, upperSuccess: 0.50, upperLabel: "アドラバースト", upperContinue: 0.82, upperPayout: 520, settingRates: { 1: { trigger: 272.0, main: 272.0, payout: 0.977 }, 2: { trigger: 269.0, main: 269.0, payout: 0.988 }, 3: { trigger: 257.0, main: 257.0, payout: 1.012 }, 4: { trigger: 242.0, main: 242.0, payout: 1.056 }, 5: { trigger: 236.0, main: 236.0, payout: 1.102 }, 6: { trigger: 227.0, main: 227.0, payout: 1.149 } } },
    articleSections: [
      { heading: "BONUSから炎炎激闘へ", paragraphs: ["設定1〜6を均等抽選し、設定別のBONUS初当りと出玉率を使用します。", "灰焔騎士団などの特化ゾーンと上位契機は、公表されていない設定差を加えず全設定共通です。"] },
      { heading: "高純増ATを簡易体験", paragraphs: ["約33G/50枚、46枚貸し・5.2枚交換で投資と収支を計算します。", "全小役、内部状態、有利区間は再現せず、上位到達前後の出玉差を比較するモデルです。"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/sbh/spec/"], ["SANKYO 公式サイト", "https://www.sankyo-fever.jp/"]]
  },
  "okidoki-gold": {
    order: 9.6, type: "slot", theme: "gold", year: "2022年12月", maker: "ミズホ", updated: "2026-11-01",
    name: "沖ドキ！GOLD", shortName: "沖ドキ！GOLD",
    catchcopy: "ハイビスカス点灯から天国、金ドキ、超ドキドキへ。",
    intro: "定番の沖スロ。ボーナス初当り、32G以内の天国連、金ドキ・ドキドキ・超ドキドキの出玉ルートを簡易体験できます。",
    points: ["設定1初当り約1/299.6", "約32G/50枚・純増約3.0枚/G", "実機どおり設定1・2・3・5・6から抽選"],
    specs: [["初当り（設定1）", "約1/299.6"], ["初当り（設定6）", "約1/237.0"], ["ベース", "約32G/50枚"], ["コイン単価", "約3.8円"], ["純増", "約3.0枚/G"], ["BIG／REG", "約210／90枚"]],
    sim: { kind: "slot", triggerLabel: "ボーナス初当り", triggerRate: 299.6, triggerSuccess: 1, mainLabel: "天国モード", mainRate: 299.6, base50: 32.0, coinUnit: 3.8, normalMin: 90, normalMax: 700, specialLabel: "金ドキモード", specialChance: 0.28, specialMin: 90, specialMax: 720, upperChallenge: "ドキドキモード", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "超ドキドキモード", upperContinue: 0.90, upperPayout: 300, settingPool: [1, 2, 3, 5, 6], settingRates: { 1: { trigger: 299.6, main: 299.6, payout: 0.972 }, 2: { trigger: 287.3, main: 287.3, payout: 0.987 }, 3: { trigger: 266.7, main: 266.7, payout: 1.013 }, 5: { trigger: 247.6, main: 247.6, payout: 1.047 }, 6: { trigger: 237.0, main: 237.0, payout: 1.081 } } },
    articleSections: [
      { heading: "5段階設定でボーナス初当りを抽選", paragraphs: ["実機に合わせて設定1・2・3・5・6から均等抽選し、設定別の初当りと出玉率を使います。", "設定は最終結果まで伏せ、マイ記録と機種別ランキングへ表示します。"] },
      { heading: "32G以内の連チャンを簡易化", paragraphs: ["天国、金ドキ、ドキドキ・超ドキドキの流れを段階的な抽選へまとめています。", "モード移行率や確定役の全詳細は再現せず、約32G/50枚・固定交換率で結果を比較します。"] }
    ],
    sources: [["ユニバーサル公式製品情報", "https://www.universal-777.com/product/slot/okidoki_gold/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9750"]]
  },
  "okiumi5-imarine": {
    order: 9.7, type: "pachinko", theme: "aqua", year: "2021年7月", maker: "三洋物産", updated: "2026-11-01",
    name: "PAスーパー海物語 IN 沖縄5 with アイマリン", shortName: "沖海5 アイマリン",
    catchcopy: "約1/99.9・ST100%。10R比率10%の定番沖甘。",
    intro: "全国設置上位の甘海。全大当り後にST5回＋時短へ入り、5R約550個と10R約1100個の連チャンを簡易体験できます。",
    points: ["大当り約1/99.9・ST突入100%", "電サポ25・50・100回", "10R約1100個比率10%"],
    specs: [["大当り", "約1/99.9"], ["ST中", "約1/9.9"], ["ST突入", "100%"], ["ST", "5回"], ["電サポ", "25・50・100回"], ["出玉", "約550・1100個"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.5, minSpins: 10, maxSpins: 35, rushLabel: "ST＋時短", rushEntry: 1, rushContinue: 0.60, firstPayoutIn: 550, firstPayoutOut: 550, rushPayouts: [[550, 0.90], [1100, 0.10]] },
    articleSections: [
      { heading: "全大当り後にST＋時短", paragraphs: ["約1/99.9の初当り後は必ずST5回へ入り、その後は時短20・45・95回が付きます。", "平均連チャン約2.5回を基に、継続約60%の代表値で簡易抽選します。"] },
      { heading: "10R比率10%を出玉へ反映", paragraphs: ["5R約550個を90%、10R約1100個を10%で抽選します。", "遊技中の玉減り、保留、金ハイビゾーンは個別再現せず、18.5回/1,000円で比較します。"] }
    ],
    sources: [["SANYO 公式製品情報", "https://www.sanyobussan.co.jp/products/pk_supersea_okinawa5_imarine/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9421"]]
  },
  "oumi4-agnes": {
    order: 9.8, type: "pachinko", theme: "ocean", year: "2021年2月", maker: "三洋物産", updated: "2026-11-01",
    name: "PA大海物語4スペシャル Withアグネス・ラム", shortName: "大海4SP アグネス",
    catchcopy: "約1/99.9・ST10回。長期稼働を続ける定番アグネス。",
    intro: "全国設置上位の甘海。全大当り後のST10回と時短15・40・90回、約57.7%の平均継続を簡易体験できます。",
    points: ["大当り約1/99.9・ST突入100%", "ST10回＋時短15・40・90回", "平均継続約57.7%"],
    specs: [["大当り", "約1/99.9"], ["ST中", "約1/19.5"], ["ST突入", "100%"], ["ST", "10回"], ["電サポ", "25・50・100回"], ["遊タイム", "時短379回"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.8, minSpins: 10, maxSpins: 35, rushLabel: "ST＋時短", rushEntry: 1, rushContinue: 0.577, firstPayoutIn: 432, firstPayoutOut: 432, rushPayouts: [[432, 0.36], [648, 0.60], [1080, 0.04]] },
    articleSections: [
      { heading: "王道のST10回＋時短", paragraphs: ["全大当り後にST10回へ入り、振り分けに応じて時短15・40・90回が付きます。", "複数の電サポ回数を加重した平均継続約57.7%で抽選します。"] },
      { heading: "遊タイムは記事で補足", paragraphs: ["低確率299回後の時短379回はシミュレーションの途中状態としては再現していません。", "出玉は4R約432個、6R約648個、10R約1080個の公表振り分けを使用します。"] }
    ],
    sources: [["SANYO 公式製品情報", "https://www.sanyobussan.co.jp/products/pk_greatsea4_special_withagnes/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9296"]]
  },
  "oumi4-special": {
    order: 9.9, type: "pachinko", theme: "ocean", year: "2020年12月", maker: "三洋物産", updated: "2026-11-01",
    name: "P大海物語4スペシャル", shortName: "大海4スペシャル",
    catchcopy: "ALL約1500個。52%確変と時短100・120回の王道ループ。",
    intro: "長期設置の王道ミドル。約1/319.6、確変52%、通常後の時短100回と電サポ中通常後の時短120回を代表値で簡易体験できます。",
    points: ["大当り約1/319.6・確変52%", "全大当り約1500個", "通常後は時短100・120回"],
    specs: [["大当り", "約1/319.6"], ["確変中", "約1/39.7"], ["確変割合", "52%"], ["時短", "100・120回"], ["出玉", "ALL約1500個"], ["遊タイム", "時短350回"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.0, minSpins: 10, maxSpins: 30, rushLabel: "確変＋時短", rushEntry: 0.649, rushContinue: 0.649, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 1]] },
    articleSections: [
      { heading: "52%確変と時短引き戻し", paragraphs: ["大当りの52%は次回までの確変、48%は通常大当り後の時短へ進みます。", "確変と通常時大当り後の時短100回を合わせ、継続約64.9%の代表値で抽選します。"] },
      { heading: "全大当り約1500個", paragraphs: ["確変・通常を問わず約1500個を獲得する王道ループです。", "遊タイムと時短120回への状態変化は記事で補足し、シミュレーターでは同一条件で比較します。"] }
    ],
    sources: [["SANYO 公式製品情報", "https://www.sanyobussan.co.jp/products/pk_greatsea4_special/"], ["SANYO 公式スペック", "https://www.sanyobussan.co.jp/products/pk_greatsea4_special/spec/"]]
  },
  "okiumi6-enako": {
    order: 10.0, type: "pachinko", theme: "sakura", year: "2026年6月", maker: "三洋物産", updated: "2026-11-01",
    name: "PAスーパー海物語IN沖縄6 Withえなこ", shortName: "沖海6 えなこ",
    catchcopy: "ST100%。電サポ降格なしで、約82%のジンベェタイムへ。",
    intro: "2026年導入の沖甘。ST5回＋時短と、電サポ回数が降格しない新時短、10R後のジンベェタイムを簡易体験できます。",
    points: ["大当り約1/99.9・ST突入100%", "電サポ25・50・120回", "ジンベェタイム継続約82%"],
    specs: [["大当り", "約1/99.9"], ["ST中", "約1/9.9"], ["ST突入", "100%"], ["ST", "5回"], ["電サポ", "25・50・120回"], ["LT", "非搭載"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.5, minSpins: 10, maxSpins: 35, rushLabel: "ST＋時短", rushEntry: 1, rushContinue: 0.581, firstPayoutIn: 400, firstPayoutOut: 400, rushPayouts: [[400, 0.49], [600, 0.50], [1000, 0.01]], upperLabel: "ジンベェタイム", upperDirectChance: 0, upperUpgradeChance: 0.10, upperContinue: 0.815 },
    articleSections: [
      { heading: "電サポ回数が降格しない沖甘", paragraphs: ["全大当り後にST5回＋時短へ入り、一度50回または120回へ上がると以降の電サポが降格しません。", "通常状態の代表継続約58.1%とジンベェタイム約81.5%を別々に抽選します。"] },
      { heading: "4R・6R・10Rを反映", paragraphs: ["初当りは4R約400個、6R約600個、10R約1000個の振り分けを使用します。", "電サポ状態ごとの全振り分けは、上位移行率10%の共通モデルへ簡略化しています。"] }
    ],
    sources: [["SANYO 公式発表", "https://www.sanyobussan.co.jp/information/pdf/sanyo_press_release_20260313_01.pdf"], ["P-WORLD 設置台数ランキング", "https://www.p-world.co.jp/info/rankp.htm?guid=ON"]]
  },
  "my-juggler-v": {
    order: 10.1, type: "slot", theme: "gold", year: "2021年12月", maker: "北電子", updated: "2026-11-01",
    name: "マイジャグラーV", shortName: "マイジャグラーV",
    catchcopy: "全国設置上位の定番ジャグラーを、設定1〜6・8,000Gで比較。",
    intro: "長期稼働を続ける定番ジャグラー。設定1〜6を均等抽選し、公式BIG・REG確率でボーナスごとに続行を選びながら最大8,000Gまで抽選します。",
    points: ["設定1〜6均等ランダム", "最大8,000G", "設定6はBIG・REGとも約1/229.1"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/273.1"], ["設定1 REG", "約1/409.6"], ["設定1合算", "約1/163.8"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 273.1, regRate: 409.6, combinedRate: 163.8, bigPayout: 240, regPayout: 96, payoutRate: 0.970, settingRates: { 1: { big: 273.1, reg: 409.6, payout: 0.970 }, 2: { big: 270.8, reg: 385.5, payout: 0.980 }, 3: { big: 266.4, reg: 336.1, payout: 0.999 }, 4: { big: 254.0, reg: 290.0, payout: 1.028 }, 5: { big: 240.1, reg: 268.6, payout: 1.053 }, 6: { big: 229.1, reg: 229.1, payout: 1.094 } }, base50: 40.0, coinUnit: 2.0, mainRate: 163.8, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "設定1〜6を最大8,000Gで比較", paragraphs: ["START時に設定を均等抽選し、選ばれた設定のBIG・REG確率で1Gずつ抽選します。", "設定は最終結果、マイ記録、機種別ランキングへ表示します。"] },
      { heading: "REG差と確率のぶれを見る", paragraphs: ["設定1のREG約1/409.6から設定6の約1/229.1まで大きな差があります。", "ぶどう、小役重複、取りこぼしは再現せず、ボーナス回数と出玉率による差枚モデルです。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/myjuggler5/"], ["P-WORLD 設置台数ランキング", "https://www.p-world.co.jp/info/ranks.htm"]]
  },
  "karakuri-circus2-slot": {
    order: 10.2, type: "slot", theme: "crimson", year: "2026年7月", maker: "SANKYO", updated: "2026-11-01",
    name: "Lパチスロ からくりサーカス2", shortName: "スマスロ からくり2",
    catchcopy: "機械仕掛けの女神から激情ジャッジ、超からくりサーカスへ。",
    intro: "2026年導入の人気スマスロ。CZ、AT、激情ジャッジ、運命の一劇を経て純増約8枚の上位ATへ進む流れを簡易体験できます。",
    points: ["設定1 CZ約1/342・AT約1/519", "約31.8G/50枚", "通常AT約2.8枚・上位約8.0枚/G"],
    specs: [["CZ（設定1）", "約1/342"], ["AT（設定1）", "約1/519"], ["AT（設定6）", "約1/410"], ["ベース", "約31.8G/50枚"], ["コイン単価", "約4.1円"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "機械仕掛けの女神", triggerRate: 342.0, triggerSuccess: 0.55, mainLabel: "からくりサーカス", mainRate: 519.0, base50: 31.8, coinUnit: 4.1, normalMin: 300, normalMax: 1300, specialLabel: "激情ジャッジ", specialChance: 0.38, specialMin: 200, specialMax: 1100, upperChallenge: "運命の一劇", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "超からくりサーカス", upperContinue: 0.82, upperPayout: 650, settingRates: { 1: { trigger: 342, main: 519, payout: 0.977 }, 2: { trigger: 341, main: 504, payout: 0.988 }, 3: { trigger: 339, main: 474, payout: 1.012 }, 4: { trigger: 339, main: 458, payout: 1.043 }, 5: { trigger: 327, main: 430, payout: 1.105 }, 6: { trigger: 318, main: 410, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別CZ・AT初当りを反映", paragraphs: ["設定1〜6を均等抽選し、CZ約1/342〜1/318、AT約1/519〜1/410を個別に使用します。", "上位契機の非公表設定差は加えず、全設定共通の簡易抽選です。"] },
      { heading: "純増約2.8枚から約8.0枚へ", paragraphs: ["通常ATと上位ATの出玉速度の違いを、獲得枚数の幅として表現します。", "全小役、倍率、天井、有利区間は完全再現せず、46枚貸し・5.2枚交換で比較します。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10485"], ["SANKYO 公式サイト", "https://www.sankyo-fever.jp/"]]
  },
  "magical-halloween8": {
    order: 10.3, type: "slot", theme: "violet", year: "2023年12月", maker: "コナミアミューズメント", updated: "2026-11-01",
    name: "マジカルハロウィン8", shortName: "マジハロ8",
    catchcopy: "ボーナスとカボチャンスを重ねるA＋ARTを設定ランダムで体験。",
    intro: "人気A＋ART機。ボーナス、カボチャンス、キングカボチャンス、悪カボチャンスのストック連を簡易体験できます。",
    points: ["設定1 ART初当り約1/352.2", "約34.3G/50枚・純増約1.0枚/G", "設定1〜6ランダム"],
    specs: [["ART（設定1）", "約1/352.2"], ["ART（設定6）", "約1/226.8"], ["ボーナス（設定1）", "約1/177.1"], ["ベース", "約34.3G/50枚"], ["ART純増", "約1.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "ボーナス", triggerRate: 177.1, triggerSuccess: 0.50, mainLabel: "カボチャンス", mainRate: 352.2, base50: 34.3, coinUnit: 2.4, normalMin: 180, normalMax: 800, specialLabel: "キングカボチャンス", specialChance: 0.32, specialMin: 120, specialMax: 700, upperChallenge: "悪カボチャンス", upperChance: 0.16, upperSuccess: 0.50, upperLabel: "スーパーカボチャンス", upperContinue: 0.80, upperPayout: 420, settingRates: { 1: { trigger: 177.1, main: 352.2, payout: 0.977 }, 2: { trigger: 175.7, main: 335.5, payout: 0.988 }, 3: { trigger: 174.3, main: 297.1, payout: 1.013 }, 4: { trigger: 171.6, main: 269.3, payout: 1.052 }, 5: { trigger: 170.2, main: 254.4, payout: 1.073 }, 6: { trigger: 167.6, main: 226.8, payout: 1.092 } } },
    articleSections: [
      { heading: "A＋ARTの二つの初当り", paragraphs: ["ボーナス合算とART初当りを設定別に使い、ボーナスからカボチャンスへつながる流れを簡易化します。", "設定1〜6は均等抽選し、結果まで伏せます。"] },
      { heading: "ストック連を段階で表現", paragraphs: ["キングカボチャンス、悪カボチャンス、スーパーカボチャンスを特化・上位段階として扱います。", "内部モード、全ボーナス、ストック個数は完全再現しない娯楽用モデルです。"] }
    ],
    sources: [["KONAMI 公式機種サイト", "https://www.konami.com/amusement/psm/slot/magihallo8/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9921"]]
  },
  "sao2-slot": {
    order: 10.4, type: "slot", theme: "aqua", year: "2026年6月", maker: "パオン・ディーピー", updated: "2026-11-01",
    name: "スロット ソードアート・オンラインⅡ", shortName: "スマスロ SAOⅡ",
    catchcopy: "スコードロンバトルからBoB、純増約7.2枚の上位ATへ。",
    intro: "2026年導入のスマスロ。CZスコードロンバトル、ATバレット・オブ・バレッツ、上位ATと絶剣の流れを簡易体験できます。",
    points: ["設定1 CZ約1/238.4・AT約1/386.2", "約31G/50枚・コイン単価約4.1円", "通常約3.6枚・上位約7.2枚/G"],
    specs: [["CZ（設定1）", "約1/238.4"], ["AT（設定1）", "約1/386.2"], ["AT（設定6）", "約1/269.6"], ["ベース", "約31G/50枚"], ["コイン単価", "約4.1円"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "スコードロンバトル", triggerRate: 238.4, triggerSuccess: 0.55, mainLabel: "バレット・オブ・バレッツ", mainRate: 386.2, base50: 31.0, coinUnit: 4.1, normalMin: 260, normalMax: 1100, specialLabel: "スナイパーチャンス", specialChance: 0.36, specialMin: 180, specialMax: 900, upperChallenge: "BoB FINALS", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "絶剣", upperContinue: 0.82, upperPayout: 580, settingRates: { 1: { trigger: 238.4, main: 386.2, payout: 0.976 }, 2: { trigger: 232.3, main: 364.3, payout: 0.988 }, 3: { trigger: 232.7, main: 368.1, payout: 1.002 }, 4: { trigger: 218.9, main: 326.8, payout: 1.053 }, 5: { trigger: 225.2, main: 340.6, payout: 1.104 }, 6: { trigger: 191.7, main: 269.6, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別CZ・AT初当りをそのまま使用", paragraphs: ["設定4が設定5より軽いなど単純な順番にならない公開値も、そのまま反映しています。", "START時に設定1〜6を均等抽選し、最終結果とランキングで設定を発表します。"] },
      { heading: "通常ATから上位ATへ", paragraphs: ["通常AT純増約3.6枚/Gと上位約7.2枚/Gの差を獲得枚数へ反映します。", "バレットサークル、モード、全小役、有利区間は簡易モデルの対象外です。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10483"], ["大都技研 公式サイト", "https://www.daitogiken.com/"]]
  },
  "oumi4-black": {
    order: 10.5, type: "pachinko", theme: "ocean", year: "2021年5月", maker: "三洋物産", updated: "2026-11-01",
    name: "P大海物語4スペシャル BLACK", shortName: "大海4SP BLACK",
    catchcopy: "約1/199.8・ST100%。初代黒海の51回STを継承。",
    intro: "長期稼働を続ける海シリーズの定番ライト。全大当り後にST51回へ入り、約72%継続と3R・5R・10Rの出玉を簡易体験できます。",
    points: ["大当り約1/199.8・ST突入100%", "ST51回・継続約72%", "最大10R約1500個"],
    specs: [["大当り", "約1/199.8"], ["ST中", "約1/40.6"], ["ST突入", "100%"], ["ST", "51回"], ["継続期待", "約72%"], ["最大出玉", "約1500個"]],
    sim: { kind: "pachinko", hitRate: 199.8, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.2, minSpins: 10, maxSpins: 32, rushLabel: "BLACKパールゾーン", rushEntry: 1, rushContinue: 0.72, firstPayoutIn: 450, firstPayoutOut: 450, rushPayouts: [[450, 0.50], [750, 0.30], [1500, 0.20]] },
    articleSections: [
      { heading: "100%突入の51回ST", paragraphs: ["通常時は約1/199.8で大当りを抽選し、すべての大当り後にST51回へ進みます。", "ST中は約1/40.6で、継続期待度約72%を1回ごとの継続抽選へまとめています。"] },
      { heading: "3R・5R・10Rの出玉差", paragraphs: ["出玉は3R約450個、5R約750個、10R約1500個の代表値で抽選します。", "ゾーンごとの演出や保留内抽選は再現せず、18.2回/1,000円の固定条件で結果を比較します。"] }
    ],
    sources: [["SANYO 公式製品情報", "https://www.sanyobussan.co.jp/products/pk_greatsea4_special_black/index.html"], ["SANYO 発表資料", "https://www.sanyobussan.co.jp/information/pdf/sanyo_press_release_20210322.pdf"]]
  },
  "oumi-agnes-premium": {
    order: 10.6, type: "pachinko", theme: "sakura", year: "2026年9月", maker: "三洋物産", updated: "2026-11-01",
    name: "PA大海物語Withアグネス・ラム Premium Edition", shortName: "アグネス Premium",
    catchcopy: "約1/99.9・ST100%。低確239回でPremium遊タイム。",
    intro: "2026年導入の甘海。ST10回と時短15・40・90回、4R・6R・10Rの出玉、Premium遊タイムを記事で確認できます。",
    points: ["大当り約1/99.9・ST突入100%", "電サポ25・50・100回", "低確239回で時短10000回"],
    specs: [["大当り", "約1/99.9"], ["ST中", "約1/19.5"], ["ST突入", "100%"], ["ST", "10回"], ["電サポ", "25・50・100回"], ["遊タイム", "時短10000回"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 19.0, minSpins: 10, maxSpins: 36, rushLabel: "ST＋時短", rushEntry: 1, rushContinue: 0.58, firstPayoutIn: 432, firstPayoutOut: 432, rushPayouts: [[432, 0.36], [648, 0.60], [1080, 0.04]] },
    articleSections: [
      { heading: "王道のST10回＋時短", paragraphs: ["全大当り後にST10回へ入り、振り分けに応じて時短15・40・90回が付きます。", "サイトでは電サポ回数を平均化した継続約58%の代表値で簡易抽選します。"] },
      { heading: "Premium遊タイム", paragraphs: ["低確率状態を239回消化すると時短10000回へ入り、大当り期待度は約99.9%です。", "途中から打ち始める状態は再現せず、通常時の初当り抽選と記事解説に分けています。"] },
      { heading: "固定レートと出玉", bullets: ["19.0回/1,000円・250玉貸し・28玉交換で固定", "4R約432個・6R約648個・10R約1080個", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10511"], ["一撃 オンライン遊技説明", "https://1geki.jp/pachinko/pa_oumi_agnspe/39/"]]
  },
  "symphogear5-smartstart": {
    order: 10.7, type: "pachinko", theme: "flame", year: "2027年1月導入予定", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバー戦姫絶唱シンフォギア5 超デカ×スマートスタート", shortName: "シンフォギア5",
    catchcopy: "超デカ×スマートスタート。約51%でRUSH、限定解除は約80%。",
    intro: "2027年1月12日導入予定の新台。一直線モードを含む図柄揃い約1/319、RUSHと限定解除、終了後の引き戻しまでを簡易体験できます。",
    points: ["図柄揃い約1/319・RUSH約51%", "RUSH継続約65%＋引き戻し約20%", "限定解除継続約80%＋引き戻し約20%"],
    specs: [["図柄揃い", "約1/319"], ["RUSH突入", "約51%"], ["RUSH継続", "約65%"], ["LT継続", "約80%"], ["引き戻し", "約20%"], ["スタート", "超デカ×スマート"]],
    sim: { kind: "pachinko", hitRate: 319, hitLabel: "図柄揃い", startType: "超デカ×スマートスタート", spinsPer1k: 25.0, minSpins: 16, maxSpins: 38, rushLabel: "シンフォギアチャンス", rushEntry: 0.509, rushContinue: 0.65, firstPayoutIn: 600, firstPayoutOut: 600, rushPayouts: [[600, 0.405], [1200, 0.595]], upperLabel: "シンフォギアチャンス限定解除", upperDirectChance: 0.004, upperUpgradeChance: 0.30, upperContinue: 0.80 },
    articleSections: [
      { heading: "一直線モードを含む約1/319", paragraphs: ["図柄直撃と、最大3回転・期待度約33%の一直線モード経由を合わせた図柄揃いは約1/319です。", "規定回転数や予告発生回数によるCZ移行は、通常時の初当り確率へまとめています。"] },
      { heading: "RUSHから限定解除へ", paragraphs: ["初当りの約50.5%でRUSH、約0.4%でLTへ直行。RUSH中大当りの約30%で限定解除へ昇格します。", "RUSHは約65%、限定解除は約80%で継続し、終了後の引き戻し約20%は説明上の補助要素として扱います。"] },
      { heading: "導入前情報について", paragraphs: ["2027年1月12日導入予定のため、導入前に公表されたスペックを使っています。", "固定回転率25.0回/1,000円は比較用の仮定で、実店舗の回転率を保証しません。"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/products/machine_list/pux/"], ["遊技日本 発表記事", "https://yugi-nippon.com/pachinko-new-machine/post-80852/"]]
  },
  "keiji-kumo": {
    order: 10.8, type: "pachinko", theme: "crimson", year: "2026年12月導入予定", maker: "ニューギン", updated: "2026-11-01",
    name: "e花の慶次～雲のかなたに", shortName: "花の慶次 雲のかなたに",
    catchcopy: "初代花慶ループがスマパチで復活。戦ループ約83%。",
    intro: "2026年12月7日導入予定。実質大当り約1/399.9、戦モード突入約75%、戦モードと殿モードを合わせた継続約83%を簡易体験できます。",
    points: ["実質大当り約1/399.9", "戦モード突入約75%", "戦ループ継続約83%"],
    specs: [["実質大当り", "約1/399.9"], ["戦モード突入", "約75%"], ["戦ループ", "約83%"], ["戦モード中", "約1/40"], ["電サポ", "30・100回・次回"], ["最大出玉", "約4800個"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "戦モード", rushEntry: 0.75, rushContinue: 0.83, firstPayoutIn: 600, firstPayoutOut: 600, rushPayouts: [[600, 0.30], [1200, 0.25], [2400, 0.40], [4800, 0.05]] },
    articleSections: [
      { heading: "約75%で戦モードへ", paragraphs: ["図柄揃い、ランクアップボーナス、傾奇ゾーンを合算した実質大当りは約1/399.9です。", "初当りからの戦モード突入は約75%として1回の抽選へまとめています。"] },
      { heading: "戦モードと殿モード", paragraphs: ["戦モード約74%と殿モードの引き戻しを合わせたトータル継続は約83%です。", "城門演出やRUBの細かなラウンド進行は省略し、600・1200・2400・4800個の代表出玉で比較します。"] },
      { heading: "導入前情報について", paragraphs: ["2026年12月7日導入予定のため、公開済みの発表スペックを使用しています。", "導入後に正式情報が更新された場合は記事と抽選条件を見直します。"] }
    ],
    sources: [["遊技日本 発表記事", "https://yugi-nippon.com/pachinko-new-machine/post-80698/"], ["花の慶次 公式サイト", "https://hananokeiji.jp/"]]
  },
  "iza-bancho": {
    order: 10.9, type: "slot", theme: "crimson", year: "2025年6月", maker: "サボハニ", updated: "2026-11-01",
    name: "いざ！番長", shortName: "いざ！番長",
    catchcopy: "刺客ゾーンを突破し、頂ZBASHから青頂ZBASHへ。",
    intro: "番長シリーズの人気スマスロ。奇数・偶数設定で特徴が変わる初当りを使い、CZ、AT、絶頂決戦から上位ATへ進む流れを簡易体験できます。",
    points: ["設定1初当り約1/386.9", "設定6初当り約1/312.1", "設定1〜6を均等ランダム"],
    specs: [["初当り（設定1）", "約1/386.9"], ["初当り（設定6）", "約1/312.1"], ["ベース", "約32G/50枚"], ["AT", "頂ZBASH"], ["上位AT", "青頂ZBASH"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "刺客ゾーン", triggerRate: 240, triggerSuccess: 0.45, mainLabel: "頂ZBASH", mainRate: 386.9, base50: 32.0, coinUnit: 4.0, normalMin: 260, normalMax: 1100, specialLabel: "絶頂決戦～巌流島～", specialChance: 0.32, specialMin: 250, specialMax: 1000, upperChallenge: "絶頂決戦", upperChance: 0.17, upperSuccess: 0.55, upperLabel: "青頂ZBASH", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { trigger: 240, main: 386.9, payout: 0.976 }, 2: { trigger: 236, main: 368.5, payout: 0.989 }, 3: { trigger: 238, main: 375.8, payout: 1.013 }, 4: { trigger: 226, main: 332.4, payout: 1.060 }, 5: { trigger: 231, main: 351.6, payout: 1.121 }, 6: { trigger: 218, main: 312.1, payout: 1.149 } } },
    articleSections: [
      { heading: "奇数・偶数で変わる初当り", paragraphs: ["AT初当りは設定1約1/386.9から設定6約1/312.1。設定3が設定2より重いなど、公開値をそのまま使用します。", "開始時に設定1〜6を均等抽選し、設定は最終結果とランキングで発表します。"] },
      { heading: "絶頂決戦から青頂ZBASHへ", paragraphs: ["CZ刺客ゾーン、頂ZBASH、絶頂決戦～巌流島～、上位ATの順に段階化しています。", "刀ポイント、小役、モード、有利区間は完全再現せず、46枚貸し・5.2枚交換で収支を比較します。"] }
    ],
    sources: [["大都技研 公式製品情報", "https://www.daitogiken.com/products/slot/"], ["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10275"]]
  },
  "toloveru-darkness-slot": {
    order: 11.0, type: "slot", theme: "magenta", year: "2024年6月", maker: "オリンピアエステート", updated: "2026-11-01",
    name: "L ToLOVEるダークネス", shortName: "スマスロ ToLOVEる",
    catchcopy: "CZから楽園計画へ。ハーレムモードで大きな一撃を狙う。",
    intro: "人気スマスロ。チャンス目からCZ、楽園計画、上位STハーレムモードへ進む流れを、実機の設定2〜6からランダム抽選して体験できます。",
    points: ["設定2 AT初当り約1/352.0", "約30G/50枚・高純増AT", "実機どおり設定2〜6から抽選"],
    specs: [["AT（設定2）", "約1/352.0"], ["AT（設定6）", "約1/311.1"], ["CZ合成", "設定2約1/177.6"], ["ベース", "約30G/50枚"], ["メインST", "楽園計画"], ["上位ST", "ハーレムモード"]],
    sim: { kind: "slot", triggerLabel: "とらぶるCZ", triggerRate: 177.6, triggerSuccess: 0.50, mainLabel: "楽園計画", mainRate: 352.0, base50: 30.0, coinUnit: 4.2, normalMin: 250, normalMax: 1100, specialLabel: "ダークネス計画", specialChance: 0.35, specialMin: 250, specialMax: 1100, upperChallenge: "ハーレム目", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "ハーレムモード", upperContinue: 0.80, upperPayout: 650, settingPool: [2, 3, 4, 5, 6], settingRates: { 2: { trigger: 177.6, main: 352.0, payout: 0.980 }, 3: { trigger: 174.0, main: 345.7, payout: 1.010 }, 4: { trigger: 168.0, main: 328.4, payout: 1.055 }, 5: { trigger: 162.0, main: 311.3, payout: 1.100 }, 6: { trigger: 158.0, main: 311.1, payout: 1.140 } } },
    articleSections: [
      { heading: "実機の設定構成を優先", paragraphs: ["本機は設定2・3・4・5・6と設定Lの構成です。サイトでは通常遊技向けの設定2〜6から均等抽選し、設定Lは除外します。", "選ばれた設定は最終結果、マイ記録、機種別ランキングへ残ります。"] },
      { heading: "楽園計画からハーレムモードへ", paragraphs: ["CZ、メインST楽園計画、ダークネス計画、上位STハーレムモードを段階抽選で表現します。", "全チャンス目、ポイント、STキャラ、内部状態は簡易モデルの対象外です。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10038"], ["平和 公式製品情報", "https://www.heiwanet.co.jp/products/pachislot/l-toloveru-darkness/"]]
  },
  "biohazard5-slot": {
    order: 11.1, type: "slot", theme: "violet", year: "2025年3月", maker: "エンターライズ", updated: "2026-11-01",
    name: "スマスロ バイオハザード5", shortName: "スマスロ バイオ5",
    catchcopy: "増殖上乗せの名機が復活。上位ATは純増約4.0枚。",
    intro: "人気シリーズのスマスロ。パニックゾーン、ハザードラッシュ、ウロボロス、上位CZからプレミアムハザードラッシュへ進む流れを簡易体験できます。",
    points: ["設定1 AT約1/325.8", "設定6 AT約1/236.2", "通常AT約2.5枚・上位約4.0枚/G"],
    specs: [["AT（設定1）", "約1/325.8"], ["AT（設定6）", "約1/236.2"], ["ベース", "約33G/50枚"], ["通常AT純増", "約2.5枚/G"], ["上位AT純増", "約4.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "パニックゾーン", triggerRate: 220, triggerSuccess: 0.48, mainLabel: "ハザードラッシュ", mainRate: 325.8, base50: 33.0, coinUnit: 3.7, normalMin: 260, normalMax: 1100, specialLabel: "シューティングバースト", specialChance: 0.35, specialMin: 200, specialMax: 1000, upperChallenge: "クライマックスウェスカーゾーン", upperChance: 0.16, upperSuccess: 0.50, upperLabel: "プレミアムハザードラッシュ", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { trigger: 220, main: 325.8, payout: 0.978 }, 2: { trigger: 215, main: 317.0, payout: 0.990 }, 3: { trigger: 207, main: 299.0, payout: 1.020 }, 4: { trigger: 194, main: 274.0, payout: 1.060 }, 5: { trigger: 184, main: 254.0, payout: 1.100 }, 6: { trigger: 174, main: 236.2, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別AT初当り", paragraphs: ["AT初当りは設定1約1/325.8から設定6約1/236.2。開始時に設定1〜6を均等抽選し、結果で設定を発表します。", "CZ確率の詳細は代表値へまとめ、未公表の設定差を独自に追加しません。"] },
      { heading: "増殖と上位AT", paragraphs: ["通常AT中の増殖上乗せ、シューティングバースト、上位CZ、プレミアムハザードラッシュを一連の段階で表現します。", "ウロボロス中の全小役やエピソードの組み合わせは完全再現しない娯楽用モデルです。"] }
    ],
    sources: [["フィールズ 発表資料", "https://www.tsuburaya-fields.co.jp/ir/j/files/press/2024/press_20241217a.pdf"], ["P-WORLD 業界ニュース", "https://news.p-world.co.jp/articles/30192/amusement"]]
  },
  "yoshimune-slot": {
    order: 11.2, type: "slot", theme: "gold", year: "2025年4月", maker: "サボハニ", updated: "2026-11-01",
    name: "吉宗", shortName: "スマスロ 吉宗",
    catchcopy: "711枚BIGと1G連。裏鷹狩りで一撃を狙う。",
    intro: "初代のゲーム性を受け継ぐ人気スマスロ。高確率、711枚BIG、1G連、裏鷹狩りまでを設定1〜6ランダムで簡易体験できます。",
    points: ["設定1初当り約1/378.9", "設定6初当り約1/292.4", "BIG約711枚・純増約7.11枚/G"],
    specs: [["初当り（設定1）", "約1/378.9"], ["初当り（設定6）", "約1/292.4"], ["ベース", "約33G/50枚"], ["BIG", "約711枚"], ["純増", "約7.11枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "高確率", triggerRate: 230, triggerSuccess: 0.48, mainLabel: "吉宗BIG", mainRate: 378.9, base50: 33.0, coinUnit: 4.0, normalMin: 300, normalMax: 900, specialLabel: "1G連", specialChance: 0.35, specialMin: 711, specialMax: 1422, upperChallenge: "鷹狩り", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "裏鷹狩り", upperContinue: 0.80, upperPayout: 711, settingRates: { 1: { trigger: 230, main: 378.9, payout: 0.978 }, 2: { trigger: 225, main: 369.6, payout: 0.991 }, 3: { trigger: 219, main: 358.8, payout: 1.006 }, 4: { trigger: 205, main: 335.1, payout: 1.041 }, 5: { trigger: 195, main: 318.5, payout: 1.071 }, 6: { trigger: 180, main: 292.4, payout: 1.120 } } },
    articleSections: [
      { heading: "711枚BIGと設定別初当り", paragraphs: ["初当りは設定1約1/378.9から設定6約1/292.4。設定1〜6を均等抽選し、選ばれた設定の初当りを使用します。", "BIGは約711枚の代表値で、REGや細かなボーナス振り分けは簡易化しています。"] },
      { heading: "1G連から裏鷹狩りへ", paragraphs: ["BIG中の7揃いなどによる1G連と、複数の1G連から到達する裏鷹狩りを特化・上位段階として表現します。", "モード移行、松解除、天井、全小役は再現せず、46枚貸し・5.2枚交換で比較します。"] }
    ],
    sources: [["大都技研 公式製品情報", "https://www.daitogiken.com/products/slot/"], ["一撃 解析情報", "https://1geki.jp/slot/l_yoshimune/"]]
  },
  "oumi4-black-plus": {
    order: 11.3, type: "pachinko", theme: "ocean", year: "2026年12月導入予定", maker: "三洋物産", updated: "2026-11-01",
    name: "P大海物語4スペシャル BLACK PLUS", shortName: "大海4 BLACK PLUS",
    catchcopy: "愛され続ける黒海に新カスタムを追加。ST継続約72%。",
    intro: "2026年12月7日導入予定。約1/199.8、ST突入100%、3R・5R・10Rの鉄板スペックを新カスタムとともに楽しむ機種です。",
    points: ["大当り約1/199.8・ST突入100%", "ST51回・継続約72%", "10R約1500個比率30%"],
    specs: [["大当り", "約1/199.8"], ["ST中", "約1/40.5"], ["ST突入", "100%"], ["ST", "51回"], ["継続期待", "約72%"], ["導入予定", "2026年12月7日"]],
    sim: { kind: "pachinko", hitRate: 199.8, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.2, minSpins: 10, maxSpins: 32, rushLabel: "BLACKパールゾーン", rushEntry: 1, rushContinue: 0.72, firstPayoutIn: 450, firstPayoutOut: 450, rushPayouts: [[450, 0.40], [750, 0.30], [1500, 0.30]] },
    articleSections: [
      { heading: "黒海の鉄板スペックを継承", paragraphs: ["通常時約1/199.8、ST中約1/40.5。すべての大当り後にST51回へ進み、継続期待度は約72%です。", "前作と同じ流れを使いながら、新しいカスタムで遊技感を選べる機種です。"] },
      { heading: "10R比率30%へ更新", paragraphs: ["3R約450個40%、5R約750個30%、10R約1500個30%の共通振り分けを使用します。", "演出カスタム自体は抽選結果へ影響させず、固定回転率18.2回/1,000円で比較します。"] },
      { heading: "導入前情報", paragraphs: ["2026年12月7日導入予定の公表スペックを使用しています。", "導入後に正式情報が更新された場合は記事と条件を見直します。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10558"], ["遊技日本 発表記事", "https://yugi-nippon.com/pachinko-new-machine/post-79135/"]]
  },
  "oumi5-special-yutime": {
    order: 11.4, type: "pachinko", theme: "ocean", year: "2026年12月導入予定", maker: "三洋物産", updated: "2026-11-01",
    name: "e大海物語5スペシャル 319遊タイムver.", shortName: "e大海5SP 遊タイム",
    catchcopy: "ALL1500個の54%確変ループに、950回転の遊タイム。",
    intro: "2026年12月7日導入予定。約1/319.6、確変54%、通常後時短100・200回、低確950回後の遊タイムを備えたスマパチです。",
    points: ["大当り約1/319.6・確変54%", "ALL約1500個", "低確950回で時短350回"],
    specs: [["大当り", "約1/319.6"], ["確変中", "約1/31.9"], ["確変割合", "54%"], ["時短", "100・200回"], ["出玉", "ALL約1500個"], ["遊タイム", "時短350回"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.5, minSpins: 10, maxSpins: 30, rushLabel: "確変＋時短", rushEntry: 0.68, rushContinue: 0.68, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 1]] },
    articleSections: [
      { heading: "54%確変と時短を合算", paragraphs: ["大当りの54%は次回までの確変、通常大当り後は時短100回、電サポ中の通常後は時短200回です。", "シミュレーターでは確変と時短引き戻しを継続約68%の代表値へまとめます。"] },
      { heading: "低確950回の遊タイム", paragraphs: ["低確率950回消化後に時短350回へ入り、通常確率から計算した大当り期待度は約66.6%です。", "途中回転からの遊タイム狙いは再現せず、記事解説と通常初当り抽選を分けています。"] },
      { heading: "固定レート", bullets: ["17.5回/1,000円・250玉貸し・28玉交換で固定", "全大当り約1500個", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["SANYO 公式PV", "https://www.youtube.com/watch?v=4mt14XxSo6g"], ["機種スペック解説", "https://pachislot.win/e-oumi5-special-319-yutime-guide/"]]
  },
  "dumbbell2-77": {
    order: 11.5, type: "pachinko", theme: "gold", year: "2026年12月導入予定", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバーダンベル何キロ持てる？2 77ver.", shortName: "ダンベル2 77",
    catchcopy: "約1/77.4から、獲得出玉で継続率が約60〜90%へ変化。",
    intro: "2026年12月7日導入予定の甘デジ。RUSH中の3個の保留で得た合計出玉に応じ、次回ST回数と継続率が変わります。",
    points: ["図柄揃い約1/77.4・RUSH約50%", "RUSH平均出玉約1100個", "次回継続約60〜90%"],
    specs: [["図柄揃い", "約1/77.4"], ["右打ち中", "約1/66.9"], ["RUSH突入", "約50%"], ["継続率", "約60〜90%"], ["保留出玉", "200・800個"], ["最大報酬", "約2400個"]],
    sim: { kind: "pachinko", hitRate: 77.4, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 19.5, minSpins: 10, maxSpins: 38, rushLabel: "超マッスルRUSH", rushEntry: 0.50, rushContinue: 0.72, firstPayoutIn: 200, firstPayoutOut: 200, rushPayouts: [[600, 0.378], [1200, 0.434], [1800, 0.167], [2400, 0.021]], upperLabel: "ゴールデンタイム", upperDirectChance: 0, upperUpgradeChance: 0.021, upperContinue: 0.90 },
    articleSections: [
      { heading: "約1/77.4の甘ッスル", paragraphs: ["通常時約1/77.4、初当り後の約50%でRUSHへ進みます。", "右打ち中は図柄揃いで3個の保留をチャージし、1個ごとに200個または800個を獲得します。"] },
      { heading: "出玉で次回STが変わる", paragraphs: ["合計600個は約60%、1200個は約70%、1800個は約80%、2400個は約90%の次回継続へ進みます。", "共通シミュレーターでは各振り分けを使い、通常継続は加重平均の代表値へ簡略化しています。"] },
      { heading: "導入前情報", paragraphs: ["2026年12月7日導入予定の公表スペックを使っています。", "実機の保留順やV入賞は完全再現しません。"] }
    ],
    sources: [["パチマガスロマガFREE 基本スペック", "https://pachimaga.com/free/mach/maker-p/sankyo/e_dumbbell2_77.php"], ["遊技日本 発表記事", "https://yugi-nippon.com/pachinko-new-machine/post-79593/"]]
  },
  "onepunchman2-99": {
    order: 11.6, type: "pachinko", theme: "flame", year: "2026年11月", maker: "ニューギン", updated: "2026-11-01",
    name: "eワンパンマン2～正義執行 99ver.", shortName: "ワンパンマン2 99",
    catchcopy: "デカスタ×約1/99.9。RUSH中は約22%で5040個。",
    intro: "2026年11月2日導入予定の甘デジ。初当り約1/99.9、RUSH突入40%、継続約50%で大きな出玉振り分けを狙います。",
    points: ["大当り約1/99.9・RUSH40%", "ST66回・継続約50%", "RUSH中約22%で約5040個"],
    specs: [["大当り", "約1/99.9"], ["RUSH突入", "40%"], ["RUSH継続", "約50%"], ["ST", "66回"], ["通常出玉", "約252個"], ["最大出玉", "約5040個"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "デカスタ", spinsPer1k: 25.0, minSpins: 16, maxSpins: 40, rushLabel: "HERO RUSH", rushEntry: 0.40, rushContinue: 0.50, firstPayoutIn: 252, firstPayoutOut: 252, rushPayouts: [[1120, 0.56], [5040, 0.22], [0, 0.22]] },
    articleSections: [
      { heading: "デカスタ×約1/99.9", paragraphs: ["通常時の大当りは約1/99.9で、40%がHERO RUSHへ進みます。", "固定回転率は比較用に25.0回/1,000円とし、実店舗の回転率を保証しません。"] },
      { heading: "約22%で5040個", paragraphs: ["RUSH中は約56%が1120個、約22%が5040個、約22%がSTリセットです。", "共通モデルではSTリセットを出玉0の継続結果として扱い、約50%のRUSH継続へまとめます。"] }
    ],
    sources: [["遊技日本 発表記事", "https://yugi-nippon.com/pachinko-new-machine/post-80495/"], ["P-WORLD 新台スケジュール", "https://www.p-world.co.jp/database/machine.html"]]
  },
  "bancho-banzuke": {
    order: 11.7, type: "slot", theme: "crimson", year: "2026年12月導入予定", maker: "パオン・ディーピー", updated: "2026-11-01",
    name: "押忍！番長番付", shortName: "番長番付",
    catchcopy: "押忍ポイントから漢磨きチャレンジ、純増約7枚の轟チャンスへ。",
    intro: "2026年12月7日導入予定のスマスロ。偶数設定が軽いAT初当りと、CZ、轟チャンス、上位ルートを簡易体験できます。",
    points: ["設定1 AT約1/365.1", "設定6 AT約1/272.3", "純増約7.0枚/G"],
    specs: [["AT（設定1）", "約1/365.1"], ["AT（設定6）", "約1/272.3"], ["ベース", "約32G/50枚"], ["コイン単価", "約3.4円"], ["AT純増", "約7.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "漢磨きチャレンジ", triggerRate: 210, triggerSuccess: 0.50, mainLabel: "轟チャンス", mainRate: 365.1, base50: 32.0, coinUnit: 3.4, normalMin: 260, normalMax: 1100, specialLabel: "番付決戦", specialChance: 0.34, specialMin: 220, specialMax: 950, upperChallenge: "頂上決戦", upperChance: 0.17, upperSuccess: 0.52, upperLabel: "絶頂轟チャンス", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { trigger: 210, main: 365.1, payout: 0.976 }, 2: { trigger: 190, main: 315.6, payout: 0.986 }, 3: { trigger: 207, main: 359.7, payout: 1.001 }, 4: { trigger: 177, main: 282.1, payout: 1.050 }, 5: { trigger: 201, main: 344.1, payout: 1.130 }, 6: { trigger: 170, main: 272.3, payout: 1.140 } } },
    articleSections: [
      { heading: "偶数設定が軽いAT初当り", paragraphs: ["AT初当りは設定1約1/365.1から設定6約1/272.3。設定2・4・6が同じ隣接奇数より軽い公開値を使用します。", "設定1〜6を開始時に均等抽選し、結果とランキングで設定を発表します。"] },
      { heading: "純増約7枚の轟チャンス", paragraphs: ["押忍ポイント、漢磨きチャレンジ、轟チャンスの流れを段階的に体験できます。", "未公表の上位ルートは比較用固定抽選であり、実機の確率として扱いません。"] },
      { heading: "導入前情報", paragraphs: ["2026年12月7日導入予定のため、導入前公表値を使用しています。", "天井、全小役、モードは正式解析後に見直します。"] }
    ],
    sources: [["P-WORLD 新台スケジュール", "https://www.p-world.co.jp/database/machine.html"], ["導入前スペック解説", "https://pachislot.win/smaslot-bancho-banzuke-guide/"]]
  },
  "zegapain-etr": {
    order: 11.8, type: "slot", theme: "aqua", year: "2026年12月導入予定", maker: "山佐ネクスト", updated: "2026-11-01",
    name: "スマスロゼーガペインETR", shortName: "ゼーガペインETR",
    catchcopy: "CZからボーナス、ゼーガバースト、85%の輪廻へ。",
    intro: "2026年12月7日導入予定。ST式CZ、3種類のボーナス、ゼーガバースト、プレミアムATへ進むシリーズ最新作です。",
    points: ["設定1 CZ約1/159.4・BONUS約1/323.9", "通常AT純増約0.7枚/G", "プレミアムAT純増約7.0枚/G"],
    specs: [["CZ（設定1）", "約1/159.4"], ["BONUS（設定1）", "約1/323.9"], ["BONUS（設定6）", "約1/248.8"], ["通常AT純増", "約0.7枚/G"], ["上位純増", "約7.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "ゼーガシステム", triggerRate: 159.4, triggerSuccess: 0.50, mainLabel: "リザレクションボーナス", mainRate: 323.9, base50: 34.0, coinUnit: 3.0, normalMin: 220, normalMax: 1000, specialLabel: "ゼーガバースト", specialChance: 0.34, specialMin: 200, specialMax: 1000, upperChallenge: "ハル決戦", upperChance: 0.18, upperSuccess: 0.70, upperLabel: "ゼーガバースト是我", upperContinue: 0.85, upperPayout: 580, settingRates: { 1: { trigger: 159.4, main: 323.9, payout: 0.975 }, 2: { trigger: 156.8, main: 313.6, payout: 0.988 }, 3: { trigger: 150.1, main: 296.0, payout: 1.007 }, 4: { trigger: 144.9, main: 276.8, payout: 1.045 }, 5: { trigger: 138.9, main: 256.9, payout: 1.094 }, 6: { trigger: 136.0, main: 248.8, payout: 1.125 } } },
    articleSections: [
      { heading: "CZとBONUSの設定差", paragraphs: ["設定1のCZ約1/159.4・BONUS約1/323.9から、設定6のCZ約1/136.0・BONUS約1/248.8までを個別に使用します。", "設定は開始時に均等抽選し、最終結果まで伏せます。"] },
      { heading: "ハル決戦から輪廻へ", paragraphs: ["ゼーガバーストは純増約0.7枚/Gのボーナス高確率AT。ハル決戦の勝利期待度約70%から、継続85%の輪廻を目指します。", "全ボーナス振り分けと上乗せ契機は簡易モデルへまとめています。"] }
    ],
    sources: [["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4820/1/1"], ["情報島＋ 発表記事", "https://p-johojima.jp/new_machine/post-39000/"]]
  },
  "twin-angel2-smart": {
    order: 11.9, type: "slot", theme: "sakura", year: "2026年12月導入予定", maker: "サミー", updated: "2026-11-01",
    name: "スマスロ 快盗天使ツインエンジェル2", shortName: "スマスロ ツイン2",
    catchcopy: "5号機の名作をA＋ARTで完全リメイク。",
    intro: "2026年12月7日導入予定。リアルボーナス、エンジェルチャンス、33Gのエンジェルタイムを重ねる遊びやすいA＋ART機です。",
    points: ["設定1 BONUS合算約1/169.8", "設定6 BONUS合算約1/140.3", "ART純増約0.5枚/G"],
    specs: [["BONUS（設定1）", "約1/169.8"], ["BONUS（設定6）", "約1/140.3"], ["ベース", "約35G/50枚"], ["コイン単価", "約2.3円"], ["ART純増", "約0.5枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "エンジェルチャンス", triggerRate: 220, triggerSuccess: 0.45, mainLabel: "エンジェルタイム", mainRate: 169.8, base50: 35.0, coinUnit: 2.3, normalMin: 120, normalMax: 600, specialLabel: "スペシャルBIG", specialChance: 0.26, specialMin: 252, specialMax: 720, upperChallenge: "エンジェルラッシュ", upperChance: 0.14, upperSuccess: 0.55, upperLabel: "スーパーエンジェルタイム", upperContinue: 0.75, upperPayout: 380, settingRates: { 1: { trigger: 220, main: 169.8, payout: 0.979 }, 2: { trigger: 214, main: 165.0, payout: 0.990 }, 3: { trigger: 205, main: 158.0, payout: 1.010 }, 4: { trigger: 194, main: 151.0, payout: 1.040 }, 5: { trigger: 185, main: 145.0, payout: 1.070 }, 6: { trigger: 176, main: 140.3, payout: 1.091 } } },
    articleSections: [
      { heading: "リアルボーナス搭載A＋ART", paragraphs: ["BONUS合算は設定1約1/169.8から設定6約1/140.3。選ばれた設定の合算確率を使用します。", "SPECIAL BIG約252枚、BIG約203枚、MIDDLE約49枚の違いは獲得幅へまとめています。"] },
      { heading: "33Gのエンジェルタイム", paragraphs: ["BONUS後のエンジェルチャンスから、1セット33G・純増約0.5枚/GのARTへ進みます。", "エンドカード全種類や全小役は再現せず、低コイン単価の遊びやすさと連続結果を比べるモデルです。"] }
    ],
    sources: [["Sammy 公式ティザー", "https://www.youtube.com/watch?v=K5b-qYHcDGQ"], ["スロベース 基本スペック", "https://slobase.jp/machines/twin-angel2"]]
  },
  "blue-reflection-tie": {
    order: 12.0, type: "slot", theme: "ice", year: "2026年12月導入予定", maker: "オリンピア", updated: "2026-11-01",
    name: "Lブルーリフレクション帝", shortName: "ブルーリフレクション帝",
    catchcopy: "大鎌の全刈上乗せから、純増約7.5枚の上位ATへ。",
    intro: "2026年12月21日導入予定。軽めのCZ＋AT合算初当りから、リフレクションチャージ、全刈上乗せ、上位ATへ進みます。",
    points: ["設定1初当り合算約1/162.6", "通常AT純増約4.0枚/G", "上位AT純増約7.5枚/G"],
    specs: [["初当り（設定1）", "約1/162.6"], ["初当り（設定6）", "約1/150.1"], ["通常AT純増", "約4.0枚/G"], ["上位AT純増", "約7.5枚/G"], ["上位挑戦", "成功期待約60%"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "リフレクションチャージ", triggerRate: 162.6, triggerSuccess: 0.50, mainLabel: "BLUE REFLECTION RUSH", mainRate: 330, base50: 32.0, coinUnit: 3.4, normalMin: 220, normalMax: 1000, specialLabel: "全刈上乗せ", specialChance: 0.36, specialMin: 220, specialMax: 1100, upperChallenge: "リフレクションチャレンジ", upperChance: 0.18, upperSuccess: 0.60, upperLabel: "BLUE REFLECTION帝", upperContinue: 0.82, upperPayout: 600, settingRates: { 1: { trigger: 162.6, main: 330, payout: 0.978 }, 2: { trigger: 161.0, main: 324, payout: 0.988 }, 3: { trigger: 158.1, main: 315, payout: 1.008 }, 4: { trigger: 154.8, main: 302, payout: 1.035 }, 5: { trigger: 152.0, main: 292, payout: 1.064 }, 6: { trigger: 150.1, main: 284, payout: 1.106 } } },
    articleSections: [
      { heading: "CZ＋AT合算初当り", paragraphs: ["公表されている初当り合算は設定1約1/162.6から設定6約1/150.1です。", "AT単独確率の未公表部分は比較用代表値とし、実機の確定値として表示しません。"] },
      { heading: "全刈上乗せと上位AT", paragraphs: ["通常ATは純増約4.0枚/Gで、大鎌による全刈上乗せを狙います。", "上位挑戦は成功期待度約60%。2回成功時の上位ATは純増約7.5枚/Gとして獲得幅へ反映します。"] },
      { heading: "導入前情報", paragraphs: ["2026年12月21日導入予定の公表情報を使用しています。", "導入後の解析公開に合わせて設定別AT初当りを更新する予定です。"] }
    ],
    sources: [["P-WORLD 業界ニュース", "https://news.p-world.co.jp/articles/34689/amusement"], ["機種スペック解説", "https://moe-slotpachi.com/moe-pachislot/l-blue-reflection-tie-spec/"]]
  },
  "princess-principal": {
    order: 12.1, type: "pachinko", theme: "emerald", year: "2026年11月", maker: "平和", updated: "2026-11-01",
    name: "eプリンセス・プリンシパル", shortName: "プリンセス・プリンシパル",
    catchcopy: "約1/319.6からSPY RUSHへ。前半当りの半分が6000個以上。",
    intro: "2026年11月2日導入。初当り1500個、RUSH突入50%、継続約75%の出玉振り分け型スマパチです。",
    points: ["大当り約1/319.6", "RUSH突入50%・継続約75%", "RUSH前半の25%で約10500個"],
    specs: [["大当り", "約1/319.6"], ["RUSH突入", "50%"], ["RUSH継続", "約75%"], ["RUSH回数", "14回"], ["初当り出玉", "約1500個"], ["最大振り分け", "約10500個"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 17.3, minSpins: 12, maxSpins: 24, rushLabel: "SPY RUSH", rushEntry: 0.50, rushContinue: 0.75, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.50], [6000, 0.25], [10500, 0.25]] },
    articleSections: [
      { heading: "前半と後半で変わるSPY RUSH", paragraphs: ["初当りは約1/319.6で、1500個獲得後の50%がSPY RUSHへ進みます。", "RUSH前半の大当りは1500個・6000個・10500個、後半成功時は前半へ復帰する流れを、継続約75%の共通モデルにまとめています。"] },
      { heading: "大きな出玉振り分け", paragraphs: ["RUSH前半では25%が約6000個、25%が約10500個です。", "シミュレーターでは複数回大当りを一つの出玉結果として表示し、実機の10回転＋4回転の細かな抽選順序は省略します。"] }
    ],
    sources: [["P-WORLD 新台スケジュール", "https://www.p-world.co.jp/database/machine/introduce_calendar.cgi?type=Pachi"], ["PShort スペック", "https://pshort.jp/pachi/e_princess_principal/"]]
  },
  "granbelm-249": {
    order: 12.2, type: "pachinko", theme: "violet", year: "2026年11月", maker: "サンスリー", updated: "2026-11-01",
    name: "eグランベルム 249ver.", shortName: "eグランベルム 249",
    catchcopy: "約1/249.1から50%で直LT。継続約75%の130回RUSH。",
    intro: "2026年11月2日導入。319ver.の上乗せ性能を残しながら、初当りを約1/249.1へ軽くした直LTタイプです。",
    points: ["大当り約1/249.1", "LT突入50%・継続約75%", "1500〜4500個＋上乗せ"],
    specs: [["大当り", "約1/249.1"], ["LT突入", "50%"], ["RUSH継続", "約75%"], ["ST", "130回"], ["初当り出玉", "約480個"], ["RUSH出玉", "1500〜4500個"]],
    sim: { kind: "pachinko", hitRate: 249.1, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 18.0, minSpins: 12, maxSpins: 25, rushLabel: "グランベルムRUSH", rushEntry: 0.50, rushContinue: 0.75, firstPayoutIn: 480, firstPayoutOut: 480, rushPayouts: [[1500, 0.40], [3000, 0.32], [4500, 0.08], [0, 0.20]] },
    articleSections: [
      { heading: "約1/249.1の直LT", paragraphs: ["初当りの50%で130回のグランベルムRUSHへ突入し、継続率は約75%です。", "319ver.より初当りが軽く、同じ固定貸玉・交換率で投資差を比べられます。"] },
      { heading: "RESTARTと出玉上乗せ", paragraphs: ["RUSH中は1500個・3000個・4500個に加え、出玉なしのRESTARTがあります。", "RESTARTは0個の継続結果として扱い、超アドレナリンBOOSTの連続上乗せは代表出玉へまとめています。"] }
    ],
    sources: [["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4807/1/7"], ["情報島＋ スペック", "https://p-johojima.jp/machine_spec/post-40142/"]]
  },
  "bastard-light": {
    order: 12.3, type: "pachinko", theme: "flame", year: "2026年12月導入予定", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバーBASTARD!! -暗黒の破壊神- Light ver.", shortName: "BASTARD!! Light",
    catchcopy: "約1/99.9・RUSH突入100%。残保留から継続約75%の上位へ。",
    intro: "2026年12月7日導入予定。初当り後は必ずバスタードRUSHへ進む、遊びやすい甘デジLTです。",
    points: ["図柄揃い約1/99.9", "RUSH突入100%・継続約63%", "上位継続約75%"],
    specs: [["図柄揃い", "約1/99.9"], ["RUSH突入", "100%"], ["下位継続", "約63%"], ["上位継続", "約75%"], ["初当り出玉", "約140個"], ["上位出玉", "700〜2100個"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "図柄揃い", startType: "通常スタート", spinsPer1k: 18.5, minSpins: 13, maxSpins: 26, rushLabel: "バスタードRUSH", rushEntry: 1.00, rushContinue: 0.63, firstPayoutIn: 140, firstPayoutOut: 140, rushPayouts: [[350, 0.504], [700, 0.496]], upperLabel: "超バスタードRUSH", upperDirectChance: 0.005, upperUpgradeChance: 0.08, upperContinue: 0.75 },
    articleSections: [
      { heading: "初当り後は必ずRUSH", paragraphs: ["通常時の図柄揃いは約1/99.9で、約140個獲得後は100%バスタードRUSHへ進みます。", "下位RUSHは6回＋残保留4個、合算継続約63%です。"] },
      { heading: "残保留から上位RUSH", paragraphs: ["残保留での大当りは超バスタードRUSHへ進み、継続率は約75%です。", "残保留到達回数の詳細は公開値から独立計算できないため、上位昇格はサイト内の比較用抽選です。実機の昇格確率として扱いません。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10578"], ["導入前発表記事", "https://parlourfullslotl.com/archives/187002"]]
  },
  "megami-cafe-collection": {
    order: 12.4, type: "pachinko", theme: "sakura", year: "2026年12月導入予定", maker: "JFJ", updated: "2026-11-01",
    name: "e女神のカフェテラス ヒロインsコレクション", shortName: "女神のカフェテラス コレクション",
    catchcopy: "SSルート×BIGスタート。図柄揃いから4500個と上位RUSHへ。",
    intro: "2026年12月7日導入予定。女神ジャッジと役物を通して図柄揃いを目指し、4500個以上のBONUSへ進むスマパチです。",
    points: ["女神ジャッジ約1/39", "図柄揃い実質約1/1248", "上位RUSH継続約70%"],
    specs: [["女神ジャッジ", "約1/39"], ["ジャッジ成功", "約1/2"], ["攻略成功", "約1/16"], ["図柄揃い", "実質約1/1248"], ["上位突入", "約48%"], ["上位継続", "約70%"]],
    sim: { kind: "pachinko", hitRate: 1248, hitLabel: "図柄揃い", startType: "SSルート×BIGスタート", spinsPer1k: 45.0, minSpins: 30, maxSpins: 60, rushLabel: "ハーレムチャレンジBONUS", rushEntry: 1.00, rushContinue: 0.70, firstPayoutIn: 4500, firstPayoutOut: 4500, rushPayouts: [[1500, 0.33], [4500, 0.67]], upperLabel: "超ハーレムRUSH", upperDirectChance: 0.48, upperContinue: 0.70 },
    articleSections: [
      { heading: "三段階で図柄揃いを目指す", paragraphs: ["ノーマルモードの目安は女神ジャッジ約1/39、成功約1/2、ヒロイン攻略約1/16です。", "サイトでは三段階を実質約1/1248の図柄揃いへまとめ、BIGスタートの固定回転率で投資を計算します。"] },
      { heading: "4500個から超ハーレムRUSHへ", paragraphs: ["図柄揃い時は4500個以上のハーレムチャレンジBONUSへ進み、上位チャレンジ成功期待は約48%です。", "役物挙動やジャッジ確率変動システムの全モードは再現せず、図柄揃いと上位当落を簡易体験します。"] }
    ],
    sources: [["遊技日本 発表記事", "https://yugi-nippon.com/pachinko-new-machine/post-80057/"], ["スペック・ゲームフロー", "https://chonborista.com/pachinko/fujishouji/272583/"]]
  },
  "vivy-slot": {
    order: 12.5, type: "slot", theme: "ice", year: "2026年11月", maker: "大都技研", updated: "2026-11-01",
    name: "スロット Vivy -Fluorite Eye's Song-", shortName: "スマスロ Vivy",
    catchcopy: "レア役再生から純増約3.2枚の差枚数ATへ。上位ATなしの一本道。",
    intro: "2026年11月2日導入。周期とアクセスチャンスから、差枚数管理ATプロジェクトシンギュラリティを目指します。",
    points: ["設定1 AT約1/276.5", "設定6 AT約1/210.3", "AT純増約3.2枚/G"],
    specs: [["AT（設定1）", "約1/276.5"], ["AT（設定6）", "約1/210.3"], ["ベース", "約31G/50枚"], ["コイン単価", "約3.0円"], ["AT純増", "約3.2枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "アクセスチャンス", triggerRate: 180, triggerSuccess: 0.65, mainLabel: "プロジェクトシンギュラリティ", mainRate: 276.5, base50: 31.0, coinUnit: 3.0, normalMin: 180, normalMax: 900, specialLabel: "OVER DRIVE", specialChance: 0.32, specialMin: 220, specialMax: 710, upperChallenge: "Fluorite Eye's Strike", upperChance: 0.14, upperSuccess: 0.55, upperLabel: "プレミアム上乗せ", upperContinue: 0.50, upperPayout: 800, settingRates: { 1: { main: 276.5, payout: 0.977 }, 2: { main: 251.7, payout: 0.987 }, 3: { main: 272.1, payout: 1.002 }, 4: { main: 222.8, payout: 1.047 }, 5: { main: 235.9, payout: 1.083 }, 6: { main: 210.3, payout: 1.128 } } },
    articleSections: [
      { heading: "偶数設定が軽いAT初当り", paragraphs: ["AT初当りは設定1約1/276.5から設定6約1/210.3で、設定4が設定5より軽い公開値をそのまま使用します。", "設定1〜6を均等抽選し、結果とランキングで抽選設定を表示します。"] },
      { heading: "上位ATのない差枚数管理AT", paragraphs: ["ATは初期100枚＋α、純増約3.2枚/G。SINGULARITY BATTLE、OVER DRIVE、マツモトチャンスで枚数を伸ばします。", "上位ATはないため、最終段階はFluorite Eye's Strikeなどの大きな上乗せ結果として表現します。"] }
    ],
    sources: [["パチ＆スロ必勝本 AT解説", "https://p.hisshobon.jp/machine/4842/1/14"], ["設定差・基本スペック", "https://slothack.net/matome/206904/"]]
  },
  "haihai-shiosai-re": {
    order: 12.6, type: "slot", theme: "ocean", year: "2026年11月導入予定", maker: "パイオニア", updated: "2026-11-01",
    name: "スマート沖スロ ハイハイシオサイRe", shortName: "ハイハイシオサイRe",
    catchcopy: "ハイビスカス告知から約360枚BIG。32G天国と1G連を狙う。",
    intro: "2026年11月16日導入予定。BIG約360枚・REG約120枚と、32G以内の天国連を組み合わせた完全告知タイプです。",
    points: ["設定1合算約1/193.3", "設定6合算約1/150.3", "BIG約360枚・純増約9枚/G"],
    specs: [["合算（設定1）", "約1/193.3"], ["合算（設定6）", "約1/150.3"], ["BIG", "約360枚"], ["REG", "約120枚"], ["天国", "32G以内"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "ハイビスカス告知", triggerRate: 193.3, triggerSuccess: 0.72, mainLabel: "BIG BONUS", mainRate: 193.3, base50: 32.0, coinUnit: 3.9, normalMin: 120, normalMax: 480, specialLabel: "BIG 1G連", specialChance: 0.24, specialMin: 360, specialMax: 720, upperChallenge: "天国32G", upperChance: 0.50, upperSuccess: 0.55, upperLabel: "ハイシオ天国", upperContinue: 0.82, upperPayout: 360, settingRates: { 1: { trigger: 193.3, main: 193.3, payout: 0.974 }, 2: { trigger: 188.4, main: 188.4, payout: 0.987 }, 4: { trigger: 168.0, main: 168.0, payout: 1.045 }, 5: { trigger: 161.9, main: 161.9, payout: 1.069 }, 6: { trigger: 150.3, main: 150.3, payout: 1.114 } } },
    articleSections: [
      { heading: "実機搭載の5段階設定", paragraphs: ["設定は1・2・4・5・6から均等抽選し、設定3は抽選しません。ボーナス合算は設定1約1/193.3から設定6約1/150.3です。", "結果とランキングには抽選設定を表示します。"] },
      { heading: "BIG約360枚と32G天国", paragraphs: ["BIGは約360枚、REGは約120枚。BIG当選時の約50%で天国へ進み、32G以内の連チャンを狙います。", "ハイシオ天国の平均連数は簡易ループへまとめ、全ボーナス比率は完全再現しません。"] }
    ],
    sources: [["P-WORLD 新台スケジュール", "https://www.p-world.co.jp/database/machine/introduce_calendar.cgi?type=Pachi"], ["スペック・天国解説", "https://tennabi.jp/haihai-shiosai-re/"]]
  },
  "akamata-slot": {
    order: 12.7, type: "slot", theme: "crimson", year: "2026年12月導入予定", maker: "オーイズミ", updated: "2026-11-01",
    name: "Lアカマター", shortName: "Lアカマター",
    catchcopy: "純増約6枚の疑似ボーナス。32G天国からボトルキープ連へ。",
    intro: "2026年12月7日導入予定。3種類の疑似ボーナス、天国、1G連ストック、約75%ループのバブリーモードを搭載します。",
    points: ["設定1初当り約1/330.0", "設定6初当り約1/277.4", "バブリーモード約75%ループ"],
    specs: [["初当り（設定1）", "約1/330.0"], ["初当り（設定6）", "約1/277.4"], ["ベース", "約28.2G/50枚"], ["コイン単価", "約4.1円"], ["ボーナス純増", "約6.0枚/G"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "ハブランプ告知", triggerRate: 330.0, triggerSuccess: 0.55, mainLabel: "疑似ボーナス", mainRate: 330.0, base50: 28.2, coinUnit: 4.1, normalMin: 180, normalMax: 720, specialLabel: "ボトルキープ連", specialChance: 0.34, specialMin: 210, specialMax: 900, upperChallenge: "天国3連", upperChance: 0.20, upperSuccess: 0.55, upperLabel: "バブリーモード", upperContinue: 0.75, upperPayout: 600, settingRates: { 1: { trigger: 330.0, main: 330.0, payout: 0.972 }, 2: { trigger: 317.3, main: 317.3, payout: 0.990 }, 4: { trigger: 304.5, main: 304.5, payout: 1.020 }, 5: { trigger: 289.5, main: 289.5, payout: 1.060 }, 6: { trigger: 277.4, main: 277.4, payout: 1.125 } } },
    articleSections: [
      { heading: "5段階設定の初当り", paragraphs: ["実機搭載設定1・2・4・5・6から均等抽選し、初当り約1/330.0〜約1/277.4を個別に使います。", "設定3は未搭載扱いとして抽選対象から外します。"] },
      { heading: "ボトルキープとバブリーモード", paragraphs: ["疑似ボーナスは約90枚・210枚・300枚で、いずれも純増約6.0枚/Gです。", "32G天国でボトルを3個貯めた先のバブリーモードは約75%ループ。未公表の天国移行率はサイト内比較用抽選です。"] }
    ],
    sources: [["遊技日本 発表記事", "https://yugi-nippon.com/pachinko-new-machine/post-79802/"], ["設定別スペック解説", "https://pachislot.win/l-akamater-guide/"]]
  },
  "majo-to-yajuu-slot": {
    order: 12.8, type: "slot", theme: "violet", year: "2026年12月導入予定", maker: "オレンジ", updated: "2026-11-01",
    name: "スマスロ 魔女と野獣", shortName: "スマスロ 魔女と野獣",
    catchcopy: "CZ突破から7GのSTへ。純増約9枚、上位BEAST MODEは約80%。",
    intro: "2026年12月21日導入予定。レゾナンスチャンスを突破し、ボーナスと7G STを重ねて上位BEAST MODEを目指します。",
    points: ["設定2 AT約1/383.2", "通常ST継続約70%", "上位ST継続約80%"],
    specs: [["CZ（設定2）", "約1/229.2"], ["AT（設定2）", "約1/383.2"], ["AT（設定6）", "約1/353.3"], ["ベース", "約30G/50枚"], ["コイン単価", "約4.7円"], ["設定", "2〜6"]],
    sim: { kind: "slot", settingPool: [2, 3, 4, 5, 6], triggerLabel: "レゾナンスチャンス", triggerRate: 229.2, triggerSuccess: 0.53, mainLabel: "Witch and the Beast", mainRate: 383.2, base50: 30.0, coinUnit: 4.7, normalMin: 250, normalMax: 1200, specialLabel: "チャレンジボーナス", specialChance: 0.34, specialMin: 250, specialMax: 1200, upperChallenge: "永遠なる魔女", upperChance: 0.20, upperSuccess: 0.70, upperLabel: "BEAST MODE", upperContinue: 0.80, upperPayout: 650, settingRates: { 2: { trigger: 229.2, main: 383.2, payout: 0.979 }, 3: { trigger: 226.5, main: 381.6, payout: 0.991 }, 4: { trigger: 216.0, main: 372.2, payout: 1.041 }, 5: { trigger: 206.5, main: 360.7, payout: 1.092 }, 6: { trigger: 197.1, main: 353.3, payout: 1.137 } } },
    articleSections: [
      { heading: "設定2〜6の公開値", paragraphs: ["実機の設定2・3・4・5・6から均等抽選し、CZ約1/229.2〜約1/197.1、AT約1/383.2〜約1/353.3を個別に使います。", "設定1は抽選せず、結果とランキングには実際に選ばれた設定を表示します。"] },
      { heading: "7G STから上位へ", paragraphs: ["メインSTは7G・継続期待約70%、上位BEAST MODEは7G・継続約80%です。", "純増約9.0枚/G、150〜3000枚のボーナス幅を簡易獲得枚数にまとめています。"] }
    ],
    sources: [["P-WORLD 新台スケジュール", "https://www.p-world.co.jp/database/machine/introduce_calendar.cgi?type=Pachi"], ["導入前スペック解説", "https://slothack.net/matome/203221/"]]
  },
  "unicorn2-sairai": {
    order: 12.9, type: "pachinko", theme: "ice", year: "2024年8月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバー機動戦士ガンダムユニコーン 再来", shortName: "ユニコーン2 再来",
    catchcopy: "約1/349.9からデストロイRUSHへ。覚醒HYPERは継続約85%。",
    intro: "転落抽選型のデストロイRUSHから、ラッキートリガーの覚醒HYPERを目指すスマパチです。",
    points: ["大当り約1/349.9", "RUSH突入約50.5%・継続約72%", "覚醒HYPER継続約85%"],
    specs: [["大当り", "約1/349.9"], ["RUSH突入", "約50.5%"], ["下位継続", "約72%"], ["上位継続", "約85%"], ["RUSH出玉", "約1500個"], ["上位移行", "下位当りの約25%"]],
    sim: { kind: "pachinko", hitRate: 349.9, hitLabel: "初当り", startType: "超デカSTART", spinsPer1k: 25.0, minSpins: 18, maxSpins: 35, rushLabel: "デストロイRUSH", rushEntry: 0.505, rushContinue: 0.72, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 1.00]], upperLabel: "覚醒HYPER", upperDirectChance: 0.005, upperUpgradeChance: 0.25, upperContinue: 0.85 },
    articleSections: [
      { heading: "約1/349.9と超デカSTART", paragraphs: ["通常時の大当りは約1/349.9。サイトでは超デカSTARTを25.0回/1,000円の比較用固定値として投資を計算します。", "実店舗の回転率は台や調整で変わるため、表示値は実戦の回転率を保証しません。"] },
      { heading: "転落式RUSHから覚醒HYPERへ", paragraphs: ["初当りの約50.5%でデストロイRUSHへ進み、残保留を含む継続率は約72%です。", "RUSH中大当りの約25%で覚醒HYPERへ移行し、継続率約85%として連チャンを抽選します。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10080"], ["SANKYO 製品資料", "https://www.sankyo-fever.jp/products/assets/pdf/pud/pud_mp_p.pdf"]]
  },
  "rezero-season2": {
    order: 13.0, type: "pachinko", theme: "ice", year: "2023年11月", maker: "大都技研", updated: "2026-11-01",
    name: "e Re:ゼロから始める異世界生活 season2", shortName: "リゼロ season2",
    catchcopy: "約1/349.9、初当りの55%が3000個＋RUSH。ST145回・継続約77%。",
    intro: "初当り3000個＋αと強欲RUSHを組み合わせた、ロングSTタイプのスマパチです。",
    points: ["大当り約1/349.9", "RUSH突入55%", "ST145回・継続約77%"],
    specs: [["大当り", "約1/349.9"], ["RUSH中", "約1/99.9"], ["RUSH突入", "55%"], ["RUSH継続", "約77%"], ["ST", "145回"], ["右打ち出玉", "300〜3000個"]],
    sim: { kind: "pachinko", hitRate: 349.9, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 16.5, minSpins: 12, maxSpins: 22, rushLabel: "強欲RUSH", rushEntry: 0.55, rushContinue: 0.77, firstPayoutIn: 3000, firstPayoutOut: 1500, rushPayouts: [[300, 0.20], [1500, 0.55], [3000, 0.25]] },
    articleSections: [
      { heading: "初当り55%で3000個＋RUSH", paragraphs: ["通常時は約1/349.9で抽選し、55%で約3000個獲得後に強欲RUSHへ進みます。", "非突入時は約1500個として、初当り後の出玉差を結果へ反映します。"] },
      { heading: "145回のロングST", paragraphs: ["RUSH中は約1/99.9、ST145回、継続率約77%です。", "右打ちの300個・1500個・3000個振り分けを使い、連チャンごとの出玉を計算します。"] }
    ],
    sources: [["スロパチキュインDX 基本スペック", "https://suropachi-qin.com/pc_machine/pc2/"], ["一撃 新機種発表", "https://1geki.jp/repo/20231010daito/"]]
  },
  "madoka3-pachinko": {
    order: 13.1, type: "pachinko", theme: "sakura", year: "2024年6月", maker: "オッケー.", updated: "2026-11-01",
    name: "P 魔法少女まどか☆マギカ3", shortName: "まどか☆マギカ3",
    catchcopy: "約1/199.9からマギカRUSHへ。上位はST124回・継続約87%。",
    intro: "ライトミドルの下位RUSHからワルプルギスの夜を突破し、アルティメット超RUSHを目指します。",
    points: ["大当り約1/199.9", "RUSH突入55%", "上位継続約87%・ALL1500個"],
    specs: [["大当り", "約1/199.9"], ["右打ち中", "約1/62.2"], ["RUSH突入", "55%"], ["下位継続", "約65%"], ["上位継続", "約87%"], ["右打ち出玉", "約1500個"]],
    sim: { kind: "pachinko", hitRate: 199.9, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 17.5, minSpins: 12, maxSpins: 24, rushLabel: "マギカRUSH", rushEntry: 0.55, rushContinue: 0.65, firstPayoutIn: 400, firstPayoutOut: 400, rushPayouts: [[1500, 1.00]], upperLabel: "アルティメット超RUSH", upperDirectChance: 0.01, upperUpgradeChance: 0.275, upperContinue: 0.87 },
    articleSections: [
      { heading: "約1/199.9・RUSH突入55%", paragraphs: ["初当りの54%がマギカRUSH、1%がアルティメット超RUSHへ直行し、合計突入率は55%です。", "通常初当りは約400個として固定条件の投資・収支を計算します。"] },
      { heading: "ワルプルギスの夜から上位へ", paragraphs: ["マギカRUSHは60回＋残保留4個、継続約65%。右打ち大当りの約50%で上位挑戦へ進み、その約55%で成功します。", "上位は120回＋残保留4個、継続約87%、大当りは約1500個です。"] }
    ],
    sources: [["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4309/1/102109"], ["P-WORLD 業界ニュース", "https://news.p-world.co.jp/articles/27562/nippon"]]
  },
  "bancho-otoko-no-itadaki": {
    order: 13.2, type: "pachinko", theme: "flame", year: "2025年2月", maker: "大都技研", updated: "2026-11-01",
    name: "eぱちんこ押忍！番長 漢の頂", shortName: "押忍！番長 漢の頂",
    catchcopy: "約1/179.5から25%で頂RUSH。右打ちの70%が3000個。",
    intro: "ライトミドルの初当りからラッキートリガーへ直行し、高継続と3000個振り分けを狙います。",
    points: ["大当り約1/179.5", "RUSH突入25%・継続約80%", "RUSH中70%で約3000個"],
    specs: [["大当り", "約1/179.5"], ["RUSH中", "約1/99.5"], ["RUSH突入", "25%"], ["RUSH継続", "約80%"], ["ST", "157回"], ["初当り出玉", "約750個"]],
    sim: { kind: "pachinko", hitRate: 179.5, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 17.5, minSpins: 12, maxSpins: 24, rushLabel: "頂RUSH", rushEntry: 0.25, rushContinue: 0.80, firstPayoutIn: 750, firstPayoutOut: 750, rushPayouts: [[300, 0.30], [3000, 0.70]] },
    articleSections: [
      { heading: "25%で頂RUSHへ", paragraphs: ["通常時は約1/179.5で大当りし、全初当りで約750個を獲得。25%で頂RUSHへ進みます。", "突入率が低い一方、突入後はST157回・継続約80%です。"] },
      { heading: "RUSH中70%が3000個", paragraphs: ["右打ち大当りは70%が約3000個、30%が約300個です。", "3000個は複数回の大当りを合算した払い出しとして一つの結果へまとめています。"] }
    ],
    sources: [["スロパチキュインDX 基本スペック", "https://suropachi-qin.com/pc_machine/pc10/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10218"]]
  },
  "monster-hunter-rise-slot": {
    order: 13.3, type: "slot", theme: "emerald", year: "2024年11月", maker: "アデリオン", updated: "2026-11-01",
    name: "スマスロ モンスターハンターライズ", shortName: "モンハンライズ",
    catchcopy: "クエストから狩猟ボーナスへ。設定1約1/309.5〜設定6約1/230.8。",
    intro: "超抽選バトル、剥ぎ取りチャンス、上位の気焔万丈へ進む狩猟型スマスロです。",
    points: ["設定1 AT約1/309.5", "設定6 AT約1/230.8", "AT純増約2.7枚/G"],
    specs: [["AT（設定1）", "約1/309.5"], ["AT（設定6）", "約1/230.8"], ["ベース", "約32.7G/50枚"], ["通常AT純増", "約2.7枚/G"], ["上位純増", "約4.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "クエスト", triggerRate: 155, triggerSuccess: 0.50, mainLabel: "狩猟ボーナス", mainRate: 309.5, base50: 32.7, coinUnit: 3.2, normalMin: 180, normalMax: 1000, specialLabel: "剥ぎ取りチャンス", specialChance: 0.36, specialMin: 180, specialMax: 1000, upperChallenge: "百竜夜行", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "気焔万丈", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { main: 309.5, payout: 0.979 }, 2: { main: 301.4, payout: 0.988 }, 3: { main: 290.8, payout: 1.003 }, 4: { main: 256.4, payout: 1.054 }, 5: { main: 237.1, payout: 1.101 }, 6: { main: 230.8, payout: 1.143 } } },
    articleSections: [
      { heading: "設定1〜6のAT初当り", paragraphs: ["狩猟ボーナス初当りは設定1約1/309.5から設定6約1/230.8。開始時に設定1〜6を均等抽選します。", "選ばれた設定は最終結果、マイ記録、機種別ランキングへ保存します。"] },
      { heading: "超抽選バトルと剥ぎ取り", paragraphs: ["狩猟ボーナスは純増約2.7枚/G。討伐後の剥ぎ取りチャンスで次の報酬を狙います。", "全モンスター、全小役、部位破壊の細かな抽選は簡易獲得枚数へまとめています。"] }
    ],
    sources: [["パチナビ 設定別スペック", "https://pachinavi.net/machines/smasloth-monster-hunter-rise/settei/"], ["パチヨミ 基本スペック", "https://pachiyomi.com/slot/l-monster-hunter-rise"]]
  },
  "tokyo-revengers-slot": {
    order: 13.4, type: "slot", theme: "gold", year: "2025年9月", maker: "サミー", updated: "2026-11-01",
    name: "スマスロ 東京リベンジャーズ", shortName: "東京リベンジャーズ",
    catchcopy: "周期から東卍RUSHへ。上位は純増約8枚・継続約80%。",
    intro: "東卍チャンスとBREAK CHANCEを重ね、上位ATの天上天下唯我独尊を目指します。",
    points: ["設定1 AT約1/482.2", "設定6 AT約1/373.1", "上位純増約8.0枚/G"],
    specs: [["AT（設定1）", "約1/482.2"], ["AT（設定6）", "約1/373.1"], ["ベース", "約32G/50枚"], ["通常AT純増", "約3.2枚/G"], ["上位純増", "約8.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "東卍チャンス", triggerRate: 282.4, triggerSuccess: 0.46, mainLabel: "東卍RUSH", mainRate: 482.2, base50: 32.0, coinUnit: 3.6, normalMin: 240, normalMax: 1100, specialLabel: "BREAK CHANCE", specialChance: 0.36, specialMin: 220, specialMax: 1000, upperChallenge: "リベンジチャンス", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "天上天下唯我独尊", upperContinue: 0.80, upperPayout: 700, settingRates: { 1: { trigger: 282.4, main: 482.2, payout: 0.978 }, 2: { trigger: 277.2, main: 474.7, payout: 0.988 }, 3: { trigger: 270.1, main: 456.9, payout: 1.014 }, 4: { trigger: 255.8, main: 414.0, payout: 1.063 }, 5: { trigger: 248.3, main: 393.8, payout: 1.112 }, 6: { trigger: 240.1, main: 373.1, payout: 1.149 } } },
    articleSections: [
      { heading: "周期抽選とAT初当り", paragraphs: ["初当り合算は設定1約1/282.4〜設定6約1/240.1、東卍RUSH初当りは約1/482.2〜約1/373.1です。", "サイトでは東卍チャンスを経由する段階とAT初当りを分けて表示します。"] },
      { heading: "上位ATは純増約8枚", paragraphs: ["通常ATの東卍RUSHは純増約3.2枚/G。BREAK CHANCEの報酬を獲得しながら継続します。", "上位AT『天上天下唯我独尊』は純増約8.0枚/G・継続約80%として簡易抽選します。"] }
    ],
    sources: [["天井ナビ 設定別スペック", "https://tenjo-navi.com/machines/smart-tokyo-revengers/"], ["P-WORLD 業界ニュース", "https://news.p-world.co.jp/articles/31329/greenbelt"]]
  },
  "shin-onimusha3-slot": {
    order: 13.5, type: "slot", theme: "flame", year: "2025年10月", maker: "レオスター", updated: "2026-11-01",
    name: "スマスロ 新鬼武者3", shortName: "新鬼武者3",
    catchcopy: "周期と鬼斬チャージから蒼剣RUSHへ。真蒼剣RUSHは純増約5.5枚。",
    intro: "ゲーム数上乗せとセット継続を重ね、期待枚数約3600枚の上位ATを目指します。",
    points: ["設定1 AT約1/379.7", "設定6 AT約1/293.1", "上位純増約5.5枚/G"],
    specs: [["AT（設定1）", "約1/379.7"], ["AT（設定6）", "約1/293.1"], ["ベース", "約33G/50枚"], ["通常AT純増", "約2.5枚/G"], ["上位純増", "約5.5枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "鬼斬チャージ", triggerRate: 190, triggerSuccess: 0.48, mainLabel: "蒼剣RUSH", mainRate: 379.7, base50: 33.0, coinUnit: 3.3, normalMin: 220, normalMax: 1050, specialLabel: "蒼剣BONUS", specialChance: 0.34, specialMin: 220, specialMax: 1000, upperChallenge: "覚醒チャレンジ", upperChance: 0.17, upperSuccess: 0.55, upperLabel: "真蒼剣RUSH", upperContinue: 0.89, upperPayout: 650, settingRates: { 1: { main: 379.7, payout: 0.975 }, 2: { main: 372.7, payout: 0.983 }, 3: { main: 352.8, payout: 1.002 }, 4: { main: 306.5, payout: 1.052 }, 5: { main: 297.9, payout: 1.092 }, 6: { main: 293.1, payout: 1.130 } } },
    articleSections: [
      { heading: "設定別AT初当り", paragraphs: ["蒼剣RUSH初当りは設定1約1/379.7から設定6約1/293.1。機械割は97.5%〜113.0%です。", "開始時に設定1〜6を均等抽選し、結果画面で発表します。"] },
      { heading: "蒼剣RUSHから真蒼剣RUSHへ", paragraphs: ["通常ATは純増約2.5枚/G、ボーナスは約4.6枚/G。ゲーム数上乗せとセット継続で出玉を伸ばします。", "上位の真蒼剣RUSHは純増約5.5枚/G・継続率89%として簡易化しています。"] }
    ],
    sources: [["なな徹 設定別スペック", "https://nana-press.com/kaiseki/machine/1015/31758/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10349"]]
  },
  "super-blackjack-slot": {
    order: 13.6, type: "slot", theme: "crimson", year: "2025年2月", maker: "山佐ネクスト", updated: "2026-11-01",
    name: "L スーパーブラックジャック", shortName: "スーパーブラックジャック",
    catchcopy: "ボーナスからリオチャンス高確へ。設定1約1/241.7〜設定6約1/181.3。",
    intro: "疑似ボーナスとリオチャンスを連鎖させ、ストックと高確率状態で出玉を伸ばします。",
    points: ["設定1初当り約1/241.7", "設定6初当り約1/181.3", "高純増区間約5.1枚/G"],
    specs: [["初当り（設定1）", "約1/241.7"], ["初当り（設定6）", "約1/181.3"], ["ベース", "約31.4G/50枚"], ["通常純増", "約0.4枚/G"], ["ボーナス純増", "約5.1枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "リオチャンス高確率", triggerRate: 241.7, triggerSuccess: 0.54, mainLabel: "BIG BONUS", mainRate: 241.7, base50: 31.4, coinUnit: 3.0, normalMin: 120, normalMax: 650, specialLabel: "STOCK TIME", specialChance: 0.34, specialMin: 180, specialMax: 900, upperChallenge: "スペシャルステージ", upperChance: 0.16, upperSuccess: 0.55, upperLabel: "SUPER RIO CHANCE", upperContinue: 0.80, upperPayout: 500, settingRates: { 1: { main: 241.7, payout: 0.978 }, 2: { main: 238.8, payout: 0.987 }, 3: { main: 235.9, payout: 1.001 }, 4: { main: 201.8, payout: 1.057 }, 5: { main: 194.9, payout: 1.100 }, 6: { main: 181.3, payout: 1.127 } } },
    articleSections: [
      { heading: "設定別ボーナス初当り", paragraphs: ["ボーナス初当りは設定1約1/241.7から設定6約1/181.3。設定4以上で差が大きくなる公開値を使います。", "設定は開始時に均等抽選し、結果とランキングに保存します。"] },
      { heading: "ボーナスとリオチャンス", paragraphs: ["BIG後はリオチャンス高確率へ進み、ボーナスの連鎖を狙います。", "通常時約0.4枚/Gとボーナス約5.1枚/Gの速度差は、獲得枚数の幅として簡易表現しています。"] }
    ],
    sources: [["萌えスロパチ大百科 基本スペック", "https://moe-slotpachi.com/moe-pachislot/sbj-spec/"], ["スロパチキュインDX 機種解説", "https://suropachi-qin.com/ps_machine/ps7/"]]
  },
  "blue-lock-pachinko": {
    order: 13.7, type: "pachinko", theme: "ice", year: "2025年9月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバーブルーロック", shortName: "eFブルーロック",
    catchcopy: "図柄揃い約1/399.9から、約55%でエゴイストRUSHへ。",
    intro: "転落抽選型のRUSHで、1500個から9000個以上の大きな出玉を狙うスマパチです。",
    points: ["図柄揃い約1/399.9", "RUSH突入約55%", "RUSH継続約77%"],
    specs: [["図柄揃い", "約1/399.9"], ["RUSH中", "約1/33.2"], ["RUSH突入", "約55%"], ["RUSH継続", "約77%"], ["初当り出玉", "300〜1500個"], ["右打ち出玉", "1500〜9000個以上"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常スタート", spinsPer1k: 17.0, minSpins: 12, maxSpins: 23, rushLabel: "エゴイストRUSH", rushEntry: 0.55, rushContinue: 0.77, firstPayoutIn: 1050, firstPayoutOut: 1050, rushPayouts: [[1500, 0.45], [3000, 0.25], [4500, 0.15], [6000, 0.10], [9000, 0.05]] },
    articleSections: [
      { heading: "約1/399.9からRUSHへ", paragraphs: ["通常時の図柄揃いは約1/399.9で、トータル約55%がRUSHへ進みます。", "RUSHは転落抽選型で、継続率約77%として連チャンを簡易抽選します。"] },
      { heading: "1500個から9000個以上", paragraphs: ["右打ちの公表出玉範囲は1500個、3000個、4500個、6000個、9000個以上です。", "各出玉の比較用振り分けはサイト独自の固定値であり、実機の公表振り分けではありません。"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/pwr/spec/"], ["SANKYO 製品資料", "https://www.sankyo-fever.jp/products/assets/pdf/pwr/pwr_mp.pdf"]]
  },
  "tokyo-revengers-pachinko": {
    order: 13.8, type: "pachinko", theme: "gold", year: "2025年7月", maker: "サミー", updated: "2026-11-01",
    name: "e 東京リベンジャーズ", shortName: "e東京リベンジャーズ",
    catchcopy: "約1/319.7から、時短引き戻し込み約61%で芭流覇羅決戦へ。",
    intro: "ST144回・継続約77%と、右打ちの半分を占める3000個以上を組み合わせたスマパチです。",
    points: ["大当り約1/319.7", "RUSH突入約61%", "ST144回・継続約77%"],
    specs: [["大当り", "約1/319.7"], ["RUSH中", "約1/99.9"], ["RUSH突入", "約61%"], ["RUSH継続", "約77%"], ["ST", "144回"], ["右打ち50%", "3000個以上"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 17.0, minSpins: 12, maxSpins: 23, rushLabel: "芭流覇羅決戦", rushEntry: 0.61, rushContinue: 0.77, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 0.50], [3000, 0.475], [4500, 0.025]] },
    articleSections: [
      { heading: "直行50%＋時短引き戻し", paragraphs: ["通常時大当りは約1/319.7。直行50%と時短100回の引き戻しを合わせ、トータル約61%でRUSHへ進みます。", "時短中は約1/399.6、引き戻し期待度は約22.2%です。"] },
      { heading: "右打ちの50%が3000個以上", paragraphs: ["芭流覇羅決戦はST144回・継続約77%。右打ち大当りの50%が3000個以上です。", "一部の渋谷JACKによる上乗せループは4500個の代表結果へ簡略化しています。"] }
    ],
    sources: [["フィールズ 販売実績資料", "https://f.irbank.net/pdf/20251107/140120251107591307.pdf"], ["機種紹介資料", "https://slotto.com.tw/data/attachment/product/202510/hbzmua5zap.pdf"]]
  },
  "kanokari-pachinko": {
    order: 13.9, type: "pachinko", theme: "sakura", year: "2025年6月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバー彼女、お借りします", shortName: "eFかのかり",
    catchcopy: "超デカSTARTからDREAM RUSHへ。2回当りで継続約82%の極へ。",
    intro: "大きなスタート入賞口と1500〜6000個の右打ち出玉を備えた、二段階RUSHタイプです。",
    points: ["図柄揃い約1/349.9", "図柄揃い時RUSH約52%", "上位継続約82%"],
    specs: [["図柄揃い", "約1/349.9"], ["右打ち中", "約1/59.4"], ["図柄揃い時RUSH", "約52%"], ["下位継続", "約70%"], ["上位継続", "約82%"], ["右打ち出玉", "1500〜6000個"]],
    sim: { kind: "pachinko", hitRate: 349.9, hitLabel: "図柄揃い", startType: "超デカSTART", spinsPer1k: 30.0, minSpins: 22, maxSpins: 38, rushLabel: "DREAM RUSH", rushEntry: 0.52, rushContinue: 0.70, firstPayoutIn: 600, firstPayoutOut: 600, rushPayouts: [[1500, 0.46], [2400, 0.39], [3300, 0.13], [6000, 0.02]], upperLabel: "DREAM RUSH極", upperDirectChance: 0, upperUpgradeChance: 0.49, upperContinue: 0.82 },
    articleSections: [
      { heading: "超デカSTARTと図柄揃い", paragraphs: ["図柄揃いは約1/349.9で、その約52%がDREAM RUSHへ進みます。", "固定回転率は30.0回/1,000円とし、実店舗の回転率を保証する値ではありません。"] },
      { heading: "2回大当りで上位へ", paragraphs: ["下位RUSHはST70回・継続約70%。RUSH中に2回当たるとST100回・継続約82%の上位へ進みます。", "右打ちの1500〜6000個の公表振り分けを総出玉へ反映します。"] }
    ],
    sources: [["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/982/"], ["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10253"]]
  },
  "symphogear4-carol": {
    order: 14.0, type: "pachinko", theme: "flame", year: "2025年1月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバー戦姫絶唱シンフォギア4 キャロルver.", shortName: "シンフォギア4 キャロル",
    catchcopy: "図柄揃い約1/399.7、約50%で直LT。15回転の究極ショートST。",
    intro: "初当り1500個から絶唱RUSHへ直行し、1500個・3000個を高速で重ねるスマパチです。",
    points: ["図柄揃い約1/399.7", "LT突入約50%", "絶唱RUSH継続約81%"],
    specs: [["図柄揃い", "約1/399.7"], ["RUSH中", "約1/10.9"], ["LT突入", "約50%"], ["LT継続", "約81%"], ["ST", "15回または10000回"], ["図柄揃い出玉", "約1500個"]],
    sim: { kind: "pachinko", hitRate: 399.7, hitLabel: "図柄揃い", startType: "通常スタート", spinsPer1k: 17.0, minSpins: 12, maxSpins: 23, rushLabel: "絶唱RUSH", rushEntry: 0.50, rushContinue: 0.81, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.50], [3000, 0.50]] },
    articleSections: [
      { heading: "約50%で直LT", paragraphs: ["図柄揃いは約1/399.7で、図柄揃い時は約1500個。約50%で絶唱RUSHへ直行します。", "戦姫チャージを含む細かな当りは図柄揃い抽選と分けて省略しています。"] },
      { heading: "15回転のショートST", paragraphs: ["RUSH中は約1/10.9、基本ST15回と次回濃厚状態を合わせたトータル継続率は約81%です。", "右打ちの1500個・3000個を使い、バーニングエクスドライブは大出玉側へまとめます。"] }
    ],
    sources: [["SANKYO 公式製品資料", "https://www.sankyo-fever.jp/products/assets/pdf/ppr/ppr_mp_e.pdf"], ["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10149"]]
  },
  "golden-kamuy-slot": {
    order: 14.1, type: "slot", theme: "gold", year: "2024年4月", maker: "サミー", updated: "2026-11-01",
    name: "スマスロ ゴールデンカムイ", shortName: "ゴールデンカムイ",
    catchcopy: "決戦ボーナスから黄金神威へ。上位の真・黄金神威は純増約4.5枚。",
    intro: "ピュウを集めてボーナス・ATへ進み、ゴールデンロードから上位ATを目指します。",
    points: ["設定1初当り約1/308.1", "設定1 AT約1/818.4", "上位純増約4.5枚/G"],
    specs: [["初当り（設定1）", "約1/308.1"], ["AT（設定1）", "約1/818.4"], ["AT（設定6）", "約1/647.3"], ["ベース", "約36.9G/50枚"], ["通常AT純増", "約2.7枚/G"], ["上位純増", "約4.5枚/G"]],
    sim: { kind: "slot", triggerLabel: "決戦ボーナス", triggerRate: 308.1, triggerSuccess: 0.38, mainLabel: "黄金神威", mainRate: 818.4, base50: 36.9, coinUnit: 3.6, normalMin: 250, normalMax: 1200, specialLabel: "ゴールドラッシュ", specialChance: 0.34, specialMin: 250, specialMax: 1200, upperChallenge: "ゴールデンロード", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "真・黄金神威", upperContinue: 0.82, upperPayout: 650, settingRates: { 1: { trigger: 308.1, main: 818.4, payout: 0.979 }, 2: { trigger: 302.4, main: 801.8, payout: 0.986 }, 3: { trigger: 290.4, main: 770.3, payout: 1.008 }, 4: { trigger: 268.5, main: 698.8, payout: 1.054 }, 5: { trigger: 260.1, main: 678.3, payout: 1.088 }, 6: { trigger: 248.8, main: 647.3, payout: 1.133 } } },
    articleSections: [
      { heading: "ボーナスとATを分けて抽選", paragraphs: ["初当り合算は設定1約1/308.1〜設定6約1/248.8、AT初当りは約1/818.4〜約1/647.3です。", "シミュレーターでは決戦ボーナスと黄金神威の二段階で結果を表示します。"] },
      { heading: "黄金神威から上位へ", paragraphs: ["通常ATは初期100G・純増約2.7枚/G。ゴールデンロード成功で純増約4.5枚/Gの上位へ進みます。", "上位到達率など未公表部分はサイト内比較用固定抽選です。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9987"], ["パチナビ 設定別スペック", "https://pachinavi.net/machines/smasloth-golden-kamuy/settei/"]]
  },
  "bancho4-slot": {
    order: 14.2, type: "slot", theme: "flame", year: "2024年4月", maker: "大都技研", updated: "2026-11-01",
    name: "スマスロ 押忍！番長4", shortName: "押忍！番長4",
    catchcopy: "番長ボーナスと対決から頂RISEへ。設定1約1/259.5〜設定6約1/221.1。",
    intro: "ベルカウンターで対決を目指し、頂RISEの上乗せとエンブレムモードを狙います。",
    points: ["設定1初当り約1/259.5", "設定6初当り約1/221.1", "AT純増約2.7枚/G"],
    specs: [["初当り（設定1）", "約1/259.5"], ["初当り（設定6）", "約1/221.1"], ["ベース", "約33G/50枚"], ["通常AT純増", "約2.7枚/G"], ["上位純増", "約4.5枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "番長ボーナス", triggerRate: 259.5, triggerSuccess: 0.52, mainLabel: "頂RISE", mainRate: 259.5, base50: 33.0, coinUnit: 3.3, normalMin: 180, normalMax: 900, specialLabel: "頂RISE UP", specialChance: 0.34, specialMin: 200, specialMax: 950, upperChallenge: "超番長ボーナス", upperChance: 0.16, upperSuccess: 0.55, upperLabel: "エンブレムモード", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { trigger: 259.5, main: 259.5, payout: 0.978 }, 2: { trigger: 256.3, main: 256.3, payout: 0.989 }, 3: { trigger: 247.6, main: 247.6, payout: 1.015 }, 4: { trigger: 236.0, main: 236.0, payout: 1.060 }, 5: { trigger: 225.3, main: 225.3, payout: 1.100 }, 6: { trigger: 221.1, main: 221.1, payout: 1.131 } } },
    articleSections: [
      { heading: "設定別初当りを使用", paragraphs: ["初当り合算は設定1約1/259.5から設定6約1/221.1。公開機械割97.8%〜113.1%を個別に使います。", "ボーナスとATの詳細振り分けは、初当りを起点とする共通モデルへ簡略化しています。"] },
      { heading: "頂RISEとエンブレムモード", paragraphs: ["頂RISEは純増約2.7枚/Gのゲーム数管理型AT。対決勝利で上乗せやボーナスを狙います。", "超番長ボーナス後の上位は純増約4.5枚/Gとして獲得幅へ反映します。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10023"], ["パチヨミ 設定別スペック", "https://pachiyomi.com/slot/l-banchou-4"]]
  },
  "zenigata4-slot": {
    order: 14.3, type: "slot", theme: "crimson", year: "2023年5月", maker: "オリンピア", updated: "2026-11-01",
    name: "L主役は銭形4", shortName: "主役は銭形4",
    catchcopy: "規定ガッツから逮捕RUSHへ。デカチャンスと30G連で上乗せ。",
    intro: "ガッツを貯めてATへ進み、デカチャンス、ゼニロボ、超逮捕チャンスを重ねるスマスロです。",
    points: ["設定1 AT約1/367.9", "設定6 AT約1/305.8", "AT純増約2.7枚/G"],
    specs: [["AT（設定1）", "約1/367.9"], ["AT（設定6）", "約1/305.8"], ["ベース", "約32G/50枚"], ["AT純増", "約2.7枚/G"], ["AT初期", "50G＋α"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "デカチャンス", triggerRate: 184, triggerSuccess: 0.50, mainLabel: "逮捕RUSH", mainRate: 367.9, base50: 32.0, coinUnit: 3.8, normalMin: 220, normalMax: 1100, specialLabel: "ゼニロボ起動チャンス", specialChance: 0.34, specialMin: 220, specialMax: 1100, upperChallenge: "30G連", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "超逮捕チャンス", upperContinue: 0.80, upperPayout: 650, settingRates: { 1: { main: 367.9, payout: 0.982 }, 2: { main: 365.3, payout: 0.987 }, 3: { main: 348.3, payout: 1.007 }, 4: { main: 329.0, payout: 1.043 }, 5: { main: 314.5, payout: 1.095 }, 6: { main: 305.8, payout: 1.141 } } },
    articleSections: [
      { heading: "設定別AT初当り", paragraphs: ["逮捕RUSH初当りは設定1約1/367.9から設定6約1/305.8。出玉率98.2%〜114.1%を設定ごとに使用します。", "設定は開始時に均等抽選し、最終結果とランキングに表示します。"] },
      { heading: "デカチャンスと30G連", paragraphs: ["ATは初期50G＋α・純増約2.7枚/G。CZ成功で直乗せやBIGを獲得します。", "ゼニロボ起動チャンス、30G連、超逮捕チャンスは段階式の簡易抽選へまとめています。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/9809"], ["天井ナビ 設定別スペック", "https://tennabi.jp/zenigata4/"]]
  },
  "inuyasha2-slot": {
    order: 14.4, type: "slot", theme: "crimson", year: "2024年12月", maker: "エフ", updated: "2026-11-01",
    name: "L 犬夜叉2", shortName: "犬夜叉2",
    catchcopy: "妖勝負を突破し、ブッた斬りスラッシュと奈落チャレンジへ。",
    intro: "ボーナス＋1システムを継承し、上位ATとストック特化ゾーンを目指すスマスロです。",
    points: ["設定1 AT約1/435.4", "設定6 AT約1/312.7", "ボーナス純増約5.0枚/G"],
    specs: [["CZ（設定1）", "約1/248.8"], ["AT（設定1）", "約1/435.4"], ["AT（設定6）", "約1/312.7"], ["ベース", "約33.3G/50枚"], ["AT純増", "約1.8枚/G"], ["ボーナス純増", "約5.0枚/G"]],
    sim: { kind: "slot", triggerLabel: "妖勝負", triggerRate: 248.8, triggerSuccess: 0.52, mainLabel: "ブッた斬りスラッシュ", mainRate: 435.4, base50: 33.3, coinUnit: 4.2, normalMin: 240, normalMax: 1200, specialLabel: "ブーストチャンス", specialChance: 0.36, specialMin: 220, specialMax: 1100, upperChallenge: "奈落チャレンジ", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "奈落決戦", upperContinue: 0.82, upperPayout: 650, settingRates: { 1: { trigger: 248.8, main: 435.4, payout: 0.976 }, 2: { trigger: 243.5, main: 419.9, payout: 0.989 }, 3: { trigger: 239.6, main: 402.3, payout: 1.0172 }, 4: { trigger: 233.5, main: 366.4, payout: 1.0636 }, 5: { trigger: 216.8, main: 336.1, payout: 1.1129 }, 6: { trigger: 209.6, main: 312.7, payout: 1.1499 } } },
    articleSections: [
      { heading: "CZ・ATとも設定差あり", paragraphs: ["妖勝負は設定1約1/248.8〜設定6約1/209.6、ATは約1/435.4〜約1/312.7です。", "開始時に設定1〜6を均等抽選し、選ばれた設定の公開値を使用します。"] },
      { heading: "ボーナス＋1と上位AT", paragraphs: ["通常ATは純増約1.8枚/G、各ボーナス中は約5.0枚/Gです。", "奈落チャレンジ突破後の上位とストック特化ゾーンは継続約82%の簡易ループで表現します。"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/10160"], ["なな徹 解析情報", "https://nana-press.com/kaiseki/machine/846/"]]
  },
  "fire-force2-benimaru": {
    order: 14.5, type: "pachinko", theme: "flame", year: "2025年7月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバー炎炎ノ消防隊2 紅丸ver.", shortName: "炎炎2 紅丸",
    catchcopy: "図柄揃い約1/399.9から、約52%で炎上バトルモードへ。",
    intro: "転落バトルと1500個以上の出玉、超炎上BURSTの上乗せを組み合わせたスマパチです。",
    points: ["図柄揃い約1/399.9", "RUSH突入約52%", "RUSH継続約73%"],
    specs: [["図柄揃い", "約1/399.9"], ["右打ち中", "約1/2.0"], ["RUSH突入", "約52%"], ["RUSH継続", "約73%"], ["図柄揃い出玉", "約1500個"], ["超炎上BURST", "4500個＋上乗せ"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常スタート", spinsPer1k: 17.0, minSpins: 12, maxSpins: 23, rushLabel: "炎上バトルモード", rushEntry: 0.52, rushContinue: 0.73, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.55], [4500, 0.30], [7500, 0.15]] },
    articleSections: [
      { heading: "約52%で炎上バトルへ", paragraphs: ["図柄揃いは約1/399.9で、通常図柄揃いの約50%と命の呼吸チャレンジを合わせ、トータル約52%でRUSHへ進みます。", "RUSHは転落抽選型で、継続率約73%です。"] },
      { heading: "超炎上BURSTの上乗せ", paragraphs: ["右打ち大当りはすべて約1500個以上。超炎上BURSTは約4500個から約3000個の50%上乗せを狙います。", "BURST発生率の状態変化は公表範囲から独立計算できないため、比較用出玉振り分けへ簡略化しています。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10273"], ["SANKYO 公式製品資料", "https://www.sankyo-fever.jp/products/assets/pdf/pxj/pxj_mp_e_2.pdf"]]
  },
  "kamen-rider-deno": {
    order: 14.6, type: "pachinko", theme: "crimson", year: "2024年9月", maker: "KYORAKU", updated: "2026-11-01",
    name: "e 仮面ライダー電王", shortName: "仮面ライダー電王",
    catchcopy: "図柄揃い約1/319.9から電王RUSHを突破し、CLIMAX RUSHへ。",
    intro: "87回転の突破型RUSHから、継続約77%のCLIMAX RUSHを目指す二段階STです。",
    points: ["図柄揃い約1/319.9", "電王RUSH突入約50%・突破約60%", "上位継続約77%"],
    specs: [["図柄揃い", "約1/319.9"], ["RUSH中", "約1/96.4"], ["電王RUSH突入", "約50%"], ["電王RUSH突破", "約60%"], ["上位継続", "約77%"], ["ST", "87回・135回"]],
    sim: { kind: "pachinko", hitRate: 319.9, hitLabel: "図柄揃い", startType: "通常スタート", spinsPer1k: 17.5, minSpins: 12, maxSpins: 24, rushLabel: "電王RUSH", rushEntry: 0.50, rushContinue: 0.60, firstPayoutIn: 1500, firstPayoutOut: 300, rushPayouts: [[1500, 0.50], [3000, 0.50]], upperLabel: "CLIMAX RUSH", upperDirectChance: 0, upperUpgradeChance: 0.60, upperContinue: 0.77 },
    articleSections: [
      { heading: "二段階RUSH", paragraphs: ["図柄揃いは約1/319.9で、約50%が電王RUSHへ進みます。", "電王RUSHは87回転・突破期待約60%。突破後は135回転のCLIMAX RUSHです。"] },
      { heading: "上位継続約77%", paragraphs: ["CLIMAX RUSHはST135回の約76%に次回継続図柄を加え、トータル約77%です。", "下位から上位への流れを段階演出と総出玉へ反映します。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10098"], ["一撃 解析情報", "https://1geki.jp/pachinko/e_kmnr_deno/"]]
  },
  "hokuto-boukyousei": {
    order: 14.7, type: "pachinko", theme: "crimson", year: "2023年5月", maker: "サミー", updated: "2026-11-01",
    name: "P北斗の拳 暴凶星", shortName: "北斗の拳 暴凶星",
    catchcopy: "約1/319.7・RUSH突入約60%。右打ちの約半分が3000個。",
    intro: "初当り1500個または3000個から、10回＋残保留4個の拳王RUSHへ進む定番機です。",
    points: ["大当り約1/319.7", "RUSH突入約60%・継続約74.7%", "右打ち約50.1%で3000個"],
    specs: [["大当り", "約1/319.7"], ["RUSH中", "約1/10.7"], ["RUSH突入", "約60%"], ["RUSH継続", "約74.7%"], ["RUSH回数", "10回＋残保留4個"], ["右打ち3000個", "約50.1%"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 17.7, minSpins: 12, maxSpins: 24, rushLabel: "拳王RUSH", rushEntry: 0.60, rushContinue: 0.747, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[200, 0.193], [1500, 0.306], [3000, 0.501]] },
    articleSections: [
      { heading: "初当り出玉とRUSH突入", paragraphs: ["通常時大当りは約1/319.7で、約60%が拳王RUSHへ進みます。初当りは1500個または3000個です。", "サイトでは共通計算のため初回出玉を代表値1500個へ統一しています。"] },
      { heading: "右打ちの約半分が3000個", paragraphs: ["拳王RUSHは10回＋残保留4個、継続率約74.7%。", "右打ち大当りは約50.1%が3000個、約30.6%が1500個、約19.3%が200個です。"] }
    ],
    sources: [["P-WORLD 発表記事", "https://news.p-world.co.jp/articles/23223/yugitsushin"], ["基本スペック資料", "https://slotto.com.tw/data/attachment/product/202601/hfajx4r64y.pdf"]]
  },
  "railgun2-pachinko": {
    order: 14.8, type: "pachinko", theme: "ice", year: "2024年9月", maker: "JFJ", updated: "2026-11-01",
    name: "Pとある科学の超電磁砲2", shortName: "超電磁砲2",
    catchcopy: "約1/319.6から時短引き戻し込み約70%で超電磁砲RUSHへ。",
    intro: "150回転の時短・RUSHと約77%継続を備えた、王道ロングRUSHタイプです。",
    points: ["大当り約1/319.6", "RUSH突入約70%", "RUSH継続約77%"],
    specs: [["大当り", "約1/319.6"], ["初回RUSH中", "約1/102.5"], ["2回目以降", "約1/109.0"], ["RUSH突入", "約70%"], ["RUSH継続", "約77%"], ["チャンスタイム", "150回"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 17.5, minSpins: 12, maxSpins: 24, rushLabel: "超電磁砲RUSH", rushEntry: 0.70, rushContinue: 0.77, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.60], [3000, 0.30], [4500, 0.10]] },
    articleSections: [
      { heading: "時短引き戻し込み約70%", paragraphs: ["通常時大当りは約1/319.6。直行とチャンスタイム150回の引き戻しを合わせ、RUSH突入は約70%です。", "チャンスタイムの引き戻し期待度は約38%です。"] },
      { heading: "150回の超電磁砲RUSH", paragraphs: ["初回RUSH中は約1/102.5、2回目以降は約1/109.0で、継続率は約77%です。", "複数回大当りによる出玉は1500〜4500個の代表結果へ簡略化しています。"] }
    ],
    sources: [["P-WORLD 発表記事", "https://news.p-world.co.jp/articles/28384/nippon"], ["仕様資料", "https://www.rttopics.com/img/client/cejuno/common/articlemachine/5027/ArticleMachineFile1_1719210645.pdf"]]
  },
  "shin-onimusha2-slot": {
    order: 14.9, type: "slot", theme: "flame", year: "2022年8月", maker: "エンターライズ", updated: "2026-11-01",
    name: "パチスロ 新鬼武者2", shortName: "新鬼武者2",
    catchcopy: "バッサリZONEから蒼剣RUSHへ。ゲーム数上乗せと継続バトル。",
    intro: "CZ突破から純増約2.0枚の蒼剣RUSHへ進み、ボーナスと金色覚醒を狙う6.5号機です。",
    points: ["設定1 AT約1/405.2", "設定6 AT約1/262.2", "AT純増約2.0枚/G"],
    specs: [["AT（設定1）", "約1/405.2"], ["AT（設定6）", "約1/262.2"], ["ベース", "約37G/50枚"], ["AT純増", "約2.0枚/G"], ["ボーナス純増", "約4.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "バッサリZONE", triggerRate: 220, triggerSuccess: 0.33, mainLabel: "蒼剣RUSH", mainRate: 405.2, base50: 37.0, coinUnit: 2.6, normalMin: 200, normalMax: 950, specialLabel: "蒼剣BONUS", specialChance: 0.34, specialMin: 200, specialMax: 900, upperChallenge: "鬼武侠", upperChance: 0.17, upperSuccess: 0.55, upperLabel: "金色覚醒鬼武者", upperContinue: 0.80, upperPayout: 550, settingRates: { 1: { main: 405.2, payout: 0.982 }, 2: { main: 382.4, payout: 0.995 }, 3: { main: 366.2, payout: 1.005 }, 4: { main: 301.3, payout: 1.054 }, 5: { main: 275.6, payout: 1.077 }, 6: { main: 262.2, payout: 1.101 } } },
    articleSections: [
      { heading: "設定別AT初当り", paragraphs: ["蒼剣RUSH初当りは設定1約1/405.2から設定6約1/262.2。公開機械割98.2%〜110.1%を使用します。", "CZの細かな設定差は加えず、AT初当りを中心に比較します。"] },
      { heading: "ゲーム数上乗せ型AT", paragraphs: ["蒼剣RUSHは初期40G・純増約2.0枚/G。ボーナス中は約4.0枚/Gです。", "鬼武侠、ボーナスループ、金色覚醒は段階式の簡易抽選へまとめています。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9658"], ["スロベース 設定別スペック", "https://slobase.jp/machines/onimusha2"]]
  },
  "fire-force-slot": {
    order: 15.0, type: "slot", theme: "flame", year: "2024年5月", maker: "SANKYO", updated: "2026-11-01",
    name: "Lパチスロ 炎炎ノ消防隊", shortName: "スマスロ 炎炎ノ消防隊",
    catchcopy: "灰焔騎士団から純増約5.7枚のボーナスと炎炎ループへ。",
    intro: "初当り、ボーナス、炎炎激闘を重ねてアドラバーストを目指すスマスロです。",
    points: ["設定1初当り約1/197", "設定6初当り約1/169", "ボーナス純増約5.7枚/G"],
    specs: [["初当り（設定1）", "約1/197"], ["初当り（設定6）", "約1/169"], ["ボーナス（設定1）", "約1/291"], ["炎炎ループ（設定1）", "約1/790"], ["ベース", "約33.8G/50枚"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "灰焔騎士団", triggerRate: 197, triggerSuccess: 0.50, mainLabel: "炎炎BONUS", mainRate: 291, base50: 33.8, coinUnit: 3.1, normalMin: 180, normalMax: 850, specialLabel: "炎炎激闘", specialChance: 0.36, specialMin: 220, specialMax: 950, upperChallenge: "炎炎ループ", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "アドラバースト", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { trigger: 197, main: 291, payout: 0.977 }, 2: { trigger: 194, main: 282, payout: 0.992 }, 4: { trigger: 182, main: 257, payout: 1.044 }, 5: { trigger: 173, main: 239, payout: 1.101 }, 6: { trigger: 169, main: 230, payout: 1.149 } } },
    articleSections: [
      { heading: "実機搭載の5段階設定", paragraphs: ["設定1・2・4・5・6から均等抽選し、設定3は対象外です。初当り合算は約1/197〜約1/169です。", "ボーナス初当り約1/291〜約1/230も設定ごとに使用します。"] },
      { heading: "炎炎激闘とアドラバースト", paragraphs: ["初当りボーナスは純増約5.7枚/G。炎炎激闘と炎炎ループでボーナスの連続を狙います。", "上位到達率などの未公表部分は全設定共通の比較用抽選です。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10042"], ["パチナビ 設定別スペック", "https://pachinavi.net/machines/smasloth-enen/settei/"]]
  },
  "godzilla-eva-slot": {
    order: 15.1, type: "slot", theme: "violet", year: "2024年2月", maker: "ビスティ", updated: "2026-11-01",
    name: "L ゴジラ対エヴァンゲリオン", shortName: "スマスロ ゴジエヴァ",
    catchcopy: "ボーナスからG覚醒RUSHへ。純増約5枚の怪獣バトルAT。",
    intro: "エヴァンゲリオンボーナスとゴジラボーナスを経由し、高純増ATへ進むスマスロです。",
    points: ["設定1 AT約1/581.8", "設定6 AT約1/407.3", "AT純増約5.0枚/G"],
    specs: [["ボーナス（設定1）", "約1/299.9"], ["AT（設定1）", "約1/581.8"], ["AT（設定6）", "約1/407.3"], ["ベース", "約33G/50枚"], ["AT純増", "約5.0枚/G"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "エヴァンゲリオンBONUS", triggerRate: 299.9, triggerSuccess: 0.52, mainLabel: "G覚醒RUSH", mainRate: 581.8, base50: 33.0, coinUnit: 4.0, normalMin: 250, normalMax: 1200, specialLabel: "殲滅作戦", specialChance: 0.34, specialMin: 250, specialMax: 1100, upperChallenge: "G侵食役", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "超G覚醒RUSH", upperContinue: 0.82, upperPayout: 650, settingRates: { 1: { trigger: 299.9, main: 581.8, payout: 0.977 }, 2: { trigger: 292.2, main: 552.7, payout: 0.992 }, 4: { trigger: 272.3, main: 487.8, payout: 1.046 }, 5: { trigger: 256.7, main: 446.2, payout: 1.107 }, 6: { trigger: 244.8, main: 407.3, payout: 1.149 } } },
    articleSections: [
      { heading: "5段階の設定別初当り", paragraphs: ["設定1・2・4・5・6から均等抽選し、設定3は対象外です。ボーナスは約1/299.9〜約1/244.8、ATは約1/581.8〜約1/407.3です。", "抽選設定は結果とランキングへ表示します。"] },
      { heading: "純増約5枚の高純増AT", paragraphs: ["G覚醒RUSHは純増約5.0枚/G。殲滅作戦や怪獣バトルでゲーム数を伸ばします。", "スルー回数天井や内部状態は省略し、ボーナスからAT・上位へ進む流れを簡易化しています。"] }
    ],
    sources: [["天井ナビ 設定別スペック", "https://tennabi.jp/godzilla-vs-evangelion/"], ["設定判別データ", "https://pacnk.com/slot/tools/sh_gojirataiebuangerion.html"]]
  },
  "dmc5-st-slot": {
    order: 15.2, type: "slot", theme: "violet", year: "2025年6月", maker: "エンターライズ", updated: "2026-11-01",
    name: "スマスロ デビル メイ クライ5 スタイリッシュトライブ", shortName: "スマスロ DMC5",
    catchcopy: "DMC BONUSからSTYLISH TIMEへ。上位STは平均約3400枚。",
    intro: "周期とCZからボーナス・STへ進み、バトル勝利でSTを強化する正統派ST機です。",
    points: ["設定1 ST約1/445.4", "設定6 ST約1/303.9", "ボーナス純増約5.8枚/G"],
    specs: [["ボーナス（設定1）", "約1/257.0"], ["ST（設定1）", "約1/445.4"], ["ST（設定6）", "約1/303.9"], ["ベース", "約33.7G/50枚"], ["ボーナス純増", "約5.8枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "ダンテCZ", triggerRate: 257.0, triggerSuccess: 0.52, mainLabel: "STYLISH TIME", mainRate: 445.4, base50: 33.7, coinUnit: 3.5, normalMin: 220, normalMax: 1050, specialLabel: "EPISODE BONUS", specialChance: 0.36, specialMin: 230, specialMax: 1100, upperChallenge: "JACKPOT BATTLE", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "SPECIAL STYLISH TIME", upperContinue: 0.82, upperPayout: 700, settingRates: { 1: { trigger: 257.0, main: 445.4, payout: 0.975 }, 2: { trigger: 254.1, main: 436.5, payout: 0.982 }, 3: { trigger: 251.5, main: 411.2, payout: 1.002 }, 4: { trigger: 222.6, main: 359.6, payout: 1.052 }, 5: { trigger: 217.3, main: 329.5, payout: 1.092 }, 6: { trigger: 204.1, main: 303.9, payout: 1.149 } } },
    articleSections: [
      { heading: "ボーナスとSTの設定差", paragraphs: ["ボーナス初当りは設定1約1/257.0〜設定6約1/204.1、ST初当りは約1/445.4〜約1/303.9です。", "開始時に設定1〜6を均等抽選し、公開出玉率97.5%〜114.9%を使用します。"] },
      { heading: "正統派STと上位ST", paragraphs: ["ボーナスは純増約5.8枚/G。ST中のバトル勝利で報酬とST強化を狙います。", "上位STの期待枚数約3400枚は、簡易モデルでは獲得幅と継続ループへまとめています。"] }
    ],
    sources: [["一撃 設定別解析", "https://1geki.jp/slot/l_dmc5_st/0/"], ["HAZUSE DATA 基本スペック", "https://data.hazuse.com/?machine_code=SX0106"]]
  },
  "gundam-unicorn-first": {
    order: 15.3, type: "pachinko", theme: "ice", year: "2021年8月", maker: "SANKYO", updated: "2026-11-01",
    name: "Pフィーバー 機動戦士ガンダムユニコーン", shortName: "初代ユニコーン",
    catchcopy: "約1/319.7から約60%でRUSHへ。転落より先に図柄揃いを狙う。",
    intro: "右打ち中は図柄揃い約1/41.1、継続約81%・大当りALL1500個の転落抽選タイプです。",
    points: ["大当り約1/319.7", "RUSH突入約60%", "RUSH継続約81%"],
    specs: [["大当り", "約1/319.7"], ["RUSH中図柄揃い", "約1/41.1"], ["転落小当り", "約1/153.7"], ["RUSH突入", "約60%"], ["RUSH継続", "約81%"], ["右打ち出玉", "ALL約1500個"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 18.0, minSpins: 12, maxSpins: 24, rushLabel: "覚醒HYPER", rushEntry: 0.60, rushContinue: 0.81, firstPayoutIn: 450, firstPayoutOut: 450, rushPayouts: [[1500, 1.0]] },
    articleSections: [
      { heading: "転落抽選型の覚醒HYPER", paragraphs: ["通常時大当りは約1/319.7で、約60%がRUSHへ進みます。", "RUSHは図柄揃い約1/41.1を転落小当り約1/153.7より先に引くゲーム性で、残保留込み継続率は約81%です。"] },
      { heading: "右打ちはALL1500個", paragraphs: ["RUSH中の図柄揃いはすべて約1500個です。", "初当りの一部にある3000FEVERは初回振り分けを完全再現せず、共通初回出玉とRUSH連チャンへ簡略化しています。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/9424"], ["P-WORLD 導入記事", "https://news.p-world.co.jp/articles/17431/nippon"]]
  },
  "sao-first-pachinko": {
    order: 15.4, type: "pachinko", theme: "ice", year: "2023年9月", maker: "KYORAKU", updated: "2026-11-01",
    name: "スマートぱちんこ ソードアート・オンライン", shortName: "初代スマパチSAO",
    catchcopy: "約1/319.9からトータル約64%で、155回＋残保留のソードRUSHへ。",
    intro: "右打ちALL1500個、継続約81%＋αのロングSTを搭載した初代スマパチSAOです。",
    points: ["大当り約1/319.9", "ST突入約64%", "ST継続約81%＋α"],
    specs: [["大当り", "約1/319.9"], ["ST中", "約1/97.7"], ["ST突入", "約64%"], ["ST継続", "約81%＋α"], ["ST回数", "155回＋残保留4個"], ["右打ち出玉", "ALL約1500個"]],
    sim: { kind: "pachinko", hitRate: 319.9, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 18.0, minSpins: 12, maxSpins: 24, rushLabel: "ソードRUSH", rushEntry: 0.64, rushContinue: 0.81, firstPayoutIn: 450, firstPayoutOut: 450, rushPayouts: [[1500, 1.0]] },
    articleSections: [
      { heading: "時短引き戻し込み約64%", paragraphs: ["大当りは約1/319.9。ST直行50%に時短100回などからの引き戻しを加え、トータルST突入は約64%です。", "シミュレーターでは引き戻し経路を統合してRUSH当落を抽選します。"] },
      { heading: "155回ST・ALL1500個", paragraphs: ["ソードRUSHは約1/97.7を155回＋残保留4個で抽選し、継続率は約81%＋αです。", "右打ち大当りはすべて約1500個として総出玉へ反映します。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/9893"]]
  },
  "karakuri-first-pachinko": {
    order: 15.5, type: "pachinko", theme: "crimson", year: "2022年8月", maker: "SANKYO", updated: "2026-11-01",
    name: "Pフィーバーからくりサーカス", shortName: "初代からくりパチンコ",
    catchcopy: "約1/319.9・RUSH突入約75%。下位突破から継続約81%の上位へ。",
    intro: "ALL1500個の大当りと、からくりRUSHから超からくりRUSHを目指す二段階タイプです。",
    points: ["大当り約1/319.9", "RUSH突入約75%", "上位継続約81%"],
    specs: [["大当り", "約1/319.9"], ["右打ち中", "約1/45.0"], ["RUSH突入", "約75%"], ["下位継続", "約60.2%"], ["上位継続", "約81%"], ["大当り出玉", "約1500個"]],
    sim: { kind: "pachinko", hitRate: 319.9, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 18.0, minSpins: 12, maxSpins: 24, rushLabel: "からくりRUSH", rushEntry: 0.75, rushContinue: 0.602, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 1.0]], upperLabel: "超からくりRUSH", upperDirectChance: 0, upperUpgradeChance: 0.50, upperContinue: 0.81 },
    articleSections: [
      { heading: "約75%でからくりRUSHへ", paragraphs: ["通常時大当りは約1/319.9で、約75%がからくりRUSHへ進みます。大当り出玉は約1500個です。", "下位RUSHは37回＋残保留4個で継続約60.2%です。"] },
      { heading: "超からくりRUSHは約81%", paragraphs: ["上位RUSHは70回＋残保留4個で継続約81%。突入時の3000個も大きな特徴です。", "上位移行の細かな振り分けは、比較用の50%昇格抽選へ簡略化しているため実戦値を保証しません。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/9649"]]
  },
  "symphogear3-gold": {
    order: 15.6, type: "pachinko", theme: "flame", year: "2022年9月", maker: "SANKYO", updated: "2026-11-01",
    name: "PF戦姫絶唱シンフォギア3 黄金絶唱", shortName: "シンフォギア3",
    catchcopy: "約1/199.8から最終決戦を突破し、トータル継続約82%へ。",
    intro: "直行と最終決戦を合わせたRUSH突入約63%、右打ちの約半分が1500個のライトミドルです。",
    points: ["大当り約1/199.8", "RUSH突入約63%", "RUSH継続約82%"],
    specs: [["大当り", "約1/199.8"], ["右打ち中", "約1/7.8"], ["RUSH突入", "約63%"], ["RUSH継続", "約82%"], ["直行", "約26%"], ["右打ち1500個", "約50%"]],
    sim: { kind: "pachinko", hitRate: 199.8, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 18.5, minSpins: 13, maxSpins: 25, rushLabel: "シンフォギアチャンス黄金", rushEntry: 0.63, rushContinue: 0.82, firstPayoutIn: 339, firstPayoutOut: 339, rushPayouts: [[339, 0.25], [1050, 0.25], [1500, 0.50]] },
    articleSections: [
      { heading: "最終決戦込み約63%", paragraphs: ["通常時大当りは約1/199.8。直行約26%と時短1回＋残保留4個の最終決戦を合わせ、RUSH突入は約63%です。", "シミュレーターでは直行・突破経路を統合して抽選します。"] },
      { heading: "トータル継続約82%", paragraphs: ["右打ち中の図柄揃いは約1/7.8で、下位と70億の絶唱FEVERを合わせた継続率は約82%です。", "右打ち約50%の1500個を反映し、その他は代表出玉へまとめています。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/9673"]]
  },
  "initial-d-2nd-slot": {
    order: 15.7, type: "slot", theme: "ice", year: "2024年10月", maker: "サミー", updated: "2026-11-01",
    name: "スマスロ頭文字D 2nd", shortName: "頭文字D 2nd",
    catchcopy: "レジェンドバトルを突破し、純増約2.4枚のレジェンドラッシュへ。",
    intro: "ゲーム数管理ATとリアルボーナス、覚醒ZONEを組み合わせたスマスロです。",
    points: ["設定1 AT約1/405.5", "設定6 AT約1/296.7", "AT純増約2.4枚/G"],
    specs: [["LB（設定1）", "約1/216.6"], ["AT（設定1）", "約1/405.5"], ["AT（設定6）", "約1/296.7"], ["ベース", "約31.0G/50枚"], ["AT純増", "約2.4枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "レジェンドバトル", triggerRate: 216.6, triggerSuccess: 0.53, mainLabel: "レジェンドラッシュ", mainRate: 405.5, base50: 31.0, coinUnit: 2.9, normalMin: 220, normalMax: 950, specialLabel: "覚醒ZONE", specialChance: 0.35, specialMin: 220, specialMax: 1000, upperChallenge: "インフィニティードリーム", upperChance: 0.17, upperSuccess: 0.55, upperLabel: "ナイトキッズバトル", upperContinue: 0.80, upperPayout: 550, settingRates: { 1: { trigger: 216.6, main: 405.5, payout: 0.979 }, 2: { trigger: 212.3, main: 396.8, payout: 0.989 }, 3: { trigger: 205.0, main: 379.1, payout: 1.008 }, 4: { trigger: 188.9, main: 338.9, payout: 1.063 }, 5: { trigger: 178.4, main: 314.6, payout: 1.100 }, 6: { trigger: 169.7, main: 296.7, payout: 1.143 } } },
    articleSections: [
      { heading: "レジェンドバトルとATの設定差", paragraphs: ["レジェンドバトルは設定1約1/216.6〜設定6約1/169.7、ATは約1/405.5〜約1/296.7です。", "開始時に設定1〜6を均等抽選し、公開された設定別値を使用します。"] },
      { heading: "ATと覚醒ZONE", paragraphs: ["レジェンドラッシュは純増約2.4枚/Gのゲーム数管理型です。", "覚醒ZONEや上位契機の設定差は公開値がないため、全設定共通の比較用抽選です。"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/10097"]]
  },
  "lupin-dai-koukaisha": {
    order: 15.8, type: "slot", theme: "crimson", year: "2024年12月", maker: "平和", updated: "2026-11-01",
    name: "Lルパン三世 大航海者の秘宝", shortName: "ルパン 大航海者",
    catchcopy: "ICPOチャレンジからSUPER HEROへ。デカ目で上乗せを狙う。",
    intro: "ボーナス・ATのダブルセブンと上位AT『盗り放題RUSH』を備えたスマスロです。",
    points: ["設定1 AT約1/421.5", "設定6 AT約1/327.5", "ベース約31.1G/50枚"],
    specs: [["初当り（設定1）", "約1/289.1"], ["AT（設定1）", "約1/421.5"], ["AT（設定6）", "約1/327.5"], ["ベース", "約31.1G/50枚"], ["出玉率（設定6）", "約114.3%"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "ICPOチャレンジ", triggerRate: 289.1, triggerSuccess: 0.55, mainLabel: "SUPER HERO", mainRate: 421.5, base50: 31.1, coinUnit: 3.3, normalMin: 220, normalMax: 1050, specialLabel: "デカ目高確", specialChance: 0.36, specialMin: 250, specialMax: 1100, upperChallenge: "ダブルセブン", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "盗り放題RUSH", upperContinue: 0.82, upperPayout: 650, settingRates: { 1: { trigger: 289.1, main: 421.5, payout: 0.977 }, 2: { trigger: 275.6, main: 401.4, payout: 0.991 }, 3: { trigger: 262.6, main: 383.9, payout: 1.014 }, 4: { trigger: 233.9, main: 355.1, payout: 1.061 }, 5: { trigger: 223.6, main: 345.6, payout: 1.101 }, 6: { trigger: 216.3, main: 327.5, payout: 1.143 } } },
    articleSections: [
      { heading: "初当り・ATとも設定差あり", paragraphs: ["初当りは設定1約1/289.1〜設定6約1/216.3、ATは約1/421.5〜約1/327.5です。", "設定1〜6を均等抽選し、公開出玉率97.7%〜114.3%を結果へ反映します。"] },
      { heading: "デカ目と盗り放題RUSH", paragraphs: ["AT中はデカ目と高確率状態が上乗せの中心です。", "上位AT到達率などの非公表部分は全設定共通の簡易抽選で、実戦の内部状態は再現しません。"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/10157"]]
  },
  "basilisk-tenzen-slot": {
    order: 15.9, type: "slot", theme: "violet", year: "2023年12月", maker: "ミズホ", updated: "2026-11-01",
    name: "スマスロ バジリスク絆2 天膳 BLACK EDITION", shortName: "バジリスク天膳",
    catchcopy: "バジリスクチャンスからBTへ。宿怨チャレンジで上位を狙う。",
    intro: "絆高確とシナリオ管理のBTに、宿怨ループを加えたスマスロです。",
    points: ["設定1 BT約1/418.1", "設定6 BT約1/247.3", "BT純増約2.9枚/G"],
    specs: [["BC（設定1）", "約1/124.7"], ["BT（設定1）", "約1/418.1"], ["BT（設定6）", "約1/247.3"], ["ベース", "約31.7G/50枚"], ["BT純増", "約2.9枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "バジリスクチャンス", triggerRate: 124.7, triggerSuccess: 0.30, mainLabel: "バジリスクタイム", mainRate: 418.1, base50: 31.7, coinUnit: 3.7, normalMin: 220, normalMax: 1100, specialLabel: "絆高確", specialChance: 0.36, specialMin: 240, specialMax: 1050, upperChallenge: "宿怨チャレンジ", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "宿怨ループ", upperContinue: 0.82, upperPayout: 650, settingRates: { 1: { trigger: 124.7, main: 418.1, payout: 0.974 }, 2: { trigger: 123.2, main: 405.0, payout: 0.985 }, 3: { trigger: 119.2, main: 362.4, payout: 1.020 }, 4: { trigger: 113.6, main: 311.2, payout: 1.062 }, 5: { trigger: 108.5, main: 278.5, payout: 1.105 }, 6: { trigger: 105.0, main: 247.3, payout: 1.149 } } },
    articleSections: [
      { heading: "BCとBTの設定別確率", paragraphs: ["BCは設定1約1/124.7〜設定6約1/105.0、BTは約1/418.1〜約1/247.3です。", "抽選された設定の公開初当りと出玉率を使用し、結果とランキングへ設定を表示します。"] },
      { heading: "絆高確から宿怨へ", paragraphs: ["BTは純増約2.9枚/Gで、絆高確とシナリオにより継続を狙います。", "宿怨チャレンジ以降の細かな内部抽選は、上位挑戦と継続ループへ簡略化しています。"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/9944"]]
  },
  "chibariyo2-slot": {
    order: 16.0, type: "slot", theme: "flame", year: "2024年3月", maker: "ネット", updated: "2026-11-01",
    name: "チバリヨ2", shortName: "チバリヨ2",
    catchcopy: "チェリー回数とモードから花笠点灯へ。天国・パトランプを目指す。",
    intro: "擬似チェリーと規定ゲーム数でボーナスを抽選し、32G連と高継続モードを狙うスマスロです。",
    points: ["設定1初当り約1/328.0", "設定6初当り約1/224.8", "純増約3.0・4.5枚/G"],
    specs: [["初当り（設定1）", "約1/328.0"], ["初当り（設定6）", "約1/224.8"], ["ベース（設定1）", "約27.9G/50枚"], ["BIG", "約210枚"], ["SBIG", "約350枚"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "チェリー前兆", triggerRate: 165, triggerSuccess: 0.50, mainLabel: "花笠ボーナス", mainRate: 328.0, base50: 27.9, coinUnit: 4.5, normalMin: 180, normalMax: 900, specialLabel: "天国モード", specialChance: 0.38, specialMin: 280, specialMax: 1200, upperChallenge: "パトランプ点灯", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "リミットレス", upperContinue: 0.88, upperPayout: 650, settingRates: { 1: { main: 328.0, payout: 0.973 }, 2: { main: 314.4, payout: 0.993 }, 4: { main: 281.1, payout: 1.047 }, 5: { main: 263.3, payout: 1.096 }, 6: { main: 224.8, payout: 1.149 } } },
    articleSections: [
      { heading: "実機搭載の5段階設定", paragraphs: ["設定1・2・4・5・6から均等抽選し、設定3は対象外です。初当りは約1/328.0〜約1/224.8です。", "設定1のベース約27.9G/50枚と公開出玉率97.3%〜114.9%を使用します。"] },
      { heading: "天国とパトランプ", paragraphs: ["REG約90枚、BIG約210枚、SBIG約350枚から32G以内の連チャンを狙います。", "チェリー天井や全モード移行は再現せず、天国・パトランプ・リミットレスを段階式の比較用抽選へまとめています。"] }
    ],
    sources: [["P-WORLD 基本情報", "https://www.p-world.co.jp/machine/database/10014"], ["なな徹 設定別スペック", "https://nana-press.com/kaiseki/machine/722/19929/"]]
  }
};

(function applyNovemberNewMachineReaderGuides() {
  const guides = {
    "shangri-la-frontier": {
      verdict: "約1/399.9から約54%でRUSHへ進み、ST134回・継続約75%で1500個と4500個以上の出玉差を比べる機種です。初当りの重さとRUSH中の一撃出玉を分けて確認できます。",
      bestFor: ["12月7日の導入前にゲームの流れを把握したい", "1500個と4500個中心の出玉差を比べたい", "約75%継続で連チャン結果の幅を見たい"],
      check: ["平均投資目安は固定19.0回/1,000円で約21,000円", "初回300個の約1%は1500個の代表値へ集約", "超神ゲーBOOSTの上乗せループは完全再現しない"],
      compare: [["sao-phantom-bullet", "e SAO ファントム・バレット", "設定付き約1/229.9の12月新台と比較"], ["juoh-shishi-no-ichigeki", "e獣王 獅子の一撃", "大きな出玉契機を持つ機種と比較"]]
    },
    "sao-phantom-bullet": {
      verdict: "5段階設定とフェアスタートを搭載した約1/229.9〜約1/189.8のライトミドルです。ICHIGEKIでは設定1へ固定し、BoB予選約70%からBoB FINALS約80%へ進む流れと出玉差を比較できます。",
      bestFor: ["12月導入前にゲームの流れを把握したい", "BoB予選と上位FINALSの継続差を比べたい", "設定付きパチンコの設定1条件を試したい"],
      check: ["実機は設定1・2・4・5・6の5段階", "サイトは設定1固定でランダム設定抽選をしない", "ファントムモードの全移行は簡易抽選へ集約"],
      compare: [["sao-senko-no-kiseki", "e SAO 閃光の軌跡", "同シリーズのデカヘソ機と比較"], ["no-game-no-life-119", "eノゲノラ 119", "ライト帯の二段階RUSHと比較"]]
    },
    "toaru3-pachinko": {
      verdict: "約1/348.6の初当りと約50%のST突入を越えた先で、3段階STと大きな出玉振り分けを楽しむタイプです。初当りの軽さより、RUSH中の展開と一撃の幅を比べたい人に向いています。",
      bestFor: ["前半・後半・最終回転と変化するSTの流れを見たい", "1500個から7500個以上までの出玉差を比べたい", "初当り投資とRUSH突入後の収支を分けて確認したい"],
      check: ["平均投資目安は約20,500円で、9機種の中では重め", "初当り後も約50%のST突入抽選がある", "実機の細かな出玉振り分けは代表値へ簡略化"],
      compare: [["fever-yokai-watch", "eF妖怪ウォッチ", "継続約80%と時短込み突入を比較"], ["juoh-shishi-no-ichigeki", "e獣王 獅子の一撃", "低継続・大出玉型との違いを比較"]]
    },
    "kamen-rider-black-light": {
      verdict: "デカヘソの31回/1,000円と約1/129.9の初当りにより、短い時間でも初当りからRUSHまでを試しやすい機種です。RUSH中の出玉は小さめですが、宿命BATTLE到達で結果が変わります。",
      bestFor: ["まずは軽い初当りの新台から試したい", "デカヘソで投資目安がどう変わるか知りたい", "宿命BATTLE突入前後の出玉差を比べたい"],
      check: ["初当り出玉は約240個、RUSH中は約400個で計算", "RUSH継続は約72%で、短く終わる結果もある", "EXTREMEは昇格率未公表のため独立抽選しない"],
      compare: [["no-game-no-life-119", "eノゲノラ 119", "同じライト帯で初回出玉を比較"], ["juoh-shishi-no-ichigeki", "e獣王 獅子の一撃", "ワイドスタート機の投資差を比較"]]
    },
    "granbelm-319": {
      verdict: "約1/319.6の初当りから約51%でグランベルムRUSHへ直行し、RESTART込み約77%の継続と1500〜4500個の出玉を比べる機種です。初回突入後の継続回数と一度の出玉の両方を確認できます。",
      bestFor: ["直LTの分かりやすいRUSH突入を試したい", "約77%継続で連チャン数の幅を比べたい", "1500個・3000個・4500個の出玉差を見たい"],
      check: ["平均投資目安は固定17.5回/1,000円で約18,300円", "RESTARTは独立表示せず継続率へ含める", "超アドレナリンBOOSTの上乗せ過程は完全再現しない"],
      compare: [["fever-yokai-watch", "eF妖怪ウォッチ", "約80%継続と時短込み突入を比較"], ["toaru3-pachinko", "eとある3", "3段階STと大出玉振り分けを比較"]]
    },
    "fever-yokai-watch": {
      verdict: "RUSH直行だけでなく時短100回の引き戻しも含めて突入約61%、継続約80%を見る機種です。1500個以上を中心とした右打ちで、継続回数と出玉の両方を比べられます。",
      bestFor: ["時短引き戻し込みのRUSH突入率を体験したい", "約80%継続の連チャン幅を複数回比べたい", "1500個・3000個・4500個の出玉差を見たい"],
      check: ["直行率と時短引き戻しを約61%の1回抽選へ集約", "転落や最終決戦などの細部は個別再現しない", "平均投資目安は固定17.2回/1,000円で約18,600円"],
      compare: [["toaru3-pachinko", "eとある3", "約75%の3段階STと比較"], ["no-game-no-life-119", "eノゲノラ 119", "ライト帯の約80%上位RUSHと比較"]]
    },
    "juoh-shishi-no-ichigeki": {
      verdict: "RUSH突入・継続がともに約50%である一方、右打ち大当りの約半分に平均約9800個のサバンナチャンスを置く振れ幅の大きい機種です。連チャン数より一度の出玉契機を重視して比べられます。",
      bestFor: ["低継続でも大きな出玉契機を狙う流れを見たい", "ドデカSTRAIGHTの固定回転率を投資へ反映したい", "通常結果とサバンナチャンス結果の差を比べたい"],
      check: ["RUSH非突入と単発終了が続く可能性がある", "サバンナチャンスは上乗せ過程を省き平均9800個で表示", "18回/1,000円は比較用の固定値で実店舗を保証しない"],
      compare: [["kamen-rider-black-light", "ライダーBLACK Light", "デカヘソの軽い初当りと比較"], ["toaru3-pachinko", "eとある3", "高継続寄りの大出玉STと比較"]]
    },
    "no-game-no-life-119": {
      verdict: "約1/119.8の初当りがすべて約1000個で、初回RUSH突破後は約80%継続のHYPERへ進む二段階タイプです。初当りの軽さと上位到達後の伸びを一緒に確認できます。",
      bestFor: ["ライト帯で初回1000個の安心感を比べたい", "初回RUSH突破からHYPERへの流れを試したい", "短い投資と約80%継続の組み合わせを見たい"],
      check: ["RUSH突入50%の後に約51%の初回突破が必要", "HYPER到達前に終了する結果も多い", "右打ち出玉は300個・1000個を各50%で計算"],
      compare: [["kamen-rider-black-light", "ライダーBLACK Light", "初当りの軽さとデカヘソを比較"], ["fever-yokai-watch", "eF妖怪ウォッチ", "ミドル帯の約80%継続と比較"]]
    },
    "garo-yami-slot": {
      verdict: "設定別CZ・BONUSからSUPER GARO BONUSを経由し、究極魔戒RUSHを目指す高純増タイプです。BONUSまでの投資と、上位到達後の約82.6%ループを分けて確認できます。",
      bestFor: ["純増約9.1枚/Gの速い出玉展開を試したい", "設定ごとのCZ・BONUS初当り差を見たい", "究極魔戒RUSH到達前後の差枚を比べたい"],
      check: ["設定1〜6は開始時に均等抽選し結果で発表", "魔界やBIGの細かな振り分けは代表ルートへ集約", "上位到達率の未公表部分は体験用固定値"],
      compare: [["seiya-ougon-slot", "スマスロ 聖闘士星矢", "継続バトル型の上位ATと比較"], ["godzilla-eva2-slot", "スマスロ ゴジエヴァ2", "純増約5.2枚/GのATと比較"]]
    },
    "seiya-ougon-slot": {
      verdict: "CZからBattle of ZODIACへ進み、十二宮突破とSAGA BATTLEを経て千日戦争を目指す段階型です。通常ATの継続と上位ATの約88%継続を一連の流れで比べられます。",
      bestFor: ["CZ・AT・上位CZ・上位ATを順に体験したい", "設定別のAT初当りと継続結果を比べたい", "千日戦争到達時の差枚の伸びを見たい"],
      check: ["設定1の平均AT投資目安は約12,600円", "2種類のCZは代表演出へまとめている", "上位到達率は公開性能と分けた固定抽選"],
      compare: [["garo-yami-slot", "スマスロ 牙狼", "高純増ループ型と比較"], ["ggo-slot", "スマスロ GGO", "ST型の上位ルートと比較"]]
    },
    "ggo-slot": {
      verdict: "初当りBONUSは比較的軽めですが、メインSTのSQUAD JAMは設定1で約1/521.7です。BONUS当選とST到達を分けて見ることで、初当りの早さだけでは測れない収支の幅を確認できます。",
      bestFor: ["BONUSからSTへ進む二段階の流れを試したい", "設定差が大きいSQUAD JAM初当りを比べたい", "GGOストームから上位ST到達を目指したい"],
      check: ["初当り約1/192.0とSJ約1/521.7は別の指標", "CZのモードやスルー回数は個別再現しない", "設定1基準の平均SJ投資目安は約18,300円"],
      compare: [["seiya-ougon-slot", "スマスロ 聖闘士星矢", "継続バトル型ATと比較"], ["godzilla-eva2-slot", "スマスロ ゴジエヴァ2", "BONUS経由ATとの違いを比較"]]
    },
    "godzilla-eva2-slot": {
      verdict: "2種類のBONUSからゴジエヴァRUSHを目指し、決戦カイザーギドラ突破でG覚醒RUSHへ進む機種です。BONUSの軽さとAT初当りの重さを分けて見ると結果を理解しやすくなります。",
      bestFor: ["BONUS後のAT当落から上位までを一連で試したい", "設定別BONUS・AT初当り差を比べたい", "上位AT到達時の大きな差枚を確認したい"],
      check: ["設定1のBONUS約1/234.2とAT約1/460.5は別抽選", "2種類のBONUS後ジャッジは代表値50%へ簡略化", "G覚醒RUSHの到達率・ループは体験用固定値"],
      compare: [["ggo-slot", "スマスロ GGO", "BONUSからSTへ進む機種と比較"], ["garo-yami-slot", "スマスロ 牙狼", "高純増の上位ループ型と比較"]]
    }
  };

  Object.entries(guides).forEach(([slug, readerGuide]) => {
    const machine = window.ICHIGEKI_MACHINES[slug];
    if (machine) machine.readerGuide = readerGuide;
  });
})();

(function applyPopularMachineEditorialRefresh() {
  const updated = "2026-10-12";
  const editorial = {
    "sengoku-otome5": [
      { heading: "設定1〜6で変わるAT初当り", paragraphs: ["START時に設定1〜6を均等抽選し、設定1約1/359.5から設定6約1/262.9までの公開AT初当りと出玉率を個別に使用します。設定が高いほど必ず早く当たるわけではありませんが、長く繰り返すほど平均値の違いが結果へ表れやすくなります。", "周期・巫女ポイント・CZなど複数の入口はAT初当りへまとめ、公開されていない設定差を独自に付け足していません。今回選ばれた設定は最終結果、マイ記録、機種別ランキングへ残ります。"] },
      { heading: "強カワRUSHから真強カワRUSHまで", paragraphs: ["実機の流れを、強カワRUSH初当り、特化ゾーン『夢幻の如くなり』、剣聖CHANCE、真強カワRUSHの順に整理しています。剣聖CHANCEは通常初当り時の到達目安と成功期待度約51%を使う簡易抽選です。", "内部モード、全ての小役、引き戻し、有利区間の詳細は再現していません。上位へ届かなかった結果と、上位到達後に大きく伸びた結果の差を短時間で比べるための体験モデルです。"] },
      { heading: "平均G・投資・収支の見方", paragraphs: ["設定1の平均AT初当り359.5Gと31.0G/50枚を基準にすると、46枚貸しでの平均投資目安は約12,600円です。実際の1回は平均より早い場合も深くハマる場合もあるため、平均値は予算や勝敗を保証する数字ではありません。", "換金は5.2枚交換で統一し、獲得枚数から使用枚数を引いた差枚と、現金投資・換金を使う収支を分けて表示します。コイン単価3.5円は投資計算ではなく、結果の振れ幅を見る補助指標です。"] },
      { heading: "シミュレーションで比べたいポイント", bullets: ["同じ設定でも初当りGがどれだけ変わるか複数回試す", "通常AT終了と特化ゾーン成功時の差枚を比べる", "剣聖CHANCE成功後の上位結果をマイ記録で振り返る", "19,000枚へ到達した結果はコンプリート表示で打ち切る"] }
    ],
    "million-god-kiseki": [
      { heading: "偶数設定が軽い独自の初当り差", paragraphs: ["GG初当りは設定1約1/532.8、設定2約1/420.4、設定3約1/495.9、設定4約1/338.4、設定5約1/455.4、設定6約1/294.8です。数値は設定順に単純には軽くならず、偶数設定の初当りが目立つ公開値をそのまま反映しています。", "START時に設定1〜6を均等抽選し、選ばれた設定のGG初当りと出玉率を使用します。設定は結果まで伏せ、最終画面とランキングで発表します。"] },
      { heading: "GOD GAMEと上乗せ連鎖", paragraphs: ["奇数揃いからGOD GAMEへ進み、Z-GAME、SGG、SUPER GOD GAMEへつながる流れを一つの演出にまとめています。高純増ATの速さと、上乗せに成功した結果の伸びを比較できます。", "G-STOPの全契機、確定役、モード移行、セットストックの細かな振り分けは省略しています。公開されていない上乗せ率の設定差は加えず、全設定で共通条件です。"] },
      { heading: "平均532.8Gと高波結果の読み方", paragraphs: ["設定1のGG初当り532.8Gと30.8G/50枚を基準にした平均投資目安は約18,800円です。早いGGと深いハマりの両方が出やすいため、1回の結果だけで平均や設定を判断しないことが大切です。", "46枚貸し・5.2枚交換で収支を統一し、コイン単価4.0円は荒さを比べるサイト内の固定指標として表示します。公式公表値として扱うものではありません。"] },
      { heading: "シミュレーションで比べたいポイント", bullets: ["設定2・4・6の軽い初当りと奇数設定の結果を比べる", "Z-GAMEの上乗せ幅を通常GG終了と比較する", "SGG成功後のSUPER GOD GAMEを狙う", "差枚と現金収支を分けて確認する"] }
    ],
    "lycoris-recoil-pachinko": [
      { heading: "約1/259.7からRUSHを目指す", paragraphs: ["通常時は約1/259.7で初当りを抽選し、約50%でSPECIAL LycoReco RUSHへ進みます。RUSHは132回転、継続率約75%として連チャンを簡易抽選します。", "初当りが軽めでもRUSH非突入なら出玉は限られます。初当りまでの投資とRUSH当落を分けて見ると、同じ大当り回数でも収支が変わる理由を確認できます。"] },
      { heading: "750個・3000個・6000個の出玉差", paragraphs: ["RUSH中は750個、3000個、6000個の振り分けを使い、ULTIMATE DRIVE到達後は継続50%の上位結果を簡易表現します。大きな出玉を引いた回と750個中心の回を比べられる設計です。", "実機の全モード、残保留、細かなラウンド振り分けや演出信頼度は再現していません。表示する期待度はシミュレーション内部の抽選率です。"] },
      { heading: "固定回転率と平均投資", paragraphs: ["回転率は16.6回/1,000円、貸出は250玉、交換率は28玉/100円で固定しています。約1/259.7の平均初当りまでの投資目安は約15,600円です。", "平均投資は長期間の理論上の目安です。持ち玉、再プレイ、出玉削り、端玉は含めず、全利用者が同じ条件で結果を比べられるよう単純化しています。"] },
      { heading: "結果画面で確認するポイント", bullets: ["初当り回転数が平均259.7回転より早いか遅いか", "RUSH非突入と突入後の収支差", "3000個・6000個振り分けの影響", "ULTIMATE DRIVE到達前後の総出玉"] }
    ],
    "okiumi6": [
      { heading: "60%確変と時短引き戻し", paragraphs: ["通常時大当りは約1/319.6で、確変割合60%、通常大当り後は時短100回です。シミュレーターでは確変と時短引き戻しを合わせ、初当り後の継続を約70.8%の簡易値として扱います。", "確変ループ機は初当りだけでなく、通常大当り後の時短で戻せるかが結果を大きく変えます。抽選履歴では確変継続と終了の流れをまとめて確認できます。"] },
      { heading: "1500個とジンベェタイム", paragraphs: ["10R大当りは約1500個、2R確変は約60個として出玉差を反映します。ジンベェタイムは実機の時短200回または次回までという状態を、到達後の継続目安約79%へ簡略化しています。", "電サポ中の玉減り、通常時の細かなモード、演出選択は再現していません。海物語らしい確変ループの安定感と、ジンベェタイム到達時の伸びを比較する体験用モデルです。"] },
      { heading: "平均319.6回転と投資目安", paragraphs: ["17.6回/1,000円の固定条件では、平均初当りまでの投資目安は約18,200円です。貸出250玉・28玉交換で固定し、換金額と現金収支を計算します。", "平均回転は次の当りを予告する数字ではありません。100回転以内の当りと500回転を超える結果の両方を重ね、確率のばらつきを見る使い方がおすすめです。"] },
      { heading: "結果画面で確認するポイント", bullets: ["初当りまでの回転数と投資の関係", "確変60%と時短引き戻しを合わせた連チャン", "2R確変を含む総出玉の振れ幅", "大海5と同じ固定レートで結果を比較する"] }
    ],
    "tokyo-ghoul-slot": [
      { heading: "CZ・AT・上位CZを段階で見る", paragraphs: ["通常時からレミニセンス、AT『東京喰種咬』、BITES、有馬貴将JUDGEMENT、CCGの死神へ進む流れを一つの結果にまとめています。どの段階で終了したかを抽選履歴から追えます。", "全小役、内部状態、モード、有利区間、演出法則は省略しています。上位到達までの難しさと、到達後の獲得枚数の違いを理解するための簡易モデルです。"] },
      { heading: "設定1〜6のCZ・AT初当り", paragraphs: ["設定1はCZ約1/262.6・AT約1/394.4、設定6はCZ約1/203.7・AT約1/261.3です。START時に設定1〜6を均等抽選し、選ばれた設定の公開値と出玉率を使います。", "設定差が確認できないBITESや上位CZの抽選率は全設定共通です。高設定ほど上位へ優遇されるという独自の推測は加えていません。"] },
      { heading: "平均G・コイン単価・収支", paragraphs: ["設定1のAT初当り394.4Gと31G/50枚を基準にした平均投資目安は約13,800円です。46枚貸し・5.2枚交換で、投資・換金・収支を固定条件から表示します。", "コイン単価4.1円は現金投資額ではなく、吸い込みと出玉の振れやすさを見る指標です。平均より早いATでも出玉が伸びない場合や、深い投資から上位で戻す場合があります。"] },
      { heading: "結果画面で確認するポイント", bullets: ["抽選設定とCZ・AT初当りGの関係", "BITESの上乗せが差枚へ与える影響", "有馬貴将JUDGEMENT成功前後の収支差", "19,000枚到達時のコンプリート表示"] }
    ],
    "valvrave2": [
      { heading: "実機どおり設定1・2・4・5・6を抽選", paragraphs: ["通常設定は1・2・4・5・6の5段階で、設定3と設定Lは抽選しません。CZは全設定約1/324、初当り合算は設定1約1/476から設定6約1/456までの公開値を使います。", "初当り差は比較的小さい一方、出玉率は設定1の97.7%から設定6の114.9%まで差があります。シミュレーターは選ばれた設定を結果とランキングへ表示します。"] },
      { heading: "革命RUSHから超革命RUSHまで", paragraphs: ["共闘Vチャレンジ、革命RUSH、革命の剣、ハラキリチャレンジ3連、超革命RUSHを一連の演出へ整理しています。上位へ届く前の終了と、最大約90%継続の上位結果を比べられます。", "内部モード、全役、引き戻しや有利区間の詳細は再現していません。公開されていない上位到達率の設定差も加えず、全設定で共通条件です。"] },
      { heading: "平均476Gと高コイン単価", paragraphs: ["設定1の初当り476Gと32.7G/50枚を基準にした平均投資目安は約15,800円です。46枚貸し・5.2枚交換で統一し、コイン単価4.2円は高い振れ幅を示す補助指標として表示します。", "平均より早く当たっても上位へ届かない結果と、深い投資から超革命RUSHで伸びる結果があります。初当りの早さだけでなく最終差枚と収支を合わせて確認してください。"] },
      { heading: "結果画面で確認するポイント", bullets: ["5段階設定ごとの初当りGを比較する", "革命の剣による獲得枚数の増加", "ハラキリチャレンジ3連から上位へ進めたか", "超革命RUSH終了までの差枚と収支"] }
    ],
    "smart-hokuto": [
      { heading: "バトルボーナスを中心に簡略化", paragraphs: ["通常時からバトルボーナスへ当選し、継続を重ねて無想転生チャンスと無想転生バトルを目指す流れです。結果画面では初当りG、通常AT、上位挑戦、最終獲得枚数を順番に確認できます。", "天井、モード、内部状態、全小役、継続率示唆などは省略しています。初当りと継続率による結果の幅を短時間で比べるための娯楽用モデルです。"] },
      { heading: "設定1・2・4・5・6の公開値", paragraphs: ["通常設定1・2・4・5・6から均等抽選し、設定3と設定Lは対象外です。BB初当りは設定1約1/383.4、設定2約1/370.5、設定4約1/297.8、設定5約1/258.7、設定6約1/235.1を使用します。", "抽選設定は最終結果まで伏せ、マイ記録とランキングへ保存します。無想転生チャンス以降の非公表設定差は推測せず、全設定で共通条件です。"] },
      { heading: "平均383.4Gと無想転生の振れ幅", paragraphs: ["設定1のBB初当り383.4Gと34.7G/50枚を基準にした平均投資目安は約12,000円です。46枚貸し・5.2枚交換で収支を固定し、コイン単価3.3円は荒さの比較に使います。", "無想転生は継続約94%でも毎回終了する可能性があります。短く終わる結果も想定内で、上位到達だけでなく何連続いたかと最終差枚を見ることが重要です。"] },
      { heading: "結果画面で確認するポイント", bullets: ["抽選設定とBB初当りGの差", "通常バトルボーナスの継続回数", "無想転生チャンス突破前後の差枚", "コンプリート到達時は19,000枚で打ち切る"] }
    ],
    "eva17-hajimari": [
      { heading: "図柄揃いからST・時短へ", paragraphs: ["図柄揃いは約1/399.9、チャージ込みの大当りは約1/349.9です。シミュレーターでは図柄揃いを初当りとして抽選し、時短引き戻しを含むST突入率約61.4%でIMPACT MODEへの当落を決めます。", "チャージは投資を止める独立当りとしては再現していません。そのため実機の総大当り回数ではなく、図柄揃いからRUSHへ進む体験として結果を読んでください。"] },
      { heading: "約80%継続・ALL2400個＋α", paragraphs: ["STは157回、継続率約80%として抽選し、右打ち中は約2400個を基本出玉にしています。ごく一部の上乗せ結果を4800個として表現し、連チャン数と総出玉へ反映します。", "残保留、出玉削り、細かなラウンド構成、演出信頼度は再現していません。80%継続でも単発終了から大連チャンまで幅があることを体験できます。"] },
      { heading: "平均399.9回転と投資目安", paragraphs: ["17.0回/1,000円の固定条件では、図柄揃いまでの平均投資目安は約23,500円です。貸出250玉・28玉交換で、現金投資と換金後の収支を表示します。", "平均は1回の到達回転を保証しません。チャージを除く図柄揃い基準のため、他機種と比較するときも同じ『シミュレーターが何を初当りとしているか』を確認してください。"] },
      { heading: "結果画面で確認するポイント", bullets: ["図柄揃いまでの回転数と投資", "ST突入・非突入で変わる収支", "約80%継続の連チャン数のばらつき", "2400個の積み重ねによる最終出玉"] }
    ],
    "tokyo-ghoul-e": [
      { heading: "図柄揃い約1/399.9を基準に抽選", paragraphs: ["通常時は図柄揃い約1/399.9を初当りとして扱い、チャージ込み大当り約1/199.9とは分けています。図柄揃い後はトータルRUSH突入約51%でHYPER喰種RUSHへの当落を抽選します。", "チャージはシミュレーションの途中当りとして再現していません。表示する平均回転と投資は、3000個以上のRUSHにつながる図柄揃いを待つ条件です。"] },
      { heading: "右打ちは3000個以上", paragraphs: ["RUSHはST130回・継続約75%として抽選し、右打ち中は3000個を基本、約3%を6000個として総出玉を計算します。初回1500個とRUSH中の大出玉の組み合わせが収支を大きく左右します。", "実機の保留、細かな振り分け、残保留、演出法則、出玉削りは省略しています。ALL3000個以上という特徴と連チャンの振れ幅を比べる簡易モデルです。"] },
      { heading: "平均399.9回転と投資目安", paragraphs: ["16.7回/1,000円の固定条件では、図柄揃いまでの平均投資目安は約23,900円です。貸出250玉・28玉交換で統一し、換金目安と収支を表示します。", "RUSH突入率が約51%のため、早い図柄揃いでも非突入なら収支が伸びない場合があります。初当り回転数、RUSH当落、連チャン数を順番に確認してください。"] },
      { heading: "結果画面で確認するポイント", bullets: ["チャージ込みではなく図柄揃い基準の回転数", "約51%のRUSH突入当落", "3000個と6000個振り分けの影響", "e東京喰種とスマスロ東京喰種の記録を別々に比較する"] }
    ],
    "monkey-turn-v": [
      { heading: "実機の設定1・2・4・5・6を使用", paragraphs: ["通常設定1・2・4・5・6から均等抽選し、設定3と設定Lは対象外です。AT初当りは設定1約1/299.8、設定2約1/295.5、設定4約1/258.8、設定5約1/235.7、設定6約1/222.9を使用します。", "通常時の周期と超抜チャレンジはAT初当りへまとめています。設定差が公表されていない全速モードや青島SGへの到達率は全設定共通です。"] },
      { heading: "SG RUSHから青島SGまで", paragraphs: ["SG RUSH、全速モード、青島VS波多野、青島SGの順に進む流れを短い演出へ整理しています。通常AT終了と、上位到達後の約83%ループを同じ固定条件で比べられます。", "シナリオ、艇王、Vストック、エンディング、引き戻しの全抽選は再現していません。上位到達前後の獲得枚数差を理解する体験用モデルです。"] },
      { heading: "平均299.8Gと比較的穏やかな単価", paragraphs: ["設定1のAT初当り299.8Gと32.0G/50枚を基準にした平均投資目安は約10,200円です。46枚貸し・5.2枚交換で固定し、差枚と現金収支を分けて表示します。", "コイン単価3.1円は高単価機との比較では穏やかな指標ですが、1回ごとの結果は大きく上下します。平均投資や単価だけで勝敗が決まるものではありません。"] },
      { heading: "結果画面で確認するポイント", bullets: ["5段階設定ごとのAT初当りG", "全速モード獲得時の差枚上乗せ", "青島VS波多野の突破当落", "青島SG到達後の継続回数と最終収支"] }
    ]
  };

  Object.entries(editorial).forEach(([slug, articleSections]) => {
    const machine = window.ICHIGEKI_MACHINES[slug];
    if (!machine) return;
    machine.updated = updated;
    machine.articleSections = articleSections;
  });
})();
