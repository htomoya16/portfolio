'use client'

import { useEffect, useRef } from 'react'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { getHeroBackground } from '@/lib/heroBackground'
import { markLoaderDone } from '@/lib/loaderSignal'
import styles from './NegiLoader.module.css'
import { framePos, SHEET_SRC, spriteStyle } from './petSprite'

/** ローディング画面が読み込みを待つ最大時間。遅い回線でもこれ以上は待たせない。 */
const LOADER_MAX_WAIT_MS = 3000
/** ローディング画面で使う走りのコマ（スプライトの行と枚数） */
const RUN_ROW = 8
const RUN_FRAMES = 6

/** 画像を読み込んでデコードし終えたら解決する。失敗しても解決する（表示は続ける）。 */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.decode().then(() => resolve(), () => resolve())
  })
}

/** フォント、Hero の背景画像、ネギのスプライトの読み込みを、最大 maxWait ミリ秒待つ。 */
function waitForInitialAssets(maxWait: number): Promise<void> {
  const assets = Promise.all([
    document.fonts?.ready,
    preloadImage(getHeroBackground()),
    preloadImage(SHEET_SRC),
  ]).then(() => undefined)
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, maxWait))
  return Promise.race([assets, timeout])
}

/** 初回のローディング画面。ネギが走りながらバーを進め、閉じ始めたら markLoaderDone で知らせる */
export default function NegiLoader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const petRef = useRef<HTMLDivElement>(null)
  const spriteRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = loaderRef.current
    if (!el) {
      markLoaderDone()
      return
    }
    const reduced = getPrefersReducedMotion()
    const D = reduced ? 400 : 1100
    const t0 = performance.now()
    document.documentElement.style.overflow = 'hidden'
    let frame = 0
    let lastFrameAt = 0
    let done = false
    let finished = false
    let ready = false
    let shown = 0
    let raf = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    // 閉じた直後に画面が完成しているよう、Hero の表示に必要なものを先に読み込む
    waitForInitialAssets(LOADER_MAX_WAIT_MS).then(() => {
      ready = true
    })

    const step = (t: number) => {
      const elapsed = t - t0
      const p = Math.min(1, elapsed / D)
      const e = 1 - Math.pow(1 - p, 2.2)
      // 読み込みが終わるまでは 90% 台で待つ（待つ間も少しずつ進めて止まって見えないようにする）
      const waiting = Math.min(1, Math.max(0, elapsed - D) / (LOADER_MAX_WAIT_MS - D))
      const target = ready ? e : Math.min(e, 0.9 + 0.06 * waiting)
      shown = reduced ? target : shown + (target - shown) * 0.25
      const bar = barRef.current
      const pet = petRef.current
      const sprite = spriteRef.current
      const pct = pctRef.current
      if (!bar || !pet || !sprite || !pct) return
      bar.style.width = `${shown * 100}%`
      pet.style.transform = `translateX(${shown * 260}px)`
      pct.textContent = `${String(Math.round(shown * 100)).padStart(3, '0')}%`
      if (t - lastFrameAt > 150) {
        lastFrameAt = t
        frame = (frame + 1) % RUN_FRAMES
        sprite.style.backgroundPosition = framePos(frame, RUN_ROW)
      }
      if (p >= 1 && ready && shown > 0.995 && !done) {
        done = true
        if (textRef.current) textRef.current.textContent = 'READY!'
        timers.push(setTimeout(() => {
          el.style.opacity = '0'
          el.style.transform = 'translateY(-12px)'
          document.documentElement.style.overflow = ''
          markLoaderDone()
          timers.push(setTimeout(() => {
            el.style.display = 'none'
            finished = true
          }, 460))
        }, reduced ? 100 : 380))
      }
      if (!finished) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <div ref={loaderRef} className={styles.loader} role="status" aria-label="Loading">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.stack}>
        <div className={styles.track}>
          <div ref={petRef} className={styles.pet}>
            <div
              ref={spriteRef}
              style={{ ...spriteStyle, backgroundPosition: framePos(0, RUN_ROW), transform: 'scale(0.5)' }}
            />
          </div>
        </div>
        <div className={styles.bar}>
          <div ref={barRef} className={styles.fill} />
        </div>
        <div className={styles.meta}>
          <span ref={textRef} className={styles.label}>
            LOADING
          </span>
          <span ref={pctRef} className={styles.pct}>
            000%
          </span>
        </div>
      </div>
    </div>
  )
}
