import Image from 'next/image';
import Link from 'next/link';

export interface AboutData {
  heading?: string;
  text?: string;
  image?: { url: string; alt?: string };
  buttonText?: string;
  buttonLink?: string;
}

interface AboutSectionProps {
  data?: AboutData;
}

export function AboutSection({ data }: AboutSectionProps) {
  const heading = data?.heading || 'Kdo jsme';
  const text = data?.text || 'Stavopro Styl je rodinná stavební firma z Prahy. Už více než 15 let proměňujeme plány ve skutečnost – od základů až po střechu. Zakládáme si na poctivém řemesle, dodržování termínů a maximální spokojenosti zákazníků.';
  const buttonText = data?.buttonText || 'Zjistit více o nás';
  const buttonLink = data?.buttonLink || '/o-nas';
  const imageSrc = data?.image?.url || '/api/media/file/about.webp';
  const imageAlt = data?.image?.alt || 'Tým Stavopro Styl při práci';

  return (
    <section className="w-full py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-desktop">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <div className="text-sm font-bold text-primary-red uppercase tracking-wider mb-4">O společnosti</div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-dark-blue font-heading leading-tight">
                {heading}
              </h2>
            </div>
            
            <p className="text-xl text-dark-blue/80 font-subheading leading-relaxed max-w-2xl">
              {text}
            </p>
            
            <Link
              href={buttonLink}
              className="inline-flex items-center text-lg font-bold text-blue hover:text-primary-red transition-colors group pt-4"
            >
              {buttonText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] lg:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
