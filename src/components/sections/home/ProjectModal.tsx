'use client'

import { useEffect, useRef } from 'react'
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
      if (target.closest('a, input, textarea, select, video, .pm-close-btn, .pm-media-lightbox-close')) {
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

  const statusColor = project.status === 'IN DEV' ? '#FFB347' : '#00FF3B'

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

        {/* Pixel corner brackets */}
        <span className="pm-corner pm-tl" aria-hidden="true" />
        <span className="pm-corner pm-tr" aria-hidden="true" />
        <span className="pm-corner pm-bl" aria-hidden="true" />
        <span className="pm-corner pm-br" aria-hidden="true" />

        {/* Header bar */}
        <div className="pm-header">
          <span className="pm-header-num">{projectModalCopy.headerProjectPrefix} {project.num}</span>
          <div className="pm-header-right">
            {project.status && (
              <span className="pm-header-status">
                <span
                  className="pm-header-dot"
                  style={{ background: statusColor, boxShadow: `0 0 6px ${statusColor}` }}
                />
                {project.status}
              </span>
            )}
            <button
              className="pm-close-btn"
              onClick={() => onOpenChange(false)}
              aria-label="Close modal"
            >
              <span className="pm-close-x" aria-hidden="true">✕</span>
              CLOSE
            </button>
          </div>
        </div>

        {/* Two-column body */}
        <div className="pm-body">

          {/* Left: dark panel — preview + meta */}
          <div className="pm-left">
            <ProjectMediaCarousel ref={leftMediaRef} key={project.num} project={project} />
            <div className="pm-left-meta">
              {project.role && (
                <div className="pm-meta-row">
                  <span className="pm-meta-key">ROLE</span>
                  <span className="pm-meta-val">{project.role}</span>
                </div>
              )}
              {project.period && (
                <div className="pm-meta-row">
                  <span className="pm-meta-key">PERIOD</span>
                  <span className="pm-meta-val">{project.period}</span>
                </div>
              )}
              <div className="pm-left-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="pm-left-tag">{tag}</span>
                ))}
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
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pm-github-link"
                    aria-label={`${projectModalCopy.githubAriaPrefix} ${project.title} ${projectModalCopy.githubAriaSuffix}`}
                  >
                    {projectModalCopy.githubLabel}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/icons/misc/external-links.svg"
                      alt=""
                      aria-hidden="true"
                      className="pm-external-icon"
                    />
                  </a>
                )}
              </div>
              <p className="pm-summary">{project.desc}</p>
            </div>

            <div className="pm-divider pm-reveal" />

            {/* ── 開発背景 ── */}
            {project.background && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <span className="pm-section-icon">▸</span>{projectModalCopy.sections.background}
                </h3>
                <p className="pm-section-body">{project.background}</p>
              </div>
            )}

            {/* ── 開発内容 ── */}
            {project.devContent && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <span className="pm-section-icon">▸</span>{projectModalCopy.sections.devContent}
                </h3>
                <p className="pm-section-body">{project.devContent}</p>
              </div>
            )}

            {/* ── 技術スタック ── */}
            <div className="pm-reveal pm-section">
              <h3 className="pm-section-title">
                <span className="pm-section-icon">▸</span>{projectModalCopy.sections.techStack}
              </h3>
              <div className="pm-tags-grid">
                {project.tags.map((tag) => (
                  <span key={tag} className="pm-tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* ── 工夫した点 ── */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <span className="pm-section-icon">▸</span>{projectModalCopy.sections.highlights}
                </h3>
                <ul className="pm-bullet-list">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="pm-bullet-item">
                      <span className="pm-arrow" aria-hidden="true">▸</span>
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
                  <span className="pm-section-icon">▸</span>{projectModalCopy.sections.challenges}
                </h3>
                <div className="pm-challenges">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="pm-challenge-item">
                      <div className="pm-challenge-problem">
                        <span className="pm-challenge-label">{projectModalCopy.challengeLabels.problem}</span>
                        {c.problem}
                      </div>
                      <div className="pm-challenge-solution">
                        <span className="pm-challenge-label pm-challenge-label-sol">{projectModalCopy.challengeLabels.solution}</span>
                        {c.solution}
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
                  <span className="pm-section-icon">▸</span>{projectModalCopy.sections.learnings}
                </h3>
                <ul className="pm-bullet-list">
                  {project.learnings.map((l, i) => (
                    <li key={i} className="pm-bullet-item">
                      <span className="pm-arrow" aria-hidden="true">▸</span>
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
