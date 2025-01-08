const express = require("express");
const SSD = require("../models/SSD");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ssds = await SSD.find();
    res.status(200).json(ssds);
  } catch (error) {
    console.error("Error fetching SSDs:", error);
    res.status(500).json({ error: "Failed to fetch SSDs" });
  }
});


router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const ssd = await SSD.findById(req.params.id);
    if (!ssd) {
      return res.status(404).json({ error: "SSD not found" });
    }
    res.status(200).json(ssd);
  } catch (error) {
    console.error("Error fetching SSD:", error);
    res.status(500).json({ error: "Failed to fetch SSD" });
  }
});


router.post("/", async (req, res) => {
  try {
    const newSSD = new SSD(req.body);
    const savedSSD = await newSSD.save();
    res.status(201).json(savedSSD);
  } catch (error) {
    console.error("Error creating SSD:", error);
    res.status(400).json({ error: "Failed to create SSD" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedSSD = await SSD.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSSD) {
      return res.status(404).json({ error: "SSD not found" });
    }

    res.status(200).json(updatedSSD);
  } catch (error) {
    console.error("Error updating SSD:", error);
    res.status(400).json({ error: "Failed to update SSD" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedSSD = await SSD.findByIdAndDelete(req.params.id);

    if (!deletedSSD) {
      return res.status(404).json({ error: "SSD not found" });
    }

    res.status(200).json({ message: "SSD deleted successfully" });
  } catch (error) {
    console.error("Error deleting SSD:", error);
    res.status(500).json({ error: "Failed to delete SSD" });
  }
});

module.exports = router;
