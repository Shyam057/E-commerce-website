import { updateCartItem } from "@/backend/store";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const cart = updateCartItem(id, body.quantity);

  return Response.json({ cart });
}
