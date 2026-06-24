import type { ExperienceItem } from './types'

export const experiences: ExperienceItem[] = [
  {
    title: 'Research Software Engineer',
    organization: 'University of Glasgow',
    location: 'Glasgow, UK',
    period: 'Apr 2025 — Present',
    type: 'academic',
    featured: true,
    description: [
      'Enhancing the Glasgow ECG analysis program — a clinically deployed algorithm used to interpret 20M+ electrocardiograms a year — with deep-learning models for arrhythmia detection, noise classification, and signal-quality assessment.',
      'Bringing modern ML practice (rigorous evaluation, testing, reproducibility) to a fifty-year-old, safety-critical codebase and hardening its pipelines for dependable clinical deployment.',
    ],
    skills: ['Deep Learning', 'Signal Processing', 'Time-Series', 'Clinical ML', 'Python'],
  },
  {
    title: 'Co-founder & CTO',
    organization: 'Tycho MedLink',
    location: 'London, UK',
    period: 'Jan 2023 — Nov 2025',
    type: 'industry',
    description: [
      'Co-founded a digital-therapeutics startup and owned all technology for a VR treatment for Seasonal Affective Disorder, from prototype to clinical pilot.',
      'Raised £100k across two UKRI rounds (UCL and Cambridge alumni accelerators); ran early trials with UCL Hospitals that demonstrated efficacy.',
      'Built the VR product in Unity for Meta hardware with instrumented user metrics.',
    ],
    skills: ['Digital Therapeutics', 'VR / XR', 'Unity', 'Clinical Trials', 'Leadership'],
  },
  {
    title: 'PhD Researcher, Machine Learning & Neuroimaging',
    organization: "King's College London",
    location: 'London, UK',
    period: 'Jan 2020 — Oct 2024',
    type: 'academic',
    description: [
      'Developed deep-learning methods — graph neural networks with explainable-AI attribution (SmoothGrad, Grad-CAM) — to predict neurodevelopmental outcomes from neonatal brain connectivity.',
      'Worked in the CoDe Neuro lab alongside clinicians at the Centre for the Developing Brain; results published and presented at OHBM.',
    ],
    skills: ['Deep Learning', 'Graph Neural Networks', 'Explainable AI', 'fMRI'],
  },
  {
    title: 'Senior Research Engineer',
    organization: 'Prepaire',
    location: 'Dubai, UAE (Remote)',
    period: 'Oct 2020 — Sep 2021',
    type: 'industry',
    description: [
      'Led development of AI models, including custom LLMs, to automate genomic data-analysis pipelines — cutting processing time by ~40%.',
      'Shipped models into a high-performance production environment with scalability as a first-class concern.',
    ],
    skills: ['LLMs', 'Genomics', 'PyTorch', 'Production ML'],
  },
  {
    title: 'Teaching Assistant, Deep Learning',
    organization: 'Neuromatch',
    location: 'Remote',
    period: 'May 2022 — Jul 2022',
    type: 'teaching',
    description: [
      'Taught deep learning (PyTorch, neuroimaging tooling) to an international cohort; ran daily labs and project work.',
    ],
    skills: ['PyTorch', 'Teaching', 'Neuroimaging'],
  },
  {
    title: 'Research Software Engineer',
    organization: 'Google Summer of Code',
    location: 'London, UK',
    period: 'Jul 2022 — Sep 2022',
    type: 'academic',
    description: [
      'Built an infant eye-tracking API prototype, mentored by McGill University’s ophthalmology group.',
    ],
    skills: ['Python', 'PyTorch', 'Medical Devices', 'Eye Tracking'],
  },
  {
    title: 'Technical Editor, Computer Vision',
    organization: 'RSIP Vision',
    location: 'Remote',
    period: 'Nov 2019 — Jan 2023',
    type: 'industry',
    description: [
      'Reviewed and distilled state-of-the-art computer-vision and medical-imaging research for a specialist readership (Computer Vision News).',
    ],
    skills: ['Computer Vision', 'Medical Imaging', 'Technical Writing'],
  },
  {
    title: 'Senior Machine Learning Engineer',
    organization: 'Saddington Baynes',
    location: 'London, UK',
    period: 'Jan 2019 — Mar 2020',
    type: 'industry',
    description: [
      'Built AI image-processing automation (TensorFlow) that cut manual work ~50%, with GPU-accelerated Docker and optimised CI/CD for model deployment.',
    ],
    skills: ['TensorFlow', 'GPU Computing', 'Docker', 'CI/CD'],
  },
  {
    title: 'Software Engineer, Linux Kernel',
    organization: 'Microsoft',
    location: 'UK',
    period: 'Nov 2018 — Jan 2019',
    type: 'industry',
    description: [
      'Optimised cloud hypervisor systems at the kernel level (C) for performance and stability; contributed to virtualization R&D.',
    ],
    skills: ['Linux Kernel', 'C', 'Virtualization', 'Systems'],
  },
  {
    title: 'Systems Software Engineer',
    organization: 'Kano Computing',
    location: 'London, UK',
    period: 'Dec 2016 — Nov 2018',
    type: 'industry',
    description: [
      'Built and maintained a Linux-based OS (system services, Qt/C++ and GTK); cut image build time from 4 hours to 30 minutes and added CI/CD.',
    ],
    skills: ['Linux', 'C++', 'Qt', 'Docker', 'CI/CD'],
  },
  {
    title: 'Research Software Engineer, Serious Games',
    organization: 'University of Athens',
    location: 'Athens, Greece',
    period: 'Mar 2014 — Jan 2016',
    type: 'academic',
    description: [
      'Built an accessible “serious game” for children with mild disabilities (Epinoisi R&D) in PyGame/WebGL with a C++ game AI.',
    ],
    skills: ['Game Development', 'C++', 'Accessibility', 'Research'],
  },
  {
    title: 'Embedded Systems Engineer',
    organization: 'INTRACOM Defense Electronics',
    location: 'Athens, Greece',
    period: 'Jul 2009 — Dec 2013',
    type: 'industry',
    description: [
      'Embedded R&D (FPGA, microcontrollers) for a military comms system under NATO clearance; built an automated test framework validated to NATO/MIL-STD.',
    ],
    skills: ['Embedded', 'FPGA', 'C', 'Signal Hardware'],
  },
]
