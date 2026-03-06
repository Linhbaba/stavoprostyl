import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stavopro Styl",
  description: "Stavíme Vaše sny na pevných základech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className="font-sans bg-soft-white text-dark-blue min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
