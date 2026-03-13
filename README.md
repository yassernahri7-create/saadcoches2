# NourCoches Deployment

This project is prepared for the same Coolify pattern used on the other apps:
- public website service
- separate admin service with server-side authentication
- shared persisted storage for `db.json` and uploads
- GitHub Actions -> Coolify auto deploy

## Local development

```bash
npm install
npm run dev:all
```

Services:
- Vite: `http://localhost:5173`
- Website API/server: `http://localhost:3003`
- Admin API/server: `http://localhost:3103/admin`

## Production domains

- Website: `https://nourcoches.ibnbatoutaweb.com`
- Admin: `https://admin.nourcoches.ibnbatoutaweb.com/admin`

## Environment variables

See [.env.example](./.env.example).

Required in Coolify:
- `WEBSITE_PORT=3003`
- `ADMIN_PORT=3103`
- `ADMIN_USER=admin`
- `ADMIN_PASS=<strong-password>`
- `COOKIE_SECURE=true`
- `DATA_FILE=/app/storage/db.json`
- `UPLOADS_DIR=/app/storage/uploads`

## Security changes

- admin credentials are no longer stored in `backend/db.json`
- public `GET /api/data` strips admin-only fields
- admin writes and uploads require a real server session cookie
- the public server does not expose the admin UI route

## Automation

Add GitHub repository secrets:
- `COOLIFY_WEBHOOK_PROD`
- `COOLIFY_TOKEN_PROD`

Then pushes to `main` trigger deployment automatically.
