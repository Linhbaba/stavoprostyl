import Image from 'next/image'
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
  isSvgUrl,
  type SiteLogo,
} from '@/lib/site-branding'

interface SiteLogoImageProps {
  logo: SiteLogo
  className?: string
  priority?: boolean
}

export function SiteLogoImage({ logo, className, priority }: SiteLogoImageProps) {
  return (
    <Image
      src={logo.url}
      alt={logo.alt}
      width={logo.width || DEFAULT_LOGO_WIDTH}
      height={logo.height || DEFAULT_LOGO_HEIGHT}
      className={className}
      priority={priority}
      unoptimized={isSvgUrl(logo.url)}
      sizes="(max-width: 1024px) 192px, 256px"
    />
  )
}
