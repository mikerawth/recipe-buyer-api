const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: String,
  usAmount: Number,
  usUnit: String,
  metricAmount: Number,
  metricUnit: String,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;