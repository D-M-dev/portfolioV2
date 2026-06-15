import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { skillGroups } from '@/lib/portfolio-config'

export function Skills() {
  return (
    <section
      id="skills"
      className="border-y border-border bg-card/30 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <SectionHeading
          index="06"
          title="Skills"
          description="The languages, disciplines and tools I work with day to day."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {group.category}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="size-1.5 rounded-full bg-foreground" />
                      {skill}
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
