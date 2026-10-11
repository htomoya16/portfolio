import styles from './Atmo.module.css'
import type { DecorDef } from './decors'

/** 背景の装飾画像。useDecorMotion が data-decor を目印にスクロールで動かす */
export default function DecorImages({ decors }: { decors: DecorDef[] }) {
  return decors.map((d, i) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={i} src={d.src} alt="" className={styles.decor} width={d.width} style={d.style} draggable={false} data-decor />
  ))
}
