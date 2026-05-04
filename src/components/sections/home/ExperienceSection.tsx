'use client'

import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { experiences } from '@/content/site/experience'
import { useRef } from 'react'
import gsap from 'gsap'

export default function ExperienceSection() {
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleCardEnter = (i: number) => {
    const node = nodeRefs.current[i]
    if (!node) return
    gsap.to(node, { scale: 1.5, backgroundColor: 'var(--blue)', boxShadow: '0 0 0 4px rgba(67,103,255,0.22)', duration: 0.2, ease: 'power2.out' })
  }

  const handleCardLeave = (i: number) => {
    const node = nodeRefs.current[i]
    if (!node) return
    gsap.to(node, {
      scale: 1,
      backgroundColor: 'rgba(255,255,255,1)',
      boxShadow: 'none',
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  return (
    <section className="experience" id="experience">
      <Atmo variant="d" tone="cool" />

      <div className="exp-wrap">
        <SectionHeading number="// 04" title="EXPERIENCE" blink />

        <div className="exp-list">
          <div className="exp-rail" aria-hidden="true" />

          {experiences.map((exp, i) => (
            <div key={i} className={`exp-row${exp.current ? ' current' : ''}`}>
              <div
                className="exp-node"
                aria-hidden="true"
                ref={(el) => { nodeRefs.current[i] = el }}
              />
              <div
                className="exp-card"
                onPointerEnter={() => handleCardEnter(i)}
                onPointerLeave={() => handleCardLeave(i)}
              >
                <span className="ex-cb tl" />
                <span className="ex-cb tr" />
                <span className="ex-cb bl" />
                <span className="ex-cb br" />
                {/* plain text — MotionProvider adds scramble on exp-card hover */}
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
