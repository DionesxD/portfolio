'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Network, FolderKanban, Cable, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { infraProjects } from '@/data/portfolio';
import type { Project } from '@/types/portfolio';
import ProjectModal from './ProjectModal';

const infraIconMap: Record<string, LucideIcon> = {
  '📹': Camera,
  '🌐': Network,
  '🗂️': FolderKanban,
  '🔌': Cable,
};

const gradientClasses = [
  'bg-gradient-to-br from-emerald-500/12 via-transparent to-transparent',
  'bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent',
  'bg-gradient-to-tr from-teal-500/12 via-transparent to-transparent',
  'bg-gradient-to-bl from-green-500/10 via-transparent to-transparent',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.08 },
  }),
};

export default function InfraProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="infra" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#6b5f80]">
            / Projetos de Infraestrutura
          </span>
        </motion.div>

        {/* Infra Project Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {infraProjects.map((project, i) => {
            const InfraIcon = infraIconMap[project.icon];
            return (
              <motion.div
                key={project.id}
                variants={fadeUp}
                custom={i + 1}
                onClick={() => setSelectedProject(project)}
                className={`group relative border-dashed border-[#b97aff]/15 rounded-lg bg-[#110d1a] p-5 card-shine hover:border-[#b97aff]/40 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(16,185,129,0.08)] transition-all duration-500 cursor-pointer overflow-hidden ${
                  gradientClasses[i % gradientClasses.length]
                }`}
              >
                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(#b97aff 1px, transparent 1px), linear-gradient(90deg, #b97aff 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Top row: num + icon */}
                <div className="relative flex justify-between items-start">
                  <span className="font-mono text-[10px] text-[#6b5f80]/60">
                    {project.num}
                  </span>
                  {InfraIcon ? (
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <InfraIcon className="w-4 h-4" />
                    </div>
                  ) : (
                    <span className="text-xl">{project.icon}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="relative text-base font-semibold text-white mt-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm text-[#8b7fa0] mt-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="relative flex flex-wrap gap-1.5 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#1e1630] text-[#6b5f80]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom row */}
                <div className="relative flex justify-between items-center mt-4 pt-3 border-t border-[#1e1630] group">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#b97aff] group-hover:gap-2.5 transition-all duration-300">
                    Ver Projeto <ArrowUpRight className="w-3 h-3" />
                  </span>
                  {project.images && project.images.length > 0 && (
                    <span className="text-xs text-[#6b5f80]">📷 Ver imagens</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}