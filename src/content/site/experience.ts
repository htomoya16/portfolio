export interface ExperienceItem {
  date: string
  badge: string
  tone: string
  title: string
  desc: string
  current?: boolean
}

export const experiences: ExperienceItem[] = [
  {
    date: '2024.04 - NOW',
    badge: 'INTERN',
    tone: 'blue',
    title: 'Webエンジニアインターン / 株式会社○○○○',
    desc: '自社プロダクトの新機能開発にフロントエンドエンジニアとして参画。要件定義から実装・テストまでを担当。React / TypeScriptを中心に、チーム開発フローを実践している。',
    current: true,
  },
  {
    date: '2023.09 - 2023.12',
    badge: 'ハッカソン',
    tone: 'lime',
    title: 'ハッカソン参加 / ○○HACK 2023',
    desc: 'チームで地域課題解決アプリを開発し、優秀賞を受賞。企画・設計・フロントエンド全般を担当。48時間でMVPを完成させた経験が最大の収穫。',
  },
  {
    date: '2023.04 - 2023.08',
    badge: 'TALK',
    tone: 'violet',
    title: '技術勉強会・LT登壇 / ○○Tech Meetup',
    desc: '社会人エンジニアが集まる勉強会に学生枠で参加。「Reactのレンダリング最適化」をテーマにLT発表。フィードバックを通じて技術的な視野を広げた。',
  },
  {
    date: '2022.04 - 2024.03',
    badge: 'DEV',
    tone: 'green',
    title: '個人開発 / ポートフォリオ・各種Webアプリ',
    desc: '学習を目的に複数のWebアプリを開発・公開。Qiitaへの技術記事投稿（累計 1,200 views）や OSSへのコントリビュートにも取り組続。',
  },
  {
    date: '2022.04',
    badge: 'START',
    tone: 'dark',
    title: 'プログラミング学習開始 / 情報工学部 入学',
    desc: '大学入学と同時にプログラミングに本格的に着手。HTML/CSS → JavaScript → React の順でスタック習得。このポートフォリオがその集大成。',
  },
]
