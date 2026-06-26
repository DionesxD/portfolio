'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Download, User, Eye } from 'lucide-react'
import { useTerminalStore, type SectionId } from '@/lib/terminal-store'
import { contactInfo, contactLinks, skills, experiences, devProjects, infraProjects, certifications, languages, stats } from '@/data/portfolio'

// ─── Types ──────────────────────────────────────────────
interface TermLine {
  id: number
  content: React.ReactNode
  type: 'input' | 'output' | 'error' | 'success' | 'ascii' | 'dim' | 'highlight'
}

// ─── Constants ──────────────────────────────────────────
const PROMPT_USER = 'DionesxD'
const PROMPT_HOST = 'kali'

const SECTION_MAP: Record<string, SectionId> = {
  about: 'about',
  sobre: 'about',
  skills: 'skills',
  skill: 'skills',
  experience: 'experience',
  exp: 'experience',
  experiencia: 'experience',
  projects: 'dev',
  project: 'dev',
  dev: 'dev',
  infra: 'infra',
  infraestrutura: 'infra',
  certs: 'certs',
  cert: 'certs',
  certificacoes: 'certs',
  contact: 'contact',
  contato: 'contact',
}

const SECTION_LABELS: Record<string, string> = {
  about: 'Sobre Mim',
  skills: 'Skills & Competências',
  experience: 'Experiência Profissional',
  dev: 'Projetos de Desenvolvimento',
  infra: 'Projetos de Infraestrutura',
  certs: 'Certificações',
  contact: 'Contato',
}

const BANNER_ART = [
  ` ____                                                       ____      `,
  `/\\  _\`\\     __                                             /\\  _\`\\    `,
  `\\ \\ \\/\\ \\  /\\_\\     ___     ___       __     ____   __  _  \\ \\ \\/\\ \\  `,
  ` \\ \\ \\ \\ \\ \\/\\ \\   / __\`\\ /' _ \`\\   /'__\`\\  /',__\\ /\\ \\/'\\  \\ \\ \\ \\ \\ `,
  `  \\ \\_\\ \\ \\ \\ \\ /\\ \\L\\ \\/\\ \\/\\ \\ /\\  __/ /\\__, \`\\\\/>  </   \\ \\ \\_\\ \\`,
  `   \\ \\____/  \\ \\_\\\\ \\____/\\ \\_\\ \\_\\\\ \\____\\\\/\\____/ /\\_/\\_\\   \\ \\____/`,
  `    \\/___/    \\/_/ \\/___/  \\/_/\\/_/ \\/____/ \\/___/  \\//\\/_/    \\/___/ `,
]

const BANNER = [
  '',
  ...BANNER_ART.map((l) => `  \x1b[35m${l}\x1b[0m`),
  '',
  "  \x1b[1m📂 /home/DionesxD\x1b[0m — \x1b[33mPortfolio Terminal v1.0\x1b[0m",
  '  Digite \x1b[36mhelp\x1b[0m para ver os comandos disponíveis.',
  '  Ou clique em \x1b[36m"Modo Visual"\x1b[0m para ver o portfólio completo.',
  '',
]

// ─── Neofetch-style info ────────────────────────────────
const NEOFETCH = () => {
  const currentExp = experiences.find(e => e.isCurrent)
  return [
    '',
    '  \x1b[36m        ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲          \x1b[0m\x1b[1mDionesxD@kali\x1b[0m',
    '  \x1b[36m       ╱                  ╲         ─────────────────\x1b[0m',
    '  \x1b[36m      ╱   \x1b[35mDionesxD Portfolio  \x1b[36m╲        \x1b[1mOS\x1b[0m: Cyber Security Pro',
    `  \x1b[36m     ╱    Terminal v1.0     ╲       \x1b[1mRole\x1b[0m: ${currentExp?.role.split('—')[0].trim() || 'N/A'}`,
    `  \x1b[36m    ╱                      ╲      \x1b[1mCompany\x1b[0m: ${currentExp?.company || 'N/A'}`,
    `  \x1b[36m   ╱   \x1b[35m█\x1b[36m  \x1b[35m█\x1b[36m  \x1b[35m█\x1b[36m  \x1b[35m█\x1b[36m  \x1b[35m█\x1b[36m     ╲     \x1b[1mLocation\x1b[0m: Rio de Janeiro, RJ`,
    `  \x1b[36m   \   \x1b[35m█\x1b[36m  \x1b[35m█\x1b[36m  \x1b[35m█\x1b[36m  \x1b[35m█\x1b[36m  \x1b[35m█\x1b[36m     ╱     \x1b[1mExperience\x1b[0m: ${stats[0].value}`,
    `  \x1b[36m    ╲                    ╱      \x1b[1mCerts\x1b[0m: ${stats[1].value}`,
    `  \x1b[36m     ╲                  ╱       \x1b[1mLanguages\x1b[0m: ${languages.map(l => l.flag + ' ' + l.name).join(', ')}`,
    '  \x1b[36m      ╲                ╱        \x1b[1mFocus\x1b[0m: SOC & Cyber Ops',
    '  \x1b[36m       ╲              ╱         \x1b[1mUptime\x1b[0m: Since 2019',
    '  \x1b[36m        ╲            ╱          \x1b[1mShell\x1b[0m: dionesxd-terminal 1.0',
    '  \x1b[36m         ╲          ╱',
    '  \x1b[36m          ╲________╱',
    '',
  ]
}

// ─── Fun facts for easter eggs ───────────────────────────
const FUN_FACTS = [
  'Um firewall pfSense pode bloquear até 2 Gbps de tráfego com regras bem configuradas.',
  'O comando "nmap -sV" faz version detection — revela qual serviço está rodando em cada porta.',
  'Wazuh é um SIEM open-source baseado em OSSEC — usado por equipes SOC no mundo todo.',
  'O protocolo WireGuard usa criptografia Curve25519 e é consideravelmente mais rápido que OpenVPN.',
  'Active Directory armazena senhas em hashes NTLM — por isso o hardening é tão importante.',
  'Zabbix pode monitorar até 100.000 dispositivos com um único server bem configurado.',
  'O campo "TTL" (Time To Live) em pacotes ICMP pode revelar o SO de origem: Linux=64, Windows=128.',
  'CVE (Common Vulnerabilities and Exposures) registrou mais de 29.000 vulnerabilidades em 2024.',
  'Um ataque "Man-in-the-Middle" pode ser mitigado com HTTPS + HSTS + Certificate Pinning.',
  'Docker containers compartilham o kernel do host — isolamento != segurança total.',
]

// ─── Command handler ────────────────────────────────────
function useCommandHandler(
  addLine: (content: React.ReactNode, type: TermLine['type']) => void,
  revealSection: (id: SectionId) => void,
  revealAll: () => void,
  clearLines: () => void,
  cmdHistory: string[],
) {
  return useCallback(
    (raw: string) => {
      const cmd = raw.trim()
      const cmdLower = cmd.trim().toLowerCase()
      const parts = cmdLower.split(/\s+/)
      const base = parts[0]
      const args = parts.slice(1).join(' ')

      if (!base) return

      // ── help ──
      if (base === 'help') {
        const lines = [
          '',
          '  \x1b[1mCOMANDOS DISPONÍVEIS:\x1b[0m',
          '  ─────────────────────────────────────────────',
          '  \x1b[36mabout\x1b[0m       → Sobre Mim',
          '  \x1b[36mskills\x1b[0m      → Habilidades & Competências',
          '  \x1b[36mexperience\x1b[0m  → Experiência Profissional',
          '  \x1b[36mprojects\x1b[0m    → Projetos de Desenvolvimento',
          '  \x1b[36minfra\x1b[0m       → Projetos de Infraestrutura',
          '  \x1b[36mcerts\x1b[0m       → Certificações',
          '  \x1b[36mcontact\x1b[0m     → Contato',
          '',
          '  \x1b[1mINFO & DIVERSÃO:\x1b[0m',
          '  ─────────────────────────────────────────────',
          '  \x1b[36mwhoami\x1b[0m      → Informações rápidas',
          '  \x1b[36mneofetch\x1b[0m    → System info',
          '  \x1b[36msocial\x1b[0m      → Redes sociais',
          '  \x1b[36mdownload\x1b[0m    → Baixar currículo (PDF)',
          '  \x1b[36mfact\x1b[0m        → Fato aleatório de cybersecurity',
          '  \x1b[36mcow say ...\x1b[0m → Vaca diz o que você quiser',
          '  \x1b[36mmatrix\x1b[0m      → 🟢 Wake up, Neo...',
          '  \x1b[36mfortune\x1b[0m     → Mensagem inspiracional',
          '  \x1b[36mcoffee\x1b[0m      → ☕ Necessário para programar',
          '',
          '  \x1b[1mFERRAMENTAS (simuladas):\x1b[0m',
          '  ─────────────────────────────────────────────',
          '  \x1b[36mnmap\x1b[0m        → Port scan (fake)',
          '  \x1b[36mping\x1b[0m        → Ping host',
          '  \x1b[36mdocker\x1b[0m      → Container management',
          '  \x1b[36mtop / htop\x1b[0m  → Process monitor',
          '  \x1b[36mifconfig\x1b[0m    → Network interfaces',
          '  \x1b[36mgit\x1b[0m         → Git status / log',
          '  \x1b[36mhistory\x1b[0m     → Histórico de comandos',
          '',
          '  \x1b[1mNAVEGAÇÃO:\x1b[0m',
          '  ─────────────────────────────────────────────',
          '  \x1b[36mls\x1b[0m          → Listar seções disponíveis',
          '  \x1b[36mbanner\x1b[0m      → Mostrar banner',
          '  \x1b[36mall\x1b[0m         → Revelar todas as seções',
          '  \x1b[36mclear\x1b[0m       → Limpar terminal',
          '',
        ]
        lines.forEach((l) => addLine(l, 'output'))
        return
      }

      // ── clear ──
      if (base === 'clear' || base === 'cls') {
        clearLines()
        return
      }

      // ── banner ──
      if (base === 'banner') {
        BANNER.forEach((l) => addLine(l, 'ascii'))
        return
      }

      // ── neofetch ──
      if (base === 'neofetch') {
        NEOFETCH().forEach((l) => addLine(l, 'output'))
        return
      }

      // ── whoami ──
      if (base === 'whoami') {
        const lines = [
          '',
          `  \x1b[1mJohnny Alejandro (DionesxD)\x1b[0m — ${contactInfo.location}`,
          `  Cargo: ${experiences.find(e => e.isCurrent)?.role || 'N/A'}`,
          `  Empresa: ${experiences.find(e => e.isCurrent)?.company || 'N/A'}`,
          `  Email: \x1b[36m${contactInfo.email}\x1b[0m`,
          `  GitHub: \x1b[36m${contactInfo.github}\x1b[0m`,
          `  Experiência: ${stats[0].value}`,
          `  Certificações: ${stats[1].value}`,
          `  Foco: ${stats[2].value}`,
          '',
        ]
        lines.forEach((l) => addLine(l, 'output'))
        return
      }

      // ── social ──
      if (base === 'social') {
        const lines = [
          '',
          '  \x1b[1mREDES SOCIAIS:\x1b[0m',
          '  ─────────────────────────────────────────────',
          `  GitHub:   \x1b[36m${contactInfo.github}\x1b[0m`,
          `  LinkedIn: \x1b[36m${contactInfo.linkedin}\x1b[0m`,
          `  Email:    \x1b[36m${contactInfo.email}\x1b[0m`,
          '',
        ]
        lines.forEach((l) => addLine(l, 'output'))
        return
      }

      // ── download ──
      if (base === 'download' || base === 'cv' || base === 'curriculo') {
        addLine('', 'output')
        addLine('  \x1b[32m[+]\x1b[0m Preparando download do currículo...', 'success')
        setTimeout(() => {
          const link = document.createElement('a')
          link.href = '/curriculo_johnny_alejandro.pdf'
          link.download = 'Curriculo_Johnny_Alejandro.pdf'
          link.click()
          addLine('  \x1b[32m[✓]\x1b[0m Download iniciado: Curriculo_Johnny_Alejandro.pdf', 'success')
        }, 800)
        return
      }

      // ── ls ──
      if (base === 'ls' || base === 'ls ' || (base === 'ls' && args)) {
        const lines = [
          '',
          '  \x1b[1mSEÇÕES DISPONÍVEIS:\x1b[0m',
          '  ─────────────────────────────────────────────',
          ...Object.entries(SECTION_LABELS).map(
            ([key, label]) => `  \x1b[36m${key.padEnd(14)}\x1b[0m ${label}`,
          ),
          '',
          '  Digite o nome da seção para revelá-la.',
          '',
        ]
        lines.forEach((l) => addLine(l, 'output'))
        return
      }

      // ── ls -la (fake) ──
      if (base === 'ls' && args.includes('-la')) {
        const lines = [
          '',
          '  \x1b[1mtotal 42\x1b[0m',
          '  drwxr-xr-x  \x1b[32mDionesxD\x1b[0m \x1b[33msoc\x1b[0m  4096 Jan 01 \x1b[36mabout/\x1b[0m',
          '  drwxr-xr-x  \x1b[32mDionesxD\x1b[0m \x1b[33msoc\x1b[0m  4096 Jan 01 \x1b[36mskills/\x1b[0m',
          '  drwxr-xr-x  \x1b[32mDionesxD\x1b[0m \x1b[33msoc\x1b[0m  4096 Jan 01 \x1b[36mexperience/\x1b[0m',
          '  drwxr-xr-x  \x1b[32mDionesxD\x1b[0m \x1b[33msoc\x1b[0m  4096 Jan 01 \x1b[36mprojects/\x1b[0m',
          '  drwxr-xr-x  \x1b[32mDionesxD\x1b[0m \x1b[33msoc\x1b[0m  4096 Jan 01 \x1b[36minfra/\x1b[0m',
          '  drwxr-xr-x  \x1b[32mDionesxD\x1b[0m \x1b[33msoc\x1b[0m  4096 Jan 01 \x1b[36mcerts/\x1b[0m',
          '  drwxr-xr-x  \x1b[32mDionesxD\x1b[0m \x1b[33msoc\x1b[0m  4096 Jan 01 \x1b[36mcontact/\x1b[0m',
          '  -rw-r--r--  \x1b[32mDionesxD\x1b[0m \x1b[33msoc\x1b[0m   420 Jan 01 \x1b[32mcurriculo.pdf\x1b[0m',
          '  -rwx------  \x1b[31mroot\x1b[0m      \x1b[31mroot\x1b[0m   666 Jan 01 \x1b[31msecrets.txt\x1b[0m \x1b[33m← Just kidding 🛡️\x1b[0m',
          '',
        ]
        lines.forEach((l) => addLine(l, 'output'))
        return
      }

      // ── all ──
      if (base === 'all') {
        addLine('', 'output')
        addLine('  \x1b[32m[+]\x1b[0m Revelando todas as seções...', 'success')
        revealAll()
        setTimeout(() => {
          addLine('  \x1b[32m[✓]\x1b[0m Todas as seções foram reveladas. Role para explorar!', 'success')
          addLine('', 'output')
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
        return
      }

      // ── pwd ──
      if (base === 'pwd') {
        addLine('', 'output')
        addLine('  \x1b[36m/home/DionesxD/portfolio\x1b[0m', 'output')
        addLine('', 'output')
        return
      }

      // ── uname ──
      if (base === 'uname' || base === 'uname') {
        addLine('', 'output')
        if (args.includes('-a')) {
          addLine('  DionesxD-Portfolio 1.0.0 x86_64 GNU/LinuxSec', 'output')
        } else {
          addLine('  DionesxD-Portfolio', 'output')
        }
        addLine('', 'output')
        return
      }

      // ── date ──
      if (base === 'date') {
        addLine('', 'output')
        addLine(`  ${new Date().toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'medium' })}`, 'output')
        addLine('', 'output')
        return
      }

      // ── ping ──
      if (base === 'ping') {
        const target = args || 'dionesxd.github.io'
        addLine('', 'output')
        addLine(`  PING ${target} (142.250.x.x): 56 data bytes`, 'output')
        addLine(`  64 bytes: icmp_seq=0 ttl=64 time=0.042 ms`, 'output')
        addLine(`  64 bytes: icmp_seq=1 ttl=64 time=0.038 ms`, 'output')
        addLine(`  64 bytes: icmp_seq=2 ttl=64 time=0.041 ms`, 'output')
        addLine('  ', 'output')
        addLine(`  --- ${target} ping statistics ---`, 'output')
        addLine('  3 packets transmitted, 3 received, \x1b[32m0% packet loss\x1b[0m', 'output')
        addLine('', 'output')
        return
      }

      // ── git commands ──
      if (base === 'git') {
        if (args === 'status') {
          addLine('', 'output')
          addLine('  On branch \x1b[32mmain\x1b[0m', 'output')
          addLine('  Your portfolio is up to date.', 'output')
          addLine('  \x1b[32mnothing to commit, working tree clean\x1b[0m ✨', 'output')
          addLine('', 'output')
          return
        }
        if (args === 'log --oneline') {
          addLine('', 'output')
          addLine('  \x1b[33ma1b2c3d\x1b[0m feat: interactive terminal portfolio', 'output')
          addLine('  \x1b[33me4f5g6h\x1b[0m feat: add cybersecurity certifications', 'output')
          addLine('  \x1b[33mi7j8k9l\x1b[0m feat: infrastructure projects section', 'output')
          addLine('  \x1b[33mm0n1o2p\x1b[0m feat: initial portfolio setup', 'output')
          addLine('', 'output')
          return
        }
        addLine('', 'output')
        addLine('  \x1b[33mgit:\x1b[0m try \x1b[36mgit status\x1b[0m or \x1b[36mgit log --oneline\x1b[0m', 'output')
        addLine('', 'output')
        return
      }

      // ── cat ──
      if (base === 'cat') {
        if (args.includes('/etc/passwd')) {
          addLine('', 'output')
          addLine('  \x1b[31mcat: /etc/passwd: Permission denied\x1b[0m', 'error')
          addLine('  \x1b[31mNice try. Esse arquivo não existe aqui. 🛡️\x1b[0m', 'error')
          addLine('', 'output')
          return
        }
        if (args.includes('/etc/shadow')) {
          addLine('', 'output')
          addLine('  \x1b[31mcat: /etc/shadow: Permission denied\x1b[0m', 'error')
          addLine('  \x1b[31mVocê acha que eu seria tão descuidado assim? 🔐\x1b[0m', 'error')
          addLine('', 'output')
          return
        }
        addLine('', 'output')
        addLine(`  \x1b[33mcat: ${args || '(missing file)'}: No such file or directory\x1b[0m`, 'error')
        addLine('', 'output')
        return
      }

      // ── cd ──
      if (base === 'cd') {
        addLine('', 'output')
        addLine('  \x1b[33mPermission denied: you can\'t leave this portfolio. 😈\x1b[0m', 'error')
        addLine('', 'output')
        return
      }

      // ── ssh ──
      if (base === 'ssh') {
        addLine('', 'output')
        addLine(`  \x1b[31mssh: connect to host ${args || 'unknown'} port 22: Connection timed out\x1b[0m`, 'error')
        addLine('  \x1b[31mFirewall pfSense bloqueou a conexão. 🔥\x1b[0m', 'error')
        addLine('', 'output')
        return
      }

      // ── nmap (fun) ──
      if (base === 'nmap') {
        addLine('', 'output')
        addLine('  Starting Nmap 7.94 ( https://nmap.org )', 'output')
        addLine('  \x1b[33mScanning dionesxd-portfolio.local...\x1b[0m', 'output')
        addLine('  ', 'output')
        addLine('  PORT      STATE  SERVICE', 'output')
        addLine('  \x1b[32m22/tcp    open   ssh\x1b[0m      (WireGuard)', 'output')
        addLine('  \x1b[32m53/tcp    open   dns\x1b[0m      (AD DNS)', 'output')
        addLine('  \x1b[32m80/tcp    open   http\x1b[0m     (Next.js)', 'output')
        addLine('  \x1b[32m443/tcp   open   https\x1b[0m    (SSL/TLS)', 'output')
        addLine('  \x1b[32m5500/tcp  open   vnc\x1b[0m      (Zabbix)', 'output')
        addLine('  \x1b[32m1514/tcp  open   wazuh\x1b[0m    (SIEM Agent)', 'output')
        addLine('  ', 'output')
        addLine('  \x1b[1mNmap done: 1 IP address (1 host up) scanned in 2.34s\x1b[0m', 'output')
        addLine('', 'output')
        return
      }

      // ── chmod ──
      if (base === 'chmod') {
        addLine('', 'output')
        addLine('  \x1b[31mchmod: changing permissions of \'portfolio\': Operation not permitted\x1b[0m', 'error')
        addLine('  \x1b[31mVocê não tem permissão para modificar este portfólio. 🛡️\x1b[0m', 'error')
        addLine('', 'output')
        return
      }

      // ── coffee ──
      if (base === 'coffee') {
        addLine('', 'output')
        addLine('  ☕ \x1b[33mBrewing...\x1b[0m', 'output')
        addLine('  \x1b[32m[████████████████████████████] 100%\x1b[0m', 'output')
        addLine('  ☕ \x1b[32mPronto! Café forte, sem açúcar.\x1b[0m', 'output')
        addLine('  \x1b[35mEste portfólio roda 100% à base de café.\x1b[0m', 'dim')
        addLine('', 'output')
        return
      }

      // ── fact ──
      if (base === 'fact' || base === 'fato') {
        const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]
        addLine('', 'output')
        addLine('  \x1b[1m💡 DID YOU KNOW:\x1b[0m', 'output')
        addLine(`  ${fact}`, 'output')
        addLine('', 'output')
        return
      }

      // ── matrix ──
      if (base === 'matrix') {
        addLine('', 'output')
        addLine('  \x1b[32mWake up, DionesxD...\x1b[0m', 'output')
        addLine('  \x1b[32mThe Matrix has you...\x1b[0m', 'output')
        addLine('  \x1b[32mFollow the white rabbit.\x1b[0m', 'output')
        addLine('  \x1b[32mKnock, knock, DionesxD.\x1b[0m', 'output')
        addLine('', 'output')
        const matrixChars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789'
        let matrixLine = '  '
        for (let i = 0; i < 60; i++) {
          matrixLine += `\x1b[32m${matrixChars[Math.floor(Math.random() * matrixChars.length)]}\x1b[0m`
        }
        addLine(matrixLine, 'output')
        addLine('', 'output')
        addLine('  \x1b[33mDigite \x1b[36mexperience\x1b[33m para escolher a pílula vermelha. 💊\x1b[0m', 'output')
        addLine('', 'output')
        return
      }

      // ── fortune ──
      if (base === 'fortune') {
        const fortunes = [
          '"A segurança é um processo, não um produto." — Bruce Schneier',
          '"As únicas redes seguras são as que estão desligadas." — Anônimo',
          '"Se você acha que tecnologia pode resolver seus problemas de segurança, você não entende os problemas e não entende a tecnologia." — Bruce Schneier',
          '"A melhor senha é aquela que você consegue lembrar, mas ninguém consegue adivinhar."',
          '"Defesa em profundidade: nunca confie em uma única camada de segurança."',
          '"O elo mais fraco de qualquer sistema de segurança é o ser humano." — Kevin Mitnick',
          '"Criptografia é a arte de transformar segredos em ruído matemático."',
        ]
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)]
        addLine('', 'output')
        addLine(`  \x1b[33m🔮 ${fortune}\x1b[0m`, 'output')
        addLine('', 'output')
        return
      }

      // ── cowsay ──
      if (base === 'cow' && args.startsWith('say')) {
        const message = args.replace(/^say\s*/, '') || 'Moo!'
        const border = '─'.repeat(message.length + 2)
        addLine('', 'output')
        addLine(`  ┌${border}┐`, 'output')
        addLine(`  │ ${message} │`, 'output')
        addLine(`  └${border}┘`, 'output')
        addLine('         \\   ^__^', 'output')
        addLine('          \\  (oo)\\_______', 'output')
        addLine('             (__)\\       )\\/\\', 'output')
        addLine('                 ||----w |', 'output')
        addLine('                 ||     ||', 'output')
        addLine('', 'output')
        return
      }

      // ── sudo ──
      if (base === 'sudo') {
        addLine('', 'output')
        addLine('  \x1b[31m[sudo] password for DionesxD: ********\x1b[0m', 'error')
        addLine('  \x1b[31mNice try. Permission denied. 🔒\x1b[0m', 'error')
        addLine('', 'output')
        return
      }

      // ── sudo apt install ──
      if (base === 'apt' || base === 'yum' || base === 'dnf') {
        addLine('', 'output')
        addLine('  \x1b[31mE: Could not open lock file — you\'re in a portfolio, not a package manager! 📦\x1b[0m', 'error')
        addLine('', 'output')
        return
      }

      // ── rm ──
      if (base === 'rm') {
        addLine('', 'output')
        addLine('  \x1b[31mI see what you did there... Access Denied. 🛡️\x1b[0m', 'error')
        addLine('', 'output')
        return
      }

      // ── hack / hacker ──
      if (base === 'hack' || base === 'hacker') {
        addLine('', 'output')
        addLine('  \x1b[33mThat\'s not how it works...\x1b[0m', 'output')
        addLine('  \x1b[33mMas eu posso te ensinar! Digite \x1b[36mexperience\x1b[33m para ver minha trajetória.\x1b[0m', 'output')
        addLine('', 'output')
        return
      }

      // ── exit / quit ──
      if (base === 'exit' || base === 'quit') {
        addLine('', 'output')
        addLine('  \x1b[35mNão há saída deste portfólio. 😈\x1b[0m', 'dim')
        addLine('  \x1b[35mTente \x1b[36mhelp\x1b[35m para explorar.\x1b[0m', 'dim')
        addLine('', 'output')
        return
      }

      // ── ping of death joke ──
      if (base === 'fork') {
        addLine('', 'output')
        addLine('  \x1b[31m⚠️ Fork bomb detected! Abortando...\x1b[0m', 'error')
        addLine('  \x1b[31m:(){ :|:& };: não vai rodar aqui. 🛡️\x1b[0m', 'error')
        addLine('', 'output')
        return
      }

      // ── docker (fun) ──
      if (base === 'docker') {
        addLine('', 'output')
        if (args.startsWith('run')) {
          addLine('  \x1b[33mUnable to find image \'portfolio:latest\' locally\x1b[0m', 'output')
          addLine('  \x1b[33mlatest: Pulling from dionesxd/portfolio\x1b[0m', 'output')
          addLine('  \x1b[32mDigest: sha256:1337c4f3...d00\x1b[0m', 'output')
          addLine('  \x1b[32mStatus: Image is up to date for dionesxd/portfolio:latest\x1b[0m', 'output')
          addLine('', 'output')
          addLine('  \x1b[1m[Container]\x1b[0m \x1b[32mdionesxd-portfolio\x1b[0m — \x1b[36mRunning\x1b[0m', 'output')
          addLine('  \x1b[1m[Ports]\x1b[0m    3000/tcp → 0.0.0.0:3000', 'output')
          addLine('  \x1b[1m[Status]\x1b[0m    \x1b[32m● Healthy\x1b[0m — Portfólio operacional! 🐳', 'output')
          addLine('', 'output')
        } else if (args.startsWith('ps')) {
          addLine('  CONTAINER ID   IMAGE                    STATUS          PORTS', 'output')
          addLine('  \x1b[32ma1b2c3d4e5f6\x1b[0m   dionesxd/portfolio:latest   \x1b[32mUp 2 hours\x1b[0m     0.0.0.0:3000->3000/tcp', 'output')
          addLine('', 'output')
        } else {
          addLine('  \x1b[33mUsage: docker [run|ps] ...\x1b[0m', 'output')
        }
        addLine('', 'output')
        return
      }

      // ── top / htop (fun) ──
      if (base === 'top' || base === 'htop') {
        addLine('', 'output')
        addLine('  \x1b[1m  PID USER      PRI  NI    VIRT    RES  %CPU %MEM     TIME+ COMMAND\x1b[0m', 'output')
        addLine('    1 root       20   0  168432  12456   0.3  0.1   2:34.21 systemd', 'output')
        addLine('  420 DionesxD   20   0   52480   8192   2.1  0.5   0:45.67 zsh', 'output')
        addLine('  666 DionesxD   20   0  412672  98304  \x1b[32m12.5\x1b[0m  2.4   5:12.89 node', 'output')
        addLine('  777 DionesxD   20   0  204800  32768   0.8  0.8   1:23.45 wazuh-agent', 'output')
        addLine('  888 root       20   0   16384   4096   0.1  0.0   0:05.67 sshd', 'output')
        addLine('  999 DionesxD   20   0   32768   6144   \x1b[33m5.2\x1b[0m  0.3   0:34.12 portfolio-', 'output')
        addLine('                                                        \x1b[33mterminal\x1b[0m', 'output')
        addLine('', 'output')
        addLine('  \x1b[1mTasks:\x1b[0m 42 total, 1 running, 41 sleeping', 'output')
        addLine('  \x1b[1m%Cpu(s):\x1b[0m 3.2 us, 1.1 sy, 0.0 ni, 95.7 id', 'output')
        addLine('  \x1b[1mMiB Mem:\x1b[0m  4096.0 total,  2847.2 free,   768.4 used,   480.4 buff/cache', 'output')
        addLine('', 'output')
        return
      }

      // ── ifconfig / ip (fun) ──
      if (base === 'ifconfig' || base === 'ip') {
        addLine('', 'output')
        addLine('  \x1b[1meth0\x1b[0m: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500', 'output')
        addLine('          inet \x1b[36m192.168.1.1337\x1b[0m  netmask 255.255.255.0  broadcast 192.168.1.255', 'output')
        addLine('          inet6 fe80::a00:27ff:fe4e:66a7  prefixlen 64  scopeid 0x20<link>', 'output')
        addLine('          ether 08:00:27:4e:66:a7  txqueuelen 1000', 'output')
        addLine('          RX packets 424242  bytes 3133731337 (3.1 GiB)', 'output')
        addLine('          TX packets 133742  bytes 42042069 (42.0 MiB)', 'output')
        addLine('', 'output')
        addLine('  \x1b[1mtun0\x1b[0m: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1420', 'output')
        addLine('          inet \x1b[36m10.8.0.2\x1b[0m  netmask 255.255.255.0  destination 10.8.0.2', 'output')
        addLine('          \x1b[35m(WireGuard VPN Tunnel — Encrypted 🔐)\x1b[0m', 'output')
        addLine('', 'output')
        return
      }

      // ── history ──
      if (base === 'history') {
        addLine('', 'output')
        if (cmdHistory.length === 0) {
          addLine('  \x1b[33m(history: empty — você ainda não digitou nenhum comando)\x1b[0m', 'output')
        } else {
          cmdHistory.forEach((cmd, i) => {
            addLine(`  \x1b[33m${String(i + 1).padStart(4)}\x1b[0m  ${cmd}`, 'output')
          })
        }
        addLine('', 'output')
        return
      }

      // ── Section commands ──
      if (SECTION_MAP[base]) {
        const sectionId = SECTION_MAP[base]
        const label = SECTION_LABELS[sectionId]
        addLine('', 'output')
        addLine(`  \x1b[32m[+]\x1b[0m Seção "${label}" revelada — role para baixo para visualizar.`, 'success')
        revealSection(sectionId)
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
        addLine('', 'output')
        return
      }

      // ── Unknown command ──
      addLine('', 'output')
      addLine(`  \x1b[31mCommand not found: ${base}\x1b[0m`, 'error')
      addLine('  Digite \x1b[36mhelp\x1b[0m para ver os comandos disponíveis.', 'output')
      addLine('', 'output')
    },
    [addLine, revealSection, revealAll, clearLines, cmdHistory],
  )
}

// ─── ANSI to JSX ────────────────────────────────────────
function renderAnsi(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < text.length) {
    if (text[i] === '\x1b' && text[i + 1] === '[') {
      const endIdx = text.indexOf('m', i + 2)
      if (endIdx === -1) {
        parts.push(text[i])
        i++
        continue
      }
      const rawCode = text.slice(i + 2, endIdx)
      i = endIdx + 1

      // Collect text until next escape
      let buffer = ''
      while (i < text.length && !(text[i] === '\x1b' && text[i + 1] === '[')) {
        buffer += text[i]
        i++
      }

      // Parse ANSI codes (support compound like "1;32")
      const codes = rawCode.split(';').map(Number)
      const isBold = codes.includes(1)
      const colorCode = codes.find(c => c >= 30 && c <= 37) || codes.find(c => c >= 40 && c <= 47)

      let colorClass = 'text-[#8b7fa0]'
      if (colorCode === 31) colorClass = 'text-red-400'
      else if (colorCode === 32) colorClass = 'text-emerald-400'
      else if (colorCode === 33) colorClass = 'text-amber-400'
      else if (colorCode === 34) colorClass = 'text-blue-400'
      else if (colorCode === 35) colorClass = 'text-purple-400'
      else if (colorCode === 36) colorClass = 'text-cyan-400'
      else if (colorCode === 37) colorClass = 'text-gray-300'
      if (isBold && colorClass === 'text-[#8b7fa0]') colorClass = 'text-white font-bold'
      else if (isBold) colorClass += ' font-bold'

      if (buffer) {
        parts.push(
          <span key={key++} className={colorClass}>
            {buffer}
          </span>,
        )
      }
    } else {
      let buffer = ''
      while (i < text.length && !(text[i] === '\x1b' && text[i + 1] === '[')) {
        buffer += text[i]
        i++
      }
      if (buffer) {
        parts.push(<span key={key++}>{buffer}</span>)
      }
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>
}

// ─── Main Component ─────────────────────────────────────
export default function Hero() {
  const [lines, setLines] = useState<TermLine[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const lineIdRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const revealSection = useTerminalStore((s) => s.revealSection)
  const revealAll = useTerminalStore((s) => s.revealAll)
  const hasRevealed = useTerminalStore((s) => s.revealedSections.size > 0)

  const addLine = useCallback((content: React.ReactNode, type: TermLine['type']) => {
    setLines((prev) => [
      ...prev,
      { id: lineIdRef.current++, content, type },
    ])
  }, [])

  const clearLines = useCallback(() => {
    setLines([])
  }, [])

  const handleCommand = useCommandHandler(addLine, revealSection, revealAll, clearLines, history)

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  // Focus input on click anywhere in terminal
  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const cmd = input.trim()
      if (!cmd) return

      addLine(
        <span>
          <span className="text-emerald-400 font-bold">
            {'┌──('}
            <span className="text-cyan-400">{PROMPT_USER}</span>
            {'㉿'}
            <span className="text-emerald-400">{PROMPT_HOST}</span>
            {')-[~]'}
            {'\n└─$ '}
          </span>
          <span className="text-white">{cmd}</span>
        </span>,
        'input',
      )

      setHistory((prev) => [...prev, cmd])
      setHistoryIdx(-1)
      setInput('')
      handleCommand(cmd)
    },
    [input, addLine, handleCommand],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHistoryIdx((prev) => {
          const next = prev + 1
          if (next < history.length) {
            setInput(history[history.length - 1 - next])
            return next
          }
          return prev
        })
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHistoryIdx((prev) => {
          const next = prev - 1
          if (next < 0) {
            setInput('')
            return -1
          }
          setInput(history[history.length - 1 - next])
          return next
        })
      }
    },
    [history],
  )

  // "Modo Visual" handler
  const handleVisualMode = useCallback(() => {
    addLine(
      <span>
        <span className="text-emerald-400 font-bold">
          {'┌──('}
          <span className="text-cyan-400">{PROMPT_USER}</span>
          {'㉿'}
          <span className="text-emerald-400">{PROMPT_HOST}</span>
          {')-[~]'}
          {'\n└─$ '}
        </span>
        <span className="text-white">all</span>
      </span>,
      'input',
    )
    addLine('', 'output')
    addLine('  \x1b[32m[+]\x1b[0m Modo Visual ativado! Revelando todas as seções...', 'success')
    revealAll()
    setTimeout(() => {
      addLine('  \x1b[32m[✓]\x1b[0m Todas as seções foram reveladas. Role para explorar!', 'success')
      addLine('', 'output')
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }, [addLine, revealAll])

  // Show banner on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      BANNER.forEach((l) => addLine(l, 'ascii'))
    }, 200)
    return () => clearTimeout(timer)
  }, [addLine])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0a0710]"
    >
      {/* Background effects */}
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b97aff]/[0.04] blur-[150px]"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8 md:px-8">
        <div className="flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:gap-8">

          {/* ── Terminal Window ── */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' as const }}
              className="flex h-[55vh] min-h-[360px] max-h-[560px] flex-col overflow-hidden rounded-xl border border-[#1e1630] bg-[#080510]/95 shadow-2xl shadow-[#b97aff]/[0.03] backdrop-blur-sm sm:h-[60vh] md:min-h-[440px] md:max-h-[580px]"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-[#1e1630] bg-[#0c0918] px-4 py-2.5 shrink-0">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="flex-1 text-center font-mono text-[11px] text-[#6b5f80]/60">
                  DionesxD@portfolio:~ — Portfolio Terminal v1.0
                </span>
              </div>

              {/* Output area */}
              <div
                ref={outputRef}
                onClick={focusInput}
                className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar p-3 font-mono text-[11px] leading-[1.6] sm:p-4 sm:text-xs sm:leading-[1.7] md:text-[13px]"
              >
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className={
                      line.type === 'input'
                        ? 'text-emerald-400/90 whitespace-pre'
                        : line.type === 'error'
                          ? 'whitespace-pre'
                          : line.type === 'success'
                            ? 'whitespace-pre'
                            : line.type === 'ascii'
                              ? 'whitespace-pre text-[#b97aff]/70'
                              : line.type === 'dim'
                                ? 'whitespace-pre'
                                : 'text-[#8b7fa0] whitespace-pre'
                    }
                  >
                    {typeof line.content === 'string'
                      ? renderAnsi(line.content)
                      : line.content}
                  </div>
                ))}

                {/* Input line — prompt on two lines, input inline with $ */}
                <form onSubmit={onSubmit} className="shrink-0">
                  <div className="text-emerald-400 font-bold">
                    {'┌──('}
                    <span className="text-cyan-400">{PROMPT_USER}</span>
                    {'㉿'}
                    <span className="text-emerald-400">{PROMPT_HOST}</span>
                    {')-[~]'}
                  </div>
                  <div className="flex">
                    <span className="text-emerald-400 font-bold whitespace-pre">{'└─$ '}</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      autoFocus
                      spellCheck={false}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      className="flex-1 min-w-0 bg-transparent font-mono text-[11px] text-white outline-none caret-[#b97aff] sm:text-xs md:text-[13px]"
                      aria-label="Terminal input"
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

          {/* ── Info Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.3 }}
            className="flex w-full flex-col gap-3 lg:w-[280px] lg:gap-4"
          >
            {/* Photo + Name — compact row on mobile */}
            <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[#b97aff]/30 bg-gradient-to-br from-[#1e1630] to-[#110d1a] shadow-lg shadow-[#b97aff]/[0.08] lg:h-32 lg:w-32">
            <img
              src="/foto.jpg"
              alt="Johnny Alejandro"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-[#b97aff]/[0.03] to-transparent" />
            </div>

              {/* Name & Title */}
              <div className="min-w-0 lg:text-center">
                <h2 className="truncate text-lg font-bold tracking-tight text-white lg:text-xl">
                  Johnny Alejandro
                </h2>
                <p className="mt-0.5 text-[11px] font-light tracking-wide text-[#8b7fa0] lg:mt-1 lg:text-xs">
                  Infraestrutura & Cyber Security
                </p>
                <p className="mt-0.5 text-[10px] text-[#6b5f80] lg:mt-1">
                  📍 Rio de Janeiro, RJ
                </p>
              </div>
            </div>

            {/* Action buttons — row on mobile */}
            <div className="flex gap-2">
              {/* Modo Visual button */}
              <button
                type="button"
                onClick={handleVisualMode}
                className="group flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#b97aff]/30 bg-[#b97aff]/[0.08] px-3 py-2.5 text-sm font-medium text-[#b97aff] transition-all hover:border-[#b97aff]/50 hover:bg-[#b97aff]/[0.15] hover:shadow-[0_0_20px_rgba(185,122,255,0.12)]"
              >
                <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Modo Visual</span>
              </button>

              {/* Download CV button */}
              <a
                href="/curriculo_johnny_alejandro.pdf"
                download="Curriculo_Johnny_Alejandro.pdf"
                className="group flex items-center justify-center gap-2 rounded-lg border border-[#1e1630] bg-[#110d1a]/80 px-3 py-2.5 text-sm font-medium text-[#8b7fa0] transition-all hover:border-[#b97aff]/30 hover:text-[#b97aff] hover:bg-[#b97aff]/[0.04]"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                <span className="hidden sm:inline">Baixar Currículo</span>
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {contactLinks.map((link) => {
                const Icon = link.icon === 'github' ? Github : Linkedin
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="group flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#1e1630] py-2 text-[#6b5f80] transition-all hover:border-[#b97aff]/30 hover:text-[#b97aff] hover:bg-[#b97aff]/[0.04]"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{link.name}</span>
                  </a>
                )
              })}
            </div>

            {/* Quick stats */}
            <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg border border-[#1e1630] bg-[#110d1a]/80 p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{stats[0].value}</div>
                <div className="text-[10px] text-[#6b5f80]">{stats[0].label.split(' ').slice(0, 2).join(' ')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#b97aff]">{stats[1].value}</div>
                <div className="text-[10px] text-[#6b5f80]">{stats[1].label}</div>
              </div>
            </div>

            {/* Scroll hint */}
            <AnimatePresence>
              {hasRevealed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center text-[10px] text-[#6b5f80]/50"
                >
                  ↓ Role para explorar as seções
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}