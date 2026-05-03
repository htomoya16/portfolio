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
        chars="░▒▓█10!%"
        from="left"
        revealRate={34}
        settleDuration={360}
        replayOnHover={false}
      />
      <h2 className="section-title">
        <ScrambleText
          as="span"
          text={title}
          chars="░▒▓█10!%"
          from="left"
          delay={120}
          revealRate={28}
          settleDuration={520}
          replayOnHover={false}
        />
        {/* accent: underbar style with blink */}
        <span className={`accent${blink ? ' blink' : ''}`} />
      </h2>
    </div>
  )
}
