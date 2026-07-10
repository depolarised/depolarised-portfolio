import { describe, it, expect } from 'vitest'
import { profile } from './profile'
import { links, socialLinks } from './links'
import { experiences } from './experience'
import { publications } from './publications'
import { projects } from './projects'
import { workItems } from './work'
import { capabilities } from './capabilities'
import { skillGroups } from './skills'
import { notes } from './writing'

const DOI = /^10\.\d{4,9}\/\S+$/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ORCID = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/
const ALLOWED_ICONS = new Set([
  'github',
  'linkedin',
  'bluesky',
  'orcid',
  'researchgate',
  'twitter',
  'email',
  'arrow',
  'arrowDown',
  'external',
])

function isValidUrl(value: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(value)
    return true
  } catch {
    return false
  }
}

describe('profile', () => {
  it('has the essential fields and the Dr honorific on the name', () => {
    expect(profile.name).toBe('Dr Ioannis Valasakis')
    expect(profile.role.length).toBeGreaterThan(0)
    expect(profile.bio.length).toBeGreaterThanOrEqual(3)
  })

  it('mentions the PhD somewhere in the bio prose', () => {
    expect(profile.bio.join(' ').toLowerCase()).toContain('phd')
  })
})

describe('links', () => {
  it('are all valid URLs or mailto', () => {
    for (const href of Object.values(links)) {
      expect(isValidUrl(href), href).toBe(true)
    }
  })

  it('has a well-formed ORCID iD', () => {
    const id = links.orcid.replace('https://orcid.org/', '')
    expect(id).toMatch(ORCID)
  })

  it('social links use known icons and valid hrefs', () => {
    for (const link of socialLinks) {
      expect(ALLOWED_ICONS.has(link.icon), link.icon).toBe(true)
      expect(isValidUrl(link.href), link.href).toBe(true)
    }
  })
})

describe('publications', () => {
  it('preserve required fields and valid DOIs', () => {
    expect(publications.length).toBeGreaterThan(0)
    for (const pub of publications) {
      expect(pub.title.length).toBeGreaterThan(0)
      expect(pub.authors.length).toBeGreaterThan(0)
      expect(pub.venue.length).toBeGreaterThan(0)
      expect(typeof pub.year).toBe('number')
      expect(pub.tags.length).toBeGreaterThan(0)
      if (pub.doi) expect(pub.doi, pub.title).toMatch(DOI)
    }
  })

  it('keeps the Biological Psychiatry GOS DOI intact', () => {
    const dois = publications.map((p) => p.doi).filter(Boolean)
    expect(dois).toContain('10.1016/j.bpsgos.2025.100663')
  })
})

describe('work', () => {
  it('has unique, url-safe slugs and complete case studies', () => {
    const slugs = workItems.map((w) => w.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const item of workItems) {
      expect(item.slug, item.slug).toMatch(SLUG)
      expect(item.contributions.length).toBeGreaterThan(0)
      expect(item.context.length).toBeGreaterThan(0)
      expect(item.stack.length).toBeGreaterThan(0)
      expect(typeof item.year).toBe('number')
      for (const link of item.links ?? []) {
        expect(isValidUrl(link.href), link.href).toBe(true)
      }
    }
  })

  it('features the Glasgow case study', () => {
    const featured = workItems.filter((w) => w.featured)
    expect(featured.length).toBeGreaterThanOrEqual(1)
    expect(workItems.some((w) => w.slug === 'glasgow')).toBe(true)
  })
})

describe('projects', () => {
  it('have valid GitHub/demo links where present', () => {
    expect(projects.length).toBeGreaterThan(0)
    for (const p of projects) {
      if (p.github) expect(isValidUrl(p.github), p.github).toBe(true)
      if (p.demo) expect(isValidUrl(p.demo), p.demo).toBe(true)
      expect(p.tags.length).toBeGreaterThan(0)
    }
  })
})

describe('experience', () => {
  it('preserves the full timeline with descriptions', () => {
    expect(experiences.length).toBeGreaterThanOrEqual(10)
    for (const exp of experiences) {
      expect(exp.period.length).toBeGreaterThan(0)
      expect(exp.description.length).toBeGreaterThan(0)
      expect(['academic', 'industry', 'teaching']).toContain(exp.type)
    }
  })
})

describe('capabilities & skills', () => {
  it('has four capability pillars with tags', () => {
    expect(capabilities.length).toBe(4)
    for (const cap of capabilities) expect(cap.tags.length).toBeGreaterThan(0)
  })

  it('has non-empty skill groups', () => {
    expect(skillGroups.length).toBeGreaterThan(0)
    for (const group of skillGroups) expect(group.items.length).toBeGreaterThan(0)
  })
})

describe('voice', () => {
  // The site's prose voice: plain sentences, no em dashes or semicolons, no
  // stock AI phrasing. profile.role and profile.tagline are deliberate
  // exceptions (display lines, not prose), as are date ranges and titles.
  const prose = [
    profile.summary,
    ...profile.bio,
    ...capabilities.map((c) => c.description),
    ...experiences.flatMap((e) => e.description),
    ...workItems.flatMap((w) => [w.tagline, w.summary, ...w.contributions, ...w.context]),
    ...projects.map((p) => p.description),
    ...notes.flatMap((n) => [n.summary, ...n.body]),
  ]

  it('contains no em dashes or semicolons in prose', () => {
    for (const text of prose) {
      expect(text, text).not.toContain('—')
      expect(text, text).not.toContain(';')
    }
  })

  it('avoids stock AI phrasing', () => {
    const banned = [
      /it['’]s about/i,
      /it['’]s not just/i,
      /not only .{1,40} but also/i,
      /in a world where/i,
      /at its core/i,
    ]
    for (const text of prose) {
      for (const pattern of banned) {
        expect(pattern.test(text), `${pattern} in: ${text}`).toBe(false)
      }
    }
  })
})

describe('writing', () => {
  it('has unique, url-safe slugs and bodies', () => {
    const slugs = notes.map((n) => n.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const note of notes) {
      expect(note.slug, note.slug).toMatch(SLUG)
      expect(note.body.length).toBeGreaterThan(0)
    }
  })
})
