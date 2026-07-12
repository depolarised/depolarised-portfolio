import type { Capability } from './types'

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Signal detection in noise',
    titleJa: '信号検出',
    description:
      'Arrhythmia and anomaly detection, denoising, and time-frequency analysis on noisy physiological signals. Lomb-Scargle periodograms, wavelet transforms, and matched filtering in NumPy and SciPy, feeding gradient-boosted models in LightGBM. The same methods astronomy and geophysics use to pull faint sources out of a loud background.',
    tags: ['NumPy / SciPy', 'LightGBM', 'Lomb-Scargle', 'Wavelets', 'Matched filtering'],
  },
  {
    index: '02',
    title: 'Deep learning at scale',
    titleJa: '大規模学習',
    description:
      'Training models on millions of records in PyTorch, on multi-GPU and HPC clusters with CUDA. Reproducible data pipelines and the engineering that keeps a model dependable long after the prototype.',
    tags: ['PyTorch', 'CUDA', 'Multi-GPU / HPC', 'Data pipelines'],
  },
  {
    index: '03',
    title: 'Explainable & trustworthy AI',
    titleJa: '説明可能性',
    description:
      'Model interpretability with gradient attribution in PyTorch (SmoothGrad, Grad-CAM, integrated gradients), packaged in my open-source NeuroExplain library. Calibration and evaluation with scikit-learn, so clinicians and scientists can check why a model made its call.',
    tags: ['PyTorch', 'Grad-CAM / SmoothGrad', 'Integrated gradients', 'scikit-learn'],
  },
  {
    index: '04',
    title: 'Research engineering & systems',
    titleJa: '研究基盤',
    description:
      'Reproducible, well-tested research software in Python, with Rust and C++ where performance matters. Docker, Git, CI/CD, and pytest on long-lived codebases. Habits from Linux-kernel and embedded systems work, applied to code that has clinical consequences.',
    tags: ['Python / Rust / C++', 'Docker', 'CI/CD', 'pytest'],
  },
]
