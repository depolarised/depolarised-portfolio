# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Personal site of **Ioannis Valasakis** (ioannis.dev) — a **Research Engineer** working on
signal processing, deep learning, and large-scale data systems. (Holds a PhD in computational
neuroscience; that is past depth, not the current positioning.) Built with Next.js 14 App
Router, TypeScript, Tailwind CSS, and Framer Motion.

Visual system: **Electric Field** — one saturated violet field per view, a single lime charge,
heavy bilingual (EN·JP) display type, generous negative space, flat (no decorative shadows).

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
│   ├── ui/                   # Navigation · Footer · Button · Card · Badge · MonoLabel · IndexRow · SectionHeader · PageHeader · Reveal · Icons
│   └── visuals/SignalField.tsx  # hero canvas (reduced-motion aware, paused offscreen)
└── lib/                      # design-tokens · motion · cn · constants
```

## Key patterns

- **Design tokens**: `src/lib/design-tokens.ts` is the single source (colours, fonts, easings).
  Consumed by `tailwind.config.ts` and mirrored as CSS vars in `globals.css`.
- **Electric Field rules**: one violet field (`.field` / `bg-field`) per view; lime
  (`text-lime`/`bg-lime`) is one charge per view and never a fill surface; mono labels for
  indices/captions; flat — no gradients or decorative shadows.
- **Motion**: shared Framer variants in `src/lib/motion.ts`; `Reveal` wraps scroll-in
  animations; everything degrades under `prefers-reduced-motion`.
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
- **Lime discipline**: never use `bg-lime` as a fill/marker dot or stack multiple lime accents in
  one view. On field/footer (dark) sections the accent is the JA header text; markers use `bg-field`.
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
