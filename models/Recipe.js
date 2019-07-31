const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  apiID: String,
  listOfIng: Array, //of ObjectIDs
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;