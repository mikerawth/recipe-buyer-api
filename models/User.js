const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  // cart: [{ type: Object, ref: "Ingredient" }],
  cart: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;