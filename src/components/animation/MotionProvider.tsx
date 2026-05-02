'use client'

import { useGSAP } from '@gsap/react'
import { animate as anime } from 'animejs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { type ReactNode, useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function MotionProvider({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      touchMultiplier: 0.85,
    })

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      gsap.set('.hero-content, .hero-visual, .hero-play-center, .hero-ticker', {
        autoAlpha: 0,
        y: 28,
      })
      gsap.set('.px-sprite, .hero-hp, .hero-label-100', {
        autoAlpha: 0,
        scale: 0.7,
        y: 16,
      })

      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTimeline
        .to('.hero-content', { autoAlpha: 1, y: 0, duration: 0.8 })
        .to('.hero-visual', { autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.45')
        .to('.hero-hp, .hero-label-100', { autoAlpha: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.08 }, '-=0.2')
        .to('.px-sprite', { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.08 }, '-=0.2')
        .to('.hero-play-center, .hero-ticker', { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 }, '-=0.15')

      gsap.utils.toArray<HTMLElement>('.about, .skills, .projects, .experience, .contact').forEach((section) => {
        const heading = section.querySelector('.section-head')
        const content = Array.from(section.children).filter((child) => !child.classList.contains('atmo') && child !== heading)

        gsap.fromTo(
          heading,
          { autoAlpha: 0, y: 34, rotateX: -12 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 72%', once: true },
          }
        )

        gsap.fromTo(
          content,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: section, start: 'top 66%', once: true },
          }
        )
      })

      gsap.fromTo(
        '.project-card',
        { autoAlpha: 0, y: 50, rotate: -1.5 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 0.7,
          ease: 'back.out(1.4)',
          stagger: 0.12,
          scrollTrigger: { trigger: '.projects-grid', start: 'top 72%', once: true },
        }
      )
    },
    { scope: rootRef }
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const targets = root.querySelectorAll<HTMLElement>('.sk-tile, .project-card, .ct-card')

    const handleEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement
      anime(target, {
        translateY: [-2, -8, -4],
        rotate: [-0.4, 0.7, 0],
        scale: [1, 1.025, 1.01],
        duration: 420,
        ease: 'out(3)',
      })
    }

    targets.forEach((target) => target.addEventListener('pointerenter', handleEnter))

    return () => {
      targets.forEach((target) => target.removeEventListener('pointerenter', handleEnter))
    }
  }, [])

  return <div ref={rootRef}>{children}</div>
}
