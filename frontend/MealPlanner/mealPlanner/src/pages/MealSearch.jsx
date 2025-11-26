import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MealSearch() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  // Fetch both API meals & custom recipes
  
  const fetchAllMeals = async () => {
    setLoading(true);
    try {
      const [sampleRes, customRes] = await Promise.all([
        fetch("https://meal-planner-9cb0.onrender.com/api/meals/sample").then((r) => r.json()),
        fetch("https://meal-planner-9cb0.onrender.com/api/recipes").then((r) => r.json()),
      ]);
      const allMeals = [
        ...(sampleRes.meals || []),
        ...(customRes || []),
      ];
      setMeals(allMeals);
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
    setLoading(false);
  };

  
  useEffect(() => {
    fetchAllMeals();
  }, []);

  // Search meals 
  const searchMeals = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://meal-planner-9cb0.onrender.com/api/meals?name=${query}`
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      console.error("Error searching meals:", err);
    }
    setLoading(false);
  };

 
  const addToFavorites = async (meal) => {
    try {
      const res = await fetch("https://meal-planner-9cb0.onrender.com/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meal),
      });
      const updatedFavorites = await res.json();
      console.log("Updated favorites:", updatedFavorites);
      alert("Meal added to favorites!");
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  return (
    <div className="meal-search-container">
      <h1 className="title">*Meals*</h1>

     <div className="topControls">
      
      <div className="createBtn" >
        <button onClick={() => navigate("/create")} style={{ marginRight: "10px" }}>
          ➕ Create Recipe
        </button>
        </div>
        </div>
      <div className="weeklyMeal">
        <button onClick={() => navigate("/weekly")}>
          Weekly Meal
        </button>
      </div>
        <div className="favoriteBtn">
        <button onClick={() => navigate("/favorites")}>
          ❤️ View Favorites
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={searchMeals} className="search-form">
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            autoFocus
          />
        )}
        <button
          type={showSearch ? "submit" : "button"}
          onClick={() => !showSearch && setShowSearch(true)}
          className="search-button"
        >
          <FaSearch />
        </button>
      </form>

      {loading && <p className="loading-text">Loading...</p>}

     
      <div className="meal-grid">
        {meals.map((meal) => (
          <div key={meal.idMeal || meal._id} className="meal-card">
            <img
              src={meal.strMealThumb || meal.image}
              alt={meal.strMeal || meal.name}
              className="meal-image"
            />
            <div className="meal-info">
              <h2 className="meal-name">{meal.strMeal || meal.name}</h2>
              <p className="meal-category">{meal.strCategory || "Custom Recipe"}</p>
              {meal.strSource || meal.strYoutube ? (
                <a
                  href={meal.strSource || meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="meal-link"
                >
                  View Recipe
                </a>
              ) : (
                <p>{meal.description}</p>
              )}
            </div>
            <button onClick={() => addToFavorites(meal)}>
              ❤️ Add to Favorites
            </button>
          </div>
        ))}
      </div>

      {meals.length === 0 && !loading && (
        <p className="no-results">No meals found. Try searching for something else.</p>
      )}
    </div>
  );
}

export default MealSearch;

