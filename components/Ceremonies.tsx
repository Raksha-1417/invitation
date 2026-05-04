'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cardReveal, scrollReveal } from '@/lib/motion'
import Image from 'next/image'

const Belagavi_MAP_LINK = "https://maps.app.goo.gl/AuPnnaKxYAEvKPCw5?g_st=iw"

function ScallopDivider({ bg, accent }: { bg: string; accent: string }) {
  return (
    <svg viewBox="0 0 360 52" className="w-full block" style={{ marginBottom: -1, display: 'block' }} aria-hidden="true">
      <rect x="0" y="0" width="360" height="30" fill={bg} />
      <path d="M0,30 Q30,8 60,30 Q90,52 120,30 Q150,8 180,30 Q210,52 240,30 Q270,8 300,30 Q330,52 360,30 L360,52 L0,52 Z" fill="#F5E8E2" />
      <path d="M0,30 Q30,8 60,30 Q90,52 120,30 Q150,8 180,30 Q210,52 240,30 Q270,8 300,30 Q330,52 360,30" stroke={accent} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  )
}

function ViewLocationBtn({ bg, href }: { bg: string; href: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-4 px-6 py-2.5 rounded-full font-display text-xs tracking-[0.15em] uppercase transition-all shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-95 no-underline" 
      style={{ backgroundColor: bg, color: '#F5E8E2' }}
    >
      View Location
    </a>
  )
}

function Particles({ color = '#7A2F4E' }: { color?: string }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden mix-blend-screen">
      {Array.from({ length: 20 }).map((_, i) => {
        const scaleMax = Math.abs(Math.sin(i * 11)) * 0.8 + 0.4
        const targetX = 50 + (Math.sin(i * 5) * 45)
        const targetY = 100 - (Math.cos(i * 7) * 70 + 30)
        const dur = Math.abs(Math.sin(i * 3)) * 1.5 + 1.2
        const del = Math.abs(Math.cos(i * 13)) * 0.4
        
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(122,47,78,0.4)]"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0, scale: 0, x: '50%', y: '100%' }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, scaleMax, scaleMax * 1.2, 0],
              x: `${targetX}%`,
              y: `${targetY}%`
            }}
            transition={{ 
              duration: dur, 
              ease: "easeOut", 
              delay: del,
              opacity: { times: [0, 0.2, 0.8, 1] },
              scale: { times: [0, 0.2, 0.5, 1], repeat: 1, repeatType: "reverse" }
            }}
          />
        )
      })}
    </div>
  )
}



function WeddingCard() {
  return (
    <motion.div 
      variants={cardReveal} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, amount: 0.1 }} 
      className="rounded-xl overflow-hidden relative shadow-2xl mt-4 w-full cursor-pointer border-2 border-[#C9A46A]/30"
    >
      <Image src="/photos/shreya wedding/wedding_day.png" alt="Wedding Day" width={800} height={1200} className="w-full h-auto object-cover" priority />
    </motion.div>
  )
}

export default function Ceremonies() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-16 px-4" aria-label="Sacred Ceremonies">
      <motion.div
        className="text-center mb-10 px-3"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="font-display text-[#7A2F4E] text-[42px] tracking-[0.15em] uppercase drop-shadow-sm">Sacred Ceremonies</h2>
        <p className="font-serif italic gold-text-shimmer text-xl mt-3 tracking-wider font-semibold">ಮದುವೆ ಸಮಾರಂಭಗಳು</p>
      </motion.div>

      <div className="flex flex-col gap-6 max-w-sm mx-auto items-center">
        <WeddingCard />
        
        <motion.div
          variants={scrollReveal}
          initial={prefersReduced ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ViewLocationBtn bg="#7A2F4E" href={Belagavi_MAP_LINK} />
        </motion.div>
      </div>
    </section>
  )
}
