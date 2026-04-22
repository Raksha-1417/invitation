'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Divider from './svg/Divider'
import Paisley from './svg/Paisley'

const FADE = (delay: number) => ({
  hidden: { opacity: 0, y: 15, filter: 'blur(3px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: 'easeOut', delay: delay / 1000 },
  },
})

function BokehLights() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  
  if (prefersReduced || !mounted) return null
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 6 }).map((_, i) => {
        const size = (Math.sin(i * 12.9898) * 43758.5453 % 1 + 1) / 2 * 100 + 40
        const posX = (Math.sin(i * 78.233) * 43758.5453 % 1 + 1) / 2 * 100
        const posY = (Math.cos(i * 12.9898) * 43758.5453 % 1 + 1) / 2 * 100
        const duration = (Math.sin(i) * 43758.5453 % 1 + 1) / 2 * 5 + 5
        const delay = (Math.cos(i) * 43758.5453 % 1 + 1) / 2 * 2
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: 'radial-gradient(circle, rgba(200, 150, 74, 0.1) 0%, rgba(200, 150, 74, 0) 70%)',
              left: `${posX}%`,
              top: `${posY}%`,
              filter: 'blur(10px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (Math.sin(i * 3) * 40 - 20), 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
          />
        )
      })}
    </div>
  )
}

function Particles() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden mix-blend-screen">
      {Array.from({ length: 25 }).map((_, i) => {
        const scaleMax = Math.abs(Math.sin(i * 11)) * 1 + 0.5
        const targetX = 50 + (Math.sin(i * 5) * 40)
        const targetY = 100 - (Math.cos(i * 7) * 60 + 40)
        const dur = Math.abs(Math.sin(i * 3)) * 1.5 + 1.5
        const del = 2.2 + Math.abs(Math.cos(i * 13)) * 0.5
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#D10056] shadow-[0_0_12px_3px_rgba(209,0,86,0.5)]"
            initial={{ 
              opacity: 0, 
              scale: 0, 
              x: '50%', y: '100%' 
            }}
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

function FloralCorner({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 90 80" width={110} height={100} fill="none" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M8 78 Q22 50 52 22" stroke="#008080" strokeWidth="1.3" opacity="0.55" />
      <path d="M14 78 Q30 52 58 30" stroke="#008080" strokeWidth="1" opacity="0.4" />
      <path d="M22 78 Q38 56 64 38" stroke="#008080" strokeWidth="1" opacity="0.35" />
      <path d="M28 58 Q36 48 46 47 Q40 55 28 58" fill="#008080" opacity="0.38" />
      <path d="M38 66 Q47 56 58 56 Q51 63 38 66" fill="#008080" opacity="0.32" />
      <path d="M18 62 Q22 52 30 52 Q26 60 18 62" fill="#008080" opacity="0.28" />
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={i} cx={52 + 10 * Math.cos(((deg - 90) * Math.PI) / 180)} cy={22 + 10 * Math.sin(((deg - 90) * Math.PI) / 180)} rx={5} ry={9} fill="#F5EDE0" opacity={0.88} transform={`rotate(${deg} ${52 + 10 * Math.cos(((deg - 90) * Math.PI) / 180)} ${22 + 10 * Math.sin(((deg - 90) * Math.PI) / 180)})`} />
      ))}
      <circle cx="52" cy="22" r="5.5" fill="#D10056" opacity="0.9" />
      <circle cx="52" cy="22" r="2.5" fill="#008080" />
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={i} cx={70 + 8 * Math.cos(((deg - 90) * Math.PI) / 180)} cy={38 + 8 * Math.sin(((deg - 90) * Math.PI) / 180)} rx={4} ry={7} fill="#F5EDE0" opacity={0.82} transform={`rotate(${deg} ${70 + 8 * Math.cos(((deg - 90) * Math.PI) / 180)} ${38 + 8 * Math.sin(((deg - 90) * Math.PI) / 180)})`} />
      ))}
      <circle cx="70" cy="38" r="4" fill="#008080" opacity="0.85" />
      <circle cx="70" cy="38" r="2" fill="#D10056" />
    </svg>
  )
}

function LotusRow() {
  const lotuses = [
    { cx: 30, cy: 38, r: 1.1, color: '#F5EDE0' },
    { cx: 80, cy: 42, r: 0.85, color: '#F5EDE0' },
    { cx: 130, cy: 36, r: 1.25, color: '#F5EDE0' },
    { cx: 180, cy: 42, r: 0.85, color: '#F5EDE0' },
    { cx: 230, cy: 38, r: 1.0, color: '#F5EDE0' },
  ]
  return (
    <svg viewBox="0 0 260 56" width={300} height={66} fill="none" aria-hidden="true" className="opacity-90">
      <path d="M0 46 Q130 40 260 46" stroke="#008080" strokeWidth="1" opacity="0.4" />
      <path d="M0 50 Q130 44 260 50" stroke="#008080" strokeWidth="0.8" opacity="0.25" />
      {lotuses.map((l, li) => (
        <g key={li} transform={`translate(${l.cx}, ${l.cy}) scale(${l.r})`}>
          <ellipse cx="0" cy="6" rx="12" ry="5" fill="#008080" opacity="0.25" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <ellipse key={i} cx={11 * Math.cos(((deg - 90) * Math.PI) / 180)} cy={-6 + 11 * Math.sin(((deg - 90) * Math.PI) / 180) * 0.5} rx={4.5} ry={8} fill={l.color} opacity={0.85} transform={`rotate(${deg})`} />
          ))}
          {[22, 112, 202, 292].map((deg, i) => (
              <ellipse key={i} cx={6 * Math.cos(((deg - 90) * Math.PI) / 180)} cy={-4 + 6 * Math.sin(((deg - 90) * Math.PI) / 180) * 0.5} rx={3} ry={6} fill={l.color} opacity={0.95} transform={`rotate(${deg})`} />
          ))}
          <circle cx="0" cy="-5" r="4.5" fill="#D10056" opacity="0.95" />
          <circle cx="0" cy="-5" r="2.2" fill="#008080" />
        </g>
      ))}
    </svg>
  )
}


function ScratchRevealDate({ onReveal }: { onReveal: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsRevealed(true);
      onReveal();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas
    const width = 280;
    const height = 80;
    canvas.width = width;
    canvas.height = height;

    // Draw scratch covering (Teal Foil)
    ctx.fillStyle = '#008080';
    ctx.fillRect(0, 0, width, height);

    // Add some noise/texture to look like scratch-off stuff
    for (let i = 0; i < 200; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#006666' : '#009999';
        ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
    
    // Draw "Scratch Here" text lightly
    ctx.font = '16px serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to Reveal', width / 2, height / 2 + 5);

    let isDrawing = false;
    let scratchedPixels = 0;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 25;

    // Brush config to "erase" drawing
    ctx.globalCompositeOperation = 'destination-out';

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (isRevealed) return;
      isDrawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || isRevealed) return;
      // prevent scrolling while scratching
      if ('touches' in e && e.cancelable) e.preventDefault(); 
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      // Check how much is scratched
      scratchedPixels++;
      if (scratchedPixels > 70) {
        setIsRevealed(true);
        onReveal();
        canvas.style.transition = 'opacity 0.8s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.style.display = 'none';
        }, 800);
      }
    };

    const handleEnd = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isRevealed, onReveal, prefersReduced]);

  return (
    <div className="relative w-[280px] h-[80px] flex items-center justify-center mx-auto my-6 select-none cursor-pointer">
      {/* The actual date behind */}
      <h3 className="font-script text-[#D10056] text-[48px] absolute z-0 tracking-wide drop-shadow-md whitespace-nowrap">
        26 April 2026
      </h3>
      
      {/* The scratchable canvas on top */}
      {!prefersReduced && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-10 w-full h-full rounded-md shadow-lg"
          style={{ touchAction: 'none' }}
        />
      )}
    </div>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const initial = prefersReduced ? 'show' : 'hidden'
  const [particlesFly, setParticlesFly] = useState(false)

  const handleReveal = () => {
    setParticlesFly(true)
    // Add big celebratory petal shower on reveal
    import('@/lib/petalShower').then(({ triggerPetalShower }) => {
      triggerPetalShower()
    })
  }

  const FADE = (delayMs: number) => ({
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, delay: delayMs / 1000, ease: 'easeOut' } }
  })

  return (
    <section
      className="relative flex flex-col items-center text-center py-12 px-4 overflow-hidden min-h-screen justify-center"
      aria-label="Hero"
      style={{
        background: 'linear-gradient(to bottom, #F5EDE0 0%, #FBF6EC 50%, #F5EDE0 100%)'
      }}
    >
      <BokehLights />
      
      {/* Decorative Glow Top */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-64 z-0"
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(0, 128, 128, 0.12) 0%, transparent 80%)' }}
      />
      
      {particlesFly && <Particles />}

      <div className="relative z-10 w-full max-w-sm mx-auto pt-8 flex flex-col items-center">
        
        {/* Om Logo */}
        <motion.div variants={FADE(0)} initial={initial} animate="show" className="mb-4">
          <div className="relative w-16 h-16 mb-4 mt-6 animate-pulse scale-110 drop-shadow-[0_0_15px_rgba(209,0,86,0.3)]">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Om_symbol.svg/250px-Om_symbol.svg.png" 
              alt="Om Symbol" 
              fill 
              className="object-contain" 
              style={{ 
                filter: 'invert(15%) sepia(82%) saturate(3828%) hue-rotate(320deg) brightness(88%) contrast(108%) drop-shadow(0 0 10px rgba(209,0,86,0.3))' 
              }}
            />
          </div>
        </motion.div>
        
        {/* Top Text (TOGETHER WITH OUR FAMILIES) */}
        <motion.div variants={FADE(300)} initial={initial} animate="show" className="mb-6">
          <p className="font-serif text-[#008080] tracking-[0.2em] text-[12px] uppercase opacity-90 font-bold">
            Together With Our Families
          </p>
        </motion.div>

        {/* Rohit & Nandini (Pink and Teal) */}
        <motion.div variants={FADE(600)} initial={initial} animate="show" className="mb-6 text-center">
          <h1 className="font-display font-medium tracking-[0.15em] leading-tight text-[#D10056] text-[40px] uppercase drop-shadow-sm">
            Rohit <br/>
            <span className="font-script text-[#008080] text-[44px] lowercase px-2">&amp;</span> <br/>
            Nandini
          </h1>
        </motion.div>

        {/* Invitation Text */}
        <motion.div variants={FADE(900)} initial={initial} animate="show" className="mb-8">
           <p className="font-serif text-[#008080] text-sm md:text-base opacity-90 mx-6 italic">
             Invite you to join us in the celebration of our love
           </p>
        </motion.div>

        {/* Caricature Frame Section */}
        <motion.div
           variants={FADE(1200)}
           initial={initial}
           animate="show"
           className="relative w-full flex justify-center mb-8"
        >
          <div className="relative w-[320px] h-[320px] rounded-[100px_100px_20px_20px] overflow-hidden" 
               style={{ 
                 background: 'rgba(0, 128, 128, 0.05)', 
                 backdropFilter: 'blur(10px)',
                 boxShadow: '0 8px 32px rgba(43,31,26,0.08), inset 0 0 0 1px rgba(0, 128, 128, 0.3)' 
               }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F5EDE0] opacity-30 z-10" />
            <Image
              src="/photos/caricature.png"
              alt="Rohit and Nandini Caricature"
              fill
              sizes="(max-width: 400px) 320px"
              className="object-cover object-[center_top] relative z-0"
              priority
            />
          </div>
        </motion.div>

        {/* Save the Date */}
        <motion.div variants={FADE(1300)} initial={initial} animate="show" className="relative mt-8 mb-2">
          <h2 
            className="font-serif text-[38px] tracking-widest uppercase text-[#D10056] font-medium leading-none"
            style={{ textShadow: '0 0 20px rgba(0, 128, 128, 0.3)' }}
          >
            Save the Date
          </h2>
        </motion.div>

        {/* Scratch To Reveal Date */}
        <motion.div variants={FADE(1500)} initial={initial} animate="show" className="w-full flex justify-center mb-6 relative z-20">
           <ScratchRevealDate onReveal={handleReveal} />
        </motion.div>

        {/* Location Placeholder */}
        <motion.div variants={FADE(1800)} initial={initial} animate="show" className="mt-2 text-[#008080]">
           <div className="w-20 h-px bg-[#008080] mx-auto opacity-50 mb-3" />
           <p className="font-serif uppercase tracking-widest text-xs font-bold opacity-90">Nashik, Maharashtra</p>
        </motion.div>
      </div>
    </section>
  )
}
