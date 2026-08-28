import { getSellerStats } from "@/backend/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ stats: getSellerStats() });
}
