// Server component — inline SVG tech icons for the Skills section

export function ReactIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-label="React">
      <ellipse cx="10" cy="10" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse cx="10" cy="10" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 10 10)" />
      <ellipse cx="10" cy="10" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 10 10)" />
      <circle cx="10" cy="10" r="2" fill="#61DAFB" />
    </svg>
  )
}

export function NextJsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-label="Next.js">
      <rect width="16" height="16" rx="8" fill="#000" />
      <path d="M5 11.5V4.5L12 11.5V8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TailwindIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-label="Tailwind CSS">
      <path
        d="M10 5C8 5 6.5 6 6 8C6.5 7 7.25 6.5 8 6.75C8.5 6.9 8.75 7.25 9.25 7.5C10.25 8.25 11.25 9 13 9C15 9 16.5 8 17 6C16.5 7 15.75 7.5 15 7.25C14.5 7.1 14.25 6.75 13.75 6.5C12.75 5.75 11.75 5 10 5Z"
        fill="#38BDF8"
      />
      <path
        d="M7 11C5 11 3.5 12 3 14C3.5 13 4.25 12.5 5 12.75C5.5 12.9 5.75 13.25 6.25 13.5C7.25 14.25 8.25 15 10 15C12 15 13.5 14 14 12C13.5 13 12.75 13.5 12 13.25C11.5 13.1 11.25 12.75 10.75 12.5C9.75 11.75 8.75 11 7 11Z"
        fill="#38BDF8"
      />
    </svg>
  )
}

export function NodeJsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-label="Node.js">
      <path
        d="M10 2L17 6V14L10 18L3 14V6L10 2Z"
        fill="#68A063"
      />
      <text x="6" y="13" fontFamily="monospace" fontSize="7" fill="#fff" fontWeight="bold">JS</text>
    </svg>
  )
}

export function VercelIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-label="Vercel">
      <path d="M8 2L15 14H1L8 2Z" fill="#fff" />
    </svg>
  )
}

export function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-label="GitHub">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
        fill="#fff"
      />
    </svg>
  )
}
