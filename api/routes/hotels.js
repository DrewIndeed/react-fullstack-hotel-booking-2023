import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    console.log(error); // DEV
    res.status(500).json(error);
  }
});
// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // NOTES: return new record as response
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    console.log(error); // DEV
    res.status(500).json(error);
  }
});
// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Hotel deleted - ID: ${req.params.id}`);
  } catch (error) {
    console.log(error); // DEV
    res.status(500).json(error);
  }
});
// GET
router.get("/:id", async (req, res) => {
  try {
    const recordHotel = await Hotel.findById(req.params.id);
    res.status(200).json(recordHotel);
  } catch (error) {
    console.log(error); // DEV
    res.status(500).json(error);
  }
});
// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const allHotels = await Hotel.findById("asdjfkhasdasdfasdfasdfasdfkjf");
    res.status(200).json(allHotels);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
});

export default router;
