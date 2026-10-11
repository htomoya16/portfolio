'use client'

import { useRef } from 'react'
import { cancelScramble, playScramble } from '@/components/animation/scramble'
import { useHover } from '@/components/animation/useHover'
import { navLinks } from '@/content/site/navigation'
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap } from '@/lib/gsap'
import { toggleTerminalFx } from '@/lib/screenFx'
import styles from './NavBar.module.css'
import NavProgressBar from './NavProgressBar'

const LOGO_TEXT = '// htomoya16'
/** ロゴを短時間に何回踏んだらターミナルテーマが開くか。 */
const LOGO_COMBO = 5
/** 連打とみなす間隔（ms）。 */
const LOGO_COMBO_WINDOW = 1200
/** かき混ぜ中の DOM の変化で pointerenter が誤って再発火するのを防ぐだけの短い間隔（ms） */
const LOGO_RETRIGGER_GUARD = 150

function NavLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  useHover(
    ref,
    (el) => playScramble(el, label, { pattern: 'braille', revealRate: 52, settleDuration: 260 }),
    (el) => cancelScramble(el, label),
  )
  return <a ref={ref} href={href}>{label}</a>
}

export default function NavBar() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const countRef = useRef(0)
  const lastClickRef = useRef(0)
  const lastEnterRef = useRef(0)

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const now = Date.now()
    countRef.current = (now - lastClickRef.current < LOGO_COMBO_WINDOW ? countRef.current : 0) + 1
    lastClickRef.current = now

    if (countRef.current >= LOGO_COMBO) {
      countRef.current = 0
      toggleTerminalFx()
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ホバーで青く光らせてかき混ぜる。離れても途中で止めず最後まで再生し、乗せ直したら最初からやり直す
  const handleLogoEnter = (logo: HTMLAnchorElement) => {
    if (getPrefersReducedMotion()) return
    const now = Date.now()
    if (now - lastEnterRef.current < LOGO_RETRIGGER_GUARD) return
    lastEnterRef.current = now
    playScramble(logo, LOGO_TEXT, { pattern: 'title', revealRate: 38, settleDuration: 440 })
    gsap.to(logo, {
      color: 'var(--blue)',
      textShadow: '0 0 18px rgba(67,103,255,0.7)',
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleLogoLeave = (logo: HTMLAnchorElement) => {
    if (getPrefersReducedMotion()) return
    gsap.to(logo, {
      color: 'var(--ink)',
      textShadow: 'none',
      duration: 0.5,
      delay: 0.2,
      ease: 'power2.in',
      overwrite: 'auto',
    })
  }

  useHover(logoRef, handleLogoEnter, handleLogoLeave)
  useHideOnScroll(navRef)

  return (
    <nav className={styles.nav} ref={navRef}>
      <NavProgressBar />
      <a
        ref={logoRef}
        href="#"
        className={styles.logo}
        onClick={handleLogoClick}
        onPointerDown={(e) => cancelScramble(e.currentTarget, LOGO_TEXT)}
      >
        {LOGO_TEXT}
      </a>
      <ul className={styles.links}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
