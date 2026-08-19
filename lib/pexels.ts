const PEXELS_API_KEY = process.env.PEXELS_API_KEY || process.env.NEXT_PUBLIC_PEXELS_API_KEY

export interface PexelsPhoto {
  id: number
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
  }
  alt: string
  photographer: string
  avg_color: string
}

export async function searchPexels(
  query: string,
  perPage: number = 6,
  orientation: 'landscape' | 'portrait' | 'square' = 'landscape'
): Promise<PexelsPhoto[]> {
  if (!PEXELS_API_KEY) {
    console.warn('PEXELS_API_KEY not set')
    return []
  }

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=${orientation}`,
    {
      headers: { Authorization: PEXELS_API_KEY },
      next: { revalidate: 86400 },
    }
  )

  if (!res.ok) return []
  const data = await res.json()
  return data.photos ?? []
}

export function pexelsUrl(
  photo: PexelsPhoto,
  size: 'large2x' | 'large' | 'medium' = 'large'
): string {
  return photo.src[size]
}
