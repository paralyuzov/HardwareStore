const express = require("express");
const Laptop = require("../models/Laptops");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.status(200).json(laptops);
  } catch (error) {
    console.error("Error fetching laptops:", error);
    res.status(500).json({ error: "Failed to fetch laptops" });
  }
});

router.get("/:id",validateObjectId, async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);
    if (!laptop) {
      return res.status(404).json({ error: "Laptop not found" });
    }
    res.status(200).json(laptop);
  } catch (error) {
    console.error("Error fetching laptop:", error);
    res.status(500).json({ error: "Failed to fetch laptop" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newLaptop = new Laptop(req.body);
    const savedLaptop = await newLaptop.save();
    res.status(201).json(savedLaptop);
  } catch (error) {
    console.error("Error creating laptop:", error);
    res.status(400).json({ error: "Failed to create laptop" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedLaptop = await Laptop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLaptop) {
      return res.status(404).json({ error: "Laptop not found" });
    }
    res.status(200).json(updatedLaptop);
  } catch (error) {
    console.error("Error updating laptop:", error);
    res.status(400).json({ error: "Failed to update laptop" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedLaptop = await Laptop.findByIdAndDelete(req.params.id);
    if (!deletedLaptop) {
      return res.status(404).json({ error: "Laptop not found" });
    }
    res.status(200).json({ message: "Laptop deleted successfully" });
  } catch (error) {
    console.error("Error deleting laptop:", error);
    res.status(500).json({ error: "Failed to delete laptop" });
  }
});

module.exports = router;
