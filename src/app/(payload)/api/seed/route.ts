import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const secret = process.env.PAYLOAD_SECRET || 'dev-secret';
  if (token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const log: string[] = [];
    const uploaded: Record<string, number> = {};

    // Create admin user if none exists
    const existingUsers = await payload.find({ collection: 'users', limit: 1 });
    let adminId: number | undefined;
    if (existingUsers.docs.length === 0) {
      const admin = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@stavoprostyl.cz',
          password: 'admin123',
          name: 'Admin',
          role: 'admin',
        },
      });
      adminId = admin.id as number;
      log.push(`Created admin user (id: ${adminId})`);
    } else {
      adminId = existingUsers.docs[0].id as number;
      log.push(`Admin user exists (id: ${adminId})`);
    }

    // Upload media
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
      {
        title: 'Rodinný dům Kolovraty',
        slug: 'rodinny-dum-kolovraty',
        category: 'vystavba' as const,
        year: 2022,
        location: 'Praha - Kolovraty',
        image: uploaded['reference1.jpg'],
        description: {
          root: {
            type: 'root',
            children: [
              { type: 'paragraph', children: [{ type: 'text', text: 'Kompletní výstavba moderního rodinného domu v klidné lokalitě Prahy - Kolovrat. Projekt zahrnoval vše od základové desky po finální terénní úpravy. Dům o užitné ploše 180 m² nabízí 5+kk s prostornou garáží a zahradou.' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Realizace proběhla v období duben 2021 – červen 2022. Stavba byla dokončena v termínu a v rámci rozpočtu.' }], version: 1 },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        title: 'Rekonstrukce bytu Vinohrady',
        slug: 'rekonstrukce-bytu-vinohrady',
        category: 'rekonstrukce' as const,
        year: 2021,
        location: 'Praha 2 - Vinohrady',
        image: uploaded['reference2.jpg'],
        description: {
          root: {
            type: 'root',
            children: [
              { type: 'paragraph', children: [{ type: 'text', text: 'Kompletní rekonstrukce bytu 3+1 v historickém činžovním domě na Vinohradech. Projekt zahrnoval nové rozvody elektřiny a vody, moderní koupelnu, novou kuchyňskou linku a renovaci původních parket.' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Zvláštní důraz byl kladen na zachování historických prvků – štuky, kazetové dveře a původní kliky byly citlivě restaurovány.' }], version: 1 },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        title: 'Administrativní budova Karlín',
        slug: 'administrativni-budova-karlin',
        category: 'navrh' as const,
        year: 2023,
        location: 'Praha 8 - Karlín',
        image: uploaded['reference3.jpg'],
        description: {
          root: {
            type: 'root',
            children: [
              { type: 'paragraph', children: [{ type: 'text', text: 'Architektonický návrh a realizace fit-outu administrativní budovy v dynamicky se rozvíjející čtvrti Karlín. Projekt zahrnoval kompletní interiérový design open-space kanceláří, jednacích místností a odpočinkových zón.' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Celková plocha 1 200 m² pro 150 zaměstnanců. Důraz na ergonomii, akustiku a udržitelnost.' }], version: 1 },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
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
          location: proj.location,
          description: proj.description,
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

    // Seed blog posts
    const blogPosts = [
      {
        title: 'Jak vybrat správnou stavební firmu',
        slug: 'jak-vybrat-spravnou-stavebni-firmu',
        excerpt: 'Výběr stavební firmy je jedním z nejdůležitějších rozhodnutí při stavbě nebo rekonstrukci. Přečtěte si, na co si dát pozor.',
        publishedAt: '2025-11-15',
        image: uploaded['hero.jpg'],
        content: {
          root: {
            type: 'root',
            children: [
              { type: 'paragraph', children: [{ type: 'text', text: 'Výběr správné stavební firmy může být rozdílem mezi úspěšným projektem a noční můrou. V tomto článku vám poradíme, na co se zaměřit a jak postupovat.' }], version: 1 },
              { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '1. Zkontrolujte reference' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Kvalitní firma se nebojí ukázat své dokončené projekty. Požádejte o kontakty na předchozí zákazníky a ideálně si realizace prohlédněte osobně.' }], version: 1 },
              { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '2. Ověřte pojištění a certifikace' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Každá seriózní stavební firma by měla mít platné pojištění odpovědnosti za škody a příslušné živnostenské oprávnění.' }], version: 1 },
              { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '3. Detailní rozpočet a smlouva' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Trvejte na podrobném rozpočtu s rozpisem jednotlivých položek. Kvalitní smlouva o dílo je základem úspěšné spolupráce.' }], version: 1 },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        title: 'Trendy ve stavebnictví pro rok 2026',
        slug: 'trendy-ve-stavebnictvi-2026',
        excerpt: 'Jaké materiály a technologie budou dominovat stavebnictví v nadcházejícím roce? Přinášíme přehled nejdůležitějších trendů.',
        publishedAt: '2026-01-20',
        image: uploaded['rekonstrukce.jpg'],
        content: {
          root: {
            type: 'root',
            children: [
              { type: 'paragraph', children: [{ type: 'text', text: 'Stavebnictví se neustále vyvíjí a rok 2026 přinese několik zajímavých trendů, které ovlivní jak se staví a rekonstruuje.' }], version: 1 },
              { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Udržitelné materiály' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Stále více stavebníků volí ekologické materiály – recyklované cihly, dřevostavby s certifikací FSC a izolace z přírodních materiálů jako konopí či ovčí vlna.' }], version: 1 },
              { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Chytré domácnosti' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Integrace IoT technologií do staveb se stává standardem. Automatizované vytápění, osvětlení a zabezpečení šetří energii a zvyšují komfort bydlení.' }], version: 1 },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        title: 'Rekonstrukce koupelny krok za krokem',
        slug: 'rekonstrukce-koupelny-krok-za-krokem',
        excerpt: 'Plánujete rekonstrukci koupelny? Připravili jsme pro vás kompletní průvodce od demolice po finální úklid.',
        publishedAt: '2026-02-28',
        image: uploaded['renovace.jpg'],
        content: {
          root: {
            type: 'root',
            children: [
              { type: 'paragraph', children: [{ type: 'text', text: 'Rekonstrukce koupelny patří mezi nejčastější stavební úpravy v domácnostech. Správný postup a plánování jsou klíčem k úspěchu.' }], version: 1 },
              { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Fáze 1: Plánování a návrh' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Před zahájením prací si důkladně promyslete dispozici, volbu materiálů a rozpočet. Doporučujeme konzultaci s odborníkem na interiérový design.' }], version: 1 },
              { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Fáze 2: Demolice a příprava' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Odstranění starých obkladů, sanitární keramiky a rozvodů. V této fázi se odhalí skutečný stav podkladu a případné skryté závady.' }], version: 1 },
              { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Fáze 3: Nové rozvody a hydroizolace' }], version: 1 },
              { type: 'paragraph', children: [{ type: 'text', text: 'Instalace nových rozvodů vody, odpadu a elektřiny. Hydroizolace je kritickým krokem – špatná izolace znamená problémy s vlhkostí na roky dopředu.' }], version: 1 },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    ];

    for (const post of blogPosts) {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        log.push(`Post exists: ${post.title}`);
        continue;
      }

      const doc = await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          featuredImage: post.image,
          content: post.content,
          author: adminId,
          publishedAt: post.publishedAt,
          status: 'published',
        },
      });
      log.push(`Created post: ${post.title} (id: ${doc.id})`);
    }

    return NextResponse.json({ success: true, log });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
