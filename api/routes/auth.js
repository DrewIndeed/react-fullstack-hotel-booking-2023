import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

// CREATE
router.post("/register", register);
// GET
router.post("/login", login);

export default router;
