export const projectsCopy = {
  sectionNumber: '// 03',
  sectionTitle: 'PROJECTS',
  countSuffix: 'WORKS',
  viewHint: 'VIEW DETAILS',
  itemLabelPrefix: 'PROJECT',
  viewDetailsAriaPrefix: 'View details for',
} as const

export type ProjectMedia = {
  type: 'image' | 'video'
  src: string
  poster?: string
  orientation?: 'landscape' | 'portrait' | 'square'
  alt: string
  caption?: string
}

export type ProjectPreviewImage = {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
}

export interface Project {
  num: string
  title: string
  desc: string
  longDesc?: string
  tags: string[]
  previewImage?: ProjectPreviewImage
  media?: ProjectMedia[]
  role?: string
  period?: string
  projectType?: string
  duration?: string
  status?: string
  features?: string[]
  repoUrl?: string
  liveUrl?: string
  demoUrl?: string
  demoLabel?: string
  // Detail sections
  background?: string
  devContent?: string
  highlights?: string[]
  challenges?: Array<{ problem: string; solution: string }>
  learnings?: string[]
}

export const projectModalCopy = {
  headerProjectPrefix: 'PROJECT',
  githubLabel: 'GitHub',
  githubAriaPrefix: 'Open',
  githubAriaSuffix: 'on GitHub',
  sections: {
    background: '開発背景',
    devContent: '開発内容',
    techStack: '技術スタック',
    highlights: '工夫した点',
    challenges: '苦労した点と解決',
    learnings: '学び',
  },
  challengeLabels: {
    problem: 'PROBLEM',
    solution: 'SOLUTION',
  },
} as const

export const projects: Project[] = [
  {
    num: '01',
    title: 'Wake-on-Lan Dashboard',
    desc: '外出先からVPN経由で自宅PCを安全に起動・管理するWebダッシュボード',
    longDesc:
      'Raspberry Piを自宅LAN内の管理サーバーとして使い、外出先からVPN経由でPCの起動、状態確認、操作履歴、稼働時間を確認できるようにした個人開発プロジェクト。',
    tags: ['Python', 'FastAPI', 'React', 'Vite', 'Docker', 'nginx', 'Raspberry Pi', 'GitHub Actions'],
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
      '外出先から自宅PCを使いたいとき、PCの電源が落ちているとリモートデスクトップへ接続できない不便がありました。そこで、電源OFFのPCをネットワーク経由で起動できるWake-on-LANを利用し、自宅PCを遠隔で起動・管理できるWebダッシュボードを開発しました。単にPCを起動するだけでなく、起動中かシャットダウン中かの確認、操作履歴の記録、稼働時間の可視化、長期的な安定運用まで含めて、外出先からでも安心して自宅PCを管理できる仕組みを目指しました。',
    devContent:
      '自宅のRaspberry Pi上でサーバーを運用し、スマートフォンやPCからVPN経由で利用できるWebダッシュボードを実装しました。主な機能として、PC情報の登録・一覧表示・更新・削除、Wake-on-LANによる遠隔起動、起動状態の確認、操作ログの記録、稼働時間の可視化、APIトークン認証を実装しました。開発では、画面・API・データベースの対応関係を整理するため、CRUDを意識してAPIを設計し、API仕様やER図をドキュメントにまとめながら実装を進めました。安全性の面では、管理画面や起動処理を直接インターネットに公開せず、VPN経由でRaspberry Piへ接続し、Raspberry PiからLAN内PCを起動する構成にしました。また、通常利用用と管理用でAPIトークンの権限を分け、操作範囲を制御できるようにしました。運用面では、nginxによる画面配信とAPI連携、GitHub ActionsによるCI/CD、自動バックアップ、ログ、ヘルスチェック、キャッシュを整備し、Raspberry Pi上で継続的に運用・改善できる構成にしました。',
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
      'CRUDを意識したAPI設計、データベース設計、API仕様・ER図などの設計ドキュメント作成。',
      'Linuxを用いた自宅サーバー構築・運用の基礎。',
      'APIトークン認証、権限制御、VPN前提のネットワーク構成。',
      'GitHub Actionsを用いたCI/CDと、Hosted runner / self-hosted runnerの役割分担。',
      'nginxによる画面配信とAPI連携構成。',
      'バックアップ、ログ、ヘルスチェックを含む運用設計。',
      'キャッシュを用いた応答速度改善と表示鮮度のバランス。',
      '生成AIを理解補助として活用しながら、自分で設計・検証して実装する進め方。',
    ],
  },
  {
    num: '02',
    title: 'Lovender',
    desc: '推し活情報を自動で整理・管理するカレンダーアプリ',
    longDesc:
      'SNS上に散らばるライブ、イベント、グッズ、配信などの情報を取得し、カレンダーへ反映することで推し活の予定管理を支援するハッカソン開発プロジェクト。',
    tags: ['Go', 'Echo', 'MySQL', 'Docker'],
    previewImage: {
      src: '/assets/projects/Lovender/pages/lovender-page-01.png',
      alt: 'Lovender slide deck cover preview',
    },
    media: Array.from({ length: 14 }, (_, index) => ({
      type: 'image' as const,
      src: `/assets/projects/Lovender/pages/lovender-page-${String(index + 1).padStart(2, '0')}.png`,
      alt: `Lovender presentation page ${index + 1}`,
      caption: `Lovender 発表資料 ${String(index + 1).padStart(2, '0')}`,
    })),
    role: 'Backend Engineer',
    period: '2025.09 - 2025.10',
    projectType: 'ハッカソン',
    duration: '約2週間',
    status: 'AWARD',
    features: [
      '推しの登録情報をもとにイベント情報を返すAPIを実装',
      'Go / Echoを用いたバックエンド処理の実装',
      '5名チームで短期間に企画、実装、発表まで実施',
      'Hack U 東京電機大学 2025で東京電機大学賞を受賞',
    ],
    repoUrl: 'https://github.com/HijiriSato88/lovender_backend',
    background:
      '複数の推しを応援する中で、ライブ、イベント、グッズ、雑誌、配信などの情報がSNS上に散らばり、見逃しや手動でのカレンダー登録が負担になる課題がありました。SNS上の情報収集からカレンダー反映までを自動化し、推し活に必要な予定を効率的に管理できるようにすることを目的に開発しました。',
    devContent:
      '5名チームのハッカソンで、私はバックエンド担当として、アプリに必要な情報を取得し、推しに関連するイベント情報を返すAPI実装を担当しました。Goやバックエンド開発の経験が浅い中で、データの扱い方や処理の流れを整理し、チームメンバーのコードも参考にしながら実装と動作確認を進めました。',
    highlights: [
      '事前のユーザー調査に基づいて課題を設定し、推し活に特化した予定管理体験として機能を整理した',
      'バックエンド担当として、必要な処理を分解しながらAPIを実装し、プロダクト完成と受賞に貢献した',
      '短期間のチーム開発の中で、自分の担当範囲を明確にしながら他メンバーと連携した',
    ],
    challenges: [
      {
        problem:
          'Goやバックエンド開発の経験が浅く、データの扱い方や処理の流れを理解しながら実装する必要があった',
        solution:
          '必要な処理を小さく分解し、自分で調べることとチームメンバーのコードを読むことを並行しながら、実装と動作確認を一つずつ進めた',
      },
    ],
    learnings: [
      'Goを用いたAPI実装の基礎',
      'バックエンド機能を処理単位に分解して実装する進め方',
      '役割分担のあるチーム開発で担当機能を形にする経験',
      'ユーザーに価値を届ける機能の裏側を支えるバックエンド開発の面白さ',
    ],
  },
  {
    num: '03',
    title: 'Haptic Piano',
    desc: '仮想空間でピアノの鍵盤を押す感覚を再現するXR・ハプティック研究',
    longDesc:
      'グローブ型デバイス、仮想空間アプリケーション、通信処理を組み合わせ、仮想ピアノ演奏で鍵盤を押し込む感覚を再現する研究プロジェクト。',
    tags: ['C#', 'Unity'],
    previewImage: {
      src: '/assets/projects/hapticpiano/hapticpiano-preview.jpg',
      alt: 'Haptic Piano glove device and virtual piano preview',
    },
    media: [
      {
        type: 'video',
        src: '/assets/projects/hapticpiano/hapticpiano1.mp4',
        poster: '/assets/projects/hapticpiano/hapticpiano3.png',
        orientation: 'portrait',
        alt: 'Haptic Piano demonstration video 1',
        caption: '仮想空間上のピアノ演奏とグローブ型デバイスの動作デモ',
      },
      {
        type: 'video',
        src: '/assets/projects/hapticpiano/hapticpiano2.mp4',
        poster: '/assets/projects/hapticpiano/hapticpiano4.png',
        orientation: 'landscape',
        alt: 'Haptic Piano demonstration video 2',
        caption: '触覚提示と手モデルの動作を確認するデモ',
      },
      {
        type: 'image',
        src: '/assets/projects/hapticpiano/hapticpiano5.png',
        alt: 'Haptic Piano evaluation image',
        caption: '評価実験・調整に関する画面',
      },
    ],
    role: 'Research / Device & Software',
    period: '2025.04 - 2026.03',
    projectType: '研究',
    duration: '約1年',
    status: 'RESEARCH',
    features: [
      'センサとマイコンを用いたグローブ型デバイスの設計・実装',
      '仮想空間上で動作するピアノ演奏アプリケーションの開発',
      '指の動きと触覚提示を連携させる通信・制御処理',
      '被験者評価による演奏感・操作感の検証',
    ],
    repoUrl: 'https://github.com/htomoya16/hapticpiano',
    background:
      '既存の仮想ピアノ演奏では、音や映像は再現できても、鍵盤に触れた感覚や押し込んだ感覚が十分に再現されず、実際に弾いているような操作感を得にくい課題がありました。そこで、指の動きに応じて触覚を返す仕組みを設計し、より自然な演奏体験を実現することを目指しました。',
    devContent:
      'センサやマイコンを用いたグローブ型デバイス、Unity上で動作する仮想空間アプリケーション、両者を連携させる通信処理を組み合わせ、ハード・ソフト・通信を統合したシステムとして設計・実装しました。課題設定、提案手法の設計、実装、評価実験まで一貫して担当しました。',
    highlights: [
      'グローブから取得した指の情報をアプリケーション側で直接扱える構成へ見直し、手モデルの動きを自ら調整した',
      '指の曲がり具合や鍵盤との接触状態に応じて触覚が変化する仕組みを設計した',
      '装着状態や指の動きの個人差に対応するため、キャリブレーション処理を導入した',
    ],
    challenges: [
      {
        problem:
          '取得した指の動きが仮想空間上の手モデルへ自然に反映されず、実際の指の動きと表示にずれが生じていた',
        solution:
          '入力値がどの経路で手モデルに反映されるかを分解して確認し、グローブからの指情報をアプリケーション側で直接扱う構成へ見直した',
      },
      {
        problem:
          '一定の反応を返すだけでは、鍵盤を押し込む感覚を十分に再現できなかった',
        solution:
          '指の曲がり具合と鍵盤との接触状態に応じて触覚を変化させ、実装と検証を繰り返しながら調整した',
      },
    ],
    learnings: [
      '既存技術を活用しつつ、処理経路を理解して課題を切り分ける力',
      'ハードウェア、ソフトウェア、通信を統合したシステム設計',
      '触覚提示の制御方法を仮説検証しながら改善する進め方',
      '評価実験を通じて操作感の改善を確認する研究開発の流れ',
    ],
  },
  {
    num: '04',
    title: 'Chatclub',
    desc: 'Discordコマンドから対戦成績を集計・確認できるDiscord Bot',
    longDesc:
      '対戦型ゲームの履歴を外部サービスから取得し、Discord上で相手別の勝率や直近成績を確認できるようにした個人開発プロジェクト。',
    tags: ['Go', 'Echo', 'PostgreSQL', 'Docker', 'Heroku'],
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
      'Discordサーバー内で対戦型ゲームを遊ぶ中で、公式サイトだけでは特定の相手との勝率や直近成績、条件別の傾向を簡単に振り返れない不便がありました。外部サービス上の対戦結果を取得・集計し、Discord上で必要な戦績をすぐ確認できる仕組みを作ることで、対戦結果の振り返りや交流を支援したいと考えました。',
    devContent:
      'ユーザーが自身のゲームアカウントや対戦相手を登録すると、外部サービス上の対戦履歴を取得し、Discordコマンドから戦績を確認できるBotを実装しました。取得したデータは一覧表示に留めず、相手別の対戦数、勝敗、勝率、直近成績など、利用者がDiscord上で知りたい単位に加工して表示しました。',
    highlights: [
      '外部サービスの通信フローを調査し、Cookieを用いたセッション管理とリダイレクト処理を実装した',
      '公式サイトだけでは振り返りにくい情報を、Discordコマンドから確認しやすい形へ変換した',
      'DockerでBot本体とデータベースをまとめて管理し、環境差異を抑えた開発環境を構築した',
    ],
    challenges: [
      {
        problem:
          '外部サービスの対戦履歴を取得するにはログイン済みユーザーとしてアクセスする必要があり、単純なHTTPリクエストだけでは必要なデータを取得できなかった',
        solution:
          'ブラウザログイン時の通信フローを調査し、Cookieを用いたセッション管理やリダイレクト処理を実装して、ログイン状態を維持したまま取得できるようにした',
      },
      {
        problem:
          '取得した対戦履歴をそのまま表示しても、利用者が知りたい相手別勝率や直近成績としては分かりにくかった',
        solution:
          '対戦数、勝敗、勝率、直近成績などの単位で集計し、Discord上で短いコマンドから確認できる形に整理した',
      },
    ],
    learnings: [
      '外部サービス連携を含むバックエンド設計・実装',
      'HTTP通信とCookieを用いたセッション管理',
      '履歴データの保存、加工、集計処理',
      '利用者が必要とする情報を整理して提供する設計力',
    ],
  },
  {
    num: '05',
    title: 'Project Preparing',
    desc: '次の開発プロジェクトを準備中です',
    longDesc:
      '実データ、画像、技術スタックが揃い次第、採用担当者・エンジニア面接官が確認しやすい形で詳細を追加します。',
    tags: [],
    role: 'Preparing',
    period: 'TBD',
    projectType: '準備中',
    duration: 'TBD',
    status: 'COMING SOON',
    background:
      '現在、掲載するプロジェクトの情報を整理しています。実装内容、担当範囲、使用技術、学びが明確になった段階で追加します。',
    devContent:
      '今後、画像・動画・GitHubリポジトリ・開発背景を揃えて更新予定です。',
  },
  {
    num: '06',
    title: 'Project Preparing',
    desc: '追加掲載するプロジェクトを準備中です',
    longDesc:
      'ポートフォリオ全体の流れに合わせて、バックエンド中心の学習・個人開発が伝わる内容として追加予定です。',
    tags: [],
    role: 'Preparing',
    period: 'TBD',
    projectType: '準備中',
    duration: 'TBD',
    status: 'COMING SOON',
    background:
      '現在、掲載候補のプロジェクト内容を整理しています。採用担当者が短時間で概要を把握でき、エンジニア面接官が実装内容を確認しやすい構成で追加します。',
    devContent:
      '今後、技術スタック、担当範囲、工夫した点、苦労した点と解決を追記予定です。',
  },
]
