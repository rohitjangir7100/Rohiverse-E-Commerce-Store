import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { initiatePayment } from "../utils/payment";
import { db } from "../firebase";
import { toast } from "react-hot-toast";

import {
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

/* 🔧 Reusable Input Component */
function InputWithIcon({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        required
        className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded bg-gray-800 text-lime-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
      />
    </div>
  );
}

export default function Checkout() {
  const { user } = useAuth(); // ✅ scoped correctly
  const { items: cart = [], clearCart } = useCart(); // ✅ cart from context
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const amount = (cart || []).reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("⚠️ Please log in to place an order.");
      return;
    }
    if (!Array.isArray(cart) || cart.length === 0) return;

    try {
      // 💳 Trigger mock Razorpay payment
      await initiatePayment(amount, () => {
        clearCart();
        navigate("/");
      });

      // 📦 Save order to Firestore
      await addDoc(collection(db, "orders"), {
        ...form,
        userId: user.uid,
        items: cart,
        amount,
        createdAt: serverTimestamp(),
      });

      toast.success("🎉 Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("❌ Failed to place order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-4 text-center text-lg bg-gray-950 min-h-screen text-lime-100">
        🛒 Your cart is empty.
      </div>
    );
  }
  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 4); // delivery in 4 days
    return today.toLocaleDateString("en-IN", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="px-4 py-6 sm:p-8 max-w-4xl mx-auto bg-gray-950 min-h-screen text-lime-100">
      <h1 className="text-3xl font-bold mb-6 text-lime-400 flex items-center gap-2">
        <ShoppingBagIcon className="w-7 h-7" /> Checkout
      </h1>

      {/* 🧾 Order Summary Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* 📦 Summary Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-lime-300">
            📋 Order Summary
          </h2>
          <ul className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
            {cart.map((item, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="truncate">{item.name}</div>
                <div className="text-lime-400 font-semibold">₹{item.price}</div>
              </li>
            ))}
          </ul>
          <hr className="border-gray-700 my-4" />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-lime-400">₹{amount.toLocaleString()}</span>
          </div>

          {/* 📦 Delivery Estimate */}
          <div className="mt-4 text-sm text-gray-400">
            🚚 Estimated delivery by{" "}
            <span className="text-lime-300 font-semibold">
              {getEstimatedDeliveryDate()}
            </span>
            <br />
            📍 To:{" "}
            <span className="text-lime-300 font-semibold">
              {form.address || "your address"}
            </span>
          </div>
        </div>

        {/* 🧾 Form Section */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-lime-300">
            📝 Enter Delivery Details
          </h2>
          <InputWithIcon
            icon={<UserIcon className="w-5 h-5 text-lime-400" />}
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          <InputWithIcon
            icon={<MapPinIcon className="w-5 h-5 text-lime-400" />}
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          <InputWithIcon
            icon={<PhoneIcon className="w-5 h-5 text-lime-400" />}
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full px-5 py-3 bg-lime-500 hover:bg-lime-600 text-gray-900 font-semibold rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 duration-200">
            🛍️ Pay ₹{amount.toLocaleString()} &nbsp;|&nbsp; Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
