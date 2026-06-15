import type { GlobalConfig } from 'payload'
import { revalidateHomepageMeta } from '@/lib/revalidate-frontend'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Hlavní stránka',
  hooks: {
    afterChange: [() => { revalidateHomepageMeta() }],
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero sekce',
      fields: [
        {
          name: 'slides',
          type: 'array',
          label: 'Slidy',
          minRows: 1,
          maxRows: 5,
          fields: [
            { name: 'title', type: 'text', label: 'Nadpis', required: true },
            { name: 'subtitle', type: 'text', label: 'Podnadpis' },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Obrázek', required: true },
          ],
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      label: 'O nás sekce',
      fields: [
        { name: 'heading', type: 'text', label: 'Nadpis', defaultValue: 'Kdo jsme' },
        { name: 'text', type: 'textarea', label: 'Text' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Obrázek' },
        { name: 'buttonText', type: 'text', label: 'Text tlačítka', defaultValue: 'Zjistit více o nás' },
        { name: 'buttonLink', type: 'text', label: 'Odkaz tlačítka', defaultValue: '/o-nas' },
      ],
    },
    {
      name: 'services',
      type: 'group',
      label: 'Služby sekce',
      fields: [
        { name: 'heading', type: 'text', label: 'Nadpis', defaultValue: 'Naše služby' },
        { name: 'subtitle', type: 'text', label: 'Podnadpis' },
        {
          name: 'items',
          type: 'array',
          label: 'Služby',
          fields: [
            { name: 'title', type: 'text', label: 'Název', required: true },
            { name: 'description', type: 'textarea', label: 'Popis' },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Obrázek' },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Detail stránky',
              admin: {
                description: 'Vyberte stránku služby. Nejdříve vytvořte stránku v sekci Stránky (typ: Služba), pak ji zde vyberte.',
              },
            },
            {
              name: 'accentColor',
              type: 'select',
              label: 'Barva akcentu',
              defaultValue: 'blue',
              options: [
                { label: 'Červená', value: 'primary-red' },
                { label: 'Modrá', value: 'blue' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'references',
      type: 'group',
      label: 'Reference sekce',
      fields: [
        { name: 'heading', type: 'text', label: 'Nadpis', defaultValue: 'Naše reference' },
        { name: 'subtitle', type: 'text', label: 'Podnadpis' },
        {
          name: 'projects',
          type: 'relationship',
          relationTo: 'projects',
          hasMany: true,
          label: 'Vybrané projekty',
        },
      ],
    },
    {
      name: 'partners',
      type: 'group',
      label: 'Partneři sekce',
      fields: [
        { name: 'heading', type: 'text', label: 'Nadpis', defaultValue: 'Spolupracujeme s nejlepšími' },
        {
          name: 'items',
          type: 'array',
          label: 'Partneři',
          fields: [
            { name: 'name', type: 'text', label: 'Název', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo', required: true },
            { name: 'url', type: 'text', label: 'URL' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA sekce',
      fields: [
        { name: 'heading', type: 'text', label: 'Nadpis' },
        { name: 'subtitle', type: 'text', label: 'Podnadpis' },
      ],
    },
    {
      name: 'noindex',
      type: 'checkbox',
      label: 'Noindex (skrýt před vyhledávači)',
      defaultValue: true,
      admin: { description: 'Zaškrtněte, dokud web není připraven. Po spuštění odškrtněte.' },
    },
  ],
}
