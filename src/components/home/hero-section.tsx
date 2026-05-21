'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

export interface HeroSlide {
  title: string;
  subtitle?: string;
  image: { url: string; alt?: string };
}

interface HeroSectionProps {
  slides?: HeroSlide[];
}

const fallbackSlides: HeroSlide[] = [
  { title: 'Stavíme Vaše sny na pevných základech.', subtitle: 'Spolehlivá stavební firma v Praze s 15 lety zkušeností.', image: { url: '/hero.jpg', alt: 'Hero' } },
  { title: 'Precizní rekonstrukce pro Váš domov.', subtitle: 'Od bytových jader po kompletní přestavby.', image: { url: '/about.jpg', alt: 'Rekonstrukce' } },
  { title: 'Moderní řešení pro firemní prostory.', subtitle: 'Fit-out kanceláří a komerčních interiérů na míru.', image: { url: '/vystavby_na_klic.jpg', alt: 'Výstavba na klíč' } },
];

const SLIDE_INTERVAL = 4000;

export function HeroSection({ slides: propSlides }: HeroSectionProps) {
  const slides = propSlides?.length ? propSlides : fallbackSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    intervalRef.current = id;
    return () => clearInterval(id);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    intervalRef.current = id;
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-full w-full flex-shrink-0">
            <Image
              src={slide.image.url}
              alt={slide.image.alt || slide.title}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
            {/* Jemnější gradient místo plné černé */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" aria-hidden="true" />

            <div className="absolute inset-0 z-10 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
                <div className="max-w-4xl">
                  <h1
                    className={clsx(
                      "text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl font-heading transition-all duration-700 ease-out leading-tight",
                      activeIndex === index ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-8'
                    )}
                  >
                    {slide.title}
                  </h1>
                  {/* Červený akcent pod nadpisem */}
                  <div 
                    className={clsx(
                      "h-1 w-24 bg-primary-red mt-6 mb-6 transition-all duration-700 ease-out",
                      activeIndex === index ? 'opacity-100 scale-x-100 delay-300' : 'opacity-0 scale-x-0 origin-left'
                    )}
                  />
                  {slide.subtitle && (
                    <p
                      className={clsx(
                        "text-xl text-white/90 md:text-2xl font-subheading transition-all duration-700 ease-out max-w-2xl",
                        activeIndex === index ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-8'
                      )}
                    >
                      {slide.subtitle}
                    </p>
                  )}
                  <div
                    className={clsx(
                      "mt-10 flex flex-col items-start gap-6 min-[400px]:flex-row transition-all duration-700 ease-out",
                      activeIndex === index ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-8'
                    )}
                  >
                    <Button href="#kontakt" variant="primary" className="text-lg px-8 py-4">Nezávazně poptat stavbu</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Přejít na slide ${index + 1}`}
              className={clsx(
                'h-1 transition-all duration-300',
                activeIndex === index ? 'w-16 bg-primary-red' : 'w-8 bg-white/50 hover:bg-white/80'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
