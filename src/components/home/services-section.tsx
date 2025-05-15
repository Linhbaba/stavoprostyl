'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

// Data pro služby
const services = [
  {
    id: 1,
    title: 'Výstavba na klíč',
    description: 'Kompletní realizace staveb od projektu až po předání klíčů.',
    icon: '/vystavby_na_klic.jpg',
    href: '/sluzby/vystavba-na-klic',
    accentColor: 'primary-red'
  },
  {
    id: 2,
    title: 'Rekonstrukce a renovace',
    description: 'Oživíme Váš domov. Provádíme rekonstrukce bytů, domů i komerčních prostor.',
    icon: '/rekonstrukce.jpg',
    href: '/sluzby/rekonstrukce',
    accentColor: 'blue'
  },
  {
    id: 3,
    title: 'Architektonické návrhy',
    description: 'Projektová dokumentace a architektonická řešení na míru vašim představám.',
    icon: '/renovace.jpg', // Používám jako placeholder - pravděpodobně by měl být jiný obrázek
    href: '/sluzby/architektonicke-navrhy',
    accentColor: 'blue'
  },
  {
    id: 4,
    title: 'Poradenství a dozor',
    description: 'Odborné konzultace a stavební dozor pro hladký průběh každé stavby.',
    icon: '/poradenstvi.jpg', // Používám správný obrázek pro poradenství
    href: '/sluzby/poradenstvi',
    accentColor: 'blue'
  }
];

export function ServicesSection() {
  return (
    <section id="sluzby" className="py-16 md:py-24 bg-light-blue">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-blue">
            Naše služby
          </h2>
          <p className="mt-4 text-lg text-dark-blue/80 max-w-3xl mx-auto">
            Komplexní stavební služby pro váš domov i komerční prostory
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className={clsx(
                  'absolute inset-0',
                  service.accentColor === 'primary-red' ? 'bg-primary-red/10' : 'bg-blue/10'
                )}></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className={clsx(
                  'text-xl font-bold font-heading mb-3',
                  service.accentColor === 'primary-red' ? 'text-primary-red' : 'text-blue'
                )}>
                  {service.title}
                </h3>
                <p className="text-dark-blue/80 mb-4 flex-grow">
                  {service.description}
                </p>
                <Link 
                  href={service.href}
                  className={clsx(
                    'font-medium hover:underline mt-auto inline-flex items-center',
                    service.accentColor === 'primary-red' ? 'text-primary-red' : 'text-blue'
                  )}
                >
                  Více informací
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/sluzby" variant="secondary">
            Zobrazit všechny služby
          </Button>
        </div>
      </div>
    </section>
  );
} 