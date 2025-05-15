'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

// Slide data
const slides = [
  {
    imageSrc: '/hero.jpg',
    title: 'Stavíme Vaše sny na pevných základech.',
    subtitle: 'Spolehlivá stavební firma v Praze s 15 lety zkušeností.',
  },
  {
    imageSrc: '/about.jpg',
    title: 'Precizní rekonstrukce pro Váš domov.',
    subtitle: 'Od bytových jader po kompletní přestavby.',
  },
  {
    imageSrc: '/hero.jpg',
    title: 'Moderní řešení pro firemní prostory.',
    subtitle: 'Fit-out kanceláří a komerčních interiérů na míru.',
  },
];

const SLIDE_INTERVAL = 4000; // ms

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start the interval
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, SLIDE_INTERVAL);
  };

  // Function to reset the interval (e.g., after manual navigation)
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startInterval();
  };

  // Start interval on mount and clear on unmount
  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    resetInterval(); // Reset timer when user manually navigates
  };

  return (
    <section className="relative w-full aspect-video lg:aspect-[2.4/1] overflow-hidden">
      {/* Slider Track - Holds all slides horizontally */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {/* Individual Slides */}
        {slides.map((slide, index) => (
          <div key={index} className="relative h-full w-full flex-shrink-0">
            {/* Background Image */}
            <Image
              src={slide.imageSrc}
              alt={`Slide ${index + 1} - ${slide.title}`}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70" aria-hidden="true"></div>

            {/* Text Content Container - Centered */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              {/* Inner container for text width and animation */}
              <div className="max-w-2xl px-4 text-center md:px-6">
                {/* Animate each text element based on activeIndex */}
                <h1
                  className={clsx(
                    "text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-heading transition-all duration-500 ease-out",
                    activeIndex === index
                      ? 'opacity-100 translate-y-0 delay-100'
                      : 'opacity-0 translate-y-4'
                  )}
                >
                  {slide.title}
                </h1>
                <p
                  className={clsx(
                    "mt-4 text-lg text-white/90 md:text-xl font-subheading transition-all duration-500 ease-out", // Added mt-4
                    activeIndex === index
                      ? 'opacity-100 translate-y-0 delay-200'
                      : 'opacity-0 translate-y-4'
                  )}
                >
                  {slide.subtitle}
                </p>
                <div
                  className={clsx(
                    "mt-6 flex flex-col items-center gap-4 min-[400px]:flex-row justify-center transition-all duration-500 ease-out", // Added mt-6
                    activeIndex === index
                      ? 'opacity-100 translate-y-0 delay-300'
                      : 'opacity-0 translate-y-4'
                  )}
                >
                  <Button href="/kontakt" variant="primary">
                    Nezávazně poptat stavbu
                  </Button>
                  <Button href="/#sluzby" variant="secondary">
                    Zjistit více
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
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