'use client'

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
        CRAFTED WITH CODE &amp; PIXEL
      </div>
      <button className="back-top" onClick={handleBackToTop} type="button" aria-label="Scroll back to top">
        <span className="arrow-box" aria-hidden="true">↑</span>
        BACK TO TOP
      </button>
    </footer>
  )
}
