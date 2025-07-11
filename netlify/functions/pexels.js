// netlify/functions/pexels.js

const axios = require("axios");

exports.handler = async (event) => {
    const { query, per_page = 12, page = 1 } = event.queryStringParameters;

    if (!query) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing query parameter" }),
        };
    }

    try {
        const response = await axios.get("https://api.pexels.com/v1/search", {
            headers: {
                Authorization: process.env.REACT_APP_PEXELS_API_KEY,
            },
            params: {
                query,
                per_page,
                page,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({
                error: error.message || "Something went wrong",
            }),
        };
    }
};
