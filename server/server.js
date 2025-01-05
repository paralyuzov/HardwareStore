const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const cpuRoutes = require("./routes/cpu");
const ramRoutes = require("./routes/ram");
const motherboardRoutes = require('./routes/motherboards')


dotenv.config();

const app = express();


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
})();

app.use("/api/auth", authRoutes);
app.use("/api/cpu",cpuRoutes);
app.use("/api/ram",ramRoutes);
app.use('/api/motherboards',motherboardRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
