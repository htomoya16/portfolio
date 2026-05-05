'use client'

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import type { Project, ProjectMedia } from '@/content/site/projects'

interface ProjectMediaCarouselProps {
  project: Project
}

function MediaFrame({ item, videoRef }: {
  item: ProjectMedia
  videoRef?: (node: HTMLVideoElement | null) => void
}) {
  if (item.type === 'video') {
    return (
      <video
        ref={videoRef}
        className="pm-media-el"
        src={item.src}
        poster={item.poster}
        controls
        preload="none"
        aria-label={item.alt}
      />
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img className="pm-media-el" src={item.src} alt={item.alt} draggable={false} decoding="async" />
}

const ProjectMediaCarousel = forwardRef<HTMLDivElement, ProjectMediaCarouselProps>(
function ProjectMediaCarousel({ project }, ref) {
  const media = project.media ?? []
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const expanded = expandedIndex === null ? null : media[expandedIndex]

  useEffect(() => {
    if (expandedIndex === null) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedIndex(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [expandedIndex])

  if (media.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className="pm-media-carousel"
      aria-label={`Media previews for ${project.title}`}
    >
      <div className="pm-media-list" role="list">
        {media.map((item, index) => (
          <figure
            key={`${item.src}-${index}`}
            className="pm-media-card"
            role="listitem"
          >
            <div className="pm-media-stage">
              <div className="pm-media-screen">
                {item.type === 'image' ? (
                  <button
                    type="button"
                    className="pm-media-open"
                    onClick={() => setExpandedIndex(index)}
                    aria-label={`Open large preview: ${item.alt}`}
                  >
                    <MediaFrame item={item} />
                  </button>
                ) : (
                  <MediaFrame
                    item={item}
                    videoRef={(node) => { videoRefs.current[index] = node }}
                  />
                )}
              </div>
            </div>
            {item.caption && (
              <figcaption className="pm-media-caption">
                <span className="pm-media-count">{String(index + 1).padStart(2, '0')}</span>
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {expanded && expanded.type === 'image' && createPortal(
        <div
          className="pm-media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={expanded.alt}
          onClick={() => setExpandedIndex(null)}
        >
          <div className="pm-media-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="pm-media-lightbox-close"
              onClick={() => setExpandedIndex(null)}
              aria-label="Close large preview"
            >
              CLOSE
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pm-media-lightbox-img"
              src={expanded.src}
              alt={expanded.alt}
              draggable={false}
              decoding="async"
            />
            {expanded.caption ? (
              <p className="pm-media-lightbox-caption">{expanded.caption}</p>
            ) : (
              <p className="pm-media-lightbox-caption">{expanded.alt}</p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
})

ProjectMediaCarousel.displayName = 'ProjectMediaCarousel'

export default ProjectMediaCarousel
