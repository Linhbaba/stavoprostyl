import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';
import { RichText } from '@payloadcms/richtext-lexical/react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
    });
    const post = result.docs[0] as Record<string, unknown> | undefined;
    if (post) {
      return { title: `${post.title} | Stavopro Styl` };
    }
  } catch { /* */ }
  return { title: 'Článek | Stavopro Styl' };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let post: Record<string, unknown> | null = null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      depth: 2,
      limit: 1,
    });
    post = (result.docs[0] as Record<string, unknown>) || null;
  } catch { /* */ }

  if (!post) notFound();

  const img = post.featuredImage as Record<string, unknown> | undefined;
  const author = post.author as Record<string, unknown> | undefined;

  return (
    <article className="py-16 md:py-24 bg-soft-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center text-blue font-medium hover:underline mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zpět na blog
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold font-heading text-dark-blue mb-4">
          {post.title as string}
        </h1>

        <div className="flex items-center gap-4 text-sm text-dark-blue/60 mb-8">
          {post.publishedAt && (
            <time>{new Date(post.publishedAt as string).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
          )}
          {author?.name && <span>· {author.name as string}</span>}
        </div>

        {img?.url && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
            <Image
              src={img.url as string}
              alt={(img.alt as string) || (post.title as string)}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark-blue prose-a:text-blue">
          {post.content ? <RichText data={post.content} /> : <p className="text-dark-blue/70">Obsah se připravuje...</p>}
        </div>
      </div>
    </article>
  );
}
