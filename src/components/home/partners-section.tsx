'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface PartnerItem {
  name: string;
  logo: { url: string; alt?: string };
  url?: string;
}

interface PartnersSectionProps {
  heading?: string;
  items?: PartnerItem[];
}

const fallbackPartners: PartnerItem[] = [
  { name: 'Logo Ipsum 1', logo: { url: '/partners/logo1.svg' }, url: 'https://logoipsum.com/' },
  { name: 'Logo Ipsum 2', logo: { url: '/partners/logo2.svg' }, url: 'https://logoipsum.com/' },
  { name: 'Logo Ipsum 3', logo: { url: '/partners/logo3.svg' }, url: 'https://logoipsum.com/' },
  { name: 'Logo Ipsum 4', logo: { url: '/partners/logo4.svg' }, url: 'https://logoipsum.com/' },
  { name: 'Logo Ipsum 5', logo: { url: '/partners/logo5.svg' }, url: 'https://logoipsum.com/' },
  { name: 'Logo Ipsum 6', logo: { url: '/partners/logo6.svg' }, url: 'https://logoipsum.com/' },
];

export function PartnersSection({ heading, items: propItems }: PartnersSectionProps) {
  const h = heading || 'Spolupracujeme s nejlepšími';
  const partners = propItems?.length ? propItems : fallbackPartners;
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768 || !isAutoScrolling) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    let scrollAmount = 0;
    let goingRight = true;
    const maxScroll = el.scrollWidth - el.clientWidth;

    const interval = setInterval(() => {
      if (goingRight) {
        scrollAmount += 1;
        if (scrollAmount >= maxScroll) goingRight = false;
      } else {
        scrollAmount -= 1;
        if (scrollAmount <= 0) goingRight = true;
      }
      el.scrollLeft = scrollAmount;
    }, 20);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const stop = () => setIsAutoScrolling(false);
  const start = () => setIsAutoScrolling(true);

  const renderPartner = (partner: PartnerItem, i: number, sizeClass: string) => {
    const inner = (
      <div className={`relative ${sizeClass} grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110`}>
        <Image src={partner.logo.url} alt={partner.logo.alt || partner.name} fill sizes="128px" className="object-contain" />
      </div>
    );

    return partner.url ? (
      <Link key={i} href={partner.url} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center">
        {inner}
      </Link>
    ) : (
      <div key={i} className="group relative flex items-center justify-center">{inner}</div>
    );
  };

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-medium font-heading text-dark-blue">{h}</h3>
        </div>

        <div className="hidden md:flex md:flex-wrap items-center justify-center gap-8 lg:gap-12">
          {partners.map((p, i) => renderPartner(p, i, 'h-12 w-32'))}
        </div>

        <div
          ref={scrollContainerRef}
          className="md:hidden flex items-center space-x-8 overflow-x-auto pb-4 scrollbar-hide"
          onMouseEnter={stop}
          onMouseLeave={start}
          onTouchStart={stop}
          onTouchEnd={start}
        >
          {partners.map((p, i) => (
            <Link
              key={i}
              href={p.url || '#'}
              target={p.url ? '_blank' : undefined}
              rel={p.url ? 'noopener noreferrer' : undefined}
              className="group flex-shrink-0 relative flex items-center justify-center"
            >
              <div className="relative h-10 w-28 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-active:grayscale-0 group-active:scale-110">
                <Image src={p.logo.url} alt={p.logo.alt || p.name} fill sizes="112px" className="object-contain" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
