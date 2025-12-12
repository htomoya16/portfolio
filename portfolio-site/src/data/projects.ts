export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  image?: string;
  imageClass?: string;
};

export const projects: Project[] = [
  {
    title: "Lovendar ~魔法の推し活カレンダー~",
    description:
      "複数の推しの情報収集とカレンダー登録を自動化し、推し活の見逃しを防ぐスマホ向けアプリ。SNS からの情報を集約して予定を整理できる。",
    tech: ["Golang", "Docker", "スマホアプリ"],
    image: "https://protopedia.net/pic/352198bd-e12a-4b9f-b1bc-2f1489392201.png",
    imageClass: "object-cover",
    link: "https://protopedia.net/prototype/7659",
  },
  {
    title: "YasaiRap",
    description:
      "Discord Bot + VRChat 管理ツール。ホワイトリスト管理やイベント運営・自動化処理を提供。",
    tech: ["Go (Echo)", "Docker", "Heroku", "PostgreSQL", "Atlas Migration"],
    image: "/yasairap.png",
    link: "https://github.com/htomoya16/YasaiRap_backend",
  },
  {
    title: "グローブ型リアルハプティックデバイスによる仮想空間ピアノ体験（卒業研究）",
    description:
      "Unity + SteamVR と ESP32 ベースのハプティックグローブを組み合わせた VR ピアノ触覚提示システム。サーボ力覚提示・指屈曲センシング・低遅延通信・手モデル屈曲生成を実装中。",
    tech: ["Unity", "SteamVR", "ESP32", "Servo", "Potentiometer"],
    image: "/hapticpianoscene.jpg",
    imageClass: "object-cover object-center",
    link: "https://github.com/htomoya16/hapticpiano",
  },
  {
    title: "物体検知とLEDマトリクスを組み合わせた立方体型インタラクティブシステム",
    description:
      "物体の位置検出に合わせ、LED マトリクスが中心へ光を集約。複数デバイスへ波形連動も行う立方体型組込みシステム（ゼミ開発プロジェクト）。",
    tech: ["ToFセンサ", "圧力センサ", "Servo", "Raspberry Pi 4", "Python"],
    image: "https://protopedia.net/pic/5b3e601f-51a0-40a1-afae-d86e5024b8f5.jpg",
    imageClass: "object-cover",
    link: "https://protopedia.net/prototype/6766",
  },
  {
    title: "SleepFromHistory",
    description:
      "Chrome 履歴から睡眠時間を推定する Web アプリ。バックエンドは Go (Echo)、Docker、MySQL、Atlas Migration、Chrome 拡張でデータ取得。",
    tech: ["Go (Echo)", "Docker", "MySQL", "Atlas Migration", "Chrome Extension"],
    link: "https://github.com/htomoya16/SleepFromHistory",
  },
];
