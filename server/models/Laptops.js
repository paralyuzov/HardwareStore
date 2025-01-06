const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
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
  processor: {
    type: String,
    required: true,
    trim: true,
  },
  ram: {
    type: String,
    required: true,
    trim: true,
  },
  storage: {
    type: String,
    required: true,
    trim: true,
  },
  graphics: {
    type: String,
    required: true,
    trim: true,
  },
  screen: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Laptop", laptopSchema);
