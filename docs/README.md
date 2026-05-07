# Portfolio Docs

最終更新: 2026-05-07

## Plans

- [Portfolio Refresh Plan](./plans/portfolio-refresh.md)
  - 就活向けの刷新方針、採用技術、情報設計、受け入れ条件を定義する現行プラン。

## Libraries

- [Libraries](./libraries.md)
  - UI / animation / scroll / text layout で使うライブラリの役割と使い分けをまとめる。

## Development

- [Development Setup](./development.md)
  - Node.js / pnpm / Codex / Browser Use のローカル開発手順をまとめる。

## Content / Assets

- [Content and Assets](./content-and-assets.md)
  - `src/content/site` のデータ管理、Project メディア、アイコン、Hero 生成素材の更新ルールをまとめる。

## 現在の構成

- `docs/README.md`: docs の入口
- `docs/development.md`: 開発環境と検証コマンド
- `docs/libraries.md`: 使用ライブラリの採用理由と注意点
- `docs/content-and-assets.md`: コンテンツと画像・動画・アイコン素材の管理ルール
- `docs/plans/`: 実装前の計画や再設計方針

存在しない docs ディレクトリは前提にしない。必要になった時点で追加する。

## プロフィール
- 名前: 堀田智哉
- 専門領域: Web Backend, VR/Haptics, 研究開発（触覚・デバイス制御）
- 資格: 基本情報技術者

## 専門スキル
- Web Backend: Go, Python, Echo, FastAPI, Docker, SQL (PostgreSQL/MySQL/SQLite), nginx
- Frontend: React, Next.js, Tailwind CSS, Vite
- VR / Haptics: Unity, C#, Raspberry Pi, デバイス制御, センサ処理
- Dev / Tools: Git, GitHub Actions, Vercel, Figma, Codex, Claude Code

## 主なプロジェクト
1. Wake-on-Lan Dashboard
   - 内容: VPN 経由で自宅 PC を安全に起動・管理する Web ダッシュボード。
   - 技術: Python, FastAPI, React, Vite, Docker, nginx, Raspberry Pi, GitHub Actions。

2. Lovender
   - 内容: 推し活情報を整理・管理するカレンダーアプリ。Hack U 東京電機大学 2025 受賞。
   - 技術: Go, Echo, MySQL, Docker。

3. Haptic Piano
   - 内容: 仮想空間でピアノの鍵盤を押す感覚を再現する XR / ハプティック研究。
   - 技術: C#, Unity。

4. Chatclub
   - 内容: Discord コマンドから対戦成績を集計・確認できる Discord Bot。
   - 技術: Go, Echo, PostgreSQL, Docker, Heroku。

## リサーチ / 活動領域
- ピアノ触覚提示・VR ハプティクス
- デバイス制御・リアルタイム通信
- Web アプリケーション・バックエンド設計
- 個人開発の運用改善、CI/CD、軽量な自宅サーバー運用

## リンク
- GitHub: https://github.com/htomoya16
- Qiita: https://qiita.com/htomoya16
- Protopedia: https://protopedia.net/settings/prototypes

## メモ
- プロフィールやリンク、役割は `src/content/site/` を更新する。
- Project 画像・動画・PDFは `public/assets/projects/` に置き、`src/content/site/projects.ts` から参照する。
