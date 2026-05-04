'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const FADE = (delayMs: number) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 1.1, delay: delayMs / 1000, ease: 'easeOut' },
  },
})

/* ── Floating pearl dots ── */
function FloatingPearls() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const pearls = [
    { x: '15%', y: '38%', size: 8, delay: 0 },
    { x: '25%', y: '55%', size: 6, delay: 0.8 },
    { x: '72%', y: '42%', size: 9, delay: 0.4 },
    { x: '82%', y: '60%', size: 5, delay: 1.2 },
    { x: '45%', y: '72%', size: 7, delay: 0.6 },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {pearls.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pearl-shimmer"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: 'radial-gradient(circle at 35% 35%, #fff 0%, #e8d8d0 40%, #c9a8a0 100%)',
            boxShadow: '0 2px 6px rgba(168,87,106,0.2), inset 0 1px 2px rgba(255,255,255,0.8)',
            animationDelay: `${p.delay}s`,
          }}
          animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  )
}

/* ── Scratch-reveal date ── */
function ScratchRevealDate({ onReveal }: { onReveal: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) { setIsRevealed(true); onReveal(); return }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = 280, H = 80
    canvas.width = W; canvas.height = H
    ctx.fillStyle = '#A8576A'
    ctx.fillRect(0, 0, W, H)
    for (let i = 0; i < 180; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#8A3E4A' : '#C88A8F'
      ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2)
    }
    ctx.font = 'italic 15px serif'
    ctx.fillStyle = 'rgba(255,245,235,0.85)'
    ctx.textAlign = 'center'
    ctx.fillText('✦ Scratch to Reveal ✦', W / 2, H / 2 + 5)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = 28
    let isDrawing = false, scratchedPixels = 0

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY
      return { x: cx - rect.left, y: cy - rect.top }
    }
    const onStart = (e: MouseEvent | TouchEvent) => { isDrawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y) }
    const onMove  = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return
      if ('touches' in e && e.cancelable) e.preventDefault()
      const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke()
      if (++scratchedPixels > 70) {
        setIsRevealed(true); onReveal()
        canvas.style.transition = 'opacity 0.8s ease'; canvas.style.opacity = '0'
        setTimeout(() => { canvas.style.display = 'none' }, 800)
      }
    }
    const onEnd = () => { isDrawing = false }
    canvas.addEventListener('mousedown', onStart)
    canvas.addEventListener('mousemove', onMove, { passive: false })
    window.addEventListener('mouseup', onEnd)
    canvas.addEventListener('touchstart', onStart, { passive: false })
    canvas.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)
    return () => {
      canvas.removeEventListener('mousedown', onStart)
      canvas.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onEnd)
      canvas.removeEventListener('touchstart', onStart)
      canvas.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [isRevealed, onReveal, prefersReduced])

  return (
    <div className="relative w-[280px] h-[80px] flex items-center justify-center mx-auto my-4 select-none cursor-pointer">
      <h3 className="font-script text-[#A8576A] text-[46px] absolute z-0 tracking-wide drop-shadow-md whitespace-nowrap">
        14 May 2026
      </h3>
      {!prefersReduced && (
        <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full rounded-lg shadow-md" style={{ touchAction: 'none' }} />
      )}
    </div>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const initial = prefersReduced ? 'show' : 'hidden'
  const [celebrateDate, setCelebrateDate] = useState(false)

  const handleReveal = () => {
    setCelebrateDate(true)
    import('@/lib/petalShower').then(({ triggerPetalShower }) => triggerPetalShower())
  }

  return (
    <section
      className="relative flex flex-col items-center text-center overflow-hidden min-h-screen justify-center"
      aria-label="Hero"
      style={{ background: 'linear-gradient(180deg, #FAF3EE 0%, #F5E8E2 60%, #EDD8D3 100%)' }}
    >
      {/* ── Floating pearls ── */}
      <FloatingPearls />

      {/* ── Top floral border (3image = full-width arch with butterflies) ── */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none select-none w-full">
        <img
          src="/elements/3image.png"
          alt=""
          aria-hidden="true"
          className="w-full object-contain object-top"
          style={{ maxHeight: '340px', objectPosition: 'top center' }}
        />
      </div>

      {/* ── Main content (pushed below the floral border) ── */}
      <div className="relative z-10 w-full max-w-sm mx-auto pt-[160px] pb-12 px-4 flex flex-col items-center">

        {/* Om symbol / Ganpati */}
        <motion.div variants={FADE(0)} initial={initial} animate="show" className="mb-5 mt-2">
          <div className="relative w-40 h-40 heartbeat">
            <Image src="/photos/shreya wedding/ganpati1.png" alt="Ganapati" fill className="object-contain drop-shadow-md" />
          </div>
        </motion.div>

        {/* Together with our families */}
        <motion.p
          variants={FADE(200)} initial={initial} animate="show"
          className="font-sans text-[#C88A8F] tracking-[0.22em] text-[11px] uppercase font-semibold mb-5"
        >
          Together With Our Families
        </motion.p>

        {/* Names */}
        <motion.div variants={FADE(500)} initial={initial} animate="show" className="mb-5 text-center">
          <h1 className="font-display font-medium tracking-[0.12em] leading-tight text-[#6E2A36] text-[42px] uppercase drop-shadow-sm">
            Naveen
          </h1>
          <span className="font-script gold-text-shimmer text-[60px] leading-none block my-2">&amp;</span>
          <h1 className="font-display font-medium tracking-[0.12em] leading-tight text-[#6E2A36] text-[42px] uppercase drop-shadow-sm">
            Shreya
          </h1>
          <p className="font-script gold-text-shimmer text-[50px] mt-8 leading-tight px-4 py-2">#ShreVeen</p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={FADE(800)} initial={initial} animate="show"
          className="font-serif italic text-[#A8576A] text-base opacity-90 mb-8 leading-relaxed"
        >
          Invite you to celebrate the beginning<br />of their forever
        </motion.p>

        {/* Gold divider line */}
        <motion.div variants={FADE(900)} initial={initial} animate="show" className="flex items-center gap-3 w-full mb-8">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-[#C9A46A] opacity-80" style={{ boxShadow: '0 0 8px rgba(201,164,106,0.5)' }} />
          <span className="gold-text-shimmer text-xl">✦</span>
          <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-[#C9A46A] opacity-80" style={{ boxShadow: '0 0 8px rgba(201,164,106,0.5)' }} />
        </motion.div>

        {/* Caricature */}
        <motion.div variants={FADE(1000)} initial={initial} animate="show" className="relative w-full flex justify-center mb-8">
          <div
            className="relative w-[360px] h-[360px] rounded-[80px_80px_20px_20px] overflow-hidden"
            style={{
              background: 'rgba(200,138,143,0.08)',
              boxShadow: '0 8px 40px rgba(168,87,106,0.15), inset 0 0 0 1.5px rgba(201,164,106,0.3)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F5E8E2] opacity-25 z-10" />
            <Image
              src="/photos/shreya wedding/caricature1.png"
              alt="Naveen and Shreya Caricature"
              fill sizes="270px"
              className="object-cover object-[center_top] relative z-0"
              priority
            />
          </div>
        </motion.div>

        {/* Logo under caricature */}
        <motion.div
          variants={FADE(1100)} initial={initial} animate="show"
          className="relative w-[320px] h-[160px] flex justify-center mx-auto mb-8 float-gentle"
        >
          <Image src="/photos/shreya wedding/logos_n.png" alt="Couple Logo" fill sizes="320px" className="object-contain drop-shadow-md scale-110" />
        </motion.div>

        {/* Save the Date */}
        <motion.div variants={FADE(1200)} initial={initial} animate="show" className="mb-2">
          <p className="font-sans gold-glow tracking-[0.22em] text-[11px] uppercase font-bold mb-1">Save The Date</p>
          <h2 className="font-serif text-[34px] tracking-widest text-[#6E2A36] font-medium leading-none" style={{ textShadow: '0 2px 12px rgba(168,87,106,0.15)' }}>
            Scratch & Reveal
          </h2>
        </motion.div>

        {/* Scratch card */}
        <motion.div variants={FADE(1400)} initial={initial} animate="show" className="w-full flex justify-center mb-8 relative z-20">
          <ScratchRevealDate onReveal={handleReveal} />
        </motion.div>

        {/* Location */}
        <motion.div variants={FADE(1600)} initial={initial} animate="show" className="text-center">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-[1.5px] bg-[#C9A46A] opacity-50" />
            <span className="gold-text-shimmer text-sm">✦</span>
            <div className="flex-1 h-[1.5px] bg-[#C9A46A] opacity-50" />
          </div>
          <p className="font-sans uppercase tracking-[0.18em] text-[10px] text-[#A8576A] font-semibold opacity-90">
            Vaibhav Hall, Belagavi
          </p>
          <p className="font-serif italic text-[#C88A8F] text-sm mt-1">Thursday · 12:32 PM</p>
        </motion.div>

        {/* Bottom floral element (1image - wreath/arch shape flipped) */}
        <div className="w-full mt-10 pointer-events-none select-none" aria-hidden="true">
          <img
            src="/elements/1image.png"
            alt=""
            className="w-full object-contain"
            style={{ maxHeight: '180px', transform: 'scaleY(-1)', opacity: 0.9 }}
          />
        </div>
      </div>
    </section>
  )
}
