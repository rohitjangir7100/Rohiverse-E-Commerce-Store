import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "react-hot-toast";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export default function ProductCard({ product, viewType }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div
      className={`border border-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all bg-gray-900 text-lime-100 ${
        viewType === "list" ? "flex gap-4 items-start" : ""
      }`}>
      <img
        src={product.image}
        alt={product.name}
        className={`rounded object-cover ${
          viewType === "list"
            ? "w-32 h-32 flex-shrink-0"
            : "w-full h-40 sm:h-48 md:h-56"
        }`}
      />

      <div className={`${viewType === "list" ? "flex-1" : ""} mt-3 md:mt-4`}>
        <Link
          to={`/products/${product.id}`}
          className="block text-lg font-semibold text-lime-300 hover:underline">
          {product.name}
        </Link>
        <p className="text-lime-400 mb-2">₹{product.price}</p>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-lime-500 text-gray-900 font-semibold rounded hover:bg-lime-600 transition flex items-center gap-2 transform hover:scale-105 duration-200">
          <ShoppingBagIcon className="w-5 h-5" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
