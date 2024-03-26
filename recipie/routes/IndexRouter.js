var express = require('express')
var router = express.Router()
const passport = require('passport')
const middleware = require('../middleware')

router.get('/', function (req, res, next) {
  res.redirect('/')
})

//Google Oauth Login route
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/profile',
    failureRedirect: '/'
  })
)
//Google Oauth Login route
router.get('/auth/google/profile', (req, res) => {
  let user = req.user
  let payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    savedRecipes: user.savedRecipes,
    myRecipes: user.myRecipes
  }
  let token = middleware.createToken(payload)
  res.redirect(`http://localhost:5173/googleok?token=${token}`)
})

//Logout route
router.get('/logout', (req, res) => {
  req.logOut(() => {
    res.redirect('/')
  })
})

module.exports = router
