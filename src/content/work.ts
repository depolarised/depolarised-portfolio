import type { WorkItem } from './types'

export const workItems: WorkItem[] = [
  {
    slug: 'glasgow',
    title: 'Modernising the Glasgow ECG Analysis Program',
    titleJa: '心電図',
    organization: 'University of Glasgow',
    period: 'Apr 2025 — Present',
    role: 'Research Engineer',
    year: 2025,
    featured: true,
    tagline:
      'Deep-learning signal analysis for one of the longest-running clinical ECG programs.',
    summary:
      'The Glasgow program has interpreted electrocardiograms for over fifty years and processes millions of recordings a year across licensed devices and research studies. I build the modern signal-analysis layer on top of it — and bring decades-old, safety-critical code into a reproducible, well-tested workflow.',
    contributions: [
      'Developing deep-learning modules for arrhythmia detection, noise classification, and signal-quality assessment.',
      'Re-engineering legacy interpretation pipelines for dependable, reproducible clinical deployment.',
      'Bringing modern ML tooling, evaluation, and testing discipline to a long-lived codebase.',
    ],
    context: [
      '50+ years of continuous development; age-, sex- and ethnicity-specific diagnostic criteria.',
      '20M+ ECGs interpreted annually across 8+ licensed device manufacturers.',
      'Used in major epidemiological and clinical studies worldwide.',
    ],
    stack: ['Python', 'PyTorch', 'Signal processing', 'Time-series', 'Clinical ML'],
    links: [
      { label: 'Glasgow ECG program', href: 'https://the-glasgow-program-website.vercel.app/' },
    ],
  },
  {
    slug: 'coronary-mra',
    title: '3D Variational Networks for Coronary MR Angiography',
    titleJa: '再構成',
    organization: 'Imperial College London / KCL',
    period: '2020 — 2021',
    role: 'Research contributor',
    year: 2021,
    featured: false,
    tagline: 'Learned reconstruction for faster, cleaner cardiac imaging.',
    summary:
      'A 3D variational neural network (3D-VNN) for reconstructing coronary MR angiography — recovering image quality from undersampled, motion-sensitive acquisitions. Presented at ISMRM 2021.',
    contributions: [
      'Contributed to the 3D variational network reconstruction approach.',
      'Helped evaluate reconstruction quality against conventional methods.',
    ],
    context: [
      'Cardiac MR is slow and motion-sensitive; learned reconstruction recovers signal from fewer measurements.',
    ],
    stack: ['Deep Learning', 'MRI', 'Reconstruction', 'PyTorch'],
  },
  {
    slug: 'xai-neuroimaging',
    title: 'Explainable AI for Neuroimaging',
    titleJa: '説明可能性',
    organization: "King's College London",
    period: '2020 — 2024',
    role: 'PhD Researcher',
    year: 2024,
    featured: false,
    tagline: 'Making deep models legible for clinical neuroscience.',
    summary:
      'My doctoral work built attribution methods — SmoothGrad, Grad-CAM, integrated gradients — to reveal which features drive a model’s predictions from brain-connectivity data, so the outputs could be trusted and interrogated.',
    contributions: [
      'Adapted gradient-based attribution to graph and imaging models.',
      'Open-sourced tooling (NeuroExplain).',
      'Presented at OHBM 2023 and 2024.',
    ],
    context: [
      'Interpretability is the bridge between a model that predicts and one a clinician can trust.',
    ],
    stack: ['Python', 'PyTorch', 'XAI', 'Graph Neural Networks'],
    links: [{ label: 'NeuroExplain', href: 'https://github.com/depolarised/neuroexplain' }],
  },
  {
    slug: 'genomics-llm',
    title: 'LLM-Assisted Genomics Pipelines',
    titleJa: '大規模',
    organization: 'Prepaire',
    period: 'Oct 2020 — Sep 2021',
    role: 'Senior Research Engineer',
    year: 2021,
    featured: false,
    tagline: 'Automating genomic data analysis with custom models at scale.',
    summary:
      'Led development of AI models, including custom LLMs, to automate genomic data-analysis pipelines in a high-performance production environment — improving processing speed by around 40%.',
    contributions: [
      'Built model-driven automation across data-heavy genomic pipelines.',
      'Integrated models into production with scalability as a first-class concern.',
    ],
    context: [
      'Genomic pipelines are bespoke and data-heavy; automation compounds at scale.',
    ],
    stack: ['Python', 'PyTorch', 'LLMs', 'Production ML'],
  },
]
