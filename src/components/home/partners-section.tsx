'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Data partnerů
const partners = [
  {
    id: 1,
    name: 'Logo Ipsum 1',
    logo: '/partners/logo1.svg',
    url: 'https://logoipsum.com/',
  },
  {
    id: 2,
    name: 'Logo Ipsum 2',
    logo: '/partners/logo2.svg',
    url: 'https://logoipsum.com/',
  },
  {
    id: 3,
    name: 'Logo Ipsum 3',
    logo: '/partners/logo3.svg',
    url: 'https://logoipsum.com/',
  },
  {
    id: 4,
    name: 'Logo Ipsum 4',
    logo: '/partners/logo4.svg',
    url: 'https://logoipsum.com/',
  },
  {
    id: 5,
    name: 'Logo Ipsum 5',
    logo: '/partners/logo5.svg',
    url: 'https://logoipsum.com/',
  },
  {
    id: 6,
    name: 'Logo Ipsum 6',
    logo: '/partners/logo6.svg',
    url: 'https://logoipsum.com/',
  },
];

export function PartnersSection() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Efekt pro automatické scrollování na mobilních zařízeních
  useEffect(() => {
    if (window.innerWidth < 768 && isAutoScrolling) {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;
      
      let scrollAmount = 0;
      let isScrollingRight = true;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      const interval = setInterval(() => {
        if (!scrollContainer) return;
        
        if (isScrollingRight) {
          scrollAmount += 1;
          scrollContainer.scrollLeft = scrollAmount;
          
          if (scrollAmount >= maxScroll) {
            isScrollingRight = false;
          }
        } else {
          scrollAmount -= 1;
          scrollContainer.scrollLeft = scrollAmount;
          
          if (scrollAmount <= 0) {
            isScrollingRight = true;
          }
        }
      }, 20);
      
      return () => clearInterval(interval);
    }
  }, [isAutoScrolling]);
  
  // Zastavení auto-scrollu při uživatelské interakci
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-medium font-heading text-dark-blue">
            Spolupracujeme s nejlepšími
          </h3>
        </div>
        
        {/* Desktop - statická lišta */}
        <div className="hidden md:flex md:flex-wrap items-center justify-center gap-8 lg:gap-12">
          {partners.map((partner) => (
            <Link
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center"
            >
              <div className="relative h-12 w-32 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
        
        {/* Mobilní - scrollovatelný slider */}
        <div 
          ref={scrollContainerRef}
          className="md:hidden flex items-center space-x-8 overflow-x-auto pb-4 scrollbar-hide"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          {partners.map((partner) => (
            <Link
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 relative flex items-center justify-center"
            >
              <div className="relative h-10 w-28 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-active:grayscale-0 group-active:scale-110">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 