'use client';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
    calculateTotal(stored);
  }, []);

  // Function to calculate the total price
  const calculateTotal = (cartItems: any[]) => {
    const total = cartItems.reduce((acc, item) => {
      // Ensure price is a number (remove the "$" symbol if it exists)
      const price = parseFloat(item.price.replace('$', ''));
      const quantity = item.quantity || 0; // Ensure quantity is a number
      return acc + price * quantity;
    }, 0);
    setTotalAmount(total);
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

      {/* Display when cart is empty */}
      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {/* List of items in the cart */}
          {cart.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                  <div className="text-lg font-semibold">${item.price} x {item.quantity}</div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="flex justify-between items-center text-lg font-semibold mt-6">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 text-center">
            <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
