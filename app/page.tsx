'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Ceremonies from '@/components/Ceremonies'
import Venue from '@/components/Venue'
import Schedule from '@/components/Schedule'
import RSVP from '@/components/RSVP'
import Blessings from '@/components/Blessings'
import Footer from '@/components/Footer'
import Countdown from '@/components/Countdown'
import FallingFlowers from '@/components/FallingFlowers'

import Envelope from '@/components/Envelope'
import MusicEngine from '@/components/MusicEngine'
import MusicPlayer from '@/components/MusicPlayer'

export default function Home() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const engineRef = useRef<any>(null)
  const [playing, setPlaying] = useState(false)

  const handleStartMusic = () => {
    engineRef.current?.play()
  }

  const handleEnvelopeOpen = () => {
    setEnvelopeOpen(true)
    
    setTimeout(() => {
      const main = document.getElementById('main-content')
      main?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const toggleMusic = () => {
    engineRef.current?.toggle()
  }

  return (
    <>
      <MusicEngine 
        ref={engineRef}
        envelopeOpen={envelopeOpen}
        onStateChange={setPlaying}
      />
      
      {!envelopeOpen && (
        <Envelope 
          onStartMusic={handleStartMusic} 
          onOpen={handleEnvelopeOpen} 
        />
      )}
      
      <MusicPlayer playing={playing} onToggle={toggleMusic} />
      
      <FallingFlowers />

      <main
        id="main-content"
        className="max-w-[430px] mx-auto min-h-screen bg-cream shadow-2xl"
        style={{ visibility: envelopeOpen ? 'visible' : 'hidden' }}
      >
        <Hero />
        <SectionDivider />
        <Countdown />
        <SectionDivider />
        <Story />
        <SectionDivider />
        <Ceremonies />
        <SectionDivider />
        <Schedule />
        <SectionDivider />
        <Venue />
        <SectionDivider />
        <RSVP />
        <SectionDivider />
        <Blessings />
        <Footer />
      </main>
    </>
  )
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2 px-7">
      <div className="flex-1 h-px bg-[#008080]/30" />
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 mx-3 text-[#D10056]"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" />
      </svg>
      <div className="w-1.5 h-1.5 rounded-full bg-[#008080] mx-1" />
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 mx-3 text-[#D10056] rotate-180"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" />
      </svg>
      <div className="flex-1 h-px bg-[#008080]/30" />
    </div>
  )
}
