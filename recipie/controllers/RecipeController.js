const { default: mongoose } = require('mongoose')
const { Recipe, User } = require('../models')
const { IngredientSchema } = require('../models/')

const GetRecipes = async (req, res) => {
  console.log(req.query.cat)
  try {
    const recipes = await Recipe.find({})
    res.send(recipes)
  } catch (error) {
    throw error
  }
}
const GetRecipeByCat = async (req, res) => {
  console.log(req.query.cat)
  try {
    const selected = await Recipe.find({ category: req.query.cat })
    res.send(selected)
  } catch (error) {}
}

const getRecipesDetails = async (req, res) => {
  console.log(req.params.recipe_id)
  const recipeId = req.params.recipe_id
  try {
    const recipe = await Recipe.findById(recipeId)
      .populate('reviews')
      .populate('creator')
    res.send(recipe)
  } catch (error) {
    throw error
  }
}

const CreateRecipe = async (req, res) => {
  console.log('got to the create cntroller')
  const payload = res.locals.payload
  // req.body.creator = payload.id
  // console.log(req.body.creator)
  // const title = req.body.title
  // const description = req.body.description
  // const cookingTime = req.body.cookingTime
  // const steps = req.body.steps
  // const photo = req.body.photo
  // const ingredients = req.body.ingredients

  try {
    const recipe = new Recipe({ ...req.body })
    await recipe.save()

    const user = await User.findByIdAndUpdate(
      req.body.creator,
      {
        $push: { myRecipes: recipe._id }
      },
      { new: true }
    )

    res.send({ recipe: recipe, user })
  } catch (error) {
    throw error
  }
}

const UpdateRecipe = async (req, res) => {
  console.log('got to the UpdateRecipe controller', req.body)
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
    console.log('got here in the delete controller', req.params.recipe_id)
    const recipeId = req.params.recipe_id
    await Recipe.findOneAndDelete({ _id: recipeId })
    res.send({
      msg: 'Recipe Deleted',
      payload: req.params.recipe_id,
      status: 'ok'
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  GetRecipes,
  GetRecipeByCat,
  getRecipesDetails,
  CreateRecipe,
  UpdateRecipe,
  DeleteRecipe
}
