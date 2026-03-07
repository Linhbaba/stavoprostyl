'use client';

import Image from 'next/image';
import Link from 'next/link';

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
  { title: 'Rodinný dům Kolovraty', description: 'Kompletní výstavba moderního rodinného domu v klidné lokalitě Prahy.', year: '2022', category: 'Výstavba', image: { url: '/api/media/file/reference1.webp' }, slug: 'rodinny-dum-kolovraty' },
  { title: 'Rekonstrukce bytu Vinohrady', description: 'Kompletní renovace interiéru historického bytu.', year: '2021', category: 'Rekonstrukce', image: { url: '/api/media/file/reference2.webp' }, slug: 'rekonstrukce-bytu-vinohrady' },
  { title: 'Administrativní budova Karlín', description: 'Stavba na klíč a fit-out kanceláří.', year: '2023', category: 'Komerční prostory', image: { url: '/api/media/file/reference3.webp' }, slug: 'administrativni-budova-karlin' },
];

export function ReferencesSection({ heading, subtitle, projects: propProjects }: ReferencesSectionProps) {
  const h = heading || 'Naše reference';
  const sub = subtitle || 'Přesvědčte se o kvalitě naší práce.';
  const projects = propProjects?.length ? propProjects : fallbackProjects;
  
  const mainProject = projects[0];
  const otherProjects = projects.slice(1, 3);

  return (
    <section id="reference" className="py-20 md:py-32 bg-soft-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left: Main Project Image */}
          <div className="w-full lg:w-1/2">
            {mainProject && (
              <Link href={`/projekty/${mainProject.slug}`} className="group block relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={mainProject.image.url}
                  alt={mainProject.image.alt || mainProject.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
              </Link>
            )}
          </div>

          {/* Right: Main Project Info & Other Projects */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            {/* Main Project Details */}
            {mainProject && (
              <div className="mb-16">
                <div className="text-sm font-bold text-blue uppercase tracking-wider mb-4">Vybraná reference</div>
                <h3 className="text-4xl md:text-5xl font-bold font-heading text-dark-blue mb-6 leading-tight">
                  <Link href={`/projekty/${mainProject.slug}`} className="hover:text-primary-red transition-colors">
                    {mainProject.title}
                  </Link>
                </h3>
                <p className="text-xl text-dark-blue/80 mb-8 max-w-xl leading-relaxed">
                  {mainProject.description}
                </p>
                <Link
                  href={`/projekty/${mainProject.slug}`}
                  className="inline-flex items-center text-lg font-bold text-primary-red hover:text-primary-red-dark transition-colors group"
                >
                  Zobrazit detail projektu
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Other Projects Grid */}
            {otherProjects.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-2xl font-bold font-heading text-dark-blue">Další projekty</h4>
                  <Link href="/projekty" className="text-blue font-bold hover:text-primary-red transition-colors inline-flex items-center group">
                    Zobrazit všechny
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {otherProjects.map((project, i) => (
                    <Link key={i} href={`/projekty/${project.slug}`} className="group block">
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 shadow-md">
                        <Image
                          src={project.image.url}
                          alt={project.image.alt || project.title}
                          fill
                          sizes="(min-width: 640px) 25vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      {project.category && <p className="text-xs text-blue font-bold uppercase tracking-wider mb-1">{project.category}</p>}
                      <h5 className="text-lg font-bold font-heading text-dark-blue group-hover:text-primary-red transition-colors">{project.title}</h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </section>
  );
}
