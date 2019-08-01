const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
  name: String,
  usAmount: Number,
  usUnit: String,
  metricAmount: Number,
  metricUnit: String,
  recipe: { type: Object, ref: 'Recipe' }
});

const Ingredients = mongoose.model('ingredients', ingredientsSchema);

module.exports = Ingredients;