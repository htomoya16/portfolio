import type { CSSProperties } from 'react'

export type DecorDef = { src: string; width: number; style: CSSProperties }

/**
 * 背景に散らす SVG の装飾。カードや文字と重ならないよう、すべて余白（パディング帯）に置く。
 * left/right: 0.8〜3%（左右の余白内）、top/bottom: 3〜10%（上下の余白内）
 */
export const HERO_DECORS: DecorDef[] = [
  { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 34, style: { top: '4%',     left: '2%',    opacity: 0.40 } },
  { src: '/assets/decor/decor_dot_grid_8x6_blue.svg',       width: 78, style: { top: '3%',     right: '2%',   opacity: 0.24 } },
  { src: '/assets/decor/decor_small_cross_navy.svg',        width: 26, style: { bottom: '4%',  left: '2%',    opacity: 0.30 } },
  { src: '/assets/decor/plus_cyan.svg',                     width: 22, style: { bottom: '4%',  right: '2%',   opacity: 0.36 } },
  { src: '/assets/decor/decor_slash_logo_marks.svg',        width: 68, style: { top: '44%',    left: '1%',    opacity: 0.20 } },
]

/** Atmo の variant ごとの装飾。並び順はページ上のセクションの順（a: About 〜 e: Contact） */
export const SECTION_DECORS = {
  a: [ // About
    { src: '/assets/decor/decor_dot_grid_8x6_blue.svg',       width: 80, style: { top: '4%',     left: '1.5%',  opacity: 0.28 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 34, style: { top: '4%',     right: '2%',   opacity: 0.42 } },
    { src: '/assets/decor/decor_slash_logo_marks.svg',        width: 72, style: { bottom: '3%',  left: '1.5%',  opacity: 0.22 } },
    { src: '/assets/decor/decor_small_cross_navy.svg',        width: 26, style: { bottom: '3%',  right: '2%',   opacity: 0.34 } },
    { src: '/assets/decor/decor_diagonal_line_lime_blue.svg', width: 48, style: { top: '44%',    left: '0.8%',  opacity: 0.26 } },
  ],
  b: [ // Skills
    { src: '/assets/decor/decor_dot_grid_5x4_lime.svg',       width: 72, style: { top: '3%',     left: '1.5%',  opacity: 0.36 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 32, style: { top: '3%',     right: '2%',   opacity: 0.44 } },
    { src: '/assets/decor/plus_pink.svg',                     width: 22, style: { bottom: '3%',  left: '2%',    opacity: 0.40 } },
    { src: '/assets/decor/decor_small_cross_navy.svg',        width: 26, style: { bottom: '3%',  right: '2%',   opacity: 0.32 } },
    { src: '/assets/decor/plus_cyan.svg',                     width: 22, style: { top: '45%',    right: '1.2%', opacity: 0.38 } },
  ],
  c: [ // Projects
    { src: '/assets/decor/decor_dot_grid_6x5_blue.svg',       width: 76, style: { top: '3%',     left: '1.5%',  opacity: 0.26 } },
    { src: '/assets/decor/square_blue.svg',                   width: 26, style: { top: '3%',     right: '2%',   opacity: 0.36 } },
    { src: '/assets/decor/slashes_purple.svg',                width: 88, style: { bottom: '3%',  right: '1.5%', opacity: 0.24 } },
    { src: '/assets/decor/square_cyan.svg',                   width: 22, style: { bottom: '3%',  left: '2%',    opacity: 0.30 } },
    { src: '/assets/decor/plus_purple.svg',                   width: 22, style: { top: '44%',    right: '1.2%', opacity: 0.34 } },
  ],
  d: [ // Experience
    { src: '/assets/decor/decor_diagonal_line_lime_blue.svg', width: 52, style: { top: '3%',     left: '1.5%',  opacity: 0.28 } },
    { src: '/assets/decor/decor_dot_grid_10x4_blue.svg',      width: 96, style: { top: '3%',     right: '1.5%', opacity: 0.20 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 32, style: { bottom: '3%',  left: '2%',    opacity: 0.38 } },
    { src: '/assets/decor/decor_small_cross_navy.svg',        width: 26, style: { bottom: '3%',  right: '2%',   opacity: 0.32 } },
    { src: '/assets/decor/slashes_purple.svg',                width: 76, style: { top: '44%',    right: '0.8%', opacity: 0.22 } },
  ],
  e: [ // Contact
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 38, style: { top: '3%',     left: '2%',    opacity: 0.46 } },
    { src: '/assets/decor/decor_corner_brackets_square.svg',  width: 62, style: { top: '3%',     right: '1.5%', opacity: 0.22 } },
    { src: '/assets/decor/decor_plus_lime.svg',               width: 26, style: { bottom: '10%', left: '2%',    opacity: 0.44 } },
    { src: '/assets/decor/decor_sparkle_diamond_blue.svg',    width: 28, style: { bottom: '10%', right: '2%',   opacity: 0.34 } },
    { src: '/assets/decor/square_pink.svg',                   width: 22, style: { top: '44%',    right: '1.2%', opacity: 0.34 } },
  ],
} satisfies Record<string, DecorDef[]>

export type AtmoVariant = keyof typeof SECTION_DECORS
