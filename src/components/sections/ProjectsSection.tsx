import type { ReactNode } from 'react'
import { DiagSlash, PixStar, PixDiamond, PixPlus, PixelDotBlock } from '@/components/ui/Decor'
import { PROJECTS, type Project } from '@/content/site/projects'

function QuestPreview() {
  return (
    <div className="preview-quest" style={{ height: '100%' }}>
      <div className="preview-quest-header">QUESTHUB</div>
      <div className="preview-quest-thumbs">
        <div className="qthumb v1" />
        <div className="qthumb v2" />
        <div className="qthumb v3" />
        <div className="qthumb v4" />
      </div>
      <div className="preview-quest-btn">Join Now</div>
    </div>
  )
}

function ScorePreview() {
  return (
    <div className="preview-score" style={{ height: '100%' }}>
      <div className="rank-title">RANKING</div>
      {[1, 2, 3, 4].map(n => (
        <div className={`rank-row n${n}`} key={n}>
          <div className="rank-n">{n}</div>
          <div className="rank-label" />
        </div>
      ))}
    </div>
  )
}

function PixelDiaryPreview() {
  return (
    <div className="preview-pixel" style={{ height: '100%' }}>
      <div className="preview-pixel-inner">
        <div className="preview-pixel-header">▸ DIARY ENTRY</div>
        <div className="preview-pixel-fig">
          <svg width="56" height="56" viewBox="0 0 14 14" shapeRendering="crispEdges">
            <rect x="5" y="2" width="4" height="3" fill="#6B4226"/>
            <rect x="4" y="3" width="1" height="2" fill="#6B4226"/>
            <rect x="9" y="3" width="1" height="2" fill="#6B4226"/>
            <rect x="5" y="4" width="1" height="1" fill="#fff"/>
            <rect x="8" y="4" width="1" height="1" fill="#fff"/>
            <rect x="4" y="5" width="6" height="4" fill="#3DDC84"/>
            <rect x="3" y="6" width="1" height="2" fill="#3DDC84"/>
            <rect x="10" y="6" width="1" height="2" fill="#3DDC84"/>
            <rect x="4" y="9" width="2" height="3" fill="#2547E6"/>
            <rect x="8" y="9" width="2" height="3" fill="#2547E6"/>
            <rect x="4" y="12" width="3" height="1" fill="#6B4226"/>
            <rect x="7" y="12" width="3" height="1" fill="#6B4226"/>
          </svg>
        </div>
        <div className="preview-pixel-caption">today was fun!</div>
      </div>
    </div>
  )
}

const PREVIEWS: Record<Project['previewKey'], ReactNode> = {
  quest: <QuestPreview />,
  score: <ScorePreview />,
  pixel: <PixelDiaryPreview />,
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div>
          <div className="project-num mono">{project.num}</div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">
            {project.desc.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>
          <div className="project-tags">
            {project.tags.map(t => (
              <span className="project-tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
        <div className="project-preview">{PREVIEWS[project.previewKey]}</div>
      </div>
      <div className="project-arrow">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M0 6H14M14 6L9 1M14 6L9 11" stroke="#fff" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section className="projects" id="projects">
      <DiagSlash length={80} thickness={1.5} color="#2547E6" style={{ top: '10%', right: '8%' }} />
      <DiagSlash length={60} thickness={1.5} color="#D7FF00" style={{ bottom: '8%', left: '40%' }} />
      <div style={{ position: 'absolute', top: '14%', right: '16%', zIndex: 1, animation: 'float 4s ease-in-out infinite' }}>
        <PixStar size={16} color="#D7FF00" />
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '2%', zIndex: 1, animation: 'float 5.5s ease-in-out infinite 0.8s' }}>
        <PixDiamond size={14} color="#F72585" />
      </div>
      <div style={{ position: 'absolute', bottom: '14%', right: '6%', zIndex: 1, animation: 'float 4.5s ease-in-out infinite 1.5s' }}>
        <PixPlus size={14} color="#2547E6" />
      </div>
      <div style={{ position: 'absolute', top: '18%', left: '4%', zIndex: 1 }}>
        <PixelDotBlock cols={6} rows={3} gap={7} />
      </div>

      <div className="projects-head">
        <div>
          <div className="section-num mono">03</div>
          <h2 className="section-title">PROJECTS <span className="accent" /></h2>
        </div>
        <a href="#" className="view-all">
          VIEW ALL PROJECTS
          <svg width="30" height="8" viewBox="0 0 30 8" fill="none">
            <path d="M0 4H28M28 4L24 1M28 4L24 7" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </a>
      </div>

      <div className="projects-grid">
        {PROJECTS.map(p => <ProjectCard key={p.num} project={p} />)}
      </div>
    </section>
  )
}
