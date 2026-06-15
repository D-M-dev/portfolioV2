import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { profile, aboutHighlights } from '@/lib/portfolio-config'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32">
      <SectionHeading
        index="01"
        title="About"
        description={profile.about}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal className="sm:col-span-2 lg:col-span-1">
          <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Experience
            </span>
            <div className="mt-8">
              <div className="text-5xl font-semibold tracking-tight">
                {profile.yearsExperience}+
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Years building Roblox systems and shipping multiplayer games.
              </p>
            </div>
          </div>
        </Reveal>

        {aboutHighlights.map((h, i) => (
          <Reveal key={h.title} delay={i * 0.05}>
            <div className="h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-muted-foreground/40">
              <h3 className="text-base font-medium">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {h.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
