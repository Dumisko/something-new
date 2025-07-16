import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import "./NewsList.css";

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    api
      .get("/news/my")
      .then((res) => setNews(res.data))
      .catch(() => setNews([]));
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this news?")) {
      await api.delete(`/news/${id}`);
      setNews(news.filter((n) => n._id !== id));
    }
  };

  return (
    <div className="news-list">
      <h2>My News Articles</h2>
      {news.map((n) => (
        <div className="news-card" key={n._id}>
          <h4>{n.headline}</h4>
          <p>{n.summary}</p>
          <Link to={`/edit/${n._id}`}>Edit</Link>
          <button onClick={() => handleDelete(n._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
