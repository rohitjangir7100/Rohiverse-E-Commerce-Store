import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import ScrollToTopButton from "../components/ScrollToTopButton";

/* ───── helpers ───── */
const detectCategory = (alt = "") => {
  const t = alt.toLowerCase();
  if (t.match(/(fashion|dress|shirt|shoe|bag)/)) return "fashion";
  if (t.match(/(electronic|phone|laptop|camera|gadget)/)) return "electronics";
  if (t.match(/(toy|lego|doll|action)/)) return "toys";
  if (t.match(/(home|kitchen|furniture|decor)/)) return "home";
  return "shopping";
};

/* price buckets once, re‑used in filter */
const priceBucket = (price) =>
  price <= 500 ? "low" : price <= 1000 ? "mid" : "high";

/* ───── component ───── */
export default function Products() {
  const { addToCart } = useCart();

  /* data sets */
  const [photos, setPhotos] = useState([]);
  const [dynamicCats, setDynamicCats] = useState([]);

  /* ui / query state */
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("shopping");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [view, setView] = useState("grid");

  /* aux */
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [likes, setLikes] = useState(() =>
    JSON.parse(localStorage.getItem("likes") || "[]")
  );
  const [modalProduct, setModalProduct] = useState(null);
  const loaderRef = useRef(null);

  /* ─── fetch logic ─── */
  const fetchPhotos = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const { data } = await axios.get(
        "/.netlify/functions/pexels?query=shopping",
        {
          params: { query, page, per_page: 20 },
        }
      );

      const mapped = data.photos.map((p) => {
        const cat = detectCategory(p.alt ?? "");
        const priceVal = Math.floor(Math.random() * 2000 + 300);
        return {
          id: p.id,
          name: p.alt || `Photo #${p.id}`,
          image: p.src.medium,
          large: p.src.large2x || p.src.large,
          price: priceVal,
          priceBucket: priceBucket(priceVal),
          category: cat,
        };
      });

      setPhotos((prev) => [...prev, ...mapped]);
      setDynamicCats((prev) =>
        [...new Set([...prev, ...mapped.map((m) => m.category)])].sort()
      );
      setHasMore(mapped.length === 20);
    } catch (e) {
      console.error("🔥  Pexels proxy error", e.message);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, query, loading, hasMore]);

  /* reset list when query (search) changes */
  useEffect(() => {
    setPhotos([]);
    setDynamicCats([]);
    setPage(1);
    setHasMore(true);
  }, [query, category, price]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos, page]); // fetch on page change

  /* infinite scroll */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting && hasMore && !loading && setPage((p) => p + 1),
      { threshold: 1 }
    );
    const el = loaderRef.current;
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loading]);

  /* persist like list */
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  /* memo‑filtered list – super fast, only recomputes when deps change */
  const filtered = useMemo(() => {
    return photos.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (price === "all" || p.priceBucket === price)
    );
  }, [photos, category, price]);

  /* like toggle */
  const toggleLike = (product) => {
    setLikes((prev) => {
      const exists = prev.find((it) => it.id === product.id);
      return exists
        ? prev.filter((it) => it.id !== product.id)
        : [...prev, product];
    });
  };

  const skeletons = Array.from({ length: 8 }, (_, i) => (
    <div key={i} className="bg-gray-800 animate-pulse rounded-lg p-4 h-full">
      <div className="h-48 bg-gray-700 rounded mb-4" />
      <div className="h-4 bg-gray-700 rounded mb-2 w-3/4" />
      <div className="h-4 bg-gray-700 rounded mb-2 w-1/2" />
      <div className="h-8 bg-gray-700 rounded w-full mt-auto" />
    </div>
  ));

  /* ─── jsx ─── */
  return (
    <>
      {/* main list */}
      <div className="min-h-screen bg-gray-950 text-lime-100 p-4">
        <h1 className="text-3xl font-bold text-lime-400 mb-6 text-center">
          🛍️ Products
        </h1>

        {/* controls */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {/* search */}
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-3 py-2 w-64 rounded bg-gray-800 border border-lime-400 placeholder-gray-400 focus:ring-2 focus:ring-lime-400"
              placeholder="Search…"
            />
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-lime-400" />
          </div>

          {/* category filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 border border-lime-400">
            <option value="all">All Categories</option>
            {dynamicCats.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* price filter */}
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 border border-lime-400">
            <option value="all">All Prices</option>
            <option value="low">≤ ₹500</option>
            <option value="mid">₹500‑1000</option>
            <option value="high">{">"} ₹1000</option>
          </select>

          {/* view toggle */}
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="bg-lime-500 hover:bg-lime-600 text-gray-900 px-4 py-2 rounded font-semibold">
            {view === "grid" ? "📃 List" : "🔲 Grid"}
          </button>

          {/* reset filters */}
          <button
            onClick={() => {
              setQuery("shopping");
              setCategory("all");
              setPrice("all");
            }}
            className="bg-gray-700 hover:bg-gray-600 text-lime-200 px-4 py-2 rounded font-medium border border-lime-500">
            🔄 Reset Filters
          </button>
        </div>

        {/* grid / list */}
        {/* grid / list */}
        <div
          className={
            view === "grid"
              ? "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "space-y-4"
          }>
          {loading && photos.length === 0
            ? skeletons
            : filtered.map((p) => {
                const liked = likes.some((it) => it.id === p.id);
                return (
                  <div
                    key={p.id}
                    className={`bg-gray-800 rounded-lg shadow p-4 transition ${
                      view === "list"
                        ? "flex items-center gap-4"
                        : "flex flex-col h-full"
                    }`}>
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden rounded group ${
                        view === "list"
                          ? "w-32 h-32 flex-shrink-0"
                          : "aspect-[4/3] w-full"
                      } cursor-pointer`}
                      onClick={() => setModalProduct(p)}>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-110"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(p);
                        }}
                        className="absolute top-2 right-2 bg-gray-900/70 p-1 rounded-full">
                        {liked ? (
                          <HeartSolid className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartOutline className="w-5 h-5 text-lime-100" />
                        )}
                      </button>
                    </div>

                    {/* Info */}
                    <div
                      className={`${
                        view === "list" ? "flex-1" : "mt-3 flex-1 flex flex-col"
                      }`}>
                      <div className="relative group" tabIndex={0}>
                        <h2
                          className="font-semibold text-sm mb-1 break-words max-h-[3rem] overflow-hidden"
                          title={p.name}>
                          {p.name}
                        </h2>
                      </div>

                      <p className="text-lime-400 font-semibold text-sm">
                        ₹{p.price}
                      </p>
                      <p className="text-xs text-gray-400 mb-2">
                        Cat: {p.category}
                      </p>

                      <button
                        onClick={() => {
                          addToCart(p);
                          toast.success(`${p.name} added to cart`);
                        }}
                        className="bg-lime-500 hover:bg-lime-600 text-gray-900 px-3 py-1 rounded text-sm font-semibold mt-auto">
                        ➕ Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* sentinel */}
        <div ref={loaderRef} className="flex justify-center py-8">
          {loading && (
            <ArrowPathIcon className="w-6 h-6 text-lime-400 animate-spin" />
          )}
        </div>
      </div>
      {/* quick‑view */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-lg bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={() => setModalProduct(null)}>
              <XMarkIcon className="w-6 h-6" />
            </button>
            <img
              src={modalProduct.large}
              alt={modalProduct.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-lime-300">
                {modalProduct.name}
              </h3>
              <p className="text-lime-400 text-lg font-bold">
                ₹{modalProduct.price}
              </p>
              <p className="text-sm text-gray-400">
                Category: {modalProduct.category}
              </p>
              <button
                onClick={(e) => {
                  addToCart(modalProduct);
                  toast.success(`${modalProduct.name} added to cart`);
                  setModalProduct(null);
                }}
                className="w-full bg-lime-500 hover:bg-lime-600 text-gray-900 font-semibold px-5 py-2 rounded">
                ➕ Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <ScrollToTopButton />
    </>
  );
}
