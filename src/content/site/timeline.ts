export type TimelineEntry = {
  iconKey: 'cap' | 'code' | 'trophy'
  date: string
  text: string
}

export const TIMELINE: TimelineEntry[] = [
  { iconKey: 'cap',    date: '2024.03',      text: '〇〇大学 情報工学部 卒業見込み' },
  { iconKey: 'code',   date: '2022 - 2024',  text: 'Webアプリ開発 / 個人開発 / インターン' },
  { iconKey: 'trophy', date: '2023',          text: 'ハッカソン 優秀賞 / 技術書典 出展' },
]
