# ICHIGEKI Web

ワンタップで挑戦できるパチンコ・パチスロ風ランキングバトル集です。

## ページ

- `index.html`: トップ
- `juggle-simple.html`: ジャグ連チャレンジ
- `two-choice-select.html`: 二択セレクトチャレンジ
- `tokyo-ghoul-999.html`: 東京喰種999チャレンジ
- `rare-8192.html`: 1/8192当選チャレンジ
- `pachinko-319.html`: 319一撃チャレンジ
- `hamari.html`: 399ハマりチャレンジ
- `ranking.html`: みんなの記録・ランキング
- `guide.html`: パチンコ・パチスロ確率の見方
- `glossary.html`: 用語集
- `faq.html`: よくある質問
- `about.html`: 運営者情報
- `privacy.html`: プライバシーポリシー
- `disclaimer.html`: 免責事項
- `contact.html`: お問い合わせ
- `sitemap.html`: サイトマップ
- `community.html`: 機種別の口コミ・収支・画像／動画投稿と、独立したシミュレーション結果投稿
- `slot-zone-demo.html`: CZ・特化ゾーン・上位CZのスロット新台用デモ
- `gundam-unicorn.html`: 初代Pフィーバー機動戦士ガンダムユニコーンの記事・簡易シミュレーター
- `lycoris-recoil-slot.html`: スマスロ リコリス・リコイル
- `assault-lily.html`: e アサルトリリィ
- `kanokari-slot.html`: Lパチスロ 彼女、お借りします
- `kabaneri2-119.html`: e 甲鉄城のカバネリ2 輪廻の果報119ver.
- `aobuta-slot.html`: L青春ブタ野郎はバニーガール先輩の夢を見ない
- `fire-force2-99.html`: eフィーバー炎炎ノ消防隊2 99ver.
- `hokuto-tensei2.html`: スマスロ 北斗の拳 転生の章2
- `tokyo-ghoul-super.html`: e 東京喰種 超デカ超一撃ver.
- `bofuri-slot.html`: スマスロ 痛いのは嫌なので防御力に極振りしたいと思います。
- `azur-lane-slot.html`: L アズールレーン THE ANIMATION
- `sao-alicization-yozora.html`: e ソードアート・オンライン アリシゼーション 夜空
- `gundam-seed-climax.html`: eフィーバー機動戦士ガンダムSEED クライマックス
- `karakuri-circus.html`: パチスロ からくりサーカス
- `monkey-turn-v.html`: スマスロ モンキーターンV
- `eva15.html`: 新世紀エヴァンゲリオン～未来への咆哮～
- `rezero-onigakari.html`: P Re:ゼロから始める異世界生活 鬼がかりver.
- `kabaneri.html`: パチスロ甲鉄城のカバネリ
- `smart-hokuto.html`: スマスロ北斗の拳
- `valvrave.html`: パチスロ 革命機ヴァルヴレイヴ
- `sengoku-otome4.html`: L戦国乙女4 戦乱に閃く炯眼の軍師
- `oumi5.html`: P大海物語5
- `shin-hokuto-musou.html`: ぱちんこCR真・北斗無双
- `robots.txt`: クロール設定
- `sitemap.xml`: 検索エンジン向けサイトマップ
- `ads.txt`: AdSense向け販売者情報

## 方針

- 記事＋ランキングバトル型のWebサイトとして構成
- 各ランキングバトルの下に使い方、固定条件、FAQ、注意事項を配置
- 広告枠は本文内に自然に配置
- 実際の遊技結果や収支を保証しないことを明記

## 人気機種シミュレーターの投資計算

- パチンコは通常ヘソ／デカヘソを明記し、1,000円あたり回転数から平均初当り回転数と平均投資を表示します。
- パチスロは50枚あたりゲーム数からAT・ST初当りまでの平均投資を表示します。
- コイン単価は荒さとホール売上の目安であり、プレイヤーの現金投資額とは別の指標として表示します。
- 回転率・ベース・コイン単価は画面上で変更でき、平均値と今回の抽選結果へ反映されます。

## 広告枠

広告枠はすべて `.ad-box` で統一しています。AdSense承認後は、各 `data-ad-slot` の内側を広告タグに差し替える想定です。

- `*-inline`: ランキングバトル結果下、記事本文前の横長広告
- `*-sidebar`: PC表示のサイドバー広告
- `*-footer`: ページ下部、スマホでは記事末尾広告として扱う枠

現時点では審査前のプレースホルダー表示です。

## コミュニティ機能

`community-config.js` が未設定の場合、投稿はブラウザのローカルストレージだけに保存されるプレビューモードです。

公開コミュニティへ切り替える場合は、Supabaseで匿名ログインを有効にして `supabase-community.sql` を実行し、`community-config.js` にProject URLとanon keyを設定します。通常投稿では画像を最大3枚・各2MBまで、動画ファイルを1本・20MBまで、または外部の公開動画URLを投稿できます。シミュレーション結果は添付投稿とは別の専用フォームから共有します。
