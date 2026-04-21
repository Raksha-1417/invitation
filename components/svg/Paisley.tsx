interface Props {
  className?: string
}

export default function Paisley({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Main paisley teardrop */}
      <path d="M32 4 C18 4 8 16 8 28 C8 42 20 52 32 56 C44 52 56 42 56 28 C56 16 46 4 32 4 Z" opacity="0.15" />
      {/* Inner curve */}
      <path
        d="M32 10 C22 10 14 19 14 28 C14 38 22 46 32 50 Q42 46 50 38 C46 26 40 14 32 10 Z"
        opacity="0.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Curl at top */}
      <path
        d="M32 10 C28 6 24 6 22 10 C20 14 22 18 26 18 C30 18 32 14 30 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.6"
      />
      {/* Decorative dots */}
      <circle cx="32" cy="30" r="2" opacity="0.5" />
      <circle cx="26" cy="36" r="1.2" opacity="0.4" />
      <circle cx="38" cy="36" r="1.2" opacity="0.4" />
      {/* Small inner flourishes */}
      <path
        d="M28 42 Q32 46 36 42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  )
}
