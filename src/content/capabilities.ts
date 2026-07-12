import type { Capability } from './types'

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Signal detection in noise',
    titleJa: '信号検出',
    description:
      'Arrhythmia and anomaly detection, denoising, and time-frequency analysis on noisy physiological signals. Matched filtering, spectral estimation with Lomb-Scargle, wavelets, and entropy measures. The same family of methods astronomy and geophysics use to pull faint sources out of a loud background.',
    tags: ['Time-series', 'Anomaly detection', 'Matched filtering', 'Spectral estimation', 'Wavelets'],
  },
  {
    index: '02',
    title: 'Deep learning at scale',
    titleJa: '大規模学習',
    description:
      'Large-scale training on GPU and HPC clusters against millions of records, mostly in PyTorch. Data pipelines, reproducible experiments, and the ordinary engineering that keeps a model dependable long after the prototype.',
    tags: ['PyTorch', 'GPU / HPC', 'Large-scale training', 'Data pipelines'],
  },
  {
    index: '03',
    title: 'Explainable & trustworthy AI',
    titleJa: '説明可能性',
    description:
      'Model interpretability with gradient attribution (SmoothGrad, Grad-CAM, integrated gradients), calibration, and honest evaluation, so clinicians and scientists can check why a model made its call.',
    tags: ['Interpretability', 'Gradient attribution', 'Calibration', 'Evaluation'],
  },
  {
    index: '04',
    title: 'Research engineering & systems',
    titleJa: '研究基盤',
    description:
      'Reproducible, well-tested research software: version control, CI/CD, containers, and testing on long-lived codebases. Habits carried over from Linux-kernel and embedded systems work, applied to code that has clinical consequences.',
    tags: ['Python / Rust / C++', 'CI/CD', 'Docker', 'Testing'],
  },
]
