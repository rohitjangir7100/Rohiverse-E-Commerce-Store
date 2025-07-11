import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import{ seedProducts }from "./utils/seedProducts"; // ⚠️ Only run once, then
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
// import SeedProducts from "./pages/SeedProducts"; // ⚠️ Only run once, then remove
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { Provider } from "react-redux";
import store from "./store";
// import AdminLogin from "./pages/AdminLogin";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import InfiniteProducts from "./pages/InfiniteProducts";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import Settings from "./pages/Settings";

export default function App() {
  // useEffect(() => {
  //   seedProducts(); // ⚠️ Only run once, then remove
  // }, []);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 3000 }}
        reverseOrder={false}
      />
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/admin/seed" element={<SeedProducts />} /> */}
            {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <InfiniteProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
            {/* Fallback route for 404 Not Found */}
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}
