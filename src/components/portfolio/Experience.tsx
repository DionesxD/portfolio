'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { experiences } from '@/data/portfolio';
import type { Experience as ExperienceType } from '@/types/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

function ExperienceItem({
  exp,
  index,
}: {
  exp: ExperienceType;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleBullets = expanded ? exp.bullets : exp.bullets.slice(0, 3);
  const hasMore = exp.bullets.length > 3;
  const remainingCount = exp.bullets.length - 3;

  return (
    <motion.div
      variants={fadeUp}
      custom={index + 1}
      className="relative pl-10 md:pl-12 pb-10 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-[15px] md:left-[19px] top-1 -translate-x-1/2">
        {exp.isCurrent ? (
          <div className="relative w-3.5 h-3.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />
            <span className="relative block w-3.5 h-3.5 rounded-full bg-emerald-500" />
          </div>
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-[#b97aff]/30 border-2 border-[#0a0710]" />
        )}
      </div>

      {/* Role */}
      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>

      {/* Company + Location */}
      <p className="text-sm text-[#b97aff]/80 mt-0.5">
        {exp.company} · {exp.location}
      </p>

      {/* Period + Current badge */}
      <div className="flex items-center gap-3 mt-1.5">
        <span className="font-mono text-xs text-[#6b5f80]">{exp.period}</span>
        {exp.isCurrent && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            ● Atual
          </span>
        )}
      </div>

      {/* Bullet points — custom bullets */}
      <ul className="mt-4 space-y-1.5">
        {visibleBullets.map((bullet, bi) => (
          <li
            key={bi}
            className="relative pl-4 text-sm text-[#8b7fa0] leading-relaxed"
          >
            <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-[#b97aff]/40" />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Expand/Collapse */}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-3 border border-[#1e1630] rounded-full px-3 py-1 text-xs text-[#6b5f80] hover:border-[#b97aff]/30 hover:bg-[#b97aff]/5 hover:text-[#b97aff] transition-all"
        >
          {expanded ? (
            <>
              Ver menos <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              Ver mais ({remainingCount}) <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
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
            / Experiência
          </span>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line — gradient */}
          <div className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#b97aff]/20 via-[#1e1630] to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {experiences.map((exp, i) => (
              <ExperienceItem key={exp.id} exp={exp} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}