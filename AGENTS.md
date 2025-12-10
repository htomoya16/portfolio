# Overview

本プロジェクトは **Next.js + Tailwind CSS** を用いて、「かっこいい個人ポートフォリオサイト」を構築するためのリポジトリである。
目的は、**最短で整ったかっこいいデザイン・構造を持つポートフォリオサイトを構築し、Vercelにデプロイできる状態にすること**である。

本ドキュメントは、codex（AI Agent）がプロジェクト構造を理解し、適切にコード生成・修正できるようにするための **必須ガイド**である。

---

# Project Structure (Target)

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # 全ページ共通レイアウト
│   │   ├── page.tsx          # トップページ（Hero / Skills / Projects / Research / Contact）
│   │   └── projects/         # （任意）プロジェクト一覧追加時のルート
│   ├── components/           # UI コンポーネント（Card, Section, Button など）
│   └── styles/
│       └── globals.css       # Tailwind ベースのスタイル
├── public/
│   ├── images/               # プロジェクト画像・アイキャッチ
│   └── favicon.ico
├── package.json
├── tailwind.config.ts
└── AGENTS.md                 # このドキュメント
```

---

# Requirements

## 必須要件

* Next.js（app router）を使用した SPA 風ポートフォリオサイト
* Tailwind CSS を利用した簡潔でモダンな UI
* 主要セクションは以下の通り：

  1. Hero
  2. Skills
  3. Projects
  4. Research
  5. Contact
* レスポンシブ対応（モバイル / PC）
* GitHub リポジトリ・X・メールへのリンク
* デプロイ可能な状態（Vercel 推奨）

## 拡張要件（任意）

* Projects を JSON / 配列でデータ駆動にする
* ページ分割（`/projects`）
* Image コンポーネント導入
* ダーク/ライトテーマスイッチ（余裕があれば）

---

# Agent Responsibilities

codex（AIエージェント）は以下に責務を持つ。

## 1. コード生成

* React / Next.js / Tailwind のベストプラクティスに従う
* 冗長な入れ子や不要な div を避け、読みやすい JSX を生成
* Tailwind クラスは整理された順序で記述（レイアウト → 色 → テキスト → その他）

## 2. 既存コードの修正

* ファイルの責務に応じて適切な編集を行う

  * UI → `components/`
  * ページ → `app/*`
  * スタイル → `globals.css` or Tailwind
* diff 出力を優先し、必要最小限の変更を行う

## 3. ディレクトリ構造の保持

* ファイル移動は必ず理由を説明し、ユーザ承認を得た上で実施
* `src/app/page.tsx` はトップページの中核であり、破壊的変更は避ける

## 4. Tailwind コンポーネントの生成

* Section wrapper, Card, Button など汎用的な UI を自動生成可能
* レスポンシブクラス（`md:*`, `lg:*`）の付与
* 色は Slate / Cyan の系統を基本とする（既存デザインに合わせる）

## 5. デプロイサポート

* Vercel でのデプロイ設定（build command / env 確認）

---

# Workflows

## [WF1] 新セクションを追加する場合

1. 追加したいセクションの役割を説明
2. codex は以下を生成：

   * セクション用コンポーネント（e.g., `SectionTitle.tsx`, `Timeline.tsx`）
   * `page.tsx` への追加
3. 必要なデータ構造を `projects` のような配列で生成


---

## [WF2] デザイン修正（間隔・色・フォントなど）

1. ユーザが調整したいデザインを自然言語で説明
2. codex は Tailwind クラスを追加/修正
3. 修正理由を短く説明

---

## [WF3] コンポーネント分割

1. JSX が膨らんだら、ユーザが「分割したい」と指示
2. codex は `components/` ディレクトリに新ファイルを生成
3. import を調整し、コードをクリーンアップ
4. 必要なら props を定義して可読性を上げる

---

## [WF4] 画像やプロジェクトを追加する場合

1. ユーザがタイトル・説明・リンクを渡す
2. codex は `projects` 配列を更新し、カード UI として反映
3. 画像がある場合は `public/images/` を前提にパスをセット

---

# Output Policy

codex は以下のポリシーに従う。

### 1. **diff 形式を優先**

既存ファイルを修正する場合は必ず diff を提示する：

```diff
- <div className="p-4">Old</div>
+ <div className="p-6 rounded-xl bg-slate-900">New</div>
```

### 2. **説明は簡潔に**

* なぜそのクラス名を使うのか
* なぜそのコンポーネント分割が必要か
  などの意図を1〜2行で記述。

### 3. **破壊的変更禁止**

* 既存レイアウトに影響する改修を勝手に行わない
* 大規模リファクタは必ずユーザ承認を得ること

### 4. **Tailwind ベストプラクティス順序で書く**

Tailwind クラスは以下の順番で整える：

```
layout → spacing → border → color → typography → effects
```

例：

```html
<div class="flex items-center justify-between p-6 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 shadow-lg">
```

### 5. **不要な CSS を書かない**

Tailwind で表現できるものは Tailwind で書く。
`globals.css` に余計なスタイルを追加しない。

### 6. **Vercel デプロイを常に意識**

* `build` が通る構成にする
* 画像パス (`/images/...`) を壊さない

---

# 禁止事項

* 無断の大規模ファイル削除または移動
* Tailwind のダークモード設定変更（指示がある場合のみ）
* ページ構成の勝手な改変（Hero → Skills → Projects → Research → Contact の順番を崩さない）
* 過剰なライブラリ追加（React Icons, Framer Motion などはユーザの承認が必要）
* HTML/CSS のみで解決できることを複雑な JS で書くこと

---

# Index to Requirements Docs

プロジェクトの拡張時、参照すべき要件ドキュメント（これから追加していく想定）：

```
docs/
  requirements/
    README.md
    000-overview.md
    feature/
      hero.md
      skills.md
      projects.md
      research.md
      contact.md
    story/
      story-hero-animation.md
      story-projects-filtering.md
      story-theme-toggle.md
```

---