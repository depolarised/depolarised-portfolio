import type { Metadata } from 'next'
import { profile } from '@/content/profile'
import { links } from '@/content/links'
import { PageHeader } from '@/components/ui/PageHeader'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Publications from '@/components/sections/Publications'
import Contact from '@/components/sections/Contact'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export const metadata: Metadata = {
  title: 'About',
  description: profile.summary,
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="About"
        titleJa="自己紹介"
        description={profile.tagline}
      />

      <section className="py-20 md:py-28">
        <div className="section-container max-w-3xl">
          {profile.bio.map((para, i) => (
            <p
              key={i}
              className={cn(
                'leading-relaxed',
                i === 0
                  ? 'font-display text-h2 text-ink'
                  : 'mt-6 text-body-lg text-haze',
              )}
            >
              {para}
            </p>
          ))}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={profile.resumeUrl} variant="primary" withArrow>
              Download CV
            </Button>
            <Button href={links.github} variant="secondary" withArrow>
              GitHub
            </Button>
          </div>
        </div>
      </section>

      <Skills index="01" />
      <Experience index="02" />
      <Publications index="03" />
      <Contact index="04" />
    </>
  )
}
