export const experienceCopy = {
  sectionNumber: '// 04',
  sectionTitle: 'EXPERIENCE',
} as const

export interface ExperienceItem {
  date: string
  badge: string
  tone: string
  title: string
  desc: string
  links?: {
    label: string
    href: string
  }[]
  current?: boolean
}

export const experiences: ExperienceItem[] = [
  {
    date: '2022.04',
    badge: 'START',
    tone: 'dark',
    title: '東京電機大学 理工学部 理工学科 情報システムデザイン学系 入学',
    desc: '情報系・プログラミングの基礎を学び始める。',
    links: [
      {
        label: '情報システムデザイン学系',
        href: 'https://www.dendai.ac.jp/about/undergraduate/rikougaku/rd/',
      },
    ],
  },
  {
    date: '2023.09 - 2023.10',
    badge: 'HACKATHON',
    tone: 'blue',
    title: 'Hack U 東京電機大学 2023 参加',
    desc: '約2週間の開発期間で、チームによる企画・実装・発表を経験。短期間でプロダクトを形にする難しさと面白さを学ぶ。',
    links: [
      {
        label: 'Hack U 2023',
        href: 'https://hacku.yahoo.co.jp/dendai2023/',
      },
    ],
  },
  {
    date: '2024.09 - 2024.10',
    badge: 'HACKATHON',
    tone: 'blue',
    title: 'Hack U 東京電機大学 2024 参加',
    desc: 'Railsを用いて初めてバックエンド開発を経験。思うように実装できず悔しさを感じる一方で、Webアプリケーションの裏側で動く仕組みの難しさと面白さを知るきっかけとなった。',
    links: [
      {
        label: 'Hack U 2024',
        href: 'https://hacku.yahoo.co.jp/dendai2024/',
      },
    ],
  },
  {
    date: '2025.04 - 2026.03',
    badge: 'RESEARCH',
    tone: 'violet',
    title: 'IoE/M2Mソリューション研究室 在籍',
    desc: '卒業研究「グローブ型リアルハプティックデバイスによる仮想空間ピアノ体験」に取り組む。XR・ハードウェア・ソフトウェアを組み合わせた研究を経験。',
    links: [
      {
        label: '研究室サイト',
        href: 'https://www.kamlab.rd.dendai.ac.jp/',
      },
    ],
  },
  {
    date: '2025.06 - 2025.10',
    badge: 'CERTIFICATION',
    tone: 'green',
    title: '基本情報技術者試験・応用情報技術者試験 合格',
    desc: '学業や研究と並行しながら、4か月で両試験に一発合格。試験日から逆算して学習計画を立て、Hack Uと重なる時期も優先順位を調整しながら取り組んだ。',
    links: [
      {
        label: 'Qiita 基本情報',
        href: 'https://qiita.com/htomoya16/items/0c69735a988c0e341db0',
      },
      {
        label: 'Qiita 応用情報',
        href: 'https://qiita.com/htomoya16/items/2f4fb2588bc03c519ce7',
      },
    ],
  },
  {
    date: '2025.09 - 2025.10',
    badge: 'AWARD',
    tone: 'lime',
    title: 'Hack U 東京電機大学 2025 東京電機大学賞 受賞',
    desc: 'バックエンド開発を担当し、チームでWebアプリケーションを開発。ユーザーから見えない部分の設計・実装がサービス体験を支えることを実感。',
    links: [
      {
        label: 'Hack U 2025',
        href: 'https://hacku.yahoo.co.jp/dendai2025/',
      },
    ],
  },
  {
    date: '2025.10 -',
    badge: 'DEV',
    tone: 'blue',
    title: 'バックエンド中心の個人開発を開始',
    desc: 'Hack Uでの経験をきっかけに、API、データベース、認証、CI/CD、運用など、Webアプリケーションを支える仕組みづくりを学習・実践。',
  },
  {
    date: '2026.04',
    badge: 'EDUCATION',
    tone: 'dark',
    title: '東京電機大学大学院 理工学研究科 情報学専攻 入学',
    desc: 'バックエンド・Webアプリケーション開発を中心に、継続して学習・開発に取り組み中。',
    links: [
      {
        label: '大学院 情報学専攻',
        href: 'https://www.dendai.ac.jp/about/graduate/rikougaku/rmd/',
      },
    ],
    current: true,
  },
]
