const mongoose = require("mongoose");

const cpuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  cores: {
    type: Number,
    required: true,
    min: 1
  },
  threads: {
    type: Number,
    required: true,
    min: 1
  },
  base_clock: {
    type: String,
    required: true
  },
  boost_clock: {
    type: String,
    required: true
  },
  socket: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("CPU", cpuSchema);
