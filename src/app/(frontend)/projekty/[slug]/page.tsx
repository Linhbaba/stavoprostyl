import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';
import { RichText } from '@payloadcms/richtext-lexical/react';

const categoryLabels: Record<string, string> = {
  vystavba: 'Výstavba na klíč',
  rekonstrukce: 'Rekonstrukce',
  navrh: 'Architektonický návrh',
  poradenstvi: 'Poradenství',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
    });
    const project = result.docs[0] as Record<string, unknown> | undefined;
    if (project) {
      return { title: `${project.title} | Stavopro Styl` };
    }
  } catch { /* */ }
  return { title: 'Projekt | Stavopro Styl' };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  let project: Record<string, unknown> | null = null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      depth: 2,
      limit: 1,
    });
    project = (result.docs[0] as Record<string, unknown>) || null;
  } catch { /* */ }

  if (!project) notFound();

  const img = project.featuredImage as Record<string, unknown> | undefined;
  const gallery = project.gallery as Array<Record<string, unknown>> | undefined;

  return (
    <article className="py-16 md:py-24 bg-soft-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/projekty" className="inline-flex items-center text-blue font-medium hover:underline mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zpět na projekty
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold font-heading text-dark-blue mb-4">
          {project.title as string}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-dark-blue/60 mb-8">
          {typeof project.category === 'string' && <span className="bg-blue/10 text-blue px-3 py-1 rounded-full font-medium">{categoryLabels[project.category] || project.category}</span>}
          {typeof project.year === 'number' && <span>{project.year}</span>}
          {typeof project.location === 'string' && <span>· {project.location}</span>}
        </div>

        {typeof img?.url === 'string' && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
            <Image
              src={img.url}
              alt={(typeof img.alt === 'string' ? img.alt : String(project.title)) || 'Obrázek'}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {project.description != null && (
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark-blue prose-a:text-blue mb-12">
            <RichText data={project.description as Parameters<typeof RichText>[0]['data']} />
          </div>
        )}

        {gallery && gallery.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-heading text-dark-blue mb-6">Galerie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item, i) => {
                const galImg = item.image as Record<string, unknown> | undefined;
                if (typeof galImg?.url !== 'string') return null;
                return (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={galImg.url}
                      alt={(typeof galImg.alt === 'string' ? galImg.alt : typeof item.caption === 'string' ? item.caption : null) || `Galerie ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {typeof item.caption === 'string' && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <p className="text-white text-sm">{item.caption}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
