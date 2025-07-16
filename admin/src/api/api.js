import axios from "axios";

const api = axios.create({
  baseURL: "https://something-new-l01h.onrender.com/api",
});

// automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
