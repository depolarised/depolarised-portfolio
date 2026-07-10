import type { WritingNote } from './types'

export const notes: WritingNote[] = [
  {
    slug: 'detection-in-noise',
    title: 'Detection in noise: what ECG and gravitational-wave pipelines share',
    date: '2026-06',
    draft: true,
    summary:
      'A short note on why the hardest part of many signal problems, in medicine or in astronomy, is the same problem wearing different clothes.',
    body: [
      'Most of my work comes down to one question: is there a signal here, and can I trust it? The architecture, the pipeline, and the deployment all exist to answer that honestly.',
      'A clinical ECG and a gravitational-wave detector could not look more different. One is a few seconds of millivolts from a body. The other is a kilometres-long interferometer listening for spacetime to ripple. Yet both spend almost all of their time measuring noise, and both succeed or fail on the same craft: separating a faint, structured thing from a loud, formless background.',
      'The toolkit overlaps more than people expect. Matched filtering, denoising, time-frequency representations, anomaly detection, and increasingly learned models that fold all of this into one end-to-end system. Change the units and a surprising amount transfers.',
      'I came to this from neuroscience and biomedical signals, but the methods point outward. The plan is to keep following them, toward larger data, fainter signals, and the parts of astronomy and astrophysics that have been refining detection in noise for decades.',
      '(Early draft. Notes more than essay.)',
    ],
  },
]
