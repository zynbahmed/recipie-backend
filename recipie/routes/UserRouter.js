const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.post(
  '/recipe/:recipes_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.SaveRecipe
)

module.exports = router
