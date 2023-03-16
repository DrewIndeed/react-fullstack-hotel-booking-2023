import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // NOTES: return new record as response
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {}
    res.status(200).json(`Room deleted - ID: ${req.params.id}`);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const recordRoom = await Room.findById(req.params.id);
    res.status(200).json(recordRoom);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};
