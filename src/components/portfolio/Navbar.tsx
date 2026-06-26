'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X, Terminal } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '@/data/portfolio'
import { useTerminalStore } from '@/lib/terminal-store'
import type { NavItem } from '@/types/portfolio'

const SECTION_MAP: Record<string, string> = {
  '#about': 'about',
  '#skills': 'skills',
  '#experience': 'experience',
  '#dev': 'dev',
  '#infra': 'infra',
  '#certs': 'certs',
  '#contact': 'contact',
}

function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault()
  const sectionKey = SECTION_MAP[href]
  if (sectionKey) {
    const store = useTerminalStore.getState()
    if (!store.revealedSections.has(sectionKey as 'about')) {
      store.revealSection(sectionKey as 'about')
      // Small delay so the section renders before we scroll
      setTimeout(() => {
        const id = href.replace('#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const id = href.replace('#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

function NavLink({ item }: { item: NavItem }) {
  return (
    <a
      href={item.href}
      onClick={(e) => handleAnchorClick(e, item.href)}
      className="group relative py-1 text-sm font-light tracking-wide text-[#6b5f80] transition-colors hover:text-white"
    >
      {item.name}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-[#b97aff]/60 transition-all duration-300 group-hover:w-full" />
    </a>
  )
}

function MobileNavLink({
  item,
  onClose,
}: {
  item: NavItem
  onClose: () => void
}) {
  return (
    <a
      href={item.href}
      onClick={(e) => {
        handleAnchorClick(e, item.href)
        onClose()
      }}
      className="block text-3xl font-extralight tracking-tight text-[#6b5f80] hover:text-[#b97aff] transition-colors"
    >
      {item.name}
    </a>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const tickingRef = useRef(false)

  const updateScroll = useCallback(() => {
    if (window.scrollY > 50) {
      if (!isScrolled) setIsScrolled(true)
    } else {
      if (isScrolled) setIsScrolled(false)
    }
    tickingRef.current = false
  }, [isScrolled])

  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(updateScroll)
        tickingRef.current = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [updateScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0710]/80 backdrop-blur-md border-b border-b-[#1e1630]/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-[0.25em] text-[#b97aff] hover:text-[#b97aff]/80 hover:drop-shadow-[0_0_8px_rgba(185,122,255,0.5)] transition-all duration-300"
          >
            JA.
          </Link>

          {/* Terminal shortcut hint */}
          <div className="hidden md:flex items-center gap-2 text-[10px] text-[#6b5f80]/40">
            <Terminal className="h-3 w-3" />
            <span>use o terminal para navegar</span>
          </div>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="relative z-[60] text-[#6b5f80] lg:hidden"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' as const }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-[#0a0710]/98 backdrop-blur-lg lg:hidden"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 * i,
                  ease: 'easeOut' as const,
                }}
              >
                <MobileNavLink
                  item={item}
                  onClose={() => setIsMobileOpen(false)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}