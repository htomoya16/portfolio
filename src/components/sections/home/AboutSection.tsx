'use client'

import ScrambleText from '@/components/animation/ScrambleText'
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import gsap from 'gsap'
import { useRef } from 'react'

const aboutCards = [
  {
    date: '2022.04',
    title: '情報工学部 入学 / プログラミング学習開始',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="1" y="4" width="20" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 9L5 11L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 9L17 11L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    date: '2023.04',
    title: '個人開発 / OSS コントリビュート開始',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 7V11L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    date: '2023.09',
    title: 'ハッカソン参加 / 優秀賞受賞',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2L13.5 8H20L14.5 12L16.5 18L11 14L5.5 18L7.5 12L2 8H8.5L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    date: '2024.04',
    title: 'Webエンジニアインターン 参画中',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="18" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 6V5C7 3.89 7.89 3 9 3H13C14.11 3 15 3.89 15 5V6" stroke="currentColor" strokeWidth="1.5" />
        <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export default function AboutSection() {
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const dividerRef = useRef<HTMLDivElement | null>(null)

  const handleCardEnter = (i: number) => {
    const indicator = indicatorRef.current
    const card = cardRefs.current[i]
    const divider = dividerRef.current
    if (!indicator || !card || !divider) return

    const cardRect = card.getBoundingClientRect()
    const divRect = divider.getBoundingClientRect()
    const cardCenterY = cardRect.top + cardRect.height / 2
    const indicatorY = cardCenterY - divRect.top - 8 // center of 16px indicator

    gsap.to(indicator, { top: indicatorY, opacity: 1, duration: 0.35, ease: 'power3.out' })
  }

  const handleCardLeave = () => {
    const indicator = indicatorRef.current
    if (!indicator) return
    gsap.to(indicator, { opacity: 0, duration: 0.2, ease: 'power2.in' })
  }

  return (
    <section className="about" id="about">
      <Atmo variant="a" tone="cool" />

      <SectionHeading number="// 01" title="ABOUT" blink />

      <div className="about-grid">
        {/* left — bio text */}
        <div>
          <p className="about-tagline">
            コードで、<br />
            アイデアをカタチにして、<br />
            ユーザーの体験をアップデートする。
          </p>
          <div className="about-body">
            <p>
              情報工学部に在籍する学生エンジニアです。
              HTML/CSS から始まり、JavaScript、React、Next.js へと
              フロントエンド中心にスタックを習得してきました。
            </p>
            <p>
              現在はWebエンジニアとしてインターンに参加し、
              実プロダクトの開発に携わっています。
              ハッカソンへの参加、技術勉強会への登壇経験もあります。
            </p>
            <p>
              ゲームのように「クリアすべき課題」に向き合い、
              ユーザー体験を一段階アップデートすることが
              私のエンジニアリングの目標です。
            </p>
          </div>
        </div>

        {/* center divider with sliding indicator */}
        <div className="about-divider" ref={dividerRef} aria-hidden="true">
          <div className="ab-div-sq top" />
          {/* sliding indicator */}
          <div className="ab-div-indicator" ref={indicatorRef} />
          <div className="ab-div-sq bot" />
        </div>

        {/* right — stat cards */}
        <div className="about-stats">
          {aboutCards.map((card, i) => (
            <div
              key={i}
              className="about-card"
              ref={(el) => { cardRefs.current[i] = el }}
              onPointerEnter={() => handleCardEnter(i)}
              onPointerLeave={handleCardLeave}
            >
              <span className="ab-cb tl" />
              <span className="ab-cb tr" />
              <span className="ab-cb bl" />
              <span className="ab-cb br" />
              <div className="about-card-icon">{card.icon}</div>
              <div className="about-card-body">
                <span className="about-card-date">{card.date}</span>
                <ScrambleText as="span" className="about-card-title" text={card.title} revealRate={24} settleDuration={520} replayOnHover={true} />
              </div>
              <div className="about-card-plus" aria-hidden="true">
                <span />
                <span />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
