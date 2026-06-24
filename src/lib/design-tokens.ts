/**
 * Electric Field — the single source of design tokens.
 *
 * Palette + type roles sampled from the "Electric Field" system (monopo register):
 * one saturated violet field carries identity, a single lime charge per view,
 * ink/haze/mist/chalk for everything else. Consumed by tailwind.config.ts
 * (colours, fonts) and mirrored as CSS variables in globals.css.
 */

export const colors = {
  // The field — one saturated violet owns each hero/section.
  field: { DEFAULT: '#7A35E0', deep: '#5A24B0', lift: '#9A63F0' },
  // The single charge — a spark, never a surface.
  lime: '#C6F24E',
  // Neutrals.
  ink: '#14121A', // text on light, deep base, full-bleed dark
  haze: '#5A5270', // muted text, metadata, captions, hairlines
  mist: '#ECEAF0', // light surface, cards, dividers
  chalk: '#FAF9FB', // page base, text on the field
}

export const fontFamily = {
  // Display — heavy contemporary gothic, bilingual EN·JP.
  display: [
    'var(--font-zen-kaku)',
    "'Hiragino Kaku Gothic ProN'",
    "'Hiragino Sans'",
    "'Yu Gothic'",
    "'Noto Sans JP'",
    'sans-serif',
  ],
  // Body / UI — humanist grotesque, quiet so the display can shout.
  sans: ['var(--font-hanken)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  // Metadata / labels — monospace, uppercase, tracked.
  mono: ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
}

/** Motion tokens (SHIFTBRAIN micro-precision). Consumed by lib/motion.ts. */
export const easing: {
  reveal: [number, number, number, number]
  move: [number, number, number, number]
} = {
  reveal: [0.16, 1, 0.3, 1],
  move: [0.65, 0, 0.35, 1],
}

export const duration = { reveal: 0.7, hover: 0.2, stagger: 0.07 }
