const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.post(
  '/recipe/:recipes_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.SaveRecipe
)
router.delete(
  '/unsave/:recipes_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.unSaveRecipe
)

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserDetails
)
router.get(
  '/user/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserProfile
)

// GetUserProfile

router.put(
  '/update',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateUser
)

module.exports = router
