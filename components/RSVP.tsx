'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { scrollReveal } from '@/lib/motion'
import { WHATSAPP_NUMBER } from '@/lib/share'

// ─── PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ───────────────────────
const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_URL ?? ''
// ───────────────────────────────────────────────────────────────────────────
const BRAND_NAME = 'Naveen & Shreya'
const INSTAGRAM_HASHTAG = '#ShreVeen'
const CONTACT_PHONE = WHATSAPP_NUMBER

export default function RSVP() {
  const prefersReduced = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!SHEET_URL) { setSubmitted(true); return }   // preview mode – no URL yet

    const fd = new FormData(e.currentTarget)
    const body = JSON.stringify({
      name: fd.get('name'),
      phone: fd.get('phone'),
      guests: fd.get('guests'),
      events: fd.getAll('events').join(', '),
      message: fd.get('message'),
    })

    setLoading(true)
    setError('')
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body,
      })
      setSubmitted(true)
    } catch {
      setError('Could not submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }


  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#FAF3EE]" aria-label="RSVP & Contact">
      {/* Background soft glows */}
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-[#7A2F4E] to-transparent opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A46A] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7A2F4E] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none" />

      {/* RSVP Title */}
      <motion.div
        className="text-center mb-10 relative z-10"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="font-display text-[#7A2F4E] text-[32px] tracking-[0.15em] mb-2">Be Our Guest</h2>
        <p className="font-serif italic text-[#C9A46A] text-sm">We would be honored by your presence</p>
      </motion.div>

      {/* Glassmorphism Form Card */}
      <motion.div
        className="max-w-md mx-auto relative z-10 p-6 md:p-8 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 128, 128, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 128, 128, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
        }}
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {!submitted ? (
          <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="space-y-1">
              <label className="text-xs font-display tracking-widest text-[#C9A46A] uppercase">Full Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="w-full bg-white/50 border border-[#C9A46A]/20 rounded-md px-4 py-3 text-[#7A2F4E] placeholder-[#C9A46A]/30 focus:outline-none focus:border-[#7A2F4E] focus:ring-1 focus:ring-[#7A2F4E] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-display tracking-widest text-[#C9A46A] uppercase">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91"
                  className="w-full bg-white/50 border border-[#C9A46A]/20 rounded-md px-4 py-3 text-[#7A2F4E] placeholder-[#C9A46A]/30 focus:outline-none focus:border-[#7A2F4E] focus:ring-1 focus:ring-[#7A2F4E] transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-display tracking-widest text-[#C9A46A] uppercase">Guests</label>
                <select name="guests" className="w-full bg-white/50 border border-[#C9A46A]/20 rounded-md px-4 py-3 text-[#7A2F4E] focus:outline-none focus:border-[#7A2F4E] focus:ring-1 focus:ring-[#7A2F4E] transition-all appearance-none cursor-pointer">
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4+">4+ People</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-display tracking-widest text-[#C9A46A] uppercase">Events Attending</label>
              <div className="flex flex-wrap gap-3">
                {['Mehendi', 'Haldi', 'Wedding'].map(event => (
                  <label key={event} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded border border-[#C9A46A]/30 bg-white/50 group-hover:border-[#7A2F4E] transition-colors">
                      <input type="checkbox" name="events" value={event} className="opacity-0 absolute inset-0 cursor-pointer peer" defaultChecked />
                      <svg className="w-3 h-3 text-[#7A2F4E] opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-serif text-[#C9A46A]">{event}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-xs font-display tracking-widest text-[#C9A46A] uppercase">Blessings / Message</label>
              <textarea
                name="message"
                rows={3}
                placeholder="Share a wish for the couple..."
                className="w-full bg-white/50 border border-[#C9A46A]/20 rounded-md px-4 py-3 text-[#7A2F4E] placeholder-[#C9A46A]/30 focus:outline-none focus:border-[#7A2F4E] focus:ring-1 focus:ring-[#7A2F4E] transition-all resize-none"
              />
            </div>

            {error && <p className="text-[#7A2F4E] text-xs text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-[#C9A46A] to-[#A8576A] text-white font-display tracking-widest uppercase text-xs py-4 rounded-md shadow-[0_4px_15px_rgba(201,164,106,0.3)] hover:shadow-[0_6px_20px_rgba(201,164,106,0.4)] transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Confirm RSVP'}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#C9A46A]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#C9A46A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-[24px] text-[#7A2F4E]">Thank You!</h3>
              <p className="font-serif text-[#C9A46A] text-sm leading-relaxed px-4">
                Please attend the marriage, your presence will make us memorable.
              </p>
            </div>
            <div className="w-12 h-px bg-[#7A2F4E]/30 mx-auto" />
            <div className="space-y-3">
              <h3 className="font-serif text-[22px] text-[#7A2F4E]">धन्यवाद!</h3>
              <p className="font-serif text-[#C9A46A] text-sm leading-relaxed px-4">
                कृपया विवाहाला उपस्थित राहा, तुमची उपस्थिती आमचा दिवस संस्मरणीय बनवेल.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Contact Details Footer */}
      <motion.div
        className="max-w-xs mx-auto mt-20 text-center relative z-10"
        variants={scrollReveal}
        initial={prefersReduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="w-12 h-px bg-[#C9A46A]/30 mx-auto mb-8" />

        <p className="font-display tracking-[0.2em] text-[#C9A46A] text-xs uppercase mb-3">Questions?</p>

        <a
          href={`https://wa.me/${CONTACT_PHONE.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full border border-[#C9A46A]/30 hover:border-[#7A2F4E] hover:bg-[#7A2F4E]/5 transition-colors group"
        >
          <svg className="w-5 h-5 text-[#C9A46A] group-hover:text-[#7A2F4E] transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.082 19.165c-1.063 0-2.108-.267-3.046-.776l-3.392.89 .906-3.308c-.559-.974-.85-2.096-.85-3.236 0-3.52 2.868-6.388 6.388-6.388 3.52 0 6.388 2.868 6.388 6.388 0 3.52-2.868 6.388-6.388 6.388z" />
          </svg>
          <span className="font-serif text-[#C9A46A] group-hover:text-[#7A2F4E] transition-colors">WhatsApp Us</span>
        </a>

        <p className="font-display tracking-[0.1em] text-[#C9A46A]/60 text-xs mb-2">Share your memories</p>
        <p className="font-script text-[#7A2F4E] text-[28px]">{INSTAGRAM_HASHTAG}</p>

        <p className="font-serif italic text-[#C9A46A]/40 text-[10px] mt-8">
          Crafted for {BRAND_NAME} with ❤️
        </p>
      </motion.div>
    </section>
  )
}
