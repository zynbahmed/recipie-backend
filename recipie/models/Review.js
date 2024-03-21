const { Schema } = require('mongoose')

const reviewSchema = new Schema(
  {
    content: { type: String },
    rating: { type: Number }
  },
  { timestamps: true }
)

module.exports = reviewSchema
