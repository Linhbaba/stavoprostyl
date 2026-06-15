import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'
import { parseSiteLogos, type SiteLogos } from '@/lib/site-branding'
import {
  GLOBAL_FOOTER_TAG,
  GLOBAL_HOMEPAGE_TAG,
  GLOBAL_SITE_SETTINGS_TAG,
} from '@/lib/revalidate-frontend'

const CMS_CACHE_SECONDS = 60

const fetchGlobal = cache(async (slug: string, depth = 1): Promise<unknown> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: slug as 'homepage', depth })
})

function getCachedGlobal(slug: string, tag: string, depth = 1) {
  return unstable_cache(
    () => fetchGlobal(slug, depth),
    [`cms-global-${slug}-d${depth}`],
    { tags: [tag], revalidate: CMS_CACHE_SECONDS },
  )
}

const getCachedSiteSettings = getCachedGlobal('site-settings', GLOBAL_SITE_SETTINGS_TAG)
const getCachedFooter = getCachedGlobal('footer', GLOBAL_FOOTER_TAG)

export async function getSiteLogos(): Promise<SiteLogos> {
  try {
    const settings = await getCachedSiteSettings()
    return parseSiteLogos(settings)
  } catch {
    return parseSiteLogos(null)
  }
}

export interface FooterContent {
  companyDescription: string
  contact: {
    companyName: string
    street: string
    city: string
    phone: string
    email: string
  }
  disclaimer: {
    copyright: string
    ic: string
    dic: string
  }
}

const DEFAULT_FOOTER: FooterContent = {
  companyDescription:
    'Stavební firma zaměřená na kvalitu, inovace a spokojenost zákazníků. Již více než 15 let realizujeme vaše stavební projekty.',
  contact: {
    companyName: 'Stavopro Styl s.r.o.',
    street: 'Stavební 1234/5',
    city: '123 45 Praha',
    phone: '+420 777 888 999',
    email: 'info@stavoprostyl.cz',
  },
  disclaimer: {
    copyright: 'Stavopro Styl s.r.o. Všechna práva vyhrazena.',
    ic: '12345678',
    dic: 'CZ12345678',
  },
}

function asString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export function parseFooterContent(data: unknown): FooterContent {
  const source = (data as Record<string, unknown> | null) ?? {}
  const contact = (source.contact as Record<string, unknown> | undefined) ?? {}
  const disclaimer = (source.disclaimer as Record<string, unknown> | undefined) ?? {}

  return {
    companyDescription: asString(source.companyDescription, DEFAULT_FOOTER.companyDescription),
    contact: {
      companyName: asString(contact.companyName, DEFAULT_FOOTER.contact.companyName),
      street: asString(contact.street, DEFAULT_FOOTER.contact.street),
      city: asString(contact.city, DEFAULT_FOOTER.contact.city),
      phone: asString(contact.phone, DEFAULT_FOOTER.contact.phone),
      email: asString(contact.email, DEFAULT_FOOTER.contact.email),
    },
    disclaimer: {
      copyright: asString(disclaimer.copyright, DEFAULT_FOOTER.disclaimer.copyright),
      ic: asString(disclaimer.ic, DEFAULT_FOOTER.disclaimer.ic),
      dic: asString(disclaimer.dic, DEFAULT_FOOTER.disclaimer.dic),
    },
  }
}

export async function getFooterContent(): Promise<FooterContent> {
  try {
    const footer = await getCachedFooter()
    return parseFooterContent(footer)
  } catch {
    return DEFAULT_FOOTER
  }
}

export async function getHomepageNoindex(): Promise<boolean> {
  try {
    const homepage = await getCachedGlobal('homepage', GLOBAL_HOMEPAGE_TAG)()
    const meta = (homepage as Record<string, unknown> | null)?.meta as
      | Record<string, unknown>
      | undefined
    return meta?.noindex === true
  } catch {
    return false
  }
}
