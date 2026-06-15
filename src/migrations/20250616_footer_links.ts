import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "footer_about_links" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"label" varchar,
   	"href" varchar
   );

   CREATE TABLE IF NOT EXISTS "footer_legal_links" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"label" varchar,
   	"href" varchar
   );

   DO $$ BEGIN
    ALTER TABLE "footer_about_links" ADD CONSTRAINT "footer_about_links_parent_id_fk"
     FOREIGN KEY ("_parent_id") REFERENCES "footer"("id") ON DELETE CASCADE;
   EXCEPTION WHEN duplicate_object THEN NULL;
   END $$;

   DO $$ BEGIN
    ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk"
     FOREIGN KEY ("_parent_id") REFERENCES "footer"("id") ON DELETE CASCADE;
   EXCEPTION WHEN duplicate_object THEN NULL;
   END $$;

   CREATE INDEX IF NOT EXISTS "footer_about_links_order_idx" ON "footer_about_links" ("_order");
   CREATE INDEX IF NOT EXISTS "footer_about_links_parent_id_idx" ON "footer_about_links" ("_parent_id");
   CREATE INDEX IF NOT EXISTS "footer_legal_links_order_idx" ON "footer_legal_links" ("_order");
   CREATE INDEX IF NOT EXISTS "footer_legal_links_parent_id_idx" ON "footer_legal_links" ("_parent_id");
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE IF EXISTS "footer_legal_links";
   DROP TABLE IF EXISTS "footer_about_links";
  `)
}
