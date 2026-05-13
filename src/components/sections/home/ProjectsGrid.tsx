'use client'

import Image from 'next/image'
import { useState } from 'react'
import ScrambleText from '@/components/animation/ScrambleText'
import { projectsCopy, type Project } from '@/content/site/projects'
import ProjectModal from './ProjectModal'

const SKILL_ICON_MAP: Record<string, string> = {
  Python: '/assets/icons/skills/python.svg',
  FastAPI: '/assets/icons/skills/fast-api.svg',
  React: '/assets/icons/skills/reactjs.svg',
  Vite: '/assets/icons/skills/vitejs.svg',
  Docker: '/assets/icons/skills/docker.svg',
  nginx: '/assets/icons/skills/nginx.svg',
  'Raspberry Pi': '/assets/icons/skills/raspberry-pi.svg',
  'GitHub Actions': '/assets/icons/skills/GitHub%20Actions.svg',
  SQLite: '/assets/icons/skills/SQLite.svg',
  ESP32: '/assets/icons/skills/tools-devops-others.svg',
  ポテンショメータ: '/assets/icons/skills/tools-devops-others.svg',
  サーボモータ: '/assets/icons/skills/tools-devops-others.svg',
  '3Dプリンタ': '/assets/icons/skills/tools-devops-others.svg',
  Go: '/assets/icons/skills/go.svg',
  Echo: '/assets/icons/skills/echo.png',
  MySQL: '/assets/icons/skills/mysql.svg',
  PostgreSQL: '/assets/icons/skills/postgresql.svg',
  Heroku: '/assets/icons/skills/heroku.svg',
  'C#': '/assets/icons/skills/c-sharp.svg',
  Unity: '/assets/icons/skills/unity-svgrepo-com.svg',
}

function ProjectPreview({ project }: { project: Project }) {
  if (!project.previewImage) return null

  return (
    <div className="project-preview-image-wrap">
      <Image
        src={project.previewImage.src}
        alt={project.previewImage.alt}
        fill
        sizes="(max-width: 900px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className={`project-preview-image is-${project.previewImage.fit ?? 'cover'}`}
      />
    </div>
  )
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
            className={`project-card${project.previewImage ? '' : ' is-no-preview'}`}
            onClick={() => openProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openProject(project)
              }
            }}
            aria-label={`${projectsCopy.viewDetailsAriaPrefix} ${project.title}`}
          >
            {project.previewImage && (
              <div className="project-preview">
                <span className="project-num-badge mono">{project.num}</span>
                <ProjectPreview project={project} />
                <div className="project-view-hint" aria-hidden="true">{projectsCopy.viewHint}</div>
              </div>
            )}
            <div className="project-meta">
              <p className="project-num-sm mono">{`${projectsCopy.itemLabelPrefix} ${project.num}`}</p>
              <ScrambleText
                as="h3"
                className="project-title"
                text={project.title}
                revealRate={34}
                settleDuration={520}
                replayOnHover={true}
              />
              <p className="project-desc">{project.desc}</p>
              {project.tags.length > 0 && (
                <div className="project-tags">
                  {project.tags.map((tag) => {
                    const iconSrc = SKILL_ICON_MAP[tag]

                    return (
                      <span key={tag} className="project-tag" aria-label={tag} title={tag}>
                        {iconSrc ? (
                          <Image
                            src={iconSrc}
                            alt=""
                            width={20}
                            height={20}
                            aria-hidden="true"
                            className="project-tag-icon"
                          />
                        ) : (
                          <span className="project-tag-fallback mono">{tag}</span>
                        )}
                      </span>
                    )
                  })}
                </div>
              )}
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
