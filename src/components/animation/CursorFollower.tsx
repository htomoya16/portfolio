'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const crosshairRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = crosshairRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Hide default system cursor on body
    document.body.style.cursor = 'none'

    const xTo = gsap.quickTo(el, 'x', { duration: 0.12, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.12, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const handleEnterInteractive = () => {
      gsap.to(el, { scale: 1.6, duration: 0.2, ease: 'power3.out' })
    }
    const handleLeaveInteractive = () => {
      gsap.to(el, { scale: 1, duration: 0.2, ease: 'power3.out' })
    }

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll<HTMLElement>(
      'a, button, .sk-tile, .project-card, .ct-card, .about-card, .scroll-nav-item'
    )
    interactives.forEach((interEl) => {
      interEl.addEventListener('pointerenter', handleEnterInteractive)
      interEl.addEventListener('pointerleave', handleLeaveInteractive)
    })

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((interEl) => {
        interEl.removeEventListener('pointerenter', handleEnterInteractive)
        interEl.removeEventListener('pointerleave', handleLeaveInteractive)
      })
    }
  }, [])

  return (
    <div
      ref={crosshairRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: -30,
        top: -30,
        width: 60,
        height: 60,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
    >
      {/* Green crosshair — green_crosshair_no_outline.svg inline */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 1280 1280"
        style={{ display: 'block' }}
      >
        <g fill="#00ff3b">
          <rect x="630" y="540" width="18" height="45" />
          <rect x="573" y="594" width="48" height="20" />
          <rect x="659" y="594" width="48" height="20" />
          <rect x="630" y="623" width="18" height="45" />
        </g>
      </svg>
    </div>
  )
}
