// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // for POST requests (optional future use)

// ✅ Pexels Proxy Endpoint
app.get("/api/pexels", async (req, res) => {
    const { query = "shopping", page = 1, per_page = 20 } = req.query;
    const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

    if (!PEXELS_API_KEY) {
        return res.status(500).json({ error: "Missing Pexels API Key in .env" });
    }

    try {
        const result = await axios.get("https://api.pexels.com/v1/search", {
            headers: {
                Authorization: PEXELS_API_KEY,
            },
            params: { query, page, per_page },
        });

        res.json(result.data);
    } catch (err) {
        console.error("❌ Pexels API Error:", err.response?.data || err.message);
        res
            .status(err.response?.status || 500)
            .json({ error: err.response?.data || "Pexels proxy failed." });
    }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
