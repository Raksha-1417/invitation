'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const BOOKING_SHEET_URL = process.env.NEXT_PUBLIC_BOOKING_SHEET_URL ?? ''

const EVENT_TYPES = [
  'Wedding Invitation', 'Birthday Celebration', 'Anniversary Special', 
  'Baby Shower', 'Corporate Event', 'Other'
]

const THEME_STYLES = [
  'Royal Peshwai (Rani Pink)', 'Modern Minimalist (White/Gold)', 
  'Vintage Floral (Pastels)', 'Night Galaxy (Dark Blue)'
]

export default function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!BOOKING_SHEET_URL) {
      console.warn("No BOOKING_SHEET_URL provided. Simulating success.")
      setStatus('loading')
      setTimeout(() => {
        setStatus('success')
      }, 1500)
      return
    }

    const fd = new FormData(e.currentTarget)
    const body = JSON.stringify(Object.fromEntries(fd.entries()))

    setStatus('loading')
    setError('')
    
    try {
      await fetch(BOOKING_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body,
      })
      setStatus('success')
    } catch {
      setError('Something went wrong. Please try again or WhatsApp us directly.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D10056]/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="w-20 md:w-24 h-20 md:h-24 bg-[#D10056]/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <svg className="w-10 md:w-12 h-10 md:h-12 text-[#D10056]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="text-3xl md:text-5xl font-display text-[#D10056] mb-4 md:mb-6">Booking Successful!</h3>
          <p className="text-base md:text-xl font-serif text-[#008080] leading-relaxed max-w-2xl mx-auto">
            Thank you for choosing us! Our design team will contact you on WhatsApp within 24 hours to begin crafting your dream invitation.
          </p>
          <button 
            onClick={() => setStatus('idle')} 
            className="mt-10 md:mt-16 text-[#D10056] font-display text-[10px] md:text-xs tracking-[0.3em] uppercase underline hover:opacity-70 transition-opacity"
          >
            Place another booking
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D10056]/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6 md:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Name */}
            <div className="space-y-2 md:space-y-3">
              <label className="block text-xs md:text-sm font-display font-bold text-[#D10056] uppercase tracking-widest ml-1">Full Name</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Ex: Rohit & Nandini"
                className="w-full bg-[#F5EDE0]/50 border-2 border-[#D10056]/10 rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-sm md:text-lg font-serif text-[#D10056] placeholder-[#D10056]/30 focus:outline-none focus:border-[#D10056] transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2 md:space-y-3">
              <label className="block text-xs md:text-sm font-display font-bold text-[#D10056] uppercase tracking-widest ml-1">Email Address</label>
              <input
                required
                type="email"
                name="email"
                placeholder="mail@example.com"
                className="w-full bg-[#F5EDE0]/50 border-2 border-[#D10056]/10 rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-sm md:text-lg font-serif text-[#D10056] placeholder-[#D10056]/30 focus:outline-none focus:border-[#D10056] transition-all"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2 md:space-y-3">
              <label className="block text-xs md:text-sm font-display font-bold text-[#D10056] uppercase tracking-widest ml-1">WhatsApp Number</label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="+91 00000 00000"
                className="w-full bg-[#F5EDE0]/50 border-2 border-[#D10056]/10 rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-sm md:text-lg font-serif text-[#D10056] placeholder-[#D10056]/30 focus:outline-none focus:border-[#D10056] transition-all"
              />
            </div>

            {/* Event Type */}
            <div className="space-y-2 md:space-y-3">
              <label className="block text-xs md:text-sm font-display font-bold text-[#D10056] uppercase tracking-widest ml-1">Event Type</label>
              <select
                name="event_type"
                className="w-full bg-[#F5EDE0]/50 border-2 border-[#D10056]/10 rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-sm md:text-lg font-serif text-[#D10056] focus:outline-none focus:border-[#D10056] appearance-none cursor-pointer"
              >
                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Event Date */}
            <div className="space-y-2 md:space-y-3">
              <label className="block text-xs md:text-sm font-display font-bold text-[#D10056] uppercase tracking-widest ml-1">Event Date</label>
              <input
                required
                type="date"
                name="event_date"
                className="w-full bg-[#F5EDE0]/50 border-2 border-[#D10056]/10 rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-sm md:text-lg font-serif text-[#D10056] focus:outline-none focus:border-[#D10056] transition-all"
              />
            </div>

            {/* Theme Style */}
            <div className="space-y-2 md:space-y-3">
              <label className="block text-xs md:text-sm font-display font-bold text-[#D10056] uppercase tracking-widest ml-1">Preferred Theme</label>
              <select
                name="theme_style"
                className="w-full bg-[#F5EDE0]/50 border-2 border-[#D10056]/10 rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-sm md:text-lg font-serif text-[#D10056] focus:outline-none focus:border-[#D10056] appearance-none cursor-pointer"
              >
                {THEME_STYLES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-2 md:space-y-3">
            <label className="block text-xs md:text-sm font-display font-bold text-[#D10056] uppercase tracking-widest ml-1">Special Requirements</label>
            <textarea
              name="requirements"
              rows={3}
              placeholder="Tell us about your dream invitation..."
              className="w-full bg-[#F5EDE0]/50 border-2 border-[#D10056]/10 rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-sm md:text-lg font-serif text-[#D10056] placeholder-[#D10056]/30 focus:outline-none focus:border-[#D10056] resize-none transition-all"
            />
          </div>

          <div className="pt-4 md:pt-8">
            {error && <p className="text-center text-[#D10056] text-xs md:text-sm font-bold mb-4">{error}</p>}
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#D10056] text-white font-display font-black text-sm md:text-xl tracking-[0.3em] uppercase py-4 md:py-8 rounded-xl md:rounded-3xl shadow-[0_15px_40px_rgba(209,0,86,0.3)] hover:shadow-[0_20px_60px_rgba(209,0,86,0.4)] hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-70 group overflow-hidden relative"
            >
              <span className="relative z-10">
                {status === 'loading' ? 'Processing...' : 'Book My Invitation Website'}
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
            
            <p className="text-center mt-4 md:mt-8 text-[10px] md:text-xs font-display text-[#008080] tracking-widest uppercase opacity-60">
              No Credit Card Required • Instant Confirmation
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
