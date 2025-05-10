// app/api/discount/stats/route.ts
import { db } from '@/app/lib/store';

export async function GET() {
  const items = db.orders.flatMap(o => o.items);
  const totalPurchaseAmount = db.orders.reduce((sum, o) => sum + o.total, 0);
  const totalDiscount = db.orders.reduce((sum, o) => sum + o.discountApplied, 0);

  return Response.json({
    itemsCount: items.length,
    totalPurchaseAmount,
    totalDiscount,
    discountCodes: db.discountCodes,
  });
}
