# Frontend

This folder contains the customer-facing user interface.

## Main File

- `components/Storefront.jsx`: marketplace homepage, search, category filter, product cards, cart drawer, checkout flow, orders panel, and seller stats display.

## How It Talks To Backend

The frontend uses `fetch()` to call these API routes:

- `/api/products`
- `/api/cart`
- `/api/orders`
- `/api/seller/stats`

Next.js still needs `app/page.js`, so that file simply loads the storefront component from this folder.
