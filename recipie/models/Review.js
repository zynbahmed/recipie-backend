const { Schema } = require('mongoose')

const reviewSchema = new Schema(
  {
    content: { type: String },
    rating: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    userAvatar: String
  },
  { timestamps: true }
)

module.exports = reviewSchema
