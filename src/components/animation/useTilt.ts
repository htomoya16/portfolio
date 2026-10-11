'use client'

import { type RefObject, useEffect } from 'react'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap } from '@/lib/gsap'

/** カーソルの位置に合わせて要素を立体的に傾ける（マウス操作のときだけ） */
export function useTilt(ref: RefObject<HTMLElement | null>, { maxRotateX = 8, maxRotateY = 10 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || getPrefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' })

    // quickTo は rotateX などの合成された transform に対応していないため、毎回 to で上書きする
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      gsap.to(el, {
        rotateX: -((e.clientY - r.top) / r.height - 0.5) * maxRotateX,
        rotateY: ((e.clientX - r.left) / r.width - 0.5) * maxRotateY,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, maxRotateX, maxRotateY])
}
