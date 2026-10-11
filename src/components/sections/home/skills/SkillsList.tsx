'use client'

import { type CSSProperties, useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { playScramble } from '@/components/animation/scramble'
import { useHover } from '@/components/animation/useHover'
import { type SkillCategory, type SkillTile, skillCategories, skillsCopy } from '@/content/site/skills'
import { TECH_ICONS } from '@/content/site/techIcons'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Skills.module.css'

type SkillLevelStyle = CSSProperties & {
  '--skill-level': number
}

function formatLevel(level: number) {
  return Number.isInteger(level) ? level.toFixed(0) : level.toFixed(1)
}

/** レベル帯（配色）。Skills.module.css の同名クラスに対応する */
function levelTone(level: number) {
  if (level >= 4.5) return 'max'
  if (level >= 4) return 'pro'
  if (level >= 3.5) return 'high'
  if (level >= 3) return 'mid'
  if (level >= 2) return 'base'
  return 'low'
}

function getInitials(name: string) {
  return name
    .split(/\s+|\//)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const formatCount = (count: number) => `${String(count).padStart(2, '0')} ${skillsCopy.countSuffix}`

function SkillCard({ tile }: { tile: SkillTile }) {
  const style: SkillLevelStyle = { '--skill-level': tile.level }
  const iconSrc = TECH_ICONS[tile.name]
  const cardRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)

  // カーソルを乗せたら名前をかき混ぜ、レベルのバーを伸ばし直して、カードを小さく弾ませる
  useHover(cardRef, (card) => {
    if (getPrefersReducedMotion()) return
    playScramble(nameRef.current, tile.name, { pattern: 'soft', revealRate: 48, settleDuration: 280 })
    card.classList.remove(styles.levelAnimating)
    void fillRef.current?.offsetWidth
    card.classList.add(styles.levelAnimating)
    gsap.to(card, {
      keyframes: { y: [-2, -6, -3], scale: [1, 1.02, 1.005] },
      duration: 0.38,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  })

  return (
    <div
      ref={cardRef}
      className={clsx(styles.tile, styles[levelTone(tile.level)])}
      style={style}
      data-level={tile.level}
      data-cursor-grow
      data-skill-tile
      onAnimationEnd={(e) => {
        if (e.target === fillRef.current) e.currentTarget.classList.remove(styles.levelAnimating)
      }}
    >
      <div className={styles.tileMain}>
        <span className={styles.tileIcon} aria-hidden="true">
          {iconSrc ? (
            <Image className={styles.tileIconImg} src={iconSrc} alt="" width={32} height={32} />
          ) : (
            <span className={styles.tileIconFallback}>{getInitials(tile.name)}</span>
          )}
        </span>
        <span className={styles.tileBody}>
          <span className={styles.tileTop}>
            <span className={styles.tileName} ref={nameRef}>{tile.name}</span>
            <span className={styles.tileScore} aria-label={`Level ${formatLevel(tile.level)} out of 5`}>
              Lv.{formatLevel(tile.level)}
            </span>
          </span>
          <span className={styles.levelTrack} aria-hidden="true">
            <span className={styles.levelFill} ref={fillRef} data-level-fill />
          </span>
        </span>
      </div>
    </div>
  )
}

function CategoryHead({ category }: { category: SkillCategory }) {
  const headRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const title = `### ${category.title}`
  useHover(headRef, () => playScramble(titleRef.current, title, { pattern: 'title' }))

  return (
    <div className={styles.categoryHead} ref={headRef}>
      <div className={styles.categoryMarker} aria-hidden="true">
        <Image className={styles.categoryMarkerImg} src={category.iconSrc} alt="" width={24} height={24} />
      </div>
      <span className={styles.categoryTitle} ref={titleRef}>{title}</span>
      <div className={styles.categoryRule} />
      <span className={styles.categoryCount} data-count={category.tiles.length}>
        {String(category.tiles.length).padStart(2, '0')} {skillsCopy.countSuffix}
      </span>
    </div>
  )
}

/** カテゴリごとのスキル一覧。スクロールでカードとレベルのバーを順に表示する */
export default function SkillsList() {
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const list = listRef.current
      if (!list || getPrefersReducedMotion()) return

      gsap.fromTo(
        list.querySelectorAll('[data-skill-tile]'),
        { autoAlpha: 0, y: 24, clipPath: 'inset(100% 0 0 0)' },
        {
          autoAlpha: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.55, ease: 'power2.out', stagger: 0.04,
          scrollTrigger: { trigger: list.closest('section'), start: 'top 72%', once: true },
        },
      )
      gsap.fromTo(
        list.querySelectorAll('[data-level-fill]'),
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.1, ease: 'power3.out', stagger: 0.035,
          scrollTrigger: { trigger: list, start: 'top 76%', once: true },
        },
      )
      // 件数を 0 から数え上げる
      list.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const counter = { val: 0 }
        gsap.to(counter, {
          val: Number(el.dataset.count), duration: 1.6, ease: 'power2.out', snap: { val: 1 },
          onUpdate: () => { el.textContent = formatCount(counter.val) },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })
    },
    { scope: listRef },
  )

  return (
    <div className={styles.list} ref={listRef}>
      {skillCategories.map((cat) => (
        <div key={cat.title} className={styles.category}>
          <CategoryHead category={cat} />

          <div className={styles.grid}>
            {cat.tiles.map((tile) => (
              <SkillCard key={tile.name} tile={tile} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
