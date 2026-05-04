// Server component
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { projects } from '@/content/site/projects'
import ProjectsGrid from './ProjectsGrid'

export default function ProjectsSection() {
  return (
    <section className="projects" id="projects">
      <Atmo variant="c" tone="cool" />

      <div className="projects-wrap">
        <div className="projects-head">
          <SectionHeading number="// 03" title="PROJECTS" className="section-head-compact" blink />
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

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  )
}
