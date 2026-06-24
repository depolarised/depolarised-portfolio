export const SITE = {
  name: 'Ioannis Valasakis',
  url: 'https://ioannis.dev',
  title: 'Ioannis Valasakis — Research Engineer',
  description:
    'Research engineer building deep-learning systems for signal processing at scale — robust detection in noisy, high-volume data. Currently enhancing the Glasgow ECG analysis program.',
  locale: 'en_GB',
} as const

/** Primary navigation (multi-page). */
export const NAV = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
] as const
