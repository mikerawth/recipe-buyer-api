const express = require('express');
const router = express.Router();

const Ingredients = require('../models/Ingredients')

router.post('/addIngredients', (req, res, next) => {
  const ingredients = req.body.theIngredients;
  const recipeApiID = req.body.apiID;

  ingredients.forEach((eachIngredient) => {
    Ingredients.create({
      name: eachIngredient.name,
      usAmount: eachIngredient.amount.us.value,
      usUnit: eachIngredient.amount.us.unit,
      metricAmount: eachIngredient.amount.metric.value,
      metricUnit: eachIngredient.amount.metric.unit,
      recipeApiID: recipeApiID,
    })
      .then((response) => {
        res.json(response.data)
      })
      .catch((err) => {
        res.json(err)
      })
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
  Ingredients.find()
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
})


module.exports = router;