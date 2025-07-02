import { Link } from "react-router-dom";
import "./NewsCard.css";

export default function NewsCard({ article }) {
  console.log(article);

  return (
    <div className="news-card">
      <img
  src={article.imageUrl || "https://via.placeholder.com/600x400?text=No+Image"}
  alt={article.headline}
  className="news-card__image"
/>
      <div className="news-card__content">
        <h2 className="news-card__headline">{article.headline}</h2>
        <p className="news-card__summary">{article.summary}</p>
        <Link to={`/news/${article._id}`} className="news-card__link">
          Read More
        </Link>
      </div>
    </div>
  );
}

