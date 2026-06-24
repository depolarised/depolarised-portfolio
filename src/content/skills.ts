import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  { category: 'Languages', items: ['Python', 'Julia', 'Rust', 'C / C++', 'R'] },
  {
    category: 'ML / DL',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Graph Neural Networks', 'LLMs'],
  },
  {
    category: 'Signal & data',
    items: ['Time-series', 'Signal processing', 'NumPy / SciPy', 'Pandas', 'Spectral methods'],
  },
  {
    category: 'Systems & scale',
    items: ['Linux', 'Docker', 'HPC clusters', 'GPU computing', 'CI/CD', 'Git'],
  },
  {
    category: 'Domains',
    items: ['Clinical ECG', 'Neuroimaging (fMRI / MRI)', 'Genomics', 'Medical imaging'],
  },
]
