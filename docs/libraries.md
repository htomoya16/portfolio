# Libraries

最終更新: 2026-05-01

このドキュメントは、ポートフォリオ刷新で使うライブラリの役割と使い分けをまとめる場所です。
実装時は「何でも入れる」のではなく、表現したい体験に対して最小限の組み合わせを選びます。

## Install Candidates

```bash
pnpm add gsap @gsap/react animejs lenis @chenglou/pretext
```

## Core UI

### shadcn/ui

- 用途: Dialog, Button, Card などの UI primitive
- 方針: デフォルト外観をそのまま使わず、theme token / variant / wrapper でポートフォリオ向けに調整する
- 注意: 生 Tailwind だけで同じような UI を増やさない

### MDX

- 用途: Featured Project の case study 本文
- 現状: まだ未導入。現在の project summary は `src/content/site/projects.ts` を正とする
- 方針: MDX を導入する時点で `src/content/projects/` を追加し、summary と詳細本文を分ける
- 注意: 詳細 route を増やす前に、トップページ上の modal 表示を優先する

## Animation / Interaction

### GSAP

- Docs: https://gsap.com/docs/v3/GSAP/
- Package: `gsap`
- 用途: セクション登場、複数要素の timeline、スクロール連動、複雑な演出
- 方針: 大きめの演出は GSAP に寄せる。`gsap.timeline()` で動きの順序を明示する
- 注意: React component 内では DOM 操作の cleanup を必ず考える

### GSAP React

- Docs: https://gsap.com/resources/React/
- Package: `@gsap/react`
- 用途: React / Next.js client component で GSAP を安全に使う
- 方針: `useGSAP()` を基本にし、`scope` を指定して selector の影響範囲を閉じる
- 注意: click handler や delayed callback 内で作る animation は `contextSafe()` を使う

### GSAP ScrambleTextPlugin

- Docs: https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/
- Package: `gsap`
- 用途: Hero の肩書き、section label、terminal 風の短いテキスト演出
- 方針: 短い英字ラベルや技術キーワードに限定して使う
- 注意: 長文や本文には使わない。可読性を落とす演出にしない

### Anime.js

- Docs: https://animejs.com/documentation/
- Package: `animejs`
- 用途: 小さな hover / icon / SVG / 数値 / isolated interaction
- 方針: GSAP timeline が不要な局所的アニメーションに使う
- 注意: GSAP と Anime.js で同じ DOM 要素の同じ property を同時に制御しない

### Lenis

- Docs: https://lenis.darkroom.engineering/
- Package: `lenis`
- 用途: サイト全体の smooth scroll とスクロール体験の統一
- 方針: global provider か client component で初期化し、必要なら GSAP ticker と同期する
- 注意: `prefers-reduced-motion` では無効化または弱める。ページ内検索、sticky、anchor link の動作を壊さない

### pretext

- Repo: https://github.com/chenglou/pretext
- Package: `@chenglou/pretext`
- 用途: DOM reflow を避けたい動的テキスト計測、canvas / SVG / WebGL 的な文字レイアウト実験
- 方針: 普通の見出しや本文には使わない。必要な箇所だけ `prepare()` と `layout()` の責務を分けて使う
- 注意: 同じ text / font config で `prepare()` を再実行しすぎない。通常の responsive typography は CSS で解決する

## Selection Rules

- Scroll experience: Lenis
- Main choreographed animation: GSAP + `@gsap/react`
- Short text decode effect: GSAP ScrambleTextPlugin
- Small isolated micro interaction: Anime.js
- Dynamic text measurement experiment: pretext

複数ライブラリを同じ場所に重ねる場合は、担当する property と lifecycle を明確に分けます。
