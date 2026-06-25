'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  className?: string
}

export default function AnimatedCounter({
  value,
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)
  const rafRef = useRef<number | undefined>(undefined)

  const startAnimation = useCallback(() => {
    const duration = 2000
    const start = performance.now()

    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(eased * value))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
  }, [value])

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()
          startAnimation()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [startAnimation])

  useEffect(() => {
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  )
}