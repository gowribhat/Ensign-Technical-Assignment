import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import MessageScreen from "../components/MessageScreen";
import {
  StarIcon,
  ChevronLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import NumberSelector from "../components/NumberSelector";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

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

  const handleAddToCart = () => {
    if (adding) return; // prevent multiple clicks
    setAdding(true);
    addToCart(product, quantity);
    setQuantity(1);
    setTimeout(() => setAdding(false), 1000);
  };

  if (loading) {
    return <MessageScreen loading text="Loading product..." />;
  }

  if (!product) {
    return (
      <MessageScreen
        icon={
          <ExclamationTriangleIcon className="w-20 h-20 mx-auto text-amber-600" />
        }
        title="Product not found"
        description="We couldn’t find the product you’re looking for."
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-amber-800 hover:text-stone-600 transition w-fit text-base"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="font-medium">Back to Products</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 flex items-start justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[500px] object-contain drop-shadow-md bg-white p-6 rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-start">
          <h1 className="text-3xl md:text-4xl font-serif mb-2 text-stone-800 leading-snug">
            {product.title}
          </h1>

          <span className="text-stone-500 text-sm mb-4 capitalize">
            {product.category}
          </span>

          <div
            className="flex items-center gap-2 mb-2"
            title={`Rating: ${product.rating.rate.toFixed(2)} / 5`}
          >
            {Array.from({ length: 5 }, (_, i) => {
              const rating = product.rating.rate;
              const full = i + 1 <= Math.floor(rating);
              const partial = i < rating && i + 1 > rating;

              return (
                <div key={i} className="relative w-6 h-6">
                  {/* Empty star */}
                  <StarIcon className="w-6 h-6 text-stone-300 absolute top-0 left-0" />

                  {/* Full star */}
                  {full && (
                    <StarIcon className="w-6 h-6 text-amber-500 absolute top-0 left-0" />
                  )}

                  {/* Partial star */}
                  {partial && (
                    <div
                      className="overflow-hidden absolute top-0 left-0"
                      style={{ width: `${(rating - i) * 100}%` }}
                    >
                      <StarIcon className="w-6 h-6 text-amber-500" />
                    </div>
                  )}
                </div>
              );
            })}
            <span className="text-stone-500 text-sm">
              {product.rating.count} reviews
            </span>
            {product.rating.rate >= 4.5 && (
              <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                Top Rated
              </span>
            )}
          </div>

          <p className="text-stone-600 mb-6 leading-relaxed text-lg">
            {product.description}
          </p>

          <span className="text-3xl font-bold text-amber-800 mb-6 block">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-3 mb-6">
            <NumberSelector value={quantity} onChange={setQuantity} />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`px-6 py-3 rounded-lg font-medium w-fit transition 
              ${
                adding
                  ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                  : "bg-amber-900 text-rose-100 hover:bg-amber-800"
              }`}
            >
              {adding ? "Adding..." : `Add ${quantity} to Cart`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
