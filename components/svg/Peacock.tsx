interface Props {
  className?: string
}

export default function Peacock({ className }: Props) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Peacock body */}
      <ellipse cx="40" cy="52" rx="8" ry="12" opacity="0.9" />
      {/* Neck */}
      <path d="M37 42 Q35 30 38 22 Q40 18 42 22 Q45 30 43 42 Z" opacity="0.85" />
      {/* Head */}
      <circle cx="40" cy="19" r="5" />
      {/* Crest feathers */}
      <path d="M38 14 Q36 6 34 4 Q36 8 38 12" strokeWidth="1" fill="currentColor" opacity="0.7" />
      <path d="M40 13 Q40 5 40 2 Q40 6 40 11" strokeWidth="1" fill="currentColor" opacity="0.8" />
      <path d="M42 14 Q44 6 46 4 Q44 8 42 12" strokeWidth="1" fill="currentColor" opacity="0.7" />
      {/* Tail feathers fanned out */}
      <path d="M40 48 Q20 35 10 20 Q16 32 28 42 Q35 46 40 48" opacity="0.5" />
      <path d="M40 48 Q22 42 14 30 Q20 40 32 46 Q36 47 40 48" opacity="0.4" />
      <path d="M40 48 Q58 35 70 20 Q64 32 52 42 Q45 46 40 48" opacity="0.5" />
      <path d="M40 48 Q60 42 66 30 Q60 40 48 46 Q44 47 40 48" opacity="0.4" />
      {/* Tail eye spots */}
      <circle cx="15" cy="22" r="3" fill="#D10056" opacity="0.3" />
      <circle cx="15" cy="22" r="1.5" fill="#D10056" opacity="0.9" />
      <circle cx="65" cy="22" r="3" fill="#D10056" opacity="0.3" />
      <circle cx="65" cy="22" r="1.5" fill="#D10056" opacity="0.9" />
      <circle cx="25" cy="35" r="2.5" fill="#D10056" opacity="0.4" />
      <circle cx="55" cy="35" r="2.5" fill="#D10056" opacity="0.4" />
      {/* Legs */}
      <path d="M37 64 L35 74 M43 64 L45 74" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  )
}
