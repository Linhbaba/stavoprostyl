import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import { RichText } from '@payloadcms/richtext-lexical/react';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
    });
    const page = result.docs[0] as Record<string, unknown> | undefined;
    if (page) {
      const meta = page.meta as Record<string, unknown> | undefined;
      return { 
        title: (meta?.title as string) || `${page.title} | Stavopro Styl`,
        description: (meta?.description as string) || undefined,
      };
    }
  } catch { /* */ }
  return { title: 'Stavopro Styl' };
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params;

  let page: Record<string, unknown> | null = null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
    });
    page = (result.docs[0] as Record<string, unknown>) || null;
  } catch { /* */ }

  if (!page) notFound();

  return (
    <article className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-dark-blue mb-10 leading-tight">
          {page.title as string}
        </h1>

        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark-blue prose-a:text-blue prose-img:shadow-lg">
          {page.content ? (
            <RichText data={page.content as Parameters<typeof RichText>[0]['data']} />
          ) : (
            <p className="text-dark-blue/70">Obsah se připravuje...</p>
          )}
        </div>
      </div>
    </article>
  );
}
