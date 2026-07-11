/**
 * Electric Grape — the single source of design tokens.
 *
 * One deep, saturated electric-grape field carries identity, a single lime charge
 * per view, ink/haze/warm-neutrals for everything else. The electric energy, on a
 * warm bone paper so it reads confident rather than clinical. Consumed by
 * tailwind.config.ts (colours, fonts) and mirrored as CSS variables in globals.css.
 *
 * Accent-swap rule: the charge is lime on the field/dark, grape on paper.
 * See the context-aware `.text-accent` class in globals.css.
 *
 * Lime on paper: lime is ~1.2:1 on bone, so on light surfaces it never carries
 * text — it works only as a *shape* (marker dots, the section-index tick) or a
 * *live/interaction* cue (hover sweeps, the hero "open" pulse, ::selection).
 * Text-coloured accents on paper are grape via `.text-accent`; lime stays the
 * spark. Keep that split when adding light-surface accents.
 */

export const colors = {
  // The field — one deep, saturated electric grape owns each hero/field moment.
  field: { DEFAULT: '#6A22D6', deep: '#4E1A9E', lift: '#894BEE' },
  // The single charge — a lime spark, never a surface.
  lime: '#C6F24E',
  // Neutrals.
  ink: '#171320', // text on paper, deep base, full-bleed dark
  haze: '#5C5568', // muted text, metadata, captions, hairlines
  mist: '#EAE5DC', // warm light surface, cards, dividers
  chalk: '#F6F2EA', // warm bone paper, text on the field
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
