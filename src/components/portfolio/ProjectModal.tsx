'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion, AnimatePresenceProps } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const hasImages = project.images && project.images.length > 0;
  const showLink = project.url && project.url !== '#';
  const [currentImg, setCurrentImg] = useState(0);

  const totalImages = project.images?.length ?? 0;

  const prev = useCallback(() => {
    setCurrentImg((i) => (i > 0 ? i - 1 : totalImages - 1));
  }, [totalImages]);

  const next = useCallback(() => {
    setCurrentImg((i) => (i < totalImages - 1 ? i + 1 : 0));
  }, [totalImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  // Reset index when project changes
  useEffect(() => {
    setCurrentImg(0);
  }, [project.id]);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal={false}
    >
      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />

      <DialogContent
        showCloseButton={false}
        className="max-w-4xl w-full overflow-hidden bg-[#110d1a] border border-[#1e1630] rounded-lg fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#1e1630] text-[#6b5f80] hover:text-white hover:border-[#b97aff]/30 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <DialogTitle className="sr-only">{project.title}</DialogTitle>
          <div className="flex items-start justify-between gap-4 pr-10">
            <div>
              <span className="font-mono text-xs text-[#6b5f80] block">
                {project.num}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                {project.title}
              </h2>
            </div>
            {hasImages && (
              <span className="font-mono text-xs text-[#6b5f80] shrink-0 pt-1">
                {currentImg + 1}/{totalImages}
              </span>
            )}
          </div>

          {/* Description + Tags — compact row */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mt-4">
            <p className="text-sm text-[#8b7fa0] leading-relaxed flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#1e1630] text-[#6b5f80]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ─── Carousel ─────────────────────────────────── */}
          {hasImages ? (
            <div className="relative mt-6 group/carousel">
              {/* Image Container */}
              <div className="relative aspect-video bg-[#0a0710] rounded-lg overflow-hidden border border-[#1e1630]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImg}
                    src={project.images![currentImg]}
                    alt={`${project.title} — captura ${currentImg + 1}`}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25, ease: 'easeOut' as const }}
                  />
                </AnimatePresence>
              </div>

              {/* Prev Button */}
              {totalImages > 1 && (
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 hover:border-[#b97aff]/40 flex items-center justify-center transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 z-10"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* Next Button */}
              {totalImages > 1 && (
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 hover:border-[#b97aff]/40 flex items-center justify-center transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 z-10"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {/* Dot Indicators */}
              {totalImages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {project.images!.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentImg
                          ? 'w-6 h-1.5 bg-[#b97aff]'
                          : 'w-1.5 h-1.5 bg-[#6b5f80]/40 hover:bg-[#6b5f80]/70'
                      }`}
                      aria-label={`Ir para imagem ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-[#1e1630] bg-[#0a0710] aspect-video flex items-center justify-center">
              <p className="text-sm text-[#6b5f80]/60">
                Nenhuma imagem disponível.
              </p>
            </div>
          )}

          {/* Link Button */}
          {showLink && (
            <div className="mt-6 pt-4 border-t border-[#1e1630]">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#b97aff] hover:text-[#b97aff]/80 transition-colors"
              >
                Acessar Projeto →
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}