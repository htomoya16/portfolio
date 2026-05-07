# Content and Assets

最終更新: 2026-05-07

このドキュメントは、ポートフォリオの表示文言、実データ、画像・動画・アイコン素材の管理ルールをまとめる。
画面へ直接テキストやパスを増やす前に、まず `src/content/site/` と `public/assets/` で表現できるか確認する。

## Content Source

表示データは `src/content/site/` を正とする。

- `hero.ts`: Hero の見出し、説明、CTA、ticker
- `about.ts`: About の概要、milestone、アイコン
- `skills.ts`: Skill カテゴリ、レベル、レベルガイド、skill icon
- `projects.ts`: Project card、modal、media、技術スタック、リンク
- `experience.ts`: Experience timeline
- `contact.ts`: Contact card、stats、リンク
- `navigation.ts`: nav と side rail
- `meta.ts`: site metadata

新しい文言や表示順を変える場合は、component へ直書きせず上記ファイルを先に更新する。

## Project Data

Project は `src/content/site/projects.ts` の `Project` 型に合わせる。

重要な項目:

- `previewImage`: Project card 上部に出す画像
- `media`: Project modal 左側 carousel に出す画像・動画
- `orientation`: `landscape` / `portrait` / `square`
- `tags`: skills にある技術名を優先して使う
- `repoUrl`: GitHub ボタン
- `demoUrl`: YouTube などの demo 導線
- `background`, `devContent`, `highlights`, `challenges`, `learnings`: modal 右側本文

動画や縦画像を追加したら、実際の向きに合わせて `orientation` を必ず指定する。
横動画を `portrait` にすると modal stage と lightbox が縦長になって崩れる。

## Asset Paths

素材は用途別に置く。

```text
public/assets/
├── decor/                # セクション装飾や背景パターン
├── hero/                 # Hero 元素材、frames、generated
├── icons/
│   ├── about/            # About milestone icon
│   ├── contact/          # Qiita / Protopedia など
│   ├── misc/             # info, external link などの汎用 icon
│   ├── projects/         # Project modal の section/meta/action icon
│   └── skills/           # skill card / project tech stack icon
└── projects/
    ├── Lovender/
    ├── chatclub/
    ├── hapticpiano/
    └── raspi-vpn-wol/
```

一時的な mock asset は残さない。
実データに差し替えたら、使わなくなった mock component や mock 画像も削除する。

## Project Media Rules

- Project card 用の画像は `*-preview.jpg` など、一覧用だと分かる名前にする
- modal carousel 用の画像・動画は project ごとのフォルダに置く
- PDF を carousel に載せる場合は、ページごとの PNG を `pages/` に書き出して参照する
- 動画 thumbnail は `poster` を明示する
- YouTube など外部動画は `demoUrl` に置き、modal の media には基本的にローカル動画を使う

例:

```ts
previewImage: {
  src: '/assets/projects/chatclub/chatclub-preview.jpg',
  alt: 'Chatclub Discord bot preview',
},
media: [
  {
    type: 'video',
    src: '/assets/projects/chatclub/chatclub1.mp4',
    poster: '/assets/projects/chatclub/chatclub2.png',
    orientation: 'landscape',
    alt: 'Chatclub Discord bot operation video',
    caption: 'Discordコマンドから戦績を確認する操作デモ',
  },
]
```

## Skill Icons

Skill の正規データは `src/content/site/skills.ts`。
Project card と Project modal の技術スタックも、できるだけ skills にある名称・アイコンを使う。

アイコン追加時の確認:

- `public/assets/icons/skills/` に配置する
- `skills.ts` の `iconSrc` を更新する
- Project card で使う場合は `ProjectsGrid.tsx` の icon map を更新する
- Project modal で使う場合は `ProjectModal.tsx` の tech icon map を更新する

## Hero Generated Assets

Hero 右側のブラックホール演出は生成済み asset を表示する。

入力:

- `public/assets/hero/frames/blackhole_frame_01.png` から `blackhole_frame_16.png`

生成コマンド:

```bash
uv run python tools/generate_hero_blackhole.py
```

出力:

- `public/assets/hero/generated/blackhole-pixel.webp`
- `public/assets/hero/generated/blackhole-pixel-poster.png`

`prefers-reduced-motion` では poster を使う。
生成スクリプトを変えた場合は、出力 asset も更新して build で参照切れがないか確認する。

## Verification

通常の変更後:

```bash
pnpm lint
pnpm build
```

Hero 生成ツールを変更した場合:

```bash
uv run python tools/generate_hero_blackhole.py
pnpm lint
pnpm build
```

ブラウザで確認する場合は、ユーザー指示があるときだけ dev server を起動して確認する。
