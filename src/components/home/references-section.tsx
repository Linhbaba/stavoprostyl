'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface ReferenceProject {
  title: string;
  description?: string;
  year?: number | string;
  category?: string;
  image: { url: string; alt?: string };
  slug: string;
}

interface ReferencesSectionProps {
  heading?: string;
  subtitle?: string;
  projects?: ReferenceProject[];
}

const fallbackProjects: ReferenceProject[] = [
  { title: 'Rodinný dům Kolovraty', description: 'Moderní dřevostavba', year: '2022', category: 'Výstavba', image: { url: '/reference1.jpg' }, slug: 'rodinny-dum-kolovraty' },
  { title: 'Rekonstrukce bytu Vinohrady', description: 'Kompletní renovace interiéru', year: '2021', category: 'Rekonstrukce', image: { url: '/reference2.jpg' }, slug: 'rekonstrukce-bytu-vinohrady' },
  { title: 'Administrativní budova Karlín', description: 'Stavba na klíč', year: '2023', category: 'Komerční prostory', image: { url: '/reference3.jpg' }, slug: 'administrativni-budova-karlin' },
];

export function ReferencesSection({ heading, subtitle, projects: propProjects }: ReferencesSectionProps) {
  const h = heading || 'Naše reference';
  const sub = subtitle || 'Přesvědčte se o kvalitě naší práce. Prohlédněte si vybrané projekty, které jsme realizovali.';
  const projects = propProjects?.length ? propProjects : fallbackProjects;

  return (
    <section id="reference" className="py-16 md:py-24 bg-soft-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-blue">{h}</h2>
          <p className="mt-4 text-lg text-dark-blue/80 max-w-3xl mx-auto">{sub}</p>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {projects.map((project, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image.url}
                  alt={project.image.alt || project.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Link href={`/projekty/${project.slug}`} className="bg-primary-red hover:bg-primary-red-dark text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    Zobrazit detail
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {project.category && <p className="text-sm text-blue font-medium">{project.category}</p>}
                <h3 className="mt-1 text-xl font-bold text-dark-blue">{project.title}</h3>
                <p className="mt-1 text-dark-blue/70">{project.description}{project.year ? ` (${project.year})` : ''}</p>
                <Link href={`/projekty/${project.slug}`} className="mt-4 inline-flex items-center text-blue font-medium hover:underline">
                  Zobrazit detail
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden overflow-x-auto -mx-4 px-4">
          <div className="flex space-x-4 pb-4">
            {projects.map((project, i) => (
              <div key={i} className="flex-shrink-0 w-4/5 overflow-hidden rounded-xl bg-white shadow-md">
                <div className="relative h-48 w-full">
                  <Image src={project.image.url} alt={project.image.alt || project.title} fill sizes="80vw" className="object-cover" />
                </div>
                <div className="p-4">
                  {project.category && <p className="text-sm text-blue font-medium">{project.category}</p>}
                  <h3 className="mt-1 text-lg font-bold text-dark-blue">{project.title}</h3>
                  <p className="mt-1 text-sm text-dark-blue/70">{project.description}{project.year ? ` (${project.year})` : ''}</p>
                  <Link href={`/projekty/${project.slug}`} className="mt-3 inline-flex items-center text-sm text-blue font-medium hover:underline">
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

        <div className="mt-12 text-center">
          <p className="text-lg text-dark-blue/80 mb-4">Chcete vidět více? Kontaktujte nás a staňte se dalším spokojeným zákazníkem.</p>
          <Button href="/projekty" variant="secondary">Další reference</Button>
        </div>
      </div>
    </section>
  );
}
