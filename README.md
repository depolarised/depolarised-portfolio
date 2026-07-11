# ioannis.dev

Personal site of **Dr Ioannis Valasakis** — a research engineer working at the intersection of
**signal processing, deep learning, and large-scale data systems**. (PhD in computational
neuroscience; that's past depth, not the current positioning.)

**Live:** [ioannis.dev](https://ioannis.dev) · **Stack:** Next.js 14 (App Router) · TypeScript ·
Tailwind CSS · Framer Motion · Vitest

Visual system — **Electric Field** (Electric Grape palette): one saturated violet field per view,
a single lime charge, heavy bilingual (EN·JP) display type, generous negative space, flat (no
decorative shadows). Light default + a **dark theme** toggle. The hero canvas is a chalk
**atrial-fibrillation ECG** resolving out of noise, read by a lime playhead.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`next lint`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest — content-integrity checks |
| `npm run format` | Prettier |

Node 20 (see `.nvmrc`).

## Structure

```
src/
├── app/                       # routes: / · /work · /work/[slug] · /writing · /writing/[slug] · /about
│   ├── layout.tsx             # fonts, metadata, shell, skip-link
│   ├── globals.css            # design-token CSS vars + component classes
│   ├── opengraph-image.tsx    # dynamic OG image (twitter-image re-exports it)
│   └── sitemap.ts             # route-aware sitemap (drafts excluded)
├── content/                   # TYPED DATA LAYER — edit content here, not in components
│   ├── profile · links · experience · publications · projects
│   ├── work · capabilities · skills · writing
│   └── content.test.ts        # invariants (DOIs, URLs, slugs, ORCID)
├── components/
│   ├── sections/              # Hero · SelectedWork · Capabilities · Experience · Publications · Projects · Contact · Skills
│   ├── ui/                    # Navigation · Footer · Button · Card · Badge · MonoLabel · IndexRow · SectionHeader · PageHeader · Reveal · Icons
│   └── visuals/SignalField    # hero canvas (reduced-motion aware)
└── lib/                       # design-tokens · motion · cn · constants
```

## Design system

Tokens live in [`src/lib/design-tokens.ts`](src/lib/design-tokens.ts) — the single source —
consumed by `tailwind.config.ts` and mirrored as CSS variables in `globals.css`.

| Token | Hex | Role |
| --- | --- | --- |
| Grape — Field | `#6A22D6` | primary surface, hero/section fields, key CTAs |
| Lime — Pop | `#C6F24E` | one charge per view — never a surface |
| Ink | `#171320` | text on light, deep base |
| Haze | `#5C5568` | muted text, metadata, hairlines |
| Mist | `#EAE5DC` | warm light surface, cards, dividers |
| Chalk | `#F6F2EA` | warm bone page base, text on the field |

Type: **Zen Kaku Gothic New** (display) · **Hanken Grotesk** (body/UI) · **IBM Plex Mono** (labels).
Principles: one field per view · type as image · one charge of lime · generous negative space ·
flat. A **dark theme** (`ThemeToggle` → `[data-theme="dark"]`) puts the whole page on the grape
field; the context-aware `.text-accent` reads grape on paper, lime on the field/dark. Everything
degrades under `prefers-reduced-motion`.

## Editing content

All copy lives under `src/content/` as typed arrays — change it there, not in components:

- `publications.ts` — papers (keep DOIs) · `work.ts` — case studies (`slug`, `featured`)
- `experience.ts` — roles · `projects.ts` — repos · `capabilities.ts` — the four pillars
- `skills.ts` · `writing.ts` (`draft: true` hides from the sitemap) · `profile.ts` · `links.ts`

Drop a CV at `public/cv.pdf` to wire the "Download CV" link. Run `npm test` after editing the
data layer — it validates DOIs, URLs, slugs, and the ORCID iD.

## CI & deploy

GitHub Actions (`.github/workflows/ci.yml`) runs lint · typecheck · test · build on every push
and PR. Deployed on **Vercel** (region `lhr1`, security headers in `vercel.json`); production
domain `ioannis.dev`. Connect the repo in Vercel so each push to `main` auto-deploys.

## License

[MIT](LICENSE) © 2026 Ioannis Valasakis
