import type { ReactNode } from 'react'
import { DiagSlash, PixStar, PixDiamond, PixPlus, PixelDotBlock } from '@/components/ui/Decor'
import { TIMELINE, type TimelineEntry } from '@/content/site/timeline'

const TLIcons: Record<TimelineEntry['iconKey'], ReactNode> = {
  cap: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2547E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  code: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2547E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  trophy: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2547E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0012 0V2z"/>
    </svg>
  ),
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="timeline-item">
      <div className="brackets">
        <span className="cb tl" /><span className="cb tr" />
        <span className="cb bl" /><span className="cb br" />
      </div>
      <div className="timeline-icon">{TLIcons[entry.iconKey]}</div>
      <div className="timeline-date mono">{entry.date}</div>
      <div className="timeline-text">{entry.text}</div>
      <div className="timeline-plus">+</div>
    </div>
  )
}

export function AboutSection() {
  return (
    <section className="section about" id="about">
      <DiagSlash length={80} thickness={1.5} color="#2547E6" style={{ top: '8%', right: '8%' }} />
      <DiagSlash length={60} thickness={1.5} color="#D7FF00" style={{ bottom: '14%', left: '6%' }} />
      <div style={{ position: 'absolute', top: '12%', right: '14%', zIndex: 1 }}>
        <PixStar size={18} color="#D7FF00" />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', left: '8%', zIndex: 1, animation: 'float 5s ease-in-out infinite' }}>
        <PixDiamond size={14} color="#F72585" />
      </div>
      <div style={{ position: 'absolute', top: '30%', right: '6%', zIndex: 1, animation: 'float 4s ease-in-out infinite 1s' }}>
        <PixPlus size={12} color="#2547E6" />
      </div>
      <div style={{ position: 'absolute', bottom: '8%', right: '40%', zIndex: 1 }}>
        <PixelDotBlock cols={6} rows={3} gap={7} color="#2547E6" />
      </div>

      <div className="about-left">
        <div className="section-num mono">01</div>
        <h2 className="section-title">ABOUT</h2>
        <span className="about-accent-dash" />
        <div>
          <p className="about-tagline">
            課題を技術で解決し、<br />
            より良い体験をつくるエンジニアです。
          </p>
          <div className="about-body">
            大学では情報工学を専攻し、Web開発を中心に学習。<br />
            ユーザー視点を大切にしながら、設計から実装、改善まで<br />
            一貫して取り組んでいます。<br />
            新しい技術のキャッチアップと、ものづくりが好きです。
          </div>
        </div>
      </div>

      <div className="timeline">
        {TIMELINE.map(entry => (
          <TimelineItem key={entry.date} entry={entry} />
        ))}
      </div>

      <div className="about-bottom-dots" />
    </section>
  )
}
