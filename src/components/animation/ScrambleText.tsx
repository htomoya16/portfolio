'use client'

import { animate, scrambleText } from 'animejs'
import { type ComponentPropsWithoutRef, type ElementType, useEffect, useRef } from 'react'

// Loading-style char pool: block chars + binary/symbols + alphabets for data-load vibe
const LOADER_CHARS = '░▒▓█10!%ABXYZ'

type ScrambleTextProps<T extends ElementType> = {
  as?: T
  text: string
  chars?: string
  delay?: number
  duration?: number
  revealRate?: number
  revealDelay?: number
  settleRate?: number
  settleDuration?: number
  from?: 'left' | 'center' | 'right' | 'random' | 'auto' | number
  cursor?: boolean | string
  replayOnHover?: boolean
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>

export default function ScrambleText<T extends ElementType = 'span'>({
  as,
  text,
  chars = LOADER_CHARS,
  delay = 0,
  duration,
  revealRate = 52,
  revealDelay = 0,
  settleRate = 32,
  settleDuration = 420,
  from = 'left',
  cursor = false,
  replayOnHover = true,
  className,
  ...props
}: ScrambleTextProps<T>) {
  const Component = as || 'span'
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.textContent = text
      return
    }

    let hasPlayed = false
    let animation: ReturnType<typeof animate> | undefined
    let isPlaying = false
    let lastPlayTime = 0
    const COOLDOWN = 600 // ms — prevent retriggering mid-animation

    // Lock element size BEFORE animation to prevent layout shift
    const lockSize = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0) {
        el.style.display = 'inline-block'
        el.style.minWidth = `${rect.width}px`
      }
    }

    const play = () => {
      const now = Date.now()
      if (now - lastPlayTime < COOLDOWN) return
      lastPlayTime = now

      animation?.cancel()
      lockSize()
      el.textContent = text
      isPlaying = true

      animation = animate(el, {
        innerHTML: scrambleText({
          text,
          chars,
          delay,
          duration,
          revealRate,
          revealDelay,
          settleRate,
          settleDuration,
          from,
          cursor,
          override: '',
          perturbation: 0.45,
        }),
        onComplete: () => {
          isPlaying = false
        },
      })
      hasPlayed = true
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          play()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    const handlePointerEnter = () => {
      if (replayOnHover && !isPlaying) play()
    }

    el.addEventListener('pointerenter', handlePointerEnter)

    return () => {
      observer.disconnect()
      el.removeEventListener('pointerenter', handlePointerEnter)
      animation?.cancel()
    }
  }, [
    chars,
    cursor,
    delay,
    duration,
    from,
    revealDelay,
    revealRate,
    replayOnHover,
    settleDuration,
    settleRate,
    text,
  ])

  return (
    <Component ref={ref} className={className} {...props}>
      {text}
    </Component>
  )
}
