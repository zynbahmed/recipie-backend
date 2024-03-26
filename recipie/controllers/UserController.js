const { User } = require("../models")

const SaveRecipe = async (req, res) => {
  try {
    console.log(req.params.recipes_id)
    const payload = res.locals.payload
    console.log("payload", payload)
    req.body.user = payload.id
    const user = await User.findById(req.body.user)
    console.log(user)
    user.savedRecipes.push(req.params.recipes_id)
    await user.save()
  } catch (error) {}
}

const GetUserDetails = async (req, res) => {
  const { payload } = res.locals
  const userId = payload.id
  try {
    const user = await User.findById(userId)
      .populate("myRecipes")
      .populate("savedRecipes")
      .populate("shoppingList")
    res.send(user)
  } catch (error) {
    throw error
  }
}

const UpdateUser = async (req, res) => {
  const { payload } = res.locals
  const userId = payload.id
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

module.exports = {
  SaveRecipe,
  GetUserDetails,
  UpdateUser
}
