import type { Capability } from './types'

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Signal detection in noise',
    titleJa: '信号検出',
    description:
      'Arrhythmia and anomaly detection, denoising, time-frequency analysis, and signal-quality assessment in noisy, high-volume data. Astronomy faces the same problem with transients and faint sources.',
    tags: ['Time-series', 'Detection', 'Denoising', 'Spectral methods'],
  },
  {
    index: '02',
    title: 'Deep learning at scale',
    titleJa: '大規模学習',
    description:
      'Training and shipping models against millions of records. Data pipelines, HPC and GPU compute, and production ML that keeps working long after the prototype.',
    tags: ['PyTorch', 'HPC', 'Pipelines', 'Production ML'],
  },
  {
    index: '03',
    title: 'Explainable & trustworthy AI',
    titleJa: '説明可能性',
    description:
      'Attribution methods like SmoothGrad, Grad-CAM, and integrated gradients, so clinicians and scientists can see why a model made its call.',
    tags: ['XAI', 'Attribution', 'Interpretability'],
  },
  {
    index: '04',
    title: 'Research engineering & systems',
    titleJa: '研究基盤',
    description:
      'Reproducible, well-tested research software, with habits carried over from Linux-kernel and embedded systems work.',
    tags: ['Linux', 'Rust / C++', 'CI/CD', 'Reproducibility'],
  },
]
