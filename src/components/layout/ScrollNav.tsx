'use client'

import { scrollNavCopy, scrollNavLinks } from '@/content/site/navigation'
import { useActiveSection } from '@/hooks/use-active-section'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

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
    <nav className="scroll-nav" aria-label={scrollNavCopy.ariaLabel}>
      <div className="scroll-nav-track" aria-hidden="true" />
      {scrollNavLinks.map(({ id, label }) => (
        <button
          key={id}
          className={`scroll-nav-item${active === id ? ' active' : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={`${scrollNavCopy.itemAriaPrefix} ${label}`}
          type="button"
        >
          <span className="scroll-nav-label">{label}</span>
          <span
            className="scroll-nav-dot"
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
