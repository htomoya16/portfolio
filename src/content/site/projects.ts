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

export type ProjectTechReason = {
  name: string
  reason: string
}

export interface Project {
  num: string
  title: string
  desc: string
  longDesc?: string
  tags: string[]
  techReasons?: ProjectTechReason[]
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
  liveLabel?: string
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
    techReasons: '技術選定の理由',
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
    tags: ['Python', 'FastAPI', 'React', 'Vite', 'SQLite', 'Raspberry Pi', 'nginx', 'GitHub Actions'],
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
    liveUrl: 'https://hacku.yahoo.co.jp/dendai2025/',
    liveLabel: 'Hack U 2025',
    background:
      `複数の推しを応援する中で、ライブ、イベント、グッズ、雑誌、配信などの情報がSNS上に散らばり、見逃しや手動でのカレンダー登録が負担になる課題がありました。
そこで、SNS上の情報収集からカレンダー反映までを自動化し、推し活に必要な予定を効率的に管理できるようにすることを目的に開発しました。
この経験を通じて、画面に直接表れる部分だけでなく、データ取得やAPI実装など、アプリの動作を裏側から支える部分を作る面白さを実感しました。これが、バックエンド開発に強い関心を持つきっかけになりました。`,
    devContent:
      `Hack U 東京電機大学 2025に5名チームで参加し、推し活情報を自動で整理・管理するカレンダーアプリを開発しました。
ユーザーが推しの名前、SNSのプロフィールURL、希望する情報カテゴリなどを登録すると、関連する投稿情報を取得し、ライブや配信などの予定情報としてカレンダーに反映できる仕組みにしました。
私はバックエンド担当として、イベントの種類を取得するAPIと、登録された推しに関連するイベント情報を返すAPIの実装を担当しました。Goやバックエンド開発の経験が浅い中で、データの扱い方や処理の流れを整理し、チームメンバーのコードも参考にしながら実装と動作確認を進めました。
事前のユーザー調査に基づく課題設定と、推し活に特化して情報収集から予定管理までを自動化した点が評価され、東京電機大学賞を受賞しました。`,
    highlights: [
      '事前のユーザー調査に基づいて課題を設定し、推し活に特化した予定管理体験として機能を整理しました。SNSで情報を探し、カレンダーに手動登録する手間を減らすことを重視しました。',
      'カレンダー表示に必要な情報をまとめて取得するため、データ取得時にはJOINを活用し、情報が増えても無駄なDBアクセスが増えにくいように意識しました。',
    ],
    challenges: [
      {
        problem:
          'Goを使った開発が初めてで、バックエンドの処理の流れや、APIがどのようにデータを受け取り返却するのかを十分に理解できていない状態から実装を進める必要がありました。',
        solution:
          '既存コードを読みながら、Handler、Service、Repositoryの役割や処理の流れをメモに整理し、理解しながら実装を進めました。最初からすべての処理を完成させるのではなく、まず仮データを返すスタブを用意し、フロントエンド側との接続やレスポンス形式を確認しました。その後、実際のデータ取得処理を段階的に追加し、情報取得、データ整理、イベント情報の返却という流れに分解して実装しました。分からない部分はAIも理解補助として活用しましたが、回答をそのまま使うのではなく、コードや動作確認と照らし合わせながら理解を深めました。',
      },
    ],
    learnings: [
      'Goを用いたAPI実装の基礎。',
      'Handler、Service、Repositoryに分けたバックエンドの処理の流れ。',
      'APIがデータを受け取り、DBから取得し、レスポンスとして返す一連の流れ。',
      'JOINを用いたデータ取得と、無駄なDBアクセスを減らす考え方。',
      '仮データを使ってレスポンス形式を確認しながら段階的に実装する進め方。',
      'チームメンバーと連携しながら、短期間で担当機能を形にする力。',
    ],
  },
  {
    num: '03',
    title: 'Haptic Piano',
    desc: '仮想空間でピアノの鍵盤を押す感覚を再現するXR・ハプティック卒業研究',
    longDesc:
      'グローブ型デバイス、仮想空間アプリケーション、通信処理を組み合わせ、仮想ピアノ演奏で鍵盤を押し込む感覚を再現する研究プロジェクト。',
    tags: ['Unity', 'C#', 'ESP32', 'ポテンショメータ', 'サーボモータ', '3Dプリンタ'],
    techReasons: [
      {
        name: 'Unity / C#',
        reason: '仮想空間の手モデル・ピアノ・触覚制御を実装するため。',
      },
      {
        name: 'ESP32',
        reason: '小型でグローブ型デバイスに組み込みやすいため。',
      },
      {
        name: 'ポテンショメータ',
        reason: '指の曲がり具合を取得するため。',
      },
      {
        name: 'サーボモータ',
        reason: '鍵盤を押し込む感覚を指先へ返すため。',
      },
      {
        name: '3Dプリンタ',
        reason: 'グローブ型デバイスの部品を作成するため。',
      },
    ],
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
        src: '/assets/projects/hapticpiano/hapticpiano3.png',
        orientation: 'landscape',
        alt: 'Haptic Piano glove device image 1',
        caption: 'グローブ型デバイスと仮想ピアノの構成',
      },
      {
        type: 'image',
        src: '/assets/projects/hapticpiano/hapticpiano4.png',
        orientation: 'landscape',
        alt: 'Haptic Piano glove device image 2',
        caption: '触覚提示と手モデルの動作確認',
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
      `仮想空間でピアノを演奏する場合、音や映像は再現できても、鍵盤に触れた感覚や押し込むときの抵抗感は再現しにくいという課題がありました。
そこで、指の動きを読み取り、その動きに合わせて指先へ触覚を返すグローブ型デバイスを用いて、実際の鍵盤を押しているような感覚を再現することを目指しました。
本研究は卒業研究の個人テーマとして取り組み、課題設定、システム設計、実装、評価実験まで一貫して行いました。`,
    devContent:
      `卒業研究の個人テーマとして、仮想空間でピアノを演奏する際に、実際の鍵盤を押しているような感覚を再現するXR・ハプティックシステムを開発しました。
ハードウェア面では、公開されている手袋型デバイスの設計データを参考に、3Dプリンタで部品を作成しました。センサ、小型モータ、ESP32マイコンを用いて回路を構成し、指の動きを取得しながら、指先へ触覚を返すグローブ型デバイスを構築しました。
ソフトウェア面では、Unity上に仮想空間の手モデルとピアノを実装しました。センサから取得した指の動きに応じて手モデルを動かし、仮想空間上で鍵盤を押せるようにしました。また、鍵盤との接触状態や指の曲がり具合に応じて小型モータを制御し、押し込み感に近い触覚を提示する仕組みを実装しました。
評価実験では、被験者にシステムを体験してもらい、アンケートを通じて操作感を確認しました。その結果、触覚提示によって、鍵盤を押している実感や実際のピアノに近い操作感が向上する傾向を確認しました。`,
    highlights: [
      '指の動きと仮想空間上の手モデル、触覚提示が自然に連動するように、センサ値が手モデルへ反映されるまでの処理経路を確認し、Unity側で入力値を直接扱う構成へ見直しました。',
      '鍵盤の押し込み状態に応じてサーボモータを制御し、指先に返す触覚を変化させることで、一定の反応ではなく、鍵盤を押している感覚に近づけることを意識しました。',
      '装着状態や指の動きの個人差に対応するため、使用前に基準値を調整するキャリブレーション処理を導入し、安定して触覚を提示できるようにしました。',
    ],
    challenges: [
      {
        problem:
          '取得した指の動きが仮想空間上の手モデルへ自然に反映されず、実際の指の動きと表示にずれが生じていました。',
        solution:
          'センサ値がどの経路で手モデルに反映されるかを分解して確認し、原因を切り分けました。その上で、グローブから取得した指の情報をUnity側で直接扱う構成へ見直し、手モデルの動きを調整しました。',
      },
      {
        problem:
          '一定の反応を返すだけでは、鍵盤を押し込む感覚を十分に再現できませんでした。',
        solution:
          '指の動きと鍵盤との接触状態に応じてサーボモータを制御し、指先に返す触覚を変化させる仕組みを実装しました。実装と検証を繰り返しながら、より自然な押し込み感に近づくよう調整しました。',
      },
    ],
    learnings: [
      '既存技術を活用しつつ、処理経路を理解して課題を切り分ける力。',
      'ハードウェア、ソフトウェア、通信を統合したシステム設計。',
      '触覚提示の制御方法を仮説検証しながら改善する進め方。',
      '3Dプリンタ、センサ、サーボモータ、ESP32を用いたデバイス構築。',
      'Unityを用いたXRアプリケーション実装と外部デバイス連携。',
      '評価実験を通じて操作感の改善を確認する研究開発の流れ。',
    ],
  },
  {
    num: '04',
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
        name: 'Echo',
        reason: 'GoでAPIやルーティングをシンプルに実装し、Discord Botの処理と連携しやすくするため。',
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
