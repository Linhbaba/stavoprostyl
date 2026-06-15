import type { GlobalConfig } from 'payload'
import { revalidateSiteBranding } from '@/lib/revalidate-frontend'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Nastavení webu',
  hooks: {
    afterChange: [() => { revalidateSiteBranding() }],
  },
  fields: [
    {
      name: 'branding',
      type: 'group',
      label: 'Logo webu',
      fields: [
        {
          name: 'logoLight',
          type: 'upload',
          relationTo: 'media',
          label: 'Světlé logo',
          admin: {
            description:
              'Pro tmavé pozadí — hlavička na úvodní stránce a patička. Doporučený formát SVG nebo PNG s průhledným pozadím. Pokud nahrajete jen jedno logo, použije se i jako záloha pro druhou variantu.',
          },
        },
        {
          name: 'logoDark',
          type: 'upload',
          relationTo: 'media',
          label: 'Tmavé logo',
          admin: {
            description:
              'Pro světlé pozadí — hlavička na ostatních stránkách. Pokud nahrajete jen jedno logo, použije se i jako záloha pro druhou variantu.',
          },
        },
        {
          name: 'logoAlt',
          type: 'text',
          label: 'Alt text loga',
          defaultValue: 'Stavopro Styl Logo',
          admin: {
            description: 'Popis loga pro čtečky obrazovky a SEO.',
          },
        },
      ],
    },
  ],
}
