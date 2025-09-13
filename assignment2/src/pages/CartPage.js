import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import MessageScreen from "../components/MessageScreen";
import NumberSelector from "../components/NumberSelector";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-playfair mb-8">Your Cart</h2>
      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 border-b"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-24 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-playfair text-lg">{item.title}</h3>
              <span className="text-neutral-700">${item.price}</span>
            </div>
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

        <div className="text-right mt-6">
          <p className="text-3xl font-bold text-amber-800 mb-2">
            Total: ${totalAmount.toFixed(2)}
          </p>

          <button
            onClick={clearCart}
            className="bg-beige px-6 py-3 rounded hover:bg-[#dcd3c6] transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
