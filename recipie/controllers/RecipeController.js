const { Recipe } = require('../models')

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
  try {
    const recipe = await Recipe.create({ ...req.body })
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
