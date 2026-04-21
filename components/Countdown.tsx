'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { scrollReveal } from '@/lib/motion'

const WEDDING_DATE = new Date('2026-04-26T12:43:00+05:30')

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function DigitBlock({ value, label, accent }: { value: number; label: string; accent: 'pink' | 'teal' }) {
  const display = String(value).padStart(2, '0')
  const color   = accent === 'pink' ? '#D10056' : '#008080'
  const colorSoft = accent === 'pink' ? 'rgba(209,0,86,0.12)' : 'rgba(0,128,128,0.12)'
  const colorBorder = accent === 'pink' ? 'rgba(209,0,86,0.35)' : 'rgba(0,128,128,0.35)'

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Card */}
      <div
        style={{
          width: 66, minHeight: 80,
          background: `linear-gradient(145deg, #FFFFFF 0%, #F5EDE0 100%)`,
          border: `2px solid ${colorBorder}`,
          borderRadius: 10,
          boxShadow: `0 4px 15px ${colorSoft}, 0 1px 2px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Top color strip */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: color, opacity: 0.85 }} />
        {/* Separator line */}
        <div style={{ position: 'absolute', top: '50%', left: 8, right: 8, height: 1, background: colorBorder }} />
        {/* Number */}
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: color,
            letterSpacing: '0.02em',
            lineHeight: 1,
            fontFamily: 'serif',
            textShadow: `0 2px 6px ${colorSoft}`,
          }}
        >
          {display}
        </span>
      </div>
      {/* Label */}
      <span style={{ fontSize: 10, color, fontFamily: 'serif', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft)
  const [mounted, setMounted]   = useState(false)
  const prefersReduced          = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  const isDone = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <section
      id="countdown-section"
      className="py-14 px-6 text-center"
      aria-label="Countdown to wedding"
      style={{ background: 'linear-gradient(160deg, #F5EDE0 0%, #FDF8F2 60%, #F5EDE0 100%)' }}
    >
      <motion.div
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Marathi / subheading */}
        <p style={{ fontSize: 20, color: '#D10056', fontFamily: 'serif', letterSpacing: '0.1em', marginBottom: 4 }}>
          {isDone ? 'आज आमचा दिवस आहे 🎉' : 'विवाहापर्यंत'}
        </p>
        <p style={{ fontSize: 14, color: '#008080', fontFamily: 'serif', fontStyle: 'italic', marginBottom: 32, letterSpacing: '0.06em' }}>
          {isDone ? "Today's the day!" : 'Counting down to the celebration'}
        </p>

        {!isDone && mounted && (
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <DigitBlock value={timeLeft.days}    label="Days"    accent="pink" />
            <span style={{ fontSize: 20, color: '#D10056', fontFamily: 'serif', fontWeight: 700, paddingBottom: 24, opacity: 0.6 }}>:</span>
            <DigitBlock value={timeLeft.hours}   label="Hours"   accent="teal" />
            <span style={{ fontSize: 20, color: '#008080', fontFamily: 'serif', fontWeight: 700, paddingBottom: 24, opacity: 0.6 }}>:</span>
            <DigitBlock value={timeLeft.minutes} label="Min"     accent="pink" />
            <span style={{ fontSize: 20, color: '#D10056', fontFamily: 'serif', fontWeight: 700, paddingBottom: 24, opacity: 0.6 }}>:</span>
            <DigitBlock value={timeLeft.seconds} label="Sec"     accent="teal" />
          </div>
        )}

        {isDone && (
          <p style={{ fontSize: 34, color: '#D10056', fontFamily: 'serif', letterSpacing: '0.12em' }}>
            शुभ विवाह ✨
          </p>
        )}

        {/* Date tag */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <div style={{ height: 1, width: 50, background: 'rgba(0,128,128,0.22)' }} />
          <span style={{ fontSize: 13, color: '#008080', fontFamily: 'serif', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.8 }}>
            26 April 2026 · Nashik, Maharashtra
          </span>
          <div style={{ height: 1, width: 50, background: 'rgba(0,128,128,0.22)' }} />
        </div>
      </motion.div>
    </section>
  )
}
