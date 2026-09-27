'use client'

import { useRef } from 'react'

import NavProgressBar from './NavProgressBar'
import { TERMINAL_TOGGLE_EVENT } from '@/components/pet/NegiSystem'
import { navLinks } from '@/content/site/navigation'

/** ロゴを短時間に何回踏んだらターミナルテーマが開くか。 */
const LOGO_COMBO = 5
/** 連打とみなす間隔（ms）。 */
const LOGO_COMBO_WINDOW = 1200

export default function NavBar() {
  const countRef = useRef(0)
  const lastRef = useRef(0)

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const now = Date.now()
    countRef.current = (now - lastRef.current < LOGO_COMBO_WINDOW ? countRef.current : 0) + 1
    lastRef.current = now

    if (countRef.current >= LOGO_COMBO) {
      countRef.current = 0
      window.dispatchEvent(new CustomEvent(TERMINAL_TOGGLE_EVENT))
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="nav">
      <NavProgressBar />
      <a href="#" className="logo" onClick={handleLogoClick}>{'// htomoya16'}</a>
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
