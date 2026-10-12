window.ICHIGEKI_MACHINES = {
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
    catchcopy: "設定1〜6をランダム抽選。8,000G後に設定と結果を発表。",
    intro: "2026年10月5日導入のノーマルタイプ。START時に設定1〜6を均等抽選し、8,000Gを1ゲームずつ固定試行して、最後に設定・BIG・REG・合算・差枚を発表します。",
    points: ["設定1〜6を均等ランダム・8,000G固定", "設定ごとの公式BIG・REG・出玉率を反映", "46枚貸し・5.2枚交換、結果とランキングに設定を表示"],
    specs: [["固定ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/273.1"], ["設定1 REG", "約1/409.6"], ["設定1合算", "約1/163.8"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 273.1, regRate: 409.6, combinedRate: 163.8, bigPayout: 240, regPayout: 96, payoutRate: 0.97, settingRates: { 1: { big: 273.1, reg: 409.6, payout: 0.970 }, 2: { big: 270.8, reg: 385.5, payout: 0.980 }, 3: { big: 266.4, reg: 336.1, payout: 0.999 }, 4: { big: 254.0, reg: 290.0, payout: 1.028 }, 5: { big: 240.1, reg: 268.6, payout: 1.053 }, 6: { big: 229.1, reg: 229.1, payout: 1.094 } }, base50: 42.0, coinUnit: 2.0, mainRate: 163.8, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "設定1〜6ランダム・8,000G固定実戦", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定の公式BIG・REG確率で8,000Gを抽選します。設定は遊技中に伏せ、結果画面で発表します。", "結果画面では設定、BIG・REG・実績合算を確認でき、同じ条件のランダム設定ランキングへ登録できます。"] },
      { heading: "差枚と収支の計算", paragraphs: ["差枚は抽選された設定の公式出玉率を基準に、今回のBIG・REG回数がその設定の理論回数からどれだけ上下したかを加えて計算します。BIGは約240枚、REGは約96枚として扱います。", "収支目安は差枚を5.2枚交換で円換算します。現金投資と持ちメダル再遊技の割合は人によって異なるため、AT機のような現金投資額は表示しません。"] },
      { heading: "設定別の見方", paragraphs: ["公式の合算確率は設定1の約1/163.8から設定6の約1/114.6まで変化します。特にREGは設定1の約1/409.6から設定6の約1/229.1まで差があります。", "このシミュレーターは設定判別や勝利を保証するものではありません。ぶどう確率、チェリー重複、打ち方、取りこぼし、店舗状況は再現していません。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/myjuggler6/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10513"], ["ハズセ 機種情報", "https://hazuse.com/machine/pachislot/5S0437/"]]
  },
  "neo-im-juggler": {
    order: 41, type: "slot", theme: "gold", year: "2025年9月", maker: "北電子",
    name: "ネオアイムジャグラーEX", shortName: "ネオアイムジャグラーEX",
    catchcopy: "王道ジャグラーを設定1〜6ランダム・8,000Gで比較。",
    intro: "ネオアイムジャグラーEXの公式設定別確率を使い、START時に設定1〜6を均等抽選して8,000Gを固定試行します。設定・BIG・REG・実績合算・差枚を最後に表示します。",
    points: ["設定1〜6を均等ランダム・8,000G固定", "設定ごとの公式BIG・REG・出玉率を反映", "46枚貸し・5.2枚交換、結果とランキングに設定を表示"],
    specs: [["固定ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/273.1"], ["設定1 REG", "約1/439.8"], ["設定1合算", "約1/168.5"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 273.1, regRate: 439.8, combinedRate: 168.5, bigPayout: 252, regPayout: 96, payoutRate: 0.97, settingRates: { 1: { big: 273.1, reg: 439.8, payout: 0.970 }, 2: { big: 269.7, reg: 399.6, payout: 0.980 }, 3: { big: 269.7, reg: 331.0, payout: 0.995 }, 4: { big: 259.0, reg: 315.1, payout: 1.011 }, 5: { big: 259.0, reg: 255.0, payout: 1.033 }, 6: { big: 255.0, reg: 255.0, payout: 1.055 } }, base50: 40.0, coinUnit: 2.0, mainRate: 168.5, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "設定1〜6ランダム・8,000G固定実戦", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定の公式BIG・REG確率で8,000Gを抽選します。設定は最終結果まで表示しません。", "設定ごとのボーナス回数と実績合算の違いを、同じ8,000G条件で比較できます。"] },
      { heading: "差枚と収支の見方", paragraphs: ["抽選された設定の公式出玉率を基準に、今回のBIG・REG回数が理論回数からどれだけ上下したかを差枚へ反映します。", "収支目安は46枚貸し・5.2枚交換で円換算します。実店舗の再プレイ条件、持ちメダル比率、取りこぼしは再現しません。"] },
      { heading: "設定差を見るポイント", paragraphs: ["公式値では設定1の合算約1/168.5に対し、設定6は約1/127.5です。REGは設定1約1/439.8、設定6約1/255.0と差があります。", "1回の8,000Gだけで設定を断定するものではなく、確率のぶれを体験するための簡易モデルです。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/neoimjugglerex/"]]
  },
  "gogo-juggler3": {
    order: 42, type: "slot", theme: "aqua", year: "2023年7月", maker: "北電子",
    name: "ゴーゴージャグラー3", shortName: "ゴージャグ3",
    catchcopy: "設定1〜6をランダム抽選。8,000Gで当りの違いを見る。",
    intro: "ゴーゴージャグラー3の公式設定別確率を使い、設定1〜6を均等抽選する8,000G固定シミュレーターです。BIG・REG・実績合算・差枚と設定を最後に表示します。",
    points: ["設定1〜6を均等ランダム・8,000G固定", "設定ごとの公式BIG・REG・出玉率を反映", "46枚貸し・5.2枚交換、結果とランキングに設定を表示"],
    specs: [["固定ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/259.0"], ["設定1 REG", "約1/354.2"], ["設定1合算", "約1/149.6"], ["設定1出玉率", "97.2%"]],
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
    intro: "ファンキージャグラー2の公式設定別確率を使い、設定1〜6を均等抽選して8,000Gを固定試行します。BIG・REG・合算・差枚と設定を最後に表示します。",
    points: ["設定1〜6を均等ランダム・8,000G固定", "設定ごとの公式BIG・REG・出玉率を反映", "46枚貸し・5.2枚交換、結果とランキングに設定を表示"],
    specs: [["固定ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/266.4"], ["設定1 REG", "約1/439.8"], ["設定1合算", "約1/165.9"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 266.4, regRate: 439.8, combinedRate: 165.9, bigPayout: 240, regPayout: 96, payoutRate: 0.97, settingRates: { 1: { big: 266.4, reg: 439.8, payout: 0.970 }, 2: { big: 259.0, reg: 407.1, payout: 0.985 }, 3: { big: 256.0, reg: 366.1, payout: 0.998 }, 4: { big: 249.2, reg: 322.8, payout: 1.020 }, 5: { big: 240.1, reg: 299.3, payout: 1.043 }, 6: { big: 219.9, reg: 262.1, payout: 1.090 } }, base50: 40.0, coinUnit: 2.0, mainRate: 165.9, mainLabel: "ボーナス合算", triggerLabel: "8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "設定1〜6ランダム・8,000G固定", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定の公式BIG・REG確率で8,000Gを抽選します。設定は結果画面で発表します。", "設定1ならBIG約30.0回・REG約18.2回が理論目安ですが、設定と確率のぶれで毎回の結果が変わります。"] },
      { heading: "ファンキー2の差枚計算", paragraphs: ["抽選された設定の公式出玉率を基準に、BIG約240枚・REG約96枚としてボーナス回数の上下を差枚へ反映します。", "表示する収支は5.2枚交換で差枚を換算した比較値です。実店舗の現金投資額を示すものではありません。"] },
      { heading: "高設定域との違い", paragraphs: ["公式合算は設定1約1/165.9から設定6約1/119.6まで変化し、設定6の出玉率は109.0%です。", "シミュレーターは設定1〜6を均等抽選します。設定判別や勝利を保証せず、確率の幅を比較する用途に限定しています。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/funkyjuggler2/"]]
  }
};
