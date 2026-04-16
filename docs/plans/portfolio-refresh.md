# Portfolio Refresh Plan

最終更新: 2026-04-17

## 概要

本計画は、既存のポートフォリオサイトを就活向けに刷新するための実装方針を定めるものである。対象読者は、LINEヤフーを含む大規模プロダクト / 基盤寄りの企業の採用担当者・エンジニアを想定する。

刷新後のサイトは、研究・XR/Haptics の個性を残しつつ、実務での成長余地や技術的な土台の強さが伝わる構成を目指す。見た目は印象に残る方向へ寄せるが、読みやすさと信頼感を損なわないことを優先する。

## デザイン / 体験方針

- ビジュアル方針は `Bold Experimental` を採用する
- ただし採用向けの可読性を保つため、情報のまとまり・余白・タイポグラフィは整然と設計する
- UI 基盤には `shadcn/ui` を採用し、既定の見た目をそのまま使わず、テーマトークンとレイアウトで独自性を出す
- アニメーションは `motion` を用いて中程度まで導入する
- アニメーションは装飾だけに使わず、視線誘導・情報の切り替え・モーダル体験の向上に使う
- `prefers-reduced-motion` に配慮する

## 技術方針

- フレームワークは `Next.js App Router` を継続利用する
- スタイリングは `Tailwind CSS v4` を継続し、UI プリミティブは `shadcn/ui` を優先する
- 主要プロジェクトのケーススタディ本文は `MDX` で管理する
- データは `src/data` に分散した単純配列ではなく、`src/content` もしくは同等の集約レイヤに整理する
- 画像やメタデータは Vercel デプロイを前提に壊れない構成とする

## 情報設計

トップページの主要セクションは以下を基本とする。

1. Hero
2. Value / Growth Intent
3. Skills
4. Experience / Timeline
5. Featured Projects
6. Research
7. Contact

各セクションの意図は以下の通り。

- Hero: 名前、専門領域、第一印象、現在地を短く伝える
- Value / Growth Intent: 成長したい方向、向き合いたい課題、志向する環境を明示する
- Skills: 実務寄りに解釈しやすい技術スタックと強みを整理する
- Experience / Timeline: 研究、開発、学習、活動の流れを時系列で見せる
- Featured Projects: 代表プロジェクトの要約を並べ、詳細へ誘導する
- Research: 卒業研究や技術的な深掘りテーマを整理する
- Contact: GitHub / Qiita / Mail を中心にシンプルに導線を置く

## プロジェクト詳細の扱い

- v1 では専用ルートは作らず、トップページ上の `Dialog` / モーダルで詳細を表示する
- 一覧には概要、役割、技術、成果の要約を載せる
- 主要案件の詳細本文は `MDX` で保持し、モーダル内で描画する
- モーダルには少なくとも「背景」「課題」「実装」「工夫」「学び」「関連リンク」を載せられる構成を想定する

## 想定アーキテクチャ

リポジトリの最終目標は、ルート直下をアプリ本体とする構成である。

```text
/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── ui/
│   │   └── sections/
│   ├── content/
│   │   ├── projects/
│   │   └── site/
│   ├── lib/
│   └── styles/
├── public/
├── docs/
│   └── plans/
├── package.json
└── AGENTS.md
```

補足:

- `src/components/ui`: shadcn/ui ベースの再利用 UI
- `src/components/sections`: Hero や Timeline などの画面セクション
- `src/content/projects`: featured project の MDX と frontmatter
- `src/content/site`: skills / timeline / links などの型付きデータ
- `src/lib`: content loader, utility, metadata helper など

## コンテンツモデル方針

最低限、以下の概念を明示的な型として扱う。

- `ProjectSummary`
- `ProjectCaseStudyFrontmatter`
- `TimelineEntry`
- `SkillGroup`
- `ContactLink`

各 featured project には少なくとも以下の情報を持たせる。

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
- `Next.js`, `shadcn/ui`, `motion`, `MDX` の役割分担が明確である

## テスト観点

- `pnpm lint` と `pnpm build` が通ること
- モバイル / タブレット / デスクトップで主要セクションのレイアウトが破綻しないこと
- モーダルで featured project 詳細が開閉でき、キーボード操作にも対応すること
- MDX の frontmatter と本文が正しく解決されること
- reduced motion 環境で過剰なアニメーションが抑制されること
- GitHub / Qiita / Mail の導線が正しく動作すること

## 前提 / 既定値

- メイン言語は日本語とする
- 英語はラベルや補助的な見出しに限定して使う
- `motion` と `MDX` の導入は承認済みとみなす
- v1 ではダークモード切替を必須にしない
- v1 では `/projects/[slug]` のような専用詳細ページは作らない
