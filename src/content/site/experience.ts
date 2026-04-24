export type ExperienceEntry = {
  date: string
  title: string
  desc: string
  current?: boolean
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    date: '2024.04 - NOW',
    title: 'Webエンジニアインターン / 株式会社〇〇〇〇',
    desc: '自社プロダクトの新機能開発にフロントエンドエンジニアとして参画。\n要件定義から実装・テストまでを担当。',
    current: true,
  },
  {
    date: '2023.09 - 2023.12',
    title: 'ハッカソン参加 / 〇〇HACK 2023',
    desc: 'チームで教育系アプリを開発し、優秀賞を受賞。\n企画・設計・フロントエンド実装を担当。',
  },
  {
    date: '2022.04 - 2024.03',
    title: '個人開発 / ポートフォリオ・各種Webアプリ',
    desc: '学習を目的に複数のWebアプリを開発・公開。\n技術ブログの執筆や登壇活動にも取り組む。',
  },
]
