'use client'

export function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer-left">© 2024 Yamada Ao</div>
      <button
        className="back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        BACK TO TOP
        <span className="arrow-box">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M5 11V1M5 1L1 5M5 1L9 5" stroke="#fff" strokeWidth="1.4"/>
          </svg>
        </span>
      </button>
    </footer>
  )
}
