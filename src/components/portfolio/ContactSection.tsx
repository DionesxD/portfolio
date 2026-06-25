'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import { contactInfo, contactLinks } from '@/data/portfolio'

// ─── Animation Variants ──────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// ─── Contact Section ─────────────────────────────────────────

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 border-t border-[#1e1630]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={fadeUpVariants} className="mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#6b5f80]">
              / Contato
            </span>
          </motion.div>
        </motion.div>

        {/* Two-Column Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left Column */}
          <motion.div variants={fadeUpVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Vamos conversar?
            </h2>
            <p className="text-sm text-[#8b7fa0] mt-4 leading-relaxed">
              Disponível para trabalhos <span className="text-white font-medium">Remotos e Presenciais</span>.
            </p>
            <p className="text-sm text-[#8b7fa0] mt-2 leading-relaxed">
              Desenvolvimento de Plataformas personalizadas, Sites, Hospedagem e
              Configurações de Servidores e Serviços em nuvem.
            </p>

            {/* Contact Info Items */}
            <div className="mt-8 space-y-4">
              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 group"
              >
                <Mail className="h-4 w-4 text-[#6b5f80] group-hover:text-[#b97aff] transition-colors" />
                <span className="text-sm text-[#b97aff] group-hover:text-[#b97aff]/80 group-hover:underline underline-offset-4 transition-all">
                  {contactInfo.email}
                </span>
              </a>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#6b5f80]" />
                <span className="text-sm text-[#8b7fa0]">
                  {contactInfo.phone}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#6b5f80]" />
                <span className="text-sm text-[#8b7fa0]">
                  {contactInfo.location}
                </span>
              </div>
            </div>

            {/* Social Links — Bigger and more prominent */}
            <div className="mt-8 flex gap-4">
              {contactLinks.map((link) => {
                const Icon =
                  link.icon === 'github' ? Github :
                  link.icon === 'linkedin' ? Linkedin :
                  Mail
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="group flex items-center gap-3 rounded-xl border border-[#1e1630] px-5 py-3 text-[#6b5f80] hover:text-[#b97aff] hover:border-[#b97aff]/30 hover:bg-[#b97aff]/5 transition-all duration-300"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column — Info Card */}
          <motion.div variants={fadeUpVariants}>
            <div className="border border-[#1e1630] border-t-2 border-t-[#b97aff]/20 rounded-lg bg-[#110d1a] p-6">
              <p className="font-mono text-xs uppercase text-[#6b5f80] mb-4">
                Informações
              </p>

              <div>
                <div className="text-sm text-[#8b7fa0] py-3 border-b border-[#1e1630]/60 transition-colors hover:text-white">
                  📍 Rio de Janeiro, RJ
                </div>
                <div className="text-sm text-[#8b7fa0] py-3 border-b border-[#1e1630]/60 transition-colors hover:text-white">
                  🕐 Horário: Seg-Sex, 9h-18h (BRT)
                </div>
                <div className="text-sm text-[#8b7fa0] py-3 transition-colors hover:text-white">
                  📧 Resposta em até 24h
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}