'use client';

import { motion } from 'framer-motion';
import { stats, languages } from '@/data/portfolio';
import AnimatedCounter from './AnimatedCounter';

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

const languageProgress: Record<string, number> = {
  Português: 100,
  Inglês: 70,
  Espanhol: 25,
};

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
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
            / Sobre Mim
          </span>
        </motion.div>

        {/* Two-Column Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16"
        >
          {/* Left Column */}
          <div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
            >
              Infraestrutura &amp;
              <br />
              <span className="italic text-[#b97aff]">Cyber Security</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-sm text-[#8b7fa0] leading-relaxed mt-6 max-w-xl"
            >
              Profissional com mais de 6 anos de experiência em infraestrutura de
              TI, suporte especializado N2/N3 e operações de segurança cibernética.
              Atuação prática em monitoramento SOC, hardening de servidores,
              automação com PowerShell/Python e administração de ambientes corporativos.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#1e1630]/80 pt-8 mt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl md:text-5xl font-bold text-white">
                    {stat.numericValue !== undefined ? (
                      <AnimatedCounter
                        value={stat.numericValue}
                        suffix={stat.suffix}
                      />
                    ) : (
                      <span
                        className={
                          stat.value === 'SOC'
                            ? 'text-[#b97aff]'
                            : 'text-white'
                        }
                      >
                        {stat.value}
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#6b5f80] mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Languages Card */}
          <motion.div variants={fadeUp} custom={4}>
            <div className="border border-[#1e1630] rounded-lg bg-[#110d1a] p-6 h-full border-t-2 border-t-[#b97aff]/20">
              <span className="font-mono text-xs uppercase text-[#6b5f80] block mb-6">
                Idiomas
              </span>
              <div className="flex flex-col gap-5">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex flex-col gap-2 border-b border-[#1e1630] pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm font-medium text-white">
                          {lang.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#8b7fa0]">
                        {lang.level}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-px w-full bg-[#1e1630] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#b97aff]/60 to-[#b97aff]/30 rounded-full"
                        style={{
                          width: `${languageProgress[lang.name] ?? 50}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}