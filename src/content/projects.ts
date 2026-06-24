import type { Project } from './types'

export const projects: Project[] = [
  {
    title: 'NeuroExplain',
    description:
      'A Python library for explainable AI on graph and imaging models — SmoothGrad, Grad-CAM, and integrated gradients for attribution.',
    tags: ['Python', 'PyTorch', 'XAI'],
    github: 'https://github.com/depolarised/neuroexplain',
    featured: true,
  },
  {
    title: 'bluewand-python',
    description:
      'Open-source Python API for the KANO Wand — Bluetooth LE motion control for creative coding.',
    tags: ['Python', 'Bluetooth LE', 'IoT', 'Open Source'],
    github: 'https://github.com/depolarised/bluewand-python',
    featured: true,
  },
  {
    title: 'Redox OS — ARM64 Port',
    description:
      'Contributed to porting Redox OS to ARM aarch64 — low-level Rust systems programming.',
    tags: ['Rust', 'OS Dev', 'ARM64', 'Systems'],
    github: 'https://github.com/depolarised',
    featured: true,
  },
  {
    title: 'Connectivity Visualiser',
    description:
      'Interactive tool for exploring functional connectivity matrices and network metrics.',
    tags: ['JavaScript', 'D3.js', 'WebGL', 'Visualization'],
    github: 'https://github.com/depolarised',
    featured: false,
  },
  {
    title: 'PhotoPie',
    description:
      'Python wrapper for Adobe Photoshop automation — batch image processing and scripting.',
    tags: ['Python', 'Automation', 'Scripting'],
    github: 'https://github.com/depolarised/PhotoPie',
    featured: false,
  },
]
