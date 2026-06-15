import type { GlobalBeforeChangeHook } from 'payload'
import { deduplicateHomepageImagesSafe } from '@/lib/clone-media'

export const deduplicateHomepageImagesHook: GlobalBeforeChangeHook = async ({
  data,
  req,
}) => {
  if (!data || typeof data !== 'object') return data
  try {
    return await deduplicateHomepageImagesSafe(req.payload, data as Record<string, unknown>)
  } catch (error) {
    console.error('Homepage image deduplication failed', error)
    return data
  }
}
