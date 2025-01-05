const mongoose = require("mongoose");

const ssdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  capacity: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["NVMe", "SATA"],
  },
  interface: {
    type: String,
    required: true,
    trim: true,
  },
  read_speed: {
    type: String,
    required: true,
    trim: true,
  },
  write_speed: {
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

module.exports = mongoose.model("SSD", ssdSchema);
