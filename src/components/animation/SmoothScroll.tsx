'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { setSmoothScroll } from '@/lib/smoothScroll'

/** Lenis で慣性スクロールにし、GSAP の ScrollTrigger と同じタイミングで動かす */
export default function SmoothScroll() {
  useEffect(() => {
    if (getPrefersReducedMotion()) return

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, touchMultiplier: 0.85 })
    const update = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)
    setSmoothScroll(lenis)

    return () => {
      setSmoothScroll(null)
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])

  return null
}
