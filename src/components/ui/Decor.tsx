import type { CSSProperties } from 'react'

/* Floating pixel star */
export function PixStar({ size = 14, color = '#2547E6' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 7 7" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
      <rect x="3" y="0" width="1" height="1" fill={color}/>
      <rect x="2" y="1" width="3" height="1" fill={color}/>
      <rect x="0" y="2" width="7" height="1" fill={color}/>
      <rect x="0" y="3" width="7" height="1" fill={color}/>
      <rect x="0" y="4" width="7" height="1" fill={color}/>
      <rect x="1" y="5" width="2" height="1" fill={color}/>
      <rect x="4" y="5" width="2" height="1" fill={color}/>
      <rect x="0" y="6" width="2" height="1" fill={color}/>
      <rect x="5" y="6" width="2" height="1" fill={color}/>
    </svg>
  )
}

/* Pixel plus / sparkle */
export function PixPlus({ size = 12, color = '#2547E6' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 5 5" shapeRendering="crispEdges">
      <rect x="2" y="0" width="1" height="5" fill={color}/>
      <rect x="0" y="2" width="5" height="1" fill={color}/>
      <rect x="1" y="1" width="3" height="3" fill={color}/>
    </svg>
  )
}

/* Pixel diamond */
export function PixDiamond({ size = 14, color = '#2547E6' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 7 7" shapeRendering="crispEdges">
      <rect x="3" y="0" width="1" height="1" fill={color}/>
      <rect x="2" y="1" width="3" height="1" fill={color}/>
      <rect x="1" y="2" width="5" height="1" fill={color}/>
      <rect x="0" y="3" width="7" height="1" fill={color}/>
      <rect x="1" y="4" width="5" height="1" fill={color}/>
      <rect x="2" y="5" width="3" height="1" fill={color}/>
      <rect x="3" y="6" width="1" height="1" fill={color}/>
    </svg>
  )
}

/* Diagonal tick lines — /// pattern */
export function DiagTicks({
  width = 60, height = 20, color = '#2547E6', count = 5,
}: { width?: number; height?: number; color?: string; count?: number }) {
  const step = width / count
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      {Array.from({ length: count }).map((_, i) => (
        <line key={i} x1={i * step} y1={height} x2={i * step + height * 0.7} y2={0} stroke={color} strokeWidth="1.5"/>
      ))}
    </svg>
  )
}

/* Thin diagonal slash */
export function DiagSlash({
  length = 80, thickness = 2, color = '#2547E6', style = {},
}: { length?: number; thickness?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg
      width={length} height={length} viewBox={`0 0 ${length} ${length}`}
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
    >
      <line x1={length} y1={0} x2={0} y2={length} stroke={color} strokeWidth={thickness}/>
    </svg>
  )
}

/* Dotted pixel block */
export function PixelDotBlock({
  color = '#2547E6', size = 3, gap = 6, cols = 5, rows = 3, style = {},
}: { color?: string; size?: number; gap?: number; cols?: number; rows?: number; style?: CSSProperties }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, ${size}px)`,
      gap: `${gap - size}px`,
      ...style,
    }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} style={{ width: size, height: size, background: color }}/>
      ))}
    </div>
  )
}
