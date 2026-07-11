import LabBackdrop from '@/components/visuals/LabBackdrop'
import Hero from '@/components/sections/Hero'
import SelectedWork from '@/components/sections/SelectedWork'
import Capabilities from '@/components/sections/Capabilities'
import Recognition from '@/components/sections/Recognition'
import Contact from '@/components/sections/Contact'
import { workItems } from '@/content/work'

export default function Home() {
  return (
    <>
      {/* The single canvas: one fixed, anchored ECG ribbon the page scrolls
          over, receding as you go. Everything below sits on it, transparent. */}
      <LabBackdrop recede />
      <Hero />
      <SelectedWork
        index="01"
        items={workItems.slice(0, 3)}
        withViewAll
        description="A few things I’ve built: signal analysis at clinical scale, learned reconstruction, and interpretable models."
      />
      <Capabilities index="02" />
      <Recognition index="03" />
      <Contact index="04" />
    </>
  )
}
