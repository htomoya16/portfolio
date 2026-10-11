import clsx from 'clsx'
import ScrambleText from '@/components/animation/ScrambleText'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  number: string
  title: string
  blink?: boolean
  /** 下の余白をなくす（横に別の要素を並べるとき） */
  compact?: boolean
  className?: string
}

/** セクションの見出し。Section が data-section-heading を目印に登場演出をかける */
export default function SectionHeading({ number, title, blink = false, compact = false, className }: SectionHeadingProps) {
  return (
    <div className={clsx(styles.head, compact && styles.compact, className)} data-section-heading>
      <ScrambleText
        as="span"
        className={styles.num}
        text={number}
        pattern="braille"
        revealRate={34}
        settleDuration={360}
        replayOnHover={true}
      />
      <h2 className={styles.title}>
        <ScrambleText
          as="span"
          text={title}
          pattern="title"
          delay={120}
          revealRate={28}
          settleDuration={520}
          replayOnHover={true}
        />
        <span className={clsx(styles.accent, blink && styles.blink)} />
      </h2>
    </div>
  )
}
