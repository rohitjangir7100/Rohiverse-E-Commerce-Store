import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const q = query(collection(db, "orders"), where("userId", "==", uid));
    const unsub = onSnapshot(q, (snap) =>
      setOrders(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    return unsub;
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-lime-100 p-6">
      <h2 className="text-2xl font-bold text-lime-400 mb-4">
        📦 Order History
      </h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-gray-800 p-4 rounded shadow space-y-1">
              <p className="font-semibold">🆔 Order ID: {order.id}</p>
              <p>📅 Date: {new Date(order.date).toLocaleString()}</p>
              <p>🛍️ Items: {order.items?.length}</p>
              <p>💸 Total: ₹{order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
