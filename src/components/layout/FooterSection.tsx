'use client'

/** next.config.ts がビルド時に埋め込む日付（日本時間, YYYY.MM.DD）。 */
const BUILD_DATE = process.env.BUILD_DATE

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
        ver. {BUILD_DATE}
      </div>
      <button className="back-top" onClick={handleBackToTop} type="button" aria-label="Scroll back to top">
        BACK TO TOP
        <span className="arrow" aria-hidden="true">↑</span>
      </button>
    </footer>
  )
}
