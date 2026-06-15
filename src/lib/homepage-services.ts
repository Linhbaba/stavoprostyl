export interface FooterServiceLink {
  title: string
  href?: string
}

export interface HomepageServiceItem extends FooterServiceLink {
  description?: string
  image?: { url: string; alt?: string }
  accentColor: string
}

function pageSlug(page: unknown): string | undefined {
  if (!page || typeof page !== 'object') return undefined
  const slug = (page as Record<string, unknown>).slug
  return typeof slug === 'string' && slug.trim() ? slug.trim() : undefined
}

function mediaObj(media: unknown): { url: string; alt?: string } | undefined {
  if (!media || typeof media !== 'object') return undefined
  const m = media as Record<string, unknown>
  const url = typeof m.url === 'string' ? m.url : ''
  if (!url) return undefined
  return { url, alt: (m.alt as string) || undefined }
}

export function parseHomepageServiceItems(homepage: unknown): HomepageServiceItem[] {
  const services = (homepage as Record<string, unknown> | null)?.services as
    | Record<string, unknown>
    | undefined
  const items = services?.items
  if (!Array.isArray(items)) return []

  return items
    .map((item): HomepageServiceItem | null => {
      if (!item || typeof item !== 'object') return null
      const record = item as Record<string, unknown>
      const title = typeof record.title === 'string' ? record.title.trim() : ''
      if (!title) return null
      const slug = pageSlug(record.page)
      return {
        title,
        description: (record.description as string) || undefined,
        image: mediaObj(record.image),
        href: slug ? `/${slug}` : undefined,
        accentColor: (record.accentColor as string) || 'blue',
      }
    })
    .filter((item): item is HomepageServiceItem => item !== null)
}

export function parseHomepageServices(homepage: unknown): FooterServiceLink[] {
  return parseHomepageServiceItems(homepage).map(({ title, href }) => ({ title, href }))
}
