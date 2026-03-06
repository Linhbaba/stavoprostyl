import Image from 'next/image';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog | Stavopro Styl',
  description: 'Aktuality a články ze světa stavebnictví.',
};

export default async function BlogPage() {
  let posts: Array<{
    title: string;
    slug: string;
    excerpt?: string;
    featuredImage?: { url: string; alt?: string };
    publishedAt?: string;
  }> = [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      depth: 1,
      limit: 20,
    });

    posts = result.docs.map((doc) => {
      const d = doc as Record<string, unknown>;
      const img = d.featuredImage as Record<string, unknown> | undefined;
      return {
        title: (d.title as string) || '',
        slug: (d.slug as string) || '',
        excerpt: (d.excerpt as string) || undefined,
        featuredImage: img?.url ? { url: img.url as string, alt: (img.alt as string) || '' } : undefined,
        publishedAt: (d.publishedAt as string) || undefined,
      };
    });
  } catch {
    // Payload not available
  }

  return (
    <section className="py-16 md:py-24 bg-soft-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-dark-blue mb-8">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-dark-blue/70 text-lg">Zatím zde nejsou žádné články. Sledujte nás!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
                {post.featuredImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.featuredImage.url}
                      alt={post.featuredImage.alt || post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.publishedAt && (
                    <p className="text-sm text-blue font-medium mb-2">
                      {new Date(post.publishedAt).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  <h2 className="text-xl font-bold text-dark-blue group-hover:text-primary-red transition-colors">{post.title}</h2>
                  {post.excerpt && <p className="mt-2 text-dark-blue/70 line-clamp-3">{post.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
