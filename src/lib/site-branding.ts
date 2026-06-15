import { resolveMedia } from '@/lib/media'

export const DEFAULT_LOGO_LIGHT = '/stavoprostyl_light.svg'
export const DEFAULT_LOGO_DARK = '/stavoprostyl_dark.svg'
export const DEFAULT_LOGO_ALT = 'Stavopro Styl Logo'

export const DEFAULT_LOGO_WIDTH = 250
export const DEFAULT_LOGO_HEIGHT = 44

export interface SiteLogo {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface SiteLogos {
  light: SiteLogo
  dark: SiteLogo
}

const FALLBACK_LOGOS: SiteLogos = {
  light: { url: DEFAULT_LOGO_LIGHT, alt: DEFAULT_LOGO_ALT },
  dark: { url: DEFAULT_LOGO_DARK, alt: DEFAULT_LOGO_ALT },
}

export function isSvgUrl(url: string): boolean {
  return /\.svg(\?|#|$)/i.test(url)
}

function toSiteLogo(media: ReturnType<typeof resolveMedia>, alt: string): SiteLogo | null {
  if (!media) return null
  return {
    url: media.url,
    alt: media.alt || alt,
    width: media.width,
    height: media.height,
  }
}

export function resolveLogoVariant(
  primary: SiteLogo | null,
  fallback: SiteLogo | null,
  defaultUrl: string,
  alt: string,
): SiteLogo {
  const source = primary ?? fallback
  if (!source) {
    return { url: defaultUrl, alt }
  }
  return {
    url: source.url,
    alt: source.alt || alt,
    width: source.width,
    height: source.height,
  }
}

export function parseSiteLogos(settings: unknown): SiteLogos {
  try {
    const branding = (settings as Record<string, unknown> | null)?.branding as
      | Record<string, unknown>
      | undefined

    const alt =
      typeof branding?.logoAlt === 'string' && branding.logoAlt.trim()
        ? branding.logoAlt.trim()
        : DEFAULT_LOGO_ALT

    const light = toSiteLogo(resolveMedia(branding?.logoLight), alt)
    const dark = toSiteLogo(resolveMedia(branding?.logoDark), alt)

    return {
      light: resolveLogoVariant(light, dark, DEFAULT_LOGO_LIGHT, alt),
      dark: resolveLogoVariant(dark, light, DEFAULT_LOGO_DARK, alt),
    }
  } catch {
    return FALLBACK_LOGOS
  }
}
