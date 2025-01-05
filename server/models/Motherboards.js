const mongoose = require("mongoose");

const motherboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  chipset: {
    type: String,
    required: true,
    trim: true,
  },
  socket: {
    type: String,
    required: true,
    trim: true,
  },
  form_factor: {
    type: String,
    required: true,
    trim: true,
    enum: ["ATX", "Micro ATX", "Mini ITX"], 
  },
  ram_support: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    trim: true,
    default: "",
  },
  brand: {
    type: String,
    required: true,
    enum: ["AMD", "Intel"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Motherboard", motherboardSchema);
