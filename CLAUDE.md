# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Personal site of **Dr Ioannis Valasakis** (ioannis.dev) — a **Research Engineer** working on
signal processing, deep learning, and large-scale data systems. (Holds a PhD in computational
neuroscience; that is past depth, not the current positioning.) Built with Next.js 14 App
Router, TypeScript, Tailwind CSS, and Framer Motion.

Visual system: **Electric Field** (Electric Grape palette) — a saturated violet field, a single
lime charge, heavy bilingual (EN·JP) display type, generous negative space, flat (no decorative
shadows). The site runs in **one mode**: the whole page sits on the grape field via
`[data-theme="dark"]` pinned on `<html>` in `layout.tsx` (no toggle). The map at the bottom of
`globals.css` remaps the utility classes onto the field.

The backdrop is a **site-wide WebGL fragment shader** (`HeroBackdrop` → `FragmentCanvas` +
`shaderKit.ts`), mounted once in `layout.tsx` behind every route. It renders an iridescent,
domain-warped grape field carrying an anchored **atrial-fibrillation ECG** ribbon (irregular R-R,
no P waves). Pointer velocity drives a chromatic-aberration shimmer, and scrolling recedes the
field to flat grape below the fold. It is DPR-capped, paused offscreen, static under
`prefers-reduced-motion`, and falls back to flat violet where WebGL is absent.

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
│   ├── page.tsx              # home: Hero · SelectedWork · Capabilities · Recognition · Contact
│   ├── work/                 # work index + [slug] case studies (generateStaticParams)
│   ├── writing/              # notes index + [slug] notes
│   ├── about/                # bio · Skills · Experience · Publications · Contact
│   ├── globals.css           # design-token CSS vars + Electric Field component classes
│   ├── opengraph-image.tsx   # dynamic OG image; twitter-image.tsx re-exports it
│   └── sitemap.ts            # route-aware sitemap (drafts excluded)
├── content/                  # TYPED DATA LAYER — edit content here, not in components
│   ├── types.ts              # shared interfaces
│   ├── profile · links · experience · publications · projects · recognition
│   ├── work · capabilities · skills · writing
│   └── content.test.ts       # invariants (DOIs, URLs, slugs, ORCID, PhD-in-bio) + a prose voice guard
├── components/
│   ├── sections/             # Hero · SelectedWork · Capabilities · Recognition · Experience · Publications · Projects · Contact · Skills
│   ├── ui/                   # Navigation · Footer · Button · Card · Badge · MonoLabel · IndexRow · SectionHeader · PageHeader · IllustrationPlaceholder · Reveal · Icons
│   └── visuals/              # HeroBackdrop · FragmentCanvas · shaderKit.ts — the site-wide WebGL shader field
└── lib/                      # design-tokens · motion · cn · constants
```

## Key patterns

- **Design tokens**: `src/lib/design-tokens.ts` is the single source (colours, fonts, easings).
  Consumed by `tailwind.config.ts` and mirrored as CSS vars in `globals.css`.
- **Electric Field rules**: one violet field (`.field` / `bg-field`) per view; lime
  (`text-lime`/`bg-lime`) is one charge per view and never a fill surface; mono labels for
  indices/captions; flat — no gradients or decorative shadows.
- **Accent-swap**: the context-aware `.text-accent` reads grape on paper and lime on the field.
  Since the whole site is pinned to the field it resolves to lime everywhere, but keep the class
  (do not hard-code lime) so the paper path stays intact. `.jp-mark` standardises the EN·JP
  secondary next to Latin; `.section-y` is the shared vertical rhythm; `.ghost-numeral`
  counterweights section headers.
- **One mode**: the whole site is pinned to the grape field via `[data-theme="dark"]` on `<html>`
  (`layout.tsx`, no toggle, no `localStorage`). The map at the bottom of `globals.css` remaps
  `bg-chalk`, `text-ink`, `text-haze`, `text-accent`, `bg-field`, etc. onto the field. Gotcha:
  only specific opacity variants are remapped — on a lime pill use `text-[#171320]`, and for
  field-surface secondary text use explicit `text-chalk/NN` rather than an un-remapped `text-ink/NN`.
- **Detail pages**: `/work/[slug]` and `/writing/[slug]` open with a transparent band (the shader
  field shows through) and an `IllustrationPlaceholder` hero slot — replace its inner block with a
  real drawing (an `<Image>`/`<img>` or inline SVG). The `[slug]` H1 is `max-w-3xl` so long titles
  wrap clear of the ECG ribbon.
- **Motion**: shared Framer variants in `src/lib/motion.ts`; `Reveal` wraps scroll-in animations.
  The hero entrance is CSS (`.anim-rise`/`.anim-fade` in `globals.css`) so first paint is never
  blank. Everything degrades under `prefers-reduced-motion`.
- **Client vs server**: only stateful/animated leaves (`Hero`, `Experience`, `Publications`,
  `Navigation`, `Reveal`, and the shader backdrop `HeroBackdrop`/`FragmentCanvas`) are
  `'use client'`; routes and most sections are server. The backdrop lives in the root `layout.tsx`,
  so it mounts once and persists across client navigations (recede reads `scrollY` per frame).

## Content updates

Edit the arrays under `src/content/`:
- `publications.ts` — papers (keep DOIs); `work.ts` — case studies (`featured`, `slug`);
  `experience.ts` — roles; `projects.ts` — repos; `capabilities.ts` — the four threads;
  `recognition.ts` — the year·title·detail strip (real milestones only, no invented honours);
  `skills.ts`, `writing.ts` (`draft: true` hides from sitemap), `profile.ts`, `links.ts` (ORCID).
- `layout.tsx` / `lib/constants.ts` — SEO metadata + nav.
- Drop a CV at `public/cv.pdf` to wire the "Download CV" link.

**Prose voice**: copy is plain, evidence-led British English. `content.test.ts` guards it — no em
dashes, no semicolons, and none of the stock AI phrases ("not just", "it's about", "at its core",
etc.). Keep sentences short and specific; name real technologies only.

`npm test` validates content invariants — run it after editing the data layer.

## Conventions & gotchas

- **Before committing** a non-trivial change: `npm run lint && npm run typecheck && npm test && npm run build` all pass.
- **Lime discipline**: lime never carries text on paper (~1.2:1 on bone). On light surfaces it
  appears only as a *shape* (the section-index tick, marker dots, button fills) or a
  *live/interaction* cue (the IndexRow hover sweep, the hero "open to collaborations" ping,
  `::selection`). Text accents on paper are grape via `.text-accent`; on the field/footer/dark the
  charge is lime.
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
