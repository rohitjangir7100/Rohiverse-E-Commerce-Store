import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchPexelsImages = async () => {
      try {
        const res = await axios.get("/.netlify/functions/pexels?query=shopping&per_page=5");
        const results = res.data.photos || [];
        setImages(results);
      } catch (err) {
        console.error("❌ Failed to fetch Pexels images", err);
      }
    };

    fetchPexelsImages();
  }, []);

  return (
    <div className="bg-gray-950 text-lime-100 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* ✅ Logo */}
      <img
        src="/logo-hero.png"
        alt="Rohiverse Logo"
        className="w-32 sm:w-40 md:w-48 mb-6 drop-shadow-lg"
        loading="lazy"
      />

      {/* 🌟 Carousel */}
      <div className="w-full max-w-4xl mx-auto">
        {images.length > 0 ? (
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3500}
            transitionTime={800}
            swipeable
            emulateTouch
            dynamicHeight={false}>
            {images.map((img, i) => (
              <div
                key={i}
                className="h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden rounded-md">
                <img
                  src={img.src.landscape}
                  alt={img.alt || `Image ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <p className="legend bg-gray-900/80 text-lime-300">
                  🛍️ {img.alt || "Shop the Collection"}
                </p>
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-center text-gray-400">Loading carousel...</p>
        )}
      </div>

      {/* ✨ Intro & CTA */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lime-400 mb-4 text-center mt-10">
        Welcome to Rohiverse 🛍️
      </h1>
      <p className="text-lime-200 text-base sm:text-lg mb-6 text-center max-w-xl">
        Discover trending products, unbeatable offers, and a smooth shopping
        experience.
      </p>
      <Link
        to="/products"
        className="bg-lime-500 hover:bg-lime-600 text-gray-900 font-semibold px-6 py-3 rounded-full transition shadow-md">
        🚀 Start Shopping
      </Link>

      {/* ✅ Why Shop With Us Section */}
      <div className="mt-16 w-full max-w-5xl text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-lime-300 mb-6">
          Why Shop with Rohiverse? 💡
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-lime-200">
          <div className="bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lime-500/30 transition-all duration-300">
            <span className="text-4xl mb-2 block">⚡</span>
            <h3 className="font-semibold text-lg mb-1">Fast Delivery</h3>
            <p className="text-sm text-gray-400">
              Get your products at lightning speed across the country!
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lime-500/30 transition-all duration-300">
            <span className="text-4xl mb-2 block">💰</span>
            <h3 className="font-semibold text-lg mb-1">Best Prices</h3>
            <p className="text-sm text-gray-400">
              Unbeatable deals and seasonal discounts await you.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lime-500/30 transition-all duration-300">
            <span className="text-4xl mb-2 block">🔁</span>
            <h3 className="font-semibold text-lg mb-1">Easy Returns</h3>
            <p className="text-sm text-gray-400">
              Not happy? Return it hassle-free within 7 days!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
