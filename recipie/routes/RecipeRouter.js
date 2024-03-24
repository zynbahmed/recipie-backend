const router = require('express').Router()
const controller = require('../controllers/RecipeController')
const middleware = require('../middleware')

router.get('/', controller.GetRecipes)
router.get('/:recipe_id', controller.getRecipesDetails)
router.post(
  '/',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.CreateRecipe
)
router.put(
  '/:recipe_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.UpdateRecipe
)
router.delete(
  '/:recipe_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.DeleteRecipe
)

module.exports = router
