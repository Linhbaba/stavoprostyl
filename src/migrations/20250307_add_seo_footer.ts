import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_description" varchar DEFAULT 'Stavební firma zaměřená na kvalitu, inovace a spokojenost zákazníků. Již více než 15 let realizujeme vaše stavební projekty.',
  	"contact_company_name" varchar DEFAULT 'Stavopro Styl s.r.o.',
  	"contact_street" varchar DEFAULT 'Stavební 1234/5',
  	"contact_city" varchar DEFAULT '123 45 Praha',
  	"contact_phone" varchar DEFAULT '+420 777 888 999',
  	"contact_email" varchar DEFAULT 'info@stavoprostyl.cz',
  	"disclaimer_copyright" varchar DEFAULT 'Stavopro Styl s.r.o. Všechna práva vyhrazena.',
  	"disclaimer_ic" varchar DEFAULT '12345678',
  	"disclaimer_dic" varchar DEFAULT 'CZ12345678',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_description" varchar;

  ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "meta_description" varchar;

  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "footer";
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_title";
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_description";
   ALTER TABLE "projects" DROP COLUMN IF EXISTS "meta_title";
   ALTER TABLE "projects" DROP COLUMN IF EXISTS "meta_description";
   ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_title";
   ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_description";
  `)
}
