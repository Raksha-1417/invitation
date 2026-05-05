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
    0%, 100% { box-shadow: 0 0 8px 3px rgba(201,164,106,0.25); }
    50%       { box-shadow: 0 0 35px 12px rgba(201,164,106,0.55), 0 0 70px 25px rgba(201,164,106,0.15); }
  }
  @keyframes cardGlow {
    0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.1), inset 0 0 30px rgba(0,0,0,0.1); }
    50%       { box-shadow: 0 10px 40px rgba(201,164,106,0.25), inset 0 0 30px rgba(0,0,0,0.05); }
  }
  @keyframes btnPulse {
    0%, 100% { box-shadow: 0 0 15px rgba(122,47,78,0.4); }
    50%       { box-shadow: 0 0 40px rgba(122,47,78,0.8), 0 0 70px rgba(122,47,78,0.3); }
  }
  @keyframes fadeInScale {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
  .ivory-hem {
    background: linear-gradient(90deg, #C9A46A 0%, #F5E8E2 30%, #FAF3EE 50%, #F5E8E2 70%, #C9A46A 100%);
    background-size: 200% 100%;
    animation: shimmerSweep 2s linear infinite, ivoryGlow 2.8s ease-in-out infinite;
    opacity: 0.55;
    filter: blur(8px);
  }
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
    <div 
      className="fixed inset-0 z-[9999] flex overflow-hidden pointer-events-auto"
      onWheel={handleClick}
      onTouchMove={handleClick}
    >
      <style dangerouslySetInnerHTML={{ __html: SHIMMER_CSS }} />

      {/* Left Curtain */}
      <div
        className="w-1/2 h-full relative z-[100] overflow-hidden"
        style={{
          backgroundColor: '#8B3A4A',
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(60,15,25,0.4) 0%, rgba(139,58,74,0.3) 15%, rgba(255,245,240,0.1) 25%, rgba(139,58,74,0.3) 35%, rgba(60,15,25,0.4) 50%)',
          boxShadow: 'inset 0 0 100px rgba(60,15,25,0.6)',
          transition: 'transform 2.5s cubic-bezier(0.19, 1, 0.22, 1)',
          transform: isOpen ? 'translateX(-100%) skewX(10deg) scaleX(0.9)' : 'translateX(0)',
          willChange: 'transform'
        }}
      >
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.05)] z-0 pointer-events-none" />
        
        {/* Content Half - Perfectly centered on screen, clipped at 50% */}
        <div className="absolute top-0 left-0 w-[200%] h-full flex flex-col items-center justify-center pointer-events-none">
          <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-8 md:pt-12" style={{ animation: 'fadeInScale 1.5s ease-in-out forwards' }}>
            <img 
              src="/elements/3image.png" 
              className="w-[85vw] md:w-[50vw] max-w-[550px] max-h-[22vh] md:max-h-[25vh] object-contain mix-blend-multiply drop-shadow-xl" 
            />
          </div>
          <div className="flex flex-col items-center mt-6 md:mt-10" style={{ animation: 'fadeInScale 1.5s ease-in-out forwards' }}>
            <img src="/elements/logo.png" className="w-[85vw] md:w-[50vw] max-w-[650px] max-h-[42vh] md:max-h-[50vh] object-contain mix-blend-multiply drop-shadow-2xl" />
          </div>
        </div>

        {/* Shimmer Ivory Hem - right edge */}
        <div
          className="ivory-hem absolute right-0 top-0 bottom-0 w-3 md:w-4"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.4)', borderRight: '1px solid rgba(255,255,255,0.4)' }}
        />
      </div>

      {/* Right Curtain */}
      <div
        className="w-1/2 h-full relative z-[100] overflow-hidden"
        style={{
          backgroundColor: '#8B3A4A',
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(60,15,25,0.4) 0%, rgba(139,58,74,0.3) 15%, rgba(255,245,240,0.1) 25%, rgba(139,58,74,0.3) 35%, rgba(60,15,25,0.4) 50%)',
          boxShadow: 'inset 0 0 100px rgba(60,15,25,0.6)',
          transition: 'transform 2.5s cubic-bezier(0.19, 1, 0.22, 1)',
          transform: isOpen ? 'translateX(100%) skewX(-10deg) scaleX(0.9)' : 'translateX(0)',
          willChange: 'transform'
        }}
      >
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.05)] z-0 pointer-events-none" />

        {/* Content Half - Perfectly centered on screen, clipped at 50% */}
        <div className="absolute top-0 -left-full w-[200%] h-full flex flex-col items-center justify-center pointer-events-none">
          <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-8 md:pt-12" style={{ animation: 'fadeInScale 1.5s ease-in-out forwards' }}>
            <img 
              src="/elements/3image.png" 
              className="w-[85vw] md:w-[50vw] max-w-[550px] max-h-[22vh] md:max-h-[25vh] object-contain mix-blend-multiply drop-shadow-xl" 
            />
          </div>
          <div className="flex flex-col items-center mt-6 md:mt-10" style={{ animation: 'fadeInScale 1.5s ease-in-out forwards' }}>
            <img src="/elements/logo.png" className="w-[85vw] md:w-[50vw] max-w-[650px] max-h-[42vh] md:max-h-[50vh] object-contain mix-blend-multiply drop-shadow-2xl" />
          </div>
        </div>

        {/* Shimmer Ivory Hem - left edge */}
        <div
          className="ivory-hem absolute left-0 top-0 bottom-0 w-3 md:w-4"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.4)', borderRight: '1px solid rgba(255,255,255,0.4)' }}
        />
      </div>

      {/* Center Content (Interactive layer over curtains) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-[101] text-center px-6 transition-all duration-1000 pointer-events-none"
        style={{ 
          opacity: isOpen ? 0 : 1, 
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
      >
        <div className="relative flex flex-col items-center w-full h-full">
          <div 
            className="absolute bottom-16 md:bottom-32 left-0 w-full flex flex-col items-center"
            style={{ animation: 'fadeInScale 1.5s ease-in-out forwards', animationDelay: '0.2s', opacity: 0 }}
          >
            <button
              onClick={handleClick}
              className="pointer-events-auto btn-pulse group relative px-10 py-[14px] font-sans font-bold text-sm md:text-base tracking-widest uppercase overflow-hidden rounded-full transition-colors duration-300 shadow-2xl hover:bg-[#5E233B]"
              style={{ 
                backgroundColor: '#7A2F4E', 
                color: '#FFFFFF', 
                border: '1px solid rgba(255,255,255,0.2)',
                minWidth: '240px'
              }}
            >
              <span className="relative z-10 drop-shadow-sm group-hover:scale-105 transition-transform duration-300 block">
                Open Invitation
              </span>
            </button>
            
            <p className="mt-6 text-[11px] md:text-[13px] text-[#F5E8E2] italic opacity-90 animate-pulse font-serif tracking-widest drop-shadow-md">
              ✦ Tap to begin the celebration ✦
            </p>
          </div>
        </div>
      </div>
      
      {/* Inline animation for bouncing arrows */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(4px); opacity: 1; }
        }
      `}} />
    </div>
  )
}
