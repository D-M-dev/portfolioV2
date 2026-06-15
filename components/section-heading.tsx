import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  index: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({
  index,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-muted-foreground">
            {index}
          </span>
          <span className="h-px w-10 bg-border" aria-hidden="true" />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
