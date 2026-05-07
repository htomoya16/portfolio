// Server component
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { contactCopy, contactLinks, contactStats } from '@/content/site/contact'
import Image from 'next/image'

function ContactIcon({ type, icon }: { type: string; icon?: string }) {
  if (icon) {
    return (
      <Image
        className={`ct-card-icon-img is-${type}`}
        src={icon}
        width={36}
        height={36}
        alt=""
        aria-hidden="true"
      />
    )
  }

  if (type === 'pinterest') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2C6.03 2 2 6.03 2 11C2 14.9 4.43 18.22 7.86 19.5C7.81 19.14 7.76 18.56 7.87 18.14L8.82 14.09C8.82 14.09 8.56 13.58 8.56 12.82C8.56 11.62 9.28 10.72 10.17 10.72C10.93 10.72 11.29 11.29 11.29 11.98C11.29 12.74 10.8 13.89 10.54 14.95C10.32 15.83 10.98 16.55 11.85 16.55C13.44 16.55 14.65 14.78 14.65 12.22C14.65 9.95 13.03 8.38 10.73 8.38C8.07 8.38 6.5 10.37 6.5 12.43C6.5 13.2 6.79 14.04 7.15 14.48C7.22 14.57 7.23 14.64 7.2 14.73L6.89 15.98C6.85 16.13 6.76 16.17 6.6 16.1C5.47 15.58 4.75 13.86 4.75 12.38C4.75 9.44 6.87 6.74 11 6.74C14.34 6.74 16.93 9.11 16.93 12.17C16.93 15.36 14.86 17.91 11.97 17.91C11.07 17.91 10.22 17.44 9.94 16.9L9.28 19.38C9.04 20.27 8.4 21.39 7.98 22C8.97 22.3 10.02 22.46 11.1 22.46C16.07 22.46 20.1 18.43 20.1 11.46C20.1 6.03 16.07 2 11 2Z" fill="currentColor" />
      </svg>
    )
  }

  if (type === 'github') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 0C4.925 0 0 4.925 0 11C0 15.87 3.147 19.988 7.523 21.436C8.073 21.535 8.275 21.203 8.275 20.918C8.275 20.664 8.263 19.788 8.263 18.857C5.5 19.35 4.785 18.128 4.565 17.49C4.44 17.165 3.905 16.15 3.437 15.895C3.052 15.695 2.502 15.202 3.424 15.19C4.29 15.177 4.907 15.962 5.115 16.3C6.105 17.98 7.688 17.528 8.317 17.248C8.415 16.533 8.7 16.068 9.01 15.802C6.545 15.535 3.97 14.575 3.97 10.378C3.97 9.183 4.44 8.195 5.143 7.425C5.033 7.158 4.61 6.033 5.253 4.528C5.253 4.528 6.182 4.248 8.275 5.665C9.155 5.422 10.09 5.3 11.025 5.3C11.96 5.3 12.895 5.422 13.775 5.665C15.868 4.235 16.797 4.528 16.797 4.528C17.44 6.033 17.017 7.158 16.907 7.425C17.61 8.195 18.08 9.17 18.08 10.378C18.08 14.588 15.493 15.535 13.028 15.802C13.42 16.135 13.755 16.775 13.755 17.77C13.755 19.19 13.743 20.335 13.743 20.918C13.743 21.203 13.945 21.548 14.495 21.436C18.847 19.988 22 15.857 22 11C22 4.925 17.075 0 11 0Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (type === 'mail') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M20 4H2C1.45 4 1 4.45 1 5V17C1 17.55 1.45 18 2 18H20C20.55 18 21 17.55 21 17V5C21 4.45 20.55 4 20 4Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 5L11 12L21 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M16 2H6C4.895 2 4 2.895 4 4V20L8 17L11 20L14 17L18 20V4C18 2.895 17.105 2 16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="8" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="11" x2="12" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function ContactSection() {
  return (
    <section className="contact" id="contact">
      <Atmo variant="e" tone="warm" />

      <div className="contact-grid">
        {/* left */}
        <div className="contact-left">
          <div className="contact-status" aria-label={contactCopy.statusLabel}>
            <span className="dot" />
            {contactCopy.statusText}
          </div>

          <SectionHeading number={contactCopy.sectionNumber} title={contactCopy.sectionTitle} blink />

          <p className="contact-lead">
            {contactCopy.leadLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < contactCopy.leadLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p className="contact-body">
            {contactCopy.bodyLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < contactCopy.bodyLines.length - 1 && <br />}
              </span>
            ))}
          </p>

          {/* stats — plain text, bar starts at 0 width, MotionProvider animates on hover */}
          <div className="ct-stats">
            {contactStats.map((stat) => (
              <div key={stat.label} className="ct-stat-row" data-pct={stat.pct} data-display={stat.display}>
                <span className="ct-stat-label mono">{stat.label}</span>
                <span className="ct-stat-bar">
                  <span className="ct-stat-bar-fill" style={{ width: 0 }} />
                </span>
                <span className="ct-stat-num mono">{stat.display}</span>
              </div>
            ))}
          </div>

          <span className="ct-prompt mono">
            {contactCopy.prompt}
            <span className="caret-blink" aria-hidden="true" />
          </span>
        </div>

        {/* right */}
        <div className="contact-cards">
          {contactLinks.map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="ct-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ct-cb tl" />
              <span className="ct-cb tr" />
              <span className="ct-cb bl" />
              <span className="ct-cb br" />
              <div className="ct-card-dot" aria-hidden="true" />
              <div className="ct-card-icon">
                <ContactIcon type={card.type} icon={'icon' in card ? card.icon : undefined} />
              </div>
              <div>
                {/* plain text — MotionProvider scrambles on ct-card hover */}
                <div className="ct-card-label mono">{card.label}</div>
                <div className="ct-card-handle">{card.handle}</div>
              </div>
              <span className="ct-card-arrow mono" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>

    </section>
  )
}
