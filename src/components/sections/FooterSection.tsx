'use client'

export default function FooterSection() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <span className="footer-left">© 2024 htomoya16</span>
      <div className="footer-mid">
        <span className="bullet">■</span>
        <span>CRAFTED WITH CODE &amp; PIXEL</span>
      </div>
      <button className="back-top" onClick={handleBackToTop} type="button" aria-label="Scroll back to top">
        <span className="arrow-box" aria-hidden="true">↑</span>
        BACK TO TOP
      </button>
    </footer>
  )
}
