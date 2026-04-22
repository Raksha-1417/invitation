'use client'

import { useState } from 'react'

interface Props {
  onStartMusic: () => void
  onOpen: () => void
}

const SHIMMER_CSS = `
  @keyframes shimmerSweep {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes ivoryGlow {
    0%, 100% { box-shadow: 0 0 8px 3px rgba(245,237,224,0.25); }
    50%       { box-shadow: 0 0 35px 12px rgba(245,237,224,0.85), 0 0 70px 25px rgba(245,237,224,0.2); }
  }
  @keyframes cardGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(245,237,224,0.1), inset 0 0 30px rgba(0,0,0,0.3); }
    50%       { box-shadow: 0 0 50px rgba(245,237,224,0.4), 0 0 100px rgba(245,237,224,0.1), inset 0 0 30px rgba(0,0,0,0.2); }
  }
  @keyframes btnPulse {
    0%, 100% { box-shadow: 0 0 15px rgba(0,128,128,0.4); }
    50%       { box-shadow: 0 0 40px rgba(0,128,128,0.9), 0 0 70px rgba(0,128,128,0.3); }
  }
  .ivory-hem {
    background: linear-gradient(90deg, #D4C5AF 0%, #FFFDF5 30%, #F5EDE0 50%, #FFFDF5 70%, #D4C5AF 100%);
    background-size: 200% 100%;
    animation: shimmerSweep 2s linear infinite, ivoryGlow 2.8s ease-in-out infinite;
  }
  .card-glow { animation: cardGlow 3s ease-in-out infinite; }
  .btn-pulse { animation: btnPulse 2.2s ease-in-out infinite; }
`

export default function Envelope({ onStartMusic, onOpen }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const handleClick = () => {
    if (isOpen) return
    setIsOpen(true)
    // Instant music trigger
    onStartMusic()
    setTimeout(() => {
      setIsHidden(true)
      onOpen()
    }, 2500)
  }

  if (isHidden) return null

  return (
    <div className="fixed inset-0 z-[9999] flex overflow-hidden pointer-events-auto">
      <style dangerouslySetInnerHTML={{ __html: SHIMMER_CSS }} />

      {/* Left Curtain */}
      <div
        className="w-1/2 h-full relative z-[100]"
        style={{
          backgroundColor: '#D10056',
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(209,0,86,0.2) 15%, rgba(255,255,255,0.06) 25%, rgba(209,0,86,0.2) 35%, rgba(0,0,0,0.45) 50%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.75)',
          transition: 'transform 2.5s cubic-bezier(0.19, 1, 0.22, 1)',
          transform: isOpen ? 'translateX(-100%) skewX(10deg) scaleX(0.9)' : 'translateX(0)',
          willChange: 'transform'
        }}
      >
        {/* Shimmer Ivory Hem - right edge */}
        <div
          className="ivory-hem absolute right-0 top-0 bottom-0 w-4 md:w-6"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.4)', borderRight: '1px solid rgba(255,255,255,0.4)' }}
        />
      </div>

      {/* Right Curtain */}
      <div
        className="w-1/2 h-full relative z-[100]"
        style={{
          backgroundColor: '#D10056',
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(209,0,86,0.2) 15%, rgba(255,255,255,0.06) 25%, rgba(209,0,86,0.2) 35%, rgba(0,0,0,0.45) 50%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.75)',
          transition: 'transform 2.5s cubic-bezier(0.19, 1, 0.22, 1)',
          transform: isOpen ? 'translateX(100%) skewX(-10deg) scaleX(0.9)' : 'translateX(0)',
          willChange: 'transform'
        }}
      >
        {/* Shimmer Ivory Hem - left edge */}
        <div
          className="ivory-hem absolute left-0 top-0 bottom-0 w-4 md:w-6"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.4)', borderRight: '1px solid rgba(255,255,255,0.4)' }}
        />
      </div>

      {/* Center Content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-[101] text-center px-6 transition-all duration-700"
        style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'scale(0.9)' : 'scale(1)', pointerEvents: isOpen ? 'none' : 'auto' }}
      >
        <div
          className="card-glow relative p-8 md:p-12 bg-black/45 backdrop-blur-md rounded-xl"
          style={{ border: '3px solid rgba(245,237,224,0.5)' }}
        >
          <h2 className="font-script text-[#F5EDE0] text-4xl md:text-5xl mb-4">You Are Invited</h2>
          <h1
            className="font-script mb-8"
            style={{
              fontSize: 'clamp(44px, 12vw, 72px)',
              color: '#F5EDE0',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              textShadow: '0 2px 20px rgba(245,237,224,0.4), 0 0 40px rgba(0,128,128,0.5)',
            }}
          >
            Rohit & Nandini
          </h1>
          <button
            onClick={handleClick}
            className="btn-pulse group relative px-10 py-5 bg-[#008080] text-[#F5EDE0] font-serif text-xl md:text-2xl tracking-widest uppercase overflow-hidden rounded-sm transition-all duration-300 hover:bg-[#006868]"
            style={{ border: '2px solid rgba(245,237,224,0.5)' }}
          >
            <span className="relative z-10 drop-shadow-md group-hover:text-white transition-colors">
              Open Invitation
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#005f5f] to-[#009999] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-0" />
          </button>
        </div>
        <p className="mt-8 text-sm text-[#F5EDE0] italic opacity-75 animate-pulse font-sans tracking-widest">
          Tap to begin the celebration
        </p>
      </div>
    </div>
  )
}
