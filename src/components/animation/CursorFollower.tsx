'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import styles from './CursorFollower.module.css'

/** 照準を大きくする要素。カードなどリンク以外のものには data-cursor-grow を付ける */
const INTERACTIVE_SELECTOR = 'a, button, [data-cursor-grow]'

const subscribe = () => () => {}

export default function CursorFollower() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const crosshairRef = useRef<HTMLDivElement | null>(null)
  const visualRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = crosshairRef.current
    const visual = visualRef.current
    if (!el || !visual) return
    if (getPrefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.body.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 104}px, ${e.clientY - 104}px, 0)`
      el.style.visibility = 'visible'
    }
    const onOver = (e: PointerEvent) => {
      const interactive = e.target instanceof Element && e.target.closest(INTERACTIVE_SELECTOR)
      visual.style.transform = interactive ? 'scale(1.6)' : 'scale(1)'
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('pointerover', onOver)
    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('pointerover', onOver)
    }
  }, [mounted])

  // 祖先の transform などで position: fixed がずれないよう、body の直下に描画する
  if (!mounted) return null
  return createPortal(
    <div ref={crosshairRef} className={styles.cursor} aria-hidden="true">
      <div ref={visualRef} className={styles.visual}>
        <svg xmlns="http://www.w3.org/2000/svg" width="208" height="208" viewBox="0 0 1280 1280">
          {/* 4 本の棒の中心を画像の中心（640, 640）にそろえ、実際のカーソルの先端と重ねる */}
          <g fill="#00ff3b">
            <rect x="631" y="576" width="18" height="45" />
            <rect x="573" y="630" width="48" height="20" />
            <rect x="659" y="630" width="48" height="20" />
            <rect x="631" y="659" width="18" height="45" />
          </g>
        </svg>
      </div>
    </div>,
    document.body,
  )
}
