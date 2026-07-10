import type { Profile } from './types'

export const profile: Profile = {
  name: 'Dr Ioannis Valasakis',
  role: 'Research Engineer — Signal × DL × Scale',
  roleJa: '研究エンジニア',
  tagline: 'Finding signal in the noise.',
  taglineJa: '鼓動・遊び・対比',
  summary:
    'I build deep-learning systems that pull structure out of noisy signals at scale, and I ship them so they keep working in production.',
  bio: [
    'I build systems for the hard cases: faint signals, large data, and decisions where being wrong is expensive.',
    'Most of my work is taking a promising model and making it run reliably outside the notebook. I got here by an odd route. I did a PhD in computational neuroscience at King’s College London, on deep learning and explainable AI for brain connectivity. Before and around that I spent over eight years in industry, working on the Linux kernel, embedded systems, and ML platforms, and I co-founded a health-tech startup.',
    'These days I’m a Research Software Engineer in the ECG Core Lab at the University of Glasgow, led by Prof. Peter Macfarlane and Prof. Derek Connelly. The lab has been developing the Glasgow ECG analysis program for more than fifty years, and it now helps interpret over 20 million recordings a year. My main project is a commercial deep-learning layer that sharpens atrial-fibrillation detection in the program. It borrows weak-signal methods from astronomy and geophysics, and it enhances the existing algorithm rather than replacing it, on a codebase where mistakes have clinical consequences.',
    'The methods I use daily are detection in noise, time-series modelling, denoising, and anomaly detection. Astronomy and geophysics use the same family to pull faint sources out of overwhelming backgrounds, and some of those methods are already in the ECG work. I want to keep pushing in that direction, toward larger data and fainter signals.',
  ],
  credentials: 'PhD, King’s College London · Research Software Engineer, University of Glasgow',
  location: 'Glasgow, Scotland',
  affiliation: 'University of Glasgow',
  email: 'ioannis.valasakis@glasgow.ac.uk',
  resumeUrl: '/cv.pdf',
}
