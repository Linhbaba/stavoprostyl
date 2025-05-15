'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue text-soft-white">
      {/* Hlavní obsah patičky */}
      <div className="container mx-auto max-w-screen-desktop px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          {/* Společnost a logo */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png" 
                alt="Stavopro Styl Logo" 
                width={100} 
                height={100} 
                className="h-auto w-auto"
              />
            </Link>
            <p className="mt-2 text-sm text-gray-300/90 max-w-xs">
              Stavební firma zaměřená na kvalitu, inovace a spokojenost zákazníků. Již více než 15 let realizujeme vaše stavební projekty.
            </p>
          </div>

          {/* Služby */}
          <div>
            <h3 className="font-heading text-lg font-bold tracking-wide text-white mb-4">
              Služby
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sluzby/rekonstrukce" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Rekonstrukce
                </Link>
              </li>
              <li>
                <Link href="/sluzby/novostavby" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Novostavby
                </Link>
              </li>
              <li>
                <Link href="/sluzby/komercni-stavby" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Komerční stavby
                </Link>
              </li>
              <li>
                <Link href="/sluzby/projekce" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Projekce a design
                </Link>
              </li>
              <li>
                <Link href="/sluzby/revitalizace" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Revitalizace objektů
                </Link>
              </li>
            </ul>
          </div>

          {/* Rychlé odkazy */}
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
                <Link href="/reference" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Reference
                </Link>
              </li>
              <li>
                <Link href="/kariera" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Kariéra
                </Link>
              </li>
              <li>
                <Link href="/aktuality" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Aktuality
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-300/90 hover:text-white transition-colors">
                  Časté dotazy
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-heading text-lg font-bold tracking-wide text-white mb-4">
              Kontakt
            </h3>
            <address className="not-italic space-y-2">
              <p className="text-sm text-gray-300/90">
                <strong className="font-medium text-white">Stavopro Styl s.r.o.</strong>
              </p>
              <p className="text-sm text-gray-300/90">
                Stavební 1234/5<br />
                123 45 Praha
              </p>
              <p className="text-sm text-gray-300/90 pt-2">
                <Link href="tel:+420777888999" className="hover:text-white transition-colors">
                  Tel: +420 777 888 999
                </Link>
              </p>
              <p className="text-sm text-gray-300/90">
                <Link href="mailto:info@stavoprostyl.cz" className="hover:text-white transition-colors">
                  Email: info@stavoprostyl.cz
                </Link>
              </p>
              <div className="flex space-x-4 pt-3">
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300/90 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300/90 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300/90 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Spodní lišta s copyrightem a odkazy */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-screen-desktop px-4 py-6 sm:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-400">
            © {currentYear} Stavopro Styl s.r.o. Všechna práva vyhrazena. IČ: 12345678, DIČ: CZ12345678
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
  );
} 