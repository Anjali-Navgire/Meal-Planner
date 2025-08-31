const express = require("express");
const router = express.Router();
const { searchMeal } = require("../controllers/mealController");

router.get("/meals", searchMeal);

module.exports = router;
