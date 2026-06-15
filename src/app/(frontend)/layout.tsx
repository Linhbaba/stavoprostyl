import "@/app/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getFooterContent, getHomepageNoindex, getSiteLogos } from "@/lib/cms-globals";
import type { Metadata } from "next";

async function getMetadata(): Promise<Metadata> {
  const noindex = await getHomepageNoindex();
  return {
    title: { template: '%s | Stavopro Styl', default: 'Stavopro Styl | Stavební společnost' },
    description: 'Stavopro Styl - Vaše spolehlivá stavební společnost pro výstavbu na klíč, rekonstrukce a architektonické návrhy.',
    openGraph: { type: 'website', locale: 'cs_CZ', siteName: 'Stavopro Styl' },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

export const metadata: Promise<Metadata> = getMetadata();

export const revalidate = 60;

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [logos, footerContent] = await Promise.all([
    getSiteLogos(),
    getFooterContent(),
  ]);

  return (
    <html lang="cs">
      <body className="font-sans bg-soft-white text-dark-blue min-h-screen flex flex-col">
        <Header logos={logos} />
        <main className="flex-grow pt-24">{children}</main>
        <Footer logo={logos.light} content={footerContent} />
      </body>
    </html>
  );
}
