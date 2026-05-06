export interface SkillTile {
  name: string
  level: number
  iconSrc?: string
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
      { name: 'Go', level: 3.6, iconSrc: '/assets/icons/skills/go.svg' },
      { name: 'Python', level: 3.5, iconSrc: '/assets/icons/skills/python.svg' },
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
    tiles: [
      { name: 'Echo', level: 3.6, iconSrc: '/assets/icons/skills/echo.png' },
      { name: 'FastAPI', level: 3.4, iconSrc: '/assets/icons/skills/fast-api.svg' },
      { name: 'React', level: 3, iconSrc: '/assets/icons/skills/reactjs.svg' },
      { name: 'Next.js', level: 3, iconSrc: '/assets/icons/skills/nextjs.svg' },
      { name: 'Tailwind CSS', level: 3, iconSrc: '/assets/icons/skills/tailwindcss.svg' },
    ],
  },
  {
    title: 'Database',
    tiles: [
      { name: 'PostgreSQL', level: 3.4, iconSrc: '/assets/icons/skills/postgresql.svg' },
      { name: 'MySQL', level: 3.3, iconSrc: '/assets/icons/skills/mysql.svg' },
      { name: 'SQLite', level: 3.1, iconSrc: '/assets/icons/skills/SQLite.svg' },
    ],
  },
  {
    title: 'Tools / DevOps / Others',
    tiles: [
      { name: 'Git', level: 3.6, iconSrc: '/assets/icons/skills/git.svg' },
      { name: 'GitHub', level: 3.6, iconSrc: '/assets/icons/skills/github-dark.svg' },
      { name: 'GitHub Actions', level: 3.4, iconSrc: '/assets/icons/skills/GitHub%20Actions.svg' },
      { name: 'Docker', level: 3.4, iconSrc: '/assets/icons/skills/docker.svg' },
      { name: 'nginx', level: 3, iconSrc: '/assets/icons/skills/nginx.svg' },
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
