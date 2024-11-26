import { type NextRequest } from "next/server";
import { products } from "./mock";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");
  console.log(category);

  if (category) {
    return Response.json(products.filter((p) => p.category === category));
  }

  return Response.json(products);
}
