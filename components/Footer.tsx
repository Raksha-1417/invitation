'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
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
        <div className="relative w-48 h-48 flex items-center justify-center float-gentle">
            <Image src="/photos/shreya wedding/logos_n.png" alt="Couple Logo" fill className="object-contain drop-shadow-md" />
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
        <div className="flex-1 h-px bg-[#C9A46A]/30" />
        <motion.svg
          viewBox="0 0 24 24" className="w-5 h-5 text-[#7A2F4E]" fill="currentColor" aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" />
        </motion.svg>
        <div className="flex-1 h-px bg-[#C9A46A]/30" />
      </motion.div>
      {/* With love */}
      <motion.p
        className="font-script text-[#C9A46A] text-3xl"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        With love,
      </motion.p>

      <motion.p
        className="font-display text-[#7A2F4E] font-bold text-lg tracking-[0.15em] mt-2"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        Naveen &amp; Shreya
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
        <div className="flex-1 h-px bg-[#C9A46A]/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A46A]" />
        <div className="flex-1 h-px bg-[#C9A46A]/30" />
      </div>

      {/* Designer credit */}
      <p className="text-[#C9A46A]/80 text-xs font-serif">
        Designed with love by{' '}
        <strong className="text-[#7A2F4E] font-display tracking-wide">{BRAND_NAME}</strong>
      </p>

      {/* FINAL CTA: Book Invitation */}
      <motion.div whileHover={{ y: -3, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
        <Link
          href="/book"
          className="inline-flex items-center justify-center mt-4 px-4 sm:px-8 py-3 bg-gradient-to-r from-[#7A2F4E] to-[#8B3A4A] text-white font-display text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase rounded-full shadow-lg shadow-[#7A2F4E]/20 transition-all active:scale-95 max-w-[90%] mx-auto"
        >
          <span className="text-center">
            Book Your Own Invitation <span className="whitespace-nowrap">Website &rarr;</span>
          </span>
        </Link>
      </motion.div>

      {/* Final spacer */}
      <div className="h-12" />
    </footer>
  )
}
