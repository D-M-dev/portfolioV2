/**
 * Central content configuration for the portfolio.
 * Edit this file to update profile, projects, videos, skills, experience and
 * contact details. Everything here is treated as a CMS-style source of truth.
 */

export type Project = {
  title: string
  description: string
  /** Short one-liner used on the card */
  summary: string
  thumbnail: string
  screenshots: string[]
  /** Optional embedded video (YouTube/Vimeo embed URL or mp4 path) */
  video?: string
  technologies: string[]
  duration: string
  teamSize: string
  github?: string
  roblox?: string
  link?: string
}

export type VideoItem = {
  title: string
  description: string
  /** YouTube/Vimeo embed url OR a path to an .mp4 file */
  source: string
  type: 'youtube' | 'vimeo' | 'mp4'
  poster?: string
  stack: string[]
  notes?: string
}

export type SkillGroup = {
  category: string
  skills: string[]
}

export type ExperienceItem = {
  role: string
  org: string
  type: 'Studio' | 'Freelance' | 'Personal'
  period: string
  description: string
  highlights: string[]
}

export type ContactLink = {
  label: string
  value: string
  href: string
  kind: 'discord' | 'github' | 'roblox' | 'email'
}

export type RobloxGameConfig = {
  /** Game link from Roblox (e.g., https://www.roblox.com/games/16897965419/Czech-Realm-RP) */
  link: string
  /** Custom description override */
  description?: string
}

export const profile = {
  name: 'Taco_System',
  roles: ['Roblox Luau Programmer', 'Gameplay Systems Developer'],
  tagline:
    'Heyho so, mainly doing nerd stuff, mainly working on RP games and love open source stuff.',
  about:
    'I am a Roblox developer focused on engineering robust gameplay systems and clean, maintainable architecture. I care about performance, networking correctness and developer experience — shipping experiences that scale to thousands of concurrent players without breaking.',
  yearsExperience: 3,
  location: 'Remote',
  rbxUsername: 'el_tacosg',
  githubUsername: 'D-M-dev',
}

export const aboutHighlights: { title: string; description: string }[] = [
  {
    title: 'Luau',
    description:
      'Strict typing, OOP, clean modules. Built for scaling projects, not spaghettiiiiiiiiiiii.',
  },
  {
    title: 'Architecture',
    description:
      'Services, controllers, data systems',
  },
  {
    title: 'Optimization',
    description:
      'Profiling, batching, memory-aware code. Less lag, happier servers and happier players and happier developers.:)',
  },
  {
    title: 'Multiplayer',
    description:
      'server-authoritative systems, replication, anti-exploit and networking.',
  },
  {
    title: 'UI',
    description:
      'Used Fusion before. Currently building everything with my own framework, Luix.',
  },
  {
    title: 'Workflow',
    description:
      'Mostly Argon. Picking up new tools is never an issue.',
  },
]

/** Roblox games to display - add game links here and customize descriptions */
export const robloxGames: RobloxGameConfig[] = [
  {
    link: 'https://www.roblox.com/games/16897965419/Czech-Realm-RP',
    description: 'Working on new RP systems such as custom vehicle framework, ui frameworks. Also helping with building and optimizing map.',
  },
    {
    link: 'https://www.roblox.com/games/16841862338/Senec-County-Slovakia',
    description: 'Working on new RP systems such as custom vehicle framework, ui frameworks. Also helping with building and optimizing map.',
  },
  {
    link: 'https://www.roblox.com/games/123401539790627/PRESSURE-CLICK',
    description: 'Just testing with luix here..',
  },
    {
    link: 'https://www.roblox.com/games/94346067098235/Extreme-Brainrot-Disasters',
    description: 'Worked on back end - profilestore etc.',
  },
]

export const projects: Project[] = [
  {
    title: 'Actor-based-system',
    summary: 'strict-typed actor-based backend',
    description:
      'trict-typed actor-based backend framework for Roblox with mailboxes, supervision, worker pools and async request/response.',
    thumbnail: '/projects/Actor.png',
    screenshots: [
      '/projects/Actor1.png',
    ],
    technologies: ['Luau', 'Roblox Studio', 'Argon'],
    duration: '1 months',
    teamSize: 'solo :)',
    github: 'ttps://github.com/D-M-dev/Actor-based-system',
  },
  {
    title: 'Luix-Ui Framework',
    summary: 'A modular, React-inspired UI framework',
    description:
      'A modular, React-inspired UI framework. Also my my remake of Plums Minimap is using luix -> https://github.com/D-M-dev/Czech-Realm-Framework/tree/main',
    thumbnail: '/projects/Luix.png',
    screenshots: [
      '/projects/Luix1.png',
    ],
    technologies: ['Luau', 'Networking', 'Optimization', 'Argon',"Knit"],
    duration: '1 months',
    teamSize: 'Solo',
    github: 'https://github.com/D-M-dev/Enhanced-Plums-Minimap',
  },
  {
    title: 'Czech-Realm-Framework',
    summary: 'Lightweight framework introduced in Czech Realm RP',
    description:
      'Lightweight framework introduced in Czech Realm RP - https://www.roblox.com/games/16897965419/Czech-Realm-RP, collection of modules and systems for + 50 ccu players RP game (handling back end etc.¨)',
    thumbnail: '/projects/Knit.png',
    screenshots: [
      '/projects/asda.png',
    ],
    technologies: ['Luau', 'DataStore', 'Game Systems', 'UI',"Knit","Luix","Argon"],
    duration: '1 months',
    teamSize: '2 developers',
    github: 'https://github.com/D-M-dev/Czech-Realm-Framework',
  },
]

export const videos: VideoItem[] = [
]

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    skills: ['Luau', 'TypeScript', 'JavaScript'],
  },
  {
    category: 'Game Development',
    skills: ['Roblox Studio', 'Game Systems', 'Networking', 'Optimization'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Argon/rojo', 'VS Code', "fusion/Roact/Luix"],
  },
]

export const experience: ExperienceItem[] = [
  {
    role: 'Working on RP games mainly, in free time doing open source stuff',
    org: 'Czech-Realm-RP',
    type: 'Studio',
    period: '2025 — Present',
    description:
      'Contributing',
    highlights: [
      'Mainly Building',
    ],
  },
  {
    role: 'Exploring Roblox Development',
    org: 'Czech Realm RP',
    type: 'Studio',
    period: '2023 — 2025',
    description:
      'Contributing - Mainly building',
    highlights: [
      'Learned basics in blender (donut tutorial, who knows know : ), ah time flys so fast!',
    ],
  },
]

export const contactLinks: ContactLink[] = [
  {
    label: 'Discord',
    value: 'taco_system',
    href: 'https://discord.com/users/taco_system',
    kind: 'discord',
  },
  {
    label: 'GitHub',
    value: 'D-M-dev',
    href: 'https://github.com/D-M-dev',
    kind: 'github',
  },
  {
    label: 'Roblox',
    value: 'Taco_System',
    href: 'https://www.roblox.com/users/profile?username=el_tacosg',
    kind: 'roblox',
  },
]
