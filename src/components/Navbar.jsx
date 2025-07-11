import { useState, useRef, useEffect, Fragment } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {auth} from "../firebase"; // Ensure you have firebase initialized
import { updateProfile } from "firebase/auth";

const linkCls =
  "relative text-lime-100 hover:text-lime-400 transition after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-lime-400 hover:after:w-full after:duration-300";

export default function Navbar() {
  /* ——————————————————————————————————— */
  const { user, logout } = useAuth();
  const displayName =
    user?.displayName || localStorage.getItem("displayName") || "";

  const { items: cart } = useCart();
  const likes = JSON.parse(localStorage.getItem("likes") || "[]");
  const cartCount = cart.length;
  const wishlistCount = likes.length;

  const [openNav, setOpenNav] = useState(false);
  const [showSearch, setShowSrc] = useState(false);
  const [search, setSearch] = useState("");

  const searchInputRef = useRef(null);

  const nav = useNavigate();
  const location = useLocation();
  /* ——————————————————————————————————— */

  /* auto‑focus search */
  useEffect(() => {
    if (showSearch) setTimeout(() => searchInputRef.current?.focus(), 60);
  }, [showSearch]);

  // Prompt user to set name if none and phone login
  useEffect(() => {
    if (user && !user.displayName && user.phoneNumber) {
      const name = prompt("Please enter your name:");
      if (name?.trim()) {
        const formatted = name
          .trim()
          .split(" ")
          .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");
        updateProfile(auth.currentUser, { displayName: formatted })
          .then(() => console.log("DisplayName set"))
          .catch(console.error);
      }
    }
  }, [user]);

  /* close slide‑in on route change */
  useEffect(() => {
    setOpenNav(false);
  }, [location.pathname]);

  const submitSearch = () => {
    if (!search.trim()) return;
    nav(`/products?search=${encodeURIComponent(search.trim())}`);
    setShowSrc(false);
    setSearch("");
  };

  /* ——— extracted for reuse ——— */
  const NavLinks = () => (
    <>
      <NavLink to="/" className={linkCls}>
        Home
      </NavLink>
      <NavLink to="/products" className={linkCls}>
        Products
      </NavLink>
      <NavLink to="/orders" className={linkCls}>
        Orders
      </NavLink>

      {/* Wishlist */}
      <NavLink to="/wishlist" className={linkCls}>
        <IconBadge
          icon={<HeartIcon className="w-5 h-5" />}
          count={wishlistCount}
          color="bg-pink-500"
          tooltip="Wishlist"
        />
      </NavLink>

      {/* Cart */}
      <NavLink to="/cart" className={linkCls}>
        <IconBadge
          icon={<ShoppingCartIcon className="w-5 h-5" />}
          count={cartCount}
          color="bg-lime-500"
          tooltip="Cart"
        />
      </NavLink>
    </>
  );
  /* ——————————————————————————————————— */

  return (
    <nav className="bg-gray-900 text-lime-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/logo-navbar.png" alt="logo" className="w-20 h-20" />
          {/* <span className="text-xl font-bold text-lime-400">Rohiverse</span> */}
        </NavLink>

        {/* desktop */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
          <TooltipButton
            label="Search"
            onClick={() => setShowSrc((p) => !p)}
            icon={<MagnifyingGlassIcon className="w-6 h-6" />}
          />
          <AuthArea desktop />
        </div>

        {/* mobile hamburger */}
        {/* mobile search icon */}
        {/* mobile hamburger + search icon */}
        <div className="md:hidden flex items-center gap-3">
          <TooltipButton
            label="Search"
            onClick={() => setShowSrc((p) => !p)}
            icon={<MagnifyingGlassIcon className="w-6 h-6" />}
          />
          <button
            className="text-lime-100 focus:outline-none z-50"
            onClick={() => setOpenNav((p) => !p)}>
            {openNav ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* ───── mobile slide‑in panel ───── */}
      <Transition
        show={openNav}
        as={Fragment}
        enter="transition-transform duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full">
        <div className="fixed top-0 right-0 w-64 h-full bg-gray-900 shadow-lg p-6 space-y-6 flex flex-col z-40">
          <NavLinks />
          <TooltipButton
            label="Search"
            icon={<MagnifyingGlassIcon className="w-5 h-5" />}
            onClick={() => setShowSrc(true)}
            inline
          />
          {/*  Replace this in mobile view inside AuthArea */}
          {/* show user display name + profile in mobile view */}
          {user && (
            <div className="mt-2 text-sm text-lime-300">
              {displayName || user.email || user.phoneNumber}
              <button
                onClick={() => {
                  setOpenNav(false);
                  nav("/profile");
                }}
                className="mt-2 text-lime-400 hover:underline block">
                👤 View Profile
              </button>
            </div>
          )}
          <AuthArea />
        </div>
      </Transition>

      {/* ───── floating search bar ───── */}
      <SearchOverlay
        show={showSearch}
        onClose={() => setShowSrc(false)}
        inputRef={searchInputRef}
        value={search}
        setValue={setSearch}
        onSubmit={submitSearch}
      />
    </nav>
  );

  /* ————————— local components ————————— */
  function AuthArea({ desktop = false }) {
    if (user) {
      return desktop ? (
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 text-lime-300 hover:text-lime-100">
            <UserCircleIcon className="w-6 h-6 text-lime-400" />
            <span className="text-sm hidden md:inline truncate max-w-[120px]">
              {user.displayName || user.email || user.phoneNumber}
            </span>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-800 border rounded shadow-lg z-50">
            <div className="px-4 py-2 text-xs text-lime-300 border-b truncate">
              Signed in as {user.displayName || user.email || user.phoneNumber}
            </div>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => nav("/profile")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    active && "bg-gray-700"
                  }`}>
                  👤 Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => nav("/orders")}
                  className={`${
                    active && "bg-gray-700"
                  } block w-full text-left px-4 py-2 text-sm`}>
                  📦 My Orders
                </button>
              )}
            </Menu.Item>
            <div className="border-t border-gray-600 my-1" />
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active && "bg-gray-700"
                  } flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400`}>
                  <ArrowLeftOnRectangleIcon className="w-4 h-4" /> Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      ) : (
        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-300">
          <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Logout
        </button>
      );
    }

    /* not logged‑in */
    return desktop ? (
      <>
        <NavLink to="/login" className={linkCls}>
          Login
        </NavLink>
        <NavLink to="/register" className={linkCls}>
          Register
        </NavLink>
      </>
    ) : (
      <div className="mt-auto flex flex-col gap-2">
        <NavLink to="/login" className={linkCls}>
          Login
        </NavLink>
        <NavLink to="/register" className={linkCls}>
          Register
        </NavLink>
      </div>
    );
  }
}

/* =============== Tiny helpers =============== */

/* icon with badge + tooltip */
function IconBadge({ icon, count, color, tooltip }) {
  return (
    <div className="relative group">
      {icon}
      {count > 0 && (
        <span
          className={`absolute -top-1 -right-1 text-[10px] leading-none
                      px-1.5 rounded-full font-bold ${color} text-gray-900`}>
          {count}
        </span>
      )}
      {/* tooltip */}
      <span
        className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
                   bg-gray-800 text-xs text-lime-100 rounded px-2 py-0.5
                   opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                   whitespace-nowrap pointer-events-none transition-all duration-200">
        {tooltip}
      </span>
    </div>
  );
}

/* basic tooltip / button wrapper  */
function TooltipButton({ label, icon, onClick, inline = false }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1 ${
        inline ? "text-lime-100" : "text-lime-100 hover:text-lime-400"
      }`}>
      {icon}
      <span
        className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
                   bg-gray-800 text-xs text-lime-100 rounded px-2 py-0.5
                   opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                   whitespace-nowrap pointer-events-none transition-all duration-200">
        {label}
      </span>
    </button>
  );
}

/* search overlay component */
function SearchOverlay({ show, onClose, inputRef, value, setValue, onSubmit }) {
  return (
    <>
      <Transition
        show={show}
        as={Fragment}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      </Transition>

      <Transition
        show={show}
        as={Fragment}
        enter="transition-transform duration-300"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full">
        <div className="fixed top-0 inset-x-0 bg-gray-900 p-3 shadow-lg z-50 flex items-center gap-3">
          <MagnifyingGlassIcon className="w-6 h-6 text-lime-400" />
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            placeholder="Search products…"
            className="flex-1 bg-transparent outline-none text-lime-100 placeholder-gray-400"
          />
          <button
            onClick={onSubmit}
            className="px-3 py-1 bg-lime-500 hover:bg-lime-600 text-gray-900 rounded font-semibold">
            Go
          </button>
        </div>
      </Transition>
    </>
  );
}
