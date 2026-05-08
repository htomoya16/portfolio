# Portfolio Docs

最終更新: 2026-05-09

このディレクトリは、`AGENTS.md` に書ききらない説明・判断履歴・開発手順を置く場所です。`AGENTS.md` はルール、docs は背景と運用説明として分けます。

## Plans

- [Portfolio Refresh Plan](./plans/portfolio-refresh.md)
  - 就活向けの刷新方針、採用技術、情報設計、受け入れ条件を定義する現行プラン。

## Libraries

- [Libraries](./libraries.md)
  - UI / animation / scroll / text layout で使うライブラリの役割と使い分けをまとめる。

## Development

- [Development Setup](./development.md)
  - Node.js / pnpm / Codex / Browser Use のローカル開発手順と検証コマンドをまとめる。

## Content / Assets

- [Content and Assets](./content-and-assets.md)
  - `src/content/site` のデータ管理、Project メディア、アイコン、Hero 生成素材の更新ルールをまとめる。

## 現在の構成

- `docs/README.md`: docs の入口
- `docs/development.md`: 開発環境と検証コマンド
- `docs/libraries.md`: 使用ライブラリの採用理由と注意点
- `docs/content-and-assets.md`: コンテンツと画像・動画・アイコン素材の管理ルール
- `docs/plans/`: 実装前の計画や再設計方針

存在しない docs ディレクトリは前提にしません。必要になった時点で追加します。

## 設定ファイル

- `package.json`: scripts と依存関係。通常確認は `pnpm lint`、`pnpm typecheck`、`pnpm build`。
- `components.json`: shadcn の alias 設定。`hooks` は `@/hooks` とし、実体は `src/hooks/` に置く。
- `eslint.config.mjs`: Next.js 標準設定をベースに、未使用 import など明確な品質ルールだけを最小追加する。
- `tsconfig.json`: `@/* -> ./src/*` を維持する。`allowJs` の整理は別タスクで判断する。
- `next.config.ts` / `postcss.config.mjs`: 画像設定と Tailwind v4 PostCSS 設定を扱う。

## データ更新

プロフィール、リンク、スキル、プロジェクトなどの表示データは `src/content/site/` を更新します。Project 画像・動画・PDF は `public/assets/projects/` に置き、`src/content/site/projects.ts` から参照します。
