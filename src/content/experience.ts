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
      'Working in the ECG Core Lab led by Prof. Peter Macfarlane and Prof. Derek Connelly, on the Glasgow ECG analysis program. The program is clinically deployed and helps interpret more than 20 million electrocardiograms a year.',
      'Building a commercial deep-learning layer that improves atrial-fibrillation detection, using signal-processing methods borrowed from astronomy and geophysics rather than a foundation model.',
      'Validating against expert-adjudicated reference standards and external databases, developing to IEC 60601-2-51 under an ISO 9001:2015 quality system.',
      'Adding modern ML practice (rigorous evaluation, testing, reproducibility) to a codebase the lab has developed for over fifty years, so it stays dependable in clinical use.',
    ],
    skills: ['Deep Learning', 'Atrial Fibrillation', 'Signal Processing', 'Clinical ML', 'Python'],
  },
  {
    title: 'Co-founder & CTO',
    organization: 'Tycho MedLink',
    location: 'London, UK',
    period: 'Jan 2023 — Nov 2025',
    type: 'industry',
    description: [
      'Co-founded a digital-therapeutics startup and owned all the technology for a VR treatment for Seasonal Affective Disorder, from prototype to clinical pilot.',
      'Raised £100k across two UKRI rounds through the UCL and Cambridge alumni accelerators. Ran early trials with UCL Hospitals that showed the treatment worked.',
      'Built the VR product in Unity for Meta hardware, with instrumented user metrics.',
    ],
    skills: ['Digital Therapeutics', 'VR / XR', 'Unity', 'Clinical Trials', 'Leadership'],
    links: [
      { label: 'Cambridge Judge ventures', href: 'https://www.jbs.cam.ac.uk/ventures/tycho-medlink/' },
      { label: 'DigitalHealth.London', href: 'https://digitalhealth.london/innovation-directory/profile/tycho-medlink-limited' },
    ],
  },
  {
    title: 'PhD Researcher, Machine Learning & Neuroimaging',
    organization: "King's College London",
    location: 'London, UK',
    period: 'Jan 2020 — Oct 2024',
    type: 'academic',
    description: [
      'Developed graph neural networks with explainable-AI attribution (SmoothGrad, Grad-CAM) to predict neurodevelopmental outcomes from neonatal brain connectivity.',
      'Worked in the CoDe Neuro lab alongside clinicians at the Centre for the Developing Brain. Results were published and presented at OHBM.',
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
      'Led development of AI models, including custom LLMs, that automated genomic data-analysis pipelines and cut processing time by around 40%.',
      'Shipped the models into a high-performance production environment built to scale.',
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
      'Taught deep learning with PyTorch and neuroimaging tooling to an international cohort. Ran daily labs and project work.',
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
      'Reviewed and summarised new computer-vision and medical-imaging research for Computer Vision News.',
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
      'Built AI image-processing automation in TensorFlow that cut manual work by about half. Set up GPU-accelerated Docker and CI/CD for model deployment.',
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
      'Worked on cloud hypervisor performance and stability at the kernel level, in C. Contributed to virtualization R&D.',
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
      'Built and maintained a Linux-based OS, including system services and Qt/C++ and GTK applications. Cut the image build time from 4 hours to 30 minutes and added CI/CD.',
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
      'Built an accessible “serious game” for children with mild disabilities (Epinoisi R&D), in PyGame and WebGL with a C++ game AI.',
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
      'Embedded R&D (FPGA, microcontrollers) for a military communications system under NATO clearance. Built an automated test framework validated to NATO and MIL-STD requirements.',
    ],
    skills: ['Embedded', 'FPGA', 'C', 'Signal Hardware'],
  },
]
