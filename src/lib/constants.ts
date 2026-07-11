export const SITE = {
  name: 'Dr Ioannis Valasakis',
  url: 'https://ioannis.dev',
  title: 'Dr Ioannis Valasakis — Research Engineer',
  description:
    'Research engineer building machine-learning systems that find faint signals in noisy data. Currently in the ECG Core Lab at the University of Glasgow, working on the Glasgow ECG analysis program.',
  locale: 'en_GB',
} as const

/** Primary navigation (multi-page). `ja` is the bilingual secondary mark. */
export const NAV = [
  { label: 'Work', ja: '仕事', href: '/work' },
  { label: 'Writing', ja: '著述', href: '/writing' },
  { label: 'About', ja: '紹介', href: '/about' },
  { label: 'Contact', ja: '連絡', href: '/#contact' },
] as const
