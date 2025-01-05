const mongoose = require("mongoose");

const psuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  wattage: {
    type: String,
    required: true,
    trim: true,
  },
  efficiency: {
    type: String,
    required: true,
    trim: true,
  },
  modularity: {
    type: String,
    required: true,
    enum: ["Fully Modular", "Semi-Modular", "Non-Modular"],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PSU", psuSchema);
