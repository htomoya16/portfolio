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
          { autoAlpha: 0, y: 48, rotateX: -28, transformPerspective: 800 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.95,
            ease: 'power4.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true },
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
        { autoAlpha: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: { trigger: '.projects-grid', start: 'top 75%', once: true },
        }
      )

      gsap.fromTo(
        '.sk-tile',
        { autoAlpha: 0, y: 24, clipPath: 'inset(100% 0 0 0)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.04,
          scrollTrigger: { trigger: '.skills', start: 'top 72%', once: true },
        }
      )

      // ===== Atmo background parallax =====
      gsap.utils.toArray<HTMLElement>('section').forEach((section) => {
        const blobs = section.querySelectorAll('.atmo-blob')
        const quads = section.querySelectorAll('.atmo-quad')
        const pluses = section.querySelectorAll<HTMLElement>('.atmo-px')
        const slashes = section.querySelectorAll('.atmo-slash')
        const halfs = section.querySelectorAll('.atmo-half')

        if (blobs.length) {
          gsap.to(blobs, {
            yPercent: -22,
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
          })
        }
        if (quads.length) {
          gsap.to(quads, {
            rotate: '+=24',
            yPercent: 14,
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          })
        }
        if (pluses.length) {
          gsap.to(pluses, {
            yPercent: -34,
            rotate: '+=60',
            stagger: { amount: 0.4 },
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
        }
        if (slashes.length) {
          gsap.to(slashes, {
            x: '+=44',
            rotate: '+=18',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2 },
          })
        }
        if (halfs.length) {
          gsap.to(halfs, {
            rotate: '+=36',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2.4 },
          })
        }
      })

      // Idle float for atmo squares (pixel-dot vibe)
      gsap.utils.toArray<HTMLElement>('.atmo-sq').forEach((el, i) => {
        gsap.to(el, {
          y: gsap.utils.random(-14, 14),
          x: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.18,
        })
      })

      // Global drifting grid — subtle background motion
      gsap.utils.toArray<HTMLElement>('.atmo-grid').forEach((grid) => {
        gsap.to(grid, {
          backgroundPosition: '+=180px +=180px',
          ease: 'none',
          scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 },
        })
      })

      // Hero pixel sprites scroll parallax
      const sprites = gsap.utils.toArray<HTMLElement>('.px-sprite')
      sprites.forEach((sprite, i) => {
        gsap.to(sprite, {
          y: (i % 2 === 0 ? -1 : 1) * 60,
          rotate: (i % 2 === 0 ? -1 : 1) * 8,
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
        })
      })

      gsap.to('.px-controller', {
        y: -40,
        rotate: -1,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.4 },
      })

      gsap.to('.hero-right-bg', {
        backgroundPosition: '+=80px +=80px',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      })
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
