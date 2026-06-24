import type { Profile } from './types'

export const profile: Profile = {
  name: 'Ioannis Valasakis',
  role: 'Research Engineer — Signal × DL × Scale',
  roleJa: '研究エンジニア',
  tagline: 'Finding signal in the noise.',
  taglineJa: '鼓動・遊び・対比',
  summary:
    'I build deep-learning systems for signal processing at scale — pulling robust structure out of noisy, high-volume data, and shipping it so it holds up in production.',
  bio: [
    'I’m a research engineer working at the intersection of signal processing, deep learning, and large-scale data systems. I build models and pipelines that find structure in noisy, high-volume signals — and make them robust enough to run well outside the notebook.',
    'I hold a PhD in computational neuroscience from King’s College London, where I developed deep-learning and explainable-AI methods for analysing brain connectivity. Before academia, eight-plus years across industry — from Linux-kernel and embedded systems to creative technology and ML platforms — taught me to ship reliable software, not just prototypes.',
    'Today, at the University of Glasgow, I’m enhancing one of the longest-running clinical ECG analysis programs: building deep-learning models for arrhythmia detection, noise classification, and signal-quality assessment, and re-engineering legacy pipelines for dependable deployment at the scale of millions of recordings a year.',
    'The techniques I reach for — detection in noise, time-series modelling, denoising, anomaly detection — are the same family that astronomy and astrophysics use to pull transients and faint sources out of overwhelming backgrounds. That cross-pollination is where I’m heading next.',
  ],
  location: 'Glasgow, Scotland',
  affiliation: 'University of Glasgow',
  email: 'ioannis.valasakis@glasgow.ac.uk',
  resumeUrl: '/cv.pdf',
}
