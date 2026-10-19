'use client'

import { type RefObject, useEffect } from 'react'
import { syncSmoothScroll } from '@/lib/smoothScroll'

/**
 * ホイールを受け取るカルーセルの目印。ここでのホイールはスクロールせず、画像の切り替えに使う。
 * モーダルの中のカルーセルと、body の直下に出す画像の拡大表示に付ける
 */
export const CAROUSEL_WHEEL_SELECTOR = '[data-carousel-wheel]'
/** カルーセルへホイールの量を届けるイベント */
export const CAROUSEL_WHEEL_EVENT = 'pm-carousel-wheel'

function canScrollVertically(element: HTMLElement) {
  return element.scrollHeight > element.clientHeight
}

function isScrollContainer(element: HTMLElement) {
  const { overflowY } = window.getComputedStyle(element)
  return (overflowY === 'auto' || overflowY === 'scroll') && canScrollVertically(element)
}

/**
 * 操作した位置から外側へたどり、モーダル内で実際に縦スクロールできる要素を返す。
 * PC では右側の本文やカルーセル、スマホでは1列にまとめた本文全体が
 * スクロールするため、クラス名で決め打ちせずに探す。
 */
function findModalScrollArea(target: EventTarget | null, content: HTMLElement) {
  let element = target instanceof Element ? target : null
  while (element && content.contains(element)) {
    if (element instanceof HTMLElement && isScrollContainer(element)) return element
    element = element.parentElement
  }
  return null
}

function applyWheelScroll(element: HTMLElement, deltaY: number) {
  if (!canScrollVertically(element)) return
  element.scrollTop += deltaY
}

/** 開いている間、ホイールとタッチで背景のページが動かないようにし、ホイールはモーダル内のスクロールできる要素かカルーセルへ回す */
export function useModalScrollGuard(open: boolean, contentRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return

    const getContent = () => contentRef.current

    const handleWheel = (event: WheelEvent) => {
      const content = getContent()
      if (!content) return

      const carousel = event.target instanceof Element
        ? event.target.closest<HTMLElement>(CAROUSEL_WHEEL_SELECTOR)
        : null
      // 拡大表示はモーダルの外（body の直下）に出すので、モーダルの中かどうかは問わない
      if (carousel) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
        // リスナーはカルーセルの外側の要素にあるため、bubbles で届ける
        carousel.dispatchEvent(new CustomEvent(CAROUSEL_WHEEL_EVENT, {
          bubbles: true,
          detail: { deltaY: event.deltaY, deltaX: event.deltaX },
        }))
        return
      }

      const scrollArea = findModalScrollArea(event.target, content)
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()

      if (scrollArea) {
        applyWheelScroll(scrollArea, event.deltaY)
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      const content = getContent()
      if (!content) return
      if (!content.contains(event.target as Node)) return

      // 伝播は止めない。カルーセル（Embla）は touchmove でスワイプを受け取るため。
      // Lenis は syncTouch: false（既定）なので指の操作を横取りしない。
      // スクロールできる領域の中ではブラウザ標準のスクロールに任せ、
      // スクロール先がない場所でだけ止めて背景のページが動かないようにする
      if (findModalScrollArea(event.target, content)) return
      event.preventDefault()
    }

    window.addEventListener('wheel', handleWheel, { capture: true, passive: false })
    window.addEventListener('touchmove', handleTouchMove, { capture: true, passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('touchmove', handleTouchMove, { capture: true })
    }
  }, [contentRef, open])
}

/** 開いている間、背景のページをスクロール位置ごと固定する */
export function useBodyScrollLock(open: boolean) {
  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const html = document.documentElement
    const body = document.body
    const previousHtmlOverflow = html.style.overflow
    const previousBodyOverflow = body.style.overflow
    const previousBodyPosition = body.style.position
    const previousBodyTop = body.style.top
    const previousBodyWidth = body.style.width
    const previousHtmlScrollBehavior = html.style.scrollBehavior
    const previousBodyScrollBehavior = body.style.scrollBehavior

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    return () => {
      html.style.scrollBehavior = 'auto'
      body.style.scrollBehavior = 'auto'
      html.style.overflow = previousHtmlOverflow
      body.style.overflow = previousBodyOverflow
      body.style.position = previousBodyPosition
      body.style.top = previousBodyTop
      body.style.width = previousBodyWidth
      window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' })
      syncSmoothScroll()

      window.requestAnimationFrame(() => {
        html.style.scrollBehavior = previousHtmlScrollBehavior
        body.style.scrollBehavior = previousBodyScrollBehavior
      })
    }
  }, [open])
}
