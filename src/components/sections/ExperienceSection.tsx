import { DiagSlash, PixStar, PixDiamond, PixPlus, PixelDotBlock } from '@/components/ui/Decor'
import { EXPERIENCE } from '@/content/site/experience'

export function ExperienceSection() {
  return (
    <section className="experience" id="experience">
      <DiagSlash length={100} thickness={1.5} color="#D7FF00" style={{ top: '12%', right: '12%' }} />
      <DiagSlash length={70} thickness={1.5} color="#2547E6" style={{ top: '40%', left: '42%' }} />
      <div style={{ position: 'absolute', top: '14%', right: '8%', zIndex: 1, animation: 'float 4s ease-in-out infinite' }}>
        <PixStar size={16} color="#2547E6" />
      </div>
      <div style={{ position: 'absolute', top: '44%', right: '42%', zIndex: 1, animation: 'float 5s ease-in-out infinite 0.8s' }}>
        <PixDiamond size={12} color="#F72585" />
      </div>
      <div style={{ position: 'absolute', top: '72%', left: '6%', zIndex: 1, animation: 'float 4.5s ease-in-out infinite 1.2s' }}>
        <PixPlus size={14} color="#D7FF00" />
      </div>
      <div style={{ position: 'absolute', top: '20%', left: '6%', zIndex: 1 }}>
        <PixelDotBlock cols={5} rows={3} gap={7} />
      </div>

      <div className="exp-diag-left" />
      <div className="exp-frame-sm" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/decor_diagonal_line.svg" className="exp-diag-right" alt="" />

      <div className="exp-grid">
        <div>
          <div className="section-num mono">04</div>
          <h2 className="section-title">EXPERIENCE <span className="accent" /></h2>
        </div>
        <div className="exp-list">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className={`exp-item${exp.current ? ' current' : ''}`}>
              <div className="exp-date">{exp.date}</div>
              <div className="exp-title">{exp.title}</div>
              <div className="exp-desc">
                {exp.desc.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < exp.desc.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="experience-slant-2" />
      <div className="experience-slant" />
    </section>
  )
}
