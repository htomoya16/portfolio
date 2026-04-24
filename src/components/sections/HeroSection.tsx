'use client'

import { DiagTicks, DiagSlash, PixStar, PixPlus, PixDiamond, PixelDotBlock } from '@/components/ui/Decor'

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero-right-bg" />

      {/* diagonal tick decor */}
      <div style={{ position: 'absolute', top: '22%', left: '46%', zIndex: 1, opacity: 0.9 }}>
        <DiagTicks width={70} height={24} count={4} color="#D7FF00" />
      </div>
      <div style={{ position: 'absolute', top: '70%', left: '52%', zIndex: 1, opacity: 0.85, transform: 'scaleX(-1)' }}>
        <DiagTicks width={80} height={28} count={5} color="#2547E6" />
      </div>
      <DiagSlash length={90} thickness={1.5} color="#2547E6" style={{ top: '12%', right: '6%' }} />
      <DiagSlash length={70} thickness={1.5} color="#D7FF00" style={{ bottom: '20%', left: '40%' }} />

      {/* floating pixel decorations */}
      <div style={{ position: 'absolute', top: '18%', right: '22%', zIndex: 2, animation: 'float 4s ease-in-out infinite' }}>
        <PixStar size={18} color="#D7FF00" />
      </div>
      <div style={{ position: 'absolute', top: '36%', right: '7%', zIndex: 2, animation: 'float 5s ease-in-out infinite 0.8s' }}>
        <PixPlus size={14} color="#2547E6" />
      </div>
      <div style={{ position: 'absolute', bottom: '28%', right: '12%', zIndex: 2, animation: 'float 6s ease-in-out infinite 1.2s' }}>
        <PixStar size={14} color="#2547E6" />
      </div>
      <div style={{ position: 'absolute', top: '58%', left: '50%', zIndex: 2, animation: 'float 4.5s ease-in-out infinite 0.5s' }}>
        <PixDiamond size={12} color="#F72585" />
      </div>
      <div style={{ position: 'absolute', bottom: '18%', left: '48%', zIndex: 2, animation: 'float 5.5s ease-in-out infinite 1.5s' }}>
        <PixPlus size={10} color="#D7FF00" />
      </div>

      {/* corner bracket & pixel frames */}
      <div className="corner-bracket tr" style={{ top: 90, right: 110, width: 28, height: 28 }} />
      <div className="pixel-frame" style={{ top: 90, right: 140, width: 60, height: 70 }} />
      <div className="pixel-frame" style={{ top: 180, right: 80, width: 40, height: 50 }} />
      <div className="pixel-frame" style={{ bottom: 150, right: 200, width: 50, height: 40 }} />
      <div className="pixel-frame" style={{ bottom: 220, left: '46%', width: 36, height: 50 }} />

      {/* dot grids */}
      <div className="dot-grid" style={{ top: 210, left: '48%', width: 60, height: 40, opacity: 0.5, zIndex: 1 }} />
      <div className="dot-grid" style={{ bottom: 90, right: 60, width: 90, height: 50, opacity: 0.55, zIndex: 1 }} />
      <div className="dot-grid" style={{ top: 120, right: 300, width: 60, height: 30, opacity: 0.5, zIndex: 1 }} />

      {/* accent squares */}
      <div style={{ position: 'absolute', top: '30%', right: '18%', width: 10, height: 10, background: '#D7FF00', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: '55%', left: '48%', width: 8, height: 8, background: '#D7FF00', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: '25%', right: '36%', width: 8, height: 8, background: '#2547E6', zIndex: 2 }} />
      <div className="corner-bracket br" style={{ bottom: 60, right: 60, width: 40, height: 40 }} />

      {/* hero content */}
      <div className="hero-content">
        <div className="hero-eyebrow mono">WEB ENGINEER</div>
        <h1 className="hero-title">
          <span className="line">CODE.</span>
          <span className="line">CREATE.</span>
          <span className="line">
            <span className="blue">LEVEL UP.</span>
            <span className="caret" />
          </span>
        </h1>
        <p className="hero-sub">
          コードで、アイデアをカタチにして、<br />
          ユーザーの体験をアップデートする。
        </p>
        <button
          className="btn-primary"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          VIEW MY WORK
          <svg width="48" height="10" viewBox="0 0 48 10" fill="none">
            <path d="M1 5H46M46 5L42 1M46 5L42 9" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>

      {/* hero visual */}
      <div className="hero-visual">
        <div className="hero-label-100 mono">— 100</div>
        <div className="controller-scene">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/controller.png" className="px-controller" alt="pixel controller" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/alien.png"      className="px-sprite s-invader" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/heart.png"      className="px-sprite s-heart" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/trophy.png"     className="px-sprite s-coin" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/gem.png"        className="px-sprite s-gem" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/sword.png"      className="px-sprite s-sword" alt="" />
        </div>
        <div className="hero-play">
          PLAY
          <span className="tri" />
        </div>
      </div>
    </section>
  )
}
