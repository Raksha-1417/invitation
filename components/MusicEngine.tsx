'use client'

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'

const PLAYLIST = [
  '/music/wedding.mp3',
  '/music/shreya/song1.mp3',
  '/music/shreya/song2.mp3',
  '/music/shreya/song3.mp3',
  '/music/shreya/song4.mp3',
  '/music/shreya/song5.mp3',
  '/music/shreya/song6.mp3',
  '/music/shreya/song7.mp3',
  '/music/shreya/song8.mp3',
  '/music/shreya/song9.mp3',
  '/music/shreya/song10.mp3',
  '/music/shreya/song11.mp3',
  '/music/shreya/song12.mp3',
  '/music/shreya/song13.mp3',
  '/music/shreya/song2 2.mp3',
  '/music/shreya/song7 2.mp3',
  '/music/shreya/song8 2.mp3',
  '/music/shreya/song9 2.mp3',
  '/music/shreya/song10 2.mp3',
]

interface MusicEngineProps {
  envelopeOpen: boolean;
  onStateChange: (playing: boolean) => void;
}

export interface MusicEngineHandle {
  toggle: () => void;
  play: () => void;
  pause: () => void;
}

const MusicEngine = forwardRef<MusicEngineHandle, MusicEngineProps>(({ envelopeOpen, onStateChange }, ref) => {
  const [shuffledList, setShuffledList] = useState<string[]>(PLAYLIST)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isFirstSong = useRef(true)

  // Shuffle ONLY on client to avoid hydration mismatch
  useEffect(() => {
    const list = [...PLAYLIST]
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]]
    }
    setShuffledList(list)
  }, [])

  const initialSong = shuffledList[0]
  const initialTime = initialSong.includes('wedding.mp3') ? 58 : 0

  useEffect(() => {
    if (audioRef.current && !playing && isFirstSong.current) {
      audioRef.current.src = initialSong
      audioRef.current.currentTime = initialTime
      audioRef.current.load()
    }
  }, [initialSong, initialTime, playing])

  const animateVolume = (audio: HTMLAudioElement, target: number, duration: number, onComplete?: () => void) => {
    const startVolume = audio.volume
    const startTime = Date.now()
    
    const fade = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      audio.volume = startVolume + (target - startVolume) * progress
      
      if (progress < 1) {
        requestAnimationFrame(fade)
      } else {
        if (target === 0) audio.pause()
        onComplete?.()
      }
    }
    requestAnimationFrame(fade)
  }

  const startTransition = () => {
    const audio = audioRef.current
    if (!audio || shuffledList.length === 0) return

    const nextIndex = (currentIndex + 1) % shuffledList.length
    const nextSong = shuffledList[nextIndex]
    const isWedding = nextSong.includes('wedding.mp3')

    // START NEXT SONG IMMEDIATELY
    audio.pause()
    audio.src = nextSong
    audio.currentTime = isWedding ? 58 : 0
    audio.volume = 0
    
    audio.play().then(() => {
      animateVolume(audio, 1, 2000)
      setCurrentIndex(nextIndex)
      isFirstSong.current = false
    }).catch(err => {
      console.log("Sync transition failed:", err)
      audio.volume = 1
      setCurrentIndex(nextIndex)
    })
  }

  const startFirstSong = () => {
    const audio = audioRef.current
    if (!audio || !isFirstSong.current) return

    isFirstSong.current = false
    audio.volume = 1
    const firstSong = shuffledList[0]
    const isWedding = firstSong.includes('wedding.mp3')
    
    audio.src = firstSong
    audio.currentTime = isWedding ? 58 : 0
    
    audio.play().then(() => {
      setPlaying(true)
      onStateChange(true)
    }).catch(err => {
      console.log("Master first play failed:", err)
      isFirstSong.current = true
    })
  }

  const toggle = () => {
    if (isFirstSong.current && !playing) {
      startFirstSong()
      return
    }

    const player = audioRef.current
    if (!player) return

    if (playing) {
      player.pause()
      setPlaying(false)
      onStateChange(false)
    } else {
      player.play().then(() => {
        setPlaying(true)
        onStateChange(true)
      }).catch(err => console.log("Master manual play failed:", err))
    }
  }

  useImperativeHandle(ref, () => ({
    toggle,
    play: () => { if (!playing) toggle() },
    pause: () => { if (playing) toggle() }
  }))

  useEffect(() => {
    if (envelopeOpen && !playing && isFirstSong.current) {
      startFirstSong()
    }
  }, [envelopeOpen])

  useEffect(() => {
    const tryPlay = () => {
      if (envelopeOpen && !playing && isFirstSong.current) {
         startFirstSong()
      }
    }
    window.addEventListener('click', tryPlay)
    window.addEventListener('touchstart', tryPlay)
    return () => {
      window.removeEventListener('click', tryPlay)
      window.removeEventListener('touchstart', tryPlay)
    }
  }, [envelopeOpen, playing])

  // Precision monitor for the Wedding Song highlight and global song limits
  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    
    const currentSong = shuffledList[currentIndex]
    if (currentSong.includes('wedding.mp3')) {
      // End exactly at 1:38 (98 seconds)
      if (audio.currentTime >= 98) {
        startTransition()
      }
    } else {
      // End all other songs after 1 minute 30 seconds (90 seconds)
      if (audio.currentTime >= 90) {
        startTransition()
      }
    }
  }

  return (
    <div className="hidden">
      <audio 
        ref={audioRef} 
        preload="auto" 
        onEnded={() => startTransition()}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  )
})

MusicEngine.displayName = "MusicEngine"
export default MusicEngine
