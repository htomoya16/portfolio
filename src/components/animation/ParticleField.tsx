'use client'

import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

const COLORS = ['#4367FF', '#4FD8FF', '#B5C2FF', '#F072B0', '#D7FF00']
const SHAPES = ['square', 'plus', 'dot'] as const

type Shape = (typeof SHAPES)[number]

interface Particle {
  id: number
  size: number
  color: string
  shape: Shape
  startX: number
  startY: number
  driftX: number
  driftY: number
  duration: number
  delay: number
  rotateAmount: number
  opacity: number
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    driftX: (Math.random() - 0.5) * 80,
    driftY: (Math.random() - 0.5) * 100,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 5,
    rotateAmount: (Math.random() - 0.5) * 720,
    opacity: 0.18 + Math.random() * 0.32,
  }))
}

interface ParticleFieldProps {
  /** セクション内に配置する場合は count を指定して position:absolute で使用 */
  count?: number
}

export default function ParticleField({ count = 12 }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  // Build particles only on client to avoid SSR hydration mismatch
  useEffect(() => {
    setParticles(buildParticles(count))
  }, [count])

  useEffect(() => {
    const root = containerRef.current
    if (!root || particles.length === 0) return

    if (getPrefersReducedMotion()) return

    const els = root.querySelectorAll<HTMLElement>('.particle')
    const tweens: gsap.core.Tween[] = []

    els.forEach((el, i) => {
      const p = particles[i]
      if (!p) return
      const tween = gsap.to(el, {
        x: `+=${p.driftX}`,
        y: `+=${p.driftY}`,
        rotate: `+=${p.rotateAmount}`,
        duration: p.duration,
        delay: p.delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      tweens.push(tween)
    })

    return () => {
      tweens.forEach((t) => t.kill())
    }
  }, [particles])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => {
        const baseStyle: React.CSSProperties = {
          position: 'absolute',
          left: `${p.startX}%`,
          top: `${p.startY}%`,
          width: p.size,
          height: p.size,
          opacity: p.opacity,
          borderRadius: p.shape === 'dot' ? '50%' : 0,
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
        }
        if (p.shape === 'plus') {
          baseStyle.background = 'transparent'
          baseStyle.backgroundImage = `linear-gradient(${p.color}, ${p.color}), linear-gradient(${p.color}, ${p.color})`
          baseStyle.backgroundSize = '100% 30%, 30% 100%'
          baseStyle.backgroundPosition = 'center'
          baseStyle.backgroundRepeat = 'no-repeat'
        } else if (p.shape === 'dot') {
          baseStyle.background = p.color
          baseStyle.boxShadow = `0 0 8px ${p.color}aa, 0 0 2px ${p.color}`
        } else {
          baseStyle.background = p.color
        }
        return <span key={p.id} className="particle" style={baseStyle} />
      })}
    </div>
  )
}
