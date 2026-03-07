--
-- PostgreSQL database dump
--

\restrict 8KwKy1rGf4zTQ8lHcXW95rN1AX6ShM7K6mPK0bkKf4F465cXwLkAQ1rgp4ly9GY

-- Dumped from database version 17.9
-- Dumped by pg_dump version 17.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_homepage_services_items_accent_color; Type: TYPE; Schema: public; Owner: stavoprostyl
--

CREATE TYPE public.enum_homepage_services_items_accent_color AS ENUM (
    'primary-red',
    'blue'
);


ALTER TYPE public.enum_homepage_services_items_accent_color OWNER TO stavoprostyl;

--
-- Name: enum_pages_status; Type: TYPE; Schema: public; Owner: stavoprostyl
--

CREATE TYPE public.enum_pages_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_pages_status OWNER TO stavoprostyl;

--
-- Name: enum_projects_category; Type: TYPE; Schema: public; Owner: stavoprostyl
--

CREATE TYPE public.enum_projects_category AS ENUM (
    'vystavba',
    'rekonstrukce',
    'navrh',
    'poradenstvi'
);


ALTER TYPE public.enum_projects_category OWNER TO stavoprostyl;

--
-- Name: enum_projects_status; Type: TYPE; Schema: public; Owner: stavoprostyl
--

CREATE TYPE public.enum_projects_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_projects_status OWNER TO stavoprostyl;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: stavoprostyl
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'editor'
);


ALTER TYPE public.enum_users_role OWNER TO stavoprostyl;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: footer; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.footer (
    id integer NOT NULL,
    company_description character varying DEFAULT 'Stavební firma zaměřená na kvalitu, inovace a spokojenost zákazníků. Již více než 15 let realizujeme vaše stavební projekty.'::character varying,
    contact_company_name character varying DEFAULT 'Stavopro Styl s.r.o.'::character varying,
    contact_street character varying DEFAULT 'Stavební 1234/5'::character varying,
    contact_city character varying DEFAULT '123 45 Praha'::character varying,
    contact_phone character varying DEFAULT '+420 777 888 999'::character varying,
    contact_email character varying DEFAULT 'info@stavoprostyl.cz'::character varying,
    disclaimer_copyright character varying DEFAULT 'Stavopro Styl s.r.o. Všechna práva vyhrazena.'::character varying,
    disclaimer_ic character varying DEFAULT '12345678'::character varying,
    disclaimer_dic character varying DEFAULT 'CZ12345678'::character varying,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


ALTER TABLE public.footer OWNER TO stavoprostyl;

--
-- Name: footer_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.footer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.footer_id_seq OWNER TO stavoprostyl;

--
-- Name: footer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.footer_id_seq OWNED BY public.footer.id;


--
-- Name: homepage; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.homepage (
    id integer NOT NULL,
    about_heading character varying DEFAULT 'Kdo jsme'::character varying,
    about_text character varying,
    about_image_id integer,
    about_button_text character varying DEFAULT 'Zjistit více o nás'::character varying,
    about_button_link character varying DEFAULT '/o-nas'::character varying,
    services_heading character varying DEFAULT 'Naše služby'::character varying,
    services_subtitle character varying,
    references_heading character varying DEFAULT 'Naše reference'::character varying,
    references_subtitle character varying,
    partners_heading character varying DEFAULT 'Spolupracujeme s nejlepšími'::character varying,
    cta_heading character varying,
    cta_subtitle character varying,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone,
    meta_title character varying,
    meta_description character varying
);


ALTER TABLE public.homepage OWNER TO stavoprostyl;

--
-- Name: homepage_hero_slides; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.homepage_hero_slides (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    title character varying NOT NULL,
    subtitle character varying,
    image_id integer NOT NULL
);


ALTER TABLE public.homepage_hero_slides OWNER TO stavoprostyl;

--
-- Name: homepage_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.homepage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.homepage_id_seq OWNER TO stavoprostyl;

--
-- Name: homepage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.homepage_id_seq OWNED BY public.homepage.id;


--
-- Name: homepage_partners_items; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.homepage_partners_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    name character varying NOT NULL,
    logo_id integer NOT NULL,
    url character varying
);


ALTER TABLE public.homepage_partners_items OWNER TO stavoprostyl;

--
-- Name: homepage_rels; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.homepage_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    projects_id integer
);


ALTER TABLE public.homepage_rels OWNER TO stavoprostyl;

--
-- Name: homepage_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.homepage_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.homepage_rels_id_seq OWNER TO stavoprostyl;

--
-- Name: homepage_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.homepage_rels_id_seq OWNED BY public.homepage_rels.id;


--
-- Name: homepage_services_items; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.homepage_services_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    title character varying NOT NULL,
    description character varying,
    image_id integer,
    link character varying,
    accent_color public.enum_homepage_services_items_accent_color DEFAULT 'blue'::public.enum_homepage_services_items_accent_color
);


ALTER TABLE public.homepage_services_items OWNER TO stavoprostyl;

--
-- Name: media; Type: TABLE; Schema: public; Owner: stavoprostyl
--

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


ALTER TABLE public.media OWNER TO stavoprostyl;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_id_seq OWNER TO stavoprostyl;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: pages; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.pages (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    content jsonb,
    meta_title character varying,
    meta_description character varying,
    status public.enum_pages_status DEFAULT 'draft'::public.enum_pages_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.pages OWNER TO stavoprostyl;

--
-- Name: pages_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pages_id_seq OWNER TO stavoprostyl;

--
-- Name: pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


ALTER TABLE public.payload_kv OWNER TO stavoprostyl;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_kv_id_seq OWNER TO stavoprostyl;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_locked_documents OWNER TO stavoprostyl;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_id_seq OWNER TO stavoprostyl;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer,
    media_id integer,
    pages_id integer,
    projects_id integer
);


ALTER TABLE public.payload_locked_documents_rels OWNER TO stavoprostyl;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNER TO stavoprostyl;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_migrations OWNER TO stavoprostyl;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_migrations_id_seq OWNER TO stavoprostyl;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_preferences OWNER TO stavoprostyl;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_id_seq OWNER TO stavoprostyl;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


ALTER TABLE public.payload_preferences_rels OWNER TO stavoprostyl;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNER TO stavoprostyl;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    category public.enum_projects_category,
    year numeric,
    location character varying,
    description jsonb,
    featured_image_id integer,
    status public.enum_projects_status DEFAULT 'draft'::public.enum_projects_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    meta_title character varying,
    meta_description character varying
);


ALTER TABLE public.projects OWNER TO stavoprostyl;

--
-- Name: projects_gallery; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.projects_gallery (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL,
    caption character varying
);


ALTER TABLE public.projects_gallery OWNER TO stavoprostyl;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO stavoprostyl;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    role public.enum_users_role DEFAULT 'editor'::public.enum_users_role,
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


ALTER TABLE public.users OWNER TO stavoprostyl;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: stavoprostyl
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO stavoprostyl;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavoprostyl
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: stavoprostyl
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


ALTER TABLE public.users_sessions OWNER TO stavoprostyl;

--
-- Name: footer id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.footer ALTER COLUMN id SET DEFAULT nextval('public.footer_id_seq'::regclass);


--
-- Name: homepage id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage ALTER COLUMN id SET DEFAULT nextval('public.homepage_id_seq'::regclass);


--
-- Name: homepage_rels id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_rels ALTER COLUMN id SET DEFAULT nextval('public.homepage_rels_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: pages id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: footer footer_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.footer
    ADD CONSTRAINT footer_pkey PRIMARY KEY (id);


--
-- Name: homepage_hero_slides homepage_hero_slides_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_hero_slides
    ADD CONSTRAINT homepage_hero_slides_pkey PRIMARY KEY (id);


--
-- Name: homepage_partners_items homepage_partners_items_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_partners_items
    ADD CONSTRAINT homepage_partners_items_pkey PRIMARY KEY (id);


--
-- Name: homepage homepage_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage
    ADD CONSTRAINT homepage_pkey PRIMARY KEY (id);


--
-- Name: homepage_rels homepage_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_rels
    ADD CONSTRAINT homepage_rels_pkey PRIMARY KEY (id);


--
-- Name: homepage_services_items homepage_services_items_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_services_items
    ADD CONSTRAINT homepage_services_items_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: projects_gallery projects_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.projects_gallery
    ADD CONSTRAINT projects_gallery_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: homepage_about_about_image_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_about_about_image_idx ON public.homepage USING btree (about_image_id);


--
-- Name: homepage_hero_slides_image_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_hero_slides_image_idx ON public.homepage_hero_slides USING btree (image_id);


--
-- Name: homepage_hero_slides_order_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_hero_slides_order_idx ON public.homepage_hero_slides USING btree (_order);


--
-- Name: homepage_hero_slides_parent_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_hero_slides_parent_id_idx ON public.homepage_hero_slides USING btree (_parent_id);


--
-- Name: homepage_partners_items_logo_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_partners_items_logo_idx ON public.homepage_partners_items USING btree (logo_id);


--
-- Name: homepage_partners_items_order_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_partners_items_order_idx ON public.homepage_partners_items USING btree (_order);


--
-- Name: homepage_partners_items_parent_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_partners_items_parent_id_idx ON public.homepage_partners_items USING btree (_parent_id);


--
-- Name: homepage_rels_order_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_rels_order_idx ON public.homepage_rels USING btree ("order");


--
-- Name: homepage_rels_parent_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_rels_parent_idx ON public.homepage_rels USING btree (parent_id);


--
-- Name: homepage_rels_path_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_rels_path_idx ON public.homepage_rels USING btree (path);


--
-- Name: homepage_rels_projects_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_rels_projects_id_idx ON public.homepage_rels USING btree (projects_id);


--
-- Name: homepage_services_items_image_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_services_items_image_idx ON public.homepage_services_items USING btree (image_id);


--
-- Name: homepage_services_items_order_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_services_items_order_idx ON public.homepage_services_items USING btree (_order);


--
-- Name: homepage_services_items_parent_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX homepage_services_items_parent_id_idx ON public.homepage_services_items USING btree (_parent_id);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_sizes_card_sizes_card_filename_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX media_sizes_card_sizes_card_filename_idx ON public.media USING btree (sizes_card_filename);


--
-- Name: media_sizes_hero_sizes_hero_filename_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX media_sizes_hero_sizes_hero_filename_idx ON public.media USING btree (sizes_hero_filename);


--
-- Name: media_sizes_thumbnail_sizes_thumbnail_filename_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: pages_created_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX pages_created_at_idx ON public.pages USING btree (created_at);


--
-- Name: pages_slug_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE UNIQUE INDEX pages_slug_idx ON public.pages USING btree (slug);


--
-- Name: pages_updated_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX pages_updated_at_idx ON public.pages USING btree (updated_at);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_rels_pages_id_idx ON public.payload_locked_documents_rels USING btree (pages_id);


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_projects_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_rels_projects_id_idx ON public.payload_locked_documents_rels USING btree (projects_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: projects_created_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX projects_created_at_idx ON public.projects USING btree (created_at);


--
-- Name: projects_featured_image_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX projects_featured_image_idx ON public.projects USING btree (featured_image_id);


--
-- Name: projects_gallery_image_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX projects_gallery_image_idx ON public.projects_gallery USING btree (image_id);


--
-- Name: projects_gallery_order_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX projects_gallery_order_idx ON public.projects_gallery USING btree (_order);


--
-- Name: projects_gallery_parent_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX projects_gallery_parent_id_idx ON public.projects_gallery USING btree (_parent_id);


--
-- Name: projects_slug_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE UNIQUE INDEX projects_slug_idx ON public.projects USING btree (slug);


--
-- Name: projects_updated_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX projects_updated_at_idx ON public.projects USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: stavoprostyl
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: homepage homepage_about_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage
    ADD CONSTRAINT homepage_about_image_id_media_id_fk FOREIGN KEY (about_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: homepage_hero_slides homepage_hero_slides_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_hero_slides
    ADD CONSTRAINT homepage_hero_slides_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: homepage_hero_slides homepage_hero_slides_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_hero_slides
    ADD CONSTRAINT homepage_hero_slides_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;


--
-- Name: homepage_partners_items homepage_partners_items_logo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_partners_items
    ADD CONSTRAINT homepage_partners_items_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: homepage_partners_items homepage_partners_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_partners_items
    ADD CONSTRAINT homepage_partners_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;


--
-- Name: homepage_rels homepage_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_rels
    ADD CONSTRAINT homepage_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;


--
-- Name: homepage_rels homepage_rels_projects_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_rels
    ADD CONSTRAINT homepage_rels_projects_fk FOREIGN KEY (projects_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: homepage_services_items homepage_services_items_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_services_items
    ADD CONSTRAINT homepage_services_items_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: homepage_services_items homepage_services_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.homepage_services_items
    ADD CONSTRAINT homepage_services_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_projects_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_projects_fk FOREIGN KEY (projects_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: projects projects_featured_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_featured_image_id_media_id_fk FOREIGN KEY (featured_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: projects_gallery projects_gallery_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.projects_gallery
    ADD CONSTRAINT projects_gallery_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: projects_gallery projects_gallery_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.projects_gallery
    ADD CONSTRAINT projects_gallery_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: stavoprostyl
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 8KwKy1rGf4zTQ8lHcXW95rN1AX6ShM7K6mPK0bkKf4F465cXwLkAQ1rgp4ly9GY

