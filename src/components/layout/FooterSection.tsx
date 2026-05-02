'use client'

import ScrambleText from '@/components/animation/ScrambleText'

export default function FooterSection() {
  const currentYear = new Date().getFullYear()

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <span className="footer-left">© {currentYear} htomoya16</span>
      <div className="footer-mid">
        <span className="bullet">■</span>
        <ScrambleText text="CRAFTED WITH CODE & PIXEL" chars="uppercase" revealRate={38} settleDuration={260} />
      </div>
      <button className="back-top" onClick={handleBackToTop} type="button" aria-label="Scroll back to top">
        <span className="arrow-box" aria-hidden="true">↑</span>
        <ScrambleText text="BACK TO TOP" chars="uppercase" revealRate={38} settleDuration={260} />
      </button>
    </footer>
  )
}
