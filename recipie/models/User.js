const { Schema } = require('mongoose')

const IngredientSchema = new Schema({
  name: { type: String },
  amount: { type: Number },
  unit: { type: String }
})

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  myRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  savedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  shoppingList: [IngredientSchema]
})

module.exports = userSchema
