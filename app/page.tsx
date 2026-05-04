'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Ceremonies from '@/components/Ceremonies'
import Venue from '@/components/Venue'
import Schedule from '@/components/Schedule'
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
        className="max-w-[430px] mx-auto min-h-screen shadow-2xl"
        style={{ 
          visibility: envelopeOpen ? 'visible' : 'hidden',
          background: 'linear-gradient(180deg, #FAF3EE 0%, #F5E8E2 50%, #FAF3EE 100%)'
        }}
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
        <Blessings />
        <Footer />
      </main>
    </>
  )
}

function SectionDivider() {
  return (
    <div className="section-divider-floral py-2 px-4">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C88A8F] to-transparent opacity-50" />
        <span className="text-[#C9A46A] text-base select-none">✦</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C88A8F] to-transparent opacity-50" />
      </div>
    </div>
  )
}
