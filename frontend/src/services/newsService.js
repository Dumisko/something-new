import axios from "axios";

const API_BASE = "https://something-new-1.onrender.com/api/news";



export const getAllNews = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getNewsById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};
