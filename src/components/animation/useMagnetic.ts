'use client'

import { type RefObject, useEffect } from 'react'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap } from '@/lib/gsap'

/** カーソルに少し吸い寄せられるように要素を動かす（マウス操作のときだけ） */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.35) {
  useEffect(() => {
    const el = ref.current
    if (!el || getPrefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3.out' })
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, strength])
}
