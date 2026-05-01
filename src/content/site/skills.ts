export interface SkillTile {
  name: string
  tone: string
  iconType: 'text' | 'svg'
  iconText?: string
  iconColor?: string
}

export interface SkillCategory {
  title: string
  count: string
  tiles: SkillTile[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'FRONTEND',
    count: '06',
    tiles: [
      { name: 'TypeScript', tone: 'ts', iconType: 'text', iconText: 'TS' },
      { name: 'React', tone: 'lt', iconType: 'svg' },
      { name: 'Next.js', tone: 'lt', iconType: 'text', iconText: 'N', iconColor: '#000' },
      { name: 'Tailwind CSS', tone: 'lt', iconType: 'svg' },
      { name: 'HTML5', tone: 'html', iconType: 'text', iconText: '5' },
      { name: 'CSS3', tone: 'css', iconType: 'text', iconText: '3' },
    ],
  },
  {
    title: 'BACKEND',
    count: '04',
    tiles: [
      { name: 'Node.js', tone: 'lt', iconType: 'svg' },
      { name: 'Express', tone: 'dark', iconType: 'text', iconText: 'Ex' },
      { name: 'Python', tone: 'lt', iconType: 'text', iconText: 'Py', iconColor: '#3776AB' },
      { name: 'Firebase', tone: 'fire', iconType: 'text', iconText: 'F' },
    ],
  },
  {
    title: 'DATABASE',
    count: '04',
    tiles: [
      { name: 'PostgreSQL', tone: 'lt', iconType: 'text', iconText: 'Pg', iconColor: '#336791' },
      { name: 'MySQL', tone: 'lt', iconType: 'text', iconText: 'My', iconColor: '#00618A' },
      { name: 'MongoDB', tone: 'lt', iconType: 'text', iconText: 'M', iconColor: '#47A248' },
      { name: 'Supabase', tone: 'lt', iconType: 'text', iconText: 'Sb', iconColor: '#3ECF8E' },
    ],
  },
  {
    title: 'TOOLS  /  DEVOPS',
    count: '05',
    tiles: [
      { name: 'Git', tone: 'git', iconType: 'text', iconText: 'G' },
      { name: 'GitHub', tone: 'dark', iconType: 'svg' },
      { name: 'Docker', tone: 'lt', iconType: 'text', iconText: 'D', iconColor: '#2496ED' },
      { name: 'Vercel', tone: 'dark', iconType: 'svg' },
      { name: 'Figma', tone: 'lt', iconType: 'text', iconText: 'F', iconColor: '#A259FF' },
    ],
  },
]
