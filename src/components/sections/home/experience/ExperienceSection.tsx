'use client'

import { useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import ScrambleText from '@/components/animation/ScrambleText'
import { cancelScramble, playScramble } from '@/components/animation/scramble'
import { useHover } from '@/components/animation/useHover'
import Atmo from '@/components/decor/Atmo'
import CornerBrackets from '@/components/ui/CornerBrackets'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { type ExperienceItem, experienceCopy, experiences } from '@/content/site/experience'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Experience.module.css'

function ExperienceRow({ exp }: { exp: ExperienceItem }) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLSpanElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)

  // カーソルを乗せたカードの四角を強調し、日付とバッジの文字をかき混ぜる
  useHover(
    cardRef,
    () => {
      gsap.to(nodeRef.current, { scale: 1.5, backgroundColor: 'var(--blue)', boxShadow: '0 0 0 4px rgba(67,103,255,0.22)', duration: 0.2, ease: 'power2.out' })
      playScramble(dateRef.current, exp.date, { pattern: 'code', revealRate: 28 })
      playScramble(badgeRef.current, exp.badge, { pattern: 'braille', revealRate: 36 })
    },
    () => {
      gsap.to(nodeRef.current, { scale: 1, backgroundColor: 'rgba(255,255,255,1)', boxShadow: 'none', duration: 0.2, ease: 'power2.out' })
      cancelScramble(dateRef.current, exp.date)
      cancelScramble(badgeRef.current, exp.badge)
    },
  )

  return (
    <div className={styles.row}>
      <div className={styles.node} aria-hidden="true" ref={nodeRef} data-exp-node />
      <div className={styles.card} ref={cardRef} data-exp-card>
        <CornerBrackets size="sm" />
        <div className={styles.cardHead}>
          <span className={clsx(styles.badge, styles[exp.tone])} ref={badgeRef}>{exp.badge}</span>
          <span className={styles.date} ref={dateRef}>{exp.date}</span>
          {exp.links && exp.links.length > 0 && (
            <div className={styles.links} aria-label={`${exp.title} related links`}>
              {exp.links.map((link) => (
                // スマホでは文字を隠してアイコンだけのボタンにするので、リンク先の名前は aria-label と title で伝える
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  aria-label={link.label}
                  title={link.label}
                >
                  <span className={styles.linkLabel}>{link.label}</span>
                  <Image src="/assets/icons/projects/link-external.svg" alt="" width={13} height={13} aria-hidden="true" className={styles.linkIcon} />
                </a>
              ))}
            </div>
          )}
        </div>
        <ScrambleText as="h3" className={styles.title} text={exp.title} revealRate={28} settleDuration={520} replayOnHover={true} />
        <p className={styles.desc}>{exp.desc}</p>
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  const listRef = useRef<HTMLDivElement>(null)

  // 四角を弾ませて出し、カードを左から開くように表示する
  useGSAP(
    () => {
      const list = listRef.current
      if (!list || getPrefersReducedMotion()) return
      const scrollTrigger = () => ({ trigger: list, start: 'top 78%', once: true })
      gsap.fromTo(
        list.querySelectorAll('[data-exp-node]'),
        { autoAlpha: 0, scale: 0 },
        { autoAlpha: 1, scale: 1, duration: 0.38, ease: 'back.out(2.5)', stagger: 0.12, scrollTrigger: scrollTrigger() },
      )
      gsap.fromTo(
        list.querySelectorAll('[data-exp-card]'),
        { autoAlpha: 0, x: -44, clipPath: 'inset(0 100% 0 0)' },
        { autoAlpha: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.65, ease: 'power3.out', stagger: 0.12, scrollTrigger: scrollTrigger() },
      )
    },
    { scope: listRef },
  )

  return (
    <Section id="experience" className={styles.experience}>
      <Atmo variant="d" />

      <div className={styles.wrap}>
        <SectionHeading number={experienceCopy.sectionNumber} title={experienceCopy.sectionTitle} blink />

        <div className={styles.list} ref={listRef}>
          <div className={styles.rail} aria-hidden="true" />
          {experiences.map((exp, i) => (
            <ExperienceRow key={i} exp={exp} />
          ))}
        </div>
      </div>
    </Section>
  )
}
