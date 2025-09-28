This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. (Optional) Backend: see `server/` for Postgres + Prisma API. Create a database, copy `server/.env.example` to `server/.env`, then run `npm run prisma:migrate` and `npm run start` inside `server/`.
3. Run the app:
   `npm run dev`
