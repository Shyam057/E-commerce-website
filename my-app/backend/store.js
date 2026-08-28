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

let cart = [];

let orders = [
  { id: "HMD-1024", item: "Samsung Galaxy A56 5G", status: "Packed", eta: "Tomorrow", total: 57999 },
  { id: "HMD-1021", item: "Hydrating Skincare Set", status: "Delivered", eta: "Completed", total: 2799 },
  { id: "HMD-1018", item: "Organic Grocery Combo Pack", status: "On the way", eta: "Today", total: 1899 },
];

export function listProducts({ category = "All", q = "", sort = "popular" } = {}) {
  const search = q.trim().toLowerCase();
  const result = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesQuery =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.seller.toLowerCase().includes(search);

    return matchesCategory && matchesQuery;
  });

  return [...result].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return b.sold - a.sold;
  });
}

export function getProduct(id) {
  return products.find((product) => product.id === Number(id));
}

export function getCart() {
  return cart;
}

export function addCartItem(productId) {
  const product = getProduct(productId);

  if (!product) {
    return null;
  }

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    cart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
        : item
    );
  } else {
    cart = [...cart, { ...product, quantity: 1 }];
  }

  return cart;
}

export function updateCartItem(productId, quantity) {
  cart = cart
    .map((item) =>
      item.id === Number(productId)
        ? { ...item, quantity: Math.max(0, Math.min(Number(quantity), item.stock)) }
        : item
    )
    .filter((item) => item.quantity > 0);

  return cart;
}

export function clearCart() {
  cart = [];
  return cart;
}

export function listOrders() {
  return orders;
}

export function createOrder({ customer = {}, paymentMethod = "Cash on delivery" } = {}) {
  if (cart.length === 0) {
    return null;
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 150;
  const order = {
    id: `HMD-${Math.floor(1000 + Math.random() * 9000)}`,
    item: cart.length === 1 ? cart[0].name : `${cart.length} items`,
    status: "Placed",
    eta: "2-3 days",
    total: subtotal + deliveryFee,
    customer,
    paymentMethod,
    items: cart,
    createdAt: new Date().toISOString(),
  };

  orders = [order, ...orders];
  clearCart();

  return order;
}

export function getSellerStats() {
  const revenue = products.reduce((total, product) => total + product.price * 5, 0);

  return {
    productsListed: products.length,
    pendingOrders: orders.filter((order) => order.status !== "Delivered").length,
    readyToShip: orders.filter((order) => ["Placed", "Packed"].includes(order.status)).length,
    monthlyRevenue: revenue,
  };
}
