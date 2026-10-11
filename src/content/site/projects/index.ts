import { chatclub } from './chatclub'
import { comingSoon } from './comingSoon'
import { hapticPiano } from './hapticPiano'
import { hpcPortal } from './hpcPortal'
import { lovender } from './lovender'
import type { Project } from './types'
import { wakeOnLan } from './wakeOnLan'

export { projectModalCopy, projectsCopy } from './copy'
export type * from './types'

/** 表示順に並べたプロジェクト。番号（num）もこの順に振る */
export const projects: Project[] = [wakeOnLan, lovender, hpcPortal, hapticPiano, chatclub, comingSoon]

/** 準備中のプレースホルダーか。作品数に数えず、詳細モーダルも開かない */
export function isComingSoon(project: Project) {
  return project.status === 'COMING SOON'
}
