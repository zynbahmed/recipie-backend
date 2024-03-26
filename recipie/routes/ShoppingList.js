const router = require('express').Router()
const controller = require('../controllers/ListController')
const middleware = require('../middleware')

router.get('/', controller.GetList)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateList 
)

module.exports = router
