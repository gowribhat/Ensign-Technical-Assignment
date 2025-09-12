import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MessageScreen from "../components/MessageScreen";

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
        title="Unable to load products"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-playfair text-center mb-8 text-neutral-800">
        Our Products
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-cream rounded-lg shadow hover:shadow-lg transition duration-300 p-4 flex flex-col cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mb-4"
            />
            <h2 className="font-playfair text-lg mb-2 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-sm text-neutral-600 line-clamp-3 mb-4">
              {product.description}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="font-semibold text-green-700">
                ${product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
