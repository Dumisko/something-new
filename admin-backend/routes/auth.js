import express from "express";
import Reporter from "../models/Reporter.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const reporter = new Reporter(req.body);
    await reporter.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const reporter = await Reporter.findOne({ email });
  if (!reporter || !(await reporter.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign(
    { 
      id: reporter._id,
    name: reporter.name,
    email: reporter.email,
    experience: reporter.experience,
    expertise: reporter.expertise,
  },
   process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
});

export default router;
