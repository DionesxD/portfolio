'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [current, setCurrent] = useState(0);
  const images = project.images ?? [];

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <AnimatePresence>
      <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl w-full max-h-[85vh] overflow-y-auto bg-[#110d1a] border border-[#1e1630] rounded-lg p-6 md:p-8 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#1e1630] text-[#6b5f80] hover:text-white hover:border-[#b97aff]/30 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <DialogTitle className="sr-only">{project.title}</DialogTitle>
          <span className="font-mono text-xs text-[#6b5f80] block">
            {project.num}
          </span>
          <h2 className="text-2xl font-bold text-white mt-2 pr-10">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-[#6b5f80] mt-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#1e1630] text-[#6b5f80]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Images Carousel */}
          <div className="mt-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#6b5f80] block mb-4">
              Capturas de Tela
            </span>
            {hasImages ? (
              <div className="relative">
                {/* Main Image */}
                <div className="rounded-lg overflow-hidden border border-[#1e1630] relative">
                  <img
                    key={current}
                    src={images[current]}
                    alt={`${project.title} screenshot ${current + 1}`}
                    className="w-full h-auto object-cover transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Prev / Next — só aparece se tiver mais de 1 imagem */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#110d1a]/80 border border-[#1e1630] text-[#8b7fa0] hover:text-white hover:border-[#b97aff]/40 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#110d1a]/80 border border-[#1e1630] text-[#8b7fa0] hover:text-white hover:border-[#b97aff]/40 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Dots */}
                {images.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-3">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === current
                            ? 'w-4 bg-[#b97aff]'
                            : 'w-1.5 bg-[#1e1630]'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-[#6b5f80]/60">
                Nenhuma imagem disponível para este projeto.
              </p>
            )}
          </div>

          {/* Link Button */}
          {showLink && (
            <div className="mt-8 pt-6 border-t border-[#1e1630]">
              
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#b97aff] hover:text-[#b97aff]/80 transition-colors"
              &gt;
                Acessar Projeto &rarr;
              </a>
            </div>
          ){'}'}
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}