// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!user && !hasShownToast.current) {
      toast.error("🚫 You must be logged in to access this page.");
      hasShownToast.current = true;
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
