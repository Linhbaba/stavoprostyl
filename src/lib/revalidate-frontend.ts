import { revalidatePath, revalidateTag } from 'next/cache'

export const GLOBAL_SITE_SETTINGS_TAG = 'global-site-settings'
export const GLOBAL_FOOTER_TAG = 'global-footer'
export const GLOBAL_HOMEPAGE_TAG = 'global-homepage'

export function revalidateSiteBranding() {
  revalidatePath('/', 'layout')
  revalidateTag(GLOBAL_SITE_SETTINGS_TAG)
  revalidateTag(GLOBAL_FOOTER_TAG)
}

export function revalidateHomepageMeta() {
  revalidateTag(GLOBAL_HOMEPAGE_TAG)
  revalidatePath('/', 'layout')
  revalidateTag(GLOBAL_FOOTER_TAG)
}
