'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { scrollReveal } from '@/lib/motion'

// ─── PASTE YOUR BOOKING GOOGLE APPS SCRIPT WEB APP URL HERE ───────────────
const BOOKING_SHEET_URL = process.env.NEXT_PUBLIC_BOOKING_SHEET_URL ?? ''
// ───────────────────────────────────────────────────────────────────────────

const EVENT_TYPES = [
  'Wedding', 'Engagement', 'Reception', 'Birthday Party', 'Baby Shower',
  'Naming Ceremony', 'Housewarming', 'Anniversary', 'Retirement Function',
  'Farewell Party', 'Graduation Party', 'Corporate Event', 'Bridal Shower',
  'Mehendi / Haldi / Sangeet', 'Custom Event'
]

const THEME_STYLES = [
  'Traditional', 'Royal', 'Floral', 'Minimal', 'Modern', 'Elegant',
  'Luxury', 'Vintage', 'Kids Theme', 'Cartoon Theme'
]

export default function BookingForm() {
  const prefersReduced = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!BOOKING_SHEET_URL) {
      console.warn("No BOOKING_SHEET_URL provided. Form will simulate success.")
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setSubmitted(true)
      }, 1000)
      return
    }

    const fd = new FormData(e.currentTarget)
    const body = JSON.stringify(Object.fromEntries(fd.entries()))

    setLoading(true)
    setError('')
    try {
      await fetch(BOOKING_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body,
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or WhatsApp us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto relative z-10 p-6 md:p-10 rounded-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(209, 0, 86, 0.15)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.4)'
      }}
      variants={scrollReveal}
      initial={prefersReduced ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {!submitted ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="space-y-3">
              <label className="text-[14px] font-display font-bold tracking-[0.2em] text-[#008080] uppercase opacity-90">Full Name</label>
              <input 
                name="name"
                type="text" 
                required
                placeholder="Ex: Nandini & Rohit" 
                className="w-full bg-white/70 border-2 border-[#008080]/30 rounded-xl px-6 py-5 text-base md:text-lg font-medium text-[#D10056] placeholder-[#008080]/50 focus:outline-none focus:border-[#D10056] focus:ring-2 focus:ring-[#D10056]/20 transition-all shadow-md"
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-[14px] font-display font-bold tracking-[0.2em] text-[#008080] uppercase opacity-90">Email Address</label>
              <input 
                name="email"
                type="email" 
                required
                placeholder="mail@example.com" 
                className="w-full bg-white/70 border-2 border-[#008080]/30 rounded-xl px-6 py-5 text-base md:text-lg font-medium text-[#D10056] placeholder-[#008080]/50 focus:outline-none focus:border-[#D10056] focus:ring-2 focus:ring-[#D10056]/20 transition-all shadow-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone */}
            <div className="space-y-3">
              <label className="text-[14px] font-display font-bold tracking-[0.2em] text-[#008080] uppercase opacity-90">WhatsApp Number</label>
              <input 
                name="phone"
                type="tel" 
                required
                placeholder="+91 00000 00000" 
                className="w-full bg-white/70 border-2 border-[#008080]/30 rounded-xl px-6 py-5 text-base md:text-lg font-medium text-[#D10056] placeholder-[#008080]/50 focus:outline-none focus:border-[#D10056] focus:ring-2 focus:ring-[#D10056]/20 transition-all shadow-md"
              />
            </div>

            {/* Event Type */}
            <div className="space-y-3">
              <label className="text-[14px] font-display font-bold tracking-[0.2em] text-[#008080] uppercase opacity-90">Event Type</label>
              <select 
                name="event_type" 
                className="w-full bg-white/70 border-2 border-[#008080]/30 rounded-xl px-6 py-5 text-base md:text-lg font-bold text-[#D10056] focus:outline-none focus:border-[#D10056] focus:ring-2 focus:ring-[#D10056]/20 transition-all appearance-none cursor-pointer shadow-md"
              >
                {EVENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Event Date */}
             <div className="space-y-3">
              <label className="text-[14px] font-display font-bold tracking-[0.2em] text-[#008080] uppercase opacity-90">Event Date</label>
              <input 
                name="event_date"
                type="date" 
                required
                className="w-full bg-white/70 border-2 border-[#008080]/30 rounded-xl px-6 py-5 text-base md:text-lg font-bold text-[#D10056] focus:outline-none focus:border-[#D10056] focus:ring-2 focus:ring-[#D10056]/20 transition-all cursor-pointer shadow-md"
              />
            </div>

            {/* Theme Style */}
            <div className="space-y-3">
              <label className="text-[14px] font-display font-bold tracking-[0.2em] text-[#008080] uppercase opacity-90">Preferred Theme</label>
              <select 
                name="theme_style" 
                className="w-full bg-white/70 border-2 border-[#008080]/30 rounded-xl px-6 py-5 text-base md:text-lg font-bold text-[#D10056] focus:outline-none focus:border-[#D10056] focus:ring-2 focus:ring-[#D10056]/20 transition-all appearance-none cursor-pointer shadow-md"
              >
                {THEME_STYLES.map(theme => <option key={theme} value={theme}>{theme}</option>)}
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <label className="text-[14px] font-display font-bold tracking-[0.2em] text-[#008080] uppercase opacity-90">Event Location</label>
            <input 
              name="location"
              type="text" 
              placeholder="City, Venue Name" 
              className="w-full bg-white/70 border-2 border-[#008080]/30 rounded-xl px-6 py-5 text-base md:text-lg font-medium text-[#D10056] placeholder-[#008080]/50 focus:outline-none focus:border-[#D10056] focus:ring-2 focus:ring-[#D10056]/20 transition-all shadow-md"
            />
          </div>

          {/* Special Requirements */}
          <div className="space-y-3">
            <label className="text-[14px] font-display font-bold tracking-[0.2em] text-[#008080] uppercase opacity-90">Special Requirements</label>
            <input 
              name="requirements"
              type="text" 
              placeholder="Ex: Bilingual support, Music player, RSVP form" 
              className="w-full bg-white/70 border-2 border-[#008080]/30 rounded-xl px-6 py-5 text-base md:text-lg font-medium text-[#D10056] placeholder-[#008080]/50 focus:outline-none focus:border-[#D10056] focus:ring-2 focus:ring-[#D10056]/20 transition-all shadow-md"
            />
          </div>

          {/* Notes */}
          <div className="space-y-3 pt-2">
            <label className="text-[14px] font-display font-bold tracking-[0.2em] text-[#008080] uppercase opacity-90">Additional Notes</label>
            <textarea 
              name="notes"
              rows={4}
              placeholder="Tell us more about your vision..." 
              className="w-full bg-white/70 border-2 border-[#008080]/30 rounded-xl px-6 py-5 text-base md:text-lg font-medium text-[#D10056] placeholder-[#008080]/50 focus:outline-none focus:border-[#D10056] focus:ring-2 focus:ring-[#D10056]/20 transition-all resize-none shadow-md"
            />
          </div>

          {error && <p className="text-[#D10056] text-base text-center font-bold">{error}</p>}
          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-10 bg-gradient-to-r from-[#D10056] to-[#7A1142] text-white font-display font-bold tracking-[0.4em] uppercase text-base md:text-lg py-6 md:py-8 rounded-xl shadow-[0_20px_50px_rgba(209,0,86,0.4)] hover:shadow-[0_25px_60px_rgba(209,0,86,0.5)] transition-all active:scale-[0.98] disabled:opacity-60 border-2 border-white/30"
          >
            {loading ? 'Sending Request...' : 'Book My Invitation Website'}
          </button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center py-16 space-y-8"
        >
          <div className="w-20 h-20 rounded-full bg-[#D10056]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#D10056]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-4">
            <h3 className="font-display text-[28px] tracking-wide text-[#D10056]">Request Received</h3>
            <p className="font-serif text-[#008080] text-base leading-relaxed px-6">
              Thank you for choosing us! Our design team will contact you on WhatsApp within 24 hours to discuss your dream invitation.
            </p>
          </div>
          <div className="w-16 h-px bg-[#D10056]/30 mx-auto" />
          <button 
            onClick={() => setSubmitted(false)}
            className="text-xs font-display tracking-widest text-[#D10056] uppercase border-b border-[#D10056]/40 pb-1"
          >
            Back to booking form
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
