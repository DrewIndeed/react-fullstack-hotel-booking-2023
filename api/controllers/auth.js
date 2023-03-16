import bcrypt from "bcryptjs";
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

    // break down succes response to hide password, isAdmin
    const { password: userPassword, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
