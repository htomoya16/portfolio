export type Project = {
  num: string
  title: string
  desc: string
  previewKey: 'quest' | 'score' | 'pixel'
  tags: string[]
}

export const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'QuestHub',
    desc: 'ゲーマー向けの\nイベント・コミュニティ\nプラットフォーム',
    previewKey: 'quest',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    num: '02',
    title: 'ScoreBoard',
    desc: 'ゲーム大会のスコアを\nリアルタイムで共有する\nWebアプリ',
    previewKey: 'score',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
  },
  {
    num: '03',
    title: 'Pixel Diary',
    desc: 'ドット絵で記録する\nライフログアプリ',
    previewKey: 'pixel',
    tags: ['Next.js', 'Prisma', 'Tailwind CSS'],
  },
]
