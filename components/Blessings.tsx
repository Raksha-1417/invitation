'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { scrollReveal } from '@/lib/motion'

function FamilyCard({
  role, names, delay = 0
}: { role: string; names: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className="text-center px-2"
      initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: delay / 1000, type: 'spring', stiffness: 180, damping: 18 }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Role label */}
      <p
        className="font-serif uppercase tracking-[0.22em] mb-2"
        style={{ fontSize: 12, color: '#C9A46A', letterSpacing: '0.22em' }}
      >
        {role}
      </p>
      {/* Dot divider */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <div style={{ height: 1, width: 32, background: 'rgba(122,47,78,0.25)' }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#7A2F4E', opacity: 0.6 }} />
        <div style={{ height: 1, width: 32, background: 'rgba(122,47,78,0.25)' }} />
      </div>
      {/* Names */}
      <p
        className="font-serif font-semibold"
        style={{ fontSize: 19, color: '#1a1a1a', letterSpacing: '0.02em', lineHeight: 1.4 }}
      >
        {names}
      </p>
    </motion.div>
  )
}

export default function Blessings() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="pt-6 pb-16 px-7 text-center relative overflow-hidden"
      aria-label="Blessings"
      style={{ background: 'linear-gradient(160deg, #FAF3EE 0%, #F5E8E2 60%, #FAF3EE 100%)' }}
    >
      {/* Corner ornament top-left */}
      <svg className="absolute top-4 left-4 opacity-30" width={40} height={40} viewBox="0 0 40 40" fill="none">
        <path d="M2 38 Q2 2 38 2" stroke="#7A2F4E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="4" cy="36" r="2" fill="#7A2F4E" />
        <circle cx="36" cy="4" r="2" fill="#C9A46A" />
      </svg>
      {/* Corner ornament top-right */}
      <svg className="absolute top-4 right-4 opacity-30" width={40} height={40} viewBox="0 0 40 40" fill="none">
        <path d="M38 38 Q38 2 2 2" stroke="#7A2F4E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="36" cy="36" r="2" fill="#7A2F4E" />
        <circle cx="4" cy="4" r="2" fill="#C9A46A" />
      </svg>
      {/* Corner ornament bottom-left */}
      <svg className="absolute bottom-4 left-4 opacity-30" width={40} height={40} viewBox="0 0 40 40" fill="none">
        <path d="M2 2 Q2 38 38 38" stroke="#C9A46A" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="4" cy="4" r="2" fill="#C9A46A" />
        <circle cx="36" cy="36" r="2" fill="#7A2F4E" />
      </svg>
      {/* Corner ornament bottom-right */}
      <svg className="absolute bottom-4 right-4 opacity-30" width={40} height={40} viewBox="0 0 40 40" fill="none">
        <path d="M38 2 Q38 38 2 38" stroke="#C9A46A" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="36" cy="4" r="2" fill="#C9A46A" />
        <circle cx="4" cy="36" r="2" fill="#7A2F4E" />
      </svg>

      {/* Ivory card border */}
      <div
        className="absolute inset-6 rounded-lg pointer-events-none"
        style={{ border: '1.5px solid rgba(122,47,78,0.15)', borderRadius: 12 }}
      />

      <div className="relative z-10 space-y-10 py-4">

        {/* Title */}
        <motion.div
          variants={scrollReveal}
          initial={prefersReduced ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="font-serif font-bold"
            style={{ fontSize: 38, color: '#7A2F4E', letterSpacing: '0.06em' }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Blessings From
          </motion.h2>
          <p
            className="font-serif italic gold-text-shimmer mt-2 font-semibold"
            style={{ fontSize: 15, letterSpacing: '0.08em' }}
          >
            ಆಶೀರ್ವಾದಗಳು
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mx-8"
          variants={scrollReveal}
          initial={prefersReduced ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex-1 h-px" style={{ background: 'rgba(201,164,106,0.2)' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7A2F4E', opacity: 0.5 }} />
          <div className="flex-1 h-px" style={{ background: 'rgba(201,164,106,0.2)' }} />
        </motion.div>

        {/* Groom's parents */}
        <FamilyCard
          role="Groom's Parents"
          names="Mr. Jagadeesh Shamrao Pattar & Mrs. Jayalaxmi Pattar"
          delay={100}
        />

        {/* Bride's parents */}
        <FamilyCard
          role="Bride's Parents"
          names="Mr. Shamsundar Shripad Pattar & Mrs. Vijayalaxmi (Anjana)"
          delay={200}
        />

        {/* Grandparents — script font */}
        <motion.div
          variants={scrollReveal}
          initial={prefersReduced ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3 }}
          className="pt-2"
        >
          <p
            className="font-script"
            style={{ fontSize: 28, color: '#7A2F4E', letterSpacing: '0.03em' }}
          >
            And Grandparents
          </p>
        </motion.div>

        {/* Bottom blessing quote */}
        <motion.p
          className="font-serif italic max-w-[280px] mx-auto leading-relaxed"
          style={{ fontSize: 13, color: '#C9A46A', opacity: 0.8 }}
          variants={scrollReveal}
          initial={prefersReduced ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          Your presence is the only gift we ask for
        </motion.p>

      </div>
    </section>
  )
}
