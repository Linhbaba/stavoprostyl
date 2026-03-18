import { getPayloadClient } from '@/lib/payload';
import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { ServicesSection } from '@/components/home/services-section';
import { ReferencesSection } from '@/components/home/references-section';
import { PartnersSection } from '@/components/home/partners-section';
import { CtaSection } from '@/components/home/cta-section';
import type { HeroSlide } from '@/components/home/hero-section';
import type { AboutData } from '@/components/home/about-section';
import type { ServicesData, ServiceItem } from '@/components/home/services-section';
import type { ReferenceProject } from '@/components/home/references-section';
import type { PartnerItem } from '@/components/home/partners-section';
import type { CtaData } from '@/components/home/cta-section';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  try {
    const payload = await getPayloadClient();
    const hp = await payload.findGlobal({ slug: 'homepage' as const, depth: 1 });
    if (hp) {
      const h = hp as Record<string, unknown>;
      const meta = h.meta as Record<string, unknown> | undefined;
      const ogImg = meta?.ogImage as Record<string, unknown> | undefined;
      const ogUrl = typeof ogImg?.url === 'string' ? ogImg.url : undefined;
      const base = process.env.NEXT_PUBLIC_SITE_URL || '';
      return {
        title: (meta?.title as string) || 'Stavopro Styl | Stavební společnost',
        description: (meta?.description as string) || 'Stavopro Styl - Vaše spolehlivá stavební společnost.',
        openGraph: ogUrl ? { images: [{ url: ogUrl.startsWith('http') ? ogUrl : `${base}${ogUrl}` }] } : undefined,
      };
    }
  } catch { /* */ }
  return {
    title: 'Stavopro Styl | Stavební společnost',
    description: 'Stavopro Styl - Vaše spolehlivá stavební společnost.',
  };
}

function mediaUrl(media: unknown): string {
  if (!media || typeof media !== 'object') return '';
  const m = media as Record<string, unknown>;
  return (m.url as string) || '';
}

function mediaObj(media: unknown): { url: string; alt?: string } {
  if (!media || typeof media !== 'object') return { url: '' };
  const m = media as Record<string, unknown>;
  return { url: (m.url as string) || '', alt: (m.alt as string) || undefined };
}

export default async function Home() {
  let heroSlides: HeroSlide[] | undefined;
  let aboutData: AboutData | undefined;
  let servicesData: ServicesData | undefined;
  let referenceProjects: ReferenceProject[] | undefined;
  let refHeading: string | undefined;
  let refSubtitle: string | undefined;
  let partnersHeading: string | undefined;
  let partnersItems: PartnerItem[] | undefined;
  let ctaData: CtaData | undefined;

  try {
    const payload = await getPayloadClient();
    const hp = await payload.findGlobal({ slug: 'homepage' as const, depth: 2 });

    if (hp) {
      const h = hp as Record<string, unknown>;

      // Hero
      const hero = h.hero as Record<string, unknown> | undefined;
      if (hero?.slides && Array.isArray(hero.slides)) {
        heroSlides = (hero.slides as Record<string, unknown>[])
          .filter((s) => s.image && mediaUrl(s.image))
          .map((s) => ({
            title: (s.title as string) || '',
            subtitle: (s.subtitle as string) || undefined,
            image: mediaObj(s.image),
          }));
      }

      // About
      const about = h.about as Record<string, unknown> | undefined;
      if (about) {
        aboutData = {
          heading: (about.heading as string) || undefined,
          text: (about.text as string) || undefined,
          image: about.image ? mediaObj(about.image) : undefined,
          buttonText: (about.buttonText as string) || undefined,
          buttonLink: (about.buttonLink as string) || undefined,
        };
      }

      // Services
      const services = h.services as Record<string, unknown> | undefined;
      if (services) {
        const items = services.items as Record<string, unknown>[] | undefined;
        servicesData = {
          heading: (services.heading as string) || undefined,
          subtitle: (services.subtitle as string) || undefined,
          items: items?.map((item): ServiceItem => {
            const page = item.page as Record<string, unknown> | undefined;
            const slug = page?.slug as string | undefined;
            const link = slug ? `/${slug}` : undefined;
            return {
              title: (item.title as string) || '',
              description: (item.description as string) || undefined,
              image: item.image ? mediaObj(item.image) : undefined,
              link,
              accentColor: (item.accentColor as string) || 'blue',
            };
          }),
        };
      }

      // References
      const references = h.references as Record<string, unknown> | undefined;
      if (references) {
        refHeading = (references.heading as string) || undefined;
        refSubtitle = (references.subtitle as string) || undefined;
        const projects = references.projects as Record<string, unknown>[] | undefined;
        if (projects?.length) {
          referenceProjects = projects
            .filter((p) => p.featuredImage && mediaUrl(p.featuredImage))
            .map((p) => ({
              title: (p.title as string) || '',
              description: '', // richtext, simplified
              year: (p.year as number) || undefined,
              category: (p.category as string) || undefined,
              image: mediaObj(p.featuredImage),
              slug: (p.slug as string) || '',
            }));
        }
      }

      // Partners
      const partners = h.partners as Record<string, unknown> | undefined;
      if (partners) {
        partnersHeading = (partners.heading as string) || undefined;
        const items = partners.items as Record<string, unknown>[] | undefined;
        if (items?.length) {
          partnersItems = items
            .filter((item) => item.logo && mediaUrl(item.logo))
            .map((item) => ({
              name: (item.name as string) || '',
              logo: mediaObj(item.logo),
              url: (item.url as string) || undefined,
            }));
        }
      }

      // CTA
      const cta = h.cta as Record<string, unknown> | undefined;
      if (cta) {
        ctaData = {
          heading: (cta.heading as string) || undefined,
          subtitle: (cta.subtitle as string) || undefined,
        };
      }
    }
  } catch {
    // Payload not available yet (first run / no DB), components use fallback data
  }

  return (
    <main className="-mt-24">
      <HeroSection slides={heroSlides} />
      <ServicesSection data={servicesData} />
      <ReferencesSection heading={refHeading} subtitle={refSubtitle} projects={referenceProjects} />
      <AboutSection data={aboutData} />
      <PartnersSection heading={partnersHeading} items={partnersItems} />
      <CtaSection data={ctaData} />
    </main>
  );
}
