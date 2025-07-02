import NewsCard from "../components/NewsCard";
import "./Home.css";

export default function Home({ filteredArticles }) {
  return (
    <div className="home">
      <div className="news-grid">
        {filteredArticles.length === 0 ? (
          <p className="news-grid__empty">No articles found.</p>
        ) : (
          filteredArticles.map((article) => (
            <NewsCard key={article._id} article={article} />
          ))
        )}
      </div>
    </div>
  );
}
