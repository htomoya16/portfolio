export const contactCopy = {
  sectionNumber: '// 05',
  sectionTitle: 'CONTACT',
  statusLabel: 'Status: open to internship',
  statusText: 'OPEN',
  leadLines: [
    'インターンシップ・採用に関するご連絡、',
    'ポートフォリオへのフィードバックなど、お気軽にご連絡ください。',
  ],
  bodyLines: [
    'バックエンド開発を中心に学習・個人開発を進めており、',
    '今後はインターンシップを通じて実務経験を積みたいと考えています。',
  ],
  prompt: '> SEND MESSAGE',
} as const

export const contactStats = [
  { label: 'RESPONSE', pct: 95, display: '95%' },
  { label: 'COMMITS', pct: 80, display: '500+' },
  { label: 'PROJECTS', pct: 60, display: '8 WORKS' },
]

export const contactLinks = [
  {
    type: 'github',
    label: 'GITHUB',
    handle: '@htomoya16',
    href: 'https://github.com/htomoya16',
  },
  {
    type: 'protopedia',
    label: 'PROTOPEDIA',
    handle: '@htomoya16',
    href: 'https://protopedia.net/prototyper/htomoya16',
    icon: '/assets/icons/contact/protopedia.png',
  },
  {
    type: 'mail',
    label: 'MAIL',
    handle: 'h.tomotomo.family@gmail.com',
    href: 'mailto:h.tomotomo.family@gmail.com',
  },
  {
    type: 'qiita',
    label: 'QIITA',
    handle: '@htomoya16',
    href: 'https://qiita.com/htomoya16',
    icon: '/assets/icons/contact/qiita-icon.png',
  },
]
