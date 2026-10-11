'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import ScrambleText from '@/components/animation/ScrambleText'
import { playScramble } from '@/components/animation/scramble'
import { useHover } from '@/components/animation/useHover'
import { useMagnetic } from '@/components/animation/useMagnetic'
import DecorImages from '@/components/decor/DecorImages'
import { HERO_DECORS } from '@/components/decor/decors'
import { useDecorMotion } from '@/components/decor/useDecorMotion'
import { PET_LAYER_ID } from '@/components/pet/petLayer'
import { heroCopy, heroTickerSequence } from '@/content/site/hero'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, useGSAP } from '@/lib/gsap'
import { pickHeroBackground } from '@/lib/heroBackground'
import { onLoaderDone } from '@/lib/loaderSignal'
import styles from './Hero.module.css'
import SideRail from './SideRail'

/** 見出しにカーソルを乗せたとき、かき混ぜる単語を 1 つずつずらす間隔（ms） */
const TITLE_WORD_STAGGER = 90
/** かき混ぜ中の DOM の変化で pointerenter が誤って再発火するのを防ぐだけの短い間隔（ms） */
const TITLE_RETRIGGER_GUARD = 150

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const playRef = useRef<HTMLButtonElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const tickerInnerRef = useRef<HTMLDivElement>(null)
  const titleTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const titleLastEnterRef = useRef(0)

  useMagnetic(ctaRef)
  useMagnetic(playRef)
  useDecorMotion(decorRef, 0)

  // 背景画像はマウント後に決める。SSR 時に確定させるとハイドレーション不一致になるため。
  useEffect(() => {
    // ローディング画面が先読みしているものと同じ画像を使う
    panelRef.current?.style.setProperty('--hero-bg-image', `url(${pickHeroBackground()})`)
  }, [])

  useEffect(() => () => titleTimersRef.current.forEach(clearTimeout), [])

  useGSAP(
    () => {
      if (getPrefersReducedMotion()) return

      const bottomItems = [playRef.current, tickerRef.current]
      gsap.set([contentRef.current, ...bottomItems], { autoAlpha: 0, y: 28 })
      gsap.set(panelRef.current, { autoAlpha: 0, x: 28 })
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(contentRef.current, { autoAlpha: 1, y: 0, duration: 0.8 })
        .to(panelRef.current, { autoAlpha: 1, x: 0, duration: 0.75 }, '-=0.45')
        .to(bottomItems, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 }, '-=0.15')

      // 見出しを 1 行ずつ奥から落とす。ローディング画面の裏で終わってしまわないよう、閉じ始めてから再生する
      const titleDrop = gsap.from(titleRef.current?.children ?? [], {
        autoAlpha: 0, y: -80, rotateX: -75, skewX: 12,
        transformPerspective: 800, transformOrigin: '50% 100%',
        duration: 0.95, ease: 'back.out(1.8)', stagger: 0.1, delay: 0.1,
        paused: true,
      })
      const offLoaderDone = onLoaderDone(() => titleDrop.play())

      // スクロールに合わせてティッカーを少し早送りする
      gsap.to(tickerInnerRef.current, {
        x: '-=200',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })

      return () => offLoaderDone()
    },
    { scope: heroRef },
  )

  // 見出しにカーソルを乗せたら、単語を少しずつずらしてかき混ぜる
  useHover(titleRef, () => {
    const now = Date.now()
    if (now - titleLastEnterRef.current < TITLE_RETRIGGER_GUARD) return
    titleLastEnterRef.current = now
    const words = titleRef.current?.querySelectorAll<HTMLElement>('[data-hero-word]') ?? []
    titleTimersRef.current.forEach(clearTimeout)
    titleTimersRef.current = Array.from(words, (word, i) =>
      setTimeout(() => {
        playScramble(word, heroCopy.titleLines[i].text, { pattern: 'title', revealRate: 30, settleDuration: 520 })
      }, i * TITLE_WORD_STAGGER),
    )
  })

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      <SideRail />

      <div className={styles.rightBg} aria-hidden="true" ref={panelRef} data-hero-panel>
        <div className={styles.veil} />
      </div>

      <div className={styles.decor} aria-hidden="true" ref={decorRef}>
        <DecorImages decors={HERO_DECORS} />
      </div>

      <div className={styles.content} ref={contentRef}>
        <ScrambleText
          as="p"
          className={styles.eyebrow}
          text={heroCopy.eyebrow}
          pattern="braille"
          revealRate={36}
          settleDuration={420}
          replayOnHover={false}
        />
        <h1 className={styles.title} ref={titleRef}>
          {heroCopy.titleLines.map((line, index) => (
            <span className={styles.line} key={line.text}>
              <ScrambleText
                as="span"
                className={line.accent ? styles.accent : undefined}
                text={line.text}
                pattern="title"
                delay={160 + index * 100}
                revealRate={30}
                settleDuration={520}
                replayOnHover={false}
                data-hero-word
              />
              {index === heroCopy.titleLines.length - 1 && <span className={styles.caret} aria-hidden="true" />}
            </span>
          ))}
        </h1>
        <button className={styles.cta} ref={ctaRef} onClick={() => scrollToSection('projects')} type="button">
          {heroCopy.primaryCta}
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            <path d="M13 1L19 7L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="1" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ピクセルペット「ネギ」の走査領域。中身は NegiSystem が portal で流し込む。 */}
      <div className={styles.negiLayer} id={PET_LAYER_ID} aria-hidden="true" />

      <button
        className={styles.play}
        ref={playRef}
        onClick={() => scrollToSection('about')}
        type="button"
        aria-label={heroCopy.scrollToAboutLabel}
      >
        <div className={styles.playCircle}>
          <div className={styles.playTri} aria-hidden="true" />
        </div>
        <span className={styles.playLabel}>{heroCopy.playCta}</span>
      </button>

      {/* heroTickerSequence は同じ並びを 2 回繰り返したもの。CSS の -50% ループと対応する */}
      <div className={styles.ticker} aria-hidden="true" ref={tickerRef}>
        <div className={styles.tickerInner} ref={tickerInnerRef}>
          {heroTickerSequence.map((item, i) => (
            <span key={i} className={clsx(item.accent && styles.tickerAccent)}>
              <span className={styles.tickerBullet}>■</span>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
