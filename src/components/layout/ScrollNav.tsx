'use client'

import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'hero',       label: 'HERO' },
  { id: 'about',      label: '01 ABOUT' },
  { id: 'skills',     label: '02 SKILLS' },
  { id: 'projects',   label: '03 PROJECTS' },
  { id: 'experience', label: '04 EXP' },
  { id: 'contact',    label: '05 CONTACT' },
]

export default function ScrollNav() {
  const [active, setActive] = useState('hero')
  const dotsRef = useRef<Record<string, HTMLSpanElement | null>>({})

  useEffect(() => {
    const el = dotsRef.current[active]
    if (!el) return
    gsap.fromTo(
      el,
      { scale: 1 },
      { scale: 1.7, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 }
    )
  }, [active])

  useEffect(() => {
    const update = () => {
      const mid = window.scrollY + window.innerHeight * 0.5
      let best = SECTIONS[0].id
      let minDist = Infinity

      for (const { id } of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = window.scrollY + el.getBoundingClientRect().top
        const dist = Math.abs(top + el.offsetHeight * 0.5 - mid)
        if (dist < minDist) { minDist = dist; best = id }
      }

      setActive(best)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="scroll-nav" aria-label="Section navigation">
      <div className="scroll-nav-track" aria-hidden="true" />
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`scroll-nav-item${active === id ? ' active' : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={`Go to ${label}`}
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
