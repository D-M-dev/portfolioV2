import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { Badge } from '@/components/ui/badge'
import { experience } from '@/lib/portfolio-config'

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32"
    >
      <SectionHeading
        index="07"
        title="Experience"
        description="A timeline of studio roles, freelance work and personal projects."
      />

      <div className="relative mt-12 pl-8 sm:pl-10">
        <span
          aria-hidden="true"
          className="absolute left-0 top-2 h-full w-px bg-border sm:left-2"
        />
        <div className="flex flex-col gap-10">
          {experience.map((item, i) => (
            <Reveal key={item.role + item.period} delay={i * 0.08}>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-1.5 size-3 rounded-full border border-border bg-foreground sm:-left-[2.1rem]"
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-lg font-medium">{item.role}</h3>
                  <Badge variant="secondary" className="font-mono text-[11px]">
                    {item.type}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                  <span>{item.org}</span>
                  <span className="size-1 rounded-full bg-muted-foreground" />
                  <span className="font-mono text-xs">{item.period}</span>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {item.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
