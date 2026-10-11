'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { scrollToSection } from '@/lib/scrollToSection'
import { toggleTerminalFx } from '@/lib/screenFx'
import styles from './CommandPalette.module.css'

const CMD_SECTIONS = ['about', 'skills', 'projects', 'experience', 'contact']
/** 表示しておく行数の上限 */
const MAX_LINES = 16

type CmdLine = { t: string; prompt?: boolean }

const isTyping = (target: EventTarget | null) => {
  const tag = (target as HTMLElement | null)?.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA'
}

/** `/` キーで開くターミナル風のコマンド入力（隠し要素）。`negi` コマンドで onCallNegi を呼ぶ */
export default function CommandPalette({ onCallNegi }: { onCallNegi: () => void }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [lines, setLines] = useState<CmdLine[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === '/' && !isTyping(e.target)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [lines, open])

  const run = (raw: string) => {
    const c = raw.trim()
    if (!c) return
    const out: string[] = []
    const parts = c.split(/\s+/)
    const cmd = parts[0]
    const low = c.toLowerCase()

    if (low === 'help') out.push('help / whoami / ls / cd <section> / negi / theme / clear / exit')
    else if (low === 'whoami')
      out.push(
        'HOTTA TOMOYA — Backend-focused Web Engineer',
        '東京電機大学大学院 理工学研究科 情報学専攻',
      )
    else if (low === 'ls') out.push(CMD_SECTIONS.map((s) => `${s}/`).join('  '))
    else if (cmd === 'cd') {
      const t = (parts[1] || '').replace(/\/$/, '').toLowerCase()
      if (!t || t === '~' || t === 'hero') {
        scrollToSection('hero')
        out.push('→ ~/')
      } else if (CMD_SECTIONS.includes(t)) {
        scrollToSection(t)
        out.push(`→ ~/${t}`)
      } else out.push(`cd: no such section: ${t}`)
    } else if (low === 'negi') {
      out.push('ネギ「呼んだ？」')
      onCallNegi()
    } else if (low === 'theme' || low === 'theme terminal') {
      out.push(`terminal mode: ${toggleTerminalFx() ? 'ON' : 'OFF'}`)
    } else if (low === 'konami') out.push('hint: ↑ ↑ ↓ ↓ ← → ← → B A')
    else if (low === 'clear') {
      setLines([])
      setValue('')
      return
    } else if (low === 'exit') {
      setOpen(false)
      setValue('')
      return
    } else if (cmd === 'sudo') out.push('Nice try.')
    else out.push(`command not found: ${cmd} — try 'help'`)

    setValue('')
    setLines((prev) => prev.concat([{ t: `❯ ${c}`, prompt: true }], out.map((t) => ({ t }))).slice(-MAX_LINES))
  }

  if (!open) return null

  return (
    <div className={styles.palette} role="dialog" aria-label="Command palette">
      <div className={styles.head}>
        <span>htomoya16@portfolio: ~</span>
        <span>ESC で閉じる</span>
      </div>
      <div ref={logRef} className={styles.log}>
        {lines.map((line, i) => (
          <div key={i} className={clsx(styles.line, line.prompt && styles.prompt)}>
            {line.t}
          </div>
        ))}
      </div>
      <div className={styles.inputRow}>
        <span className={styles.caret}>❯</span>
        <input
          ref={inputRef}
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') run(e.currentTarget.value)
          }}
          placeholder="type 'help'"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  )
}
