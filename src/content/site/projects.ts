export interface Project {
  num: string
  title: string
  desc: string
  longDesc?: string
  tags: string[]
  previewType: 'quest' | 'score' | 'pixel'
  role?: string
  period?: string
  status?: string
  features?: string[]
  repoUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    num: '01',
    title: 'QuestHub',
    desc: 'ゲーマー向けのイベント・コミュニティプラットフォーム',
    longDesc:
      'ゲーマーが集まり、イベントを企画・参加できるコミュニティプラットフォーム。リアルタイムチャット、イベントスケジュール管理、ゲーム実績の共有機能を備えた本格的なWebアプリ。',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    previewType: 'quest',
    role: 'Full-Stack Engineer',
    period: '2024.02 — 2024.05',
    status: 'SHIPPED',
    features: [
      'リアルタイムイベント通知システム',
      'ゲーム実績トラッカー & バッジ統合',
      'コミュニティランキングボード',
    ],
    repoUrl: 'https://github.com',
  },
  {
    num: '02',
    title: 'ScoreBoard',
    desc: 'ゲーム大会のスコアをリアルタイムで共有するWebアプリ',
    longDesc:
      'ゲーム大会のスコアをリアルタイムで記録・共有するWebアプリ。Firebase Realtime Database を活用したライブ更新と、直感的なスコア入力UIを実装。',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    previewType: 'score',
    role: 'Frontend Engineer',
    period: '2024.06 — 2024.08',
    status: 'SHIPPED',
    features: [
      'Firebase Realtime Database 連携',
      'ライブスコア更新 (WebSocket)',
      'トーナメントブラケット自動生成',
    ],
    repoUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    num: '03',
    title: 'Pixel Diary',
    desc: 'ドット絵で記録するライフログアプリ',
    longDesc:
      'ドット絵スタイルのカレンダーに毎日の気分・出来事を記録するライフログアプリ。Prisma + PostgreSQL で堅牢なデータ管理を実現し、統計ダッシュボードで自己分析を可能にする。',
    tags: ['Next.js', 'Prisma', 'Tailwind CSS'],
    previewType: 'pixel',
    role: 'Full-Stack Engineer',
    period: '2024.09 — 現在',
    status: 'IN DEV',
    features: [
      'ドット絵カレンダービュー',
      'Prisma ORM + PostgreSQL',
      '気分トラッカー & 統計ダッシュボード',
    ],
    repoUrl: 'https://github.com',
  },
]
