import { useEffect, useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from Fake Store API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-playfair text-center mb-8 text-neutral-800">
        Our Products
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-cream rounded-lg shadow hover:shadow-lg transition duration-300 p-4 flex flex-col"
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
