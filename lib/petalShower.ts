const COLORS = ['#D10056', '#008080', '#F5EDE0', '#D10056', '#008080']

const SHAPES = [
  'M0,-12 C8,-8 10,-2 0,3 C-10,-2 -8,-8 0,-12',     // rose petal
  'M0,-10 C5,-6 6,-1 0,3 C-6,-1 -5,-6 0,-10',        // oval petal
  'M0,-14 C4,-10 4,-3 0,3 C-4,-3 -4,-10 0,-14',      // slim petal
  'M0,-11 C6,-9 7,-3 0,2 C-7,-3 -6,-9 0,-11',        // round petal
  'M0,3 C-9,-4 -9,-12 0,-9 C9,-12 9,-4 0,3',         // heart petal
]

export async function triggerPetalShower(): Promise<void> {
  if (typeof window === 'undefined') return

  const { gsap } = await import('gsap')

  const container = document.createElement('div')
  container.style.cssText =
    'position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9999;'
  document.body.appendChild(container)

  const ns = 'http://www.w3.org/2000/svg'
  const count = 90

  for (let i = 0; i < count; i++) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
    const size = 12 + Math.random() * 16
    const startX = Math.random() * window.innerWidth
    const drift = -120 + Math.random() * 240
    const rotation = -720 + Math.random() * 1440
    const delay = Math.random() * 2.8
    const duration = 1.5 + Math.random() * 2 // Reduced duration from 3-6s to 1.5-3.5s

    const svg = document.createElementNS(ns, 'svg')
    svg.setAttribute('viewBox', '-15 -16 30 22')
    svg.setAttribute('width', String(size))
    svg.setAttribute('height', String(size * 1.3))
    svg.style.cssText = `position:absolute;left:${startX}px;top:-22px;`

    const path = document.createElementNS(ns, 'path')
    path.setAttribute('d', shape)
    path.setAttribute('fill', color)
    path.setAttribute('opacity', '0.9')
    svg.appendChild(path)
    container.appendChild(svg)

    gsap.to(svg, {
      y: window.innerHeight + 80,
      x: drift,
      rotation,
      opacity: 0,
      duration,
      delay,
      ease: 'power1.in',
    })
  }

  gsap.to(container, {
    opacity: 0,
    duration: 0.8,
    delay: 6,
    onComplete: () => {
      if (document.body.contains(container)) document.body.removeChild(container)
    },
  })
}
