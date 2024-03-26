const { Schema } = require('mongoose')

const groceryListSchema = new Schema(
  {
    name: [{ type: String }],
    amount: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

module.exports = groceryListSchema
