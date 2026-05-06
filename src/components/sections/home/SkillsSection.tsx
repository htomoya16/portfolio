// Server component
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { skillCategories, skillLevelDefinitions, skillsCopy } from '@/content/site/skills'
import type { SkillTile } from '@/content/site/skills'

type SkillLevelStyle = CSSProperties & {
  '--skill-level': number
}

function formatLevel(level: number) {
  return Number.isInteger(level) ? level.toFixed(0) : level.toFixed(1)
}

function levelTone(level: number) {
  if (level >= 3.5) return 'high'
  if (level >= 3) return 'mid'
  if (level >= 2) return 'base'
  return 'low'
}

function getInitials(name: string) {
  return name
    .split(/\s+|\//)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function SkillCard({ tile }: { tile: SkillTile }) {
  const style: SkillLevelStyle = { '--skill-level': tile.level }

  return (
    <div className={`sk-tile sk-level-${levelTone(tile.level)}`} style={style} data-level={tile.level}>
      <div className="sk-tile-main">
        <span className="sk-tile-icon" aria-hidden="true">
          {tile.iconSrc ? (
            <Image className="sk-tile-icon-img" src={tile.iconSrc} alt="" width={32} height={32} />
          ) : (
            <span className="sk-tile-icon-fallback">{getInitials(tile.name)}</span>
          )}
        </span>
        <span className="sk-tile-body">
          <span className="sk-tile-top">
            <span className="sk-tile-name">{tile.name}</span>
            <span className="sk-tile-score" aria-label={`Level ${formatLevel(tile.level)} out of 5`}>
              Lv.{formatLevel(tile.level)}
            </span>
          </span>
          <span className="sk-level-track" aria-hidden="true">
            <span className="sk-level-fill" />
          </span>
        </span>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section className="skills" id="skills">
      <Atmo variant="b" tone="cool" />

      <div className="skills-wrap">
        <SectionHeading number={skillsCopy.sectionNumber} title={skillsCopy.sectionTitle} blink />

        <div className="skills-intro-grid">
          <div className="skills-overview">
            <p className="skills-kicker">{skillsCopy.kicker}</p>
            <p className="skills-lead">{skillsCopy.lead}</p>
          </div>

          <div className="skills-level-column">
            <div className="skills-level-guide" aria-label={skillsCopy.levelGuideLabel}>
              {skillLevelDefinitions.map((item) => (
                <div key={item.level} className={`sk-guide-item sk-guide-lv${item.level}`}>
                  <span className="sk-guide-level">Lv.{item.level}</span>
                  <span className="sk-guide-label">{item.label}</span>
                  <span className="sk-guide-line" aria-hidden="true" />
                </div>
              ))}
            </div>
            <p className="skills-note">
              <Image className="skills-note-icon" src="/assets/icons/misc/info-circle.svg" alt="" width={16} height={16} aria-hidden="true" />
              <span>{skillsCopy.note}</span>
            </p>
          </div>
        </div>

        <div className="skills-list">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="sk-cat">
              <div className="sk-cat-head">
                <div className="sk-cat-marker" aria-hidden="true">
                  <Image className="sk-cat-marker-img" src={cat.iconSrc} alt="" width={24} height={24} />
                </div>
                <span className="sk-cat-title">{cat.title}</span>
                <div className="sk-cat-rule" />
                <span className="sk-cat-count">{String(cat.tiles.length).padStart(2, '0')} {skillsCopy.countSuffix}</span>
              </div>

              <div className="sk-cat-grid">
                {cat.tiles.map((tile) => (
                  <SkillCard key={tile.name} tile={tile} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
