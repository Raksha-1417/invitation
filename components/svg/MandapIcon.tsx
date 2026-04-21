interface Props {
  className?: string
}

export default function MandapIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Left pillar */}
      <line x1="8" y1="16" x2="8" y2="36" />
      {/* Right pillar */}
      <line x1="32" y1="16" x2="32" y2="36" />
      {/* Arch */}
      <path d="M8 16 C8 6 32 6 32 16" />
      {/* Top ornament */}
      <polygon points="20,2 22,8 20,6 18,8" fill="currentColor" stroke="none" />
      {/* Base */}
      <line x1="4" y1="36" x2="36" y2="36" />
      {/* Small figures inside */}
      <circle cx="16" cy="26" r="2" />
      <circle cx="24" cy="26" r="2" />
      <path d="M14 28 L14 34 M18 28 L18 34" />
      <path d="M22 28 L22 34 M26 28 L26 34" />
    </svg>
  )
}
