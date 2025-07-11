import { useEffect, useState } from "react";
import { searchPexelsPhotos } from "../utils/pexelsApi";

export default function ProductImages({ query }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const results = await searchPexelsPhotos(query || "shopping");
      setPhotos(results);
    }
    fetchImages();
  }, [query]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.src.medium}
          alt={photo.photographer}
          loading="lazy"
          className="rounded-lg shadow-md hover:scale-105 transition"
        />
      ))}
    </div>
  );
}
