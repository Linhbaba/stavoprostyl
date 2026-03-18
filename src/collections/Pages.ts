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
