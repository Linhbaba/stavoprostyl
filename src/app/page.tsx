import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { ServicesSection } from "@/components/home/services-section";
import { ReferencesSection } from "@/components/home/references-section";
import { PartnersSection } from "@/components/home/partners-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    // Remove centering and padding from main, sections will handle their layout
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ReferencesSection />
      <PartnersSection />
      <CtaSection />
    </main>
  );
}
