const { User, Recipe } = require('../models')

const SaveRecipe = async (req, res) => {
  try {
    const user = await User.findOne({ email })
  } catch (error) {}
}
