const express = require('express');
const router = express.Router();
const axios = require('axios');

function generateFoodApi(queryString) {
  return (
    axios.create({
      baseURL: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/${queryString}`,
      headers: {
        'x-rapidapi-key': process.env.APIKEY,
        'x-rapidapi-host': process.env.APIHOST
      }
    })
  )
}

router.get('/', (req, res, next) => {
  res.json(foodApi)
})


router.get('/search/:theQuery', (req, res, next) => {

  const theSearch = `/recipes/search/?query=${req.params.theQuery}`

  generateFoodApi(theSearch).get()
    .then((response) => {
      res.json(response.data.results) // returns array of recipes
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/:recipeID/summary', (req, res, next) => {

  const theSearch = `/recipes/${req.params.recipeID}/summary`

  generateFoodApi(theSearch).get()
    .then((response) => {
      res.json(response.data) // should return summary of a single recipe
    })
    .catch((err) => {
      res.json(err)
    })
})


// get ingredients for recipe
router.get('/:recipeID/ingredients', (req, res, next) => {
  const theSearch = `/recipes/${req.params.recipeID}/ingredientWidget.json`
  generateFoodApi(theSearch).get()
    .then((response) => {
      res.json(response.data) // should return summary of a single recipe
    })
    .catch((err) => {
      res.json(err)
    })
})

// get instructions for recipe
// https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/324694/analyzedInstructions
router.get('/:recipeID/instructions', (req, res, next) => {
  const theSearch = `/recipes/${req.params.recipeID}/analyzedInstructions`
  generateFoodApi(theSearch).get()
    .then((response) => {
      res.json(response.data) // should return summary of a single recipe
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router;