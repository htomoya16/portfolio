export const skillsCopy = {
  sectionNumber: '# 02',
  sectionTitle: '## SKILLS',
  leadParagraphs: [
    '個人開発やインターンを通して、Webアプリケーションのバックエンド開発を中心に経験を積んできました。まだまだ学ぶことは多いですが、より良い設計や実装を目指しながら、一つひとつの開発に取り組んでいます。',
    'また、保守性や拡張性を意識したアーキテクチャ設計にも関心があります。今後は、大規模なサービスの開発を通して、性能・信頼性・運用まで考慮したバックエンド設計の専門性を高めていきたいと考えています。',
  ],
  note: 'レベルは上記基準に基づく自己評価です。',
  levelGuideLabel: 'Skill level definitions',
  countSuffix: 'SKILLS',
} as const

/** アイコンは techIcons.ts から名前で引く */
export interface SkillTile {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  iconSrc: string
  tiles: SkillTile[]
}

export const skillLevelDefinitions = [
  { level: 1, label: '授業・教材・チュートリアルで学習した' },
  { level: 2, label: '軽く使用した' },
  { level: 3, label: '個人開発・研究で機能実装に使った' },
  { level: 4, label: '実務・インターン・チーム開発で使用した' },
  { level: 5, label: '設計・実装・改善を自走して行える' },
] as const

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    iconSrc: '/assets/icons/skills/languages.svg',
    tiles: [
      { name: 'Python', level: 3.5 },
      { name: 'Go', level: 3 },
      { name: 'Java', level: 4 },
      { name: 'Kotlin', level: 4 },
      { name: 'PHP', level: 4 },
      { name: 'Ruby', level: 1.3 },
      { name: 'HTML', level: 2.6 },
      { name: 'CSS', level: 2.6 },
    ],
  },
  {
    title: 'Framework / Library',
    iconSrc: '/assets/icons/skills/framework-library.svg',
    tiles: [
      { name: 'Echo', level: 3.6 },
      { name: 'Spring Boot', level: 4 },
      { name: 'FastAPI', level: 3.4 },
      { name: 'Ruby on Rails', level: 1.3 },
    ],
  },
  {
    title: 'Database',
    iconSrc: '/assets/icons/skills/database.svg',
    tiles: [
      { name: 'PostgreSQL', level: 3.4 },
      { name: 'MySQL', level: 3.3 },
      { name: 'SQLite', level: 3.1 },
    ],
  },
  {
    title: 'Tools / DevOps / Others',
    iconSrc: '/assets/icons/skills/tools-devops-others.svg',
    tiles: [
      { name: 'Git', level: 4.1 },
      { name: 'GitHub', level: 4.1 },
      { name: 'GitHub Actions', level: 3.4 },
      { name: 'Docker', level: 3.4 },
      { name: 'nginx', level: 3 },
      { name: 'Heroku', level: 3.4 },
      { name: 'Unity', level: 3.5 },
      { name: 'Raspberry Pi', level: 3.6 },
      { name: 'Codex', level: 4.1 },
      { name: 'Claude Code', level: 4 },
    ],
  },
]
