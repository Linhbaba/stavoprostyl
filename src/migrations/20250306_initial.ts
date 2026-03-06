import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE public.enum_homepage_services_items_accent_color AS ENUM ('primary-red', 'blue');
    CREATE TYPE public.enum_pages_status AS ENUM ('draft', 'published');
    CREATE TYPE public.enum_posts_status AS ENUM ('draft', 'published');
    CREATE TYPE public.enum_projects_category AS ENUM ('vystavba', 'rekonstrukce', 'navrh', 'poradenstvi');
    CREATE TYPE public.enum_projects_status AS ENUM ('draft', 'published');
    CREATE TYPE public.enum_users_role AS ENUM ('admin', 'editor');

    CREATE TABLE public.users (
      id integer NOT NULL,
      name character varying,
      role public.enum_users_role DEFAULT 'editor',
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      email character varying NOT NULL,
      reset_password_token character varying,
      reset_password_expiration timestamp(3) with time zone,
      salt character varying,
      hash character varying,
      login_attempts numeric DEFAULT 0,
      lock_until timestamp(3) with time zone
    );
    CREATE SEQUENCE public.users_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
    ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

    CREATE TABLE public.users_sessions (
      _order integer NOT NULL,
      _parent_id integer NOT NULL,
      id character varying NOT NULL,
      created_at timestamp(3) with time zone,
      expires_at timestamp(3) with time zone NOT NULL
    );

    CREATE TABLE public.media (
      id integer NOT NULL,
      alt character varying NOT NULL,
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      url character varying,
      thumbnail_u_r_l character varying,
      filename character varying,
      mime_type character varying,
      filesize numeric,
      width numeric,
      height numeric,
      focal_x numeric,
      focal_y numeric,
      sizes_thumbnail_url character varying,
      sizes_thumbnail_width numeric,
      sizes_thumbnail_height numeric,
      sizes_thumbnail_mime_type character varying,
      sizes_thumbnail_filesize numeric,
      sizes_thumbnail_filename character varying,
      sizes_card_url character varying,
      sizes_card_width numeric,
      sizes_card_height numeric,
      sizes_card_mime_type character varying,
      sizes_card_filesize numeric,
      sizes_card_filename character varying,
      sizes_hero_url character varying,
      sizes_hero_width numeric,
      sizes_hero_height numeric,
      sizes_hero_mime_type character varying,
      sizes_hero_filesize numeric,
      sizes_hero_filename character varying
    );
    CREATE SEQUENCE public.media_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;
    ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);

    CREATE TABLE public.pages (
      id integer NOT NULL,
      title character varying NOT NULL,
      slug character varying NOT NULL,
      content jsonb,
      meta_title character varying,
      meta_description character varying,
      status public.enum_pages_status DEFAULT 'draft',
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE SEQUENCE public.pages_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;
    ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);

    CREATE TABLE public.posts (
      id integer NOT NULL,
      title character varying NOT NULL,
      slug character varying NOT NULL,
      excerpt character varying,
      featured_image_id integer,
      content jsonb,
      author_id integer,
      published_at timestamp(3) with time zone,
      status public.enum_posts_status DEFAULT 'draft',
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE SEQUENCE public.posts_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
    ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);

    CREATE TABLE public.projects (
      id integer NOT NULL,
      title character varying NOT NULL,
      slug character varying NOT NULL,
      category public.enum_projects_category,
      year numeric,
      location character varying,
      description jsonb,
      featured_image_id integer,
      status public.enum_projects_status DEFAULT 'draft',
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE SEQUENCE public.projects_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;
    ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);

    CREATE TABLE public.projects_gallery (
      _order integer NOT NULL,
      _parent_id integer NOT NULL,
      id character varying NOT NULL,
      image_id integer NOT NULL,
      caption character varying
    );

    CREATE TABLE public.homepage (
      id integer NOT NULL,
      about_heading character varying DEFAULT 'Kdo jsme',
      about_text character varying,
      about_image_id integer,
      about_button_text character varying DEFAULT 'Zjistit více o nás',
      about_button_link character varying DEFAULT '/o-nas',
      services_heading character varying DEFAULT 'Naše služby',
      services_subtitle character varying,
      references_heading character varying DEFAULT 'Naše reference',
      references_subtitle character varying,
      partners_heading character varying DEFAULT 'Spolupracujeme s nejlepšími',
      cta_heading character varying,
      cta_subtitle character varying,
      updated_at timestamp(3) with time zone,
      created_at timestamp(3) with time zone
    );
    CREATE SEQUENCE public.homepage_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.homepage_id_seq OWNED BY public.homepage.id;
    ALTER TABLE ONLY public.homepage ALTER COLUMN id SET DEFAULT nextval('public.homepage_id_seq'::regclass);

    CREATE TABLE public.homepage_hero_slides (
      _order integer NOT NULL,
      _parent_id integer NOT NULL,
      id character varying NOT NULL,
      title character varying NOT NULL,
      subtitle character varying,
      image_id integer NOT NULL
    );

    CREATE TABLE public.homepage_services_items (
      _order integer NOT NULL,
      _parent_id integer NOT NULL,
      id character varying NOT NULL,
      title character varying NOT NULL,
      description character varying,
      image_id integer,
      link character varying,
      accent_color public.enum_homepage_services_items_accent_color DEFAULT 'blue'
    );

    CREATE TABLE public.homepage_partners_items (
      _order integer NOT NULL,
      _parent_id integer NOT NULL,
      id character varying NOT NULL,
      name character varying NOT NULL,
      logo_id integer NOT NULL,
      url character varying
    );

    CREATE TABLE public.homepage_rels (
      id integer NOT NULL,
      "order" integer,
      parent_id integer NOT NULL,
      path character varying NOT NULL,
      projects_id integer
    );
    CREATE SEQUENCE public.homepage_rels_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.homepage_rels_id_seq OWNED BY public.homepage_rels.id;
    ALTER TABLE ONLY public.homepage_rels ALTER COLUMN id SET DEFAULT nextval('public.homepage_rels_id_seq'::regclass);

    CREATE TABLE public.payload_kv (
      id integer NOT NULL,
      key character varying NOT NULL,
      data jsonb NOT NULL
    );
    CREATE SEQUENCE public.payload_kv_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;
    ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);

    CREATE TABLE public.payload_locked_documents (
      id integer NOT NULL,
      global_slug character varying,
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE SEQUENCE public.payload_locked_documents_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;
    ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);

    CREATE TABLE public.payload_locked_documents_rels (
      id integer NOT NULL,
      "order" integer,
      parent_id integer NOT NULL,
      path character varying NOT NULL,
      users_id integer,
      media_id integer,
      pages_id integer,
      posts_id integer,
      projects_id integer
    );
    CREATE SEQUENCE public.payload_locked_documents_rels_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;
    ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);

    CREATE TABLE public.payload_migrations (
      id integer NOT NULL,
      name character varying,
      batch numeric,
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE SEQUENCE public.payload_migrations_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;
    ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);

    CREATE TABLE public.payload_preferences (
      id integer NOT NULL,
      key character varying,
      value jsonb,
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE SEQUENCE public.payload_preferences_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;
    ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);

    CREATE TABLE public.payload_preferences_rels (
      id integer NOT NULL,
      "order" integer,
      parent_id integer NOT NULL,
      path character varying NOT NULL,
      users_id integer
    );
    CREATE SEQUENCE public.payload_preferences_rels_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;
    ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);

    -- Primary keys
    ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.users_sessions ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.media ADD CONSTRAINT media_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.pages ADD CONSTRAINT pages_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.posts ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.projects ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.projects_gallery ADD CONSTRAINT projects_gallery_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.homepage ADD CONSTRAINT homepage_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.homepage_hero_slides ADD CONSTRAINT homepage_hero_slides_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.homepage_services_items ADD CONSTRAINT homepage_services_items_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.homepage_partners_items ADD CONSTRAINT homepage_partners_items_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.homepage_rels ADD CONSTRAINT homepage_rels_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.payload_kv ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.payload_locked_documents ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.payload_migrations ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.payload_preferences ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.payload_preferences_rels ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);

    -- Indexes
    CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);
    CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);
    CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);
    CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);
    CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);
    CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);
    CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);
    CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);
    CREATE INDEX media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);
    CREATE INDEX media_sizes_card_sizes_card_filename_idx ON public.media USING btree (sizes_card_filename);
    CREATE INDEX media_sizes_hero_sizes_hero_filename_idx ON public.media USING btree (sizes_hero_filename);
    CREATE INDEX pages_created_at_idx ON public.pages USING btree (created_at);
    CREATE UNIQUE INDEX pages_slug_idx ON public.pages USING btree (slug);
    CREATE INDEX pages_updated_at_idx ON public.pages USING btree (updated_at);
    CREATE INDEX posts_author_idx ON public.posts USING btree (author_id);
    CREATE INDEX posts_created_at_idx ON public.posts USING btree (created_at);
    CREATE INDEX posts_featured_image_idx ON public.posts USING btree (featured_image_id);
    CREATE UNIQUE INDEX posts_slug_idx ON public.posts USING btree (slug);
    CREATE INDEX posts_updated_at_idx ON public.posts USING btree (updated_at);
    CREATE INDEX projects_created_at_idx ON public.projects USING btree (created_at);
    CREATE INDEX projects_featured_image_idx ON public.projects USING btree (featured_image_id);
    CREATE UNIQUE INDEX projects_slug_idx ON public.projects USING btree (slug);
    CREATE INDEX projects_updated_at_idx ON public.projects USING btree (updated_at);
    CREATE INDEX projects_gallery_image_idx ON public.projects_gallery USING btree (image_id);
    CREATE INDEX projects_gallery_order_idx ON public.projects_gallery USING btree (_order);
    CREATE INDEX projects_gallery_parent_id_idx ON public.projects_gallery USING btree (_parent_id);
    CREATE INDEX homepage_about_about_image_idx ON public.homepage USING btree (about_image_id);
    CREATE INDEX homepage_hero_slides_image_idx ON public.homepage_hero_slides USING btree (image_id);
    CREATE INDEX homepage_hero_slides_order_idx ON public.homepage_hero_slides USING btree (_order);
    CREATE INDEX homepage_hero_slides_parent_id_idx ON public.homepage_hero_slides USING btree (_parent_id);
    CREATE INDEX homepage_services_items_image_idx ON public.homepage_services_items USING btree (image_id);
    CREATE INDEX homepage_services_items_order_idx ON public.homepage_services_items USING btree (_order);
    CREATE INDEX homepage_services_items_parent_id_idx ON public.homepage_services_items USING btree (_parent_id);
    CREATE INDEX homepage_partners_items_logo_idx ON public.homepage_partners_items USING btree (logo_id);
    CREATE INDEX homepage_partners_items_order_idx ON public.homepage_partners_items USING btree (_order);
    CREATE INDEX homepage_partners_items_parent_id_idx ON public.homepage_partners_items USING btree (_parent_id);
    CREATE INDEX homepage_rels_order_idx ON public.homepage_rels USING btree ("order");
    CREATE INDEX homepage_rels_parent_idx ON public.homepage_rels USING btree (parent_id);
    CREATE INDEX homepage_rels_path_idx ON public.homepage_rels USING btree (path);
    CREATE INDEX homepage_rels_projects_id_idx ON public.homepage_rels USING btree (projects_id);
    CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);
    CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);
    CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);
    CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);
    CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);
    CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");
    CREATE INDEX payload_locked_documents_rels_pages_id_idx ON public.payload_locked_documents_rels USING btree (pages_id);
    CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);
    CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);
    CREATE INDEX payload_locked_documents_rels_posts_id_idx ON public.payload_locked_documents_rels USING btree (posts_id);
    CREATE INDEX payload_locked_documents_rels_projects_id_idx ON public.payload_locked_documents_rels USING btree (projects_id);
    CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);
    CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);
    CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);
    CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);
    CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);
    CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);
    CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");
    CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);
    CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);
    CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);

    -- Foreign keys
    ALTER TABLE ONLY public.users_sessions ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.posts ADD CONSTRAINT posts_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;
    ALTER TABLE ONLY public.posts ADD CONSTRAINT posts_featured_image_id_media_id_fk FOREIGN KEY (featured_image_id) REFERENCES public.media(id) ON DELETE SET NULL;
    ALTER TABLE ONLY public.projects ADD CONSTRAINT projects_featured_image_id_media_id_fk FOREIGN KEY (featured_image_id) REFERENCES public.media(id) ON DELETE SET NULL;
    ALTER TABLE ONLY public.projects_gallery ADD CONSTRAINT projects_gallery_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;
    ALTER TABLE ONLY public.projects_gallery ADD CONSTRAINT projects_gallery_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.projects(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.homepage ADD CONSTRAINT homepage_about_image_id_media_id_fk FOREIGN KEY (about_image_id) REFERENCES public.media(id) ON DELETE SET NULL;
    ALTER TABLE ONLY public.homepage_hero_slides ADD CONSTRAINT homepage_hero_slides_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;
    ALTER TABLE ONLY public.homepage_hero_slides ADD CONSTRAINT homepage_hero_slides_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.homepage_services_items ADD CONSTRAINT homepage_services_items_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;
    ALTER TABLE ONLY public.homepage_services_items ADD CONSTRAINT homepage_services_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.homepage_partners_items ADD CONSTRAINT homepage_partners_items_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;
    ALTER TABLE ONLY public.homepage_partners_items ADD CONSTRAINT homepage_partners_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.homepage_rels ADD CONSTRAINT homepage_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.homepage_rels ADD CONSTRAINT homepage_rels_projects_fk FOREIGN KEY (projects_id) REFERENCES public.projects(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_projects_fk FOREIGN KEY (projects_id) REFERENCES public.projects(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.payload_preferences_rels ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;
    ALTER TABLE ONLY public.payload_preferences_rels ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS public.homepage_rels CASCADE;
    DROP TABLE IF EXISTS public.homepage_partners_items CASCADE;
    DROP TABLE IF EXISTS public.homepage_services_items CASCADE;
    DROP TABLE IF EXISTS public.homepage_hero_slides CASCADE;
    DROP TABLE IF EXISTS public.homepage CASCADE;
    DROP TABLE IF EXISTS public.projects_gallery CASCADE;
    DROP TABLE IF EXISTS public.projects CASCADE;
    DROP TABLE IF EXISTS public.posts CASCADE;
    DROP TABLE IF EXISTS public.pages CASCADE;
    DROP TABLE IF EXISTS public.media CASCADE;
    DROP TABLE IF EXISTS public.users_sessions CASCADE;
    DROP TABLE IF EXISTS public.users CASCADE;
    DROP TABLE IF EXISTS public.payload_preferences_rels CASCADE;
    DROP TABLE IF EXISTS public.payload_preferences CASCADE;
    DROP TABLE IF EXISTS public.payload_migrations CASCADE;
    DROP TABLE IF EXISTS public.payload_locked_documents_rels CASCADE;
    DROP TABLE IF EXISTS public.payload_locked_documents CASCADE;
    DROP TABLE IF EXISTS public.payload_kv CASCADE;
    DROP TYPE IF EXISTS public.enum_homepage_services_items_accent_color;
    DROP TYPE IF EXISTS public.enum_pages_status;
    DROP TYPE IF EXISTS public.enum_posts_status;
    DROP TYPE IF EXISTS public.enum_projects_category;
    DROP TYPE IF EXISTS public.enum_projects_status;
    DROP TYPE IF EXISTS public.enum_users_role;
  `)
}
