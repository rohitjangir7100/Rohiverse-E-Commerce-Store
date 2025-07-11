import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      className="fixed bottom-6 right-6 p-2 bg-lime-500 hover:bg-lime-600 text-gray-900 rounded-full shadow-lg z-50">
      <ChevronUpIcon className="w-6 h-6" />
    </button>
  );
}
