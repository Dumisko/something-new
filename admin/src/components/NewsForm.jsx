import { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import "./NewsForm.css";

export default function NewsForm() {
  const [form, setForm] = useState({
    headline: "",
    imageUrl: "",
    summary: "",
    detailedNews: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    hashtags: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/news/${id}`).then((res) => {
        const news = res.data;
        setForm({
          ...news,
          hashtags: news.hashtags.join(","),
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      hashtags: form.hashtags.split(",").map((tag) => tag.trim()),
    };
    try {
      if (id) {
        await api.put(`/news/${id}`, data);
      } else {
        await api.post("/news", data);
      }
      navigate("/");
    } catch (e) {
      alert("Error saving news");
    }
  };

  return (
    <div className="news-form-container">
      <h2>{id ? "Edit" : "Create"} News</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="headline"
          placeholder="Headline"
          value={form.headline}
          onChange={handleChange}
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <input
          name="summary"
          placeholder="Summary"
          value={form.summary}
          onChange={handleChange}
        />
        <textarea
          name="detailedNews"
          placeholder="Detailed News"
          rows="6"
          value={form.detailedNews}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="hashtags"
          placeholder="Hashtags (comma separated)"
          value={form.hashtags}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
