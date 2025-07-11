import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import { ShoppingBagIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { user } = useAuth(); // ✅ current user
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null); // collapse index

  /* Fetch orders for the logged‑in user */
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);

        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        }));
        setOrders(list);
      } catch (err) {
        console.error("Orders error:", err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return (
    <div className="px-4 py-6 sm:p-8 max-w-4xl mx-auto bg-gray-950 min-h-screen text-lime-100">
      <h1 className="text-3xl font-bold mb-6 text-lime-400 flex items-center gap-2">
        <ShoppingBagIcon className="w-7 h-7" /> Your Orders
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400">📭 No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div
              key={order.id}
              className="bg-gray-900 border border-gray-800 rounded shadow">
              {/* Header */}
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex justify-between items-center p-4">
                <div>
                  <p className="font-semibold">
                    ₹{order.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {order.createdAt.toLocaleDateString()} •{" "}
                    {order.items.length} item
                    {order.items.length > 1 && "s"}
                  </p>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Collapsible body */}
              {open === idx && (
                <div className="px-6 pb-4 text-sm text-gray-300 space-y-1">
                  {order.items.map((it, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{it.name}</span>
                      <span>₹{it.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
