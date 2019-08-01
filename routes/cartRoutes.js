const express = require('express');
const router = express.Router();

const Ingredients = require('../models/Ingredients')
const Recipe = require('../models/Recipe')

router.post('/addRecipeAndIngredients', (req, res, next) => {
  const ingredients = req.body.theIngredients;
  const recipeApiID = req.body.recipeApiID;
  const recipeName = req.body.recipeName;

  Recipe.create({
    name: recipeName,
    apiID: recipeApiID,
  })
    .then((createdRecipe) => {
      ingredients.forEach((eachIngredient) => {
        Ingredients.create({
          name: eachIngredient.name,
          usAmount: eachIngredient.amount.us.value,
          usUnit: eachIngredient.amount.us.unit,
          metricAmount: eachIngredient.amount.metric.value,
          metricUnit: eachIngredient.amount.metric.unit,
          recipe: createdRecipe._id,
        })
          .then((response) => {
            res.json(response.data)
          })
          .catch((err) => {
            res.json(err)
          })
      })

    })
    .catch((err) => {
      res.json(err)
    })

})

// removes ALL Ingredients
router.post('/removeIngredients', (req, res, next) => {
  Ingredients.deleteMany()
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/getIngredients', (req, res, next) => {
  Ingredients.find().populate('recipe')
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
})


module.exports = router;