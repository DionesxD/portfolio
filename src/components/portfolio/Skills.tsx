'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Server,
  Flame,
  Cloud,
  ClipboardCheck,
  Code2,
  type LucideIcon,
} from 'lucide-react';
import { skills } from '@/data/portfolio';

const iconMap: Record<string, LucideIcon> = {
  '🛡️': ShieldCheck,
  '🖥️': Server,
  '🔥': Flame,
  '☁️': Cloud,
  '📊': ClipboardCheck,
  '💻': Code2,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.08 },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
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
            / Skills &amp; Competências
          </span>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills.map((skill, i) => {
            const IconComponent = iconMap[skill.icon];
            return (
              <motion.div
                key={skill.title}
                variants={fadeUp}
                custom={i + 1}
                className="card-shine border border-[#1e1630] rounded-lg bg-[#110d1a] p-5 hover:border-[#b97aff]/30 hover:shadow-[0_0_30px_rgba(185,122,255,0.08)] transition-all duration-300"
              >
                {IconComponent && (
                  <div className="w-10 h-10 rounded-lg bg-[#b97aff]/15 text-[#b97aff] flex items-center justify-center mb-4 border border-[#b97aff]/10">
                    <IconComponent className="w-5 h-5" />
                  </div>
                )}
                <h3 className="text-base font-semibold text-white">
                  {skill.title}
                </h3>
                <p className="text-sm text-[#8b7fa0] mt-2">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#1e1630] text-[#8b7fa0] hover:text-[#b97aff] hover:border-[#b97aff]/30 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}