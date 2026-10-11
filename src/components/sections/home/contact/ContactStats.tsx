'use client'

import { useRef } from 'react'
import { cancelScramble, playScramble } from '@/components/animation/scramble'
import { useHover } from '@/components/animation/useHover'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Contact.module.css'

export type ContactStat = {
  label: string
  /** バーの長さ（0〜100） */
  pct: number
  display: string
}

function StatRow({ stat }: { stat: ContactStat }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)

  // スクロールで見えたらバーを伸ばす
  useGSAP(
    () => {
      if (getPrefersReducedMotion()) return
      gsap.fromTo(
        fillRef.current,
        { width: '0%' },
        {
          width: `${stat.pct}%`, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: rowRef.current, start: 'top 88%', once: true },
        },
      )
    },
    { dependencies: [stat.pct], scope: rowRef },
  )

  // カーソルを乗せたら文字をかき混ぜ、バーを伸ばし直す
  useHover(
    rowRef,
    () => {
      if (getPrefersReducedMotion()) return
      playScramble(labelRef.current, stat.label, { pattern: 'braille', revealRate: 40 })
      playScramble(numRef.current, stat.display, { pattern: 'code', revealRate: 28 })
      gsap.fromTo(fillRef.current, { width: '0%' }, { width: `${stat.pct}%`, duration: 0.9, ease: 'power3.out' })
    },
    () => {
      cancelScramble(labelRef.current, stat.label)
      cancelScramble(numRef.current, stat.display)
    },
  )

  return (
    <div className={styles.statRow} ref={rowRef}>
      <span className={styles.statLabel} ref={labelRef}>{stat.label}</span>
      <span className={styles.statBar}>
        <span className={styles.statFill} ref={fillRef} />
      </span>
      <span className={styles.statNum} ref={numRef}>{stat.display}</span>
    </div>
  )
}

export default function ContactStats({ stats }: { stats: ContactStat[] }) {
  return (
    <div className={styles.stats}>
      {stats.map((stat) => (
        <StatRow key={stat.label} stat={stat} />
      ))}
    </div>
  )
}
