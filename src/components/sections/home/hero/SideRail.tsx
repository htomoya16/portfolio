import styles from './Hero.module.css'

/** Hero の左端に置く縦書きの「SCROLL」 */
export default function SideRail() {
  return (
    <div className={styles.sideRail} aria-hidden="true">
      <span className={styles.sideRailLabel}>SCROLL</span>
      <div className={styles.sideRailLine} />
      <div className={styles.sideRailDiamond} />
    </div>
  )
}
