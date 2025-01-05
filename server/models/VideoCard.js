const mongoose = require("mongoose");

const videoCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    enum: ["NVIDIA", "AMD"],
  },
  memory: {
    type: String,
    required: true,
    trim: true,
  },
  core_clock: {
    type: String,
    required: true,
    trim: true,
  },
  boost_clock: {
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

module.exports = mongoose.model("VideoCard", videoCardSchema);
