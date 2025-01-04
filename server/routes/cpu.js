const CPU = require("../models/CPU");
const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cpus = await CPU.find();
    res.json(cpus);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const cpuData = req.body;

  try {
    const newCPU = await CPU.create(cpuData);
    res.status(201).json(newCPU);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cpu = await CPU.findById(req.params.id);
    if (!cpu) {
      return res.status(404).json({ error: "CPU not found" });
    }
    res.json(cpu);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCPU = await CPU.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedCPU) {
      return res.status(404).json({ error: "CPU not found" });
    }
    res.json(updatedCPU);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCPU = await CPU.findByIdAndDelete(req.params.id);
    if (!deletedCPU) {
      return res.status(404).json({ error: "CPU not found" });
    }
    res.json({ message: "CPU deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
