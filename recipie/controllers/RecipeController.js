const { default: mongoose } = require("mongoose")
const { Recipe, User } = require("../models")

const GetRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    res.send(recipes)
  } catch (error) {
    throw error
  }
}
const GetRecipeByCat = async (req, res) => {
  try {
    let query = {}
    if (req.query.cat) {
      query = { category: req.query.cat }
    }
    const selected = await Recipe.find(query)
    res.send(selected)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
}

const getRecipesDetails = async (req, res) => {
  const recipeId = req.params.recipe_id
  try {
    const recipe = await Recipe.findById(recipeId)
      .populate("reviews")
      .populate("creator")
    res.send(recipe)
  } catch (error) {
    throw error
  }
}

const CreateRecipe = async (req, res) => {
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
    const recipeId = req.params.recipe_id
    await Recipe.findOneAndDelete({ _id: recipeId })
    res.send({
      msg: "Recipe Deleted",
      payload: req.params.recipe_id,
      status: "ok"
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
