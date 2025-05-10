// app/api/checkout/route.ts
import { db, generateDiscountCode } from '@/app/lib/store';

export async function POST(req: Request) {
  const { discountCode, cart } = await req.json();

  if (!cart || !cart.length) {
    return Response.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const total = cart.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  let discountApplied = 0;

  if (discountCode) {
    const code = db.discountCodes.find(c => c.code === discountCode && !c.used);
    if (!code) {
      return Response.json({ error: 'Invalid or used discount code' }, { status: 400 });
    }
    discountApplied = total * 0.1;
    code.used = true;
  }

  db.orders.push({ items: cart, total, discountApplied });

  if (db.orders.length % db.nthOrder === 0) {
    db.discountCodes.push({ code: generateDiscountCode(), used: false });
  }

  return Response.json({ success: true, total, discountApplied });
}
