'use client'

import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const crosshairRef = useRef<HTMLDivElement | null>(null)
  const visualRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = crosshairRef.current
    const visual = visualRef.current
    if (!el || !visual) return

    if (getPrefersReducedMotion()) return

    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Hide default system cursor on body
    document.body.style.cursor = 'none'

    const updateTransform = (x: number, y: number) => {
      el.style.transform = `translate3d(${x - 104}px, ${y - 104}px, 0)`
    }

    const onMove = (e: MouseEvent) => {
      updateTransform(e.clientX, e.clientY)
    }

    const handleEnterInteractive = () => {
      visual.style.transform = 'scale(1.6)'
    }
    const handleLeaveInteractive = () => {
      visual.style.transform = 'scale(1)'
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
        left: 0,
        top: 0,
        width: 208,
        height: 208,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
    >
      <div
        ref={visualRef}
        style={{
          width: '100%',
          height: '100%',
          transform: 'scale(1)',
          transformOrigin: 'center center',
          transition: 'transform 0.16s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Green crosshair — green_crosshair_no_outline.svg inline */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="208"
          height="208"
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
    </div>
  )
}
