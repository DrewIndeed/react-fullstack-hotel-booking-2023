import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
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
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Hotel deleted - ID: ${req.params.id}`);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const recordHotel = await Hotel.findById(req.params.id);
    res.status(200).json(recordHotel);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const allHotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(allHotels);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",").map((cityStr) => cityStr.trim());
  try {
    const citiesList = await Promise.all(
      cities.map((targetCity) => {
        // return Hotel.find({ city: targetCity }).length; // 1st way
        return Hotel.countDocuments({ city: targetCity }); // 2nd way: MongoDB countDocuments
      })
    );
    res.status(200).json(citiesList);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};
