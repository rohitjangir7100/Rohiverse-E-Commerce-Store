import { useState, useEffect } from "react";
import {
  HeartIcon,
  TrashIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // 🧠 Load from "likes" key in localStorage
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("likes") || "[]");
    } catch {
      return [];
    }
  });

  // 🔁 Sync back to localStorage on any change
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(items));
  }, [items]);

  // 🔧 Remove one
  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    toast.success("💔 Removed from wishlist");
  };

  // 🧹 Clear all
  const clearAll = () => {
    setItems([]);
    toast.success("🗑️ Wishlist cleared");
  };

  // 🖼️ UI
  return (
    <div className="min-h-screen bg-gray-950 text-lime-100 px-4 py-6 sm:p-8">
      <h1 className="text-3xl font-bold flex items-center gap-2 text-pink-400 mb-6">
        <HeartIcon className="w-8 h-8" /> My Wishlist
      </h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-400">
          💔 Nothing in your wishlist.{" "}
          <Link to="/products" className="underline text-lime-400">
            Browse products
          </Link>
          .
        </p>
      ) : (
        <>
          {/* 💖 List of liked items */}
          <div className="grid sm:grid-cols-2 gap-5">
            {items.map((p) => (
              <div
                key={p.id}
                className="flex gap-4 bg-gray-900 p-4 rounded shadow border border-gray-800">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-24 h-24 object-cover rounded shrink-0 cursor-pointer"
                  onClick={() => navigate(`/products/${p.id}`)}
                />

                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold line-clamp-1">{p.name}</h3>
                  <p className="text-sm text-gray-400 mb-1">
                    Category: {p.category}
                  </p>
                  <p className="font-bold text-lime-400 mb-3">₹{p.price}</p>

                  <div className="mt-auto flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(p);
                        toast.success("🛒 Added to cart");
                      }}
                      className="flex items-center gap-1 bg-lime-500 hover:bg-lime-600 text-gray-900 px-3 py-1 rounded text-sm font-semibold">
                      <ShoppingCartIcon className="w-4 h-4" /> Add
                    </button>

                    <button
                      onClick={() => removeItem(p.id)}
                      className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm">
                      <TrashIcon className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🧼 Footer actions */}
          <div className="flex justify-end mt-8 gap-3">
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
              <TrashIcon className="w-5 h-5" /> Clear All
            </button>
            <Link
              to="/products"
              className="flex items-center gap-1 px-4 py-2 bg-lime-500 hover:bg-lime-600 text-gray-900 rounded text-sm font-semibold">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
