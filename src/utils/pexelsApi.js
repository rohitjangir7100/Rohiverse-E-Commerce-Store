// src/utils/pexelsApi.js
import axios from "axios";

// 🔐 Replace with your actual API key (already valid here)
if (!process.env.REACT_APP_PEXELS_API_KEY) {
    console.error("❗️ Pexels API key is missing. Please set REACT_APP_PEXELS_API_KEY in your .env file.");
}

/**
 * 🔍 Search Pexels for photos based on keyword
 * @param {string} query - Search term (e.g., "shopping", "fashion", "gadgets")
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Number of photos per page (default: 20)
 * @returns {Promise<Array>} Array of photo objects
 */
export const searchPexelsPhotos = async (query = "shopping", page = 1, perPage = 20) => {
    try {
        const response = await axios.get("https://api.pexels.com/v1/search", {
            headers: {
                Authorization: process.env.REACT_APP_PEXELS_API_KEY,
            },
            params: {
                query,
                per_page: perPage,
                page,
            },
        });

        return response.data.photos || [];
    } catch (error) {
        console.error("❌ Error fetching from Pexels:", error.message);
        return [];
    }
};

/**
 * 🎠 Get featured images for homepage carousel
 * @param {string} theme - Topic for carousel (e.g., 'shopping', 'fashion', 'gadgets')
 * @param {number} count - Number of images to fetch (default: 5)
 * @returns {Promise<Array>} Array of image objects
 */
export const getCarouselImages = async (theme = "shopping", count = 5) => {
    return await searchPexelsPhotos(theme, 1, count);
};
