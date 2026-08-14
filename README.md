# ICHIGEKI Web

ワンタップで挑戦できるパチンコ・パチスロ風ランキングバトル集です。

## ページ

- `index.html`: トップ
- `juggle-simple.html`: ジャグ連チャレンジ
- `two-choice-select.html`: 二択セレクトチャレンジ
- `tokyo-ghoul-999.html`: 東京喰種999チャレンジ
- `rare-8192.html`: 1/8192当選チャレンジ
- `pachinko-319.html`: 319一撃チャレンジ
- `hamari.html`: ハマり記録チャレンジ
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

- 記事＋ランキングバトル型のWebサイトとして構成
- 各ランキングバトルの下に使い方、固定条件、FAQ、注意事項を配置
- 広告枠は本文内に自然に配置
- 実際の遊技結果や収支を保証しないことを明記

## 広告枠

広告枠はすべて `.ad-box` で統一しています。AdSense承認後は、各 `data-ad-slot` の内側を広告タグに差し替える想定です。

- `*-inline`: ランキングバトル結果下、記事本文前の横長広告
- `*-sidebar`: PC表示のサイドバー広告
- `*-footer`: ページ下部、スマホでは記事末尾広告として扱う枠

現時点では審査前のプレースホルダー表示です。
