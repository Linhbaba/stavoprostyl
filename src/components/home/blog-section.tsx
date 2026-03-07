import Image from 'next/image';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';

export interface BlogPost {
  title: string;
  excerpt?: string;
  image?: { url: string; alt?: string };
  slug: string;
  publishedAt?: string;
}

interface BlogSectionProps {
  heading?: string;
  posts?: BlogPost[];
}

export async function BlogSection({ heading = 'Aktuality a Blog' }: BlogSectionProps) {
  let posts: BlogPost[] = [];
  
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 3,
    });
    
    posts = result.docs.map((doc: any) => ({
      title: doc.title,
      excerpt: doc.excerpt,
      slug: doc.slug,
      publishedAt: doc.publishedAt,
      image: doc.featuredImage ? {
        url: doc.featuredImage.url,
        alt: doc.featuredImage.alt || doc.title
      } : undefined
    }));
  } catch {
    // Fallback data
    posts = [
      { title: 'Jak vybrat správnou stavební firmu', excerpt: 'Výběr stavební firmy je jedním z nejdůležitějších rozhodnutí při stavbě nebo rekonstrukci.', slug: 'jak-vybrat-spravnou-stavebni-firmu', publishedAt: '2025-11-15', image: { url: '/api/media/file/hero.webp' } },
      { title: 'Trendy ve stavebnictví pro rok 2026', excerpt: 'Jaké materiály a technologie budou dominovat stavebnictví v nadcházejícím roce?', slug: 'trendy-ve-stavebnictvi-2026', publishedAt: '2026-01-20', image: { url: '/api/media/file/rekonstrukce.webp' } },
      { title: 'Rekonstrukce koupelny krok za krokem', excerpt: 'Plánujete rekonstrukci koupelny? Připravili jsme pro vás kompletní průvodce.', slug: 'rekonstrukce-koupelny-krok-za-krokem', publishedAt: '2026-02-28', image: { url: '/api/media/file/renovace.webp' } },
    ];
  }

  if (posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 3);

  return (
    <section className="py-20 md:py-32 bg-soft-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-dark-blue tracking-tight">{heading}</h2>
          <Link href="/blog" className="hidden md:inline-flex items-center text-lg font-bold text-blue hover:text-primary-red transition-colors group">
            Všechny články
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main featured post */}
          <div className="w-full lg:w-3/5">
            <Link href={`/blog/${mainPost.slug}`} className="group block h-full">
              <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 shadow-md">
                {mainPost.image && (
                  <Image
                    src={mainPost.image.url}
                    alt={mainPost.image.alt || mainPost.title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="pr-4">
                {mainPost.publishedAt && (
                  <p className="text-sm font-bold text-primary-red uppercase tracking-wider mb-3">
                    {new Date(mainPost.publishedAt).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                )}
                <h3 className="text-3xl md:text-4xl font-bold font-heading text-dark-blue mb-4 group-hover:text-primary-red transition-colors leading-tight">
                  {mainPost.title}
                </h3>
                <p className="text-lg text-dark-blue/70 mb-6 line-clamp-3">
                  {mainPost.excerpt}
                </p>
                <span className="inline-flex items-center font-bold text-blue group-hover:text-primary-red transition-colors">
                  Číst více
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>

          {/* Side posts */}
          <div className="w-full lg:w-2/5 flex flex-col gap-8">
            {sidePosts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="group flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-6">
                <div className="relative w-full sm:w-2/5 lg:w-full xl:w-2/5 aspect-[4/3] overflow-hidden flex-shrink-0 shadow-sm">
                  {post.image && (
                    <Image
                      src={post.image.url}
                      alt={post.image.alt || post.title}
                      fill
                      sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 40vw, (min-width: 640px) 40vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center flex-grow">
                  {post.publishedAt && (
                    <p className="text-xs font-bold text-primary-red uppercase tracking-wider mb-2">
                      {new Date(post.publishedAt).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  <h4 className="text-xl font-bold font-heading text-dark-blue mb-3 group-hover:text-primary-red transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <span className="inline-flex items-center text-sm font-bold text-blue group-hover:text-primary-red transition-colors mt-auto">
                    Číst více
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 md:hidden">
          <Link href="/blog" className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-bold font-heading uppercase transition-all duration-200 bg-blue hover:bg-blue/90 text-white">
            Všechny články
          </Link>
        </div>
      </div>
    </section>
  );
}