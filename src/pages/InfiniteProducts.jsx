import { useEffect, useState } from "react";
import { searchPexelsPhotos } from "../utils/pexelsApi";

export default function InfiniteProducts() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // const loadMore = async () => {
  //   setLoading(true);
  //   const newPhotos = await searchPexelsPhotos("fashion","electronics", page);
  //   setPhotos((prev) => [...prev, ...newPhotos]);
  //   setLoading(false);
  // };

  useEffect(() => {
  const loadMore = async () => {
    setLoading(true);
    const newPhotos = await searchPexelsPhotos("fashion","electronics", page);
    setPhotos((prev) => [...prev, ...newPhotos]);
    setLoading(false);
  };
  loadMore();
}, [page]);


  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 100 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.src.medium}
          alt={photo.alt}
          className="rounded shadow hover:scale-105 transition"
        />
      ))}
      {loading && (
        <p className="col-span-full text-center text-lime-400">
          Loading more...
        </p>
      )}
    </div>
  );
}
