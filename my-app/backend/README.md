# Backend

This folder contains server-side business logic.

## Main File

- `store.js`: temporary in-memory backend for products, cart, orders, checkout, and seller stats.

## API Entry Points

Next.js requires route handlers inside `app/api`, so those files are the public backend URLs. They call functions from this `backend/` folder.

## Current API Routes

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/cart`
- `POST /api/cart`
- `PATCH /api/cart/:id`
- `DELETE /api/cart`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/seller/stats`

## Important

This backend currently stores data in memory. Data resets when the server restarts. For production, replace `store.js` with database queries.
