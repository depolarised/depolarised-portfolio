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
    'I build systems for the hard cases — faint signals, large data, and decisions where being wrong is expensive.',
    'That’s how I see the research engineer’s job: turn a promising model into something that runs reliably outside the notebook. My background is unusually wide for it — a PhD in computational neuroscience from King’s College London (deep learning and explainable AI for brain connectivity), on top of eight-plus years in industry spanning Linux-kernel and embedded systems, ML platforms, and a co-founded health-tech startup.',
    'Today I’m a Research Software Engineer at the University of Glasgow, enhancing a clinically deployed ECG program that interprets 20M+ recordings a year — building deep-learning models for arrhythmia detection, noise classification, and signal-quality, and bringing modern ML rigour to a fifty-year-old, safety-critical codebase.',
    'The methods I reach for — detection in noise, time-series modelling, denoising, anomaly detection — are the family astronomy uses to pull faint sources and transients out of overwhelming backgrounds. That cross-pollination, toward larger data and fainter signals, is where I’m heading next.',
  ],
  location: 'Glasgow, Scotland',
  affiliation: 'University of Glasgow',
  email: 'ioannis.valasakis@glasgow.ac.uk',
  resumeUrl: '/cv.pdf',
}
