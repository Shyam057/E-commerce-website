# hamro-mini-daraz

A Daraz-style full-stack e-commerce starter built with Next.js.

## Project Structure

```text
my-app/
  app/
    page.js              # Next.js page route, loads the frontend
    api/                 # Backend API route URLs
  frontend/
    components/          # UI and customer-facing screens
  backend/
    store.js             # Server-side business logic for now
  database/
    schema.sql           # Planned production database tables
  BACKEND.md             # Backend routes and production checklist
```

## Frontend

The frontend lives in `frontend/`.

Main file:

- `frontend/components/Storefront.jsx`

It contains the marketplace UI: products, search, categories, cart, checkout, orders, and seller stats.

## Backend

The backend route URLs live in `app/api/`, because that is how Next.js works.

The route files call logic from `backend/store.js`.

Available routes:

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/cart`
- `POST /api/cart`
- `PATCH /api/cart/:id`
- `DELETE /api/cart`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/seller/stats`

## Database

The database plan lives in `database/`.

Current file:

- `database/schema.sql`

The app is not connected to a real database yet. It uses an in-memory store in `backend/store.js`. For production, connect PostgreSQL with Prisma and replace the in-memory functions with real database queries.

## Run Locally

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
pnpm build
```
