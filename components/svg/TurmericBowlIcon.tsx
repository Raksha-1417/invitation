interface Props {
  className?: string
}

export default function TurmericBowlIcon({ className }: Props) {
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
      {/* Bowl */}
      <path d="M8 18 C8 28 12 34 20 34 C28 34 32 28 32 18 Z" />
      {/* Bowl rim */}
      <line x1="6" y1="18" x2="34" y2="18" />
      {/* Turmeric paste mound */}
      <path d="M12 18 C12 14 16 12 20 12 C24 12 28 14 28 18" />
      {/* Crossed leaves / marigold */}
      <path d="M20 8 L20 12" />
      <path d="M16 10 L20 12 L24 10" />
      {/* Leaf left */}
      <path d="M6 14 C8 10 14 10 16 14" strokeWidth="1.2" />
      {/* Leaf right */}
      <path d="M34 14 C32 10 26 10 24 14" strokeWidth="1.2" />
      {/* Small dots on paste */}
      <circle cx="18" cy="15" r="0.8" fill="currentColor" />
      <circle cx="22" cy="15" r="0.8" fill="currentColor" />
      <circle cx="20" cy="13" r="0.8" fill="currentColor" />
    </svg>
  )
}
