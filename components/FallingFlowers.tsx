'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Tiny soft petal rain across the ENTIRE website until
 * #countdown-section scrolls out of the viewport.
 * Petal size: 2–5 px. Count: 18 petals.
 */
export default function FallingFlowers() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)
  const [visible, setVisible] = useState(true)

  // Persistent across the entire website
  useEffect(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!visible) { cancelAnimationFrame(animRef.current); return }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const PETAL_D = 'M5,0 C8,2 9,6 6,8 C3,10 0,9 0,6 C-1,3 2,-1 5,0Z'

    interface Particle {
      x: number; y: number; vx: number; vy: number
      rot: number; rotV: number; size: number; alpha: number
      type: 'petal' | 'pearl'
      color: string
    }

    const N = 24  // balanced amount
    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const colors = [
      '#7A2F4E', // Deep Wine
      '#A8576A', // Dusty Rose
      '#C9A46A', // Gold
    ]

    const makeParticle = (freshTop = false): Particle => {
      const isPearl = Math.random() > 0.5
      return {
        x:    rand(0, canvas.width),
        y:    freshTop ? rand(-30, -5) : rand(-30, canvas.height),
        vx:   rand(-0.25, 0.25),
        vy:   rand(0.5, 1.1),
        rot:  rand(0, Math.PI * 2),
        rotV: rand(-0.015, 0.015),
        // Make them quite small as requested
        size: isPearl ? rand(1.5, 3.5) : rand(1.5, 3.5),
        alpha: rand(0.15, 0.4),  // soft opacity
        type: isPearl ? 'pearl' : 'petal',
        // Pearls are deep wine or dusty rose. Petals can be gold or dusty rose.
        color: isPearl 
          ? (Math.random() > 0.5 ? '#7A2F4E' : '#A8576A') 
          : (Math.random() > 0.5 ? '#C9A46A' : '#A8576A')
      }
    }

    const particles: Particle[] = Array.from({ length: N }, () => makeParticle(false))

    const p2 = new Path2D(PETAL_D)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x  += p.vx + Math.sin(p.rot * 0.5) * 0.2
        p.y  += p.vy
        p.rot += p.rotV
        if (p.y > canvas.height + 10) Object.assign(p, makeParticle(true))

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        
        ctx.fillStyle = p.color
        
        if (p.type === 'petal') {
          ctx.scale(p.size, p.size)
          ctx.fill(p2)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
        
        ctx.restore()
      })
      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [visible])

  if (!visible) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 9990,
      }}
    />
  )
}
