'use client'

import { type RefObject, useEffect, useRef } from 'react'

type HoverHandler<T> = (el: T) => void

/**
 * pointerenter / pointerleave をネイティブのイベントで受け取る。
 * React の onPointerLeave は、カーソルの下の文字を書き換える（かき混ぜる）と発火しないことがあるため、
 * 離れたときの後始末が必要なホバー演出ではこちらを使う。
 */
export function useHover<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onEnter?: HoverHandler<T>,
  onLeave?: HoverHandler<T>,
) {
  const handlersRef = useRef({ onEnter, onLeave })
  useEffect(() => {
    handlersRef.current = { onEnter, onLeave }
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleEnter = () => handlersRef.current.onEnter?.(el)
    const handleLeave = () => handlersRef.current.onLeave?.(el)
    el.addEventListener('pointerenter', handleEnter)
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      el.removeEventListener('pointerenter', handleEnter)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [ref])
}
