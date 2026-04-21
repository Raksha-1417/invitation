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

    interface Petal {
      x: number; y: number; vx: number; vy: number
      rot: number; rotV: number; size: number; alpha: number
    }

    const N = 18  // fewer petals
    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const makePetal = (freshTop = false): Petal => ({
      x:    rand(0, canvas.width),
      y:    freshTop ? rand(-30, -5) : rand(-30, canvas.height),
      vx:   rand(-0.3, 0.3),
      vy:   rand(0.6, 1.3), // Increased speed from 0.3-0.65 to 0.6-1.3
      rot:  rand(0, Math.PI * 2),
      rotV: rand(-0.018, 0.018),
      size: rand(2, 5),        // tiny: 2–5 px
      alpha: rand(0.1, 0.28),  // very soft
    })

    const petals: Petal[] = Array.from({ length: N }, () => makePetal(false))

    const p2 = new Path2D(PETAL_D)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petals.forEach(p => {
        p.x  += p.vx + Math.sin(p.rot * 0.5) * 0.25
        p.y  += p.vy
        p.rot += p.rotV
        if (p.y > canvas.height + 10) Object.assign(p, makePetal(true))

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.scale(p.size, p.size)
        ctx.fillStyle = '#D10056'
        ctx.fill(p2)
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
