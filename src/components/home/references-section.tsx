'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

// Data pro referenční projekty
const referenceProjects = [
  {
    id: 1,
    title: 'Rodinný dům Kolovraty',
    description: 'Moderní dřevostavba',
    year: '2022',
    category: 'Výstavba',
    image: '/reference1.jpg',
    href: '/projekty/rodinny-dum-kolovraty',
  },
  {
    id: 2,
    title: 'Rekonstrukce bytu Vinohrady',
    description: 'Kompletní renovace interiéru',
    year: '2021',
    category: 'Rekonstrukce',
    image: '/reference2.jpg',
    href: '/projekty/rekonstrukce-bytu-vinohrady',
  },
  {
    id: 3,
    title: 'Administrativní budova Karlín',
    description: 'Stavba na klíč',
    year: '2023',
    category: 'Komerční prostory',
    image: '/reference3.jpg',
    href: '/projekty/administrativni-budova-karlin',
  },
];

export function ReferencesSection() {
  // State pro modální okno (implementováno jako placeholder)
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  return (
    <section id="reference" className="py-16 md:py-24 bg-soft-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-blue">
            Naše reference
          </h2>
          <p className="mt-4 text-lg text-dark-blue/80 max-w-3xl mx-auto">
            Přesvědčte se o kvalitě naší práce. Prohlédněte si vybrané projekty, které jsme realizovali.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {referenceProjects.map((project) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {/* Obrázek s efektem zvětšení */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay pro efekt ztmavení */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                {/* Tlačítko na detailní zobrazení při najetí na obrázek */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Link 
                    href={project.href} 
                    className="bg-primary-red hover:bg-primary-red-dark text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                  >
                    Zobrazit detail
                  </Link>
                </div>
              </div>
              
              {/* Základní info pod obrázkem */}
              <div className="p-6">
                <p className="text-sm text-blue font-medium">{project.category}</p>
                <h3 className="mt-1 text-xl font-bold text-dark-blue">{project.title}</h3>
                <p className="mt-1 text-dark-blue/70">{project.description} ({project.year})</p>
                <Link 
                  href={project.href}
                  className="mt-4 inline-flex items-center text-blue font-medium hover:underline"
                >
                  Zobrazit detail
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobilní zobrazení - karusel (zjednodušený) */}
        <div className="md:hidden overflow-x-auto -mx-4 px-4">
          <div className="flex space-x-4 pb-4">
            {referenceProjects.map((project) => (
              <div 
                key={project.id}
                className="flex-shrink-0 w-4/5 overflow-hidden rounded-xl bg-white shadow-md"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="80vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-blue font-medium">{project.category}</p>
                  <h3 className="mt-1 text-lg font-bold text-dark-blue">{project.title}</h3>
                  <p className="mt-1 text-sm text-dark-blue/70">{project.description} ({project.year})</p>
                  <Link 
                    href={project.href}
                    className="mt-3 inline-flex items-center text-sm text-blue font-medium hover:underline"
                  >
                    Zobrazit detail
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA sekce */}
        <div className="mt-12 text-center">
          <p className="text-lg text-dark-blue/80 mb-4">
            Chcete vidět více? Kontaktujte nás a staňte se dalším spokojeným zákazníkem.
          </p>
          <Button href="/projekty" variant="secondary">
            Další reference
          </Button>
        </div>
      </div>
    </section>
  );
} 