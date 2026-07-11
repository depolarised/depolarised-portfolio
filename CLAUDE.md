# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Personal site of **Dr Ioannis Valasakis** (ioannis.dev) — a **Research Engineer** working on
signal processing, deep learning, and large-scale data systems. (Holds a PhD in computational
neuroscience; that is past depth, not the current positioning.) Built with Next.js 14 App
Router, TypeScript, Tailwind CSS, and Framer Motion.

Visual system: **Electric Field** (Electric Grape palette) — one saturated violet field per view,
a single lime charge, heavy bilingual (EN·JP) display type, generous negative space, flat (no
decorative shadows). Light is the default; a **dark theme** (the whole page on the grape field)
toggles via `ThemeToggle` — `[data-theme="dark"]` on `<html>`, stored in `localStorage`, applied
pre-paint by an inline no-flash script in `layout.tsx`. The dark map lives at the bottom of
`globals.css`.

The hero canvas (`SignalField`) is a chalk **atrial-fibrillation ECG** resolving out of noise
(irregular R-R, no P waves, fibrillatory baseline), read by a single lime playhead.

## Commands

```bash
npm run dev        # dev server (localhost:3000)
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm test           # vitest — content-integrity checks
npm start          # serve the production build
```

## Architecture

**Multi-page App Router**: `/` · `/work` · `/work/[slug]` · `/writing` · `/writing/[slug]` · `/about`.
Content is a typed data layer, separate from components.

```
src/
├── app/
│   ├── layout.tsx            # fonts (Zen Kaku / Hanken / IBM Plex Mono), metadata, shell, skip-link
│   ├── page.tsx              # home: Hero · SelectedWork · Capabilities · Contact
│   ├── work/                 # work index + [slug] case studies (generateStaticParams)
│   ├── writing/              # notes index + [slug] notes
│   ├── about/                # bio · Skills · Experience · Publications · Contact
│   ├── globals.css           # design-token CSS vars + Electric Field component classes
│   ├── opengraph-image.tsx   # dynamic OG image; twitter-image.tsx re-exports it
│   └── sitemap.ts            # route-aware sitemap (drafts excluded)
├── content/                  # TYPED DATA LAYER — edit content here, not in components
│   ├── types.ts              # shared interfaces
│   ├── profile · links · experience · publications · projects
│   ├── work · capabilities · skills · writing
│   └── content.test.ts       # invariants (DOIs, URLs, slugs, ORCID, PhD-in-bio)
├── components/
│   ├── sections/             # Hero · SelectedWork · Capabilities · Experience · Publications · Projects · Contact · Skills
│   ├── ui/                   # Navigation · ThemeToggle · Footer · Button · Badge · MonoLabel · IndexRow · SectionHeader · PageHeader · IllustrationPlaceholder · Reveal · Icons
│   └── visuals/SignalField.tsx  # hero canvas — AF-ECG resolving out of noise (reduced-motion aware, paused offscreen)
└── lib/                      # design-tokens · motion · cn · constants
```

## Key patterns

- **Design tokens**: `src/lib/design-tokens.ts` is the single source (colours, fonts, easings).
  Consumed by `tailwind.config.ts` and mirrored as CSS vars in `globals.css`.
- **Electric Field rules**: one violet field (`.field` / `bg-field`) per view; lime
  (`text-lime`/`bg-lime`) is one charge per view and never a fill surface; mono labels for
  indices/captions; flat — no gradients or decorative shadows.
- **Accent-swap**: the context-aware `.text-accent` reads grape on paper, lime on the field/dark
  (mirrors the focus-ring pattern). `.jp-mark` standardises the EN·JP secondary next to Latin;
  `.section-y` is the shared vertical rhythm; `.ghost-numeral` counterweights section headers.
- **Dark theme**: `ThemeToggle` flips `[data-theme="dark"]`; the dark map (bottom of `globals.css`)
  puts the whole page on the grape field with lime accents. Light is default and untouched by it.
- **Detail pages**: `/work/[slug]` and `/writing/[slug]` open with an `IllustrationPlaceholder`
  hero slot — replace its inner block with a real drawing (an `<Image>`/`<img>` or inline SVG).
- **Motion**: shared Framer variants in `src/lib/motion.ts`; `Reveal` wraps scroll-in animations.
  The hero entrance is CSS (`.anim-rise`/`.anim-fade` in `globals.css`) so first paint is never
  blank. Everything degrades under `prefers-reduced-motion`.
- **Client vs server**: only stateful/animated leaves (`Hero`, `Experience`, `Publications`,
  `Navigation`, `Reveal`, `SignalField`) are `'use client'`; routes and most sections are server.

## Content updates

Edit the arrays under `src/content/`:
- `publications.ts` — papers (keep DOIs); `work.ts` — case studies (`featured`, `slug`);
  `experience.ts` — roles; `projects.ts` — repos; `capabilities.ts` — the four pillars;
  `skills.ts`, `writing.ts` (`draft: true` hides from sitemap), `profile.ts`, `links.ts` (ORCID).
- `layout.tsx` / `lib/constants.ts` — SEO metadata + nav.
- Drop a CV at `public/cv.pdf` to wire the "Download CV" link.

`npm test` validates content invariants — run it after editing the data layer.

## Conventions & gotchas

- **Before committing** a non-trivial change: `npm run lint && npm run typecheck && npm test && npm run build` all pass.
- **Lime discipline**: lime never carries text on paper (~1.2:1 on bone). On light surfaces it
  appears only as a *shape* (the section-index tick, marker dots, button fills) or a
  *live/interaction* cue (the IndexRow hover sweep, the hero pulse, `::selection`). Text accents on
  paper are grape via `.text-accent`; on the field/footer/dark the charge is lime.
- **Focus rings** are context-aware in `globals.css`: ink on light surfaces, lime within `.field`
  and `footer`. Keep that when adding dark sections.
- **Fonts**: only the `latin` subset is loaded for Zen Kaku Gothic New (perf). Japanese display
  glyphs (e.g. 鼓動) fall back to system JP fonts — that's intentional; don't pull the heavy JP subset.
- **Client boundaries**: keep `'use client'` on the smallest leaf possible. Routes and most
  sections stay server components; only interactive/animated leaves opt in.
- **`ref/`** (design references) is gitignored — not part of the published repo.

## Configuration

- **tailwind.config.ts**: imports tokens (`colors`, `fontFamily`), custom `fontSize` scale, `maxWidth.content`.
- **next.config.js**: allows `avatars.githubusercontent.com`.
- **vercel.json**: London region (`lhr1`) + security headers.
- **tsconfig.json**: strict, path alias `@/*` → `./src/*`.
