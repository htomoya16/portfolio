'use client'

import { useRef } from 'react'
import Image from 'next/image'
import ScrambleText from '@/components/animation/ScrambleText'
import { useHover } from '@/components/animation/useHover'
import Atmo from '@/components/decor/Atmo'
import CornerBrackets from '@/components/ui/CornerBrackets'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { aboutCopy, aboutMilestones } from '@/content/site/about'
import { gsap } from '@/lib/gsap'
import styles from './About.module.css'

type Milestone = (typeof aboutMilestones)[number]

function MilestoneCard({ card, onEnter, onLeave }: {
  card: Milestone
  onEnter: (el: HTMLDivElement) => void
  onLeave: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useHover(ref, onEnter, onLeave)

  return (
    <div ref={ref} className={styles.card} data-cursor-grow>
      <CornerBrackets />
      <div className={styles.cardIcon}>
        <Image src={card.icon} width={30} height={30} alt="" aria-hidden="true" />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardDate}>{card.date}</span>
        <ScrambleText as="span" className={styles.cardTitle} text={card.title} revealRate={24} settleDuration={520} replayOnHover={true} />
      </div>
      <div className={styles.cardPlus} aria-hidden="true">
        <span />
        <span />
      </div>
    </div>
  )
}

export default function AboutSection() {
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const dividerRef = useRef<HTMLDivElement | null>(null)

  // 区切り線の矢印を、カーソルを乗せたカードの縦中央へ動かす
  const handleCardEnter = (card: HTMLDivElement) => {
    const indicator = indicatorRef.current
    const divider = dividerRef.current
    if (!indicator || !divider) return

    const cardRect = card.getBoundingClientRect()
    const divRect = divider.getBoundingClientRect()
    const indicatorY = cardRect.top + cardRect.height / 2 - divRect.top - 8 // 矢印（高さ 16px）の中央を合わせる

    gsap.to(indicator, { top: indicatorY, opacity: 1, duration: 0.35, ease: 'power3.out' })
  }

  const handleCardLeave = () => {
    gsap.to(indicatorRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' })
  }

  return (
    <Section id="about" className={styles.about}>
      <Atmo variant="a" />

      <SectionHeading number={aboutCopy.sectionNumber} title={aboutCopy.sectionTitle} blink className={styles.heading} />

      <div className={styles.grid}>
        <div>
          <p className={styles.tagline}>
            {aboutCopy.taglineLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < aboutCopy.taglineLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className={styles.body}>
            {aboutCopy.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={styles.divider} ref={dividerRef} aria-hidden="true">
          <div className={`${styles.dividerEnd} ${styles.top}`} />
          <div className={styles.indicator} ref={indicatorRef} />
          <div className={`${styles.dividerEnd} ${styles.bottom}`} />
        </div>

        <div className={styles.cards}>
          {aboutMilestones.map((card, i) => (
            <MilestoneCard key={i} card={card} onEnter={handleCardEnter} onLeave={handleCardLeave} />
          ))}
        </div>
      </div>
    </Section>
  )
}
