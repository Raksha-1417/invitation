interface Props {
  className?: string
  width?: number
}

export default function Divider({ className, width = 200 }: Props) {
  return (
    <svg
      viewBox={`0 0 ${width} 24`}
      width={width}
      height={24}
      className={className}
      aria-hidden="true"
    >
      {/* Left line */}
      <line x1="0" y1="12" x2={width / 2 - 20} y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      {/* Left small diamond */}
      <polygon
        points={`${width / 2 - 18},12 ${width / 2 - 14},9 ${width / 2 - 10},12 ${width / 2 - 14},15`}
        fill="currentColor"
        opacity="0.4"
      />
      {/* Center paisley/lotus */}
      <path
        d={`M${width / 2} 4 C${width / 2 - 4} 6 ${width / 2 - 5} 10 ${width / 2 - 3} 13 C${width / 2 - 1} 16 ${width / 2 + 1} 16 ${width / 2 + 3} 13 C${width / 2 + 5} 10 ${width / 2 + 4} 6 ${width / 2} 4 Z`}
        fill="currentColor"
        opacity="0.7"
      />
      <circle cx={width / 2} cy="12" r="2.5" fill="#D10056" opacity="1" />
      {/* Right small diamond */}
      <polygon
        points={`${width / 2 + 10},12 ${width / 2 + 14},9 ${width / 2 + 18},12 ${width / 2 + 14},15`}
        fill="currentColor"
        opacity="0.4"
      />
      {/* Right line */}
      <line x1={width / 2 + 20} y1="12" x2={width} y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    </svg>
  )
}
