'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Atmo.module.css'
import DecorImages from './DecorImages'
import { type AtmoVariant, SECTION_DECORS } from './decors'
import ParticleField from './ParticleField'
import { useDecorMotion } from './useDecorMotion'

const VARIANT_ORDER = Object.keys(SECTION_DECORS) as AtmoVariant[]

type Props = {
  variant: AtmoVariant
  tone?: 'cool' | 'warm'
}

/** セクションの背景。Section が data-atmo を目印に、登場演出の対象から外す */
export default function Atmo({ variant, tone = 'cool' }: Props) {
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

      // ゆっくり膨らんだり縮んだりさせる。開始をずらしてページ全体で動きがそろわないようにする
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          scale: 1.18,
          opacity: '+=0.08',
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: (order * blobs.length + i) * 0.4,
        })
      })
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
    { dependencies: [order], scope: rootRef },
  )

  return (
    <div ref={rootRef} className={clsx(styles.atmo, styles[variant], tone === 'warm' && styles.warm)} aria-hidden="true" data-atmo>
      <div ref={gridRef} className={styles.grid} />
      {(['b1', 'b2', 'b3'] as const).map((name, i) => (
        <div key={name} ref={(el) => { blobRefs.current[i] = el }} className={clsx(styles.blob, styles[name])} />
      ))}
      <div className={styles.noise} />
      <DecorImages decors={SECTION_DECORS[variant]} />
      <ParticleField count={10} />
    </div>
  )
}
