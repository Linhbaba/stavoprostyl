import type { Payload } from 'payload'

interface MediaRecord {
  id: number
  alt?: string | null
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
}

function resolveMediaUrl(url: string): string {
  if (url.startsWith('http')) return url
  const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || ''
  return `${base}${url}`
}

export async function cloneMedia(payload: Payload, mediaId: number): Promise<number> {
  const original = (await payload.findByID({
    collection: 'media',
    id: mediaId,
    depth: 0,
  })) as MediaRecord

  if (!original?.url) {
    throw new Error(`Media ${mediaId} not found`)
  }

  const response = await fetch(resolveMediaUrl(original.url))
  if (!response.ok) {
    throw new Error(`Failed to fetch media ${mediaId}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const newDoc = await payload.create({
    collection: 'media',
    data: { alt: original.alt || 'Kopie obrázku' },
    file: {
      data: buffer,
      name: original.filename || `copy-${mediaId}.webp`,
      mimetype: original.mimeType || 'image/webp',
      size: buffer.length,
    },
  })

  return newDoc.id as number
}

function toMediaId(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  if (value && typeof value === 'object') {
    const id = (value as Record<string, unknown>).id
    if (typeof id === 'number' && Number.isFinite(id)) return id
    if (typeof id === 'string' && id.trim() !== '') {
      const parsed = Number(id)
      return Number.isFinite(parsed) ? parsed : null
    }
  }
  return null
}

interface ImageSlot {
  set: (id: number) => void
  get: () => unknown
}

function collectHomepageImageSlots(data: Record<string, unknown>): ImageSlot[] {
  const slots: ImageSlot[] = []

  const hero = data.hero as Record<string, unknown> | undefined
  const slides = hero?.slides
  if (Array.isArray(slides)) {
    slides.forEach((slide) => {
      if (!slide || typeof slide !== 'object') return
      const record = slide as Record<string, unknown>
      if (!('image' in record)) return
      slots.push({
        get: () => record.image,
        set: (id) => { record.image = id },
      })
    })
  }

  const services = data.services as Record<string, unknown> | undefined
  const items = services?.items
  if (Array.isArray(items)) {
    items.forEach((item) => {
      if (!item || typeof item !== 'object') return
      const record = item as Record<string, unknown>
      if (!('image' in record)) return
      slots.push({
        get: () => record.image,
        set: (id) => { record.image = id },
      })
    })
  }

  const about = data.about as Record<string, unknown> | undefined
  if (about && 'image' in about) {
    slots.push({
      get: () => about.image,
      set: (id) => { about.image = id },
    })
  }

  return slots
}

export async function deduplicateHomepageImages(
  payload: Payload,
  data: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  return deduplicateHomepageImagesSafe(payload, data)
}

export async function deduplicateHomepageImagesSafe(
  payload: Payload,
  data: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const slots = collectHomepageImageSlots(data)
  const seen = new Map<number, number>()

  for (const slot of slots) {
    const mediaId = toMediaId(slot.get())
    if (!mediaId) continue

    if (!seen.has(mediaId)) {
      seen.set(mediaId, mediaId)
      continue
    }

    try {
      const clonedId = await cloneMedia(payload, mediaId)
      slot.set(clonedId)
      seen.set(clonedId, clonedId)
    } catch (error) {
      console.error(`Failed to clone media ${mediaId} for homepage deduplication`, error)
    }
  }

  return data
}
