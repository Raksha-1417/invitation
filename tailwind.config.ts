import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5EDE0',
        'cream-soft': '#FBF6EC',
        parchment: '#EFE3CF',
        rani: '#7A1142',
        'rani-deep': '#5A0A31',
        maroon: '#5A1822',
        'maroon-deep': '#3D0E16',
        teal: '#0A5C4A',
        'teal-soft': '#1E7A66',
        gold: '#C8964A',
        'gold-deep': '#8B6A3A',
        'gold-light': '#E5CFA5',
        rose: '#E89AA3',
        'rose-pale': '#F5D8DB',
        ink: '#2B1F1A',
        'ink-soft': '#5A4B3E',
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
        devanagari: ['var(--font-noto-devanagari)', 'serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        sealShimmer: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        'seal-shimmer': 'sealShimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
