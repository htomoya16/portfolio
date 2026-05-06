'use client'

import ScrambleText from '@/components/animation/ScrambleText'
import SideRails from '@/components/layout/SideRails'
import { heroCopy, heroTickerItems } from '@/content/site/hero'

export default function HeroSection() {
  const handleScrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Duplicate 4× for seamless loop with no cutoff
  const tickerItems = [...heroTickerItems, ...heroTickerItems, ...heroTickerItems, ...heroTickerItems]

  return (
    <section className="hero" id="hero">
      <SideRails />

      {/* right background panel */}
      <div className="hero-right-bg" aria-hidden="true" />

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
        <p className="hero-sub">
          {heroCopy.subtitleLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < heroCopy.subtitleLines.length - 1 && <br />}
            </span>
          ))}
        </p>
        {/* btn-primary: plain text, no scramble */}
        <button className="btn-primary" onClick={handleScrollToProjects} type="button">
          {heroCopy.primaryCta}
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            <path d="M13 1L19 7L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="1" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* hero visual */}
      <div className="hero-visual">
        <div className="controller-scene">
          {/* HP bar — hover effects handled by MotionProvider */}
          <div className="hero-hp" aria-label={heroCopy.hpAriaLabel}>
            <span className="hp-label">{heroCopy.hpLabel}</span>
            <div className="hp-bar">
              <div className="hp-fill" />
            </div>
            <span className="hp-num">{heroCopy.hpValue}</span>
          </div>

          {/* label — plain text, was 100%% bug */}
          <span className="hero-label-100" aria-hidden="true">{heroCopy.visualPercent}</span>

          {/* main controller */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/controller.png"
            alt="pixel controller"
            className="px-controller"
          />

          {/* floating sprites */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/alien.png" alt="" className="px-sprite s-invader" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/heart.png" alt="" className="px-sprite s-heart" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/trophy.png" alt="" className="px-sprite s-coin" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/gem.png" alt="" className="px-sprite s-gem" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/sword.png" alt="" className="px-sprite s-sword" />
        </div>
      </div>

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
