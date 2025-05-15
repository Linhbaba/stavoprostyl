import Link from 'next/link';
import Image from 'next/image';
import aboutImage from '/public/about.jpg'; // Import local image
import { Button } from '@/components/ui/button'; // Import shared Button

// Removed local Button definition

export function AboutSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-soft-white">
      <div className="container mx-auto grid max-w-screen-desktop items-center gap-8 px-4 md:grid-cols-2 md:gap-16 md:px-6">
        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-dark-blue sm:text-4xl font-heading">
            Kdo jsme
          </h2>
          <p className="text-lg text-dark-blue/80 font-sans">
            Stavopro Styl je rodinná stavební firma z Prahy. Už více než 15 let proměňujeme plány ve skutečnost – od základů až po střechu. Zakládáme si na poctivém řemesle, dodržování termínů a maximální spokojenosti zákazníků.
          </p>
          <Button href="/o-nas" variant="secondary">
            Zjistit více o nás
          </Button>
        </div>

        {/* Use local image */}
        <div className="flex justify-center">
          <Image
            src={aboutImage} // Use imported image object
            alt="Tým Stavopro Styl při práci"
            // width/height might be inferred from import, but good practice to keep for layout
            // width={600} // Let Next.js handle size or adjust based on actual image
            // height={400}
            placeholder="blur" // Optional: add blur placeholder
            className="overflow-hidden rounded-xl object-cover aspect-video md:aspect-auto"
          />
        </div>
      </div>
    </section>
  );
} 