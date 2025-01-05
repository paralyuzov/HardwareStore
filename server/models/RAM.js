const mongoose = require("mongoose");

const ramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["DDR4", "DDR5"], 
  },
  capacity: {
    type: String,
    required: true,
    trim: true, 
  },
  speed: {
    type: String,
    required: true,
    trim: true, 
  },
  latency: {
    type: String,
    required: true,
    trim: true, 
  },
  voltage: {
    type: String,
    required: true,
    trim: true, 
  },
  image: {
    type: String,
    required: false,
    trim: true,
    default: "", 
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RAM", ramSchema);
