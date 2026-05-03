'use client'

import { useEffect, useRef } from 'react'

export default function NavProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const pct = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
      bar.style.transform = `scaleX(${pct})`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="nav-progress"
    />
  )
}
