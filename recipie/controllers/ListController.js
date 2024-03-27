const { GroceryList, User } = require('../models')

const GetList = async (req, res) => {
  try {
    const lists = await GroceryList.find({}).populate('user')
    res.send(lists)
  } catch (error) {
    throw error
  }
}

const CreateList = async (req, res) => {
  try {
    let item =[]
    const id = res.locals.payload

    for (let i = 0; i < req.body.flattenedList.length; i++) {
      item.push(req.body.flattenedList[i])
    }
    const grocery = await GroceryList.create({
      name: item,
      user: id.id
    })
    await User.updateOne(
      { _id: req.body.user.id },
      { $push: { shoppingList: grocery._id } }
    )
    res.send(item)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetList,
  CreateList
}
