'use client'

import { useRef, useState, useEffect } from 'react'
import { DiagSlash, PixStar, PixPlus, PixDiamond, PixelDotBlock } from '@/components/ui/Decor'
import { TECH_ICONS } from '@/components/ui/TechIcons'
import { SKILLS } from '@/content/site/skills'

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="skills" id="skills" ref={ref}>
      <DiagSlash length={70} thickness={1.5} color="#D7FF00" style={{ top: '14%', right: '10%' }} />
      <DiagSlash length={60} thickness={1.5} color="#2547E6" style={{ bottom: '18%', left: '8%' }} />
      <div style={{ position: 'absolute', top: '16%', right: '6%', zIndex: 1, animation: 'float 4s ease-in-out infinite' }}>
        <PixStar size={16} color="#D7FF00" />
      </div>
      <div style={{ position: 'absolute', bottom: '22%', right: '14%', zIndex: 1, animation: 'float 5s ease-in-out infinite 0.6s' }}>
        <PixPlus size={14} color="#2547E6" />
      </div>
      <div style={{ position: 'absolute', top: '60%', left: '4%', zIndex: 1, animation: 'float 4.5s ease-in-out infinite 1s' }}>
        <PixDiamond size={12} color="#F72585" />
      </div>
      <div style={{ position: 'absolute', top: '20%', left: '8%', zIndex: 1 }}>
        <PixelDotBlock cols={5} rows={4} gap={7} />
      </div>
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', zIndex: 1 }}>
        <PixelDotBlock cols={8} rows={3} gap={8} />
      </div>

      <div className="section-num mono">02</div>
      <h2 className="section-title">
        SKILLS <span className="accent" />
      </h2>

      <div className="skills-grid">
        {SKILLS.map(s => {
          const Icon = TECH_ICONS[s.iconKey]
          return (
            <div className="skill" key={s.name}>
              <div className="skill-head">
                <div className="skill-icon"><Icon /></div>
                <div className="skill-name">{s.name}</div>
              </div>
              <div className="skill-bar-wrap">
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: visible ? `${s.pct}%` : 0 }} />
                </div>
                <div className="skill-pct">{s.pct}%</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
