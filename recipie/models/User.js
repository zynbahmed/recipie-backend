const { Schema } = require('mongoose')

const IngredientSchema = new Schema({
  name: { type: String },
  amount: { type: Number },
  unit: { type: String }
})

const userSchema = new Schema({
  name: { type: String, required: true },
  googleId: { type: String },
  email: { type: String, required: true },
  passwordDigest: { type: String },
  avatar: {
    type: String,
    default:
      'https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png'
  },
  myRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  savedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  shoppingList: [IngredientSchema]
})

module.exports = userSchema
