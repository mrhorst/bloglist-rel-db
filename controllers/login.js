const route = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { User } = require('../models')

route.post('/', async (req, res, next) => {
  const credentials = req.body
  const username = credentials.username
  const user = await User.findOne({
    where: {
      username,
    },
  })

  const passwordCorrect = credentials.password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).send({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  res.send({ token, username: user.username, name: user.name })
})

module.exports = route
