import { addCartItem, clearCart, getCart } from "@/backend/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ cart: getCart() });
}

export async function POST(request) {
  const body = await request.json();
  const cart = addCartItem(body.productId);

  if (!cart) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json({ cart }, { status: 201 });
}

export async function DELETE() {
  return Response.json({ cart: clearCart() });
}
