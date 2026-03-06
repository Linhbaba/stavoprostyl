# Nasazení - Railway + Cloudflare

## Lokální vývoj

```bash
# 1. Spustit PostgreSQL
docker compose up -d

# 2. Spustit dev server (port 3013)
npm run dev

# Frontend: http://localhost:3013
# Admin panel: http://localhost:3013/admin
```

Při prvním přístupu na `/admin` se zobrazí formulář pro vytvoření prvního admin uživatele.

---

## Railway

### 1. Vytvořit projekt

1. Přihlásit se na [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo** → vybrat `Linhbaba/stavoprostyl`
3. Railway automaticky detekuje Dockerfile

### 2. Přidat PostgreSQL

1. V projektu kliknout **+ New** → **Database** → **PostgreSQL**
2. Railway automaticky vytvoří `DATABASE_URL` proměnnou
3. V nastavení Next.js service přidat referenci: **Variables** → **Add Reference** → `DATABASE_URL` z PostgreSQL service

### 3. Nastavit environment variables

V Next.js service → **Variables** přidat:

| Proměnná | Hodnota |
|---|---|
| `DATABASE_URL` | *(reference z PostgreSQL service)* |
| `PAYLOAD_SECRET` | *(vygenerovat: `openssl rand -hex 32`)* |
| `R2_BUCKET` | `stavoprostyl-media` |
| `R2_ACCESS_KEY_ID` | *(z Cloudflare - viz níže)* |
| `R2_SECRET_ACCESS_KEY` | *(z Cloudflare - viz níže)* |
| `R2_ENDPOINT` | `https://<account-id>.r2.cloudflarestorage.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://stavoprostyl.cz` |

### 4. Deploy

Railway automaticky buildne a nasadí po každém push do `main`.

---

## Cloudflare

### R2 Storage (free tier: 10 GB, 1M requests/měsíc)

1. Přihlásit se na [dash.cloudflare.com](https://dash.cloudflare.com)
2. **R2 Object Storage** → **Create bucket**
   - Název: `stavoprostyl-media`
   - Region: Auto
3. **Manage R2 API Tokens** → **Create API Token**
   - Permissions: **Object Read & Write**
   - Specify bucket: `stavoprostyl-media`
4. Zkopírovat **Access Key ID**, **Secret Access Key** a **Endpoint** do Railway env vars

### DNS

1. **Websites** → **Add a site** → zadat doménu (např. `stavoprostyl.cz`)
2. Změnit nameservery u registrátora domény na Cloudflare NS
3. Po aktivaci přidat DNS záznam:
   - **Type:** CNAME
   - **Name:** `@` (nebo `www`)
   - **Target:** Railway deployment URL (najdeš v Railway → **Settings** → **Domains** → **Generate Domain**)
   - **Proxy:** zapnuto (oranžový mráček) → CDN + SSL
4. V Railway: **Settings** → **Domains** → **Custom Domain** → přidat `stavoprostyl.cz`

### Volitelně: R2 Custom Domain pro média

1. V R2 bucket → **Settings** → **Public access** → **Custom Domain**
2. Přidat subdoménu, např. `media.stavoprostyl.cz`
3. Cloudflare automaticky přidá DNS záznam

---

## Užitečné příkazy

```bash
# Lokální PostgreSQL
docker compose up -d       # spustit
docker compose down        # zastavit
docker compose logs -f     # logy

# Payload CLI
npx payload migrate:create  # vytvořit migraci
npx payload migrate         # spustit migrace
```
