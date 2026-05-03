// Server component — pixel/atmosphere decoration primitives
import type { CSSProperties } from 'react'

type BgDecorDef = { src: string; width: number; style: CSSProperties }

/**
 * Section-specific decorations — すべてマージン内（パディング帯）に配置
 * left/right: 0.8-3%（サイドパディング内）
 * top/bottom: 3-6%（上下パディング内）
 * → カードや文字と重ならない
 */
const VARIANT_DECORS: Record<string, BgDecorDef[]> = {
  a: [ // About
    { src: '/assets/decor/decor_dot_grid_8x6_blue.svg',       width: 80, style: { top: '4%',     left: '1.5%',  opacity: 0.28 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 34, style: { top: '4%',     right: '2%',   opacity: 0.42 } },
    { src: '/assets/decor/decor_slash_logo_marks.svg',        width: 72, style: { bottom: '3%',  left: '1.5%',  opacity: 0.22 } },
    { src: '/assets/decor/decor_small_cross_navy.svg',        width: 26, style: { bottom: '3%',  right: '2%',   opacity: 0.34 } },
    { src: '/assets/decor/decor_diagonal_line_lime_blue.svg', width: 48, style: { top: '44%',    left: '0.8%',  opacity: 0.26 } },
  ],
  b: [ // Skills
    { src: '/assets/decor/decor_dot_grid_5x4_lime.svg',       width: 72, style: { top: '3%',     left: '1.5%',  opacity: 0.36 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 32, style: { top: '3%',     right: '2%',   opacity: 0.44 } },
    { src: '/assets/decor/plus_pink.svg',                     width: 22, style: { bottom: '3%',  left: '2%',    opacity: 0.40 } },
    { src: '/assets/decor/decor_small_cross_navy.svg',        width: 26, style: { bottom: '3%',  right: '2%',   opacity: 0.32 } },
    { src: '/assets/decor/plus_cyan.svg',                     width: 22, style: { top: '45%',    right: '1.2%', opacity: 0.38 } },
  ],
  c: [ // Projects
    { src: '/assets/decor/decor_dot_grid_6x5_blue.svg',       width: 76, style: { top: '3%',     left: '1.5%',  opacity: 0.26 } },
    { src: '/assets/decor/square_blue.svg',                   width: 26, style: { top: '3%',     right: '2%',   opacity: 0.36 } },
    { src: '/assets/decor/slashes_purple.svg',                width: 88, style: { bottom: '3%',  right: '1.5%', opacity: 0.24 } },
    { src: '/assets/decor/square_cyan.svg',                   width: 22, style: { bottom: '3%',  left: '2%',    opacity: 0.30 } },
    { src: '/assets/decor/plus_purple.svg',                   width: 22, style: { top: '44%',    right: '1.2%', opacity: 0.34 } },
  ],
  d: [ // Experience
    { src: '/assets/decor/decor_diagonal_line_lime_blue.svg', width: 52, style: { top: '3%',     left: '1.5%',  opacity: 0.28 } },
    { src: '/assets/decor/decor_dot_grid_10x4_blue.svg',      width: 96, style: { top: '3%',     right: '1.5%', opacity: 0.20 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 32, style: { bottom: '3%',  left: '2%',    opacity: 0.38 } },
    { src: '/assets/decor/decor_small_cross_navy.svg',        width: 26, style: { bottom: '3%',  right: '2%',   opacity: 0.32 } },
    { src: '/assets/decor/slashes_purple.svg',                width: 76, style: { top: '44%',    right: '0.8%', opacity: 0.22 } },
  ],
  e: [ // Contact
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 38, style: { top: '3%',     left: '2%',    opacity: 0.46 } },
    { src: '/assets/decor/decor_corner_brackets_square.svg',  width: 62, style: { top: '3%',     right: '1.5%', opacity: 0.22 } },
    { src: '/assets/decor/decor_plus_lime.svg',               width: 26, style: { bottom: '10%', left: '2%',    opacity: 0.44 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 28, style: { bottom: '10%', right: '2%',   opacity: 0.34 } },
    { src: '/assets/decor/square_pink.svg',                   width: 22, style: { top: '44%',    right: '1.2%', opacity: 0.34 } },
  ],
}

export function Atmo({ variant = 'a', tone = 'cool' }: { variant?: string; tone?: string }) {
  const decors = VARIANT_DECORS[variant] ?? []
  return (
    <div className={`atmo atmo-${variant} atmo-${tone}`} aria-hidden="true">
      <div className="atmo-grid" />
      <div className="atmo-blob b1" />
      <div className="atmo-blob b2" />
      <div className="atmo-blob b3" />
      <div className="atmo-noise" />
      {decors.map((d, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={d.src} alt="" className="bg-decor" width={d.width} style={d.style} draggable={false} />
      ))}
    </div>
  )
}

export function PixStar({ size = 16, color = '#4367FF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ imageRendering: 'pixelated' }}>
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
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ imageRendering: 'pixelated' }}>
      <rect x="4" y="0" width="4" height="12" fill={color} />
      <rect x="0" y="4" width="12" height="4" fill={color} />
    </svg>
  )
}

export function DiagSlash({ width = 48, height = 12, color = 'rgba(67,103,255,0.35)' }: { width?: number; height?: number; color?: string }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={i * 10 + 2} y1={0} x2={i * 10 - 2} y2={height} stroke={color} strokeWidth="1.5" />
      ))}
    </svg>
  )
}

export function CornerFrame({ size = 24, color = '#4367FF', thickness = 2 }: { size?: number; color?: string; thickness?: number }) {
  return (
    <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`} fill="none" aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <polyline points={`0,${size} 0,0 ${size},0`} stroke={color} strokeWidth={thickness} fill="none" />
      <polyline points={`${size},0 ${size * 2},0 ${size * 2},${size}`} stroke={color} strokeWidth={thickness} fill="none" />
      <polyline points={`0,${size} 0,${size * 2} ${size},${size * 2}`} stroke={color} strokeWidth={thickness} fill="none" />
      <polyline points={`${size},${size * 2} ${size * 2},${size * 2} ${size * 2},${size}`} stroke={color} strokeWidth={thickness} fill="none" />
    </svg>
  )
}

export function PixelDotBlock({ cols = 6, rows = 4, gap = 8, dotSize = 2, color = 'rgba(67,103,255,0.5)' }: {
  cols?: number; rows?: number; gap?: number; dotSize?: number; color?: string
}) {
  const w = cols * gap
  const h = rows * gap
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect key={`${r}-${c}`} x={c * gap + (gap - dotSize) / 2} y={r * gap + (gap - dotSize) / 2} width={dotSize} height={dotSize} fill={color} />
        ))
      )}
    </svg>
  )
}
