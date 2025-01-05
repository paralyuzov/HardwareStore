const express = require("express");
const RAM = require("../models/RAM");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const rams = await RAM.find();
    res.status(200).json(rams);
  } catch (error) {
    console.error("Error fetching RAMs:", error);
    res.status(500).json({ error: "Failed to fetch RAMs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ram = await RAM.findById(req.params.id);
    if (!ram) {
      return res.status(404).json({ error: "RAM not found" });
    }
    res.status(200).json(ram);
  } catch (error) {
    console.error("Error fetching RAM:", error);
    res.status(500).json({ error: "Failed to fetch RAM" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRam = new RAM(req.body);
    const savedRam = await newRam.save();
    res.status(201).json(savedRam);
  } catch (error) {
    console.error("Error creating RAM:", error);
    res.status(400).json({ error: "Failed to create RAM" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRam = await RAM.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRam) {
      return res.status(404).json({ error: "RAM not found" });
    }

    res.status(200).json(updatedRam);
  } catch (error) {
    console.error("Error updating RAM:", error);
    res.status(400).json({ error: "Failed to update RAM" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRam = await RAM.findByIdAndDelete(req.params.id);

    if (!deletedRam) {
      return res.status(404).json({ error: "RAM not found" });
    }

    res.status(200).json({ message: "RAM deleted successfully" });
  } catch (error) {
    console.error("Error deleting RAM:", error);
    res.status(500).json({ error: "Failed to delete RAM" });
  }
});

module.exports = router;
