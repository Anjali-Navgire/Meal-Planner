const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  ingredients: [String],
  image: String, 
});

module.exports = mongoose.model('Recipe', recipeSchema);

