import type { Profile } from './types'

export const profile: Profile = {
  name: 'Dr Ioannis Valasakis',
  role: 'Research engineer, signals and machine learning',
  roleJa: '研究エンジニア',
  tagline: 'Finding signal in the noise.',
  taglineJa: '鼓動・遊び・対比',
  summary:
    'I build machine-learning systems that pick out faint signals in noisy data. Most of the work is the engineering that makes them trustworthy: validating them with clinicians against clinical reference standards, and keeping them reliable once they are in clinical use.',
  bio: [
    'Most of my work is on signals that are difficult to read. They are faint, they sit in a lot of noise, and they feed decisions where a wrong answer costs something.',
    'I did a PhD in computational neuroscience at King’s College London, on deep learning and explainable AI for brain connectivity. Before and around that I spent more than eight years in industry, on the Linux kernel, embedded systems, and machine-learning platforms. I also co-founded a health-tech startup and looked after its technology. The common thread was getting a promising idea to work reliably once it left the notebook.',
    'These days I work as a Research Software Engineer in the ECG Core Lab at the University of Glasgow, with Prof. Peter Macfarlane and Prof. Derek Connelly. The lab has developed the Glasgow ECG analysis program for more than fifty years, and it now helps read over 20 million recordings a year. My main project is a deep-learning layer that improves how the program detects atrial fibrillation. It reads the faint atrial part of the signal using weak-signal methods from astronomy and geophysics, and it strengthens the existing algorithm instead of replacing it. The code is used in clinics, so a mistake has real consequences, and we build it that way.',
    'Day to day I work on detection in noise, time-series modelling, denoising, and anomaly detection. Astronomy and geophysics have spent decades refining the same methods to pull faint sources out of a loud background, and some of that thinking is already in the ECG work. I want to keep going in that direction, toward larger data and fainter signals.',
  ],
  credentials: 'PhD, King’s College London · Research Software Engineer, University of Glasgow',
  location: 'Glasgow, Scotland',
  affiliation: 'University of Glasgow',
  email: 'ioannis.valasakis@glasgow.ac.uk',
  resumeUrl: '/cv.pdf',
}
