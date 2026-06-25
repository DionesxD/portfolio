'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { devProjects } from '@/data/portfolio';
import type { Project } from '@/types/portfolio';
import ProjectModal from './ProjectModal';

const gradientClasses = [
  'bg-gradient-to-br from-[#b97aff]/15 via-transparent to-transparent',
  'bg-gradient-to-br from-purple-500/12 via-transparent to-transparent',
  'bg-gradient-to-br from-violet-500/12 via-transparent to-transparent',
  'bg-gradient-to-tr from-fuchsia-500/10 via-transparent to-transparent',
  'bg-gradient-to-bl from-purple-400/12 via-transparent to-transparent',
  'bg-gradient-to-tl from-violet-400/10 via-transparent to-transparent',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.08 },
  }),
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="dev" className="py-24 md:py-32">
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
            / Projetos de Desenvolvimento
          </span>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {devProjects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              custom={i + 1}
              onClick={() => setSelectedProject(project)}
              className={`group relative border border-[#1e1630] rounded-lg bg-[#110d1a] p-5 card-shine hover:border-[#b97aff]/40 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(185,122,255,0.1)] transition-all duration-500 cursor-pointer overflow-hidden ${
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
                <span className="text-xl">{project.icon}</span>
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
          ))}
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