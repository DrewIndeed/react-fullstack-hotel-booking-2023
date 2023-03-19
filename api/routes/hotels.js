import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);
// UPDATE
router.put("/:id", verifyAdmin, updateHotel);
// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// GET
// NOTES: need the find keyword or else it conflicts with the counting apis
// bc it countByCity is at the position of :id
router.get("/find/:id", getHotel);
// GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", getHotels);

export default router;
