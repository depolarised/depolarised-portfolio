export interface RecognitionItem {
  year: string
  title: string
  detail: string
}

/**
 * Selected recognition — a dense year·title·detail record (the ochyai strip
 * rhythm). Every entry is a real, verifiable milestone drawn from experience.ts
 * and publications.ts: peer-reviewed venues, the doctorate, competitive
 * funding, and selective programmes. No awards are invented here; add formal
 * honours to the top of this list as they land.
 */
export const recognition: RecognitionItem[] = [
  {
    year: '2025',
    title: 'Biological Psychiatry: Global Open Science',
    detail: 'Peer-reviewed journal — µ-opioid modulation of sensorimotor connectivity (co-author)',
  },
  {
    year: '2024',
    title: 'PhD, Machine Learning & Neuroimaging',
    detail: 'King’s College London — explainable AI for brain connectivity',
  },
  {
    year: '2024',
    title: 'OHBM: Explainable deep learning for subtyping',
    detail: 'SmoothGrad attribution · Organization for Human Brain Mapping',
  },
  {
    year: '2023',
    title: '£100k UKRI innovation funding',
    detail: 'Tycho MedLink — UCL & Cambridge Judge accelerators',
  },
  {
    year: '2023',
    title: 'OHBM: Neurodevelopmental phenotypes via GNNs',
    detail: 'Neonatal brain connectivity · graph neural networks',
  },
  {
    year: '2022',
    title: 'Google Summer of Code',
    detail: 'Infant eye-tracking API · mentored by McGill Ophthalmology',
  },
  {
    year: '2021',
    title: 'ISMRM: 3D-VNN coronary MR angiography',
    detail: 'Learned reconstruction · Int’l Society for Magnetic Resonance in Medicine',
  },
]
