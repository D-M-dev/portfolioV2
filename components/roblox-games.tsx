'use client'

import useSWR from 'swr'
import Image from 'next/image'
import { ArrowUpRight, Heart, Users, Eye } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { fetcher, formatCompact } from '@/lib/fetcher'
import type { RobloxGame } from '@/app/api/roblox/route'

// Description overrides keyed by game name (manual editing support).
const descriptionOverrides: Record<string, string> = {}

type Response = { games: RobloxGame[]; source: 'live' | 'fallback' }

export function RobloxGames() {
  const { data, isLoading } = useSWR<Response>('/api/roblox', fetcher, {
    revalidateOnFocus: false,
  })

  const games = data?.games ?? []

  return (
    <section
      id="roblox"
      className="border-y border-border bg-card/30 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <SectionHeading
          index="03"
          title="Roblox Games"
          description="My games or games that I have worked on. Click to view on Roblox."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-xl border border-border bg-card"
                />
              ))
            : games.map((game, i) => (
                <Reveal key={game.id} delay={i * 0.06}>
                  <a
                    href={game.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-muted-foreground/40"
                  >
                    <div className="relative aspect-square overflow-hidden bg-background">
                      {game.icon ? (
                        <Image
                          src={game.icon || '/placeholder.svg'}
                          alt={`${game.name} icon`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-grid">
                          <span className="font-mono text-3xl font-semibold text-muted-foreground">
                            {game.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-medium">{game.name}</h3>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {descriptionOverrides[game.name] ||
                          game.description ||
                          'A Roblox experience by Taco_System.'}
                      </p>
                      <div className="mt-auto grid grid-cols-3 gap-2 pt-5">
                        <Stat
                          icon={<Users className="size-3.5" />}
                          value={formatCompact(game.playing)}
                          label="Playing"
                        />
                        <Stat
                          icon={<Eye className="size-3.5" />}
                          value={formatCompact(game.visits)}
                          label="Visits"
                        />
                        <Stat
                          icon={<Heart className="size-3.5" />}
                          value={formatCompact(game.favorites)}
                          label="Favorites"
                        />
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  )
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: string
  label: string
}) {
  return (
    <div className="rounded-lg border border-border bg-background/50 px-2 py-2 text-center">
      <div className="flex items-center justify-center gap-1 text-muted-foreground">
        {icon}
      </div>
      <div className="mt-1 text-sm font-medium tabular-nums">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  )
}
