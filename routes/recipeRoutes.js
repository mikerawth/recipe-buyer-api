const express = require('express');
const router = express.Router();
const axios = require('axios');

const SeedQueryAndResults = require('../models/SeedQueryAndResults')
const SeedRecipe = require('../models/SeedRecipe')



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

  SeedQueryAndResults.findOne({ query: req.params.theQuery })
    .then((theQuery) => {
      if (theQuery) {
        res.json(theQuery)
      }
      else {
        const theSearch = `/recipes/search/?query=${req.params.theQuery}`

        generateFoodApi(theSearch).get()
          .then((theResult) => {
            console.log(theResult.data)
            SeedQueryAndResults.create({
              query: req.params.theQuery,
              results: theResult.data.results,
            })
              .then((theCreatedQuery) => {
                res.json(theCreatedQuery) // returns array of recipes
              })
              .catch((err) => {
                res.json(err)
              })
          })
          .catch((err) => {
            res.json(err)
          })
      }
    })
    .catch((err) => {
      res.json(err)
    })
})


// Checks to see if Recipe was already created
// If already in DB, then pass in that recipe
// If not, then call to Spoonacular, get the info, and create the recipe on my end
router.get('/:recipeID/information', (req, res, next) => {

  // check if recipeID exists in my seedRecipe
  SeedRecipe.findOne({ spoonID: req.params.recipeID })
    .then((theResult) => {
      if (theResult) {
        // if it does, then send to React Side
        res.json(theResult)
      } else {
        // if not, make call to API, get info, and create the seed here (on the server)
        const theSearch = `/recipes/${req.params.recipeID}/information`

        generateFoodApi(theSearch).get()
          .then((spoonData) => {

            console.log(spoonData.data)

            const tagsArray = [
              'vegetarian',
              'vegan',
              'glutenFree',
              'dairyFree',
              'veryHealthy',
              'cheap',
              'veryPopular',
              'sustainable',
              'lowFodmap',
              'ketogenic',
              'whole30']


            let grabbedTags = [];
            tagsArray.forEach((eachT) => {
              if (spoonData.data[eachT]) {
                grabbedTags.push(eachT)
              }
            })


            let grabbedIngredients = spoonData.data.extendedIngredients.map((eachI) => {
              return ({
                spoonID: eachI.id,
                name: eachI.name,
                usAmount: eachI.measures.us.amount,
                usUnit: eachI.measures.us.unitLong,
                metricAmount: eachI.measures.metric.amount,
                metricUnit: eachI.measures.metric.unitLong,
              })
            })



            SeedRecipe.create({
              spoonID: spoonData.data.id,
              title: spoonData.data.title,
              ingredients: grabbedIngredients,
              instructions: spoonData.data.analyzedInstructions[0].steps,
              tags: grabbedTags,
            })
              .then((freshlyCreatedRecipe) => {
                res.json(freshlyCreatedRecipe)
              })
              .catch((err) => {
                res.json(err)
              })
            // res.json(response.data) // should return summary of a single recipe
          })
          .catch((err) => {
            res.json(err)
          })
      }
    })
    .catch((err) => {
      res.json(err)
    })

  // once created, then pass my seedRecipe that I just created


})


// get ingredients for recipe
// CHANGE TO USE FOR ONLY PRICE.  GET INGREDIENTS THROUGH INFORMATION
router.get('/:recipeID/price', (req, res, next) => {
  const theSearch = `/recipes/${req.params.recipeID}/priceBreakdownWidget.json`
  generateFoodApi(theSearch).get()
    .then((response) => {
      res.json(response.data) // should return summary of a single recipe
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router;