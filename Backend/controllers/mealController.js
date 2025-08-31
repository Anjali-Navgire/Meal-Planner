
const axios = require("axios");

exports.searchMeal = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meals" });
  }
};
