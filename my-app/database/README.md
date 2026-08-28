# Database

This folder documents the database design for the real full-stack version.

## Current Status

The app does not use a real database yet. It uses `backend/store.js` as a temporary in-memory store so the frontend and backend can work immediately.

## Recommended Production Database

Use PostgreSQL with Prisma.

## Main Schema File

- `schema.sql`: starter SQL tables for users, sellers, products, carts, orders, payments, and reviews.

## Next Database Step

Install Prisma and connect PostgreSQL:

```bash
pnpm add prisma @prisma/client
pnpm exec prisma init
```

Then move the table design from `schema.sql` into `prisma/schema.prisma`.
