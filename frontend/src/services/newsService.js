import axios from "axios";

const API_BASE = "http://localhost:5555/api/news";

export const getAllNews = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getNewsById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};
