import type { Capability } from './types'

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Signal detection in noise',
    titleJa: '信号検出',
    description:
      'Pulling structure out of noisy, high-volume signals — arrhythmia and anomaly detection, denoising, time-frequency analysis, signal-quality assessment. The same detection-in-noise problem astronomy faces with transients and faint sources.',
    tags: ['Time-series', 'Detection', 'Denoising', 'Spectral methods'],
  },
  {
    index: '02',
    title: 'Deep learning at scale',
    titleJa: '大規模学習',
    description:
      'Training and shipping models against millions of records: data pipelines, HPC and GPU compute, and production ML that stays reliable far past the prototype.',
    tags: ['PyTorch', 'HPC', 'Pipelines', 'Production ML'],
  },
  {
    index: '03',
    title: 'Explainable & trustworthy AI',
    titleJa: '説明可能性',
    description:
      'Making model decisions legible — SmoothGrad, Grad-CAM, integrated gradients — so predictions can be trusted in clinical and scientific settings.',
    tags: ['XAI', 'Attribution', 'Interpretability'],
  },
  {
    index: '04',
    title: 'Research engineering & systems',
    titleJa: '研究基盤',
    description:
      'From Linux-kernel and embedded systems to modern ML infrastructure: reproducible, well-tested software, not just notebooks — with a bias toward correctness.',
    tags: ['Linux', 'Rust / C++', 'CI/CD', 'Reproducibility'],
  },
]
