export const SITE = {
  name: 'Dr Ioannis Valasakis',
  url: 'https://ioannis.dev',
  title: 'Dr Ioannis Valasakis — Research Engineer',
  description:
    'Research engineer building deep-learning systems for signals at scale. Currently in the ECG Core Lab at the University of Glasgow, working on the Glasgow ECG analysis program.',
  locale: 'en_GB',
} as const

/** Primary navigation (multi-page). */
export const NAV = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
] as const
