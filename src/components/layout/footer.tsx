import Link from 'next/link'
import type { FooterContent } from '@/lib/cms-globals'
import type { SiteLogo } from '@/lib/site-branding'
import { SiteLogoImage } from '@/components/layout/site-logo'

interface FooterProps {
  logo: SiteLogo
  content: FooterContent
}

export function Footer({ logo, content }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const { companyDescription, contact, disclaimer } = content

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
              <li>
                <Link href="/vystavba-na-klic" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Výstavba na klíč
                </Link>
              </li>
              <li>
                <Link href="/rekonstrukce" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Rekonstrukce
                </Link>
              </li>
              <li>
                <Link href="/architektonicke-navrhy" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Architektonické návrhy
                </Link>
              </li>
              <li>
                <Link href="/poradenstvi" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Poradenství a dozor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold tracking-wide text-white mb-4">
              O nás
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  O společnosti
                </Link>
              </li>
              <li>
                <Link href="/projekty" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Projekty a reference
                </Link>
              </li>
              <li>
                <Link href="/#kontakt" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
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
          <div className="flex gap-5 mt-3 md:mt-0">
            <Link href="/zasady-ochrany-osobnich-udaju" className="text-xs text-gray-400 hover:text-soft-white transition-colors">
              Ochrana osobních údajů
            </Link>
            <Link href="/obchodni-podminky" className="text-xs text-gray-400 hover:text-soft-white transition-colors">
              Obchodní podmínky
            </Link>
            <Link href="/cookies" className="text-xs text-gray-400 hover:text-soft-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
