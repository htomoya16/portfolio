'use client'

import { useEffect, useState } from 'react'

export function useActiveSection<T extends string>(sectionIds: readonly T[], fallbackId: T) {
  const [active, setActive] = useState<T>(fallbackId)

  useEffect(() => {
    let frame = 0

    const measure = () => {
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

    // 位置の計測はレイアウト計算を伴うため、スクロールイベントごとではなく1フレームに1回にまとめる
    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(measure)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [fallbackId, sectionIds])

  return active
}
