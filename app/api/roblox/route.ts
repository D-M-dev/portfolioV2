import { NextResponse } from 'next/server'
import { robloxGames } from '@/lib/portfolio-config'

export const revalidate = 3600

export type RobloxGame = {
  id: number
  name: string
  description: string
  playing: number
  visits: number
  favorites: number
  icon: string | null
  link: string
}

function extractPlaceId(link: string): number | null {
  const match = link.match(/\/games\/(\d+)/)
  return match ? parseInt(match[1], 10) : null
}

const FALLBACK_GAMES: RobloxGame[] = [
  {
    id: 16897965419,
    name: 'Czech-Realm-RP',
    description:
      'Working on new RP systems such as custom vehicle framework, ui frameworks. Also helping with building and optimizing map.',
    playing: 124,
    visits: 1840000,
    favorites: 38200,
    icon: null,
    link: 'https://www.roblox.com/games/16897965419/Czech-Realm-RP',
  },
  {
    id: 16841862338,
    name: 'Senec County Slovakia',
    description:
      'Working on new RP systems such as custom vehicle framework, ui frameworks. Also helping with building and optimizing map.',
    playing: 45,
    visits: 520000,
    favorites: 12100,
    icon: null,
    link: 'https://www.roblox.com/games/16841862338/Senec-County-Slovakia',
  },
  {
    id: 123401539790627,
    name: 'PRESSURE-CLICK',
    description: 'Just testing with luix here..',
    playing: 12,
    visits: 15000,
    favorites: 340,
    icon: null,
    link: 'https://www.roblox.com/games/123401539790627/PRESSURE-CLICK',
  },
]

async function getUniverseId(placeId: number): Promise<number | null> {
  try {
    const res = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
      {
        next: { revalidate: 3600 },
      },
    )

    if (!res.ok) return null

    const data = await res.json()

    return data.universeId ?? null
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const placeIds = robloxGames
      .map(g => extractPlaceId(g.link))
      .filter((id): id is number => id !== null)

    if (!placeIds.length) {
      return NextResponse.json({
        games: FALLBACK_GAMES,
        source: 'fallback',
      })
    }

    const universeIds = (
      await Promise.all(placeIds.map(getUniverseId))
    ).filter((id): id is number => id !== null)

    if (!universeIds.length) {
      return NextResponse.json({
        games: FALLBACK_GAMES,
        source: 'fallback',
      })
    }

    const gamesRes = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeIds.join(',')}`,
      {
        next: { revalidate: 3600 },
      },
    )

    if (!gamesRes.ok) {
      return NextResponse.json({
        games: FALLBACK_GAMES,
        source: 'fallback',
      })
    }

    const gamesData = await gamesRes.json()

    const iconsRes = await fetch(
      `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIds.join(
        ',',
      )}&size=512x512&format=Png&isCircular=false`,
      {
        next: { revalidate: 3600 },
      },
    )

    const iconsData = iconsRes.ok ? await iconsRes.json() : { data: [] }

    const iconMap = new Map<number, string>(
      (iconsData.data ?? []).map(
        (icon: { targetId: number; imageUrl: string }) => [
          icon.targetId,
          icon.imageUrl,
        ],
      ),
    )

    const games: RobloxGame[] = (gamesData.data ?? []).map(
      (game: {
        id: number
        universeId: number
        name: string
        description: string
        playing: number
        visits: number
        favoritedCount: number
        rootPlaceId: number
      }) => {
        const configuredGame = robloxGames.find(
          g => extractPlaceId(g.link) === game.rootPlaceId,
        )

        return {
          id: game.rootPlaceId,
          name: game.name,
          description:
            configuredGame?.description ?? game.description ?? '',
          playing: game.playing ?? 0,
          visits: game.visits ?? 0,
          favorites: game.favoritedCount ?? 0,
          icon: iconMap.get(game.id) ?? null,
          link:
            configuredGame?.link ??
            `https://www.roblox.com/games/${game.rootPlaceId}`,
        }
      },
    )

    return NextResponse.json({
      games: games.length ? games : FALLBACK_GAMES,
      source: games.length ? 'live' : 'fallback',
    })
  } catch {
    return NextResponse.json({
      games: FALLBACK_GAMES,
      source: 'fallback',
    })
  }
}