// Server component
import ScrambleText from '@/components/animation/ScrambleText'
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { experiences } from '@/content/site/experience'

export default function ExperienceSection() {
  return (
    <section className="experience" id="experience">
      <Atmo variant="d" tone="cool" />

      <div className="exp-wrap">
        <SectionHeading number="// 04" title="EXPERIENCE" />

        <div className="exp-list">
          <div className="exp-rail" aria-hidden="true" />

          {experiences.map((exp, i) => (
            <div key={i} className={`exp-row${exp.current ? ' current' : ''}`}>
              <div className="exp-node" aria-hidden="true" />
              <div className="exp-card">
                <span className="ex-cb tl" />
                <span className="ex-cb tr" />
                <span className="ex-cb bl" />
                <span className="ex-cb br" />
                <div className="exp-card-head">
                  <ScrambleText as="span" className="exp-date mono" text={exp.date} chars="numbers" />
                  <ScrambleText as="span" className={`exp-badge t-${exp.tone}`} text={exp.badge} chars="uppercase" />
                </div>
                <h3 className="exp-title">{exp.title}</h3>
                <p className="exp-desc">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
