// Server component
import type { CSSProperties } from 'react'
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { skillCategories, skillLevelDefinitions } from '@/content/site/skills'
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

function SkillCard({ tile }: { tile: SkillTile }) {
  const style: SkillLevelStyle = { '--skill-level': tile.level }

  return (
    <div className={`sk-tile sk-level-${levelTone(tile.level)}`} style={style} data-level={tile.level}>
      <div className="sk-tile-top">
        <span className="sk-tile-name">{tile.name}</span>
        <span className="sk-tile-score" aria-label={`Level ${formatLevel(tile.level)} out of 5`}>
          {formatLevel(tile.level)}
        </span>
      </div>
      <div className="sk-level-track" aria-hidden="true">
        <span className="sk-level-fill" />
      </div>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section className="skills" id="skills">
      <Atmo variant="b" tone="cool" />

      <div className="skills-wrap">
        <SectionHeading number="// 02" title="SKILLS" blink />

        <div className="skills-intro-grid">
          <div className="skills-overview">
            <p className="skills-kicker">BACKEND-CENTERED LEARNING MAP</p>
            <p className="skills-lead">
              バックエンドを中心に学習と個人開発を進めています。全体的な経験はまだ浅く、実務経験がないため、実務レベルの設計・運用・改善判断はこれから積み上げる領域だと認識しています。特にバックエンド領域で経験を重ね、信頼できる実装力へ伸ばしていきたいです。
            </p>
            <p className="skills-note">
              レベルは下記基準に基づく自己評価です。実務経験を示すものではなく、現時点での学習・個人開発・研究での使用感を整理しています。
            </p>
          </div>

          <div className="skills-level-guide" aria-label="Skill level definitions">
            {skillLevelDefinitions.map((item) => (
              <div key={item.level} className={`sk-guide-item sk-guide-lv${item.level}`}>
                <span className="sk-guide-level">Lv.{item.level}</span>
                <span className="sk-guide-label">{item.label}</span>
                <span className="sk-guide-line" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        <div className="skills-list">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="sk-cat">
              <div className="sk-cat-head">
                <div className="sk-cat-marker" aria-hidden="true">
                  <span />
                </div>
                <span className="sk-cat-title">{cat.title}</span>
                <div className="sk-cat-rule" />
                <span className="sk-cat-count">{String(cat.tiles.length).padStart(2, '0')} SKILLS</span>
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
