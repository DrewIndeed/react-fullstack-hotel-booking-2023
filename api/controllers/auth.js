import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  const { username, password, email } = req.body;

  // encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const newUser = new User({
      username,
      password: hashPassword,
      email,
    });
    await newUser.save();
    res.status(201).send(`New user created: ${email}`);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    // if user does not exist
    if (!user) return next(createError(404, "Username not found"));

    const isPwdCorrect = await bcrypt.compare(password, user.password);
    // if pwd is wrong
    if (!isPwdCorrect)
      return next(createError(400, "Wrong password or username"));

    // 1. create new jwt token
    // 2. set the jwt token to cookies
    const jwtToken = jwt.sign(
      { is: user._id, isAdmin: user.isAdmin },
      process.env.JWT // NOTES: JWT secret key, created using "openssl rand -base64 32"
    );

    // break down succes response to hide password, isAdmin
    const { password: userPassword, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", jwtToken, { httpOnly: true }) // not allow any client secret to reach this cookie
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // NOTES: return new record as response
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(`User deleted - ID: ${req.params.id}`);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const recordUser = await User.findById(req.params.id);
    res.status(200).json(recordUser);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error); // DEV
    next(error);
  }
};
