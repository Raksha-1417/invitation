'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cardReveal, scrollReveal } from '@/lib/motion'
import Image from 'next/image'

const NASHIK_MAP_LINK = "https://maps.app.goo.gl/xDXkPKzS7PEKkJ9y5"

function ScallopDivider({ bg, accent }: { bg: string; accent: string }) {
  return (
    <svg viewBox="0 0 360 52" className="w-full block" style={{ marginBottom: -1, display: 'block' }} aria-hidden="true">
      <rect x="0" y="0" width="360" height="30" fill={bg} />
      <path d="M0,30 Q30,8 60,30 Q90,52 120,30 Q150,8 180,30 Q210,52 240,30 Q270,8 300,30 Q330,52 360,30 L360,52 L0,52 Z" fill="#FBF6EC" />
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
      style={{ backgroundColor: bg, color: '#FBF6EC' }}
    >
      View Location
    </a>
  )
}

function Particles({ color = '#D10056' }: { color?: string }) {
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
            className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(209,0,86,0.4)]"
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

function MehendiCard() {
  return (
    <motion.article 
      variants={cardReveal} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, amount: 0.1 }} 
      className="rounded-md overflow-hidden relative shadow-[0_8px_30px_rgba(10,92,74,0.15)] flex flex-col items-center bg-[#FBF6EC] pb-4"
    >
      <Image 
        src="/photos/mehendi.png" 
        alt="Mehendi Ceremony Invitation" 
        width={400} 
        height={600} 
        className="w-full h-auto object-cover" 
        priority
      />
      <p className="font-serif italic text-[#0A5C4A] text-sm mt-3">At Residence</p>
    </motion.article>
  )
}

function HaldiCard() {
  return (
    <motion.article 
      variants={cardReveal} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, amount: 0.1 }} 
      className="rounded-md overflow-hidden relative shadow-[0_8px_30px_rgba(184,96,26,0.15)] flex flex-col items-center mt-6 bg-[#FBF6EC] pb-4"
    >
      <Image 
        src="/photos/haldi.png" 
        alt="Haldi Ceremony Invitation" 
        width={400} 
        height={600} 
        className="w-full h-auto object-cover" 
      />
      <p className="font-serif italic text-[#B8601A] text-sm mt-3">At Swapnapurti Lawns</p>
    </motion.article>
  )
}

function WeddingCard() {
  const [particlesActive, setParticlesActive] = useState(false)
  
  return (
    <motion.article 
      variants={cardReveal} 
      initial="hidden" 
      whileInView="show" 
      onViewportEnter={() => setParticlesActive(true)}
      viewport={{ once: true, amount: 0.1 }} 
      className="rounded-lg overflow-hidden relative shadow-[0_8px_40px_rgba(209,0,86,0.2)] mt-8 scale-105 border border-[#D10056]/30 z-20 cursor-pointer"
    >
       {/* Background gradient */}
       <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#D10056] to-[#7A1142]" />

       {/* Particle Effect on Enter */}
       {particlesActive && <Particles />}

       <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
         <div className="absolute top-0 inset-x-0 h-40 border-t-4 border-l-4 border-r-4 border-[#F5EDE0]/20 rounded-t-full mx-6 mt-6 pointer-events-none" />
         
         <div className="relative w-32 h-32 mt-4 mb-2 z-20 rounded-full bg-[#F5EDE0] shadow-[0_0_20px_#F5EDE0] overflow-hidden p-2 ring-2 ring-[#F5EDE0]/30">
            <Image src="/photos/caricature.png" alt="Couple Caricature" fill sizes="150px" className="object-cover object-top" />
         </div>

         <h3 className="font-script leading-tight px-12 text-[#F5EDE0] text-[48px] drop-shadow-lg mt-2">Wedding</h3>
         <p className="font-serif italic text-sm mt-1 text-[#F5EDE0]/80">विवाह सोहळे</p>

         <div className="w-full mt-6"><ScallopDivider bg="transparent" accent="#F5EDE0" /></div>
       </div>

       <div className="bg-[#FBF6EC] px-6 pb-8 pt-4 text-center relative z-10">
         <p className="font-display text-[11px] tracking-[0.35em] text-[#D10056]/80">APRIL</p>
         <div className="flex items-center justify-center gap-4 mt-1">
           <div className="text-right min-w-[70px]">
             <p className="font-display text-[10px] tracking-[0.12em] text-[#008080]/60 uppercase">Sunday</p>
             <div className="h-px mt-1 bg-[#008080]/20" />
           </div>
           <p className="font-display font-semibold text-[52px] leading-none text-[#D10056]">26</p>
           <div className="text-left min-w-[70px]">
             <p className="font-display text-[9px] tracking-[0.05em] text-[#008080]/70 uppercase font-bold">12:43 PM</p>
             <div className="h-px mt-1 bg-[#008080]/20" />
           </div>
         </div>
         <p className="font-display text-[11px] tracking-[0.35em] mt-1 text-[#D10056]/80 mb-3">2026</p>
         
         <p className="font-serif italic text-[#008080] text-sm font-medium">The sacred union under the mandap</p>
         <ViewLocationBtn bg="#D10056" href={NASHIK_MAP_LINK} />
       </div>
    </motion.article>
  )
}

function SangeetCard() {
  return (
    <motion.article 
      variants={cardReveal} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, amount: 0.1 }} 
      className="rounded-md overflow-hidden relative shadow-[0_8px_30px_rgba(122,17,66,0.15)] flex flex-col items-center mt-6 bg-[#FBF6EC] pb-4"
    >
      <Image 
        src="/photos/sangeet.png" 
        alt="Sangeet Ceremony Invitation" 
        width={400} 
        height={600} 
        className="w-full h-auto object-cover" 
      />
      <p className="font-serif italic text-[#7A1142] text-sm mt-3">At Residence</p>
    </motion.article>
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
        <h2 className="font-display text-[#D10056] text-3xl tracking-[0.15em] uppercase">Sacred Ceremonies</h2>
        <p className="font-serif italic text-[#008080] text-sm mt-1 tracking-wider">पवित्र सोहळे</p>
      </motion.div>

      <div className="flex flex-col gap-6 max-w-sm mx-auto">
        <MehendiCard />
        <SangeetCard />
        <HaldiCard />
        <WeddingCard />
      </div>
    </section>
  )
}
