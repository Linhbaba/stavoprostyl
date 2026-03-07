'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterData {
  companyDescription?: string;
  contact?: {
    companyName?: string;
    street?: string;
    city?: string;
    phone?: string;
    email?: string;
  };
  disclaimer?: {
    copyright?: string;
    ic?: string;
    dic?: string;
  };
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await fetch('/api/globals/footer');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Failed to fetch footer data', error);
      }
    }
    fetchFooter();
  }, []);

  const desc = data?.companyDescription || 'Stavební firma zaměřená na kvalitu, inovace a spokojenost zákazníků. Již více než 15 let realizujeme vaše stavební projekty.';
  const contact = data?.contact || {
    companyName: 'Stavopro Styl s.r.o.',
    street: 'Stavební 1234/5',
    city: '123 45 Praha',
    phone: '+420 777 888 999',
    email: 'info@stavoprostyl.cz',
  };
  const disclaimer = data?.disclaimer || {
    copyright: 'Stavopro Styl s.r.o. Všechna práva vyhrazena.',
    ic: '12345678',
    dic: 'CZ12345678',
  };

  return (
    <footer className="bg-dark-blue text-soft-white">
      {/* Hlavní obsah patičky */}
      <div className="container mx-auto max-w-screen-desktop px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          {/* Společnost a logo */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image 
                src="/stavoprostyl_light.svg" 
                alt="Stavopro Styl Logo" 
                width={250} 
                height={44} 
                className="w-48 lg:w-56 h-auto"
              />
            </Link>
            <p className="mt-2 text-sm text-gray-300/90 max-w-xs">
              {desc}
            </p>
          </div>

          {/* Služby */}
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

          {/* Kontakt */}
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
                <Link href={`tel:${contact.phone?.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
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

      {/* Spodní lišta s copyrightem a odkazy */}
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
  );
} 