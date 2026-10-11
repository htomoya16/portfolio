import clsx from 'clsx'
import styles from './CornerBrackets.module.css'

const CORNERS = ['tl', 'tr', 'bl', 'br'] as const

/** カードの四隅に置く青いカギ括弧。親は position: relative にする */
export default function CornerBrackets({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return CORNERS.map((corner) => (
    <span key={corner} className={clsx(styles.corner, size === 'sm' && styles.sm, styles[corner])} />
  ))
}
