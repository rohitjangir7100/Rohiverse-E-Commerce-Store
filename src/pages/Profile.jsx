import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, auth } from "../firebase";
import {
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Cog6ToothIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [setDefaultIndex] = useState(null);
  const [newAddress, setNewAddress] = useState({
    line1: "",
    city: "",
    pincode: "",
  });
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
  const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
    const data = docSnap.data();
    if (data?.name) setName(data.name);
    if (data?.addresses) {
      setAddresses(data.addresses);
      const def = data.addresses.findIndex((a) => a.default);
      setDefaultIndex(def >= 0 ? def : null);
    }
  });
  return unsub;
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [user]);

  // Save display name
  const handleNameSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const formatted = name
        .trim()
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
      await setDoc(
        doc(db, "users", user.uid),
        { name: formatted },
        { merge: true }
      );
      await updateProfile(auth.currentUser, { displayName: formatted });
      localStorage.setItem("displayName", formatted);
      toast.success("Name saved!");
      setEditingName(false);
    } catch (err) {
      toast.error("Name save failed");
    } finally {
      setSaving(false);
    }
  };

  // Add new address
  const addAddress = async () => {
    const { line1, city, pincode } = newAddress;
    if (!line1.trim() || !city.trim() || !/^\d{6}$/.test(pincode)) {
      toast.error("Please fill all fields correctly (6-digit pincode)");
      return;
    }

    const addressToAdd = {
      ...newAddress,
      default: addresses.length === 0,
    };

    try {
      await updateDoc(doc(db, "users", user.uid), {
        addresses: arrayUnion(addressToAdd),
      });
      setNewAddress({ line1: "", city: "", pincode: "" });
      toast.success("Address added!");
    } catch (err) {
      toast.error("Failed to add address");
    }
  };

  // Save edited address
  const saveEditedAddress = async (i) => {
    const addr = addresses[i];
    if (
      !addr.line1.trim() ||
      !addr.city.trim() ||
      !/^\d{6}$/.test(addr.pincode)
    ) {
      toast.error("All fields must be valid (6-digit pincode)");
      return;
    }

    try {
      const updated = [...addresses];
      await setDoc(
        doc(db, "users", user.uid),
        { addresses: updated },
        { merge: true }
      );
      setEditingIndex(null);
      toast.success("Address updated!");
    } catch (err) {
      toast.error("Failed to update address");
    }
  };

  // Delete address
  const deleteAddress = async (addr) => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        addresses: arrayRemove(addr),
      });
      toast.success("Address removed!");
    } catch {
      toast.error("Failed to remove");
    }
  };

  // Set default
  const makeDefault = async (i) => {
    try {
      const updated = addresses.map((a, index) => ({
        ...a,
        default: index === i,
      }));
      await setDoc(
        doc(db, "users", user.uid),
        { addresses: updated },
        { merge: true }
      );
      toast.success("Default set!");
    } catch {
      toast.error("Failed to set default");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-lime-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">👤 Profile</h1>
        <button
          onClick={() => navigate("/settings")}
          className="relative group">
          <Cog6ToothIcon className="w-6 h-6 text-lime-400 hover:text-lime-500" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition">
            Settings
          </span>
        </button>
      </div>

      {/* Email */}
      <p className="text-sm text-gray-400 mb-4">
        Logged in as{" "}
        <span className="text-lime-300">{user.email || user.phoneNumber}</span>
      </p>

      {/* Name */}
      <div className="mb-6">
        <label className="block mb-1 text-gray-300">Display Name</label>
        {editingName ? (
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-1 rounded bg-gray-800 text-lime-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
              autoFocus
            />
            <button
              onClick={handleNameSave}
              className="px-3 py-1 bg-lime-500 hover:bg-lime-600 text-gray-900 rounded font-semibold"
              disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{name || "Not set"}</p>
            <button
              onClick={() => setEditingName(true)}
              className="text-sm text-lime-400 hover:underline">
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Order History */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded w-full">
          📦 Order History <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </button>
      </div>

      {/* ➕ Add address */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🏠 Add Address</h2>
        <div className="space-y-2">
          <input
            placeholder="Address line"
            className="w-full px-3 py-1 bg-gray-800 rounded"
            value={newAddress.line1}
            onChange={(e) =>
              setNewAddress({ ...newAddress, line1: e.target.value })
            }
          />
          <input
            placeholder="City"
            className="w-full px-3 py-1 bg-gray-800 rounded"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
          />
          <input
            placeholder="Pincode"
            className="w-full px-3 py-1 bg-gray-800 rounded"
            value={newAddress.pincode}
            onChange={(e) =>
              setNewAddress({ ...newAddress, pincode: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && addAddress()}
          />
          <button
            onClick={addAddress}
            className="px-3 py-1 bg-lime-500 hover:bg-lime-600 text-gray-900 rounded font-semibold w-full">
            Add Address
          </button>
        </div>
      </div>

      {/* 📋 List addresses */}
      <div>
        <h2 className="text-xl font-semibold mb-2">📦 Saved Addresses</h2>
        {addresses.map((addr, i) => (
          <div
            key={i}
            className="bg-gray-800 p-4 rounded mb-4 space-y-1 relative">
            {editingIndex === i ? (
              <>
                <input
                  value={addr.line1}
                  onChange={(e) =>
                    setAddresses((prev) =>
                      prev.map((a, index) =>
                        index === i ? { ...a, line1: e.target.value } : a
                      )
                    )
                  }
                  className="w-full px-2 py-1 bg-gray-700 rounded"
                />
                <input
                  value={addr.city}
                  onChange={(e) =>
                    setAddresses((prev) =>
                      prev.map((a, index) =>
                        index === i ? { ...a, city: e.target.value } : a
                      )
                    )
                  }
                  className="w-full px-2 py-1 bg-gray-700 rounded"
                />
                <input
                  value={addr.pincode}
                  onChange={(e) =>
                    setAddresses((prev) =>
                      prev.map((a, index) =>
                        index === i ? { ...a, pincode: e.target.value } : a
                      )
                    )
                  }
                  className="w-full px-2 py-1 bg-gray-700 rounded"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEditedAddress(i)}
                    className="bg-lime-500 hover:bg-lime-600 px-3 py-1 rounded text-gray-900">
                    Save
                  </button>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{addr.line1}</p>
                <p>{addr.city}</p>
                <p>{addr.pincode}</p>
                <div className="text-sm text-lime-400">
                  {addr.default && "⭐ Default"}
                </div>
                <div className="flex gap-3 mt-2">
                  {!addr.default && (
                    <button
                      onClick={() => makeDefault(i)}
                      className="text-xs text-blue-300 hover:underline">
                      Make Default
                    </button>
                  )}
                  <button
                    onClick={() => setEditingIndex(i)}
                    className="text-xs text-lime-300 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAddress(addr)}
                    className="text-xs text-red-400 hover:underline">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
