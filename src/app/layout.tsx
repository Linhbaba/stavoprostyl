import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stavopro Styl",
  description: "Stavíme Vaše sny na pevných základech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
