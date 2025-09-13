import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-amber-900 text-taupe px-6 py-4 flex items-center justify-between text-rose-200 relative">
      <Link to="/" className="flex-shrink-0 ml-4">
        <div className="relative flex flex-col items-center leading-none">
          <span className="absolute text-7xl font-playfair text-rose-300/50 select-none">
            &amp;
          </span>
          <span className="relative font-playfair text-3xl text-rose-200 tracking-wide -ml-12">
            Olive
          </span>
          <span className="relative font-playfair text-3xl text-rose-200 tracking-wide ml-12">
            Oak
          </span>
        </div>
      </Link>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-1/3">
        <input
          type="text"
          placeholder="Search any product..."
          className="w-full rounded-lg px-4 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>

      <Link to="/cart" className="flex-shrink-0 mr-4">
        <div className="relative hover:text-rose-300 cursor-pointer transition">
          <ShoppingCartIcon className="w-8 h-8" />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-300 text-amber-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transition-transform">
              {totalQuantity}
            </span>
          )}
        </div>
      </Link>
    </nav>
  );
}
