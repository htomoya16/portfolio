import ScrambleText from '@/components/animation/ScrambleText'

interface SectionHeadingProps {
  number: string
  title: string
  blink?: boolean
  className?: string
}

export default function SectionHeading({ number, title, blink = false, className }: SectionHeadingProps) {
  return (
    <div className={`section-head${className ? ` ${className}` : ''}`}>
      <ScrambleText
        as="span"
        className="section-num"
        text={number}
        chars="symbols"
        from="left"
        revealRate={34}
        settleDuration={360}
      />
      <h2 className="section-title">
        {title}
        <span className={`accent${blink ? ' blink' : ''}`} />
      </h2>
    </div>
  )
}
