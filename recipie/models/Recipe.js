const { Schema } = require("mongoose")

const IngredientSchema = new Schema({
  name: { type: String },
  amount: { type: Number },
  unit: { type: String }
})

const recipeSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    cookingTime: { type: Number },
    steps: { type: String },
    photo: { type: String },
    ingredient: [IngredientSchema],
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
  },
  { timestamps: true }
)

module.exports = recipeSchema
