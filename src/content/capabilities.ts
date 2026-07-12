import type { Capability } from './types'

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Signal detection in noise',
    titleJa: '信号検出',
    description:
      'Arrhythmia and anomaly detection, denoising, and time-frequency analysis on noisy physiological signals. Lomb-Scargle periodograms, wavelets, and matched filtering in NumPy and SciPy, feeding LightGBM models.',
    tags: ['NumPy / SciPy', 'LightGBM', 'Lomb-Scargle', 'Matched filtering'],
  },
  {
    index: '02',
    title: 'Deep learning at scale',
    titleJa: '大規模学習',
    description:
      'Training models on millions of records in PyTorch and JAX, across multi-GPU and HPC clusters with CUDA. Reproducible data pipelines and the ordinary engineering that keeps a model dependable long after the prototype.',
    tags: ['PyTorch', 'JAX', 'CUDA', 'Multi-GPU / HPC'],
  },
  {
    index: '03',
    title: 'Explainable & trustworthy AI',
    titleJa: '説明可能性',
    description:
      'Model interpretability with SmoothGrad, Grad-CAM, and integrated gradients, packaged in my open-source NeuroExplain library. Calibration and evaluation in scikit-learn, so clinicians can check why a model made its call.',
    tags: ['PyTorch', 'Grad-CAM / SmoothGrad', 'Integrated gradients', 'scikit-learn'],
  },
  {
    index: '04',
    title: 'Research engineering & systems',
    titleJa: '研究基盤',
    description:
      'Reproducible, well-tested research software in Python, with Rust and C++ where performance matters. Docker, CI/CD, and pytest on long-lived codebases, with recent experiments moving the training stack onto Kubernetes.',
    tags: ['Python / Rust / C++', 'Docker / Kubernetes', 'CI/CD', 'pytest'],
  },
]
