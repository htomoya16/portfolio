'use client'

import styles from './FooterSection.module.css'

/** next.config.ts がビルド時に埋め込む日付（日本時間, YYYY.MM.DD）。 */
const BUILD_DATE = process.env.BUILD_DATE

export default function FooterSection() {
  const currentYear = new Date().getFullYear()

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>© {currentYear} htomoya16</span>
      <div className={styles.version}>
        <span className={styles.bullet}>■</span>
        ver. {BUILD_DATE}
      </div>
      <button className={styles.backTop} onClick={handleBackToTop} type="button" aria-label="Scroll back to top">
        BACK TO TOP
        <span className={styles.arrow} aria-hidden="true">↑</span>
      </button>
    </footer>
  )
}
