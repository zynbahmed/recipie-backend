const { User } = require('../models')

const SaveRecipe = async (req, res) => {
  try {
    console.log(req.params.recipes_id)
    const payload = res.locals.payload
    console.log('payload', payload)
    req.body.user = payload.id
    const user = await User.findById(req.body.user)
    console.log(user)
    user.savedRecipes.push(req.params.recipes_id)
    await user.save()
  } catch (error) {}
}

module.exports = {
  SaveRecipe
}
