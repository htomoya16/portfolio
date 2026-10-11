'use client'

import { type RefObject, useEffect } from 'react'

/** 向きを判定するのに必要なスクロール量（px）。慣性スクロールの細かな揺れでは切り替えない */
const DIRECTION_THRESHOLD = 8

/**
 * 下へスクロールしたら要素に data-hidden を付け、上へスクロールしたら外す。
 * 要素の高さより上（ページの先頭付近）ではいつも表示する。隠し方は CSS 側で決める。
 */
export function useHideOnScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      // モーダルやローディング画面でスクロールを止めている間は、位置が変わっても切り替えない
      if (document.documentElement.style.overflow === 'hidden') return
      const y = window.scrollY
      if (y <= el.offsetHeight) {
        delete el.dataset.hidden
        lastY = y
        return
      }
      if (Math.abs(y - lastY) < DIRECTION_THRESHOLD) return
      if (y > lastY) el.dataset.hidden = ''
      else delete el.dataset.hidden
      lastY = y
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ref])
}
