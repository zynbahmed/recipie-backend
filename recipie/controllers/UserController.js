const { User } = require('../models')

const SaveRecipe = async (req, res) => {
  try {
    console.log(req.params.recipes_id)
    const payload = res.locals.payload
    console.log('payload', payload)
    req.body.user = payload.id
    const user = await User.findById(req.body.user)
    if (!user.savedRecipes.includes(req.params.recipes_id)) {
      user.savedRecipes.push(req.params.recipes_id)
    }
    console.log(user)
    await user.save()
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
  req.params.id
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
    console.log(id)
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
  GetUserProfile
}
