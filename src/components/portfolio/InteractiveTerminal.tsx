'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTerminalStore, type SectionId } from '@/lib/terminal-store'
import { contactInfo, contactLinks } from '@/data/portfolio'

// ─── Types ───────────────────────────────────────────────────

interface TerminalLine {
  id: number
  content: string
  type: 'output' | 'command' | 'error' | 'success' | 'info' | 'ascii'
}

// ─── Constants ───────────────────────────────────────────────

const PROMPT = '┌──(johnny㉿kali)-[~]\n└─$ '

const BANNER = [
  '',
  '  ╔═══════════════════════════════════════════════════════╗',
  '  ║                                                       ║',
  '  ║   ██╗  ██╗ █████╗  ██████╗  ██████╗ ██╗   ██╗       ║',
  '  ║   ██║  ██║██╔══██╗██╔════╝ ██╔════╝ ╚██╗ ██╔╝       ║',
  '  ║   ███████║███████║██║  ███╗██║  ███╗  ╚████╔╝        ║',
  '  ║   ██╔══██║██╔══██║██║   ██║██║   ██║   ╚██╔╝         ║',
  '  ║   ██║  ██║██║  ███║╚██████╔╝╚██████╔╝   ██║          ║',
  '  ║   ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝   ╚═╝          ║',
  '  ║                                                       ║',
  '  ║   A L E J A N D R O                                 ║',
  '  ║   Infraestrutura & Cyber Security                    ║',
  '  ║   Rio de Janeiro, RJ — Brasil                       ║',
  '  ║                                                       ║',
  '  ╚═══════════════════════════════════════════════════════╝',
  '',
]

const HELP_TEXT = [
  '',
  '  COMANDOS DISPONÍVEIS:',
  '  ─────────────────────────────────────────────────',
  '  help          Mostra esta tela de ajuda',
  '  about         Seção: Sobre Mim',
  '  skills        Seção: Habilidades & Competências',
  '  experience    Seção: Experiência Profissional',
  '  projects      Seção: Projetos de Desenvolvimento',
  '  infra         Seção: Projetos de Infraestrutura',
  '  certs         Seção: Certificações',
  '  contact       Seção: Contato',
  '  whoami        Informações rápidas sobre mim',
  '  social        Links para redes sociais',
  '  download      Baixar currículo (PDF)',
  '  ls            Listar seções disponíveis',
  '  banner        Mostrar o banner inicial',
  '  all           Revelar todas as seções',
  '  clear         Limpar o terminal',
  '',
]

const WHOAMI_TEXT = [
  '',
  '  ┌─ USUÁRIO ─────────────────────────────────────┐',
  '  │  Nome:     Johnny Alejandro                    │',
  `  │  Cargo:    Assistente de TI — Especialista     │`,
  `  │            em Suporte N2/N3 & Infraestrutura   │`,
  `  │  Empresa:  Clima Rio                           │`,
  `  │  Local:    ${contactInfo.location.padEnd(37)}│`,
  `  │  Email:    ${contactInfo.email.padEnd(37)}│`,
  `  │  GitHub:   ${contactInfo.github.replace('https://', '').padEnd(37)}│`,
  `  │  LinkedIn: ${contactInfo.linkedin.replace('https://', '').padEnd(37)}│`,
  '  └───────────────────────────────────────────────┘',
  '',
]

const SOCIAL_TEXT = [
  '',
  '  REDES SOCIAIS:',
  '  ─────────────────────────────────────────────────',
  ...contactLinks.map(
    (l) => `  ${l.name.padEnd(14)} → ${l.href}`
  ),
  '',
]

const LS_TEXT = [
  '',
  '  SEÇÕES DISPONÍVEIS:',
  '  ─────────────────────────────────────────────────',
  '  drwxr-xr-x  about/         Sobre Mim',
  '  drwxr-xr-x  skills/        Habilidades & Competências',
  '  drwxr-xr-x  experience/    Experiência Profissional',
  '  drwxr-xr-x  projects/      Projetos de Desenvolvimento',
  '  drwxr-xr-x  infra/         Projetos de Infraestrutura',
  '  drwxr-xr-x  certs/         Certificações',
  '  drwxr-xr-x  contact/       Contato',
  '',
]

// Section name mapping
const SECTION_LABELS: Record<string, string> = {
  about: 'Sobre Mim',
  skills: 'Habilidades & Competências',
  experience: 'Experiência Profissional',
  dev: 'Projetos de Desenvolvimento',
  infra: 'Projetos de Infraestrutura',
  certs: 'Certificações',
  contact: 'Contato',
}

// Command → section mapping
const CMD_TO_SECTION: Record<string, SectionId> = {
  about: 'about',
  skills: 'skills',
  experience: 'experience',
  exp: 'experience',
  projects: 'dev',
  dev: 'dev',
  infra: 'infra',
  certs: 'certs',
  certifications: 'certs',
  contact: 'contact',
}

// ─── Component ──────────────────────────────────────────────

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const lineIdRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { revealSection, revealAll, isSectionRevealed } = useTerminalStore()

  // Generate unique ID for each line
  const nextId = useCallback(() => ++lineIdRef.current, [])

  // Add a line to the output
  const addLine = useCallback((content: string, type: TerminalLine['type'] = 'output') => {
    setLines((prev) => [...prev, { id: nextId(), content, type }])
  }, [nextId])

  // Add multiple lines
  const addLines = useCallback((contents: string[], type: TerminalLine['type'] = 'output') => {
    setLines((prev) => [
      ...prev,
      ...contents.map((content) => ({ id: nextId(), content, type })),
    ])
  }, [nextId])

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    })
  }, [])

  // Show welcome banner on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addLines(BANNER, 'ascii')
      addLine('  Bem-vindo ao portfólio interativo. Digite \'help\' para começar.', 'info')
      addLine('', 'output')
      scrollToBottom()
    }, 300)
    return () => clearTimeout(timer)
  }, [addLines, addLine, scrollToBottom])

  // Auto-scroll on new lines
  useEffect(() => {
    scrollToBottom()
  }, [lines, scrollToBottom])

  // Focus input on click anywhere in terminal
  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  // Handle command execution
  const executeCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase()
      const trimmed = raw.trim()

      // Add the command line
      addLine(PROMPT + trimmed, 'command')

      // Add to history
      if (trimmed) {
        setHistory((prev) => [...prev, trimmed])
        setHistoryIdx(-1)
      }

      if (!cmd) return

      // ─── EASTER EGGS ───
      if (cmd === 'sudo rm -rf /' || cmd === 'rm -rf /') {
        addLines([
          '',
          '  🛡️ Access Denied. Este portfólio tem backup.',
          '',
        ], 'error')
        return
      }

      if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
        addLines([
          '',
          '  🔒 Nice try. [sudo] senha para johnny: Access Denied.',
          '',
        ], 'error')
        return
      }

      if (cmd === 'hack' || cmd === 'hacking') {
        addLines([
          '',
          '  ⚡ Isso não funciona assim... mas eu posso te ensinar!',
          '  Digite \'experience\' para ver minha trajetória em Cyber Security.',
          '',
        ], 'info')
        return
      }

      if (cmd === 'exit' || cmd === 'quit') {
        addLines([
          '',
          '  😈 Não há saída deste portfólio. Explore mais!',
          '',
        ], 'info')
        return
      }

      if (cmd === 'matrix') {
        addLines([
          '',
          '  🟢 01001000 01100101 01101100 01101100 01101111',
          '  🟢 Digite \'help\' para comandos úteis.',
          '',
        ], 'info')
        return
      }

      // ─── NAVIGATION COMMANDS ───
      if (cmd === 'help') {
        addLines(HELP_TEXT, 'info')
        return
      }

      if (cmd === 'banner') {
        addLines(BANNER, 'ascii')
        return
      }

      if (cmd === 'whoami') {
        addLines(WHOAMI_TEXT, 'info')
        return
      }

      if (cmd === 'social') {
        addLines(SOCIAL_TEXT, 'info')
        return
      }

      if (cmd === 'ls') {
        addLines(LS_TEXT, 'info')
        return
      }

      if (cmd === 'clear' || cmd === 'cls') {
        setLines([])
        return
      }

      if (cmd === 'all') {
        revealAll()
        addLines([
          '',
          '  ✅ Todas as seções reveladas! Role para baixo para explorar.',
          '',
        ], 'success')
        return
      }

      if (cmd === 'download' || cmd === 'download-cv' || cmd === 'cv') {
        // Trigger download
        const link = document.createElement('a')
        link.href = '/curriculo_johnny_alejandro.pdf'
        link.download = 'Curriculo_Johnny_Alejandro.pdf'
        link.click()
        addLines([
          '',
          '  📎 Download do currículo iniciado...',
          '  (Se o arquivo não existir ainda, ignore este aviso.)',
          '',
        ], 'success')
        return
      }

      // ─── SECTION REVEAL COMMANDS ───
      const sectionId = CMD_TO_SECTION[cmd]
      if (sectionId) {
        const alreadyRevealed = isSectionRevealed(sectionId)
        if (alreadyRevealed) {
          addLines([
            '',
            `  ℹ️  Seção "${SECTION_LABELS[sectionId]}" já está visível.`,
            '',
          ], 'info')
        } else {
          revealSection(sectionId)
          addLines([
            '',
            `  ✅ Seção "${SECTION_LABELS[sectionId]}" revelada — role para baixo!`,
            '',
          ], 'success')

          // Scroll to the revealed section after a brief delay
          setTimeout(() => {
            const el = document.getElementById(sectionId)
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 400)
        }
        return
      }

      // ─── UNKNOWN COMMAND ───
      addLines([
        '',
        `  ❌ Comando não encontrado: ${trimmed}`,
        '  Digite \'help\' para ver os comandos disponíveis.',
        '',
      ], 'error')
    },
    [addLine, addLines, revealSection, revealAll, isSectionRevealed]
  )

  // Handle form submit
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      executeCommand(input)
      setInput('')
    },
    [executeCommand, input]
  )

  // Handle keyboard
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (history.length === 0) return
        const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
        setHistoryIdx(newIdx)
        setInput(history[newIdx])
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIdx === -1) return
        const newIdx = historyIdx + 1
        if (newIdx >= history.length) {
          setHistoryIdx(-1)
          setInput('')
        } else {
          setHistoryIdx(newIdx)
          setInput(history[newIdx])
        }
      }
    },
    [history, historyIdx]
  )

  // Color mapping for line types
  const lineColor: Record<TerminalLine['type'], string> = {
    output: 'text-[#8b7fa0]',
    command: 'text-green-400/90',
    error: 'text-red-400/90',
    success: 'text-emerald-400/90',
    info: 'text-[#b97aff]',
    ascii: 'text-[#b97aff]/70',
  }

  return (
    <div
      className="flex flex-col h-full min-h-0 cursor-text"
      onClick={handleTerminalClick}
    >
      {/* Terminal content area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 sm:px-5 sm:py-4"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`${lineColor[line.type]} whitespace-pre-wrap font-mono text-[11px] sm:text-xs leading-relaxed`}
          >
            {line.content}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="shrink-0 border-t border-[#1e1630]/60 bg-[#0a0710]/50 px-4 py-3 sm:px-5">
        <form onSubmit={handleSubmit} className="flex items-start gap-0">
          <span className="font-mono text-[11px] sm:text-xs text-green-400/80 whitespace-pre select-none leading-relaxed">
            {PROMPT}
          </span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent font-mono text-[11px] sm:text-xs text-green-400/90 outline-none leading-relaxed caret-[#b97aff]"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
          </div>
        </form>
      </div>
    </div>
  )
}