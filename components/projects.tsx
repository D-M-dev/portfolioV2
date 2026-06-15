'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Code2, Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { projects, type Project } from '@/lib/portfolio-config'

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const open = active !== null

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32"
    >
      <SectionHeading
        index="02"
        title="Featured Projects"
        description="Selected systems and frameworks I've designed and shipped. Open a project for screenshots, the tech stack and development details."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06}>
            <motion.button
              type="button"
              onClick={() => setActive(project)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-colors hover:border-muted-foreground/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-background">
                <Image
                  src={project.thumbnail || '/placeholder.svg'}
                  alt={`${project.title} thumbnail`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-medium">{project.title}</h3>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="font-mono text-[11px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          {active ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{active.title}</DialogTitle>
                <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                  {active.description}
                </DialogDescription>
              </DialogHeader>

              {active.video ? (
                <div className="mt-2 aspect-video overflow-hidden rounded-lg border border-border">
                  <iframe
                    src={active.video}
                    title={`${active.title} video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : null}

              {active.screenshots.length ? (
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {active.screenshots.map((shot) => (
                    <div
                      key={shot}
                      className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-background"
                    >
                      <Image
                        src={shot || '/placeholder.svg'}
                        alt={`${active.title} screenshot`}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-2 grid grid-cols-2 gap-4 rounded-lg border border-border bg-background/40 p-4 sm:grid-cols-3">
                <Meta icon={<Clock className="size-4" />} label="Duration" value={active.duration} />
                <Meta icon={<Users className="size-4" />} label="Team" value={active.teamSize} />
                <div className="col-span-2 sm:col-span-1">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Tech
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {active.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-mono text-[11px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {active.github || active.link ? (
                <div className="mt-2 flex flex-wrap gap-3">
                  {active.github ? (
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={
                        <a href={active.github} target="_blank" rel="noopener noreferrer" />
                      }
                    >
                      <Code2 className="size-4" />
                      Source
                    </Button>
                  ) : null}
                  {active.link ? (
                    <Button
                      size="sm"
                      nativeButton={false}
                      render={
                        <a href={active.link} target="_blank" rel="noopener noreferrer" />
                      }
                    >
                      Visit
                      <ArrowUpRight className="size-4" />
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-sm">{value}</p>
    </div>
  )
}
