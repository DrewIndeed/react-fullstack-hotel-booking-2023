import express from "express";
import {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/auth.js";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/auth.js";

const router = express.Router();

// DEV: middlewares to authorize
// CHECK VALID LOGIN
router.get("/check-authen", verifyToken, (req, res, next) => {
  res.send("You are authenticated! Welcome back!");
});
// CHECK VALID USER
router.get("/check-author/:id", verifyUser, (req, res, next) => {
  res.send("Hi pale! You can adjust YOUR account info.");
});
// CHECK VALID ADMIN
router.get("/check-admin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hi admin! You can adjust ALL accounts info.");
});

// CREATE
router.post("/register", verifyUser, register);
// LOGIN
router.post("/login", login);
// UPDATE
router.put("/:id", verifyUser, updateUser);
// DELETE
router.delete("/:id", verifyUser, deleteUser);
// GET
router.get("/:id", verifyUser, getUser);
// GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
