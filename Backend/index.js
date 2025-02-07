require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
const PORT = 1790;

app.use(cors());

app.get("/api/images", async (req, res) => {
  try {
    const place = req.query.place;
    if (!place) return res.status(400).json({ error: "Place name is required" });

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query: place, per_page: 5, client_id: accessKey },
    });

    const images = response.data.results.map((image) => ({
      url: image.urls.regular,
    }));

    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
