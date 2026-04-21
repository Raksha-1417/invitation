interface Props {
  className?: string
}

export default function HennaHandIcon({ className }: Props) {
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
      {/* Palm */}
      <path d="M10 24 C10 16 14 10 20 10 C26 10 30 16 30 24 L30 34 C30 36 28 38 26 38 L14 38 C12 38 10 36 10 34 Z" />
      {/* Fingers */}
      <path d="M14 24 L14 12 C14 10 16 9 17 10 L17 22" />
      <path d="M18 24 L18 8 C18 6 20 5 21 6 L21 22" />
      <path d="M22 24 L22 9 C22 7 24 6 25 7 L25 22" />
      <path d="M26 24 L26 13 C26 11 28 10 29 11 L29 22" />
      {/* Henna dots */}
      <circle cx="20" cy="28" r="1" fill="currentColor" />
      <circle cx="16" cy="31" r="0.8" fill="currentColor" />
      <circle cx="24" cy="31" r="0.8" fill="currentColor" />
      <circle cx="20" cy="34" r="0.8" fill="currentColor" />
      {/* Thumb */}
      <path d="M10 24 C8 22 7 19 8 17 C9 15 11 15 12 17 L14 22" />
    </svg>
  )
}
