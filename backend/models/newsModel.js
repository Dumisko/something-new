import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  imageUrl: { type: String },
  summary: { type: String, required: true },
  detailedNews: { type: String },
  writer: { type: String },
  date: { type: String },
  category: { type: String },
  hashtags: [String],
});

const News = mongoose.model("News", newsSchema);
export default News;
