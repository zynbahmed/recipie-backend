const { Review, Recipe } = require("../models")

const CreateReview = async (req, res) => {
  try {
    const review = await Review.create({ ...req.body })
    const recipe = await Recipe.findById(req.params.recipes_id)
    recipe.reviews.push(review._id)
    await (await recipe.save()).populate("reviews")
    res.send(recipe)
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateReview
}
