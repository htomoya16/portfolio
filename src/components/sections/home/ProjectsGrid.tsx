'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import ScrambleText from '@/components/animation/ScrambleText'
import { projectsCopy, type Project } from '@/content/site/projects'
import { onLoaderDone } from '@/lib/loaderSignal'

// モーダル（カルーセルを含む）は最初の表示に不要なので、別ファイルに分けて後から読み込む。
// next/dynamic（React.lazy）だと初回表示で Suspense を通り、React が切り替えを最大 300ms
// 遅らせるため、読み込んだコンポーネントを state に持って直接描画する。
type ProjectModalComponent = typeof import('./ProjectModal').default
const loadProjectModal = () => import('./ProjectModal').then((mod) => mod.default)

const SKILL_ICON_MAP: Record<string, string> = {
  Python: '/assets/icons/skills/python.svg',
  FastAPI: '/assets/icons/skills/fast-api.svg',
  React: '/assets/icons/skills/reactjs.svg',
  Vite: '/assets/icons/skills/vitejs.svg',
  Docker: '/assets/icons/skills/docker.svg',
  nginx: '/assets/icons/skills/nginx.svg',
  'Raspberry Pi': '/assets/icons/skills/raspberry-pi.svg',
  'Wake-on-LAN': '/assets/icons/misc/power.svg',
  'GitHub Actions': '/assets/icons/skills/GitHub%20Actions.svg',
  SQLite: '/assets/icons/skills/SQLite.svg',
  'Meta Quest 2': '/assets/icons/misc/vr.svg',
  ESP32: '/assets/icons/misc/esp32.svg',
  ポテンショメータ: '/assets/icons/misc/sensor.svg',
  サーボモータ: '/assets/icons/misc/servo.svg',
  '3Dプリンタ': '/assets/icons/misc/3d-print.svg',
  Go: '/assets/icons/skills/go.svg',
  Echo: '/assets/icons/skills/echo.png',
  MySQL: '/assets/icons/skills/mysql.svg',
  PostgreSQL: '/assets/icons/skills/postgresql.svg',
  Heroku: '/assets/icons/skills/heroku.svg',
  'C#': '/assets/icons/skills/c-sharp.svg',
  Unity: '/assets/icons/skills/unity-svgrepo-com.svg',
  Ollama: '/assets/icons/skills/ollama.svg',
  LiteLLM: '/assets/icons/skills/litellm.svg',
  SearXNG: '/assets/icons/skills/searxng.svg',
  MCP: '/assets/icons/skills/mcp.svg',
  JupyterHub: '/assets/icons/skills/jupyter.svg',
  Slurm: '/assets/icons/skills/slurm.png',
  Apptainer: '/assets/icons/skills/apptainer.svg',
  Cloudflare: '/assets/icons/skills/cloudflare.svg',
  Ansible: '/assets/icons/skills/ansible.svg',
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
  const [ProjectModal, setProjectModal] = useState<ProjectModalComponent | null>(null)

  // import は一度だけ実行されるので、何度呼んでもよい
  const prefetchProjectModal = useCallback(() => {
    void loadProjectModal().then((component) => setProjectModal(() => component))
  }, [])

  // 初回クリックで読み込み待ちが出ないよう、ローディング画面が閉じたあと
  // ブラウザの手が空いたときに先読みする（カードへのホバーやフォーカスでも読み込む）
  useEffect(() => {
    let idleId: number | undefined
    let timerId: ReturnType<typeof setTimeout> | undefined
    const offLoaderDone = onLoaderDone(() => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(prefetchProjectModal, { timeout: 3000 })
      } else {
        timerId = setTimeout(prefetchProjectModal, 1500)
      }
    })
    return () => {
      offLoaderDone()
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      clearTimeout(timerId)
    }
  }, [prefetchProjectModal])

  const openProject = (project: Project) => {
    prefetchProjectModal()
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
            onPointerEnter={prefetchProjectModal}
            onFocus={prefetchProjectModal}
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
            <span className="project-card-sheen" aria-hidden="true" />
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

      {selectedProject && ProjectModal && (
        <ProjectModal
          project={selectedProject}
          open={dialogOpen}
          onOpenChange={handleOpenChange}
        />
      )}
    </>
  )
}
