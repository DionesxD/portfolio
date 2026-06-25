'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'

import { Preloader } from './Preloader'
import { CustomCursor } from './CustomCursor'
import { ScrollProgress } from './ScrollProgress'
import { BackToTop } from './BackToTop'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Projects from './Projects'
import InfraProjects from './InfraProjects'
import Certifications from './Certifications'
import ContactSection from './ContactSection'
import Footer from './Footer'
import { useTerminalStore, type SectionId } from '@/lib/terminal-store'

function SectionWrapper({ id, children }: { id: SectionId; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export function PortfolioShell() {
  const [loading, setLoading] = useState(true)
  const revealedSections = useTerminalStore((s) => s.revealedSections)
  const showNav = revealedSections.size > 0

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" isLoaded={!loading} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative bg-[#0a0710] min-h-screen flex flex-col text-white overflow-x-hidden">
          <CustomCursor />
          <ScrollProgress />

          {/* Navbar — appears after first section reveal */}
          <AnimatePresence>
            {showNav && (
              <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' as const }}
              >
                <Navbar />
              </motion.div>
            )}
          </AnimatePresence>

          <main className="flex-1">
            <Hero />

            {/* Sections — only render when revealed via terminal */}
            {revealedSections.has('about') && (
              <SectionWrapper id="about">
                <About />
              </SectionWrapper>
            )}
            {revealedSections.has('skills') && (
              <SectionWrapper id="skills">
                <Skills />
              </SectionWrapper>
            )}
            {revealedSections.has('experience') && (
              <SectionWrapper id="experience">
                <Experience />
              </SectionWrapper>
            )}
            {revealedSections.has('dev') && (
              <SectionWrapper id="dev">
                <Projects />
              </SectionWrapper>
            )}
            {revealedSections.has('infra') && (
              <SectionWrapper id="infra">
                <InfraProjects />
              </SectionWrapper>
            )}
            {revealedSections.has('certs') && (
              <SectionWrapper id="certs">
                <Certifications />
              </SectionWrapper>
            )}
            {revealedSections.has('contact') && (
              <SectionWrapper id="contact">
                <ContactSection />
              </SectionWrapper>
            )}
          </main>

          {/* Footer — always visible */}
          <Footer />
          <BackToTop />
        </div>
      )}
    </ReactLenis>
  )
}