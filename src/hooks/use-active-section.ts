'use client'

import { useEffect, useState } from 'react'

export function useActiveSection<T extends string>(sectionIds: readonly T[], fallbackId: T) {
  const [active, setActive] = useState<T>(fallbackId)

  useEffect(() => {
    const update = () => {
      const mid = window.scrollY + window.innerHeight * 0.5
      let best = fallbackId
      let minDist = Infinity

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue

        const top = window.scrollY + el.getBoundingClientRect().top
        const dist = Math.abs(top + el.offsetHeight * 0.5 - mid)
        if (dist < minDist) {
          minDist = dist
          best = id
        }
      }

      setActive(best)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [fallbackId, sectionIds])

  return active
}
