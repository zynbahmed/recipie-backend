const mongoose = require('mongoose')
const userSchema = require('./User')
const recipeSchema = require('./Recipe')
const reviewSchema = require('./Review')
const groceryListSchema = require('./ShoppingList')

const User = mongoose.model('User', userSchema)
const Recipe = mongoose.model('Recipe', recipeSchema)
const Review = mongoose.model('Review', reviewSchema)
const GroceryList = mongoose.model('GroceryList', groceryListSchema)

module.exports = {
  User,
  Recipe,
  Review,
  GroceryList
}
