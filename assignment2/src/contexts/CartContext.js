import { createContext, useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });

    toast.success(`${quantity} × "${product.title}" added to cart`);
  };

  const removeFromCart = (id) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    if (item) toast(`Removed "${item.title}" from cart`);
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    const item = cartItems.find((i) => i.id === id);
    if (item)
      toast.success(`Updated "${item.title}" quantity to ${newQuantity}`);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-slideIn" : "animate-slideOut"
        } flex items-center gap-3 bg-red-600 text-white px-5 py-3 rounded-lg shadow-lg`}
      >
        <TrashIcon className="h-6 w-6 animate-pulse" />
        <span className="font-medium">Cart cleared!</span>
      </div>
    ));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
