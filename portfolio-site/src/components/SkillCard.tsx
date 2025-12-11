import Image from "next/image";
import type { SkillGroup } from "../data/skills";

type Props = {
  skill: SkillGroup;
};

export function SkillCard({ skill }: Props) {
  return (
    <article className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative mb-3 overflow-hidden rounded-xl bg-slate-100">
        <div className="relative h-44 w-full sm:h-48">
          <Image
            src={skill.image}
            alt={skill.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>
      </div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
        {skill.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{skill.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
