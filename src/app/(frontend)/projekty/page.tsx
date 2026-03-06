import Image from 'next/image';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Projekty | Stavopro Styl',
  description: 'Naše realizované stavební projekty a reference.',
};

const categoryLabels: Record<string, string> = {
  vystavba: 'Výstavba na klíč',
  rekonstrukce: 'Rekonstrukce',
  navrh: 'Architektonický návrh',
  poradenstvi: 'Poradenství',
};

export default async function ProjektyPage() {
  let projects: Array<{
    title: string;
    slug: string;
    category?: string;
    year?: number;
    featuredImage?: { url: string; alt?: string };
  }> = [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'projects',
      where: { status: { equals: 'published' } },
      sort: '-year',
      depth: 1,
      limit: 50,
    });

    projects = result.docs.map((doc) => {
      const d = doc as Record<string, unknown>;
      const img = d.featuredImage as Record<string, unknown> | undefined;
      return {
        title: (d.title as string) || '',
        slug: (d.slug as string) || '',
        category: (d.category as string) || undefined,
        year: (d.year as number) || undefined,
        featuredImage: img?.url ? { url: img.url as string, alt: (img.alt as string) || '' } : undefined,
      };
    });
  } catch {
    // Payload not available
  }

  return (
    <section className="py-16 md:py-24 bg-soft-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-dark-blue mb-8">Naše projekty</h1>

        {projects.length === 0 ? (
          <p className="text-dark-blue/70 text-lg">Zatím zde nejsou žádné projekty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projekty/${project.slug}`} className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
                {project.featuredImage && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={project.featuredImage.url}
                      alt={project.featuredImage.alt || project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {project.category && (
                      <span className="text-sm font-medium text-blue">{categoryLabels[project.category] || project.category}</span>
                    )}
                    {project.year && <span className="text-sm text-dark-blue/50">· {project.year}</span>}
                  </div>
                  <h2 className="text-xl font-bold text-dark-blue group-hover:text-primary-red transition-colors">{project.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
