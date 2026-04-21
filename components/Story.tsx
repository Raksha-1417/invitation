'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

function Tape({ rotate, top, left, right, bottom }: any) {
  return (
    <div 
      className="absolute bg-[#F5EDE0] z-20 opacity-80 backdrop-blur-sm mix-blend-multiply"
      style={{
        width: '70px',
        height: '24px',
        transform: `rotate(${rotate}deg)`,
        top, left, right, bottom,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    />
  )
}

function HeartDoodle({ x, y, rotate }: { x: string, y: string, rotate: number }) {
  return (
    <motion.svg 
      className="absolute text-rani stroke-current z-10 pointer-events-none"
      width="30" height="30" viewBox="0 0 50 50" fill="none"
      style={{ left: x, top: y, rotate }}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.8 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
    >
      <motion.path 
        d="M25 45 C -10 25, 5 0, 25 15 C 45 0, 60 25, 25 45 Z" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </motion.svg>
  )
}

function Polaroid({ src, caption, rotate, delay, xOffset, index = 0 }: any) {
  const prefersReduced = useReducedMotion()
  const hasCornerTape = index % 2 === 0
  const hasPin = index % 3 === 1

  return (
    <motion.div 
      className="relative bg-[#FAFAFA] p-3 pb-12 shadow-[0_8px_20px_rgba(43,31,26,0.15)] mx-auto my-12"
      style={{ width: '85%', maxWidth: '300px', x: xOffset }}
      initial={prefersReduced ? { opacity: 1, rotate } : { opacity: 0, scale: 0.9, rotate: rotate - 15, y: 50 }}
      whileInView={prefersReduced ? {} : { opacity: 1, scale: 1, rotate, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay }}
    >
      {/* Tape on top */}
      <Tape top="-10px" left="50%" rotate={(rotate || 0) * -0.5} />
      
      {/* Tape on a random corner sometimes */}
      {hasCornerTape && <Tape bottom="-10px" right="-10px" rotate={45} />}

      <div className="relative w-full aspect-square overflow-hidden shadow-[inset_0_0_8px_rgba(0,0,0,0.1)] mb-3 bg-cream">
        <Image 
          src={src} 
          alt={caption} 
          fill
          sizes="(max-width: 400px) 300px, 400px"
          className="object-cover" 
          loading="lazy" 
        />
        {/* Soft vintage photo filter overlay */}
        <div className="absolute inset-0 bg-[#008080] mix-blend-color opacity-10 pointer-events-none" />
      </div>

      <div className="absolute left-0 right-0 bottom-3 text-center">
        <motion.p
          className="font-script text-[32px] text-[#D10056]"
          initial={prefersReduced ? { opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          whileInView={prefersReduced ? {} : { clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "linear", delay: delay + 0.8 }}
        >
          {caption}
        </motion.p>
      </div>

      {/* Pin effect sometimes */}
      {hasPin && (
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#008080]/30 shadow-[1px_2px_4px_rgba(0,0,0,0.3)] z-30" />
      )}
    </motion.div>
  )
}

export default function Story() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const yScroll1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const yScroll2 = useTransform(scrollYProgress, [0, 1], [0, 50])

  return (
    <section ref={containerRef} className="py-20 px-4 relative overflow-hidden" aria-label="Our Story">
      
      {/* Torn Paper Edge SVG Filter definition */}
      <svg width="0" height="0" className="hidden absolute">
        <filter id="torn-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Scrapbook Container */}
      <div 
        className="relative max-w-[380px] mx-auto bg-[#F5EDE0] border border-[#008080]/15 p-6 pb-20 z-10"
        style={{
          boxShadow: '0 20px 40px rgba(43,31,26,0.1), inset 0 0 60px rgba(229,207,165,0.2)',
          filter: 'url(#torn-edge)'
        }}
      >
        {/* Binder Holes */}
        <div className="absolute left-3 top-0 bottom-0 w-4 flex flex-col justify-between py-10 opacity-60">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="w-4 h-4 rounded-full bg-[#2B1F1A] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />
          ))}
        </div>

        <motion.div
           className="text-center mt-6 mb-16 pl-4"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="font-script text-[#D10056] text-[56px] leading-[0.8] mb-4">Our <br/><span className="text-[44px] ml-12">Scrapbook</span></h2>
          <p className="font-serif italic text-[#008080] text-sm">Every picture tells our story...</p>
        </motion.div>

        <div className="pl-6 relative"> {/* Offset for binder holes */}
          
          <HeartDoodle x="10%" y="-20px" rotate={-15} />
          
          <motion.div style={{ y: yScroll1 }}>
            <Polaroid 
              src="/photos/story-1.jpg" 
              caption="Together" 
              rotate={-4} 
              delay={0}
              xOffset="-5%"
              index={0}
            />
          </motion.div>

          <HeartDoodle x="80%" y="25%" rotate={25} />

          <motion.div style={{ y: yScroll2 }}>
            <Polaroid 
              src="/photos/story-2.jpg" 
              caption="Always" 
              rotate={3} 
              delay={0.2}
              xOffset="5%"
              index={1}
            />
          </motion.div>
          
          {/* Subtle Sage Green Vine SVG Sticker */}
          <motion.svg 
            className="absolute left-0 top-[50%] z-20 pointer-events-none opacity-80 mix-blend-multiply" 
             width="60" height="100" viewBox="0 0 60 100"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 0.8 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 1 }}
          >
             <path d="M10 90 Q30 50 10 10" stroke="#D10056" strokeWidth="2" fill="none" strokeDasharray="4 2" opacity="0.3"/>
             <path d="M15 70 Q25 65 20 60" fill="#D10056" opacity="0.3"/>
             <path d="M25 40 Q35 35 30 30" fill="#008080" opacity="0.3"/>
          </motion.svg>

          <motion.div style={{ y: yScroll1 }}>
            <Polaroid 
              src="/photos/story-3.jpg" 
              caption="Forever" 
              rotate={-2} 
              delay={0.1}
              xOffset="-2%"
              index={2}
            />
          </motion.div>

          <HeartDoodle x="15%" y="75%" rotate={-35} />

        </div>
      </div>
    </section>
  )
}
