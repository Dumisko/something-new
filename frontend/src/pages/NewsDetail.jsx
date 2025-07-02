import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNewsById } from "../services/newsService";
import "./NewsDetail.css";

export default function NewsDetail() {
  const location = useLocation();
  const { id } = useParams();
  const [article, setArticle] = useState(location.state?.article || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!article) {
      const fetchData = async () => {
        try {
          const data = await getNewsById(id);

          setArticle(data);
          console.log(article);

        } catch (e) {
          console.error(e);
          setError("Could not load the article");
        }
      };
      fetchData();
    }
  }, [id, article]);

  if (error) return <p className="news-detail__error">{error}</p>;
  if (!article) return <p className="news-detail__loading">Loading...</p>;

  return (
    <div className="news-detail">
      <h2 className="news-detail__headline">{article.headline}</h2>
      <img
  src={article.imageUrl || "https://via.placeholder.com/800x400?text=No+Image"}
  alt={article.headline}
  className="news-detail__image"
/>

      <p className="news-detail__body">{article.detailedNews}</p>
      <div className="news-detail__meta">
        <p>
          <strong>Writer:</strong> {article.writer}
        </p>
        <p>
          <strong>Date:</strong> {article.date}
        </p>
        <p>
          <strong>Category:</strong> {article.category}
        </p>
        <p>
          <strong>Hashtags:</strong> {article.hashtags?.join(", ")}
        </p>
      </div>
    </div>
  );
}
