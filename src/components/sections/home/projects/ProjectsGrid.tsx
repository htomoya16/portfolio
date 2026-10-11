'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Project } from '@/content/site/projects'
import { getPrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap, useGSAP } from '@/lib/gsap'
import { onLoaderDone } from '@/lib/loaderSignal'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

// モーダル（カルーセルを含む）は最初の表示に不要なので、別ファイルに分けて後から読み込む。
// next/dynamic（React.lazy）だと初回表示で Suspense を通り、React が切り替えを最大 300ms
// 遅らせるため、読み込んだコンポーネントを state に持って直接描画する。
type ProjectModalComponent = typeof import('./modal/ProjectModal').default
const loadProjectModal = () => import('./modal/ProjectModal').then((mod) => mod.default)

interface Props {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)
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

  // カードを下から順にめくるように表示する。クリップにもカードと同じ角丸を付け、終わったら外す。
  // 長方形のクリップを残すと、角丸の外に出るガラスの影（box-shadow）が切り取られてしまう。
  useGSAP(
    () => {
      const grid = gridRef.current
      if (!grid || getPrefersReducedMotion()) return
      gsap.fromTo(
        grid.querySelectorAll('[data-project-card]'),
        { autoAlpha: 0, y: 60, clipPath: 'inset(100% 0% 0% 0% round 22px)' },
        {
          autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 0.85, ease: 'power3.out',
          stagger: 0.14, clearProps: 'clipPath',
          scrollTrigger: { trigger: grid, start: 'top 75%', once: true },
        },
      )
    },
    { scope: gridRef },
  )

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
      <div className={styles.grid} ref={gridRef}>
        {projects.map((project) => (
          <ProjectCard key={project.num} project={project} onOpen={openProject} onPrefetch={prefetchProjectModal} />
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
