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

router.get('/:recipeID/information', (req, res, next) => {

  const theSearch = `/recipes/${req.params.recipeID}/information`

  generateFoodApi(theSearch).get()
    .then((response) => {
      res.json(response.data) // should return summary of a single recipe
    })
    .catch((err) => {
      res.json(err)
    })
})


// get ingredients for recipe
// CHANGE TO USE FOR ONLY PRICE.  GET INGREDIENTS THROUGH INFORMATION
router.get('/:recipeID/ingredients', (req, res, next) => {
  const theSearch = `/recipes/${req.params.recipeID}/priceBreakdownWidget.json`
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
// DO NOT USE - REPLACE WITH .../INFORMATION
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