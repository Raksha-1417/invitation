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
        // New rose/floral palette
        'deep-rose':   '#A8576A',
        'dusty-pink':  '#C88A8F',
        'soft-blush':  '#E3B7B5',
        'rose-bg':     '#D6B3B0',
        wine:          '#6E2A36',
        gold:          '#C9A46A',
        ivory:         '#FAF3EE',
        'text-rose':   '#8A3E4A',

        // Keep legacy aliases in case any component still uses them
        cream:         '#FAF3EE',
        'cream-soft':  '#F5E8E2',
        parchment:     '#EDD8D3',
        rani:          '#A8576A',
        'rani-deep':   '#6E2A36',
        maroon:        '#A8576A',
        'maroon-deep': '#6E2A36',
        teal:          '#8A3E4A',
        'teal-soft':   '#C88A8F',
        'gold-deep':   '#9A7840',
        'gold-light':  '#E5C9A0',
        rose:          '#E3B7B5',
        'rose-pale':   '#F5E8E2',
        ink:           '#4A2030',
        'ink-soft':    '#8A3E4A',
      },
      fontFamily: {
        display:     ['var(--font-cinzel)', 'serif'],
        serif:       ['var(--font-cormorant)', 'Georgia', 'serif'],
        script:      ['var(--font-great-vibes)', 'cursive'],
        devanagari:  ['var(--font-noto-devanagari)', 'serif'],
        sans:        ['Lato', 'var(--font-lato)', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        sealShimmer: {
          '0%, 100%': { opacity: '0' },
          '50%':      { opacity: '0.6' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer:       'shimmer 2.5s ease-in-out infinite',
        'seal-shimmer':'sealShimmer 3s ease-in-out infinite',
        'fade-in-up':  'fadeInUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
