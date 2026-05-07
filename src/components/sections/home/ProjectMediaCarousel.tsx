'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Project, ProjectMedia } from '@/content/site/projects'

interface ProjectMediaCarouselProps {
  project: Project
}

function getOrientationClass(item: ProjectMedia) {
  return item.orientation ? ` is-${item.orientation}` : ''
}

function MediaFrame({ item, videoRef, priority = false }: {
  item: ProjectMedia
  videoRef?: (node: HTMLVideoElement | null) => void
  priority?: boolean
}) {
  const className = `pm-media-el${getOrientationClass(item)}`

  if (item.type === 'video') {
    return (
      <video
        ref={videoRef}
        className={className}
        src={item.src}
        poster={item.poster}
        controls
        preload="none"
        aria-label={item.alt}
      />
    )
  }

  return (
    <Image
      className={className}
      src={item.src}
      alt={item.alt}
      fill
      sizes="(max-width: 760px) 100vw, 48vw"
      priority={priority}
      draggable={false}
    />
  )
}

function ThumbFrame({ item }: { item: ProjectMedia }) {
  if (item.type === 'video' && item.poster) {
    return (
      <>
        <Image
          className={`pm-thumb-el${getOrientationClass(item)}`}
          src={item.poster}
          alt=""
          fill
          sizes="120px"
          draggable={false}
          aria-hidden="true"
        />
        <span className="pm-thumb-play" aria-hidden="true" />
      </>
    )
  }

  if (item.type === 'video') {
    return (
      <>
        <video
          className={`pm-thumb-el${getOrientationClass(item)}`}
          src={item.src}
          preload="metadata"
          muted
          aria-hidden="true"
        />
        <span className="pm-thumb-play" aria-hidden="true" />
      </>
    )
  }

  return (
    <Image
      className={`pm-thumb-el${getOrientationClass(item)}`}
      src={item.src}
      alt=""
      fill
      sizes="120px"
      draggable={false}
      aria-hidden="true"
    />
  )
}

const ProjectMediaCarousel = forwardRef<HTMLDivElement, ProjectMediaCarouselProps>(
function ProjectMediaCarousel({ project }, ref) {
  const media = project.media ?? []
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const thumbStripRef = useRef<HTMLDivElement | null>(null)
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([])
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const expanded = expandedIndex === null ? null : media[expandedIndex]

  const setRootRef = useCallback((node: HTMLDivElement | null) => {
    rootRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }, [ref])

  const pauseInactiveVideos = useCallback((activeIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (!video || index === activeIndex) return
      video.pause()
    })
  }, [])

  useEffect(() => {
    const strip = thumbStripRef.current
    const selectedThumb = thumbRefs.current[selectedIndex]
    if (!strip || !selectedThumb) return

    const targetLeft = selectedThumb.offsetLeft - (strip.clientWidth - selectedThumb.clientWidth) / 2
    strip.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [selectedIndex])

  useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      const current = api.selectedScrollSnap()
      setSelectedIndex(current)
      pauseInactiveVideos(current)
    }

    handleSelect()
    api.on('select', handleSelect)
    api.on('reInit', handleSelect)

    return () => {
      api.off('select', handleSelect)
      api.off('reInit', handleSelect)
    }
  }, [api, pauseInactiveVideos])

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

  useEffect(() => {
    const node = rootRef.current
    if (!node || !api) return

    const handleWheel = (event: Event) => {
      const detail = (event as CustomEvent<{ deltaY: number; deltaX: number }>).detail
      const delta = Math.abs(detail.deltaX) > Math.abs(detail.deltaY) ? detail.deltaX : detail.deltaY
      if (delta > 0) {
        api.scrollNext()
      } else if (delta < 0) {
        api.scrollPrev()
      }
    }

    node.addEventListener('pm-carousel-wheel', handleWheel)
    return () => {
      node.removeEventListener('pm-carousel-wheel', handleWheel)
    }
  }, [api])

  if (media.length === 0) {
    return null
  }

  return (
    <div
      ref={setRootRef}
      className="pm-media-carousel"
      aria-label={`Media previews for ${project.title}`}
    >
      <p className="pm-left-kicker">PROJECT {project.num}</p>
      <Carousel
        setApi={setApi}
        opts={{ loop: media.length > 1, align: 'start' }}
        className="pm-carousel-shell pm-carousel-wheel"
      >
        <CarouselContent className="pm-carousel-track">
          {media.map((item, index) => (
            <CarouselItem key={`${item.src}-${index}`} className="pm-carousel-item">
              <figure className="pm-media-card">
                <div className={`pm-media-stage${getOrientationClass(item)}`}>
                  <div className="pm-media-screen">
                    {item.type === 'image' ? (
                      <button
                        type="button"
                        className="pm-media-open"
                        onClick={() => setExpandedIndex(index)}
                        aria-label={`Open large preview: ${item.alt}`}
                      >
                        <MediaFrame item={item} priority={index === 0} />
                      </button>
                    ) : (
                      <MediaFrame
                        item={item}
                        videoRef={(node) => { videoRefs.current[index] = node }}
                        priority={index === 0}
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
            </CarouselItem>
          ))}
        </CarouselContent>
        {media.length > 1 && (
          <div className="pm-carousel-controls">
            <CarouselPrevious className="pm-carousel-btn pm-carousel-prev" aria-label="Previous media" />
            <span className="pm-carousel-index" aria-live="polite">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}
            </span>
            <CarouselNext className="pm-carousel-btn pm-carousel-next" aria-label="Next media" />
          </div>
        )}
      </Carousel>

      {media.length > 1 && (
        <div className="pm-thumb-strip" aria-label="Media thumbnails" ref={thumbStripRef}>
          {media.map((item, index) => (
            <button
              type="button"
              key={`${item.src}-thumb-${index}`}
              className="pm-thumb-btn"
              aria-current={selectedIndex === index ? 'true' : undefined}
              aria-label={`Show media ${index + 1}: ${item.alt}`}
              ref={(node) => { thumbRefs.current[index] = node }}
              onClick={() => api?.scrollTo(index)}
            >
              <span className={`pm-thumb-frame${getOrientationClass(item)}`}>
                <ThumbFrame item={item} />
              </span>
              <span className="pm-thumb-num">{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      )}

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
            <Image
              className="pm-media-lightbox-img"
              src={expanded.src}
              alt={expanded.alt}
              width={expanded.orientation === 'portrait' ? 720 : 1280}
              height={expanded.orientation === 'portrait' ? 1280 : 720}
              draggable={false}
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
