const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')

require('dotenv').config()
require('./config/database')
require('./config/passport')

const AuthRouter = require('./routes/AuthRouter')
const RecipeRouter = require('./routes/RecipeRouter')
const ReviewRouter = require('./routes/ReviewRouter')
const UserRouter = require('./routes/UserRouter')
const IndexRouter = require('./routes/IndexRouter')
const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

app.use('/auth', AuthRouter)
app.use('/recipe', RecipeRouter)
app.use('/', ReviewRouter)
app.use('/', UserRouter)
app.use('/', IndexRouter)
app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
