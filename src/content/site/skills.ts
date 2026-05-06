export interface SkillTile {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
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
    tiles: [
      { name: 'Go', level: 3.5 },
      { name: 'Python', level: 3.2 },
      { name: 'C#', level: 3 },
      { name: 'C', level: 1 },
      { name: 'Java', level: 1 },
      { name: 'PHP', level: 0.5 },
      { name: 'HTML', level: 3 },
      { name: 'CSS', level: 3 },
    ],
  },
  {
    title: 'Framework / Library',
    tiles: [
      { name: 'Echo', level: 3.5 },
      { name: 'FastAPI', level: 3.2 },
      { name: 'React', level: 3 },
      { name: 'Next.js', level: 3 },
      { name: 'Tailwind CSS', level: 3 },
    ],
  },
  {
    title: 'Database',
    tiles: [
      { name: 'PostgreSQL', level: 3.4 },
      { name: 'MySQL', level: 3.3 },
      { name: 'SQLite', level: 3.1 },
    ],
  },
  {
    title: 'Tools / DevOps / Others',
    tiles: [
      { name: 'Git', level: 3.6 },
      { name: 'GitHub', level: 3.6 },
      { name: 'GitHub Actions', level: 3.3 },
      { name: 'Docker', level: 3.2 },
      { name: 'nginx', level: 3 },
      { name: 'Vercel', level: 3 },
      { name: 'Vite', level: 3 },
      { name: 'Figma', level: 3.2 },
      { name: 'Unity', level: 3.5 },
      { name: 'Raspberry Pi', level: 3.5 },
      { name: 'Codex', level: 3.4 },
      { name: 'Claude Code', level: 3 },
    ],
  },
]
