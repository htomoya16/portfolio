'use client'

import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import ScrambleText from '@/components/animation/ScrambleText'
import type { Project } from '@/content/site/projects'
import { PreviewQuest, PreviewScore, PreviewPixel } from './ProjectPreviews'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef(false)

  // Entrance animation
  useEffect(() => {
    const overlay = overlayRef.current
    const panel = panelRef.current
    const content = contentRef.current
    if (!overlay || !panel || !content) return

    closingRef.current = false
    const revealEls = Array.from(content.querySelectorAll<HTMLElement>('.pm-reveal'))

    const tl = gsap.timeline()
    tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28, ease: 'power2.out' })
      .fromTo(
        panel,
        { autoAlpha: 0, y: 56, scale: 0.93 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.52, ease: 'expo.out' },
        '-=0.1'
      )
      .fromTo(
        revealEls,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, stagger: 0.055, duration: 0.36, ease: 'power2.out' },
        '-=0.3'
      )

    return () => { tl.kill() }
  }, [])

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const handleClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) { onClose(); return }
    gsap.timeline({ onComplete: onClose })
      .to(panel, { autoAlpha: 0, y: 28, scale: 0.95, duration: 0.26, ease: 'power3.in' })
      .to(overlay, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1')
  }, [onClose])

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClose])

  const Preview =
    project.previewType === 'quest'
      ? PreviewQuest
      : project.previewType === 'score'
      ? PreviewScore
      : PreviewPixel

  const statusDot = project.status === 'IN DEV' ? '#FFB347' : '#00FF3B'
  const statusShadow = project.status === 'IN DEV' ? '#FFB347' : '#00FF3B'

  return createPortal(
    <div
      ref={overlayRef}
      className="pm-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
    >
      <div ref={panelRef} className="pm-panel">
        {/* CRT scanlines overlay */}
        <div className="pm-scanlines" aria-hidden="true" />

        {/* Corner brackets */}
        <span className="pm-corner pm-tl" aria-hidden="true" />
        <span className="pm-corner pm-tr" aria-hidden="true" />
        <span className="pm-corner pm-bl" aria-hidden="true" />
        <span className="pm-corner pm-br" aria-hidden="true" />

        {/* Header bar */}
        <div className="pm-header">
          <span className="pm-header-num">PROJECT {project.num}</span>
          <div className="pm-header-right">
            {project.status && (
              <span className="pm-header-status">
                <span
                  className="pm-header-dot"
                  style={{ background: statusDot, boxShadow: `0 0 6px ${statusShadow}` }}
                />
                {project.status}
              </span>
            )}
            <button className="pm-close-btn" onClick={handleClose} aria-label="Close modal">
              <span className="pm-close-x" aria-hidden="true">✕</span>
              CLOSE
            </button>
          </div>
        </div>

        {/* Two-column body */}
        <div className="pm-body">
          {/* Left: preview */}
          <div className="pm-left">
            <Preview />
          </div>

          {/* Right: detail */}
          <div className="pm-right" ref={contentRef}>
            <div className="pm-reveal">
              <p className="pm-label">{`// ${project.num}`}</p>
              <ScrambleText
                as="h2"
                className="pm-title"
                text={project.title}
                revealRate={24}
                settleDuration={680}
                delay={440}
                replayOnHover={false}
              />
            </div>

            <div className="pm-divider pm-reveal" />

            <p className="pm-desc pm-reveal">{project.longDesc ?? project.desc}</p>

            {project.features && project.features.length > 0 && (
              <ul className="pm-features pm-reveal">
                {project.features.map((f, i) => (
                  <li key={i} className="pm-feature">
                    <span className="pm-arrow" aria-hidden="true">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="pm-stats pm-reveal">
              {project.role && (
                <div className="pm-stat">
                  <span className="pm-stat-key">ROLE</span>
                  <span className="pm-stat-val">{project.role}</span>
                </div>
              )}
              {project.period && (
                <div className="pm-stat">
                  <span className="pm-stat-key">PERIOD</span>
                  <span className="pm-stat-val">{project.period}</span>
                </div>
              )}
            </div>

            <div className="pm-tags pm-reveal">
              {project.tags.map((tag) => (
                <span key={tag} className="pm-tag">{tag}</span>
              ))}
            </div>

            <div className="pm-actions pm-reveal">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-btn pm-btn-ghost"
                >
                  VIEW CODE <span className="pm-btn-arrow">↗</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-btn pm-btn-primary"
                >
                  LIVE DEMO <span className="pm-btn-arrow">↗</span>
                </a>
              )}
              {!project.repoUrl && !project.liveUrl && (
                <span className="pm-btn pm-btn-dim">COMING SOON</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
