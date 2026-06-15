'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile } from '@/lib/portfolio-config'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Animated background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid mask-fade-edges opacity-[0.4]" />
        <motion.div
          className="absolute left-1/2 top-1/3 size-[42rem] -translate-x-1/2 rounded-full bg-card/60 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-32">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-foreground" />
              Available for select work
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-8 text-balance text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-muted-foreground sm:text-xl"
          >
            {profile.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                {i > 0 ? (
                  <span className="hidden h-1 w-1 rounded-full bg-muted-foreground sm:inline-block" />
                ) : null}
                {role}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" nativeButton={false} render={<a href="#projects" />}>
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href={`https://github.com/${profile.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Code2 className="size-4" />
              GitHub
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  )
}
