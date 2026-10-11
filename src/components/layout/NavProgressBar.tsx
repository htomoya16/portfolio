'use client'

import { useScrollProgress } from '@/hooks/use-scroll-progress'
import styles from './NavBar.module.css'

export default function NavProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      aria-hidden="true"
      className={styles.progress}
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
