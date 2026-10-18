'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import styles from './Atmo.module.css'
import DecorImages from './DecorImages'
import { type AtmoVariant, SECTION_DECORS } from './decors'
import ParticleField from './ParticleField'
import { useDecorMotion } from './useDecorMotion'

const VARIANT_ORDER = Object.keys(SECTION_DECORS) as AtmoVariant[]

type Props = {
  variant: AtmoVariant
  tone?: 'cool' | 'warm'
  /**
   * 光の拡大・縮小と粒子の漂いを止める。すりガラス（backdrop-filter）を前に置くセクションで使う。
   * 後ろが動くとすりガラスを毎フレームぼかし直すことになり、GPU を使い続けるため
   */
  still?: boolean
}

/** セクションの背景。data-section-bg を付け、Section の登場演出の対象から外す */
export default function Atmo({ variant, tone = 'cool', still = false }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const gridRef = useRef<HTMLDivElement>(null)
  // variant はページ上の並び順（About が 1 番目のセクション。0 は Hero）
  const order = VARIANT_ORDER.indexOf(variant)

  useDecorMotion(rootRef, order + 1)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root || getPrefersReducedMotion()) return
      const blobs = blobRefs.current.filter((blob): blob is HTMLDivElement => blob !== null)

      if (!still) {
        // ゆっくり膨らんだり縮んだりさせる。開始をずらしてページ全体で動きがそろわないようにする
        const breathes = blobs.map((blob, i) =>
          gsap.to(blob, {
            scale: 1.18,
            opacity: '+=0.08',
            duration: gsap.utils.random(4, 7),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: (order * blobs.length + i) * 0.4,
          }),
        )
        // 画面外のセクションでは止めておき、描き直しを見えている分だけにする
        ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => breathes.forEach((tween) => tween.paused(!self.isActive)),
          onRefresh: (self) => breathes.forEach((tween) => tween.paused(!self.isActive)),
        })
      }
      // スクロールに合わせて光と方眼を少しずつずらし、奥行きを出す
      gsap.to(blobs, {
        yPercent: -16,
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      })
      gsap.to(gridRef.current, {
        backgroundPosition: '+=80px +=80px',
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
      })
    },
    { dependencies: [order, still], scope: rootRef },
  )

  return (
    <div ref={rootRef} className={clsx(styles.atmo, styles[variant], tone === 'warm' && styles.warm)} aria-hidden="true" data-section-bg>
      <div ref={gridRef} className={styles.grid} />
      {(['b1', 'b2', 'b3'] as const).map((name, i) => (
        <div key={name} ref={(el) => { blobRefs.current[i] = el }} className={clsx(styles.blob, styles[name])} />
      ))}
      <div className={styles.noise} />
      <DecorImages decors={SECTION_DECORS[variant]} />
      <ParticleField count={10} still={still} />
    </div>
  )
}
