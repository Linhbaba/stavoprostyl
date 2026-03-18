import "@/app/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getPayloadClient } from "@/lib/payload";
import type { Metadata } from "next";

async function getMetadata(): Promise<Metadata> {
  let noindex = false;
  try {
    const payload = await getPayloadClient();
    const hp = await payload.findGlobal({ slug: 'homepage' as const });
    const meta = (hp as Record<string, unknown>)?.meta as Record<string, unknown> | undefined;
    noindex = meta?.noindex === true;
  } catch { /* */ }
  return {
    title: { template: '%s | Stavopro Styl', default: 'Stavopro Styl | Stavební společnost' },
    description: 'Stavopro Styl - Vaše spolehlivá stavební společnost pro výstavbu na klíč, rekonstrukce a architektonické návrhy.',
    openGraph: { type: 'website', locale: 'cs_CZ', siteName: 'Stavopro Styl' },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

export const metadata: Promise<Metadata> = getMetadata();

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className="font-sans bg-soft-white text-dark-blue min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
