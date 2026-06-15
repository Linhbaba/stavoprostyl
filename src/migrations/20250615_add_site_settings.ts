import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "site_settings" (
   	"id" serial PRIMARY KEY NOT NULL,
   	"branding_logo_alt" varchar DEFAULT 'Stavopro Styl Logo',
   	"branding_logo_light_id" integer,
   	"branding_logo_dark_id" integer,
   	"updated_at" timestamp(3) with time zone,
   	"created_at" timestamp(3) with time zone
   );

   DO $$ BEGIN
    ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_branding_logo_light_id_media_id_fk"
     FOREIGN KEY ("branding_logo_light_id") REFERENCES "media"("id") ON DELETE SET NULL;
   EXCEPTION WHEN duplicate_object THEN NULL;
   END $$;

   DO $$ BEGIN
    ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_branding_logo_dark_id_media_id_fk"
     FOREIGN KEY ("branding_logo_dark_id") REFERENCES "media"("id") ON DELETE SET NULL;
   EXCEPTION WHEN duplicate_object THEN NULL;
   END $$;
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE IF EXISTS "site_settings";
  `)
}
