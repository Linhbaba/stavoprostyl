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
  { title: 'Moderní řešení pro firemní prostory.', subtitle: 'Fit-out kanceláří a komerčních interiérů na míru.', image: { url: '/hero.jpg', alt: 'Komerční' } },
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
    <section className="relative w-full aspect-video lg:aspect-[2.4/1] overflow-hidden">
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
            <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="max-w-2xl px-4 text-center md:px-6">
                <h1
                  className={clsx(
                    "text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-heading transition-all duration-500 ease-out",
                    activeIndex === index ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4'
                  )}
                >
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <p
                    className={clsx(
                      "mt-4 text-lg text-white/90 md:text-xl font-subheading transition-all duration-500 ease-out",
                      activeIndex === index ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4'
                    )}
                  >
                    {slide.subtitle}
                  </p>
                )}
                <div
                  className={clsx(
                    "mt-6 flex flex-col items-center gap-4 min-[400px]:flex-row justify-center transition-all duration-500 ease-out",
                    activeIndex === index ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4'
                  )}
                >
                  <Button href="#kontakt" variant="primary">Nezávazně poptat stavbu</Button>
                  <Button href="#sluzby" variant="secondary">Zjistit více</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Přejít na slide ${index + 1}`}
            className={clsx(
              'h-3 w-3 rounded-full transition-colors duration-300',
              activeIndex === index ? 'bg-primary-red' : 'bg-white/50 hover:bg-white/80'
            )}
          />
        ))}
      </div>
    </section>
  );
}
