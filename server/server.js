const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const cpuRoutes = require("./routes/cpu");
const ramRoutes = require("./routes/ram");
const motherboardRoutes = require('./routes/motherboards');
const ssdRoutes = require('./routes/ssd');
const videoCardRoutes = require('./routes/videoCards');
const psuRoutes = require('./routes/psu');
const laptopRoutes = require('./routes/laptops');
const paymentRoute = require('./routes/stripe');
const usersRoute = require('./routes/users');
const searchRoute = require('./routes/search');


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
app.use('/api/ssd',ssdRoutes);
app.use('/api/videocards',videoCardRoutes);
app.use('/api/psu',psuRoutes);
app.use('/api/laptops',laptopRoutes);
app.use('/api/checkout',paymentRoute);
app.use('/api/users',usersRoute)
app.use('/api/search',searchRoute)

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
