'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import ActionButtons from './ActionButtons'
import { scrollReveal } from '@/lib/motion'
import { getDesignerWhatsAppUrl } from '@/lib/share'

const BRAND_NAME = 'Raksha Raj'
const WHATSAPP_URL = getDesignerWhatsAppUrl()

export default function Footer() {
  const prefersReduced = useReducedMotion()

  return (
    <footer className="py-16 px-7 text-center" aria-label="Footer">
      {/* Gorgeous Royal Monogram with Peacock Accent */}
      <motion.div
        className="flex justify-center mb-8"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Ornate Frame SVG */}
          <svg className="absolute inset-0 w-full h-full text-[#008080]" viewBox="0 0 100 100" fill="none">
            <path d="M50 5 L85 20 L90 50 L85 80 L50 95 L15 80 L10 50 L15 20 Z" stroke="currentColor" strokeWidth="1.5" className="opacity-80" />
            <path d="M50 10 L80 23 L84 50 L80 77 L50 90 L20 77 L16 50 L20 23 Z" stroke="#D10056" strokeWidth="0.5" className="opacity-60" />
            {/* Minimal Peacock Crown */}
            <path d="M45 15 C47 5, 53 5, 55 15 C45 25, 55 25, 45 15" fill="#D10056" opacity="0.8" />
            <circle cx="50" cy="10" r="1.5" fill="#008080" />
            <circle cx="47" cy="12" r="1" fill="#008080" />
            <circle cx="53" cy="12" r="1" fill="#008080" />
          </svg>

          <span className="font-script text-[#D10056] text-6xl leading-none relative z-10" style={{ textShadow: '0 2px 10px rgba(209,0,86,0.2)' }}>R<span className="text-[#008080] text-5xl px-1">&amp;</span>N</span>
        </div>
      </motion.div>

      {/* Teal & Pink Divider */}
      <motion.div
        className="flex items-center gap-3 mb-6 px-10"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex-1 h-px bg-[#008080]/30" />
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D10056]" fill="currentColor" aria-hidden="true">
          <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" />
        </svg>
        <div className="flex-1 h-px bg-[#008080]/30" />
      </motion.div>
      {/* With love */}
      <motion.p
        className="font-script text-[#008080] text-3xl"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        With love,
      </motion.p>

      <motion.p
        className="font-display text-[#D10056] font-bold text-lg tracking-[0.15em] mt-2"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        Rohit &amp; Nandini
      </motion.p>

      {/* Spacer */}
      <div className="h-8" />

      {/* Action buttons */}
      <motion.div
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ActionButtons />
      </motion.div>

      {/* Spacer */}
      <div className="h-8" />

      {/* Custom Divider */}
      <div className="flex items-center gap-3 mb-6 px-10">
        <div className="flex-1 h-px bg-[#008080]/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#008080]" />
        <div className="flex-1 h-px bg-[#008080]/30" />
      </div>

      {/* Designer credit */}
      <p className="text-[#008080]/80 text-xs font-serif">
        Designed with love by{' '}
        <strong className="text-[#D10056] font-display tracking-wide">{BRAND_NAME}</strong>
      </p>

      {/* FINAL CTA: Book Invitation */}
      <Link
        href="/book"
        className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-[#D10056] to-[#7A1142] text-white font-display text-[11px] tracking-[0.2em] uppercase rounded-full shadow-lg shadow-[#D10056]/20 transition-all hover:-translate-y-1 active:scale-95"
      >
        Book Your Own Invitation website →
      </Link>

      {/* Final spacer */}
      <div className="h-12" />
    </footer>
  )
}
