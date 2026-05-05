'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrambleText from '@/components/animation/ScrambleText'
import type { Project } from '@/content/site/projects'
import { PreviewQuest, PreviewScore, PreviewPixel } from './ProjectPreviews'
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
  maxWidth: 'min(960px, calc(100vw - 32px))',
  width: '100%',
  height: '88vh',
  maxHeight: '88vh',
  borderRadius: 0,
  background: '#F7F9FF',
  border: '1px solid rgba(67,103,255,0.22)',
  boxShadow: '0 32px 80px rgba(10,15,40,0.3), 0 0 0 1px rgba(67,103,255,0.08)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}

const OVERLAY_STYLE: React.CSSProperties = {
  background: 'rgba(10,15,28,0.68)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

export default function ProjectModal({ project, open, onOpenChange }: Props) {
  const rightRef = useRef<HTMLDivElement>(null)

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

  const Preview =
    project.previewType === 'quest' ? PreviewQuest
    : project.previewType === 'score' ? PreviewScore
    : PreviewPixel

  const statusColor = project.status === 'IN DEV' ? '#FFB347' : '#00FF3B'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
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
          <span className="pm-header-num">PROJECT {project.num}</span>
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
            <div className="pm-preview-wrap">
              <Preview />
            </div>
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
              <ScrambleText
                as="h2"
                className="pm-title"
                text={project.title}
                revealRate={24}
                settleDuration={640}
                delay={220}
                replayOnHover={false}
              />
              <p className="pm-summary">{project.desc}</p>
            </div>

            <div className="pm-divider pm-reveal" />

            {/* ── 開発背景 ── */}
            {project.background && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <span className="pm-section-icon">▸</span>開発背景
                </h3>
                <p className="pm-section-body">{project.background}</p>
              </div>
            )}

            {/* ── 開発内容 ── */}
            {project.devContent && (
              <div className="pm-reveal pm-section">
                <h3 className="pm-section-title">
                  <span className="pm-section-icon">▸</span>開発内容
                </h3>
                <p className="pm-section-body">{project.devContent}</p>
              </div>
            )}

            {/* ── 技術スタック ── */}
            <div className="pm-reveal pm-section">
              <h3 className="pm-section-title">
                <span className="pm-section-icon">▸</span>技術スタック
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
                  <span className="pm-section-icon">▸</span>工夫した点
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
                  <span className="pm-section-icon">▸</span>苦労した点と解決
                </h3>
                <div className="pm-challenges">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="pm-challenge-item">
                      <div className="pm-challenge-problem">
                        <span className="pm-challenge-label">PROBLEM</span>
                        {c.problem}
                      </div>
                      <div className="pm-challenge-solution">
                        <span className="pm-challenge-label pm-challenge-label-sol">SOLUTION</span>
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
                  <span className="pm-section-icon">▸</span>学び
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

            {/* ── Actions ── */}
            <div className="pm-reveal pm-actions">
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

          </div>{/* /pm-right */}
        </div>{/* /pm-body */}
      </DialogContent>
    </Dialog>
  )
}
