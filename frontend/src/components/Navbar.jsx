import React from "react";
import "./Navbar.css";

export default function Navbar({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <h1>The Actual Truth</h1>
      </div>
      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="navbar__categories">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "navbar__category active"
                : "navbar__category"
            }
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
