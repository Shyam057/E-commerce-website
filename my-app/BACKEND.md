# hamro-mini-daraz Backend Notes

This project now has a starter full-stack backend using Next.js API route handlers.

## Clear Folder Structure

- `frontend/`: UI components and customer-facing screens.
- `backend/`: server-side business logic.
- `database/`: database plan and SQL schema.
- `app/`: Next.js routing layer. `app/page.js` loads the frontend, and `app/api` exposes backend endpoints.

## Current Backend

- `GET /api/products` lists products.
- `GET /api/products?category=Mobiles&q=samsung&sort=price-low` filters and sorts products.
- `GET /api/products/:id` returns one product.
- `GET /api/cart` returns cart items.
- `POST /api/cart` adds a product to the cart.
- `PATCH /api/cart/:id` updates cart quantity.
- `DELETE /api/cart` clears the cart.
- `GET /api/orders` lists orders.
- `POST /api/orders` creates an order from the cart.
- `GET /api/seller/stats` returns seller dashboard numbers.

## Example API Calls

```bash
curl http://localhost:3000/api/products
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":1}'
curl -X PATCH http://localhost:3000/api/cart/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity":2}'
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"paymentMethod":"Cash on delivery"}'
```

## Needed For A Real E-Commerce Website

1. Database: PostgreSQL, MySQL, or MongoDB for products, users, carts, orders, payments, reviews, and inventory.
2. ORM: Prisma or Drizzle to safely query the database.
3. Authentication: customer login, seller login, admin login, password reset, and protected routes.
4. Product management: seller product CRUD, categories, images, stock, SKUs, brands, variants, and pricing.
5. Cart and checkout: persistent user cart, address book, shipping fee rules, vouchers, tax, and order creation.
6. Payments: eSewa, Khalti, cards, wallet, bank transfer, and cash on delivery.
7. Delivery process: order status, packing, shipping, tracking, cancellation, return, refund, and notifications.
8. Admin panel: users, sellers, products, orders, disputes, reports, banners, and promotions.
9. File storage: Cloudinary, S3, or another storage service for product images.
10. Security: validation, rate limits, authorization checks, secure cookies, and audit logs.
11. Deployment: Vercel or VPS for the app, managed database, image storage, environment variables, and domain setup.

The current in-memory backend is good for learning and UI integration. For production, replace `backend/store.js` with database-backed functions.
