# Portfolio Agent Guide

このリポジトリは、エンジニア向けポートフォリオサイトである。
新卒採用担当者・エンジニア面接官が見ることを想定し、見た目の個性だけでなく、読みやすさ・保守性・実装品質を重視する。


## Goals

- 採用担当者とエンジニアの両方に、信頼感・成長意欲・技術的な厚みが伝わるサイトにする
- 現在の構成を活かしつつ、デザイン品質を段階的に上げる
- Vercel にデプロイでき、`build` が安定して通る状態を保つ


## Current Structure

```text
/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── animation/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── sections/
│   │       └── home/
│   ├── content/
│   │   └── site/
│   ├── lib/
├── public/
├── docs/
│   ├── README.md
│   ├── libraries.md
│   └── plans/
├── package.json
└── AGENTS.md
```

## Page Sections

トップページは次の流れを基本にします。

1. Hero
2. About
3. Skills
4. Projects
5. Experience
6. Contact
7. Footer

GitHub / Qiita / Mail への導線は必須です。
Research や Value / Growth Intent は、独立させる価値が出た場合に追加します。

## Implementation Rules

- Next.js App Router / TypeScript / Tailwind CSS を前提にする
- トップページのセクションは `src/components/sections/home/`、layout は `src/components/layout/`、animation は `src/components/animation/` に置く
- 再利用 UI は `src/components/ui/` に置く
- skills, timeline, projects, links などは `src/content/` 配下の型付きデータに寄せる
- Featured Project の詳細を追加する場合は、MDX case study と modal 表示を優先する
- ページ固有の複雑な CSS を `globals.css` に増やしすぎない

## Design Rules

- 方向性は Bold Experimental。ただし就活向けの可読性を壊さない
- 既製テンプレート感を避け、タイポグラフィ・余白・グリッド・画像の使い方で差を出す
- 研究 / Haptics / Backend の実績が伝わる実画像や生成素材を活用する
- アニメーションは視線誘導、状態変化、モーダル、スクロール体験に意味がある場合だけ使う
- `prefers-reduced-motion` を尊重する

## Libraries

採用・検討中のライブラリは [docs/libraries.md](./docs/libraries.md) にまとめます。
新しいライブラリを追加する場合は、目的・使いどころ・既存ライブラリとの重複をそこへ追記してください。
ドット風フォントや短い mono label の文字演出は Anime.js `scrambleText()` を優先し、GSAP ScrambleTextPlugin は使いません。

## Quality Bar

- 変更後は可能な限り `pnpm lint` と `pnpm build` を確認する
- asset path, metadata, MDX/content loading, responsive layout を壊さない
- 不要な CMS、大きすぎる依存、情報設計を崩すページ追加は避ける
- 一時しのぎの直書きデータを増やさない

## Docs

- 実装前の設計判断や刷新方針: `docs/plans/`
- 使用ライブラリと採用理由: `docs/libraries.md`
- 現在存在しない docs ディレクトリは、必要になった時点で追加する
