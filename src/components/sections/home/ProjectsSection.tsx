// Server component
import { Atmo } from '@/components/ui/Decor'
import SectionHeading from '@/components/ui/SectionHeading'
import { projects, projectsCopy } from '@/content/site/projects'
import ProjectsGrid from './ProjectsGrid'

// 準備中（COMING SOON）のカードは作品数に含めない
const publishedCount = projects.filter((project) => project.status !== 'COMING SOON').length

export default function ProjectsSection() {
  return (
    <section className="projects" id="projects">
      <Atmo variant="c" tone="cool" />

      <div className="projects-wrap">
        <div className="projects-head">
          <SectionHeading number={projectsCopy.sectionNumber} title={projectsCopy.sectionTitle} className="section-head-compact" blink />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: 'var(--muted)',
              letterSpacing: '0.22em',
            }}
          >
            {publishedCount} {projectsCopy.countSuffix}
          </span>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  )
}
