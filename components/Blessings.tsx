'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { scrollReveal } from '@/lib/motion'

function FamilyCard({
  role, names, delay = 0
}: { role: string; names: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className="text-center"
      variants={scrollReveal}
      initial={prefersReduced ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: delay / 1000 }}
    >
      {/* Role label */}
      <p
        className="font-serif uppercase tracking-[0.22em] mb-2"
        style={{ fontSize: 11, color: '#008080', letterSpacing: '0.22em' }}
      >
        {role}
      </p>
      {/* Teal dot divider */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <div style={{ height: 1, width: 32, background: 'rgba(209,0,86,0.25)' }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D10056', opacity: 0.6 }} />
        <div style={{ height: 1, width: 32, background: 'rgba(209,0,86,0.25)' }} />
      </div>
      {/* Names */}
      <p
        className="font-serif font-semibold"
        style={{ fontSize: 18, color: '#1a1a1a', letterSpacing: '0.02em', lineHeight: 1.4 }}
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
      className="py-16 px-7 text-center relative overflow-hidden"
      aria-label="Blessings"
      style={{ background: 'linear-gradient(160deg, #F5EDE0 0%, #FFF8F2 60%, #F5EDE0 100%)' }}
    >
      {/* Corner ornament top-left */}
      <svg className="absolute top-4 left-4 opacity-30" width={40} height={40} viewBox="0 0 40 40" fill="none">
        <path d="M2 38 Q2 2 38 2" stroke="#D10056" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="4" cy="36" r="2" fill="#D10056" />
        <circle cx="36" cy="4" r="2" fill="#008080" />
      </svg>
      {/* Corner ornament top-right */}
      <svg className="absolute top-4 right-4 opacity-30" width={40} height={40} viewBox="0 0 40 40" fill="none">
        <path d="M38 38 Q38 2 2 2" stroke="#D10056" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="36" cy="36" r="2" fill="#D10056" />
        <circle cx="4" cy="4" r="2" fill="#008080" />
      </svg>
      {/* Corner ornament bottom-left */}
      <svg className="absolute bottom-4 left-4 opacity-30" width={40} height={40} viewBox="0 0 40 40" fill="none">
        <path d="M2 2 Q2 38 38 38" stroke="#008080" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="4" cy="4" r="2" fill="#008080" />
        <circle cx="36" cy="36" r="2" fill="#D10056" />
      </svg>
      {/* Corner ornament bottom-right */}
      <svg className="absolute bottom-4 right-4 opacity-30" width={40} height={40} viewBox="0 0 40 40" fill="none">
        <path d="M38 2 Q38 38 2 38" stroke="#008080" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="36" cy="4" r="2" fill="#008080" />
        <circle cx="4" cy="36" r="2" fill="#D10056" />
      </svg>

      {/* Ivory card border */}
      <div
        className="absolute inset-6 rounded-lg pointer-events-none"
        style={{ border: '1.5px solid rgba(209,0,86,0.15)', borderRadius: 12 }}
      />

      <div className="relative z-10 space-y-10 py-4">

        {/* Title */}
        <motion.div
          variants={scrollReveal}
          initial={prefersReduced ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2
            className="font-serif font-bold"
            style={{ fontSize: 34, color: '#D10056', letterSpacing: '0.06em' }}
          >
            Blessings From
          </h2>
          <p
            className="font-serif italic mt-1"
            style={{ fontSize: 13, color: '#008080', letterSpacing: '0.08em' }}
          >
            आशीर्वाद
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
          <div className="flex-1 h-px" style={{ background: 'rgba(0,128,128,0.2)' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D10056', opacity: 0.5 }} />
          <div className="flex-1 h-px" style={{ background: 'rgba(0,128,128,0.2)' }} />
        </motion.div>

        {/* Groom's parents */}
        <FamilyCard
          role="Groom's Parents"
          names="Mr. Ganesh Baburao Ankad & Mrs. Kalavati Ankad"
          delay={100}
        />

        {/* Bride's parents */}
        <FamilyCard
          role="Bride's Parents"
          names="Mr. Prakash Anandrao Bhoir & Mrs. Shankuntala Bhoir"
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
            style={{ fontSize: 28, color: '#D10056', letterSpacing: '0.03em' }}
          >
            And Grandparents
          </p>
        </motion.div>

        {/* Bottom blessing quote */}
        <motion.p
          className="font-serif italic max-w-[280px] mx-auto leading-relaxed"
          style={{ fontSize: 13, color: '#008080', opacity: 0.8 }}
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
