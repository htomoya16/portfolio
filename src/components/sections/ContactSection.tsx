import { DiagSlash, PixStar, PixDiamond, PixPlus, PixelDotBlock } from '@/components/ui/Decor'

export function ContactSection() {
  return (
    <section className="contact" id="contact">
      <DiagSlash length={80} thickness={1.5} color="#2547E6" style={{ top: '14%', right: '10%' }} />
      <DiagSlash length={60} thickness={1.5} color="#D7FF00" style={{ bottom: '20%', left: '8%' }} />
      <div style={{ position: 'absolute', top: '20%', right: '14%', zIndex: 1, animation: 'float 4s ease-in-out infinite' }}>
        <PixStar size={18} color="#D7FF00" />
      </div>
      <div style={{ position: 'absolute', top: '60%', left: '4%', zIndex: 1, animation: 'float 5s ease-in-out infinite 0.8s' }}>
        <PixDiamond size={14} color="#F72585" />
      </div>
      <div style={{ position: 'absolute', bottom: '18%', right: '16%', zIndex: 1, animation: 'float 4.5s ease-in-out infinite 1.2s' }}>
        <PixPlus size={14} color="#2547E6" />
      </div>
      <div style={{ position: 'absolute', top: '26%', left: '6%', zIndex: 1 }}>
        <PixelDotBlock cols={5} rows={3} gap={7} />
      </div>

      <div className="contact-grid">
        <div>
          <div className="section-num mono">05</div>
          <h2 className="section-title">CONTACT <span className="accent" /></h2>
          <p className="contact-lead">ご覧いただきありがとうございます！</p>
          <p className="contact-body">ご興味をお持ちいただけたら、お気軽にご連絡ください。</p>
        </div>
        <div className="contact-buttons">
          <a className="contact-btn" href="mailto:hello@example.com">
            <div className="corners">
              <span className="cc tl" /><span className="cc tr" />
              <span className="cc bl" /><span className="cc br" />
            </div>
            <div className="contact-btn-left">
              <div className="contact-btn-icon">
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="1" y="1" width="26" height="20" rx="1"/>
                  <path d="M1 3l13 9 13-9"/>
                </svg>
              </div>
              <div className="contact-btn-label">EMAIL</div>
            </div>
            <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
              <path d="M0 5H36M36 5L32 1M36 5L32 9" stroke="#0A0E1A" strokeWidth="1.4"/>
            </svg>
          </a>
          <a className="contact-btn" href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <div className="corners">
              <span className="cc tl" /><span className="cc tr" />
              <span className="cc bl" /><span className="cc br" />
            </div>
            <div className="contact-btn-left">
              <div className="contact-btn-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .3C5.4.3 0 5.7 0 12.3c0 5.3 3.4 9.7 8.2 11.3.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6 8.2-11.3C24 5.7 18.6.3 12 .3z"/>
                </svg>
              </div>
              <div className="contact-btn-label">GITHUB</div>
            </div>
            <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
              <path d="M0 5H36M36 5L32 1M36 5L32 9" stroke="#0A0E1A" strokeWidth="1.4"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
