export type ProjectMedia = {
  type: 'image' | 'video'
  src: string
  poster?: string
  orientation?: 'landscape' | 'portrait' | 'square'
  alt: string
  caption?: string
}

export type ProjectPreviewImage = {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
}

export type ProjectTechReason = {
  name: string
  reason: string
}

export type ProjectDevFeature = {
  name: string
  owner: 'self' | 'teammate'
  // 自分が担当した機能だけ、表の下に「できること」として表示する
  summary?: string
}

export interface Project {
  num: string
  title: string
  desc: string
  longDesc?: string
  tags: string[]
  techReasons?: ProjectTechReason[]
  previewImage?: ProjectPreviewImage
  media?: ProjectMedia[]
  role?: string
  period?: string
  projectType?: string
  duration?: string
  status?: string
  features?: string[]
  repoUrl?: string
  liveUrl?: string
  liveLabel?: string
  demoUrl?: string
  demoLabel?: string
  // Detail sections
  background?: string
  devContent?: string
  devFeatures?: ProjectDevFeature[]
  highlights?: string[]
  challenges?: Array<{ problem: string; solution: string }>
  // 'stack' は苦労した点を1列で縦に並べる（既定は2列）
  challengesLayout?: 'grid' | 'stack'
  learnings?: string[]
}
