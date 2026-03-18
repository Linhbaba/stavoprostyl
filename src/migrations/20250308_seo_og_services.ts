import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_type" varchar DEFAULT 'standard';
   ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_og_image_id" integer;
   ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "meta_og_image_id" integer;
   ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_og_image_id" integer;
   ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_noindex" boolean DEFAULT true;
   ALTER TABLE "homepage_services_items" ADD COLUMN IF NOT EXISTS "page_id" integer;
   ALTER TABLE "homepage_services_items" DROP COLUMN IF EXISTS "link";
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_type";
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_og_image_id";
   ALTER TABLE "projects" DROP COLUMN IF EXISTS "meta_og_image_id";
   ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_og_image_id";
   ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_noindex";
   ALTER TABLE "homepage_services_items" DROP COLUMN IF EXISTS "page_id";
   ALTER TABLE "homepage_services_items" ADD COLUMN IF NOT EXISTS "link" varchar;
  `)
}
