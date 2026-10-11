import Atmo from '@/components/decor/Atmo'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { contactCopy } from '@/content/site/contact'
import { getGitHubStats } from '@/lib/github-stats'
import styles from './Contact.module.css'
import ContactCards from './ContactCards'
import ContactStats, { type ContactStat } from './ContactStats'

export default async function ContactSection() {
  const gh = await getGitHubStats()

  // GitHub から取得できなかったときは目安の値を出す
  const stats: ContactStat[] = [
    {
      label: 'COMMITS',
      pct: gh ? Math.min(Math.round(gh.totalContributions / 15), 100) : 80,
      display: gh ? String(gh.totalContributions) : '500+',
    },
    {
      label: 'REPOS',
      pct: gh ? Math.min(gh.publicRepos * 5, 100) : 60,
      display: gh ? String(gh.publicRepos) : '8',
    },
    {
      label: 'STREAK',
      pct: gh ? Math.min(gh.longestStreak, 100) : 40,
      display: gh ? `${gh.longestStreak}d` : '—',
    },
  ]

  return (
    <Section id="contact" className={styles.contact}>
      <Atmo variant="e" tone="warm" />

      <div className={styles.head}>
        <SectionHeading number={contactCopy.sectionNumber} title={contactCopy.sectionTitle} blink />
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.status} aria-label={contactCopy.statusLabel}>
            <span className={styles.statusDot} />
            {contactCopy.statusText}
          </div>

          <ContactStats stats={stats} />

          <span className={styles.prompt}>
            {contactCopy.prompt}
            <span className={styles.caret} aria-hidden="true" />
          </span>
        </div>

        <ContactCards />
      </div>
    </Section>
  )
}
