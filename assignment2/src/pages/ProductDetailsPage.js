import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (value) => {
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 flex items-start justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[500px] object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col justify-start">
          <h1 className="text-4xl font-playfair mb-6 text-neutral-900">
            {product.title}
          </h1>
          <p className="text-neutral-700 mb-8 leading-relaxed text-lg">
            {product.description}
          </p>
          <span className="text-3xl font-semibold text-green-700 mb-8">
            ${product.price}
          </span>

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 bg-beige rounded hover:bg-green-200 transition"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="w-16 text-center border border-neutral-300 rounded"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 bg-beige rounded hover:bg-green-200 transition"
            >
              +
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => addToCart(product, quantity)}
              className="bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition font-medium w-fit"
            >
              Add {quantity} to Cart
            </button>
            <Link
              to="/"
              className="text-sm text-green-700 hover:underline w-fit"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
