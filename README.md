## Setup
1. Install dependencies: `cd listings-api && npm install` and `cd listings-fe && npm install`
2. Create `listings-api/.env` with `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/propertylistings` and `APP_PORT=4000`
3. Create `listings-fe/.env.local` with `NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost` and `NEXT_PUBLIC_BACKEND_API_PORT=4000`

## Database
4. Start Postgres and create the database: `psql -U postgres -c "CREATE DATABASE propertylistings"`
5. Run migrations: `cd listings-api && npm run migrate`
6. Seed data: `cd listings-api && npm run seed`

## Running
7. Start backend: `cd listings-api && npm run dev` → http://localhost:4000
8. Start frontend: `cd listings-fe && npm run dev` → http://localhost:3000

## Tests
9. `cd listings-api && npm test`

## Example API calls
10. `curl http://localhost:3000/listings` and `curl -H "x-role: admin" "http://localhost:3000/listings?suburb=Northside&price_min=500000"`
