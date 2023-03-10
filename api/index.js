import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";

// config express BE and load env file to process.env
const app = express();
dotenv.config();

// method to connect to Mongo DB
const connectDB = async () => {
  try {
    // NOTES: to suppress strictQuery warning from mongoose
    await mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

// mongoose listerners
mongoose.connection.on("connected", () => {
  console.log("[MG-onConnected]: Connected to MongoDB");
});
mongoose.connection.on("disconnected", () => {
  console.log("[MG-onDisconnected]: Disconnected from MongoDB");
});

// middlewares. NOTES: order matters
// NOTES: by default, you cannot send json to express server,
// so you need this line
app.use(express.json());
// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/hotels", hotelRoute);
app.use("/api/v1/rooms", roomRoute);
// error handling
app.use((err, req, res, next) => {
  return res.status(500).json("Errors detected from middleware!");
});

app.listen(8800, () => {
  connectDB();
  console.log("Connected to BE");
});
