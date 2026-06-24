import type { Config } from 'tailwindcss'
import { colors, fontFamily } from './src/lib/design-tokens'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      fontFamily,
      fontSize: {
        'display-xl': [
          'clamp(2.75rem, 7vw, 4.5rem)',
          { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '900' },
        ],
        display: [
          'clamp(2.25rem, 5.5vw, 3.5rem)',
          { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '900' },
        ],
        h1: [
          'clamp(1.875rem, 4vw, 2.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.015em', fontWeight: '800' },
        ],
        h2: [
          'clamp(1.375rem, 2.6vw, 1.75rem)',
          { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      maxWidth: { content: '1120px' },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.16, 1, 0.3, 1)',
        move: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
}

export default config
