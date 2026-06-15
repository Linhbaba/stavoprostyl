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

  /** full=1 přepíše homepage, patičku a reference (jen první nasazení / dev). Bez toho jen doplní chybějící stránky, média, projekty. */
  const fullSeed = req.nextUrl.searchParams.get('full') === '1';

  try {
    const payload = await getPayload({ config: configPromise });
    const log: string[] = [];
    if (!fullSeed) {
      log.push('Bezpečný režim (bez full=1): patička a hlavní stránka se nemění. Pro kompletní reset přidej &full=1');
    }
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

    // Seed generic pages first (potřebujeme je pro služby na HP)
    const genericPages = [
      { title: 'O nás', slug: 'o-nas', pageType: 'standard' as const, content: { root: { type: 'root', children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Stavíme vaše sny na pevných základech' }], version: 1 }, { type: 'paragraph', children: [{ type: 'text', text: 'Stavopro Styl je rodinná stavební firma z Prahy s více než 15 lety zkušeností.' }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } } },
      { title: 'Výstavba na klíč', slug: 'vystavba-na-klic', pageType: 'service' as const, content: { root: { type: 'root', children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Kompletní realizace staveb' }], version: 1 }, { type: 'paragraph', children: [{ type: 'text', text: 'Zajistíme kompletní výstavbu vašeho vysněného domu od prvotního návrhu až po předání klíčů.' }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } } },
      { title: 'Rekonstrukce', slug: 'rekonstrukce', pageType: 'service' as const, content: { root: { type: 'root', children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Oživíme váš domov' }], version: 1 }, { type: 'paragraph', children: [{ type: 'text', text: 'Provádíme kompletní i částečné rekonstrukce bytů, rodinných domů a komerčních prostor.' }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } } },
      { title: 'Architektonické návrhy', slug: 'architektonicke-navrhy', pageType: 'service' as const, content: { root: { type: 'root', children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Design, který dává smysl' }], version: 1 }, { type: 'paragraph', children: [{ type: 'text', text: 'Náš tým zkušených architektů pro vás připraví návrh na míru.' }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } } },
      { title: 'Poradenství a dozor', slug: 'poradenstvi', pageType: 'service' as const, content: { root: { type: 'root', children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Odborný dohled nad vaší stavbou' }], version: 1 }, { type: 'paragraph', children: [{ type: 'text', text: 'Nabízíme odborné poradenství a stavební dozor.' }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } } },
      { title: 'Ochrana osobních údajů', slug: 'zasady-ochrany-osobnich-udaju', pageType: 'standard' as const, content: { root: { type: 'root', children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Zpracování osobních údajů' }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } } },
      { title: 'Obchodní podmínky', slug: 'obchodni-podminky', pageType: 'standard' as const, content: { root: { type: 'root', children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Všeobecné obchodní podmínky' }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } } },
      { title: 'Cookies', slug: 'cookies', pageType: 'standard' as const, content: { root: { type: 'root', children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Zásady používání souborů cookies' }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } } },
    ];

    const pageIdsBySlug: Record<string, number> = {};
    for (const page of genericPages) {
      const existing = await payload.find({ collection: 'pages', where: { slug: { equals: page.slug } }, limit: 1 });
      let doc;
      if (existing.docs.length > 0) {
        doc = existing.docs[0];
        log.push(`Page exists: ${page.title}`);
      } else {
        doc = await payload.create({
          collection: 'pages',
          data: { title: page.title, slug: page.slug, content: page.content, status: 'published', pageType: page.pageType },
        });
        log.push(`Created page: ${page.title} (id: ${doc.id})`);
      }
      pageIdsBySlug[page.slug] = doc.id as number;
    }

    // Seed Homepage global
    const heroId = uploaded['hero.jpg'];
    const aboutImgId = uploaded['about.jpg'];

    const serviceItems = [
      { title: 'Výstavba na klíč', description: 'Kompletní realizace staveb od projektu až po předání klíčů.', image: uploaded['vystavby_na_klic.jpg'], page: pageIdsBySlug['vystavba-na-klic'], accentColor: 'primary-red' },
      { title: 'Rekonstrukce a renovace', description: 'Oživíme Váš domov. Provádíme rekonstrukce bytů, domů i komerčních prostor.', image: uploaded['rekonstrukce.jpg'], page: pageIdsBySlug['rekonstrukce'], accentColor: 'blue' },
      { title: 'Architektonické návrhy', description: 'Projektová dokumentace a architektonická řešení na míru vašim představám.', image: uploaded['renovace.jpg'], page: pageIdsBySlug['architektonicke-navrhy'], accentColor: 'blue' },
      { title: 'Poradenství a dozor', description: 'Odborné konzultace a stavební dozor pro hladký průběh každé stavby.', image: uploaded['poradenstvi.jpg'], page: pageIdsBySlug['poradenstvi'], accentColor: 'blue' },
    ].filter((s) => s.page);

    if (fullSeed) {
      await payload.updateGlobal({
        slug: 'homepage' as const,
        data: {
          hero: {
            slides: [
              { title: 'Stavíme Vaše sny na pevných základech.', subtitle: 'Spolehlivá stavební firma v Praze s 15 lety zkušeností.', image: heroId },
              { title: 'Precizní rekonstrukce pro Váš domov.', subtitle: 'Od bytových jader po kompletní přestavby.', image: aboutImgId },
              { title: 'Moderní řešení pro firemní prostory.', subtitle: 'Fit-out kanceláří a komerčních interiérů na míru.', image: uploaded['reference3.jpg'] ?? uploaded['cta.jpg'] },
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
            items: serviceItems,
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
      log.push('Homepage global seeded (full=1)');
    } else {
      log.push('Homepage přeskočena (použij full=1 pro výchozí obsah HP)');
    }

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

    if (fullSeed) {
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
      log.push('References linked to homepage (full=1)');
    } else {
      log.push('Reference na HP přeskočeny (full=1)');
    }

    if (fullSeed) {
      await payload.updateGlobal({
        slug: 'footer' as const,
        data: {
          companyDescription: 'Stavební firma zaměřená na kvalitu, inovace a spokojenost zákazníků. Již více než 15 let realizujeme vaše stavební projekty.',
          contact: {
            companyName: 'Stavopro Styl s.r.o.',
            street: 'Stavební 1234/5',
            city: '123 45 Praha',
            phone: '+420 777 888 999',
            email: 'info@stavoprostyl.cz',
          },
          disclaimer: {
            copyright: 'Stavopro Styl s.r.o. Všechna práva vyhrazena.',
            ic: '12345678',
            dic: 'CZ12345678',
          },
          aboutLinks: [
            { label: 'O společnosti', href: '/o-nas' },
            { label: 'Projekty a reference', href: '/projekty' },
            { label: 'Kontakt', href: '/#kontakt' },
          ],
          legalLinks: [
            { label: 'Ochrana osobních údajů', href: '/zasady-ochrany-osobnich-udaju' },
            { label: 'Obchodní podmínky', href: '/obchodni-podminky' },
            { label: 'Cookies', href: '/cookies' },
          ],
        },
      });
      log.push('Footer global seeded (full=1)');
    } else {
      log.push('Patička přeskočena (full=1)');
    }

    return NextResponse.json({ success: true, log });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
