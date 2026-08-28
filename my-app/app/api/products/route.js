import { listProducts } from "@/backend/store";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const products = listProducts({
    category: searchParams.get("category") || "All",
    q: searchParams.get("q") || "",
    sort: searchParams.get("sort") || "popular",
  });

  return Response.json({ products });
}
