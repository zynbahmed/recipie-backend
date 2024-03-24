const { default: mongoose } = require('mongoose')
const { Recipe } = require('../models')
const { IngredientSchema } = require('../models/')

const GetRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    res.send(recipes)
  } catch (error) {
    throw error
  }
}

const getRecipesDetails = async (req, res) => {
  const recipeId = req.params.recipe_id
  try {
    const recipe = await Recipe.findById(recipeId).populate('reviews')
    res.send(recipe)
  } catch (error) {
    throw error
  }
}

const CreateRecipe = async (req, res) => {
  console.log('got to the create cntroller')
  const title = req.body.title
  const description = req.body.description
  const cookingTime = req.body.cookingTime
  const steps = req.body.steps
  const photo = req.body.photo
  const ingredients = req.body.ingredients

  try {
    const recipe = new Recipe({
      title,
      description,
      cookingTime,
      steps,
      photo,
      ingredient: ingredients
    })
    await recipe.save()

    res.send(recipe)
  } catch (error) {
    throw error
  }
}

const UpdateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipe_id,
      req.body,
      { new: true }
    )
    res.send(recipe)
  } catch (error) {
    throw error
  }
}

const DeleteRecipe = async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.params.recipe_id })
    res.send({
      msg: 'Recipe Deleted',
      payload: req.params.activity_id,
      status: 'ok'
    })
  } catch (error) {}
}

module.exports = {
  GetRecipes,
  getRecipesDetails,
  CreateRecipe,
  UpdateRecipe,
  DeleteRecipe
}
