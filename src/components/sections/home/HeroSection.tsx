'use client'

import ScrambleText from '@/components/animation/ScrambleText'
import SideRails from '@/components/layout/SideRails'
import { heroTickerItems } from '@/content/site/hero'

export default function HeroSection() {
  const handleScrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <SideRails />

      {/* right background panel */}
      <div className="hero-right-bg" aria-hidden="true" />

      {/* decorative corner brackets around hero-visual area */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12%',
          right: '3%',
          width: '54%',
          height: '76%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div className="corner-bracket tl" style={{ top: 0, left: 0 }} />
        <div className="corner-bracket tr" style={{ top: 0, right: 0 }} />
        <div className="corner-bracket bl" style={{ bottom: 0, left: 0 }} />
        <div className="corner-bracket br" style={{ bottom: 0, right: 0 }} />
      </div>

      {/* dot grid decoration */}
      <div
        className="dot-grid"
        aria-hidden="true"
        style={{ width: 80, height: 64, top: '18%', left: '46%', opacity: 0.4, zIndex: 1 }}
      />

      {/* pixel frame accent */}
      <div
        className="pixel-frame"
        aria-hidden="true"
        style={{ width: 56, height: 56, bottom: '22%', right: '8%', zIndex: 1 }}
      />

      {/* hero content */}
      <div className="hero-content">
        <ScrambleText as="p" className="hero-eyebrow" text="PLAYER SELECT" chars="uppercase" revealRate={36} settleDuration={420} />
        <h1 className="hero-title">
          <span className="line">
            <ScrambleText as="span" className="blue" text="CRAFT" chars="uppercase" delay={160} revealRate={30} settleDuration={520} />
          </span>
          <span className="line">
            <ScrambleText as="span" text="CODE &" chars="uppercase" delay={260} revealRate={30} settleDuration={520} />
          </span>
          <span className="line">
            <ScrambleText as="span" text="DESIGN" chars="uppercase" delay={360} revealRate={30} settleDuration={520} />
            <span className="caret" aria-hidden="true" />
          </span>
        </h1>
        <p className="hero-sub">
          コードで、アイデアをカタチにして、<br />
          ユーザーの体験をアップデートする。<br />
          Web Engineer / UI Developer
        </p>
        <button className="btn-primary" onClick={handleScrollToContact} type="button">
          <ScrambleText text="START GAME" chars="uppercase" revealRate={38} settleDuration={300} />
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            <path d="M13 1L19 7L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="1" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* hero visual */}
      <div className="hero-visual">
        <div className="controller-scene">
          {/* HP bar */}
          <div className="hero-hp" aria-label="HP bar">
            <ScrambleText as="span" className="hp-label" text="HP" chars="uppercase" revealRate={22} settleDuration={220} />
            <div className="hp-bar">
              <div className="hp-fill" />
            </div>
            <ScrambleText as="span" className="hp-num" text="83" chars="numbers" revealRate={18} settleDuration={220} />
          </div>

          {/* label */}
          <ScrambleText as="span" className="hero-label-100" aria-hidden="true" text="100%" chars="numbers" revealRate={24} settleDuration={240} />

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

      {/* play button (scroll to about) */}
      <button
        className="hero-play-center"
        onClick={handleScrollToAbout}
        type="button"
        aria-label="Scroll to about section"
      >
        <div className="play-circle">
          <div className="tri" aria-hidden="true" />
        </div>
        <ScrambleText as="span" className="play-label" text="PRESS START" chars="uppercase" revealRate={34} settleDuration={320} />
      </button>

      {/* ticker */}
      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-inner">
          {[...heroTickerItems, ...heroTickerItems].map((item, i) => (
            <span key={i} className={`item${item.accent ? ' accent' : ''}`}>
              <span className="bullet">■</span>
              <ScrambleText text={item.label} chars="uppercase" revealRate={42} settleDuration={260} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
