'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { scrollNavCopy, scrollNavLinks } from '@/content/site/navigation'
import { useActiveSection } from '@/hooks/use-active-section'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap } from '@/lib/gsap'
import styles from './ScrollNav.module.css'

type SectionId = (typeof scrollNavLinks)[number]['id']
const sectionIds = scrollNavLinks.map(({ id }) => id)

export default function ScrollNav() {
  const active = useActiveSection<SectionId>(sectionIds, 'hero')
  const prefersReducedMotion = usePrefersReducedMotion()
  const dotsRef = useRef<Record<string, HTMLSpanElement | null>>({})

  useEffect(() => {
    if (prefersReducedMotion) return

    const el = dotsRef.current[active]
    if (!el) return
    gsap.fromTo(
      el,
      { scale: 1 },
      { scale: 1.7, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 }
    )
  }, [active, prefersReducedMotion])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <nav className={styles.scrollNav} aria-label={scrollNavCopy.ariaLabel}>
      <div className={styles.track} aria-hidden="true" />
      {scrollNavLinks.map(({ id, label }) => (
        <button
          key={id}
          className={clsx(styles.item, active === id && styles.active)}
          onClick={() => scrollTo(id)}
          aria-label={`${scrollNavCopy.itemAriaPrefix} ${label}`}
          type="button"
        >
          <span className={styles.label}>{label}</span>
          <span
            className={styles.dot}
            aria-hidden="true"
            ref={(el) => {
              dotsRef.current[id] = el
            }}
          />
        </button>
      ))}
    </nav>
  )
}
