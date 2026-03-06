import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Název projektu',
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
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      options: [
        { label: 'Výstavba na klíč', value: 'vystavba' },
        { label: 'Rekonstrukce', value: 'rekonstrukce' },
        { label: 'Architektonický návrh', value: 'navrh' },
        { label: 'Poradenství', value: 'poradenstvi' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'year',
      type: 'number',
      label: 'Rok realizace',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lokalita',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Popis projektu',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Hlavní obrázek',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie',
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Obrázek',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Popisek',
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
