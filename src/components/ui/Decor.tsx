// Server component — pixel/atmosphere decoration primitives

export function Atmo({ variant = 'a', tone = 'cool' }: { variant?: string; tone?: string }) {
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
