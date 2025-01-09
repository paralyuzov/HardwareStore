const express = require("express");
const router = express.Router();

const models = {
  cpus: require("../models/CPU"),
  laptops: require("../models/Laptops"),
  motherboards: require("../models/Motherboards"),
  rams: require("../models/RAM"),
  ssds: require("../models/SSD"),
  videocards: require("../models/VideoCard"),
  psus: require("../models/PSU"),
};

router.get("/", async (req, res) => {
  const { category, q } = req.query;

  if (!category) {
    return res.status(400).json({ error: "Category is required." });
  }

  const Model = models[category.toLowerCase()];
  if (!Model) {
    return res.status(400).json({ error: "Invalid category." });
  }

  try {
    const query = q 
      ? { name: { $regex: q, $options: "i" } }
      : {};

    const products = await Model.find(query);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

module.exports = router;