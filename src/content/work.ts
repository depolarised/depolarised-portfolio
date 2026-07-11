import type { WorkItem } from './types'

export const workItems: WorkItem[] = [
  {
    slug: 'glasgow',
    title: 'Enhancing the Glasgow ECG Analysis Program',
    titleJa: '心電図',
    organization: 'University of Glasgow',
    period: 'Apr 2025 — Present',
    role: 'Research Engineer',
    year: 2025,
    featured: true,
    tagline:
      'A deep-learning layer that improves atrial-fibrillation detection in the Glasgow ECG program.',
    summary:
      'The Glasgow ECG analysis program has been developed for more than fifty years in the ECG Core Lab at the University of Glasgow, led by Prof. Peter Macfarlane and Prof. Derek Connelly. It helps read over 20 million recordings a year across licensed devices and research studies. My main project is a commercial deep-learning layer that improves how the program detects atrial fibrillation. It strengthens the existing algorithm instead of replacing it, which cuts false positives and lets clinicians set the balance of sensitivity and specificity they want.',
    contributions: [
      'Building the atrial-fibrillation detection models with task-specific machine learning. I chose that over a large foundation model to keep the operating point interpretable and under our control.',
      'Reading the atrial residual of the ECG with weak-signal methods borrowed from astronomy and geophysics (Lomb-Scargle periodograms, chaos and entropy measures, Allan and Fano variance).',
      'Validating against expert-adjudicated reference standards reviewed by Prof. Macfarlane and Prof. Connelly, across external databases including MIMIC-IV, PTB-XL, and CODE-15.',
      'Bringing rigorous evaluation, testing, and traceability to a long-lived, safety-critical codebase.',
    ],
    context: [
      'Developed in the ECG Core Lab founded by Prof. Peter Macfarlane, with Prof. Derek Connelly co-leading the lab today.',
      'A commercial deliverable, developed to IEC 60601-2-51 (ECG analysis performance) under an ISO 9001:2015 quality system.',
      'On the held-out gold standard, AF discrimination reaches around 0.97 AUROC, level with foundation-model and deep-net accuracy while staying interpretable.',
      '20M+ ECGs interpreted annually across 8+ licensed device manufacturers, used in clinical and epidemiological studies worldwide.',
    ],
    stack: ['Python', 'PyTorch', 'LightGBM', 'Signal processing', 'Time-series', 'Clinical ML'],
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
      'A 3D variational neural network (3D-VNN) that reconstructs coronary MR angiography, recovering image quality from undersampled, motion-sensitive acquisitions. Presented at ISMRM 2021.',
    contributions: [
      'Contributed to the 3D variational network reconstruction approach.',
      'Helped evaluate reconstruction quality against conventional methods.',
    ],
    context: [
      'Cardiac MR is slow and motion-sensitive. Learned reconstruction recovers signal from fewer measurements.',
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
      'My doctoral work built attribution methods (SmoothGrad, Grad-CAM, integrated gradients) that show which features drive a model’s predictions from brain-connectivity data, so the outputs could be questioned and checked.',
    contributions: [
      'Adapted gradient-based attribution to graph and imaging models.',
      'Open-sourced tooling (NeuroExplain).',
      'Presented at OHBM 2023 and 2024.',
    ],
    context: [
      'A prediction is only useful in the clinic if someone can check why the model made it.',
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
    tagline: 'Automating genomic data-analysis pipelines with custom models.',
    summary:
      'Led the development of AI models, including custom language models, that automated genomic data-analysis pipelines. The work cut processing time by around 40 percent.',
    contributions: [
      'Built model-driven automation across data-heavy genomic pipelines.',
      'Put the models into the production system and kept them working as the data grew.',
    ],
    context: [
      'Genomic pipelines are bespoke and data-heavy, so good automation pays off quickly.',
    ],
    stack: ['Python', 'PyTorch', 'LLMs', 'Production ML'],
  },
]
