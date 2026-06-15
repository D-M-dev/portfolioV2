'use client'

import useSWR from 'swr'
import { ArrowUpRight, GitFork, Star } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { fetcher, formatCompact } from '@/lib/fetcher'
import { profile } from '@/lib/portfolio-config'
import type { GitHubStats } from '@/app/api/github/route'

export function GithubSection() {
  const { data, isLoading } = useSWR<GitHubStats>('/api/github', fetcher, {
    revalidateOnFocus: false,
  })

  const stats = [
    { label: 'Public Repos', value: data?.user?.publicRepos ?? 0 },
    { label: 'Total Stars', value: data?.totalStars ?? 0 },
    { label: 'Followers', value: data?.user?.followers ?? 0 },
    { label: 'Languages', value: data?.languages.length ?? 0 },
  ]

  const maxLang = Math.max(1, ...(data?.languages.map((l) => l.count) ?? [1]))

  return (
    <section
      id="github"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32"
    >
      <SectionHeading
        index="05"
        title="GitHub Activity"
        description="Open-source work and repositories, pulled live from the GitHub API."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {/* Stats + languages */}
        <Reveal className="lg:col-span-1">
          <div className="flex h-full flex-col gap-6 rounded-xl border border-border bg-card p-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                @{profile.githubUsername}
              </p>
              {data?.user?.bio ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {data.user.bio}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-border bg-background/50 p-3"
                >
                  <div className="text-2xl font-semibold tabular-nums">
                    {isLoading ? '—' : formatCompact(s.value)}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {data?.languages.length ? (
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Languages
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {data.languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="flex items-center justify-between text-xs">
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground tabular-nums">
                          {lang.count}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background">
                        <div
                          className="h-full rounded-full bg-foreground/80"
                          style={{ width: `${(lang.count / maxLang) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <Button
              variant="outline"
              size="sm"
              className="mt-auto"
              nativeButton={false}
              render={
                <a
                  href={data?.user?.url ?? `https://github.com/${profile.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              View profile
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </Reveal>

        {/* Repos */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-xl border border-border bg-card"
                />
              ))
            : data?.repos.map((repo, i) => (
                <Reveal key={repo.name} delay={i * 0.05}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-muted-foreground/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-mono text-sm font-medium">{repo.name}</h3>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {repo.description ?? 'No description provided.'}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      {repo.language ? (
                        <span className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-foreground/60" />
                          {repo.language}
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1 tabular-nums">
                        <Star className="size-3.5" />
                        {formatCompact(repo.stars)}
                      </span>
                      <span className="flex items-center gap-1 tabular-nums">
                        <GitFork className="size-3.5" />
                        {formatCompact(repo.forks)}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  )
}
