import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
  const imageSrc = data?.image?.url || '/about.jpg';
  const imageAlt = data?.image?.alt || 'Tým Stavopro Styl při práci';

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-soft-white">
      <div className="container mx-auto grid max-w-screen-desktop items-center gap-8 px-4 md:grid-cols-2 md:gap-16 md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-dark-blue sm:text-4xl font-heading">
            {heading}
          </h2>
          <p className="text-lg text-dark-blue/80 font-sans">{text}</p>
          <Button href={buttonLink} variant="secondary">{buttonText}</Button>
        </div>

        <div className="flex justify-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={800}
            height={600}
            className="overflow-hidden rounded-xl object-cover aspect-video md:aspect-auto"
          />
        </div>
      </div>
    </section>
  );
}
