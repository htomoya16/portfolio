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
  // Detail sections
  background?: string
  devContent?: string
  highlights?: string[]
  challenges?: Array<{ problem: string; solution: string }>
  learnings?: string[]
}

export const projects: Project[] = [
  {
    num: '01',
    title: 'QuestHub',
    desc: 'ゲーマー向けのイベント・コミュニティプラットフォーム',
    longDesc:
      'ゲーマーが集まり、イベントを企画・参加できるコミュニティプラットフォーム。リアルタイムチャット、イベントスケジュール管理、ゲーム実績の共有機能を備えた本格的なWebアプリ。',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'WebSocket'],
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
    background:
      'ゲームコミュニティに特化したプラットフォームが国内では少なく、Discord等の汎用ツールに頼らざるを得ない状況に課題を感じた。イベント告知・参加管理・スコア共有をワンストップで行えるサービスを作ることで、ゲーマー同士のつながりをより豊かにしたいと考えた。',
    devContent:
      'Next.js App Router + TypeScript で構成し、リアルタイム通知は WebSocket で実装。認証には NextAuth.js を採用し、イベント管理ロジックをサーバーサイドに集約した。データ永続化は Prisma + PostgreSQL で行い、型安全なデータアクセスを徹底した。',
    highlights: [
      'App Router の Server Components と Client Components を設計段階から明確に分離し、バンドルサイズを最小化',
      'Zustand で軽量なグローバル状態管理を実現し、Props drilling を完全に排除',
      'カスタム hooks で API ロジックを完全分離して再利用性を確保しコードの見通しを大幅に改善',
    ],
    challenges: [
      {
        problem:
          'WebSocket の接続管理がコンポーネント再マウント時に重複接続を引き起こし、メモリリークが発生した',
        solution:
          'useEffect のクリーンアップ関数で確実にリソース解放し、接続の一元管理を Context で行うことで解消',
      },
      {
        problem:
          'Server Components から Client Components へのデータ受け渡しでシリアライズエラーが頻発した',
        solution:
          'Date オブジェクトを ISO 文字列に変換する共通ユーティリティを作成してエッジを統一し、型レベルで防止した',
      },
    ],
    learnings: [
      'App Router のレンダリング戦略を意識した設計の重要性と境界の引き方',
      'リアルタイム機能設計における接続ライフサイクル管理パターン',
      'TypeScript + Zod による入力バリデーションの組み込みと型安全の徹底',
    ],
  },
  {
    num: '02',
    title: 'ScoreBoard',
    desc: 'ゲーム大会のスコアをリアルタイムで共有するWebアプリ',
    longDesc:
      'ゲーム大会のスコアをリアルタイムで記録・共有するWebアプリ。Firebase Realtime Database を活用したライブ更新と、直感的なスコア入力UIを実装。',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'TypeScript'],
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
    background:
      'ゲーム大会の運営において、紙や Excel でのスコア管理が非効率で観戦者へのリアルタイム共有もできない課題があった。Firebase の Realtime Database でスコアの瞬時配信を実現し、大会運営と観戦体験の両方を改善したいと考えた。',
    devContent:
      'React で UI を構築し Firebase Realtime Database と Hosting で構成した SPA。スコア入力 UI は直感性を優先し、キーボードショートカットと楽観的 UI 更新でオペレーターの作業効率を高めた。トーナメントブラケットは再帰的なコンポーネント設計で任意の参加人数に対応した。',
    highlights: [
      'Firebase の楽観的更新でスコア入力時の UI ラグをゼロに近づけ、操作感を大幅に改善',
      'カスタム hook で Firebase の subscribe / unsubscribe を完全に抽象化し、コンポーネントから副作用を分離',
      'CSS Grid + CSS Animations でリアルタイムスコア変動時のアニメーションを軽量かつ滑らかに実現',
    ],
    challenges: [
      {
        problem:
          'Firebase Realtime Database の複数リスナーによるメモリリークが発生し、長時間利用でパフォーマンスが低下した',
        solution:
          'useEffect 内で onValue の戻り値（unsubscribe 関数）を確実にコールし、コンポーネントアンマウント時に全リスナーを解除するパターンを徹底した',
      },
      {
        problem:
          '複数の審判が同時にスコアを入力した際に競合が発生し、データの整合性が崩れた',
        solution:
          'Firebase のトランザクション処理を使用して原子性を保証し、楽観的ロックで UI 側の整合性も維持した',
      },
    ],
    learnings: [
      'Firebase Realtime Database と React のライフサイクル統合における副作用管理パターン',
      '楽観的 UI 更新と実際のデータ同期のバランス設計と rollback 戦略',
      'SPA でのパフォーマンス最適化（React.memo・useMemo・code splitting）の実践',
    ],
  },
  {
    num: '03',
    title: 'Pixel Diary',
    desc: 'ドット絵で記録するライフログアプリ',
    longDesc:
      'ドット絵スタイルのカレンダーに毎日の気分・出来事を記録するライフログアプリ。Prisma + PostgreSQL で堅牢なデータ管理を実現し、統計ダッシュボードで自己分析を可能にする。',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Canvas API'],
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
    background:
      '日記を続けられないという問題の解決策を探す中で、ドット絵というゲーム的なビジュアルで記録をゲーミフィケーションするアイデアを着想した。毎日の達成感と振り返りの可視化でハビットトラッキングを楽しくする体験を作りたかった。',
    devContent:
      'Next.js 14 App Router + Prisma + PostgreSQL でフルスタック実装。ドット絵エディタは Canvas API をベースにゼロから自作し、カレンダービューはカスタムコンポーネントとして設計した。Server Actions によるシームレスなデータミューテーションを採用し、API ルートを最小化した。',
    highlights: [
      'Canvas API を使ったドット絵エディタをゼロから実装し、ピクセル単位の精密な描画制御を実現',
      'Prisma のリレーション設計でデータモデルの正規化を徹底し、将来の機能拡張を考慮したスキーマ設計',
      'Server Actions によるシームレスなデータミューテーション体験でクライアントの状態管理コストを大幅削減',
    ],
    challenges: [
      {
        problem:
          'Canvas 上でのドット絵編集と React の状態管理が競合し、描画タイミングのずれでちらつきが発生した',
        solution:
          'Canvas は useRef で直接操作し、編集完了時のみ toDataURL() で React 状態に同期する設計に変更することで完全に解消',
      },
      {
        problem:
          'Prisma スキーマ変更時のマイグレーション管理が複雑になり、既存データとの整合性維持が困難だった',
        solution:
          '開発環境では prisma db push で高速イテレーション、本番では prisma migrate deploy を使い分け、シードデータで整合性を検証する運用を確立',
      },
    ],
    learnings: [
      'Canvas API と React の共存パターンと、命令的 API と宣言的 UI の境界の引き方',
      'Prisma ORM によるデータモデリングのベストプラクティスとマイグレーション戦略',
      'Server Actions と Client Components のユースケース選択基準と適切な責務分離',
    ],
  },
]
