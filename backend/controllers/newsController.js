import News from "../models/newsModel.js";

export const getAllNews = async (req, res) => {
  const news = await News.find();
  res.json(news);
};

export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
