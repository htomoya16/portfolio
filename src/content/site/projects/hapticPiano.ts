import type { Project } from './types'

export const hapticPiano: Project = {
  num: '04',
  title: 'Haptic Piano',
  desc: '仮想空間でピアノの鍵盤を押す感覚を再現するXR・ハプティック卒業研究',
  longDesc:
    'グローブ型デバイス、仮想空間アプリケーション、通信処理を組み合わせ、仮想ピアノ演奏で鍵盤を押し込む感覚を再現する研究プロジェクト。',
  tags: ['Unity', 'C#', 'Meta Quest 2', 'ESP32', 'ポテンショメータ', 'サーボモータ', '3Dプリンタ'],
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
      poster: '/assets/projects/hapticpiano/hapticpiano1-poster.jpg',
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
      src: '/assets/projects/hapticpiano/hapticpiano-preview.jpg',
      orientation: 'landscape',
      alt: 'Haptic Piano glove device preview',
      caption: 'グローブ型デバイスの外観',
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
    '通りに動かない原因を処理経路ごとに分解し、実装と検証を繰り返しながら改善する力。',
    '3Dプリンタ、センサ、サーボモータ、ESP32を用いたデバイス構築。',
    'Unityを用いたXRアプリケーション実装と外部デバイス連携。',
    '評価実験を通じて操作感の改善を確認する研究開発の流れ。',
  ],
}
