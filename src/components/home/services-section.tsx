'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

export interface ServiceItem {
  title: string;
  description?: string;
  image?: { url: string; alt?: string };
  link?: string;
  accentColor?: string;
}

export interface ServicesData {
  heading?: string;
  subtitle?: string;
  items?: ServiceItem[];
}

interface ServicesSectionProps {
  data?: ServicesData;
}

const fallbackItems: ServiceItem[] = [
  { title: 'Výstavba na klíč', description: 'Kompletní realizace staveb od projektu až po předání klíčů.', image: { url: '/vystavby_na_klic.jpg' }, link: '/sluzby/vystavba-na-klic', accentColor: 'primary-red' },
  { title: 'Rekonstrukce a renovace', description: 'Oživíme Váš domov. Provádíme rekonstrukce bytů, domů i komerčních prostor.', image: { url: '/rekonstrukce.jpg' }, link: '/sluzby/rekonstrukce', accentColor: 'blue' },
  { title: 'Architektonické návrhy', description: 'Projektová dokumentace a architektonická řešení na míru vašim představám.', image: { url: '/renovace.jpg' }, link: '/sluzby/architektonicke-navrhy', accentColor: 'blue' },
  { title: 'Poradenství a dozor', description: 'Odborné konzultace a stavební dozor pro hladký průběh každé stavby.', image: { url: '/poradenstvi.jpg' }, link: '/sluzby/poradenstvi', accentColor: 'blue' },
];

export function ServicesSection({ data }: ServicesSectionProps) {
  const heading = data?.heading || 'Naše služby';
  const subtitle = data?.subtitle || 'Komplexní stavební služby pro váš domov i komerční prostory';
  const items = data?.items?.length ? data.items : fallbackItems;

  return (
    <section id="sluzby" className="py-16 md:py-24 bg-light-blue">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-blue">{heading}</h2>
          <p className="mt-4 text-lg text-dark-blue/80 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {items.map((service, i) => {
            const isRed = service.accentColor === 'primary-red';
            return (
              <div key={i} className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                {service.image && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={service.image.url}
                      alt={service.image.alt || service.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className={clsx('absolute inset-0', isRed ? 'bg-primary-red/10' : 'bg-blue/10')} />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={clsx('text-xl font-bold font-heading mb-3', isRed ? 'text-primary-red' : 'text-blue')}>
                    {service.title}
                  </h3>
                  <p className="text-dark-blue/80 mb-4 flex-grow">{service.description}</p>
                  {service.link && (
                    <Link
                      href={service.link}
                      className={clsx('font-medium hover:underline mt-auto inline-flex items-center', isRed ? 'text-primary-red' : 'text-blue')}
                    >
                      Více informací
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button href="/sluzby" variant="secondary">Zobrazit všechny služby</Button>
        </div>
      </div>
    </section>
  );
}
