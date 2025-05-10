// app/api/cart/get/route.ts
import { db } from '@/lib/store';

export async function GET() {
  return Response.json(db.cart);
}
