# Portfolio Site

堀田智哉（Hotta Tomoya）のポートフォリオサイトです。

https://htomoya16.dev/

## Stack

Next.js (App Router) / React / TypeScript / CSS Modules / Tailwind CSS v4 / GSAP / Lenis

## Development

```bash
nvm use
corepack enable
pnpm install
pnpm dev
```

`pnpm check` で lint と型チェック、`pnpm build` で本番ビルドを確認できます。

## Structure

- `src/app/` — ページと全体のスタイル（`globals.css` はデザイントークンと土台だけ）
- `src/components/sections/home/` — ページの各セクション（見た目は同じフォルダの `*.module.css`）
- `src/components/` — そのほかの部品（`layout/` ナビ・フッター、`ui/` 共通部品、`decor/` 背景、`animation/` 演出、`pet/` ネギ）
- `src/content/site/` — 表示する文言とデータ（プロジェクトは `projects/` に 1 件 1 ファイル）
- `public/assets/` — 画像・動画・アイコン
