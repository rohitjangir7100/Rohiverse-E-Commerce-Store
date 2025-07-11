import { Link } from "react-router-dom";
import {
  ShoppingCartIcon,
  TrashIcon,
  CreditCardIcon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";

// ✅ Group items by ID and count quantity
function groupById(items = []) {
  const map = {};
  for (const item of items) {
    if (!map[item.id]) {
      map[item.id] = { ...item, qty: 1 };
    } else {
      map[item.id].qty += 1;
    }
  }
  return Object.values(map);
}

export default function Cart() {
  const {
    items: cart = [],
    removeFromCart,
    addToCart,
    removeAllOfItem,
    clearCart,
  } = useCart();

  const grouped = groupById(cart);

  const subtotal = grouped.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const tax = grouped.reduce(
    (sum, item) => sum + Math.round(item.price * item.qty * 0.18),
    0
  );
  const total = subtotal + tax;

  const handleRemoveOne = (id) => removeFromCart(id);
  const handleAddOne = (item) => addToCart(item);
  const handleRemoveAll = (id, name) => {
    removeAllOfItem(id);
    toast.success(`Removed all of ${name}`);
  };

  return (
    <div className="px-4 py-6 sm:p-8 max-w-4xl mx-auto bg-gray-950 min-h-screen text-lime-100">
      <h1 className="text-3xl font-bold mb-6 text-lime-400 flex items-center gap-2">
        <ShoppingCartIcon className="w-7 h-7" /> Your Cart
      </h1>

      {grouped.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          🛍️ No items in cart.{" "}
          <Link to="/products" className="underline text-lime-300">
            Continue Shopping
          </Link>
        </p>
      ) : (
        <>
          {/* Cart List */}
          <div className="space-y-4">
            {grouped.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-900 rounded shadow border border-gray-800">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                    </p>
                  </div>
                </div>

                {/* Qty Buttons */}
                <div className="flex items-center mt-3 sm:mt-0 gap-2">
                  <button
                    onClick={() => handleRemoveOne(item.id)}
                    className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">
                    <MinusIcon className="w-4 h-4 text-white" />
                  </button>
                  <span className="text-lime-300 font-bold">{item.qty}</span>
                  <button
                    onClick={() => handleAddOne(item)}
                    className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">
                    <PlusIcon className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleRemoveAll(item.id, item.name)}
                    className="text-red-400 hover:text-red-500 ml-3 text-sm flex items-center gap-1">
                    <TrashIcon className="w-5 h-5" /> Remove All
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals + Actions */}
          <div className="mt-8 border-t border-gray-700 pt-6 text-right space-y-3">
            <p className="text-lg text-gray-300">
              Subtotal: ₹{subtotal.toLocaleString()}
            </p>
            <p className="text-lg text-gray-300">
              Tax (18%): ₹{tax.toLocaleString()}
            </p>
            <p className="text-2xl font-bold text-lime-300">
              Total: ₹{total.toLocaleString()}
            </p>

            <div className="flex justify-between flex-wrap gap-3 pt-5">
              <Link
                to="/products"
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm">
                <ArrowLeftIcon className="w-5 h-5" /> Continue Shopping
              </Link>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared");
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm">
                  Clear Cart
                </button>

                <Link
                  to="/checkout"
                  className="px-5 py-2 bg-lime-500 hover:bg-lime-600 text-gray-900 font-semibold rounded flex items-center gap-2">
                  <CreditCardIcon className="w-5 h-5" /> Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
