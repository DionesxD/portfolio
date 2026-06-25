'use client';

import { motion } from 'framer-motion';
import { certifications } from '@/data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.06 },
  }),
};

export default function Certifications() {
  return (
    <section id="certs" className="py-24 md:py-32">
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
            / Certificações
          </span>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              variants={fadeUp}
              custom={i + 1}
              className={`relative border rounded-lg bg-[#110d1a] p-4 pl-6 transition-all duration-300 ${
                cert.highlight
                  ? 'border-[#b97aff]/30 bg-[#b97aff]/5 shadow-[0_0_20px_rgba(185,122,255,0.05)]'
                  : 'border-[#1e1630] hover:border-[#b97aff]/20'
              }`}
            >
              {/* Left accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-l-lg ${
                  cert.highlight ? 'bg-[#b97aff]' : 'bg-[#b97aff]/20'
                }`}
              />

              <span className={`text-sm font-medium text-white block ${cert.highlight ? 'pr-28 sm:pr-24' : ''}`}>
                {cert.name}
              </span>
              <span className="text-xs text-[#8b7fa0] mt-1 block">
                {cert.issuer}
              </span>
              <span className="font-mono text-[10px] text-[#6b5f80]/70 mt-1 block">
                {cert.date}
              </span>

              {/* Highlight badge — positioned after date to avoid overlap */}
              {cert.highlight && (
                <span className="absolute top-3.5 right-3 text-[9px] font-mono uppercase tracking-widest text-[#b97aff] bg-[#b97aff]/10 border border-[#b97aff]/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                  Em andamento
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}