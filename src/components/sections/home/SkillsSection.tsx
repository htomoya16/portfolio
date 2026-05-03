// Server component
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { ReactIcon, TailwindIcon, NodeJsIcon, VercelIcon, GitHubIcon } from '@/components/ui/TechIcons'
import { skillCategories } from '@/content/site/skills'
import type { SkillTile } from '@/content/site/skills'

// Map category title → badge icon path
const BADGE_ICONS: Record<string, string> = {
  FRONTEND: '/assets/badges/frontend-icon.svg',
  BACKEND: '/assets/badges/backend-icon.svg',
  DATABASE: '/assets/badges/database-icon.svg',
  'TOOLS  /  DEVOPS': '/assets/badges/tools-devops-icon.svg',
}

function TileIcon({ tile }: { tile: SkillTile }) {
  if (tile.iconType === 'svg') {
    if (tile.name === 'React') {
      return (
        <div className={`sk-tile-icon t-${tile.tone}`}>
          <ReactIcon size={18} />
        </div>
      )
    }
    if (tile.name === 'Tailwind CSS') {
      return (
        <div className={`sk-tile-icon t-${tile.tone}`}>
          <TailwindIcon size={18} />
        </div>
      )
    }
    if (tile.name === 'Node.js') {
      return (
        <div className={`sk-tile-icon t-${tile.tone}`}>
          <NodeJsIcon size={18} />
        </div>
      )
    }
    if (tile.name === 'GitHub') {
      return (
        <div className={`sk-tile-icon t-${tile.tone}`}>
          <GitHubIcon size={14} />
        </div>
      )
    }
    if (tile.name === 'Vercel') {
      return (
        <div className={`sk-tile-icon t-${tile.tone}`}>
          <VercelIcon size={14} />
        </div>
      )
    }
    return (
      <div className={`sk-tile-icon t-${tile.tone}`}>
        <span className="sk-mono" style={{ color: tile.iconColor ?? '#fff', fontSize: 8 }}>
          {tile.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <div className={`sk-tile-icon t-${tile.tone}`}>
      <span
        className="sk-mono"
        style={{
          color: tile.tone === 'lt' ? (tile.iconColor ?? '#000') : '#fff',
          fontSize: 8,
        }}
      >
        {tile.iconText}
      </span>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section className="skills" id="skills">
      <Atmo variant="b" tone="cool" />

      <div className="skills-wrap">
        <SectionHeading number="// 02" title="SKILLS" blink />

        <p className="skills-lead">習得済みのスキルスタックと使用技術。</p>

        {skillCategories.map((cat) => {
          const badgeIcon = BADGE_ICONS[cat.title]
          return (
            <div key={cat.title} className="sk-cat">
              <div className="sk-cat-head">
                <div className="sk-cat-badge" aria-hidden="true">
                  {badgeIcon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={badgeIcon} alt="" width={20} height={20} />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="6" y="0" width="2" height="14" fill="#fff" />
                      <rect x="0" y="6" width="14" height="2" fill="#fff" />
                    </svg>
                  )}
                </div>
                {/* plain text — scramble triggered by MotionProvider on sk-cat-head hover */}
                <span className="sk-cat-title">{cat.title}</span>
                <div className="sk-cat-rule" />
                <span className="sk-cat-count">{cat.count} SKILLS</span>
              </div>

              <div className="sk-cat-grid">
                {cat.tiles.map((tile) => (
                  <div key={tile.name} className="sk-tile">
                    <TileIcon tile={tile} />
                    {/* plain text — scramble triggered by MotionProvider on sk-tile hover */}
                    <span className="sk-tile-name">{tile.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
