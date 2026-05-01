# Portfolio Refresh Plan

最終更新: 2026-05-01

## 概要

本計画は、既存のポートフォリオサイトを就活向けに刷新するための実装方針を定めるものである。対象読者は、LINEヤフーを含む大規模プロダクト / 基盤寄りの企業の採用担当者・エンジニアを想定する。

刷新後のサイトは、研究・XR/Haptics の個性を残しつつ、実務での成長余地や技術的な土台の強さが伝わる構成を目指す。見た目は印象に残る方向へ寄せるが、読みやすさと信頼感を損なわないことを優先する。

## デザイン / 体験方針

- ビジュアル方針は `Bold Experimental` を採用する
- ただし採用向けの可読性を保つため、情報のまとまり・余白・タイポグラフィは整然と設計する
- UI 基盤には `shadcn/ui` を採用し、既定の見た目をそのまま使わず、テーマトークンとレイアウトで独自性を出す
- アニメーションは `GSAP`, `Anime.js`, `Lenis` を中心に中程度まで導入する
- アニメーションは装飾だけに使わず、視線誘導・情報の切り替え・モーダル体験の向上に使う
- `prefers-reduced-motion` に配慮する

## 技術方針

- フレームワークは `Next.js App Router` を継続利用する
- スタイリングは `Tailwind CSS v4` を継続し、UI プリミティブは `shadcn/ui` を優先する
- 主要プロジェクトのケーススタディ本文を追加する場合は `MDX` で管理する
- データは現在の `src/content/site` を正とし、画面へ直書きする情報は段階的にここへ寄せる
- 画像やメタデータは Vercel デプロイを前提に壊れない構成とする

## 情報設計

現在のトップページは以下のセクション構成を正とする。

1. Hero
2. About
3. Skills
4. Projects
5. Experience
6. Contact
7. Footer

各セクションの意図は以下の通り。

- Hero: 名前、専門領域、第一印象、現在地を短く伝える
- About: 成長したい方向、向き合いたい課題、志向する環境を明示する
- Skills: 実務寄りに解釈しやすい技術スタックと強みを整理する
- Experience: 研究、開発、学習、活動の流れを時系列で見せる
- Projects: 代表プロジェクトの要約を並べ、詳細へ誘導する
- Contact: GitHub / Qiita / Mail を中心にシンプルに導線を置く

追加候補:

- Value / Growth Intent: About から独立させる価値が出た場合に追加する
- Research: 卒業研究や技術的な深掘りテーマを独立表示したい場合に追加する

## プロジェクト詳細の扱い

- 現在は `src/content/site/projects.ts` の summary データを card として表示する
- 詳細表示を追加する場合は、専用 route ではなくトップページ上の `Dialog` / モーダルを優先する
- MDX case study を追加する場合は、その時点で `src/content/projects/` を作成する
- モーダルには「背景」「課題」「実装」「工夫」「学び」「関連リンク」を載せられる構成を想定する

## 現在のアーキテクチャ

現在の repo 構成を正とする。存在しない `src/lib`, `src/styles`, `src/content/projects` は、必要になった時点で追加する。

```text
/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   └── sections/
│   ├── content/
│   │   └── site/
├── public/
├── docs/
│   ├── README.md
│   ├── libraries.md
│   └── plans/
├── package.json
└── AGENTS.md
```

補足:

- `src/components/ui`: shadcn/ui ベースの再利用 UI
- `src/components/sections`: Hero や Timeline などの画面セクション
- `src/content/site`: skills / timeline / links などの型付きデータ
- `public`: 画像・アイコン・既存素材
- `docs`: 設計方針、ライブラリ、今後の計画

## コンテンツモデル方針

現在は以下の型付きデータを正とする。

- `Project`
- `ExperienceItem`
- `SkillCategory`
- `SkillTile`
- `TimelineItem`

今後 project を拡張する場合は、現在の `Project` に必要な情報だけを足す。

- `slug`
- `title`
- `summary`
- `role`
- `stack`
- `highlights`
- `coverImage`
- `links`
- `featured`

## 受け入れ条件

- `docs/README.md` から本計画書へ辿れる
- `AGENTS.md` と本計画書で、セクション構成・採用技術・データ構成の前提が一致している
- 今後の実装担当者が、追加質問なしで UI / コンテンツ / 構造の方向性を理解できる
- `Next.js`, `shadcn/ui`, `MDX`, animation / scroll libraries の役割分担が明確である
- 使用ライブラリの役割は `docs/libraries.md` に整理されている

## テスト観点

- `pnpm lint` と `pnpm build` が通ること
- モバイル / タブレット / デスクトップで主要セクションのレイアウトが破綻しないこと
- Project modal を追加した場合は、開閉とキーボード操作に対応すること
- MDX を追加した場合は、frontmatter と本文が正しく解決されること
- reduced motion 環境で過剰なアニメーションが抑制されること
- GitHub / Qiita / Mail の導線が正しく動作すること

## 前提 / 既定値

- メイン言語は日本語とする
- 英語はラベルや補助的な見出しに限定して使う
- `GSAP`, `@gsap/react`, `Anime.js`, `Lenis`, `@chenglou/pretext`, `MDX` の導入は承認済みとみなす
- v1 ではダークモード切替を必須にしない
- v1 では `/projects/[slug]` のような専用詳細ページは作らない
