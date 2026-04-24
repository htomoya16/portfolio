export type Skill = {
  name: string
  pct: number
  iconKey: 'ts' | 'react' | 'next' | 'node' | 'tailwind' | 'figma'
}

export const SKILLS: Skill[] = [
  { name: 'TypeScript',   pct: 90, iconKey: 'ts' },
  { name: 'React',        pct: 85, iconKey: 'react' },
  { name: 'Next.js',      pct: 80, iconKey: 'next' },
  { name: 'Node.js',      pct: 75, iconKey: 'node' },
  { name: 'Tailwind CSS', pct: 85, iconKey: 'tailwind' },
  { name: 'Figma',        pct: 70, iconKey: 'figma' },
]
