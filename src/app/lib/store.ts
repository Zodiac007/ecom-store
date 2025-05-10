// lib/store.ts
export type CartItem = { productId: string; name: string; price: number; quantity: number };
export type Order = { items: CartItem[]; total: number; discountApplied: number };
export type DiscountCode = { code: string; used: boolean };

export const db = {
  cart: [] as CartItem[],
  orders: [] as Order[],
  discountCodes: [] as DiscountCode[],
  nthOrder: 5,
};

export function generateDiscountCode(): string {
  return `DISCOUNT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

// export const products = [
//   { productId: '1', name: 'T-Shirt', price: 25 },
//   { productId: '2', name: 'Hat', price: 15 },
//   { productId: '3', name: 'Shoes', price: 50 },
// ];

export const products = [
    {
      id: 1,
      name: "Shoes",
      description: "This is the description for product 1",
      price: "$20",
      sizes: ["S", "M", "L"],
      colors: ["Red", "Blue", "Green"],
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png", // Product image from Unsplash
    },
    {
      id: 2,
      name: "Tshirts",
      description: "This is the description for product 2",
      price: "$25",
      sizes: ["M", "L", "XL"],
      colors: ["Black", "White"],
      image: "https://www.thewalkdeal.com/cdn/shop/products/Alone-NavyBlue.jpg?v=1640675727", // Product image from Unsplash
    },
    {
      id: 3,
      name: "Jeans",
      description: "This is the description for product 3",
      price: "$30",
      sizes: ["S", "L"],
      colors: ["Yellow", "Purple"],
      image: "https://www.realsimple.com/thmb/pylBi8okBliW5e5qvCQFWPQatoc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-denim-GettyImages-598820544-c87ecea4d6454e4a9184a35226c97735.jpg", // Product image from Unsplash
    },
  ];
  