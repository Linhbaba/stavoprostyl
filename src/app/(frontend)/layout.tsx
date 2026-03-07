import "@/app/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Stavopro Styl',
    default: 'Stavopro Styl | Stavební společnost',
  },
  description: 'Stavopro Styl - Vaše spolehlivá stavební společnost pro výstavbu na klíč, rekonstrukce a architektonické návrhy.',
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'Stavopro Styl',
  },
};

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
