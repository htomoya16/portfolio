'use client'

import { type RefObject } from 'react'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * 背景の装飾画像をスクロールに合わせて少し回し、上下にずらす。
 * 回す向きは装飾ごとに交互にし、隣り合うセクションでも逆から始まるよう sectionIndex（Hero が 0）をずらして使う。
 */
export function useDecorMotion(rootRef: RefObject<HTMLElement | null>, sectionIndex: number) {
  useGSAP(
    () => {
      const root = rootRef.current
      if (!root || getPrefersReducedMotion()) return
      root.querySelectorAll<HTMLElement>('[data-decor]').forEach((decor, i) => {
        const dir = (sectionIndex + i) % 2 === 0 ? 1 : -1
        gsap.to(decor, {
          yPercent: dir * 14,
          rotate: dir * 18,
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.8 },
        })
      })
    },
    { dependencies: [sectionIndex], scope: rootRef },
  )
}
