'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import type { SiteLogos } from '@/lib/site-branding';
import { SiteLogoImage } from '@/components/layout/site-logo';

const navItems = [
  { name: 'Domů', href: '/' },
  { name: 'O nás', href: '/o-nas' },
  { name: 'Služby', href: '/#sluzby' },
  { name: 'Projekty', href: '/projekty' },
  { name: 'Kontakt', href: '/#kontakt' },
];

interface HeaderProps {
  logos: SiteLogos;
}

export function Header({ logos }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  const isHome = pathname === '/';
  const logo = isHome ? logos.light : logos.dark;

  return (
    <header className={clsx(
      "absolute top-0 left-0 right-0 z-[60] w-full",
      pathname === '/' ? "bg-transparent" : "bg-white border-b border-gray-200"
    )}>
      <div className="container mx-auto flex h-24 max-w-screen-desktop items-center px-4 sm:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <SiteLogoImage
              logo={logo}
              className="w-48 lg:w-64 h-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex-1" />

        <nav className="hidden lg:flex gap-8 xl:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'text-base xl:text-lg font-medium font-subheading tracking-wide transition-colors hover:text-primary-red',
                isActive(item.href) ? 'text-primary-red' : (pathname === '/' ? 'text-white' : 'text-dark-blue')
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={clsx(
              "inline-flex items-center justify-center p-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              pathname === '/' ? "text-white hover:bg-white/10" : "text-dark-blue hover:bg-black/5"
            )}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'block px-3 py-2 text-lg font-medium font-subheading transition-colors hover:bg-gray-50 hover:text-primary-red',
                  isActive(item.href) ? 'text-primary-red bg-gray-50' : 'text-dark-blue'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
