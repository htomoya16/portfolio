'use client'

import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { onLoaderDone } from '@/lib/loaderSignal'
import { type ComponentPropsWithoutRef, type ElementType, useEffect, useRef } from 'react'
import { SCRAMBLE_CHARS, type ScramblePattern, scrambleText } from './scramble'

type ScrambleTextProps<T extends ElementType> = {
  as?: T
  text: string
  pattern?: ScramblePattern
  chars?: string
  delay?: number
  revealRate?: number
  settleDuration?: number
  replayOnHover?: boolean
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>

export default function ScrambleText<T extends ElementType = 'span'>({
  as,
  text,
  pattern = 'title',
  chars,
  delay = 0,
  revealRate = 52,
  settleDuration = 420,
  replayOnHover = true,
  className,
  ...props
}: ScrambleTextProps<T>) {
  const Component = as || 'span'
  const charPool = chars ?? SCRAMBLE_CHARS[pattern]
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (getPrefersReducedMotion()) {
      el.textContent = text
      return
    }

    let hasPlayed = false
    let animation: ReturnType<typeof scrambleText> | undefined
    let lastPlayTime = 0
    // 文字の書き換えで pointerenter が誤って連続発火するのを防ぐだけの短い間隔。
    // 再生中でもマウスを乗せ直せば最初からやり直す
    const RETRIGGER_GUARD = 150

    // Lock element size BEFORE animation to prevent layout shift
    const lockSize = () => {
      if (el.dataset.sizeLocked) return
      const rect = el.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        el.style.display = 'inline-block'
        el.style.minWidth  = `${rect.width}px`
        el.style.minHeight = `${rect.height}px`
        el.dataset.sizeLocked = '1'
      }
    }

    const play = () => {
      const now = Date.now()
      if (now - lastPlayTime < RETRIGGER_GUARD) return
      lastPlayTime = now

      animation?.kill()
      el.textContent = text
      lockSize()

      animation = scrambleText(el, text, {
        chars: charPool,
        // 開始の待ち時間は最初の登場時だけ。ホバー時はすぐ反応させる
        delay: hasPlayed ? 0 : delay,
        revealRate,
        settleDuration,
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

    // ローディング画面の裏で再生し終わらないよう、閉じてから表示判定を始める
    const offLoaderDone = onLoaderDone(() => observer.observe(el))

    const handlePointerEnter = () => {
      if (replayOnHover) play()
    }

    el.addEventListener('pointerenter', handlePointerEnter)

    return () => {
      offLoaderDone()
      observer.disconnect()
      el.removeEventListener('pointerenter', handlePointerEnter)
      animation?.kill()
    }
  }, [charPool, delay, revealRate, replayOnHover, settleDuration, text])

  return (
    <Component ref={ref} className={className} {...props}>
      {text}
    </Component>
  )
}
