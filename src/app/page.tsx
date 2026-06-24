import Hero from '@/components/sections/Hero'
import SelectedWork from '@/components/sections/SelectedWork'
import Capabilities from '@/components/sections/Capabilities'
import Contact from '@/components/sections/Contact'
import { workItems } from '@/content/work'

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork
        index="01"
        items={workItems.slice(0, 3)}
        withViewAll
        description="A few things I’ve built — signal analysis at clinical scale, learned reconstruction, and interpretable models."
      />
      <Capabilities index="02" />
      <Contact index="03" />
    </>
  )
}
