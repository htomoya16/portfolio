'use client'

import { useScrollProgress } from '@/hooks/use-scroll-progress'

export default function NavProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      aria-hidden="true"
      className="nav-progress"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
