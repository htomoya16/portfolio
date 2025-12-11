import Image from "next/image";
import { ProjectCard } from "../components/ProjectCard";
import { SkillCard } from "../components/SkillCard";
import { contacts, contactIcons } from "../data/contacts";
import { projects } from "../data/projects";
import { research } from "../data/research";
import { skillGroups } from "../data/skills";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.12),transparent_35%)]" />

      {/* Fixed top nav */}
      <nav className="fixed inset-x-0 top-0 z-20 bg-white/90 backdrop-blur border-b border-blue-100/70 shadow-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-2 overflow-x-auto px-3 py-2.5 sm:gap-3 sm:px-4 md:gap-4 md:px-8">
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
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 hover:text-blue-800 sm:px-4 sm:py-2.5 sm:text-base"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 pt-32 sm:gap-18 sm:px-6 sm:pt-36 md:gap-20 md:px-10 md:pb-24 md:pt-40">
        <section
          id="about"
          className="scroll-mt-32 grid gap-8 rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-2xl backdrop-blur sm:gap-10 sm:p-10 lg:p-12"
        >
          <div className="grid gap-8">
            <div className="flex flex-col gap-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 sm:text-sm">
                01 About
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Image
                    src="https://avatars.githubusercontent.com/htomoya16?s=800"
                    alt="GitHub avatar"
                    width={400}
                    height={400}
                    className="h-20 w-20 rounded-full border border-blue-100 object-cover sm:h-24 sm:w-24"
                    priority
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                      <span className="text-blue-700">堀田 智哉</span>
                    </h1>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                      Hotta Tomoya
                    </span>
                  </div>
                </div>
                <p className="text-base font-semibold text-blue-700">
                  バックエンド開発 & VR / Haptics エンジニア
                </p>
                <div className="inline-flex w-full max-w-xl items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 sm:text-sm">
                  <Image
                    src="/1547551.svg"
                    alt="University icon"
                    width={24}
                    height={24}
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    style={{
                      filter:
                        "invert(29%) sepia(88%) saturate(2432%) hue-rotate(198deg) brightness(95%) contrast(90%)",
                    }}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-slate-500">大学</span>
                    <a
                      href="https://www.dendai.ac.jp/about/tdu/campus/saitama_hatoyama.html"
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-800 underline-offset-4 hover:underline"
                    >
                      東京電機大学 理工学部 情報システムデザイン学科
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <p className="max-w-3xl text-base text-slate-600 leading-7 sm:text-lg sm:leading-8">
                  バックエンド開発を中心に取り組んでおり、仕組みを組み立てたり、裏側の設計を考えることに強く惹かれています。個人開発を通して日々試行錯誤しながら、自分が「面白い」と感じられるものづくりを探し続けています。
                </p>
                <p className="max-w-3xl text-base text-slate-600 leading-7 sm:text-lg sm:leading-8">
                  普段はゲームをすることが日課で、そこで得た体験や感性が、創作への興味を広げるきっかけにもなっています。
                </p>
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
          <div className="grid gap-4 md:grid-cols-3">
            {skillGroups.map((group) => (
              <SkillCard key={group.title} skill={group} />
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-32 grid gap-6">
          <header className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">03 Projects</p>
              <h2 className="text-2xl font-semibold text-slate-900">Projects & Experiments</h2>
            </div>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
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
                className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur"
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

        <div className="scroll-mt-32 grid gap-3" id="contact">
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">05 Contact</span>
            <h2 className="text-2xl font-semibold text-slate-900">Links</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 justify-items-stretch">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center justify-center gap-3 rounded-2xl border border-blue-100 px-6 py-4 text-base font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
                target="_blank"
                rel="noreferrer"
              >
                {c.icon && contactIcons[c.icon]}
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
