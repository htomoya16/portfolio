// Server component
import ScrambleText from '@/components/animation/ScrambleText'
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { projects } from '@/content/site/projects'
import type { Project } from '@/content/site/projects'

function PreviewQuest() {
  return (
    <div className="preview-quest">
      <div className="preview-quest-header">QUEST HUB</div>
      <div className="preview-quest-thumbs">
        <div className="qthumb v1" />
        <div className="qthumb v2" />
        <div className="qthumb v3" />
        <div className="qthumb v4" />
      </div>
      <div className="preview-quest-btn">START QUEST</div>
    </div>
  )
}

function PreviewScore() {
  const rows = [
    { rank: '01', name: 'PLAYER_001', cls: 'n1' },
    { rank: '02', name: 'PLAYER_002', cls: 'n2' },
    { rank: '03', name: 'PLAYER_003', cls: 'n3' },
    { rank: '04', name: 'PLAYER_004', cls: 'n4' },
  ]
  return (
    <div className="preview-score">
      <div className="preview-score-card">
        <div className="rank-title">
          RANKING
          <span className="pts">PTS</span>
        </div>
        {rows.map((row) => (
          <div key={row.rank} className={`rank-row ${row.cls}`}>
            <div className="rank-n">{row.rank}</div>
            <span>{row.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PreviewPixel() {
  return (
    <div className="preview-pixel">
      <div className="preview-pixel-inner">
        <div className="preview-pixel-header">
          <span>PIXEL DIARY</span>
          <span>2024/04</span>
        </div>
        <div className="preview-pixel-fig">
          {/* 8x8 dot grid illustration */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            {Array.from({ length: 8 }, (_, r) =>
              Array.from({ length: 8 }, (_, c) => {
                const filled = (r + c) % 3 !== 0
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c * 10}
                    y={r * 10}
                    width={9}
                    height={9}
                    fill={filled ? (r % 2 === 0 ? '#4367FF' : '#B5C2FF') : '#EEF2FC'}
                  />
                )
              })
            )}
          </svg>
        </div>
        <div className="preview-pixel-caption">pixel art life log</div>
      </div>
    </div>
  )
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.previewType === 'quest') return <PreviewQuest />
  if (project.previewType === 'score') return <PreviewScore />
  return <PreviewPixel />
}

export default function ProjectsSection() {
  return (
    <section className="projects" id="projects">
      <Atmo variant="c" tone="cool" />

      <div className="projects-wrap">
        <div className="projects-head">
          <SectionHeading number="// 03" title="PROJECTS" className="section-head-compact" />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: 'var(--muted)',
              letterSpacing: '0.22em',
            }}
          >
            {projects.length} WORKS
          </span>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.num} className="project-card">
              <div className="project-preview">
                <ScrambleText as="span" className="project-num-badge mono" text={project.num} chars="numbers" />
                <ProjectPreview project={project} />
              </div>
              <div className="project-meta">
                <ScrambleText as="p" className="project-num-sm mono" text={`PROJECT ${project.num}`} chars="uppercase" />
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
