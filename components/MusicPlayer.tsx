'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  playing: boolean
  onToggle: () => void
}

export default function MusicPlayer({ playing, onToggle }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show the button shortly after component mounts
    const t = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-4 z-[10001]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <button
          type="button"
          aria-label={playing ? 'Pause music' : 'Play music'}
          onClick={(e) => {
            e.stopPropagation() // Prevent window listener from re-starting music
            onToggle()
          }}
          className="relative flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#D10056] focus-visible:outline-offset-2"
          style={{
            width: 48,
            height: 48,
            background: 'linear-gradient(135deg, #008080, #006666)',
            boxShadow: '0 4px 16px rgba(0,128,128,0.4), 0 0 0 2px rgba(245,237,224,0.4)',
          }}
        >
          {/* Pulse ring when playing */}
          {playing && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: 'rgba(0,128,128,0.25)' }}
            />
          )}
          {playing ? (
            /* Pause icon */
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F5EDE0]" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            /* Play icon */
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F5EDE0]" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        {/* Tooltip */}
        <span
          className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-[10px] uppercase tracking-widest text-[#008080] bg-[#F5EDE0]/90 backdrop-blur-sm border border-[#008080]/20 rounded-full px-3 py-1 pointer-events-none shadow-sm"
          style={{ opacity: 0.9 }}
        >
          {playing ? 'Music Playing' : 'Play Music'}
        </span>
      </motion.div>
    </>
  )
}
