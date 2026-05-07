export const skillsCopy = {
  sectionNumber: '// 02',
  sectionTitle: 'SKILLS',
  kicker: 'BACKEND-CENTERED LEARNING MAP',
  lead: 'バックエンドを中心に学習と個人開発を進めています。全体的に経験がまだ浅く、実務経験もないため、実務レベルの設計・運用・改善判断はこれから積み上げる領域だと認識しています。特にバックエンド領域で経験を重ね、信頼できる実装力へ伸ばしていきたいです。',
  note: 'レベルは上記基準に基づく自己評価です。実務経験を示すものではなく、現時点での学習・個人開発・研究での使用感を整理しています。',
  levelGuideLabel: 'Skill level definitions',
  countSuffix: 'SKILLS',
} as const

export interface SkillTile {
  name: string
  level: number
  iconSrc?: string
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
      { name: 'Go', level: 3.6, iconSrc: '/assets/icons/skills/go.svg' },
      { name: 'Python', level: 3.5, iconSrc: '/assets/icons/skills/python.svg' },
      { name: 'Ruby', level: 1.6, iconSrc: '/assets/icons/skills/ruby.svg' },
      { name: 'C#', level: 3.3, iconSrc: '/assets/icons/skills/c-sharp.svg' },
      { name: 'C', level: 2, iconSrc: '/assets/icons/skills/c.svg' },
      { name: 'Java', level: 1.3, iconSrc: '/assets/icons/skills/java.svg' },
      { name: 'PHP', level: 0.5, iconSrc: '/assets/icons/skills/php.svg' },
      { name: 'HTML', level: 3, iconSrc: '/assets/icons/skills/html5.svg' },
      { name: 'CSS', level: 3, iconSrc: '/assets/icons/skills/css3.svg' },
    ],
  },
  {
    title: 'Framework / Library',
    iconSrc: '/assets/icons/skills/framework-library.svg',
    tiles: [
      { name: 'Echo', level: 3.6, iconSrc: '/assets/icons/skills/echo.png' },
      { name: 'FastAPI', level: 3.4, iconSrc: '/assets/icons/skills/fast-api.svg' },
      { name: 'Ruby on Rails', level: 1.6, iconSrc: '/assets/icons/skills/rails.svg' },
      { name: 'React', level: 2.5, iconSrc: '/assets/icons/skills/reactjs.svg' },
      { name: 'Next.js', level: 2.5, iconSrc: '/assets/icons/skills/nextjs.svg' },
      { name: 'Tailwind CSS', level: 2.5, iconSrc: '/assets/icons/skills/tailwindcss.svg' },
    ],
  },
  {
    title: 'Database',
    iconSrc: '/assets/icons/skills/database.svg',
    tiles: [
      { name: 'PostgreSQL', level: 3.4, iconSrc: '/assets/icons/skills/postgresql.svg' },
      { name: 'MySQL', level: 3.3, iconSrc: '/assets/icons/skills/mysql.svg' },
      { name: 'SQLite', level: 3.1, iconSrc: '/assets/icons/skills/SQLite.svg' },
    ],
  },
  {
    title: 'Tools / DevOps / Others',
    iconSrc: '/assets/icons/skills/tools-devops-others.svg',
    tiles: [
      { name: 'Git', level: 3.6, iconSrc: '/assets/icons/skills/git.svg' },
      { name: 'GitHub', level: 3.6, iconSrc: '/assets/icons/skills/github-dark.svg' },
      { name: 'GitHub Actions', level: 3.4, iconSrc: '/assets/icons/skills/GitHub%20Actions.svg' },
      { name: 'Docker', level: 3.4, iconSrc: '/assets/icons/skills/docker.svg' },
      { name: 'nginx', level: 3, iconSrc: '/assets/icons/skills/nginx.svg' },
      { name: 'Heroku', level: 3.4, iconSrc: '/assets/icons/skills/heroku.svg' },
      { name: 'Vercel', level: 3, iconSrc: '/assets/icons/skills/vercel-dark.svg' },
      { name: 'Vite', level: 3, iconSrc: '/assets/icons/skills/vitejs.svg' },
      { name: 'Figma', level: 3.2, iconSrc: '/assets/icons/skills/figma.svg' },
      { name: 'Unity', level: 3.5, iconSrc: '/assets/icons/skills/unity-svgrepo-com.svg' },
      { name: 'Raspberry Pi', level: 3.6, iconSrc: '/assets/icons/skills/raspberry-pi.svg' },
      { name: 'Codex', level: 3.4, iconSrc: '/assets/icons/skills/codex.svg' },
      { name: 'Claude Code', level: 3, iconSrc: '/assets/icons/skills/claude-code.svg' },
    ],
  },
]
