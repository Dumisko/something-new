import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  headline: String,
  imageUrl: String,
  summary: String,
  detailedNews: String,
  writer: String,
  date: String,
  category: String,
  hashtags: [String],
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "Reporter" },
});

export default mongoose.model("News", newsSchema);
