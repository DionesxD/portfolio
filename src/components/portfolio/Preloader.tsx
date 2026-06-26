'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  isLoaded: boolean
}

export function Preloader({ isLoaded }: PreloaderProps) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0710]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <motion.div
            className="flex items-baseline select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.span
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              JA
            </motion.span>
            <motion.span
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#b97aff]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.5,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              .
            </motion.span>
          </motion.div>

          <div className="mt-8 w-48 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#b97aff] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}