'use client'

import { useEffect, useRef, useState } from 'react'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap } from '@/lib/gsap'
import styles from './ParticleField.module.css'

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
  count?: number
}

export default function ParticleField({ count = 12 }: ParticleFieldProps) {
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [particles, setParticles] = useState<Particle[]>([])

  // 乱数で作るので、サーバーとの描画の不一致を避けてクライアントでだけ生成する
  useEffect(() => {
    setParticles(buildParticles(count))
  }, [count])

  useEffect(() => {
    if (particles.length === 0 || getPrefersReducedMotion()) return

    const tweens: gsap.core.Tween[] = []
    particles.forEach((p, i) => {
      const el = particleRefs.current[i]
      if (!el) return
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
    <div className={styles.field} aria-hidden="true">
      {particles.map((p, i) => {
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
        return <span key={p.id} ref={(el) => { particleRefs.current[i] = el }} style={baseStyle} />
      })}
    </div>
  )
}
