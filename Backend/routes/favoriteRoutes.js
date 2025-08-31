const express = require("express");

const router = express.Router();
let favorites = []; 


router.use((req, res, next) => {
  console.log(`FavoriteRoutes: ${req.method} ${req.originalUrl}`);
  next();
});

// Add to favorites
router.post("/", (req, res) => {
  const recipe = req.body;
  if (!favorites.find(fav => fav._id === recipe._id)) {
    favorites.push(recipe);
  }
  res.json(favorites);
});


router.get("/", (req, res) => {
  res.json(favorites);
});

module.exports =router;
