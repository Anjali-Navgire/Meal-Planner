import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/favorites")
      .then(res => setFavorites(res.data));
  }, []);

  return (
    <div>
      <h2>My Favorites</h2>
      <div>
        {favorites.map((fav) => (
          <div key={fav._id}>
            <img src={fav.image || fav.strMealThumb} alt={fav.name || fav.strMeal} width="150" />
            <h3>{fav.name || fav.strMeal}</h3>
            
          </div>
          
        ))}
        
      </div>

    </div>
  );
}
