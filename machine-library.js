window.ICHIGEKI_MACHINES = {
  "fire-force-pachinko": {
    order: 16.5, type: "pachinko", theme: "flame", year: "2023年4月", maker: "SANKYO", updated: "2026-11-05",
    published: "2026-11-05",
    name: "Pフィーバー炎炎ノ消防隊", shortName: "P炎炎ノ消防隊",
    image: "assets/machines/fire-force-pachinko-key-visual.jpg",
    imageAlt: "Pフィーバー炎炎ノ消防隊の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9795",
    catchcopy: "約1/319.7から炎上モードを突破し、トータル継続約81%へ。",
    intro: "初当り後はBATTLE BONUSと炎上モードを経由して炎炎激闘を目指す、二段階突破型のミドル機です。初当り約1/319.7、初回RUSH突入約51%、トータル継続約81%を固定条件で簡易体験できます。",
    points: ["大当り約1/319.7", "初回BATTLE BONUS突入約51%", "炎炎激闘トータル継続約81%"],
    specs: [["大当り", "約1/319.7"], ["右打ち中", "約1/2.0"], ["初回RUSH突入", "約51%"], ["炎上モード突破", "約50%"], ["トータル継続", "約81%"], ["大当り出玉", "ALL約1500個"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 18.0, minSpins: 12, maxSpins: 26, rushLabel: "炎炎激闘", rushEntry: 0.51, rushContinue: 0.81, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.70], [3000, 0.30]] },
    readerGuide: { verdict: "1500個を重ねながら、約1/2の短い当落をテンポよく楽しみたい人向けです。", bestFor: ["二段階突破の緊張感を楽しみたい", "右打ちALL1500個を重視したい"], check: ["初回RUSH突入は約51%", "炎上モードは約50%で炎炎激闘へ"], compare: [["fire-force2-benimaru", "炎炎2 紅丸ver.", "新しいLT型と比較"], ["fire-force2-slot", "L炎炎ノ消防隊2", "スロット版と比較"]] },
    articleSections: [
      { heading: "BATTLE BONUSから炎炎激闘へ", paragraphs: ["通常時の大当りは約1/319.7。初当りの約51%でBATTLE BONUSへ進み、継続抽選を重ねます。", "炎上モードに移行した場合は約50%で炎炎激闘へ。サイトでは初回ルートを約51%のRUSH突入抽選へまとめ、右打ち全体をトータル継続約81%で簡易抽選します。"] },
      { heading: "右打ちはALL約1500個", paragraphs: ["右打ち中の大当りはALL約1500個で、約30%は次回大当りも含めて約3000個を獲得する超炎上FEVERです。", "シミュレーターでは1500個70%・3000個30%の代表振り分けに整理し、複数の内部状態は個別再現しません。"] },
      { heading: "固定条件と遊び方", bullets: ["18.0回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約17,800円", "当り中はPUSH後にラウンドと実獲得出玉を表示", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/pbc/spec/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9795"]]
  },
  "gundam-seed-pachinko": {
    order: 16.6, type: "pachinko", theme: "ice", year: "2023年8月", maker: "SANKYO", updated: "2026-11-05",
    published: "2026-11-05",
    name: "Pフィーバー機動戦士ガンダムSEED", shortName: "PガンダムSEED",
    image: "assets/machines/gundam-seed-pachinko-key-visual.jpg",
    imageAlt: "Pフィーバー機動戦士ガンダムSEEDの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9851",
    catchcopy: "約1/319.7から時短引き戻し込み約66%で、フリーダムHYPERへ。",
    intro: "初当り約1/319.7、時短引き戻し込みのRUSH突入約66%、ST120回の継続約78%を備えたロングST機です。3000FEVERを含む出玉の幅まで固定条件で簡易体験できます。",
    points: ["大当り約1/319.7", "時短引き戻し込みRUSH突入約66%", "RUSH継続約78%・3000FEVER搭載"],
    specs: [["大当り", "約1/319.7"], ["RUSH中", "約1/84.0"], ["RUSH突入", "約66%"], ["ST回数", "120回"], ["RUSH継続", "約78%"], ["右打ち3000個", "約15%"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常スタート", spinsPer1k: 18.0, minSpins: 12, maxSpins: 26, rushLabel: "フリーダムHYPER", rushEntry: 0.66, rushContinue: 0.78, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 0.85], [3000, 0.15]] },
    readerGuide: { verdict: "時短による引き戻しと、120回の王道STをじっくり体験したい人向けです。", bestFor: ["ロングSTの回転演出が好き", "3000個当りも狙いたい"], check: ["RUSH突入約66%は時短引き戻し込み", "基本継続は約78%"], compare: [["gundam-seed-climax", "SEED LT-Light ver.", "ライトLT版と比較"], ["gundam-seed-slot", "スマスロ ガンダムSEED", "スロット版と比較"]] },
    articleSections: [
      { heading: "RUSH突入約66%の内訳", paragraphs: ["初当りは約1/319.7。約20%は3000FEVERからRUSH、約40%は300個からRUSH、残り約40%は300個と時短100回へ進みます。", "時短中の引き戻しを含めたトータルRUSH突入率は約66%です。サイトではルートを統合して約66%の突入抽選にしています。"] },
      { heading: "ST120回・継続約78%", paragraphs: ["フリーダムHYPERは約1/84.0を120回で抽選し、継続率は約78%。右打ち当りは1500個が中心で、約15%が3000FEVERです。", "シミュレーターでは1500個85%・3000個15%に整理します。次回濃厚振り分けを含むTOTAL継続約81%ではなく、基本STの約78%を継続抽選へ使用します。"] },
      { heading: "固定条件と遊び方", bullets: ["18.0回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約17,800円", "ST中は数字が進む演出とPUSH当落を表示", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/pfo/spec/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9851"]]
  },
  "gen-san-chou-idaten": {
    order: 16.7, type: "pachinko", theme: "aqua", year: "2020年4月", maker: "三洋物産", updated: "2026-11-05",
    published: "2026-11-05",
    name: "P大工の源さん 超韋駄天", shortName: "初代 超韋駄天",
    image: "assets/machines/gen-san-chou-idaten-key-visual.jpg",
    imageAlt: "P大工の源さん 超韋駄天の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9168",
    catchcopy: "約60.2%で超源RUSHへ。約1/2.06を4回転で狙う高速決着。",
    intro: "初当り約1/318.13、RUSH突入約60.2%、継続約93%の超高継続機です。3カウント決着とFINAL JUDGE、330個・990個の出玉振り分けを簡易体験できます。",
    points: ["BONUS確率約1/318.13", "RUSH突入約60.2%", "超源RUSH継続約93%"],
    specs: [["BONUS", "約1/318.13"], ["RUSH中BONUS", "約1/2.06"], ["RUSH突入", "約60.2%"], ["RUSH継続", "約93%"], ["電サポ", "3回＋残保留1個"], ["右打ち出玉", "330個・990個"]],
    sim: { kind: "pachinko", hitRate: 318.13, hitLabel: "BONUS", startType: "通常スタート", spinsPer1k: 20.0, minSpins: 14, maxSpins: 30, rushLabel: "超源RUSH", rushEntry: 0.602, rushContinue: 0.93, firstPayoutIn: 660, firstPayoutOut: 660, rushPayouts: [[330, 0.80], [990, 0.20]] },
    readerGuide: { verdict: "少ない回転数で次々に当落が来る、高速・高継続のRUSHを試したい人向けです。", bestFor: ["短いPUSH当落を連続で楽しみたい", "約93%の高継続を体験したい"], check: ["右打ちの80%は約330個", "RUSH非突入時は初回約660個で終了"], compare: [["symphogear3-gold", "シンフォギア3", "高継続ライトミドルと比較"], ["hokuto-boukyousei", "北斗 暴凶星", "高出玉寄りの定番と比較"]] },
    articleSections: [
      { heading: "超源チャレンジ突破でRUSHへ", paragraphs: ["通常時BONUSは大当りと小当りを合算して約1/318.13。初当り後の約60.2%で超源RUSHへ進みます。", "初回は6R約660個。シミュレーターでは超源チャレンジの見せ方をRUSH突入PUSHへまとめています。"] },
      { heading: "3回＋残保留1個で約93%継続", paragraphs: ["右打ち中のBONUSは約1/2.06。電サポ3回の継続期待度約86%と残保留1個約49%を合わせ、トータル約93%です。", "大当り後は約330個が80%、約990個が20%。高速消化を再現しつつ、ラウンドと獲得出玉は読める時間を確保して表示します。"] },
      { heading: "固定条件と遊び方", bullets: ["20.0回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約15,900円", "3カウントとFINAL JUDGEをPUSH演出へ簡易化", "結果は自動でマイ記録へ保存"] }
    ],
    sources: [["SANYO 公式開発記事", "https://www.sanyobussan.co.jp/jobs/special02/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9168"]]
  },
  "goblin-slayer-slot": {
    order: 16.8, type: "slot", theme: "violet", year: "2023年4月", maker: "JFJ", updated: "2026-11-05",
    published: "2026-11-05",
    name: "Lゴブリンスレイヤー", shortName: "スマスロ ゴブリンスレイヤー",
    image: "assets/machines/goblin-slayer-slot-key-visual.jpg",
    imageAlt: "Lゴブリンスレイヤーの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9812",
    catchcopy: "3種類のCZを突破し、約100枚＋純増約2.7枚/GのATへ。",
    intro: "ミッション・チャンス・バトルの3種類のCZを経由してATを目指すスマスロです。設定1のAT初当り約1/547.9、上位ループ約82%までを設定別の固定モデルで簡易体験できます。",
    points: ["設定1 AT初当り約1/547.9", "3種類のCZを搭載", "上位ATループ率約82%"],
    specs: [["CZ合算（設定1）", "約1/226"], ["AT（設定1）", "約1/547.9"], ["AT（設定6）", "約1/435.7"], ["ベース", "約31.6G/50枚"], ["AT純増", "約2.7枚/G"], ["上位AT純増", "約5.0枚/G"], ["上位ループ", "約82%"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "CZ合算", triggerRate: 226, triggerSuccess: 0.412, mainLabel: "ゴブリンスレイヤーRUSH", mainRate: 547.9, base50: 31.6, coinUnit: 4.0, normalMin: 300, normalMax: 1400, specialLabel: "ゴブリンスレイヤーBONUS", specialChance: 0.34, specialMin: 250, specialMax: 1250, specialDisplay: "bonus", cycleFlow: { phase: "GOBLIN SLAYER RUSH", label: "ゴブリンスレイヤーRUSH", statLabel: "RUSH継続", games: [[30, 0.55], [50, 0.30], [100, 0.15]], continueChance: 0.68, maxRounds: 10, rewards: [[{ label: "討伐報酬", payout: 300 }, 0.55], [{ label: "ゴブリンスレイヤーBONUS", payout: 600 }, 0.30], [{ label: "ULTIMATE LOOP報酬", payout: 1200 }, 0.15]], endLabel: "RUSH終了" }, upperChallenge: "GOBLIN'S CROWN", upperChance: 0.14, upperSuccess: 0.50, upperLabel: "PREMIUM RUSH", upperContinue: 0.82, upperPayout: 850, settingRates: { 1: { trigger: 226, main: 547.9, payout: 0.978 }, 2: { trigger: 223, main: 538.4, payout: 0.989 }, 3: { trigger: 215, main: 517.7, payout: 1.012 }, 4: { trigger: 204, main: 492.3, payout: 1.054 }, 5: { trigger: 196, main: 470.5, payout: 1.100 }, 6: { trigger: 184, main: 435.7, payout: 1.149 } } },
    readerGuide: { verdict: "CZの種類を見分け、重い初当りから高ループの上位ATを狙う流れを体験したい人向けです。", bestFor: ["段階式CZのゲーム性が好き", "高い出玉性能の上位ATを狙いたい"], check: ["設定1のAT初当りは約1/547.9", "サイトの上位到達率は比較用モデル"], compare: [["valvrave", "スマスロ ヴァルヴレイヴ", "高出玉ATと比較"], ["kinnikuman-7-slot", "スマスロ キン肉マン", "上位AT型と比較"]] },
    articleSections: [
      { heading: "3種類のCZとゲーム性", paragraphs: ["通常時はゴブリンスレイヤーミッション、ゴブリンスレイヤーチャンス、ゴブリンスレイヤーバトルの3種類のCZからATを目指します。", "CZ合算は設定1約1/226〜設定6約1/184。サイトでは各CZの個別成功率を一つの突破抽選へ整理し、AT初当りの公開値と整合する比較用モデルにしています。"] },
      { heading: "ATと上位ループ", paragraphs: ["ゴブリンスレイヤーRUSHは初期約100枚＋純増約2.7枚/G。継続率は状況により約52〜80%で、上位ATは約82%ループです。", "天井・モード・小役履歴など全内部状態は再現せず、AT、特化ゾーン、上位CZ、上位ATの順に簡易抽選します。"] },
      { heading: "設定別の固定モデル", bullets: ["設定1〜6を開始時に均等抽選", "CZ・AT初当りと機械割は公開値を使用", "50枚あたり31.6G・46枚貸し・5.2枚交換で固定", "設定は最終結果とランキングへ表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9812"]]
  },
  "kinnikuman-7-slot": {
    order: 16.9, type: "slot", theme: "crimson", year: "2023年8月", maker: "セブンリーグ", updated: "2026-11-05",
    published: "2026-11-05",
    name: "スマスロキン肉マン～7人の悪魔超人編～", shortName: "スマスロ キン肉マン",
    image: "assets/machines/kinnikuman-7-slot-key-visual.jpg",
    imageAlt: "スマスロキン肉マン～7人の悪魔超人編～の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9849",
    catchcopy: "正義超人チャレンジでパワーを集め、7セット突破から上位ATへ。",
    intro: "規定超人パワーからATへ進み、7セット継続で上位ATを目指すスマスロです。設定1のAT初当り約1/404.1、上位AT期待獲得約3500枚の流れを設定別に簡易体験できます。",
    points: ["設定1 AT初当り約1/404.1", "7セット継続で上位AT", "上位AT期待獲得約3500枚"],
    specs: [["正義超人CZ（設定1）", "約1/99.8"], ["AT（設定1）", "約1/404.1"], ["AT（設定6）", "約1/336.5"], ["AT純増", "約6.1枚/G"], ["上位到達", "通常AT7セット継続"], ["上位期待獲得", "約3500枚"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "正義超人チャレンジ", triggerRate: 99.8, triggerSuccess: 0.247, mainLabel: "7人の悪魔超人", mainRate: 404.1, base50: 31.0, coinUnit: 3.8, normalMin: 250, normalMax: 1250, specialLabel: "悪魔超人バトル", specialChance: 0.36, specialMin: 250, specialMax: 1200, specialDisplay: "coins", cycleFlow: { phase: "DEVIL CHOJIN BATTLE", label: "悪魔超人バトル", statLabel: "悪魔超人バトル", games: 20, continueChance: 0.70, maxRounds: 7, upperAfterRounds: 7, rewards: [[{ label: "悪魔超人撃破", payout: 250 }, 0.55], [{ label: "正義超人参戦", payout: 500 }, 0.30], [{ label: "バッファローマン撃破", payout: 750 }, 0.15]], endLabel: "7人の悪魔超人終了" }, upperChallenge: "7戦突破", upperChance: 0.20, upperSuccess: 0.50, upperLabel: "悪魔将軍バトル", upperContinue: 0.85, upperPayout: 1000, settingRates: { 1: { trigger: 99.8, main: 404.1, payout: 0.979 }, 2: { trigger: 98.6, main: 400.6, payout: 0.991 }, 4: { trigger: 96.3, main: 362.1, payout: 1.060 }, 5: { trigger: 94.2, main: 350.7, payout: 1.106 }, 6: { trigger: 91.7, main: 336.5, payout: 1.149 } } },
    readerGuide: { verdict: "セット継続のバトルを重ね、7戦突破で大きな上位ATを狙いたい人向けです。", bestFor: ["継続バトル型ATが好き", "設定差も結果で比較したい"], check: ["実機に設定3は非搭載", "上位到達の詳細は比較用モデル"], compare: [["fever-kinnikuman", "eキン肉マン", "パチンコ版と比較"], ["goblin-slayer-slot", "スマスロ ゴブスレ", "高出玉型ATと比較"]] },
    articleSections: [
      { heading: "超人パワーを貯めてATへ", paragraphs: ["通常時は規定超人パワー到達でATを目指します。正義超人チャレンジは超人パワーの獲得ゾーンで、設定1約1/99.8〜設定6約1/91.7です。", "サイトでは規定パワーや内部モードを個別再現せず、正義超人チャレンジとAT初当りの公開値を使って段階表示します。"] },
      { heading: "7セット突破から上位AT", paragraphs: ["通常ATは継続シナリオ管理で、7セット継続すると上位ATへ。上位ATの期待獲得は約3500枚です。", "セットごとのシナリオやバッファローマン乱入などは簡易化し、特化ゾーン、7戦突破、悪魔将軍バトルの順に抽選します。"] },
      { heading: "設定1・2・4・5・6で抽選", bullets: ["実機に設定3はなく、5段階から均等抽選", "AT初当り・正義超人チャレンジ・機械割は公開値を使用", "50枚あたり31.0G・46枚貸し・5.2枚交換で固定", "コンプリート到達時は結果画面に表示"] }
    ],
    sources: [["山佐ネクスト 公式機種サイト", "https://www1.yamasa.co.jp/svakcj/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9849"]]
  },
  "shangri-la-frontier": {
    order: 0.08, type: "pachinko", theme: "emerald", year: "2026年12月", maker: "Sammy", updated: "2026-11-01",
    availableFrom: "2026-12-07",
    name: "e シャングリラ・フロンティア", shortName: "eシャンフロ",
    image: "assets/machines/shangri-la-frontier-key-visual.jpg",
    imageAlt: "e シャングリラ・フロンティアのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10571",
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
    availableFrom: "2026-12-21",
    name: "e ソードアート・オンライン ファントム・バレット", shortName: "e SAO ファントム・バレット",
    image: "assets/machines/sao-phantom-bullet-key-visual.jpg",
    imageAlt: "e ソードアート・オンライン ファントム・バレットのキービジュアル",
    imageCredit: "遊技通信web 機種発表",
    imageSource: "https://www.yugitsushin.jp/news/%E6%80%A7%E8%83%BD%E7%89%B9%E5%8C%96%E3%81%AE%E8%B6%85%E7%81%AB%E5%8A%9B%E3%83%A9%E3%82%A4%E3%83%88%E3%83%9F%E3%83%89%E3%83%ABx%E3%83%95%E3%82%A7%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%88/",
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
  "milliongod-raigeki": {
    order: 0.091, type: "pachinko", theme: "gold", year: "2026年12月", maker: "メーシー", updated: "2026-11-05", published: "2026-11-05",
    availableFrom: "2026-12-07",
    name: "eミリオンゴッド-天空の雷撃-", shortName: "eミリオンゴッド 天空の雷撃",
    image: "assets/machines/milliongod-raigeki-key-visual.webp",
    imageAlt: "eミリオンゴッド-天空の雷撃-の公式キービジュアル",
    imageCredit: "ユニバーサルエンターテインメント 公式機種サイト",
    imageSource: "https://www.universal-777.com/product/pachinko/milliongod_raigeki/",
    catchcopy: "合算約1/259からGOD GAMEへ。右打ちはALL3000個＋α。",
    intro: "2026年12月7日導入予定のスマパチLT機。図柄揃いとANGEL BONUSの合算約1/259、チャンスモード、継続約75%・ALL3000個＋αのGOD GAMEを代表条件で簡易体験できます。",
    points: ["図柄揃いとANGEL BONUSの合算約1/259", "チャンスモードでLT突入確率が最大約1/259", "GOD GAMEは継続約75%・ALL3000個＋α"],
    specs: [["合算大当り", "約1/259.0"], ["図柄揃い", "約1/1236.5"], ["ANGEL BONUS", "約1/327.6"], ["GOD GAME", "ST100回・継続約75%"], ["右打ち出玉", "ALL3000個＋α"], ["スタート", "メガサポ"]],
    sim: { kind: "pachinko", hitRate: 259.0, hitLabel: "合算大当り", startType: "メガサポ", spinsPer1k: 29.4, minSpins: 20, maxSpins: 44, rushLabel: "GOD GAME", rushEntry: 0.60, rushContinue: 0.75, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[3000, 0.80], [6000, 0.18], [9000, 0.02]] },
    readerGuide: { verdict: "よく回る入口からチャンスモードを経由し、3000個以上を重ねるLTを狙いたい人向けです。", bestFor: ["メガサポの回転感を比較したい", "ALL3000個＋αの出玉を体験したい"], check: ["通常時は複数モードを持つ", "サイトのLT突入は比較用の代表モデル"], compare: [["shangri-la-frontier", "eシャンフロ", "4500個中心のLTと比較"], ["keiji-kumo", "花の慶次 雲", "ループ型スマパチと比較"]] },
    articleSections: [
      { heading: "メガサポと合算約1/259", paragraphs: ["通常時は図柄揃い約1/1236.5とANGEL BONUS約1/327.6を合わせ、合算約1/259.0で大当りを抽選します。神ルートと神デカスタートからなるメガサポで、連続回転率約99.9%を掲げる機種です。", "サイトでは比較用の回転率を29.4回/1,000円に固定します。ホールごとの実回転率や調整を保証する値ではありません。"] },
      { heading: "チャンスモードからGOD GAMEへ", paragraphs: ["ANGEL BONUS後はモードが上がるほどLT突入期待度が上昇し、HEAVENでは次回大当りでのLT突入が濃厚とされます。", "モード移行の全振り分けは独立再現せず、通常時全体を約60%の代表的なLT突入抽選へまとめます。導入後に正式な全数値が確認できた場合は更新します。"] },
      { heading: "ALL3000個＋αのGOD GAME", paragraphs: ["GOD GAMEはST100回・継続約75%。右打ち中の大当りはすべて3000個で、毎回1G連のチャンスがあります。GOD図柄なら最低6000個です。", "シミュレーターでは3000個を中心に6000個・9000個の代表出玉を加えます。1G連の全振り分けを完全再現するものではありません。"] },
      { heading: "導入前の固定条件", bullets: ["2026年12月7日までは準備中表示", "29.4回/1,000円・250玉貸し・28玉交換で固定", "導入後に正式情報と実機挙動を再確認", "結果は解禁後にマイ記録へ自動保存"] }
    ],
    sources: [["ユニバーサル公式機種サイト", "https://www.universal-777.com/product/pachinko/milliongod_raigeki/"], ["パチヨミ！ 導入前スペック", "https://pachiyomi.com/pachinko/e-million-god-tenku-no-raigeki"], ["一撃 2026年12月新台カレンダー", "https://1geki.jp/newmachinecalender/202612/"]]
  },
  "garo13-hagane": {
    order: 0.092, type: "pachinko", theme: "gold", year: "2026年12月", maker: "サンセイR&D", updated: "2026-11-05", published: "2026-11-05",
    availableFrom: "2026-12-21",
    name: "e牙狼13 ハガネを継ぐ者", shortName: "e牙狼13",
    catchcopy: "図柄揃いの50%で真魔戒RUSHへ。右打ちの45%が6000個以上。",
    intro: "2026年12月21日導入予定のスマパチLT機。図柄揃い約1/437、チャージ込み約1/349.9、真魔戒RUSH継続約75%と、玖千ノ宴モードの引き戻しを代表条件で簡易体験できます。",
    points: ["図柄揃い約1/437・チャージ込み約1/349.9", "図柄揃いの50%で真魔戒RUSH", "RUSH中は1500個または6000個以上"],
    specs: [["合算大当り", "約1/349.9"], ["図柄揃い", "約1/437"], ["ガロチャージ", "約1/1745"], ["RUSH突入", "図柄揃い時50%"], ["RUSH", "ST130回・継続約75%"], ["CZ", "40回・期待度約18%"]],
    sim: { kind: "pachinko", hitRate: 349.9, hitLabel: "合算大当り", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "真魔戒RUSH", rushEntry: 0.40, rushContinue: 0.75, firstPayoutIn: 1000, firstPayoutOut: 1000, rushPayouts: [[1500, 0.55], [6000, 0.38], [7500, 0.07]] },
    readerGuide: { verdict: "重い図柄揃いを越え、6000個以上の比率が高いRUSHを狙いたい人向けです。", bestFor: ["大きな出玉振り分けを重視したい", "RUSH終了後のCZも含めて流れを知りたい"], check: ["RUSH突入50%は図柄揃い時", "合算初当り全体では代表値40%を使用"], compare: [["garo12-gokugen", "牙狼12 黄金騎士極限", "前作と比較"], ["milliongod-raigeki", "eミリオンゴッド", "3000個型LTと比較"]] },
    articleSections: [
      { heading: "図柄揃いとガロチャージ", paragraphs: ["通常時は図柄揃い約1/437とガロチャージ約1/1745を合わせ、合算約1/349.9です。図柄揃い時の50%が真魔戒RUSHへ進みます。", "チャージを含む初当り全体ではRUSH突入が約40%となるため、シミュレーターは合算大当り約1/349.9・突入約40%の代表モデルを使用します。"] },
      { heading: "玖千ノ宴モード", paragraphs: ["ガロチャージ後、通常大当りの一部、RUSH終了後などは左打ち40回のCZへ。実質約1/199で、40回の大当り期待度は約18%です。", "CZ中は9000個振り分けもありますが、通常時フラグと大当りの全ループは独立再現せず、記事でゲーム性を説明します。"] },
      { heading: "真魔戒RUSHの出玉", paragraphs: ["真魔戒RUSHは約1/95.1を130回で抽選し、継続約75%。大当りは1500個55%、6000個38%、7500個7%です。", "RUSH終了後のCZによる引き戻しは継続率へ含めず、約75%で一度区切って表示します。"] },
      { heading: "導入前情報について", bullets: ["2026年12月21日までは準備中表示", "17.0回/1,000円・250玉貸し・28玉交換で固定", "メーカー正式値の追加公開時に再確認", "娯楽用の簡易モデルで実収支を保証しない"] }
    ],
    sources: [["サンセイR&D 2026年製品情報", "https://www.sansei-rd.com/products/index.html"], ["SLOT HACK 導入前スペック", "https://slothack.net/matome/206568/"], ["パチンコ・パチスロ.com 機種概要", "https://pachinkopachisro.com/archives/pachinko/e-garo13/"]]
  },
  "godzilla-eva-wind-burst": {
    order: 0.093, type: "pachinko", theme: "ice", year: "2026年12月", maker: "ビスティ", updated: "2026-11-05", published: "2026-11-05",
    availableFrom: "2026-12-21",
    name: "e ゴジラ対エヴァンゲリオン ～WIND BURST～", shortName: "eゴジエヴァ WIND BURST",
    catchcopy: "怪獣ごとに継続期待度が変わる、風体感デバイス搭載の新作。",
    intro: "2026年12月21日導入予定のスマパチLT機。図柄揃い約1/399.9、RUSH突入約55%、対戦怪獣ごとに約71〜90%とされる継続性能を、導入前の代表条件で簡易体験できます。",
    points: ["図柄揃い約1/399.9・合算約1/349.9", "図柄揃い時RUSH突入約55%", "対戦怪獣で継続期待度が変化"],
    specs: [["図柄揃い", "約1/399.9"], ["合算大当り", "約1/349.9"], ["RUSH突入", "図柄揃い時約55%"], ["RUSH継続", "約71〜90%"], ["初回出玉", "図柄揃い時1500個"], ["導入予定", "2026年12月21日"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "WIND BURST RUSH", rushEntry: 0.55, rushContinue: 0.80, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.60], [3000, 0.25], [4500, 0.15]] },
    readerGuide: { verdict: "対戦相手によって継続期待度が変わる、バトル型RUSHを試したい人向けです。", bestFor: ["継続率が変動するRUSHが好き", "ゴジラとエヴァの演出を重視したい"], check: ["導入前の暫定公開値を使用", "シミュレーターは平均約80%の代表モデル"], compare: [["godzilla-eva2-slot", "スマスロ ゴジエヴァ2", "スロット版と比較"], ["garo13-hagane", "e牙狼13", "同日導入の新基準機と比較"]] },
    articleSections: [
      { heading: "図柄揃いからRUSHへ", paragraphs: ["導入前情報では図柄揃い約1/399.9、チャージを含む合算約1/349.9、図柄揃い時のRUSH突入約55%です。図柄揃いは1500個が基本とされています。", "サイトでは図柄揃いを入口にして、チャージの細かな分岐を独立再現しません。"] },
      { heading: "怪獣で変わる継続期待度", paragraphs: ["RUSHは対戦怪獣によって継続期待度が約71〜90%へ変わるゲーム性です。WIND BURSTの風体感を含む演出面も特徴です。", "対戦相手の選択率など全振り分けは導入前時点で揃っていないため、シミュレーターは平均約80%の代表値を使用します。"] },
      { heading: "出玉は代表分布で表示", paragraphs: ["公開前の出玉モード差を断定せず、1500個を中心に3000個・4500個を加えた比較用分布へ整理します。", "メーカーの正式スペック公開後はRUSHモード、出玉、CZの条件を同時に更新します。"] },
      { heading: "導入前情報について", bullets: ["2026年12月21日までは準備中表示", "17.0回/1,000円・250玉貸し・28玉交換で固定", "未確定値は代表モデルと明記", "導入後の正式情報で再検証"] }
    ],
    sources: [["フィールズ公式 新製品情報", "https://www.fields.biz/?lang=ja"], ["円谷フィールズHD 2026年ニュース", "https://www.tsuburaya-fields.co.jp/ir/e/news/index.html?cfg=pc"], ["パチンコスペック解析 機種概要", "https://pachinko-spec.info/spec/175034/"]]
  },
  "basilisk4-slot": {
    order: 0.094, type: "slot", theme: "emerald", year: "2026年12月", maker: "アクロス", updated: "2026-11-05", published: "2026-11-05",
    availableFrom: "2026-12-21",
    name: "スマスロ バジリスク～甲賀忍法帖～IV", shortName: "スマスロ バジリスクIV",
    image: "assets/machines/basilisk4-key-visual.webp",
    imageAlt: "スマスロ バジリスク～甲賀忍法帖～IVの公式キービジュアル",
    imageCredit: "ユニバーサルエンターテインメント 公式機種サイト",
    imageSource: "https://www.universal-777.com/product/slot/basilisk4/",
    catchcopy: "胎動の刻と争忍の刻を巡り、真瞳術から真バジリスクタイムへ。",
    intro: "2026年12月21日導入予定のスマスロ。CZ、胎動の刻、争忍の刻、真瞳術チャンス、純増約5.3枚/Gの真バジリスクタイムまでを設定別の固定モデルで簡易体験できます。",
    points: ["設定1 CZ約1/285.5・AT約1/334.7", "胎動の刻は差枚上乗せ・純増変動型", "真バジリスクタイムは期待獲得3000枚超"],
    specs: [["CZ（設定1）", "約1/285.5"], ["AT（設定1）", "約1/334.7"], ["AT（設定6）", "約1/251.7"], ["ベース", "約30.6G/50枚"], ["純増", "約1.1・3.5・5.3枚/G"], ["出玉率", "97.8〜114.2%"]],
    sim: { kind: "slot", triggerLabel: "破幻チャレンジ", triggerRate: 285.5, triggerSuccess: 0.55, mainLabel: "バジリスクタイム", mainRate: 334.7, base50: 30.6, coinUnit: 3.3, normalMin: 300, normalMax: 1300, specialLabel: "胎動の刻・連撃", specialChance: 0.38, specialMin: 250, specialMax: 1200, specialDisplay: "coins", cycleFlow: { phase: "BASILISK TIME IV", label: "争忍の刻", statLabel: "争忍継続", games: 30, continueChance: 0.75, maxRounds: 12, rewards: [[{ label: "胎動の刻", payout: 120 }, 0.55], [{ label: "胎動の刻・連撃", payout: 300 }, 0.30], [{ label: "真瞳術ストック", payout: 600 }, 0.15]], endLabel: "バジリスクタイム終了" }, upperChallenge: "真眼の極", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "真バジリスクタイム", upperContinue: 0.82, upperPayout: 900, settingRates: { 1: { trigger: 285.5, main: 334.7, payout: 0.978 }, 2: { trigger: 256.9, main: 299.4, payout: 0.987 }, 3: { trigger: 282.4, main: 329.4, payout: 1.014 }, 4: { trigger: 229.7, main: 264.6, payout: 1.060 }, 5: { trigger: 238.4, main: 274.1, payout: 1.098 }, 6: { trigger: 220.1, main: 251.7, payout: 1.142 } } },
    readerGuide: { verdict: "王道の継続バトルに差枚上乗せと高純増の上位ATを加えた流れを試したい人向けです。", bestFor: ["絆高確と継続バトルが好き", "設定4・5の非直線的な初当り差も比べたい"], check: ["設定4は設定5よりCZ・ATが軽い", "上位到達は比較用の代表抽選"], compare: [["basilisk-tenzen-slot", "バジリスク絆2 天膳", "前作スマスロと比較"], ["bancho-banzuke", "押忍！番長番付", "12月のAT機と比較"]] },
    articleSections: [
      { heading: "設定別CZ・AT初当り", paragraphs: ["CZは設定1約1/285.5〜設定6約1/220.1、ATは設定1約1/334.7〜設定6約1/251.7です。設定4が設定5より軽い公開値もそのまま使用します。", "START時に設定1〜6を均等抽選し、今回の設定は最終結果・マイ記録・ランキングへ表示します。"] },
      { heading: "胎動の刻と争忍の刻", paragraphs: ["ATは差枚数を上乗せする胎動の刻と、継続をかける争忍の刻で1セット。胎動の刻は純増が約1.1・3.5・5.3枚/Gへ変わり、上乗せや連撃の期待度も変化します。", "シミュレーターは全小役と絆高確を個別再現せず、特化ゾーンの獲得枚数へまとめます。"] },
      { heading: "真瞳術から上位ATへ", paragraphs: ["エンディング後は真眼の極を経由し、真瞳術チャンスを目指します。真瞳術は平均約4.5個のATストックに加え、真バジリスクタイム突入のチャンスです。", "上位ATは純増約5.3枚/G、突入時の平均期待獲得は3000枚超。到達率はサイト内の代表抽選で、実機の結果を保証しません。"] },
      { heading: "導入前の固定条件", bullets: ["2026年12月21日までは準備中表示", "30.6G/50枚・46枚貸し・5.2枚交換で固定", "コイン単価3.3円を荒さの目安として表記", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ユニバーサル公式機種サイト", "https://www.universal-777.com/product/slot/basilisk4/"], ["パチマガスロマガFREE 基本情報", "https://psmaga.com/e/pachi/pla/s_conq/across_slot/24/kh01.php"], ["なな徹 設定別スペック", "https://nana-press.com/kaiseki/machine/1267/"]]
  },
  "assault-lily-slot": {
    order: 0.095, type: "slot", theme: "sakura", year: "2026年12月", maker: "七匠", updated: "2026-11-05", published: "2026-11-05",
    availableFrom: "2026-12-07",
    name: "L アサルトリリィ", shortName: "スマスロ アサルトリリィ",
    catchcopy: "規定ポイントとゲーム数から、差枚数管理のアサルトリリィRUSHへ。",
    intro: "2026年12月7日導入予定のスマスロ。リリィチャレンジ、BONUS、純増約3.5枚/GのアサルトリリィRUSH、上乗せ特化、上位ATまでを設定別に簡易体験できます。",
    points: ["設定1 初当り約1/273.4・RUSH約1/417.7", "RUSHは初期150枚＋α・純増約3.5枚/G", "上位ATは上乗せ性能が強化"],
    specs: [["初当り（設定1）", "約1/273.4"], ["RUSH（設定1）", "約1/417.7"], ["RUSH（設定6）", "約1/296.8"], ["ベース", "約31G/50枚"], ["RUSH純増", "約3.5枚/G"], ["出玉率", "97.5〜112.5%"]],
    sim: { kind: "slot", triggerLabel: "リリィチャレンジ", triggerRate: 273.4, triggerSuccess: 0.56, mainLabel: "アサルトリリィRUSH", mainRate: 417.7, base50: 31.0, coinUnit: 3.1, normalMin: 250, normalMax: 1150, specialLabel: "ヒュージバトル", specialChance: 0.38, specialMin: 200, specialMax: 1100, specialDisplay: "coins", cycleFlow: { phase: "ASSAULT LILY RUSH", label: "ヒュージバトル", statLabel: "ヒュージ撃破", games: 20, continueChance: 0.70, maxRounds: 10, rewards: [[{ label: "ヒュージ撃破", payout: 150 }, 0.55], [{ label: "アサルトスパイラル", payout: 300 }, 0.30], [{ label: "レアスキル報酬", payout: 600 }, 0.15]], endLabel: "RUSH終了" }, upperChallenge: "ラストバレットジャッジメント", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "アサルトリリィRUSH SUPER", upperContinue: 0.80, upperPayout: 650, settingRates: { 1: { trigger: 273.4, main: 417.7, payout: 0.975 }, 2: { trigger: 266.6, main: 401.0, payout: 0.988 }, 3: { trigger: 257.0, main: 377.4, payout: 1.005 }, 4: { trigger: 243.5, main: 345.9, payout: 1.043 }, 5: { trigger: 232.3, main: 320.4, payout: 1.078 }, 6: { trigger: 220.6, main: 296.8, payout: 1.125 } } },
    readerGuide: { verdict: "ポイント・ゲーム数・CZからRUSHを目指し、上乗せ特化を重ねる差枚ATが好きな人向けです。", bestFor: ["上乗せ特化を段階的に楽しみたい", "設定別RUSH初当りを比べたい"], check: ["BONUSとRUSH初当りは別の数値", "上位到達率は比較用の代表モデル"], compare: [["assault-lily", "eアサルトリリィ", "パチンコ版と比較"], ["blue-reflection-tie", "Lブルーリフレクション", "同月の作品系ATと比較"]] },
    articleSections: [
      { heading: "ポイント・ゲーム数・レア役が入口", paragraphs: ["通常時は梨璃・夢結のポイント、100Gごとの規定ゲーム数、レア役からBONUSやRUSHを目指します。CZは複数のリリィチャレンジで構成されます。", "サイトでは複数の入口を初当り確率へまとめ、設定1約1/273.4〜設定6約1/220.6でCZ演出を開始します。"] },
      { heading: "BONUSとRUSHを分けて表示", paragraphs: ["赤7BONUSは約88枚で、RUSH期待度は約29%。メインRUSHは設定1約1/417.7〜設定6約1/296.8です。", "シミュレーターではBONUS・CZを前段に置き、公開RUSH初当りと整合するよう代表的な成功抽選へ整理します。"] },
      { heading: "上乗せ特化と上位AT", paragraphs: ["アサルトリリィRUSHは初期150枚＋αの差枚数管理型。ボスヒュージ襲来、ヒュージバトル、アサルトスパイラルで上乗せを狙います。", "ラストバレットジャッジメント成功で上位ATへ。上位は純増を維持しながら上乗せ性能が強化されますが、全振り分けは導入後に再確認します。"] },
      { heading: "導入前の固定条件", bullets: ["2026年12月7日までは準備中表示", "31.0G/50枚・46枚貸し・5.2枚交換で固定", "設定1〜6を開始時に均等抽選", "結果とランキングに設定を表示"] }
    ],
    sources: [["円谷フィールズHD 発売発表", "https://prtimes.jp/main/html/rd/p/000000069.000180393.html"], ["Re.design 機種基本情報", "https://aaa.redesign777.tokyo/Spec/SlotView?flag=True&id=S2026091020353401"], ["SLOT HACK 機種概要", "https://slothack.net/matome/203374/"]]
  },
  "toaru3-pachinko": {
    order: 0.1, type: "pachinko", theme: "violet", year: "2026年11月", maker: "オレンジ", updated: "2026-11-03",
    published: "2026-11-02",
    name: "eとある魔術の禁書目録3", shortName: "eとある3",
    image: "assets/machines/toaru3-pachinko-key-visual.jpg",
    imageAlt: "eとある魔術の禁書目録3のキービジュアル",
    imageCredit: "パチマガスロマガFREE 機種情報",
    imageSource: "https://pachimaga.com/free/mach/maker-p/orange/e_toaru3.php",
    catchcopy: "約1/348.6から、3段階STと最大出玉ループへ。",
    intro: "2026年11月2日から順次導入が始まったスマパチLT機。初当り約1/348.6、ST突入約50%、3段階STのTOTAL継続約75%を固定条件で簡易体験できます。",
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
    order: 0.11, type: "pachinko", theme: "emerald", year: "2026年11月", maker: "KYORAKU", updated: "2026-11-03",
    published: "2026-11-02",
    name: "e 仮面ライダーBLACK デカヘソ Light Version", shortName: "ライダーBLACK Light",
    image: "assets/machines/kamen-rider-black-light-key-visual.jpg",
    imageAlt: "e 仮面ライダーBLACK デカヘソ Light Versionの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10584",
    catchcopy: "デカヘソ×約1/129.9から、宿命BATTLEへ。",
    intro: "2026年11月2日から順次導入が始まったデカヘソ搭載スマパチ。約1/129.9の初当り、JUSTICE RUSH、1G連特化ゾーン『宿命BATTLE』までを簡易体験できます。",
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
    order: 0.112, type: "pachinko", theme: "violet", year: "2026年11月", maker: "サンスリー", updated: "2026-11-03",
    published: "2026-11-02",
    name: "eグランベルム 319ver.", shortName: "eグランベルム 319",
    image: "assets/machines/granbelm-319-key-visual.jpg",
    imageAlt: "eグランベルム 319ver.のキービジュアル",
    imageCredit: "なな徹 機種情報",
    imageSource: "https://nana-press.com/kaiseki/machine/1240/",
    catchcopy: "約51%で直LTへ。RESTARTと超アドレナリンBOOSTを体験。",
    intro: "2026年11月2日から順次導入が始まったスマパチLT機。初当り約1/319.6、グランベルムRUSH突入約51%、トータル継続約77%を固定条件で簡易体験できます。",
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
    order: 0.114, type: "pachinko", theme: "gold", year: "2026年11月", maker: "SANKYO", updated: "2026-11-03",
    published: "2026-11-02",
    name: "eフィーバー妖怪ウォッチ", shortName: "eF妖怪ウォッチ",
    image: "assets/machines/fever-yokai-watch-key-visual.jpg",
    imageAlt: "eフィーバー妖怪ウォッチの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10549",
    catchcopy: "コマチャレンジ込み約61%から、トータル約80%の怪闘へ。",
    intro: "2026年11月2日から順次導入が始まったスマパチ。大当り約1/319.7、時短引き戻し込みのRUSH突入約61%、トータル継続約80%を簡易体験できます。",
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
    order: 0.116, type: "pachinko", theme: "ember", year: "2026年11月", maker: "Sammy", updated: "2026-11-03",
    published: "2026-11-02",
    name: "e 獣王 獅子の一撃", shortName: "e獣王 獅子の一撃",
    image: "assets/machines/juoh-shishi-no-ichigeki-key-visual.jpg",
    imageAlt: "e 獣王 獅子の一撃のキービジュアル",
    imageCredit: "パチセブン 基本スペック",
    imageSource: "https://pachiseven.jp/articles/detail/26454",
    catchcopy: "ドデカSTRAIGHTから、平均約9800個のサバンナチャンスへ。",
    intro: "2026年11月2日から順次導入が始まったドデカSTRAIGHT搭載スマパチ。初当り約1/319.7、獣王RUSH突入50%、右打ち中約50%のサバンナチャンスを簡易体験できます。",
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
    order: 0.118, type: "pachinko", theme: "aqua", year: "2026年11月", maker: "高尾", updated: "2026-11-03",
    published: "2026-11-02",
    name: "e ノーゲーム・ノーライフ 119Ver.", shortName: "eノゲノラ 119",
    image: "assets/machines/no-game-no-life-119-key-visual.jpg",
    imageAlt: "e ノーゲーム・ノーライフ 119Ver.のキービジュアル",
    imageCredit: "パチマガスロマガFREE スペック",
    imageSource: "https://pachimaga.com/free/mach/maker-p/takao/e_nogamenolife119.php",
    catchcopy: "ALL1000個の初当りから、約80%のHYPERへ。",
    intro: "2026年11月2日から順次導入が始まったライトスマパチ。初当り約1/119.8、ノゲノラッシュ突入50%、突破後のHYPER継続約80%を簡易体験できます。",
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
    image: "assets/machines/karakuri2-maou-key-visual.jpg",
    imageAlt: "eフィーバーからくりサーカス2 魔王ver.の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10115",
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
    image: "assets/machines/shin-eva-type-rei-key-visual.jpg",
    imageAlt: "ぱちんこ シン・エヴァンゲリオン Type レイの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9925",
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
    image: "assets/machines/sao-senko-no-kiseki-key-visual.jpg",
    imageAlt: "e ソードアート・オンライン 閃光の軌跡のキービジュアル",
    imageCredit: "KYORAKU",
    imageSource: "https://www.kyoraku.co.jp/product_site/2024/sao_lt/view/spec/",
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
    image: "assets/machines/hokuto10-pachinko-key-visual.jpg",
    imageAlt: "e北斗の拳10の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10054",
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
    image: "assets/machines/kaguya-sama-slot-key-visual.jpg",
    imageAlt: "Lパチスロ かぐや様は告らせたいの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10091",
    catchcopy: "告らせたいチャレンジを突破し、BONUSループへ。",
    intro: "設定別BONUS初当りを使い、告らせたいチャレンジ、1G連、チカブレイク、EXTRA BONUSまでを簡易体験できます。",
    points: ["BONUS設定1約1/362〜設定6約1/335", "CZ成功期待度約58%", "BONUSループ最大約80%"],
    specs: [["BONUS（設定1）", "約1/362"], ["BONUS（設定6）", "約1/335"], ["CZ期待度", "約58%"], ["BONUS純増", "約9.0枚/G"], ["ベース", "約31G/50枚"], ["ループ率", "最大約80%"]],
    sim: { kind: "slot", triggerLabel: "告らせたいチャレンジ", triggerRate: 210, triggerSuccess: 0.58, mainLabel: "KAGUYA BONUS", mainRate: 362, base50: 31.0, coinUnit: 4.2, normalMin: 83, normalMax: 490, normalAwards: [[{ label: "SUPER BIG", payout: 490, games: 54 }, 0.01], [{ label: "BIG", payout: 270, games: 30 }, 0.50], [{ label: "REG", payout: 83, games: 10 }, 0.49]], atPureIncrease: 9.0, specialLabel: "チカブレイク", specialChance: 0.35, specialMin: 250, specialMax: 1200, specialDisplay: "bonus", cycleFlow: { phase: "KAGUYA BONUS LOOP", label: "BONUSループ", statLabel: "BONUSループ", games: [[10, 0.49], [30, 0.50], [54, 0.01]], continueChance: 0.68, maxRounds: 12, rewards: [[{ label: "REG BONUS", payout: 83 }, 0.49], [{ label: "BIG BONUS", payout: 270 }, 0.50], [{ label: "SUPER BIG", payout: 490 }, 0.01]], endLabel: "BONUSループ終了" }, upperChallenge: "奇跡的相性MODE", upperChance: 0.20, upperSuccess: 0.55, upperLabel: "EXTRA BONUS", upperContinue: 0.80, upperPayout: 700, upperPureIncrease: 9.0, upperSetGames: [[50, 0.50], [100, 0.50]], settingRates: { 1: { trigger: 210, main: 362, payout: 0.977 }, 2: { trigger: 208, main: 360, payout: 0.988 }, 3: { trigger: 205, main: 357, payout: 1.012 }, 4: { trigger: 200, main: 349, payout: 1.058 }, 5: { trigger: 196, main: 343, payout: 1.108 }, 6: { trigger: 192, main: 335, payout: 1.149 } } },
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
    image: "assets/machines/shin-eva-slot-key-visual.jpg",
    imageAlt: "Lパチスロ シン・エヴァンゲリオンの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10196",
    catchcopy: "作戦STを突破し、オップファータイプ殲滅作戦へ。",
    intro: "設定別初当りを使い、疑似ボーナス、作戦ST、三機殲滅、上位ATまでを簡易体験できます。",
    points: ["初当り設定1約1/291.1〜設定6約1/212.5", "STと疑似BONUSのループ", "上位CZから上位ATへ"],
    specs: [["初当り（設定1）", "約1/291.1"], ["初当り（設定6）", "約1/212.5"], ["タイプ", "ST＋疑似BONUS"], ["ST純増", "約0.1枚/G"], ["BONUS純増", "約5.0枚/G"], ["上位CZ", "マリ獣化チャレンジ"], ["上位AT", "オップファータイプ殲滅作戦"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "作戦ST", triggerRate: 291.1, triggerSuccess: 1, mainLabel: "シン・エヴァBONUS", mainRate: 291.1, base50: 32.0, coinUnit: 3.3, normalMin: 200, normalMax: 1000, atPureIncrease: 5.0, specialLabel: "三機殲滅", specialChance: 0.34, specialMin: 200, specialMax: 950, specialDisplay: "bonus", cycleFlow: { phase: "OPERATION ST", label: "作戦ST", statLabel: "BONUSループ", games: 30, continueChance: 0.68, maxRounds: 12, rewards: [[{ label: "シン・エヴァBONUS", payout: 200 }, 0.55], [{ label: "三機殲滅BONUS", payout: 400 }, 0.30], [{ label: "エピソードBONUS", payout: 800 }, 0.15]], endLabel: "作戦ST終了" }, upperChallenge: "マリ獣化チャレンジ", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "オップファータイプ殲滅作戦", upperContinue: 0.78, upperPayout: 620, upperPureIncrease: 5.0, settingRates: { 1: { trigger: 291.1, main: 291.1, payout: 0.977 }, 2: { trigger: 283.5, main: 283.5, payout: 0.988 }, 3: { trigger: 264.5, main: 264.5, payout: 1.012 }, 4: { trigger: 236.6, main: 236.6, payout: 1.057 }, 5: { trigger: 224.8, main: 224.8, payout: 1.103 }, 6: { trigger: 212.5, main: 212.5, payout: 1.149 } } },
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
    image: "assets/machines/dumbbell-slot-key-visual.jpg",
    imageAlt: "Lパチスロ ダンベル何キロ持てる？の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10141",
    catchcopy: "MUSCLE ZONEを突破し、ゴールデンタイムへ。",
    intro: "設定別CZ・AT確率を使い、MUSCLE ZONE、ダンベルBONUS、ゴールデンチャレンジ、上位ループまでを簡易体験できます。",
    points: ["CZ設定1約1/247〜設定6約1/239", "AT設定1約1/591〜設定6約1/504", "AT純増約8.5枚/G"],
    specs: [["CZ（設定1）", "約1/247"], ["CZ（設定6）", "約1/239"], ["AT（設定1）", "約1/591"], ["AT（設定6）", "約1/504"], ["CZ期待度", "約40%"], ["AT純増", "約8.5枚/G"]],
    sim: { kind: "slot", triggerLabel: "MUSCLE ZONE", triggerRate: 247, triggerSuccess: 0.40, mainLabel: "ダンベルBONUS", mainRate: 591, base50: 31.5, coinUnit: 3.6, normalMin: 250, normalMax: 1200, atPureIncrease: 8.5, specialLabel: "ゴールデンタイム", specialChance: 0.34, specialMin: 300, specialMax: 1200, specialDisplay: "bonus", cycleFlow: { phase: "GOLDEN TIME", label: "ゴールデンタイム", statLabel: "Vストック消化", games: [[20, 0.55], [40, 0.30], [80, 0.15]], continueChance: 0.56, maxRounds: 8, rewards: [[{ label: "ダンベルBONUS", payout: 250 }, 0.55], [{ label: "VストックBONUS", payout: 500 }, 0.30], [{ label: "筋肉覚醒BONUS", payout: 1000 }, 0.15]], endLabel: "ゴールデンタイム終了" }, upperChallenge: "ゴールデンチャレンジ", upperChance: 0.18, upperSuccess: 0.56, upperLabel: "金肉BONUS", upperContinue: 0.56, upperPayout: 650, settingRates: { 1: { trigger: 247, main: 591, payout: 0.977 }, 2: { trigger: 245, main: 576, payout: 0.988 }, 3: { trigger: 244, main: 546, payout: 1.012 }, 4: { trigger: 242, main: 532, payout: 1.057 }, 5: { trigger: 240, main: 512, payout: 1.105 }, 6: { trigger: 239, main: 504, payout: 1.149 } } },
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
    image: "assets/machines/symphogear-seigi-slot-key-visual.jpg",
    imageAlt: "Lパチスロ 戦姫絶唱シンフォギア 正義の歌の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10050",
    catchcopy: "AXZ BATTLEを突破し、絶唱から黄金ATへ。",
    intro: "設定別AT確率を使い、AXZ BATTLE、AXZラッシュ、ギアVアタック、黄金ATまでを簡易体験できます。",
    points: ["AT設定1約1/295〜設定6約1/199", "AXZ BATTLE期待度約65%", "上位AT純増約5.0枚/G"],
    specs: [["AT（設定1）", "約1/295"], ["AT（設定6）", "約1/199"], ["CZ期待度", "約65%"], ["通常AT純増", "約2.8枚/G"], ["上位AT純増", "約5.0枚/G"], ["絶唱BATTLE", "期待度約60%"]],
    sim: { kind: "slot", triggerLabel: "AXZ BATTLE", triggerRate: 210, triggerSuccess: 0.65, mainLabel: "AXZラッシュ", mainRate: 295, base50: 32.0, coinUnit: 3.5, normalMin: 220, normalMax: 1100, specialLabel: "ギアVアタック", specialChance: 0.36, specialMin: 200, specialMax: 1050, specialOutcomes: [[{ kind: "games", label: "ギアVアタック", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]], triggerGames: 8 }, 0.70], [{ kind: "bonus", label: "絶唱", games: [[20, 0.60], [40, 0.40]], payouts: [[200, 0.60], [400, 0.40]], triggerGames: 10 }, 0.30]], upperChallenge: "絶唱BATTLE", upperChance: 0.20, upperSuccess: 0.60, upperLabel: "AXZラッシュ 黄金", upperContinue: 0.72, upperPayout: 600, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 210, main: 295, payout: 0.978 }, 2: { trigger: 205, main: 285, payout: 0.988 }, 4: { trigger: 185, main: 250, payout: 1.054 }, 5: { trigger: 170, main: 227, payout: 1.105 }, 6: { trigger: 155, main: 199, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別AT確率を反映", paragraphs: ["ATは設定1約1/295から設定6約1/199。実機と同じく設定3を除く1・2・4・5・6からランダム抽選します。", "選ばれた設定は結果と機種別ランキングへ表示します。"] },
      { heading: "AXZラッシュから黄金へ", paragraphs: ["AXZ BATTLEの成功期待度は約65%。通常ATは純増約2.8枚/Gで、ギアVアタックを重ねて上位を目指します。", "絶唱BATTLE成功期待度約60%と上位AT純増約5.0枚/Gを代表的な上位抽選へまとめます。"] },
      { heading: "固定レートと収支の条件", bullets: ["約32G/50枚・1,000円46枚貸し・5.2枚交換で固定", "コイン単価は設定1参考値約3.5円", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/sqe/spec/"], ["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/962/"]]
  },
  "garo-yami-slot": {
    order: 0.12, type: "slot", theme: "gold", year: "2026年11月", maker: "サンセイR&D", updated: "2026-11-07",
    published: "2026-11-02",
    name: "L牙狼 闇を照らす者", shortName: "スマスロ 牙狼", initialHitLabel: "初当りBONUS",
    image: "assets/machines/garo-yami-slot-key-visual.jpg",
    imageAlt: "L牙狼 闇を照らす者のキービジュアル",
    imageCredit: "ちょんぼりすた 機種情報",
    imageSource: "https://chonborista.com/slot/sansei-slot/270768/",
    catchcopy: "金色になれ！を突破し、究極魔戒RUSHへ。",
    intro: "2026年11月2日から順次導入が始まったスマスロ。設定別CZ・BONUS確率を使い、20Gの初当りBONUS、SUPER GARO BONUS、3戦突破型CZ『金色になれ！』、究極魔戒RUSHまでを専用演出で体験できます。",
    points: ["CZは設定1約1/156.6〜設定6約1/141.1", "BONUSは20G・純増約9.1枚/G、BIG:BONUS＝6:4", "究極魔戒RUSHは継続約82.6%・平均約740枚"],
    specs: [["CZ（設定1）", "約1/156.6"], ["CZ（設定6）", "約1/141.1"], ["BONUS（設定1）", "約1/291.1"], ["BONUS（設定6）", "約1/256.5"], ["ベース", "約33G/50枚"], ["初当りBONUS", "20G・純増約9.1枚/G"], ["BIG：BONUS", "6：4"], ["BIGからSGB", "約40%"], ["究極魔戒RUSH", "継続約82.6%・平均約740枚"]],
    sim: { kind: "slot", rankingVersion: "v6", triggerLabel: "CZ（牙狼モード／魔界）", triggerRate: 156.6, triggerSuccess: 0.51, mainLabel: "SUPER GARO BONUS", mainRate: 291.1, base50: 33.0, coinUnit: 3.6, normalMin: 180, normalMax: 950, atPureIncrease: 9.1, specialLabel: "金色になれ！", specialChance: 0.50, specialMin: 0, specialMax: 0, specialDisplay: "bonus", entryBonusAwards: [[{ label: "BIG BONUS", games: 20, payout: 182, atChance: 0.40 }, 0.60], [{ label: "BONUS", games: 20, payout: 182, atChance: 0 }, 0.40]], entryBonusAwardsNote: "初当りBONUSは公式比率6:4、BIG BONUS時の約40%でSUPER GARO BONUSへ進む代表ルート", cycleFlow: { phase: "金色になれ！", label: "金色になれ！", statLabel: "ホラー撃破", maxRounds: 5, upperAfterRounds: 5, upperOnlyAfterRounds: true, upperAfterRoundsAutoSuccess: true, rounds: [{ title: "SUPER GARO BONUS", detail: "約1000枚を獲得し、3戦突破型CZ『金色になれ！』へ進みます", games: 110, continueChance: 1, rewards: [[{ kind: "coins", label: "SUPER GARO BONUS", payout: 1000 }, 1]] }, { title: "金色になれ！ 1戦目", detail: "PUSHでホラーとの1戦目を決着。勝利でエピソードへ", games: 5, continueChance: 0.50, awardOnContinueOnly: true, failureGames: 50, failureLabel: "50G引き戻しZONE", rewards: [[{ kind: "bonus", label: "1戦目勝利・エピソード", games: 10, payout: 91 }, 1]] }, { title: "金色になれ！ 2戦目", detail: "2体目のホラーを撃破すれば最終戦へ進みます", games: 5, continueChance: 0.50, awardOnContinueOnly: true, failureGames: 50, failureLabel: "50G引き戻しZONE", rewards: [[{ kind: "bonus", label: "2戦目勝利・エピソード", games: 10, payout: 91 }, 1]] }, { title: "金色になれ！ 3戦目", detail: "最終PUSH。3戦突破で究極魔戒RUSHが確定します", games: 5, continueChance: 0.50, awardOnContinueOnly: true, failureGames: 50, failureLabel: "50G引き戻しZONE", rewards: [[{ kind: "bonus", label: "3戦目勝利・エピソード", games: 10, payout: 91 }, 1]] }, { title: "三騎士共闘", detail: "3戦突破。究極魔戒RUSHへの扉が開きます", games: 1, continueChance: 1, rewards: [[{ kind: "coins", label: "究極魔戒RUSH確定", payout: 0 }, 1]] }], endLabel: "金色になれ！終了" }, upperChallenge: "金色になれ！3戦突破", upperChance: 0, upperSuccess: 1, upperLabel: "究極魔戒RUSH", upperContinue: 0.826, upperPayout: 740, upperPureIncrease: 9.1, upperReturnGames: 32, garoBattleFlow: true, upperAwards: [[{ label: "青パネル・陰我消滅ノ刻", games: 51, payout: 461 }, 0.40], [{ label: "緑パネル・陰我消滅ノ刻", games: 73, payout: 664 }, 0.23], [{ label: "緑パネル・陰我消滅ノ刻", games: 82, payout: 747 }, 0.16], [{ label: "赤パネル・陰我消滅ノ刻", games: 122, payout: 1114 }, 0.10], [{ label: "赤パネル・陰我消滅ノ刻", games: 135, payout: 1227 }, 0.07], [{ label: "プレミアムパネル・陰我消滅ノ刻", games: 225, payout: 2046 }, 0.03], [{ label: "プレミアムパネル・陰我消滅ノ刻", games: 226, payout: 2060 }, 0.005], [{ label: "ゴラドバトル勝利", games: 330, payout: 3000 }, 0.005]], settingRates: { 1: { trigger: 156.6, main: 291.1, payout: 0.975 }, 2: { trigger: 154.6, main: 283.7, payout: 0.988 }, 3: { trigger: 151.4, main: 276.1, payout: 1.012 }, 4: { trigger: 148.7, main: 265.8, payout: 1.046 }, 5: { trigger: 144.2, main: 259.4, payout: 1.105 }, 6: { trigger: 141.1, main: 256.5, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別CZ・BONUS確率を反映", paragraphs: ["CZは設定1約1/156.6から設定6約1/141.1、BONUSは設定1約1/291.1から設定6約1/256.5です。", "START時に設定1〜6を均等抽選し、選ばれた設定のCZ・BONUS確率・出玉率を使用します。結果と機種別ランキングにも設定を表示します。"] },
      { heading: "2種類のCZと20Gの初当りBONUS", paragraphs: ["CZは期待度約51%の牙狼モードと、期待度約82%の魔界の2種類です。設定1のCZ合算は約1/156.6です。", "初当りはBIG BONUSとBONUSを6:4で振り分け。どちらも20G・純増約9.1枚/Gで、BIG BONUSの約40%からSUPER GARO BONUSへ進む流れを専用抽選へ反映しました。"] },
      { heading: "SUPER GARO BONUSと金色になれ！", paragraphs: ["SUPER GARO BONUSは平均約1000枚を獲得。消化中は『金色になれ！』の勝利ストックを抽選し、最大3個まで保持します。", "金色になれ！は3戦突破型で、ストックやリトライ込みの勝利期待度は1戦あたり平均約50%。敗北後は50Gの引き戻し区間へ進み、同じ対戦相手から再開する実機の特徴があります。シミュレーターでは各戦の代表抽選と50G区間を表示します。"] },
      { heading: "究極魔戒RUSHのバトルと報酬", paragraphs: ["3戦突破後は純増約9.1枚/G、継続約82.6%、平均約740枚の究極魔戒RUSHへ。金色バトル勝利後に陰我消滅ノ刻のパネル報酬を決める流れをPUSH演出にしています。", "青・緑・赤・プレミアムの代表獲得枚数に加え、ゴラドバトル勝利時の約3000枚契機を反映。RUSH終了後は32Gの引き戻し区間まで表示します。細かな小役・ホラー別の勝率・ストック個数は完全再現ではありません。"] },
      { heading: "固定レートと収支の条件", bullets: ["約33G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均BONUS投資目安は約9,600円", "コイン単価は設定1の参考値約3.6円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["サンセイR&D 公式製品情報", "https://www.sansei-rd.com/products23/l_garo/index.html"], ["サンセイR&D 公式スペック資料", "https://www.sansei-rd.com/products23/l_garo/assets/pdf/l_garo.pdf"], ["一撃 機種解析", "https://1geki.jp/slot/l_garo/"]]
  },
  "ragnador-slot": {
    order: 0.14, type: "slot", theme: "violet", year: "2026年11月", maker: "ミズホ", updated: "2026-11-07",
    published: "2026-11-02",
    name: "スマスロ ラグナドール", shortName: "スマスロ ラグナドール",
    image: "assets/machines/ragnador-slot-key-visual.jpg",
    imageAlt: "スマスロ ラグナドールのキービジュアル",
    imageCredit: "パチマガスロマガFREE 機種情報",
    imageSource: "https://pachimaga.com/free/mach/maker-s/mizuho/l_ragnador.php",
    catchcopy: "爽怪Chainをつなぎ、真ラグナドールRUSHへ。",
    intro: "2026年11月2日導入のスマスロ。設定別CZ・AT確率を使い、敵HPを削るラグナドールバトル、幻妖石を集めるチェインアタック、ガチャ、2種類のボーナス、スペシャルジャッジ、真ラグナドールRUSHまでを専用演出で体験できます。",
    points: ["CZは約50%・敵ごとに10〜16G＋α", "通常ATは40G＋α・純増約2.5枚/G", "上位CZは16G・成功約70%、上位ATは純増約4.5枚/G"],
    specs: [["CZ（設定1）", "約1/172.8"], ["CZ（設定6）", "約1/142.4"], ["AT（設定1）", "約1/326.4"], ["AT（設定6）", "約1/258.3"], ["ラグナドールバトル", "勝利期待度約50%"], ["通常AT", "40G＋α・純増約2.5枚/G"], ["チェインアタック", "5G保証・継続80/90/95%"], ["スペシャルジャッジ", "16G・成功期待度約70%"], ["上位AT", "40G＋α・純増約4.5枚/G"]],
    sim: { kind: "slot", rankingVersion: "v6", triggerLabel: "ラグナドールバトル", triggerRate: 172.8, triggerSuccess: 0.50, mainLabel: "ラグナドールRUSH", mainRate: 326.4, base50: 31.0, coinUnit: 3.6, normalMin: 250, normalMax: 1050, atPureIncrease: 2.5, specialLabel: "チェインアタック／ガチャ", specialChance: 0.34, specialMin: 0, specialMax: 0, specialDisplay: "games", cycleFlow: { phase: "RAGNADOR RUSH", label: "ラグナドールRUSH", statLabel: "爽怪Chain", maxRounds: 5, continueChance: 0.72, upperAfterRounds: 99, upperOnlyAfterRounds: false, upperAfterRoundsAutoSuccess: false, markFinalRoundComplete: false, rounds: [{ title: "ラグナドールRUSH", detail: "40G＋α・純増約2.5枚/G。幻妖石300個とガチャ券を目指します", games: 40, continueChance: 0.82, rewards: [[{ kind: "coins", label: "初期40G消化", payout: 100 }, 1]] }, { title: "幻妖ミッション", detail: "リプレイ連から3Gまたは10Gのミッションへ。成功でチェインかガチャを獲得", games: [[3, 0.50], [10, 0.50]], continueChance: 0.76, rewards: [[{ kind: "coins", label: "チェインアタック獲得", payout: 10 }, 0.55], [{ kind: "games", label: "ガチャチャレンジ獲得", games: 10 }, 0.30], [{ kind: "games", label: "10連ガチャ獲得", games: 30 }, 0.15]] }, { title: "チェインアタック", detail: "5G保証。80%・90%・95%のいずれかで幻妖石を連続獲得します", games: [[5, 0.55], [8, 0.30], [12, 0.15]], continueChance: 0.80, rewards: [[{ kind: "games", label: "幻妖石300個・ガチャ到達", games: 10 }, 0.55], [{ kind: "games", label: "Wチェイン・10連ガチャ", games: 30 }, 0.30], [{ kind: "games", label: "極ラグナ目・10連ガチャ券", games: 50 }, 0.15]] }, { title: "ガチャチャレンジ", detail: "1G完結。ゲーム数上乗せ、お祈りガチャ、10連ガチャの報酬を開きます", games: 1, continueChance: 0.72, rewards: [[{ kind: "games", label: "ゲーム数上乗せ", games: [[10, 0.45], [20, 0.27], [30, 0.16], [50, 0.09], [100, 0.03]] }, 0.62], [{ kind: "bonus", label: "ストーリーボーナス", games: 20, payout: 90 }, 0.28], [{ kind: "bonus", label: "クライマックスボーナス", games: 30, payout: 135 }, 0.10]] }, { title: "ボーナス高確／ラストミッション", detail: "8Gのボーナス高確とAT終了時のラストミッションをPUSHで決着します", games: 8, continueChance: 0.58, rewards: [[{ kind: "bonus", label: "ストーリーボーナス＋10G", games: 20, payout: 90 }, 0.58], [{ kind: "bonus", label: "クライマックスボーナス", games: 30, payout: 135 }, 0.22], [{ kind: "games", label: "ラストミッション成功・ガチャ復帰", games: [[10, 0.70], [30, 0.25], [100, 0.05]] }, 0.20]] }], endLabel: "ラグナドールRUSH終了" }, upperChallenge: "スペシャルジャッジ", upperChance: 0.20, upperSuccess: 0.70, upperLabel: "真ラグナドールRUSH", upperContinue: 0, upperPayout: 2100, upperPureIncrease: 4.5, upperGameManaged: true, upperGameRange: "期待約1500枚／2700枚", ragnadorUpperFlow: true, upperAwards: [[{ label: "黒BAR・スペシャルEP 冥界", games: 333, payout: 1500 }, 0.50], [{ label: "白7・スペシャルEP 天界", games: 600, payout: 2700 }, 0.50]], upperFailureLabel: "スペシャルエピソード 現世", upperFailurePhase: "SPECIAL EPISODE", upperFailureGames: 20, upperFailurePureIncrease: 4.5, upperFailureRewardLabel: "現世20G→通常AT", upperFailureMessage: "失敗時も現世エピソード20G後に通常ATへ戻ります", settingRates: { 1: { trigger: 172.8, main: 326.4, payout: 0.976 }, 2: { trigger: 167.2, main: 317.2, payout: 0.988 }, 3: { trigger: 161.8, main: 307.7, payout: 1.003 }, 4: { trigger: 145.0, main: 271.2, payout: 1.057 }, 5: { trigger: 143.0, main: 260.8, payout: 1.105 }, 6: { trigger: 142.4, main: 258.3, payout: 1.145 } } },
    readerGuide: { verdict: "40Gの通常ATでチェインとガチャを重ね、スペシャルジャッジから上位ATを狙う流れを段階的に楽しみたい人向けです。", bestFor: ["ガチャ型の報酬抽選が好き", "CZ・通常AT・上位CZを順番に体験したい"], check: ["通常ATは純増約2.5枚/G", "上位の1500枚・2700枚は継続率ではなく期待枚数"], compare: [["seiya-ougon-slot", "L聖闘士星矢 黄金十二宮", "継続バトル型と比較"], ["ggo-slot", "スマスロ GGO", "BONUS・ST型と比較"]] },
    articleSections: [
      { heading: "設定別CZ・AT初当りを反映", paragraphs: ["CZは設定1約1/172.8から設定6約1/142.4、AT初当りは設定1約1/326.4から設定6約1/258.3です。", "START時に設定1〜6を均等抽選し、選ばれた設定のCZ・AT初当り・出玉率を使用します。結果とランキングにも設定を表示します。"] },
      { heading: "ラグナドールバトルはHPを削るCZ", paragraphs: ["CZはバトルパートとチェインパートの2部構成。敵は青龍・白虎・玄武・朱雀で、規定ゲーム数は10G＋αから16G＋α、トータル勝利期待度は約50%です。", "小役でダメージとチェイン移行を抽選し、ラグナ目では0G連が発生。オトモ参戦時は固有の恩恵が付き、妖主参戦時は勝利期待度約90%です。シミュレーターは敵HP・小役別ダメージを約50%の代表PUSHへまとめます。"] },
      { heading: "40GのATで幻妖石とガチャを集める", paragraphs: ["ラグナドールRUSHは初期40G＋α、純増約2.5枚/G。幻妖石を300個集めるかガチャ券を獲得すると、1G完結のガチャチャレンジへ進みます。", "チェインアタックは5G保証で継続率80%・90%・95%。Wチェインは毎ゲーム2回報酬を獲得し、10チェインごとにチェインボーナスが発生します。サイトでは幻妖ミッション→チェイン→ガチャを別PUSHで表示します。"] },
      { heading: "ガチャ・2種類のボーナス・上乗せ", paragraphs: ["ガチャチャレンジはゲーム数上乗せ、お祈りガチャ、10連ガチャを決める1Gゾーンで、ゲーム数上乗せは最大100Gです。", "ストーリーボーナスは20G・純増約4.5枚/Gで終了時に10G上乗せ。クライマックスボーナスは30Gで、勝利時はエンディングストックと100G・300G・500Gのいずれかを獲得します。ボーナス回数に応じたクライマックス比率は調査中のため、サイトでは代表振り分けです。"] },
      { heading: "スペシャルジャッジと3つのエピソード", paragraphs: ["規定枚数到達やエンディングストック発動後は16Gのスペシャルジャッジへ。成功期待度は約70%で、白7と黒BARは1:1です。", "白7は天界＋10連ガチャ券で期待約2700枚、黒BARは冥界＋ガチャ券で期待約1500枚。失敗しても現世エピソード20G後に通常ATへ戻ります。上位は初期40G＋α・純増約4.5枚/Gで通常ATと同じガチャ型ゲーム性です。期待枚数は継続率ではなく、各エピソード突入後の平均値として1回の代表結果へ反映します。"] },
      { heading: "導入後に確認できる天井", paragraphs: ["CZ間は500G＋αでCZ、AT間は999G＋αでATへ進みます。設定変更後はAT間天井が500G＋αへ短縮されます。", "シミュレーターは平均的な初当りの幅を体験する用途のため、天井到達時の専用恩恵やCZ回数別の優遇は個別再現しません。"] },
      { heading: "固定レートと収支の条件", bullets: ["約31.0G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均AT投資目安は約11,400円", "コイン単価は設定1の参考値約3.6円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ユニバーサル 公式デジタルガイド", "https://www.universal-777.com/product/digitalguide/ps/ragnador/"], ["一撃 機種解析", "https://1geki.jp/slot/l_ragnador/"], ["なな徹 AT・ボーナス解析", "https://nana-press.com/kaiseki/machine/1250/39828/"]]
  },
  "seiya-ougon-slot": {
    order: 0.15, type: "slot", theme: "gold", year: "2026年11月", maker: "サンスリー", updated: "2026-11-07",
    published: "2026-11-02",
    name: "L聖闘士星矢 黄金十二宮", shortName: "スマスロ 聖闘士星矢",
    image: "assets/machines/seiya-ougon-slot-key-visual.jpg",
    imageAlt: "L聖闘士星矢 黄金十二宮のキービジュアル",
    imageCredit: "パチマガスロマガ 機種概要",
    imageSource: "https://psmaga.com/e/pachi/pla/s_conq/santhree_slot/09/kh01.php",
    catchcopy: "十二宮を突破し、SAGA BATTLEと千日戦争へ。",
    intro: "2026年11月2日導入のスマスロ。10Gの白羊宮から9人の黄金聖闘士へ挑み、エクストララウンド、SAGA BATTLE、上位AT『千日戦争』へ進む実機の順番を専用演出で体験できます。",
    points: ["CZは設定1約1/214.4〜設定6約1/200.3", "黄金聖闘士バトルはVストック込みで勝利期待度約76%", "SAGA BATTLE成功期待度約59%・千日戦争継続期待度約88%"],
    specs: [["CZ（設定1）", "約1/214.4"], ["CZ（設定6）", "約1/200.3"], ["AT（設定1）", "約1/364.2"], ["AT（設定6）", "約1/310.5"], ["ベース", "約31.3G/50枚"], ["通常AT", "30G＋バトル4/5G"], ["通常AT純増", "約4.0枚/G"], ["SAGA BATTLE", "成功期待度約59%"], ["千日戦争", "30G＋α・継続期待度約88%"], ["千日戦争純増", "約6.6枚/G"]],
    rankingVersion: "v5",
    sim: { kind: "slot", triggerLabel: "WHO ARE YOU？／影ノ襲来", triggerRate: 214.4, triggerSuccess: 0.50, mainLabel: "Battle of ZODIAC", mainRate: 364.2, base50: 31.3, coinUnit: 3.8, normalMin: 250, normalMax: 1200, atPureIncrease: 4.0, atPayoutVariance: 0.03, specialLabel: "星輝の加護", specialChance: 0.34, specialMin: 120, specialMax: 600, specialDisplay: "coins", seiyaTempleFlow: true, cycleFlow: { phase: "BATTLE OF ZODIAC", label: "黄金十二宮", statLabel: "黄金聖闘士撃破", continueChance: 0.76, maxRounds: 11, upperAfterRounds: 11, upperOnlyAfterRounds: true, upperAfterRoundsAutoSuccess: false, markFinalRoundComplete: true, endLabel: "Battle of ZODIAC終了" }, upperChallenge: "最終決戦 SAGA BATTLE", upperChallengeGames: 4, upperChance: 0, upperSuccess: 0.59, upperLabel: "千日戦争", upperContinue: 0.88, upperSetGames: [[30, 1]], upperPayout: 198, upperPureIncrease: 6.6, upperMaxLoops: 30, upperReturnGames: 100, upperLossEpisodeGames: 20, upperAwards: [[{ label: "千日戦争 30G", games: 30, payout: 198 }, 0.66], [{ label: "星輝の加護 +30G", games: 60, payout: 396 }, 0.19], [{ label: "聖闘士星矢BONUS 300枚", games: 45, payout: 300 }, 0.10], [{ label: "1000BONUS", games: 152, payout: 1000 }, 0.04], [{ label: "1000BONUS＋金牛激震", games: 228, payout: 1500 }, 0.01]], settingRates: { 1: { trigger: 214.4, main: 364.2, payout: 0.975 }, 2: { trigger: 214.1, main: 356.1, payout: 0.985 }, 3: { trigger: 211.7, main: 345.6, payout: 1.005 }, 4: { trigger: 202.5, main: 322.3, payout: 1.052 }, 5: { trigger: 197.2, main: 313.7, payout: 1.100 }, 6: { trigger: 200.3, main: 310.5, payout: 1.149 } } },
    articleSections: [
      { heading: "CZ・AT初当りを設定別に反映", paragraphs: ["CZ合算は設定1約1/214.4から設定6約1/200.3、AT初当りは設定1約1/364.2から設定6約1/310.5です。設定6のCZが設定5よりわずかに重い点も公開値どおり反映します。", "START時に設定1〜6を均等抽選し、結果とランキングに今回の設定を表示します。"] },
      { heading: "2種類のCZと10GのWHO ARE YOU？", paragraphs: ["実機のCZは『WHO ARE YOU？』と『影ノ襲来』。WHO ARE YOU？は10Gで、小役2連続や強い小宇宙パターンが突破契機です。小宇宙ポイントや最大6周期の周期抽選からATを目指します。", "サイトではCZ合算確率と代表成功率50%で1回のPUSHへまとめます。CZごとの内部状態、小役別の細かな書き換え率は公開情報が揃うまで固定推測を加えません。"] },
      { heading: "白羊宮から9人の黄金聖闘士へ", paragraphs: ["AT開始時は白羊宮の導入ムービー10G。続いて金牛宮アルデバラン、双児宮、巨蟹宮デスマスク、獅子宮アイオリア、処女宮シャカ、天蠍宮ミロ、磨羯宮シュラ、宝瓶宮カミュ、双魚宮アフロディーテの順で挑みます。天秤宮と人馬宮は黄金聖闘士との通常対戦ではなく特殊な宮として扱われます。", "各セットはAT30G＋黄金聖闘士バトル4Gまたは5G。バトル勝利期待度はVストック込み約76%で、小役成立なら勝利です。サイトでは各宮を30G消化後のPUSHで判定します。"] },
      { heading: "星輝の加護・Vストック報酬", paragraphs: ["勝利後の4G突破エピソードから1Gの『星輝の加護』へ進むことがあり、Burning、COSMO BOOST、V GET CHALLENGE、Phoenix V GET CHALLENGEなどでVストックを狙います。", "シミュレーターでは通常撃破、Vストック、星輝の加護を代表報酬として表示します。小役の停止形やアイコン昇格、Vストック消費順までは個別再現していません。"] },
      { heading: "エクストララウンドとSAGA BATTLE", paragraphs: ["9人撃破後はエクストララウンドへ進み、終了後のエピソードを経て4Gの最終決戦SAGA BATTLEへ。小役成立で勝利、成功期待度は約59%です。", "以前の自動成功モデルを廃止し、4Gカウント後のPUSHで約59%を判定します。失敗時は通常AT終了、成功時だけ千日戦争へ進みます。"] },
      { heading: "千日戦争と上位BONUS", paragraphs: ["上位AT『千日戦争』は純増約6.6枚/G、1セット30G＋α、Vストック込みの継続期待度約88%。継続バトルは4Gまたは5Gです。", "星輝の加護によるゲーム数上乗せ、約300枚の聖闘士星矢BONUS、初期1000枚の1000BONUS、BONUS中の金牛激震を代表報酬へ反映します。敗北時は20Gのエンディングと通常100G＋αの引き戻し区間を簡易表示します。"] },
      { heading: "固定レートと収支の条件", bullets: ["約31.3G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均AT投資目安は約12,600円", "コイン単価は設定1の参考値約3.8円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANYO 公式パチスロ製品一覧", "https://www.sanyobussan.co.jp/products/slot.html"], ["一撃 L聖闘士星矢 黄金十二宮 解析", "https://1geki.jp/slot/l_seiya_ougon/"], ["なな徹 Battle of ZODIAC・千日戦争解析", "https://nana-press.com/kaiseki/machine/1193/39943/"], ["なな徹 黄金聖闘士バトル・報酬解析", "https://nana-press.com/kaiseki/machine/1193/40126/"], ["なな徹 SAGA BATTLE解析", "https://nana-press.com/kaiseki/machine/1193/40128/"], ["なな徹 天井・周期解析", "https://nana-press.com/kaiseki/machine/1193/39926/"]]
  },
  "ggo-slot": {
    order: 0.2, type: "slot", theme: "magenta", year: "2026年11月", maker: "京楽／オッケー.", updated: "2026-11-07",
    published: "2026-11-02",
    name: "Lソードアート・オンライン オルタナティブ ガンゲイル・オンライン", shortName: "スマスロ GGO",
    image: "assets/machines/ggo-slot-key-visual.jpg",
    imageAlt: "Lソードアート・オンライン オルタナティブ ガンゲイル・オンラインのキービジュアル",
    imageCredit: "P-WORLD 発表記事",
    imageSource: "https://news.p-world.co.jp/articles/34077/amusement",
    catchcopy: "BONUSを重ね、SQUAD JAMと上位STへ。",
    intro: "2026年11月2日導入のスマスロ。BIG／REGからSJ1、5Gバトル、ガンゲイルストーム、SJ2、上位ST『イカれたレン』へ進む実機の段階を専用演出で体験できます。",
    points: ["BIGは40G・約130枚、REGは20G・約70枚", "SJ1は25G・約70%、SJ2は30G・約77%", "イカれたレンは8G・約85%継続・期待約3600枚"],
    specs: [["初当り（設定1）", "約1/192.0"], ["初当り（設定6）", "約1/153.9"], ["SJ（設定1）", "約1/521.7"], ["SJ（設定6）", "約1/392.6"], ["ベース", "約31G/50枚"], ["BIG", "40G・約130枚"], ["REG", "20G・約70枚"], ["SJ1", "25G・継続率約70%"], ["SJ2", "30G・継続率約77%"], ["イカれたレン", "8G・継続率約85%"], ["通常BONUS純増", "約3.4枚/G"], ["ガンゲイルBONUS純増", "約7.1枚/G"]],
    rankingVersion: "v5",
    sim: { kind: "slot", triggerLabel: "初当りBONUS", triggerRate: 192.0, triggerSuccess: 1, mainLabel: "SQUAD JAM 1", mainRate: 521.7, base50: 31.0, coinUnit: 3.5, normalMin: 70, normalMax: 130, atPureIncrease: 7.1, atPayoutVariance: 0.02, entryBonusAwards: [[{ label: "BIG BONUS", games: 40, payout: 130, atChance: 0.368 }, 0.50], [{ label: "REG BONUS", games: 20, payout: 70, atChance: 0.368 }, 0.50]], specialLabel: "ガンゲイルストーム", specialChance: 0.70, specialMin: 100, specialMax: 1000, specialDisplay: "bonus", ggoStFlow: true, cycleFlow: { phase: "SQUAD JAM", label: "SQUAD JAM", statLabel: "BONUS当選", continueChance: 0.70, maxRounds: 5, upperAfterRounds: 5, upperOnlyAfterRounds: true, upperAfterRoundsAutoSuccess: false, markFinalRoundComplete: true, endLabel: "SQUAD JAM終了" }, upperChallenge: "SJ2 ボスバトル vs KKHC", upperChallengeGames: 5, upperChance: 0, upperSuccess: 0.50, upperLabel: "イカれたレン", upperContinue: 0.85, upperPayout: 500, upperPureIncrease: 7.1, upperMaxLoops: 40, upperAwards: [[{ label: "ガンゲイルストーム 100枚", games: 8, bonusGames: 14, payout: 100 }, 0.18], [{ label: "ガンゲイルストーム 150枚", games: 8, bonusGames: 21, payout: 150 }, 0.15], [{ label: "ガンゲイルストーム 200枚", games: 8, bonusGames: 28, payout: 200 }, 0.15], [{ label: "ガンゲイルストーム 250枚", games: 8, bonusGames: 35, payout: 250 }, 0.10], [{ label: "ガンゲイルストーム 300枚", games: 8, bonusGames: 42, payout: 300 }, 0.10], [{ label: "ガンゲイルストーム 500枚", games: 8, bonusGames: 70, payout: 500 }, 0.12], [{ label: "ガンゲイルストーム 1000枚", games: 8, bonusGames: 141, payout: 1000 }, 0.10], [{ label: "ガンゲイルストーム 1500枚", games: 8, bonusGames: 211, payout: 1500 }, 0.05], [{ label: "ガンゲイルストーム 2000枚", games: 8, bonusGames: 282, payout: 2000 }, 0.03], [{ label: "ガンゲイルストーム 3000枚OVER", games: 8, bonusGames: 423, payout: 3000 }, 0.02]], settingRates: { 1: { trigger: 192.0, main: 521.7, payout: 0.979 }, 2: { trigger: 189.2, main: 510.4, payout: 0.988 }, 3: { trigger: 180.9, main: 486.6, payout: 1.009 }, 4: { trigger: 168.6, main: 445.3, payout: 1.042 }, 5: { trigger: 155.4, main: 405.0, payout: 1.097 }, 6: { trigger: 153.9, main: 392.6, payout: 1.145 } } },
    articleSections: [
      { heading: "初当りとSQUAD JAMの設定差", paragraphs: ["初当り合算は設定1約1/192.0から設定6約1/153.9、ST『SQUAD JAM』は設定1約1/521.7から設定6約1/392.6です。", "START時に設定1〜6を均等抽選し、選ばれた設定の初当り・SQUAD JAM・出玉率を使用します。結果と機種別ランキングにも設定を表示します。"] },
      { heading: "BIG・REGとYes Ma’am", paragraphs: ["通常時のBIGは40G・約130枚、REGは20G・約70枚で、純増は約3.4枚/G。消化中に報酬を獲得するたび、Yes Ma’am、SJ1、SAO失敗者、イカれたレンの順で格上げされます。", "Yes Ma’amは10G＋α、成功期待度約50%。サイトでは設定別の初当りとSJ確率を合わせ、初当りBONUS後の代表SJ突入率約36.8%で判定します。BIG・REG別の突入率は未公表のため同率です。"] },
      { heading: "SJ1・5Gバトル・ガンゲイルストーム", paragraphs: ["SJ1は25G・継続率約70%。初回はバレットライン2本から始まり、小Vベルやライン上の小役で5Gのバトルへ発展します。バトル勝利後はガンゲイルストームでBONUS枚数を決定します。", "ガンゲイルストームは赤7揃い約1/8.0。100枚から3000枚OVERまで13段階のマスがあり、小役で昇格を抽選します。サイトではPUSHで代表枚数を開き、純増約7.1枚/GのガンゲイルBONUSを残りゲーム表示で消化します。"] },
      { heading: "SAO失敗者からSJ2へ", paragraphs: ["SJ1のボスチームSHINC撃破などで50GのエピソードAT『SAO失敗者』へ進み、消化後はSJ2へ。SJ2は30G・継続率約77%です。", "SAO失敗者中にエピソードブレイクを獲得した場合も上位STへ進みます。サイトではSJ1ボス、50Gエピソード、SJ2を順番に表示し、公開されていないボス出現・勝利割合は代表値で簡略化します。"] },
      { heading: "イカれたレンと引き戻し", paragraphs: ["SJ2のボスチームKKHC撃破などで上位ST『イカれたレン』へ。8Gのボーナス超高確率STで継続率約85%、純増約7.1枚/G、初回STからの獲得期待枚数は約3600枚です。", "各8G後にPUSHし、ガンゲイルストームの枚数とBONUSを表示します。終了後は引き戻し状態へ移行してYes Ma’amを抽選しますが、滞在ゲーム数は調査中のため固定ゲーム数は表示しません。"] },
      { heading: "固定レートと収支の条件", bullets: ["約31G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均SQUAD JAM投資目安は約18,300円", "コイン単価は設定1の参考値約3.5円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["KYORAKU 公式機種サイト", "https://www.kyoraku.co.jp/product_site/2026/ggo_s/"], ["一撃 GGO 機種概要・スペック", "https://1geki.jp/slot/l_sao_ggo/"], ["一撃 BIG・REG解析", "https://1geki.jp/slot/l_sao_ggo/61/"], ["一撃 SQUAD JAM解析", "https://1geki.jp/slot/l_sao_ggo/81/"], ["一撃 ガンゲイルストーム解析", "https://1geki.jp/slot/l_sao_ggo/83/"], ["一撃 イカれたレン解析", "https://1geki.jp/slot/l_sao_ggo/91/"]]
  },
  "godzilla-eva2-slot": {
    order: 0.25, type: "slot", theme: "ember", year: "2026年11月", maker: "ビスティ", updated: "2026-11-07",
    published: "2026-11-02",
    name: "Lパチスロ ゴジラ対エヴァンゲリオン 2", shortName: "スマスロ ゴジエヴァ2",
    image: "assets/machines/godzilla-eva2-slot-key-visual.jpg",
    imageAlt: "Lパチスロ ゴジラ対エヴァンゲリオン 2のキービジュアル",
    imageCredit: "遊技日本 新台記事",
    imageSource: "https://yugi-nippon.com/pachinko-new-machine/post-80463/",
    catchcopy: "2種類のBONUSを越え、G覚醒RUSHへ。",
    intro: "2026年11月2日導入のゲーム数管理型スマスロ。2種類の約73枚BONUS、専用ATジャッジ、ゴジエヴァアタック、10倍上乗せ、決戦カイザーギドラ、G覚醒RUSHを一連の専用演出で体験できます。",
    points: ["エヴァBONUS後は3G＋α・AT期待度約41%", "ゴジラBONUS後は5G＋α・AT期待度約64%", "決戦カイザーギドラは4G・突破期待度約66%"],
    specs: [["BONUS（設定1）", "約1/234.2"], ["BONUS（設定6）", "約1/195.0"], ["AT（設定1）", "約1/460.5"], ["AT（設定6）", "約1/355.5"], ["ベース", "約30G/50枚"], ["BONUS", "平均約73枚"], ["ゴジエヴァアタック", "2G・初期50〜600G"], ["通常AT純増", "約5.2枚/G"], ["震撃チャンス", "4G＋α・10倍期待度約43%"], ["決戦カイザーギドラ", "4G・突破期待度約66%"], ["G覚醒RUSH", "100G以上・純増約5.2枚/G"], ["AT後引き戻し", "50G・設定1約17.6%"]],
    rankingVersion: "v5",
    sim: { kind: "slot", triggerLabel: "BONUS初当り", triggerRate: 234.2, triggerSuccess: 1, mainLabel: "ゴジエヴァRUSH", mainRate: 460.5, base50: 30.0, coinUnit: 3.7, normalMin: 260, normalMax: 1560, atPureIncrease: 5.2, atPayoutVariance: 0.04, entryBonusAwards: [[{ label: "エヴァンゲリオンBONUS", games: 14, payout: 73, atChance: 0.41, judgeLabel: "初号機VS魏怒羅零号機", judgeGames: 3 }, 0.57], [{ label: "ゴジラBONUS", games: 14, payout: 73, atChance: 0.64, judgeLabel: "ゴジラチャレンジ", judgeGames: 5 }, 0.43]], godzillaEva2Flow: true, godzillaInitialGames: [[50, 0.48], [70, 0.20], [100, 0.18], [150, 0.08], [200, 0.04], [300, 0.015], [600, 0.005]], specialLabel: "震撃チャンス", specialChance: 0.43, specialMin: 52, specialMax: 2600, upperChallenge: "決戦カイザーギドラ", upperChallengeGames: 4, upperChance: 0.20, upperSuccess: 0.66, upperLabel: "G覚醒RUSH", upperContinue: 0.66, upperPayout: 780, upperPureIncrease: 5.2, upperGameManaged: true, upperGameRange: "100〜300G", upperSetGames: [[100, 0.58], [150, 0.24], [200, 0.13], [300, 0.05]], upperMaxLoops: 12, upperReturnGames: 50, upperReturnChance: 0.176, settingRates: { 1: { trigger: 234.2, main: 460.5, payout: 0.977 }, 2: { trigger: 229.0, main: 446.5, payout: 0.989 }, 3: { trigger: 221.8, main: 425.5, payout: 1.012 }, 4: { trigger: 207.0, main: 390.4, payout: 1.058 }, 5: { trigger: 201.5, main: 374.2, payout: 1.106 }, 6: { trigger: 195.0, main: 355.5, payout: 1.149 } } },
    articleSections: [
      { heading: "BONUSとAT初当りの設定差", paragraphs: ["疑似BONUSは設定1約1/234.2から設定6約1/195.0、AT『ゴジエヴァRUSH』は設定1約1/460.5から設定6約1/355.5です。", "START時に設定1〜6を均等抽選し、選ばれた設定のBONUS・AT初当り・出玉率を使用します。設定は最終結果と機種別ランキングに表示します。"] },
      { heading: "集結バトルと2種類のBONUS", paragraphs: ["集結バトルは9G＋α・成功期待度約50%のBONUS当選CZです。通常時はレア役、G侵食役後の変異、100G・250G・400G以降150Gごとの規定ゲーム数からBONUSを目指します。", "エヴァンゲリオンBONUSとゴジラBONUSはいずれも平均約73枚。前者は3G＋αの『初号機VS魏怒羅零号機』でAT期待度約41%、後者は5G＋αの『ゴジラチャレンジ』で約64%です。サイトでは公開BONUS確率とAT確率に近づくよう、BONUS比率を体験用の代表値57%対43%で抽選します。"] },
      { heading: "ゴジエヴァアタックとゲーム数管理AT", paragraphs: ["AT突入時は2Gのゴジエヴァアタックで初期50〜600Gを決定します。1G目の成立役でエヴァンゲリオン・モスラ・ゴジラを決め、2G目で初期ゲーム数を開きます。", "ゴジエヴァRUSHは純増約5.2枚/G。レア役や変異でゲーム数を上乗せし、上乗せ後のブレイク演出から怪獣索敵ZONE、IMPACT BATTLE、震撃CHANCEなどへ分岐します。"] },
      { heading: "怪獣索敵・IMPACT BATTLE・10倍上乗せ", paragraphs: ["怪獣索敵ZONEは10G＋αでIMPACT BATTLE移行率約52%。IMPACT BATTLEは4G・勝利期待度約44%、勝利すると震撃CHANCEへ進みます。", "震撃CHANCEは4G＋α・10倍上乗せ期待度約43%。成功時の一部は4G＋αの震撃連鎖へ入り、震撃ジャッジ成功のたびに10倍上乗せと4G再セットを繰り返します。サイトではPUSHでルート、成功、最終上乗せゲーム数を順番に表示します。"] },
      { heading: "決戦カイザーギドラからG覚醒RUSHへ", paragraphs: ["決戦カイザーギドラは4G・突破期待度約66%。AT最終ゲーム、1000枚以降500枚ごとの抽選、エンディング後、上位AT終了後などから突入し、勝利でG覚醒RUSHへ進みます。", "G覚醒RUSHは純増約5.2枚/G・100G以上。初回は2GのG覚醒アタックで初期ゲーム数を決め、勝利時の一部では30G＋αのG覚醒バーストへ。サイトでは上位終了ごとに4G決戦をPUSHで判定し、敗北後は50Gの引き戻し区間を表示します。"] },
      { heading: "固定レートと収支の条件", bullets: ["約30G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均AT投資目安は約16,700円", "コイン単価は設定1の参考値約3.7円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ゴジラ対エヴァンゲリオン2 公式サイト", "https://www.eva-project.jp/l_godzilla_vs_eva2/"], ["一撃 ゴジエヴァ2 機種概要・スペック", "https://1geki.jp/slot/l_goji_eva2/"], ["一撃 ゴジエヴァアタック解析", "https://1geki.jp/slot/l_goji_eva2/81/"], ["一撃 ゴジエヴァRUSH解析", "https://1geki.jp/slot/l_goji_eva2/83/"], ["一撃 震撃チャンス・震撃連鎖解析", "https://1geki.jp/slot/l_goji_eva2/87/"], ["一撃 決戦カイザーギドラ解析", "https://1geki.jp/slot/l_goji_eva2/89/"]]
  },
  "mahoako-slot": {
    order: 0.75, type: "slot", theme: "magenta", year: "2026年10月", maker: "ニューギン", updated: "2026-11-07",
    name: "L魔法少女にあこがれて", shortName: "スマスロ まほあこ",
    image: "assets/machines/mahoako-slot-key-visual.jpg",
    imageAlt: "L魔法少女にあこがれてのキービジュアル",
    imageCredit: "ニューギン",
    imageSource: "https://www.newgin.co.jp/products/lmahoako/",
    catchcopy: "3種類のCZを突破し、超あこがれver.へ。",
    intro: "2026年10月19日導入の疑似A＋AT機。3種類CZ、4種類BONUS、3GのあこがれATTACK、3種類の上乗せ特化ゾーン、無限AT、VSロードエノルメ、上位AT後の2段階引き戻しを専用演出で体験できます。",
    points: ["CZは約42%・約60%・AT濃厚の3種類", "BONUSは全設定共通約1/249.6・4種類", "上位AT終了後は2段階で引き戻し60%超"],
    specs: [["CZ（設定1）", "約1/357.0"], ["CZ（設定6）", "約1/235.4"], ["BONUS", "約1/249.6（全設定共通）"], ["AT（設定1）", "約1/436.3"], ["AT（設定6）", "約1/305.7"], ["ベース", "約31.4G/50枚"], ["あこがれATTACK", "3G・初期G／特化獲得"], ["通常AT純増", "約2.5枚/G"], ["特化ゾーン平均", "約70G・100G・200G"], ["上位AT純増", "約5.0枚/G"], ["上位AT期待獲得", "約2000枚"], ["上位引き戻し", "VS＋あの星で60%超"]],
    rankingVersion: "v6",
    sim: { kind: "slot", triggerLabel: "CZ／BONUS初当り契機", triggerRate: 147.1, triggerSuccess: 1, mainLabel: "まほあこラッシュ", mainRate: 436.3, base50: 31.4, coinUnit: 3.2, normalMin: 125, normalMax: 900, atPureIncrease: 2.5, atPayoutVariance: 0.05, entryBonusAwards: [[{ label: "トランスマジア", games: 12, payout: 0, atChance: 0.42, judgeLabel: "BAR揃いチャレンジ", judgeGames: 12, routeType: "cz" }, 0.309], [{ label: "パネルアタック", games: 7, payout: 0, atChance: 0.60, judgeLabel: "3枚パネル獲得チャレンジ", judgeGames: 7, routeType: "cz" }, 0.082], [{ label: "ヴェナリータチャレンジ", games: 7, payout: 0, atChance: 1, judgeLabel: "上位ルートチャレンジ", judgeGames: 7, routeType: "upper-cz", upperEntryChance: 0.42 }, 0.021], [{ label: "レギュラーボーナス", games: 14, payout: 70, atChance: 0.10, judgeLabel: "AT抽選", judgeGames: 7, routeType: "bonus" }, 0.234], [{ label: "まほあこボーナス", games: 26, payout: 130, atChance: 0.25, judgeLabel: "ピンク7揃いチャレンジ", judgeGames: 13, routeType: "bonus" }, 0.292], [{ label: "まほあこボーナス あこがれVer.", games: 14, payout: 70, atChance: 0.50, judgeLabel: "ピンク7揃いチャレンジ", judgeGames: 7, routeType: "bonus" }, 0.049], [{ label: "スペシャルムービーボーナス", games: 14, payout: 70, atChance: 1, judgeLabel: "AT＋あこがれATTACK", judgeGames: 7, routeType: "bonus" }, 0.013]], entryBonusAwardsNote: "CZとBONUSを並行抽選する体験用代表比率。BONUS4種類の割合は公開値、CZ内訳とREGのAT当選率は全体AT初当りへ近づける代表値", mahoakoFlow: true, mahoakoInitialGames: [[30, 0.24], [50, 0.42], [70, 0.20], [100, 0.10], [150, 0.03], [200, 0.01]], mahoakoSpecialAwards: [[{ label: "サディスティックタイム", games: 70, zoneGames: 10 }, 0.55], [{ label: "ぶるぶるマッサージタイム", games: 100, zoneGames: 10 }, 0.30], [{ label: "マジアベーゼ無双", games: 200, zoneGames: 10 }, 0.15]], specialLabel: "あこがれATTACK", specialChance: 0.34, specialMin: 25, specialMax: 500, upperChallenge: "VSロードエノルメ", upperChallengeGames: 5, upperChance: 0.18, upperSuccess: 0.50, upperLabel: "まほあこラッシュ 超あこがれver.", upperContinue: 0.60, upperPayout: 650, upperPureIncrease: 5.0, upperGameManaged: true, upperSetGames: [[100, 0.55], [150, 0.25], [200, 0.15], [300, 0.05]], upperMaxLoops: 8, upperReturnGames: 10, upperReturnChance: 0.60, settingRates: { 1: { trigger: 147.1, main: 436.3, payout: 0.976 }, 2: { trigger: 142.9, main: 422.7, payout: 0.988 }, 3: { trigger: 138.3, main: 401.4, payout: 1.005 }, 4: { trigger: 130.3, main: 352.4, payout: 1.050 }, 5: { trigger: 123.1, main: 316.1, payout: 1.102 }, 6: { trigger: 121.0, main: 305.7, payout: 1.120 } } },
    articleSections: [
      { heading: "BONUSと設定差の見方", paragraphs: ["BONUS確率は全設定共通で約1/249.6です。一方、CZとAT初当りには設定差があり、設定1のAT約1/436.3から設定6の約1/305.7まで段階的に軽くなります。", "シミュレーターはSTART時に設定1〜6を均等抽選し、選ばれた設定のCZ・AT初当り・出玉率を使用します。結果と機種別ランキングにも今回の設定を表示します。"] },
      { heading: "3種類CZと4種類BONUS", paragraphs: ["CZは12G＋α・期待度約42%のトランスマジア、7G＋α・約60%のパネルアタック、成功でAT濃厚かつ約42%が上位ATとなるヴェナリータチャレンジの3種類です。", "BONUSは全設定共通約1/249.6。公開比率はREG39.8%、まほあこBONUS49.7%、あこがれVer.8.3%、スペシャルムービー2.3%です。サイトではCZとBONUSを並行する初当りルートとしてPUSHで表示します。"] },
      { heading: "あこがれATTACKと3種類の特化ゾーン", paragraphs: ["AT突入時は3GのあこがれATTACKで初期ゲーム数と特化ゾーンを決めます。各ゲームでキャラ対応役を引けば特化獲得のチャンスで、通常AT中の上乗せ時にも同じ3G演出へ進みます。", "特化ゾーンは10Gのサディスティックタイム平均約70G、ぶるぶるマッサージタイム平均約100G、マジアベーゼ無双平均約200G。サイトではPUSHまで結果を伏せ、選ばれた特化名と上乗せゲーム数を別表示します。"] },
      { heading: "通常AT・無限AT・BONUS", paragraphs: ["まほあこラッシュは純増約2.5枚/Gのゲーム数上乗せ型です。レア役からゲーム数、BONUS、あこがれATTACKを抽選し、百合pt MAXやBONUSからBAR揃い高確へ進みます。", "BAR揃い高確成功時は『マジアベーゼが満足するまで出られない部屋』へ。サイトでは無限ATの長さを代表ゲーム数で消化し、通常上乗せ・BONUS・特化とは別の履歴に残します。"] },
      { heading: "VSロードエノルメと上位後の引き戻し", paragraphs: ["VSロードエノルメ勝利で純増約5.0枚/G・期待獲得約2000枚の上位ATへ。上位中もあこがれATTACKでゲーム数を決め、赤背景の上位キャラが1人以上出る流れをPUSHで表現します。", "上位終了後は必ずVSロードエノルメへ進み、敗北後は10Gの『あの星を堕とせ』へ。2段階合算の引き戻し60%超を代表60%として、最後までゲーム数をカウントして判定します。"] },
      { heading: "設定1〜6の公開値を反映", bullets: ["設定1：CZ約1/357.0・AT約1/436.3・出玉率97.6%", "設定4：CZ約1/273.3・AT約1/352.4・出玉率105.0%", "設定6：CZ約1/235.4・AT約1/305.7・出玉率112.0%", "非公表の特化ゾーン・上位到達率には設定差を加えない"] },
      { heading: "固定レートと収支の条件", bullets: ["約31.4G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均AT投資目安は約15,100円", "コイン単価は設定1の参考値約3.2円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ニューギン公式 機種サイト", "https://www.newgin.co.jp/products/lmahoako/"], ["ニューギン開発者Q&A", "https://www.newgin.co.jp/devfaq/faq_category/lmahoako/"], ["一撃 BONUS抽選・4種類比率", "https://1geki.jp/slot/l_mahoako/49/"], ["一撃 まほあこラッシュ解析", "https://1geki.jp/slot/l_mahoako/81/"], ["一撃 あこがれATTACK解析", "https://1geki.jp/slot/l_mahoako/83/"], ["一撃 VSロードエノルメ解析", "https://1geki.jp/slot/l_mahoako/93/"], ["一撃 上位AT・引き戻し解析", "https://1geki.jp/slot/l_mahoako/95/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10563"]]
  },
  "uminchu-slot": {
    order: 0.9, type: "slot", theme: "aqua", year: "2026年10月", maker: "岡崎産業", updated: "2026-10-31",
    name: "L海人", shortName: "スマスロ 海人",
    image: "assets/machines/uminchu-slot-key-visual.jpg",
    imageAlt: "L海人のキービジュアル",
    imageCredit: "パチマガスロマガFREE 機種情報",
    imageSource: "https://pachimaga.com/free/mach/maker-s/okazaki/l_uminchu.php",
    catchcopy: "フルーツ連を重ね、10連の先のIREGUIへ。",
    intro: "2026年10月19日導入のスマスロ。Aタイプの分かりやすさとAT機の連チャン性を組み合わせ、フルーツ連状態からボーナスを重ねてIREGUIを目指す流れを簡易体験できます。",
    points: ["設定は1・2・4・5・6（設定3非搭載）", "初当りは設定1約1/247.7〜設定6約1/207.6", "ボーナス10連後のIREGUIは平均22連OVER"],
    specs: [["初当り（設定1）", "約1/247.7"], ["初当り（設定6）", "約1/207.6"], ["BIG平均", "約202枚"], ["REG平均", "約53枚"], ["BIG純増", "約3.8枚/G"], ["REG純増", "約4.5枚/G"], ["ベース", "約29.9G/50枚"], ["IREGUI", "平均22連OVER"]],
    sim: { kind: "slot", triggerLabel: "フルーツ連状態", triggerRate: 247.7, triggerSuccess: 0.55, mainLabel: "海人BONUS", mainRate: 247.7, base50: 29.9, coinUnit: 4.0, normalMin: 53, normalMax: 202, normalAwards: [[{ label: "BIG BONUS", payout: 202, games: 53 }, 0.79], [{ label: "REG BONUS", payout: 53, games: 12 }, 0.21]], normalAwardsNote: "設定1の公表確率から算出した目安です", atPureIncrease: 3.8, specialLabel: "ボーナスストック", specialChance: 0.38, specialMin: 53, specialMax: 202, specialDisplay: "bonus", cycleFlow: { phase: "UMINCHU BONUS LOOP", label: "ボーナス連", statLabel: "海人BONUS連", games: [[12, 0.21], [53, 0.79]], continueChance: 0.64, maxRounds: 30, rewards: [[{ label: "BIG BONUS", payout: 202 }, 0.79], [{ label: "REG BONUS", payout: 53 }, 0.21]], upperAfterRounds: 10, upperAfterRoundsAutoSuccess: true, upperOnlyAfterRounds: true, endLabel: "ボーナス連終了" }, upperChallenge: "ボーナス10連チャレンジ", upperChance: 0.16, upperSuccess: 0.45, upperLabel: "IREGUI", upperContinue: 0.82, upperPayout: 450, upperPureIncrease: 3.8, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 247.7, main: 247.7, payout: 0.977 }, 2: { trigger: 243.3, main: 243.3, payout: 0.986 }, 4: { trigger: 219.8, main: 219.8, payout: 1.033 }, 5: { trigger: 211.0, main: 211.0, payout: 1.062 }, 6: { trigger: 207.6, main: 207.6, payout: 1.120 } } },
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
    image: "assets/machines/tenten-slot-key-visual.jpg",
    imageAlt: "L転生王女と天才令嬢の魔法革命のキービジュアル",
    imageCredit: "パチマガスロマガFREE 機種情報",
    imageSource: "https://pachimaga.com/free/mach/maker-s/olympiaestate/l_tenten.php",
    catchcopy: "EPISODE BATTLEを越え、ボーナス高確を重ねる。",
    intro: "2026年10月5日導入の疑似ボーナスAT機。設定別CZ・転天BONUS初当りを使い、ボーナス後40Gの高確と輪廻転天チャレンジまでを簡易体験できます。",
    points: ["CZは設定1約1/171.5〜設定6約1/136.0", "転天BONUSは設定1約1/320.0〜設定6約1/246.4", "純増約4.5枚/G・ボーナス後は40Gの高確"],
    specs: [["CZ（設定1）", "約1/171.5"], ["CZ（設定6）", "約1/136.0"], ["BONUS（設定1）", "約1/320.0"], ["BONUS（設定6）", "約1/246.4"], ["ベース", "約32.4G/50枚"], ["純増", "約4.5枚/G"]],
    sim: { kind: "slot", triggerLabel: "EPISODE BATTLE", triggerRate: 171.5, triggerSuccess: 0.503, mainLabel: "転天BONUS", mainRate: 320.0, base50: 32.4, coinUnit: 3.3, normalMin: 200, normalMax: 1000, atPureIncrease: 4.5, specialLabel: "転天STOCKチャレンジ", specialChance: 0.34, specialMin: 160, specialMax: 800, specialDisplay: "bonus", cycleFlow: { phase: "TENTEN BONUS HIGH", label: "40Gボーナス高確", statLabel: "転天BONUS連", games: 40, continueChance: 0.66, maxRounds: 12, rewards: [[{ label: "転天BONUS", payout: 200 }, 0.60], [{ label: "EPISODE BONUS", payout: 400 }, 0.28], [{ label: "転天STOCK獲得", payout: 600 }, 0.12]], endLabel: "ボーナス高確終了" }, upperChallenge: "輪廻転天チャレンジ", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "上位ボーナス高確", upperContinue: 0.80, upperPayout: 520, upperPureIncrease: 4.5, settingRates: { 1: { trigger: 171.5, main: 320.0, payout: 0.979 }, 2: { trigger: 168.3, main: 314.7, payout: 0.989 }, 3: { trigger: 154.9, main: 294.2, payout: 1.010 }, 4: { trigger: 147.0, main: 276.9, payout: 1.036 }, 5: { trigger: 140.4, main: 260.0, payout: 1.076 }, 6: { trigger: 136.0, main: 246.4, payout: 1.103 } } },
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
    image: "assets/machines/eva319-red-key-visual.jpg",
    imageAlt: "P 新世紀エヴァンゲリオン -319 RED-のキービジュアル",
    imageCredit: "ビスティ",
    imageSource: "https://www.eva-project.jp/hajimarinokioku/index_319.html",
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
  "wanwan-celebration": {
    order: 0.51, type: "pachinko", theme: "aqua", year: "2026年10月", maker: "三洋物産", updated: "2026-11-05", published: "2026-11-05",
    name: "eACわんわんパラダイスCELEBRATION", shortName: "わんわんCELEBRATION",
    image: "assets/machines/wanwan-celebration-key-visual.jpg",
    imageAlt: "eACわんわんパラダイスCELEBRATIONの公式キービジュアル",
    imageCredit: "SANYO 公式機種サイト",
    imageSource: "https://www.sanyobussan.co.jp/products/pk_ac_wanpara_celebration/",
    catchcopy: "遊パチ77ver.から、わんわんRUSHと高継続モードへ。",
    intro: "1台で2スペックを選べる2in1スマパチ。サイトでは遊パチ77ver.を採用し、約1/77.7の初当り、トータルRUSH突入約52%、継続約66%を固定条件で簡易体験できます。",
    points: ["遊パチ77ver.は通常時約1/77.7", "トータルRUSH突入約52%・継続約66%", "上位わんわんCELEBRATIONは継続約85%"],
    specs: [["通常時（遊パチ77）", "約1/77.7"], ["高確率時", "約1/39.9"], ["RUSH突入", "約52%"], ["RUSH継続", "約66%"], ["上位継続", "約85%"], ["遊タイム", "低確率149回で時短10000回"]],
    sim: { kind: "pachinko", hitRate: 77.7, hitLabel: "初当り", startType: "遊パチ77ver.", spinsPer1k: 16.7, minSpins: 10, maxSpins: 30, rushLabel: "わんわんRUSH", rushEntry: 0.52, rushContinue: 0.66, firstPayoutIn: 420, firstPayoutOut: 280, rushPayouts: [[280, 0.40], [420, 0.40], [700, 0.20]], upperLabel: "わんわんCELEBRATION", upperUpgradeChance: 0.08, upperContinue: 0.85 },
    readerGuide: { verdict: "軽い初当りと段階式のRUSHを遊びやすく体験したい人向けです。", bestFor: ["甘デジ帯で連チャンを楽しみたい", "上位約85%継続を狙いたい"], check: ["サイトでは遊パチ77ver.を採用", "2in1の49ver.は個別抽選していない"], compare: [["oumi-agnes-premium", "アグネス Premium", "甘海タイプと比較"], ["shin-ultraman-79", "シン・ウルトラマン79", "1回転決着型と比較"]] },
    articleSections: [
      { heading: "2in1のうち遊パチ77ver.を採用", paragraphs: ["実機は遊パチ77ver.と、ちょいパチ49ver.を1台に搭載します。営業中に内部スペックを変更することはできません。", "シミュレーターは遊パチ77ver.へ固定し、通常時約1/77.7、高確率時約1/39.9を基準にしています。49ver.との混合抽選は行いません。"] },
      { heading: "チャレンジから2段階RUSHへ", paragraphs: ["初当り後は必ず右打ちへ進み、10Rの約3%はRUSHへ直行、それ以外はチャレンジ突破を目指します。トータルRUSH突入率は約52%です。", "わんわんRUSHは約66%継続。さらに上位のわんわんCELEBRATIONは約85%継続です。サイトでは複数の時短回数を突入・継続・上位昇格の3抽選へ整理します。"] },
      { heading: "出玉と遊タイム", paragraphs: ["遊パチ77ver.の右打ち出玉は約280個40%・約420個40%・約700個20%。シミュレーターにもこの振り分けを反映します。", "低確率を149回消化すると時短10000回の遊タイムへ進みますが、現在の1回遊技シミュレーターでは遊タイム到達を独立演出にしていません。"] },
      { heading: "固定条件", bullets: ["16.7回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約4,700円", "2in1は遊パチ77ver.のみを再現", "結果はマイ記録と機種別ランキングへ保存"] }
    ],
    sources: [["SANYO 公式機種サイト", "https://www.sanyobussan.co.jp/products/pk_ac_wanpara_celebration/"], ["天井ナビ スペックまとめ", "https://tenjo-navi.com/pachinko/e-ac-wanwan-celebration/"]]
  },
  "akina-forfans": {
    order: 0.52, type: "pachinko", theme: "crimson", year: "2026年10月", maker: "D-light", updated: "2026-11-05", published: "2026-11-05",
    name: "e中森明菜・歌姫伝説～FORFANS～", shortName: "e中森明菜 FORFANS",
    image: "assets/machines/akina-forfans-key-visual.jpg",
    imageAlt: "e中森明菜・歌姫伝説～FORFANS～の公式実機画像",
    imageCredit: "Daiichi777 公式製品情報",
    imageSource: "https://daiichi777.jp/product/detail/240/akina6",
    catchcopy: "大入りスタートからST100回へ。3種類の当りで時短を目指す。",
    intro: "通常時約1/319.7、全ての初当りからST100回へ進む歌パチです。ST継続約70%、4R・7R・10Rを集めるスタンプラリーと時短込み約78%の流れを簡易体験できます。",
    points: ["通常時約1/319.7・ST突入100%", "ST100回・継続約70%", "4R・7R・10R獲得で時短100回を追加"],
    specs: [["通常時", "1/319.7"], ["ST中", "1/85.6"], ["ST突入", "100%"], ["ST回数／継続", "100回／約70%"], ["時短込み継続", "約78%"], ["右打ち出玉", "400・700・1500個"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "歌姫BONUS", startType: "大入りスタート・BIG8", spinsPer1k: 31.2, minSpins: 20, maxSpins: 42, rushLabel: "歌姫ST", rushEntry: 1, rushContinue: 0.70, firstPayoutIn: 400, firstPayoutOut: 400, rushPayouts: [[400, 0.33], [700, 0.33], [1500, 0.34]], upperLabel: "歌姫TIME", upperAfterHits: 4, upperEarlyChance: 0.04, upperChallengeSuccess: 1, upperContinue: 0.78 },
    readerGuide: { verdict: "初当り後は必ずSTへ進み、楽曲とラウンド収集を楽しみたい人向けです。", bestFor: ["100%ST突入を重視したい", "400・700・1500個の当りを集めたい"], check: ["基本ST継続は約70%", "約78%は時短獲得時を含む目安"], compare: [["eva319-red", "エヴァ319 RED", "ミドルSTと比較"], ["wanwan-celebration", "わんわんCELEBRATION", "遊びやすい新台と比較"]] },
    articleSections: [
      { heading: "全ての初当りからST100回", paragraphs: ["通常時は約1/319.7、ST中は約1/85.6です。初当りのラウンドに関係なくST100回へ進み、残保留込みの継続期待度は約70%です。", "大入りスタートと8個保留を組み合わせたBIG8により、一般的なミドル機より高い回転率を想定します。"] },
      { heading: "スタンプラリーで時短を獲得", paragraphs: ["ST中に4R・7R・10Rの3種類を全て獲得すると、ST終了後に時短100回が追加されます。STと時短を合わせた継続期待度は約78%です。", "サイトではラウンド履歴を個別に収集する完全再現ではなく、連チャンを重ねた際の上位昇格として歌姫TIMEを表示します。"] },
      { heading: "右打ちの3つの出玉", paragraphs: ["右打ち中は4R約400個33%、7R約700個33%、10R約1500個34%です。初当りは10R24%・7R26%・4R50%ですが、簡易モデルの初回は400個へ固定します。", "各当り後のPUSH画面ではラウンドと表記出玉、打ち出しを考慮した実獲得出玉を分けて表示します。"] },
      { heading: "固定条件", bullets: ["31.2回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約10,300円", "時短獲得条件は簡易昇格で表現", "結果はマイ記録と機種別ランキングへ保存"] }
    ],
    sources: [["Daiichi777 公式製品情報", "https://daiichi777.jp/product/detail/240/akina6"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10541"]]
  },
  "shin-ultraman-79": {
    order: 1.1, type: "pachinko", theme: "ice", year: "2026年9月", maker: "オッケー.", updated: "2026-11-05", published: "2026-11-05",
    name: "e シン・ウルトラマン 79ver.", shortName: "シン・ウルトラマン79",
    image: "assets/machines/shin-ultraman-79-key-visual.png",
    imageAlt: "e シン・ウルトラマン 79ver.の公式キービジュアル",
    imageCredit: "オッケー. 公式機種サイト",
    imageSource: "https://ok777.co.jp/lineup/shin_ultraman_79/r/on/",
    catchcopy: "初当り後は必ず1回転勝負。突破すれば約80%のゼットンATTACKへ。",
    intro: "通常時約1/79.9、初当り後は必ずウルトラバトルモードへ進む甘デジです。1回転の約33%を突破し、継続約80%のゼットンATTACKを目指す流れを簡易体験できます。",
    points: ["通常時約1/79.9・初回500個", "ウルトラバトルモード突破約33%", "ゼットンATTACK継続約80%"],
    specs: [["通常時", "約1/79.9"], ["初回バトル中", "約1/3.1"], ["初回バトル突入", "100%"], ["初回突破", "約33%"], ["ゼットンATTACK", "約1/1.26・継続約80%"], ["右打ち出玉", "300・1000個"]],
    sim: { kind: "pachinko", hitRate: 79.9, hitLabel: "ウルトラBONUS", startType: "P-スキップ対応", spinsPer1k: 17.5, minSpins: 10, maxSpins: 30, rushLabel: "ゼットンATTACK", rushEntry: 0.33, rushContinue: 0.80, firstPayoutIn: 500, firstPayoutOut: 500, rushPayouts: [[300, 0.70], [1000, 0.30]] },
    readerGuide: { verdict: "軽い初当りから1回転のPUSH勝負を繰り返したい人向けです。", bestFor: ["短い当落演出が好き", "約80%の1回転連チャンを試したい"], check: ["初当り後のバトル突入は100%", "ゼットンATTACK到達は約33%"], compare: [["wanwan-celebration", "わんわんCELEBRATION", "段階RUSH型と比較"], ["no-game-no-life-119", "ノゲノラ119", "ライト新台と比較"]] },
    articleSections: [
      { heading: "初当り後は必ず1回転バトル", paragraphs: ["通常時の大当りは約1/79.9で、初回出玉は500個。大当り後は必ず時短1回のウルトラバトルモードへ進みます。", "バトル中は約1/3.1を1回で抽選し、突破期待度は約33%。サイトではこの1回転をRUSH突入PUSHとして表示します。"] },
      { heading: "ゼットンATTACKは約80%継続", paragraphs: ["ゼットンATTACK中は約1/1.26を時短1回で抽選し、継続率は約80%です。右打ち当りは300個70%・1000個30%。", "当りごとに数字が1回転進み、PUSH後はラウンドと獲得玉数を読める時間だけ保持してから次の当落へ進みます。"] },
      { heading: "P-スキップ搭載", paragraphs: ["通常時はP-スキップを利用でき、演出を飛ばして当落へ進む遊び方に対応しています。", "サイトのスキップボタンは演出時間だけを短縮し、当選確率や抽選結果は変えません。"] },
      { heading: "固定条件", bullets: ["17.5回/1,000円・250玉貸し・28玉交換で固定", "平均初当り投資目安は約4,600円", "1回転バトルをPUSH演出で表現", "結果はマイ記録と機種別ランキングへ保存"] }
    ],
    sources: [["オッケー. 公式機種サイト", "https://ok777.co.jp/lineup/shin_ultraman_79/r/on/"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4821/1/1"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10556"]]
  },
  "takt-opus-destiny": {
    order: 1.2, type: "pachinko", theme: "violet", year: "2026年9月", maker: "ニューギン", updated: "2026-11-05", published: "2026-11-05",
    name: "eタクトオーパス デスティニー", shortName: "eタクトオーパス",
    image: "assets/machines/takt-opus-destiny-key-visual.jpg",
    imageAlt: "eタクトオーパス デスティニーの公式機種画像",
    imageCredit: "ニューギン 公式機種情報",
    imageSource: "https://www.newgin.co.jp/products/etaktopdestiny/",
    catchcopy: "合算約1/348.6からDESTINY CHALLENGEを掴み、ST144回へ。",
    intro: "チャージを含む大当り合算約1/348.6、図柄揃い時の50%でDESTINY CHALLENGEへ進むLT機です。RUSH継続約77%と、1500～7500個の幅広い出玉を簡易体験できます。",
    points: ["大当り合算約1/348.6・図柄揃い約1/1394.4", "全大当り基準のRUSHルート約12.5%", "DESTINY RUSHはST144回・継続約77%"],
    specs: [["大当り合算", "約1/348.6"], ["図柄揃い", "約1/1394.4"], ["RUSH中", "約1/99.9"], ["ST回数／継続", "144回／約77%"], ["図柄揃い時RUSH", "50%"], ["右打ち出玉", "1500～7500個"]],
    sim: { kind: "pachinko", hitRate: 348.6, hitLabel: "大当り・CHARGE", startType: "通常ヘソ", spinsPer1k: 19.0, minSpins: 10, maxSpins: 30, rushLabel: "DESTINY RUSH", rushEntry: 0.125, rushContinue: 0.77, firstPayoutIn: 1500, firstPayoutOut: 300, rushPayouts: [[1500, 0.259], [2700, 0.402], [3900, 0.249], [5100, 0.077], [6300, 0.012], [7500, 0.001]] },
    readerGuide: { verdict: "低いRUSH入口を突破し、1回の大当りで大きな出玉を狙いたい人向けです。", bestFor: ["一撃の出玉幅を重視したい", "ST144回の約77%継続を試したい"], check: ["合算大当りの約75%はチャージ", "図柄揃い時のRUSHルートは50%"], compare: [["majo-to-yaju-pachinko", "e魔女と野獣", "上乗せ特化型と比較"], ["assault-lily", "eアサルトリリィ", "ライトLTと比較"]] },
    articleSections: [
      { heading: "合算確率と図柄揃いを分けて見る", paragraphs: ["通常時はチャージを含む大当り合算約1/348.6、図柄揃いは約1/1394.4です。全大当りの約75%は2Rチャージで通常へ戻ります。", "図柄揃いの50%がDESTINY CHALLENGEへ進むため、全大当り基準のRUSHルートは約12.5%です。サイトでは合算大当りから約12.5%でRUSHへ進む簡易抽選にしています。"] },
      { heading: "DESTINY CHALLENGEは実質次回まで", paragraphs: ["DESTINY CHALLENGEは約1/99.9を実質次回まで抽選し、当選後はDESTINY RUSHへ。RUSHはST144回で継続率約77%です。", "チャレンジ内の当りとRUSH中の当りは同じ出玉振り分けとして扱い、複数回大当り分を合算した表記出玉を表示します。"] },
      { heading: "右打ちは1500～7500個", paragraphs: ["右打ち中は1500個25.9%、2700個40.2%、3900個24.9%、5100個7.7%、6300個1.2%、7500個0.1%の代表値へ整理します。", "公表上は10R・18R・26R・34R・42R・50Rの合算表記です。サイトでは見やすい1500個単位に近い代表出玉へ丸めています。"] },
      { heading: "固定条件", bullets: ["19.0回/1,000円・250玉貸し・28玉交換で固定", "合算初当りまでの平均投資目安は約18,400円", "チャージと図柄揃いを簡易分岐", "結果はマイ記録と機種別ランキングへ保存"] }
    ],
    sources: [["ニューギン 公式機種サイト", "https://www.newgin.co.jp/products/etaktopdestiny/"], ["PShort スペック", "https://pshort.jp/pachi/e_takt_op_destiny/"]]
  },
  "majo-to-yaju-pachinko": {
    order: 1.3, type: "pachinko", theme: "violet", year: "2026年9月", maker: "藤商事", updated: "2026-11-05", published: "2026-11-05",
    name: "e魔女と野獣", shortName: "e魔女と野獣",
    image: "assets/machines/majo-to-yaju-pachinko-key-visual.jpg",
    imageAlt: "e魔女と野獣の機種キービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10545",
    catchcopy: "BIGスタートから復讐RUSHへ。W上乗せで最大9000個帯を狙う。",
    intro: "大当り合算約1/349、図柄揃い約1/399、復讐RUSH突入約51%のLT・上乗せ特化型スマパチです。ST75回・継続約55%と、運命分岐からの大型出玉を簡易体験できます。",
    points: ["大当り合算約1/349・図柄揃い約1/399", "図柄揃い時RUSH突入約51%", "復讐RUSHはST75回・継続約55%"],
    specs: [["大当り合算", "約1/349"], ["図柄揃い", "約1/399"], ["復讐CHARGE", "約1/2799"], ["RUSH中", "約1/95"], ["RUSH突入／継続", "約51%／約55%"], ["運命分岐成功", "約50%"]],
    sim: { kind: "pachinko", hitRate: 349, hitLabel: "図柄揃い・CHARGE", startType: "BIGスタート", spinsPer1k: 27.0, minSpins: 18, maxSpins: 38, rushLabel: "復讐RUSH", rushEntry: 0.446, rushContinue: 0.55, firstPayoutIn: 350, firstPayoutOut: 350, rushPayouts: [[2800, 0.50], [5600, 0.29], [8400, 0.21]], upperLabel: "運命分岐", upperUpgradeChance: 0.52, upperContinue: 0.55 },
    readerGuide: { verdict: "継続率よりも1回の大型上乗せを重視する人向けです。", bestFor: ["2800個以上の出玉演出を楽しみたい", "運命分岐のPUSH勝負を試したい"], check: ["約51%は図柄揃い基準", "CHARGE込みの突入は約44.6%"], compare: [["takt-opus-destiny", "eタクトオーパス", "大出玉STと比較"], ["majo-to-yajuu-slot", "スマスロ 魔女と野獣", "スロット版と比較"]] },
    articleSections: [
      { heading: "図柄揃いとCHARGEの合算", paragraphs: ["通常時の図柄揃いは約1/399、復讐CHARGEは約1/2799で、合算大当りは約1/349です。図柄揃い時のRUSH突入は約51%。", "CHARGEを含む全大当り基準ではRUSH突入が約44.6%になるため、シミュレーターは合算約1/349と突入約44.6%を組み合わせます。"] },
      { heading: "ST75回・継続約55%", paragraphs: ["復讐RUSH中は約1/95を75回で抽選し、継続率は約55%です。初回RUSH中の大当り後は必ず運命分岐へ進み、2連目以降は約52%で分岐します。", "サイトでは連チャン中の上位昇格として運命分岐を表示し、成功率約50%の個別抽選は大型出玉振り分けへまとめています。"] },
      { heading: "W上乗せと大型出玉", paragraphs: ["RUSH中は20R・40R・60R相当の大当りがあり、約2800個・約5600個・約8400個の代表出玉として扱います。公表上は最大9000個帯までの出玉があります。", "実際のアタッカー、V入賞、上乗せループ、打ち方による差は完全再現しません。結果では表記出玉と簡易的な実獲得出玉を分けます。"] },
      { heading: "固定条件", bullets: ["27.0回/1,000円・250玉貸し・28玉交換で固定", "合算初当りまでの平均投資目安は約13,000円", "運命分岐とW上乗せは代表値で簡易化", "結果はマイ記録と機種別ランキングへ保存"] }
    ],
    sources: [["藤商事 公式機種ラインナップ", "https://www.fujimarukun.co.jp/products/"], ["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4811/1/1"], ["PShort スペック", "https://pshort.jp/pachi/e_majo_to_yaju/"]]
  },
  "lycoris-recoil-slot": {
    order: 1, type: "slot", theme: "crimson", year: "2026年9月", maker: "サミー",
    name: "スマスロ リコリス・リコイル", shortName: "スマスロ リコリコ",
    image: "assets/machines/lycoris-recoil-slot-key-visual.jpg",
    imageAlt: "スマスロ リコリス・リコイルのキービジュアル",
    imageCredit: "パチマガスロマガFREE 機種情報",
    imageSource: "https://pachimaga.com/free/mach/maker-s/sammy/l_lycoreco.php",
    catchcopy: "CZを突破し、リコリスラッシュWを目指す。",
    intro: "2026年9月7日導入のスマスロ。CZから高純増ATへ進み、上位CZ『リコイル オブ リコリス』成功で上位ATを目指す流れを簡易体験できます。",
    points: ["CZは設定1約1/198.7〜設定6約1/169.4", "AT初当りは設定1約1/328.8〜設定6約1/256.7", "約31.8G/50枚・コイン単価約3.2円（設定1）"],
    specs: [["CZ（設定1）", "約1/198.7"], ["CZ（設定6）", "約1/169.4"], ["AT初当り（設定1）", "約1/328.8"], ["AT初当り（設定6）", "約1/256.7"], ["ベース", "約31.8G/50枚"], ["AT純増", "約8.4枚/G"]],
    sim: { kind: "slot", triggerLabel: "オポジットバトル", triggerRate: 198.7, triggerSuccess: 0.53, mainLabel: "リコリスラッシュ", mainRate: 328.8, base50: 31.8, coinUnit: 3.2, normalMin: 250, normalMax: 950, atPureIncrease: 8.4, specialLabel: "リコリスBONUS W", specialChance: 0.32, specialMin: 200, specialMax: 700, specialDisplay: "bonus", cycleFlow: { phase: "LYCORIS RUSH", label: "リコリスラッシュ", statLabel: "BONUS連", games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.70, maxRounds: 10, rewards: [[{ label: "リコリスBONUS", payout: 200 }, 0.55], [{ label: "リコリスBONUS W", payout: 400 }, 0.30], [{ label: "喫茶リコリコBONUS", payout: 800 }, 0.15]], endLabel: "リコリスラッシュ終了" }, upperChallenge: "リコイル オブ リコリス", upperChance: 0.20, upperSuccess: 0.70, upperLabel: "リコリスラッシュW", upperContinue: 0.80, upperPayout: 520, settingRates: { 1: { trigger: 198.7, main: 328.8, payout: 0.979 }, 2: { trigger: 196.9, main: 323.4, payout: 0.989 }, 3: { trigger: 191.3, main: 312.1, payout: 1.013 }, 4: { trigger: 183.3, main: 288.3, payout: 1.061 }, 5: { trigger: 175.9, main: 271.6, payout: 1.104 }, 6: { trigger: 169.4, main: 256.7, payout: 1.146 } } },
    articleSections: [
      { heading: "設定1〜6のCZ・AT初当りを反映", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定のCZ確率・AT初当り・出玉率を使用します。設定は結果とランキングに表示します。", "上位CZや特化ゾーンの設定差は公表値が確認できないため、全設定で共通の簡易条件です。"] },
      { heading: "公開値を使う設定シミュレーション", bullets: ["設定1はCZ約1/198.7・AT約1/328.8", "設定6はCZ約1/169.4・AT約1/256.7", "46枚貸し・5.2枚交換で収支を表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10503"], ["パチマガスロマガFREE 機種情報", "https://pachimaga.com/free/mach/maker-s/sammy/l_lycoreco.php"]]
  },
  "assault-lily": {
    order: 2, type: "pachinko", theme: "sakura", year: "2026年9月", maker: "ビスティ",
    name: "e アサルトリリィ", shortName: "eアサルトリリィ",
    image: "assets/machines/assault-lily-key-visual.jpg",
    imageAlt: "e アサルトリリィのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10554",
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
    image: "assets/machines/kanokari-slot-key-visual.jpg",
    imageAlt: "Lパチスロ 彼女、お借りしますのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10543",
    catchcopy: "レンカノCHALLENGEから、1G連とS級の夢へ。",
    intro: "CZと疑似ボーナス、1G連抽選を軸にしたスマスロ。通常CZと上位CZを分け、ボーナス連からS級DREAM TIMEを目指す流れを簡易化しています。",
    points: ["CZは設定1約1/172〜設定6約1/149", "ボーナス初当りは設定1約1/269〜設定6約1/226", "約31.0G/50枚・コイン単価約3.6円（設定1）"],
    specs: [["CZ（設定1）", "約1/172"], ["CZ（設定6）", "約1/149"], ["ボーナス初当り（設定1）", "約1/269"], ["ボーナス初当り（設定6）", "約1/226"], ["ベース", "約31.0G/50枚"], ["AT純増", "約5.0枚/G"]],
    sim: { kind: "slot", triggerLabel: "レンカノCHALLENGE", triggerRate: 172, triggerSuccess: 0.56, mainLabel: "かのかりBONUS", mainRate: 269, base50: 31, coinUnit: 3.6, normalMin: 150, normalMax: 850, atPureIncrease: 5.0, specialLabel: "1G恋ストック", specialChance: 0.36, specialMin: 150, specialMax: 750, specialDisplay: "bonus", cycleFlow: { phase: "KANOKARI BONUS", label: "1G恋ストック", statLabel: "恋ストック連", games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.60, maxRounds: 10, rewards: [[{ label: "かのかりBONUS", payout: 150 }, 0.55], [{ label: "デートBONUS", payout: 300 }, 0.30], [{ label: "S級BONUS", payout: 600 }, 0.15]], endLabel: "1G恋ストック終了" }, upperChallenge: "妄想DTチャレンジ", upperChance: 0.18, upperSuccess: 0.75, upperLabel: "S級DREAM TIME", upperContinue: 0.80, upperPayout: 480, settingRates: { 1: { trigger: 172, main: 269, payout: 0.977 }, 2: { trigger: 169, main: 263, payout: 0.987 }, 3: { trigger: 164, main: 254, payout: 1.010 }, 4: { trigger: 154, main: 235, payout: 1.055 }, 5: { trigger: 151, main: 231, payout: 1.104 }, 6: { trigger: 149, main: 226, payout: 1.149 } } },
    articleSections: [
      { heading: "設定1〜6の公開値を個別反映", paragraphs: ["設定ごとのCZ合算・ボーナス初当り・出玉率を反映し、START時に設定1〜6を均等抽選します。", "妄想DTチャレンジやS級DREAM TIMEの設定差は公表値が確認できないため、サイト共通条件です。"] },
      { heading: "設定差を見るポイント", bullets: ["設定1はCZ約1/172・初当り約1/269", "設定6はCZ約1/149・初当り約1/226", "結果と機種別ランキングに設定を表示", "46枚貸し・5.2枚交換で収支を比較"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/products/machine_list/szf/?r=portal"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10543"]]
  },
  "kabaneri2-119": {
    order: 4, type: "pachinko", theme: "ember", year: "2026年9月", maker: "サミー",
    name: "e 甲鉄城のカバネリ2 輪廻の果報119ver.", shortName: "カバネリ2 119",
    image: "assets/machines/kabaneri2-119-key-visual.jpg",
    imageAlt: "e 甲鉄城のカバネリ2 輪廻の果報119ver.のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10504",
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
    image: "assets/machines/aobuta-slot-key-visual.jpg",
    imageAlt: "L青春ブタ野郎はバニーガール先輩の夢を見ないのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10527",
    catchcopy: "完走型STを重ね、夢現JUDGEMENTを突破する。",
    intro: "疑似ボーナス後も残りゲーム数を消化できる完走型STが特徴。上位CZ『夢現JUDGEMENT』から上位STを目指す流れを簡易体験できます。",
    points: ["実機の抽選対象は設定2〜6（設定1非搭載）", "ボーナス初当りは設定2約1/350.8〜設定6約1/207.8", "約31.5G/50枚・コイン単価約4.1円（設定2）"],
    specs: [["設定", "2・3・4・5・6"], ["初当り（設定2）", "約1/350.8"], ["初当り（設定6）", "約1/207.8"], ["ベース", "約31.5G/50枚"], ["AT純増", "約8.0枚/G"], ["上位ST継続", "約80%"]],
    sim: { kind: "slot", triggerLabel: "初当りボーナス", triggerRate: 350.8, triggerSuccess: 1, mainLabel: "青ブタJUDGE", mainRate: 350.8, base50: 31.5, coinUnit: 4.1, normalMin: 250, normalMax: 1100, atPureIncrease: 8.0, specialLabel: "青春DREAM BURST", specialChance: 0.34, specialMin: 200, specialMax: 950, specialDisplay: "bonus", cycleFlow: { phase: "SEISHUN DREAM", label: "青ブタJUDGE", statLabel: "青春BONUS連", games: 20, continueChance: 0.75, maxRounds: 12, rewards: [[{ label: "青春BONUS", payout: 200 }, 0.55], [{ label: "青春DREAM BURST", payout: 400 }, 0.30], [{ label: "エピソードBONUS", payout: 800 }, 0.15]], endLabel: "青ブタJUDGE終了" }, upperChallenge: "夢現JUDGEMENT", upperChance: 0.20, upperSuccess: 0.53, upperLabel: "青春ブタ野郎は∞の夢を見る", upperContinue: 0.80, upperPayout: 700, settingPool: [2, 3, 4, 5, 6], settingRates: { 2: { trigger: 350.8, main: 350.8, payout: 0.981 }, 3: { trigger: 336.5, main: 336.5, payout: 0.993 }, 4: { trigger: 295.1, main: 295.1, payout: 1.053 }, 5: { trigger: 274.6, main: 274.6, payout: 1.084 }, 6: { trigger: 207.8, main: 207.8, payout: 1.103 } } },
    articleSections: [
      { heading: "設定2〜6を実機どおり抽選", paragraphs: ["設定1は搭載されていないため、START時は設定2・3・4・5・6から均等に抽選します。設定Lは遊技用ではないため対象外です。", "設定別の青春BONUS初当りと出玉率を使い、結果とランキングに今回の設定を表示します。"] },
      { heading: "公開値と簡易演出", bullets: ["設定2は初当り約1/350.8", "設定6は初当り約1/207.8", "夢現JUDGEMENT以降は共通の簡易抽選", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10527"], ["パチ＆スロ必勝本 通常時解説", "https://hisshobon.com/machineinfo/142469/"]]
  },
  "fire-force2-99": {
    order: 6, type: "pachinko", theme: "flame", year: "2026年9月", maker: "SANKYO",
    name: "eフィーバー炎炎ノ消防隊2 99ver.", shortName: "炎炎ノ消防隊2 99",
    image: "assets/machines/fire-force2-99-key-visual.jpg",
    imageAlt: "eフィーバー炎炎ノ消防隊2 99ver.のキービジュアル",
    imageCredit: "P-WORLD 発表記事",
    imageSource: "https://news.p-world.co.jp/articles/34058/yugitsushin",
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
    image: "assets/machines/hokuto-tensei2-key-visual.jpg",
    imageAlt: "スマスロ 北斗の拳 転生の章2のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10370",
    catchcopy: "あべしを貯め、闘神演舞と神拳勝舞を突破する。",
    intro: "全国5,000店舗以上に設置され、投稿も活発な人気スマスロ。規定あべしからAT『闘神演舞』へ進み、勝舞魂を使う神拳勝舞と特化ゾーンを簡易体験できます。",
    points: ["AT初当りは設定1約1/366.0〜設定6約1/273.1", "約31.5G/50枚・コイン単価約3.5円", "AT純増約4.0枚/G、神拳勝舞とSPバトルを搭載"],
    specs: [["AT初当り（設定1）", "約1/366.0"], ["AT初当り（設定6）", "約1/273.1"], ["ベース", "約31.5G/50枚"], ["コイン単価", "約3.5円"], ["AT純増", "約4.0枚/G"], ["AT1セット", "30G"]],
    sim: { kind: "slot", triggerLabel: "闘神演舞", triggerRate: 366, triggerSuccess: 1, mainLabel: "闘神演舞", mainRate: 366, base50: 31.5, coinUnit: 3.5, normalMin: 250, normalMax: 1150, atPureIncrease: 4.0, specialLabel: "拳王強襲", specialChance: 0.27, specialMin: 180, specialMax: 900, specialDisplay: "coins", cycleFlow: { phase: "TOUSHIN ENBU", label: "神拳勝舞", statLabel: "勝舞魂バトル", games: 30, continueChance: 0.72, maxRounds: 12, rewards: [[{ label: "勝舞魂獲得", payout: 120 }, 0.55], [{ label: "闘神演舞継続", payout: 240 }, 0.30], [{ label: "拳王強襲", payout: 480 }, 0.15]], endLabel: "神拳勝舞敗北" }, upperChallenge: "神拳勝舞", upperChance: 0.46, upperSuccess: 0.52, upperLabel: "SPバトル", upperContinue: 0.80, upperPayout: 420, settingRates: { 1: { trigger: 366.0, main: 366.0, payout: 0.976 }, 2: { trigger: 357.0, main: 357.0, payout: 0.984 }, 3: { trigger: 336.3, main: 336.3, payout: 1.007 }, 4: { trigger: 298.7, main: 298.7, payout: 1.062 }, 5: { trigger: 283.2, main: 283.2, payout: 1.111 }, 6: { trigger: 273.1, main: 273.1, payout: 1.149 } } },
    articleSections: [
      { heading: "設定1〜6のAT初当りを個別反映", paragraphs: ["START時に設定1〜6を均等抽選し、設定1約1/366.0、設定2約1/357.0、設定3約1/336.3、設定4約1/298.7、設定5約1/283.2、設定6約1/273.1のAT初当りを使用します。", "抽選された設定は結果とランキングに表示します。公開されていない拳王強襲・神拳勝舞・SPバトルの設定差は独自に加えません。"] },
      { heading: "闘神演舞から神拳勝舞までを再現", paragraphs: ["実機同様、30GのAT『闘神演舞』で勝舞魂を獲得し、終了後は勝舞魂1個につき1Gの『神拳勝舞』へ進みます。PUSHで勝敗を開き、勝利時に残った勝舞魂は次セットへ持ち越します。", "勝舞魂の獲得個数や対戦相手別の勝率詳細には未公表部分があるため、シミュレーターでは公開されているゲーム構造を優先し、魂1個ごとの当落を代表値で抽選します。31.5G/50枚、46枚貸し・5.2枚交換は固定です。"] },
      { heading: "遊び方のポイント", bullets: ["抽選設定ごとの初当りGを比較する", "拳王強襲の上乗せ結果を見る", "神拳勝舞からSPバトル到達を狙う", "19,000枚到達時はコンプリート表示で打ち切る"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10370"], ["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/1059/"]]
  },
  "tokyo-ghoul-super": {
    order: 8, type: "pachinko", theme: "crimson", year: "2026年6月", maker: "ビスティ",
    name: "e 東京喰種 超デカ超一撃ver.", shortName: "東京喰種 超デカ超一撃",
    image: "assets/machines/tokyo-ghoul-super-key-visual.jpg",
    imageAlt: "e 東京喰種 超デカ超一撃ver.のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10500",
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
    image: "assets/machines/bofuri-slot-key-visual.jpg",
    imageAlt: "スマスロ痛いのは嫌なので防御力に極振りしたいと思います。のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10036",
    catchcopy: "高確率ZONEを突破し、防御状態をループさせる。",
    intro: "CZと防御状態のループが支持される人気スマスロ。通常CZからボーナス、上位CZ『極・高確率』と高継続状態を目指す流れを簡易化しています。",
    points: ["初当りは設定1約1/319.0〜設定6約1/229.7", "約33G/50枚・コイン単価約3.3円", "防御状態ループ約77～94%、上位CZ期待度約55%"],
    specs: [["初当り（設定1）", "約1/319.0"], ["初当り（設定6）", "約1/229.7"], ["設定1出玉率", "97.9%"], ["設定6出玉率", "113.0%"], ["ベース", "約33G/50枚"], ["純増", "約5.5枚/G"]],
    sim: { kind: "slot", triggerLabel: "運営高確率", triggerRate: 159.5, triggerSuccess: 0.50, mainLabel: "防振りBONUS", mainRate: 319, base50: 33, coinUnit: 3.3, normalMin: 180, normalMax: 850, atPureIncrease: 5.5, specialLabel: "暴虐ZONE", specialChance: 0.31, specialMin: 150, specialMax: 850, specialDisplay: "bonus", cycleFlow: { phase: "BOFURI BONUS", label: "防振りBONUS", statLabel: "BONUS連", games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.70, maxRounds: 12, rewards: [[{ label: "防振りBONUS", payout: 180 }, 0.55], [{ label: "暴虐ZONE", payout: 360 }, 0.30], [{ label: "極・高確率BONUS", payout: 720 }, 0.15]], endLabel: "防振りBONUS終了" }, upperChallenge: "極・高確率", upperChance: 0.22, upperSuccess: 0.55, upperLabel: "防御状態Lv.4", upperContinue: 0.94, upperPayout: 310, settingRates: { 1: { main: 319.0, payout: 0.979 }, 2: { main: 309.8, payout: 0.988 }, 3: { main: 307.3, payout: 1.005 }, 4: { main: 266.8, payout: 1.059 }, 5: { main: 257.1, payout: 1.095 }, 6: { main: 229.7, payout: 1.130 } } },
    articleSections: [
      { heading: "設定1〜6のボーナス初当りを反映", paragraphs: ["設定1約1/319.0から設定6約1/229.7まで、公開されているボーナス初当りと出玉率を使用します。", "CZ出現率の全設定値は公開されていないため、運営高確率の発生は初当り確率と従来の50%突破条件から簡易換算します。"] },
      { heading: "結果の見方", bullets: ["今回の設定を結果とランキングに表示", "上位CZ・防御状態の設定差は追加しない", "46枚貸し・5.2枚交換で収支を表示", "コンプリート到達時は19,000枚で打ち切る"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10036"], ["サミー 公式機種情報", "https://www.sammy.co.jp/japanese/product/pachislot/bou_fu/"]]
  },
  "azur-lane-slot": {
    order: 10, type: "slot", theme: "ocean", year: "2025年8月", maker: "京楽",
    name: "L アズールレーン THE ANIMATION", shortName: "スマスロ アズールレーン",
    image: "assets/machines/azur-lane-slot-key-visual.jpg",
    imageAlt: "L アズールレーン THE ANIMATIONのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10312",
    catchcopy: "4陣営を集結し、天城バトルから異次元性能へ。",
    intro: "ボーナスとATを重ねて上位ATを目指す人気スマスロ。4陣営集結から天城バトルを突破し、異次元性能SS RUSHへ進む流れを簡易体験できます。",
    points: ["ボーナスは設定1約1/167.4〜設定6約1/156.0", "ATは設定1約1/598.9〜設定6約1/467.5", "約25.8G/50枚・コイン単価約3.6円"],
    specs: [["ボーナス（設定1）", "約1/167.4"], ["ボーナス（設定6）", "約1/156.0"], ["AT初当り（設定1）", "約1/598.9"], ["AT初当り（設定6）", "約1/467.5"], ["AT純増", "約2.5枚/G"], ["上位AT純増", "約5.1枚/G"]],
    sim: { kind: "slot", triggerLabel: "海戦BONUS", triggerRate: 167.4, triggerSuccess: 0.28, mainLabel: "アズールレーンRUSH", mainRate: 598.9, base50: 25.8, coinUnit: 3.6, normalMin: 350, normalMax: 1500, atPureIncrease: 2.5, specialLabel: "4陣営集結", specialChance: 0.34, specialMin: 220, specialMax: 850, specialDisplay: "coins", cycleFlow: { phase: "AZUR LANE RUSH", label: "艦隊戦", statLabel: "艦隊戦勝利", games: 30, continueChance: 0.70, maxRounds: 10, rewards: [[{ label: "海戦勝利", payout: 200 }, 0.55], [{ label: "4陣営集結", payout: 400 }, 0.30], [{ label: "エンタープライズ参戦", payout: 800 }, 0.15]], endLabel: "アズールレーンRUSH終了" }, upperChallenge: "天城バトル", upperChance: 0.28, upperSuccess: 0.54, upperLabel: "異次元性能SS RUSH", upperContinue: 0.72, upperPayout: 720, upperPureIncrease: 5.1, settingRates: { 1: { trigger: 167.4, main: 598.9, payout: 0.979 }, 2: { trigger: 166.5, main: 589.5, payout: 0.986 }, 3: { trigger: 164.3, main: 564.2, payout: 1.007 }, 4: { trigger: 161.3, main: 527.1, payout: 1.053 }, 5: { trigger: 158.9, main: 496.4, payout: 1.106 }, 6: { trigger: 156.0, main: 467.5, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別ボーナス・AT初当りを反映", paragraphs: ["設定1〜6を均等抽選し、設定ごとの海戦BONUS・アズールレーンRUSH初当り・出玉率を使用します。", "設定5のAT初当りは約1/496.4として反映し、設定は結果画面と機種別ランキングに残ります。"] },
      { heading: "上位ルートは共通条件", bullets: ["設定1はBONUS約1/167.4・AT約1/598.9", "設定6はBONUS約1/156.0・AT約1/467.5", "4陣営集結と天城バトルは簡易抽選", "46枚貸し・5.2枚交換で収支を表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10312"], ["一撃 オンライン遊技説明", "https://1geki.jp/slot/l_azurlane/39/"]]
  },
  "sao-alicization-yozora": {
    order: 11, type: "pachinko", theme: "violet", year: "2026年8月", maker: "京楽",
    name: "e ソードアート・オンライン アリシゼーション 夜空", shortName: "SAO アリシゼーション 夜空",
    image: "assets/machines/sao-alicization-yozora-key-visual.jpg",
    imageAlt: "e ソードアート・オンライン アリシゼーション 夜空のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10492",
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
    image: "assets/machines/gundam-seed-climax-key-visual.jpg",
    imageAlt: "eフィーバー機動戦士ガンダムSEED クライマックスのキービジュアル",
    imageCredit: "ぱち7 機種解析",
    imageSource: "https://pachiseven.jp/articles/detail/26157",
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
    image: "assets/machines/tokyo-ghoul-slot-key-visual.jpg",
    imageAlt: "L 東京喰種のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10207",
    catchcopy: "レミニセンスを突破し、有馬貴将JUDGEMENTへ。",
    intro: "全国の大型ホールで主力設置される人気スマスロ。CZからAT『東京喰種咬』、BITESや特化ゾーンを経て上位CZを目指す流れを簡易体験できます。",
    points: ["設定1のCZ約1/262.6、AT初当り約1/394.4", "約31G/50枚・コイン単価約4.1円", "上位CZ『有馬貴将JUDGEMENT』成功期待度約61%"],
    specs: [["CZ（設定1）", "約1/262.6"], ["AT初当り（設定1）", "約1/394.4"], ["ベース", "約31G/50枚"], ["コイン単価", "約4.1円"], ["AT純増", "約4.0枚/G"], ["上位CZ期待度", "約61%"]],
    sim: { kind: "slot", triggerLabel: "レミニセンス", triggerRate: 262.6, triggerSuccess: 0.666, mainLabel: "東京喰種咬", mainRate: 394.4, base50: 31, coinUnit: 4.1, normalMin: 150, normalMax: 150, atPureIncrease: 4.0, specialLabel: "BITES", specialChance: 0.36, specialMin: 200, specialMax: 1200, specialDisplay: "coins", cycleFlow: { phase: "TOKYO GHOUL BATTLE", label: "東京喰種咬", statLabel: "喰種バトル", games: 30, continueChance: 0.72, maxRounds: 10, rewards: [[{ label: "BITES 1段階", payout: 150 }, 0.55], [{ label: "BITES 2段階", payout: 300 }, 0.30], [{ label: "BITES 3段階", payout: 450 }, 0.15]], endLabel: "東京喰種咬終了" }, upperChallenge: "有馬貴将JUDGEMENT", upperChance: 0.22, upperSuccess: 0.61, upperLabel: "CCGの死神", upperContinue: 0.76, upperPayout: 520, upperPureIncrease: 4.0, settingRates: { 1: { trigger: 262.6, main: 394.4, payout: 0.975 }, 2: { trigger: 255.6, main: 380.5, payout: 0.990 }, 3: { trigger: 246.5, main: 357.0, payout: 1.016 }, 4: { trigger: 233.1, main: 325.9, payout: 1.056 }, 5: { trigger: 216.4, main: 291.2, payout: 1.103 }, 6: { trigger: 203.7, main: 261.3, payout: 1.149 } } },
    articleSections: [
      { heading: "CZ・AT・上位CZを段階で見る", paragraphs: ["通常時からCZ、AT『東京喰種咬』、特化ゾーン、上位CZへ進む段階型のゲームフローです。ICHIGEKIでは、その中からレミニセンス、BITES、有馬貴将JUDGEMENT、CCGの死神を一つの結果にまとめています。", "公式サイトが示す全ての内部状態や演出を再現するものではなく、上位到達までの難しさと獲得枚数の振れ幅を体験する簡易モデルです。"] },
      { heading: "設定1〜6の公開値と平均G", paragraphs: ["設定1〜6で公開されているCZ・AT初当りを個別に登録しています。START時に抽選された設定の数値を使い、設定1ならCZ約1/262.6・AT約1/394.4、設定6ならCZ約1/203.7・AT約1/261.3として計算します。", "機種別固定値31G/50枚から平均投資を計算します。コイン単価4.1円は現金投資額そのものではなく、吸い込みと出玉の振れやすさを見る別の指標です。"] },
      { heading: "シミュレーターで見るポイント", bullets: ["平均Gより早い当りと深いハマりの両方を複数回確認する", "BITESの上乗せと上位CZ成功時の伸びを通常結果と比べる", "19,000枚へ達した結果はコンプリートとして打ち切り表示する", "結果投稿と口コミ・収支投稿を分けて記録する"] }
    ],
    sources: [["L 東京喰種 公式サイト", "https://www.slot-l-tokyoghoul.jp/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10207"], ["パチンコビレッジ 機種概要", "https://cs62.cs-plaza.com/g/pachi/pla/s_conq/nanashow_slot/16/kh01.php"]]
  },
  "valvrave2": {
    order: 14, type: "slot", theme: "magenta", year: "2025年11月", maker: "SANKYO", updated: "2026-11-06",
    name: "Lパチスロ 革命機ヴァルヴレイヴ2", shortName: "スマスロ ヴヴヴ2",
    image: "assets/machines/valvrave2-key-visual.jpg",
    imageAlt: "Lパチスロ 革命機ヴァルヴレイヴ2のキービジュアル",
    imageCredit: "P-WORLD 設定別スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10352",
    catchcopy: "3つの初当りルートから、3セット継続で超革命RUSHへ。",
    intro: "高純増ATと高継続の上位ATを搭載した大型ホールの主力機。革命RUSH直撃・革命BONUS・決戦BONUSからRUSHを目指し、3セット継続で超革命RUSHへ昇格します。",
    points: ["初当り合算は約1/476〜1/456", "革命RUSH直撃・革命BONUS・決戦BONUSの代表3ルート", "革命RUSH約75%、超革命RUSH最大約90%継続"],
    specs: [["初当り合算", "約1/476〜1/456"], ["初当りルート", "代表比率1:1:1"], ["決戦BONUS AT期待度", "約46%"], ["ベース", "約32.7G/50枚"], ["コイン単価", "約4.2円"], ["AT純増", "約9.0枚/G"], ["超革命RUSH", "最大約90%継続"]],
    sim: { kind: "slot", rankingVersion: "v5", triggerLabel: "初当り", triggerRate: 476, triggerSuccess: 1, mainLabel: "革命RUSH", mainRate: 476, mainRateLabel: "初当り合算", base50: 32.7, coinUnit: 4.2, normalMin: 300, normalMax: 1350, entryBonusAwards: [[{ label: "革命RUSH直撃", payout: 0, games: 1, atChance: 1, directEntry: true }, 0.3334], [{ label: "革命BONUS", payout: 470, payoutOnMiss: [250, 450], payoutOnEntry: [666, 720], atChance: 0.50 }, 0.3333], [{ label: "決戦BONUS", payout: 110, games: 15, atChance: 0.46 }, 0.3333]], entryBonusAwardsNote: "初当り3ルートは代表比率1:1:1。革命BONUSは払い出し666枚到達時にRUSH、決戦BONUSは公式AT期待度約46%で判定し、非公表の革命BONUS成功率と成功・失敗別出玉は比較用モデル", specialLabel: "革命の剣", specialChance: 0.31, specialMin: 180, specialMax: 1000, upperChallenge: "ハラキリチャレンジ3回成功", upperChance: 0, upperSuccess: 1, upperAfterSuccesses: 3, upperLabel: "超革命RUSH", upperContinue: 0.90, upperPayout: 650, setPushFlow: true, atPureIncrease: 9.0, atPayoutVariance: 0.16, mainSetContinue: 0.75, rushSetGames: [[10, 0.58], [20, 0.27], [50, 0.10], [100, 0.05]], upperSetGames: [[10, 0.50], [20, 0.25], [50, 0.15], [100, 0.10]], settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 476, main: 476, entry: 1, payout: 0.977 }, 2: { trigger: 473, main: 473, entry: 1, payout: 0.993 }, 4: { trigger: 464, main: 464, entry: 1, payout: 1.047 }, 5: { trigger: 459, main: 459, entry: 1, payout: 1.108 }, 6: { trigger: 456, main: 456, entry: 1, payout: 1.149 } } },
    articleSections: [
      { heading: "実機どおり設定1・2・4・5・6を抽選", paragraphs: ["設定3を除く5段階から均等抽選します。CZは全設定約1/324、初当り合算は設定1約1/476、設定2約1/473、設定4約1/464、設定5約1/459、設定6約1/456です。", "設定別の初当り差は小さい一方、出玉率は97.7%〜114.9%と大きく異なります。結果とランキングには抽選設定を表示します。"] },
      { heading: "3つの初当りから超革命RUSHまで", paragraphs: ["初当りは革命RUSH直撃・革命BONUS・決戦BONUSの代表3ルートに分け、ボーナス後のRUSH当落と獲得枚数を別々に表示します。シミュレーターは各セットでPUSHし、3セット継続で4セット目から超革命RUSHへ移行します。", "革命BONUSの非公表成功率・成功失敗別出玉は比較用モデルです。決戦BONUSは公式AT期待度約46%、32.7G/50枚・46枚貸し・5.2枚交換の固定条件で投資と収支を計算します。"] },
      { heading: "遊び方のポイント", bullets: ["設定別の初当りGと収支を比較する", "革命の剣の上乗せ幅を見る", "3連突破から超革命RUSHを狙う", "実機と同じ5段階設定だけがランキングに残る"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/ssp/spec/"], ["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/10352"], ["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/1040/31856/"]]
  },
  "kabaneri-unato": {
    order: 15, type: "slot", theme: "ember", year: "2026年3月", maker: "サミー",
    name: "スマスロ 甲鉄城のカバネリ 海門決戦", shortName: "カバネリ 海門決戦",
    image: "assets/machines/kabaneri-unato-key-visual.jpg",
    imageAlt: "スマスロ 甲鉄城のカバネリ 海門決戦のキービジュアル",
    imageCredit: "フリック7 基本情報",
    imageSource: "https://flick7.net/slot/kabaneri_unato/tenjo/",
    catchcopy: "ボーナスからST、海門回想の先に裏・景之ST。",
    intro: "全国5,000店舗以上に設置されるカバネリのスマスロ後継機。初当りボーナスからSTを目指し、カバネリアタックと上位ルートを簡易抽選します。",
    points: ["設定1のボーナス初当り約1/254.2、ST約1/422.5", "約31.4G/50枚・コイン単価約3.1円", "AT純増約6.0枚/G、ST継続約76%"],
    specs: [["ボーナス初当り（設定1）", "約1/254.2"], ["ST初当り（設定1）", "約1/422.5"], ["ベース", "約31.4G/50枚"], ["コイン単価", "約3.1円"], ["AT純増", "約6.0枚/G"], ["ST継続", "約76%"]],
    sim: { kind: "slot", triggerLabel: "初当りボーナス", triggerRate: 254.2, triggerSuccess: 0.602, mainLabel: "カバネリST", mainRate: 422.5, base50: 31.4, coinUnit: 3.1, normalMin: 250, normalMax: 1100, atPureIncrease: 6.0, specialLabel: "カバネリアタック", specialChance: 0.38, specialMin: 180, specialMax: 900, upperChallenge: "海門回想", upperChance: 0.20, upperSuccess: 0.50, upperLabel: "裏・景之ST", upperContinue: 0.88, upperPayout: 520, kabaneriStFlow: true, kabaneriStGames: 25, kabaneriStContinue: 0.76, kabaneriBonusAwards: [[{ label: "カバネリBONUS", payout: 200 }, 0.45], [{ label: "カバネリBONUS", payout: 300 }, 0.30], [{ label: "カバネリアタック", payout: 400 }, 0.15], [{ label: "EPISODE BONUS", payout: 300, episode: true }, 0.10]], kabaneriMumeiChance: 0.20, kabaneriUraChance: 0.25, kabaneriUpperNormalLabel: "景之ST", kabaneriUpperRareLabel: "裏・景之ST", kabaneriUpperNormalContinue: 0.82, kabaneriUpperRareContinue: 0.88, kabaneriUpperGames: 30, settingRates: { 1: { trigger: 254.2, main: 422.5, payout: 0.975 }, 2: { trigger: 242.3, main: 405.9, payout: 0.985 }, 3: { trigger: 239.6, main: 398.7, payout: 1.008 }, 4: { trigger: 214.0, main: 357.2, payout: 1.060 }, 5: { trigger: 203.2, main: 332.6, payout: 1.110 }, 6: { trigger: 195.1, main: 318.5, payout: 1.149 } } },
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
    image: "assets/machines/tokyo-ghoul-e-key-visual.jpg",
    imageAlt: "e 東京喰種のキービジュアル",
    imageCredit: "ビスティ",
    imageSource: "https://pachi-e-tokyoghoul.jp/",
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
    image: "assets/machines/eva17-hajimari-key-visual.jpg",
    imageAlt: "e 新世紀エヴァンゲリオン ～はじまりの記憶～のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10353",
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
    image: "assets/machines/garo12-gokugen-key-visual.jpg",
    imageAlt: "e牙狼12黄金騎士極限のキービジュアル",
    imageCredit: "サンセイR&D 公式機種情報",
    imageSource: "https://www.sansei-rd.co.jp/p_garo_archive/archive/p_garo12_ok.html",
    catchcopy: "極限7500バトルを制し、魔戒CHANCE LTへ。",
    intro: "大出玉ルートに特化し、大型ホールで主力設置されるスマパチ。液晶図柄揃い、極限7500バトル、上位LTの二段階突破を簡易再現します。",
    points: ["大当り約1/349.9、液晶図柄揃い約1/437.4", "図柄揃いの約50%で極限7500バトル", "バトル突破約50%、魔戒CHANCE LT継続約76%"],
    specs: [["大当り確率", "約1/349.9"], ["液晶図柄揃い", "約1/437.4"], ["極限7500バトル", "突入約50%"], ["LT突入", "バトルの約50%"], ["LT継続", "約76%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 437.4, hitLabel: "液晶図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.2, minSpins: 10, maxSpins: 30, rushLabel: "極限7500バトル", rushEntry: 0.50, rushContinue: 0, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.75], [7500, 0.25]], upperLabel: "魔戒CHANCE LT", upperDirectChance: 0.50, upperUpgradeChance: 0, upperContinue: 0.76, upperEntryPayout: 7500 },
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10305"], ["牙狼公式アーカイブ", "https://www.sansei-rd.com/p_garo_archive/archive/p_garo12_ok.html"]]
  },
  "karakuri-circus": {
    order: 19, type: "slot", theme: "crimson", year: "2023年7月", maker: "SANKYO", updated: "2026-11-06",
    name: "パチスロ からくりサーカス", shortName: "からくりサーカス",
    image: "assets/machines/karakuri-circus-key-visual.jpg",
    imageAlt: "パチスロ からくりサーカスのキービジュアル",
    imageCredit: "P-WORLD 設定別スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/9843",
    catchcopy: "運命の一劇を越え、超からくりサーカスへ。",
    intro: "CZから基本ATへ進み、激情ジャッジと運命の一劇を経て上位ATを目指す人気スマスロ。段階ごとの突破と獲得枚数の振れ幅を簡易体験できます。",
    points: ["激情ジャッジ成功期待度約50%・成功で100〜300枚上乗せ", "3回成功後の『運命の一劇』期待度約50%", "4回目以降の『運命連鎖』期待度約56%"],
    specs: [["CZ初当り（設定1）", "約1/333"], ["AT初当り（設定1）", "約1/564"], ["ベース", "約32.9G/50枚"], ["通常AT純増", "約2.8枚/G"], ["激情ジャッジ", "成功期待度約50%"], ["運命の一劇", "成功期待度約50%"], ["運命連鎖", "成功期待度約56%"], ["上位AT純増", "約7.6枚/G"]],
    sim: { kind: "slot", rankingVersion: "v4", triggerLabel: "機械仕掛けの神", triggerRate: 333, triggerSuccess: 0.55, mainLabel: "からくりサーカス", mainRate: 564, base50: 32.9, coinUnit: 4.1, normalMin: 150, normalMax: 150, atPureIncrease: 2.8, specialLabel: "激情ジャッジ", specialChance: 0.50, specialMin: 100, specialMax: 300, upperChallenge: "運命の一劇", upperChance: 0.28, upperSuccess: 0.50, upperLabel: "超からくりサーカス", upperContinue: 0.50, upperPayout: 850, upperPureIncrease: 7.6, upperSetGames: [[112, 1]], karakuriJudgeFlow: true, karakuriJudgeAttempts: [[3, 0.25], [4, 0.45], [5, 0.30]], karakuriJudgeSuccess: 0.50, karakuriJudgeAwards: [[100, 0.60], [200, 0.30], [300, 0.10]], fateSuccess: 0.50, chainSuccess: 0.56, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 333, main: 564, payout: 0.975 }, 2: { trigger: 320, main: 543, payout: 0.987 }, 4: { trigger: 292, main: 469, payout: 1.030 }, 5: { trigger: 277, main: 451, payout: 1.081 }, 6: { trigger: 275, main: 447, payout: 1.149 } } },
    articleSections: [
      { heading: "基本ATから上位ATまでの流れ", paragraphs: ["通常時はレア役や規定ゲーム数などからCZ・ATを目指し、基本AT『からくりサーカス』では4Gの激情ジャッジ成功を重ねて上位ルートへ進みます。シミュレーターでは激情ジャッジごとにPUSHで成功・失敗を表示し、成功時は100・200・300枚の簡易振り分けを開きます。", "激情ジャッジを3回以上成功した状態でATが終了すると『運命の一劇』へ進み、PUSHで約50%の当落を表示します。4回目の成功時は『運命連鎖』へ進み、約56%の上位AT抽選を別のPUSHで表示します。"] },
      { heading: "実機の設定1・2・4・5・6で抽選", paragraphs: ["実機に搭載される通常設定は1・2・4・5・6です。シミュレーターもこの5段階から均等抽選し、設定3は抽選しません。公開されているCZ・AT初当りを設定ごとに使用します。", "設定1はCZ約1/333・AT約1/564、設定6はCZ約1/275・AT約1/447です。50枚ベース32.9Gから投資目安を計算します。"] },
      { heading: "上位ATとコンプリート表示", paragraphs: ["基本ATは純増約2.8枚/G、上位ATは純増約7.6枚/Gという速度差が見どころです。簡易シミュレーションでは上位到達後のセット継続を獲得枚数へ置き換えて表現します。"], bullets: ["3回成功後の運命の一劇は約50%で抽選", "4回目成功時の運命連鎖は約56%で抽選", "成功時は極限無双を経由して超からくりサーカスへ進む", "上位AT終了後の実機の全ての引き戻し抽選は再現しない", "獲得19,000枚へ達した場合はコンプリートとして結果を打ち切る"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/9843"], ["SANKYOオンライン博物館", "https://www.sankyo-fever.jp/collection/946/"], ["SANKYO 基本情報PDF", "https://www.sankyo-fever.jp/products/assets/pdf/spx/spx_mp.pdf"], ["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4360"]]
  },
  "monkey-turn-v": {
    order: 20, type: "slot", theme: "aqua", year: "2023", maker: "山佐", updated: "2026-11-06",
    name: "スマスロ モンキーターンV", shortName: "モンキーターンV",
    image: "assets/machines/monkey-turn-v-key-visual.jpg",
    imageAlt: "スマスロ モンキーターンVのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9923",
    catchcopy: "SG RUSHからグランドスラム、その先の青島SGへ。",
    intro: "周期・CZ・シナリオ管理ATを組み合わせたロングヒット機。比較的マイルドなコイン単価と、上位到達時の伸びを両方体験できます。",
    points: ["設定1のAT初当りは約1/299.8", "CZ『超抜チャレンジ』を搭載", "上位AT『青島SG』はループ率約83%（Vストック込み）"],
    specs: [["AT初当り（設定1）", "約1/299.8"], ["ベース", "約32.0G/50枚"], ["コイン単価", "約3.1円"], ["SG RUSH純増", "約2.5枚/G"], ["青島SG純増", "約4.0枚/G"], ["青島SGループ", "約83%"]],
    sim: { kind: "slot", rankingVersion: "v4", triggerLabel: "SG RUSH", triggerRate: 299.8, triggerSuccess: 1, mainLabel: "SG RUSH", mainRate: 299.8, base50: 32, coinUnit: 3.1, normalMin: 280, normalMax: 1050, atPureIncrease: 2.5, specialLabel: "全速モード", specialChance: 0.20, specialMin: 25, specialMax: 75, upperChallenge: "青島VS波多野", upperChance: 0, upperSuccess: 0.83, upperLabel: "青島SG", upperContinue: 0.83, upperPayout: 160, upperPureIncrease: 4.0, sgRaceFlow: true, sgSetGames: 40, sgScenarios: [[{ label: "波多野・バランス", rates: [0.62, 0.68, 0.72, 0.76, 0.68, 0.76, 0.84] }, 0.55], [{ label: "ライバル・後半型", rates: [0.52, 0.58, 0.64, 0.72, 0.78, 0.86, 0.92] }, 0.30], [{ label: "艇王・高継続型", rates: [0.78, 0.82, 0.86, 0.88, 0.90, 0.92, 0.95] }, 0.15]], settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 299.8, main: 299.8, entry: 1, payout: 0.979 }, 2: { trigger: 295.5, main: 295.5, entry: 1, payout: 0.989 }, 4: { trigger: 258.8, main: 258.8, entry: 1, payout: 1.045 }, 5: { trigger: 235.7, main: 235.7, entry: 1, payout: 1.102 }, 6: { trigger: 222.9, main: 222.9, entry: 1, payout: 1.149 } } },
    articleSections: [
      { heading: "実機の設定1・2・4・5・6を使用", paragraphs: ["モンキーターンVの通常設定は1・2・4・5・6です。START時はこの5段階から均等抽選し、公開されているAT初当りをそのまま使います。設定3と設定Lは抽選対象にしません。", "AT初当りは設定1約1/299.8、設定2約1/295.5、設定4約1/258.8、設定5約1/235.7、設定6約1/222.9です。"] },
      { heading: "SG RUSHから青島SGまで", paragraphs: ["通常時の周期・CZを一つのAT初当り抽選へまとめ、SG RUSH、全速モード、青島VS波多野、青島SGの流れを体験用に簡略化しています。", "上位到達率や特化ゾーンは設定別の非公表値を推測せず、全設定で同じ固定条件を使います。"] }
    ],
    sources: [["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4450"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9923"]]
  },
  "eva15": {
    order: 21, type: "pachinko", theme: "violet", year: "2021", maker: "ビスティ",
    name: "新世紀エヴァンゲリオン～未来への咆哮～", shortName: "エヴァ15",
    image: "assets/machines/eva15-key-visual.jpg",
    imageAlt: "新世紀エヴァンゲリオン～未来への咆哮～のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9509",
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
    image: "assets/machines/rezero-onigakari-key-visual.jpg",
    imageAlt: "P Re:ゼロから始める異世界生活 鬼がかりver.の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9537",
    catchcopy: "初当り3000個から始まる、鬼がかりRUSH。",
    intro: "3000発スタートと高速STで支持された人気機。通常回転率に応じた平均投資と、144回転RUSHの結果を試せます。",
    points: ["通常時大当り約1/319.6", "RUSH突入約55%", "ST144回、継続約77%"],
    specs: [["大当り確率", "約1/319.6"], ["RUSH中", "約1/99.9"], ["ST回数", "144回"], ["RUSH突入", "約55%"], ["RUSH継続", "約77%"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "鬼がかりRUSH", rushEntry: 0.55, rushContinue: 0.77, firstPayoutIn: 3000, firstPayoutOut: 1500, rushPayouts: [[300, 0.20], [1500, 0.55], [3000, 0.25]] },
    sources: [["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4046"], ["アタリ7 スペック", "https://www.atari7.com/pachinko/onirezero.php"]]
  },
  "kabaneri": {
    order: 23, type: "slot", theme: "ember", year: "2022", maker: "サミー", updated: "2026-11-06",
    name: "パチスロ甲鉄城のカバネリ", shortName: "甲鉄城のカバネリ",
    image: "assets/machines/kabaneri-key-visual.jpg",
    imageAlt: "パチスロ甲鉄城のカバネリのキービジュアル",
    imageCredit: "パチナビ 設定別初当り",
    imageSource: "https://pachinavi.net/machines/rev-kabaneri/",
    catchcopy: "3つのチャンス目からCZ、そしてカバネリオブジアイアンフォートレスへ。",
    intro: "6.5号機を代表するSTタイプ。ボーナスからST、無名回想を経由した上位STまでの流れを簡易抽選します。",
    points: ["通常STは25G＋α・継続期待度約75%", "ST初当り（設定1）約1/407.9", "美馬STは30G＋α・約80%、裏美馬STは約95%"],
    specs: [["ボーナス初当り（設定1）", "約1/237.0"], ["ST初当り（設定1）", "約1/407.9"], ["ベース", "約33.0G/50枚"], ["コイン単価", "約2.8円"], ["通常ST", "25G＋α・継続約75%"], ["美馬ST", "30G＋α・継続約80%"], ["裏美馬ST", "30G＋α・継続約95%"], ["ST中ボーナス", "200〜1000枚の払出"]],
    initialHitLabel: "駿城BONUS／EPISODE BONUS",
    sim: { kind: "slot", rankingVersion: "v4", triggerLabel: "初当りボーナス", triggerRate: 237.0, triggerSuccess: 1, mainLabel: "カバネリST", mainRate: 407.9, mainRateLabel: "ST初当り", base50: 33, coinUnit: 2.8, normalMin: 0, normalMax: 0, entryBonusAwards: [[{ label: "駿城BONUS", payout: 56, games: 20, atChance: 0.162 }, 0.50], [{ label: "EPISODE BONUS", payout: 150, games: 25, atChance: 1 }, 0.50]], entryBonusAwardsNote: "通常時ボーナス比率は代表値1:1。EPISODE BONUSはST突入、駿城BONUSは設定1のボーナス・ST初当り比率から算出した代表突破率約16.2%で判定", atPureIncrease: 2.8, specialLabel: "無名回想", specialChance: 0.10, specialMin: 0, specialMax: 0, upperChallenge: "無名回想", upperChance: 0, upperSuccess: 1, upperLabel: "美馬ST／裏美馬ST", upperContinue: 0.80, upperPayout: 0, upperPureIncrease: 6.0, kabaneriStFlow: true, kabaneriStGames: 25, kabaneriStContinue: 0.75, kabaneriBonusAwards: [[{ label: "カバネリBONUS", payout: 200 }, 0.42], [{ label: "カバネリBONUS", payout: 300 }, 0.28], [{ label: "カバネリBONUS", payout: 400 }, 0.12], [{ label: "カバネリBONUS", payout: 500 }, 0.08], [{ label: "カバネリBONUS", payout: 1000 }, 0.02], [{ label: "EPISODE BONUS", payout: 210, episode: true }, 0.08]], kabaneriMumeiChance: 0.10, kabaneriUraChance: 0.20, settingRates: { 1: { trigger: 237.0, main: 407.9, entry: 1, payout: 0.978 }, 2: { trigger: 230.7, main: 393.2, entry: 1, payout: 0.988 }, 3: { trigger: 214.0, main: 372.4, entry: 1, payout: 1.007 }, 4: { trigger: 186.5, main: 327.2, entry: 1, payout: 1.059 }, 5: { trigger: 171.3, main: 307.3, entry: 1, payout: 1.084 }, 6: { trigger: 151.3, main: 290.6, entry: 1, payout: 1.100 } } },
    articleSections: [
      { heading: "ボーナス初当りとST初当りを分けて見る", paragraphs: ["ボーナス合算約1/157.1は複数の当選を含む合算値です。シミュレーターの最初の契機には、設定1のボーナス初当り約1/237.0を使用し、ST初当り約1/407.9とは分けて抽選します。", "設定1〜6で公開されているボーナス初当り・ST初当りを個別に登録し、START時にランダム抽選された設定の数値を使います。"] },
      { heading: "25GのSTとボーナス再セット", paragraphs: ["STは25G＋αを1区間として、ボーナス当選なら25Gへ再セット、非当選なら終了します。継続期待度約75%を1区間ごとの代表抽選として使い、PUSHでボーナス当選・駆け抜けを確認できます。", "ST中のボーナスはカバネリBONUSの200〜1000枚とEPISODE BONUSを代表振り分けで抽選し、獲得枚数をその都度合算します。"] },
      { heading: "美馬STと裏美馬ST", paragraphs: ["ST中のEPISODE BONUSの一部から無名回想へ進み、美馬STまたは裏美馬STを判定します。美馬STは30G＋α・継続期待度約80%、裏美馬STは30G＋α・継続期待度約95%として別々に進行します。", "無名回想の発生率と裏美馬への振り分けは全条件が公表されていないため、サイト内で明示する比較用の代表値です。"] },
      { heading: "固定レートと結果の見方", paragraphs: ["50枚あたり33.0G、1,000円46枚貸し、5.2枚交換を固定条件として投資・収支目安を計算します。", "結果には通常STのボーナス回数、上位STの種類と連数、総獲得枚数を分けて表示します。チャンス目・高確ランプ・六根魂など全内部抽選は簡略化しています。"] }
    ],
    sources: [["DMMぱちタウン 機種情報", "https://p-town.dmm.com/machines/4160"], ["パチナビ 設定別初当り", "https://pachinavi.net/machines/rev-kabaneri/"], ["セガサミー決算資料", "https://www.segasammy.co.jp/cms/wp-content/uploads/pdf/ja/ir/20242029_q3_presentation_j-1.pdf"]]
  },
  "smart-hokuto": {
    order: 24, type: "slot", theme: "gold", year: "2023", maker: "サミー", updated: "2026-11-06",
    name: "スマスロ北斗の拳", shortName: "スマスロ北斗の拳",
    image: "assets/machines/smart-hokuto-key-visual.jpg",
    imageAlt: "スマスロ北斗の拳のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9786",
    catchcopy: "バトルボーナスを継続し、無想転生バトルへ。",
    intro: "初代のゲーム性をスマスロで再構築した定番機。ATまでの平均ゲーム数と投資、無想転生チャンス突破を体験できます。",
    points: ["AT初当り（設定1）約1/383.4", "バトルボーナスは継続率管理", "無想転生バトルは継続率約94%"],
    specs: [["AT初当り（設定1）", "約1/383.4"], ["ベース", "約34.7G/50枚"], ["コイン単価", "約3.3円"], ["AT純増", "約4.1枚/G"], ["通常AT", "継続率管理"], ["無想転生", "継続約94%"]],
    sim: { kind: "slot", rankingVersion: "v4", triggerLabel: "バトルボーナス", triggerRate: 383.4, triggerSuccess: 1, mainLabel: "バトルボーナス", mainRate: 383.4, base50: 34.7, coinUnit: 3.3, normalMin: 220, normalMax: 1100, atPureIncrease: 4.1, specialLabel: "トキ共闘", specialChance: 0.28, specialMin: 180, specialMax: 700, upperChallenge: "無想転生チャンス", upperChance: 0.14, upperSuccess: 0.46, upperLabel: "無想転生バトル", upperContinue: 0.94, upperPayout: 125, upperPureIncrease: 4.1, battleBonusFlow: true, battleSetGames: 38, battleAwardGames: 30, battleUpperChancePerSet: 0.035, battleContinueRates: [[0.66, 0.60], [0.79, 0.25], [0.84, 0.10], [0.89, 0.05]], settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 383.4, main: 383.4, entry: 1, payout: 0.980 }, 2: { trigger: 370.5, main: 370.5, entry: 1, payout: 0.989 }, 4: { trigger: 297.8, main: 297.8, entry: 1, payout: 1.057 }, 5: { trigger: 258.7, main: 258.7, entry: 1, payout: 1.100 }, 6: { trigger: 235.1, main: 235.1, entry: 1, payout: 1.130 } } },
    articleSections: [
      { heading: "バトルボーナスを軸にしたゲーム性", paragraphs: ["設定1のAT初当りは約1/383.4。初代北斗を意識した継続率管理のバトルボーナスを重ね、無想転生チャンスから上位状態を目指します。", "ICHIGEKIでは通常時の全モード、天井、内部状態、レア役抽選を省略し、初当りG、通常ATの獲得枚数、無想転生チャンス、上位継続を一つの結果にまとめます。"] },
      { heading: "設定1・2・4・5・6の公開値", paragraphs: ["実機に搭載される通常設定は1・2・4・5・6です。設定3と設定Lは抽選対象にせず、この5段階から均等に選びます。BB初当りは設定1約1/383.4から設定6約1/235.1まで、公開設定別値を使います。", "50枚ベース34.7Gから投資目安を計算します。コイン単価3.3円は投資計算に使わず、結果の荒さを見る補助指標として表示します。"] },
      { heading: "無想転生とコンプリート", paragraphs: ["上位状態は継続約94%として簡易抽選します。94%でも終了抽選は毎セット発生するため、短く終わる結果と大きく伸びる結果の両方があります。"], bullets: ["上位到達前と到達後の獲得枚数を抽選履歴で確認", "複数回試して継続率のばらつきを比較", "獲得19,000枚へ達した場合はコンプリートとして打ち切り表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9786"], ["サミー 機種情報", "https://www.sammy.co.jp/japanese/product/pachislot/sp_hok_ke/EN.html"]]
  },
  "valvrave": {
    order: 25, type: "slot", theme: "magenta", year: "2022", maker: "SANKYO", updated: "2026-11-06",
    name: "パチスロ 革命機ヴァルヴレイヴ", shortName: "革命機ヴァルヴレイヴ",
    image: "assets/machines/valvrave-key-visual.jpg",
    imageAlt: "パチスロ 革命機ヴァルヴレイヴのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9725",
    catchcopy: "革命RUSHを突破し、超革命RUSHへ。",
    intro: "スマスロ初期を代表する高コイン単価機。通常RUSHから超革命RUSH、ハラキリDRIVEまでの荒さを簡易再現します。",
    points: ["設定1のCZ約1/277、ボーナス初当り約1/519", "コイン単価約4.5円の高波機", "超革命RUSHは継続約90%"],
    specs: [["CZ（設定1）", "約1/277"], ["ボーナス初当り（設定1）", "約1/519"], ["革命BONUS", "平均約470枚"], ["決戦BONUS", "平均約110枚"], ["革命BONUS AT期待度", "約55%"], ["決戦BONUS AT期待度", "約35%"], ["ベース", "約31.0G/50枚"], ["コイン単価", "約4.5円"], ["AT純増", "約7.2枚/G"], ["RUSH 1セット", "10〜100G以上"], ["超革命RUSH継続", "約90%"]],
    initialHitLabel: "革命BONUS／決戦BONUS",
    sim: { kind: "slot", rankingVersion: "v4", triggerLabel: "CZ", triggerRate: 277, triggerSuccess: 0.534, mainLabel: "革命RUSH", mainRate: 519, base50: 31, coinUnit: 4.5, normalMin: 300, normalMax: 1500, entryBonusAwards: [[{ label: "革命BONUS", payout: 470, payoutOnMiss: [330, 390], payoutOnEntry: [530, 590], atChance: 0.55 }, 0.50], [{ label: "決戦BONUS", payout: 110, games: 15, atChance: 0.35 }, 0.50]], entryBonusAwardsNote: "ボーナス比率は設定1の代表値として1:1。革命BONUSは公表平均約470枚を保つよう、RUSH非突破330〜390枚・突破530〜590枚の実獲得目安で簡易抽選。成功・失敗別平均は非公表のため比較用モデル。通常革命RUSHの50G・100G合算は設定1約9.5%〜設定6約25.1%の実戦集計を使い、内訳非公表のため50G:100Gを3:1で配分", specialLabel: "ハラキリDRIVE", specialChance: 0.31, specialMin: 360, specialMax: 1800, upperChallenge: "ハラキリチャレンジ3回成功", upperChance: 0.4565, upperSuccess: 1, upperAfterSuccesses: 3, upperLabel: "超革命RUSH", upperContinue: 0.90, upperPayout: 540, setPushFlow: true, atPureIncrease: 7.2, atPayoutVariance: 0.16, mainSetContinue: 0.77, firstRushSetGames: [[20, 1]], rushSetGames: [[10, 0.68], [20, 0.23], [50, 0.07], [100, 0.02]], rushSetLongRateBySetting: { 1: 0.095, 2: 0.126, 3: 0.157, 4: 0.188, 5: 0.219, 6: 0.251 }, rushSet100Share: 0.25, rushSet20Share: 0.25, upperSetGames: [[10, 0.50], [20, 0.25], [50, 0.10], [100, 0.15]], settingRates: { 1: { trigger: 277, main: 519 }, 2: { trigger: 275, main: 516 }, 3: { trigger: 274, main: 514 }, 4: { trigger: 269, main: 507 }, 5: { trigger: 264, main: 499 }, 6: { trigger: 258, main: 490 } } },
    articleSections: [
      { heading: "設定別のCZ・初当りを使用", paragraphs: ["設定1〜6で公開されているCZとボーナス初当りを個別に登録しています。START時に抽選された設定のCZ確率を初当りGへ、CZとボーナス初当りの比率を突破抽選へ使用します。", "設定1はCZ約1/277・ボーナス初当り約1/519、設定6はCZ約1/258・ボーナス初当り約1/490です。"] },
      { heading: "BIG・REGではなく2種類のボーナス", paragraphs: ["通常時の当選にAタイプのBIG・REGという区分はありません。CZなどを経由して革命BONUSまたは決戦BONUSに当選し、革命RUSH突入を目指します。革命RUSHへ入った後はセット継続で超革命RUSHを狙います。", "革命BONUSは50G＋αを消化し、払い出し666枚到達で革命RUSH濃厚となるため、突破時と非突破時で獲得枚数が変わります。シミュレーターでは公表平均約470枚とRUSH期待度約55%を保つよう、非突破時330〜390枚・突破時530〜590枚の実獲得目安で抽選します。成功・失敗別の平均値は公表されていないため、この範囲は比較用の簡易モデルです。", "決戦BONUSは平均約110枚・RUSH期待度約35%として別抽選します。ボーナス獲得枚数を先に収支へ加え、RUSHへ入った場合はその後の獲得枚数を合算します。ボーナス種別の比率は設定1の代表値として1:1で、実機にある設定差までは再現していません。", "通常の革命RUSHは初回を基本20Gとし、2セット目以降の50G・100G合算を設定1約9.5%〜設定6約25.1%で変化させます。個別の内訳は非公表のため、長いセットに当選した場合は50Gを75%・100Gを25%とする比較用モデルです。", "革命RUSHは各セット終了後のハラキリチャレンジを約77%で抽選し、3回成功すると4セット目から超革命RUSHへ移行します。3回成功後に別の上位抽選は行いません。"], bullets: ["革命BONUS非突破は330〜390枚の実獲得目安", "革命BONUS突破は530〜590枚の実獲得目安", "通常革命RUSHの100Gは設定1約2.4%〜設定6約6.3%の比較用モデル", "決戦BONUSはベルナビ消化後・平均約110枚で革命RUSHを抽選", "ハラキリチャレンジ3回成功で4セット目から超革命RUSH", "RUSH非突入でもボーナス出玉を結果と収支へ加算", "全小役・内部モード・有利区間の詳細は簡略化"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9725"], ["SANKYOオンライン博物館", "https://www.sankyo-fever.jp/collection/936/"], ["でちゃう！解析特集", "https://www.dechau.com/news/single.php?id=9442"], ["SANKYO IR資料", "https://www.sankyo-fever.co.jp/corporate/modify/IR/Library_Briefing/files/explanation_20240807_ja.pdf"]]
  },
  "sengoku-otome4": {
    order: 26, type: "slot", theme: "sakura", year: "2023", maker: "オリンピアエステート", updated: "2026-11-06",
    name: "L戦国乙女4 戦乱に閃く炯眼の軍師", shortName: "戦国乙女4",
    image: "assets/machines/sengoku-otome4-key-visual.jpg",
    imageAlt: "L戦国乙女4 戦乱に閃く炯眼の軍師のキービジュアル",
    imageCredit: "オリンピアエステート",
    imageSource: "https://www.heiwanet.co.jp/products/pachislot/l-sg5/",
    catchcopy: "乙女アタックから強カワRUSH、真強カワRUSHへ。",
    intro: "ボーナス・CZ・AT・上位ATの段階が分かりやすい人気スマスロ。乙女アタックとオウガイバトルを簡易抽選します。",
    points: ["ボーナス＋直撃AT初当り（設定1）約1/272.7", "AT初当り（設定1）約1/429.2", "上位AT『真強カワRUSH』は純増約5.0枚/G"],
    specs: [["初当り（設定1）", "約1/272.7"], ["AT初当り（設定1）", "約1/429.2"], ["ベース", "約31.7G/50枚"], ["コイン単価", "約3.4円"], ["AT純増", "約2.5枚/G"], ["上位AT純増", "約5.0枚/G"]],
    sim: { kind: "slot", rankingVersion: "v4", triggerLabel: "ボーナス／直撃AT", triggerRate: 272.7, triggerSuccess: 0.635, mainLabel: "強カワRUSH", mainRate: 429.2, base50: 31.7, coinUnit: 3.4, normalMin: 0, normalMax: 0, atPureIncrease: 2.5, specialLabel: "神謀覚醒", specialChance: 0.08, specialMin: 0, specialMax: 0, upperChallenge: "ヨシテル出陣", upperChance: 0.08, upperSuccess: 1, upperLabel: "真強カワRUSH", upperContinue: 1, upperPayout: 0, upperPureIncrease: 5.0, otomeRushFlow: true, otomeBaseGames: 50, otomeAddOnChance: 0.42, otomeAddOnGames: [[10, 0.45], [20, 0.25], [30, 0.15], [50, 0.10], [100, 0.04], [200, 0.01]], otomeBonusChance: 0.28, otomeBonusGames: [[10, 0.50], [20, 0.25], [30, 0.15], [50, 0.10]], otomeAwakeningGames: 220, otomeBattleChanceBySetting: { 1: 0.249, 2: 0.263, 3: 0.276, 4: 0.291, 5: 0.305, 6: 0.317 }, settingRates: { 1: { trigger: 272.7, main: 429.2, payout: 0.982 }, 2: { trigger: 267.3, main: 417.8, payout: 0.990 }, 3: { trigger: 255.3, main: 393.6, payout: 1.012 }, 4: { trigger: 238.2, main: 361.3, payout: 1.052 }, 5: { trigger: 223.2, main: 334.1, payout: 1.102 }, 6: { trigger: 217.1, main: 319.2, payout: 1.130 } } },
    articleSections: [
      { heading: "設定1〜6の公開初当りを反映", paragraphs: ["START時に設定1〜6を均等抽選し、選ばれた設定のボーナス＋直撃AT合算とAT初当りを使用します。設定1は初当り約1/272.7・AT約1/429.2、設定6は初当り約1/217.1・AT約1/319.2です。", "初当りからATへ進む割合も設定ごとの2つの公開値から計算します。公開されていない神謀覚醒や上位到達率の設定差は加えません。"] },
      { heading: "強カワRUSHのゲーム数上乗せ", paragraphs: ["強カワRUSHは初期50G＋α・純増約2.5枚/G。AT中はレア役のゲーム数上乗せ、出陣ボーナス、神謀覚醒を時系列で抽選し、+10Gから+200Gまでの代表振り分けを獲得枚数へ連動させます。", "神謀覚醒は10Gの特化ゾーンで平均約220G上乗せを代表値として表示します。発生率は全条件が公表されていないため比較用モデルです。"] },
      { heading: "オウガイバトルと真強カワRUSH", paragraphs: ["AT残りゲーム数消化後は5Gのオウガイバトルへ進みます。初戦突破目安は設定1約24.9%〜設定6約31.7%を使用し、勝利時は30G以上の上乗せとしてATへ復帰します。", "ヨシテル出陣などの上位契機に当選した場合は、初期50G＋α・純増約5.0枚/Gの真強カワRUSHへ移行します。上位契機の全振り分けは代表抽選へ簡略化しています。"] },
      { heading: "固定レートと平均投資", paragraphs: ["50枚あたり31.7G、1,000円46枚貸し、5.2枚交換で投資・換金・収支目安を計算します。コイン単価3.4円は荒さを見る指標として分けて表示します。", "獲得19,000枚へ達した結果はコンプリートとして打ち切り、マイ記録とランキングにも到達状態を残します。"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/9868"], ["一撃 機種解析", "https://1geki.jp/slot/l_otome_keigan/"], ["HEIWA 機種情報", "https://www.heiwanet.co.jp/products/pachislot/l-sg5/"]]
  },
  "oumi5": {
    order: 27, type: "pachinko", theme: "ocean", year: "2023", maker: "三洋物産",
    name: "P大海物語5", shortName: "大海物語5",
    image: "assets/machines/oumi5-key-visual.jpg",
    imageAlt: "P大海物語5のキービジュアル",
    imageCredit: "三洋物産",
    imageSource: "https://www.sanyobussan.co.jp/products/pk_bigsea5/",
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
    image: "assets/machines/sengoku-otome5-key-visual.jpg",
    imageAlt: "L戦国乙女5 業火を穿つ宿焔の双刃のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10473",
    catchcopy: "カシンバトルを越え、剣聖CHANCEから真強カワRUSHへ。",
    intro: "周期抽選と巫女ポイントを軸に、CZ・AT・特化ゾーン・上位CZへ進む人気スマスロ。通常時から強カワRUSH、剣聖CHANCE、真強カワRUSHまでを簡易体験できます。",
    points: ["AT初当りは設定1約1/359.5〜設定6約1/262.9", "約31.0G/50枚・コイン単価は初期値3.5円", "剣聖CHANCEは10G＋α、通常初当り時の成功期待度約51%"],
    specs: [["AT初当り（設定1）", "約1/359.5"], ["AT初当り（設定6）", "約1/262.9"], ["ベース", "約31.0G/50枚"], ["コイン単価初期値", "3.5円"], ["AT純増", "約2.7枚/G"], ["上位CZ期待度", "約51%"]],
    sim: { kind: "slot", triggerLabel: "強カワRUSH", triggerRate: 359.5, triggerSuccess: 1, mainLabel: "強カワRUSH", mainRate: 359.5, base50: 31.0, coinUnit: 3.5, normalMin: 250, normalMax: 1100, atPureIncrease: 2.7, specialLabel: "夢幻の如くなり", specialChance: 0.28, specialMin: 235, specialMax: 1100, upperChallenge: "剣聖CHANCE", upperChance: 0.051, upperSuccess: 0.51, upperLabel: "真強カワRUSH", upperContinue: 0.76, upperPayout: 620, upperPureIncrease: 5.0, otomeRushFlow: true, otomeBaseGames: 50, otomeAddOnChance: 0.42, otomeAddOnGames: [[10, 0.45], [20, 0.25], [30, 0.15], [50, 0.10], [100, 0.04], [200, 0.01]], otomeBonusChance: 0.28, otomeBonusGames: [[10, 0.50], [20, 0.25], [30, 0.15], [50, 0.10]], otomeBonusLabel: "双刃BONUS", otomeAwakeningGames: 220, otomeBattleLabel: "カシンバトル", otomeBattleChanceBySetting: { 1: 0.249, 2: 0.263, 3: 0.276, 4: 0.291, 5: 0.305, 6: 0.317 }, settingRates: { 1: { trigger: 359.5, main: 359.5, payout: 0.979 }, 2: { trigger: 350.8, main: 350.8, payout: 0.989 }, 3: { trigger: 332.5, main: 332.5, payout: 1.010 }, 4: { trigger: 302.8, main: 302.8, payout: 1.062 }, 5: { trigger: 281.0, main: 281.0, payout: 1.111 }, 6: { trigger: 262.9, main: 262.9, payout: 1.149 } } },
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
    image: "assets/machines/million-god-kiseki-key-visual.jpg",
    imageAlt: "スマスロ ミリオンゴッド‐神々の軌跡‐のキービジュアル",
    imageCredit: "ミズホ",
    imageSource: "https://www.universal-777.com/product/slot/milliongod_kiseki/",
    catchcopy: "G-STOPを突破し、Z-GAMEとSGGで神の連鎖へ。",
    intro: "王道のGOD GAMEを高純増ATで楽しむスマスロ。G-STOP、GOD GAME、Z-GAME、SGGの流れをシミュレーション用に整理しました。",
    points: ["GG初当りは設定1約1/532.8〜設定6約1/294.8", "偶数設定ほど初当りが軽い独自の設定差", "GOD GAMEは純増約7.0枚/G、1セット50G"],
    specs: [["GG初当り（設定1）", "約1/532.8"], ["GG初当り（設定6）", "約1/294.8"], ["ベース", "約30.8G/50枚"], ["コイン単価初期値", "4.0円"], ["AT純増", "約7.0枚/G"], ["GOD GAME", "1セット50G"]],
    sim: { kind: "slot", triggerLabel: "GOD GAME", triggerRate: 532.8, triggerSuccess: 1, mainLabel: "GOD GAME", mainRate: 532.8, base50: 30.8, coinUnit: 4.0, normalMin: 350, normalMax: 1400, atPureIncrease: 7.0, specialLabel: "Z-GAME", specialChance: 0.30, specialMin: 350, specialMax: 1400, specialDisplay: "coins", cycleFlow: { phase: "GOD GAME", label: "GOD GAME", statLabel: "GGセット", games: 50, continueChance: 0.65, maxRounds: 10, rewards: [[{ label: "GOD GAME 1セット", payout: 350 }, 0.55], [{ label: "Z-GAMEストック", payout: 700 }, 0.30], [{ label: "GOD揃い報酬", payout: 1750 }, 0.15]], endLabel: "GOD GAME終了" }, upperChallenge: "SGG", upperChance: 0.22, upperSuccess: 0.55, upperLabel: "SUPER GOD GAME", upperContinue: 0.80, upperPayout: 700, upperPureIncrease: 7.0, upperSetGames: [[100, 1]], settingRates: { 1: { trigger: 532.8, main: 532.8, payout: 0.972 }, 2: { trigger: 420.4, main: 420.4, payout: 0.991 }, 3: { trigger: 495.9, main: 495.9, payout: 1.021 }, 4: { trigger: 338.4, main: 338.4, payout: 1.069 }, 5: { trigger: 455.4, main: 455.4, payout: 1.117 }, 6: { trigger: 294.8, main: 294.8, payout: 1.146 } } },
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
    image: "assets/machines/lycoris-recoil-pachinko-key-visual.jpg",
    imageAlt: "eリコリス・リコイルのキービジュアル",
    imageCredit: "ニューギン",
    imageSource: "https://www.newgin.co.jp/pub/machine/elycorisrecoil/",
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
    image: "assets/machines/okiumi6-key-visual-v1.jpg",
    imageAlt: "Pスーパー海物語IN沖縄6のキービジュアル",
    imageCredit: "©SANYO BUSSAN CO., LTD.",
    imageSource: "https://www.sanyobussan.co.jp/products/pk_supersea_okinawa6/",
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
    image: "assets/machines/shin-hokuto-musou-key-visual.jpg",
    imageAlt: "ぱちんこCR真・北斗無双のキービジュアル",
    imageCredit: "サミー",
    imageSource: "https://www.sammy.co.jp/japanese/product/pachinko/2015/cr_shin_hokuto_muso/spec/",
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
    image: "assets/machines/juoh-slot-key-visual.jpg",
    imageAlt: "スマスロ 獣王のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10521",
    catchcopy: "SC高確をつかみ、サバ連と4大トリガーへ。",
    intro: "2026年10月5日導入のストック放出型スマスロ。SC高確からサバンナチャンスへ進み、サバ連、超サバ、キリンサバチャンを目指す流れを簡易体験できます。",
    points: ["設定1・2・4・5・6からランダム抽選", "AT初当りは設定1約1/326.5〜設定6約1/279.7", "約31.8G/50枚・コイン単価約4.0円"],
    specs: [["設定", "1・2・4・5・6"], ["AT初当り（設定1）", "約1/326.5"], ["AT初当り（設定6）", "約1/279.7"], ["設定1出玉率", "97.8%"], ["設定6出玉率", "114.3%"], ["AT純増", "約8.0枚/G"]],
    sim: { kind: "slot", triggerLabel: "SC高確", triggerRate: 163.3, triggerSuccess: 0.50, mainLabel: "サバンナチャンス", mainRate: 326.5, base50: 31.8, coinUnit: 4.0, normalMin: 160, normalMax: 900, atPureIncrease: 8.0, specialLabel: "サバ連", specialChance: 0.50, specialMin: 160, specialMax: 1200, specialDisplay: "coins", cycleFlow: { phase: "SAVANNA CHANCE", label: "サバ連", statLabel: "サバチャン連", games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.65, maxRounds: 12, rewards: [[{ label: "サバンナチャンス", payout: 160 }, 0.55], [{ label: "超サバ報酬", payout: 320 }, 0.30], [{ label: "100ナビ報酬", payout: 800 }, 0.15]], endLabel: "サバ連終了" }, upperChallenge: "4大サバンナトリガー", upperChance: 0.20, upperSuccess: 0.45, upperLabel: "キリンサバチャン", upperContinue: 0.85, upperPayout: 350, upperPureIncrease: 8.0, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { main: 326.5, payout: 0.978 }, 2: { main: 321.6, payout: 0.987 }, 4: { main: 295.8, payout: 1.056 }, 5: { main: 287.6, payout: 1.086 }, 6: { main: 279.7, payout: 1.143 } } },
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
    image: "assets/machines/monster-hunter-sunbreak-key-visual.jpg",
    imageAlt: "スマスロ モンスターハンターライズ：サンブレイクのキービジュアル",
    imageCredit: "アデリオン",
    imageSource: "https://www.enterrise.co.jp/slot/mhrsb/",
    catchcopy: "CZを突破し、盟勇クエストとサンブレイクRUSH Gへ。",
    intro: "2026年10月5日導入のゲーム数上乗せ型スマスロ。BREAK ZONEとアイルー福引からATへ進み、盟勇クエスト、剥ぎ取りRUSH、上位ATを目指す流れを簡易化しています。",
    points: ["AT初当りは設定1約1/349.9〜設定6約1/242.3", "約31.9G/50枚・コイン単価約3.2円", "ATは40G＋α・純増約2.7枚/G、CZ期待度は約37%または約60%"],
    specs: [["AT初当り（設定1）", "約1/349.9"], ["AT初当り（設定6）", "約1/242.3"], ["AT純増", "約2.7枚/G"], ["設定1出玉率", "97.5%"], ["設定6出玉率", "112.4%"], ["BREAK ZONE", "期待度約37%"], ["アイルー福引", "期待度約60%"]],
    sim: { kind: "slot", triggerLabel: "CZ（BREAK ZONE／アイルー福引）", triggerRate: 170, triggerSuccess: 0.486, mainLabel: "サンブレイクRUSH", mainRate: 349.9, base50: 31.9, coinUnit: 3.2, normalMin: 260, normalMax: 1050, specialLabel: "剥ぎ取りRUSH", specialChance: 0.30, specialMin: 180, specialMax: 950, specialOutcomes: [[{ kind: "games", label: "盟勇クエスト", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]], triggerGames: 10 }, 0.65], [{ kind: "bonus", label: "サンブレイクBONUS", games: [[20, 0.60], [40, 0.40]], payouts: [[200, 0.60], [400, 0.40]], triggerGames: 10 }, 0.35]], upperChallenge: "キュリアチャンス", upperChance: 0.16, upperSuccess: 0.45, upperLabel: "サンブレイクRUSH G", upperContinue: 0.70, upperPayout: 600, settingRates: { 1: { main: 349.9, payout: 0.975 }, 2: { main: 337.0, payout: 0.988 }, 3: { main: 319.8, payout: 1.008 }, 4: { main: 283.6, payout: 1.052 }, 5: { main: 264.0, payout: 1.084 }, 6: { main: 242.3, payout: 1.124 } } },
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
    image: "assets/machines/rezero-onigakari2-key-visual.jpg",
    imageAlt: "e Re:ゼロから始める異世界生活 鬼がかり2のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10557",
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
    image: "assets/machines/baki-129-key-visual.jpg",
    imageAlt: "e範馬刃牙 129ver.のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10547",
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
    image: "assets/machines/godzilla7-choshinkan-key-visual.jpg",
    imageAlt: "デカスタeGODZILLA7 超震撼ver.のキービジュアル",
    imageCredit: "ニューギン",
    imageSource: "https://www.newgin.co.jp/pub/machine/egodzilla7_dekasuta/spec.html",
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
    image: "assets/machines/smart-pachinko-gantz-key-visual.jpg",
    imageAlt: "SMART-PACHINKO GANTZのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10580",
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
    image: "assets/machines/paripi-koumei-slot-key-visual.jpg",
    imageAlt: "スマスロ パリピ孔明のキービジュアル",
    imageCredit: "山佐ネクスト",
    imageSource: "https://yamasa-next.co.jp/slot/prskkm/",
    catchcopy: "士気高揚ゾーンからParty Time、兵法書と上位STへ。",
    intro: "2026年10月5日導入のボーナス＋STタイプ。CZからボーナス、継続約73%のParty Time、兵法書獲得特化ゾーン、上位STまでを一つの流れに整理しました。",
    points: ["ボーナス初当りは設定1約1/309.9〜設定6約1/228.8", "CZは設定1約1/213.6〜設定6約1/171.7", "Party Time継続約73%、超Party Timeは約81%"],
    specs: [["初当り（設定1）", "約1/309.9"], ["初当り（設定6）", "約1/228.8"], ["CZ（設定1）", "約1/213.6"], ["CZ（設定6）", "約1/171.7"], ["BONUS純増", "約4.2枚/G"], ["ST継続", "約73%"], ["上位ST継続", "約81%"]],
    sim: { kind: "slot", triggerLabel: "士気高揚ゾーン", triggerRate: 213.6, triggerSuccess: 0.69, mainLabel: "Party Time", mainRate: 309.9, base50: 31.0, coinUnit: 3.3, normalMin: 180, normalMax: 980, atPureIncrease: 4.2, specialLabel: "兵法書獲得特化ゾーン", specialChance: 0.35, specialMin: 120, specialMax: 720, specialDisplay: "bonus", cycleFlow: { phase: "PARTY TIME", label: "Party Time ST", statLabel: "Party Time継続", games: 30, continueChance: 0.73, maxRounds: 15, rewards: [[{ label: "Party BONUS", payout: 180 }, 0.62], [{ label: "兵法書獲得", payout: 360 }, 0.28], [{ label: "孔明BONUS", payout: 720 }, 0.10]], endLabel: "Party Time終了" }, upperChallenge: "臥龍転生", upperChance: 0.14, upperSuccess: 0.50, upperLabel: "超Party Time", upperContinue: 0.81, upperPayout: 420, upperPureIncrease: 4.2, settingRates: { 1: { trigger: 213.6, main: 309.9, payout: 0.976 }, 2: { trigger: 207.3, main: 299.6, payout: 0.989 }, 3: { trigger: 199.2, main: 280.0, payout: 1.014 }, 4: { trigger: 188.8, main: 262.0, payout: 1.045 }, 5: { trigger: 179.4, main: 243.9, payout: 1.090 }, 6: { trigger: 171.7, main: 228.8, payout: 1.136 } } },
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
    image: "assets/machines/my-juggler6-key-visual.jpg",
    imageAlt: "マイジャグラーVIのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10513",
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
    image: "assets/machines/neo-im-juggler-key-visual.jpg",
    imageAlt: "ネオアイムジャグラーEXの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10269",
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
    image: "assets/machines/gogo-juggler3-key-visual.jpg",
    imageAlt: "ゴーゴージャグラー3の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9848",
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
    image: "assets/machines/funky-juggler2-key-visual.jpg",
    imageAlt: "ファンキージャグラー2の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9446",
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
    image: "assets/machines/oumi5-agnes-key-visual.jpg",
    imageAlt: "PA大海物語5 Withアグネス・ラムの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9833",
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
    image: "assets/machines/oumi5-special-key-visual.jpg",
    imageAlt: "P大海物語5スペシャルのキービジュアル",
    imageCredit: "三洋物産",
    imageSource: "https://www.sanyobussan.co.jp/products/pk_bigsea5_special/",
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
    image: "assets/machines/hokuto11-boukyousei-key-visual.jpg",
    imageAlt: "e 北斗の拳11 暴凶星の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10359",
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
    image: "assets/machines/fever-kinnikuman-key-visual.jpg",
    imageAlt: "eフィーバーキン肉マンの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10432",
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
    image: "assets/machines/happy-juggler-v3-key-visual.jpg",
    imageAlt: "ハッピージャグラーV IIIのキービジュアル",
    imageCredit: "北電子",
    imageSource: "https://www.kitadenshi.co.jp/products/2022/hjv3/index.html",
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
    image: "assets/machines/magia-record-slot-key-visual.jpg",
    imageAlt: "スマスロ マギアレコード 魔法少女まどか☆マギカ外伝のキービジュアル",
    imageCredit: "ミズホ",
    imageSource: "https://www.universal-777.com/product/slot/magireco/",
    catchcopy: "ボーナスからマギアラッシュ、マギアアタックの上乗せへ。",
    intro: "全国設置上位のスマスロ。ボーナス初当り、AT『マギアラッシュ』、マギアアタック、エンブリオ・イブ覚醒の流れを簡易体験できます。",
    points: ["設定1ボーナス約1/240.6・AT約1/654.6", "約32.6G/50枚・純増約2.6枚/G", "設定1〜6ランダム"],
    specs: [["ボーナス（設定1）", "約1/240.6"], ["AT（設定1）", "約1/654.6"], ["ベース", "約32.6G/50枚"], ["コイン単価", "約3.2円"], ["AT純増", "約2.6枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "マギアボーナス", triggerRate: 240.6, triggerSuccess: 0.368, mainLabel: "マギアラッシュ", mainRate: 654.6, base50: 32.6, coinUnit: 3.2, normalMin: 260, normalMax: 1100, specialLabel: "マギアアタック", specialChance: 0.38, specialMin: 150, specialMax: 900, specialOutcomes: [[{ kind: "games", label: "マギアアタック", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]], triggerGames: 8 }, 0.70], [{ kind: "bonus", label: "マギアボーナス", games: [[20, 0.65], [40, 0.35]], payouts: [[150, 0.65], [300, 0.35]], triggerGames: 10 }, 0.30]], upperChallenge: "エンブリオ・イブ覚醒", upperChance: 0.16, upperSuccess: 0.50, upperLabel: "裏マギアアタック", upperContinue: 0.80, upperPayout: 520, settingRates: { 1: { trigger: 240.6, main: 654.6, payout: 0.976 }, 2: { trigger: 236.1, main: 633.4, payout: 0.989 }, 3: { trigger: 222.8, main: 571.8, payout: 1.020 }, 4: { trigger: 208.5, main: 516.6, payout: 1.060 }, 5: { trigger: 195.1, main: 456.5, payout: 1.104 }, 6: { trigger: 184.3, main: 416.7, payout: 1.149 } } },
    articleSections: [{ heading: "ボーナスとATの設定差を反映", paragraphs: ["設定1〜6を均等抽選し、公開されているボーナス・AT初当りを設定別に使用します。", "特化ゾーンの非公表設定差は加えず、32.6G/50枚・46枚貸し・5.2枚交換で固定します。"] }],
    sources: [["ユニバーサル公式製品情報", "https://www.universal-777.com/product/slot/magireco/"], ["ユニバーサル公式サイト", "https://www.universal-777.com/"]]
  },
  "god-eater-resurrection": {
    order: 8.7, type: "slot", theme: "crimson", year: "2024年7月", maker: "セブンリーグ", updated: "2026-11-01",
    name: "スマスロ ゴッドイーター リザレクション", shortName: "スマスロ ゴッドイーター",
    image: "assets/machines/god-eater-resurrection-key-visual.jpg",
    imageAlt: "スマスロ ゴッドイーター リザレクションのキービジュアル",
    imageCredit: "セブンリーグ",
    imageSource: "https://www1.yamasa.co.jp/rsgdet/",
    catchcopy: "アラガミ交戦を勝ち抜き、純増約9枚の報酬を重ねる。",
    intro: "全国設置上位の高純増スマスロ。AT『アラガミバースト』、アラガミ交戦、神堕の出玉ルートを固定条件で簡易体験できます。",
    points: ["設定1 AT初当り約1/351.9", "約31G/50枚・純増約9.0枚/G", "設定1〜6ランダム"],
    specs: [["AT（設定1）", "約1/351.9"], ["AT（設定6）", "約1/290.3"], ["ベース", "約31G/50枚"], ["コイン単価", "約3.4円"], ["AT純増", "約9.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "アラガミ交戦", triggerRate: 351.9, triggerSuccess: 1, mainLabel: "アラガミバースト", mainRate: 351.9, base50: 31.0, coinUnit: 3.4, normalMin: 300, normalMax: 1200, specialLabel: "リザレクションゲート", specialChance: 0.34, specialMin: 180, specialMax: 1000, specialDisplay: "coins", cycleFlow: { phase: "ARAGAMI BATTLE", label: "アラガミ交戦", statLabel: "アラガミ討伐", games: 25, continueChance: 0.76, maxRounds: 12, rewards: [[{ label: "捕喰成功", payout: 180 }, 0.55], [{ label: "部位破壊報酬", payout: 360 }, 0.30], [{ label: "神機覚醒報酬", payout: 720 }, 0.15]], endLabel: "アラガミバースト終了" }, upperChallenge: "神堕チャレンジ", upperChance: 0.13, upperSuccess: 0.50, upperLabel: "神堕", upperContinue: 0.90, upperPayout: 510, settingRates: { 1: { trigger: 351.9, main: 351.9, payout: 0.979 }, 2: { trigger: 344.5, main: 344.5, payout: 0.989 }, 3: { trigger: 330.1, main: 330.1, payout: 1.011 }, 4: { trigger: 317.0, main: 317.0, payout: 1.056 }, 5: { trigger: 302.2, main: 302.2, payout: 1.100 }, 6: { trigger: 290.3, main: 290.3, payout: 1.149 } } },
    articleSections: [{ heading: "高純増ATとST型バトル", paragraphs: ["ATはストーリーパート、25G＋αのアラガミ交戦、報酬パートを繰り返します。", "設定1〜6のAT初当りを反映し、神堕などの上位契機は全設定共通のサイト固定値で簡易化します。"] }],
    sources: [["山佐ネクスト／セブンリーグ 公式機種サイト", "https://www1.yamasa.co.jp/rsgdet/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10086"]]
  },
  "okidoki-black": {
    order: 8.8, type: "slot", theme: "violet", year: "2024年7月", maker: "ミズホ", updated: "2026-11-01",
    name: "沖ドキ！BLACK", shortName: "沖ドキ！BLACK",
    image: "assets/machines/okidoki-black-key-visual.jpg",
    imageAlt: "沖ドキ！BLACKのキービジュアル",
    imageCredit: "ミズホ",
    imageSource: "https://www.universal-777.com/product/slot/okidoki_black/",
    catchcopy: "ハイビスカス点灯から、32G以内の天国ループへ。",
    intro: "全国設置上位の沖スロ。ボーナス初当り、BIG・REG、天国、ドキドキ・超ドキドキモードの連チャンを簡易体験できます。",
    points: ["設定1初当り約1/288.7", "約32G/50枚・純増約3.5枚/G", "実機どおり設定1・2・3・5・6から抽選"],
    specs: [["初当り（設定1）", "約1/288.7"], ["初当り（設定6）", "約1/243.1"], ["ベース", "約32G/50枚"], ["コイン単価", "約3.3円"], ["純増", "約3.5枚/G"], ["BIG／REG", "約210／90枚"]],
    sim: { kind: "slot", triggerLabel: "ボーナス初当り", triggerRate: 288.7, triggerSuccess: 1, mainLabel: "天国モード", mainRate: 288.7, base50: 32.0, coinUnit: 3.3, normalMin: 90, normalMax: 700, specialLabel: "1G連", specialChance: 0.28, specialMin: 90, specialMax: 630, specialDisplay: "bonus", cycleFlow: { phase: "OKIDOKI HEAVEN", label: "天国ボーナス", statLabel: "32G以内連", games: [[60, 0.65], [20, 0.35]], continueChance: 0.75, maxRounds: 12, rewards: [[{ label: "BIG BONUS", payout: 210 }, 0.65], [{ label: "REG BONUS", payout: 70 }, 0.35]], endLabel: "天国モード終了" }, upperChallenge: "ドキドキモード", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "超ドキドキモード", upperContinue: 0.90, upperPayout: 300, settingPool: [1, 2, 3, 5, 6], settingRates: { 1: { trigger: 288.7, main: 288.7, payout: 0.972 }, 2: { trigger: 277.9, main: 277.9, payout: 0.987 }, 3: { trigger: 265.8, main: 265.8, payout: 1.019 }, 5: { trigger: 254.1, main: 254.1, payout: 1.048 }, 6: { trigger: 243.1, main: 243.1, payout: 1.086 } } },
    articleSections: [{ heading: "実機の5段階設定を使用", paragraphs: ["設定1・2・3・5・6から均等抽選し、設定別のボーナス初当りと出玉率を反映します。", "天国以上の移行率は公開値を完全再現せず、ボーナス後32G以内の連チャンを体験する固定モデルです。"] }],
    sources: [["ユニバーサル公式製品情報", "https://www.universal-777.com/product/slot/okidoki_black/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10051"]]
  },
  "oumi5-black": {
    order: 8.9, type: "pachinko", theme: "ocean", year: "2023年12月", maker: "三洋物産", updated: "2026-11-01",
    name: "P大海物語5 ブラック", shortName: "大海5 ブラック",
    image: "assets/machines/oumi5-black-key-visual.jpg",
    imageAlt: "P大海物語5 ブラックのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9916",
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
    image: "assets/machines/sea-story-3r3-key-visual.jpg",
    imageAlt: "PA海物語3R3のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10257",
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
    image: "assets/machines/shinumi-story-key-visual.jpg",
    imageAlt: "PA新海物語のキービジュアル",
    imageCredit: "三洋物産",
    imageSource: "https://www.sanyobussan.co.jp/products/pk_shinumi/",
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
    image: "assets/machines/bakemonogatari-oni99-key-visual.jpg",
    imageAlt: "e 化物語 鬼99ver.の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10450",
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
    image: "assets/machines/im-juggler-ex-key-visual.jpg",
    imageAlt: "アイムジャグラーEXの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9126",
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
    image: "assets/machines/juggler-girls-ss-key-visual.jpg",
    imageAlt: "ジャグラーガールズSSの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10009",
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
    image: "assets/machines/fire-force2-slot-key-visual.jpg",
    imageAlt: "Lパチスロ 炎炎ノ消防隊2の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10415",
    catchcopy: "BONUSから炎炎激闘、森羅万象、アドラバーストへ。",
    intro: "全国設置上位のスマスロ。BONUS初当り、炎炎激闘、灰焔騎士団、森羅万象からアドラバーストへ進む流れを簡易体験できます。",
    points: ["設定1初当り約1/272", "約33G/50枚・純増約5.8枚/G", "設定1〜6ランダム"],
    specs: [["初当り（設定1）", "約1/272"], ["初当り（設定6）", "約1/227"], ["ベース", "約33G/50枚"], ["コイン単価", "約3.6円"], ["AT純増", "約5.8枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "炎炎BONUS", triggerRate: 272.0, triggerSuccess: 1, mainLabel: "炎炎激闘", mainRate: 272.0, base50: 33.0, coinUnit: 3.6, normalMin: 220, normalMax: 1000, atPureIncrease: 5.8, specialLabel: "灰焔騎士団", specialChance: 0.36, specialMin: 160, specialMax: 900, specialDisplay: "bonus", cycleFlow: { phase: "FIRE FORCE LOOP", label: "炎炎激闘", statLabel: "炎炎激闘連", games: [[15, 0.50], [40, 0.40], [80, 0.10]], continueChance: 0.68, maxRounds: 12, rewards: [[{ label: "REGULAR BONUS", payout: 90 }, 0.45], [{ label: "炎炎BONUS", payout: 230 }, 0.40], [{ label: "灰焔騎士団BONUS", payout: 460 }, 0.15]], endLabel: "炎炎激闘終了" }, upperChallenge: "森羅万象", upperChance: 0.16, upperSuccess: 0.50, upperLabel: "アドラバースト", upperContinue: 0.82, upperPayout: 520, upperPureIncrease: 5.8, settingRates: { 1: { trigger: 272.0, main: 272.0, payout: 0.977 }, 2: { trigger: 269.0, main: 269.0, payout: 0.988 }, 3: { trigger: 257.0, main: 257.0, payout: 1.012 }, 4: { trigger: 242.0, main: 242.0, payout: 1.056 }, 5: { trigger: 236.0, main: 236.0, payout: 1.102 }, 6: { trigger: 227.0, main: 227.0, payout: 1.149 } } },
    articleSections: [
      { heading: "BONUSから炎炎激闘へ", paragraphs: ["設定1〜6を均等抽選し、設定別のBONUS初当りと出玉率を使用します。", "灰焔騎士団などの特化ゾーンと上位契機は、公表されていない設定差を加えず全設定共通です。"] },
      { heading: "高純増ATを簡易体験", paragraphs: ["約33G/50枚、46枚貸し・5.2枚交換で投資と収支を計算します。", "全小役、内部状態、有利区間は再現せず、上位到達前後の出玉差を比較するモデルです。"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/sbh/spec/"], ["SANKYO 公式サイト", "https://www.sankyo-fever.jp/"]]
  },
  "okidoki-gold": {
    order: 9.6, type: "slot", theme: "gold", year: "2022年12月", maker: "ミズホ", updated: "2026-11-01",
    name: "沖ドキ！GOLD", shortName: "沖ドキ！GOLD",
    image: "assets/machines/okidoki-gold-key-visual.jpg",
    imageAlt: "沖ドキ！GOLDのキービジュアル",
    imageCredit: "ミズホ",
    imageSource: "https://www.universal-777.com/product/slot/okidoki_gold/",
    catchcopy: "ハイビスカス点灯から天国、金ドキ、超ドキドキへ。",
    intro: "定番の沖スロ。ボーナス初当り、32G以内の天国連、金ドキ・ドキドキ・超ドキドキの出玉ルートを簡易体験できます。",
    points: ["設定1初当り約1/299.6", "約32G/50枚・純増約3.0枚/G", "実機どおり設定1・2・3・5・6から抽選"],
    specs: [["初当り（設定1）", "約1/299.6"], ["初当り（設定6）", "約1/237.0"], ["ベース", "約32G/50枚"], ["コイン単価", "約3.8円"], ["純増", "約3.0枚/G"], ["BIG／REG", "約210／90枚"]],
    sim: { kind: "slot", triggerLabel: "ボーナス初当り", triggerRate: 299.6, triggerSuccess: 1, mainLabel: "天国モード", mainRate: 299.6, base50: 32.0, coinUnit: 3.8, normalMin: 90, normalMax: 700, specialLabel: "金ドキモード", specialChance: 0.28, specialMin: 90, specialMax: 720, specialDisplay: "bonus", cycleFlow: { phase: "GOLD HEAVEN", label: "天国ボーナス", statLabel: "32G以内連", games: [[60, 0.65], [20, 0.35]], continueChance: 0.78, maxRounds: 12, rewards: [[{ label: "BIG BONUS", payout: 210 }, 0.65], [{ label: "REG BONUS", payout: 70 }, 0.35]], endLabel: "天国モード終了" }, upperChallenge: "ドキドキモード", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "超ドキドキモード", upperContinue: 0.90, upperPayout: 300, settingPool: [1, 2, 3, 5, 6], settingRates: { 1: { trigger: 299.6, main: 299.6, payout: 0.972 }, 2: { trigger: 287.3, main: 287.3, payout: 0.987 }, 3: { trigger: 266.7, main: 266.7, payout: 1.013 }, 5: { trigger: 247.6, main: 247.6, payout: 1.047 }, 6: { trigger: 237.0, main: 237.0, payout: 1.081 } } },
    articleSections: [
      { heading: "5段階設定でボーナス初当りを抽選", paragraphs: ["実機に合わせて設定1・2・3・5・6から均等抽選し、設定別の初当りと出玉率を使います。", "設定は最終結果まで伏せ、マイ記録と機種別ランキングへ表示します。"] },
      { heading: "32G以内の連チャンを簡易化", paragraphs: ["天国、金ドキ、ドキドキ・超ドキドキの流れを段階的な抽選へまとめています。", "モード移行率や確定役の全詳細は再現せず、約32G/50枚・固定交換率で結果を比較します。"] }
    ],
    sources: [["ユニバーサル公式製品情報", "https://www.universal-777.com/product/slot/okidoki_gold/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9750"]]
  },
  "okiumi5-imarine": {
    order: 9.7, type: "pachinko", theme: "aqua", year: "2021年7月", maker: "三洋物産", updated: "2026-11-01",
    name: "PAスーパー海物語 IN 沖縄5 with アイマリン", shortName: "沖海5 アイマリン",
    image: "assets/machines/okiumi5-imarine-key-visual.jpg",
    imageAlt: "PAスーパー海物語 IN 沖縄5 with アイマリンのキービジュアル",
    imageCredit: "三洋物産",
    imageSource: "https://www.sanyobussan.co.jp/products/pk_supersea_okinawa5_imarine/",
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
    image: "assets/machines/oumi4-agnes-key-visual.jpg",
    imageAlt: "PA大海物語4スペシャル Withアグネス・ラムのキービジュアル",
    imageCredit: "三洋物産",
    imageSource: "https://www.sanyobussan.co.jp/products/pk_greatsea4_special_withagnes/",
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
    image: "assets/machines/oumi4-special-key-visual.jpg",
    imageAlt: "P大海物語4スペシャルのキービジュアル",
    imageCredit: "三洋物産",
    imageSource: "https://www.sanyobussan.co.jp/products/pk_greatsea4_special/",
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
    image: "assets/machines/okiumi6-enako-key-visual.jpg",
    imageAlt: "PAスーパー海物語IN沖縄6 Withえなこの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10462",
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
    image: "assets/machines/my-juggler-v-key-visual.jpg",
    imageAlt: "マイジャグラーVの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9514",
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
  "mr-juggler": {
    order: 10.11, type: "slot", theme: "gold", year: "2024年7月", maker: "北電子", updated: "2026-11-01",
    name: "ミスタージャグラー", shortName: "ミスタージャグラー",
    image: "assets/machines/mr-juggler-key-visual.jpg",
    imageAlt: "ミスタージャグラーの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10056",
    catchcopy: "ピエロとチェリーの同時抽選を搭載した新シリーズ。",
    intro: "ミスタージャグラーの公式設定別確率を使い、次のBIG・REGまで進めながらボーナスごとに続行を選べます。設定は終了時に発表し、上限は8,000Gです。",
    points: ["設定1〜6均等ランダム", "ボーナスごとに続ける・やめるを選択", "8,000G完走時だけランキングへ登録"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/268.6"], ["設定1 REG", "約1/374.5"], ["設定1合算", "約1/156.4"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 268.6, regRate: 374.5, combinedRate: 156.4, bigPayout: 240, regPayout: 96, payoutRate: 0.970, settingRates: { 1: { big: 268.6, reg: 374.5, payout: 0.970 }, 2: { big: 267.5, reg: 354.2, payout: 0.980 }, 3: { big: 260.1, reg: 331.0, payout: 0.998 }, 4: { big: 249.2, reg: 291.3, payout: 1.027 }, 5: { big: 240.9, reg: 257.0, payout: 1.055 }, 6: { big: 237.4, reg: 237.4, payout: 1.073 } }, base50: 40.0, coinUnit: 2.0, mainRate: 156.4, mainLabel: "ボーナス合算", triggerLabel: "最大8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "次のボーナスまで進んで続行判断", paragraphs: ["設定1〜6を均等抽選し、公式BIG・REG確率で次の当選までのゲーム数を抽選します。ボーナス後は続けるかやめるかを選べます。", "設定は終了時に発表し、途中終了はマイ記録へ、8,000G完走時だけ機種別ランキングへ登録できます。"] },
      { heading: "設定差はREGと合算を合わせて確認", paragraphs: ["設定1の合算約1/156.4から設定6の約1/118.7まで、公式の設定別確率と出玉率を使用します。", "ピエロ・チェリーの同時抽選や告知演出は個別再現せず、BIG・REG回数と差枚を比べる簡易モデルです。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/mrjuggler/"]]
  },
  "ultra-miracle-juggler": {
    order: 10.12, type: "slot", theme: "violet", year: "2024年12月", maker: "北電子", updated: "2026-11-01",
    name: "ウルトラミラクルジャグラー", shortName: "ウルトラミラクル",
    image: "assets/machines/ultra-miracle-juggler-key-visual.jpg",
    imageAlt: "ウルトラミラクルジャグラーのキービジュアル",
    imageCredit: "北電子",
    imageSource: "https://www.kitadenshi.co.jp/products/2024/umj/",
    catchcopy: "多彩なミラクル演出とBIG寄りの設定差を体験。",
    intro: "ウルトラミラクルジャグラーの公式設定別確率を使い、ボーナスごとに続行か終了を選ぶ最大8,000GのAタイプシミュレーターです。",
    points: ["BIG約240枚・REG約96枚", "設定1〜6均等ランダム", "46枚貸し・5.2枚交換で収支を計算"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/267.5"], ["設定1 REG", "約1/425.6"], ["設定1合算", "約1/164.3"], ["設定1出玉率", "97.0%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 267.5, regRate: 425.6, combinedRate: 164.3, bigPayout: 240, regPayout: 96, payoutRate: 0.970, settingRates: { 1: { big: 267.5, reg: 425.6, payout: 0.970 }, 2: { big: 261.1, reg: 402.1, payout: 0.981 }, 3: { big: 256.0, reg: 350.5, payout: 0.998 }, 4: { big: 242.7, reg: 322.8, payout: 1.021 }, 5: { big: 233.2, reg: 297.9, payout: 1.045 }, 6: { big: 216.3, reg: 277.7, payout: 1.081 } }, base50: 40.0, coinUnit: 2.0, mainRate: 164.3, mainLabel: "ボーナス合算", triggerLabel: "最大8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "BIG・REG当選ごとに続けるか選ぶ", paragraphs: ["次のボーナスまでのゲーム数とBIG・REG種別を一回ずつ表示します。設定は遊技中に伏せ、やめた時か8,000G到達時に発表します。", "途中でやめても総ゲーム数、当選回数、投資、差枚、収支はマイ記録へ自動保存されます。"] },
      { heading: "ミラクル演出は確率結果へ簡略化", paragraphs: ["設定1のBIG約1/267.5・REG約1/425.6から設定6のBIG約1/216.3・REG約1/277.7までを個別に使用します。", "先告知・後告知、ミラクルアクション、チェリー同時当選は演出として再現せず、ボーナス確率と出玉率による差枚モデルです。"] }
    ],
    sources: [["北電子 公式製品情報", "https://www.kitadenshi.co.jp/slot/ultramiraclejuggler/"], ["北電子 公式特設サイト", "https://www.kitadenshi.co.jp/products/2024/umj/"]]
  },
  "matador3": {
    order: 10.13, type: "slot", theme: "crimson", year: "2025年8月", maker: "北電子", updated: "2026-11-01",
    name: "マタドールⅢ", shortName: "マタドールⅢ",
    image: "assets/machines/matador3-key-visual.jpg",
    imageAlt: "マタドールⅢのキービジュアル",
    imageCredit: "北電子",
    imageSource: "https://www.kitadenshi.co.jp/products/2025/mtd3/",
    catchcopy: "ボーナストリガー搭載。最大約302枚のBIGを重ねる。",
    intro: "ボーナストリガーを搭載したスマスロのノーマルタイプ。公式設定別BIG・REG確率で次の当選まで進み、ボーナスごとに続行を判断します。",
    points: ["BIG最大約302枚・REG最大約104枚", "設定1〜6均等ランダム", "最大8,000G・終了時に設定発表"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/278.9"], ["設定1 REG", "約1/434.0"], ["設定1合算", "約1/169.8"], ["設定1出玉率", "97.4%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 278.9, regRate: 434.0, combinedRate: 169.8, bigPayout: 302, regPayout: 104, payoutRate: 0.974, settingRates: { 1: { big: 278.9, reg: 434.0, payout: 0.974 }, 2: { big: 268.6, reg: 417.4, payout: 0.989 }, 3: { big: 260.1, reg: 402.1, payout: 1.003 }, 4: { big: 244.5, reg: 362.1, payout: 1.035 }, 5: { big: 231.6, reg: 334.4, payout: 1.065 }, 6: { big: 219.9, reg: 299.3, payout: 1.100 } }, base50: 40.0, coinUnit: 2.1, mainRate: 169.8, mainLabel: "ボーナス合算", triggerLabel: "最大8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "ボーナストリガー機も同じ続行方式", paragraphs: ["次のBIG・REGまで進み、当選ゲーム数を確認して続けるかやめるかを選びます。BIGはBT込み最大約302枚、REGは最大約104枚で差枚を計算します。", "設定1〜6は開始時に均等抽選し、最終結果まで表示しません。"] },
      { heading: "設定6は出玉率110.0%", paragraphs: ["公式値は設定1合算約1/169.8・出玉率97.4%から、設定6合算約1/126.8・出玉率110.0%です。", "告知モード、技術介入、全てのBT手順は再現せず、公式確率を使った体験用モデルです。"] }
    ],
      sources: [["北電子 公式特設サイト", "https://www.kitadenshi.co.jp/products/2025/mtd3/"]]
  },
  "dragon-hanahana-senko": {
    order: 10.14, type: "slot", theme: "aqua", year: "2023年12月", maker: "パイオニア", updated: "2026-11-01",
    name: "ドラゴンハナハナ～閃光～-30", shortName: "ドラゴンハナハナ閃光",
    image: "assets/machines/dragon-hanahana-senko-key-visual.jpg",
    imageAlt: "ドラゴンハナハナ～閃光～-30の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9924",
    catchcopy: "ハイビスカス点灯でBIGかREG。30Φの定番を追加。",
    intro: "ドラゴンハナハナ～閃光～-30の公式設定別確率を使い、次のBIG・REGまで進めるAタイプシミュレーターです。ボーナスごとに続行か終了を選べます。",
    points: ["BIG最大252枚・REG最大96枚", "設定1〜6均等ランダム", "最大8,000G・8,000G完走時だけランキング登録"],
    specs: [["上限ゲーム数", "8,000G"], ["設定", "1〜6ランダム"], ["設定1 BIG", "約1/256"], ["設定1 REG", "約1/642"], ["設定1合算", "約1/183"], ["設定1出玉率", "97%"]],
    sim: { kind: "juggler", games: 8000, bigRate: 256.0, regRate: 642.0, combinedRate: 183.0, bigPayout: 252, regPayout: 96, payoutRate: 0.970, settingRates: { 1: { big: 256.0, reg: 642.0, payout: 0.970 }, 2: { big: 246.0, reg: 585.0, payout: 0.990 }, 3: { big: 235.0, reg: 537.0, payout: 1.010 }, 4: { big: 224.0, reg: 489.0, payout: 1.040 }, 5: { big: 212.0, reg: 442.0, payout: 1.070 }, 6: { big: 199.0, reg: 399.0, payout: 1.100 } }, base50: 40.0, coinUnit: 2.1, mainRate: 183.0, mainLabel: "ボーナス合算", triggerLabel: "最大8,000G実戦", upperChallenge: "BIG・REG集計", upperLabel: "差枚結果" },
    articleSections: [
      { heading: "ハイビスカス点灯から続行を選ぶ", paragraphs: ["次のボーナスまでのゲーム数を抽選し、BIGまたはREG当選後に続ける・やめるを選択します。設定は終了時に発表します。", "ジャグラー系と同じ固定レート・保存方式なので、異なるAタイプの結果をマイ記録で比較できます。"] },
      { heading: "設定1〜6の公式確率を反映", paragraphs: ["設定1のBIG約1/256・REG約1/642・合算約1/183から、設定6のBIG約1/199・REG約1/399・合算約1/133までを使用します。", "告知タイミング、チェリー同時当選、設定示唆ランプ、取りこぼしは再現しない簡易モデルです。"] }
    ],
    sources: [["パイオニア 公式台間POP", "https://www.slot-pioneer.co.jp/product/dragon_hanahana_senko/pop/pop_pdf.pdf"]]
  },
  "fire-force2-shinra": {
    order: 10.15, type: "pachinko", theme: "ember", year: "2025年7月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバー炎炎ノ消防隊2 シンラver.", shortName: "炎炎2 シンラver.",
    image: "assets/machines/fire-force2-shinra-key-visual.jpg",
    imageAlt: "eフィーバー炎炎ノ消防隊2 シンラver.のキービジュアル",
    imageCredit: "SANKYO",
    imageSource: "https://fever-fireforce.com/pes2/",
    catchcopy: "約1/399.9から炎上バトルモードへ。超炎上BURSTまでを体験。",
    intro: "図柄揃い約1/399.9、トータルRUSH突入約50.5%、継続約80%のLT機。初当りから炎上バトル、超炎上BURSTまでを固定条件で簡易抽選します。",
    points: ["図柄揃い約1/399.9", "トータルRUSH突入約50.5%", "炎上バトルモード継続約80%"],
    specs: [["図柄揃い", "約1/399.9"], ["大当り合算", "1/349.9"], ["RUSH突入", "約50.5%"], ["RUSH継続", "約80%"], ["大当り出玉", "300・1500・3000個"], ["スタート", "通常ヘソ"]],
    sim: { kind: "pachinko", hitRate: 399.9, hitLabel: "図柄揃い", startType: "通常ヘソ", spinsPer1k: 17.0, minSpins: 10, maxSpins: 30, rushLabel: "炎上バトルモード", rushEntry: 0.505, rushContinue: 0.80, firstPayoutIn: 1500, firstPayoutOut: 1500, rushPayouts: [[1500, 0.80], [3000, 0.20]], upperLabel: "超炎上BURST", upperDirectChance: 0, upperUpgradeChance: 0.12, upperContinue: 0.80 },
    articleSections: [
      { heading: "初当りからLTまでを一連で表示", paragraphs: ["図柄揃い約1/399.9から約50.5%のRUSH突入を抽選し、突入後は約80%で継続します。", "命の呼吸チャレンジは突入率へ含め、結果画面では炎上バトルモードへの当落としてまとめます。"] },
      { heading: "出玉上乗せは代表値へ簡略化", paragraphs: ["右打ち中は1500個を中心に3000個と超炎上BURSTへのルートを表現します。", "転落小当りや全振り分けは完全再現せず、250玉貸し・28玉交換の固定レートで収支を比較します。"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/collection/984/"], ["炎炎ノ消防隊 公式特設サイト", "https://fever-fireforce.com/pes2/"]]
  },
  "denonbu-4500": {
    order: 10.16, type: "pachinko", theme: "aqua", year: "2026年10月", maker: "ミズホ", updated: "2026-11-01",
    name: "Pドラムde 電音部 超ドラ熱4500ver.", shortName: "電音部4500",
    image: "assets/machines/denonbu-4500-key-visual.jpg",
    imageAlt: "Pドラムde 電音部 超ドラ熱4500ver.のキービジュアル",
    imageCredit: "ミズホ",
    imageSource: "https://www.youtube.com/watch?v=YRHMszsTImA",
    catchcopy: "約1/259の高スタート機。1/2を突破して4500個＋αへ。",
    intro: "通常時約1/259.0、チャレンジ突入50%、右打ち中約1/2.0の一回転勝負。300個の初当りから1500個、4500個以上の連続獲得までを簡易体験できます。",
    points: ["通常時約1/259.0", "チャレンジ突入・成功ともに約50%", "超ドラ熱ATTACK成功で4500個以上"],
    specs: [["通常時", "約1/259.0"], ["右打ち中", "約1/2.0"], ["チャレンジ突入", "50%"], ["チャレンジ成功", "約50%"], ["最大出玉契機", "4500個＋α"], ["遊タイム", "550回転"]],
    sim: { kind: "pachinko", hitRate: 259.0, hitLabel: "初当り", startType: "高スタート", spinsPer1k: 29.9, minSpins: 20, maxSpins: 45, rushLabel: "りむるしか勝たんチャレンジ", rushEntry: 0.50, rushContinue: 0.50, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 1]], upperLabel: "超ドラ熱ATTACK", upperDirectChance: 0, upperUpgradeChance: 0.50, upperContinue: 0.50 },
    articleSections: [
      { heading: "1/2の一回転勝負を段階表示", paragraphs: ["初当り後は約50%でチャレンジへ進み、約1/2を突破すると1500個を獲得します。", "その後の超ドラ熱ATTACKも約1/2で、成功時の4500個以上を上位ルートとして表示します。"] },
      { heading: "高スタートを投資計算へ反映", paragraphs: ["比較用回転率は29.9回/1,000円に固定し、通常ヘソ機より投資が軽くなるモデルです。", "遊タイムや実店舗ごとの回転差は完全再現せず、結果はマイ記録へ自動保存します。"] }
    ],
    sources: [["ユニバチャンネル 公式PV", "https://www.youtube.com/watch?v=YRHMszsTImA"], ["P-WORLD 設置台数ランキング", "https://www.p-world.co.jp/info/rankp.htm?guid=ON"]]
  },
  "haru-ichiban-2026": {
    order: 10.17, type: "pachinko", theme: "crimson", year: "2026年8月", maker: "ソフィア", updated: "2026-11-01",
    name: "P春一番2026", shortName: "春一番2026",
    image: "assets/machines/haru-ichiban-2026-key-visual.jpg",
    imageAlt: "P春一番2026の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10533",
    catchcopy: "遊びやすい約1/89.9。100%突入の乱舞モードを楽しむ。",
    intro: "通常時約1/89.9、全初当りから60回の乱舞モードへ突入する甘デジ。約60%継続と4R・10Rの出玉を固定条件で簡易体験できます。",
    points: ["通常時約1/89.9", "乱舞モード突入100%", "ST60回・継続約60%"],
    specs: [["通常時", "約1/89.9"], ["ST中", "約1/65.9"], ["RUSH突入", "100%"], ["RUSH継続", "約60%"], ["ST回数", "60回"], ["大当り出玉", "2R・4R・10R"]],
    sim: { kind: "pachinko", hitRate: 89.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 19.4, minSpins: 10, maxSpins: 30, rushLabel: "乱舞モード", rushEntry: 1.0, rushContinue: 0.60, firstPayoutIn: 360, firstPayoutOut: 360, rushPayouts: [[360, 0.75], [900, 0.25]] },
    articleSections: [
      { heading: "初当り後は必ず乱舞モード", paragraphs: ["通常時約1/89.9の初当り後は100%で60回のSTへ進みます。", "ST中約1/65.9をまとめた約60%継続で、甘デジらしい短い一連の流れを体験できます。"] },
      { heading: "4R・10Rを中心に収支計算", paragraphs: ["右打ち中は4R約360個と10R約900個の代表値を使用します。", "初当りの細かな2R・4R・10R振り分けは簡略化し、250玉貸し・28玉交換で比較します。"] }
    ],
    sources: [["西陣・ソフィア 公式サイト", "https://www.nishijin.co.jp/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/"]]
  },
  "gundam-unicorn-awakening-drive": {
    order: 10.18, type: "slot", theme: "aqua", year: "2026年9月", maker: "ビスティ", updated: "2026-11-01",
    name: "Lパチスロ 機動戦士ガンダムユニコーン 覚醒DRIVE", shortName: "ガンダムUC 覚醒DRIVE",
    image: "assets/machines/gundam-unicorn-awakening-drive-key-visual.jpg",
    imageAlt: "Lパチスロ 機動戦士ガンダムユニコーン 覚醒DRIVEのキービジュアル",
    imageCredit: "ビスティ",
    imageSource: "https://www.l-gundamuc-kakuseidrive.jp/",
    catchcopy: "彗星決戦から覚醒HYPER、Over The Rainbowと覚醒DRIVEへ。",
    intro: "設定1のAT約1/471.9から設定6の約1/392.3までを反映。CZ、AT、上位AT、1000枚上乗せループの覚醒DRIVEを簡易体験できます。",
    points: ["設定1 AT約1/471.9", "覚醒HYPERから上位ATへ", "覚醒DRIVEは1000枚上乗せ×約50%ループ"],
    specs: [["AT（設定1）", "約1/471.9"], ["AT（設定6）", "約1/392.3"], ["通常AT純増", "約2.0枚/G"], ["上位AT純増", "約6.0枚/G"], ["上位AT", "Over The Rainbow"], ["最強特化", "覚醒DRIVE"], ["設定", "1〜6ランダム"], ["コンプリート", "19,000枚"]],
    sim: { kind: "slot", triggerLabel: "彗星決戦", triggerRate: 260.0, triggerSuccess: 0.55, mainLabel: "覚醒HYPER", mainRate: 471.9, base50: 31.5, coinUnit: 4.1, normalMin: 300, normalMax: 1200, atPureIncrease: 2.0, specialLabel: "エピソードボーナス", specialChance: 0.36, specialMin: 200, specialMax: 900, specialOutcomes: [[{ kind: "games", label: "覚醒HYPER上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]], triggerGames: 8 }, 0.60], [{ kind: "bonus", label: "エピソードボーナス", games: [[20, 0.65], [40, 0.35]], payouts: [[200, 0.65], [400, 0.35]], triggerGames: 10 }, 0.40]], upperChallenge: "覚醒の光", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "覚醒DRIVE", upperContinue: 0.50, upperPayout: 1000, upperPureIncrease: 6.0, upperSetGames: [[167, 1]], settingRates: { 1: { main: 471.9, payout: 0.978 }, 2: { main: 456.6, payout: 0.988 }, 3: { main: 427.8, payout: 1.010 }, 4: { main: 403.9, payout: 1.054 }, 5: { main: 398.3, payout: 1.102 }, 6: { main: 392.3, payout: 1.145 } } },
    articleSections: [
      { heading: "公式AT確率とCZ簡易換算", paragraphs: ["設定別AT確率は公式公表値を使用し、CZ発生率はAT確率との比率から簡易換算します。", "設定は開始時に1〜6から均等抽選し、最終結果とランキングで発表します。"] },
      { heading: "覚醒DRIVEの1000枚ループ", paragraphs: ["上位AT到達後の覚醒の光を突破すると、1000枚上乗せを約50%でループする覚醒DRIVEへ進みます。", "全役・モード・シナリオは再現せず、出玉段階とコンプリート到達を体験するモデルです。"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/collection/994/"], ["公式特設サイト", "https://www.l-gundamuc-kakuseidrive.jp/"]]
  },
  "toaru-index2-slot": {
    order: 10.19, type: "slot", theme: "violet", year: "2026年8月", maker: "藤商事", updated: "2026-11-01",
    name: "スマスロ とある魔術の禁書目録2", shortName: "スマスロ とある2",
    image: "assets/machines/toaru-index2-slot-key-visual.jpg",
    imageAlt: "スマスロ とある魔術の禁書目録2の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10516",
    catchcopy: "幻想リプレイで流れを変え、幻想BURSTと上位ATを目指す。",
    intro: "設定1のCZ約1/235.6・AT約1/398.8から設定6のCZ約1/207.2・AT約1/338.4までを反映したATシミュレーターです。",
    points: ["設定1 CZ約1/235.6・AT約1/398.8", "純増約4.0枚/G", "設定6出玉率113.3%"],
    specs: [["CZ（設定1）", "約1/235.6"], ["AT（設定1）", "約1/398.8"], ["AT（設定6）", "約1/338.4"], ["AT純増", "約4.0枚/G"], ["設定", "1〜6ランダム"], ["上位契機", "幻想BURST"]],
    sim: { kind: "slot", triggerLabel: "CZ", triggerRate: 235.6, triggerSuccess: 0.59, mainLabel: "幻想殺しRUSH", mainRate: 398.8, base50: 31.0, coinUnit: 4.0, normalMin: 260, normalMax: 1100, atPureIncrease: 4.0, specialLabel: "幻想BURST", specialChance: 0.34, specialMin: 200, specialMax: 1000, specialOutcomes: [[{ kind: "games", label: "幻想BURST", games: [[10, 0.40], [20, 0.30], [30, 0.18], [50, 0.10], [100, 0.02]], triggerGames: 8 }, 0.65], [{ kind: "bonus", label: "超電磁砲BONUS", games: [[20, 0.60], [40, 0.40]], payouts: [[200, 0.60], [400, 0.40]], triggerGames: 10 }, 0.35]], upperChallenge: "最強特化ゾーン", upperChance: 0.17, upperSuccess: 0.50, upperLabel: "上位AT", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { trigger: 235.6, main: 398.8, payout: 0.979 }, 2: { trigger: 233.4, main: 394.5, payout: 0.987 }, 3: { trigger: 230.8, main: 389.6, payout: 1.000 }, 4: { trigger: 222.3, main: 369.5, payout: 1.045 }, 5: { trigger: 215.8, main: 358.0, payout: 1.082 }, 6: { trigger: 207.2, main: 338.4, payout: 1.133 } } },
    articleSections: [
      { heading: "CZ・ATの設定別公表値を反映", paragraphs: ["設定1〜6のCZ・AT確率を個別に使い、開始時に設定を均等抽選します。", "設定は遊技中に伏せ、結果・マイ記録・機種別ランキングへ表示します。"] },
      { heading: "幻想BURSTから上位ATへ", paragraphs: ["純増約4.0枚/GのATと、平均上乗せに期待できる特化ゾーンを獲得枚数の幅で表現します。", "小役変換や全内部状態は完全再現せず、46枚貸し・5.2枚交換で収支を計算します。"] }
    ],
    sources: [["藤商事 公式機種情報", "https://www.fujimarukun.co.jp/products/l_toaru2/?search_type=2"], ["藤商事 公式特設サイト", "https://www.fujimarukun.co.jp/products/machine/l_toaru2/sp/lp.html"]]
  },
  "darling-in-the-franxx-slot": {
    order: 10.195, type: "slot", theme: "crimson", year: "2025年8月", maker: "スパイキー", updated: "2026-11-01",
    name: "L ダーリン・イン・ザ・フランキス", shortName: "スマスロ ダリフラ",
    image: "assets/machines/darling-in-the-franxx-slot-key-visual.jpg",
    imageAlt: "L ダーリン・イン・ザ・フランキスのキービジュアル",
    imageCredit: "スパイキー",
    imageSource: "https://www.l-darli-fra.jp/",
    catchcopy: "コネクトチャンスからボーナス高確をつなぎ、比翼BEATSへ。",
    intro: "CZ約1/125.1、ボーナス高確率約1/343.0の設定1から、設定6までの公表値を反映。疑似ボーナス連打と上位ATを簡易体験できます。",
    points: ["設定1 CZ約1/125.1", "ボーナス高確率約1/343.0〜1/252.3", "純増約5.0枚/G"],
    specs: [["CZ（設定1）", "約1/125.1"], ["ボーナス初当り", "約1/229.8"], ["ボーナス高確", "約1/343.0"], ["AT純増", "約5.0枚/G"], ["天井", "666G＋α"], ["設定", "1〜6ランダム"]],
    sim: { kind: "slot", triggerLabel: "コネクトチャンス", triggerRate: 125.1, triggerSuccess: 0.36, mainLabel: "ボーナス高確率", mainRate: 343.0, base50: 30.8, coinUnit: 4.0, normalMin: 240, normalMax: 1000, atPureIncrease: 5.0, specialLabel: "ダーリン・イン・ザ・ボーナス", specialChance: 0.35, specialMin: 180, specialMax: 900, specialDisplay: "bonus", cycleFlow: { phase: "BONUS HIGH MODE", label: "ボーナス高確率", statLabel: "ボーナス連", games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.68, maxRounds: 12, rewards: [[{ label: "ダーリン・イン・ザ・ボーナス", payout: 180 }, 0.55], [{ label: "エピソードボーナス", payout: 360 }, 0.30], [{ label: "フランクスBONUS", payout: 720 }, 0.15]], endLabel: "ボーナス高確率終了" }, upperChallenge: "エピソードボーナス", upperChance: 0.16, upperSuccess: 0.50, upperLabel: "比翼BEATS", upperContinue: 0.80, upperPayout: 550, settingRates: { 1: { trigger: 125.1, main: 343.0, payout: 0.978 }, 2: { trigger: 125.3, main: 334.1, payout: 0.989 }, 3: { trigger: 123.4, main: 320.1, payout: 1.006 }, 4: { trigger: 124.1, main: 298.9, payout: 1.054 }, 5: { trigger: 118.4, main: 270.3, payout: 1.105 }, 6: { trigger: 115.9, main: 252.3, payout: 1.145 } } },
    articleSections: [
      { heading: "CZとボーナス高確率を設定別に抽選", paragraphs: ["設定別CZ確率とボーナス高確率を使用し、当選後に疑似ボーナス連打を抽選します。", "設定は1〜6から均等に選び、最終結果で発表します。"] },
      { heading: "比翼BEATSまでを段階表示", paragraphs: ["ボーナスからエピソードを経て、上位ATの比翼BEATSへ進む流れを簡易化しています。", "REGスルー天井、全小役、内部レベルは再現せず、最大19,000枚でコンプリート表示します。"] }
    ],
    sources: [["公式機種サイト", "https://www.l-darli-fra.jp/"], ["フィールズ 公式発表", "https://digitalpr.jp/pdf.php?r=113746"]]
  },
  "kaguya-sama-pachinko": {
    order: 10.196, type: "pachinko", theme: "sakura", year: "2023年10月", maker: "SANKYO", updated: "2026-11-01",
    name: "Pフィーバーかぐや様は告らせたい", shortName: "Pかぐや様",
    image: "assets/machines/kaguya-sama-pachinko-key-visual.jpg",
    imageAlt: "Pフィーバーかぐや様は告らせたいのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9888",
    catchcopy: "時短を含むRUSH突入約74%。右打ちはALL約1500個。",
    intro: "約1/319.7の初当りからSTまたは時短へ進み、トータルRUSH突入約74%・継続約81%を体験できる王道STシミュレーターです。",
    points: ["大当り約1/319.7", "トータルRUSH突入約74%", "ST中はALL約1500個"],
    specs: [["大当り", "約1/319.7"], ["ST中", "約1/98.3"], ["ST突入", "約64%"], ["トータルRUSH突入", "約74%"], ["RUSH継続", "約81%"], ["ST", "160回"]],
    sim: { kind: "pachinko", hitRate: 319.7, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.5, minSpins: 10, maxSpins: 30, rushLabel: "かぐや様は告らせたいRUSH", rushEntry: 0.74, rushContinue: 0.81, firstPayoutIn: 300, firstPayoutOut: 300, rushPayouts: [[1500, 1]] },
    articleSections: [
      { heading: "ST直行と時短引き戻しを合算", paragraphs: ["初当りの約64%がST160回へ直行し、残りは時短100回へ進みます。", "時短中の引き戻しを含めたトータルRUSH突入約74%を、サイトでは1回の突入抽選へまとめています。"] },
      { heading: "右打ちはALL約1500個", paragraphs: ["RUSH中の大当りはすべて10R約1500個で、継続期待度は約81%です。", "保留、演出モード、時短とSTの途中経過は完全再現せず、17.5回/1,000円の固定条件で比較します。"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/products/machine_list/pif/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9888"]]
  },
  "toaru-index2-pachinko": {
    order: 10.197, type: "pachinko", theme: "violet", year: "2024年1月", maker: "JFJ", updated: "2026-11-01",
    name: "Pとある魔術の禁書目録2", shortName: "Pとある2",
    image: "assets/machines/toaru-index2-pachinko-key-visual.jpg",
    imageAlt: "Pとある魔術の禁書目録2のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9957",
    catchcopy: "RUSH突入70%・継続約77%。約3000個大当りも搭載。",
    intro: "約1/319.6の初当りから70%でST144回へ。約1500個と約3000個の出玉振り分けを反映したロングSTシミュレーターです。",
    points: ["大当り約1/319.6", "RUSH突入70%・継続約77%", "約3000個比率を反映"],
    specs: [["大当り", "約1/319.6"], ["ST中", "約1/99.9"], ["RUSH突入", "70%"], ["RUSH継続", "約77%"], ["ST", "144回"], ["出玉", "約1500・3000個"]],
    sim: { kind: "pachinko", hitRate: 319.6, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 17.2, minSpins: 10, maxSpins: 30, rushLabel: "とある魔術の最強激突", rushEntry: 0.70, rushContinue: 0.77, firstPayoutIn: 1800, firstPayoutOut: 1500, rushPayouts: [[1500, 0.6875], [3000, 0.3125]] },
    articleSections: [
      { heading: "初当りの70%でST144回", paragraphs: ["通常時は約1/319.6、初当りの70%でRUSHへ突入します。", "RUSHはSTリセットを含めて約77%継続の公表値を使い、途中状態を一連の演出へまとめています。"] },
      { heading: "約1500個と約3000個", paragraphs: ["初当りは約3000個＋RUSHが15%、約1500個＋RUSHが55%、約1500個通常が30%です。", "RUSH中のSTリセット20%は継続率へ含め、出玉あり大当りは約1500個と約3000個の比率へ換算しています。"] }
    ],
    sources: [["JFJ 公式機種情報", "https://www.fujimarukun.co.jp/products/p_toaru2/?search_type=1"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9957"]]
  },
  "hokuto-kyoteki-lt": {
    order: 10.198, type: "pachinko", theme: "flame", year: "2024年3月", maker: "サミー", updated: "2026-11-01",
    name: "P北斗の拳 強敵 LT", shortName: "北斗 強敵LT",
    image: "assets/machines/hokuto-kyoteki-lt-key-visual.jpg",
    imageAlt: "P北斗の拳 強敵 LTの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9971",
    catchcopy: "約1/99.9から強敵RUSH、継続約95%のHYPERへ。",
    intro: "甘デジ帯の初当りから50%で強敵RUSHへ入り、10R大当りを契機に継続約95%のHYPER強敵RUSHを目指すLTシミュレーターです。",
    points: ["大当り約1/99.9", "強敵RUSH突入50%・継続約70%", "HYPER継続約95%"],
    specs: [["大当り", "約1/99.9"], ["右打ち図柄揃い", "約1/45.2"], ["RUSH突入", "50%"], ["強敵RUSH継続", "約70%"], ["HYPER継続", "約95%"], ["出玉", "約300〜1000個"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "通常ヘソ", spinsPer1k: 18.5, minSpins: 10, maxSpins: 35, rushLabel: "強敵RUSH", rushEntry: 0.50, rushContinue: 0.70, firstPayoutIn: 400, firstPayoutOut: 400, rushPayouts: [[300, 0.60], [600, 0.20], [1000, 0.20]], upperLabel: "HYPER強敵RUSH", upperDirectChance: 0, upperUpgradeChance: 0.20, upperContinue: 0.95 },
    articleSections: [
      { heading: "強敵RUSHからHYPERへ", paragraphs: ["初当りの50%で時短50回＋残保留の強敵RUSHへ進み、継続期待度は約70%です。", "RUSH中の10R大当りを上位契機として、HYPER強敵RUSHへ移行する流れを段階表示します。"] },
      { heading: "HYPERは約95%継続", paragraphs: ["HYPER強敵RUSHは時短130回＋残保留で継続約95%。出玉は約300・600・1000個を6:2:2で抽選します。", "残保留の細かな振り分けやV入賞条件は簡略化し、18.5回/1,000円で収支を計算します。"] }
    ],
    sources: [["サミー 公式スペック", "https://www.sammy.co.jp/japanese/product/pachinko/hok_ke_tomo/spec.html"], ["P-WORLD 業界ニュース", "https://news.p-world.co.jp/articles/26665/nippon"]]
  },
  "gundam-seed-slot": {
    order: 10.199, type: "slot", theme: "aqua", year: "2025年5月", maker: "ビスティ", updated: "2026-11-01",
    name: "Lパチスロ 機動戦士ガンダムSEED", shortName: "スマスロ ガンダムSEED",
    image: "assets/machines/gundam-seed-slot-key-visual.jpg",
    imageAlt: "Lパチスロ 機動戦士ガンダムSEEDの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10255",
    catchcopy: "CZと擬似ボーナスをつなぎ、継続約96%のフリーダムへ。",
    intro: "設定別のCZ・AT初当りを反映。ストライクアタック、ストライクライド、宿命ZONEを経て上位ATを目指すシミュレーターです。",
    points: ["設定1 CZ約1/362.2・AT約1/460.1", "約31.5G/50枚・純増約6.5枚/G", "上位AT継続約96%"],
    specs: [["CZ（設定1）", "約1/362.2"], ["AT（設定1）", "約1/460.1"], ["AT（設定6）", "約1/318.4"], ["ベース", "約31.5G/50枚"], ["純増", "約6.5枚/G"], ["設定", "1〜6ランダム"]],
    sim: { kind: "slot", triggerLabel: "ストライクアタック", triggerRate: 362.2, triggerSuccess: 0.60, mainLabel: "ストライクライド", mainRate: 460.1, base50: 31.5, coinUnit: 4.0, normalMin: 260, normalMax: 1100, specialLabel: "宿命ZONE", specialChance: 0.36, specialMin: 180, specialMax: 900, specialDisplay: "bonus", cycleFlow: { phase: "STRIKE RIDE", label: "ストライクライド", statLabel: "擬似BONUSループ", games: [[15, 0.55], [30, 0.30], [50, 0.15]], continueChance: 0.74, maxRounds: 12, rewards: [[{ label: "ストライクBONUS", payout: 200 }, 0.55], [{ label: "エピソードBONUS", payout: 400 }, 0.30], [{ label: "フリーダムBONUS", payout: 800 }, 0.15]], endLabel: "ストライクライド終了" }, upperChallenge: "ストライクバースト", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "フリーダムハイパー", upperContinue: 0.96, upperPayout: 500, settingRates: { 1: { trigger: 362.2, main: 460.1, payout: 0.977 }, 2: { trigger: 377.3, main: 446.9, payout: 0.988 }, 3: { trigger: 349.1, main: 411.8, payout: 1.012 }, 4: { trigger: 309.7, main: 364.5, payout: 1.054 }, 5: { trigger: 301.6, main: 355.6, payout: 1.107 }, 6: { trigger: 266.9, main: 318.4, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別CZ・AT確率を反映", paragraphs: ["設定2のCZが設定1より重いなど、単純な並びではない公表値もそのまま使用します。", "設定は開始時に1〜6から均等抽選し、最終結果・記録・機種別ランキングで発表します。"] },
      { heading: "ボーナスループからフリーダムへ", paragraphs: ["STと擬似ボーナスを重ね、宿命ZONEとストライクバーストを経て上位ATへ進む流れを簡易化しています。", "上位ATは継続約96%を採用し、全小役・モード・ポイントは完全再現しません。"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/collection/981/"], ["フィールズ 公式発表", "https://www.tsuburaya-fields.co.jp/ir/j/files/press/2025/press_20250217a.pdf"]]
  },
  "mushoku-tensei-slot": {
    order: 10.1991, type: "slot", theme: "violet", year: "2025年12月", maker: "ニューギン", updated: "2026-11-01",
    name: "L 無職転生 ～異世界行ったら本気だす～", shortName: "スマスロ 無職転生",
    image: "assets/machines/mushoku-tensei-slot-key-visual.jpg",
    imageAlt: "L 無職転生 ～異世界行ったら本気だす～のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10395",
    catchcopy: "ヒロイン役でCZとVストックをつなぎ、上位ATへ。",
    intro: "設定別CZ・AT初当りを反映。無職CHANCE、ボーナス、Vストック特化、ターニングポイント2から上位ATを目指します。",
    points: ["設定1 CZ約1/130・AT約1/416", "約33G/50枚", "上位AT純増約4.5枚/G"],
    specs: [["CZ（設定1）", "約1/130"], ["AT（設定1）", "約1/416"], ["AT（設定6）", "約1/292"], ["ベース", "約33G/50枚"], ["上位AT純増", "約4.5枚/G"], ["設定", "1〜6ランダム"]],
    sim: { kind: "slot", triggerLabel: "無職CHANCE", triggerRate: 130.0, triggerSuccess: 0.55, mainLabel: "異世界行ったら本気だす", mainRate: 416.0, base50: 33.0, coinUnit: 3.7, normalMin: 240, normalMax: 1000, atPureIncrease: 2.8, specialLabel: "バケーションゾーン", specialChance: 0.35, specialMin: 180, specialMax: 850, specialDisplay: "coins", cycleFlow: { phase: "ISEKAI RUSH", label: "ヒロインバトル", statLabel: "ATセット継続", games: [[30, 1]], continueChance: 0.70, maxRounds: 10, rewards: [[{ label: "Vストック獲得", payout: 180 }, 0.55], [{ label: "バケーションゾーン", payout: 360 }, 0.30], [{ label: "ヒロインBONUS", payout: 720 }, 0.15]], endLabel: "異世界RUSH終了" }, upperChallenge: "ターニングポイント2", upperChance: 0.18, upperSuccess: 0.56, upperLabel: "上位AT＋オルステッド", upperContinue: 0.82, upperPayout: 560, upperPureIncrease: 4.5, settingRates: { 1: { trigger: 130, main: 416, payout: 0.977 }, 2: { trigger: 129, main: 406, payout: 0.991 }, 3: { trigger: 128, main: 394, payout: 1.009 }, 4: { trigger: 127, main: 361, payout: 1.054 }, 5: { trigger: 127, main: 327, payout: 1.095 }, 6: { trigger: 125, main: 292, payout: 1.137 } } },
    articleSections: [
      { heading: "CZ・ATを設定別に抽選", paragraphs: ["設定1のCZ約1/130・AT約1/416から設定6のCZ約1/125・AT約1/292まで、公表値を個別に使います。", "設定は遊技中に伏せ、結果・マイ記録・機種別ランキングへ表示します。"] },
      { heading: "Vストックと上位CZ", paragraphs: ["バケーションゾーンをVストック特化、成功期待度約56%のターニングポイント2を上位CZとして表現します。", "ヒロイン役、全ボーナス、セットごとの継続は簡易化し、最大19,000枚でコンプリート表示します。"] }
    ],
    sources: [["ニューギン 公式情報", "https://www.newgin.co.jp/devfaq/devfaq_tag/info/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10395"]]
  },
  "super-bingo-neo-slot": {
    order: 10.1992, type: "slot", theme: "gold", year: "2024年12月", maker: "ベルコ", updated: "2026-11-01",
    name: "Lスーパービンゴネオ", shortName: "スマスロ ビンゴネオ",
    image: "assets/machines/super-bingo-neo-slot-key-visual.jpg",
    imageAlt: "Lスーパービンゴネオのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10142",
    catchcopy: "BINGO CHANCEからHooah!、純増約5枚の加速区間へ。",
    intro: "実機の5段階設定を反映。CZからBINGO CHANCEへ入り、継続セットとHooah!によるゲーム数上乗せを簡易体験できます。",
    points: ["設定1 AT約1/449.2", "約31.4G/50枚", "設定1・2・4・5・6から抽選"],
    specs: [["AT（設定1）", "約1/449.2"], ["AT（設定6）", "約1/365.3"], ["ベース", "約31.4G/50枚"], ["純増", "約2.8・5.0枚/G"], ["天井", "999G＋α"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", triggerLabel: "THE SEG", triggerRate: 240.0, triggerSuccess: 0.53, mainLabel: "BINGO CHANCE", mainRate: 449.2, base50: 31.4, coinUnit: 4.1, normalMin: 250, normalMax: 1200, specialLabel: "Hooah!", specialChance: 0.36, specialMin: 200, specialMax: 1200, specialDisplay: "coins", cycleFlow: { phase: "BINGO CHANCE", label: "BINGO CHANCE", statLabel: "BC継続", games: [[33, 0.60], [111, 0.25], [222, 0.10], [333, 0.05]], continueChance: 0.58, maxRounds: 10, rewards: [[{ label: "BC 33G", payout: 200 }, 0.60], [{ label: "Hooah! 111G", payout: 700 }, 0.25], [{ label: "Hooah! 222G", payout: 1400 }, 0.10], [{ label: "Hooah! 333G", payout: 2100 }, 0.05]], endLabel: "BINGO CHANCE終了" }, upperChallenge: "Hooah!連続", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "加速BINGO CHANCE", upperContinue: 0.80, upperPayout: 600, settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { main: 449.2, payout: 0.973 }, 2: { main: 440.4, payout: 0.985 }, 4: { main: 404.5, payout: 1.043 }, 5: { main: 387.2, payout: 1.083 }, 6: { main: 365.3, payout: 1.149 } } },
    articleSections: [
      { heading: "実機どおり5段階設定", paragraphs: ["設定1・2・4・5・6から均等抽選し、公表されたAT初当りと出玉率を使用します。", "設定Lは通常遊技用ではないため抽選対象から除外し、CZはAT初当りからの簡易換算です。"] },
      { heading: "Hooah!と純増加速を段階表示", paragraphs: ["継続率管理のBINGO CHANCEとHooah!によるゲーム数上乗せを、獲得枚数の幅として表現します。", "数字揃い、モード、天井恩恵は完全再現せず、46枚貸し・5.2枚交換で収支を計算します。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10142"], ["ベルコ 公式サイト", "https://www.bellco.co.jp/"]]
  },
  "karakuri-circus2-slot": {
    order: 10.2, type: "slot", theme: "crimson", year: "2026年7月", maker: "SANKYO", updated: "2026-11-01",
    name: "Lパチスロ からくりサーカス2", shortName: "スマスロ からくり2",
    image: "assets/machines/karakuri-circus2-slot-key-visual.jpg",
    imageAlt: "Lパチスロ からくりサーカス2のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10485",
    catchcopy: "機械仕掛けの女神から激情ジャッジ、超からくりサーカスへ。",
    intro: "2026年導入の人気スマスロ。CZ、AT、激情ジャッジ、運命の一劇を経て純増約8枚の上位ATへ進む流れを簡易体験できます。",
    points: ["設定1 CZ約1/342・AT約1/519", "約31.8G/50枚", "通常AT約2.8枚・上位約8.0枚/G"],
    specs: [["CZ（設定1）", "約1/342"], ["AT（設定1）", "約1/519"], ["AT（設定6）", "約1/410"], ["ベース", "約31.8G/50枚"], ["コイン単価", "約4.1円"], ["通常AT純増", "約2.8枚/G"], ["上位AT純増", "約8.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", rankingVersion: "v5", triggerLabel: "機械仕掛けの女神", triggerRate: 342.0, triggerSuccess: 0.55, mainLabel: "からくりサーカス", mainRate: 519.0, base50: 31.8, coinUnit: 4.1, normalMin: 150, normalMax: 150, atPureIncrease: 2.8, specialLabel: "激情ジャッジ", specialChance: 0.50, specialMin: 100, specialMax: 300, upperChallenge: "運命の一劇", upperChance: 0.28, upperSuccess: 0.50, upperLabel: "超からくりサーカス", upperContinue: 0.50, upperPayout: 850, upperPureIncrease: 8.0, upperSetGames: [[106, 1]], karakuriJudgeFlow: true, karakuriJudgeAttempts: [[3, 0.25], [4, 0.45], [5, 0.30]], karakuriJudgeSuccess: 0.50, karakuriJudgeAwards: [[100, 0.60], [200, 0.30], [300, 0.10]], fateSuccess: 0.50, chainSuccess: 0.56, settingRates: { 1: { trigger: 342, main: 519, payout: 0.977 }, 2: { trigger: 341, main: 504, payout: 0.988 }, 3: { trigger: 339, main: 474, payout: 1.012 }, 4: { trigger: 339, main: 458, payout: 1.043 }, 5: { trigger: 327, main: 430, payout: 1.105 }, 6: { trigger: 318, main: 410, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別CZ・AT初当りを反映", paragraphs: ["設定1〜6を均等抽選し、CZ約1/342〜1/318、AT約1/519〜1/410を個別に使用します。", "上位契機の非公表設定差は加えず、全設定共通の簡易抽選です。"] },
      { heading: "純増約2.8枚から約8.0枚へ", paragraphs: ["通常ATと上位ATの出玉速度の違いを、獲得枚数の幅として表現します。", "全小役、倍率、天井、有利区間は完全再現せず、46枚貸し・5.2枚交換で比較します。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10485"], ["SANKYO 公式サイト", "https://www.sankyo-fever.jp/"]]
  },
  "magical-halloween8": {
    order: 10.3, type: "slot", theme: "violet", year: "2023年12月", maker: "コナミアミューズメント", updated: "2026-11-01",
    name: "マジカルハロウィン8", shortName: "マジハロ8",
    image: "assets/machines/magical-halloween8-key-visual.jpg",
    imageAlt: "マジカルハロウィン8のキービジュアル",
    imageCredit: "コナミアミューズメント",
    imageSource: "https://www.konami.com/amusement/psm/slot/magihallo8/",
    catchcopy: "ボーナスとカボチャンスを重ねるA＋ARTを設定ランダムで体験。",
    intro: "人気A＋ART機。ボーナス、カボチャンス、キングカボチャンス、悪カボチャンスのストック連を簡易体験できます。",
    points: ["設定1 ART初当り約1/352.2", "約34.3G/50枚・純増約1.0枚/G", "設定1〜6ランダム"],
    specs: [["ART（設定1）", "約1/352.2"], ["ART（設定6）", "約1/226.8"], ["ボーナス（設定1）", "約1/177.1"], ["ベース", "約34.3G/50枚"], ["ART純増", "約1.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "ボーナス", triggerRate: 177.1, triggerSuccess: 0.50, mainLabel: "カボチャンス", mainRate: 352.2, base50: 34.3, coinUnit: 2.4, normalMin: 180, normalMax: 800, specialLabel: "キングカボチャンス", specialChance: 0.32, specialMin: 120, specialMax: 700, specialDisplay: "bonus", cycleFlow: { phase: "KABO CHANCE", label: "カボチャンス", statLabel: "カボチャンス継続", games: 30, continueChance: 0.70, maxRounds: 12, rewards: [[{ label: "カボチャンス", payout: 90 }, 0.55], [{ label: "ボーナス当選", payout: 180 }, 0.30], [{ label: "キングカボチャンス", payout: 360 }, 0.15]], endLabel: "カボチャンス終了" }, upperChallenge: "悪カボチャンス", upperChance: 0.16, upperSuccess: 0.50, upperLabel: "スーパーカボチャンス", upperContinue: 0.80, upperPayout: 420, settingRates: { 1: { trigger: 177.1, main: 352.2, payout: 0.977 }, 2: { trigger: 175.7, main: 335.5, payout: 0.988 }, 3: { trigger: 174.3, main: 297.1, payout: 1.013 }, 4: { trigger: 171.6, main: 269.3, payout: 1.052 }, 5: { trigger: 170.2, main: 254.4, payout: 1.073 }, 6: { trigger: 167.6, main: 226.8, payout: 1.092 } } },
    articleSections: [
      { heading: "A＋ARTの二つの初当り", paragraphs: ["ボーナス合算とART初当りを設定別に使い、ボーナスからカボチャンスへつながる流れを簡易化します。", "設定1〜6は均等抽選し、結果まで伏せます。"] },
      { heading: "ストック連を段階で表現", paragraphs: ["キングカボチャンス、悪カボチャンス、スーパーカボチャンスを特化・上位段階として扱います。", "内部モード、全ボーナス、ストック個数は完全再現しない娯楽用モデルです。"] }
    ],
    sources: [["KONAMI 公式機種サイト", "https://www.konami.com/amusement/psm/slot/magihallo8/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9921"]]
  },
  "sao2-slot": {
    order: 10.4, type: "slot", theme: "aqua", year: "2026年6月", maker: "パオン・ディーピー", updated: "2026-11-01",
    name: "スロット ソードアート・オンラインⅡ", shortName: "スマスロ SAOⅡ",
    image: "assets/machines/sao2-slot-key-visual.jpg",
    imageAlt: "スロット ソードアート・オンラインⅡのキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10483",
    catchcopy: "スコードロンバトルからBoB、純増約7.2枚の上位ATへ。",
    intro: "2026年導入のスマスロ。CZスコードロンバトル、ATバレット・オブ・バレッツ、上位ATと絶剣の流れを簡易体験できます。",
    points: ["設定1 CZ約1/238.4・AT約1/386.2", "約31G/50枚・コイン単価約4.1円", "通常約3.6枚・上位約7.2枚/G"],
    specs: [["CZ（設定1）", "約1/238.4"], ["AT（設定1）", "約1/386.2"], ["AT（設定6）", "約1/269.6"], ["ベース", "約31G/50枚"], ["コイン単価", "約4.1円"], ["通常AT純増", "約3.6枚/G"], ["上位AT純増", "約7.2枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "スコードロンバトル", triggerRate: 238.4, triggerSuccess: 0.55, mainLabel: "バレット・オブ・バレッツ", mainRate: 386.2, base50: 31.0, coinUnit: 4.1, normalMin: 260, normalMax: 1100, specialLabel: "スナイパーチャンス", specialChance: 0.36, specialMin: 180, specialMax: 900, specialDisplay: "coins", cycleFlow: { phase: "BULLET OF BULLETS", label: "BoBバトル", statLabel: "BoB勝ち抜き", games: 30, continueChance: 0.72, maxRounds: 10, rewards: [[{ label: "スコードロン撃破", payout: 180 }, 0.55], [{ label: "スナイパーチャンス", payout: 360 }, 0.30], [{ label: "BoB BONUS", payout: 720 }, 0.15]], endLabel: "BoB敗退" }, upperChallenge: "BoB FINALS", upperChance: 0.18, upperSuccess: 0.50, upperLabel: "絶剣", upperContinue: 0.82, upperPayout: 580, settingRates: { 1: { trigger: 238.4, main: 386.2, payout: 0.976 }, 2: { trigger: 232.3, main: 364.3, payout: 0.988 }, 3: { trigger: 232.7, main: 368.1, payout: 1.002 }, 4: { trigger: 218.9, main: 326.8, payout: 1.053 }, 5: { trigger: 225.2, main: 340.6, payout: 1.104 }, 6: { trigger: 191.7, main: 269.6, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別CZ・AT初当りをそのまま使用", paragraphs: ["設定4が設定5より軽いなど単純な順番にならない公開値も、そのまま反映しています。", "START時に設定1〜6を均等抽選し、最終結果とランキングで設定を発表します。"] },
      { heading: "通常ATから上位ATへ", paragraphs: ["通常AT純増約3.6枚/Gと上位約7.2枚/Gの差を獲得枚数へ反映します。", "バレットサークル、モード、全小役、有利区間は簡易モデルの対象外です。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10483"], ["大都技研 公式サイト", "https://www.daitogiken.com/"]]
  },
  "oumi4-black": {
    order: 10.5, type: "pachinko", theme: "ocean", year: "2021年5月", maker: "三洋物産", updated: "2026-11-01",
    name: "P大海物語4スペシャル BLACK", shortName: "大海4SP BLACK",
    image: "assets/machines/oumi4-black-key-visual.jpg",
    imageAlt: "P大海物語4スペシャル BLACKのキービジュアル",
    imageCredit: "三洋物産",
    imageSource: "https://www.sanyobussan.co.jp/products/pk_greatsea4_special_black/index.html",
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
    image: "assets/machines/oumi-agnes-premium-key-visual.jpg",
    imageAlt: "PA大海物語Withアグネス・ラム Premium Editionのキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10511",
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
    availableFrom: "2027-01-12",
    name: "eフィーバー戦姫絶唱シンフォギア5 超デカ×スマートスタート", shortName: "シンフォギア5",
    image: "assets/machines/symphogear5-smartstart-key-visual.jpg",
    imageAlt: "eフィーバー戦姫絶唱シンフォギア5 超デカ×スマートスタートのキービジュアル",
    imageCredit: "遊技日本 発表記事",
    imageSource: "https://yugi-nippon.com/pachinko-new-machine/post-80852/",
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
    availableFrom: "2026-12-07",
    name: "e花の慶次～雲のかなたに", shortName: "花の慶次 雲のかなたに",
    image: "assets/machines/keiji-kumo-key-visual.jpg",
    imageAlt: "e花の慶次～雲のかなたにのキービジュアル",
    imageCredit: "遊技日本 新台記事",
    imageSource: "https://yugi-nippon.com/pachinko-new-machine/post-80698/",
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
    image: "assets/machines/iza-bancho-key-visual.jpg",
    imageAlt: "いざ！番長のキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10275",
    catchcopy: "刺客ゾーンを突破し、頂ZBASHから青頂ZBASHへ。",
    intro: "番長シリーズの人気スマスロ。奇数・偶数設定で特徴が変わる初当りを使い、CZ、AT、絶頂決戦から上位ATへ進む流れを簡易体験できます。",
    points: ["設定1初当り約1/386.9", "設定6初当り約1/312.1", "設定1〜6を均等ランダム"],
    specs: [["初当り（設定1）", "約1/386.9"], ["初当り（設定6）", "約1/312.1"], ["ベース", "約32G/50枚"], ["通常AT純増", "約2.8枚/G"], ["上位AT純増", "約5.0枚/G"], ["AT", "頂ZBASH"], ["上位AT", "青頂ZBASH"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "刺客ゾーン", triggerRate: 240, triggerSuccess: 0.45, mainLabel: "頂ZBASH", mainRate: 386.9, base50: 32.0, coinUnit: 4.0, normalMin: 260, normalMax: 1100, atPureIncrease: 2.8, specialLabel: "絶頂決戦～巌流島～", specialChance: 0.32, specialMin: 250, specialMax: 1000, specialOutcomes: [[{ kind: "games", label: "頂ZBASH上乗せ", games: [[10, 0.34], [20, 0.28], [30, 0.20], [50, 0.13], [100, 0.05]], triggerGames: 8 }, 0.65], [{ kind: "bonus", label: "絶頂決戦～巌流島～", games: [[20, 0.70], [40, 0.30]], payouts: [[250, 0.65], [500, 0.35]], triggerGames: 10 }, 0.35]], upperChallenge: "絶頂決戦", upperChance: 0.17, upperSuccess: 0.55, upperLabel: "青頂ZBASH", upperContinue: 0.80, upperPayout: 600, upperPureIncrease: 5.0, upperSetGames: [[50, 0.70], [100, 0.30]], settingRates: { 1: { trigger: 240, main: 386.9, payout: 0.976 }, 2: { trigger: 236, main: 368.5, payout: 0.989 }, 3: { trigger: 238, main: 375.8, payout: 1.013 }, 4: { trigger: 226, main: 332.4, payout: 1.060 }, 5: { trigger: 231, main: 351.6, payout: 1.121 }, 6: { trigger: 218, main: 312.1, payout: 1.149 } } },
    articleSections: [
      { heading: "奇数・偶数で変わる初当り", paragraphs: ["AT初当りは設定1約1/386.9から設定6約1/312.1。設定3が設定2より重いなど、公開値をそのまま使用します。", "開始時に設定1〜6を均等抽選し、設定は最終結果とランキングで発表します。"] },
      { heading: "絶頂決戦から青頂ZBASHへ", paragraphs: ["CZ刺客ゾーン、頂ZBASH、絶頂決戦～巌流島～、上位ATの順に段階化しています。", "刀ポイント、小役、モード、有利区間は完全再現せず、46枚貸し・5.2枚交換で収支を比較します。"] }
    ],
    sources: [["大都技研 公式製品情報", "https://www.daitogiken.com/products/slot/"], ["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10275"]]
  },
  "toloveru-darkness-slot": {
    order: 11.0, type: "slot", theme: "magenta", year: "2024年6月", maker: "オリンピアエステート", updated: "2026-11-01",
    name: "L ToLOVEるダークネス", shortName: "スマスロ ToLOVEる",
    image: "assets/machines/toloveru-darkness-slot-key-visual.jpg",
    imageAlt: "L ToLOVEるダークネスのキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10038",
    catchcopy: "CZから楽園計画へ。ハーレムモードで大きな一撃を狙う。",
    intro: "人気スマスロ。チャンス目からCZ、楽園計画、上位STハーレムモードへ進む流れを、実機の設定2〜6からランダム抽選して体験できます。",
    points: ["設定2 AT初当り約1/352.0", "約30G/50枚・高純増AT", "実機どおり設定2〜6から抽選"],
    specs: [["AT（設定2）", "約1/352.0"], ["AT（設定6）", "約1/311.1"], ["CZ合成", "設定2約1/177.6"], ["ベース", "約30G/50枚"], ["ボーナス純増", "約6.6枚/G"], ["ボーナス枚数", "100〜1600枚"], ["メインST", "楽園計画"], ["上位ST", "ハーレムモード"]],
    sim: { kind: "slot", triggerLabel: "とらぶるCZ", triggerRate: 177.6, triggerSuccess: 0.50, mainLabel: "楽園計画", mainRate: 352.0, base50: 30.0, coinUnit: 4.2, normalMin: 100, normalMax: 1600, atPureIncrease: 6.6, specialLabel: "ダークネス計画", specialChance: 0.35, specialMin: 100, specialMax: 1600, specialDisplay: "bonus", cycleFlow: { phase: "RAKUEN KEIKAKU", label: "楽園計画", statLabel: "楽園計画BONUS", games: [[15, 0.55], [30, 0.30], [60, 0.15]], continueChance: 0.66, maxRounds: 12, rewards: [[{ label: "100枚BONUS", payout: 100 }, 0.50], [{ label: "200枚BONUS", payout: 200 }, 0.30], [{ label: "400枚BONUS", payout: 400 }, 0.15], [{ label: "800枚BONUS", payout: 800 }, 0.04], [{ label: "1600枚BONUS", payout: 1600 }, 0.01]], endLabel: "楽園計画終了" }, upperChallenge: "ハーレム目", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "ハーレムモード", upperContinue: 0.80, upperPayout: 650, upperPureIncrease: 6.6, settingPool: [2, 3, 4, 5, 6], settingRates: { 2: { trigger: 177.6, main: 352.0, payout: 0.980 }, 3: { trigger: 174.0, main: 345.7, payout: 1.010 }, 4: { trigger: 168.0, main: 328.4, payout: 1.055 }, 5: { trigger: 162.0, main: 311.3, payout: 1.100 }, 6: { trigger: 158.0, main: 311.1, payout: 1.140 } } },
    articleSections: [
      { heading: "実機の設定構成を優先", paragraphs: ["本機は設定2・3・4・5・6と設定Lの構成です。サイトでは通常遊技向けの設定2〜6から均等抽選し、設定Lは除外します。", "選ばれた設定は最終結果、マイ記録、機種別ランキングへ残ります。"] },
      { heading: "楽園計画からハーレムモードへ", paragraphs: ["CZ、メインST楽園計画、ダークネス計画、上位STハーレムモードを段階抽選で表現します。", "全チャンス目、ポイント、STキャラ、内部状態は簡易モデルの対象外です。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10038"], ["平和 公式製品情報", "https://www.heiwanet.co.jp/products/pachislot/l-toloveru-darkness/"]]
  },
  "biohazard5-slot": {
    order: 11.1, type: "slot", theme: "violet", year: "2025年3月", maker: "エンターライズ", updated: "2026-11-01",
    name: "スマスロ バイオハザード5", shortName: "スマスロ バイオ5",
    image: "assets/machines/biohazard5-slot-key-visual.jpg",
    imageAlt: "スマスロ バイオハザード5の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10217",
    catchcopy: "増殖上乗せの名機が復活。上位ATは純増約4.0枚。",
    intro: "人気シリーズのスマスロ。パニックゾーン、ハザードラッシュ、ウロボロス、上位CZからプレミアムハザードラッシュへ進む流れを簡易体験できます。",
    points: ["設定1 AT約1/325.8", "設定6 AT約1/236.2", "通常AT約2.5枚・上位約4.0枚/G"],
    specs: [["AT（設定1）", "約1/325.8"], ["AT（設定6）", "約1/236.2"], ["ベース", "約33G/50枚"], ["通常AT純増", "約2.5枚/G"], ["上位AT純増", "約4.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "パニックゾーン", triggerRate: 220, triggerSuccess: 0.48, mainLabel: "ハザードラッシュ", mainRate: 325.8, base50: 33.0, coinUnit: 3.7, normalMin: 260, normalMax: 1100, specialLabel: "シューティングバースト", specialChance: 0.35, specialMin: 200, specialMax: 1000, specialOutcomes: [[{ kind: "games", label: "増殖上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]], triggerGames: 10 }, 0.65], [{ kind: "bonus", label: "エピソードBONUS", games: [[20, 0.60], [40, 0.40]], payouts: [[200, 0.60], [400, 0.40]], triggerGames: 12 }, 0.35]], upperChallenge: "クライマックスウェスカーゾーン", upperChance: 0.16, upperSuccess: 0.50, upperLabel: "プレミアムハザードラッシュ", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { trigger: 220, main: 325.8, payout: 0.978 }, 2: { trigger: 215, main: 317.0, payout: 0.990 }, 3: { trigger: 207, main: 299.0, payout: 1.020 }, 4: { trigger: 194, main: 274.0, payout: 1.060 }, 5: { trigger: 184, main: 254.0, payout: 1.100 }, 6: { trigger: 174, main: 236.2, payout: 1.149 } } },
    articleSections: [
      { heading: "設定別AT初当り", paragraphs: ["AT初当りは設定1約1/325.8から設定6約1/236.2。開始時に設定1〜6を均等抽選し、結果で設定を発表します。", "CZ確率の詳細は代表値へまとめ、未公表の設定差を独自に追加しません。"] },
      { heading: "増殖と上位AT", paragraphs: ["通常AT中の増殖上乗せ、シューティングバースト、上位CZ、プレミアムハザードラッシュを一連の段階で表現します。", "ウロボロス中の全小役やエピソードの組み合わせは完全再現しない娯楽用モデルです。"] }
    ],
    sources: [["フィールズ 発表資料", "https://www.tsuburaya-fields.co.jp/ir/j/files/press/2024/press_20241217a.pdf"], ["P-WORLD 業界ニュース", "https://news.p-world.co.jp/articles/30192/amusement"]]
  },
  "yoshimune-slot": {
    order: 11.2, type: "slot", theme: "gold", year: "2025年4月", maker: "サボハニ", updated: "2026-11-01",
    name: "吉宗", shortName: "スマスロ 吉宗",
    image: "assets/machines/yoshimune-slot-key-visual.jpg",
    imageAlt: "吉宗の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10242",
    catchcopy: "711枚BIGと1G連。裏鷹狩りで一撃を狙う。",
    intro: "初代のゲーム性を受け継ぐ人気スマスロ。高確率、711枚BIG、1G連、裏鷹狩りまでを設定1〜6ランダムで簡易体験できます。",
    points: ["設定1初当り約1/378.9", "設定6初当り約1/292.4", "BIG約711枚・純増約7.11枚/G"],
    specs: [["初当り（設定1）", "約1/378.9"], ["初当り（設定6）", "約1/292.4"], ["ベース", "約33G/50枚"], ["BIG", "約711枚"], ["REG", "約72枚"], ["BIG：REG", "約6：4"], ["純増", "約7.11枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "高確率", triggerRate: 230, triggerSuccess: 0.48, mainLabel: "吉宗BONUS", mainRate: 378.9, base50: 33.0, coinUnit: 4.0, normalMin: 72, normalMax: 711, normalAwards: [[{ label: "BIG BONUS", payout: 711, games: 100 }, 0.60], [{ label: "REG BONUS", payout: 72, games: 10 }, 0.40]], atPureIncrease: 7.11, specialLabel: "1G連", specialChance: 0.35, specialMin: 72, specialMax: 711, specialDisplay: "bonus", cycleFlow: { phase: "YOSHIMUNE BONUS", label: "1G連ジャッジ", statLabel: "ボーナス連", games: [[100, 0.60], [10, 0.40]], continueChance: 0.35, maxRounds: 8, rewards: [[{ label: "BIG BONUS", payout: 711 }, 0.60], [{ label: "REG BONUS", payout: 72 }, 0.40]], endLabel: "1G連終了" }, upperChallenge: "鷹狩り", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "裏鷹狩り", upperContinue: 0.80, upperPayout: 711, upperPureIncrease: 7.11, upperSetGames: [[10, 0.40], [100, 0.60]], settingRates: { 1: { trigger: 230, main: 378.9, payout: 0.978 }, 2: { trigger: 225, main: 369.6, payout: 0.991 }, 3: { trigger: 219, main: 358.8, payout: 1.006 }, 4: { trigger: 205, main: 335.1, payout: 1.041 }, 5: { trigger: 195, main: 318.5, payout: 1.071 }, 6: { trigger: 180, main: 292.4, payout: 1.120 } } },
    articleSections: [
      { heading: "711枚BIGと設定別初当り", paragraphs: ["初当りは設定1約1/378.9から設定6約1/292.4。設定1〜6を均等抽選し、選ばれた設定の初当りを使用します。", "通常時のボーナスはBIG約711枚・REG約72枚。公開されているBIG：REG約6：4を簡易抽選へ反映しています。"] },
      { heading: "1G連から裏鷹狩りへ", paragraphs: ["BIG中の7揃いなどによる1G連と、複数の1G連から到達する裏鷹狩りを特化・上位段階として表現します。", "モード移行、松解除、天井、全小役は再現せず、46枚貸し・5.2枚交換で比較します。"] }
    ],
    sources: [["大都技研 公式製品情報", "https://www.daitogiken.com/contents/product/slot/yoshimunes/"], ["一撃 解析情報", "https://1geki.jp/slot/l_yoshimune/"]]
  },
  "oumi4-black-plus": {
    order: 11.3, type: "pachinko", theme: "ocean", year: "2026年12月導入予定", maker: "三洋物産", updated: "2026-11-01",
    availableFrom: "2026-12-07",
    name: "P大海物語4スペシャル BLACK PLUS", shortName: "大海4 BLACK PLUS",
    image: "assets/machines/oumi4-black-plus-key-visual.jpg",
    imageAlt: "P大海物語4スペシャル BLACK PLUSのキービジュアル",
    imageCredit: "遊技日本 発表記事",
    imageSource: "https://yugi-nippon.com/pachinko-new-machine/post-79135/",
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
    availableFrom: "2026-12-07",
    name: "e大海物語5スペシャル 319遊タイムver.", shortName: "e大海5SP 遊タイム",
    image: "assets/machines/oumi5-special-yutime-key-visual.jpg",
    imageAlt: "e大海物語5スペシャル 319遊タイムver.のキービジュアル",
    imageCredit: "三洋物産",
    imageSource: "https://www.youtube.com/watch?v=4mt14XxSo6g",
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
    availableFrom: "2026-12-07",
    name: "eフィーバーダンベル何キロ持てる？2 77ver.", shortName: "ダンベル2 77",
    image: "assets/machines/dumbbell2-77-key-visual.jpg",
    imageAlt: "eフィーバーダンベル何キロ持てる？2 77ver.のキービジュアル",
    imageCredit: "パチマガスロマガFREE 基本スペック",
    imageSource: "https://pachimaga.com/free/mach/maker-p/sankyo/e_dumbbell2_77.php",
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
    order: 11.6, type: "pachinko", theme: "flame", year: "2026年11月", maker: "ニューギン", updated: "2026-11-04",
    published: "2026-11-02",
    name: "eワンパンマン2～正義執行 99ver.", shortName: "ワンパンマン2 99",
    image: "assets/machines/onepunchman2-99-key-visual.jpg",
    imageAlt: "eワンパンマン2～正義執行 99ver.のキービジュアル",
    imageCredit: "遊技日本 発表記事",
    imageSource: "https://yugi-nippon.com/pachinko-new-machine/post-80495/",
    catchcopy: "デカスタ×約1/99.9。RUSH中は約22%で5040個。",
    intro: "2026年11月2日から導入が始まったデカスタ搭載の甘デジ。初当り約1/99.9、RUSH突入40%、SHOW DOWN約1/96.5、ST66回の流れと大きな出玉振り分けを簡易体験できます。",
    points: ["大当り約1/99.9・RUSH40%", "SHOW DOWN約1/96.5・ST66回", "RUSH中約22%で約5040個"],
    specs: [["大当り", "約1/99.9"], ["SHOW DOWN", "約1/96.5"], ["RUSH突入", "40%"], ["RUSH継続", "約50%"], ["ST", "66回"], ["最大出玉", "約5040個"]],
    sim: { kind: "pachinko", hitRate: 99.9, hitLabel: "初当り", startType: "デカスタ", spinsPer1k: 25.0, minSpins: 16, maxSpins: 40, rushLabel: "HERO RUSH", rushEntry: 0.40, rushContinue: 0.50, firstPayoutIn: 252, firstPayoutOut: 252, rushPayouts: [[1120, 0.56], [5040, 0.22], [0, 0.22]] },
    articleSections: [
      { heading: "デカスタ×約1/99.9", paragraphs: ["通常時の大当りは約1/99.9で、40%がHERO RUSHへ進みます。", "固定回転率は比較用に25.0回/1,000円とし、実店舗の回転率を保証しません。"] },
      { heading: "SHOW DOWNは約1/96.5", paragraphs: ["HERO RUSHは66回のSTで、RUSH中のSHOW DOWN発生率は約1/96.5です。", "ST継続率は約50%。シミュレーターではSHOW DOWNの発生と出玉振り分けを一連の当落としてまとめます。"] },
      { heading: "約22%で5040個", paragraphs: ["RUSH中は約56%が1120個、約22%が5040個、約22%がSTリセットです。", "共通モデルではSTリセットを出玉0の継続結果として扱い、約50%のRUSH継続へまとめます。"] }
    ],
    sources: [["一撃 導入後機種情報", "https://1geki.jp/pachinko/e_onepanman2_99/"], ["HAZUSE DATA 基本スペック", "https://data.hazuse.com/index.php?machine_code=PX0396"], ["遊技日本 発表記事", "https://yugi-nippon.com/pachinko-new-machine/post-80495/"]]
  },
  "bancho-banzuke": {
    order: 11.7, type: "slot", theme: "crimson", year: "2026年12月導入予定", maker: "パオン・ディーピー", updated: "2026-11-01",
    availableFrom: "2026-12-07",
    name: "押忍！番長番付", shortName: "番長番付",
    image: "assets/machines/bancho-banzuke-key-visual.jpg",
    imageAlt: "押忍！番長番付のキービジュアル",
    imageCredit: "導入前スペック解説",
    imageSource: "https://pachislot.win/smaslot-bancho-banzuke-guide/",
    catchcopy: "押忍ポイントから漢磨きチャレンジ、純増約7枚の轟チャンスへ。",
    intro: "2026年12月7日導入予定のスマスロ。偶数設定が軽いAT初当りと、CZ、轟チャンス、上位ルートを簡易体験できます。",
    points: ["設定1 AT約1/365.1", "設定6 AT約1/272.3", "純増約7.0枚/G"],
    specs: [["AT（設定1）", "約1/365.1"], ["AT（設定6）", "約1/272.3"], ["ベース", "約32G/50枚"], ["コイン単価", "約3.4円"], ["AT純増", "約7.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "漢磨きチャレンジ", triggerRate: 210, triggerSuccess: 0.50, mainLabel: "轟チャンス", mainRate: 365.1, base50: 32.0, coinUnit: 3.4, normalMin: 260, normalMax: 1100, atPureIncrease: 7.0, specialLabel: "番付決戦", specialChance: 0.34, specialMin: 220, specialMax: 950, specialOutcomes: [[{ kind: "games", label: "轟チャンス上乗せ", games: [[10, 0.42], [20, 0.30], [30, 0.18], [50, 0.08], [100, 0.02]], triggerGames: 8 }, 0.58], [{ kind: "bonus", label: "番付決戦勝利", games: [[20, 0.65], [40, 0.35]], payouts: [[280, 0.65], [560, 0.35]], triggerGames: 10 }, 0.42]], upperChallenge: "頂上決戦", upperChance: 0.17, upperSuccess: 0.52, upperLabel: "絶頂轟チャンス", upperContinue: 0.80, upperPayout: 600, upperPureIncrease: 7.0, upperSetGames: [[50, 0.70], [100, 0.30]], settingRates: { 1: { trigger: 210, main: 365.1, payout: 0.976 }, 2: { trigger: 190, main: 315.6, payout: 0.986 }, 3: { trigger: 207, main: 359.7, payout: 1.001 }, 4: { trigger: 177, main: 282.1, payout: 1.050 }, 5: { trigger: 201, main: 344.1, payout: 1.130 }, 6: { trigger: 170, main: 272.3, payout: 1.140 } } },
    articleSections: [
      { heading: "偶数設定が軽いAT初当り", paragraphs: ["AT初当りは設定1約1/365.1から設定6約1/272.3。設定2・4・6が同じ隣接奇数より軽い公開値を使用します。", "設定1〜6を開始時に均等抽選し、結果とランキングで設定を発表します。"] },
      { heading: "純増約7枚の轟チャンス", paragraphs: ["押忍ポイント、漢磨きチャレンジ、轟チャンスの流れを段階的に体験できます。", "未公表の上位ルートは比較用固定抽選であり、実機の確率として扱いません。"] },
      { heading: "導入前情報", paragraphs: ["2026年12月7日導入予定のため、導入前公表値を使用しています。", "天井、全小役、モードは正式解析後に見直します。"] }
    ],
    sources: [["P-WORLD 新台スケジュール", "https://www.p-world.co.jp/database/machine.html"], ["導入前スペック解説", "https://pachislot.win/smaslot-bancho-banzuke-guide/"]]
  },
  "zegapain-etr": {
    order: 11.8, type: "slot", theme: "aqua", year: "2026年12月導入予定", maker: "山佐ネクスト", updated: "2026-11-01",
    availableFrom: "2026-12-07",
    name: "スマスロゼーガペインETR", shortName: "ゼーガペインETR",
    image: "assets/machines/zegapain-etr-key-visual.jpg",
    imageAlt: "スマスロゼーガペインETRのキービジュアル",
    imageCredit: "情報島＋ 発表記事",
    imageSource: "https://p-johojima.jp/new_machine/post-39000/",
    catchcopy: "CZからボーナス、ゼーガバースト、85%の輪廻へ。",
    intro: "2026年12月7日導入予定。ST式CZ、3種類のボーナス、ゼーガバースト、プレミアムATへ進むシリーズ最新作です。",
    points: ["設定1 CZ約1/159.4・BONUS約1/323.9", "通常AT純増約0.7枚/G", "プレミアムAT純増約7.0枚/G"],
    specs: [["CZ（設定1）", "約1/159.4"], ["BONUS（設定1）", "約1/323.9"], ["BONUS（設定6）", "約1/248.8"], ["通常AT純増", "約0.7枚/G"], ["上位純増", "約7.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "ゼーガシステム", triggerRate: 159.4, triggerSuccess: 0.50, mainLabel: "リザレクションボーナス", mainRate: 323.9, base50: 34.0, coinUnit: 3.0, normalMin: 220, normalMax: 1000, atPureIncrease: 0.7, specialLabel: "ゼーガバースト", specialChance: 0.34, specialMin: 200, specialMax: 1000, specialOutcomes: [[{ kind: "games", label: "ゼーガバースト上乗せ", games: [[30, 0.42], [50, 0.30], [100, 0.18], [200, 0.08], [300, 0.02]], triggerGames: 10 }, 0.62], [{ kind: "bonus", label: "リザレクションボーナス再点灯", games: [[30, 0.65], [60, 0.35]], payouts: [[210, 0.65], [420, 0.35]], triggerGames: 10 }, 0.38]], upperChallenge: "ハル決戦", upperChance: 0.18, upperSuccess: 0.70, upperLabel: "ゼーガバースト是我", upperContinue: 0.85, upperPayout: 580, upperPureIncrease: 7.0, upperSetGames: [[50, 0.70], [100, 0.30]], settingRates: { 1: { trigger: 159.4, main: 323.9, payout: 0.975 }, 2: { trigger: 156.8, main: 313.6, payout: 0.988 }, 3: { trigger: 150.1, main: 296.0, payout: 1.007 }, 4: { trigger: 144.9, main: 276.8, payout: 1.045 }, 5: { trigger: 138.9, main: 256.9, payout: 1.094 }, 6: { trigger: 136.0, main: 248.8, payout: 1.125 } } },
    articleSections: [
      { heading: "CZとBONUSの設定差", paragraphs: ["設定1のCZ約1/159.4・BONUS約1/323.9から、設定6のCZ約1/136.0・BONUS約1/248.8までを個別に使用します。", "設定は開始時に均等抽選し、最終結果まで伏せます。"] },
      { heading: "ハル決戦から輪廻へ", paragraphs: ["ゼーガバーストは純増約0.7枚/Gのボーナス高確率AT。ハル決戦の勝利期待度約70%から、継続85%の輪廻を目指します。", "全ボーナス振り分けと上乗せ契機は簡易モデルへまとめています。"] }
    ],
    sources: [["パチ＆スロ必勝本 基本スペック", "https://p.hisshobon.jp/machine/4820/1/1"], ["情報島＋ 発表記事", "https://p-johojima.jp/new_machine/post-39000/"]]
  },
  "twin-angel2-smart": {
    order: 11.9, type: "slot", theme: "sakura", year: "2026年12月導入予定", maker: "サミー", updated: "2026-11-01",
    availableFrom: "2026-12-07",
    name: "スマスロ 快盗天使ツインエンジェル2", shortName: "スマスロ ツイン2",
    image: "assets/machines/twin-angel2-smart-key-visual.jpg",
    imageAlt: "スマスロ 快盗天使ツインエンジェル2のキービジュアル",
    imageCredit: "サミー",
    imageSource: "https://www.youtube.com/watch?v=K5b-qYHcDGQ",
    catchcopy: "5号機の名作をA＋ARTで完全リメイク。",
    intro: "2026年12月7日導入予定。リアルボーナス、エンジェルチャンス、33Gのエンジェルタイムを重ねる遊びやすいA＋ART機です。",
    points: ["設定1 BONUS合算約1/169.8", "設定6 BONUS合算約1/140.3", "ART純増約0.5枚/G"],
    specs: [["BONUS（設定1）", "約1/169.8"], ["BONUS（設定6）", "約1/140.3"], ["ベース", "約35G/50枚"], ["コイン単価", "約2.3円"], ["ART純増", "約0.5枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "エンジェルチャンス", triggerRate: 220, triggerSuccess: 0.45, mainLabel: "エンジェルタイム", mainRate: 169.8, base50: 35.0, coinUnit: 2.3, normalMin: 120, normalMax: 600, atPureIncrease: 0.5, specialLabel: "スペシャルBIG", specialChance: 0.26, specialMin: 252, specialMax: 720, specialDisplay: "bonus", cycleFlow: { phase: "ANGEL TIME", label: "エンジェルタイム", statLabel: "ARTセット", games: 30, continueChance: 0.58, maxRounds: 12, rewards: [[{ label: "エンジェルタイム継続", payout: 15 }, 0.45], [{ label: "NORMAL BIG", payout: 204 }, 0.35], [{ label: "スペシャルBIG", payout: 252 }, 0.20]], endLabel: "エンジェルタイム終了" }, upperChallenge: "エンジェルラッシュ", upperChance: 0.14, upperSuccess: 0.55, upperLabel: "スーパーエンジェルタイム", upperContinue: 0.75, upperPayout: 380, upperPureIncrease: 0.5, settingRates: { 1: { trigger: 220, main: 169.8, payout: 0.979 }, 2: { trigger: 214, main: 165.0, payout: 0.990 }, 3: { trigger: 205, main: 158.0, payout: 1.010 }, 4: { trigger: 194, main: 151.0, payout: 1.040 }, 5: { trigger: 185, main: 145.0, payout: 1.070 }, 6: { trigger: 176, main: 140.3, payout: 1.091 } } },
    articleSections: [
      { heading: "リアルボーナス搭載A＋ART", paragraphs: ["BONUS合算は設定1約1/169.8から設定6約1/140.3。選ばれた設定の合算確率を使用します。", "SPECIAL BIG約252枚、BIG約203枚、MIDDLE約49枚の違いは獲得幅へまとめています。"] },
      { heading: "33Gのエンジェルタイム", paragraphs: ["BONUS後のエンジェルチャンスから、1セット33G・純増約0.5枚/GのARTへ進みます。", "エンドカード全種類や全小役は再現せず、低コイン単価の遊びやすさと連続結果を比べるモデルです。"] }
    ],
    sources: [["Sammy 公式ティザー", "https://www.youtube.com/watch?v=K5b-qYHcDGQ"], ["スロベース 基本スペック", "https://slobase.jp/machines/twin-angel2"]]
  },
  "blue-reflection-tie": {
    order: 12.0, type: "slot", theme: "ice", year: "2026年12月導入予定", maker: "オリンピア", updated: "2026-11-01",
    availableFrom: "2026-12-21",
    name: "Lブルーリフレクション帝", shortName: "ブルーリフレクション帝",
    image: "assets/machines/blue-reflection-tie-key-visual.jpg",
    imageAlt: "Lブルーリフレクション帝のキービジュアル",
    imageCredit: "P-WORLD 発表記事",
    imageSource: "https://news.p-world.co.jp/articles/34689/amusement",
    catchcopy: "大鎌の全刈上乗せから、純増約7.5枚の上位ATへ。",
    intro: "2026年12月21日導入予定。軽めのCZ＋AT合算初当りから、リフレクションチャージ、全刈上乗せ、上位ATへ進みます。",
    points: ["設定1初当り合算約1/162.6", "通常AT純増約4.0枚/G", "上位AT純増約7.5枚/G"],
    specs: [["初当り（設定1）", "約1/162.6"], ["初当り（設定6）", "約1/150.1"], ["通常AT純増", "約4.0枚/G"], ["上位AT純増", "約7.5枚/G"], ["上位挑戦", "成功期待約60%"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "リフレクションチャージ", triggerRate: 162.6, triggerSuccess: 0.50, mainLabel: "BLUE REFLECTION RUSH", mainRate: 330, base50: 32.0, coinUnit: 3.4, normalMin: 220, normalMax: 1000, atPureIncrease: 4.0, specialLabel: "全刈上乗せ", specialChance: 0.36, specialMin: 220, specialMax: 1100, specialOutcomes: [[{ kind: "games", label: "全刈上乗せ", games: [[10, 0.38], [20, 0.30], [30, 0.20], [50, 0.10], [100, 0.02]], triggerGames: 8 }, 0.68], [{ kind: "bonus", label: "リフレクションBONUS", games: [[20, 0.65], [40, 0.35]], payouts: [[200, 0.65], [400, 0.35]], triggerGames: 10 }, 0.32]], upperChallenge: "リフレクションチャレンジ", upperChance: 0.18, upperSuccess: 0.60, upperLabel: "BLUE REFLECTION帝", upperContinue: 0.82, upperPayout: 600, upperPureIncrease: 7.5, upperSetGames: [[40, 0.70], [80, 0.30]], settingRates: { 1: { trigger: 162.6, main: 330, payout: 0.978 }, 2: { trigger: 161.0, main: 324, payout: 0.988 }, 3: { trigger: 158.1, main: 315, payout: 1.008 }, 4: { trigger: 154.8, main: 302, payout: 1.035 }, 5: { trigger: 152.0, main: 292, payout: 1.064 }, 6: { trigger: 150.1, main: 284, payout: 1.106 } } },
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
    image: "assets/machines/princess-principal-key-visual.jpg",
    imageAlt: "eプリンセス・プリンシパルのキービジュアル",
    imageCredit: "PShort スペック",
    imageSource: "https://pshort.jp/pachi/e_princess_principal/",
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
    image: "assets/machines/granbelm-249-key-visual.jpg",
    imageAlt: "eグランベルム 249ver.のキービジュアル",
    imageCredit: "情報島＋ スペック",
    imageSource: "https://p-johojima.jp/machine_spec/post-40142/",
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
    availableFrom: "2026-12-07",
    name: "eフィーバーBASTARD!! -暗黒の破壊神- Light ver.", shortName: "BASTARD!! Light",
    image: "assets/machines/bastard-light-key-visual.jpg",
    imageAlt: "eフィーバーBASTARD!! -暗黒の破壊神- Light ver.のキービジュアル",
    imageCredit: "導入前発表記事",
    imageSource: "https://parlourfullslotl.com/archives/187002",
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
    availableFrom: "2026-12-07",
    name: "e女神のカフェテラス ヒロインsコレクション", shortName: "女神のカフェテラス コレクション",
    image: "assets/machines/megami-cafe-collection-key-visual.jpg",
    imageAlt: "e女神のカフェテラス ヒロインsコレクションのキービジュアル",
    imageCredit: "遊技日本 発表記事",
    imageSource: "https://yugi-nippon.com/pachinko-new-machine/post-80057/",
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
    image: "assets/machines/vivy-slot-key-visual.jpg",
    imageAlt: "スロット Vivy -Fluorite Eye's Song-のキービジュアル",
    imageCredit: "大都技研 公式機種情報",
    imageSource: "https://www.daitogiken.com/contents/product/slot/vivy/",
    catchcopy: "レア役再生から純増約3.2枚の差枚数ATへ。上位ATなしの一本道。",
    intro: "2026年11月2日導入。周期とアクセスチャンスから、差枚数管理ATプロジェクトシンギュラリティを目指します。",
    points: ["設定1 AT約1/276.5", "設定6 AT約1/210.3", "AT純増約3.2枚/G"],
    specs: [["AT（設定1）", "約1/276.5"], ["AT（設定6）", "約1/210.3"], ["ベース", "約31G/50枚"], ["コイン単価", "約3.0円"], ["AT純増", "約3.2枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "アクセスチャンス", triggerRate: 180, triggerSuccess: 0.65, mainLabel: "プロジェクトシンギュラリティ", mainRate: 276.5, base50: 31.0, coinUnit: 3.0, normalMin: 180, normalMax: 900, atPureIncrease: 3.2, specialLabel: "OVER DRIVE", specialChance: 0.32, specialMin: 220, specialMax: 710, specialOutcomes: [[{ kind: "games", label: "OVER DRIVE", games: [[10, 0.44], [20, 0.30], [30, 0.16], [50, 0.08], [100, 0.02]], triggerGames: 8 }, 0.65], [{ kind: "bonus", label: "SINGULARITY BONUS", games: [[20, 0.65], [40, 0.35]], payouts: [[160, 0.65], [320, 0.35]], triggerGames: 10 }, 0.35]], upperChallenge: "Fluorite Eye's Strike", upperChance: 0.14, upperSuccess: 0.55, upperLabel: "プレミアム上乗せ", upperContinue: 0.50, upperPayout: 800, upperPureIncrease: 3.2, upperSetGames: [[100, 0.70], [200, 0.30]], settingRates: { 1: { main: 276.5, payout: 0.977 }, 2: { main: 251.7, payout: 0.987 }, 3: { main: 272.1, payout: 1.002 }, 4: { main: 222.8, payout: 1.047 }, 5: { main: 235.9, payout: 1.083 }, 6: { main: 210.3, payout: 1.128 } } },
    articleSections: [
      { heading: "偶数設定が軽いAT初当り", paragraphs: ["AT初当りは設定1約1/276.5から設定6約1/210.3で、設定4が設定5より軽い公開値をそのまま使用します。", "設定1〜6を均等抽選し、結果とランキングで抽選設定を表示します。"] },
      { heading: "上位ATのない差枚数管理AT", paragraphs: ["ATは初期100枚＋α、純増約3.2枚/G。SINGULARITY BATTLE、OVER DRIVE、マツモトチャンスで枚数を伸ばします。", "上位ATはないため、最終段階はFluorite Eye's Strikeなどの大きな上乗せ結果として表現します。"] }
    ],
    sources: [["パチ＆スロ必勝本 AT解説", "https://p.hisshobon.jp/machine/4842/1/14"], ["設定差・基本スペック", "https://slothack.net/matome/206904/"]]
  },
  "haihai-shiosai-re": {
    order: 12.6, type: "slot", theme: "ocean", year: "2026年11月導入予定", maker: "パイオニア", updated: "2026-11-01",
    availableFrom: "2026-11-16",
    name: "スマート沖スロ ハイハイシオサイRe", shortName: "ハイハイシオサイRe",
    image: "assets/machines/haihai-shiosai-re-key-visual.jpg",
    imageAlt: "スマート沖スロ ハイハイシオサイReの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10553",
    catchcopy: "ハイビスカス告知から約360枚BIG。32G天国と1G連を狙う。",
    intro: "2026年11月16日導入予定。BIG約360枚・REG約120枚と、32G以内の天国連を組み合わせた完全告知タイプです。",
    points: ["設定1合算約1/193.3", "設定6合算約1/150.3", "BIG約360枚・純増約9枚/G"],
    specs: [["合算（設定1）", "約1/193.3"], ["合算（設定6）", "約1/150.3"], ["BIG", "約360枚"], ["REG", "約120枚"], ["BONUS純増", "約9.0枚/G"], ["天国", "32G以内"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "ハイビスカス告知", triggerRate: 193.3, triggerSuccess: 0.72, mainLabel: "BONUS", mainRate: 193.3, base50: 32.0, coinUnit: 3.9, normalMin: 120, normalMax: 360, normalAwards: [[{ label: "BIG BONUS", payout: 360, games: 40 }, 0.72], [{ label: "REG BONUS", payout: 120, games: 13 }, 0.28]], normalAwardsNote: "設定1の公表確率から算出した目安です", atPureIncrease: 9.0, specialLabel: "BIG 1G連", specialChance: 0.24, specialMin: 360, specialMax: 720, specialDisplay: "bonus", cycleFlow: { phase: "SHIOSAI HEAVEN", label: "天国32G", statLabel: "天国BONUS連", games: 32, continueChance: 0.72, maxRounds: 20, rewards: [[{ label: "BIG BONUS", payout: 360 }, 0.72], [{ label: "REG BONUS", payout: 120 }, 0.28]], endLabel: "天国モード終了" }, upperChallenge: "天国32G", upperChance: 0.50, upperSuccess: 0.55, upperLabel: "ハイシオ天国", upperContinue: 0.82, upperPayout: 360, upperPureIncrease: 9.0, upperSetGames: [[40, 1]], settingRates: { 1: { trigger: 193.3, main: 193.3, payout: 0.974 }, 2: { trigger: 188.4, main: 188.4, payout: 0.987 }, 4: { trigger: 168.0, main: 168.0, payout: 1.045 }, 5: { trigger: 161.9, main: 161.9, payout: 1.069 }, 6: { trigger: 150.3, main: 150.3, payout: 1.114 } } },
    articleSections: [
      { heading: "実機搭載の5段階設定", paragraphs: ["設定は1・2・4・5・6から均等抽選し、設定3は抽選しません。ボーナス合算は設定1約1/193.3から設定6約1/150.3です。", "結果とランキングには抽選設定を表示します。"] },
      { heading: "BIG約360枚と32G天国", paragraphs: ["BIGは約360枚、REGは約120枚。BIG当選時の約50%で天国へ進み、32G以内の連チャンを狙います。", "ハイシオ天国の平均連数は簡易ループへまとめ、全ボーナス比率は完全再現しません。"] }
    ],
    sources: [["P-WORLD 新台スケジュール", "https://www.p-world.co.jp/database/machine/introduce_calendar.cgi?type=Pachi"], ["スペック・天国解説", "https://tennabi.jp/haihai-shiosai-re/"]]
  },
  "akamata-slot": {
    order: 12.7, type: "slot", theme: "crimson", year: "2026年12月導入予定", maker: "オーイズミ", updated: "2026-11-01",
    availableFrom: "2026-12-07",
    name: "Lアカマター", shortName: "Lアカマター",
    image: "assets/machines/akamata-slot-key-visual.jpg",
    imageAlt: "Lアカマターのキービジュアル",
    imageCredit: "遊技日本 発表記事",
    imageSource: "https://yugi-nippon.com/pachinko-new-machine/post-79802/",
    catchcopy: "純増約6枚の疑似ボーナス。32G天国からボトルキープ連へ。",
    intro: "2026年12月7日導入予定。3種類の疑似ボーナス、天国、1G連ストック、約75%ループのバブリーモードを搭載します。",
    points: ["設定1初当り約1/330.0", "設定6初当り約1/277.4", "バブリーモード約75%ループ"],
    specs: [["初当り（設定1）", "約1/330.0"], ["初当り（設定6）", "約1/277.4"], ["ベース", "約28.2G/50枚"], ["コイン単価", "約4.1円"], ["ボーナス純増", "約6.0枚/G"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "ハブランプ告知", triggerRate: 330.0, triggerSuccess: 0.55, mainLabel: "疑似ボーナス", mainRate: 330.0, base50: 28.2, coinUnit: 4.1, normalMin: 180, normalMax: 720, atPureIncrease: 6.0, specialLabel: "ボトルキープ連", specialChance: 0.34, specialMin: 210, specialMax: 900, specialDisplay: "bonus", cycleFlow: { phase: "AKAMATA BONUS LOOP", label: "ボトルキープ連", statLabel: "疑似ボーナス連", games: 32, continueChance: 0.62, maxRounds: 20, rewards: [[{ label: "アカマターBONUS", payout: 210 }, 0.64], [{ label: "BIG BOTTLE BONUS", payout: 420 }, 0.26], [{ label: "バブリーBONUS", payout: 720 }, 0.10]], upperAfterRounds: 3, upperAfterRoundsAutoSuccess: false, upperOnlyAfterRounds: true, endLabel: "ボトルキープ終了" }, upperChallenge: "天国3連", upperChance: 0.20, upperSuccess: 0.55, upperLabel: "バブリーモード", upperContinue: 0.75, upperPayout: 600, upperPureIncrease: 6.0, settingRates: { 1: { trigger: 330.0, main: 330.0, payout: 0.972 }, 2: { trigger: 317.3, main: 317.3, payout: 0.990 }, 4: { trigger: 304.5, main: 304.5, payout: 1.020 }, 5: { trigger: 289.5, main: 289.5, payout: 1.060 }, 6: { trigger: 277.4, main: 277.4, payout: 1.125 } } },
    articleSections: [
      { heading: "5段階設定の初当り", paragraphs: ["実機搭載設定1・2・4・5・6から均等抽選し、初当り約1/330.0〜約1/277.4を個別に使います。", "設定3は未搭載扱いとして抽選対象から外します。"] },
      { heading: "ボトルキープとバブリーモード", paragraphs: ["疑似ボーナスは約90枚・210枚・300枚で、いずれも純増約6.0枚/Gです。", "32G天国でボトルを3個貯めた先のバブリーモードは約75%ループ。未公表の天国移行率はサイト内比較用抽選です。"] }
    ],
    sources: [["遊技日本 発表記事", "https://yugi-nippon.com/pachinko-new-machine/post-79802/"], ["設定別スペック解説", "https://pachislot.win/l-akamater-guide/"]]
  },
  "majo-to-yajuu-slot": {
    order: 12.8, type: "slot", theme: "violet", year: "2026年12月導入予定", maker: "オレンジ", updated: "2026-11-01",
    availableFrom: "2026-12-21",
    name: "スマスロ 魔女と野獣", shortName: "スマスロ 魔女と野獣",
    image: "assets/machines/majo-to-yajuu-slot-key-visual.jpg",
    imageAlt: "スマスロ 魔女と野獣のキービジュアル",
    imageCredit: "遊技日本 新台記事",
    imageSource: "https://yugi-nippon.com/pachinko-new-machine/post-80481/",
    catchcopy: "CZ突破から7GのSTへ。純増約9枚、上位BEAST MODEは約80%。",
    intro: "2026年12月21日導入予定。レゾナンスチャンスを突破し、ボーナスと7G STを重ねて上位BEAST MODEを目指します。",
    points: ["設定2 AT約1/383.2", "通常ST継続約70%", "上位ST継続約80%"],
    specs: [["CZ（設定2）", "約1/229.2"], ["AT（設定2）", "約1/383.2"], ["AT（設定6）", "約1/353.3"], ["ベース", "約30G/50枚"], ["コイン単価", "約4.7円"], ["BONUS純増", "約9.0枚/G"], ["BONUS枚数", "300〜3000枚"], ["設定", "2〜6"]],
    sim: { kind: "slot", settingPool: [2, 3, 4, 5, 6], triggerLabel: "レゾナンスチャンス", triggerRate: 229.2, triggerSuccess: 0.53, mainLabel: "Witch and the Beast", mainRate: 383.2, base50: 30.0, coinUnit: 4.7, normalMin: 250, normalMax: 1200, atPureIncrease: 9.0, specialLabel: "チャレンジボーナス", specialChance: 0.34, specialMin: 250, specialMax: 1200, specialDisplay: "bonus", cycleFlow: { phase: "WITCH AND THE BEAST", label: "BONUS ST", statLabel: "BONUS連", games: 20, continueChance: 0.70, maxRounds: 15, rewards: [[{ label: "CHALLENGE BONUS", payout: 300 }, 0.62], [{ label: "BEAST BONUS", payout: 600 }, 0.28], [{ label: "PREMIUM BONUS", payout: 1200 }, 0.10]], endLabel: "BONUS ST終了" }, upperChallenge: "永遠なる魔女", upperChance: 0.20, upperSuccess: 0.70, upperLabel: "BEAST MODE", upperContinue: 0.80, upperPayout: 650, upperPureIncrease: 9.0, settingRates: { 2: { trigger: 229.2, main: 383.2, payout: 0.979 }, 3: { trigger: 226.5, main: 381.6, payout: 0.991 }, 4: { trigger: 216.0, main: 372.2, payout: 1.041 }, 5: { trigger: 206.5, main: 360.7, payout: 1.092 }, 6: { trigger: 197.1, main: 353.3, payout: 1.137 } } },
    articleSections: [
      { heading: "設定2〜6の公開値", paragraphs: ["実機の設定2・3・4・5・6から均等抽選し、CZ約1/229.2〜約1/197.1、AT約1/383.2〜約1/353.3を個別に使います。", "設定1は抽選せず、結果とランキングには実際に選ばれた設定を表示します。"] },
      { heading: "7G STから上位へ", paragraphs: ["メインSTは7G・継続期待約70%、上位BEAST MODEは7G・継続約80%です。", "純増約9.0枚/G、150〜3000枚のボーナス幅を簡易獲得枚数にまとめています。"] }
    ],
    sources: [["P-WORLD 新台スケジュール", "https://www.p-world.co.jp/database/machine/introduce_calendar.cgi?type=Pachi"], ["導入前スペック解説", "https://slothack.net/matome/203221/"]]
  },
  "unicorn2-sairai": {
    order: 12.9, type: "pachinko", theme: "ice", year: "2024年8月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバー機動戦士ガンダムユニコーン 再来", shortName: "ユニコーン2 再来",
    image: "assets/machines/unicorn2-sairai-key-visual.jpg",
    imageAlt: "eフィーバー機動戦士ガンダムユニコーン 再来のキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10080",
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
    image: "assets/machines/rezero-season2-key-visual.jpg",
    imageAlt: "e Re:ゼロから始める異世界生活 season2の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9931",
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
    image: "assets/machines/madoka3-pachinko-key-visual.jpg",
    imageAlt: "P 魔法少女まどか☆マギカ3の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10046",
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
    image: "assets/machines/bancho-otoko-no-itadaki-key-visual.jpg",
    imageAlt: "eぱちんこ押忍！番長 漢の頂のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10218",
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
    image: "assets/machines/monster-hunter-rise-slot-key-visual.jpg",
    imageAlt: "スマスロ モンスターハンターライズのキービジュアル",
    imageCredit: "パチナビ 設定別スペック",
    imageSource: "https://pachinavi.net/machines/smasloth-monster-hunter-rise/settei/",
    catchcopy: "クエストから狩猟ボーナスへ。設定1約1/309.5〜設定6約1/230.8。",
    intro: "超抽選バトル、剥ぎ取りチャンス、上位の気焔万丈へ進む狩猟型スマスロです。",
    points: ["設定1 AT約1/309.5", "設定6 AT約1/230.8", "AT純増約2.7枚/G"],
    specs: [["AT（設定1）", "約1/309.5"], ["AT（設定6）", "約1/230.8"], ["ベース", "約32.7G/50枚"], ["通常AT純増", "約2.7枚/G"], ["上位純増", "約4.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "クエスト", triggerRate: 155, triggerSuccess: 0.50, mainLabel: "狩猟ボーナス", mainRate: 309.5, base50: 32.7, coinUnit: 3.2, normalMin: 180, normalMax: 1000, specialLabel: "剥ぎ取りチャンス", specialChance: 0.36, specialMin: 180, specialMax: 1000, specialDisplay: "coins", cycleFlow: { phase: "HUNTING BONUS", label: "狩猟ボーナス", statLabel: "モンスター討伐", games: 40, continueChance: 0.72, maxRounds: 12, rewards: [[{ label: "剥ぎ取り成功", payout: 180 }, 0.55], [{ label: "部位破壊報酬", payout: 360 }, 0.30], [{ label: "剥ぎ取りG", payout: 720 }, 0.15]], endLabel: "狩猟終了" }, upperChallenge: "百竜夜行", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "気焔万丈", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { main: 309.5, payout: 0.979 }, 2: { main: 301.4, payout: 0.988 }, 3: { main: 290.8, payout: 1.003 }, 4: { main: 256.4, payout: 1.054 }, 5: { main: 237.1, payout: 1.101 }, 6: { main: 230.8, payout: 1.143 } } },
    articleSections: [
      { heading: "設定1〜6のAT初当り", paragraphs: ["狩猟ボーナス初当りは設定1約1/309.5から設定6約1/230.8。開始時に設定1〜6を均等抽選します。", "選ばれた設定は最終結果、マイ記録、機種別ランキングへ保存します。"] },
      { heading: "超抽選バトルと剥ぎ取り", paragraphs: ["狩猟ボーナスは純増約2.7枚/G。討伐後の剥ぎ取りチャンスで次の報酬を狙います。", "全モンスター、全小役、部位破壊の細かな抽選は簡易獲得枚数へまとめています。"] }
    ],
    sources: [["パチナビ 設定別スペック", "https://pachinavi.net/machines/smasloth-monster-hunter-rise/settei/"], ["パチヨミ 基本スペック", "https://pachiyomi.com/slot/l-monster-hunter-rise"]]
  },
  "tokyo-revengers-slot": {
    order: 13.4, type: "slot", theme: "gold", year: "2025年9月", maker: "サミー", updated: "2026-11-01",
    name: "スマスロ 東京リベンジャーズ", shortName: "東京リベンジャーズ",
    image: "assets/machines/tokyo-revengers-slot-key-visual.jpg",
    imageAlt: "スマスロ 東京リベンジャーズの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10313",
    catchcopy: "周期から東卍RUSHへ。上位は純増約8枚・継続約80%。",
    intro: "BREAK CHANCEで初期差枚を決め、東卍RUSHからリベンジチャンス経由で東卍RUSH BURSTを目指します。",
    points: ["設定1 AT約1/482.2", "設定6 AT約1/373.1", "上位純増約8.0枚/G"],
    specs: [["AT（設定1）", "約1/482.2"], ["AT（設定6）", "約1/373.1"], ["ベース", "約32G/50枚"], ["通常AT純増", "約3.2枚/G"], ["上位純増", "約8.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "東卍チャンス", triggerRate: 282.4, triggerSuccess: 0.46, mainLabel: "東卍RUSH", mainRate: 482.2, base50: 32.0, coinUnit: 3.6, normalMin: 240, normalMax: 1100, specialLabel: "BREAK CHANCE", specialChance: 0.36, specialMin: 220, specialMax: 1000, specialDisplay: "coins", cycleFlow: { phase: "TOMAN RUSH", label: "東卍RUSH", statLabel: "東卍RUSH継続", games: 30, continueChance: 0.72, maxRounds: 10, rewards: [[{ label: "BREAK CHANCE", payout: 220 }, 0.55], [{ label: "東卍BONUS", payout: 440 }, 0.30], [{ label: "黒い衝動", payout: 880 }, 0.15]], endLabel: "東卍RUSH終了" }, upperChallenge: "リベンジチャンス", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "天上天下唯我独尊", upperContinue: 0.80, upperPayout: 700, settingRates: { 1: { trigger: 282.4, main: 482.2, payout: 0.978 }, 2: { trigger: 277.2, main: 474.7, payout: 0.988 }, 3: { trigger: 270.1, main: 456.9, payout: 1.014 }, 4: { trigger: 255.8, main: 414.0, payout: 1.063 }, 5: { trigger: 248.3, main: 393.8, payout: 1.112 }, 6: { trigger: 240.1, main: 373.1, payout: 1.149 } } },
    articleSections: [
      { heading: "周期抽選とAT初当り", paragraphs: ["初当り合算は設定1約1/282.4〜設定6約1/240.1、東卍RUSH初当りは約1/482.2〜約1/373.1です。", "サイトでは東卍チャンスを経由する段階とAT初当りを分けて表示します。"] },
      { heading: "上位ATは純増約8枚", paragraphs: ["通常ATの東卍RUSHは純増約3.2枚/G。BREAK CHANCEで決めた150枚以上の差枚を消化しながら、直乗せや一触即発から東卍ATTACKを狙います。", "リベンジチャンス成功後の上位AT『東卍RUSH BURST』は純増約8.0枚/G・継続約80%として簡易抽選します。"] }
    ],
    sources: [["天井ナビ 設定別スペック", "https://tenjo-navi.com/machines/smart-tokyo-revengers/"], ["P-WORLD 業界ニュース", "https://news.p-world.co.jp/articles/31384/yugitsushin"], ["Sammy 東京リベンジャーズ特設サイト", "https://www.sammy.co.jp/japanese/product/rev_slo_special/"]]
  },
  "shin-onimusha3-slot": {
    order: 13.5, type: "slot", theme: "flame", year: "2025年10月", maker: "レオスター", updated: "2026-11-07",
    name: "スマスロ 新鬼武者3", shortName: "新鬼武者3",
    image: "assets/machines/shin-onimusha3-slot-key-visual.jpg",
    imageAlt: "スマスロ 新鬼武者3のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10349",
    catchcopy: "周期と鬼斬チャージから蒼剣RUSHへ。真蒼剣RUSHは純増約5.5枚。",
    intro: "ゲーム数上乗せとセット継続を重ね、期待枚数約3600枚の上位ATを目指します。",
    points: ["設定1 AT約1/379.7", "設定6 AT約1/293.1", "上位純増約5.5枚/G"],
    specs: [["AT（設定1）", "約1/379.7"], ["AT（設定6）", "約1/293.1"], ["ベース", "約33G/50枚"], ["通常AT純増", "約2.5枚/G"], ["上位純増", "約5.5枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "鬼斬チャージ", triggerRate: 190, triggerSuccess: 0.48, mainLabel: "蒼剣RUSH", mainRate: 379.7, base50: 33.0, coinUnit: 3.3, normalMin: 220, normalMax: 1050, specialLabel: "蒼剣BONUS", specialChance: 0.34, specialMin: 220, specialMax: 1000, specialOutcomes: [[{ kind: "games", label: "鬼武侠", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]], triggerGames: 8 }, 0.60], [{ kind: "bonus", label: "蒼剣BONUS", games: [[20, 0.60], [40, 0.40]], payouts: [[180, 0.60], [360, 0.40]], triggerGames: 10 }, 0.40]], upperChallenge: "覚醒チャレンジ", upperChance: 0.17, upperSuccess: 0.55, upperLabel: "真蒼剣RUSH", upperContinue: 0.89, upperPayout: 650, settingRates: { 1: { main: 379.7, payout: 0.975 }, 2: { main: 372.7, payout: 0.983 }, 3: { main: 352.8, payout: 1.002 }, 4: { main: 306.5, payout: 1.052 }, 5: { main: 297.9, payout: 1.092 }, 6: { main: 293.1, payout: 1.130 } } },
    articleSections: [
      { heading: "設定別AT初当り", paragraphs: ["蒼剣RUSH初当りは設定1約1/379.7から設定6約1/293.1。機械割は97.5%〜113.0%です。", "開始時に設定1〜6を均等抽選し、結果画面で発表します。"] },
      { heading: "蒼剣RUSHから真蒼剣RUSHへ", paragraphs: ["通常ATは純増約2.5枚/G、ボーナスは約4.6枚/G。ゲーム数上乗せとセット継続で出玉を伸ばします。", "上位の真蒼剣RUSHは純増約5.5枚/G・継続率89%として簡易化しています。"] }
    ],
    sources: [["なな徹 設定別スペック", "https://nana-press.com/kaiseki/machine/1015/31758/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10349"], ["P-WORLD 業界ニュース", "https://news.p-world.co.jp/articles/31905/yugitsushin"], ["円谷フィールズHD 発売リリース", "https://www.tsuburaya-fields.co.jp/ir/j/files/press/2025/press_20250715a.pdf"]]
  },
  "super-blackjack-slot": {
    order: 13.6, type: "slot", theme: "crimson", year: "2025年2月", maker: "山佐ネクスト", updated: "2026-11-01",
    name: "L スーパーブラックジャック", shortName: "スーパーブラックジャック",
    image: "assets/machines/super-blackjack-slot-key-visual.jpg",
    imageAlt: "L スーパーブラックジャックの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10174",
    catchcopy: "ボーナスからリオチャンス高確へ。設定1約1/241.7〜設定6約1/181.3。",
    intro: "疑似ボーナスとリオチャンスを連鎖させ、ストックと高確率状態で出玉を伸ばします。",
    points: ["設定1初当り約1/241.7", "設定6初当り約1/181.3", "高純増区間約5.1枚/G"],
    specs: [["初当り（設定1）", "約1/241.7"], ["初当り（設定6）", "約1/181.3"], ["ベース", "約31.4G/50枚"], ["通常純増", "約0.4枚/G"], ["ボーナス純増", "約5.1枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "リオチャンス高確率", triggerRate: 241.7, triggerSuccess: 0.54, mainLabel: "BIG BONUS", mainRate: 241.7, base50: 31.4, coinUnit: 3.0, normalMin: 120, normalMax: 650, atPureIncrease: 0.4, specialLabel: "STOCK TIME", specialChance: 0.34, specialMin: 180, specialMax: 900, specialDisplay: "bonus", cycleFlow: { phase: "STOCK TIME", label: "STOCK TIME", statLabel: "ボーナスストック", games: 30, continueChance: 0.64, maxRounds: 15, rewards: [[{ label: "REG BONUS", payout: 120 }, 0.30], [{ label: "BIG BONUS", payout: 250 }, 0.55], [{ label: "SUPER BIG", payout: 510 }, 0.15]], endLabel: "STOCK TIME終了" }, upperChallenge: "スペシャルステージ", upperChance: 0.16, upperSuccess: 0.55, upperLabel: "SUPER RIO CHANCE", upperContinue: 0.80, upperPayout: 500, upperPureIncrease: 5.1, settingRates: { 1: { main: 241.7, payout: 0.978 }, 2: { main: 238.8, payout: 0.987 }, 3: { main: 235.9, payout: 1.001 }, 4: { main: 201.8, payout: 1.057 }, 5: { main: 194.9, payout: 1.100 }, 6: { main: 181.3, payout: 1.127 } } },
    articleSections: [
      { heading: "設定別ボーナス初当り", paragraphs: ["ボーナス初当りは設定1約1/241.7から設定6約1/181.3。設定4以上で差が大きくなる公開値を使います。", "設定は開始時に均等抽選し、結果とランキングに保存します。"] },
      { heading: "ボーナスとリオチャンス", paragraphs: ["BIG後はリオチャンス高確率へ進み、ボーナスの連鎖を狙います。", "通常時約0.4枚/Gとボーナス約5.1枚/Gの速度差は、獲得枚数の幅として簡易表現しています。"] }
    ],
    sources: [["萌えスロパチ大百科 基本スペック", "https://moe-slotpachi.com/moe-pachislot/sbj-spec/"], ["スロパチキュインDX 機種解説", "https://suropachi-qin.com/ps_machine/ps7/"]]
  },
  "blue-lock-pachinko": {
    order: 13.7, type: "pachinko", theme: "ice", year: "2025年9月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバーブルーロック", shortName: "eFブルーロック",
    image: "assets/machines/blue-lock-pachinko-key-visual.jpg",
    imageAlt: "eフィーバーブルーロックの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10302",
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
    image: "assets/machines/tokyo-revengers-pachinko-key-visual.jpg",
    imageAlt: "e 東京リベンジャーズの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10486",
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
    image: "assets/machines/kanokari-pachinko-key-visual.jpg",
    imageAlt: "eフィーバー彼女、お借りしますのキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10253",
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
    image: "assets/machines/symphogear4-carol-key-visual.jpg",
    imageAlt: "eフィーバー戦姫絶唱シンフォギア4 キャロルver.のキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10149",
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
    image: "assets/machines/golden-kamuy-slot-key-visual.jpg",
    imageAlt: "スマスロ ゴールデンカムイのキービジュアル",
    imageCredit: "パチナビ 設定別スペック",
    imageSource: "https://pachinavi.net/machines/smasloth-golden-kamuy/settei/",
    catchcopy: "決戦ボーナスから黄金神威へ。上位の真・黄金神威は純増約4.5枚。",
    intro: "ピュウを集めてボーナス・ATへ進み、ゴールデンロードから上位ATを目指します。",
    points: ["設定1初当り約1/308.1", "設定1 AT約1/818.4", "上位純増約4.5枚/G"],
    specs: [["初当り（設定1）", "約1/308.1"], ["AT（設定1）", "約1/818.4"], ["AT（設定6）", "約1/647.3"], ["ベース", "約36.9G/50枚"], ["通常AT純増", "約2.7枚/G"], ["上位純増", "約4.5枚/G"]],
    sim: { kind: "slot", triggerLabel: "決戦ボーナス", triggerRate: 308.1, triggerSuccess: 0.38, mainLabel: "黄金神威", mainRate: 818.4, base50: 36.9, coinUnit: 3.6, normalMin: 250, normalMax: 1200, specialLabel: "ゴールドラッシュ", specialChance: 0.34, specialMin: 250, specialMax: 1200, specialOutcomes: [[{ kind: "games", label: "ゴールドラッシュ", games: [[10, 0.40], [20, 0.30], [30, 0.20], [50, 0.08], [100, 0.02]], triggerGames: 10 }, 0.65], [{ kind: "bonus", label: "決戦ボーナス", games: [[20, 0.60], [40, 0.40]], payouts: [[250, 0.60], [500, 0.40]], triggerGames: 10 }, 0.35]], upperChallenge: "ゴールデンロード", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "真・黄金神威", upperContinue: 0.82, upperPayout: 650, settingRates: { 1: { trigger: 308.1, main: 818.4, payout: 0.979 }, 2: { trigger: 302.4, main: 801.8, payout: 0.986 }, 3: { trigger: 290.4, main: 770.3, payout: 1.008 }, 4: { trigger: 268.5, main: 698.8, payout: 1.054 }, 5: { trigger: 260.1, main: 678.3, payout: 1.088 }, 6: { trigger: 248.8, main: 647.3, payout: 1.133 } } },
    articleSections: [
      { heading: "ボーナスとATを分けて抽選", paragraphs: ["初当り合算は設定1約1/308.1〜設定6約1/248.8、AT初当りは約1/818.4〜約1/647.3です。", "シミュレーターでは決戦ボーナスと黄金神威の二段階で結果を表示します。"] },
      { heading: "黄金神威から上位へ", paragraphs: ["通常ATは初期100G・純増約2.7枚/G。ゴールデンロード成功で純増約4.5枚/Gの上位へ進みます。", "上位到達率など未公表部分はサイト内比較用固定抽選です。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9987"], ["パチナビ 設定別スペック", "https://pachinavi.net/machines/smasloth-golden-kamuy/settei/"]]
  },
  "bancho4-slot": {
    order: 14.2, type: "slot", theme: "flame", year: "2024年4月", maker: "大都技研", updated: "2026-11-01",
    name: "スマスロ 押忍！番長4", shortName: "押忍！番長4",
    image: "assets/machines/bancho4-slot-key-visual.jpg",
    imageAlt: "スマスロ 押忍！番長4のキービジュアル",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10023",
    catchcopy: "番長ボーナスと対決から頂RISEへ。設定1約1/259.5〜設定6約1/221.1。",
    intro: "ベルカウンターで対決を目指し、頂RISEの上乗せとエンブレムモードを狙います。",
    points: ["設定1初当り約1/259.5", "設定6初当り約1/221.1", "AT純増約2.7枚/G"],
    specs: [["初当り（設定1）", "約1/259.5"], ["初当り（設定6）", "約1/221.1"], ["ベース", "約33G/50枚"], ["通常AT純増", "約2.7枚/G"], ["上位純増", "約4.5枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "番長ボーナス", triggerRate: 259.5, triggerSuccess: 0.52, mainLabel: "頂RISE", mainRate: 259.5, base50: 33.0, coinUnit: 3.3, normalMin: 180, normalMax: 900, specialLabel: "頂RISE UP", specialChance: 0.34, specialMin: 200, specialMax: 950, specialOutcomes: [[{ kind: "games", label: "頂RISE UP", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]], triggerGames: 8 }, 0.65], [{ kind: "bonus", label: "番長ボーナス", games: [[20, 0.60], [40, 0.40]], payouts: [[180, 0.60], [360, 0.40]], triggerGames: 10 }, 0.35]], upperChallenge: "超番長ボーナス", upperChance: 0.16, upperSuccess: 0.55, upperLabel: "エンブレムモード", upperContinue: 0.80, upperPayout: 600, settingRates: { 1: { trigger: 259.5, main: 259.5, payout: 0.978 }, 2: { trigger: 256.3, main: 256.3, payout: 0.989 }, 3: { trigger: 247.6, main: 247.6, payout: 1.015 }, 4: { trigger: 236.0, main: 236.0, payout: 1.060 }, 5: { trigger: 225.3, main: 225.3, payout: 1.100 }, 6: { trigger: 221.1, main: 221.1, payout: 1.131 } } },
    articleSections: [
      { heading: "設定別初当りを使用", paragraphs: ["初当り合算は設定1約1/259.5から設定6約1/221.1。公開機械割97.8%〜113.1%を個別に使います。", "ボーナスとATの詳細振り分けは、初当りを起点とする共通モデルへ簡略化しています。"] },
      { heading: "頂RISEとエンブレムモード", paragraphs: ["頂RISEは純増約2.7枚/Gのゲーム数管理型AT。対決勝利で上乗せやボーナスを狙います。", "超番長ボーナス後の上位は純増約4.5枚/Gとして獲得幅へ反映します。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10023"], ["パチヨミ 設定別スペック", "https://pachiyomi.com/slot/l-banchou-4"]]
  },
  "zenigata4-slot": {
    order: 14.3, type: "slot", theme: "crimson", year: "2023年5月", maker: "オリンピア", updated: "2026-11-01",
    name: "L主役は銭形4", shortName: "主役は銭形4",
    image: "assets/machines/zenigata4-slot-key-visual.jpg",
    imageAlt: "L主役は銭形4のキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/9809",
    catchcopy: "規定ガッツから逮捕RUSHへ。デカチャンスと30G連で上乗せ。",
    intro: "ガッツを貯めてATへ進み、デカチャンス、ゼニロボ、超逮捕チャンスを重ねるスマスロです。",
    points: ["設定1 AT約1/367.9", "設定6 AT約1/305.8", "AT純増約2.7枚/G"],
    specs: [["AT（設定1）", "約1/367.9"], ["AT（設定6）", "約1/305.8"], ["ベース", "約32G/50枚"], ["AT純増", "約2.7枚/G"], ["AT初期", "50G＋α"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "デカチャンス", triggerRate: 184, triggerSuccess: 0.50, mainLabel: "逮捕RUSH", mainRate: 367.9, base50: 32.0, coinUnit: 3.8, normalMin: 220, normalMax: 1100, specialLabel: "ゼニロボ起動チャンス", specialChance: 0.34, specialMin: 220, specialMax: 1100, specialOutcomes: [[{ kind: "games", label: "ゼニロボ起動チャンス", games: [[10, 0.40], [20, 0.30], [30, 0.18], [50, 0.10], [100, 0.02]], triggerGames: 8 }, 0.65], [{ kind: "bonus", label: "逮捕BONUS", games: [[20, 0.60], [40, 0.40]], payouts: [[220, 0.60], [440, 0.40]], triggerGames: 10 }, 0.35]], upperChallenge: "30G連", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "超逮捕チャンス", upperContinue: 0.80, upperPayout: 650, settingRates: { 1: { main: 367.9, payout: 0.982 }, 2: { main: 365.3, payout: 0.987 }, 3: { main: 348.3, payout: 1.007 }, 4: { main: 329.0, payout: 1.043 }, 5: { main: 314.5, payout: 1.095 }, 6: { main: 305.8, payout: 1.141 } } },
    articleSections: [
      { heading: "設定別AT初当り", paragraphs: ["逮捕RUSH初当りは設定1約1/367.9から設定6約1/305.8。出玉率98.2%〜114.1%を設定ごとに使用します。", "設定は開始時に均等抽選し、最終結果とランキングに表示します。"] },
      { heading: "デカチャンスと30G連", paragraphs: ["ATは初期50G＋α・純増約2.7枚/G。CZ成功で直乗せやBIGを獲得します。", "ゼニロボ起動チャンス、30G連、超逮捕チャンスは段階式の簡易抽選へまとめています。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/9809"], ["天井ナビ 設定別スペック", "https://tennabi.jp/zenigata4/"]]
  },
  "inuyasha2-slot": {
    order: 14.4, type: "slot", theme: "crimson", year: "2024年12月", maker: "エフ", updated: "2026-11-01",
    name: "L 犬夜叉2", shortName: "犬夜叉2",
    image: "assets/machines/inuyasha2-slot-key-visual.jpg",
    imageAlt: "L 犬夜叉2のキービジュアル",
    imageCredit: "P-WORLD 設定別スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10160",
    catchcopy: "妖勝負を突破し、ブッた斬りスラッシュと奈落チャレンジへ。",
    intro: "ボーナス＋1システムを継承し、上位ATとストック特化ゾーンを目指すスマスロです。",
    points: ["設定1 AT約1/435.4", "設定6 AT約1/312.7", "ボーナス純増約5.0枚/G"],
    specs: [["CZ（設定1）", "約1/248.8"], ["AT（設定1）", "約1/435.4"], ["AT（設定6）", "約1/312.7"], ["ベース", "約33.3G/50枚"], ["AT純増", "約1.8枚/G"], ["ボーナス純増", "約5.0枚/G"]],
    sim: { kind: "slot", triggerLabel: "妖勝負", triggerRate: 248.8, triggerSuccess: 0.52, mainLabel: "ブッた斬りスラッシュ", mainRate: 435.4, base50: 33.3, coinUnit: 4.2, normalMin: 240, normalMax: 1200, specialLabel: "ブーストチャンス", specialChance: 0.36, specialMin: 220, specialMax: 1100, specialDisplay: "bonus", cycleFlow: { phase: "BUTTAGIRI SLASH", label: "ブッた斬りスラッシュ", statLabel: "ボーナス＋1", games: [[20, 0.60], [30, 0.30], [50, 0.10]], continueChance: 0.70, maxRounds: 12, rewards: [[{ label: "ブッた斬りBONUS", payout: 240 }, 0.55], [{ label: "BIG BONUS", payout: 480 }, 0.30], [{ label: "ブーストチャンス", payout: 720 }, 0.15]], endLabel: "ブッた斬りスラッシュ終了" }, upperChallenge: "奈落チャレンジ", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "奈落決戦", upperContinue: 0.82, upperPayout: 650, settingRates: { 1: { trigger: 248.8, main: 435.4, payout: 0.976 }, 2: { trigger: 243.5, main: 419.9, payout: 0.989 }, 3: { trigger: 239.6, main: 402.3, payout: 1.0172 }, 4: { trigger: 233.5, main: 366.4, payout: 1.0636 }, 5: { trigger: 216.8, main: 336.1, payout: 1.1129 }, 6: { trigger: 209.6, main: 312.7, payout: 1.1499 } } },
    articleSections: [
      { heading: "CZ・ATとも設定差あり", paragraphs: ["妖勝負は設定1約1/248.8〜設定6約1/209.6、ATは約1/435.4〜約1/312.7です。", "開始時に設定1〜6を均等抽選し、選ばれた設定の公開値を使用します。"] },
      { heading: "ボーナス＋1と上位AT", paragraphs: ["通常ATは純増約1.8枚/G、各ボーナス中は約5.0枚/Gです。", "奈落チャレンジ突破後の上位とストック特化ゾーンは継続約82%の簡易ループで表現します。"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/10160"], ["なな徹 解析情報", "https://nana-press.com/kaiseki/machine/846/"]]
  },
  "fire-force2-benimaru": {
    order: 14.5, type: "pachinko", theme: "flame", year: "2025年7月", maker: "SANKYO", updated: "2026-11-01",
    name: "eフィーバー炎炎ノ消防隊2 紅丸ver.", shortName: "炎炎2 紅丸",
    image: "assets/machines/fire-force2-benimaru-key-visual.jpg",
    imageAlt: "eフィーバー炎炎ノ消防隊2 紅丸ver.のキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10273",
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
    image: "assets/machines/kamen-rider-deno-key-visual.jpg",
    imageAlt: "e 仮面ライダー電王のキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10098",
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
    image: "assets/machines/hokuto-boukyousei-key-visual.jpg",
    imageAlt: "P北斗の拳 暴凶星の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9808",
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
    image: "assets/machines/railgun2-pachinko-key-visual.jpg",
    imageAlt: "Pとある科学の超電磁砲2の実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10092",
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
    image: "assets/machines/shin-onimusha2-slot-key-visual.jpg",
    imageAlt: "パチスロ 新鬼武者2のキービジュアル",
    imageCredit: "スロベース 設定別スペック",
    imageSource: "https://slobase.jp/machines/onimusha2",
    catchcopy: "バッサリZONEから蒼剣RUSHへ。ゲーム数上乗せと継続バトル。",
    intro: "CZ突破から純増約2.0枚の蒼剣RUSHへ進み、ボーナスと金色覚醒を狙う6.5号機です。",
    points: ["設定1 AT約1/405.2", "設定6 AT約1/262.2", "AT純増約2.0枚/G"],
    specs: [["AT（設定1）", "約1/405.2"], ["AT（設定6）", "約1/262.2"], ["ベース", "約37G/50枚"], ["AT純増", "約2.0枚/G"], ["ボーナス純増", "約4.0枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "バッサリZONE", triggerRate: 220, triggerSuccess: 0.33, mainLabel: "蒼剣RUSH", mainRate: 405.2, base50: 37.0, coinUnit: 2.6, normalMin: 200, normalMax: 950, specialLabel: "蒼剣BONUS", specialChance: 0.34, specialMin: 200, specialMax: 900, specialOutcomes: [[{ kind: "games", label: "鬼武侠", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]], triggerGames: 8 }, 0.60], [{ kind: "bonus", label: "蒼剣BONUS", games: [[20, 0.60], [40, 0.40]], payouts: [[160, 0.60], [320, 0.40]], triggerGames: 10 }, 0.40]], upperChallenge: "鬼武侠", upperChance: 0.17, upperSuccess: 0.55, upperLabel: "金色覚醒鬼武者", upperContinue: 0.80, upperPayout: 550, settingRates: { 1: { main: 405.2, payout: 0.982 }, 2: { main: 382.4, payout: 0.995 }, 3: { main: 366.2, payout: 1.005 }, 4: { main: 301.3, payout: 1.054 }, 5: { main: 275.6, payout: 1.077 }, 6: { main: 262.2, payout: 1.101 } } },
    articleSections: [
      { heading: "設定別AT初当り", paragraphs: ["蒼剣RUSH初当りは設定1約1/405.2から設定6約1/262.2。公開機械割98.2%〜110.1%を使用します。", "CZの細かな設定差は加えず、AT初当りを中心に比較します。"] },
      { heading: "ゲーム数上乗せ型AT", paragraphs: ["蒼剣RUSHは初期40G・純増約2.0枚/G。ボーナス中は約4.0枚/Gです。", "鬼武侠、ボーナスループ、金色覚醒は段階式の簡易抽選へまとめています。"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9658"], ["スロベース 設定別スペック", "https://slobase.jp/machines/onimusha2"]]
  },
  "fire-force-slot": {
    order: 15.0, type: "slot", theme: "flame", year: "2024年5月", maker: "SANKYO", updated: "2026-11-01",
    name: "Lパチスロ 炎炎ノ消防隊", shortName: "スマスロ 炎炎ノ消防隊",
    image: "assets/machines/fire-force-slot-key-visual.jpg",
    imageAlt: "Lパチスロ 炎炎ノ消防隊のキービジュアル",
    imageCredit: "パチナビ 設定別スペック",
    imageSource: "https://pachinavi.net/machines/smasloth-enen/settei/",
    catchcopy: "灰焔騎士団から純増約5.7枚のボーナスと炎炎ループへ。",
    intro: "初当り、ボーナス、炎炎激闘を重ねてアドラバーストを目指すスマスロです。",
    points: ["設定1初当り約1/197", "設定6初当り約1/169", "ボーナス純増約5.7枚/G"],
    specs: [["初当り（設定1）", "約1/197"], ["初当り（設定6）", "約1/169"], ["ボーナス（設定1）", "約1/291"], ["炎炎ループ（設定1）", "約1/790"], ["ベース", "約33.8G/50枚"], ["ボーナス純増", "約5.7枚/G"], ["ボーナス出玉", "約230枚／約85枚"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "灰焔騎士団", triggerRate: 197, triggerSuccess: 0.50, mainLabel: "炎炎BONUS", mainRate: 291, base50: 33.8, coinUnit: 3.1, normalMin: 85, normalMax: 230, normalAwards: [[{ label: "炎炎BONUS", payout: 230, games: 40 }, 0.50], [{ label: "REGULAR BONUS", payout: 85, games: 15 }, 0.50]], normalAwardsNote: "ボーナス種類の公開比率がないため、種類比率は比較用の1:1です", atPureIncrease: 5.7, specialLabel: "炎炎激闘", specialChance: 0.36, specialMin: 85, specialMax: 230, specialDisplay: "bonus", cycleFlow: { phase: "FIRE FORCE BONUS", label: "炎炎激闘", statLabel: "炎炎ループ", games: [[15, 0.50], [40, 0.50]], continueChance: 0.65, maxRounds: 12, rewards: [[{ label: "REGULAR BONUS", payout: 85 }, 0.50], [{ label: "炎炎BONUS", payout: 230 }, 0.50]], endLabel: "炎炎ループ終了" }, upperChallenge: "炎炎ループ", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "アドラバースト", upperContinue: 0.80, upperPayout: 600, upperPureIncrease: 5.7, settingRates: { 1: { trigger: 197, main: 291, payout: 0.977 }, 2: { trigger: 194, main: 282, payout: 0.992 }, 4: { trigger: 182, main: 257, payout: 1.044 }, 5: { trigger: 173, main: 239, payout: 1.101 }, 6: { trigger: 169, main: 230, payout: 1.149 } } },
    articleSections: [
      { heading: "実機搭載の5段階設定", paragraphs: ["設定1・2・4・5・6から均等抽選し、設定3は対象外です。初当り合算は約1/197〜約1/169です。", "ボーナス初当り約1/291〜約1/230も設定ごとに使用します。"] },
      { heading: "炎炎激闘とアドラバースト", paragraphs: ["初当りボーナスは純増約5.7枚/G。炎炎激闘と炎炎ループでボーナスの連続を狙います。", "上位到達率などの未公表部分は全設定共通の比較用抽選です。"] }
    ],
    sources: [["P-WORLD 基本スペック", "https://www.p-world.co.jp/machine/database/10042"], ["パチナビ 設定別スペック", "https://pachinavi.net/machines/smasloth-enen/settei/"]]
  },
  "godzilla-eva-slot": {
    order: 15.1, type: "slot", theme: "violet", year: "2024年2月", maker: "ビスティ", updated: "2026-11-01",
    name: "L ゴジラ対エヴァンゲリオン", shortName: "スマスロ ゴジエヴァ",
    image: "assets/machines/godzilla-eva-slot-key-visual.jpg",
    imageAlt: "L ゴジラ対エヴァンゲリオンの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/9990",
    catchcopy: "ボーナスからG覚醒RUSHへ。純増約5枚の怪獣バトルAT。",
    intro: "エヴァンゲリオンボーナスとゴジラボーナスを経由し、高純増ATへ進むスマスロです。",
    points: ["設定1 AT約1/581.8", "設定6 AT約1/407.3", "AT純増約5.0枚/G"],
    specs: [["ボーナス（設定1）", "約1/299.9"], ["AT（設定1）", "約1/581.8"], ["AT（設定6）", "約1/407.3"], ["ベース", "約33G/50枚"], ["AT純増", "約5.0枚/G"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "エヴァンゲリオンBONUS", triggerRate: 299.9, triggerSuccess: 0.52, mainLabel: "G覚醒RUSH", mainRate: 581.8, base50: 33.0, coinUnit: 4.0, normalMin: 250, normalMax: 1200, atPureIncrease: 5.0, specialLabel: "殲滅作戦", specialChance: 0.34, specialMin: 250, specialMax: 1100, specialOutcomes: [[{ kind: "games", label: "G覚醒RUSH上乗せ", games: [[10, 0.40], [20, 0.30], [30, 0.18], [50, 0.10], [100, 0.02]], triggerGames: 8 }, 0.58], [{ kind: "bonus", label: "殲滅作戦BONUS", games: [[20, 0.65], [40, 0.35]], payouts: [[250, 0.65], [500, 0.35]], triggerGames: 10 }, 0.42]], upperChallenge: "G侵食役", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "超G覚醒RUSH", upperContinue: 0.82, upperPayout: 650, upperPureIncrease: 5.0, upperSetGames: [[50, 0.70], [100, 0.30]], settingRates: { 1: { trigger: 299.9, main: 581.8, payout: 0.977 }, 2: { trigger: 292.2, main: 552.7, payout: 0.992 }, 4: { trigger: 272.3, main: 487.8, payout: 1.046 }, 5: { trigger: 256.7, main: 446.2, payout: 1.107 }, 6: { trigger: 244.8, main: 407.3, payout: 1.149 } } },
    articleSections: [
      { heading: "5段階の設定別初当り", paragraphs: ["設定1・2・4・5・6から均等抽選し、設定3は対象外です。ボーナスは約1/299.9〜約1/244.8、ATは約1/581.8〜約1/407.3です。", "抽選設定は結果とランキングへ表示します。"] },
      { heading: "純増約5枚の高純増AT", paragraphs: ["G覚醒RUSHは純増約5.0枚/G。殲滅作戦や怪獣バトルでゲーム数を伸ばします。", "スルー回数天井や内部状態は省略し、ボーナスからAT・上位へ進む流れを簡易化しています。"] }
    ],
    sources: [["天井ナビ 設定別スペック", "https://tennabi.jp/godzilla-vs-evangelion/"], ["設定判別データ", "https://pacnk.com/slot/tools/sh_gojirataiebuangerion.html"]]
  },
  "dmc5-st-slot": {
    order: 15.2, type: "slot", theme: "violet", year: "2025年6月", maker: "エンターライズ", updated: "2026-11-01",
    name: "スマスロ デビル メイ クライ5 スタイリッシュトライブ", shortName: "スマスロ DMC5",
    image: "assets/machines/dmc5-st-slot-key-visual.jpg",
    imageAlt: "スマスロ デビル メイ クライ5 スタイリッシュトライブの実機画像",
    imageCredit: "P-WORLD 機種情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10277",
    catchcopy: "DMC BONUSからSTYLISH TIMEへ。上位STは平均約3400枚。",
    intro: "周期とCZからボーナス・STへ進み、バトル勝利でSTを強化する正統派ST機です。",
    points: ["設定1 ST約1/445.4", "設定6 ST約1/303.9", "ボーナス純増約5.8枚/G"],
    specs: [["ボーナス（設定1）", "約1/257.0"], ["ST（設定1）", "約1/445.4"], ["ST（設定6）", "約1/303.9"], ["ベース", "約33.7G/50枚"], ["ボーナス純増", "約5.8枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "ダンテCZ", triggerRate: 257.0, triggerSuccess: 0.52, mainLabel: "STYLISH TIME", mainRate: 445.4, base50: 33.7, coinUnit: 3.5, normalMin: 220, normalMax: 1050, atPureIncrease: 5.8, specialLabel: "EPISODE BONUS", specialChance: 0.36, specialMin: 230, specialMax: 1100, specialDisplay: "bonus", cycleFlow: { phase: "STYLISH TIME", label: "STバトル", statLabel: "ST継続", games: 25, continueChance: 0.72, maxRounds: 15, rewards: [[{ label: "DEVIL BONUS", payout: 230 }, 0.55], [{ label: "EPISODE BONUS", payout: 460 }, 0.32], [{ label: "JACKPOT BONUS", payout: 920 }, 0.13]], endLabel: "STYLISH TIME終了" }, upperChallenge: "JACKPOT BATTLE", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "SPECIAL STYLISH TIME", upperContinue: 0.82, upperPayout: 700, upperPureIncrease: 5.8, settingRates: { 1: { trigger: 257.0, main: 445.4, payout: 0.975 }, 2: { trigger: 254.1, main: 436.5, payout: 0.982 }, 3: { trigger: 251.5, main: 411.2, payout: 1.002 }, 4: { trigger: 222.6, main: 359.6, payout: 1.052 }, 5: { trigger: 217.3, main: 329.5, payout: 1.092 }, 6: { trigger: 204.1, main: 303.9, payout: 1.149 } } },
    articleSections: [
      { heading: "ボーナスとSTの設定差", paragraphs: ["ボーナス初当りは設定1約1/257.0〜設定6約1/204.1、ST初当りは約1/445.4〜約1/303.9です。", "開始時に設定1〜6を均等抽選し、公開出玉率97.5%〜114.9%を使用します。"] },
      { heading: "正統派STと上位ST", paragraphs: ["ボーナスは純増約5.8枚/G。ST中のバトル勝利で報酬とST強化を狙います。", "上位STの期待枚数約3400枚は、簡易モデルでは獲得幅と継続ループへまとめています。"] }
    ],
    sources: [["一撃 設定別解析", "https://1geki.jp/slot/l_dmc5_st/0/"], ["HAZUSE DATA 基本スペック", "https://data.hazuse.com/?machine_code=SX0106"]]
  },
  "gundam-unicorn-first": {
    order: 15.3, type: "pachinko", theme: "ice", year: "2021年8月", maker: "SANKYO", updated: "2026-11-01",
    name: "Pフィーバー 機動戦士ガンダムユニコーン", shortName: "初代ユニコーン",
    image: "assets/machines/gundam-unicorn-first-key-visual.jpg",
    imageAlt: "Pフィーバー 機動戦士ガンダムユニコーンのキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/9424",
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
    image: "assets/machines/sao-first-pachinko-key-visual.jpg",
    imageAlt: "スマートぱちんこ ソードアート・オンラインのキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/9893",
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
    image: "assets/machines/karakuri-first-pachinko-key-visual.jpg",
    imageAlt: "Pフィーバーからくりサーカスのキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/9649",
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
    image: "assets/machines/symphogear3-gold-key-visual.jpg",
    imageAlt: "PF戦姫絶唱シンフォギア3 黄金絶唱のキービジュアル",
    imageCredit: "P-WORLD 基本スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/9673",
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
    image: "assets/machines/initial-d-2nd-slot-key-visual.jpg",
    imageAlt: "スマスロ頭文字D 2ndのキービジュアル",
    imageCredit: "P-WORLD 設定別スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10097",
    catchcopy: "レジェンドバトルを突破し、純増約2.4枚のレジェンドラッシュへ。",
    intro: "ゲーム数管理ATとリアルボーナス、覚醒ZONEを組み合わせたスマスロです。",
    points: ["設定1 AT約1/405.5", "設定6 AT約1/296.7", "AT純増約2.4枚/G"],
    specs: [["LB（設定1）", "約1/216.6"], ["AT（設定1）", "約1/405.5"], ["AT（設定6）", "約1/296.7"], ["ベース", "約31.0G/50枚"], ["AT純増", "約2.4枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "レジェンドバトル", triggerRate: 216.6, triggerSuccess: 0.53, mainLabel: "レジェンドラッシュ", mainRate: 405.5, base50: 31.0, coinUnit: 2.9, normalMin: 220, normalMax: 950, specialLabel: "覚醒ZONE", specialChance: 0.35, specialMin: 220, specialMax: 1000, specialDisplay: "coins", cycleFlow: { phase: "LEGEND RUSH", label: "レジェンドバトル", statLabel: "バトル継続", games: 30, continueChance: 0.70, maxRounds: 10, rewards: [[{ label: "バトル勝利", payout: 150 }, 0.55], [{ label: "覚醒ZONE", payout: 300 }, 0.30], [{ label: "インフィニティードリーム", payout: 600 }, 0.15]], endLabel: "レジェンドラッシュ終了" }, upperChallenge: "インフィニティードリーム", upperChance: 0.17, upperSuccess: 0.55, upperLabel: "ナイトキッズバトル", upperContinue: 0.80, upperPayout: 550, settingRates: { 1: { trigger: 216.6, main: 405.5, payout: 0.979 }, 2: { trigger: 212.3, main: 396.8, payout: 0.989 }, 3: { trigger: 205.0, main: 379.1, payout: 1.008 }, 4: { trigger: 188.9, main: 338.9, payout: 1.063 }, 5: { trigger: 178.4, main: 314.6, payout: 1.100 }, 6: { trigger: 169.7, main: 296.7, payout: 1.143 } } },
    articleSections: [
      { heading: "レジェンドバトルとATの設定差", paragraphs: ["レジェンドバトルは設定1約1/216.6〜設定6約1/169.7、ATは約1/405.5〜約1/296.7です。", "開始時に設定1〜6を均等抽選し、公開された設定別値を使用します。"] },
      { heading: "ATと覚醒ZONE", paragraphs: ["レジェンドラッシュは純増約2.4枚/Gのゲーム数管理型です。", "覚醒ZONEや上位契機の設定差は公開値がないため、全設定共通の比較用抽選です。"] }
    ],
    sources: [["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/10097"]]
  },
  "lupin-dai-koukaisha": {
    order: 15.8, type: "slot", theme: "crimson", year: "2024年12月", maker: "平和", updated: "2026-11-07",
    name: "Lルパン三世 大航海者の秘宝", shortName: "ルパン 大航海者",
    image: "assets/machines/lupin-dai-koukaisha-key-visual.jpg",
    imageAlt: "Lルパン三世 大航海者の秘宝のキービジュアル",
    imageCredit: "P-WORLD 設定別スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/10157",
    catchcopy: "SUPER HERO中のデカ目から、直乗せ・ルパンゲーム・BIG CHANCEを狙う。",
    intro: "初当りからSUPER HEROへ進み、デカ目・BIG CHANCEでゲーム数を伸ばして上位AT『盗り放題スーパーヒーロー』を目指すスマスロです。",
    points: ["設定1 AT約1/421.5", "設定6 AT約1/327.5", "ベース約31.1G/50枚"],
    specs: [["初当り（設定1）", "約1/289.1"], ["AT（設定1）", "約1/421.5"], ["AT（設定6）", "約1/327.5"], ["ベース", "約31.1G/50枚"], ["通常AT純増", "約2.7枚/G"], ["上位AT純増", "約4.7枚/G"], ["出玉率（設定6）", "約114.3%"], ["設定", "1〜6"]],
    sim: { kind: "slot", rankingVersion: "v6", triggerLabel: "初当り", triggerRate: 289.1, triggerSuccess: 1, mainLabel: "SUPER HERO", mainRate: 421.5, base50: 31.1, coinUnit: 3.3, normalMin: 220, normalMax: 1050, atPureIncrease: 2.7, entryBonusAwards: [[{ label: "ダブルセブン揃い・AT直行", payout: 0, games: 1, atChance: 1, directEntry: true }, 0.70], [{ label: "シングルセブン揃い・BONUS", payout: 81, games: 30, atChance: 0.30 }, 0.30]], entryBonusAwardsNote: "初当り時はダブルセブン約70%をAT直行、シングルセブン約30%を30GのBONUSとして代表配分。シングルセブンからのAT期待度は約30%", specialLabel: "デカ目・BIG CHANCE", specialChance: 0.36, specialMin: 250, specialMax: 1100, upperChallenge: "俺の名はルパン三世ゾーン", upperChance: 0, upperSuccess: 0.55, upperLabel: "盗り放題スーパーヒーロー", upperContinue: 0, upperPayout: 470, upperPureIncrease: 4.7, upperSetGames: [[100, 0.76], [200, 0.19], [300, 0.05]], upperMaxLoops: 1, upperGameManaged: true, upperGameRange: "100〜300G", settingRates: { 1: { trigger: 289.1, main: 421.5, payout: 0.977 }, 2: { trigger: 275.6, main: 401.4, payout: 0.991 }, 3: { trigger: 262.6, main: 383.9, payout: 1.014 }, 4: { trigger: 233.9, main: 355.1, payout: 1.061 }, 5: { trigger: 223.6, main: 345.6, payout: 1.101 }, 6: { trigger: 216.3, main: 327.5, payout: 1.143 } } },
    articleSections: [
      { heading: "初当り・ATとも設定差あり", paragraphs: ["初当りは設定1約1/289.1〜設定6約1/216.3、ATは約1/421.5〜約1/327.5です。", "設定1〜6を均等抽選し、公開出玉率97.7%〜114.3%を結果へ反映します。"] },
      { heading: "SUPER HEROとデカ目", paragraphs: ["通常ATは初期50〜300G・純増約2.7枚/Gのゲーム数管理型です。レア役やデカ目で、ゲーム数直乗せ・8Gのルパンゲーム・BIG CHANCEをトリプル抽選します。", "BIG CHANCEは次元の一発上乗せ、五ェ門の分裂上乗せ、ルパンの超高継続ループ上乗せ、不二子の怪盗RUSHを分けて表示します。"] },
      { heading: "俺の名はルパン三世ゾーンと上位AT", paragraphs: ["エンディング後は32Gの『俺の名はルパン三世ゾーン』へ進み、成功期待度50%超で上位ATを目指します。", "成功時の盗り放題スーパーヒーローは初期100〜300G・純増約4.7枚/G。失敗時も通常SUPER HEROの100G以上スタートとして表示します。"] }
    ],
    sources: [["平和 公式ゲームフロー", "https://www.heiwanet.co.jp/assets/images/products/guide/l-l13.pdf"], ["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/10157"], ["なな徹 SUPER HERO解析", "https://nana-press.com/kaiseki/machine/851/25855/"], ["なな徹 BIG CHANCE解析", "https://nana-press.com/kaiseki/machine/851/25857/"], ["なな徹 上位AT解析", "https://nana-press.com/kaiseki/machine/851/25861/"]]
  },
  "basilisk-tenzen-slot": {
    order: 15.9, type: "slot", theme: "violet", year: "2023年12月", maker: "ミズホ", updated: "2026-11-07",
    name: "スマスロ バジリスク絆2 天膳 BLACK EDITION", shortName: "バジリスク天膳",
    image: "assets/machines/basilisk-tenzen-slot-key-visual.jpg",
    imageAlt: "スマスロ バジリスク絆2 天膳 BLACK EDITIONのキービジュアル",
    imageCredit: "P-WORLD 設定別スペック",
    imageSource: "https://www.p-world.co.jp/machine/database/9944",
    catchcopy: "バジリスクチャンスからBTへ。宿怨チャレンジで上位を狙う。",
    intro: "絆高確とシナリオ管理のBTに、宿怨ループを加えたスマスロです。",
    points: ["設定1 BT約1/418.1", "設定6 BT約1/247.3", "BT純増約2.9枚/G"],
    specs: [["BC（設定1）", "約1/124.7"], ["BT（設定1）", "約1/418.1"], ["BT（設定6）", "約1/247.3"], ["ベース", "約31.7G/50枚"], ["BT純増", "約2.9枚/G"], ["設定", "1〜6"]],
    sim: { kind: "slot", triggerLabel: "バジリスクチャンス", triggerRate: 124.7, triggerSuccess: 0.30, mainLabel: "バジリスクタイム", mainRate: 418.1, base50: 31.7, coinUnit: 3.7, normalMin: 220, normalMax: 1100, specialLabel: "絆高確", specialChance: 0.36, specialMin: 240, specialMax: 1050, specialDisplay: "coins", cycleFlow: { phase: "BASILISK TIME", label: "争忍の刻", statLabel: "BT継続", games: 40, continueChance: 0.75, maxRounds: 12, rewards: [[{ label: "追想の刻", payout: 120 }, 0.55], [{ label: "絆高確", payout: 240 }, 0.30], [{ label: "完全勝利報酬", payout: 480 }, 0.15]], endLabel: "バジリスクタイム終了" }, upperChallenge: "宿怨チャレンジ", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "宿怨ループ", upperContinue: 0.82, upperPayout: 650, settingRates: { 1: { trigger: 124.7, main: 418.1, payout: 0.974 }, 2: { trigger: 123.2, main: 405.0, payout: 0.985 }, 3: { trigger: 119.2, main: 362.4, payout: 1.020 }, 4: { trigger: 113.6, main: 311.2, payout: 1.062 }, 5: { trigger: 108.5, main: 278.5, payout: 1.105 }, 6: { trigger: 105.0, main: 247.3, payout: 1.149 } } },
    articleSections: [
      { heading: "BCとBTの設定別確率", paragraphs: ["BCは設定1約1/124.7〜設定6約1/105.0、BTは約1/418.1〜約1/247.3です。", "抽選された設定の公開初当りと出玉率を使用し、結果とランキングへ設定を表示します。"] },
      { heading: "絆高確から宿怨へ", paragraphs: ["BTは純増約2.9枚/Gで、絆高確とシナリオにより継続を狙います。", "宿怨チャレンジ以降の細かな内部抽選は、上位挑戦と継続ループへ簡略化しています。"] }
    ],
    sources: [["ユニバーサル 公式機種サイト", "https://www.universal-777.com/product/slot/bk2t/"], ["P-WORLD 設定別スペック", "https://www.p-world.co.jp/machine/database/9944"], ["一撃 BT・宿怨チャレンジ解析", "https://1geki.jp/slot/l_b_kizuna2_tnzn/"]]
  },
  "chibariyo2-slot": {
    order: 16.0, type: "slot", theme: "flame", year: "2024年3月", maker: "ネット", updated: "2026-11-07",
    name: "チバリヨ2", shortName: "チバリヨ2",
    image: "assets/machines/chibariyo2-slot-key-visual.jpg",
    imageAlt: "チバリヨ2のキービジュアル",
    imageCredit: "P-WORLD 基本情報",
    imageSource: "https://www.p-world.co.jp/machine/database/10014",
    catchcopy: "チェリー回数とモードから花笠点灯へ。天国・パトランプを目指す。",
    intro: "擬似チェリーと規定ゲーム数でボーナスを抽選し、32G連と高継続モードを狙うスマスロです。",
    points: ["設定1初当り約1/328.0", "設定6初当り約1/224.8", "純増約3.0・4.5枚/G"],
    specs: [["初当り（設定1）", "約1/328.0"], ["初当り（設定6）", "約1/224.8"], ["ベース（設定1）", "約27.9G/50枚"], ["BIG", "約210枚"], ["REG", "約90枚"], ["SBIG", "約315枚"], ["通常BONUS純増", "約3.0枚/G"], ["SBIG純増", "約4.5枚/G"], ["設定", "1・2・4・5・6"]],
    sim: { kind: "slot", settingPool: [1, 2, 4, 5, 6], triggerLabel: "チェリー前兆", triggerRate: 165, triggerSuccess: 0.50, mainLabel: "花笠ボーナス", mainRate: 328.0, base50: 27.9, coinUnit: 4.5, normalMin: 90, normalMax: 315, atPureIncrease: 3.0, specialLabel: "天国モード", specialChance: 0.38, specialMin: 90, specialMax: 315, specialDisplay: "bonus", cycleFlow: { phase: "CHIBARIYO HEAVEN", label: "天国32G", statLabel: "花笠ボーナス連", games: 32, continueChance: 0.68, maxRounds: 20, rewards: [[{ label: "REG BONUS", payout: 90 }, 0.28], [{ label: "BIG BONUS", payout: 210 }, 0.57], [{ label: "SUPER BIG", payout: 315 }, 0.15]], endLabel: "天国モード終了" }, upperChallenge: "パトランプ点灯", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "リミットレス", upperContinue: 0.88, upperPayout: 650, upperPureIncrease: 4.5, upperSetGames: [[70, 1]], settingRates: { 1: { main: 328.0, payout: 0.973 }, 2: { main: 314.4, payout: 0.993 }, 4: { main: 281.1, payout: 1.047 }, 5: { main: 263.3, payout: 1.096 }, 6: { main: 224.8, payout: 1.149 } } },
    articleSections: [
      { heading: "実機搭載の5段階設定", paragraphs: ["設定1・2・4・5・6から均等抽選し、設定3は対象外です。初当りは約1/328.0〜約1/224.8です。", "設定1のベース約27.9G/50枚と公開出玉率97.3%〜114.9%を使用します。"] },
      { heading: "天国とパトランプ", paragraphs: ["REG約90枚、BIG約210枚、SBIG約315枚から32G以内の連チャンを狙います。", "天国の継続率66%・75%・80%を段階的に反映し、6連目のパトランプ昇格抽選、10連目の赤パトモード、15連目の虹パトモードを節目として表示します。赤パトは約88%、虹パトは約92%継続の代表値です。", "15連後に終了した場合はリミットレスモードへ進みます。弱チェリー・強チェリー契機の1G連は各BONUSの振り分けへまとめ、チェリー天井や全モード移行は完全再現していません。"] }
    ],
    sources: [["NET 公式機種情報", "https://www.net-fun.co.jp/chibariyo2/"], ["Pachibee BONUS・設定別スペック", "https://www.pachibee.jp/machines/index/224020004"], ["なな徹 天国・パトランプモード", "https://nana-press.com/kaiseki/machine/722/19944/"], ["P-WORLD 基本情報", "https://www.p-world.co.jp/machine/database/10014"]]
  }
};

// Machines below use a named, machine-specific sequence instead of the generic
// add-on/bonus draw. The shared renderer keeps the UI consistent while each
// machine owns its phase, loop unit, rewards and exit wording.
(() => {
  const dedicatedCycleModels = {
    "goblin-slayer-slot": { phase: "GOBLIN SLAYER RUSH", label: "ゴブリンスレイヤーRUSH", statLabel: "ゴブリン討伐", roundLabels: ["依頼受注", "小鬼の巣", "ホブゴブリン戦", "ゴブリンチャンピオン戦", "ゴブリンロード決戦"], games: [[30, 0.55], [50, 0.30], [100, 0.15]], continueChance: 0.68, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "討伐報酬", payout: 300 }, 0.55], [{ kind: "bonus", label: "ゴブリンスレイヤーBONUS", games: 40, payout: 600 }, 0.30], [{ kind: "coins", label: "ULTIMATE LOOP報酬", payout: 1200 }, 0.15]], endLabel: "ゴブリンスレイヤーRUSH終了" },
    "assault-lily-slot": { phase: "ASSAULT LILY RUSH", label: "ヒュージバトル", statLabel: "ヒュージ撃破", roundLabels: ["ヒュージ襲来", "ノインヴェルト戦術", "レアスキル発動", "大型ヒュージ戦", "ラストバレット"], games: 20, continueChance: 0.70, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "ヒュージ撃破上乗せ", games: [[10, 0.50], [20, 0.30], [30, 0.15], [50, 0.05]] }, 0.55], [{ kind: "bonus", label: "アサルトスパイラル", games: 30, payout: 300 }, 0.30], [{ kind: "games", label: "レアスキル報酬", games: [[50, 0.70], [100, 0.30]] }, 0.15]], endLabel: "アサルトリリィRUSH終了" },
    "kaguya-sama-slot": { phase: "KAGUYA BONUS LOOP", label: "BONUSループ", statLabel: "告らせたい連", roundLabels: ["告らせたい 1回目", "告らせたい 2回目", "告らせたい 3回目", "花火の音は聞こえない", "奇跡的相性ジャッジ"], games: [[10, 0.49], [30, 0.50], [54, 0.01]], continueChance: 0.68, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "REG BONUS", games: 10, payout: 83 }, 0.49], [{ kind: "bonus", label: "BIG BONUS", games: 30, payout: 270 }, 0.50], [{ kind: "bonus", label: "SUPER BIG", games: 54, payout: 490 }, 0.01]], endLabel: "BONUSループ終了" },
    "dumbbell-slot": { phase: "GOLDEN TIME", label: "ゴールデンタイム", statLabel: "トレーニング成功", roundLabels: ["準備運動", "筋トレ開始", "シルバーマンジム", "筋肉覚醒", "ゴールデンチャレンジ"], games: [[20, 0.55], [40, 0.30], [80, 0.15]], continueChance: 0.56, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "ダンベルBONUS", games: 20, payout: 250 }, 0.55], [{ kind: "bonus", label: "VストックBONUS", games: 40, payout: 500 }, 0.30], [{ kind: "bonus", label: "筋肉覚醒BONUS", games: 80, payout: 1000 }, 0.15]], endLabel: "ゴールデンタイム終了" },
    "kanokari-slot": { phase: "RENT-A-GIRLFRIEND", label: "1G恋ストック", statLabel: "デート成功", roundLabels: ["デート準備", "水原デート", "更科デート", "桜沢デート", "S級デートジャッジ"], games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.60, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "かのかりBONUS", games: 20, payout: 150 }, 0.55], [{ kind: "bonus", label: "デートBONUS", games: 40, payout: 300 }, 0.30], [{ kind: "bonus", label: "S級BONUS", games: 80, payout: 600 }, 0.15]], endLabel: "1G恋ストック終了" },
    "aobuta-slot": { phase: "AO BUTA JUDGE", label: "青ブタJUDGE", statLabel: "青春継続", roundLabels: ["思春期症候群", "青春ジャッジ", "夢の続き", "エピソード分岐", "無限の夢ジャッジ"], games: 20, continueChance: 0.75, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "青春BONUS", games: 20, payout: 200 }, 0.55], [{ kind: "bonus", label: "青春DREAM BURST", games: 40, payout: 400 }, 0.30], [{ kind: "bonus", label: "エピソードBONUS", games: 80, payout: 800 }, 0.15]], endLabel: "青ブタJUDGE終了" },
    "hokuto-tensei2": { phase: "SHINKEN SHOBU", label: "神拳勝舞", statLabel: "勝舞魂突破", roundLabels: ["闘神演舞", "神拳勝舞 1戦目", "神拳勝舞 2戦目", "拳王強襲", "SPバトルジャッジ"], games: 30, continueChance: 0.72, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "勝舞魂上乗せ", games: [[10, 0.50], [20, 0.30], [30, 0.15], [50, 0.05]] }, 0.55], [{ kind: "coins", label: "闘神演舞継続", payout: 240 }, 0.30], [{ kind: "bonus", label: "拳王強襲", games: 50, payout: 480 }, 0.15]], endLabel: "神拳勝舞終了" },
    "bofuri-slot": { phase: "BOFURI BONUS", label: "防振りBONUS", statLabel: "防御状態", roundLabels: ["防御状態 Lv.1", "防御状態 Lv.2", "防御状態 Lv.3", "防御状態 Lv.4", "暴虐ジャッジ"], games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.70, maxRounds: 5, upperAfterRounds: 4, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "防振りBONUS", games: 20, payout: 180 }, 0.55], [{ kind: "bonus", label: "暴虐ZONE", games: 40, payout: 360 }, 0.30], [{ kind: "bonus", label: "極・高確率BONUS", games: 80, payout: 720 }, 0.15]], endLabel: "防振りBONUS終了" },
    "azur-lane-slot": { phase: "FLEET BATTLE", label: "艦隊戦", statLabel: "海戦勝利", roundLabels: ["ユニオン海域", "ロイヤル海域", "重桜海域", "鉄血海域", "セイレーン決戦"], games: 30, continueChance: 0.70, maxRounds: 5, upperAfterRounds: 4, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "海戦勝利上乗せ", games: [[10, 0.50], [20, 0.30], [30, 0.15], [50, 0.05]] }, 0.55], [{ kind: "bonus", label: "4陣営集結", games: 40, payout: 400 }, 0.30], [{ kind: "games", label: "エンタープライズ参戦", games: [[50, 0.70], [100, 0.30]] }, 0.15]], endLabel: "艦隊戦終了" },
    "million-god-kiseki": { phase: "GOD GAME", label: "GOD GAME", statLabel: "GOD GAME連", roundLabels: ["GOD GAME SET 1", "GOD GAME SET 2", "GOD GAME SET 3", "GOD GAME SET 4", "GOD GAME SET 5"], games: 50, continueChance: 0.65, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "GOD GAME 1セット", payout: 350 }, 0.55], [{ kind: "coins", label: "Z-GAMEストック", payout: 700 }, 0.30], [{ kind: "bonus", label: "GOD揃い報酬", games: 100, payout: 1750 }, 0.15]], endLabel: "GOD GAME終了" },
    "magical-halloween8": { phase: "KABO CHANCE", label: "カボチャンス", statLabel: "カボチャンス継続", roundLabels: ["カボチャンス 1セット", "カボチャレンジ", "まじかるちゃんす", "キングカボチャンス", "スーパーカボジャッジ"], games: 30, continueChance: 0.70, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "カボチャンスストック", games: [[10, 0.50], [20, 0.30], [30, 0.15], [50, 0.05]] }, 0.55], [{ kind: "bonus", label: "ボーナス当選", games: 30, payout: 180 }, 0.30], [{ kind: "bonus", label: "キングカボチャンス", games: 50, payout: 360 }, 0.15]], endLabel: "カボチャンス終了" },
    "toloveru-darkness-slot": { phase: "PARADISE PROJECT", label: "楽園計画", statLabel: "楽園計画継続", roundLabels: ["楽園計画 1st", "ヒロインジャッジ", "ドキドキ高確", "ハーレムチャンス", "ハーレムモードジャッジ"], games: [[15, 0.55], [30, 0.30], [60, 0.15]], continueChance: 0.66, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "100枚BONUS", payout: 100 }, 0.50], [{ kind: "coins", label: "200枚BONUS", payout: 200 }, 0.30], [{ kind: "coins", label: "400枚BONUS", payout: 400 }, 0.15], [{ kind: "bonus", label: "800枚BONUS", games: 60, payout: 800 }, 0.04], [{ kind: "bonus", label: "1600枚BONUS", games: 100, payout: 1600 }, 0.01]], endLabel: "楽園計画終了" },
    "kinnikuman-7-slot": { phase: "DEVIL CHOJIN BATTLE", label: "悪魔超人バトル", statLabel: "悪魔超人撃破", roundLabels: ["悪魔超人 1戦目", "悪魔超人 2戦目", "悪魔超人 3戦目", "悪魔超人 4戦目", "悪魔超人 5戦目", "悪魔超人 6戦目", "悪魔超人 7戦目"], games: 20, continueChance: 0.70, maxRounds: 7, upperAfterRounds: 7, upperAfterRoundsAutoSuccess: true, upperOnlyAfterRounds: true, rewards: [[{ kind: "coins", label: "悪魔超人撃破", payout: 250 }, 0.55], [{ kind: "coins", label: "正義超人参戦", payout: 500 }, 0.30], [{ kind: "bonus", label: "バッファローマン撃破", games: 30, payout: 750 }, 0.15]], endLabel: "7人の悪魔超人終了" },
    "seiya-ougon-slot": { phase: "TWELVE TEMPLES", label: "十二宮バトル", statLabel: "黄金聖闘士撃破", roundLabels: ["白羊宮", "金牛宮", "双児宮", "巨蟹宮", "獅子宮", "処女宮", "天秤宮", "天蠍宮", "人馬宮", "磨羯宮", "宝瓶宮", "双魚宮"], games: 30, continueChance: 0.76, maxRounds: 12, upperAfterRounds: 12, upperAfterRoundsAutoSuccess: true, upperOnlyAfterRounds: true, rewards: [[{ kind: "games", label: "小宇宙上乗せ", games: [[10, 0.50], [20, 0.30], [30, 0.15], [50, 0.05]] }, 0.55], [{ kind: "bonus", label: "黄金聖闘士撃破報酬", games: 30, payout: 300 }, 0.30], [{ kind: "games", label: "小宇宙覚醒", games: [[50, 0.75], [100, 0.25]] }, 0.15]], endLabel: "十二宮バトル終了" },
    "ggo-slot": { phase: "SQUAD JAM", label: "SQUAD JAMバトル", statLabel: "SQUAD JAM勝利", roundLabels: ["SQUAD JAM 予選", "市街地戦", "チーム対決", "FINAL BATTLE"], games: 20, continueChance: 0.72, maxRounds: 4, upperAfterRounds: 4, upperAfterRoundsAutoSuccess: false, upperOnlyAfterRounds: true, rewards: [[{ kind: "games", label: "レン上乗せ", games: [[10, 0.50], [20, 0.30], [30, 0.15], [50, 0.05]] }, 0.55], [{ kind: "bonus", label: "ガンゲイルBONUS", games: 30, payout: 260 }, 0.30], [{ kind: "games", label: "上乗せ特化", games: [[50, 0.75], [100, 0.25]] }, 0.15]], endLabel: "SQUAD JAM敗退" },
    "god-eater-resurrection": { phase: "ARAGAMI BATTLE", label: "アラガミ交戦", statLabel: "アラガミ討伐", roundLabels: ["索敵パート", "アラガミ交戦", "部位破壊", "捕喰チャンス", "強襲アラガミ", "討伐決着"], games: 25, continueChance: 0.76, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "捕喰成功", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.10]] }, 0.55], [{ kind: "bonus", label: "部位破壊報酬", games: 30, payout: 360 }, 0.30], [{ kind: "games", label: "神機覚醒", games: [[50, 0.70], [100, 0.30]] }, 0.15]], endLabel: "アラガミ交戦終了" },
    "shin-eva-slot": { phase: "OPERATION ST", label: "作戦ST", statLabel: "作戦成功", roundLabels: ["迎撃作戦", "初号機出撃", "三機殲滅", "使徒強襲", "最終作戦"], games: 30, continueChance: 0.68, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "シン・エヴァBONUS", games: 30, payout: 200 }, 0.55], [{ kind: "bonus", label: "三機殲滅BONUS", games: 40, payout: 400 }, 0.30], [{ kind: "bonus", label: "エピソードBONUS", games: 50, payout: 800 }, 0.15]], endLabel: "作戦ST終了" },
    "garo-yami-slot": { phase: "MAKAI BONUS", label: "BONUSジャッジ", statLabel: "魔戒継続", roundLabels: ["魔戒への扉", "牙狼剣ジャッジ", "ホラーバトル", "魔戒決戦", "究極ジャッジ"], games: [[20, 0.80], [110, 0.20]], continueChance: 0.50, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "GARO BONUS", games: 20, payout: 180 }, 0.70], [{ kind: "bonus", label: "BIG BONUS", games: 40, payout: 360 }, 0.20], [{ kind: "bonus", label: "SUPER GARO BONUS", games: 110, payout: 1000 }, 0.10]], endLabel: "BONUSジャッジ終了" },
    "basilisk4-slot": { phase: "BASILISK TIME IV", label: "争忍の刻", statLabel: "争忍継続", roundLabels: ["追想の刻", "争忍の刻 1戦目", "争忍の刻 2戦目", "絆高確", "争忍の刻 3戦目", "天膳バトル"], games: 30, continueChance: 0.75, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "胎動の刻", games: [[10, 0.50], [20, 0.30], [30, 0.15], [50, 0.05]] }, 0.55], [{ kind: "bonus", label: "胎動の刻・連撃", games: 30, payout: 300 }, 0.30], [{ kind: "games", label: "真瞳術ストック", games: [[50, 0.70], [100, 0.30]] }, 0.15]], endLabel: "バジリスクタイム終了" },
    "tokyo-ghoul-slot": { phase: "TOKYO GHOUL BITES", label: "東京喰種咬", statLabel: "BITES突破", roundLabels: ["BITES 1st", "BITES 2nd", "BITES 3rd", "CCG FINAL"], games: 30, continueChance: 0.72, maxRounds: 4, upperAfterRounds: 4, upperAfterRoundsAutoSuccess: false, upperOnlyAfterRounds: true, rewards: [[{ kind: "games", label: "BITES 1段階", games: [[10, 0.50], [20, 0.30], [30, 0.15], [50, 0.05]] }, 0.55], [{ kind: "bonus", label: "BITES 2段階", games: 30, payout: 300 }, 0.30], [{ kind: "games", label: "BITES 3段階", games: [[50, 0.70], [100, 0.30]] }, 0.15]], endLabel: "東京喰種咬終了" },
    "lycoris-recoil-slot": { phase: "LYCORIS RUSH", label: "リコリスラッシュ", statLabel: "ミッション成功", roundLabels: ["喫茶リコリコ", "DAミッション", "千束VS真島", "延空木決戦", "FINAL MISSION"], games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.70, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "リコリスBONUS", games: 20, payout: 200 }, 0.55], [{ kind: "bonus", label: "リコリスBONUS W", games: 40, payout: 400 }, 0.30], [{ kind: "bonus", label: "喫茶リコリコBONUS", games: 80, payout: 800 }, 0.15]], endLabel: "リコリスラッシュ終了" },
    "gundam-seed-slot": { phase: "STRIKE RIDE", label: "ストライクライド", statLabel: "ストライクライド継続", roundLabels: ["ストライク出撃", "ブリッツ戦", "イージス戦", "ジャスティス共闘", "フリーダム決戦"], games: [[15, 0.55], [30, 0.30], [50, 0.15]], continueChance: 0.74, maxRounds: 5, upperAfterRounds: 5, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "ストライクBONUS", games: 20, payout: 200 }, 0.55], [{ kind: "bonus", label: "エピソードBONUS", games: 40, payout: 400 }, 0.30], [{ kind: "bonus", label: "フリーダムBONUS", games: 80, payout: 800 }, 0.15]], endLabel: "ストライクライド終了" },
    "monster-hunter-rise-slot": { phase: "HUNTING BONUS", label: "狩猟ボーナス", statLabel: "モンスター討伐", roundLabels: ["大型モンスター遭遇", "狩猟開始", "部位破壊", "討伐チャンス", "剥ぎ取り", "百竜強襲"], games: 40, continueChance: 0.72, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "剥ぎ取り成功", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.10]] }, 0.55], [{ kind: "bonus", label: "部位破壊報酬", games: 30, payout: 360 }, 0.30], [{ kind: "games", label: "剥ぎ取りG", games: [[50, 0.70], [100, 0.30]] }, 0.15]], endLabel: "狩猟終了" },
    "symphogear-seigi-slot": { phase: "AXZ RUSH", label: "ギアVアタック", statLabel: "ギアVアタック", games: 30, continueChance: 0.68, maxRounds: 10, rewards: [[{ kind: "games", label: "ギアVアタック成功", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.70], [{ kind: "bonus", label: "絶唱", games: 30, payout: 300 }, 0.30]], endLabel: "AXZラッシュ終了" },
    "ragnador-slot": { phase: "RAGNADOR RUSH", label: "チェインアタック", statLabel: "チェイン継続", games: 40, continueChance: 0.70, maxRounds: 10, rewards: [[{ kind: "games", label: "チェイン上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.70], [{ kind: "bonus", label: "ガチャBONUS", games: 30, payout: 270 }, 0.30]], endLabel: "ラグナドールRUSH終了" },
    "godzilla-eva2-slot": { phase: "GODZILLA VS EVA", label: "震撃チャンス", statLabel: "震撃継続", games: 50, continueChance: 0.62, maxRounds: 8, rewards: [[{ kind: "games", label: "10倍上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "ゴジエヴァBONUS", games: 30, payout: 390 }, 0.35]], endLabel: "ゴジエヴァRUSH終了" },
    "mahoako-slot": { phase: "MAHOAKO RUSH", label: "あこがれATTACK", statLabel: "あこがれATTACK", games: 30, continueChance: 0.68, maxRounds: 10, rewards: [[{ kind: "games", label: "あこがれ上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.60], [{ kind: "bonus", label: "サディスティックBONUS", games: 30, payout: 270 }, 0.40]], endLabel: "まほあこラッシュ終了" },
    "monster-hunter-sunbreak": { phase: "HUNTING QUEST", label: "盟勇クエスト", statLabel: "モンスター討伐", games: 40, continueChance: 0.72, maxRounds: 10, rewards: [[{ kind: "games", label: "討伐成功・剥ぎ取り", games: [[10, 0.35], [20, 0.30], [30, 0.20], [50, 0.10], [100, 0.05]] }, 0.65], [{ kind: "bonus", label: "サンブレイクBONUS", games: 30, payout: 300 }, 0.25], [{ kind: "games", label: "剥ぎ取りRUSH", games: [[50, 0.70], [100, 0.30]] }, 0.10]], endLabel: "サンブレイクRUSH終了" },
    "magia-record-slot": { phase: "MAGIA RUSH", label: "マギアアタック", statLabel: "マギアアタック", games: 40, continueChance: 0.67, maxRounds: 10, rewards: [[{ kind: "games", label: "ドッペル上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.70], [{ kind: "bonus", label: "マギアボーナス", games: 30, payout: 225 }, 0.30]], endLabel: "マギアラッシュ終了" },
    "shin-onimusha3-slot": { phase: "SOUKEN RUSH", label: "蒼剣RUSHセット", statLabel: "蒼剣RUSH継続", games: 40, continueChance: 0.72, maxRounds: 12, rewards: [[{ kind: "games", label: "鬼武侠", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.60], [{ kind: "bonus", label: "蒼剣BONUS", games: 30, payout: 270 }, 0.40]], endLabel: "蒼剣RUSH終了" },
    "bancho4-slot": { phase: "ITADAKI RISE", label: "対決", statLabel: "対決勝利", games: 30, continueChance: 0.68, maxRounds: 10, rewards: [[{ kind: "games", label: "頂RISE UP", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "番長ボーナス", games: 30, payout: 270 }, 0.35]], endLabel: "頂RISE終了" },
    "zenigata4-slot": { phase: "ARREST RUSH", label: "デカチャンス", statLabel: "逮捕成功", games: 50, continueChance: 0.66, maxRounds: 10, rewards: [[{ kind: "games", label: "ゼニロボ起動", games: [[10, 0.40], [20, 0.30], [30, 0.18], [50, 0.10], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "逮捕BONUS", games: 30, payout: 330 }, 0.35]], endLabel: "逮捕RUSH終了" },
    "gundam-unicorn-awakening-drive": { phase: "AWAKENING HYPER", label: "覚醒HYPER", statLabel: "覚醒上乗せ", games: 40, continueChance: 0.66, maxRounds: 10, rewards: [[{ kind: "games", label: "覚醒HYPER上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.60], [{ kind: "bonus", label: "エピソードボーナス", games: 30, payout: 300 }, 0.40]], endLabel: "覚醒HYPER終了" },
    "toaru-index2-slot": { phase: "IMAGINE BREAKER RUSH", label: "幻想BURST", statLabel: "幻想BURST", games: 30, continueChance: 0.68, maxRounds: 10, rewards: [[{ kind: "games", label: "幻想BURST上乗せ", games: [[10, 0.40], [20, 0.30], [30, 0.18], [50, 0.10], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "超電磁砲BONUS", games: 30, payout: 300 }, 0.35]], endLabel: "幻想殺しRUSH終了" },
    "iza-bancho": { phase: "ITADAKI ZBASH", label: "斬揃いジャッジ", statLabel: "頂ZBASH継続", games: 40, continueChance: 0.66, maxRounds: 10, rewards: [[{ kind: "games", label: "頂ZBASH上乗せ", games: [[10, 0.34], [20, 0.28], [30, 0.20], [50, 0.13], [100, 0.05]] }, 0.65], [{ kind: "bonus", label: "絶頂決戦～巌流島～", games: 30, payout: 375 }, 0.35]], endLabel: "頂ZBASH終了" },
    "biohazard5-slot": { phase: "HAZARD RUSH", label: "ウロボロス", statLabel: "増殖上乗せ", games: 40, continueChance: 0.69, maxRounds: 10, rewards: [[{ kind: "games", label: "増殖上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "エピソードBONUS", games: 30, payout: 300 }, 0.35]], endLabel: "ハザードラッシュ終了" },
    "bancho-banzuke": { phase: "TODOROKI CHANCE", label: "番付決戦", statLabel: "番付決戦勝利", games: 30, continueChance: 0.67, maxRounds: 10, rewards: [[{ kind: "games", label: "轟チャンス上乗せ", games: [[10, 0.42], [20, 0.30], [30, 0.18], [50, 0.08], [100, 0.02]] }, 0.58], [{ kind: "bonus", label: "番付決戦勝利", games: 30, payout: 420 }, 0.42]], endLabel: "轟チャンス終了" },
    "zegapain-etr": { phase: "RESURRECTION", label: "ゼーガバースト", statLabel: "リザレクション継続", games: 30, continueChance: 0.65, maxRounds: 10, rewards: [[{ kind: "games", label: "ゼーガバースト上乗せ", games: [[30, 0.42], [50, 0.30], [100, 0.18], [200, 0.08], [300, 0.02]] }, 0.62], [{ kind: "bonus", label: "リザレクションボーナス再点灯", games: 45, payout: 315 }, 0.38]], endLabel: "リザレクション終了" },
    "blue-reflection-tie": { phase: "BLUE REFLECTION RUSH", label: "全刈ジャッジ", statLabel: "全刈上乗せ", games: 30, continueChance: 0.68, maxRounds: 10, rewards: [[{ kind: "games", label: "全刈上乗せ", games: [[10, 0.38], [20, 0.30], [30, 0.20], [50, 0.10], [100, 0.02]] }, 0.68], [{ kind: "bonus", label: "リフレクションBONUS", games: 30, payout: 300 }, 0.32]], endLabel: "BLUE REFLECTION RUSH終了" },
    "vivy-slot": { phase: "PROJECT SINGULARITY", label: "SINGULARITY BATTLE", statLabel: "ミッション成功", games: 30, continueChance: 0.70, maxRounds: 10, rewards: [[{ kind: "games", label: "OVER DRIVE", games: [[10, 0.44], [20, 0.30], [30, 0.16], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "SINGULARITY BONUS", games: 30, payout: 240 }, 0.35]], endLabel: "プロジェクトシンギュラリティ終了" },
    "golden-kamuy-slot": { phase: "GOLDEN KAMUY", label: "ゴールドラッシュ", statLabel: "金塊争奪", games: 100, continueChance: 0.60, maxRounds: 8, rewards: [[{ kind: "games", label: "ゴールドラッシュ上乗せ", games: [[10, 0.40], [20, 0.30], [30, 0.20], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "決戦ボーナス", games: 30, payout: 375 }, 0.35]], endLabel: "黄金神威終了" },
    "shin-onimusha2-slot": { phase: "SOUKEN RUSH", label: "鬼武侠", statLabel: "蒼剣RUSH継続", games: 40, continueChance: 0.70, maxRounds: 12, rewards: [[{ kind: "games", label: "鬼武侠上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.60], [{ kind: "bonus", label: "蒼剣BONUS", games: 30, payout: 240 }, 0.40]], endLabel: "蒼剣RUSH終了" },
    "lupin-dai-koukaisha": { phase: "SUPER HERO", label: "デカ目高確", statLabel: "デカ目成功", games: 30, continueChance: 0.68, maxRounds: 10, rewards: [[{ kind: "games", label: "デカ目上乗せ", games: [[10, 0.42], [20, 0.28], [30, 0.18], [50, 0.10], [100, 0.02]] }, 0.62], [{ kind: "bonus", label: "HERO BONUS", games: 30, payout: 270 }, 0.38]], endLabel: "SUPER HERO終了" },
    "godzilla-eva-slot": { phase: "G AWAKENING RUSH", label: "殲滅作戦", statLabel: "殲滅作戦", games: 50, continueChance: 0.64, maxRounds: 8, rewards: [[{ kind: "games", label: "怪獣撃破上乗せ", games: [[10, 0.40], [20, 0.30], [30, 0.18], [50, 0.10], [100, 0.02]] }, 0.58], [{ kind: "bonus", label: "殲滅作戦BONUS", games: 30, payout: 375 }, 0.42]], endLabel: "G覚醒RUSH終了" }
  };
  Object.entries(dedicatedCycleModels).forEach(([slug, cycleFlow]) => {
    const sim = window.ICHIGEKI_MACHINES[slug]?.sim;
    if (!sim) return;
    sim.cycleFlow = cycleFlow;
    delete sim.specialOutcomes;
  });
})();

// Expanded, title-specific AT flows for the next group of popular machines.
// These run after the base cycle map so older generic definitions are replaced.
(() => {
  const advancedCycleModels = {
    "symphogear-seigi-slot": { phase: "AXZ RUSH", label: "ギアVアタック", statLabel: "ギアVアタック成功", roundLabels: ["AXZラッシュ開幕", "翼 ギアVアタック", "クリス ギアVアタック", "マリア ギアVアタック", "調＆切歌 共闘", "絶唱BATTLEジャッジ"], games: 30, continueChance: 0.68, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "ギアVアタック上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.70], [{ kind: "bonus", label: "絶唱BONUS", games: 30, payout: 300 }, 0.30]], endLabel: "AXZラッシュ終了" },
    "fire-force2-slot": { phase: "FIRE FORCE LOOP", label: "炎炎激闘", statLabel: "炎炎激闘勝利", roundLabels: ["第8特殊消防隊 出動", "炎炎激闘 1戦目", "炎炎激闘 2戦目", "アドラリンク", "灰焔騎士団強襲", "森羅万象ジャッジ"], games: [[15, 0.50], [40, 0.40], [80, 0.10]], continueChance: 0.68, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "REGULAR BONUS", games: 15, payout: 90 }, 0.45], [{ kind: "bonus", label: "炎炎BONUS", games: 40, payout: 230 }, 0.40], [{ kind: "bonus", label: "灰焔騎士団BONUS", games: 80, payout: 460 }, 0.15]], endLabel: "炎炎激闘終了" },
    "gundam-unicorn-awakening-drive": { phase: "AWAKENING HYPER", label: "覚醒HYPER", statLabel: "覚醒上乗せ", roundLabels: ["ユニコーン起動", "覚醒HYPER 1st", "NT-D発動", "エピソード分岐", "覚醒の光", "Over The Rainbowジャッジ"], games: 40, continueChance: 0.66, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "覚醒HYPER上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.60], [{ kind: "bonus", label: "エピソードBONUS", games: 30, payout: 300 }, 0.40]], endLabel: "覚醒HYPER終了" },
    "toaru-index2-slot": { phase: "IMAGINE BREAKER RUSH", label: "幻想BURST", statLabel: "幻想BURST成功", roundLabels: ["幻想殺しRUSH開幕", "異能バトル", "幻想BURST 1st", "超電磁砲BONUS", "幻想BURST 2nd", "最強特化ゾーンジャッジ"], games: 30, continueChance: 0.68, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "幻想BURST上乗せ", games: [[10, 0.40], [20, 0.30], [30, 0.18], [50, 0.10], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "超電磁砲BONUS", games: 30, payout: 300 }, 0.35]], endLabel: "幻想殺しRUSH終了" },
    "mushoku-tensei-slot": { phase: "ISEKAI RUSH", label: "ヒロインバトル", statLabel: "ヒロインバトル勝利", roundLabels: ["異世界RUSH開幕", "ロキシー共闘", "エリス共闘", "シルフィ共闘", "バケーションゾーン", "ターニングポイント2"], games: 30, continueChance: 0.70, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "Vストック獲得", payout: 180 }, 0.55], [{ kind: "bonus", label: "バケーションゾーン", games: 30, payout: 360 }, 0.30], [{ kind: "bonus", label: "ヒロインBONUS", games: 60, payout: 720 }, 0.15]], endLabel: "異世界RUSH終了" },
    "super-bingo-neo-slot": { phase: "BINGO CHANCE", label: "Hooah!ゲーム数決定", statLabel: "BC継続", roundLabels: ["BINGO CHANCE開始", "7セグ継続ジャッジ", "Hooah! 1st", "7セグ再始動", "Hooah! 2nd", "加速BINGOジャッジ"], games: [[33, 0.60], [111, 0.25], [222, 0.10], [333, 0.05]], continueChance: 0.58, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "BC 33G", payout: 200 }, 0.60], [{ kind: "games", label: "Hooah! 111G", games: 111 }, 0.25], [{ kind: "games", label: "Hooah! 222G", games: 222 }, 0.10], [{ kind: "games", label: "Hooah! 333G", games: 333 }, 0.05]], endLabel: "BINGO CHANCE終了" },
    "biohazard5-slot": { phase: "HAZARD RUSH", label: "増殖ジャッジ", statLabel: "増殖成功", roundLabels: ["ハザードラッシュ開始", "ウロボロス感染", "増殖上乗せ", "エピソード分岐", "シューティングバースト", "クライマックスウェスカーゾーン"], games: 40, continueChance: 0.69, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "増殖上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "エピソードBONUS", games: 30, payout: 300 }, 0.35]], endLabel: "ハザードラッシュ終了" },
    "yoshimune-slot": { phase: "YOSHIMUNE BONUS", label: "1G連ジャッジ", statLabel: "1G連成功", roundLabels: ["吉宗BONUS開始", "7揃いジャッジ", "1G連 1回目", "1G連 2回目", "鷹狩り", "裏鷹狩りジャッジ"], games: [[100, 0.60], [10, 0.40]], continueChance: 0.35, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "BIG BONUS", games: 100, payout: 711 }, 0.60], [{ kind: "bonus", label: "REG BONUS", games: 10, payout: 72 }, 0.40]], endLabel: "1G連終了" },
    "tokyo-revengers-slot": { phase: "TOMAN RUSH", label: "東卍RUSH", statLabel: "抗争勝利", roundLabels: ["東卍RUSH開幕", "8・3抗争", "血のハロウィン", "聖夜決戦", "黒い衝動", "リベンジチャンス"], games: 30, continueChance: 0.72, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "BREAK CHANCE", payout: 220 }, 0.55], [{ kind: "bonus", label: "東卍BONUS", games: 30, payout: 440 }, 0.30], [{ kind: "bonus", label: "黒い衝動", games: 60, payout: 880 }, 0.15]], endLabel: "東卍RUSH終了" },
    "bancho4-slot": { phase: "ITADAKI RISE", label: "対決", statLabel: "対決勝利", roundLabels: ["頂RISE開始", "ノリオ対決", "サキ対決", "チャッピー対決", "巌対決", "超番長BONUSジャッジ"], games: 30, continueChance: 0.68, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "頂RISE UP", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "番長BONUS", games: 30, payout: 270 }, 0.35]], endLabel: "頂RISE終了" },
    "inuyasha2-slot": { phase: "BUTTAGIRI SLASH", label: "ボーナス＋1ジャッジ", statLabel: "ボーナス連", roundLabels: ["ブッた斬りスラッシュ開始", "妖怪バトル", "ブッた斬りBONUS", "BIG BONUS", "ブーストチャンス", "奈落チャレンジ"], games: [[20, 0.60], [30, 0.30], [50, 0.10]], continueChance: 0.70, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "ブッた斬りBONUS", games: 20, payout: 240 }, 0.55], [{ kind: "bonus", label: "BIG BONUS", games: 30, payout: 480 }, 0.30], [{ kind: "bonus", label: "ブーストチャンス", games: 50, payout: 720 }, 0.15]], endLabel: "ブッた斬りスラッシュ終了" },
    "basilisk-tenzen-slot": { phase: "BASILISK TIME", label: "争忍の刻", statLabel: "争忍勝利", roundLabels: ["追想の刻", "争忍の刻 1戦目", "絆高確", "争忍の刻 2戦目", "天膳バトル", "宿怨チャレンジ"], games: 40, continueChance: 0.75, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "追想の刻", payout: 120 }, 0.55], [{ kind: "coins", label: "絆高確", payout: 240 }, 0.30], [{ kind: "bonus", label: "完全勝利報酬", games: 40, payout: 480 }, 0.15]], endLabel: "バジリスクタイム終了" }
  };
  Object.entries(advancedCycleModels).forEach(([slug, cycleFlow]) => {
    const sim = window.ICHIGEKI_MACHINES[slug]?.sim;
    if (!sim) return;
    sim.cycleFlow = cycleFlow;
    delete sim.specialOutcomes;
  });
})();

// A third group of machine-specific flows replaces generic loop presentation
// with each title's own bonus, battle, ST and upper-route progression.
(() => {
  const specializedCycleModels = {
    "magia-record-slot": { phase: "MAGIA RUSH", label: "マギアアタック", statLabel: "マギアアタック成功", roundLabels: ["マギアラッシュ開始", "いろは マギアアタック", "やちよ マギアアタック", "ドッペル発動", "マギアBONUS", "エンブリオ・イブ覚醒"], games: 40, continueChance: 0.67, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "ドッペル上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.70], [{ kind: "bonus", label: "マギアBONUS", games: 30, payout: 225 }, 0.30]], endLabel: "マギアラッシュ終了" },
    "okidoki-black": { phase: "OKIDOKI HEAVEN", label: "天国32G", statLabel: "32G以内連", roundLabels: ["初回BONUS", "天国32G 1連目", "天国32G 2連目", "カナちゃんランプ", "ドキドキモード", "超ドキドキジャッジ"], games: [[60, 0.65], [20, 0.35]], continueChance: 0.75, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "BIG BONUS", games: 60, payout: 210 }, 0.65], [{ kind: "bonus", label: "REG BONUS", games: 20, payout: 90 }, 0.35]], endLabel: "天国モード終了" },
    "okidoki-gold": { phase: "GOLD HEAVEN", label: "天国32G", statLabel: "32G以内連", roundLabels: ["初回BONUS", "天国32G 1連目", "天国32G 2連目", "金ハイビスカス点灯", "ドキドキモード", "超ドキドキジャッジ"], games: [[60, 0.65], [20, 0.35]], continueChance: 0.78, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "BIG BONUS", games: 60, payout: 210 }, 0.65], [{ kind: "bonus", label: "REG BONUS", games: 20, payout: 90 }, 0.35]], endLabel: "GOLD天国モード終了" },
    "shin-onimusha3-slot": { phase: "SOUKEN RUSH", label: "蒼剣RUSH", statLabel: "蒼剣RUSH継続", roundLabels: ["蒼剣RUSH 1st", "幻魔バトル", "鬼武侠", "蒼剣BONUS", "幻魔京決戦", "覚醒チャレンジ"], games: 40, continueChance: 0.72, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "鬼武侠上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.60], [{ kind: "bonus", label: "蒼剣BONUS", games: 30, payout: 270 }, 0.40]], endLabel: "蒼剣RUSH終了" },
    "shin-onimusha2-slot": { phase: "SOUKEN RUSH", label: "鬼武侠", statLabel: "鬼武侠成功", roundLabels: ["蒼剣RUSH開始", "幻魔バトル", "鬼武侠 1st", "蒼剣BONUS", "鬼武侠 2nd", "金色覚醒ジャッジ"], games: 40, continueChance: 0.70, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "鬼武侠上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.60], [{ kind: "bonus", label: "蒼剣BONUS", games: 30, payout: 240 }, 0.40]], endLabel: "蒼剣RUSH終了" },
    "fire-force-slot": { phase: "FIRE FORCE BONUS", label: "炎炎激闘", statLabel: "炎炎ループ継続", roundLabels: ["初回BONUS", "炎炎激闘 1戦目", "炎炎激闘 2戦目", "第8特殊消防隊 共闘", "炎炎ループ", "アドラバーストジャッジ"], games: [[15, 0.50], [40, 0.50]], continueChance: 0.65, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "REGULAR BONUS", games: 15, payout: 85 }, 0.50], [{ kind: "bonus", label: "炎炎BONUS", games: 40, payout: 230 }, 0.50]], endLabel: "炎炎ループ終了" },
    "godzilla-eva2-slot": { phase: "GODZILLA VS EVA", label: "震撃チャンス", statLabel: "震撃成功", roundLabels: ["ゴジラ襲来", "エヴァ出撃", "震撃チャンス", "10倍上乗せ", "決戦カイザーギドラ", "G覚醒RUSHジャッジ"], games: 50, continueChance: 0.62, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "10倍上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "ゴジエヴァBONUS", games: 30, payout: 390 }, 0.35]], endLabel: "ゴジエヴァRUSH終了" },
    "godzilla-eva-slot": { phase: "G AWAKENING RUSH", label: "殲滅作戦", statLabel: "怪獣撃破", roundLabels: ["G覚醒RUSH開始", "怪獣迎撃", "殲滅作戦", "G侵食役", "最終殲滅作戦", "超G覚醒RUSHジャッジ"], games: 50, continueChance: 0.64, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "怪獣撃破上乗せ", games: [[10, 0.40], [20, 0.30], [30, 0.18], [50, 0.10], [100, 0.02]] }, 0.58], [{ kind: "bonus", label: "殲滅作戦BONUS", games: 30, payout: 375 }, 0.42]], endLabel: "G覚醒RUSH終了" },
    "dmc5-st-slot": { phase: "STYLISH TIME", label: "STバトル", statLabel: "ST勝利", roundLabels: ["STYLISH TIME開始", "ネロ バトル", "V バトル", "ダンテ バトル", "JACKPOT BATTLE", "SPECIAL STジャッジ"], games: 25, continueChance: 0.72, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "DEVIL BONUS", games: 40, payout: 230 }, 0.55], [{ kind: "bonus", label: "EPISODE BONUS", games: 80, payout: 460 }, 0.32], [{ kind: "bonus", label: "JACKPOT BONUS", games: 160, payout: 920 }, 0.13]], endLabel: "STYLISH TIME終了" },
    "initial-d-2nd-slot": { phase: "LEGEND RUSH", label: "レジェンドバトル", statLabel: "峠バトル勝利", roundLabels: ["秋名山バトル", "赤城バトル", "いろは坂バトル", "覚醒ZONE", "インフィニティードリーム", "ナイトキッズバトル"], games: 30, continueChance: 0.70, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "レジェンドバトル勝利", payout: 150 }, 0.55], [{ kind: "games", label: "覚醒ZONE", games: [[30, 0.70], [50, 0.25], [100, 0.05]] }, 0.30], [{ kind: "bonus", label: "インフィニティードリーム", games: 60, payout: 600 }, 0.15]], endLabel: "レジェンドラッシュ終了" },
    "lupin-dai-koukaisha": { phase: "SUPER HERO", label: "デカ目高確", statLabel: "デカ目成功", roundLabels: ["SUPER HERO開始", "ルパン デカ目", "次元 デカ目", "五ェ門 デカ目", "HERO BONUS", "ダブルセブンジャッジ"], games: 30, continueChance: 0.68, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "デカ目上乗せ", games: [[10, 0.42], [20, 0.28], [30, 0.18], [50, 0.10], [100, 0.02]] }, 0.62], [{ kind: "bonus", label: "HERO BONUS", games: 30, payout: 270 }, 0.38]], endLabel: "SUPER HERO終了" },
    "chibariyo2-slot": { phase: "CHIBARIYO HEAVEN", label: "天国32G", statLabel: "花笠ボーナス連", roundLabels: ["初回花笠BONUS", "天国32G 1連目", "天国32G 2連目", "パトランプ点灯", "超天国モード", "リミットレスジャッジ"], games: 32, continueChance: 0.68, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "REG BONUS", games: 30, payout: 90 }, 0.28], [{ kind: "bonus", label: "BIG BONUS", games: 70, payout: 210 }, 0.57], [{ kind: "bonus", label: "SUPER BIG", games: 70, payout: 315 }, 0.15]], endLabel: "天国モード終了" }
  };
  Object.entries(specializedCycleModels).forEach(([slug, cycleFlow]) => {
    const sim = window.ICHIGEKI_MACHINES[slug]?.sim;
    if (!sim) return;
    sim.cycleFlow = cycleFlow;
    delete sim.specialOutcomes;
  });
})();

// Final machine-specific flow group. Every remaining cycle-based slot now has
// its own named route, reward types and upper-mode milestone.
(() => {
  const finalCycleModels = {
    "ragnador-slot": { phase: "RAGNADOR RUSH", label: "チェインアタック", statLabel: "チェイン成功", roundLabels: ["ラグナドールRUSH開始", "チェインアタック 1st", "ガチャBONUS", "チェインアタック 2nd", "スペシャルジャッジ", "真ラグナドールRUSH判定"], games: 40, continueChance: 0.70, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "チェイン上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.70], [{ kind: "bonus", label: "ガチャBONUS", games: 30, payout: 270 }, 0.30]], endLabel: "ラグナドールRUSH終了" },
    "mahoako-slot": { phase: "MAHOAKO RUSH", label: "あこがれATTACK", statLabel: "あこがれATTACK成功", roundLabels: ["まほあこラッシュ開始", "トレスマジア対決", "あこがれATTACK 1st", "サディスティックBONUS", "あこがれATTACK 2nd", "VSロードエノルメ"], games: 30, continueChance: 0.68, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "あこがれ上乗せ", games: [[10, 0.45], [20, 0.30], [30, 0.15], [50, 0.08], [100, 0.02]] }, 0.60], [{ kind: "bonus", label: "サディスティックBONUS", games: 30, payout: 270 }, 0.40]], endLabel: "まほあこラッシュ終了" },
    "uminchu-slot": { phase: "UMINCHU BONUS LOOP", label: "海人BONUS連", statLabel: "海人BONUS連", roundLabels: ["海人BONUS 1連目", "海人BONUS 2連目", "海人BONUS 3連目", "海人BONUS 4連目", "海人BONUS 5連目", "海人BONUS 6連目", "海人BONUS 7連目", "海人BONUS 8連目", "海人BONUS 9連目", "10連チャレンジ"], games: [[12, 0.21], [53, 0.79]], continueChance: 0.64, maxRounds: 10, upperAfterRounds: 10, upperAfterRoundsAutoSuccess: true, upperOnlyAfterRounds: true, rewards: [[{ kind: "bonus", label: "BIG BONUS", games: 53, payout: 202 }, 0.79], [{ kind: "bonus", label: "REG BONUS", games: 12, payout: 53 }, 0.21]], endLabel: "海人BONUS連終了" },
    "tenten-slot": { phase: "TENTEN BONUS HIGH", label: "40Gボーナス高確", statLabel: "転天BONUS連", roundLabels: ["転天BONUS開始", "40Gボーナス高確 1st", "EPISODE BONUS", "転天STOCKチャレンジ", "40Gボーナス高確 2nd", "輪廻転天チャレンジ"], games: 40, continueChance: 0.66, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "転天BONUS", games: 40, payout: 200 }, 0.60], [{ kind: "bonus", label: "EPISODE BONUS", games: 80, payout: 400 }, 0.28], [{ kind: "bonus", label: "転天STOCK獲得", games: 120, payout: 600 }, 0.12]], endLabel: "ボーナス高確終了" },
    "juoh-slot": { phase: "SAVANNA CHANCE", label: "サバ連", statLabel: "サバチャン継続", roundLabels: ["サバンナチャンス開始", "ダチョウチャレンジ", "ゴリラチャレンジ", "ライオンチャレンジ", "超サバチャン", "4大サバンナトリガー"], games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.65, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "サバンナチャンス", payout: 160 }, 0.55], [{ kind: "coins", label: "超サバ報酬", payout: 320 }, 0.30], [{ kind: "coins", label: "100ナビ報酬", payout: 800 }, 0.15]], endLabel: "サバ連終了" },
    "monster-hunter-sunbreak": { phase: "HUNTING QUEST", label: "盟勇クエスト", statLabel: "モンスター討伐", roundLabels: ["盟勇クエスト受注", "大型モンスター遭遇", "部位破壊", "討伐ジャッジ", "剥ぎ取りRUSH", "キュリアチャンス"], games: 40, continueChance: 0.72, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "討伐成功・剥ぎ取り", games: [[10, 0.35], [20, 0.30], [30, 0.20], [50, 0.10], [100, 0.05]] }, 0.65], [{ kind: "bonus", label: "サンブレイクBONUS", games: 30, payout: 300 }, 0.25], [{ kind: "games", label: "剥ぎ取りRUSH", games: [[50, 0.70], [100, 0.30]] }, 0.10]], endLabel: "サンブレイクRUSH終了" },
    "paripi-koumei-slot": { phase: "PARTY TIME", label: "Party Time ST", statLabel: "Party Time継続", roundLabels: ["Party Time開始", "歌唱ジャッジ", "Party BONUS", "兵法書獲得", "孔明BONUS", "臥龍転生ジャッジ"], games: 30, continueChance: 0.73, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "Party BONUS", games: 30, payout: 180 }, 0.62], [{ kind: "coins", label: "兵法書獲得", payout: 360 }, 0.28], [{ kind: "bonus", label: "孔明BONUS", games: 60, payout: 720 }, 0.10]], endLabel: "Party Time終了" },
    "darling-in-the-franxx-slot": { phase: "BONUS HIGH MODE", label: "ボーナス高確率", statLabel: "FRANXX BONUS連", roundLabels: ["コネクト成功", "ボーナス高確率 1st", "ダーリン・イン・ザ・ボーナス", "エピソードBONUS", "ボーナス高確率 2nd", "比翼BEATSジャッジ"], games: [[20, 0.60], [40, 0.30], [80, 0.10]], continueChance: 0.68, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "ダーリン・イン・ザ・ボーナス", games: 20, payout: 180 }, 0.55], [{ kind: "bonus", label: "エピソードBONUS", games: 40, payout: 360 }, 0.30], [{ kind: "bonus", label: "フランクスBONUS", games: 80, payout: 720 }, 0.15]], endLabel: "ボーナス高確率終了" },
    "iza-bancho": { phase: "ITADAKI ZBASH", label: "斬揃いジャッジ", statLabel: "斬揃い成功", roundLabels: ["頂ZBASH開始", "刺客襲来", "斬揃いジャッジ 1st", "上乗せ連撃", "絶頂決戦～巌流島～", "青頂ZBASHジャッジ"], games: 40, continueChance: 0.66, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "頂ZBASH上乗せ", games: [[10, 0.34], [20, 0.28], [30, 0.20], [50, 0.13], [100, 0.05]] }, 0.65], [{ kind: "bonus", label: "絶頂決戦～巌流島～", games: 30, payout: 375 }, 0.35]], endLabel: "頂ZBASH終了" },
    "bancho-banzuke": { phase: "TODOROKI CHANCE", label: "番付決戦", statLabel: "番付決戦勝利", roundLabels: ["轟チャンス開始", "漢磨き", "番付決戦 1戦目", "轟上乗せ", "番付決戦 2戦目", "頂上決戦ジャッジ"], games: 30, continueChance: 0.67, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "轟チャンス上乗せ", games: [[10, 0.42], [20, 0.30], [30, 0.18], [50, 0.08], [100, 0.02]] }, 0.58], [{ kind: "bonus", label: "番付決戦勝利", games: 30, payout: 420 }, 0.42]], endLabel: "轟チャンス終了" },
    "zegapain-etr": { phase: "RESURRECTION", label: "ゼーガバースト", statLabel: "リザレクション継続", roundLabels: ["リザレクション開始", "ゼーガバースト 1st", "リザレクション再点灯", "ゼーガバースト 2nd", "ハル決戦", "是我ジャッジ"], games: 30, continueChance: 0.65, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "ゼーガバースト上乗せ", games: [[30, 0.42], [50, 0.30], [100, 0.18], [200, 0.08], [300, 0.02]] }, 0.62], [{ kind: "bonus", label: "リザレクションボーナス再点灯", games: 45, payout: 315 }, 0.38]], endLabel: "リザレクション終了" },
    "twin-angel2-smart": { phase: "ANGEL TIME", label: "エンジェルタイム", statLabel: "ARTセット継続", roundLabels: ["エンジェルタイム開始", "ミッションバトル", "NORMAL BIG", "エンジェルタイム継続", "スペシャルBIG", "エンジェルラッシュジャッジ"], games: 30, continueChance: 0.58, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "coins", label: "エンジェルタイム継続", payout: 15 }, 0.45], [{ kind: "bonus", label: "NORMAL BIG", games: 40, payout: 204 }, 0.35], [{ kind: "bonus", label: "スペシャルBIG", games: 50, payout: 252 }, 0.20]], endLabel: "エンジェルタイム終了" },
    "blue-reflection-tie": { phase: "BLUE REFLECTION RUSH", label: "全刈ジャッジ", statLabel: "全刈成功", roundLabels: ["BLUE REFLECTION RUSH開始", "リフレクターバトル", "全刈ジャッジ 1st", "リフレクションBONUS", "全刈ジャッジ 2nd", "帝ジャッジ"], games: 30, continueChance: 0.68, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "全刈上乗せ", games: [[10, 0.38], [20, 0.30], [30, 0.20], [50, 0.10], [100, 0.02]] }, 0.68], [{ kind: "bonus", label: "リフレクションBONUS", games: 30, payout: 300 }, 0.32]], endLabel: "BLUE REFLECTION RUSH終了" },
    "vivy-slot": { phase: "PROJECT SINGULARITY", label: "SINGULARITY BATTLE", statLabel: "ミッション成功", roundLabels: ["プロジェクト開始", "SINGULARITY BATTLE 1", "OVER DRIVE", "SINGULARITY BONUS", "SINGULARITY BATTLE 2", "Fluorite Eye's Strike"], games: 30, continueChance: 0.70, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "OVER DRIVE", games: [[10, 0.44], [20, 0.30], [30, 0.16], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "SINGULARITY BONUS", games: 30, payout: 240 }, 0.35]], endLabel: "プロジェクトシンギュラリティ終了" },
    "haihai-shiosai-re": { phase: "SHIOSAI HEAVEN", label: "天国32G", statLabel: "ハイシオBONUS連", roundLabels: ["ハイビスカス点灯", "天国32G 1連目", "天国32G 2連目", "BIG 1G連", "天国ロング", "ハイシオ天国ジャッジ"], games: 32, continueChance: 0.72, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "BIG BONUS", games: 60, payout: 360 }, 0.72], [{ kind: "bonus", label: "REG BONUS", games: 20, payout: 120 }, 0.28]], endLabel: "天国モード終了" },
    "akamata-slot": { phase: "AKAMATA BONUS LOOP", label: "ボトルキープ連", statLabel: "疑似ボーナス連", roundLabels: ["ハブランプ点灯", "ボトルキープ 1連目", "ボトルキープ 2連目", "天国3連ジャッジ", "BIG BOTTLE BONUS", "バブリーモード判定"], games: 32, continueChance: 0.62, maxRounds: 6, upperAfterRounds: 3, upperAfterRoundsAutoSuccess: false, upperOnlyAfterRounds: true, rewards: [[{ kind: "bonus", label: "アカマターBONUS", games: 32, payout: 210 }, 0.64], [{ kind: "bonus", label: "BIG BOTTLE BONUS", games: 64, payout: 420 }, 0.26], [{ kind: "bonus", label: "バブリーBONUS", games: 100, payout: 720 }, 0.10]], endLabel: "ボトルキープ終了" },
    "majo-to-yajuu-slot": { phase: "WITCH AND THE BEAST", label: "BONUS ST", statLabel: "BONUS連", roundLabels: ["Witch and the Beast開始", "魔女追跡", "CHALLENGE BONUS", "BEAST BONUS", "永遠なる魔女", "BEAST MODEジャッジ"], games: 20, continueChance: 0.70, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "CHALLENGE BONUS", games: 20, payout: 300 }, 0.62], [{ kind: "bonus", label: "BEAST BONUS", games: 40, payout: 600 }, 0.28], [{ kind: "bonus", label: "PREMIUM BONUS", games: 80, payout: 1200 }, 0.10]], endLabel: "BONUS ST終了" },
    "super-blackjack-slot": { phase: "STOCK TIME", label: "STOCK TIME", statLabel: "BONUSストック", roundLabels: ["STOCK TIME開始", "カードジャッジ", "REG BONUS", "BIG BONUS", "SUPER BIG", "スペシャルステージ"], games: 30, continueChance: 0.64, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "bonus", label: "REG BONUS", games: 20, payout: 120 }, 0.30], [{ kind: "bonus", label: "BIG BONUS", games: 40, payout: 250 }, 0.55], [{ kind: "bonus", label: "SUPER BIG", games: 80, payout: 510 }, 0.15]], endLabel: "STOCK TIME終了" },
    "golden-kamuy-slot": { phase: "GOLDEN KAMUY", label: "ゴールドラッシュ", statLabel: "金塊争奪成功", roundLabels: ["黄金神威開始", "刺青人皮争奪", "ゴールドラッシュ 1st", "決戦BONUS", "ゴールドラッシュ 2nd", "ゴールデンロード"], games: 100, continueChance: 0.60, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "ゴールドラッシュ上乗せ", games: [[10, 0.40], [20, 0.30], [30, 0.20], [50, 0.08], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "決戦BONUS", games: 30, payout: 375 }, 0.35]], endLabel: "黄金神威終了" },
    "zenigata4-slot": { phase: "ARREST RUSH", label: "デカチャンス", statLabel: "逮捕成功", roundLabels: ["逮捕RUSH開始", "デカチャンス 1st", "ゼニロボ起動", "逮捕BONUS", "30G連", "超逮捕チャンス"], games: 50, continueChance: 0.66, maxRounds: 6, upperAfterRounds: 6, upperAfterRoundsAutoSuccess: false, rewards: [[{ kind: "games", label: "ゼニロボ起動", games: [[10, 0.40], [20, 0.30], [30, 0.18], [50, 0.10], [100, 0.02]] }, 0.65], [{ kind: "bonus", label: "逮捕BONUS", games: 30, payout: 330 }, 0.35]], endLabel: "逮捕RUSH終了" }
  };
  Object.entries(finalCycleModels).forEach(([slug, cycleFlow]) => {
    const sim = window.ICHIGEKI_MACHINES[slug]?.sim;
    if (!sim) return;
    sim.cycleFlow = cycleFlow;
    delete sim.specialOutcomes;
  });
})();

// Stage-specific cycle definitions. These models vary the game count,
// continuation expectation and reward table by the current machine phase
// instead of repeating one shared draw under different titles.
(() => {
  const tenzenBtRewards = () => [
    [{ kind: "coins", label: "甲賀勝利・次セット継続", payout: 0 }, 0.49],
    [{ kind: "bonus", label: "異色バジリスクチャンス", games: 16, payout: 46 }, 0.28],
    [{ kind: "bonus", label: "同色バジリスクチャンス", games: 16, payout: 46 }, 0.16],
    [{ kind: "bonus", label: "エピソードBC", games: 30, payout: 87 }, 0.06],
    [{ kind: "bonus", label: "プレミアムBC", games: 30, payout: 87 }, 0.01]
  ];
  const chibariyoBonusRewards = () => [
    [{ kind: "bonus", label: "REG BONUS", games: 30, payout: 90 }, 0.28],
    [{ kind: "bonus", label: "BIG BONUS", games: 70, payout: 210 }, 0.57],
    [{ kind: "bonus", label: "SUPER BIG", games: 70, payout: 315 }, 0.15]
  ];
  const ggoStormRewards = () => [
    [{ kind: "bonus", label: "ガンゲイルストーム 100枚", games: 14, payout: 100 }, 0.30],
    [{ kind: "bonus", label: "ガンゲイルストーム 150枚", games: 21, payout: 150 }, 0.25],
    [{ kind: "bonus", label: "ガンゲイルストーム 200枚", games: 28, payout: 200 }, 0.20],
    [{ kind: "bonus", label: "ガンゲイルストーム 250枚", games: 35, payout: 250 }, 0.10],
    [{ kind: "bonus", label: "ガンゲイルストーム 300枚", games: 42, payout: 300 }, 0.08],
    [{ kind: "bonus", label: "ガンゲイルストーム 500枚", games: 70, payout: 500 }, 0.05],
    [{ kind: "bonus", label: "ガンゲイルストーム 1000枚", games: 141, payout: 1000 }, 0.02]
  ];
  const models = {
    "ragnador-slot": {
      phase: "RAGNADOR RUSH",
      label: "ラグナドールRUSH",
      statLabel: "爽怪Chain",
      maxRounds: 5,
      upperAfterRounds: 0,
      upperOnlyAfterRounds: false,
      upperAfterRoundsAutoSuccess: false,
      markFinalRoundComplete: false,
      endLabel: "ラグナドールRUSH終了",
      rounds: [
        { title: "ラグナドールRUSH", detail: "40G＋α・純増約2.5枚/G。幻妖石300個とガチャ券を目指します", games: 40, continueChance: 0.82, rewards: [[{ kind: "coins", label: "初期40G消化", payout: 100 }, 1]] },
        { title: "幻妖ミッション", detail: "リプレイ連から3Gまたは10Gのミッションへ。成功でチェインかガチャを獲得", games: [[3, 0.50], [10, 0.50]], continueChance: 0.76, rewards: [[{ kind: "coins", label: "チェインアタック獲得", payout: 10 }, 0.55], [{ kind: "games", label: "ガチャチャレンジ獲得", games: 10 }, 0.30], [{ kind: "games", label: "10連ガチャ獲得", games: 30 }, 0.15]] },
        { title: "チェインアタック", detail: "5G保証。80%・90%・95%のいずれかで幻妖石を連続獲得します", games: [[5, 0.55], [8, 0.30], [12, 0.15]], continueChance: 0.80, rewards: [[{ kind: "games", label: "幻妖石300個・ガチャ到達", games: 10 }, 0.55], [{ kind: "games", label: "Wチェイン・10連ガチャ", games: 30 }, 0.30], [{ kind: "games", label: "極ラグナ目・10連ガチャ券", games: 50 }, 0.15]] },
        { title: "ガチャチャレンジ", detail: "1G完結。ゲーム数上乗せ、お祈りガチャ、10連ガチャの報酬を開きます", games: 1, continueChance: 0.72, rewards: [[{ kind: "games", label: "ゲーム数上乗せ", games: [[10, 0.45], [20, 0.27], [30, 0.16], [50, 0.09], [100, 0.03]] }, 0.62], [{ kind: "bonus", label: "ストーリーボーナス", games: 20, payout: 90 }, 0.28], [{ kind: "bonus", label: "クライマックスボーナス", games: 30, payout: 135 }, 0.10]] },
        { title: "ボーナス高確／ラストミッション", detail: "8Gのボーナス高確とAT終了時のラストミッションをPUSHで決着します", games: 8, continueChance: 0.58, rewards: [[{ kind: "bonus", label: "ストーリーボーナス＋10G", games: 20, payout: 90 }, 0.58], [{ kind: "bonus", label: "クライマックスボーナス", games: 30, payout: 135 }, 0.22], [{ kind: "games", label: "ラストミッション成功・ガチャ復帰", games: [[10, 0.70], [30, 0.25], [100, 0.05]] }, 0.20]] }
      ]
    },
    "garo-yami-slot": {
      phase: "金色になれ！",
      label: "金色になれ！",
      statLabel: "ホラー撃破",
      maxRounds: 5,
      upperAfterRounds: 5,
      upperOnlyAfterRounds: true,
      upperAfterRoundsAutoSuccess: true,
      endLabel: "金色になれ！終了",
      rounds: [
        { title: "SUPER GARO BONUS", detail: "約1000枚を獲得し、3戦突破型CZ『金色になれ！』へ進みます", games: 110, continueChance: 1, rewards: [[{ kind: "coins", label: "SUPER GARO BONUS", payout: 1000 }, 1]] },
        { title: "金色になれ！ 1戦目", detail: "PUSHでホラーとの1戦目を決着。勝利でエピソードへ", games: 5, continueChance: 0.50, awardOnContinueOnly: true, failureGames: 50, failureLabel: "50G引き戻しZONE", rewards: [[{ kind: "bonus", label: "1戦目勝利・エピソード", games: 10, payout: 91 }, 1]] },
        { title: "金色になれ！ 2戦目", detail: "2体目のホラーを撃破すれば最終戦へ進みます", games: 5, continueChance: 0.50, awardOnContinueOnly: true, failureGames: 50, failureLabel: "50G引き戻しZONE", rewards: [[{ kind: "bonus", label: "2戦目勝利・エピソード", games: 10, payout: 91 }, 1]] },
        { title: "金色になれ！ 3戦目", detail: "最終PUSH。3戦突破で究極魔戒RUSHが確定します", games: 5, continueChance: 0.50, awardOnContinueOnly: true, failureGames: 50, failureLabel: "50G引き戻しZONE", rewards: [[{ kind: "bonus", label: "3戦目勝利・エピソード", games: 10, payout: 91 }, 1]] },
        { title: "三騎士共闘", detail: "3戦突破。究極魔戒RUSHへの扉が開きます", games: 1, continueChance: 1, rewards: [[{ kind: "coins", label: "究極魔戒RUSH確定", payout: 0 }, 1]] }
      ]
    },
    "goblin-slayer-slot": {
      maxRounds: 5,
      upperAfterRounds: 5,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "依頼受注・初期AT", detail: "初期報酬を確定し、小鬼の巣へ向かいます", games: 30, continueChance: 0.55, rewards: [[{ kind: "coins", label: "初期討伐報酬", payout: 100 }, 0.70], [{ kind: "bonus", label: "ゴブリンスレイヤーBONUS", games: 30, payout: 300 }, 0.30]] },
        { title: "小鬼の巣", detail: "成立役で小鬼を討伐し、ゲーム数上乗せを狙います", games: 30, continueChance: 0.62, rewards: [[{ kind: "games", label: "小鬼討伐上乗せ", games: [[10, 0.55], [20, 0.30], [30, 0.15]] }, 0.72], [{ kind: "bonus", label: "ゴブリンスレイヤーBONUS", games: 30, payout: 300 }, 0.28]] },
        { title: "ホブゴブリン戦", detail: "強敵撃破で高配当報酬またはBONUSを獲得します", games: 40, continueChance: 0.68, rewards: [[{ kind: "coins", label: "ホブゴブリン撃破", payout: 250 }, 0.55], [{ kind: "bonus", label: "ゴブリンスレイヤーBONUS", games: 50, payout: 600 }, 0.45]] },
        { title: "ゴブリンチャンピオン戦", detail: "上乗せ特化と高配当BONUSの分岐をPUSHで開きます", games: 50, continueChance: 0.74, rewards: [[{ kind: "games", label: "チャンピオン討伐上乗せ", games: [[30, 0.50], [50, 0.35], [100, 0.15]] }, 0.60], [{ kind: "bonus", label: "討伐BONUS", games: 70, payout: 800 }, 0.40]] },
        { title: "ゴブリンロード決戦", detail: "最終決戦を突破するとGOBLIN'S CROWNへ進みます", games: 100, continueChance: 0.80, rewards: [[{ kind: "coins", label: "ゴブリンロード撃破", payout: 500 }, 0.60], [{ kind: "bonus", label: "ULTIMATE LOOP報酬", games: 100, payout: 1200 }, 0.40]] }
      ]
    },
    "kinnikuman-7-slot": {
      maxRounds: 7,
      upperAfterRounds: 7,
      upperAfterRoundsAutoSuccess: true,
      upperOnlyAfterRounds: true,
      rounds: [
        { title: "悪魔超人 1戦目", detail: "26Gの前半パート後に最初の継続バトルへ", games: 26, continueChance: 0.55, rewards: [[{ kind: "coins", label: "1戦目勝利", payout: 160 }, 0.75], [{ kind: "games", label: "Vストック獲得", games: 26 }, 0.25]] },
        { title: "悪魔超人 2戦目", detail: "成立役でVストックと継続書き換えを狙います", games: 26, continueChance: 0.60, rewards: [[{ kind: "coins", label: "2戦目勝利", payout: 160 }, 0.68], [{ kind: "games", label: "炎のキン肉マンチャレンジ", games: [[26, 0.70], [52, 0.30]] }, 0.32]] },
        { title: "悪魔超人 3戦目", detail: "シナリオ継続と自力書き換えを合わせて判定します", games: 26, continueChance: 0.65, rewards: [[{ kind: "coins", label: "3戦目勝利", payout: 160 }, 0.65], [{ kind: "bonus", label: "マッスルボーナス", games: 20, payout: 240 }, 0.35]] },
        { title: "悪魔超人 4戦目", detail: "後半の継続バトルへ向けてVストックを抽選します", games: 26, continueChance: 0.70, rewards: [[{ kind: "coins", label: "4戦目勝利", payout: 160 }, 0.62], [{ kind: "games", label: "Vストック獲得", games: [[26, 0.70], [52, 0.30]] }, 0.38]] },
        { title: "悪魔超人 5戦目", detail: "高継続シナリオと特化ゾーン報酬を判定します", games: 26, continueChance: 0.75, rewards: [[{ kind: "coins", label: "5戦目勝利", payout: 160 }, 0.58], [{ kind: "bonus", label: "悪魔大行進", games: 40, payout: 500 }, 0.42]] },
        { title: "悪魔超人 6戦目", detail: "上位AT目前の継続バトルをPUSHで決着します", games: 26, continueChance: 0.80, rewards: [[{ kind: "coins", label: "6戦目勝利", payout: 160 }, 0.55], [{ kind: "games", label: "正義超人Vストック", games: [[26, 0.60], [52, 0.40]] }, 0.45]] },
        { title: "悪魔超人 7戦目", detail: "7戦突破で悪魔将軍バトルへ直行します", games: 26, continueChance: 0.85, rewards: [[{ kind: "coins", label: "7戦突破", payout: 250 }, 0.60], [{ kind: "bonus", label: "バッファローマン撃破", games: 30, payout: 750 }, 0.40]] }
      ]
    },
    "basilisk4-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "追想の刻", detail: "追想パートで絆玉と次戦の高確を準備します", games: 10, continueChance: 0.55, rewards: [[{ kind: "games", label: "追想ゲーム上乗せ", games: [[10, 0.70], [20, 0.30]] }, 0.70], [{ kind: "bonus", label: "バジリスクチャンス", games: 20, payout: 120 }, 0.30]] },
        { title: "人数決定パート", detail: "対戦人数を決め、絆高確と継続期待度を示します", games: 3, continueChance: 0.60, rewards: [[{ kind: "coins", label: "甲賀優勢", payout: 90 }, 0.65], [{ kind: "games", label: "絆高確獲得", games: 10 }, 0.35]] },
        { title: "争忍の刻・昼", detail: "成立役でBCと甲賀勝利への書き換えを狙います", games: 27, continueChance: 0.65, rewards: [[{ kind: "coins", label: "甲賀勝利", payout: 120 }, 0.62], [{ kind: "bonus", label: "異色BC", games: 20, payout: 180 }, 0.38]] },
        { title: "争忍の刻・夕方", detail: "夕方ステージで継続期待度とBC期待度が上昇します", games: 30, continueChance: 0.70, rewards: [[{ kind: "games", label: "絆高確ストック", games: [[10, 0.65], [20, 0.35]] }, 0.58], [{ kind: "bonus", label: "同色BC", games: 30, payout: 240 }, 0.42]] },
        { title: "争忍の刻・夜", detail: "高継続ステージから天膳バトルへ進みます", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "夜ステージ勝利", payout: 180 }, 0.55], [{ kind: "bonus", label: "エピソードBC", games: 40, payout: 360 }, 0.45]] },
        { title: "天膳バトル", detail: "最終バトル勝利で宿怨チャレンジを抽選します", games: 8, continueChance: 0.82, rewards: [[{ kind: "coins", label: "天膳撃破", payout: 240 }, 0.60], [{ kind: "bonus", label: "完全勝利・月下閃滅", games: 50, payout: 600 }, 0.40]] }
      ]
    },
    "kaguya-sama-slot": {
      maxRounds: 5,
      upperAfterRounds: 5,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "初回BONUS", detail: "REG・BIG・SUPER BIGの初回種別をPUSHで開きます", games: [[10, 0.49], [30, 0.50], [54, 0.01]], continueChance: 0.62, rewards: [[{ kind: "bonus", label: "REGULAR BONUS", games: 10, payout: 83 }, 0.49], [{ kind: "bonus", label: "BIG BONUS", games: 30, payout: 270 }, 0.50], [{ kind: "bonus", label: "SUPER BIG BONUS", games: 54, payout: 490 }, 0.01]] },
        { title: "1G連ジャッジ", detail: "BONUS中に獲得したストックから1G連を判定します", games: 1, continueChance: 0.66, rewards: [[{ kind: "bonus", label: "REGULAR BONUS 1G連", games: 10, payout: 83 }, 0.42], [{ kind: "bonus", label: "BIG BONUS 1G連", games: 30, payout: 270 }, 0.56], [{ kind: "bonus", label: "SUPER BIG 1G連", games: 54, payout: 490 }, 0.02]] },
        { title: "引き戻しステージ", detail: "1G連後の引き戻し区間で次のBONUSを狙います", games: 32, continueChance: 0.70, rewards: [[{ kind: "bonus", label: "REGULAR BONUS", games: 10, payout: 83 }, 0.40], [{ kind: "bonus", label: "BIG BONUS", games: 30, payout: 270 }, 0.57], [{ kind: "bonus", label: "SUPER BIG BONUS", games: 54, payout: 490 }, 0.03]] },
        { title: "BONUSループ高確", detail: "ステージ上昇後のBONUSループをPUSHで決着します", games: 32, continueChance: 0.74, rewards: [[{ kind: "bonus", label: "REGULAR BONUS", games: 10, payout: 83 }, 0.35], [{ kind: "bonus", label: "BIG BONUS", games: 30, payout: 270 }, 0.60], [{ kind: "bonus", label: "SUPER BIG BONUS", games: 54, payout: 490 }, 0.05]] },
        { title: "奇跡的相性ジャッジ", detail: "成功すると奇跡的相性マリアージュMODEへ進みます", games: 15, continueChance: 0.80, rewards: [[{ kind: "bonus", label: "BIG BONUS", games: 30, payout: 270 }, 0.70], [{ kind: "bonus", label: "SUPER BIG BONUS", games: 54, payout: 490 }, 0.30]] }
      ]
    },
    "assault-lily-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "ヒュージバトル", detail: "3Gの短期決戦。撃破してRUSHの次区間へ進みます", games: 3, continueChance: 0.56, rewards: [[{ kind: "coins", label: "ヒュージ撃破報酬", payout: 90 }, 0.72], [{ kind: "games", label: "レアスキル発動", games: [[10, 0.70], [20, 0.30]] }, 0.28]] },
        { title: "チャームストライク", detail: "9Gの上乗せ区間で成立役からゲーム数を積み上げます", games: 9, continueChance: 0.62, rewards: [[{ kind: "games", label: "チャームストライク上乗せ", games: [[10, 0.50], [20, 0.32], [30, 0.18]] }, 0.82], [{ kind: "bonus", label: "リリィBONUS", games: 20, payout: 180 }, 0.18]] },
        { title: "大型ヒュージバトル", detail: "大型ヒュージ撃破で強い報酬分岐を開きます", games: 3, continueChance: 0.68, rewards: [[{ kind: "games", label: "大型ヒュージ撃破上乗せ", games: [[20, 0.58], [30, 0.30], [50, 0.12]] }, 0.65], [{ kind: "bonus", label: "アサルトBONUS", games: 30, payout: 300 }, 0.35]] },
        { title: "ノインヴェルト戦術", detail: "1G完結の一撃区間。PUSHで獲得枚数を開きます", games: 1, continueChance: 0.74, rewards: [[{ kind: "coins", label: "ノインヴェルト戦術", payout: 200 }, 0.56], [{ kind: "coins", label: "ノインヴェルト戦術", payout: 500 }, 0.30], [{ kind: "coins", label: "ノインヴェルト戦術", payout: 1000 }, 0.12], [{ kind: "coins", label: "ノインヴェルト戦術", payout: 3000 }, 0.02]] },
        { title: "ルナティックトランサー", detail: "10G＋αの上乗せ区間。毎ゲームの成立役で加算を狙います", games: 10, continueChance: 0.79, rewards: [[{ kind: "games", label: "ルナティック上乗せ", games: [[30, 0.55], [50, 0.32], [100, 0.13]] }, 0.78], [{ kind: "bonus", label: "レアスキルBONUS", games: 40, payout: 450 }, 0.22]] },
        { title: "アサルトスパイラル最終戦", detail: "最終ヒュージを撃破するとSUPERへの抽選に進みます", games: 3, continueChance: 0.84, rewards: [[{ kind: "coins", label: "ラストバレット成功", payout: 500 }, 0.62], [{ kind: "bonus", label: "アサルトスパイラル", games: 60, payout: 750 }, 0.38]] }
      ]
    },
    "shin-eva-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "エヴァンゲリオンインパクト", detail: "搭乗機と作戦を決め、10G＋αの作戦STへ入ります", games: 1, continueChance: 0.55, rewards: [[{ kind: "coins", label: "8号機出撃", payout: 30 }, 0.46], [{ kind: "coins", label: "2号機出撃", payout: 50 }, 0.34], [{ kind: "coins", label: "初号機出撃", payout: 80 }, 0.20]] },
        { title: "パリ作戦", detail: "ST中の対応役から疑似BONUS当選を狙います", games: 10, continueChance: 0.60, rewards: [[{ kind: "bonus", label: "エヴァンゲリオンBONUS", games: 30, payout: 150 }, 0.72], [{ kind: "bonus", label: "殲滅BONUS", games: 40, payout: 220 }, 0.28]] },
        { title: "ヤマト作戦", detail: "作戦成功でBONUSを獲得し、次の10G＋αへつなぎます", games: 10, continueChance: 0.66, rewards: [[{ kind: "bonus", label: "エヴァンゲリオンBONUS", games: 30, payout: 150 }, 0.62], [{ kind: "bonus", label: "エピソードBONUS", games: 40, payout: 250 }, 0.38]] },
        { title: "US作戦", detail: "機体ごとの対応役を引き、BONUS書き換えを狙います", games: 10, continueChance: 0.71, rewards: [[{ kind: "bonus", label: "エヴァンゲリオンBONUS", games: 30, payout: 150 }, 0.55], [{ kind: "bonus", label: "三機殲滅BONUS", games: 50, payout: 320 }, 0.45]] },
        { title: "VSゲンドウ", detail: "決戦突破で三機殲滅へ。PUSHで作戦結果を開きます", games: 10, continueChance: 0.77, rewards: [[{ kind: "bonus", label: "ゲンドウ決戦BONUS", games: 40, payout: 260 }, 0.58], [{ kind: "bonus", label: "三機殲滅BONUS", games: 60, payout: 400 }, 0.42]] },
        { title: "三機殲滅", detail: "三機共闘の最終作戦からマリ獣化チャレンジを抽選します", games: 10, continueChance: 0.82, rewards: [[{ kind: "bonus", label: "三機殲滅BONUS", games: 50, payout: 350 }, 0.65], [{ kind: "bonus", label: "エピソードBONUS", games: 70, payout: 500 }, 0.35]] }
      ]
    },
    "dumbbell-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "ダンベル何キロ持てる？BONUS", detail: "30G＋α・純増約8.5枚/Gの初期BONUSを消化します", games: 30, continueChance: 0.50, rewards: [[{ kind: "coins", label: "初期BONUS獲得", payout: 255 }, 0.70], [{ kind: "games", label: "筋トレ上乗せ", games: [[10, 0.72], [20, 0.20], [30, 0.08]] }, 0.30]] },
        { title: "トレーニング上乗せ", detail: "成立役でBONUSゲーム数を加算し、終了後の抽選を強化します", games: 10, continueChance: 0.54, rewards: [[{ kind: "games", label: "トレーニング成功", games: [[10, 0.55], [20, 0.30], [30, 0.12], [50, 0.03]] }, 0.80], [{ kind: "bonus", label: "マッスルBONUS", games: 30, payout: 255 }, 0.20]] },
        { title: "ゴールデンチャレンジ", detail: "成功期待度約56％のPUSH判定からゴールデンタイムを狙います", games: 1, continueChance: 0.56, rewards: [[{ kind: "games", label: "ゴールデンタイム突入", games: 10 }, 0.74], [{ kind: "bonus", label: "VストックBONUS", games: 30, payout: 255 }, 0.26]] },
        { title: "ゴールデンタイム", detail: "毎ゲームVストックを抽選する上乗せ区間です", games: 10, continueChance: 0.64, rewards: [[{ kind: "games", label: "Vストック獲得", games: [[30, 0.62], [60, 0.28], [90, 0.10]] }, 0.76], [{ kind: "bonus", label: "Vストック連", games: 40, payout: 340 }, 0.24]] },
        { title: "Vストック連", detail: "貯めたストックからBONUS連と追加上乗せを判定します", games: 30, continueChance: 0.70, rewards: [[{ kind: "bonus", label: "ダンベルBONUS連", games: 30, payout: 255 }, 0.68], [{ kind: "games", label: "筋肉覚醒上乗せ", games: [[30, 0.55], [50, 0.30], [100, 0.15]] }, 0.32]] },
        { title: "ライジングアッパーチャレンジ", detail: "最終PUSH成功で枚数上乗せ型の金肉BONUSを抽選します", games: 1, continueChance: 0.76, rewards: [[{ kind: "coins", label: "ライジングアッパー成功", payout: 500 }, 0.62], [{ kind: "bonus", label: "金肉BONUS", games: 80, payout: 1000 }, 0.38]] }
      ]
    },
    "symphogear-seigi-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "ギアVチャンス", detail: "2Gの導入区間。成功するとキャラ別ギアVアタックへ進みます", games: 2, continueChance: 0.58, rewards: [[{ kind: "games", label: "ギアVアタック獲得", games: 10 }, 0.78], [{ kind: "bonus", label: "AXZ BONUS", games: 20, payout: 120 }, 0.22]] },
        { title: "響 ギアVアタック", detail: "3G＋α、毎ゲーム上乗せをPUSHで開きます", games: 3, continueChance: 0.63, rewards: [[{ kind: "games", label: "響 上乗せ", games: [[10, 0.46], [20, 0.30], [30, 0.16], [50, 0.08]] }, 0.88], [{ kind: "bonus", label: "響BONUS", games: 30, payout: 180 }, 0.12]] },
        { title: "翼 ギアVアタック", detail: "連撃型の上乗せで複数回のゲーム数加算を狙います", games: 5, continueChance: 0.68, rewards: [[{ kind: "games", label: "翼 連撃上乗せ", games: [[20, 0.48], [30, 0.32], [50, 0.16], [100, 0.04]] }, 0.84], [{ kind: "bonus", label: "翼BONUS", games: 30, payout: 180 }, 0.16]] },
        { title: "クリス ギアVアタック", detail: "一撃上乗せ型。PUSHで大きなゲーム数を狙います", games: 1, continueChance: 0.73, rewards: [[{ kind: "games", label: "クリス 一撃上乗せ", games: [[20, 0.44], [30, 0.30], [50, 0.20], [100, 0.06]] }, 0.82], [{ kind: "bonus", label: "クリスBONUS", games: 30, payout: 180 }, 0.18]] },
        { title: "マリア・調＆切歌 共闘", detail: "共闘演出から上乗せ連打またはBONUSを判定します", games: 5, continueChance: 0.78, rewards: [[{ kind: "games", label: "共闘上乗せ", games: [[30, 0.48], [50, 0.34], [100, 0.18]] }, 0.72], [{ kind: "bonus", label: "絶唱BONUS", games: 40, payout: 260 }, 0.28]] },
        { title: "絶唱BATTLE", detail: "最終PUSHを突破するとAXZラッシュ黄金を抽選します", games: 8, continueChance: 0.82, rewards: [[{ kind: "games", label: "絶唱上乗せ", games: [[50, 0.55], [100, 0.35], [200, 0.10]] }, 0.62], [{ kind: "bonus", label: "絶唱BONUS", games: 60, payout: 450 }, 0.38]] }
      ]
    },
    "monster-hunter-rise-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "集会所・仲間ハンター参戦", detail: "仲間を集め、狩猟するモンスターとBONUS種別を決めます", games: 5, continueChance: 0.52, rewards: [[{ kind: "bonus", label: "BAR狩猟BONUS", games: 25, payout: 70 }, 0.52], [{ kind: "bonus", label: "赤7狩猟BONUS", games: 40, payout: 110 }, 0.38], [{ kind: "bonus", label: "紫7狩猟BONUS", games: 60, payout: 240 }, 0.10]] },
        { title: "BAR狩猟・大型モンスター", detail: "25G＋αの保障内に体力を削り切れば剥ぎ取りへ進みます", games: 25, continueChance: 0.52, rewards: [[{ kind: "coins", label: "通常討伐", payout: 70 }, 0.70], [{ kind: "bonus", label: "早期討伐ムービー", games: 20, payout: 120 }, 0.20], [{ kind: "games", label: "百竜刀ストック", games: 25 }, 0.10]] },
        { title: "赤7狩猟・部位破壊", detail: "40G＋αの狩猟中に部位破壊と早期討伐を狙います", games: 40, continueChance: 0.58, rewards: [[{ kind: "coins", label: "赤7モンスター討伐", payout: 110 }, 0.64], [{ kind: "bonus", label: "部位破壊報酬", games: 25, payout: 180 }, 0.24], [{ kind: "games", label: "百竜刀ストック", games: [[25, 0.70], [50, 0.30]] }, 0.12]] },
        { title: "紫7狩猟・強敵討伐", detail: "60G＋α・純増約4.0枚/Gの強敵戦から大きな報酬を狙います", games: 60, continueChance: 0.66, rewards: [[{ kind: "bonus", label: "紫7モンスター討伐", games: 60, payout: 240 }, 0.62], [{ kind: "bonus", label: "大連続BONUS", games: 100, payout: 400 }, 0.25], [{ kind: "games", label: "剥ぎ取りGストック", games: [[50, 0.70], [100, 0.30]] }, 0.13]] },
        { title: "剥ぎ取りチャンス", detail: "銀は約50％、金はストック濃厚の報酬PUSHです", games: 1, continueChance: 0.50, rewards: [[{ kind: "games", label: "剥ぎ取り銀・BONUSストック", games: 25 }, 0.50], [{ kind: "games", label: "剥ぎ取り金・BONUSストック", games: 40 }, 0.35], [{ kind: "games", label: "剥ぎ取りチャンスG", games: 60 }, 0.15]] },
        { title: "剥ぎ取りチャンスG", detail: "ストック獲得後も約50％で剥ぎ取りを重ね、百竜夜行を抽選します", games: 1, continueChance: 0.70, rewards: [[{ kind: "games", label: "BONUSストック連", games: [[25, 0.45], [40, 0.35], [60, 0.20]] }, 0.78], [{ kind: "bonus", label: "超剥ぎ取りチャンスG", games: 100, payout: 500 }, 0.22]] }
      ]
    },
    "fire-force-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "初当りBONUS", detail: "REGULARか炎炎BONUSをPUSHで決め、炎炎激闘の入口を狙います", games: [[15, 0.50], [40, 0.50]], continueChance: 0.50, rewards: [[{ kind: "bonus", label: "REGULAR BONUS", games: 15, payout: 85 }, 0.50], [{ kind: "bonus", label: "炎炎BONUS", games: 40, payout: 230 }, 0.50]] },
        { title: "炎炎激闘前兆", detail: "伝導者の影を経由し、BONUS高確率区間への突入を判定します", games: 10, continueChance: 0.56, rewards: [[{ kind: "coins", label: "炎炎激闘ストック", payout: 30 }, 0.72], [{ kind: "bonus", label: "エピソードBONUS", games: 40, payout: 230 }, 0.28]] },
        { title: "炎炎激闘 1戦目", detail: "小役からBONUSを抽選し、成功後は前兆を挟んでループします", games: 15, continueChance: 0.62, rewards: [[{ kind: "bonus", label: "REGULAR BONUS", games: 15, payout: 85 }, 0.45], [{ kind: "bonus", label: "炎炎BONUS", games: 40, payout: 230 }, 0.45], [{ kind: "bonus", label: "エピソードBONUS", games: 40, payout: 230 }, 0.10]] },
        { title: "第8特殊消防隊 共闘", detail: "共闘演出でBONUS種別と次回炎炎激闘ストックを開きます", games: 15, continueChance: 0.67, rewards: [[{ kind: "bonus", label: "炎炎BONUS", games: 40, payout: 230 }, 0.58], [{ kind: "bonus", label: "エピソードBONUS", games: 40, payout: 230 }, 0.27], [{ kind: "games", label: "炎炎激闘ストック", games: [[15, 0.70], [30, 0.30]] }, 0.15]] },
        { title: "炎炎ループ", detail: "BONUSと炎炎激闘を往復しながら連続当選を伸ばします", games: 15, continueChance: 0.72, rewards: [[{ kind: "bonus", label: "REGULAR BONUS連", games: 15, payout: 85 }, 0.36], [{ kind: "bonus", label: "炎炎BONUS連", games: 40, payout: 230 }, 0.49], [{ kind: "bonus", label: "エピソードBONUS連", games: 40, payout: 230 }, 0.15]] },
        { title: "アドラバーストジャッジ", detail: "炎炎ループ最終PUSHからアドラバーストへの突入を抽選します", games: 8, continueChance: 0.78, rewards: [[{ kind: "bonus", label: "炎炎BONUS", games: 40, payout: 230 }, 0.68], [{ kind: "bonus", label: "アドラリンクBONUS", games: 60, payout: 400 }, 0.32]] }
      ]
    },
    "god-eater-resurrection": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      rounds: [
        { title: "ストーリーパート", detail: "初回100枚を獲得し、結合崩壊と次のアラガミを準備します", games: 12, continueChance: 0.76, rewards: [[{ kind: "coins", label: "初回ストーリー報酬", payout: 100 }, 0.72], [{ kind: "games", label: "結合崩壊ストック", games: 10 }, 0.28]] },
        { title: "アラガミ交戦", detail: "25G＋αのSTで弱点役を引き、平均約76％の討伐を狙います", games: 25, continueChance: 0.76, rewards: [[{ kind: "coins", label: "アラガミ討伐・200枚", payout: 200 }, 0.58], [{ kind: "coins", label: "アラガミ討伐・300枚", payout: 300 }, 0.30], [{ kind: "coins", label: "アラガミ討伐・510枚", payout: 510 }, 0.12]] },
        { title: "捕喰報酬パート", detail: "討伐したアラガミに応じて200枚以上の上乗せをPUSHで開きます", games: 1, continueChance: 0.78, rewards: [[{ kind: "coins", label: "神を喰らえ・200枚", payout: 200 }, 0.55], [{ kind: "coins", label: "神を喰らえ・300枚", payout: 300 }, 0.30], [{ kind: "coins", label: "神機覚醒・510枚", payout: 510 }, 0.15]] },
        { title: "結合崩壊・再交戦", detail: "結合崩壊で弱点を増やし、次のアラガミ交戦を有利にします", games: 25, continueChance: 0.80, rewards: [[{ kind: "coins", label: "弱点役討伐", payout: 250 }, 0.62], [{ kind: "bonus", label: "OVERKILL・神機覚醒", games: 30, payout: 510 }, 0.38]] },
        { title: "逆鱗ハンニバル", detail: "50G＋α・勝利期待度約75％の強敵戦でゲートを目指します", games: 50, continueChance: 0.75, rewards: [[{ kind: "coins", label: "逆鱗ハンニバル討伐", payout: 510 }, 0.74], [{ kind: "bonus", label: "OVERKILL報酬", games: 60, payout: 800 }, 0.26]] },
        { title: "リザレクションゲート", detail: "覚醒するキャラクターにより漆黒の捕喰者または神堕を判定します", games: 50, continueChance: 0.84, rewards: [[{ kind: "bonus", label: "漆黒の捕喰者", games: 50, payout: 510 }, 0.70], [{ kind: "bonus", label: "神堕覚醒", games: 60, payout: 1020 }, 0.30]] }
      ]
    },
    "tokyo-ghoul-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      rounds: [
        { title: "東京喰種咬・喰種対決", detail: "初期約150枚から4Gの喰種対決へ。勝利でBITESに進みます", games: 4, continueChance: 0.50, rewards: [[{ kind: "coins", label: "初期AT＋喰種対決勝利", payout: 150 }, 0.78], [{ kind: "bonus", label: "エピソードBONUS", games: 25, payout: 250 }, 0.22]] },
        { title: "BITES 1段階", detail: "小役成立で報酬段階が上昇。止まった段階の差枚を獲得します", games: 1, continueChance: 0.45, rewards: [[{ kind: "coins", label: "BITES 50枚", payout: 50 }, 0.58], [{ kind: "coins", label: "BITES 100枚", payout: 100 }, 0.32], [{ kind: "coins", label: "BITES 200枚", payout: 200 }, 0.10]] },
        { title: "BITES 2段階", detail: "小役成立で次段階へ。リスタート時は同じ段階から再抽選します", games: 1, continueChance: 0.45, rewards: [[{ kind: "coins", label: "BITES 100枚", payout: 100 }, 0.52], [{ kind: "coins", label: "BITES 200枚", payout: 200 }, 0.34], [{ kind: "coins", label: "超BITES 500枚", payout: 500 }, 0.14]] },
        { title: "BITES 3段階", detail: "中盤から500枚報酬の比率が上がる報酬昇格区間です", games: 1, continueChance: 0.45, rewards: [[{ kind: "coins", label: "BITES 200枚", payout: 200 }, 0.42], [{ kind: "coins", label: "BITES 500枚", payout: 500 }, 0.48], [{ kind: "coins", label: "超BITES 1000枚", payout: 1000 }, 0.10]] },
        { title: "BITES 4段階", detail: "高報酬テーブルなら1000枚以上が見える最終手前のPUSHです", games: 1, continueChance: 0.45, rewards: [[{ kind: "coins", label: "BITES 300枚", payout: 300 }, 0.36], [{ kind: "coins", label: "BITES 500枚", payout: 500 }, 0.40], [{ kind: "coins", label: "BITES 1000枚", payout: 1000 }, 0.24]] },
        { title: "BITES MAX", detail: "5段階到達。報酬テーブルに応じて500〜2000枚を獲得します", games: 1, continueChance: 0.80, rewards: [[{ kind: "coins", label: "BITES MAX 500枚", payout: 500 }, 0.45], [{ kind: "coins", label: "BITES MAX 1000枚", payout: 1000 }, 0.38], [{ kind: "coins", label: "BITES MAX 2000枚", payout: 2000 }, 0.17]] }
      ]
    },
    "hokuto-tensei2": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      rounds: [
        { title: "闘神演舞・闘神レベル決定", detail: "30GのATで勝舞魂を集め、終了後の神拳勝舞へ備えます", games: 30, continueChance: 1, rewards: [[{ kind: "coins", label: "勝舞魂獲得", payout: 120 }, 0.70], [{ kind: "coins", label: "北斗揃い・勝舞魂大量獲得", payout: 240 }, 0.30]] },
        { title: "神拳勝舞・1戦目", detail: "勝舞魂1個につき1Gの勝負。PUSHでAT継続を判定します", games: 1, continueChance: 0.52, rewards: [[{ kind: "coins", label: "神拳勝舞 勝利", payout: 0 }, 1]] },
        { title: "闘神演舞・闘神B", detail: "再び30Gを消化し、闘神レベルと勝舞魂の上積みを狙います", games: 30, continueChance: 1, rewards: [[{ kind: "coins", label: "勝舞魂追加獲得", payout: 120 }, 0.66], [{ kind: "coins", label: "北斗揃い・勝舞魂大量獲得", payout: 240 }, 0.34]] },
        { title: "神拳勝舞・2戦目", detail: "残った勝舞魂を1個ずつ使い、勝利までの当落をPUSHで開きます", games: 1, continueChance: 0.58, rewards: [[{ kind: "coins", label: "神拳勝舞 連勝", payout: 0 }, 1]] },
        { title: "拳王強襲", detail: "3Gの強襲区間。毎ゲーム勝舞魂の大量獲得を狙います", games: 3, continueChance: 0.72, rewards: [[{ kind: "coins", label: "拳王強襲・勝舞魂大量獲得", payout: 250 }, 0.62], [{ kind: "bonus", label: "拳王強襲ロング", games: 30, payout: 500 }, 0.38]] },
        { title: "天撃ジャッジ", detail: "最終PUSH成功で上位AT『裏闘神演舞』への入口を開きます", games: 8, continueChance: 0.80, rewards: [[{ kind: "coins", label: "天撃到達", payout: 300 }, 0.65], [{ kind: "bonus", label: "SPバトル報酬", games: 50, payout: 650 }, 0.35]] }
      ]
    },
    "seiya-ougon-slot": {
      phase: "BATTLE OF ZODIAC",
      label: "黄金十二宮",
      statLabel: "黄金聖闘士撃破",
      continueChance: 0.76,
      maxRounds: 11,
      upperAfterRounds: 11,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      markFinalRoundComplete: true,
      endLabel: "Battle of ZODIAC終了",
      rounds: [
        { title: "白羊宮・ムウの導き", detail: "AT開始時の10G導入ムービー。黄金十二宮を駆け抜ける戦いが始まります", games: 10, continueChance: 1, rewards: [[{ kind: "coins", label: "Battle of ZODIAC 開幕", payout: 40 }, 1]] },
        { title: "金牛宮・アルデバラン", detail: "30GのAT後、4Gまたは5Gの黄金聖闘士バトルをPUSHで決着します", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "アルデバラン撃破", payout: 120 }, 0.58], [{ kind: "coins", label: "星輝の加護・Vストック", payout: 120 }, 0.31], [{ kind: "coins", label: "Phoenix V GET CHALLENGE", payout: 120 }, 0.11]] },
        { title: "双児宮・謎の黄金聖闘士", detail: "30Gで小宇宙とVストックを狙い、双児宮の幻影を突破します", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "双児宮突破", payout: 120 }, 0.66], [{ kind: "coins", label: "V GET CHALLENGE成功", payout: 120 }, 0.34]] },
        { title: "巨蟹宮・デスマスク", detail: "積尸気冥界波を越える継続バトル。小役成立なら勝利です", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "デスマスク撃破", payout: 120 }, 0.69], [{ kind: "coins", label: "COSMO BOOST×2", payout: 120 }, 0.31]] },
        { title: "獅子宮・アイオリア", detail: "30Gのメインパートで獲得したVストック込みの継続期待度は約76%です", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "アイオリア撃破", payout: 120 }, 0.64], [{ kind: "coins", label: "Phoenix V GET CHALLENGE", payout: 120 }, 0.36]] },
        { title: "処女宮・シャカ", detail: "中盤の強敵戦。4Gまたは5GのバトルをPUSHで判定します", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "シャカ撃破", payout: 120 }, 0.70], [{ kind: "coins", label: "星輝の加護・Vストック", payout: 120 }, 0.30]] },
        { title: "天蠍宮・ミロ", detail: "天秤宮の特殊区間を越え、ミロとの黄金聖闘士バトルへ進みます", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "ミロ撃破", payout: 120 }, 0.68], [{ kind: "coins", label: "COSMO BOOST×4", payout: 120 }, 0.32]] },
        { title: "磨羯宮・シュラ", detail: "後半戦。Vストックがあれば敗北を書き換えて次の宮へ進みます", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "シュラ撃破", payout: 120 }, 0.67], [{ kind: "coins", label: "Vストック消費で復活", payout: 120 }, 0.33]] },
        { title: "宝瓶宮・カミュ", detail: "人馬宮の特殊区間を経て宝瓶宮へ。勝利で最終の双魚宮が見えます", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "カミュ撃破", payout: 120 }, 0.68], [{ kind: "coins", label: "Burning・Vストック", payout: 120 }, 0.32]] },
        { title: "双魚宮・アフロディーテ", detail: "9人目の黄金聖闘士との最終戦。勝利でエクストララウンドへ進みます", games: 30, continueChance: 0.76, rewards: [[{ kind: "coins", label: "アフロディーテ撃破", payout: 120 }, 0.63], [{ kind: "coins", label: "黄金聖闘士9人撃破", payout: 120 }, 0.37]] },
        { title: "エクストララウンド", detail: "9人撃破後の追加AT。終了後は10Gの前兆エピソードを経てSAGA BATTLEへ", games: 30, continueChance: 1, rewards: [[{ kind: "coins", label: "エクストララウンド完走", payout: 120 }, 1]] }
      ]
    },
    "ggo-slot": {
      phase: "SQUAD JAM",
      label: "SQUAD JAM",
      statLabel: "BONUS当選",
      maxRounds: 5,
      upperAfterRounds: 5,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      markFinalRoundComplete: true,
      endLabel: "SQUAD JAM終了",
      rounds: [
        { title: "SQUAD JAM 1・バレットライン", detail: "25GのST。初回2ラインから小Vベル・レア役・ライン対応役で5Gバトルを狙います", games: 25, continueChance: 0.70, awardOnContinueOnly: true, rewards: ggoStormRewards() },
        { title: "SJ1 ボスバトル vs SHINC", detail: "5Gのボスチームバトル。勝利でEPISODE BONUSとSAO失敗者へ進みます", games: 5, continueChance: 0.40, awardOnContinueOnly: true, rewards: [[{ kind: "bonus", label: "EPISODE BONUS・ラストバトルは私に", games: 20, payout: 130 }, 1]] },
        { title: "SAO失敗者（ルーザー）", detail: "50GのエピソードAT。ポイントMAXからエピソードブレイクも抽選し、終了後はSJ2へ", games: 50, continueChance: 1, rewards: [[{ kind: "coins", label: "SAO失敗者 完走・SJ2獲得", payout: 355 }, 1]] },
        { title: "SQUAD JAM 2・バレットライン", detail: "30G・継続率約77%のST。バトル勝利でガンゲイルストームへ進みます", games: 30, continueChance: 0.77, awardOnContinueOnly: true, rewards: ggoStormRewards() },
        { title: "SJ2 ボスチーム KKHC出現", detail: "30GのSJ2を進め、最後の5Gボスバトルでイカれたレンへの当落を開きます", games: 30, continueChance: 1, rewards: [[{ kind: "coins", label: "KKHC ボスバトル到達", payout: 50 }, 1]] }
      ]
    },
    "lycoris-recoil-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      rounds: [
        { title: "リコリスラッシュ・初回20G", detail: "初回20G＋αで最初のリコリスBONUS当選を狙います", games: 20, continueChance: 0.55, rewards: [[{ kind: "bonus", label: "リコリスBONUS", games: 12, payout: 100 }, 0.68], [{ kind: "bonus", label: "BONUS W", games: 24, payout: 200 }, 0.32]] },
        { title: "バレットジャッジ", detail: "1GのPUSHでBONUS種別を決め、RUSH50への移行を判定します", games: 1, continueChance: 0.62, rewards: [[{ kind: "bonus", label: "リコリスBONUS", games: 12, payout: 100 }, 0.52], [{ kind: "bonus", label: "BONUS W", games: 24, payout: 200 }, 0.35], [{ kind: "bonus", label: "エピソードBONUS", games: 36, payout: 300 }, 0.13]] },
        { title: "リコリスラッシュ50・前半", detail: "50G＋αの前半区間でポイントとBONUSの複数獲得を狙います", games: 50, continueChance: 0.68, rewards: [[{ kind: "bonus", label: "リコリスBONUS", games: 12, payout: 100 }, 0.52], [{ kind: "bonus", label: "BONUS W", games: 24, payout: 200 }, 0.33], [{ kind: "bonus", label: "エピソードBONUS", games: 36, payout: 300 }, 0.15]] },
        { title: "リコリスBONUSポイント獲得", detail: "BONUS消化中に1000ptを目指し、上位CZへの道を進めます", games: 12, continueChance: 0.70, rewards: [[{ kind: "bonus", label: "リコリスBONUS 100枚", games: 12, payout: 100 }, 0.54], [{ kind: "bonus", label: "BONUS W 200枚以上", games: 24, payout: 220 }, 0.32], [{ kind: "bonus", label: "りこりすぷらっしゅ", games: 46, payout: 385 }, 0.14]] },
        { title: "リコリスラッシュ50・ST区間", detail: "後半10G＋αのST。BONUS当選で残りゲームを再セットします", games: 10, continueChance: 0.72, rewards: [[{ kind: "bonus", label: "リコリスBONUS再セット", games: 12, payout: 100 }, 0.48], [{ kind: "bonus", label: "BONUS W再セット", games: 24, payout: 220 }, 0.38], [{ kind: "bonus", label: "カウントダウン1000", games: 100, payout: 1000 }, 0.14]] },
        { title: "1000pt到達", detail: "ポイント到達後の最終PUSHから『リコイル オブ リコリス』へ挑みます", games: 8, continueChance: 0.78, rewards: [[{ kind: "bonus", label: "エピソードBONUS", games: 36, payout: 300 }, 0.65], [{ kind: "bonus", label: "カウントダウン2000", games: 100, payout: 2000 }, 0.35]] }
      ]
    },
    "toloveru-darkness-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      rounds: [
        { title: "メモリアルBONUS", detail: "約100枚の初期BONUSを獲得し、楽園計画への入口を抽選します", games: 15, continueChance: 0.52, rewards: [[{ kind: "bonus", label: "メモリアルBONUS 100枚", games: 15, payout: 100 }, 0.84], [{ kind: "bonus", label: "ToLOVEるエピソード", games: 20, payout: 132 }, 0.16]] },
        { title: "楽園計画・ヒロイン1人目", detail: "10G＋αのST。BONUS当選で残りゲームを再セットします", games: 10, continueChance: 0.52, rewards: [[{ kind: "coins", label: "100枚BONUS", payout: 100 }, 0.52], [{ kind: "coins", label: "200枚BONUS", payout: 200 }, 0.33], [{ kind: "coins", label: "400枚BONUS", payout: 400 }, 0.15]] },
        { title: "プレゼントちゃんす", detail: "1GのPUSHで100〜1600枚のBONUS振り分けを開きます", games: 1, continueChance: 0.58, rewards: [[{ kind: "coins", label: "100枚BONUS", payout: 100 }, 0.42], [{ kind: "coins", label: "200枚BONUS", payout: 200 }, 0.32], [{ kind: "coins", label: "400枚BONUS", payout: 400 }, 0.18], [{ kind: "coins", label: "800枚BONUS", payout: 800 }, 0.06], [{ kind: "coins", label: "1600枚BONUS", payout: 1600 }, 0.02]] },
        { title: "楽園計画・ヒロイン2人目", detail: "BONUS後にSTを再セット。二人目の攻略で上位期待度を高めます", games: 10, continueChance: 0.56, rewards: [[{ kind: "coins", label: "200枚BONUS", payout: 200 }, 0.55], [{ kind: "coins", label: "400枚BONUS", payout: 400 }, 0.32], [{ kind: "bonus", label: "ToLOVEるエピソード", games: 20, payout: 500 }, 0.13]] },
        { title: "ダークネス計画", detail: "5Gの特化区間で毎ゲームSTゲーム数を加算し、上乗せ分を持ち越します", games: 5, continueChance: 0.64, rewards: [[{ kind: "games", label: "STゲーム数上乗せ", games: [[10, 0.45], [20, 0.32], [30, 0.16], [50, 0.07]] }, 0.82], [{ kind: "bonus", label: "ヤミエピソード", games: 20, payout: 400 }, 0.18]] },
        { title: "楽園計画・ヒロイン3人攻略", detail: "三人目攻略後のPUSHで上位『ハーレムモード』突入を判定します", games: 10, continueChance: 0.70, rewards: [[{ kind: "coins", label: "ヒロイン3人攻略", payout: 300 }, 0.58], [{ kind: "coins", label: "400枚BONUS", payout: 400 }, 0.28], [{ kind: "bonus", label: "上位準備エピソード", games: 20, payout: 600 }, 0.14]] }
      ]
    },
    "tokyo-revengers-slot": {
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      rounds: [
        { title: "BREAK CHANCE", detail: "PUSHで東卍RUSHの初期差枚を決定。150枚以上からATを開始します", games: 1, continueChance: 0.72, rewards: [[{ kind: "coins", label: "初期150枚", payout: 150 }, 0.55], [{ kind: "coins", label: "初期200枚", payout: 200 }, 0.28], [{ kind: "coins", label: "初期300枚", payout: 300 }, 0.13], [{ kind: "coins", label: "初期500枚", payout: 500 }, 0.04]] },
        { title: "東卍RUSH・差枚消化", detail: "純増約3.2枚/Gの差枚管理AT。レア役から直乗せと東卍チャージを狙います", games: 47, continueChance: 0.68, rewards: [[{ kind: "coins", label: "差枚上乗せ +20枚", payout: 20 }, 0.52], [{ kind: "coins", label: "差枚上乗せ +50枚", payout: 50 }, 0.30], [{ kind: "coins", label: "差枚上乗せ +100枚", payout: 100 }, 0.13], [{ kind: "coins", label: "東卍チャージ +200枚", payout: 200 }, 0.05]] },
        { title: "一触即発", detail: "規定ポイントから突入するバトル。PUSHで勝利と東卍ATTACKを判定します", games: 8, continueChance: 0.64, rewards: [[{ kind: "coins", label: "一触即発 勝利", payout: 100 }, 0.58], [{ kind: "coins", label: "マイキー一触即発", payout: 200 }, 0.27], [{ kind: "bonus", label: "東卍ATTACK獲得", games: 10, payout: 300 }, 0.15]] },
        { title: "東卍ATTACK", detail: "昇格型報酬ゾーン。上乗せ枚数や上位CZアイコンをPUSHで開きます", games: 10, continueChance: 0.70, rewards: [[{ kind: "coins", label: "東卍ATTACK +100枚", payout: 100 }, 0.42], [{ kind: "coins", label: "東卍ATTACK +200枚", payout: 200 }, 0.31], [{ kind: "coins", label: "東卍ATTACK +300枚", payout: 300 }, 0.19], [{ kind: "bonus", label: "上位CZアイコン獲得", games: 10, payout: 500 }, 0.08]] },
        { title: "LEAP上乗せ", detail: "上乗せの次ゲームで再抽選。LEAPまたは日和ってループで獲得を伸ばします", games: 1, continueChance: 0.75, rewards: [[{ kind: "coins", label: "LEAP上乗せ +50枚", payout: 50 }, 0.48], [{ kind: "coins", label: "LEAP上乗せ +100枚", payout: 100 }, 0.30], [{ kind: "coins", label: "日和ってループ +200枚", payout: 200 }, 0.17], [{ kind: "coins", label: "日和ってループ +300枚", payout: 300 }, 0.05]] },
        { title: "黒い衝動・最終抗争", detail: "AT終盤の最終抗争。突破すると上位CZ『リベンジチャンス』へ進みます", games: 10, continueChance: 0.80, rewards: [[{ kind: "coins", label: "最終抗争突破", payout: 250 }, 0.58], [{ kind: "bonus", label: "天上天下唯我独尊", games: 30, payout: 500 }, 0.28], [{ kind: "bonus", label: "リベンジチャンス獲得", games: 10, payout: 700 }, 0.14]] }
      ]
    },
    "shin-onimusha3-slot": {
      maxRounds: 7,
      upperAfterRounds: 7,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      rounds: [
        { title: "蒼剣RUSH・初回セット", detail: "初回40G＋α・純増約2.5枚/G。レア役からゲーム数上乗せとBONUSを狙います", games: 40, continueChance: 0.62, rewards: [[{ kind: "games", label: "ゲーム数上乗せ", games: [[10, 0.48], [20, 0.28], [30, 0.15], [50, 0.07], [100, 0.02]] }, 0.62], [{ kind: "bonus", label: "鬼BONUS", games: 10, payout: 46 }, 0.18], [{ kind: "bonus", label: "蒼剣BONUS", games: 20, payout: 92 }, 0.15], [{ kind: "bonus", label: "真蒼剣BONUS", games: 30, payout: 138 }, 0.05]] },
        { title: "幻魔京バトル・1戦目", detail: "6Gの継続バトル。PUSHで勝利と次セットへの継続を判定します", games: 6, continueChance: 0.66, rewards: [[{ kind: "coins", label: "幻魔京バトル勝利", payout: 80 }, 0.68], [{ kind: "bonus", label: "蒼剣BONUSストック", games: 20, payout: 92 }, 0.22], [{ kind: "games", label: "継続ストック", games: 30 }, 0.10]] },
        { title: "蒼剣RUSH・2セット目", detail: "継続後は30G＋α。バトル高確とBONUS高確から次の契機を狙います", games: 30, continueChance: 0.70, rewards: [[{ kind: "games", label: "蒼剣上乗せ", games: [[10, 0.44], [20, 0.28], [30, 0.17], [50, 0.08], [100, 0.03]] }, 0.54], [{ kind: "bonus", label: "鬼BONUS", games: 10, payout: 46 }, 0.20], [{ kind: "bonus", label: "蒼剣BONUS", games: 20, payout: 92 }, 0.19], [{ kind: "bonus", label: "真蒼剣BONUS", games: 30, payout: 138 }, 0.07]] },
        { title: "鬼BATTLE", detail: "2Gの上乗せ高確。平均期待度約50%のPUSHで上乗せまたはストックを獲得します", games: 2, continueChance: 0.72, rewards: [[{ kind: "games", label: "鬼BATTLE上乗せ", games: [[10, 0.42], [20, 0.28], [30, 0.18], [50, 0.09], [100, 0.03]] }, 0.72], [{ kind: "bonus", label: "蒼剣BONUSストック", games: 20, payout: 92 }, 0.28]] },
        { title: "蒼剣RUSH・3セット目", detail: "30G＋αの節目セット。継続時の一部で覚醒チャレンジへの道が開きます", games: 30, continueChance: 0.75, rewards: [[{ kind: "games", label: "セット節目上乗せ", games: [[20, 0.46], [30, 0.29], [50, 0.17], [100, 0.08]] }, 0.55], [{ kind: "bonus", label: "蒼剣BONUS", games: 20, payout: 92 }, 0.30], [{ kind: "bonus", label: "真蒼剣BONUS", games: 30, payout: 138 }, 0.15]] },
        { title: "鬼斬乱舞", detail: "10Gの上乗せ特化ゾーン。平均約180Gを目安にゲーム数とストックを積み上げます", games: 10, continueChance: 0.80, rewards: [[{ kind: "games", label: "鬼斬乱舞", games: [[100, 0.38], [150, 0.27], [180, 0.20], [200, 0.10], [300, 0.05]] }, 0.82], [{ kind: "bonus", label: "鬼斬乱舞＋赤7BONUS", games: 20, payout: 460 }, 0.18]] },
        { title: "幻魔京バトル・覚醒ルート", detail: "節目の6Gバトルを突破すると、上位CZ『覚醒チャレンジ』へ進みます", games: 6, continueChance: 0.84, rewards: [[{ kind: "coins", label: "幻魔京バトル勝利", payout: 180 }, 0.58], [{ kind: "games", label: "継続ストック＋1", games: 30 }, 0.27], [{ kind: "bonus", label: "覚醒チャレンジ獲得", games: 10, payout: 350 }, 0.15]] }
      ]
    },
    "basilisk-tenzen-slot": {
      maxRounds: 12,
      upperAfterRounds: 12,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      routeSummary: "追想の刻10G＋α → 争忍の刻平均30Gを1セットとして最大12セット。絆高確・朧チャンス・夜・駿府城で継続期待度が変化します",
      rewardSummary: "各セットは甲賀勝利またはBC当選で継続。BCは16Gの異色・同色、30GのエピソードBC・プレミアムBCを別表示し、12セット完走時はエンディング後の宿怨チャレンジへ進みます。",
      rounds: [
        { title: "追想の刻 → 争忍の刻・1セット目", detail: "追想10G＋争忍平均30G。初回は絆高確が発動し、甲賀勝利で次セットへ進みます", games: 40, continueChance: 0.64, rewards: tenzenBtRewards() },
        { title: "追想の刻 → 争忍の刻・2セット目", detail: "追想中に絆玉とBCを抽選。争忍では対戦人数とステージから継続を判定します", games: 40, continueChance: 0.60, rewards: tenzenBtRewards() },
        { title: "追想の刻 → 争忍の刻・3セット目", detail: "絆玉を獲得すると争忍開始時に絆高確が点灯。対応役でBCを狙います", games: 40, continueChance: 0.63, rewards: tenzenBtRewards() },
        { title: "絆高確・4セット目", detail: "縁・想・恋の対応役がBC当選を後押し。BC当選ならセット継続が確定します", games: 40, continueChance: 0.66, rewards: tenzenBtRewards() },
        { title: "朧チャンス・5セット目", detail: "追想の刻の上位状態。絆玉を集め、複数の絆高確点灯を狙います", games: 40, continueChance: 0.68, rewards: tenzenBtRewards() },
        { title: "争忍の刻・6セット目", detail: "対戦人数決定からメインパート、天膳バトルへ。PUSHで甲賀勝利を開きます", games: 40, continueChance: 0.62, rewards: tenzenBtRewards() },
        { title: "争忍の刻・夜・7セット目", detail: "夜ステージは高継続に期待。BCまたは甲賀勝利で次の追想へ戻ります", games: 40, continueChance: 0.72, rewards: tenzenBtRewards() },
        { title: "絆高確・8セット目", detail: "絆玉の数に応じて点灯数が増加。絆モードなら全役でBCのチャンスです", games: 40, continueChance: 0.74, rewards: tenzenBtRewards() },
        { title: "争忍の刻・9セット目", detail: "シナリオ後半。ステージと対戦人数を見ながら継続ジャッジへ進みます", games: 40, continueChance: 0.76, rewards: tenzenBtRewards() },
        { title: "天膳バトル・10セット目", detail: "争忍終盤の天膳バトル。弦之介を含む甲賀勝利で11セット目へ進みます", games: 40, continueChance: 0.78, rewards: tenzenBtRewards() },
        { title: "争忍の刻・駿府城・11セット目", detail: "高期待度ステージから完走目前の継続をPUSHで判定します", games: 40, continueChance: 0.82, rewards: tenzenBtRewards() },
        { title: "12セット目・シナリオ完走", detail: "12セット目を突破してエンディングへ。終了後は宿怨チャレンジへ進みます", games: 40, continueChance: 0.98, rewards: [[{ kind: "coins", label: "12セット完走・エンディング", payout: 300 }, 0.84], [{ kind: "bonus", label: "月下閃滅", games: 20, payout: 360 }, 0.16]] }
      ]
    },
    "lupin-dai-koukaisha": {
      phase: "SUPER HERO",
      label: "SUPER HERO",
      statLabel: "上乗せ契機",
      maxRounds: 6,
      upperAfterRounds: 6,
      upperAfterRoundsAutoSuccess: false,
      upperOnlyAfterRounds: true,
      routeSummary: "初期50〜300G → デカ目高確 → 8Gのルパンゲーム → キャラ別BIG CHANCE → 怪盗RUSH → エンディング後の俺の名はルパン三世ゾーン",
      rewardSummary: "デカ目は直乗せ・ルパンゲーム・BIG CHANCEを抽選。BIG CHANCEは次元30〜500G、五ェ門20〜600G、ルパン50〜700G、不二子は怪盗RUSHとして個別表示します。",
      endLabel: "SUPER HERO終了",
      rounds: [
        { title: "SUPER HERO・初期ゲーム", detail: "初期50〜300G・純増約2.7枚/Gで開始。レア役とデカ目から最初の上乗せ契機を狙います", games: [[50, 0.70], [100, 0.20], [200, 0.08], [300, 0.02]], continueChance: 0.78, rewards: [[{ kind: "games", label: "デカ目直乗せ", games: [[10, 0.59], [30, 0.30], [50, 0.10], [100, 0.01]] }, 0.72], [{ kind: "games", label: "強チェリー直乗せ", games: [[10, 0.59], [30, 0.30], [50, 0.10], [100, 0.01]] }, 0.28]] },
        { title: "デカ目高確", detail: "デカ目出現率約1/25の高確区間。PUSHで直乗せかルパンゲームへの発展を開きます", games: 25, continueChance: 0.72, rewards: [[{ kind: "games", label: "デカ目直乗せ", games: [[30, 0.68], [50, 0.19], [100, 0.13]] }, 0.65], [{ kind: "bonus", label: "ルパンゲーム獲得", games: 8, payout: 22 }, 0.35]] },
        { title: "ルパンゲーム", detail: "8GのAT中CZ。デカ目・強チェリーなら勝利濃厚、最終PUSHでBIG CHANCEへの当落を開きます", games: 8, continueChance: 0.50, rewards: [[{ kind: "coins", label: "ルパンゲーム勝利", payout: 0 }, 0.78], [{ kind: "bonus", label: "ゼニロボルパンゲーム勝利", games: 8, payout: 45 }, 0.22]] },
        { title: "BIG CHANCE・キャラ決定", detail: "PUSHで次元・五ェ門・ルパン・不二子のいずれかを決定し、キャラ別の上乗せを開きます", games: 1, continueChance: 0.72, rewards: [[{ kind: "games", label: "次元BIG CHANCE・一発上乗せ", games: [[30, 0.745], [100, 0.20], [200, 0.04], [300, 0.01], [500, 0.005]] }, 0.36], [{ kind: "games", label: "五ェ門BIG CHANCE・分裂上乗せ", games: [[20, 0.45], [60, 0.30], [120, 0.17], [300, 0.07], [600, 0.01]] }, 0.28], [{ kind: "games", label: "ルパンBIG CHANCE・ループ上乗せ", games: [[50, 0.495], [100, 0.28], [150, 0.14], [200, 0.06], [300, 0.02], [700, 0.005]] }, 0.28], [{ kind: "bonus", label: "不二子・怪盗RUSH", games: 30, payout: 420 }, 0.08]] },
        { title: "怪盗RUSH・お宝アイコン", detail: "セットごとにゲーム数上乗せ・BIG CHANCE・ATストック・上位ATのお宝をPUSHで開きます", games: 30, continueChance: 0.75, rewards: [[{ kind: "games", label: "お宝・ゲーム数上乗せ", games: [[30, 0.48], [50, 0.30], [100, 0.17], [200, 0.05]] }, 0.52], [{ kind: "games", label: "お宝・BIG CHANCE", games: [[50, 0.55], [100, 0.30], [200, 0.15]] }, 0.30], [{ kind: "bonus", label: "お宝・ATストック", games: 50, payout: 300 }, 0.13], [{ kind: "bonus", label: "お宝・上位ATアイコン", games: 100, payout: 470 }, 0.05]] },
        { title: "エンディング・大航海の果て", detail: "規定枚数到達後のエンディングを経て、32Gの『俺の名はルパン三世ゾーン』へ進みます", games: 32, continueChance: 0.98, rewards: [[{ kind: "coins", label: "エンディング完走", payout: 160 }, 0.74], [{ kind: "games", label: "裏デカ目高確ストック", games: 50 }, 0.26]] }
      ]
    },
    "chibariyo2-slot": {
      phase: "CHIBARIYO HEAVEN",
      label: "天国32G",
      statLabel: "花笠BONUS連",
      maxRounds: 15,
      upperAfterRounds: 15,
      upperAfterRoundsAutoSuccess: true,
      upperOnlyAfterRounds: true,
      routeSummary: "花笠BONUS後32G以内の天国連を重ね、6連目でパトランプ昇格抽選、10連目から赤パトモード、15連目から虹パトモードの節目を再現します",
      rewardSummary: "各連はREG約90枚・BIG約210枚・SUPER BIG約315枚のいずれか。弱チェリー・強チェリー契機の1G連はボーナス振り分けにまとめ、15連後はリミットレスモードへ進みます。",
      endLabel: "天国モード終了",
      rounds: [
        { title: "天国32G・1連目", detail: "花笠BONUS後32G以内の再点灯を狙います。PUSHでBONUS種別と次回継続を開きます", games: 32, continueChance: 0.66, rewards: chibariyoBonusRewards() },
        { title: "天国32G・2連目", detail: "32G以内の花笠点灯で連チャン継続。チェリー成立時は1G連にも期待します", games: 32, continueChance: 0.66, rewards: chibariyoBonusRewards() },
        { title: "天国32G・3連目", detail: "天国モードの継続率をもとに、花笠BONUSの再当選を判定します", games: 32, continueChance: 0.68, rewards: chibariyoBonusRewards() },
        { title: "天国32G・4連目", detail: "REG・BIG・SUPER BIGのいずれかを獲得し、次の32G連へ進みます", games: 32, continueChance: 0.68, rewards: chibariyoBonusRewards() },
        { title: "天国32G・5連目", detail: "パトランプ昇格抽選の節目前。PUSHで5連目のBONUSを告知します", games: 32, continueChance: 0.70, rewards: chibariyoBonusRewards() },
        { title: "6連目・パトランプ昇格抽選", detail: "6回目のBONUSを契機にパトランプモードへの昇格を抽選し、連チャン性能を高めます", games: 32, continueChance: 0.75, rewards: chibariyoBonusRewards() },
        { title: "パトランプモード・7連目", detail: "パトランプ点灯後の高継続区間。32G以内の花笠点灯を目指します", games: 32, continueChance: 0.75, rewards: chibariyoBonusRewards() },
        { title: "パトランプモード・8連目", detail: "高継続モードからREG・BIG・SUPER BIGを抽選します", games: 32, continueChance: 0.78, rewards: chibariyoBonusRewards() },
        { title: "パトランプモード・9連目", detail: "赤パトモード移行の節目前。PUSHでBONUS種別を告知します", games: 32, continueChance: 0.80, rewards: chibariyoBonusRewards() },
        { title: "10連目・赤パトモード", detail: "10回目のBONUSで赤パトモードへ。約88%継続の代表値で次回を判定します", games: 32, continueChance: 0.88, rewards: chibariyoBonusRewards() },
        { title: "赤パトモード・11連目", detail: "約88%継続の赤パトモードでBONUS連を伸ばします", games: 32, continueChance: 0.88, rewards: chibariyoBonusRewards() },
        { title: "赤パトモード・12連目", detail: "32G以内の再点灯とチェリー契機の1G連をまとめて判定します", games: 32, continueChance: 0.88, rewards: chibariyoBonusRewards() },
        { title: "赤パトモード・13連目", detail: "虹パトモード到達まで残り2回。PUSHでBONUSを開きます", games: 32, continueChance: 0.88, rewards: chibariyoBonusRewards() },
        { title: "赤パトモード・14連目", detail: "次回15連目の虹パトモード到達をかけた高継続区間です", games: 32, continueChance: 0.88, rewards: chibariyoBonusRewards() },
        { title: "15連目・虹パトモード", detail: "15回目のBONUSで約92%継続の虹パトモードへ。終了後はリミットレスモードへ進みます", games: 32, continueChance: 0.92, rewards: chibariyoBonusRewards() }
      ]
    }
  };

  Object.entries(models).forEach(([slug, stageModel]) => {
    const sim = window.ICHIGEKI_MACHINES[slug]?.sim;
    const cycle = sim?.cycleFlow;
    if (!cycle) return;
    Object.assign(cycle, stageModel);
    if (slug === "garo-yami-slot") sim.mainRateLabel = "初当りBONUS";
    if (slug === "kinnikuman-7-slot") sim.upperSuccess = 1;
    if (slug === "god-eater-resurrection") sim.upperChallenge = "リザレクションゲート";
    if (slug === "hokuto-tensei2") {
      sim.upperChallenge = "天撃";
      sim.upperLabel = "裏闘神演舞";
      sim.upperPayout = 600;
      sim.upperPureIncrease = 4.0;
    }
    if (slug === "toloveru-darkness-slot") {
      sim.upperChallenge = "ヒロイン3人攻略ジャッジ";
      sim.upperSuccess = 0.34;
    }
    if (slug === "tokyo-revengers-slot") {
      sim.upperChallenge = "リベンジチャンス";
      sim.upperLabel = "東卍RUSH BURST";
      sim.upperPureIncrease = 8.0;
      sim.upperPayout = 700;
      sim.upperContinue = 0.80;
    }
    if (slug === "shin-onimusha3-slot") {
      sim.upperChallenge = "覚醒チャレンジ";
      sim.upperSuccess = 0.36;
      sim.upperLabel = "真蒼剣RUSH";
      sim.upperPureIncrease = 5.5;
      sim.upperPayout = 650;
      sim.upperContinue = 0.89;
    }
    if (slug === "basilisk-tenzen-slot") {
      sim.upperChallenge = "宿怨チャレンジ";
      sim.upperSuccess = 0.50;
      sim.upperLabel = "天膳BT";
      sim.upperPureIncrease = 2.9;
      sim.upperPayout = 120;
      sim.upperSetGames = [[40, 1]];
      sim.upperContinue = 0.80;
      sim.upperFailureLabel = "通常バジリスクタイム";
      sim.upperFailureGames = 40;
    }
    if (slug === "lupin-dai-koukaisha") {
      sim.upperChallenge = "俺の名はルパン三世ゾーン";
      sim.upperSuccess = 0.55;
      sim.upperLabel = "盗り放題スーパーヒーロー";
      sim.upperPureIncrease = 4.7;
      sim.upperSetGames = [[100, 0.76], [200, 0.19], [300, 0.05]];
      sim.upperContinue = 0;
      sim.upperMaxLoops = 1;
      sim.upperGameManaged = true;
      sim.upperGameRange = "100〜300G";
      sim.upperFailureLabel = "SUPER HERO 100G以上";
      sim.upperFailureGames = 100;
      sim.upperFailurePhase = "SUPER HERO";
      sim.upperFailureDetail = "ゾーン失敗でも通常SUPER HEROへ。100G以上の初期ゲームを消化します";
      sim.upperFailureRewardLabel = "通常SUPER HERO確定";
      sim.upperFailureMessage = "失敗でも通常SUPER HERO 100G以上へ進みます";
    }
    if (slug === "chibariyo2-slot") {
      sim.upperChallenge = "虹パトモード終了後";
      sim.upperSuccess = 1;
      sim.upperLabel = "リミットレスモード";
      sim.upperPureIncrease = 3.0;
      sim.upperPayout = 210;
      sim.upperSetGames = [[30, 0.28], [70, 0.72]];
      sim.upperContinue = 0.88;
    }
  });
})();

window.ICHIGEKI_MACHINE_AVAILABILITY = {
  isReady(machine, now = new Date()) {
    if (!machine?.availableFrom) return true;
    const release = new Date(`${machine.availableFrom}T00:00:00+09:00`);
    return Number.isFinite(release.getTime()) && now.getTime() >= release.getTime();
  },
  label(machine) {
    if (!machine?.availableFrom) return "";
    const [year, month, day] = machine.availableFrom.split("-").map(Number);
    return `${year}年${month}月${day}日導入予定`;
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
      verdict: "初当りBONUSの6:4振り分け、BIGから約40%のSUPER GARO BONUS、金色になれ！3戦、究極魔戒RUSHを順に体験する高純増タイプです。上位では金色バトルと陰我消滅ノ刻のパネル報酬を分けて確認できます。",
      bestFor: ["3戦突破型の金色になれ！をPUSHで試したい", "純増約9.1枚/Gとパネル別出玉の速さを見たい", "究極魔戒RUSH約82.6%ループの振れ幅を比べたい"],
      check: ["設定1〜6は開始時に均等抽選し結果で発表", "50Gリトライは回転表示までを簡易再現", "上位報酬の代表振り分けは平均約740枚になる比較用モデル"],
      compare: [["seiya-ougon-slot", "スマスロ 聖闘士星矢", "継続バトル型の上位ATと比較"], ["godzilla-eva2-slot", "スマスロ ゴジエヴァ2", "純増約5.2枚/GのATと比較"]]
    },
    "seiya-ougon-slot": {
      verdict: "白羊宮10Gから9人の黄金聖闘士を約76%で撃破し、エクストララウンド、約59%のSAGA BATTLE、約88%継続の千日戦争へ進む実機順の段階型です。",
      bestFor: ["黄金聖闘士ごとの30G＋継続PUSHを体験したい", "SAGA BATTLE約59%を自分で判定したい", "千日戦争の上乗せ・BONUS・終了後100Gを見たい"],
      check: ["天秤宮・人馬宮は通常対戦相手として数えない", "通常バトルはVストック込み約76%", "上位報酬の出現比率は体験用の代表振り分け"],
      compare: [["garo-yami-slot", "スマスロ 牙狼", "高純増ループ型と比較"], ["ggo-slot", "スマスロ GGO", "ST型の上位ルートと比較"]]
    },
    "ggo-slot": {
      verdict: "BIG約130枚／REG約70枚からSJ1の25G ST、5Gバトル、ガンゲイルストーム、50GのSAO失敗者、SJ2、8G・約85%のイカれたレンへ進む段階型です。",
      bestFor: ["25GのSJ1と30GのSJ2を別々に体験したい", "PUSHでガンゲイルストームの枚数を開きたい", "8G上位STと純増約7.1枚/GのBONUSを見たい"],
      check: ["初当り約1/192.0とSJ約1/521.7は別の指標", "ボス出現・勝利率は未公表のため代表値", "GGOストームは100〜3000枚OVERの代表振り分け"],
      compare: [["seiya-ougon-slot", "スマスロ 聖闘士星矢", "継続バトル型ATと比較"], ["godzilla-eva2-slot", "スマスロ ゴジエヴァ2", "BONUS経由ATとの違いを比較"]]
    },
    "godzilla-eva2-slot": {
      verdict: "約73枚の2種類のBONUSから専用ジャッジを経て、50〜600Gのゲーム数管理AT、怪獣索敵、4Gバトル、10倍上乗せ、4Gの上位CZへ進む段階型です。",
      bestFor: ["エヴァ約41%・ゴジラ約64%のAT当落を分けて試したい", "PUSHで10倍上乗せのゲーム数を開きたい", "4G決戦と100G以上のG覚醒RUSHを体験したい"],
      check: ["BONUS比率と通常AT中の各ルート出現率は体験用代表値", "決戦カイザーギドラ突破期待度は約66%", "G覚醒RUSH終了後は4G決戦と50G引き戻しを表示"],
      compare: [["ggo-slot", "スマスロ GGO", "BONUSからSTへ進む機種と比較"], ["garo-yami-slot", "スマスロ 牙狼", "高純増の上位ループ型と比較"]]
    },
    "mahoako-slot": {
      verdict: "3種類のCZと4種類のBONUSを入口に、3GのあこがれATTACK、3種類の特化ゾーン、無限AT、2段階の上位引き戻しまで進むゲーム数上乗せ型です。",
      bestFor: ["CZとBONUSが並行する入口を試したい", "PUSHで特化ゾーンと上乗せGを開きたい", "純増約5.0枚/Gの上位ATと引き戻しを体験したい"],
      check: ["BONUS4種類の比率は公開値を使用", "CZ内訳とREGからのAT率は全体初当りへ合わせる代表値", "上位終了後はVSロードエノルメと10Gの引き戻しを表示"],
      compare: [["godzilla-eva2-slot", "スマスロ ゴジエヴァ2", "高純増ゲーム数管理ATと比較"], ["ggo-slot", "スマスロ GGO", "BONUS・ST型との違いを比較"]]
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
      { heading: "実機どおり設定1・2・4・5・6を抽選", paragraphs: ["通常設定は1・2・4・5・6の5段階で、設定3と設定Lは抽選しません。初当り合算は設定1約1/476から設定6約1/456までの公開値を使います。", "初当り差は比較的小さい一方、出玉率は設定1の97.7%から設定6の114.9%まで差があります。シミュレーターは選ばれた設定を結果とランキングへ表示します。"] },
      { heading: "3ルートから超革命RUSHまで", paragraphs: ["初当りを革命RUSH直撃・革命BONUS・決戦BONUSの代表比率1:1:1へ分けます。決戦BONUSは公式AT期待度約46%、革命BONUSは払い出し666枚到達でRUSHとして判定します。", "革命RUSHは各セットでPUSHし、ハラキリチャレンジを3回成功させると4セット目から超革命RUSHへ昇格します。途中終了と最大約90%継続の上位結果を比べられます。"] },
      { heading: "平均476Gと高コイン単価", paragraphs: ["設定1の初当り476Gと32.7G/50枚を基準にした平均投資目安は約15,800円です。46枚貸し・5.2枚交換で統一し、コイン単価4.2円は高い振れ幅を示す補助指標として表示します。", "平均より早く当たっても上位へ届かない結果と、深い投資から超革命RUSHで伸びる結果があります。初当りの早さだけでなく最終差枚と収支を合わせて確認してください。"] },
      { heading: "結果画面で確認するポイント", bullets: ["5段階設定ごとの初当りGを比較する", "革命の剣による獲得枚数の増加", "ハラキリチャレンジ3連から上位へ進めたか", "超革命RUSH終了までの差枚と収支"] }
    ],
    "smart-hokuto": [
      { heading: "30G＋αと8Gバトルをセットで再現", paragraphs: ["バトルボーナスは30G＋αの小役パートと8Gの継続バトルを1セットとして進みます。66%・79%・84%・89%の継続率モードを開始時に抽選し、各バトルのPUSHで継続または敗北を表示します。", "トキ共闘などから無想転生チャンスへ進んだ場合は別のPUSHで成功を判定し、成功後は継続約94%の無想転生バトルとして連数を積み上げます。"] },
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
      { heading: "8セットのグランドスラムから青島SGへ", paragraphs: ["SG RUSHは1セット40G＋αで、31G＋αの周回パートと9GのSGバトルに分けています。代表シナリオに応じてセットごとの継続期待度が変わり、各レースをPUSHで判定します。", "8セット完走でグランドスラムとなり、青島VS波多野をVストック込み約83%で判定します。勝利後は青島SGの継続レースをセットごとに表示します。"] },
      { heading: "平均299.8Gと比較的穏やかな単価", paragraphs: ["設定1のAT初当り299.8Gと32.0G/50枚を基準にした平均投資目安は約10,200円です。46枚貸し・5.2枚交換で固定し、差枚と現金収支を分けて表示します。", "コイン単価3.1円は高単価機との比較では穏やかな指標ですが、1回ごとの結果は大きく上下します。平均投資や単価だけで勝敗が決まるものではありません。"] },
      { heading: "結果画面で確認するポイント", bullets: ["5段階設定ごとのAT初当りG", "全速モード獲得時の差枚上乗せ", "青島VS波多野の突破当落", "青島SG到達後の継続回数と最終収支"] }
    ]
  };

  Object.entries(editorial).forEach(([slug, articleSections]) => {
    const machine = window.ICHIGEKI_MACHINES[slug];
    if (!machine) return;
    machine.updated = machine.updated && machine.updated > updated ? machine.updated : updated;
    machine.articleSections = articleSections;
  });
})();

// L海人 uses a title-specific 32G bonus-chain model. Keep this late in the
// file so older reusable cycle enrichments cannot overwrite the public model.
(() => {
  const machine = window.ICHIGEKI_MACHINES["uminchu-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    intro: "2026年10月19日導入の疑似ボーナスループ機。フルーツ連状態、BIGのJAC消化、BONUS後32G、10連で突入する8GのIREGUI、ストック消化後の約80%ループを専用演出で体験できます。",
    points: ["BIG平均約202枚・REG平均約53枚", "BONUS後は32G以内の自力連とストック放出を抽選", "10連で8GのIREGUI・突入時平均22連OVER"],
    specs: [["初当り（設定1）", "約1/247.7"], ["初当り（設定6）", "約1/207.6"], ["BONUS合算（設定1）", "約1/113.0"], ["BONUS合算（設定6）", "約1/86.7"], ["BIG平均", "約202枚・純増約3.8枚/G"], ["REG平均", "約53枚・純増約4.5枚/G"], ["ベース", "約29.9G/50枚"], ["32G連", "ストック＋フルーツ連"], ["IREGUI", "8G・最大8個ストック"], ["IREGUI後", "ストックなしでも約80%ループ"], ["IREGUI期待", "平均22連OVER・3000枚OVER"]],
    articleSections: [
      { heading: "設定1・2・4・5・6の初当り", paragraphs: ["通常設定は1・2・4・5・6で、設定3は搭載されていません。BONUS初当りは設定1約1/247.7から設定6約1/207.6、BONUS合算は約1/113.0から約1/86.7です。", "シミュレーターは開始時に5段階から均等抽選し、初当り確率と出玉率を設定別に使用します。抽選設定は最終結果と機種別ランキングで発表します。"] },
      { heading: "通常時・フルーツ連状態・大波チャンス", paragraphs: ["通常時は弱チェリー、オレンジ、強チェリー、プラムなどからフルーツ連状態を目指します。状態A・B・C・D・EXの順にフルーツ出現率と滞在性能が高まり、状態D・EXはBONUS当選まで継続します。", "大波チャンスは5Gのカウントダウン。5G以内にフルーツを引くと再セットや色昇格が発生します。サイトでは通常時の複数契機を公開されている設定別BONUS初当りへまとめています。"] },
      { heading: "BIG・REGとストック抽選", paragraphs: ["BIGは平均約202枚・純増約3.8枚/G。一般中と最大3回のJACゲームを行き来し、JACはベルナビ8回で終了します。REGは平均約53枚・純増約4.5枚/Gでベルナビ8回です。", "BONUS入賞時と消化中のフルーツでBONUSストックを抽選します。BIGの獲得枚数は固定ではないため、サイトでも平均202枚を中心に毎回少し変動させます。REGも平均53枚を中心に表示します。"] },
      { heading: "BONUS後32Gと10連までの流れ", paragraphs: ["BONUS終了後は必ず32G区間へ。ストックがあれば1〜32Gで放出し、ストックがなくてもフルーツ連状態と押し順チェリーで自力BONUSを狙います。", "サイトでは32Gを最後までカウントし、PUSHで『ストック放出』『自力当選』『32G終了』を表示します。10連前の自力継続率と連チャン中BIG比率は詳細非公表のため、公開合算値に近づける代表値です。"] },
      { heading: "8GのIREGUIと約80%ループ", paragraphs: ["32G以内のBONUSが10連すると8GのIREGUIへ突入。毎ゲーム擬似フルーツが成立し、弱チェリー＜オレンジ＜強チェリー・プラムの順でストック期待度が上がり、最大8個を獲得します。", "ストック分を含め再び10連へ到達するとIREGUIを再セット。ストックを使い切った後も32G以内のBONUSが約80%でループし、設定1でも平均22連OVER・期待獲得3000枚OVERとされています。"] },
      { heading: "固定レートと収支の条件", bullets: ["約29.9G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均初当り投資目安は約9,000円", "コイン単価は設定1の参考値約4.0円として表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["パチマガスロマガFREE L海人解析", "https://pachimaga.com/free/mach/maker-s/okazaki/l_uminchu.php"], ["P-WORLD L海人 機種情報", "https://www.p-world.co.jp/machine/database/10579"], ["パチ7 L海人 新台試打", "https://pachiseven.jp/articles/detail/26377"], ["パチ＆スロ必勝本 IREGUI解説", "https://p.hisshobon.jp/vpage/2816/1"]],
    readerGuide: {
      verdict: "初当りBONUSから32G以内の連チャンを10回つなぎ、8GのIREGUIとストック後約80%ループを目指す、液晶非搭載の告知・BONUS連タイプです。",
      bestFor: ["32Gのカウントダウンと告知を楽しみたい", "BIGのJAC消化と枚数変動を見たい", "10連後のIREGUIで大きな連チャンを狙いたい"],
      check: ["設定3は非搭載で1・2・4・5・6を抽選", "10連前の32G継続率は非公表のため代表値", "IREGUIは8G・最大8ストック、終了後は約80%ループ"],
      compare: [["haihai-shiosai-re", "ハイハイシオサイ2", "32G告知タイプと比較"], ["chibariyo2-slot", "チバリヨ2", "天国連タイプと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v7",
    triggerLabel: "BONUS初当り",
    triggerRate: 247.7,
    triggerSuccess: 1,
    mainLabel: "海人BONUS連",
    mainRate: 247.7,
    normalMin: 53,
    normalMax: 202,
    atPayoutVariance: 0,
    uminchuFlow: true,
    uminchuBigRate: 141.2,
    uminchuRegRate: 642.5,
    uminchuInitialBigChanceBySetting: { 1: 0.50, 2: 0.51, 4: 0.535, 5: 0.56, 6: 0.563 },
    uminchuChainBigChanceBySetting: { 1: 0.80, 2: 0.805, 4: 0.818, 5: 0.832, 6: 0.838 },
    uminchuPreIreguiContinue: 0.64,
    uminchuPostIreguiContinue: 0.80,
    uminchuIreguiStocks: [[2, 0.10], [3, 0.15], [4, 0.25], [5, 0.25], [6, 0.15], [7, 0.07], [8, 0.03]],
    specialLabel: "BONUSストック",
    specialChance: 0.28,
    upperChallenge: "BONUS 10連",
    upperChance: 0,
    upperSuccess: 1,
    upperLabel: "IREGUI",
    upperContinue: 0.80,
    upperPayout: 0,
    upperPureIncrease: 3.8,
    settingRates: { 1: { trigger: 247.7, main: 247.7, payout: 0.977 }, 2: { trigger: 243.3, main: 243.3, payout: 0.986 }, 4: { trigger: 219.8, main: 219.8, payout: 1.033 }, 5: { trigger: 211.0, main: 211.0, payout: 1.062 }, 6: { trigger: 207.6, main: 207.6, payout: 1.120 } }
  });
})();

// L転天 follows a 14G CZ, an initial 100-coin bonus, a game-counted bonus
// high, four palace bonus routes and a separate 10G upper challenge.
(() => {
  const machine = window.ICHIGEKI_MACHINES["tenten-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    intro: "2026年10月5日導入の疑似ボーナスループ機。14GのEPISODE BATTLE、初回約100枚、40G＋αの王宮舞踏会、4種類の王宮BONUS、転天STOCKチャレンジ、10Gの輪廻転天チャレンジを専用演出で体験できます。",
    points: ["CZは10GのレベルUP＋4Gのバトル", "王宮舞踏会は40G＋α・BONUS確率約1/34.1〜1/14.4", "上位CZは10G・成功期待度約50%"],
    specs: [["CZ（設定1）", "約1/171.5"], ["CZ（設定6）", "約1/136.0"], ["BONUS（設定1）", "約1/320.0"], ["BONUS（設定6）", "約1/246.4"], ["初回BONUS", "約100枚"], ["王宮BONUS", "約150枚・デュエット約200枚"], ["王宮舞踏会", "初回40G＋α"], ["BONUS確率", "約1/34.1〜1/14.4"], ["転天STOCK", "8G＋α・平均約2個"], ["輪廻転天CZ", "10G・成功期待度約50%"], ["上位期待獲得", "約3100枚"], ["純増", "約4.5枚/G"], ["ベース", "約32.4G/50枚"]],
    articleSections: [
      { heading: "設定別CZ・BONUS初当り", paragraphs: ["EPISODE BATTLEは設定1約1/171.5から設定6約1/136.0、転天BONUS初当りは設定1約1/320.0から設定6約1/246.4です。", "シミュレーターは設定1〜6を開始時に均等抽選し、CZ出現率・BONUS初当り・出玉率を設定別に使用します。"] },
      { heading: "14GのEPISODE BATTLE", paragraphs: ["CZは10GのレベルUPパートと4Gのバトルパートで構成。EPレベルが上がるほどバトル内容が変わり、勝利で初回BONUSを獲得します。", "EPレベルMAX時は10Gの精霊契約エピソードへ。フリーズ期待度は約26%で、成功時はエピソードBONUSに加えて革命ジャッジ1〜3個または輪廻転天チャレンジを獲得します。"] },
      { heading: "初回約100枚から王宮舞踏会へ", paragraphs: ["CZ成功後は転天BONUSまたはエピソードBONUSを約100枚獲得し、必ずロイヤルパレスパーティー～王宮舞踏会～へ進みます。", "王宮舞踏会は初回40G＋α。通常はBONUS約1/34.1、withアニス・withユフィは約1/20.6、withデュエットは約1/14.4です。"] },
      { heading: "4種類の王宮BONUSと革命ジャッジ", paragraphs: ["BIG、BIG withアニス、BIG withユフィは約150枚、デュエットBIGは約200枚。ヒロインBONUS後は対応した15G高確へ移行します。", "規定ゲーム数で2Gの革命ジャッジへ進み、小役成立でBONUS濃厚。サイトでは高確の残りゲーム数を減らし、最後のPUSHでBONUS種別を開きます。"] },
      { heading: "本気チャレ・転天STOCK", paragraphs: ["本気チャレチャンスは5GのST型で、ヒロイン出現ごとに高確ゲーム数を上乗せして5Gを再セットします。30G上乗せごとに革命ジャッジをストックします。", "転天STOCKチャレンジは8G＋α・平均約2個のBONUSストック特化ゾーン。獲得したストックは白BIG、赤BIG、青BIG、デュエットの順に放出されます。"] },
      { heading: "輪廻転天チャレンジと上位", paragraphs: ["輪廻転天チャレンジは10G・成功期待度約50%。成功時は約100枚のエピソードBONUSを経由し、上位ボーナス高確『王宮舞踏会～輪廻転天～』へ進みます。", "上位は初回40G＋α、withデュエット20Gから始まり、期待獲得は約3100枚。終了後も輪廻転天チャレンジで再突入を目指します。"] },
      { heading: "固定レートと収支の条件", bullets: ["約32.4G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均BONUS投資目安は約10,700円", "王宮BONUSと初回BONUSを別集計", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["平和 公式製品情報", "https://www.heiwanet.co.jp/products/1000/"], ["パチマガスロマガFREE 転天解析", "https://pachimaga.com/free/mach/maker-s/olympiaestate/l_tenten.php"], ["パチ＆スロ必勝本 BONUS解説", "https://p.hisshobon.jp/machine/4814/1/17"], ["なな徹 転天STOCKチャレンジ", "https://nana-press.com/kaiseki/machine/1233/39375/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10550"]],
    readerGuide: {
      verdict: "14GのCZを突破し、残りゲーム数をつなぐ王宮舞踏会で4種類のBONUSを重ね、10Gの輪廻転天チャレンジから上位を目指す台です。",
      bestFor: ["残りゲーム数が減る緊張感を楽しみたい", "BONUS種別とヒロイン高確を追いたい", "ストックと上位CZをPUSHで開きたい"],
      check: ["初回BONUSと王宮BONUSは獲得枚数が異なる", "ヒロイン高確は15G、上位はwithデュエット20G", "非公表の細かなルート比率は代表値"],
      compare: [["mahoako-slot", "スマスロ まほあこ", "ゲーム数上乗せ型と比較"], ["uminchu-slot", "スマスロ 海人", "BONUS連タイプと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v7",
    triggerLabel: "EPISODE BATTLE",
    triggerRate: 171.5,
    triggerSuccess: 0.536,
    mainLabel: "王宮舞踏会",
    mainRate: 320.0,
    normalMin: 0,
    normalMax: 0,
    atPayoutVariance: 0,
    tentenFlow: true,
    tentenInitialPayout: 100,
    tentenHighRates: { default: 34.1, anis: 20.6, yuffie: 20.6, duet: 14.4 },
    tentenStockAwards: [[1, 0.25], [2, 0.50], [3, 0.20], [4, 0.05]],
    tentenUpperSuccess: 0.50,
    specialLabel: "転天STOCKチャレンジ",
    specialChance: 0.10,
    upperChallenge: "輪廻転天チャレンジ",
    upperChance: 0,
    upperSuccess: 0.50,
    upperLabel: "王宮舞踏会～輪廻転天～",
    upperContinue: 0.50,
    upperPayout: 0,
    upperPureIncrease: 4.5,
    settingRates: { 1: { trigger: 171.5, main: 320.0, payout: 0.979 }, 2: { trigger: 168.3, main: 314.7, payout: 0.989 }, 3: { trigger: 154.9, main: 294.2, payout: 1.010 }, 4: { trigger: 147.0, main: 276.9, payout: 1.036 }, 5: { trigger: 140.4, main: 260.0, payout: 1.076 }, 6: { trigger: 136.0, main: 246.4, payout: 1.103 } }
  });
})();

// Lゴブリンスレイヤー uses three distinct CZ routes, a 100G set AT,
// 5G JUDGEMENT battles and a separate 100G/82% ULTIMATE LOOP.
(() => {
  const machine = window.ICHIGEKI_MACHINES["goblin-slayer-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    intro: "3種類のCZから純増約2.7枚/G・1セット100GのゴブリンスレイヤーRUSHを目指すセット継続機。オーブで継続率を上げ、5GのJUDGEMENT、報酬ジャッジ、純増約5.0枚/G・実質約82%のULTIMATE LOOPまでを専用演出で体験できます。",
    points: ["CZはMISSION約33%・CHANCE約45%・BATTLE約70%", "通常ATは1セット100G＋5G JUDGEMENT", "ULTIMATE LOOPは100G・純増約5.0枚/G・実質約82%"],
    specs: [["CZ合算（設定1）", "約1/226"], ["CZ合算（設定6）", "約1/184"], ["AT（設定1）", "約1/547.9"], ["AT（設定6）", "約1/435.7"], ["通常AT", "1セット100G＋α"], ["通常AT純増", "約2.7枚/G"], ["ループモード", "52%・62%・80%"], ["JUDGEMENT", "5G"], ["GS BONUS", "20G＋AT10G以上"], ["上位AT", "100G・実質約82%"], ["上位AT純増", "約5.0枚/G"], ["上位期待獲得", "3000枚OVER"], ["ベース", "約31.6G/50枚"]],
    articleSections: [
      { heading: "設定別CZ・AT初当り", paragraphs: ["CZ合算は設定1約1/226から設定6約1/184、AT初当りは設定1約1/547.9から設定6約1/435.7です。", "通常時はレア役、規定ゲーム数、スイカカウンター、小役履歴など複数契機があります。サイトでは設定別のCZ合算とAT初当りへまとめ、開始時に設定1〜6を均等抽選します。"] },
      { heading: "3種類のCZを個別表示", paragraphs: ["ゴブリンスレイヤーミッションは10G＋2Gジャッジ・期待度約33%。ゴブリンスレイヤーチャンスは青BAR狙えカットイン3回まで継続・期待度約45%です。", "ゴブリンスレイヤーバトルは最大7G・期待度約70%。サイトではCZ種類を開示し、それぞれのゲーム数を進めて最後のPUSHでAT当落を表示します。規定ゲーム数などからのAT直撃も代表ルートとして含めます。"] },
      { heading: "100G ATとオーブの継続率上乗せ", paragraphs: ["ゴブリンスレイヤーRUSHは1セット100G＋α・純増約2.7枚/G。52%・62%・80%のループモードは固定継続率ではなく、オーブ獲得や最終継続率の上がりやすさに影響します。", "オーブ3個ごとに継続率を10〜30%上乗せ。サイトではセットごとにオーブ数と最終継続率を表示し、100Gを最後まで消化してから5GのJUDGEMENTへ進みます。"] },
      { heading: "JUDGEMENT・報酬ジャッジ・BONUS", paragraphs: ["JUDGEMENTは5G。ホブゴブリンまたはゴブリンロードを撃破できれば次セットへ進み、1Gの報酬ジャッジで連撃・大連撃・上位ATなどを決めます。", "ゴブリンスレイヤーBONUSは20G・純増約2.7枚/Gで、終了後にATゲーム数を10G以上加算します。サイトではBONUS出玉とAT上乗せを分けて表示します。"] },
      { heading: "ULTIMATE LOOP", paragraphs: ["3・5セット目はゴブリンロードのチャンスで、撃破時は約50%でULTIMATE LOOP。最大8セット継続でも上位移行濃厚です。AT初当り時の約1/70で直行するルートもあります。", "ULTIMATE LOOPは1セット100G・純増約5.0枚/G・80%固定。ストック込みの実質継続は約82%で、突入時の期待獲得は3000枚OVERです。"] },
      { heading: "固定レートと収支の条件", bullets: ["約31.6G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1基準の平均AT投資目安は約18,800円", "ATセット・BONUS・上位セットを別集計", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["藤商事 公式発売発表", "https://www.fujimarukun.co.jp/corp/news/tdpr_20230303b.pdf"], ["一撃 CZ MISSION解析", "https://1geki.jp/slot/s_l_goblinslayer/44/"], ["一撃 CZ CHANCE解析", "https://1geki.jp/slot/s_l_goblinslayer/45/"], ["一撃 CZ BATTLE解析", "https://1geki.jp/slot/s_l_goblinslayer/46/"], ["一撃 AT解析", "https://1geki.jp/slot/s_l_goblinslayer/81/"], ["一撃 ULTIMATE LOOP解析", "https://1geki.jp/slot/s_l_goblinslayer/87/"]],
    readerGuide: {
      verdict: "3種類のCZを突破し、100GのATでオーブを集めて継続率を上げ、5GのJUDGEMENTから実質約82%のULTIMATE LOOPを目指す台です。",
      bestFor: ["100Gを回して継続率を育てたい", "セット最後のPUSHで当落を見たい", "純増約5.0枚/Gの上位ループを狙いたい"],
      check: ["52%・62%・80%はオーブ獲得を含む平均的な継続目安", "3・5セット目はゴブリンロードのチャンス", "通常時の全モードと小役履歴は代表モデルへ簡略化"],
      compare: [["kinnikuman-7-slot", "スマスロ キン肉マン", "セット突破型と比較"], ["smart-hokuto", "スマスロ北斗の拳", "継続バトル型と比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v7",
    triggerLabel: "CZ合算／AT直撃",
    triggerRate: 226,
    triggerSuccess: 0.412,
    mainLabel: "ゴブリンスレイヤーRUSH",
    mainRate: 547.9,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 2.7,
    atPayoutVariance: 0,
    goblinSlayerFlow: true,
    goblinCzRoutes: [[{ key: "mission", label: "ゴブリンスレイヤーミッション", games: 12, chance: 0.33 }, 0.65], [{ key: "chance", label: "ゴブリンスレイヤーチャンス", games: 3, chance: 0.45 }, 0.255], [{ key: "battle", label: "ゴブリンスレイヤーバトル", games: 7, chance: 0.70 }, 0.035], [{ key: "direct", label: "規定G数AT直撃", games: 1, chance: 1 }, 0.06]],
    goblinLoopModes: [[0.52, 0.60], [0.62, 0.30], [0.80, 0.10]],
    goblinBonusChance: 0.18,
    goblinDirectUpperChance: 1 / 70,
    specialLabel: "連撃モード／ゴブリンスレイヤーBONUS",
    specialChance: 0.28,
    upperChallenge: "JUDGEMENT・ゴブリンロード",
    upperChance: 0,
    upperSuccess: 0.50,
    upperLabel: "ULTIMATE LOOP",
    upperContinue: 0.82,
    upperPayout: 0,
    upperPureIncrease: 5.0,
    settingRates: { 1: { trigger: 226, main: 547.9, payout: 0.978 }, 2: { trigger: 223, main: 538.4, payout: 0.989 }, 3: { trigger: 215, main: 517.7, payout: 1.012 }, 4: { trigger: 204, main: 492.3, payout: 1.054 }, 5: { trigger: 196, main: 470.5, payout: 1.100 }, 6: { trigger: 184, main: 435.7, payout: 1.149 } }
  });
})();

// L アサルトリリィ is a difference-coin AT. The initial route, three Lily
// Challenges, Bouquet Bonus, in-AT boss battles, reward zones and upper CZ
// are kept separate so the simulator no longer behaves like a generic loop AT.
(() => {
  const machine = window.ICHIGEKI_MACHINES["assault-lily-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    intro: "2026年12月7日導入予定。3種類のリリィチャレンジ、25Gのブーケボーナス、初期150枚＋αの差枚数管理AT、ボスヒュージ襲来と上乗せ特化、上位ATまでを専用進行で確認できます。",
    points: ["CZは梨璃約44%・夢結約43%・シュッツエンゲル約69%", "RUSHは初期150枚＋α・純増約3.5枚/G", "上位RUSH SUPERは初期200枚＋α・特化性能強化"],
    specs: [["初当り（設定1）", "約1/273.4"], ["初当り（設定6）", "約1/220.6"], ["RUSH（設定1）", "約1/417.7"], ["RUSH（設定6）", "約1/296.8"], ["CZ", "10G・3種類"], ["ブーケボーナス", "25G・約88枚"], ["BONUS中RUSH期待度", "約29%"], ["通常AT", "初期150枚＋α"], ["AT純増", "約3.5枚/G"], ["ボスヒュージ襲来", "4〜5G"], ["ノインヴェルト戦術", "200〜3000枚"], ["上位AT", "初期200枚＋α"], ["ベース", "約31G/50枚"], ["出玉率", "97.5〜112.5%"]],
    articleSections: [
      { heading: "設定別初当りとRUSH", paragraphs: ["初当りは設定1約1/273.4〜設定6約1/220.6、アサルトリリィRUSHは設定1約1/417.7〜設定6約1/296.8です。", "通常時は梨璃・夢結ポイント、規定ゲーム数、レア役など複数の契機があります。サイトでは公開された設定別初当りとRUSH確率を使用します。"] },
      { heading: "3種類のリリィチャレンジ", paragraphs: ["リリィチャレンジは10G。梨璃CZは期待度約44%、夢結CZは約43%、シュッツエンゲルCZは約69%です。", "シュッツエンゲルCZは成功でRUSH濃厚、失敗時はポイント特化ゾーン『天上ノ庭』へ。サイトでは今回のCZ種類と期待度を表示し、最後のPUSHで当落を開きます。"] },
      { heading: "ブーケボーナスとAT直撃", paragraphs: ["ブーケボーナスは25G・獲得約88枚で、消化中のRUSH期待度は約29%。白7揃いやレア役を契機にRUSHを抽選します。", "通常時の代表ルートをAT直撃・CZ・BONUSへ分け、BONUS出玉はRUSH非突入時も収支へ加算します。"] },
      { heading: "差枚数管理RUSHとボスヒュージ襲来", paragraphs: ["アサルトリリィRUSHは初期150枚＋α・純増約3.5枚/Gの差枚数管理型。残り枚数を減らしながら、規定ゲーム数から4〜5Gのボスヒュージ襲来を目指します。", "ボス撃破後はヒュージバトル、チャームストライク、ノインヴェルト戦術、ルナティックトランサー、アサルトスパイラルなどの報酬へ進みます。サイトでは残り枚数、バトル、報酬上乗せを順番に表示します。"] },
      { heading: "ラストバレットジャッジメントと上位AT", paragraphs: ["上位CZはメモリア・討伐・殲滅・Edel Lilieの4種類。失敗後に再獲得すると種類昇格のチャンスがあります。", "成功時は初期200枚＋αのアサルトリリィRUSH SUPERへ。純増は通常ATと同じ約3.5枚/Gですが、特化ゾーン突入率や報酬CZ性能が強化されます。"] },
      { heading: "導入前の固定条件", bullets: ["2026年12月7日までは準備中表示", "約31G/50枚・46枚貸し・5.2枚交換で固定", "非公表の報酬振り分けと上位CZ当選率は代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["Lアサルトリリィ 公式サイト", "https://www.l-assaultlily.jp/"], ["ちょんぼりすた 機種解析", "https://chonborista.com/slot/nanashow/270416/"], ["パチンコ・パチスロ.com スペック情報", "https://pachinkopachisro.com/archives/60045732.html"]],
    readerGuide: {
      verdict: "3種類のCZやBONUSから差枚数ATへ入り、残り枚数を上乗せ特化で増やしながら上位CZを狙う台です。",
      bestFor: ["残り枚数が減る緊張感を楽しみたい", "PUSHで特化ゾーンの種類を開きたい", "通常ATと上位ATの性能差を比べたい"],
      check: ["導入日は2026年12月7日予定", "純増は通常・上位とも約3.5枚/G", "報酬振り分けなど未公表部分は代表モデル"],
      compare: [["assault-lily", "eアサルトリリィ", "パチンコ版と比較"], ["blue-reflection-tie", "Lブルーリフレクション", "同月の差枚ATと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v4",
    triggerLabel: "初当りルート",
    triggerRate: 273.4,
    triggerSuccess: 0.61,
    mainLabel: "アサルトリリィRUSH",
    mainRate: 417.7,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 3.5,
    atPayoutVariance: 0,
    assaultLilyFlow: true,
    assaultEntryRoutes: [[{ key: "direct", label: "AT直撃", games: 1, chance: 1 }, 0.30], [{ key: "riri", label: "梨璃リリィチャレンジ", games: 10, chance: 0.44 }, 0.25], [{ key: "yuyu", label: "夢結リリィチャレンジ", games: 10, chance: 0.43 }, 0.25], [{ key: "schutzengel", label: "シュッツエンゲルCZ", games: 10, chance: 0.69 }, 0.05], [{ key: "bouquet", label: "ブーケボーナス", games: 25, chance: 0.29, payout: 88 }, 0.15]],
    assaultInitialCoins: 150,
    assaultUpperInitialCoins: 200,
    assaultBossChance: 0.56,
    assaultUpperBossChance: 0.72,
    assaultUpperCzChance: 0.16,
    specialLabel: "上乗せ特化ゾーン",
    specialChance: 0.42,
    upperChallenge: "ラストバレットジャッジメント",
    upperChance: 0,
    upperSuccess: 0.45,
    upperLabel: "アサルトリリィRUSH SUPER",
    upperContinue: 0,
    upperPayout: 0,
    upperPureIncrease: 3.5,
    settingRates: { 1: { trigger: 273.4, main: 417.7, payout: 0.975 }, 2: { trigger: 266.6, main: 401.0, payout: 0.988 }, 3: { trigger: 257.0, main: 377.4, payout: 1.005 }, 4: { trigger: 243.5, main: 345.9, payout: 1.043 }, 5: { trigger: 232.3, main: 320.4, payout: 1.078 }, 6: { trigger: 220.6, main: 296.8, payout: 1.125 } }
  });
})();

(function applyKaguyaDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["kaguya-sama-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "15G＋αの告らせたいチャレンジから、高純増BONUSの1G連へ。",
    intro: "設定別BONUS初当りを使い、15G＋αのCZ、3種類の疑似BONUS、1G連、約100Gの引き戻し、奇跡的相性マリアージュMODEとEXTRA BONUSを実機順に体験できます。",
    points: ["CZは15G＋α・成功期待度約58%", "BIG／SUPER BIGの1G連期待度約45%", "5連目以降のBONUSループ期待度約80%"],
    specs: [["BONUS（設定1）", "約1/362"], ["BONUS（設定6）", "約1/335"], ["CZ", "15G＋α・約58%"], ["REG", "約83枚"], ["BIG", "30G・約270枚"], ["SUPER BIG", "54G・約490枚"], ["BONUS純増", "約9.0枚/G"], ["引き戻し", "約100G・約25%以上"], ["EXTRA BONUS", "平均期待約3450枚"], ["ベース", "約31G/50枚"]],
    articleSections: [
      { heading: "通常時から告らせたいチャレンジへ", paragraphs: ["通常時はチャンス目の規定回数、規定ゲーム数、強チャンス目などから前兆『恋愛頭脳戦』を経てCZを目指します。CZは15G＋αで、小役や2択成功から7図柄停止・一発告知を狙うゲーム性です。", "シミュレーターでは設定別BONUS初当りを維持しつつ、CZ15Gを最後まで進め、PUSHで約58%の当落を開きます。"] },
      { heading: "3種類の疑似BONUSと1G連", paragraphs: ["REGは平均約83枚、BIGは30G・約270枚、SUPER BIGは54G・約490枚。BIG以上は消化中に約45%で1G連ストックを抽選し、1G連時はBIG以上が濃厚です。", "1G連の一部で白銀覚醒、ガチきゅんPUSH、チカブレイクを表示します。特化ゾーンは次回BONUSストック数をPUSHまで伏せて見せます。"] },
      { heading: "約100Gの引き戻しと5連目以降", paragraphs: ["1G連非当選時は約100Gの引き戻しチャンスへ。成功期待度は通常約25%、5連目以降は約50%で、1G連と合わせたBONUSループ期待度は通常約60%、5連目以降は約80%です。", "引き戻し成功時もBIG以上へ進みます。終了時は100Gを最後までカウントして、ループ終了を明確に表示します。"] },
      { heading: "奇跡的相性MODEとEXTRA BONUS", paragraphs: ["ボーナス終了後の一部やエンディング後は、32G以内のSUPER BIGが濃厚となる奇跡的相性マリアージュMODEへ移行します。終了後は約80%のBONUSループに期待できます。", "BIG／SUPER BIGの一部でEXTRA BONUSへ昇格。50Gまたは100Gを約80%で上乗せ決定し、平均期待枚数約3450枚の上位ボーナスとして専用表示します。"] },
      { heading: "固定レートと簡易化する範囲", bullets: ["約31G/50枚・1,000円46枚貸し・5.2枚交換で固定", "内部モード、全小役、CZ再セット条件は代表抽選へ簡略化", "非公表のBONUS初回比率・特化ゾーン比率は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO 新製品案内", "https://www.sankyo-fever.co.jp/corporate/modify/IR/Timely/files/press_20240620c.pdf"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10091"], ["一撃 解析攻略", "https://1geki.jp/slot/l_kaguya/"]],
    readerGuide: {
      verdict: "15G＋αのCZを突破し、純増約9.0枚/GのBONUSを1G連と約100Gの引き戻しで重ねる高純増タイプです。5連目以降の約80%ループとEXTRA BONUSで結果が大きく変わります。",
      bestFor: ["CZからBONUSまでをPUSHで順番に体験したい", "REG・BIG・SUPER BIGの獲得差を比べたい", "1G連と100G引き戻しの連チャンを見たい"],
      check: ["1G連時はBIG以上として抽選", "5連目以降は公開されている約80%ループを反映", "EXTRAの初期G数振り分けなど非公表部分は代表値"],
      compare: [["dumbbell-slot", "スマスロ ダンベル", "同じSANKYOの高純増タイプと比較"], ["valvrave", "革命機ヴァルヴレイヴ", "セット継続型との違いを比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v5",
    kaguyaFlow: true,
    triggerLabel: "告らせたいチャレンジ",
    triggerRate: 210,
    triggerSuccess: 0.58,
    mainLabel: "KAGUYA BONUS",
    mainRate: 362,
    atPureIncrease: 9.0,
    atPayoutVariance: 0,
    kaguyaInitialBonuses: [[{ key: "reg", label: "REGULAR BONUS", games: 10, payout: 83, oneGameChance: 0 }, 0.49], [{ key: "big", label: "BIG BONUS", games: 30, payout: 270, oneGameChance: 0.45 }, 0.50], [{ key: "super", label: "SUPER BIG BONUS", games: 54, payout: 490, oneGameChance: 0.45 }, 0.01]],
    kaguyaChainBonuses: [[{ key: "big", label: "BIG BONUS", games: 30, payout: 270, oneGameChance: 0.45 }, 0.50], [{ key: "super", label: "SUPER BIG BONUS", games: 54, payout: 490, oneGameChance: 0.45 }, 0.50]],
    kaguyaReturnChance: 0.25,
    kaguyaLateReturnChance: 0.50,
    kaguyaExtraChance: 0.015,
    specialLabel: "1G連特化ゾーン",
    specialChance: 0.10,
    upperChallenge: "奇跡的相性マリアージュMODE",
    upperChance: 0.07,
    upperSuccess: 1,
    upperLabel: "EXTRA BONUS",
    upperContinue: 0.80,
    upperPureIncrease: 9.0
  });
})();

(function applyDumbbellDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["dumbbell-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "MUSCLE ZONEを突破し、ゲーム数上乗せからVストックの上位ループへ。",
    intro: "設定別CZ・AT初当りを使い、10G＋αのMUSCLE ZONE、30G＋αの通常AT、ゴールデンチャレンジ、Vストック特化、差枚数型の金肉BONUSを実機順に体験できます。",
    points: ["CZは10G＋α・成功期待度約40%", "通常ATは30G＋α・純増約8.5枚/G", "上位引き戻しは3G・成功期待度約56%"],
    specs: [["CZ（設定1）", "約1/247"], ["CZ（設定6）", "約1/239"], ["AT（設定1）", "約1/591"], ["AT（設定6）", "約1/504"], ["MUSCLE ZONE", "10G＋α・約40%"], ["通常AT", "30G＋α・約8.5枚/G"], ["ゴールデンチャレンジ", "3G・約56%"], ["ゴールデンタイム", "5G・平均Vストック約4個"], ["金肉BONUS", "平均約1070枚"], ["ベース", "約32.5G/50枚"]],
    articleSections: [
      { heading: "摂取カロリーとMUSCLE ZONE", paragraphs: ["通常時は摂取カロリー、100Gごとの神社ステージ、強レア役などからMUSCLE ZONEを目指します。CZは10G＋αの前半・後半構成で、トータル成功期待度は約40%です。", "後半はアームレスリング約42%、筋肉道約55%、マッスルプッシュ約85%。シミュレーターでも発展先を表示し、最後のPUSHでAT当落を開きます。"] },
      { heading: "30G＋αのダンベルBONUS", paragraphs: ["通常ATは純増約8.5枚/Gのゲーム数上乗せ型。初期30Gから、レア役や2択のレア役チャンスで＋20G以上の上乗せを狙います。", "上乗せゲーム数はPUSHまで伏せ、残りゲーム数を減らしながら表示します。120G継続時はゴールデンチャレンジの権利獲得濃厚として扱います。"] },
      { heading: "ゴールデンチャレンジとVストック", paragraphs: ["通常AT終了後に権利を持っていれば、3G・成功期待度約56%のゴールデンチャレンジへ。成功すると5Gのゴールデンタイムで毎ゲームVストックを抽選します。", "平均Vストックは約4個で、1個につき100枚以上。PUSHでストック個数と各ストックの差枚数を順番に開きます。"] },
      { heading: "金肉BONUSと上位ループ", paragraphs: ["金肉BONUSは純増約8.5枚/Gの差枚数管理型で、平均獲得枚数は約1070枚。通常ATのゲーム数上乗せとは分け、残り枚数と差枚数上乗せを表示します。", "終了後は3Gのライジングアッパーチャレンジへ。成功期待度約56%でゴールデンタイムへ戻り、Vストックと金肉BONUSをループします。"] },
      { heading: "固定レートと簡易化する範囲", bullets: ["約32.5G/50枚・1,000円46枚貸し・5.2枚交換で固定", "通常時の全カロリー・天井・内部状態は代表抽選へ簡略化", "ゲーム数・Vストック差枚の非公表振り分けは体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO ミニパンフ", "https://www.sankyo-fever.jp/products/assets/pdf/slq/slq_mp.pdf"], ["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/971/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10141"], ["一撃 解析攻略", "https://1geki.jp/slot/l_dumbbell/"]],
    readerGuide: {
      verdict: "通常ATはゲーム数、上位ATは差枚数を上乗せする二段階型です。MUSCLE ZONE突破後に120G継続や上位CZを通し、平均約4個のVストックから金肉BONUSを伸ばします。",
      bestFor: ["CZの発展先ごとの期待度を見たい", "通常ATのゲーム数上乗せをPUSHで体験したい", "上位のVストックと差枚数ループを比べたい"],
      check: ["通常AT30G＋αと上位の差枚数管理を別表示", "ゴールデンチャレンジ・引き戻しは各約56%", "Vストックの細かな振り分けは代表値"],
      compare: [["kaguya-sama-slot", "スマスロ かぐや様", "同じ高純増BONUS型と比較"], ["valvrave", "革命機ヴァルヴレイヴ", "セット型上位ATと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v5",
    dumbbellFlow: true,
    triggerLabel: "MUSCLE ZONE",
    triggerRate: 247,
    triggerSuccess: 0.40,
    mainLabel: "ダンベル何キロ持てる？BONUS",
    mainRate: 591,
    base50: 32.5,
    atPureIncrease: 8.5,
    atPayoutVariance: 0,
    dumbbellCzRoutes: [[{ key: "front", label: "前半パート終了", games: 10, chance: 0 }, 0.23], [{ key: "arm", label: "アームレスリング", games: 12, chance: 0.42 }, 0.45], [{ key: "road", label: "筋肉道", games: 12, chance: 0.55 }, 0.22], [{ key: "push", label: "マッスルプッシュ", games: 12, chance: 0.85 }, 0.10]],
    dumbbellBaseGames: 30,
    dumbbellGoldenChallengeChance: 0.56,
    dumbbellGoldenTimeGames: 5,
    dumbbellVStocks: [[2, 0.10], [3, 0.25], [4, 0.35], [5, 0.20], [6, 0.10]],
    specialLabel: "ゲーム数上乗せ",
    specialChance: 0.34,
    upperChallenge: "ゴールデンチャレンジ",
    upperChance: 0.18,
    upperSuccess: 0.56,
    upperLabel: "金肉BONUS",
    upperContinue: 0.56,
    upperPureIncrease: 8.5
  });
})();

(function applyShinEvaDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["shin-eva-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "3Gの作戦決定から10G＋αの作戦STへ。BONUSを重ね、マリ獣化から上位STを狙う。",
    intro: "設定別初当りを使い、3GのEVANGELION IMPACT、5種類の作戦ST、3種類のBONUS、三機殲滅、マリ獣化チャレンジ、上位のオップファータイプ殲滅作戦までを実機順に体験できます。",
    points: ["作戦STは10G＋α・BONUS期待度約72%", "BONUSは純増約5.0枚/G・3種類", "上位STは20G＋α・継続期待度約95%"],
    specs: [["初当り（設定1）", "約1/291.1"], ["初当り（設定6）", "約1/212.5"], ["EVANGELION IMPACT", "3G・作戦決定"], ["作戦ST", "10G＋α・約72%"], ["作戦ST純増", "約0.1枚/G"], ["BIG BONUS", "約150枚＋α"], ["SUPER BIG BONUS", "約300枚＋α"], ["SPECIAL BONUS", "約150枚＋α"], ["BONUS純増", "約5.0枚/G"], ["三機殲滅", "8G＋α"], ["マリ獣化チャレンジ", "10G・約38%"], ["上位ST", "20G＋α・約95%"], ["ベース", "約33.1G/50枚"], ["出玉率", "98.2〜114.9%"]],
    articleSections: [
      { heading: "EVANGELION IMPACTと5種類の作戦", paragraphs: ["初当り後は3GのEVANGELION IMPACTで作戦を決定します。作戦はパリ5段階、ヤマト4段階、US3段階、第8使徒迎撃2段階、ヤシマ1段階で、必要段階が少ないほどBONUSが近づきます。", "作戦STは10G＋α。作戦目やレア役で段階を進め、規定段階到達でBONUSです。進行のたびに10Gを再セットする特徴を、サイトでは段階数と総消化G数で表示します。"] },
      { heading: "作戦STと3種類のBONUS", paragraphs: ["作戦STのBONUS期待度は約72%、純増は約0.1枚/G。BONUSはBIG約150枚＋α、SUPER BIG約300枚＋α、SPECIAL約150枚＋αの3種類です。", "BONUS中は作戦進行ストックとVストックを抽選。サイトではBONUS種別をPUSHまで伏せ、獲得枚数とストックを別々に結果へ加算します。"] },
      { heading: "三機殲滅とゲンドウ対決", paragraphs: ["三機殲滅は8G＋αの作戦進行ストック特化ゾーンです。作戦ST失敗時にストックを使い、作戦継続へつなげます。", "VSゲンドウに勝利すると三機殲滅の権利を獲得。三機殲滅は上位ATそのものではなく、通常STを助ける特化ゾーンとして専用表示します。"] },
      { heading: "マリ獣化チャレンジと上位ST", paragraphs: ["BONUS後の一部で10Gのマリ獣化チャレンジへ。成功期待度は約38%で、成功後はSUPER BIGを経て上位STへ進みます。", "オップファータイプ殲滅作戦は20G＋α・純増約5.0枚/G・継続期待度約95%。8段階突破でSUPER BIGに当選し、再び上位STへ戻ります。"] },
      { heading: "固定レートと簡易化する範囲", bullets: ["約33.1G/50枚・1,000円46枚貸し・5.2枚交換で固定", "作戦ごとの選択比率、各ストック率、マリ獣化出現率は非公表のため代表値", "通常時の全モード・天井・成立役は初当り確率へ集約", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10196"], ["エヴァプロ 開発者ブログ", "https://blog.eva-project.jp/l_shin_eva_st/1511/"], ["一撃 解析攻略", "https://1geki.jp/slot/l_shin_eva/"], ["なな徹 解析情報", "https://nana-press.com/kaiseki/machine/893/26817/"]],
    readerGuide: {
      verdict: "5種類の作戦STで段階を進め、3種類のBONUSと進行ストックを重ねるST型です。三機殲滅は通常STの補助、マリ獣化成功が上位STへの入口です。",
      bestFor: ["作戦ごとの必要段階を見比べたい", "BONUS種類とストックをPUSHで開きたい", "通常STと継続約95%の上位STを比べたい"],
      check: ["作戦STは10G＋α・BONUS期待度約72%", "マリ獣化は10G・成功期待度約38%", "非公表の作戦選択率・ストック率は代表モデル"],
      compare: [["godzilla-eva2-slot", "Lゴジラ対エヴァ2", "同シリーズのゲーム数ATと比較"], ["kaguya-sama-slot", "Lかぐや様", "BONUSループ型と比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v6",
    shinEvaFlow: true,
    triggerLabel: "初当り（作戦ST／BONUS）",
    triggerRate: 291.1,
    triggerSuccess: 1,
    mainLabel: "作戦ST",
    mainRate: 291.1,
    base50: 33.1,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 0.1,
    atPayoutVariance: 0,
    shinEvaBonusPureIncrease: 5.0,
    shinEvaOperationContinue: 0.72,
    shinEvaOperations: [[{ key: "paris", label: "パリ作戦", phases: 5 }, 0.30], [{ key: "yamato", label: "ヤマト作戦", phases: 4 }, 0.25], [{ key: "us", label: "US作戦", phases: 3 }, 0.22], [{ key: "eighth", label: "第8使徒迎撃作戦", phases: 2 }, 0.15], [{ key: "yashima", label: "ヤシマ作戦", phases: 1 }, 0.08]],
    shinEvaBonuses: [[{ key: "big", label: "BIG BONUS", payout: 150, games: 30 }, 0.871], [{ key: "super", label: "SUPER BIG BONUS", payout: 300, games: 60 }, 0.098], [{ key: "special", label: "SPECIAL BONUS", payout: 150, games: 30 }, 0.031]],
    specialLabel: "三機殲滅",
    specialChance: 0.14,
    upperChallenge: "マリ獣化チャレンジ",
    upperChance: 0.12,
    upperSuccess: 0.38,
    upperLabel: "オップファータイプ殲滅作戦",
    upperContinue: 0.95,
    upperPayout: 0,
    upperPureIncrease: 5.0,
    shinEvaUpperMaxSets: 12,
    settingRates: { 1: { trigger: 291.1, main: 291.1, payout: 0.982 }, 2: { trigger: 281.7, main: 281.7, payout: 0.992 }, 3: { trigger: 268.5, main: 268.5, payout: 1.014 }, 4: { trigger: 245.0, main: 245.0, payout: 1.056 }, 5: { trigger: 226.8, main: 226.8, payout: 1.101 }, 6: { trigger: 212.5, main: 212.5, payout: 1.149 } }
  });
})();

// Every playable machine below owns a title-specific scenario: phase names,
// ordered rounds, rewards, continuation rules and upper-route conditions.
// The renderer is shared, but the game data is registered and audited per title.
(function applyDedicatedTitleFlows() {
  const profileDefinitions = {
    battle: {
      slugs: ["kinnikuman-7-slot", "hokuto-tensei2", "tokyo-ghoul-slot", "monster-hunter-sunbreak", "god-eater-resurrection", "monster-hunter-rise-slot", "tokyo-revengers-slot", "shin-onimusha3-slot", "shin-onimusha2-slot", "basilisk-tenzen-slot"],
      phaseLabel: "BATTLE FLOW",
      resultContinue: "BATTLE WIN",
      resultEnd: "BATTLE END",
      pushDetail: "勝敗と撃破報酬をPUSHで開きます",
      roundDetail: "対戦区間を最後まで進め、PUSHで勝敗と報酬を開きます"
    },
    st: {
      slugs: ["aobuta-slot", "bofuri-slot", "azur-lane-slot", "magia-record-slot", "toaru-index2-slot", "darling-in-the-franxx-slot", "dmc5-st-slot", "initial-d-2nd-slot"],
      phaseLabel: "ST FLOW",
      resultContinue: "ST CONTINUE",
      resultEnd: "ST END",
      pushDetail: "当選内容と次区間への継続をPUSHで開きます",
      roundDetail: "規定ゲーム数を進め、PUSHで当選内容と継続結果を開きます"
    },
    heaven: {
      slugs: ["okidoki-black", "okidoki-gold", "super-bingo-neo-slot", "yoshimune-slot", "chibariyo2-slot"],
      phaseLabel: "HEAVEN FLOW",
      resultContinue: "HEAVEN CONTINUE",
      resultEnd: "HEAVEN END",
      pushDetail: "告知結果と次のBONUSをPUSHで開きます",
      roundDetail: "連チャン区間を進め、PUSHで告知と次回BONUSを開きます"
    },
    bonus: {
      slugs: ["million-god-kiseki", "juoh-slot", "paripi-koumei-slot", "magical-halloween8", "super-blackjack-slot", "fire-force2-slot", "fire-force-slot", "gundam-seed-slot"],
      phaseLabel: "BONUS FLOW",
      resultContinue: "BONUS CONTINUE",
      resultEnd: "BONUS END",
      pushDetail: "BONUS・継続報酬をPUSHで開きます",
      roundDetail: "報酬区間を進め、PUSHでBONUSと継続結果を開きます"
    },
    addon: {
      slugs: ["gundam-unicorn-awakening-drive", "mushoku-tensei-slot", "toloveru-darkness-slot", "biohazard5-slot", "vivy-slot", "golden-kamuy-slot", "bancho4-slot", "zenigata4-slot", "inuyasha2-slot", "godzilla-eva-slot", "lupin-dai-koukaisha", "iza-bancho"],
      phaseLabel: "ADD-ON FLOW",
      resultContinue: "ADD-ON CONTINUE",
      resultEnd: "AT END",
      pushDetail: "上乗せ・BONUS・継続結果をPUSHで開きます",
      roundDetail: "残りゲーム数を進め、PUSHで上乗せかBONUSを開きます"
    }
  };

  const rewardDescription = rewards => (Array.isArray(rewards) ? rewards : [])
    .map(entry => entry?.[0]?.label)
    .filter(Boolean)
    .join("・");
  const clampedRate = value => Math.max(0.05, Math.min(1, Number(value) || 0.72));
  const calculateBalance = (sim, cycle) => {
    const rounds = Array.isArray(cycle.rounds) ? cycle.rounds : [];
    const maxRounds = Math.max(1, Math.min(rounds.length, Number(cycle.maxRounds) || rounds.length));
    let reach = 1;
    let averageRounds = 0;
    for (let index = 0; index < maxRounds; index += 1) {
      averageRounds += reach;
      reach *= clampedRate(rounds[index]?.continueChance ?? cycle.continueChance);
    }

    const upperAfterRounds = Math.max(0, Number(cycle.upperAfterRounds) || 0);
    const upperChance = Math.max(0, Math.min(1, Number(sim.upperChance) || 0));
    const upperSuccess = Math.max(0, Math.min(1, Number(sim.upperSuccess) || 0));
    let upperRoute = upperChance * upperSuccess;
    if (upperAfterRounds > 0) {
      let thresholdReach = 1;
      for (let index = 0; index < upperAfterRounds - 1; index += 1) {
        thresholdReach *= clampedRate(rounds[Math.min(index, rounds.length - 1)]?.continueChance ?? cycle.continueChance);
      }
      const thresholdSuccess = cycle.upperAfterRoundsAutoSuccess === false ? upperSuccess : 1;
      upperRoute = thresholdReach * thresholdSuccess;
      if (!cycle.upperOnlyAfterRounds) upperRoute += (1 - thresholdReach) * upperChance * upperSuccess;
    }
    return {
      averageRounds: Number(averageRounds.toFixed(2)),
      upperRoute: Number(Math.max(0, Math.min(1, upperRoute)).toFixed(4))
    };
  };

  Object.entries(profileDefinitions).forEach(([profile, definition]) => {
    definition.slugs.forEach(slug => {
      const machine = window.ICHIGEKI_MACHINES[slug];
      const sim = machine?.sim;
      const cycle = sim?.cycleFlow;
      if (!machine || !sim || !cycle) return;

      const labels = Array.isArray(cycle.roundLabels) && cycle.roundLabels.length
        ? cycle.roundLabels
        : Array.from({ length: Math.max(1, Number(cycle.maxRounds) || 1) }, (_, index) => `${cycle.label || sim.mainLabel} ${index + 1}回目`);
      const existingRounds = Array.isArray(cycle.rounds) ? cycle.rounds : [];
      const roundCount = Math.max(labels.length, existingRounds.length, Number(cycle.maxRounds) || 1);
      cycle.rounds = Array.from({ length: roundCount }, (_, index) => ({
        title: labels[index] || existingRounds[index]?.title || `${cycle.label || sim.mainLabel} ${index + 1}回目`,
        games: cycle.games,
        continueChance: cycle.continueChance,
        rewards: cycle.rewards,
        detail: definition.roundDetail,
        ...(existingRounds[index] || {})
      }));
      cycle.routeSummary ||= cycle.rounds.map(round => round.title).filter(Boolean).join(" → ");
      cycle.rewardSummary ||= rewardDescription(cycle.rewards) || cycle.rewardLabel || "専用報酬";
      cycle.engine = "dedicated-title-flow-v2";
      sim.dedicatedFlow = true;
      sim.dedicatedFlowKey = slug;
      sim.dedicatedFlowVersion = 2;
      sim.titleFlow = {
        profile,
        version: 2,
        dedicated: true,
        machineKey: slug,
        engine: cycle.engine,
        phaseLabel: definition.phaseLabel,
        resultContinue: definition.resultContinue,
        resultEnd: definition.resultEnd,
        pushDetail: definition.pushDetail,
        balance: calculateBalance(sim, cycle)
      };
      sim.rankingVersion = "v8";
      machine.updated = "2026-11-07";
    });
  });
})();

(function applySao2DedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["sao2-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    maker: "パオン・ディーピー",
    catchcopy: "スナイパーチャンス最大3勝から、デス・ガンバトルとFULL DIVEへ。",
    intro: "約55%のスコードロンバトルから純増約3.6枚/G・初期150枚＋αのBullet of Bulletsへ。20G周期のスナイパーチャンス、5Gのラストアタック、4G＋最終1Gのデス・ガンバトル、純増約7.2枚/GのFULL DIVEまでを実機順に体験できます。",
    points: ["スコードロンバトル成功期待度約55%", "BoBは初期150枚＋α・SC最大3勝", "デス・ガンバトル約50%・上位純増約7.2枚/G"],
    specs: [["CZ（設定1）", "約1/238.4"], ["AT（設定1）", "約1/386.2"], ["AT（設定6）", "約1/269.6"], ["スコードロンバトル", "成功期待度約55%"], ["BoB", "初期150枚＋α"], ["通常AT純増", "約3.6枚/G"], ["スナイパーチャンス", "液晶20Gごと・最大3勝"], ["ラストアタック", "5G・成功期待度約35%"], ["デス・ガンバトル", "4G＋最終1G・約50%"], ["FULL DIVE", "純増約7.2枚/G"], ["絶剣", "初期2200枚＋α"], ["ベース", "約31G/50枚"], ["コイン単価", "約4.1円"], ["設定", "1〜6"]],
    articleSections: [
      { heading: "スコードロンバトルからBoBへ", paragraphs: ["通常時は液晶ゲーム数、バレットカウンター、強チェリーなどからCZを目指します。CZスコードロンバトルの成功期待度は約55%で、成功するとBullet of Bulletsへ進みます。", "設定別CZ・AT初当りは公開値を使用。通常時の内部モードと全小役抽選は初当り確率へまとめています。"] },
      { heading: "150枚＋αとスナイパーチャンス", paragraphs: ["BoBは純増約3.6枚/G・初期150枚＋αの差枚数AT。液晶20Gごとにスナイパーチャンスを抽選し、AT1回につき最大3勝を目指します。", "対戦相手はダイン、ペイルライダー、闇風、銃士X、デス・ガン。デス・ガン勝利時は上位CZの権利を獲得します。相手別の詳細勝率が非公表の部分は強弱関係を保つ代表値です。"] },
      { heading: "ラストアタックとデス・ガンバトル", paragraphs: ["差枚を使い切ると5Gのラストアタックへ進み、成功期待度約35%でスナイパーチャンスへ復帰します。スナイパーチャンス3勝、またはデス・ガン撃破でデス・ガンバトルの権利を獲得します。", "デス・ガンバトルは4Gのバトル＋最終1GのPUSHで決着し、成功期待度は約50%。突破すると上位ATへ進みます。"] },
      { heading: "FULL DIVE・絶剣・アルティマ状態", paragraphs: ["FULL DIVEは純増約7.2枚/G。上乗せは3桁以上となり、終了後は再びデス・ガンバトルへ進みます。サイトでは上位区間と継続ジャッジを交互に表示します。", "上位突入の一部は1G完結の絶剣へ進み、初期2200枚＋αを獲得。アルティマ状態中はデス・ガンバトルの勝利期待度を高めた代表値で判定します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約31G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定別CZ・AT確率、CZ約55%、ラストアタック約35%、デス・ガンバトル約50%は公開値", "SC相手別勝率、直乗せ、絶剣振り分け、アルティマ状態の詳細は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["大都技研 公式機種サイト", "https://www.daitogiken.com/contents/product/slot/sao2/"], ["大都技研 製品情報", "https://www.daitogiken.com/products/slot/"], ["なな徹 デス・ガンバトル解析", "https://nana-press.com/kaiseki/machine/1158/37267/"], ["ちょんぼりすた 解析まとめ", "https://chonborista.com/slot/daito-slot/256112/"]],
    readerGuide: {
      verdict: "初期150枚＋αのBoBでスナイパーチャンス最大3勝を重ね、約50%のデス・ガンバトルから純増約7.2枚/GのFULL DIVEを狙う台です。",
      bestFor: ["20G周期のスナイパーチャンスをPUSHで見たい", "ラストアタック5Gの引き戻しを体験したい", "デス・ガンバトルからFULL DIVEを狙いたい"],
      check: ["設定別CZ・AT確率と主要ゲーム数は公開値", "SC相手別勝率など非公表部分は代表値", "BoB予選・準決勝という旧簡易フローは廃止"],
      compare: [["ggo-slot", "スマスロ GGO", "同作品のST型ゲーム性と比較"], ["tokyo-ghoul-slot", "スマスロ 東京喰種", "差枚数ATの対戦型フローと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v9",
    dedicatedFlow: true,
    dedicatedFlowKey: "sao2-slot",
    dedicatedFlowVersion: 2,
    sao2Flow: true,
    atPureIncrease: 3.6,
    atPayoutVariance: 0,
    sao2InitialCoins: [[150, 0.72], [200, 0.20], [300, 0.08]],
    sao2SniperOpponents: [[{ key: "dyne", label: "ダイン", chance: 0.72 }, 0.28], [{ key: "pale-rider", label: "ペイルライダー", chance: 0.62 }, 0.24], [{ key: "yamikaze", label: "闇風", chance: 0.55 }, 0.22], [{ key: "musketeer-x", label: "銃士X", chance: 0.45 }, 0.18], [{ key: "death-gun", label: "デス・ガン", chance: 0.35, upperRight: true }, 0.08]],
    sao2SniperMaxWins: 3,
    sao2SniperInterval: 20,
    sao2LastAttackGames: 5,
    sao2LastAttackChance: 0.35,
    sao2DeathGunGames: 5,
    sao2DeathGunChance: 0.50,
    sao2UpperAwards: [[300, 0.50], [500, 0.30], [1000, 0.15], [1500, 0.05]],
    sao2ZekkenChance: 0.08,
    sao2ZekkenAwards: [[2200, 0.70], [3300, 0.22], [4400, 0.08]],
    sao2UltimaChance: 0.20,
    sao2UltimaDeathGunChance: 0.72,
    upperChallenge: "デス・ガンバトル",
    upperChance: 0,
    upperSuccess: 0.50,
    upperLabel: "FULL DIVE",
    upperContinue: 0.50,
    upperPayout: 0,
    upperPureIncrease: 7.2,
    settingRates: { 1: { trigger: 238.4, main: 386.2, payout: 0.976 }, 2: { trigger: 232.3, main: 364.3, payout: 0.988 }, 3: { trigger: 232.7, main: 368.1, payout: 1.002 }, 4: { trigger: 218.9, main: 326.8, payout: 1.053 }, 5: { trigger: 225.2, main: 340.6, payout: 1.104 }, 6: { trigger: 191.7, main: 269.6, payout: 1.149 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applySymphogearSeigiDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["symphogear-seigi-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "AXZバトルからギアVアタックを重ね、絶唱とAXZラッシュ黄金へ。",
    intro: "約65%のAXZバトルから純増約2.8枚/GのAXZラッシュへ。初期ゲーム数決定、規定獲得枚数ごとのギアVチャンス、キャラ別ギアVアタック、絶唱、純増約5.0枚/GのAXZラッシュ黄金、絶唱バトルまでを実機順に体験できます。",
    points: ["AXZバトル成功期待度約65%", "AXZラッシュは初期40G以上・純増約2.8枚/G", "絶唱バトル約60%・上位純増約5.0枚/G"],
    specs: [["AT（設定1）", "約1/295.2"], ["AT（設定6）", "約1/199.4"], ["AXZバトル", "成功期待度約65%"], ["最終決戦", "AT＋ギアVチャンス濃厚"], ["AXZラッシュ", "初期40G以上"], ["通常AT純増", "約2.8枚/G"], ["ギアVアタック", "平均約30G"], ["絶唱", "5G＋α・平均約100G"], ["AXZラッシュ 黄金", "純増約5.0枚/G"], ["絶唱バトル", "勝利期待度約60%"], ["黄金絶唱", "平均約360G"], ["ベース", "約31.7G/50枚"], ["設定", "1・2・4・5・6"]],
    articleSections: [
      { heading: "AXZバトルと最終決戦", paragraphs: ["通常時はAXZバトルや最終決戦からATを目指します。AXZバトルの成功期待度は約65%。最終決戦は5戦のバトルでVストックを狙い、ATとギアVチャンスが濃厚となる上位CZです。", "設定別AT初当りは公開値を使用し、CZ発生率はAT初当りと約65%の突破率から逆算した比較用の簡易値です。通常時のモード・天井・小役別抽選は初当りへまとめています。"] },
      { heading: "AXZラッシュとギアVチャンス", paragraphs: ["AXZラッシュは純増約2.8枚/Gのゲーム数管理ATです。開始時の『わたしは歌でぶん殴るッ！』で40G以上の初期ゲーム数を決めます。", "獲得50枚・100枚、その後は100枚ごとの節目でギアVチャンスを抽選。響、翼、クリス、マリア、調＆切歌の装者を獲得すると、キャラごとのギアVアタックでゲーム数を上乗せします。5人獲得時はEXルートへ進みます。"] },
      { heading: "絶唱とAXZラッシュ黄金", paragraphs: ["絶唱は5G＋α、毎ゲーム10G以上を上乗せし、平均約100Gを獲得してAXZラッシュ黄金へ進みます。通常ATの1000・1500・2000・2500枚到達時にも上位移行を抽選し、2500枚到達時は上位濃厚です。", "AXZラッシュ黄金は純増約5.0枚/G。AXZ目停止からゲーム数上乗せまたはシンフォギアBONUSを抽選します。終了後は勝利期待度約60%の絶唱バトルへ進み、勝利すると絶唱を経由して上位ATへ復帰します。"] },
      { heading: "黄金絶唱と簡略化する範囲", paragraphs: ["上位ループ中の一部は黄金絶唱へ進み、平均約360Gの上乗せを獲得します。サイトでは通常の絶唱と分け、PUSHで結果を開きます。", "ギアVチャンスの装者別獲得率、通常AT中の契機出現率、1000・1500・2000枚到達時の上位移行率など非公表部分は、公開されているゲーム性と平均値を崩さない体験用代表値です。"] },
      { heading: "固定条件と収支", bullets: ["約31.7G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1・2・4・5・6から均等抽選し、設定3は選択しない", "上乗せゲーム数と獲得枚数を別表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/962/"], ["SANKYO 公式製品資料", "https://www.sankyo-fever.jp/products/assets/pdf/sqe/sqe_mp.pdf"], ["なな徹 AXZラッシュ解析", "https://nana-press.com/kaiseki/machine/760/22591/"], ["なな徹 ギアVアタック解析", "https://nana-press.com/kaiseki/machine/760/22594/"], ["なな徹 AXZラッシュ黄金解析", "https://nana-press.com/kaiseki/machine/760/22596/"], ["なな徹 絶唱・黄金絶唱解析", "https://nana-press.com/kaiseki/machine/760/22595/"]],
    readerGuide: {
      verdict: "初期40G以上のAXZラッシュで規定獲得枚数ごとのギアVチャンスを重ね、絶唱から純増約5.0枚/Gの黄金ATループを目指す台です。",
      bestFor: ["残りゲーム数を減らしながら装者獲得を狙いたい", "5種類のギアVアタックをPUSHで見たい", "絶唱バトルから上位AT復帰を狙いたい"],
      check: ["AT初当り・純増・主要ゲーム数と平均値は公開値", "装者別獲得率など非公表部分は代表値", "旧6区間の汎用STフローは廃止"],
      compare: [["sao2-slot", "スマスロ SAO II", "差枚ATの対戦・上位ルートと比較"], ["valvrave", "革命機ヴァルヴレイヴ", "セット型上位ATと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v9",
    dedicatedFlow: true,
    dedicatedFlowKey: "symphogear-seigi-slot",
    dedicatedFlowVersion: 2,
    symphogearSeigiFlow: true,
    triggerLabel: "AXZバトル",
    triggerRate: 191.9,
    triggerSuccess: 0.65,
    mainLabel: "AXZラッシュ",
    mainRate: 295.2,
    base50: 31.7,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 2.8,
    atPayoutVariance: 0,
    symphogearInitialRoutes: [[{ key: "normal", label: "響・通常開始", games: 40 }, 0.90], [{ key: "bell", label: "ベル成立", games: 50 }, 0.065], [{ key: "rare", label: "レア役成立", games: 100 }, 0.03], [{ key: "zessho", label: "ギアフラグ・絶唱", games: 0, upper: true }, 0.005]],
    symphogearGearCharacters: [[{ key: "hibiki", label: "響", chance: 0.58, rewards: [[20, 0.30], [30, 0.30], [40, 0.20], [50, 0.14], [100, 0.06]] }, 0.24], [{ key: "tsubasa", label: "翼", chance: 0.54, rewards: [[10, 0.42], [20, 0.30], [30, 0.17], [50, 0.08], [100, 0.03]] }, 0.21], [{ key: "chris", label: "クリス", chance: 0.56, rewards: [[20, 0.38], [30, 0.31], [50, 0.20], [100, 0.11]] }, 0.20], [{ key: "maria", label: "マリア", chance: 0.52, rewards: [[10, 0.36], [20, 0.29], [30, 0.20], [50, 0.11], [100, 0.04]] }, 0.19], [{ key: "shirabe-kirika", label: "調＆切歌", chance: 0.50, rewards: [[5, 0.70], [10, 0.18], [100, 0.10], [200, 0.02]] }, 0.16]],
    symphogearGearVIntervalCoins: [50, 100],
    symphogearGearVMaxChances: 8,
    symphogearExRewards: [[50, 0.46], [100, 0.34], [200, 0.15], [300, 0.05]],
    symphogearUpperThresholds: [{ coins: 1000, chance: 0.12 }, { coins: 1500, chance: 0.22 }, { coins: 2000, chance: 0.42 }, { coins: 2500, chance: 1 }],
    symphogearZesshoRewards: [[50, 0.18], [70, 0.22], [100, 0.35], [150, 0.17], [200, 0.08]],
    symphogearUpperAdditions: [[10, 0.79], [20, 0.07], [30, 0.07], [50, 0.05], [100, 0.02]],
    symphogearUpperBonusChance: 0.18,
    symphogearUpperBonusGames: [[20, 0.70], [30, 0.24], [50, 0.06]],
    symphogearGoldenZesshoChance: 0.04,
    symphogearGoldenZesshoRewards: [[200, 0.20], [300, 0.34], [360, 0.26], [500, 0.15], [700, 0.05]],
    specialLabel: "ギアVアタック",
    specialChance: 0.55,
    upperChallenge: "絶唱バトル",
    upperChance: 0,
    upperSuccess: 0.60,
    upperLabel: "AXZラッシュ 黄金",
    upperContinue: 0.60,
    upperPayout: 0,
    upperPureIncrease: 5.0,
    settingPool: [1, 2, 4, 5, 6],
    settingRates: { 1: { main: 295.2, payout: 0.982 }, 2: { main: 285.9, payout: 0.994 }, 4: { main: 250.1, payout: 1.044 }, 5: { main: 227.1, payout: 1.083 }, 6: { main: 199.4, payout: 1.149 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyLycorisRecoilDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["lycoris-recoil-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "20Gの初回RUSHを突破し、50G＋ST10Gから1000ptと上位を目指す。",
    intro: "約100枚のプロローグ後、ボーナス期待度約60%のリコリスラッシュ20へ。突破後は前半50G＋後半ST10G、4種類のボーナス、1000pt到達、10G・約70%の上位CZ、リコリスラッシュWまでを実機順に体験できます。",
    points: ["リコリスラッシュ20は20G＋α・BONUS期待度約60%", "リコリスラッシュ50は前半50G＋α・後半ST10G", "リコイル オブ リコリスは10G・成功期待度約70%"],
    specs: [["CZ（設定1）", "約1/198.7"], ["AT（設定1）", "約1/328.8"], ["AT（設定6）", "約1/256.7"], ["プロローグ", "約100枚"], ["リコリスラッシュ20", "20G＋α・BONUS期待度約60%"], ["リコリスラッシュ50", "前半50G＋α・後半ST10G"], ["BONUS確率", "前半約1/18・ST約1/12"], ["BONUS純増", "約8.4枚/G"], ["リコリスBONUS", "100枚"], ["リコリスBONUS W", "200枚以上"], ["エピソードBONUS", "約300枚"], ["りこりすぷらっしゅ", "平均約385枚"], ["上位CZ", "10G・成功期待度約70%"], ["リコリスラッシュW", "前半50G＋α・後半ST10G"], ["レジェンダリーリコリス", "7G＋α・平均上乗せ約1000枚"], ["ベース", "約31.8G/50枚"], ["設定", "1〜6"]],
    articleSections: [
      { heading: "通常時と2種類のCZ", paragraphs: ["通常時は規定ゲーム数、スタンプカード、小役変換からCZを目指します。CZはオポジットバトルと、AT期待度約83%のファーストリコリスです。", "設定別CZ・AT初当りは公開値を使用し、通常時の全モード・小役変換・天井は初当り確率へまとめます。"] },
      { heading: "プロローグとリコリスラッシュ20", paragraphs: ["AT初当り後は約100枚のプロローグを消化し、千束ラッシュまたはたきなラッシュへ。千束はチェリー、たきなはスイカの才能レベル2が常時点灯します。", "初回は20G＋αで、BONUS期待度は約60%、BONUS確率は約1/18。BONUS当選でリコリスラッシュ50へ昇格します。"] },
      { heading: "リコリスラッシュ50と4種類のBONUS", paragraphs: ["前半は50G＋α・BONUS約1/18。後半は10GのSTでBONUS約1/12、当選するたびに10Gを再セットします。ゲーム数上乗せ型ではなく、残りGを減らしながらBONUSを重ねるゲーム性です。", "BONUSは100枚、200枚以上、約300枚、平均約385枚の4種類。PUSHまで種類を伏せ、払い出し枚数と獲得ポイントを別々に表示します。"] },
      { heading: "1000pt・上位CZ・リコリスラッシュW", paragraphs: ["BONUS中に100pt到達ごとの報酬を狙い、1000ptで上位CZの権利を獲得。リコイル オブ リコリスは10G・成功期待度約70%で、最後のPUSHで上位当落を開きます。", "上位ATは前半50G＋α・後半ST10G。チェリーとスイカが常時才能レベル2、BONUSはW揃い以上となり、1000pt到達時は上位CZを経由せず再セットします。"] },
      { heading: "レジェンダリーリコリスと簡略化する範囲", paragraphs: ["上位AT突入時の一部やロングフリーズでは、7G＋α・平均上乗せ約1000枚のレジェンダリーリコリスへ進みます。獲得枚数をPUSHで開き、上位ATへ加算します。", "BONUS種類の詳細振り分け、ポイント獲得量、才能レベルの変化、レジェンダリー突入率など非公表部分は、公開された平均値とゲーム性を崩さない体験用代表値です。"] },
      { heading: "固定条件と収支", bullets: ["約31.8G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6から均等抽選", "RUSH残りG・BONUS枚数・ポイントを別表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["なな徹 解析情報", "https://nana-press.com/kaiseki/machine/1166/"], ["一撃 リコリスラッシュ解析", "https://1geki.jp/slot/l_lycoreco/"], ["パチマガスロマガ 上位CZ・上位AT解析", "https://pachimaga.com/free/mach/maker-s/sammy/l_lycoreco.php"]],
    readerGuide: {
      verdict: "20Gの初回RUSHでBONUSを引いて50G＋ST10Gへ昇格し、BONUS中の1000ptから約70%の上位CZを目指す高純増BONUS連打型です。",
      bestFor: ["20Gから50G＋STへ育てる流れをPUSHで見たい", "4種類のBONUSとポイント獲得を比べたい", "1000ptから上位CZ・上位ATを狙いたい"],
      check: ["RUSHゲーム数・BONUS確率・主要出玉は公開値", "BONUS種類比率・ポイント量は代表値", "旧6区間の汎用STフローは廃止"],
      compare: [["sao2-slot", "スマスロ SAO II", "差枚ATの対戦型ゲーム性と比較"], ["kabaneri", "スマスロ カバネリ", "10G再セット型STと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v9",
    dedicatedFlow: true,
    dedicatedFlowKey: "lycoris-recoil-slot",
    dedicatedFlowVersion: 2,
    lycorisFlow: true,
    triggerLabel: "CZ（オポジットバトル／ファーストリコリス）",
    triggerRate: 198.7,
    triggerSuccess: 0.60,
    mainLabel: "リコリスラッシュ",
    mainRate: 328.8,
    base50: 31.8,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 8.4,
    atPayoutVariance: 0,
    lycorisCzRoutes: [[{ key: "opposite", label: "オポジットバトル", games: 10, chance: 0.53 }, 0.90], [{ key: "first", label: "ファーストリコリス", games: 10, chance: 0.83 }, 0.08], [{ key: "direct", label: "AT直撃", games: 1, chance: 1 }, 0.02]],
    lycorisRushRoutes: [[{ key: "chisato", label: "千束ラッシュ", talent: "チェリー才能Lv2" }, 0.50], [{ key: "takina", label: "たきなラッシュ", talent: "スイカ才能Lv2" }, 0.50]],
    lycorisRush20Chance: 0.60,
    lycorisFrontBonusRate: 18,
    lycorisStBonusRate: 12,
    lycorisBonusTypes: [[{ key: "single", label: "リコリスBONUS", payout: 100, points: [[100, 0.55], [200, 0.30], [300, 0.15]] }, 0.56], [{ key: "double", label: "リコリスBONUS W", payout: [[200, 0.62], [250, 0.22], [300, 0.12], [500, 0.04]], points: [[200, 0.50], [300, 0.34], [500, 0.16]] }, 0.28], [{ key: "episode", label: "エピソードBONUS", payout: 300, points: [[300, 0.55], [500, 0.32], [700, 0.13]] }, 0.10], [{ key: "splash", label: "りこりすぷらっしゅ", payout: [[300, 0.28], [350, 0.25], [385, 0.24], [450, 0.15], [500, 0.08]], points: [[300, 0.44], [500, 0.36], [700, 0.20]] }, 0.06]],
    lycorisUpperBonusTypes: [[{ key: "double", label: "リコリスBONUS W", payout: [[200, 0.52], [250, 0.24], [300, 0.17], [500, 0.07]], points: [[200, 0.45], [300, 0.34], [500, 0.21]] }, 0.66], [{ key: "episode", label: "エピソードBONUS", payout: 300, points: [[300, 0.48], [500, 0.34], [700, 0.18]] }, 0.22], [{ key: "splash", label: "りこりすぷらっしゅ", payout: [[300, 0.24], [350, 0.24], [385, 0.24], [450, 0.18], [500, 0.10]], points: [[300, 0.38], [500, 0.38], [700, 0.24]] }, 0.12]],
    lycorisUpperCzGames: 10,
    lycorisUpperCzChance: 0.70,
    lycorisLegendaryChance: 0.08,
    lycorisLegendaryAwards: [[700, 0.18], [800, 0.20], [1000, 0.32], [1200, 0.18], [1500, 0.09], [2000, 0.03]],
    lycorisUpperMaxSections: 3,
    specialLabel: "リコリスBONUS W／りこりすぷらっしゅ",
    specialChance: 0.34,
    upperChallenge: "リコイル オブ リコリス",
    upperChance: 0,
    upperSuccess: 0.70,
    upperLabel: "リコリスラッシュW",
    upperContinue: 0.70,
    upperPayout: 0,
    upperPureIncrease: 8.4,
    settingRates: { 1: { trigger: 198.7, main: 328.8, payout: 0.979 }, 2: { trigger: 196.9, main: 323.4, payout: 0.989 }, 3: { trigger: 191.3, main: 312.1, payout: 1.013 }, 4: { trigger: 183.3, main: 288.3, payout: 1.061 }, 5: { trigger: 175.9, main: 271.6, payout: 1.104 }, 6: { trigger: 169.4, main: 256.7, payout: 1.146 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyKanokariDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["kanokari-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "CZから疑似BONUSへ。2Gの1GレンCHANCEと66G引き戻しでガチ恋ループをつなぐ。",
    intro: "15G＋α・約56%のレンカノCHALLENGE、10G・約75%の妄想DTチャレンジから純増約5.0枚/Gの疑似BONUSへ。BONUS中のストック、2Gの1GレンCHANCE、4回ごとのエピソード、66G引き戻し、ななかりDREAMとS級出玉トリガーまでを実機順に体験できます。",
    points: ["レンカノCHALLENGEは15G＋α・成功期待度約56%", "1GレンCHANCEは1セット2G・成功期待度約40%", "BONUS後66Gは通常約25%・ユメカノモード約58%で引き戻し"],
    specs: [["CZ（設定1）", "約1/172"], ["BONUS初当り（設定1）", "約1/269"], ["BONUS初当り（設定6）", "約1/226"], ["レンカノCHALLENGE", "15G＋α・約56%"], ["妄想DTチャレンジ", "10G・約75%"], ["REGULAR BONUS", "ベルナビ10回・約70枚"], ["かのかりBONUS", "30G・約150枚"], ["BONUS純増", "約5.0枚/G"], ["1GレンCHANCE", "2G・約40%"], ["1G恋", "BONUS濃厚"], ["ななかりDREAM", "平均約80G・期待約550枚"], ["引き戻しゾーン", "66G・約25%"], ["ユメカノモード", "66G・約58%"], ["DREAM TIME", "15G・平均約2.5ストック"], ["S級ななかりDREAM", "平均約280G"], ["S級DREAM TIME", "平均約6ストック"], ["ベース", "約31.0G/50枚"], ["設定", "1〜6"]],
    articleSections: [
      { heading: "通常時と2種類のCZ", paragraphs: ["通常時は100G・300Gなど百の位が奇数のゾーン、レア役、小役変換からCZまたはBONUSを目指します。ハートメーターMAX時は小役変換高確へ移行し、チャンス目を強チャンス目・ガチ恋目へ変換する可能性があります。", "レンカノCHALLENGEは15G＋α・約56%で、小役成立時にオーラ色を上げて最終PUSHへ。妄想DTチャレンジは10G・約75%で、小役ごとにBONUSを一発抽選します。"] },
      { heading: "REG・かのかりBONUS・ななかりDREAM", paragraphs: ["REGはベルナビ10回・約70枚、かのかりBONUSは30G・約150枚。どちらも純増約5.0枚/Gで、消化中は1GレンCHANCEまたは成功濃厚の1G恋ストックを抽選します。初当りBIGはレンCHANCEを1個持って開始します。", "金7揃いのななかりDREAMは平均約80Gのゲーム数上乗せ後にかのかりBONUSへ進む2部構成。平均期待枚数約550枚として、上乗せゲーム数とBONUS出玉を別イベントで表示します。"] },
      { heading: "1GレンCHANCEとエピソードBONUS", paragraphs: ["1GレンCHANCEは1セット2G・成功期待度約40%。1G目は小役でチャンス、2G目は小役成立でBONUS濃厚です。1G恋ストックは成功濃厚として同じ2Gを進め、レア役成功時はななかりDREAMも抽選します。", "成功4回目はヒロインエピソード、8回目はスペシャルエピソードが濃厚。通常へ戻らずに5回連続で失敗した場合は、6回目の1GレンCHANCEを成功濃厚として扱います。"] },
      { heading: "66G引き戻しとユメカノモード", paragraphs: ["ストック消化後はBONUS終了から66G以内の引き戻し区間へ。通常は約25%、ユメカノモードは約58%でかのかりBONUS以上への復帰を判定します。", "スペシャルエピソードやDREAM TIME後はユメカノモードへ進み、引き戻し成功時はななかりDREAM・S級出玉トリガーにも期待できる専用イベントとして表示します。"] },
      { heading: "DREAM TIMEとS級出玉トリガー", paragraphs: ["エンディング後のDREAM TIMEは15G・平均約2.5ストックで、突入時に1G恋を1個獲得。獲得ストックを使った後はユメカノモードへ進みます。", "S級ななかりDREAMは平均約280G、S級DREAM TIMEは平均約6ストック。公開されていない突入率、BONUS振り分け、追加ストック率は、公開平均から大きく外れない体験用代表値です。"] },
      { heading: "固定条件と収支", bullets: ["約31.0G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6から均等抽選", "BONUS枚数・ストック・1G連成功回数を別表示", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/products/machine_list/szf/?r=portal"], ["SANKYO 開発こぼれ話", "https://www.secret-story.sankyo-fever.jp/product/szf"], ["一撃 かのかり解析", "https://1geki.jp/slot/l_kanokari/"], ["一撃 1GレンCHANCE解析", "https://1geki.jp/slot/l_kanokari/81/"]],
    readerGuide: {
      verdict: "疑似BONUS中にストックを集め、2G・約40%の1GレンCHANCEと66G引き戻しでBONUSをつなぐガチ恋ループ型です。",
      bestFor: ["BONUS後の2GジャッジをPUSHで繰り返したい", "通常ストックと成功濃厚の1G恋を比べたい", "4回目エピソードからユメカノ・S級を目指したい"],
      check: ["CZ・BONUS・1G連・引き戻しの主要値は公開値", "ストック数やBONUS種別比率は代表値", "旧5区間の汎用STフローは廃止"],
      compare: [["kaguya-sama-slot", "スマスロ かぐや様", "疑似BONUS連と引き戻しを比較"], ["lycoris-recoil-slot", "スマスロ リコリコ", "BONUS連打型RUSHと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v9",
    dedicatedFlow: true,
    dedicatedFlowKey: "kanokari-slot",
    dedicatedFlowVersion: 2,
    kanokariFlow: true,
    triggerLabel: "CZ（レンカノCHALLENGE／妄想DTチャレンジ）",
    triggerRate: 172,
    triggerSuccess: 0.56,
    mainLabel: "かのかりBONUS",
    mainRate: 269,
    base50: 31.0,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 5.0,
    atPayoutVariance: 0,
    kanokariCzRoutes: [[{ key: "rental", label: "レンカノCHALLENGE", games: 15, chance: 0.56 }, 0.84], [{ key: "delusion", label: "妄想DTチャレンジ", games: 10, chance: 0.75 }, 0.13], [{ key: "direct", label: "BONUS直撃", games: 1, chance: 1 }, 0.03]],
    kanokariInitialBonuses: [[{ key: "reg", label: "REGULAR BONUS", games: 14, payout: 70 }, 0.36], [{ key: "big", label: "かのかりBONUS", games: 30, payout: 150 }, 0.59], [{ key: "dream", label: "ななかりDREAM", games: 80, payout: 400, bonusPayout: 150 }, 0.05]],
    kanokariRentChance: 0.40,
    kanokariReturnChance: 0.25,
    kanokariYumekanoChance: 0.58,
    kanokariDreamChance: 0.08,
    kanokariAllLoveChance: 0.07,
    kanokariDreamTimeThreshold: 1800,
    kanokariDreamTimeStocks: [[2, 0.40], [3, 0.38], [4, 0.17], [5, 0.05]],
    kanokariSDreamTimeStocks: [[4, 0.20], [5, 0.25], [6, 0.28], [7, 0.17], [8, 0.10]],
    kanokariSDreamTimeChance: 0.03,
    kanokariSDreamChance: 0.04,
    specialLabel: "ななかりDREAM／ALL1G恋変換",
    specialChance: 0.18,
    upperChallenge: "S級出玉トリガー",
    upperChance: 0,
    upperSuccess: 0.03,
    upperLabel: "S級DREAM TIME",
    upperContinue: 0.92,
    upperPayout: 0,
    upperPureIncrease: 5.0,
    settingRates: { 1: { trigger: 172, main: 269, payout: 0.977 }, 2: { trigger: 169, main: 263, payout: 0.987 }, 3: { trigger: 164, main: 254, payout: 1.010 }, 4: { trigger: 154, main: 235, payout: 1.055 }, 5: { trigger: 151, main: 231, payout: 1.104 }, 6: { trigger: 149, main: 226, payout: 1.149 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyAobutaDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["aobuta-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "4セット＋αの完走型STでVを集め、夢現JUDGEMENTから約80%の上位STへ。",
    intro: "青春BONUS後は必ず青ブタJUDGEへ。1セット2G×4ヒロインの完走型STで複数Vを獲得し、ヒロイン別の青春DREAM BURSTでボーナス枚数を決定します。翔子成功時の夢現JUDGEMENTと上位STまでを実機順に体験できます。",
    points: ["青春BONUS後は青ブタJUDGEへ必ず突入", "青ブタJUDGEは1セット2G・4セット＋αの完走型ST", "夢現JUDGEMENTは10G＋6G以上・成功期待度約53%"],
    specs: [["設定", "2・3・4・5・6"], ["初当り（設定2）", "約1/350.8"], ["初当り（設定6）", "約1/207.8"], ["青春BONUS", "ベルナビ5回（稀に25回）"], ["青ブタJUDGE", "4セット＋α・8G＋α"], ["通常ST継続", "設定2で約60%"], ["夢現JUDGEMENT", "10G＋6G＋α・約53%"], ["上位ST継続", "設定2で約80%"], ["上位BONUS平均", "約640枚（払出）"], ["ボーナス純増", "約8.0枚/G"], ["ベース", "約31.5G/50枚"]],
    articleSections: [
      { heading: "通常時から青春BONUSまで", paragraphs: ["通常時は思春期ポイント、規定ゲーム数、アオハルチャンスなどからCZまたはボーナスを目指します。エピソードチャンスは前後半の2部構成で成功期待度60%超です。", "本シミュレーターでは公開されている設定別BONUS初当りを使い、通常時の複数ルートを初当り確率へまとめます。"] },
      { heading: "青春BONUSとST強化", paragraphs: ["青春BONUSはベルナビ5回で、稀に25回。リプレイ・レア役・特殊ナビでヒロインメーターを加算し、20pt到達で青ブタJUDGEを1セット（2G）追加します。", "BONUS消化後は必ず青ブタJUDGEへ。初当りBONUSの獲得枚数とSTのVストック・DREAM BURST出玉は別イベントで表示します。"] },
      { heading: "青ブタJUDGEは完走型ST", paragraphs: ["青ブタJUDGEは1セット2G、最低4セット＋α。ボーナス当選後も残りセットを消化するため、1回のSTで複数Vを獲得できます。通常STの継続期待度は設定2で約60%です。", "V獲得時は対応ヒロインの青春DREAM BURSTへ。朋絵・のどか・双葉・かえでなどで上乗せ方法と平均枚数が異なり、PUSHまでヒロインと枚数を伏せます。"] },
      { heading: "夢現JUDGEMENTと上位ST", paragraphs: ["翔子の青ブタJUDGE成功時などは上位CZの夢現JUDGEMENTへ。前半10G＋後半6G＋αで、成功期待度は設定2で約53%です。", "成功時は300枚のエピソードBONUSを経て、上位ST『青春ブタ野郎は∞の夢を見る』へ。設定2で継続約80%、ボーナス平均約640枚の流れを専用演出で表示します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約31.5G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定2・3・4・5・6から均等抽選", "ヒロイン別平均枚数は公開値を優先", "V当選率・翔子選択率など未公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["一撃 機種解析", "https://1geki.jp/slot/l_ao_buta/"], ["一撃 青春BONUS解析", "https://1geki.jp/slot/l_ao_buta/61/"], ["一撃 青春DREAM BURST解析", "https://1geki.jp/slot/l_ao_buta/83/"], ["一撃 夢現JUDGEMENT解析", "https://1geki.jp/slot/l_ao_buta/87/"]],
    readerGuide: {
      verdict: "初当りBONUS後の完走型STで複数Vを集め、ヒロイン別の枚数決定と約53%の上位CZをPUSHで楽しむ高純増BONUSループ型です。",
      bestFor: ["4セット＋αを最後まで消化して複数Vを狙いたい", "ヒロイン別DREAM BURSTの枚数をPUSHで開きたい", "夢現JUDGEMENTから約80%の上位STを目指したい"],
      check: ["初当り・STゲーム数・上位CZ・上位STは公開値", "ヒロイン別の主要平均枚数は公開値", "V当選率など非公表部分は代表値"],
      compare: [["lycoris-recoil-slot", "スマスロ リコリコ", "高純増BONUS連打型と比較"], ["shin-eva-slot", "スマスロ シン・エヴァ", "ST型BONUSループと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v10",
    dedicatedFlow: true,
    dedicatedFlowKey: "aobuta-slot",
    dedicatedFlowVersion: 2,
    aobutaFlow: true,
    triggerLabel: "青春BONUS初当り",
    triggerRate: 350.8,
    triggerSuccess: 1,
    mainLabel: "青ブタJUDGE",
    mainRate: 350.8,
    base50: 31.5,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 8.0,
    atPayoutVariance: 0,
    aobutaInitialBonus: { label: "青春BONUS", games: 5, payout: 75 },
    aobutaStHeroes: [
      { key: "tomoe", label: "古賀朋絵", awards: [[111, 0.42], [222, 0.42], [333, 0.10], [555, 0.05], [1111, 0.01]] },
      { key: "nodoka", label: "豊浜のどか", awards: [[100, 0.85], [200, 0.11], [500, 0.03], [1000, 0.01]] },
      { key: "futaba", label: "双葉理央", awards: [[100, 0.67], [200, 0.16], [500, 0.12], [1000, 0.04], [1500, 0.01]] },
      { key: "kaede", label: "梓川かえで", awards: [[200, 0.42], [300, 0.25], [400, 0.15], [800, 0.10], [1200, 0.05], [2000, 0.01]] }
    ],
    aobutaHeroVChance: 0.205,
    aobutaExtraSetChance: 0.18,
    aobutaShokoChance: 0.12,
    aobutaUpperCzGames: 16,
    aobutaUpperCzChance: 0.53,
    aobutaUpperEpisodePayout: 300,
    aobutaUpperContinue: 0.80,
    aobutaUpperAwards: [[500, 0.28], [600, 0.30], [640, 0.20], [700, 0.14], [800, 0.08]],
    aobutaMaxNormalLoops: 10,
    aobutaMaxUpperLoops: 8,
    specialLabel: "青春DREAM BURST",
    specialChance: 0.60,
    upperChallenge: "夢現JUDGEMENT",
    upperChance: 0.12,
    upperSuccess: 0.53,
    upperLabel: "青春ブタ野郎は∞の夢を見る",
    upperContinue: 0.80,
    upperPayout: 640,
    upperPureIncrease: 8.0,
    settingPool: [2, 3, 4, 5, 6],
    settingRates: { 2: { trigger: 350.8, main: 350.8, payout: 0.981 }, 3: { trigger: 336.5, main: 336.5, payout: 0.993 }, 4: { trigger: 295.1, main: 295.1, payout: 1.053 }, 5: { trigger: 274.6, main: 274.6, payout: 1.084 }, 6: { trigger: 207.8, main: 207.8, payout: 1.103 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

+(function applyBofuriDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["bofuri-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "高確率ZONEを突破し、ボーナスと防御状態を約77〜94%でループ。",
    intro: "高確率ZONEからBIG・REG・エピソードBONUSを目指し、ボーナス後は必ず防御状態へ。防御状態Lv.0〜4、天使ZONE、暴虐ZONEまでを実機の順番に沿って体験できます。",
    points: ["運営高確率はボーナス期待度約50%", "防御状態は初回CZ期待度88%以上・以後約77〜94%ループ", "天使ZONEは30G、暴虐ZONEは50G・期待枚数約3500枚"],
    specs: [["ボーナス初当り（設定1）", "約1/319.0"], ["ボーナス初当り（設定6）", "約1/229.7"], ["高確率ZONE", "ボーナス期待度約50%"], ["REG BONUS", "約100枚"], ["BIG BONUS", "約150枚／約250枚"], ["防御状態", "最大80G・CZ約1/11.9"], ["初回CZ期待度", "88%以上"], ["防御状態ループ", "約77〜94%"], ["天使ZONE", "30G・ボーナス期待度約70%"], ["暴虐ZONE", "50G・期待枚数約3500枚"], ["純増", "約5.5枚/G"], ["ベース", "約33G/50枚"]],
    articleSections: [
      { heading: "通常時と3種類の高確率ZONE", paragraphs: ["通常時はレア役・ヒドラ目・規定ゲーム数から高確率ZONEを目指します。運営高確率のボーナス期待度は約50%。機械神高確率と極・高確率は成功でエピソードBONUS濃厚です。", "シミュレーターでは初当り確率を設定別に抽選し、CZ種類と最終PUSHを機種専用画面で表示します。"] },
      { heading: "3種類のBONUS", paragraphs: ["REGは約100枚、BIGはシングル揃い約150枚・ダブル揃い約250枚。エピソードBONUSは約250枚を獲得し、天使ZONEまたは暴虐ZONEへの分岐に期待できます。", "防御状態中のBIGはダブル揃い濃厚です。ボーナス中は防御力ポイントとスキルを抽選し、次の防御状態を強化します。"] },
      { heading: "防御状態Lv.0〜4", paragraphs: ["ボーナス後は必ず防御状態へ。初回のCZ期待度は88%以上、CZ出現率は約1/11.9です。レベルはLv.0〜4の5段階で、CZループは約77・79・83・86・94%です。", "最大80Gまでに転落しなければ無限CZへ。強ヒドラ目は無限の運営高確率または極・高確率濃厚です。"] },
      { heading: "天使ZONEと暴虐ZONE", paragraphs: ["天使ZONEは30G継続し、高確率ZONE出現約1/5.5、ボーナス期待度約70%。", "暴虐ZONEは50G継続し、暴虐高確率成功時は暴虐BONUSへ。突入時の期待枚数は約3500枚とされる本機最上位の出玉ルートです。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約33G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6を均等抽選", "防御状態のCZ出現率・ループ率・特化ZONEは公開値を優先", "CZ種類・防御Lv・エピソード分岐など非公開配分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/764/"], ["なな徹 防御状態解析", "https://nana-press.com/kaiseki/machine/764/21900/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10036"], ["サミー 公式機種情報", "https://www.sammy.co.jp/japanese/product/pachislot/bou_fu/"]],
    readerGuide: {
      verdict: "約50%のCZを突破し、ボーナスで防御力を高めながらLv.0〜4の防御状態をループさせるボーナス連鎖型です。",
      bestFor: ["CZの最後をPUSHで決めたい", "防御状態のレベルアップと連チャンを追いたい", "天使ZONE・暴虐ZONEの上位ルートを狙いたい"],
      check: ["設定別初当り・純増・防御状態は公開値", "BIG・REG・特化ZONEの代表獲得枚数を反映", "非公開のルート配分は体験用代表値"],
      compare: [["kanokari-slot", "スマスロ かのかり", "疑似BONUSループ型と比較"], ["shin-eva-slot", "スマスロ シン・エヴァ", "ST型BONUSループと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v11",
    dedicatedFlow: true,
    dedicatedFlowKey: "bofuri-slot",
    dedicatedFlowVersion: 2,
    bofuriFlow: true,
    triggerLabel: "高確率ZONE",
    triggerRate: 159.5,
    triggerSuccess: 0.50,
    mainLabel: "防振りBONUS",
    mainRate: 319.0,
    base50: 33,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 5.5,
    atPayoutVariance: 0,
    bofuriCzRoutes: [[{ key: "admin", label: "運営高確率", games: 15, chance: 0.50 }, 0.84], [{ key: "machine", label: "機械神高確率", games: 15, chance: 0.62 }, 0.10], [{ key: "extreme", label: "極・高確率", games: 15, chance: 0.55 }, 0.06]],
    bofuriBonuses: [[{ key: "reg", label: "REG BONUS", games: 18, payout: 100, defensePoints: 650 }, 0.35], [{ key: "big-single", label: "BIG BONUS・シングル", games: 28, payout: 150, defensePoints: 1200 }, 0.40], [{ key: "big-double", label: "BIG BONUS・ダブル", games: 46, payout: 250, defensePoints: 1900 }, 0.21], [{ key: "episode", label: "エピソードBONUS", games: 46, payout: 250, defensePoints: 2600 }, 0.04]],
    bofuriDefenseLevels: [{ level: 0, label: "Lv.0 ショートA", loop: 0.77, points: 0 }, { level: 1, label: "Lv.1 ショートB", loop: 0.79, points: 1000 }, { level: 2, label: "Lv.2 ミドル", loop: 0.83, points: 3000 }, { level: 3, label: "Lv.3 ロング", loop: 0.86, points: 6000 }, { level: 4, label: "Lv.4 極ロング", loop: 0.94, points: 10000 }],
    bofuriFirstDefenseChance: 0.88,
    bofuriCzAppearance: 11.9,
    bofuriAngelGames: 30,
    bofuriAngelChance: 0.70,
    bofuriViolenceGames: 50,
    bofuriViolenceExpected: 3500,
    bofuriMaxLoops: 20,
    specialLabel: "天使ZONE",
    specialChance: 0.04,
    upperChallenge: "暴虐高確率",
    upperChance: 0.012,
    upperSuccess: 0.87,
    upperLabel: "暴虐ZONE",
    upperContinue: 0,
    upperPayout: 3500,
    settingRates: { 1: { main: 319.0, payout: 0.979 }, 2: { main: 309.8, payout: 0.988 }, 3: { main: 307.3, payout: 1.005 }, 4: { main: 266.8, payout: 1.059 }, 5: { main: 257.1, payout: 1.095 }, 6: { main: 229.7, payout: 1.130 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyAzurLaneDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["azur-lane-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "海戦BONUSを突破し、海戦ATTACK・セイレーンバトルから4陣営集結へ。",
    intro: "ベルナビ10回＋告知10Gの海戦BONUSからATを目指し、海戦ATTACKで初期ゲーム数を決定。セイレーンバトル、集結BONUS、天城BATTLE、異次元性能SS RUSHまでを実機の順番に沿って体験できます。",
    points: ["海戦BONUSは平均約100枚・青7はAT期待度約62.4%", "海戦ATTACKは最低50G・平均約100G", "4陣営集結後の天城BATTLEは7G・成功期待度約54%"],
    specs: [["海戦BONUS（設定1）", "約1/167.4"], ["AT初当り（設定1）", "約1/598.9"], ["海戦BONUS", "ベルナビ10回＋告知10G・平均約100枚"], ["青7BONUS AT期待度", "約62.4%"], ["海戦ATTACK", "保障3G・最低50G・平均約100G"], ["通常AT純増", "約2.5枚/G"], ["セイレーンバトル", "5〜8G"], ["天城BATTLE", "7G・成功期待度約54%"], ["上位AT純増", "約5.1枚/G"], ["上位AT期待枚数", "3500枚以上"], ["ベース", "約25.8G/50枚"]],
    articleSections: [
      { heading: "海戦BONUSからATを目指す", paragraphs: ["海戦BONUSはベルナビ10回と10Gの告知パートで構成され、平均約100枚。白7が中心で、青7は規定回数込みのAT期待度約62.4%です。", "シミュレーターではBONUSを最後まで進め、最終PUSHでアズールレーンRUSH当落を表示します。"] },
      { heading: "海戦ATTACKで初期ゲーム数を決定", paragraphs: ["AT当選後は3G保障の海戦ATTACKへ。毎ゲーム10G以上を上乗せし、最低50G・平均約100Gを獲得します。", "ボーナス経由のループ率は0%・25%・60%・90%。PUSHまで合計初期ゲーム数を伏せて表示します。"] },
      { heading: "セイレーンバトルと陣営参戦", paragraphs: ["AT中のセイレーンバトルは5〜8G。参戦陣営が1つ増えるごとに1G追加され、ピュリファイアー・テスター・オブザーバーで勝利期待度が変わります。", "勝利時はゲーム数上乗せ、集結BONUS、覚醒エンタープライズなどを獲得。集結BONUSでは1回につき最大1陣営が参戦します。"] },
      { heading: "4陣営集結から上位ATへ", paragraphs: ["ユニオン・ロイヤル・重桜・鉄血の4陣営集結後は、AT終了時などに7Gの天城BATTLEへ。成功期待度約54%で上位ATを目指します。", "異次元性能SS RUSHは純増約5.1枚/G、常に4陣営参戦。終了後は再び天城BATTLEへ進む異次元ループを体験できます。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約25.8G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6を均等抽選", "BONUS・AT初当り、純増、CZゲーム数、主要期待度は公開値を優先", "陣営参戦率・報酬配分など未公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/993/"], ["なな徹 海戦BONUS解析", "https://nana-press.com/kaiseki/machine/993/31202/"], ["なな徹 海戦ATTACK解析", "https://nana-press.com/kaiseki/machine/993/31203/"], ["なな徹 セイレーンバトル解析", "https://nana-press.com/kaiseki/machine/993/31214/"], ["なな徹 上位AT解析", "https://nana-press.com/kaiseki/machine/993/31211/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10312"]],
    readerGuide: {
      verdict: "平均約100枚の海戦BONUSからATを狙い、ゲーム数上乗せとセイレーンバトルで4陣営を集めて上位ATを目指すゲーム数管理型です。",
      bestFor: ["BONUS最終PUSHでAT当落を決めたい", "セイレーンバトルの敵・報酬を開きたい", "4陣営集結から天城BATTLEと上位ATを狙いたい"],
      check: ["BONUS・AT初当り、純増、主要ゲーム数は公開値", "青7・天城BATTLEなどの期待度を反映", "未公表の報酬配分は体験用代表値"],
      compare: [["symphogear-seigi-slot", "スマスロ シンフォギア", "ゲーム数上乗せATと比較"], ["tokyo-ghoul-slot", "スマスロ 東京喰種", "バトル報酬型ATと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v12",
    dedicatedFlow: true,
    dedicatedFlowKey: "azur-lane-slot",
    dedicatedFlowVersion: 2,
    azurLaneFlow: true,
    triggerLabel: "海戦BONUS",
    triggerRate: 167.4,
    triggerSuccess: 1,
    mainLabel: "アズールレーンRUSH",
    mainRate: 598.9,
    base50: 25.8,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 2.5,
    atPayoutVariance: 0,
    azurBonusTypes: [[{ key: "white", label: "白7 海戦BONUS", games: 20, payout: 100, atChance: 0.263 }, 0.954], [{ key: "blue", label: "青7 海戦BONUS", games: 20, payout: 100, atChance: 0.624 }, 0.046]],
    azurAttackLoops: [[0, 0.668], [0.25, 0.316], [0.60, 0.012], [0.90, 0.004]],
    azurAttackGames: [[50, 0.31], [70, 0.24], [100, 0.25], [150, 0.14], [200, 0.05], [300, 0.01]],
    azurEnemies: [[{ key: "purifier", label: "ピュリファイアー", chance: 0.401 }, 0.50], [{ key: "tester", label: "テスター", chance: 0.524 }, 0.387], [{ key: "observer", label: "オブザーバー", chance: 0.813 }, 0.113]],
    azurAmagiGames: 7,
    azurAmagiChance: 0.54,
    azurUpperPureIncrease: 5.1,
    azurUpperExpected: 3500,
    azurMaxBattles: 10,
    specialLabel: "集結BONUS",
    specialChance: 0.34,
    upperChallenge: "天城BATTLE",
    upperChance: 0.28,
    upperSuccess: 0.54,
    upperLabel: "異次元性能SS RUSH",
    upperContinue: 0.54,
    upperPayout: 720,
    upperPureIncrease: 5.1,
    settingRates: { 1: { trigger: 167.4, main: 598.9, payout: 0.979 }, 2: { trigger: 166.5, main: 589.5, payout: 0.986 }, 3: { trigger: 164.3, main: 564.2, payout: 1.007 }, 4: { trigger: 161.3, main: 527.1, payout: 1.053 }, 5: { trigger: 158.9, main: 496.4, payout: 1.106 }, 6: { trigger: 156.0, main: 467.5, payout: 1.149 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyMagiaRecordDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["magia-record-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "4種類のBONUSからマギアラッシュへ。8つのストーリーを集めてエンブリオ・イブ覚醒を目指す。",
    intro: "BIG・みたま・エピソード・アリナミュージアムからATを目指し、10Gのマギアアタックで初期ゲーム数を決定。ストーリー、コネクトチャンス、キャラ別コネクト、全8話コンプリート後のエンブリオ・イブ覚醒までを専用画面で体験できます。",
    points: ["BIG BONUSは30G＋α・AT期待度40%", "マギアアタックは前半5G＋後半5Gで初期G数決定", "ストーリー全8種類コンプリートでエンブリオ・イブ覚醒濃厚"],
    specs: [["BONUS（設定1）", "約1/240.6"], ["AT（設定1）", "約1/654.6"], ["BIG BONUS", "30G＋α・AT期待度40%"], ["みたまBONUS", "ベルナビ8回＋ジャッジ1G"], ["エピソードBONUS", "50G・AT濃厚"], ["アリナミュージアム", "30G・毎ゲーム上乗せ"], ["マギアアタック", "前半5G＋後半5G"], ["マギアラッシュ純増", "約2.6枚/G"], ["ストーリー", "20G・全8種類"], ["コネクトチャンス", "3G"], ["覚醒準備", "32G"], ["イブアタック", "10G＋α"], ["ベース", "約32.6G/50枚"]],
    articleSections: [
      { heading: "4種類のBONUSからATを目指す", paragraphs: ["BIG BONUSは30G＋α・純増約2.6枚/Gで、消化中に高確ゲーム数とATを抽選。AT期待度は40%です。みたまBONUSはベルナビ8回＋最終ジャッジ1Gで報酬を決定します。", "エピソードBONUSは50GでAT濃厚、アリナミュージアムは30G間毎ゲームATゲーム数を上乗せします。シミュレーターでは最後のPUSHまでAT当落を伏せます。"] },
      { heading: "マギアアタックで初期ゲーム数を決定", paragraphs: ["AT開始時は10Gのマギアアタックへ。前半5Gのガチャパートでカードを集め、後半5Gはカードと成立役を参照して毎ゲーム上乗せします。", "カードのキャラ・属性・レアリティごとの全振り分けは簡略化し、合計初期ゲーム数をPUSHで開く専用演出にまとめています。"] },
      { heading: "ストーリーとコネクト", paragraphs: ["AT中はゲーム数消化やレア役から報酬を獲得。ストーリーは20Gでカウント＋1、スペシャルストーリーは30Gでカウント＋2です。全8種類のコンプリートが上位ATへの主要ルートです。", "ストーリー後は3Gのコネクトチャンスを経て、やちよ10G以上・鶴乃20G以上・さな30G以上・フェリシア／黒江50G以上・ほむら／まどか100G以上のキャラ別上乗せを表示します。"] },
      { heading: "エンブリオ・イブ覚醒", paragraphs: ["ストーリーコンプリート後はエンディングを経て、32Gの覚醒準備と10G＋αのエンブリオ・イブアタックへ進み、上位ATの初期ゲーム数を決定します。", "エンブリオ・イブ覚醒は通常ATと同じゲーム数管理型ですが、ストーリー当選時に必ずコネクトチャンスが発生する強化状態です。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約32.6G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6を均等抽選し、BONUS・AT初当りは公開設定別値を使用", "BONUS性能、主要ゲーム数、純増、ストーリー・コネクト性能は公開値を優先", "BONUS種類、AT報酬、キャラ選択など非公開配分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ユニバーサル公式製品情報", "https://www.universal-777.com/product/slot/magireco/"], ["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/914/"], ["なな徹 マギアアタック解析", "https://nana-press.com/kaiseki/machine/914/28446/"], ["なな徹 マギアラッシュ解析", "https://nana-press.com/kaiseki/machine/914/28447/"], ["なな徹 ストーリー解析", "https://nana-press.com/kaiseki/machine/914/28450/"], ["なな徹 コネクト解析", "https://nana-press.com/kaiseki/machine/914/28451/"], ["なな徹 エンブリオ・イブ覚醒解析", "https://nana-press.com/kaiseki/machine/914/28456/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10211"]],
    readerGuide: {
      verdict: "BONUSでATを勝ち取り、ゲーム数上乗せとストーリーを重ねて全8話コンプリート・エンブリオ・イブ覚醒を目指すゲーム数管理型です。",
      bestFor: ["BONUS最終PUSHでAT当落を決めたい", "マギアアタックの初期ゲーム数を開きたい", "ストーリーとキャラ別コネクトを積み重ねたい"],
      check: ["BONUS・AT初当り、純増、主要ゲーム数は公開値", "ストーリー回数とキャラ別の最低上乗せを反映", "非公開のBONUS・報酬配分は体験用代表値"],
      compare: [["azur-lane-slot", "スマスロ アズールレーン", "初期G数決定＋上乗せATと比較"], ["symphogear-seigi-slot", "スマスロ シンフォギア", "ゲーム数上乗せATと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v13",
    dedicatedFlow: true,
    dedicatedFlowKey: "magia-record-slot",
    dedicatedFlowVersion: 2,
    magiaRecordFlow: true,
    triggerLabel: "初当りBONUS",
    triggerRate: 240.6,
    triggerSuccess: 1,
    mainLabel: "マギアラッシュ",
    mainRate: 654.6,
    base50: 32.6,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 2.6,
    atPayoutVariance: 0,
    magiaBonusTypes: [[{ key: "big", label: "BIG BONUS", games: 30, payout: 78, atChance: 0.40 }, 0.68], [{ key: "mitama", label: "みたまBONUS", games: 9, payout: 30, atChance: 0.15 }, 0.26], [{ key: "episode", label: "エピソードBONUS", games: 50, payout: 130, atChance: 1 }, 0.05], [{ key: "alina", label: "アリナミュージアム", games: 30, payout: 78, atChance: 1, extraGames: 60 }, 0.01]],
    magiaAttackGames: [[40, 0.45], [50, 0.25], [60, 0.14], [80, 0.08], [100, 0.05], [150, 0.02], [200, 0.01]],
    magiaRewardTypes: [[{ key: "story", label: "ストーリー", games: 20 }, 0.63], [{ key: "battle", label: "決戦神浜聖女", games: 12 }, 0.25], [{ key: "bonus", label: "マギアBONUS", games: 30, payout: 78 }, 0.12]],
    magiaConnectCharacters: [[{ label: "やちよ", games: [[10, 0.72], [20, 0.22], [30, 0.06]] }, 0.30], [{ label: "鶴乃", games: [[20, 0.64], [30, 0.28], [50, 0.08]] }, 0.24], [{ label: "さな", games: [[30, 0.62], [50, 0.30], [100, 0.08]] }, 0.18], [{ label: "フェリシア", games: [[50, 0.72], [100, 0.24], [200, 0.04]] }, 0.11], [{ label: "黒江", games: [[50, 0.67], [100, 0.28], [200, 0.05]] }, 0.08], [{ label: "ほむら", games: [[100, 0.72], [200, 0.23], [300, 0.05]] }, 0.05], [{ label: "まどか", games: [[100, 0.60], [200, 0.30], [300, 0.10]] }, 0.04]],
    magiaStoryTarget: 8,
    magiaRewardChance: 0.34,
    magiaSetContinueChance: 0.18,
    magiaUpperPrepareGames: 32,
    magiaUpperAttackGames: 10,
    magiaUpperInitialGames: [[100, 0.45], [150, 0.32], [200, 0.18], [300, 0.05]],
    magiaMaxEvents: 14,
    specialLabel: "コネクト",
    specialChance: 0.34,
    upperChallenge: "エンブリオ・イブ覚醒準備",
    upperChance: 0,
    upperSuccess: 1,
    upperLabel: "エンブリオ・イブ覚醒",
    upperContinue: 0,
    upperPayout: 0,
    upperPureIncrease: 2.6,
    settingRates: { 1: { trigger: 240.6, main: 654.6, payout: 0.976 }, 2: { trigger: 236.1, main: 633.4, payout: 0.989 }, 3: { trigger: 222.8, main: 571.8, payout: 1.020 }, 4: { trigger: 208.5, main: 516.6, payout: 1.060 }, 5: { trigger: 195.1, main: 456.5, payout: 1.104 }, 6: { trigger: 184.3, main: 416.7, payout: 1.149 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyToaruIndex2DedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["toaru-index2-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "2種類のCZから幻想殺しRUSHへ。バトル勝利で『とある運命の上乗遊技』をつかむ。",
    intro: "10Gのレールガンチャンス／アクセラレータチャンスからATを目指し、初期40G以上の幻想殺しRUSHへ。神の力・神の右席BATTLE、7段階の上乗せ報酬、フィアンマBATTLEまでを専用画面で体験できます。",
    points: ["レールガンチャンスは10G・AT期待度約52%", "アクセラレータチャンスは10G・AT期待度約80%", "幻想殺しRUSHは初期40G以上・純増約4.0枚/G"],
    specs: [["CZ（設定1）", "約1/235.6"], ["AT（設定1）", "約1/398.8"], ["AT（設定6）", "約1/338.4"], ["レールガンチャンス", "10G・AT期待度約52%"], ["アクセラレータチャンス", "10G・AT期待度約80%"], ["幻想殺しRUSH", "初期40G以上"], ["AT純増", "約4.0枚/G"], ["幻想リプレイ", "約1/99"], ["サポーター", "3G・平均約30G"], ["ヒロインズ", "5G・平均約60G"], ["イマジンブレイカー", "3G＋α・平均約310G"], ["設定", "1〜6ランダム"]],
    articleSections: [
      { heading: "2種類の10G CZからATへ", paragraphs: ["レールガンチャンスは10G・純増約2.2枚/G・AT期待度約52%。アクセラレータチャンスも10Gで、AT期待度は約80%です。", "シミュレーターではCZを最後まで進め、最終PUSHで幻想殺しRUSHの当落を開きます。通常時のAT直撃も独立した入口として扱います。"] },
      { heading: "幻想殺しRUSHは初期40G以上", paragraphs: ["幻想殺しRUSHは純増約4.0枚/Gのゲーム数管理AT。レア役の直乗せ、指定ゲーム数のバトル、赤7揃いのATストックなどで継続を狙います。", "約1/99の幻想リプレイ後は3G間、小役が上位役へ変換される可能性があるため、シミュレーターではバトル・上乗せ契機の一部へ集約しています。"] },
      { heading: "バトル勝利で上乗せ遊技", paragraphs: ["神の力BATTLE（ガブリエル）と神の右席BATTLEは、勝利すると『とある運命の上乗遊技』へ進みます。専用画面ではバトルを4G進め、最後のPUSHで勝敗と報酬を開きます。", "上乗せ遊技の報酬は＋20G、五和平均約50G、神裂火織約70G、御坂美琴約130G、一方通行約180G、竜王の顎約300G、自動書記平均約750Gを段階別に表示します。"] },
      { heading: "PLUS ACTIONとフィアンマBATTLE", paragraphs: ["PLUS ACTIONはサポーター3G・平均約30G、ヒロインズ5G・平均約60G、イマジンブレイカー3G＋α・平均約310G。通常の上乗せと分けて記録します。", "AT終了時に権利を持っていればフィアンマBATTLEへ。成功時は上乗せ遊技を経て幻想殺しRUSHへ再突入する引き戻しルートとして表現します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約30.8G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6を均等抽選し、CZ・AT初当りは公式設定別値を使用", "CZ期待度、AT純増、主要ゲーム数、上乗せ平均は公開値を優先", "CZ選択率、バトル出現率・勝率、報酬振り分けなど未公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["藤商事 公式機種情報", "https://www.fujimarukun.co.jp/products/l_toaru2/?search_type=2"], ["藤商事 公式プレスリリース", "https://www.fujimarukun.co.jp/corp/news/tdpr_20260619.pdf"], ["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/1154/"], ["なな徹 とある運命の上乗遊技", "https://nana-press.com/kaiseki/machine/1154/38028/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10516"]],
    readerGuide: {
      verdict: "2種類のCZから初期40G以上のATへ入り、バトル勝利のPUSHで7段階のゲーム数上乗せを開くゲーム数管理型です。",
      bestFor: ["CZ最終PUSHでAT当落を決めたい", "バトル勝利から上乗せ報酬を開きたい", "フィアンマBATTLEからAT再突入を狙いたい"],
      check: ["CZ・AT初当り、CZ期待度、純増、主要ゲーム数は公開値", "上乗せ遊技のキャラ別平均を反映", "未公表の選択率・勝率は体験用代表値"],
      compare: [["symphogear-seigi-slot", "スマスロ シンフォギア", "ゲーム数上乗せATと比較"], ["azur-lane-slot", "スマスロ アズールレーン", "バトル報酬型ATと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v14",
    dedicatedFlow: true,
    dedicatedFlowKey: "toaru-index2-slot",
    dedicatedFlowVersion: 2,
    toaruIndex2Flow: true,
    triggerLabel: "CZ・AT直撃",
    triggerRate: 235.6,
    triggerSuccess: 1,
    mainLabel: "幻想殺しRUSH",
    mainRate: 398.8,
    base50: 30.8,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 4.0,
    atPayoutVariance: 0,
    toaruEntryRoutes: [[{ key: "railgun", label: "レールガンチャンス", games: 10, chance: 0.52 }, 0.82], [{ key: "accelerator", label: "アクセラレータチャンス", games: 10, chance: 0.80 }, 0.10], [{ key: "direct", label: "AT直撃", games: 1, chance: 1 }, 0.08]],
    toaruBattleTypes: [[{ key: "gabriel", label: "神の力BATTLE ガブリエル", games: 4, chance: 0.50 }, 0.48], [{ key: "right-seat", label: "神の右席BATTLE", games: 4, chance: 0.50 }, 0.52]],
    toaruChargeRewards: [[{ key: "plus20", label: "ゲーム数上乗せ", games: 20 }, 0.55], [{ key: "itsuwa", label: "五和", games: 50 }, 0.18], [{ key: "kaori", label: "神裂火織", games: 70 }, 0.10], [{ key: "mikoto", label: "御坂美琴", games: 130 }, 0.07], [{ key: "accelerator", label: "一方通行", games: 180 }, 0.045], [{ key: "dragon", label: "竜王の顎", games: 300 }, 0.035], [{ key: "auto-writing", label: "自動書記", games: 750 }, 0.02]],
    toaruPlusActions: [[{ label: "サポーター", games: 30, zoneGames: 3 }, 0.60], [{ label: "ヒロインズ", games: 60, zoneGames: 5 }, 0.32], [{ label: "イマジンブレイカー", games: 310, zoneGames: 3 }, 0.08]],
    toaruInitialGames: 40,
    toaruBattleChance: 0.38,
    toaruPlusActionChance: 0.11,
    toaruFiammaChance: 0.28,
    toaruFiammaSuccess: 0.50,
    toaruMaxEvents: 14,
    specialLabel: "とある運命の上乗遊技",
    specialChance: 0.38,
    upperChallenge: "フィアンマBATTLE",
    upperChance: 0.28,
    upperSuccess: 0.50,
    upperLabel: "幻想殺しRUSH再突入",
    upperContinue: 0,
    upperPayout: 0,
    settingRates: { 1: { trigger: 235.6, main: 398.8, payout: 0.979 }, 2: { trigger: 233.4, main: 394.5, payout: 0.987 }, 3: { trigger: 230.8, main: 389.6, payout: 1.000 }, 4: { trigger: 222.3, main: 369.5, payout: 1.045 }, 5: { trigger: 215.8, main: 358.0, payout: 1.082 }, 6: { trigger: 207.2, main: 338.4, payout: 1.133 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyGundamSeedDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["gundam-seed-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "18Gのストライクアタックから3種類のBONUSへ。20G＋αのSTをつなぎ、フリーダムハイパーを目指す。",
    intro: "小役でHITマスをつなぐ18GのCZ、約100・200・300枚のBONUS、20G＋αのストライクライド、3Gの瞬間決着バトル、5Gの宿命ZONE、前半5G＋後半5Gのストライクバースト、1セット10Gのフリーダムハイパーまでを専用画面で体験できます。",
    points: ["ストライクアタックは18G・成功期待度約62%", "BONUSは約100／200／300枚・純増約6.5枚/G", "ストライクライドは20G＋α・継続約70%", "上位ATは1セット10G・継続約96%"],
    specs: [["CZ（設定1）", "約1/362.2"], ["AT初当り（設定1）", "約1/460.1"], ["AT初当り（設定6）", "約1/318.4"], ["ベース", "約31.5G/50枚"], ["CZ", "18G・成功期待度約62%"], ["SEED BONUS", "約100枚"], ["赤7 BIG BONUS", "約200枚"], ["黒BAR BIG BONUS", "約300枚"], ["BONUS純増", "約6.5枚/G"], ["ストライクライド", "20G＋α・継続約70%"], ["瞬間決着バトル", "3G・成功期待度約50%"], ["宿命ZONE", "5G"], ["ストライクバースト", "前半5G＋後半5G"], ["フリーダムハイパー", "1セット10G・継続約96%"]],
    articleSections: [
      { heading: "ストライクアタックからBONUSへ", paragraphs: ["通常時はレア役や3GのラクスチャンスなどからCZを目指します。ストライクアタックは18G継続し、小役でHITマスを獲得。HITが縦または横に並ぶと白BAR狙えへ進みます。", "CZ成功後も残りゲームを消化し、白BAR揃いを重ねるほどSEED BONUS、赤7 BIG、黒BAR BIGへ昇格します。専用画面では18Gを進め、最後のPUSHでBONUSと昇格結果を開きます。"] },
      { heading: "3種類のBONUSと宿命ポイント", paragraphs: ["BONUSは純増約6.5枚/G。SEED BONUSは約100枚、赤7 BIGは約200枚、黒BAR BIGは約300枚です。消化中は宿命ポイントを抽選し、100pt到達で5Gの宿命ZONEへ進みます。", "シミュレーターでは獲得枚数と宿命ポイントをBONUSごとに表示し、100pt到達時だけ宿命ZONEのPUSH判定へ進みます。"] },
      { heading: "ストライクライドと瞬間決着バトル", paragraphs: ["BONUS後は20G＋αのST『ストライクライド』へ。リプレイ・ベルでゲーム数をHOLDし、HOLD中の小役などから3Gの瞬間決着バトルへ発展します。", "瞬間決着バトルは成功期待度約50%。勝利すればBONUSとST再セット、ST終了後は3Gのラストチャンスで引き戻しを抽選します。専用画面ではST20G、3Gバトル、ラストチャンスを順に表示します。"] },
      { heading: "宿命ZONEとストライクバースト", paragraphs: ["宿命ポイントMAXで5Gの宿命ZONEへ入り、SEED目停止で上位CZ『ストライクバースト』へ。ストライクバーストは前半5G＋後半5Gの2部構成です。", "前半非突破でもSEED BONUS、後半まで進んで上位非当選なら赤7 BIGが最低保証。前半・後半の最後にPUSHを置き、結果と保証BONUSを分けて表示します。"] },
      { heading: "フリーダムハイパー", paragraphs: ["上位ATは1セット10G・純増約6.5枚/G・継続率約96%。Vストックを使いながらメインゾーン、ピンチゾーン、3Gのファイナルジャッジを行き来します。", "1000連撃到達時のフルバーストチャレンジは100〜1000枚を決定。専用画面では10Gセット、Vストック、ファイナルジャッジ、フルバーストを個別に記録します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約31.5G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6のCZ・AT初当りと出玉率は公開値", "CZ、3種類BONUS、ST、瞬間決着バトル、宿命ZONE、上位CZ、上位ATを専用進行", "BONUS振り分け、宿命ポイント獲得量、上位ルートの未公表抽選は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO 公式機種情報", "https://www.sankyo-fever.jp/collection/981/"], ["Bisty 開発こぼれ話・全体フロー", "https://blog-bisty.jp/l_gundam_seed_tutorial/502/"], ["一撃 機種解析", "https://1geki.jp/slot/l_gundamseed/"], ["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/930/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10255"]],
    readerGuide: { verdict: "18GのCZから3種類のBONUSを獲得し、20G＋αのSTでBONUSを重ねながら宿命ポイントMAXと上位ATを狙うBONUS＋ST型です。", bestFor: ["HITマス型CZの最終PUSHを体験したい", "BONUSと20G STのループを見たい", "宿命ZONEから上位ATまで挑戦したい"], check: ["CZ・AT初当り、主要ゲーム数、純増、BONUS枚数は公開値", "STと瞬間決着バトル、ラストチャンスを分けて表示", "未公表の細かな振り分けは体験用代表値"], compare: [["paripi-koumei-slot", "スマスロ パリピ孔明", "BONUS＋ST型と比較"], ["fire-force-slot", "Lパチスロ 炎炎ノ消防隊", "BONUSループ型と比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v22", dedicatedFlow: true, dedicatedFlowKey: "gundam-seed-slot", dedicatedFlowVersion: 2, gundamSeedFlow: true,
    triggerLabel: "ストライクアタック", triggerRate: 362.2, triggerSuccess: 0.62, mainLabel: "ストライクライド", mainRate: 460.1, base50: 31.5, coinUnit: 4.0, normalMin: 0, normalMax: 0, atPureIncrease: 6.5, upperPureIncrease: 6.5, atPayoutVariance: 0,
    gundamSeedEntryRoutes: [[{ key: "cz", label: "ストライクアタック", games: 18, chance: 0.62 }, 0.88], [{ key: "direct", label: "黒BAR BIG BONUS直撃", games: 1, chance: 1, bonusKey: "black" }, 0.10], [{ key: "upper", label: "フリーダムハイパー直撃", games: 1, chance: 1, upper: true }, 0.02]],
    gundamSeedBonuses: [[{ key: "seed", label: "SEED BONUS", games: 16, award: 100, destiny: 26 }, 0.58], [{ key: "red", label: "赤7 BIG BONUS", games: 31, award: 200, destiny: 42 }, 0.30], [{ key: "black", label: "黒BAR BIG BONUS", games: 46, award: 300, destiny: 62 }, 0.12]],
    gundamSeedStGames: 20, gundamSeedStContinue: 0.70, gundamSeedBattleGames: 3, gundamSeedBattleChance: 0.50, gundamSeedLastChanceGames: 3, gundamSeedLastChance: 0.12, gundamSeedMaxLoops: 12,
    gundamSeedDestinyZoneGames: 5, gundamSeedDestinyZoneChance: 0.606,
    gundamSeedBurstFrontGames: 5, gundamSeedBurstFrontChance: 0.56, gundamSeedBurstBackGames: 5, gundamSeedBurstBackChance: 0.50,
    gundamSeedUpperGames: 10, gundamSeedUpperContinue: 0.96, gundamSeedUpperMaxSets: 60, gundamSeedFullBurstChance: 0.06, gundamSeedFullBurstAwards: [[100, 0.45], [200, 0.25], [300, 0.14], [500, 0.10], [700, 0.04], [1000, 0.02]],
    specialLabel: "宿命ZONE", specialChance: 0.606, upperChallenge: "ストライクバースト", upperChance: 0.56, upperSuccess: 0.50, upperLabel: "フリーダムハイパー", upperContinue: 0.96, upperPayout: 0,
    settingRates: { 1: { trigger: 362.2, main: 460.1, payout: 0.977 }, 2: { trigger: 377.3, main: 446.9, payout: 0.988 }, 3: { trigger: 349.1, main: 411.8, payout: 1.012 }, 4: { trigger: 309.7, main: 364.5, payout: 1.054 }, 5: { trigger: 301.6, main: 355.6, payout: 1.107 }, 6: { trigger: 266.9, main: 318.4, payout: 1.149 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyInuyasha2DedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["inuyasha2-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "20G＋αのブッた斬りスラッシュで、当てるたび次回ボーナスが＋1。奈落決戦までを専用進行で体験。",
    intro: "妖勝負・魍魎丸バトルからATへ入り、初期報酬、20G＋αのブッた斬りスラッシュ、青7／白7BIG・ブーストチャンス、5Gの奈落チャレンジ、約82%でループする奈落決戦までを機種専用画面で再現します。",
    points: ["下位ATは20G＋α・純増約1.8枚/G", "当選するたび次回ボーナス個数＋1・最大8個", "青7約200枚／白7約100枚／ブースト約50枚", "奈落決戦は約82%ループ"],
    specs: [["CZ（設定1）", "約1/248.8"], ["AT（設定1）", "約1/435.4"], ["AT（設定6）", "約1/312.7"], ["ベース", "約33.3G/50枚"], ["ブッた斬りスラッシュ", "20G＋α・純増約1.8枚/G"], ["報酬アップZONE", "2G・初期報酬2〜8個"], ["青7BIG", "約200枚"], ["白7BIG", "約100枚"], ["ブーストチャンス", "約50枚"], ["ボーナス中純増", "約5.0枚/G"], ["奈落チャレンジ", "5G"], ["奈落決戦", "約82%ループ"]],
    articleSections: [
      { heading: "妖勝負・魍魎丸バトルからATへ", paragraphs: ["通常時は主に妖勝負を経由してATを目指し、魍魎丸バトル勝利やブッた斬り役では報酬アップZONEへ進みます。CZは設定1約1/248.8〜設定6約1/209.6、ATは約1/435.4〜約1/312.7です。", "AT直撃に見える挙動も、内部では規定CZスルー後のAT当選として扱われます。シミュレーターは通常回転後に入口を表示し、最後のPUSHでAT当落を開きます。"] },
      { heading: "初期報酬とボーナス＋1", paragraphs: ["ATはボーナス1個から始まり、報酬アップZONEを経由した場合は2〜8個から開始。報酬アップZONEは2Gで、成立役に応じて初期個数を決めます。", "獲得したボーナスを消化した後は20G＋αのブッた斬りスラッシュへ。同色ベル2連やレア役で当選すると、次回にまとめて受け取るボーナス個数が1個増えます。最大8個です。"] },
      { heading: "3種類のボーナス", paragraphs: ["青7BIGは約200枚、白7BIGは約100枚、ブーストチャンスは約50枚で、いずれも純増約5.0枚/Gです。下位ATのBIG比率は約55%で、報酬が4個以上ならALL BIG抽選も行われます。", "青7・白7BIG中はATゲーム数上乗せを抽選。ブーストチャンスの消化ゲーム数は同一AT内で蓄積され、規定ゲーム数到達が奈落チャレンジの契機になります。"] },
      { heading: "奈落チャレンジと奈落決戦", paragraphs: ["奈落チャレンジは5G。成功すると上位ATの奈落決戦へ進みます。通常時の一部、AT中のブーストチャンス規定ゲーム数、1000枚到達後の奈落覚醒ZONE、エンディング後など複数の入口があります。", "奈落決戦はボーナス上乗せ特化のボーナスゲットZONEと奈落決戦を約82%でループ。専用画面ではボーナス個数をPUSHで開き、ボーナス消化後に継続ジャッジを行います。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約33.3G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6のCZ・AT初当り・出玉率は公開設定別値を使用", "初期報酬、20G＋α、ボーナス＋1、3種類のボーナス、奈落チャレンジ、奈落決戦を専用進行", "CZルート比率、下位ATの各小役当選、青7／白7内訳、奈落チャレンジ到達など非公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["L 犬夜叉2 公式サイト", "https://slot-l-inuyasha2.jp/"], ["開発トリビア 機種紹介", "https://spiky-crossalpha-trivia.jp/inuyasha2/1458/"], ["開発トリビア 報酬アップZONE", "https://spiky-crossalpha-trivia.jp/inuyasha2/1499/"], ["開発トリビア 奈落決戦", "https://spiky-crossalpha-trivia.jp/inuyasha2/1532/"], ["開発トリビア ボーナス比率", "https://spiky-crossalpha-trivia.jp/inuyasha2/2009/"], ["一撃 機種解析", "https://1geki.jp/slot/l_inuyasya2/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10160"]],
    readerGuide: { verdict: "20G＋αのSTで当てるたび次回ボーナス個数が増える、ボーナス＋1型ATです。", bestFor: ["ボーナス個数が1→2→3と増える緊張感を楽しみたい", "青7・白7・ブーストの種類をPUSHで開きたい", "奈落チャレンジから約82%ループの上位を狙いたい"], check: ["CZ・AT初当り、主要ゲーム数、純増、ボーナス枚数は公開値", "ゲーム数とボーナス獲得枚数を分けて表示", "非公表の細かな振り分けは体験用代表値"], compare: [["golden-kamuy-slot", "スマスロ ゴールデンカムイ", "上乗せ型ATと比較"], ["gundam-seed-slot", "スマスロ ガンダムSEED", "ST型ATと比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v28", dedicatedFlow: true, dedicatedFlowKey: "inuyasha2-slot", dedicatedFlowVersion: 2, inuyasha2Flow: true,
    triggerLabel: "妖勝負", triggerRate: 248.8, triggerSuccess: 0.571, mainLabel: "ブッた斬りスラッシュ", mainRate: 435.4, base50: 33.3, coinUnit: 4.2,
    normalMin: 0, normalMax: 0, atPureIncrease: 1.8, upperPureIncrease: 1.8, bonusPureIncrease: 5.0, atPayoutVariance: 0,
    inuyashaEntryRoutes: [[{ key: "ayakashi", label: "妖勝負", games: 10, chance: 0.52, rewardUp: false }, 0.78], [{ key: "moryomaru", label: "魍魎丸バトル", games: 8, chance: 1, rewardUp: true }, 0.15], [{ key: "slash", label: "ブッた斬り役", games: 1, chance: 1, rewardUp: true }, 0.02], [{ key: "naraku", label: "奈落チャレンジ", games: 5, chance: 0.55, upper: true }, 0.05]],
    inuyashaRewardUpStocks: [[2, 0.46], [3, 0.27], [4, 0.14], [5, 0.07], [6, 0.035], [7, 0.015], [8, 0.01]],
    inuyashaStGames: 20, inuyashaStChance: 0.70, inuyashaMaxBonusPlus: 8, inuyashaMaxRounds: 8,
    inuyashaBonuses: [[{ key: "white", label: "白7 BIG BONUS", games: 20, award: 100 }, 0.44], [{ key: "blue", label: "青7 BIG BONUS", games: 40, award: 200 }, 0.11], [{ key: "boost", label: "ブーストチャンス", games: 10, award: 50, boostGames: 10 }, 0.45]],
    inuyashaBigRatio: 0.55, inuyashaAllBigChance: 0.25, inuyashaBoostThreshold: 40,
    inuyashaNarakuGames: 5, inuyashaNarakuSuccess: 0.55,
    inuyashaUpperContinue: 0.82, inuyashaUpperMaxLoops: 10, inuyashaUpperStocks: [[1, 0.40], [2, 0.28], [3, 0.16], [4, 0.08], [5, 0.04], [6, 0.02], [7, 0.01], [8, 0.01]],
    specialLabel: "ボーナス＋1", specialChance: 0.70, upperChallenge: "奈落チャレンジ", upperChance: 0.18, upperSuccess: 0.55, upperLabel: "奈落決戦", upperContinue: 0.82, upperPayout: 0,
    settingRates: { 1: { trigger: 248.8, main: 435.4, payout: 0.976 }, 2: { trigger: 243.5, main: 419.9, payout: 0.989 }, 3: { trigger: 239.6, main: 402.3, payout: 1.0172 }, 4: { trigger: 233.5, main: 366.4, payout: 1.0636 }, 5: { trigger: 216.8, main: 336.1, payout: 1.1129 }, 6: { trigger: 209.6, main: 312.7, payout: 1.1499 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyZenigata4DedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["zenigata4-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "規定ガッツ到達から50G＋αの逮捕RUSHへ。デカチャンス、BIG GAME、30G連を突破して超逮捕RUSHを狙う。",
    intro: "通常時のガッツ獲得、ゼニガダッシュ、50G＋αの逮捕RUSH、デカチャンス、BIG GAME、ゼニロボ起動から30G連、超逮捕RUSHまでを専用画面で体験できます。",
    points: ["AT初当りは設定1約1/367.9〜設定6約1/305.8", "逮捕RUSHは50G＋α・純増約2.7枚/G", "BIG GAMEは10Gメイン＋3G連チャレンジ", "超逮捕RUSHは10Gオープニング＋30G・期待枚数2000枚超"],
    specs: [["AT（設定1）", "約1/367.9"], ["AT（設定6）", "約1/305.8"], ["ベース", "約32G/50枚"], ["天井", "999Gまたは1399ガッツ"], ["逮捕RUSH", "50G＋α・純増約2.7枚/G"], ["デカチャンス成功時BIG GAME", "約36%"], ["BIG GAME", "メイン10G＋3G連"], ["30G連", "30G"], ["超逮捕RUSH", "オープニング10G＋本編30G"], ["設定", "1〜6"]],
    articleSections: [
      { heading: "規定ガッツから逮捕RUSHへ", paragraphs: ["通常時は毎ゲーム獲得するガッツを積み上げ、規定ガッツ到達からATへ。ゼニガダッシュは6G／1セットで、平均約90ガッツの獲得契機です。天井は通常時999Gまたは1399ガッツです。", "シミュレーターでは設定別のAT初当り確率を使い、通常回転後に規定ガッツ到達を表示。最後のPUSHで50G＋αの逮捕RUSHへ進みます。通常モード、規定ガッツ、ゼニガタイムなどの細かな内部抽選はAT初当り確率へまとめています。"] },
      { heading: "50G＋αの逮捕RUSH", paragraphs: ["逮捕RUSHは純増約2.7枚/Gのゲーム数管理型AT。レア役・デカ目でゲーム数上乗せとデカチャンスを同時に抽選し、規定ゲーム数到達からもデカチャンスへ発展します。", "強チェリー・中段チェリー・デカ目はゲーム数上乗せ濃厚。専用進行では残りゲーム数を10Gずつ減らし、直乗せとデカチャンスを別々のPUSHで表示します。"] },
      { heading: "デカチャンス", paragraphs: ["デカチャンスは選ばれたキャラクターで成功期待度と恩恵が変化。不二子は成功期待度約67.2%、ルパン一味は成功かつBIG GAME濃厚、ゼニロボ起動は30G連への契機です。", "成功時はゲーム数上乗せが濃厚で、約36%でBIG GAMEへ。赤アイコン成功時はBIG GAME期待度50%、紫アイコンは不二子・ゼニロボ・ルパン宇宙ステージのいずれかが濃厚です。専用画面では相手・成功・報酬をPUSH後に開きます。"] },
      { heading: "BIG GAME", paragraphs: ["BIG GAMEは10Gのメインパートと3G連チャレンジを行き来する上乗せ特化ゾーンです。突入時に継続ストックを1個持つため単発終了はなく、継続率は33%または64%。10セット目の上乗せは3桁濃厚です。", "継続時はゼニガ逮捕アイコンを獲得し、終了時に後乗せを告知。シミュレーターでは各セットのPUSHで継続と+20〜300Gを表示し、ゲーム数上乗せと獲得枚数を混ぜません。"] },
      { heading: "30G連と超逮捕RUSH", paragraphs: ["ゼニロボ起動やエンディング後などから30G連へ。30G間は金7（約1/64.0）、デカ目、中段チェリーで成功濃厚。弱チェリー・ベル・チャンスリプレイは3.5%、強チェリーは40.0%で成功を抽選します。", "成功後は10Gのオープニングを経て30Gの超逮捕RUSHへ。超逮捕RUSHは上乗せ・デカ目・デカチャンスのトリプル高確率で、期待枚数は2000枚超。専用進行では30Gを回して最後のPUSH、成功後はオープニングと本編を分けて表示します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約32G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6のAT初当り・出玉率は公開設定別値を使用", "逮捕RUSH、直乗せ、デカチャンス、BIG GAME、30G連、超逮捕RUSHを機種専用進行", "デカチャンスの一部キャラ選択率、AT中の各契機選択率など未公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["平和 公式遊技ガイド", "https://www.heiwanet.co.jp/assets/images/products/guide/l-l12.pdf"], ["一撃 逮捕RUSH解析", "https://1geki.jp/slot/s_zenigata4/81/"], ["一撃 BIG GAME解析", "https://1geki.jp/slot/s_zenigata4/83/"], ["必勝本 逮捕RUSH解析", "https://p.hisshobon.jp/machine/4076/1/94981"], ["必勝本 BIG GAME解析", "https://p.hisshobon.jp/machine/4076/1/95279"], ["必勝本 超逮捕RUSH解析", "https://p.hisshobon.jp/machine/4076/1/95285"], ["パチナビ 機種解析", "https://pachinavi.net/machines/smasloth-zenigata-4/uchikata/"], ["パチナビ 設定別解析", "https://pachinavi.net/machines/smasloth-zenigata-4/settei/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9809"]],
    readerGuide: { verdict: "規定ガッツから50G＋αの逮捕RUSHへ入り、デカチャンスとBIG GAMEでゲーム数を伸ばし、30G連突破から最強特化ゾーンを狙うゲーム数管理型です。", bestFor: ["デカチャンスの相手と報酬をPUSHで開きたい", "残りゲーム数と後乗せを見ながらATを進めたい", "30G連から超逮捕RUSHまで挑戦したい"], check: ["AT初当り、主要ゲーム数、純増、公開抽選値は実機解析値", "ゲーム数上乗せと獲得枚数を分けて表示", "未公表の細かな振り分けは体験用代表値"], compare: [["bancho4-slot", "スマスロ 押忍！番長4", "ゲーム数上乗せATと比較"], ["golden-kamuy-slot", "スマスロ ゴールデンカムイ", "上乗せ型ATと比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v27", dedicatedFlow: true, dedicatedFlowKey: "zenigata4-slot", dedicatedFlowVersion: 2, zenigata4Flow: true,
    triggerLabel: "規定ガッツ到達", triggerRate: 367.9, triggerSuccess: 1, mainLabel: "逮捕RUSH", mainRate: 367.9, base50: 32, coinUnit: 3.8, normalMin: 0, normalMax: 0, atPureIncrease: 2.7, upperPureIncrease: 2.7, atPayoutVariance: 0,
    zenigataAtGames: 50, zenigataSectionGames: 10, zenigataMaxSections: 24,
    zenigataAtEvents: [[{ key: "none", label: "通常消化" }, 0.40], [{ key: "add", label: "ゲーム数直乗せ" }, 0.25], [{ key: "deka", label: "デカチャンス" }, 0.35]],
    zenigataDirectAdds: [[10, 0.67], [30, 0.22], [50, 0.07], [100, 0.035], [200, 0.003], [300, 0.002]],
    zenigataDekaRoutes: [[{ key: "jigen", label: "次元", chance: 0.34 }, 0.29], [{ key: "goemon", label: "五ェ門", chance: 0.45 }, 0.25], [{ key: "lupin", label: "ルパン", chance: 0.56 }, 0.23], [{ key: "fujiko", label: "不二子", chance: 0.672 }, 0.14], [{ key: "zenirobo", label: "ゼニロボ起動", chance: 1, thirty: true }, 0.06], [{ key: "gang", label: "ルパン一味", chance: 1, bigGame: true }, 0.03]],
    zenigataDekaAdds: [[10, 0.44], [30, 0.35], [50, 0.13], [100, 0.06], [200, 0.012], [300, 0.008]], zenigataBigGameChance: 0.36,
    zenigataBigGameModes: [[{ label: "継続率33%", chance: 0.33 }, 0.70], [{ label: "継続率64%", chance: 0.64 }, 0.30]], zenigataBigGameAdds: [[20, 0.55], [30, 0.27], [50, 0.12], [100, 0.05], [200, 0.007], [300, 0.003]], zenigataBigGameMaxSets: 10,
    zenigataThirtyGames: 30, zenigataThirtyGoldRate: 64, zenigataThirtyRareChance: 0.13, zenigataThirtyLastChance: 0.22,
    zenigataSuperOpeningGames: 10, zenigataSuperGames: 30, zenigataSuperExpectedAward: 2000, zenigataSuperDekaChance: 0.48, zenigataSuperAdds: [[10, 0.45], [30, 0.27], [50, 0.14], [100, 0.09], [200, 0.03], [300, 0.02]],
    specialLabel: "BIG GAME", specialChance: 0.36, upperChallenge: "30G連", upperChance: 0.14, upperSuccess: 0.50, upperLabel: "超逮捕RUSH", upperContinue: 0, upperPayout: 0,
    settingRates: { 1: { trigger: 367.9, main: 367.9, payout: 0.982 }, 2: { trigger: 365.3, main: 365.3, payout: 0.987 }, 3: { trigger: 348.3, main: 348.3, payout: 1.007 }, 4: { trigger: 329.0, main: 329.0, payout: 1.043 }, 5: { trigger: 314.5, main: 314.5, payout: 1.095 }, 6: { trigger: 305.8, main: 305.8, payout: 1.141 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyBancho4DedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["bancho4-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "特訓・対決から3種類のBONUSへ。50G＋αの頂RISEで対決と上乗せを重ね、轟雷光・絶頂対決・エンブレムを狙う。",
    intro: "通常時の特訓・対決、REG／赤7・青7番長ボーナス、50G＋αの頂RISE、対決報酬、轟雷光、32Gの頂RISE UP、絶頂対決、超番長BONUS、上位ATエンブレムモードまでを専用画面で体験できます。",
    points: ["初当りは設定1約1/259.5〜設定6約1/221.1", "頂RISEは50G＋α・純増約2.7枚/G", "轟雷光は1セット5G・平均上乗せ約130G", "エンブレムモードは純増約4.5枚/G"],
    specs: [["初当り（設定1）", "約1/259.5"], ["初当り（設定6）", "約1/221.1"], ["ベース", "約33G/50枚"], ["REG", "15G"], ["赤7／青7番長BONUS", "30G＋α"], ["赤7BONUS AT期待度", "約42%"], ["青7BONUS AT期待度", "約82%"], ["頂RISE", "50G＋α・純増約2.7枚/G"], ["頂RISE UP", "32G・AT復帰濃厚"], ["轟雷光", "1セット5G・平均上乗せ約130G"], ["エンブレムモード", "純増約4.5枚/G"]],
    articleSections: [
      { heading: "特訓・対決から初当りへ", paragraphs: ["通常時はレア役、ゲーム数、ベルカウンターなどから特訓を経て対決へ発展。対決勝利でREGまたは番長BONUSを獲得します。天井は最大699G＋αです。", "シミュレーターでは通常回転の後に特訓・対決を表示し、最後のPUSHで初当りBONUSの種類を開きます。通常時の細かなモード・対決相手振り分けは初当り確率へまとめています。"] },
      { heading: "REGと赤7・青7番長BONUS", paragraphs: ["REGは15Gで、消化中の小役からキャラクターを追加し、漢気ルーレットでATを目指します。赤7・青7番長BONUSは30G＋αで、赤7のAT期待度は約42%、青7は約82%です。", "通常A・B／チャンス滞在時の当選時振り分けは、設定1でREG50.0%・赤7 48.8%・青7 1.2%、設定6でREG43.4%・赤7 48.8%・青7 7.8%。通常時のAT直撃も設定別公開値で抽選します。専用画面ではPUSH後にBONUS種類と頂RISE当落を表示します。"] },
      { heading: "50G＋αの頂RISEと対決", paragraphs: ["頂RISEは初期50G＋α・純増約2.7枚/Gのゲーム数管理型AT。ベルカウンターやレア役から対決へ発展し、勝利時は+20／+30／+50／+100／+300G、番長BONUS、頂RISE UP、轟雷光などを獲得します。", "専用画面では残りゲーム数を10Gずつ減らし、対決に発展するとPUSHを表示。勝敗と報酬を同時に開き、ゲーム数上乗せとBONUS獲得枚数を分けて表示します。"] },
      { heading: "轟雷光と絶頂対決", paragraphs: ["轟雷光は1セット5Gの上乗せ特化ゾーン。継続率は50%または約85.2%で、毎セット上乗せと継続を抽選し、平均上乗せは約130Gです。", "絶頂対決は対決勝利のたびに30G以上を上乗せし、ループ終了後は番長BONUSへ。どちらもセットごとのPUSHで継続と上乗せゲーム数を開きます。"] },
      { heading: "頂RISE UPと豪頂閣", paragraphs: ["頂RISE終了後の一部で32Gの頂RISE UPへ。AT復帰が濃厚で、消化中は一撃頂上ジャッジメントまたは愛の教育的指導を抽選し、いずれかの当選期待度は約65%です。", "一撃頂上ジャッジメント成功後の豪頂閣は初期20G以上。ベルカウンター7回ごとに対決し、勝利時の上乗せ性能が強化されます。専用進行では復帰と特典を別々に表示します。"] },
      { heading: "超番長BONUSとエンブレムモード", paragraphs: ["超番長BONUSは50G継続し、ゲーム数上乗せと勝利濃厚の対決をストック。終了後は純増約4.5枚/Gのエンブレムモードへ進みます。", "エンブレムモードは基本ゲーム性を継承しつつ、対決発展率と勝率が上昇。シミュレーターでは超番長BONUS当選後だけ上位へ進み、区間ごとのPUSHで継続を表示します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約33G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6の初当り・出玉率は公開設定別値を使用", "3種類BONUS、頂RISE、対決、轟雷光、頂RISE UP、絶頂対決、上位ATを専用進行", "BONUS振り分け、AT中の各契機選択率、上乗せ振り分けなど未公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["大都技研 公式機種サイト", "https://www.daitogiken.com/contents/product/slot/bancho4/"], ["一撃 機種解析", "https://1geki.jp/slot/l_osu_bancho4/"], ["一撃 頂RISE UP解析", "https://1geki.jp/slot/l_osu_bancho4/89/"], ["なな徹 BONUS解析", "https://nana-press.com/kaiseki/machine/736/20466/"], ["パチナビ 設定別解析", "https://pachinavi.net/machines/smasloth-banchou-4/settei/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10023"]],
    readerGuide: { verdict: "3種類のBONUSから50G＋αの頂RISEへ進み、対決勝利で上乗せ・BONUS・特化ゾーンを重ねるゲーム数管理型です。", bestFor: ["特訓・対決からBONUSまでをPUSHで体験したい", "残りゲーム数と対決報酬を見ながらATを進めたい", "轟雷光・絶頂対決・エンブレムを狙いたい"], check: ["初当り、主要ゲーム数、純増、BONUS期待度は公開値", "ゲーム数上乗せとBONUS獲得枚数を分けて表示", "未公表の細かな振り分けは体験用代表値"], compare: [["golden-kamuy-slot", "スマスロ ゴールデンカムイ", "100G上乗せATと比較"], ["zenigata4-slot", "L主役は銭形4", "ゲーム数管理ATと比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v26", dedicatedFlow: true, dedicatedFlowKey: "bancho4-slot", dedicatedFlowVersion: 2, bancho4Flow: true,
    triggerLabel: "初当りBONUS", triggerRate: 259.5, triggerSuccess: 0.52, mainLabel: "頂RISE", mainRate: 499.0, base50: 33, coinUnit: 3.3, normalMin: 0, normalMax: 0, atPureIncrease: 2.7, upperPureIncrease: 4.5, atPayoutVariance: 0,
    banchoBonuses: [{ key: "reg", label: "REG", games: 15, atChance: 0.28 }, { key: "red", label: "赤7番長BONUS", games: 30, atChance: 0.42 }, { key: "blue", label: "青7番長BONUS", games: 30, atChance: 0.82 }],
    banchoBonusWeights: { 1: [0.500, 0.488, 0.012], 2: [0.496, 0.488, 0.016], 3: [0.484, 0.488, 0.028], 4: [0.465, 0.488, 0.047], 5: [0.449, 0.488, 0.063], 6: [0.434, 0.488, 0.078] },
    banchoDirectRates: { 1: 6411, 2: 5624, 3: 4344, 4: 3053, 5: 2420, 6: 2150 },
    banchoAtGames: 50, banchoSectionGames: 10, banchoMaxSections: 24, banchoBattleChance: 0.56,
    banchoBattleRewards: [[{ key: "add", label: "ゲーム数上乗せ", addGames: 20 }, 0.30], [{ key: "add", label: "ゲーム数上乗せ", addGames: 30 }, 0.22], [{ key: "add", label: "ゲーム数上乗せ", addGames: 50 }, 0.13], [{ key: "add", label: "ゲーム数上乗せ", addGames: 100 }, 0.045], [{ key: "add", label: "ゲーム数上乗せ", addGames: 300 }, 0.005], [{ key: "bonus", label: "番長BONUS", bonusGames: 30 }, 0.13], [{ key: "riseup", label: "頂RISE UP", games: 32 }, 0.07], [{ key: "goraiko", label: "轟雷光" }, 0.055], [{ key: "zetchou", label: "絶頂対決" }, 0.025]],
    banchoGoraikoModes: [[{ label: "継続率50%", chance: 0.50 }, 0.80], [{ label: "継続率85.2%", chance: 0.852 }, 0.20]], banchoGoraikoAdds: [[10, 0.18], [20, 0.25], [30, 0.24], [50, 0.19], [100, 0.11], [300, 0.03]], banchoGoraikoMaxSets: 10,
    banchoZetchouChance: 0.66, banchoZetchouAdds: [[30, 0.46], [50, 0.30], [100, 0.19], [300, 0.05]], banchoZetchouMaxWins: 6,
    banchoRiseUpGames: 32, banchoRiseUpBenefitChance: 0.65, banchoSuperChance: 0.006, banchoSuperGames: 50,
    banchoUpperGames: 50, banchoUpperContinue: 0.78, banchoUpperMaxSections: 12,
    specialLabel: "轟雷光／絶頂対決", specialChance: 0.08, upperChallenge: "超番長BONUS", upperChance: 0.006, upperSuccess: 1, upperLabel: "エンブレムモード", upperContinue: 0.78, upperPayout: 0,
    settingRates: { 1: { trigger: 259.5, main: 499.0, payout: 0.978 }, 2: { trigger: 256.3, main: 486.9, payout: 0.989 }, 3: { trigger: 247.6, main: 458.4, payout: 1.015 }, 4: { trigger: 236.0, main: 423.1, payout: 1.060 }, 5: { trigger: 225.3, main: 395.2, payout: 1.100 }, 6: { trigger: 221.1, main: 379.8, payout: 1.131 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyGoldenKamuyDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["golden-kamuy-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "ピュウ☆と仲間参戦から2種類のBONUSへ。100Gの黄金神威で上乗せ・覚醒・GOLDEN BONUSを重ね、真・黄金神威を目指す。",
    intro: "規定ピュウ☆、狩猟チャレンジ、温泉チャンス、KAMUY BONUS／決戦BONUS、100G＋αの黄金神威、仲間参戦、覚醒、GOLDEN BONUS、2000枚到達後のGOLDEN ROADと真・黄金神威までを専用画面で体験できます。",
    points: ["初当り合算は設定1で約1/308.1", "黄金神威は初期100G・純増約2.7枚/G", "GOLDEN BONUSは30G＋最終+10G", "2000枚獲得後は純増約4.5枚/Gへ"],
    specs: [["初当り合算（設定1）", "約1/308.1"], ["AT初当り（設定1）", "約1/818.4"], ["AT初当り（設定6）", "約1/647.3"], ["ベース", "約36.9G/50枚"], ["KAMUY BONUS", "11G・純増約4.5枚/G"], ["決戦BONUS", "30G・純増約4.5枚/G"], ["黄金神威", "初期100G・純増約2.7枚/G"], ["GOLDEN BONUS", "30G＋最終+10G"], ["覚醒／極・覚醒", "10G＋α"], ["GOLDEN ROAD", "50G"], ["真・黄金神威", "純増約4.5枚/G"]],
    articleSections: [
      { heading: "ピュウ☆と仲間参戦", paragraphs: ["通常時は毎ゲーム貯まるピュウ☆の規定数到達、絆役、レア役からBONUSを目指します。狩猟チャレンジは5G＋αのピュウ☆獲得特化ゾーン、温泉チャンスは20G＋α・期待度約60%のBONUS高確率ゾーンです。", "杉元・アシㇼパ・白石の参戦は15G＋α継続し、対応役の性能を強化。複数参戦中の絆役はBONUS直撃の期待が高まります。通常時の内部ピュウ☆量や参戦抽選は初当り確率へまとめています。"] },
      { heading: "2種類の初当りBONUS", paragraphs: ["通常時のBONUSは11GのKAMUY BONUSと30Gの決戦BONUS。どちらも純増約4.5枚/Gで、フリーズ発生ならAT濃厚です。", "決戦BONUS後は20G＋αの決戦CHANCEへ。杉元参戦状態で期待度を上げ、最終PUSHでAT『黄金神威』の当落を開きます。シミュレーターではAT初当りの公開値に合うよう、BONUS経由の突破結果を固定抽選します。"] },
      { heading: "黄金神威と上乗せ", paragraphs: ["黄金神威は初期100G・純増約2.7枚/Gのゲーム数上乗せ型AT。レア役でゲーム数上乗せ、仲間参戦、覚醒、GOLDEN BONUS、特化ゾーンを抽選します。", "専用画面では残りゲーム数を減らし、区間の最後にPUSHを表示。直乗せ、GOLDEN BONUS、覚醒のいずれかを開いて残りゲーム数と累計枚数へ反映します。"] },
      { heading: "GOLDEN BONUSと覚醒", paragraphs: ["AT中のGOLDEN BONUSは30G・純増約2.7枚/Gで、最終ゲームに+10G上乗せ。BONUS中は参戦を抽選し、参戦後は覚醒を目指します。", "覚醒／極・覚醒は10G＋αの上乗せ特化ゾーン。リプレイ・レア役で上乗せに期待でき、3人集結なら極・覚醒となります。専用PUSHで上乗せゲーム数を開き、枚数とは分けて表示します。"] },
      { heading: "GOLDEN ROADと真・黄金神威", paragraphs: ["AT中の獲得枚数が2000枚を超えると純増が約4.5枚/Gへ上昇。終了後は50GのGOLDEN ROADを経て、上位AT『真・黄金神威』へ進みます。", "真・黄金神威中に再び2000枚を獲得すると上位ループの権利を狙えます。シミュレーターでは2000枚到達を条件に上位へ進め、未公表の継続抽選は体験用代表値として扱います。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約36.9G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6の初当り・AT初当り・出玉率は公開設定別値を使用", "2種類BONUS、決戦CHANCE、100G AT、上乗せ、覚醒、GOLDEN BONUS、上位ATを専用進行", "BONUS振り分け、AT中の各契機選択率、上乗せ振り分けなど未公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["Sammy 公式製品情報", "https://www.sammy.co.jp/japanese/product/pachislot/goldenkamuy/"], ["一撃 機種解析", "https://1geki.jp/slot/l_golden_kamui/"], ["必勝本 AT・上位AT解析", "https://p.hisshobon.jp/vpage/2600/4"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9987"]],
    readerGuide: { verdict: "2種類のBONUSから100G＋αの上乗せATへ進み、仲間参戦・覚醒・BONUSを重ねて2000枚到達後の上位を狙うゲーム数管理型です。", bestFor: ["BONUS後の決戦CHANCEをPUSHで体験したい", "残りゲーム数と上乗せを見ながらATを進めたい", "覚醒とGOLDEN ROADの上位ルートを狙いたい"], check: ["初当り・AT初当り、主要ゲーム数、純増は公開値", "上乗せゲーム数と獲得枚数を分けて表示", "未公表の細かな振り分けは体験用代表値"], compare: [["bancho4-slot", "スマスロ 押忍！番長4", "ゲーム数上乗せATと比較"], ["zenigata4-slot", "L主役は銭形4", "ゲーム数管理ATと比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v25", dedicatedFlow: true, dedicatedFlowKey: "golden-kamuy-slot", dedicatedFlowVersion: 2, goldenKamuyFlow: true,
    triggerLabel: "初当りBONUS", triggerRate: 308.1, triggerSuccess: 308.1 / 818.4, mainLabel: "黄金神威", mainRate: 818.4, base50: 36.9, coinUnit: 3.6, normalMin: 0, normalMax: 0, atPureIncrease: 2.7, upperPureIncrease: 4.5, atPayoutVariance: 0,
    goldenKamuyBonuses: [[{ key: "kamuy", label: "KAMUY BONUS", games: 11, award: 50 }, 0.48], [{ key: "battle", label: "決戦BONUS", games: 30, award: 135 }, 0.52]],
    goldenKamuyAtGames: 100, goldenKamuySectionGames: 20, goldenKamuyMaxSections: 18,
    goldenKamuyEvents: [[{ key: "none", label: "仲間参戦", addGames: 0, bonusGames: 0 }, 0.43], [{ key: "add", label: "ゲーム数上乗せ", addGames: [[10, 0.44], [20, 0.28], [30, 0.16], [50, 0.09], [100, 0.03]], bonusGames: 0 }, 0.27], [{ key: "golden-bonus", label: "GOLDEN BONUS", addGames: 10, bonusGames: 30 }, 0.18], [{ key: "awakening", label: "覚醒", addGames: [[20, 0.42], [30, 0.30], [50, 0.20], [100, 0.08]], bonusGames: 10 }, 0.10], [{ key: "extreme", label: "極・覚醒", addGames: [[50, 0.50], [100, 0.35], [200, 0.15]], bonusGames: 10 }, 0.02]],
    goldenKamuyUpperThreshold: 2000, goldenKamuyRoadGames: 50, goldenKamuyUpperGames: 100, goldenKamuyUpperContinue: 0.72, goldenKamuyUpperMaxSections: 10,
    specialLabel: "覚醒／極・覚醒", specialChance: 0.12, upperChallenge: "GOLDEN ROAD", upperChance: 0, upperSuccess: 1, upperLabel: "真・黄金神威", upperContinue: 0.72, upperPayout: 0,
    settingRates: { 1: { trigger: 308.1, main: 818.4, payout: 0.979 }, 2: { trigger: 302.4, main: 805.9, payout: 0.986 }, 3: { trigger: 290.4, main: 775.6, payout: 1.008 }, 4: { trigger: 268.5, main: 717.3, payout: 1.054 }, 5: { trigger: 260.1, main: 694.8, payout: 1.088 }, 6: { trigger: 248.8, main: 647.3, payout: 1.133 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyMagicalHalloween8DedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["magical-halloween8"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "5種類のBONUSから詠唱チャレンジへ。30Gのカボチャンスを重ね、悪・王・極・スーパーカボチャンスを目指す。",
    intro: "A＋ARTのBONUS、6択リプレイまで続く詠唱チャレンジ、1セット30Gのカボチャンス、まじかるちゃんす、キメラバトル、悪・王・極カボチャンス、スーパーカボチャンスまでを専用画面で体験できます。",
    points: ["BONUS合算は設定1で約1/177.1", "カボチャンスは1セット30G・純増約1.0枚/G", "BONUS／ART後は必ず詠唱チャレンジへ", "ストックなしの6択正解は自力約1/6"],
    specs: [["BONUS合算（設定1）", "約1/177.1"], ["ART初当り（設定1）", "約1/352.2"], ["ART初当り（設定6）", "約1/226.8"], ["ベース", "約34.3G/50枚"], ["カボチャンス", "1セット30G"], ["ART純増", "約1.0枚/G"], ["赤7BIG", "最大203枚"], ["白7BIG", "最大175枚"], ["赤赤白BIG", "最大154枚"], ["REG／殲滅BONUS", "最大42枚"], ["詠唱チャレンジ", "6択リプレイまで"], ["スーパーカボチャンス", "5セット保証＋継続抽選"]],
    articleSections: [
      { heading: "5種類のBONUSとART抽選", paragraphs: ["通常時は赤7BIG最大203枚、白7BIG最大175枚、赤赤白BIG最大154枚、殲滅BONUS最大42枚などのBONUSを目指します。エピソードBONUSならARTストック獲得が期待できます。", "BIG中のまじかるちゃんすは宝箱でストックを示唆。銅は1個以上、銀は3個以上、金は5個以上のストックに対応します。専用画面ではBONUS種類、獲得枚数、まじかるちゃんすをPUSHで開きます。"] },
      { heading: "詠唱チャレンジとミッション", paragraphs: ["BONUS／ART終了後は必ず詠唱チャレンジへ移行し、6択リプレイ成立まで継続します。ストックがあればナビでARTへ、ストックがなければ自力6択正解でカボチャンスへ入ります。", "規定ゲーム数を消化するとEX・SP・極ミッションを抽選。EXは毎ゲーム約1/2でストック、SPは悪・王・極などの特殊ART、極は6択正解時に極モードへ進みます。"] },
      { heading: "30Gのカボチャンスとストック", paragraphs: ["カボチャンスは1セット30Gの完走型ARTで、純増は約1.0枚/G。消化中のBONUSとカボチャ揃いで次セットのストックを狙います。", "同一セットでカボチャ揃いを重ねるとキングカボチャンスの期待が高まります。セット終了後は再び詠唱チャレンジへ進み、ストックまたは自力6択正解で次セットへつなぎます。"] },
      { heading: "悪・王・極カボチャンス", paragraphs: ["キングカボチャンスはコイン成立時のストック抽選が強化され、まじかるちゃんすは金箱が濃厚。悪カボチャンスは継続率管理で、ストック獲得時に0G連の悪〜ぷを抽選します。", "極カボチャンスはレア役が高頻度となるストック特化型。モードは複合することがあり、悪王、極王、極悪、すべてを備えた究極悪王ワルティメットへ発展します。"] },
      { heading: "スーパーカボチャンス", paragraphs: ["スーパーカボチャンスは5セット保証＋継続抽選の上位ART。BONUS中は0G連のまじかる〜ぷが発生し、極スーパーカボチャンスへの昇格もあります。", "シミュレーターでは保証5セットを消化した後に継続判定を行い、BONUS・ストック・特殊ARTへの変化を一連の履歴へ残します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約34.3G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6のBONUS・ART初当りは公開設定別値を使用", "BONUS、詠唱チャレンジ、30G ART、ストック、特殊ARTを専用進行", "SPミッションの特殊ART振り分けは公開値を使用", "BONUS中ストック率、特殊ART継続率など未公表部分は体験用代表値"] }
    ],
    sources: [["KONAMI 公式機種サイト", "https://www.konami.com/amusement/psm/slot/magihallo8/"], ["KONAMI 詠唱チャレンジ解説", "https://www.konami.com/amusement/psm/slot/magihallo8/16_hint.html?category=eisho"], ["一撃 機種解析", "https://1geki.jp/slot/l_magicalhalloween8/"], ["必勝本 BONUS解析", "https://p.hisshobon.jp/machine/4184/1/99272"], ["必勝本 詠唱チャレンジ解析", "https://p.hisshobon.jp/machine/4184/1/99274"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/9921"]],
    readerGuide: { verdict: "5種類のBONUSから詠唱チャレンジを経て、30GのARTストックをつなぐA＋ART型です。", bestFor: ["BONUS種類と獲得枚数をPUSHで見たい", "詠唱チャレンジの6択とストック連を体験したい", "悪・王・極・スーパーの特殊ARTを狙いたい"], check: ["BONUS枚数、主要ゲーム数、ART純増は公開値", "詠唱チャレンジとストック消費をセットごとに表示", "未公表の細かな当選率は体験用代表値"], compare: [["fire-force-slot", "Lパチスロ 炎炎ノ消防隊", "BONUSループ型と比較"], ["aobuta-slot", "スマスロ 青春ブタ野郎", "BONUS＋ST型と比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v23", dedicatedFlow: true, dedicatedFlowKey: "magical-halloween8", dedicatedFlowVersion: 2, magicalHalloween8Flow: true,
    triggerLabel: "BONUS", triggerRate: 177.1, triggerSuccess: 0.503, mainLabel: "カボチャンス", mainRate: 352.2, base50: 34.3, coinUnit: 2.4, normalMin: 0, normalMax: 0, atPureIncrease: 1.0, atPayoutVariance: 0,
    magihalloBonuses: [[{ key: "red", label: "赤7BIG", games: 34, award: 203 }, 0.22], [{ key: "white", label: "白7BIG", games: 30, award: 175 }, 0.13], [{ key: "mixed", label: "赤赤白BIG", games: 26, award: 154 }, 0.27], [{ key: "regular", label: "殲滅BONUS", games: 8, award: 42 }, 0.35], [{ key: "episode", label: "エピソードBONUS", games: 34, award: 203, stocks: 2 }, 0.03]],
    magihalloMissionGames: [[1, 0.004], [3, 0.020], [5, 0.074], [7, 0.102], [10, 0.800]],
    magihalloSpRewards: [[{ key: "king", label: "キングカボチャンス" }, 0.250], [{ key: "evil", label: "悪カボチャンス" }, 0.188], [{ key: "extreme", label: "極カボチャンス" }, 0.313], [{ key: "evil-king", label: "悪キングカボチャンス" }, 0.063], [{ key: "extreme-king", label: "極キングカボチャンス" }, 0.117], [{ key: "extreme-evil", label: "極悪カボチャンス" }, 0.063], [{ key: "ultimate", label: "究極悪王ワルティメットカボチャンス" }, 0.008]],
    magihalloArtGames: 30, magihalloMaxSets: 16, magihalloBonusChance: 0.20, magihalloPumpkinChance: 0.18, magihalloMagicChance: 0.20, magihalloKingChance: 0.10, magihalloChimeraChance: 0.05, magihalloSuperChance: 0.015, magihalloSelfSixChance: 1 / 6, magihalloEvilContinue: 0.70, magihalloSuperGuarantee: 5, magihalloSuperContinue: 0.80,
    specialLabel: "特殊カボチャンス", specialChance: 0.18, upperChallenge: "キメラバトル", upperChance: 0.05, upperSuccess: 0.50, upperLabel: "スーパーカボチャンス", upperContinue: 0.80, upperPayout: 0,
    settingRates: { 1: { trigger: 177.1, main: 352.2, payout: 0.977 }, 2: { trigger: 175.7, main: 335.5, payout: 0.988 }, 3: { trigger: 174.3, main: 297.1, payout: 1.013 }, 4: { trigger: 171.6, main: 269.3, payout: 1.052 }, 5: { trigger: 170.2, main: 254.4, payout: 1.073 }, 6: { trigger: 167.6, main: 226.8, payout: 1.092 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applySuperBlackjackDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["super-blackjack-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "初当りBIGからリオチャンス高確へ。6G＋αの昇格PUSH、BONUS、ST、SSTをつなぐSBJループ。",
    intro: "初当り3種類、リオチャンス高確、6G＋αの昇格パート、狙えまで続くジャッジ、6種類の報酬BONUS、50〜777Gのストックタイム、100G以上のスーパーストックタイムまでを専用画面で体験できます。",
    points: ["初当りはREG60枚・赤BIG100枚・青BIG300枚", "リオチャンスは6G＋α＋狙えまでの2部構成", "STは純増約0.4枚/G・平均RC約2個", "SSTは純増約5.1枚/G・平均RC約5個"],
    specs: [["BONUS初当り（設定1）", "約1/241.7"], ["BONUS初当り（設定6）", "約1/181.3"], ["RC高確（設定1）", "約1/417.6"], ["RC高確（設定6）", "約1/312.1"], ["ベース", "約31.4G/50枚"], ["初当りREG", "60枚"], ["初当り赤7BIG", "100枚"], ["初当り青7BIG", "300枚"], ["リオチャンス", "昇格6G＋α／ジャッジ不定"], ["STOCK TIME", "50〜777G・純増約0.4枚/G"], ["SUPER STOCK TIME", "100G以上・純増約5.1枚/G"]],
    articleSections: [
      { heading: "初当り3種類とリオチャンス高確", paragraphs: ["初当り振り分けはREG45.7%、赤7BIG49.4%、青7BIG4.9%。純増は約5.1枚/Gで、REGは60枚、赤7BIGは100枚、青7BIGは300枚です。", "BIG後はリオチャンス高確へ。REG後は通常へ戻り、通常ゲーム数を引き継ぎます。専用画面では初当り種類をPUSHで開き、BIG時だけリオチャンス高確へ進みます。"] },
      { heading: "6G＋αのリオチャンス", paragraphs: ["リオチャンスは前半の昇格パートと後半のジャッジパートで構成。前半は6G＋α、毎ゲームの昇格期待度は約1/2です。レア役で超昇格へ入ると減算が止まり、2段階昇格のチャンスになります。", "後半は約1/3で発生する狙えカットインまで継続し、狙えが来なければ報酬が必ず昇格。PUSHでREG、赤BIG、青BIG、SUPER BIG、EPISODE、SSTのいずれかを開きます。"] },
      { heading: "RC経由BONUSとST抽選", paragraphs: ["RC経由の報酬はREG60枚、赤7BIG200枚、青7BIG300枚、SUPER BIG400枚、EPISODE BONUS400枚、SP EPISODE BONUS200枚または500枚。BONUSは純増約5.1枚/Gです。", "青7BIGはST期待度約30%、SUPER BIGは約50%、EPISODE BONUSはST濃厚。BONUS後にSTへ入らなかった場合もRC高確へ戻り、SBJループの再当選を狙います。"] },
      { heading: "STOCK TIME", paragraphs: ["STOCK TIMEは純増約0.4枚/G、50〜777G継続するRCストック高確。平均RCストックは約2個で、リプレイ・レア役・リーチ目から最大7個まで獲得する可能性があります。", "100G以上の選択率は約10.2%。ストックは50Gまたは100Gの区切りで放出され、RC→BONUS→残りSTへ復帰する流れを専用履歴で表示します。"] },
      { heading: "SUPER STOCK TIMEとジョーカーモード", paragraphs: ["SSTは設定1で約1/6518.3、100G以上・純増約5.1枚/G・平均RCストック約5個。200G以上の選択率は約14%です。", "REGが続いた先の金BARからSP EPISODE BONUSを獲得するとジョーカーモードへ。シミュレーターではSSTを上位ルートとして進行し、ジョーカーモードは記事内で仕組みを解説します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約31.4G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6のBONUS初当り・RC高確は公開設定別値を使用", "初当り、RC昇格、報酬BONUS、ST、SSTを機種専用進行", "初当り3種類の振り分けとBONUS枚数は公開値", "RC初期配列・未公表の細かな昇格率や再高確率は体験用代表値"] }
    ],
    sources: [["山佐ネクスト 公式機種サイト", "https://yamasa-next.co.jp/slot/spbjck/"], ["山佐 公式ガイドブック", "https://www.cdn.yamasa.jp/guide_book/sbj_gb.pdf"], ["一撃 機種解析", "https://1geki.jp/slot/l_sbj/"], ["なな徹 リオチャンス解析", "https://nana-press.com/kaiseki/machine/876/27148/"], ["なな徹 STOCK TIME解析", "https://nana-press.com/kaiseki/machine/876/27153/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10174"]],
    readerGuide: { verdict: "初当りBIGからリオチャンス高確へ入り、昇格型RCとBONUS、STのストック放出を往復するループ型です。", bestFor: ["RCの6G昇格と狙えPUSHを体験したい", "BONUS種類ごとの枚数とST期待度を比べたい", "SSTでRCストックをまとめて獲得したい"], check: ["初当り振り分け、BONUS枚数、主要ゲーム数、純増は公開値", "STとSSTのゲーム数・平均ストック差を反映", "RC初期配列など未公表部分は体験用代表値"], compare: [["magical-halloween8", "マジカルハロウィン8", "A＋ARTストック型と比較"], ["fire-force-slot", "Lパチスロ 炎炎ノ消防隊", "BONUSループ型と比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v24", dedicatedFlow: true, dedicatedFlowKey: "super-blackjack-slot", dedicatedFlowVersion: 2, superBlackjackFlow: true,
    triggerLabel: "BONUS初当り", triggerRate: 241.7, triggerSuccess: 0.579, mainLabel: "リオチャンス", mainRate: 417.6, base50: 31.4, coinUnit: 3.0, normalMin: 0, normalMax: 0, atPureIncrease: 0.4, upperPureIncrease: 5.1, atPayoutVariance: 0,
    sbjInitialBonuses: [[{ key: "reg", label: "REGULAR BONUS", games: 12, award: 60, rcHigh: false }, 0.457], [{ key: "red", label: "赤7 BIG BONUS", games: 20, award: 100, rcHigh: true }, 0.494], [{ key: "blue", label: "青7 BIG BONUS", games: 59, award: 300, rcHigh: true }, 0.049]],
    sbjRcRewards: [[{ key: "reg", label: "REGULAR BONUS", games: 12, award: 60, stChance: 0.04 }, 0.28], [{ key: "red", label: "赤7 BIG BONUS", games: 39, award: 200, stChance: 0.12 }, 0.32], [{ key: "blue", label: "青7 BIG BONUS", games: 59, award: 300, stChance: 0.30 }, 0.20], [{ key: "super", label: "SUPER BIG BONUS", games: 78, award: 400, stChance: 0.50 }, 0.12], [{ key: "episode", label: "EPISODE BONUS", games: 78, award: 400, stChance: 1 }, 0.06], [{ key: "sst", label: "SUPER STOCK TIME", games: 0, award: 0, sst: true }, 0.02]],
    sbjRcUpgradeGames: 6, sbjRcUpgradeChance: 0.50, sbjRcCutInChance: 1 / 3, sbjRcHighChance: 0.62, sbjMaxLoops: 12,
    sbjStGames: [[50, 0.898], [100, 0.086], [200, 0.0032], [300, 0.0032], [400, 0.0032], [500, 0.0032], [600, 0.0016], [777, 0.0016]], sbjStStocks: [[1, 0.28], [2, 0.44], [3, 0.18], [4, 0.07], [5, 0.03]],
    sbjSstGames: [[100, 0.86], [200, 0.035], [300, 0.025], [400, 0.020], [500, 0.020], [600, 0.015], [700, 0.015], [777, 0.010]], sbjSstStocks: [[3, 0.15], [4, 0.24], [5, 0.28], [6, 0.20], [7, 0.13]],
    specialLabel: "STOCK TIME", specialChance: 0.30, upperChallenge: "RC報酬昇格", upperChance: 1, upperSuccess: 0.02, upperLabel: "SUPER STOCK TIME", upperContinue: 0, upperPayout: 0,
    settingRates: { 1: { trigger: 241.7, main: 417.6, payout: 0.978 }, 2: { trigger: 238.8, main: 411.7, payout: 0.987 }, 3: { trigger: 235.9, main: 405.8, payout: 1.001 }, 4: { trigger: 201.8, main: 350.4, payout: 1.057 }, 5: { trigger: 194.9, main: 335.9, payout: 1.100 }, 6: { trigger: 181.3, main: 312.1, payout: 1.127 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyFireForceDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["fire-force-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "灰焔騎士団と初当りBONUS、2つの入口から伝導者の影を越え、炎炎ループとアドラバーストを目指す。",
    intro: "15G＋α・BONUS期待度約50%の灰焔騎士団、REG後30G＋α／炎炎BONUS後60G＋αの伝導者の影、15G＋α・BONUS期待度約61%の炎炎激闘、紅丸炎舞、森羅万象、アドラバーストまでを専用画面で体験できます。",
    points: ["灰焔騎士団は15G＋α・BONUS期待度約50%", "炎炎激闘は15G＋α・BONUS期待度約61%", "炎炎BONUS約230枚・REG／エピソードBONUS約85枚"],
    specs: [["初当り（設定1）", "約1/197"], ["初当り（設定6）", "約1/169"], ["BONUS（設定1）", "約1/291"], ["BONUS（設定6）", "約1/230"], ["炎炎ループ（設定1）", "約1/790"], ["炎炎ループ（設定6）", "約1/537"], ["ベース", "約33.8G/50枚"], ["純増", "約5.7枚/G"], ["灰焔騎士団", "15G＋α・BONUS期待度約50%"], ["伝導者バトル", "3G・勝利期待度約28%"], ["伝導者の影", "REG後30G＋α／炎炎BONUS後60G＋α"], ["炎炎激闘", "15G＋α・BONUS期待度約61%"], ["紅丸炎舞", "BONUS当選濃厚"], ["アドラバースト", "初期20G＋JAC・純増約5.7枚/G"]],
    articleSections: [
      { heading: "灰焔騎士団と初当りBONUS", paragraphs: ["通常時の入口は、十字目変換などから入る15G＋αの灰焔騎士団と、REG／炎炎BONUSの2系統です。灰焔騎士団は伝導者バトル発展率約1/8、バトル勝利期待度約28%、区間全体のBONUS期待度約50%です。", "シミュレーターでは通常時の初当りで入口を抽選し、灰焔騎士団は15Gを進めて最終PUSHでBONUS当落を開きます。"] },
      { heading: "伝導者の影とエピソードBONUS", paragraphs: ["初当りREGまたは炎炎BONUSでエピソードBONUSを取れなかった場合は伝導者の影へ。REG後は30G＋α、炎炎BONUS後は60G＋αの保証があります。", "エピソードBONUSはベルナビ10回・約85枚で、消化後は炎炎激闘へ。専用画面では伝導者の影を最後まで進め、エピソードBONUS当選をPUSHで判定します。"] },
      { heading: "炎炎激闘と炎炎ループ", paragraphs: ["炎炎激闘は1セット15G＋αのBONUS高確率状態で、BONUS期待度は約61%。エピソードに応じて最低2個以上の炎炎激闘ストックを持ち、ストックがある限り潜伏後に再突入します。", "炎炎激闘中のBONUSは約9割が炎炎BONUS／ラッキースケベられBONUS、残りはアクセルBONUS・エピソードBONUS・ジョーカーチャンスなど。1セットごとに15Gを進め、PUSHでBONUSと残りストックを表示します。"] },
      { heading: "紅丸炎舞・森羅万象・アドラバースト", paragraphs: ["紅丸炎舞はBONUS当選まで続く上位版の炎炎激闘で、当選するBONUSは炎炎BONUS以上。裏・炎炎激闘や森羅エピソードなどから森羅万象を目指します。", "森羅万象の最終PUSHに成功すると、初期20Gの小役ゲームと10G／20G／30GのJACで増やすアドラバーストへ。終了後は森羅万象 廻の引き戻しも抽選します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約33.8G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1・2・4・5・6を均等抽選し、初当り・BONUS・炎炎ループは公開設定別値を使用", "灰焔騎士団、伝導者の影、炎炎激闘ストック、紅丸炎舞、森羅万象、アドラバーストを専用進行", "エピソード当選率、特殊炎炎激闘・上位ルートの出現率など未公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/sai/spec/"], ["一撃 機種解析", "https://1geki.jp/slot/l_ennenn/"], ["必勝本 灰焔騎士団解析", "https://p.hisshobon.jp/machine/4288/1/102625"], ["必勝本 伝導者の影解析", "https://p.hisshobon.jp/machine/4288/1/102415"], ["必勝本 初当りBONUS解析", "https://p.hisshobon.jp/machine/4288/1/102414"], ["なな徹 紅丸炎舞解析", "https://nana-press.com/kaiseki/machine/738/21313/"]],
    readerGuide: { verdict: "灰焔騎士団または初当りBONUSからエピソードBONUSをつかみ、複数ストックの炎炎激闘でBONUSを重ねるループ型です。", bestFor: ["灰焔騎士団15Gの最終PUSHを体験したい", "炎炎激闘ストックとBONUS連を見たい", "紅丸炎舞からアドラバーストを狙いたい"], check: ["初当り・BONUS・炎炎ループ確率、主要ゲーム数は公開値", "炎炎BONUSと約85枚BONUSを分けて表示", "未公表の入口・特殊ルート振り分けは代表モデル"], compare: [["fire-force2-slot", "Lパチスロ 炎炎ノ消防隊2", "続編の炎炎大戦と比較"], ["paripi-koumei-slot", "スマスロ パリピ孔明", "BONUS＋ST型と比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v21", dedicatedFlow: true, dedicatedFlowKey: "fire-force-slot", dedicatedFlowVersion: 2, fireForceFlow: true,
    triggerLabel: "初当り", triggerRate: 197, triggerSuccess: 0.249, mainLabel: "炎炎ループ", mainRate: 790, base50: 33.8, coinUnit: 3.1, normalMin: 0, normalMax: 0, atPureIncrease: 5.7, upperPureIncrease: 5.7, atPayoutVariance: 0,
    fireForceEntries: [[{ key: "gray", label: "灰焔騎士団", games: 15, chance: 0.50 }, 0.344], [{ key: "bonus", label: "初当りBONUS", games: 1, chance: 1 }, 0.656]],
    fireForceInitialBonuses: [[{ key: "regular", label: "REGULAR BONUS", games: 15, award: 85, shadowGames: 30 }, 0.52], [{ key: "fire", label: "炎炎BONUS", games: 40, award: 230, shadowGames: 60 }, 0.43], [{ key: "episode", label: "エピソードBONUS", games: 15, award: 85, shadowGames: 0 }, 0.05]],
    fireForceGrayBonuses: [[{ key: "regular", label: "REGULAR BONUS", games: 15, award: 85, shadowGames: 30 }, 0.28], [{ key: "fire", label: "炎炎BONUS", games: 40, award: 230, shadowGames: 60 }, 0.47], [{ key: "episode", label: "エピソードBONUS", games: 15, award: 85, shadowGames: 0 }, 0.25]],
    fireForceShadowChance: 0.17,
    fireForceInitialStocks: [[2, 0.54], [3, 0.27], [4, 0.13], [5, 0.06]],
    fireForceBattleGames: 15, fireForceBattleChance: 0.61, fireForceMaxBattles: 14,
    fireForceLoopBonuses: [[{ key: "fire", label: "炎炎BONUS", games: 40, award: 230 }, 0.68], [{ key: "lucky", label: "ラッキースケベられBONUS", games: 40, award: 230 }, 0.22], [{ key: "accel", label: "アクセルBONUS", games: 15, award: 85 }, 0.045], [{ key: "episode", label: "エピソードBONUS", games: 15, award: 85, stock: 2 }, 0.035], [{ key: "joker", label: "ジョーカーチャンス", games: 15, award: 85, stock: 2 }, 0.02]],
    fireForceBenimaruChance: 0.035, fireForceShinraChance: 0.045, fireForceShinraGames: 8, fireForceShinraSuccess: 0.50,
    fireForceAdoraBaseGames: 20, fireForceAdoraJacs: [[{ label: "炎炎JAC", games: 10 }, 0.70], [{ label: "炎炎JAC BURST", games: 20 }, 0.23], [{ label: "炎炎JAC BURST", games: 30 }, 0.07]], fireForceAdoraMaxJacs: 10, fireForceAdoraContinue: 0.74, fireForceAdoraReturn: 0.92,
    specialLabel: "紅丸炎舞", specialChance: 0.035, upperChallenge: "森羅万象", upperChance: 0.045, upperSuccess: 0.50, upperLabel: "アドラバースト", upperContinue: 0.92, upperPayout: 0,
    settingRates: { 1: { trigger: 197, main: 790, bonus: 291, payout: 0.977 }, 2: { trigger: 194, main: 756, bonus: 282, payout: 0.992 }, 4: { trigger: 182, main: 669, bonus: 257, payout: 1.044 }, 5: { trigger: 173, main: 611, bonus: 239, payout: 1.101 }, 6: { trigger: 169, main: 537, bonus: 230, payout: 1.149 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyFireForce2DedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["fire-force2-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "REGから30G＋αの伝導者の罠へ。炎炎激闘・炎炎大戦を突破し、森羅万象とアドラバーストを狙う。",
    intro: "初当りはREGまたはSPエピソードBONUS。REG後の30G＋α『伝導者の罠』、15G＋αの炎炎激闘・炎炎大戦・紅J大戦、BONUS連、8Gの森羅万象、20G＋JACのアドラバーストまでを専用画面で体験できます。",
    points: ["REG約85枚・SPエピソードBONUS約200枚", "炎炎激闘は15G＋α・BONUS期待度約57%", "炎炎大戦は約80%、紅J大戦は約90%、森羅万象は8G・約28%"],
    specs: [["BONUS初当り（設定1）", "約1/272"], ["BONUS初当り（設定6）", "約1/227"], ["炎炎ループ（設定1）", "約1/684"], ["炎炎ループ（設定6）", "約1/486"], ["ベース", "約33G/50枚"], ["純増", "約5.8枚/G"], ["REG", "ベルナビ10回・約85枚"], ["SPエピソードBONUS", "約200枚・炎炎ループ濃厚"], ["伝導者の罠", "30G＋α"], ["炎炎激闘", "15G＋α・BONUS期待度約57%"], ["炎炎大戦", "15G＋α・BONUS期待度約80%"], ["紅J大戦", "15G＋α・BONUS期待度約90%"], ["森羅万象", "8G・成功期待度約28%"], ["アドラバースト", "20G＋JAC・期待獲得約2760枚"]],
    articleSections: [
      { heading: "初当りBONUSと伝導者の罠", paragraphs: ["通常時は十字目変換、十字リプレイ、規定ゲーム数からBONUSを目指します。初当りは主にベルナビ10回・約85枚のREGで、終了後は30G＋αの『伝導者の罠』へ移行します。", "SPエピソードBONUSは約200枚を獲得し、消化後は炎炎激闘または炎炎大戦へ。専用画面ではREG／SPエピソードBONUSをPUSHで開き、伝導者の罠を30G進めて炎炎ループ当落を判定します。"] },
      { heading: "炎炎激闘・炎炎大戦・紅J大戦", paragraphs: ["炎炎激闘は15G＋αでBONUS期待度約57%。十字目変換や十字リプレイから伝導者決戦へ発展し、勝利でBONUSとなります。", "炎炎大戦は15G＋α・BONUS期待度約80%、上位の紅J大戦は約90%。BONUS当選後は同じ高確率状態へ戻るループを、1セットごとのPUSHで表示します。"] },
      { heading: "BONUSと炎炎BOOST", paragraphs: ["炎炎ループ中は約200枚の炎炎BONUS・ラッキースケベられBONUSを中心に、平均約550枚の炎炎BOOSTや上位報酬を抽選します。", "BONUS種類と獲得枚数をPUSH後に表示し、消化時間を設けてから次の炎炎ループへ進みます。REGは炎炎ループ中の報酬には含めません。"] },
      { heading: "森羅万象からアドラバーストへ", paragraphs: ["森羅万象は8G継続し、成功期待度は約28%。最終ゲームのPUSHで成功すればアドラバーストへ進みます。", "アドラバーストは純増約5.8枚/G、20Gの小役ゲームとJACで構成。JACは100〜300枚を獲得し、赤7揃い時は小役ゲーム数の上乗せも表示します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約33G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6のBONUS・炎炎ループ初当りと出玉率は公開値", "REG、伝導者の罠、3種類の炎炎ループ、森羅万象、アドラバーストを専用進行", "BONUS振り分け、炎炎大戦への昇格率など未公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["SANKYO 公式スペック", "https://www.sankyo-fever.jp/products/machine_list/sbh/spec/"], ["SANKYO オンライン博物館", "https://www.sankyo-fever.jp/collection/991/"], ["一撃 初当りBONUS解析", "https://1geki.jp/slot/l_ennenn2/61/"], ["一撃 炎炎大戦・紅J大戦解析", "https://1geki.jp/slot/l_ennenn2/83/"], ["必勝本 炎炎激闘解析", "https://p.hisshobon.jp/machine/4656/1/113912"], ["必勝本 アドラバースト解析", "https://p.hisshobon.jp/machine/4656/1/114001"]],
    readerGuide: { verdict: "約85枚のREG後に30G＋αの伝導者の罠を突破し、15G＋αのBONUS高確をループしてアドラバーストを狙うBONUS連鎖型です。", bestFor: ["REGから炎炎ループまでをPUSHで見たい", "炎炎激闘・炎炎大戦・紅J大戦の差を比べたい", "森羅万象からアドラバーストまで体験したい"], check: ["初当り・炎炎ループ確率、純増、主要ゲーム数は公開値", "炎炎ループ中のREGはなし", "未公表のBONUS振り分けは体験用代表値"], compare: [["fire-force-slot", "Lパチスロ 炎炎ノ消防隊", "前作スマスロと比較"], ["paripi-koumei-slot", "スマスロ パリピ孔明", "BONUS＋ST型と比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v20", dedicatedFlow: true, dedicatedFlowKey: "fire-force2-slot", dedicatedFlowVersion: 2, fireForce2Flow: true,
    triggerLabel: "初当りBONUS", triggerRate: 272, triggerSuccess: 0.398, mainLabel: "炎炎ループ", mainRate: 684, base50: 33, coinUnit: 3.6, normalMin: 0, normalMax: 0, atPureIncrease: 5.8, upperPureIncrease: 5.8, atPayoutVariance: 0,
    fireForce2InitialBonuses: [[{ key: "regular", label: "REGULAR BONUS", games: 15, award: 85, direct: false }, 0.96], [{ key: "special", label: "SPエピソードBONUS", games: 35, award: 200, direct: true }, 0.04]],
    fireForce2TrapGames: 30, fireForce2TrapChance: 0.37,
    fireForce2LoopModes: [[{ key: "battle", label: "炎炎激闘", chance: 0.57 }, 0.80], [{ key: "rush", label: "炎炎大戦", chance: 0.80 }, 0.15], [{ key: "beni-j", label: "紅J大戦", chance: 0.90 }, 0.05]],
    fireForce2Bonuses: [[{ key: "fire", label: "炎炎BONUS", award: 200 }, 0.55], [{ key: "lucky", label: "ラッキースケベられBONUS", award: 200 }, 0.20], [{ key: "boost", label: "炎炎BOOST", award: 550 }, 0.20], [{ key: "super-boost", label: "超炎炎BOOST", award: 1150 }, 0.04], [{ key: "extra", label: "EX BONUS", award: 1000 }, 0.01]],
    fireForce2LoopGames: 15, fireForce2MaxLoops: 12, fireForce2ShinraChance: 0.08, fireForce2ShinraGames: 8, fireForce2ShinraSuccess: 0.28,
    fireForce2AdoraBaseGames: 20, fireForce2AdoraJacChance: 0.72, fireForce2AdoraMaxJacs: 10, fireForce2AdoraJacAwards: [[100, 0.58], [200, 0.30], [300, 0.12]], fireForce2AdoraGameAdds: [[5, 0.56], [10, 0.30], [20, 0.14]],
    specialLabel: "炎炎BOOST", specialChance: 0.20, upperChallenge: "森羅万象", upperChance: 0.08, upperSuccess: 0.28, upperLabel: "アドラバースト", upperContinue: 0, upperPayout: 0,
    settingRates: { 1: { trigger: 272, main: 684, payout: 0.977 }, 2: { trigger: 269, main: 662, payout: 0.988 }, 3: { trigger: 257, main: 617, payout: 1.012 }, 4: { trigger: 242, main: 546, payout: 1.056 }, 5: { trigger: 236, main: 518, payout: 1.102 }, 6: { trigger: 227, main: 486, payout: 1.149 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyParipiKoumeiDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["paripi-koumei-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "3種類のCZからLIVE BONUSへ。15G＋αのParty Timeで兵法書を生かしてボーナスを重ねる。",
    intro: "三歌の礼・英子の試練・石兵八陣から初当りボーナスを目指し、消化後は必ず15G＋αのST『Party Time』へ。9種類の兵法書、4Gのパリピミッション、閃KING孔明、渋谷決戦、超Party Timeまでを専用画面で体験できます。",
    points: ["CZは三歌の礼約33%・英子の試練約50%・石兵八陣約85%", "Party Timeは15G＋α・継続約73%・兵法書は全9種類", "渋谷決戦は4G・勝利期待度約84%、超Party Timeは継続約81%"],
    specs: [["BONUS初当り（設定1）", "約1/309.9"], ["BONUS初当り（設定6）", "約1/228.8"], ["CZ合算", "約1/213.6〜1/171.7"], ["三歌の礼", "7G×最大3セット・期待度約33%"], ["英子の試練", "16G・期待度約50%"], ["石兵八陣", "15G・期待度約85%"], ["LIVE BONUS", "赤7約200枚・白7約400枚"], ["BONUS純増", "約4.2枚/G"], ["Party Time", "15G＋α・継続約73%"], ["渋谷決戦", "4G・勝利期待度約84%"], ["超Party Time", "15G＋α・継続約81%"]],
    articleSections: [
      { heading: "3種類のパリピチャンス", paragraphs: ["通常時は約32G周期のステージチェンジやレア役からCZ・ボーナスを目指します。ボーナス当選の約66%がCZ経由です。", "三歌の礼は1セット7G・最大3セットで期待度約33%、英子の試練は16G・期待度約50%、石兵八陣は15Gで小役4回成立を目指し期待度約85%。専用画面ではCZごとのゲーム数を進め、最後のPUSHで当落を開きます。"] },
      { heading: "LIVE BONUSと9種類の兵法書", paragraphs: ["LIVE BONUSは赤7が平均約200枚、白7が平均約400枚で、純増約4.2枚/G。ボーナス中は兵法書ポイント、HEYHO ZONE、上乗せバンバンを抽選します。", "兵法書はチェリー・スイカ・チャンス目対応、ベルナビ、ミッション発展、臥龍転生、STホールド、赤7強化、Vストックの全9種類。平均3.4個の獲得を代表分布で抽選し、ST画面へ表示します。"] },
      { heading: "15G＋αのParty Time", paragraphs: ["ボーナス後は必ずParty Timeへ。1セット15G＋α・継続約73%で、ベル・レア役・パリピミッション・DIVAフリーズ・閃KING孔明から次のボーナスを狙います。", "パリピミッションは4G・成功期待度約36%。臥龍転生は小役を1回引けば成功となる約75%の特殊ミッション、閃KING孔明は2択成功でボーナスとなる期待度50%の演出です。"] },
      { heading: "渋谷決戦から上位STへ", paragraphs: ["通常STの5連目は12.5%、7連目は25%、10連目はボーナス当選時に渋谷決戦ボーナスが選ばれるチャンス。ボーナスは平均約150枚で、終了後に4G・勝利期待度約84%の渋谷決戦へ進みます。", "勝利時は30Gのエピローグを経て、15G＋α・継続約81%の超Party Timeへ。エンディング後の天下泰平への道は15Gで究極孔明を抽選し、非当選でも超Party Timeへ進みます。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約31G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6を均等抽選し、CZ3種類・CZ合算・BONUS初当りの公開設定別値を使用", "CZゲーム数、ST15G、ミッション4G、渋谷決戦4G、エピローグ30Gを反映", "未公表のCZ選択・兵法書獲得・特化ゾーン発生率は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["山佐ネクスト 公式機種サイト", "https://yamasa-next.co.jp/slot/prskkm/"], ["一撃 3種類のCZ・設定差", "https://1geki.jp/slot/l_paripikoumei/0/"], ["一撃 Party Time解析", "https://1geki.jp/slot/l_paripikoumei/81/"], ["一撃 LIVE BONUS解析", "https://1geki.jp/slot/l_paripikoumei/85/"], ["一撃 渋谷決戦解析", "https://1geki.jp/slot/l_paripikoumei/89/"], ["一撃 兵法書解析", "https://1geki.jp/slot/l_paripikoumei/83/"]],
    readerGuide: { verdict: "3種類のCZから初当りボーナスをつかみ、15G＋αのSTで9種類の兵法書を生かしながらボーナス連を目指す直ST型です。", bestFor: ["CZごとのゲーム性とPUSH当落を比較したい", "兵法書を集めてParty Timeを伸ばしたい", "渋谷決戦から上位STまで一続きで体験したい"], check: ["CZ・ST・渋谷決戦の主要ゲーム数は公開値", "9種類の兵法書と赤7・白7を個別表示", "未公表の当選率は体験用代表値"], compare: [["aobuta-slot", "スマスロ 青春ブタ野郎", "ボーナス＋ST型と比較"], ["kanokari-slot", "スマスロ 彼女、お借りします", "ボーナス連鎖型と比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v20", dedicatedFlow: true, dedicatedFlowKey: "paripi-koumei-slot", dedicatedFlowVersion: 2, paripiFlow: true,
    triggerLabel: "パリピチャンス（CZ）", triggerRate: 213.6, triggerSuccess: 0.69, mainLabel: "Party Time", mainRate: 309.9, base50: 31.0, coinUnit: 3.3, normalMin: 0, normalMax: 0, atPureIncrease: 4.2, upperPureIncrease: 4.2, atPayoutVariance: 0,
    paripiCzRoutes: [
      { key: "sanka", label: "三歌の礼", games: 7, maxSets: 3, chance: 0.33 },
      { key: "eiko", label: "英子の試練", games: 16, chance: 0.50 },
      { key: "sekibei", label: "石兵八陣", games: 15, chance: 0.85 }
    ],
    paripiScrolls: ["桜桃当当", "西瓜当当", "好機当当", "鈴々指示", "鈴任発展", "臥龍高確", "刻々凍結", "赤七強化", "武威貯留"],
    paripiMissionTypes: [[{ key: "drive", label: "ドライブナイト", chance: 0.30 }, 0.24], [{ key: "dance", label: "スピーカーダンス", chance: 0.36 }, 0.22], [{ key: "glasses", label: "パリピ眼鏡", chance: 0.43 }, 0.18], [{ key: "koumei", label: "孔明光臨", chance: 0.52 }, 0.15], [{ key: "azalea", label: "エピソードAZALEA", chance: 0.68 }, 0.10], [{ key: "dreamer", label: "エピソードDREAMER", chance: 0.82 }, 0.07], [{ key: "garyu", label: "臥龍転生", chance: 0.75 }, 0.04]],
    paripiRedBonus: 200, paripiWhiteBonus: 400, paripiWhiteChance: 0.16, paripiAverageScrolls: 3.4, paripiHeyhoGames: 5,
    paripiStGames: 15, paripiStContinue: 0.73, paripiMissionGames: 4, paripiMissionChance: 0.36, paripiSenkingRate: 420, paripiSenkingChance: 0.50, paripiMaxLoops: 15,
    paripiShibuyaBonus: 150, paripiShibuyaGames: 4, paripiShibuyaSuccess: 0.84, paripiEpilogueGames: 30,
    paripiUpperContinue: 0.81, paripiUpperMaxLoops: 10, paripiUltimateChallengeGames: 15, paripiUltimateContinue: 0.91, paripiUltimateMaxLoops: 10,
    specialLabel: "兵法書／HEYHO ZONE", specialChance: 0.24, upperChallenge: "渋谷決戦", upperChance: 0.16, upperSuccess: 0.84, upperLabel: "超Party Time", upperContinue: 0.81, upperPayout: 0,
    settingRates: {
      1: { trigger: 213.6, main: 309.9, sanka: 369.9, eiko: 701.9, sekibei: 1809.0, payout: 0.976 },
      2: { trigger: 207.3, main: 299.6, sanka: 359.9, eiko: 676.9, sekibei: 1761.7, payout: 0.989 },
      3: { trigger: 199.2, main: 280.0, sanka: 345.6, eiko: 648.8, sekibei: 1710.5, payout: 1.014 },
      4: { trigger: 188.8, main: 262.0, sanka: 332.1, eiko: 607.1, sekibei: 1564.5, payout: 1.045 },
      5: { trigger: 179.4, main: 243.9, sanka: 323.0, eiko: 560.9, sekibei: 1440.7, payout: 1.090 },
      6: { trigger: 171.7, main: 228.8, sanka: 314.8, eiko: 528.4, sekibei: 1324.4, payout: 1.136 }
    }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyMonsterHunterSunbreakDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["monster-hunter-sunbreak"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "BREAK ZONEを突破し、40G＋αのRUSHへ。盟勇クエストで討伐と上乗せを重ねる。",
    intro: "BREAK ZONE・アイルー福引・猛焔一閃からサンブレイクRUSHへ。AT中は盟勇参戦、5G以上の盟勇クエスト、モンスター討伐、剥ぎ取りRUSH、キュリアチャンスを経て、勇気の証明と上位ATを目指します。",
    points: ["BREAK ZONEは5G×最大10セット・設定1のAT期待度37.1%", "盟勇クエストはST5G＋討伐3G＋決着1G", "剥ぎ取りRUSHは50・60・70・80%継続、平均上乗せ約86G"],
    specs: [["AT初当り（設定1）", "約1/349.9"], ["AT初当り（設定6）", "約1/242.3"], ["BREAK ZONE", "約1/111.4〜1/95.8"], ["アイルー福引", "約1/2290.1〜1/976.4"], ["AT", "40G＋α・純増約2.7枚/G"], ["キュリア揃い", "約1/5.6"], ["盟勇クエスト", "ST5G＋討伐3G＋決着1G"], ["剥ぎ取りRUSH", "50・60・70・80%継続"], ["キュリアチャンス", "1セット3G・平均上乗せ約187G"], ["勇気の証明", "4G・期待度約40%"], ["上位AT", "50G＋α・純増約6.6枚/G"]],
    articleSections: [
      { heading: "3つの入口からATへ", paragraphs: ["BREAK ZONEは1セット5G。1〜4G目に継続率を上げ、5G目のジャッジを繰り返します。10セット継続で猛焔一閃へ進み、設定1のAT期待度は37.1%、完走期待度は4.6%です。", "アイルー福引は10G＋α・成功期待度約60%。猛焔一閃直撃を含め、専用画面では選ばれた入口のゲーム数を進め、最後のPUSHでAT当落を開きます。"] },
      { heading: "40G＋αのサンブレイクRUSH", paragraphs: ["下位ATは初期40G＋α、純増約2.7枚/G。AT中は約1/5.6のキュリア揃い・レア役から盟勇参戦や盟勇クエストを抽選します。", "専用画面では残りゲーム数を減らしながら、盟勇クエスト、サンブレイクBONUS、キュリアチャンスの発生を時系列で表示します。"] },
      { heading: "盟勇クエストと13体のモンスター", paragraphs: ["盟勇クエストはSTパート5G（ヒノエ参戦時6G）、討伐パート3G、決着パート1G。討伐成功で20・30・40・50・100Gまたは剥ぎ取りRUSHを獲得し、STが再セットされます。", "リオレウスからメル・ゼナ、怨嗟響めくマガイマガド、アマツマガツチまで13体を収録。モンスターごとの討伐期待度と剥ぎ取りRUSH継続率を結果へ反映します。"] },
      { heading: "剥ぎ取りRUSHとキュリアチャンス", paragraphs: ["剥ぎ取りRUSHは初回継続保証。20・50・100・200Gの上乗せを50・60・70・80%でループし、平均上乗せは約86Gです。怨嗟響めくマガイマガド討伐時は80%ループ濃厚です。", "キュリアチャンスは1セット3GのST型。キュリア揃い・レア役でゲーム数を上乗せして3Gを再セットし、平均上乗せは約187Gです。"] },
      { heading: "勇気の証明から上位ATへ", paragraphs: ["AT終了時の一部で4Gの『勇気の証明』へ進み、ガイアデルム討伐成功でエンディングを経て上位ATへ。トータル期待度は約40%です。", "上位『サンブレイクRUSH G』は初期50G＋α・純増約6.6枚/G。終了時の『滅浄の裁き』は4G・期待度約47%で、成功すれば上位ATへ復帰します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約31.9G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6を均等抽選し、CZ・AT初当りは公開設定別値を使用", "CZゲーム数、盟勇クエスト構成、上乗せゲーム数、特化継続率、上位純増を反映", "未公表の入口選択・盟勇参戦・特化ゾーン当選率は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["エンターライズ 公式機種情報", "https://www.enterrise.co.jp/slot/mhrsb/"], ["一撃 設定差・CZ解析", "https://1geki.jp/slot/l_mh_sun/0/"], ["一撃 盟勇クエスト解析", "https://1geki.jp/slot/l_mh_sun/83/"], ["一撃 剥ぎ取りRUSH解析", "https://1geki.jp/slot/l_mh_sun/85/"], ["必勝本 勇気の証明・滅浄の裁き", "https://p.hisshobon.jp/machine/4830/1/14"]],
    readerGuide: { verdict: "40G＋αのATで残りゲーム数を管理し、盟勇クエストの討伐報酬と剥ぎ取りRUSHでゲーム数を伸ばして上位ATを狙うハンティング型です。", bestFor: ["BREAK ZONEのセット継続をPUSHで確認したい", "盟勇クエストでモンスター別の討伐を楽しみたい", "剥ぎ取りRUSHと上位ATまで一続きで体験したい"], check: ["CZ・AT・クエストの主要ゲーム数は公開値", "13体のモンスターと公開上乗せ種類を収録", "未公表の当選率は体験用代表値"], compare: [["monster-hunter-rise-slot", "スマスロ モンスターハンターライズ", "前作の討伐型ATと比較"], ["god-eater-resurrection", "ゴッドイーター リザレクション", "モンスター交戦型ATと比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v19", dedicatedFlow: true, dedicatedFlowKey: "monster-hunter-sunbreak", dedicatedFlowVersion: 2, sunbreakFlow: true,
    triggerLabel: "CZ（BREAK ZONE／アイルー福引）", triggerRate: 105.5, triggerSuccess: 0.371, mainLabel: "サンブレイクRUSH", mainRate: 349.9, base50: 31.9, coinUnit: 3.2, normalMin: 0, normalMax: 0, atPureIncrease: 2.7, upperPureIncrease: 6.6, atPayoutVariance: 0,
    sunbreakBreakZoneGames: 5, sunbreakBreakZoneMaxSets: 10, sunbreakBreakZoneChance: 0.371, sunbreakBreakZoneComplete: 0.046,
    sunbreakAilooGames: 10, sunbreakAilooChance: 0.60, sunbreakInitialGames: 40, sunbreakUpperInitialGames: [[50, 0.58], [70, 0.27], [100, 0.15]],
    sunbreakQuestRate: 83.5, sunbreakQuestStGames: 5, sunbreakQuestBattleGames: 3, sunbreakQuestDecisionGames: 1, sunbreakMaxEvents: 14,
    sunbreakMonsters: [
      [{ key: "rathalos", label: "リオレウス", chance: 0.52, carveRate: 0.50 }, 0.13], [{ key: "tigrex", label: "ティガレックス", chance: 0.54, carveRate: 0.50 }, 0.12], [{ key: "espinas", label: "エスピナス", chance: 0.56, carveRate: 0.50 }, 0.10], [{ key: "aurora", label: "イソネミクニ亜種", chance: 0.58, carveRate: 0.50 }, 0.09], [{ key: "garangolm", label: "ガランゴルム", chance: 0.60, carveRate: 0.50, carveChance: 0.55 }, 0.09], [{ key: "gore", label: "ゴア・マガラ", chance: 0.62, carveRate: 0.60 }, 0.09], [{ key: "pyre", label: "ヤツカダキ亜種", chance: 0.64, carveRate: 0.60 }, 0.08], [{ key: "lunagaron", label: "ルナガロン", chance: 0.66, carveRate: 0.60, carveChance: 0.55 }, 0.08], [{ key: "zinogre", label: "ジンオウガ", chance: 0.68, carveRate: 0.70 }, 0.07], [{ key: "flaming-espinas", label: "エスピナス亜種", chance: 0.70, carveRate: 0.70 }, 0.06], [{ key: "malzeno", label: "メル・ゼナ", chance: 0.74, carveRate: 0.70, carveChance: 1 }, 0.045], [{ key: "scorned", label: "怨嗟響めくマガイマガド", chance: 0.78, carveRate: 0.80, carveChance: 1 }, 0.035], [{ key: "amatsu", label: "アマツマガツチ", chance: 0.82, carveRate: 0.80, amatsu: true }, 0.025]
    ],
    sunbreakQuestRewards: [[20, 0.40], [30, 0.27], [40, 0.16], [50, 0.12], [100, 0.05]], sunbreakCarveRewards: [[20, 0.50], [50, 0.30], [100, 0.15], [200, 0.05]],
    sunbreakQuriaChance: 0.08, sunbreakQuriaReset: 0.68, sunbreakQuriaRewards: [[20, 0.48], [30, 0.26], [50, 0.18], [100, 0.08]], sunbreakBonusChance: 0.055,
    sunbreakCourageChance: 0.34, sunbreakCourageSuccess: 0.40, sunbreakPurificationSuccess: 0.47, sunbreakUpperMaxLoops: 3,
    specialLabel: "剥ぎ取りRUSH／キュリアチャンス", specialChance: 0.28, upperChallenge: "勇気の証明", upperChance: 0.34, upperSuccess: 0.40, upperLabel: "サンブレイクRUSH G", upperContinue: 0.47, upperPayout: 0,
    settingRates: {
      1: { trigger: 105.5, main: 349.9, bz: 111.4, ailoo: 2290.1, direct: 16281.7, payout: 0.975 },
      2: { trigger: 102.7, main: 337.0, bz: 108.8, ailoo: 2090.4, direct: 14875.5, payout: 0.988 },
      3: { trigger: 99.0, main: 319.8, bz: 105.6, ailoo: 1821.1, direct: 12788.0, payout: 1.008 },
      4: { trigger: 92.0, main: 283.6, bz: 99.3, ailoo: 1472.5, direct: 8702.1, payout: 1.052 },
      5: { trigger: 88.8, main: 264.0, bz: 97.2, ailoo: 1219.3, direct: 6351.2, payout: 1.084 },
      6: { trigger: 85.5, main: 242.3, bz: 95.8, ailoo: 976.4, direct: 4263.1, payout: 1.124 }
    }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyJuohDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["juoh-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "ベルナビ10・20・30回から、最大29Gの潜伏を経てサバ連へ。超サバで4大トリガーを狙う。",
    intro: "SC高確を突破して純増約8.0枚/Gのサバンナチャンスへ。ベルナビ回数、最大29Gの潜伏、ストック放出、超サバ、キリンサバチャン・サバチャンEX・100ナビフリーズ・REGまでを専用画面で体験できます。",
    points: ["SCはベルナビ10・20・30回・EX、20ナビ以上は約1/3", "初回SCからサバ連へ進む期待度は約50%", "超サバ後は4大サバンナトリガーが発生しやすい"],
    specs: [["SC初当り（設定1）", "約1/326.5"], ["SC初当り（設定6）", "約1/279.7"], ["ベース", "約31.8G/50枚"], ["AT純増", "約8.0枚/G"], ["SCベルナビ", "10・20・30回・EX"], ["20ナビ以上", "約1/3"], ["サバ連期待度", "約50%"], ["潜伏", "最大29G"], ["KSC継続率", "約80%／90%"], ["BIG", "15G・純増約8.0枚/G"], ["REG", "10G・超サバ濃厚"]],
    articleSections: [
      { heading: "SC高確からサバンナチャンスへ", paragraphs: ["通常時はチャンス目・レア役・規定ゲーム数などからSC高確へ移行し、高確中は全役でサバンナチャンスを抽選します。SC高確中の当選期待度は約50%です。", "専用画面では通常ゲームを進めたあと、SC高確を2秒間消化し、最後のPUSHでサバンナチャンスの当落を開きます。"] },
      { heading: "ベルナビ回数と最大29Gの潜伏", paragraphs: ["サバンナチャンスは純増約8.0枚/G。ベルナビ回数は10・20・30回・EXで、20ナビ以上の選択率は約1/3です。", "SC終了後は必ず潜伏へ移り、ストックがあれば最大29Gを経て次のSCを放出します。専用画面ではSCごとのナビ回数・獲得枚数と、潜伏後のストック放出を別々に表示します。"] },
      { heading: "BIG・REGとSCストック", paragraphs: ["BIGは15G・純増約8.0枚/Gで、レア役やダチョウ揃いなどからSCストックを抽選します。160枚以上獲得時もSCストック濃厚です。", "REGは10Gの上乗せ超高確率。押し順ベルの約66%でSCストック、レア役はストック濃厚となり、終了後は超サバへ移行します。"] },
      { heading: "超サバと4大サバンナトリガー", paragraphs: ["SC2セット目以降は超サバを抽選し、5セット目以降はチャンスが高まります。超サバ獲得後は4大トリガーの発生率が上がります。", "4大トリガーは、継続率約80%または90%のキリンサバチャン、30ナビがループするサバチャンEX、100ナビフリーズ、REGです。専用画面ではトリガーをPUSHで開き、その後のループも個別に進行します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約31.8G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1・2・4・5・6を均等抽選し、公開SC初当りを使用", "SC純増、ナビ回数、潜伏、BIG／REGゲーム数、KSC継続率を反映", "未公表のSCストック数・超サバ・4大トリガー振り分けは体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["サミー 新機種発表", "https://www.sammy.co.jp/japanese/news/detail/?id=290"], ["パチマガスロマガFREE 機種解析", "https://pachimaga.com/free/mach/maker-s/sammy/l_jyuoh.php"], ["パチマガスロマガFREE AT解析", "https://psmaga.com/e/pachi/pla/s_conq/sammy_slot/228/at02.php"], ["必勝本 ボーナス解説", "https://p.hisshobon.jp/machine/4786/1/11"]],
    readerGuide: { verdict: "ベルナビ回数ごとのSCを消化し、最大29Gの潜伏からストックを放出しながら超サバと4大トリガーを狙うストック連タイプです。", bestFor: ["SCごとのナビ回数と獲得枚数を確認したい", "潜伏からのサバ連をPUSHで体験したい", "超サバ後のKSC・EX・100ナビ・REGを狙いたい"], check: ["SC純増・ナビ回数・潜伏・BONUSゲーム数は公開値", "KSCは80%／90%を個別抽選", "未公表のストック数とトリガー振り分けは代表値"], compare: [["okidoki-gold", "沖ドキ！GOLD", "潜伏後の連チャン型と比較"], ["million-god-kiseki", "ミリオンゴッド 神々の軌跡", "ストック放出型ATと比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v18", dedicatedFlow: true, dedicatedFlowKey: "juoh-slot", dedicatedFlowVersion: 2, juohFlow: true,
    triggerLabel: "SC高確", triggerRate: 163.3, triggerSuccess: 0.50, mainLabel: "サバンナチャンス", mainRate: 326.5, base50: 31.8, coinUnit: 4.0, normalMin: 0, normalMax: 0, atPureIncrease: 8.0, atPayoutVariance: 0,
    juohScNavi: [[10, 0.67], [20, 0.25], [30, 0.08]], juohSabaChainChance: 0.50, juohMaxSc: 18, juohMaxLatentGames: 29,
    juohBigGames: 15, juohBigChance: 0.10, juohRegGames: 10, juohRegChance: 0.012, juohBonusStockRates: [[1, 0.72], [2, 0.20], [3, 0.07], [5, 0.01]],
    juohSuperChanceEarly: 0.035, juohSuperChanceLate: 0.18, juohTriggerTypes: [[{ key: "ksc", label: "キリンサバチャン" }, 0.38], [{ key: "ex", label: "サバチャンEX" }, 0.30], [{ key: "freeze", label: "100ナビフリーズ" }, 0.20], [{ key: "reg", label: "REGULAR BONUS" }, 0.12]],
    juohKscRates: [[0.80, 0.72], [0.90, 0.28]], juohExContinue: 0.72,
    specialLabel: "サバ連", specialChance: 0.50, upperChallenge: "超サバ", upperChance: 0.18, upperSuccess: 1, upperLabel: "4大サバンナトリガー", upperContinue: 0.85, upperPayout: 0,
    settingPool: [1, 2, 4, 5, 6], settingRates: { 1: { trigger: 163.3, main: 326.5, payout: 0.978 }, 2: { trigger: 160.8, main: 321.6, payout: 0.987 }, 4: { trigger: 147.9, main: 295.8, payout: 1.056 }, 5: { trigger: 143.8, main: 287.6, payout: 1.086 }, 6: { trigger: 139.9, main: 279.7, payout: 1.143 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyMillionGodKisekiDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["million-god-kiseki"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "50GのGOD GAMEからG-ZONEへ。Z-GAME・SGG・GOD揃いでGGストックを重ねる。",
    intro: "液晶奇数揃いから純増約7.0枚/G・50GのGOD GAMEへ。5GのG-ZONE、0揃いからのZ-ZONE／Z-GAME、赤7のSGG、GOD揃いのPREMIUM GOD GAMEまでを専用画面で体験できます。",
    points: ["GOD GAMEは50G・純増約7.0枚/G", "G-ZONEは5Gで次セットを告知", "GOD揃いは1/16384・GG4セット以上＋高ループ"],
    specs: [["GG初当り（設定1）", "約1/532.8"], ["GG初当り（設定6）", "約1/294.8"], ["ベース", "約30.8G/50枚"], ["GOD GAME", "50G・純増約7.0枚/G"], ["G-ZONE", "5G"], ["Z-ZONE", "5G＋α・黄7約1/1.4"], ["Z-GAME", "黄7揃いごとにGGストック"], ["赤7揃い", "約1/6900・SGG"], ["SGG", "10〜100G・継続約75%"], ["GOD揃い", "1/16384・GG4セット以上"]],
    articleSections: [
      { heading: "50GのGOD GAMEと5GのG-ZONE", paragraphs: ["GOD GAMEは1セット50G・純増約7.0枚/G。消化中はレア役や小役履歴でGGストックを抽選し、終了後は5GのG-ZONEで次セットを告知します。", "専用画面ではGGを50Gまで進め、G-ZONEの最後にPUSHで奇数揃いを開きます。ストックまたはループ抽選に当選していれば次のGGへ進み、どちらもなければ終了します。"] },
      { heading: "0揃いからZ-ZONE・Z-GAMEへ", paragraphs: ["Z-ZONEは5G＋αのフルナビ区間で、黄7は約1/1.4。黄7履歴を5個埋めるとGGストックを獲得し、Z-GAMEへ移行します。", "Z-GAMEでは黄7が成立するたびにGGを1セット上乗せします。シミュレーターは黄7履歴を1Gずつ表示し、5連達成後に獲得ストック数をPUSHで開きます。"] },
      { heading: "赤7のSGG", paragraphs: ["赤7揃いは約1/6900でSGGへ。SGGは1セット10〜100G、継続率約75%で、セット中の赤7揃いによりGGストックを獲得します。", "専用画面ではSGGのセットゲーム数、継続ジャッジ、獲得したGGストックを分けて表示します。赤7確率やセット振り分けは公表値を優先し、未公表の細部は代表値です。"] },
      { heading: "GOD揃いはGG4セット以上", paragraphs: ["GOD揃いは1/16384。PREMIUM GOD GAMEへ移行し、GG4セット以上と高継続ループストックが濃厚、期待枚数は3000枚以上とされています。", "GOD揃いは実際の確率に近い低確率で抽選し、当選時は専用PUSHのあと4セットをストックし、ループ率を強化します。毎回発生する演出ではありません。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約30.8G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6を均等抽選し、GG初当りは公開設定別値を使用", "GG50G、G-ZONE5G、Z-ZONE黄7約1/1.4、赤7・GOD確率を反映", "内部モード、全役別抽選、ループストック選択率、特化ゾーン振り分けは代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ユニバーサル公式機種情報", "https://www.universal-777.com/product/slot/milliongod_kiseki/"], ["P-WORLD 機種情報", "https://www.p-world.co.jp/machine/database/10424"], ["一撃 機種解析", "https://1geki.jp/slot/l_milliongod_kiseki/"], ["パチマガスロマガFREE 機種解析", "https://pachimaga.com/free/mach/maker-s/mizuho/064801.php"]],
    readerGuide: { verdict: "50GのGGを消化し、5GのG-ZONEで次セットを開きながらZ-GAME・SGG・GOD揃いによるストックを狙うセット管理型です。", bestFor: ["G-ZONEのPUSHで次セットを確認したい", "Z-ZONEの黄7履歴からZ-GAMEを狙いたい", "SGGやGOD揃いのストック連鎖を体験したい"], check: ["純増・主要ゲーム数・赤7／GOD確率は公開値", "ストックとループ抽選を個別表示", "未公表の選択率は体験用代表値"], compare: [["okidoki-gold", "沖ドキ！GOLD", "32G天国ループと比較"], ["super-bingo-neo-slot", "スーパービンゴネオ", "セット継続型ATと比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v17", dedicatedFlow: true, dedicatedFlowKey: "million-god-kiseki", dedicatedFlowVersion: 2, millionGodFlow: true,
    triggerLabel: "GOD GAME", triggerRate: 532.8, triggerSuccess: 1, mainLabel: "GOD GAME", mainRate: 532.8, base50: 30.8, coinUnit: 4.0, normalMin: 0, normalMax: 0, atPureIncrease: 7.0, atPayoutVariance: 0,
    millionGodGgGames: 50, millionGodGZoneGames: 5, millionGodMaxSets: 15,
    millionGodLoopRates: [[0.01, 0.50], [0.25, 0.30], [0.50, 0.15], [0.80, 0.05]],
    millionGodZZoneChance: 0.15, millionGodYellowChance: 1 / 1.4, millionGodZGameStocks: [[1, 0.56], [2, 0.27], [3, 0.11], [4, 0.05], [5, 0.01]],
    millionGodRed7Rate: 6900, millionGodSggContinue: 0.75, millionGodSggGames: [[10, 0.83], [20, 0.114], [30, 0.034], [50, 0.017], [100, 0.005]],
    millionGodGodRate: 16384, millionGodGodStocks: 4,
    specialLabel: "Z-GAME／SGG", specialChance: 0.15, upperChallenge: "GOD揃い", upperChance: 50 / 16384, upperSuccess: 1, upperLabel: "PREMIUM GOD GAME", upperContinue: 0.80, upperPayout: 1400,
    settingRates: { 1: { trigger: 532.8, main: 532.8, payout: 0.972 }, 2: { trigger: 420.4, main: 420.4, payout: 0.991 }, 3: { trigger: 495.9, main: 495.9, payout: 1.021 }, 4: { trigger: 338.4, main: 338.4, payout: 1.069 }, 5: { trigger: 455.4, main: 455.4, payout: 1.117 }, 6: { trigger: 294.8, main: 294.8, payout: 1.146 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyGodEaterResurrectionDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["god-eater-resurrection"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "25G＋αのアラガミ交戦を突破し、捕喰報酬と上位STをつなぐ討伐型AT。",
    intro: "純増約9.0枚/Gのアラガミバーストで規定枚数を獲得し、25G＋αのアラガミ交戦へ。討伐後の『神を喰らえ』、OVERKILLの神機覚醒、逆鱗ハンニバル、リザレクションゲート、上位STまでを専用画面で体験できます。",
    points: ["アラガミ交戦は25G＋α・平均勝利期待度約76%", "報酬『神を喰らえ』は最低200枚", "上位ST『漆黒の捕喰者』はバトル勝利期待度約84%"],
    specs: [["AT初当り（設定1）", "約1/351.9"], ["アラガミバースト", "純増約9.0枚/G"], ["初回ストーリー", "100枚"], ["アラガミ交戦", "25G＋α"], ["交戦勝利期待度", "平均約76%"], ["神を喰らえ", "1G・最低200枚"], ["逆鱗ハンニバル", "50G＋α・勝利期待度約75%"], ["リザレクションゲート", "50〜99G"], ["漆黒の捕喰者", "勝利期待度約84%"], ["神堕", "継続期待度約90%"], ["ベース", "約31G/50枚"], ["設定", "1〜6ランダム"]],
    articleSections: [
      { heading: "ストーリーからアラガミ交戦へ", paragraphs: ["AT『アラガミバースト』は、規定枚数を獲得するストーリーパートと、25G＋αのアラガミ交戦で構成されます。初回ストーリーは100枚、以降は直前の報酬枚数を消化して交戦へ進みます。", "ストーリー中はリプレイ・レア役でフェンリルポイントを獲得し、MAX到達で結合崩壊ストックや枚数上乗せに期待できます。シミュレーターでは結合崩壊を交戦の勝率補助として表示します。"] },
      { heading: "アラガミ交戦は敵ごとに弱点が違う", paragraphs: ["アラガミ交戦は25G＋αで、平均勝利期待度は約76%。ハンニバルはチャンス目、エンハンス・アラガミはチェリー、ヴィーナスはスイカなど、対戦相手ごとに有効役が異なります。", "専用画面では対戦相手と弱点役を表示し、25Gを進めた後のPUSHで討伐結果を開きます。結合崩壊ストックがある場合は、その有利さも当落画面へ反映します。"] },
      { heading: "討伐報酬『神を喰らえ』", paragraphs: ["討伐成功後は1Gの報酬決定『神を喰らえ』へ進み、最低200枚を獲得します。壱式・ミズチ・パニッシャー・ベンディガー・金ノ咢・漆黒リンドウを段階別の報酬として表示します。", "OVERKILL時は強力な報酬決定『神機覚醒』へ。報酬種類やOVERKILL発生率など公表されていない細かな振り分けは、ゲーム性を体験するための代表値です。"] },
      { heading: "1,000枚以降の逆鱗ハンニバル", paragraphs: ["AT獲得が1,000枚を超えると、50G＋αの逆鱗ハンニバルが選ばれる可能性があります。勝利期待度は約75%で、敗北時も次回ATの100Gゾーンが濃厚となる救済があります。", "勝利時は残りゲーム数を加えた50〜99Gのリザレクションゲートへ。主人公覚醒なら勝利期待度約84%の上位ST『漆黒の捕喰者』、リンドウ覚醒なら継続期待度約90%のプレミアムAT『神堕』へ進みます。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約31G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6を均等抽選し、AT初当りは公開設定別値を使用", "純増、主要ゲーム数、交戦・上位の公開期待度、最低報酬を優先", "敵選択率、報酬振り分け、結合崩壊・OVERKILL・上位分岐は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["山佐ネクスト 公式ガイドブック", "https://www.cdn.yamasa.jp/guide_book/ger_gb.pdf"], ["山佐ネクスト 公式機種サイト", "https://www1.yamasa.co.jp/rsgdet/"], ["一撃 機種解析", "https://1geki.jp/slot/l_godeater_r/"], ["なな徹 アラガミ交戦", "https://nana-press.com/kaiseki/machine/767/22726/"], ["なな徹 報酬パート", "https://nana-press.com/kaiseki/machine/767/22727/"], ["なな徹 逆鱗ハンニバル", "https://nana-press.com/kaiseki/machine/767/23323/"], ["なな徹 リザレクションゲート", "https://nana-press.com/kaiseki/machine/767/22728/"]],
    readerGuide: { verdict: "100枚の初回ストーリーから25G＋αのアラガミ交戦へ入り、討伐報酬を積み重ねて上位STを目指す討伐ループ型です。", bestFor: ["対戦相手と弱点役を見ながら交戦したい", "討伐後のPUSHで報酬種類を開きたい", "逆鱗ハンニバルから上位STを狙いたい"], check: ["純増・主要ゲーム数・公開期待度・最低報酬を反映", "結合崩壊、OVERKILL、上位分岐を専用表示", "未公表の選択率・振り分けは体験用代表値"], compare: [["monster-hunter-rise-slot", "スマスロ モンハンライズ", "討伐報酬型ATと比較"], ["basilisk-tenzen-slot", "バジリスク天膳", "継続バトル型ATと比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v16", dedicatedFlow: true, dedicatedFlowKey: "god-eater-resurrection", dedicatedFlowVersion: 2, godEaterFlow: true,
    triggerLabel: "AT初当り", triggerRate: 351.9, triggerSuccess: 1, mainLabel: "アラガミバースト", mainRate: 351.9, base50: 31, coinUnit: 3.4, normalMin: 100, normalMax: 100, atPureIncrease: 9.0, atPayoutVariance: 0,
    godEaterEnemies: [[{ key: "hannibal", label: "ハンニバル", weak: "チャンス目", chance: 0.76 }, 0.24], [{ key: "aether", label: "エンハンス・アラガミ", weak: "チェリー", chance: 0.75 }, 0.18], [{ key: "venus", label: "ヴィーナス", weak: "スイカ", chance: 0.75 }, 0.16], [{ key: "tsukuyomi", label: "ツクヨミ", weak: "7揃い", chance: 0.80 }, 0.14], [{ key: "caligula", label: "カリギュラ", weak: "チェリー", chance: 0.79 }, 0.11], [{ key: "tezcatlipoca", label: "テスカトリポカ", weak: "チェリー・スイカ", chance: 0.84 }, 0.08], [{ key: "deus-pita", label: "ディアウス・ピター", weak: "リプレイ以外", chance: 0.86 }, 0.07], [{ key: "amaterasu", label: "アマテラス", weak: "全役", chance: 0.90 }, 0.02]],
    godEaterRewards: [[{ key: "type-1", label: "壱式", payout: 200 }, 0.42], [{ key: "mizuchi", label: "ミズチ", payout: 300 }, 0.25], [{ key: "punisher", label: "パニッシャー", payout: 400 }, 0.16], [{ key: "vendiger", label: "ベンディガー", payout: 510 }, 0.10], [{ key: "golden-jaw", label: "金ノ咢", payout: 700 }, 0.05], [{ key: "black-lindow", label: "漆黒リンドウ", payout: 1000 }, 0.02]],
    godEaterAwakenRewards: [[510, 0.55], [700, 0.28], [1000, 0.14], [1500, 0.03]],
    godEaterBattleGames: 25, godEaterBattleChance: 0.76, godEaterBondBreakChance: 0.28, godEaterOverkillChance: 0.16, godEaterMaxBattles: 10,
    godEaterHannibalThreshold: 1000, godEaterHannibalChance: 0.45, godEaterHannibalGames: 50, godEaterHannibalSuccess: 0.75,
    godEaterGateBaseGames: 50, godEaterGateMaxGames: 99, godEaterGateOutcomes: [[{ key: "yu", label: "主人公覚醒", upper: "漆黒の捕喰者" }, 0.80], [{ key: "lindow", label: "リンドウ覚醒", upper: "神堕" }, 0.08], [{ key: "none", label: "覚醒非当選", upper: "" }, 0.12]],
    godEaterUpperBattleChance: 0.84, godEaterUpperMaxBattles: 12, godEaterKamiochiContinue: 0.90, godEaterKamiochiMaxLoops: 12,
    specialLabel: "神機覚醒", specialChance: 0.16, specialMin: 510, specialMax: 1500, upperChallenge: "リザレクションゲート", upperChance: 0.45, upperSuccess: 0.88, upperLabel: "漆黒の捕喰者／神堕", upperContinue: 0.84, upperPayout: 510,
    settingRates: { 1: { trigger: 351.9, main: 351.9, payout: 0.979 }, 2: { trigger: 344.5, main: 344.5, payout: 0.989 }, 3: { trigger: 330.1, main: 330.1, payout: 1.011 }, 4: { trigger: 317.0, main: 317.0, payout: 1.056 }, 5: { trigger: 302.2, main: 302.2, payout: 1.100 }, 6: { trigger: 290.3, main: 290.3, payout: 1.149 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyDarlingFranxxDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["darling-in-the-franxx-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "2種類のCZから疑似BONUSへ。10G＋αのボーナス高確と比翼BEATSをループする。",
    intro: "5Gのコネクトチャンス／10Gのココロチャンスから初当りBONUSを目指し、ボーナス高確『ダーリン・イン・ザ・フランキス』へ。3種類の高確中BONUS、比翼BEATS、連れ出しまでを専用画面で体験できます。",
    points: ["コネクトチャンスは5G・成功期待度約46%", "ボーナス高確は10G＋α・ボーナス約1/10.4", "比翼BEATSは2〜4G・継続約75〜94%"],
    specs: [["CZ（設定1）", "約1/127"], ["BONUS（設定1）", "約1/229.8"], ["ボーナス高確（設定1）", "約1/343.0"], ["コネクトチャンス", "5G・成功期待度約46%"], ["ココロチャンス", "10G・成功期待度約69%"], ["初当りREG", "約40枚・昇格率約22%"], ["ダーリン・イン・ザ・BONUS", "約100枚"], ["エピソードBONUS", "約200枚"], ["ボーナス高確", "10G＋α・BONUS約1/10.4"], ["比翼BEATS", "2〜4G・継続約75〜94%"], ["AT純増", "約5.0枚/G"], ["ベース", "約30.8G/50枚"]],
    articleSections: [
      { heading: "2種類のCZから初当りBONUSへ", paragraphs: ["コネクトチャンスは5GのST型CZで、成功期待度約46%。小役成立でレベルアップとゲーム数再セットを行います。ココロチャンスは10G・成功期待度約69%で、成功後はボーナス高確ゲーム数を上乗せしてBONUSへ進みます。", "通常時のBONUS直撃も含め、専用画面ではCZを最後まで進めて最終PUSHでBONUS当落を開きます。"] },
      { heading: "初当りBONUSは3種類", paragraphs: ["レギュラーボーナスは約40枚で、約22%でダーリン・イン・ザ・ボーナスへ昇格。ダーリン・イン・ザ・ボーナスは約100枚で、消化後にボーナス高確へ進みます。", "エピソードボーナスは約200枚で、消化後は比翼BEATSのレベルMAXXからボーナス高確へ進む強力な入口です。"] },
      { heading: "10G＋αのボーナス高確", paragraphs: ["ダーリン・イン・ザ・フランキスは10G＋αのボーナス高確率で、ボーナス確率は約1/10.4。小役成立時に即ジャッジし、レア役ならBONUS濃厚です。", "高確中はフランクスボーナス約60枚＋α、ダーリン・イン・ザ・ボーナス約100枚、EX約200〜3000枚、エピソード約200枚を個別に表示します。"] },
      { heading: "比翼BEATSと連れ出し", paragraphs: ["比翼BEATSはボーナス高確ゲーム数を上乗せするST型特化ゾーン。レベル1は2G・約75%、レベル2は3G・約88%、MAXXは4G・約94%で、上乗せまたはBONUS当選時にSTを再セットします。", "フランクスボーナス中の連れ出しは、BONUS枚数がなくなるまでSTゲーム数をホールド。フランクス図柄停止で上乗せと60枚再セットを行う専用イベントとして記録します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約30.8G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定1〜6を均等抽選し、CZ・BONUS・ボーナス高確初当りは公開設定別値を使用", "CZ期待度、BONUS獲得目安、ボーナス高確率、比翼BEATS性能は公開値を優先", "CZ選択率、BONUS種別、連れ出し発生率など未公表部分は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["L ダーリン・イン・ザ・フランキス 公式サイト", "https://www.l-darli-fra.jp/"], ["円谷フィールズHD 発売発表", "https://www.tsuburaya-fields.co.jp/ir/j/files/press/2025/press_20250530a.pdf"], ["なな徹 機種解析", "https://nana-press.com/kaiseki/machine/989/"], ["なな徹 コネクトチャンス", "https://nana-press.com/kaiseki/machine/989/30978/"], ["なな徹 ココロチャンス", "https://nana-press.com/kaiseki/machine/989/30980/"], ["なな徹 比翼BEATS・連れ出し", "https://nana-press.com/kaiseki/machine/989/30990/"], ["なな徹 ダーリン・イン・ザ・ボーナス", "https://nana-press.com/kaiseki/machine/989/30988/"]],
    readerGuide: { verdict: "CZから疑似BONUSを取り、10G＋αのボーナス高確と比翼BEATSでゲーム数とBONUSをつなぐボーナス連タイプです。", bestFor: ["CZ最終PUSHでBONUS当落を決めたい", "高確中のBONUS種類を開きたい", "比翼BEATSのレベルと上乗せを重ねたい"], check: ["CZ・BONUS初当り、純増、主要ゲーム数は公開値", "比翼BEATSのレベル別継続率を反映", "未公表の選択率は体験用代表値"], compare: [["kanokari-slot", "スマスロ かのかり", "疑似BONUS連タイプと比較"], ["aobuta-slot", "スマスロ 青ブタ", "ST型BONUSループと比較"]] }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v15", dedicatedFlow: true, dedicatedFlowKey: "darling-in-the-franxx-slot", dedicatedFlowVersion: 2, darlingFranxxFlow: true,
    triggerLabel: "CZ・BONUS直撃", triggerRate: 127.0, triggerSuccess: 1, mainLabel: "ダーリン・イン・ザ・フランキス", mainRate: 343.0, base50: 30.8, normalMin: 0, normalMax: 0, atPureIncrease: 5.0, atPayoutVariance: 0,
    darlingEntryRoutes: [[{ key: "connect", label: "コネクトチャンス", games: 5, chance: 0.46 }, 0.78], [{ key: "kokoro", label: "ココロチャンス", games: 10, chance: 0.69 }, 0.08], [{ key: "direct", label: "BONUS直撃", games: 1, chance: 1 }, 0.14]],
    darlingInitialBonuses: [[{ key: "reg", label: "レギュラーボーナス", games: 8, payout: 40, highChance: 0.22 }, 0.62], [{ key: "darling", label: "ダーリン・イン・ザ・ボーナス", games: 20, payout: 100, highChance: 1 }, 0.36], [{ key: "episode", label: "エピソードボーナス", games: 40, payout: 200, highChance: 1, beatLevel: 3 }, 0.02]],
    darlingHighBonuses: [[{ key: "franxx", label: "フランクスボーナス", games: 12, payout: 60 }, 0.38], [{ key: "darling", label: "ダーリン・イン・ザ・ボーナス", games: 20, payout: 100, beat: true }, 0.48], [{ key: "ex", label: "ダーリン・イン・ザ・ボーナスEX", games: 40, payouts: [[200, 0.52], [300, 0.24], [500, 0.14], [1000, 0.07], [2000, 0.02], [3000, 0.01]], beat: true }, 0.135], [{ key: "episode", label: "エピソードボーナス", games: 40, payout: 200, beat: true, beatLevel: 3 }, 0.005]],
    darlingBeatLevels: [[{ level: 1, label: "Beat Lv.1", stGames: 2, continue: 0.75 }, 0.784], [{ level: 2, label: "Beat Lv.2", stGames: 3, continue: 0.88 }, 0.215], [{ level: 3, label: "Beat Lv.MAXX", stGames: 4, continue: 0.94 }, 0.001]],
    darlingHighBaseGames: 10, darlingHighBonusRate: 10.4, darlingHighMaxGames: 30, darlingTakeoutChance: 0.16, darlingMaxBonuses: 12,
    specialLabel: "比翼BEATS", specialChance: 0.50, upperChallenge: "Beat Lv.MAXX", upperChance: 0.08, upperSuccess: 0.94, upperLabel: "CLIMAXX", upperContinue: 0, upperPayout: 0,
    settingRates: { 1: { trigger: 127.0, main: 343.0, bonus: 229.8, payout: 0.978 }, 2: { trigger: 127.0, main: 334.1, bonus: 224.1, payout: 0.989 }, 3: { trigger: 126.0, main: 320.1, bonus: 214.9, payout: 1.006 }, 4: { trigger: 127.0, main: 298.9, bonus: 207.3, payout: 1.054 }, 5: { trigger: 121.0, main: 270.3, bonus: 190.3, payout: 1.105 }, 6: { trigger: 119.0, main: 252.3, bonus: 180.3, payout: 1.145 } }
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();


(function applyTokyoGhoulDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["tokyo-ghoul-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "初期約150枚の東京喰種咬から、喰種対決・BITES・有馬貴将JUDGEMENTへ。",
    intro: "8GのCZから純増約4.0枚/G・初期約150枚の差枚ATへ進み、4Gの喰種対決、BITES、特化ゾーン、5Gの有馬貴将JUDGEMENT、CCGの死神と裏ATまでを実機順に体験できます。",
    points: ["レミニセンス8G・成功期待度約50%", "東京喰種咬は初期約150枚・純増約4.0枚/G", "有馬貴将JUDGEMENTは5G・成功期待度約61%"],
    specs: [["CZ合算（設定1）", "約1/262.6"], ["AT初当り（設定1）", "約1/394.4"], ["レミニセンス", "8G・約50%"], ["大喰いの利世", "8G・約75%"], ["東京喰種咬", "初期約150枚"], ["AT純増", "約4.0枚/G"], ["喰種対決", "4G・平均約50%"], ["有馬貴将JUDGEMENT", "5G・約61%"], ["CCGの死神", "平均約500枚"], ["裏AT", "100G＋α・約5.0枚/G"]],
    articleSections: [
      { heading: "8GのCZから東京喰種咬へ", paragraphs: ["レミニセンスは8G・成功期待度約50%、大喰いの利世は8G・約75%。エピソードボーナスは約100枚を獲得してATへ進みます。", "設定別のCZ合算とAT初当りを使用し、通常時の全モード・規定ゲーム数は初当り確率へまとめます。"] },
      { heading: "差枚ATと4Gの喰種対決", paragraphs: ["東京喰種咬は初期約150枚・純増約4.0枚/G。導入エピソード後、レア役や規定ゲーム数から4Gの喰種対決へ進みます。", "対戦相手別の勝利期待度は鯱40%、霧嶋絢都47%、ヤモリ53%、特等ら76%、亜門86%、有馬貴将67%。勝利時はBITESへ進みます。"] },
      { heading: "BITESと2種類の特化ゾーン", paragraphs: ["BITESは小役成立で報酬を1段階以上上げ、ハズレ時は約20%で継続。終了時の報酬を差枚へ加算してATへ戻ります。", "超BITESは300〜3000枚、極BITESは2000枚または完走が濃厚。百足覚醒は期待約300枚、隻眼の梟は期待約500枚として別イベントで表示します。"] },
      { heading: "有馬貴将JUDGEMENTから裏ATへ", paragraphs: ["有馬貴将は10戦目までに出現。勝利するとAT終了後に5G・成功期待度約61%の有馬貴将JUDGEMENTへ進みます。", "成功後のCCGの死神は1G完結で300・500・1000・2000枚のいずれかを上乗せ。続くATの一部は100G＋α・純増約5.0枚/Gの裏ATです。"] },
      { heading: "固定条件と簡易化する範囲", bullets: ["約31G/50枚・1,000円46枚貸し・5.2枚交換で固定", "有馬の出現戦数は設定1の公開比率を使用", "対戦相手選択率、BITES種別率、裏AT移行率など未公表部分は代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["L 東京喰種 公式サイト", "https://www.slot-l-tokyoghoul.jp/"], ["P-WORLD 機種情報・解析", "https://www.p-world.co.jp/machine/database/10207"], ["円谷フィールズHD 発売発表", "https://www.tsuburaya-fields.co.jp/ir/j/files/press/2024/press_20241114f.pdf"]],
    readerGuide: {
      verdict: "初期約150枚の差枚ATで4Gの喰種対決を重ね、BITESで残り差枚を増やしながら有馬戦と上位CZを目指す台です。",
      bestFor: ["対戦相手ごとの勝率をPUSHで見たい", "BITES・超BITES・極BITESの報酬差を比べたい", "有馬戦からCCGの死神と裏ATを目指したい"],
      check: ["CZ・AT初当り、純増、各ゲーム数は公開値", "有馬出現戦数は設定1の公開比率", "未公表の選択率は体験用代表値"],
      compare: [["basilisk-tenzen-slot", "バジリスク天膳", "継続バトル型ATと比較"], ["god-eater-resurrection", "スマスロ ゴッドイーター", "討伐型ATと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v8",
    dedicatedFlow: true,
    dedicatedFlowKey: "tokyo-ghoul-slot",
    dedicatedFlowVersion: 2,
    tokyoGhoulFlow: true,
    triggerLabel: "CZ合算",
    triggerRate: 262.6,
    mainLabel: "東京喰種咬",
    mainRate: 394.4,
    normalMin: 0,
    normalMax: 0,
    atPureIncrease: 4.0,
    atPayoutVariance: 0,
    tokyoGhoulInitialCoins: 150,
    tokyoGhoulCzRoutes: [[{ key: "reminiscence", label: "レミニセンス", games: 8, chance: 0.50 }, 0.874], [{ key: "rize", label: "大喰いの利世", games: 8, chance: 0.75 }, 0.126]],
    tokyoGhoulOpponents: [[{ label: "鯱", chance: 0.40 }, 0.24], [{ label: "霧嶋絢都", chance: 0.47 }, 0.23], [{ label: "ヤモリ", chance: 0.53 }, 0.22], [{ label: "特等ら", chance: 0.76 }, 0.17], [{ label: "亜門鋼太朗", chance: 0.86 }, 0.14]],
    tokyoGhoulArimaBattles: [[1, 0.048], [3, 0.066], [5, 0.099], [7, 0.157], [10, 0.63]],
    tokyoGhoulBitesModes: [[{ key: "normal", label: "BITES" }, 0.90], [{ key: "super", label: "超BITES" }, 0.08], [{ key: "extreme", label: "極BITES" }, 0.02]],
    tokyoGhoulCcgRewards: [[300, 0.55], [500, 0.30], [1000, 0.12], [2000, 0.03]],
    specialLabel: "百足覚醒／隻眼の梟",
    specialChance: 0.08,
    upperChallenge: "有馬貴将JUDGEMENT",
    upperChance: 0,
    upperSuccess: 0.61,
    upperLabel: "CCGの死神／裏AT",
    upperContinue: 0,
    upperPayout: 0,
    upperPureIncrease: 5.0,
    tokyoGhoulUpperAtChance: 0.55
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyBasiliskTenzenDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["basilisk-tenzen-slot"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "16GのBCから、追想の刻・争忍の刻・絆高確・宿怨チャレンジへ。",
    intro: "BCでBTを目指し、追想の刻10G＋αと争忍の刻平均30Gを10種類のシナリオで進めます。初回絆高確、月下閃滅、12セット完走後の宿怨チャレンジと天膳BTまでを専用表示します。",
    points: ["通常BCは16G、BTは1セット平均約40G", "BT純増約2.9枚/G・全10種類のシナリオ管理", "宿怨チャレンジは成功期待度50%超・失敗してもBT"],
    specs: [["BC（設定1）", "約1/124.7"], ["BT（設定1）", "約1/418.1"], ["BT（設定6）", "約1/247.3"], ["ベース", "約31.7G/50枚"], ["通常BC", "16G"], ["EPBC・PBC", "30G"], ["BT", "1セット平均約40G"], ["BT純増", "約2.9枚/G"], ["BTシナリオ", "全10種類・12セット管理"], ["宿怨チャレンジ", "カットイン3回まで・50%超"]],
    articleSections: [
      { heading: "BCからBTを目指す通常時", paragraphs: ["通常時は成立役、モード、内部状態に応じてBCを抽選。異色BC・同色BCは16Gで、BC当選時と消化中にBTを抽選します。", "同色BCはBT期待度50%以上。EPBCとPBCは30GでBT濃厚となるため、通常BCと別イベントで表示します。"] },
      { heading: "追想の刻と争忍の刻", paragraphs: ["BTは純増約2.9枚/G・1セット平均約40G。前半の追想の刻10G＋αでBCと絆玉を抽選し、後半の争忍の刻平均30Gで甲賀勝利を目指します。", "BT初回セットは絆高確。絆玉1〜4個で縁・想・恋・絆が点灯し、対応役でBC当選を狙います。"] },
      { heading: "10種類のBTシナリオ", paragraphs: ["継続率はA〜Fを12セット1組で並べた全10種類のシナリオで管理されます。設定1の公開振り分けを使い、各セットの継続ランクを結果に表示します。", "A〜Dの具体的な継続率は非公表のため、サイト内では強弱関係を保つ代表値で判定します。Eは継続濃厚、FはA〜Eのいずれかとして扱います。"] },
      { heading: "月下閃滅と宿怨チャレンジ", paragraphs: ["10人状態の完全勝利などから月下閃滅へ進むと、BTストックを獲得する特化ゾーンとして別表示します。", "宿怨チャレンジはカットイン3回までで成功期待度50%超。成功時は激闘シナリオの天膳BT＋初回10人状態、失敗時も通常BTへ進みます。エンディング後は必ず宿怨チャレンジへ進みます。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約31.7G/50枚・1,000円46枚貸し・5.2枚交換で固定", "BC・BT設定別確率、シナリオ表と設定1振り分けは公開値", "継続率A〜D、絆玉獲得率、BT中BC率、月下閃滅率、宿怨ポイントMAX率は代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ユニバーサル 公式機種サイト", "https://www.universal-777.com/product/slot/bk2t/"], ["一撃 機種解析・ゲームフロー", "https://1geki.jp/slot/l_b_kizuna2_tnzn/"], ["一撃 BTシナリオ解析", "https://1geki.jp/slot/l_b_kizuna2_tnzn/84/"], ["なな徹 宿怨チャレンジ解析", "https://nana-press.com/kaiseki/machine/666/18342/"]],
    readerGuide: {
      verdict: "16GのBCからBTへ入り、追想10G＋争忍平均30Gをセットごとのシナリオランクと絆高確で突破する台です。",
      bestFor: ["BCからBTまでの当落をPUSHで見たい", "12セットのシナリオ変化を確認したい", "宿怨チャレンジから天膳BTを狙いたい"],
      check: ["BC・BT確率、ゲーム数、純増、シナリオ表は公開値", "A〜Dの具体率など未公表部分は代表値", "宿怨失敗時も通常BTへ進む"],
      compare: [["tokyo-ghoul-slot", "スマスロ 東京喰種", "対戦型差枚ATと比較"], ["basilisk4-slot", "スマスロ バジリスクIV", "新旧BTを比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v8",
    dedicatedFlow: true,
    dedicatedFlowKey: "basilisk-tenzen-slot",
    dedicatedFlowVersion: 2,
    basiliskTenzenFlow: true,
    atPureIncrease: 2.9,
    atPayoutVariance: 0,
    basiliskBcTypes: [[{ key: "hetero", label: "異色BC", games: 16, award: 30 }, 0.68], [{ key: "same", label: "同色BC", games: 16, award: 46 }, 0.24], [{ key: "episode", label: "エピソードBC", games: 30, award: 87 }, 0.07], [{ key: "premium", label: "プレミアムBC", games: 30, award: 87 }, 0.01]],
    basiliskScenarios: [[{ name: "しりあがり", grades: "BBBBCCCCDDDE" }, 0.125], [{ name: "朝駆け", grades: "DCBADADADADA" }, 0.156], [{ name: "混沌", grades: "FFFFFFFFFFFF" }, 0.188], [{ name: "安定", grades: "CCCCCCCCCCCC" }, 0.25], [{ name: "超しりあがり", grades: "BBBCCCDDDEEE" }, 0.063], [{ name: "波乱", grades: "ADDADDADDADD" }, 0.125], [{ name: "超安定", grades: "CCCCCCDDDDDD" }, 0.031], [{ name: "超混沌", grades: "FFFFFFDEDEDE" }, 0.047], [{ name: "夢幻", grades: "EEEEEEEEEEEE" }, 0.004], [{ name: "激闘", grades: "DDDDDDDDDDDD" }, 0.012]],
    basiliskGradeChances: { A: 0.25, B: 0.40, C: 0.55, D: 0.80, E: 1 },
    basiliskBtBcChance: 0.22,
    basiliskFirstHighChance: 1,
    basiliskLaterHighChance: 0.34,
    basiliskMoonChance: 0.12,
    basiliskGrudgeChance: 0.18,
    upperChallenge: "宿怨チャレンジ",
    upperChance: 0,
    upperSuccess: 0.50,
    upperLabel: "天膳BT",
    upperContinue: 0.80,
    upperPayout: 0,
    upperPureIncrease: 2.9
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyOkidokiBlackDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["okidoki-black"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    catchcopy: "60G BIGと25G REGから、32Gの天国・黒ドキ・裏ドキへ。",
    intro: "ハイビスカス点灯でBIGまたはREGへ進み、BONUS後は32Gを毎回カウント。天国・ドキドキ・超ドキドキ・保証に加え、BLACK固有の黒ドキと裏ドキ、1G連、ロングフリーズまでを専用フローで体験できます。",
    points: ["BIG60G約210枚・REG25G約90枚・純増約3.5枚/G", "天国約75%・ドキドキ約80%・超ドキドキ約90%", "黒ドキは次回天国以上、裏ドキはBONUS当選でロングフリーズ"],
    specs: [["初当り（設定1）", "約1/288.7"], ["初当り（設定6）", "約1/243.1"], ["BIG（設定1）", "約1/214.1"], ["REG（設定1）", "約1/292.5"], ["ベース", "約32G/50枚"], ["コイン単価", "約3.3円"], ["純増", "約3.5枚/G"], ["BIG", "60G・平均約210枚"], ["REG", "25G・平均約90枚"], ["天国", "32G・約75%ループ"], ["ドキドキ", "約80%＋保証"], ["超ドキドキ", "約90%＋保証"], ["黒ドキ", "次回天国以上"], ["裏ドキ", "BONUS当選でロングフリーズ"]],
    articleSections: [
      { heading: "ハイビスカス点灯でBONUS", paragraphs: ["通常時は毎ゲームBONUSを抽選し、ハイビスカス点灯で当選を告知します。BIGは60G・平均約210枚、REGは25G・平均約90枚で、どちらも純増約3.5枚/Gです。", "設定は実機どおり1・2・3・5・6から抽選。設定別の初当り、BIG、REG、出玉率とBONUS振り分けを結果へ反映します。"] },
      { heading: "BONUS後32Gと1G連", paragraphs: ["BONUS終了後は32Gをカウントし、天国以上なら32G以内の次回BONUSを判定します。天国・ドキドキ・超ドキドキでは12.5%、保証では6.0%で規定ゲーム数0G短縮を抽選し、当選時はBIGの1G連です。", "専用画面では32Gを進めたあと、PUSHで再点灯・モード終了・黒ドキを開き、次のBIG・REGも別のPUSHで表示します。"] },
      { heading: "天国・ドキドキ・超ドキドキ", paragraphs: ["天国モードは約75%でループし、期待獲得枚数は約1310枚。ドキドキモードは約80%、超ドキドキモードは約90%でループします。", "ドキドキ・超ドキドキ転落時は保証モードへ進み、32G以内のBONUSを1回追加してから終了または黒ドキを判定します。"] },
      { heading: "BLACK固有の黒ドキと裏ドキ", paragraphs: ["有利区間リセット後の一部で黒ドキへ移行すると、次回BONUS後の天国以上が濃厚です。見た目で判別できないため、専用結果で内部ルートを表示します。", "裏ドキ滞在中はBONUS当選でロングフリーズが発生し、BIG＋BIG1G連＋超ドキドキへ。裏ドキ移行率は非公表のため、サイトでは低確率の体験用代表値です。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約32G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定別初当り・BIG・REG・出玉率、BONUSゲーム数と純増は公開値", "天国約75%・ドキドキ約80%・超ドキドキ約90%、1G連短縮率を個別判定", "モード初回振り分け、黒ドキ・裏ドキ移行率は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ユニバーサル 公式機種サイト", "https://www.universal-777.com/product/slot/okidoki_black/"], ["なな徹 モード解析", "https://nana-press.com/kaiseki/machine/778/22176/"], ["FLICK7 BONUS・設定解析", "https://flick7.net/slot/oki_doki_black.php"]],
    readerGuide: {
      verdict: "ハイビスカス点灯でBIG・REGを獲得し、BONUS後32Gの連チャンを天国・ドキドキ・黒ドキ・裏ドキで伸ばす告知型AT機です。",
      bestFor: ["32Gを最後まで数えてPUSHで連チャンを見たい", "60G BIG・25G REGと1G連を個別に確認したい", "黒ドキや裏ドキの内部ルートを結果で知りたい"],
      check: ["設定4は非搭載で1・2・3・5・6を抽選", "BIG60G約210枚・REG25G約90枚", "非公表のモード移行率は体験用代表値"],
      compare: [["okidoki-gold", "沖ドキ！GOLD", "70G BIGの前作と比較"], ["chibariyo2-slot", "チバリヨ2", "天国連タイプと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v9", dedicatedFlow: true, dedicatedFlowKey: "okidoki-black", dedicatedFlowVersion: 2,
    okidokiGoldFlow: true, okidokiBlackFlow: true,
    mainLabel: "BONUS連", mainRateLabel: "BONUS初当り", atPureIncrease: 3.5, atPayoutVariance: 0,
    okidokiBigGames: 60, okidokiRegGames: 25, okidokiBigAward: 210, okidokiRegAward: 90,
    okidokiInitialBigChance: 0.577, okidokiBigChanceBySetting: { 1: 0.577, 2: 0.580, 3: 0.586, 5: 0.592, 6: 0.598 }, okidokiChainBigChance: 0.70,
    okidokiEntryModes: [["normal", 0.60], ["heaven", 0.30], ["doki", 0.08], ["super", 0.02]],
    okidokiModeRates: { heaven: 0.75, doki: 0.80, super: 0.90 },
    okidokiBlackChance: 0.15, okidokiBlackBigChance: 0.857, okidokiOneGameChance: 0.125, okidokiGuaranteeOneGameChance: 0.06, okidokiUraChance: 1 / 32768,
    settingRates: { 1: { trigger: 288.7, main: 288.7, big: 214.1, reg: 292.5, payout: 0.972 }, 2: { trigger: 277.9, main: 277.9, big: 205.6, reg: 283.8, payout: 0.987 }, 3: { trigger: 265.8, main: 265.8, big: 188.5, reg: 267.0, payout: 1.019 }, 5: { trigger: 254.1, main: 254.1, big: 173.3, reg: 251.7, payout: 1.048 }, 6: { trigger: 243.1, main: 243.1, big: 160.8, reg: 239.0, payout: 1.086 } },
    specialLabel: "黒ドキモード", specialChance: 0.15, upperChallenge: "ドキドキモード", upperChance: 0, upperSuccess: 1, upperLabel: "超ドキドキモード", upperContinue: 0.90, upperPayout: 0, upperPureIncrease: 3.5
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

(function applyOkidokiGoldDedicatedFlow() {
  const machine = window.ICHIGEKI_MACHINES["okidoki-gold"];
  if (!machine) return;
  Object.assign(machine, {
    updated: "2026-11-07",
    maker: "ユニバーサルブロス",
    catchcopy: "ハイビスカス点灯から、32Gの天国・金ドキ・ドキドキへ。",
    intro: "ハイビスカス点灯でBIGまたはREGへ進み、BONUS後32Gを毎回カウント。天国・ドキドキ・超ドキドキ・保証・金ドキと、1G連までを機種専用の連チャンフローで体験できます。",
    points: ["BIG70G約210枚・REG30G約90枚", "天国約75%・ドキドキ約80%・超ドキドキ約90%", "金ドキは32G以内BIG＋次回天国以上"],
    specs: [["初当り（設定1）", "約1/299.6"], ["初当り（設定6）", "約1/237.0"], ["BIG（設定1）", "約1/175.3"], ["REG（設定1）", "約1/368.7"], ["ベース", "約32G/50枚"], ["コイン単価", "約3.8円"], ["純増", "約3.0枚/G"], ["BIG", "70G・平均約210枚"], ["REG", "30G・平均約90枚"], ["天国", "32G・約75%ループ"], ["ドキドキ", "約80%＋保証"], ["超ドキドキ", "約90%＋保証"], ["金ドキ", "32G以内BIG＋次回天国以上"]],
    articleSections: [
      { heading: "ハイビスカス点灯でBONUS", paragraphs: ["通常時は毎ゲームBONUSを抽選し、ハイビスカス点灯で当選を告知します。BIGは70G・平均約210枚、REGは30G・平均約90枚で、どちらも純増約3.0枚/Gです。", "設定は実機どおり1・2・3・5・6から抽選。設定別の初当り、BIG、REG、出玉率を結果と機種別ランキングへ表示します。"] },
      { heading: "BONUS後32Gと1G連", paragraphs: ["BONUS終了後は必ず32Gをカウントし、天国以上なら32G以内の次回BONUSを判定します。連チャン中のBIGでは規定ゲーム数0Gが選ばれ、BONUS中に1G連が告知される場合があります。", "サイトでは32Gを進めたあとPUSHで『連チャン』『保証』『金ドキ』『終了』を開き、次のBIG・REGを別のPUSHで表示します。"] },
      { heading: "天国・ドキドキ・超ドキドキ", paragraphs: ["天国モードは約75%でループし、期待値はシリーズ最高の約1300枚。ドキドキモードは約80%、超ドキドキモードは約90%でループします。", "ドキドキ・超ドキドキ転落時は保証モードへ進み、32G以内のBONUSを1回追加してから終了を判定します。"] },
      { heading: "金ドキとシームレスな再連", paragraphs: ["天国や保証終了後の非有利区間から金ドキへ移行すると、32G以内のBIGと次回天国以上が濃厚です。見た目では通常の天国ループと区別できないため、結果画面で今回の内部ルートを表示します。", "金ドキ移行率、通常A・B・引き戻しなどの全モード移行率は非公表のため、公開されているループ性能を崩さない代表値で抽選します。"] },
      { heading: "固定条件と簡略化する範囲", bullets: ["約32G/50枚・1,000円46枚貸し・5.2枚交換で固定", "設定別初当り・BIG・REG・出玉率、BONUSゲーム数と純増は公開値", "天国約75%・ドキドキ約80%・超ドキドキ約90%を個別判定", "モード初回振り分け、金ドキ移行率、1G連率は体験用代表値", "19,000枚到達時はコンプリート表示"] }
    ],
    sources: [["ユニバーサル 公式機種サイト", "https://www.universal-777.com/product/slot/okidoki_gold/"], ["P-WORLD 機種情報・解析", "https://www.p-world.co.jp/machine/database/9750"], ["なな徹 BONUS基本解析", "https://nana-press.com/kaiseki/machine/478/12853/"]],
    readerGuide: {
      verdict: "ハイビスカス点灯でBIG・REGを獲得し、BONUS後32Gの連チャンを天国・ドキドキ・超ドキドキ・金ドキで伸ばす告知型AT機です。",
      bestFor: ["32Gを最後まで数えてPUSHで連チャンを見たい", "BIG・REGと1G連を別々に確認したい", "金ドキや超ドキドキの内部ルートを結果で知りたい"],
      check: ["設定4は非搭載で1・2・3・5・6を抽選", "BIG70G約210枚・REG30G約90枚", "非公表のモード移行率は体験用代表値"],
      compare: [["okidoki-black", "沖ドキ！BLACK", "後継の32G連タイプと比較"], ["chibariyo2-slot", "チバリヨ2", "天国連タイプと比較"]]
    }
  });
  Object.assign(machine.sim, {
    rankingVersion: "v8",
    dedicatedFlow: true,
    dedicatedFlowKey: "okidoki-gold",
    dedicatedFlowVersion: 2,
    okidokiGoldFlow: true,
    mainLabel: "BONUS連",
    mainRateLabel: "BONUS初当り",
    atPureIncrease: 3.0,
    atPayoutVariance: 0,
    okidokiInitialBigChance: 0.55,
    okidokiChainBigChance: 0.72,
    okidokiEntryModes: [["normal", 0.55], ["heaven", 0.35], ["doki", 0.08], ["super", 0.02]],
    okidokiModeRates: { heaven: 0.75, doki: 0.80, super: 0.90 },
    okidokiGoldChance: 0.15,
    okidokiOneGameChance: 0.10,
    okidokiGodChance: 1 / 30000,
    settingRates: { 1: { trigger: 299.6, main: 299.6, big: 175.3, reg: 368.7, payout: 0.972 }, 2: { trigger: 287.3, main: 287.3, big: 168.3, reg: 346.2, payout: 0.987 }, 3: { trigger: 266.7, main: 266.7, big: 157.7, reg: 324.0, payout: 1.013 }, 5: { trigger: 247.6, main: 247.6, big: 143.0, reg: 297.9, payout: 1.047 }, 6: { trigger: 237.0, main: 237.0, big: 134.0, reg: 276.5, payout: 1.081 } },
    specialLabel: "金ドキモード",
    specialChance: 0.15,
    upperChallenge: "ドキドキモード",
    upperChance: 0,
    upperSuccess: 1,
    upperLabel: "超ドキドキモード",
    upperContinue: 0.90,
    upperPayout: 0,
    upperPureIncrease: 3.0
  });
  delete machine.sim.cycleFlow;
  delete machine.sim.titleFlow;
})();

// Dedicated implementations take precedence over the older reusable cycle map.
// Keep this final cleanup after every enrichment pass so page copy and gameplay
// both use the same title-specific model.
(() => {
  const godzillaEva2 = window.ICHIGEKI_MACHINES["godzilla-eva2-slot"]?.sim;
  if (godzillaEva2?.godzillaEva2Flow) delete godzillaEva2.cycleFlow;
  const mahoako = window.ICHIGEKI_MACHINES["mahoako-slot"]?.sim;
  if (mahoako?.mahoakoFlow) {
    delete mahoako.cycleFlow;
    mahoako.rankingVersion = "v6";
  }
  const uminchu = window.ICHIGEKI_MACHINES["uminchu-slot"]?.sim;
  if (uminchu?.uminchuFlow) delete uminchu.cycleFlow;
  const tenten = window.ICHIGEKI_MACHINES["tenten-slot"]?.sim;
  if (tenten?.tentenFlow) delete tenten.cycleFlow;
  const goblinSlayer = window.ICHIGEKI_MACHINES["goblin-slayer-slot"]?.sim;
  if (goblinSlayer?.goblinSlayerFlow) delete goblinSlayer.cycleFlow;
  const assaultLily = window.ICHIGEKI_MACHINES["assault-lily-slot"]?.sim;
  if (assaultLily?.assaultLilyFlow) delete assaultLily.cycleFlow;
  const kaguya = window.ICHIGEKI_MACHINES["kaguya-sama-slot"]?.sim;
  if (kaguya?.kaguyaFlow) delete kaguya.cycleFlow;
  const dumbbell = window.ICHIGEKI_MACHINES["dumbbell-slot"]?.sim;
  if (dumbbell?.dumbbellFlow) delete dumbbell.cycleFlow;
  const shinEva = window.ICHIGEKI_MACHINES["shin-eva-slot"]?.sim;
  if (shinEva?.shinEvaFlow) delete shinEva.cycleFlow;
})();
