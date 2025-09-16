import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MessageScreen from "../components/MessageScreen";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Unable to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <MessageScreen loading text="Loading products..." />;
  }

  if (error) {
    return (
      <MessageScreen
        icon={
          <ExclamationTriangleIcon className="w-20 h-20 mx-auto text-amber-600" />
        }
        title="Unable to load products"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-serif text-amber-900 mb-8">
          Our Products
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white border border-stone-200 shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105 p-4 flex flex-col cursor-pointer"
            >
              <div className="h-36 flex items-center justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full object-contain"
                />
              </div>
              <h2 className="font-playfair text-lg font-bold text-amber-900 mb-2 line-clamp-2">
                {product.title}
              </h2>
              <div className="mt-auto text-lg font-semibold text-green-700">
                ${product.price.toFixed(2)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
