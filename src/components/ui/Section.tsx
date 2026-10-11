'use client'

import { type ReactNode, useRef } from 'react'
import clsx from 'clsx'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Section.module.css'

type Props = {
  id: string
  className?: string
  children: ReactNode
}

/**
 * About 以降のセクションの枠。スクロールで見出しと中身を順に表示し、下端の区切り線を引く。
 * 見出しは SectionHeading（data-section-heading）、背景は Atmo（data-atmo）を目印に探す。
 */
export default function Section({ id, className, children }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section || getPrefersReducedMotion()) return

      const heading = section.querySelector('[data-section-heading]')
      const content = Array.from(section.children).filter(
        (child) => !child.hasAttribute('data-atmo') && child !== heading,
      )

      gsap.fromTo(
        heading,
        { autoAlpha: 0, y: 48, rotateX: -28, transformPerspective: 800 },
        {
          autoAlpha: 1, y: 0, rotateX: 0, duration: 0.95, ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        },
      )
      gsap.fromTo(
        content,
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 66%', once: true },
        },
      )
      gsap.fromTo(
        section,
        { '--divider-scale': 0 },
        {
          '--divider-scale': 1, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 15%', scrub: 1 },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id={id} className={clsx(styles.section, className)}>
      {children}
    </section>
  )
}
