# Development Setup

最終更新: 2026-05-09

このプロジェクトでは、ローカル開発と Codex からの検証を安定させるために Node.js と pnpm を repo 側で固定する。

## Runtime

- Node.js: `.nvmrc` のバージョンを使う
- Package manager: `package.json` の `packageManager` に固定した pnpm を使う
- Dev server: `pnpm dev`
- Local URL: `http://localhost:3000`
- Python tools: `uv` + `pyproject.toml`

## First Setup

```bash
nvm use
corepack enable
corepack prepare pnpm@10.25.0 --activate
pnpm install
```

`nvm use` で `.nvmrc` の Node.js が選ばれる。
`corepack` は `package.json` の `packageManager` と合わせて pnpm のバージョンずれを防ぐ。

Python 生成ツールを使う場合:

```bash
uv sync
```

`.venv/` はローカル生成物なので commit しない。

## Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm check
pnpm build
```

`pnpm check` は `lint` と `typecheck` の軽量確認用。
本番相当の確認は `pnpm build` を分けて実行する。
Codex から実行する場合も、まずこのコマンド群を基準にする。
Turbopack / Next.js の build が sandbox の port bind 制限で失敗する場合は、同じ `pnpm build` を通常権限で再実行する。

Hero 用ブラックホール素材を再生成する場合:

```bash
uv run python tools/generate_hero_blackhole.py
```

入力:

- `public/assets/hero/frames/blackhole_frame_01.png` から `blackhole_frame_16.png`

出力:

- `public/assets/hero/generated/blackhole-pixel.webp`
- `public/assets/hero/generated/blackhole-pixel-poster.png`

## Codex Notes

Codex が Windows 側の Node.js / pnpm を拾っている場合は、Codex アプリを再起動して WSL 側の PATH を取り直す。
再起動後も解決しない場合は、WSL 内で以下を確認する。

```bash
which node
which npm
which pnpm
echo $PATH
```

期待する優先順位は `.nvm` 配下の Node.js が Windows 側 `/mnt/c/...` より前に来ること。

Browser Use は repo の pnpm 設定とは別に、Codex 側で Browser Use plugin と Node REPL `js` tool が公開されている必要がある。
使える状態では `pnpm dev` で dev server を立ち上げ、Browser Use で `http://localhost:3000` を開いて UI を確認する。

## Animation Stack

- GSAP / `@gsap/react`: Hero intro, section reveal, project card entrance
- Anime.js: dot-style labels and hover micro interactions
- Lenis: smooth scroll
- Embla Carousel: Project modal media carousel
- Base UI Dialog: Project modal

`prefers-reduced-motion: reduce` の場合は、Lenis と主要な reveal / scramble animation を弱める。

## Content Updates

表示文言や実データは `src/content/site/` を更新する。
画像・動画・PDF・アイコンの置き場所は [content-and-assets.md](./content-and-assets.md) を参照する。
