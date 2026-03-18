import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { migrations } from './migrations/index'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Projects } from './collections/Projects'
import { Homepage } from './globals/Homepage'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Pages, Projects],
  globals: [Homepage, Footer],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
    push: true,
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages', 'projects'],
      globals: ['homepage'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => {
        const title = (doc as Record<string, unknown>)?.title
        return typeof title === 'string' ? `${title} | Stavopro Styl` : 'Stavopro Styl'
      },
      generateDescription: ({ doc }) => {
        const desc = (doc as Record<string, unknown>)?.description
        return typeof desc === 'string' ? desc : ''
      },
    }),
    ...(process.env.R2_BUCKET
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.R2_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
              },
              region: 'auto',
              endpoint: process.env.R2_ENDPOINT || '',
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
})
