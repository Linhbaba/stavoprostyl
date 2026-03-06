import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

const MEDIA_DIR = path.resolve(process.cwd(), 'public');

interface MediaFile {
  filename: string;
  alt: string;
}

const mediaFiles: MediaFile[] = [
  { filename: 'hero.jpg', alt: 'Hero - stavba na klíč' },
  { filename: 'about.jpg', alt: 'O nás - tým Stavopro Styl' },
  { filename: 'vystavby_na_klic.jpg', alt: 'Výstavba na klíč' },
  { filename: 'rekonstrukce.jpg', alt: 'Rekonstrukce a renovace' },
  { filename: 'renovace.jpg', alt: 'Architektonické návrhy' },
  { filename: 'poradenstvi.jpg', alt: 'Poradenství a dozor' },
  { filename: 'reference1.jpg', alt: 'Rodinný dům Kolovraty' },
  { filename: 'reference2.jpg', alt: 'Rekonstrukce bytu Vinohrady' },
  { filename: 'reference3.jpg', alt: 'Administrativní budova Karlín' },
  { filename: 'reference4.jpg', alt: 'Reference 4' },
  { filename: 'cta.jpg', alt: 'CTA pozadí' },
  { filename: 'logo.png', alt: 'Logo Stavopro Styl' },
  { filename: 'partners/logo1.svg', alt: 'Partner 1' },
  { filename: 'partners/logo2.svg', alt: 'Partner 2' },
  { filename: 'partners/logo3.svg', alt: 'Partner 3' },
  { filename: 'partners/logo4.svg', alt: 'Partner 4' },
  { filename: 'partners/logo5.svg', alt: 'Partner 5' },
  { filename: 'partners/logo6.svg', alt: 'Partner 6' },
];

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Seed disabled in production' }, { status: 403 });
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const log: string[] = [];
    const uploaded: Record<string, number> = {};

    for (const file of mediaFiles) {
      const filePath = path.resolve(MEDIA_DIR, file.filename);
      if (!fs.existsSync(filePath)) {
        log.push(`Skipped: ${file.filename} (not found)`);
        continue;
      }

      const existing = await payload.find({
        collection: 'media',
        where: { alt: { equals: file.alt } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        log.push(`Exists: ${file.alt} (id: ${existing.docs[0].id})`);
        uploaded[file.filename] = existing.docs[0].id as number;
        continue;
      }

      const buffer = fs.readFileSync(filePath);
      const ext = path.extname(file.filename).toLowerCase();
      const mimeMap: Record<string, string> = {
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
        '.svg': 'image/svg+xml', '.webp': 'image/webp',
      };

      const doc = await payload.create({
        collection: 'media',
        data: { alt: file.alt },
        file: {
          data: buffer,
          name: path.basename(file.filename),
          mimetype: mimeMap[ext] || 'application/octet-stream',
          size: buffer.length,
        },
      });

      log.push(`Uploaded: ${file.alt} (id: ${doc.id})`);
      uploaded[file.filename] = doc.id as number;
    }

    // Seed Homepage global
    const heroId = uploaded['hero.jpg'];
    const aboutImgId = uploaded['about.jpg'];

    await payload.updateGlobal({
      slug: 'homepage' as const,
      data: {
        hero: {
          slides: [
            { title: 'Stavíme Vaše sny na pevných základech.', subtitle: 'Spolehlivá stavební firma v Praze s 15 lety zkušeností.', image: heroId },
            { title: 'Precizní rekonstrukce pro Váš domov.', subtitle: 'Od bytových jader po kompletní přestavby.', image: aboutImgId },
            { title: 'Moderní řešení pro firemní prostory.', subtitle: 'Fit-out kanceláří a komerčních interiérů na míru.', image: heroId },
          ],
        },
        about: {
          heading: 'Kdo jsme',
          text: 'Stavopro Styl je rodinná stavební firma z Prahy. Už více než 15 let proměňujeme plány ve skutečnost – od základů až po střechu. Zakládáme si na poctivém řemesle, dodržování termínů a maximální spokojenosti zákazníků.',
          image: aboutImgId,
          buttonText: 'Zjistit více o nás',
          buttonLink: '/o-nas',
        },
        services: {
          heading: 'Naše služby',
          subtitle: 'Komplexní stavební služby pro váš domov i komerční prostory',
          items: [
            { title: 'Výstavba na klíč', description: 'Kompletní realizace staveb od projektu až po předání klíčů.', image: uploaded['vystavby_na_klic.jpg'], link: '/sluzby/vystavba-na-klic', accentColor: 'primary-red' },
            { title: 'Rekonstrukce a renovace', description: 'Oživíme Váš domov. Provádíme rekonstrukce bytů, domů i komerčních prostor.', image: uploaded['rekonstrukce.jpg'], link: '/sluzby/rekonstrukce', accentColor: 'blue' },
            { title: 'Architektonické návrhy', description: 'Projektová dokumentace a architektonická řešení na míru vašim představám.', image: uploaded['renovace.jpg'], link: '/sluzby/architektonicke-navrhy', accentColor: 'blue' },
            { title: 'Poradenství a dozor', description: 'Odborné konzultace a stavební dozor pro hladký průběh každé stavby.', image: uploaded['poradenstvi.jpg'], link: '/sluzby/poradenstvi', accentColor: 'blue' },
          ],
        },
        partners: {
          heading: 'Spolupracujeme s nejlepšími',
          items: [
            { name: 'Logo Ipsum 1', logo: uploaded['partners/logo1.svg'], url: 'https://logoipsum.com/' },
            { name: 'Logo Ipsum 2', logo: uploaded['partners/logo2.svg'], url: 'https://logoipsum.com/' },
            { name: 'Logo Ipsum 3', logo: uploaded['partners/logo3.svg'], url: 'https://logoipsum.com/' },
            { name: 'Logo Ipsum 4', logo: uploaded['partners/logo4.svg'], url: 'https://logoipsum.com/' },
            { name: 'Logo Ipsum 5', logo: uploaded['partners/logo5.svg'], url: 'https://logoipsum.com/' },
            { name: 'Logo Ipsum 6', logo: uploaded['partners/logo6.svg'], url: 'https://logoipsum.com/' },
          ],
        },
        cta: {
          heading: 'Máte stavební projekt v hlavě? Nechte to na nás – postavíme Vaše sny.',
          subtitle: 'Jsme připraveni přeměnit vaše představy ve skutečnost. Vyplňte jednoduchý formulář a my vás budeme kontaktovat.',
        },
      } as Record<string, unknown>,
    });
    log.push('Homepage global seeded');

    // Seed reference projects
    const refProjects = [
      { title: 'Rodinný dům Kolovraty', slug: 'rodinny-dum-kolovraty', category: 'vystavba' as const, year: 2022, image: uploaded['reference1.jpg'] },
      { title: 'Rekonstrukce bytu Vinohrady', slug: 'rekonstrukce-bytu-vinohrady', category: 'rekonstrukce' as const, year: 2021, image: uploaded['reference2.jpg'] },
      { title: 'Administrativní budova Karlín', slug: 'administrativni-budova-karlin', category: 'navrh' as const, year: 2023, image: uploaded['reference3.jpg'] },
    ];

    const projectIds: number[] = [];

    for (const proj of refProjects) {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: proj.slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        log.push(`Project exists: ${proj.title}`);
        projectIds.push(existing.docs[0].id as number);
        continue;
      }

      const doc = await payload.create({
        collection: 'projects',
        data: {
          title: proj.title,
          slug: proj.slug,
          category: proj.category,
          year: proj.year,
          featuredImage: proj.image,
          status: 'published',
        },
      });
      log.push(`Created project: ${proj.title} (id: ${doc.id})`);
      projectIds.push(doc.id as number);
    }

    await payload.updateGlobal({
      slug: 'homepage' as const,
      data: {
        references: {
          heading: 'Naše reference',
          subtitle: 'Přesvědčte se o kvalitě naší práce. Prohlédněte si vybrané projekty, které jsme realizovali.',
          projects: projectIds,
        },
      } as Record<string, unknown>,
    });
    log.push('References linked to homepage');

    return NextResponse.json({ success: true, log });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
