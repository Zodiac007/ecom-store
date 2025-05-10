// app/api/cart/add/route.ts
import { db } from '@/lib/store';

export async function POST(req: Request) {
  const item = await req.json();
  const existing = db.cart.find(i => i.productId === item.productId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    db.cart.push(item);
  }
  return Response.json({ success: true });
}
