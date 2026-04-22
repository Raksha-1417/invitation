'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { scrollReveal } from '@/lib/motion'

function VenueFloralCorner({ flip, color = "#008080" }: { flip?: boolean, color?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={100} height={100} fill="none" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M10 90 Q30 40 90 10" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M20 90 Q40 50 80 20" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M30 70 Q45 55 60 40" stroke={color} strokeWidth="1" opacity="0.3" />
      
      {/* Flower */}
      <circle cx="80" cy="20" r="8" fill={color} opacity="0.8" />
      <circle cx="80" cy="20" r="4" fill="#F5EDE0" />
      
      {/* Petals */}
      {[0, 72, 144, 216, 288].map(deg => (
        <ellipse key={deg} cx={80 + 12 * Math.cos((deg - 90) * Math.PI / 180)} cy={20 + 12 * Math.sin((deg - 90) * Math.PI / 180)} rx="5" ry="8" fill={color} opacity="0.6" transform={`rotate(${deg} ${80 + 12 * Math.cos((deg - 90) * Math.PI / 180)} ${20 + 12 * Math.sin((deg - 90) * Math.PI / 180)})`} />
      ))}
      
      {/* Leaves */}
      <path d="M40 75 Q45 65 55 68 Q48 78 40 75" fill={color} opacity="0.5" />
      <path d="M55 55 Q65 48 72 55 Q62 65 55 55" fill={color} opacity="0.4" />
    </svg>
  )
}

function MapButton({ href, label }: { href: string; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 text-[#F5EDE0] font-display uppercase tracking-widest text-sm transition-transform active:scale-95 shadow-[0_4px_12px_rgba(0,128,128,0.25)] mt-6"
      style={{ background: 'linear-gradient(135deg, #008080, #006666)' }}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {label}
    </a>
  )
}

export default function Venue() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #F5EDE0 0%, #FBF6EC 60%, #F5EDE0 100%)' }} aria-label="Venues">
      
      {/* Soft background glow */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#F5EDE0] to-transparent pointer-events-none" />

      {/* Title */}
      <motion.div
        className="text-center mb-12 relative z-10"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className="font-serif text-[#008080] text-sm mt-1 tracking-wider mb-2">ठिकाण</p>
        <h2 className="font-display text-[#D10056] text-[34px] tracking-[0.15em] mb-4">The Venue</h2>
        <div className="mx-auto w-16 h-px opacity-50" style={{ background: '#008080' }} />
      </motion.div>

      {/* Main Venue Card */}
      <motion.div 
        className="max-w-md mx-auto relative p-8 z-10"
        style={{
          background: 'rgba(255,255,255,0.7)',
          border: '1.5px solid rgba(209,0,86,0.2)',
          boxShadow: '0 12px 40px rgba(0,128,128,0.08)',
          borderRadius: 12,
        }}
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Inner border */}
        <div className="absolute inset-3 rounded-lg pointer-events-none" style={{ border: '1px solid rgba(0,128,128,0.1)' }} />
        
        {/* Corners using new colors */}
        <div className="absolute -top-4 -left-4 pointer-events-none opacity-80"><VenueFloralCorner color="#D10056" /></div>
        <div className="absolute -top-4 -right-4 pointer-events-none opacity-80"><VenueFloralCorner flip color="#008080" /></div>
        <div className="absolute -bottom-4 -left-4 pointer-events-none opacity-80 rotate-180"><VenueFloralCorner flip color="#008080" /></div>
        <div className="absolute -bottom-4 -right-4 pointer-events-none opacity-80 rotate-180"><VenueFloralCorner color="#D10056" /></div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <p className="font-serif italic text-[#008080] text-lg mb-2">Haldi &amp; Wedding</p>
          <h3 className="font-display text-[#D10056] text-[28px] tracking-wide mb-6">Swapnapurti Lawns</h3>
          
          <div className="w-10 h-px mb-6" style={{ background: 'rgba(209,0,86,0.25)' }} />

          <address className="not-italic font-serif text-[#1a1a1a] text-base leading-relaxed mb-4">
            Opp Shell Petrol Pump, <br/>
            Near Mirchi Hotel, Nandur Naka, <br/>
            Nashik, Maharashtra
          </address>

          <p className="font-sans text-xs uppercase tracking-widest text-[#008080] mb-8">
            Main Ceremonies
          </p>

          <MapButton href="https://maps.app.goo.gl/xDXkPKzS7PEKkJ9y5" label="Open in Google Maps" />
        </div>
      </motion.div>

    </section>
  )
}
