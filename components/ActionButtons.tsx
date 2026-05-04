'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { getWhatsAppShareUrl, GOOGLE_MAPS_URL } from '@/lib/share'
import { generateICS } from '@/lib/calendar'
import { triggerPetalShower } from '@/lib/petalShower'

const buttons = [
  {
    label: 'Share',
    sublabel: 'WhatsApp',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto mb-1" fill="none" aria-hidden="true">
        <path
          d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 12a3 3 0 100-6 3 3 0 000 6zM18 16a3 3 0 100 6 3 3 0 000-6zM8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    action: 'share',
  },
  {
    label: 'Save',
    sublabel: 'the Date',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto mb-1" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M16 2v4M8 2v4M3 10h18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M8 15l2.5 2.5L16 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    action: 'calendar',
  },
  {
    label: 'Get',
    sublabel: 'Directions',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto mb-1" fill="none" aria-hidden="true">
        <path
          d="M12 21C12 21 4 14 4 9a8 8 0 1116 0c0 5-8 12-8 12z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    action: 'directions',
  },
]

export default function ActionButtons() {
  const prefersReduced = useReducedMotion()

  const handleClick = async (action: string) => {
    if (action === 'share') {
      window.open(getWhatsAppShareUrl(), '_blank', 'noopener,noreferrer')
    } else if (action === 'calendar') {
      await generateICS()
      if (!prefersReduced) {
        triggerPetalShower()
      }
    } else if (action === 'directions') {
      window.open(GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {buttons.map((btn) => (
        <motion.button
          key={btn.action}
          type="button"
          onClick={() => handleClick(btn.action)}
          className="border border-gold bg-transparent text-maroon font-display uppercase text-xs tracking-wider px-4 py-3 rounded-sm min-w-[90px] transition-colors focus-visible:outline-2 focus-visible:outline-rani focus-visible:outline-offset-2 relative overflow-hidden"
          whileHover={
            prefersReduced ? {} : { backgroundColor: '#7A2F4E', color: '#F5E8E2', scale: 1.03 }
          }
          whileTap={prefersReduced ? {} : { scale: 0.96 }}
        >
          {btn.icon}
          <span className="block leading-none">{btn.label}</span>
          <span className="block leading-none text-[9px] opacity-70 mt-0.5 normal-case font-serif not-italic">
            {btn.sublabel}
          </span>
        </motion.button>
      ))}
    </div>
  )
}
