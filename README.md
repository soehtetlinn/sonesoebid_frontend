This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. (Optional) Backend: see `server/` for Postgres + Prisma API. Create a database, copy `server/.env.example` to `server/.env`, then run `npm run prisma:migrate` and `npm run start` inside `server/`.
3. Run the app:
   `npm run dev`

## Deploy (Netlify)

- Base directory: `sonesoebid_frontend`
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Env vars:
  - `VITE_API_URL` = `https://sonesoebid-server.onrender.com`

You can copy `.env.production.example` to your Netlify environment variables.