interface Props {
  color?: string
  className?: string
}

export default function Lantern({ color = '#008080', className }: Props) {
  return (
    <svg
      viewBox="0 0 28 72"
      className={className}
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {/* Chain links */}
      <ellipse cx="14" cy="5" rx="3" ry="2" stroke={color} strokeWidth="1" opacity="0.7" />
      <line x1="14" y1="0" x2="14" y2="7" stroke={color} strokeWidth="1.2" opacity="0.6" />

      {/* Top decorative cap */}
      <path
        d="M7 10 Q14 7 21 10 L20 14 Q14 12 8 14 Z"
        fill={color}
        opacity="0.75"
      />
      <rect x="7" y="13" width="14" height="3" rx="1" fill={color} opacity="0.6" />

      {/* Body outline - hexagonal lantern shape */}
      <path
        d="M9 16 L6 42 L8 48 L20 48 L22 42 L19 16 Z"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.85"
      />

      {/* Vertical decorative ribs */}
      <line x1="11" y1="16" x2="10" y2="48" stroke={color} strokeWidth="0.7" opacity="0.35" />
      <line x1="14" y1="16" x2="14" y2="48" stroke={color} strokeWidth="0.7" opacity="0.35" />
      <line x1="17" y1="16" x2="18" y2="48" stroke={color} strokeWidth="0.7" opacity="0.35" />

      {/* Horizontal band mid */}
      <line x1="7.5" y1="32" x2="20.5" y2="32" stroke={color} strokeWidth="0.7" opacity="0.4" />

      {/* Flame / glow inside */}
      <ellipse cx="14" cy="32" rx="3.5" ry="5" fill={color} opacity="0.15" />
      <ellipse cx="14" cy="33" rx="1.8" ry="3" fill={color} opacity="0.35" />
      <path
        d="M14 27 Q16 29 14 31 Q12 29 14 27"
        fill={color}
        opacity="0.6"
      />

      {/* Bottom cap */}
      <rect x="7" y="47" width="14" height="3" rx="1" fill={color} opacity="0.6" />
      <path d="M9 50 Q14 53 19 50" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />

      {/* Bottom fringe / tassels */}
      <path
        d="M9 52 L8 60 M11 53 L10.5 62 M14 53 L14 63 M17 53 L17.5 62 M19 52 L20 60"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Tassel ends */}
      <circle cx="8" cy="61" r="1.2" fill={color} opacity="0.5" />
      <circle cx="10.5" cy="63" r="1.2" fill={color} opacity="0.5" />
      <circle cx="14" cy="64" r="1.2" fill={color} opacity="0.5" />
      <circle cx="17.5" cy="63" r="1.2" fill={color} opacity="0.5" />
      <circle cx="20" cy="61" r="1.2" fill={color} opacity="0.5" />
    </svg>
  )
}
