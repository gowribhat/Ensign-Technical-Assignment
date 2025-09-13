import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import MessageScreen from "../components/MessageScreen";
import NumberSelector from "../components/NumberSelector";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 100 ? 0 : 5.99; // free delivery over $100
  const taxRate = 0.09; // 9% GST assumption
  const tax = subtotal * taxRate;
  const totalAmount = subtotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <MessageScreen
          icon={<FaceFrownIcon className="w-20 h-20 mx-auto text-stone-500" />}
          title="Your cart is empty"
          description="Looks like you haven't made your choice yet!"
          callToAction={{ label: "Start Shopping", link: "/" }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl md:text-5xl font-serif text-amber-900 mb-6 flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-amber-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M17 13l1.2 6M6 19h12"
          />
        </svg>
        Your Cart
      </h2>
      <hr className="border-t border-amber-200 mb-8 w-32" />

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-md transition"
            >
              <Link
                to={`/products/${item.id}`}
                className="flex items-center gap-4 flex-1"
              >
                <div className="w-24 h-24 flex items-center justify-center bg-white p-2 rounded-md shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-playfair text-lg">{item.title}</h3>
                  <span className="text-neutral-700">${item.price}</span>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <NumberSelector
                  value={item.quantity}
                  onChange={(newQty) => updateQuantity(item.id, newQty)}
                />
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="lg:w-96 bg-stone-50 p-6 h-fit lg:sticky lg:top-24">
          <h3 className="text-2xl font-semibold mb-6 border-b border-stone-300 pb-2">
            Order Summary
          </h3>

          <div className="flex flex-col gap-2 mb-6">
            {cartItems.map((item, idx) => (
              <div
                key={item.id}
                className={`grid grid-cols-[2fr_1fr_1fr] items-center p-2 ${
                  idx % 2 === 0 ? "bg-stone-200" : "bg-stone-100"
                }`}
              >
                <span className="text-sm text-neutral-700">{item.title}</span>
                <span className="text-center text-sm text-neutral-700">
                  {item.quantity}
                </span>
                <span className="text-right text-sm font-medium text-neutral-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-stone-300 pt-4 mb-4 text-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (9%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="flex flex-col items-end">
                    <span className="line-through text-red-500">
                      ${(5.99).toFixed(2)}
                    </span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </span>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-amber-800 border-t border-stone-200 pt-2">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-amber-900 text-rose-100 py-3 rounded-lg font-semibold hover:bg-amber-800 transition mb-2">
            Proceed to Checkout
          </button>
          <button
            onClick={clearCart}
            className="w-full bg-stone-200 text-neutral-700 py-3 rounded-lg font-medium hover:bg-stone-300 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
