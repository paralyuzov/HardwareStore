const express = require("express");
const PSU = require("../models/PSU");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const psus = await PSU.find();
    res.status(200).json(psus);
  } catch (error) {
    console.error("Error fetching PSUs:", error);
    res.status(500).json({ error: "Failed to fetch PSUs" });
  }
});

router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const psu = await PSU.findById(req.params.id);
    if (!psu) {
      return res.status(404).json({ error: "PSU not found" });
    }
    res.status(200).json(psu);
  } catch (error) {
    console.error("Error fetching PSU:", error);
    res.status(500).json({ error: "Failed to fetch PSU" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPSU = new PSU(req.body);
    const savedPSU = await newPSU.save();
    res.status(201).json(savedPSU);
  } catch (error) {
    console.error("Error creating PSU:", error);
    res.status(400).json({ error: "Failed to create PSU" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPSU = await PSU.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPSU) {
      return res.status(404).json({ error: "PSU not found" });
    }
    res.status(200).json(updatedPSU);
  } catch (error) {
    console.error("Error updating PSU:", error);
    res.status(400).json({ error: "Failed to update PSU" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPSU = await PSU.findByIdAndDelete(req.params.id);
    if (!deletedPSU) {
      return res.status(404).json({ error: "PSU not found" });
    }
    res.status(200).json({ message: "PSU deleted successfully" });
  } catch (error) {
    console.error("Error deleting PSU:", error);
    res.status(500).json({ error: "Failed to delete PSU" });
  }
});

module.exports = router;
