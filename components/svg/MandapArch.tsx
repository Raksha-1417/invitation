interface Props {
  className?: string
  children?: React.ReactNode
}

export default function MandapArch({ className, children }: Props) {
  return (
    <div className={`relative ${className ?? ''}`} style={{ width: 300, minHeight: 340 }}>
      {/* SVG frame drawn on top */}
      <svg
        viewBox="0 0 300 340"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tealGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#006666" />
            <stop offset="50%" stopColor="#008080" />
            <stop offset="100%" stopColor="#009999" />
          </linearGradient>
          <linearGradient id="pillarGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#006666" />
            <stop offset="25%" stopColor="#008080" />
            <stop offset="100%" stopColor="#006666" />
          </linearGradient>
        </defs>

        {/* Left pillar */}
        <rect x="12" y="120" width="18" height="210" rx="2" fill="url(#pillarGradient)" />
        {/* Right pillar */}
        <rect x="270" y="120" width="18" height="210" rx="2" fill="url(#pillarGradient)" />

        {/* Pillar decorations - small horizontal bands */}
        {[140, 165, 190, 215, 240].map((y) => (
          <rect key={y} x="10" y={y} width="22" height="3" rx="1" fill="#008080" opacity="0.6" />
        ))}
        {[140, 165, 190, 215, 240].map((y) => (
          <rect key={y} x="268" y={y} width="22" height="3" rx="1" fill="#008080" opacity="0.6" />
        ))}

        {/* Arch - pointed Maharashtrian style */}
        <path
          d="M12 120 C12 60 80 12 150 12 C220 12 288 60 288 120"
          stroke="url(#tealGradient)"
          strokeWidth="4"
          fill="none"
        />
        {/* Inner arch line */}
        <path
          d="M24 120 C24 68 86 24 150 24 C214 24 276 68 276 120"
          stroke="#F5EDE0"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />

        {/* Arch crown — pointed top ornament */}
        <polygon points="150,2 158,18 150,14 142,18" fill="#D10056" opacity="0.9" />
        <circle cx="150" cy="12" r="4" fill="#D10056" />
        <circle cx="150" cy="12" r="2" fill="#F5EDE0" />

        {/* Top arch - hanging bells / decorations */}
        {[90, 120, 150, 180, 210].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={i === 2 ? 18 : i === 1 || i === 3 ? 32 : 55} r="3" fill="#D10056" opacity="0.7" />
            <line
              x1={x}
              y1={i === 2 ? 14 : i === 1 || i === 3 ? 28 : 51}
              x2={x}
              y2={i === 2 ? 8 : i === 1 || i === 3 ? 20 : 43}
              stroke="#D10056"
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        ))}

        {/* Pillar base capitals */}
        <rect x="6" y="116" width="30" height="8" rx="2" fill="#D10056" opacity="0.9" />
        <rect x="264" y="116" width="30" height="8" rx="2" fill="#D10056" opacity="0.9" />

        {/* Floor base */}
        <rect x="8" y="326" width="284" height="8" rx="2" fill="#D10056" opacity="0.8" />

        {/* Paisley corner ornaments */}
        {/* Top left */}
        <path
          d="M40 90 C34 80 30 70 38 62 C44 58 50 62 48 70 C46 76 40 80 40 90 Z"
          fill="#008080"
          opacity="0.25"
        />
        {/* Top right */}
        <path
          d="M260 90 C266 80 270 70 262 62 C256 58 250 62 252 70 C254 76 260 80 260 90 Z"
          fill="#008080"
          opacity="0.25"
        />
      </svg>

      {/* Teal glow behind */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,128,128,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Content slot */}
      <div className="relative z-[5] flex items-center justify-center" style={{ paddingTop: 28, paddingBottom: 10, paddingLeft: 36, paddingRight: 36, minHeight: 340 }}>
        {children}
      </div>
    </div>
  )
}
