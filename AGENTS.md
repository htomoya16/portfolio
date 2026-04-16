# Overview

本プロジェクトは、**就活向けの個人ポートフォリオサイト** を構築・刷新するためのリポジトリである。
目的は、**大規模プロダクト / 基盤寄りの企業に対して、成長意欲・技術的な土台・研究と開発の両立を伝えられる、モダンでデプロイ可能なサイトを作ること** である。

本ドキュメントは、codex（AI Agent）がプロジェクトの意図とターゲット構造を理解し、迷わず実装・改修できるようにするための必須ガイドである。

---

# Product Goals

- 就活向けに、信頼感と技術的な厚みの両方を伝える
- 研究 / XR / Haptics の個性を残しつつ、実務での成長余地が見える構成にする
- Vercel にデプロイ可能で、`build` が安定して通る構成にする
- `shadcn/ui` をベースに、既製感の少ないデザインへ仕上げる

---

# Target Structure

現時点の repo 構成ではなく、**最終的に目指す構成** を以下とする。

```text
/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/              # shadcn/ui ベースの再利用 UI
│   │   └── sections/        # Hero, Timeline, Projects などの画面セクション
│   ├── content/
│   │   ├── projects/        # featured project の MDX / frontmatter
│   │   └── site/            # skills, timeline, links などの型付きデータ
│   ├── lib/                 # content loader, metadata helper, utility
│   └── styles/              # 必要な場合のみ補助スタイル
├── public/
│   ├── images/
│   └── favicon.ico
├── docs/
│   ├── README.md
│   └── plans/
├── package.json
└── AGENTS.md
```

補足:

- 旧来の `src/data` に分散した単純配列は、長期的には `src/content` へ整理する
- v1 のプロジェクト詳細は `route` ではなく `modal` で扱う
- `portfolio-site/` のような入れ子構成は移行対象であり、長期ターゲットではない

---

# Requirements

## 必須要件

- `Next.js App Router` を継続利用する
- `Tailwind CSS` を継続利用する
- `shadcn/ui` を UI 基盤として採用する
- `motion` を用いた中程度のアニメーションを許容する
- featured project の詳細本文に `MDX` を利用できる構成にする
- レスポンシブ対応を前提とする
- GitHub / Qiita / Mail への導線を必須とする
- Vercel デプロイ可能な状態を保つ

## 情報設計の必須セクション

1. Hero
2. Value / Growth Intent
3. Skills
4. Experience / Timeline
5. Featured Projects
6. Research
7. Contact

## 拡張要件

- featured project の case study を MDX で追加できること
- timeline をデータ駆動で更新できること
- metadata / OGP / favicon を整理すること
- 将来的な requirements docs の追加を阻害しないこと

---

# Design Direction

- 見た目の方向性は **Bold Experimental** を採用する
- ただし就活向けの可読性・信頼感を優先し、読みづらい演出は避ける
- `shadcn/ui` のデフォルト外観をそのまま使わず、テーマトークン・余白・タイポグラフィで独自性を出す
- セクション間の視線誘導、モーダル表示、ホバー演出には意味のある motion を使う
- `prefers-reduced-motion` を尊重する

---

# Agent Responsibilities

codex（AIエージェント）は以下に責務を持つ。

## 1. 実装判断

- React / Next.js / Tailwind / shadcn/ui のベストプラクティスに従う
- JSX を冗長にしすぎず、責務ごとにセクションと UI を分離する
- 「目先の画面修正」ではなく、長期的なターゲット構造に寄せる

## 2. UI 実装

- まず `shadcn/ui` の適切なプリミティブ利用を検討する
- 必要に応じて `ui/` 配下のコンポーネントをラップ / 拡張する
- 生の Tailwind だけで無理に組み立てず、設計可能な UI 層を保つ
- テーマトークンや共通クラスで一貫性を担保する

## 3. コンテンツ構造

- skills, timeline, projects, contacts などは型付きデータとして整理する
- featured project の詳細は MDX と frontmatter を前提に設計できる
- セクション本文・ラベル・導線は、就活向けのメッセージと整合するように保つ

## 4. 構造刷新

- フォルダ構成の変更は今回の刷新スコープに含まれる
- 旧構成に引きずられず、必要ならディレクトリ再編を行ってよい
- ただし移行は意図が分かるように行い、デプロイ可能性を損なわないこと

## 5. デプロイ / 品質

- `build` が通る構成を優先する
- 画像パス、MDX 解決、metadata 設定を壊さない
- Vercel で詰まりやすい点を意識して実装する

---

# Workflows

## [WF1] セクションを追加 / 再設計する場合

1. 対象セクションの目的を確認する
2. `components/sections/` に責務を切り出す
3. 必要なデータがある場合は `src/content/site/` へ追加する
4. 共通 UI が必要なら `components/ui/` または shadcn/ui ベースで整備する

## [WF2] featured project を追加 / 更新する場合

1. 一覧表示用の summary 情報を content layer に追加する
2. 詳細が必要な案件は MDX case study を追加 / 更新する
3. modal 表示に必要な frontmatter とリンク情報を揃える

## [WF3] timeline / growth intent を更新する場合

1. テキストを直接 page に埋め込まず、型付きデータへ寄せる
2. 年月、内容、役割、学びなどの単位で整理する
3. UI は section component 側で吸収し、データと表示を分離する

## [WF4] デザイン修正を行う場合

1. まず theme token / 共通 UI / section layout で解決できないか検討する
2. 単発の Tailwind クラス追加より、再利用できる設計を優先する
3. アニメーションを追加する場合は、意味のある動きかを確認する

## [WF5] フォルダ構成を刷新する場合

1. 移行先の責務を明確にする
2. import の崩れと deploy 影響を最小化する
3. 一時的な互換層が必要なら短期的に許容する

---

# Output Policy

codex は以下のポリシーに従う。

### 1. diff 形式を優先

既存ファイルを修正する場合は diff を優先して示す。

### 2. 説明は簡潔に

- なぜその構成変更が必要か
- なぜその UI / データ分割にしたか
- なぜそのライブラリや primitive を使うか

を 1〜3 行で説明する。

### 3. 最小安全差分を基本とする

- 不要な巻き込み変更を避ける
- ただし今回の刷新方針に必要な広めの再構成は許容する
- 構造刷新を理由なく避けない

### 4. UI は shadcn/ui first

- まず既存 primitive の活用を検討する
- 足りない見た目は wrapper や variant で調整する
- 生の Tailwind だけで UI 体系を散らさない

### 5. 不要な CSS を増やさない

- Tailwind と theme token で表現できるものを優先する
- `globals.css` はベースレイヤとトークン定義に寄せる
- ページ固有の複雑な見た目を無秩序な CSS へ逃がさない

### 6. deploy を常に意識する

- `build` が通ること
- asset path が壊れないこと
- MDX / content 読み込みが本番でも成立すること

---

# Allowed Additions

以下は今回の刷新で承認済みとみなす。

- `shadcn/ui`
- `motion`
- `MDX`

---

# Prohibited

- 不要な CMS 導入
- 目的の薄い大規模ライブラリ追加
- ルートの乱立や、情報設計を崩す arbitrary なページ増設
- 採用向けの読みやすさを損なう過剰演出
- build / deploy の確認を後回しにした構造変更
- 一時しのぎの直書きデータを増やして content 設計を崩すこと

---

# Docs Index

刷新計画や今後の参照先は以下を基本とする。

```text
docs/
  README.md
  plans/
    portfolio-refresh.md
  requirements/
    ...future...
```

実装前の設計判断や再設計方針は `docs/plans/` に置く。
機能要件や詳細仕様は今後 `docs/requirements/` に分離していく。
