/** Shared content types for the typed data layer under src/content. */

export type IconName =
  | 'github'
  | 'linkedin'
  | 'bluesky'
  | 'orcid'
  | 'researchgate'
  | 'twitter'
  | 'email'
  | 'arrow'
  | 'arrowDown'
  | 'external'

export interface Profile {
  name: string
  role: string
  roleJa: string
  tagline: string
  taglineJa: string
  summary: string
  bio: string[]
  credentials?: string
  location: string
  affiliation: string
  email: string
  resumeUrl: string
}

export interface SocialLink {
  name: string
  href: string
  icon: IconName
  handle?: string
  description?: string
}

export type ExperienceType = 'academic' | 'industry' | 'teaching'

export interface ExperienceItem {
  title: string
  organization: string
  location: string
  period: string
  type: ExperienceType
  description: string[]
  skills?: string[]
  links?: WorkLink[]
  featured?: boolean
}

export type PublicationType = 'journal' | 'conference' | 'abstract' | 'thesis'

export interface Publication {
  title: string
  authors: string
  venue: string
  year: number
  type: PublicationType
  doi?: string
  url?: string
  tags: string[]
}

export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  featured: boolean
}

export interface WorkLink {
  label: string
  href: string
}

export interface WorkItem {
  slug: string
  title: string
  titleJa?: string
  organization: string
  period: string
  role: string
  year: number
  tagline: string
  summary: string
  contributions: string[]
  context: string[]
  stack: string[]
  links?: WorkLink[]
  featured: boolean
}

export interface Capability {
  index: string
  title: string
  titleJa: string
  description: string
  tags: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface WritingNote {
  slug: string
  title: string
  date: string
  summary: string
  body: string[]
  draft?: boolean
}
