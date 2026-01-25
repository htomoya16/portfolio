export type SkillGroup = {
  title: string;
  summary: string;
  items: string[];
  image: string;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend Development",
    summary:
      "サービスの裏側を組み立てる開発に力を入れています。API、データベース、環境構築を中心に個人開発で継続的に実践。",
    items: ["Go(Echo)", "Docker", "MySQL", "PostgreSQL", "Atlas", "Heroku"],
    image: "/backend.png",
  },
  {
    title: "HARDWARE",
    summary:
      "マイコンでのプロトタイピング経験。複数センサを用途に応じて扱い、サーボモータ・小型スピーカ・LED も制御。Raspberry Pi 12台同期のシステムにも取り組み。",
    items: [
      "ポテンショメータ",
      "圧力センサ",
      "ToFセンサ",
      "Accelerometer",
      "サーボモータ",
      "Small speaker control",
      "16×16 LED matrix",
      "Raspberry Pi",
    ],
    image: "/hapticpiano.jpg",
  },
  {
    title: "Interaction & XR",
    summary:
      "Unityでのインタラクション設計と体験品質向上に注力。VR触覚・操作感の研究を通じてデバイス連携と動作検証を重ねています。",
    items: ["Unity", "SteamVR", "Haptics"],
    image: "/unity.png",
  },
];
