import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import ProductImages from "./ProductImages";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProduct(data.find((p) => p.id === parseInt(id))));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  if (!product)
    return (
      <div className="p-4 text-lime-400 text-center min-h-screen bg-gray-950">
        Loading...
      </div>
    );

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto min-h-screen bg-gray-950 text-lime-100">
      <div className="flex flex-col md:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow border border-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 object-cover rounded-lg h-64 sm:h-80 md:h-auto"
        />

        <div className="flex flex-col justify-between w-full">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-lime-300 mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-lime-400 mb-3">₹{product.price}</p>
            <p className="text-sm text-gray-400 mb-6">{product.description}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-lime-500 text-gray-900 font-semibold rounded hover:bg-lime-600 flex items-center gap-2 justify-center transition transform hover:scale-105 duration-200 w-full sm:w-fit">
            <ShoppingBagIcon className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* 🔍 More like this */}
      <h2 className="text-lime-300 text-2xl mt-10 mb-4">More Like This</h2>
      <ProductImages query={product.name} />
    </div>
  );
}
