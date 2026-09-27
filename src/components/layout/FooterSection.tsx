'use client'

export default function FooterSection({ version }: { version: string }) {
  const currentYear = new Date().getFullYear()

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <span className="footer-left">© {currentYear} htomoya16</span>
      <div className="footer-mid">
        <span className="bullet">■</span>
        ver. {version}
      </div>
      <button className="back-top" onClick={handleBackToTop} type="button" aria-label="Scroll back to top">
        <span className="arrow-box" aria-hidden="true">↑</span>
        BACK TO TOP
      </button>
    </footer>
  )
}
