const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seedRecipeSchema = new Schema({
  spoonID: String,
  title: String,
  ingredients: Array,
  instructions: Array,
});

const SeedRecipe = mongoose.model('seedRecipe', seedRecipeSchema);

module.exports = SeedRecipe;