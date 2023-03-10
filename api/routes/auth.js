import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hello, this is auth endpoint");
  console.log("This is auth endpoint to test middleware");
  return next(); // NOTES: go to next middleware
});

router.get("/register", (req, res) => {
  res.send("Hello, this is auth/register endpoint");
});

export default router;
