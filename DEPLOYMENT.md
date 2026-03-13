# NourCoches Coolify Deployment

## Domains

- public site: `nourcoches.ibnbatoutaweb.com`
- admin site: `admin.nourcoches.ibnbatoutaweb.com`

## DNS

Add these records:
- `A nourcoches -> 85.31.239.111`
- `A admin.nourcoches -> 85.31.239.111`

## Coolify app settings

Create one application from `yassernahri7-create/rentalcars102` using `Docker Compose`.

Environment variables:
- `WEBSITE_PORT=3003`
- `ADMIN_PORT=3103`
- `PRODUCT_DOMAIN=nourcoches.ibnbatoutaweb.com`
- `ADMIN_DOMAIN=admin.nourcoches.ibnbatoutaweb.com`
- `ADMIN_USER=admin`
- `ADMIN_PASS=<strong-password>`
- `COOKIE_SECURE=true`
- `DATA_FILE=/app/storage/db.json`
- `UPLOADS_DIR=/app/storage/uploads`
- `DEV_FRONTEND_URL=http://localhost:5173`

## Domain assignment in Coolify

Use generated domains first. After that works, switch to:
- website: `https://nourcoches.ibnbatoutaweb.com:3003`
- admin: `https://admin.nourcoches.ibnbatoutaweb.com:3103`

## Storage

The app uses one persisted volume at `/app/storage`.
It contains:
- `db.json`
- uploaded images

The first deployment seeds storage from the repo copy of `backend/db.json` and `public/uploads/` so existing cars and images stay available.

## Auto deploy

GitHub Actions workflow already triggers Coolify if these repo secrets exist:
- `COOLIFY_WEBHOOK_PROD`
- `COOLIFY_TOKEN_PROD`
