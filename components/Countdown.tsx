'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { scrollReveal } from '@/lib/motion'

const WEDDING_DATE = new Date('2026-05-14T12:32:00+05:30')

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function DigitBlock({ value, label, accent }: { value: number; label: string; accent: 'pink' | 'teal' }) {
  const display = String(value).padStart(2, '0')
  const color = accent === 'pink' ? '#7A2F4E' : '#C9A46A'
  const colorSoft = accent === 'pink' ? 'rgba(122,47,78,0.12)' : 'rgba(201,164,106,0.12)'
  const colorBorder = accent === 'pink' ? 'rgba(122,47,78,0.35)' : 'rgba(201,164,106,0.35)'

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Card */}
      <div
        style={{
          width: 76, minHeight: 92,
          background: `linear-gradient(145deg, #FFFFFF 0%, #FAF3EE 100%)`,
          border: `2px solid ${colorBorder}`,
          borderRadius: 12,
          boxShadow: `0 4px 15px ${colorSoft}, 0 1px 2px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          transition: 'transform 0.3s ease',
        }}
        className="hover:scale-105"
      >
        {/* Top color strip */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: color, opacity: 0.85 }} />
        {/* Separator line */}
        <div style={{ position: 'absolute', top: '50%', left: 8, right: 8, height: 1, background: colorBorder }} />
        {/* Number */}
        <span
          style={{
            fontSize: 38,
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
  const [mounted, setMounted] = useState(false)
  const prefersReduced = useReducedMotion()

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
      style={{ background: 'linear-gradient(160deg, #FAF3EE 0%, #F5E8E2 60%, #FAF3EE 100%)' }}
    >
      <motion.div
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Marathi / subheading */}
        <p style={{ fontSize: 20, color: '#7A2F4E', fontFamily: 'serif', letterSpacing: '0.1em', marginBottom: 4 }}>
          {isDone ? 'ಇಂದು ನಮ್ಮ ಸಪ್ತಪದಿ ಸಂಭ್ರಮ ✨' : 'ಸಪ್ತಪದಿ ಕಡೆಗೆ ನಮ್ಮ ಹೆಜ್ಜೆಗಳು….'}
        </p>
        <p style={{ fontSize: 14, color: '#C9A46A', fontFamily: 'serif', fontStyle: 'italic', marginBottom: 32, letterSpacing: '0.06em' }}>
          {isDone ? "We take our sacred seven steps today 💛" : 'Steps toward our Saptapadi…'}
        </p>

        {!isDone && mounted && (
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <DigitBlock value={timeLeft.days} label="Days" accent="pink" />
            <span style={{ fontSize: 20, color: '#7A2F4E', fontFamily: 'serif', fontWeight: 700, paddingBottom: 24, opacity: 0.6 }}>:</span>
            <DigitBlock value={timeLeft.hours} label="Hours" accent="teal" />
            <span style={{ fontSize: 20, color: '#C9A46A', fontFamily: 'serif', fontWeight: 700, paddingBottom: 24, opacity: 0.6 }}>:</span>
            <DigitBlock value={timeLeft.minutes} label="Min" accent="pink" />
            <span style={{ fontSize: 20, color: '#7A2F4E', fontFamily: 'serif', fontWeight: 700, paddingBottom: 24, opacity: 0.6 }}>:</span>
            <DigitBlock value={timeLeft.seconds} label="Sec" accent="teal" />
          </div>
        )}

        {isDone && (
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="gold-text-shimmer drop-shadow-md"
            style={{ fontSize: 42, fontFamily: 'serif', letterSpacing: '0.12em', padding: '20px 0' }}
          >
            ಶುಭ ವಿವಾಹ ✨
          </motion.p>
        )}

        {/* Date + Venue card */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Date line */}
          <div className="flex items-center gap-3">
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, #C9A46A)' }} />
            <span
              className="gold-text-shimmer font-display font-semibold"
              style={{ fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              14 May 2026
            </span>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, #C9A46A)' }} />
          </div>
          {/* Venue pill */}
          <div style={{
            background: 'linear-gradient(135deg, #7A2F4E 0%, #A8576A 100%)',
            borderRadius: '999px',
            padding: '4px 18px',
            border: '1px solid rgba(201,164,106,0.5)',
            boxShadow: '0 2px 12px rgba(122,47,78,0.25)',
          }}>
            <span style={{
              fontSize: 10,
              color: '#FAF3EE',
              fontFamily: 'serif',
              fontStyle: 'italic',
              letterSpacing: '0.18em',
              whiteSpace: 'nowrap',
            }}>
              📍 Vaibhav Hall, Belagavi, Karnataka
            </span>
          </div>
        </motion.div>

        {/* Muhurtham timing */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3">
            <div style={{ height: 1, width: 30, background: 'rgba(122,47,78,0.3)' }} />
            <span style={{ fontSize: 10, color: '#A8576A', fontFamily: 'sans-serif', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.8 }}>Muhurtham</span>
            <div style={{ height: 1, width: 30, background: 'rgba(122,47,78,0.3)' }} />
          </div>
          <p
            className="gold-text-shimmer font-display font-bold"
            style={{ fontSize: 28, letterSpacing: '0.1em' }}
          >
            12:32 PM
          </p>

        </motion.div>

      </motion.div>
    </section>
  )
}
