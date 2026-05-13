'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrambleText from '@/components/animation/ScrambleText'
import { projectModalCopy, type Project } from '@/content/site/projects'
import ProjectMediaCarousel from './ProjectMediaCarousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Inline styles to guarantee override of Tailwind defaults
const MODAL_STYLE: React.CSSProperties = {
  padding: 0,
  gap: 0,
  maxWidth: 'min(1360px, calc(100vw - 20px))',
  width: '100%',
  height: 'min(94vh, 960px)',
  maxHeight: '94vh',
  borderRadius: '16px',
  // Transparent so backdrop-filter on pm-left blurs the actual page behind
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.38)',
  boxShadow: '0 28px 72px rgba(0,0,30,0.32), 0 0 0 1px rgba(255,255,255,0.18)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}

// No backdropFilter on overlay — let the glass panel handle all blur
const OVERLAY_STYLE: React.CSSProperties = {
  background: 'rgba(8,16,48,0.46)',
}

const PROJECT_ICON_BASE = '/assets/icons/projects'

const PROJECT_SECTION_ICONS = {
  background: `${PROJECT_ICON_BASE}/background.svg`,
  devContent: `${PROJECT_ICON_BASE}/details.svg`,
  techStack: `${PROJECT_ICON_BASE}/tech.svg`,
  highlights: `${PROJECT_ICON_BASE}/point.svg`,
  challenges: `${PROJECT_ICON_BASE}/flag.svg`,
  learnings: `${PROJECT_ICON_BASE}/learning.svg`,
} as const

const PROJECT_META_ICONS = {
  role: `${PROJECT_ICON_BASE}/role.svg`,
  period: `${PROJECT_ICON_BASE}/period.svg`,
  type: `${PROJECT_ICON_BASE}/type.svg`,
  time: `${PROJECT_ICON_BASE}/time.svg`,
} as const

const TECH_ICON_MAP: Record<string, string> = {
  'Next.js': '/assets/icons/skills/nextjs.svg',
  React: '/assets/icons/skills/reactjs.svg',
  'Tailwind CSS': '/assets/icons/skills/tailwindcss.svg',
  PostgreSQL: '/assets/icons/skills/postgresql.svg',
  Docker: '/assets/icons/skills/docker.svg',
  Vercel: '/assets/icons/skills/vercel-dark.svg',
  Python: '/assets/icons/skills/python.svg',
  Go: '/assets/icons/skills/go.svg',
  FastAPI: '/assets/icons/skills/fast-api.svg',
  Echo: '/assets/icons/skills/echo.png',
  MySQL: '/assets/icons/skills/mysql.svg',
  SQLite: '/assets/icons/skills/SQLite.svg',
  ESP32: '/assets/icons/misc/esp32.svg',
  ポテンショメータ: '/assets/icons/misc/sensor.svg',
  サーボモータ: '/assets/icons/misc/servo.svg',
  '3Dプリンタ': '/assets/icons/misc/3d-print.svg',
  Git: '/assets/icons/skills/git.svg',
  GitHub: '/assets/icons/skills/github-dark.svg',
  'GitHub Actions': '/assets/icons/skills/GitHub%20Actions.svg',
  Vite: '/assets/icons/skills/vitejs.svg',
  nginx: '/assets/icons/skills/nginx.svg',
  Heroku: '/assets/icons/skills/heroku.svg',
  Unity: '/assets/icons/skills/unity-svgrepo-com.svg',
  'C#': '/assets/icons/skills/c-sharp.svg',
  'Raspberry Pi': '/assets/icons/skills/raspberry-pi.svg',
}

function ParagraphText({ text, className }: { text: string; className: string }) {
  const paragraphs = text.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean)

  return (
    <div className={`${className} pm-text-block`}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

function ProjectIcon({ src, className = 'pm-section-icon-img' }: { src: string; className?: string }) {
  return (
    <Image
      className={className}
      src={src}
      alt=""
      width={18}
      height={18}
      aria-hidden="true"
    />
  )
}

function canScrollVertically(element: HTMLElement) {
  return element.scrollHeight > element.clientHeight
}

function findModalScrollArea(target: EventTarget | null, content: HTMLElement) {
  if (!(target instanceof Element)) return null

  const scrollArea = target.closest<HTMLElement>('.pm-media-carousel, .pm-right')
  if (!scrollArea || !content.contains(scrollArea)) return null
  return scrollArea
}

function applyWheelScroll(element: HTMLElement, deltaY: number) {
  if (!canScrollVertically(element)) return
  element.scrollTop += deltaY
}

function useModalScrollGuard(open: boolean, contentRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return

    const getContent = () => contentRef.current

    const handleWheel = (event: WheelEvent) => {
      const content = getContent()
      if (!content) return

      const carousel = event.target instanceof Element
        ? event.target.closest<HTMLElement>('.pm-carousel-wheel')
        : null
      if (carousel && content.contains(carousel)) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
        carousel.dispatchEvent(new CustomEvent('pm-carousel-wheel', {
          detail: { deltaY: event.deltaY, deltaX: event.deltaX },
        }))
        return
      }

      const scrollArea = findModalScrollArea(event.target, content)
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()

      if (scrollArea) {
        applyWheelScroll(scrollArea, event.deltaY)
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      const content = getContent()
      if (!content) return
      if (!content.contains(event.target as Node)) return

      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
    }

    window.addEventListener('wheel', handleWheel, { capture: true, passive: false })
    window.addEventListener('touchmove', handleTouchMove, { capture: true, passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('touchmove', handleTouchMove, { capture: true })
    }
  }, [contentRef, open])
}

function useBodyScrollLock(open: boolean) {
  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const html = document.documentElement
    const body = document.body
    const previousHtmlOverflow = html.style.overflow
    const previousBodyOverflow = body.style.overflow
    const previousBodyPosition = body.style.position
    const previousBodyTop = body.style.top
    const previousBodyWidth = body.style.width
    const previousHtmlScrollBehavior = html.style.scrollBehavior
    const previousBodyScrollBehavior = body.style.scrollBehavior

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    return () => {
      html.style.scrollBehavior = 'auto'
      body.style.scrollBehavior = 'auto'
      html.style.overflow = previousHtmlOverflow
      body.style.overflow = previousBodyOverflow
      body.style.position = previousBodyPosition
      body.style.top = previousBodyTop
      body.style.width = previousBodyWidth
      window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' })

      window.requestAnimationFrame(() => {
        html.style.scrollBehavior = previousHtmlScrollBehavior
        body.style.scrollBehavior = previousBodyScrollBehavior
      })
    }
  }, [open])
}

function useDragScroll(open: boolean, scrollRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return

    const element = scrollRef.current
    if (!element) return

    let dragging = false
    let moved = false
    let startY = 0
    let startScrollTop = 0
    let pointerId: number | null = null

    const stopDragging = () => {
      if (!dragging) return
      dragging = false
      pointerId = null
      element.classList.remove('is-dragging')
      window.setTimeout(() => { moved = false }, 0)
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      if (event.button !== 0) return

      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('a, input, textarea, select, video, .pm-close-btn, .pm-media-lightbox-close, .pm-carousel-wheel, .pm-thumb-strip')) {
        return
      }

      dragging = true
      moved = false
      startY = event.clientY
      startScrollTop = element.scrollTop
      pointerId = event.pointerId
      element.classList.add('is-dragging')
      event.preventDefault()
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return

      const deltaY = event.clientY - startY
      if (Math.abs(deltaY) > 3) moved = true
      element.scrollTop = startScrollTop - deltaY
      event.preventDefault()
      event.stopPropagation()
    }

    const handleClickCapture = (event: MouseEvent) => {
      if (!moved) return
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
    }

    element.addEventListener('pointerdown', handlePointerDown)
    element.addEventListener('click', handleClickCapture, true)
    window.addEventListener('pointermove', handlePointerMove, { passive: false })
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      element.classList.remove('is-dragging')
      element.removeEventListener('pointerdown', handlePointerDown)
      element.removeEventListener('click', handleClickCapture, true)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
    }
  }, [open, scrollRef])
}


export default function ProjectModal({ project, open, onOpenChange }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const leftMediaRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useBodyScrollLock(open)
  useModalScrollGuard(open, contentRef)
  useDragScroll(open, leftMediaRef)
  useDragScroll(open, rightRef)

  useEffect(() => {
    if (!open) return

    // Query inside the timeout so the portal DOM is guaranteed to be mounted
    const timer = setTimeout(() => {
      const right = rightRef.current
      if (!right) return
      const revealEls = right.querySelectorAll<HTMLElement>('.pm-reveal')
      if (!revealEls.length) return
      gsap.fromTo(
        revealEls,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, stagger: 0.045, duration: 0.34, ease: 'power2.out' }
      )
    }, 240)

    return () => { clearTimeout(timer) }
  }, [open, project])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={contentRef}
        showCloseButton={false}
        className="pm-dialog-content"
        style={MODAL_STYLE}
        overlayStyle={OVERLAY_STYLE}
      >
        {/* Screen-reader labels */}
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <DialogDescription className="sr-only">{project.desc}</DialogDescription>

        <button
          className="pm-close-btn"
          onClick={() => onOpenChange(false)}
          aria-label="Close modal"
        >
          <span className="pm-close-x" aria-hidden="true">×</span>
        </button>

        {/* Two-column body */}
        <div className="pm-body">

          {/* Left: dark panel — preview + meta */}
          <div className="pm-left">
            <ProjectMediaCarousel ref={leftMediaRef} key={project.num} project={project} />
            <div className="pm-left-meta">
              <div className="pm-left-meta-grid">
                {project.role && (
                  <div className="pm-meta-row">
                    <ProjectIcon src={PROJECT_META_ICONS.role} className="pm-meta-icon" />
                    <span className="pm-meta-key">ROLE</span>
                    <span className="pm-meta-val">{project.role}</span>
                  </div>
                )}
                {project.period && (
                  <div className="pm-meta-row">
                    <ProjectIcon src={PROJECT_META_ICONS.period} className="pm-meta-icon" />
                    <span className="pm-meta-key">PERIOD</span>
                    <span className="pm-meta-val">{project.period}</span>
                  </div>
                )}
                {project.projectType && (
                  <div className="pm-meta-row">
                    <ProjectIcon src={PROJECT_META_ICONS.type} className="pm-meta-icon" />
                    <span className="pm-meta-key">TYPE</span>
                    <span className="pm-meta-val">{project.projectType}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="pm-meta-row">
                    <ProjectIcon src={PROJECT_META_ICONS.time} className="pm-meta-icon" />
                    <span className="pm-meta-key">TIME</span>
                    <span className="pm-meta-val">{project.duration}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: scrollable content */}
          <div className="pm-right" ref={rightRef}>

            {/* ── Title block ── */}
            <div className="pm-reveal pm-r-title-block">
              <p className="pm-label">{`// ${project.num}`}</p>
              <div className="pm-title-row">
                <ScrambleText
                  as="h2"
                  className="pm-title"
                  text={project.title}
                  revealRate={24}
                  settleDuration={640}
                  delay={220}
                  replayOnHover={false}
                />
                <div className="pm-title-actions">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pm-github-link"
                      aria-label={`${projectModalCopy.githubAriaPrefix} ${project.title} ${projectModalCopy.githubAriaSuffix}`}
                    >
                      <Image
                        src="/assets/icons/skills/github-dark.svg"
                        alt=""
                        width={18}
                        height={18}
                        aria-hidden="true"
                        className="pm-github-icon"
                      />
                      {projectModalCopy.githubLabel}
                      <Image
                        src={`${PROJECT_ICON_BASE}/link-external.svg`}
                        alt=""
                        width={14}
                        height={14}
                        aria-hidden="true"
                        className="pm-external-icon"
                      />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pm-github-link pm-resource-link"
                      aria-label={`Open related page for ${project.title}`}
                    >
                      {project.liveLabel ?? 'Link'}
                      <Image
                        src={`${PROJECT_ICON_BASE}/link-external.svg`}
                        alt=""
                        width={14}
                        height={14}
                        aria-hidden="true"
                        className="pm-external-icon"
                      />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pm-github-link pm-demo-link"
                      aria-label={`Open demo video for ${project.title}`}
                    >
                      <Image
                        src={`${PROJECT_ICON_BASE}/youtube.svg`}
                        alt=""
                        width={18}
                        height={18}
                        aria-hidden="true"
                        className="pm-youtube-icon"
                      />
                      {project.demoLabel ?? 'YouTube'}
                      <Image
                        src={`${PROJECT_ICON_BASE}/link-external.svg`}
                        alt=""
                        width={14}
                        height={14}
                        aria-hidden="true"
                        className="pm-external-icon"
                      />
                    </a>
                  )}
                </div>
              </div>
              <p className="pm-summary">{project.desc}</p>
            </div>

            <div className="pm-divider pm-reveal" />

            {/* ── 開発背景 ── */}
            {project.background && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <ProjectIcon src={PROJECT_SECTION_ICONS.background} />
                  {projectModalCopy.sections.background}
                </h3>
                <ParagraphText className="pm-section-body" text={project.background} />
              </div>
            )}

            {/* ── 開発内容 ── */}
            {project.devContent && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <ProjectIcon src={PROJECT_SECTION_ICONS.devContent} />
                  {projectModalCopy.sections.devContent}
                </h3>
                <ParagraphText className="pm-section-body" text={project.devContent} />
              </div>
            )}

            {/* ── 技術スタック ── */}
            <div className="pm-reveal pm-section">
              <h3 className="pm-section-title">
                <ProjectIcon src={PROJECT_SECTION_ICONS.techStack} />
                {projectModalCopy.sections.techStack}
              </h3>
              <div className="pm-tags-grid">
                {project.tags.map((tag) => {
                  const iconSrc = TECH_ICON_MAP[tag]
                  return (
                    <span key={tag} className="pm-tag">
                      {iconSrc ? (
                        <Image
                          className="pm-tag-icon"
                          src={iconSrc}
                          alt=""
                          width={18}
                          height={18}
                          aria-hidden="true"
                        />
                      ) : (
                        <span className="pm-tag-fallback" aria-hidden="true">{tag.slice(0, 2)}</span>
                      )}
                      {tag}
                    </span>
                  )
                })}
              </div>
              {project.techReasons && project.techReasons.length > 0 && (
                <div className="pm-tech-reasons">
                  <h4 className="pm-tech-reasons-title">{projectModalCopy.sections.techReasons}</h4>
                  <ul className="pm-tech-reasons-list">
                    {project.techReasons.map((item) => (
                      <li key={item.name} className="pm-tech-reason-item">
                        <span className="pm-tech-reason-name">{item.name}</span>
                        <span className="pm-tech-reason-text">{item.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ── 工夫した点 ── */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <ProjectIcon src={PROJECT_SECTION_ICONS.highlights} />
                  {projectModalCopy.sections.highlights}
                </h3>
                <ul className="pm-bullet-list">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="pm-bullet-item">
                      <ProjectIcon src={`${PROJECT_ICON_BASE}/check.svg`} className="pm-bullet-icon" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── 苦労した点と解決 ── */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <ProjectIcon src={PROJECT_SECTION_ICONS.challenges} />
                  {projectModalCopy.sections.challenges}
                </h3>
                <div className="pm-challenges">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="pm-challenge-item">
                      <div className="pm-challenge-problem">
                        <span className="pm-challenge-label">
                          <ProjectIcon src={`${PROJECT_ICON_BASE}/Issue.svg`} className="pm-challenge-icon" />
                          {projectModalCopy.challengeLabels.problem}
                        </span>
                        <ParagraphText className="pm-challenge-copy" text={c.problem} />
                      </div>
                      <div className="pm-challenge-solution">
                        <span className="pm-challenge-label pm-challenge-label-sol">
                          <ProjectIcon src={`${PROJECT_ICON_BASE}/solution.svg`} className="pm-challenge-icon" />
                          {projectModalCopy.challengeLabels.solution}
                        </span>
                        <ParagraphText className="pm-challenge-copy" text={c.solution} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── 学び ── */}
            {project.learnings && project.learnings.length > 0 && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <ProjectIcon src={PROJECT_SECTION_ICONS.learnings} />
                  {projectModalCopy.sections.learnings}
                </h3>
                <ul className="pm-bullet-list">
                  {project.learnings.map((l, i) => (
                    <li key={i} className="pm-bullet-item">
                      <ProjectIcon src={`${PROJECT_ICON_BASE}/check.svg`} className="pm-bullet-icon" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>{/* /pm-right */}
        </div>{/* /pm-body */}
      </DialogContent>
    </Dialog>
  )
}
