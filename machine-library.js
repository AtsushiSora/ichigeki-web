window.ICHIGEKI_MACHINES = {
  "lycoris-recoil-slot": {
    order: 1, type: "slot", theme: "crimson", year: "2026年9月", maker: "サミー",
    name: "スマスロ リコリス・リコイル", shortName: "スマスロ リコリコ",
    catchcopy: "CZを突破し、リコリスラッシュWを目指す。",
    intro: "2026年9月7日導入のスマスロ。CZから高純増ATへ進み、上位CZ『リコイル オブ リコリス』成功で上位ATを目指す流れを簡易体験できます。",
    points: ["設定1のCZ確率は約1/198.7、AT初当りは約1/328.8", "上位CZは10G、成功期待度約70%", "約31.8G/50枚・コイン単価約3.2円（設定1）"],
    specs: [["CZ（設定1）", "約1/198.7"], ["AT初当り（設定1）", "約1/328.8"], ["ベース", "約31.8G/50枚"], ["コイン単価", "約3.2円"], ["AT純増", "約8.4枚/G"], ["上位CZ期待度", "約70%"]],
    sim: { kind: "slot", triggerLabel: "オポジットバトル", triggerRate: 198.7, triggerSuccess: 0.53, mainLabel: "リコリスラッシュ", mainRate: 328.8, base50: 31.8, coinUnit: 3.2, normalMin: 250, normalMax: 950, specialLabel: "リコリスBONUS W", specialChance: 0.32, specialMin: 200, specialMax: 700, upperChallenge: "リコイル オブ リコリス", upperChance: 0.20, upperSuccess: 0.70, upperLabel: "リコリスラッシュW", upperContinue: 0.80, upperPayout: 520 },
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
    points: ["設定1のCZ約1/172、ボーナス初当り約1/269", "レンカノCHALLENGE期待度約56%、上位CZ約75%", "約31.0G/50枚・コイン単価約3.6円（設定1）"],
    specs: [["CZ（設定1）", "約1/172"], ["ボーナス初当り", "約1/269"], ["ベース", "約31.0G/50枚"], ["コイン単価", "約3.6円"], ["AT純増", "約5.0枚/G"], ["上位CZ期待度", "約75%"]],
    sim: { kind: "slot", triggerLabel: "レンカノCHALLENGE", triggerRate: 172, triggerSuccess: 0.56, mainLabel: "かのかりBONUS", mainRate: 269, base50: 31, coinUnit: 3.6, normalMin: 150, normalMax: 850, specialLabel: "1G恋ストック", specialChance: 0.36, specialMin: 150, specialMax: 750, upperChallenge: "妄想DTチャレンジ", upperChance: 0.18, upperSuccess: 0.75, upperLabel: "S級DREAM TIME", upperContinue: 0.80, upperPayout: 480 },
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
    points: ["設定2のボーナス初当り約1/350.8", "約31.5G/50枚・コイン単価約4.1円（設定2）", "上位CZ期待度約53%、上位ST継続約80%"],
    specs: [["ボーナス初当り（設定2）", "約1/350.8"], ["ベース", "約31.5G/50枚"], ["コイン単価", "約4.1円"], ["AT純増", "約8.0枚/G"], ["上位CZ期待度", "約53%"], ["上位ST継続", "約80%"]],
    sim: { kind: "slot", triggerLabel: "初当りボーナス", triggerRate: 350.8, triggerSuccess: 1, mainLabel: "青ブタJUDGE", mainRate: 350.8, base50: 31.5, coinUnit: 4.1, normalMin: 250, normalMax: 1100, specialLabel: "青春DREAM BURST", specialChance: 0.34, specialMin: 200, specialMax: 950, upperChallenge: "夢現JUDGEMENT", upperChance: 0.20, upperSuccess: 0.53, upperLabel: "青春ブタ野郎は∞の夢を見る", upperContinue: 0.80, upperPayout: 700 },
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
  "karakuri-circus": {
    order: 7, type: "slot", theme: "crimson", year: "2022", maker: "SANKYO",
    name: "パチスロ からくりサーカス", shortName: "からくりサーカス",
    catchcopy: "運命の一劇を越え、超からくりサーカスへ。",
    intro: "CZ・AT・上位ATへの昇格チャレンジがはっきりしており、一撃の流れを体験するシミュレーターと相性の良い人気スマスロです。",
    points: ["CZ『激情ジャッジ』からATを目指す", "上位AT昇格チャレンジ『運命の一劇』", "上位AT『超からくりサーカス』は高純増区間"],
    specs: [["CZ初当り（設定1）", "約1/333"], ["AT初当り（設定1）", "約1/564"], ["ベース", "約32.9G/50枚"], ["コイン単価", "約4.1円"], ["AT純増", "約2.8枚/G"], ["上位AT純増", "約7.6枚/G"]],
    sim: { kind: "slot", triggerLabel: "激情ジャッジ", triggerRate: 333, triggerSuccess: 0.59, mainLabel: "からくりサーカス", mainRate: 564, base50: 32.9, coinUnit: 4.1, normalMin: 300, normalMax: 1200, specialLabel: "鳴海＆勝 上乗せ", specialChance: 0.34, specialMin: 200, specialMax: 900, upperChallenge: "運命の一劇", upperChance: 0.28, upperSuccess: 0.50, upperLabel: "超からくりサーカス", upperContinue: 0.74, upperPayout: 900 },
    sources: [["SANKYO 基本情報PDF", "https://www.sankyo-fever.jp/products/assets/pdf/spx/spx_mp.pdf"], ["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4360"]]
  },
  "monkey-turn-v": {
    order: 8, type: "slot", theme: "aqua", year: "2023", maker: "山佐",
    name: "スマスロ モンキーターンV", shortName: "モンキーターンV",
    catchcopy: "SG RUSHからグランドスラム、その先の青島SGへ。",
    intro: "周期・CZ・シナリオ管理ATを組み合わせたロングヒット機。比較的マイルドなコイン単価と、上位到達時の伸びを両方体験できます。",
    points: ["設定1のAT初当りは約1/299.8", "CZ『超抜チャレンジ』を搭載", "上位AT『青島SG』はループ率約83%（Vストック込み）"],
    specs: [["AT初当り（設定1）", "約1/299.8"], ["ベース", "約32.0G/50枚"], ["コイン単価", "約3.1円"], ["SG RUSH純増", "約2.5枚/G"], ["青島SG純増", "約4.0枚/G"], ["青島SGループ", "約83%"]],
    sim: { kind: "slot", triggerLabel: "SG RUSH", triggerRate: 299.8, triggerSuccess: 1, mainLabel: "SG RUSH", mainRate: 299.8, base50: 32, coinUnit: 3.1, normalMin: 280, normalMax: 1050, specialLabel: "全速モード", specialChance: 0.36, specialMin: 150, specialMax: 700, upperChallenge: "青島VS波多野", upperChance: 0.19, upperSuccess: 0.50, upperLabel: "青島SG", upperContinue: 0.83, upperPayout: 520 },
    sources: [["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4450"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9923"]]
  },
  "eva15": {
    order: 9, type: "pachinko", theme: "violet", year: "2021", maker: "ビスティ",
    name: "新世紀エヴァンゲリオン～未来への咆哮～", shortName: "エヴァ15",
    catchcopy: "王道V-ST。163回転のIMPACT MODEを駆け抜ける。",
    intro: "長期稼働を続ける1/319.7のV-ST機。通常時の回転率を変更し、初当りまでの平均投資とSTの連チャンを確認できます。",
    points: ["通常時大当り約1/319.7", "時短引き戻し込みST突入約70%", "ST継続約81%、右打ち大当りは約1500個"],
    specs: [["大当り確率", "約1/319.7"], ["ST中確率", "約1/99.4"], ["ST回数", "163回"], ["ST突入", "約70%"], ["ST継続", "約81%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.1, minSpins: 10, maxSpins: 30, rushLabel: "IMPACT MODE", rushEntry: 0.70, rushContinue: 0.81, firstPayoutIn: 450, firstPayoutOut: 450, rushPayouts: [[1500, 1]] },
    sources: [["SANKYOオンライン博物館", "https://www.sankyo-fever.jp/collection/925/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9509"]]
  },
  "rezero-onigakari": {
    order: 10, type: "pachinko", theme: "ice", year: "2022", maker: "大都技研",
    name: "P Re:ゼロから始める異世界生活 鬼がかりver.", shortName: "リゼロ鬼がかり",
    catchcopy: "初当り3000個から始まる、鬼がかりRUSH。",
    intro: "3000発スタートと高速STで支持された人気機。通常回転率に応じた平均投資と、144回転RUSHの結果を試せます。",
    points: ["通常時大当り約1/319.6", "RUSH突入約55%", "ST144回、継続約77%"],
    specs: [["大当り確率", "約1/319.6"], ["RUSH中", "約1/99.9"], ["ST回数", "144回"], ["RUSH突入", "約55%"], ["RUSH継続", "約77%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "鬼がかりRUSH", rushEntry: 0.55, rushContinue: 0.77, firstPayoutIn: 3000, firstPayoutOut: 1500, rushPayouts: [[1500, 0.75], [3000, 0.25]] },
    sources: [["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4046"], ["アタリ7 スペック", "https://www.atari7.com/pachinko/onirezero.php"]]
  },
  "kabaneri": {
    order: 11, type: "slot", theme: "ember", year: "2022", maker: "サミー",
    name: "パチスロ甲鉄城のカバネリ", shortName: "甲鉄城のカバネリ",
    catchcopy: "3つのチャンス目からCZ、そしてカバネリオブジアイアンフォートレスへ。",
    intro: "6.5号機を代表するSTタイプ。ボーナスからST、無名回想を経由した上位STまでの流れを簡易抽選します。",
    points: ["3種類のチャンス目対応CZ", "ST初当り（設定1）約1/407.9", "上位ST『（裏）美馬ST』を搭載"],
    specs: [["ボーナス合算（設定1）", "約1/157.1"], ["ST初当り（設定1）", "約1/407.9"], ["ベース", "約33.0G/50枚"], ["コイン単価", "約2.8円"], ["ST純増", "約2.8枚/G"], ["上位ST継続", "80%超"]],
    sim: { kind: "slot", triggerLabel: "初当りボーナス", triggerRate: 157.1, triggerSuccess: 0.39, mainLabel: "カバネリST", mainRate: 407.9, base50: 33, coinUnit: 2.8, normalMin: 250, normalMax: 900, specialLabel: "無名回想", specialChance: 0.24, specialMin: 150, specialMax: 550, upperChallenge: "美馬決戦", upperChance: 0.18, upperSuccess: 0.46, upperLabel: "裏美馬ST", upperContinue: 0.82, upperPayout: 430 },
    sources: [["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4160"], ["セガサミー決算資料", "https://www.segasammy.co.jp/cms/wp-content/uploads/pdf/ja/ir/20242029_q3_presentation_j-1.pdf"]]
  },
  "smart-hokuto": {
    order: 12, type: "slot", theme: "gold", year: "2023", maker: "サミー",
    name: "スマスロ北斗の拳", shortName: "スマスロ北斗の拳",
    catchcopy: "バトルボーナスを継続し、無想転生バトルへ。",
    intro: "初代のゲーム性をスマスロで再構築した定番機。ATまでの平均ゲーム数と投資、無想転生チャンス突破を体験できます。",
    points: ["AT初当り（設定1）約1/383.4", "バトルボーナスは継続率管理", "無想転生バトルは継続率約94%"],
    specs: [["AT初当り（設定1）", "約1/383.4"], ["ベース", "約34.7G/50枚"], ["コイン単価", "約3.3円"], ["AT純増", "約4.1枚/G"], ["通常AT", "継続率管理"], ["無想転生", "継続約94%"]],
    sim: { kind: "slot", triggerLabel: "バトルボーナス", triggerRate: 383.4, triggerSuccess: 1, mainLabel: "バトルボーナス", mainRate: 383.4, base50: 34.7, coinUnit: 3.3, normalMin: 220, normalMax: 1100, specialLabel: "トキ共闘", specialChance: 0.28, specialMin: 180, specialMax: 700, upperChallenge: "無想転生チャンス", upperChance: 0.14, upperSuccess: 0.46, upperLabel: "無想転生バトル", upperContinue: 0.94, upperPayout: 310 },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9786"], ["サミー 機種情報", "https://www.sammy.co.jp/japanese/product/pachislot/sp_hok_ke/EN.html"]]
  },
  "valvrave": {
    order: 13, type: "slot", theme: "magenta", year: "2022", maker: "SANKYO",
    name: "パチスロ 革命機ヴァルヴレイヴ", shortName: "革命機ヴァルヴレイヴ",
    catchcopy: "革命RUSHを突破し、超革命RUSHへ。",
    intro: "スマスロ初期を代表する高コイン単価機。通常RUSHから超革命RUSH、ハラキリDRIVEまでの荒さを簡易再現します。",
    points: ["設定1のRUSH初当り目安は約1/519", "コイン単価約4.5円の高波機", "超革命RUSHは継続約90%"],
    specs: [["RUSH初当り（設定1目安）", "約1/519"], ["ベース", "約31.0G/50枚"], ["コイン単価", "約4.5円"], ["AT純増", "約7.2枚/G"], ["革命RUSH継続", "約77%"], ["超革命RUSH継続", "約90%"]],
    sim: { kind: "slot", triggerLabel: "革命RUSH", triggerRate: 519, triggerSuccess: 1, mainLabel: "革命RUSH", mainRate: 519, base50: 31, coinUnit: 4.5, normalMin: 300, normalMax: 1500, specialLabel: "ハラキリDRIVE", specialChance: 0.31, specialMin: 360, specialMax: 1800, upperChallenge: "革命RUSH 3連突破", upperChance: 0.46, upperSuccess: 0.46, upperLabel: "超革命RUSH", upperContinue: 0.90, upperPayout: 540 },
    sources: [["SANKYOオンライン博物館", "https://www.sankyo-fever.jp/collection/936/"], ["SANKYO IR資料", "https://www.sankyo-fever.co.jp/corporate/modify/IR/Library_Briefing/files/explanation_20240807_ja.pdf"]]
  },
  "sengoku-otome4": {
    order: 14, type: "slot", theme: "sakura", year: "2023", maker: "オリンピアエステート",
    name: "L戦国乙女4 戦乱に閃く炯眼の軍師", shortName: "戦国乙女4",
    catchcopy: "乙女アタックから強カワRUSH、真強カワRUSHへ。",
    intro: "ボーナス・CZ・AT・上位ATの段階が分かりやすい人気スマスロ。乙女アタックとオウガイバトルを簡易抽選します。",
    points: ["ボーナス＋AT初当り（設定1）約1/272.7", "AT初当り約1/429.2", "上位AT『真強カワRUSH』は純増約5.0枚/G"],
    specs: [["初当り（設定1）", "約1/272.7"], ["AT初当り（設定1）", "約1/429.2"], ["ベース", "約31.8G/50枚"], ["コイン単価", "約3.4円"], ["AT純増", "約2.5枚/G"], ["上位AT純増", "約5.0枚/G"]],
    sim: { kind: "slot", triggerLabel: "戦国乙女BONUS", triggerRate: 272.7, triggerSuccess: 0.64, mainLabel: "強カワRUSH", mainRate: 429.2, base50: 31.8, coinUnit: 3.4, normalMin: 260, normalMax: 1050, specialLabel: "神謀覚醒", specialChance: 0.25, specialMin: 180, specialMax: 1000, upperChallenge: "オウガイバトル", upperChance: 0.24, upperSuccess: 0.45, upperLabel: "真強カワRUSH", upperContinue: 0.70, upperPayout: 650 },
    sources: [["一撃 機種解析", "https://1geki.jp/slot/l_otome_keigan/"], ["HEIWA 機種情報", "https://www.heiwanet.co.jp/products/pachislot/l-sg5/"]]
  },
  "oumi5": {
    order: 15, type: "pachinko", theme: "ocean", year: "2023", maker: "三洋物産",
    name: "P大海物語5", shortName: "大海物語5",
    catchcopy: "すべて1500個。王道の60%確変ループ。",
    intro: "幅広い層に支持される確変ループ機。通常回転率から平均投資を計算し、確変と時短引き戻しを含めた連チャンを試せます。",
    points: ["通常時大当り約1/319.6", "確変突入・継続60%", "すべての大当りが約1500個、通常後は時短100回"],
    specs: [["大当り確率", "約1/319.6"], ["確変中", "約1/31.9"], ["確変割合", "60%"], ["時短", "100回"], ["大当り出玉", "約1500個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 16.7, minSpins: 10, maxSpins: 30, rushLabel: "確変ループ", rushEntry: 0.708, rushContinue: 0.708, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 1]] },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9768"], ["三洋物産 機種情報", "https://www.sanyobussan.co.jp/products/pk_bigsea5/"]]
  },
  "shin-hokuto-musou": {
    order: 16, type: "pachinko", theme: "flame", year: "2016", maker: "サミー",
    name: "ぱちんこCR真・北斗無双", shortName: "CR真・北斗無双",
    catchcopy: "80%×2400。長期稼働を築いたレジェンド。",
    intro: "高継続STと最大2400個で長期稼働した名機。時短引き戻し込みのST突入と、右打ちのラウンド振り分けを簡易再現します。",
    points: ["通常時大当り約1/319.7", "ST130回、継続約80%", "右打ち大当りの50%が約2400個"],
    specs: [["大当り確率", "約1/319.7"], ["ST中", "約1/81.2"], ["ST回数", "130回"], ["実質ST突入", "約64%"], ["ST継続", "約80%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "幻闘RUSH", rushEntry: 0.64, rushContinue: 0.80, firstPayoutIn: 900, firstPayoutOut: 900, rushPayouts: [[2400, 0.50], [1500, 0.14], [600, 0.36]] },
    sources: [["サミー 公式スペック", "https://www.sammy.co.jp/japanese/product/pachinko/2015/cr_shin_hokuto_muso/spec/"], ["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/2402"]]
  }
};
