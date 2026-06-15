function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

export interface ResolvedMedia {
  url: string
  alt?: string
  width?: number
  height?: number
}

export function resolveMedia(media: unknown): ResolvedMedia | null {
  if (!media || typeof media === 'number') return null
  if (typeof media !== 'object') return null

  const m = media as Record<string, unknown>
  const url = typeof m.url === 'string' ? m.url.trim() : ''
  if (!url) return null

  return {
    url,
    alt: typeof m.alt === 'string' && m.alt.trim() ? m.alt.trim() : undefined,
    width: toNumber(m.width),
    height: toNumber(m.height),
  }
}
