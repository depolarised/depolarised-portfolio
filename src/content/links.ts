import type { SocialLink } from './types'

/** Canonical URLs, referenced across the site. */
export const links = {
  github: 'https://github.com/depolarised',
  linkedin: 'https://linkedin.com/in/wizofe',
  bluesky: 'https://bsky.app/profile/wizofe.uk',
  orcid: 'https://orcid.org/0000-0003-4602-246X',
  researchgate: 'https://www.researchgate.net/profile/Ioannis-Valasakis-2',
  email: 'mailto:ioannis.valasakis@glasgow.ac.uk',
} as const

/** Social / contact links with display metadata. */
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: links.github,
    icon: 'github',
    handle: 'github.com/depolarised',
    description: 'Open-source projects and code.',
  },
  {
    name: 'LinkedIn',
    href: links.linkedin,
    icon: 'linkedin',
    handle: 'in/wizofe',
    description: 'Professional history and contact.',
  },
  {
    name: 'Bluesky',
    href: links.bluesky,
    icon: 'bluesky',
    handle: '@wizofe.uk',
    description: 'Short posts and conversation.',
  },
  {
    name: 'ORCID',
    href: links.orcid,
    icon: 'orcid',
    handle: '0000-0003-4602-246X',
    description: 'Verified research record.',
  },
  {
    name: 'ResearchGate',
    href: links.researchgate,
    icon: 'researchgate',
    handle: 'Ioannis-Valasakis',
    description: 'Publications and preprints.',
  },
  {
    name: 'Email',
    href: links.email,
    icon: 'email',
    handle: 'ioannis.valasakis@glasgow.ac.uk',
    description: 'For research and collaboration.',
  },
]
