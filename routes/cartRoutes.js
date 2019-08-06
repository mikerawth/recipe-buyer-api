const express = require('express');
const router = express.Router();

const Ingredient = require('../models/Ingredient')
const Recipe = require('../models/Recipe')
const User = require('../models/User')

router.post('/addRecipeAndIngredients', (req, res, next) => {
  const ingredients = req.body.theIngredients;
  const recipeApiID = req.body.recipeApiID;
  const recipeName = req.body.recipeName;

  const arrayOfIng = [];


  ingredients.forEach((eachIngredient) => {

    arrayOfIng.push(Ingredient.create({
      name: eachIngredient.name,
      usAmount: eachIngredient.usAmount,
      usUnit: eachIngredient.usUnit,
      metricAmount: eachIngredient.metricAmount,
      metricUnit: eachIngredient.metricUnit,
    }))
  })
  Promise.all(arrayOfIng)
    .then((eachThing) => {


      arrayOfIngIDs = eachThing.map((eachIng) => {
        return eachIng._id;
      })


      Recipe.create({
        name: recipeName,
        apiID: recipeApiID,
        ingredients: arrayOfIngIDs,
      })
        .then((theCreatedRecipe) => {
          // User.findByIdAndUpdate(req.user._id, {
          //   $push: { friends: friend._id }
          // }, { 'new': true}, cb);
          console.log(theCreatedRecipe._id)
          User.findByIdAndUpdate(req.user._id, {
            $push: { cart: theCreatedRecipe._id },
          })
            .then((response) => {
              res.json(response)
            })
            .catch((err) => {
              res.json(err)
            })
        })
        .catch((err) => {
          res.json(err)
        })
    })




  // console.log('cl out of the create -=-=-=-', arrayOfIng)
  // Recipe.create({
  //   name: recipeName,
  //   apiID: recipeApiID,
  //   ingredients: arrayOfIng,
  // })
  //   .then((theCreatedRecipe) => {
  //     User.findByIdAndUpdate(req.user._id,
  //       {
  //         cart: cart.push(theCreatedRecipe._id)
  //       })
  //       .then((response) => {
  //         res.json(response)
  //       })
  //       .catch((err) => {
  //         res.json(err)
  //       })
  //   })
  //   .catch((err) => {
  //     res.json(err)
  //   })


})

// removes ALL Ingredients
router.post('/removeIngredients', (req, res, next) => {
  Ingredient.deleteMany()
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/getIngredients', (req, res, next) => {
  Ingredient.find()
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
})


module.exports = router;