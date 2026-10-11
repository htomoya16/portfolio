'use client'

import { useRef } from 'react'
import { cancelScramble, playScramble } from '@/components/animation/scramble'
import { useHover } from '@/components/animation/useHover'
import CornerBrackets from '@/components/ui/CornerBrackets'
import { contactLinks } from '@/content/site/contact'
import styles from './Contact.module.css'
import ContactIcon from './ContactIcon'

function ContactCard({ card }: { card: (typeof contactLinks)[number] }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  useHover(
    cardRef,
    () => playScramble(labelRef.current, card.label, { pattern: 'soft', revealRate: 42, settleDuration: 300 }),
    () => cancelScramble(labelRef.current, card.label),
  )

  return (
    <a ref={cardRef} href={card.href} className={styles.card} target="_blank" rel="noopener noreferrer">
      <CornerBrackets />
      <div className={styles.cardDot} aria-hidden="true" />
      <div className={styles.cardIcon}>
        <ContactIcon type={card.type} icon={'icon' in card ? card.icon : undefined} />
      </div>
      <div>
        <div className={styles.cardLabel} ref={labelRef}>{card.label}</div>
        <div className={styles.cardHandle}>{card.handle}</div>
      </div>
      <span className={styles.cardArrow} aria-hidden="true">→</span>
    </a>
  )
}

export default function ContactCards() {
  return (
    <div className={styles.cards}>
      {contactLinks.map((card) => (
        <ContactCard key={card.label} card={card} />
      ))}
    </div>
  )
}
