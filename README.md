# Portfolio Site

堀田智哉（Hotta Tomoya）のポートフォリオサイトです。


- 本番: https://htomoya16.dev/
- ソース: repository root

## Stack

- Next.js App Router / React / TypeScript
- Tailwind CSS v4
- Base UI + shadcn style components
- GSAP / Anime.js / Lenis
- Embla Carousel
- Python + Pillow for generated hero assets

## Local Development

```bash
nvm use
corepack enable
pnpm install
pnpm dev
```

主な確認コマンド:

```bash
pnpm lint
pnpm build
```

## Site Sections

1. Hero
2. About
3. Skills
4. Projects
5. Experience
6. Contact
7. Footer

## Content

表示文言や実データは `src/content/site/` を正とします。
Project の画像・動画・PDF・アイコンは `public/assets/` 配下で管理します。

詳しい開発環境と更新ルール:

- [docs/development.md](./docs/development.md)
- [docs/content-and-assets.md](./docs/content-and-assets.md)
- [docs/libraries.md](./docs/libraries.md)
