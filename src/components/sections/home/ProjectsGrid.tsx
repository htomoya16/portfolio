'use client'

import { useState } from 'react'
import ScrambleText from '@/components/animation/ScrambleText'
import type { Project } from '@/content/site/projects'
import { PreviewQuest, PreviewScore, PreviewPixel } from './ProjectPreviews'
import ProjectModal from './ProjectModal'

function ProjectPreview({ project }: { project: Project }) {
  if (project.previewType === 'quest') return <PreviewQuest />
  if (project.previewType === 'score') return <PreviewScore />
  return <PreviewPixel />
}

interface Props {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setDialogOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <>
      <div className="projects-grid">
        {projects.map((project) => (
          <article
            key={project.num}
            className="project-card"
            onClick={() => openProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openProject(project)
              }
            }}
            aria-label={`View details for ${project.title}`}
          >
            <div className="project-preview">
              <span className="project-num-badge mono">{project.num}</span>
              <ProjectPreview project={project} />
              {/* hover overlay */}
              <div className="project-view-hint" aria-hidden="true">VIEW DETAILS</div>
            </div>
            <div className="project-meta">
              <p className="project-num-sm mono">{`PROJECT ${project.num}`}</p>
              <ScrambleText
                as="h3"
                className="project-title"
                text={project.title}
                revealRate={34}
                settleDuration={520}
                replayOnHover={true}
              />
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

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          open={dialogOpen}
          onOpenChange={handleOpenChange}
        />
      )}
    </>
  )
}
