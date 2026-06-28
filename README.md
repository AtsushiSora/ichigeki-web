# ICHIGEKI Web

AdSense審査とSEOを意識した、記事型のパチンコ・パチスロ シミュレーター集です。

## ページ

- `index.html`: トップ
- `juggle.html`: ジャグ連シミュレーター
- `pachinko-319.html`: パチンコ319大当たりシミュレーター
- `lt-rush.html`: LT上位RUSH到達シミュレーター
- `hamari.html`: ハマり確率シミュレーター
- `continuation.html`: 継続率シミュレーター
- `rush.html`: RUSH突入率シミュレーター
- `ranking.html`: みんなの記録・ランキング
- `guide.html`: パチンコ・パチスロ確率の見方
- `glossary.html`: 用語集
- `faq.html`: よくある質問
- `about.html`: 運営者情報
- `privacy.html`: プライバシーポリシー
- `disclaimer.html`: 免責事項
- `contact.html`: お問い合わせ
- `sitemap.html`: サイトマップ
- `robots.txt`: クロール設定
- `sitemap.xml`: 検索エンジン向けサイトマップ
- `ads.txt`: AdSense向け販売者情報

## 方針

- アプリ風ではなく、記事＋ツール型のWebサイトとして構成
- 各シミュレーターの下に使い方、計算条件、FAQ、注意事項を配置
- 広告枠は本文内に自然に配置
- 実際の遊技結果や収支を保証しないことを明記

## 広告枠

広告枠はすべて `.ad-box` で統一しています。AdSense承認後は、各 `data-ad-slot` の内側を広告タグに差し替える想定です。

- `*-inline`: シミュレーター結果下、記事本文前の横長広告
- `*-sidebar`: PC表示のサイドバー広告
- `*-footer`: ページ下部、スマホでは記事末尾広告として扱う枠

現時点では審査前のプレースホルダー表示です。
