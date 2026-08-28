"use client";

import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Heart,
  Home,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Store,
  Truck,
  User,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const categories = [
  "All",
  "Mobiles",
  "Fashion",
  "Electronics",
  "Groceries",
  "Home",
  "Beauty",
  "Sports",
];

const products = [
  {
    id: 1,
    name: "Samsung Galaxy A56 5G",
    category: "Mobiles",
    price: 57999,
    oldPrice: 63999,
    rating: 4.8,
    sold: 1230,
    stock: 42,
    seller: "Kathmandu Mobile Hub",
    tag: "Mall",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Noise Cancellation Headphones",
    category: "Electronics",
    price: 8999,
    oldPrice: 12499,
    rating: 4.7,
    sold: 840,
    stock: 58,
    seller: "Tech Pasal",
    tag: "Flash",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Men's Streetwear Jacket",
    category: "Fashion",
    price: 3499,
    oldPrice: 4999,
    rating: 4.5,
    sold: 510,
    stock: 33,
    seller: "Thamel Fits",
    tag: "Hot",
    image:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Organic Grocery Combo Pack",
    category: "Groceries",
    price: 1899,
    oldPrice: 2499,
    rating: 4.6,
    sold: 321,
    stock: 74,
    seller: "Fresh Valley",
    tag: "Fresh",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Minimal Study Desk Lamp",
    category: "Home",
    price: 2299,
    oldPrice: 2999,
    rating: 4.4,
    sold: 214,
    stock: 25,
    seller: "Urban Home Nepal",
    tag: "New",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Hydrating Skincare Set",
    category: "Beauty",
    price: 2799,
    oldPrice: 3599,
    rating: 4.9,
    sold: 667,
    stock: 49,
    seller: "Glow Store",
    tag: "Top",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Smart Fitness Watch",
    category: "Sports",
    price: 6999,
    oldPrice: 9499,
    rating: 4.5,
    sold: 398,
    stock: 29,
    seller: "Active Nepal",
    tag: "Deal",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "4K Action Camera Kit",
    category: "Electronics",
    price: 11999,
    oldPrice: 15999,
    rating: 4.3,
    sold: 176,
    stock: 17,
    seller: "Gadgetmandu",
    tag: "Bundle",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
  },
];

const orders = [
  { id: "HMD-1024", item: "Samsung Galaxy A56 5G", status: "Packed", eta: "Tomorrow" },
  { id: "HMD-1021", item: "Hydrating Skincare Set", status: "Delivered", eta: "Completed" },
  { id: "HMD-1018", item: "Organic Grocery Combo Pack", status: "On the way", eta: "Today" },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(price);

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [productList, setProductList] = useState(products);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [checkoutStep, setCheckoutStep] = useState("Cart");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderList, setOrderList] = useState(orders);
  const [sellerStats, setSellerStats] = useState({
    productsListed: products.length,
    pendingOrders: 3,
    readyToShip: 2,
    monthlyRevenue: 845000,
  });

  useEffect(() => {
    async function loadStorefront() {
      const params = new URLSearchParams({
        category: selectedCategory,
        q: query,
        sort,
      });

      const [productsResponse, cartResponse, ordersResponse, statsResponse] =
        await Promise.all([
          fetch(`/api/products?${params.toString()}`),
          fetch("/api/cart"),
          fetch("/api/orders"),
          fetch("/api/seller/stats"),
        ]);

      const productsData = await productsResponse.json();
      const cartData = await cartResponse.json();
      const ordersData = await ordersResponse.json();
      const statsData = await statsResponse.json();

      setProductList(productsData.products || []);
      setCart(cartData.cart || []);
      setOrderList(ordersData.orders || []);
      setSellerStats(statsData.stats || sellerStats);
      setActiveProduct((current) => current || productsData.products?.[0]);
    }

    loadStorefront();
  }, [query, selectedCategory, sort]);

  const filteredProducts = useMemo(() => productList, [productList]);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const deliveryFee = cartTotal > 5000 || cartTotal === 0 ? 0 : 150;
  const grandTotal = cartTotal + deliveryFee;

  async function addToCart(product) {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    });
    const data = await response.json();

    setCart(data.cart || []);
    setCheckoutStep("Cart");
    setIsCartOpen(true);
  }

  async function updateQuantity(productId, change) {
    const item = cart.find((cartItem) => cartItem.id === productId);
    const nextQuantity = Math.max(0, (item?.quantity || 0) + change);

    const response = await fetch(`/api/cart/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: nextQuantity }),
    });
    const data = await response.json();

    setCart(data.cart || []);
  }

  function toggleWishlist(productId) {
    setWishlist((items) =>
      items.includes(productId)
        ? items.filter((item) => item !== productId)
        : [...items, productId]
    );
  }

  async function placeOrder() {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          name: "Demo Customer",
          city: "Kathmandu",
          phone: "98XXXXXXXX",
        },
        paymentMethod: "Cash on delivery",
      }),
    });

    if (!response.ok) return;

    const data = await response.json();
    const statsResponse = await fetch("/api/seller/stats");
    const statsData = await statsResponse.json();

    setOrderList(data.orders || []);
    setSellerStats(statsData.stats || sellerStats);
    setCart([]);
    setCheckoutStep("Placed");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#17202a]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">
          <div className="flex min-w-fit items-center gap-2">
            <div className="grid size-10 place-items-center rounded-md bg-[#f85606] text-white">
              <ShoppingBag className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-normal text-[#f85606]">
                hamro-mini-daraz
              </h1>
              <p className="text-xs font-medium text-slate-500">Nepal marketplace</p>
            </div>
          </div>

          <div className="hidden flex-1 items-center rounded-md border border-slate-200 bg-slate-50 px-3 md:flex">
            <Search className="size-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 flex-1 bg-transparent px-3 text-sm outline-none"
              placeholder="Search phones, fashion, groceries..."
            />
          </div>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            <button className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
              <Home className="mr-1 inline size-4" />
              Home
            </button>
            <button className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
              <Store className="mr-1 inline size-4" />
              Sellers
            </button>
            <button className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
              <User className="mr-1 inline size-4" />
              Account
            </button>
          </nav>

          <button
            aria-label="Open cart"
            onClick={() => setIsCartOpen(true)}
            className="relative grid size-11 place-items-center rounded-md bg-[#f85606] text-white shadow-sm shadow-orange-200"
          >
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#17202a] text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white md:hidden">
        <div className="mx-4 my-3 flex items-center rounded-md border border-slate-200 bg-slate-50 px-3">
          <Search className="size-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 flex-1 bg-transparent px-3 text-sm outline-none"
            placeholder="Search anything..."
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[230px_1fr_300px] lg:px-8">
          <aside className="hidden rounded-md border border-slate-200 bg-white p-3 lg:block">
            <h2 className="mb-3 text-sm font-bold text-slate-900">Categories</h2>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold ${
                    selectedCategory === category
                      ? "bg-orange-50 text-[#f85606]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}
                  <ChevronRight className="size-4" />
                </button>
              ))}
            </div>
          </aside>

          <div className="relative min-h-[360px] overflow-hidden rounded-md bg-[#17202a]">
            <img
              src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1600&q=80"
              alt="Online shopping products and payment counter"
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />
            <div className="relative flex min-h-[360px] flex-col justify-between p-5 text-white sm:p-8">
              <div className="max-w-xl">
                <p className="mb-3 inline-flex rounded-md bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  Mega Sale Live
                </p>
                <h2 className="max-w-lg text-3xl font-black leading-tight sm:text-5xl">
                  Everything you need, delivered across Nepal.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-100 sm:text-base">
                  Shop mobiles, fashion, groceries, home goods, beauty, sports gear,
                  and trusted local sellers in one marketplace.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["2.4k+", "daily orders"],
                  ["24 hr", "Kathmandu delivery"],
                  ["Verified", "seller network"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-md bg-white/15 p-3 backdrop-blur">
                    <p className="text-xl font-black">{value}</p>
                    <p className="text-xs font-semibold text-slate-100">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: Truck, title: "Express Delivery", text: "Live tracking and COD" },
              { icon: ShieldCheck, title: "Buyer Protection", text: "Returns and refunds" },
              { icon: WalletCards, title: "Pay Your Way", text: "Card, wallet, cash" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-md border border-slate-200 bg-white p-4">
                <Icon className="mb-3 size-6 text-[#f85606]" />
                <h3 className="text-sm font-black">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{text}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black">Shop By Category</h2>
            <p className="text-sm text-slate-500">Find products, add to cart, checkout, and track orders.</p>
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-slate-500" />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold outline-none"
            >
              <option value="popular">Most sold</option>
              <option value="rating">Best rating</option>
              <option value="price-low">Price low to high</option>
              <option value="price-high">Price high to low</option>
            </select>
          </div>
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`h-10 min-w-fit rounded-md border px-4 text-sm font-bold ${
                selectedCategory === category
                  ? "border-[#f85606] bg-[#f85606] text-white"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <button
                onClick={() => setActiveProduct(product)}
                className="block w-full text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#f85606] px-2 py-1 text-xs font-black text-white">
                    {product.tag}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    {product.category}
                  </p>
                  <h3 className="mt-1 min-h-11 text-sm font-black leading-5">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
                    <Star className="size-4 fill-current" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-slate-400">({product.sold} sold)</span>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-lg font-black text-[#f85606]">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-xs text-slate-400 line-through">
                        {formatPrice(product.oldPrice)}
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-slate-500">
                      {product.stock} left
                    </p>
                  </div>
                </div>
              </button>
              <div className="flex gap-2 border-t border-slate-100 p-3">
                <button
                  aria-label="Wishlist"
                  onClick={() => toggleWishlist(product.id)}
                  className={`grid size-10 place-items-center rounded-md border ${
                    wishlist.includes(product.id)
                      ? "border-rose-200 bg-rose-50 text-rose-500"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <Heart className="size-4" />
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="h-10 flex-1 rounded-md bg-[#f85606] px-4 text-sm font-black text-white hover:bg-[#e24f05]"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="rounded-md border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black">Order Process</h2>
              <p className="text-sm text-slate-500">Checkout, payment, packing, delivery, and returns.</p>
            </div>
            <ClipboardList className="size-6 text-[#f85606]" />
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {[
              ["Cart", ShoppingCart],
              ["Address", Home],
              ["Payment", CreditCard],
              ["Packed", PackageCheck],
              ["Delivered", BadgeCheck],
            ].map(([step, Icon], index) => (
              <button
                key={step}
                onClick={() => setCheckoutStep(step)}
                className={`rounded-md border p-3 text-left ${
                  checkoutStep === step
                    ? "border-[#f85606] bg-orange-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <Icon className="mb-4 size-5 text-[#f85606]" />
                <p className="text-xs font-bold text-slate-400">Step {index + 1}</p>
                <p className="text-sm font-black">{step}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black">My Orders</h2>
            <Bell className="size-5 text-[#f85606]" />
          </div>
          <div className="space-y-3">
            {orderList.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 p-3"
              >
                <div>
                  <p className="text-sm font-black">{order.id}</p>
                  <p className="text-sm text-slate-500">{order.item}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[#f85606]">{order.status}</p>
                  <p className="text-xs text-slate-500">{order.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-black">Seller Operations</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Vendors can manage products, inventory, promotions, order packing,
              shipping handoff, returns, and sales performance from one dashboard.
            </p>
            <button className="mt-5 rounded-md bg-[#17202a] px-5 py-3 text-sm font-black text-white">
              Open Seller Center
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Products Listed", sellerStats.productsListed],
              ["Pending Orders", sellerStats.pendingOrders],
              ["Ready To Ship", sellerStats.readyToShip],
              ["Monthly Revenue", formatPrice(sellerStats.monthlyRevenue)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeProduct && (
        <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="grid overflow-hidden rounded-md border border-slate-200 bg-white lg:grid-cols-[420px_1fr]">
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="h-full min-h-[320px] w-full object-cover"
            />
            <div className="p-5 lg:p-8">
              <p className="text-sm font-black uppercase text-[#f85606]">
                Selected Product
              </p>
              <h2 className="mt-2 text-3xl font-black">{activeProduct.name}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1 text-amber-500">
                  <Star className="size-4 fill-current" />
                  <b>{activeProduct.rating}</b>
                </span>
                <span className="text-slate-500">{activeProduct.sold} sold</span>
                <span className="rounded-md bg-emerald-50 px-2 py-1 font-bold text-emerald-700">
                  {activeProduct.seller}
                </span>
              </div>
              <p className="mt-5 text-3xl font-black text-[#f85606]">
                {formatPrice(activeProduct.price)}
              </p>
              <p className="text-sm text-slate-400 line-through">
                {formatPrice(activeProduct.oldPrice)}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["7 day return", "Warranty support", "Verified seller"].map((item) => (
                  <div key={item} className="rounded-md bg-slate-50 p-3 text-sm font-bold">
                    <BadgeCheck className="mb-2 size-4 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
              <button
                onClick={() => addToCart(activeProduct)}
                className="mt-6 h-12 rounded-md bg-[#f85606] px-6 text-sm font-black text-white hover:bg-[#e24f05]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </section>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40">
          <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <div>
                <h2 className="text-lg font-black">Shopping Cart</h2>
                <p className="text-sm text-slate-500">{checkoutStep} process</p>
              </div>
              <button
                aria-label="Close cart"
                onClick={() => setIsCartOpen(false)}
                className="grid size-9 place-items-center rounded-md border border-slate-200"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingCart className="mx-auto mb-3 size-10 text-slate-300" />
                    <p className="font-black">Your cart is empty</p>
                    <p className="text-sm text-slate-500">Add products to begin checkout.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[72px_1fr] gap-3 rounded-md border border-slate-200 p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-[72px] rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm font-black">{item.name}</p>
                        <p className="text-sm font-bold text-[#f85606]">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-md border border-slate-200">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="grid size-8 place-items-center"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="grid size-8 place-items-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="grid size-8 place-items-center"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <p className="text-sm font-black">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 p-4">
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <b>{formatPrice(cartTotal)}</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery</span>
                  <b>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</b>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-base">
                  <span className="font-black">Total</span>
                  <b className="text-[#f85606]">{formatPrice(grandTotal)}</b>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["Cart", "Address", "Payment"].map((step) => (
                  <button
                    key={step}
                    onClick={() => setCheckoutStep(step)}
                    className={`h-10 rounded-md border text-xs font-black ${
                      checkoutStep === step
                        ? "border-[#f85606] bg-orange-50 text-[#f85606]"
                        : "border-slate-200"
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
              <button
                disabled={cart.length === 0}
                onClick={() => {
                  if (checkoutStep === "Payment") {
                    placeOrder();
                    return;
                  }

                  setCheckoutStep(checkoutStep === "Cart" ? "Address" : "Payment");
                }}
                className="mt-3 h-12 w-full rounded-md bg-[#f85606] text-sm font-black text-white disabled:bg-slate-300"
              >
                {checkoutStep === "Payment" ? "Place Order" : "Continue Checkout"}
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
