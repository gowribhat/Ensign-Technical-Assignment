import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "react-hot-toast";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <header className="h-fit flex-none">
          <Navbar />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Toaster position="bottom-left" toastOptions={{ duration: 1500 }} />
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
