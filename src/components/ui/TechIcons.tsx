export function TSIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="6" fill="#3178C6"/>
      <text x="22" y="30" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="17" fontWeight="800" fill="#fff">TS</text>
    </svg>
  )
}

export function ReactIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="3" fill="#61DAFB"/>
      <g fill="none" stroke="#61DAFB" strokeWidth="1.5">
        <ellipse cx="22" cy="22" rx="13" ry="5"/>
        <ellipse cx="22" cy="22" rx="13" ry="5" transform="rotate(60 22 22)"/>
        <ellipse cx="22" cy="22" rx="13" ry="5" transform="rotate(120 22 22)"/>
      </g>
    </svg>
  )
}

export function NextIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="20" fill="#0A0E1A"/>
      <text x="22" y="31" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="900" fontStyle="italic" fill="#fff">N</text>
    </svg>
  )
}

export function NodeIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <polygon points="22,4 38,13 38,31 22,40 6,31 6,13" fill="#3DDC84"/>
      <text x="22" y="28" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="900" fill="#fff">N</text>
    </svg>
  )
}

export function TailwindIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="6" fill="#fff"/>
      <path d="M 8 22 Q 13 13, 18 18 Q 22 22, 26 22 Q 30 22, 30 18 Q 26 22, 22 18 Q 18 14, 13 14 Q 9 14, 8 22 Z" fill="#38BDF8"/>
      <path d="M 15 30 Q 20 21, 25 26 Q 29 30, 33 30 Q 37 30, 37 26 Q 33 30, 29 26 Q 25 22, 20 22 Q 16 22, 15 30 Z" fill="#38BDF8"/>
    </svg>
  )
}

export function FigmaIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="4"  width="10" height="10" rx="5" fill="#F24E1E"/>
      <rect x="24" y="4"  width="10" height="10" rx="5" fill="#FF7262"/>
      <rect x="14" y="14" width="10" height="10" rx="5" fill="#A259FF"/>
      <rect x="24" y="14" width="10" height="10" rx="5" fill="#1ABCFE"/>
      <rect x="14" y="24" width="10" height="10" rx="5" fill="#0ACF83"/>
    </svg>
  )
}

export const TECH_ICONS = {
  ts:      TSIcon,
  react:   ReactIcon,
  next:    NextIcon,
  node:    NodeIcon,
  tailwind: TailwindIcon,
  figma:   FigmaIcon,
} as const
