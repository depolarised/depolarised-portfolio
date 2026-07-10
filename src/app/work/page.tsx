import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import SelectedWork from '@/components/sections/SelectedWork'
import Projects from '@/components/sections/Projects'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected work in signal processing, deep learning, and large-scale data systems, from a clinical ECG program to learned image reconstruction.',
}

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Work"
        title="Work"
        titleJa="仕事"
        description="Case studies in signal, learning, and scale, plus the open-source tools around them."
      />
      <SelectedWork index="01" withHeader={false} />
      <Projects index="02" />
    </>
  )
}
