import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { getAllNews } from "./services/newsService";
import About from "./pages/About";

export default function App() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await getAllNews();
      setNews(data);
    };
    loadData();
  }, []);

  const categories = ["All", ...new Set(news.map((item) => item.category))];

  let filteredArticles =
    selectedCategory === "All"
      ? news
      : news.filter((item) => item.category === selectedCategory);

  if (searchQuery.trim() !== "") {
    filteredArticles = filteredArticles.filter(
      (item) =>
        item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <Router>
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route path="/" element={<Home filteredArticles={filteredArticles} />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <Footer />
    </Router>
  );
}
