import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// config express BE and load env file to process.env
const app = express();
dotenv.config();

// method to connect to Mongo DB
const connectDB = async () => {
  try {
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

app.listen(8800, () => {
  connectDB();
  console.log("Connected to BE");
});
