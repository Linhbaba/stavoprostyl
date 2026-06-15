import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { ProjectGallery, type GalleryImage } from '@/components/projects/project-gallery';
import { CmsProse } from '@/components/ui/cms-prose';

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
      depth: 1,
      limit: 1,
    });
    const project = result.docs[0] as Record<string, unknown> | undefined;
    if (project) {
      const meta = project.meta as Record<string, unknown> | undefined;
      const ogImg = (meta?.image as Record<string, unknown>) || (meta?.ogImage as Record<string, unknown>);
      const ogUrl = typeof ogImg?.url === 'string' ? ogImg.url : undefined;
      const base = process.env.NEXT_PUBLIC_SITE_URL || '';
      return { 
        title: (meta?.title as string) || `${project.title} | Stavopro Styl`,
        description: (meta?.description as string) || undefined,
        openGraph: ogUrl ? { images: [{ url: ogUrl.startsWith('http') ? ogUrl : `${base}${ogUrl}` }] } : undefined,
      };
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

  const galleryImages: GalleryImage[] = (gallery ?? [])
    .map((item, index): GalleryImage | null => {
      const galImg = item.image as Record<string, unknown> | undefined;
      if (typeof galImg?.url !== 'string') return null;
      return {
        url: galImg.url,
        alt: (typeof galImg.alt === 'string' ? galImg.alt : typeof item.caption === 'string' ? item.caption : null) || `Galerie ${index + 1}`,
        caption: typeof item.caption === 'string' ? item.caption : undefined,
      };
    })
    .filter((item): item is GalleryImage => item !== null);

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
          <div className="relative w-full aspect-video overflow-hidden mb-10 shadow-lg">
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
          <CmsProse className="mb-12">
            <RichText data={project.description as Parameters<typeof RichText>[0]['data']} />
          </CmsProse>
        )}

        {galleryImages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-heading text-dark-blue mb-6">Galerie</h2>
            <ProjectGallery images={galleryImages} />
          </div>
        )}
      </div>
    </article>
  );
}
