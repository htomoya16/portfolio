import Image from "next/image";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  const cardClasses =
    "group relative block rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg backdrop-blur";

  const content = (
    <>
      {project.link && (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center justify-center rounded-full bg-blue-50 p-2 text-blue-700 shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              fill="currentColor"
              d="M14 3h7v7h-2V6.41l-9.3 9.3-1.4-1.42 9.3-9.3H14V3Zm4 14.5V21H3V6h3.5v2H5v11h11v-2.5h2Z"
            />
          </svg>
        </span>
      )}
      {project.image && (
        <div className="relative mb-4 overflow-hidden rounded-2xl bg-slate-100">
          <div className="relative h-64 w-full sm:h-72">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={project.imageClass ?? "object-contain p-2"}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">
          {project.title}
        </h3>
        <p className="text-sm leading-6 text-slate-600">{project.description}</p>
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
    </>
  );

  if (project.link) {
    return (
      <a
        key={project.title}
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className={cardClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <div key={project.title} className={cardClasses}>
      {content}
    </div>
  );
}
