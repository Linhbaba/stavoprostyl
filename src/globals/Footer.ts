import type { GlobalConfig } from 'payload'
import { revalidateSiteBranding } from '@/lib/revalidate-frontend'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Patička webu',
  hooks: {
    afterChange: [() => { revalidateSiteBranding() }],
  },
  fields: [
    {
      name: 'companyDescription',
      type: 'textarea',
      label: 'Popis společnosti (pod logem)',
      defaultValue: 'Stavební firma zaměřená na kvalitu, inovace a spokojenost zákazníků. Již více než 15 let realizujeme vaše stavební projekty.',
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Kontaktní údaje',
      fields: [
        { name: 'companyName', type: 'text', label: 'Název společnosti', defaultValue: 'Stavopro Styl s.r.o.' },
        { name: 'street', type: 'text', label: 'Ulice a číslo popisné', defaultValue: 'Stavební 1234/5' },
        { name: 'city', type: 'text', label: 'PSČ a Město', defaultValue: '123 45 Praha' },
        { name: 'phone', type: 'text', label: 'Telefon', defaultValue: '+420 777 888 999' },
        { name: 'email', type: 'text', label: 'E-mail', defaultValue: 'info@stavoprostyl.cz' },
      ],
    },
    {
      name: 'disclaimer',
      type: 'group',
      label: 'Právní doložka (spodní lišta)',
      fields: [
        { name: 'copyright', type: 'text', label: 'Copyright text', defaultValue: 'Stavopro Styl s.r.o. Všechna práva vyhrazena.' },
        { name: 'ic', type: 'text', label: 'IČ', defaultValue: '12345678' },
        { name: 'dic', type: 'text', label: 'DIČ', defaultValue: 'CZ12345678' },
      ],
    },
  ],
}
