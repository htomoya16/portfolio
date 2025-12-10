type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

type Research = {
  title: string;
  venue: string;
  year: string;
  summary: string;
  link?: string;
};

const skills = [
  "バックエンド開発 (Go / Echo, Docker, SQL)",
  "VR / Haptics (Unity, SteamVR, ESP32, Servo, Sensor)",
  "Real-time device control & low-latency comms",
  "Data pipelines & migrations (Atlas Migration)",
  "Prototyping & UX for immersive experiences",
];

const projects: Project[] = [
  {
    title: "グローブ型リアルハプティックデバイスによる仮想空間ピアノ体験（卒研）",
    description:
      "Unity + SteamVR と ESP32 ベースのハプティックグローブを組み合わせた VR ピアノ触覚提示システム。サーボ力覚提示・指屈曲センシング・低遅延通信・手モデル屈曲生成を実装中。",
    tech: ["Unity", "SteamVR", "ESP32", "Servo", "Potentiometer"],
  },
  {
    title: "SleepFromHistory",
    description:
      "Chrome 履歴から睡眠時間を推定する Web アプリ。バックエンドは Go (Echo)、Docker、MySQL、Atlas Migration、Chrome 拡張でデータ取得。",
    tech: ["Go (Echo)", "Docker", "MySQL", "Atlas Migration", "Chrome Extension"],
  },
  {
    title: "YasaiRap",
    description:
      "Discord Bot + VRChat 管理ツール。ホワイトリスト管理やイベント運営・自動化処理を提供。",
    tech: ["Go (Echo)", "Docker", "Heroku", "PostgreSQL", "Atlas Migration"],
  },
];

const research: Research[] = [
  {
    title: "Piano Haptics for Immersive VR Interaction",
    venue: "Graduation Research",
    year: "2025",
    summary:
      "ピアノ演奏に同期した触覚提示と手指モデル生成の評価・改善を進行中。",
  },
];

const contacts = [
  { label: "GitHub", href: "https://github.com/htomoya16" },
  { label: "Qiita", href: "https://qiita.com/htomoya16" },
  { label: "Protopedia", href: "https://protopedia.net/settings/prototypes" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.12),transparent_35%)]" />

      {/* Fixed top nav */}
      <nav className="fixed inset-x-0 top-0 z-20 bg-white/85 backdrop-blur border-b border-blue-100/70 shadow-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-4 px-4 py-3 md:px-8">
          {[
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" },
            { label: "Research", href: "#research" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2.5 text-base font-semibold text-blue-700 transition hover:bg-blue-50 hover:text-blue-800"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-16 pt-36 sm:px-10 md:pb-24 md:pt-40">
        <section
          id="about"
          className="scroll-mt-32 grid gap-10 rounded-3xl border border-slate-200/80 bg-white/90 p-12 shadow-2xl backdrop-blur"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                01 About
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                    <span className="text-blue-700">堀田 智哉</span>
                  </h1>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Hotta Tomoya
                  </span>
                </div>
                <p className="text-base font-semibold text-blue-700">
                  バックエンド開発 & VR / Haptics エンジニア
                </p>
              </div>
              <p className="max-w-3xl text-lg text-slate-600 leading-8">
                東京電機大学 理工学部 情報システムデザイン学科。バックエンド開発と VR / Haptics を軸に、デバイス制御と使いやすい UI を両立するプロダクトを設計・実装します。
                触覚提示・リアルタイム通信・運用までカバーし、研究と開発の橋渡しを得意としています。
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  href="mailto:hello@example.com"
                >
                  Contact
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-blue-200 px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                  href="https://github.com/htomoya16"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-blue-100/70 bg-gradient-to-br from-blue-600/10 via-white to-blue-100/30 p-6 shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.14),transparent_40%)]" />
              <div className="relative grid gap-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Specialities</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">VR × Backend</span>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    VR / Haptics（Unity, SteamVR, ESP32, サーボ制御, センサ処理）
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    Web Backend（Go / Echo, Docker, SQL, Atlas Migration）
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    研究開発（ピアノ触覚提示、デバイス制御、アニメーション生成）
                  </li>
                </ul>
                <div className="mt-2 grid gap-1 text-xs text-slate-500">
                  <span>資格: 基本情報技術者</span>
                  <span>拠点: Tokyo / Remote</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-32 grid gap-6">
          <header className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">02 Skills</p>
              <h2 className="text-2xl font-semibold text-slate-900">Core Stack</h2>
            </div>
          </header>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-32 grid gap-6">
          <header className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">03 Projects</p>
              <h2 className="text-2xl font-semibold text-slate-900">Selected Work</h2>
            </div>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg backdrop-blur"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-600">{project.description}</p>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-600 underline-offset-4 hover:underline"
                    >
                      Link
                    </a>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="scroll-mt-32 grid gap-6">
          <header className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">04 Research</p>
              <h2 className="text-2xl font-semibold text-slate-900">Talks & Papers</h2>
            </div>
          </header>
          <div className="grid gap-4">
            {research.map((item) => (
              <article
                key={`${item.title}-${item.year}`}
                className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur"
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span className="font-semibold text-blue-700">{item.year}</span>
                  <span>•</span>
                  <span>{item.venue}</span>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                {item.link && (
                  <a
                    href={item.link}
                    className="mt-3 inline-flex text-sm font-semibold text-blue-600 underline-offset-4 hover:underline"
                  >
                    Read more
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-32 grid gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-10 shadow-xl backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">05 Contact</span>
            <h2 className="text-2xl font-semibold text-slate-900">Let’s build together</h2>
          </div>
          <p className="text-sm text-slate-600">
            お仕事の相談やカジュアルな質問もお気軽にどうぞ。
          </p>
          <div className="flex flex-wrap gap-3">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="inline-flex items-center justify-center rounded-full border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
              >
                {c.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
