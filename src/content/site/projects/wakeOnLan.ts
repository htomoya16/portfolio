import type { Project } from './types'

export const wakeOnLan: Project = {
  num: '01',
  title: 'Wake-on-Lan Dashboard',
  desc: '外出先からVPN経由で自宅PCを安全に起動・管理するWebダッシュボード',
  longDesc:
    'Raspberry Piを自宅LAN内の管理サーバーとして使い、外出先からVPN経由でPCの起動、状態確認、操作履歴、稼働時間を確認できるようにした個人開発プロジェクト。',
  tags: ['Python', 'FastAPI', 'React', 'Vite', 'SQLite', 'Raspberry Pi', 'Wake-on-LAN', 'nginx', 'GitHub Actions'],
  techReasons: [
    {
      name: 'Python / FastAPI',
      reason: '開発スピードを重視し、APIを素早く実装するため。',
    },
    {
      name: 'React / Vite',
      reason: 'フロントエンド開発を学習しながら、管理画面を構築するため。',
    },
    {
      name: 'SQLite',
      reason: '個人利用のデータ量に適しており、軽量に扱えるため。',
    },
    {
      name: 'Raspberry Pi',
      reason: '自宅LAN内で常時稼働できる低消費電力サーバーとして使うため。',
    },
    {
      name: 'nginx',
      reason: '画面配信とAPI連携を安定して行うため。',
    },
    {
      name: 'GitHub Actions',
      reason: 'テスト・ビルド・デプロイを自動化するため。',
    },
  ],
  previewImage: {
    src: '/assets/projects/raspi-vpn-wol/raspi-vpn-wol-preview.jpg',
    alt: 'Raspberry Pi Wake-on-LAN dashboard preview',
  },
  media: [
    {
      type: 'video',
      src: '/assets/projects/raspi-vpn-wol/raspi-vpn-wol-video.mp4',
      poster: '/assets/projects/raspi-vpn-wol/raspi-vpn-wol1.jpg',
      orientation: 'portrait',
      alt: 'Raspberry Pi Wake-on-LAN dashboard operation video',
      caption: 'PCの登録、状態確認、遠隔起動を行うダッシュボードの操作デモ',
    },
    ...Array.from({ length: 13 }, (_, index) => ({
      type: 'image' as const,
      src: `/assets/projects/raspi-vpn-wol/raspi-vpn-wol${index + 2}.jpg`,
      orientation: index + 2 <= 10 ? 'portrait' as const : 'landscape' as const,
      alt: `Raspberry Pi Wake-on-LAN dashboard screenshot ${index + 2}`,
      caption: `Raspberry Pi Wake-on-LAN Dashboard 画面 ${String(index + 1).padStart(2, '0')}`,
    })),
  ],
  role: 'Full-Stack / Infrastructure',
  period: '2026.2 - 2026.3',
  projectType: '個人開発',
  duration: '約1ヶ月',
  status: 'IN OPERATION',
  features: [
    'PC一覧の登録・更新・削除とWake-on-LANによる遠隔起動',
    '起動状態の定期確認、操作ログ、稼働時間の可視化',
    'APIトークン認証、権限制御、VPN前提の安全な運用構成',
    'GitHub Actionsによる自動テスト・自動デプロイとバックアップ運用',
  ],
  repoUrl: 'https://github.com/htomoya16/raspi-vpn-wol',
  demoUrl: 'https://youtu.be/xwnNt2OvFIQ?si=WyRLkUFFW5G9jHf4',
  demoLabel: 'YouTube',
  background:
    `外出先から自宅PCを使いたいとき、PCの電源が落ちているとリモートデスクトップへ接続できない不便がありました。
そこで、電源OFFのPCをネットワーク経由で起動できるWake-on-LANを利用し、自宅PCを遠隔で起動・管理できるWebダッシュボードを開発しました。
単にPCを起動するだけでなく、起動中かシャットダウン中かの確認、操作履歴の記録、稼働時間の可視化、長期的な安定運用まで含めて、外出先からでも安心して自宅PCを管理できる仕組みを目指しました。`,
  devContent:
    `自宅のRaspberry Pi上でサーバーを運用し、スマートフォンやPCからVPN経由で利用できるWebダッシュボードを実装しました。
主な機能として、PC情報の登録・一覧表示・更新・削除、Wake-on-LANによる遠隔起動、起動状態の確認、操作ログの記録、稼働時間の可視化、APIトークン認証を実装しました。
開発では、画面・API・データベースの対応関係を整理するため、CRUDを意識してAPIを設計し、API仕様やER図をドキュメントにまとめながら実装を進めました。
安全性の面では、管理画面や起動処理を直接インターネットに公開せず、VPN経由でRaspberry Piへ接続し、Raspberry PiからLAN内PCを起動する構成にしました。また、通常利用用と管理用でAPIトークンの権限を分け、操作範囲を制御できるようにしました。
運用面では、nginxによる画面配信とAPI連携、GitHub ActionsによるCI/CD、自動バックアップ、ログ、ヘルスチェック、キャッシュを整備し、Raspberry Pi上で継続的に運用・改善できる構成にしました。`,
  highlights: [
    'PC一覧や稼働時間の表示が重くならないように、フロントエンドとバックエンドの両方でキャッシュを活用しました。PC情報や起動状態が変わった場合はキャッシュを更新し、表示速度と情報の正確さのバランスを意識しました。',
    'フロントエンドのビルドやテストはGitHub ActionsのHosted runnerで実行し、Raspberry Pi上のself-hosted runnerではバックアップ、マイグレーション、ヘルスチェック、反映処理を行うことで、低スペックな環境でも安定して更新できる構成にしました。',
    '管理画面やAPIを直接インターネットに公開せず、VPN経由で利用する構成にしました。また、通常利用用と管理用でAPIトークンの権限を分け、操作ログ、バックアップ、ヘルスチェックも整備し、安全性と長期運用を意識しました。',
  ],
  challenges: [
    {
      problem:
        '外出先から、電源OFFの自宅PCをどのように安全に起動するかを考える必要がありました。物理的に電源ボタンを押す機器を使う方法もありましたが、追加デバイスが必要で、Web管理画面や操作履歴との連携がしづらい課題がありました。',
      solution:
        'Wake-on-LANを採用し、Raspberry Piを自宅LAN内に設置しました。外出先からはVPN経由でRaspberry Piへ接続する構成にすることで、管理画面を直接インターネットに公開せずに、自宅PCを遠隔起動できるようにしました。',
    },
    {
      problem:
        '初めてのフルスタック開発で、画面、API、データ保存、認証、ネットワーク、デプロイ、運用をまとめて設計する必要がありました。',
      solution:
        '最初はPC登録、遠隔起動、起動状態確認の最小構成に絞って実装しました。その後、操作ログ、稼働時間、権限制御、バックアップ、CI/CD、キャッシュを段階的に追加し、機能と運用性を高めました。実装方針の整理やエラー原因の切り分けには生成AIも活用しましたが、出力をそのまま採用するのではなく、API設計、データベース設計、動作確認は自分で行い、公式ドキュメントや技術記事も確認しながら理解した上で実装に反映しました。',
    },
  ],
  learnings: [
    'フロントエンド、バックエンド、データベース、認証、デプロイ、運用まで含めたフルスタック開発の流れ。',
    'CRUDを意識したAPI設計、データベース設計、API仕様・ER図などの設計ドキュメント作成の重要性。',
    'Linuxを用いた自宅サーバー構築・運用の基礎。',
    'APIトークン認証、権限制御、VPN前提のネットワーク構成。',
    'GitHub Actionsを用いたCI/CDと、Hosted runner / self-hosted runnerの役割分担。',
    'nginxによる画面配信とAPI連携構成。',
    'バックアップ、ログ、ヘルスチェックを含む運用設計。',
    'キャッシュを用いた応答速度改善と表示鮮度のバランス。',
    '生成AIを理解補助として活用しながら、自分で設計・検証して実装する進め方。',
  ],
}
