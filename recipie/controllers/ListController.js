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
  console.log(req.body)
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
    console.log('hh')
    await User.updateOne(
      { _id: req.body.user.id },
      { $push: { shoppingList: grocery._id } }
    )
    console.log('ll')
    res.send(item)
  } catch (error) {
    throw error
    // res.json({ error: error.massage })
  }
}

module.exports = {
  GetList,
  CreateList
}
