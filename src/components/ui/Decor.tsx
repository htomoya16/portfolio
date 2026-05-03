// Server component — pixel/atmosphere decoration primitives
import type { CSSProperties } from 'react'

type BgDecorDef = { src: string; width: number; style: CSSProperties }

const VARIANT_DECORS: Record<string, BgDecorDef[]> = {
  a: [
    { src: '/assets/decor/decor_dot_grid_8x6_blue.svg',      width: 90,  style: { top: '7%',    right: '3%',    opacity: 0.28 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',   width: 38,  style: { top: '28%',   left: '5%',     opacity: 0.45 } },
    { src: '/assets/decor/decor_small_cross_navy.svg',       width: 30,  style: { bottom: '18%',right: '6%',    opacity: 0.35 } },
    { src: '/assets/decor/decor_slash_logo_marks.svg',       width: 80,  style: { bottom: '7%', left: '2%',     opacity: 0.22 } },
  ],
  b: [
    { src: '/assets/decor/halftone_blue.svg',                width: 200, style: { top: -10,     right: -10,     opacity: 0.10 } },
    { src: '/assets/decor/decor_dot_grid_5x4_lime.svg',      width: 80,  style: { bottom: '10%',left: '4%',     opacity: 0.38 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',   width: 34,  style: { top: '18%',   right: '7%',    opacity: 0.48 } },
    { src: '/assets/decor/plus_pink.svg',                    width: 26,  style: { bottom: '22%',right: '5%',    opacity: 0.45 } },
    { src: '/assets/decor/plus_cyan.svg',                    width: 26,  style: { top: '42%',   left: '2%',     opacity: 0.45 } },
  ],
  c: [
    { src: '/assets/decor/halftone_gray.svg',                width: 160, style: { bottom: -10,  left: -10,      opacity: 0.09 } },
    { src: '/assets/decor/square_blue.svg',                  width: 30,  style: { top: '14%',   right: '3%',    opacity: 0.38 } },
    { src: '/assets/decor/square_cyan.svg',                  width: 26,  style: { bottom: '22%',right: '7%',    opacity: 0.32 } },
    { src: '/assets/decor/decor_dot_grid_6x5_blue.svg',      width: 85,  style: { top: '6%',    left: '3%',     opacity: 0.28 } },
    { src: '/assets/decor/plus_purple.svg',                  width: 26,  style: { top: '42%',   right: '4%',    opacity: 0.38 } },
  ],
  d: [
    { src: '/assets/decor/decor_diagonal_line_lime_blue.svg',width: 65,  style: { top: '10%',   left: '4%',     opacity: 0.32 } },
    { src: '/assets/decor/slashes_purple.svg',               width: 100, style: { bottom: '16%',right: '4%',    opacity: 0.28 } },
    { src: '/assets/decor/decor_dot_grid_10x4_blue.svg',     width: 110, style: { top: '22%',   right: '2%',    opacity: 0.24 } },
    { src: '/assets/decor/decor_small_cross_navy.svg',       width: 34,  style: { bottom: '8%', left: '5%',     opacity: 0.38 } },
  ],
  e: [
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',   width: 42,  style: { top: '10%',   left: '5%',     opacity: 0.48 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',   width: 34,  style: { bottom: '14%',right: '4%',    opacity: 0.38 } },
    { src: '/assets/decor/decor_corner_brackets_square.svg', width: 75,  style: { top: '8%',    right: '3%',    opacity: 0.28 } },
    { src: '/assets/decor/decor_plus_lime.svg',              width: 30,  style: { bottom: '20%',left: '6%',     opacity: 0.48 } },
    { src: '/assets/decor/square_pink.svg',                  width: 26,  style: { top: '36%',   right: '6%',    opacity: 0.38 } },
  ],
}

export function Atmo({ variant = 'a', tone = 'cool' }: { variant?: string; tone?: string }) {
  const decors = VARIANT_DECORS[variant] ?? []

  return (
    <div className={`atmo atmo-${variant} atmo-${tone}`} aria-hidden="true">
      <div className="atmo-grid" />
      <div className="atmo-half tl" />
      <div className="atmo-half br" />
      <div className="atmo-blob b1" />
      <div className="atmo-blob b2" />
      <div className="atmo-blob b3" />
      <div className="atmo-quad q1" />
      <div className="atmo-quad q2" />
      <span className="atmo-px p1" />
      <span className="atmo-px p2" />
      <span className="atmo-px p3" />
      <span className="atmo-px p4" />
      <span className="atmo-px p5" />
      <span className="atmo-px p6" />
      <span className="atmo-sq s1" />
      <span className="atmo-sq s2" />
      <span className="atmo-sq s3" />
      <span className="atmo-slash sl1" />
      <span className="atmo-slash sl2" />
      <div className="atmo-noise" />

      {/* Section-specific SVG decorations */}
      {decors.map((d, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={d.src}
          alt=""
          className="bg-decor"
          width={d.width}
          style={d.style}
          draggable={false}
        />
      ))}
    </div>
  )
}

export function PixStar({ size = 16, color = '#4367FF' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="6" y="0" width="4" height="2" fill={color} />
      <rect x="6" y="14" width="4" height="2" fill={color} />
      <rect x="0" y="6" width="2" height="4" fill={color} />
      <rect x="14" y="6" width="2" height="4" fill={color} />
      <rect x="4" y="4" width="2" height="2" fill={color} />
      <rect x="10" y="4" width="2" height="2" fill={color} />
      <rect x="4" y="10" width="2" height="2" fill={color} />
      <rect x="10" y="10" width="2" height="2" fill={color} />
      <rect x="6" y="2" width="4" height="2" fill={color} />
      <rect x="6" y="12" width="4" height="2" fill={color} />
      <rect x="2" y="6" width="2" height="4" fill={color} />
      <rect x="12" y="6" width="2" height="4" fill={color} />
    </svg>
  )
}

export function PixPlus({ size = 12, color = '#4367FF' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="4" y="0" width="4" height="12" fill={color} />
      <rect x="0" y="4" width="12" height="4" fill={color} />
    </svg>
  )
}

export function DiagSlash({ width = 48, height = 12, color = 'rgba(67,103,255,0.35)' }: { width?: number; height?: number; color?: string }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <line
          key={i}
          x1={i * 10 + 2}
          y1={0}
          x2={i * 10 - 2}
          y2={height}
          stroke={color}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}

export function CornerFrame({
  size = 24,
  color = '#4367FF',
  thickness = 2,
}: {
  size?: number
  color?: string
  thickness?: number
}) {
  return (
    <svg
      width={size * 2}
      height={size * 2}
      viewBox={`0 0 ${size * 2} ${size * 2}`}
      fill="none"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {/* top-left */}
      <polyline points={`0,${size} 0,0 ${size},0`} stroke={color} strokeWidth={thickness} fill="none" />
      {/* top-right */}
      <polyline points={`${size},0 ${size * 2},0 ${size * 2},${size}`} stroke={color} strokeWidth={thickness} fill="none" />
      {/* bottom-left */}
      <polyline points={`0,${size} 0,${size * 2} ${size},${size * 2}`} stroke={color} strokeWidth={thickness} fill="none" />
      {/* bottom-right */}
      <polyline points={`${size},${size * 2} ${size * 2},${size * 2} ${size * 2},${size}`} stroke={color} strokeWidth={thickness} fill="none" />
    </svg>
  )
}

export function PixelDotBlock({
  cols = 6,
  rows = 4,
  gap = 8,
  dotSize = 2,
  color = 'rgba(67,103,255,0.5)',
}: {
  cols?: number
  rows?: number
  gap?: number
  dotSize?: number
  color?: string
}) {
  const w = cols * gap
  const h = rows * gap
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * gap + (gap - dotSize) / 2}
            y={r * gap + (gap - dotSize) / 2}
            width={dotSize}
            height={dotSize}
            fill={color}
          />
        ))
      )}
    </svg>
  )
}
