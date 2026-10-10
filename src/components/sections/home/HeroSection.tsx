'use client'

import { useEffect, useRef } from 'react'

import ScrambleText from '@/components/animation/ScrambleText'
import SideRails from '@/components/layout/SideRails'
import { PET_LAYER_ID } from '@/components/pet/NegiSystem'
import { heroCopy, heroTickerSequence } from '@/content/site/hero'
import { pickHeroBackground } from '@/lib/heroBackground'

export default function HeroSection() {
  const panelRef = useRef<HTMLDivElement>(null)

  // 背景画像はマウント後に決める。SSR 時に確定させるとハイドレーション不一致になるため。
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    // ローディング画面が先読みしているものと同じ画像を使う
    el.style.setProperty('--hero-bg-image', `url(${pickHeroBackground()})`)
  }, [])

  const handleScrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // heroTickerSequence は half を 2 回繰り返した並び。CSS の -50% ループと対応する。
  const tickerItems = heroTickerSequence

  return (
    <section className="hero" id="hero">
      <SideRails />

      {/* right background panel */}
      <div className="hero-right-bg" aria-hidden="true" ref={panelRef}>
        <div className="hero-right-veil" />
      </div>

      {/* Hero SVG decorations — マージン帯のみ（コンテンツと重ならない） */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/decor/decor_sparkle_diamond_blue.svg" alt="" className="bg-decor" width={34}
          style={{ position: 'absolute', top: '4%', left: '2%', opacity: 0.40 }} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/decor/decor_dot_grid_8x6_blue.svg" alt="" className="bg-decor" width={78}
          style={{ position: 'absolute', top: '3%', right: '2%', opacity: 0.24 }} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/decor/decor_small_cross_navy.svg" alt="" className="bg-decor" width={26}
          style={{ position: 'absolute', bottom: '4%', left: '2%', opacity: 0.30 }} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/decor/plus_cyan.svg" alt="" className="bg-decor" width={22}
          style={{ position: 'absolute', bottom: '4%', right: '2%', opacity: 0.36 }} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/decor/decor_slash_logo_marks.svg" alt="" className="bg-decor" width={68}
          style={{ position: 'absolute', top: '44%', left: '1%', opacity: 0.20 }} draggable={false} />
      </div>

      {/* hero content */}
      <div className="hero-content">
        <ScrambleText
          as="p"
          className="hero-eyebrow"
          text={heroCopy.eyebrow}
          pattern="braille"
          revealRate={36}
          settleDuration={420}
          replayOnHover={false}
        />
        <h1 className="hero-title">
          {heroCopy.titleLines.map((line, index) => (
            <span className="line" key={line.text}>
              <ScrambleText
                as="span"
                className={line.accent ? 'blue' : undefined}
                text={line.text}
                pattern="title"
                delay={160 + index * 100}
                revealRate={30}
                settleDuration={520}
                replayOnHover={false}
              />
              {index === heroCopy.titleLines.length - 1 && <span className="caret" aria-hidden="true" />}
            </span>
          ))}
        </h1>
        {/* btn-primary: plain text, no scramble */}
        <button className="btn-primary" onClick={handleScrollToProjects} type="button">
          {heroCopy.primaryCta}
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            <path d="M13 1L19 7L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="1" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ピクセルペット「ネギ」の走査領域。中身は NegiSystem が portal で流し込む。 */}
      <div className="negi-layer" id={PET_LAYER_ID} aria-hidden="true" />

      {/* play button — plain label */}
      <button
        className="hero-play-center"
        onClick={handleScrollToAbout}
        type="button"
        aria-label={heroCopy.scrollToAboutLabel}
      >
        <div className="play-circle">
          <div className="tri" aria-hidden="true" />
        </div>
        <span className="play-label">{heroCopy.playCta}</span>
      </button>

      {/* ticker — 4× duplicate, plain text for stable width */}
      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-inner">
          {tickerItems.map((item, i) => (
            <span key={i} className={`item${item.accent ? ' accent' : ''}`}>
              <span className="bullet">■</span>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
