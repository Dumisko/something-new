import express from "express";
import News from "../models/News.js";
import jwt from "jsonwebtoken";
import Reporter from "../models/Reporter.js";

const router = express.Router();

// token auth middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.reporterId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// create
router.post("/", verifyToken, async (req, res) => {
  const reporter = await Reporter.findById(req.reporterId);
  const news = new News({
    ...req.body,
    writer: reporter.name,
    reporter: reporter._id,
  });
  await news.save();
  res.status(201).json(news);
});

// update
router.put("/:id", verifyToken, async (req, res) => {
  const news = await News.findOneAndUpdate(
    { _id: req.params.id, reporter: req.reporterId },
    req.body,
    { new: true }
  );
  if (!news) return res.status(404).json({ error: "News not found or not yours" });
  res.json(news);
});

// delete
router.delete("/:id", verifyToken, async (req, res) => {
  const news = await News.findOneAndDelete({
    _id: req.params.id,
    reporter: req.reporterId,
  });
  if (!news) return res.status(404).json({ error: "News not found or not yours" });
  res.json({ message: "Deleted" });
});

// list my news
router.get("/my", verifyToken, async (req, res) => {
  const newsList = await News.find({ reporter: req.reporterId });
  res.json(newsList);
});

// optional: get news by ID (public)
router.get("/:id", async (req, res) => {
  const news = await News.findById(req.params.id);
  res.json(news);
});

export default router;
