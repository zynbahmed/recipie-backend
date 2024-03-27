const { User } = require('../models')

const SaveRecipe = async (req, res) => {
  try {
    const payload = res.locals.payload
    req.body.user = payload.id
    const user = await User.findById(req.body.user)
    if (!user.savedRecipes.includes(req.params.recipes_id)) {
      user.savedRecipes.push(req.params.recipes_id)
      await user.save()
      res.send(user)
    }
    else res.send({ msg: 'ok' })
  } catch (error) {
    res.send({ error: 'error' })
  }
}
const unSaveRecipe = async (req, res) => {
  const { payload } = res.locals
  try {
    const user = await User.findByIdAndUpdate(
      payload.id,
      { $pull: { savedRecipes: req.params.recipes_id } },
      { new: true }
    )
    res.send(user)
  } catch (error) {}
}

const GetUserDetails = async (req, res) => {
  const { payload } = res.locals
  const userId = payload.id
  try {
    const user = await User.findById(userId)
      .populate('myRecipes')
      .populate('savedRecipes')
      .populate('shoppingList')
    res.send(user)
  } catch (error) {
    throw error
  }
}
const GetUserProfile = async (req, res) => {
  try {
    const id = req.params.id
    const getProfile = await User.findById(id).populate('myRecipes')
    res.send(getProfile)
  } catch (error) {}
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

const DeleteList = async (req, res) => {
  try {
    const id = req.params.id
    await User.findOneAndUpdate(
      { _id: res.locals.payload.id },
      { $pull: { shoppingList: id } },
      { new: true }
    )
    res.send({
      msg: 'List Deleted',
      payload: req.params.id,
      status: 'ok'
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  SaveRecipe,
  GetUserDetails,
  UpdateUser,
  DeleteList,
  GetUserProfile,
  unSaveRecipe
}
