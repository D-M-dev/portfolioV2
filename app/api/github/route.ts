import { NextResponse } from 'next/server'
import { profile } from '@/lib/portfolio-config'

export const revalidate = 3600

export type GitHubRepo = {
  name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language: string | null
  updatedAt: string
}

export type GitHubStats = {
  user: {
    name: string | null
    login: string
    avatar: string
    bio: string | null
    followers: number
    following: number
    publicRepos: number
    url: string
  } | null
  repos: GitHubRepo[]
  languages: { name: string; count: number }[]
  totalStars: number
  source: 'live' | 'fallback'
}

const FALLBACK: GitHubStats = {
  user: {
    name: 'Taco_System',
    login: profile.githubUsername,
    avatar: '',
    bio: 'Roblox Luau programmer building scalable gameplay systems.',
    followers: 128,
    following: 32,
    publicRepos: 24,
    url: `https://github.com/${profile.githubUsername}`,
  },
  repos: [
    {
      name: 'luau-systems-framework',
      description: 'A typed service/controller framework for large Roblox games.',
      url: `https://github.com/${profile.githubUsername}`,
      stars: 142,
      forks: 18,
      language: 'Luau',
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'replication-toolkit',
      description: 'Interest management and streaming utilities for open worlds.',
      url: `https://github.com/${profile.githubUsername}`,
      stars: 96,
      forks: 11,
      language: 'Luau',
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'inventory-economy',
      description: 'Data-driven inventory, trading and economy module.',
      url: `https://github.com/${profile.githubUsername}`,
      stars: 74,
      forks: 9,
      language: 'TypeScript',
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'rojo-template',
      description: 'Opinionated Rojo + Git project template with CI checks.',
      url: `https://github.com/${profile.githubUsername}`,
      stars: 53,
      forks: 7,
      language: 'TypeScript',
      updatedAt: new Date().toISOString(),
    },
  ],
  languages: [
    { name: 'Luau', count: 12 },
    { name: 'TypeScript', count: 7 },
    { name: 'JavaScript', count: 3 },
    { name: 'Lua', count: 2 },
  ],
  totalStars: 365,
  source: 'fallback',
}

export async function GET() {
  const username = profile.githubUsername
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-app',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!userRes.ok) throw new Error('user fetch failed')
    const u = await userRes.json()

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } },
    )
    if (!reposRes.ok) throw new Error('repos fetch failed')
    const reposRaw: {
      name: string
      description: string | null
      html_url: string
      stargazers_count: number
      forks_count: number
      language: string | null
      updated_at: string
      fork: boolean
    }[] = await reposRes.json()

    const owned = reposRaw.filter((r) => !r.fork)

    const repos: GitHubRepo[] = owned
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        updatedAt: r.updated_at,
      }))
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 6)

    const langCount = new Map<string, number>()
    for (const r of owned) {
      if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1)
    }
    const languages = [...langCount.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    const totalStars = owned.reduce((sum, r) => sum + r.stargazers_count, 0)

    const stats: GitHubStats = {
      user: {
        name: u.name,
        login: u.login,
        avatar: u.avatar_url,
        bio: u.bio,
        followers: u.followers,
        following: u.following,
        publicRepos: u.public_repos,
        url: u.html_url,
      },
      repos,
      languages,
      totalStars,
      source: 'live',
    }

    return NextResponse.json(stats)
  } catch {
    return NextResponse.json(FALLBACK)
  }
}
