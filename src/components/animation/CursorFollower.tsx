'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const handleEnterInteractive = () => {
      gsap.to(ring, { scale: 2.2, borderColor: '#4367FF', duration: 0.25, ease: 'power3.out' })
      gsap.to(dot, { scale: 0.4, duration: 0.2 })
    }

    const handleLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(67,103,255,0.55)', duration: 0.25, ease: 'power3.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll<HTMLElement>(
      'a, button, .sk-tile, .project-card, .ct-card, .about-card, .scroll-nav-item'
    )
    interactives.forEach((el) => {
      el.addEventListener('pointerenter', handleEnterInteractive)
      el.addEventListener('pointerleave', handleLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('pointerenter', handleEnterInteractive)
        el.removeEventListener('pointerleave', handleLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: -16,
          top: -16,
          width: 32,
          height: 32,
          border: '1.5px solid rgba(67,103,255,0.55)',
          borderRadius: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: -3,
          top: -3,
          width: 6,
          height: 6,
          background: '#D7FF00',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
          boxShadow: '0 0 6px #D7FF00, 0 0 14px rgba(215,255,0,0.6)',
        }}
      />
    </>
  )
}
