const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: String,
  usAmount: Number,
  usUnit: String,
  metricAmount: Number,
  metricUnit: String,
  recipeApiID: String
});

const Ingredient = mongoose.model('ingredient', ingredientSchema);

module.exports = Ingredient;