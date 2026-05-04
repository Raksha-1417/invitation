'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { scrollReveal } from '@/lib/motion'

// SVG Icons
function BreakfastIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
      <path d="M6 2v3M10 2v3M14 2v3" />
    </svg>
  )
}

function VivahIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Kalash pot shape */}
      <path d="M8 12c-3.3 0-6 2.7-6 6s2.7 6 6 6h8c3.3 0 6-2.7 6-6s-2.7-6-6-6" />
      {/* Rim of the pot */}
      <path d="M7 10h10v2H7z" />
      {/* Coconut / Leaves */}
      <path d="M12 2l-3 4-2-2 1.5 5.5M12 2l3 4 2-2-1.5 5.5M12 2v6" />
      {/* Swastika or central detailing */}
      <circle cx="12" cy="18" r="2" />
    </svg>
  )
}

function LunchIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M15.5 13.5a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828z" />
      <path d="M8.5 13.5a2 2 0 1 1-2.828-2.828 2 2 0 0 1 2.828 2.828z" />
      <path d="M12 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  )
}

const scheduleEvents = [
  {
    time: "10:00 AM",
    title: "Breakfast",
    desc: "A warm start to the big day",
    icon: BreakfastIcon,
    theme: "text-[#C9A46A]"
  },
  {
    time: "12:30 PM",
    title: "Lunch Feast",
    desc: "Kalyana Oota – Traditional Wedding Feast",
    icon: LunchIcon,
    theme: "text-[#7A2F4E]"
  },
  {
    time: "12:32 PM",
    title: "Muhurtham",
    desc: "The auspicious moment we say 'I Do'",
    icon: VivahIcon,
    theme: "text-[#C9A46A]"
  }
]

export default function Schedule() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-[#F5E8E2]">

      {/* Title */}
      <motion.div
        className="text-center mb-16 relative z-10"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className="font-devanagari gold-text-shimmer text-lg tracking-wider mb-2 font-semibold">ಮದುವೆ ಆಮಂತ್ರಣ</p>
        <h2 className="font-script text-[#7A2F4E] text-[50px] leading-tight drop-shadow-sm">Wedding Day <br /> Schedule</h2>
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C9A46A] to-transparent mx-auto mt-4 mb-2 pulse-ring rounded-full" />
        <p className="font-display tracking-[0.2em] text-[#A8576A] text-sm uppercase">Thursday, 14 May 2026</p>
      </motion.div>

      <div className="max-w-sm mx-auto relative z-10 pl-6">
        {/* Timeline Line */}
        <div className="absolute left-[38px] top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[#C9A46A] to-transparent opacity-60" />

        <div className="space-y-12">
          {scheduleEvents.map((event, i) => {
            const Icon = event.icon
            return (
              <motion.div
                key={event.title}
                className="relative flex items-start gap-8 group"
                initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Icon node */}
                <motion.div
                  className={`relative z-10 w-14 h-14 rounded-full bg-[#FAF3EE] border-2 flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(201,164,106,0.2)] cursor-default`}
                  style={{ borderColor: i % 2 === 0 ? 'rgba(201,164,106,0.5)' : 'rgba(122,47,78,0.35)' }}
                  whileHover={{ scale: 1.18, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Icon className={`w-6 h-6 ${event.theme}`} />
                </motion.div>

                {/* Content */}
                <div className="pt-2">
                  <p className={`font-display text-sm tracking-[0.1em] font-bold mb-1 ${event.theme}`}>{event.time}</p>
                  <h3 className="font-serif text-2xl text-[#3a1a20] leading-tight font-semibold">{event.title}</h3>
                  <p className="font-serif italic text-[#A8576A]/80 text-sm mt-1">{event.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
