export interface Project {
  num: string
  title: string
  desc: string
  tags: string[]
  previewType: 'quest' | 'score' | 'pixel'
}

export const projects: Project[] = [
  {
    num: '01',
    title: 'QuestHub',
    desc: 'ゲーマー向けのイベント・コミュニティプラットフォーム',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    previewType: 'quest',
  },
  {
    num: '02',
    title: 'ScoreBoard',
    desc: 'ゲーム大会のスコアをリアルタイムで共有するWebアプリ',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    previewType: 'score',
  },
  {
    num: '03',
    title: 'Pixel Diary',
    desc: 'ドット絵で記録するライフログアプリ',
    tags: ['Next.js', 'Prisma', 'Tailwind CSS'],
    previewType: 'pixel',
  },
]
