import type { Project } from './types'

export const chatclub: Project = {
  num: '05',
  title: 'Chatclub',
  desc: 'ストリートファイター6の対戦履歴を取得・集計し、Discord上で戦績を確認できるBot',
  longDesc:
    'ストリートファイター6の対戦履歴を取得・集計し、Discord上で特定の相手との勝率、キャラクター別の勝率、直近成績を確認できるBot。',
  tags: ['Go', 'Echo', 'PostgreSQL', 'Docker', 'Heroku'],
  techReasons: [
    {
      name: 'Go / Echo',
      reason: 'バックエンド開発を学習しながら、APIとデータ集計処理を実装するため。',
    },
    {
      name: 'PostgreSQL',
      reason: 'Heroku Postgresと連携しやすいため。',
    },
    {
      name: 'Docker',
      reason: 'Bot本体とデータベースをまとめて管理し、開発環境の差異を減らすため。',
    },
    {
      name: 'Heroku',
      reason: 'クラウド環境へのデプロイや環境変数管理を学習し、個人開発でも低コストで運用しやすくするため。',
    },
  ],
  previewImage: {
    src: '/assets/projects/chatclub/chatclub-preview.jpg',
    alt: 'Chatclub Discord bot preview',
  },
  media: [
    {
      type: 'video',
      src: '/assets/projects/chatclub/chatclub1.mp4',
      poster: '/assets/projects/chatclub/chatclub2.png',
      orientation: 'landscape',
      alt: 'Chatclub Discord bot operation video',
      caption: 'Discordコマンドから戦績を確認する操作デモ',
    },
    ...Array.from({ length: 6 }, (_, index) => ({
      type: 'image' as const,
      src: `/assets/projects/chatclub/chatclub${index + 3}.png`,
      orientation: index >= 4 ? 'portrait' as const : 'landscape' as const,
      alt: `Chatclub screenshot ${index + 3}`,
      caption: `Chatclub 画面 ${String(index + 1).padStart(2, '0')}`,
    })),
  ],
  role: 'Backend Engineer',
  period: '2026.01 - 2026.02',
  projectType: '個人開発',
  duration: '約1ヶ月',
  status: 'IN OPERATION',
  features: [
    'Discordコマンドによるユーザー登録・戦績確認',
    '外部サービスの対戦履歴取得と相手別勝率の集計',
    'Cookieを用いたログイン済みセッション管理',
    'Dockerを用いた開発環境とクラウド上の常時稼働構成',
  ],
  repoUrl: 'https://github.com/htomoya16/Chatclub',
  background:
    `対戦型ゲームを遊ぶ中で、公式サイトだけでは特定の相手との勝率や直近成績、条件別の傾向を簡単に振り返れない不便がありました。
そこで、外部サービス上の対戦結果を取得・集計し、Discord上で必要な戦績をすぐに確認できるBotを開発しました。
メンバー同士の対戦結果の振り返りや交流を支援するとともに、外部サービス連携、データベース設計、クラウド運用を含むバックエンド開発を実践的に学ぶことを目的としました。`,
  devContent:
    `ユーザーが自身のゲームアカウントや対戦相手を登録すると、外部サービス上の対戦履歴を取得し、Discordコマンドから戦績を確認できるBotを個人開発しました。
主な機能として、ユーザー情報の登録、対戦履歴の取得、履歴の一覧表示、特定の相手との対戦数・勝敗・勝率・直近成績の集計を実装しました。
取得した対戦履歴はそのまま表示するのではなく、相手別の勝率や直近成績など、Discord上で利用者がすぐに確認したい情報へ整理して表示しました。
また、Bot本体とデータベースをDockerで管理し、ローカル環境で必要なサービスをまとめて起動できるようにしました。さらに、Herokuへデプロイし、Discordサーバー上で継続的に利用できる構成にしました。`,
  highlights: [
    '公式サイトだけでは振り返りにくい対戦履歴を、Discordコマンドから確認しやすい形に整理しました。相手別の対戦数、勝敗、勝率、直近成績など、利用者が知りたい単位で集計できるようにしました。',
    '取得した対戦履歴をデータベースに保存し、必要に応じて再利用できるようにしました。毎回外部サービスへアクセスするのではなく、取得済みデータを活用することで、アクセス頻度や処理負荷にも配慮しました。',
    'DockerでBot本体とデータベースをまとめて管理し、開発環境の差異を抑えました。Herokuへのデプロイ時も環境変数や接続情報を分けて管理し、継続的に利用できる構成にしました。',
  ],
  challenges: [
    {
      problem:
        '外部サービスの対戦履歴を取得するには、ログイン済みユーザーとしてアクセスする必要があり、単純なHTTPリクエストだけでは必要なデータを取得できませんでした。',
      solution:
        'ブラウザでログイン時の通信フローを確認し、Cookieを用いたセッション管理やリダイレクト処理を実装しました。これにより、ログイン状態を維持しながら必要な対戦履歴を取得できるようにしました。',
    },
    {
      problem:
        '取得した対戦履歴をそのまま表示しても、利用者が知りたい相手別勝率や直近成績としては分かりにくい課題がありました。',
      solution:
        '対戦履歴をデータベースに保存し、相手ごとの対戦数、勝敗、勝率、直近成績として集計できるようにしました。Discord上では短いコマンドから確認できるようにし、サーバー内で対戦結果を振り返りやすい形に整理しました。',
    },
  ],
  learnings: [
    '外部サービス連携を含むバックエンド設計・実装。',
    'HTTP通信とCookieを用いたセッション管理。',
    '取得データの保存・加工・集計処理。',
    'Dockerを用いた開発環境の構築。',
    'クラウドを用いたBotのデプロイと環境変数管理。',
  ],
}
