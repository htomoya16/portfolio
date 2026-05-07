# Libraries

最終更新: 2026-05-07

このドキュメントは、ポートフォリオ刷新で使うライブラリの役割と使い分けをまとめる場所です。
実装時は「何でも入れる」のではなく、表現したい体験に対して最小限の組み合わせを選びます。

## Installed

```bash
pnpm add @base-ui/react @gsap/react animejs embla-carousel-react gsap lenis lucide-react shadcn
pnpm add class-variance-authority clsx tailwind-merge tw-animate-css
```

Python 側の生成ツールは `uv` と `pyproject.toml` で管理する。

```bash
uv add pillow
uv run python tools/generate_hero_blackhole.py
```

`@chenglou/pretext`、MDX、液体ガラス専用ライブラリは現時点では未導入。
必要になった時点で、目的と既存ライブラリとの重複をこのドキュメントへ追記してから追加する。

## Core UI

### Base UI

- Package: `@base-ui/react`
- 用途: Dialog, Button などの accessible primitive
- 現状: `src/components/ui/dialog.tsx`, `src/components/ui/button.tsx` の土台
- 方針: 振る舞いとアクセシビリティは primitive に寄せ、見た目は site CSS で調整する
- 注意: modal / dialog を自前実装で増やさない

### shadcn style components

- Package: `shadcn`
- 用途: UI component の構成パターン、carousel などの追加
- 現状: `src/components/ui/carousel.tsx` などを repo 内に持つ
- 方針: CLI で追加した component も、そのまま使わず既存の retro / pixel HUD トーンへ寄せる
- 注意: 追加後は `components.json` と生成ファイルの責務を確認する

### Embla Carousel

- Package: `embla-carousel-react`
- 用途: Project modal 左側の media carousel
- 現状: `src/components/ui/carousel.tsx` 経由で使用
- 方針: 画像・動画の切り替え、thumb 同期、キーボード操作、動画 pause を carousel 側で扱う
- 注意: 親ページスクロール、モーダル内スクロール、drag 操作が競合しないようにする

### MDX

- 用途: Featured Project の case study 本文候補
- 現状: 未導入。現在の project summary と modal 本文は `src/content/site/projects.ts` を正とする
- 方針: 長文 case study が必要になった時点で `src/content/projects/` を追加し、summary と詳細本文を分ける

## Animation / Interaction

### GSAP

- Docs: https://gsap.com/docs/v3/GSAP/
- Package: `gsap`
- 用途: Hero intro、セクション登場、複数要素の timeline、スクロール連動、複雑な演出
- 方針: 大きめの演出は GSAP に寄せる。`gsap.timeline()` で動きの順序を明示する
- 注意: React component 内では DOM 操作の cleanup を必ず考える

### GSAP React

- Docs: https://gsap.com/resources/React/
- Package: `@gsap/react`
- 用途: React / Next.js client component で GSAP を安全に使う
- 方針: `useGSAP()` を基本にし、`scope` を指定して selector の影響範囲を閉じる
- 注意: click handler や delayed callback 内で作る animation は `contextSafe()` を使う

### Anime.js

- Docs: https://animejs.com/documentation/
- Package: `animejs`
- 用途: `scrambleText()` によるドット風ラベルの文字演出、小さな hover / icon / SVG / 数値 / isolated interaction
- 方針: GSAP timeline が不要な局所的アニメーションに使う。短い英字ラベル、section number、project badge、contact prompt などに限定する
- 注意: GSAP と Anime.js で同じ DOM 要素の同じ property を同時に制御しない

### Lenis

- Docs: https://lenis.darkroom.engineering/
- Package: `lenis`
- 用途: サイト全体の smooth scroll とスクロール体験の統一
- 方針: global provider か client component で初期化し、必要なら GSAP ticker と同期する
- 注意: `prefers-reduced-motion` では無効化または弱める。ページ内検索、sticky、anchor link の動作を壊さない

### Lucide React

- Package: `lucide-react`
- 用途: shadcn 系 component の汎用 icon、carousel arrow など
- 方針: 汎用 UI 操作は lucide、ブランド・技能・プロジェクト固有アイコンは `public/assets/icons/**` の SVG/PNG を使う
- 注意: 同じ意味の icon を複数フォルダに重複させない

### Pillow

- Package: `pillow`
- 用途: `public/assets/hero/frames/*.png` から Hero 用 pixel blackhole animation を生成
- 方針: 生成スクリプトは `tools/generate_hero_blackhole.py` に置き、出力は `public/assets/hero/generated/` に置く
- 注意: 生成物は表示に必要なため commit 対象。`.venv/` は commit しない

### pretext

- Repo: https://github.com/chenglou/pretext
- Package: `@chenglou/pretext`
- 現状: 未導入
- 用途: DOM reflow を避けたい動的テキスト計測、canvas / SVG / WebGL 的な文字レイアウト実験
- 方針: 普通の見出しや本文には使わない。必要な箇所だけ `prepare()` と `layout()` の責務を分けて使う
- 注意: 同じ text / font config で `prepare()` を再実行しすぎない。通常の responsive typography は CSS で解決する

## Selection Rules

- Scroll experience: Lenis
- Main choreographed animation: GSAP + `@gsap/react`
- Short text decode effect: Anime.js `scrambleText()`
- Small isolated micro interaction: Anime.js
- Modal primitive: Base UI Dialog
- Project media carousel: shadcn style carousel + Embla
- Generated hero assets: Pillow
- Dynamic text measurement experiment: pretext（未導入）

複数ライブラリを同じ場所に重ねる場合は、担当する property と lifecycle を明確に分けます。
GSAP ScrambleTextPlugin は使わず、文字 scramble は Anime.js `scrambleText()` に統一します。
