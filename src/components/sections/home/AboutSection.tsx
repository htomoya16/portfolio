'use client'

import ScrambleText from '@/components/animation/ScrambleText'
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { aboutCopy, aboutMilestones } from '@/content/site/about'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * Hero 右パネルの斜めのエッジを About セクションまで白く延長する。
 * 傾きは Hero の clip-path (12%) と実測した高さから求めるので、
 * ウィンドウ幅や各セクションの高さが変わるたびに測り直す。
 */
function useHeroWedge(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const hero = document.getElementById('hero')
      const about = document.getElementById('about')
      if (!hero || !about) return

      const w = window.innerWidth
      if (w <= 900) {
        el.style.display = 'none'
        return
      }
      el.style.display = 'block'

      const heroH = hero.offsetHeight
      if (!heroH) return
      const base = hero.offsetTop + heroH
      const top = about.offsetTop - base
      const h = about.offsetHeight

      const panelW = w <= 1280 ? 0.44 : 0.5
      const x0 = w * (1 - panelW)
      const slope = (0.12 * panelW * w) / heroH
      const a = x0 - slope * top
      const b = x0 - slope * (top + h)
      el.style.clipPath = `polygon(0 0, ${a.toFixed(1)}px 0, ${b.toFixed(1)}px 100%, 0 100%)`
    }

    measure()
    const t1 = setTimeout(measure, 300)
    const t2 = setTimeout(measure, 1200)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('resize', measure)
    }
  }, [ref])
}

export default function AboutSection() {
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const dividerRef = useRef<HTMLDivElement | null>(null)
  const wedgeRef = useRef<HTMLDivElement | null>(null)

  useHeroWedge(wedgeRef)

  const handleCardEnter = (i: number) => {
    const indicator = indicatorRef.current
    const card = cardRefs.current[i]
    const divider = dividerRef.current
    if (!indicator || !card || !divider) return

    const cardRect = card.getBoundingClientRect()
    const divRect = divider.getBoundingClientRect()
    const cardCenterY = cardRect.top + cardRect.height / 2
    const indicatorY = cardCenterY - divRect.top - 8 // center of 16px indicator

    gsap.to(indicator, { top: indicatorY, opacity: 1, duration: 0.35, ease: 'power3.out' })
  }

  const handleCardLeave = () => {
    const indicator = indicatorRef.current
    if (!indicator) return
    gsap.to(indicator, { opacity: 0, duration: 0.2, ease: 'power2.in' })
  }

  return (
    <section className="about" id="about">
      <div className="hero-wedge-ext" ref={wedgeRef} aria-hidden="true" />
      <Atmo variant="a" tone="cool" />

      <SectionHeading number={aboutCopy.sectionNumber} title={aboutCopy.sectionTitle} blink />

      <div className="about-grid">
        {/* left — bio text */}
        <div>
          <p className="about-tagline">
            {aboutCopy.taglineLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < aboutCopy.taglineLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="about-body">
            {aboutCopy.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* center divider with sliding indicator */}
        <div className="about-divider" ref={dividerRef} aria-hidden="true">
          <div className="ab-div-sq top" />
          {/* sliding indicator */}
          <div className="ab-div-indicator" ref={indicatorRef} />
          <div className="ab-div-sq bot" />
        </div>

        {/* right — stat cards */}
        <div className="about-stats">
          {aboutMilestones.map((card, i) => (
            <div
              key={i}
              className="about-card"
              ref={(el) => { cardRefs.current[i] = el }}
              onPointerEnter={() => handleCardEnter(i)}
              onPointerLeave={handleCardLeave}
            >
              <span className="ab-cb tl" />
              <span className="ab-cb tr" />
              <span className="ab-cb bl" />
              <span className="ab-cb br" />
              <div className="about-card-icon">
                <Image src={card.icon} width={30} height={30} alt="" aria-hidden="true" />
              </div>
              <div className="about-card-body">
                <span className="about-card-date">{card.date}</span>
                <ScrambleText as="span" className="about-card-title" text={card.title} revealRate={24} settleDuration={520} replayOnHover={true} />
              </div>
              <div className="about-card-plus" aria-hidden="true">
                <span />
                <span />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
