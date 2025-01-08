const express = require("express");
const VideoCard = require("../models/VideoCard");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const videoCards = await VideoCard.find();
    res.status(200).json(videoCards);
  } catch (error) {
    console.error("Error fetching video cards:", error);
    res.status(500).json({ error: "Failed to fetch video cards" });
  }
});

router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const videoCard = await VideoCard.findById(req.params.id);
    if (!videoCard) {
      return res.status(404).json({ error: "Video card not found" });
    }
    res.status(200).json(videoCard);
  } catch (error) {
    console.error("Error fetching video card:", error);
    res.status(500).json({ error: "Failed to fetch video card" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newVideoCard = new VideoCard(req.body);
    const savedVideoCard = await newVideoCard.save();
    res.status(201).json(savedVideoCard);
  } catch (error) {
    console.error("Error creating video card:", error);
    res.status(400).json({ error: "Failed to create video card" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedVideoCard = await VideoCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedVideoCard) {
      return res.status(404).json({ error: "Video card not found" });
    }

    res.status(200).json(updatedVideoCard);
  } catch (error) {
    console.error("Error updating video card:", error);
    res.status(400).json({ error: "Failed to update video card" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedVideoCard = await VideoCard.findByIdAndDelete(req.params.id);

    if (!deletedVideoCard) {
      return res.status(404).json({ error: "Video card not found" });
    }

    res.status(200).json({ message: "Video card deleted successfully" });
  } catch (error) {
    console.error("Error deleting video card:", error);
    res.status(500).json({ error: "Failed to delete video card" });
  }
});

module.exports = router;
