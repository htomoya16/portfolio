'use client'

import Image from 'next/image'
import ScrambleText from '@/components/animation/ScrambleText'
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { experienceCopy, experiences } from '@/content/site/experience'
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
        <SectionHeading number={experienceCopy.sectionNumber} title={experienceCopy.sectionTitle} blink />

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
                  <span className={`exp-badge t-${exp.tone}`}>{exp.badge}</span>
                  {exp.links && exp.links.length > 0 && (
                    <div className="exp-links" aria-label={`${exp.title} related links`}>
                      {exp.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exp-link"
                        >
                          {link.label}
                          <Image
                            src="/assets/icons/projects/link-external.svg"
                            alt=""
                            width={13}
                            height={13}
                            aria-hidden="true"
                            className="exp-link-icon"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <span className="exp-date mono">{exp.date}</span>
                <ScrambleText as="h3" className="exp-title" text={exp.title} revealRate={28} settleDuration={520} replayOnHover={true} />
                <p className="exp-desc">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
