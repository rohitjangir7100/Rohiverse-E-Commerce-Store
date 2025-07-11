import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⏳ wait for Firebase
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully 👋");
    } catch (error) {
      toast.error("Failed to logout 😢");
    }
  };

  useEffect(() => {
    // ✅ store session in indexedDB/localStorage (default, but set explicitly)
    setPersistence(auth, browserLocalPersistence);

    // 🔄 listen once for token restore / sign‑in / sign‑out
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsub; // clean‑up listener
  }, []);

  // While Firebase checks local storage, show a splash (or nothing)
  if (loading) return <div className="min-h-screen bg-gray-950" />;

  return <AuthCtx.Provider value={{ user,logout }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
