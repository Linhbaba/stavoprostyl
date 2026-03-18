import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Název stránky',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL slug',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Obsah',
    },
    {
      name: 'pageType',
      type: 'select',
      label: 'Typ stránky',
      defaultValue: 'standard',
      options: [
        { label: 'Standardní stránka', value: 'standard' },
        { label: 'Služba', value: 'service' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Stránky typu „Služba“ lze vybrat v sekci Naše služby na hlavní stránce.',
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta title',
          admin: { description: 'Doporučeno 50–60 znaků' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta description',
          admin: { description: 'Doporučeno 150–160 znaků' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG obrázek',
          admin: { description: 'Obrázek pro sdílení na sociálních sítích (doporučeno 1200×630 px)' },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Stav',
      defaultValue: 'draft',
      options: [
        { label: 'Koncept', value: 'draft' },
        { label: 'Publikováno', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
