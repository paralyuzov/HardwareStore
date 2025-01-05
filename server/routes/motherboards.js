const express = require("express");
const Motherboard = require("../models/Motherboards");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const motherboards = await Motherboard.find();
    res.status(200).json(motherboards);
  } catch (error) {
    console.error("Error fetching motherboards:", error);
    res.status(500).json({ error: "Failed to fetch motherboards" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const motherboard = await Motherboard.findById(req.params.id);
    if (!motherboard) {
      return res.status(404).json({ error: "Motherboard not found" });
    }
    res.status(200).json(motherboard);
  } catch (error) {
    console.error("Error fetching motherboard:", error);
    res.status(500).json({ error: "Failed to fetch motherboard" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMotherboard = new Motherboard(req.body);
    const savedMotherboard = await newMotherboard.save();
    res.status(201).json(savedMotherboard);
  } catch (error) {
    console.error("Error creating motherboard:", error);
    res.status(400).json({ error: "Failed to create motherboard" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedMotherboard = await Motherboard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!updatedMotherboard) {
      return res.status(404).json({ error: "Motherboard not found" });
    }

    res.status(200).json(updatedMotherboard);
  } catch (error) {
    console.error("Error updating motherboard:", error);
    res.status(400).json({ error: "Failed to update motherboard" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedMotherboard = await Motherboard.findByIdAndDelete(req.params.id);

    if (!deletedMotherboard) {
      return res.status(404).json({ error: "Motherboard not found" });
    }

    res.status(200).json({ message: "Motherboard deleted successfully" });
  } catch (error) {
    console.error("Error deleting motherboard:", error);
    res.status(500).json({ error: "Failed to delete motherboard" });
  }
});

module.exports = router;
