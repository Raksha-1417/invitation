'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BookingForm from '@/components/BookingForm'
import { scrollReveal, fadeUp } from '@/lib/motion'
import { WHATSAPP_NUMBER } from '@/lib/share'

const PREMIUM_CAPTIONS = [
  "Your special day deserves more than an invitation — it deserves a beautiful digital experience.",
  "Turn your celebration into something unforgettable with a custom invitation website.",
  "Beautiful invitation websites designed to make your special moments even more memorable.",
  "From the first invite to the final celebration, make every moment feel special online.",
  "Elegant invitation websites for weddings, birthdays, baby showers, and every celebration in between.",
  "Create a lasting first impression with a beautifully designed digital invitation website.",
  "Celebrate life’s biggest moments with invitation websites designed just for you.",
  "Modern, elegant, and memorable invitation websites for every special occasion.",
  "Because every celebration deserves a beautiful beginning.",
  "We turn your events into unforgettable digital experiences."
]

export default function BookingPage() {
  const [captionIndex, setCaptionIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % PREMIUM_CAPTIONS.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F5EDE0] selection:bg-[#D10056]/20">
      {/* --- HERO SECTION --- */}
      <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/booking-hero.png"
            alt="Luxury Invitations Background"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#F5EDE0]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl pt-10 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] font-display tracking-[0.3em] uppercase hover:bg-white/20 transition-all"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Invitation
            </Link>

            <h1 className="font-display text-white text-[30px] md:text-[48px] lg:text-[64px] leading-tight mb-3 md:mb-5 tracking-tight drop-shadow-2xl px-2">
              Book Your Digital <br className="hidden lg:block" /> Invitation Website
            </h1>

            <p className="font-serif italic text-white/95 text-base md:text-xl lg:text-2xl max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed drop-shadow-xl px-4">
              Beautiful digital invitation websites crafted for weddings, birthdays, baby showers, anniversaries, and every special celebration.
            </p>

           {/* Rotating Captions with High-Visibility Background */}
            <div className="h-16 md:h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={captionIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="px-4 md:px-8 py-2 md:py-4 rounded-full bg-black/25 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.25)] mx-2"
                >
                  <p
                    className="font-display font-black text-[10px] md:text-xl tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                    style={{
                      background: 'linear-gradient(90deg, #D10056 0%, #7A1142 50%, #D10056 100%)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'shimmer 2.5s linear infinite'
                    }}
                  >
                    {PREMIUM_CAPTIONS[captionIndex]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Decorative Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#D10056]/20 rounded-full blur-[60px] animate-pulse" />
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-[#008080]/10 rounded-full blur-[80px] animate-pulse delay-700" />
      </header>

      {/* --- BOOKING FORM SECTION --- */}
      <section className="relative -mt-28 md:-mt-56 pb-16 md:pb-32 px-4 z-20">
        <BookingForm />
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-20 md:py-28 px-6 bg-white/40 border-y border-[#008080]/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-20"
            variants={scrollReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="font-display text-[#D10056] text-3xl md:text-5xl tracking-widest uppercase mb-6 md:mb-8 font-bold">Why Choose Us</h2>
            <div className="w-20 md:w-32 h-1 bg-[#D10056]/30 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <FeatureCard
              title="Fully Custom Designs"
              desc="Every celebration is unique. We tailor colors, fonts, and layouts to match your specific event theme perfectly."
              icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m-6-2h6m-6 0a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
              delay={0.1}
            />
            <FeatureCard
              title="Fast Delivery"
              desc="We understand the excitement! Get your high-quality invitation website live within 24-48 hours of booking."
              icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              delay={0.2}
            />
            <FeatureCard
              title="Mobile-Friendly"
              desc="Our websites provide a seamless, premium experience on all devices, from smartphones to desktops."
              icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section className="py-16 md:py-28 px-6 text-center">
        <motion.div
          className="max-w-3xl mx-auto space-y-12"
          variants={scrollReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <h2 className="font-display text-[#008080] text-2xl md:text-3xl tracking-widest uppercase font-bold">For urgent bookings or custom requests, <br /> contact us anytime.</h2>
            <p className="font-serif italic text-ink-soft text-xl">Our team is available 24/7 to help you create your dream digital invite.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 px-10 py-6 rounded-full bg-white shadow-2xl shadow-black/10 hover:shadow-3xl transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-all">
                <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.082 19.165c-1.063 0-2.108-.267-3.046-.776l-3.392.89 .906-3.308c-.559-.974-.85-2.096-.85-3.236 0-3.52 2.868-6.388 6.388-6.388 3.52 0 6.388 2.868 6.388 6.388 0 3.52-2.868 6.388-6.388 6.388z" /></svg>
              </div>
              <div className="text-left">
                <p className="text-[12px] font-display font-bold text-ink-soft tracking-widest uppercase">WhatsApp</p>
                <p className="font-display font-medium text-[#008080] text-lg">{WHATSAPP_NUMBER}</p>
              </div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 bg-[#FBF6EC] border-t border-[#008080]/10 overflow-hidden relative">
        <div className="absolute inset-0 opacity-40 blur-3xl pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-48 bg-[#D10056]/20 rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-[#008080]/10 rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 px-6">
          <p className="font-serif italic text-maroon text-2xl mb-8 font-bold">
            “We turn your special moments into beautiful digital experiences.”
          </p>
          <div className="w-24 h-px bg-maroon/20 mx-auto mb-8" />
          <p className="font-display text-[11px] font-bold tracking-[0.4em] text-gold uppercase">
            © 2026 Raksha Raj Digital Invitation Studio
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, desc, icon, delay }: { title: string; desc: string; icon: React.ReactNode; delay: number }) {
  return (
    <motion.div
      variants={scrollReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-6 md:p-8 rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-[#008080]/10 hover:border-[#D10056]/40 transition-all hover:shadow-2xl flex items-center gap-6 group"
    >
      <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl bg-[#D10056]/5 flex items-center justify-center text-[#D10056] group-hover:bg-[#D10056] group-hover:text-white transition-all">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-display font-bold text-[#D10056] text-base md:text-lg tracking-wide mb-1">{title}</h3>
        <p className="font-serif font-medium text-[#008080] text-sm leading-snug">{desc}</p>
      </div>
    </motion.div>
  )
}
