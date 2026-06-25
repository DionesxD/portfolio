'use client';

import { useEffect, useState, useCallback, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const emptySubscribe = () => () => {};

const getIsTouchSnapshot = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const getIsTouchServerSnapshot = () => false;

export function CustomCursor() {
  const isTouch = useSyncExternalStore(
    emptySubscribe,
    getIsTouchSnapshot,
    getIsTouchServerSnapshot,
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }

      const target = e.target as HTMLElement;
      const hoverEl = target.closest(
        'button, a, [data-hover], input, textarea, select, [role="button"]',
      );
      setIsHovering(hoverEl !== null);
    },
    [cursorX, cursorY, isVisible],
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouch, handleMouseMove, handleMouseLeave]);

  if (isTouch) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference"
      style={{
        x,
        y,
        width: 8,
        height: 8,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale: { type: 'spring', damping: 20, stiffness: 300, mass: 0.5 },
        opacity: { duration: 0.15 },
      }}
    />
  );
}