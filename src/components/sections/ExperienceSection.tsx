// Server component
import { Atmo } from '@/components/ui/Decor'
import { experiences } from '@/content/site/experience'

export default function ExperienceSection() {
  return (
    <section className="experience" id="experience">
      <Atmo variant="d" tone="cool" />

      <div className="exp-wrap">
        <div className="section-head">
          <span className="section-num">// 04</span>
          <h2 className="section-title">
            EXPERIENCE
            <span className="accent" />
          </h2>
        </div>

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
                  <span className="exp-date mono">{exp.date}</span>
                  <span className={`exp-badge t-${exp.tone}`}>{exp.badge}</span>
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
