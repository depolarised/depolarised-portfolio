# ioannis.dev

Personal site of **Ioannis Valasakis** — research engineer working at the intersection of
signal processing, deep learning, and large-scale data systems.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Visual
system: **Electric Field** — one saturated violet field per view, a single lime charge,
heavy bilingual (EN·JP) display type, generous negative space.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm test           # vitest — content-integrity checks
```

Node 20 (see `.nvmrc`).

## Structure

```
src/
├── app/                 # routes: / · /work · /work/[slug] · /writing · /about
│   ├── layout.tsx       # fonts, metadata, shell
│   ├── globals.css      # design-token CSS vars + component classes
│   └── opengraph-image.tsx  # dynamic OG image (Electric Field)
├── content/             # typed data layer — edit content here, not in components
│   ├── profile · links · experience · publications · projects
│   ├── work · capabilities · skills · writing
│   └── content.test.ts  # invariants (DOIs, URLs, slugs, ORCID)
├── components/
│   ├── sections/        # Hero · SelectedWork · Capabilities · Experience · Publications · Projects · Contact
│   ├── ui/              # Navigation · Footer · Button · Card · Badge · MonoLabel · IndexRow · SectionHeader · Icons
│   └── visuals/         # SignalField (hero canvas)
└── lib/                 # design-tokens · motion · cn · constants
```

## Design system

Tokens live in [`src/lib/design-tokens.ts`](src/lib/design-tokens.ts) and are consumed by
`tailwind.config.ts` and mirrored as CSS variables in `globals.css`.

| Token | Hex | Role |
| --- | --- | --- |
| Violet — Field | `#7A35E0` | primary surface, hero/section fields, key CTAs |
| Lime — Pop | `#C6F24E` | one charge per view — never a surface |
| Ink | `#14121A` | text on light, deep base |
| Haze | `#5A5270` | muted text, metadata, hairlines |
| Mist | `#ECEAF0` | light surface, cards, dividers |
| Chalk | `#FAF9FB` | page base, text on the field |

Type: **Zen Kaku Gothic New** (display) · **Hanken Grotesk** (body/UI) · **IBM Plex Mono** (labels).

## Editing content

All copy lives under `src/content/`. Add a publication in `publications.ts`, a role in
`experience.ts`, a case study in `work.ts`, etc. Drop your CV at `public/cv.pdf` to enable
the "Download CV" link.

## Deploy

Hosted on Vercel (region `lhr1`). Production domain `ioannis.dev`.

## License

[MIT](LICENSE) © 2026 Ioannis Valasakis
