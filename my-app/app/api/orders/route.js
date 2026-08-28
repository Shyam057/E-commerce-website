import { createOrder, listOrders } from "@/backend/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ orders: listOrders() });
}

export async function POST(request) {
  const body = await request.json();
  const order = createOrder(body);

  if (!order) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  return Response.json({ order, orders: listOrders() }, { status: 201 });
}
