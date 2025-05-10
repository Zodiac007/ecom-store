'use client';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [discountCode, setDiscountCode] = useState('');
  const [message, setMessage] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Function to calculate total
  const calculateTotal = (cartItems: any[]) => {
    const total = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      const quantity = item.quantity || 0;
      return acc + price * quantity;
    }, 0);
    setTotalAmount(total);
  };

  async function handleCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ discountCode, cart }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || 'Unknown error');
      return;
    }

    setMessage(`✅ Success! Total: $${data.total}, Discount: $${data.discountApplied}`);
    localStorage.removeItem('cart');
    setCart([]);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      {/* Cart Summary */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            cart.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || 'https://via.placeholder.com/100'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                    <div className="text-lg font-semibold">${item.price} x {item.quantity}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Discount Code Section */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Discount Code</label>
        <input
          type="text"
          placeholder="Enter discount code (optional)"
          value={discountCode}
          onChange={e => setDiscountCode(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Checkout Button */}
      <div className="mb-6 text-center">
        <button
          onClick={handleCheckout}
          className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Place Order
        </button>
      </div>

      {/* Success/Failure Message */}
      {message && (
        <p className={`text-center text-lg font-semibold mt-4 ${message.includes('Success') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
