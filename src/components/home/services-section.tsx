'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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
  { title: 'Výstavba na klíč', description: 'Kompletní realizace staveb od projektu až po předání klíčů. Od první konzultace až po kolaudaci jsme s vámi. Naše zkušenosti zaručují hladký průběh a dodržení termínů.', image: { url: '/api/media/file/vystavby_na_klic.webp' }, link: '/sluzby/vystavba-na-klic', accentColor: 'primary-red' },
  { title: 'Rekonstrukce a renovace', description: 'Oživíme Váš domov. Provádíme rekonstrukce bytů, domů i komerčních prostor. Klademe důraz na detail a moderní materiály.', image: { url: '/api/media/file/rekonstrukce.webp' }, link: '/sluzby/rekonstrukce', accentColor: 'blue' },
  { title: 'Architektonické návrhy', description: 'Projektová dokumentace a architektonická řešení na míru vašim představám. Náš tým architektů navrhne prostor, který bude funkční i estetický.', image: { url: '/api/media/file/renovace.webp' }, link: '/sluzby/architektonicke-navrhy', accentColor: 'blue' },
  { title: 'Poradenství a dozor', description: 'Odborné konzultace a stavební dozor pro hladký průběh každé stavby. Zastoupíme vás při jednání s úřady a ohlídáme kvalitu práce dodavatelů.', image: { url: '/api/media/file/poradenstvi.webp' }, link: '/sluzby/poradenstvi', accentColor: 'blue' },
];

export function ServicesSection({ data }: ServicesSectionProps) {
  const heading = data?.heading || 'Naše služby';
  const subtitle = data?.subtitle || 'Komplexní stavební služby pro váš domov i komerční prostory';
  const items = data?.items?.length ? data.items : fallbackItems;
  
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <section id="sluzby" className="py-20 md:py-32 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-dark-blue tracking-tight">{heading}</h2>
          <p className="mt-6 text-xl text-dark-blue/70 max-w-3xl font-subheading">{subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left: Tabs Navigation */}
          <div className="w-full lg:w-1/4 flex flex-col bg-blue overflow-hidden">
            {items.map((service, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={clsx(
                  'text-left px-8 py-6 text-lg font-heading font-bold transition-all duration-300 border-l-4',
                  activeIndex === i 
                    ? 'bg-dark-blue text-white border-primary-red' 
                    : 'text-white/80 border-transparent hover:bg-white/10 hover:text-white'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate pr-2">{service.title}</span>
                  <div className="w-5 h-5 flex-shrink-0">
                    {activeIndex === i && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Middle: Content */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center py-8">
            <div className="text-sm font-bold text-blue uppercase tracking-wider mb-4">Odbornost</div>
            <h3 className="text-3xl font-bold font-heading text-dark-blue mb-6">{activeItem.title}</h3>
            <p className="text-lg text-dark-blue/80 mb-10 leading-relaxed">
              {activeItem.description}
            </p>
            {activeItem.link && (
              <Link
                href={activeItem.link}
                className="inline-flex items-center text-lg font-bold text-dark-blue hover:text-primary-red transition-colors group"
              >
                Zjistit více
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-primary-red transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-[41.666%]">
            {activeItem.image && (
              <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] overflow-hidden shadow-2xl">
                <Image
                  src={activeItem.image.url}
                  alt={activeItem.image.alt || activeItem.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
