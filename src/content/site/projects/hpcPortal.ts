import type { Project, ProjectMedia } from './types'

export const hpcPortal: Project = {
  num: '03',
  title: 'HPC-portal',
  desc: '研究室のGPUサーバーとローカルLLMを学外から利用できるHPC基盤',
  longDesc:
    '研究室のGPUサーバーの計算資源を、ブラウザやOpenAI互換APIから利用できるようにするHPC基盤の開発プロジェクト。研究室の同期と2人で開発し、主にローカルLLMを学外から安全に使える環境づくりを担当。',
  tags: ['Python', 'Ollama', 'LiteLLM', 'PostgreSQL', 'SearXNG', 'MCP', 'JupyterHub', 'Slurm', 'Apptainer', 'Cloudflare', 'Ansible'],
  techReasons: [
    {
      name: 'LiteLLM',
      reason: 'Ollamaの前段に置き、Virtual Keys（利用者ごとに発行するAPI Key）で認証を加えて、OpenAI互換APIとして公開するため。無料のオープンソースで、研究室のサーバー内で動かせるため。',
    },
    {
      name: 'PostgreSQL',
      reason: 'LiteLLMのVirtual Keysや利用状況を保存するため。',
    },
    {
      name: 'SearXNG',
      reason: '無料で使えて自分のサーバーで動かせる検索エンジンで、費用をかけずにWeb検索を追加できるため。',
    },
  ],
  previewImage: {
    src: '/assets/projects/hpc-portal/hpc-portal-preview.jpg',
    alt: 'HPC-portal home screen preview',
  },
  media: [
    {
      type: 'image',
      src: '/assets/projects/hpc-portal/hpc-portal1.jpg',
      alt: 'HPC-portal system architecture diagram',
      caption: 'HPC-portal システム構成図',
    },
    // 2枚目以降は利用マニュアルのスライド（hpc-portal2 = マニュアル 01）
    ...Array.from({ length: 30 }, (_, index): ProjectMedia => {
      const page = index + 1
      const base = `/assets/projects/hpc-portal/hpc-portal${page + 1}`
      const caption = `HPC-portal 利用マニュアル ${String(page).padStart(2, '0')}`

      // 動画を含むスライドは、スライド全体を書き出した動画に差し替える
      return [13, 15, 18, 19].includes(page)
        ? {
            type: 'video',
            src: `${base}.mp4`,
            poster: `${base}.png`,
            alt: `HPC-portal manual page ${page} demo video`,
            caption,
          }
        : {
            type: 'image',
            src: `${base}.png`,
            alt: `HPC-portal manual page ${page}`,
            caption,
          }
    }),
  ],
  role: 'Backend / Infrastructure',
  period: '2026.07 - 現在',
  projectType: '共同開発',
  duration: '継続開発中',
  status: 'IN OPERATION',
  features: [
    'LiteLLMによる、ローカルLLMのOpenAI互換APIとVirtual Keysでの利用者ごとのAPI Key管理',
    'Slurmで管理する共有Ollamaと、管理画面からのモデル管理',
    'SearXNGとWeb検索MCPによるWeb検索連携',
    '自作APIの外部公開と、SSH / SFTPによる学外からの接続',
  ],
  repoUrl: 'https://github.com/koichi2426/HPC-portal',
  background:
    `研究室にはGPUサーバーがあり、JupyterLabやOpen WebUI、ローカルLLMを動かすOllamaを使えるHPCポータルが用意されていました。一方で、Ollamaには利用者を認証する仕組みがなく、HPCの中からしか使えませんでした。そのため、プログラムからAPIとして呼び出したり、学外から利用したりすることができませんでした。
自分の研究でローカルLLMを利用したかったため、研究室のローカルLLMをプログラムから利用できる環境が必要でした。そこで、研究室の計算資源、特にローカルLLMを、学外からも安全に利用できる基盤を目指して開発に参加しました。研究室向けに運用しながら、継続的に改善しています。`,
  devContent:
    '研究室の同期と2人で開発しており、主にローカルLLMを学外から利用するための機能を担当しました。',
  devFeatures: [
    { name: '構成管理・自動デプロイ（Ansible）', owner: 'teammate' },
    { name: 'ジョブ管理（Slurm）', owner: 'teammate' },
    { name: 'コンテナ実行環境（Apptainer）', owner: 'teammate' },
    { name: 'ポータル基盤（JupyterHub・アプリ起動）', owner: 'teammate' },
    { name: 'リソース表示（CPU・メモリ・GPU）', owner: 'teammate' },
    { name: '外部公開（Cloudflare Tunnel）', owner: 'teammate' },
    {
      name: 'Ollama',
      owner: 'self',
      summary: '研究室のGPUで動く、共有のローカルLLM。モデルの追加・削除やバージョン更新を、管理画面から行えます。',
    },
    {
      name: 'LiteLLM',
      owner: 'self',
      summary: 'ローカルLLMを、OpenAI互換APIとして学外から利用できます。Virtual Keysで、利用者ごとにAPI Keyを発行・管理できます。',
    },
    {
      name: 'SearXNG',
      owner: 'self',
      summary: 'チャット画面からWeb検索を使い、最新の情報を参照して回答できます。',
    },
    {
      name: 'Web検索MCP',
      owner: 'self',
      summary: 'LLM APIからも、Web検索と公開ページの本文取得をツールとして使えます。',
    },
    {
      name: '自作API公開',
      owner: 'self',
      summary: 'HPC上で動かした自作のHTTP APIを、認証付きで外部に公開できます。',
    },
    {
      name: 'SSH / SFTP',
      owner: 'self',
      summary: 'VPNを使わずに、学外からSSH接続やファイルの送受信ができます。',
    },
  ],
  highlights: [
    `LiteLLMを導入し、ローカルLLMを学外から安全に使えるようにしました。
ローカルLLMを動かすOllamaのAPIには利用者を認証する仕組みがないため、外部に公開できず、HPCの中でしか使えない状態でした。
そこでOllamaの前段にLiteLLMを置き、Virtual Keys（利用者ごとに発行するAPI Key）による認証を追加しました。キーは利用者ごとにポータルから発行・再発行・削除できます。
OpenAI互換のAPIなので、OpenAI SDKを使った既存のコードもほぼそのまま動きます。`,
    `Ollamaの推論設定を見直し、応答速度を改善しました。
「おはよう」と送るだけで、返答に約7秒かかっていました。調査したところ、原因は2つありました。
1つは、OllamaのThink（回答前に考える処理）と推論の努力（reasoning effort）が既定で有効になっていたことです。
もう1つは、チャット画面が回答のたびに関連質問を同じモデルで数回生成していて、Ollamaに余分な推論が発生していたことです。特にqwen3.5:35bのような重いモデルで影響が大きくなっていました。
Thinkと推論の努力を既定でオフにし、関連質問の自動生成を止めたことで、返答までの時間を1秒程度に短縮しました。`,
  ],
  challenges: [
    {
      problem:
        `研究室の計算資源を学外から使えるようにする一方で、公開の仕方を誤ると研究室の資産を危険にさらすことになります。
特にLLM APIでは、ブラウザ向けのポータルと同じようにCloudflare Accessを使うかどうかで悩みました。Cloudflare Accessを加えると、利用者はAPI Keyに加えて認証用のヘッダー（CF-Access-Client-Id・CF-Access-Client-Secret）も付ける必要があり、OpenAI互換APIとしての使いやすさが損なわれます。`,
      solution:
        `公開する経路ごとに、その先で何が認証を担っているかを整理しました。
ブラウザで使うポータルは、Cloudflare Accessとポータルのログインの二重で保護しています。
LLM APIはLiteLLMのVirtual Keysで認証が担保されているため、Cloudflare Accessは使わず、OpenAI互換の呼び出し方をそのまま使えるようにしました。`,
    },
    {
      problem:
        `Ollamaに認証を付ける方法として、AI Gatewayを使う方法と、認証付きのプロキシを自作する方法がありました。
AI GatewayにもPortkey、Helicone、Kong AI Gateway、Cloudflare AI Gatewayなど多くの選択肢があり、どれを選ぶかで悩みました。`,
      solution:
        `料金、研究室のサーバーで動かせるかどうか、OpenAI互換かどうか、実装コストを軸に比較し、LiteLLMを選びました。
LiteLLMは無料のオープンソースで、研究室のサーバー内で動かせるため、利用者のデータを外部のサービスに送らずに済みます。
また、利用者ごとにAPI Keyを発行できるVirtual Keysや、利用状況の記録を最初から備えているため、プロキシを自作する場合に比べて実装コストを大きく抑えられました。`,
    },
    {
      problem:
        `当初、OllamaはSlurm（ジョブ管理の仕組み）の管理外で動き続けているプロセスで、利用者全員がそこへ直接アクセスしていました。
そのため、ポータルで指定したメモリやGPUの制限が推論に適用されず、誰がどれだけ使っているかも把握できませんでした。`,
      solution:
        `Ollamaを独立した共有基盤にし、管理者だけがSlurmのジョブとして起動する構成にしました。
モデルは共有の領域にまとめ、追加と削除は管理者だけが行います。
利用者はLiteLLMのVirtual Keysを通して使う形にしたことで、リソースの制限をかけられるようになり、利用者ごとに使い方を把握できるようになりました。`,
    },
  ],
  challengesLayout: 'stack',
  learnings: [
    '研究室の資産を外部に公開するときは、便利さよりも先に「何を守るべきか」を考えるセキュリティの意識。',
    '機能を作るだけでなく、実際に使う人がどのように使うかを想像して設計する、利用者の目線。',
    '安全性と使いやすさを両立させるために、どこで何を守るのかを整理して判断する考え方。',
  ],
}
