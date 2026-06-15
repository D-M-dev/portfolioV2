"use client"

import { ArrowUpRight, Code2, MessageCircle, Gamepad2 } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { contactLinks, type ContactLink } from '@/lib/portfolio-config'

const iconFor = (kind: ContactLink['kind']) => {
  switch (kind) {
    case 'discord':
      return <MessageCircle className="size-4" />
    case 'github':
      return <Code2 className="size-4" />
    case 'roblox':
      return <Gamepad2 className="size-4" />
    default:
      return <ArrowUpRight className="size-4" />
  }
}

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32"
    >
      <SectionHeading
        index="08"
        title="Get in touch"
        description="Have a project, a role, or a system that needs building? Reach out through any channel below."
      />

      <div className="mt-12">
        <Reveal>
          <div className="flex flex-col gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-muted-foreground/40"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                    {iconFor(link.kind)}
                  </span>
                  <div>
                    <div className="text-sm font-medium">{link.label}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {link.value}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}


