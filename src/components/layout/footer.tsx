import Link from 'next/link'
import type { FooterContent } from '@/lib/cms-globals'
import type { SiteLogo } from '@/lib/site-branding'
import { SiteLogoImage } from '@/components/layout/site-logo'

interface FooterProps {
  logo: SiteLogo
  content: FooterContent
}

function FooterLinkItem({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-gray-300/90 hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  )
}

export function Footer({ logo, content }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const { companyDescription, contact, services, aboutLinks, legalLinks, disclaimer } = content

  return (
    <footer className="bg-dark-blue text-soft-white">
      <div className="container mx-auto max-w-screen-desktop px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <SiteLogoImage logo={logo} className="w-48 lg:w-56 h-auto" />
            </Link>
            <p className="mt-2 text-sm text-gray-300/90 max-w-xs">
              {companyDescription}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold tracking-wide text-white mb-4">
              Služby
            </h3>
            <ul className="space-y-2">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.title}>
                    {service.href ? (
                      <Link href={service.href} className="text-sm text-gray-300/90 hover:text-white transition-colors">
                        {service.title}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-300/90">{service.title}</span>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400">Žádné služby v administraci.</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold tracking-wide text-white mb-4">
              O nás
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <FooterLinkItem key={`${link.href}-${link.label}`} label={link.label} href={link.href} />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold tracking-wide text-white mb-4">
              Kontakt
            </h3>
            <address className="not-italic space-y-2">
              <p className="text-sm text-gray-300/90">
                <strong className="font-medium text-white">{contact.companyName}</strong>
              </p>
              <p className="text-sm text-gray-300/90">
                {contact.street}<br />
                {contact.city}
              </p>
              <p className="text-sm text-gray-300/90 pt-2">
                <Link href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  Tel: {contact.phone}
                </Link>
              </p>
              <p className="text-sm text-gray-300/90">
                <Link href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  Email: {contact.email}
                </Link>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-screen-desktop px-4 py-6 sm:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-400">
            © {currentYear} {disclaimer.copyright} IČ: {disclaimer.ic}, DIČ: {disclaimer.dic}
          </p>
          <div className="flex flex-wrap gap-5 mt-3 md:mt-0">
            {legalLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-xs text-gray-400 hover:text-soft-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
