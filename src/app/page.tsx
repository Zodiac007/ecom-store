'use client';
import { products } from '@/app/lib/store';

export default function ProductPage() {
  // Function to handle adding products to the cart
  function addToCart(productId: string) {
    const product = products.find(p => p.productId === productId);
    if (!product) return;

    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((i: any) => i.productId === productId);
    
    // Update cart with quantity or add new product
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart');
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={product.image || "https://via.placeholder.com/300"} // Fallback if no image is available
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <strong className="text-lg">{product.name}</strong>
              <div className="text-gray-700">{product.description}</div>
              <div className="text-xl font-semibold text-green-500">{product.price}</div>
              <button
                onClick={() => addToCart(product.productId)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
